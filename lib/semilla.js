// Datos de ejemplo de Tacos El Gran Abanico: MENÚ, PRECIOS Y EXISTENCIAS DE EJEMPLO (no son los reales).
// Única fuente: el almacén en memoria los usa tal cual y scripts/generar_semilla_sql.mjs los convierte en
// supabase/migrations/002_semilla.sql. Precios en centavos, con IVA incluido.

export const NEGOCIO = { nombre: "Tacos El Gran Abanico", ivaPct: 16 };

export const MESAS = [1, 2, 3, 4, 5].map((id) => ({ id, nombre: `Mesa ${id}` }));

// unidad: pz (piezas), g (gramos), ml (mililitros)
export const INGREDIENTES = [
  { id: "tortilla_maiz", nombre: "Tortilla de maíz", unidad: "pz", existencia: 500, minimo: 100 },
  { id: "tortilla_harina", nombre: "Tortilla de harina", unidad: "pz", existencia: 100, minimo: 20 },
  { id: "pastor", nombre: "Carne al pastor", unidad: "g", existencia: 8000, minimo: 1500 },
  { id: "suadero", nombre: "Suadero", unidad: "g", existencia: 6000, minimo: 1000 },
  { id: "bistec", nombre: "Bistec", unidad: "g", existencia: 6000, minimo: 1000 },
  { id: "longaniza", nombre: "Longaniza", unidad: "g", existencia: 3000, minimo: 500 },
  { id: "queso", nombre: "Queso Oaxaca", unidad: "g", existencia: 4000, minimo: 800 },
  { id: "pina", nombre: "Piña", unidad: "g", existencia: 2000, minimo: 300 },
  { id: "cebolla_cilantro", nombre: "Cebolla y cilantro", unidad: "g", existencia: 3000, minimo: 500 },
  { id: "pan_torta", nombre: "Pan para torta", unidad: "pz", existencia: 40, minimo: 10 },
  { id: "aguacate", nombre: "Aguacate", unidad: "g", existencia: 2000, minimo: 400 },
  { id: "refresco", nombre: "Refresco 600 ml", unidad: "pz", existencia: 48, minimo: 12 },
  { id: "agua_horchata", nombre: "Agua de horchata", unidad: "ml", existencia: 20000, minimo: 4000 },
];

// descuentoPct: promoción del producto (se aplica antes del IVA). receta: lo que gasta UNA pieza.
export const PRODUCTOS = [
  {
    id: "taco_pastor", nombre: "Taco al pastor", categoria: "Tacos", precio: 2500, descuentoPct: 10, promo: "Promoción del día",
    receta: { tortilla_maiz: 2, pastor: 60, pina: 10, cebolla_cilantro: 10 },
  },
  {
    id: "taco_suadero", nombre: "Taco de suadero", categoria: "Tacos", precio: 2500, descuentoPct: 0,
    receta: { tortilla_maiz: 2, suadero: 60, cebolla_cilantro: 10 },
  },
  {
    id: "taco_bistec", nombre: "Taco de bistec", categoria: "Tacos", precio: 2800, descuentoPct: 0,
    receta: { tortilla_maiz: 2, bistec: 60, cebolla_cilantro: 10 },
  },
  {
    id: "taco_campechano", nombre: "Taco campechano", categoria: "Tacos", precio: 3000, descuentoPct: 0,
    receta: { tortilla_maiz: 2, suadero: 35, longaniza: 35, cebolla_cilantro: 10 },
  },
  {
    id: "gringa_pastor", nombre: "Gringa de pastor", categoria: "Especialidades", precio: 7500, descuentoPct: 0,
    receta: { tortilla_harina: 2, pastor: 120, queso: 60, pina: 15 },
  },
  {
    id: "quesadilla_bistec", nombre: "Quesadilla de bistec", categoria: "Especialidades", precio: 5500, descuentoPct: 0,
    receta: { tortilla_harina: 1, bistec: 80, queso: 50 },
  },
  {
    id: "torta_pastor", nombre: "Torta al pastor", categoria: "Especialidades", precio: 7000, descuentoPct: 0,
    receta: { pan_torta: 1, pastor: 120, aguacate: 30, cebolla_cilantro: 10 },
  },
  {
    id: "refresco", nombre: "Refresco 600 ml", categoria: "Bebidas", precio: 3000, descuentoPct: 0,
    receta: { refresco: 1 },
  },
  {
    id: "agua_horchata", nombre: "Agua de horchata ½ L", categoria: "Bebidas", precio: 3000, descuentoPct: 0,
    receta: { agua_horchata: 500 },
  },
];
