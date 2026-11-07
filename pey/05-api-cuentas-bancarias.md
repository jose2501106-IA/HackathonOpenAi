---
titulo: "API de cuentas bancarias: registrar y consultar CLABEs"
resumen: "POST /bank-account y GET /bank-account/{id}: campos, ciclo de vida de codiStatus (PENDING, PROCESSING, ACTIVE, ERROR), errores y cómo cobrar a nombre de cada cuenta con bankAccountId."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/register-bank-account
  - https://docs.pey.mx/docs/api/get-bank-account
  - https://docs.pey.mx/docs/types/bank-account
  - https://docs.pey.mx/docs/changelog/bank-accounts
---

# 05 · Cuentas bancarias

## POST /bank-account · Registrar una cuenta

Registra una CLABE bajo tu API key para que pueda recibir pagos CoDi. La cuenta nace en `PENDING`; pey la registra ante Banxico (hasta 5 días hábiles) y la pasa a `ACTIVE`. Respuesta exitosa: **200**.

**Cuerpo (JSON), los cuatro campos son obligatorios:**

| Campo | Tipo | Reglas | Qué es |
|---|---|---|---|
| `alias` | string | 1 a 255 caracteres | Nombre amigable de la cuenta. |
| `name` | string | 1 a 255 caracteres | Nombre legal completo del titular (persona física o moral). |
| `clabe` | string | `^[0-9]{18}$` y dígito verificador válido | CLABE de 18 dígitos. El banco debe tener CoDi habilitado. |
| `entity` | string (enum) | `BUSINESS` o `PERSON` | Tipo de titular. |

**Respuesta 200:** `id` (ULID de la cuenta en pey) y `codiStatus` (`PENDING` | `PROCESSING` | `ACTIVE` | `ERROR`).

**Errores:** 400 (`INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_CLABE`), 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`), 500 (`INTERNAL_SERVER_ERROR`).

| Ejemplo | HTTP | `error.type` | Causa (parafraseada) |
|---|---|---|---|
| `missingFields` | 400 | `INCOMPLETE_PARAMETERS` | Faltan campos obligatorios |
| `invalidClabe` | 400 | `INVALID_CLABE` | CLABE inválida |
| `invalidEntity` | 400 | `INVALID_PARAMETER` | `entity` distinto de `BUSINESS` o `PERSON` |
| (sin nombre) | 503 | `SERVICE_UNAVAILABLE` | Endpoint en mantenimiento |
| (sin nombre) | 500 | `INTERNAL_SERVER_ERROR` | Falló la creación de la cuenta |

**Ejemplo propio (datos ficticios):**

```json
// Petición
{ "alias": "Puesto de tamales", "name": "Nombre Legal Ficticio", "clabe": "<CLABE de 18 dígitos>", "entity": "PERSON" }
// Respuesta 200
{ "id": "01JE0000000000000000000000", "codiStatus": "PENDING" }
```

⚪ La cuenta puede traer `taxId` (RFC) "si se proporcionó al registrar", pero el cuerpo de este endpoint no tiene campo `taxId`: no está documentado cómo se envía.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account) · consultado 2026-11-07

## GET /bank-account/{id} · Consultar una cuenta

Regresa una cuenta registrada con `POST /bank-account` y su estado CoDi; sirve para ver cuándo pasa de `PENDING` a `ACTIVE`. Solo ves cuentas registradas con tu llave: las de otra llave o inexistentes dan **404**.

- **Parámetro de ruta:** `id` (obligatorio, ULID de la cuenta).
- **Respuesta 200:** el objeto Cuenta bancaria completo: `id`, `alias`, `name`, `clabe`, `entity`, `taxId` (opcional), `codiStatus`, `errorMessage` (solo con `ERROR`) y `dateCreated` (Unix en segundos). Detalle en [08](08-tipos-de-datos.md).
- **Errores:** 400 `INVALID_REQUEST` o `INCOMPLETE_PARAMETERS` (falta el id en la ruta); 404 `BANK_ACCOUNT_NOT_FOUND`; 503 `SERVICE_UNAVAILABLE` o `FLAGS_UNAVAILABLE`; 500 `INTERNAL_SERVER_ERROR` (falló la lectura de la cuenta).

```json
// Respuesta 200 (ejemplo propio)
{ "id": "01JE0000000000000000000000", "alias": "Puesto de tamales", "name": "Nombre Legal Ficticio",
  "clabe": "<CLABE de 18 dígitos>", "entity": "PERSON", "codiStatus": "ACTIVE", "dateCreated": 1794000000 }
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account) · consultado 2026-11-07

## Ciclo de vida de codiStatus

| Valor | Significado | Qué hacer |
|---|---|---|
| `PENDING` | Recibida; aún no se manda a Banxico | Esperar |
| `PROCESSING` | Registro ante Banxico en curso | Esperar (hasta 5 días hábiles en total) |
| `ACTIVE` | Registrada; ya puede recibir pagos CoDi | Usar su `id` como `bankAccountId` |
| `ERROR` | Falló el registro | Leer `errorMessage` y corregir |

- Solo las cuentas `ACTIVE` reciben pagos.
- Al pasar a `ACTIVE`, pey manda el webhook `bank.account.updated` (único aviso: `PENDING`, `PROCESSING` y `ERROR` no generan evento; consúltalos con `GET /bank-account/{id}`). Ver [09](09-webhooks.md).

Fuente: [pey: tipo Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account) · [pey: webhook Cuenta bancaria actualizada](https://docs.pey.mx/docs/webhooks/bank-account/updated) · consultado 2026-11-07

## Cobrar a nombre de cada cuenta (multi-cuenta)

1. Registra la CLABE de cada persona o negocio con `POST /bank-account` y guarda el `id`.
2. Espera `ACTIVE` (webhook o consulta).
3. Crea el QR o la push con `bankAccountId: <id>`: el pago va a esa cuenta. Sin `bankAccountId`, va a la cuenta `codi` vinculada a la llave.
4. Los webhooks de pago traen `bankAccountId` solo si lo mandaste al crear el cobro.
5. Para ver lo cobrado por esa cuenta: `GET /transaction/bank-account/{id}` ([07](07-api-transacciones.md)).

No hay endpoint para listar, editar ni borrar cuentas registradas (⚪ ni vía documentada para hacerlo).

Fuente: [pey: registro de cambios, Cuentas bancarias](https://docs.pey.mx/docs/changelog/bank-accounts) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07
