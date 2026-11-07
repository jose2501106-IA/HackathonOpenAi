// POST /api/cobros → crea el cobro (QR CoDi de pey o SIMULACIÓN). Requiere confirmación humana (AGENTS.md §3, K03.9).
// Entrada { concepto, monto (pesos), confirmado: true }. Salida 201 { cobro } con ticket firmado (docs/CONTRATO-API.md).
import { randomBytes, randomInt } from "node:crypto";
import { leerConfig } from "../lib/config.js";
import { json, errorJson, respuestaDeError, leerJson, aCentavos, aPesos, ErrorApp } from "../lib/http.js";
import { firmarTicket } from "../lib/ticket.js";
import { crearQr, PeyError } from "../lib/pey.js";
import { imagenQr, normalizarQrImage } from "../lib/qr.js";

const MENSAJES_PEY = {
  PEY_NO_AUTORIZADO: "Tu cuenta de pey todavía no está habilitada para cobrar.",
  PEY_NO_RESPONDE: "pey no responde en este momento. Intenta de nuevo en unos segundos.",
  PEY_RECHAZO: "pey no aceptó el cobro. Revisa el monto y el concepto e intenta de nuevo.",
};

function validarMonto(monto, maxMontoMxn) {
  const max = Math.round(maxMontoMxn * 100);
  const valido = typeof monto === "number" || (typeof monto === "string" && monto.trim() !== "");
  const n = valido ? Number(monto) : NaN;
  const centavos = aCentavos(n);
  // Hasta 2 decimales, de $0.01 al tope (MAX_MONTO_MXN).
  if (!Number.isFinite(n) || Math.abs(n * 100 - centavos) > 1e-6 || centavos < 1 || centavos > max) {
    throw new ErrorApp("MONTO_INVALIDO", `El monto debe ser de $0.01 a $${aPesos(max).toFixed(2)}.`, 400);
  }
  return centavos;
}

function validarConcepto(concepto) {
  const limpio = String(concepto ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!limpio || limpio.length > 40) {
    throw new ErrorApp("CONCEPTO_INVALIDO", "Escribe un concepto de 1 a 40 caracteres.", 400);
  }
  return limpio;
}

export async function POST(request) {
  try {
    const cfg = leerConfig();
    const entrada = await leerJson(request, 10_000);
    if (entrada?.confirmado !== true) {
      throw new ErrorApp("CONFIRMACION_REQUERIDA", "Confirma el cobro antes de generar el QR.", 400);
    }
    const montoCentavos = validarMonto(entrada.monto, cfg.maxMontoMxn);
    const concepto = validarConcepto(entrada.concepto);
    const numRef = String(randomInt(1_000_000, 10_000_000)); // 7 dígitos (pey: 1 a 7, K03.4)
    // El reloj arranca antes de llamar a pey: el vencimiento calculado nunca es más tarde que el real.
    const ahora = Date.now();
    const creadoEn = new Date(ahora).toISOString();
    const expiraEn = new Date(ahora + cfg.expiracionSegundos * 1000).toISOString(); // pey no regresa el vencimiento (K03.4)

    let id, qrString, qrImage;
    if (cfg.modoPago === "simulacion") {
      id = `sim_${randomBytes(8).toString("hex")}`;
      qrString = `SIMULACION|${id}|${aPesos(montoCentavos).toFixed(2)}`;
      qrImage = await imagenQr(qrString);
    } else {
      const qr = await crearQr({ montoCentavos, concepto, numRef, expiracionSegundos: cfg.expiracionSegundos }, cfg);
      id = qr.id;
      qrString = qr.qrString;
      qrImage = normalizarQrImage(qr.qrImageBase64);
      if (!qrImage) {
        try {
          qrImage = await imagenQr(qrString);
        } catch (e) {
          // El QR ya existe en pey: se regresa el cobro y la interfaz puede mostrar el qrString.
          console.error("qr_imagen_error", e?.name || "Error");
          qrImage = null;
        }
      }
    }

    const ticket = firmarTicket(
      { id, montoCentavos, concepto, creadoEn, expiraEn, modoPago: cfg.modoPago },
      cfg.secretoTickets,
    );
    return json(
      {
        cobro: {
          id,
          ticket,
          concepto,
          monto: aPesos(montoCentavos),
          modoPago: cfg.modoPago,
          qrImage,
          qrString,
          numRef,
          creadoEn,
          expiraEn,
        },
      },
      201,
    );
  } catch (e) {
    if (e instanceof PeyError) {
      const codigo = MENSAJES_PEY[e.codigo] ? e.codigo : "PEY_RECHAZO";
      return errorJson(codigo, MENSAJES_PEY[codigo], 502);
    }
    return respuestaDeError(e);
  }
}
