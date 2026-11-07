// Respuestas JSON y errores con un solo formato: { error: { codigo, mensaje } }.

export function json(datos, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extraHeaders },
  });
}

export class ErrorApp extends Error {
  constructor(codigo, mensaje, status = 400) {
    super(mensaje);
    this.codigo = codigo;
    this.status = status;
  }
}

export function errorJson(codigo, mensaje, status = 400) {
  return json({ error: { codigo, mensaje } }, status);
}

export function respuestaDeError(e) {
  if (e instanceof ErrorApp) return errorJson(e.codigo, e.message, e.status);
  // Nunca se imprime el detalle con datos sensibles: solo el nombre y el código.
  console.error("error_interno", e?.name || "Error", e?.codigo || "");
  return errorJson("ERROR_INTERNO", "Algo falló de nuestro lado. Intenta de nuevo.", 500);
}

export async function leerJson(request, maxBytes = 2_000_000) {
  const texto = await request.text();
  if (texto.length > maxBytes) throw new ErrorApp("DEMASIADO_GRANDE", "La solicitud es demasiado grande.", 413);
  if (!texto) return {};
  try {
    return JSON.parse(texto);
  } catch {
    throw new ErrorApp("JSON_INVALIDO", "No pude leer la solicitud.", 400);
  }
}

// Montos: el navegador manda pesos; adentro se valida con centavos enteros.
export function aCentavos(monto) {
  const n = Number(monto);
  if (!Number.isFinite(n)) return NaN;
  return Math.round(n * 100);
}

export function aPesos(centavos) {
  return Math.round(centavos) / 100;
}
