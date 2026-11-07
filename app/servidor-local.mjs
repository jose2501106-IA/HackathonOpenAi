// Servidor local para probar "¿Ya cayó?" sin Vercel: `npm run local` (desde app/).
// Imita a Vercel: /api/<nombre> ejecuta app/api/<nombre>.js (export GET/POST con Request → Response)
// y todo lo demás se sirve como archivo estático desde app/.
// Si existe app/.env (ignorado por git), lo carga. Nunca imprime variables ni cuerpos.
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ = fileURLToPath(new URL(".", import.meta.url));
const PUERTO = Number(process.env.PORT) || 3000;

if (existsSync(join(RAIZ, ".env")) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(join(RAIZ, ".env"));
}

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
};

// Carpetas que en Vercel no se sirven como páginas (o no deberían): se bloquean también aquí.
const BLOQUEADAS = new Set(["node_modules", "tests", "lib", "api"]);

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    const partes = [];
    req.on("data", (p) => partes.push(p));
    req.on("end", () => resolve(Buffer.concat(partes)));
    req.on("error", reject);
  });
}

async function enviar(res, respuesta) {
  const encabezados = {};
  respuesta.headers.forEach((valor, clave) => {
    encabezados[clave] = valor;
  });
  res.writeHead(respuesta.status, encabezados);
  res.end(Buffer.from(await respuesta.arrayBuffer()));
}

function jsonError(res, status, codigo, mensaje, extra = {}) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", ...extra });
  res.end(JSON.stringify({ error: { codigo, mensaje } }));
}

async function manejarApi(req, res, url) {
  const nombre = url.pathname.slice("/api/".length).replace(/\/$/, "");
  if (!/^[a-z0-9-]+$/.test(nombre)) {
    return jsonError(res, 404, "NO_ENCONTRADO", "Esa ruta no existe.");
  }
  const archivo = join(RAIZ, "api", `${nombre}.js`);
  if (!existsSync(archivo)) {
    return jsonError(res, 404, "NO_ENCONTRADO", "Esa ruta no existe.");
  }
  const modulo = await import(pathToFileURL(archivo).href);
  const metodo = (req.method || "GET").toUpperCase();
  let manejador = modulo[metodo];
  if (typeof manejador !== "function" && typeof modulo.default?.fetch === "function") {
    manejador = modulo.default.fetch.bind(modulo.default);
  }
  if (typeof manejador !== "function") {
    const permitidos = ["GET", "POST", "PUT", "PATCH", "DELETE"].filter((m) => typeof modulo[m] === "function");
    return jsonError(res, 405, "METODO_NO_PERMITIDO", "Método no permitido.", { allow: permitidos.join(", ") });
  }
  const cuerpo = metodo === "GET" || metodo === "HEAD" ? undefined : await leerCuerpo(req);
  const headers = new Headers();
  for (const [clave, valor] of Object.entries(req.headers)) {
    if (Array.isArray(valor)) valor.forEach((v) => headers.append(clave, v));
    else if (valor !== undefined) headers.set(clave, valor);
  }
  const request = new Request(url.href, { method: metodo, headers, body: cuerpo && cuerpo.length ? cuerpo : undefined });
  const respuesta = await manejador(request);
  await enviar(res, respuesta);
}

async function manejarEstatico(req, res, url) {
  let ruta = decodeURIComponent(url.pathname);
  if (ruta.endsWith("/")) ruta += "index.html";
  const segmentos = ruta.split("/").filter(Boolean);
  if (segmentos.some((s) => s.startsWith(".")) || BLOQUEADAS.has(segmentos[0])) {
    return jsonError(res, 404, "NO_ENCONTRADO", "No encontrado.");
  }
  const archivo = normalize(join(RAIZ, ...segmentos));
  if (!archivo.startsWith(RAIZ.endsWith(sep) ? RAIZ : RAIZ + sep)) {
    return jsonError(res, 404, "NO_ENCONTRADO", "No encontrado.");
  }
  try {
    const info = await stat(archivo);
    if (!info.isFile()) throw new Error("no es archivo");
    const contenido = await readFile(archivo);
    res.writeHead(200, {
      "content-type": TIPOS[extname(archivo).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : contenido);
  } catch {
    jsonError(res, 404, "NO_ENCONTRADO", "No encontrado.");
  }
}

const servidor = createServer(async (req, res) => {
  const inicio = Date.now();
  const url = new URL(req.url || "/", `http://${req.headers.host || `localhost:${PUERTO}`}`);
  try {
    if (url.pathname.startsWith("/api/")) await manejarApi(req, res, url);
    else await manejarEstatico(req, res, url);
  } catch (error) {
    // Solo el tipo de error: nunca cuerpos, llaves ni variables.
    console.error(`[error] ${req.method} ${url.pathname}: ${error?.name || "Error"}`);
    if (!res.headersSent) jsonError(res, 500, "ERROR_INTERNO", "Algo falló de nuestro lado. Intenta de nuevo.");
    else res.end();
  } finally {
    console.log(`${req.method} ${url.pathname} → ${res.statusCode} (${Date.now() - inicio} ms)`);
  }
});

servidor.listen(PUERTO, () => {
  console.log(`¿Ya cayó? en http://localhost:${PUERTO}`);
});
