---
id: K05
titulo: "Trabajar 100% en la nube: Codex (web y CLI), ChatGPT + GitHub, Codespaces y Vercel"
resumen: "Cómo se usa hoy Codex en la nube (entorno, secretos, internet, AGENTS.md, tareas en paralelo, PRs y límites de Plus), Codex CLI en Codespaces, ChatGPT leyendo el repo, previews de Vercel y el flujo recomendado para el sábado; léelo antes de lanzar la primera tarea."
responde:
  - "¿Dónde está hoy Codex web y cómo conecto GitHub y creo el entorno?"
  - "¿Qué ve el agente de Codex: variables, secretos e internet, y en qué fase?"
  - "¿Cómo lee Codex AGENTS.md (anidados, precedencia, tamaño máximo)?"
  - "¿Cómo pregunto sin cambiar código, lanzo tareas en paralelo, pido varias versiones y creo el PR?"
  - "¿Cuánto puedo usar Codex con ChatGPT Plus?"
  - "¿Cómo instalo y autentico Codex CLI en GitHub Codespaces y uso codex exec?"
  - "¿Funciona la extensión de Codex para VS Code dentro de Codespaces?"
  - "¿Cómo hago que ChatGPT web lea mi repo de GitHub y cuándo conviene un MCP propio?"
  - "¿Cómo funcionan los previews de Vercel por PR y el puerto público de Codespaces para webhooks?"
  - "¿Cómo escribo buenas tareas para Codex y cuál es el flujo del sábado?"
actualizado: 2026-11-07
confianza: media
fuentes: [SC01, SC02, SC22, SC25, SC33, SC34, SC35, SC36, SC37, SC38, SC39, SC40, SC41, SC42, SC43, SC44, SC45, SC46, SC47, SC48, SC49, SC50, SC51, SC52, SC53, SC54, SC55, SC56, SC57, SC58, SC59, SC60, SC61, SC62, SC63, SC64, SC65]
---

# K05 · Codex, ChatGPT y Codespaces: flujo 100% en la nube

## TL;DR

- Codex en la nube vive dentro de ChatGPT: "Work in" › "Cloud" › "Select environment" › "Create environment"; el entorno debe estar publicado ("Environment published") antes de lanzar tareas [SC34, SC37].
- Con Plus, mensajes locales y tareas cloud comparten la bolsa de 5 horas (GPT-6.1 Sol: 15–160 mensajes); una tarea cloud gasta más; cada tarea corre en una VM de 2 vCPU y 8 GiB. Tablero: chatgpt.com/codex/settings/usage [SC44, SC34].
- En la experiencia nueva los secretos son "HTTP secrets": el programa ve un placeholder y el proxy pone el valor real sólo hacia dominios HTTPS permitidos; en Legacy, los secretos sólo existen durante el setup [SC34, SC35].
- AGENTS.md: uno por carpeta, de la raíz a la carpeta de trabajo; el más cercano prevalece; tope combinado de 32 KiB [SC43].
- Codespaces: `npm install -g @openai/codex` y `codex login --device-auth` (antes activa "Device code authorization" en Settings › Security de ChatGPT). La extensión de VS Code falla al iniciar sesión en Codespaces (issue #6403): usa la terminal [SC50, SC49, SC53].
- Vercel comenta en cada PR su URL de preview; los cambios de variables sólo aplican tras un redeploy [SC60, SC61].

## K05.1 · Qué es hoy "Codex web": experiencia nueva vs. Legacy

- **9 jul 2026:** la app de escritorio de Codex se fusionó con la de ChatGPT, con pestañas Chat, Work y Codex [SC47, SC63].
- **29 sep 2026 (DevDay):** relanzamiento de Codex Cloud: las tareas siguen con la laptop cerrada y se revisan desde web, celular o escritorio; cada tarea tiene su propio espacio de trabajo [SC33, SC02]. Está en Plus, Pro, Business, Enterprise, Edu y Healthcare [SC02]; no en Free ni Go [SC37].
- **Cómo entrar (experiencia nueva):** en ChatGPT web o escritorio, "Work in" › "Cloud" › "Select environment"; o Settings › Codex Cloud › Environments [SC34]. Un tutorial del 11 oct entra por el menú de tres puntos de la barra lateral › "Codex" [SC39]; otro del 30 sep arranca en chatgpt.com/codex [SC40].
- **Codex Cloud (Legacy):** entornos en chatgpt.com/codex/settings/environments; todavía da servicio a Code Review y a las integraciones con GitHub y Linear. OpenAI planea deprecarlo, sin fecha publicada [SC35, SC34].
- **Uso y límites:** chatgpt.com/codex/settings/usage [SC44].
- **Cambios en curso:** desde diciembre, Plus, Pro y Business comparten una sola bolsa entre ChatGPT y Codex; un grupo pequeño prueba la fusión de Chat y Work [SC46].
- Las etiquetas de este archivo van en inglés; si tu ChatGPT está en español pueden verse traducidas (⚪ no verificado).

**Recomendación:** hoy en la noche abre chatgpt.com/codex y anota qué interfaz ves (nueva o Legacy) y dónde se eligen entorno y rama. Si difiere de lo que dice `dia-del-evento/PROMPTS-CODEX.md`, corrígelo ahí antes de dormir.

## K05.2 · Conectar GitHub y crear el entorno

Experiencia nueva:
1. "Work in" › "Cloud" › "Select environment" › "Create environment" [SC34].
2. Elige los repos; si lo pide, conecta GitHub. Sólo github.com: ni GitLab ni GitHub Enterprise Server [SC37]. Según una guía de terceros, la GitHub App se llama "ChatGPT Codex Connector" [SC56].
3. "Get started": Codex revisa el repo, instala dependencias y herramientas y prueba el flujo; te pregunta lo que falte [SC34].
4. Revisa el reporte de setup, la configuración y los archivos; guarda y selecciona "Publish"; espera "Environment published" [SC34]. Con la etiqueta "Unpublished" no se pueden lanzar tareas [SC37].
5. "Start a new task" [SC34]. Para cambiar el entorno: menú "..." › "Edit" › "Republish" [SC38].

- **Privacidad:** "Privacy" › "Who can use" ("Only me" o tu workspace) [SC34].
- **Recursos en Plus:** 2 vCPU, 8 GiB de RAM y 8 GiB de disco por tarea [SC34].
- **Estado guardado:** archivos, cambios sin commit y herramientas de una tarea se recuperan hasta 7 días después del último turno; no sustituye a git [SC34].
- **Legacy** [SC35]: entornos en chatgpt.com/codex/settings/environments; instala dependencias solo si usas npm, yarn, pnpm, pip, pipenv o poetry; imagen base `universal`; "Set package versions" fija versiones de runtime.

**Recomendación:** crea y publica el entorno HOY, con el repo ya en GitHub, para que el sábado sólo lances tareas. Como `app/` estará vacío, díselo en el setup: "Node 22; las pruebas se correrán con `npm test --prefix app`".

## K05.3 · Install script, variables y secretos: qué ve el agente y cuándo

**Experiencia nueva** [SC34, SC38]:
- "Install script": comandos que instalan dependencias; Codex puede grabar el setup que ya probó.
- "Start skill": instrucciones para arrancar servicios y comprobar que están listos.
- "Environment variables": se pasan directo a los programas; la doc no detalla por fase (⚪ no verificado).
- "HTTP secrets" (o "network secret"): el programa ve un placeholder y el proxy pone el valor real sólo en peticiones HTTPS (puerto 443) a dominios permitidos, tanto en setup como en tareas. Guardar uno agrega su dominio a la lista permitida [SC34]. Campos "Key", "Value" y "Allowed domains"; el "Personal vault" está en Settings › Codex Cloud [SC38].

**Legacy** [SC35]:
- El setup script corre en otra sesión de Bash: un `export` no llega al agente (usa `~/.bashrc` o variables del entorno).
- El "maintenance script" corre al reanudar un contenedor en caché; la caché dura hasta 12 horas.
- Variables: viven en el setup y en la fase del agente. Secrets: sólo en el setup; se borran antes de la fase del agente.
- Cambiar scripts, variables o secretos invalida la caché; existe "Reset cache".

**Recomendación:** el repo es público: ninguna llave en archivos ni en AGENTS.md. Las pruebas usan `fetch` simulado (AGENTS.md), así que Codex no necesita llaves reales. Si una tarea de verdad debe llamar a OpenAI o a Pey, usa HTTP secrets con el dominio exacto (`api.openai.com`; el de Pey según K03).

## K05.4 · Internet del agente y dominios permitidos

**Experiencia nueva** [SC34]:
- "Enable all public internet access": acceso total; desactiva los controles finos.
- "Enable package manager domains": lista preestablecida (npm, PyPI, Rust, Go, Maven/Gradle, apt, GitHub y otros).
- "Additional allowed domains": hosts específicos; cada subdominio va aparte (el dominio raíz incluye `www`).
- La doc no dice los valores por defecto (⚪ no verificado). Tutoriales de terceros muestran otras etiquetas: "Allow Codex to access internet" y, en "Allow domains", "Package managers", "Custom domains only" o "All (unrestricted)" [SC37, SC38].
- La VPN (Tailscale) es independiente del internet público [SC34].

**Legacy** [SC36]: el agente no tiene internet por defecto (el setup sí); opciones "Off" y "On"; listas "None", "Common dependencies" y "All (unrestricted)"; se recomienda permitir sólo GET, HEAD y OPTIONS.

**Riesgos** [SC36]: prompt injection desde contenido web, fuga de código o secretos, dependencias maliciosas y problemas de licencia. El ejemplo oficial es un issue de GitHub con instrucciones ocultas que mandan el último commit a un servidor externo.

**Recomendación:** activa sólo package managers más los dominios exactos que la tarea necesite (por ejemplo, la documentación de OpenAI y la de Pey). Nunca "All". Como el repo es público, no le pidas a Codex leer issues ni PRs de desconocidos.

## K05.5 · AGENTS.md: cómo lo lee Codex

[SC43]
- Codex lee los AGENTS.md antes de trabajar y arma la cadena una vez por ejecución.
- **Global:** en `~/.codex` usa `AGENTS.override.md` o, si no existe, `AGENTS.md` (el primero que no esté vacío).
- **Proyecto:** recorre de la raíz (normalmente la raíz de git) hasta la carpeta actual. En cada carpeta busca `AGENTS.override.md`, luego `AGENTS.md`, luego los nombres de `project_doc_fallback_filenames`, y toma como máximo uno.
- **Precedencia:** se concatenan de la raíz hacia abajo; los más cercanos quedan al final y prevalecen. Los vacíos se ignoran.
- **Tamaño:** tope combinado de 32 KiB (`project_doc_max_bytes`); al llegar, deja de agregar archivos. Se arregla subiendo el límite o repartiendo instrucciones en carpetas.
- **Verificar (CLI):** `codex --ask-for-approval never "Summarize the current instructions."` desde la raíz.
- Si las mismas reglas aplican en tareas cloud: la página no lo dice (⚪ no verificado).

**Recomendación:** mantén el `AGENTS.md` raíz por debajo de 16 KB (lo revisa `scripts/verificar_conocimiento.py`) y que apunte a `conocimiento/INDICE.md` en lugar de copiar la base. Si `app/` necesita reglas propias, un `app/AGENTS.md` corto. En la primera tarea pide "resume las instrucciones que leíste" para confirmar que se cargó.

## K05.6 · Preguntar vs. codificar, tareas en paralelo y varias versiones

- **En paralelo:** varias tareas pueden partir del mismo entorno publicado, cada una con su propio estado; la doc no publica un tope [SC34] (⚪ no verificado).
- **Preguntar vs. codificar:** la doc de la experiencia nueva no describe botones "Ask" y "Code"; su maqueta muestra un cuadro "Do anything" y la etiqueta "Approve for me", sin explicarlos [SC33]. Que la interfaz anterior tenga "Ask" y "Code": ⚪ no verificado hoy.
- **Varias versiones:** en la CLI, `codex cloud exec --env ENV_ID --attempts 3 "…"` pide de 1 a 4 intentos (best-of-N); el subcomando se describe como experimental [SC41, SC40]. Según terceros, la web muestra los intentos lado a lado y no los califica: tú eliges [SC41]. Selector de versiones en la web: ⚪ no verificado.
- **Costo:** una tarea cloud puede gastar más de la bolsa que un mensaje local [SC44]; pedir varias versiones probablemente multiplica el gasto (⚪ no verificado).

**Recomendación:** para preguntar sin cambios, empieza el prompt con "Solo lee y responde; no modifiques archivos ni abras PR". En paralelo, sólo tareas que tocan archivos distintos (tabla de dueños en `dia-del-evento/PROMPTS-CODEX.md`). Una versión por tarea, salvo la de interfaz si te sobra límite.

## K05.7 · Revisar, dar seguimiento y crear el PR

- Al terminar una tarea revisas cambios y resultados de pruebas, pides ajustes en la misma tarea y haces commit o abres un PR desde ella [SC33]. El PR se puede crear sin bajar los cambios a tu máquina [SC42].
- **Botón del PR:** nombre exacto ⚪ no verificado. Alternativa de un tutorial: escribir en la tarea "create a pr" y abrir el enlace que devuelve [SC39].
- **Seguimiento:** la misma tarea conserva archivos, cambios sin commit y herramientas instaladas [SC34]. En una tarea nueva, vuelve a plantear el problema completo [SC39].
- **Qué revisar:** que los archivos cambiados correspondan a lo pedido y que las pruebas cubran el problema [SC39].
- **Merge:** es una acción aparte, en GitHub [SC39].
- **Desde la terminal:** `codex apply TASK_ID` aplica el diff de una tarea cloud con `git apply` y falla si hay conflictos [SC42].
- Si un seguimiento actualiza el mismo PR o abre otro: ⚪ no verificado.

**Recomendación:** en cada prompt pide el título del PR y la plantilla de descripción de AGENTS.md (Qué cambió · Cómo probarlo · Variables nuevas · Pendientes ⚪ · IDs). Fusiona con "Squash and merge" sólo después de probar el preview.

## K05.8 · Code Review de Codex en PRs

- **DevDay 2026:** Code Review suma resúmenes, diffs y preguntas en la interfaz de revisión, y las revisiones automáticas pueden correr en la nube [SC01]; en la app de escritorio permite revisar antes de comentar en PRs de GitHub [SC02].
- La revisión en GitHub todavía usa los entornos Legacy [SC35]. Sólo las revisiones hechas en GitHub cuentan como uso de Code Review; las locales cuentan contra tu límite general [SC44].
- Según un tercero, la auto-revisión revisa PRs nuevos en los repos donde está habilitada [SC55].
- Cómo se activa (pantalla, interruptor por repo) y si basta mencionar a Codex en un comentario del PR: ⚪ no verificado.

**Recomendación:** no dependas de esto el sábado; la revisión de 3 minutos de `dia-del-evento/PROMPTS-CODEX.md` (sección 4) más el preview bastan. Si quieres presumirlo, pruébalo hoy en un PR de prueba y anota los pasos reales.

## K05.9 · Límites de uso con ChatGPT Plus

[SC44]
- Plus incluye Codex en web (cloud), CLI, extensión del IDE, iOS y app de escritorio.
- **Mensajes locales por 5 horas** (estimaciones, no límites fijos): GPT-6 Astra 5–45; GPT-6.1 Sol 15–160; GPT-6.1 Terra 35–285; GPT-6 Sol 15–150; GPT-6 Luna 350–3,000.
- Las tareas cloud comparten esa bolsa y pueden gastar más; también puede haber límites semanales.
- **Al llegar al límite:** el turno en curso puede terminar; después compras créditos o usas una API key a tarifa de API.
- **Créditos en Plus:** GPT-6.1 Sol consume 50 créditos por 1M de tokens de entrada y 250 por 1M de salida.
- La ventana de 5 horas aplica a Plus desde el 25 ago 2026 [SC45]. Desde diciembre la bolsa se comparte con ChatGPT [SC46].
- **Tablero:** chatgpt.com/codex/settings/usage.

**Recomendación:** en Codex usa GPT-6.1 Sol (o Terra para tareas mecánicas) y deja Astra para una o dos tareas difíciles. Revisa el tablero antes de cada oleada; si va bajo, sigue el orden de `dia-del-evento/PROMPTS-CODEX.md` (primero las tareas 2 y 3). Ten la API key lista como respaldo (K05.10).

## K05.10 · Codex CLI en GitHub Codespaces: instalar y entrar

- **Devcontainer del repo:** `.devcontainer/devcontainer.json` usa la imagen de Node 22, instala `@openai/codex` y `vercel` al crear el Codespace y declara los secretos `OPENAI_API_KEY` y `PEY_API_KEY` (dato del archivo del repo; ⚪ no lo probé en un Codespace).
- **Instalar a mano:** `npm install -g @openai/codex` [SC50].
- **Login sin navegador local:** `codex login --device-auth` muestra un enlace (auth.openai.com/codex/device) y un código de un solo uso que dura unos 15 minutos [SC49]. Antes activa en ChatGPT › Settings › Security el interruptor "Device code authorization"; en workspaces administrados lo activa el admin [SC49]. El issue #6403 confirma ese requisito [SC53].
- **Alternativa:** API key con `CODEX_API_KEY` o `codex login --with-api-key`; se cobra a tu saldo de API, no a Plus [SC52, SC48].
- **Credenciales:** quedan en `~/.codex/auth.json` (texto plano) o en el llavero del sistema, según `cli_auth_credentials_store` [SC48]. Están fuera del repo: no las copies a él.
- **Probar:** `codex "list the files in the current directory"` [SC49].
- **Versión:** el devcontainer anota `@openai/codex` 0.167.0 en npm el 6 nov; una guía de terceros documenta la 0.166.0 [SC52].

```bash
npm install -g @openai/codex    # el devcontainer de este repo ya lo hace
codex --version
codex login --device-auth       # abre el enlace en otra pestaña y escribe el código
codex "Resume en 5 viñetas qué hay en conocimiento/INDICE.md"
```

## K05.11 · `codex exec` y tareas cloud desde la terminal

- `codex exec "tarea"` corre sin interacción: "By default, `codex exec` runs in a read-only sandbox." [SC51]
- **Para editar:** `--sandbox workspace-write`, o `--approve-for-me` (las aprobaciones pasan por revisión automática con ese sandbox). `--full-auto` ya no existe. `--sandbox danger-full-access` sólo en contenedores aislados [SC51].
- **Salida:** el progreso va a stderr y el mensaje final a stdout. `--json` da eventos JSONL (`thread.started`, `turn.completed`, `turn.failed`, `item.*`, `error`); `-o archivo` guarda el mensaje final; `--output-schema schema.json` obliga a cumplir un JSON Schema [SC51].
- **Retomar:** `codex exec resume --last "…"` [SC51].
- **API key sólo para esa ejecución:** `CODEX_API_KEY=… codex exec --json "…"`; no la pongas como variable de todo el job en workflows que corren código del repo [SC51].
- `--skip-git-repo-check` sólo si el entorno es seguro. En GitHub Actions se recomienda `openai/codex-action@v1` [SC51].
- **Cloud desde la CLI (experimental):** `codex cloud exec --env ENV_ID --attempts 2 "…"`, `codex cloud list --env ENV_ID --json`, `codex cloud diff TASK_ID` y `codex apply TASK_ID` [SC41, SC42].

```bash
# Revisión de solo lectura del código ya bajado en el Codespace
codex exec "Revisa app/api/ contra AGENTS.md y lista riesgos de seguridad" -o revision.md

# Arreglo con permiso de escritura dentro del workspace
codex exec --sandbox workspace-write "Haz que npm test --prefix app pase sin tocar app/js/contrato.js"
```

## K05.12 · Extensión de Codex para VS Code en Codespaces (issue #6403)

- **Título del issue:** "Unable to complete OAuth login for Codex extension when using github.dev / Codespaces" [SC53].
- **Síntoma:** tras iniciar sesión, el navegador redirige a `localhost:1455`, que el entorno remoto no alcanza. Con varios contenedores el puerto se remapea (por ejemplo, a 1456) y el callback falla. Hay reportes de que la versión 0.4.50 se queda cargando en Codespaces [SC53].
- **Salidas reportadas:** `codex login --device-auth` en la terminal y recargar el workspace (a unos les funcionó al recargar, a otros hasta reiniciar); habilitar antes el código de dispositivo; reenviar el puerto 1455; usar API key [SC53].
- En un issue parecido (#5673, Remote-SSH) un mantenedor remitió al login por código de dispositivo [SC54].
- **Estado actual (abierto o cerrado):** ⚪ no verificado: la página no lo mostró y la API de GitHub no estaba disponible desde esta sesión.

**Recomendación:** no dependas de la extensión. Usa la CLI en la terminal del Codespace; si quieres el panel, haz primero el device auth en la terminal y luego recarga la ventana.

## K05.13 · ChatGPT web + GitHub: plugin de GitHub

- **Nombres:** desde el 9 jul 2026 los conectores se llaman "apps" y viven dentro de plugins (Plugin Directory) [SC57]; por eso la ruta vieja Settings › Connectors ya no existe [SC25].
- **Conectar** (guía de terceros, 1 nov): Settings › Plugins › GitHub → iniciar sesión → instalar la GitHub App "ChatGPT Codex Connector" en tu cuenta u organización y elegir repos. Los repos tardan unos 5 minutos en aparecer, más en el índice de búsqueda de GitHub [SC56].
- **Qué hace:** busca y lee código, READMEs y docs de los repos permitidos con consultas a GitHub, sin copia sincronizada. No crea issues, ramas ni PRs: para eso está Codex [SC56, SC55].
- **Modos:** chat, deep research o agente/Work, según plan y cuenta [SC56].
- **Plan:** un tercero dice que el lector llegó primero a Plus, Pro y Team [SC55]; otro dice que OpenAI no publica la lista [SC56] (⚪ no verificado en fuente oficial).

**Recomendación:** pruébalo hoy con una pregunta que sólo se responda leyendo `conocimiento/INDICE.md`. Como depende del índice de búsqueda de GitHub, lo recién subido puede tardar: si ChatGPT no encuentra un archivo, pega su texto o adjunta el `TODO-EN-UNO.md` que menciona el índice.

## K05.14 · Servidores MCP propios y modo desarrollador en Plus

- **Agregar un servidor (doc oficial):** chatgpt.com/plugins → "+" → "Add custom MCP server" → nombre y URL con `/mcp` (o "Tunnel") → autenticación → "I understand and want to continue" → "Create as a plugin" → revisar herramientas → instalar → chat nuevo → `@` [SC22].
- **Requisito:** endpoint HTTPS público con streamable HTTP, o un Secure MCP Tunnel [SC22].
- **Modo desarrollador:** según un tercero (1 oct), Settings › Security and login › "Developer mode"; si en Plugins › "Add" aparece "Create MCP App", ya está activo; sólo en web; Plus, Pro, Business, Enterprise y Edu, no Free [SC25]. Otro tercero dice que ya no hace falta [SC59]. La doc oficial no lo menciona (⚪ no verificado).
- **Autenticación y escrituras:** OAuth, sin autenticación o mixta. Las herramientas que no estén marcadas como de sólo lectura piden confirmación; puedes aprobarlas para el resto de la conversación [SC25]. OpenAI lo describe como "powerful but dangerous" [SC25].

**Recomendación:** para que ChatGPT lea el repo no necesitas MCP: basta el plugin de GitHub (K05.13). Un MCP propio sólo si el producto se demuestra dentro de ChatGPT (K04.11).

## K05.15 · Servidor MCP remoto oficial de GitHub

- **URL:** `https://api.githubcopilot.com/mcp/` (variante insiders: `/mcp/insiders`) [SC58].
- **Autenticación:** OAuth (cada host debe configurar su GitHub App u OAuth App) o un PAT en el encabezado `Authorization: Bearer …` [SC58].
- **Herramientas por defecto:** context, repos, issues, pull_requests y users [SC58].
- **Hosts con guía de instalación:** VS Code, Copilot CLI, Claude, Codex, Cursor, Windsurf, Zed y otros; ChatGPT no aparece [SC58].
- **Con ChatGPT:** ChatGPT ofrece OAuth, sin autenticación o mixta, sin un campo documentado para un encabezado Bearer [SC25], así que la conexión directa queda ⚪ no verificada. Un intermediario (AnythingMCP) la hace guardando un PAT y exponiendo OAuth; apaga por defecto cuatro herramientas de escritura: merge, push, crear o actualizar archivo y borrar archivo [SC59].

**Recomendación:** mañana no lo uses en ChatGPT. Si necesitas que Codex CLI consulte issues o PRs, configúralo en Codex con un PAT fine-grained de sólo lectura (⚪ no verifiqué los pasos en Codex).

## K05.16 · Vercel + GitHub: previews por PR y variables

[SC60, SC61]
- Vercel despliega cada push por defecto, incluidas las ramas de PR. El último push de cada PR recibe una URL de preview única que Vercel publica como comentario en el PR.
- Push o merge a la rama de producción (normalmente `main`) actualiza los dominios de producción; revertir restaura al instante el deploy anterior.
- Los PRs desde forks piden autorización (protege variables). Para importar un repo personal debes ser Owner.
- **Variables por entorno:** Production, Preview (todas las ramas que no son de producción, o una rama específica que sobrescribe) y Development (`vercel env pull`). Tipos: Config o Secret; un Secret ya no se puede leer después de guardarlo.
- **Los cambios a variables sólo aplican a deploys nuevos:** haz Redeploy.
- Tope de 64 KB de variables por deploy. Variables de sistema útiles: `VERCEL_GIT_PULL_REQUEST_ID` y `VERCEL_GIT_COMMIT_REF`.
- **Funciones sin framework (verificado el 7-nov):** cada archivo de `api/` es una función; se escribe `export function GET(request) { return new Response(...) }` y el `package.json` necesita `"type": "module"` (o archivos `.mjs`) [SC65]. Vercel no convierte en función los **archivos** de `api/` que empiezan con `_` o `.` o terminan en `.d.ts`, y recomienda poner el código compartido **fuera** de `api/` e importarlo desde la función [SC64]. Por eso el código compartido de la app vive en `app/lib/`.
- ⚪ No verificado hoy: el ajuste "Root Directory = `app`"; que los previews pidan sesión de Vercel.

**Recomendación:** antes del primer PR carga en Production y Preview las variables de `.env.example` (`OPENAI_API_KEY`, `OPENAI_MODEL`, `PEY_API_KEY`, `PEY_WEBHOOK_SECRET`, `MAX_MONTO_MXN`, `MODO_PAGO`; la tabla por entorno está en `dia-del-evento/CHECKLIST.md`), con las llaves como Secret. Abre un preview en incógnito para ver si pide sesión; la demo, en la URL de producción.

## K05.17 · Codespaces: puerto público para webhooks

[SC62]
- Pestaña PORTS → "Add port" → número. El devcontainer de este repo ya reenvía el 3000.
- **Hacerlo público:** clic derecho en el puerto → "Port Visibility" → "Public". "Private to Organization" requiere GitHub Team o Enterprise Cloud.
- **URL:** `https://CODESPACENAME-PORT.app.github.dev`.
- **Por defecto es privado:** para entrar a un puerto privado se necesita el `GITHUB_TOKEN` (encabezado `X-Github-Token`); los públicos no piden autenticación. El token cambia al reiniciar el Codespace.
- **CLI:** `gh codespace ports visibility 3000:public` (acepta varios: `80:private 3000:public`).
- Cambiar un puerto público a HTTPS lo vuelve privado.
- **Riesgo:** "anyone who knows the URL and port number can view the running application".
- Si la visibilidad se reinicia al detener el Codespace: ⚪ no verificado.

**Recomendación:** úsalo sólo como plan B para webhooks de Pey (verifica la firma, K03) y regresa el puerto a privado al terminar. En la demo usa el dominio de producción de Vercel: si el Codespace se suspende, deja de recibir webhooks (⚪ no verificado).

## K05.18 · Cómo escribir tareas para Codex

**Recomendación** (práctica propia, apoyada en las fuentes citadas):
- **Tamaño:** una tarea = un resultado verificable, pocos archivos y dueños claros (tabla de `dia-del-evento/PROMPTS-CODEX.md`). Si el PR no se revisa en 3 minutos, pártela.
- **Contexto con rutas:** qué leer (`AGENTS.md`, `conocimiento/INDICE.md` y la sección exacta, como `K04.15`), qué crear o editar y qué no tocar.
- **Criterios de aceptación verificables:** comandos y resultados esperados (`npm test --prefix app` pasa; monto 0 responde 400).
- **Pruebas:** pide pruebas nuevas con `fetch` simulado y que el registro muestre su salida; Codex reporta resultados de pruebas al terminar [SC33]; revisa que cubran el problema [SC39].
- **Escribe como si fuera local:** describe la tarea igual que en tu máquina [SC37]; en una tarea nueva da otra vez el contexto completo [SC39].
- **Sin datos inventados:** si falta un dato, `TODO(⚪)` visible (AGENTS.md).
- **Entrega:** título del PR y plantilla de descripción.

```text
Objetivo: [una frase con el resultado visible]
Lee: AGENTS.md, conocimiento/INDICE.md y conocimiento/04-openai-api-nov-2026.md (K04.15).
Crea o edita SOLO: app/api/agente.js, app/api/_lib/agente.js, app/tests/agente.test.js
No toques: app/js/contrato.js, app/api/_lib/config.js, conocimiento/
Criterios de aceptación:
- [ ] POST /api/agente con {"mensaje":"cóbrale 20 a Ana por pan"} PROPONE {monto: 20, concepto: "pan"} sin cobrar
- [ ] Monto <= 0 o > MAX_MONTO_MXN responde 400 con mensaje en español
- [ ] npm test --prefix app pasa (fetch simulado; cero llamadas reales)
Entrega: PR "[T3] Agente con Responses API" con Qué cambió · Cómo probarlo · Variables nuevas · Pendientes ⚪ · IDs usados.
```

## K05.19 · Flujo recomendado para el sábado

**Recomendación** (alineado con `dia-del-evento/PROMPTS-CODEX.md`; los horarios finos van en el runbook del día):

- **Hoy en la noche:** API key con saldo (K04.13); entorno de Codex creado y publicado (K05.2); plugin de GitHub conectado en ChatGPT (K05.13); "Device code authorization" activado (K05.10); Vercel ligado al repo con variables cargadas (K05.16); un Codespace creado una vez.

1. **ChatGPT → PRD (T+0:00 a 0:20):** con el plugin de GitHub leyendo `conocimiento/`, pide un PRD de una página (problema, persona, demo de 3 pasos, fuera de alcance) con la plantilla de `plantillas/` y guárdalo como `docs/PRD.md`.
2. **PRD → tareas:** pide a ChatGPT llenar los marcadores de los prompts de `dia-del-evento/PROMPTS-CODEX.md` con el PRD.
3. **Codex:** Tarea 0 (sólo lectura) como prueba de humo; Tarea 1 sola (esqueleto, modo SIMULACIÓN y primer deploy); al fusionarla, tareas 2 a 5 en paralelo.
4. **PR → preview:** en cada PR, Vercel comenta la URL; prueba en el celular con los pasos del PR; si falla, seguimiento en la misma tarea (K05.7).
5. **Merge:** "Squash and merge"; espera el deploy de producción y prueba la demo completa.
6. **Oleada 3:** tareas 6 a 8 (pruebas de punta a punta, pulido y deck).
7. **Congelar:** la última hora sin funciones nuevas; ensaya en la URL de producción y graba un video de respaldo.

- **Plan B:** si Codex web falla o se acaba el límite, Codespace + Codex CLI (`codex exec --sandbox workspace-write`, K05.11) o API key [SC44, SC51].

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SC01 | DevDay 2026 announcements and developer resources (OpenAI Developer Community) | https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006 | 2026-11-06 |
| SC02 | OpenAI DevDay 2026 Recap: Everything Announced and What Developers Should Do (nocode.mba) | https://www.nocode.mba/articles/openai-devday-2026-recap | 2026-11-06 |
| SC22 | Connect and test your plugin (OpenAI) | https://developers.openai.com/plugins/deploy/connect-chatgpt | 2026-11-06 |
| SC25 | ChatGPT Developer Mode: Where It Is and How to Turn It On (Carly) | https://www.usecarly.com/blog/chatgpt-developer-mode/ | 2026-11-06 |
| SC33 | Codex Cloud (learn.chatgpt.com) | https://learn.chatgpt.com/docs/cloud | 2026-11-06 |
| SC34 | Cloud environments (learn.chatgpt.com) | https://learn.chatgpt.com/docs/environments/cloud-environments | 2026-11-06 |
| SC35 | Codex Cloud (Legacy) (learn.chatgpt.com) | https://learn.chatgpt.com/docs/environments/cloud-environment | 2026-11-06 |
| SC36 | Codex Cloud (Legacy): internet access (learn.chatgpt.com) | https://learn.chatgpt.com/docs/cloud/internet-access | 2026-11-06 |
| SC37 | How to use Codex Cloud (Flavio Copes) | https://flaviocopes.com/codex-cloud/ | 2026-11-06 |
| SC38 | How to Use Codex Cloud Reusable Environments (Developers Digest) | https://www.developersdigest.tech/blog/codex-cloud-reusable-environments | 2026-11-06 |
| SC39 | Codex Cloud Tutorial: Setup, GitHub & Your First PR (proflead) | https://proflead.dev/posts/codex-cloud-tutorial/ | 2026-11-06 |
| SC40 | Codex Cloud (2026): How It Works, Limits, Always-On Options (Agent37) | https://www.agent37.com/blog/codex-cloud | 2026-11-06 |
| SC41 | Codex Cloud Exec Best-of-N: Running Multiple Solution Attempts (Daniel Vaughan) | https://codex.danielvaughan.com/2026/04/01/codex-cloud-exec-best-of-n-attempts/ | 2026-11-06 |
| SC42 | Codex Cloud Task Application: From Slack Dispatch to Reviewed Diff Merge (Daniel Vaughan) | https://codex.danielvaughan.com/2026/04/08/codex-cloud-task-application/ | 2026-11-06 |
| SC43 | Custom instructions with AGENTS.md (learn.chatgpt.com) | https://learn.chatgpt.com/docs/agent-configuration/agents-md | 2026-11-06 |
| SC44 | Codex Pricing (OpenAI; redirige a learn.chatgpt.com/docs/pricing.md) | https://developers.openai.com/codex/pricing.md | 2026-11-06 |
| SC45 | OpenAI Codex Pricing 2026 (Morph) | https://www.morphllm.com/codex-pricing | 2026-11-06 |
| SC46 | ChatGPT Work Tab Merges Into Chat as Codex Shares Usage Limits (ShiftDelete) | https://shiftdelete.net/en/chatgpt-work | 2026-11-06 |
| SC47 | Codex Is Now in ChatGPT: What Changed (Headroom) | https://extraheadroom.com/codex-in-chatgpt | 2026-11-06 |
| SC48 | Authentication (Codex docs; redirige a learn.chatgpt.com/docs/auth) | https://developers.openai.com/codex/auth | 2026-11-06 |
| SC49 | Codex device code auth and ChatGPT security (Luca Berton) | https://lucaberton.com/blog/codex-device-code-auth-chatgpt-security-2026/ | 2026-11-06 |
| SC50 | openai/codex (README en GitHub) | https://github.com/openai/codex | 2026-11-06 |
| SC51 | Non-interactive mode (Codex docs; redirige a learn.chatgpt.com/docs/non-interactive-mode) | https://developers.openai.com/codex/noninteractive | 2026-11-06 |
| SC52 | Codex CLI Guide 2026: Setup, Sandbox, AGENTS.md & MCP (Blake Crosley) | https://blakecrosley.com/guides/codex | 2026-11-06 |
| SC53 | Issue #6403: OAuth login de la extensión de Codex en github.dev / Codespaces | https://github.com/openai/codex/issues/6403 | 2026-11-06 |
| SC54 | Issue #5673: cannot complete authentication with "sign in with chatgpt" | https://github.com/openai/codex/issues/5673 | 2026-11-06 |
| SC55 | ChatGPT + GitHub: What the Integration Can (and Can't) Do in 2026 (Carly) | https://www.usecarly.com/blog/chatgpt-github-integration/ | 2026-11-06 |
| SC56 | ChatGPT GitHub app: how to connect GitHub to ChatGPT (Upsy) | https://upsy.ai/guides/chatgpt/github | 2026-11-06 |
| SC57 | ChatGPT Connectors (2026): Which Apps Connect and What Each Plan Gets (Justin McKelvey) | https://justinmckelvey.com/blog/chatgpt-connectors | 2026-11-06 |
| SC58 | github/github-mcp-server (README) | https://github.com/github/github-mcp-server | 2026-11-06 |
| SC59 | How to Connect GitHub to ChatGPT — via MCP (AnythingMCP) | https://anythingmcp.com/guides/connect-github-to-chatgpt | 2026-11-06 |
| SC60 | Deploying GitHub Projects with Vercel | https://vercel.com/docs/git/vercel-for-github | 2026-11-06 |
| SC61 | Environment variables (Vercel) | https://vercel.com/docs/environment-variables.md | 2026-11-06 |
| SC62 | Forwarding ports in your codespace (GitHub Docs) | https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace?tool=webui | 2026-11-06 |
| SC63 | OpenAI Codex (AI agent) (Wikipedia) | https://en.wikipedia.org/wiki/OpenAI_Codex_(AI_agent) | 2026-11-06 |
| SC64 | Advanced Configuration: adding utility files to the /api directory (Vercel) | https://vercel.com/docs/functions/configuring-functions/advanced-configuration | 2026-11-07 |
| SC65 | Functions API Reference (Vercel) | https://vercel.com/docs/functions/functions-api-reference | 2026-11-07 |
