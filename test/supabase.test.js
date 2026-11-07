// Adaptador de Supabase con fetch falso: rutas de PostgREST, encabezados y conversión de filas.
import { test } from "node:test";
import assert from "node:assert/strict";
import { crearAlmacenSupabase } from "../lib/almacen-supabase.js";

const URL_SB = "https://proyecto.supabase.co";

function fetchSb(respuestas) {
  const llamadas = [];
  const f = async (url, op = {}) => {
    const u = new URL(url);
    llamadas.push({ metodo: op.method, ruta: decodeURIComponent(u.pathname + u.search), headers: op.headers, cuerpo: op.body ? JSON.parse(op.body) : null });
    const r = respuestas.shift();
    return new Response(JSON.stringify(r.cuerpo), { status: r.status || 200 });
  };
  f.llamadas = llamadas;
  return f;
}

const FILA = {
  id: "o1", mesa_id: 2, estado: "cobrando", descuento_orden_pct: "0", subtotal: 1940, descuento: 0, iva: 310, total: 2250,
  telefono: "5512345678", recordar: true, monto_cobrado: 10, cobro_expira_en: "2026-11-07T22:00:00Z", pey_transaction_id: "TX",
  codi_id: null, aviso_codigo: null, aviso_mensaje: null, pagada_en: null, creada_en: "2026-11-07T21:00:00Z", actualizada_en: "2026-11-07T21:00:00Z",
  orden_items: [{ producto_id: "taco_pastor", nombre: "Taco al pastor", cantidad: 1, precio_unitario: 2500, descuento_pct: "10", importe_bruto: 2500, descuento: 250, importe: 2250 }],
};

test("Supabase: guarda la orden con la función RPC y convierte la fila", async () => {
  const f = fetchSb([{ cuerpo: "o1" }, { cuerpo: [FILA] }]);
  const alm = crearAlmacenSupabase({ url: URL_SB, llave: "sb_secret_falsa", fetch: f });
  const o = await alm.guardarOrden(2, { renglones: [], totales: { subtotal: 1, descuento: 0, iva: 0, total: 1 }, descuentoOrdenPct: 0 });
  assert.equal(f.llamadas[0].ruta, "/rest/v1/rpc/guardar_orden");
  assert.equal(f.llamadas[0].cuerpo.p_mesa, 2);
  assert.equal(f.llamadas[0].headers.apikey, "sb_secret_falsa");
  assert.equal(f.llamadas[0].headers.authorization, undefined, "las llaves nuevas no van como Bearer");
  assert.equal(o.renglones[0].descuentoPct, 10);
  assert.equal(o.cobroExpiraEn, Date.parse("2026-11-07T22:00:00Z"));
  assert.equal(o.totales.total, 2250);
});

test("Supabase: ORDEN_EN_COBRO de la función se vuelve 409; iniciarCobro filtra por estado abierta", async () => {
  const f = fetchSb([{ status: 400, cuerpo: { code: "P0001", message: "ORDEN_EN_COBRO" } }, { cuerpo: [] }]);
  const alm = crearAlmacenSupabase({ url: URL_SB, llave: "eyJfalsa", fetch: f });
  await assert.rejects(alm.guardarOrden(1, { renglones: [], totales: {}, descuentoOrdenPct: 0 }), { codigo: "ORDEN_EN_COBRO", status: 409 });
  assert.equal(f.llamadas[0].headers.authorization, "Bearer eyJfalsa");
  const r = await alm.iniciarCobro("o1", { telefono: "5512345678", recordar: false, montoCobrado: 10, expiraEn: 0 });
  assert.equal(r, null);
  assert.match(f.llamadas[1].ruta, /ordenes\?id=eq\.o1&estado=eq\.abierta/);
  assert.equal(f.llamadas[1].metodo, "PATCH");
});

test("Supabase: confirmarPago llama a la RPC y regresa la orden", async () => {
  const f = fetchSb([{ cuerpo: { resultado: "pagada", orden: "o1" } }, { cuerpo: [{ ...FILA, estado: "pagada" }] }]);
  const alm = crearAlmacenSupabase({ url: URL_SB, llave: "sb_secret_falsa", fetch: f });
  const r = await alm.confirmarPago({ ordenId: null, transactionId: "TX", montoCentavos: 10, pagadoEn: 0 });
  assert.equal(f.llamadas[0].ruta, "/rest/v1/rpc/confirmar_pago");
  assert.deepEqual(f.llamadas[0].cuerpo, { p_orden: null, p_transaction: "TX", p_monto: 10, p_pagado_en: "1970-01-01T00:00:00.000Z" });
  assert.equal(r.resultado, "pagada");
  assert.equal(r.orden.estado, "pagada");
});
