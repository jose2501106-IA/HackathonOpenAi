// POST /api/webhook-pey → eventos de pey firmados con Standard Webhooks (K03.5, K03.7). Solo bitácora:
// la fuente de verdad del estado es /api/estado. Sin base de datos no se deduplica por webhook-id (no hay efectos de negocio).
import { createHmac, timingSafeEqual } from "node:crypto";
import { leerConfig } from "../lib/config.js";
import { json, errorJson } from "../lib/http.js";

const TOLERANCIA_SEG = 300; // decisión propia: la especificación no fija valor (K03.5)
const MAX_BYTES = 1_000_000;

function verificarFirma({ secreto, id, timestamp, firmas, cuerpo, ahoraSeg }) {
  if (!secreto || !id || !timestamp || !firmas) return false;
  if (!/^[0-9]+$/.test(timestamp)) return false;
  const ts = Number(timestamp);
  if (Math.abs(ahoraSeg - ts) > TOLERANCIA_SEG) return false; // viejo o del futuro
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64"); // secreto sin prefijo, decodificado (K03.5)
  if (!llave.length) return false;
  const esperada = createHmac("sha256", llave).update(`${id}.${timestamp}.${cuerpo}`).digest();
  // Puede haber varias firmas separadas por espacio: "v1,<b64> v1,<b64>".
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    if (version !== "v1" || !b64) return false;
    const recibida = Buffer.from(b64, "base64");
    return recibida.length === esperada.length && timingSafeEqual(recibida, esperada);
  });
}

export async function POST(request) {
  const cfg = leerConfig();
  const cuerpo = await request.text(); // cuerpo CRUDO: se verifica antes de parsear (K03.5)
  if (cuerpo.length > MAX_BYTES) return errorJson("DEMASIADO_GRANDE", "La solicitud es demasiado grande.", 413);
  if (!cfg.pey.webhookSecret) console.warn("webhook_pey_sin_secreto");
  const webhookId = request.headers.get("webhook-id");
  const ok = verificarFirma({
    secreto: cfg.pey.webhookSecret,
    id: webhookId,
    timestamp: request.headers.get("webhook-timestamp"),
    firmas: request.headers.get("webhook-signature"),
    cuerpo,
    ahoraSeg: Math.floor(Date.now() / 1000),
  });
  if (!ok) return errorJson("FIRMA_INVALIDA", "Firma inválida.", 401);

  let evento;
  try {
    evento = JSON.parse(cuerpo);
  } catch {
    return errorJson("JSON_INVALIDO", "No pude leer el evento.", 400);
  }
  // Solo type, webhook-id e ids: nunca el cuerpo completo ni datos personales.
  console.info(
    "webhook_pey",
    JSON.stringify({
      type: evento?.type ?? null,
      webhookId,
      codiQrId: evento?.codiQrId ?? null,
      transactionId: evento?.transactionId ?? null,
    }),
  );
  return json({ recibido: true });
}
