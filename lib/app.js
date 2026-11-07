// Manejadores HTTP. Cada archivo de api/ llama a uno. Para pruebas: crearApp({ env, fetch, ahora, almacen }).
import { avisosDeConfig, leerConfig } from "./config.js";
import { crearAlmacenMemoria } from "./almacen-memoria.js";
import { crearAlmacenSupabase } from "./almacen-supabase.js";
import { crearClientePey } from "./pey.js";
import { crearServicio } from "./servicio.js";
import { hoyCdmx, reporteDelDia } from "./reporte.js";
import { analizarNegocio } from "./ia.js";
import { firmaValida } from "./webhook.js";
import { iguales } from "./seguridad.js";
import { ErrorApp } from "./errores.js";
import { aRespuesta, json, leerJson } from "./http.js";

let memoriaCompartida = null; // una por proceso: en local la SIMULACIÓN conserva los datos entre peticiones

export function crearApp({ env = process.env, fetch: f = globalThis.fetch, ahora = Date.now, almacen } = {}) {
  const config = leerConfig(env);
  const alm =
    almacen ||
    (config.baseDatos === "supabase"
      ? crearAlmacenSupabase({ url: config.supabaseUrl, llave: config.supabaseKey, fetch: f })
      : (memoriaCompartida ||= crearAlmacenMemoria()));
  const pey = config.simulacion ? null : crearClientePey({ apiKey: config.peyKey, fetch: f });
  const servicio = crearServicio({ config, almacen: alm, pey, ahora });

  const salud = () => ({
    ok: true,
    modo: config.modo,
    cobroPrueba: !config.simulacion && config.cobroPrueba,
    montoPrueba: config.montoPrueba,
    baseDatos: config.baseDatos,
    ia: config.ia,
    cajaConPin: Boolean(config.cajaPin),
    avisos: avisosDeConfig(config),
  });

  function exigirCaja(request) {
    if (!config.cajaPin) {
      if (!config.simulacion) throw new ErrorApp("PIN_NO_CONFIGURADO", "Define CAJA_PIN en el servidor para usar la caja con cobros reales.", 403);
      return;
    }
    if (!iguales(request.headers.get("x-caja-pin") || "", config.cajaPin)) throw new ErrorApp("PIN_REQUERIDO", "Escribe el PIN de la caja.", 401);
  }

  const manejar = (fn) => async (request) => {
    try {
      return json(await fn(request));
    } catch (e) {
      return aRespuesta(e);
    }
  };
  const caja = (fn) => manejar(async (request) => {
    exigirCaja(request);
    return fn(request);
  });
  const query = (request) => new URL(request.url).searchParams;

  return {
    config,
    almacen: alm,
    salud: manejar(async () => salud()),
    verMesa: manejar(async (request) => {
      const q = query(request);
      return servicio.verMesa({ m: q.get("m"), t: q.get("t") });
    }),
    pagar: manejar(async (request) => servicio.pagar(await leerJson(request))),
    simularPago: manejar(async (request) => servicio.simularPago(await leerJson(request))),

    async webhook(request) {
      const cuerpo = await request.text();
      if (!config.webhookSecreto || !firmaValida({ secreto: config.webhookSecreto, headers: request.headers, cuerpo, ahoraMs: ahora() })) {
        return json({ error: { codigo: "FIRMA_INVALIDA", mensaje: "Firma inválida." } }, 400);
      }
      let evento;
      try {
        evento = JSON.parse(cuerpo);
      } catch {
        return json({ error: { codigo: "JSON_INVALIDO", mensaje: "Cuerpo inválido." } }, 400);
      }
      try {
        const r = await servicio.procesarEvento(evento);
        return json({ ok: true, ...r });
      } catch (e) {
        // 5xx: pey puede reintentar (⚪ su política de reintentos no está documentada, pey/09)
        return aRespuesta(e);
      }
    },

    cajaEstado: caja(async (request) => ({ ...(await servicio.estadoCaja({ origen: new URL(request.url).origin })), salud: salud() })),
    cajaOrden: caja(async (request) => {
      const b = await leerJson(request, 20_000);
      return servicio.guardarOrden({ mesaId: Number(b.mesaId), items: b.items, descuentoOrdenPct: b.descuentoOrdenPct ?? 0 });
    }),
    cajaInventario: caja(async () => servicio.inventario()),
    cajaReporte: caja(async (request) => reporteDelDia(alm, query(request).get("fecha") || hoyCdmx(ahora()))),
    cajaAnalisis: caja(async () => {
      const [reporte, inventario] = await Promise.all([reporteDelDia(alm, hoyCdmx(ahora())), servicio.inventario()]);
      return analizarNegocio({ reporte, inventario: inventario.ingredientes }, { apiKey: config.openaiKey, modelo: config.openaiModelo, fetch: f });
    }),
  };
}
