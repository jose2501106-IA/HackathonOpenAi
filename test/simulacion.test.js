// Flujo completo sin llaves (SIMULACIÓN): no se llama a ningún servicio.
import { test } from "node:test";
import assert from "node:assert/strict";
import { crearApp, SIM_SEGUNDOS_HASTA_PAGO } from "../lib/app.js";
import { fetchFalso, pedir, leer, reloj, ORIGEN } from "./ayuda.js";

test("salud y menú en SIMULACIÓN", async () => {
  const app = crearApp({ env: {}, fetch: fetchFalso() });
  const { datos } = await leer(await app.salud(pedir("/api/salud")));
  assert.deepEqual(datos, { ok: true, modo: "simulacion", ia: false, montoMaximo: 1, negocio: "Taquería El Ejemplo", pinRequerido: false });
  const menu = await leer(await app.menu(pedir("/api/menu")));
  assert.equal(menu.datos.productos.length, 9);
  assert.equal(menu.datos.ejemplo, true);
});

test("pedido → liga con QR → cobro push → pagado a los 8 s", async () => {
  const ahora = reloj();
  const f = fetchFalso();
  const app = crearApp({ env: {}, fetch: f, ahora });

  const creado = await leer(await app.crearPedido(pedir("/api/pedido", { metodo: "POST", cuerpo: { items: [{ id: "pa", cantidad: 4 }, { id: "ho", cantidad: 1 }] } })));
  assert.equal(creado.status, 200);
  const { codigo, url, qrSvg, pedido, cobro } = creado.datos;
  assert.equal(url, `${ORIGEN}/p?o=${codigo}`);
  assert.match(qrSvg, /^<svg/);
  assert.equal(pedido.total, 130);
  assert.deepEqual(cobro, { monto: 1, montoPrueba: true });

  const visto = await leer(await app.verPedido(pedir(`/api/pedido?o=${encodeURIComponent(codigo)}`)));
  assert.equal(visto.status, 200);
  assert.equal(visto.datos.modo, "simulacion");
  assert.equal(visto.datos.pedido.total, 130);

  const sinConfirmar = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "push", telefono: "5512345678" } })));
  assert.equal(sinConfirmar.status, 400);
  assert.equal(sinConfirmar.datos.error.codigo, "FALTA_CONFIRMACION");

  const telMalo = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "push", telefono: "55 1234 5678", confirmo: true } })));
  assert.equal(telMalo.datos.error.codigo, "TELEFONO_INVALIDO");

  const cobroPush = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "push", telefono: "5512345678", confirmo: true } })));
  assert.equal(cobroPush.status, 200);
  assert.equal(cobroPush.datos.simulacion, true);
  assert.equal(cobroPush.datos.monto, 1);
  const ruta = `/api/estado?o=${encodeURIComponent(codigo)}&metodo=push&id=${cobroPush.datos.id}`;

  assert.equal((await leer(await app.estado(pedir(ruta)))).datos.estado, "pendiente");
  ahora.avanzar(SIM_SEGUNDOS_HASTA_PAGO * 1000);
  const pagado = await leer(await app.estado(pedir(ruta)));
  assert.equal(pagado.datos.estado, "pagado");
  assert.equal(pagado.datos.monto, 1);
  assert.equal(f.llamadas.length, 0, "en SIMULACIÓN no se llama a pey ni a OpenAI");
});

test("QR de respaldo en SIMULACIÓN y método inválido", async () => {
  const app = crearApp({ env: {}, fetch: fetchFalso() });
  const { codigo } = (await leer(await app.crearPedido(pedir("/api/pedido", { metodo: "POST", cuerpo: { items: [{ id: "qu", cantidad: 1 }] } })))).datos;
  const qr = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "qr", confirmo: true } })));
  assert.equal(qr.status, 200);
  assert.match(qr.datos.qrSvg, /^<svg/);
  const malo = await leer(await app.crearCobro(pedir("/api/cobros", { metodo: "POST", cuerpo: { o: codigo, metodo: "tarjeta", confirmo: true } })));
  assert.equal(malo.datos.error.codigo, "METODO_INVALIDO");
});

test("con CAJA_PIN, solo quien lo sabe crea pedidos", async () => {
  const app = crearApp({ env: { CAJA_PIN: "4321" }, fetch: fetchFalso() });
  assert.equal((await leer(await app.salud(pedir("/api/salud")))).datos.pinRequerido, true);
  const cuerpo = { items: [{ id: "pa", cantidad: 1 }] };
  const sinPin = await leer(await app.crearPedido(pedir("/api/pedido", { metodo: "POST", cuerpo })));
  assert.equal(sinPin.status, 401);
  assert.equal(sinPin.datos.error.codigo, "PIN_INCORRECTO");
  const conPin = await app.crearPedido(pedir("/api/pedido", { metodo: "POST", cuerpo, headers: { "x-caja-pin": "4321" } }));
  assert.equal(conPin.status, 200);
});

test("errores de entrada claros", async () => {
  const app = crearApp({ env: {}, fetch: fetchFalso() });
  const vacio = await leer(await app.interpretar(pedir("/api/interpretar", { metodo: "POST", cuerpo: { texto: "  " } })));
  assert.equal(vacio.datos.error.codigo, "TEXTO_VACIO");
  const json = await leer(await app.crearPedido(pedir("/api/pedido", { metodo: "POST", cuerpo: "{no es json" })));
  assert.equal(json.datos.error.codigo, "JSON_INVALIDO");
  const malo = await leer(await app.verPedido(pedir("/api/pedido?o=123")));
  assert.equal(malo.status, 400);
  assert.equal(malo.datos.error.codigo, "PEDIDO_INVALIDO");
  const basico = await leer(await app.interpretar(pedir("/api/interpretar", { metodo: "POST", cuerpo: { texto: "dos de pastor" } })));
  assert.equal(basico.datos.fuente, "basica");
  assert.equal(basico.datos.items[0].cantidad, 2);
});
