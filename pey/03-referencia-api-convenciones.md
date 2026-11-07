---
titulo: "Referencia de la API: convenciones generales"
resumen: "URL base, autenticación Bearer, headers, identificadores (ULID, IDC, folio CoDi), montos, fechas, paginación con nextToken, metadata, formato de error, propiedad de recursos y mapa de los 11 endpoints."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/codi-api
  - https://docs.pey.mx/docs/category/api-reference
---

# 03 · Referencia de la API: convenciones

## Especificación y servidor

- **Especificación:** OpenAPI 3.1.1, título "CoDi API", versión `2026-10-20`. Descarga: https://docs.pey.mx/openapi.json
- **Servidor único:** `https://api.pey.mx` (producción).
- Las páginas de referencia (`/docs/api/...`) se generan del OpenAPI y se dibujan en el navegador; leídas como texto solo muestran descripción y códigos de respuesta. **El OpenAPI es la fuente completa** de campos, tipos y errores.
- La sección `webhooks` del OpenAPI está vacía: los eventos solo se documentan en páginas ([09](09-webhooks.md)).
- La referencia agrupa los endpoints en: Introduction, CoDi (2), Bank Account (2), Payment Link (3) y Transaction (4).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [Referencia de la API (categoría)](https://docs.pey.mx/docs/category/api-reference) · consultado 2026-11-07

## Autenticación y headers

- Esquema `http`, tipo `bearer`: la API key va en el header `Authorization: Bearer <API key>`. Todas las rutas usan el mismo esquema (`dev-PublicApiLambdaAuthorizer`).
- El tutorial agrega `Content-Type: application/json` y `Accept: application/json`.
- **Sin llave o con llave inválida** no hay un 401 documentado. Lo que sí aparece en ejemplos de error: en transacciones, un 400 `INVALID_REQUEST` (ejemplo `authError`, "apiKeyId no incluido"); en links de pago, un 400 `AUTH_ERROR` (ejemplo `authError`). ⚪ El código real ante una llave mala no está confirmado: maneja 400, 401 y 403.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Identificadores

| Identificador | Formato | Dónde aparece |
|---|---|---|
| IDC del QR | texto asignado por Banxico (el tutorial muestra uno de 10 caracteres hexadecimales) | `id` de `POST /codi/qr`; `codiQrId` en el webhook; ruta de `GET /transaction/codi/qr/{id}` |
| Transacción | ULID | `transactionId` (push y webhooks), `id` de transacciones |
| Folio CoDi de la push | 20 dígitos, asignado por Banxico | `codiId` de `POST /codi/pn` |
| Cuenta bancaria | ULID | `id` / `bankAccountId` |
| Link de pago | ULID | `id` / `paymentLinkId` |
| API key | texto | `apiKeyId` en webhooks; `ownerId` en `bank.account.updated` |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Montos, moneda y fechas

- **Montos en pesos MXN** como número con decimales (`150`, `25.5`, `0.01`), **no en centavos**.
- `POST /payment-link/update` redondea a 2 decimales (mitad hacia arriba) antes de guardar; ⚪ el redondeo en los demás endpoints no está documentado: manda siempre 2 decimales.
- `currency` en transacciones usa códigos ISO 4217 (en la práctica `MXN`).
- **Fechas** (`dateCreated`, `datePaid`): marca de tiempo Unix **en segundos**.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Paginación

- Las listas regresan `{ "items": [...], "nextToken": "<texto o null>" }`, de la más reciente a la más antigua.
- Para la página siguiente manda `?nextToken=<valor>`; omítelo en la primera. `nextToken` es `null` cuando ya no hay más.
- Tamaño: **80** por página en `/transaction/api-key` y `/transaction/bank-account/{id}`; **20** en `/transaction/codi/qr/{id}`.
- Un `nextToken` inválido da 400 `INVALID_PARAMETERS` (ejemplo `invalidNextToken`).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## metadata propia

- `POST /codi/qr`, `POST /codi/pn` y `POST /payment-link/create` aceptan `metadata`: hasta **50** pares; claves de hasta **40** caracteres; valores **escalares** (texto, número, booleano o null; sin objetos ni arreglos) de hasta **500** caracteres.
- Todo se guarda y regresa **como texto** (`12345` → `"12345"`, `false` → `"false"`, `null` → `"null"`).
- En transacciones y webhooks CoDi regresa dentro de `metadata.externalMetadata`; en `GET /payment-link/{id}` regresa en `metadata` del link. Ver [08](08-tipos-de-datos.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: tipo Respuesta de metadata](https://docs.pey.mx/docs/types/metadata-response) · consultado 2026-11-07

## Formato de error y propiedad de recursos

Todas las rutas responden errores con la misma forma (ejemplo propio):

```json
{ "error": { "message": "Texto legible", "type": "INVALID_AMOUNT", "requestId": "req-ficticio-123" } }
```

- Programa contra `error.type` (enumeración estable por endpoint), no contra `message`. Guarda `requestId` para soporte.
- **Propiedad:** solo ves recursos creados o registrados con tu llave. Un QR, transacción o cuenta de otra llave responde **404** (igual que si no existiera); un link de pago de otra llave puede responder **403** `FORBIDDEN`.
- Catálogo completo por endpoint: [11](11-errores-y-limites.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Mapa de endpoints (11)

| Método | Ruta | Resumen en el OpenAPI | Éxito | Archivo |
|---|---|---|---|---|
| POST | `/codi/qr` | Create QR | 201 | [04](04-api-codi-qr-y-push.md) |
| POST | `/codi/pn` | Create Push Notification | 200 | [04](04-api-codi-qr-y-push.md) |
| POST | `/bank-account` | Register Bank Account | 200 | [05](05-api-cuentas-bancarias.md) |
| GET | `/bank-account/{id}` | Get Bank Account | 200 | [05](05-api-cuentas-bancarias.md) |
| POST | `/payment-link/create` | Create Payment Link | 200 | [06](06-api-ligas-de-pago.md) |
| POST | `/payment-link/update` | Update Payment Link | 200 | [06](06-api-ligas-de-pago.md) |
| GET | `/payment-link/{id}` | Get Payment Link | 200 | [06](06-api-ligas-de-pago.md) |
| GET | `/transaction/{id}` | Get Transaction | 200 | [07](07-api-transacciones.md) |
| GET | `/transaction/api-key` | Get API Key Transactions | 200 | [07](07-api-transacciones.md) |
| GET | `/transaction/codi/qr/{id}` | Get CoDi QR Transactions | 200 | [07](07-api-transacciones.md) |
| GET | `/transaction/bank-account/{id}` | Get Bank Account Transactions | 200 | [07](07-api-transacciones.md) |

No hay endpoints para cancelar un QR o una push, devolver un pago, listar cuentas bancarias, listar links de pago ni administrar el webhook.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Lo que la referencia no documenta (⚪)

Límite de peticiones (rate limit), idempotencia o llaves de idempotencia, encabezado de versión, CORS (asume que solo se llama desde servidor), tiempos de respuesta garantizados, largo máximo de `concept` y política de compatibilidad entre versiones.

Fuente: [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07
