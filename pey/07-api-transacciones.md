---
titulo: "API de transacciones: consultar pagos"
resumen: "GET /transaction/{id}, /transaction/api-key, /transaction/codi/qr/{id} y /transaction/bank-account/{id}: campos, paginación, errores y cuál usar para confirmar un pago."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/get-transaction
  - https://docs.pey.mx/docs/api/get-api-key-transactions
  - https://docs.pey.mx/docs/api/get-co-di-qr-transactions
  - https://docs.pey.mx/docs/api/get-bank-account-transactions
---

# 07 · Transacciones

## Campos de una transacción (forma completa)

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | ULID |
| `status` | enum | `PENDING` \| `PAID` |
| `amount` | number | Total en MXN |
| `amountBreakdown` | object | `base`, `tip`, `fee`; el `fee` lo paga quien paga |
| `currency` | string | ISO 4217 |
| `paymentMethod` | enum | `CARD` \| `CODI` |
| `payableType` | enum | Qué se pagó: `PAYMENT_LINK` \| `API_CODI_QR` \| `API_CODI_PN` |
| `payableId` | string | ID del recurso pagado, si existe |
| `description` | string | Concepto o descripción, si existe |
| `applicationFee` | number | Comisión de la operación, si existe |
| `dateCreated` | integer | Unix |
| `datePaid` | integer | Unix; solo cuando ya está pagada |
| `metadata` | object | Depende del método y flujo; ver [08](08-tipos-de-datos.md) |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## GET /transaction/{id} · Una transacción

- Una transacción recibida con tu llave. Si no existe o es de otra llave: **404** (no se distinguen los dos casos).
- **Un QR no es una transacción:** para los pagos de un QR usa `GET /transaction/codi/qr/{id}`.
- Sirve para seguir una push: usa el `transactionId` que regresó `POST /codi/pn`.
- **Ruta:** `id` (ULID). **Respuesta 200:** un objeto con los campos de arriba.
- **Errores:** 400 `INVALID_REQUEST` (`authError`: no viene el id de la llave) o `INCOMPLETE_PARAMETERS` (`missingId`); 404 `NOT_FOUND`; 500 `INTERNAL_SERVER_ERROR`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Transaction](https://docs.pey.mx/docs/api/get-transaction) · consultado 2026-11-07

## GET /transaction/api-key · Todo lo de tu llave

- Todas las transacciones recibidas por tu llave (la llave sale del header `Authorization`), **80 por página**, de la más reciente a la más antigua.
- **Query:** `nextToken` (opcional). **Respuesta 200:** `{ items: [transacción completa…], nextToken }`; `nextToken` es `null` al final.
- **Errores:** 400 `INVALID_REQUEST` (`authError`) o `INVALID_PARAMETERS` (`invalidNextToken`); 500 `INTERNAL_SERVER_ERROR`.
- No hay filtros por fecha, estado ni método: filtra en tu servidor.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get API Key Transactions](https://docs.pey.mx/docs/api/get-api-key-transactions) · consultado 2026-11-07

## GET /transaction/codi/qr/{id} · Pagos de un QR

- Pagos de un QR creado con tu llave, **20 por página**, de la más reciente a la más antigua. QR inexistente o de otra llave: **404** `NOT_FOUND`.
- **Ruta:** `id` = IDC del QR (el `id` que regresó `POST /codi/qr`). **Query:** `nextToken`.
- **Cada item:** `id`, `status` (`PENDING` | `PAID`), `amount`, `amountBreakdown`, `currency`, `paymentMethod` (`CODI`), `description`, `applicationFee`, `dateCreated`, `datePaid` (solo pagada) y `metadata`. El esquema de esta ruta no lista `payableType` ni `payableId`.
- **Errores:** 400 `INVALID_REQUEST` (`authError`), `INCOMPLETE_PARAMETERS` (`missingId`) o `INVALID_PARAMETERS` (`invalidNextToken`); 404 `NOT_FOUND`; 500 `INTERNAL_SERVER_ERROR`.

```json
// Respuesta 200 (ejemplo propio)
{ "items": [ { "id": "01JG0000000000000000000000", "status": "PAID", "amount": 85.5, "currency": "MXN",
               "paymentMethod": "CODI", "amountBreakdown": { "base": 85.5, "tip": 0, "fee": 0 },
               "description": "Pedido 318", "dateCreated": 1794000000, "datePaid": 1794000042,
               "metadata": { "externalMetadata": { "pedido": "318", "mesa": "4" } } } ],
  "nextToken": null }
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get CoDi QR Transactions](https://docs.pey.mx/docs/api/get-co-di-qr-transactions) · consultado 2026-11-07

## GET /transaction/bank-account/{id} · Lo cobrado por una cuenta registrada

- Transacciones **pagadas** que recibió una cuenta registrada con `POST /bank-account`: QR y push CoDi creados con ese `bankAccountId`. **80 por página**, de la más reciente a la más antigua. Cuenta inexistente o de otra llave: **404**.
- **Ruta:** `id` (ULID de la cuenta). **Query:** `nextToken`.
- **Cada item:** `id`, `status` (solo `PAID`), `amount`, `amountBreakdown`, `currency`, `paymentMethod` (solo `CODI`), `payableType` (`API_CODI_QR` | `API_CODI_PN`), `payableId`, `description`, `applicationFee`, `dateCreated`, `datePaid`, `metadata` (con `externalMetadata` de texto a texto; admite más campos).
- **Errores:** 400 `INVALID_REQUEST` (`authError`), `INCOMPLETE_PARAMETERS` (`missingId`) o `INVALID_PARAMETERS` (`invalidNextToken`); 404 `BANK_ACCOUNT_NOT_FOUND`; 503 `SERVICE_UNAVAILABLE` o `FLAGS_UNAVAILABLE`; 500 `INTERNAL_SERVER_ERROR`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Bank Account Transactions](https://docs.pey.mx/docs/api/get-bank-account-transactions) · consultado 2026-11-07

## Cuál usar para confirmar un pago (Recomendación)

| Cobraste con… | Confirma con… | Pagado si… |
|---|---|---|
| QR | `GET /transaction/codi/qr/{id}` (IDC) | algún item tiene `status: "PAID"` y el `amount` esperado |
| Push | `GET /transaction/{transactionId}` | `status: "PAID"` |
| Link de pago | `GET /payment-link/{id}` | `status: "paid"` ([06](06-api-ligas-de-pago.md)) |
| Cuenta registrada | `GET /transaction/bank-account/{id}` | aparece el pago con su `payableId` |

- Un 404 no prueba que no pagaron: puede ser un ID equivocado o de otra llave.
- Compara monto y moneda en tu servidor; no basta con encontrar cualquier `PAID`.
- La ruta de pagos de un QR regresa una lista paginada, lo que sugiere que un QR puede tener más de un pago (⚪ no confirmado): revisa todos los items.
- ⚪ Límite de peticiones no documentado: si haces polling, espacia las consultas (p. ej. cada 3 a 5 s) y detente al vencer el cobro.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07
