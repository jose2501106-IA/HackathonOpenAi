// Traduce respuestas de pey a estados del cobro: pendiente | pagado | no_verificable (pey/07).
// "Pagado" exige status PAID y al menos el monto esperado: no basta con encontrar cualquier pago.
const MEDIO_CENTAVO = 0.005;
const fechaPago = (t) => (Number.isFinite(t?.datePaid) ? t.datePaid : null);
const alcanza = (t, esperado) => Number(t?.amount) + MEDIO_CENTAVO >= esperado;
const PENDIENTE = Object.freeze({ estado: "pendiente", monto: null, pagadoEn: null });

export function estadoDeTransaccion(tx, montoEsperado) {
  if (!tx || typeof tx !== "object") return { estado: "no_verificable", monto: null, pagadoEn: null };
  if (tx.status !== "PAID") return { ...PENDIENTE };
  if (!alcanza(tx, montoEsperado)) {
    return { estado: "no_verificable", monto: Number.isFinite(Number(tx.amount)) ? Number(tx.amount) : null, pagadoEn: fechaPago(tx) };
  }
  return { estado: "pagado", monto: Number(tx.amount), pagadoEn: fechaPago(tx) };
}

export function estadoDePagosQr(respuesta, montoEsperado) {
  const items = Array.isArray(respuesta?.items) ? respuesta.items : [];
  const pagos = items.filter((t) => t?.status === "PAID" && alcanza(t, montoEsperado));
  if (!pagos.length) return { ...PENDIENTE };
  return { estado: "pagado", monto: Number(pagos[0].amount), pagadoEn: fechaPago(pagos[0]), pagosRecibidos: pagos.length };
}

// Busca el pago por número de pedido en las transacciones recientes de la llave (metadata.externalMetadata.pedido).
export function estadoPorPedido(respuesta, pedidoId, montoEsperado) {
  const items = Array.isArray(respuesta?.items) ? respuesta.items : [];
  const pagos = items.filter(
    (t) => String(t?.metadata?.externalMetadata?.pedido ?? "") === pedidoId && t?.status === "PAID" && alcanza(t, montoEsperado),
  );
  if (!pagos.length) return { ...PENDIENTE };
  return { estado: "pagado", monto: Number(pagos[0].amount), pagadoEn: fechaPago(pagos[0]), pagosRecibidos: pagos.length };
}
