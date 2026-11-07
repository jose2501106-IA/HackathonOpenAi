// Interpretación del pedido con la API de OpenAI (Responses API + Structured Outputs).
// La IA solo identifica productos y cantidades; precios y total los calcula el servidor con el menú.
// Fuentes: developers.openai.com/api/docs/guides/structured-outputs y /api/docs/models (consultadas 2026-11-07).
import { ErrorApp } from "./errores.js";
import { PRODUCTOS } from "./menu.js";

const URL_RESPONSES = "https://api.openai.com/v1/responses";
const IDS = PRODUCTOS.map((p) => p.id);

const ESQUEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string", enum: IDS },
          cantidad: { type: "integer" },
        },
        required: ["id", "cantidad"],
      },
    },
    noEntendido: { type: "array", items: { type: "string" } },
  },
  required: ["items", "noEntendido"],
};

function instrucciones() {
  const menu = PRODUCTOS.map((p) => `${p.id} = ${p.nombre}`).join("; ");
  return [
    "Eres el asistente de caja de una taquería de la Ciudad de México.",
    "Convierte lo que el cajero dicta o escribe en productos del menú.",
    `Menú (id = producto): ${menu}.`,
    "Reglas: usa solo ids del menú; suma las cantidades del mismo producto; entiende números en palabras y expresiones como 'media docena' (6) o 'un par' (2);",
    "si no se dice cantidad, es 1; 'coca' o 'refresco' es re; una gringa de pastor es gr y no agrega tacos al pastor;",
    "ignora modificadores como 'con todo', 'sin cebolla', 'para llevar' o tamaños;",
    "lo que no esté en el menú va en noEntendido con las palabras del cajero; nunca inventes productos ni precios.",
  ].join(" ");
}

function extraerTexto(datos) {
  if (typeof datos?.output_text === "string") return datos.output_text;
  for (const item of Array.isArray(datos?.output) ? datos.output : []) {
    if (item?.type !== "message") continue;
    for (const c of Array.isArray(item.content) ? item.content : []) {
      if (c?.type === "output_text" && typeof c.text === "string") return c.text;
      if (c?.type === "refusal") throw new ErrorApp("IA_ERROR", "La IA no quiso interpretar el pedido.", 502);
    }
  }
  throw new ErrorApp("IA_ERROR", "La IA no regresó un pedido.", 502);
}

export async function interpretarConIA(texto, { apiKey, modelo, fetch: f = globalThis.fetch, timeoutMs = 20_000 }) {
  let resp;
  try {
    resp = await f(URL_RESPONSES, {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: modelo,
        instructions: instrucciones(),
        input: texto,
        text: { format: { type: "json_schema", name: "pedido_taqueria", strict: true, schema: ESQUEMA } },
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    throw new ErrorApp("IA_ERROR", "No pudimos conectar con la IA.", 502);
  }
  if (!resp.ok) throw new ErrorApp("IA_ERROR", `La IA respondió con error (HTTP ${resp.status}).`, 502);

  let resultado;
  try {
    resultado = JSON.parse(extraerTexto(await resp.json()));
  } catch (e) {
    if (e instanceof ErrorApp) throw e;
    throw new ErrorApp("IA_ERROR", "La IA regresó algo que no es un pedido.", 502);
  }

  const cantidades = new Map();
  for (const it of Array.isArray(resultado?.items) ? resultado.items : []) {
    if (!IDS.includes(it?.id) || !Number.isInteger(it?.cantidad) || it.cantidad < 1) continue;
    cantidades.set(it.id, Math.min(50, (cantidades.get(it.id) || 0) + it.cantidad));
  }
  const items = PRODUCTOS.filter((p) => cantidades.has(p.id)).map((p) => ({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    cantidad: cantidades.get(p.id),
  }));
  const noEntendido = (Array.isArray(resultado?.noEntendido) ? resultado.noEntendido : [])
    .filter((s) => typeof s === "string" && s.trim())
    .map((s) => s.trim().slice(0, 80))
    .slice(0, 10);
  return { items, noEntendido, fuente: "ia" };
}
