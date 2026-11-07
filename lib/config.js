// Configuración desde variables de entorno (nombres en .env.example).
// Nunca regresa llaves hacia el navegador ni las escribe en logs.
import crypto from "node:crypto";
import { NEGOCIO } from "./menu.js";

const TOPE_ABSOLUTO_MXN = 1000; // nadie puede subir el máximo por encima de esto sin cambiar código
const MODELO_POR_DEFECTO = "gpt-6-luna"; // developers.openai.com/api/docs/models, consultado 2026-11-07

export function leerConfig(env = process.env) {
  const peyKey = (env.PEY_API_KEY || "").trim();
  const openaiKey = (env.OPENAI_API_KEY || "").trim();
  const modo = peyKey && env.MODO_SIMULACION !== "1" ? "real" : "simulacion";

  const pedido = Number.parseFloat(env.MONTO_MAXIMO_MXN ?? "1");
  const montoMaximo = Number.isFinite(pedido) && pedido > 0 ? Math.min(Math.round(pedido * 100) / 100, TOPE_ABSOLUTO_MXN) : 1;

  // Llave para firmar pedidos: FIRMA_SECRETO o, si falta, derivada de la llave de pey.
  // En SIMULACIÓN sin llaves se usa una fija: ahí no se cobra dinero real.
  const base = (env.FIRMA_SECRETO || "").trim() || (peyKey ? `pey:${peyKey}` : "simulacion-sin-secreto");
  const llaveFirma = crypto.createHash("sha256").update(`tocale-pedidos|${base}`).digest();

  return {
    modo,
    simulacion: modo === "simulacion",
    peyKey,
    openaiKey,
    ia: Boolean(openaiKey),
    openaiModelo: (env.OPENAI_MODEL || "").trim() || MODELO_POR_DEFECTO,
    montoMaximo,
    cajaPin: (env.CAJA_PIN || "").trim(),
    webhookSecreto: (env.PEY_WEBHOOK_SECRET || "").trim(),
    llaveFirma,
    negocio: NEGOCIO,
  };
}
