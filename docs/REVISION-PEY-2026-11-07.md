# Revisión de pey y plan de integración

Fecha: 2026-11-07. Alcance: documentación y decisiones para construir; no acredita una integración desplegada ni pagos probados.

## Hallazgos verificados

- La [página comercial](https://pey.mx/api-codi) anuncia API gratuita por ahora, autoservicio y webhooks firmados. No extrapolar la gratuidad a tarjetas o a condiciones comerciales futuras.
- Contradicción: la página comercial menciona test/live; la [guía técnica](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/) indica pruebas reales y sandbox próximo. Usar producción con montos mínimos y confirmación humana; consultar a pey antes de asumir un sandbox.
- La misma guía estima cinco días hábiles para registrar cuenta propia. Su cuenta de prueba recibe dinero real que no se devuelve. No presentarla como cuenta del comercio.
- [OpenAPI](https://docs.pey.mx/openapi.json), versión observada 2026-10-20: POST /codi/qr crea el QR; amount está en MXN. La API admite cero, pero nuestro checkout requiere importe positivo. expiration: cero o mínimo 360 segundos. numRef: entre uno y siete dígitos. generateImage permite PNG base64; qrImage puede ser null y qrString permite generarlo. bankAccountId selecciona una cuenta ACTIVE; si falta, se usa la vinculada a la llave.
- [Webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/): uno por llave, con secreto de firma. Verificar con Standard Webhooks antes de procesar.
- [Pago recibido](https://docs.pey.mx/docs/webhooks/codi/qr/): codiQrId relaciona el QR y transactionId identifica la operación; datePaid usa segundos Unix. bankAccountId solo aparece cuando se proporcionó al generar el QR.

## Decisiones del MVP (propuestas de ingeniería)

1. Crear un pedido en servidor con importe en centavos, moneda, destinatario y referencia interna. Convertir a pesos únicamente al llamar a pey.
2. IA interpreta venta; persona confirma; servidor valida y crea el QR. La IA nunca declara un pago confirmado.
3. Guardar la asociación pedido–QR. Consultar pagos por QR desde el servidor o recibir webhook verificado. Comparar importe, moneda y vinculación antes de confirmar.
4. Deduplicar webhook-id y transactionId de forma persistente si hay efectos de negocio. No confiar en memoria de una función efímera.
5. Distinguir pendiente, confirmado, vencido local y no_verificable. Un 404 o fallo de red no demuestra que el cliente no pagó. Revisar pagos tardíos antes de cerrar una venta.
6. No reintentar automáticamente creación tras un timeout sin reconciliar: la solicitud pudo haber creado el QR. ⚪ Garantías de idempotencia de pey pendientes.
7. Recibos e imágenes aportan información; nunca son evidencia bancaria suficiente ni permiten acusar fraude.

## Criterios de aceptación pendientes

- [ ] Cuenta, llave y destinatario confirmados; secretos solo en servidor.
- [ ] QR generado, visible y utilizable desde un teléfono.
- [ ] Pago real mínimo autorizado por José y evidencia sin datos personales.
- [ ] Importe distinto, firma inválida y evento repetido no cierran incorrectamente una venta.
- [ ] Error de proveedor muestra no_verificable; QR vencido permite reconciliación.
- [ ] Demo etiquetada SIMULACIÓN cuando corresponda.

## Marco normativo y preguntas al mentor

El detalle legal actualizado está en [K00.4](../conocimiento/00-bases-del-concurso.md). No basar el pitch en una fecha obligatoria de QR aún no demostrada. Doce días desde hoy sería 19-nov-2026; falta la fuente de ese anuncio específico.

Preguntar a pey: sandbox del evento; disponibilidad de cuenta; límites de consultas; reintentos y orden de webhooks; idempotencia de creación; alcance de consulta de pagos; plazo y requisitos para incorporar comercios reales.

Prioridad de construcción: checkout QR completo y estado confiable; después interpretación con OpenAI; finalmente lectura de recibos. Registro multi-comercio y links con tarjeta quedan fuera del primer demo.
