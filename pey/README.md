# Documentación de pey (API CoDi) en Markdown

Versión de trabajo, en español de México y con redacción propia, de toda la documentación pública de pey, consultada el **2026-11-07**. Es la base RAG para agentes que construyan con pey. **No es documentación oficial:** ante cualquier duda, manda la página oficial enlazada al final de cada sección.

- **Qué se recorrió:** las 37 URL del [mapa del sitio](https://docs.pey.mx/sitemap.xml), el [OpenAPI completo](https://docs.pey.mx/openapi.json) (versión `2026-10-20`, 11 rutas) y la [página comercial de la API](https://pey.mx/api-codi). En una segunda pasada del mismo día se abrieron una por una todas las páginas de Tutoriales, Referencia de la API, Registro de cambios y Recursos de marca, incluidos sus índices, las etiquetas y la versión en inglés de Recursos de marca.
- **Marcas:** ⚪ = no confirmado en la fuente. "Recomendación" = decisión de ingeniería, no dicho por pey. Los ejemplos de código y JSON son propios, con valores ficticios.
- **Síntesis con código probado y decisiones:** [K03 · CoDi y API de pey](../conocimiento/03-codi-y-api-pey.md).
- **Datos personales:** no se copian la CLABE ni el titular de la cuenta de prueba, ni correos o teléfonos de personas; se enlaza la página oficial.

## Cómo usar esta carpeta (agentes)

1. ¿Vas a cobrar con QR? Lee [04](04-api-codi-qr-y-push.md) → [07](07-api-transacciones.md) → [09](09-webhooks.md).
2. ¿Dudas de alta, llaves o pruebas? [02](02-primeros-pasos-cuenta-llaves-y-prueba.md).
3. ¿Un error de la API? Busca su `error.type` en [11](11-errores-y-limites.md).
4. No inventes campos: si algo no está aquí ni en el OpenAPI, márcalo `TODO(⚪)`.

## Lo que vamos a necesitar para el producto

Lista corta para construir sobre pey en el hackatón. Cada punto enlaza al archivo que lo detalla.

1. **Cuenta y llave.** Perfil en portal.mipey.mx → **Finanzas**: cuenta de pago `codi` → **Desarrollador**: "Crear API Key" vinculada a esa cuenta. La llave vive solo en `PEY_API_KEY`, en el servidor. → [02](02-primeros-pasos-cuenta-llaves-y-prueba.md), [14](14-tutoriales-paso-a-paso.md)
2. **Cuenta de prueba y montos.** Tu CLABE tarda 5 días hábiles. Para probar hoy, registra la cuenta de prueba que publica el paso 2 del tutorial: se activa al instante. Todo se cobra de verdad y lo pagado **no se devuelve**, así que usa de $0.01 a $1, con tope en el servidor. No hay sandbox. → [02](02-primeros-pasos-cuenta-llaves-y-prueba.md)
3. **Crear el cobro.** QR: `POST /codi/qr` responde 201; `amount` va en pesos, `expiration` es 0 o al menos 360, `numRef` lleva de 1 a 7 dígitos y `generateImage: true` agrega `qrImage`. Push: `POST /codi/pn` responde 200 y pide un celular de 10 dígitos. Para la demo conviene el QR. → [04](04-api-codi-qr-y-push.md)
4. **Mostrar el QR.** Muestra `qrImage` como `data:image/png;base64,…` o dibuja `qrString` sin modificarlo. → [10](10-tutorial-mostrar-qr-codi.md)
5. **Confirmar el pago por consulta.** QR: `GET /transaction/codi/qr/{id}` hasta ver un `PAID` con el monto esperado. Push: `GET /transaction/{transactionId}`. → [07](07-api-transacciones.md)
6. **Confirmar el pago por webhook firmado.** Hay uno por llave y se crea desde el engrane de la llave con "Crear Webhook". El secreto va en `PEY_WEBHOOK_SECRET`. Verifica la firma Standard Webhooks con el cuerpo crudo, deduplica por `webhook-id` y espera el evento `codi.qr.payment_received`. → [09](09-webhooks.md)
7. **Ligas de pago (opcional).** `POST /payment-link/create` pide `successUrl` y `backUrl` con HTTPS. Confirma con `GET /payment-link/{id}` (`paid`) o con `payment_link.status_updated`; la redirección no prueba el pago. → [06](06-api-ligas-de-pago.md)
8. **Cobrar a nombre de varios comercios (opcional).** Registra cada cuenta con `POST /bank-account` y cobra con su `bankAccountId`, que solo sirve en `ACTIVE` (hasta 5 días hábiles). → [05](05-api-cuentas-bancarias.md)
9. **Errores frecuentes.** `INVALID_STATE` (la llave no tiene CoDi habilitado), `PEY_CONSISTENCY_ERROR` (llave sin cuenta vinculada), `INVALID_PARAMETER` (`expiration` menor que 360), `INVALID_AMOUNT`, y 503 `SERVICE_UNAVAILABLE` o `FLAGS_UNAVAILABLE` (reintenta solo los GET). Programa contra `error.type`. → [11](11-errores-y-limites.md)
10. **Marca permitida.** Solo los cinco archivos oficiales, descargados y sin redibujar: `pey_codi_light.svg` o `pey_codi_dark.svg` en la pantalla de cobro y `loading_codi.gif` mientras esperas el pago. pey no publica colores, tipografía ni reglas de uso. → [12](12-recursos-de-marca.md)
11. **Lo que NO existe en la documentación del 2026-11-07.**
    - Sandbox: está "próximamente". La página comercial menciona llaves de prueba, pero la referencia no ([01](01-que-es-pey-y-codi.md)).
    - Cancelar un QR o una push, y devoluciones por API.
    - Endpoints para listar cuentas o links, y para administrar el webhook por API ([03](03-referencia-api-convenciones.md)).
    - Idempotencia al crear cobros (solo los webhooks traen `webhook-id`), límite de peticiones y código de error para una llave inválida ([11](11-errores-y-limites.md)).
    - Eventos de pago rechazado o vencido, y política de reintentos de webhooks ([09](09-webhooks.md)).
    - Fechas en el changelog y política de versiones ([13](13-registro-de-cambios.md)).
    - Manual de marca ([12](12-recursos-de-marca.md)).

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
| [12-recursos-de-marca.md](12-recursos-de-marca.md) | Los 5 archivos oficiales (nombres, formatos, descargas), versión en inglés, lo que no se publica y guía propia de uso | [Recursos de marca](https://docs.pey.mx/brand-assets) · [Brand assets](https://docs.pey.mx/en/brand-assets) |
| [13-registro-de-cambios.md](13-registro-de-cambios.md) | Las 2 entradas del changelog en orden (sin fechas publicadas), etiqueta "general", versionado y diferencias con K03 | [Registro de cambios](https://docs.pey.mx/docs/category/changelog) · [Etiqueta general](https://docs.pey.mx/docs/tags/general) |
| [14-tutoriales-paso-a-paso.md](14-tutoriales-paso-a-paso.md) | Los 3 tutoriales oficiales en su orden, con encabezados, anclas, avisos y valores del ejemplo | [Tutoriales](https://docs.pey.mx/docs/category/tutorials) |

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

Todas las URL quedaron abiertas y cubiertas; ninguna está pendiente. Las de las cuatro secciones del menú superior (Tutoriales, Documentación, Registro de cambios y Recursos de marca) se abrieron por segunda vez el 2026-11-07, una por una.

| Sección | URL | Dónde quedó |
|---|---|---|
| Tutoriales | https://docs.pey.mx/docs/category/tutorials | 14 (índice: Primeros pasos y Ejemplos) |
| Tutoriales | https://docs.pey.mx/docs/category/getting-started | 14 (índice: 2 tutoriales) |
| Tutoriales | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key | 02, 14 |
| Tutoriales | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks | 09, 14 |
| Tutoriales | https://docs.pey.mx/docs/category/examples | 10, 14 (índice: un solo ejemplo) |
| Tutoriales | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 10, 14 |
| Referencia de la API | https://docs.pey.mx/docs/category/api-reference | 03 (índice y tabla por página) |
| Referencia de la API | https://docs.pey.mx/docs/api/codi-api | 01, 03 |
| Referencia de la API | https://docs.pey.mx/docs/api/create-qr | 03, 04 |
| Referencia de la API | https://docs.pey.mx/docs/api/create-push-notification | 03, 04 |
| Referencia de la API | https://docs.pey.mx/docs/api/register-bank-account | 03, 05 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-bank-account | 03, 05 |
| Referencia de la API | https://docs.pey.mx/docs/api/create-payment-link | 03, 06 |
| Referencia de la API | https://docs.pey.mx/docs/api/update-payment-link | 03, 06 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-payment-link | 03, 06 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-transaction | 03, 07 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-api-key-transactions | 03, 07 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 03, 07 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-bank-account-transactions | 03, 07 |
| Registro de cambios | https://docs.pey.mx/docs/category/changelog | 13 (índice: 2 entradas) |
| Registro de cambios | https://docs.pey.mx/docs/changelog/introduction | 13 |
| Registro de cambios | https://docs.pey.mx/docs/changelog/bank-accounts | 13 |
| Registro de cambios | https://docs.pey.mx/docs/tags | 13 (una sola etiqueta: general) |
| Registro de cambios | https://docs.pey.mx/docs/tags/general | 13 (las 2 entradas del changelog) |
| Recursos de marca | https://docs.pey.mx/brand-assets | 12 |
| Webhooks | https://docs.pey.mx/docs/category/webhooks | 09 (índice) |
| Webhooks | https://docs.pey.mx/docs/webhooks/introduction | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/codi/qr | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/codi/pn | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/bank-account/updated | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/payment-link/status-update | 09 |
| Tipos | https://docs.pey.mx/docs/category/types | 08 (índice: 4 tipos; abierto el 2026-11-07) |
| Tipos | https://docs.pey.mx/docs/types/transaction-object | 08 |
| Tipos | https://docs.pey.mx/docs/types/amount-breakdown | 08 |
| Tipos | https://docs.pey.mx/docs/types/metadata-response | 08 |
| Tipos | https://docs.pey.mx/docs/types/bank-account | 05, 08 |
| Inicio | https://docs.pey.mx/ | 01 |

**Fuera del mapa del sitio:**

| URL | Dónde quedó |
|---|---|
| https://docs.pey.mx/openapi.json | 03 a 08, 11 |
| https://docs.pey.mx/en/brand-assets | 12 (mismos 5 archivos; sus descargas apuntan a `/en/img/design/…`, ⚪ no verificadas) |
| https://docs.pey.mx/img/design/pey_blue.svg y los otros 4 archivos de marca | 12 (enlazados; ⚪ su contenido no se pudo leer: el lector web dio error) |
| Las demás páginas en inglés (`/en/...`) | ⚪ No se recorrieron por separado. Las páginas en español enlazan su versión en inglés. |

Notas del recorrido: las páginas `/docs/api/...` se dibujan en el navegador desde el OpenAPI. Leídas como texto solo traen descripción y códigos HTTP (resumidos en [03](03-referencia-api-convenciones.md)), así que los campos salen del OpenAPI. El sitemap no trae `lastmod`. docs.pey.mx no respondió a `curl` desde este entorno (el proxy regresa 403), así que todo se leyó con un lector web.

## Contradicciones y huecos principales

- **Llaves de prueba:** la página comercial dice que hay llaves de prueba y productivas; la documentación técnica solo tiene producción y un sandbox "próximamente" ([01](01-que-es-pey-y-codi.md)).
- **Estados de link de pago:** la API incluye `partial`; el webhook no ([06](06-api-ligas-de-pago.md)).
- **Respuesta ante firma inválida:** el ejemplo de pey responde 500; K03 usa 401. Ambos son "no 2xx" ([09](09-webhooks.md)).
- **Dónde está la cuenta de prueba:** en el paso "2. Agrega una cuenta de pago" del tutorial, no en "Prueba en producción", que solo la menciona. Se corrigió en [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) y en K03.3.
- **Changelog sin fechas:** ninguna entrada trae fecha y el sitemap no tiene `lastmod` ([13](13-registro-de-cambios.md)).
- **⚪ Sin documentar:** límite de peticiones, idempotencia, código de llave inválida, reintentos y orden de webhooks, cancelación y devoluciones, comisión por tarjeta ([11](11-errores-y-limites.md)).

Fuente: [pey: mapa del sitio](https://docs.pey.mx/sitemap.xml) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: API CoDi®](https://pey.mx/api-codi) · [pey: Tutoriales](https://docs.pey.mx/docs/category/tutorials) · [pey: Referencia de la API](https://docs.pey.mx/docs/category/api-reference) · [pey: Registro de cambios](https://docs.pey.mx/docs/category/changelog) · [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · consultado 2026-11-07
