# Entrega · Punto de venta de Tacos El Gran Abanico

> 🧑 = lo hace José (cuentas, llaves, dinero, celular, portal). 🤖 = lo hace un agente. Cierre del concurso: **domingo 8 de noviembre, 13:00** en el portal del evento (K00.5).

## 1. Supabase (10 min)
1. 🧑 Crea un proyecto en supabase.com.
2. 🧑 **SQL Editor** → pega y corre `supabase/migrations/001_esquema.sql`, luego `supabase/migrations/002_semilla.sql`.
3. 🧑 **Project Settings → API**: copia la URL del proyecto y la llave secreta del servidor (service_role o `sb_secret_…`). ⚪ Los nombres exactos de los menús no los verifiqué.
4. Las tablas tienen RLS sin políticas: el navegador no puede leerlas. Solo el servidor entra con la llave secreta.

## 2. Vercel
1. 🧑 Importa el repo `jose2501106-IA/hackathonopenai` como proyecto nuevo (sin cambiar la configuración).
2. 🧑 **Settings → Environment Variables** (nombres en `.env.example`):

| Variable | Valor |
|---|---|
| `PEY_API_KEY` | tu llave de pey |
| `PEY_WEBHOOK_SECRET` | el secreto del paso 3 |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | del paso 1 |
| `CAJA_PIN` | un PIN para la caja (obligatorio con cobros reales) |
| `MONTO_PRUEBA_MXN` | `0.10` (o déjalo vacío: es el valor por defecto) |
| `OPENAI_API_KEY` | al final, cuando la tengas |

3. 🧑 Redeploy. Abre `https://<dominio>/api/salud`: debe decir `"modo": "real"`, `"cobroPrueba": true` y `"baseDatos": "supabase"`.

## 3. Webhook de pey
1. 🧑 portal.mipey.mx → **Desarrollador** → engrane de tu llave → URL `https://<dominio>/api/webhook-pey` → **Crear Webhook** ([`pey/09`](../pey/09-webhooks.md)). Usa el dominio de producción, no un preview.
2. 🧑 Copia el secreto a `PEY_WEBHOOK_SECRET` y vuelve a desplegar.
3. Si el webhook falla, la página de la mesa igual confirma consultando `GET /transaction/{id}` a pey.

## 4. Etiquetas NFC
1. 🧑 Abre la caja (`https://<dominio>/`), escribe el PIN y entra a cada mesa: abajo está su **URL NFC** con botón "Copiar".
2. 🧑 Graba esa URL como registro de tipo URL en la etiqueta con una app como NFC Tools. ⚪ No lo probé con etiquetas reales.
3. Si no hay etiquetas, la misma URL se abre a mano o como QR.

## 5. Prueba real (dinero real: $0.10, no se devuelve)
1. 🧑 Caja → Mesa 1 → captura 1 taco.
2. 🧑 Toca la etiqueta (o abre la URL), escribe tu celular, oprime "Pagar $0.10" y autoriza en la app de tu banco.
3. 🧑 Verifica: "¡Pago aprobado!" en la mesa, "Pagada ✓" en la caja, inventario con menos tortillas y carne, reporte con la venta.
4. 🧑 Anota en `BITACORA.md` la hora y el `transactionId` (en pey → Webhook Logs), sin tu celular.

## 6. Entregar
- [ ] 🤖 `npm test` sin fallas.
- [ ] 🧑 URL pública, repo, video corto de los 3 pasos y pitch, en el portal antes de las 12:00 del domingo; guarda captura.
