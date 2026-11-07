// Pruebas del agente (POST /api/agente): reglas locales, function calling simulado, tope y fallas de OpenAI.
// Ninguna prueba llama servicios reales: globalThis.fetch se reemplaza y se restaura.
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import { POST as agente } from "../api/agente.js";
import { interpretarVenta, interpretarConReglas, HERRAMIENTA_CREAR_COBRO } from "../lib/agente.js";
import { buscarProducto, CATALOGO } from "../lib/catalogo.js";
import { llamarResponses } from "../lib/openai.js";
import { leerConfig } from "../lib/config.js";

const VARIABLES = ["OPENAI_API_KEY", "OPENAI_MODEL", "PEY_API_KEY", "MODO_PAGO", "MAX_MONTO_MXN", "APP_SECRET"];
const fetchOriginal = globalThis.fetch;
let respaldo = {};
let llamadas = [];

beforeEach(() => {
  respaldo = {};
  for (const v of VARIABLES) {
    respaldo[v] = process.env[v];
    delete process.env[v];
  }
  llamadas = [];
  globalThis.fetch = async (url) => {
    throw new Error(`Prueba sin red: no se esperaba fetch a ${url}`);
  };
});

afterEach(() => {
  globalThis.fetch = fetchOriginal;
  for (const v of VARIABLES) {
    if (respaldo[v] === undefined) delete process.env[v];
    else process.env[v] = respaldo[v];
  }
});

function simularOpenAI(responder) {
  globalThis.fetch = async (url, opciones = {}) => {
    const cuerpo = JSON.parse(opciones.body);
    llamadas.push({ url: String(url), headers: opciones.headers, cuerpo });
    return responder({ url: String(url), cuerpo, signal: opciones.signal });
  };
}

const respuestaJson = (datos, status = 200) =>
  new Response(JSON.stringify(datos), { status, headers: { "content-type": "application/json" } });

const conLlamada = (args) => ({
  id: "resp_1",
  status: "completed",
  output: [
    { type: "reasoning", id: "rs_1", summary: [] },
    { type: "function_call", call_id: "call_1", name: "crear_cobro", arguments: JSON.stringify(args) },
  ],
});

const pedir = (cuerpo) =>
  new Request("http://localhost/api/agente", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cuerpo),
  });

// ---------- catálogo ----------
test("catálogo de ejemplo: dulce-tamarindo a $1 y todo ≤ $20", () => {
  assert.equal(buscarProducto("dulce-tamarindo").precio, 1);
  assert.equal(buscarProducto("Dulces de Tamarindo").id, "dulce-tamarindo");
  assert.equal(buscarProducto("mazapanes").id, "mazapan");
  assert.equal(buscarProducto("tacos al pastor"), null);
  assert.ok(CATALOGO.length >= 7 && CATALOGO.length <= 9);
  for (const p of CATALOGO) assert.ok(p.precio > 0 && p.precio <= 20, p.id);
});

// ---------- reglas locales ----------
test("reglas: «cóbrale un dulce de tamarindo» → $1 del catálogo", () => {
  const r = interpretarConReglas("Cóbrale un dulce de tamarindo", leerConfig());
  assert.equal(r.origen, "reglas");
  assert.equal(r.propuesta.monto, 1);
  assert.equal(r.propuesta.concepto, "Dulce de tamarindo");
  assert.deepEqual(r.propuesta.detalle, [
    { producto_id: "dulce-tamarindo", nombre: "Dulce de tamarindo", cantidad: 1, precioUnitario: 1, subtotal: 1 },
  ]);
  assert.equal(r.respuesta, "Te propongo cobrar $1.00 por 1 dulce de tamarindo.");
});

test("reglas: «cóbrale 85 de dos tacos» → 85 y avisa el tope sin bloquear", () => {
  const r = interpretarConReglas("cóbrale 85 de dos tacos", leerConfig());
  assert.equal(r.propuesta.monto, 85);
  assert.deepEqual(r.propuesta.detalle, []);
  assert.equal(r.propuesta.concepto, "Dos tacos");
  assert.match(r.respuesta, /tope de \$20\.00/);
});

test("reglas: formatos de monto «$85», «85 pesos», «85», «12.50»", () => {
  process.env.MAX_MONTO_MXN = "500";
  const cfg = leerConfig();
  for (const [texto, monto] of [["$85", 85], ["85 pesos", 85], ["85", 85], ["cobra 12.50 de agua", 12.5]]) {
    const r = interpretarConReglas(texto, cfg);
    assert.equal(r.propuesta?.monto, monto, texto);
    assert.doesNotMatch(r.respuesta, /tope/, texto);
  }
});

test("reglas: cantidades en palabras y en número con el catálogo", () => {
  const cfg = leerConfig();
  assert.equal(interpretarConReglas("cóbrale dos dulces de tamarindo y un mango", cfg).propuesta.monto, 17);
  assert.equal(interpretarConReglas("cóbrale 3 tamarindos", cfg).propuesta.monto, 3);
  const r = interpretarConReglas("tres chicles y un tamarindo y otro tamarindo", cfg);
  assert.equal(r.propuesta.monto, 8);
  assert.equal(r.propuesta.detalle.find((d) => d.producto_id === "dulce-tamarindo").cantidad, 2);
});

test("reglas: texto sin monto ni producto → propuesta null y pide el monto", () => {
  const r = interpretarConReglas("hola, ¿cómo estás?", leerConfig());
  assert.equal(r.propuesta, null);
  assert.match(r.respuesta, /monto/);
});

// ---------- OpenAI (function calling simulado) ----------
test("openai: el servidor pone los precios del catálogo y recalcula (ignora precio y monto del modelo)", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  process.env.OPENAI_MODEL = "modelo-de-prueba";
  simularOpenAI(() =>
    respuestaJson(
      conLlamada({
        concepto: "3 dulces",
        monto: 50,
        detalle: [{ producto_id: "dulce-tamarindo", nombre: "Dulce de tamarindo", cantidad: 3, precioUnitario: 99 }],
      }),
    ),
  );
  const r = await interpretarVenta("cóbrale tres dulces de tamarindo", leerConfig());
  assert.equal(r.origen, "openai");
  assert.equal(r.propuesta.monto, 3);
  assert.equal(r.propuesta.detalle[0].precioUnitario, 1);
  assert.equal(r.propuesta.detalle[0].subtotal, 3);
  assert.match(r.respuesta, /\$3\.00/);
  assert.match(r.respuesta, /precios del catálogo/);

  // Lo que viaja a OpenAI: modelo de OPENAI_MODEL, herramienta estricta y solo el texto + instrucciones.
  assert.equal(llamadas.length, 1);
  const { url, headers, cuerpo } = llamadas[0];
  assert.equal(url, "https://api.openai.com/v1/responses");
  assert.equal(headers.Authorization, "Bearer sk-prueba");
  assert.equal(cuerpo.model, "modelo-de-prueba");
  assert.equal(cuerpo.tools.length, 1);
  assert.equal(cuerpo.tools[0].name, "crear_cobro");
  assert.equal(cuerpo.tools[0].strict, true);
  assert.deepEqual(cuerpo.tools[0], HERRAMIENTA_CREAR_COBRO);
  assert.deepEqual(cuerpo.input, [{ role: "user", content: "cóbrale tres dulces de tamarindo" }]);
  assert.match(cuerpo.instructions, /dulce-tamarindo/);
  assert.deepEqual(Object.keys(cuerpo).sort(), ["input", "instructions", "model", "reasoning", "store", "tools"]);
});

test("openai: producto fuera de catálogo con total dicho → respeta el total, detalle vacío", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  process.env.MAX_MONTO_MXN = "100";
  simularOpenAI(() =>
    respuestaJson(
      conLlamada({ concepto: "2 tacos", monto: 85, detalle: [{ producto_id: null, nombre: "Tacos", cantidad: 2, precioUnitario: null }] }),
    ),
  );
  const r = await interpretarVenta("cóbrale 85 de dos tacos", leerConfig());
  assert.equal(r.origen, "openai");
  assert.equal(r.propuesta.monto, 85);
  assert.equal(r.propuesta.concepto, "2 tacos");
  assert.deepEqual(r.propuesta.detalle, []);
});

test("openai: tope maxMontoMxn → propuesta con aviso (la interfaz no deja confirmar)", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  simularOpenAI(() =>
    respuestaJson(conLlamada({ concepto: "Pastel", monto: 350, detalle: [] })),
  );
  const r = await interpretarVenta("cóbrale 350 del pastel", leerConfig());
  assert.equal(r.propuesta.monto, 350);
  assert.match(r.respuesta, /tope de \$20\.00/);
});

test("openai: sin precio ni total → propuesta null y pregunta", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  simularOpenAI(() =>
    respuestaJson(conLlamada({ concepto: "Tacos", monto: null, detalle: [{ producto_id: null, nombre: "Tacos", cantidad: 2, precioUnitario: null }] })),
  );
  const r = await interpretarVenta("cóbrale dos tacos", leerConfig());
  assert.equal(r.propuesta, null);
  assert.match(r.respuesta, /precio de Tacos/);
});

test("openai: respuesta solo de texto → propuesta null con el texto del modelo", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  simularOpenAI(() =>
    respuestaJson({
      status: "completed",
      output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: "¿Cuánto cuestan los tacos?" }] }],
    }),
  );
  const r = await interpretarVenta("cóbrale los tacos", leerConfig());
  assert.deepEqual(r, { respuesta: "¿Cuánto cuestan los tacos?", propuesta: null, origen: "openai" });
});

test("openai falla (500, 429 sin saldo, red) → reglas locales", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  for (const responder of [
    () => respuestaJson({ error: { type: "server_error" } }, 500),
    () => respuestaJson({ error: { code: "insufficient_quota" } }, 429),
    () => {
      throw new TypeError("fetch failed");
    },
  ]) {
    simularOpenAI(responder);
    const r = await interpretarVenta("Cóbrale un dulce de tamarindo", leerConfig());
    assert.equal(r.origen, "reglas");
    assert.equal(r.propuesta.monto, 1);
  }
});

test("llamarResponses: 429 sin saldo → IA_SIN_SALDO 503; 401 → IA_NO_DISPONIBLE 503; timeout → 503", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  const cfg = leerConfig();
  simularOpenAI(() => respuestaJson({ error: { code: "insufficient_quota", type: "insufficient_quota" } }, 429));
  await assert.rejects(llamarResponses({ input: "x" }, cfg), { codigo: "IA_SIN_SALDO", status: 503 });
  simularOpenAI(() => respuestaJson({ error: { code: "invalid_api_key" } }, 401));
  await assert.rejects(llamarResponses({ input: "x" }, cfg), { codigo: "IA_NO_DISPONIBLE", status: 503 });
  simularOpenAI(
    ({ signal }) =>
      new Promise((_, rechazar) => signal.addEventListener("abort", () => rechazar(new DOMException("abortado", "AbortError")))),
  );
  await assert.rejects(llamarResponses({ input: "x" }, cfg, { timeoutMs: 30 }), (e) => {
    assert.equal(e.codigo, "IA_NO_DISPONIBLE");
    assert.equal(e.status, 503);
    assert.match(e.message, /tardó/);
    return true;
  });
});

// ---------- handler ----------
test("POST /api/agente sin llave → 200 con reglas; texto vacío o largo → 400", async () => {
  const ok = await agente(pedir({ texto: "Cóbrale un dulce de tamarindo" }));
  assert.equal(ok.status, 200);
  const datos = await ok.json();
  assert.equal(datos.origen, "reglas");
  assert.equal(datos.propuesta.monto, 1);
  assert.equal(typeof datos.respuesta, "string");

  for (const texto of ["", "   ", "x".repeat(301), 85]) {
    const r = await agente(pedir({ texto }));
    assert.equal(r.status, 400);
    assert.equal((await r.json()).error.codigo, "TEXTO_INVALIDO");
  }
});
