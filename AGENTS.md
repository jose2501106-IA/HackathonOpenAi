# AGENTS.md

Instrucciones para cualquier agente (Claude Code, Codex, ChatGPT) que trabaje en este repo. Léelas completas antes de actuar.

## 1. Misión
Construir, para el *DevDay Exchange Community Hackathon: Mexico City* (sábado 7 de noviembre de 2026; entrega el domingo 8 a las 13:00), un prototipo **funcional y desplegado** de **bien público** que use la **API de OpenAI** y cobre con **CoDi** mediante la **API de pey**. El problema y el alcance los define José; cuando estén definidos vivirán en `docs/PRD.md`.

José participa solo: él decide, aprueba y presenta. Tú construyes y verificas.

## 2. Cómo usar la base de conocimiento
1. Empieza por `docs/PROYECTO.md` (objetivo del hackatón y definición sistémica del proyecto) y `conocimiento/00-bases-del-concurso.md` (K00: todo lo que pide el concurso). El índice de preguntas está en `conocimiento/INDICE.md`.
2. Lee solo lo que tu tarea necesita:

| Si tu tarea toca… | Lee |
|---|---|
| Objetivo, requisitos, actores, flujos y restricciones del proyecto | `docs/PROYECTO.md` |
| Qué pide el concurso, fechas, entrega y premios | K00 y K01 |
| Organizadores y qué buscan (incluido pey) | K02 |
| Cobros con pey: QR, push, ligas, webhooks, errores y marca | K03 y la carpeta `pey/` (empieza en `pey/README.md`) |
| Qué es CoDi, cómo funciona, reglas de Banxico y cifras | La carpeta `codi/` (empieza en `codi/README.md`) |
| Cómo se evalúa y qué resta puntos | K08 |
| Cómo trabajar con Claude Code en Codespaces | `docs/GUIA-CODESPACES.md` y `.claude/commands/` |

3. En la descripción del PR o del commit, cita los IDs que usaste ("según K03.4…").
4. Lo marcado ⚪ no está verificado. Si necesitas un dato que no está (endpoint, campo, nombre de modelo de OpenAI, precio), **no lo inventes**: consulta la documentación oficial; si no puedes, deja `TODO(⚪): …` visible en el código y dilo.

## 3. Reglas de producto
- Todo texto visible en **español de México**. Diseño **mobile-first**: 360 px sin desplazamiento horizontal y botones de al menos 44 px.
- **La demo manda**: primero el flujo principal de punta a punta y desplegado; después lo demás.
- **Nada inventado**: sin testimonios ni cifras sin fuente. Si existe un modo de simulación de pago, la interfaz dice **"SIMULACIÓN"** de forma visible.
- **Dinero real con cuidado**: ningún cobro sin confirmación explícita de la persona y con un monto máximo en el servidor. pey solo tiene entorno de producción: en pruebas y en la demo se cobran montos de $0.01 a $1, que no se devuelven (K03.3).
- Accesible: contraste AA, etiquetas en formularios, foco visible y todo usable con teclado.

## 4. Reglas de seguridad
- Las llaves viven solo en el servidor como variables de entorno (nombres en `.env.example`). **Nunca** en el navegador, en el repo, en los logs ni en el chat.
- Las llamadas a OpenAI y a pey viven en funciones de servidor. El navegador solo habla con tu propia API.
- Verifica la firma de los webhooks de pey (K03.5). Valida entradas: montos mayores que 0, con máximo y tipos correctos.

## 5. Stack por defecto (si `docs/PRD.md` no dice otra cosa)
- Frontend: HTML + CSS + JavaScript sin framework y sin paso de build.
- Backend: Vercel Functions en Node.js 22 (ESM). Sin framework, cada archivo de `api/` es una función que exporta `GET(request)` o `POST(request)` y regresa un `Response`; el `package.json` necesita `"type": "module"` ([doc de Vercel](https://vercel.com/docs/functions/functions-api-reference)). El código compartido va **fuera** de `api/` ([doc de Vercel](https://vercel.com/docs/functions/configuring-functions/advanced-configuration)).
- Pruebas con `node:test` y `fetch` simulado: las pruebas no llaman servicios reales.
- Datos persistentes solo si el PRD los necesita; antes de montar una base de datos, intenta consultar el estado directo en pey.

## 6. Forma de trabajar
- Tareas pequeñas y verificables. Las tareas en paralelo trabajan en archivos distintos.
- Se programa con Claude Code dentro de GitHub Codespaces, con prompts; las fases tienen comandos en `.claude/commands/` (`/arrancar`, `/prd`, `/construir`, `/verificar`, `/desplegar`, `/entregar`).
- No modifiques `conocimiento/`, `pey/`, `codi/` ni `fuentes/` salvo que la tarea lo pida. Si agregas un dato, agrega su fuente en la tabla "## Fuentes" del archivo y corre `python3 scripts/unir_registros.py` y `python3 scripts/verificar_conocimiento.py`.
- Antes de terminar: corre las pruebas y revisa que el diff no tenga llaves.
- Avance, decisiones y bloqueos: `BITACORA.md`.

## 7. Definición de terminado
Una tarea está terminada cuando cumple sus criterios de aceptación, las pruebas pasan, funciona desplegada (si aplica) y hay evidencia de cómo se probó. "Creo que funciona" no es evidencia.
