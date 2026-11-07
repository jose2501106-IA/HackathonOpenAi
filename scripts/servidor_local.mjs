// Servidor local para probar sin Vercel: sirve public/ (con URLs limpias) y manda /api/<nombre> a api/<nombre>.js.
// Uso: npm run dev  (PORT=3000 por defecto). Sin PEY_API_KEY corre en SIMULACIÓN.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PORT = Number(process.env.PORT || 3000);
const RAIZ = path.resolve("public");
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

async function leerCuerpo(req) {
  const partes = [];
  for await (const parte of req) partes.push(parte);
  return Buffer.concat(partes);
}

async function existeArchivo(ruta) {
  try {
    return (await stat(ruta)).isFile();
  } catch {
    return false;
  }
}

async function api(req, res, url) {
  const nombre = url.pathname.slice(5).replace(/\/$/, "");
  if (!/^[a-z0-9-]+$/.test(nombre)) return enviar(res, 404, "No existe");
  let modulo;
  try {
    modulo = await import(pathToFileURL(path.resolve("api", `${nombre}.js`)).href);
  } catch (e) {
    if (e?.code === "ERR_MODULE_NOT_FOUND") return enviar(res, 404, "No existe");
    throw e;
  }
  const manejador = modulo[req.method];
  if (typeof manejador !== "function") return enviar(res, 405, "Método no permitido");
  const headers = Object.fromEntries(Object.entries(req.headers).filter(([, v]) => typeof v === "string"));
  const cuerpo = ["GET", "HEAD"].includes(req.method) ? undefined : await leerCuerpo(req);
  const respuesta = await manejador(new Request(url, { method: req.method, headers, body: cuerpo }));
  res.writeHead(respuesta.status, Object.fromEntries(respuesta.headers));
  res.end(Buffer.from(await respuesta.arrayBuffer()));
}

function enviar(res, status, texto) {
  res.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
  res.end(texto);
}

async function estatico(res, url) {
  let ruta = decodeURIComponent(url.pathname);
  if (ruta.endsWith("/")) ruta += "index.html";
  let archivo = path.join(RAIZ, ruta);
  if (!archivo.startsWith(RAIZ)) return enviar(res, 403, "Prohibido");
  if (!(await existeArchivo(archivo)) && !path.extname(archivo)) archivo += ".html";
  if (!(await existeArchivo(archivo))) return enviar(res, 404, "No existe");
  res.writeHead(200, {
    "content-type": TIPOS[path.extname(archivo)] || "application/octet-stream",
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
  });
  res.end(await readFile(archivo));
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);
    try {
      if (url.pathname.startsWith("/api/")) await api(req, res, url);
      else await estatico(res, url);
    } catch (e) {
      console.error("Error del servidor local:", e?.message);
      if (!res.headersSent) enviar(res, 500, "Error del servidor local");
    }
  })
  .listen(PORT, () => {
    const modo = process.env.PEY_API_KEY && process.env.MODO_SIMULACION !== "1" ? (process.env.COBRO_PRUEBA === "0" ? "REAL" : "MODO PRUEBA (cobra MONTO_PRUEBA_MXN real)") : "SIMULACIÓN";
    console.log(`Tacos El Gran Abanico · POS en http://localhost:${PORT} · modo ${modo}`);
  });
