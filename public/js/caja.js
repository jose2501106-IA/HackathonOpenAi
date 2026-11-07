// Tócale · Caja: el cajero arma el pedido, crea el cobro y ve cuando se paga.
import {
  api,
  pesos,
  hora,
  ahora,
  insertarSvg,
  ponerTexto,
  mostrarMensaje,
  limpiarMensaje,
  mostrarSimulacion,
  almacenSesion,
} from "./comun.js";

const $ = (id) => document.getElementById(id);

const MAX_CANTIDAD = 50;
const CADA_MS = 4000;
const VIGILAR_MS = 8000; // después de pagado, revisa pagos de más
const VIGILAR_SEG = 600;
const CLAVE_PIN = "tocale.pin";

const st = {
  salud: null,
  productos: [],
  porId: new Map(),
  carrito: new Map(), // id -> cantidad
  cobro: null, // respuesta de POST /api/pedido
  qr: null, // respuesta de POST /api/cobros (metodo qr)
  temporizador: null,
  pagado: false,
  ocupado: false,
  nfc: null, // AbortController mientras se graba una tarjeta
  maxPagos: 0, // pagos recibidos para el pedido según /api/estado
  vigilarHasta: 0,
};

// ---------- PIN ----------
function encabezadosCaja() {
  const pin = almacenSesion.leer(CLAVE_PIN);
  return pin ? { "x-caja-pin": pin } : {};
}

function revisarErrorPin(error) {
  if (error && (error.codigo === "PIN_INCORRECTO" || error.status === 401)) {
    $("seccion-pin").hidden = false;
    $("pin").setAttribute("aria-invalid", "true");
    $("pin").focus();
  }
}

// ---------- Carga inicial ----------
async function cargar() {
  limpiarMensaje($("mensajes-caja"));
  $("btn-reintentar").hidden = true;
  try {
    const [salud, menu] = await Promise.all([api("/api/salud"), api("/api/menu")]);
    st.salud = salud;
    st.productos = Array.isArray(menu.productos) ? menu.productos : [];
    st.porId = new Map(st.productos.map((p) => [p.id, p]));
    $("negocio").textContent = menu.negocio || salud.negocio || "";
    $("nota-ejemplo").hidden = !menu.ejemplo;
    mostrarSimulacion(salud.modo === "simulacion");
    $("seccion-pin").hidden = !salud.pinRequerido;
    $("pin").value = almacenSesion.leer(CLAVE_PIN) || "";
    $("aviso-ia").textContent = salud.ia
      ? ""
      : "La IA no está configurada en el servidor: se usará una interpretación básica.";
    renderProductos();
    renderCarrito();
  } catch (error) {
    $("negocio").textContent = "";
    mostrarMensaje($("mensajes-caja"), `No pude cargar el menú. ${error.message}`);
    $("btn-reintentar").hidden = false;
  }
}

// ---------- Productos y carrito ----------
function renderProductos() {
  const botones = st.productos.map((p) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "producto";
    boton.dataset.id = p.id;
    boton.setAttribute("aria-label", `Agregar ${p.nombre}, ${pesos(p.precio)}`);
    const nombre = document.createElement("span");
    nombre.className = "nombre";
    nombre.textContent = p.nombre;
    const precio = document.createElement("span");
    precio.className = "precio";
    precio.textContent = pesos(p.precio);
    boton.append(nombre, precio);
    return boton;
  });
  $("productos").replaceChildren(...botones);
}

function crearBotonCantidad(texto, etiqueta, id, accion) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = texto;
  boton.dataset.id = id;
  boton.dataset.accion = accion;
  boton.setAttribute("aria-label", etiqueta);
  return boton;
}

function totalCarrito() {
  let total = 0;
  for (const [id, cantidad] of st.carrito) {
    const p = st.porId.get(id);
    if (p) total += p.precio * cantidad;
  }
  return Math.round(total * 100) / 100;
}

function renderCarrito() {
  const filas = [];
  for (const [id, cantidad] of st.carrito) {
    const p = st.porId.get(id);
    if (!p) continue;
    const li = document.createElement("li");
    const info = document.createElement("div");
    info.className = "linea-info";
    const nombre = document.createElement("span");
    nombre.className = "linea-nombre";
    nombre.textContent = p.nombre;
    const subtotal = document.createElement("span");
    subtotal.className = "linea-subtotal";
    subtotal.textContent = `${cantidad} × ${pesos(p.precio)} = ${pesos(p.precio * cantidad)}`;
    info.append(nombre, subtotal);

    const controles = document.createElement("div");
    controles.className = "cantidad";
    const menos = crearBotonCantidad("−", `Quitar un ${p.nombre}`, id, "menos");
    const salida = document.createElement("output");
    salida.textContent = String(cantidad);
    salida.setAttribute("aria-label", `Cantidad de ${p.nombre}: ${cantidad}`);
    const mas = crearBotonCantidad("+", `Agregar un ${p.nombre}`, id, "mas");
    mas.disabled = cantidad >= MAX_CANTIDAD;
    controles.append(menos, salida, mas);

    li.append(info, controles);
    filas.push(li);
  }
  $("lista-pedido").replaceChildren(...filas);
  $("pedido-vacio").hidden = filas.length > 0;
  $("total").textContent = pesos(totalCarrito());
  $("btn-crear").disabled = filas.length === 0 || st.ocupado;
}

function cambiar(id, delta) {
  if (!st.porId.has(id)) return;
  const nueva = (st.carrito.get(id) || 0) + delta;
  if (nueva <= 0) st.carrito.delete(id);
  else st.carrito.set(id, Math.min(MAX_CANTIDAD, nueva));
}

// ---------- Interpretar con IA ----------
async function interpretar() {
  const texto = $("texto-pedido").value.trim();
  const resultado = $("resultado-interpretacion");
  limpiarMensaje($("mensajes-caja"));
  if (!texto) {
    resultado.textContent = "Escribe o dicta el pedido primero.";
    $("texto-pedido").focus();
    return;
  }
  const boton = $("btn-interpretar");
  const original = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Entendiendo el pedido…";
  resultado.textContent = "";
  try {
    const r = await api("/api/interpretar", {
      metodo: "POST",
      cuerpo: { texto },
      encabezados: encabezadosCaja(),
    });
    const items = Array.isArray(r.items) ? r.items : [];
    st.carrito = new Map();
    const entendidos = [];
    for (const item of items) {
      if (!st.porId.has(item.id)) continue;
      const cantidad = Math.floor(Number(item.cantidad));
      if (!(cantidad >= 1)) continue;
      st.carrito.set(item.id, Math.min(MAX_CANTIDAD, (st.carrito.get(item.id) || 0) + cantidad));
      entendidos.push(`${cantidad} ${st.porId.get(item.id).nombre}`);
    }
    renderCarrito();
    const fuente = r.fuente === "ia" ? "Interpretado con IA" : "Interpretación básica (sin IA)";
    const partes = [];
    if (typeof r.aviso === "string" && r.aviso.trim()) partes.push(r.aviso.trim());
    partes.push(
      entendidos.length ? `${fuente}: ${entendidos.join(", ")}.` : `${fuente}: no encontré productos del menú.`,
    );
    if (Array.isArray(r.noEntendido) && r.noEntendido.length) {
      partes.push(`No entendí: ${r.noEntendido.map((t) => `«${t}»`).join(", ")}.`);
    }
    if (entendidos.length) partes.push("Revisa la lista antes de crear el cobro.");
    resultado.textContent = partes.join(" ");
  } catch (error) {
    mostrarMensaje($("mensajes-caja"), error.message);
    revisarErrorPin(error);
  } finally {
    boton.disabled = false;
    boton.textContent = original;
  }
}

// ---------- Crear cobro ----------
async function crearCobro() {
  if (st.carrito.size === 0 || st.ocupado) return;
  st.ocupado = true;
  const boton = $("btn-crear");
  boton.disabled = true;
  boton.textContent = "Creando cobro…";
  limpiarMensaje($("mensajes-caja"));
  try {
    const items = [...st.carrito].map(([id, cantidad]) => ({ id, cantidad }));
    const r = await api("/api/pedido", {
      metodo: "POST",
      cuerpo: { items },
      encabezados: encabezadosCaja(),
    });
    mostrarCobro(r);
  } catch (error) {
    mostrarMensaje($("mensajes-caja"), error.message);
    revisarErrorPin(error);
  } finally {
    st.ocupado = false;
    boton.textContent = "Crear cobro";
    renderCarrito();
  }
}

function ponerEstado(tipo, texto) {
  const caja = $("estado-caja");
  caja.className = `estado ${tipo}`;
  let etiqueta = caja.querySelector(".texto-estado");
  const quiereNodoPunto = tipo === "esperando";
  const tienePunto = Boolean(caja.querySelector(".punto"));
  if (!etiqueta || quiereNodoPunto !== tienePunto) {
    const nodos = [];
    if (quiereNodoPunto) {
      const punto = document.createElement("span");
      punto.className = "punto";
      punto.setAttribute("aria-hidden", "true");
      nodos.push(punto);
    }
    etiqueta = document.createElement("span");
    etiqueta.className = "texto-estado";
    nodos.push(etiqueta);
    caja.replaceChildren(...nodos);
  }
  ponerTexto(etiqueta, texto);
}

function mostrarCobro(r) {
  st.cobro = r;
  st.qr = null;
  st.pagado = false;
  st.maxPagos = 0;
  st.vigilarHasta = 0;

  $("seccion-armar").hidden = true;
  $("seccion-cobro").hidden = false;

  $("cobro-id").textContent = r.pedido.id;
  $("cobro-total").textContent = pesos(r.pedido.total);
  const prueba = $("cobro-prueba");
  if (r.cobro && r.cobro.montoPrueba) {
    prueba.hidden = false;
    prueba.textContent = `Cobro de prueba: ${pesos(r.cobro.monto)} (pedido real: ${pesos(r.pedido.total)})`;
  } else {
    prueba.hidden = true;
    prueba.textContent = "";
  }
  const lineas = (r.pedido.items || []).map((item) => {
    const li = document.createElement("li");
    const nombre = document.createElement("span");
    nombre.textContent = `${item.cantidad} × ${item.nombre}`;
    const subtotal = document.createElement("span");
    subtotal.textContent = pesos(item.subtotal);
    li.append(nombre, subtotal);
    return li;
  });
  $("cobro-productos").replaceChildren(...lineas);

  const qrOk = insertarSvg($("qr-liga"), r.qrSvg, `Código QR para abrir el pedido ${r.pedido.id} en el celular del cliente`);
  if (!qrOk) $("qr-liga").textContent = "No se pudo mostrar el QR. Comparte la liga.";
  const liga = $("liga");
  liga.href = r.url;
  liga.textContent = r.url;

  $("btn-nfc").disabled = false;
  $("estado-acciones").textContent =
    "NDEFReader" in window ? "" : "Para grabar tarjetas NFC usa Chrome en Android.";

  $("btn-qr-codi").hidden = false;
  $("btn-qr-codi").disabled = false;
  $("confirmar-qr").hidden = true;
  $("qr-codi-bloque").hidden = true;
  $("qr-codi").replaceChildren();
  $("qr-codi-nota").textContent = "";
  limpiarMensaje($("mensajes-cobro"));

  $("btn-simular").hidden = !(st.salud && st.salud.modo === "simulacion");

  ponerEstado("esperando", "Esperando pago…");
  window.scrollTo(0, 0);
  $("titulo-cobro").focus();
  programarSondeo(1500);
}

// ---------- Sondeo del estado ----------
function detenerSondeo() {
  clearTimeout(st.temporizador);
  st.temporizador = null;
}

function programarSondeo(ms = CADA_MS) {
  detenerSondeo();
  st.temporizador = setTimeout(sondear, ms);
}

function vencerQr() {
  st.qr = null;
  $("qr-codi-bloque").hidden = true;
  $("qr-codi").replaceChildren();
  $("btn-qr-codi").hidden = false;
  $("btn-qr-codi").disabled = false;
  $("qr-codi-nota").textContent = "El QR CoDi® venció. Si hace falta, muestra otro.";
}

/** Si pey reporta más de un pago para el pedido, avisa para devolver el excedente. */
function revisarDuplicados(r) {
  const n = Math.floor(Number(r && r.pagosRecibidos));
  if (!(n > st.maxPagos)) return;
  st.maxPagos = n;
  if (n > 1) {
    mostrarMensaje(
      $("mensajes-cobro"),
      `Se recibieron ${n} pagos para este pedido: devuelve el excedente en efectivo.`,
    );
  }
}

function programarVigilancia() {
  detenerSondeo();
  st.temporizador = setTimeout(vigilar, VIGILAR_MS);
}

async function vigilar() {
  const cobro = st.cobro;
  if (!cobro || !st.pagado || !st.vigilarHasta || ahora() > st.vigilarHasta) return;
  const o = encodeURIComponent(cobro.codigo);
  try {
    if (st.qr) {
      const rq = await api(`/api/estado?o=${o}&metodo=qr&id=${encodeURIComponent(st.qr.id)}`);
      if (st.cobro !== cobro) return;
      revisarDuplicados(rq);
    }
    const r = await api(`/api/estado?o=${o}`);
    if (st.cobro !== cobro) return;
    revisarDuplicados(r);
  } catch {
    // Sin conexión: se vuelve a intentar en la siguiente vuelta.
  }
  if (st.cobro === cobro) programarVigilancia();
}

async function sondear() {
  const cobro = st.cobro;
  if (!cobro || st.pagado) return;
  const o = encodeURIComponent(cobro.codigo);
  try {
    if (st.qr) {
      if (ahora() > st.qr.vence) {
        vencerQr();
      } else {
        const qrActual = st.qr;
        const rq = await api(`/api/estado?o=${o}&metodo=qr&id=${encodeURIComponent(qrActual.id)}`);
        if (st.cobro !== cobro || st.pagado) return;
        revisarDuplicados(rq);
        if (rq.estado === "pagado") {
          marcarPagado(rq, Boolean(rq.simulacion));
          return;
        }
      }
    }
    const r = await api(`/api/estado?o=${o}`);
    if (st.cobro !== cobro || st.pagado) return;
    revisarDuplicados(r);
    if (r.estado === "pagado") {
      marcarPagado(r, Boolean(r.simulacion));
      return;
    }
    ponerEstado(
      "esperando",
      r.estado === "no_verificable" ? "Esperando pago… (no pude confirmar con pey; sigo revisando)" : "Esperando pago…",
    );
  } catch {
    if (st.cobro !== cobro || st.pagado) return;
    ponerEstado("esperando", "Esperando pago… (sin conexión; sigo intentando)");
  }
  if (cobro.pedido && ahora() > cobro.pedido.vence) {
    ponerEstado("vencido", "El pedido venció. Crea uno nuevo.");
    detenerSondeo();
    return;
  }
  programarSondeo();
}

function marcarPagado(r, simulado) {
  if (!st.cobro) return;
  st.pagado = true;
  detenerSondeo();
  const monto = r && r.monto != null ? r.monto : st.cobro.cobro.monto;
  const cuando = hora(r && r.pagadoEn ? r.pagadoEn : ahora());
  ponerEstado("pagado", `Pagado ✓ ${pesos(monto)} · ${cuando}${simulado ? " (SIMULACIÓN)" : ""}`);
  $("btn-qr-codi").hidden = true;
  $("confirmar-qr").hidden = true;
  $("qr-codi-bloque").hidden = true;
  $("btn-simular").hidden = true;
  revisarDuplicados(r);
  if (!simulado) {
    // Sigue revisando un rato por si llega un segundo pago (push y QR del mismo pedido).
    st.vigilarHasta = ahora() + VIGILAR_SEG;
    programarVigilancia();
  }
}

// ---------- QR CoDi de respaldo ----------
function pedirConfirmacionQr() {
  $("confirmar-qr").hidden = false;
  $("btn-qr-codi").setAttribute("aria-expanded", "true");
  $("btn-qr-si").focus();
}

function cancelarQr() {
  $("confirmar-qr").hidden = true;
  $("btn-qr-codi").setAttribute("aria-expanded", "false");
  $("btn-qr-codi").focus();
}

async function mostrarQrCodi() {
  const cobro = st.cobro;
  if (!cobro || st.pagado) return;
  const si = $("btn-qr-si");
  si.disabled = true;
  si.textContent = "Creando QR CoDi®…";
  limpiarMensaje($("mensajes-cobro"));
  $("qr-codi-nota").textContent = "";
  try {
    const r = await api("/api/cobros", {
      metodo: "POST",
      cuerpo: { o: cobro.codigo, metodo: "qr", confirmo: true },
      encabezados: encabezadosCaja(),
    });
    if (st.cobro !== cobro || st.pagado) return;
    st.qr = r;
    const ok = insertarSvg($("qr-codi"), r.qrSvg, `QR CoDi para pagar ${pesos(r.monto)} con la app del banco`);
    if (!ok) $("qr-codi").textContent = "No se pudo dibujar el QR CoDi®.";
    $("qr-codi-vence").textContent = `Monto: ${pesos(r.monto)}. Vence a las ${hora(r.vence)}.`;
    $("confirmar-qr").hidden = true;
    $("btn-qr-codi").hidden = true;
    $("btn-qr-codi").setAttribute("aria-expanded", "false");
    $("qr-codi-bloque").hidden = false;
    $("qr-codi-nota").textContent = "QR CoDi® listo.";
    programarSondeo(1500);
  } catch (error) {
    mostrarMensaje($("mensajes-cobro"), error.message);
    revisarErrorPin(error);
  } finally {
    si.disabled = false;
    si.textContent = "Sí, mostrar el QR CoDi®";
  }
}

// ---------- Liga y NFC ----------
async function copiarLiga() {
  const url = st.cobro && st.cobro.url;
  if (!url) return;
  const nota = $("estado-acciones");
  try {
    await navigator.clipboard.writeText(url);
    nota.textContent = "Liga copiada.";
  } catch {
    const area = document.createElement("textarea");
    area.value = url;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    nota.textContent = ok ? "Liga copiada." : "No pude copiar. Mantén presionada la liga para copiarla.";
  }
}

function mensajeNfc(error) {
  switch (error && error.name) {
    case "NotAllowedError":
      return "No hay permiso para usar NFC. Permítelo para este sitio en Chrome y vuelve a intentarlo.";
    case "NotSupportedError":
      return "Este celular o esta tarjeta no son compatibles. Usa el QR.";
    case "NotReadableError":
      return "El NFC está apagado o no disponible. Actívalo en los ajustes del celular.";
    case "AbortError":
      return "Se acabó el tiempo o se canceló. Vuelve a intentarlo y acerca la tarjeta.";
    case "NetworkError":
      return "No se pudo grabar. Mantén la tarjeta quieta y vuelve a intentarlo.";
    default:
      return "No se pudo grabar la tarjeta. Vuelve a intentarlo o usa el QR.";
  }
}

async function grabarNfc() {
  const url = st.cobro && st.cobro.url;
  const nota = $("estado-acciones");
  if (!url) return;
  if (!("NDEFReader" in window)) {
    nota.textContent = "Este navegador no puede grabar tarjetas NFC. Usa Chrome en Android o comparte el QR.";
    return;
  }
  const boton = $("btn-nfc");
  boton.disabled = true;
  nota.textContent = "Acerca la tarjeta a la parte trasera del celular…";
  const control = new AbortController();
  st.nfc = control;
  const limite = setTimeout(() => control.abort(), 30000);
  try {
    // eslint-disable-next-line no-undef
    const ndef = new NDEFReader();
    await ndef.write({ records: [{ recordType: "url", data: url }] }, { overwrite: true, signal: control.signal });
    if (st.nfc === control) nota.textContent = "Tarjeta lista: el cliente solo la toca.";
  } catch (error) {
    if (st.nfc === control) nota.textContent = mensajeNfc(error);
  } finally {
    clearTimeout(limite);
    if (st.nfc === control) st.nfc = null;
    boton.disabled = false;
  }
}

// ---------- Simulación y nuevo pedido ----------
function simularPago() {
  if (!st.cobro || st.pagado) return;
  marcarPagado({ monto: st.cobro.cobro.monto, pagadoEn: ahora() }, true);
}

function nuevoPedido() {
  detenerSondeo();
  if (st.nfc) {
    st.nfc.abort();
    st.nfc = null;
  }
  st.cobro = null;
  st.qr = null;
  st.pagado = false;
  st.carrito = new Map();
  $("texto-pedido").value = "";
  $("resultado-interpretacion").textContent = "";
  limpiarMensaje($("mensajes-caja"));
  $("seccion-cobro").hidden = true;
  $("seccion-armar").hidden = false;
  renderCarrito();
  window.scrollTo(0, 0);
  $("titulo-pedido").focus();
}

// ---------- Eventos ----------
function enlazarEventos() {
  $("productos").addEventListener("click", (evento) => {
    const boton = evento.target.closest(".producto");
    if (!boton) return;
    cambiar(boton.dataset.id, +1);
    renderCarrito();
  });

  $("lista-pedido").addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;
    const { id, accion } = boton.dataset;
    cambiar(id, accion === "mas" ? +1 : -1);
    renderCarrito();
    // Conserva el foco en el mismo control después de redibujar.
    const mismo = $("lista-pedido").querySelector(`button[data-id="${CSS.escape(id)}"][data-accion="${accion}"]`);
    if (mismo && !mismo.disabled) {
      mismo.focus();
    } else if (mismo) {
      mismo.parentElement.querySelector('button[data-accion="menos"]').focus();
    } else {
      $("titulo-lista").focus();
    }
  });

  $("pin").addEventListener("input", (evento) => {
    const valor = evento.target.value.trim();
    evento.target.removeAttribute("aria-invalid");
    if (valor) almacenSesion.guardar(CLAVE_PIN, valor);
    else almacenSesion.borrar(CLAVE_PIN);
  });

  $("btn-interpretar").addEventListener("click", interpretar);
  $("texto-pedido").addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" && (evento.ctrlKey || evento.metaKey)) {
      evento.preventDefault();
      interpretar();
    }
  });
  $("btn-crear").addEventListener("click", crearCobro);
  $("btn-reintentar").addEventListener("click", cargar);
  $("btn-copiar").addEventListener("click", copiarLiga);
  $("btn-nfc").addEventListener("click", grabarNfc);
  $("btn-qr-codi").addEventListener("click", pedirConfirmacionQr);
  $("btn-qr-si").addEventListener("click", mostrarQrCodi);
  $("btn-qr-no").addEventListener("click", cancelarQr);
  $("btn-simular").addEventListener("click", simularPago);
  $("btn-nuevo").addEventListener("click", nuevoPedido);
}

$("btn-qr-codi").setAttribute("aria-expanded", "false");
enlazarEventos();
cargar();
