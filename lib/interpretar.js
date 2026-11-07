// Interpretación básica (sin IA) de un pedido dictado o escrito. Respaldo cuando no hay llave de OpenAI o la IA falla.
import { PRODUCTOS } from "./menu.js";

const ALIAS = new Map(PRODUCTOS.flatMap((p) => p.alias.map((a) => [a, p.id])));
const NUMEROS = {
  un: 1, uno: 1, una: 1, dos: 2, par: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10,
  once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, veinte: 20, docena: 12,
};
const RELLENO = new Set([
  "de", "del", "el", "la", "los", "las", "con", "sin", "todo", "todos", "por", "favor", "porfa", "para", "llevar", "aqui",
  "taco", "tacos", "orden", "ordenes", "agua", "aguas", "grande", "chica", "mediana", "cebolla", "cilantro", "salsa",
  "verde", "roja", "piña", "pina", "queso", "me", "da", "das", "dame", "quiero", "queremos", "nos", "y", "e", "a", "al",
]);
const SEPARADORES = /\s*(?:[,;.\n]|\by\b|\be\b|\bmas\b|\btambien\b|\bademas\b)\s*/;

function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9,;.\n\s]/g, " ");
}

export function interpretarBasico(texto) {
  const cantidades = new Map();
  const noEntendido = [];
  for (const segmento of normalizar(texto).split(SEPARADORES)) {
    const palabras = segmento.split(/\s+/).filter(Boolean);
    if (!palabras.length) continue;
    let pendiente = null;
    let encontrado = false;
    for (let i = 0; i < palabras.length; i++) {
      const w = palabras[i];
      if (w === "media" && palabras[i + 1] === "docena") {
        pendiente = 6;
        i++;
        continue;
      }
      if (/^\d{1,2}$/.test(w)) {
        pendiente = Number(w);
        continue;
      }
      if (Object.hasOwn(NUMEROS, w)) {
        pendiente = NUMEROS[w];
        continue;
      }
      const id = ALIAS.get(w);
      // "una gringa de pastor": después del primer producto, otro solo cuenta si trae su propio número.
      if (id && (!encontrado || pendiente !== null)) {
        cantidades.set(id, (cantidades.get(id) || 0) + (pendiente ?? 1));
        pendiente = null;
        encontrado = true;
      }
    }
    if (!encontrado && palabras.some((w) => !RELLENO.has(w))) noEntendido.push(segmento.trim().slice(0, 80));
  }
  const items = PRODUCTOS.filter((p) => cantidades.has(p.id) && cantidades.get(p.id) > 0).map((p) => ({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    cantidad: Math.min(cantidades.get(p.id), 50),
  }));
  return { items, noEntendido: noEntendido.slice(0, 10), fuente: "basica" };
}
