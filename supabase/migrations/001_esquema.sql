-- Punto de venta de Tacos El Gran Abanico · esquema para Supabase (Postgres).
-- Se corre una vez en Supabase → SQL Editor (o `supabase db push`). Después corre 002_semilla.sql.
-- Seguridad: RLS activo en todas las tablas y SIN políticas: el navegador (anon) no puede leer ni escribir nada.
-- Solo el servidor, con SUPABASE_SERVICE_ROLE_KEY, entra a los datos. Las funciones solo las ejecuta service_role.

create extension if not exists pgcrypto;

create table if not exists mesas (
  id integer primary key,
  nombre text not null,
  token text not null unique default substr(encode(gen_random_bytes(9), 'hex'), 1, 12)
);

create table if not exists ingredientes (
  id text primary key,
  nombre text not null,
  unidad text not null check (unidad in ('pz', 'g', 'ml')),
  existencia numeric not null default 0,
  minimo numeric not null default 0
);

create table if not exists productos (
  id text primary key,
  nombre text not null,
  categoria text not null,
  precio integer not null check (precio > 0),             -- centavos, IVA incluido
  descuento_pct numeric not null default 0 check (descuento_pct between 0 and 100),
  promo text,
  activo boolean not null default true,
  posicion integer not null default 0
);

create table if not exists recetas (
  producto_id text not null references productos (id) on delete cascade,
  ingrediente_id text not null references ingredientes (id),
  cantidad numeric not null check (cantidad > 0),          -- lo que gasta UNA pieza
  primary key (producto_id, ingrediente_id)
);

create table if not exists ordenes (
  id uuid primary key default gen_random_uuid(),
  mesa_id integer not null references mesas (id),
  estado text not null default 'abierta' check (estado in ('abierta', 'cobrando', 'pagada', 'cancelada')),
  descuento_orden_pct numeric not null default 0 check (descuento_orden_pct between 0 and 100),
  subtotal integer not null default 0,
  descuento integer not null default 0,
  iva integer not null default 0,
  total integer not null default 0,
  telefono text check (telefono ~ '^[0-9]{10}$'),
  recordar boolean not null default false,
  monto_cobrado integer check (monto_cobrado > 0),
  cobro_expira_en timestamptz,
  pey_transaction_id text unique,
  codi_id text,
  aviso_codigo text,
  aviso_mensaje text,
  pagada_en timestamptz,
  creada_en timestamptz not null default now(),
  actualizada_en timestamptz not null default now()
);
-- Una sola orden activa por mesa.
create unique index if not exists ordenes_una_activa_por_mesa on ordenes (mesa_id) where estado in ('abierta', 'cobrando');
create index if not exists ordenes_pagadas on ordenes (pagada_en) where estado = 'pagada';

-- Registro de productos de cada orden (los de órdenes pagadas son los productos vendidos).
create table if not exists orden_items (
  orden_id uuid not null references ordenes (id) on delete cascade,
  producto_id text not null references productos (id),
  nombre text not null,
  cantidad integer not null check (cantidad > 0),
  precio_unitario integer not null,
  descuento_pct numeric not null default 0,
  importe_bruto integer not null,
  descuento integer not null,
  importe integer not null,
  primary key (orden_id, producto_id)
);

create table if not exists movimientos_inventario (
  id bigserial primary key,
  orden_id uuid not null references ordenes (id),
  ingrediente_id text not null references ingredientes (id),
  cantidad numeric not null,                               -- lo que se descontó
  creado_en timestamptz not null default now()
);

create table if not exists clientes (
  telefono text primary key check (telefono ~ '^[0-9]{10}$'),
  visitas integer not null default 0,
  total_gastado integer not null default 0,                -- centavos
  primera_visita timestamptz not null default now(),
  ultima_visita timestamptz
);

alter table mesas enable row level security;
alter table ingredientes enable row level security;
alter table productos enable row level security;
alter table recetas enable row level security;
alter table ordenes enable row level security;
alter table orden_items enable row level security;
alter table movimientos_inventario enable row level security;
alter table clientes enable row level security;

-- Crea la orden abierta de la mesa o reemplaza sus productos. Totales calculados por el servidor (lib/calculo.js).
create or replace function guardar_orden(
  p_mesa integer, p_renglones jsonb, p_descuento_orden_pct numeric,
  p_subtotal integer, p_descuento integer, p_iva integer, p_total integer
) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v ordenes%rowtype;
begin
  select * into v from ordenes where mesa_id = p_mesa and estado in ('abierta', 'cobrando') for update;
  if found and v.estado = 'cobrando' then
    raise exception 'ORDEN_EN_COBRO';
  end if;
  if jsonb_array_length(p_renglones) = 0 then
    if found then
      update ordenes set estado = 'cancelada', actualizada_en = now() where id = v.id;
    end if;
    return null;
  end if;
  if not found then
    insert into ordenes (mesa_id, descuento_orden_pct, subtotal, descuento, iva, total)
    values (p_mesa, p_descuento_orden_pct, p_subtotal, p_descuento, p_iva, p_total)
    returning * into v;
  else
    update ordenes set descuento_orden_pct = p_descuento_orden_pct, subtotal = p_subtotal, descuento = p_descuento,
      iva = p_iva, total = p_total, aviso_codigo = null, aviso_mensaje = null, actualizada_en = now()
    where id = v.id;
    delete from orden_items where orden_id = v.id;
  end if;
  insert into orden_items (orden_id, producto_id, nombre, cantidad, precio_unitario, descuento_pct, importe_bruto, descuento, importe)
  select v.id, r."productoId", r.nombre, r.cantidad, r."precioUnitario", r."descuentoPct", r."importeBruto", r.descuento, r.importe
  from jsonb_to_recordset(p_renglones) as r(
    "productoId" text, nombre text, cantidad integer, "precioUnitario" integer,
    "descuentoPct" numeric, "importeBruto" integer, descuento integer, importe integer
  );
  return v.id;
end;
$$;

-- Confirma un pago que pey reportó como pagado. En UNA transacción: orden pagada, descuento de ingredientes
-- según las recetas y cliente recordado. Idempotente: un webhook repetido regresa 'ya_pagada' sin descontar dos veces.
create or replace function confirmar_pago(
  p_orden uuid, p_transaction text, p_monto integer, p_pagado_en timestamptz
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v ordenes%rowtype;
begin
  select * into v from ordenes where pey_transaction_id = p_transaction for update;
  if not found and p_orden is not null then
    select * into v from ordenes where id = p_orden for update;
  end if;
  if not found then
    return jsonb_build_object('resultado', 'no_encontrada');
  end if;
  if v.estado = 'pagada' then
    return jsonb_build_object('resultado', case when v.pey_transaction_id = p_transaction then 'ya_pagada' else 'transaccion_distinta' end, 'orden', v.id);
  end if;
  if v.estado = 'cancelada' then
    return jsonb_build_object('resultado', 'cancelada', 'orden', v.id);
  end if;
  if v.pey_transaction_id is not null and v.pey_transaction_id <> p_transaction then
    return jsonb_build_object('resultado', 'transaccion_distinta', 'orden', v.id);
  end if;
  if v.monto_cobrado is distinct from p_monto then
    return jsonb_build_object('resultado', 'monto_distinto', 'orden', v.id);
  end if;

  update ordenes set estado = 'pagada', pagada_en = coalesce(p_pagado_en, now()), pey_transaction_id = p_transaction,
    aviso_codigo = null, aviso_mensaje = null, actualizada_en = now()
  where id = v.id;

  with consumo as (
    select r.ingrediente_id, sum(r.cantidad * oi.cantidad) as cantidad
    from orden_items oi join recetas r on r.producto_id = oi.producto_id
    where oi.orden_id = v.id
    group by r.ingrediente_id
  ), mov as (
    insert into movimientos_inventario (orden_id, ingrediente_id, cantidad)
    select v.id, ingrediente_id, cantidad from consumo
  )
  update ingredientes i set existencia = i.existencia - c.cantidad from consumo c where i.id = c.ingrediente_id;

  if v.recordar and v.telefono is not null then
    insert into clientes (telefono, visitas, total_gastado, ultima_visita)
    values (v.telefono, 1, v.total, now())
    on conflict (telefono) do update set visitas = clientes.visitas + 1,
      total_gastado = clientes.total_gastado + excluded.total_gastado, ultima_visita = now();
  end if;

  return jsonb_build_object('resultado', 'pagada', 'orden', v.id);
end;
$$;

revoke all on function guardar_orden(integer, jsonb, numeric, integer, integer, integer, integer) from public, anon, authenticated;
revoke all on function confirmar_pago(uuid, text, integer, timestamptz) from public, anon, authenticated;
grant execute on function guardar_orden(integer, jsonb, numeric, integer, integer, integer, integer) to service_role;
grant execute on function confirmar_pago(uuid, text, integer, timestamptz) to service_role;
