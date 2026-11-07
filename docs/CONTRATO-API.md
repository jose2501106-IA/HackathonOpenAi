# Contrato de la API · Tócale

> Acuerdo entre el servidor (`api/`, `lib/`) y las pantallas (`public/`), escrito el 7-nov para repartir el trabajo entre agentes en paralelo (P10). **Si el código y este documento no coinciden, manda el código** y se corrige este archivo. Producto y reglas: [`docs/PRD.md`](PRD.md). API de pey: [`pey/`](../pey/README.md).

## Convenciones

- Todo es JSON (`Content-Type: application/json`), salvo `qrSvg`, que es texto SVG dentro del JSON.
- **Errores:** `{"error": {"codigo": "TEXTO_VACIO", "mensaje": "Texto para mostrar en español de México"}}` con el código HTTP de la tabla de abajo. La interfaz muestra `mensaje` tal cual.
- **Montos:** pesos MXN con hasta 2 decimales (`130`, `1`, `0.5`), igual que pey ([`pey/03`](../pey/03-referencia-api-convenciones.md)).
- **Tiempos:** marca Unix en segundos, igual que pey.
- **Llaves:** solo en el servidor. Ninguna respuesta las incluye ni dice su valor.
- **Polling:** la interfaz consulta el estado cada 3 a 5 segundos y se detiene al vencer el cobro; pey no publica un límite de peticiones (⚪, [`pey/07`](../pey/07-api-transacciones.md)).

## La liga del pedido

Sin base de datos, el pedido viaja **firmado** dentro de una liga corta que se graba en la tarjeta NFC o se muestra como QR:

```
https://<dominio>/p?o=<id7>.<productos>.<tiempo36>.<firma16>
```

| Parte | Qué es |
|---|---|
| `id7` | Número de pedido de 7 dígitos. Es también el `numRef` del cobro en pey (1 a 7 dígitos, [`pey/04`](../pey/04-api-codi-qr-y-push.md)). |
| `productos` | Código de producto + cantidad, pegados (por ejemplo `pa4ho1` = 4 del producto `pa` y 1 del producto `ho`). Los códigos y precios están en `lib/menu.js`. |
| `tiempo36` | Hora de creación en base 36. La liga vale **3 horas**. |
| `firma16` | Primeros 16 caracteres (base64url) de un HMAC-SHA256 de las tres partes anteriores, con `FIRMA_SECRETO` (o una llave derivada de `PEY_API_KEY` si falta). Si alguien cambia un carácter, el servidor la rechaza. |

El servidor **siempre** recalcula productos, precios y total desde el menú: el navegador nunca manda montos.

## Rutas

### `GET /api/salud`
Para saber en qué modo está la app, sin revelar llaves.
```json
{ "ok": true, "modo": "real", "ia": true, "montoMaximo": 1, "negocio": "Taquería El Ejemplo", "pinRequerido": true }
```
- `modo`: `"real"` si hay `PEY_API_KEY`; si no, `"simulacion"` y la interfaz muestra **SIMULACIÓN**.
- `ia`: `true` si hay `OPENAI_API_KEY`; si no, la interpretación de texto es básica (sin IA).
- `pinRequerido`: `true` si está definido `CAJA_PIN`.

### `GET /api/menu`
El menú de ejemplo.
```json
{ "negocio": "Taquería El Ejemplo", "ejemplo": true, "productos": [ { "id": "pa", "nombre": "Taco al pastor", "precio": 25 } ] }
```

### `POST /api/interpretar`
Convierte lo que el cajero dicta o escribe en productos del menú. No crea el pedido: la Caja muestra el resultado para que el cajero lo corrija y confirme.
```json
// Petición
{ "texto": "cuatro de pastor con todo y una horchata" }
// Respuesta 200
{ "items": [ { "id": "pa", "nombre": "Taco al pastor", "precio": 25, "cantidad": 4 } ],
  "noEntendido": ["con todo"], "fuente": "ia" }
```
- `fuente`: `"ia"` (OpenAI, Responses API con `text.format` tipo `json_schema`) o `"basica"` (reglas sin IA, cuando falta la llave).
- La IA solo elige productos del menú y cantidades; los precios vienen del código.
- Errores: `TEXTO_VACIO`, `TEXTO_LARGO`, `IA_ERROR`.

### `POST /api/pedido`
Crea el pedido firmado. Header `x-caja-pin` obligatorio si está definido `CAJA_PIN`.
```json
// Petición
{ "items": [ { "id": "pa", "cantidad": 4 }, { "id": "ho", "cantidad": 1 } ] }
// Respuesta 200
{ "pedido": { "id": "4829135",
              "items": [ { "id": "pa", "nombre": "Taco al pastor", "precio": 25, "cantidad": 4, "subtotal": 100 } ],
              "total": 130, "creado": 1794000000, "vence": 1794010800 },
  "cobro": { "monto": 1, "montoPrueba": true },
  "codigo": "4829135.pa4ho1.<tiempo36>.<firma16>",
  "url": "https://<dominio>/p?o=4829135.pa4ho1.<tiempo36>.<firma16>",
  "qrSvg": "<svg …>" }
```
- `cobro.monto` = el total, pero nunca más que `MONTO_MAXIMO_MXN` (1 peso por defecto). Si el total es mayor, `montoPrueba` es `true` y las pantallas dicen **"Cobro de prueba"** con ambos montos.
- `qrSvg`: QR de `url`, para que el cliente lo escanee con la cámara mientras no haya tarjeta.
- Errores: `PIN_INCORRECTO`, `PEDIDO_VACIO`, `PRODUCTO_INVALIDO`, `CANTIDAD_INVALIDA`.

### `GET /api/pedido?o=<codigo>`
La pantalla del cliente lo usa para mostrar el pedido validado por el servidor. Respuesta: `{ pedido, cobro }` con la misma forma de arriba.
- Errores: `PEDIDO_INVALIDO` (firma o formato mal), `PEDIDO_VENCIDO` (más de 3 horas).

### `POST /api/cobros`
Crea el cobro en pey. Exige `confirmo: true`: la persona tocó el botón después de ver el monto (`AGENTS.md` §3).
```json
// Solicitud de pago al celular (pantalla del cliente)
{ "o": "<codigo>", "metodo": "push", "telefono": "5500000000", "confirmo": true }
// Respuesta 200
{ "metodo": "push", "id": "<transactionId>", "monto": 1, "montoPrueba": true, "vence": 1794000600, "simulacion": false }

// QR CoDi de respaldo (pantalla de la Caja)
{ "o": "<codigo>", "metodo": "qr", "confirmo": true }
// Respuesta 200
{ "metodo": "qr", "id": "<IDC del QR>", "monto": 1, "montoPrueba": true, "vence": 1794000600, "qrSvg": "<svg …>", "simulacion": false }
```
- `push` llama a `POST /codi/pn` con `phoneNumber` (10 dígitos), `amount`, `concept`, `expiration: 600`, `numRef` = número de pedido y `metadata.pedido` ([`pey/04`](../pey/04-api-codi-qr-y-push.md)).
- `qr` llama a `POST /codi/qr` con los mismos datos, sin celular; `qrSvg` se dibuja desde el `qrString` de pey.
- El celular solo se usa para esta llamada: no se guarda ni se escribe en logs.
- Errores: `FALTA_CONFIRMACION`, `TELEFONO_INVALIDO`, `METODO_INVALIDO`, `PEDIDO_INVALIDO`, `PEDIDO_VENCIDO`, `PEY_ERROR`, `PEY_NO_DISPONIBLE`.

### `GET /api/estado?o=<codigo>&metodo=<push|qr>&id=<id>`
Pregunta a pey si ya pagaron. Nunca dice "pagado" sin confirmación de pey.
```json
{ "estado": "pagado", "monto": 1, "pagadoEn": 1794000042, "simulacion": false }
```
| Con… | Consulta en pey | "pagado" si… |
|---|---|---|
| `metodo=push&id=<transactionId>` | `GET /transaction/{id}` | `status: "PAID"` y el mismo monto |
| `metodo=qr&id=<IDC>` | `GET /transaction/codi/qr/{id}` | algún pago `PAID` con el mismo monto |
| solo `o` (la Caja no conoce el `transactionId` del cliente) | `GET /transaction/api-key` (80 por página, de la más reciente) | un pago `PAID` con `metadata.externalMetadata.pedido` = número de pedido y el mismo monto |

- `estado`: `"pendiente"`, `"pagado"` o `"no_verificable"` (pey no responde o no reconoce el id con esta llave; un 404 no prueba que no pagaron, [`pey/07`](../pey/07-api-transacciones.md)).
- "Vencido" no lo dice pey: pey no manda aviso de rechazo ni de vencimiento ([`pey/04`](../pey/04-api-codi-qr-y-push.md)). La interfaz lo muestra cuando pasa `vence` sin pago y ofrece intentar de nuevo. Un pago que llega tarde gana (P5).

### `POST /api/webhook-pey`
Recibe los avisos de pey (`codi.pn.payment_received`, `codi.qr.payment_received`).
- Verifica la firma **Standard Webhooks** con `PEY_WEBHOOK_SECRET` sobre el cuerpo crudo, con los headers `webhook-id`, `webhook-timestamp` y `webhook-signature` ([`pey/09`](../pey/09-webhooks.md)).
- Firma inválida o ausente: `FIRMA_INVALIDA`. Firma válida: 200.
- Sin base de datos solo registra el tipo de evento y el `transactionId`; nunca CLABE, clave de rastreo ni celulares. Queda listo para guardar eventos cuando haya base de datos.

## Códigos de error

| Código | HTTP sugerido | Cuándo |
|---|---|---|
| `TEXTO_VACIO` | 400 | `POST /api/interpretar` sin texto |
| `TEXTO_LARGO` | 400 | Texto más largo de lo permitido |
| `PIN_INCORRECTO` | 401 | Falta `x-caja-pin` o no coincide con `CAJA_PIN` |
| `IA_ERROR` | 502 | OpenAI falló y no hubo respaldo |
| `PEDIDO_VACIO` | 400 | Pedido sin productos |
| `PRODUCTO_INVALIDO` | 400 | Un `id` que no está en el menú |
| `CANTIDAD_INVALIDA` | 400 | Cantidad que no es entero positivo o pasa del límite |
| `PEDIDO_INVALIDO` | 400 | Liga con formato o firma incorrectos |
| `PEDIDO_VENCIDO` | 410 | Liga de más de 3 horas |
| `FALTA_CONFIRMACION` | 400 | `confirmo` no es `true` |
| `TELEFONO_INVALIDO` | 400 | Celular que no son exactamente 10 dígitos |
| `METODO_INVALIDO` | 400 | `metodo` distinto de `push` o `qr` |
| `PEY_ERROR` | 502 | pey rechazó el cobro; `mensaje` dice el `error.type` de pey |
| `PEY_NO_DISPONIBLE` | 503 | pey en mantenimiento o sin respuesta |
| `FIRMA_INVALIDA` | 401 | Webhook con firma que no verifica |

Los códigos HTTP son la sugerencia de este contrato; el valor final está en el código.

## Variables de entorno

| Variable | Obligatoria | Para qué |
|---|---|---|
| `PEY_API_KEY` | Para cobrar de verdad | Sin ella, `modo: "simulacion"` |
| `PEY_WEBHOOK_SECRET` | Para el webhook | Secreto `whsec_…` del portal de pey |
| `OPENAI_API_KEY` | Para la IA | Sin ella, interpretación básica |
| `OPENAI_MODEL` | No | Modelo de OpenAI; por defecto `gpt-6-luna` |
| `MONTO_MAXIMO_MXN` | No | Tope de cada cobro en el servidor; por defecto `1` |
| `CAJA_PIN` | Recomendada al desplegar | Para que nadie más cree pedidos con tu URL pública |
| `FIRMA_SECRETO` | No | Llave para firmar ligas; si falta, se deriva de `PEY_API_KEY` |

Los valores van solo en Vercel, Codespaces o tu `.env` local, nunca en el repo ni en el chat (`AGENTS.md` §4).

## Modo SIMULACIÓN

Sin `PEY_API_KEY` no se llama a pey: los cobros llevan `simulacion: true` y las dos pantallas muestran **SIMULACIÓN** de forma visible. En SIMULACIÓN ningún texto dice que pey confirmó algo (P10).

## Fuentes

| Dato | Fuente | Consultado |
|---|---|---|
| Rutas, campos, estados y webhooks de pey | [`pey/`](../pey/README.md) (OpenAPI 2026-10-20) | 2026-11-07 |
| Modelo `gpt-6-luna`: "Our most efficient model for focused, high-volume tasks" | [OpenAI: Models](https://developers.openai.com/api/docs/models) | 2026-11-07 |
| Salida estructurada con `text.format` en la Responses API | [OpenAI: Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) | 2026-11-07 |
