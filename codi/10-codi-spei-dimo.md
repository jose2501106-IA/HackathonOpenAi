# 10 · CoDi, SPEI y DiMo comparados

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## Tabla comparativa

| | **SPEI®** | **CoDi®** (Cobro Digital) | **DiMo** (Dinero Móvil) |
|---|---|---|---|
| Qué es | El sistema de transferencias interbancarias de Banxico; sobre él corren los otros dos | Plataforma de **cobro**: quien recibe pide el pago | Esquema para **enviar** dinero con el número celular de quien recibe |
| Quién inicia | Quien envía | **Quien cobra** genera el mensaje de cobro; quien paga lo autoriza | **Quien envía** |
| Cómo se identifica el destino | CLABE o tarjeta de débito | QR, NFC o notificación al celular de quien **paga** | 10 dígitos del celular de quien **recibe**, más su banco |
| Dónde se usa | App o banca en línea | App del banco (pagar); app del banco, app CoDi® Banxico o software de terceros como pey (cobrar) | App del banco |
| Desde cuándo | ⚪ no lo revisé | 30-sep-2019 (La Razón) | Disponible desde fines de feb-2023, según la gobernadora de Banxico citada por Expansión |
| Comisión | ⚪ depende del banco | Sin comisión (Banxico) | Sin comisión (Publimetro, 2026) ⚪ no confirmado en Banxico |
| Horario | ⚪ | 24/7 | ⚪ |
| ¿Sirve para un comercio? | Sí, pero hay que dictar la CLABE y conciliar a mano | **Sí: está hecho para cobrar**, con monto, concepto y confirmación | Para recibir envíos, sin mensaje de cobro |

Fuente: [El Financiero: SPEI, CoDi y DiMo, diferencias (13-ago-2023)](https://www.elfinanciero.com.mx/mis-finanzas/2023/08/13/spei-codi-y-dimo-banxico-diferencias-en-herramientas-de-transferencias-elecronicas/) · [Expansión: DiMo de Banxico ya está disponible (28-abr-2023)](https://expansion.mx/finanzas-personales/2023/04/28/dimo-de-banxico-ya-esta-disponible-como-funciona) · [Publimetro: CoDi y DiMo mueven tu dinero (jun-2026)](https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/) · [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## DiMo y las Circulares de 2026

- Las Circulares 9/2026 y 10/2026 **no nombran a DiMo**.
- La 10/2026 obliga a las instituciones de crédito a asociar, a petición del titular, los **10 dígitos de un celular** a las cuentas de nivel 2, 3 y 4 para recibir transferencias, con plazo al **14-dic-2026**. Ese es el mecanismo que la prensa asocia con DiMo. ⚪ La relación formal entre DiMo y esa regla no la vi en un texto de Banxico.
- La Circular 2/2025 ya preveía solicitudes de envío en las que quien envía solo indica los 10 dígitos de un celular (numerales 9a. Bis 4 y 58a de la 14/2017).
- ⚪ No encontré hoy una página oficial de Banxico dedicada a DiMo. Las fuentes de DiMo de este archivo son prensa.

Fuente: [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · consultado 2026-11-07

## Confusiones comunes al construir

- **"Push" de pey ≠ DiMo.** `POST /codi/pn` manda un *mensaje de cobro* CoDi al celular de quien **paga**; esa persona autoriza. En DiMo, el celular es el de quien **recibe** y quien envía no recibe ninguna solicitud ([pey/04](../pey/04-api-codi-qr-y-push.md)).
- **CoDi también es SPEI.** Cuando se acepta un cobro CoDi, la transferencia viaja por SPEI o dentro del mismo banco. Por eso aparece en el estado de cuenta como una transferencia, con su folio.
- **Para un comercio, CoDi da algo que DiMo no:** el monto y el concepto los fija quien cobra, y la confirmación llega por pey (consulta o webhook). Así se concilia sin capturar nada a mano.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · [pey: documentación en Markdown](../pey/README.md) · consultado 2026-11-07
