// Utilidades de prueba: fetch simulado (ninguna prueba llama servicios reales) y peticiones.
export const ORIGEN = "https://tocale.test";

export function fetchFalso(rutas = {}) {
  const llamadas = [];
  const f = async (url, opciones = {}) => {
    const metodo = opciones.method || "GET";
    llamadas.push({
      url: String(url),
      metodo,
      headers: opciones.headers || {},
      cuerpo: opciones.body ? JSON.parse(opciones.body) : null,
    });
    const clave = `${metodo} ${new URL(url).pathname}`;
    const r = rutas[clave];
    if (r === "red") throw new TypeError("fetch failed");
    if (!r) return new Response(JSON.stringify({ error: { type: "NOT_FOUND" } }), { status: 404 });
    const { status = 200, cuerpo } = typeof r === "function" ? r(opciones) : r;
    return new Response(JSON.stringify(cuerpo), { status, headers: { "content-type": "application/json" } });
  };
  f.llamadas = llamadas;
  return f;
}

export function pedir(ruta, { metodo = "GET", cuerpo, headers = {} } = {}) {
  return new Request(`${ORIGEN}${ruta}`, {
    method: metodo,
    headers: { "content-type": "application/json", ...headers },
    body: cuerpo === undefined ? undefined : typeof cuerpo === "string" ? cuerpo : JSON.stringify(cuerpo),
  });
}

export async function leer(respuesta) {
  return { status: respuesta.status, datos: await respuesta.json() };
}

export function reloj(inicioMs = 1_794_000_000_000) {
  let t = inicioMs;
  const ahora = () => t;
  ahora.avanzar = (ms) => {
    t += ms;
  };
  return ahora;
}
