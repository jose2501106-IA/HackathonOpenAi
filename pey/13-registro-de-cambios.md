---
titulo: "Registro de cambios de la API de pey"
resumen: "Qué dice el changelog oficial (introducción vacía y la entrada de Cuentas bancarias), la versión del OpenAPI y qué cambió respecto a lo que se sabía antes."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/changelog/introduction
  - https://docs.pey.mx/docs/changelog/bank-accounts
  - https://docs.pey.mx/openapi.json
---

# 13 · Registro de cambios

## Versionado

- El OpenAPI declara la versión `2026-10-20` (forma de fecha).
- La introducción del changelog dice que ahí irá el registro general conforme evolucione la API, y por ahora no tiene contenido.
- ⚪ No documentado: encabezado para fijar versión, política de compatibilidad, avisos de cambios que rompen y fechas de cada entrada.

Fuente: [pey: registro de cambios, introducción](https://docs.pey.mx/docs/changelog/introduction) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Entrada "Cuentas bancarias" (sin fecha publicada)

**Se agregó:**
- `POST /bank-account` (Register Bank Account): registra una CLABE bajo tu llave; empieza en `PENDING` y pasa a `ACTIVE` cuando termina el registro ante Banxico.
- `GET /bank-account/{id}` (Get Bank Account): consulta la cuenta y su `codiStatus`.
- El tipo "Cuenta bancaria".
- El webhook `bank.account.updated`, al pasar a `ACTIVE`.

**Cambió:**
- `POST /codi/qr` y `POST /codi/pn` aceptan `bankAccountId` opcional: si viene, el pago va a esa cuenta; si no, a la cuenta `codi` de la llave.
- Los webhooks `codi.qr.payment_received` y `codi.pn.payment_received` incluyen `bankAccountId` cuando se mandó al crear el cobro.
- `GET /transaction/bank-account/{id}` documenta `externalMetadata` y solo lista transacciones CoDi.

No se listan eliminaciones ni pasos de migración.

Fuente: [pey: registro de cambios, Cuentas bancarias](https://docs.pey.mx/docs/changelog/bank-accounts) · consultado 2026-11-07

## Diferencias frente a la síntesis previa del repo (K03, consultas del 2026-11-06)

- Endpoint que K03 no listaba: `GET /transaction/bank-account/{id}`.
- Errores de links de pago que K03 no listaba: `AUTH_ERROR`, `REQUEST_PARSING_ERROR`, `INVALID_URL`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID` y `FORBIDDEN` (403, link de otra llave; no es el error de llave inválida).
- `amountBreakdown.fee` lo paga quien paga; en links, el desglose omite componentes en cero.
- `webhook-id` es la llave de idempotencia según pey; su ejemplo responde 500 ante firma inválida.
- La misma versión del OpenAPI (`2026-10-20`) sigue publicada.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07
