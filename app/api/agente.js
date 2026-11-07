// POST /api/agente — entender la venta (NO cobra). Contrato: docs/CONTRATO-API.md.
// Entrada { texto } (1–300 caracteres) → 200 { respuesta, propuesta | null, origen: "openai" | "reglas" }.
// Si OpenAI no está o falla, responde con reglas locales: esta ruta no regresa 503 por la IA.
import { leerConfig } from "../lib/config.js";
import { ErrorApp, json, leerJson, respuestaDeError } from "../lib/http.js";
import { interpretarVenta } from "../lib/agente.js";

export async function POST(request) {
  try {
    const cfg = leerConfig();
    const cuerpo = await leerJson(request, 10_000);
    const texto = typeof cuerpo?.texto === "string" ? cuerpo.texto.trim() : "";
    if (!texto || texto.length > 300) {
      throw new ErrorApp("TEXTO_INVALIDO", "Escribe qué vas a cobrar (hasta 300 caracteres).", 400);
    }
    return json(await interpretarVenta(texto, cfg));
  } catch (e) {
    return respuestaDeError(e);
  }
}
