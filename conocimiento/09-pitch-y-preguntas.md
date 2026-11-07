---
id: K09
titulo: "Pitch, demo y preguntas difíciles"
resumen: "Guion de 3 minutos, demo de 3 pasos, plan B y banco de 20 preguntas con respuesta modelo."
responde:
  - "¿Qué digo en el pitch y en qué orden?"
  - "¿Cómo respondo las preguntas difíciles de los jueces?"
actualizado: 2026-11-06
confianza: media
fuentes: []
---
# K09 · Pitch, demo y preguntas difíciles

## TL;DR
- **Orden del pitch (3 min):** persona y dato con fuente → frase de valor → demo de 3 pasos en producción con un **pago CoDi real de $1** → decisiones de construcción → bien público, siguiente paso y URL (K09.1).
- **Doble salida:** el jurado decide el lunes con lo entregado y no se sabe si habrá pitch en vivo el sábado (K01.11). Prepara el pitch en vivo **y** el video; el video corto sirve también para el voto comunitario (K09.9).
- **Demo a prueba de fallas:** dominio de producción, frase de demo preparada en un botón, monto de $1, video cargado en el minuto del pago y frases de rescate ya ensayadas (K09.3, K09.7).
- **Codex y OpenAI con evidencia, no con adjetivos:** PRs con hora, tareas en paralelo, `AGENTS.md` y el esquema de `crear_cobro` (el modelo propone; la persona confirma; el servidor valida) (K09.4).
- **De memoria:** "¿Qué hizo la IA y qué hiciste tú?", "¿Cómo protegen los datos?" y "¿Qué sigue?" (K09.6, preguntas 1–3).
- **Nada inventado:** las personas son arquetipos y se dicen como ejemplo (K06.9); cada dato lleva su fuente (K06.10); el modo prueba o la SIMULACIÓN se dicen en voz alta.

## K09.1 · Guion de 3 minutos (con marcadores)

Ritmo: unas 2.3 palabras por segundo; menos de 400 palabras en total, porque en la demo se habla poco. Llena los `[MARCADORES]` con `docs/PRD.md` y la bitácora, o con el prompt 6 de ChatGPT (`dia-del-evento/PROMPTS-CHATGPT.md`).

| Tiempo | Segmento | Diapositiva ([DECK](../plantillas/DECK.md)) | Criterio que ataca (K08.3) |
|---|---|---|---|
| 0:00–0:20 | Gancho: persona real + un dato | 1 → 2 | C1 impacto |
| 0:20–0:40 | Solución: frase de valor y ejemplo oficial del reto | 3 | C1, C4 |
| 0:40–2:00 | Demo de 3 pasos, en vivo (K09.3) | 4 (la app) | C2 ejecución, C3 OpenAI |
| 2:00–2:30 | Cómo lo construí: decisiones y evidencia | 5 | C3 Codex, C5 |
| 2:30–3:00 | Bien público, siguiente paso y cierre con URL/QR | 6 → 7 | C1, C5 |

**0:00–0:20 · Gancho** (unas 45 palabras)
> "Pensemos en [ARQUETIPO, dicho como ejemplo; p. ej. 'un puesto de fruta en un tianguis' de K06.9]. Cobra montos chicos y casi todo en efectivo: [DATO 1 CON FUENTE; p. ej. 'el 85 % de los adultos paga en efectivo sus compras de hasta 500 pesos, según la ENIF 2024' (K06.10, dato 1)]. Y si acepta tarjeta, [DATO 2; p. ej. 'paga hasta 3.95 % por cobro con débito, según Banxico' (K06.10, dato 5)]."

**0:20–0:40 · Solución** (unas 45 palabras)
> "[NOMBRE] es [FRASE DE VALOR]. Responde al reto de hoy, herramientas de bien público con OpenAI y CoDi, en su ejemplo de [EJEMPLO OFICIAL; p. ej. 'cobro para comercios de barrio' (K01.4)]: el comercio dice lo que vendió, la IA arma el cobro, aparece un QR de CoDi sin comisión y el pago se confirma solo."

**0:40–2:00 · Demo** (unas 60 palabras; el detalle está en K09.3)
> Paso 1: "Él no llena formularios: dice '[FRASE DE DEMO]'." · Paso 2: "La IA no cobra: propone. Yo confirmo y pey genera el QR CoDi." · Paso 3: "Pago un peso real desde la app de mi banco… y listo: confirmado por pey, no por una captura."

**2:00–2:30 · Cómo lo construí** (unas 60 palabras)
> "Lo construí hoy, solo, con Codex: [N] tareas, [M] en paralelo, cada una con criterios de aceptación y su preview desplegado; [P] PRs fusionados. Tomé tres decisiones: la IA solo propone, con una función acotada, `crear_cobro`, y la persona confirma; el pago lo confirma pey con un webhook firmado, no una captura; y todo estuvo en producción desde la primera hora."

**2:30–3:00 · Impacto y cierre** (unas 60 palabras)
> "Es bien público porque cobrar cuesta cero y, con la cuenta del comercio, el dinero le llega directo. Y es el momento: [POR QUÉ AHORA; p. ej. 'el 14 de diciembre todas las apps bancarias deben procesar cobros CoDi con el mismo estándar' (K06.10, dato 10)]. Siguiente paso: un piloto con [N] comercios de barrio y llevarlo al Hackatón México. Está en vivo: escaneen el QR. Gracias."

**Tarjeta de memoria** (5 palabras por segmento, en el celular): `Persona · efectivo · comisión` → `Dice · propone · QR · confirma` → `Frase · confirmo · pago · PAGADO` → `Codex · paralelo · PRs · decisiones` → `Cero comisión · 14 dic · piloto · QR`.

## K09.2 · Reglas del pitch

1. **Persona antes que tecnología.** En los primeros 40 segundos no hay jerga: ni "API", ni "LLM", ni "webhook".
2. **Un número a la vez y con su fuente dicha en voz alta** ("según Banxico…"). Si es estimación, di "estimo" y el supuesto.
3. **Di qué ejemplo oficial del reto resuelves** y por qué es bien público (K01.4). Es lo primero que el jurado va a cotejar.
4. **Demo en el dominio de producción**, nunca en local ni en un preview (los previews piden sesión de Vercel).
5. **Un pago real de $1 vale más que diez pantallas.** Si estás en modo prueba o en SIMULACIÓN, dilo antes de que pregunten.
6. **Decisiones, no herramientas.** En "Cómo lo construí" cuenta 2 o 3 decisiones y la evidencia; no enumeres productos.
7. **No leas.** Usa la tarjeta de memoria; mira al jurado al decir la frase de valor.
8. **Cronómetro visible.** Si a los 2:00 no terminó la demo, salta al cierre: el cierre con la URL no se sacrifica.
9. **Cierra con una petición concreta** (piloto, mentoría, acceso) y con la URL/QR en pantalla.
10. **Respuestas de 20 a 30 segundos:** respuesta directa → evidencia → silencio. Si no sabes: "No lo sé todavía; lo verificaría así: …".
11. **Nada de hablar mal** de otras herramientas, organizadores o bancos, ni presumir alianzas que no existen (K02.13).
12. **El formato del organizador manda:** si dan 2 minutos o una diapositiva (como en San Francisco, K08.2), usa la versión corta (K09.8).
13. **Ensaya dos veces con cronómetro** y graba una de las dos en el celular para escucharte.

## K09.3 · Demo de 3 pasos y cómo hacerla a prueba de fallas

**Los 3 pasos** (≤ 80 segundos; cambia los marcadores con los del PRD):

| Paso | Lo que haces | Lo que dices | Lo que ve el jurado | Si falla (K09.7) |
|---|---|---|---|---|
| 1 · Pide el cobro con sus palabras (0:40–1:05) | Tocas el botón de ejemplo "[FRASE DE DEMO]" (o la dices o escribes) | "No llena formularios: dice lo que vendió." | La propuesta de la IA: concepto, detalle y total; botón Confirmar | IA lenta → "Capturar a mano" |
| 2 · Confirma y aparece el QR (1:05–1:30) | Tocas "Confirmar y generar QR" | "La IA no cobra: propone. Yo confirmo, y pey genera el QR CoDi, sin comisión." | QR grande, monto y, si aplica, el banner MODO PRUEBA | Error de pey → video |
| 3 · El cliente paga y se confirma solo (1:30–2:00) | Escaneas con la app de tu banco y autorizas $1 | "Pago real de un peso desde mi banco… confirmado por pey, no por una captura." | La pantalla cambia a PAGADO con palomita y hora | > 20 s sin confirmar → video |

**El monto de la demo.** Pey no tiene sandbox; mañana la llave está ligada a la cuenta de prueba de pey y lo que se paga no se devuelve (K03.3, K03.6). Usa una frase de demo cuyo total sea **$1 o menos** (p. ej. "[un dulce de un peso]") y `MAX_MONTO_MXN=20`. Si quieres una orden más realista, súbele el monto sabiendo que ese dinero no regresa.

**Diseño a prueba de fallas (ya está en los prompts de Codex):**
- Un solo camino feliz, con botón de ejemplo para no teclear en vivo y `?presentar=1` para el proyector.
- La confirmación no depende del webhook: la pantalla pregunta a pey cada 2 segundos (K03.6, plan B1).
- "Capturar a mano" siempre disponible: si la IA falla, el cobro sigue.
- La pantalla nunca miente: PAGADO solo si pey lo confirma; banner de MODO PRUEBA o SIMULACIÓN cuando aplica.
- "Reiniciar demo" para volver al paso 1 en un toque, y `/api/salud` para revisar el modo antes de subir.

**10 minutos antes:** la lista "Pitch" de `dia-del-evento/CHECKLIST.md`. Lo crítico: app del banco abierta y con sesión, un cobro de prueba en los últimos 15 minutos, `/api/salud` con el modo correcto, el video local pausado justo en el momento del pago, No molestar en laptop y celular.

## K09.4 · Cómo contar el uso de Codex y de la API de OpenAI (con evidencia)

**Codex: muestra, no adjetives** (K08.12):
- `AGENTS.md` en la raíz: las reglas que Codex siguió (stack, pruebas, seguridad, definición de terminado).
- Captura de la lista de tareas corriendo **en paralelo** (se toma al lanzar la oleada 1; RUNBOOK, 11:10).
- Lista de PRs fusionados, con título y hora; cada uno con su preview de Vercel.
- `BITACORA.md`: hora → tarea → resultado. Es la fuente de los números del pitch: **nunca los redondees hacia arriba**.
- Honestidad: una cosa que falló con Codex y cómo la corregiste (por ejemplo, una tarea que se atoró y dividiste). Los embajadores valoran esa retroalimentación (K08.12).

**La API de OpenAI dentro del producto:**
- Responses API con function calling: el modelo traduce lenguaje natural a una llamada estructurada a `crear_cobro` (esquema de K03.9 y K04.15).
- La IA está acotada: el modelo solo **propone**; el servidor valida (monto > 0, tope `MAX_MONTO_MXN`, que el detalle sume) y el QR se crea en pey solo cuando la persona confirma. Es el patrón de los ganadores de Build Week: código determinista para el dinero, modelo para el lenguaje y la persona en control (K08.10).
- Las llaves solo viven en el servidor; al modelo solo le llega el texto del pedido (`store: false` si K04 lo confirma ⚪).
- Si probaste alguna novedad del DevDay 2026, menciónala solo si funciona en la demo (K02.4, K08.5).

**Frase para la diapositiva 5:** "Codex escribió el código en [P] PRs y [M] tareas en paralelo; yo escribí los contratos, revisé cada preview y decidí: la IA propone, la persona confirma y pey confirma el pago."

## K09.5 · Cierre: siguiente paso hacia el Hackatón México (el nacional)

- **Frase de cierre:** "Siguiente paso: un piloto con [N] comercios de barrio [zona ⚪] en las próximas dos semanas y llevar este mismo proyecto al Hackatón México, del 14 de noviembre al 12 de diciembre. Está en vivo: escaneen el QR."
- **Plan de 30 días** (para preguntas y para la diapositiva 6; son metas, no resultados):
  1. Semana 1: piloto con [N] comercios reales (con su consentimiento) y la cuenta del comercio activa en pey (la CLABE tarda 5 días hábiles, K03.3).
  2. Semana 2: medir tiempo por cobro, pagos confirmados y cobros capturados a mano contra por voz o texto.
  3. Semanas 3 y 4: la función que más pidan (p. ej. corte del día) y la entrega en el Hackatón México, el hackatón nacional de hackatonmexico.com (más de 1 millón de pesos en premios, créditos y recursos; CoDi y API de Pey; K01.10). ⚪ Confirma que allá se puede continuar un proyecto iniciado el 7 de noviembre.
- **Por qué ahora:** a más tardar el 14 de diciembre de 2026 todas las apps bancarias deben homologar sus transferencias y procesar los cobros CoDi con el mismo estándar (K06.5).
- **Petición concreta** (elige una): a pey, acceso temprano para el piloto con cuentas de comercio; a AI Builders, mentoría para el Hackatón México; a los anfitriones, contactos con locatarios o mercados.
- Si ganas boletos: el DevDay Exchange es el martes 10 a las 14:00 (K01.3); lleva la demo lista.

## K09.6 · Banco de 20 preguntas difíciles con respuesta modelo

Respuestas de 20 a 30 segundos. Cambia los `[MARCADORES]` por datos reales de la bitácora. Las tres primeras van de memoria.

**1. ¿Qué hizo la IA y qué hiciste tú?**
"Codex escribió casi todo el código en [P] PRs chicos, varios en paralelo; ChatGPT me ayudó con el PRD y los textos. Yo elegí el problema, escribí el contrato y los criterios de aceptación de cada tarea, probé cada PR en su preview y tomé las decisiones: la IA propone y la persona confirma; el pago lo confirma pey, no una captura; y todo desplegado desde la primera hora."
*Evidencia:* PRs con hora, `BITACORA.md`, `AGENTS.md`, captura de tareas en paralelo. *No digas:* "la IA lo hizo todo" ni "yo programé todo".

**2. ¿Cómo protegen los datos? ¿Dónde viven las llaves?**
"Las llaves de OpenAI y de pey viven solo en el servidor, como variables de entorno; el navegador nunca las ve y el repo público no tiene ninguna. No guardamos datos del cliente. Al modelo solo le llega el texto del pedido. Cada webhook de pey se verifica con su firma, su hora y su id, y los montos tienen un tope que impone el servidor."
*Evidencia:* `.env.example` (solo nombres), la prueba de que ninguna respuesta filtra llaves, el verificador sin "posible secreto". *No digas:* "es 100 % seguro".

**3. ¿Qué sigue?**
"Un piloto con [N] comercios de barrio en dos semanas para medir tiempo de cobro y pagos confirmados; [la función que más pidan]; y llevarlo al Hackatón México, del 14 de noviembre al 12 de diciembre. Además, el 14 de diciembre todas las apps bancarias deben procesar cobros CoDi con el mismo estándar: es el momento."
*Evidencia:* sección "Qué sigue" del README; K06.10, dato 10. *No digas:* alianzas que no existen.

**4. ¿Por qué esto es bien público?**
"Porque baja a cero el costo de cobrar para quien tiene menos margen: CoDi no cobra comisión ni a quien paga ni a quien cobra. La IA quita la barrera de aprender una app: el comercio dice lo que vendió. Y el código es abierto, para que un mercado o una cooperativa lo reutilice."
*Evidencia:* K03.1 (sin comisión), K06.10 (dato 5), licencia del repo ⚪ (elígela antes de entregar). *No digas:* "acaba con la informalidad".

**5. ¿Qué construiste hoy y qué existía antes?**
"Antes del evento solo preparé investigación en Markdown: la base de conocimiento, plantillas y las reglas para Codex. Todo el código del producto, en `app/`, se escribió hoy: lo ven en el historial de git y en los PRs con su hora."
*Evidencia:* historial de `app/`, sección "Qué existía antes" del README. *No digas:* nada que el historial contradiga. ⚪ Ajusta la respuesta a la regla que den los organizadores (K01.11).

**6. ¿Quién es el usuario exacto y cómo sabes que tiene este problema?**
"[PERSONA], por ejemplo un puesto que cobra montos de 20 a 150 pesos (caso ilustrativo, K06.9). Lo sustento con datos, no con entrevistas: [DATO K06.10]. Todavía no lo pruebo con comerciantes reales; es lo primero del piloto."
*Evidencia:* K06.9, K06.10. *No digas:* testimonios inventados ("doña X me dijo…").

**7. ¿El cobro es real o simulado?**
"Real: fue un pago CoDi de un peso, confirmado por pey. Hoy cae en la cuenta de prueba que publica pey, porque registrar mi CLABE ante Banxico tarda 5 días hábiles; con la cuenta del comercio funciona igual. Cuando algo es simulación, la pantalla dice SIMULACIÓN."
*Evidencia:* banner de la app, "Webhook Logs" del portal de pey, video. *No digas:* "es real" si estabas en SIMULACIÓN.

**8. ¿Por qué CoDi y no tarjeta o transferencia?**
"Con tarjeta, una miscelánea paga hasta 3.95 % por cobro con débito, según Banxico. CoDi no cobra comisión y el dinero llega en segundos. Frente a una transferencia, el cliente no teclea CLABE ni monto: escanea y autoriza, y el comercio recibe la confirmación automática."
*Evidencia:* K06.10 (dato 5), K03.1. *No digas:* que CoDi ya es masivo (no lo es; K06.10, dato 6).

**9. ¿Qué hace la IA que un formulario no podría?**
"Entiende cómo habla el comercio: '[FRASE DE DEMO]' se vuelve un cobro con concepto, detalle y monto, sin menús. Pero está acotada: solo propone con una función estructurada, el servidor valida y la persona confirma. Si la IA falla, el formulario manual sigue ahí: la IA acelera, no es requisito para cobrar."
*Evidencia:* esquema de `crear_cobro`, botón "Capturar a mano". *No digas:* "la IA decide".

**10. ¿Cómo evitas que el modelo invente montos?**
"Con tres candados: el modelo devuelve una propuesta estructurada, no texto libre; el servidor valida que el monto sea positivo, que no pase del tope y que el detalle sume; y la persona ve el total y confirma antes de que exista el QR. Además, las instrucciones le prohíben inventar precios: si falta uno, pregunta."
*Evidencia:* pruebas de `agente.test.js` (suma inválida, tope). *No digas:* "el modelo no se equivoca".

**11. ¿Cómo sabes que el pago es real y no una captura de pantalla?**
"La pantalla solo cambia a PAGADO cuando pey lo confirma: la app consulta el estado del QR y además recibe un webhook firmado con el estándar Standard Webhooks; verificamos la firma, la hora y que no venga repetido. El comercio ya no revisa capturas."
*Evidencia:* `webhook-pey.js` y sus pruebas; "Webhook Logs". *No digas:* que nunca puede fallar.

**12. ¿Qué pasa si falla el webhook o el internet?**
"El webhook no es indispensable: mientras el QR está vigente, la app pregunta a pey cada 2 segundos. Si se cae la red, muestra 'Reconectando…' y nunca marca pagado sin confirmación. CoDi sí necesita internet; sin red, el comercio cobra como siempre."
*Evidencia:* `estado-pago.js` y su prueba de 3 errores seguidos. *No digas:* "funciona sin internet".

**13. ¿Cuánto cuesta operarlo por comercio al mes?**
"Pey es gratis por ahora y CoDi no cobra comisión. El costo variable es la IA: una llamada corta por cobro. Hoy hice [N] llamadas y costaron [X] según el panel de uso de OpenAI; con [C] cobros al día serían unos [Y] al mes. Es una estimación con esos supuestos. Un cobro capturado a mano no cuesta IA."
*Evidencia:* panel de uso de OpenAI; precios en K04.2. *No digas:* cifras que no calculaste.

**14. ¿Cómo se sostiene si no cobra comisión?**
"Hoy el objetivo es bien público y adopción. Hay dos hipótesis para validar en el piloto: que el comercio pague por funciones extra, como el corte del día, o que una organización (un mercado, una cooperativa o una alcaldía) lo ofrezca como servicio. No lo afirmo: es lo que voy a probar."
*Evidencia:* "Qué sigue" del README. *No digas:* un modelo de negocio con números inventados.

**15. ¿Por qué lo usaría un comercio que hoy cobra en efectivo?**
"Porque el efectivo domina, pero no todos los clientes lo traen, y las terminales cobran comisión. Aquí no compra equipo, no paga comisión y cobra hablando. La barrera es la confianza; por eso el pago se confirma solo y hay comprobante."
*Evidencia:* K06.10 (datos 1 y 5), K06.6 (fraude y desconfianza). *No digas:* que la adopción está garantizada.

**16. ¿Qué pasa si el cliente no tiene CoDi activado o su banco no lo soporta?**
"Es la debilidad real de CoDi: 21.8 millones de cuentas validadas, pero solo 2.5 millones han pagado alguna vez, según Banxico. Por eso importa el 14 de diciembre, cuando todas las apps deberán procesar cobros CoDi con el mismo estándar. Mientras, el comercio sigue aceptando efectivo: sumamos, no reemplazamos."
*Evidencia:* K06.10 (datos 6 y 10). *No digas:* que todos los bancos ya lo soportan bien.

**17. ¿Escala? ¿Qué se rompe con 10,000 comercios?**
"El servidor no guarda estado y la verdad del pago vive en pey, así que crece horizontalmente. Lo primero que habría que construir: una cuenta y una llave de pey por comercio, límites de uso de IA por comercio y una base de datos para historial y conciliación. Hoy es un prototipo para un comercio."
*Evidencia:* arquitectura del README. *No digas:* "escala infinito".

**18. ¿Qué pasa si se cae OpenAI o pey?**
"Si cae OpenAI, el comercio captura monto y concepto a mano y el cobro sigue igual. Si cae pey, no hay cobro CoDi: la app lo dice claro y el comercio cobra en efectivo. Nunca presentamos una simulación como pago real."
*Evidencia:* mensajes de error de la app (IA no disponible, pey no disponible). *No digas:* que no puede fallar.

**19. ¿Y la regulación: Banxico, datos personales, lavado de dinero?**
"No custodiamos dinero: el pago va de banco a banco por CoDi y la integración la opera pey [lo que diga K02.7 ⚪]. No guardamos datos personales del cliente. Para un piloto con comercios reales falta un aviso de privacidad y revisar con pey las obligaciones de cada parte. No presumo certificaciones que no tengo."
*Evidencia:* sección de seguridad y privacidad del README; K02.7. *No digas:* "cumplimos con todo".

**20. ¿Qué fue lo más difícil? ¿Qué falló con Codex?**
"[LO MÁS DIFÍCIL REAL, de la bitácora; p. ej. 'confirmar el pago en tiempo real sin websockets' o 'una tarea de Codex que se atoró'.] Lo resolví [CÓMO]. Aprendí a darle a Codex tareas chicas, con archivos propios y criterios verificables."
*Evidencia:* el PR del arreglo y su línea en la bitácora. *No digas:* "nada falló".

## K09.7 · Plan B de la demo

| Falla | Señal | Qué dices (literal) | Qué haces | Tiempo máximo |
|---|---|---|---|---|
| Internet de la sala | La página no carga en 5 s | "Me cambio al hotspot; mientras, les cuento el problema." | Hotspot del celular y recargas | 30 s; si no carga, el video |
| La IA tarda o falla | "Pensando…" por más de 8 s, o el mensaje de IA no disponible | "La IA está tardando; el comercio también puede capturar a mano, y el cobro sigue igual." | "Capturar a mano": monto y concepto | 10 s |
| El pago no se confirma | Más de 20 s en "Esperando pago" | "Mientras CoDi confirma, les muestro la misma operación grabada hace una hora en producción." | Video local en el minuto del pago; si se confirma después, regresas y lo muestras | 20 s |
| pey no responde | Error de pey al generar el QR | "pey no responde en este momento; por eso grabé el flujo completo en producción." | Video | Inmediato |
| Falla el proyector | No hay imagen | "Se los muestro aquí." | Pantalla de la laptop o el celular hacia el jurado, o el video en el celular | 30 s |
| Se apaga la laptop | — | "La app es móvil primero." | Abres la URL en el celular; video y deck en PDF también están ahí | 30 s |
| Te quedas en blanco | — | La frase de valor | Tarjeta de memoria (K09.1) | — |
| Te recortan el tiempo | Aviso del moderador | — | Versión de 1 minuto (K09.8) | — |

**Regla de oro:** si cambias a video o a SIMULACIÓN, lo dices. Un respaldo honesto suma puntos; un pago simulado presentado como real te quita la credibilidad (K02.13).

## K09.8 · Versión de 1 minuto

Unas 140 palabras. Sirve para un pitch recortado, para la conversación de pasillo con un juez y como narración del video corto.

> **[0:00–0:10]** "Pensemos en [ARQUETIPO]: cobra casi todo en efectivo y, si acepta tarjeta, paga hasta 3.95 % de comisión (Banxico)."
> **[0:10–0:20]** "[NOMBRE] es [FRASE DE VALOR], con CoDi, sin comisión."
> **[0:20–0:45]** "Miren: digo '[FRASE DE DEMO]', la IA propone el cobro, confirmo, pey genera el QR CoDi… pago un peso desde mi banco… y se confirma solo."
> **[0:45–1:00]** "Lo construí hoy con Codex, en tareas paralelas, y con la API de OpenAI acotada: la IA propone y la persona decide. Siguiente paso: piloto con comercios de barrio y el Hackatón México. Está en vivo: [URL]."

**Versión de 30 segundos** (unas 70 palabras): problema en una frase con un dato → frase de valor → "la IA propone, tú confirmas, pey confirma el pago" → URL.

## K09.9 · Versión en video y material para la votación

El jurado anuncia ganadores el lunes 9 en la mañana y después hay un voto comunitario (K01.6). El video puede ser tu pitch si no hay presentación en vivo, y es lo que se comparte para el voto.

**Video de entrega** (≤ 3 min o lo que pida el portal ⚪; Build Week pedía menos de 3 minutos, K08.2):
- Mismo guion de K09.1, sin tiempos muertos: corta las esperas y deja la URL visible todo el video.
- Primeros 3 segundos: nombre, frase de valor y "pago CoDi real en el minuto [X]".
- El pago real en primer plano: graba la pantalla de la laptop con tu voz y, si puedes, la pantalla del celular al autorizar el pago. Si no da tiempo, narra el pago y deja que se vea PAGADO.
- Texto en pantalla en cada paso (muchos lo verán sin audio).
- Di el modo: "pago real de un peso a la cuenta de prueba de pey".
- Una toma buena basta. El domingo en la mañana puedes regrabar en silencio (RUNBOOK).

**Video corto** (60–90 s, para compartir; K08.6): gancho en 3 segundos; QR → pago → PAGADO; termina con la URL y un QR. Que se entienda sin audio. Subtítulos con el prompt 12 de ChatGPT.

**Respaldos:** el video del pago de $0.01 de la noche anterior (CHECKLIST) y el del sábado. Guarda copias locales en la laptop y en el celular.

**Publicación:** enlace no listado o "cualquiera con el enlace" ⚪; ábrelo en una ventana de incógnito antes de ponerlo en el README y en el portal.

**Material para el voto comunitario** (prompt 12 de ChatGPT):
- URL de la demo (estable, sin registro y funcionando en celular), QR a la demo y una imagen de portada (captura de la app con la frase de valor).
- Un texto para WhatsApp y otro para LinkedIn o X.
- Respuestas cortas a "¿Esto ya existe?", "¿Es seguro?" y "¿Cuánto cuesta?".
- Comparte sin spam y sin ofrecer nada a cambio de votos (K08.6). El jurado sigue siendo lo principal.
- Mientras dure el voto: no fusiones cambios, revisa el saldo de OpenAI y deja `MAX_MONTO_MXN` bajo.
