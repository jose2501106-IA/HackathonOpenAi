import { crearApp } from "../lib/app.js";

// pey avisa aquí cuando entra un pago (firma Standard Webhooks verificada).
export function POST(request) {
  return crearApp().webhook(request);
}
