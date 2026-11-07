# 02 · Cómo funciona CoDi

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## El flujo en tres pasos

1. **Quien cobra genera un mensaje de cobro** desde su app o sistema.
2. **Quien paga lo recibe y lo acepta.** Esa aceptación dispara una transferencia electrónica, interbancaria (SPEI) o dentro del mismo banco.
3. **CoDi notifica a los dos** que el pago se hizo.

```text
Comercio (app/sistema)            Banxico (CoDi + SPEI)             Persona (app de su banco)
   | 1. mensaje de cobro -------------->|----------------------------->| (QR, NFC o notificación)
   |                                    |<----- 2. autoriza (NIP/huella/token)
   |                                    |  transferencia SPEI o mismo banco
   |<------- 3. confirmación ---------- | ------- 3. confirmación ---->|
```

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## Canales para entregar el mensaje de cobro

| Canal | Cómo llega a quien paga | Notas |
|---|---|---|
| **QR con monto** | Quien paga lo escanea o lo importa de su galería | Se genera por venta |
| **QR sin monto** | Igual; quien paga escribe la cantidad | Se puede imprimir o compartir como imagen y usar muchas veces |
| **Notificación al celular** | Quien cobra captura el número celular de quien paga; a esa persona le llega una notificación que abre la app de su banco | Quien paga debe dar su número antes |
| **NFC** | Se acercan dos celulares | Banxico lo menciona; ⚪ no encontré qué apps lo ofrecen hoy |

La guía de Banxico para desarrolladores llama al tercer canal "vía Internet": solicitudes que llegan directo al dispositivo, parecidas a la mensajería instantánea.

Fuente: [codi.org.mx: CoDi® para cobrar](https://www.codi.org.mx/secundarias/cobrar.html) · [Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (2-may-2023)](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Montos

- **Límite regulatorio actual:** desde el **23 de febrero de 2026**, los Participantes del SPEI deben permitir mensajes de cobro de **hasta 6,000 UDIS por mensaje**, o más si el banco lo decide. También deben permitir mensajes **sin monto**. Lo fijó la Circular 2/2025, que modificó el numeral 9a. Bis de la Circular 14/2017 (transitorio tercero).
- **Límite anterior:** el documento de Banxico con el texto antes y después de cada cambio muestra **1,500 UDIS** como límite previo. La transcripción de RegAlert no muestra el texto anterior. ⚪ La UDI cambia a diario: convierte a pesos con el valor del día publicado por Banxico, no con un número fijo.
- [K03.1](../conocimiento/03-codi-y-api-pey.md) cita una nota de 2019 con un mínimo de $8,000 MXN. Este dato regulatorio de 2026 la actualiza.

Fuente: [Banco de México: modificaciones a la Circular 14/2017 (texto anterior y reformado)](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · consultado 2026-11-07

## Horarios y tiempos

- **Horario:** 24 horas, todos los días del año. La Circular 2/2025 obliga a que las apps puedan recibir mensajes de cobro las 24 horas.
- **Día operativo SPEI:** para estadísticas, Banxico cuenta el día de las 18:00 h de un día a las 18:00 h del siguiente. Tenlo en cuenta si cuadras ventas contra cifras de Banxico.
- **Acreditación (numeral 19a, fr. I):** la Circular 2/2025 fija **5 segundos**, desde que Banxico pone el aviso de liquidación a disposición, para que una institución de crédito acredite transferencias de hasta 1,500 UDIS. Hay excepciones desde 6,000 UDIS. El documento de Banxico menciona además **30 segundos** como plazo general. ⚪ Mis dos lecturas muestran montos distintos para el mismo supuesto: verifícalo en la Circular 14/2017 compilada.
- **Tiempos reales por banco:** Banxico publica tiempos promedio de procesamiento en su página de avances y un PDF histórico de tiempos de entrega de avisos de abono. ⚪ Vienen en imágenes y PDF que no leí.

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · [Banxico SIE: cuadro CF882](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF882&locale=es) · [Banco de México: avances de CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html) · consultado 2026-11-07

## Confirmación, folio, posponer y devolución

- **Confirmación:** si el pago se procesa bien, las dos apps lo notifican y el estado se puede consultar en CoDi.
- **Folio CoDi:** la Circular 2/2025 cambió el nombre "Folio de Operación" por **"Folio CoDi"**, definido en el Apéndice AD del Manual del SPEI. Para cualquier aclaración, guarda el folio y la fecha. En la transferencia SPEI, el campo "Folio del Esquema Cobro Digital" se llena según la sección 8 del Manual.
- **Posponer:** la app puede guardar un mensaje de cobro para que quien paga lo acepte o lo rechace después, si el Apéndice AD lo permite.
- **Devolución:** quien recibió el pago puede devolverlo completo o en parte.
- **Formato técnico (QR, campos, vigencia):** no es público. Banxico entrega la documentación técnica después de firmar un convenio de confidencialidad. **Recomendación:** no armes tu propio QR CoDi; usa el `qrString` o la `qrImage` que devuelve pey ([pey/04](../pey/04-api-codi-qr-y-push.md)).

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Servicios web de la plataforma

Según los términos y condiciones de Banxico, la Plataforma CoDi ofrece servicios web para: registrar comercios, recibir mensajes de cobro, consultar el estado de un mensaje, pedir la validación de una cuenta y consultar el estado de esa validación. Se entra por un portal de registro de comercios y desde dispositivos móviles autorizados. Un proveedor como pey usa estos servicios por ti. ⚪ Banxico no publica sus especificaciones.

Fuente: [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07
