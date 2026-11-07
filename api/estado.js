import { crearApp } from "../lib/app.js";

// Consulta a pey si el cobro ya se pagó.
export function GET(request) {
  return crearApp().estado(request);
}
