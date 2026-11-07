// Cliente mínimo de la API CoDi de pey con fetch nativo (Node 20+, sin dependencias).
// Campos según openapi.json 2026-10-20 (K03.4) y ejemplos de K03.7. La llave sale de cfg (leerConfig) y nunca se registra.
// Contrato: docs/CONTRATO-API.md → PeyError, crearQr, consultarPagosQr, listarPagosRecientes.

const BASE_POR_DEFECTO = "https://api.pey.mx"; // único entorno documentado (producción) (K03.3)
const TIMEOUT_CREAR_MS = 20_000; // generateImage puede hacer lenta la respuesta (K03.7)
const TIMEOUT_CONSULTA_MS = 8_000; // la interfaz consulta cada 2 s: mejor fallar rápido y reintentar
const MAX_PAGINAS = 3;

// status = HTTP de pey (0 si no hubo respuesta). codigo = el que ven los handlers:
// PEY_NO_AUTORIZADO · PEY_NO_RESPONDE · PEY_NO_ENCONTRADO · PEY_RECHAZO. El mensaje ya va en español para la persona.
export class PeyError extends Error {
  constructor(status, codigo, mensaje, { tipo = null, requestId = null } = {}) {
    super(mensaje);
    this.name = "PeyError";
    this.status = status;
    this.codigo = codigo;
    this.tipo = tipo; // error.type de pey, p. ej. INVALID_AMOUNT, INVALID_STATE, SERVICE_UNAVAILABLE (K03.8)
    this.requestId = requestId; // sirve para pedir soporte a pey
  }
}

function errorDePey(status, datos) {
  const tipo = datos?.error?.type ?? null;
  const requestId = datos?.error?.requestId ?? null;
  // Solo identificadores: nunca la llave ni el cuerpo completo.
  console.warn("pey_error", status, tipo ?? "", requestId ?? "");
  const extra = { tipo, requestId };
  // TODO(⚪): pey no documenta el código de llave inválida (K03.8); 401, 403 e INVALID_STATE = cuenta no habilitada.
  if (status === 401 || status === 403 || tipo === "INVALID_STATE") {
    return new PeyError(status, "PEY_NO_AUTORIZADO", "Tu cuenta de pey todavía no está habilitada para cobrar.", extra);
  }
  if (status === 404) {
    return new PeyError(404, "PEY_NO_ENCONTRADO", "pey no encontró este cobro con esta llave.", extra);
  }
  // TODO(⚪): límite de peticiones no documentado (K03.8); 429 se trata como falla temporal, igual que 5xx.
  if (status >= 500 || status === 429) {
    return new PeyError(status, "PEY_NO_RESPONDE", "pey no responde en este momento. Intenta de nuevo en unos segundos.", extra);
  }
  return new PeyError(status, "PEY_RECHAZO", "pey no aceptó la solicitud. Revisa el monto y el concepto.", extra);
}

async function pedir(ruta, cfg, { method = "GET", body, timeoutMs = TIMEOUT_CONSULTA_MS } = {}) {
  const apiKey = cfg?.pey?.apiKey;
  if (!apiKey) throw new PeyError(0, "PEY_NO_AUTORIZADO", "Falta la llave de pey en el servidor.");
  const base = cfg?.pey?.baseUrl || BASE_POR_DEFECTO;
  let res;
  let texto;
  try {
    res = await fetch(`${base}${ruta}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeoutMs),
    });
    texto = await res.text();
  } catch (e) {
    // Red caída, DNS o timeout: no sabemos qué pasó del lado de pey.
    console.warn("pey_sin_respuesta", e?.name || "Error");
    throw new PeyError(0, "PEY_NO_RESPONDE", "pey no responde en este momento. Intenta de nuevo en unos segundos.");
  }
  let datos = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch {
    datos = null;
  }
  if (!res.ok) throw errorDePey(res.status, datos);
  return datos;
}

/** Crea un QR CoDi (POST /codi/qr, K03.4). Monto en CENTAVOS enteros aquí; a pey se manda en PESOS.
 *  → { id (IDC de Banxico), qrString, qrImageBase64 | null } */
export async function crearQr({ montoCentavos, concepto, numRef = "0", expiracionSegundos = 600 }, cfg) {
  if (!Number.isInteger(montoCentavos) || montoCentavos <= 0) throw new TypeError("montoCentavos debe ser un entero mayor que 0");
  const ref = String(numRef);
  if (!/^[0-9]{1,7}$/.test(ref)) throw new TypeError("numRef debe tener de 1 a 7 dígitos"); // K03.4
  if (!(expiracionSegundos === 0 || (Number.isInteger(expiracionSegundos) && expiracionSegundos >= 360))) {
    throw new TypeError("expiration debe ser 0 o de al menos 360 s"); // K03.4
  }
  const datos = await pedir("/codi/qr", cfg, {
    method: "POST",
    timeoutMs: TIMEOUT_CREAR_MS,
    body: {
      amount: montoCentavos / 100, // pesos con decimales, no centavos (K03.4)
      concept: String(concepto ?? "").slice(0, 40), // TODO(⚪): pey no documenta largo máximo; 40 es decisión propia (K03.7)
      expiration: expiracionSegundos,
      numRef: ref,
      generateImage: true, // agrega qrImage (PNG base64); puede venir null (K03.4)
    },
  });
  if (!datos?.id || !datos?.qrString) {
    throw new PeyError(0, "PEY_NO_RESPONDE", "pey respondió algo que no entendí. Intenta de nuevo.");
  }
  return { id: String(datos.id), qrString: String(datos.qrString), qrImageBase64: datos.qrImage || null };
}

/** Pagos de un QR (GET /transaction/codi/qr/{id}, 20 por página, K03.4).
 *  → [{ id, status: "PENDING"|"PAID", amount, datePaid|null, ... }]. Lanza PeyError(404) si el QR no existe con esta llave. */
export async function consultarPagosQr(id, cfg) {
  if (!id) throw new TypeError("Falta el id del QR");
  const items = [];
  let nextToken = null;
  let paginas = 0;
  do {
    const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
    const datos = await pedir(`/transaction/codi/qr/${encodeURIComponent(id)}${qs}`, cfg);
    for (const t of Array.isArray(datos?.items) ? datos.items : []) items.push({ ...t, datePaid: t?.datePaid ?? null });
    nextToken = datos?.nextToken || null;
  } while (nextToken && ++paginas < MAX_PAGINAS);
  return items;
}

/** Pagos PAID recientes de la llave (GET /transaction/api-key, 80 por página con nextToken, máximo 3 páginas, K03.4).
 *  desdeEpoch en segundos Unix (si llega en milisegundos se convierte).
 *  → [{ id, monto (pesos), fechaPago (ISO), claveRastreo | null }] */
export async function listarPagosRecientes({ desdeEpoch } = {}, cfg) {
  let desde = Number(desdeEpoch);
  if (!Number.isFinite(desde)) desde = 0;
  if (desde > 1e12) desde = Math.floor(desde / 1000); // llegó en milisegundos
  const pagos = [];
  let nextToken = null;
  let paginas = 0;
  do {
    const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
    const datos = await pedir(`/transaction/api-key${qs}`, cfg);
    const items = Array.isArray(datos?.items) ? datos.items : [];
    for (const t of items) {
      if (t?.status !== "PAID") continue;
      const fecha = Number(t.datePaid ?? t.dateCreated); // segundos Unix (K03.5)
      if (!Number.isFinite(fecha) || fecha < desde) continue;
      pagos.push({
        id: String(t.id),
        monto: Math.round(Number(t.amount) * 100) / 100,
        fechaPago: new Date(fecha * 1000).toISOString(),
        claveRastreo: t.metadata?.trackingKey ?? null, // TODO(⚪): confirmar que trackingKey sea la clave de rastreo SPEI (K07.3, SB21)
      });
    }
    // Vienen de la más reciente a la más antigua (K03.9): si la última ya es anterior a "desde", no hay más que buscar.
    const ultima = items.at(-1);
    if (ultima && Number(ultima.dateCreated ?? ultima.datePaid) < desde) break;
    nextToken = datos?.nextToken || null;
  } while (nextToken && ++paginas < MAX_PAGINAS);
  return pagos;
}
