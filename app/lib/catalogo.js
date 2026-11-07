// Catálogo de EJEMPLO (precios ficticios) de una dulcería de barrio. Base: K07.3 [CATÁLOGO DE EJEMPLO].
// Todo cuesta $20 o menos porque el tope del MVP es MAX_MONTO_MXN=20 (PRD) y en prueba se cobra de $0.01 a $1 (K03.3).
// El modelo nunca pone estos precios: el servidor los toma de aquí y recalcula el monto (CONTRATO-API, /api/agente).

export const CATALOGO = Object.freeze([
  { id: "dulce-tamarindo", nombre: "Dulce de tamarindo", plural: "Dulces de tamarindo", precio: 1, alias: ["dulce de tamarindo", "tamarindo"] },
  { id: "chicle", nombre: "Chicle", plural: "Chicles", precio: 2, alias: ["chicle"] },
  { id: "paleta-enchilada", nombre: "Paleta enchilada", plural: "Paletas enchiladas", precio: 5, alias: ["paleta enchilada", "paleta de chile", "paleta"] },
  { id: "mazapan", nombre: "Mazapán", plural: "Mazapanes", precio: 6, alias: ["mazapan"] },
  { id: "oblea-cajeta", nombre: "Oblea con cajeta", plural: "Obleas con cajeta", precio: 8, alias: ["oblea con cajeta", "oblea"] },
  { id: "cacahuates", nombre: "Bolsa de cacahuates", plural: "Bolsas de cacahuates", precio: 12, alias: ["bolsa de cacahuate", "cacahuate"] },
  { id: "mango", nombre: "Mango con chile", plural: "Mangos con chile", precio: 15, alias: ["mango con chile", "mango"] },
  { id: "agua-fresca", nombre: "Agua fresca", plural: "Aguas frescas", precio: 18, alias: ["agua fresca", "agua"] },
]);

/** Minúsculas, sin acentos y con espacios simples ("Cóbrale  un MAZAPÁN" → "cobrale un mazapan"). */
export function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Cada palabra de más de 3 letras acepta plural simple: "dulces", "mazapanes", "paletas enchiladas".
function regexDeAlias(alias) {
  const partes = normalizar(alias)
    .split(" ")
    .map((p) => escapar(p) + (p.length > 3 ? "(?:es|s)?" : ""));
  return new RegExp(`(?<![a-z0-9])${partes.join("\\s+")}(?![a-z0-9])`, "g");
}

const PATRONES = CATALOGO.flatMap((producto) => producto.alias.map((a) => ({ producto, re: regexDeAlias(a) })));

export function productoPorId(id) {
  return CATALOGO.find((p) => p.id === id) ?? null;
}

/** Menciones del catálogo en el texto, en orden y sin traslapes (gana la más larga). Posiciones sobre `norm`. */
export function encontrarProductos(texto) {
  const norm = normalizar(texto);
  const hallazgos = [];
  for (const { producto, re } of PATRONES) {
    for (const m of norm.matchAll(re)) hallazgos.push({ producto, inicio: m.index, fin: m.index + m[0].length });
  }
  hallazgos.sort((a, b) => a.inicio - b.inicio || b.fin - b.inicio - (a.fin - a.inicio));
  const elegidos = [];
  let fin = -1;
  for (const h of hallazgos) {
    if (h.inicio < fin) continue;
    elegidos.push(h);
    fin = h.fin;
  }
  return { norm, hallazgos: elegidos };
}

/** Producto del catálogo por id, nombre o alias (exacto o mencionado dentro del texto); null si no hay. */
export function buscarProducto(texto) {
  const norm = normalizar(texto);
  if (!norm) return null;
  const exacto = CATALOGO.find(
    (p) => p.id === norm || normalizar(p.nombre) === norm || p.alias.some((a) => normalizar(a) === norm),
  );
  if (exacto) return exacto;
  return encontrarProductos(norm).hallazgos[0]?.producto ?? null;
}
