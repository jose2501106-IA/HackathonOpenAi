// Configuración desde variables de entorno (nombres en .env.example). Nunca regresa llaves al navegador ni las escribe en logs.

const TOPE_ABSOLUTO_CENTAVOS = 500_000; // $5,000: nadie lo sube sin cambiar código
const MODELO_IA_POR_DEFECTO = "gpt-6-luna"; // developers.openai.com/api/docs/models, consultado 2026-11-07 (se cambia con OPENAI_MODEL)

const limpio = (v) => (v || "").trim();

function pesosACentavos(valor, porDefecto) {
  const n = Number.parseFloat(valor ?? "");
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : porDefecto;
}

export function leerConfig(env = process.env) {
  const peyKey = limpio(env.PEY_API_KEY);
  const simulacion = !peyKey || env.MODO_SIMULACION === "1";
  const supabaseUrl = limpio(env.SUPABASE_URL).replace(/\/+$/, "");
  const supabaseKey = limpio(env.SUPABASE_SERVICE_ROLE_KEY);
  const openaiKey = limpio(env.OPENAI_API_KEY);

  const config = {
    modo: simulacion ? "simulacion" : "real",
    simulacion,
    peyKey,
    webhookSecreto: limpio(env.PEY_WEBHOOK_SECRET),
    // MODO PRUEBA: se cobra un monto mínimo real en lugar del total. Activo salvo COBRO_PRUEBA=0.
    cobroPrueba: env.COBRO_PRUEBA !== "0",
    montoPrueba: Math.min(pesosACentavos(env.MONTO_PRUEBA_MXN, 10), 100), // por defecto $0.10; nunca más de $1
    montoMaximo: Math.min(pesosACentavos(env.MONTO_MAXIMO_MXN, 200_000), TOPE_ABSOLUTO_CENTAVOS),
    expiracionSeg: 360, // mínimo y valor por defecto de pey (pey/04)
    baseDatos: supabaseUrl && supabaseKey ? "supabase" : "memoria",
    supabaseUrl,
    supabaseKey,
    cajaPin: limpio(env.CAJA_PIN),
    openaiKey,
    ia: Boolean(openaiKey),
    openaiModelo: limpio(env.OPENAI_MODEL) || MODELO_IA_POR_DEFECTO,
  };
  return config;
}

export function avisosDeConfig(c) {
  const avisos = [];
  if (c.simulacion) avisos.push("SIMULACIÓN: no hay PEY_API_KEY; no se cobra dinero.");
  if (!c.simulacion && c.cobroPrueba) avisos.push(`MODO PRUEBA: se cobran $${(c.montoPrueba / 100).toFixed(2)} reales en lugar del total.`);
  if (!c.simulacion && !c.webhookSecreto) avisos.push("Falta PEY_WEBHOOK_SECRET: los pagos se confirman solo consultando a pey.");
  if (c.baseDatos === "memoria") avisos.push("Sin Supabase: los datos viven en memoria y se pierden al reiniciar.");
  if (!c.simulacion && c.baseDatos === "memoria") avisos.push("Cobro real sin Supabase: configura SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY antes de desplegar.");
  if (!c.cajaPin && !c.simulacion) avisos.push("Falta CAJA_PIN: la caja no se puede usar en modo real sin PIN.");
  if (!c.ia) avisos.push("Sin OPENAI_API_KEY: el análisis con IA está apagado.");
  return avisos;
}
