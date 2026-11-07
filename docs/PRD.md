# PRD · Punto de venta de Tacos El Gran Abanico

> Definido por José el 7-nov-2026 (15:02 y 15:22). API: [`CONTRATO-API.md`](CONTRATO-API.md). Reglas del concurso: [`PROYECTO.md`](PROYECTO.md) y K00.

## Problema y solución
Una taquería con mesas necesita cobrar sin terminal ni efectivo y saber qué vendió y qué ingredientes le quedan. Cada mesa tiene una **etiqueta NFC con una URL fija**. El cliente la toca con su celular, ve su cuenta (productos, descuentos, IVA y total), escribe su número y oprime **Pagar**. El servidor le manda con pey una **solicitud de pago CoDi** a la app de su banco. Cuando pey confirma el pago, se descuentan los ingredientes, se registran los productos vendidos y se muestra **"¡Pago aprobado!"**.

## Alcance (decidido por José)
| # | Decisión |
|---|---|
| 1 | Si el cobro no se paga en su vigencia, mostrar: "No recibimos el pago. Si no te llegó la notificación, tu número puede no estar registrado en CoDi." (pey no documenta un error para eso, [`pey/04`](../pey/04-api-codi-qr-y-push.md) ⚪) |
| 2 | Precios con IVA incluido. Totales: Subtotal, Descuento (antes del IVA), IVA y Total |
| 3 | El inventario se descuenta por **ingredientes** (recetas) y se registran los **productos vendidos** |
| 4 | 5 mesas de ejemplo, cada una con su etiqueta NFC; varias órdenes abiertas a la vez (una por mesa) |
| 5 | OpenAI: análisis de ventas e inventario después del pago; código listo, se activa con `OPENAI_API_KEY` |
| 6 | Base de datos: Supabase |
| 7 | Solo CoDi + reporte sencillo; se puede recordar el celular del cliente |
| 8 | Pruebas con monto mínimo real: **$0.10** (⚪ José escribió "0.1 centavos"; CoDi maneja centavos, así que se tomó como 10 centavos; se cambia con `MONTO_PRUEBA_MXN`) |

Fuera de alcance: efectivo, tarjeta, facturación, devoluciones (pey no las tiene), varias sucursales. El menú, los precios y las existencias son **de ejemplo**.

## Demo en 3 pasos
1. **Caja:** el taquero elige la Mesa 3 y captura 4 tacos al pastor y un refresco.
2. **Mesa:** el cliente toca la etiqueta NFC, ve su cuenta, escribe su celular y oprime "Pagar"; autoriza en la app de su banco.
3. **Aprobado:** la pantalla se pone verde; en la caja la mesa dice "Pagada ✓", el inventario bajó y el reporte del día muestra la venta.

## Criterios de aceptación
- [x] Totales cuadran al centavo con IVA incluido y descuentos antes del IVA (`test/calculo.test.js`).
- [x] El inventario solo se descuenta con pago confirmado por pey, una sola vez, en una transacción (`test/flujo.test.js`, `test/sql.test.js`).
- [x] Errores de pey y cobros vencidos se muestran y no descuentan nada (`test/flujo.test.js`).
- [x] Webhook con firma Standard Webhooks; firma alterada o monto distinto no cierran la venta.
- [ ] 🧑 Supabase con las migraciones, Vercel con variables y webhook registrado en pey.
- [ ] 🧑 Cobro real de $0.10 confirmado por pey en una mesa.
- [ ] 🧑 5 etiquetas NFC grabadas con las URL que muestra la caja.
