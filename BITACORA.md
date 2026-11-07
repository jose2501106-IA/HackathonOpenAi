# Bitácora — HackathonOpenAi

Única fuente de verdad del **avance**. Lo que no está aquí o en git no existe.

Reglas: fechas `AAAA-MM-DD`; una línea por hecho; cada hecho con **evidencia** (salida de herramienta, prueba, URL, commit); lo que está a medias se dice a medias; lo bloqueado se marca `BLOQUEADO` y por qué.

## Estado actual
- Fecha: 2026-11-07 (CDMX)
- Fase: **Tócale listo para desplegar** (nombre provisional): servidor, pantallas, pruebas y documentación terminados y verificados en SIMULACIÓN; falta que José despliegue y haga el cobro real.
- Publicado en: GitHub `main` (todavía sin el código de Tócale). Vercel: sin proyecto.
- Cobro real con pey: **ninguno todavía**.
- Última verificación (2026-11-07, docs de Tócale): `python3 scripts/verificar_conocimiento.py` ✓ (ver Historial).

## Tarea en curso
**Contrato: Tócale, demo funcional para la entrega (7-nov, 14:19)**
- Objetivo: una demo de Tócale que funcione de punta a punta en el celular (Caja → liga firmada en tarjeta NFC o QR → Cliente → solicitud de pago CoDi con pey → "Pagado"), con SIMULACIÓN rotulada sin llaves y lista para desplegar en Vercel.
- Entradas: mensaje de José (14:19: es solo cliente de la taquería; ejemplo real; menú ficticio; Android con Chrome; sin tarjetas todavía; "Hazlo ya"); P12 y `docs/PRD.md`; `docs/CONTRATO-API.md`; `pey/` (OpenAPI 2026-10-20); página de modelos de OpenAI (consultada el 7-nov).
- Herramientas: agente principal (servidor, pruebas e integración), un subagente para las pantallas (`public/`) y otro para la documentación; servidor local y Playwright para probar.
- NO TOCAR: llaves (nunca en el repo, el navegador, los logs ni el chat); historial de git (sin reescribirlo ni forzar push); `conocimiento/`, `pey/`, `codi/` y `fuentes/` salvo que la tarea lo pida; ningún cobro real sin José.
- Aprobaciones: José pidió construir ya (14:19). Push a `main`, despliegue y cobros reales: con el sí de José; las llaves y el cobro real los hace él.
- TERMINADO CUANDO:
  1. `npm test` pasa sin fallas.
  2. En el servidor local (`npm run dev`), sin llaves, el flujo completo llega a "Pagado" rotulado SIMULACIÓN.
  3. Una liga alterada da `PEDIDO_INVALIDO` y un pedido de más del tope cobra el tope con "Cobro de prueba".
  4. Capturas a 360 px de Caja y Cliente sin desplazamiento horizontal.
  5. `python3 scripts/verificar_conocimiento.py` con 0 errores y sin secretos.
  6. 🧑 Desplegado en Vercel; `GET /api/salud` dice `modo: "real"`.
  7. 🧑 Un cobro real de $0.01 a $1 confirmado por pey, con `transactionId`, hora y banco anotados aquí (sin el celular).
  8. 🧑 Tarjeta NFC grabada desde la Caja y leída por otro celular (⚪ si José compra tarjetas hoy).
- Evidencia esperada: salida de `npm test`, capturas, salida del verificador, URL de producción, `transactionId` y commits.
- Resultado parcial (14:45): criterios 1 a 5 ✓; 6 a 8 pendientes de José.
  1. ✓ `node --test`: 23 pruebas, 23 pasan, 0 fallas (fetch simulado; no llaman servicios reales).
  2. ✓ Servidor local sin llaves + Playwright (Chromium móvil): Caja → "Entender pedido" (interpretación básica) → "Crear cobro" → liga y QR → Cliente → celular de prueba → "¡Pagado! Gracias · $1.00 · SIMULACIÓN"; QR CoDi de respaldo con confirmación previa; liga inválida muestra el error. Resultado del script: "SIN FALLAS".
  3. ✓ Liga alterada → `PEDIDO_INVALIDO` (`test/pedido.test.js`); pedido de $180 → cobra $1.00 con "Cobro de prueba" (`test/pey.test.js` y captura 1).
  4. ✓ A 360 y 390 px: sin desplazamiento horizontal y ningún botón ni casilla de menos de 44 px. Capturas en `docs/capturas/`.
  5. ✓ `python3 scripts/verificar_conocimiento.py`: "Todo en orden".
  - ⚪ Web NFC sin probar con tarjeta real (no hay tarjetas; solo Chrome en Android).

## Contratos anteriores (cumplidos)
- **Proyecto definido y entorno de Claude Code en Codespaces (7-nov, 13:05):** CoDi y pey completos, `docs/PROYECTO.md` (P1–P12), `.devcontainer/`, `.claude/` y guía. Resultado 13:28: 6 de 6 criterios ✓. **Cumplido.**
- **Base limpia del concurso y de pey (7-nov):** solo bases del concurso y documentación de pey en Markdown, sin «¿Ya cayó?» salvo su nota. Resultado 13:02: cumplido salvo la etiqueta `ya-cayo-v1` (403 al subirla).

## Siguientes pasos
1. 🧑 Aprobar el push a `main`.
2. 🧑 Confirmar en la sede dónde está el portal (Luma: cierre domingo 8, 13:00).
4. 🧑 Vercel, llave de pey con la cuenta de prueba, variables de entorno y webhook ([`docs/ENTREGA.md`](docs/ENTREGA.md)).
5. 🧑 Cobro real de $0.01 a $1 y anotarlo aquí.
6. 🧑 Tarjetas NFC (si da tiempo), video de respaldo y ensayo del [pitch](docs/PITCH.md).
7. 🧑 Entregar en el portal y guardar captura.

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

## Bloqueos y preguntas abiertas
- BLOQUEADO: la etiqueta `ya-cayo-v1` existe solo en la copia local; el push de la etiqueta respondió HTTP 403 desde esta sesión. El commit `8f45d3d` sí está en GitHub. José puede crearla desde GitHub (Releases).
- Hora de la entrega: Luma (reconsultada el 7-nov 14:37) confirma el cierre el domingo 8 a las 13:00 en el portal del evento; las 16:00 de hoy son el fin de la sesión de construcción. ⚪ URL y formato del portal.
- ⚪ No sabemos si José ya tiene llaves de pey y de OpenAI.
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
