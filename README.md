# HackathonOpenAi

Base de conocimiento en Markdown del **DevDay Exchange Community Hackathon: Mexico City** (sábado 7 de noviembre de 2026, UTOPÍA Elena Poniatowska Amor, Coyoacán, CDMX) y documentación de **pey**, la API de cobros CoDi del reto. Está hecha para que agentes de IA (Claude Code, Codex, ChatGPT) la usen como RAG al construir el proyecto del concurso.

**El reto oficial:** prototipar herramientas de **bien público** con OpenAI y CoDi, usando la API de pey. **Entrega:** domingo 8 a las 13:00. Todo lo que pide el concurso, en un solo lugar: [K00 · Bases del concurso](conocimiento/00-bases-del-concurso.md).

## Qué hay
| Ruta | Qué es |
|---|---|
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
