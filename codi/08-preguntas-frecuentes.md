# 08 · Preguntas frecuentes

> Respuestas con redacción propia, consultadas el 2026-11-07. La primera parte resume las preguntas oficiales de codi.org.mx; la segunda responde las que surgen al construir con pey.

## Preguntas oficiales (resumen)

| Pregunta | Respuesta corta |
|---|---|
| ¿En qué horario funciona? | Las 24 horas, todos los días del año |
| ¿Necesito Internet? | Sí, datos móviles o Wi-Fi |
| ¿Cobra comisión? | No, sin importar el monto |
| ¿Puedo pagar con tarjeta de crédito? | CoDi usa una **cuenta de depósito** (con o sin tarjeta de débito). Se valida con CLABE (18 dígitos), tarjeta de débito (16) o celular asociado |
| ¿Hay devoluciones? | Sí. Quien recibió el pago puede devolverlo completo o en parte |
| Mi app tiene CoDi pero no me deja usarlo | Hay que llamar al banco |
| Pagué y no llegó | Si se procesó, las dos apps lo notifican. Si no, ve a atención a clientes del banco con el folio y la fecha; también hay líneas de Banxico (ver [05](05-seguridad-y-proteccion.md)) |
| No reconozco una operación | Se aclara con la Unidad Especializada del banco (directorio de CONDUSEF) |
| ¿Para qué sirve la app CoDi® Banxico? | Para cobrar desde el celular registrando la cuenta donde llegará el dinero |

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · consultado 2026-11-07

## Preguntas de quien construye

**¿Necesito ser banco o certificarme para cobrar con CoDi en mi app?**
No. Un tercero desarrollador, como pey, genera los mensajes de cobro por ti ([03](03-actores-y-participantes.md), [11](11-como-encaja-pey.md)).

**¿Puedo hacer que mi app *pague* con CoDi?**
No. Solo los participantes del SPEI ofrecen la función de pago. Tu app cobra y quien paga autoriza en la app de su banco.

**¿Cuál es el monto máximo?**
Desde el 23-feb-2026, los bancos deben permitir mensajes de cobro de hasta 6,000 UDIS, o más si el banco quiere. pey publica sus propios límites: push de hasta 1,000,000 y QR sin máximo publicado ([pey/11](../pey/11-errores-y-limites.md)). Además, tu servidor impone su propio tope (`MAX_MONTO_MXN`).

**¿El dinero pasa por pey o por mi app?**
No debe pasar. Banxico prohíbe a terceros las cuentas concentradoras: el dinero va directo a la cuenta del beneficiario ([03](03-actores-y-participantes.md)).

**¿Puedo cobrar un extra por pagar con CoDi?**
La guía de Banxico pide a los terceros desarrolladores no poner recargos por pagar con CoDi ni cobrar por la mensajería. **Recomendación:** no lo hagas.

**¿Hay contracargos?**
No. Cada pago lo autoriza quien paga. Sí puede haber devoluciones que inicia quien cobró.

**¿Cuánto tarda?**
Segundos. La regla de acreditación pide 5 segundos en ciertos casos ([02](02-como-funciona.md)). ⚪ El tiempo real depende del banco.

**¿Cómo sé que me pagaron?**
Por la notificación de CoDi en la app del banco. En tu producto, por pey: `PAID` en la consulta o el webhook firmado ([pey/07](../pey/07-api-transacciones.md), [pey/09](../pey/09-webhooks.md)).

**¿Qué pasa el 14 de diciembre de 2026?**
Vence el plazo para que bancos y participantes homologuen sus apps (Circulares 9/2026 y 10/2026). Desde entonces, las cuentas de nivel 2 a 4 deben poder recibir transferencias con el número celular si el titular lo pide. La CLABE sigue funcionando ([06](06-regulacion-y-plazos.md)).

**¿El "push" de pey es DiMo?**
No. `POST /codi/pn` manda un **mensaje de cobro CoDi** al celular de quien paga. DiMo es para **enviar** dinero a un número celular ([10](10-codi-spei-dimo.md)).

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · consultado 2026-11-07
