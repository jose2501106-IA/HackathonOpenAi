// Todos los textos visibles de "¿Ya cayó?" (español de México) y utilidades de formato puras.
// No toca el DOM al importarse: también lo usan las pruebas de Node (app/tests/interfaz.test.js).

const formatoMonto = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatearMonto(pesos) {
  const n = Number(pesos);
  return Number.isFinite(n) ? formatoMonto.format(n) : "—";
}

export const T = {
  pagina: { titulo: "¿Ya cayó? · Cobra con CoDi y deja que pey confirme" },
  marca: "¿Ya cayó?",
  lema: "La captura no es dinero.",
  saltar: "Saltar al contenido",
  comun: { cerrar: "Cerrar", sinDato: "No se ve" },

  modo: {
    etiqueta: "Modo de pago",
    cargando: "Conectando…",
    sinConexion: "SIN CONEXIÓN",
    simulacion: "SIMULACIÓN",
    prueba: "MODO PRUEBA",
    comercio: "COMERCIO",
    banner: {
      simulacion: "SIMULACIÓN: aquí no se mueve dinero real.",
      prueba: "MODO PRUEBA: cobros reales de $0.01 a $1 con la cuenta de prueba de pey.",
      "sin-conexion": "No me puedo conectar con la caja. Revisa tu internet; sigo intentando.",
    },
  },

  pedido: {
    titulo: "¿Qué vendiste?",
    ayuda: "Escríbelo o díctalo como se lo dirías a alguien de tu puesto.",
    placeholder: "Ej. cóbrale una paleta",
    ejemplosTitulo: "O toca un ejemplo:",
    ejemplos: ["Cóbrale un dulce de tamarindo", "Cóbrale 15 de una paleta"],
    enviar: "Preparar cobro",
    enviando: "Entendiendo tu pedido…",
    microfono: "Dictar el pedido",
    microfonoParar: "Dejar de escuchar",
    escuchando: "Te escucho… di qué vendiste.",
    textoVacio: "Escribe qué vendiste, por ejemplo «cóbrale 15 de una paleta».",
    textoLargo: "Escríbelo más corto: máximo 300 letras.",
    micSinPermiso: "Dale permiso al micrófono para dictar, o escribe el pedido.",
    micNoEscuche: "No te escuché. Intenta de nuevo o escríbelo.",
    micError: "No pude usar el micrófono. Escribe el pedido.",
    manual: "Escribir el cobro a mano",
    revisar: "¿Te enseñaron una captura? Revísala",
  },

  propuesta: {
    titulo: "Revisa el cobro",
    pediste: (texto) => `Pediste: «${texto}»`,
    origen: {
      openai: "Entendido con OpenAI",
      reglas: "Reglas locales (sin IA)",
      manual: "Cobro a mano",
    },
    sinPropuesta: "No entendí el monto. Escríbelo y confirma.",
    manual: "Escribe qué vendiste y cuánto vas a cobrar.",
    conceptoPorDefecto: "Venta",
    concepto: "Concepto",
    conceptoAyuda: "Tu clienta lo verá en su banco. Máximo 40 letras.",
    conceptoVacio: "Escribe qué vendiste.",
    conceptoLargo: "Máximo 40 letras.",
    monto: "Monto a cobrar",
    tope: (max) => `Tope por cobro: ${formatearMonto(max)}.`,
    excedeTope: (max) => `Pasa del tope de ${formatearMonto(max)} por cobro: baja el monto para confirmar.`,
    montoInvalido: "Escribe un monto mayor que $0.00.",
    detalle: "Detalle del pedido",
    confirmar: "Confirmar y generar QR",
    generando: "Generando QR…",
    cambiar: "Cambiar pedido",
  },

  qr: {
    titulo: "Escanea con la app de tu banco",
    sello: "QR de SIMULACIÓN",
    alt: (monto, concepto) => `Código QR CoDi para pagar ${formatearMonto(monto)} por ${concepto}`,
    ref: (numRef) => `Referencia ${numRef}`,
    venceEn: (t) => `Vence en ${t}`,
    vencio: "Este QR ya venció",
    vencioCorto: "Venció",
    vencioRevisando: "Se acabó el tiempo; reviso con pey…",
    sinImagen: "No pude mostrar la imagen del QR. Haz otro cobro.",
    yaCayo: "¿Ya cayó?",
    consultando: "Preguntando a pey…",
    revisar: "Revisar una captura",
    simular: "Simular pago (demo)",
    simulando: "Simulando pago…",
    otro: "Cancelar y hacer otro cobro",
    nuevo: "Hacer otro cobro",
    confirmarSalir: "¿Dejar este cobro? Si tu clienta ya pagó, primero toca «¿Ya cayó?».",
  },

  estado: {
    esperando: "Esperando pago…",
    consultando: "Preguntando a pey…",
    todaviaNo: "Todavía no cae: no entregues.",
    expirado: "Venció sin pago. Si te van a pagar, haz otro cobro.",
    reintentando: "Sin respuesta de la caja; sigo intentando…",
    noVerificable: "No pude verificar con pey; sigo intentando…",
    avisos: {
      pago_con_monto_distinto: "Llegó un pago con otro monto: no entregues y revisa con tu clienta.",
      qr_no_encontrado_con_esta_llave: "pey no encuentra este cobro con esta llave. Revisa la configuración de la caja.",
      pey_no_responde: "pey no responde ahorita; sigo intentando…",
    },
  },

  pagado: {
    titulo: "¡Ya cayó!",
    confirmado: "confirmado por pey",
    simulacion: "SIMULACIÓN",
    entrega: "Ya puedes entregar.",
    hora: (h) => `a las ${h}`,
    transaccion: (id) => `Transacción ${id}`,
    nuevo: "Nuevo cobro",
  },

  voz: {
    pago: (monto, simulacion) =>
      `Ya cayó tu dinero: ${montoEnPalabras(monto)}${simulacion ? ". Es una simulación." : ""}`,
  },

  revision: {
    titulo: "Revisar una captura",
    regla: "La captura no es dinero: solo pey confirma si el pago llegó.",
    conCobro: (concepto, monto) => `La comparo con tu cobro activo: ${concepto} · ${monto}.`,
    sinCobro: "No hay cobro activo: busco el pago entre tus cobros recientes de pey.",
    foto: "Tomar foto de la captura",
    archivo: "Elegir imagen",
    ejemplo: "Usar captura de ejemplo",
    pieEjemplo: "Captura de ejemplo (ficticia)",
    pieArchivo: "Tu captura (no se guarda)",
    preparando: "Preparando la imagen…",
    leyendo: "Leyendo la captura y preguntando a pey…",
    manualAbrir: "Escribir el monto a mano",
    manualTitulo: "Monto que dice la captura",
    manualAyuda: "Úsalo si la IA no está disponible o no pudo leer la captura.",
    manualEnviar: "Revisar con este monto",
    manualInvalido: "Escribe un monto mayor que $0.00.",
    iaNoDisponible: "La lectura con IA no está disponible: escribe el monto que dice la captura.",
    noEsImagen: "Ese archivo no es una imagen. Elige una foto o una captura de pantalla.",
    noAbre: "No pude abrir esa imagen. Prueba con otra o toma una captura de pantalla.",
    muyGrande: "La imagen pesa demasiado. Prueba con una captura de pantalla.",
    leidoTitulo: "Lo que leí",
    campos: { monto: "Monto", fecha: "Fecha", hora: "Hora", clave: "Clave de rastreo" },
    noComprobante: "No parece un comprobante de transferencia.",
    noLegible: "La imagen no se lee bien.",
    origen: {
      openai: "Leído con OpenAI",
      manual: "Monto escrito a mano",
      simulacion: "Lectura de ejemplo · SIMULACIÓN",
    },
    pago: (monto, hora) => `Pago en pey: ${monto}${hora ? ` a las ${hora}` : ""}.`,
    otra: "Revisar otra captura",
    volver: "Volver al cobro",
    listo: "Listo",
  },

  // Veredicto de la revisión: lo decide el servidor con código (nunca se dice "falso").
  veredictos: {
    ya_cayo: { color: "verde", icono: "palomita", titulo: "¡Ya cayó! Puedes entregar" },
    todavia_no_cae: { color: "ambar", icono: "alto", titulo: "Todavía no cae: no entregues" },
    coincide: { color: "verde", icono: "palomita", titulo: "Coincide con un pago en pey" },
    dudoso: { color: "ambar", icono: "alto", titulo: "Revísalo antes de entregar" },
    no_encontrado: {
      color: "gris",
      icono: "lupa",
      titulo: "No encuentro este pago en pey",
      mensaje: "Si te transfirieron directo a tu cuenta, revisa tu banco o el CEP de Banxico con la clave de rastreo.",
    },
    ilegible: {
      color: "gris",
      icono: "lupa",
      titulo: "No pude leer la captura",
      mensaje: "Escribe el monto a mano o toca «¿Ya cayó?».",
    },
    no_verificable: {
      color: "gris",
      icono: "lupa",
      titulo: "No pude verificar con pey",
      mensaje: "Intenta de nuevo en unos segundos.",
    },
  },

  como: {
    abrir: "Cómo funciona",
    titulo: "Cómo funciona",
    pasos: [
      {
        titulo: "1 · Cobra con QR CoDi",
        texto: "Dime qué vendiste. La IA arma el cobro y tú confirmas el monto antes de generar el QR. CoDi no cobra comisión.",
      },
      {
        titulo: "2 · La captura no es dinero",
        texto: "Si te enseñan una captura, la IA lee el monto, la hora y la clave de rastreo. Pero solo pey dice si el dinero llegó.",
      },
      {
        titulo: "3 · ¡Ya cayó!",
        texto: "Cuando pey confirma el pago, te aviso en pantalla, con vibración y en voz alta. Entonces entregas.",
      },
    ],
    nota: "No guardamos tus capturas. Si te pagaron por transferencia directa, revisa tu banco o el CEP de Banxico con la clave de rastreo.",
    cerrar: "Entendido",
  },

  pie: {
    servicios: "Cobro con CoDi, sin comisión · pagos verificados con pey · lectura con OpenAI",
    ley: "Listo para la Ley de Economía Digital: cobra con QR",
    como: "Cómo funciona",
  },

  // Códigos de error del contrato (docs/CONTRATO-API.md) y de la red.
  errores: {
    CONFIRMACION_REQUERIDA: "Falta tu confirmación: revisa el monto y toca «Confirmar y generar QR».",
    MONTO_INVALIDO: "Revisa el monto: tiene que ser mayor que $0 y no pasar del tope por cobro.",
    CONCEPTO_INVALIDO: "Escribe qué vendiste en máximo 40 letras.",
    PEY_NO_AUTORIZADO: "pey no aceptó la llave de cobro. Revisa la configuración de la caja.",
    PEY_NO_RESPONDE: "pey no responde ahorita. Espera unos segundos e intenta de nuevo.",
    TICKET_INVALIDO: "No reconozco este cobro. Genera uno nuevo.",
    SOLO_SIMULACION: "El pago simulado solo funciona en modo SIMULACIÓN.",
    IMAGEN_GRANDE: "La imagen pesa demasiado. Prueba con una captura de pantalla.",
    IA_NO_DISPONIBLE: "La lectura con IA no está disponible: escribe el monto a mano.",
    IA_SIN_SALDO: "La lectura con IA no está disponible: escribe el monto a mano.",
    DEMASIADO_GRANDE: "Lo que enviaste es demasiado grande. Prueba con algo más corto o una imagen más ligera.",
    JSON_INVALIDO: "No pude enviar la solicitud. Intenta de nuevo.",
    ERROR_INTERNO: "Algo falló de nuestro lado. Intenta de nuevo.",
    RED: "Sin conexión con la caja. Revisa tu internet e intenta de nuevo.",
    TIEMPO: "La caja tardó demasiado en responder. Intenta de nuevo.",
    RESPUESTA_INVALIDA: "La caja respondió algo que no entiendo. Intenta de nuevo.",
    NO_EXISTE: "Ese servicio de la caja todavía no está disponible.",
    GENERICO: "Algo salió mal. Intenta de nuevo.",
  },
};

// Texto humano para un error: primero el de textos.js, luego el del servidor, luego uno genérico.
export function mensajeError(codigo, mensajeServidor, status) {
  if (codigo && Object.hasOwn(T.errores, codigo)) return T.errores[codigo];
  if (typeof mensajeServidor === "string" && mensajeServidor.trim()) return mensajeServidor.trim();
  if (status === 404) return T.errores.NO_EXISTE;
  if (status >= 500) return T.errores.ERROR_INTERNO;
  return T.errores.GENERICO;
}

// Lee un monto escrito por la persona: "15", "1.50", "1,50", "$ 20", "1,000.50". Regresa pesos con 2 decimales o NaN.
export function leerMonto(valor) {
  if (typeof valor === "number") return Number.isFinite(valor) ? Math.round(valor * 100) / 100 : NaN;
  let s = String(valor ?? "").trim().replace(/\s|\$|mxn/gi, "");
  if (!s) return NaN;
  if (/^\d+,\d{1,2}$/.test(s)) s = s.replace(",", ".");
  else s = s.replace(/,/g, "");
  if (!/^\d*\.?\d*$/.test(s) || s === ".") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
}

// null si el monto sirve; si no, "vacio" | "invalido" | "tope".
export function validarMonto(monto, max) {
  if (monto === null || monto === undefined || Number.isNaN(monto)) return "vacio";
  if (!Number.isFinite(monto) || monto < 0.01) return "invalido";
  if (Number.isFinite(max) && max > 0 && monto > max) return "tope";
  return null;
}

// Hora de la Ciudad de México en 24 h ("14:05").
export function formatearHora(iso) {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Mexico_City",
  });
}

// Cuenta regresiva "m:ss".
export function formatearCuenta(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// ---- Monto en palabras para la voz ("un peso", "quince pesos", "un peso con cincuenta centavos") ----
const UNIDADES = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
  "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
  "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete",
  "veintiocho", "veintinueve",
];
const DECENAS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const CENTENAS = [
  "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
  "seiscientos", "setecientos", "ochocientos", "novecientos",
];

function menorDeMil(n) {
  if (n === 100) return "cien";
  const c = Math.floor(n / 100);
  const r = n % 100;
  const partes = [];
  if (c) partes.push(CENTENAS[c]);
  if (r) partes.push(r < 30 ? UNIDADES[r] : DECENAS[Math.floor(r / 10)] + (r % 10 ? ` y ${UNIDADES[r % 10]}` : ""));
  return partes.join(" ");
}

// "uno" → "un" antes de un sustantivo masculino ("un peso", "veintiún pesos", "treinta y un mil").
function apocopar(texto) {
  return texto.replace(/veintiuno$/, "veintiún").replace(/uno$/, "un");
}

export function numeroEnPalabras(n) {
  n = Math.floor(Math.abs(Number(n) || 0));
  if (n === 0) return "cero";
  const millones = Math.floor(n / 1e6);
  const miles = Math.floor((n % 1e6) / 1000);
  const resto = n % 1000;
  const partes = [];
  if (millones) partes.push(millones === 1 ? "un millón" : `${apocopar(menorDeMil(millones))} millones`);
  if (miles) partes.push(miles === 1 ? "mil" : `${apocopar(menorDeMil(miles))} mil`);
  if (resto) partes.push(menorDeMil(resto));
  return partes.join(" ");
}

export function montoEnPalabras(pesos) {
  const centavosTotales = Math.round(Number(pesos) * 100);
  if (!Number.isFinite(centavosTotales) || centavosTotales < 0) return "";
  const p = Math.floor(centavosTotales / 100);
  const c = centavosTotales % 100;
  const partes = [];
  if (p > 0) {
    const deMillon = p >= 1e6 && p % 1e6 === 0 ? " de" : "";
    partes.push(`${apocopar(numeroEnPalabras(p))}${deMillon} ${p === 1 ? "peso" : "pesos"}`);
  }
  if (c > 0) partes.push(`${apocopar(numeroEnPalabras(c))} ${c === 1 ? "centavo" : "centavos"}`);
  return partes.length ? partes.join(" con ") : "cero pesos";
}

// Pone los textos en el HTML: data-t="ruta" (textContent) y data-t-placeholder / -aria-label / -title / -alt.
export function obtenerTexto(ruta) {
  return String(ruta)
    .split(".")
    .reduce((o, k) => (o === null || o === undefined ? undefined : o[k]), T);
}

export function aplicarTextos(raiz) {
  raiz.querySelectorAll("[data-t]").forEach((el) => {
    const v = obtenerTexto(el.dataset.t);
    if (typeof v === "string") el.textContent = v;
  });
  for (const attr of ["placeholder", "aria-label", "title", "alt"]) {
    raiz.querySelectorAll(`[data-t-${attr}]`).forEach((el) => {
      const v = obtenerTexto(el.getAttribute(`data-t-${attr}`));
      if (typeof v === "string") el.setAttribute(attr, v);
    });
  }
}
