// Tócale · utilidades compartidas entre la Caja y la página del cliente.

const formatoPesos = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const formatoHora = new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

/** $1,234.50 */
export function pesos(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? formatoPesos.format(n) : "—";
}

/** 14:52 a partir de una marca Unix en segundos (o la hora actual). */
export function hora(unixSegundos) {
  const n = Number(unixSegundos);
  const fecha = Number.isFinite(n) && n > 0 ? new Date(n * 1000) : new Date();
  return formatoHora.format(fecha);
}

/** Hora actual en segundos Unix. */
export function ahora() {
  return Math.floor(Date.now() / 1000);
}

export class ErrorApi extends Error {
  constructor(mensaje, { codigo = "ERROR", status = 0 } = {}) {
    super(mensaje);
    this.name = "ErrorApi";
    this.codigo = codigo;
    this.status = status;
  }
}

/**
 * Llama a nuestra propia API (mismo origen). Regresa el JSON o lanza ErrorApi con el
 * mensaje que manda el servidor en {"error":{"codigo","mensaje"}}.
 */
export async function api(ruta, { metodo = "GET", cuerpo, encabezados = {} } = {}) {
  const opciones = {
    method: metodo,
    headers: { Accept: "application/json", ...encabezados },
    cache: "no-store",
  };
  if (cuerpo !== undefined) {
    opciones.headers["Content-Type"] = "application/json";
    opciones.body = JSON.stringify(cuerpo);
  }

  let respuesta;
  try {
    respuesta = await fetch(ruta, opciones);
  } catch {
    throw new ErrorApi("No hay conexión. Revisa tu internet e inténtalo de nuevo.", { codigo: "SIN_CONEXION" });
  }

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    const error = datos && typeof datos === "object" ? datos.error : null;
    throw new ErrorApi(
      (error && error.mensaje) || `El servidor respondió con un error (${respuesta.status}). Inténtalo de nuevo.`,
      { codigo: (error && error.codigo) || "ERROR_HTTP", status: respuesta.status },
    );
  }
  if (datos === null || typeof datos !== "object") {
    throw new ErrorApi("Respuesta inesperada del servidor. Inténtalo de nuevo.", {
      codigo: "RESPUESTA_INVALIDA",
      status: respuesta.status,
    });
  }
  return datos;
}

/** Inserta un SVG que generó nuestro servidor (QR) sin scripts ni atributos on*. */
export function insertarSvg(contenedor, svgTexto, etiqueta) {
  contenedor.replaceChildren();
  if (typeof svgTexto !== "string" || !svgTexto.trim()) return false;
  const documento = new DOMParser().parseFromString(svgTexto, "image/svg+xml");
  const raiz = documento.documentElement;
  if (!raiz || raiz.nodeName.toLowerCase() !== "svg" || documento.querySelector("parsererror")) return false;
  raiz.querySelectorAll("script, foreignObject").forEach((nodo) => nodo.remove());
  for (const elemento of [raiz, ...raiz.querySelectorAll("*")]) {
    for (const atributo of [...elemento.attributes]) {
      if (/^on/i.test(atributo.name) || /^\s*javascript:/i.test(atributo.value)) elemento.removeAttribute(atributo.name);
    }
  }
  const svg = document.importNode(raiz, true);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", etiqueta);
  svg.setAttribute("focusable", "false");
  if (svg.getAttribute("viewBox")) {
    svg.removeAttribute("width");
    svg.removeAttribute("height");
  }
  contenedor.append(svg);
  return true;
}

/** Cambia el texto solo si es distinto, para no repetir anuncios en lectores de pantalla. */
export function ponerTexto(elemento, texto) {
  if (elemento.textContent !== texto) elemento.textContent = texto;
}

export function mostrarMensaje(elemento, texto, tipo = "error") {
  elemento.classList.toggle("ok", tipo === "ok");
  elemento.textContent = texto;
}

export function limpiarMensaje(elemento) {
  elemento.textContent = "";
  elemento.classList.remove("ok");
}

/** Muestra u oculta el aviso de SIMULACIÓN. */
export function mostrarSimulacion(activa) {
  const banner = document.getElementById("banner-simulacion");
  if (banner) banner.hidden = !activa;
}

function almacen(tipo) {
  return {
    leer(clave) {
      try {
        return window[tipo].getItem(clave);
      } catch {
        return null;
      }
    },
    guardar(clave, valor) {
      try {
        window[tipo].setItem(clave, valor);
        return true;
      } catch {
        return false;
      }
    },
    borrar(clave) {
      try {
        window[tipo].removeItem(clave);
      } catch {
        // Sin almacenamiento disponible: no pasa nada.
      }
    },
  };
}

export const almacenLocal = almacen("localStorage");
export const almacenSesion = almacen("sessionStorage");
