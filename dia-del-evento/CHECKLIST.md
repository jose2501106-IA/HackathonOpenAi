# Checklist — de esta noche al voto comunitario

> Marca `[x]` conforme avances. 🧑 = solo José. ⚪ = confirmar en pantalla. Horarios y planes B: [`RUNBOOK.md`](RUNBOOK.md).
> **Nunca** pegues una llave en el repo, en un chat, en un prompt ni en una captura. Las llaves viven solo en Vercel, en Codespaces y en tu gestor de contraseñas.

## Esta noche (viernes 6), en este orden

### 1 · API de OpenAI (primero: el pago puede tardar)
- [ ] 🧑 Cuenta en platform.openai.com con **saldo**. La API se paga aparte de ChatGPT Plus; con al menos US$5 de crédito entras al tier Build (K04.13).
- [ ] 🧑 API key de un proyecto para el hackatón, con tope o alerta de gasto ⚪ (K04.13).
- [ ] Guárdala como secreto en Vercel (Production y Preview) y en Codespaces (`OPENAI_API_KEY`).
- [ ] Elige el modelo de K04.2 para `OPENAI_MODEL`. Prueba en un codespace (la llave sale del secreto, no la escribas):
  ```bash
  export OPENAI_MODEL="<modelo de K04.2>"
  curl -s https://api.openai.com/v1/responses \
    -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" \
    -d "{\"model\": \"$OPENAI_MODEL\", \"input\": \"Responde solo: listo\"}" | head -c 600
  ```
  Esperado: un JSON que contiene "listo". Si dice que no hay saldo, revisa el pago antes de dormir.

### 2 · pey (K03.3)
- [ ] 🧑 Alta en portal.mipey.mx: perfil → Finanzas → cuenta de pago `codi` con tu CLABE (tarda 5 días hábiles; regístrala igual para después).
- [ ] 🧑 Registra la **cuenta de prueba** que publica la guía de pey ("Prueba en producción"): se activa al instante, pero lo que le pagues no se devuelve. Usa $0.01 o $1.
- [ ] 🧑 Desarrollador → "Crear API Key" ligada a esa cuenta. Cópiala en cuanto aparezca ⚪ (puede mostrarse una sola vez).
- [ ] Guárdala como secreto **solo** en Vercel Production y en Codespaces (`PEY_API_KEY`). Los Preview no la llevan.
- [ ] 🧑 CoDi activo en la app de tu banco (algunos bancos validan con un depósito de un centavo y un SMS, K03.3).
- [ ] **Pago de punta a punta de $0.01** con el `curl` de K03.3: crea el QR, págalo desde tu app y **graba la pantalla**. Ese video es tu primer respaldo.
- [ ] (Opcional, plan B2 de K03.6) QR de respaldo con `expiration: 0`. **No lo subas al repo.**
- [ ] Webhook: ubica en el portal dónde se crea (Desarrollador → engrane de la llave). La URL va a ser `https://<proyecto>.vercel.app/api/webhook-pey` (dominio de producción, nunca un preview). Lo creas mañana a las 11:20 (RUNBOOK) y guardas el secreto `whsec_…` como `PEY_WEBHOOK_SECRET` en Production.
- [ ] Anota tus dudas para el equipo de pey (RUNBOOK, 9:30).

### 3 · Vercel (K05.16)
- [ ] 🧑 Cuenta de Vercel ligada a GitHub; importa este repo (en repos personales debes ser Owner).
- [ ] Configuración del proyecto: **Root Directory = `app`**, preset "Other", sin comando de build ⚪ (K05.16 no lo pudo verificar). Mientras no exista `app/index.html`, la raíz da 404: es normal.
- [ ] Anota el dominio de producción: `https://<proyecto>.vercel.app`.
- [ ] Variables de entorno (las llaves como Secret):

  | Variable | Preview | Production (al inicio) | Production (después de la Tarea 2) |
  |---|---|---|---|
  | `OPENAI_API_KEY` | tu llave | tu llave | igual |
  | `OPENAI_MODEL` | modelo de K04.2 | igual | igual |
  | `MAX_MONTO_MXN` | 500 | 20 | 20 (cuenta de prueba) |
  | `MODO_PAGO` | `simulacion` | `simulacion` | `prueba` (`comercio` solo con tu CLABE activa) |
  | `PEY_API_KEY` | — | tu llave de pey | igual |
  | `PEY_WEBHOOK_SECRET` | — | — | `whsec_…` del webhook |

- [ ] Recuerda: un cambio de variables solo aplica después de volver a desplegar (K05.16).
- [ ] Abre un preview en una ventana de incógnito para ver si pide sesión de Vercel ⚪. Inicia sesión en Vercel también en el celular.

### 4 · Codex web (K05.2–K05.4)
- [ ] 🧑 GitHub conectado a Codex con acceso a este repo.
- [ ] **Entorno creado y publicado hoy** ("Environment published"; sin eso no se lanzan tareas, K05.2). Ruta en la experiencia nueva: "Work in" › "Cloud" › "Select environment" › "Create environment".
- [ ] Node 22. Script de instalación (o *setup script* en la versión Legacy), que no falla mientras `app/` esté vacío:
  ```bash
  node --version
  if [ -f app/package.json ]; then
    cd app && { [ -f package-lock.json ] && npm ci || npm install; }
  fi
  ```
- [ ] Internet del agente: **solo** dominios de gestores de paquetes + `docs.pey.mx` + la documentación de OpenAI. Nunca "All" (K05.4).
- [ ] Sin llaves en el entorno: las pruebas usan `fetch` simulado, Codex no las necesita (K05.3).
- [ ] Prueba de humo: Prompt 0 de [`PROMPTS-CODEX.md`](PROMPTS-CODEX.md). Debe responder el plan y el diagnóstico.
- [ ] Revisa el tablero de uso: chatgpt.com/codex/settings/usage (K05.9).

### 5 · ChatGPT (K05.13)
- [ ] Plugin de GitHub: Settings › Plugins › GitHub, con acceso a este repo (tarda unos 5 minutos en aparecer).
- [ ] Prueba: "Lee `conocimiento/INDICE.md` del repo y dime qué archivo responde cómo cobrar con pey".
- [ ] Respaldo: un Proyecto de ChatGPT con `conocimiento/TODO-EN-UNO.md`, `plantillas/*.md` y [`PROMPTS-CHATGPT.md`](PROMPTS-CHATGPT.md) como archivos ⚪, y el prompt 0 como instrucciones.

### 6 · Codespaces y Codex CLI, de respaldo (K05.10)
- [ ] Secretos de Codespaces (GitHub → Settings → Codespaces → Secrets) con acceso a este repo: `OPENAI_API_KEY` y `PEY_API_KEY`.
- [ ] Crea un codespace del repo; el contenedor instala Codex CLI y Vercel CLI. `codex --version`.
- [ ] 🧑 En ChatGPT: Settings › Security › **"Device code authorization"** activado.
- [ ] `codex login --device-auth` → abre el enlace en la laptop y escribe el código (dura unos 15 minutos).
- [ ] `codex "Resume en 3 viñetas las reglas de AGENTS.md"` → responde.
- [ ] Detén el codespace para no gastar horas.

### 7 · Celular y equipo
- [ ] Hotspot configurado y probado con la laptop.
- [ ] Laptop + cargador, multicontacto chico, power bank y cable, adaptador de video para proyector ⚪, audífonos con micrófono (para el video), identificación ⚪, boleto de Luma, agua y algo de comer (K01.9).

### 8 · Repo público
- [ ] `python3 scripts/verificar_conocimiento.py` sin "posible secreto".
- [ ] Ningún `.env` en git (está en `.gitignore`); ningún dato personal (CLABE, teléfono, correo) en archivos.

### 9 · Cabeza
- [ ] Lee 15 minutos: el top 3 de K07 y el guion de K09.1. Así mañana eliges en 5 minutos.
- [ ] Duerme. El sábado no se recupera el sueño.

## Mañana antes de salir (sábado)
- [ ] Laptop, celular y power bank al 100%.
- [ ] Ruta revisada (K01.8: Av. Miguel Hidalgo 128, Barrio de San Lucas, Coyoacán). Sal para llegar entre 8:45 y 9:00.
- [ ] Actualizaciones del sistema pospuestas (que la laptop no se reinicie a medio día).
- [ ] Navegador: un perfil limpio para la demo, sin marcadores personales visibles. Pestañas: Codex, ChatGPT, repo, Vercel, portal de pey, docs.pey.mx, RUNBOOK y K09.
- [ ] RUNBOOK, CHECKLIST y K09 guardados en el celular para leerlos sin internet.
- [ ] Desayuna.

## Al llegar (9:00)
- [ ] Lugar con enchufe; Wi-Fi probado; hotspot listo.
- [ ] Sesiones abiertas: GitHub, Codex, ChatGPT, Vercel y pey.
- [ ] Prueba de humo: Prompt 0 de Codex, prompt 0 de ChatGPT y llamada de prueba a OpenAI.
- [ ] Preguntas a organizadores y a pey hechas (RUNBOOK 9:30, K01.11); respuestas en `BITACORA.md`.
- [ ] Modo de pago de Production decidido (A, B o C) y hora de E confirmada (entrega interna o pitch en vivo).

## Al inicio (T)
- [ ] `docs/RETO-OFICIAL.md` en `main`.
- [ ] Prompt 1 de Codex lanzado y ChatGPT eligiendo la idea.

## A mitad (T+2:30, ~13:00)
- [ ] Demo de 3 pasos en el dominio de producción, desde el celular.
- [ ] Un pago real de $1 (modo B) confirmado en pantalla, con su id en la bitácora; webhook visible en "Webhook Logs" de pey.
- [ ] `/api/salud`: entorno correcto; `openai` y `pey` configuradas.
- [ ] Autoevaluación C1–C5 (K08.4–K08.5) anotada; recortes decididos.
- [ ] Guion en borrador y textos de la interfaz listos.
- [ ] Oleada 2 lanzada. Comiste.

## Antes de entregar (congelar, E−0:45 ≈ 14:45)
- [ ] "CONGELADO" con la versión en la bitácora; ninguna tarea de Codex corriendo.
- [ ] Pruebas en verde en `main` (último PR o `npm test --prefix app` en Codespaces).
- [ ] Demo dos veces en producción desde incógnito, en menos de 80 s.
- [ ] La pantalla dice la verdad: banner MODO PRUEBA o SIMULACIÓN cuando aplica.
- [ ] El monto de la frase de demo cabe en `MAX_MONTO_MXN`.
- [ ] Sin llaves (verificador) y sin datos personales en el repo.
- [ ] Deck en PDF en la laptop y en el celular.
- [ ] K08.13 (autoevaluación) y K02.13 (lo que aleja) repasados.

## Entrega interna (sábado 15:30)
- [ ] La URL de producción funciona en el celular, sin registro.
- [ ] README de la raíz: frase de valor, video y URL arriba, problema, solución, demo, qué es real, prueba o SIMULACIÓN, cómo lo construí (PRs con hora), qué existía antes y qué se hizo hoy, seguridad, limitaciones y qué sigue.
- [ ] Video de entrega (≤ 3 min ⚪) y video corto (60–90 s) subidos; los enlaces abren en incógnito; copias locales en laptop y celular.
- [ ] Licencia elegida y puesta en el README (refuerza el argumento de bien público; K09.6, pregunta 4).
- [ ] Textos del portal listos (ChatGPT, prompt 11).
- [ ] Capturas de evidencia: tareas de Codex en paralelo, lista de PRs y un preview.
- [ ] Bitácora al día.

## Entrega final (domingo, antes de las 12:00)
- [ ] Requisitos del portal revisados (campos y duración del video ⚪).
- [ ] Congelado final a las 11:00 y demo completa en producción.
- [ ] Formulario enviado; captura de la confirmación; línea en la bitácora.
- [ ] Después de entregar: **no fusiones nada**; el jurado revisa hasta el lunes.

## Pitch (10 minutos antes)
- [ ] Laptop y celular en No molestar; brillo al máximo.
- [ ] Pestañas en orden: deck → app en producción con `?presentar=1` → video local listo en el momento del pago.
- [ ] App del banco abierta con sesión iniciada (algunas cierran sesión por inactividad).
- [ ] `/api/salud` revisado hace menos de 10 minutos; un cobro de prueba hecho hace menos de 15.
- [ ] Zoom del navegador de 125 a 150% para el proyector.
- [ ] Cronómetro visible. Agua. Primera frase de memoria.
- [ ] Al terminar: anota las preguntas del jurado.

## Voto comunitario (lunes en adelante)
- [ ] Kit listo (ChatGPT, prompt 12): textos, imagen, video corto con subtítulos, QR y URL.
- [ ] Demo viva: saldo y tope de gasto de OpenAI revisados; `MAX_MONTO_MXN` bajo; nada de merges.
- [ ] Compartir sin spam y sin ofrecer nada a cambio de votos (K08.6).
