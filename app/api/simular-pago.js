// POST /api/simular-pago { ticket } → solo en SIMULACIÓN: regresa un ticket nuevo con simPagadoEn (docs/CONTRATO-API.md).
// Nunca marca como pagado un cobro real: el ticket Y el servidor tienen que estar en simulación.
import { leerConfig } from "../lib/config.js";
import { json, respuestaDeError, leerJson, ErrorApp } from "../lib/http.js";
import { firmarTicket, leerTicket } from "../lib/ticket.js";

export async function POST(request) {
  try {
    const cfg = leerConfig();
    const entrada = await leerJson(request, 10_000);
    const datos = leerTicket(entrada?.ticket, cfg.secretoTickets); // 400 TICKET_INVALIDO si lo alteraron
    if (datos.modoPago !== "simulacion" || cfg.modoPago !== "simulacion") {
      throw new ErrorApp("SOLO_SIMULACION", "Este botón solo funciona en SIMULACIÓN. Para un cobro real, paga el QR.", 403);
    }
    const vence = Date.parse(datos.expiraEn);
    if (!datos.simPagadoEn && Number.isFinite(vence) && Date.now() > vence) {
      throw new ErrorApp("COBRO_VENCIDO", "Este cobro ya venció. Genera uno nuevo.", 409);
    }
    const nuevo = { ...datos, simPagadoEn: datos.simPagadoEn || new Date().toISOString() };
    return json({ ticket: firmarTicket(nuevo, cfg.secretoTickets), estado: "pagado" });
  } catch (e) {
    return respuestaDeError(e);
  }
}
