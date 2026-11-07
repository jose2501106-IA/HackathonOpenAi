import { test } from "node:test";
import assert from "node:assert/strict";
import { crearPedido, leerPedido, montoACobrar, normalizarItems, VIGENCIA_PEDIDO_S } from "../lib/pedido.js";

const llaveFirma = Buffer.alloc(32, 7);
const AHORA = 1_794_000_000_000;
const opciones = { llaveFirma, ahora: AHORA, aleatorio: () => 1234567 };

test("crea un pedido firmado, corto y con total del menú", () => {
  const { codigo, pedido } = crearPedido([{ id: "ho", cantidad: 1 }, { id: "pa", cantidad: 4 }], opciones);
  assert.match(codigo, /^1234567\.pa4ho1\.[0-9a-z]+\.[A-Za-z0-9_-]{16}$/);
  assert.ok(codigo.length < 60, "la liga debe caber en una tarjeta NFC pequeña");
  assert.equal(pedido.id, "1234567");
  assert.equal(pedido.total, 130);
  assert.deepEqual(
    pedido.items.map((i) => [i.id, i.cantidad, i.subtotal]),
    [["pa", 4, 100], ["ho", 1, 30]],
  );
  assert.equal(pedido.vence - pedido.creado, VIGENCIA_PEDIDO_S);
  assert.deepEqual(leerPedido(codigo, { llaveFirma, ahora: AHORA }).pedido, pedido);
});

test("rechaza un pedido alterado o firmado con otra llave", () => {
  const { codigo } = crearPedido([{ id: "pa", cantidad: 4 }], opciones);
  assert.throws(() => leerPedido(codigo.replace("pa4", "pa1"), { llaveFirma, ahora: AHORA }), { codigo: "PEDIDO_INVALIDO" });
  assert.throws(() => leerPedido(codigo, { llaveFirma: Buffer.alloc(32, 8), ahora: AHORA }), { codigo: "PEDIDO_INVALIDO" });
  assert.throws(() => leerPedido("cualquier-cosa", { llaveFirma, ahora: AHORA }), { codigo: "PEDIDO_INVALIDO" });
  assert.throws(() => leerPedido(undefined, { llaveFirma, ahora: AHORA }), { codigo: "PEDIDO_INVALIDO" });
});

test("un pedido vence a las 3 horas, salvo para consultar su estado", () => {
  const { codigo } = crearPedido([{ id: "su", cantidad: 2 }], opciones);
  const despues = AHORA + (VIGENCIA_PEDIDO_S + 1) * 1000;
  assert.throws(() => leerPedido(codigo, { llaveFirma, ahora: despues }), { codigo: "PEDIDO_VENCIDO", status: 410 });
  assert.equal(leerPedido(codigo, { llaveFirma, ahora: despues, permitirVencido: true }).pedido.total, 50);
});

test("valida productos y cantidades y junta repetidos", () => {
  assert.throws(() => normalizarItems([]), { codigo: "PEDIDO_VACIO" });
  assert.throws(() => normalizarItems("pa4"), { codigo: "PEDIDO_VACIO" });
  assert.throws(() => normalizarItems([{ id: "xx", cantidad: 1 }]), { codigo: "PRODUCTO_INVALIDO" });
  for (const cantidad of [0, 51, 1.5, "2", -1]) {
    assert.throws(() => normalizarItems([{ id: "pa", cantidad }]), { codigo: "CANTIDAD_INVALIDA" });
  }
  assert.throws(() => normalizarItems([{ id: "pa", cantidad: 30 }, { id: "pa", cantidad: 30 }]), { codigo: "CANTIDAD_INVALIDA" });
  assert.deepEqual(normalizarItems([{ id: "pa", cantidad: 2 }, { id: "pa", cantidad: 3 }]), [{ id: "pa", cantidad: 5 }]);
});

test("el servidor nunca cobra más que el máximo", () => {
  assert.deepEqual(montoACobrar(130, 1), { monto: 1, montoPrueba: true });
  assert.deepEqual(montoACobrar(130, 500), { monto: 130, montoPrueba: false });
  assert.deepEqual(montoACobrar(0.5, 1), { monto: 0.5, montoPrueba: false });
});
