import { test } from "node:test";
import assert from "node:assert/strict";
import { interpretarBasico } from "../lib/interpretar.js";

const resumen = (r) => r.items.map((i) => `${i.id}${i.cantidad}`).join(" ");

test("entiende un pedido dictado típico", () => {
  const r = interpretarBasico("Cuatro de pastor con todo, dos de suadero y una horchata");
  assert.equal(resumen(r), "pa4 su2 ho1");
  assert.deepEqual(r.noEntendido, []);
  assert.equal(r.fuente, "basica");
});

test("números con dígitos, media docena y sinónimos", () => {
  assert.equal(resumen(interpretarBasico("media docena de bistec y 2 cocas")), "bi6 re2");
  assert.equal(resumen(interpretarBasico("una gringa de pastor")), "gr1");
  assert.equal(resumen(interpretarBasico("cuatro pastor dos suadero")), "pa4 su2");
});

test("separa lo que no está en el menú", () => {
  const r = interpretarBasico("un tepache y tres campechanos");
  assert.equal(resumen(r), "ca3");
  assert.deepEqual(r.noEntendido, ["un tepache"]);
});
