# 05 · Seguridad y protección del usuario

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## Protecciones del diseño

- **Autorización explícita:** cada pago lo acepta quien paga, con NIP, huella o token en la app de su banco. Por eso no hay contracargos.
- **Confirmación a las dos partes:** pagador y cobrador reciben la confirmación del pago.
- **Bloqueo:** quien recibe mensajes de cobro puede bloquearlos desde su app, y Banxico puede bloquear mensajes abusivos y los certificados con los que se enviaron.
- **El mensaje de cobro no mueve dinero:** solo la aceptación dispara la transferencia.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Qué cuenta como abuso (términos de Banxico)

- El monto que se muestra no coincide con el monto real.
- La persona recibe un cobro que no pidió.
- El nombre del beneficiario no coincide con el del comercio.
- El dinero se deposita en la cuenta de un tercero.

Obligaciones de quien usa la plataforma: cuidar sus certificados y contraseñas, mandar cobros **solo a clientes que lo autorizaron**, describir con verdad lo que vende, hacer las pruebas que pida Banxico, no hacer ingeniería inversa y cumplir sus obligaciones fiscales.

**Recomendación para el producto:** el agente de IA nunca envía cobros por notificación a números que la persona no capturó y confirmó. El concepto debe describir de verdad lo que se cobra.

Fuente: [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Requisitos de seguridad para apps (Circular 2/2025)

El numeral 58a, fracción I, apartado C de la Circular 14/2017 exige procesos documentados a quien procese mensajes de cobro y órdenes CoDi en apps móviles:

- instalación y actualización seguras;
- cifrado;
- autenticación;
- manejo de sesiones;
- control de sistemas modificados;
- integridad de las apps.

Además, el contrato de participación indirecta debe pedir usuario y contraseña para enviar órdenes (9a. Bis 4, fr. XI Bis). Los terceros desarrolladores pasan una certificación de seguridad informática ante Banxico.

Fuente: [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Si algo sale mal: aclaraciones

- **Pagué y no llegó:** si el pago se procesó, las dos apps lo notifican y el estado se puede ver en CoDi. Si no hubo aviso ni se refleja el dinero, hay que ir a la atención a clientes del banco, con el **folio** y la **fecha** de la operación.
- **Contactos institucionales de CoDi:** 800 BANXICO (800 226 9426, opción 3), 800-POR-CODI (800 767 2634) y el correo de CoDi publicado en las preguntas frecuentes.
- **No reconozco una operación:** se aclara con la **Unidad Especializada** del banco, como cualquier transferencia. CONDUSEF publica el directorio de esas unidades.
- **Controversias:** los términos de Banxico dicen que las reclamaciones por transferencias se resuelven con el banco que envía y el que recibe; Banxico no responde por los bienes o servicios.

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Datos personales

- Los datos de la Plataforma CoDi se rigen por el aviso de privacidad de Banxico, que tiene versión integral y simplificada, conforme a la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.
- Según los términos, a la app bancaria del cliente se pueden transferir datos de identificación, de contacto, bancarios y patrimoniales.
- La app CoDi® Banxico tiene una página para eliminar datos. ⚪ No la abrí.

**Recomendación para el producto:** no guardes el número celular ni el nombre de quien paga si no hace falta. En logs, registra solo IDs (`codiQrId`, `transactionId`), como ya pide [K03.5](../conocimiento/03-codi-y-api-pey.md).

Fuente: [Banco de México: Aviso de privacidad de la Plataforma CoDi® (integral)](https://transparencia.banxico.org.mx/documentos/%7B0D1619CD-0515-8BC7-F33C-0A08CAFD686D%7D.pdf) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · [codi.org.mx: Eliminación de datos app CoDi® Banxico](https://www.codi.org.mx/secundarias/datos.html) · consultado 2026-11-07
