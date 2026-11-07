// Configuración del servidor. Se lee en cada llamada (no al importar) para que las pruebas puedan cambiar process.env.
// Las llaves NUNCA salen de aquí hacia el navegador: solo se expone si existen (booleano).

const MODOS = ["simulacion", "prueba", "comercio"];

export function leerConfig(env = process.env) {
  const tienePey = Boolean(env.PEY_API_KEY);
  const tieneOpenAI = Boolean(env.OPENAI_API_KEY);
  const pedido = String(env.MODO_PAGO || "").trim().toLowerCase();
  // Sin llave de pey no hay forma de cobrar de verdad: se fuerza SIMULACIÓN.
  let modoPago = MODOS.includes(pedido) ? pedido : tienePey ? "prueba" : "simulacion";
  if (!tienePey) modoPago = "simulacion";

  const max = Number(env.MAX_MONTO_MXN);
  return {
    modoPago,
    maxMontoMxn: Number.isFinite(max) && max > 0 ? max : 20,
    expiracionSegundos: 600, // pey: 0 = no vence, o 360 s o más (K03.4)
    pey: {
      apiKey: env.PEY_API_KEY || "",
      webhookSecret: env.PEY_WEBHOOK_SECRET || "",
      baseUrl: "https://api.pey.mx", // único entorno documentado (K03.3)
    },
    openai: {
      apiKey: env.OPENAI_API_KEY || "",
      modelo: env.OPENAI_MODEL || "gpt-6.1-sol", // K04.2
      baseUrl: "https://api.openai.com/v1",
    },
    tienePey,
    tieneOpenAI,
    // Secreto para firmar los "tickets" de cobro (pedido firmado sin base de datos).
    secretoTickets: env.APP_SECRET || (tienePey ? `pey:${env.PEY_API_KEY}` : "ya-cayo-simulacion"),
  };
}

export function configPublica(cfg = leerConfig()) {
  return {
    modoPago: cfg.modoPago,
    maxMontoMxn: cfg.maxMontoMxn,
    openai: cfg.tieneOpenAI,
    pey: cfg.tienePey,
  };
}
