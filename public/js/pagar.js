// Tócale · página del cliente: ve su pedido, escribe su celular y autoriza en su banco.
import {
  api,
  pesos,
  hora,
  ahora,
  ponerTexto,
  mostrarMensaje,
  limpiarMensaje,
  mostrarSimulacion,
  almacenLocal,
} from "./comun.js";

const $ = (id) => document.getElementById(id);

const CADA_MS = 4000;
const CLAVE_TELEFONO = "tocale.telefono";
const TEXTO_INVALIDO = "Esta tarjeta no tiene un pedido válido. Pide al cajero que la vuelva a grabar.";
const TEXTO_VENCIDO = "Este pedido ya venció. Pide al cajero uno nuevo.";

const st = {
  codigo: null,
  datos: null, // respuesta de GET /api/pedido
  cobro: null, // respuesta de POST /api/cobros (push)
  temporizador: null,
  terminado: false,
  enviando: false,
};

// ---------- Pedido ----------
function textoErrorPedido(error) {
  if (error.status === 410 || error.codigo === "PEDIDO_VENCIDO") return TEXTO_VENCIDO;
  if (error.status === 400 || error.codigo === "PEDIDO_INVALIDO") return TEXTO_INVALIDO;
  return null;
}

function errorPedido(texto, reintentable) {
  detenerSondeo();
  $("cargando").hidden = true;
  $("seccion-pedido").hidden = true;
  $("error-pedido").hidden = false;
  $("texto-error-pedido").textContent = texto;
  $("btn-reintentar-pedido").hidden = !reintentable;
  $("titulo-error").focus();
}

async function cargarPedido() {
  $("cargando").hidden = false;
  $("error-pedido").hidden = true;
  try {
    const r = await api(`/api/pedido?o=${encodeURIComponent(st.codigo)}`);
    st.datos = r;
    mostrarPedido(r);
  } catch (error) {
    const texto = textoErrorPedido(error);
    errorPedido(texto || error.message, !texto);
  } finally {
    $("cargando").hidden = true;
  }
}

function mostrarPedido(r) {
  mostrarSimulacion(r.modo === "simulacion");
  $("negocio").textContent = r.negocio || "";
  $("pedido-id").textContent = r.pedido.id;
  const lineas = (r.pedido.items || []).map((item) => {
    const li = document.createElement("li");
    const nombre = document.createElement("span");
    nombre.textContent = `${item.cantidad} × ${item.nombre}`;
    const subtotal = document.createElement("span");
    subtotal.textContent = pesos(item.subtotal);
    li.append(nombre, subtotal);
    return li;
  });
  $("productos").replaceChildren(...lineas);
  $("total").textContent = pesos(r.pedido.total);

  const aviso = $("aviso-prueba");
  if (r.cobro && r.cobro.montoPrueba) {
    aviso.hidden = false;
    aviso.textContent = `Cobro de prueba: ${pesos(r.cobro.monto)} (demo)`;
  } else {
    aviso.hidden = true;
    aviso.textContent = "";
  }
  $("btn-enviar").textContent = `Enviar solicitud de pago de ${pesos(r.cobro.monto)}`;

  const guardado = almacenLocal.leer(CLAVE_TELEFONO);
  if (guardado && /^\d{10}$/.test(guardado)) {
    $("telefono").value = guardado;
    $("recordar").checked = true;
  }

  $("seccion-pedido").hidden = false;
  mostrarVista("formulario");
}

function mostrarVista(nombre) {
  $("form-pago").hidden = nombre !== "formulario";
  $("espera").hidden = nombre !== "espera";
  $("pagado").hidden = nombre !== "pagado";
  $("vencido").hidden = nombre !== "vencido";
}

// ---------- Teléfono ----------
function soloDigitos(texto) {
  return String(texto || "").replace(/\D/g, "");
}

/** Acepta 10 dígitos; quita la lada de país (52 o 521) si viene pegada. */
function normalizarTelefono(texto) {
  let digitos = soloDigitos(texto);
  if (digitos.length === 12 && digitos.startsWith("52")) digitos = digitos.slice(2);
  else if (digitos.length === 13 && digitos.startsWith("521")) digitos = digitos.slice(3);
  return digitos.slice(0, 10);
}

function errorTelefono(texto) {
  const campo = $("telefono");
  $("error-telefono").textContent = texto;
  campo.setAttribute("aria-invalid", "true");
  campo.focus();
}

function limpiarErrorTelefono() {
  $("error-telefono").textContent = "";
  $("telefono").removeAttribute("aria-invalid");
}

// ---------- Enviar solicitud ----------
async function enviar(evento) {
  evento.preventDefault();
  if (st.enviando || !st.datos) return;
  limpiarMensaje($("mensajes"));
  const telefono = normalizarTelefono($("telefono").value);
  $("telefono").value = telefono;
  if (!/^\d{10}$/.test(telefono)) {
    errorTelefono("Escribe los 10 dígitos de tu celular, sin espacios.");
    return;
  }
  limpiarErrorTelefono();

  st.enviando = true;
  const boton = $("btn-enviar");
  const original = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Enviando solicitud…";
  try {
    const r = await api("/api/cobros", {
      metodo: "POST",
      cuerpo: { o: st.codigo, metodo: "push", telefono, confirmo: true },
    });
    if ($("recordar").checked) almacenLocal.guardar(CLAVE_TELEFONO, telefono);
    else almacenLocal.borrar(CLAVE_TELEFONO);
    if (r.simulacion) mostrarSimulacion(true);
    st.cobro = r;
    st.terminado = false;
    $("texto-espera").textContent = `Abre la app de tu banco y autoriza el pago de ${pesos(r.monto)}. La solicitud vence a las ${hora(r.vence)}.`;
    $("estado-revision").textContent = "Revisando el pago…";
    mostrarVista("espera");
    $("titulo-espera").focus();
    programarSondeo(1500);
  } catch (error) {
    if (error.codigo === "TELEFONO_INVALIDO") {
      errorTelefono(error.message);
    } else if (error.status === 410 || error.codigo === "PEDIDO_VENCIDO") {
      errorPedido(TEXTO_VENCIDO, false);
    } else if (error.codigo === "PEDIDO_INVALIDO") {
      errorPedido(TEXTO_INVALIDO, false);
    } else {
      mostrarMensaje($("mensajes"), error.message);
    }
  } finally {
    st.enviando = false;
    boton.disabled = false;
    boton.textContent = original;
  }
}

// ---------- Sondeo ----------
function detenerSondeo() {
  clearTimeout(st.temporizador);
  st.temporizador = null;
}

function programarSondeo(ms = CADA_MS) {
  detenerSondeo();
  st.temporizador = setTimeout(sondear, ms);
}

async function sondear() {
  const cobro = st.cobro;
  if (!cobro || st.terminado) return;
  try {
    const r = await api(
      `/api/estado?o=${encodeURIComponent(st.codigo)}&metodo=push&id=${encodeURIComponent(cobro.id)}`,
    );
    if (st.cobro !== cobro || st.terminado) return;
    if (r.estado === "pagado") {
      pagado(r);
      return;
    }
    ponerTexto(
      $("estado-revision"),
      r.estado === "no_verificable"
        ? "Todavía no pude confirmar el pago con pey; sigo revisando…"
        : "Revisando el pago…",
    );
  } catch {
    if (st.cobro !== cobro || st.terminado) return;
    ponerTexto($("estado-revision"), "Sin conexión; sigo intentando…");
  }
  if (ahora() > cobro.vence) {
    vencio();
    return;
  }
  programarSondeo();
}

function pagado(r) {
  st.terminado = true;
  detenerSondeo();
  const monto = r.monto != null ? r.monto : st.cobro.monto;
  const simulado = Boolean(r.simulacion || (st.cobro && st.cobro.simulacion));
  $("pagado-detalle").textContent = `${pesos(monto)} · ${hora(r.pagadoEn || ahora())}${simulado ? " · SIMULACIÓN" : ""}`;
  mostrarVista("pagado");
  $("titulo-pagado").focus();
}

function vencio() {
  st.terminado = true;
  detenerSondeo();
  mostrarVista("vencido");
  $("titulo-vencido").focus();
}

function otraVez() {
  st.cobro = null;
  st.terminado = false;
  limpiarMensaje($("mensajes"));
  mostrarVista("formulario");
  $("telefono").focus();
}

// ---------- Eventos ----------
function enlazarEventos() {
  $("form-pago").addEventListener("submit", enviar);
  $("telefono").addEventListener("input", (evento) => {
    const limpio = soloDigitos(evento.target.value).slice(0, 10);
    if (evento.target.value !== limpio) evento.target.value = limpio;
    if (limpio.length === 10) limpiarErrorTelefono();
  });
  $("telefono").addEventListener("paste", (evento) => {
    const texto = evento.clipboardData && evento.clipboardData.getData("text");
    if (!texto) return;
    evento.preventDefault();
    evento.target.value = normalizarTelefono(texto);
    if (evento.target.value.length === 10) limpiarErrorTelefono();
  });
  $("recordar").addEventListener("change", (evento) => {
    if (!evento.target.checked) almacenLocal.borrar(CLAVE_TELEFONO);
  });
  $("btn-otra-vez").addEventListener("click", otraVez);
  $("btn-reintentar-pedido").addEventListener("click", cargarPedido);
}

enlazarEventos();
st.codigo = new URLSearchParams(window.location.search).get("o");
if (!st.codigo) errorPedido(TEXTO_INVALIDO, false);
else cargarPedido();
