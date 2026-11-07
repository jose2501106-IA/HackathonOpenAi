// GET /api/salud → estado público de la app (sin secretos). Lo usa la interfaz para mostrar el modo de pago.
import { leerConfig, configPublica } from "../lib/config.js";
import { json } from "../lib/http.js";

export async function GET() {
  return json({ ok: true, ...configPublica(leerConfig()), version: "0.1.0" });
}
