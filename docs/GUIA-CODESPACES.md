# Guía: programar el proyecto con Claude Code en GitHub Codespaces

Para José. Programas **solo con prompts**: Claude Code construye y verifica; tú decides, apruebas y presentas. Todo pasa en el navegador, dentro de un Codespace del repo `jose2501106-IA/HackathonOpenAi`.

Revisada el 2026-11-07. Cada dato lleva su fuente (tabla al final); lo marcado ⚪ **no lo verifiqué**.

**Resumen:** secretos en GitHub → crear el Codespace → `claude` e iniciar sesión con tu suscripción → `/arrancar` → `/prd` → `/construir` (varias veces) → `/verificar` → `/desplegar` → `/entregar`.

## 1. Antes de empezar
- Cuenta de GitHub con acceso al repo.
- Suscripción **Claude Pro o Max**: con ella inicias sesión en Claude Code [C2].
- Llave de la API de OpenAI y llave de pey con su secreto de webhook (K03.3 en [`conocimiento/03-codi-y-api-pey.md`](../conocimiento/03-codi-y-api-pey.md) y [`pey/09-webhooks.md`](../pey/09-webhooks.md)).
- Cuenta de Vercel para desplegar.
- **Horas de Codespaces:** el plan personal GitHub Free incluye 120 horas de cómputo y 15 GB-mes de almacenamiento al mes; GitHub Pro, 180 horas y 20 GB-mes. Una máquina de 2 núcleos gasta 2 unidades por hora, así que 120 horas alcanzan para unas 60 horas de reloj. Sin método de pago, el uso se bloquea al agotar la cuota [G6]. Con la máquina de 2 núcleos basta para este proyecto (⚪ recomendación, no dato oficial).

## 2. Guarda los secretos en GitHub (una vez)
1. GitHub → tu foto → **Settings** → **Codespaces** → junto a "Codespaces secrets", **New secret** [G1].
2. Crea cada uno con su **Name** exacto y su **Value**, y en **Repository access** elige `jose2501106-IA/HackathonOpenAi` [G1]:
   - `OPENAI_API_KEY`
   - `PEY_API_KEY`
   - `PEY_WEBHOOK_SECRET`
   - Opcional: `CLAUDE_CODE_OAUTH_TOKEN` (sección 4).
3. Reglas: solo letras, números y guiones bajos; no pueden empezar con `GITHUB_` ni con número [G1].
4. Llegan como **variables de entorno** a la terminal del Codespace. Si agregas o cambias uno con el Codespace encendido, **detenlo y vuelve a iniciarlo** [G1].
5. **No crees `ANTHROPIC_API_KEY`**: si existe, Claude Code la usa antes que tu suscripción y lo cobra como API [C2].
6. Nunca pegues una llave en el chat de Claude ni en un archivo del repo. Si se te escapa una, rótala en su portal.

## 3. Crea el Codespace y abre la terminal
1. En la página del repo: **Code** → pestaña **Codespaces** → botón de crear [G2].
2. Para elegir tipo de máquina y ver los secretos recomendados, usa **New with options** (arriba a la derecha de esa pestaña) → **Create codespace** [G2]. Ahí aparecen los 4 secretos que declara [`.devcontainer/devcontainer.json`](../.devcontainer/devcontainer.json); capturarlos es opcional si ya los guardaste [G3].
3. Alternativa con la CLI: `gh codespace create -r jose2501106-IA/HackathonOpenAi` [G2].
4. La primera vez tarda unos minutos: instala Node 22, Python, GitHub CLI, Claude Code, Codex CLI y Vercel CLI.
5. Si no ves la terminal, ábrela con `` Ctrl+` `` [C1] (⚪ en el cliente web puede variar; también está en el menú Terminal).
6. Comprueba las herramientas:
   ```bash
   node --version && python3 --version && claude --version && codex --version && vercel --version && gh --version
   ```

## 4. Inicia sesión en Claude Code con tu suscripción
1. En la terminal, desde la raíz del repo (`/workspaces/HackathonOpenAi`, ⚪ ruta habitual de Codespaces): `claude`.
2. Elige iniciar sesión con tu cuenta de Claude (suscripción Pro o Max) [C2].
3. Si el navegador no se abre solo, presiona `c` para copiar el enlace de inicio de sesión y pégalo en tu navegador [C2].
4. Si después de iniciar sesión el navegador te muestra un **código**, cópialo y pégalo en la terminal donde dice `Paste code here if prompted`. Pasa en contenedores cuando el navegador no alcanza el servidor local de Claude Code [C1][C2].
5. Verás `Login successful`; presiona `Enter` [C2]. Si te pregunta si confías en la carpeta, di que sí: las reglas `allow` del repo se aplican hasta que confías; las `deny` y `ask` se aplican desde el inicio [C5].
6. Confirma con `/status` qué cuenta y método de inicio de sesión están activos [C2].

**¿Cuánto dura la sesión?** En Codespaces, `~/.claude` (donde vive tu sesión) se conserva al detener e iniciar el Codespace, pero se borra al reconstruir el contenedor [C1].

**Opcional, para no volver a iniciar sesión tras reconstruir o en otro Codespace:**
1. En una terminal del Codespace, **fuera** de una sesión de Claude: `claude setup-token`. Abre el mismo flujo del navegador y al final imprime un token de **un año**; requiere plan Pro, Max, Team o Enterprise; no lo guarda en ningún lado [C2].
2. Guárdalo como secreto de Codespaces `CLAUDE_CODE_OAUTH_TOKEN` (sección 2) y reinicia el Codespace [C1][G1].
3. Límites: ese token solo hace peticiones al modelo (no sirve para Remote Control ni conectores de claude.ai) [C2]. Mientras exista la variable, cada sesión nueva la usa aunque hagas `/login` [C2].
4. ⚪ Cómo revocar ese token no lo verifiqué.

## 5. Primer prompt
```text
/arrancar
```
Lee `docs/PROYECTO.md`, K00 y `BITACORA.md`, revisa git, versiones y si existen los secretos (sin mostrarlos) y te dice **un** siguiente paso. Úsalo al inicio de cada sesión.

## 6. El flujo con los comandos del repo
Los comandos están en [`.claude/commands/`](../.claude/commands/arrancar.md). Cada archivo `nombre.md` crea `/nombre`, y lo que escribas después del comando llega como `$ARGUMENTS` [C3]. Todos llevan `disable-model-invocation: true`: solo corren cuando tú los escribes [C3].

| Comando | Cuándo | Qué hace |
|---|---|---|
| `/arrancar` | Al abrir una sesión | Estado, tiempo restante, bloqueos y un siguiente paso |
| `/prd <problema>` | Una vez, al definir el problema | Escribe `docs/PRD.md` con criterios de aceptación, demo de 3 pasos y tareas; te pregunta lo que falte en un solo mensaje |
| `/construir [T<n>]` | Una vez por tarea | Plan corto → código → pruebas → evidencia → bitácora → commit (sin push) |
| `/verificar` | Antes de desplegar y antes de entregar | Pruebas, verificador del repo, búsqueda de llaves, reglas de producto y checklist K08.13 |
| `/desplegar <proyecto>` | Cuando el flujo principal pasa `/verificar` | Vercel: sesión, vínculo, variables, `--prod` y prueba de `GET /api/salud` |
| `/entregar` | Domingo temprano | README de entrega, guion del video, checklist K00.6 y K08.13, y pitch |

Permisos del repo ([`.claude/settings.json`](../.claude/settings.json)) [C4][C5]:
- **Sin preguntar:** pruebas, scripts de `scripts/` y `git status/diff/log/show/grep/ls-files/add/commit`.
- **Siempre pregunta:** `git push`, `git reset/restore/rebase/clean`, `vercel`, `gh`, `curl`, `wget`, `npm install`, `npx` y `rm -rf`. Una regla `ask` pregunta aunque estés en modo auto [C4].
- **Prohibido:** leer o editar `.env` y `.env.*` (salvo `.env.example`), leer `.vercel/`, `*.pem`, `*.key` y las credenciales de Claude; `printenv`, `env`, `echo` de llaves o tokens y `git push --force`. Ojo: estas reglas cubren los comandos de archivo que Claude Code reconoce (`cat`, `head`, `tail`…), no un script que abra archivos por su cuenta [C4].
- Para ver o cambiar reglas en la sesión: `/permissions` [C6].

## 7. Buenas prácticas
- **Una tarea a la vez.** `/construir T3`, revisa, y luego la siguiente.
- **Modo plan para lo delicado** (cobros, webhooks, borrar algo): `Shift+Tab` cambia de modo y uno de ellos es plan; o escribe `/plan <descripción>`. En modo plan Claude lee y propone, pero no edita hasta que apruebas el plan [C7].
- **Modos de permiso:** en Claude Code 2.1.283 o posterior la sesión arranca en modo **auto**, donde un clasificador revisa cada acción; `Shift+Tab` recorre los modos [C7]. Las reglas `ask` del repo siguen preguntando [C4].
- **`/clear` entre tareas:** empieza una conversación limpia; el estado vive en `BITACORA.md` y en git [C6].
- **`/compact`** cuando la conversación ya es larga, y **`/context`** para ver cuánto espacio ocupa [C6].
- **`/usage`** (alias `/cost`) muestra los límites de tu plan [C6].
- **Revisa los cambios** con `/diff` antes de aprobar un commit; **`/rewind`** regresa la conversación o el código a un punto anterior [C6].
- **Commits pequeños** con mensaje en español y los IDs de conocimiento usados (`AGENTS.md` §2).
- **`CLAUDE.md`** importa `AGENTS.md` con `@AGENTS.md`, porque Claude Code lee `CLAUDE.md` y no `AGENTS.md` [C8]. No necesitas `/init`: ya existe `CLAUDE.md` (`/init` solo sugeriría mejoras) [C8].
- No necesitas el modo sin interfaz (`claude -p`) para este flujo.
- **Respaldo:** Codex CLI también está instalado (`codex`). ⚪ Cómo inicia sesión dentro del Codespace no lo verifiqué hoy.

## 8. Desplegar en Vercel desde el Codespace
Lo normal es correr `/desplegar <proyecto>`. Lo que hace, por si quieres hacerlo a mano:
1. **Sesión:** `vercel login`. Desde septiembre de 2025 usa el flujo OAuth 2.0 Device: inicias sesión desde cualquier dispositivo con navegador; el inicio por correo y las opciones `--github`, `--gitlab`, `--bitbucket` y `--oob` dejaron de funcionar el 26 de febrero de 2026 [V1][V2]. Comprueba con `vercel whoami`.
2. **Vincular:** `vercel link --yes --project <nombre>` [V3]. La carpeta `.vercel/` ya está en `.gitignore`.
3. **Variables** (córrelas **tú**, en una terminal aparte, no dentro de Claude). `vercel env add` acepta el valor por la entrada estándar [V4]; así sale del secreto del Codespace sin escribirlo ni mostrarlo:
   ```bash
   printenv OPENAI_API_KEY | vercel env add OPENAI_API_KEY production
   printenv PEY_API_KEY | vercel env add PEY_API_KEY production
   printenv PEY_WEBHOOK_SECRET | vercel env add PEY_WEBHOOK_SECRET production
   vercel env ls production
   ```
   En producción el tipo por defecto es `secret` [V4]. Vercel advierte que `echo valor |` deja el valor en el historial de bash [V4]; con `printenv` el historial solo guarda el nombre.
4. **Opcional:** `vercel env pull .env.local` baja las variables a un archivo [V4] que `.gitignore` excluye y que Claude tiene prohibido leer. Para `vercel dev`, Vercel recomienda `vercel pull` [V4].
5. **Desplegar:** `vercel deploy --prod`. La salida estándar es la URL del despliegue; el primer despliegue de un proyecto nuevo siempre es de producción [V5].
6. **Probar:** `curl -sS -i https://<dominio de producción>/api/salud` debe responder 200 sin mostrar llaves.
7. **Local (opcional):** `vercel dev --listen 3000` [V6]; el puerto 3000 ya está reenviado en el Codespace.

## 9. Webhooks de pey: puerto público solo para pruebas
- Un puerto **privado** del Codespace exige autenticación de GitHub [G4], así que pey no podría entregar el webhook. Para probar en el Codespace: pestaña **PORTS** → clic derecho en el 3000 → **Port Visibility** → **Public** [G4]. La URL queda como `https://CODESPACENAME-3000.app.github.dev` [G4]. Con la CLI: `gh codespace ports visibility 3000:public -c <nombre-del-codespace>` [G5].
- Un puerto público lo puede abrir cualquiera que conozca la URL, sin autenticarse [G4]; regrésalo a privado al terminar. Una política de organización puede impedir hacerlo público [G4].
- **En la demo usa el dominio de producción de Vercel** (`https://<proyecto>.vercel.app/api/webhook-pey`), por tres razones:
  1. pey admite **un solo webhook por llave** ([`pey/09-webhooks.md`](../pey/09-webhooks.md)); si lo apuntas al Codespace, la demo en producción no recibe nada.
  2. El Codespace se detiene tras 30 minutos sin actividad (valor por defecto; ajustable de 5 a 240 minutos) y vive como máximo 12 horas [G7]; con él se apaga la URL.
  3. Con la Standard Protection de Vercel, todo excepto los dominios de producción pide autenticación, incluida la URL generada de producción [V7]; ⚪ si tu proyecto la tiene activa por defecto no lo verifiqué.
- Al cambiar la URL del webhook en el portal, revisa si cambió el secreto de firma y actualiza `PEY_WEBHOOK_SECRET` en Vercel y en Codespaces (⚪ si el secreto cambia al editar la URL no está documentado; ver [`pey/09-webhooks.md`](../pey/09-webhooks.md)).

## 10. Si algo falla
| Síntoma | Qué hacer |
|---|---|
| `claude: command not found` o falta otra herramienta | Command Palette → **Codespaces: Rebuild Container**; lo de `/workspaces` se conserva y casi todo lo demás se borra, incluida la sesión de Claude [G8][C1] |
| El inicio de sesión no regresa a la terminal | Copia el código del navegador y pégalo en `Paste code here if prompted` [C1][C2] |
| `Login expired · Please run /login` | Corre `/login` [C2] |
| Claude cobra como API o pide aprobar una llave | `unset ANTHROPIC_API_KEY`, borra ese secreto de Codespaces y revisa `/status` [C2] |
| Un secreto sale como FALTA en `/arrancar` | Revisa el nombre exacto y el acceso al repo en Settings → Codespaces; detén e inicia el Codespace [G1] |
| "Settings Error" al abrir Claude | `.claude/settings.json` es JSON estricto: sin comentarios ni comas al final [C5] |
| Llegaste al límite del plan | `/usage` para ver cuándo se libera [C6]; mientras, avanza con Codex CLI o en tareas manuales |
| El Codespace se apagó | Ábrelo de nuevo desde Code → Codespaces; tu sesión de Claude sigue ahí [C1] |
| `vercel` pide iniciar sesión otra vez | `vercel login` y `vercel whoami` [V1] |
| El webhook no llega | ¿URL de producción en el portal? ¿`PEY_WEBHOOK_SECRET` correcto y redesplegado? Revisa "Webhook Logs" en el portal (K03.5) |
| Se acabaron las horas de Codespaces | Sin método de pago, el uso se bloquea al agotar la cuota [G6]; detén los Codespaces que no uses |
| Pegaste una llave en el chat o en un archivo | Rótala en su portal de inmediato y actualiza el secreto en GitHub y en Vercel |

## 11. Biblioteca de prompts
Cópialos tal cual; cambia lo que está entre `< >`.

1. `/arrancar`
2. `/prd Quién lo vive: <persona y contexto, sin datos personales>. Qué pasa hoy: <un ejemplo real>. Qué cuesta: <tiempo, dinero o confianza>. Qué haría la app: <una frase>. Dónde entra el cobro: <quién le cobra a quién y por qué>. Qué hace la IA que un formulario no podría: <…>. Cómo aprovecha la ley: <…>. Lo creativo: <una frase>.`
3. `/plan Antes de tocar código, dime en 5 líneas cómo resolverías T<n>, qué archivos cambiarías y cómo lo vas a probar.`
4. `/construir T1`
5. `Corre las pruebas y enséñame solo las que fallan, con el error y tu hipótesis. No cambies nada todavía.`
6. `Explícame el diff de esta tarea en lenguaje simple: qué cambió, por qué y qué podría romperse.`
7. `Revisa la pantalla principal a 360 px: sin desplazamiento horizontal, botones de al menos 44 px, foco visible y textos en español de México. Corrige lo mínimo y dime cómo lo verificaste.`
8. `Implementa la verificación de firma del webhook de pey según K03.5 y pey/09-webhooks.md, con pruebas de firma válida, firma inválida y timestamp viejo.`
9. `Haz que la app funcione completa en SIMULACIÓN sin llaves, con el letrero SIMULACIÓN visible, y que GET /api/salud diga el modo sin mostrar llaves.`
10. `Esto falló: <pega el error, nunca una llave>. Dame la causa más probable, la corrección mínima y espera mi ok.`
11. `Anota en BITACORA.md la decisión "<decisión>" porque "<razón>", con la alternativa descartada, y haz commit.`
12. `/verificar`
13. `/desplegar <nombre-del-proyecto>`
14. `Prepara la prueba de cobro real de $0.01 en producción: dime paso a paso qué hago en el celular y qué revisas tú. No cobres nada sin mi sí.`
15. `/entregar`

## Fuentes
Consultadas el 2026-11-07.

| ID | Fuente | URL |
|---|---|---|
| C1 | Claude Code: Development containers | https://code.claude.com/docs/en/devcontainer |
| C2 | Claude Code: Authentication | https://code.claude.com/docs/en/authentication |
| C3 | Claude Code: Skills (los comandos de `.claude/commands/` siguen funcionando) | https://code.claude.com/docs/en/skills |
| C4 | Claude Code: Configure permissions | https://code.claude.com/docs/en/permissions |
| C5 | Claude Code: Settings files and precedence | https://code.claude.com/docs/en/settings |
| C6 | Claude Code: Commands | https://code.claude.com/docs/en/commands |
| C7 | Claude Code: Permission modes | https://code.claude.com/docs/en/permission-modes |
| C8 | Claude Code: Memory (CLAUDE.md e importaciones `@`) | https://code.claude.com/docs/en/memory |
| G1 | GitHub: Managing your account-specific secrets for GitHub Codespaces | https://docs.github.com/en/codespaces/managing-your-codespaces/managing-your-account-specific-secrets-for-github-codespaces |
| G2 | GitHub: Creating a codespace for a repository | https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository |
| G3 | GitHub: Specifying recommended secrets for a repository | https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/configuring-dev-containers/specifying-recommended-secrets-for-a-repository |
| G4 | GitHub: Forwarding ports in your codespace | https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace |
| G5 | GitHub CLI: gh codespace ports visibility | https://cli.github.com/manual/gh_codespace_ports_visibility |
| G6 | GitHub: Billing for GitHub Codespaces | https://docs.github.com/en/billing/concepts/product-billing/github-codespaces |
| G7 | GitHub: Setting your timeout period for GitHub Codespaces | https://docs.github.com/en/enterprise-cloud@latest/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces |
| G8 | GitHub: Rebuilding the container in a codespace | https://docs.github.com/en/codespaces/developing-in-a-codespace/rebuilding-the-container-in-a-codespace |
| V1 | Vercel CLI: vercel login | https://vercel.com/docs/cli/login |
| V2 | Vercel changelog: New Vercel CLI login flow (12-sep-2025) | https://vercel.com/changelog/new-vercel-cli-login-flow |
| V3 | Vercel CLI: vercel link | https://vercel.com/docs/cli/link |
| V4 | Vercel CLI: vercel env | https://vercel.com/docs/cli/env |
| V5 | Vercel CLI: vercel deploy | https://vercel.com/docs/cli/deploy |
| V6 | Vercel CLI: vercel dev | https://vercel.com/docs/cli/dev |
| V7 | Vercel: Deployment Protection | https://vercel.com/docs/deployment-protection |
| D1 | Imagen `mcr.microsoft.com/devcontainers/javascript-node` (etiqueta `22`) | https://hub.docker.com/r/microsoft/devcontainers-javascript-node |
| N1 | Versiones en npm (`npm view`): @openai/codex 0.167.0, vercel 65.12.1, @anthropic-ai/claude-code 2.1.319 | Salida de la herramienta, 2026-11-07 |
