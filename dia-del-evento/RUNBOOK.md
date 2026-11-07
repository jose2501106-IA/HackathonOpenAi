# Runbook del hackatón — sábado 7 (minuto a minuto), domingo 8 y lunes 9

> Para José. Ábrelo en el celular y en una pestaña fija de la laptop. Si algo no está aquí, decide con las **reglas de oro**.
> Prompts: [Codex](PROMPTS-CODEX.md) · [ChatGPT](PROMPTS-CHATGPT.md) · Lista de verificación: [CHECKLIST](CHECKLIST.md) · Pitch y preguntas: [K09](../conocimiento/09-pitch-y-preguntas.md) · Evento: [K01](../conocimiento/01-evento-verificado.md) · Rúbrica: [K08](../conocimiento/08-criterios-y-jueces.md)

## Tarjeta de bolsillo

- **Sábado 7:** llegada 9:00 · agenda oficial 10:00–16:00 · construcción desde ~10:30 ⚪ · **entrega interna 15:30** (todo listo para entregar) · demos o pitch en vivo: ⚪ preguntar.
- **Domingo 8:** entrega final en el portal **antes de las 12:00** (cierra a las 13:00; la URL del portal aún no se publica; K01).
- **Lunes 9 en la mañana:** el jurado anuncia ganadores; después, voto comunitario por 1–3 ganadores más (K01).
- **Martes 10, 14:00:** DevDay Exchange oficial (el premio es una bolsa de 10 boletos; K01).
- **Reto:** "Prototipa herramientas de **bien público** con OpenAI y CoDi" con la API gratuita de pey. Ejemplos oficiales: cobro para comercios de barrio, comercio comunitario, QR y solicitudes de pago, flujos empresariales sobre pagos instantáneos (K01.4).
- **Regla del día:** Codex construye, ChatGPT redacta, José decide, revisa y presenta (K10).

## Cómo leer este runbook

- **Dos relojes.** `T` = inicio real de la construcción (se espera ~10:30). `E` = entrega interna (sábado 15:30, o 15 min antes del pitch en vivo si lo hay ese día). Los bloques dicen la hora esperada **y** la hora relativa: si el inicio se recorre, sigue la relativa.
- **Quién:** 🧑 José · **Codex** (Codex web; respaldo: Codex CLI en Codespaces) · **ChatGPT** (web, con el repo conectado).
- **Salida verificable:** lo que tiene que existir al cerrar el bloque. Si no existe, el bloque no terminó.
- **Bitácora:** cada decisión y cada tarea lanzada o fusionada se anota con su hora en `BITACORA.md` (1 línea). Al final, esa bitácora se vuelve la tabla "Cómo lo construí" y la respuesta a "¿qué hizo la IA y qué hiciste tú?" (K08.12). Codex nunca toca `BITACORA.md`: la editas tú en GitHub web.

## Hitos

| # | Hito | Límite | Hora (T 10:30, E 15:30) | Cómo lo verificas | Si no llegas |
|---|---|---|---|---|---|
| 1 | Preguntas clave contestadas y modo de pago decidido | Antes de T | 10:30 | Respuestas en `BITACORA.md` | Asume lo peor: entrega por portal y video, pago en modo prueba |
| 2 | Idea elegida y PRD en `docs/PRD.md` | T+0:30 | 11:00 | Archivo en `main` | Toma la idea #1 de K07 tal cual |
| 3 | **Primer deploy en producción** | T+0:50 | 11:20 | `/api/salud` responde en el dominio de producción | Todo lo demás espera (plan B 5) |
| 4 | Oleada 1 lanzada (3–4 tareas de Codex en paralelo) | T+0:50 | 11:20 | Captura de la lista de tareas en Codex | Lanza al menos la 2 y la 3 |
| 5 | **Flujo principal funcionando en producción** | T+2:30 | 13:00 | Los 3 pasos de la demo en tu celular | Reglas de recorte |
| 6 | **Congelar funciones** | E−0:45 | 14:45 | Línea "CONGELADO" en la bitácora | Se congela igual |
| 7 | Videos grabados y subidos | E−0:15 | 15:15 | El enlace abre en una ventana de incógnito | Graba con el celular |
| 8 | **Entrega interna completa** | E | 15:30 | Sección "Entrega interna" de la CHECKLIST | Lo que falte, domingo antes de las 11:00 |
| 9 | Dos ensayos con cronómetro | Antes de salir | 15:55 | Tiempos anotados | Ensaya en casa |
| 10 | **Entrega final en el portal** | Domingo 12:00 | — | Captura de la confirmación | El portal cierra a las 13:00 |

## Reglas de oro

1. **Una sola cosa muy bien hecha:** un flujo de cobro CoDi con IA de punta a punta, no cinco a medias.
2. **La demo manda:** a las 11:00 están escritos los 3 pasos de la demo; todo lo que no los sirve, espera.
3. **Siempre desplegado:** primer deploy antes de una hora; `main` siempre funciona; cada PR trae su preview.
4. **Nada inventado:** ni testimonios ni cifras sin fuente (K06.10 tiene datos con fuente); todo lo simulado dice SIMULACIÓN o MODO PRUEBA en pantalla.
5. **Haz lo que enseñan los organizadores:** si en el kickoff muestran un flujo, una plantilla o un consejo de pey o de Codex, úsalo y dilo.
6. **Documenta mientras construyes:** una línea en la bitácora por decisión, tarea lanzada o PR fusionado, con hora.
7. **Congela a E−0:45.** Después solo se arreglan errores del camino de la demo.
8. **Doble salida:** pitch en vivo **y** video. El jurado decide el lunes con lo entregado: el paquete tiene que defenderse sin ti.

## Mapa del día

```
Hora     10:30   11:00   11:30   12:00   12:30   13:00   13:30   14:00   14:30 14:45   15:15 15:30  16:00
Reloj    T       +0:30   +1:00   +1:30   +2:00   +2:30   +3:00   +3:30   +4:00 E-0:45  E-0:15 E
Codex    [P1 esqueleto]  [P2 Pey · P3 agente · P4 interfaz · P5 tiempo real] [P6 pruebas+README · P7 pulido · P8?]  ✋
ChatGPT  [idea][PRD][reparto][textos][guion]           [preguntas][deck][juez]   [README][portal][1 min]
José     decide · revisa P1 · deploy · lanza oleada · webhook pey · revisa y fusiona · prueba real · HITO 5
         · come · ensayo 1 · fusiona · arreglos · CONGELA · ensayo técnico · videos · ENTREGA INTERNA · ensayo 2
```

---

## Sábado 7 · Antes del inicio (9:00 → T)

### 9:00 · Llegada y conexión (15 min)
- **Objetivo:** lugar con enchufe y vista al escenario, internet funcionando y respaldo listo. Con unas 264 personas confirmadas (K01.1), los enchufes y el Wi-Fi van a escasear: llega temprano.
- **Quién:** 🧑 José.
- **Haz:** regístrate; conecta laptop y cargador (multicontacto si llevas); conéctate al Wi-Fi y abre un sitio pesado (Codex) para medir; deja el hotspot del celular listo para activarlo. Abre las pestañas de la CHECKLIST ("Al llegar").
- **Salida verificable:** Codex web, ChatGPT, GitHub, Vercel y docs.pey.mx abren con sesión iniciada.

### 9:15 · Prueba de humo (15 min)
- **Objetivo:** saber **antes** del kickoff que Codex, ChatGPT y las llaves funcionan.
- **Quién:** Codex (Prompt 0) · ChatGPT (prompt 0) · 🧑 José.
- **Haz:** lanza el **Prompt 0** de Codex (solo lectura). Pega el prompt 0 en ChatGPT (instrucciones del chat) y pídele que lea `AGENTS.md`. En Codespaces (si ya está creado) corre la llamada de prueba a la API de OpenAI de la CHECKLIST.
- **Salida verificable:** Codex respondió con el plan y el diagnóstico del entorno; ChatGPT citó una regla de `AGENTS.md`; la API respondió.
- **Si falla:** Codex sin acceso al repo o con el entorno sin publicar → K05.2; ChatGPT no ve el repo → plugin de GitHub (K05.13) o el respaldo: Proyecto de ChatGPT con `conocimiento/TODO-EN-UNO.md`, o URLs raw del repo público.

### 9:30 · Preguntas a organizadores y a pey (30 min)
- **Objetivo:** cerrar lo que no está publicado (K01.11) y decidir el **modo de pago** de la demo.
- **Quién:** 🧑 José, con los anfitriones (Ben Kim y Esteban Constante), los mentores de AI Builders y el equipo de pey (K01.5).
- **Pregunta (en este orden):**
  1. ¿Habrá demo o pitch en vivo el sábado? ¿A qué hora, cuánto dura y hay preguntas del jurado?
  2. ¿Qué se entrega en el portal (repo, URL, video, presentación, formulario) y cuánto puede durar el video?
  3. Criterios de evaluación y quién es el jurado.
  4. ¿Se permite código o material previo? ¿Cuenta como previo una base de conocimiento en Markdown (sin código del producto)?
  5. ¿Es obligatorio usar Codex u OpenAI? ¿Cómo quieren la evidencia?
  6. Para pey: ¿hay llaves o un entorno especial para el hackatón? (Pey no tiene sandbox documentado: se prueba en producción con centavos, K03.6.) ¿Mi llave con la cuenta de prueba está bien para la demo? ¿Algo que deba saber de los webhooks?
  7. Voto comunitario: dónde, quién vota y hasta cuándo. ¿El proyecto puede continuar en el Hackatón México?
- **Decide el modo de pago de Production** (los Preview siempre corren en SIMULACIÓN):
  - **A · Cuenta del comercio** (`MODO_PAGO=comercio`): solo si tu CLABE ya está activa en pey (tarda 5 días hábiles, K03.3; casi seguro no). Sin banner.
  - **B · Cuenta de prueba de pey (lo esperado, `MODO_PAGO=prueba`):** pagos CoDi **reales** de centavos o de $1 que no se devuelven (K03.3). `MAX_MONTO_MXN=20`. Banner "MODO PRUEBA". En el pitch se dice tal cual.
  - **C · SIMULACIÓN local** (`MODO_PAGO=simulacion`): solo si pey no responde o tu llave no funciona. Banner "SIMULACIÓN".
- **Salida verificable:** respuestas y modo de pago anotados en `BITACORA.md` (decisiones). E queda ajustada si hay pitch en vivo.

### 10:00 · Kickoff: capturar el reto y las reglas (≈30 min)
- **Objetivo:** tener el reto y las reglas **en el repo** para que Codex y ChatGPT los lean.
- **Quién:** 🧑 José · ChatGPT (prompt 1: foto → texto).
- **Haz:** escucha y toma fotos de las diapositivas. ChatGPT transcribe las fotos; tú pegas el resultado en `docs/RETO-OFICIAL.md` (nuevo, desde GitHub web, directo a `main`). Si muestran un flujo recomendado de pey o de Codex, anótalo en una sección "Lo que recomendaron".
- **Salida verificable:** `docs/RETO-OFICIAL.md` en `main`, con reto, ejemplos, reglas, criterios (si los dieron), formato de entrega y horarios.
- **No hagas:** escribir código del producto antes del inicio oficial.

---

## Sábado 7 · Construcción (T → E)

### 10:30 · T+0:00 — Arranque doble: esqueleto + idea (10 min)
- **Objetivo:** que Codex construya desde el minuto 5 mientras tú eliges la idea. El esqueleto no depende de la idea: es el flujo cobro CoDi + agente en SIMULACIÓN.
- **Quién:** Codex (**Prompt 1**, sin esperar la idea) · ChatGPT (prompt 2: elegir idea con la rúbrica) · 🧑 José decide en máximo 5 minutos.
- **Antes de lanzar el Prompt 1:** si el reto oficial pide otra superficie (por ejemplo, una app dentro de ChatGPT o un bot de mensajería), ajusta el prompt con K04.
- **Salida verificable:** tarea 1 corriendo en Codex; idea elegida con frase de valor, persona, ejemplo oficial al que responde y los 3 pasos de la demo; línea en la bitácora ("10:40 Elegí X porque Y").
- **Si se atora:** si en 10 min no hay decisión, toma la idea mejor puntuada de K07 que encaje en un ejemplo oficial.

### 10:40 · T+0:10 — PRD en 15 minutos (20 min)
- **Objetivo:** un PRD corto que sirva de contrato para Codex.
- **Quién:** ChatGPT (prompt 3, con [`../plantillas/PRD.md`](../plantillas/PRD.md)) · 🧑 José revisa 5 min.
- **Revisa sobre todo:** la demo de 3 pasos, el "No" del alcance, las herramientas del agente y que la IA nunca cobre sin confirmación.
- **Salida verificable:** `docs/PRD.md` en `main`. **Hito 2.**

### 10:55 · T+0:25 — Revisar el PR del esqueleto y primer deploy (25 min)
- **Objetivo:** producción viva antes de la primera hora.
- **Quién:** 🧑 José (revisión de 3 min de [PROMPTS-CODEX](PROMPTS-CODEX.md), sección 4) · Codex (seguimientos si falta algo).
- **Haz:** crea el PR, revisa el preview en la laptop (los previews piden sesión de Vercel), fusiona con Squash and merge. En Vercel: Root Directory `app`, variables por entorno (tabla de la CHECKLIST: `MODO_PAGO=simulacion` en Preview siempre y en Production por ahora) y vuelve a desplegar si cambiaste variables (pasos en el Prompt 1).
- **Salida verificable:** `https://<proyecto>.vercel.app/api/salud` responde `ok: true` y en el celular se ve el banner de SIMULACIÓN. **Hito 3.** Captura y línea en la bitácora.
- **Si se atora:** revisa el registro del deployment en Vercel (Root Directory, `"type": "module"`). A los 15 min sin salida → plan B 5 (Codespaces con puerto público) y sigue construyendo.

### 11:05 · T+0:35 — Repartir el PRD en tareas paralelas (en paralelo con el deploy)
- **Objetivo:** prompts 2–5 de Codex con los marcadores ya llenos.
- **Quién:** ChatGPT (prompt 4) · 🧑 José revisa que cada tarea toque solo sus archivos (mapa de dueños).
- **Salida verificable:** 4 prompts listos para pegar.

### 11:10 · T+0:40 — Lanzar la oleada 1 en paralelo (10 min)
- **Objetivo:** cuatro carriles de Codex trabajando al mismo tiempo sin chocar.
- **Quién:** Codex (**Prompts 2, 3, 4 y 5**) · 🧑 José los lanza desde `main` ya actualizado.
- **Haz:** lanza la 2 (pey) y la 3 (agente) primero; luego la 4 (interfaz) y la 5 (tiempo real). Una versión por tarea. **Toma captura de la lista de tareas corriendo**: es evidencia para el pitch (K08.12).
- **Salida verificable:** 3–4 tareas corriendo; una línea por tarea en la bitácora con su hora. **Hito 4.**

### 11:20 · T+0:50 — Mientras Codex trabaja (40 min)
- **Objetivo:** adelantar lo que solo tú puedes hacer y la narrativa.
- **Quién:** 🧑 José · ChatGPT.
- **Haz, en este orden:**
  1. En el portal de pey: crea el webhook con `https://<proyecto>.vercel.app/api/webhook-pey` (dominio de **producción**: los previews están protegidos y no reciben webhooks; K03.5) y guarda su secreto (`whsec_…`) como `PEY_WEBHOOK_SECRET` en Vercel Production. La ruta responde cuando se fusione la Tarea 2, y ese merge despliega ya con la variable cargada.
  2. Una llamada de prueba a pey con el ejemplo de K03 desde Codespaces, para confirmar que la llave funciona.
  3. ChatGPT prompt 5: textos de la interfaz (se los pasas a la Tarea 7).
  4. ChatGPT prompt 6: primer borrador del guion (K09.1). Se escribe ahora porque después no habrá tiempo.
- **Salida verificable:** webhook configurado; respuesta de pey anotada; textos y guion guardados en el chat.

### 12:00 · T+1:30 — Revisar y fusionar la oleada 1, una por una (45 min)
- **Objetivo:** cada PR fusionado y probado; `main` siempre funcionando.
- **Quién:** 🧑 José (revisión de 3 min) · Codex (seguimientos en la misma tarea; rescate R1 si hay bug).
- **Orden sugerido:** la **Tarea 2 primero**, en cuanto pasen sus pruebas (solo toca el servidor de Pey). Luego, en Production: tu llave de pey (`PEY_API_KEY`), `MODO_PAGO=prueba` y `MAX_MONTO_MXN=20`; vuelve a desplegar. Crea un cobro de $1: debe salir el banner "MODO PRUEBA" con el QR de pey; págalo con tu app del banco y mira que cambie a PAGADO (si falla: `MODO_PAGO=simulacion` otra vez y R1). Las demás, en el orden en que terminen; como tocan archivos distintos, no hay conflictos. Después de cada merge abre `/api/salud` en producción y revisa que `version` cambió.
- **Salida verificable:** PRs 2–5 fusionados, cada uno con su línea en la bitácora (hora y número de PR).
- **Si una tarea pasa de 25 min:** rescate R3 (dividirla). Si se acaba el límite de Codex: plan B 2.

### 12:45 · T+2:15 — Integración en producción y prueba real (15 min)
- **Objetivo:** los 3 pasos de la demo en el dominio de producción, desde el celular.
- **Quién:** 🧑 José · Codex (R1 si algo falla).
- **Haz:** confirma que Production está en el modo decidido a las 9:30 (modo A solo si tu CLABE ya está activa: `MODO_PAGO=comercio`; vuelve a desplegar). Haz la demo completa con todo ya fusionado: la frase de demo, confirmar, QR, pagas `[MONTO DEMO]` (1 peso) con tu app del banco y la pantalla cambia a PAGADO. Revisa en el portal de pey, en "Webhook Logs", que llegó el webhook (K03.5).
- **Salida verificable:** cobro confirmado en pantalla y su id anotado en la bitácora.

### 13:00 · T+2:30 — HITO 5: a mitad, el flujo principal funciona (5 min de decisión)
- **Objetivo:** decidir con datos. Autoevalúate con la rúbrica K08.4–K08.5 (C1–C5 del 1 al 5).
- **Quién:** 🧑 José.
- **Si funciona:** lanza la oleada 2. **Si no:** reglas de recorte (abajo) y todo Codex se dedica a cerrar el flujo de cobro.
- **Salida verificable:** línea en la bitácora: "13:00 Flujo en producción: sí/no · rúbrica C1–C5: _ _ _ _ _ · recorto: …".

### 13:05 · T+2:35 — Lanzar la oleada 2 (5 min)
- **Quién:** Codex (**Prompt 6** pruebas + README y **Prompt 7** pulido con los textos de ChatGPT; **Prompt 8** deck en HTML solo si te sobra límite).
- **Salida verificable:** 2–3 tareas corriendo, con sus líneas en la bitácora.

### 13:10 · T+2:40 — Comer y preparar el pitch mientras Codex trabaja (45 min)
- **Objetivo:** que el tiempo de espera se vuelva pitch.
- **Quién:** 🧑 José · ChatGPT.
- **Haz:** come (15 min, no te lo saltes). ChatGPT prompt 7 (preguntas del proyecto) y prompt 8 (contenido de las 7 diapositivas). **Ensayo 1:** di el guion completo en voz alta con cronómetro y grábate en el celular. ChatGPT prompt 9 (juez exigente) con 3 preguntas.
- **Salida verificable:** tiempo del ensayo 1 anotado; deck con contenido; 3 respuestas mejoradas.

### 13:55 · T+3:25 — Fusionar la oleada 2 y arreglar (40 min)
- **Quién:** 🧑 José · Codex (R1 para errores del camino de la demo).
- **Haz:** revisa y fusiona la 6 y la 7 (y la 8). Prueba la demo completa en producción en el celular y proyectada (`?presentar=1`). Arma el deck (si no lo hizo Codex) y expórtalo a PDF.
- **Salida verificable:** PRs fusionados; demo completa en producción en menos de 80 s; deck en PDF.

### 14:35 · T+4:05 — Último arreglo del camino de la demo (10 min)
- **Solo** errores que se ven en la demo. Lo demás va a "Limitaciones" del README.

### 14:45 · E−0:45 — CONGELAR (5 min)
- **Objetivo:** que nada cambie lo que vas a grabar y entregar.
- **Quién:** 🧑 José.
- **Haz:** escribe "CONGELADO" en la bitácora con el `version` de `/api/salud`. No se lanzan tareas nuevas. No cambias variables de entorno. Si algo se rompe después, regresa producción al deployment congelado desde Vercel (revertir es instantáneo, K05.16; ⚪ nombre de la opción).
- **Salida verificable:** línea "CONGELADO · versión abc1234".

### 14:50 · E−0:40 — Ensayo técnico de la demo, dos veces (10 min)
- **Haz:** la demo completa dos veces en producción, desde una ventana de incógnito (así la ve un juez) y en el celular. Al menos una con pago real de $1 (modo A o B). Revisa `/api/salud`: entorno correcto, `openai` y `pey` configuradas.
- **Salida verificable:** dos corridas sin error, con tiempo anotado.

### 15:00 · E−0:30 — Grabar los videos (15 min)
- **Objetivo:** el video es respaldo del pitch en vivo, pieza del portal y material para el voto comunitario.
- **Quién:** 🧑 José (K09.9) · ChatGPT (guion de video, prompt 6).
- **Graba dos piezas:**
  1. **Video de entrega (≤ 3 min ⚪ según el portal):** pitch + demo real en producción, con la URL en pantalla.
  2. **Video corto (60–90 s):** problema → 3 pasos → resultado, pensado para verse sin audio (texto en pantalla).
- **Haz:** usa la grabadora de pantalla de tu sistema para la laptop y el celular para el momento del pago. Una toma buena basta; el domingo puedes regrabar en silencio. Súbelo como enlace no listado o con permiso de "cualquiera con el enlace" ⚪ y guarda copia local en laptop y celular.
- **Salida verificable:** los dos enlaces abren en incógnito. **Hito 7.**

### 15:15 · E−0:15 — Entrega interna (15 min)
- **Quién:** 🧑 José · ChatGPT (prompt 11: revisión del README y textos del portal).
- **Haz:** pon los enlaces del video y de producción en el README (GitHub web). ChatGPT revisa el README contra la rúbrica y redacta los textos del portal. Recorre la sección "Entrega interna" de la [CHECKLIST](CHECKLIST.md). Si el portal ya está abierto y tienes todo, **entrega ya**: el domingo solo actualizas si se puede editar ⚪.
- **Salida verificable:** checklist "Entrega interna" completa; textos del portal guardados en `docs/ENTREGA.md` o en el chat. **Hito 8.**

### 15:30 · E — Demos o pitch en vivo (si los hay) y ensayo 2 (30 min)
- **Si hay pitch o demo en vivo:** sigue K09 (guion de 3 min o versión de 1 min, según el tiempo que den). 10 min antes: prepara lo de la CHECKLIST ("Pitch").
- **Si no hay:** **ensayo 2** completo con cronómetro (pitch + demo en vivo en producción) y luego la versión de 1 minuto. Muéstrale la demo a un mentor o a alguien de pey y anota sus preguntas.
- **Siempre:** pregunta otra vez por la URL del portal y el formato del video; despídete de los anfitriones.
- **Salida verificable:** tiempos de los dos ensayos y preguntas recibidas en la bitácora. **Hito 9.**

### 16:00 — Fin de la jornada presencial
- No fusiones nada al salir. Producción queda congelada.

---

## Sábado en la noche (opcional, ligero)
- Descansa. Si quieres, mira una vez el video de entrega y anota mejoras para el domingo.
- **Solo** si hay un error grave en el camino de la demo: R1 de Codex → preview → pruebas → merge → demo completa otra vez. Nada de funciones nuevas.

## Domingo 8 · Entrega final (antes de las 12:00)

| Hora | Qué | Quién | Salida verificable |
|---|---|---|---|
| 9:00 | Revisión con ojos frescos: producción en incógnito desde el celular, README, videos y requisitos del portal (ya deberían estar publicados ⚪) | 🧑 José | Lista de 3–5 arreglos como máximo |
| 9:30 | **Ventana de mejora (opcional):** máximo 2 tareas chicas de Codex (errores o README), cada una con preview, pruebas y demo completa después del merge. Regrabar el video si el del sábado quedó con ruido | Codex · 🧑 | PRs fusionados o descartados |
| 11:00 | **Congelado final.** Demo completa en producción otra vez | 🧑 | Línea "CONGELADO FINAL · versión …" |
| 11:15 | Llenar el portal con los textos de ChatGPT (prompt 11); revisar cada enlace en incógnito | 🧑 · ChatGPT | Formulario enviado |
| 11:45 | Captura de la confirmación; anótalo en la bitácora | 🧑 | **Hito 10** |
| 12:00–13:00 | Colchón por si el portal falla: avisa a los organizadores por el canal oficial ⚪ con captura | 🧑 | — |
| Tarde | Kit para el voto comunitario listo (K09.9 y prompt 12 de ChatGPT) | ChatGPT · 🧑 | Video corto, enlace, QR, imagen y textos |

## Lunes 9 y martes 10
- **Lunes en la mañana:** anuncio del jurado. Cuando abra el voto comunitario, comparte el kit en tus redes y comunidades, sin spam y sin ofrecer nada a cambio de votos (K08.6).
- Mantén la demo viva: no fusiones cambios, revisa el saldo y el tope de gasto de la API de OpenAI y deja `MAX_MONTO_MXN` bajo si el enlace es público.
- **Martes 14:00:** DevDay Exchange, si te toca boleto. Lleva la demo lista.

---

## Planes B

| # | Problema | Señal | Acción inmediata (≤ 2 min) | Si sigue | Qué dices si pasa en el pitch |
|---|---|---|---|---|---|
| 1 | **Internet de la sede caído** | Codex o ChatGPT no cargan en 1 min | Hotspot del celular (ya configurado); pausa subidas de video | Trabaja solo con Codex y ChatGPT (son ligeros); sube los videos en casa | "Estoy en el hotspot; si tarda, les muestro la misma operación grabada en producción" → video local |
| 2 | **Codex lento o con límite** | Tarea de más de 25 min, o aviso de límite de uso | No relances duplicados; divide la tarea (R3); baja a 2 carriles (prioridad: 2 y 3) | Codex CLI en Codespaces: `codex login --device-auth`; si se acabó el límite del plan, entra con tu API key (`codex login --with-api-key`; se cobra a tu saldo de la API, K05.10). Último recurso: ChatGPT escribe un archivo chico y lo pegas en GitHub web | — |
| 3 | **API de OpenAI sin saldo o caída** | `/api/agente` responde 503 (sin saldo u ocupada) o 5xx; página de estado de OpenAI | Recarga saldo en la plataforma 🧑 (puede tardar unos minutos ⚪); revisa que la llave sea la del proyecto correcto; prueba el modelo con la llamada de la CHECKLIST | Si el modelo no está disponible, cambia `OPENAI_MODEL` por otro de K04.2 y vuelve a desplegar. En la demo usa "Capturar a mano": el cobro funciona sin IA | "La IA acelera, pero nunca es requisito para cobrar: capturo a mano y el cobro sigue" + video con la IA funcionando |
| 4 | **Cuenta de pey sin aprobar** (tu CLABE aún no está activa, o la llave no cobra) | `PEY_NO_AUTORIZADO` en pantalla (401, 403 o `INVALID_STATE`, K03.8); el portal de pey dice pendiente | Usa la llave ligada a la **cuenta de prueba** de pey (modo B, banner "MODO PRUEBA") y habla con el equipo de pey en la sede | Si pey no responde (503) o la llave no sirve: `MODO_PAGO=simulacion` en Production y vuelve a desplegar (R5), banner "SIMULACIÓN"; muestra el video del pago real grabado anoche o en la mañana (K03.6, plan B2) | Modo B: "Es un pago CoDi real de un peso; hoy cae en la cuenta de prueba de pey porque registrar mi CLABE tarda 5 días hábiles". Modo C: "La integración está completa y probada; esta demo corre en SIMULACIÓN y lo dice la pantalla". Nunca presentes una simulación como real |
| 5 | **Vercel falla** | Deploy en error, sitio caído o funciones en 500 después de un merge | Lee el registro del deployment; regresa producción al último deployment bueno (revertir es instantáneo, K05.16; ⚪ nombre de la opción) | Codespaces: `npm run local --prefix app` (o `vercel dev` si ya iniciaste sesión) → pestaña PORTS → clic derecho en el 3000 → Port Visibility → Public, o `gh codespace ports visibility 3000:public` (K05.17) → comparte `https://<codespace>-3000.app.github.dev`; si necesitas el webhook, cambia su URL en el portal de pey (uno por llave, K03.5). Las llaves salen de los secretos de Codespaces. Mantén el codespace activo | "Corre desde un servidor de respaldo; mismo código" |

**Otros:**
- **Conflicto entre PRs:** cierra el PR y relanza la tarea desde `main` actualizado (R2).
- **El pago real no se confirma en 20 s durante el pitch:** "Mientras CoDi confirma, les muestro la misma operación grabada hace una hora" → video en el momento del pago. Si se confirma después, regresa y muéstralo.
- **Falla el proyector:** presenta desde la laptop o el celular frente al jurado, o pon el video.
- **Se apaga la laptop:** la app es móvil primero: ábrela en el celular; videos y deck en PDF también están en el celular.
- **Te cambian el tiempo del pitch:** 1 minuto → K09.8; 2 minutos → guion de 3 min sin "Cómo lo construí" (una frase al cierre).
- **Cambia el horario del día:** recalcula con los dos relojes (T y E) y conserva el orden de los bloques.

## Reglas de recorte

- **T+0:50 sin deploy:** todo se detiene hasta que `/api/salud` responda en producción (o en Codespaces con puerto público).
- **T+2:30 sin flujo en producción:** el agente se queda solo con `crear_cobro`; fuera los extras del PRD; si pey real no funciona, modo prueba o SIMULACIÓN etiquetados. Si C2 (ejecución) está en 3 o menos, todo se dedica a cerrar el cobro (K08.4).
- **Tarea de Codex de más de 25 min:** se divide (R3).
- **Error que no está en el camino de la demo:** va a "Limitaciones" del README; no se arregla hoy.
- **E−0:45:** lo que no esté fusionado y probado no entra. Se esconde, no se muestra roto.

## Formato de la bitácora (`BITACORA.md`)

En la tabla **Decisiones** (fecha, decisión, por qué, alternativas):
```
| 2026-11-07 | 10:40 Idea: [IDEA ELEGIDA] | Responde al ejemplo oficial "[ejemplo]"; rúbrica 4/4/4/3/4 | [idea 2], [idea 3] |
| 2026-11-07 | 9:55 Modo de pago en Production: B (MODO_PAGO=prueba, MAX_MONTO_MXN=20) | Mi CLABE tarda 5 días hábiles; pey confirmó la cuenta de prueba | A comercio, C simulación |
```
En la tabla **Historial** (fecha, qué se hizo, evidencia, commit):
```
| 2026-11-07 | 11:12 Lancé T2–T5 en paralelo en Codex | captura de la lista de tareas | — |
| 2026-11-07 | 12:08 Fusioné PR #3 (Tarea 3: agente) | preview + pruebas en verde | abc1234 |
| 2026-11-07 | 14:45 CONGELADO | /api/salud versión abc1234 | abc1234 |
```
