---
titulo: "Webhooks de pey: configuración, firma y eventos"
resumen: "Cómo se registra el webhook (uno por API key), cómo verificar la firma Standard Webhooks con el cuerpo crudo, historial de entregas y los cuatro eventos con todos sus campos."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/webhooks/introduction
  - https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks
  - https://docs.pey.mx/docs/webhooks/codi/qr
  - https://docs.pey.mx/docs/webhooks/codi/pn
  - https://docs.pey.mx/docs/webhooks/bank-account/updated
  - https://docs.pey.mx/docs/webhooks/payment-link/status-update
---

# 09 · Webhooks

## Cómo funcionan

- pey te avisa en tiempo real cuando pasa algo en tu cuenta, en lugar de que consultes la API a cada rato.
- El webhook se liga a la **API key**: **una llave tiene un solo webhook** (una sola URL). CoDi y links de pago llegan al mismo endpoint.
- Todas las peticiones van **firmadas con Standard Webhooks** (https://www.standardwebhooks.com/).
- La sección `webhooks` del OpenAPI está vacía: los eventos solo se documentan en las páginas de abajo.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · [pey: documentación, inicio](https://docs.pey.mx/) · consultado 2026-11-07

## Configurar el webhook en el portal

1. Ten una API key ([02](02-primeros-pasos-cuenta-llaves-y-prueba.md)).
2. En **Desarrollador** (https://portal.mipey.mx/developers), busca tu llave y da clic en su **ícono de engrane**.
3. En la ventana, escribe la URL que recibirá los eventos y da clic en **"Crear Webhook"**.
4. Se muestra el **secreto de firma**: guárdalo (lo necesitas para verificar). Puedes **rotarlo** cuando quieras desde el mismo engrane.

La URL debe ser pública y estable. ⚪ No documentado: si exige HTTPS, si se puede cambiar la URL sin borrar el webhook y si hay API para administrarlo.

Fuente: [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · consultado 2026-11-07

## Firma: Standard Webhooks

Lo que dice pey:
- Verifica la firma para confirmar que el evento viene de pey; recomienda los **SDK oficiales de Standard Webhooks** ([lista de implementaciones](https://github.com/standard-webhooks/standard-webhooks?tab=readme-ov-file#reference-implementations)).
- Verifica con el **cuerpo crudo**, sin parsear ni reformatear.
- El header **`webhook-id`** es la llave de idempotencia: úsalo para descartar entregas repetidas.
- Su ejemplo (Python con la librería de Standard Webhooks, en AWS Lambda detrás de API Gateway) lee el secreto de una variable de entorno o gestor de secretos (marcador con prefijo `whsec_`), responde 400 si el JSON no se puede leer, 200 si la firma es válida y **500** si no lo es.

Lo que viene de la especificación Standard Webhooks (pey no lo repite en sus páginas, ⚪ en pey): headers `webhook-id`, `webhook-timestamp` y `webhook-signature` (`v1,<firma en base64>`, puede haber varias separadas por espacio); la firma es HMAC-SHA256 de `id.timestamp.cuerpo` con el secreto sin `whsec_` decodificado de base64. Detalle y fuentes en [K03.5](../conocimiento/03-codi-y-api-pey.md).

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

## Ejemplo propio de verificación (Node.js 20+, sin dependencias)

```js
// Verifica un webhook de pey (Standard Webhooks). `cuerpo` es el texto crudo: await request.text().
import crypto from "node:crypto";

export function firmaValida({ secreto, headers, cuerpo, toleranciaSeg = 300 }) {
  const id = headers.get("webhook-id");
  const ts = headers.get("webhook-timestamp");
  const firmas = headers.get("webhook-signature");
  if (!secreto || !id || !ts || !firmas) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > toleranciaSeg) return false; // evita repeticiones viejas
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    const recibida = Buffer.from(b64 ?? "", "base64");
    return version === "v1" && recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}
```

Una versión equivalente con pruebas automatizadas está en [K03.7](../conocimiento/03-codi-y-api-pey.md). La tolerancia de 5 minutos es decisión propia.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

## Respuesta, reintentos e historial

- Responde rápido con 2xx cuando la firma sea válida; el ejemplo de pey responde 200.
- **Historial:** Desarrollador → engrane de la llave → botón **"Webhook Logs"**. Muestra cada intento de entrega, el payload enviado, la respuesta de tu endpoint y otros datos. Úsalo para depurar.
- ⚪ No documentado: política y calendario de reintentos, tiempo máximo de espera, orden de entrega y si hay eventos duplicados. Diseña para entregas repetidas y fuera de orden.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

## Evento codi.qr.payment_received

Se dispara cuando entra un pago a un QR CoDi creado por la API.

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | `codi.qr.payment_received` |
| `amount` | number | MXN |
| `apiKeyId` | string | Llave dueña del webhook |
| `bankAccountId` | string | Solo si lo mandaste al crear el QR |
| `codiQrId` | string | IDC del QR (el `id` de `POST /codi/qr`) |
| `concept` | string | Concepto que vio quien pagó |
| `datePaid` | number | Unix en **segundos** |
| `metadata` | object | Campos CoDi (`clabe`, `bankCode`, `accountType`, `description`, `trackingKey`) y `externalMetadata` ([08](08-tipos-de-datos.md)) |
| `numRef` | string | Número de referencia (la página dice que lo asigna Banxico) |
| `transactionId` | string | ULID de la transacción |

```json
{ "type": "codi.qr.payment_received", "amount": 85.5, "apiKeyId": "llave-ficticia", "codiQrId": "a0b1c2d3e4",
  "concept": "Pedido 318", "datePaid": 1794000042, "numRef": "318", "transactionId": "01JG0000000000000000000000",
  "metadata": { "trackingKey": "<clave de rastreo>", "externalMetadata": { "pedido": "318" } } }
```

Fuente: [pey: webhook QR CoDi, pago recibido](https://docs.pey.mx/docs/webhooks/codi/qr) · consultado 2026-11-07

## Evento codi.pn.payment_received

Se dispara cuando se completa un pago de notificación push CoDi. Mismos campos que el evento de QR **sin `codiQrId`**: `type` (`codi.pn.payment_received`), `amount`, `apiKeyId`, `bankAccountId` (solo si lo mandaste al crear la push), `concept`, `datePaid`, `metadata`, `numRef` y `transactionId` (el mismo que regresó `POST /codi/pn`).

Fuente: [pey: webhook notificación push CoDi, pago recibido](https://docs.pey.mx/docs/webhooks/codi/pn) · consultado 2026-11-07

## Evento bank.account.updated

Se manda **solo** cuando una cuenta registrada por API pasa a `ACTIVE` (no por `PENDING`, `PROCESSING` ni `ERROR`).

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | `bank.account.updated` |
| `bankAccountId` | string | ULID; úsalo como `bankAccountId` en cobros |
| `name` | string | Nombre legal del titular |
| `ownerType` | string | `API_KEY` si se registró por API |
| `ownerId` | string | ID de la llave cuando `ownerType` es `API_KEY` |
| `taxId` | string | RFC; opcional |
| `codiStatus` | string | Siempre `ACTIVE` aquí |
| `clabe` | string | 18 dígitos |
| `entity` | string | `BUSINESS` \| `PERSON` |

No trae `alias`, `errorMessage` ni `dateCreated`: pídelos con `GET /bank-account/{id}`. Trae datos personales y bancarios: no los registres completos.

Fuente: [pey: webhook Cuenta bancaria actualizada](https://docs.pey.mx/docs/webhooks/bank-account/updated) · consultado 2026-11-07

## Evento payment_link.status_updated

Se dispara cuando cambia el estado de un link de pago.

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | `payment_link.status_updated` |
| `apiKeyId` | string | Llave dueña |
| `paymentLinkId` | string | ULID del link |
| `status` | string | `paid` \| `pending` \| `processing` (la API además tiene `partial`; ver [06](06-api-ligas-de-pago.md)) |
| `clientReferenceId` | string | La referencia que mandaste al crear |
| `transactions` | array | Objetos de transacción resumidos: `transactionId`, `paymentMethod`, `datePaid`, `amount`, `amountBreakdown`, `applicationFee`, `metadata` |

No trae el monto del link: si lo necesitas, usa `GET /payment-link/{id}`.

Fuente: [pey: webhook Actualización de estado del link de pago](https://docs.pey.mx/docs/webhooks/payment-link/status-update) · consultado 2026-11-07

## Reglas para el handler (Recomendación)

1. Lee el cuerpo crudo, verifica la firma y solo después parsea.
2. Deduplica por `webhook-id` (y por `transactionId` si generas efectos de negocio), en almacenamiento persistente: la memoria de una función serverless no dura.
3. Enruta por `type`; ignora con 2xx los tipos que no conozcas.
4. No confíes solo en el evento para dinero: confirma con la API ([07](07-api-transacciones.md)) y compara monto y moneda.
5. Registra solo identificadores (`webhook-id`, `type`, `transactionId`), nunca CLABE, nombre ni el cuerpo completo.
6. El secreto vive en una variable de entorno del servidor; si se filtra, rótalo desde el engrane.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07
