# HackathonOpenAi

Base de conocimiento en Markdown del **DevDay Exchange Community Hackathon: Mexico City** (sábado 7 de noviembre de 2026, UTOPÍA Elena Poniatowska Amor, Coyoacán, CDMX), con la documentación de **pey** (la API de cobros del reto) y de **CoDi** (Banxico). Está hecha para programar el proyecto con **Claude Code dentro de GitHub Codespaces, solo con prompts**, y para que cualquier agente (Claude Code, Codex, ChatGPT) la use como RAG.

**El reto oficial:** prototipar herramientas de **bien público** con OpenAI y CoDi, usando la API de pey. **Entrega:** domingo 8 a las 13:00. Empieza por la [definición del proyecto](docs/PROYECTO.md) y las [bases del concurso (K00)](conocimiento/00-bases-del-concurso.md).

## Cómo se trabaja
1. Abre un Codespace de este repo e inicia sesión en Claude Code con tu suscripción: [guía paso a paso](docs/GUIA-CODESPACES.md).
2. Escribe `/arrancar`: Claude lee las bases, la definición del proyecto y la bitácora, y dice el siguiente paso.
3. Sigue las fases con los comandos de `.claude/commands/`: `/prd` → `/construir` → `/verificar` → `/desplegar` → `/entregar`.

## Qué hay
| Ruta | Qué es |
|---|---|
| [`docs/PROYECTO.md`](docs/PROYECTO.md) | Objetivo del hackatón y definición sistémica del proyecto: requisitos, actores, flujos, restricciones, arquitectura, criterios de éxito, riesgos y el problema por definir. |
| [`docs/GUIA-CODESPACES.md`](docs/GUIA-CODESPACES.md) | Claude Code en Codespaces: secretos, inicio de sesión, flujo de trabajo, despliegue y biblioteca de prompts. |
| [`.claude/commands/`](.claude/commands/) | Prompts listos por fase: arrancar, PRD, construir, verificar, desplegar y entregar. |
| [`codi/`](codi/README.md) | Documentación de CoDi (Banxico) en Markdown: qué es, cómo funciona, reglas, cifras y marca. |
| [`conocimiento/00-bases-del-concurso.md`](conocimiento/00-bases-del-concurso.md) | K00: requisitos, calendario, entrega, criterios, premios y pendientes del concurso. |
| [`conocimiento/01-evento-verificado.md`](conocimiento/01-evento-verificado.md) | K01: el evento verificado (fecha, sede, agenda, reto, premios). |
| [`conocimiento/02-organizadores-y-que-buscan.md`](conocimiento/02-organizadores-y-que-buscan.md) | K02: organizadores, aliados y qué buscan. |
| [`conocimiento/03-codi-y-api-pey.md`](conocimiento/03-codi-y-api-pey.md) | K03: CoDi y la API de pey en síntesis, con código probado. |
| [`conocimiento/08-criterios-y-jueces.md`](conocimiento/08-criterios-y-jueces.md) | K08: cómo se evalúa, rúbrica y errores que restan. |
| [`pey/`](pey/README.md) | Documentación de pey completa en Markdown: guías, referencia de la API, webhooks y errores. |
| [`docs/REVISION-PEY-2026-11-07.md`](docs/REVISION-PEY-2026-11-07.md) | Revisión de pey y decisiones del 7-nov (PR #1, Codex). |
| [`conocimiento/INDICE.md`](conocimiento/INDICE.md) | Qué archivo y qué sección responde cada pregunta; todo junto en `TODO-EN-UNO.md`. |
| [`fuentes/REGISTRO.md`](fuentes/REGISTRO.md) | De dónde sale cada dato, con fecha de consulta. |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Reglas para agentes. |
| [`BITACORA.md`](BITACORA.md) | Estado, decisiones y evidencia. |
| [`scripts/`](scripts/verificar_conocimiento.py) | Verificación de la base y generación del índice. |

## Reglas de oro
1. **Nada inventado.** Cada dato tiene fuente en `fuentes/REGISTRO.md`; lo no verificado lleva ⚪.
2. **Llaves solo en el servidor**, como secretos. Nunca en el repo, en el navegador ni en el chat.
3. **Dinero real con cuidado.** pey solo tiene producción: en pruebas, montos de $0.01 a $1 y siempre con confirmación de la persona.
4. **José decide y presenta; los agentes construyen y verifican.**

## Proyecto anterior
Una primera idea, «¿Ya cayó?», se construyó y se retiró del repo el 7 de noviembre para empezar un proyecto nuevo. Su código sigue en el historial de git (commit `8f45d3d`).

## Mantenimiento
```bash
python3 scripts/unir_registros.py           # junta las fuentes en fuentes/REGISTRO.md
python3 scripts/construir_indice.py         # regenera conocimiento/INDICE.md
python3 scripts/construir_todo_en_uno.py    # regenera conocimiento/TODO-EN-UNO.md
python3 scripts/verificar_conocimiento.py   # revisa formato, fuentes, enlaces, IDs repetidos y secretos
```
