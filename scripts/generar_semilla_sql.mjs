// Genera supabase/migrations/002_semilla.sql desde lib/semilla.js (única fuente del menú de ejemplo).
// Uso: node scripts/generar_semilla_sql.mjs
import { writeFile } from "node:fs/promises";
import { INGREDIENTES, MESAS, PRODUCTOS } from "../lib/semilla.js";

const q = (v) => (v === null || v === undefined ? "null" : typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`);

const lineas = [
  "-- GENERADO por scripts/generar_semilla_sql.mjs desde lib/semilla.js. No lo edites a mano.",
  "-- Menú, precios y existencias DE EJEMPLO de Tacos El Gran Abanico. Precios en centavos con IVA incluido.",
  "-- Los tokens de las mesas se generan al azar en la base: la URL de cada etiqueta NFC se ve en la caja.",
  "",
  "insert into mesas (id, nombre) values",
  MESAS.map((m) => `  (${m.id}, ${q(m.nombre)})`).join(",\n") + "\non conflict (id) do update set nombre = excluded.nombre;",
  "",
  "insert into ingredientes (id, nombre, unidad, existencia, minimo) values",
  INGREDIENTES.map((i) => `  (${q(i.id)}, ${q(i.nombre)}, ${q(i.unidad)}, ${i.existencia}, ${i.minimo})`).join(",\n") +
    "\non conflict (id) do update set nombre = excluded.nombre, unidad = excluded.unidad, minimo = excluded.minimo;",
  "",
  "insert into productos (id, nombre, categoria, precio, descuento_pct, promo, posicion) values",
  PRODUCTOS.map((p, i) => `  (${q(p.id)}, ${q(p.nombre)}, ${q(p.categoria)}, ${p.precio}, ${p.descuentoPct}, ${q(p.promo ?? null)}, ${i})`).join(",\n") +
    "\non conflict (id) do update set nombre = excluded.nombre, categoria = excluded.categoria, precio = excluded.precio,\n  descuento_pct = excluded.descuento_pct, promo = excluded.promo, posicion = excluded.posicion;",
  "",
  "delete from recetas where producto_id in (" + PRODUCTOS.map((p) => q(p.id)).join(", ") + ");",
  "insert into recetas (producto_id, ingrediente_id, cantidad) values",
  PRODUCTOS.flatMap((p) => Object.entries(p.receta).map(([ing, c]) => `  (${q(p.id)}, ${q(ing)}, ${c})`)).join(",\n") + ";",
  "",
];

await writeFile(new URL("../supabase/migrations/002_semilla.sql", import.meta.url), lineas.join("\n"));
console.log("Listo: supabase/migrations/002_semilla.sql");
