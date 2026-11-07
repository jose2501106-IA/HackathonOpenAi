// Pruebas del cliente de pey (app/lib/pey.js) y de qr.js. fetch simulado: ninguna prueba llama servicios reales.
import { test } from "node:test";
import assert from "node:assert/strict";
import { leerConfig } from "../lib/config.js";
import { PeyError, crearQr, consultarPagosQr, listarPagosRecientes } from "../lib/pey.js";
import { imagenQr, normalizarQrImage } from "../lib/qr.js";

const VARS = ["PEY_API_KEY", "PEY_WEBHOOK_SECRET", "OPENAI_API_KEY", "MODO_PAGO", "MAX_MONTO_MXN", "APP_SECRET"];

function conEntorno(t, valores) {
  const previo = Object.fromEntries(VARS.map((k) => [k, process.env[k]]));
  for (const k of VARS) delete process.env[k];
  for (const [k, v] of Object.entries(valores)) process.env[k] = v;
  t.after(() => {
    for (const [k, v] of Object.entries(previo)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });
}

// Reemplaza globalThis.fetch durante la prueba y lo restaura al final. Cada respuesta: { status, body } o un Error.
function simularFetch(t, respuestas) {
  const original = globalThis.fetch;
  const llamadas = [];
  globalThis.fetch = async (url, opciones = {}) => {
    llamadas.push({
      url: String(url),
      metodo: opciones.method || "GET",
      headers: opciones.headers || {},
      cuerpo: opciones.body ? JSON.parse(opciones.body) : null,
    });
    const r = respuestas.shift();
    if (!r) throw new Error("fetch inesperado en la prueba");
    if (r instanceof Error) throw r;
    return new Response(r.body === undefined ? "" : JSON.stringify(r.body), {
      status: r.status ?? 200,
      headers: { "content-type": "application/json" },
    });
  };
  t.after(() => {
    globalThis.fetch = original;
  });
  return llamadas;
}

function cfgPrueba(t) {
  conEntorno(t, { PEY_API_KEY: "llave_de_prueba", MODO_PAGO: "prueba" });
  return leerConfig();
}

test("crearQr manda a pey el monto en pesos, generateImage, expiration y numRef", async (t) => {
  const cfg = cfgPrueba(t);
  const llamadas = simularFetch(t, [{ status: 201, body: { id: "IDC123", qrString: "CODI-QR", qrImage: "iVBORw0K" } }]);
  const qr = await crearQr({ montoCentavos: 150, concepto: "Dulce de tamarindo", numRef: "1234567", expiracionSegundos: 600 }, cfg);
  assert.deepEqual(qr, { id: "IDC123", qrString: "CODI-QR", qrImageBase64: "iVBORw0K" });
  assert.equal(llamadas.length, 1);
  const [l] = llamadas;
  assert.equal(l.url, "https://api.pey.mx/codi/qr");
  assert.equal(l.metodo, "POST");
  assert.equal(l.headers.Authorization, "Bearer llave_de_prueba");
  assert.deepEqual(l.cuerpo, { amount: 1.5, concept: "Dulce de tamarindo", expiration: 600, numRef: "1234567", generateImage: true });
});

test("crearQr: qrImage null → qrImageBase64 null; concepto recortado a 40", async (t) => {
  const cfg = cfgPrueba(t);
  const llamadas = simularFetch(t, [{ status: 201, body: { id: "IDC9", qrString: "CODI", qrImage: null } }]);
  const qr = await crearQr({ montoCentavos: 1, concepto: "x".repeat(60), numRef: "7", expiracionSegundos: 600 }, cfg);
  assert.equal(qr.qrImageBase64, null);
  assert.equal(llamadas[0].cuerpo.amount, 0.01);
  assert.equal(llamadas[0].cuerpo.concept.length, 40);
});

test("crearQr rechaza numRef y expiración inválidos sin llamar a pey", async (t) => {
  const cfg = cfgPrueba(t);
  const llamadas = simularFetch(t, []);
  await assert.rejects(crearQr({ montoCentavos: 100, concepto: "a", numRef: "12345678", expiracionSegundos: 600 }, cfg), TypeError);
  await assert.rejects(crearQr({ montoCentavos: 100, concepto: "a", numRef: "12a", expiracionSegundos: 600 }, cfg), TypeError);
  await assert.rejects(crearQr({ montoCentavos: 100, concepto: "a", numRef: "1", expiracionSegundos: 60 }, cfg), TypeError);
  assert.equal(llamadas.length, 0);
});

test("errores de pey: 401 e INVALID_STATE → PEY_NO_AUTORIZADO; 5xx y red → PEY_NO_RESPONDE; 404 → status 404", async (t) => {
  const cfg = cfgPrueba(t);
  simularFetch(t, [
    { status: 401, body: { error: { message: "unauthorized", type: "UNAUTHORIZED", requestId: "r1" } } },
    { status: 400, body: { error: { message: "CoDi no habilitado", type: "INVALID_STATE", requestId: "r2" } } },
    { status: 503, body: { error: { message: "down", type: "SERVICE_UNAVAILABLE", requestId: "r3" } } },
    new TypeError("fetch failed"),
    { status: 404, body: { error: { message: "not found", type: "NOT_FOUND", requestId: "r4" } } },
    { status: 400, body: { error: { message: "bad", type: "INVALID_AMOUNT", requestId: "r5" } } },
  ]);
  const crear = () => crearQr({ montoCentavos: 100, concepto: "a", numRef: "1", expiracionSegundos: 600 }, cfg);
  const esperado = (status, codigo) => (e) => e instanceof PeyError && e.status === status && e.codigo === codigo;
  await assert.rejects(crear(), esperado(401, "PEY_NO_AUTORIZADO"));
  await assert.rejects(crear(), esperado(400, "PEY_NO_AUTORIZADO"));
  await assert.rejects(crear(), esperado(503, "PEY_NO_RESPONDE"));
  await assert.rejects(crear(), esperado(0, "PEY_NO_RESPONDE"));
  await assert.rejects(consultarPagosQr("IDC404", cfg), esperado(404, "PEY_NO_ENCONTRADO"));
  await assert.rejects(crear(), esperado(400, "PEY_RECHAZO"));
});

test("errores de pey: el mensaje no incluye la llave", async (t) => {
  const cfg = cfgPrueba(t);
  simularFetch(t, [{ status: 401, body: { error: { message: "bad key llave_de_prueba", type: "X" } } }]);
  await assert.rejects(consultarPagosQr("IDC1", cfg), (e) => !e.message.includes("llave_de_prueba"));
});

test("consultarPagosQr regresa los items (con datePaid null si falta) y codifica el id", async (t) => {
  const cfg = cfgPrueba(t);
  const llamadas = simularFetch(t, [
    { status: 200, body: { items: [{ id: "01T", status: "PENDING", amount: 1 }, { id: "01U", status: "PAID", amount: 1, datePaid: 1794000060 }], nextToken: null } },
  ]);
  const items = await consultarPagosQr("ID/C 1", cfg);
  assert.equal(llamadas[0].url, "https://api.pey.mx/transaction/codi/qr/ID%2FC%201");
  assert.equal(llamadas[0].headers.Authorization, "Bearer llave_de_prueba");
  assert.equal(items.length, 2);
  assert.equal(items[0].datePaid, null);
  assert.equal(items[1].status, "PAID");
});

test("listarPagosRecientes: pagina con nextToken, máximo 3 páginas, solo PAID desde desdeEpoch", async (t) => {
  const cfg = cfgPrueba(t);
  const desde = 1_794_000_000;
  const pagina = (n, nextToken) => ({
    status: 200,
    body: {
      items: [
        { id: `P${n}`, status: "PAID", amount: 1, dateCreated: desde + 500 - n, datePaid: desde + 600 - n, metadata: { trackingKey: `CLAVE${n}` } },
        { id: `Q${n}`, status: "PENDING", amount: 2, dateCreated: desde + 400 - n },
        { id: `R${n}`, status: "PAID", amount: 3.5, dateCreated: desde + 300 - n, datePaid: desde + 350 - n },
      ],
      nextToken,
    },
  });
  const llamadas = simularFetch(t, [pagina(1, "tok2"), pagina(2, "tok3"), pagina(3, "tok4"), pagina(4, null)]);
  const pagos = await listarPagosRecientes({ desdeEpoch: desde }, cfg);
  assert.equal(llamadas.length, 3, "no pasa de 3 páginas");
  assert.equal(llamadas[0].url, "https://api.pey.mx/transaction/api-key");
  assert.equal(llamadas[1].url, "https://api.pey.mx/transaction/api-key?nextToken=tok2");
  assert.equal(llamadas[2].url, "https://api.pey.mx/transaction/api-key?nextToken=tok3");
  assert.equal(pagos.length, 6);
  assert.deepEqual(pagos[0], {
    id: "P1",
    monto: 1,
    fechaPago: new Date((desde + 599) * 1000).toISOString(),
    claveRastreo: "CLAVE1",
  });
  assert.equal(pagos[1].claveRastreo, null);
  assert.equal(pagos[1].monto, 3.5);
  assert.ok(pagos.every((p) => !p.id.startsWith("Q")), "sin PENDING");
});

test("listarPagosRecientes: corta al llegar a pagos anteriores a desdeEpoch y acepta milisegundos", async (t) => {
  const cfg = cfgPrueba(t);
  const desde = 1_794_000_000;
  const llamadas = simularFetch(t, [
    {
      status: 200,
      body: {
        items: [
          { id: "NUEVO", status: "PAID", amount: 1, dateCreated: desde + 10, datePaid: desde + 20 },
          { id: "VIEJO", status: "PAID", amount: 1, dateCreated: desde - 100, datePaid: desde - 90 },
        ],
        nextToken: "tok2",
      },
    },
  ]);
  const pagos = await listarPagosRecientes({ desdeEpoch: desde * 1000 }, cfg);
  assert.equal(llamadas.length, 1, "no pide la página 2");
  assert.deepEqual(pagos.map((p) => p.id), ["NUEVO"]);
});

test("qr.js: imagenQr da un PNG en data URL; normalizarQrImage agrega el prefijo", async () => {
  const img = await imagenQr("SIMULACION|sim_1|1.00");
  assert.match(img, /^data:image\/png;base64,[A-Za-z0-9+/]+=*$/);
  assert.equal(normalizarQrImage("iVBORw0K\n"), "data:image/png;base64,iVBORw0K");
  assert.equal(normalizarQrImage("data:image/png;base64,AAA"), "data:image/png;base64,AAA");
  assert.equal(normalizarQrImage(null), null);
  assert.equal(normalizarQrImage(""), null);
});
