// Reglas del punto de venta: órdenes, cobro CoDi con pey, confirmación y reportes.
// Contrato: docs/CONTRATO-API.md. La verdad del pago vive en pey; el inventario solo se descuenta con pago confirmado.
import crypto from "node:crypto";
import { ErrorApp } from "./errores.js";
import { armarRenglones, calcularTotales } from "./calculo.js";
import { centavos } from "./pey.js";
import { iguales } from "./seguridad.js";
import { NEGOCIO } from "./semilla.js";

export const MENSAJE_VENCIDO =
  "No recibimos el pago. Si no te llegó la notificación, tu número puede no estar registrado en CoDi.";
const MENSAJE_NO_VERIFICABLE = "No pudimos confirmar el pago con pey. Si ya pagaste, avisa al taquero antes de volver a pagar.";
const PAGADA_VISIBLE_MS = 30 * 60 * 1000;
const GRACIA_MS = 15_000; // espera extra tras la vigencia antes de dar el cobro por vencido
const GRACIA_SIN_RESPUESTA_MS = 120_000;
const CONSULTA_CADA_MS = 4_000;
const SIM_SIN_CODI_SEG = 20;

const ocultar = (tel) => (tel ? `******${tel.slice(-4)}` : null);

export function crearServicio({ config, almacen, pey, ahora = Date.now, log = console }) {
  const ultimaConsulta = new Map(); // ordenId → ms (por instancia; solo evita consultar a pey en cada sondeo)

  function vista(o) {
    if (!o) return null;
    return {
      id: o.id,
      mesaId: o.mesaId,
      estado: o.estado,
      renglones: o.renglones,
      descuentoOrdenPct: o.descuentoOrdenPct,
      totales: o.totales,
      cobro:
        o.montoCobrado && (o.estado === "cobrando" || o.estado === "pagada")
          ? {
              montoCobrado: o.montoCobrado,
              expiraEn: o.cobroExpiraEn ? new Date(o.cobroExpiraEn).toISOString() : null,
              telefonoOculto: ocultar(o.telefono),
              modoPrueba: o.montoCobrado !== o.totales.total,
            }
          : null,
      pagadaEn: o.pagadaEn ? new Date(o.pagadaEn).toISOString() : null,
      aviso: o.aviso || null,
      actualizadaEn: o.actualizadaEn ? new Date(o.actualizadaEn).toISOString() : null,
    };
  }

  async function mesaConToken(m, t) {
    const id = Number(m);
    const mesas = await almacen.mesas();
    const mesa = Number.isInteger(id) ? mesas.find((x) => x.id === id) : null;
    if (!mesa || typeof t !== "string" || !iguales(mesa.token, t)) {
      throw new ErrorApp("MESA_INVALIDA", "Esta etiqueta no es válida. Pide ayuda al taquero.", 404);
    }
    return mesa;
  }

  async function ordenDeMesa(mesaId) {
    const o = await almacen.ordenVisible(mesaId);
    if (o?.estado === "pagada" && ahora() - o.pagadaEn > PAGADA_VISIBLE_MS) return null;
    return o;
  }

  async function confirmar(o, { transactionId, montoCentavos, pagadoEn, origen }) {
    const r = await almacen.confirmarPago({ ordenId: o?.id, transactionId, montoCentavos, pagadoEn });
    if (r.resultado !== "pagada" && r.resultado !== "ya_pagada") {
      log.warn?.(`Pago no aplicado (${origen}): ${r.resultado}`);
    }
    return r;
  }

  // Si la orden está cobrando, pregunta a pey (o revisa la vigencia) y la cierra o la regresa a abierta.
  async function reconciliar(o) {
    if (o?.estado !== "cobrando") return o;
    const t = ahora();
    const vencida = o.cobroExpiraEn && t > o.cobroExpiraEn + GRACIA_MS;
    if (config.simulacion) {
      if (o.cobroExpiraEn && t > o.cobroExpiraEn) return (await almacen.revertirCobro(o.id, { codigo: "VENCIDO", mensaje: MENSAJE_VENCIDO })) || o;
      return o;
    }
    if (!o.peyTransactionId) {
      if (vencida) return (await almacen.revertirCobro(o.id, { codigo: "VENCIDO", mensaje: MENSAJE_VENCIDO })) || o;
      return o;
    }
    if (!vencida && t - (ultimaConsulta.get(o.id) || 0) < CONSULTA_CADA_MS) return o;
    ultimaConsulta.set(o.id, t);
    try {
      const tx = await pey.transaccion(o.peyTransactionId);
      if (tx?.status === "PAID") {
        const r = await confirmar(o, {
          transactionId: o.peyTransactionId,
          montoCentavos: centavos(tx.amountBreakdown?.base ?? tx.amount),
          pagadoEn: tx.datePaid ? tx.datePaid * 1000 : t,
          origen: "consulta",
        });
        return r.orden || (await almacen.ordenVisible(o.mesaId));
      }
      if (vencida) return (await almacen.revertirCobro(o.id, { codigo: "VENCIDO", mensaje: MENSAJE_VENCIDO })) || o;
    } catch (e) {
      log.warn?.(`No se pudo consultar a pey: ${e?.codigo || e?.message}`);
      if (o.cobroExpiraEn && t > o.cobroExpiraEn + GRACIA_SIN_RESPUESTA_MS) {
        return (await almacen.revertirCobro(o.id, { codigo: "NO_VERIFICABLE", mensaje: MENSAJE_NO_VERIFICABLE })) || o;
      }
    }
    return o;
  }

  return {
    vista,

    async verMesa({ m, t }) {
      const mesa = await mesaConToken(m, t);
      const orden = await reconciliar(await ordenDeMesa(mesa.id));
      return {
        negocio: { nombre: NEGOCIO.nombre },
        mesa: { id: mesa.id, nombre: mesa.nombre },
        orden: vista(orden && (orden.estado !== "pagada" || ahora() - orden.pagadaEn <= PAGADA_VISIBLE_MS) ? orden : null),
        modo: config.modo,
        cobroPrueba: !config.simulacion && config.cobroPrueba,
        montoPrueba: config.montoPrueba,
      };
    },

    async pagar({ m, t, telefono, recordar }) {
      const tel = typeof telefono === "string" ? telefono.replace(/\D/g, "") : "";
      if (!/^\d{10}$/.test(tel)) throw new ErrorApp("TELEFONO_INVALIDO", "Escribe tu número de celular a 10 dígitos.");
      const mesa = await mesaConToken(m, t);
      let o = await reconciliar(await ordenDeMesa(mesa.id));
      if (!o) throw new ErrorApp("SIN_ORDEN", "Esta mesa todavía no tiene una orden. Pide al taquero que la capture.", 409);
      if (o.estado === "pagada") throw new ErrorApp("YA_PAGADA", "Esta orden ya está pagada.", 409);
      if (o.estado === "cobrando") throw new ErrorApp("ORDEN_EN_COBRO", "Ya mandamos la solicitud de pago. Revisa la app de tu banco.", 409);
      const total = o.totales?.total || 0;
      if (total <= 0) throw new ErrorApp("ORDEN_VACIA", "La orden no tiene productos por cobrar.", 409);

      const monto = !config.simulacion && config.cobroPrueba ? Math.min(total, config.montoPrueba) : total;
      if (monto > config.montoMaximo) {
        throw new ErrorApp("MONTO_EXCEDE", "El total pasa el máximo permitido para cobrar en línea. Pide ayuda al taquero.", 409);
      }
      const simSinCodi = config.simulacion && tel.startsWith("00");
      const expiraEn = ahora() + (simSinCodi ? SIM_SIN_CODI_SEG : config.expiracionSeg) * 1000;
      o = await almacen.iniciarCobro(o.id, { telefono: tel, recordar: Boolean(recordar), montoCobrado: monto, expiraEn });
      if (!o) throw new ErrorApp("ORDEN_EN_COBRO", "Esta orden cambió hace un momento. Vuelve a intentar.", 409);

      if (config.simulacion) {
        await almacen.registrarTransaccion(o.id, { transactionId: `SIM-${crypto.randomUUID()}`, codiId: null });
        return { orden: vista(await almacen.ordenVisible(mesa.id)) };
      }
      try {
        const r = await pey.crearPush({
          montoCentavos: monto,
          telefono: tel,
          concepto: `${NEGOCIO.nombre} · ${mesa.nombre}`,
          numRef: String(ahora() % 10_000_000),
          metadata: { orden: o.id, mesa: String(mesa.id) },
          expiracionSeg: config.expiracionSeg,
        });
        if (!r?.transactionId) throw new ErrorApp("PEY_RECHAZO", "pey no regresó la transacción del cobro.", 502);
        await almacen.registrarTransaccion(o.id, { transactionId: r.transactionId, codiId: r.codiId ?? null });
      } catch (e) {
        const aviso =
          e instanceof ErrorApp
            ? { codigo: e.codigo, mensaje: e.message }
            : { codigo: "PEY_NO_DISPONIBLE", mensaje: "No pudimos mandar la solicitud de pago. Intenta de nuevo." };
        await almacen.revertirCobro(o.id, aviso);
        throw e instanceof ErrorApp ? e : new ErrorApp(aviso.codigo, aviso.mensaje, 503);
      }
      return { orden: vista(await almacen.ordenVisible(mesa.id)) };
    },

    async simularPago({ m, t }) {
      if (!config.simulacion) throw new ErrorApp("SOLO_SIMULACION", "Esto solo existe en SIMULACIÓN.", 403);
      const mesa = await mesaConToken(m, t);
      const o = await reconciliar(await ordenDeMesa(mesa.id));
      if (o?.estado !== "cobrando" || !o.peyTransactionId) throw new ErrorApp("SIN_COBRO", "No hay un cobro en curso en esta mesa.", 409);
      if (o.telefono?.startsWith("00")) throw new ErrorApp("SIN_COBRO", "SIMULACIÓN: este número simula un celular sin CoDi; el pago no llega.", 409);
      const r = await confirmar(o, { transactionId: o.peyTransactionId, montoCentavos: o.montoCobrado, pagadoEn: ahora(), origen: "simulacion" });
      return { orden: vista(r.orden) };
    },

    // Evento ya verificado (firma) y parseado.
    async procesarEvento(evento) {
      if (evento?.type !== "codi.pn.payment_received") return { ignorado: true };
      if (typeof evento.transactionId !== "string" || !Number.isFinite(Number(evento.amount))) return { resultado: "invalido" };
      const ordenId = evento.metadata?.externalMetadata?.orden;
      const r = await confirmar(
        typeof ordenId === "string" ? { id: ordenId } : null,
        {
          transactionId: evento.transactionId,
          montoCentavos: centavos(evento.amount),
          pagadoEn: Number.isFinite(evento.datePaid) ? evento.datePaid * 1000 : ahora(),
          origen: "webhook",
        },
      );
      return { resultado: r.resultado };
    },

    // --- Caja ---
    async estadoCaja({ origen }) {
      const [mesas, catalogo] = await Promise.all([almacen.mesas(), almacen.catalogo()]);
      const conOrden = await Promise.all(
        mesas.map(async (m) => ({
          id: m.id,
          nombre: m.nombre,
          urlNfc: `${origen}/mesa?m=${m.id}&t=${encodeURIComponent(m.token)}`,
          orden: vista(await reconciliar(await ordenDeMesa(m.id))),
        })),
      );
      return {
        negocio: { nombre: NEGOCIO.nombre },
        catalogo: catalogo.map(({ receta, ...p }) => p),
        mesas: conOrden,
      };
    },

    async guardarOrden({ mesaId, items, descuentoOrdenPct = 0 }) {
      const mesas = await almacen.mesas();
      if (!mesas.some((m) => m.id === mesaId)) throw new ErrorApp("MESA_INVALIDA", "Esa mesa no existe.", 404);
      const pct = Number(descuentoOrdenPct);
      const renglones = armarRenglones(items, await almacen.catalogo());
      const calc = calcularTotales(renglones, { descuentoOrdenPct: Number.isFinite(pct) ? pct : -1, ivaPct: NEGOCIO.ivaPct });
      const o = await almacen.guardarOrden(mesaId, calc);
      return { orden: vista(o) };
    },

    async inventario() {
      const ing = await almacen.ingredientes();
      return { ingredientes: ing.map((i) => ({ ...i, bajo: i.existencia <= i.minimo })) };
    },
  };
}
