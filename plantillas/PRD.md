# PRD · [NOMBRE DEL PRODUCTO]

> **Plantilla.** Se llena en 15 minutos con ChatGPT (prompt 3 de `dia-del-evento/PROMPTS-CHATGPT.md`) y se guarda como `docs/PRD.md`. Máximo 2 páginas.
> Reglas: la demo de 3 pasos manda; criterios verificables; cada dato con su ID de conocimiento (K06.10, K03.4…) o ⚪; nada inventado; las personas son arquetipos (K06.9).
> Borra estas líneas de ayuda al guardar.

| Campo | Valor |
|---|---|
| Versión | v1 · sábado 7 nov 2026 · [hora] |
| Reto oficial | "Prototipa herramientas de bien público con OpenAI y CoDi" (K01.4; detalle en `docs/RETO-OFICIAL.md`) |
| Ejemplo oficial al que responde | [cobro para comercios de barrio / comercio comunitario / QR y solicitudes de pago / flujos empresariales sobre pagos instantáneos] |
| Idea elegida | [IDEA ELEGIDA] (de K07: [ID o "nueva"]) |
| Roles | José decide y presenta · Codex construye · ChatGPT redacta |
| Entregas | Interna: sábado 15:30 · Final en el portal: domingo antes de las 12:00 (cierra 13:00) |

## 1. Frase de valor
Para **[persona]** que **[problema]**, **[producto]** **[beneficio]** sin **[dolor]**.

## 2. Problema y persona
- **Persona** (arquetipo, K06.9): [p. ej. tianguista de fruta; montos chicos; señal intermitente].
- **Dolor principal:** [una frase].
- **Dato con fuente** (K06.10): [dato N: cifra — fuente, año].
- **Por qué es bien público:** [cobrar sin comisión, dinero directo a la cuenta del comercio, código reutilizable].
- **Por qué ahora:** [p. ej. homologación de CoDi a más tardar el 14 dic 2026 (K06.5)].

## 3. Demo de 3 pasos (manda sobre todo lo demás)
| Paso | Qué hace la persona | Qué ve el jurado | Criterio de éxito (verificable) |
|---|---|---|---|
| 1 | [Dice o escribe "[FRASE DE DEMO]"] | [Propuesta: concepto, detalle y total] | Propuesta correcta en ≤ 5 s |
| 2 | [Toca Confirmar] | [QR CoDi de pey, grande] | QR visible en ≤ 5 s |
| 3 | [Paga con la app de su banco] | [PAGADO con palomita y hora] | PAGADO ≤ 5 s después del pago |

- **Frase de demo:** "[FRASE DE DEMO]" → total esperado **$[MONTO DEMO]**. Con la cuenta de prueba de pey el monto debe ser de $1 o menos y caber en `MAX_MONTO_MXN` (lo pagado no se devuelve; K03.3).
- **Duración objetivo:** ≤ 80 s en producción.

## 4. Alcance
**Debe (la demo):**
- [ ] Pedido en lenguaje natural → propuesta con `crear_cobro` (la IA solo propone).
- [ ] Confirmación explícita → QR CoDi con pey (`POST /codi/qr`, K03.4).
- [ ] Confirmación del pago en pantalla (consulta a pey cada 2 s + webhook firmado, K03.5).
- [ ] "Capturar a mano" si la IA falla.
- [ ] Banner de MODO PRUEBA o SIMULACIÓN cuando aplique.

**Debería (solo si sobra tiempo y ayuda a la demo):**
- [ ] [p. ej. consultar_cobro: "¿ya me pagaron?" (K03.9)]
- [ ] [p. ej. resumen del día]

**No (fuera de alcance hoy):**
- [ ] [p. ej. cuentas de usuario, base de datos, devoluciones, notificaciones push, varios comercios]

## 5. Flujo y pantallas
1. **Pedido:** campo grande + botones de ejemplo + enlace "Capturar a mano".
2. **Confirmar:** concepto, detalle y total; "Confirmar y generar QR" / "Editar".
3. **QR:** QR grande, monto, concepto, "Esperando pago…".
4. **Pagado:** palomita, monto, hora y nota del modo; "Nuevo cobro".
- Tono de los textos: [tú / usted, y por qué (K06.7)]. Estilo: [colores y tono].

## 6. Agente de IA (API de OpenAI)
- **Modelo:** `OPENAI_MODEL` = [modelo de K04.2]. Responses API con function calling (K04.6, K04.15).
- **Instrucciones (resumen):** [rol; nunca inventar precios; si falta un dato, preguntar; nunca decir que ya se cobró; respuestas cortas].
- **Herramientas:**

| Nombre | Para qué | Parámetros | Efecto | ¿Confirmación? |
|---|---|---|---|---|
| `crear_cobro` | Proponer un cobro | `monto`, `concepto`, `detalle` [{descripcion, cantidad, precioUnitario}] | Ninguno: regresa una propuesta; el QR se crea en pey solo tras confirmar | Sí, siempre |
| [extra o "ninguna"] | | | | |

- **Catálogo de ejemplo:** [productos y precios marcados como ejemplo, o "ninguno"].
- **Qué NO hace la IA:** no cobra, no decide montos sin validación del servidor, no declara pagos.

## 7. Pagos CoDi con pey
- **API:** `https://api.pey.mx`, solo producción (K03.3). Llave ligada a la **cuenta de prueba** de pey hasta que la CLABE del comercio esté activa (5 días hábiles).
- **Crear:** `POST /codi/qr` con el monto en pesos, `generateImage: true` y `expiration: 600` (K03.4).
- **Estado:** `GET /transaction/codi/qr/{id}` (`PAID` → pagado; vacío o `PENDING` → pendiente; vencido → expirado, calculado por la app).
- **Webhook:** `codi.qr.payment_received`, con Standard Webhooks, en `https://<proyecto>.vercel.app/api/webhook-pey` (dominio de producción; K03.5).
- **Modo de pago** (`MODO_PAGO`): `prueba` (lo esperado) / `comercio` / `simulacion`. `MAX_MONTO_MXN=[20]`.

## 8. Datos, seguridad y privacidad
- Llaves solo en variables de entorno del servidor (`OPENAI_API_KEY`, `PEY_API_KEY`, `PEY_WEBHOOK_SECRET`); nunca en el navegador ni en el repo.
- Datos que se guardan: [ninguno / cuáles y dónde]. Datos que llegan al modelo: [solo el texto del pedido].
- Validaciones: monto > 0 y ≤ `MAX_MONTO_MXN`; firma, hora e id de cada webhook.

## 9. Criterios de aceptación de la demo
- [ ] Los 3 pasos funcionan en el dominio de producción, desde un celular, en ≤ 80 s.
- [ ] Un pago real de $[MONTO DEMO] queda confirmado en pantalla y en "Webhook Logs" de pey.
- [ ] Con la IA caída, el cobro se completa con "Capturar a mano".
- [ ] La pantalla dice MODO PRUEBA o SIMULACIÓN cuando aplica.
- [ ] `npm test --prefix app` pasa; ninguna llave en el repo.

## 10. Plan de tareas para Codex
Prompts y dueños de archivos: `dia-del-evento/PROMPTS-CODEX.md`.

| Prompt | Tarea | Oleada | Paralelo con | Estado |
|---|---|---|---|---|
| 1 | Esqueleto + SIMULACIÓN + primer deploy | 1 | — | [ ] |
| 2 | Pey real (cobro, estado, webhook) | 2 | 3, 4, 5 | [ ] |
| 3 | Agente (Responses API + `crear_cobro`) | 2 | 2, 4, 5 | [ ] |
| 4 | Interfaz móvil | 2 | 2, 3, 5 | [ ] |
| 5 | Confirmación en tiempo real | 2 | 2, 3, 4 | [ ] |
| 6 | Pruebas E2E + README | 3 | 7 | [ ] |
| 7 | Pulido para la demo | 3 | 6 | [ ] |
| [R6] | [Tarea del "Debería"] | [ ] | [ ] | [ ] |

## 11. Rúbrica (K08.3): cómo atacamos cada criterio
| Criterio | Peso estimado | Cómo lo atacamos | Autoevaluación 1–5 (13:00 / 14:45) |
|---|---|---|---|
| C1 Impacto y bien público | 25 % | [persona, dato, comisión 0 %] | [ ] / [ ] |
| C2 Ejecución | 25 % | [pago real de punta a punta en producción] | [ ] / [ ] |
| C3 OpenAI y Codex | 20 % | [`crear_cobro` acotado; tareas en paralelo y PRs] | [ ] / [ ] |
| C4 Originalidad | 15 % | [ángulo propio en una frase] | [ ] / [ ] |
| C5 Pitch y diseño | 15 % | [demo ≤ 80 s; interfaz simple en español] | [ ] / [ ] |

## 12. Riesgos y plan B
| Riesgo | Plan B |
|---|---|
| pey no responde o la llave no cobra | MODO PRUEBA → SIMULACIÓN etiquetada + video (RUNBOOK, plan B 4) |
| La IA falla o se acaba el saldo | "Capturar a mano" (RUNBOOK, plan B 3) |
| Internet de la sede | Hotspot + video local (RUNBOOK, plan B 1) |
| [otro] | [ ] |

## 13. Decisiones (también en `BITACORA.md`)
| Hora | Decisión | Por qué | Alternativas descartadas |
|---|---|---|---|
| [ ] | [ ] | [ ] | [ ] |
