// Seguimiento del pago: consulta /api/estado cada 2 s con el ticket del cobro activo.
// Para cuando el estado es "pagado" o "expirado". "¿Ya cayó?" consulta al instante (un pago tardío gana).
// También: vibración y voz al confirmarse el pago. No toca el DOM al importarse (lo prueban en Node).

const FINALES = new Set(["pagado", "expirado"]);

export function crearSeguimiento({ consultar, alEstado, alError, intervaloMs = 2000, intervaloLentoMs = 5000 } = {}) {
  let ticket = null;
  let activo = false;
  let temporizador = null;
  let generacion = 0; // cambia al detener o al iniciar otro cobro: descarta respuestas viejas
  let enVuelo = null;
  let fallos = 0;

  function programar(ms) {
    clearTimeout(temporizador);
    temporizador = activo ? setTimeout(ciclo, ms) : null;
  }

  async function consultaUna(manual) {
    const gen = generacion;
    const t = ticket;
    if (!t) return null;
    try {
      const e = await consultar(t);
      if (gen !== generacion) return null;
      fallos = 0;
      if (e && FINALES.has(e.estado)) detener();
      alEstado?.(e, { manual });
      return e;
    } catch (err) {
      if (gen !== generacion) return null;
      fallos += 1;
      if (err?.codigo === "TICKET_INVALIDO") detener();
      alError?.(err, { manual, fallos });
      return null;
    }
  }

  async function ciclo() {
    if (!activo) return;
    if (enVuelo) return programar(intervaloMs);
    const gen = generacion;
    enVuelo = consultaUna(false);
    const e = await enVuelo;
    if (gen === generacion) enVuelo = null;
    if (!activo || gen !== generacion) return;
    const lento = fallos > 0 || e?.estado === "no_verificable";
    programar(lento ? Math.min(intervaloLentoMs * Math.max(1, fallos), 15000) : intervaloMs);
  }

  function iniciar(nuevoTicket) {
    detener();
    ticket = nuevoTicket || null;
    fallos = 0;
    activo = Boolean(ticket);
    programar(0);
  }

  function detener({ olvidar = false } = {}) {
    activo = false;
    generacion += 1;
    clearTimeout(temporizador);
    temporizador = null;
    enVuelo = null;
    if (olvidar) ticket = null;
  }

  // Consulta inmediata (botón "¿Ya cayó?", regreso a la pestaña, fin de la cuenta regresiva o pago simulado).
  async function consultarAhora({ manual = true } = {}) {
    if (!ticket) return null;
    const e = await consultaUna(manual);
    if (activo) programar(intervaloMs);
    return e;
  }

  return {
    iniciar,
    detener,
    consultarAhora,
    actualizarTicket(nuevo) {
      if (nuevo) ticket = nuevo;
    },
    get activo() {
      return activo;
    },
    get ticket() {
      return ticket;
    },
  };
}

// ---- Avisos al confirmarse el pago ----
let vozEspanol = null;

function elegirVoz() {
  try {
    const voces = globalThis.speechSynthesis?.getVoices?.() || [];
    vozEspanol =
      voces.find((v) => /^es[-_]MX/i.test(v.lang)) ||
      voces.find((v) => /^es[-_](US|419)/i.test(v.lang)) ||
      voces.find((v) => /^es([-_]|$)/i.test(v.lang)) ||
      null;
  } catch {
    vozEspanol = null;
  }
  return vozEspanol;
}

export function cargarVoces() {
  const s = globalThis.speechSynthesis;
  if (!s) return;
  elegirVoz();
  try {
    s.addEventListener?.("voiceschanged", elegirVoz);
  } catch {
    /* sin eventos de voz */
  }
}

// iOS solo deja hablar después de un gesto: se "desbloquea" con un enunciado mudo al confirmar el cobro.
export function prepararVoz() {
  try {
    const s = globalThis.speechSynthesis;
    if (!s || typeof SpeechSynthesisUtterance !== "function") return;
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    u.lang = "es-MX";
    s.speak(u);
  } catch {
    /* sin voz: solo texto */
  }
}

// Dice el texto con una voz en español. Si el equipo no tiene voz en español, no dice nada (solo texto en pantalla).
export function anunciarPago(texto) {
  try {
    const s = globalThis.speechSynthesis;
    if (!s || typeof SpeechSynthesisUtterance !== "function") return false;
    const voz = vozEspanol || elegirVoz();
    if (!voz) return false;
    s.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.voice = voz;
    u.lang = voz.lang || "es-MX";
    u.rate = 1;
    u.pitch = 1;
    s.speak(u);
    return true;
  } catch {
    return false;
  }
}

export function vibrarPago() {
  try {
    globalThis.navigator?.vibrate?.([180, 90, 180, 90, 320]);
  } catch {
    /* sin vibración */
  }
}
