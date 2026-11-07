// Cliente mínimo de la API de pey (solo producción: https://api.pey.mx). Ver pey/03, pey/04, pey/07 y pey/11.
// Autenticación: Authorization: Bearer <PEY_API_KEY>. Montos en PESOS al hablar con pey (aquí entran centavos).
import { ErrorApp } from "./errores.js";

const BASE = "https://api.pey.mx";

// Mensajes en español para los tipos de error que documenta el OpenAPI de pey para POST /codi/pn (pey/11).
const MENSAJES = {
  INVALID_PARAMETER: "pey rechazó los datos del cobro. Revisa que el celular tenga 10 dígitos.",
  INCOMPLETE_PARAMETERS: "Faltan datos para crear el cobro.",
  INVALID_AMOUNT: "El monto del cobro no es válido.",
  INVALID_STATE: "La cuenta de pey del negocio no tiene CoDi activo.",
  INVALID_REQUEST: "pey rechazó la solicitud de cobro.",
  BAD_REQUEST: "pey rechazó la solicitud de cobro.",
  PEY_CONSISTENCY_ERROR: "pey tuvo un problema de consistencia con el cobro.",
  AUTH_ERROR: "La llave de pey del negocio no es válida.",
};

function tipoDeError(datos, status) {
  const t = datos?.error?.type ?? datos?.type ?? datos?.error?.code;
  return typeof t === "string" && /^[A-Z_]{2,40}$/.test(t) ? t : `HTTP_${status}`;
}

// El mensaje de pey viene en inglés; lo mostramos corto y limpio como detalle.
function detalle(datos) {
  const m = datos?.error?.message ?? datos?.message;
  return typeof m === "string" ? m.replace(/[^\p{L}\p{N} .,:;()_\-/]/gu, "").slice(0, 120) : "";
}

export const pesos = (centavos) => Math.round(centavos) / 100;
export const centavos = (pesosNum) => Math.round(Number(pesosNum) * 100);

export function crearClientePey({ apiKey, fetch: f = globalThis.fetch, timeoutMs = 15_000 }) {
  async function llamar(metodo, ruta, cuerpo) {
    let resp;
    try {
      resp = await f(`${BASE}${ruta}`, {
        method: metodo,
        headers: {
          authorization: `Bearer ${apiKey}`,
          accept: "application/json",
          ...(cuerpo ? { "content-type": "application/json" } : {}),
        },
        body: cuerpo ? JSON.stringify(cuerpo) : undefined,
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      throw new ErrorApp("PEY_NO_DISPONIBLE", "No pudimos conectar con pey. Intenta de nuevo en unos segundos.", 503);
    }
    let datos = null;
    try {
      datos = await resp.json();
    } catch {
      datos = null;
    }
    if (resp.ok) return datos;
    const tipo = tipoDeError(datos, resp.status);
    const extra = detalle(datos);
    if (resp.status === 404) throw new ErrorApp("NO_ENCONTRADO", "pey no encontró esa transacción.", 404);
    if (resp.status >= 500) {
      throw new ErrorApp("PEY_NO_DISPONIBLE", `pey no está disponible en este momento (${tipo}). Intenta de nuevo.`, 503);
    }
    const base = MENSAJES[tipo] || "pey rechazó la solicitud de cobro.";
    throw new ErrorApp("PEY_RECHAZO", `${base} (${tipo}${extra ? `: ${extra}` : ""})`, 502);
  }

  return {
    // POST /codi/pn → 200 { transactionId, codiId } (pey/04)
    crearPush: ({ montoCentavos, telefono, concepto, numRef, metadata, expiracionSeg = 360 }) =>
      llamar("POST", "/codi/pn", {
        amount: pesos(montoCentavos),
        phoneNumber: telefono,
        concept: concepto,
        expiration: expiracionSeg,
        numRef,
        metadata,
      }),
    // GET /transaction/{id} → { id, status: PENDING|PAID, amount, ... } (pey/07)
    transaccion: (id) => llamar("GET", `/transaction/${encodeURIComponent(id)}`),
  };
}
