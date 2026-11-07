// Envoltura de fetch para cada endpoint de docs/CONTRATO-API.md. El navegador SOLO habla con /api/ (sin llaves).
// Errores del servidor: { error: { codigo, mensaje } } → ErrorApi con texto humano de textos.js.

import { mensajeError } from "./textos.js";

export class ErrorApi extends Error {
  constructor(codigo, mensaje, status = 0) {
    super(mensaje);
    this.name = "ErrorApi";
    this.codigo = codigo;
    this.status = status;
  }
}

export function crearApi({ fetchImpl = (...args) => globalThis.fetch(...args), base = "" } = {}) {
  async function pedir(ruta, { metodo = "GET", cuerpo, tiempoMs = 15000 } = {}) {
    const control = typeof AbortController === "function" ? new AbortController() : null;
    let vencio = false;
    const reloj = setTimeout(() => {
      vencio = true;
      control?.abort();
    }, tiempoMs);

    let res;
    let datos = null;
    try {
      try {
        res = await fetchImpl(base + ruta, {
          method: metodo,
          headers: cuerpo === undefined ? { accept: "application/json" } : { "content-type": "application/json", accept: "application/json" },
          body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
          signal: control?.signal,
          cache: "no-store",
          credentials: "same-origin",
        });
      } catch {
        const codigo = vencio ? "TIEMPO" : "RED";
        throw new ErrorApi(codigo, mensajeError(codigo), 0);
      }
      try {
        datos = await res.json();
      } catch {
        if (vencio) throw new ErrorApi("TIEMPO", mensajeError("TIEMPO"), 0);
        datos = null;
      }
    } finally {
      clearTimeout(reloj);
    }

    if (!res.ok || (datos && typeof datos === "object" && datos.error)) {
      const codigo = (datos && datos.error && datos.error.codigo) || `HTTP_${res.status}`;
      throw new ErrorApi(codigo, mensajeError(codigo, datos?.error?.mensaje, res.status), res.status);
    }
    if (!datos || typeof datos !== "object") {
      throw new ErrorApi("RESPUESTA_INVALIDA", mensajeError("RESPUESTA_INVALIDA"), res.status);
    }
    return datos;
  }

  return {
    // 200 { ok, modoPago, maxMontoMxn, openai, pey, version }
    salud: () => pedir("/api/salud", { tiempoMs: 8000 }),

    // 200 { respuesta, propuesta: { concepto, monto, detalle[] } | null, origen }
    agente: (texto) => pedir("/api/agente", { metodo: "POST", cuerpo: { texto }, tiempoMs: 30000 }),

    // 201 { cobro: { id, ticket, concepto, monto, modoPago, qrImage, qrString, numRef, creadoEn, expiraEn } }
    // `confirmado` solo debe ser true cuando la persona tocó "Confirmar y generar QR".
    crearCobro: ({ concepto, monto, confirmado }) =>
      pedir("/api/cobros", { metodo: "POST", cuerpo: { concepto, monto, confirmado: confirmado === true }, tiempoMs: 30000 }),

    // 200 { id, estado, monto, pagadoEn, transactionId, aviso, modoPago }
    estado: (ticket) => pedir(`/api/estado?ticket=${encodeURIComponent(ticket)}`, { tiempoMs: 12000 }),

    // 200 { ticket, estado: "pagado" } (solo en simulación)
    simularPago: (ticket) => pedir("/api/simular-pago", { metodo: "POST", cuerpo: { ticket }, tiempoMs: 12000 }),

    // 200 { leido, origen, veredicto: { codigo, titulo, mensaje, detalle }, pago }
    revisar: ({ imagenBase64 = null, mime = null, ticket = null, montoManual = null } = {}) =>
      pedir("/api/revisar", {
        metodo: "POST",
        cuerpo: { imagenBase64, mime, ticket, montoManual },
        tiempoMs: 60000,
      }),
  };
}

export const api = crearApi();
