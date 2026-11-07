import { crearApp } from "../lib/app.js";

export function GET(request) {
  return crearApp().menu(request);
}
