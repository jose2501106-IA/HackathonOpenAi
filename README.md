# HackathonOpenAi

Base de conocimiento y espacio de trabajo para ganar el **DevDay Exchange Community Hackathon: Mexico City**: sábado 7 de noviembre de 2026, Utopía Elena Poniatowska Amor, Coyoacán, CDMX.

**El reto oficial:** prototipar herramientas de **bien público** con OpenAI y CoDi, usando la API gratuita de pey. **Entrega:** domingo 8 a las 13:00. Detalle y fuentes en [K01](conocimiento/01-evento-verificado.md) y [K02](conocimiento/02-organizadores-y-que-buscan.md).

**¿Solo tienes 2 minutos?** Lee el [resumen ejecutivo (K00)](conocimiento/00-resumen-ejecutivo.md): evento, idea recomendada (**"¿Ya cayó?"**), demo de 3 pasos, pendientes de esta noche y riesgos.

## Cómo se usa el sábado (todo en la nube)
| Herramienta | Para qué | Empieza por |
|---|---|---|
| ChatGPT web con este repo conectado | Entender el reto, elegir la idea, escribir el PRD, textos y pitch | [`dia-del-evento/PROMPTS-CHATGPT.md`](dia-del-evento/PROMPTS-CHATGPT.md) |
| Codex web (chatgpt.com/codex) | Construir el producto en `app/` con tareas en paralelo y PRs | [`AGENTS.md`](AGENTS.md) y [`dia-del-evento/PROMPTS-CODEX.md`](dia-del-evento/PROMPTS-CODEX.md) |
| GitHub Codespaces | Terminal de respaldo (Codex CLI, Vercel CLI) y puerto público para webhooks | [`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json) |
| Vercel | Deploy automático de cada PR (preview) y de `main` | [K05](conocimiento/05-codex-chatgpt-y-codespaces.md) |

Paso a paso del día: [`dia-del-evento/RUNBOOK.md`](dia-del-evento/RUNBOOK.md). Lo que hay que tener listo antes: [`dia-del-evento/CHECKLIST.md`](dia-del-evento/CHECKLIST.md).

## Mapa del repo
| Ruta | Qué es |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Reglas para Codex y cualquier agente. [`CLAUDE.md`](CLAUDE.md) lo reutiliza. |
| [`conocimiento/`](conocimiento/INDICE.md) | Base de conocimiento (RAG). Empieza en `INDICE.md`; todo junto en `TODO-EN-UNO.md`. |
| [`dia-del-evento/`](dia-del-evento/RUNBOOK.md) | Runbook, checklist y prompts listos para Codex y ChatGPT. |
| [`plantillas/`](plantillas/PRD.md) | PRD, README de entrega y deck. |
| [`fuentes/REGISTRO.md`](fuentes/REGISTRO.md) | De dónde sale cada dato (con fecha de consulta). |
| [`app/`](app/README.md) | El producto. Se construye el sábado, desde el inicio oficial. |
| `docs/PRD.md` | Se crea el sábado con la plantilla. |
| [`scripts/`](scripts/verificar_conocimiento.py) | Verificación de la base y generación de `TODO-EN-UNO.md`. |
| [`BITACORA.md`](BITACORA.md) | Estado, decisiones y evidencia. |

## Reglas de oro
1. **Nada inventado.** Cada dato tiene fuente en `fuentes/REGISTRO.md`; lo no verificado lleva ⚪.
2. **Llaves solo en el servidor**, como secretos. Nunca en el repo ni en el navegador.
3. **La demo manda.** Primero el flujo de 3 pasos, desplegado; después lo demás.
4. **Codex construye, ChatGPT redacta, José decide y presenta.**

## Mantenimiento
```bash
python3 scripts/verificar_conocimiento.py   # revisa formato, fuentes, enlaces y secretos
python3 scripts/construir_todo_en_uno.py    # regenera conocimiento/TODO-EN-UNO.md
```
