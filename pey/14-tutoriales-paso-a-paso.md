---
titulo: "Tutoriales oficiales de pey, paso a paso"
resumen: "Los tres tutoriales de docs.pey.mx (Crear una API key, Configurar webhooks y Mostrar un QR CoDi) en su orden oficial: encabezados, anclas, pasos, avisos, enlaces e imágenes, con redacción propia y avisos para el hackatón."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/category/tutorials
  - https://docs.pey.mx/docs/category/getting-started
  - https://docs.pey.mx/docs/category/examples
  - https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key
  - https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks
  - https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr
---

# 14 · Tutoriales oficiales, paso a paso

Este archivo sigue el orden y los encabezados de cada tutorial oficial. El detalle técnico y el código propio están en [02](02-primeros-pasos-cuenta-llaves-y-prueba.md), [09](09-webhooks.md) y [10](10-tutorial-mostrar-qr-codi.md).

## Cómo está organizada la sección

| Página | URL | Qué contiene |
|---|---|---|
| Tutoriales (categoría) | https://docs.pey.mx/docs/category/tutorials | Solo dos tarjetas: "Primeros pasos" (2 artículos) y "Ejemplos" (1 artículo). No tiene texto propio. |
| Primeros pasos (categoría) | https://docs.pey.mx/docs/category/getting-started | Tarjetas de "Crear una API key" y "Configurar webhooks". |
| Ejemplos (categoría) | https://docs.pey.mx/docs/category/examples | Una tarjeta: "Mostrar un QR CoDi". |

- **Orden de la paginación del sitio:** Tutoriales → Primeros pasos → Crear una API key → Configurar webhooks → Ejemplos → Mostrar un QR CoDi.
- El tutorial de QR vive en `/docs/tutorials/use-cases/...`, aunque su categoría se llame "Ejemplos".
- Cada página tiene versión en inglés bajo `/en/...` (por ejemplo, https://docs.pey.mx/en/docs/category/tutorials). No se recorrieron por separado.
- **No hay tutoriales** de notificación push, links de pago, registro de cuentas por API ni consulta de pagos: para eso usa [04](04-api-codi-qr-y-push.md), [05](05-api-cuentas-bancarias.md), [06](06-api-ligas-de-pago.md) y [07](07-api-transacciones.md).

Fuente: [pey: Tutoriales](https://docs.pey.mx/docs/category/tutorials) · [pey: Primeros pasos](https://docs.pey.mx/docs/category/getting-started) · [pey: Ejemplos](https://docs.pey.mx/docs/category/examples) · consultado 2026-11-07

## Tutorial 1 · Crear una API key

URL: https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key. La página abre diciendo que lo primero es generar una API key en el portal de pey. Su esquema real es un título y cuatro secciones H2; "Comienza a probar de inmediato" y "Registra cuentas bancarias a través de la API" son textos destacados dentro del paso 2, no encabezados.

| # | Sección oficial (ancla) | Qué se hace, en orden | Detalle |
|---|---|---|---|
| 1 | "1. Crea un perfil" (`#1-crea-un-perfil`) | Entra a https://portal.mipey.mx/ y crea tu perfil. Si ya tienes uno, sigue al paso 2. | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2 | "2. Agrega una cuenta de pago" (`#2-agrega-una-cuenta-de-pago`) | En **Finanzas** (https://portal.mipey.mx/finance) crea una cuenta de pago. Tabla de tipos: `stripe` (tus datos bancarios por la integración con Stripe, para tarjetas, Apple Pay y Google Pay) y `codi` (solo cuentas bancarias mexicanas; capturas tus datos directo, para pagos CoDi®). | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2.1 | Recuadro "aviso" | Registrar una cuenta bancaria ante Banxico tarda **5 días hábiles**. | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2.2 | "Comienza a probar de inmediato" | La página publica una **cuenta bancaria de prueba** (CLABE y titular; aquí no se copian) que se activa al momento, para probar en producción el mismo día. Lo que se le pague **no se devuelve**; usa montos pequeños como $0.01 MXN. Puedes registrarla mientras se activa la tuya. | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2.3 | "Registra cuentas bancarias a través de la API" | Alternativa: registra cuentas CoDi con Register Bank Account, revisa su estado con Get Bank Account y manda su `id` como `bankAccountId` al crear un QR o una push. | [05](05-api-cuentas-bancarias.md) |
| 2.4 | Imagen | Captura de la pantalla de Finanzas con las opciones para aceptar pagos (texto alternativo oficial: "Elegir una opción de finanzas para aceptar pagos"). | — |
| 3 | "3. Crea una API key" (`#3-crea-una-api-key`) | Con la cuenta de pago lista, entra a **Desarrollador** en la barra lateral (https://portal.mipey.mx/developers), da clic en **"Crear API Key"**, ponle nombre y vincula una de tus cuentas de pago. | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 3.1 | Recuadro "info" | Cada llave puede tener a la vez una cuenta `codi` y una `stripe`; necesita al menos una. | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 4 | "Prueba en producción" (`#test-in-production`) | pey recomienda probar directo en producción, con bancos, notificaciones CoDi® y webhooks reales, para ver el mismo flujo que tus clientes; montos como $0.01 MXN; no esperes a que se active tu cuenta: usa la de prueba (el enlace regresa a `#2-agrega-una-cuenta-de-pago`). Recuadro "nota": un sandbox dedicado llegará "pronto"; mientras, producción es la forma más confiable de validar de punta a punta. | [02](02-primeros-pasos-cuenta-llaves-y-prueba.md) |

Navegación: anterior "Primeros pasos", siguiente "Configurar webhooks".

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

## Tutorial 2 · Configurar webhooks

URL: https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks

| # | Sección oficial (ancla) | Qué se hace, en orden | Detalle |
|---|---|---|---|
| 0 | Recuadro "info" inicial | Tres consideraciones: el webhook se liga a una API key; cada llave tiene **un solo** webhook; las peticiones se firman con la especificación [Standard Webhooks](https://www.standardwebhooks.com/). | [09](09-webhooks.md) |
| 0.1 | Recuadro de aviso (requisito) | Necesitas una API key antes de empezar; si no la tienes, ve al tutorial 1. | — |
| 1 | "1. Configura un webhook" (`#1-configura-un-webhook`) | En **Desarrollador** (https://portal.mipey.mx/developers) busca tu llave en la lista y da clic en su **ícono de engrane**; en la ventana emergente escribe la URL que recibirá los eventos y da clic en **"Crear Webhook"**. Imagen con texto alternativo "Configuración de la API key para configurar el webhook". | [09](09-webhooks.md) |
| 2 | "2. Guarda el secreto del webhook" (`#2-guarda-el-secreto-del-webhook`) | Al crear el webhook aparece el **secreto de firma**: guárdalo, tu endpoint lo necesita. Recuadro "info": puedes **rotar** el secreto cuando quieras desde el mismo engrane de la llave. | [09](09-webhooks.md) |
| 3 | "3. Crea tu endpoint de webhooks" (`#3-crea-tu-endpoint-de-webhooks`) | Construye tu endpoint; para verificar firmas pey recomienda los SDK de Standard Webhooks ([implementaciones de referencia](https://github.com/standard-webhooks/standard-webhooks?tab=readme-ov-file#reference-implementations)); el resto está en la [introducción de Webhooks](https://docs.pey.mx/docs/webhooks/introduction). | [09](09-webhooks.md) |

Esta página **no trae** código, nombres de headers, eventos, códigos HTTP ni política de reintentos: todo eso está en [09](09-webhooks.md). Navegación: anterior "Crear una API key", siguiente "Ejemplos".

Fuente: [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · consultado 2026-11-07

## Tutorial 3 · Mostrar un QR CoDi

URL: https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr (ruta de migas: Inicio › Tutoriales › Ejemplos › Mostrar un QR CoDi). Explica cómo crear un QR CoDi por API y mostrarlo como imagen escaneable. Recuadro de aviso: necesitas una API key vinculada a una cuenta de pago `codi`.

| # | Sección oficial (ancla) | Qué se hace, en orden | Detalle |
|---|---|---|---|
| 1 | "1. Crea un QR CoDi" (`#1-crea-un-qr-codi`) | `POST https://api.pey.mx/codi/qr` (enlace a [Create QR](https://docs.pey.mx/docs/api/create-qr)) con `Content-Type: application/json`, `Accept: application/json` y `Authorization: Bearer <tu llave>`. El ejemplo es Python con `requests`; cuerpo: `amount` 150, `concept` "Order #9423", `expiration` 0 y `numRef` "9423". Respuesta de ejemplo: `id` (10 caracteres hexadecimales) y `qrString` (texto con forma de JSON, recortado en la página). | [04](04-api-codi-qr-y-push.md), [10](10-tutorial-mostrar-qr-codi.md) |
| 1.1 | Recuadro "info" | Si usas `generateImage` y quieres ver el `qrImage` en base64 en el navegador, sugiere un decodificador en línea (https://base64.guru/converter/decode/file). | [10](10-tutorial-mostrar-qr-codi.md) |
| 2 | "2. Genera la imagen del QR" (`#2-genera-la-imagen-del-qr`) | `pip install qrcode` ([qrcode en PyPI](https://pypi.org/project/qrcode/)); lee `qrString` de la respuesta; `qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=4)`, luego `add_data(...)`, `make(fit=True)`, `make_image(fill_color="black", back_color="white")` y `save("codi-qr.png")`. Cualquier app bancaria compatible con CoDi puede escanear la imagen. Imagen de muestra con texto alternativo "Ejemplo de QR CoDi". | [10](10-tutorial-mostrar-qr-codi.md) |
| 3 | "3. Recibe la notificación del pago" | Cuando el cliente escanea y paga, llega el webhook `codi.qr.payment_received` (enlace a "Pago de QR CoDi recibido": https://docs.pey.mx/docs/webhooks/codi/qr). | [09](09-webhooks.md) |

Navegación: anterior "Ejemplos"; no hay página siguiente en la sección.

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [pey: Ejemplos](https://docs.pey.mx/docs/category/examples) · consultado 2026-11-07

## Avisos para el hackatón (Recomendación)

- El ejemplo oficial cobra **$150**: en producción es dinero real. En este repo, pruebas y demo van de $0.01 a $1 con tope en el servidor ([AGENTS.md](../AGENTS.md), sección 3).
- `expiration: 0` crea un QR que no vence: úsalo solo para el QR de respaldo; en la demo, `expiration` de 600.
- No pegues `qrImage` ni `qrString` reales en decodificadores de terceros: muéstralo en tu propia página como `data:image/png;base64,…` ([10](10-tutorial-mostrar-qr-codi.md)).
- Los tutoriales están en Python; la versión propia en JavaScript para Vercel está en [10](10-tutorial-mostrar-qr-codi.md) y el handler de webhook verificado en [09](09-webhooks.md).

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07
