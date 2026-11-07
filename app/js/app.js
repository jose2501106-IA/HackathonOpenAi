// ¿Ya cayó? · flujo de la caja: Pedido → propuesta → QR → ¡Ya cayó! (+ "Revisar una captura").
// Contrato de la API: docs/CONTRATO-API.md. Todos los textos: js/textos.js.

import {
  T,
  aplicarTextos,
  formatearMonto,
  formatearHora,
  formatearCuenta,
  leerMonto,
  validarMonto,
  mensajeError,
} from "./textos.js";
import { api } from "./api.js";
import { crearSeguimiento, cargarVoces, prepararVoz, anunciarPago, vibrarPago } from "./estado-pago.js";

const CLAVE_COBRO = "yaCayo.cobroActivo";
const MODOS = ["simulacion", "prueba", "comercio"];
const $ = (id) => document.getElementById(id);

const app = {
  modoPago: null, // de /api/salud o de la última respuesta con modoPago
  maxMontoMxn: 20,
  iaDisponible: null,
  cobro: null, // objeto "cobro" del contrato + desfaseMs (+ pagado)
  ultimoTexto: "",
  ocupado: false,
  mensajeManualHasta: 0,
};

let relojCuenta = null;

const seguimiento = crearSeguimiento({
  consultar: (ticket) => api.estado(ticket),
  alEstado: manejarEstado,
  alError: manejarErrorEstado,
});

// ---------------- Utilidades de interfaz ----------------
function textoDe(error) {
  return error?.message || mensajeError(error?.codigo);
}

function mostrarError(id, texto) {
  const el = $(id);
  if (!el) return;
  el.textContent = texto;
  el.hidden = !texto;
}

function ocultarError(id) {
  mostrarError(id, "");
}

// Botón "ocupado": no se deshabilita (para no perder el foco); se marca con aria-disabled y se ignoran clics.
function ponerOcupado(boton, activo, texto) {
  if (!boton) return;
  if (activo) {
    if (boton.dataset.original === undefined) boton.dataset.original = boton.innerHTML;
    boton.innerHTML = '<span class="girando" aria-hidden="true"></span><span></span>';
    boton.lastElementChild.textContent = texto;
    boton.setAttribute("aria-disabled", "true");
    boton.setAttribute("aria-busy", "true");
  } else {
    if (boton.dataset.original !== undefined) {
      boton.innerHTML = boton.dataset.original;
      delete boton.dataset.original;
    }
    boton.removeAttribute("aria-disabled");
    boton.removeAttribute("aria-busy");
  }
}

const estaOcupado = (boton) => boton?.getAttribute("aria-disabled") === "true";

function mostrarVista(nombre, { enfocar = true } = {}) {
  for (const v of ["pedido", "qr", "pagado"]) $(`vista-${v}`).hidden = v !== nombre;
  document.body.dataset.vista = nombre;
  if (enfocar) {
    window.scrollTo({ top: 0 });
    $(`titulo-${nombre}`)?.focus({ preventScroll: true });
  }
}

// ---------------- Modo de pago (insignia siempre visible) ----------------
function ponerModo(modo, { sinConexion = false } = {}) {
  if (MODOS.includes(modo)) app.modoPago = modo;
  const m = app.modoPago;
  const clase = m || (sinConexion ? "sin-conexion" : "cargando");
  $("insignia-modo").className = `insignia insignia--${clase}`;
  $("insignia-texto").textContent = m ? T.modo[m] : sinConexion ? T.modo.sinConexion : T.modo.cargando;
  document.body.dataset.modo = clase;

  const banner = $("banner-modo");
  const texto = T.modo.banner[clase] || "";
  banner.textContent = texto;
  banner.className = `banner banner--${clase}`;
  banner.hidden = !texto;
}

async function cargarSalud() {
  try {
    const s = await api.salud();
    const max = Number(s.maxMontoMxn);
    app.maxMontoMxn = Number.isFinite(max) && max > 0 ? max : 20;
    app.iaDisponible = Boolean(s.openai);
    ponerModo(s.modoPago);
    if (!$("form-propuesta").hidden) validarPropuesta();
  } catch {
    if (!app.modoPago) ponerModo(null, { sinConexion: true });
    setTimeout(cargarSalud, 10000);
  }
}

// ---------------- Guardar el cobro activo (sobrevive a recargas) ----------------
function guardarCobro() {
  try {
    if (app.cobro) sessionStorage.setItem(CLAVE_COBRO, JSON.stringify(app.cobro));
    else sessionStorage.removeItem(CLAVE_COBRO);
  } catch {
    /* almacenamiento no disponible: se sigue sin guardar */
  }
}

function leerCobroGuardado() {
  try {
    const crudo = sessionStorage.getItem(CLAVE_COBRO);
    const c = crudo ? JSON.parse(crudo) : null;
    return c && typeof c.ticket === "string" ? c : null;
  } catch {
    return null;
  }
}

// ---------------- Vista 1 · Pedido ----------------
function bloquearPedido(activo) {
  app.ocupado = activo;
  document.querySelectorAll(".chip").forEach((chip) => {
    if (activo) chip.setAttribute("aria-disabled", "true");
    else chip.removeAttribute("aria-disabled");
  });
  ponerOcupado($("btn-entender"), activo, T.pedido.enviando);
}

async function enviarPedido(textoCrudo) {
  if (app.ocupado) return;
  const texto = String(textoCrudo ?? "").trim();
  const campo = $("campo-pedido");
  if (!texto) {
    campo.setAttribute("aria-invalid", "true");
    mostrarError("error-pedido", T.pedido.textoVacio);
    campo.focus();
    return;
  }
  if (texto.length > 300) {
    campo.setAttribute("aria-invalid", "true");
    mostrarError("error-pedido", T.pedido.textoLargo);
    return;
  }
  campo.removeAttribute("aria-invalid");
  ocultarError("error-pedido");
  bloquearPedido(true);
  try {
    const r = await api.agente(texto);
    app.ultimoTexto = texto;
    mostrarPropuesta(r, texto);
  } catch (e) {
    mostrarError("error-pedido", textoDe(e));
  } finally {
    bloquearPedido(false);
  }
}

function mostrarPropuesta(respuesta, texto) {
  const p = respuesta && typeof respuesta.propuesta === "object" ? respuesta.propuesta : null;
  const origen = respuesta?.origen;

  const etiqueta = $("propuesta-origen");
  etiqueta.textContent = T.propuesta.origen[origen] || "";
  etiqueta.hidden = !etiqueta.textContent;

  const pediste = $("propuesta-pediste");
  pediste.textContent = texto ? T.propuesta.pediste(texto) : "";
  pediste.hidden = !texto;

  const resp = $("propuesta-respuesta");
  resp.textContent = respuesta?.respuesta || (p ? "" : texto ? T.propuesta.sinPropuesta : T.propuesta.manual);
  resp.hidden = !resp.textContent;

  const lista = $("propuesta-detalle");
  lista.replaceChildren();
  const detalle = Array.isArray(p?.detalle) ? p.detalle : [];
  for (const d of detalle) {
    const li = document.createElement("li");
    const nombre = document.createElement("span");
    const cantidad = Number(d?.cantidad);
    nombre.textContent = `${Number.isFinite(cantidad) ? cantidad : 1} × ${d?.nombre ?? ""}`;
    const sub = document.createElement("span");
    sub.textContent = formatearMonto(d?.subtotal);
    li.append(nombre, sub);
    lista.append(li);
  }
  $("propuesta-detalle-caja").hidden = detalle.length === 0;

  $("campo-concepto").value = String(p?.concepto || (texto || !p ? T.propuesta.conceptoPorDefecto : "")).slice(0, 40);
  const monto = Number(p?.monto);
  $("campo-monto").value = p && Number.isFinite(monto) ? monto.toFixed(2) : "";
  ocultarError("error-propuesta");

  $("form-pedido").hidden = true;
  $("form-propuesta").hidden = false;
  validarPropuesta();

  if (!$("campo-monto").value) $("campo-monto").focus();
  else $("titulo-propuesta").focus({ preventScroll: true });
  $("form-propuesta").scrollIntoView({ block: "start", behavior: "smooth" });
}

function validarPropuesta() {
  const campoConcepto = $("campo-concepto");
  const campoMonto = $("campo-monto");
  const concepto = campoConcepto.value.trim();
  const monto = leerMonto(campoMonto.value);
  const errMonto = validarMonto(monto, app.maxMontoMxn);
  const errConcepto = !concepto ? "vacio" : concepto.length > 40 ? "largo" : null;

  const ayudaMonto = $("ayuda-monto");
  const mostrarErrMonto = errMonto === "tope" || (errMonto === "invalido" && campoMonto.value.trim() !== "");
  ayudaMonto.textContent =
    errMonto === "tope"
      ? T.propuesta.excedeTope(app.maxMontoMxn)
      : mostrarErrMonto
        ? T.propuesta.montoInvalido
        : T.propuesta.tope(app.maxMontoMxn);
  ayudaMonto.classList.toggle("ayuda--error", mostrarErrMonto);
  if (mostrarErrMonto) campoMonto.setAttribute("aria-invalid", "true");
  else campoMonto.removeAttribute("aria-invalid");

  const ayudaConcepto = $("ayuda-concepto");
  ayudaConcepto.textContent =
    errConcepto === "vacio" ? T.propuesta.conceptoVacio : errConcepto === "largo" ? T.propuesta.conceptoLargo : T.propuesta.conceptoAyuda;
  ayudaConcepto.classList.toggle("ayuda--error", Boolean(errConcepto));
  if (errConcepto) campoConcepto.setAttribute("aria-invalid", "true");
  else campoConcepto.removeAttribute("aria-invalid");

  const valido = !errMonto && !errConcepto;
  $("btn-confirmar").disabled = !valido;
  return valido ? { concepto, monto } : null;
}

function volverAlPedido({ limpiar = false } = {}) {
  $("form-propuesta").hidden = true;
  $("form-pedido").hidden = false;
  ocultarError("error-propuesta");
  ocultarError("error-pedido");
  if (limpiar) $("campo-pedido").value = "";
  mostrarVista("pedido", { enfocar: false });
  $("titulo-pedido").focus({ preventScroll: true });
}

async function confirmarCobro(ev) {
  ev.preventDefault();
  const boton = $("btn-confirmar");
  if (estaOcupado(boton)) return;
  const datos = validarPropuesta();
  if (!datos) return;
  prepararVoz(); // gesto de la persona: desbloquea la voz en iOS para el "¡Ya cayó!"
  ocultarError("error-propuesta");
  ponerOcupado(boton, true, T.propuesta.generando);
  try {
    const r = await api.crearCobro({ concepto: datos.concepto, monto: datos.monto, confirmado: true });
    const cobro = r?.cobro;
    if (!cobro || typeof cobro.ticket !== "string") throw new Error(mensajeError("RESPUESTA_INVALIDA"));
    const creado = Date.parse(cobro.creadoEn);
    activarCobro({ ...cobro, desfaseMs: Number.isFinite(creado) ? Date.now() - creado : 0 });
  } catch (e) {
    mostrarError("error-propuesta", textoDe(e));
  } finally {
    ponerOcupado(boton, false);
    validarPropuesta();
  }
}

// ---------------- Vista 2 · QR ----------------
function activarCobro(cobro, { reanudar = false } = {}) {
  app.cobro = cobro;
  app.mensajeManualHasta = 0;
  guardarCobro();
  ponerModo(cobro.modoPago);
  pintarQr(cobro);
  mostrarVista("qr", { enfocar: !reanudar });
  iniciarCuenta();
  seguimiento.iniciar(cobro.ticket);
}

function pintarQr(cobro) {
  const monto = Number(cobro.monto);
  const sim = cobro.modoPago === "simulacion";
  $("qr-concepto").textContent = cobro.concepto || "";
  $("qr-monto").textContent = formatearMonto(monto);
  const img = $("qr-imagen");
  const hayImagen = typeof cobro.qrImage === "string" && cobro.qrImage.startsWith("data:image/");
  if (hayImagen) img.src = cobro.qrImage;
  else img.removeAttribute("src");
  img.alt = T.qr.alt(monto, cobro.concepto || "");
  img.parentElement.hidden = !hayImagen;
  $("qr-sin-imagen").hidden = hayImagen;
  $("qr-sello").hidden = !sim;
  $("qr-ref").textContent = cobro.numRef ? T.qr.ref(cobro.numRef) : "";
  $("qr-figura").classList.remove("qr__figura--vencido");
  $("qr-vencido").hidden = true;
  $("btn-simular").hidden = !sim;
  $("btn-otro").textContent = T.qr.otro;
  ocultarError("error-qr");
  pintarEstado("esperando", T.estado.esperando);
}

function pintarEstado(tipo, texto) {
  const caja = $("qr-estado");
  const clase = `estado-pago estado-pago--${tipo}`;
  if (caja.className !== clase) caja.className = clase;
  const span = $("qr-estado-texto");
  if (span.textContent !== texto) span.textContent = texto; // sin cambios no se vuelve a anunciar
}

function iniciarCuenta() {
  detenerCuenta();
  const tic = () => {
    const c = app.cobro;
    if (!c) return detenerCuenta();
    const fin = Date.parse(c.expiraEn);
    const inicio = Date.parse(c.creadoEn);
    if (!Number.isFinite(fin)) {
      $("qr-vence").textContent = "";
      return;
    }
    const resta = fin - (Date.now() - (c.desfaseMs || 0));
    const total = Number.isFinite(inicio) && fin > inicio ? fin - inicio : 600000;
    $("qr-barra").style.width = `${Math.max(0, Math.min(1, resta / total)) * 100}%`;
    if (resta <= 0) {
      detenerCuenta();
      $("qr-vence").textContent = T.qr.vencioRevisando;
      seguimiento.consultarAhora({ manual: false }); // pey decide: un pago tardío gana
      return;
    }
    $("qr-vence").textContent = T.qr.venceEn(formatearCuenta(resta));
  };
  tic();
  relojCuenta = setInterval(tic, 1000);
}

function detenerCuenta() {
  clearInterval(relojCuenta);
  relojCuenta = null;
}

function manejarEstado(e, { manual = false } = {}) {
  if (!app.cobro || !e || app.cobro.pagado) return;
  if (e.modoPago) ponerModo(e.modoPago);
  switch (e.estado) {
    case "pagado":
      mostrarPagado(e);
      return;
    case "expirado":
      marcarVencido();
      return;
    case "no_verificable":
      pintarEstado("gris", T.estado.avisos[e.aviso] || T.estado.noVerificable);
      return;
    default: {
      if (e.aviso === "pago_con_monto_distinto") {
        pintarEstado("ambar", T.estado.avisos.pago_con_monto_distinto);
        return;
      }
      if (manual) {
        app.mensajeManualHasta = Date.now() + 5000;
        pintarEstado("ambar", T.estado.todaviaNo);
        return;
      }
      if (Date.now() < app.mensajeManualHasta) return; // deja leer "Todavía no cae" unos segundos
      pintarEstado("esperando", T.estado.esperando);
    }
  }
}

function manejarErrorEstado(err, { manual = false } = {}) {
  if (!app.cobro || app.cobro.pagado) return;
  if (err?.codigo === "TICKET_INVALIDO") {
    detenerCuenta();
    pintarEstado("gris", textoDe(err));
    return;
  }
  pintarEstado("gris", manual ? textoDe(err) : T.estado.reintentando);
}

function marcarVencido() {
  detenerCuenta();
  if (app.cobro) app.cobro.vencido = true;
  $("btn-otro").textContent = T.qr.nuevo;
  $("qr-figura").classList.add("qr__figura--vencido");
  $("qr-vencido").hidden = false;
  $("qr-vence").textContent = T.qr.vencio;
  $("qr-barra").style.width = "0%";
  pintarEstado("gris", T.estado.expirado);
}

async function consultarYaCayo() {
  const boton = $("btn-ya-cayo");
  if (estaOcupado(boton) || !app.cobro) return;
  ponerOcupado(boton, true, T.qr.consultando);
  pintarEstado("consultando", T.estado.consultando);
  try {
    await seguimiento.consultarAhora({ manual: true });
  } finally {
    ponerOcupado(boton, false);
  }
}

async function simularPago() {
  const boton = $("btn-simular");
  if (estaOcupado(boton) || !app.cobro) return;
  ocultarError("error-qr");
  ponerOcupado(boton, true, T.qr.simulando);
  try {
    const r = await api.simularPago(app.cobro.ticket);
    if (typeof r?.ticket === "string") {
      app.cobro.ticket = r.ticket;
      guardarCobro();
      seguimiento.actualizarTicket(r.ticket);
    }
    const e = await seguimiento.consultarAhora({ manual: false });
    // Si /api/estado no respondió, se usa la respuesta de /api/simular-pago (siempre SIMULACIÓN).
    if (!e && r?.estado === "pagado" && app.cobro && !app.cobro.pagado) {
      mostrarPagado({ estado: "pagado", monto: app.cobro.monto, modoPago: "simulacion", pagadoEn: new Date().toISOString() });
    }
  } catch (e) {
    mostrarError("error-qr", textoDe(e));
  } finally {
    ponerOcupado(boton, false);
  }
}

function salirDelCobro() {
  if (app.cobro && !app.cobro.pagado && !app.cobro.vencido && !window.confirm(T.qr.confirmarSalir)) return;
  nuevoCobro();
}

// ---------------- Vista 3 · ¡Ya cayó! ----------------
function mostrarPagado(e, { silencioso = false } = {}) {
  seguimiento.detener();
  detenerCuenta();
  cerrarDialogo("dialogo-revision");
  const c = app.cobro || {};
  const monto = Number.isFinite(Number(e?.monto)) ? Number(e.monto) : Number(c.monto);
  const sim = (e?.modoPago || c.modoPago) === "simulacion";

  $("pagado-monto").textContent = formatearMonto(monto);
  const fuente = $("pagado-fuente");
  fuente.textContent = sim ? T.pagado.simulacion : T.pagado.confirmado;
  fuente.classList.toggle("pagado__fuente--simulacion", sim);
  const hora = formatearHora(e?.pagadoEn);
  $("pagado-detalle").textContent = [c.concepto, hora ? T.pagado.hora(hora) : ""].filter(Boolean).join(" · ");
  const ref = $("pagado-ref");
  ref.textContent = e?.transactionId ? T.pagado.transaccion(e.transactionId) : "";
  ref.hidden = !ref.textContent;

  if (app.cobro) {
    app.cobro.pagado = { estado: "pagado", monto, pagadoEn: e?.pagadoEn ?? null, transactionId: e?.transactionId ?? null, modoPago: e?.modoPago || c.modoPago };
    guardarCobro();
  }
  mostrarVista("pagado");
  if (!silencioso) {
    vibrarPago();
    anunciarPago(T.voz.pago(monto, sim));
  }
}

function nuevoCobro() {
  seguimiento.detener({ olvidar: true });
  detenerCuenta();
  try {
    globalThis.speechSynthesis?.cancel();
  } catch {
    /* sin voz */
  }
  app.cobro = null;
  guardarCobro();
  $("campo-pedido").value = "";
  $("form-propuesta").hidden = true;
  $("form-pedido").hidden = false;
  ocultarError("error-pedido");
  ocultarError("error-propuesta");
  if (app.modoPago) ponerModo(app.modoPago);
  mostrarVista("pedido");
}

// ---------------- Revisar una captura (módulo aparte, carga dinámica) ----------------
async function abrirRevision() {
  try {
    const modulo = await import("./revisar.js");
    const c = app.cobro && !app.cobro.pagado ? app.cobro : null;
    modulo.abrirRevision({
      cobroActivo: c ? { ticket: c.ticket, concepto: c.concepto, monto: c.monto } : null,
      modoPago: app.modoPago,
      iaDisponible: app.iaDisponible,
      alYaCayo: () => seguimiento.consultarAhora({ manual: true }),
    });
  } catch {
    // Si el módulo no carga, se oculta el botón y la demo sigue con "¿Ya cayó?".
    document.querySelectorAll("[data-abrir-revision]").forEach((b) => {
      b.hidden = true;
    });
  }
}

function cerrarDialogo(id) {
  const d = $(id);
  if (d?.open) d.close();
}

function abrirDialogo(id) {
  const d = $(id);
  if (!d) return;
  if (typeof d.showModal === "function") {
    if (!d.open) d.showModal();
  } else {
    d.setAttribute("open", "");
  }
  d.querySelector("h2")?.focus();
}

// ---------------- Micrófono (Web Speech, si existe) ----------------
function configurarMicrofono() {
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const boton = $("btn-microfono");
  const aviso = $("estado-microfono");
  if (!Reconocimiento) {
    boton.hidden = true;
    return;
  }
  boton.hidden = false;
  let rec = null;
  let escuchando = false;
  let textoFinal = "";

  const decir = (texto) => {
    aviso.textContent = texto;
    aviso.hidden = !texto;
  };
  const marcar = (activo) => {
    escuchando = activo;
    boton.setAttribute("aria-pressed", String(activo));
    boton.setAttribute("aria-label", activo ? T.pedido.microfonoParar : T.pedido.microfono);
  };

  boton.addEventListener("click", () => {
    if (app.ocupado) return;
    if (escuchando) {
      rec?.stop();
      return;
    }
    try {
      rec = new Reconocimiento();
      rec.lang = "es-MX";
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.continuous = false;
    } catch {
      decir(T.pedido.micError);
      return;
    }
    textoFinal = "";
    rec.onstart = () => {
      marcar(true);
      decir(T.pedido.escuchando);
    };
    rec.onresult = (ev) => {
      let interino = "";
      for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
        const r = ev.results[i];
        if (r.isFinal) textoFinal += r[0].transcript;
        else interino += r[0].transcript;
      }
      $("campo-pedido").value = `${textoFinal}${interino}`.trim();
    };
    rec.onerror = (ev) => {
      const sinPermiso = ev.error === "not-allowed" || ev.error === "service-not-allowed";
      decir(sinPermiso ? T.pedido.micSinPermiso : ev.error === "no-speech" ? T.pedido.micNoEscuche : T.pedido.micError);
    };
    rec.onend = () => {
      marcar(false);
      const t = textoFinal.trim();
      if (t) {
        decir("");
        enviarPedido(t);
      }
    };
    try {
      rec.start();
    } catch {
      marcar(false);
      decir(T.pedido.micError);
    }
  });
}

// ---------------- Arranque ----------------
function conectarEventos() {
  $("form-pedido").addEventListener("submit", (ev) => {
    ev.preventDefault();
    enviarPedido($("campo-pedido").value);
  });
  $("campo-pedido").addEventListener("input", () => {
    $("campo-pedido").removeAttribute("aria-invalid");
    ocultarError("error-pedido");
  });
  document.querySelectorAll(".chip[data-ejemplo]").forEach((chip) => {
    chip.addEventListener("click", () => {
      if (estaOcupado(chip)) return;
      const texto = T.pedido.ejemplos[Number(chip.dataset.ejemplo)] || chip.textContent;
      $("campo-pedido").value = texto;
      enviarPedido(texto);
    });
  });
  $("btn-manual").addEventListener("click", () => mostrarPropuesta({ respuesta: "", propuesta: null, origen: "manual" }, ""));

  $("form-propuesta").addEventListener("submit", confirmarCobro);
  $("campo-concepto").addEventListener("input", validarPropuesta);
  $("campo-monto").addEventListener("input", validarPropuesta);
  $("btn-cambiar").addEventListener("click", () => volverAlPedido());

  $("btn-ya-cayo").addEventListener("click", consultarYaCayo);
  $("btn-simular").addEventListener("click", simularPago);
  $("btn-otro").addEventListener("click", salirDelCobro);
  $("btn-nuevo-cobro").addEventListener("click", nuevoCobro);

  document.querySelectorAll("[data-abrir-revision]").forEach((b) => b.addEventListener("click", abrirRevision));

  $("btn-como").addEventListener("click", () => abrirDialogo("dialogo-como"));
  $("dialogo-como").querySelectorAll("[data-cerrar]").forEach((b) => b.addEventListener("click", () => cerrarDialogo("dialogo-como")));
  $("dialogo-como").addEventListener("click", (ev) => {
    if (ev.target === ev.currentTarget) cerrarDialogo("dialogo-como");
  });

  // Al volver a la pestaña, pregunta de inmediato (el celular pausa los temporizadores en segundo plano).
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && seguimiento.activo) seguimiento.consultarAhora({ manual: false });
  });
}

function restaurarCobro() {
  const guardado = leerCobroGuardado();
  if (!guardado) return false;
  if (guardado.pagado) {
    app.cobro = guardado;
    ponerModo(guardado.modoPago);
    mostrarPagado(guardado.pagado, { silencioso: true });
    return true;
  }
  activarCobro(guardado, { reanudar: true });
  return true;
}

function iniciar() {
  document.title = T.pagina.titulo;
  aplicarTextos(document);
  ponerModo(null);
  conectarEventos();
  configurarMicrofono();
  cargarVoces();
  if (!restaurarCobro()) mostrarVista("pedido", { enfocar: false });
  cargarSalud();
}

iniciar();
