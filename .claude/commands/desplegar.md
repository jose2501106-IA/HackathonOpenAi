---
description: Despliega a producción en Vercel desde el Codespace y prueba GET /api/salud
argument-hint: "[nombre del proyecto en Vercel]"
disable-model-invocation: true
---

# /desplegar

Proyecto en Vercel: $ARGUMENTS (si viene vacío, pregúntale el nombre a José).

**Llaves:** nunca las pidas, muestres, escribas ni pongas en un comando. Si José pega una llave en el chat, dile que la rote de inmediato. Cada comando `vercel`, `curl` o `gh` pide confirmación (reglas `ask` de `.claude/settings.json`): antes de correrlo, explica en una línea qué hará.

1. **Requisitos:** corre las pruebas y `python3 scripts/verificar_conocimiento.py`; si algo falla, detente. `git status --short` debe estar limpio (si no, sugiere terminar la tarea con `/construir`).
2. **Sesión de Vercel:** `vercel whoami`. Si no hay sesión, **no la inicies tú**: pide a José que, en una terminal aparte, corra `vercel login` y abra en su navegador el enlace que aparece (sección 7 de `docs/GUIA-CODESPACES.md`). Espera su "listo".
3. **Vincular:** si el directorio no está vinculado (lo dice José o lo indica la salida de `vercel`), corre `vercel link --yes --project <nombre>`.
4. **Variables:** compara los nombres de `.env.example` con `vercel env ls production`, que solo muestra nombres. Por cada faltante, pídele a José que corra **él**, en una terminal aparte, una línea como esta (el valor sale del secreto del Codespace y nunca aparece en pantalla):
   ```bash
   printenv OPENAI_API_KEY | vercel env add OPENAI_API_KEY production
   ```
   Tú no corres esas líneas. Al terminar, repite `vercel env ls production` como evidencia.
5. **Desplegar:** `vercel deploy --prod`. Guarda la URL que imprime (la salida estándar es la URL del despliegue).
6. **Probar en producción:** usa el **dominio de producción** del proyecto (por ejemplo `https://<proyecto>.vercel.app`; ⚪ si la salida no lo muestra, pídeselo a José). Corre `curl -sS -i https://<dominio>/api/salud` y espera HTTP 200 con un JSON que diga el modo y si hay llaves, sin mostrarlas (P7 de `docs/PROYECTO.md`). Si la ruta no existe, márcalo ✗ y propónla como tarea para `/construir`.
7. **Webhook de pey:** recuérdale a José que pey acepta un solo webhook por llave (`pey/09-webhooks.md`), así que debe apuntar a `https://<dominio de producción>/api/webhook-pey`; el secreto de firma que muestre el portal se guarda como `PEY_WEBHOOK_SECRET` en Vercel y en Codespaces. Después de cambiar variables, vuelve a desplegar (⚪ que los cambios de variables solo apliquen a despliegues nuevos no lo verifiqué).
8. **Prueba de punta a punta** (dinero real: solo con el "sí" explícito de José): cobro de $0.01 a $1 (K03.3) pagado desde el celular; revisa que llegue el webhook ("Webhook Logs" en el portal, K03.5) y que la app cambie de estado.
9. **Bitácora:** anota en `BITACORA.md` la URL de producción, el commit desplegado (`git log -1 --oneline`), el resultado de `/api/salud` y el de la prueba de punta a punta; haz commit.

Responde con: URL de producción, evidencia (código HTTP y cuerpo resumido), estado del webhook y pendientes ⚪.
