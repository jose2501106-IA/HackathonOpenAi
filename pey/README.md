# Documentación de pey (API CoDi) en Markdown

Versión de trabajo, en español de México y con redacción propia, de toda la documentación pública de pey, consultada el **2026-11-07**. Es la base RAG para agentes que construyan con pey. **No es documentación oficial:** ante cualquier duda, manda la página oficial enlazada al final de cada sección.

- **Qué se recorrió:** las 37 URL del [mapa del sitio](https://docs.pey.mx/sitemap.xml), el [OpenAPI completo](https://docs.pey.mx/openapi.json) (versión `2026-10-20`, 11 rutas) y la [página comercial de la API](https://pey.mx/api-codi).
- **Marcas:** ⚪ = no confirmado en la fuente. "Recomendación" = decisión de ingeniería, no dicho por pey. Los ejemplos de código y JSON son propios, con valores ficticios.
- **Síntesis con código probado y decisiones:** [K03 · CoDi y API de pey](../conocimiento/03-codi-y-api-pey.md).
- **Datos personales:** no se copian la CLABE ni el titular de la cuenta de prueba, ni correos o teléfonos de personas; se enlaza la página oficial.

## Cómo usar esta carpeta (agentes)

1. ¿Vas a cobrar con QR? Lee [04](04-api-codi-qr-y-push.md) → [07](07-api-transacciones.md) → [09](09-webhooks.md).
2. ¿Dudas de alta, llaves o pruebas? [02](02-primeros-pasos-cuenta-llaves-y-prueba.md).
3. ¿Un error de la API? Busca su `error.type` en [11](11-errores-y-limites.md).
4. No inventes campos: si algo no está aquí ni en el OpenAPI, márcalo `TODO(⚪)`.

## Archivos

| Archivo | Tema | Páginas oficiales |
|---|---|---|
| [01-que-es-pey-y-codi.md](01-que-es-pey-y-codi.md) | Qué es pey, qué hace la API, dos formas de cobrar, precio, contradicción sobre llaves de prueba | [Inicio](https://docs.pey.mx/) · [API CoDi®](https://pey.mx/api-codi) · [Introducción](https://docs.pey.mx/docs/api/codi-api) |
| [02-primeros-pasos-cuenta-llaves-y-prueba.md](02-primeros-pasos-cuenta-llaves-y-prueba.md) | Portal, perfil, cuentas `codi`/`stripe`, crear API key, prueba en producción, entornos | [Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) |
| [03-referencia-api-convenciones.md](03-referencia-api-convenciones.md) | URL base, autenticación, IDs, montos, fechas, paginación, metadata, errores, mapa de endpoints | [Referencia de la API](https://docs.pey.mx/docs/category/api-reference) · [OpenAPI](https://docs.pey.mx/openapi.json) |
| [04-api-codi-qr-y-push.md](04-api-codi-qr-y-push.md) | `POST /codi/qr`, `POST /codi/pn` | [Create QR](https://docs.pey.mx/docs/api/create-qr) · [Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification) |
| [05-api-cuentas-bancarias.md](05-api-cuentas-bancarias.md) | `POST /bank-account`, `GET /bank-account/{id}`, `codiStatus`, multi-cuenta | [Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account) · [Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account) |
| [06-api-ligas-de-pago.md](06-api-ligas-de-pago.md) | `POST /payment-link/create`, `/update`, `GET /payment-link/{id}` | [Create](https://docs.pey.mx/docs/api/create-payment-link) · [Update](https://docs.pey.mx/docs/api/update-payment-link) · [Get](https://docs.pey.mx/docs/api/get-payment-link) |
| [07-api-transacciones.md](07-api-transacciones.md) | Las 4 rutas `/transaction/...` y cuál usar para confirmar un pago | [Get Transaction](https://docs.pey.mx/docs/api/get-transaction) · [API Key](https://docs.pey.mx/docs/api/get-api-key-transactions) · [CoDi QR](https://docs.pey.mx/docs/api/get-co-di-qr-transactions) · [Bank Account](https://docs.pey.mx/docs/api/get-bank-account-transactions) |
| [08-tipos-de-datos.md](08-tipos-de-datos.md) | Transacción, desglose del monto, metadata, cuenta bancaria, error, enumeraciones | [Tipos](https://docs.pey.mx/docs/category/types) |
| [09-webhooks.md](09-webhooks.md) | Registro, firma Standard Webhooks, historial, 4 eventos con todos sus campos | [Webhooks](https://docs.pey.mx/docs/webhooks/introduction) · [Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) |
| [10-tutorial-mostrar-qr-codi.md](10-tutorial-mostrar-qr-codi.md) | Tutorial oficial de QR y versión propia en JavaScript | [Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) |
| [11-errores-y-limites.md](11-errores-y-limites.md) | `error.type` por endpoint, cómo reaccionar, límites, lo no documentado | [OpenAPI](https://docs.pey.mx/openapi.json) |
| [12-recursos-de-marca.md](12-recursos-de-marca.md) | Logos pey y pey + CoDi, animación CoDi | [Recursos de marca](https://docs.pey.mx/brand-assets) |
| [13-registro-de-cambios.md](13-registro-de-cambios.md) | Changelog oficial y diferencias con K03 | [Registro de cambios](https://docs.pey.mx/docs/category/changelog) |

## Endpoints (11)

| Método | Ruta | Éxito | Archivo |
|---|---|---|---|
| POST | `/codi/qr` | 201 | [04](04-api-codi-qr-y-push.md) |
| POST | `/codi/pn` | 200 | [04](04-api-codi-qr-y-push.md) |
| POST | `/bank-account` | 200 | [05](05-api-cuentas-bancarias.md) |
| GET | `/bank-account/{id}` | 200 | [05](05-api-cuentas-bancarias.md) |
| POST | `/payment-link/create` | 200 | [06](06-api-ligas-de-pago.md) |
| POST | `/payment-link/update` | 200 | [06](06-api-ligas-de-pago.md) |
| GET | `/payment-link/{id}` | 200 | [06](06-api-ligas-de-pago.md) |
| GET | `/transaction/{id}` | 200 | [07](07-api-transacciones.md) |
| GET | `/transaction/api-key` | 200 | [07](07-api-transacciones.md) |
| GET | `/transaction/codi/qr/{id}` | 200 | [07](07-api-transacciones.md) |
| GET | `/transaction/bank-account/{id}` | 200 | [07](07-api-transacciones.md) |

Eventos de webhook (4): `codi.qr.payment_received`, `codi.pn.payment_received`, `bank.account.updated`, `payment_link.status_updated` → [09](09-webhooks.md).

## Cobertura del mapa del sitio (37 URL, consultado 2026-11-07)

| URL | Dónde quedó |
|---|---|
| https://docs.pey.mx/ | 01 |
| https://docs.pey.mx/brand-assets | 12 |
| https://docs.pey.mx/docs/api/codi-api | 01, 03 |
| https://docs.pey.mx/docs/api/create-qr | 04 |
| https://docs.pey.mx/docs/api/create-push-notification | 04 |
| https://docs.pey.mx/docs/api/register-bank-account | 05 |
| https://docs.pey.mx/docs/api/get-bank-account | 05 |
| https://docs.pey.mx/docs/api/create-payment-link | 06 |
| https://docs.pey.mx/docs/api/update-payment-link | 06 |
| https://docs.pey.mx/docs/api/get-payment-link | 06 |
| https://docs.pey.mx/docs/api/get-transaction | 07 |
| https://docs.pey.mx/docs/api/get-api-key-transactions | 07 |
| https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 07 |
| https://docs.pey.mx/docs/api/get-bank-account-transactions | 07 |
| https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key | 02 |
| https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks | 09 |
| https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 10 |
| https://docs.pey.mx/docs/types/transaction-object | 08 |
| https://docs.pey.mx/docs/types/amount-breakdown | 08 |
| https://docs.pey.mx/docs/types/metadata-response | 08 |
| https://docs.pey.mx/docs/types/bank-account | 05, 08 |
| https://docs.pey.mx/docs/webhooks/introduction | 09 |
| https://docs.pey.mx/docs/webhooks/codi/qr | 09 |
| https://docs.pey.mx/docs/webhooks/codi/pn | 09 |
| https://docs.pey.mx/docs/webhooks/bank-account/updated | 09 |
| https://docs.pey.mx/docs/webhooks/payment-link/status-update | 09 |
| https://docs.pey.mx/docs/changelog/introduction | 13 |
| https://docs.pey.mx/docs/changelog/bank-accounts | 13 |
| https://docs.pey.mx/docs/category/api-reference | 03 (índice) |
| https://docs.pey.mx/docs/category/webhooks | 09 (índice) |
| https://docs.pey.mx/docs/category/examples | 10 (índice: un solo ejemplo) |
| https://docs.pey.mx/docs/category/getting-started | Índice de las guías de 02 y 09 (⚪ página no abierta; sus enlaces sí) |
| https://docs.pey.mx/docs/category/tutorials | Índice de tutoriales (⚪ no abierta; sus enlaces sí) |
| https://docs.pey.mx/docs/category/types | Índice de tipos (⚪ no abierta; sus 4 tipos sí) |
| https://docs.pey.mx/docs/category/changelog | Índice del changelog (⚪ no abierta; sus 2 entradas sí) |
| https://docs.pey.mx/docs/tags | Índice de etiquetas (⚪ no abierta) |
| https://docs.pey.mx/docs/tags/general | Etiqueta "general" de las entradas del changelog (⚪ no abierta) |

Notas del recorrido: las páginas `/docs/api/...` se dibujan en el navegador desde el OpenAPI; leídas como texto solo traen descripción y códigos, así que los campos salen del OpenAPI. docs.pey.mx no respondió a `curl` desde este entorno (proxy); todo se leyó con un lector web. Las versiones en inglés (`/en/...`) no se recorrieron por separado.

## Contradicciones y huecos principales

- **Llaves de prueba:** la página comercial dice que hay llaves de prueba y productivas; la documentación técnica solo tiene producción y un sandbox "próximamente" ([01](01-que-es-pey-y-codi.md)).
- **Estados de link de pago:** la API incluye `partial`; el webhook no ([06](06-api-ligas-de-pago.md)).
- **Respuesta ante firma inválida:** el ejemplo de pey responde 500; K03 usa 401. Ambos son "no 2xx" ([09](09-webhooks.md)).
- **⚪ Sin documentar:** límite de peticiones, idempotencia, código de llave inválida, reintentos y orden de webhooks, cancelación y devoluciones, comisión por tarjeta ([11](11-errores-y-limites.md)).

Fuente: [pey: mapa del sitio](https://docs.pey.mx/sitemap.xml) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07
