---
description: Implementa la siguiente tarea del PRD con plan corto, código, pruebas, evidencia y commit
argument-hint: "[ID de tarea, por ejemplo T3; vacío = la primera pendiente]"
disable-model-invocation: true
---

# /construir

Tarea pedida: $ARGUMENTS

Si no viene un ID, toma la primera tarea pendiente de `docs/PRD.md`. Si no existe `docs/PRD.md`, detente y sugiere `/prd`. Haz **una sola tarea** por invocación. `AGENTS.md` manda: producto (§3), seguridad (§4), stack (§5) y definición de terminado (§7).

1. **Contexto:** lee la tarea y sus criterios de aceptación en `docs/PRD.md`, y solo los archivos de conocimiento que necesite (tabla de la sección 2 de `AGENTS.md`).
2. **Plan corto** (8 líneas o menos): archivos que vas a crear o cambiar, criterios que cumple, cómo lo vas a probar y riesgos. Si la tarea toca cobros reales, llaves, borrado de archivos, dependencias nuevas o despliegues, **detente y pide confirmación** a José. Si no, continúa.
3. **Código:** el cambio mínimo que cumple la tarea.
   - Las llamadas a OpenAI y a pey viven en `api/` (servidor); el navegador solo habla con tu API; el código compartido va fuera de `api/`.
   - Textos visibles en español de México; 360 px sin desplazamiento horizontal; botones de al menos 44 px; "SIMULACIÓN" visible cuando aplique.
   - Ningún cobro sin confirmación explícita y con monto máximo en el servidor.
   - Si te falta un dato (endpoint, campo, modelo, precio), consúltalo en `pey/`, `codi/` o la documentación oficial; si no puedes, deja `TODO(⚪): …` visible y dilo.
4. **Pruebas:** `node:test` con `fetch` simulado; las pruebas nunca llaman a OpenAI ni a pey de verdad. Agrega o ajusta pruebas para los criterios de la tarea y corre la suite completa (`npm test`, o `node --test` si no hay `package.json`). Si algo falla, corrígelo; después de 3 intentos sin éxito, detente y explica el bloqueo.
5. **Evidencia:** cuántas pruebas pasan y cuántas fallan, y cómo se probó a mano si aplica. "Creo que funciona" no es evidencia.
6. **Revisión del diff:** `git status --short` y `git diff --stat`. Confirma que solo tocaste archivos de esta tarea y que no hay llaves, `.env` ni datos personales.
7. **Bitácora:** agrega una línea al Historial de `BITACORA.md` (fecha, tarea, evidencia) y actualiza "Estado actual" y "Siguientes pasos".
8. **Commit:** `git add` solo de los archivos de la tarea y `BITACORA.md`; mensaje en español `T<n>: <qué>` con los IDs de conocimiento usados. **No hagas push**: José lo aprueba aparte.

Responde en 10 líneas o menos: qué hiciste, evidencia, hash del commit, lo que quedó ⚪ y la siguiente tarea. Recuérdale a José usar `/clear` antes de la siguiente tarea.
