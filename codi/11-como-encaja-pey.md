# 11 · Cómo encaja pey

> Redacción propia, consultada el 2026-11-07. La documentación técnica de pey está en [pey/README.md](../pey/README.md); la síntesis con código probado, en [K03](../conocimiento/03-codi-y-api-pey.md).

## pey en el ecosistema CoDi

- pey aparece en la lista de **terceros desarrolladores** de codi.org.mx, con cinco comercios enrolados.
- Un tercero desarrollador hace software de **cobro**, se registra y certifica ante Banxico y no puede usar cuentas concentradoras ([03](03-actores-y-participantes.md)). Eso cuadra con lo que pey dice de sí misma: el dinero llega directo a la cuenta del comercio ([K03.2](../conocimiento/03-codi-y-api-pey.md)).
- **Lo que pey hace por ti:** generar el mensaje de cobro (QR o notificación), hablar con la plataforma CoDi de Banxico y avisarte cuando se pagó. **Lo que no hace:** la función de pago, que es de los bancos.

Fuente: [codi.org.mx: Contacta a tu desarrollador](https://www.codi.org.mx/secundarias/desarrolladores.html) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [pey: documentación en Markdown](../pey/README.md) · consultado 2026-11-07

## Conceptos de CoDi → API de pey

| Concepto CoDi (Banxico) | En la API de pey | Dónde leer |
|---|---|---|
| Mensaje de cobro por QR | `POST /codi/qr` → `id`, `qrString`, `qrImage` | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| QR sin monto (quien paga escribe la cantidad) | `amount: 0` en `POST /codi/qr` | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Mensaje de cobro por notificación al celular | `POST /codi/pn` con `phoneNumber` de 10 dígitos | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Folio CoDi | `codiId` (folio de 20 dígitos) en la respuesta de la push. ⚪ No verifiqué que sea el mismo "Folio CoDi" del Apéndice AD | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Confirmación de pago | `status: PAID` en `/transaction/...` o webhook `codi.qr.payment_received` / `codi.pn.payment_received` | [pey/07](../pey/07-api-transacciones.md) · [pey/09](../pey/09-webhooks.md) |
| Validación de la cuenta del beneficiario | `POST /bank-account` → `codiStatus` `PENDING` → `PROCESSING` → `ACTIVE` | [pey/05](../pey/05-api-cuentas-bancarias.md) |
| Abono directo al beneficiario (sin cuenta concentradora) | `bankAccountId` por comercio | [pey/05](../pey/05-api-cuentas-bancarias.md) |
| Devolución (la inicia quien cobró) | No hay endpoint; se hace desde la app bancaria del titular | [K03.4](../conocimiento/03-codi-y-api-pey.md) |
| NFC | No aparece entre las 11 rutas de la API de pey | [pey/README](../pey/README.md) |
| Límite de 6,000 UDIS por mensaje (regla de bancos) | pey no lo menciona. Pon tu propio tope en el servidor | [02](02-como-funciona.md) |

Fuente: [pey: documentación en Markdown](../pey/README.md) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · consultado 2026-11-07

## Reglas de Banxico que tu producto debe respetar

1. **Sin recargo por pagar con CoDi** y sin cobrar por la mensajería: así lo pide la guía de participación a los terceros desarrolladores.
2. **Sin cuenta concentradora:** cada comercio cobra a su propia CLABE (`bankAccountId`).
3. **Cobrar solo a quien lo autorizó:** no mandes notificaciones de cobro a números que la persona no confirmó. Mandar cobros no pedidos es abuso según los términos de Banxico.
4. **Concepto verdadero:** que el nombre y la descripción coincidan con lo que se cobra.
5. **El pago lo confirma el banco:** muestra "Pagado" solo con `PAID` o con un webhook de firma válida.
6. **Marca:** usa los logos pey + CoDi de [pey/12](../pey/12-recursos-de-marca.md) sin modificarlos.

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Argumentos de pitch con fuente

- CoDi cobra sin comisión, 24/7, con el dinero en segundos y sin contracargos (Banxico; [01](01-que-es-codi.md)).
- Hay más de 21 millones de cuentas validadas (sep-2025), pero solo unos 2.9 millones de cuentas han pagado y unos 1.1 millones han cobrado (oct-2026). El hueco está en la experiencia de quien cobra ([07](07-cifras-de-uso.md)).
- El 20-oct-2026 se hicieron 11,375 operaciones CoDi por $9.89 millones, cifra preliminar del SIE de Banxico ([07](07-cifras-de-uso.md)).
- Antes del 14-dic-2026, los bancos deben homologar en sus apps el pago de mensajes de cobro CoDi ([06](06-regulacion-y-plazos.md)).

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [Banxico SIE: CF884](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF884&locale=es) · [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · consultado 2026-11-07
