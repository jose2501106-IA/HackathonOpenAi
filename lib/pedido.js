// Pedido firmado dentro de la liga: <id7>.<productos>.<creado36>.<firma16>
// Ejemplo: 4829135.pa4ho1.t3k9qz.Ab3dEf9hIj0kLm2n  →  4 de pastor y 1 horchata.
// Sin base de datos: la tarjeta NFC (o el QR) lleva el pedido; el servidor recalcula precios y total.
import crypto from "node:crypto";
import { ErrorApp } from "./errores.js";
import { PRODUCTOS, PRODUCTO_POR_ID } from "./menu.js";
import { iguales } from "./seguridad.js";

export const VIGENCIA_PEDIDO_S = 3 * 60 * 60;
export const MAX_POR_PRODUCTO = 50;
const RE_CODIGO = /^(\d{7})\.((?:[a-z]{2}\d{1,2})+)\.([0-9a-z]{1,10})\.([A-Za-z0-9_-]{16})$/;

const invalido = () => new ErrorApp("PEDIDO_INVALIDO", "Este pedido no es válido. Pide al cajero que lo vuelva a crear.");

function firmar(llave, base) {
  return crypto.createHmac("sha256", llave).update(base).digest("base64url").slice(0, 16);
}

// Valida productos y cantidades; junta repetidos y ordena como el menú.
export function normalizarItems(items) {
  if (!Array.isArray(items) || items.length === 0) throw new ErrorApp("PEDIDO_VACIO", "Agrega al menos un producto.");
  if (items.length > PRODUCTOS.length * 4) throw new ErrorApp("PEDIDO_INVALIDO", "El pedido tiene demasiadas líneas.");
  const cantidades = new Map();
  for (const item of items) {
    const id = typeof item?.id === "string" ? item.id : "";
    if (!PRODUCTO_POR_ID.has(id)) throw new ErrorApp("PRODUCTO_INVALIDO", "Hay un producto que no está en el menú.");
    const cantidad = item.cantidad;
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > MAX_POR_PRODUCTO) {
      throw new ErrorApp("CANTIDAD_INVALIDA", `La cantidad de cada producto va de 1 a ${MAX_POR_PRODUCTO}.`);
    }
    cantidades.set(id, (cantidades.get(id) || 0) + cantidad);
  }
  for (const total of cantidades.values()) {
    if (total > MAX_POR_PRODUCTO) throw new ErrorApp("CANTIDAD_INVALIDA", `La cantidad de cada producto va de 1 a ${MAX_POR_PRODUCTO}.`);
  }
  return PRODUCTOS.filter((p) => cantidades.has(p.id)).map((p) => ({ id: p.id, cantidad: cantidades.get(p.id) }));
}

// Precios y total salen del menú del servidor, nunca del navegador ni de la IA. Suma en centavos.
export function detallar(itemsNormales) {
  let centavos = 0;
  const items = itemsNormales.map(({ id, cantidad }) => {
    const p = PRODUCTO_POR_ID.get(id);
    const subtotalCentavos = Math.round(p.precio * 100) * cantidad;
    centavos += subtotalCentavos;
    return { id, nombre: p.nombre, precio: p.precio, cantidad, subtotal: subtotalCentavos / 100 };
  });
  return { items, total: centavos / 100 };
}

export function crearPedido(items, { llaveFirma, ahora = Date.now(), aleatorio = (min, max) => crypto.randomInt(min, max) }) {
  const normal = normalizarItems(items);
  const id = String(aleatorio(1_000_000, 10_000_000));
  const creado = Math.floor(ahora / 1000);
  const base = `${id}.${normal.map((i) => `${i.id}${i.cantidad}`).join("")}.${creado.toString(36)}`;
  const codigo = `${base}.${firmar(llaveFirma, base)}`;
  return { codigo, ...leerPedido(codigo, { llaveFirma, ahora }) };
}

export function leerPedido(codigo, { llaveFirma, ahora = Date.now(), permitirVencido = false }) {
  if (typeof codigo !== "string" || codigo.length > 120) throw invalido();
  const m = RE_CODIGO.exec(codigo);
  if (!m) throw invalido();
  const [, id, productos, creado36, firma] = m;
  if (!iguales(firma, firmar(llaveFirma, `${id}.${productos}.${creado36}`))) throw invalido();

  let normal;
  try {
    normal = normalizarItems([...productos.matchAll(/([a-z]{2})(\d{1,2})/g)].map(([, pid, c]) => ({ id: pid, cantidad: Number(c) })));
  } catch {
    throw invalido();
  }
  const creado = Number.parseInt(creado36, 36);
  const ahoraS = Math.floor(ahora / 1000);
  if (!Number.isSafeInteger(creado) || creado > ahoraS + 300) throw invalido();
  const vence = creado + VIGENCIA_PEDIDO_S;
  if (!permitirVencido && ahoraS > vence) {
    throw new ErrorApp("PEDIDO_VENCIDO", "Este pedido ya venció. Pide al cajero uno nuevo.", 410);
  }
  const { items, total } = detallar(normal);
  return { pedido: { id, items, total, creado, vence } };
}

// Monto que se cobra: el total, pero nunca más que el máximo del servidor (demo: $1).
export function montoACobrar(total, montoMaximo) {
  const monto = Math.round(Math.min(total, montoMaximo) * 100) / 100;
  return { monto, montoPrueba: total > montoMaximo };
}
