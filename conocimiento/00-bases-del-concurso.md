---
id: K00
titulo: "Bases del concurso: qué pide el DevDay Exchange Community Hackathon CDMX y cómo se evalúa"
resumen: "Resumen único y verificado del reto, lo dicho en el arranque, la ley de pagos digitales, el calendario, la entrega, la evaluación, los premios, las reglas y los pendientes; léelo primero para arrancar un proyecto sin leer lo demás."
responde:
  - "¿Qué pide el reto y qué es obligatorio?"
  - "¿Qué dijeron los organizadores en el arranque del 7 de noviembre?"
  - "¿Qué es la Ley de Economía Digital para Pagos Digitales y Electrónicos y qué no se puede afirmar de ella?"
  - "¿Cuándo se entrega, cuándo decide el jurado y cuándo es el voto de la comunidad?"
  - "¿Qué se entrega y dónde?"
  - "¿Qué criterios son oficiales y cuáles son inferidos?"
  - "¿Qué premios hay?"
  - "¿Qué puede descalificar o restar puntos?"
  - "¿Qué falta confirmar con los organizadores?"
actualizado: 2026-11-07
confianza: media
fuentes: [SA01, SA03, SA04, SA05, SA11, SA32, SA43, SA45, SA50, SA53, SA54, SA62, SB02, SD01, SD02, SD64, SF01]
---

# K00 · Bases del concurso

## TL;DR

- **Reto oficial:** prototipar herramientas de bien público con OpenAI y CoDi, cobrando a través de la API gratuita de pey; se participa solo o en equipo [SA01].
- **Arranque (7 de noviembre, en persona):** pidieron una solución creativa que vaya de la mano con la nueva ley de pagos digitales y la aproveche: una aplicación de un servicio, del que sea, que integre la API de pey (funciona con CoDi). También dijeron que se puede usar Claude además de las herramientas de OpenAI [SF01].
- **Ley:** la Ley de Economía Digital para Pagos Digitales y Electrónicos promueve los pagos digitales. El decreto se expidió el 4 de noviembre de 2026 y entra en vigor al día siguiente de su publicación en el DOF (⚪ fecha no verificada). Hoy no obliga a ningún comercio a aceptar QR ni pagos digitales: los sectores los definirá la SHCP [SD64].
- **Calendario:** construcción el sábado 7 (10:00–16:00), entrega en el portal del evento el domingo 8 a las 13:00, jurado el lunes 9 por la mañana y luego voto de la comunidad (de 1 a 3 ganadores más). Premio: bolsa de 10 boletos al DevDay Exchange oficial de OpenAI, el martes 10 a las 14:00 [SA01][SA04].
- **Sin publicar al 7 de noviembre:** criterios, jueces, URL y formato del portal, regla de código previo, elegibilidad y reparto de boletos (⚪) [SA01].
- **Resta o descalifica (inferido; no hay reglas escritas):** salirse del reto, exponer llaves, inventar datos, cobrar sin confirmación, entregar tarde y afirmar obligaciones legales que la ley no impone (K00.9).

## K00.1 · Qué hay de nuevo al 7 de noviembre

| Qué se revisó | Resultado | Fuente |
|---|---|---|
| Página oficial en Luma | Sin cambios de fondo respecto al 6 de noviembre: mismo reto, agenda, entrega, premio y voto. Criterios, elegibilidad y boletos siguen "por confirmar"; no hay jueces nombrados, URL del portal ni avisos con fecha. Confirmados: 265 (264 el día anterior) | [SA01] |
| Sitio y página de eventos de AI Builders México | No mencionan este hackatón ni su portal, jurado o criterios | [SA32][SA62] |
| Página de inicio de pey | No menciona el hackatón | [SB02] |
| Búsquedas web del 7 de noviembre (hackatón, UTOPÍAS, SEDECO, pey) | No encontré publicaciones nuevas desde el 6 de noviembre | — |
| Arranque del evento | Lo único nuevo de hoy viene de lo que se dijo en persona (K00.3) | [SF01] |
| Ley de pagos digitales | Revisé el texto del decreto en el SIDOF; no muestra la fecha de publicación en el DOF (K00.4) | [SD64] |

## K00.2 · Reto oficial y requisitos

- **El reto, resumido:** prototipar herramientas de bien público con OpenAI y CoDi. La página describe CoDi como la red de pagos instantáneos y gratuitos de Banco de México, y dice que se usa a través de la API de pey, a la que llama gratuita y de código abierto [SA01]. ⚪ La página de la API de pey no menciona que sea de código abierto [SA11].
- **Ejemplos oficiales:** cobro para comercios de barrio, comercio comunitario, flujos con QR y solicitudes de pago, y flujos empresariales sobre pagos instantáneos [SA01].

| Requisito | Estado | Fuente |
|---|---|---|
| Usar OpenAI | Obligatorio: está en el reto escrito | [SA01] |
| Cobros CoDi con la API de pey | Obligatorio: está en el reto escrito y se repitió en el arranque | [SA01][SF01] |
| Bien público | Enfoque del reto escrito | [SA01] |
| Solución creativa | Se pidió en el arranque | [SF01] |
| Aprovechar la nueva ley de pagos digitales | Se pidió en el arranque (K00.4) | [SF01] |
| Codex | No se exige por escrito; el evento es de la comunidad Codex y el anfitrión es el Codex Ambassador local | [SA01] |
| Claude | Permitido además de las herramientas de OpenAI, según el arranque (⚪ no está por escrito) | [SF01] |
| Participación | Solo o en equipo; llevar laptop | [SA01] |

- **API de pey:** autoservicio, gratuita por ahora, funciona con cualquier banco y avisa con webhooks firmados (Standard Webhooks); documentación en docs.pey.mx [SA11]. Detalle técnico: K03 y la [documentación de pey](../pey/README.md).
- **Quién organiza:** AI Builders México, con UTOPÍAS, SEDECO y pey; anfitriones Ben Kim (Codex Ambassador local) y Esteban Constante. Es un hackatón comunitario, separado del DevDay Exchange oficial [SA01]. AI Builders describe su misión como que cobrar no cueste un porcentaje de la venta [SA03].

## K00.3 · Lo que dijeron en el arranque (7 de noviembre)

Fuente: notas de José, tomadas en persona [SF01]. No hay versión escrita pública.

1. La solución debe ser **creativa**.
2. Hay que ir **de la mano con la nueva ley de pagos digitales** y aprovecharla (qué dice la ley: K00.4).
3. El objetivo es desarrollar **una aplicación de un servicio, del que sea**, que **integre la API de pey**, que funciona con CoDi.
4. Se puede usar **Claude** además de las herramientas de OpenAI.

Cómo leerlo (inferencia, ⚪):
- "Un servicio, del que sea" amplía los ejemplos oficiales: no tiene que ser una tienda; sirve cualquier servicio que cobre, siempre que el cobro con pey esté en el flujo principal y OpenAI tenga un papel real [SA01][SF01].
- Claude se suma; no sustituye a OpenAI, que sigue en el reto escrito [SA01].
- Si los organizadores publican reglas escritas, esas mandan sobre estas notas.

## K00.4 · La ley de pagos digitales, en lo esencial

- **Qué es:** la Ley de Economía Digital para Pagos Digitales y Electrónicos. Es de orden público, aplica en todo el país y su objeto es promover que se adopten y usen los medios de pago digitales y electrónicos [SD64].
- **Fechas:** las mesas directivas del Congreso firmaron el decreto el 20 de octubre de 2026 y la presidenta lo expidió el 4 de noviembre de 2026 [SD64]. Entra en vigor al día siguiente de su publicación en el DOF. ⚪ La versión del SIDOF consultada el 7 de noviembre no muestra la fecha de publicación y tampoco la encontré en prensa [SD64].
- **Lo que sigue (transitorios):** desde que entre en vigor, la SHCP tiene 15 días hábiles para determinar los sectores estratégicos y las actividades donde el pago digital podrá ser la única forma aceptada. Cuando publique esa determinación, las autoridades tienen otros 15 días hábiles para emitir reglas generales con condiciones y plazos de transición gradual. La ley no trae presupuesto adicional [SD64].
- **Comercios y servicios:** el artículo 11 dice que los proveedores "podrán implementar" medios de pago digitales, así que no hay una obligación general. La obligación de aceptar solo pagos digitales aplicará únicamente en los sectores que designe la SHCP (artículo 13), y la ley no nombra ninguno [SD64].
- **Gobierno:** los tres órdenes de gobierno deben tomar medidas para aceptar pagos digitales en trámites y servicios (artículo 10) [SD64].
- **QR:** el artículo 19, fracción IV, faculta a Banxico, con la CNBV como supervisora, para emitir reglas que obliguen a quien ofrece terminales punto de venta a aceptar pagos con QR conforme a sus especificaciones. Es una facultad, no una regla ya emitida [SD64].
- **Contingencias:** se permite efectivo o cheque durante una contingencia (artículo 15), pero eso no exime para siempre (artículo 16) [SD64].
- **No menciona** CoDi ni DiMo por nombre [SD64].

**Lo que NO se puede afirmar:**
- Que aceptar QR o pagos digitales ya es obligatorio para los comercios, o que lo será en una fecha concreta: depende de la SHCP y de reglas que todavía no existen [SD64].
- Que la ley rige desde una fecha concreta, mientras no se confirme su publicación en el DOF (⚪).
- Que exista una obligación general de QR en la CDMX el 19 de noviembre: esa fecha no aparece en el texto [SD64].

**Otro plazo, que no es esta ley:** el 14 de diciembre de 2026 vence el plazo para que los participantes del SPEI cumplan las Circulares 9/2026 y 10/2026 de Banxico, que homologan las transferencias desde el celular; la 9/2026 incluye procesar los mensajes de cobro de CoDi [SD01][SD02]. Según la prensa, antes de esa fecha los bancos deben permitir recibir transferencias con el número de celular, y la CLABE sigue funcionando [SA43].

**Recomendación:** presenta el proyecto como una ayuda para adoptar pagos digitales de forma voluntaria y prepararse antes de que se definan sectores y reglas. Cita la ley por su nombre, apóyate en este archivo y no prometas cumplimiento legal.

## K00.5 · Calendario

| Cuándo | Qué | Fuente |
|---|---|---|
| Sáb 7 nov, 10:00–16:00 | Arranque y construcción presencial en UTOPÍA Elena Poniatowska Amor (Av. Miguel Hidalgo 128, San Lucas, Coyoacán), con mentores de AI Builders México | [SA01][SF01] |
| Dom 8 nov, 13:00 | Cierre de entregas en el portal del evento; se puede seguir construyendo después del sábado | [SA01] |
| Lun 9 nov, mañana | El jurado anuncia ganadores; después, la comunidad vota por 1 a 3 ganadores más | [SA01] |
| Mar 10 nov, 14:00 | DevDay Exchange oficial de OpenAI en la CDMX (el premio); la sede se comparte al aprobar la solicitud | [SA04] |
| 14 dic | Plazo de las Circulares 9/2026 y 10/2026 de Banxico (K00.4) | [SD01] |

- El encabezado en inglés de la página muestra 9:00–15:00; el encabezado en español y la agenda escrita dicen 10:00–16:00 (detalle: K01) [SA01].
- ⚪ La página no dice la zona horaria del cierre del domingo; se asume la hora del centro de México.
- ⚪ No se ha publicado la mecánica del voto: quién vota, dónde y hasta cuándo.

## K00.6 · Qué entregar y cómo

- **Oficial:** el proyecto se entrega en "el portal del evento" antes del domingo 8 a las 13:00 [SA01]. Al 7 de noviembre no hay URL del portal ni formato publicado (repo, video, demo o formulario) (⚪) [SA01].
- **Paquete recomendado (inferencia a partir de eventos hermanos):**
  1. Demo desplegada con URL pública que funcione en celular y siga en línea para el voto; en Bangkok se pidió mantener los enlaces accesibles para evaluar [SA05].
  2. Repo público con README: problema, usuario, papel de OpenAI, cobro CoDi con pey, qué es real y qué es SIMULACIÓN, limitaciones, herramientas de IA usadas y qué existía antes del sábado.
  3. Video de menos de 3 minutos, como en Build Week de OpenAI [SA45].
  4. Pitch corto con una diapositiva; en San Francisco fueron 2 minutos de pitch y 2 de preguntas [SA50].
- Como el jurado anuncia el lunes, el paquete tiene que convencer aunque no estés presente (inferencia; K08).

**Recomendación:** entrega antes de las 12:00 del domingo y guarda una captura de la confirmación.

## K00.7 · Cómo se evalúa: oficial, dicho e inferido

| Nivel | Qué se sabe | Fuente |
|---|---|---|
| Oficial (por escrito) | Habrá demos de proyectos y evaluación; el jurado anuncia el lunes 9 por la mañana; luego, el voto comunitario elige de 1 a 3 ganadores más; criterios, elegibilidad y boletos "se confirmarán"; no hay jueces nombrados | [SA01] |
| Dicho en el arranque | Creatividad; aprovechar la nueva ley de pagos digitales; aplicación de un servicio que integre la API de pey con CoDi | [SF01] |
| Inferido (no oficial) | Impacto y alineación con el reto 25%; ejecución con cobro CoDi 25%; uso de OpenAI 20%; creatividad y originalidad 20%; pitch 10% | K08 |

La rúbrica de 1 a 5, las preguntas típicas del jurado y la lista de autoevaluación están en K08.

## K00.8 · Premios

- Bolsa de 10 boletos al DevDay Exchange oficial de OpenAI en la CDMX, el martes 10 de noviembre a las 14:00 [SA01][SA04].
- Hay ganadores del jurado (lunes por la mañana) y de 1 a 3 más por voto de la comunidad [SA01].
- No se anuncian efectivo, créditos ni lugares (1.º, 2.º, 3.º); la asignación, la elegibilidad y las condiciones de los boletos se confirmarán más adelante (⚪) [SA01].
- El DevDay Exchange incluye sesiones técnicas con los equipos de producto e ingeniería de OpenAI y conversación abierta con el equipo [SA04].

## K00.9 · Reglas que descalifican o restan

No hay reglas de descalificación publicadas (⚪) [SA01]. Esta tabla junta lo que se deduce del reto, los riesgos verificados y las reglas de este repo (`AGENTS.md`).

| Regla | Por qué | Fuente |
|---|---|---|
| El flujo principal usa OpenAI y cobra con CoDi a través de pey | Es el reto; sin eso el proyecto queda fuera de tema | [SA01][SF01] |
| Cero llaves en el repo, en el navegador y en los logs | GitHub detecta llaves de OpenAI en repos públicos y OpenAI las desactiva, así que la demo se rompe; GitHub bloquea por defecto los push con secretos en repos públicos | [SA54][SA53] |
| Nada inventado: sin testimonios, cifras ni comercios sin fuente; todo lo simulado dice "SIMULACIÓN" | Credibilidad | `AGENTS.md` |
| Ningún cobro sin confirmación explícita de la persona, y con monto máximo | Se cobra dinero real (K03) | `AGENTS.md` |
| Entregar antes del domingo a las 13:00 | Es el cierre publicado | [SA01] |
| Declarar qué existía antes del sábado | ⚪ La regla de código previo no está publicada | [SA01] |
| No afirmar obligaciones ni fechas que la ley no tiene | Cualquier juez puede comprobarlo (K00.4) | [SD64] |
| No presumir alianzas con gobierno, bancos o pey, ni exponer datos personales (CLABE, teléfonos) | Riesgo ético y legal | Inferencia |

## K00.10 · Pendientes ⚪

Nada de esto está publicado; pregúntalo a los organizadores y anota la respuesta en `BITACORA.md`:

1. URL del portal y formato de entrega: repo, video (¿duración?), demo o formulario.
2. Criterios, pesos y nombres de los jueces.
3. ¿Se permite código previo o plantillas? ¿Cómo se declara?
4. Elegibilidad y reparto de los 10 boletos; ¿hay primer lugar?
5. Mecánica del voto comunitario.
6. Confirmación por escrito de que se permite Claude y de si hay que declararlo.
7. ¿Codex es obligatorio o solo recomendado?
8. Fecha de publicación de la ley en el DOF y, después, los sectores que defina la SHCP.
9. API de pey: ¿hay entorno de prueba o solo producción? (K03).
10. Zona horaria del cierre del domingo y hora real de salida del sábado (15:00 o 16:00).

## K00.11 · Dónde está el detalle

- [K01 · Ficha del evento](01-evento-verificado.md): horario, sede, cómo llegar y calendario.
- [K02 · Organizadores y qué buscan](02-organizadores-y-que-buscan.md).
- [K03 · CoDi y API de pey](03-codi-y-api-pey.md).
- [K08 · Criterios, jueces y cómo ganar](08-criterios-y-jueces.md).
- [Documentación de pey en Markdown](../pey/README.md): guías, referencia de la API, webhooks y errores.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA01 | DevDay Exchange Community Hackathon: Mexico City (página oficial en Luma) | https://luma.com/f755f0k6 | 2026-11-07 |
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA04 | OpenAI DevDay Exchange 2026 | https://events.openai.com/devdayexchange2026/ | 2026-11-06 |
| SA05 | DevDay Exchange Community: Bangkok | https://luma.com/6m83xldb | 2026-11-06 |
| SA11 | pey: API CoDi | https://pey.mx/api-codi | 2026-11-06 |
| SA32 | AI Builders México (sitio oficial) | https://aibuilders.mx/ | 2026-11-07 |
| SA43 | ADN40: Nuevas reglas para transferencias bancarias; fecha límite 14 de diciembre | https://www.adn40.mx/mexico/2026-09-12/nuevas-reglas-para-hacer-transferencias-bancarias-en-mexico-la-fecha-limite-es-el-14-de-diciembre/ | 2026-11-06 |
| SA45 | OpenAI Developers Blog: Build Week winners | https://developers.openai.com/blog/build-week-winners | 2026-11-06 |
| SA50 | Codex Community Mini-Hackathon, San Francisco #5 | https://luma.com/7025i1j5 | 2026-11-06 |
| SA53 | GitHub Blog: Keeping secrets out of public repositories (29 feb 2024) | https://github.blog/2024-02-29-keeping-secrets-out-of-public-repositories | 2026-11-06 |
| SA54 | GitHub Changelog: RubyGems, Adobe and OpenAI are now secret scanning integrators (8 jun 2021) | https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators | 2026-11-06 |
| SA62 | AI Builders México: página de eventos | https://aibuilders.mx/eventos | 2026-11-07 |
| SB02 | pey®: página de inicio | https://pey.mx/ | 2026-11-07 |
| SD01 | DOF · Circular 9/2026 de Banxico (modifica la 14/2017; homologación de transferencias móviles) | https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862 | 2026-11-07 |
| SD02 | SIDOF · Circular 10/2026 de Banxico (modifica la 3/2012), DOF 17-jun-2026 | https://sidof.segob.gob.mx/notas/5790863 | 2026-11-06 (previo) |
| SD64 | DOF · Ley de Economía Digital: texto y transitorios | https://sidof.segob.gob.mx/notas/docFuente/5803017 | 2026-11-07 |
| SF01 | Arranque del evento, notas de José (en persona, no público) | (sin URL; no público) | 2026-11-07 |

(previo) = dato verificado por el equipo antes de esta sesión y no reconsultado aquí.
