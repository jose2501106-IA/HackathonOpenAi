// Pruebas de "Revisar una captura": veredicto decidido por código (K07.3) y POST /api/revisar.
// Ninguna prueba llama servicios reales: globalThis.fetch se reemplaza y se restaura.
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import { POST as revisar } from "../api/revisar.js";
import { decidirVeredicto, revisarCaptura, horaCdmx, TITULOS } from "../lib/coincidencias.js";
import { extraerCaptura, FORMATO_CAPTURA, INSTRUCCION_CAPTURA } from "../lib/extractor.js";
import { firmarTicket } from "../lib/ticket.js";
import { leerConfig } from "../lib/config.js";

const VARIABLES = ["OPENAI_API_KEY", "OPENAI_MODEL", "PEY_API_KEY", "PEY_WEBHOOK_SECRET", "MODO_PAGO", "MAX_MONTO_MXN", "APP_SECRET"];
const fetchOriginal = globalThis.fetch;
let respaldo = {};
let llamadas = [];

const JPEG_1X1 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==";

beforeEach(() => {
  respaldo = {};
  for (const v of VARIABLES) {
    respaldo[v] = process.env[v];
    delete process.env[v];
  }
  process.env.APP_SECRET = "secreto-de-prueba";
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

const AHORA = Date.parse("2026-11-07T20:10:00Z"); // 14:10 en CDMX
const lectura = (extra = {}) => ({
  es_comprobante: true,
  monto: 1,
  fecha: "2026-11-07",
  hora: "13:58",
  clave_rastreo: "EJEMPLO123",
  legible: true,
  ...extra,
});
const COBRO = { id: "IDC123", montoCentavos: 100, concepto: "Dulce de tamarindo", modoPago: "prueba" };
const estado = (e, extra = {}) => ({ id: "IDC123", estado: e, monto: 1, pagadoEn: null, transactionId: null, aviso: null, modoPago: "prueba", ...extra });
const pagoPey = (monto, iso, claveRastreo = null) => ({ id: `tx_${iso}`, monto, fechaPago: iso, claveRastreo });

function sinPalabrasProhibidas(r) {
  const texto = JSON.stringify(r);
  assert.doesNotMatch(texto, /fals[oa]|fraude|mentir|enga/i, "nunca se acusa");
}

// ---------- decidirVeredicto: con cobro ----------
test("cobro pendiente + captura con el mismo monto → todavia_no_cae", () => {
  const r = decidirVeredicto({ leido: lectura(), cobro: COBRO, estadoCobro: estado("pendiente"), ahora: AHORA });
  assert.equal(r.veredicto.codigo, "todavia_no_cae");
  assert.equal(r.veredicto.titulo, "Todavía no cae");
  assert.equal(r.veredicto.mensaje, "pey no tiene ningún pago para este cobro: no entregues.");
  assert.equal(r.veredicto.detalle, "La captura dice $1.00 a las 13:58.");
  assert.equal(r.pago, null);
  sinPalabrasProhibidas(r);
});

test("cobro pagado en pey → ya_cayo con el pago", () => {
  const r = decidirVeredicto({
    leido: lectura(),
    cobro: COBRO,
    estadoCobro: estado("pagado", { pagadoEn: "2026-11-07T20:05:00.000Z", transactionId: "01TX" }),
    ahora: AHORA,
  });
  assert.equal(r.veredicto.codigo, "ya_cayo");
  assert.equal(r.veredicto.titulo, "¡Ya cayó!");
  assert.deepEqual(r.pago, { id: "01TX", monto: 1, pagadoEn: "2026-11-07T20:05:00.000Z", claveRastreo: null });
});

test("monto leído distinto al del cobro → el detalle lo dice (y manda pey)", () => {
  const r = decidirVeredicto({ leido: lectura({ monto: 350 }), cobro: COBRO, estadoCobro: estado("pendiente"), ahora: AHORA });
  assert.equal(r.veredicto.codigo, "todavia_no_cae");
  assert.equal(r.veredicto.detalle, "La captura dice $350.00; tu cobro es de $1.00.");
  const pagado = decidirVeredicto({ leido: lectura({ monto: 350 }), cobro: COBRO, estadoCobro: estado("pagado"), ahora: AHORA });
  assert.equal(pagado.veredicto.codigo, "ya_cayo");
});

test("con cobro: captura ilegible no cambia el veredicto; expirado y monto distinto en pey avisan", () => {
  const ilegible = decidirVeredicto({ leido: lectura({ legible: false, monto: null }), cobro: COBRO, estadoCobro: estado("pendiente") });
  assert.equal(ilegible.veredicto.codigo, "todavia_no_cae");
  assert.match(ilegible.veredicto.detalle, /No pude leer/);
  const expirado = decidirVeredicto({ leido: lectura(), cobro: COBRO, estadoCobro: estado("expirado") });
  assert.equal(expirado.veredicto.codigo, "todavia_no_cae");
  assert.match(expirado.veredicto.mensaje, /venció/);
  const otro = decidirVeredicto({ leido: lectura(), cobro: COBRO, estadoCobro: estado("pendiente", { aviso: "pago_con_monto_distinto" }) });
  assert.match(otro.veredicto.mensaje, /otro monto/);
});

test("con cobro: pey no responde → no_verificable (no se entrega)", () => {
  for (const e of [estado("no_verificable", { aviso: "pey_no_responde" }), null]) {
    const r = decidirVeredicto({ leido: lectura(), cobro: COBRO, estadoCobro: e });
    assert.equal(r.veredicto.codigo, "no_verificable");
    assert.match(r.veredicto.mensaje, /No entregues/);
  }
});

// ---------- decidirVeredicto: sin cobro ----------
test("sin cobro: mismo monto y hora ±15 min (CDMX = UTC−6) → coincide", () => {
  const pagos = [pagoPey(1, "2026-11-07T20:05:00.000Z"), pagoPey(15, "2026-11-07T20:00:00.000Z")]; // 14:05 y 14:00 CDMX
  const r = decidirVeredicto({ leido: lectura({ hora: "14:00", clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(r.veredicto.codigo, "coincide");
  assert.equal(r.veredicto.mensaje, "Coincide con el pago de $1.00 de las 14:05 que registró pey.");
  assert.equal(r.pago.id, "tx_2026-11-07T20:05:00.000Z");
  sinPalabrasProhibidas(r);
});

test("zona horaria: la hora de la captura se interpreta en CDMX, no en UTC", () => {
  assert.equal(horaCdmx("2026-11-07T20:05:00.000Z"), "14:05");
  const pagos = [pagoPey(1, "2026-11-07T20:05:00.000Z")];
  // "20:05" sería la hora en UTC: en CDMX son 6 h de diferencia → no coincide.
  const r = decidirVeredicto({ leido: lectura({ hora: "20:05", fecha: "2026-11-07", clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(r.veredicto.codigo, "dudoso");
  // Sin fecha leída se usa la de hoy en CDMX.
  const sinFecha = decidirVeredicto({ leido: lectura({ hora: "14:01", fecha: null, clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(sinFecha.veredicto.codigo, "coincide");
});

test("sin cobro: mismo monto a otra hora → dudoso («Revísalo»)", () => {
  const pagos = [pagoPey(1, "2026-11-07T19:00:00.000Z")]; // 13:00 CDMX
  const r = decidirVeredicto({ leido: lectura({ hora: "14:00", clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(r.veredicto.codigo, "dudoso");
  assert.equal(r.veredicto.titulo, "Revísalo");
  assert.match(r.veredicto.mensaje, /13:00/);
  assert.match(r.veredicto.mensaje, /14:00/);
  // Sin hora leída tampoco se puede afirmar que coincide.
  const sinHora = decidirVeredicto({ leido: lectura({ hora: null, clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(sinHora.veredicto.codigo, "dudoso");
});

test("sin cobro: la clave de rastreo igual a la de pey → coincide aunque la hora no cuadre", () => {
  const pagos = [pagoPey(1, "2026-11-07T19:00:00.000Z", "ejemplo123")];
  const r = decidirVeredicto({ leido: lectura({ hora: "14:00" }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(r.veredicto.codigo, "coincide");
  assert.match(r.veredicto.detalle, /clave de rastreo también coincide/);
});

test("sin cobro: nada en pey → no_encontrado con la clave para el CEP", () => {
  const pagos = [pagoPey(15, "2026-11-07T20:00:00.000Z"), pagoPey(1, "2026-11-07T16:00:00.000Z")]; // otro monto; y uno de hace 4 h
  const r = decidirVeredicto({ leido: lectura(), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(r.veredicto.codigo, "no_encontrado");
  assert.match(r.veredicto.mensaje, /CEP/);
  assert.match(r.veredicto.mensaje, /EJEMPLO123/);
  sinPalabrasProhibidas(r);
});

test("centavos: ±$0.01 es el mismo monto; ±$0.02 no", () => {
  const pagos = [pagoPey(16, "2026-11-07T20:05:00.000Z")];
  const si = decidirVeredicto({ leido: lectura({ monto: 15.99, hora: "14:05", clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(si.veredicto.codigo, "coincide");
  const no = decidirVeredicto({ leido: lectura({ monto: 15.98, hora: "14:05", clave_rastreo: null }), pagosRecientes: pagos, ahora: AHORA });
  assert.equal(no.veredicto.codigo, "no_encontrado");
});

test("sin cobro: ilegible o no es comprobante → ilegible; pagos no consultables → no_verificable", () => {
  const r = decidirVeredicto({ leido: lectura({ legible: false, monto: null }), pagosRecientes: [], ahora: AHORA });
  assert.equal(r.veredicto.codigo, "ilegible");
  assert.equal(r.veredicto.titulo, "No pude leer la captura");
  assert.match(r.veredicto.mensaje, /Escribe el monto/);
  const gato = decidirVeredicto({ leido: lectura({ es_comprobante: false }), pagosRecientes: [], ahora: AHORA });
  assert.equal(gato.veredicto.codigo, "ilegible");
  const sinPey = decidirVeredicto({ leido: lectura(), pagosRecientes: null, ahora: AHORA });
  assert.equal(sinPey.veredicto.codigo, "no_verificable");
  for (const titulo of Object.values(TITULOS)) assert.doesNotMatch(titulo, /fals/i);
});

// ---------- orquestador ----------
test("revisarCaptura con ticket usa resolverEstado; sin ticket usa listarPagosRecientes (segundos Unix)", async () => {
  process.env.PEY_API_KEY = "pey-prueba";
  process.env.MODO_PAGO = "prueba";
  const cfg = leerConfig();
  let pedidoDesde;
  const deps = {
    resolverEstado: async () => estado("pagado", { transactionId: "01TX" }),
    listarPagosRecientes: async ({ desdeEpoch }) => {
      pedidoDesde = desdeEpoch;
      return [pagoPey(1, "2026-11-07T20:00:00.000Z")];
    },
  };
  const conTicket = await revisarCaptura({ leido: lectura(), ticketDatos: COBRO }, cfg, { ahora: AHORA, deps });
  assert.equal(conTicket.veredicto.codigo, "ya_cayo");
  const sinTicket = await revisarCaptura({ leido: lectura({ hora: "14:01", clave_rastreo: null }) }, cfg, { ahora: AHORA, deps });
  assert.equal(sinTicket.veredicto.codigo, "coincide");
  assert.equal(pedidoDesde, Math.floor((AHORA - 2 * 3600_000) / 1000));

  // Si pey falla o no hay función → no_verificable, sin romper.
  const falla = await revisarCaptura({ leido: lectura() }, cfg, {
    ahora: AHORA,
    deps: { listarPagosRecientes: async () => { throw new Error("red"); } },
  });
  assert.equal(falla.veredicto.codigo, "no_verificable");
  const sinModulo = await revisarCaptura({ leido: lectura(), ticketDatos: COBRO }, cfg, { ahora: AHORA, deps: { resolverEstado: undefined } });
  assert.equal(sinModulo.veredicto.codigo, "no_verificable");
});

test("revisarCaptura en SIMULACIÓN: no llama a pey y etiqueta los pagos de ejemplo", async () => {
  const cfg = leerConfig(); // sin PEY_API_KEY → simulacion
  const r = await revisarCaptura({ leido: lectura({ hora: null }) }, cfg, { ahora: AHORA });
  assert.match(r.veredicto.detalle, /SIMULACIÓN/);
  assert.equal(r.pago?.simulacion, true);
});

// ---------- extractor (OpenAI simulado) ----------
function simularOpenAI(responder) {
  globalThis.fetch = async (url, opciones = {}) => {
    llamadas.push({ url: String(url), cuerpo: JSON.parse(opciones.body) });
    return responder();
  };
}
const respuestaJson = (datos, status = 200) =>
  new Response(JSON.stringify(datos), { status, headers: { "content-type": "application/json" } });
const salidaTexto = (texto) => ({
  status: "completed",
  output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: texto }] }],
});

test("extraerCaptura manda input_text + input_image y el esquema estricto de K07.3", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  simularOpenAI(() =>
    respuestaJson(salidaTexto(JSON.stringify({ es_comprobante: true, monto: 1, fecha: "2026-11-07", hora: "1:58 pm", clave_rastreo: " EJEMPLO123 ", legible: true }))),
  );
  const leido = await extraerCaptura({ imagenBase64: JPEG_1X1, mime: "image/jpeg" }, leerConfig());
  assert.deepEqual(leido, { es_comprobante: true, monto: 1, fecha: "2026-11-07", hora: "13:58", clave_rastreo: "EJEMPLO123", legible: true });
  const { url, cuerpo } = llamadas[0];
  assert.equal(url, "https://api.openai.com/v1/responses");
  assert.equal(cuerpo.model, "gpt-6.1-sol");
  assert.equal(cuerpo.instructions, INSTRUCCION_CAPTURA);
  assert.deepEqual(cuerpo.text.format, FORMATO_CAPTURA);
  assert.equal(cuerpo.text.format.strict, true);
  const contenido = cuerpo.input[0].content;
  assert.equal(contenido[0].type, "input_text");
  assert.equal(contenido[1].type, "input_image");
  assert.equal(contenido[1].image_url, JPEG_1X1);
});

test("extraerCaptura: negativa o respuesta incompleta → legible: false", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  const cfg = leerConfig();
  simularOpenAI(() =>
    respuestaJson({ status: "completed", output: [{ type: "message", content: [{ type: "refusal", refusal: "No puedo ayudar con eso." }] }] }),
  );
  assert.equal((await extraerCaptura({ imagenBase64: JPEG_1X1, mime: "image/jpeg" }, cfg)).legible, false);
  simularOpenAI(() => respuestaJson({ status: "incomplete", incomplete_details: { reason: "max_output_tokens" }, output: [] }));
  const incompleta = await extraerCaptura({ imagenBase64: JPEG_1X1, mime: "image/jpeg" }, cfg);
  assert.deepEqual(incompleta, { es_comprobante: false, monto: null, fecha: null, hora: null, clave_rastreo: null, legible: false });
});

// ---------- handler POST /api/revisar ----------
const pedir = (cuerpo) =>
  new Request("http://localhost/api/revisar", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cuerpo),
  });

function ticketSim(extra = {}) {
  const ahora = Date.now();
  return firmarTicket(
    {
      id: "sim_prueba",
      montoCentavos: 100,
      concepto: "Dulce de tamarindo",
      creadoEn: new Date(ahora).toISOString(),
      expiraEn: new Date(ahora + 600_000).toISOString(),
      modoPago: "simulacion",
      ...extra,
    },
    "secreto-de-prueba",
  );
}

test("POST /api/revisar sin llave en SIMULACIÓN → lectura de ejemplo etiquetada y todavia_no_cae; con pago → ya_cayo", async () => {
  const r = await revisar(pedir({ imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: ticketSim(), montoManual: null }));
  assert.equal(r.status, 200);
  const datos = await r.json();
  assert.equal(datos.origen, "simulacion");
  assert.equal(datos.leido.clave_rastreo, "EJEMPLO123");
  assert.equal(datos.veredicto.codigo, "todavia_no_cae");
  assert.equal(datos.pago, null);
  sinPalabrasProhibidas(datos);

  const pagado = await revisar(
    pedir({ imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: ticketSim({ simPagadoEn: new Date().toISOString() }), montoManual: null }),
  );
  assert.equal((await pagado.json()).veredicto.codigo, "ya_cayo");
});

test("POST /api/revisar sin llave de OpenAI en modo prueba → 503 IA_NO_DISPONIBLE «Escribe el monto a mano»", async () => {
  process.env.PEY_API_KEY = "pey-prueba";
  process.env.MODO_PAGO = "prueba";
  const r = await revisar(pedir({ imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: null, montoManual: null }));
  assert.equal(r.status, 503);
  const { error } = await r.json();
  assert.equal(error.codigo, "IA_NO_DISPONIBLE");
  assert.match(error.mensaje, /Escribe el monto a mano/);
});

test("POST /api/revisar con montoManual → origen manual, sin IA", async () => {
  const r = await revisar(pedir({ imagenBase64: null, mime: null, ticket: ticketSim(), montoManual: 1 }));
  assert.equal(r.status, 200);
  const datos = await r.json();
  assert.equal(datos.origen, "manual");
  assert.equal(datos.leido.monto, 1);
  assert.equal(datos.veredicto.codigo, "todavia_no_cae");
  const malo = await revisar(pedir({ ticket: null, montoManual: -5 }));
  assert.equal(malo.status, 400);
  assert.equal((await malo.json()).error.codigo, "MONTO_INVALIDO");
});

test("POST /api/revisar con OpenAI simulado → origen openai y veredicto por código", async () => {
  process.env.OPENAI_API_KEY = "sk-prueba";
  simularOpenAI(() =>
    respuestaJson(salidaTexto(JSON.stringify({ es_comprobante: true, monto: 1, fecha: "2026-11-07", hora: "13:58", clave_rastreo: "EJEMPLO123", legible: true }))),
  );
  const r = await revisar(pedir({ imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: ticketSim(), montoManual: null }));
  assert.equal(r.status, 200);
  const datos = await r.json();
  assert.equal(datos.origen, "openai");
  assert.equal(datos.veredicto.codigo, "todavia_no_cae");
  assert.equal(llamadas.length, 1);

  // OpenAI sin saldo → 503 para que la interfaz pida el monto a mano.
  simularOpenAI(() => respuestaJson({ error: { code: "insufficient_quota" } }, 429));
  const sinSaldo = await revisar(pedir({ imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: null, montoManual: null }));
  assert.equal(sinSaldo.status, 503);
  assert.equal((await sinSaldo.json()).error.codigo, "IA_SIN_SALDO");
});

test("POST /api/revisar: imagen de más de 1.5 MB → 413 IMAGEN_GRANDE; tipo raro → 400", async () => {
  const grande = await revisar(pedir({ imagenBase64: "A".repeat(2_100_000), mime: "image/jpeg", ticket: null, montoManual: null }));
  assert.equal(grande.status, 413);
  assert.equal((await grande.json()).error.codigo, "IMAGEN_GRANDE");
  const enorme = await revisar(pedir({ imagenBase64: "A".repeat(3_000_000), mime: "image/jpeg", ticket: null, montoManual: null }));
  assert.equal(enorme.status, 413);
  assert.equal((await enorme.json()).error.codigo, "IMAGEN_GRANDE");
  const pdf = await revisar(pedir({ imagenBase64: "data:application/pdf;base64,JVBERi0=", mime: null, ticket: null, montoManual: null }));
  assert.equal(pdf.status, 400);
  assert.equal((await pdf.json()).error.codigo, "IMAGEN_INVALIDA");
  const sinImagen = await revisar(pedir({ ticket: null, montoManual: null }));
  assert.equal(sinImagen.status, 400);
});

test("POST /api/revisar con ticket alterado → 400 TICKET_INVALIDO", async () => {
  const [carga, firma] = ticketSim().split(".");
  const datos = JSON.parse(Buffer.from(carga, "base64url").toString("utf8"));
  datos.simPagadoEn = new Date().toISOString();
  const alterado = `${Buffer.from(JSON.stringify(datos)).toString("base64url")}.${firma}`;
  const r = await revisar(pedir({ imagenBase64: JPEG_1X1, mime: "image/jpeg", ticket: alterado, montoManual: null }));
  assert.equal(r.status, 400);
  assert.equal((await r.json()).error.codigo, "TICKET_INVALIDO");
});
