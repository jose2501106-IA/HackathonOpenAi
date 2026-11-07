# Bitácora — HackathonOpenAi

Única fuente de verdad del **avance**. Lo que no está aquí o en git no existe.

Reglas: fechas `AAAA-MM-DD`; una línea por hecho; cada hecho con **evidencia** (salida de herramienta, prueba, URL, commit); lo que está a medias se dice a medias; lo bloqueado se marca `BLOQUEADO` y por qué.

## Estado actual
- Fecha: 2026-11-07 (CDMX)
- Fase: **Punto de venta de Tacos El Gran Abanico construido y verificado en SIMULACIÓN**; falta que José configure Supabase, Vercel y el webhook, y haga el cobro real de $0.10.
- Publicado en: GitHub `main`. Vercel: sin proyecto. Supabase: sin proyecto.
- Cobro real con pey: **ninguno todavía**.

## Tarea en curso
**Contrato: POS con NFC por mesa y cobro CoDi (7-nov, 15:02 y 15:22)**
- Objetivo: punto de venta para Tacos El Gran Abanico. Caja por mesa (5 mesas) y una landing por etiqueta NFC con cuenta, IVA incluido, descuentos antes del IVA, celular y "Pagar" → `POST /codi/pn`. Con pago confirmado por pey se descuentan ingredientes y se registra lo vendido; con error o vencimiento no se descuenta nada.
- Entradas: mensajes de José de las 15:02 y 15:22 (9 respuestas, en `docs/PRD.md`); documentación de pey (docs.pey.mx y OpenAPI, consultados 15:05; `pey/`).
- Herramientas: agente principal (servidor, SQL, pruebas y documentación) y un subagente para las pantallas (`public/`); PGlite para probar el SQL; Playwright con Chrome.
- NO TOCAR: llaves; historial de git; `conocimiento/`, `pey/`, `codi/`, `fuentes/`.
- Aprobaciones: José pidió borrar Tócale y empezar en el repo (15:22). Cobro real y llaves: José.
- TERMINADO CUANDO:
  1. ✓ `npm test`: 20 pruebas, 20 pasan (cálculo, flujo en SIMULACIÓN y en modo real con pey simulado, SQL real en PGlite, adaptador de Supabase).
  2. ✓ Recorrido en Chrome a 360 px en SIMULACIÓN: caja → 3 tacos al pastor + refresco ($97.50) → URL NFC → celular → Pagar → Simular pago → "¡Pago aprobado!"; tortilla de maíz 500 → 494 después del pago; reporte con la venta; celular `00…` → aviso "…puede no estar registrado en CoDi" sin descontar; token malo → "Esta etiqueta no es válida"; sin scroll horizontal, botones ≥ 44 px, sin errores de consola (23/23, subagente de pantallas).
  3. ✓ Con llave falsa y `CAJA_PIN`: la caja pide PIN y rechaza el incorrecto; franjas "MODO PRUEBA"; botón "Pagar $0.10"; ninguna llamada a `/api/pagar` (script `pin_prueba.py`, 15:5x).
  4. 🧑 Supabase con `001_esquema.sql` y `002_semilla.sql`; Vercel con variables; `GET /api/salud` → `modo: real`, `baseDatos: supabase`.
  5. 🧑 Webhook de pey registrado en `https://<dominio>/api/webhook-pey`.
  6. 🧑 Cobro real de $0.10 confirmado por pey (`transactionId` y hora aquí, sin el celular).
  7. 🧑 Etiquetas NFC grabadas con las URL de la caja (⚪ sin etiquetas probadas).
  8. 🧑 `OPENAI_API_KEY` al final para el análisis con IA.

## Contratos anteriores (cumplidos)
- **Tócale (7-nov, 14:19):** criterios 1–5 ✓ en SIMULACIÓN; retirado por José a las 15:22 antes de desplegarse. Código en el commit `b592bee`.
- **Proyecto definido y entorno de Claude Code en Codespaces (7-nov, 13:05):** CoDi y pey completos, `docs/PROYECTO.md` (P1–P12), `.devcontainer/`, `.claude/` y guía. Resultado 13:28: 6 de 6 criterios ✓. **Cumplido.**
- **Base limpia del concurso y de pey (7-nov):** solo bases del concurso y documentación de pey en Markdown, sin «¿Ya cayó?» salvo su nota. Resultado 13:02: cumplido salvo la etiqueta `ya-cayo-v1` (403 al subirla).

## Siguientes pasos
1. 🧑 Supabase, Vercel, variables y webhook: [`docs/ENTREGA.md`](docs/ENTREGA.md) §1–3.
2. 🧑 Cobro real de $0.10 en una mesa y anotarlo aquí (§5).
3. 🧑 Grabar las 5 etiquetas NFC (§4).
4. 🧑 `OPENAI_API_KEY` y probar "Análisis con IA".
5. 🧑 Video, pitch y entrega en el portal antes del domingo 12:00.

## Decisiones
| Fecha | Decisión | Por qué | Alternativas descartadas |
|---|---|---|---|
| 2026-11-06 | Trabajo 100% en la nube | Decisión de José | Entorno local |
| 2026-11-06 | Stack por defecto: HTML/CSS/JS sin build + Vercel Functions | Menos piezas que fallen | Next.js |
| 2026-11-06 | Repo público sin datos personales ni copias completas de páginas de terceros | El repo es público | Copiar documentación completa |
| 2026-11-07 | Construir con Claude Code | Los organizadores dijeron que se puede usar Claude; decisión de José | Solo Codex web |
| 2026-11-07 | Retirar «¿Ya cayó?» y empezar un proyecto nuevo | Decisión de José | Seguir con «¿Ya cayó?» |
| 2026-11-07 | Dejar solo las bases del concurso y la documentación de pey; fuera, por ahora, K04 (OpenAI), K05 (herramientas), K06 (contexto de pagos), K07, K09, K10, guías del día y plantillas | Decisión de José | Conservarlos |
| 2026-11-07 | La documentación de pey se escribe con palabras propias; rutas, campos y códigos van exactos | Derechos de autor y repo público | Copiar las páginas de pey |
| 2026-11-07 | No reescribir el historial de git | El código anterior queda recuperable | Forzar push |
| 2026-11-07 | Problema: taquería de la CDMX que solo cobra en efectivo; José es solo cliente; la app usa un negocio y un menú ficticios | Decisión de José (14:19); repo público | Nombrar la taquería real o usar su menú |
| 2026-11-07 | Producto «Tócale» (nombre provisional): tarjeta NFC o QR → celular → solicitud de pago CoDi (`/codi/pn`) con pey; QR CoDi (`/codi/qr`) de respaldo en la Caja | Idea de José (tarjetas NFC reprogramables y solicitud al celular, 13:44) | Liga de pago de pey (la tarjeta necesita cuenta `stripe`, `pey/06`) |
| 2026-11-07 | Sin base de datos: el pedido va firmado (HMAC) en una liga corta válida 3 horas, y el estado del pago se pregunta a pey | Entrega en horas; P7 | Base de datos externa |
| 2026-11-07 | La tarjeta se graba con la liga de cada pedido (por eso reprogramable); la tarjeta fija por mesa queda para después | Sin base de datos no hay a quién asignarle el pedido en el servidor | URL fija por tarjeta |
| 2026-11-07 | Tope de cobro en el servidor: `MONTO_MAXIMO_MXN`, 1 peso por defecto; si el pedido vale más, se cobra el tope y se rotula "Cobro de prueba" | `AGENTS.md` §3 y K03.3 | Precios de centavos en el menú |
| 2026-11-07 | OpenAI: modelo `gpt-6-luna` por defecto, configurable con `OPENAI_MODEL`; Responses API con `json_schema`; interpretación básica sin llave | La página oficial lo describe como el modelo para tareas enfocadas y de alto volumen (consultada el 7-nov) | El modelo insignia, más lento y caro |
| 2026-11-07 | PIN de caja opcional (`CAJA_PIN`) | Que nadie más mande solicitudes de pago con la URL pública | Cuentas de usuario |
| 2026-11-07 | Trabajar con las 16:00 de hoy como límite interno | José cree que se entrega hoy a las 16:00; K00 dice domingo a las 13:00 (⚪ por confirmar en la sede) | — |
| 2026-11-07 15:22 | Retirar Tócale y construir el POS de Tacos El Gran Abanico: NFC fija por mesa (5), `POST /codi/pn`, inventario por ingredientes, Supabase, solo CoDi + reporte, recordar celular | Decisión de José | Liga firmada por pedido (Tócale) |
| 2026-11-07 15:22 | Celular sin CoDi: pey no documenta el error; al vencer (360 s + 15 s) sin pago se muestra "…puede no estar registrado en CoDi" | Respuesta 1 de José; `pey/04` ⚪ | Inventar un código de error |
| 2026-11-07 15:22 | MODO PRUEBA por defecto: se cobran $0.10 reales en lugar del total (`MONTO_PRUEBA_MXN`) | José escribió "0.1 centavos"; CoDi maneja centavos, se tomó como 10 centavos (⚪ confirmar con José) | $0.01 |
| 2026-11-07 15:3x | Confirmación e inventario en una función de Postgres (`confirmar_pago`), idempotente por `transactionId` | Un webhook repetido no debe descontar dos veces | Varias llamadas REST desde el servidor |
| 2026-11-07 15:3x | Supabase con RLS sin políticas y solo la llave del servidor; almacén en memoria para SIMULACIÓN local | Datos del negocio y celulares fuera del navegador | Llave anon en el navegador |
| 2026-11-07 15:3x | OpenAI: análisis de ventas e inventario (Responses API, `json_schema`), apagado sin llave | Respuesta 5 de José | Dictar la orden con IA |

## Bloqueos y preguntas abiertas
- BLOQUEADO: la etiqueta `ya-cayo-v1` existe solo en la copia local; el push de la etiqueta respondió HTTP 403 desde esta sesión. El commit `8f45d3d` sí está en GitHub. José puede crearla desde GitHub (Releases).
- Hora de la entrega: Luma (reconsultada el 7-nov 14:37) confirma el cierre el domingo 8 a las 13:00 en el portal del evento; las 16:00 de hoy son el fin de la sesión de construcción. ⚪ URL y formato del portal.
- José ya tiene llave de pey y cuenta CoDi activa (15:22); OpenAI y Vercel al final.
- ⚪ Confirmar con José que "0.1 centavos" significa $0.10.
- ⚪ Qué bancos reciben la solicitud de pago de CoDi y qué pasa si el celular no tiene CoDi (`codi/03`, `pey/04`).
- ⚪ Tarjetas NFC: José no las tiene; las quiere comprar hoy si da tiempo.
- ⚪ Lo que el concurso no ha publicado: ver los pendientes de K00.

## Historial
| Fecha | Qué se hizo | Evidencia | Commit |
|---|---|---|---|
| 2026-11-05 | Verificado: el evento es el sábado 7 de noviembre, 10:00–16:00, en la UTOPÍA Elena Poniatowska Amor | Correo de Luma y newsletters de AI Builders | — |
| 2026-11-06 | Estructura del repo, base de conocimiento (K00–K10), guías del día y plantillas; revisión independiente de ~215 datos | `git log` | 375e9de · 9df95d3 · d8d985c |
| 2026-11-07 10:51 | Codex: revisión de pey y del marco normativo (PR #1, fusionado 11:18) | `docs/REVISION-PEY-2026-11-07.md` | 4ba936d · 583ae5c |
| 2026-11-07 11:25–12:08 | «¿Ya cayó?» construida con 3 subagentes: 89 pruebas, demo en Chrome, video, deck y verificación independiente; nunca se desplegó ni se cobró con pey | `npm test` 89/89 y `scripts/demo_e2e.py` sin problemas en esa versión | d033bb5 … 8f45d3d |
| 2026-11-07 12:40 | José decide retirar «¿Ya cayó?»: archivo en el Project (`claude/archivo-ya-cayo.md`), deck y guion borrados de claude.ai, etiqueta local `ya-cayo-v1` | Respuestas de las herramientas del Project y de artefactos | — |
| 2026-11-07 12:52 | Bases del concurso: Luma vuelta a verificar (sin cambios salvo 265 confirmados), K00 nuevo con el arranque y la ley, K01/K02/K08 al día | Reporte del subagente; fuentes SA62 y SF01 | 85f4b31 |
| 2026-11-07 12:58 | Documentación de pey en `pey/` (14 archivos con palabras propias) y K03 corregido (nueva ruta `GET /transaction/bank-account/{id}`, errores de links, 403 en links) | 11 de 11 operaciones del OpenAPI; fuentes SB47–SB57 | 85f4b31 |
| 2026-11-07 13:02 | Limpieza: fuera `app/`, `docs/` de la idea, K04–K07, K09, K10, guías y plantillas; fuentes podadas a las citadas; `TODO-EN-UNO.md` incluye `pey/` | `verificar_conocimiento.py` ✓ 0 errores | 85f4b31 |
| 2026-11-07 13:24 | CoDi: `codi/` con 12 archivos (Banxico, circulares, cifras con fecha, marca, SPEI y DiMo, cómo encaja pey) | Reporte del subagente; verificador ✓ | bc9c8c5 |
| 2026-11-07 13:22 | pey: segunda pasada a tutoriales, referencia, changelog y marca; `pey/14` nuevo; K03.3 corregido (la cuenta de prueba está en el paso 2 de la guía) | 37 de 37 URL del sitemap; fuentes SB58–SB62 | bc9c8c5 |
| 2026-11-07 13:27 | Codespaces: devcontainer con Claude Code y Codex, `.claude/commands/` (6 fases), `.claude/settings.json` y `docs/GUIA-CODESPACES.md` | JSON válidos; fuentes oficiales con fecha en la guía | bc9c8c5 |
| 2026-11-07 13:28 | `docs/PROYECTO.md`: objetivo del hackatón y definición sistémica (P1–P12); README, AGENTS, CLAUDE y llms.txt al día; `TODO-EN-UNO.md` con proyecto, pey y CoDi | `verificar_conocimiento.py` ✓ 0 errores | bc9c8c5 |
| 2026-11-07 13:44 | José plantea el problema (taquería de puro efectivo) y la idea: tarjetas NFC reprogramables + solicitud de pago al celular con pey | Mensaje de José en el chat | — |
| 2026-11-07 14:19 | José responde: solo es cliente de la taquería; ejemplo real; menú ficticio; Android con Chrome; sin tarjetas aún; "Hazlo ya" | Mensaje de José en el chat | — |
| 2026-11-07 14:2x | Documentación de Tócale: P12 respondido, `docs/PRD.md`, `docs/CONTRATO-API.md`, `docs/PITCH.md`, `docs/ENTREGA.md`, README nuevo y esta bitácora | `verificar_conocimiento.py` ✓ (subagente de documentación) | pendiente |
| 2026-11-07 15:22–16:0x | Tócale retirado; POS de Tacos El Gran Abanico: servidor, SQL de Supabase, pantallas (subagente), pruebas y documentación | `npm test` 20/20; Playwright 23/23 + PIN/MODO PRUEBA | ver git log |
