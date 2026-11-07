// Prueba de integración: la demo de 3 pasos de docs/PRD.md, de punta a punta, en SIMULACIÓN y sin llaves.
// Llama directo a los handlers de app/api (sin servidor). Si algo intenta salir a internet, la prueba falla.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";

import { GET as salud } from "../api/salud.js";
import { POST as agente } from "../api/agente.js";
import { POST as cobros } from "../api/cobros.js";
import { GET as estado } from "../api/estado.js";
import { POST as simularPago } from "../api/simular-pago.js";
import { POST as revisar } from "../api/revisar.js";

const VARIABLES = ["OPENAI_API_KEY", "PEY_API_KEY", "PEY_WEBHOOK_SECRET", "MODO_PAGO", "MAX_MONTO_MXN", "APP_SECRET"];
const respaldo = {};
const fetchOriginal = globalThis.fetch;

// JPEG mínimo (1×1) como data URL: en SIMULACIÓN la lectura es de ejemplo y no se manda a ningún lado.
const JPEG_1X1 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==";

function pedir(ruta, metodo = "GET", cuerpo) {
  return new Request(`http://localhost${ruta}`, {
    method: metodo,
    headers: cuerpo ? { "content-type": "application/json" } : {},
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
}

async function leer(respuesta) {
  const texto = await respuesta.text();
  assert.doesNotMatch(texto, /falso/i, "la app nunca dice 'falso'");
  return { status: respuesta.status, datos: JSON.parse(texto) };
}

before(() => {
  for (const v of VARIABLES) {
    respaldo[v] = process.env[v];
    delete process.env[v];
  }
  globalThis.fetch = async (url) => {
    throw new Error(`La simulación no debe llamar a internet: ${url}`);
  };
});

after(() => {
  globalThis.fetch = fetchOriginal;
  for (const v of VARIABLES) {
    if (respaldo[v] === undefined) delete process.env[v];
    else process.env[v] = respaldo[v];
  }
});

test("demo de 3 pasos en SIMULACIÓN: tamarindo → captura → ¡ya cayó!", async () => {
  // 0 · La app dice en qué modo está.
  const s = await leer(await salud(pedir("/api/salud")));
  assert.equal(s.status, 200);
  assert.equal(s.datos.modoPago, "simulacion");
  assert.equal(s.datos.openai, false);
  assert.equal(s.datos.pey, false);

  // 1 · "Cóbrale un dulce de tamarindo" → propuesta de $1 (reglas locales, sin llave de OpenAI).
  const a = await leer(await agente(pedir("/api/agente", "POST", { texto: "Cóbrale un dulce de tamarindo" })));
  assert.equal(a.status, 200);
  assert.equal(a.datos.origen, "reglas");
  assert.ok(a.datos.propuesta, "hay propuesta");
  assert.equal(a.datos.propuesta.monto, 1);
  assert.ok(a.datos.propuesta.concepto.length >= 1 && a.datos.propuesta.concepto.length <= 40);

  // Sin confirmación no hay cobro.
  const sinConfirmar = await leer(
    await cobros(pedir("/api/cobros", "POST", { concepto: a.datos.propuesta.concepto, monto: 1 })),
  );
  assert.equal(sinConfirmar.status, 400);
  assert.equal(sinConfirmar.datos.error.codigo, "CONFIRMACION_REQUERIDA");

  // Confirmado → QR (SIMULACIÓN).
  const c = await leer(
    await cobros(
      pedir("/api/cobros", "POST", { concepto: a.datos.propuesta.concepto, monto: a.datos.propuesta.monto, confirmado: true }),
    ),
  );
  assert.equal(c.status, 201);
  const cobro = c.datos.cobro;
  assert.equal(cobro.modoPago, "simulacion");
  assert.equal(cobro.monto, 1);
  assert.match(cobro.id, /^sim_/);
  assert.match(cobro.qrImage, /^data:image\/png;base64,/);
  assert.ok(cobro.ticket);

  const e1 = await leer(await estado(pedir(`/api/estado?ticket=${encodeURIComponent(cobro.ticket)}`)));
  assert.equal(e1.status, 200);
  assert.equal(e1.datos.estado, "pendiente");

  // 2 · El cliente enseña su captura: la IA la lee (ejemplo etiquetado) y el código decide → todavía no cae.
  const r1 = await leer(
    await revisar(pedir("/api/revisar", "POST", { imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: cobro.ticket, montoManual: null })),
  );
  assert.equal(r1.status, 200);
  assert.equal(r1.datos.origen, "simulacion");
  assert.equal(r1.datos.veredicto.codigo, "todavia_no_cae");
  assert.ok(r1.datos.veredicto.titulo && r1.datos.veredicto.mensaje);

  // 3 · Pago (simulado) → ¡ya cayó!
  const p = await leer(await simularPago(pedir("/api/simular-pago", "POST", { ticket: cobro.ticket })));
  assert.equal(p.status, 200);
  assert.equal(p.datos.estado, "pagado");
  assert.ok(p.datos.ticket && p.datos.ticket !== cobro.ticket);

  const e2 = await leer(await estado(pedir(`/api/estado?ticket=${encodeURIComponent(p.datos.ticket)}`)));
  assert.equal(e2.datos.estado, "pagado");
  assert.ok(e2.datos.pagadoEn);

  const r2 = await leer(
    await revisar(pedir("/api/revisar", "POST", { imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: p.datos.ticket, montoManual: null })),
  );
  assert.equal(r2.datos.veredicto.codigo, "ya_cayo");
});

test("un ticket alterado no engaña al servidor", async () => {
  const c = await leer(
    await cobros(pedir("/api/cobros", "POST", { concepto: "Paleta", monto: 1, confirmado: true })),
  );
  const [carga, firma] = c.datos.cobro.ticket.split(".");
  const datos = JSON.parse(Buffer.from(carga, "base64url").toString("utf8"));
  datos.simPagadoEn = new Date().toISOString();
  const falsificado = `${Buffer.from(JSON.stringify(datos)).toString("base64url")}.${firma}`;
  const e = await estado(pedir(`/api/estado?ticket=${encodeURIComponent(falsificado)}`));
  assert.equal(e.status, 400);
  const cuerpo = await e.json();
  assert.equal(cuerpo.error.codigo, "TICKET_INVALIDO");
});
