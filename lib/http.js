import { ErrorApp } from "./errores.js";

const CABECERAS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

export function json(datos, status = 200) {
  return new Response(JSON.stringify(datos), { status, headers: CABECERAS });
}

export function respuestaError(codigo, mensaje, status = 400) {
  return json({ error: { codigo, mensaje } }, status);
}

// Lee un cuerpo JSON pequeño y exige que sea un objeto.
export async function leerJson(request, maxCaracteres = 10_000) {
  const texto = await request.text();
  if (texto.length > maxCaracteres) throw new ErrorApp("CUERPO_GRANDE", "La petición es demasiado grande.", 413);
  if (!texto.trim()) return {};
  let datos;
  try {
    datos = JSON.parse(texto);
  } catch {
    throw new ErrorApp("JSON_INVALIDO", "La petición no es JSON válido.");
  }
  if (datos === null || typeof datos !== "object" || Array.isArray(datos)) {
    throw new ErrorApp("JSON_INVALIDO", "La petición debe ser un objeto JSON.");
  }
  return datos;
}

// Convierte cualquier error en respuesta. Nunca registra llaves, teléfonos ni cuerpos.
export function aRespuesta(e) {
  if (e instanceof ErrorApp) return respuestaError(e.codigo, e.message, e.status);
  console.error("Error interno:", e?.name, e?.message);
  return respuestaError("ERROR_INTERNO", "Algo falló de nuestro lado. Intenta de nuevo.", 500);
}
