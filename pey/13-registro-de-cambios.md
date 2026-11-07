---
titulo: "Registro de cambios de la API de pey"
resumen: "Las dos entradas del changelog oficial (Introducción y Cuentas bancarias) en su orden, con lo que agregó y cambió cada una. Incluye la etiqueta 'general', la falta de fechas (ni en las páginas ni en el sitemap), la versión del OpenAPI y las diferencias con K03."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/category/changelog
  - https://docs.pey.mx/docs/changelog/introduction
  - https://docs.pey.mx/docs/changelog/bank-accounts
  - https://docs.pey.mx/docs/tags
  - https://docs.pey.mx/docs/tags/general
  - https://docs.pey.mx/sitemap.xml
  - https://docs.pey.mx/openapi.json
---

# 13 · Registro de cambios

## Cómo está organizado

| Página | URL | Qué contiene |
|---|---|---|
| Registro de cambios (categoría) | https://docs.pey.mx/docs/category/changelog | Lista dos entradas, en este orden: "Introducción" y "Cuentas bancarias", cada una con una línea de descripción. |
| Introducción | https://docs.pey.mx/docs/changelog/introduction | Entrada 1 |
| Cuentas bancarias | https://docs.pey.mx/docs/changelog/bank-accounts | Entrada 2, la última (no tiene página siguiente) |
| Etiquetas | https://docs.pey.mx/docs/tags | Una sola etiqueta: "general" |
| Etiqueta "general" | https://docs.pey.mx/docs/tags/general | "2 documentos etiquetados": las dos entradas |

**Fechas: ninguna.** Ninguna entrada publica fecha, versión ni autor. La página de la etiqueta tampoco, y el sitemap no trae `lastmod` (sus 37 URL solo dicen `changefreq` semanal y prioridad 0.5). ⚪ No se puede saber cuándo salió cada cambio. El único dato con forma de fecha es la versión del OpenAPI, `2026-10-20`, que versiona la especificación; ⚪ no está confirmado que corresponda a la entrada "Cuentas bancarias".

Fuente: [pey: Registro de cambios](https://docs.pey.mx/docs/category/changelog) · [pey: etiqueta general](https://docs.pey.mx/docs/tags/general) · [pey: etiquetas](https://docs.pey.mx/docs/tags) · [pey: mapa del sitio](https://docs.pey.mx/sitemap.xml) · consultado 2026-11-07

## Entrada 1 · Introducción (sin fecha)

- Da la bienvenida a la documentación pública de pey.
- Dice que esta sección llevará el registro general de cambios conforme evolucione la API, y que por ahora no tiene contenido.
- Etiqueta: general. **No registra ningún cambio.**

Fuente: [pey: registro de cambios, Introducción](https://docs.pey.mx/docs/changelog/introduction) · consultado 2026-11-07

## Entrada 2 · Cuentas bancarias (sin fecha)

En resumen: ya puedes registrar cuentas bancarias CoDi por API y elegir qué cuenta recibe cada pago CoDi. Etiqueta: general.

**Nuevos endpoints** (así se llama la sección oficial):

| Elemento | Qué agrega | Detalle |
|---|---|---|
| Register Bank Account (`POST /bank-account`) | Registra una CLABE bajo tu API key. Empieza en `PENDING` y pasa a `ACTIVE` cuando pey termina el registro ante Banxico. | [05](05-api-cuentas-bancarias.md) |
| Get Bank Account (`GET /bank-account/{id}`) | Regresa una cuenta registrada con su `codiStatus`. | [05](05-api-cuentas-bancarias.md) |
| Tipo "Cuenta bancaria" | Describe el objeto y sus valores de estado. | [08](08-tipos-de-datos.md) |
| Webhook "Cuenta bancaria actualizada" (`bank.account.updated`) | Se manda cuando una cuenta registrada por API pasa a `ACTIVE`. | [09](09-webhooks.md) |

**Cambios:**

| Elemento | Qué cambió | Detalle |
|---|---|---|
| Create QR (`POST /codi/qr`) y Create Push Notification (`POST /codi/pn`) | Aceptan `bankAccountId` opcional. Si no lo mandas, el pago va a la cuenta CoDi vinculada a tu API key. | [04](04-api-codi-qr-y-push.md) |
| Webhooks "Notificación push" (`codi.pn.payment_received`) y "QR" (`codi.qr.payment_received`) | Incluyen `bankAccountId` cuando se mandó en la petición. | [09](09-webhooks.md) |
| Get Bank Account Transactions (`GET /transaction/bank-account/{id}`) | Ahora documenta `externalMetadata` y solo lista transacciones CoDi. | [07](07-api-transacciones.md) |

No lista eliminaciones, pasos de migración ni avisos de cambios incompatibles.

Enlaces de la entrada: [Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account), [Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account), [Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account), [Cuenta bancaria actualizada](https://docs.pey.mx/docs/webhooks/bank-account/updated), [Create QR](https://docs.pey.mx/docs/api/create-qr), [Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification), [Notificación push](https://docs.pey.mx/docs/webhooks/codi/pn), [QR](https://docs.pey.mx/docs/webhooks/codi/qr) y [Get Bank Account Transactions](https://docs.pey.mx/docs/api/get-bank-account-transactions).

Fuente: [pey: registro de cambios, Cuentas bancarias](https://docs.pey.mx/docs/changelog/bank-accounts) · consultado 2026-11-07

## Versionado

- El OpenAPI (3.1.1) declara la versión `2026-10-20` y seguía igual el 2026-11-07.
- ⚪ No documentado: un header para fijar la versión, la política de compatibilidad y cómo se avisan los cambios incompatibles.
- **Recomendación:** antes de la demo, vuelve a abrir la categoría del changelog y revisa la versión del OpenAPI. Si cambió algo, compáralo contra [03](03-referencia-api-convenciones.md) a [11](11-errores-y-limites.md).

Fuente: [pey: registro de cambios, Introducción](https://docs.pey.mx/docs/changelog/introduction) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Diferencias frente a la síntesis previa del repo (K03, consultas del 2026-11-06)

- Endpoint que K03 no listaba: `GET /transaction/bank-account/{id}`.
- Errores de links de pago que K03 no listaba: `AUTH_ERROR`, `REQUEST_PARSING_ERROR`, `INVALID_URL`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID` y `FORBIDDEN` (403 por un link de otra llave, no por una llave inválida).
- `amountBreakdown.fee` lo paga quien paga; en links, el desglose omite los componentes en cero.
- Según pey, `webhook-id` es la llave de idempotencia; su ejemplo responde 500 ante una firma inválida.
- Sigue publicada la misma versión del OpenAPI (`2026-10-20`).
- La cuenta de prueba está en el paso "2. Agrega una cuenta de pago" del tutorial, no en "Prueba en producción" (corregido en K03.3 y en [02](02-primeros-pasos-cuenta-llaves-y-prueba.md)).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · [pey: Crear una API key, paso 2](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago) · consultado 2026-11-07
