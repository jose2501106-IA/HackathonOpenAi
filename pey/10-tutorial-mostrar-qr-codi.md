---
titulo: "Tutorial: mostrar un QR CoDi"
resumen: "Los tres pasos del tutorial oficial (crear el QR, dibujar la imagen desde qrString, esperar el webhook) y una versión propia en JavaScript para navegador y servidor."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr
  - https://docs.pey.mx/openapi.json
---

# 10 · Tutorial: mostrar un QR CoDi

## Requisito

Una API key ligada a una cuenta de pago con acceso `codi` ([02](02-primeros-pasos-cuenta-llaves-y-prueba.md)). Es el único ejemplo de la categoría "Ejemplos" de la documentación. Encabezados oficiales, anclas y valores exactos del ejemplo: [14](14-tutoriales-paso-a-paso.md).

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [pey: Ejemplos](https://docs.pey.mx/docs/category/examples) · consultado 2026-11-07

## Paso 1 · Crear el QR

- `POST https://api.pey.mx/codi/qr` con `Authorization: Bearer <llave>`, `Content-Type: application/json` y `Accept: application/json`.
- El ejemplo oficial (Python con `requests`) manda monto, concepto, `expiration: 0` (sin vencimiento) y un `numRef`, y guarda la respuesta.
- La respuesta trae `id` (identificador del QR) y `qrString`. El `qrString` del ejemplo es un texto largo con forma de JSON y campos cifrados (claves como `TYP`, `v`, `ic`, `CRY`): **no lo modifiques**, solo codifícalo.
- Opción: `generateImage: true` agrega `qrImage` en base64 (PNG según el OpenAPI). El tutorial sugiere un decodificador base64 en línea para verlo; no subas QRs reales a sitios de terceros.

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Paso 2 · Generar la imagen

- El tutorial usa la librería de Python `qrcode` (https://pypi.org/project/qrcode/): tamaño automático, corrección de errores nivel M, módulos de 10 px y borde de 4 módulos; negro sobre blanco; guarda un PNG.
- Cualquier app bancaria compatible con CoDi puede escanear la imagen resultante.
- No da guía de tamaño mínimo ni de contraste. **Recomendación:** muéstralo grande (al menos ~250 px de lado en pantalla), negro sobre blanco y con el borde blanco intacto.

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Paso 3 · Esperar el pago

Cuando el cliente escanea y paga, pey manda el webhook `codi.qr.payment_received` ([09](09-webhooks.md)). Como respaldo puedes consultar `GET /transaction/codi/qr/{id}` ([07](07-api-transacciones.md)).

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Versión propia en JavaScript

El tutorial solo trae Python. Equivalente propio: el servidor crea el QR y el navegador lo dibuja.

```js
// Servidor (Node 20+): crea el QR. La llave sale de una variable de entorno.
const r = await fetch("https://api.pey.mx/codi/qr", {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.PEY_API_KEY}`, "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify({ amount: 1, concept: "Demo", expiration: 600, numRef: "1", generateImage: true }),
});
const { id, qrString, qrImage } = await r.json(); // manda al navegador solo id, qrString y qrImage

// Navegador: usa la imagen de pey si vino; si no, dibuja qrString con una librería de QR.
const img = document.querySelector("#qr");
if (qrImage) img.src = `data:image/png;base64,${qrImage}`;
// else: genera el QR desde qrString con la librería que elijas (⚪ pey no recomienda ninguna en JS).
img.alt = "Código QR CoDi para pagar";
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07
