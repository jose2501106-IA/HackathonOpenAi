// Lectura de la captura de "ya te transferí" con la Responses API: input_text + input_image (data URL) y salida
// estructurada estricta con el esquema de K07.3 (K04.2, K04.5). La IA solo LEE; el veredicto lo decide coincidencias.js.
// No se guarda ni se registra la imagen ni lo leído.
import { ErrorApp } from "./http.js";
import { jsonDeSalida, llamarResponses } from "./openai.js";

export const INSTRUCCION_CAPTURA = "Lee la captura. Si un dato no se ve, null. No juzgues si es real.";

export const MAX_BYTES_IMAGEN = 1.5 * 1024 * 1024; // 1.5 MB → 413 IMAGEN_GRANDE (CONTRATO-API)
export const MIMES_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"]; // TODO(⚪): K04 no lista formatos de imagen

// Esquema de K07.3 tal cual (strict: todo en required, additionalProperties false).
export const FORMATO_CAPTURA = {
  type: "json_schema",
  name: "captura",
  strict: true,
  schema: {
    type: "object",
    properties: {
      es_comprobante: { type: "boolean" },
      monto: { type: ["number", "null"] },
      fecha: { type: ["string", "null"], description: "YYYY-MM-DD" },
      hora: { type: ["string", "null"], description: "HH:MM, 24 h" },
      clave_rastreo: { type: ["string", "null"] },
      legible: { type: "boolean" },
    },
    required: ["es_comprobante", "monto", "fecha", "hora", "clave_rastreo", "legible"],
    additionalProperties: false,
  },
};

export const LECTURA_ILEGIBLE = Object.freeze({
  es_comprobante: false,
  monto: null,
  fecha: null,
  hora: null,
  clave_rastreo: null,
  legible: false,
});

const TEXTO_PEDIDO =
  "Captura que un cliente enseña como comprobante de un pago (transferencia o CoDi). Devuelve: es_comprobante " +
  "(si parece un comprobante de pago), monto en pesos como número (sin $ ni comas), fecha YYYY-MM-DD, hora HH:MM " +
  "en 24 h, clave_rastreo tal como aparece y legible (si pudiste leerla). Si un dato no se ve, null. No juzgues si es real.";

/** Separa "data:image/jpeg;base64,…" o base64 crudo + mime. */
export function separarImagen(imagenBase64, mime) {
  let datos = String(imagenBase64 ?? "").trim();
  let tipo = String(mime ?? "").trim().toLowerCase();
  const m = /^data:([^;,]+);base64,/i.exec(datos);
  if (m) {
    tipo = m[1].toLowerCase();
    datos = datos.slice(m[0].length);
  }
  datos = datos.replace(/\s+/g, "");
  if (tipo === "image/jpg") tipo = "image/jpeg";
  return { tipo, datos };
}

export function bytesDeBase64(b64) {
  const relleno = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((b64.length * 3) / 4) - relleno);
}

/** Valida tamaño, tipo y forma; regresa el data URL listo para input_image. Lanza ErrorApp (413 / 400). */
export function validarImagen(imagenBase64, mime) {
  const { tipo, datos } = separarImagen(imagenBase64, mime);
  if (!datos) throw new ErrorApp("IMAGEN_REQUERIDA", "Sube la captura o escribe el monto.", 400);
  if (bytesDeBase64(datos) > MAX_BYTES_IMAGEN) {
    throw new ErrorApp("IMAGEN_GRANDE", "La imagen pesa más de 1.5 MB. Recórtala o toma otra captura.", 413);
  }
  if (!MIMES_PERMITIDOS.includes(tipo)) throw new ErrorApp("IMAGEN_INVALIDA", "Sube una imagen JPG, PNG o WebP.", 400);
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(datos)) throw new ErrorApp("IMAGEN_INVALIDA", "No pude abrir la imagen. Intenta con otra.", 400);
  return `data:${tipo};base64,${datos}`;
}

function aMonto(valor) {
  let n = valor;
  if (typeof n === "string") n = Number(n.replace(/[$\s]/g, "").replace(/,(?=\d{3}(\D|$))/g, "").replace(",", "."));
  if (typeof n !== "number" || !Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

function aFecha(valor) {
  if (typeof valor !== "string") return null;
  const v = valor.trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) {
    const d = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(v); // 07/11/2026 → 2026-11-07
    if (d) m = [null, d[3], d[2].padStart(2, "0"), d[1].padStart(2, "0")];
  }
  if (!m) return null;
  const iso = `${m[1]}-${m[2]}-${m[3]}`;
  return Number.isFinite(Date.parse(`${iso}T00:00:00Z`)) ? iso : null;
}

function aHora(valor) {
  if (typeof valor !== "string") return null;
  const m = /(\d{1,2}):(\d{2})(?::\d{2})?\s*([ap])?\.?\s*m?\.?/i.exec(valor.trim());
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ampm = m[3]?.toLowerCase();
  if (ampm === "p" && h < 12) h += 12;
  if (ampm === "a" && h === 12) h = 0;
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

/** Limpia la lectura del modelo: tipos correctos y formatos de fecha/hora; lo dudoso queda en null. */
export function normalizarLectura(d) {
  if (!d || typeof d !== "object") return { ...LECTURA_ILEGIBLE };
  const clave = typeof d.clave_rastreo === "string" ? d.clave_rastreo.replace(/\s+/g, " ").trim().slice(0, 50) : "";
  return {
    es_comprobante: d.es_comprobante === true,
    monto: aMonto(d.monto),
    fecha: aFecha(d.fecha),
    hora: aHora(d.hora),
    clave_rastreo: clave || null,
    legible: d.legible === true,
  };
}

/** Lee la captura con OpenAI. Negativa, respuesta incompleta o salida inválida → { legible: false, ... }.
 *  Fallas de red/llave/saldo se propagan como ErrorApp 503 (la interfaz pide el monto a mano). */
export async function extraerCaptura({ imagenBase64, mime }, cfg) {
  const imagen = validarImagen(imagenBase64, mime);
  const resp = await llamarResponses(
    {
      reasoning: { effort: "low" }, // K04.2
      store: false, // la captura puede traer datos personales (TODO(⚪): K04.15 lo menciona, no lo confirma)
      instructions: INSTRUCCION_CAPTURA,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: TEXTO_PEDIDO },
            { type: "input_image", image_url: imagen }, // forma de K04.2 (⚪ no verificada hoy)
          ],
        },
      ],
      text: { format: FORMATO_CAPTURA },
    },
    cfg,
  );
  const datos = jsonDeSalida(resp); // null si hubo negativa, quedó "incomplete" o no es JSON (K04.5)
  return datos ? normalizarLectura(datos) : { ...LECTURA_ILEGIBLE };
}
