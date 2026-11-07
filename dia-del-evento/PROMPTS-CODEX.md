# Prompts para Codex web — sábado 7 de noviembre

> Para copiar y pegar en Codex web (chatgpt.com/codex) con el repo conectado. Un prompt = una tarea = un PR pequeño.
> Codex lee [`AGENTS.md`](../AGENTS.md) solo; estos prompts agregan alcance, dueños de archivos y criterios de aceptación.
> Orden y horarios: [`RUNBOOK.md`](RUNBOOK.md). Lo que va a ChatGPT: [`PROMPTS-CHATGPT.md`](PROMPTS-CHATGPT.md).

## Resumen de uso rápido

| # | Tarea | Cuándo (ver RUNBOOK) | Oleada | ¿En paralelo? |
|---|---|---|---|---|
| 0 | Arranque (solo lectura) | 9:15, prueba de humo | 0 | Sí, no escribe nada |
| 1 | Esqueleto + modo SIMULACIÓN + primer deploy | T+0:05 | 1 | **No: va sola** (crea el contrato y los dueños) |
| 2 | Pey real: cobro, QR, estado, webhook | T+0:40 | 2 | Sí, con 3, 4 y 5 |
| 3 | Agente con la Responses API + function calling | T+0:40 | 2 | Sí, con 2, 4 y 5 |
| 4 | Interfaz móvil en español | T+0:40 | 2 | Sí, con 2, 3 y 5 |
| 5 | Confirmación de pago en tiempo real | T+0:40 (o al fusionar la 2) | 2 | Sí, con 2, 3 y 4 |
| 6 | Pruebas de punta a punta, README de entrega y limpieza | T+2:30 | 3 | Sí, con 7 |
| 7 | Pulido para la demo | T+2:30 | 3 | Sí, con 6 |
| 8 | (Opcional) Deck en HTML | T+2:30 | 3 | Sí, con 6 y 7 |
| R1–R6 | Rescate: bug, conflicto, tarea atorada, revisión, tarea nueva | Cuando haga falta | — | Solo si declara archivos propios |

**Si tu límite de Codex es bajo:** en la oleada 2 lanza primero la 2 y la 3 (lo que la demo necesita) y después la 4 y la 5.

**Tres entornos de pago, siempre visibles en pantalla** (los fija la Tarea 1 y los respetan todas):

| `entorno` | Cuándo | Qué dice la pantalla |
|---|---|---|
| `simulacion` | `MODO_PAGO=simulacion`, o falta `PEY_API_KEY`. No llama a Pey | Banner "SIMULACIÓN — no se mueve dinero real" y botón "Simular pago" |
| `prueba` | `MODO_PAGO=prueba` (o vacío con `PEY_API_KEY`). Pey real con la llave ligada a la **cuenta de prueba** que publica Pey (tu CLABE tarda 5 días hábiles en registrarse, K03.3): pagos CoDi **reales** de $0.01 a $1 que no se devuelven | Banner "MODO PRUEBA (pey): cobros reales de centavos a una cuenta de prueba" |
| `comercio` | `MODO_PAGO=comercio`. Pey real con la cuenta del comercio (CLABE activa). Mañana casi seguro no aplica | Sin banner; cobros reales con tope `MAX_MONTO_MXN` |

Pey no tiene sandbox: solo existe producción en `https://api.pey.mx` (K03.3, K03.6). Las únicas variables de Pey son `PEY_API_KEY` y `PEY_WEBHOOK_SECRET`; la etiqueta la decide `MODO_PAGO`, que es del producto (la agrega la Tarea 1).

En Vercel, los **Preview corren siempre en SIMULACIÓN** (`MODO_PAGO=simulacion` y sin llave de Pey). Así los previews de las tareas 3, 4 y 5 funcionan aunque la 2 no esté fusionada, y nadie cobra desde un preview. **Production** pasa a `MODO_PAGO=prueba` cuando se fusiona la Tarea 2.

---

## 1. Cómo usar estos prompts en Codex web

1. En Codex (dentro de ChatGPT) elige trabajar en la nube con el **entorno publicado de este repo** y la rama **`main`** (K05.2; el entorno debe decir "Environment published").
2. Copia el bloque completo del prompt (entre las líneas ```` ``` ````). Reemplaza los `[MARCADORES]` con lo del PRD, o pídele a ChatGPT que lo haga (prompt 4 de [`PROMPTS-CHATGPT.md`](PROMPTS-CHATGPT.md)).
3. Lánzalo como tarea. El prompt 0 es de solo lectura y por eso empieza diciendo que no modifique archivos (K05.6).
4. **Una versión por tarea.** Varias versiones probablemente gastan más del límite (K05.6). Excepción opcional: 2 versiones de la Tarea 4 para escoger el mejor diseño, si te alcanza. Revisa el consumo en chatgpt.com/codex/settings/usage antes de cada oleada (K05.9).
5. No lances dos veces la misma tarea. Si se atora más de 25 min, usa el prompt de rescate R3.
6. Cuando termine: revisa el diff y el registro (que diga que las pruebas pasaron). Si algo falta, pídeselo **en la misma tarea** como seguimiento. Si está bien, crea el PR desde la tarea (nombre del botón ⚪; alternativa: escribir "create a pr" en la tarea y abrir el enlace, K05.7).
7. En GitHub: Vercel comenta el enlace del preview en el PR. Haz la **revisión de 3 minutos** (sección 4) y fusiona con **Squash and merge**.

**Marcadores** (se llenan con `docs/PRD.md`):

| Marcador | Qué va |
|---|---|
| `[RETO OFICIAL]` | Resumen de 2 líneas de `docs/RETO-OFICIAL.md` |
| `[IDEA ELEGIDA]` | Nombre del producto + 1 línea |
| `[FRASE DE VALOR]` | La frase de valor del PRD |
| `[PERSONA]` | Arquetipo de usuario (sin nombres inventados) |
| `[DEMO PASO 1]`, `[DEMO PASO 2]`, `[DEMO PASO 3]` | Los 3 pasos de la demo |
| `[FRASE DE DEMO]` | La frase exacta que dirás o escribirás en el paso 1 |
| `[MONTO DEMO]` | Monto de la demo: 1 peso o menos con la cuenta de prueba de Pey (lo pagado no se devuelve, K03.3) |
| `[HERRAMIENTAS EXTRA]` | Herramientas del agente además de `crear_cobro` (o "ninguna") |
| `[CATÁLOGO DE EJEMPLO]` | Productos y precios de ejemplo del PRD, marcados como ejemplo (o "ninguno") |
| `[ESTILO]` | Colores y tono del PRD (o "limpio, alto contraste, verde para éxito") |
| `[TEXTOS DE CHATGPT]` | Salida del prompt 5 de ChatGPT (textos de la interfaz) |
| `[URL PRODUCCIÓN]` | `https://<proyecto>.vercel.app` (dominio de producción) |
| `[URL VIDEO]` | Enlace al video de respaldo |

**Nota técnica (Node 22):** `node --test app/tests/` falla en Node 22 porque toma la carpeta como si fuera un archivo (lo probé el 2026-11-06 con Node 22.23). Usa `npm test --prefix app`, que corre `node --test` dentro de `app/` y encuentra los `*.test.js`. Alternativa: `node --test "app/tests/**/*.test.js"`.

---

## 2. Mapa de archivos y dueños (por qué las tareas no chocan)

La Tarea 1 crea **todos** los archivos de abajo, con el contrato fijo y una versión mínima que ya funciona en SIMULACIÓN. Después, cada tarea solo edita sus propios archivos. Nadie toca los archivos congelados. Las dependencias npm y las variables de entorno quedan fijas desde la Tarea 1: así no hay conflictos en `package.json`, en el lockfile ni en `.env.example`.

```
app/
├── package.json             T1 (congelado; solo T2 puede agregar `qrcode` para dibujar el QR desde qrString, K03.4)
├── index.html               T4 → T7   (T1 crea el esqueleto con IDs estables)
├── favicon.svg              T7
├── css/estilos.css          T4 → T7
├── css/estado-pago.css      T5
├── js/contrato.js           T1 congelado (estados, formas de datos, validaciones; lo usan navegador y servidor)
├── js/api.js                T1 congelado (cliente del navegador para /api/*)
├── js/vistas.js             T1 congelado (mostrarVista, anunciar, formatoMXN)
├── js/app.js                T4 → T7   (flujo pedido → confirmar → QR)
├── js/textos.js             T4 → T7   (todos los textos visibles)
├── js/estado-pago.js        T5        (seguimiento del pago y vista PAGADO)
├── api/salud.js             T1 congelado
├── api/cobros.js            T2  (T1 deja la versión de simulación)
├── api/estado.js            T2  (T1 deja la versión de simulación)
├── api/webhook-pey.js       T2  (T1 deja 501)
├── api/agente.js            T3  (T1 deja 503 "IA no disponible")
├── api/_lib/config.js       T1 congelado (lee variables de entorno)
├── api/_lib/http.js         T1 congelado (respuestas JSON y errores)
├── api/_lib/pey.js          T2  (T1 deja la simulación)
├── api/_lib/agente.js       T3
├── api/_lib/catalogo.js     T3  (solo si el PRD trae catálogo de ejemplo)
├── servidor-local.js        T1 congelado (plan B: Codespaces sin Vercel)
├── pitch.html               T8 opcional
└── tests/
    ├── base.test.js         T1
    ├── pey.test.js          T2
    ├── agente.test.js       T3
    ├── estado-pago.test.js  T5
    └── flujo.test.js        T6
.env.example (raíz)          T1 agrega MODO_PAGO; T2 solo si K03 exige otra variable
README.md (raíz)             T6
app/README.md                T6
```

**Congelados después de la Tarea 1:** `app/js/contrato.js`, `app/js/api.js`, `app/js/vistas.js`, `app/api/_lib/config.js`, `app/api/_lib/http.js`, `app/api/salud.js`, `app/servidor-local.js`, `app/package.json`. Si una tarea necesita cambiar uno, **no lo cambia**: lo pide en el PR (sección "Pendientes") y José lanza una mini-tarea cuando no haya otras corriendo.

**Archivos de `app/api/_lib/`:** la carpeta empieza con guion bajo para que Vercel no la publique como función ⚪ (K05.16 no lo pudo verificar). Si Vercel la publicara, no expone nada (no exporta GET ni POST), pero dilo en el PR.

## 3. Tabla de paralelismo

| Tarea | Depende de | Corre en paralelo con | Toca SOLO | Por qué no choca |
|---|---|---|---|---|
| 0 | — | Todo | Nada | Solo lee |
| 1 | — | Ninguna | Esqueleto completo | Define contrato y dueños para las demás |
| 2 | 1 fusionada | 3, 4, 5 | `api/_lib/pey.js`, `api/cobros.js`, `api/estado.js`, `api/webhook-pey.js`, `tests/pey.test.js` (+ `package.json`/lockfile solo para `qrcode`) | Es la única que puede tocar dependencias en la oleada 2 |
| 3 | 1 fusionada | 2, 4, 5 | `api/agente.js`, `api/_lib/agente.js`, `api/_lib/catalogo.js`, `tests/agente.test.js` | Usa `config.js` y `http.js` sin cambiarlos |
| 4 | 1 fusionada | 2, 3, 5 | `index.html`, `css/estilos.css`, `js/app.js`, `js/textos.js` | Conserva los IDs que usa la 5 |
| 5 | 1 fusionada | 2, 3, 4 | `js/estado-pago.js`, `css/estado-pago.css`, `tests/estado-pago.test.js` | Usa la firma de `iniciarSeguimiento` fijada por la 1 |
| 6 | 2–5 fusionadas | 7, 8 | `tests/flujo.test.js`, limpieza en `api/**`, `README.md`, `app/README.md` | No toca la interfaz |
| 7 | 2–5 fusionadas | 6, 8 | `index.html`, `css/estilos.css`, `js/app.js`, `js/textos.js`, `favicon.svg` | No toca servidor ni pruebas |
| 8 | 4 fusionada | 6, 7 | `pitch.html`, `css/pitch.css` | Archivos nuevos |

## 4. Revisión de 3 minutos de cada PR (José)

1. **Archivos:** en la pestaña de archivos cambiados del PR, todo está dentro de la columna "Toca SOLO" de su tarea.
2. **Pruebas:** el registro de Codex muestra `npm test --prefix app` sin fallas.
3. **Preview:** abre el enlace del preview que comenta Vercel (desde la laptop: los previews piden sesión de Vercel) y haz el "Cómo probarlo" del prompt.
4. **Secretos:** el diff no tiene llaves ni `.env`.
5. **Fusiona** con Squash and merge. Producción se actualiza sola desde `main`.
6. **Producción:** abre `[URL PRODUCCIÓN]/api/salud` y revisa que `version` cambió.

---

## Prompt 0 · Arranque (solo lectura)

- **Cuándo:** 9:15 como prueba de humo del entorno; repítelo después del PRD si quieres el plan ajustado.
- **Paralelo:** sí, no escribe nada.

```text
TAREA 0 · Arranque. SOLO LECTURA: no cambies ningún archivo, no crees ramas ni PR.

1. Lee AGENTS.md completo y conocimiento/INDICE.md.
2. Lee dia-del-evento/PROMPTS-CODEX.md (plan de tareas, mapa de archivos y dueños).
3. Si existen, lee docs/RETO-OFICIAL.md y docs/PRD.md. Si no existen, dilo y sigue con el plan genérico.
4. Responde en español de México, en este formato:
   a) Las 5 reglas de AGENTS.md que más afectan a las tareas 1–7.
   b) Plan de tareas: tabla Tarea | Archivos | Depende de | Paralelo con | IDs de conocimiento que necesita (p. ej. K03, K04).
      Si hay PRD, ajusta las tareas 2–5 al PRD y marca lo que no cabe en el mapa de archivos.
   c) Riesgos técnicos (máximo 5) con mitigación. Revisa sobre todo: datos de K03 marcados ⚪ que bloquearían
      la Tarea 2 (endpoints, firma del webhook, formato del QR, montos) y el formato de la Responses API en K04.
   d) Lo que necesitas de José (🧑) antes de empezar: llaves, decisiones, cuentas.
   e) Diagnóstico del entorno: versión de Node (`node --version`), si existe app/package.json,
      resultado de `npm test --prefix app` (si app/ aún no existe, dilo) y si esta tarea tiene acceso a internet.
Sé breve: máximo 40 líneas.
```

**Salida esperada:** el plan en una tabla, los riesgos y el diagnóstico del entorno. Si el entorno falla aquí, se arregla antes del kickoff.

---

## Prompt 1 · Esqueleto en `app/` con contrato, modo SIMULACIÓN y primer deploy

- **Cuándo:** T+0:05. **No depende de la idea:** lánzalo mientras ChatGPT ayuda a elegirla.
- **Paralelo:** no. Las tareas 2–5 esperan a que esta se fusione.
- **Antes:** si el reto oficial pide otra superficie (por ejemplo, una app dentro de ChatGPT con el Apps SDK o un bot de mensajería), ajusta este prompt con K04 antes de lanzarlo.

```text
TAREA 1 · Esqueleto de app/ con contrato, modo SIMULACIÓN y servidor local

CONTEXTO
Hackatón de un día. José construye solo, con tareas de Codex en paralelo. Esta tarea crea el esqueleto COMPLETO
del producto para que las tareas 2–5 trabajen al mismo tiempo sin tocar los mismos archivos. El flujo debe
funcionar de punta a punta en modo SIMULACIÓN desde esta tarea: pedir → confirmar → QR → pagado.
Idea: [IDEA ELEGIDA] (si dice "pendiente", haz el esqueleto genérico: agente que propone un cobro CoDi).

LEE PRIMERO
- AGENTS.md (stack por defecto: HTML/CSS/JS sin build + Vercel Functions en app/api, Node 20+ ESM, fetch nativo).
- conocimiento/INDICE.md → K05 (Vercel, Codex) y K03 (solo nombres de estados del cobro y forma del QR).
- dia-del-evento/PROMPTS-CODEX.md, secciones 2 y 3 (mapa de archivos y dueños).
- docs/PRD.md si ya existe.

ALCANCE: crea exactamente estos archivos. Primera línea de cada uno: comentario "Dueño: Tarea N" según el mapa.
- app/package.json: "type": "module"; scripts "test": "node --test" y "local": "node servidor-local.js";
  SIN dependencias.
- app/index.html: una sola página, móvil primero, lang="es-MX", que carga js/app.js como módulo. Secciones e IDs estables:
  #banner-modo · #mensajes (aria-live="polite")
  #vista-pedido: #form-pedido, #entrada-pedido, #chips-ejemplo, #btn-enviar, #enlace-manual,
                 #form-manual, #monto-manual, #concepto-manual
  #vista-confirmar: #resumen-propuesta, #btn-confirmar, #btn-editar
  #vista-qr: #qr-imagen, #qr-monto, #qr-concepto, #estado-pago, #btn-simular-pago, #btn-cancelar
  #vista-pagado: #pagado-monto, #pagado-hora, #pagado-nota, #btn-nuevo-cobro
  #pie-version
- app/css/estilos.css: estilos base legibles en 360 px. app/css/estado-pago.css: vacío con comentario de dueño.
- app/js/contrato.js (sin DOM ni secretos; lo importan navegador y servidor):
  ESTADOS = pendiente | pagado | expirado | cancelado | error.
  ENTORNOS = simulacion | prueba | comercio.
  JSDoc de Cobro {id, monto, concepto, estado, qr:{tipo:'imagen', valor}, creadoEn, expiraEn, entorno}
  y de Propuesta {concepto, monto, detalle:[{descripcion, cantidad, precioUnitario}]}.
  CODIGOS_ERROR: MONTO_INVALIDO, CONCEPTO_INVALIDO, ENTRADA_INVALIDA, IA_NO_DISPONIBLE, IA_SIN_SALDO,
  IA_TIEMPO_AGOTADO, PEY_NO_AUTORIZADO, PEY_ERROR, NO_ENCONTRADO, FIRMA_INVALIDA, NO_IMPLEMENTADO,
  SIMULACION_NO_PERMITIDA.
  LIMITES = { conceptoMax: 40 /* TODO(⚪): confirmar con K03 */, mensajeMax: 500, historialMax: 10 }.
  validarMonto(monto, max) → número > 0, máximo 2 decimales, ≤ max. limpiarConcepto(texto, max).
- app/js/api.js: salud(), pedirAgente(mensaje, historial), crearCobro({monto, concepto}),
  consultarEstado(id, {simular}) con fetch relativo a /api/...; si la respuesta trae {error}, lanza un Error
  con .codigo, .mensaje y .status.
- app/js/vistas.js: mostrarVista(idVista), anunciar(texto) (usa #mensajes), formatoMXN(monto) con Intl es-MX.
- app/js/textos.js: export const TEXTOS con todos los textos visibles (español de México).
- app/js/app.js: flujo mínimo con el formulario manual: salud() → banner; manual → confirmar → crearCobro
  → vista QR → iniciarSeguimiento(cobro, {onPagado, onExpirado, onNuevoCobro}).
- app/js/estado-pago.js: export iniciarSeguimiento(cobro, opciones) y detenerSeguimiento(); versión simple
  (consulta cada 2 s, muestra #vista-pagado al recibir "pagado"; #btn-simular-pago solo si cobro.entorno === 'simulacion').
- app/api/_lib/config.js: lee OPENAI_API_KEY, OPENAI_MODEL, PEY_API_KEY, PEY_WEBHOOK_SECRET,
  MAX_MONTO_MXN (500 si falta) y MODO_PAGO. entornoPago() = 'simulacion' | 'prueba' | 'comercio':
  sin PEY_API_KEY → 'simulacion' siempre; con llave: MODO_PAGO 'simulacion' → 'simulacion', 'comercio' → 'comercio',
  vacío o 'prueba' → 'prueba' (cuenta de prueba de Pey, K03.3). Nunca regresa ni imprime valores de llaves.
- app/api/_lib/http.js: json(status, datos), error(status, codigo, mensaje), leerJson(request, maxBytes = 10000).
- app/api/_lib/pey.js: crearCobro, consultarEstado y verificarWebhook. Implementa SOLO la simulación:
  id "sim_<epochMs>_<aleatorio>", expiraEn = +10 min, qr.valor = data URL de un SVG que diga "SIMULACIÓN"
  (no tiene que ser un QR escaneable). En 'prueba' o 'comercio' lanza NO_IMPLEMENTADO (lo hace la Tarea 2).
- Funciones con la firma web de Vercel: `export async function GET(request)` / `POST(request)` que regresan Response:
  app/api/salud.js   GET → { ok, entornoPago, openai, pey, webhook, maxMontoMxn, modelo, version, hora }
                     (openai, pey y webhook son booleanos "configurada"; modelo = OPENAI_MODEL o null;
                      version = primeros 7 caracteres de VERCEL_GIT_COMMIT_SHA o "local").
  app/api/cobros.js  POST {monto, concepto} → 201 {cobro}; valida con contrato.js y MAX_MONTO_MXN; el mensaje de
                     MONTO_INVALIDO dice el tope vigente (p. ej. "El monto debe ser mayor a $0 y de máximo $20").
  app/api/estado.js  GET ?id=…[&simular=1] → 200 {id, estado, actualizadoEn, entorno};
                     simular=1 solo si entornoPago es 'simulacion' Y el id empieza con "sim_"; si no, 403 SIMULACION_NO_PERMITIDA.
  app/api/webhook-pey.js  POST → 501 NO_IMPLEMENTADO.
  app/api/agente.js  POST → 503 IA_NO_DISPONIBLE con mensaje "La IA no está disponible. Captura el cobro a mano."
- app/servidor-local.js: servidor Node SIN dependencias (plan B en Codespaces): sirve los archivos estáticos de app/
  y enruta /api/<nombre> al GET/POST exportado de app/api/<nombre>.js (construye un Request web y escribe la Response).
  Rechaza nombres que empiecen con "_" o ".". Puerto: PORT o 3000.
- app/tests/base.test.js: pruebas de contrato.js, config.js, salud (sin filtrar secretos), cobros y estado en simulación.
  Llama a los handlers directamente con new Request(...).
- .env.example (raíz): agrega `MODO_PAGO=` con el comentario "simulacion | prueba | comercio; vacío = prueba si hay
  PEY_API_KEY, si no simulacion". No borres nada.

FUERA DE ALCANCE
- Llamadas reales a Pey (Tarea 2) u OpenAI (Tarea 3), diseño fino (Tarea 4), seguimiento avanzado (Tarea 5).
- Dependencias npm, frameworks o CDN externos.
- No toques conocimiento/, dia-del-evento/, plantillas/, fuentes/, BITACORA.md ni README.md.

CRITERIOS DE ACEPTACIÓN (verificables)
1. `npm test --prefix app` pasa sin red, con al menos 8 pruebas.
2. Con `npm run local --prefix app` en :3000:
   - GET /api/salud → 200, entornoPago "simulacion" y ningún valor de llave en el cuerpo.
   - POST /api/cobros {"monto":45,"concepto":"Prueba"} → 201; cobro.id empieza con "sim_"; qr.valor empieza con "data:image/svg+xml".
   - POST /api/cobros {"monto":0} → 400 MONTO_INVALIDO; {"monto":99999} → 400 (supera MAX_MONTO_MXN).
   - GET /api/estado?id=<id> → "pendiente"; con &simular=1 → "pagado"; con un id que no empiece con "sim_" → 403.
   - POST /api/agente → 503 con mensaje en español.
   - GET /api/_lib/config → 404.
3. En el navegador a 360 px: se ve el banner "SIMULACIÓN — no se mueve dinero real"; con el formulario manual llego al QR;
   "Simular pago" me lleva a la vista PAGADO.
4. Ningún archivo contiene llaves; el navegador nunca recibe variables de entorno.
5. Cada archivo nuevo declara su dueño en la primera línea.

CÓMO PROBARLO (pega la salida en el PR)
npm test --prefix app
(cd app && PORT=3000 node servidor-local.js &) ; sleep 1
curl -s localhost:3000/api/salud
curl -s -X POST localhost:3000/api/cobros -H 'content-type: application/json' -d '{"monto":45,"concepto":"Prueba"}'

ENTREGA
PR "Tarea 1: esqueleto con contrato y modo SIMULACIÓN". Descripción: Qué cambió · Cómo probarlo (pasos) ·
Variables de entorno nuevas · Pendientes ⚪ · IDs de conocimiento usados · tabla de archivos y dueños.
```

**Después de fusionar (🧑 José, 10 min) → primer deploy:**
1. En Vercel, en la configuración del proyecto: **Root Directory = `app`**, preset de framework "Other", sin comando de build ⚪ (confirma los nombres en pantalla). Si anoche no existía `app/` en GitHub, este es el momento de ponerlo.
2. Variables de entorno (tabla completa en la CHECKLIST): `OPENAI_API_KEY`, `OPENAI_MODEL` (K04.2) y `MAX_MONTO_MXN` en Production y Preview; `MODO_PAGO=simulacion` en Preview **siempre** y en Production **hasta fusionar la Tarea 2**. Las de Pey (`PEY_API_KEY` y `PEY_WEBHOOK_SECRET`) van **solo en Production**; los Preview no las necesitan. Después de cambiar variables, vuelve a desplegar: las variables nuevas no aplican a deployments que ya existen (K05.16).
3. Verifica `[URL PRODUCCIÓN]/api/salud` → `ok: true`, `entornoPago: "simulacion"`. **Hito: primer deploy.** Toma captura y anota la hora en `BITACORA.md`.

---

## Prompt 2 · Integración real con Pey (cobro con QR, estado y webhook)

- **Cuándo:** T+0:40, con la Tarea 1 ya fusionada.
- **Paralelo:** sí, con 3, 4 y 5. Solo toca archivos de Pey; es la única que puede agregar una dependencia en esta oleada.

```text
TAREA 2 · Pey real: crear cobro con QR CoDi, consultar estado y webhook

CONTEXTO
[IDEA ELEGIDA]. El esqueleto (Tarea 1) ya funciona en SIMULACIÓN. Conecta Pey de verdad sin romper la simulación.
Reto oficial: herramientas de bien público con OpenAI y CoDi usando la API gratuita de Pey (K01.4).
Pey no tiene sandbox: su API es producción (https://api.pey.mx) y se prueba con pagos reales de centavos a la cuenta
de prueba que publica Pey (K03.3, K03.6). Firma sus webhooks con el estándar Standard Webhooks (K03.5).
En Vercel, los Preview corren en SIMULACIÓN; Production usará la llave de José (cuenta de prueba de Pey por ahora).

LEE PRIMERO
- AGENTS.md (seguridad: llaves solo en servidor, firma de webhooks, validación de montos).
- conocimiento/03-codi-y-api-pey.md (K03) COMPLETO: autenticación, URL base única, crear cobro,
  consultar estado, estados posibles, forma del QR, webhooks y su firma, montos, límites, ejemplos.
- docs/PRD.md (sección de pagos). app/js/contrato.js y app/api/_lib/config.js (NO los cambies).

ALCANCE (solo estos archivos)
app/api/_lib/pey.js · app/api/cobros.js · app/api/estado.js · app/api/webhook-pey.js · app/tests/pey.test.js
.env.example: solo si K03 exige otra variable (p. ej. URL base); agrégala comentada.
app/package.json + app/package-lock.json: solo para agregar `qrcode` (dibujar el QR desde qrString cuando qrImage venga
null, K03.4). Si no tienes internet para instalarla, deja TODO(⚪) y dilo en el PR.

QUÉ HACER
1. pey.js, entornos 'prueba' y 'comercio': crearCobro({monto, concepto}) con POST /codi/qr (K03.4; base única https://api.pey.mx;
   headers Authorization: Bearer, Content-Type y Accept JSON). Monto en PESOS con decimales (no centavos).
   Manda generateImage: true y expiration: 600 (si se usa, mínimo 360). Regresa un Cobro del contrato con
   entorno = entornoPago() ('prueba' o 'comercio') y expiraEn calculado con expiration (Pey no regresa el vencimiento).
   QR: qrImage (PNG en base64) → "data:image/png;base64,…"; si qrImage viene null, genera la imagen desde qrString
   en el servidor (por eso puedes necesitar `qrcode`). Ejemplos probados en K03.7: úsalos como base.
2. consultarEstado(id): GET /transaction/codi/qr/{id} (K03.4). Algún item con status PAID → 'pagado';
   lista vacía o solo PENDING → 'pendiente'. 404 NOT_FOUND → 'pendiente' con aviso 'qr_no_encontrado_con_esta_llave'
   (según la doc, el QR no existe o es de otra llave; la interfaz muestra el aviso y sigue consultando).
   'expirado' lo calcula el navegador con expiraEn.
   Ante 503 (SERVICE_UNAVAILABLE) reintenta solo este GET, con espera creciente (K03.8).
3. verificarWebhook(cuerpoCrudo, headers) con Standard Webhooks, como en K03.5 y el handler de K03.7:
   encabezados webhook-id, webhook-timestamp y webhook-signature; contenido firmado
   = "<webhook-id>.<webhook-timestamp>.<cuerpo crudo>"; HMAC-SHA256 con el secreto (la parte después de "whsec_",
   decodificada de base64); webhook-signature trae una o varias firmas "v1,<base64>" separadas por espacio.
   Compara con crypto.timingSafeEqual; rechaza si falta un encabezado, si ninguna firma coincide o si el timestamp
   está a más de 5 minutos de la hora actual. Sin dependencias (node:crypto).
4. webhook-pey.js: lee el cuerpo crudo con request.text(), verifica ANTES de parsear, responde 200 rápido.
   Evento principal: codi.qr.payment_received (codiQrId = id del QR, K03.5). Registra solo webhook-id, codiQrId y type
   (nada de datos personales ni el cuerpo completo). Idempotente: el mismo webhook-id dos veces no rompe nada.
5. estado.js: la fuente de verdad es consultarEstado (Pey). No guardes estado en memoria: en Vercel cada función
   corre aparte; el webhook queda como registro y respaldo. No montes base de datos.
6. Errores de Pey ({error:{message,type,requestId}}, K03.8) → mensajes en español sin detalles internos.
   401, 403 o INVALID_STATE → PEY_NO_AUTORIZADO con el mensaje "Tu cuenta de Pey todavía no está habilitada para
   cobrar." (sirve para el plan B). 503 → PEY_ERROR "pey no está disponible; intenta de nuevo". No reintentes
   POST /codi/qr a ciegas tras un timeout (K03.8).
7. La simulación sigue intacta: ids "sim_", ?simular=1, banner. Sin PEY_API_KEY todo sigue en SIMULACIÓN.
8. Dato que no esté en K03 (campo, encabezado, formato de firma): NO lo inventes. TODO(⚪) visible y dilo en el PR.

FUERA DE ALCANCE
Interfaz, agente, seguimiento en el navegador, base de datos, archivos congelados de la Tarea 1.

CRITERIOS DE ACEPTACIÓN
1. `npm test --prefix app` pasa. Pruebas nuevas con fetch simulado y los ejemplos de K03.4 y K03.7: crear cobro OK
   (monto en pesos en el cuerpo, entorno 'prueba' o 'comercio' según MODO_PAGO); qrImage null → imagen generada desde
   qrString; Pey responde 401 o INVALID_STATE → PEY_NO_AUTORIZADO; items PAID / PENDING / vacío se mapean bien y 404 da
   'pendiente' con el aviso qr_no_encontrado_con_esta_llave;
   webhook firmado con un secreto de prueba generado en la propia prueba → 200; firma inválida, encabezado ausente o
   timestamp viejo → 401 FIRMA_INVALIDA; cuerpo vacío → 400; mismo webhook-id repetido → 200.
2. Las pruebas de la Tarea 1 siguen pasando.
3. Ningún log imprime la llave, el secreto ni el cuerpo completo del webhook.
4. El PR trae: tabla de endpoints usados con su ID de K03; tabla de mapeo de estados; la URL del webhook a configurar
   en Pey: [URL PRODUCCIÓN]/api/webhook-pey (dominio de producción, no un preview).

CÓMO PROBARLO
npm test --prefix app
El preview corre en SIMULACIÓN: ahí solo se revisa que la simulación siga intacta. La prueba con Pey la hace José
después de fusionar: en Production, crear un cobro de [MONTO DEMO] pesos, ver el QR de Pey y el banner "MODO PRUEBA",
pagarlo con su app del banco y ver el estado "pagado".

ENTREGA
PR "Tarea 2: Pey real (cobro, estado y webhook)" con el formato de AGENTS.md.
```

**Fusiónala primero en cuanto pasen sus pruebas** (solo toca archivos de servidor de Pey). **Después de fusionar (🧑):**
1. Revisa el webhook en el portal de Pey (Desarrollador → engrane de la llave, K03.3): `[URL PRODUCCIÓN]/api/webhook-pey` (dominio de producción, nunca un preview), con su secreto (`whsec_…`) como `PEY_WEBHOOK_SECRET` en Production. Se crea a las 11:20 (RUNBOOK); si no lo hiciste, créalo ahora. Es un webhook por llave.
2. En Production: `PEY_API_KEY` (llave ligada a la cuenta de prueba), `MODO_PAGO=prueba` y `MAX_MONTO_MXN=20`; vuelve a desplegar.
3. Crea un cobro de `[MONTO DEMO]` (1 peso o menos): banner "MODO PRUEBA" y QR de Pey. Págalo con tu app del banco (dinero real que no se devuelve, K03.3) y mira que cambie a PAGADO. En el portal de Pey, "Webhook Logs" muestra si llegó el webhook (K03.5).
4. Si falla: `MODO_PAGO=simulacion` otra vez (R5) y lanza R1 con el error. Producción nunca se queda rota.

---

## Prompt 3 · Agente con la API de OpenAI (Responses API + function calling)

- **Cuándo:** T+0:40, con la Tarea 1 ya fusionada.
- **Paralelo:** sí, con 2, 4 y 5. Solo toca archivos del agente.

```text
TAREA 3 · Agente con la Responses API de OpenAI y function calling

CONTEXTO
[IDEA ELEGIDA]. Persona: [PERSONA]. El agente convierte lo que dice el comercio ("[FRASE DE DEMO]") en una
PROPUESTA de cobro validada. La IA NUNCA cobra: la persona confirma en la interfaz y la interfaz llama a /api/cobros.

LEE PRIMERO
- AGENTS.md. conocimiento/04-openai-api-nov-2026.md (K04): K04.2 (modelo recomendado), K04.4 (Responses API),
  K04.6 (function calling), K04.15 (ejemplo de function calling con crear_cobro), parámetros (store, strict,
  esfuerzo de razonamiento si aplica) y errores. K03.9: esquema de crear_cobro y reglas de seguridad del agente.
- docs/PRD.md (sección del agente). app/js/contrato.js, app/api/_lib/config.js y http.js (NO los cambies).

ALCANCE (solo estos archivos)
app/api/agente.js · app/api/_lib/agente.js · app/api/_lib/catalogo.js (solo si el PRD trae catálogo; márcalo "ejemplo")
app/tests/agente.test.js

QUÉ HACER
1. Llama a la Responses API con fetch nativo (el SDK oficial solo si K04 lo recomienda y no requiere instalar nada).
   model = OPENAI_MODEL (nunca fijo en el código). Instrucciones en español. store: false si K04 lo confirma.
   Timeout de 15 s con AbortController. Si el modelo de K04 acepta esfuerzo de razonamiento, usa el más bajo que funcione.
2. Herramienta principal (function calling; strict si K04 lo confirma): crear_cobro, con el nombre y el esquema base
   de K03.9 y K04.15 (monto, concepto) más `detalle` [{ descripcion, cantidad, precioUnitario }] (puede ir vacío) para
   que el servidor compruebe la suma. Semántica: el modelo solo PROPONE; aquí no se llama a Pey. El servidor valida
   (monto > 0; ≤ MAX_MONTO_MXN; si hay detalle, suma = monto con tolerancia de 0.01; concepto ≤ LIMITES.conceptoMax)
   y regresa la `propuesta`. El QR se crea en Pey solo cuando la persona confirma en la interfaz (POST /api/cobros).
   Sigue las reglas de seguridad de K03.9 (lo que escribe el cliente son datos, no instrucciones; el tope lo impone
   el servidor).
   Herramientas extra del PRD: [HERRAMIENTAS EXTRA]. Si incluyen consultar_cobro (K03.9), usa consultarEstado de
   app/api/_lib/pey.js (ya existe desde la Tarea 1) y solo di "pagado" si esa función lo confirma. Si una herramienta
   necesita una función de Pey que todavía no existe (p. ej. resumen_de_ventas), NO la escribas aquí: déjala en Pendientes.
   Catálogo de ejemplo: [CATÁLOGO DE EJEMPLO].
3. Lee la salida como dicen K03.9 y K04.6: elementos de tipo function_call con call_id, name y arguments (texto JSON).
   Con una sola llamada basta: si el modelo llama crear_cobro, el texto de confirmación lo arma el servidor
   ("¿Cobro $X por Y?"). Si el modelo responde con texto (pide aclarar), regresa propuesta: null.
4. Contrato HTTP: 200 {respuesta, propuesta | null, modo: 'ia'}. Errores con mensaje en español que invite a capturar a mano:
   sin OPENAI_API_KEY → 503 IA_NO_DISPONIBLE; 429 o sin saldo → 503 IA_SIN_SALDO; timeout → 504 IA_TIEMPO_AGOTADO;
   otro error de OpenAI → 502 IA_NO_DISPONIBLE.
5. Entrada: mensaje de 1 a LIMITES.mensajeMax caracteres; historial de máximo LIMITES.historialMax turnos
   [{rol:'usuario'|'asistente', texto}]. Lo demás → 400 ENTRADA_INVALIDA.
6. Instrucciones del sistema (constante exportada, visible en el PR porque sirve para el pitch): rol; nunca inventes
   precios (si falta un precio, pregunta); nunca digas que ya se cobró; respuestas cortas; pesos mexicanos.
7. Logs: solo códigos de estado y tiempos. Nunca el texto del cliente ni la llave.

FUERA DE ALCANCE
Interfaz, Pey, voz (si el PRD la pide, deja TODO y dilo en el PR), archivos congelados.

CRITERIOS DE ACEPTACIÓN
1. `npm test --prefix app` pasa, con fetch simulado: (a) salida con function_call crear_cobro → propuesta correcta;
   (b) detalle que no suma el monto → el servidor la rechaza y responde pidiendo aclarar; (c) monto > máximo → rechazo;
   (d) respuesta solo de texto → propuesta null; (e) OpenAI 401, 429 y timeout → 503/504 con mensaje en español;
   (f) sin OPENAI_API_KEY → 503 IA_NO_DISPONIBLE.
2. Una prueba revisa el cuerpo enviado a OpenAI: model viene de OPENAI_MODEL, tools incluye crear_cobro y no viaja
   nada además del mensaje, el historial y las instrucciones.
3. El PR muestra el esquema JSON de crear_cobro y las instrucciones del sistema.

CÓMO PROBARLO
npm test --prefix app
En el preview (José): enviar "[FRASE DE DEMO]" → propuesta con el monto esperado del PRD; enviar algo ambiguo → pregunta.

ENTREGA
PR "Tarea 3: agente con Responses API y function calling" con el formato de AGENTS.md.
```

---

## Prompt 4 · Interfaz móvil en español

- **Cuándo:** T+0:40, con la Tarea 1 ya fusionada.
- **Paralelo:** sí, con 2, 3 y 5. Solo toca la página, estilos, `app.js` y textos; conserva los IDs que usa la Tarea 5.

```text
TAREA 4 · Interfaz móvil en español: pedir → confirmar → QR

CONTEXTO
[IDEA ELEGIDA]. Persona: [PERSONA]. Demo: 1) [DEMO PASO 1] 2) [DEMO PASO 2] 3) [DEMO PASO 3].
Se usará en un celular de 360 px Y proyectada en una pantalla grande durante el pitch: tiene que verse impecable en ambos.

LEE PRIMERO
- AGENTS.md (reglas de producto y accesibilidad). docs/PRD.md (demo y pantallas).
- app/js/contrato.js, app/js/api.js, app/js/vistas.js y app/js/estado-pago.js (úsalos, NO los cambies).
- K06 solo para el tono de los textos.

ALCANCE (solo estos archivos)
app/index.html · app/css/estilos.css · app/js/app.js · app/js/textos.js

QUÉ HACER
1. Vista pedido: campo grande, chips de ejemplo con "[FRASE DE DEMO]" (etiquetados "Ejemplo"), botón Enviar → pedirAgente.
   Mientras responde: "Pensando…" y botón deshabilitado. Si la IA falla (503/504): muestra el mensaje del servidor
   y abre el formulario manual.
2. Enlace "Capturar a mano" siempre visible: formulario de monto y concepto con validación de contrato.js.
3. Vista confirmar: concepto, detalle y total grande en MXN; "Confirmar y generar QR" (primario) y "Editar".
   NUNCA se crea un cobro sin tocar Confirmar.
4. Vista QR: QR grande (mínimo 260 px), monto y concepto; estado "Esperando pago…"; botón "Simular pago" visible SOLO si
   cobro.entorno === 'simulacion'; "Cancelar".
5. Banner fijo según salud().entornoPago: 'simulacion' → "SIMULACIÓN — no se mueve dinero real";
   'prueba' → "MODO PRUEBA (pey): cobros reales de centavos a una cuenta de prueba"; 'comercio' → sin banner.
6. Con el cobro creado, llama iniciarSeguimiento(cobro, {onPagado, onExpirado, onNuevoCobro}) de estado-pago.js.
7. Estilo: [ESTILO]. Tipografía del sistema, sin bibliotecas ni CDN. Texto base ≥ 18 px.
8. Accesibilidad: labels en formularios, foco visible, contraste AA, botones ≥ 44 px, cambios anunciados con anunciar().
9. Conserva TODOS los IDs del esqueleto (la Tarea 5 depende de ellos).
10. Todo texto visible sale de textos.js. Cero texto en inglés.

FUERA DE ALCANCE
app/api/**, app/js/estado-pago.js, app/css/estado-pago.css, archivos congelados.

CRITERIOS DE ACEPTACIÓN
1. A 360×740 no hay desplazamiento horizontal; a 1280×720 se ve centrado y legible a distancia.
2. Con el servidor local en SIMULACIÓN: manual → confirmar → QR → "Simular pago" → PAGADO, sin errores en consola.
3. Con /api/agente respondiendo 503 (el esqueleto lo hace), el usuario ve un mensaje claro y puede capturar a mano.
4. Checklist de accesibilidad en el PR (labels, foco, contraste, tamaño de botones), con capturas si puedes generarlas.

CÓMO PROBARLO
npm test --prefix app
npm run local --prefix app → http://localhost:3000 a 360 px de ancho y a 1280 px.

ENTREGA
PR "Tarea 4: interfaz móvil en español" con el formato de AGENTS.md.
```

---

## Prompt 5 · Confirmación de pago en tiempo real

- **Cuándo:** T+0:40 junto con 2–4 si te alcanza el límite; si no, en cuanto se fusione la 2 o la 4.
- **Paralelo:** sí, con 2, 3 y 4. Solo toca `estado-pago.js`, su CSS y su prueba; usa la firma fijada por la Tarea 1.

```text
TAREA 5 · Confirmación de pago en tiempo real

CONTEXTO
Es el momento clave de la demo: el cliente paga con la app de su banco y en segundos la pantalla del comercio cambia a
PAGADO. En Vercel no hay websockets persistentes: usa consultas cortas (polling) a /api/estado, que pregunta a Pey.
El webhook de Pey (Tarea 2) queda como registro y respaldo. PAGADO solo se muestra si /api/estado lo dice.

LEE PRIMERO
- AGENTS.md. K03 (estados del cobro y tiempo de expiración del QR).
- app/js/contrato.js, app/js/api.js, app/js/vistas.js y los IDs de app/index.html (NO los cambies).

ALCANCE (solo estos archivos)
app/js/estado-pago.js · app/css/estado-pago.css · app/tests/estado-pago.test.js

QUÉ HACER
1. Núcleo probable sin DOM: crearSeguidor({ consultar, intervaloMs = 2000, ahora, esperar }) que avisa cada cambio de estado.
   Después de 60 s sube el intervalo a 4 s. Se detiene en pagado, expirado, cancelado o error, o al llegar a expiraEn.
   Nunca hace dos consultas a la vez.
2. Errores de red: reintenta en silencio; tras 3 fallos seguidos muestra "Reconectando…"; al recuperarse lo quita.
3. Pausa si la pestaña se oculta (visibilitychange) y al volver consulta de inmediato.
4. Vista PAGADO: palomita grande, monto, hora (es-MX) y nota según cobro.entorno: 'comercio' → "Pago confirmado por pey";
   'prueba' → "Pago CoDi real confirmado por pey (cuenta de prueba)"; 'simulacion' → "SIMULACIÓN — no se movió dinero".
   Vibración corta si existe navigator.vibrate; anuncio con anunciar(); botón "Nuevo cobro" → onNuevoCobro.
5. Expirado: mensaje claro y "Generar otro QR".
6. "Simular pago" (solo si cobro.entorno === 'simulacion'): consultarEstado(id, {simular: true}) y sigue el mismo camino.
7. Conserva la firma: export iniciarSeguimiento(cobro, {onPagado, onExpirado, onNuevoCobro}) y detenerSeguimiento().

FUERA DE ALCANCE
app/api/**, index.html, estilos.css, app.js, textos.js, archivos congelados. Sin dependencias.

CRITERIOS DE ACEPTACIÓN
1. Pruebas con reloj simulado (mock.timers de node:test o un `esperar` inyectado): pendiente → pagado en un ciclo;
   expiración; 3 errores seguidos → aviso; detenerSeguimiento corta las consultas; nunca hay consultas en paralelo.
2. Desde que /api/estado responde "pagado" hasta ver la vista PAGADO: ≤ 2.5 s con intervalo de 2 s.
3. En SIMULACIÓN con el servidor local: QR → "Simular pago" → PAGADO con la nota de simulación.
4. Se ve bien a 360 px y proyectado.

CÓMO PROBARLO
npm test --prefix app
npm run local --prefix app → crear cobro manual → "Simular pago".

ENTREGA
PR "Tarea 5: confirmación de pago en tiempo real" con el formato de AGENTS.md.
```

---

## Prompt 6 · Pruebas de punta a punta, README de entrega y limpieza

- **Cuándo:** T+2:30, con 2–5 fusionadas.
- **Paralelo:** sí, con 7 y 8. No toca la interfaz.

```text
TAREA 6 · Pruebas de punta a punta, README de entrega y limpieza del servidor

CONTEXTO
Faltan unas 2 horas para la entrega interna (sábado 15:30); la entrega final en el portal es el domingo antes de las
12:00 (cierra a las 13:00, K01). El jurado decide el lunes revisando lo entregado: el README de la raíz y [URL PRODUCCIÓN]
tienen que defenderse solos, sin mí. Necesito pruebas que demuestren el flujo completo y un README honesto.

LEE PRIMERO
- AGENTS.md. plantillas/README-ENTREGA.md (estructura obligatoria). docs/PRD.md. BITACORA.md (decisiones del día).
- `git log --oneline` para la tabla "Cómo lo construí" (si el historial está incompleto, deja [POR LLENAR]).

ALCANCE (solo estos archivos)
app/tests/flujo.test.js (nuevo) · arreglos en app/tests/** · limpieza en app/api/** SIN cambiar comportamiento ni contrato
README.md (raíz) · app/README.md

QUÉ HACER
1. flujo.test.js (handlers importados directo, Request/Response, fetch simulado):
   a) SIMULACIÓN: salud → agente (OpenAI simulado, devuelve crear_cobro) → cobros → estado "pendiente" → simular → "pagado".
   b) Pey simulado por fetch: crear cobro → estado "pendiente" → webhook con firma válida → 200 → estado "pagado".
   c) Seguridad: ninguna respuesta de /api/* contiene el valor de OPENAI_API_KEY, PEY_API_KEY o PEY_WEBHOOK_SECRET
      (usa valores falsos en el entorno de la prueba).
2. Limpieza en app/api/**: código muerto, console.log con datos, TODO ya resueltos. Los TODO(⚪) que queden se listan
   en "Limitaciones" del README.
3. README.md de la raíz: llena plantillas/README-ENTREGA.md con datos REALES del repo. Frase de valor: [FRASE DE VALOR].
   Enlaces: [URL PRODUCCIÓN] y [URL VIDEO] (si no los tengo, deja el marcador). Di qué es real y qué es prueba o
   SIMULACIÓN. Tabla "Cómo lo construí con Codex y la API de OpenAI" con los PR reales (número, título y hora).
   Diagrama de arquitectura en mermaid. Seguridad y privacidad. Sección "Qué existía antes y qué se hizo en el evento"
   (antes: base de conocimiento, plantillas y AGENTS.md; en el evento: todo app/). Limitaciones honestas. Qué sigue.
   Licencia: la que José indique ([LICENCIA]); si no la indica, deja el marcador.
   Convierte las rutas en enlaces relativos que existan.
4. app/README.md: cómo correrlo (variables de .env.example, servidor local, pruebas, Vercel con Root Directory = app).
5. Nada inventado: dato que no esté en el repo → [POR LLENAR]. Cero datos personales.

FUERA DE ALCANCE
app/index.html, app/css/**, app/js/**, conocimiento/, dia-del-evento/, plantillas/, BITACORA.md.

CRITERIOS DE ACEPTACIÓN
1. `npm test --prefix app` pasa, incluido flujo.test.js.
2. `python3 scripts/verificar_conocimiento.py` no reporta "posible secreto" ni enlaces rotos en README.md o app/README.md.
3. Lo esencial del README (frase de valor, enlaces, problema, solución, demo) se lee antes de llegar a "Cómo correrlo".

CÓMO PROBARLO
npm test --prefix app && python3 scripts/verificar_conocimiento.py

ENTREGA
PR "Tarea 6: pruebas E2E, README de entrega y limpieza" con el formato de AGENTS.md.
```

---

## Prompt 7 · Pulido para la demo

- **Cuándo:** T+2:30, con 2–5 fusionadas. Pega aquí la salida del prompt 5 de ChatGPT (textos).
- **Paralelo:** sí, con 6 y 8. Solo interfaz.

```text
TAREA 7 · Pulido para la demo (solo interfaz)

CONTEXTO
La demo de 3 pasos dura menos de 80 segundos frente a jueces, proyectada y desde el celular:
1) [DEMO PASO 1] 2) [DEMO PASO 2] 3) [DEMO PASO 3]. Lo que no ayuda a esos 3 pasos se esconde o se quita.

LEE PRIMERO
- AGENTS.md. docs/PRD.md (demo). conocimiento/09-pitch-y-preguntas.md (K09: demo a prueba de fallas).
- Textos finales: [TEXTOS DE CHATGPT]

ALCANCE (solo estos archivos)
app/index.html · app/css/estilos.css · app/js/app.js · app/js/textos.js · app/favicon.svg (nuevo)

QUÉ HACER
1. Camino feliz con máximo 2 toques por paso: chip "[FRASE DE DEMO]", foco automático en el campo, Enter envía.
2. Modo presentación con ?presentar=1: texto 25% más grande, QR más grande, sin elementos secundarios.
3. Botón discreto "Reiniciar demo": vuelve a la vista de pedido y limpia el estado (llama detenerSeguimiento()).
4. Pie: versión (de /api/salud) + "Hecho en el DevDay Exchange Community Hackathon CDMX · CoDi vía Pey · IA de OpenAI".
5. Título de la página, favicon, meta description y Open Graph en español.
6. Aplica los textos finales; revisa estados vacío, cargando y error. Cero console.log. Cero texto en inglés.
7. Contraste AA y foco visible otra vez después de los cambios.
8. Si José subió los logos oficiales de pey y CoDi a app/img/ (de "Recursos de marca", K03.6), úsalos en el QR y en el
   pie; no los recrees ni inventes logos.

FUERA DE ALCANCE
app/api/**, app/js/estado-pago.js, app/css/estado-pago.css, pruebas, archivos congelados. Ninguna función nueva fuera de la demo.

CRITERIOS DE ACEPTACIÓN
1. En SIMULACIÓN la demo completa toma ≤ 60 s a 360 px y a 1280 px.
2. A 1280×720 con ?presentar=1, cada paso cabe en pantalla sin desplazarse.
3. Sin errores en consola; textos finales aplicados; los IDs del esqueleto siguen ahí.
4. `npm test --prefix app` sigue pasando.

CÓMO PROBARLO
npm run local --prefix app → http://localhost:3000/?presentar=1 y http://localhost:3000 a 360 px.

ENTREGA
PR "Tarea 7: pulido para la demo" con el formato de AGENTS.md.
```

---

## Prompt 8 (opcional) · Deck en HTML

- **Cuándo:** T+2:30, solo si te sobra límite de Codex y prefieres que el deck viva junto a la app. Si no, haz el deck con el prompt 8 de ChatGPT y [`../plantillas/DECK.md`](../plantillas/DECK.md).
- **Paralelo:** sí, con 6 y 7 (archivos nuevos).

```text
TAREA 8 · Deck de 7 diapositivas en HTML (opcional)

LEE: plantillas/DECK.md (qué va en cada diapositiva) y este contenido: [CONTENIDO DE LAS 7 DIAPOSITIVAS DE CHATGPT].
ALCANCE: app/pitch.html y app/css/pitch.css (nuevos). No toques nada más.
QUÉ HACER: 7 diapositivas a pantalla completa (16:9), flechas y barra espaciadora para avanzar, número de diapositiva,
texto grande (títulos ≥ 48 px), alto contraste, sin bibliotecas. Diapositiva 4 con un enlace grande a la app.
Diapositiva 7 con la URL [URL PRODUCCIÓN] en texto grande y un QR si ya existe una imagen en el repo
(si no, deja el espacio marcado). Debe imprimirse bien a PDF desde el navegador (una diapositiva por hoja).
CRITERIOS: navegación con teclado; cero texto inventado (solo el contenido dado); se ve completo a 1280×720.
ENTREGA: PR "Tarea 8: deck en HTML".
```

---

## Prompts de rescate

### R1 · Arreglar un bug visto en el preview

```text
BUG en [URL del preview o de producción].
Pasos para reproducir: 1) … 2) … 3) …
Esperaba: …   Pasó: …   (captura o texto del error de consola si lo tengo: …)
Archivos probables: [rutas]. Dueño según dia-del-evento/PROMPTS-CODEX.md: Tarea [N].
Haz el cambio MÍNIMO que lo arregle, agrega una prueba que lo reproduzca (si aplica) y no toques archivos fuera de esa lista.
Si el arreglo requiere tocar un archivo congelado, NO lo toques: explícalo en el PR.
PR "Arreglo: [resumen corto]". Corre `npm test --prefix app` antes de terminar.
```

### R2 · Conflicto entre un PR y `main`

Primero intenta lo simple: cierra el PR y vuelve a lanzar su tarea desde el `main` actualizado (las tareas son chicas). Si prefieres conservarlo:

```text
El PR [número] (rama [nombre]) tiene conflictos con main. Trabaja sobre esa rama ⚪:
trae los cambios de main, resuelve los conflictos (en archivos congelados gana main; en los archivos de la Tarea [N]
conserva los cambios de la tarea), corre `npm test --prefix app` y explica cada resolución en el PR.
```

### R3 · Tarea atorada (más de 25 minutos)

```text
La tarea anterior ([nombre]) está tardando demasiado. Divídela: haz SOLO esta parte: [parte 1, la que necesita la demo].
Mismos archivos permitidos, mismos criterios de aceptación aplicables a esta parte. Deja el resto como "Pendiente" en el PR.
```

### R4 · Revisión de un PR sin cambiar nada

```text
SOLO LECTURA. Revisa el PR [número] contra: sus criterios de aceptación (dia-del-evento/PROMPTS-CODEX.md, Tarea [N]),
AGENTS.md (seguridad y producto) y el mapa de dueños de archivos. Lista los problemas por gravedad
(bloquea la demo / riesgo de seguridad / menor), con archivo y línea. Máximo 15 líneas. No cambies archivos.
```

Alternativa: la revisión de código de Codex directamente en el PR de GitHub (K05.8), solo si la probaste antes ⚪; no dependas de ella. Si funciona, también es evidencia de uso de Codex (K08.12).

### R5 · Modo SIMULACIÓN de emergencia

No necesita a Codex. En Vercel (🧑): `MODO_PAGO=simulacion` en Production → vuelve a desplegar → revisa `/api/salud` (`entornoPago: "simulacion"`) y que el banner se vea. Para regresar: `MODO_PAGO=prueba` y vuelve a desplegar.

### R6 · Plantilla para una tarea nueva del PRD ("Debería")

```text
TAREA [N] · [nombre]
CONTEXTO: [IDEA ELEGIDA]. Para qué sirve en la demo: [1 línea]. Si no ayuda a la demo, no la lances.
LEE: AGENTS.md; docs/PRD.md sección [X]; [IDs de conocimiento].
ALCANCE (solo estos archivos): [archivos NUEVOS o de los que esta tarea es dueña; revisa el mapa de dueños].
FUERA DE ALCANCE: archivos congelados y archivos de otras tareas en curso.
CRITERIOS DE ACEPTACIÓN: 1) … 2) … 3) `npm test --prefix app` pasa.
CÓMO PROBARLO: …
ENTREGA: PR "Tarea [N]: [nombre]" con el formato de AGENTS.md.
```

---

## Plan B: Codex CLI en GitHub Codespaces

Si Codex web está lento, caído o sin límite: los mismos prompts funcionan en la terminal.

```bash
# En un codespace del repo (la configuración del contenedor ya instala Codex CLI)
codex --version
codex login --device-auth            # antes: ChatGPT › Settings › Security › "Device code authorization" (K05.10)
# Si se acabó el límite del plan: entra con tu API key (se cobra a tu saldo de la API, no al límite de ChatGPT; K05.10)
printf '%s\n' "$OPENAI_API_KEY" | codex login --with-api-key

git switch -c tarea-2-pey             # una rama por tarea
codex                                  # interactivo: pega el prompt; Codex lee AGENTS.md
# o sin interacción, con permiso de escribir en el workspace (K05.11):
# codex exec --sandbox workspace-write "$(cat prompt-tarea-2.txt)"
npm test --prefix app
git add -A && git commit -m "Tarea 2: Pey real" && git push -u origin tarea-2-pey
gh pr create --fill                    # abre el PR; Vercel crea el preview
```

En la CLI cada tarea en paralelo necesita su propia carpeta de trabajo (por ejemplo, `git worktree add ../tarea-3 -b tarea-3-agente`) o su propio codespace. Con prisa, haz una tarea a la vez. La extensión de Codex para VS Code falla al iniciar sesión en Codespaces: usa la terminal (K05.12).
