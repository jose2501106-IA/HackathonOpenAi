// Pruebas de POST /api/webhook-pey: verificación Standard Webhooks (K03.5, K03.7) con tolerancia de 5 min.
import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import * as webhook from "../api/webhook-pey.js";

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

// El webhook no debe llamar a nadie: fetch que falla si se usa, restaurado al final.
function sinRed(t) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("fetch inesperado en la prueba");
  };
  t.after(() => {
    globalThis.fetch = original;
  });
}

const nuevoSecreto = () => `whsec_${crypto.randomBytes(32).toString("base64")}`;
const ahoraSeg = () => Math.floor(Date.now() / 1000);

function firmar(cuerpo, secreto, ts = ahoraSeg(), id = `msg_${crypto.randomUUID()}`) {
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const firma = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest("base64");
  return { "webhook-id": id, "webhook-timestamp": String(ts), "webhook-signature": `v1,${firma}` };
}

const enviar = (headers, body) =>
  webhook.POST(new Request("http://x/api/webhook-pey", { method: "POST", headers: { "content-type": "application/json", ...headers }, body }));

const EVENTO = JSON.stringify({
  type: "codi.qr.payment_received",
  amount: 1,
  codiQrId: "IDC123",
  concept: "Dulce de tamarindo",
  numRef: "1234567",
  datePaid: 1794000060,
  transactionId: "01TRANSACCION",
  apiKeyId: "AK1",
});

test("webhook: vector oficial de Svix/Standard Webhooks → 200", async (t) => {
  // Vector PÚBLICO de la documentación de Svix (SB40): msg_p5jXN8AQM9LWM0D4loKWxJek, timestamp 1614265330.
  // Se arma en partes para que los escáneres de secretos no lo confundan con una llave real.
  conEntorno(t, { PEY_WEBHOOK_SECRET: ["whsec", "MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw"].join("_") });
  sinRed(t);
  t.mock.timers.enable({ apis: ["Date"], now: 1614265330 * 1000 });
  t.mock.method(console, "info", () => {});
  const res = await enviar(
    {
      "webhook-id": "msg_p5jXN8AQM9LWM0D4loKWxJek",
      "webhook-timestamp": "1614265330",
      "webhook-signature": "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
    },
    '{"test": 2432232314}',
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { recibido: true });
});

test("webhook: firma válida → 200 { recibido: true }; solo registra type, webhook-id e ids", async (t) => {
  const secreto = nuevoSecreto();
  conEntorno(t, { PEY_WEBHOOK_SECRET: secreto });
  sinRed(t);
  const info = t.mock.method(console, "info", () => {});
  const headers = firmar(EVENTO, secreto);
  const res = await enviar(headers, EVENTO);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { recibido: true });
  const registrado = info.mock.calls.map((c) => c.arguments.join(" ")).join("\n");
  assert.match(registrado, /codi\.qr\.payment_received/);
  assert.ok(registrado.includes(headers["webhook-id"]));
  assert.ok(registrado.includes("IDC123") && registrado.includes("01TRANSACCION"));
  assert.ok(!registrado.includes("Dulce de tamarindo"), "no registra el cuerpo completo");
  assert.ok(!registrado.includes(secreto.slice(6, 20)), "no registra el secreto");
});

test("webhook: el mismo evento repetido también responde 200 (cualquier 2xx es entrega)", async (t) => {
  const secreto = nuevoSecreto();
  conEntorno(t, { PEY_WEBHOOK_SECRET: secreto });
  sinRed(t);
  t.mock.method(console, "info", () => {});
  const headers = firmar(EVENTO, secreto);
  assert.equal((await enviar(headers, EVENTO)).status, 200);
  assert.equal((await enviar(headers, EVENTO)).status, 200);
});

test("webhook: firma con otro secreto, cuerpo alterado o sin headers → 401 FIRMA_INVALIDA", async (t) => {
  const secreto = nuevoSecreto();
  conEntorno(t, { PEY_WEBHOOK_SECRET: secreto });
  sinRed(t);
  const casos = [
    [firmar(EVENTO, nuevoSecreto()), EVENTO],
    [firmar(EVENTO, secreto), EVENTO.replace('"amount":1', '"amount":1000')],
    [{}, EVENTO],
    [{ ...firmar(EVENTO, secreto), "webhook-signature": "v2,AAAA" }, EVENTO],
    [{ ...firmar(EVENTO, secreto), "webhook-id": "msg_otro" }, EVENTO],
  ];
  for (const [headers, cuerpo] of casos) {
    const res = await enviar(headers, cuerpo);
    assert.equal(res.status, 401);
    assert.equal((await res.json()).error.codigo, "FIRMA_INVALIDA");
  }
});

test("webhook: timestamp de más de 5 min (viejo o futuro) → 401; dentro de 5 min → 200", async (t) => {
  const secreto = nuevoSecreto();
  conEntorno(t, { PEY_WEBHOOK_SECRET: secreto });
  sinRed(t);
  t.mock.method(console, "info", () => {});
  assert.equal((await enviar(firmar(EVENTO, secreto, ahoraSeg() - 301), EVENTO)).status, 401);
  assert.equal((await enviar(firmar(EVENTO, secreto, ahoraSeg() + 301), EVENTO)).status, 401);
  assert.equal((await enviar(firmar(EVENTO, secreto, ahoraSeg() - 3600), EVENTO)).status, 401);
  assert.equal((await enviar(firmar(EVENTO, secreto, ahoraSeg() - 290), EVENTO)).status, 200);
});

test("webhook: varias firmas separadas por espacio, una válida → 200", async (t) => {
  const secreto = nuevoSecreto();
  conEntorno(t, { PEY_WEBHOOK_SECRET: secreto });
  sinRed(t);
  t.mock.method(console, "info", () => {});
  const headers = firmar(EVENTO, secreto);
  headers["webhook-signature"] = `v1,${crypto.randomBytes(32).toString("base64")} ${headers["webhook-signature"]}`;
  assert.equal((await enviar(headers, EVENTO)).status, 200);
});

test("webhook: sin PEY_WEBHOOK_SECRET configurado → 401", async (t) => {
  conEntorno(t, {});
  sinRed(t);
  t.mock.method(console, "warn", () => {});
  const res = await enviar(firmar(EVENTO, nuevoSecreto()), EVENTO);
  assert.equal(res.status, 401);
});

test("webhook: firma válida pero cuerpo que no es JSON → 400", async (t) => {
  const secreto = nuevoSecreto();
  conEntorno(t, { PEY_WEBHOOK_SECRET: secreto });
  sinRed(t);
  const res = await enviar(firmar("no es json", secreto), "no es json");
  assert.equal(res.status, 400);
});
