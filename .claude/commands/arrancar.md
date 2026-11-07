---
description: Arranque de sesión. Lee el proyecto, las bases y la bitácora, revisa el entorno y dice el siguiente paso
disable-model-invocation: true
---

# /arrancar

Eres el constructor y verificador de este repo; José decide, aprueba y presenta. Sigue `AGENTS.md` y `CLAUDE.md`. En este comando **no edites archivos**: solo lees, revisas y resumes.

1. Lee completos `docs/PROYECTO.md` y `conocimiento/00-bases-del-concurso.md` (K00).
2. Lee `BITACORA.md`: estado actual, tarea en curso, siguientes pasos y bloqueos.
3. Si existe `docs/PRD.md`, léelo y ubica la primera tarea pendiente. Si no existe, dilo.
4. Corre `git status --short`, `git log --oneline -5` y `TZ=America/Mexico_City date "+%a %d %b %H:%M"`.
5. Revisa el entorno **sin mostrar valores**:
   - Versiones: `node --version`, `python3 --version`, `vercel --version`, `codex --version`.
   - Variables (solo dice si existen):
     ```bash
     for v in OPENAI_API_KEY PEY_API_KEY PEY_WEBHOOK_SECRET; do if [ -n "${!v}" ]; then echo "$v: definida"; else echo "$v: FALTA"; fi; done
     ```
   Nunca imprimas el valor de una variable ni pidas llaves en el chat. Si falta alguna, di cuál y remite a la sección 2 de `docs/GUIA-CODESPACES.md`.

Responde en español de México, en 15 líneas o menos:

- **Tiempo:** cuánto falta para la entrega (domingo 8 de noviembre de 2026 a las 13:00; la zona horaria es ⚪ según K00.5, se asume la del centro de México) y cuánto para la meta interna de las 12:00.
- **Estado:** la fase actual en 2 o 3 líneas, cada afirmación con su evidencia (archivo o comando).
- **Bloqueos:** los que haya, incluidas variables faltantes y preguntas abiertas de `BITACORA.md`.
- **Siguiente paso:** UNO, concreto, con el comando que toca:
  - sin `docs/PRD.md` → `/prd` con el problema en palabras de José (las 8 preguntas de P12 en `docs/PROYECTO.md`);
  - con PRD y tareas pendientes → `/construir` y el ID de la tarea;
  - flujo principal terminado → `/verificar` y después `/desplegar`;
  - demo desplegada o menos de 3 horas para la entrega → `/entregar`.
- Lo que no pudiste comprobar va con ⚪ y la frase "no lo verifiqué".
