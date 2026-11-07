// Utilidades compartidas por la Caja y la Mesa. Dinero siempre en centavos enteros.

const fmtDinero = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const fmtHora = new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", hour: "2-digit", minute: "2-digit" });
const fmtFecha = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" });

export const dinero = (centavos) => fmtDinero.format((Number(centavos) || 0) / 100);
export const horaCDMX = (iso) => (iso ? fmtHora.format(new Date(iso)) : "");
export const hoyCDMX = () => fmtFecha.format(new Date()); // AAAA-MM-DD

export class ErrorApi extends Error {
  constructor(codigo, mensaje, status) {
    super(mensaje);
    this.codigo = codigo;
    this.status = status;
  }
}

// Llama a nuestra API. Regresa el JSON o lanza ErrorApi con el mensaje del servidor tal cual.
export async function api(ruta, { metodo = "GET", cuerpo, headers = {} } = {}) {
  let resp;
  try {
    resp = await fetch(ruta, {
      method: metodo,
      headers: { accept: "application/json", ...(cuerpo !== undefined ? { "content-type": "application/json" } : {}), ...headers },
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ErrorApi("SIN_CONEXION", "No hay conexión. Revisa tu internet e intenta de nuevo.", 0);
  }
  let datos = null;
  try {
    datos = await resp.json();
  } catch {
    datos = null;
  }
  if (!resp.ok) {
    const e = datos?.error;
    throw new ErrorApi(e?.codigo || `HTTP_${resp.status}`, e?.mensaje || "Algo falló. Intenta de nuevo.", resp.status);
  }
  return datos;
}

// Crea un elemento con clase y texto (nunca HTML de datos).
export function el(etiqueta, { clase, texto, attrs } = {}, ...hijos) {
  const n = document.createElement(etiqueta);
  if (clase) n.className = clase;
  if (texto !== undefined && texto !== null) n.textContent = String(texto);
  if (attrs) for (const [k, v] of Object.entries(attrs)) if (v !== undefined && v !== null && v !== false) n.setAttribute(k, v === true ? "" : String(v));
  for (const h of hijos) if (h) n.append(h);
  return n;
}

// Franja de modo, siempre visible. salud: { modo, cobroPrueba, montoPrueba }
export function pintarFranja(contenedor, { modo, cobroPrueba, montoPrueba }) {
  contenedor.replaceChildren();
  contenedor.hidden = false;
  if (modo === "simulacion") {
    contenedor.className = "franja franja-sim";
    contenedor.textContent = "SIMULACIÓN · no se cobra dinero";
  } else if (cobroPrueba) {
    contenedor.className = "franja franja-prueba";
    contenedor.textContent = `MODO PRUEBA · se cobran ${dinero(montoPrueba ?? 10)} reales (no el total)`;
  } else {
    contenedor.className = "franja franja-real";
    contenedor.textContent = "Cobro real con CoDi®";
  }
}

// Lista de totales: Subtotal, Descuento (si > 0), IVA 16 %, Total.
export function pintarTotales(totales, { grande = false } = {}) {
  const dl = el("dl", { clase: `totales${grande ? " totales-grande" : ""}` });
  const fila = (nombre, valor, clase) => {
    const d = el("div", { clase: `totales-fila${clase ? ` ${clase}` : ""}` }, el("dt", { texto: nombre }), el("dd", { texto: valor }));
    dl.append(d);
  };
  fila("Subtotal", dinero(totales.subtotal));
  if (totales.descuento > 0) fila("Descuento", `− ${dinero(totales.descuento)}`, "totales-desc");
  fila("IVA (16 %)", dinero(totales.iva));
  fila("Total", dinero(totales.total), "totales-total");
  return dl;
}

// Unidad legible: pz, g→kg si ≥ 1000, ml→L si ≥ 1000.
export function cantidadLegible(cantidad, unidad) {
  const n = Number(cantidad) || 0;
  const f = (x, dec) => x.toLocaleString("es-MX", { maximumFractionDigits: dec });
  if (unidad === "g" && Math.abs(n) >= 1000) return `${f(n / 1000, 2)} kg`;
  if (unidad === "ml" && Math.abs(n) >= 1000) return `${f(n / 1000, 2)} L`;
  return `${f(n, 0)} ${unidad}`;
}
