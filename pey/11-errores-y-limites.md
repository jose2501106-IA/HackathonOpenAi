---
titulo: "Errores y límites de la API de pey"
resumen: "Catálogo de error.type por endpoint y código HTTP, cómo reaccionar a cada familia, límites documentados (montos, vigencias, referencias, metadata, paginación) y lo que no está documentado."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
---

# 11 · Errores y límites

## Errores por endpoint

Forma común: `{ "error": { "message", "type", "requestId" } }`. Valores exactos del OpenAPI:

| Endpoint | 400 | 403 | 404 | 409 | 503 | 500 |
|---|---|---|---|---|---|---|
| `POST /codi/qr` | `INVALID_REQUEST`, `PEY_CONSISTENCY_ERROR`, `INVALID_STATE`, `INVALID_AMOUNT`, `INVALID_PARAMETER` | — | — | — | `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE` | `INTERNAL_SERVER_ERROR` |
| `POST /codi/pn` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_AMOUNT`, `INVALID_STATE`, `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST` | — | — | — | igual | igual |
| `POST /bank-account` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_CLABE` | — | — | — | igual | igual |
| `GET /bank-account/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS` | — | `BANK_ACCOUNT_NOT_FOUND` | — | igual | igual |
| `POST /payment-link/create` | `AUTH_ERROR`, `PEY_CONSISTENCY_ERROR`, `REQUEST_PARSING_ERROR`, `INCOMPLETE_PARAMETERS`, `INVALID_URL`, `INVALID_AMOUNT`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID` | — | — | — | — | igual |
| `POST /payment-link/update` | `INVALID_REQUEST`, `REQUEST_PARSING_ERROR`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_AMOUNT` | `FORBIDDEN` | `NOT_FOUND` | `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE` | — | igual |
| `GET /payment-link/{id}` | `AUTH_ERROR`, `PEY_CONSISTENCY_ERROR`, `INCOMPLETE_PARAMETERS` | `FORBIDDEN` | `NOT_FOUND` | — | — | igual |
| `GET /transaction/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS` | — | `NOT_FOUND` | — | — | igual |
| `GET /transaction/api-key` | `INVALID_REQUEST`, `INVALID_PARAMETERS` | — | — | — | — | igual |
| `GET /transaction/codi/qr/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETERS` | — | `NOT_FOUND` | — | — | igual |
| `GET /transaction/bank-account/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETERS` | — | `BANK_ACCOUNT_NOT_FOUND` | — | `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE` | igual |

Ojo con la ortografía: CoDi y cuentas usan `INVALID_PARAMETER` (singular); las rutas de transacciones usan `INVALID_PARAMETERS` (plural). Los ejemplos con nombre de cada error están en [04](04-api-codi-qr-y-push.md), [05](05-api-cuentas-bancarias.md), [06](06-api-ligas-de-pago.md) y [07](07-api-transacciones.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Cómo reaccionar (Recomendación)

| Familia | Ejemplos de `type` | Qué hacer |
|---|---|---|
| Datos inválidos | `INVALID_AMOUNT`, `INVALID_PARAMETER(S)`, `INCOMPLETE_PARAMETERS`, `INVALID_URL`, `INVALID_CLABE`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID`, `INVALID_REQUEST`, `REQUEST_PARSING_ERROR`, `BAD_REQUEST` | No reintentes igual: corrige la entrada y muestra un mensaje claro. Valida antes en tu servidor. |
| Cuenta o llave mal configurada | `INVALID_STATE` (CoDi no habilitado), `PEY_CONSISTENCY_ERROR` (llave sin cuenta vinculada), `AUTH_ERROR` | Revisa el portal: cuenta `codi` activa y vinculada a la llave. Mensaje sugerido: "Tu cuenta de pey todavía no está habilitada para cobrar." |
| No existe o no es tuyo | `NOT_FOUND`, `BANK_ACCOUNT_NOT_FOUND`, `FORBIDDEN` | Revisa el ID y que uses la misma llave con la que lo creaste. Un 404 no prueba que no hubo pago. |
| Estado no permite la acción | `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE` | Vuelve a leer el link; no reintentes la actualización. |
| Servicio | `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE` (503), `INTERNAL_SERVER_ERROR` (500) | Reintenta solo lecturas (GET) con espera creciente. Antes de repetir una creación, verifica si la primera sí se creó. |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Límites documentados

| Dato | Límite |
|---|---|
| `amount` en QR | `>= 0` (0 = monto abierto); sin máximo publicado |
| `amount` en push | `> 0` y `<= 1,000,000` |
| `amount` en links | `> 0`; al actualizar se redondea a 2 decimales |
| `expiration` en QR | `0` (no vence, default) o `>= 360` s |
| `expiration` en push | `>= 360` s (default 360) |
| `numRef` | 1 a 7 dígitos (`^[0-9]{1,7}$`), default `"0"` |
| `phoneNumber` | 10 dígitos |
| `metadata` | 50 pares; clave `<= 40`; valor escalar `<= 500`; regresa como texto |
| `clientReferenceId` | `<= 255` caracteres |
| `successUrl`, `backUrl` | HTTPS obligatorio |
| `alias`, `name` (cuenta) | 1 a 255 caracteres |
| `clabe` | 18 dígitos con dígito verificador válido; banco con CoDi habilitado |
| `bankAccountId` | solo cuentas `ACTIVE` |
| Página de resultados | 80 (`/transaction/api-key`, `/transaction/bank-account/{id}`); 20 (`/transaction/codi/qr/{id}`) |
| Webhook | uno por API key |
| Cuentas por llave | una `codi` y una `stripe`, mínimo una |
| Registro de CLABE | hasta 5 días hábiles |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · consultado 2026-11-07

## No documentado (⚪)

- Límite de peticiones por minuto y qué código regresa al excederlo.
- Idempotencia de `POST /codi/qr`, `POST /codi/pn` y `POST /payment-link/create`.
- Código HTTP exacto con una llave ausente o inválida (los ejemplos muestran 400 `INVALID_REQUEST` o `AUTH_ERROR`).
- Largo máximo de `concept`; monto máximo de un QR; límites por banco.
- Reintentos, timeout y orden de los webhooks; eventos de pago rechazado, vencido o devuelto.
- Cancelación de QR o push y devoluciones por API.
- Significado de `partial` en links y de `FLAGS_UNAVAILABLE`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07
