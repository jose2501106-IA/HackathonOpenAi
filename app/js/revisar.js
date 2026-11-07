// "Revisar una captura": foto o archivo (o la captura de ejemplo ficticia) → /api/revisar → lo leído + veredicto.
// El veredicto lo decide el servidor con código y el estado de pey; aquí solo se muestra. Nunca se dice "falso".
// La imagen se reduce a 1280 px como JPEG 0.8 en el navegador y no se guarda en ningún lado.

import { T, formatearMonto, formatearHora, leerMonto, validarMonto, mensajeError } from "./textos.js";
import { api } from "./api.js";

const LADO_MAX = 1280;
const CALIDAD = 0.8;
const LIMITE_CARACTERES = 1_400_000; // el servidor rechaza imágenes de más de 1.5 MB (413 IMAGEN_GRANDE)
const RUTA_EJEMPLO = "img/captura-ejemplo.svg";

const $ = (id) => document.getElementById(id);

let conectado = false;
let enviando = false;
let imagen = null; // { dataUrl, mime, pie }
let ctx = { cobroActivo: null, modoPago: null, iaDisponible: null, alYaCayo: null };

export function abrirRevision(opciones = {}) {
  ctx = { ...ctx, ...opciones };
  const dialogo = $("dialogo-revision");
  if (!dialogo) throw new Error("sin_dialogo");
  if (!conectado) conectar();
  reiniciar();
  if (typeof dialogo.showModal === "function") {
    if (!dialogo.open) dialogo.showModal();
  } else {
    dialogo.setAttribute("open", "");
  }
  $("titulo-revision").focus();
}

export function cerrarRevision() {
  const d = $("dialogo-revision");
  if (d?.open) d.close();
}

function conectar() {
  conectado = true;
  const dialogo = $("dialogo-revision");
  dialogo.querySelectorAll("[data-cerrar]").forEach((b) => b.addEventListener("click", cerrarRevision));
  dialogo.addEventListener("click", (ev) => {
    if (ev.target === dialogo) cerrarRevision(); // toque en el fondo
  });
  $("revision-btn-foto").addEventListener("click", () => !enviando && $("revision-foto").click());
  $("revision-btn-archivo").addEventListener("click", () => !enviando && $("revision-archivo").click());
  $("revision-foto").addEventListener("change", (ev) => alElegirArchivo(ev.currentTarget));
  $("revision-archivo").addEventListener("change", (ev) => alElegirArchivo(ev.currentTarget));
  $("revision-btn-ejemplo").addEventListener("click", usarEjemplo);
  $("revision-btn-manual").addEventListener("click", () => {
    const abierto = $("revision-btn-manual").getAttribute("aria-expanded") === "true";
    mostrarManual(!abierto, { enfocar: !abierto });
  });
  $("revision-form-manual").addEventListener("submit", enviarManual);
  $("revision-btn-otra").addEventListener("click", () => {
    reiniciar();
    $("revision-btn-foto").focus();
  });
}

// ---------- Estados de la sección ----------
function reiniciar() {
  imagen = null;
  enviando = false;
  const c = ctx.cobroActivo;
  $("revision-contexto").textContent = c ? T.revision.conCobro(c.concepto || "", formatearMonto(c.monto)) : T.revision.sinCobro;
  $("revision-btn-volver").textContent = c ? T.revision.volver : T.revision.listo;
  $("revision-acciones").hidden = false;
  $("revision-resultado").hidden = true;
  $("revision-pie-acciones").hidden = true;
  $("revision-cargando").hidden = true;
  $("revision-vista-previa").hidden = true;
  $("revision-error").hidden = true;
  $("revision-monto").value = "";
  $("revision-monto").removeAttribute("aria-invalid");
  // Sin IA (fuera de SIMULACIÓN) el monto a mano es el camino principal.
  const sinIa = ctx.iaDisponible === false && ctx.modoPago !== "simulacion";
  mostrarManual(sinIa, { enfocar: false });
  if (sinIa) mostrarError(T.revision.iaNoDisponible);
}

function mostrarManual(abrir, { enfocar = false } = {}) {
  $("revision-form-manual").hidden = !abrir;
  $("revision-btn-manual").setAttribute("aria-expanded", String(abrir));
  if (abrir && enfocar) $("revision-monto").focus();
}

function mostrarError(texto) {
  const el = $("revision-error");
  el.textContent = texto || "";
  el.hidden = !texto;
}

function mostrarPrevia({ chica = false, escaneando = false } = {}) {
  const fig = $("revision-vista-previa");
  if (!imagen) {
    fig.hidden = true;
    return;
  }
  $("revision-imagen").src = imagen.dataUrl;
  $("revision-imagen").alt = imagen.pie;
  $("revision-pie").textContent = imagen.pie;
  fig.classList.toggle("revision__previa--chica", chica);
  fig.classList.toggle("revision__previa--escaneando", escaneando);
  fig.hidden = false;
}

function mostrarCargando(texto) {
  $("revision-acciones").hidden = true;
  $("revision-resultado").hidden = true;
  $("revision-pie-acciones").hidden = true;
  $("revision-cargando-texto").textContent = texto;
  $("revision-cargando").hidden = false;
  mostrarError("");
  mostrarPrevia({ escaneando: true });
}

function terminarCargando() {
  $("revision-cargando").hidden = true;
}

// ---------- Imagen: reducir a 1280 px, JPEG 0.8 ----------
function cargarImagen(src) {
  return new Promise((resolver, rechazar) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolver(img);
    img.onerror = () => rechazar(new Error("imagen_no_carga"));
    img.src = src;
  });
}

async function abrirArchivo(archivo) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(archivo, { imageOrientation: "from-image" });
    } catch {
      /* se intenta con <img> */
    }
  }
  const url = URL.createObjectURL(archivo);
  try {
    return await cargarImagen(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function aJpeg(fuente, lado = LADO_MAX, calidad = CALIDAD) {
  const ancho0 = fuente.naturalWidth || fuente.width;
  const alto0 = fuente.naturalHeight || fuente.height;
  if (!ancho0 || !alto0) throw new Error("imagen_sin_tamano");
  const escala = Math.min(1, lado / Math.max(ancho0, alto0));
  const ancho = Math.max(1, Math.round(ancho0 * escala));
  const alto = Math.max(1, Math.round(alto0 * escala));
  const lienzo = document.createElement("canvas");
  lienzo.width = ancho;
  lienzo.height = alto;
  const c = lienzo.getContext("2d");
  c.fillStyle = "#ffffff"; // JPEG no tiene transparencia
  c.fillRect(0, 0, ancho, alto);
  c.drawImage(fuente, 0, 0, ancho, alto);
  return lienzo.toDataURL("image/jpeg", calidad);
}

function reducir(fuente) {
  let url = aJpeg(fuente);
  if (url.length > LIMITE_CARACTERES) url = aJpeg(fuente, LADO_MAX, 0.6);
  if (url.length > LIMITE_CARACTERES) url = aJpeg(fuente, 1024, 0.55);
  if (url.length > LIMITE_CARACTERES) {
    const e = new Error(T.revision.muyGrande);
    e.codigo = "IMAGEN_GRANDE";
    throw e;
  }
  return url;
}

async function alElegirArchivo(input) {
  const archivo = input.files && input.files[0];
  input.value = ""; // permite volver a elegir el mismo archivo
  if (!archivo || enviando) return;
  if (archivo.type && !archivo.type.startsWith("image/")) {
    mostrarError(T.revision.noEsImagen);
    return;
  }
  imagen = null;
  mostrarCargando(T.revision.preparando);
  let fuente;
  try {
    fuente = await abrirArchivo(archivo);
    imagen = { dataUrl: reducir(fuente), mime: "image/jpeg", pie: T.revision.pieArchivo };
  } catch (e) {
    terminarCargando();
    $("revision-acciones").hidden = false;
    $("revision-vista-previa").hidden = true;
    mostrarError(e?.codigo === "IMAGEN_GRANDE" ? T.revision.muyGrande : T.revision.noAbre);
    return;
  } finally {
    fuente?.close?.();
  }
  await enviar();
}

async function usarEjemplo() {
  if (enviando) return;
  imagen = null;
  mostrarCargando(T.revision.preparando);
  try {
    const svg = await cargarImagen(RUTA_EJEMPLO);
    imagen = { dataUrl: reducir(svg), mime: "image/jpeg", pie: T.revision.pieEjemplo };
  } catch {
    terminarCargando();
    $("revision-acciones").hidden = false;
    $("revision-vista-previa").hidden = true;
    mostrarError(T.revision.noAbre);
    return;
  }
  await enviar();
}

function enviarManual(ev) {
  ev.preventDefault();
  const campo = $("revision-monto");
  const monto = leerMonto(campo.value);
  if (validarMonto(monto, Infinity)) {
    campo.setAttribute("aria-invalid", "true");
    mostrarError(T.revision.manualInvalido);
    campo.focus();
    return;
  }
  campo.removeAttribute("aria-invalid");
  enviar({ montoManual: monto });
}

// ---------- Envío y resultado ----------
async function enviar({ montoManual = null } = {}) {
  if (enviando) return;
  enviando = true;
  mostrarCargando(T.revision.leyendo);
  try {
    const r = await api.revisar({
      imagenBase64: imagen?.dataUrl ?? null,
      mime: imagen ? imagen.mime : null,
      ticket: ctx.cobroActivo?.ticket ?? null,
      montoManual,
    });
    pintarResultado(r);
    if (r?.veredicto?.codigo === "ya_cayo" && ctx.cobroActivo) ctx.alYaCayo?.();
  } catch (e) {
    terminarCargando();
    $("revision-acciones").hidden = false;
    mostrarPrevia();
    mostrarError(e?.message || mensajeError(e?.codigo));
    if (e?.codigo === "IA_NO_DISPONIBLE" || e?.codigo === "IA_SIN_SALDO") mostrarManual(true, { enfocar: true });
  } finally {
    enviando = false;
  }
}

function filaLeida(dl, etiqueta, valor) {
  const dt = document.createElement("dt");
  dt.textContent = etiqueta;
  const dd = document.createElement("dd");
  const vacio = valor === null || valor === undefined || valor === "";
  dd.textContent = vacio ? T.comun.sinDato : String(valor);
  if (vacio) dd.className = "sin-dato";
  dl.append(dt, dd);
}

function pintarResultado(r) {
  terminarCargando();
  const v = r && typeof r.veredicto === "object" && r.veredicto ? r.veredicto : {};
  const conf = T.veredictos[v.codigo] || null;

  const caja = $("revision-veredicto");
  caja.className = `veredicto veredicto--${conf?.color || "gris"} veredicto--aparece`;
  $("revision-veredicto-uso").setAttribute("href", `#i-${conf?.icono || "lupa"}`);
  $("revision-veredicto-titulo").textContent = conf?.titulo || v.titulo || T.veredictos.no_verificable.titulo;
  const mensaje = v.mensaje || conf?.mensaje || "";
  $("revision-veredicto-mensaje").textContent = mensaje;
  $("revision-veredicto-mensaje").hidden = !mensaje;
  $("revision-veredicto-detalle").textContent = v.detalle || "";
  $("revision-veredicto-detalle").hidden = !v.detalle;

  // Pago encontrado en pey (si el servidor lo manda).
  const p = r?.pago && typeof r.pago === "object" ? r.pago : null;
  const pagoEl = $("revision-pago");
  const montoPago = Number(p?.monto);
  pagoEl.textContent = p && Number.isFinite(montoPago) ? T.revision.pago(formatearMonto(montoPago), formatearHora(p.fechaPago || p.pagadoEn)) : "";
  pagoEl.hidden = !pagoEl.textContent;

  // Lo que se leyó de la captura.
  const l = r?.leido && typeof r.leido === "object" ? r.leido : {};
  const dl = $("revision-leido");
  dl.replaceChildren();
  const montoLeido = l.monto === null || l.monto === undefined ? null : Number(l.monto);
  filaLeida(dl, T.revision.campos.monto, Number.isFinite(montoLeido) ? formatearMonto(montoLeido) : null);
  filaLeida(dl, T.revision.campos.hora, l.hora);
  filaLeida(dl, T.revision.campos.fecha, l.fecha);
  filaLeida(dl, T.revision.campos.clave, l.clave_rastreo);

  const notas = [];
  if (l.es_comprobante === false) notas.push(T.revision.noComprobante);
  if (l.legible === false) notas.push(T.revision.noLegible);
  $("revision-nota").textContent = notas.join(" ");
  $("revision-nota").hidden = notas.length === 0;

  const origen = $("revision-origen");
  origen.textContent = T.revision.origen[r?.origen] || "";
  origen.hidden = !origen.textContent;
  origen.classList.toggle("etiqueta--simulacion", r?.origen === "simulacion");

  $("revision-acciones").hidden = true;
  $("revision-resultado").hidden = false;
  $("revision-pie-acciones").hidden = false;
  mostrarPrevia({ chica: true });
  mostrarError("");
  if (v.codigo === "ilegible") mostrarManual(true, { enfocar: false });

  $("revision-veredicto-titulo").focus({ preventScroll: true });
  $("revision-resultado").scrollIntoView({ block: "start" });
}
