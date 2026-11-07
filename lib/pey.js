// Cliente mínimo de la API de pey (solo producción: https://api.pey.mx). Ver pey/03, pey/04 y pey/07.
// Autenticación: Authorization: Bearer <PEY_API_KEY>. Montos en pesos con 2 decimales.
import { ErrorApp } from "./errores.js";

const BASE = "https://api.pey.mx";

// Solo dejamos pasar el tipo de error de pey si parece un código (evita reflejar texto arbitrario).
function tipoDeError(datos, status) {
  const t = datos?.error?.type ?? datos?.type ?? datos?.error?.code;
  return typeof t === "string" && /^[A-Z_]{2,40}$/.test(t) ? t : `HTTP_${status}`;
}

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
    if (resp.status === 404) throw new ErrorApp("NO_ENCONTRADO", "pey no encontró ese cobro.", 404);
    if (resp.status >= 500) throw new ErrorApp("PEY_NO_DISPONIBLE", `pey no está disponible en este momento (${tipo}). Intenta de nuevo.`, 503);
    throw new ErrorApp("PEY_ERROR", `pey rechazó la solicitud (${tipo}).`, 502);
  }

  const dosDecimales = (n) => Math.round(n * 100) / 100;

  return {
    // POST /codi/pn → 200 { transactionId, codiId }
    crearPush: ({ monto, telefono, concepto, numRef, metadata, expiracion }) =>
      llamar("POST", "/codi/pn", {
        amount: dosDecimales(monto),
        phoneNumber: telefono,
        concept: concepto,
        expiration: expiracion,
        numRef,
        metadata,
      }),
    // POST /codi/qr → 201 { id, qrString, qrImage }. Dibujamos el QR nosotros a partir de qrString (más rápido, pey/04).
    crearQr: ({ monto, concepto, numRef, metadata, expiracion }) =>
      llamar("POST", "/codi/qr", {
        amount: dosDecimales(monto),
        concept: concepto,
        expiration: expiracion,
        numRef,
        generateImage: false,
        metadata,
      }),
    transaccion: (id) => llamar("GET", `/transaction/${encodeURIComponent(id)}`),
    pagosDeQr: (id) => llamar("GET", `/transaction/codi/qr/${encodeURIComponent(id)}`),
    transaccionesDeLlave: () => llamar("GET", "/transaction/api-key"),
  };
}
