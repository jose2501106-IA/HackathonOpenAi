import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { crearApp } from "../lib/app.js";
import { fetchFalso, pedir, leer } from "./ayuda.js";

const salidaIA = (objeto) => ({
  cuerpo: { output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(objeto) }] }] },
});

test("IA: manda el texto con Structured Outputs y el servidor pone los precios", async () => {
  const f = fetchFalso({
    "POST /v1/responses": salidaIA({ items: [{ id: "pa", cantidad: 4 }, { id: "xx", cantidad: 2 }, { id: "ho", cantidad: 1 }], noEntendido: ["un tepache"] }),
  });
  const app = crearApp({ env: { OPENAI_API_KEY: "llave-falsa-openai" }, fetch: f });
  const r = await leer(await app.interpretar(pedir("/api/interpretar", { metodo: "POST", cuerpo: { texto: "cuatro de pastor, una horchata y un tepache" } })));
  assert.equal(r.status, 200);
  assert.equal(r.datos.fuente, "ia");
  assert.deepEqual(r.datos.items, [
    { id: "pa", nombre: "Taco al pastor", precio: 25, cantidad: 4 },
    { id: "ho", nombre: "Agua de horchata", precio: 30, cantidad: 1 },
  ]);
  assert.deepEqual(r.datos.noEntendido, ["un tepache"]);

  const [llamada] = f.llamadas;
  assert.equal(llamada.url, "https://api.openai.com/v1/responses");
  assert.equal(llamada.headers.authorization, "Bearer llave-falsa-openai");
  assert.equal(llamada.cuerpo.model, "gpt-6-luna");
  assert.equal(llamada.cuerpo.text.format.type, "json_schema");
  assert.equal(llamada.cuerpo.text.format.strict, true);
  assert.deepEqual(llamada.cuerpo.text.format.schema.properties.items.items.properties.id.enum, ["pa", "su", "bi", "ca", "gr", "qu", "re", "ho", "ja"]);
});

test("IA: OPENAI_MODEL cambia el modelo; si la IA falla, usa la interpretación básica y avisa", async () => {
  const f = fetchFalso({ "POST /v1/responses": { status: 500, cuerpo: { error: { message: "falla" } } } });
  const app = crearApp({ env: { OPENAI_API_KEY: "llave-falsa-openai", OPENAI_MODEL: "otro-modelo" }, fetch: f });
  const r = await leer(await app.interpretar(pedir("/api/interpretar", { metodo: "POST", cuerpo: { texto: "dos de suadero" } })));
  assert.equal(f.llamadas[0].cuerpo.model, "otro-modelo");
  assert.equal(r.status, 200);
  assert.equal(r.datos.fuente, "basica");
  assert.match(r.datos.aviso, /IA no respondió/);
  assert.equal(r.datos.items[0].id, "su");
});

function firmar(secretoB64, id, ts, cuerpo) {
  return `v1,${crypto.createHmac("sha256", Buffer.from(secretoB64, "base64")).update(`${id}.${ts}.${cuerpo}`).digest("base64")}`;
}

test("webhook: acepta solo firmas válidas y recientes", async () => {
  const secretoB64 = Buffer.from("secreto-de-prueba-para-webhooks").toString("base64");
  const ahoraMs = 1_794_000_000_000;
  const ts = String(Math.floor(ahoraMs / 1000));
  const app = crearApp({ env: { PEY_WEBHOOK_SECRET: `whsec_${secretoB64}` }, fetch: fetchFalso(), ahora: () => ahoraMs });
  const cuerpo = JSON.stringify({ type: "codi.pn.payment_received", amount: 1, transactionId: "01JG0000000000000000000000", numRef: "1234567" });
  const headers = { "webhook-id": "msg_1", "webhook-timestamp": ts, "webhook-signature": firmar(secretoB64, "msg_1", ts, cuerpo) };

  const ok = await leer(await app.webhook(pedir("/api/webhook-pey", { metodo: "POST", cuerpo, headers })));
  assert.equal(ok.status, 200);
  assert.deepEqual(ok.datos, { recibido: true });

  const alterado = await app.webhook(pedir("/api/webhook-pey", { metodo: "POST", cuerpo: cuerpo.replace('"amount":1', '"amount":100'), headers }));
  assert.equal(alterado.status, 401);

  const viejo = String(Number(ts) - 3600);
  const r = await app.webhook(pedir("/api/webhook-pey", {
    metodo: "POST",
    cuerpo,
    headers: { ...headers, "webhook-timestamp": viejo, "webhook-signature": firmar(secretoB64, "msg_1", viejo, cuerpo) },
  }));
  assert.equal(r.status, 401);

  const sinSecreto = crearApp({ env: {}, fetch: fetchFalso() });
  assert.equal((await sinSecreto.webhook(pedir("/api/webhook-pey", { metodo: "POST", cuerpo, headers }))).status, 503);
});
