# 03 · Actores y participantes

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy. No se copian correos ni teléfonos de personas: consulta las páginas oficiales.

## Mapa de actores

| Actor | Qué hace en CoDi |
|---|---|
| **Banco de México (Banxico)** | Dueño de la plataforma y de la marca CoDi®. Opera el SPEI, emite las reglas (Circular 14/2017 y sus cambios) y registra y certifica a los terceros desarrolladores |
| **SPEI®** | Infraestructura por la que viajan las transferencias que dispara un mensaje de cobro aceptado |
| **Participantes del SPEI** (bancos y otras entidades) | Procesan mensajes de cobro y órdenes CoDi en sus apps. **Solo ellos pueden ofrecer al público la función de pagar** |
| **Participantes indirectos** | Entidades que llegan al SPEI por medio de un participante; su contrato debe incluir la recepción y el envío de operaciones CoDi |
| **Comercio** | Cobra con CoDi. Si no desarrolla software, solo sigue las instrucciones de cobro de Banxico |
| **Comercio desarrollador** | Integra CoDi en sus propios sistemas o puntos de venta; obtiene la documentación técnica y certifica su desarrollo |
| **Tercero desarrollador** (como pey) | Hace software con **función de cobro** para otros. Se registra y certifica ante Banxico, y puede comercializarlo |
| **Persona que paga** | Autoriza cada mensaje de cobro en la app de su banco |
| **App CoDi® Banxico** | App de Banxico para cobrar desde uno o varios celulares con una misma cuenta |

Fuente: [Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (2-may-2023)](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · consultado 2026-11-07

## Participantes obligados (34, actualizado al 10-jul-2026)

Según la página de avances de Banxico: UALÁ, ACTINVER, AFIRME, ALBO, KAPITAL, AZTECA, BABIEN, BAJIO, BANCOPPEL, BANJERCITO, BANORTE, BANREGIO, BANSI, BBASE, BANAMEX, BBVA MÉXICO, BMONEX, COMPARTAMOS, CONSUBANCO, DONDE, HSBC, INBURSA, INMOBILIARIO, INTERCAM, INVEX, MIFEL, MULTIVA BANCO, PAGATODO, SABADELL, SANTANDER, SCOTIABANK, SPIN BY OXXO, VE POR MÁS y STP.

- **Voluntarios y no participantes del SPEI:** Banxico los lista en tablas de imagen y PDF. ⚪ No las leí. La página llama "no participantes" a las empresas que quieren generar mensajes de cobro sin ser participantes del SPEI.
- **Funciones por banco** (pagar, cobrar, QR, notificación): ⚪ también vienen en imágenes que no leí.
- **Restricción temporal:** codi.org.mx dice que ASP INTEGRA OPC, INTERCAM, KAPITAL y MULTIVA no pueden procesar por ahora mensajes de cobro ni de pago CoDi. ⚪ La página no tiene fecha. Que un banco esté obligado no garantiza que hoy funcione: prueba con el banco real antes de la demo.

Fuente: [Banco de México: avances de las instituciones en la implantación de CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html) · [codi.org.mx: Instituciones financieras](https://www.codi.org.mx/secundarias/instituciones.html) · consultado 2026-11-07

## Qué puede y qué no puede hacer un tercero desarrollador

- **Puede:** dar a comercios la función de **cobro** (QR, NFC o vía Internet) y ofrecer servicios adicionales que el usuario contrate si quiere.
- **No puede:**
  - ofrecer la función de **pago** (solo los participantes del SPEI);
  - usar **cuentas concentradoras** ni intermediarios: el dinero va directo a la cuenta del beneficiario final, en un participante del SPEI inscrito en CoDi;
  - cobrar a sus clientes por la mensajería CoDi;
  - fijar tarifas según el número o el monto de mensajes;
  - poner un **recargo** al precio cuando alguien paga con CoDi.
- **Si comercializa su software:** debe describir cómo identifica a clientes que operen con activos virtuales.

**Recomendación para el producto:** no cobres un extra por pagar con CoDi y no juntes el dinero de varios comercios en una cuenta. Con pey, cada comercio cobra a su propia CLABE (`bankAccountId`, ver [pey/05](../pey/05-api-cuentas-bancarias.md)).

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Cómo se vuelve tercero desarrollador (resumen del proceso)

1. **Carta de intención** con el formato de Banxico, la documentación del Anexo 1 (acta constitutiva, RFC, opinión de cumplimiento del SAT, reporte del Buró de Crédito, poder del representante, entre otros) y el caso de negocio del Anexo 2. Si Banxico hace comentarios, hay hasta 4 meses para atenderlos.
2. **Convenio de confidencialidad.**
3. **Documentación técnica**, carta de instrucciones y requisitos de seguridad informática.
4. **Convenio de licencia de uso de marca** con Banxico.
5. **Desarrollo** con acceso a un *sandbox* y a una mesa de ayuda.
6. **Pre-check:** el producto opera y no tiene anomalías graves.
7. **Certificación** para producción. La certificación de seguridad informática se puede pedir en paralelo.

El registro de terceros desarrolladores se rige también por el Capítulo III Bis de la Circular 13/2017. ⚪ No la leí.

**Para el hackatón:** no te certificas tú; cobras por medio de pey. pey dice que Banxico aprobó su integración con CoDi ([K03.2](../conocimiento/03-codi-y-api-pey.md)) y aparece en la lista de terceros desarrolladores de codi.org.mx ([11](11-como-encaja-pey.md)). ⚪ No vi un registro de Banxico que diga "certificada".

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [codi.org.mx: Contacta a tu desarrollador](https://www.codi.org.mx/secundarias/desarrolladores.html) · consultado 2026-11-07

## Terceros desarrolladores listados en codi.org.mx

- La página lista **25 empresas**; entre ellas aparecen **pey**, Aspel, National Soft (Soft Restaurant) y ANTAD.
- El sitio no dice que estén "certificadas": las presenta como terceros desarrolladores, con los comercios que tienen enrolados.
- Para un comercio, el camino es: contactar al desarrollador, registrarse ante Banxico, verificar la función con el desarrollador y empezar a cobrar.

Fuente: [codi.org.mx: Contacta a tu desarrollador](https://www.codi.org.mx/secundarias/desarrolladores.html) · consultado 2026-11-07
