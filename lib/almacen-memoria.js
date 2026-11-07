// Almacén en memoria: misma interfaz y mismas reglas que supabase/migrations/001_esquema.sql.
// Sirve para SIMULACIÓN local y pruebas. En Vercel cada instancia tiene su propia memoria: no lo uses para cobrar.
import crypto from "node:crypto";
import { ErrorApp } from "./errores.js";
import { INGREDIENTES, MESAS, PRODUCTOS } from "./semilla.js";
import { consumoDeOrden } from "./calculo.js";

const copia = (x) => structuredClone(x);

export function crearAlmacenMemoria({ ahora = Date.now } = {}) {
  const mesas = MESAS.map((m) => ({ ...m, token: `sim${m.id}` }));
  const productos = copia(PRODUCTOS);
  const ingredientes = new Map(INGREDIENTES.map((i) => [i.id, { ...i }]));
  const ordenes = []; // en orden de creación
  const clientes = new Map();
  const movimientos = [];

  const activa = (mesaId) => ordenes.find((o) => o.mesaId === mesaId && (o.estado === "abierta" || o.estado === "cobrando"));
  const tocar = (o) => {
    o.actualizadaEn = ahora();
    return o;
  };

  return {
    tipo: "memoria",
    async mesas() {
      return copia(mesas);
    },
    async catalogo() {
      return copia(productos);
    },
    async ordenVisible(mesaId) {
      const a = activa(mesaId);
      if (a) return copia(a);
      const pagadas = ordenes.filter((o) => o.mesaId === mesaId && o.estado === "pagada");
      return pagadas.length ? copia(pagadas[pagadas.length - 1]) : null;
    },
    async guardarOrden(mesaId, { renglones, totales, descuentoOrdenPct }) {
      let o = activa(mesaId);
      if (o?.estado === "cobrando") throw new ErrorApp("ORDEN_EN_COBRO", "El cliente está pagando esta orden; espera a que termine.", 409);
      if (!renglones.length) {
        if (o) tocar(o).estado = "cancelada";
        return null;
      }
      if (!o) {
        o = {
          id: crypto.randomUUID(), mesaId, estado: "abierta", telefono: null, recordar: false, montoCobrado: null,
          cobroExpiraEn: null, peyTransactionId: null, codiId: null, pagadaEn: null, creadaEn: ahora(),
        };
        ordenes.push(o);
      }
      Object.assign(o, { renglones: copia(renglones), totales: { ...totales }, descuentoOrdenPct, aviso: null });
      return copia(tocar(o));
    },
    async iniciarCobro(ordenId, { telefono, recordar, montoCobrado, expiraEn }) {
      const o = ordenes.find((x) => x.id === ordenId && x.estado === "abierta");
      if (!o) return null;
      Object.assign(o, { estado: "cobrando", telefono, recordar, montoCobrado, cobroExpiraEn: expiraEn, aviso: null, peyTransactionId: null, codiId: null });
      return copia(tocar(o));
    },
    async registrarTransaccion(ordenId, { transactionId, codiId }) {
      const o = ordenes.find((x) => x.id === ordenId);
      if (o && !o.peyTransactionId) Object.assign(tocar(o), { peyTransactionId: transactionId, codiId });
    },
    async revertirCobro(ordenId, aviso) {
      const o = ordenes.find((x) => x.id === ordenId && x.estado === "cobrando");
      if (!o) return null;
      Object.assign(o, { estado: "abierta", aviso: { ...aviso } });
      return copia(tocar(o));
    },
    // Una sola operación: orden pagada + descuento de ingredientes + cliente. Idempotente.
    async confirmarPago({ ordenId, transactionId, montoCentavos, pagadoEn }) {
      const o =
        (transactionId && ordenes.find((x) => x.peyTransactionId === transactionId)) ||
        (ordenId && ordenes.find((x) => x.id === ordenId)) ||
        null;
      if (!o) return { resultado: "no_encontrada" };
      if (o.estado === "pagada") return { resultado: o.peyTransactionId === transactionId ? "ya_pagada" : "transaccion_distinta", orden: copia(o) };
      if (o.estado === "cancelada") return { resultado: "cancelada" };
      if (o.peyTransactionId && o.peyTransactionId !== transactionId) return { resultado: "transaccion_distinta" };
      if (o.montoCobrado !== montoCentavos) return { resultado: "monto_distinto" };
      Object.assign(o, { estado: "pagada", pagadaEn: pagadoEn, peyTransactionId: transactionId, aviso: null });
      for (const [id, cant] of Object.entries(consumoDeOrden(o.renglones, productos))) {
        const ing = ingredientes.get(id);
        if (ing) ing.existencia -= cant;
        movimientos.push({ ordenId: o.id, ingredienteId: id, cantidad: cant });
      }
      if (o.recordar && o.telefono) {
        const c = clientes.get(o.telefono) || { telefono: o.telefono, visitas: 0, totalGastado: 0 };
        c.visitas += 1;
        c.totalGastado += o.totales.total;
        clientes.set(o.telefono, c);
      }
      return { resultado: "pagada", orden: copia(tocar(o)) };
    },
    async ingredientes() {
      return copia([...ingredientes.values()]);
    },
    async ordenesPagadas(desdeMs, hastaMs) {
      return copia(ordenes.filter((o) => o.estado === "pagada" && o.pagadaEn >= desdeMs && o.pagadaEn < hastaMs));
    },
    async clientes(telefonos) {
      return telefonos.filter((t) => clientes.has(t)).map((t) => copia(clientes.get(t)));
    },
  };
}
