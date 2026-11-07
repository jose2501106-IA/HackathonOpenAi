// Flujo completo con almacén en memoria: SIMULACIÓN y modo real con pey simulado (fetch falso). Ninguna prueba llama servicios reales.
import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { crearApp } from "../lib/app.js";
import { crearAlmacenMemoria } from "../lib/almacen-memoria.js";
import { fetchFalso, leer, pedir, reloj } from "./ayuda.js";

const SECRETO = `whsec_${Buffer.from("secreto-de-prueba-123456").toString("base64")}`;
const ENV_REAL = { PEY_API_KEY: "llave-falsa", PEY_WEBHOOK_SECRET: SECRETO, CAJA_PIN: "1234" };
const PIN = { "x-caja-pin": "1234" };

function armar({ env = {}, rutas = {} } = {}) {
  const ahora = reloj();
  const almacen = crearAlmacenMemoria({ ahora });
  const f = fetchFalso(rutas);
  return { app: crearApp({ env, fetch: f, ahora, almacen }), almacen, f, ahora };
}

const capturar = (app, mesaId, items, headers = {}) =>
  app.cajaOrden(pedir("/api/caja-orden", { metodo: "POST", cuerpo: { mesaId, items }, headers })).then(leer);
const mesa = (app, m = 1, t = `sim${m}`) => app.verMesa(pedir(`/api/mesa?m=${m}&t=${t}`)).then(leer);
const pagar = (app, telefono, m = 1) =>
  app.pagar(pedir("/api/pagar", { metodo: "POST", cuerpo: { m, t: `sim${m}`, telefono, recordar: true } })).then(leer);
const existencia = async (almacen, id) => (await almacen.ingredientes()).find((i) => i.id === id).existencia;

function firmar(cuerpo, ts) {
  const id = `msg_${crypto.randomUUID()}`;
  const llave = Buffer.from(SECRETO.slice(6), "base64");
  const firma = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest("base64");
  return { "webhook-id": id, "webhook-timestamp": String(ts), "webhook-signature": `v1,${firma}` };
}
const webhook = (app, evento, ahoraMs, alterar = false) => {
  const cuerpo = JSON.stringify(evento);
  const headers = firmar(cuerpo, Math.floor(ahoraMs / 1000));
  return app.webhook(pedir("/api/webhook-pey", { metodo: "POST", cuerpo: alterar ? cuerpo.replace("1", "2") : cuerpo, headers })).then(leer);
};

test("SIMULACIÓN: caja captura → mesa ve totales → pagar → simular pago → inventario descontado y reporte", async () => {
  const { app, almacen } = armar();
  const r1 = await capturar(app, 1, [{ productoId: "taco_pastor", cantidad: 3 }, { productoId: "refresco", cantidad: 1 }]);
  assert.equal(r1.status, 200);
  assert.equal(r1.datos.orden.totales.total, 3 * 2250 + 3000);

  const v = await mesa(app);
  assert.equal(v.datos.orden.estado, "abierta");
  assert.equal(v.datos.modo, "simulacion");
  assert.equal(v.datos.negocio.nombre, "Tacos El Gran Abanico");

  assert.equal((await pagar(app, "55123")).datos.error.codigo, "TELEFONO_INVALIDO");
  const antes = await existencia(almacen, "pastor");
  const p = await pagar(app, "55 1234 5678");
  assert.equal(p.status, 200);
  assert.equal(p.datos.orden.estado, "cobrando");
  assert.equal(p.datos.orden.cobro.telefonoOculto, "******5678");
  assert.equal(await existencia(almacen, "pastor"), antes, "no se descuenta antes de pagar");

  // Mientras cobra, la caja no puede editar
  assert.equal((await capturar(app, 1, [{ productoId: "refresco", cantidad: 9 }])).datos.error.codigo, "ORDEN_EN_COBRO");

  const s = await app.simularPago(pedir("/api/simular-pago", { metodo: "POST", cuerpo: { m: 1, t: "sim1" } })).then(leer);
  assert.equal(s.datos.orden.estado, "pagada");
  assert.equal(await existencia(almacen, "pastor"), antes - 180);
  assert.equal(await existencia(almacen, "refresco"), 47);

  const rep = await app.cajaReporte(pedir("/api/caja-reporte?fecha=2026-11-06")).then(leer);
  assert.equal(rep.status, 200);
  assert.equal(rep.datos.ordenes, 1);
  assert.equal(rep.datos.totalVendido, 9750);
  assert.equal(rep.datos.productos.find((x) => x.productoId === "taco_pastor").cantidad, 3);
  assert.equal(rep.datos.clientes.conCelular, 1);

  // Nueva orden en la misma mesa después de pagar
  const r2 = await capturar(app, 1, [{ productoId: "agua_horchata", cantidad: 1 }]);
  assert.equal(r2.datos.orden.estado, "abierta");
  assert.notEqual(r2.datos.orden.id, r1.datos.orden.id);
});

test("SIMULACIÓN: celular sin CoDi (00…) vence con aviso y no descuenta nada", async () => {
  const { app, almacen, ahora } = armar();
  await capturar(app, 2, [{ productoId: "torta_pastor", cantidad: 1 }]);
  const antes = await almacen.ingredientes();
  assert.equal((await pagar(app, "0012345678", 2)).datos.orden.estado, "cobrando");
  ahora.avanzar(21_000);
  const v = await mesa(app, 2);
  assert.equal(v.datos.orden.estado, "abierta");
  assert.equal(v.datos.orden.aviso.codigo, "VENCIDO");
  assert.match(v.datos.orden.aviso.mensaje, /no estar registrado en CoDi/);
  assert.deepEqual(await almacen.ingredientes(), antes);
});

test("etiqueta con token equivocado → MESA_INVALIDA; mesa sin orden → orden null", async () => {
  const { app } = armar();
  assert.equal((await mesa(app, 1, "otro")).datos.error.codigo, "MESA_INVALIDA");
  assert.equal((await mesa(app, 9, "sim9")).status, 404);
  assert.equal((await mesa(app, 3)).datos.orden, null);
  assert.equal((await pagar(app, "5512345678", 3)).datos.error.codigo, "SIN_ORDEN");
});

test("REAL + MODO PRUEBA: manda /codi/pn con $0.10; webhook firmado confirma una sola vez", async () => {
  let txId = "01JTX00000000000000000000A";
  const { app, almacen, f, ahora } = armar({
    env: ENV_REAL,
    rutas: {
      "POST /codi/pn": { status: 200, cuerpo: { transactionId: txId, codiId: "12345678901234567890" } },
      [`GET /transaction/${txId}`]: { status: 200, cuerpo: { id: txId, status: "PENDING", amount: 0.1 } },
    },
  });
  assert.equal((await capturar(app, 1, [{ productoId: "taco_suadero", cantidad: 2 }])).datos.error.codigo, "PIN_REQUERIDO");
  await capturar(app, 1, [{ productoId: "taco_suadero", cantidad: 2 }], PIN);
  const [m1] = await almacen.mesas();
  const p = await app.pagar(pedir("/api/pagar", { metodo: "POST", cuerpo: { m: 1, t: m1.token, telefono: "5512345678" } })).then(leer);
  assert.equal(p.status, 200);
  assert.equal(p.datos.orden.cobro.montoCobrado, 10);
  assert.equal(p.datos.orden.cobro.modoPrueba, true);

  const llamada = f.llamadas.find((l) => l.url.endsWith("/codi/pn"));
  assert.equal(llamada.headers.authorization, "Bearer llave-falsa");
  assert.equal(llamada.cuerpo.amount, 0.1);
  assert.equal(llamada.cuerpo.phoneNumber, "5512345678");
  assert.equal(llamada.cuerpo.expiration, 360);
  assert.match(llamada.cuerpo.numRef, /^\d{1,7}$/);
  assert.equal(typeof llamada.cuerpo.metadata.orden, "string");

  const antes = await existencia(almacen, "suadero");
  const evento = { type: "codi.pn.payment_received", amount: 0.1, transactionId: txId, datePaid: Math.floor(ahora() / 1000), metadata: { externalMetadata: { orden: llamada.cuerpo.metadata.orden } } };
  assert.equal((await webhook(app, evento, ahora(), true)).status, 400, "firma alterada");
  assert.equal(await existencia(almacen, "suadero"), antes);

  const w = await webhook(app, evento, ahora());
  assert.equal(w.datos.resultado, "pagada");
  assert.equal(await existencia(almacen, "suadero"), antes - 120);
  assert.equal((await webhook(app, evento, ahora())).datos.resultado, "ya_pagada");
  assert.equal(await existencia(almacen, "suadero"), antes - 120, "sin doble descuento");

  const v = await app.verMesa(pedir(`/api/mesa?m=1&t=${m1.token}`)).then(leer);
  assert.equal(v.datos.orden.estado, "pagada");
  txId = "x";
});

test("REAL: webhook con monto distinto no paga ni descuenta", async () => {
  const tx = "01JTX00000000000000000000B";
  const { app, almacen, ahora } = armar({ env: ENV_REAL, rutas: { "POST /codi/pn": { cuerpo: { transactionId: tx, codiId: "1" } } } });
  await capturar(app, 4, [{ productoId: "refresco", cantidad: 1 }], PIN);
  const m4 = (await almacen.mesas()).find((m) => m.id === 4);
  await app.pagar(pedir("/api/pagar", { metodo: "POST", cuerpo: { m: 4, t: m4.token, telefono: "5512345678" } }));
  const w = await webhook(app, { type: "codi.pn.payment_received", amount: 0.05, transactionId: tx, datePaid: 1 }, ahora());
  assert.equal(w.datos.resultado, "monto_distinto");
  assert.equal(await existencia(almacen, "refresco"), 48);
});

test("REAL: pey rechaza la solicitud → error visible, orden abierta con aviso, inventario intacto", async () => {
  const { app, almacen } = armar({
    env: ENV_REAL,
    rutas: { "POST /codi/pn": { status: 400, cuerpo: { error: { type: "INVALID_STATE", message: "API key does not have CoDi enabled" } } } },
  });
  await capturar(app, 3, [{ productoId: "gringa_pastor", cantidad: 1 }], PIN);
  const m3 = (await almacen.mesas()).find((m) => m.id === 3);
  const antes = await almacen.ingredientes();
  const p = await app.pagar(pedir("/api/pagar", { metodo: "POST", cuerpo: { m: 3, t: m3.token, telefono: "5512345678" } })).then(leer);
  assert.equal(p.status, 502);
  assert.equal(p.datos.error.codigo, "PEY_RECHAZO");
  assert.match(p.datos.error.mensaje, /no tiene CoDi activo/);
  const v = await app.verMesa(pedir(`/api/mesa?m=3&t=${m3.token}`)).then(leer);
  assert.equal(v.datos.orden.estado, "abierta");
  assert.equal(v.datos.orden.aviso.codigo, "PEY_RECHAZO");
  assert.deepEqual(await almacen.ingredientes(), antes);
});

test("REAL: sin webhook, la consulta a pey confirma (PAID) o vence (PENDING tras la vigencia)", async () => {
  const tx = "01JTX00000000000000000000C";
  let estado = "PENDING";
  const { app, almacen, ahora } = armar({
    env: ENV_REAL,
    rutas: {
      "POST /codi/pn": { cuerpo: { transactionId: tx, codiId: "1" } },
      [`GET /transaction/${tx}`]: () => ({ cuerpo: { id: tx, status: estado, amount: 0.1, amountBreakdown: { base: 0.1, tip: 0, fee: 0 }, datePaid: 1794000100 } }),
    },
  });
  const [m1, m2] = await almacen.mesas();
  await capturar(app, 1, [{ productoId: "taco_bistec", cantidad: 1 }], PIN);
  await app.pagar(pedir("/api/pagar", { metodo: "POST", cuerpo: { m: 1, t: m1.token, telefono: "5512345678" } }));
  ahora.avanzar(5_000);
  assert.equal((await app.verMesa(pedir(`/api/mesa?m=1&t=${m1.token}`)).then(leer)).datos.orden.estado, "cobrando");
  estado = "PAID";
  ahora.avanzar(5_000);
  assert.equal((await app.verMesa(pedir(`/api/mesa?m=1&t=${m1.token}`)).then(leer)).datos.orden.estado, "pagada");

  // Otra mesa: nunca se paga → aviso de vencido después de 360 s + gracia
  estado = "PENDING";
  await capturar(app, 2, [{ productoId: "taco_bistec", cantidad: 1 }], PIN);
  await app.pagar(pedir("/api/pagar", { metodo: "POST", cuerpo: { m: 2, t: m2.token, telefono: "5512345678" } }));
  ahora.avanzar(380_000);
  const v = await app.verMesa(pedir(`/api/mesa?m=2&t=${m2.token}`)).then(leer);
  assert.equal(v.datos.orden.estado, "abierta");
  assert.equal(v.datos.orden.aviso.codigo, "VENCIDO");
});

test("salud no expone llaves; simular pago está prohibido en modo real; IA apagada sin llave", async () => {
  const { app } = armar({ env: ENV_REAL });
  const s = await app.salud(pedir("/api/salud")).then(leer);
  assert.equal(s.datos.modo, "real");
  assert.equal(s.datos.cobroPrueba, true);
  assert.equal(s.datos.montoPrueba, 10);
  assert.ok(!JSON.stringify(s.datos).includes("llave-falsa"));
  const sim = await app.simularPago(pedir("/api/simular-pago", { metodo: "POST", cuerpo: { m: 1, t: "x" } })).then(leer);
  assert.equal(sim.status, 403);
  const ia = await app.cajaAnalisis(pedir("/api/caja-analisis", { metodo: "POST", headers: PIN })).then(leer);
  assert.equal(ia.datos.disponible, false);
});

test("modo real sin CAJA_PIN: la caja se bloquea", async () => {
  const { app } = armar({ env: { PEY_API_KEY: "llave-falsa" } });
  const r = await app.cajaEstado(pedir("/api/caja-estado")).then(leer);
  assert.equal(r.datos.error.codigo, "PIN_NO_CONFIGURADO");
});
