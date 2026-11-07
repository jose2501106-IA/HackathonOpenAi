// Reporte sencillo del día (hora de la CDMX): ventas, productos vendidos, horas y consumo de ingredientes.
import { ErrorApp } from "./errores.js";
import { consumoDeOrden } from "./calculo.js";

const ZONA = "America/Mexico_City";

export function hoyCdmx(ahoraMs = Date.now()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ZONA, year: "numeric", month: "2-digit", day: "2-digit" }).format(ahoraMs);
}

// La CDMX no tiene horario de verano desde 2022: UTC−6 todo el año.
export function rangoDelDia(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(`${fecha}T00:00:00Z`))) {
    throw new ErrorApp("FECHA_INVALIDA", "La fecha debe tener el formato AAAA-MM-DD.");
  }
  const desde = Date.parse(`${fecha}T06:00:00Z`);
  return [desde, desde + 24 * 3600 * 1000];
}

const horaCdmx = (ms) => Number(new Intl.DateTimeFormat("en-US", { timeZone: ZONA, hour: "2-digit", hourCycle: "h23" }).format(ms));

export async function reporteDelDia(almacen, fecha) {
  const [desde, hasta] = rangoDelDia(fecha);
  const [ordenes, catalogo, ingredientes] = await Promise.all([almacen.ordenesPagadas(desde, hasta), almacen.catalogo(), almacen.ingredientes()]);

  const productos = new Map();
  const porHora = new Map();
  const consumo = {};
  let totalVendido = 0;
  let totalCobrado = 0;
  for (const o of ordenes) {
    totalVendido += o.totales.total;
    totalCobrado += o.montoCobrado || 0;
    const h = horaCdmx(o.pagadaEn);
    const ph = porHora.get(h) || { hora: h, ordenes: 0, total: 0 };
    ph.ordenes += 1;
    ph.total += o.totales.total;
    porHora.set(h, ph);
    for (const r of o.renglones) {
      const p = productos.get(r.productoId) || { productoId: r.productoId, nombre: r.nombre, cantidad: 0, importe: 0 };
      p.cantidad += r.cantidad;
      p.importe += r.importe;
      productos.set(r.productoId, p);
    }
    for (const [id, c] of Object.entries(consumoDeOrden(o.renglones, catalogo))) consumo[id] = (consumo[id] || 0) + c;
  }

  const telefonos = [...new Set(ordenes.filter((o) => o.recordar && o.telefono).map((o) => o.telefono))];
  const clientes = await almacen.clientes(telefonos);
  const ingPorId = new Map(ingredientes.map((i) => [i.id, i]));

  return {
    fecha,
    ordenes: ordenes.length,
    totalVendido,
    totalCobrado,
    ticketPromedio: ordenes.length ? Math.round(totalVendido / ordenes.length) : 0,
    productos: [...productos.values()].sort((a, b) => b.cantidad - a.cantidad),
    porHora: [...porHora.values()].sort((a, b) => a.hora - b.hora),
    clientes: { conCelular: telefonos.length, recurrentes: clientes.filter((c) => c.visitas > 1).length },
    consumo: Object.entries(consumo)
      .map(([id, cantidad]) => ({ id, nombre: ingPorId.get(id)?.nombre || id, unidad: ingPorId.get(id)?.unidad || "", cantidad }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es")),
  };
}
