// Lógica de todas las rutas /api. Las funciones de api/ solo la llaman.
// Dependencias inyectables (env, fetch, reloj) para probar sin servicios reales.
import { leerConfig } from "./config.js";
import { ErrorApp } from "./errores.js";
import { json, leerJson, aRespuesta } from "./http.js";
import { menuPublico } from "./menu.js";
import { crearPedido, leerPedido, montoACobrar } from "./pedido.js";
import { interpretarBasico } from "./interpretar.js";
import { interpretarConIA } from "./ia.js";
import { crearClientePey } from "./pey.js";
import { estadoDeTransaccion, estadoDePagosQr, estadoPorPedido } from "./estado.js";
import { qrSvg } from "./qr.js";
import { firmaValida } from "./webhook.js";
import { iguales } from "./seguridad.js";

export const VIGENCIA_COBRO_S = 600; // pey pide >= 360 s (pey/04)
export const SIM_SEGUNDOS_HASTA_PAGO = 8;
const RE_TELEFONO = /^[0-9]{10}$/;
const RE_ID_PEY = /^[0-9A-Za-z]{6,40}$/;
const RE_ID_SIM = /^sim-(\d{13})$/;

function revisarPin(request, cfg) {
  if (!cfg.cajaPin) return;
  if (!iguales(request.headers.get("x-caja-pin") || "", cfg.cajaPin)) {
    throw new ErrorApp("PIN_INCORRECTO", "El PIN de caja no es correcto.", 401);
  }
}

async function conPista(promesa, pista) {
  try {
    return await promesa;
  } catch (e) {
    if (e instanceof ErrorApp && e.codigo === "PEY_ERROR" && pista) e.message = `${e.message} ${pista}`;
    throw e;
  }
}

export function crearApp({ env = process.env, fetch: f = globalThis.fetch, ahora = () => Date.now() } = {}) {
  const cfg = leerConfig(env);
  const pey = cfg.simulacion ? null : crearClientePey({ apiKey: cfg.peyKey, fetch: f });
  const opcionesPedido = (extra = {}) => ({ llaveFirma: cfg.llaveFirma, ahora: ahora(), ...extra });
  const envolver = (fn) => async (request) => {
    try {
      return await fn(request);
    } catch (e) {
      return aRespuesta(e);
    }
  };

  return {
    salud: envolver(async () =>
      json({ ok: true, modo: cfg.modo, ia: cfg.ia, montoMaximo: cfg.montoMaximo, negocio: cfg.negocio, pinRequerido: Boolean(cfg.cajaPin) }),
    ),

    menu: envolver(async () => json({ negocio: cfg.negocio, ejemplo: true, productos: menuPublico() })),

    interpretar: envolver(async (request) => {
      revisarPin(request, cfg);
      const { texto } = await leerJson(request);
      if (typeof texto !== "string" || !texto.trim()) throw new ErrorApp("TEXTO_VACIO", "Escribe o dicta el pedido.");
      if (texto.length > 500) throw new ErrorApp("TEXTO_LARGO", "El pedido es muy largo: máximo 500 caracteres.");
      if (!cfg.ia) return json(interpretarBasico(texto));
      try {
        return json(await interpretarConIA(texto.trim(), { apiKey: cfg.openaiKey, modelo: cfg.openaiModelo, fetch: f }));
      } catch (e) {
        console.error("IA no disponible:", e?.message);
        return json({ ...interpretarBasico(texto), aviso: "La IA no respondió; usamos la interpretación básica. Revisa el pedido." });
      }
    }),

    crearPedido: envolver(async (request) => {
      revisarPin(request, cfg);
      const { items } = await leerJson(request);
      const { codigo, pedido } = crearPedido(items, opcionesPedido());
      const url = `${new URL(request.url).origin}/p?o=${codigo}`;
      return json({ pedido, cobro: montoACobrar(pedido.total, cfg.montoMaximo), codigo, url, qrSvg: await qrSvg(url) });
    }),

    verPedido: envolver(async (request) => {
      const { pedido } = leerPedido(new URL(request.url).searchParams.get("o"), opcionesPedido());
      return json({ pedido, cobro: montoACobrar(pedido.total, cfg.montoMaximo), negocio: cfg.negocio, modo: cfg.modo });
    }),

    crearCobro: envolver(async (request) => {
      const { o, metodo, telefono, confirmo } = await leerJson(request);
      if (confirmo !== true) throw new ErrorApp("FALTA_CONFIRMACION", "Confirma el cobro antes de enviarlo.");
      if (metodo !== "push" && metodo !== "qr") throw new ErrorApp("METODO_INVALIDO", "El método de cobro debe ser push o qr.");
      const { pedido } = leerPedido(o, opcionesPedido());
      if (metodo === "push" && !(typeof telefono === "string" && RE_TELEFONO.test(telefono))) {
        throw new ErrorApp("TELEFONO_INVALIDO", "Escribe tu número celular de 10 dígitos, sin espacios.");
      }
      const { monto, montoPrueba } = montoACobrar(pedido.total, cfg.montoMaximo);
      const base = { metodo, monto, montoPrueba, vence: Math.floor(ahora() / 1000) + VIGENCIA_COBRO_S, simulacion: cfg.simulacion };

      if (cfg.simulacion) {
        const id = `sim-${ahora()}`;
        if (metodo === "push") return json({ ...base, id });
        return json({ ...base, id, qrSvg: await qrSvg(`SIMULACION: este QR no cobra nada (${id})`) });
      }

      const datos = {
        monto,
        concepto: `Tocale pedido ${pedido.id}`,
        numRef: pedido.id,
        metadata: { pedido: pedido.id, app: "tocale" },
        expiracion: VIGENCIA_COBRO_S,
      };
      if (metodo === "push") {
        const r = await conPista(
          pey.crearPush({ ...datos, telefono }),
          "Revisa que el número tenga CoDi activo en la app de su banco o pide el QR al cajero.",
        );
        if (!r?.transactionId) throw new ErrorApp("PEY_ERROR", "pey no regresó el identificador del cobro.", 502);
        return json({ ...base, id: r.transactionId });
      }
      const r = await pey.crearQr(datos);
      if (!r?.id || !r?.qrString) throw new ErrorApp("PEY_ERROR", "pey no regresó el QR CoDi.", 502);
      return json({ ...base, id: r.id, qrSvg: await qrSvg(r.qrString) });
    }),

    estado: envolver(async (request) => {
      const p = new URL(request.url).searchParams;
      const { pedido } = leerPedido(p.get("o"), opcionesPedido({ permitirVencido: true }));
      const { monto } = montoACobrar(pedido.total, cfg.montoMaximo);
      const metodo = p.get("metodo");
      const id = p.get("id") || "";
      if (metodo && metodo !== "push" && metodo !== "qr") throw new ErrorApp("METODO_INVALIDO", "El método de cobro debe ser push o qr.");
      if (metodo && !id) throw new ErrorApp("ID_INVALIDO", "Falta el identificador del cobro.");

      if (cfg.simulacion) {
        const m = RE_ID_SIM.exec(id);
        const pagadoMs = m ? Number(m[1]) + SIM_SEGUNDOS_HASTA_PAGO * 1000 : null;
        const pagado = pagadoMs !== null && ahora() >= pagadoMs;
        return json({
          estado: pagado ? "pagado" : "pendiente",
          monto: pagado ? monto : null,
          pagadoEn: pagado ? Math.floor(pagadoMs / 1000) : null,
          simulacion: true,
        });
      }

      if (metodo && !RE_ID_PEY.test(id)) throw new ErrorApp("ID_INVALIDO", "El identificador del cobro no es válido.");
      let r;
      try {
        if (metodo === "push") r = estadoDeTransaccion(await pey.transaccion(id), monto);
        else if (metodo === "qr") r = estadoDePagosQr(await pey.pagosDeQr(id), monto);
        else r = estadoPorPedido(await pey.transaccionesDeLlave(), pedido.id, monto);
      } catch (e) {
        if (e instanceof ErrorApp && e.codigo === "NO_ENCONTRADO") r = { estado: "no_verificable", monto: null, pagadoEn: null };
        else throw e;
      }
      return json({ ...r, simulacion: false });
    }),

    webhook: envolver(async (request) => {
      if (!cfg.webhookSecreto) throw new ErrorApp("WEBHOOK_SIN_SECRETO", "Falta PEY_WEBHOOK_SECRET en el servidor.", 503);
      const cuerpo = await request.text();
      if (cuerpo.length > 100_000) throw new ErrorApp("CUERPO_GRANDE", "La petición es demasiado grande.", 413);
      if (!firmaValida({ secreto: cfg.webhookSecreto, headers: request.headers, cuerpo, ahoraMs: ahora() })) {
        throw new ErrorApp("FIRMA_INVALIDA", "Firma inválida.", 401);
      }
      let evento;
      try {
        evento = JSON.parse(cuerpo);
      } catch {
        throw new ErrorApp("JSON_INVALIDO", "El evento no es JSON válido.");
      }
      // Sin base de datos: solo constancia mínima, sin CLABE, clave de rastreo ni datos personales.
      console.log(
        "Webhook de pey verificado:",
        String(evento?.type ?? "desconocido").slice(0, 60),
        String(evento?.transactionId ?? "").slice(0, 40),
        `pedido ${String(evento?.numRef ?? "").slice(0, 7)}`,
      );
      return json({ recibido: true });
    }),
  };
}
