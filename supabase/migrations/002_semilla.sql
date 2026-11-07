-- GENERADO por scripts/generar_semilla_sql.mjs desde lib/semilla.js. No lo edites a mano.
-- Menú, precios y existencias DE EJEMPLO de Tacos El Gran Abanico. Precios en centavos con IVA incluido.
-- Los tokens de las mesas se generan al azar en la base: la URL de cada etiqueta NFC se ve en la caja.

insert into mesas (id, nombre) values
  (1, 'Mesa 1'),
  (2, 'Mesa 2'),
  (3, 'Mesa 3'),
  (4, 'Mesa 4'),
  (5, 'Mesa 5')
on conflict (id) do update set nombre = excluded.nombre;

insert into ingredientes (id, nombre, unidad, existencia, minimo) values
  ('tortilla_maiz', 'Tortilla de maíz', 'pz', 500, 100),
  ('tortilla_harina', 'Tortilla de harina', 'pz', 100, 20),
  ('pastor', 'Carne al pastor', 'g', 8000, 1500),
  ('suadero', 'Suadero', 'g', 6000, 1000),
  ('bistec', 'Bistec', 'g', 6000, 1000),
  ('longaniza', 'Longaniza', 'g', 3000, 500),
  ('queso', 'Queso Oaxaca', 'g', 4000, 800),
  ('pina', 'Piña', 'g', 2000, 300),
  ('cebolla_cilantro', 'Cebolla y cilantro', 'g', 3000, 500),
  ('pan_torta', 'Pan para torta', 'pz', 40, 10),
  ('aguacate', 'Aguacate', 'g', 2000, 400),
  ('refresco', 'Refresco 600 ml', 'pz', 48, 12),
  ('agua_horchata', 'Agua de horchata', 'ml', 20000, 4000)
on conflict (id) do update set nombre = excluded.nombre, unidad = excluded.unidad, minimo = excluded.minimo;

insert into productos (id, nombre, categoria, precio, descuento_pct, promo, posicion) values
  ('taco_pastor', 'Taco al pastor', 'Tacos', 2500, 10, 'Promoción del día', 0),
  ('taco_suadero', 'Taco de suadero', 'Tacos', 2500, 0, null, 1),
  ('taco_bistec', 'Taco de bistec', 'Tacos', 2800, 0, null, 2),
  ('taco_campechano', 'Taco campechano', 'Tacos', 3000, 0, null, 3),
  ('gringa_pastor', 'Gringa de pastor', 'Especialidades', 7500, 0, null, 4),
  ('quesadilla_bistec', 'Quesadilla de bistec', 'Especialidades', 5500, 0, null, 5),
  ('torta_pastor', 'Torta al pastor', 'Especialidades', 7000, 0, null, 6),
  ('refresco', 'Refresco 600 ml', 'Bebidas', 3000, 0, null, 7),
  ('agua_horchata', 'Agua de horchata ½ L', 'Bebidas', 3000, 0, null, 8)
on conflict (id) do update set nombre = excluded.nombre, categoria = excluded.categoria, precio = excluded.precio,
  descuento_pct = excluded.descuento_pct, promo = excluded.promo, posicion = excluded.posicion;

delete from recetas where producto_id in ('taco_pastor', 'taco_suadero', 'taco_bistec', 'taco_campechano', 'gringa_pastor', 'quesadilla_bistec', 'torta_pastor', 'refresco', 'agua_horchata');
insert into recetas (producto_id, ingrediente_id, cantidad) values
  ('taco_pastor', 'tortilla_maiz', 2),
  ('taco_pastor', 'pastor', 60),
  ('taco_pastor', 'pina', 10),
  ('taco_pastor', 'cebolla_cilantro', 10),
  ('taco_suadero', 'tortilla_maiz', 2),
  ('taco_suadero', 'suadero', 60),
  ('taco_suadero', 'cebolla_cilantro', 10),
  ('taco_bistec', 'tortilla_maiz', 2),
  ('taco_bistec', 'bistec', 60),
  ('taco_bistec', 'cebolla_cilantro', 10),
  ('taco_campechano', 'tortilla_maiz', 2),
  ('taco_campechano', 'suadero', 35),
  ('taco_campechano', 'longaniza', 35),
  ('taco_campechano', 'cebolla_cilantro', 10),
  ('gringa_pastor', 'tortilla_harina', 2),
  ('gringa_pastor', 'pastor', 120),
  ('gringa_pastor', 'queso', 60),
  ('gringa_pastor', 'pina', 15),
  ('quesadilla_bistec', 'tortilla_harina', 1),
  ('quesadilla_bistec', 'bistec', 80),
  ('quesadilla_bistec', 'queso', 50),
  ('torta_pastor', 'pan_torta', 1),
  ('torta_pastor', 'pastor', 120),
  ('torta_pastor', 'aguacate', 30),
  ('torta_pastor', 'cebolla_cilantro', 10),
  ('refresco', 'refresco', 1),
  ('agua_horchata', 'agua_horchata', 500);
