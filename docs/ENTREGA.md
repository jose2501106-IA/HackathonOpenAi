# Entrega · Tócale

> Checklist para dejar Tócale desplegado, probado y entregado. 🧑 = lo hace José (cuentas, llaves, dinero, celular, portal); 🤖 = lo hace un agente. Producto: [`docs/PRD.md`](PRD.md). Bases: K00.6 y K08.13.

## ¿A qué hora se entrega?

| Fuente | Qué dice |
|---|---|
| José (7-nov, 14:19) | "Creo que debemos de entregar este proyecto a las 4:00 pm a más tardar" (hoy, sábado) |
| K00 y K01 (página oficial en Luma, [SA01]; reconsultada el 7-nov a las 14:37) | Cierre en "el portal del evento" el **domingo 8 a las 13:00** ("final deadline to submit through the event portal"); las **16:00 de hoy son el fin de la sesión de construcción**, no el cierre; ⚪ sin URL ni formato del portal publicados |

**Qué hacer:** confirma en la sede dónde está el portal. Ten la demo desplegada antes de las **16:00 de hoy** (fin de la sesión, por si piden mostrarla); la entrega formal cierra el **domingo a las 13:00**.

## Checklist

### 1. Código en GitHub
- [ ] 🤖 Pruebas pasando (`npm test`) y flujo completo en SIMULACIÓN probado en el servidor local (`npm run dev`).
- [ ] 🤖 `python3 scripts/verificar_conocimiento.py` sin errores ni secretos.
- [ ] 🧑 Aprobar el push a `main` del repo `jose2501106-IA/hackathonopenai`.

### 2. Vercel
Dos caminos; usa uno.
- **A. Desde el Codespace (pasos con fuentes en [`docs/GUIA-CODESPACES.md`](GUIA-CODESPACES.md) §8):** `vercel login` → `vercel link --yes --project tocale` → `vercel deploy --prod`. La salida es la URL.
- **B. Desde vercel.com:** importa el repo de GitHub como proyecto nuevo y despliega sin cambiar la configuración que trae el repo. ⚪ Los nombres exactos de los botones no los verifiqué.
- [ ] 🧑 Desplegado. Abre `https://<dominio>/api/salud`: sin llaves debe decir `"modo": "simulacion"`.

### 3. pey: llave y cuenta (K03.3, [`pey/02`](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md))
- [ ] 🧑 Entra a portal.mipey.mx y crea tu perfil.
- [ ] 🧑 **Finanzas → cuenta de pago `codi`:** registra la cuenta de prueba que publica la guía de pey en el paso "2. Agrega una cuenta de pago" (tu CLABE tarda 5 días hábiles; no alcanza para hoy).
- [ ] 🧑 **Desarrollador → "Crear API Key"**, vinculada a esa cuenta. Cópiala al momento.

### 4. Variables de entorno en Vercel
Para *production*. Nunca las pegues en el chat ni en el repo.
- **Camino A (Codespace):** `printenv PEY_API_KEY | vercel env add PEY_API_KEY production`, y así con cada una que tengas como secreto del Codespace; `vercel env ls production` para revisar (guía §8). Para valores que no son secretos: `printf '1' | vercel env add MONTO_MAXIMO_MXN production`.
- **Camino B (vercel.com):** en la configuración del proyecto, sección de variables de entorno (⚪ nombre exacto del menú sin verificar).

| Variable | Valor |
|---|---|
| `PEY_API_KEY` | La llave de pey |
| `OPENAI_API_KEY` | Tu llave de OpenAI (la API se paga aparte de ChatGPT) |
| `MONTO_MAXIMO_MXN` | `1` (o menos; en pruebas se cobra dinero real que no regresa) |
| `CAJA_PIN` | Un PIN corto que solo tú sepas |
| `OPENAI_MODEL` | Opcional; por defecto `gpt-6-luna` |
| `FIRMA_SECRETO` | Opcional; un texto largo al azar |
| `PEY_WEBHOOK_SECRET` | Lo obtienes en el paso 5 |

- [ ] 🧑 Vuelve a desplegar (`vercel deploy --prod` o desde vercel.com) para que tomen efecto. `/api/salud` debe decir `"modo": "real"` e `"ia": true`.

### 5. Webhook de pey ([`pey/09`](../pey/09-webhooks.md))
- [ ] 🧑 **Desarrollador → engrane de tu llave →** URL `https://<dominio>/api/webhook-pey` → **"Crear Webhook"**. Usa el dominio de producción, no el de un preview (K03.5).
- [ ] 🧑 Copia el secreto (`whsec_…`) a `PEY_WEBHOOK_SECRET` en Vercel y vuelve a desplegar.

### 6. Prueba real de $0.01 a $1
- [ ] 🧑 En tu Android, abre la Caja (`https://<dominio>/`), escribe el PIN, arma un pedido y toca "Crear cobro".
- [ ] 🧑 Con otro celular (con la app de su banco y CoDi activo), escanea el QR, escribe ese número y envía la solicitud. Autoriza en el banco.
- [ ] 🧑 Las dos pantallas dicen "Pagado". Anota en `BITACORA.md` el `transactionId`, la hora y el banco (sin el celular).
- [ ] 🧑 Si la solicitud no llega: anota el banco (⚪ no sabemos qué bancos la reciben) y prueba "Mostrar QR CoDi" en la Caja.
- [ ] 🧑 En el portal de pey, **Webhook Logs**: la entrega respondió 200.

### 7. Tarjeta NFC (si la compras hoy)
- [ ] 🧑 Tarjetas NFC regrabables compatibles con NDEF (⚪ modelo sin probar).
- [ ] 🧑 En la Caja (Chrome en Android, NFC encendido): crea un pedido → "Grabar en tarjeta" → acerca la tarjeta.
- [ ] 🧑 Toca la tarjeta con otro celular (Android con NFC encendido o iPhone XS o posterior): debe abrir el pedido.

### 8. Material
- [ ] 🧑 Video de 60–90 s del flujo en el celular (K08.13), como respaldo.
- [ ] 🧑 Ensaya el [pitch](PITCH.md) cronometrado (3 minutos o menos).
- [ ] 🤖 README y `BITACORA.md` al día con la evidencia real (sin decir "desplegado" ni "probado con pey" antes de tenerlo).

### 9. Portal del evento
- [ ] 🧑 Sube: URL de la demo, repo, video y descripción (abajo). Guarda una captura de la confirmación.

## Texto para el portal

**Nombre:** Tócale

**Descripción corta:** Toca una tarjeta NFC (o escanea un QR), escribe tu celular y paga con CoDi® desde tu banco. Para taquerías y puestos que hoy solo aceptan efectivo: sin terminal, sin comisión y con "pagado" confirmado por pey®.

**Descripción larga:** El cajero dicta el pedido y la IA de OpenAI lo convierte en productos del menú; el código pone los precios. El pedido se firma y se graba en una tarjeta NFC reprogramable (o se muestra como QR). El cliente la toca, escribe su celular y recibe una solicitud de pago CoDi por la API de pey; la autoriza en su banco y las dos pantallas muestran "Pagado" solo cuando pey lo confirma. Monto máximo en el servidor, celular que no se guarda y modo SIMULACIÓN rotulado. Negocio y menú de ejemplo.

**Tecnología:** HTML, CSS y JavaScript sin framework; Vercel Functions (Node.js 22); OpenAI (Responses API con salida estructurada); API CoDi de pey (solicitud de pago, QR, transacciones y webhooks firmados); Web NFC. Construido con Claude Code y agentes en paralelo.

Antes de pegarlo, ajusta según lo que de verdad funcionó: si no hubo cobro real, agrega "Demo en SIMULACIÓN".

## Fuentes

| Dato | Fuente |
|---|---|
| Cierre del domingo a las 13:00 y portal sin URL | K00.5–K00.6 · K01 |
| Alta en pey, cuenta de prueba y webhook | K03.3 · [`pey/02`](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) · [`pey/09`](../pey/09-webhooks.md) |
| Paquete de entrega recomendado | K00.6 · K08.13 |
