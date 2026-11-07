# Contrato de API · Punto de venta de Tacos El Gran Abanico

> Contrato entre las pantallas (`public/`) y el servidor (`api/` + `lib/`). Si cambia, se cambia aquí primero. Producto: [`PRD.md`](PRD.md). pey: [`pey/04`](../pey/04-api-codi-qr-y-push.md), [`pey/07`](../pey/07-api-transacciones.md), [`pey/09`](../pey/09-webhooks.md).

## Convenciones
- JSON en UTF-8. **Todo el dinero va en centavos enteros** (`2500` = $25.00). La pantalla da el formato `$25.00`.
- Errores: estado HTTP 4xx/5xx y cuerpo `{ "error": { "codigo": "TEXTO_EN_MAYUSCULAS", "mensaje": "Texto para mostrar tal cual, en español de México" } }`.
- Rutas de **caja** exigen el encabezado `x-caja-pin` cuando el servidor tiene `CAJA_PIN`. Sin PIN correcto: 401 `PIN_REQUERIDO`. `GET /api/salud` dice si hace falta (`cajaConPin`).
- Fechas en ISO 8601 (UTC). La pantalla las muestra en hora de la CDMX.

## Objeto `Orden`
```json
{
  "id": "uuid",
  "mesaId": 3,
  "estado": "abierta | cobrando | pagada",
  "renglones": [
    { "productoId": "taco_pastor", "nombre": "Taco al pastor", "cantidad": 4,
      "precioUnitario": 2500, "descuentoPct": 10, "importeBruto": 10000, "descuento": 1000, "importe": 9000 }
  ],
  "descuentoOrdenPct": 0,
  "totales": { "subtotal": 8621, "descuento": 862, "iva": 1241, "total": 9000 },
  "cobro": { "montoCobrado": 10, "expiraEn": "2026-11-07T22:10:00.000Z", "telefonoOculto": "******5678", "modoPrueba": true },
  "pagadaEn": null,
  "aviso": { "codigo": "VENCIDO", "mensaje": "No recibimos el pago. Si no te llegó la notificación, tu número puede no estar registrado en CoDi." },
  "actualizadaEn": "ISO"
}
```
- Precios con IVA incluido. `subtotal` y `descuento` van **sin IVA**; `subtotal − descuento + iva = total` al centavo.
- `cobro` es `null` mientras no se ha pedido el pago. En `pagada` conserva el monto cobrado.
- `aviso` es el último problema del cobro (vencido o rechazado por pey); se borra al iniciar otro cobro. Con `aviso`, la orden vuelve a `abierta` y **no** se descontó inventario.
- `modoPrueba: true` = se cobra `montoCobrado` (por defecto $0.10) en lugar del total: hay que decirlo en pantalla.

## Rutas públicas (landing de la mesa, abierta desde la etiqueta NFC)

La etiqueta NFC de cada mesa guarda una URL fija: `https://<dominio>/mesa?m=<id>&t=<token>`.

| Ruta | Entrada | Respuesta 200 | Errores |
|---|---|---|---|
| `GET /api/salud` | — | `{ ok, modo: "simulacion"\|"real", cobroPrueba: bool, montoPrueba: centavos, baseDatos: "memoria"\|"supabase", ia: bool, cajaConPin: bool, avisos: [texto] }` | — |
| `GET /api/mesa?m=&t=` | mesa y token | `{ negocio: { nombre }, mesa: { id, nombre }, orden: Orden \| null, modo, cobroPrueba, montoPrueba }` · Si la orden está `cobrando`, el servidor consulta a pey y la puede pasar a `pagada` o regresar a `abierta` con `aviso`. La orden `pagada` se sigue mostrando 30 min o hasta que la caja abra otra. | 404 `MESA_INVALIDA` |
| `POST /api/pagar` | `{ m, t, telefono: "10 dígitos", recordar: bool }` | `{ orden }` en `cobrando` (se mandó la solicitud de pago al banco) | 400 `TELEFONO_INVALIDO` · 404 `MESA_INVALIDA` · 409 `SIN_ORDEN`, `ORDEN_VACIA`, `ORDEN_EN_COBRO`, `YA_PAGADA` · 502 `PEY_RECHAZO` (mensaje con el motivo de pey) · 503 `PEY_NO_DISPONIBLE` |
| `POST /api/simular-pago` | `{ m, t }` | `{ orden }` en `pagada` · **solo SIMULACIÓN** | 403 `SOLO_SIMULACION` · 409 `SIN_COBRO` |
| `POST /api/webhook-pey` | evento firmado de pey (Standard Webhooks) | `{ ok: true }` | 400 `FIRMA_INVALIDA` |

Reglas del cobro:
1. La pantalla pide confirmación explícita: el botón "Pagar" muestra el monto y la persona lo oprime.
2. El servidor recalcula el total con el menú; nunca usa montos del navegador.
3. `POST /codi/pn` a pey con `amount` (pesos), `phoneNumber`, `concept` ("Tacos El Gran Abanico · Mesa 3"), `expiration: 360`, `numRef` y `metadata.orden`.
4. El pago se confirma **solo** con pey: webhook `codi.pn.payment_received` con firma válida, o `GET /transaction/{transactionId}` con `status: "PAID"`; en ambos casos el monto debe ser igual a `montoCobrado`. Al confirmar, en una sola transacción de base de datos: orden `pagada`, se descuentan ingredientes según las recetas, se registran los productos vendidos y, si `recordar`, se guarda el cliente.
5. Si pey rechaza la solicitud (400/500/503) la orden vuelve a `abierta` con el mensaje de error y no se descuenta nada.
6. Si pasa la vigencia (360 s) sin pago, el servidor consulta a pey una última vez; si no está pagada, la orden vuelve a `abierta` con el `aviso` VENCIDO. pey no documenta qué pasa con un celular sin CoDi ([`pey/04`](../pey/04-api-codi-qr-y-push.md) ⚪), por eso el mensaje lo menciona como posibilidad.
7. Un pago que llega tarde (después del aviso) igual se confirma: el dinero ya entró.

## Rutas de caja (punto de venta)

| Ruta | Entrada | Respuesta 200 |
|---|---|---|
| `GET /api/caja-estado` | — | `{ negocio, salud, catalogo: [{ id, nombre, categoria, precio, descuentoPct, promo }], mesas: [{ id, nombre, urlNfc, orden: Orden \| null }] }` |
| `POST /api/caja-orden` | `{ mesaId, items: [{ productoId, cantidad }], descuentoOrdenPct }` | `{ orden }` · Crea la orden abierta de la mesa o reemplaza sus productos. Con `items` vacío cancela la orden abierta (`orden: null`). Errores: 409 `ORDEN_EN_COBRO`, 400 `PRODUCTO_INVALIDO`, `CANTIDAD_INVALIDA`, `DESCUENTO_INVALIDO` |
| `GET /api/caja-inventario` | — | `{ ingredientes: [{ id, nombre, unidad, existencia, minimo, bajo: bool }] }` |
| `GET /api/caja-reporte?fecha=AAAA-MM-DD` | fecha CDMX (por defecto hoy) | `{ fecha, ordenes, totalVendido, totalCobrado, ticketPromedio, productos: [{ productoId, nombre, cantidad, importe }], porHora: [{ hora: 0-23, ordenes, total }], clientes: { conCelular, recurrentes }, consumo: [{ id, nombre, unidad, cantidad }] }` |
| `POST /api/caja-analisis` | — | `{ disponible: false, mensaje }` sin `OPENAI_API_KEY`, o `{ disponible: true, analisis: { resumen, reabastecer: [{ ingrediente, motivo }], observaciones: [texto] } }` |

## Modos (siempre visibles en pantalla)
- **SIMULACIÓN**: no hay `PEY_API_KEY` (o `MODO_SIMULACION=1`). No se llama a pey; aparece el botón "Simular pago (SIMULACIÓN)". Un celular que empieza con `00` simula un número sin CoDi: nunca se paga y vence a los 20 s.
- **MODO PRUEBA**: hay llave de pey y `COBRO_PRUEBA` no es `0`. Se cobra dinero real, pero solo `MONTO_PRUEBA_MXN` (por defecto $0.10) o el total, lo que sea menor.
- **REAL**: `COBRO_PRUEBA=0`. Se cobra el total, con tope `MONTO_MAXIMO_MXN` (por defecto $2,000).
