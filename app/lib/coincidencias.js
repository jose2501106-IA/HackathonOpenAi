// Veredicto de una captura: lo decide CÓDIGO con los pagos reales de pey, nunca el modelo (K07.3, CONTRATO-API /api/revisar).
// Con ticket manda el estado de ese cobro; sin ticket se buscan pagos PAID recientes (2 h). Nunca se dice "falso".
// Hora de CDMX = UTC−6 todo el año (K03.9).
import { aCentavos } from "./http.js";
// `import * as`: si el otro módulo cambia o le falta una exportación, no truena; se usa el respaldo de SIMULACIÓN.
import * as estadoMod from "./estado.js";
import * as peyMod from "./pey.js";

const MIN = 60_000;
export const VENTANA_MS = 15 * MIN; // misma hora = ±15 min
export const RECIENTES_MS = 2 * 60 * MIN; // últimas 2 h
const DESFASE_CDMX_MS = -6 * 60 * MIN;
const TOLERANCIA_CENTAVOS = 1; // ±$0.01

export const TITULOS = Object.freeze({
  ya_cayo: "¡Ya cayó!",
  todavia_no_cae: "Todavía no cae",
  coincide: "Coincide",
  dudoso: "Revísalo",
  no_encontrado: "No lo encuentro en pey",
  ilegible: "No pude leer la captura",
  no_verificable: "No pude revisar en pey",
});

export function pesos(monto) {
  const n = Number(monto) || 0;
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Quién habla en cada mensaje. En SIMULACIÓN no se consultó a pey, así que ningún texto dice que pey
// confirmó o que no tiene nada: se habla del cobro de SIMULACIÓN y de los pagos de ejemplo.
const VOZ = Object.freeze({
  real: {
    titulos: {},
    confirmo: (m) => `pey confirmó el pago de ${m} de este cobro. Ya puedes entregar.`,
    sinPago: "pey no tiene ningún pago para este cobro: no entregues.",
    otroMonto: "pey tiene un pago con otro monto para este cobro: no entregues hasta revisarlo.",
    vencido: "pey no tiene ningún pago para este cobro y el QR ya venció: no entregues. Genera un cobro nuevo.",
    cuenta: "lo que cuenta es lo que dice pey.",
    registro: "que registró pey",
    hayPago: "pey tiene un pago",
    noEncuentro: "No encuentro este pago en tus cobros de pey de las últimas 2 horas.",
  },
  simulacion: {
    titulos: { no_encontrado: "No lo encuentro", no_verificable: "No pude revisar" },
    confirmo: (m) => `Pago simulado de ${m} registrado en este cobro (SIMULACIÓN). En un cobro real lo confirma pey.`,
    sinPago: "Este cobro de SIMULACIÓN no tiene ningún pago: no entregues.",
    otroMonto: "Este cobro de SIMULACIÓN tiene un pago con otro monto: no entregues hasta revisarlo.",
    vencido: "Este cobro de SIMULACIÓN no tiene pago y ya venció: no entregues. Genera un cobro nuevo.",
    cuenta: "lo que cuenta es el estado del cobro.",
    registro: "de los pagos de ejemplo (SIMULACIÓN)",
    hayPago: "Hay un pago de ejemplo (SIMULACIÓN)",
    noEncuentro: "No encuentro este pago en los pagos de ejemplo (SIMULACIÓN).",
  },
});

const aMs = (fecha) => (typeof fecha === "number" ? fecha : Date.parse(fecha));

/** "HH:MM" en hora de CDMX para un ISO o milisegundos. */
export function horaCdmx(fecha) {
  const t = aMs(fecha);
  return Number.isFinite(t) ? new Date(t + DESFASE_CDMX_MS).toISOString().slice(11, 16) : null;
}

export function fechaCdmx(ms) {
  return new Date(ms + DESFASE_CDMX_MS).toISOString().slice(0, 10);
}

/** Instante (ms) de la captura: fecha leída (o la de hoy en CDMX) + hora leída, en UTC−6. null si no hay hora. */
export function instanteDeCaptura(leido, ahora) {
  if (!leido?.hora) return null;
  let t = Date.parse(`${leido.fecha || fechaCdmx(ahora)}T${leido.hora}:00-06:00`);
  if (!Number.isFinite(t)) return null;
  if (!leido.fecha && t > ahora + VENTANA_MS) t -= 24 * 60 * MIN; // 23:58 leído a las 00:05 = ayer
  return t;
}

const mismoMonto = (a, b) => Math.abs(aCentavos(a) - aCentavos(b)) <= TOLERANCIA_CENTAVOS;
const normalizarClave = (c) => (typeof c === "string" ? c.replace(/\s+/g, "").toUpperCase() : "");

function veredicto(codigo, mensaje, detalle = "", voz = VOZ.real) {
  return { codigo, titulo: voz.titulos[codigo] ?? TITULOS[codigo], mensaje, detalle };
}

function resumenLectura(leido) {
  if (leido.monto == null) return "";
  return `La captura dice ${pesos(leido.monto)}${leido.hora ? ` a las ${leido.hora}` : ""}.`;
}

function detalleConCobro(leido, montoCobro, voz) {
  if (!leido.legible || leido.monto == null) {
    return leido.legible && !leido.es_comprobante
      ? `La imagen no parece un comprobante; ${voz.cuenta}`
      : `No pude leer bien la captura; ${voz.cuenta}`;
  }
  if (!mismoMonto(leido.monto, montoCobro)) {
    return `La captura dice ${pesos(leido.monto)}; tu cobro es de ${pesos(montoCobro)}.`;
  }
  return resumenLectura(leido);
}

function pagoDe(p) {
  const pago = { id: p.id ?? null, monto: p.monto ?? null, pagadoEn: p.fechaPago ?? null, claveRastreo: p.claveRastreo ?? null };
  if (p.simulacion) pago.simulacion = true;
  return pago;
}

function conCobro(leido, cobro, estado, voz) {
  const montoCobro = Number.isFinite(Number(cobro.montoCentavos)) ? Number(cobro.montoCentavos) / 100 : Number(estado?.monto) || 0;
  const detalle = detalleConCobro(leido, montoCobro, voz);
  const e = estado?.estado;
  if (e === "pagado") {
    return {
      veredicto: veredicto("ya_cayo", voz.confirmo(pesos(montoCobro)), detalle, voz),
      pago: {
        id: estado.transactionId ?? estado.id ?? cobro.id ?? null,
        monto: estado.monto ?? montoCobro,
        pagadoEn: estado.pagadoEn ?? null,
        claveRastreo: null,
      },
    };
  }
  if (e === "pendiente" || e === "expirado") {
    // Diga lo que diga la captura: sin pago en pey no se entrega.
    let mensaje = voz.sinPago;
    if (estado.aviso === "pago_con_monto_distinto") {
      mensaje = voz.otroMonto;
    } else if (e === "expirado") {
      mensaje = voz.vencido;
    }
    return { veredicto: veredicto("todavia_no_cae", mensaje, detalle, voz), pago: null };
  }
  // no_verificable (404, red, 5xx) o estado desconocido: no sabemos, así que no se entrega todavía.
  return {
    veredicto: veredicto(
      "no_verificable",
      "Ahorita no pude confirmar este cobro con pey. No entregues todavía: intenta de nuevo con «¿Ya cayó?».",
      detalle,
      voz,
    ),
    pago: null,
  };
}

function sinCobro(leido, pagos, ahora, voz) {
  if (!leido.legible || !leido.es_comprobante || leido.monto == null) {
    const mensaje =
      leido.legible && !leido.es_comprobante
        ? "Esto no parece un comprobante de pago. Escribe el monto o usa «¿Ya cayó?»."
        : "Escribe el monto o usa «¿Ya cayó?».";
    return { veredicto: veredicto("ilegible", mensaje, ""), pago: null };
  }
  const detalle = resumenLectura(leido);
  if (!Array.isArray(pagos)) {
    return {
      veredicto: veredicto(
        "no_verificable",
        "Ahorita no pude revisar tus pagos en pey. No entregues todavía: intenta de nuevo en un momento.",
        detalle,
      ),
      pago: null,
    };
  }
  const desde = ahora - RECIENTES_MS;
  const candidatos = pagos.filter((p) => {
    if (!p || !mismoMonto(p.monto, leido.monto)) return false;
    const t = aMs(p.fechaPago);
    return !Number.isFinite(t) || t >= desde; // solo las últimas 2 h (defensa extra al filtro de pey)
  });

  const clave = normalizarClave(leido.clave_rastreo);
  const porClave = clave ? candidatos.find((p) => normalizarClave(p.claveRastreo) === clave) : null;
  // TODO(⚪): que metadata.trackingKey de pey sea la clave de rastreo SPEI (K07.3, SB21).
  if (porClave) {
    return {
      veredicto: veredicto(
        "coincide",
        `Coincide con el pago de ${pesos(porClave.monto)} de las ${horaCdmx(porClave.fechaPago) ?? "--:--"} ${voz.registro}.`,
        `${detalle} La clave de rastreo también coincide.`.trim(),
        voz,
      ),
      pago: pagoDe(porClave),
    };
  }

  const tCaptura = instanteDeCaptura(leido, ahora);
  if (tCaptura != null) {
    const cercano = candidatos
      .map((p) => ({ p, d: Math.abs(aMs(p.fechaPago) - tCaptura) }))
      .filter((x) => Number.isFinite(x.d) && x.d <= VENTANA_MS)
      .sort((a, b) => a.d - b.d)[0];
    if (cercano) {
      return {
        veredicto: veredicto(
          "coincide",
          `Coincide con el pago de ${pesos(cercano.p.monto)} de las ${horaCdmx(cercano.p.fechaPago)} ${voz.registro}.`,
          detalle,
          voz,
        ),
        pago: pagoDe(cercano.p),
      };
    }
  }

  if (candidatos.length) {
    const ref = tCaptura ?? ahora;
    const elegido = [...candidatos].sort((a, b) => Math.abs(aMs(a.fechaPago) - ref) - Math.abs(aMs(b.fechaPago) - ref))[0];
    const horaPago = horaCdmx(elegido.fechaPago);
    const mensaje = leido.hora
      ? `${voz.hayPago} de ${pesos(elegido.monto)}${horaPago ? ` a las ${horaPago}` : ""}, pero la captura dice ${leido.hora}. Revisa antes de entregar.`
      : `${voz.hayPago} de ${pesos(elegido.monto)}${horaPago ? ` a las ${horaPago}` : ""}, pero no sé la hora de la captura para compararla. Revisa antes de entregar.`;
    return { veredicto: veredicto("dudoso", mensaje, detalle, voz), pago: pagoDe(elegido) };
  }

  const conClave = leido.clave_rastreo ? `la clave de rastreo ${leido.clave_rastreo}` : "la clave de rastreo del comprobante";
  return {
    veredicto: veredicto(
      "no_encontrado",
      `${voz.noEncuentro} Si te transfirieron directo a tu cuenta, revisa tu banco o el CEP de Banxico con ${conClave}.`,
      detalle,
      voz,
    ),
    pago: null,
  };
}

/** FUNCIÓN PURA. → { veredicto: { codigo, titulo, mensaje, detalle }, pago | null }.
 *  cobro = datos del ticket ({ id, montoCentavos, … }) o null; estadoCobro = objeto de /api/estado;
 *  pagosRecientes = [{ id, monto, fechaPago, claveRastreo }] o null si no se pudieron consultar. */
export function decidirVeredicto({
  leido,
  cobro = null,
  estadoCobro = null,
  pagosRecientes = null,
  ahora = Date.now(),
  simulacion = false,
} = {}) {
  const voz = simulacion ? VOZ.simulacion : VOZ.real;
  const lectura = {
    es_comprobante: leido?.es_comprobante === true,
    monto: typeof leido?.monto === "number" && Number.isFinite(leido.monto) ? leido.monto : null,
    fecha: leido?.fecha ?? null,
    hora: leido?.hora ?? null,
    clave_rastreo: leido?.clave_rastreo ?? null,
    legible: leido?.legible === true,
  };
  return cobro ? conCobro(lectura, cobro, estadoCobro, voz) : sinCobro(lectura, pagosRecientes, ahora, voz);
}

// ---------- orquestador (con E/S) ----------

/** Pagos de ejemplo para SIMULACIÓN (sin llave de pey): etiquetados y con id "sim_". */
export function pagosDeSimulacion(ahora = Date.now()) {
  return [
    { id: "sim_pago_1", monto: 1, fechaPago: new Date(ahora - 6 * MIN).toISOString(), claveRastreo: "SIMULACION001", simulacion: true },
    { id: "sim_pago_2", monto: 15, fechaPago: new Date(ahora - 48 * MIN).toISOString(), claveRastreo: null, simulacion: true },
  ];
}

function estadoDeRespaldo(t) {
  const base = {
    id: t.id ?? null,
    estado: "no_verificable",
    monto: (Number(t.montoCentavos) || 0) / 100,
    pagadoEn: null,
    transactionId: null,
    aviso: "estado_no_disponible",
    modoPago: t.modoPago ?? null,
  };
  if (t.modoPago !== "simulacion") return base;
  // SIMULACIÓN: pagado solo si el ticket firmado trae simPagadoEn (igual que /api/estado).
  return { ...base, estado: t.simPagadoEn ? "pagado" : "pendiente", pagadoEn: t.simPagadoEn ?? null, aviso: "respaldo_simulacion" };
}

async function obtenerEstado(ticketDatos, cfg, ahora, resolverEstado) {
  if (typeof resolverEstado !== "function") return estadoDeRespaldo(ticketDatos);
  try {
    return await resolverEstado(ticketDatos, cfg, ahora);
  } catch (e) {
    console.warn("revisar_estado_fallo", e?.codigo || e?.name || "Error");
    return { ...estadoDeRespaldo(ticketDatos), estado: "no_verificable", aviso: "pey_no_responde" };
  }
}

async function obtenerPagos(cfg, ahora, listarPagosRecientes) {
  // En SIMULACIÓN nunca se llama a pey (aunque exista una llave).
  if (cfg.modoPago === "simulacion") return { pagos: pagosDeSimulacion(ahora), simulacion: true };
  if (typeof listarPagosRecientes !== "function") return { pagos: null, simulacion: false };
  try {
    const desdeEpoch = Math.floor((ahora - RECIENTES_MS) / 1000); // segundos Unix, como datePaid de pey (K03.5)
    const pagos = await listarPagosRecientes({ desdeEpoch }, cfg);
    return { pagos: Array.isArray(pagos) ? pagos : null, simulacion: false };
  } catch (e) {
    console.warn("revisar_pagos_fallo", e?.codigo || e?.name || "Error");
    return { pagos: null, simulacion: false };
  }
}

/** Une lectura + pey. `deps` permite inyectar resolverEstado/listarPagosRecientes en pruebas. */
export async function revisarCaptura({ leido, ticketDatos = null }, cfg, { ahora = Date.now(), deps = {} } = {}) {
  const resolverEstado = "resolverEstado" in deps ? deps.resolverEstado : estadoMod.resolverEstado;
  const listarPagosRecientes = "listarPagosRecientes" in deps ? deps.listarPagosRecientes : peyMod.listarPagosRecientes;

  if (ticketDatos) {
    const estadoCobro = await obtenerEstado(ticketDatos, cfg, ahora, resolverEstado);
    const simulacion = ticketDatos.modoPago === "simulacion";
    return decidirVeredicto({ leido, cobro: ticketDatos, estadoCobro, pagosRecientes: null, ahora, simulacion });
  }
  const { pagos, simulacion } = await obtenerPagos(cfg, ahora, listarPagosRecientes);
  const r = decidirVeredicto({ leido, cobro: null, estadoCobro: null, pagosRecientes: pagos, ahora, simulacion });
  if (simulacion && Array.isArray(pagos)) {
    r.veredicto.detalle = `${r.veredicto.detalle} Se comparó con pagos de ejemplo (SIMULACIÓN).`.trim();
  }
  return r;
}
