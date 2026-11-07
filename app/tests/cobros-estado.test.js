// Pruebas de POST /api/cobros, GET /api/estado, POST /api/simular-pago y resolverEstado.
// fetch simulado: ninguna prueba llama servicios reales.
import { test } from "node:test";
import assert from "node:assert/strict";
import { leerConfig } from "../lib/config.js";
import { firmarTicket, leerTicket } from "../lib/ticket.js";
import { resolverEstado } from "../lib/estado.js";
import * as cobros from "../api/cobros.js";
import * as estado from "../api/estado.js";
import * as simular from "../api/simular-pago.js";

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

const SIMULACION = {}; // sin llaves → modoPago "simulacion"
const PRUEBA = { PEY_API_KEY: "llave_de_prueba", MODO_PAGO: "prueba", MAX_MONTO_MXN: "20" };

const crearCobro = (body) =>
  cobros.POST(new Request("http://x/api/cobros", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));
const consultarEstado = (ticket) => estado.GET(new Request(`http://x/api/estado?ticket=${encodeURIComponent(ticket)}`));
const simularPago = (ticket) =>
  simular.POST(new Request("http://x/api/simular-pago", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ticket }) }));

// Ticket de un cobro real (prueba) firmado con el secreto vigente.
function ticketPrueba({ montoCentavos = 100, expiraEn = new Date(Date.now() + 600_000).toISOString() } = {}) {
  const cfg = leerConfig();
  const datos = { id: "IDC123", montoCentavos, concepto: "Dulce de tamarindo", creadoEn: new Date().toISOString(), expiraEn, modoPago: "prueba" };
  return { cfg, datos, ticket: firmarTicket(datos, cfg.secretoTickets) };
}

const ITEM_PAID = (amount, extra = {}) => ({ id: "01TRANSACCION", status: "PAID", amount, currency: "MXN", datePaid: 1794000060, ...extra });

// ---------- POST /api/cobros ----------

test("cobros en SIMULACIÓN: 201, id sim_, qrString SIMULACION, imagen generada y cero llamadas a pey", async (t) => {
  conEntorno(t, SIMULACION);
  const llamadas = simularFetch(t, []);
  const res = await crearCobro({ concepto: "Dulce de tamarindo", monto: 1, confirmado: true });
  assert.equal(res.status, 201);
  const { cobro } = await res.json();
  assert.equal(cobro.modoPago, "simulacion");
  assert.match(cobro.id, /^sim_[0-9a-f]+$/);
  assert.equal(cobro.qrString, `SIMULACION|${cobro.id}|1.00`);
  assert.match(cobro.qrImage, /^data:image\/png;base64,/);
  assert.equal(cobro.monto, 1);
  assert.equal(cobro.concepto, "Dulce de tamarindo");
  assert.match(cobro.numRef, /^[0-9]{1,7}$/);
  assert.equal(Date.parse(cobro.expiraEn) - Date.parse(cobro.creadoEn), 600_000);
  const datos = leerTicket(cobro.ticket, leerConfig().secretoTickets);
  assert.deepEqual(Object.keys(datos).sort(), ["concepto", "creadoEn", "expiraEn", "id", "modoPago", "montoCentavos"]);
  assert.equal(datos.montoCentavos, 100);
  assert.equal(llamadas.length, 0);
});

test("cobros en prueba: cuerpo a pey en pesos con generateImage, expiration 600 y numRef de 1–7 dígitos", async (t) => {
  conEntorno(t, PRUEBA);
  const llamadas = simularFetch(t, [{ status: 201, body: { id: "IDC123", qrString: "00020101CODI", qrImage: "iVBORw0KGgo=" } }]);
  const res = await crearCobro({ concepto: "  Dulce   de tamarindo ", monto: 0.5, confirmado: true });
  assert.equal(res.status, 201);
  const { cobro } = await res.json();
  assert.equal(llamadas.length, 1);
  const [l] = llamadas;
  assert.equal(l.url, "https://api.pey.mx/codi/qr");
  assert.equal(l.metodo, "POST");
  assert.equal(l.headers.Authorization, "Bearer llave_de_prueba");
  assert.equal(l.cuerpo.amount, 0.5);
  assert.equal(l.cuerpo.concept, "Dulce de tamarindo");
  assert.equal(l.cuerpo.expiration, 600);
  assert.equal(l.cuerpo.generateImage, true);
  assert.match(l.cuerpo.numRef, /^[0-9]{1,7}$/);
  assert.equal(cobro.numRef, l.cuerpo.numRef);
  assert.equal(cobro.id, "IDC123");
  assert.equal(cobro.modoPago, "prueba");
  assert.equal(cobro.qrString, "00020101CODI");
  assert.equal(cobro.qrImage, "data:image/png;base64,iVBORw0KGgo=");
  assert.equal(leerTicket(cobro.ticket, leerConfig().secretoTickets).montoCentavos, 50);
});

test("cobros en prueba: si pey regresa qrImage null, la imagen se genera desde qrString", async (t) => {
  conEntorno(t, PRUEBA);
  simularFetch(t, [{ status: 201, body: { id: "IDC124", qrString: "00020101CODI", qrImage: null } }]);
  const res = await crearCobro({ concepto: "Chicle", monto: 1, confirmado: true });
  assert.equal(res.status, 201);
  const { cobro } = await res.json();
  assert.match(cobro.qrImage, /^data:image\/png;base64,[A-Za-z0-9+/]+=*$/);
});

test("cobros: sin confirmado === true → 400 CONFIRMACION_REQUERIDA y no se llama a pey", async (t) => {
  conEntorno(t, PRUEBA);
  const llamadas = simularFetch(t, []);
  for (const confirmado of [undefined, false, "true", 1]) {
    const res = await crearCobro({ concepto: "Chicle", monto: 1, confirmado });
    assert.equal(res.status, 400);
    assert.equal((await res.json()).error.codigo, "CONFIRMACION_REQUERIDA");
  }
  assert.equal(llamadas.length, 0);
});

test("cobros: monto fuera de rango o con más de 2 decimales → 400 MONTO_INVALIDO", async (t) => {
  conEntorno(t, PRUEBA);
  const llamadas = simularFetch(t, []);
  for (const monto of [0, -1, 0.001, 1.005, 20.01, 1000, "abc", "", null, undefined, Number.NaN, Infinity]) {
    const res = await crearCobro({ concepto: "Chicle", monto, confirmado: true });
    assert.equal(res.status, 400, `monto ${monto}`);
    const { error } = await res.json();
    assert.equal(error.codigo, "MONTO_INVALIDO");
    assert.equal(error.mensaje, "El monto debe ser de $0.01 a $20.00.");
  }
  assert.equal(llamadas.length, 0);
});

test("cobros: el tope sale de MAX_MONTO_MXN", async (t) => {
  conEntorno(t, { MAX_MONTO_MXN: "5" });
  const res = await crearCobro({ concepto: "Chicle", monto: 5.01, confirmado: true });
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error.codigo, "MONTO_INVALIDO");
  assert.equal((await crearCobro({ concepto: "Chicle", monto: 5, confirmado: true })).status, 201);
});

test("cobros: concepto vacío o de más de 40 caracteres → 400 CONCEPTO_INVALIDO", async (t) => {
  conEntorno(t, SIMULACION);
  for (const concepto of ["", "   ", undefined, "x".repeat(41)]) {
    const res = await crearCobro({ concepto, monto: 1, confirmado: true });
    assert.equal(res.status, 400);
    assert.equal((await res.json()).error.codigo, "CONCEPTO_INVALIDO");
  }
  assert.equal((await crearCobro({ concepto: "x".repeat(40), monto: 1, confirmado: true })).status, 201);
});

test("cobros: pey 401 → 502 PEY_NO_AUTORIZADO; 503 y red → 502 PEY_NO_RESPONDE (sin filtrar la llave)", async (t) => {
  conEntorno(t, PRUEBA);
  simularFetch(t, [
    { status: 401, body: { error: { message: "invalid key", type: "UNAUTHORIZED", requestId: "r1" } } },
    { status: 503, body: { error: { message: "down", type: "SERVICE_UNAVAILABLE", requestId: "r2" } } },
    new TypeError("fetch failed"),
  ]);
  const casos = ["PEY_NO_AUTORIZADO", "PEY_NO_RESPONDE", "PEY_NO_RESPONDE"];
  for (const codigo of casos) {
    const res = await crearCobro({ concepto: "Chicle", monto: 1, confirmado: true });
    assert.equal(res.status, 502);
    const texto = await res.text();
    assert.equal(JSON.parse(texto).error.codigo, codigo);
    assert.ok(!texto.includes("llave_de_prueba"));
  }
});

test("cobros: JSON inválido → 400 JSON_INVALIDO", async (t) => {
  conEntorno(t, SIMULACION);
  const res = await cobros.POST(new Request("http://x/api/cobros", { method: "POST", body: "{no es json" }));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error.codigo, "JSON_INVALIDO");
});

// ---------- GET /api/estado ----------

test("estado: PAID con el mismo monto → pagado, con pagadoEn ISO y transactionId", async (t) => {
  conEntorno(t, PRUEBA);
  const { ticket } = ticketPrueba();
  const llamadas = simularFetch(t, [{ status: 200, body: { items: [{ id: "01P", status: "PENDING", amount: 1 }, ITEM_PAID(1)], nextToken: null } }]);
  const res = await consultarEstado(ticket);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {
    id: "IDC123",
    estado: "pagado",
    monto: 1,
    pagadoEn: new Date(1794000060 * 1000).toISOString(),
    transactionId: "01TRANSACCION",
    aviso: null,
    modoPago: "prueba",
  });
  assert.equal(llamadas[0].url, "https://api.pey.mx/transaction/codi/qr/IDC123");
});

test("estado: ±1 centavo sigue siendo el mismo monto; 2 centavos ya no", async (t) => {
  conEntorno(t, PRUEBA);
  const { ticket } = ticketPrueba();
  simularFetch(t, [
    { status: 200, body: { items: [ITEM_PAID(1.01)], nextToken: null } },
    { status: 200, body: { items: [ITEM_PAID(1.02)], nextToken: null } },
  ]);
  assert.equal((await (await consultarEstado(ticket)).json()).estado, "pagado");
  const otro = await (await consultarEstado(ticket)).json();
  assert.equal(otro.estado, "pendiente");
  assert.equal(otro.aviso, "pago_con_monto_distinto");
});

test("estado: PAID con otro monto → pendiente + aviso pago_con_monto_distinto (aunque ya venció)", async (t) => {
  conEntorno(t, PRUEBA);
  const { ticket } = ticketPrueba({ expiraEn: new Date(Date.now() - 60_000).toISOString() });
  simularFetch(t, [{ status: 200, body: { items: [ITEM_PAID(350)], nextToken: null } }]);
  const datos = await (await consultarEstado(ticket)).json();
  assert.equal(datos.estado, "pendiente");
  assert.equal(datos.aviso, "pago_con_monto_distinto");
  assert.equal(datos.transactionId, null);
});

test("estado: lista vacía o solo PENDING → pendiente", async (t) => {
  conEntorno(t, PRUEBA);
  const { ticket } = ticketPrueba();
  simularFetch(t, [
    { status: 200, body: { items: [], nextToken: null } },
    { status: 200, body: { items: [{ id: "01P", status: "PENDING", amount: 1 }], nextToken: null } },
  ]);
  for (let i = 0; i < 2; i++) {
    const datos = await (await consultarEstado(ticket)).json();
    assert.equal(datos.estado, "pendiente");
    assert.equal(datos.aviso, null);
  }
});

test("estado: 404 de pey → no_verificable + aviso qr_no_encontrado_con_esta_llave", async (t) => {
  conEntorno(t, PRUEBA);
  const { ticket } = ticketPrueba();
  simularFetch(t, [{ status: 404, body: { error: { message: "not found", type: "NOT_FOUND", requestId: "r" } } }]);
  const res = await consultarEstado(ticket);
  assert.equal(res.status, 200);
  const datos = await res.json();
  assert.equal(datos.estado, "no_verificable");
  assert.equal(datos.aviso, "qr_no_encontrado_con_esta_llave");
});

test("estado: 5xx o red → no_verificable + aviso pey_no_responde", async (t) => {
  conEntorno(t, PRUEBA);
  const { ticket } = ticketPrueba();
  simularFetch(t, [{ status: 500, body: { error: { type: "INTERNAL_SERVER_ERROR" } } }, { status: 503, body: {} }, new TypeError("fetch failed")]);
  for (let i = 0; i < 3; i++) {
    const res = await consultarEstado(ticket);
    assert.equal(res.status, 200);
    const datos = await res.json();
    assert.equal(datos.estado, "no_verificable");
    assert.equal(datos.aviso, "pey_no_responde");
  }
});

test("estado: vencido sin PAID → expirado; un pago tardío con el mismo monto gana", async (t) => {
  conEntorno(t, PRUEBA);
  const expiraEn = new Date(Date.now() - 1_000).toISOString();
  const { ticket, datos, cfg } = ticketPrueba({ expiraEn });
  const llamadas = simularFetch(t, [
    { status: 200, body: { items: [], nextToken: null } },
    { status: 200, body: { items: [ITEM_PAID(1)], nextToken: null } },
    { status: 200, body: { items: [], nextToken: null } },
  ]);
  assert.equal((await (await consultarEstado(ticket)).json()).estado, "expirado");
  assert.equal((await (await consultarEstado(ticket)).json()).estado, "pagado");
  // resolverEstado con "ahora" explícito: un segundo antes de expiraEn sigue pendiente.
  assert.equal((await resolverEstado(datos, cfg, Date.parse(expiraEn) - 1_000)).estado, "pendiente");
  assert.equal(llamadas.length, 3, "siempre consulta a pey primero");
});

test("estado: ticket alterado o ausente → 400 TICKET_INVALIDO y no se llama a pey", async (t) => {
  conEntorno(t, PRUEBA);
  const llamadas = simularFetch(t, []);
  const { ticket, datos } = ticketPrueba();
  const [, firma] = ticket.split(".");
  const cuerpoFalso = Buffer.from(JSON.stringify({ ...datos, montoCentavos: 1 })).toString("base64url");
  for (const malo of [`${cuerpoFalso}.${firma}`, `${ticket}x`, "basura", firmarTicket(datos, "otro-secreto")]) {
    const res = await consultarEstado(malo);
    assert.equal(res.status, 400);
    assert.equal((await res.json()).error.codigo, "TICKET_INVALIDO");
  }
  const sin = await estado.GET(new Request("http://x/api/estado"));
  assert.equal(sin.status, 400);
  assert.equal(llamadas.length, 0);
});

// ---------- SIMULACIÓN: estado + simular-pago ----------

test("simulación de punta a punta: pendiente → simular-pago → pagado, sin llamar a pey", async (t) => {
  conEntorno(t, SIMULACION);
  const llamadas = simularFetch(t, []);
  const { cobro } = await (await crearCobro({ concepto: "Dulce de tamarindo", monto: 1, confirmado: true })).json();
  const antes = await (await consultarEstado(cobro.ticket)).json();
  assert.equal(antes.estado, "pendiente");
  assert.equal(antes.modoPago, "simulacion");
  const res = await simularPago(cobro.ticket);
  assert.equal(res.status, 200);
  const sim = await res.json();
  assert.equal(sim.estado, "pagado");
  assert.notEqual(sim.ticket, cobro.ticket);
  const despues = await (await consultarEstado(sim.ticket)).json();
  assert.equal(despues.estado, "pagado");
  assert.equal(despues.monto, 1);
  assert.ok(Number.isFinite(Date.parse(despues.pagadoEn)));
  assert.equal(llamadas.length, 0);
});

test("simular-pago fuera de simulación → 403 SOLO_SIMULACION", async (t) => {
  conEntorno(t, PRUEBA);
  simularFetch(t, []);
  const { ticket } = ticketPrueba();
  const res = await simularPago(ticket);
  assert.equal(res.status, 403);
  assert.equal((await res.json()).error.codigo, "SOLO_SIMULACION");
});

test("simular-pago: ticket de simulación con el servidor en modo prueba → 403 (mismo APP_SECRET)", async (t) => {
  conEntorno(t, { APP_SECRET: "secreto-fijo" }); // al final restaura todas las variables de VARS
  const { cobro } = await (await crearCobro({ concepto: "Chicle", monto: 1, confirmado: true })).json();
  Object.assign(process.env, PRUEBA); // el servidor ahora tiene llave de pey y está en modo prueba
  const res = await simularPago(cobro.ticket);
  assert.equal(res.status, 403);
  assert.equal((await res.json()).error.codigo, "SOLO_SIMULACION");
});

test("simular-pago: ticket alterado → 400 TICKET_INVALIDO", async (t) => {
  conEntorno(t, SIMULACION);
  const { cobro } = await (await crearCobro({ concepto: "Chicle", monto: 1, confirmado: true })).json();
  const [cuerpo, firma] = cobro.ticket.split(".");
  const datos = JSON.parse(Buffer.from(cuerpo, "base64url").toString("utf8"));
  const alterado = `${Buffer.from(JSON.stringify({ ...datos, simPagadoEn: new Date().toISOString() })).toString("base64url")}.${firma}`;
  const res = await simularPago(alterado);
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error.codigo, "TICKET_INVALIDO");
  const est = await consultarEstado(alterado);
  assert.equal(est.status, 400);
});

test("simulación: vencido sin pago → expirado y simular-pago responde 409 COBRO_VENCIDO", async (t) => {
  conEntorno(t, SIMULACION);
  const llamadas = simularFetch(t, []);
  const cfg = leerConfig();
  const datos = {
    id: "sim_vencido",
    montoCentavos: 100,
    concepto: "Chicle",
    creadoEn: new Date(Date.now() - 700_000).toISOString(),
    expiraEn: new Date(Date.now() - 100_000).toISOString(),
    modoPago: "simulacion",
  };
  const ticket = firmarTicket(datos, cfg.secretoTickets);
  assert.equal((await (await consultarEstado(ticket)).json()).estado, "expirado");
  const res = await simularPago(ticket);
  assert.equal(res.status, 409);
  assert.equal((await res.json()).error.codigo, "COBRO_VENCIDO");
  // Si se pagó antes de vencer, sigue pagado.
  const pagado = firmarTicket({ ...datos, simPagadoEn: new Date(Date.now() - 200_000).toISOString() }, cfg.secretoTickets);
  assert.equal((await (await consultarEstado(pagado)).json()).estado, "pagado");
  assert.equal(llamadas.length, 0);
});
