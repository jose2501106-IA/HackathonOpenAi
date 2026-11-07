// Almacén en Supabase vía su API REST (PostgREST) con la llave service_role. Solo corre en el servidor.
// Esquema y funciones: supabase/migrations/001_esquema.sql. Misma interfaz que lib/almacen-memoria.js.
import { ErrorApp } from "./errores.js";

const ms = (iso) => (iso ? Date.parse(iso) : null);
const iso = (n) => (n === null || n === undefined ? null : new Date(n).toISOString());

function aOrden(f) {
  return {
    id: f.id,
    mesaId: f.mesa_id,
    estado: f.estado,
    renglones: (f.orden_items || [])
      .map((i) => ({
        productoId: i.producto_id, nombre: i.nombre, cantidad: i.cantidad, precioUnitario: i.precio_unitario,
        descuentoPct: Number(i.descuento_pct), importeBruto: i.importe_bruto, descuento: i.descuento, importe: i.importe,
      })),
    descuentoOrdenPct: Number(f.descuento_orden_pct),
    totales: { subtotal: f.subtotal, descuento: f.descuento, iva: f.iva, total: f.total },
    telefono: f.telefono,
    recordar: f.recordar,
    montoCobrado: f.monto_cobrado,
    cobroExpiraEn: ms(f.cobro_expira_en),
    peyTransactionId: f.pey_transaction_id,
    codiId: f.codi_id,
    aviso: f.aviso_codigo ? { codigo: f.aviso_codigo, mensaje: f.aviso_mensaje } : null,
    pagadaEn: ms(f.pagada_en),
    creadaEn: ms(f.creada_en),
    actualizadaEn: ms(f.actualizada_en),
  };
}

const SELECT_ORDEN = "select=*,orden_items(*)";

export function crearAlmacenSupabase({ url, llave, fetch: f = globalThis.fetch, timeoutMs = 10_000 }) {
  async function rest(metodo, ruta, { cuerpo, prefer } = {}) {
    const headers = { apikey: llave, accept: "application/json" };
    // Las llaves heredadas (JWT) también van como Bearer; las nuevas (sb_secret_…) basta con apikey.
    if (llave.startsWith("eyJ")) headers.authorization = `Bearer ${llave}`;
    if (cuerpo !== undefined) headers["content-type"] = "application/json";
    if (prefer) headers.prefer = prefer;
    let resp;
    try {
      resp = await f(`${url}/rest/v1/${ruta}`, {
        method: metodo, headers, body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo), signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      throw new ErrorApp("BD_NO_DISPONIBLE", "No pudimos conectar con la base de datos. Intenta de nuevo.", 503);
    }
    const texto = await resp.text();
    let datos = null;
    try {
      datos = texto ? JSON.parse(texto) : null;
    } catch {
      datos = null;
    }
    if (resp.ok) return datos;
    if (typeof datos?.message === "string" && datos.message.includes("ORDEN_EN_COBRO")) {
      throw new ErrorApp("ORDEN_EN_COBRO", "El cliente está pagando esta orden; espera a que termine.", 409);
    }
    console.error("Supabase respondió con error:", resp.status, datos?.code);
    throw new ErrorApp("BD_ERROR", "La base de datos rechazó la operación.", 502);
  }

  const orden = async (id) => {
    const filas = await rest("GET", `ordenes?id=eq.${encodeURIComponent(id)}&${SELECT_ORDEN}`);
    return filas?.[0] ? aOrden(filas[0]) : null;
  };
  const patchOrden = async (filtro, cambios) => {
    const filas = await rest("PATCH", `ordenes?${filtro}`, { cuerpo: { ...cambios, actualizada_en: new Date().toISOString() }, prefer: "return=representation" });
    return filas?.[0] ? orden(filas[0].id) : null;
  };

  return {
    tipo: "supabase",
    async mesas() {
      return rest("GET", "mesas?select=id,nombre,token&order=id");
    },
    async catalogo() {
      const filas = await rest("GET", "productos?select=*,recetas(ingrediente_id,cantidad)&activo=eq.true&order=posicion");
      return filas.map((p) => ({
        id: p.id, nombre: p.nombre, categoria: p.categoria, precio: p.precio, descuentoPct: Number(p.descuento_pct), promo: p.promo,
        receta: Object.fromEntries((p.recetas || []).map((r) => [r.ingrediente_id, Number(r.cantidad)])),
      }));
    },
    async ordenVisible(mesaId) {
      const m = Number(mesaId);
      const activas = await rest("GET", `ordenes?mesa_id=eq.${m}&estado=in.(abierta,cobrando)&${SELECT_ORDEN}&limit=1`);
      if (activas?.[0]) return aOrden(activas[0]);
      const pagadas = await rest("GET", `ordenes?mesa_id=eq.${m}&estado=eq.pagada&${SELECT_ORDEN}&order=pagada_en.desc&limit=1`);
      return pagadas?.[0] ? aOrden(pagadas[0]) : null;
    },
    async guardarOrden(mesaId, { renglones, totales, descuentoOrdenPct }) {
      const id = await rest("POST", "rpc/guardar_orden", {
        cuerpo: {
          p_mesa: Number(mesaId), p_renglones: renglones, p_descuento_orden_pct: descuentoOrdenPct,
          p_subtotal: totales.subtotal, p_descuento: totales.descuento, p_iva: totales.iva, p_total: totales.total,
        },
      });
      return id ? orden(id) : null;
    },
    async iniciarCobro(ordenId, { telefono, recordar, montoCobrado, expiraEn }) {
      return patchOrden(`id=eq.${encodeURIComponent(ordenId)}&estado=eq.abierta`, {
        estado: "cobrando", telefono, recordar, monto_cobrado: montoCobrado, cobro_expira_en: iso(expiraEn),
        aviso_codigo: null, aviso_mensaje: null, pey_transaction_id: null, codi_id: null,
      });
    },
    async registrarTransaccion(ordenId, { transactionId, codiId }) {
      await patchOrden(`id=eq.${encodeURIComponent(ordenId)}&pey_transaction_id=is.null`, { pey_transaction_id: transactionId, codi_id: codiId });
    },
    async revertirCobro(ordenId, aviso) {
      return patchOrden(`id=eq.${encodeURIComponent(ordenId)}&estado=eq.cobrando`, {
        estado: "abierta", aviso_codigo: aviso.codigo, aviso_mensaje: aviso.mensaje,
      });
    },
    async confirmarPago({ ordenId, transactionId, montoCentavos, pagadoEn }) {
      const r = await rest("POST", "rpc/confirmar_pago", {
        cuerpo: { p_orden: ordenId || null, p_transaction: transactionId, p_monto: montoCentavos, p_pagado_en: iso(pagadoEn) },
      });
      return { resultado: r?.resultado, orden: r?.orden ? await orden(r.orden) : undefined };
    },
    async ingredientes() {
      const filas = await rest("GET", "ingredientes?select=*&order=nombre");
      return filas.map((i) => ({ ...i, existencia: Number(i.existencia), minimo: Number(i.minimo) }));
    },
    async ordenesPagadas(desdeMs, hastaMs) {
      const filas = await rest(
        "GET",
        `ordenes?estado=eq.pagada&pagada_en=gte.${iso(desdeMs)}&pagada_en=lt.${iso(hastaMs)}&${SELECT_ORDEN}&order=pagada_en`,
      );
      return filas.map(aOrden);
    },
    async clientes(telefonos) {
      if (!telefonos.length) return [];
      const lista = telefonos.filter((t) => /^\d{10}$/.test(t)).join(",");
      const filas = await rest("GET", `clientes?telefono=in.(${lista})&select=telefono,visitas,total_gastado`);
      return filas.map((c) => ({ telefono: c.telefono, visitas: c.visitas, totalGastado: c.total_gastado }));
    },
  };
}
