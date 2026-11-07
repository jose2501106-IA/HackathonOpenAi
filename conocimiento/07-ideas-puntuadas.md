---
id: K07
titulo: "Ideas puntuadas y top 3 con PRD"
resumen: "Banco de ideas calificadas contra los criterios del evento, top 3 con PRD listo para Codex y la recomendación final."
responde:
  - "¿Qué construyo para ganar?"
  - "¿Cuál es la idea recomendada y por qué?"
  - "¿Cuál es la demo de 3 pasos y la arquitectura de cada idea finalista?"
  - "¿Cómo adapto la idea si el reto oficial cambia?"
actualizado: 2026-11-06
confianza: media
fuentes: [SA01, SA03, SA29, SA42, SA45, SA50, SA54, SB07, SB08, SB10, SB13, SB15, SB17, SB18, SB21, SB23, SB26, SB30, SB31, SB33, SB34, SB37, SB38, SB39, SB43, SC06, SC07, SC08, SC10, SC12, SC13, SC20, SC21, SC22, SC24, SC25, SC26, SC44, SC59, SD06, SD10, SD24, SD31, SD33, SD35, SD38, SD39, SD40, SD41, SD45, SD47, SD50, SD55, SD58, SD63]
---

# K07 · Ideas puntuadas y top 3 con PRD

## TL;DR

- **Construye "¿Ya cayó?":** una caja de cobro CoDi para puestos de barrio que arma el cobro con IA y nunca acepta una captura como pago: si te enseñan un "ya te transferí", OpenAI lee la imagen y el sistema la busca en los pagos reales de pey (94/100, la mejor del banco).
- **Demo en 3 pasos (≤ 80 s):** "Cóbrale un dulce de tamarindo" → QR de $1 · la clienta enseña una captura → "Todavía no cae: no entregues" · paga de verdad desde su banco → "¡Ya cayó!", confirmado por pey y en voz alta (K07.6).
- **Top 3 con PRD:** ¿Ya cayó? (94), Cóbrale, caja por voz (90), y Mesa Dividida, un QR por comensal (78). Los tres usan el kit del día tal cual (Prompts 1–5 de `PROMPTS-CODEX.md`) más una tarea nueva con archivos propios: la Tarea 1 sale genérica y la idea se decide con el PRD, como pide el RUNBOOK.
- **Por qué gana:** "voz o chat → QR" lo harán muchos; esta idea conserva ese cobro y le suma la verdad del pago, que ataca la desconfianza que frenó a CoDi [SA42]. El modelo lee y propone, el código decide, pey confirma y la persona aprueba [SA45].
- **Si el reto cambia:** comunidad o solicitudes de pago → La Libreta o Mesa Dividida; "dentro de ChatGPT" → servidor MCP; flujos empresariales → corte de caja con conciliación (K07.6).
- **Esta noche:** cobro real de $0.01–$1 con pey de punta a punta, una llamada de visión con una captura ficticia y Codex y Vercel listos; lo pagado a la cuenta de prueba de pey no se devuelve [SB07].

## K07.1 · Rúbrica de puntuación

Los criterios oficiales no están publicados [SA01]. Esta rúbrica traduce los criterios probables de K08.3 a seis preguntas para **elegir idea la víspera**. Es inferencia: si mañana publican criterios, recalcula en 5 minutos (K07.6).

| # | Criterio | Peso | Pregunta | Equivale en K08.3 |
|---|---|---|---|---|
| R1 | Alineación con el reto | 20 % | ¿El cobro CoDi con pey es el centro, la IA de OpenAI es necesaria, es bien público y deja trabajo de Codex visible? | C1 + C3 |
| R2 | Impacto real y usuario concreto | 20 % | ¿Hay una persona de K06.9 con un dolor medible y un dato con fuente? | C1 |
| R3 | Wow de la demo en vivo | 15 % | ¿En 80 s o menos pasa algo que el jurado siente sin que se lo expliquen? | C2 + C5 |
| R4 | Factibilidad: una persona, ~4.5 h, Codex web | 25 % | ¿Cabe en el kit del día (`PROMPTS-CODEX.md`) y todo lo ⚪ tiene respaldo? | C2 |
| R5 | Originalidad | 10 % | ¿Casi nadie más la hará? | C4 |
| R6 | Voto comunitario y continuidad | 10 % | ¿Se entiende en una frase, se comparte y puede seguir en el Hackatón México? | K08.6 + C5 |

Por qué estos pesos: K08.3 pone la ejecución en 25 % y pide no sacrificarla nunca; los ganadores de Build Week fueron herramientas acotadas que funcionan [SA45]. En San Francisco el jurado calificó uso de Codex, valor práctico, claridad del pitch y ejecución [SA50]: aquí viven en R1, R2, R3 y R4.

**Escala** (2 y 4 quedan entre las descripciones vecinas):

| Criterio | 1 | 3 | 5 |
|---|---|---|---|
| R1 | Sin cobro CoDi real, o IA decorativa | pey y OpenAI aparecen, pero uno es accesorio o el usuario no es comercio ni comunidad | Cobro con pey en el flujo principal (crear → pagar → confirmar), IA necesaria para ese flujo y caso de un ejemplo oficial [SA01] |
| R2 | Usuario vago | Usuario claro, dolor sin dato | Persona de K06.9, dolor medible con fuente, beneficio en pesos o minutos, pensada para no expertos |
| R3 | Hay que imaginarla | Se entiende, pero es "una pantalla más" | Pasa algo frente al jurado: hablas y sale el QR, una captura queda en evidencia o la pantalla cambia con un pago real |
| R4 | Depende de algo ⚪ sin alternativa o de terceros (aprobaciones, días hábiles) | Necesita una pieza ⚪ o infraestructura extra, con plan B | Cabe en los Prompts 1–5 más una tarea con archivos propios, y lo ⚪ tiene respaldo |
| R5 | Lo harán decenas | Combinación conocida bien hecha | Ángulo propio en una frase: fiado, tandas, antifraude, personas mayores (K08.5) |
| R6 | Difícil de explicar y sin siguiente paso | Se entiende con explicación | Una frase y una imagen bastan, y hay ruta al Hackatón México (14 nov–12 dic, CoDi y API de Pey) [SA03] |

**Fórmula:** total = (R1 × 20 + R2 × 20 + R3 × 15 + R4 × 25 + R5 × 10 + R6 × 10) ÷ 5. Va de 20 a 100.

**Vetos (no entra al top 3 aunque sume):**
- **Veto 1:** sin cobro CoDi con pey en el flujo principal; el reto lo pide [SA01].
- **Veto 2:** el modelo decide montos o cobra sin confirmación humana (K03.9) [SA45].
- **Veto 3:** necesita datos personales reales en el repo público o en la demo (K08.9).
- **Veto 4:** la IA es accesoria (R1 ≤ 2): un formulario haría lo mismo (K02.13, K08.5). Si la idea sirve, entra como capa de otra.

**Tope:** si el camino crítico depende de algo ⚪ sin plan B, R4 vale 2 como máximo. **Desempate:** gana la de mayor R4; si siguen iguales, la de mayor R2.

**Comprobación:** con los pesos de K08.3 (C1–C5) y las mismas notas, el top 3 queda en el mismo orden: ¿Ya cayó? 92, Cóbrale 85 y Mesa Dividida 77 (cálculo propio).

## K07.2 · Banco de ideas puntuadas

Quince ideas en formatos distintos (voz, chat, visión, ChatGPT, comunidad), ordenadas por puntuación. La columna de pey usa solo endpoints de K03.4; la de OpenAI, solo modelos y funciones de K04. Las personas son arquetipos de K06.9.

| # | Idea | En una línea | Usuario (K06.9) | Qué hace OpenAI (K04) | Qué hace pey / CoDi (K03) | Momento wow | Riesgo principal | Pts |
|---|---|---|---|---|---|---|---|---|
| 1 | **¿Ya cayó?** | Caja CoDi que arma el cobro con IA y nunca acepta una captura: la IA lee el "ya te transferí" y el servidor lo busca en los pagos reales | Tianguista de fruta | `gpt-6.1-sol`: function calling `crear_cobro` + visión con `input_image` (forma ⚪) y salida estructurada `text.format` | `POST /codi/qr` → `GET /transaction/codi/qr/{id}`; búsqueda con `GET /transaction/api-key`; webhook | Captura → "Todavía no cae"; pago real → "¡Ya cayó!" | Solo verifica pagos hechos con pey: una transferencia SPEI a la CLABE no aparece | **94** |
| 2 | **Cóbrale** | Dictas el pedido, sale el QR con el total y la caja avisa en voz alta cuando pey confirma | Tianguista de fruta | `crear_cobro` con catálogo + voz a texto con `gpt-transcribe` (ruta del endpoint ⚪) | `POST /codi/qr` → estado; webhook `codi.qr.payment_received` | Dices "cóbrale un dulce de tamarindo", pagas y escuchas "ya llegó tu dinero" | Ruido de la sala; idea común | **90** |
| 3 | **Mesa Dividida** | La fonda dicta cómo se reparte la cuenta y cada comensal paga su parte con su QR | Fonda familiar | function calling `crear_reparto`; el código pone precios y divide | N × `POST /codi/qr` con `metadata` por comensal + estado de cada QR | Tablero de 3 QR que se pone verde persona por persona | Que otros paguen en vivo; tope más alto | **78** |
| 4 | Paga Tranquilo | Modo grande y hablado: dice a quién y cuánto pagas y da un recibo sencillo para un familiar | Cliente adulto mayor (como los de la Casa de Día de la sede [SD50]) | `gpt-6.1-sol` para lenguaje sencillo; voz del navegador | `POST /codi/qr` con concepto claro + estado | "Vas a pagar 1 peso a Frutas (ejemplo)" en voz alta | Veto 4: IA accesoria; entra como capa de los finalistas | 78 |
| 5 | La Libreta | Apuntas el fiado hablando y lo cobras sin pena con una notificación CoDi al celular | Fonda familiar (clientes frecuentes) o prestadora ("luego te pago") | function calling `anotar_fiado` y `crear_cobro` + redacción del recordatorio | `POST /codi/pn` → `GET /transaction/{id}`; webhook `codi.pn.payment_received` [SB18]; QR de respaldo | "Mándale su cobro a Ana" → vibra su celular | La notificación exige el celular del cliente ligado a CoDi (⚪); sin dato de fiado | 75 |
| 6 | Cooperacha | Vaquita de la posada, la escuela o el mercado: un QR por persona y lista de quién ya cooperó | Fuera de K06 (organizadora vecinal) | Salida estructurada del plan + recordatorios | N × `POST /codi/qr` con `numRef` por persona + webhooks | La lista se llena sola mientras pagan | IA poco necesaria; sin dato | 74 |
| 7 | Pizarrón a Caja | Foto del pizarrón de precios → catálogo editable → cobros por pedido | Fonda familiar | Visión + salida estructurada (catálogo) | `POST /codi/qr` + estado | Menú escrito a mano → caja lista en segundos | Letra a mano ilegible; más pantallas | 73 |
| 8 | Te Mando el Cobro | La IA redacta y manda la solicitud de pago antes o al terminar un servicio | Prestadora a domicilio | Redacción + extracción de monto y fecha | `POST /codi/pn` o link de pago (`POST /payment-link/create`, campos ⚪) | El celular del cliente recibe el cobro | Notificación ⚪; campos del link no documentados en K03 | 71 |
| 9 | Remisión a Cobro | El proveedor fotografía su nota de remisión y la tiendita recibe un cobro con folio para conciliar | Fuera de K06 (proveedor; "flujos empresariales") | Visión + salida estructurada | `POST /codi/qr` con `metadata` (folio) + webhook para conciliar | Nota de papel → cobro con folio | Persona fuera de K06; poco voto | 70 |
| 10 | Mercado Conectado | Cada locatario registra su CLABE y cobra con su propio QR, directo a su cuenta | Tianguista o locatario (K06.8) | Asistente de alta y dudas | `POST /bank-account` → `bankAccountId` en `POST /codi/qr`; webhook `bank.account.updated` | Un mercado entero sin comisión | `ACTIVE` tarda hasta 5 días hábiles [SB13]; CLABEs reales | 67 |
| 11 | Pedido por Chat | Chat tipo WhatsApp de una cooperativa: "quiero 2 kilos para el sábado" → pedido + QR | Fuera de K06 (cooperativa) | function calling para armar el pedido | `POST /codi/qr` con `metadata` (pedido) | Un mensaje informal se vuelve pedido pagado | Dos lados (cliente y comercio): más pantallas | 66 |
| 12 | Alta Guiada | Asistente que explica la cuenta Nivel 2 Bis y cómo activar CoDi, y hace tu primer cobro de $1 | Tianguista sin experiencia digital | `gpt-6.1-sol` + caché de 12 h con la guía (K04.12) | `POST /codi/qr` de $1 + webhook | Tu primer cobro CoDi en 5 minutos | Chatbot genérico; datos bancarios que cambian | 64 |
| 13 | Corte de Caja | "¿Cuánto vendí hoy?" contestado con los pagos reales | Fonda familiar | function calling `resumen_de_ventas` (K03.9) | `GET /transaction/api-key` | Total del día y comisión ahorrada en pesos | Poco wow: mejor como segundo acto | 63 |
| 14 | Tanda Transparente | Turnos, recordatorios y cobros CoDi de una tanda | Fuera de K06 (grupo de comerciantes) | Calendario + recordatorios | `POST /codi/pn` o QR por ronda | La ronda se paga en vivo | pey no documenta pagos salientes para entregar la tanda | 61 |
| 15 | Cobra desde ChatGPT | Plugin MCP: "cóbrale 120 a Memo" dentro de ChatGPT, con el QR en un widget | Fuera de K06 (comerciante que ya usa ChatGPT) | Plugin con servidor MCP en `/mcp` (K04.11) [SC22] | `POST /codi/qr` y estado como herramientas MCP | Cobrar sin salir de ChatGPT | Plus y modo desarrollador ⚪ [SC25][SC59]; 1–3 h | 60 |

### Desglose de la puntuación

| # | Idea | R1 ×20 | R2 ×20 | R3 ×15 | R4 ×25 | R5 ×10 | R6 ×10 | Total | Dato que sostiene R2 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ¿Ya cayó? | 5 | 4 | 5 | 5 | 4 | 5 | **94** | 2.48 M reclamaciones por posible fraude en un semestre [SD38]; comprobantes falsos [SD41] |
| 2 | Cóbrale | 5 | 4 | 5 | 5 | 3 | 4 | **90** | ~85 % paga en efectivo [SD10]; débito hasta 3.95 % [SD24]; sin dato de preferencia por voz (⚪, K06.7) |
| 3 | Mesa Dividida | 4 | 4 | 4 | 4 | 3 | 4 | **78** | Restaurantes con crédito: 2.55–5.84 % (⚪ periodo) [SD63] |
| 4 | Paga Tranquilo | 2 | 5 | 3 | 5 | 4 | 4 | 78 · veto 4 | 57.8 % de 65–74 años usa internet [SD45]; 15–21 % de 60+ paga digital [SD47] |
| 5 | La Libreta | 4 | 3 | 4 | 3 | 5 | 5 | 75 | Sin dato verificado sobre fiado (⚪) |
| 6 | Cooperacha | 3 | 3 | 4 | 4 | 4 | 5 | 74 | Sin dato |
| 7 | Pizarrón a Caja | 4 | 4 | 4 | 3 | 4 | 3 | 73 | Igual que Mesa Dividida [SD63] |
| 8 | Te Mando el Cobro | 4 | 4 | 4 | 3 | 3 | 3 | 71 | Comprobante falso o reversa a domicilio [SD41] |
| 9 | Remisión a Cobro | 4 | 3 | 4 | 4 | 3 | 2 | 70 | Sin dato (persona fuera de K06) |
| 10 | Mercado Conectado | 4 | 4 | 3 | 2 | 4 | 4 | 67 | 339 mercados y ~300 mil personas en la CDMX [SD55] |
| 11 | Pedido por Chat | 4 | 3 | 3 | 3 | 3 | 4 | 66 | Sin dato |
| 12 | Alta Guiada | 3 | 4 | 2 | 4 | 2 | 3 | 64 | 21.8 M cuentas CoDi validadas, 2.5 M han pagado [SD33] |
| 13 | Corte de Caja | 3 | 3 | 2 | 5 | 2 | 2 | 63 | Sin dato |
| 14 | Tanda Transparente | 3 | 3 | 3 | 2 | 5 | 4 | 61 | Sin dato |
| 15 | Cobra desde ChatGPT | 4 | 2 | 4 | 2 | 4 | 3 | 60 | Sin dato |

### Lectura del banco

- **Top 3: ¿Ya cayó?, Cóbrale y Mesa Dividida.** Los tres ponen el cobro CoDi en el centro, usan una persona de K06.9 con dato y caben en el kit del día.
- **¿Por qué ¿Ya cayó? arriba de Cóbrale si la caja por voz es lo obvio?** Comparten el núcleo; ¿Ya cayó? suma originalidad y voto (todo México conoce la captura falsa) y su paso estrella no depende de un micrófono en una sala ruidosa: la captura se sube como archivo. Cóbrale queda a 4 puntos y también puede ganar.
- **Paga Tranquilo** suma 78, pero cae en el veto 4: su letra grande y su aviso hablado entran a los tres finalistas como capa de accesibilidad.
- **La Libreta** es la más original junto con la Tanda (R5 = 5). No hay dato verificado de fiado en la base y su notificación depende de algo ⚪; con un dato con fuente sube a 79. Es la adaptación natural si el reto oficial pide "solicitudes de pago" o comercio comunitario (K07.6).
- **Corte de Caja** (R4 = 5) es el segundo acto más barato para cualquier finalista.

### Núcleo común de los tres finalistas

Es el kit del día sin cambios: Prompts 1, 2 y 5 de `PROMPTS-CODEX.md`, más los ajustes de cada finalista a los Prompts 2–5 y una tarea nueva.

1. **Cobro:** `POST /api/cobros` valida el monto (> 0 y ≤ `MAX_MONTO_MXN`) y llama a pey `POST /codi/qr` con el monto en pesos, `generateImage: true`, `expiration: 600`, `numRef` y `metadata`; si `qrImage` llega `null`, el servidor dibuja `qrString` [SB10][SB23].
2. **Estado:** la pantalla pregunta cada 2 s a `GET /api/estado?id=…`, que consulta `GET /transaction/codi/qr/{id}`: un item `PAID` → pagado; 404 → pendiente con aviso (QR de otra llave) [SB10][SB15]. Sin base de datos: la verdad del pago es pey (K03.7).
3. **Webhook:** `POST /api/webhook-pey` verifica la firma Standard Webhooks y registra `codi.qr.payment_received`; es bitácora y respaldo [SB17][SB39]. Va en el dominio de producción, no en un preview [SB43]; es uno por llave [SB08].
4. **Modos:** `MODO_PAGO` (`simulacion`, `prueba` o `comercio`) siempre visible en pantalla. Preview en SIMULACIÓN; Production en `prueba` con `MAX_MONTO_MXN=20` y cobros de $1, porque lo pagado a la cuenta de prueba no se devuelve [SB07] (AGENTS.md, K03.3).
5. **Sin variables nuevas:** los tres finalistas usan solo las de `.env.example`.

**Cómo no chocar con la Tarea 1 genérica:** la capa de cada idea va en una **Tarea 9** (plantilla R6) que solo crea archivos nuevos. La interfaz (Tarea 4) la carga con `import()` dinámico dentro de try/catch: mientras la Tarea 9 no se fusiona, su botón no aparece y nada se rompe. Así se puede elegir la idea con el PRD (11:00), como pide el RUNBOOK.

## K07.3 · Finalista 1: ¿Ya cayó?, la captura no es dinero (94)

### Problema
- **Persona (K06.9): tianguista de fruta.** Cobra montos chicos con una fila de cuatro clientes; uno pregunta "¿le transfiero?" y enseña su pantalla. Con la fila encima no revisa su banco, y una captura de "ya te transferí" puede ser falsa o revertirse [SD41].
- **Datos:** de enero a junio de 2025 hubo 2.48 millones de reclamaciones por posible fraude y el fraude digital superó 60 % de las quejas [SD38]; en la CDMX, 31.6 % de las 40,688 quejas de 2025 se ligaron a fraude [SD40]. La forma segura de verificar es el CEP de Banxico con la clave de rastreo o el saldo real, no la imagen [SD41]. Las personas de 60 años o más suman 32 % de las quejas por posible fraude (⚪ año del dato) [SD39]. La desconfianza es una de las causas que se citaban del poco uso de CoDi [SA42].
- **Por qué ahora:** a más tardar el 14 de diciembre de 2026 todas las apps bancarias deberán dar comprobante con clave de rastreo y liga al CEP (K06.5) [SD06]: las capturas serán todavía más comunes.

### Frase de valor
"La captura no es dinero: cobra con QR CoDi y deja que pey, no una foto, te diga si ya cayó."

### Demo exacta en 3 pasos (≤ 80 s)

| Paso | Qué dice José | Qué se ve en la pantalla (proyectada) | Qué pasa en el celular de la clienta |
|---|---|---|---|
| 1 · Cobrar | Toca el ejemplo o dice: "Cóbrale un dulce de tamarindo." | Propuesta de la IA: 1 × Dulce de tamarindo · **$1.00** → **Confirmar y generar QR** → QR CoDi grande, "Esperando pago…" y banner MODO PRUEBA. | Nada todavía. |
| 2 · La captura | "La clienta dice que ya me pagó y me enseña esto." Toca **Revisar una captura** y sube la imagen de ejemplo. | "Leí: $1.00 · 13:58 · clave de rastreo EJEMPLO123" → **"Todavía no cae. Pey no tiene ningún pago para este cobro: no entregues."** | La "clienta" solo enseña su captura; su banco no registra nada. |
| 3 · ¡Ya cayó! | "Ahora sí, págame con CoDi." | En segundos (consulta cada 2 s): **"¡Ya cayó! $1.00 · confirmado por pey"**, vibración y voz: "Ya cayó tu dinero: un peso". | Abre su app → CoDi (en BBVA, "Pagar con CoDi") → escanea → ve monto y concepto → autoriza; su banco confirma [SB31][SB33]. |

La captura de ejemplo es una imagen propia y ficticia ("Transferencia enviada", $1.00, 13:58, "Clave de rastreo EJEMPLO123", "Banco Ejemplo"), sin logos ni diseño de un banco real. Opcional (+15 s): subir la captura real del banco y ver "Coincide con el pago de $1.00 de las 14:05".

### Alcance del MVP
- **Sí:** pedido por texto o ejemplo → `crear_cobro` con catálogo de ejemplo → confirmación → QR CoDi con pey → estado cada 2 s → "¡Ya cayó!" con voz y vibración; botón "¿Ya cayó?" que consulta pey al instante; "Revisar una captura": foto o archivo → lectura con IA → veredicto con código → texto claro y clave de rastreo para el CEP; "Capturar a mano"; MODO PRUEBA y SIMULACIÓN visibles; tope `MAX_MONTO_MXN=20`.
- **Debería (solo si a las 13:00 ya hubo un cobro real):** voz para dictar (Tarea 9 de K07.4); "¿Cuánto vendí hoy?" con `resumen_de_ventas` (K03.9).
- **No:** verificar transferencias SPEI que no pasaron por pey (no hay API del CEP en la base, ⚪); guardar imágenes; decir "es falso"; devoluciones (pey no tiene endpoint [SB10]); cuentas de usuario; base de datos; varios comercios.

### Arquitectura

```
app/
├── index.html · css/estilos.css · js/app.js · js/textos.js            T4  pedido → confirmar → QR (+ "Revisar una captura") → pagado
├── js/revisar.js                                                      T6  foto → /api/revisar → veredicto (carga dinámica)
├── js/estado-pago.js · css/estado-pago.css                            T5  consulta cada 2 s → "¡Ya cayó!" + voz
├── js/contrato.js · js/api.js · js/vistas.js                          T1  congelados
├── api/agente.js · api/_lib/agente.js · api/_lib/catalogo.js          T3  crear_cobro + catálogo de ejemplo
├── api/revisar.js · api/_lib/extractor.js · api/_lib/coincidencias.js T6  lectura con IA + veredicto con código
├── api/cobros.js · api/estado.js · api/webhook-pey.js · api/_lib/pey.js  T2  pey (+ listarPagosRecientes)
├── api/salud.js · api/_lib/config.js · api/_lib/http.js               T1  congelados
└── tests/  base · pey · agente · estado-pago · revisar                 cada tarea la suya
```

| Ruta | Qué hace | OpenAI o pey | Tarea |
|---|---|---|---|
| `POST /api/agente` | Texto → `{respuesta, propuesta}` | Responses API, `gpt-6.1-sol`, `reasoning.effort: "low"`, `crear_cobro` con `strict: true` [SC08][SC13] | T3 |
| `POST /api/cobros` | Propuesta confirmada → cobro con QR | `POST /codi/qr` [SB10] | T2 |
| `GET /api/estado?id=` | ¿Ya cayó? | `GET /transaction/codi/qr/{id}` [SB15] | T2 |
| `POST /api/webhook-pey` | Registro firmado | `codi.qr.payment_received` [SB17][SB39] | T2 |
| `POST /api/revisar` | `{imagenBase64, mime, cobroId}` → `{leido, veredicto, pago}` | Lectura: Responses API con `input_image` (forma de K04.2, ⚪) y `text.format` estricto [SC06][SC12]; búsqueda: `GET /transaction/api-key`, 80 por página [SB10] | T6 |

**Lectura de la captura** (salida estructurada; lo que no se ve va `null`) [SC12]:

```json
{
  "type": "json_schema", "name": "captura", "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "es_comprobante": { "type": "boolean" },
      "monto": { "type": ["number", "null"] },
      "fecha": { "type": ["string", "null"], "description": "YYYY-MM-DD" },
      "hora": { "type": ["string", "null"], "description": "HH:MM, 24 h" },
      "clave_rastreo": { "type": ["string", "null"] },
      "legible": { "type": "boolean" }
    },
    "required": ["es_comprobante", "monto", "fecha", "hora", "clave_rastreo", "legible"],
    "additionalProperties": false
  }
}
```

**Veredicto (código, no modelo):**
1. **Con un cobro activo:** manda el estado de ese QR en pey. `PAID` → "¡Ya cayó!"; si no → "Todavía no cae", diga lo que diga la captura. Si el monto leído no coincide con el cobro, se muestra ("La captura dice $350; tu cobro es de $1").
2. **Sin cobro activo:** busca pagos `PAID` de las últimas 2 horas (máximo 3 páginas). Mismo monto (±$0.01) y hora a ±15 min → "Coincide"; mismo monto a otra hora → "Revísalo"; nada → "No encuentro este pago en tus cobros de pey; si te transfirieron a tu cuenta, revisa tu banco o el CEP con la clave de rastreo" [SD41]. Si la clave leída es igual a `metadata.trackingKey`, se dice (⚪ que ese campo sea la clave SPEI [SB21]).
3. **Ilegible:** "No pude leer la captura: escribe el monto o usa «¿Ya cayó?»".
4. Nunca se dice "falso" ni se acusa; hora de CDMX = UTC−6 todo el año (K03.9).

**Variables:** solo las del núcleo, con `MAX_MONTO_MXN=20`. **Costo:** un cobro con `gpt-6.1-sol` (≈ 1,500 tokens de entrada y 150 de salida) ronda US$0.005 más razonamiento ⚪ (cálculo propio con [SC07]); el costo de una revisión depende de los tokens de imagen, que K04 no da (⚪).

### Riesgos y plan B

| Riesgo | Señal | Plan B |
|---|---|---|
| pey no habilita la llave o el pago real falla | `PEY_NO_AUTORIZADO`, 503 o el QR no se paga | Video del cobro real de anoche; `MODO_PAGO=simulacion` con banner "SIMULACIÓN" (R5 de `PROMPTS-CODEX.md`), dicho en voz alta (K03.6) |
| La lectura falla (reflejo, foto borrosa, forma de `input_image` ⚪) | Campos vacíos o mal leídos | Subir archivo en vez de foto; monto editable; el veredicto con cobro activo no depende de la lectura |
| Tarea 9 no llega a las 13:00 | El botón "Revisar una captura" no aparece | El paso 2 se hace con el botón "¿Ya cayó?" (consulta pey, K06.6) y la captura queda como siguiente paso en el pitch |
| Le pagaron por SPEI normal, no con el QR | No aparece en pey | Texto honesto con la clave de rastreo para el CEP [SD41]; en el pitch, "por eso cobramos con QR CoDi" |
| La búsqueda tarda | Más de 5 s | Ventana de 2 h y máximo 3 páginas de 80 [SB10] |
| Datos personales en capturas | Nombres o cuentas visibles | No se guarda nada; la captura de la demo es ficticia |
| OpenAI sin saldo o caído | 503 `IA_SIN_SALDO` | "Capturar a mano" (Tarea 1) y monto escrito para la revisión |
| Se acaba el límite de Codex (Plus comparte una bolsa de 5 h y las tareas cloud gastan más [SC44]) | Tablero de uso bajo | Lanza primero 2, 3 y 9; la 4 y la 5 después; el pulido es lo primero que cae |

### Plan de tareas para Codex

| K07 | Se lanza como | Cuándo (RUNBOOK) | Toca SOLO | Qué agrega en ¿Ya cayó? |
|---|---|---|---|---|
| T1 | Prompt 1 tal cual ("Idea: ¿Ya cayó?…") | 10:35, sola | Esqueleto de `app/` | Nada específico |
| T2 | Prompt 2 + ajuste | 11:10, en paralelo | `app/api/_lib/pey.js`, `app/api/cobros.js`, `app/api/estado.js`, `app/api/webhook-pey.js`, `app/tests/pey.test.js` | `listarPagosRecientes()` |
| T3 | Prompt 3 + ajuste | 11:10 | `app/api/agente.js`, `app/api/_lib/agente.js`, `app/api/_lib/catalogo.js`, `app/tests/agente.test.js` | Catálogo de ejemplo; precios puestos por el servidor |
| T4 | Prompt 4 + ajuste | 11:10 | `app/index.html`, `app/css/estilos.css`, `app/js/app.js`, `app/js/textos.js` | Botón "Revisar una captura" con carga dinámica |
| T5 | Prompt 5 + ajuste | 11:10 | `app/js/estado-pago.js`, `app/css/estado-pago.css`, `app/tests/estado-pago.test.js` | "¡Ya cayó!", botón "¿Ya cayó?" y voz |
| T6 | **Tarea 9** (abajo) | 11:10 | `app/js/revisar.js`, `app/api/revisar.js`, `app/api/_lib/extractor.js`, `app/api/_lib/coincidencias.js`, `app/tests/revisar.test.js` | Captura → lectura → veredicto |
| Cierre | Prompts 6 y 7 | 13:00 | Ver `PROMPTS-CODEX.md` | README con "qué es real", pulido |

```text
AJUSTES DE ¿YA CAYÓ? (pega cada bloque al final del prompt indicado; prevalecen sobre lo anterior)

Prompt 2: además exporta listarPagosRecientes({desdeEpoch}) en app/api/_lib/pey.js con GET /transaction/api-key
(80 por página con nextToken, máximo 3 páginas, K03.4). Regresa solo PAID desde desdeEpoch como
[{id, monto, fechaPago, claveRastreo}] (claveRastreo = metadata.trackingKey o null; ⚪ que sea la clave SPEI).
En simulación, 2 pagos de ejemplo marcados "SIMULACIÓN". Pruebas con fetch simulado, incluida la paginación.

Prompt 3: en cada elemento de detalle agrega producto_id (string o null). Si existe en app/api/_lib/catalogo.js,
el servidor pone el precio del catálogo y recalcula el monto: el modelo nunca pone precios del catálogo.
"Un cuarto" = 0.25 kg; "medio" = 0.5 kg. Si el comerciante dice el monto ("cóbrale 85 de dos tacos"), detalle puede
ir vacío. Prueba extra: "cóbrale un dulce de tamarindo" → monto 1.

Prompt 4: en #vista-pedido y #vista-qr agrega el botón #btn-revisar "Revisar una captura". Al tocarlo, carga
./revisar.js con import() dinámico dentro de try/catch y llama abrirRevision({cobroActivo}). Si el módulo todavía
no existe (lo crea otra tarea en paralelo), oculta el botón y sigue. Marca y títulos: "¿Ya cayó?".

Prompt 5: la vista PAGADO dice "¡Ya cayó!" y anuncia "Ya cayó tu dinero: N pesos" con speechSynthesis
(lang "es-MX"; si el equipo no tiene voz en español, solo texto y vibración, ⚪). Crea dentro de #vista-qr un botón
"¿Ya cayó?" que consulta /api/estado de inmediato y anuncia "Todavía no cae" o "¡Ya cayó!".
```

```text
TAREA 9 · Revisar una captura: foto → lectura con IA → veredicto con pey
CONTEXTO: ¿Ya cayó? (K07.3). Es el paso 2 de la demo: una captura de "ya te transferí" no es dinero.
Si esta tarea falla, la demo sigue con el botón "¿Ya cayó?": no rompas nada fuera de tus archivos.
LEE: AGENTS.md; docs/PRD.md; K03.4 (estados y objeto transacción); K04.2 y K04.5 (input_image y salida
estructurada); K07.3 (esquema de lectura, reglas del veredicto y textos). No cambies app/js/contrato.js,
app/js/api.js ni app/api/_lib/config.js.
ALCANCE (solo archivos nuevos): app/js/revisar.js · app/api/revisar.js · app/api/_lib/extractor.js ·
app/api/_lib/coincidencias.js · app/tests/revisar.test.js
QUÉ HACER:
1. revisar.js exporta abrirRevision({cobroActivo}): crea su propia sección accesible (label, foco, aria-live)
   con <input type="file" accept="image/*" capture="environment">; reduce la imagen a 1280 px como JPEG 0.8 con
   canvas; la envía con fetch a POST /api/revisar {imagenBase64, mime, cobroId}; muestra lo leído (monto editable)
   y el veredicto con los textos de K07.3.
2. extractor.js: extraerCaptura({imagenBase64, mime}) con la Responses API, model = OPENAI_MODEL, reasoning
   "low", input_text + input_image (data URL), text.format con el esquema de K07.3. Negativa o "incomplete" →
   {legible: false}. Instrucción: "Lee la captura. Si un dato no se ve, null. No juzgues si es real."
3. coincidencias.js: reglas del veredicto de K07.3, sin IA. Con cobroId manda el estado del QR
   (consultarEstado); sin cobroId usa listarPagosRecientes. Importa app/api/_lib/pey.js con `import * as`:
   si listarPagosRecientes aún no existe (la Tarea 2 corre en paralelo), usa pagos de SIMULACIÓN etiquetados.
4. api/revisar.js: valida tipo y tamaño (413 si pasa de 1.5 MB), une extractor y coincidencias, responde
   {leido, veredicto, pago}. Sin OPENAI_API_KEY → 503 con "Escribe el monto a mano".
5. No guardes la imagen ni lo leído; logs solo con códigos y tiempos. Nunca digas "falso".
CRITERIOS DE ACEPTACIÓN:
1) `npm test --prefix app` pasa con fetch simulado: cobro activo PENDING → todavia_no_cae aunque la captura
   diga lo mismo; PAID → ya_cayo; sin cobro: mismo monto y hora cercana → coincide; hora lejana → dudoso;
   nada → no_encontrado; ilegible; centavos; zona horaria.
2) En SIMULACIÓN, la captura de ejemplo con un cobro activo da "Todavía no cae".
3) A 360 px el veredicto se lee sin desplazarse.
CÓMO PROBARLO: npm test --prefix app; en el preview, crear un cobro y subir la captura de ejemplo.
ENTREGA: PR "Tarea 9: revisar una captura" con el formato de AGENTS.md.
```

```text
MARCADORES PARA PROMPTS-CODEX
[IDEA ELEGIDA] ¿Ya cayó?: caja de cobro CoDi (pey) para puestos de barrio que arma el cobro con IA y nunca acepta una captura como pago: la IA la lee y el sistema la busca en los pagos reales.
[FRASE DE VALOR] La captura no es dinero: cobra con QR CoDi y deja que pey, no una foto, te diga si ya cayó.
[PERSONA] Tianguista de fruta: cobra montos chicos con fila de clientes; le enseñan capturas de "ya te transferí" y no tiene tiempo de revisar su banco.
[DEMO PASO 1] Tocar o decir "cóbrale un dulce de tamarindo" → propuesta de $1 → Confirmar → QR CoDi.
[DEMO PASO 2] "Revisar una captura" con la captura de ejemplo → la IA lee monto, hora y clave → "Todavía no cae: no entregues".
[DEMO PASO 3] La clienta paga el QR desde su banco → "¡Ya cayó!" confirmado por pey, en voz alta.
[FRASE DE DEMO] cóbrale un dulce de tamarindo
[MONTO DEMO] 1
[HERRAMIENTAS EXTRA] ninguna (la lectura de capturas es la Tarea 9, fuera del agente)
[CATÁLOGO DE EJEMPLO] dulce de tamarindo $1 · mango $15 · plátano $25/kg · fresa $60/kg (precios de ejemplo)
[ESTILO] alto contraste para sol de tianguis; verde solo para "¡Ya cayó!", ámbar para "Todavía no cae"; números enormes
```

### Guion de 30 segundos

> "En el tianguis alguien enseña su celular: 'ya te transferí'. Con la fila encima nadie revisa su banco, y a veces ese dinero nunca llega. ¿Ya cayó? cambia la regla. Digo 'cóbrale un dulce de tamarindo' y sale el QR CoDi de pey, sin comisión. Si me enseñan una captura, OpenAI la lee y el sistema la busca en los pagos reales: no está, no entrego. Cuando pagan de verdad, pey lo confirma en segundos: ya cayó."
>
> Cierre opcional (+5 s): "Lo construí hoy, solo, con [N] tareas de Codex."

### Por qué gana
- **R1 · 5:** es cobro para comercios de barrio, el primer ejemplo oficial [SA01], con QR de pey y confirmación real; OpenAI es necesaria dos veces (entender el pedido y leer la captura) y Codex queda visible en seis tareas y sus PRs.
- **R2 · 4:** el momento de pago de la tianguista de K06.9 es justo "alguien enseña su pantalla"; fraude medido por Condusef [SD38]. Límite honesto: solo verifica pagos hechos con pey.
- **R3 · 5:** el jurado ve una captura quedar en evidencia y luego un pago real que cae en segundos.
- **R4 · 5:** usa el kit tal cual más una tarea; si la lectura falla, el veredicto con cobro activo sigue, porque lo decide el estado de pey.
- **R5 · 4:** "la captura no es dinero" es un ángulo propio; K06.11 ya lo listaba, así que alguien más podría intentarlo.
- **R6 · 5:** "¿ya cayó?" se entiende sin explicar; sigue en el Hackatón México con CEP, clave de rastreo y varios comercios [SA03] (⚪ si allá se permite continuar un proyecto, K01.10).
- **A "¿qué hace la IA que un formulario no?":** lee cualquier captura en segundos y entiende cómo habla el comerciante; el código decide y la persona confirma (patrón de Build Week [SA45]).

## K07.4 · Finalista 2: Cóbrale, caja por voz con cobro CoDi (90)

### Problema
- **Persona (K06.9): tianguista de fruta** con las manos ocupadas y fila de clientes; cobra montos chicos y no quiere teclear ni hacer cuentas.
- **Datos:** ~85 % de los adultos paga sobre todo en efectivo las compras de hasta $500 y solo 4.4 % usa transferencias o apps [SD10]; a una miscelánea, cobrar con débito le cuesta de 1.15 % a 3.95 % por venta [SD24]; CoDi no cobra comisión y el dinero llega en segundos [SD31], pero de 21.8 millones de cuentas validadas solo 2.5 millones han pagado alguna vez [SD33]. En la prueba de 2019, las apps no avisaban del pago [SD35].

### Frase de valor
"Dices lo que te compraron, tu cliente escanea y en segundos escuchas que ya llegó tu dinero: sin comisión y sin teclear."

### Demo exacta en 3 pasos (≤ 60 s)

| Paso | Qué dice José | Qué se ve en la pantalla | Qué pasa en el celular del cliente |
|---|---|---|---|
| 1 · Dictar | Mantiene el botón del micrófono: "Cóbrale un dulce de tamarindo." | "Entendí: cóbrale un dulce de tamarindo" → 1 × Dulce de tamarindo · **$1.00** → **Confirmar y generar QR**. | Nada todavía. |
| 2 · Cobrar | "Mi cliente paga con la app de cualquier banco." | QR CoDi grande, "$1.00 · Dulce de tamarindo", "Esperando pago…". | Escanea con su app, ve monto y concepto y autoriza [SB31]. |
| 3 · Avisar | "No tengo que ver la pantalla: me avisa." | **PAGADO $1.00 · confirmado por pey**, vibración y voz: "Ya llegó tu dinero: un peso". | Su banco confirma el pago [SB31]. |

Respaldo del paso 1: chip "Ejemplo: cóbrale un dulce de tamarindo" o campo de texto. Para lucir el catálogo sin pagar, muestra solo la propuesta de "un mango y un dulce" ($16).

### Alcance del MVP
- **Sí:** mantener presionado para hablar (o escribir) → `crear_cobro` con precios del catálogo → confirmación → QR → estado → PAGADO con voz y vibración; "Capturar a mano"; MODO PRUEBA y SIMULACIÓN; `MAX_MONTO_MXN=20`; letra grande (capa de Paga Tranquilo).
- **Debería:** "Revisar una captura" (Tarea 9 de K07.3) como segundo acto; "¿Cuánto vendí hoy?" (K03.9).
- **No:** voz full-duplex (GPT-Live-1, español ⚪, K04.8), cuentas, base de datos, devoluciones, WhatsApp real.

### Arquitectura
Núcleo común (K07.2) más:

| Archivo en `app/` | Qué hace | OpenAI | Tarea |
|---|---|---|---|
| `js/voz.js` | Mantener presionado → `MediaRecorder` → `POST /api/transcribir` → texto al agente | — | T6 |
| `api/transcribir.js` | Audio de hasta 15 s → `{texto}` | `gpt-transcribe` a US$0.0045/min [SC07]; ruta y campos del endpoint ⚪ (no están en K04) | T6 |
| `api/agente.js` + `api/_lib/agente.js` + `api/_lib/catalogo.js` | Texto → propuesta con precios del catálogo | Responses API, `gpt-6.1-sol`, `crear_cobro` estricto [SC13] | T3 |
| `js/estado-pago.js` | PAGADO + "Ya llegó tu dinero" con `speechSynthesis` del navegador (no es OpenAI; voces es-MX por equipo ⚪) | — | T5 |

Alternativa de voz solo si anoche la probaste en español: Realtime `gpt-realtime-2.1` con llave efímera y WebRTC (K04.7, K04.16) [SC10]; el español de ese modelo no está verificado (⚪).

### Riesgos y plan B

| Riesgo | Señal | Plan B |
|---|---|---|
| La voz no entiende (ruido, permiso, idioma) | Transcripción vacía o errónea | "Entendí: …" siempre visible; chip de ejemplo y campo de texto |
| La ruta de transcripción no se confirma | Tarea 9 con `TODO(⚪)` | José la prueba anoche y la pega en el prompt; si no, voz fuera y chips |
| El aviso hablado no suena | No hay voz en español | Pantalla verde y vibración |
| pey o OpenAI fallan | Igual que K07.3 | Igual que K07.3 |
| Parecerse a otros proyectos | Varias "cajas por voz" en el evento | Pago real en vivo, aviso hablado y "Revisar una captura" como segundo acto |

### Plan de tareas para Codex

| K07 | Se lanza como | Toca SOLO | Qué agrega en Cóbrale |
|---|---|---|---|
| T1 | Prompt 1 tal cual | Esqueleto | Nada específico |
| T2 | Prompt 2 | Archivos de pey (núcleo) | Nada específico |
| T3 | Prompt 3 + ajuste de K07.3 (catálogo y `producto_id`) | Archivos del agente | Precios del catálogo puestos por el servidor |
| T4 | Prompt 4 + ajuste | `app/index.html`, `app/css/estilos.css`, `app/js/app.js`, `app/js/textos.js` | `#btn-voz` (≥ 72 px) y `#transcripcion`, ocultos hasta cargar `./voz.js` con `import()` dinámico; `onTexto` llena `#entrada-pedido` y envía |
| T5 | Prompt 5 + ajuste | Archivos de `estado-pago` | Voz "Ya llegó tu dinero: N pesos" con `speechSynthesis` (`es-MX`) y botón "Repetir aviso" creado dentro de `#vista-pagado` |
| T6 | **Tarea 9** (abajo) | `app/js/voz.js`, `app/api/transcribir.js`, `app/tests/voz.test.js` | Voz a texto |

```text
TAREA 9 · Voz: mantener presionado para hablar → texto para el agente
CONTEXTO: Cóbrale (K07.4). El paso 1 de la demo se dice en voz alta ("cóbrale un dulce de tamarindo").
Si esta tarea falla, la demo sigue con texto: no rompas nada fuera de tus archivos.
LEE: AGENTS.md; docs/PRD.md; K04.3 (modelos de transcripción). No cambies archivos congelados.
ALCANCE (solo archivos nuevos): app/js/voz.js · app/api/transcribir.js · app/tests/voz.test.js
QUÉ HACER:
1. voz.js exporta crearGrabadora({onTexto, onEstado, onError}) → {iniciar, detener, disponible}. Graba con
   MediaRecorder mientras #btn-voz está presionado (pointerdown/pointerup; con teclado, Espacio), máximo 15 s.
   Sin micrófono o sin MediaRecorder: disponible = false.
2. Al soltar, manda el audio crudo con fetch a POST /api/transcribir; avisa "Escuchando…" y "Transcribiendo…"
   con onEstado y entrega el texto con onTexto.
3. transcribir.js: valida tipo y tamaño (≤ 1 MB) y llama a la transcripción de OpenAI con el modelo
   "gpt-transcribe" (K04.3). La ruta y los campos del endpoint NO están en K04: usa los que José confirmó
   ([RUTA CONFIRMADA]) o la documentación oficial si tienes internet; si no, TODO(⚪) visible y dilo en el PR.
   Sin llave → 503 IA_NO_DISPONIBLE; más de 15 s → 504 IA_TIEMPO_AGOTADO.
4. Con ?voz=simulada en la URL, la grabadora entrega "cóbrale un dulce de tamarindo" sin red (ensayo sin micrófono).
5. Nunca guardes ni registres el audio ni el texto.
CRITERIOS DE ACEPTACIÓN: 1) `npm test --prefix app` pasa con fetch simulado (éxito, sin llave, audio grande,
tiempo agotado). 2) En el preview, desde un celular: mantener, decir la frase y soltar → el texto aparece.
3) Sin micrófono, el botón no aparece y el campo de texto sigue funcionando.
ENTREGA: PR "Tarea 9: voz (mantener para hablar)" con el formato de AGENTS.md.
```

```text
MARCADORES PARA PROMPTS-CODEX
[IDEA ELEGIDA] Cóbrale: caja por voz para puestos de tianguis que cobra con QR CoDi (pey) y avisa en voz alta cuando el pago ya está confirmado.
[FRASE DE VALOR] Dices lo que te compraron, tu cliente escanea y en segundos escuchas que ya llegó tu dinero: sin comisión y sin teclear.
[PERSONA] Tianguista de fruta: cobra montos chicos con las manos ocupadas y fila de clientes.
[DEMO PASO 1] Decir "cóbrale un dulce de tamarindo" → "Entendí: …" → propuesta de $1 → Confirmar.
[DEMO PASO 2] QR CoDi grande → el cliente escanea con la app de su banco y autoriza.
[DEMO PASO 3] PAGADO "confirmado por pey", vibración y voz "Ya llegó tu dinero: un peso".
[FRASE DE DEMO] cóbrale un dulce de tamarindo
[MONTO DEMO] 1
[HERRAMIENTAS EXTRA] ninguna (la voz es la Tarea 9)
[CATÁLOGO DE EJEMPLO] dulce de tamarindo $1 · mango $15 · plátano $25/kg · fresa $60/kg (precios de ejemplo)
[ESTILO] alto contraste para sol de tianguis; botón de micrófono enorme; verde solo para PAGADO
```

### Guion de 30 segundos

> "En el tianguis casi todo se paga en efectivo, y a una miscelánea la terminal le cobra hasta 3.95 % por venta. CoDi cobra 0 %, pero casi nadie lo usa. Con Cóbrale, con las manos ocupadas, digo 'cóbrale un dulce de tamarindo', mi cliente escanea y en segundos escucho 'ya llegó tu dinero'. OpenAI entiende el pedido, el código pone los precios y pey confirma el pago, no una captura."

### Por qué gana
- **R1 · 5:** primer ejemplo oficial [SA01]; pey en el centro; la voz hace necesaria a la IA.
- **R2 · 4:** dolor en pesos (hasta 3.95 % contra 0 %) [SD24][SD31]; falta un dato de preferencia por voz (⚪, K06.7).
- **R3 · 5:** hablas, pagas y la caja te avisa; resuelve lo que falló en 2019: nadie avisaba del pago [SD35].
- **R4 · 5:** kit tal cual más una tarea; la voz tiene respaldo de texto.
- **R5 · 3:** la idea es común; se diferencia por pago real y aviso hablado.
- **R6 · 4:** "le dices y cobra" se entiende en una frase; sigue en el Hackatón México [SA03].

## K07.5 · Finalista 3: Mesa Dividida, cada quien paga lo suyo (78)

### Problema
- **Persona (K06.9): fonda familiar** con clientes de oficina: "al terminar la comida, varios pagan por separado al mismo tiempo"; clientes sin efectivo y cuentas divididas.
- **Datos:** con crédito, un restaurante paga de 2.55 % a 5.84 % por cobro (⚪ periodo del dato) [SD63]; CoDi no cobra comisión y el dinero llega en segundos [SD31]; ~85 % paga en efectivo las compras de hasta $500 [SD10].

### Frase de valor
"Cada quien paga lo suyo con su propio QR CoDi: sin comisión, sin cuentas en la servilleta y con la mesa en verde cuando todos pagaron."

### Demo exacta en 3 pasos (≤ 80 s)

| Paso | Qué dice José | Qué se ve en la pantalla | Qué pasa en el celular del comensal |
|---|---|---|---|
| 1 · Repartir | "Mesa 3: dos comidas corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce." | Reparto hecho por el servidor: Ana $110.00 · Beto $110.00 · Carlos $1.00 · **Total $221.00** → **Confirmar y generar QR**. | — |
| 2 · Tres QR | "Cada quien escanea el suyo." | Tablero con tres tarjetas (nombre, monto, estado); al tocar la de Carlos, su QR se ve grande. | José, como Carlos, escanea y autoriza $1 [SB31]. |
| 3 · La mesa en verde | "Carlos pagó con CoDi y Ana en efectivo." | Carlos en verde "confirmado por pey"; José toca "Pagó en efectivo" en Ana (gris, "registrado por ti"); arriba: "Pagado $111.00 de $221.00 · falta Beto". | Su banco confirma el pago. |

**Tope:** las partes de $110 no caben en `MAX_MONTO_MXN=20`. Esta idea pide `MAX_MONTO_MXN=150` en Production; paga solo la tarjeta de $1, porque lo pagado a la cuenta de prueba no se devuelve [SB07].

### Alcance del MVP
- **Sí:** dictar o escribir el reparto → `crear_reparto` → partes calculadas por el servidor → confirmar → un cobro por comensal (máximo 6) → tablero con estado por persona → "Pagó en efectivo" → resumen; SIMULACIÓN y MODO PRUEBA visibles.
- **Debería:** voz (Tarea 9 de K07.4); propina opcional; "Mesa pagada" en voz alta.
- **No:** comandas, inventario, propinas obligatorias, cuentas de usuario, base de datos.

### Arquitectura
Núcleo común (K07.2) más:

| Archivo en `app/` | Qué hace | OpenAI o pey | Tarea |
|---|---|---|---|
| `api/agente.js` + `api/_lib/agente.js` | "Mesa 3: …" → propuesta de mesa | Responses API, `gpt-6.1-sol`, `crear_cobro` y `crear_reparto` estrictos [SC13] | T3 |
| `api/_lib/reparto.js` | Precio del catálogo × cantidad; cada consumo se divide entre quienes lo pagan; los centavos sobrantes al primero; la suma es exacta | — (código) | T3 |
| `api/cobros.js` (× N) | Un cobro por comensal | `POST /codi/qr` con `metadata` (mesa y comensal) [SB10] | T2 |
| `js/mesa.js` + `css/mesa.css` | Tablero, QR grande al tocar, "Pagó en efectivo", resumen; usa `crearSeguidor` de `estado-pago.js` | — | T6 |

```json
{
  "type": "function",
  "name": "crear_reparto",
  "description": "Propone cómo dividir la cuenta de una mesa. NO cobra: el servidor pone precios del catálogo, divide y suma; la persona confirma.",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {
      "mesa": { "type": "string" },
      "comensales": { "type": "array", "items": { "type": "string" } },
      "consumos": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "producto_id": { "type": "string" },
            "cantidad": { "type": "number" },
            "pagan": { "type": "array", "items": { "type": "string" }, "description": "Quiénes pagan este consumo en partes iguales" }
          },
          "required": ["producto_id", "cantidad", "pagan"],
          "additionalProperties": false
        }
      }
    },
    "required": ["mesa", "comensales", "consumos"],
    "additionalProperties": false
  }
}
```

Si crear tres QR con imagen tarda, la Tarea 2 puede usar `generateImage: false` y dibujar `qrString` con `qrcode` [SB10][SB23].

### Riesgos y plan B

| Riesgo | Señal | Plan B |
|---|---|---|
| Nadie más tiene CoDi activo | Un juez no puede pagar | José paga la parte de $1; las demás quedan pendientes o "en efectivo"; no pidas a los jueces pagar montos altos. La activación puede pedir depósito y SMS [SB34] |
| Tope alto con dinero real | Alguien paga una tarjeta de $110 | Paga solo la de $1; regresa `MAX_MONTO_MXN=20` después de la demo |
| Límite de peticiones de pey (⚪) | 429 | Una consulta cada 4 s por QR, con desfase |
| Reparto ambiguo | La suma no cuadra o falta un nombre | El servidor recalcula y pregunta; confirmación antes de cobrar |
| pey caído | 5xx | SIMULACIÓN etiquetada y video |

### Plan de tareas para Codex

| K07 | Se lanza como | Toca SOLO | Qué agrega en Mesa Dividida |
|---|---|---|---|
| T1 | Prompt 1 tal cual | Esqueleto | Nada específico |
| T2 | Prompt 2 | Archivos de pey (núcleo) | Nada específico |
| T3 | Prompt 3 + ajuste | Archivos del agente + `app/api/_lib/reparto.js` y `app/tests/reparto.test.js` (nuevos) | `crear_reparto`; catálogo: comida corrida $95, agua de litro $30, café de olla $15, dulce $1 (precios de ejemplo); propuesta `{tipo: "mesa", mesa, total, comensales: [{etiqueta, concepto, monto, detalle}]}`; prueba con la frase de demo → 110, 110 y 1 |
| T4 | Prompt 4 + ajuste | Archivos de interfaz | Vista de confirmación con la lista de partes; al confirmar, `import("./mesa.js")` dinámico → `mostrarMesa(propuesta)`; si falla, ofrece cobrar el total en un solo QR |
| T5 | Prompt 5 | Archivos de `estado-pago` | `crearSeguidor` exportado y estable (ya lo pide el Prompt 5) |
| T6 | **Tarea 9** (abajo) | `app/js/mesa.js`, `app/css/mesa.css`, `app/tests/mesa.test.js` | Tablero de la mesa |

```text
TAREA 9 · Tablero de la mesa: un cobro y un QR por comensal
CONTEXTO: Mesa Dividida (K07.5). Pasos 2 y 3 de la demo: cada quien paga su QR y la mesa se pone verde.
LEE: AGENTS.md; docs/PRD.md; app/js/api.js y app/js/estado-pago.js (NO los cambies).
ALCANCE (solo archivos nuevos): app/js/mesa.js · app/css/mesa.css · app/tests/mesa.test.js
QUÉ HACER:
1. mostrarMesa(propuesta, {alTerminar}): crea su propia sección; por comensal crea un cobro con api.crearCobro
   (en paralelo, máximo 6) y pinta una tarjeta: nombre, monto, estado y QR chico; al tocarla, QR grande.
2. Sigue cada cobro con crearSeguidor de estado-pago.js (importa con `import * as`; si aún no existe, consulta
   api.consultarEstado cada 4 s), con desfase entre tarjetas y sin dos consultas a la vez del mismo cobro.
3. Resumen: "Pagado $X de $Y · faltan N". Cuando todas estén pagadas, alTerminar().
4. Botón "Pagó en efectivo" por tarjeta: estado EFECTIVO ("registrado por ti"), distinto de PAGADO por pey.
5. "Simular pago" por tarjeta solo si cobro.entorno === 'simulacion'.
CRITERIOS DE ACEPTACIÓN: 1) `npm test --prefix app` pasa con un seguidor falso (pagar una tarjeta no cambia
las demás; efectivo no cuenta como pey; resumen correcto). 2) A 360 px una columna; a 1280 px tres por fila.
3) En SIMULACIÓN: confirmar la mesa → 3 QR → "Simular pago" en una → su tarjeta en verde.
ENTREGA: PR "Tarea 9: tablero de la mesa" con el formato de AGENTS.md.
```

```text
MARCADORES PARA PROMPTS-CODEX
[IDEA ELEGIDA] Mesa Dividida: la fonda dicta la cuenta y cómo se reparte; cada comensal paga su parte con su propio QR CoDi (pey).
[FRASE DE VALOR] Cada quien paga lo suyo con su propio QR CoDi: sin comisión, sin cuentas en la servilleta y con la mesa en verde cuando todos pagaron.
[PERSONA] Fonda familiar con clientes de oficina: al terminar la comida, varios pagan por separado al mismo tiempo.
[DEMO PASO 1] "Mesa 3: dos comidas corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce" → 110, 110 y 1 → Confirmar.
[DEMO PASO 2] Tablero con 3 QR; Carlos escanea el suyo y paga $1.
[DEMO PASO 3] Carlos en verde "confirmado por pey"; Ana "pagó en efectivo"; resumen "Pagado $111 de $221".
[FRASE DE DEMO] Mesa 3: dos comidas corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce
[MONTO DEMO] 1 (la parte de Carlos; MAX_MONTO_MXN=150 en esta idea)
[HERRAMIENTAS EXTRA] crear_reparto (K07.5)
[CATÁLOGO DE EJEMPLO] comida corrida $95 · agua de litro $30 · café de olla $15 · dulce $1 (precios de ejemplo)
[ESTILO] cálido de fonda con alto contraste; una tarjeta grande por persona; verde = pagado por pey, gris = efectivo
```

### Guion de 30 segundos

> "Dos de la tarde en una fonda: la mesa pide la cuenta y empieza el '¿cuánto es de cada quien?'. Con tarjeta, la fonda paga comisión en cada cobro. Con Mesa Dividida digo 'dos corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce', y cada quien recibe su propio QR CoDi: paga desde su banco, sin comisión, directo a la cuenta de la fonda. OpenAI reparte, el código suma y pey confirma."

### Por qué gana
- **R1 · 4:** cobro CoDi múltiple con pey; la IA entiende el reparto dicho en español.
- **R2 · 4:** fonda de K06.9 con su momento de pago exacto; comisión con crédito en restaurantes (⚪ periodo) [SD63].
- **R3 · 4:** tablero que se pone verde persona por persona; un juez puede pagar la parte de $1.
- **R4 · 4:** kit más reparto determinista y varios seguidores; pide subir el tope.
- **R5 · 3:** dividir la cuenta ya existe; con CoDi y lenguaje natural, poco.
- **R6 · 4:** "¿cuánto es de cada quien?" es universal.

## K07.6 · Recomendación final

### La idea número 1 y por qué

**Recomendación:** construye **¿Ya cayó?** (K07.3).

1. **Mejor puntuación** (94) y primera también con los pesos de K08.3 (92) (K07.1).
2. **Es el reto completo:** cobro para comercios de barrio con CoDi y pey [SA01], dinero directo a la cuenta del comercio [SB38], comisión 0 % como pide AI Builders [SA03], y la experiencia de quien recibe el dinero, que pey dice que falta resolver [SB37].
3. **Ataca la causa, no el síntoma:** CoDi no despegó por fricción y desconfianza [SA42]; K06.6 pide justo esto: nunca validar con captura y un botón "¿ya me pagaron?" que consulte el estado real.
4. **Demo robusta:** la captura se sube como archivo (sin micrófono ni ruido) y el veredicto con cobro activo lo decide el estado de pey, no el modelo [SA45].
5. **Crece sin rehacer nada:** comparte núcleo con Cóbrale y Mesa Dividida; si sobra tiempo, la voz de Cóbrale (su Tarea 9) se suma como otra tarea con archivos propios.

### Su demo en 3 pasos
1. **Cobrar:** "Cóbrale un dulce de tamarindo" → $1 → Confirmar → QR CoDi.
2. **La captura:** "Revisar una captura" → la IA lee $1.00, 13:58 y la clave → "Todavía no cae: no entregues".
3. **¡Ya cayó!:** la clienta paga desde su banco → "¡Ya cayó! $1.00, confirmado por pey", en voz alta.

En el guion de K09.3, los pasos 1 y 2 de K09 se vuelven el paso 1 de aquí, y el paso 2 de K09 pasa a ser la captura.

### Si el reto o los criterios oficiales piden otra cosa

| Si piden… | Haz esto | Tiempo |
|---|---|---|
| 1 · Comercio comunitario o "solicitudes de pago" | Cambia a **La Libreta** (idea 5): fiado apuntado con IA y cobro con `POST /codi/pn` al celular del cliente, seguido con `GET /transaction/{id}` [SB10][SB18]; QR de respaldo si la notificación no llega (⚪, depende del banco del cliente [SB30]). Para varios pagadores, **Mesa Dividida** (K07.5) | 45–60 min sobre el núcleo |
| 2 · Lo más nuevo de OpenAI o una app "dentro de ChatGPT" | La caja sigue como demo principal; suma un servidor MCP en `/mcp` con `crear_cobro`, `consultar_cobro` y la revisión de capturas (K04.11, K05.14) [SC22][SC24]. Hazlo en una tarea sola porque agrega dependencias; Plus y modo desarrollador ⚪ [SC25][SC59]. Plugins y MCP Events fueron novedad del DevDay 2026 [SA29] | 45–60 min sin interfaz |
| 3 · Flujos empresariales o conciliación | Suma el corte de caja con `resumen_de_ventas` y `metadata` por pedido (K03.9), o Remisión a Cobro (idea 9) con visión | 30–60 min |

**Si publican criterios con pesos:** ponlos en R1–R6, recalcula el desglose de K07.2 y cambia de idea solo si otra le gana a ¿Ya cayó? por 5 puntos o más; menos que eso está dentro del error de la estimación. **Si pey no da llaves o no se puede cobrar:** misma idea en SIMULACIÓN etiquetada más el video del cobro real de esta noche (K03.6).

### Qué cortar primero si no alcanza el tiempo
1. Todo lo "Debería" (voz para dictar, resumen del día).
2. El aviso hablado: queda "¡Ya cayó!" en pantalla y la vibración.
3. La lectura con IA de la captura: el monto se escribe a mano y el veredicto contra pey sigue.
4. "Revisar una captura" completa: el paso 2 se hace con el botón "¿Ya cayó?" que consulta pey.
5. El agente: "Capturar a mano".

**Nunca cortes:** confirmar → QR real → estado de pey → "¡Ya cayó!"; las etiquetas MODO PRUEBA o SIMULACIÓN; el README que dice qué es real; el video de respaldo (K08.3, K08.13).

### Hitos del sábado (reloj del RUNBOOK: T = 10:30)

| Hora | Hito de ¿Ya cayó? | Si no se cumple |
|---|---|---|
| 10:35 | Prompt 1 lanzado tal cual | Sigue: no depende de la idea |
| 11:00 | `docs/PRD.md` copiado de K07.3 | Toma K07.3 tal cual |
| 11:10–11:20 | Prompts 2–5 con ajustes y Tarea 9 lanzados | Con límite bajo: 2, 3 y 9 primero |
| 13:00 | Cobro real de $1 en producción y "Todavía no cae" con la captura de ejemplo | Recortes 3 y 4; congela funciones nuevas (K08.4) |
| 14:45 | Congelar | Se congela igual |
| 15:15 | Videos: los 3 pasos y el cobro real | Graba con el celular |
| 15:30 | Entrega interna | Lo que falte, domingo antes de las 11:00 |

### Lo que José resuelve esta noche
1. **pey de punta a punta:** cuenta de prueba ligada a tu llave, cobro real de $0.01–$1 con el `curl` de K03.3 pagado desde tu app con CoDi activo (algunos bancos validan con depósito y SMS [SB34]) y la pantalla grabada. Revisa que `GET /transaction/api-key` regrese ese pago: es la base de la búsqueda. Lo pagado no se devuelve [SB07].
2. **OpenAI con visión:** llave con saldo (US$5 o más te pasa al tier Build [SC26]) y una llamada a `gpt-6.1-sol` con `input_image` y salida estructurada sobre tu captura ficticia (la forma de K04.2 es ⚪). Haz esa imagen hoy, sin marcas de bancos reales.
3. **Codex y Vercel listos:** entorno de Codex publicado y tablero de uso revisado (Plus comparte una bolsa de 5 horas y las tareas cloud gastan más [SC44]); Vercel con Root Directory `app`, Preview en SIMULACIÓN y el dominio de producción anotado para el webhook [SB43].

## K07.7 · Ideas descartadas y antipatrones

| Idea o patrón | Por qué no | Base |
|---|---|---|
| Chatbot de educación financiera o "asesor CoDi" sin cobro | El reto pide cobros CoDi con pey; un chat genérico sin cobro aleja a los organizadores (K02.13) | [SA01] |
| Agente que cobra solo | El modelo propone, la persona confirma y el servidor impone el tope (K03.9) | [SA45] |
| Terminal con un chat pegado | IA decorativa: C3 nivel 1 de K08.5 | K08.5 |
| Cripto o stablecoins "sobre CoDi" | Fuera del reto; aunque sea fortaleza de José (K10.1), distrae del cobro CoDi | [SA01] |
| Cobros a turistas con CoDi | Se cobra a cuentas de bancos participantes con app compatible [SB26][SB30]; el turista típico no la tiene (inferencia) | [SB30] |
| Tandas o pagos a terceros desde la app | pey solo documenta cobros, consultas, CLABEs y links (K03.4); no hay pagos salientes y se manejaría dinero ajeno | [SB10] |
| Prometer que se verifica cualquier transferencia SPEI | No hay API del CEP en la base (⚪); se promete lo que no se muestra | [SD41] |
| Registrar en vivo CLABEs reales de locatarios | `ACTIVE` tarda hasta 5 días hábiles y se exponen datos personales | [SB13] |
| WhatsApp Business real | Alta y aprobación fuera de la base (⚪); no cabe en 4.5 h; mejor un chat web con estilo conocido | — |
| Vales Mercomuna con CoDi | Formato del vale y pago al comercio no verificados (K06.8 ⚪) | [SD58] |
| Crédito o scoring con IA | Datos personales y regulación; no se demuestra en 80 s | — |
| Agent Builder, Assistants API o `gpt-image-1` | Se apagan o ya se apagaron | [SC20][SC21] |
| Plataforma de varios lados o marketplace | Demasiadas pantallas para 80 s | K08.11 |
| Depender de que los jueces tengan CoDi activo | La activación puede pedir depósito y SMS: la demo se atora | [SB34] |
| Montos reales altos con la cuenta de prueba | Lo pagado no se devuelve | [SB07] |

**Antipatrones de ejecución (restan aunque la idea sea buena):** demo sin respaldo; SIMULACIÓN sin etiqueta; datos o testimonios inventados; llaves en el repo, que OpenAI desactiva si se filtran [SA54]; Codex sin evidencia (tareas, PRs, bitácora; K08.12); pitch de más de 2–3 minutos [SA50]; voz o visión como único camino sin respaldo de texto.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA01 | DevDay Exchange Community Hackathon: Mexico City (página oficial en Luma; coincide con el boleto del participante) | https://luma.com/f755f0k6 | 2026-11-06 |
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA29 | InfoQ: OpenAI DevDay 2026 | https://infoq.com/news/2026/10/openai-devday-2026 | 2026-11-06 |
| SA42 | DPL News: México, desestiman a CoDi población y comercios (2022) | https://dplnews.com/?p=173032 | 2026-11-06 |
| SA45 | OpenAI Developers Blog: Build Week winners | https://developers.openai.com/blog/build-week-winners | 2026-11-06 |
| SA50 | Codex Community Mini-Hackathon, San Francisco #5 | https://luma.com/7025i1j5 | 2026-11-06 |
| SA54 | GitHub Changelog: RubyGems, Adobe and OpenAI are now secret scanning integrators (8 jun 2021) | https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators | 2026-11-06 |
| SB07 | Documentación de pey: Crear una API key | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/ | 2026-11-06 |
| SB08 | Documentación de pey: Configurar webhooks | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/ | 2026-11-06 |
| SB10 | CoDi API: especificación OpenAPI (versión 2026-10-20) | https://docs.pey.mx/openapi.json | 2026-11-06 |
| SB13 | Documentación de pey: Register Bank Account | https://docs.pey.mx/docs/api/register-bank-account | 2026-11-06 |
| SB15 | Documentación de pey: Get CoDi QR Transactions | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 2026-11-06 |
| SB17 | Documentación de pey: webhook CoDi QR, pago recibido | https://docs.pey.mx/docs/webhooks/codi/qr | 2026-11-06 |
| SB18 | Documentación de pey: webhook CoDi notificación push, pago recibido | https://docs.pey.mx/docs/webhooks/codi/pn | 2026-11-06 |
| SB21 | Documentación de pey: tipo Respuesta de metadata | https://docs.pey.mx/docs/types/metadata-response | 2026-11-06 |
| SB23 | Documentación de pey: tutorial Mostrar un QR CoDi | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 2026-11-06 |
| SB26 | Banco de México: CoDi, Cobro Digital | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html | 2026-11-06 |
| SB30 | CoDi (codi.org.mx): CoDi® para cobrar | https://www.codi.org.mx/secundarias/cobrar.html | 2026-11-06 |
| SB31 | CoDi (codi.org.mx): CoDi® para pagar | https://www.codi.org.mx/secundarias/pagar.html | 2026-11-06 |
| SB33 | Expansión: cómo pagar con CoDi en BBVA, Santander y otros bancos (2026) | https://expansion.mx/finanzas-personales/2026/07/27/como-pagar-codi-bba-santander-bancos | 2026-11-06 |
| SB34 | Expansión: cobrar sin comisiones con CoDi (abril 2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SB37 | Merca2.0: Pey, AI Builders México y SpaceXAI realizarán hackatón de pagos digitales (noviembre 2026) | https://www.merca20.com/pey-ai-builders-mexico-y-spacexai-realizaran-hackaton-de-pagos-digitales-en-mexico/ | 2026-11-06 |
| SB38 | InformaBTL: el 14 de diciembre cambiarán las transferencias; Pey apuesta por pagos QR sin comisiones (noviembre 2026) | https://www.informabtl.com/pagos-qr-mexico-14-diciembre-2026-pey-codi/ | 2026-11-06 |
| SB39 | Standard Webhooks: especificación | https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md | 2026-11-06 |
| SB43 | Vercel: Deployment Protection | https://vercel.com/docs/deployment-protection | 2026-11-06 |
| SC06 | Models (OpenAI API docs) | https://developers.openai.com/api/docs/models | 2026-11-06 |
| SC07 | Pricing (OpenAI API docs) | https://developers.openai.com/api/docs/pricing | 2026-11-06 |
| SC08 | GPT-6.1 Sol: Features, Benchmarks, Pricing, and Access (DataCamp) | https://www.datacamp.com/blog/gpt-6-1-sol | 2026-11-06 |
| SC10 | WebRTC (OpenAI API docs) | https://developers.openai.com/api/docs/guides/voice-webrtc | 2026-11-06 |
| SC12 | Structured model outputs (OpenAI API docs) | https://developers.openai.com/api/docs/guides/structured-outputs.md | 2026-11-06 |
| SC13 | Function calling (OpenAI API docs) | https://developers.openai.com/docs/guides/function-calling | 2026-11-06 |
| SC20 | Agent Builder (OpenAI API docs) | https://developers.openai.com/api/docs/guides/agent-builder | 2026-11-06 |
| SC21 | Deprecations (OpenAI API docs) | https://developers.openai.com/api/docs/deprecations | 2026-11-06 |
| SC22 | Connect and test your plugin (OpenAI) | https://developers.openai.com/plugins/deploy/connect-chatgpt | 2026-11-06 |
| SC24 | MCP server and UI quickstart (OpenAI) | https://developers.openai.com/apps-sdk/quickstart | 2026-11-06 |
| SC25 | ChatGPT Developer Mode: Where It Is and How to Turn It On (Carly) | https://www.usecarly.com/blog/chatgpt-developer-mode/ | 2026-11-06 |
| SC26 | Rate limits (OpenAI API docs) | https://developers.openai.com/api/docs/guides/rate-limits.md | 2026-11-06 |
| SC44 | Codex Pricing (OpenAI; redirige a learn.chatgpt.com/docs/pricing.md) | https://developers.openai.com/codex/pricing.md | 2026-11-06 |
| SC59 | How to Connect GitHub to ChatGPT — via MCP (AnythingMCP) | https://anythingmcp.com/guides/connect-github-to-chatgpt | 2026-11-06 |
| SD06 | Ruptura360 · Banxico le dice adiós a la CLABE obligatoria (10-sep-2026) | https://ruptura360.mx/periodismo-de-servicio/banxico-nuevas-reglas-transferencias-bancarias-2026/ | 2026-11-06 |
| SD10 | Expansión · Diputados aprueban Ley de Economía Digital (6-oct-2026) | https://expansion.mx/economia/2026/10/06/diputados-aprueban-ley-de-economia-digital | 2026-11-06 |
| SD24 | Banxico · Tasas de descuento con tarjeta de débito, giro Miscelánea (julio 2026) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-debito-por-gir/%7BCE998D24-7B96-F2C4-AF17-C29673DC35D2%7D.pdf | 2026-11-06 |
| SD31 | Expansión · ¿Te cobran comisión al aceptar tarjeta? Banxico tiene una alternativa (9-abr-2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SD33 | La Razón · Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025) | https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/ | 2026-11-06 |
| SD35 | Xataka México · Probamos CoDi: lo que nos encanta y lo que odiamos (1-oct-2019) | https://www.xataka.com.mx/banca-digital/probamos-codi-que-nos-encanta-que-odiamos-que-tiene-que-resolver-banxico-para-su-implementacion-mexico | 2026-11-06 |
| SD38 | Vanguardia · Más de 2.4 millones de fraudes bancarios en México durante 2025 (3-nov-2025) | https://vanguardia.com.mx/noticias/mexico/crece-la-estafa-digital-mas-de-24-millones-de-fraudes-bancarios-en-mexico-durante-2025-MK17956794 | 2026-11-06 |
| SD39 | Xataka México · Fraudes bancarios encontraron su objetivo vulnerable: adultos mayores (19-abr-2026) | https://www.xataka.com.mx/banca-digital/fraudes-bancarios-mexico-encontraron-su-objetivo-vulnerable-adultos-mayores/amp | 2026-11-06 |
| SD40 | La Crónica · Asociados a fraudes, 30 % de los expedientes en Condusef (17-mar-2026) | https://www.cronica.com.mx/negocios/2026/03/17/asociados-a-fraudes-30-por-ciento-de-los-expedientes-en-condusef/ | 2026-11-06 |
| SD41 | Grupo Animal · ¿Recibiste una supuesta transferencia bancaria? Así verifícala (28-jul-2026) | https://grupoanimal.mx/explicaciones/transferencia-bancaria-falsa-comprobante | 2026-11-06 |
| SD45 | INEGI · ENDUTIH 2025, presentación de resultados | https://www.inegi.org.mx/contenidos/programas/endutih/2025/doc/presentacion_endutih2025.pdf | 2026-11-06 |
| SD47 | Xataka México · México quiere despedirse del efectivo en carreteras y gasolineras (27-abr-2026) | https://www.xataka.com.mx/politica/mexico-quiere-despedirse-efectivo-carreteras-gasolineras-problema-que-millones-necesitan/amp | 2026-11-06 |
| SD50 | Chilango · Utopía Elena Poniatowska abre en Coyoacán: servicios (ago-2026) | https://www.chilango.com/ciudad/utopia-elena-poniatowska-amor-abre-sus-puertas-en-coyoacan-estos-servicios-ofrecera/ | 2026-11-06 |
| SD55 | Expansión Política · Las 14 acciones de la CDMX para mejorar los mercados (12-feb-2025) | https://politica.expansion.mx/cdmx/2025/02/12/las-14-acciones-que-emprendera-la-cdmx-para-mejorar-los-mercados | 2026-11-06 |
| SD58 | Chilango · Vales Mercomuna: CDMX entregará 700 mil apoyos en 2026 | https://www.chilango.com/noticias/vales-mercomuna-cdmx-entregara-700-mil-apoyos-2026/amp/ | 2026-11-06 |
| SD63 | Banxico · Tasas de descuento con tarjeta de crédito por giro (periodo no indicado; archivo de 2025) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-credito/%7BA896D818-3D13-4922-B54B-4B6D58E99479%7D.pdf | 2026-11-06 |

(previo) = dato verificado por el equipo antes de esta sesión y no reconsultado aquí. No se agregaron fuentes SE: el límite de búsquedas web de la sesión estaba agotado; todo lo nuevo sin fuente está marcado ⚪ o como cálculo propio.
