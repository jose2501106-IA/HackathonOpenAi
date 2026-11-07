import { test } from "node:test";
import assert from "node:assert/strict";
import { armarRenglones, calcularTotales, consumoDeOrden } from "../lib/calculo.js";
import { PRODUCTOS } from "../lib/semilla.js";

test("IVA incluido y descuentos antes del IVA: subtotal − descuento + IVA = total", () => {
  const r = armarRenglones([{ productoId: "taco_pastor", cantidad: 4 }, { productoId: "refresco", cantidad: 1 }], PRODUCTOS);
  const { totales, renglones } = calcularTotales(r);
  // 4 × $25 con 10 % de promo = $90; refresco $30 → total $120.00
  assert.equal(renglones[0].importe, 9000);
  assert.equal(renglones[0].descuento, 1000);
  assert.equal(totales.total, 12000);
  assert.equal(totales.subtotal, Math.round(13000 / 1.16));
  assert.equal(totales.descuento, Math.round(1000 / 1.16));
  assert.equal(totales.subtotal - totales.descuento + totales.iva, totales.total);
});

test("descuento a la orden se suma al de los productos", () => {
  const r = armarRenglones([{ productoId: "gringa_pastor", cantidad: 2 }], PRODUCTOS);
  const { totales } = calcularTotales(r, { descuentoOrdenPct: 10 });
  assert.equal(totales.total, 13500);
  assert.equal(totales.descuento, Math.round(1500 / 1.16));
  assert.equal(totales.subtotal - totales.descuento + totales.iva, totales.total);
});

test("cuadra al centavo en muchas combinaciones", () => {
  for (let a = 0; a < 7; a++) {
    for (let pct = 0; pct <= 35; pct += 7) {
      const r = armarRenglones([{ productoId: "taco_pastor", cantidad: a + 1 }, { productoId: "taco_bistec", cantidad: a }], PRODUCTOS);
      const { totales } = calcularTotales(r, { descuentoOrdenPct: pct });
      assert.equal(totales.subtotal - totales.descuento + totales.iva, totales.total);
      assert.ok(totales.iva >= 0);
    }
  }
});

test("rechaza productos inexistentes, cantidades raras y descuentos fuera de rango", () => {
  assert.throws(() => armarRenglones([{ productoId: "pizza", cantidad: 1 }], PRODUCTOS), { codigo: "PRODUCTO_INVALIDO" });
  assert.throws(() => armarRenglones([{ productoId: "refresco", cantidad: 1.5 }], PRODUCTOS), { codigo: "CANTIDAD_INVALIDA" });
  assert.throws(() => armarRenglones([{ productoId: "refresco", cantidad: -1 }], PRODUCTOS), { codigo: "CANTIDAD_INVALIDA" });
  assert.throws(() => calcularTotales([], { descuentoOrdenPct: 120 }), { codigo: "DESCUENTO_INVALIDO" });
  assert.deepEqual(armarRenglones([{ productoId: "refresco", cantidad: 0 }], PRODUCTOS), []);
});

test("consumo de ingredientes según la receta", () => {
  const r = armarRenglones([{ productoId: "taco_pastor", cantidad: 3 }, { productoId: "gringa_pastor", cantidad: 1 }], PRODUCTOS);
  const c = consumoDeOrden(r, PRODUCTOS);
  assert.equal(c.tortilla_maiz, 6);
  assert.equal(c.pastor, 3 * 60 + 120);
  assert.equal(c.tortilla_harina, 2);
});
