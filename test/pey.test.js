// Modo real con fetch simulado: revisa qué se le manda a pey y cómo se interpreta lo que responde.
import { test } from "node:test";
import assert from "node:assert/strict";
import { crearApp } from "../lib/app.js";
import { fetchFalso, pedir, leer, reloj } from "./ayuda.js";

const ENV = { PEY_API_KEY: "llave-de-prueba-pey" };
const TX = "01JG0000000000000000000000";

async function pedidoNuevo(app) {
  const r = await leer(await app.crearPedido(pedir("/api/pedido", { metodo: "POST", cuerpo: { items: [{ id: "pa", cantidad: 4 }, { id: "ho", cantidad: 1 }] } })));
  return r.datos;
}

test("push: llama a POST /codi/pn con la llave, el máximo y la referencia del pedido", async () => {
  const f = fetchFalso({ "POST /codi/pn": { cuerpo: { transactionId: TX, codiId: "12345678901234567890" } } });
  const app = crearApp({ env: ENV, fetch: f, ahora: reloj() });
  const { codigo, pedido } = await pedidoNuevo(app);
  const r = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "push", telefono: "5512345678", confirmo: true } })));
  assert.equal(r.status, 200);
  assert.deepEqual({ ...r.datos, vence: 0 }, { metodo: "push", monto: 1, montoPrueba: true, vence: 0, simulacion: false, id: TX });

  const [llamada] = f.llamadas;
  assert.equal(llamada.url, "https://api.pey.mx/codi/pn");
  assert.equal(llamada.metodo, "POST");
  assert.equal(llamada.headers.authorization, "Bearer llave-de-prueba-pey");
  assert.deepEqual(llamada.cuerpo, {
    amount: 1,
    phoneNumber: "5512345678",
    concept: `Tocale pedido ${pedido.id}`,
    expiration: 600,
    numRef: pedido.id,
    metadata: { pedido: pedido.id, app: "tocale" },
  });
  assert.ok(!JSON.stringify(r.datos).includes("llave-de-prueba-pey"), "la llave nunca regresa al navegador");
});

test("push rechazada por pey: 502 con pista para el cliente; sin red: 503", async () => {
  const f = fetchFalso({ "POST /codi/pn": { status: 400, cuerpo: { error: { type: "INVALID_STATE" } } } });
  const app = crearApp({ env: ENV, fetch: f });
  const { codigo } = await pedidoNuevo(app);
  const r = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "push", telefono: "5512345678", confirmo: true } })));
  assert.equal(r.status, 502);
  assert.equal(r.datos.error.codigo, "PEY_ERROR");
  assert.match(r.datos.error.mensaje, /INVALID_STATE/);
  assert.match(r.datos.error.mensaje, /CoDi activo/);

  const sinRed = crearApp({ env: ENV, fetch: fetchFalso({ "POST /codi/pn": "red" }) });
  const r2 = await leer(await sinRed.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "push", telefono: "5512345678", confirmo: true } })));
  assert.equal(r2.status, 503);
  assert.equal(r2.datos.error.codigo, "PEY_NO_DISPONIBLE");
});

test("estado de una push: pendiente, pagado, monto menor y no encontrado", async () => {
  let respuesta = { cuerpo: { id: TX, status: "PENDING", amount: 1 } };
  const f = fetchFalso({ [`GET /transaction/${TX}`]: () => respuesta });
  const app = crearApp({ env: ENV, fetch: f });
  const { codigo } = await pedidoNuevo(app);
  const ruta = `/api/estado?o=${encodeURIComponent(codigo)}&metodo=push&id=${TX}`;

  assert.equal((await leer(await app.estado(pedir(ruta)))).datos.estado, "pendiente");
  respuesta = { cuerpo: { id: TX, status: "PAID", amount: 1, datePaid: 1794000042 } };
  assert.deepEqual((await leer(await app.estado(pedir(ruta)))).datos, { estado: "pagado", monto: 1, pagadoEn: 1794000042, simulacion: false });
  respuesta = { cuerpo: { id: TX, status: "PAID", amount: 0.5, datePaid: 1794000042 } };
  assert.equal((await leer(await app.estado(pedir(ruta)))).datos.estado, "no_verificable");
  respuesta = { status: 404, cuerpo: { error: { type: "NOT_FOUND" } } };
  assert.equal((await leer(await app.estado(pedir(ruta)))).datos.estado, "no_verificable");
  assert.equal(f.llamadas.at(-1).url, `https://api.pey.mx/transaction/${TX}`);
});

test("la caja encuentra el pago por número de pedido en las transacciones de la llave", async () => {
  let items = [];
  const f = fetchFalso({ "GET /transaction/api-key": () => ({ cuerpo: { items, nextToken: null } }) });
  const app = crearApp({ env: ENV, fetch: f });
  const { codigo, pedido } = await pedidoNuevo(app);
  const ruta = `/api/estado?o=${encodeURIComponent(codigo)}`;
  assert.equal((await leer(await app.estado(pedir(ruta)))).datos.estado, "pendiente");
  items = [
    { id: "otro", status: "PAID", amount: 1, metadata: { externalMetadata: { pedido: "9999999" } } },
    { id: TX, status: "PAID", amount: 1, datePaid: 1794000050, metadata: { externalMetadata: { pedido: pedido.id } } },
  ];
  const r = (await leer(await app.estado(pedir(ruta)))).datos;
  assert.equal(r.estado, "pagado");
  assert.equal(r.pagosRecibidos, 1);
});

test("QR de respaldo: POST /codi/qr sin imagen y QR dibujado a partir de qrString", async () => {
  const f = fetchFalso({
    "POST /codi/qr": { status: 201, cuerpo: { id: "a0b1c2d3e4", qrString: "contenido-codi-ficticio", qrImage: null } },
    "GET /transaction/codi/qr/a0b1c2d3e4": { cuerpo: { items: [{ status: "PAID", amount: 1, datePaid: 1794000060 }], nextToken: null } },
  });
  const app = crearApp({ env: ENV, fetch: f });
  const { codigo } = await pedidoNuevo(app);
  const r = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "qr", confirmo: true } })));
  assert.equal(r.status, 200);
  assert.equal(r.datos.id, "a0b1c2d3e4");
  assert.match(r.datos.qrSvg, /^<svg/);
  assert.equal(f.llamadas[0].cuerpo.generateImage, false);
  assert.equal(f.llamadas[0].cuerpo.expiration, 600);
  const e = await leer(await app.estado(pedir(`/api/estado?o=${encodeURIComponent(codigo)}&metodo=qr&id=a0b1c2d3e4`)));
  assert.equal(e.datos.estado, "pagado");
});

test("MONTO_MAXIMO_MXN sube el máximo, pero no más allá del tope del código", async () => {
  const app = crearApp({ env: { ...ENV, MONTO_MAXIMO_MXN: "500" }, fetch: fetchFalso() });
  assert.deepEqual((await pedidoNuevo(app)).cobro, { monto: 130, montoPrueba: false });
  const loco = crearApp({ env: { ...ENV, MONTO_MAXIMO_MXN: "999999" }, fetch: fetchFalso() });
  assert.equal((await leer(await loco.salud(pedir("/api/salud")))).datos.montoMaximo, 1000);
  const basura = crearApp({ env: { ...ENV, MONTO_MAXIMO_MXN: "abc" }, fetch: fetchFalso() });
  assert.equal((await leer(await basura.salud(pedir("/api/salud")))).datos.montoMaximo, 1);
});
