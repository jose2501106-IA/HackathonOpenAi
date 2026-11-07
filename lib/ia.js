// Inteligencia de datos con la API de OpenAI (Responses API + Structured Outputs). Lista para usarse:
// basta con definir OPENAI_API_KEY (y opcionalmente OPENAI_MODEL). Sin llave, regresa { disponible: false }.
// Fuentes: developers.openai.com/api/docs/guides/structured-outputs y /api/docs/models (consultadas 2026-11-07 en la sesión anterior del repo).
// La IA solo SUGIERE: no cambia inventario, precios ni cobros.
import { ErrorApp } from "./errores.js";

const URL_RESPONSES = "https://api.openai.com/v1/responses";

const ESQUEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    resumen: { type: "string" },
    reabastecer: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: { ingrediente: { type: "string" }, motivo: { type: "string" } },
        required: ["ingrediente", "motivo"],
      },
    },
    observaciones: { type: "array", items: { type: "string" } },
  },
  required: ["resumen", "reabastecer", "observaciones"],
};

const INSTRUCCIONES = [
  "Eres analista de una taquería de la Ciudad de México. Responde en español de México, breve y concreto.",
  "Recibes el reporte de ventas del día (montos en centavos) y el inventario de ingredientes con su mínimo.",
  "Di qué ingredientes conviene reabastecer y por qué, usando solo los datos recibidos; señala horas pico y productos estrella.",
  "No inventes cifras, precios ni datos que no estén en la entrada.",
].join(" ");

function extraerTexto(datos) {
  if (typeof datos?.output_text === "string") return datos.output_text;
  for (const item of Array.isArray(datos?.output) ? datos.output : []) {
    if (item?.type !== "message") continue;
    for (const c of Array.isArray(item.content) ? item.content : []) {
      if (c?.type === "output_text" && typeof c.text === "string") return c.text;
    }
  }
  throw new ErrorApp("IA_ERROR", "La IA no regresó un análisis.", 502);
}

export async function analizarNegocio({ reporte, inventario }, { apiKey, modelo, fetch: f = globalThis.fetch, timeoutMs = 30_000 }) {
  if (!apiKey) {
    return { disponible: false, mensaje: "El análisis con IA está apagado. Agrega OPENAI_API_KEY en las variables del servidor para activarlo." };
  }
  let resp;
  try {
    resp = await f(URL_RESPONSES, {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: modelo,
        instructions: INSTRUCCIONES,
        input: JSON.stringify({ reporte, inventario }),
        text: { format: { type: "json_schema", name: "analisis_taqueria", strict: true, schema: ESQUEMA } },
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    throw new ErrorApp("IA_ERROR", "No pudimos conectar con la IA.", 502);
  }
  if (!resp.ok) throw new ErrorApp("IA_ERROR", `La IA respondió con error (HTTP ${resp.status}).`, 502);
  let analisis;
  try {
    analisis = JSON.parse(extraerTexto(await resp.json()));
  } catch (e) {
    if (e instanceof ErrorApp) throw e;
    throw new ErrorApp("IA_ERROR", "La IA regresó algo que no es un análisis.", 502);
  }
  return { disponible: true, analisis };
}
