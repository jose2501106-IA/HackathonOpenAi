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

## Qué muestra cada página de la referencia (revisadas una por una)

La categoría "Referencia de la API" muestra cinco tarjetas: Introduction, CoDi (2 artículos), Bank Account (2), Payment Link (3) y Transaction (4). Las tarjetas de grupo abren directo su primer artículo: no hay páginas de grupo aparte. Las páginas escriben el parámetro de ruta como `:id` (por ejemplo `GET /bank-account/:id`); el OpenAPI lo escribe como `{id}`. Todas enlazan el OpenAPI ("Descargar especificación OpenAPI").

| Página | Método y ruta | Códigos que lista | Lo que agrega su texto |
|---|---|---|---|
| [Introduction](https://docs.pey.mx/docs/api/codi-api) | — | — | Versión `2026-10-20`; URL base solo de producción, `https://api.pey.mx`; consejo de probar en producción con $0.01 MXN y sandbox "pronto"; autenticación "Bearer Auth" (HTTP bearer en `Authorization`). Trae un contacto (no se copia aquí) y no trae licencia. |
| [Create QR](https://docs.pey.mx/docs/api/create-qr) | `POST /codi/qr` | 201, 400, 500, 503 | Crea un QR CoDi vía Banxico para recibir pagos. |
| [Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification) | `POST /codi/pn` | 200, 400, 500, 503 | Manda vía Banxico una notificación de cobro a un teléfono. |
| [Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account) | `POST /bank-account` | 200, 400, 500, 503 | Registra una CLABE bajo tu llave en `PENDING`; pasa a `ACTIVE` en hasta 5 días hábiles; revísala con Get Bank Account o espera el webhook; ya `ACTIVE`, usa su `id` como `bankAccountId`. |
| [Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account) | `GET /bank-account/{id}` | 200, 400, 404, 500, 503 | Solo cuentas de tu llave; una inexistente o de otra llave da 404; sirve para ver el paso de `PENDING` a `ACTIVE`. |
| [Create Payment Link](https://docs.pey.mx/docs/api/create-payment-link) | `POST /payment-link/create` | 200, 400, 500 | Crea un link; al terminar o cancelar, el cliente regresa a tus URL. |
| [Update Payment Link](https://docs.pey.mx/docs/api/update-payment-link) | `POST /payment-link/update` | 200, 400, 403, 404, 409, 500 | Solo cambia `amount`, solo links de tu llave y solo en `pending`. |
| [Get Payment Link](https://docs.pey.mx/docs/api/get-payment-link) | `GET /payment-link/{id}` | 200, 400, 403, 404, 500 | Solo links creados con tu llave. |
| [Get Transaction](https://docs.pey.mx/docs/api/get-transaction) | `GET /transaction/{id}` | 200, 400, 404, 500 | Solo transacciones de tu llave; 404 si no existe o es de otra; un QR no es una transacción. |
| [Get API Key Transactions](https://docs.pey.mx/docs/api/get-api-key-transactions) | `GET /transaction/api-key` | 200, 400, 500 | Todas las de tu llave, 80 por página; la llave sale del header `Authorization`; sigue con `nextToken`. |
| [Get CoDi QR Transactions](https://docs.pey.mx/docs/api/get-co-di-qr-transactions) | `GET /transaction/codi/qr/{id}` | 200, 400, 404, 500 | Pagos de un QR de tu llave, 20 por página, con `nextToken`; 404 si no existe o es de otra. |
| [Get Bank Account Transactions](https://docs.pey.mx/docs/api/get-bank-account-transactions) | `GET /transaction/bank-account/{id}` | 200, 400, 404, 500, 503 | Solo pagadas, de la más reciente a la más antigua, 80 por página; QR y push creados con ese `bankAccountId`; sigue con `nextToken`; 404 si es ajena. |

Los campos, tipos y errores de cada ruta no aparecen como texto en estas páginas: salen del OpenAPI ([04](04-api-codi-qr-y-push.md) a [07](07-api-transacciones.md) y [11](11-errores-y-limites.md)).

Fuente: [Referencia de la API (categoría)](https://docs.pey.mx/docs/category/api-reference) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · páginas de cada endpoint enlazadas en la tabla · consultado 2026-11-07

## Lo que la referencia no documenta (⚪)

Límite de peticiones (rate limit), idempotencia o llaves de idempotencia, encabezado de versión, CORS (asume que solo se llama desde servidor), tiempos de respuesta garantizados, largo máximo de `concept` y política de compatibilidad entre versiones.

Fuente: [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07
