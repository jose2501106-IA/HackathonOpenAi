import { crearApp } from "../lib/app.js";

// El cajero dicta o escribe el pedido; la IA lo convierte en productos del menú.
export function POST(request) {
  return crearApp().interpretar(request);
}
