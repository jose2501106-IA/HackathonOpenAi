import { crearApp } from "../lib/app.js";

// Crea el cobro CoDi en pey: notificación push al celular del cliente o QR de respaldo.
export function POST(request) {
  return crearApp().crearCobro(request);
}
