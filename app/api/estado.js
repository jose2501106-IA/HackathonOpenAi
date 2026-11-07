// GET /api/estado?ticket=… → ¿ya cayó? (docs/CONTRATO-API.md). El servidor confía en el ticket firmado, no en el navegador.
import { leerConfig } from "../lib/config.js";
import { json, respuestaDeError, ErrorApp } from "../lib/http.js";
import { leerTicket } from "../lib/ticket.js";
import { resolverEstado } from "../lib/estado.js";

export async function GET(request) {
  try {
    const cfg = leerConfig();
    const ticket = new URL(request.url).searchParams.get("ticket");
    const datos = leerTicket(ticket, cfg.secretoTickets); // 400 TICKET_INVALIDO si falta o lo alteraron
    if (!datos?.id || !Number.isInteger(datos.montoCentavos) || !datos.modoPago) {
      throw new ErrorApp("TICKET_INVALIDO", "No reconozco este cobro. Genera uno nuevo.", 400);
    }
    return json(await resolverEstado(datos, cfg));
  } catch (e) {
    return respuestaDeError(e);
  }
}
