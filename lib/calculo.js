// Totales de una orden. Todo en CENTAVOS enteros.
// Los precios del menú ya incluyen IVA (como en cualquier taquería). Los descuentos se aplican ANTES del IVA:
// descontar un % al precio con IVA equivale a descontarlo a la base y recalcular el IVA.
// Se muestra: Subtotal (sin IVA, antes de descuentos) − Descuento (sin IVA) + IVA = Total.
import { ErrorApp } from "./errores.js";

export const MAX_CANTIDAD = 99;
export const MAX_RENGLONES = 30;

const pctValido = (p) => Number.isFinite(p) && p >= 0 && p <= 100;

// items: [{ productoId, cantidad }] · catalogo: [{ id, nombre, precio, descuentoPct }]
export function armarRenglones(items, catalogo) {
  if (!Array.isArray(items)) throw new ErrorApp("ITEMS_INVALIDOS", "La orden no tiene una lista de productos válida.");
  if (items.length > MAX_RENGLONES) throw new ErrorApp("ITEMS_INVALIDOS", "La orden tiene demasiados renglones.");
  const porId = new Map(catalogo.map((p) => [p.id, p]));
  const cantidades = new Map();
  for (const it of items) {
    const p = porId.get(it?.productoId);
    if (!p) throw new ErrorApp("PRODUCTO_INVALIDO", "Uno de los productos no existe en el menú.");
    if (!Number.isInteger(it.cantidad) || it.cantidad < 0 || it.cantidad > MAX_CANTIDAD) {
      throw new ErrorApp("CANTIDAD_INVALIDA", `La cantidad de ${p.nombre} debe ser un entero de 0 a ${MAX_CANTIDAD}.`);
    }
    cantidades.set(p.id, Math.min(MAX_CANTIDAD, (cantidades.get(p.id) || 0) + it.cantidad));
  }
  // El orden de los renglones sigue el del menú.
  return catalogo
    .filter((p) => (cantidades.get(p.id) || 0) > 0)
    .map((p) => ({
      productoId: p.id,
      nombre: p.nombre,
      cantidad: cantidades.get(p.id),
      precioUnitario: p.precio,
      descuentoPct: pctValido(p.descuentoPct) ? p.descuentoPct : 0,
    }));
}

export function calcularTotales(renglones, { descuentoOrdenPct = 0, ivaPct = 16 } = {}) {
  if (!pctValido(descuentoOrdenPct)) throw new ErrorApp("DESCUENTO_INVALIDO", "El descuento debe estar entre 0 y 100 %.");
  let bruto = 0;
  let descuentoRenglones = 0;
  const detalle = renglones.map((r) => {
    const importeBruto = r.precioUnitario * r.cantidad;
    const descuento = Math.round((importeBruto * r.descuentoPct) / 100);
    bruto += importeBruto;
    descuentoRenglones += descuento;
    return { ...r, importeBruto, descuento, importe: importeBruto - descuento };
  });
  const neto = bruto - descuentoRenglones;
  const descuentoOrden = Math.round((neto * descuentoOrdenPct) / 100);
  const total = neto - descuentoOrden;
  const factor = 1 + ivaPct / 100;
  const subtotal = Math.round(bruto / factor);
  const descuento = Math.round((descuentoRenglones + descuentoOrden) / factor);
  const iva = total - (subtotal - descuento); // cuadra al centavo: subtotal − descuento + iva = total
  return { renglones: detalle, totales: { subtotal, descuento, iva, total }, descuentoOrdenPct };
}

// Lo que gasta la orden de cada ingrediente: { ingredienteId: cantidad }
export function consumoDeOrden(renglones, catalogo) {
  const porId = new Map(catalogo.map((p) => [p.id, p]));
  const consumo = {};
  for (const r of renglones) {
    const receta = porId.get(r.productoId)?.receta || {};
    for (const [ing, cant] of Object.entries(receta)) consumo[ing] = (consumo[ing] || 0) + cant * r.cantidad;
  }
  return consumo;
}
