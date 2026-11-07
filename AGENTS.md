# AGENTS.md

Instrucciones para Codex (web y CLI) y para cualquier agente que trabaje en este repo. Léelas completas antes de actuar.

## 1. Misión
Construir en unas 4.5 horas, dentro de `app/`, un prototipo **funcional y desplegado** para el *DevDay Exchange Community Hackathon: Mexico City* (sábado 7 de noviembre de 2026): una herramienta que use la **API de OpenAI** para acercar los **cobros CoDi sin comisión** (con la **API de Pey**) a comercios y personas. Tiene que verse y funcionar perfecto en una demo en vivo de 3 pasos.

José participa solo: él decide, aprueba y presenta. Tú construyes.

## 2. Cómo usar la base de conocimiento
1. Abre primero `conocimiento/INDICE.md`. Ahí está cada archivo y cada sección con su ID (por ejemplo `K03.4`).
2. Lee solo lo que tu tarea necesita:

| Si tu tarea toca… | Lee |
|---|---|
| Cobros CoDi, QR, webhooks de Pey | K03 |
| API de OpenAI (Responses, Realtime, Agents SDK, Apps SDK) | K04 |
| Codex web, Codespaces, Vercel, despliegue | K05 |
| Usuarios, datos y textos con contexto | K06 |
| La idea elegida, el PRD y el plan de tareas | `docs/PRD.md` (se crea el sábado) y K07 |
| Lo que califican los jueces | K08 |

3. En la descripción del PR, cita los IDs que usaste ("según K03.4…").
4. Lo marcado ⚪ no está verificado. Si necesitas un dato que no está (endpoint, campo, nombre de modelo, precio), **no lo inventes**: consulta la documentación oficial si tienes internet; si no, deja `TODO(⚪): …` visible en el código y dilo en el PR.

## 3. Reglas de producto
- Todo texto visible en **español de México**. Diseño **mobile-first**: 360 px sin desplazamiento horizontal, botones de al menos 44 px.
- **La demo manda**: primero el flujo de 3 pasos de `docs/PRD.md`, de punta a punta y desplegado; después todo lo demás.
- **Nada inventado**: sin testimonios ni cifras sin fuente. Si existe un modo de simulación de pago, la interfaz dice **"SIMULACIÓN"** de forma visible.
- **Dinero real con cuidado**: ningún cobro sin confirmación explícita de la persona; monto máximo configurable (`MAX_MONTO_MXN`). Pey solo tiene entorno de producción: en pruebas y demo se cobran montos de $0.01 a $1 (K03.3).
- Accesible: contraste AA, etiquetas en formularios, foco visible, todo usable con teclado.

## 4. Reglas de seguridad
- Las llaves viven solo en el servidor como variables de entorno (`.env.example` tiene los nombres). **Nunca** en el navegador, en el repo ni en los logs.
- Las llamadas a OpenAI y a Pey viven en funciones de servidor (`app/api/`). El navegador solo habla con `app/api/`.
- Verifica la firma de los webhooks (K03). Valida entradas: montos mayores que 0, con máximo, tipos correctos.

## 5. Stack por defecto (si `docs/PRD.md` no dice otra cosa)
- `app/` es la raíz del proyecto en Vercel.
- Frontend: HTML + CSS + JavaScript sin framework y sin paso de build (`app/index.html`, `app/css/`, `app/js/`).
- Backend: Vercel Functions en Node.js 20 o superior (ESM) en `app/api/*.js`, con `fetch` nativo; el SDK oficial `openai` solo si simplifica.
- Pruebas: archivos `*.test.js` en `app/tests/`, con `fetch` simulado (las pruebas no llaman servicios reales). Se corren con `npm test --prefix app` (`app/package.json` con `"test": "node --test"`) o con `cd app && node --test`. Ojo: en Node 22, `node --test app/tests/` falla.
- Datos persistentes solo si el PRD los necesita; antes de montar una base, intenta consultar el estado directo en Pey.

## 6. Forma de trabajar
- Tareas pequeñas y verificables: un PR por tarea, con título en español.
- No toques archivos fuera de tu tarea. Las tareas en paralelo trabajan en carpetas distintas (ver `dia-del-evento/PROMPTS-CODEX.md`).
- No modifiques `conocimiento/`, `dia-del-evento/`, `plantillas/` ni `fuentes/` salvo que la tarea lo pida.
- Antes de terminar: corre `npm test --prefix app` y revisa que el diff no tenga llaves.
- Descripción del PR: **Qué cambió · Cómo probarlo (pasos) · Variables de entorno nuevas · Pendientes ⚪ · IDs de conocimiento usados**.

## 7. Definición de terminado
Una tarea está terminada cuando cumple sus criterios de aceptación, las pruebas pasan, funciona en el preview de Vercel (si aplica) y el PR explica cómo probarla. "Creo que funciona" no es evidencia.
