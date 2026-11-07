// Landing del cliente: se abre desde la etiqueta NFC de la mesa (/mesa?m=<id>&t=<token>).
import { api, dinero, horaCDMX, el, pintarFranja, pintarTotales } from "./comun.js";

const LLAVE_CELULAR = "abanico.celular";
const params = new URLSearchParams(location.search);
const m = params.get("m") || "";
const t = params.get("t") || "";

const principal = document.getElementById("principal");
const franja = document.getElementById("franja");

let estado = { datos: null, errorPago: null, enviando: false, invalida: false };
let temporizador = null;
let cuentaRegresiva = null;
let firmaPintada = "";
let salud = null;
// Lo que la persona escribió (se conserva entre refrescos).
let celular = leerCelularGuardado();
let recordar = Boolean(celular);

function leerCelularGuardado() {
  try {
    return localStorage.getItem(LLAVE_CELULAR) || "";
  } catch {
    return "";
  }
}
function guardarCelular(valor) {
  try {
    if (valor) localStorage.setItem(LLAVE_CELULAR, valor);
    else localStorage.removeItem(LLAVE_CELULAR);
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

async function cargar() {
  clearTimeout(temporizador);
  if (!salud) {
    try {
      salud = await api("/api/salud");
    } catch {
      salud = null;
    }
  }
  try {
    const datos = await api(`/api/mesa?m=${encodeURIComponent(m)}&t=${encodeURIComponent(t)}`);
    // /api/mesa no trae el monto de prueba: lo tomamos de /api/salud.
    estado.datos = { montoPrueba: salud?.montoPrueba ?? 10, ...datos };
    estado.invalida = false;
  } catch (e) {
    if (e.codigo === "MESA_INVALIDA") {
      estado.invalida = true;
      pintar();
      return; // no seguimos consultando
    }
    // Error de red u otro: conservamos lo último y reintentamos.
    estado.errorCarga = e.message;
  }
  pintar();
  const cobrando = estado.datos?.orden?.estado === "cobrando";
  temporizador = setTimeout(cargar, cobrando ? 3000 : 6000);
}

function pintar() {
  if (estado.invalida) {
    franja.hidden = true;
    principal.replaceChildren(el("div", { clase: "aviso aviso-error", texto: "Esta etiqueta no es válida." }));
    return;
  }
  const d = estado.datos;
  if (!d) return;

  pintarFranja(franja, {
    modo: d.modo,
    cobroPrueba: d.cobroPrueba,
    montoPrueba: d.orden?.cobro?.montoCobrado ?? d.montoPrueba ?? 10,
  });
  document.getElementById("negocio").textContent = d.negocio?.nombre || "Tacos El Gran Abanico";
  document.getElementById("mesa-nombre").textContent = `${d.mesa?.nombre || "Mesa"} · Paga tu cuenta con CoDi®`;

  // Evita repintar (y perder el foco del campo) si nada cambió.
  const o = d.orden;
  const firma = JSON.stringify([o?.id, o?.estado, o?.actualizadaEn, o?.totales?.total, o?.aviso?.mensaje, estado.errorPago, estado.enviando, d.modo]);
  if (firma === firmaPintada) return;
  firmaPintada = firma;

  clearInterval(cuentaRegresiva);
  const nodos = [];

  if (!o) {
    nodos.push(el("p", { clase: "vacio", texto: "Esta mesa todavía no tiene una orden. Pide al taquero que la capture." }));
    principal.replaceChildren(...nodos);
    return;
  }

  if (o.estado === "pagada") {
    nodos.push(
      el("section", { clase: "pagado", attrs: { role: "status" } },
        el("div", { clase: "icono", texto: "✓", attrs: { "aria-hidden": "true" } }),
        el("h2", { texto: "¡Pago aprobado!" }),
        el("p", { clase: "monto", texto: dinero(o.totales.total) }),
        o.cobro && o.cobro.montoCobrado !== o.totales.total
          ? el("p", { texto: `Se cobraron ${dinero(o.cobro.montoCobrado)} (MODO PRUEBA)` })
          : null,
        el("p", { texto: o.pagadaEn ? `Pagado a las ${horaCDMX(o.pagadaEn)}` : "" }),
        d.modo === "simulacion" ? el("p", { texto: "SIMULACIÓN: no se cobró dinero." }) : null,
        el("p", { texto: "¡Gracias por tu visita!" }),
      ),
    );
    nodos.push(cuenta(o));
    principal.replaceChildren(...nodos);
    return;
  }

  nodos.push(cuenta(o));

  if (o.estado === "cobrando") {
    nodos.push(esperando(o, d));
  } else {
    // abierta: avisos y formulario de pago
    if (o.aviso?.mensaje) nodos.push(el("div", { clase: "aviso aviso-error", attrs: { role: "alert" }, texto: o.aviso.mensaje }));
    if (estado.errorPago) nodos.push(el("div", { clase: "aviso aviso-error", attrs: { role: "alert" }, texto: estado.errorPago }));
    nodos.push(formulario(o, d));
  }
  principal.replaceChildren(...nodos);
}

function cuenta(o) {
  const lista = el("ul", { clase: "renglones" });
  for (const r of o.renglones || []) {
    const detalle = `${r.cantidad} × ${dinero(r.precioUnitario)}`;
    const info = el("div", { clase: "renglon-info" },
      el("div", { clase: "renglon-nombre", texto: `${r.cantidad} × ${r.nombre}` }),
      el("div", { clase: "renglon-detalle", texto: detalle }),
      r.descuentoPct > 0 ? el("span", { clase: "promo", texto: `−${r.descuentoPct} % · −${dinero(r.descuento)}` }) : null,
    );
    const importe = el("div", { clase: "renglon-importe" });
    if (r.descuento > 0) importe.append(el("s", { texto: dinero(r.importeBruto) }));
    importe.append(document.createTextNode(dinero(r.importe)));
    lista.append(el("li", { clase: "renglon" }, info, importe));
  }
  const sec = el("section", { clase: "tarjeta", attrs: { "aria-labelledby": "titulo-cuenta" } },
    el("h2", { texto: "Tu cuenta", attrs: { id: "titulo-cuenta" } }),
    lista,
  );
  if (o.descuentoOrdenPct > 0) sec.append(el("p", { clase: "nota", texto: `Incluye ${o.descuentoOrdenPct} % de descuento a la orden.` }));
  sec.append(pintarTotales(o.totales, { grande: true }));
  return sec;
}

function montoACobrar(o, d) {
  if (d.modo === "real" && d.cobroPrueba) return Math.min(o.totales.total, d.montoPrueba ?? 10);
  return o.totales.total;
}

function formulario(o, d) {
  const form = el("form", { clase: "tarjeta", attrs: { novalidate: true } });
  const vacia = !o.renglones?.length || o.totales.total <= 0;

  const lbl = el("label", { texto: "Tu número de celular (10 dígitos)", attrs: { for: "celular" } });
  const input = el("input", {
    attrs: {
      id: "celular", type: "tel", inputmode: "numeric", autocomplete: "tel", maxlength: "10",
      pattern: "[0-9]{10}", required: true, "aria-describedby": "ayuda-celular",
    },
  });
  input.value = celular;
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 10);
    celular = input.value;
    errCel.textContent = "";
    input.removeAttribute("aria-invalid");
  });
  const errCel = el("p", { clase: "nota", attrs: { id: "error-celular", "aria-live": "polite" } });
  errCel.style.color = "var(--error)";

  const chk = el("input", { attrs: { id: "recordar", type: "checkbox" } });
  chk.checked = recordar;
  chk.addEventListener("change", () => {
    recordar = chk.checked;
    if (!recordar) guardarCelular("");
  });
  const casilla = el("label", { clase: "casilla", attrs: { for: "recordar" } }, chk, document.createTextNode("Recordar mi número en este celular"));

  const ayuda = el("p", {
    clase: "nota",
    attrs: { id: "ayuda-celular" },
    texto: "Usamos tu número para mandarte la solicitud de pago CoDi® a la app de tu banco. Si lo recuerdas, también para tu historial con el negocio. Necesitas tener CoDi activado en tu banco.",
  });

  const monto = montoACobrar(o, d);
  const textoBoton = estado.enviando ? "Enviando solicitud…" : `Pagar ${dinero(monto)}`;
  const boton = el("button", { clase: "boton-grande", texto: textoBoton, attrs: { type: "submit" } });
  if (estado.enviando || vacia) boton.disabled = true;

  const nodos = [lbl, input, errCel, casilla, ayuda];
  if (d.modo === "real" && d.cobroPrueba && monto !== o.totales.total) {
    nodos.push(el("p", { clase: "aviso aviso-info", texto: `MODO PRUEBA: se cobrarán ${dinero(monto)} reales en lugar de ${dinero(o.totales.total)}.` }));
  }
  if (d.modo === "simulacion") nodos.push(el("p", { clase: "nota", texto: "SIMULACIÓN: no se manda nada a tu banco." }));
  nodos.push(boton);
  form.append(...nodos);

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (estado.enviando) return;
    if (!/^[0-9]{10}$/.test(input.value)) {
      errCel.textContent = "Escribe los 10 dígitos de tu celular.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    celular = input.value;
    estado.enviando = true;
    estado.errorPago = null;
    pintar();
    try {
      const r = await api("/api/pagar", { metodo: "POST", cuerpo: { m, t, telefono: celular, recordar } });
      guardarCelular(recordar ? celular : "");
      if (r?.orden) estado.datos = { ...estado.datos, orden: r.orden };
    } catch (e) {
      estado.errorPago = e.message;
    } finally {
      estado.enviando = false;
      firmaPintada = "";
      pintar();
      clearTimeout(temporizador);
      temporizador = setTimeout(cargar, 3000);
    }
  });
  return form;
}

function esperando(o, d) {
  const cuentaEl = el("p", { clase: "cuenta", attrs: { "aria-live": "off" } });
  const sec = el("section", { clase: "tarjeta esperando", attrs: { role: "status" } },
    el("div", { clase: "giro", attrs: { "aria-hidden": "true" } }),
    el("h2", { texto: "Abre la app de tu banco y autoriza el cobro CoDi®" }),
    el("p", { texto: `Te mandamos una solicitud de ${dinero(o.cobro?.montoCobrado ?? o.totales.total)} al celular ${o.cobro?.telefonoOculto || ""}.` }),
    cuentaEl,
    el("p", { clase: "nota", texto: "Esta pantalla se actualiza sola cuando el banco confirme el pago." }),
  );
  if (o.cobro?.modoPrueba && o.cobro.montoCobrado !== o.totales.total) {
    sec.append(el("p", { clase: "aviso aviso-info", texto: `MODO PRUEBA: se cobran ${dinero(o.cobro.montoCobrado)} reales, no el total.` }));
  }
  if (d.modo === "simulacion") {
    const b = el("button", { clase: "boton-grande boton-sim", texto: "Simular pago (SIMULACIÓN)", attrs: { type: "button" } });
    b.addEventListener("click", async () => {
      b.disabled = true;
      try {
        const r = await api("/api/simular-pago", { metodo: "POST", cuerpo: { m, t } });
        if (r?.orden) estado.datos = { ...estado.datos, orden: r.orden };
        firmaPintada = "";
        pintar();
      } catch (e) {
        b.disabled = false;
        sec.append(el("div", { clase: "aviso aviso-error", attrs: { role: "alert" }, texto: e.message }));
      }
    });
    sec.append(b);
  }
  const fin = o.cobro?.expiraEn ? Date.parse(o.cobro.expiraEn) : NaN;
  const tic = () => {
    if (!Number.isFinite(fin)) return (cuentaEl.textContent = "");
    const s = Math.max(0, Math.round((fin - Date.now()) / 1000));
    cuentaEl.textContent = s > 0 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "Revisando con el banco…";
  };
  tic();
  cuentaRegresiva = setInterval(tic, 1000);
  return sec;
}

if (!m || !t) {
  estado.invalida = true;
  pintar();
} else {
  cargar();
}
