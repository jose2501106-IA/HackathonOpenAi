// Corre las migraciones reales de Supabase en Postgres embebido (PGlite) y prueba las funciones guardar_orden y confirmar_pago.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { armarRenglones, calcularTotales } from "../lib/calculo.js";
import { PRODUCTOS } from "../lib/semilla.js";

async function base() {
  const db = new PGlite({ extensions: { pgcrypto } });
  await db.exec("create role anon; create role authenticated; create role service_role;"); // roles que trae Supabase
  for (const archivo of ["001_esquema.sql", "002_semilla.sql"]) {
    await db.exec(await readFile(new URL(`../supabase/migrations/${archivo}`, import.meta.url), "utf8"));
  }
  return db;
}

const existencia = async (db, id) => Number((await db.query("select existencia from ingredientes where id = $1", [id])).rows[0].existencia);

async function guardar(db, mesa, items) {
  const { renglones, totales } = calcularTotales(armarRenglones(items, PRODUCTOS));
  const r = await db.query("select guardar_orden($1, $2::jsonb, 0, $3, $4, $5, $6) as id", [
    mesa, JSON.stringify(renglones), totales.subtotal, totales.descuento, totales.iva, totales.total,
  ]);
  return { id: r.rows[0].id, total: totales.total };
}

test("SQL: migraciones, tokens de mesa, guardar_orden y confirmar_pago idempotente con descuento de inventario", async () => {
  const db = await base();
  const mesas = (await db.query("select id, token from mesas order by id")).rows;
  assert.equal(mesas.length, 5);
  assert.equal(new Set(mesas.map((m) => m.token)).size, 5);
  assert.ok(mesas.every((m) => /^[0-9a-f]{12}$/.test(m.token)));

  const o = await guardar(db, 1, [{ productoId: "taco_pastor", cantidad: 3 }, { productoId: "refresco", cantidad: 2 }]);
  // Reemplazar productos de la misma orden
  const o2 = await guardar(db, 1, [{ productoId: "taco_pastor", cantidad: 4 }]);
  assert.equal(o2.id, o.id);
  assert.equal((await db.query("select count(*)::int as n from orden_items where orden_id = $1", [o.id])).rows[0].n, 1);

  await db.query("update ordenes set estado = 'cobrando', telefono = '5512345678', recordar = true, monto_cobrado = 10, pey_transaction_id = 'TX1' where id = $1", [o.id]);
  await assert.rejects(guardar(db, 1, [{ productoId: "refresco", cantidad: 1 }]), /ORDEN_EN_COBRO/);

  const pastor = await existencia(db, "pastor");
  const mal = await db.query("select confirmar_pago($1, 'TX1', 99, now()) as r", [o.id]);
  assert.equal(mal.rows[0].r.resultado, "monto_distinto");
  assert.equal(await existencia(db, "pastor"), pastor);

  const ok = await db.query("select confirmar_pago(null, 'TX1', 10, now()) as r");
  assert.equal(ok.rows[0].r.resultado, "pagada");
  assert.equal(await existencia(db, "pastor"), pastor - 240);
  assert.equal(await existencia(db, "tortilla_maiz"), 500 - 8);
  const otra = await db.query("select confirmar_pago($1, 'TX1', 10, now()) as r", [o.id]);
  assert.equal(otra.rows[0].r.resultado, "ya_pagada");
  assert.equal(await existencia(db, "pastor"), pastor - 240, "sin doble descuento");

  const cli = (await db.query("select visitas, total_gastado from clientes where telefono = '5512345678'")).rows[0];
  assert.equal(cli.visitas, 1);
  assert.equal(cli.total_gastado, o2.total);
  assert.equal((await db.query("select count(*)::int as n from movimientos_inventario where orden_id = $1", [o.id])).rows[0].n, 4);

  // Mesa libre de nuevo: nueva orden; items vacíos la cancelan
  const o3 = await guardar(db, 1, [{ productoId: "refresco", cantidad: 1 }]);
  assert.notEqual(o3.id, o.id);
  const cancel = await db.query("select guardar_orden(1, '[]'::jsonb, 0, 0, 0, 0, 0) as id");
  assert.equal(cancel.rows[0].id, null);
  assert.equal((await db.query("select estado from ordenes where id = $1", [o3.id])).rows[0].estado, "cancelada");

  assert.equal((await db.query("select confirmar_pago(null, 'NO-EXISTE', 10, now()) as r")).rows[0].r.resultado, "no_encontrada");
  await db.close();
});

test("SQL: RLS activo en todas las tablas y funciones sin permiso para anon", async () => {
  const db = await base();
  const sinRls = (await db.query("select relname from pg_class where relkind = 'r' and relnamespace = 'public'::regnamespace and not relrowsecurity")).rows;
  assert.deepEqual(sinRls, []);
  const anon = (await db.query("select has_function_privilege('anon', 'confirmar_pago(uuid, text, integer, timestamptz)', 'execute') as p")).rows[0].p;
  assert.equal(anon, false);
  const srv = (await db.query("select has_function_privilege('service_role', 'confirmar_pago(uuid, text, integer, timestamptz)', 'execute') as p")).rows[0].p;
  assert.equal(srv, true);
  await db.close();
});
