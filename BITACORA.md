# Bitácora — HackathonOpenAi

Única fuente de verdad del **avance**. Lo que no está aquí o en git no existe.

Reglas: fechas `AAAA-MM-DD`; una línea por hecho; cada hecho con **evidencia** (salida de herramienta, prueba, URL, commit); lo que está a medias se dice a medias; lo bloqueado se marca `BLOQUEADO` y por qué.

## Estado actual
- Fecha: 2026-11-07 (CDMX)
- Fase: proyecto **definido de forma sistémica** (`docs/PROYECTO.md`) y repo listo para programar con **Claude Code en Codespaces**; falta el problema concreto (P12) que contará José.
- Publicado en: GitHub `main`. Vercel: sin proyecto.
- Última verificación (2026-11-07 13:28): `scripts/verificar_conocimiento.py` ✓ 0 errores · 128 fuentes · 78 marcas ⚪; `pey/` con 15 archivos (37 de 37 URL del sitemap y 11 de 11 operaciones del OpenAPI 2026-10-20); `codi/` con 12 archivos; `.claude/settings.json` y `.devcontainer/devcontainer.json` válidos.

## Tarea en curso
**Contrato: proyecto definido y entorno de Claude Code en Codespaces (7-nov, 13:05)**
- Objetivo: documentación de CoDi y de pey completa, objetivo del hackatón y definición sistémica del proyecto, y el repo listo para programar con Claude Code en Codespaces solo con prompts.
- Entradas: Banxico (CoDi, circulares 14/2017, 2/2025, 9/2026 y 10/2026), docs.pey.mx (tutoriales, referencia, changelog, marca), documentación de Claude Code, GitHub Codespaces y Vercel CLI.
- Herramientas: 3 subagentes en paralelo (CoDi, pey, Codespaces) y yo para `docs/PROYECTO.md` y la integración.
- Aprobaciones: José aprobó el plan y pidió completar pey, iniciar sesión con su suscripción de Claude y dejar Codex en el Codespace (13:08).
- TERMINADO CUANDO: 1. verificador con 0 errores; 2. `codi/` cubre qué es, cómo funciona, actores, reglas y plazos, cifras con fecha, marca y relación con SPEI, DiMo y pey; 3. `pey/` cubre todas las páginas de tutoriales, referencia, changelog y marca; 4. `docs/PROYECTO.md` define objetivo, requisitos, actores, flujos, restricciones, arquitectura, criterios de éxito, entregables, riesgos y el espacio del problema; 5. `.devcontainer/`, `.claude/commands/` (6 fases), `.claude/settings.json` y `docs/GUIA-CODESPACES.md` con fuentes oficiales; 6. sin secretos.
- Resultado (13:28): 1 ✓ · 2 ✓ (12 archivos; ⚪ las Guías de homologación sin URL) · 3 ✓ (37 de 37 URL) · 4 ✓ · 5 ✓ (JSON válidos; feature `ghcr.io/anthropics/devcontainer-features/claude-code:1.0` y `claude setup-token` verificados en code.claude.com) · 6 ✓. **Contrato cumplido.**

## Contrato anterior (cumplido)
**Contrato: base limpia del concurso y de pey (7-nov)**
- Objetivo: que el repo tenga solo, y completas, las bases del concurso y la documentación de pey, en Markdown, listas para un proyecto nuevo.
- Entradas: página oficial de Luma, novedades publicadas desde el 6-nov, notas del arranque (José, en persona), docs.pey.mx, su OpenAPI y pey.mx/api-codi.
- Herramientas: 2 subagentes en paralelo (concurso y pey), WebFetch y WebSearch, scripts del repo.
- NO TOCAR: llaves; historial de git (sin reescribirlo ni forzar push).
- Aprobaciones: José pidió la limpieza, borrar el deck y el guion, y la etiqueta `ya-cayo-v1` (2026-11-07, 12:40).
- TERMINADO CUANDO:
  1. `python3 scripts/verificar_conocimiento.py` sale con 0 errores.
  2. En `main` no queda nada de «¿Ya cayó?» salvo la nota del README y esta bitácora.
  3. K00 resume todo lo que pide el concurso, con fuentes.
  4. `pey/` cubre las guías de docs.pey.mx y todos los endpoints de su OpenAPI.
  5. No hay secretos en el repo.
  6. «¿Ya cayó?» queda archivado (documento en el Project de claude.ai) y recuperable (commit `8f45d3d`).
- Evidencia: salida del verificador, `git grep` de «Ya cayó», conteo de endpoints contra el OpenAPI y reportes de los subagentes en el Historial.
- Resultado (13:02): 1 ✓ (0 errores) · 2 ✓ (`git grep -i "ya cay"` solo encuentra README y esta bitácora) · 3 ✓ (K00 con 11 secciones y 17 fuentes) · 4 ✓ (11 de 11 operaciones del OpenAPI y las 37 URL del sitemap mapeadas en `pey/README.md`) · 5 ✓ (verificador sin secretos) · 6 ✓ a medias: archivo en el Project y commit `8f45d3d` en GitHub; la etiqueta no subió (403). **Contrato cumplido salvo la etiqueta.**

## Siguientes pasos
1. 🧑 Guardar los secretos en GitHub (Settings → Codespaces) y abrir un Codespace del repo (`docs/GUIA-CODESPACES.md`).
2. 🧑 En el Codespace: `claude`, iniciar sesión con la suscripción y correr `/arrancar`.
3. 🧑 Contar el problema (las 8 preguntas de P12 en `docs/PROYECTO.md`) con `/prd`.
4. 🤖 `/construir` → `/verificar` → `/desplegar` → `/entregar`.

## Decisiones
| Fecha | Decisión | Por qué | Alternativas descartadas |
|---|---|---|---|
| 2026-11-06 | Trabajo 100% en la nube | Decisión de José | Entorno local |
| 2026-11-06 | Stack por defecto: HTML/CSS/JS sin build + Vercel Functions | Menos piezas que fallen | Next.js |
| 2026-11-06 | Repo público sin datos personales ni copias completas de páginas de terceros | El repo es público | Copiar documentación completa |
| 2026-11-07 | Construir con Claude Code | Los organizadores dijeron que se puede usar Claude; decisión de José | Solo Codex web |
| 2026-11-07 | Retirar «¿Ya cayó?» y empezar un proyecto nuevo sobre un problema familiar | Decisión de José | Seguir con «¿Ya cayó?» |
| 2026-11-07 | Dejar solo las bases del concurso y la documentación de pey; fuera, por ahora, K04 (OpenAI), K05 (herramientas), K06 (contexto de pagos), K07, K09, K10, guías del día y plantillas | Decisión de José | Conservarlos |
| 2026-11-07 | La documentación de pey se escribe con palabras propias; rutas, campos y códigos van exactos | Derechos de autor y repo público | Copiar las páginas de pey |
| 2026-11-07 | No reescribir el historial de git | El código anterior queda recuperable | Forzar push |

## Bloqueos y preguntas abiertas
- BLOQUEADO: la etiqueta `ya-cayo-v1` existe solo en la copia local; el push de la etiqueta respondió HTTP 403 desde esta sesión. El commit `8f45d3d` sí está en GitHub.
- ⚪ Lo que el concurso no ha publicado: ver los pendientes de K00.

## Historial
| Fecha | Qué se hizo | Evidencia | Commit |
|---|---|---|---|
| 2026-11-05 | Verificado: el evento es el sábado 7 de noviembre, 10:00–16:00, en la UTOPÍA Elena Poniatowska Amor | Correo de Luma y newsletters de AI Builders | — |
| 2026-11-06 | Estructura del repo, base de conocimiento (K00–K10), guías del día y plantillas; revisión independiente de ~215 datos | `git log` | 375e9de · 9df95d3 · d8d985c |
| 2026-11-07 10:51 | Codex: revisión de pey y del marco normativo (PR #1, fusionado 11:18) | `docs/REVISION-PEY-2026-11-07.md` | 4ba936d · 583ae5c |
| 2026-11-07 11:25–12:08 | «¿Ya cayó?» construida con 3 subagentes: 89 pruebas, demo en Chrome, video, deck y verificación independiente; nunca se desplegó ni se cobró con pey | `npm test` 89/89 y `scripts/demo_e2e.py` sin problemas en esa versión | d033bb5 … 8f45d3d |
| 2026-11-07 12:40 | José decide retirar «¿Ya cayó?»: archivo en el Project (`claude/archivo-ya-cayo.md`), deck y guion borrados de claude.ai, etiqueta local `ya-cayo-v1` | Respuestas de las herramientas del Project y de artefactos | — |
| 2026-11-07 12:52 | Bases del concurso: Luma vuelta a verificar (sin cambios salvo 265 confirmados), K00 nuevo con el arranque y la ley, K01/K02/K08 al día | Reporte del subagente; fuentes SA62 y SF01 | este commit |
| 2026-11-07 12:58 | Documentación de pey en `pey/` (14 archivos con palabras propias) y K03 corregido (nueva ruta `GET /transaction/bank-account/{id}`, errores de links, 403 en links) | 11 de 11 operaciones del OpenAPI; fuentes SB47–SB57 | este commit |
| 2026-11-07 13:02 | Limpieza: fuera `app/`, `docs/` de la idea, K04–K07, K09, K10, guías y plantillas; fuentes podadas a las citadas; `TODO-EN-UNO.md` incluye `pey/` | `verificar_conocimiento.py` ✓ 0 errores | este commit |
| 2026-11-07 13:24 | CoDi: `codi/` con 12 archivos (Banxico, circulares, cifras con fecha, marca, SPEI y DiMo, cómo encaja pey) | Reporte del subagente; verificador ✓ | este commit |
| 2026-11-07 13:22 | pey: segunda pasada a tutoriales, referencia, changelog y marca; `pey/14` nuevo; K03.3 corregido (la cuenta de prueba está en el paso 2 de la guía) | 37 de 37 URL del sitemap; fuentes SB58–SB62 | este commit |
| 2026-11-07 13:27 | Codespaces: devcontainer con Claude Code y Codex, `.claude/commands/` (6 fases), `.claude/settings.json` y `docs/GUIA-CODESPACES.md` | JSON válidos; fuentes oficiales con fecha en la guía | este commit |
| 2026-11-07 13:28 | `docs/PROYECTO.md`: objetivo del hackatón y definición sistémica (P1–P12); README, AGENTS, CLAUDE y llms.txt al día; `TODO-EN-UNO.md` con proyecto, pey y CoDi | `verificar_conocimiento.py` ✓ 0 errores | este commit |
