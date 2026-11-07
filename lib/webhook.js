// Verificación de webhooks de pey con Standard Webhooks (pey/09). `cuerpo` es el texto crudo.
import crypto from "node:crypto";

export function firmaValida({ secreto, headers, cuerpo, toleranciaSeg = 300, ahoraMs = Date.now() }) {
  const id = headers.get("webhook-id");
  const ts = headers.get("webhook-timestamp");
  const firmas = headers.get("webhook-signature");
  if (!secreto || !id || !ts || !firmas) return false;
  if (!/^\d{1,12}$/.test(ts) || Math.abs(ahoraMs / 1000 - Number(ts)) > toleranciaSeg) return false;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    const recibida = Buffer.from(b64 ?? "", "base64");
    return version === "v1" && recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}
