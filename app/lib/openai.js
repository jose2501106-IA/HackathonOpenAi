// Cliente mínimo de la Responses API de OpenAI con fetch nativo (K04.4, K04.15). Sin SDK ni dependencias.
// Nunca registra la llave, el cuerpo enviado (puede traer una imagen) ni la respuesta: solo status y código de error.
import { ErrorApp } from "./http.js";

export const TIMEOUT_MS = 20_000;
const MANUAL = "Escribe el monto a mano.";

// Todas las fallas de OpenAI salen como 503 para que la interfaz ofrezca el monto manual (CONTRATO-API, K07.3 riesgos).
function errorPorStatus(status, codigoOpenAI) {
  if (status === 429 && /insufficient_quota|billing|quota/i.test(codigoOpenAI)) {
    return new ErrorApp("IA_SIN_SALDO", `La IA se quedó sin saldo. ${MANUAL}`, 503);
  }
  // 401/403 (llave), 429 (límite), 400 (parámetro) y 5xx: no disponible.
  return new ErrorApp("IA_NO_DISPONIBLE", `La IA no está disponible ahorita. ${MANUAL}`, 503);
}

/** POST {baseUrl}/responses. Pone `model` desde cfg (OPENAI_MODEL) si el cuerpo no lo trae. Timeout con AbortController. */
export async function llamarResponses(cuerpo, cfg, { timeoutMs = TIMEOUT_MS } = {}) {
  const apiKey = cfg?.openai?.apiKey;
  if (!apiKey) throw new ErrorApp("IA_NO_DISPONIBLE", `La IA no está configurada. ${MANUAL}`, 503);
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), timeoutMs);
  try {
    const r = await fetch(`${cfg.openai.baseUrl}/responses`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: cfg.openai.modelo, ...cuerpo }),
      signal: control.signal,
    });
    if (!r.ok) {
      let codigo = "";
      try {
        const j = await r.json();
        codigo = String(j?.error?.code || j?.error?.type || "");
      } catch {
        codigo = "";
      }
      console.warn("openai_error", r.status, codigo);
      throw errorPorStatus(r.status, codigo);
    }
    return await r.json();
  } catch (e) {
    if (e instanceof ErrorApp) throw e;
    const porTiempo = control.signal.aborted;
    console.warn("openai_sin_respuesta", porTiempo ? "timeout" : e?.name || "Error");
    throw new ErrorApp(
      "IA_NO_DISPONIBLE",
      porTiempo ? `La IA tardó demasiado. ${MANUAL}` : `No pude hablar con la IA. ${MANUAL}`,
      503,
    );
  } finally {
    clearTimeout(reloj);
  }
}

/** Texto final. En JSON crudo no viene `output_text` (atajo de los SDK, ⚪ K04.15): se arma con los items `message`. */
export function textoDeSalida(resp) {
  if (typeof resp?.output_text === "string" && resp.output_text) return resp.output_text;
  return (Array.isArray(resp?.output) ? resp.output : [])
    .filter((it) => it?.type === "message")
    .flatMap((it) => (Array.isArray(it.content) ? it.content : []))
    .filter((c) => c?.type === "output_text" && typeof c.text === "string")
    .map((c) => c.text)
    .join("");
}

/** Negativa del modelo: llega como item `refusal` y no sigue el esquema (K04.5). */
export function negativaDe(resp) {
  for (const it of Array.isArray(resp?.output) ? resp.output : []) {
    if (it?.type !== "message" || !Array.isArray(it.content)) continue;
    for (const c of it.content) if (c?.type === "refusal") return String(c.refusal || "negativa");
  }
  return null;
}

export const estaIncompleta = (resp) => resp?.status === "incomplete"; // p. ej. por max_output_tokens (K04.5)

/** Salida estructurada (text.format json_schema) ya parseada; null si hubo negativa, quedó incompleta o no es JSON. */
export function jsonDeSalida(resp) {
  if (!resp || estaIncompleta(resp) || negativaDe(resp)) return null;
  const texto = textoDeSalida(resp).trim();
  if (!texto) return null;
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

/** Items `function_call` (call_id, name, arguments en texto JSON, K04.6). Puede haber cero, una o varias. */
export function llamadasDeHerramientas(resp, nombre) {
  return (Array.isArray(resp?.output) ? resp.output : [])
    .filter((it) => it?.type === "function_call" && (!nombre || it.name === nombre))
    .map((it) => {
      let args = null;
      try {
        args = typeof it.arguments === "string" ? JSON.parse(it.arguments) : (it.arguments ?? null);
      } catch {
        args = null;
      }
      return { callId: it.call_id ?? null, nombre: it.name, args };
    });
}
