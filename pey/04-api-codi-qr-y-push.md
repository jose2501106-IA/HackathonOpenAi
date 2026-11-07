---
titulo: "API CoDi: crear QR y notificación push"
resumen: "POST /codi/qr y POST /codi/pn campo por campo: tipos, reglas, valores por defecto, respuestas, errores con ejemplos y cuándo usar cada uno."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/create-qr
  - https://docs.pey.mx/docs/api/create-push-notification
---

# 04 · CoDi: QR y notificación push

## POST /codi/qr · Crear QR

Genera vía Banxico un QR CoDi para recibir un pago. Respuesta exitosa: **201**.

**Cuerpo (JSON):**

| Campo | Tipo | Obligatorio | Reglas | Default | Qué hace |
|---|---|---|---|---|---|
| `amount` | number | sí | `>= 0` | — | Monto en pesos MXN. Con `0`, quien paga escribe el monto al escanear. Sin máximo publicado. |
| `concept` | string | no | largo máximo ⚪ no documentado | — | Concepto que ve quien paga. |
| `expiration` | integer | no | `0`, o `>= 360` | `0` | Vigencia en segundos. `0` = no vence. Si la usas, mínimo 360 (6 min). |
| `numRef` | string | no | `^[0-9]{1,7}$` | `"0"` | Referencia numérica de 1 a 7 dígitos, solo números. |
| `generateImage` | boolean | no | — | `false` | Si es `true`, la respuesta trae `qrImage`. Generarla hace más lenta la respuesta; para ir rápido, pey sugiere dibujar el QR en tu lado a partir de `qrString`. |
| `bankAccountId` | string (ULID) | no | cuenta con `codiStatus: ACTIVE` | — | Cuenta registrada que recibe el pago. Sin él, se usa la cuenta `codi` vinculada a la API key. |
| `metadata` | object | no | hasta 50 pares; clave `<= 40`; valor escalar `<= 500` | — | Datos tuyos; regresan como texto en `metadata.externalMetadata`. |

**Respuesta 201:**

| Campo | Tipo | Qué es |
|---|---|---|
| `id` | string | IDC: identificador único que asigna Banxico. Con él consultas los pagos del QR. |
| `qrString` | string | Contenido que debes codificar como imagen QR. |
| `qrImage` | string o null | PNG en base64. Solo viene con `generateImage: true`; es `null` si falló la imagen (el QR sí se creó). |

**Errores:** 400 (`INVALID_REQUEST`, `PEY_CONSISTENCY_ERROR`, `INVALID_STATE`, `INVALID_AMOUNT`, `INVALID_PARAMETER`), 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`), 500 (`INTERNAL_SERVER_ERROR`). Ejemplos con nombre del OpenAPI:

| Ejemplo | HTTP | `error.type` | Causa (parafraseada) |
|---|---|---|---|
| `invalidAmount` | 400 | `INVALID_AMOUNT` | Monto no numérico o negativo |
| `invalidExpiration` | 400 | `INVALID_PARAMETER` | Vigencia distinta de 0 y menor a 360 s |
| `codiNotEnabled` | 400 | `INVALID_STATE` | La API key no tiene CoDi habilitado |
| `missingBankAccount` | 400 | `PEY_CONSISTENCY_ERROR` | La API key no tiene cuenta bancaria vinculada |
| `invalidRequest` | 400 | `INVALID_REQUEST` | Cuerpo que no es JSON válido |
| `maintenance` | 503 | `SERVICE_UNAVAILABLE` | Endpoint en mantenimiento; reintenta después |
| `invokeError` | 500 | `INTERNAL_SERVER_ERROR` | Falló la creación del QR |
| `requestIdError` | 500 | `INTERNAL_SERVER_ERROR` | Falló la obtención del ID de solicitud |

**Ejemplo propio (valores ficticios):**

```json
// Petición
{ "amount": 85.5, "concept": "Pedido 318", "expiration": 900, "numRef": "318",
  "generateImage": true, "metadata": { "pedido": "318", "mesa": 4 } }
// Respuesta 201
{ "id": "a0b1c2d3e4", "qrString": "<contenido CoDi a codificar>", "qrImage": "<PNG en base64 o null>" }
```

Notas: pey no devuelve la hora de vencimiento (calcúlala con `expiration`); no hay endpoint para cancelar un QR.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Create QR](https://docs.pey.mx/docs/api/create-qr) · consultado 2026-11-07

## POST /codi/pn · Crear notificación push

Manda vía Banxico una solicitud de pago CoDi al celular de quien paga. Respuesta exitosa: **200**.

**Cuerpo (JSON):**

| Campo | Tipo | Obligatorio | Reglas | Default | Qué hace |
|---|---|---|---|---|---|
| `amount` | number | sí | `> 0` y `<= 1,000,000` | — | Monto en pesos MXN. |
| `phoneNumber` | string | sí | `^[0-9]{10}$` | — | Celular de 10 dígitos que recibe la notificación. |
| `concept` | string | no | largo ⚪ no documentado | — | Concepto que ve quien paga. |
| `expiration` | integer | no | `>= 360` | `360` | Vigencia de la notificación en segundos. |
| `numRef` | string | no | `^[0-9]{1,7}$` | `"0"` | Referencia numérica de 1 a 7 dígitos. |
| `bankAccountId` | string (ULID) | no | cuenta `ACTIVE` | — | Cuenta que recibe; sin él, la cuenta `codi` de la llave. |
| `metadata` | object | no | igual que en QR | — | Datos tuyos, regresan como texto. |

**Respuesta 200:**

| Campo | Tipo | Qué es |
|---|---|---|
| `transactionId` | string (ULID) | ID interno para seguir el pago con `GET /transaction/{id}`. |
| `codiId` | string | Folio CoDi de 20 dígitos asignado por Banxico. |

**Errores:** 400 (`INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_AMOUNT`, `INVALID_STATE`, `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST`), 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`), 500 (`INTERNAL_SERVER_ERROR`).

| Ejemplo | HTTP | `error.type` | Causa (parafraseada) |
|---|---|---|---|
| `missingPhone` | 400 | `INCOMPLETE_PARAMETERS` | Falta `phoneNumber` |
| `invalidPhone` | 400 | `INVALID_PARAMETER` | `phoneNumber` no es texto de 10 dígitos |
| `invalidAmount` | 400 | `INVALID_AMOUNT` | Monto no mayor que 0 |
| `codiNotEnabled` | 400 | `INVALID_STATE` | La llave no tiene CoDi habilitado |
| `maintenance` | 503 | `SERVICE_UNAVAILABLE` | Endpoint en mantenimiento |
| `invokeError` | 500 | `INTERNAL_SERVER_ERROR` | Falló la creación de la push |

**Ejemplo propio:**

```json
// Petición
{ "amount": 120, "phoneNumber": "5500000000", "concept": "Mensualidad", "expiration": 600, "numRef": "77" }
// Respuesta 200
{ "transactionId": "01JD0000000000000000000000", "codiId": "00000000000000000000" }
```

⚪ No documentado: qué pasa si el celular no está ligado a CoDi en ningún banco, y si existe un evento de push rechazada o vencida (solo hay evento de pago recibido).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification) · consultado 2026-11-07

## QR o push: cuál usar (Recomendación)

| Criterio | QR (`/codi/qr`) | Push (`/codi/pn`) |
|---|---|---|
| Requiere conocer al cliente | No | Sí, su celular |
| Monto abierto (`amount: 0`) | Sí | No (`> 0`) |
| Vigencia mínima | 0 (no vence) o 360 s | 360 s |
| Cómo confirmar | `GET /transaction/codi/qr/{id}` o webhook `codi.qr.payment_received` | `GET /transaction/{transactionId}` o webhook `codi.pn.payment_received` |
| Riesgo de reintento | Un QR duplicado no cobra dos veces por sí solo | Reintentar tras un timeout puede mandar dos solicitudes al cliente |

Para una demo en vivo conviene el QR: no depende de datos del cliente. No reintentes a ciegas ninguna creación tras un timeout: la API no documenta idempotencia (⚪).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07
