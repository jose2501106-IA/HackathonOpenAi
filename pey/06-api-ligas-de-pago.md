---
titulo: "API de links de pago: crear, actualizar monto y consultar"
resumen: "POST /payment-link/create, POST /payment-link/update y GET /payment-link/{id}: campos, estados (pending, processing, paid, partial), errores 400/403/404/409 y diferencias con el webhook."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/create-payment-link
  - https://docs.pey.mx/docs/api/update-payment-link
  - https://docs.pey.mx/docs/api/get-payment-link
---

# 06 · Links de pago

## Qué es un link de pago

Una página de cobro alojada por pey. Acepta CoDi, tarjetas, Apple Pay y Google Pay; al terminar o cancelar, regresa al cliente a tus URL. Para tarjetas, la API key necesita una cuenta `stripe` vinculada ([02](02-primeros-pasos-cuenta-llaves-y-prueba.md)). ⚪ Comisión por tarjeta no publicada.

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [pey: Create Payment Link](https://docs.pey.mx/docs/api/create-payment-link) · consultado 2026-11-07

## POST /payment-link/create · Crear

Respuesta exitosa: **200**.

| Campo | Tipo | Obligatorio | Reglas | Default | Qué hace |
|---|---|---|---|---|---|
| `amount` | number | sí | `> 0` | — | Monto en pesos MXN. |
| `successUrl` | string (uri) | sí | HTTPS | — | A dónde regresa el cliente tras pagar. |
| `backUrl` | string (uri) | sí | HTTPS | — | A dónde regresa si cancela o se regresa. |
| `hasTip` | boolean | no | — | `false` | Activa propina en la página de pago. |
| `clientReferenceId` | string | no | hasta 255 caracteres | — | Tu referencia (p. ej. número de pedido); regresa en el webhook. |
| `metadata` | object | no | 50 pares; clave `<= 40`; valor escalar `<= 500` | — | Regresa como texto. |

**Respuesta 200:** `id` (ULID del link) y `url` (dirección completa para pagar).

**Errores:** 400 (`AUTH_ERROR`, `PEY_CONSISTENCY_ERROR`, `REQUEST_PARSING_ERROR`, `INCOMPLETE_PARAMETERS`, `INVALID_URL`, `INVALID_AMOUNT`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID`) y 500 (`INTERNAL_SERVER_ERROR`). No declara 503.

| Ejemplo | `error.type` | Causa (parafraseada) |
|---|---|---|
| `missingFields` | `INCOMPLETE_PARAMETERS` | Falta `amount`, `successUrl` o `backUrl` |
| `invalidUrl` | `INVALID_URL` | Alguna URL no es HTTPS |
| `invalidAmount` | `INVALID_AMOUNT` | Monto no mayor que 0 |
| `authError` | `AUTH_ERROR` | No se pudo leer la autenticación |
| `parseError` | `REQUEST_PARSING_ERROR` | Cuerpo ilegible |
| `missingApiKeyId` | `PEY_CONSISTENCY_ERROR` | Falta el id de la llave en la autenticación |
| `missingBankAccount` | `PEY_CONSISTENCY_ERROR` | La llave no tiene cuenta bancaria ni de Stripe |
| `invalidHasTip` | `INVALID_HAS_TIP` | `hasTip` no es booleano |
| `invalidClientReferenceId` | `INVALID_CLIENT_REFERENCE_ID` | Referencia no es texto o pasa de 255 |
| `ulidError`, `dbError`, `requestIdError` | `INTERNAL_SERVER_ERROR` (500) | Fallas internas |

```json
// Petición (ejemplo propio)
{ "amount": 349, "successUrl": "https://mi-tienda.example/gracias", "backUrl": "https://mi-tienda.example/carrito",
  "hasTip": false, "clientReferenceId": "pedido-2041" }
// Respuesta 200
{ "id": "01JF0000000000000000000000", "url": "https://<url de pago que entrega pey>" }
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Create Payment Link](https://docs.pey.mx/docs/api/create-payment-link) · consultado 2026-11-07

## POST /payment-link/update · Cambiar el monto

Solo cambia `amount`; ningún otro atributo. Solo para links creados con tu llave y **solo mientras el estado sea `pending`**: en cuanto un pago empieza a procesarse o se completa, el monto queda fijo. Respuesta exitosa: **200**.

| Campo | Tipo | Obligatorio | Reglas |
|---|---|---|---|
| `paymentLinkId` | string (ULID) | sí | Link a modificar |
| `amount` | number | sí | `> 0`; se redondea a 2 decimales (mitad hacia arriba) |

El cuerpo no admite otros campos (`additionalProperties: false`). **Respuesta 200:** `id` y `amount` (nuevo monto).

| HTTP | `error.type` | Ejemplo y causa (parafraseada) |
|---|---|---|
| 400 | `INCOMPLETE_PARAMETERS` | `missingFields`: falta `paymentLinkId` o `amount` |
| 400 | `INVALID_PARAMETER` | `unexpectedField`: mandaste un campo extra (p. ej. `successUrl`) |
| 400 | `INVALID_AMOUNT` | `invalidAmount`: monto no mayor que 0 |
| 400 | `INVALID_REQUEST` | `invalidRequest`: la petición no trae el id de la llave |
| 400 | `REQUEST_PARSING_ERROR` | `notAnObject`: el cuerpo no es un objeto JSON |
| 403 | `FORBIDDEN` | Sin permiso sobre ese link |
| 404 | `NOT_FOUND` | El link no existe |
| 409 | `PAYMENT_LINK_NOT_PENDING` | `notPending`: ya no está `pending` |
| 409 | `CONCURRENT_UPDATE` | `concurrentUpdate`: dejó de estar `pending` (o perdiste permiso) durante la actualización |
| 500 | `INTERNAL_SERVER_ERROR` | `retrieveError`, `updateError` |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Update Payment Link](https://docs.pey.mx/docs/api/update-payment-link) · consultado 2026-11-07

## GET /payment-link/{id} · Consultar

Detalle de un link creado con tu llave. Parámetro de ruta `id` (ULID). Respuesta exitosa: **200**.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | ULID |
| `amount` | number | MXN |
| `status` | enum | `pending` \| `processing` \| `paid` \| `partial` (significados ⚪ no definidos) |
| `successUrl`, `backUrl` | string (uri) | |
| `hasTip` | boolean | |
| `paymentMethods` | array de string | Métodos disponibles; sin enumeración formal (el ejemplo muestra `CODI` y `CARD`) |
| `dateCreated` | integer | Unix |
| `clientReferenceId` | string | |
| `metadata` | object | Valores como texto |
| `transactions` | array | Pagos del link: `transactionId`, `paymentMethod`, `datePaid`, `amount`, `amountBreakdown` (solo componentes distintos de cero), `applicationFee` (number o null), `metadata` |

Esta respuesta **no** incluye `url`: guárdala al crear el link.

**Errores:** 400 `AUTH_ERROR` (`authError`), `PEY_CONSISTENCY_ERROR` (`missingApiKeyId`), `INCOMPLETE_PARAMETERS` (`missingId`: falta el id en la ruta); 403 `FORBIDDEN`; 404 `NOT_FOUND`; 500 `INTERNAL_SERVER_ERROR` (`retrieveError`, `requestIdError`).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Payment Link](https://docs.pey.mx/docs/api/get-payment-link) · consultado 2026-11-07

## Estados: diferencia entre la API y el webhook

| Fuente | Valores de `status` |
|---|---|
| `GET /payment-link/{id}` (OpenAPI) | `pending`, `processing`, `paid`, `partial` |
| Webhook `payment_link.status_updated` | `paid`, `pending`, `processing` |

⚪ `partial` no aparece en el webhook y ninguna fuente explica su significado. Recomendación: trata cualquier valor desconocido como "no pagado" y confirma con `GET /payment-link/{id}`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhook Actualización de estado del link de pago](https://docs.pey.mx/docs/webhooks/payment-link/status-update) · consultado 2026-11-07

## Flujo típico (Recomendación)

1. Tu servidor crea el link con `clientReferenceId` = id de tu pedido y guarda `id` y `url`.
2. Rediriges al cliente a `url`.
3. Llega `payment_link.status_updated` con `status: "paid"` → verificas la firma y confirmas con `GET /payment-link/{id}`.
4. La redirección a `successUrl` no prueba el pago: el cliente puede abrir esa URL a mano.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07
