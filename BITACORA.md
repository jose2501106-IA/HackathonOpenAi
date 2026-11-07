# Bitácora — HackathonOpenAi

Única fuente de verdad del **avance**. Lo que no está aquí o en git no existe.

Reglas: fechas `AAAA-MM-DD`; una línea por hecho; cada hecho con **evidencia** (salida de herramienta, prueba, URL, commit); lo que está a medias se dice a medias; lo bloqueado se marca `BLOQUEADO` y por qué.

## Estado actual
- Fecha: 2026-11-07, 11:45 (CDMX)
- Fase: **"¿Ya cayó?" construida y probada en SIMULACIÓN** (`app/`); falta desplegar en Vercel y, con llaves, el pago real de $1
- Publicado en: GitHub `main`. Vercel: sin conectar (GitHub reportaba 0 despliegues); José lo importa con Root Directory `app`
- Última verificación (2026-11-07 11:42): `npm test --prefix app` 87/87 · `python3 scripts/demo_e2e.py` sin problemas (360 px, botones ≥ 44 px, sin "falso", sin errores de consola) · `scripts/verificar_conocimiento.py` ✓ (238 fuentes)
- Superficies: Claude Code (sesión en la nube) construye; Codex aportó el PR #1; José decide, despliega y presenta

## Tarea en curso
**Contrato: construir y desplegar "¿Ya cayó?" (7-nov)**
- Objetivo: la demo de 3 pasos de `docs/PRD.md` funcionando de punta a punta y desplegada, con entrega lista (README, deck, guion).
- Entradas: `docs/PRD.md`, `docs/CONTRATO-API.md`, K03, K04, K07.3, `docs/REVISION-PEY-2026-11-07.md`.
- Herramientas: Claude Code con 3 subagentes en paralelo (pagos, IA, interfaz), Node 22, Playwright + Chrome; Vercel (José).
- NO TOCAR: llaves (solo José, como variables de Vercel); `conocimiento/` salvo correcciones con fuente.
- Aprobaciones: plan, construir con Claude y push a `main` aprobados por José (2026-11-07, 11:03).
- TERMINADO CUANDO:
  1. `npm test --prefix app` pasa.
  2. `scripts/demo_e2e.py` recorre los 3 pasos en SIMULACIÓN sin problemas.
  3. La URL de producción responde `/api/salud` y la demo corre ahí.
  4. Sin llaves en el repo ni en el navegador.
  5. README de entrega, deck y guion del pitch listos.
  6. Con llaves: un pago real de $1 llega a "¡Ya cayó!" confirmado por pey en menos de 10 s.
- Resultado parcial (11:45): 1 ✓ (87/87), 2 ✓ (capturas en `docs/capturas/`), 4 ✓ (grep sin coincidencias), 5 en curso (README y `docs/PITCH.md` listos; deck pendiente), 3 y 6 pendientes de José (Vercel y llaves).

## Contrato anterior (cumplido)
**Contrato: base de conocimiento lista para el 7 de noviembre**
- Objetivo: que Codex y ChatGPT encuentren en este repo todo lo necesario para construir y presentar el proyecto ganador sin investigar desde cero.
- Entradas: correos de confirmación del evento (no públicos), páginas públicas citadas en `fuentes/REGISTRO.md`, kit `claude-tec-playbook` de José.
- Herramientas: búsqueda web, subagentes de investigación, scripts del repo.
- NO TOCAR: `app/` (se construye en el evento).
- Aprobaciones: push a `main` (José lo pidió el 2026-11-06).
- TERMINADO CUANDO:
  1. `python3 scripts/verificar_conocimiento.py` sale con 0 errores.
  2. Existen K00 a K10, `conocimiento/INDICE.md` y `conocimiento/TODO-EN-UNO.md`; cada K tiene TL;DR y secciones con ID.
  3. `AGENTS.md` pesa menos de 16 KB y todo lo que referencia existe.
  4. `dia-del-evento/` tiene RUNBOOK, CHECKLIST, PROMPTS-CODEX y PROMPTS-CHATGPT; `plantillas/` tiene PRD, README-ENTREGA y DECK.
  5. Fecha, horario, sede, organizadores y tecnologías del evento (K01) tienen fuente registrada.
  6. No hay secretos en el repo.
  7. Una revisión independiente de los datos críticos (fechas, endpoints de Pey, nombres de modelos y precios de OpenAI, flujo de Codex web) no deja hallazgos críticos abiertos.
- Evidencia: salida del script y reporte del verificador en el Historial.
- Resultado (2026-11-07): criterios 1–6 ✓ (script con 0 errores; K00–K10, INDICE y TODO-EN-UNO existen; AGENTS.md 4.2 KB; dia-del-evento/ y plantillas/ completos; K01 con fuente SA01; sin secretos). Criterio 7 ✓: la revisión independiente cotejó ~215 datos de K01, K03, K04, K05 y K06.10 contra sus fuentes; corrigió 2 matices en K04 y no dejó hallazgos críticos abiertos. **Contrato cumplido.**

## Siguientes pasos
1. 🧑 Importar el repo en Vercel (Root Directory `app`, Framework Other, variables `MODO_PAGO`, `MAX_MONTO_MXN=20`, `APP_SECRET`) y pasar la URL de producción.
2. 🧑 Si hay llaves: `OPENAI_API_KEY` y `PEY_API_KEY` (y `PEY_WEBHOOK_SECRET`) como variables de Vercel → Redeploy → probar un cobro real de $1.
3. 🤖 Deck (Slides), video de respaldo y llenar los `[POR LLENAR]` del README con la URL.
4. 🧑 Probar en el celular: micrófono, voz es-MX y escaneo del QR (⚪ no se pudo en Chrome headless).

## Decisiones
| Fecha | Decisión | Por qué | Alternativas descartadas |
|---|---|---|---|
| 2026-11-06 | El producto se construye con Codex web; Claude queda como revisor opcional | Es un evento de la comunidad Codex | Construir con Claude Code |
| 2026-11-06 | Trabajo 100% en la nube (Codex web, ChatGPT web, Codespaces, Vercel) | Decisión de José | Entorno local |
| 2026-11-06 | Stack por defecto: HTML/CSS/JS sin build + Vercel Functions | Menos piezas que fallen, deploy por PR, coincide con el método de José | Next.js |
| 2026-11-06 | Repo público sin datos personales ni copias completas de páginas de terceros | El repo es público | Copiar documentación completa |
| 2026-11-06 | No se copió el kit completo de `claude-tec-playbook` | Repo ligero para Codex; el playbook es privado | `/adoptar` completo |
| 2026-11-07 | Construir el producto con Claude Code (sustituye la decisión del 06-nov) | Los organizadores dijeron que se puede usar Claude; decisión de José | Solo Codex web |
| 2026-11-07 | Cobro sin base de datos: cada cobro viaja en un ticket firmado (HMAC-SHA256) | Serverless sin estado; el servidor no confía en montos del navegador | Base de datos o KV |
| 2026-11-07 | El veredicto de la captura lo decide el código con datos de pey; la IA solo lee; nunca decir "falso" | Confianza y trato digno (K07.3) | Que el modelo juzgue la captura |
| 2026-11-07 | Código compartido en `app/lib/`, fuera de `api/` | Recomendación de la doc de Vercel (SC64, K05.16) | `app/api/_lib/` |
| 2026-11-07 | La SIMULACIÓN vence igual que un cobro real (`expirado`, `409 COBRO_VENCIDO`) | Que la pantalla y el estado digan lo mismo | Simulación sin vencimiento |

## Bloqueos y preguntas abiertas
- ⚪ Criterios, jueces, reglas de código previo, URL del portal y formato de entrega: no publicados (K01.11). Preguntar al llegar.
- ⚪ pey no tiene sandbox: solo cuenta de prueba en producción con montos de $0.01 a $1 (K03.3, K03.6).
- ⚪ Forma exacta de la llamada de visión y eventos de herramientas en Realtime (K04.2, K04.16): probar esta noche.

## Historial
| Fecha | Qué se hizo | Evidencia | Commit |
|---|---|---|---|
| 2026-11-05 | Verificado: el evento es el sábado 7 de noviembre, 10:00–16:00, en la Utopía Elena Poniatowska Amor | Correo de aprobación de Luma (2 nov) y newsletters de AI Builders (26 oct, 31 oct, 2 nov) | — |
| 2026-11-06 | Estructura del repo, `AGENTS.md`, `CLAUDE.md`, devcontainer y scripts | `git log` | 375e9de |
| 2026-11-06 | Página oficial de Luma leída: reto de bien público, entrega dom 8 13:00, ganadores lun 9, premio de 10 boletos | K01 (SA01) | 9df95d3 |
| 2026-11-06 | Investigación en paralelo: K01–K06 y K08 (236 fuentes registradas) | `fuentes/REGISTRO.md` | 9df95d3 |
| 2026-11-06 | Ejemplos de K03.7 probados: 9/9 pruebas con `fetch` simulado y firma de webhook con el vector oficial de Svix (Node 22.23) | Reporte de la investigación de pey | 9df95d3 |
| 2026-11-06 | Runbook, checklist, prompts para Codex y ChatGPT, K09 y plantillas | `dia-del-evento/`, `plantillas/` | 9df95d3 |
| 2026-11-06 | Primer push a `main` (la Claude GitHub App ya tiene acceso) | `git push` sin error | 9df95d3 |
| 2026-11-07 | Revisión independiente: ~215 datos cotejados, 2 correcciones menores en K04 | Sección "Correcciones" al final de K04 | este commit |
| 2026-11-07 | Consistencia: herramienta `crear_cobro`, `MODO_PAGO` en lugar de `PEY_ENV`, 404 de pey con aviso, `npm test --prefix app` | `git diff` | este commit |
| 2026-11-07 | K07 (idea "¿Ya cayó?"), K00, INDICE y TODO-EN-UNO generados; verificador con 0 errores | Salida de `scripts/verificar_conocimiento.py` | este commit |
| 2026-11-07 10:51 | Codex: revisión de pey y del marco normativo (PR #1) | `docs/REVISION-PEY-2026-11-07.md` | 4ba936d |
| 2026-11-07 11:18 | PR #1 fusionado; K06.5 con la ley firmada el 4-nov (⚪ fecha del DOF) | `git log` | 583ae5c |
| 2026-11-07 11:25 | Base: PRD, contrato de la API, config con SIMULACIÓN forzada sin llaves, tickets firmados, `/api/salud` y servidor local | `GET /api/salud` → 200 `{"ok":true,"modoPago":"simulacion"}` | d033bb5 |
| 2026-11-07 11:29 | Subagente de pagos: cliente de pey, QR, estado, cobros, simular-pago y webhook (Standard Webhooks) | 39 pruebas con `fetch` simulado | este commit |
| 2026-11-07 11:35 | Subagente de IA: Responses API con `crear_cobro` estricta, lectura de captura con salida estructurada, reglas locales y veredicto por código | 36 pruebas | este commit |
| 2026-11-07 11:41 | Subagente de interfaz: móvil en español, modo siempre visible, captura de ejemplo ficticia, voz y vibración | 10 pruebas + recorrido en Chrome | este commit |
| 2026-11-07 11:42 | Integración: código compartido a `app/lib/`, plurales del catálogo, vencimiento en SIMULACIÓN, prueba de la demo completa | `npm test` 87/87 · `scripts/demo_e2e.py` sin problemas | este commit |

## Revisión pey y normativa — 2026-11-07
- Contrastadas páginas oficiales de pey, OpenAPI y DOF; ver docs/REVISION-PEY-2026-11-07.md y K06.5.
- Corregido estado sugerido de 404 a no_verificable; documentada validación del pago contra el pedido.
- Cambios documentales: no se han usado credenciales, creado cobros ni desplegado producto.
