// Punto de venta del taquero: mesas y órdenes, inventario y reporte.
import { api, dinero, horaCDMX, hoyCDMX, el, pintarFranja, pintarTotales, cantidadLegible } from "./comun.js";

const LLAVE_PIN = "abanico.pin";
const $ = (id) => document.getElementById(id);

let salud = null;
let datos = null; // respuesta de /api/caja-estado
let mesaSel = null; // id de la mesa elegida
// Borrador de la orden que se está capturando (para no perder clics entre refrescos).
let borrador = null; // { mesaId, cantidades: Map, descuentoOrdenPct, sucio, nueva }
let guardando = false;
let mensajeGuardado = "";
let temporizadorGuardar = null;
let temporizadorRefresco = null;
let pestana = "mesas";

const leerPin = () => {
  try {
    return sessionStorage.getItem(LLAVE_PIN) || "";
  } catch {
    return "";
  }
};
const guardarPin = (p) => {
  try {
    if (p) sessionStorage.setItem(LLAVE_PIN, p);
    else sessionStorage.removeItem(LLAVE_PIN);
  } catch {
    /* sin almacenamiento */
  }
};

// Llamada a rutas de caja con el PIN. Un 401 regresa a la pantalla de PIN.
async function apiCaja(ruta, opciones = {}) {
  const pin = leerPin();
  try {
    return await api(ruta, { ...opciones, headers: pin ? { "x-caja-pin": pin } : {} });
  } catch (e) {
    if (e.status === 401) {
      guardarPin("");
      mostrarPin(e.message);
    }
    throw e;
  }
}

function mostrarError(texto) {
  const n = $("error-global");
  n.textContent = texto || "";
  n.hidden = !texto;
}

function mostrarPin(mensaje) {
  clearTimeout(temporizadorRefresco);
  $("vista-caja").hidden = true;
  $("vista-pin").hidden = false;
  $("error-pin").textContent = mensaje && !/PIN/i.test(mensaje) ? mensaje : mensaje ? "PIN incorrecto. Intenta de nuevo." : "";
  $("pin").value = "";
  $("pin").focus();
}

function mostrarCaja() {
  $("vista-pin").hidden = true;
  $("vista-caja").hidden = false;
}

// ---------- Estado general ----------
async function refrescar() {
  clearTimeout(temporizadorRefresco);
  try {
    datos = await apiCaja("/api/caja-estado");
    salud = datos.salud || salud;
    mostrarError("");
    mostrarCaja();
    pintarFranja($("franja"), { modo: salud?.modo, cobroPrueba: salud?.cobroPrueba, montoPrueba: salud?.montoPrueba });
    if (pestana === "mesas") pintarMesas();
  } catch (e) {
    if (e.status === 401) return;
    mostrarError(e.message);
  }
  temporizadorRefresco = setTimeout(refrescar, 4000);
}

function estadoMesa(orden) {
  if (!orden) return { texto: "Libre", clase: "estado-libre" };
  if (orden.estado === "abierta") return { texto: `Abierta · ${dinero(orden.totales.total)}`, clase: "estado-abierta" };
  if (orden.estado === "cobrando") return { texto: "Cobrando…", clase: "estado-cobrando" };
  if (orden.estado === "pagada") return { texto: "Pagada ✓", clase: "estado-pagada" };
  return { texto: orden.estado, clase: "estado-libre" };
}

function pintarMesas() {
  if (!datos) return;
  const cont = $("mesas");
  const enfocado = document.activeElement?.dataset?.mesa;
  cont.replaceChildren(
    ...datos.mesas.map((mesa) => {
      const est = estadoMesa(mesa.orden);
      const b = el("button", {
        clase: "mesa-btn",
        attrs: { type: "button", "aria-pressed": String(mesa.id === mesaSel), "data-mesa": mesa.id },
      },
        el("span", { clase: "mesa-nombre", texto: mesa.nombre }),
        el("span", { clase: `estado ${est.clase}`, texto: est.texto }),
      );
      b.addEventListener("click", () => elegirMesa(mesa.id));
      return b;
    }),
  );
  if (enfocado) cont.querySelector(`[data-mesa="${enfocado}"]`)?.focus();
  pintarDetalle();
}

function mesaActual() {
  return datos?.mesas.find((x) => x.id === mesaSel) || null;
}

function borradorDesde(mesa, { nueva = false } = {}) {
  const cantidades = new Map();
  const o = mesa.orden;
  if (o && o.estado !== "pagada" && !nueva) for (const r of o.renglones) cantidades.set(r.productoId, r.cantidad);
  return {
    mesaId: mesa.id,
    cantidades,
    descuentoOrdenPct: o && o.estado !== "pagada" && !nueva ? o.descuentoOrdenPct || 0 : 0,
    sucio: false,
    nueva,
  };
}

function elegirMesa(id) {
  if (borrador?.sucio) guardarAhora();
  mesaSel = id;
  const mesa = mesaActual();
  borrador = mesa ? borradorDesde(mesa) : null;
  mensajeGuardado = "";
  pintarMesas();
  $("detalle-mesa").querySelector("h2")?.focus();
}

// ---------- Detalle de la mesa ----------
function pintarDetalle() {
  const cont = $("detalle-mesa");
  const mesa = mesaActual();
  if (!mesa) {
    cont.replaceChildren(el("p", { clase: "vacio", texto: "Elige una mesa para capturar su orden." }));
    return;
  }
  const o = mesa.orden;
  // Sincroniza el borrador con el servidor si no hay cambios pendientes.
  if (!borrador || borrador.mesaId !== mesa.id) borrador = borradorDesde(mesa);
  else if (!borrador.sucio && !guardando && !borrador.nueva) borrador = borradorDesde(mesa);
  if (borrador.nueva && o && o.estado !== "pagada") borrador.nueva = false; // ya se creó la orden nueva

  const enfocadoId = document.activeElement?.id;
  const titulo = el("h2", { texto: mesa.nombre, attrs: { tabindex: "-1" } });
  const nodos = [];

  const cobrando = o?.estado === "cobrando";
  const pagada = o?.estado === "pagada" && !borrador.nueva;

  if (cobrando) {
    nodos.push(el("div", { clase: "aviso aviso-info", attrs: { role: "status" } },
      el("p", { texto: "El cliente está pagando. No se puede editar la orden." }),
      o.cobro ? el("p", { clase: "nota", texto: `Solicitud de ${dinero(o.cobro.montoCobrado)} a ${o.cobro.telefonoOculto} · vence ${horaCDMX(o.cobro.expiraEn)}` }) : null,
    ));
  }
  if (o?.aviso?.mensaje && o.estado === "abierta") {
    nodos.push(el("div", { clase: "aviso aviso-error", texto: `Último intento de cobro: ${o.aviso.mensaje}` }));
  }

  const izquierda = el("div");
  const derecha = el("div");

  if (pagada) {
    const nuevo = el("button", { texto: "Nueva orden", attrs: { type: "button", id: "btn-nueva" } });
    nuevo.addEventListener("click", () => {
      borrador = borradorDesde(mesa, { nueva: true });
      pintarDetalle();
      $("detalle-mesa").querySelector(".contador button")?.focus();
    });
    izquierda.append(el("div", { clase: "aviso aviso-ok", attrs: { role: "status" } },
      el("p", { texto: `Pagada ✓ ${dinero(o.totales.total)}${o.pagadaEn ? ` a las ${horaCDMX(o.pagadaEn)}` : ""}` }),
      o.cobro && o.cobro.montoCobrado !== o.totales.total ? el("p", { clase: "nota", texto: `Cobrado: ${dinero(o.cobro.montoCobrado)} (MODO PRUEBA)` }) : null,
    ), nuevo);
    derecha.append(resumenServidor(o));
  } else {
    izquierda.append(catalogo(cobrando));
    derecha.append(resumen(o, cobrando));
  }

  derecha.append(bloqueNfc(mesa));

  cont.replaceChildren(el("div", { clase: "tarjeta" }, titulo, ...nodos, el("div", { clase: "pos" }, izquierda, derecha)));
  if (enfocadoId) document.getElementById(enfocadoId)?.focus();
}

function catalogo(bloqueado) {
  const frag = el("div");
  const porCategoria = new Map();
  for (const p of datos.catalogo) {
    if (!porCategoria.has(p.categoria)) porCategoria.set(p.categoria, []);
    porCategoria.get(p.categoria).push(p);
  }
  for (const [cat, productos] of porCategoria) {
    frag.append(el("h3", { clase: "categoria", texto: cat }));
    for (const p of productos) {
      const cant = borrador.cantidades.get(p.id) || 0;
      const menos = el("button", { clase: "boton-sec", texto: "−", attrs: { type: "button", id: `menos-${p.id}`, "aria-label": `Quitar un ${p.nombre}` } });
      const mas = el("button", { texto: "+", attrs: { type: "button", id: `mas-${p.id}`, "aria-label": `Agregar un ${p.nombre}` } });
      const salida = el("output", { texto: cant, attrs: { "aria-live": "polite", "aria-label": `Cantidad de ${p.nombre}` } });
      if (bloqueado) {
        menos.disabled = true;
        mas.disabled = true;
      } else {
        menos.disabled = cant === 0;
        menos.addEventListener("click", () => cambiar(p.id, -1));
        mas.addEventListener("click", () => cambiar(p.id, +1));
      }
      frag.append(el("div", { clase: "producto" },
        el("div", { clase: "producto-info" },
          el("div", { clase: "producto-nombre", texto: p.nombre }),
          el("div", { clase: "producto-precio", texto: dinero(p.precio) }),
          p.descuentoPct > 0 ? el("span", { clase: "promo", texto: `−${p.descuentoPct} %${p.promo ? ` ${p.promo}` : ""}` }) : null,
        ),
        el("div", { clase: "contador" }, menos, salida, mas),
      ));
    }
  }
  // Descuento a la orden
  const lbl = el("label", { texto: "Descuento a la orden (%)", attrs: { for: "descuento-orden" } });
  const inp = el("input", { attrs: { id: "descuento-orden", type: "number", min: "0", max: "100", step: "1", inputmode: "numeric" } });
  inp.value = String(borrador.descuentoOrdenPct || 0);
  inp.disabled = bloqueado;
  inp.addEventListener("input", () => {
    let v = Number.parseInt(inp.value, 10);
    if (!Number.isFinite(v) || v < 0) v = 0;
    if (v > 100) v = 100;
    borrador.descuentoOrdenPct = v;
    programarGuardado();
  });
  frag.append(el("div", { clase: "tarjeta mt" }, lbl, inp));
  return frag;
}

function cambiar(productoId, delta) {
  const actual = borrador.cantidades.get(productoId) || 0;
  const nueva = Math.max(0, Math.min(99, actual + delta));
  if (nueva === 0) borrador.cantidades.delete(productoId);
  else borrador.cantidades.set(productoId, nueva);
  programarGuardado();
  pintarDetalle();
}

function programarGuardado() {
  borrador.sucio = true;
  mensajeGuardado = "Guardando…";
  actualizarIndicador();
  clearTimeout(temporizadorGuardar);
  temporizadorGuardar = setTimeout(guardarAhora, 400);
}

async function guardarAhora() {
  clearTimeout(temporizadorGuardar);
  if (!borrador?.sucio) return;
  if (guardando) {
    temporizadorGuardar = setTimeout(guardarAhora, 200);
    return;
  }
  const b = borrador;
  const cuerpo = {
    mesaId: b.mesaId,
    items: [...b.cantidades].map(([productoId, cantidad]) => ({ productoId, cantidad })),
    descuentoOrdenPct: b.descuentoOrdenPct || 0,
  };
  b.sucio = false;
  guardando = true;
  try {
    const r = await apiCaja("/api/caja-orden", { metodo: "POST", cuerpo });
    const mesa = datos.mesas.find((x) => x.id === b.mesaId);
    if (mesa) mesa.orden = r.orden;
    if (b.nueva && r.orden) b.nueva = false;
    mensajeGuardado = cuerpo.items.length ? "Guardado ✓" : "Orden cancelada";
    mostrarError("");
  } catch (e) {
    mensajeGuardado = "";
    mostrarError(e.message);
    // Si el cliente ya está pagando, recargamos la verdad del servidor.
    if (e.codigo === "ORDEN_EN_COBRO") borrador = null;
  } finally {
    guardando = false;
  }
  if (b.sucio) return guardarAhora();
  if (b.mesaId === mesaSel) pintarMesas();
}

function actualizarIndicador() {
  const n = $("estado-guardado");
  if (n) n.textContent = mensajeGuardado;
}

// Resumen con lo que capturó el taquero; totales del servidor (fuente de verdad).
function resumen(o, bloqueado) {
  const sec = el("section", { attrs: { "aria-labelledby": "titulo-resumen" } });
  sec.append(el("h3", { texto: "Orden", attrs: { id: "titulo-resumen" } }));
  const lista = el("ul", { clase: "renglones" });
  const porId = new Map(datos.catalogo.map((p) => [p.id, p]));
  for (const [id, cant] of borrador.cantidades) {
    const p = porId.get(id);
    if (!p) continue;
    lista.append(el("li", { clase: "renglon" },
      el("div", { clase: "renglon-info" }, el("div", { clase: "renglon-nombre", texto: `${cant} × ${p.nombre}` })),
      el("div", { clase: "renglon-importe", texto: dinero(p.precio * cant) }),
    ));
  }
  if (!borrador.cantidades.size) lista.append(el("li", { clase: "vacio", texto: "Sin productos todavía." }));
  sec.append(lista);
  const orden = o && o.estado !== "pagada" ? o : null;
  if (orden && borrador.cantidades.size) sec.append(pintarTotales(orden.totales));
  sec.append(el("p", { clase: "estado-guardado", texto: mensajeGuardado, attrs: { id: "estado-guardado", "aria-live": "polite" } }));
  if (!bloqueado && (borrador.cantidades.size || orden)) {
    const cancelar = el("button", { clase: "boton-sec", texto: "Cancelar orden", attrs: { type: "button", id: "btn-cancelar" } });
    cancelar.addEventListener("click", () => {
      borrador.cantidades.clear();
      borrador.descuentoOrdenPct = 0;
      programarGuardado();
      pintarDetalle();
    });
    sec.append(cancelar);
  }
  return sec;
}

function resumenServidor(o) {
  const sec = el("section");
  sec.append(el("h3", { texto: "Orden pagada" }));
  const lista = el("ul", { clase: "renglones" });
  for (const r of o.renglones) {
    lista.append(el("li", { clase: "renglon" },
      el("div", { clase: "renglon-info" }, el("div", { clase: "renglon-nombre", texto: `${r.cantidad} × ${r.nombre}` })),
      el("div", { clase: "renglon-importe", texto: dinero(r.importe) }),
    ));
  }
  sec.append(lista, pintarTotales(o.totales));
  return sec;
}

function bloqueNfc(mesa) {
  const url = el("p", { clase: "url-nfc", texto: mesa.urlNfc || "" });
  const copiar = el("button", { clase: "boton-sec", texto: "Copiar", attrs: { type: "button", id: `copiar-${mesa.id}` } });
  const estadoCopia = el("span", { clase: "nota", attrs: { "aria-live": "polite" } });
  copiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mesa.urlNfc);
      estadoCopia.textContent = " Copiada ✓";
    } catch {
      estadoCopia.textContent = " No se pudo copiar; selecciónala a mano.";
    }
  });
  const abrir = el("a", { texto: "Abrir", attrs: { href: mesa.urlNfc, target: "_blank", rel: "noopener", class: "boton boton-sec boton-enlace" } });
  return el("div", { clase: "tarjeta mt" },
    el("h3", { texto: "Etiqueta NFC de la mesa" }),
    el("p", { clase: "nota", texto: "Graba esta URL en la etiqueta NFC de la mesa." }),
    url,
    el("div", { clase: "fila" }, copiar, abrir),
    estadoCopia,
  );
}

// ---------- Inventario ----------
async function cargarInventario() {
  const cont = $("inventario");
  cont.replaceChildren(el("p", { clase: "vacio", texto: "Cargando…" }));
  try {
    const r = await apiCaja("/api/caja-inventario");
    const tabla = el("table");
    tabla.append(el("thead", {}, el("tr", {},
      el("th", { texto: "Ingrediente", attrs: { scope: "col" } }),
      el("th", { clase: "num", texto: "Existencia", attrs: { scope: "col" } }),
      el("th", { clase: "num", texto: "Mínimo", attrs: { scope: "col" } }),
    )));
    const cuerpo = el("tbody");
    for (const i of r.ingredientes) {
      cuerpo.append(el("tr", {},
        el("th", { attrs: { scope: "row" } }, document.createTextNode(i.nombre), i.bajo ? el("span", { clase: "bajo", texto: " Bajo" }) : null),
        el("td", { clase: "num", texto: cantidadLegible(i.existencia, i.unidad) }),
        el("td", { clase: "num", texto: cantidadLegible(i.minimo, i.unidad) }),
      ));
    }
    tabla.append(cuerpo);
    cont.replaceChildren(tabla);
  } catch (e) {
    cont.replaceChildren(el("div", { clase: "aviso aviso-error", texto: e.message }));
  }
}

// ---------- Reporte ----------
async function cargarReporte() {
  const cont = $("reporte");
  const fecha = $("fecha").value || hoyCDMX();
  cont.replaceChildren(el("p", { clase: "vacio", texto: "Cargando…" }));
  try {
    const r = await apiCaja(`/api/caja-reporte?fecha=${encodeURIComponent(fecha)}`);
    const cifra = (n, v) => el("div", { clase: "cifra" }, el("span", { texto: n }), el("strong", { texto: v }));
    const nodos = [
      el("div", { clase: "cifras" },
        cifra("Vendido", dinero(r.totalVendido)),
        cifra("Cobrado", dinero(r.totalCobrado)),
        cifra("Órdenes", String(r.ordenes)),
        cifra("Ticket promedio", dinero(r.ticketPromedio)),
      ),
    ];
    if (r.totalCobrado !== r.totalVendido && r.ordenes) {
      nodos.push(el("p", { clase: "nota", texto: "Cobrado puede ser menor que Vendido en MODO PRUEBA o SIMULACIÓN." }));
    }

    // Productos vendidos
    const tp = el("div", { clase: "tarjeta" }, el("h3", { texto: "Productos vendidos" }));
    if (r.productos?.length) {
      const t = el("table");
      t.append(el("thead", {}, el("tr", {},
        el("th", { texto: "Producto", attrs: { scope: "col" } }),
        el("th", { clase: "num", texto: "Cantidad", attrs: { scope: "col" } }),
        el("th", { clase: "num", texto: "Importe", attrs: { scope: "col" } }),
      )));
      const b = el("tbody");
      for (const p of r.productos) b.append(el("tr", {}, el("th", { texto: p.nombre, attrs: { scope: "row" } }), el("td", { clase: "num", texto: p.cantidad }), el("td", { clase: "num", texto: dinero(p.importe) })));
      t.append(b);
      tp.append(el("div", { clase: "tabla-env" }, t));
    } else tp.append(el("p", { clase: "vacio", texto: "Sin ventas este día." }));
    nodos.push(tp);

    // Por hora
    const th = el("div", { clase: "tarjeta" }, el("h3", { texto: "Ventas por hora" }));
    const horas = (r.porHora || []).filter((h) => h.ordenes > 0);
    if (horas.length) {
      const max = Math.max(...horas.map((h) => h.total), 1);
      const lista = el("ul", { clase: "barras" });
      for (const h of horas) {
        const relleno = el("div", { clase: "barra-relleno" });
        relleno.style.width = `${Math.round((h.total / max) * 100)}%`;
        lista.append(el("li", { clase: "barra" },
          el("span", { texto: `${String(h.hora).padStart(2, "0")}:00` }),
          el("div", { clase: "barra-fondo", attrs: { "aria-hidden": "true" } }, relleno),
          el("span", { texto: `${dinero(h.total)} · ${h.ordenes}` }),
        ));
      }
      th.append(lista);
    } else th.append(el("p", { clase: "vacio", texto: "Sin ventas este día." }));
    nodos.push(th);

    // Clientes
    nodos.push(el("div", { clase: "tarjeta" },
      el("h3", { texto: "Clientes" }),
      el("p", { texto: `Con celular registrado: ${r.clientes?.conCelular ?? 0}` }),
      el("p", { texto: `Recurrentes: ${r.clientes?.recurrentes ?? 0}` }),
    ));

    // Consumo
    const tc = el("div", { clase: "tarjeta" }, el("h3", { texto: "Consumo de ingredientes" }));
    if (r.consumo?.length) {
      const t = el("table");
      const b = el("tbody");
      for (const c of r.consumo) b.append(el("tr", {}, el("th", { texto: c.nombre, attrs: { scope: "row" } }), el("td", { clase: "num", texto: cantidadLegible(c.cantidad, c.unidad) })));
      t.append(b);
      tc.append(el("div", { clase: "tabla-env" }, t));
    } else tc.append(el("p", { clase: "vacio", texto: "Sin consumo este día." }));
    nodos.push(tc);

    cont.replaceChildren(...nodos);
  } catch (e) {
    cont.replaceChildren(el("div", { clase: "aviso aviso-error", texto: e.message }));
  }
}

async function pedirAnalisis() {
  const cont = $("analisis");
  const btn = $("btn-analisis");
  btn.disabled = true;
  cont.replaceChildren(el("p", { clase: "nota", texto: "Analizando…" }));
  try {
    const r = await apiCaja("/api/caja-analisis", { metodo: "POST", cuerpo: {} });
    if (!r.disponible) {
      cont.replaceChildren(el("div", { clase: "aviso aviso-info", texto: r.mensaje || "El análisis con IA no está disponible." }));
    } else {
      const a = r.analisis || {};
      const nodos = [el("p", { texto: a.resumen || "" })];
      if (a.reabastecer?.length) {
        nodos.push(el("h3", { texto: "Reabastecer" }));
        const ul = el("ul");
        for (const x of a.reabastecer) ul.append(el("li", { texto: `${x.ingrediente}: ${x.motivo}` }));
        nodos.push(ul);
      }
      if (a.observaciones?.length) {
        nodos.push(el("h3", { texto: "Observaciones" }));
        const ul = el("ul");
        for (const x of a.observaciones) ul.append(el("li", { texto: x }));
        nodos.push(ul);
      }
      nodos.push(el("p", { clase: "nota", texto: "Generado con IA: revísalo antes de decidir." }));
      cont.replaceChildren(...nodos);
    }
  } catch (e) {
    cont.replaceChildren(el("div", { clase: "aviso aviso-error", texto: e.message }));
  } finally {
    btn.disabled = false;
  }
}

// ---------- Pestañas ----------
const PESTANAS = ["mesas", "inventario", "reporte"];
function cambiarPestana(nombre, enfocar = false) {
  pestana = nombre;
  for (const p of PESTANAS) {
    const tab = $(`tab-${p}`);
    const activa = p === nombre;
    tab.setAttribute("aria-selected", String(activa));
    tab.tabIndex = activa ? 0 : -1;
    $(`panel-${p}`).hidden = !activa;
    if (activa && enfocar) tab.focus();
  }
  if (nombre === "mesas") pintarMesas();
  if (nombre === "inventario") cargarInventario();
  if (nombre === "reporte") cargarReporte();
}
for (const p of PESTANAS) {
  $(`tab-${p}`).addEventListener("click", () => cambiarPestana(p));
  $(`tab-${p}`).addEventListener("keydown", (ev) => {
    const i = PESTANAS.indexOf(p);
    if (ev.key === "ArrowRight") cambiarPestana(PESTANAS[(i + 1) % PESTANAS.length], true);
    if (ev.key === "ArrowLeft") cambiarPestana(PESTANAS[(i + PESTANAS.length - 1) % PESTANAS.length], true);
  });
}
$("fecha").value = hoyCDMX();
$("fecha").addEventListener("change", cargarReporte);
$("btn-analisis").addEventListener("click", pedirAnalisis);

$("form-pin").addEventListener("submit", (ev) => {
  ev.preventDefault();
  guardarPin($("pin").value.trim());
  refrescar();
});

// ---------- Arranque ----------
(async () => {
  try {
    salud = await api("/api/salud");
    pintarFranja($("franja"), { modo: salud.modo, cobroPrueba: salud.cobroPrueba, montoPrueba: salud.montoPrueba });
  } catch (e) {
    mostrarCaja();
    mostrarError(e.message);
  }
  if (salud?.cajaConPin && !leerPin()) mostrarPin();
  else refrescar();
})();
