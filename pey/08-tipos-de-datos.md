---
titulo: "Tipos de datos de pey"
resumen: "Objeto de transacción (forma resumida y completa), desglose del monto, respuesta de metadata (campos CoDi y externalMetadata), cuenta bancaria, objeto de error y todas las enumeraciones."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/types/transaction-object
  - https://docs.pey.mx/docs/types/amount-breakdown
  - https://docs.pey.mx/docs/types/metadata-response
  - https://docs.pey.mx/docs/types/bank-account
  - https://docs.pey.mx/openapi.json
---

# 08 · Tipos de datos

## Objeto de transacción (forma resumida)

Es la forma corta que aparece en `GET /payment-link/{id}` y en el webhook `payment_link.status_updated`. La forma completa (con estado, moneda y recurso pagado) sale de `GET /transaction/{id}` ([07](07-api-transacciones.md)).

| Campo | Tipo | Notas |
|---|---|---|
| `transactionId` | string | ULID |
| `paymentMethod` | string | Método usado (el ejemplo muestra `CARD`; la forma completa enumera `CARD` y `CODI`) |
| `datePaid` | number | Unix en segundos |
| `amount` | number | Total cobrado; incluye propina y comisión |
| `amountBreakdown` | object | Ver "Desglose del monto" |
| `applicationFee` | number o null | Comisión de aplicación que retiene pey |
| `metadata` | object | Depende del método y el flujo; ver "Respuesta de metadata" |

Fuente: [pey: tipo Objeto de transacción](https://docs.pey.mx/docs/types/transaction-object) · consultado 2026-11-07

## Desglose del monto (amountBreakdown)

| Campo | Tipo | Qué es |
|---|---|---|
| `base` | number | Monto base |
| `tip` | number | Propina incluida |
| `fee` | number | Comisión incluida; según el OpenAPI la paga quien paga |

- La página del tipo no da fórmula; el objeto de transacción dice que `amount` incluye propina y comisión, y el ejemplo del webhook de links es consistente con `amount = base + tip + fee` (⚪ inferencia, no regla escrita).
- En los links de pago, el desglose solo incluye componentes distintos de cero: trata un campo ausente como 0.

Fuente: [pey: tipo Desglose del monto](https://docs.pey.mx/docs/types/amount-breakdown) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Respuesta de metadata

Los campos dependen del método de pago y del flujo:

| Campo | Tipo | Cuándo viene | Qué es |
|---|---|---|---|
| `clabe` | string | método `CODI` | CLABE (18 dígitos) que recibe |
| `bankCode` | number | método `CODI` | Código de banco de Banxico (5 dígitos) |
| `accountType` | number | método `CODI` | Código de tipo de cuenta de Banxico (2 dígitos) |
| `description` | string | método `CODI` | Descripción de la transacción |
| `trackingKey` | string | método `CODI` | Clave de rastreo interna de Banxico |
| `externalMetadata` | object | solo si mandaste `metadata` al crear el recurso por la API REST | Tus pares clave/valor, **todos como texto** |

- ⚪ No documentado: qué campos trae `metadata` en pagos con tarjeta.
- `clabe` y `trackingKey` son datos bancarios: no los registres en logs públicos.

Fuente: [pey: tipo Respuesta de metadata](https://docs.pey.mx/docs/types/metadata-response) · consultado 2026-11-07

## Cuenta bancaria

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | ULID; úsalo como `bankAccountId` |
| `alias` | string | Nombre amigable |
| `name` | string | Nombre legal completo del titular |
| `clabe` | string | 18 dígitos |
| `entity` | string | `BUSINESS` \| `PERSON` |
| `taxId` | string | RFC; solo si se dio al registrar |
| `codiStatus` | string | `PENDING` \| `PROCESSING` \| `ACTIVE` \| `ERROR` |
| `errorMessage` | string | Solo con `ERROR` |
| `dateCreated` | number | Unix en segundos |

`POST /bank-account` solo regresa `id` y `codiStatus`; el objeto completo sale de `GET /bank-account/{id}`. Ciclo de vida en [05](05-api-cuentas-bancarias.md).

Fuente: [pey: tipo Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account) · consultado 2026-11-07

## Objeto de error

| Campo | Tipo | Qué es |
|---|---|---|
| `error.message` | string | Texto legible (no programes contra él) |
| `error.type` | string (enum por endpoint) | Código para tu lógica |
| `error.requestId` | string | ID para soporte |

Catálogo completo en [11](11-errores-y-limites.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Enumeraciones (resumen)

| Campo | Valores | Dónde |
|---|---|---|
| `status` (transacción) | `PENDING`, `PAID` | `/transaction/*` (`/transaction/bank-account/{id}` solo `PAID`) |
| `paymentMethod` | `CARD`, `CODI` | transacciones |
| `payableType` | `PAYMENT_LINK`, `API_CODI_QR`, `API_CODI_PN` | `/transaction/{id}`, `/transaction/api-key`, `/transaction/bank-account/{id}` |
| `status` (link de pago) | `pending`, `processing`, `paid`, `partial` | `GET /payment-link/{id}` (el webhook solo lista `paid`, `pending`, `processing`) |
| `codiStatus` | `PENDING`, `PROCESSING`, `ACTIVE`, `ERROR` | cuentas bancarias |
| `entity` | `BUSINESS`, `PERSON` | cuentas bancarias |
| `ownerType` | `API_KEY` (cuentas registradas por API) | webhook `bank.account.updated` |
| `type` (evento) | `codi.qr.payment_received`, `codi.pn.payment_received`, `bank.account.updated`, `payment_link.status_updated` | webhooks |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07
