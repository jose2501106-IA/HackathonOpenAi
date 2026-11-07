import { crearApp } from "../lib/app.js";

// POST: la caja crea un pedido firmado. GET ?o=: el cliente lo consulta.
export function POST(request) {
  return crearApp().crearPedido(request);
}

export function GET(request) {
  return crearApp().verPedido(request);
}
