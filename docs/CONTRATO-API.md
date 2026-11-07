# Contrato de la API de "¿Ya cayó?" (congelado el 7-nov-2026)

Fuente de verdad para quien construye `app/`. Si algo no está aquí, pregunta antes de inventarlo. Stack y reglas: `AGENTS.md`. Producto: `docs/PRD.md`.

## Reglas comunes
- Todas las funciones viven en `app/api/*.js` (Vercel Functions, Node 20+, ESM) y exportan `GET(request)` o `POST(request)` con `Request`/`Response` web.
- Respuestas JSON con `json()` de `app/lib/http.js`. Errores: `{ "error": { "codigo": "MAYUSCULAS", "mensaje": "texto para la persona, en español" } }`.
- Configuración solo con `leerConfig()` de `app/lib/config.js` (léela dentro de cada handler, no al importar).
- Dinero: el navegador manda y recibe **pesos** (`monto`, número con hasta 2 decimales). Adentro se valida en **centavos enteros** (`aCentavos`, `aPesos`). Monto válido: 0.01 a `maxMontoMxn` (por defecto 20).
- `modoPago`: `"simulacion"` (sin llave de pey o elegido), `"prueba"` (cuenta de prueba de pey, dinero real de $0.01–$1) o `"comercio"`. La interfaz **siempre** lo muestra.
- **Ticket:** cada cobro regresa un `ticket` firmado (`app/lib/ticket.js`, secreto `cfg.secretoTickets`) con `{ id, montoCentavos, concepto, creadoEn, expiraEn, modoPago, simPagadoEn? }`. El navegador lo guarda y lo manda de vuelta. El servidor confía en el ticket, no en montos que mande el navegador.
- Nunca se registra en logs una llave, un secreto, una imagen ni el cuerpo completo de un webhook.

## Endpoints

### `GET /api/salud` (ya existe)
`200 { ok, modoPago, maxMontoMxn, openai: bool, pey: bool, version }`

### `POST /api/agente` — entender la venta (no cobra)
Entrada: `{ "texto": "Cóbrale un dulce de tamarindo" }` (1–300 caracteres).
Salida `200`:
```json
{ "respuesta": "Te propongo cobrar $1.00 por 1 dulce de tamarindo.",
  "propuesta": { "concepto": "Dulce de tamarindo", "monto": 1,
                 "detalle": [{ "producto_id": "dulce-tamarindo", "nombre": "Dulce de tamarindo", "cantidad": 1, "precioUnitario": 1, "subtotal": 1 }] },
  "origen": "openai" }
```
- `propuesta` puede ser `null` si no se entendió (con `respuesta` pidiendo el monto).
- Con `OPENAI_API_KEY`: Responses API con function calling (`crear_cobro`, estricta) y el catálogo de `app/lib/catalogo.js`; **el servidor pone los precios del catálogo** y recalcula el monto. Sin llave o si OpenAI falla: reglas locales (`origen: "reglas"`), por ejemplo "cóbrale 85 de dos tacos" → 85 y "un dulce de tamarindo" → catálogo.
- Si el monto pasa de `maxMontoMxn`: `propuesta` con `monto` y `respuesta` que avisa el tope (la interfaz no deja confirmar).

### `POST /api/cobros` — crear el cobro (requiere confirmación humana)
Entrada: `{ "concepto": "Dulce de tamarindo", "monto": 1, "confirmado": true }`.
- Sin `confirmado: true` → `400 CONFIRMACION_REQUERIDA`. Monto fuera de rango → `400 MONTO_INVALIDO`. Concepto vacío o > 40 caracteres → `400 CONCEPTO_INVALIDO` (se recorta a 40 para pey).
Salida `201`:
```json
{ "cobro": { "id": "…", "ticket": "…", "concepto": "Dulce de tamarindo", "monto": 1, "modoPago": "prueba",
             "qrImage": "data:image/png;base64,…", "qrString": "…", "numRef": "1234567",
             "creadoEn": "2026-11-07T19:58:00.000Z", "expiraEn": "2026-11-07T20:08:00.000Z" } }
```
- `prueba`/`comercio`: `POST https://api.pey.mx/codi/qr` con `amount` en pesos, `concept`, `expiration: 600`, `numRef` (1–7 dígitos), `generateImage: true` (K03.4). Si `qrImage` viene `null`, generar la imagen con `qrcode` desde `qrString`.
- `simulacion`: `id = "sim_" + aleatorio`, `qrString = "SIMULACION|<id>|<monto>"`, imagen generada con `qrcode`.
- Errores de pey: `401`/`INVALID_STATE` → `502 PEY_NO_AUTORIZADO`; red o 5xx → `502 PEY_NO_RESPONDE`.

### `GET /api/estado?ticket=…` — ¿ya cayó?
Salida `200`:
```json
{ "id": "…", "estado": "pendiente", "monto": 1, "pagadoEn": null, "transactionId": null, "aviso": null, "modoPago": "prueba" }
```
`estado`: `pendiente` · `pagado` · `expirado` · `no_verificable`. Reglas:
- `GET https://api.pey.mx/transaction/codi/qr/{id}`: un item `PAID` **con el mismo monto que el ticket** (±1 centavo) → `pagado` (`pagadoEn` ISO, `transactionId`). `PAID` con otro monto → `pendiente` + `aviso: "pago_con_monto_distinto"`.
- 404 → `no_verificable` + `aviso: "qr_no_encontrado_con_esta_llave"`. Red o 5xx → `no_verificable` + `aviso: "pey_no_responde"`.
- Sin `PAID` y `ahora > expiraEn` → `expirado` (aun así se consulta a pey primero: un pago tardío gana).
- `simulacion`: `pagado` si el ticket trae `simPagadoEn`; si no, `pendiente` (o `expirado` si ya pasó `expiraEn`, agregado en la integración).

### `POST /api/simular-pago` — solo en simulación
Entrada `{ "ticket": "…" }`. Si `modoPago !== "simulacion"` → `403 SOLO_SIMULACION`; cobro vencido sin pago → `409 COBRO_VENCIDO` (agregado en la integración). Salida `200 { "ticket": "<nuevo ticket con simPagadoEn>", "estado": "pagado" }`.

### `POST /api/webhook-pey` — registro firmado
Cuerpo crudo (`await request.text()`), verificación Standard Webhooks con `PEY_WEBHOOK_SECRET` (K03.5, K03.7): `401 FIRMA_INVALIDA` si falla o el timestamp tiene más de 5 min; `200 { "recibido": true }` si pasa. Solo registra `type`, `webhook-id` e ids. No es la fuente de verdad del estado (lo es `/api/estado`).

### `POST /api/revisar` — revisar una captura
Entrada: `{ "imagenBase64": "data:image/jpeg;base64,…" | "…", "mime": "image/jpeg", "ticket": "…" | null, "montoManual": 1 | null }`. Imagen de más de 1.5 MB → `413 IMAGEN_GRANDE`.
Salida `200`:
```json
{ "leido": { "es_comprobante": true, "monto": 1, "fecha": "2026-11-07", "hora": "13:58", "clave_rastreo": "EJEMPLO123", "legible": true },
  "origen": "openai",
  "veredicto": { "codigo": "todavia_no_cae", "titulo": "Todavía no cae", "mensaje": "pey no tiene ningún pago para este cobro: no entregues.", "detalle": "La captura dice $1.00 a las 13:58." },
  "pago": null }
```
- `origen`: `openai` · `manual` (se usó `montoManual`) · `simulacion` (lectura de ejemplo etiquetada, solo sin llave de OpenAI en modo simulación).
- Lectura con la Responses API: `input_text` + `input_image` (data URL) y `text.format` con el esquema estricto de K07.3. Instrucción: "Lee la captura. Si un dato no se ve, null. No juzgues si es real."
- `veredicto.codigo` (lo decide **código**, no el modelo; reglas de K07.3): `ya_cayo` · `todavia_no_cae` · `coincide` · `dudoso` · `no_encontrado` · `ilegible` · `no_verificable`.
  - Con ticket: manda el estado de ese cobro en pey. Pagado → `ya_cayo`; si no → `todavia_no_cae`, diga lo que diga la captura. Si el monto leído ≠ monto del cobro, el `detalle` lo dice.
  - Sin ticket: pagos `PAID` recientes de pey (últimas 2 h, máx. 3 páginas): mismo monto y hora ±15 min → `coincide`; mismo monto a otra hora → `dudoso`; nada → `no_encontrado` (mensaje honesto con la clave de rastreo para el CEP).
  - Nunca se dice "falso" ni se acusa a nadie.
- Sin `OPENAI_API_KEY` y sin `montoManual`: en `simulacion`, lectura de ejemplo con `origen: "simulacion"`; en `prueba`/`comercio`, `503 IA_NO_DISPONIBLE` con mensaje "Escribe el monto a mano".
- `pago` (definido en la construcción): `null` o `{ id, monto, pagadoEn, claveRastreo }`, más `simulacion: true` en los pagos de ejemplo.

## Cambios de la integración
- En `prueba`, `maxMontoMxn` nunca pasa de 1 (dinero real que no se devuelve, K03.3); en `simulacion` y `comercio` manda `MAX_MONTO_MXN`.
- En `simulacion`, los mensajes del veredicto no dicen que pey confirmó o que no tiene nada (no se le consultó): hablan del cobro de SIMULACIÓN y de los pagos de ejemplo.

## Códigos agregados durante la construcción
La interfaz muestra `error.mensaje` para cualquier código. Además de los de arriba: `PEY_RECHAZO` (502, otro 4xx de pey al crear), `IA_SIN_SALDO` (503), `TEXTO_INVALIDO` (400, `/api/agente`), `IMAGEN_REQUERIDA` e `IMAGEN_INVALIDA` (400) y `MONTO_INVALIDO` (400, `montoManual`) en `/api/revisar`, `COBRO_VENCIDO` (409, `/api/simular-pago`). Con ticket y estado `no_verificable`, el veredicto es `no_verificable` ("no entregues todavía").

## Interfaz de `app/lib/pey.js` (la usan otros módulos)
```js
export class PeyError extends Error { /* status, codigo */ }
export async function crearQr({ montoCentavos, concepto, numRef, expiracionSegundos }, cfg) // → { id, qrString, qrImageBase64|null }
export async function consultarPagosQr(id, cfg)          // → [{ id, status: "PENDING"|"PAID", amount, datePaid|null, ... }] ; lanza PeyError(404) si no existe
export async function listarPagosRecientes({ desdeEpoch }, cfg) // → [{ id, monto, fechaPago (ISO), claveRastreo|null }] solo PAID
```
`app/lib/estado.js` exporta `resolverEstado(ticketDatos, cfg, ahora = Date.now())` → el objeto de `/api/estado` (lo usan `/api/estado` y `/api/revisar`).

## Archivos y dueños (tareas en paralelo, no se pisan)
| Dueño | Archivos |
|---|---|
| Base (hecho) | `app/package.json`, `app/lib/config.js`, `app/lib/http.js`, `app/lib/ticket.js`, `app/api/salud.js`, `app/servidor-local.mjs` |
| Pagos (pey) | `app/lib/pey.js`, `app/lib/qr.js`, `app/lib/estado.js`, `app/api/cobros.js`, `app/api/estado.js`, `app/api/simular-pago.js`, `app/api/webhook-pey.js`, `app/tests/pey.test.js`, `app/tests/cobros-estado.test.js`, `app/tests/webhook.test.js` |
| IA (OpenAI) | `app/lib/openai.js`, `app/lib/catalogo.js`, `app/lib/agente.js`, `app/lib/extractor.js`, `app/lib/coincidencias.js`, `app/api/agente.js`, `app/api/revisar.js`, `app/tests/agente.test.js`, `app/tests/revisar.test.js` |
| Interfaz | `app/index.html`, `app/css/*.css`, `app/js/*.js`, `app/img/*` |
