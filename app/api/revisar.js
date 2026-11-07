// POST /api/revisar — revisar una captura de "ya te transferí". Contrato: docs/CONTRATO-API.md.
// Entrada { imagenBase64, mime, ticket | null, montoManual | null } → 200 { leido, origen, veredicto, pago }.
// La IA solo lee; el veredicto lo decide código con pey (coincidencias.js). No se guarda ni se registra la imagen.
import { leerConfig } from "../lib/config.js";
import { ErrorApp, aCentavos, aPesos, json, leerJson, respuestaDeError } from "../lib/http.js";
import { leerTicket } from "../lib/ticket.js";
import { extraerCaptura, validarImagen } from "../lib/extractor.js";
import { fechaCdmx, revisarCaptura } from "../lib/coincidencias.js";

// 1.5 MB de imagen en base64 ≈ 2.1 M caracteres; el resto es margen para el JSON.
const MAX_CUERPO = 2_200_000;
const MAX_MONTO_MANUAL_CENTAVOS = 100_000_000; // $1,000,000: solo para descartar valores absurdos

const errorGrande = () => new ErrorApp("IMAGEN_GRANDE", "La imagen pesa más de 1.5 MB. Recórtala o toma otra captura.", 413);

async function leerCuerpo(request) {
  const largo = Number(request.headers.get("content-length"));
  if (Number.isFinite(largo) && largo > MAX_CUERPO) throw errorGrande();
  try {
    return await leerJson(request, MAX_CUERPO);
  } catch (e) {
    if (e instanceof ErrorApp && e.status === 413) throw errorGrande();
    throw e;
  }
}

// Lectura de EJEMPLO (la captura ficticia de K07.3) para SIMULACIÓN sin llave de OpenAI. Va con origen "simulacion".
function lecturaDeEjemplo(ahora = Date.now()) {
  return { es_comprobante: true, monto: 1, fecha: fechaCdmx(ahora), hora: "13:58", clave_rastreo: "EJEMPLO123", legible: true };
}

function leerMontoManual(valor) {
  if (valor == null || valor === "") return null;
  const centavos = aCentavos(typeof valor === "string" ? valor.replace(/[$\s,]/g, "") : valor);
  if (!Number.isFinite(centavos) || centavos < 1 || centavos > MAX_MONTO_MANUAL_CENTAVOS) {
    throw new ErrorApp("MONTO_INVALIDO", "Escribe un monto válido, por ejemplo 1 o 15.50.", 400);
  }
  return aPesos(centavos);
}

export async function POST(request) {
  try {
    const cfg = leerConfig();
    const cuerpo = await leerCuerpo(request);
    const ticketDatos = cuerpo?.ticket ? leerTicket(cuerpo.ticket, cfg.secretoTickets) : null;
    const montoManual = leerMontoManual(cuerpo?.montoManual);

    let leido;
    let origen;
    if (montoManual != null) {
      leido = { es_comprobante: true, monto: montoManual, fecha: null, hora: null, clave_rastreo: null, legible: true };
      origen = "manual";
    } else {
      validarImagen(cuerpo?.imagenBase64, cuerpo?.mime); // 413 / 400 antes de gastar en la IA
      if (cfg.tieneOpenAI) {
        leido = await extraerCaptura({ imagenBase64: cuerpo.imagenBase64, mime: cuerpo.mime }, cfg);
        origen = "openai";
      } else if (cfg.modoPago === "simulacion") {
        leido = lecturaDeEjemplo();
        origen = "simulacion";
      } else {
        throw new ErrorApp("IA_NO_DISPONIBLE", "La IA no está disponible. Escribe el monto a mano.", 503);
      }
    }

    const { veredicto, pago } = await revisarCaptura({ leido, ticketDatos }, cfg);
    return json({ leido, origen, veredicto, pago });
  } catch (e) {
    return respuestaDeError(e);
  }
}
