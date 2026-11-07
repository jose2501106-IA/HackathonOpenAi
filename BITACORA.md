# Bitácora — HackathonOpenAi

Única fuente de verdad del **avance**. Lo que no está aquí o en git no existe.

Reglas: fechas `AAAA-MM-DD`; una línea por hecho; cada hecho con **evidencia** (salida de herramienta, prueba, URL, commit); lo que está a medias se dice a medias; lo bloqueado se marca `BLOQUEADO` y por qué.

## Estado actual
- Fecha: 2026-11-06
- Fase: 1 investigación → base de conocimiento para el evento del 7 de noviembre
- Publicado en: nada todavía (`app/` vacío hasta el inicio oficial)
- Última verificación (`python3 scripts/verificar_conocimiento.py`): pendiente
- Superficies: hoy Claude (sesión en la nube); el sábado Codex web + ChatGPT web + GitHub Codespaces

## Tarea en curso
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

## Siguientes pasos
1. 🧑 Instalar la Claude GitHub App en este repo para que Claude pueda hacer push (o subir el .zip a mano).
2. 🧑 Esta noche: lo de `dia-del-evento/CHECKLIST.md` (API key de OpenAI con saldo, llave de desarrollo de Pey, Vercel ligado a GitHub, Codex web con el repo y su entorno, ChatGPT con el repo conectado).
3. Sábado: seguir `dia-del-evento/RUNBOOK.md`.

## Decisiones
| Fecha | Decisión | Por qué | Alternativas descartadas |
|---|---|---|---|
| 2026-11-06 | El producto se construye con Codex web; Claude queda como revisor opcional | Es un evento de la comunidad Codex | Construir con Claude Code |
| 2026-11-06 | Trabajo 100% en la nube (Codex web, ChatGPT web, Codespaces, Vercel) | Decisión de José | Entorno local |
| 2026-11-06 | Stack por defecto: HTML/CSS/JS sin build + Vercel Functions | Menos piezas que fallen, deploy por PR, coincide con el método de José | Next.js |
| 2026-11-06 | Repo público sin datos personales ni copias completas de páginas de terceros | El repo es público | Copiar documentación completa |
| 2026-11-06 | No se copió el kit completo de `claude-tec-playbook` | Repo ligero para Codex; el playbook es privado | `/adoptar` completo |

## Bloqueos y preguntas abiertas
- BLOQUEADO: push desde Claude → GitHub responde 403 hasta que se instale la Claude GitHub App.
- ⚪ Reglas, criterios, premios y forma de entrega oficiales: confirmar en la página de Luma o al llegar.

## Historial
| Fecha | Qué se hizo | Evidencia | Commit |
|---|---|---|---|
| 2026-11-05 | Verificado: el evento es el sábado 7 de noviembre, 10:00–16:00, en la Utopía Elena Poniatowska Amor | Correo de aprobación de Luma (2 nov) y newsletters de AI Builders (26 oct, 31 oct, 2 nov) | — |
| 2026-11-06 | Estructura del repo, `AGENTS.md`, `CLAUDE.md`, devcontainer y scripts | Este commit | — |
