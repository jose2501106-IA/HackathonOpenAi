// Pruebas de la interfaz (funciones puras, sin DOM ni servicios reales): textos, montos, errores y seguimiento.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  T,
  montoEnPalabras,
  formatearMonto,
  leerMonto,
  validarMonto,
  formatearHora,
  formatearCuenta,
  mensajeError,
  obtenerTexto,
} from "../js/textos.js";
import { crearApi, ErrorApi } from "../js/api.js";
import { crearSeguimiento } from "../js/estado-pago.js";

test("monto a palabras para la voz", () => {
  assert.equal(montoEnPalabras(1), "un peso");
  assert.equal(montoEnPalabras(15), "quince pesos");
  assert.equal(montoEnPalabras(20), "veinte pesos");
  assert.equal(montoEnPalabras(21), "veintiún pesos");
  assert.equal(montoEnPalabras(31), "treinta y un pesos");
  assert.equal(montoEnPalabras(100), "cien pesos");
  assert.equal(montoEnPalabras(101), "ciento un pesos");
  assert.equal(montoEnPalabras(500), "quinientos pesos");
  assert.equal(montoEnPalabras(2500), "dos mil quinientos pesos");
  assert.equal(montoEnPalabras(21000), "veintiún mil pesos");
  assert.equal(montoEnPalabras(1000000), "un millón de pesos");
  assert.equal(montoEnPalabras(0.01), "un centavo");
  assert.equal(montoEnPalabras(0.5), "cincuenta centavos");
  assert.equal(montoEnPalabras(1.5), "un peso con cincuenta centavos");
  assert.equal(montoEnPalabras(0), "cero pesos");
});

test("la voz del pago dice el monto y avisa la SIMULACIÓN", () => {
  assert.equal(T.voz.pago(1, false), "Ya cayó tu dinero: un peso");
  assert.match(T.voz.pago(1, true), /simulación/i);
});

test("formato de dinero, hora de CDMX y cuenta regresiva", () => {
  assert.equal(formatearMonto(1), "$1.00");
  assert.equal(formatearMonto(15.5), "$15.50");
  assert.equal(formatearMonto("x"), "—");
  assert.equal(formatearHora("2026-11-07T20:05:00.000Z"), "14:05"); // CDMX = UTC−6
  assert.equal(formatearHora(null), "");
  assert.equal(formatearCuenta(598000), "9:58");
  assert.equal(formatearCuenta(-5), "0:00");
});

test("lectura y validación de montos escritos", () => {
  assert.equal(leerMonto("15"), 15);
  assert.equal(leerMonto("$ 1.50"), 1.5);
  assert.equal(leerMonto("1,50"), 1.5);
  assert.equal(leerMonto("1,000.50"), 1000.5);
  assert.ok(Number.isNaN(leerMonto("")));
  assert.ok(Number.isNaN(leerMonto("abc")));
  assert.equal(validarMonto(1, 20), null);
  assert.equal(validarMonto(20, 20), null);
  assert.equal(validarMonto(20.01, 20), "tope");
  assert.equal(validarMonto(0, 20), "invalido");
  assert.equal(validarMonto(NaN, 20), "vacio");
});

test("todos los veredictos tienen texto y ninguno dice 'falso'", () => {
  for (const codigo of ["ya_cayo", "todavia_no_cae", "coincide", "dudoso", "no_encontrado", "ilegible", "no_verificable"]) {
    const v = T.veredictos[codigo];
    assert.ok(v?.titulo, codigo);
    assert.ok(["verde", "ambar", "gris"].includes(v.color), codigo);
  }
  assert.equal(T.veredictos.todavia_no_cae.titulo, "Todavía no cae: no entregues");
  assert.doesNotMatch(JSON.stringify(T), /falso|fraude/i);
});

test("cada código de error del contrato tiene un texto humano", () => {
  const codigos = [
    "CONFIRMACION_REQUERIDA", "MONTO_INVALIDO", "CONCEPTO_INVALIDO", "PEY_NO_AUTORIZADO", "PEY_NO_RESPONDE",
    "TICKET_INVALIDO", "SOLO_SIMULACION", "IMAGEN_GRANDE", "IA_NO_DISPONIBLE", "ERROR_INTERNO",
  ];
  for (const c of codigos) assert.ok(T.errores[c], c);
  assert.equal(mensajeError("CODIGO_NUEVO", "Mensaje del servidor"), "Mensaje del servidor");
  assert.equal(mensajeError("HTTP_404", undefined, 404), T.errores.NO_EXISTE);
  assert.equal(obtenerTexto("pedido.ejemplos.0"), "Cóbrale un dulce de tamarindo");
});

function respuestaJson(datos, status = 200) {
  return new Response(JSON.stringify(datos), { status, headers: { "content-type": "application/json" } });
}

test("api: manda el cuerpo del contrato y convierte errores {error:{codigo,mensaje}}", async () => {
  const llamadas = [];
  const api = crearApi({
    fetchImpl: async (url, opciones) => {
      llamadas.push({ url, opciones });
      if (url === "/api/cobros") return respuestaJson({ error: { codigo: "MONTO_INVALIDO", mensaje: "x" } }, 400);
      if (url.startsWith("/api/estado")) return respuestaJson({ id: "sim_1", estado: "pendiente", monto: 1 });
      return new Response("<html>404</html>", { status: 404 });
    },
  });

  await assert.rejects(api.crearCobro({ concepto: "Dulce", monto: 25, confirmado: true }), (e) => {
    assert.ok(e instanceof ErrorApi);
    assert.equal(e.codigo, "MONTO_INVALIDO");
    assert.equal(e.status, 400);
    assert.equal(e.message, T.errores.MONTO_INVALIDO);
    return true;
  });
  assert.deepEqual(JSON.parse(llamadas[0].opciones.body), { concepto: "Dulce", monto: 25, confirmado: true });

  const e = await api.estado("a.b+c");
  assert.equal(e.estado, "pendiente");
  assert.equal(llamadas[1].url, "/api/estado?ticket=a.b%2Bc");

  await assert.rejects(api.salud(), (err) => err.codigo === "HTTP_404" && err.message === T.errores.NO_EXISTE);

  // Sin confirmación explícita nunca se manda confirmado: true.
  await assert.rejects(api.crearCobro({ concepto: "Dulce", monto: 1 }));
  assert.equal(JSON.parse(llamadas.at(-1).opciones.body).confirmado, false);
});

test("api: error de red → RED", async () => {
  const api = crearApi({
    fetchImpl: async () => {
      throw new TypeError("Failed to fetch");
    },
  });
  await assert.rejects(api.agente("hola"), (e) => e.codigo === "RED" && e.message === T.errores.RED);
});

test("seguimiento: consulta hasta 'pagado' y se detiene", async () => {
  const estados = ["pendiente", "pendiente", "pagado", "pendiente"];
  let consultas = 0;
  const vistos = [];
  await new Promise((listo) => {
    const s = crearSeguimiento({
      intervaloMs: 5,
      consultar: async (ticket) => {
        assert.equal(ticket, "t1");
        return { estado: estados[consultas++], monto: 1 };
      },
      alEstado: (e) => {
        vistos.push(e.estado);
        if (e.estado === "pagado") setTimeout(listo, 40);
      },
    });
    s.iniciar("t1");
  });
  assert.deepEqual(vistos, ["pendiente", "pendiente", "pagado"]);
  assert.equal(consultas, 3);
});

test("seguimiento: TICKET_INVALIDO detiene la consulta", async () => {
  let consultas = 0;
  let s;
  await new Promise((listo) => {
    s = crearSeguimiento({
      intervaloMs: 5,
      consultar: async () => {
        consultas += 1;
        throw new ErrorApi("TICKET_INVALIDO", "x", 400);
      },
      alError: () => setTimeout(listo, 40),
    });
    s.iniciar("malo");
  });
  assert.equal(consultas, 1);
  assert.equal(s.activo, false);
});
