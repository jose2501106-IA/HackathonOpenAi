# CoDi® (Cobro Digital de Banco de México) en Markdown

Versión de trabajo, en español de México y con redacción propia, de la documentación pública de CoDi y de su regulación, **consultada el 2026-11-07**. Es la base RAG para agentes que construyan sobre la API de pey. **No es documentación oficial ni asesoría legal:** ante cualquier duda, manda la fuente enlazada al final de cada sección.

- **Marcas:** ⚪ = no confirmado en una fuente leída hoy. "Recomendación" = decisión de ingeniería, no lo dice Banxico. Los ejemplos usan datos ficticios.
- **Datos personales:** no se copian correos ni teléfonos de personas; solo contactos institucionales de Banxico.
- **Relación con el resto del repo:** la API de pey está en [pey/README.md](../pey/README.md); la síntesis con código probado, en [K03](../conocimiento/03-codi-y-api-pey.md); la ley de pagos digitales y el plazo del 14-dic, en [K00.4](../conocimiento/00-bases-del-concurso.md).

## Resumen para quien construye (10 líneas)

1. CoDi es una plataforma de Banxico para **cobrar**: quien cobra manda un mensaje de cobro y quien paga lo autoriza en la app de su banco. El dinero viaja por SPEI.
2. Canales: **QR** con o sin monto, **notificación al celular** de quien paga y NFC. pey ofrece QR (`/codi/qr`) y notificación (`/codi/pn`).
3. Funciona 24/7, **sin comisión** para nadie y **sin contracargos**. Quien cobró puede devolver el pago completo o en parte.
4. **Monto:** desde el 23-feb-2026, los bancos deben aceptar mensajes de cobro de hasta **6,000 UDIS** (Circular 2/2025). Tu servidor pone su propio tope.
5. **Tu app no puede pagar**, solo cobrar. Pagar es función exclusiva de los participantes del SPEI.
6. **Sin cuentas concentradoras ni recargos** por pagar con CoDi: el dinero va directo a la CLABE de cada comercio (`bankAccountId`).
7. **Pagado** solo cuando pey dice `PAID` o llega un webhook con firma válida. El formato del QR no es público: usa el `qrString` de pey.
8. **14-dic-2026:** vence el plazo para que bancos y participantes homologuen sus apps, incluido el pago de mensajes de cobro CoDi (Circular 9/2026). Las cuentas de nivel 2 a 4 deben poder recibir transferencias con el número celular (Circular 10/2026).
9. **Uso real:** más de 21 millones de cuentas validadas (sep-2025), pero ~2.9 millones han pagado y ~1.1 millones han cobrado; 11,375 operaciones el 20-oct-2026 (preliminar).
10. Push de pey ≠ DiMo: DiMo es para **enviar** dinero al celular de quien recibe; CoDi es para **cobrar**.

Fuente: síntesis de los archivos 01 a 11 de esta carpeta, cada uno con sus fuentes · [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## Archivos

| Archivo | Tema | Enlace oficial principal |
|---|---|---|
| [01-que-es-codi.md](01-que-es-codi.md) | Qué es, beneficios, requisitos, qué no es | [Banxico: CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) |
| [02-como-funciona.md](02-como-funciona.md) | Flujo, canales (QR, notificación, NFC), montos en UDIS, horarios, acreditación, Folio CoDi, devoluciones | [Banxico: CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: cobrar](https://www.codi.org.mx/secundarias/cobrar.html) |
| [03-actores-y-participantes.md](03-actores-y-participantes.md) | Banxico, SPEI, 34 participantes obligados, terceros desarrolladores, reglas y certificación | [Banxico: avances](https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html) · [Guía de participación](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) |
| [04-como-paga-y-cobra-una-persona.md](04-como-paga-y-cobra-una-persona.md) | Paso a paso en la app: pagar por QR o notificación, cobrar, app CoDi® Banxico | [codi.org.mx: pagar](https://www.codi.org.mx/secundarias/pagar.html) |
| [05-seguridad-y-proteccion.md](05-seguridad-y-proteccion.md) | Autorización, abuso, requisitos de apps, aclaraciones, privacidad | [Términos de la Plataforma](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) |
| [06-regulacion-y-plazos.md](06-regulacion-y-plazos.md) | Circulares 14/2017, 2/2025, 9/2026 y 10/2026; Guías de homologación; línea de tiempo | [SIDOF: 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [SIDOF: 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) |
| [07-cifras-de-uso.md](07-cifras-de-uso.md) | Cuentas validadas, operaciones y montos con fecha; contradicción de "cifras estimadas" | [codi.org.mx: estadísticas](https://www.codi.org.mx/secundarias/estadisticas.html) |
| [08-preguntas-frecuentes.md](08-preguntas-frecuentes.md) | Preguntas oficiales y preguntas de quien construye | [codi.org.mx: preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) |
| [09-marca-logotipos-y-material.md](09-marca-logotipos-y-material.md) | Licencia de la marca, logos, PDF y video oficiales | [Términos de la Plataforma](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) |
| [10-codi-spei-dimo.md](10-codi-spei-dimo.md) | Comparación CoDi, SPEI y DiMo; confusiones comunes | [Banxico: CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) |
| [11-como-encaja-pey.md](11-como-encaja-pey.md) | pey como tercero desarrollador, mapa CoDi → API de pey, reglas para el producto, argumentos de pitch | [codi.org.mx: desarrolladores](https://www.codi.org.mx/secundarias/desarrolladores.html) · [pey/README](../pey/README.md) |

Fuente: [codi.org.mx](https://www.codi.org.mx/index.html) · [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## Fuentes consultadas el 2026-11-07

| Fuente | Tipo | URL |
|---|---|---|
| Banco de México: CoDi® Cobro Digital | Oficial | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html |
| Banco de México: avances de las instituciones en CoDi® (act. 10-jul-2026) | Oficial | https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html |
| Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (2-may-2023) | Oficial | https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf |
| Banco de México: Términos y condiciones de la Plataforma CoDi® | Oficial | https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf |
| Banco de México: modificaciones a la Circular 14/2017 (texto anterior y reformado) | Oficial | https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf |
| Banxico SIE: cuadros CF881, CF882, CF884 y CF885 | Oficial | https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es (cambia `idCuadro`) |
| SIDOF: Circular 9/2026 (texto) | Oficial | https://sidof.segob.gob.mx/notas/docFuente/5790862 |
| DOF: Circular 9/2026 (ya registrada como SD01) | Oficial | https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862 |
| SIDOF: Circular 10/2026 (ficha y texto; ficha registrada como SD02) | Oficial | https://sidof.segob.gob.mx/notas/5790863 · https://sidof.segob.gob.mx/notas/docFuente/5790863 |
| codi.org.mx: qué es, cobrar, pagar, preguntas frecuentes, estadísticas, instituciones, desarrolladores | Oficial (sitio de Banxico) | https://www.codi.org.mx/index.html |
| RegAlert: texto de la Circular 2/2025 | Transcripción de terceros | https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text |
| DPL News: Banxico publica guías (18-jun-2026) | Prensa | https://dplnews.com/banxico-publica-guias-para-homologar-experiencia-de-usuario-en-transferencias-electronicas/ |
| La Razón: falta de promoción de CoDi (30-sep-2025) | Prensa | https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/ |
| El Financiero: SPEI, CoDi y DiMo (13-ago-2023) | Prensa | https://www.elfinanciero.com.mx/mis-finanzas/2023/08/13/spei-codi-y-dimo-banxico-diferencias-en-herramientas-de-transferencias-elecronicas/ |
| Expansión: DiMo ya está disponible (28-abr-2023) | Prensa | https://expansion.mx/finanzas-personales/2023/04/28/dimo-de-banxico-ya-esta-disponible-como-funciona |
| Publimetro: CoDi y DiMo (jun-2026; ya registrada como SB35) | Prensa | https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/ |

Fuente: las URL de esta tabla · consultado 2026-11-07

## Huecos y contradicciones principales

- **⚪ Guías de homologación:** no encontré su URL en banxico.org.mx ni leí su contenido. Solo las conozco por las circulares y por DPL News.
- **⚪ Plazo de acreditación (numeral 19a):** mis dos lecturas muestran 1,500 y 6,000 UDIS para supuestos parecidos. Falta leer la Circular 14/2017 compilada.
- **"Cifras estimadas" de Banxico vs. La Razón:** la tabla de la página de CoDi parece de metas, no de uso real ([07](07-cifras-de-uso.md)).
- **"Entrada en vigor" del 14-dic-2026:** DPL News lo llama así; las circulares dicen que es el plazo para cumplir ([06](06-regulacion-y-plazos.md)).
- **⚪ No leídos:** funciones por banco (tablas en imagen), tablas de voluntarios y no participantes, Circular 13/2017, página oficial de DiMo, descarga oficial de logos y los PDF de difusión.
- **Acceso:** banxico.org.mx, dof.gob.mx y sidof.segob.gob.mx no respondieron a `curl` desde este entorno (proxy 403); todo se leyó con un lector web.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx](https://www.codi.org.mx/index.html) · consultado 2026-11-07
