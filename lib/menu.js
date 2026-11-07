// Menú FICTICIO para la demo: productos y precios de ejemplo, no son de un negocio real.
export const NEGOCIO = "Taquería El Ejemplo";

export const PRODUCTOS = Object.freeze([
  { id: "pa", nombre: "Taco al pastor", precio: 25, alias: ["pastor", "pastores"] },
  { id: "su", nombre: "Taco de suadero", precio: 25, alias: ["suadero", "suaderos"] },
  { id: "bi", nombre: "Taco de bistec", precio: 28, alias: ["bistec", "bisteces", "bistek", "bisteck"] },
  { id: "ca", nombre: "Taco campechano", precio: 30, alias: ["campechano", "campechanos"] },
  { id: "gr", nombre: "Gringa de pastor", precio: 65, alias: ["gringa", "gringas"] },
  { id: "qu", nombre: "Quesadilla", precio: 40, alias: ["quesadilla", "quesadillas"] },
  { id: "re", nombre: "Refresco 600 ml", precio: 30, alias: ["refresco", "refrescos", "coca", "cocas"] },
  { id: "ho", nombre: "Agua de horchata", precio: 30, alias: ["horchata", "horchatas"] },
  { id: "ja", nombre: "Agua de jamaica", precio: 30, alias: ["jamaica", "jamaicas"] },
]);

export const PRODUCTO_POR_ID = new Map(PRODUCTOS.map((p) => [p.id, p]));

export function menuPublico() {
  return PRODUCTOS.map(({ id, nombre, precio }) => ({ id, nombre, precio }));
}
