# Base de conocimiento completa — HackathonOpenAi

> Archivo generado por `scripts/construir_todo_en_uno.py` el 2026-11-07. No lo edites a mano: edita los archivos de `conocimiento/` y vuelve a correr el script.
> Úsalo cuando un asistente (por ejemplo ChatGPT) necesite leer todo de una vez. Cada sección conserva su ID (K03.4, etc.) para citarla.

## Contenido
- `conocimiento/INDICE.md` — Índice de la base de conocimiento
- `conocimiento/00-resumen-ejecutivo.md` — Resumen ejecutivo: cómo ganar el DevDay Exchange Community Hackathon CDMX
- `conocimiento/01-evento-verificado.md` — Ficha verificada del evento: DevDay Exchange Community Hackathon CDMX (7 nov 2026)
- `conocimiento/02-organizadores-y-que-buscan.md` — Organizadores y qué buscan: OpenAI/Codex, AI Builders México, pey, SpaceXAI y Gobierno CDMX
- `conocimiento/03-codi-y-api-pey.md` — CoDi y API de Pey
- `conocimiento/04-openai-api-nov-2026.md` — API de OpenAI vigente (6 nov 2026): DevDay 2026, modelos, Responses, Realtime, Agents, plugins y costos
- `conocimiento/05-codex-chatgpt-y-codespaces.md` — Trabajar 100% en la nube: Codex (web y CLI), ChatGPT + GitHub, Codespaces y Vercel
- `conocimiento/06-contexto-pagos-y-comercios-mx.md` — Contexto: pagos, comercios y personas en México
- `conocimiento/07-ideas-puntuadas.md` — Ideas puntuadas y top 3 con PRD
- `conocimiento/08-criterios-y-jueces.md` — Criterios, jueces y cómo ganar: rúbrica, preguntas, errores y ganadores previos
- `conocimiento/09-pitch-y-preguntas.md` — Pitch, demo y preguntas difíciles
- `conocimiento/10-perfil-y-mitigaciones.md` — Perfil de José: fortalezas, riesgos y cómo cubrirlos
- `AGENTS.md` — AGENTS.md

<!-- ===== INICIO: conocimiento/INDICE.md ===== -->

# Índice de la base de conocimiento

> Generado por `scripts/construir_indice.py` el 2026-11-07. No lo edites a mano.

## Cómo usar este índice (agentes y personas)
1. Busca tu pregunta en **Preguntas → archivo** o el tema en **Archivos**.
2. Abre solo el archivo o la sección que necesitas. Cada sección tiene un ID (`K03.4`) para citarla.
3. ⚪ = dato no verificado: confírmalo antes de usarlo en código o en el pitch.
4. ¿Necesitas todo de una vez (por ejemplo, en ChatGPT)? Abre [`TODO-EN-UNO.md`](TODO-EN-UNO.md).
5. De dónde sale cada dato: [`../fuentes/REGISTRO.md`](../fuentes/REGISTRO.md).

## Archivos
| ID | Archivo | Qué cubre | Confianza | Marcas ⚪ |
|---|---|---|---|---|
| **K00** | [Resumen ejecutivo: cómo ganar el DevDay Exchange Community Hackathon CDMX](00-resumen-ejecutivo.md) | Lo indispensable en una página: evento, reto, qué buscan los jueces, idea recomendada, datos para el pitch, plan del sábado, pendientes de esta noche y riesgos. | media | 1 |
| **K01** | [Ficha verificada del evento: DevDay Exchange Community Hackathon CDMX (7 nov 2026)](01-evento-verificado.md) | Fecha, horario, sede, agenda, reto, premios, cómo llegar, qué llevar y pendientes del hackatón; léelo la noche anterior y al llegar. | alta | 19 |
| **K02** | [Organizadores y qué buscan: OpenAI/Codex, AI Builders México, pey, SpaceXAI y Gobierno CDMX](02-organizadores-y-que-buscan.md) | Quién es cada organizador o aliado, qué quiere ver en los proyectos y qué los aleja; léelo para elegir la idea y armar el pitch. | media | 9 |
| **K03** | [CoDi y API de Pey](03-codi-y-api-pey.md) | Qué es CoDi y cómo se usa la API CoDi de Pey (alta, llaves, endpoints, estados, webhooks, pagos reales de prueba, errores), con ejemplos probados en Node/Vercel y reglas para usarla desde un agente. Léelo completo antes de escribir código de cobro. | media | 20 |
| **K04** | [API de OpenAI vigente (6 nov 2026): DevDay 2026, modelos, Responses, Realtime, Agents, plugins y costos](04-openai-api-nov-2026.md) | Qué anunció el DevDay 2026, qué modelos y precios usar hoy y ejemplos mínimos (Node.js y Python) de salida estructurada, function calling y voz Realtime; léelo antes de escribir cualquier código contra la API de OpenAI. | media | 18 |
| **K05** | [Trabajar 100% en la nube: Codex (web y CLI), ChatGPT + GitHub, Codespaces y Vercel](05-codex-chatgpt-y-codespaces.md) | Cómo se usa hoy Codex en la nube (entorno, secretos, internet, AGENTS.md, tareas en paralelo, PRs y límites de Plus), Codex CLI en Codespaces, ChatGPT leyendo el repo, previews de Vercel y el flujo recomendado para el sábado; léelo antes de lanzar la primera tarea. | media | 23 |
| **K06** | [Contexto: pagos, comercios y personas en México](06-contexto-pagos-y-comercios-mx.md) | Cifras verificadas (INEGI, Banxico, DOF, Condusef y prensa seria) sobre efectivo, informalidad, costo de cobrar con tarjeta, uso real de CoDi, lo que cambia el 14-dic-2026, fraude, brecha digital y Coyoacán; léelo al definir problema, 'por qué ahora', personas y datos del pitch. | media | 18 |
| **K07** | [Ideas puntuadas y top 3 con PRD](07-ideas-puntuadas.md) | Banco de ideas calificadas contra los criterios del evento, top 3 con PRD listo para Codex y la recomendación final. | media | 42 |
| **K08** | [Criterios, jueces y cómo ganar: rúbrica, preguntas, errores y ganadores previos](08-criterios-y-jueces.md) | Criterios probables con pesos (inferencia), rúbrica 1–5, preguntas de jueces, errores que restan, ganadores previos y cómo demostrar Codex; léelo al elegir la idea y antes del pitch. | media | 10 |
| **K09** | [Pitch, demo y preguntas difíciles](09-pitch-y-preguntas.md) | Guion de 3 minutos, demo de 3 pasos, plan B y banco de 20 preguntas con respuesta modelo. | media | 8 |
| **K10** | [Perfil de José: fortalezas, riesgos y cómo cubrirlos](10-perfil-y-mitigaciones.md) | Cómo aprovechar la experiencia de José y cubrir los riesgos de ir solo, 100% en la nube y en un evento de Codex. | media | 0 |

## Preguntas → archivo
| Pregunta | Abre |
|---|---|
| ¿Qué tengo que saber en dos minutos? | K00 |
| ¿Qué construyo, con qué y cómo lo presento? | K00 |
| ¿Qué hago esta noche y qué hago el sábado? | K00 |
| ¿Cuáles son los riesgos principales y su plan B? | K00 |
| ¿Cuándo, dónde y a qué hora es el hackatón? | K01 |
| ¿Por qué hay dos horarios distintos y a qué hora conviene llegar? | K01 |
| ¿Cuál es el reto oficial y qué tecnologías se esperan? | K01 |
| ¿Cuándo y dónde se entrega el proyecto y cuándo se anuncian ganadores? | K01 |
| ¿Qué premio hay y quién organiza? | K01 |
| ¿Cómo llego en transporte público a UTOPÍA Coyoacán? | K01 |
| ¿Qué falta confirmar con los organizadores al llegar? | K01 |
| ¿Quién organiza el hackatón y qué quiere cada actor? | K02 |
| ¿Qué es el programa de Embajadores de Codex y qué valora? | K02 |
| ¿Qué novedades de OpenAI (DevDay 2026) conviene mostrar? | K02 |
| ¿Quién es AI Builders México y cuál es su misión? | K02 |
| ¿Qué es pey, qué ofrece su API y qué éxito busca? | K02 |
| ¿Qué es SpaceXAI y por qué aparece en el ecosistema del evento? | K02 |
| ¿Qué papel tienen UTOPÍAS y SEDECO? | K02 |
| ¿Qué conquista a los organizadores y qué los aleja? | K02 |
| ¿Qué es CoDi y cómo paga un cliente con QR o con notificación? | K03 |
| ¿Qué es Pey, cuánto cuesta su API CoDi y a dónde llega el dinero? | K03 |
| ¿Cómo saco hoy una API key de Pey y cuánto tarda en activarse? | K03 |
| ¿Cuál es la URL base, el header de autenticación y los campos para crear y consultar un cobro CoDi? | K03 |
| ¿En qué formato llega el QR y cómo se mapean los estados de Pey a los de la app? | K03 |
| ¿Cómo verifico la firma de los webhooks de Pey en una Vercel Function o en Codespaces? | K03 |
| ¿Hay sandbox? ¿Cómo hago un pago real en la demo y cuál es el plan B? | K03 |
| ¿Qué errores y límites debo manejar? | K03 |
| ¿Cómo expongo la API de Pey como herramientas de un agente de IA sin riesgos? | K03 |
| ¿Qué se anunció en el DevDay 2026 y qué conviene presumir ante los jueces? | K04 |
| ¿Qué modelo uso para texto, voz en español, visión e imágenes, y cuánto cuesta? | K04 |
| ¿Cómo hago llamada básica, streaming, salidas estructuradas y function calling con la Responses API? | K04 |
| ¿Cómo conecto voz en tiempo real desde el navegador con una llave efímera creada en el servidor? | K04 |
| ¿Siguen vigentes Agents SDK, Agents API, AgentKit, Agent Builder y ChatKit? | K04 |
| ¿Qué necesito para probar mi propia app (plugin MCP) dentro de ChatGPT con Plus y cuánto trabajo es? | K04 |
| ¿Cómo funciona el prompt caching de 12 horas y cuánto cuesta? | K04 |
| ¿Cómo creo la API key, cargo saldo y qué límites tiene una cuenta nueva? | K04 |
| ¿Qué funciones dan efecto wow en 4 horas? | K04 |
| ¿Dónde está hoy Codex web y cómo conecto GitHub y creo el entorno? | K05 |
| ¿Qué ve el agente de Codex: variables, secretos e internet, y en qué fase? | K05 |
| ¿Cómo lee Codex AGENTS.md (anidados, precedencia, tamaño máximo)? | K05 |
| ¿Cómo pregunto sin cambiar código, lanzo tareas en paralelo, pido varias versiones y creo el PR? | K05 |
| ¿Cuánto puedo usar Codex con ChatGPT Plus? | K05 |
| ¿Cómo instalo y autentico Codex CLI en GitHub Codespaces y uso codex exec? | K05 |
| ¿Funciona la extensión de Codex para VS Code dentro de Codespaces? | K05 |
| ¿Cómo hago que ChatGPT web lea mi repo de GitHub y cuándo conviene un MCP propio? | K05 |
| ¿Cómo funcionan los previews de Vercel por PR y el puerto público de Codespaces para webhooks? | K05 |
| ¿Cómo escribo buenas tareas para Codex y cuál es el flujo del sábado? | K05 |
| ¿Qué tan dominante es el efectivo en México y hacia dónde va? | K06 |
| ¿Qué tan grande es la informalidad y cuántos negocios son micro? | K06 |
| ¿Cuánto le cuesta a un comercio pequeño cobrar con tarjeta frente a CoDi? | K06 |
| ¿Cuánto se usa CoDi realmente y por qué no despegó? | K06 |
| ¿Qué cambia exactamente el 14 de diciembre de 2026 y qué es la Ley de Economía Digital? | K06 |
| ¿Qué fraudes frenan los pagos digitales y cómo diseñar confianza en un producto? | K06 |
| ¿Qué barreras digitales tienen las personas mayores y qué canal conviene usar? | K06 |
| ¿Qué hay en la Utopía Elena Poniatowska, Coyoacán y la CDMX que sirva al producto? | K06 |
| ¿Qué personas, datos y oportunidades de IA + CoDi usar en el pitch? | K06 |
| ¿Qué construyo para ganar? | K07 |
| ¿Cuál es la idea recomendada y por qué? | K07 |
| ¿Cuál es la demo de 3 pasos y la arquitectura de cada idea finalista? | K07 |
| ¿Cómo adapto la idea si el reto oficial cambia? | K07 |
| ¿Cómo se evaluará el proyecto y qué pesa más? | K08 |
| ¿Cómo me autoevalúo antes de entregar? | K08 |
| ¿Cómo funciona el voto de la comunidad y cómo me preparo? | K08 |
| ¿Qué preguntarán los jueces? | K08 |
| ¿Qué errores restan puntos o descalifican? | K08 |
| ¿Qué tipo de proyectos han ganado en hackatones de Codex y OpenAI, y por qué? | K08 |
| ¿Cómo demuestro en el pitch que usé Codex? | K08 |
| ¿Qué digo en el pitch y en qué orden? | K09 |
| ¿Cómo respondo las preguntas difíciles de los jueces? | K09 |
| ¿En qué es fuerte José y cómo se aprovecha en el producto y el pitch? | K10 |
| ¿Qué riesgos tiene y cómo se cubren? | K10 |
| ¿Qué debe poder explicar José sin ayuda frente a los jueces? | K10 |
| ¿Cómo deben trabajar Codex y ChatGPT con José? | K10 |

## Secciones de cada archivo

### K00 · Resumen ejecutivo: cómo ganar el DevDay Exchange Community Hackathon CDMX
Archivo: [`00-resumen-ejecutivo.md`](00-resumen-ejecutivo.md)

- `K00.1` El evento en seis datos
- `K00.2` Qué buscan los jueces y cómo se gana
- `K00.3` Idea recomendada y demo de 3 pasos
- `K00.4` Datos para el pitch (con fuente)
- `K00.5` El sábado en ocho líneas
- `K00.6` Esta noche (solo José)
- `K00.7` Riesgos principales y plan B

### K01 · Ficha verificada del evento: DevDay Exchange Community Hackathon CDMX (7 nov 2026)
Archivo: [`01-evento-verificado.md`](01-evento-verificado.md)

- `K01.1` Datos clave verificados
- `K01.2` Horario: la discrepancia y qué hacer
- `K01.3` Agenda oficial de sábado a martes
- `K01.4` Reto oficial y tecnologías esperadas
- `K01.5` Organizadores y aliados (resumen)
- `K01.6` Premios y cómo se eligen ganadores
- `K01.7` La sede: UTOPÍA Elena Poniatowska Amor
- `K01.8` Cómo llegar en transporte público
- `K01.9` Qué llevar
- `K01.10` Lo que sigue: calendario hasta diciembre
- `K01.11` Pendiente de confirmar al llegar (⚪)

### K02 · Organizadores y qué buscan: OpenAI/Codex, AI Builders México, pey, SpaceXAI y Gobierno CDMX
Archivo: [`02-organizadores-y-que-buscan.md`](02-organizadores-y-que-buscan.md)

- `K02.1` Mapa de actores y qué quiere cada uno
- `K02.2` OpenAI y el DevDay Exchange
- `K02.3` Programa de Embajadores de Codex
- `K02.4` Lo nuevo de OpenAI que conviene mostrar (DevDay 2026)
- `K02.5` AI Builders México: quiénes son
- `K02.6` AI Builders México: misión y apuesta por CoDi
- `K02.7` pey: empresa, API y certificación
- `K02.8` pey: por qué abrió su API y qué éxito busca
- `K02.9` Contexto: por qué CoDi importa (y por qué no ha despegado)
- `K02.10` SpaceXAI (y su relación con Cursor)
- `K02.11` Gobierno CDMX: UTOPÍAS y SEDECO
- `K02.12` Lo que los conquista
- `K02.13` Lo que los aleja

### K03 · CoDi y API de Pey
Archivo: [`03-codi-y-api-pey.md`](03-codi-y-api-pey.md)

- `K03.1` Qué es CoDi y cómo paga un cliente
- `K03.2` Qué es Pey y su API CoDi
- `K03.3` Alta y llaves (esta noche)
- `K03.4` Endpoints, formato del QR y estados
- `K03.5` Webhooks
- `K03.6` Desarrollo vs producción: demo con pago real y plan B
- `K03.7` Ejemplos mínimos en Node.js 20+ (probados)
- `K03.8` Errores comunes y límites
- `K03.9` La API como herramienta de un agente de IA

### K04 · API de OpenAI vigente (6 nov 2026): DevDay 2026, modelos, Responses, Realtime, Agents, plugins y costos
Archivo: [`04-openai-api-nov-2026.md`](04-openai-api-nov-2026.md)

- `K04.1` DevDay 2026: fecha y lanzamientos
- `K04.2` Modelos de texto y visión recomendados hoy
- `K04.3` Voz, imagen y transcripción: nombres y precios
- `K04.4` Responses API: llamada básica y streaming
- `K04.5` Salidas estructuradas (JSON Schema)
- `K04.6` Function calling (herramientas)
- `K04.7` Realtime API (voz): llave efímera + WebRTC
- `K04.8` GPT-Live-1 (opcional, voz full-duplex)
- `K04.9` Agents SDK (JS y Python) y Agents API
- `K04.10` AgentKit, Agent Builder y ChatKit: estado al 6 nov 2026
- `K04.11` Plugins (antes "Apps SDK"): tu app dentro de ChatGPT con Plus
- `K04.12` Prompt caching (30 min y 12 h)
- `K04.13` Cuenta de API: llave, saldo y límites de una cuenta nueva
- `K04.14` Ejemplo (a): salida estructurada (Node.js y Python)
- `K04.15` Ejemplo (b): function calling con `crear_cobro` (Node.js y Python)
- `K04.16` Ejemplo (c): voz Realtime en el navegador con llave efímera
- `K04.17` Qué funciones dan efecto wow en 4 horas

### K05 · Trabajar 100% en la nube: Codex (web y CLI), ChatGPT + GitHub, Codespaces y Vercel
Archivo: [`05-codex-chatgpt-y-codespaces.md`](05-codex-chatgpt-y-codespaces.md)

- `K05.1` Qué es hoy "Codex web": experiencia nueva vs. Legacy
- `K05.2` Conectar GitHub y crear el entorno
- `K05.3` Install script, variables y secretos: qué ve el agente y cuándo
- `K05.4` Internet del agente y dominios permitidos
- `K05.5` AGENTS.md: cómo lo lee Codex
- `K05.6` Preguntar vs. codificar, tareas en paralelo y varias versiones
- `K05.7` Revisar, dar seguimiento y crear el PR
- `K05.8` Code Review de Codex en PRs
- `K05.9` Límites de uso con ChatGPT Plus
- `K05.10` Codex CLI en GitHub Codespaces: instalar y entrar
- `K05.11` `codex exec` y tareas cloud desde la terminal
- `K05.12` Extensión de Codex para VS Code en Codespaces (issue #6403)
- `K05.13` ChatGPT web + GitHub: plugin de GitHub
- `K05.14` Servidores MCP propios y modo desarrollador en Plus
- `K05.15` Servidor MCP remoto oficial de GitHub
- `K05.16` Vercel + GitHub: previews por PR y variables
- `K05.17` Codespaces: puerto público para webhooks
- `K05.18` Cómo escribir tareas para Codex
- `K05.19` Flujo recomendado para el sábado

### K06 · Contexto: pagos, comercios y personas en México
Archivo: [`06-contexto-pagos-y-comercios-mx.md`](06-contexto-pagos-y-comercios-mx.md)

- `K06.1` Efectivo vs. pagos digitales en México
- `K06.2` Economía informal y micronegocios
- `K06.3` Costo de cobrar con tarjeta para un comercio pequeño
- `K06.4` CoDi: adopción real y por qué no despegó
- `K06.5` Qué cambia el 14 de diciembre de 2026
- `K06.6` Fraude y desconfianza
- `K06.7` Brecha digital: personas mayores, voz y WhatsApp
- `K06.8` Contexto local: Coyoacán, Barrio de San Lucas y la Utopía
- `K06.9` Personas (situaciones típicas; personas ficticias)
- `K06.10` Diez datos para el pitch
- `K06.11` Oportunidades donde IA + CoDi resuelven algo real

### K07 · Ideas puntuadas y top 3 con PRD
Archivo: [`07-ideas-puntuadas.md`](07-ideas-puntuadas.md)

- `K07.1` Rúbrica de puntuación
- `K07.2` Banco de ideas puntuadas
- `K07.3` Finalista 1: ¿Ya cayó?, la captura no es dinero (94)
- `K07.4` Finalista 2: Cóbrale, caja por voz con cobro CoDi (90)
- `K07.5` Finalista 3: Mesa Dividida, cada quien paga lo suyo (78)
- `K07.6` Recomendación final
- `K07.7` Ideas descartadas y antipatrones

### K08 · Criterios, jueces y cómo ganar: rúbrica, preguntas, errores y ganadores previos
Archivo: [`08-criterios-y-jueces.md`](08-criterios-y-jueces.md)

- `K08.1` Lo que sí sabemos de la evaluación (oficial)
- `K08.2` Criterios publicados en eventos hermanos
- `K08.3` Criterios probables y pesos estimados (inferencia)
- `K08.4` Rúbrica 1–5: impacto (C1) y ejecución (C2)
- `K08.5` Rúbrica 1–5: OpenAI y Codex (C3), originalidad (C4) y pitch (C5)
- `K08.6` El voto de la comunidad
- `K08.7` Preguntas típicas de jueces
- `K08.8` Errores que restan o descalifican
- `K08.9` Llaves y secretos en un repo público
- `K08.10` Qué ha ganado: OpenAI Build Week 2026 (oficial)
- `K08.11` Otros ganadores y patrones comunes
- `K08.12` Cómo demostrar el uso de Codex en el pitch
- `K08.13` Checklist de autoevaluación antes de entregar

### K09 · Pitch, demo y preguntas difíciles
Archivo: [`09-pitch-y-preguntas.md`](09-pitch-y-preguntas.md)

- `K09.1` Guion de 3 minutos (con marcadores)
- `K09.2` Reglas del pitch
- `K09.3` Demo de 3 pasos y cómo hacerla a prueba de fallas
- `K09.4` Cómo contar el uso de Codex y de la API de OpenAI (con evidencia)
- `K09.5` Cierre: siguiente paso hacia el Hackatón México (el nacional)
- `K09.6` Banco de 20 preguntas difíciles con respuesta modelo
- `K09.7` Plan B de la demo
- `K09.8` Versión de 1 minuto
- `K09.9` Versión en video y material para la votación

### K10 · Perfil de José: fortalezas, riesgos y cómo cubrirlos
Archivo: [`10-perfil-y-mitigaciones.md`](10-perfil-y-mitigaciones.md)

- `K10.1` Fortalezas y cómo usarlas
- `K10.2` Riesgos y cómo se cubren
- `K10.3` Lo que José debe poder explicar sin ayuda
- `K10.4` Cómo deben trabajar Codex y ChatGPT con José

<!-- ===== FIN: conocimiento/INDICE.md ===== -->

<!-- ===== INICIO: conocimiento/00-resumen-ejecutivo.md ===== -->

---
id: K00
titulo: "Resumen ejecutivo: cómo ganar el DevDay Exchange Community Hackathon CDMX"
resumen: "Lo indispensable en una página: evento, reto, qué buscan los jueces, idea recomendada, datos para el pitch, plan del sábado, pendientes de esta noche y riesgos."
responde:
  - "¿Qué tengo que saber en dos minutos?"
  - "¿Qué construyo, con qué y cómo lo presento?"
  - "¿Qué hago esta noche y qué hago el sábado?"
  - "¿Cuáles son los riesgos principales y su plan B?"
actualizado: 2026-11-06
confianza: media
fuentes: [SA01, SA03, SA04, SB07, SB10, SB15, SC06, SC26, SC34, SD01, SD10, SD20, SD21, SD24, SD33, SD38]
---
# K00 · Resumen ejecutivo

## TL;DR
- **Cuándo:** sábado 7 de noviembre, 10:00–16:00 (llega a las 9:00), UTOPÍA Elena Poniatowska Amor, Coyoacán. **Entrega: domingo 8 a las 13:00** en el portal del evento. Ganadores: lunes 9 (jurado y después voto comunitario). Premio: 10 boletos al DevDay Exchange oficial de OpenAI (martes 10, 14:00) [SA01][SA04].
- **Reto oficial:** prototipar herramientas de **bien público** con OpenAI y CoDi, usando la API gratuita de pey [SA01].
- **Idea recomendada: "¿Ya cayó?"**, una caja de cobro CoDi para puestos de barrio que nunca acepta una captura como pago: la IA lee el comprobante y pey dice si el dinero llegó de verdad (K00.3, K07).
- **Cómo se construye:** Codex web construye en paralelo, ChatGPT redacta, Vercel despliega; José decide y presenta. Stack por defecto en `AGENTS.md`.
- **Esta noche:** API de OpenAI con saldo, llave de pey ligada a la cuenta de prueba, Vercel con Root Directory `app` y entorno de Codex publicado (`dia-del-evento/CHECKLIST.md`).
- **Regla:** nada inventado; lo simulado dice SIMULACIÓN en pantalla.

## K00.1 · El evento en seis datos
| Dato | Valor | Detalle |
|---|---|---|
| Fecha y sede | Sáb 7 nov, 10:00–16:00, UTOPÍA Elena Poniatowska Amor, Av. Miguel Hidalgo 128, Barrio de San Lucas, Coyoacán [SA01] | K01.1, K01.8 |
| Reto | Herramientas de bien público con OpenAI y CoDi vía la API de pey; ejemplos: cobro para comercios de barrio, comercio comunitario, QR y solicitudes de pago, flujos empresariales [SA01] | K01.4 |
| Entrega | Domingo 8, 13:00, en el portal del evento (URL aún no publicada) [SA01] | K01.3 |
| Ganadores | Jurado el lunes 9 por la mañana; después, voto comunitario por 1 a 3 ganadores más [SA01] | K01.6 |
| Premio | Bolsa de 10 boletos al DevDay Exchange oficial de OpenAI en CDMX [SA01][SA04] | K01.6 |
| Organizan | AI Builders México con el Embajador de Codex local, UTOPÍAS, SEDECO y pey [SA01] | K02 |

⚪ Sin publicar: criterios, si se permite código previo, formato de entrega y si hay pitch en vivo el sábado. Se preguntan al llegar (K01.11).

## K00.2 · Qué buscan los jueces y cómo se gana
- El jurado decide hasta el lunes: lo entregado (README, demo con URL y video) tiene que convencer sin José presente (K08.1).
- Criterios probables (inferencia de eventos hermanos, K08.3): impacto y utilidad para comercios, que funcione de verdad, uso visible de Codex y de la API de OpenAI, originalidad y claridad del pitch.
- Lo que conquista a todos los organizadores (K02): un comercio concreto cobrando sin comisión con CoDi, una IA que resuelve algo real y no decorativo, Codex usado de forma visible y honestidad sobre qué es real y qué es simulación.
- Lo que resta: demo que falla, datos inventados, llaves expuestas, IA de adorno (K08).

## K00.3 · Idea recomendada y demo de 3 pasos
**¿Ya cayó?** Una caja de cobro CoDi para puestos de barrio: la IA arma el cobro y **nunca acepta una captura como pago**. Si el cliente enseña un "ya te transferí", OpenAI lee la imagen y el sistema la contrasta con los pagos reales de pey. Obtuvo 94/100 en la rúbrica de K07.1; el PRD completo está en K07.3.

**Demo (80 s o menos):**
1. "Cóbrale un dulce de tamarindo" → $1 → Confirmar → aparece el QR CoDi.
2. La clienta enseña una captura → la IA lee monto, hora y clave → "Todavía no cae: no entregues".
3. La clienta paga de verdad desde la app de su banco → "¡Ya cayó! $1.00, confirmado por pey", en pantalla y en voz alta.

**Por qué gana:** ataca la desconfianza que frenó a CoDi y el fraude con comprobantes falsos (2.48 millones de reclamaciones por posible fraude en un semestre, Condusef [SD38]). El modelo lee y propone, el código decide, pey confirma y la persona aprueba (K07.6).

**Alternativas finalistas:** Cóbrale, caja por voz (K07.4), y Mesa Dividida, un QR por comensal (K07.5). Si el reto oficial pide otra cosa, las adaptaciones rápidas están en K07.6.

## K00.4 · Datos para el pitch (con fuente)
- Cerca de 85 % de los adultos paga sobre todo en efectivo las compras de hasta $500 (ENIF 2024) [SD10].
- CoDi tiene 21.8 millones de cuentas validadas, pero solo 2.5 millones han pagado alguna vez (Banxico, sep 2025) [SD33].
- Una miscelánea paga hasta 3.95 % por cobro con tarjeta de débito (Banxico, jul 2026) [SD24]; con CoDi paga 0 %.
- 54.3 % de las personas ocupadas trabaja en la informalidad (ENOE, sep 2026) [SD20] y 95.4 % de los negocios son micro (Censos Económicos 2024) [SD21].
- **Por qué ahora:** el 14 de diciembre de 2026 vence el plazo para que las apps bancarias homologuen las transferencias y procesen los cobros CoDi con el mismo estándar (Banxico, Circular 9/2026) [SD01].

Más datos y personas: K06.10 y K06.9.

## K00.5 · El sábado en ocho líneas
1. 9:00 llegada, Wi-Fi, enchufe y preguntas clave a organizadores y a pey (K01.11).
2. ~10:30 inicio: Codex lanza el esqueleto en SIMULACIÓN mientras ChatGPT escribe `docs/PRD.md` con la idea de K07.
3. Antes de una hora: primer deploy en producción en Vercel.
4. Oleada de 3–4 tareas de Codex en paralelo, cada una en su carpeta (`dia-del-evento/PROMPTS-CODEX.md`).
5. ~13:00: los 3 pasos de la demo funcionan en producción desde el celular.
6. 14:45: congelar funciones; solo se arreglan errores del camino de la demo.
7. 15:30: entrega interna completa (README, demo, video corto y video para el voto).
8. Domingo antes de las 12:00: entrega final en el portal.

Minuto a minuto y planes B: `dia-del-evento/RUNBOOK.md`.

## K00.6 · Esta noche (solo José)
1. **OpenAI:** saldo en platform.openai.com (se paga aparte de ChatGPT Plus; con US$5 entras al tier Build) y una API key de proyecto [SC26]. Modelo por defecto: K04.2 [SC06].
2. **pey:** cuenta en portal.mipey.mx, la **cuenta de prueba** de la guía y una API key ligada a ella. Tu propia CLABE tarda 5 días hábiles; pey no tiene sandbox, así que en pruebas cobras de $0.01 a $1 [SB07][SB10].
3. **Vercel:** importa el repo con Root Directory = `app` y carga las variables de `.env.example` (tabla por entorno en la CHECKLIST).
4. **Codex web:** GitHub conectado y entorno creado y publicado [SC34].
5. **ChatGPT:** conectado al repo (K05) o, como respaldo, con `conocimiento/TODO-EN-UNO.md`.
6. Prueba de punta a punta: un cobro real de $0.01 pagado desde tu app bancaria, grabado en video.

Lista completa: `dia-del-evento/CHECKLIST.md`.

## K00.7 · Riesgos principales y plan B
| Riesgo | Plan B |
|---|---|
| pey no tiene sandbox | Cuenta de prueba con montos de $0.01; modo SIMULACIÓN etiquetado si algo falla (K03.6) |
| Un QR de otra llave responde 404 y nunca cambia de estado | Crear todo QR (incluido el de respaldo) con la misma llave de Production [SB15] |
| El webhook no llega a los previews de Vercel | Registrar el webhook en el dominio de producción; confirmar el pago consultando a pey cada 2 s (K03.5) |
| Internet de la sede | Hotspot del celular y video de respaldo (RUNBOOK) |
| Límites de Codex con Plus | Tareas pequeñas; Codex CLI en Codespaces como respaldo (K05) |
| Preguntas de "¿qué hizo la IA?" | Decisiones anotadas en cada PR y las 5 de K10.3 |

## Fuentes
Los IDs citados están en [`../fuentes/REGISTRO.md`](../fuentes/REGISTRO.md): SA01, SA03, SA04 (evento), SB07, SB10, SB15 (pey), SC06, SC26, SC34 (OpenAI y Codex), SD01, SD10, SD20, SD21, SD24, SD33, SD38 (contexto).

<!-- ===== FIN: conocimiento/00-resumen-ejecutivo.md ===== -->

<!-- ===== INICIO: conocimiento/01-evento-verificado.md ===== -->

---
id: K01
titulo: "Ficha verificada del evento: DevDay Exchange Community Hackathon CDMX (7 nov 2026)"
resumen: "Fecha, horario, sede, agenda, reto, premios, cómo llegar, qué llevar y pendientes del hackatón; léelo la noche anterior y al llegar."
responde:
  - "¿Cuándo, dónde y a qué hora es el hackatón?"
  - "¿Por qué hay dos horarios distintos y a qué hora conviene llegar?"
  - "¿Cuál es el reto oficial y qué tecnologías se esperan?"
  - "¿Cuándo y dónde se entrega el proyecto y cuándo se anuncian ganadores?"
  - "¿Qué premio hay y quién organiza?"
  - "¿Cómo llego en transporte público a UTOPÍA Coyoacán?"
  - "¿Qué falta confirmar con los organizadores al llegar?"
actualizado: 2026-11-06
confianza: alta
fuentes: [SA01, SA02, SA03, SA04, SA05, SA06, SA07, SA11, SA15, SA16, SA17, SA18, SA19, SA20, SA21, SA22, SA23, SA24, SA25, SA26, SA33, SA34, SA35, SA43, SA44, SA55, SA56, SA57, SA61]
---

# K01 · Ficha verificada del evento

## TL;DR

- **Cuándo y dónde:** sábado 7 de noviembre de 2026 en UTOPÍA Elena Poniatowska Amor, Av. Miguel Hidalgo 128, Barrio de San Lucas, Coyoacán, CP 04100. La agenda oficial marca 10:00–16:00 (GMT-6); **llega a las 9:00** [SA01].
- **Reto:** herramientas de bien público con OpenAI y CoDi usando la API gratuita de pey; ejemplos oficiales: cobro para comercios de barrio, comercio comunitario, QR y solicitudes de pago, flujos empresariales [SA01].
- **Entrega:** domingo 8 de noviembre a las 13:00 en el portal del evento; se vale seguir construyendo después del sábado [SA01].
- **Ganadores:** el jurado los anuncia el lunes 9 por la mañana; después un voto de la comunidad elige de 1 a 3 ganadores más [SA01].
- **Premio:** bolsa de 10 boletos al DevDay Exchange oficial de OpenAI en CDMX (martes 10 de noviembre, 14:00); no se anuncian efectivo ni créditos [SA01][SA04].
- **Sin publicar:** criterios, elegibilidad, reglas de código previo, formato de entrega y reparto de boletos (⚪ no verificado); pregúntalo en la primera hora (K01.11).

## K01.1 · Datos clave verificados

| Campo | Dato | Fuente |
|---|---|---|
| Nombre | DevDay Exchange Community Hackathon: Mexico City | [SA01] |
| Fecha | Sábado 7 de noviembre de 2026 | [SA01] |
| Horario | 10:00–16:00 GMT-6 según agenda y boleto (ver K01.2) | [SA01] |
| Sede | UTOPÍA Elena Poniatowska Amor, Av. Miguel Hidalgo 128, San Lucas, Coyoacán, 04100 CDMX | [SA01] |
| Calendario | Codex Community Events (Luma) | [SA01] |
| Anfitriones | Ben Kim (presentado como el Codex Ambassador local) y Esteban Constante | [SA01] |
| Organizan | AI Builders México, con UTOPÍAS, SEDECO y pey | [SA01] |
| Carácter | Hackatón comunitario, separado del DevDay Exchange oficial | [SA01] |
| Cupo | Limitado y con aprobación del anfitrión; la página mostraba 264 personas confirmadas | [SA01] |
| Participación | Solo o en equipo; llevar laptop | [SA01] |
| Idioma | Página bilingüe (español e inglés) | [SA01] |

No confundir con "OpenAI DevDay Exchange Community: Mexico City", otro evento del mismo calendario comunitario, organizado por Mexico Tech Week [SA57].

## K01.2 · Horario: la discrepancia y qué hacer

- El boleto (correo de aprobación) dice 10:00–16:00 GMT-6 y el encabezado en español de Luma, 10:00–16:00. La agenda escrita, en español y en inglés, también dice 10:00–16:00 [SA01].
- El encabezado en inglés de la misma página muestra 9:00–15:00 [SA01], igual que el newsletter The Build Log (9:00 a. m.–3:00 p. m.) [SA02].
- Explicación probable (inferencia, ⚪ no verificado): Luma ajusta el encabezado a la zona horaria de quien ve la página, y 10:00 en GMT-6 se ve como 9:00 en GMT-7. También es posible que el horario cambiara y no se actualizara todo. La agenda escrita por los organizadores coincide con el boleto.
- El boleto indica GMT-6 [SA01]; en noviembre esa es la hora del centro de México (inferencia, ⚪ no verificado en esta sesión).

**Recomendación:** llegar a las 9:00. Cubres ambos horarios y usas 9:00–10:00 para registrarte, conseguir Wi-Fi y enchufe, abrir Codex web, probar la API key de pey, ubicar a Ben Kim y a los mentores y hacer las preguntas de K01.11. Planea como si el trabajo presencial terminara a las 15:00: a esa hora debe existir una versión entregable (demo, README y video), y 15:00–16:00 queda de colchón. La entrega cierra el domingo a las 13:00 [SA01], así que el sábado en la noche puedes pulir, pero no dependas de eso.

## K01.3 · Agenda oficial de sábado a martes

| Cuándo | Qué pasa | Fuente |
|---|---|---|
| Sáb 7 nov, 10:00–16:00 | Construcción presencial en UTOPÍA Coyoacán con mentores de AI Builders México | [SA01] |
| Sáb 7 nov (sin hora) | La página menciona demos de proyectos y evaluación; ⚪ no dice si hay demo en vivo el sábado | [SA01] |
| Dom 8 nov, 13:00 | Fecha límite de entrega en el portal del evento (sin URL publicada) | [SA01] |
| Lun 9 nov, mañana | Anuncio de ganadores del jurado; después, voto comunitario por 1–3 ganadores más | [SA01] |
| Mar 10 nov, 14:00 | DevDay Exchange oficial de OpenAI en CDMX; la sede se comparte al aprobar la solicitud | [SA04] |

⚪ La página no aclara la zona horaria de la entrega del domingo; se asume hora de la Ciudad de México.

**Recomendación:** trata el sábado a las 15:30 como entrega interna (repo, demo desplegada, README y video de respaldo). El domingo solo corrige y entrega antes de las 12:00, con una hora de margen. Si ganas, necesitarás libre el martes por la tarde.

## K01.4 · Reto oficial y tecnologías esperadas

- El reto, en palabras de la página: "Prototipa herramientas de bien público con OpenAI y CoDi" [SA01].
- Ahí CoDi se describe como la red de pagos instantáneos y gratuitos de Banco de México, a la que se accede con la API gratuita de pey, que la página llama de código abierto [SA01]. ⚪ La página de la API de pey no menciona código abierto ni repositorio [SA11].
- Ideas de ejemplo oficiales: cobro para comercios de barrio, comercio comunitario, códigos QR y flujos de solicitud de pago, y flujos empresariales sobre pagos instantáneos [SA01].
- Tecnologías: OpenAI y Codex; el anfitrión es Codex Ambassador y la página enlaza a Codex [SA01]; los newsletters confirman OpenAI, CoDi y la API de Pey [SA02].
- API de pey: autoservicio, gratuita por ahora, funciona con cualquier banco, webhooks firmados con Standard Webhooks y documentación en docs.pey.mx; su página habla de llaves de prueba y de producción [SA11], pero K03 reporta que la referencia técnica solo documenta producción (⚪). Detalle: K03.
- En Bengaluru, hackatón hermano, se sugirió explorar lo nuevo del DevDay 2026: agentes persistentes, plugins de ChatGPT, Agents API, MCP events y Codex en la nube [SA07].

**Recomendación:** que un solo flujo muestre las tres piezas: (1) IA de OpenAI resolviendo algo real para un comercio, (2) un cobro CoDi con pey de punta a punta (monto chico en producción o, como plan B, SIMULACIÓN etiquetada; ver K03) y (3) evidencia de que se construyó con Codex.

## K01.5 · Organizadores y aliados (resumen)

- **Codex Community Events:** calendario comunitario de Luma que presenta este evento y otros DevDay Exchange Community [SA01][SA57].
- **Ben Kim:** anfitrión, presentado como el Codex Ambassador local [SA01]; aparece como organizador en eventos previos de AI Builders México (OpenAI Codex en Plaza Carso, Zero to Agent y v0) [SA33][SA34][SA35].
- **Esteban Constante:** coanfitrión; el listado de eventos de Luma en CDMX lo muestra junto a Ben Kim como organizadores [SA01][SA56].
- **AI Builders México:** organiza y aporta mentores [SA01].
- **Aliados:** UTOPÍAS (programa del Gobierno de la CDMX) [SA44], SEDECO (Secretaría de Desarrollo Económico de la CDMX) [SA61] y pey [SA01].
- **OpenAI:** no figura como anfitrión; el evento es comunitario y el premio es acceso a su DevDay Exchange oficial [SA01][SA04].
- **SpaceXAI:** no aparece en la página del 7 de noviembre; sí coorganiza el Hackatón México nacional con AI Builders y Pey [SA03].

Detalle de cada actor y de lo que busca: K02.

## K01.6 · Premios y cómo se eligen ganadores

- Premio publicado: bolsa de 10 boletos al DevDay Exchange oficial en la Ciudad de México [SA01].
- No hay lugares (1.º, 2.º, 3.º) publicados ni premios en efectivo o créditos. ⚪ No se sabe si habrá "primer lugar" ni cuántos boletos recibe cada ganador o equipo.
- Mecánica: el jurado anuncia ganadores el lunes 9 por la mañana y después la comunidad vota por 1–3 ganadores más [SA01].
- La propia página dice que la asignación de boletos, la elegibilidad y las condiciones se confirmarán más adelante [SA01] (⚪).
- Precedentes: París y Bengaluru también repartieron 10 boletos a su DevDay Exchange; en Bengaluru se aclaró que participar o presentar no garantizaba boleto [SA06][SA07].
- Valor del premio: el DevDay Exchange oficial incluye sesiones técnicas con equipos de producto e ingeniería de OpenAI, proyectos reales y flujos de Codex, orientación práctica para proyectos propios y conversación con el equipo; empieza a las 14:00 [SA04].

**Recomendación:** apunta a ganar por jurado (no dependas del voto) y prepara en paralelo material fácil de compartir para la votación comunitaria (K08.6). Mantén libre el martes 10 por la tarde.

## K01.7 · La sede: UTOPÍA Elena Poniatowska Amor

- La inauguró la jefa de Gobierno Clara Brugada el domingo 9 de agosto de 2026 [SA20], con inversión de 242 millones de pesos [SA17][SA18]. Ocupa el predio conocido como El Parián: casi 20 mil m² según Chilango [SA15] (ADN40 reportó 10 mil m² [SA21]).
- Servicios: comedor comunitario, lavandería, CADI, Casa de Día para personas mayores, consultorios, centro para personas con Parkinson, alberca semiolímpica, gimnasio, tortillería de maíz nativo y Museo Coyote, con experiencia inmersiva de Frida Kahlo y Diego Rivera [SA15][SA19].
- Tecnología: centro de transformación digital con 150 computadoras e impresoras 3D, escuela de videojuegos y animación, y formación para jóvenes en videojuegos, apps y drones [SA15][SA19].
- Otros espacios: foro de artes escénicas, auditorio para más de 40 personas, salas de museo, foros al aire libre y Sala de Acción Climática [SA15][SA19].
- Según las notas de la inauguración, beneficia a más de 130 mil habitantes [SA16][SA17][SA18].
- ⚪ No verificado: sala del hackatón, Wi-Fi para participantes, enchufes, comida y horario de acceso.

**Recomendación:** compórtate como invitado del Gobierno de la CDMX, aliado del evento: cuida el espacio y, si el proyecto puede servir a comercios o locatarios de Coyoacán, dilo en el pitch sin inventar alianzas.

## K01.8 · Cómo llegar en transporte público

- **Dirección:** Av. Miguel Hidalgo 128, Barrio de San Lucas, Coyoacán, CP 04100 [SA01]. En 2024 se informó que el predio también tiene acceso por la calle Progreso [SA22]; ADN40 lo ubica sobre Vicente García Torres, a un kilómetro del Museo Frida Kahlo [SA21].
- **Metro Línea 2, General Anaya** (en Calzada de Tlalpan, entre Ermita y Tasqueña) [SA25]: una guía de 2026 la señala como la estación más cercana al mercado de Coyoacán, en el centro; se sale hacia la calle 20 de Agosto y se camina unos 15 minutos por Xicoténcatl, o se toma transporte de conexión [SA23]. ⚪ El tiempo hasta Hidalgo 128 no está verificado (estimación propia: 15–25 minutos a pie).
- **Metro Línea 3, Coyoacán o Viveros:** alternativas con caminata más larga; desde Coyoacán son 15–20 minutos solo hasta el centro histórico [SA24][SA23].
- **App de transporte (Uber o Didi):** opción directa [SA23].
- **Aviso:** la Línea 2 operó en 2026 con cierres parciales por obras en Calzada de Tlalpan (hasta junio, según la prensa) [SA26][SA25]; ⚪ estado del servicio el sábado no verificado.

**Recomendación:** sal con margen para llegar entre 8:45 y 9:00; en la mañana revisa avisos del Metro y traza la ruta en tu app de mapas con la dirección completa; ten la app de transporte como plan B.

## K01.9 · Qué llevar

- **Oficial:** laptop; se puede ir solo o en equipo [SA01].
- **Precedentes:** Bengaluru pidió laptop, cargador y una idea, y configurar Codex antes de llegar [SA07]; Bangkok pidió laptop y cargador [SA05].

**Recomendación:** lista mínima:
- Laptop con cargador y, si puedes, un multicontacto pequeño.
- Celular cargado con app bancaria compatible con CoDi para probar el escaneo de QR, y datos para compartir internet si falla el Wi-Fi (⚪).
- Sesiones iniciadas desde casa: GitHub, ChatGPT (Codex web) y Codespaces; cuenta de pey y API key creadas desde antes (pasos de alta: K03) [SA11].
- Llave de API de OpenAI con saldo (⚪ no se anuncian créditos), guardada solo como secreto y nunca en el repo público (K08.9).
- Identificación oficial por si la piden al entrar a la sede pública (⚪).
- Agua, algo de comer (⚪ comida) y audífonos.
- Plantilla de pitch de una diapositiva y guion del video de respaldo.

## K01.10 · Lo que sigue: calendario hasta diciembre

| Fecha | Qué | Fuente |
|---|---|---|
| Dom 8 nov, 13:00 | Cierre de entregas | [SA01] |
| Lun 9 nov, mañana | Ganadores del jurado y voto comunitario | [SA01] |
| Lun 9 nov, 10:00 | Otro evento: RSI Kavak x OpenAI Hackathon (Capital Reforma), visto en una agenda pública; ⚪ no verificado | [SA55] |
| Mar 10 nov, 14:00 | DevDay Exchange oficial de OpenAI en CDMX, última de ocho ciudades | [SA04] |
| Sáb 14 nov | Arranque presencial del Cursor Hackatón México en 7 ciudades | [SA03] |
| 14 nov–12 dic | Hackatón México (hackatonmexico.com): CoDi y API de Pey; individual o en equipo; más de 1 millón de pesos en premios, créditos y recursos; con SpaceXAI y Pey | [SA03] |
| 12 dic / 14 dic | Entregas / resultados del Hackatón México | [SA03] |
| 14 dic | Fecha límite para que los bancos permitan recibir transferencias con el número de celular (circulares 9/2026 y 10/2026 de Banxico) | [SA43] |

**Recomendación:** diseña el proyecto de mañana para que pueda crecer en el Hackatón México; ⚪ confirma si allá se permite continuar un proyecto iniciado el 7 de noviembre.

## K01.11 · Pendiente de confirmar al llegar (⚪)

Nada de esto está publicado o verificado; pregúntalo a Ben Kim o a los mentores de AI Builders en la primera hora:

1. Criterios de evaluación, pesos y quiénes son los jueces (la página dice que se confirmarán) [SA01].
2. ¿Habrá demo en vivo el sábado? ¿Cuánto dura el pitch? ¿Hay preguntas del jurado?
3. URL del portal del evento y qué se entrega: repo, demo desplegada, video (¿duración?), presentación o formulario.
4. ¿Se permite código previo, plantillas o librerías propias? ¿La base de conocimiento preparada antes cuenta como código previo?
5. ¿Es obligatorio usar Codex u OpenAI? ¿Cómo quieren la evidencia?
6. Elegibilidad y condiciones de los boletos: ¿cuántos por ganador o equipo? ¿Existe "primer lugar"?
7. Mecánica del voto comunitario: dónde, quién vota y hasta cuándo.
8. ¿Hay créditos de OpenAI o de pey para participantes?
9. API de pey: ¿hay entorno o llaves de prueba, o solo producción (K03)? ¿Qué monto usar en la demo? ¿Hay repositorio de código abierto?
10. Hora real de cierre presencial (15:00 o 16:00), Wi-Fi, enchufes, comida y acceso.
11. ¿El proyecto puede continuar en el Hackatón México?
12. Política de fotos y video, y uso de datos de comercios reales.

**Recomendación:** anota las respuestas en `BITACORA.md` y actualiza K08 si se publican criterios.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA01 | DevDay Exchange Community Hackathon: Mexico City (página oficial en Luma; coincide con el boleto del participante) | https://luma.com/f755f0k6 | 2026-11-06 |
| SA02 | Newsletter The Build Log, AI Builders, 26 oct y 2 nov 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA04 | OpenAI DevDay Exchange 2026 | https://events.openai.com/devdayexchange2026/ | 2026-11-06 |
| SA05 | DevDay Exchange Community: Bangkok | https://luma.com/6m83xldb | 2026-11-06 |
| SA06 | DevDay Exchange Community: Paris | https://luma.com/6nccj7gu | 2026-11-06 |
| SA07 | DevDay Exchange Community Meetup & Hackathon: Bengaluru | https://luma.com/0bdmf0sw | 2026-11-06 |
| SA11 | pey: API CoDi | https://pey.mx/api-codi | 2026-11-06 |
| SA15 | Chilango: Utopía Elena Poniatowska abre en Coyoacán | https://www.chilango.com/ciudad/utopia-elena-poniatowska-amor-abre-sus-puertas-en-coyoacan-estos-servicios-ofrecera/ | 2026-11-06 |
| SA16 | Excélsior: Brugada inaugura la Utopía "Elena Poniatowska Amor" en Coyoacán | https://www.excelsior.com.mx/ciudad-de-mexico/utopia-elena-poniatowska | 2026-11-06 (previo) |
| SA17 | Publimetro: CDMX estrena Utopía Elena Poniatowska Amor en Coyoacán; costo 242 mdp | https://www.publimetro.com.mx/noticias/2026/08/10/cdmx-estrena-utopia-elena-poniatowska-amor-en-coyoacan-costo-242-mdp | 2026-11-06 (previo) |
| SA18 | Crónica: Abre en Coyoacán la Utopía Elena Poniatowska con inversión de 242 mdp | https://www.cronica.com.mx/metropoli/2026/08/09/abre-en-coyoacan-la-utopia-elena-poniatowska-con-inversion-de-242-mdp/ | 2026-11-06 (previo) |
| SA19 | Mexico Solidarity: Utopía Elena Poniatowska Inaugurated in Coyoacán | https://mexicosolidarity.com/utopia-poniatowska-coyoacan/ | 2026-11-06 |
| SA20 | Récord: Utopía Elena Poniatowska, así es el nuevo espacio gratuito de Coyoacán | https://www.record.com.mx/historia/utopia-elena-poniatowska-asi-es-el-nuevo-espacio-gratuito-de-coyoacan-2026081002203937212 | 2026-11-06 |
| SA21 | ADN40: Fecha de inauguración de la Utopía Coyoacán | https://www.adn40.mx/ciudad/2026-08-04/fecha-de-inauguracion-de-la-utopia-coyoacan-con-espacio-inmersivo-de-frida-kahlo/ | 2026-11-06 |
| SA22 | Chilango: Coyoacán tendrá nuevo centro comunitario, El Parián (2024) | https://www.chilango.com/noticias/el-parian-coyoacan-nuevo-centro-comunitario/ | 2026-11-06 |
| SA23 | Eje Central: Cómo llegar al mercado de Coyoacán en Metro o transporte público | https://www.ejecentral.com.mx/nuestro-eje/como-llegar-al-mercado-de-coyoacan-en-metro-uber-o-transporte-publico-para-comer-antojitos-y-comprar-artesanias | 2026-11-06 |
| SA24 | Excélsior: Coyoacán para primerizos | https://www.excelsior.com.mx/estilo-de-vida/que-hacer-coyoacan-guia-para-principiantes | 2026-11-06 |
| SA25 | Wikipedia: General Anaya metro station (Mexico City) | https://en.wikipedia.org/wiki/General_Anaya_metro_station_(Mexico_City) | 2026-11-06 |
| SA26 | Crónica: L2 del Metro opera con cierres parciales hasta junio por obras en Calzada de Tlalpan (titular) | https://www.cronica.com.mx/metropoli/2026/05/29/l2-del-metro-opera-con-cierres-parciales-y-servicio-dividido-hasta-junio-por-obras-en-calzada-de-tlalpan/ | 2026-11-06 |
| SA33 | OpenAI Codex: Mexico City (AI Builders Mexico, T1) | https://luma.com/suipk589 | 2026-11-06 |
| SA34 | Zero to Agent: Mexico City | https://luma.com/wp947zvj | 2026-11-06 |
| SA35 | v0 Prompt to Production, Mexico City | https://luma.com/fdg8riz2 | 2026-11-06 |
| SA43 | ADN40: Nuevas reglas para transferencias bancarias; fecha límite 14 de diciembre | https://www.adn40.mx/mexico/2026-09-12/nuevas-reglas-para-hacer-transferencias-bancarias-en-mexico-la-fecha-limite-es-el-14-de-diciembre/ | 2026-11-06 |
| SA44 | ADN40: Construirán 100 Utopías en CDMX: qué son | https://www.adn40.mx/ciudad/2024-10-05/construiran-100-utopias-en-cdmx-que-son-y-en-donde-estaran/ | 2026-11-06 |
| SA55 | Foundercal: Startup & Tech Events in Mexico City (nov 2026) | https://foundercal.com/cities/mexico-city | 2026-11-06 |
| SA56 | Luma: Popular events in Mexico City (listado) | https://luma.com/mexico-city | 2026-11-06 |
| SA57 | Codex Community Events (calendario de Luma) | https://luma.com/codex-community | 2026-11-06 |
| SA61 | Crónica: Digitalizarán trámites para locatarios de mercados públicos en la CDMX | https://www.cronica.com.mx/metropoli/2025/01/11/digitalizaran-tramites-para-locatarios-de-mercados-publicos-en-la-cdmx/ | 2026-11-06 |

(previo) = dato verificado por el equipo antes de esta sesión y no reconsultado aquí.

<!-- ===== FIN: conocimiento/01-evento-verificado.md ===== -->

<!-- ===== INICIO: conocimiento/02-organizadores-y-que-buscan.md ===== -->

---
id: K02
titulo: "Organizadores y qué buscan: OpenAI/Codex, AI Builders México, pey, SpaceXAI y Gobierno CDMX"
resumen: "Quién es cada organizador o aliado, qué quiere ver en los proyectos y qué los aleja; léelo para elegir la idea y armar el pitch."
responde:
  - "¿Quién organiza el hackatón y qué quiere cada actor?"
  - "¿Qué es el programa de Embajadores de Codex y qué valora?"
  - "¿Qué novedades de OpenAI (DevDay 2026) conviene mostrar?"
  - "¿Quién es AI Builders México y cuál es su misión?"
  - "¿Qué es pey, qué ofrece su API y qué éxito busca?"
  - "¿Qué es SpaceXAI y por qué aparece en el ecosistema del evento?"
  - "¿Qué papel tienen UTOPÍAS y SEDECO?"
  - "¿Qué conquista a los organizadores y qué los aleja?"
actualizado: 2026-11-06
confianza: media
fuentes: [SA01, SA02, SA03, SA04, SA05, SA06, SA07, SA11, SA12, SA13, SA14, SA15, SA27, SA28, SA29, SA30, SA31, SA32, SA33, SA34, SA35, SA36, SA37, SA38, SA39, SA40, SA41, SA42, SA43, SA44, SA45, SA50, SA53, SA54, SA59, SA60, SA61]
---

# K02 · Organizadores y qué buscan

## TL;DR

- Es un hackatón comunitario: lo encabeza un Embajador de Codex (Ben Kim) con AI Builders México, y lo apoyan UTOPÍAS, SEDECO y pey; OpenAI no es anfitrión directo [SA01].
- Todos convergen en lo mismo: IA de OpenAI más cobros CoDi vía pey para comercios reales, con enfoque de bien público [SA01][SA03].
- La comunidad Codex quiere ver Codex usado de forma visible, práctica e interesante, y lo nuevo del DevDay 2026 (Agents API, plugins con MCP Events, Codex en la nube) [SA07][SA29][SA50].
- AI Builders quiere que cobrar no cueste un porcentaje y que builders mexicanos hagan herramientas que acerquen CoDi a comercios y personas [SA03].
- pey quiere comercios cobrando con CoDi a través de su API gratuita (cualquier banco, webhooks firmados) [SA11][SA12].
- Los aleja: demo sin cobro real, IA decorativa, datos inventados, llaves expuestas y proyectos sin un comercio concreto (K02.13).

## K02.1 · Mapa de actores y qué quiere cada uno

| Actor | Rol el 7 de noviembre | Qué quiere ver | Base |
|---|---|---|---|
| Ben Kim / Codex Community Events | Anfitrión; Codex Ambassador local | Uso visible y práctico de Codex; comunidad | [SA01][SA27] |
| Esteban Constante | Coanfitrión | ⚪ sin información pública adicional | [SA01] |
| AI Builders México | Organizador; mentores | Herramientas con IA, hechas por builders mexicanos, que acerquen CoDi a comercios | [SA01][SA03] |
| pey | Aliado; API CoDi | Integraciones reales de su API; comercios cobrando | [SA01][SA11] |
| UTOPÍAS (Gobierno CDMX) | Aliado; sede | Impacto comunitario y bien público (inferencia) | [SA01][SA44] |
| SEDECO (CDMX) | Aliado | Desarrollo económico; comercios y mercados (inferencia) | [SA01][SA60][SA61] |
| OpenAI | Tecnología; su DevDay Exchange es el premio | Proyectos con sus herramientas, idealmente las nuevas | [SA04][SA07] |
| SpaceXAI | No figura el 7 nov; coorganiza el Hackatón México | ⚪ | [SA03] |

**Recomendación:** el pitch debe hablarle a los cuatro públicos en una frase cada uno: a la comunidad Codex (cómo lo construiste), a AI Builders y pey (cuántos comercios podrían cobrar sin comisión), al gobierno (bien público local) y a OpenAI (qué hace la IA que antes no se podía).

## K02.2 · OpenAI y el DevDay Exchange

- El DevDay 2026 de OpenAI tuvo su keynote el 29 de septiembre de 2026 [SA30].
- DevDay Exchange 2026 lleva el evento a ocho ciudades: Bengaluru, Tokio, Seúl, Berlín, París, Londres, São Paulo y Ciudad de México (10 de noviembre). Cada sede empieza a las 14:00 [SA04].
- Incluye sesiones técnicas con equipos de producto e ingeniería de OpenAI, proyectos reales y flujos de Codex de fundadores y desarrolladores, orientación práctica para proyectos propios y conversaciones abiertas con el equipo; la sede se revela al aprobar la solicitud [SA04].
- Aparte, la comunidad organiza eventos DevDay Exchange Community en muchas ciudades, a veces días antes del oficial (París, Bengaluru). Son independientes: registrarse en ellos no da acceso al oficial [SA06][SA07], y en Bangkok se aclaró que no era un evento oficial de OpenAI [SA05].
- En CDMX, el premio del hackatón comunitario es justamente acceso al evento oficial [SA01].

**Recomendación:** cierra el pitch conectando con el premio: el proyecto es lo que llevarías a platicar con el equipo de OpenAI el martes, con una pregunta técnica concreta (por ejemplo, cómo escalar agentes que manejan cobros con seguridad).

## K02.3 · Programa de Embajadores de Codex

- Programa de la comunidad de OpenAI Developers para organizadores de eventos, creadores de contenido y usuarios avanzados que reúnen builders y llevan la perspectiva de la comunidad a OpenAI. Es voluntario, no pagado, dura seis meses y pide al menos una contribución útil al mes; sus valores: comunidad primero, abierto a todos, curiosidad y ayuda [SA27].
- Rutas: eventos (meetups, talleres, hackatones) y contenido (tutoriales, demos, flujos de trabajo) [SA27].
- Apoyo de OpenAI: suscripción Pro y créditos de Codex y API; para eventos aprobados, posibles créditos para asistentes, comida, premios de hackatón y artículos promocionales [SA27]. Las solicitudes están cerradas [SA27].
- Un embajador describe el rol como puente entre el equipo de producto y las comunidades: crear experiencias de aprendizaje, conocimiento reutilizable, conexiones y retroalimentación sobre fricciones de uso [SA28].
- En este evento, Ben Kim es el anfitrión y se presenta como el Codex Ambassador local [SA01].

**Recomendación:** dale al embajador lo que su programa valora: (a) un flujo de Codex que otros puedan copiar (AGENTS.md, prompts y bitácora en el repo público), (b) retroalimentación concreta sobre Codex (qué funcionó y qué no) y (c) algo útil para la comunidad, como un README que enseñe a integrar la API de pey con OpenAI.

## K02.4 · Lo nuevo de OpenAI que conviene mostrar (DevDay 2026)

- **Modelos:** GPT-6 Astra y GPT-6.1 Sol; este último se acerca a Astra en código y uso de computadora a una quinta parte del precio, con entrada en caché a 0.10 USD por millón de tokens [SA29][SA31].
- **Agents API:** el mismo arnés de agentes de Codex, con entornos aislados, compactación de contexto, búsqueda de herramientas, subagentes y uso de computadora [SA29][SA31].
- **Codex:** tareas en la nube que se lanzan desde cualquier dispositivo y siguen corriendo con la laptop cerrada; CLI con voz y /agents; revisión de código en PRs; Codex Security Cloud [SA29][SA30][SA31].
- **Plugins de ChatGPT y MCP Events:** paneles, barra lateral y visores dentro de ChatGPT; las apps conectadas pueden avisar a ChatGPT cuando algo ocurre [SA29][SA31].
- **Decisions API** (vista previa limitada, modelo Luna) para clasificar y enrutar [SA29]; **Dots** (agentes persistentes) y **ChatGPT Space** [SA29][SA30]; **Sign in with ChatGPT** [SA30][SA31].
- El hackatón hermano de Bengaluru invitaba a explorar varias de estas piezas [SA07].
- ⚪ No verificado: qué está disponible para un participante individual con ChatGPT Plus y API de pago (ver K04).

**Recomendación:** idea natural para el reto: el webhook de pey (pago recibido) dispara una acción del agente o un aviso en ChatGPT. Úsalo solo si la pieza está disponible y probada; si no, la API estándar de OpenAI bien acotada gana más que una novedad rota.

## K02.5 · AI Builders México: quiénes son

- Comunidad que convierte ideas en productos digitales con IA. Su sitio declara más de 5,000 builders, más de 45 eventos y más de 2,500 asistentes (cifras autodeclaradas) [SA32].
- Programas: talleres para empresas, bootcamp, residencia y eventos presenciales y en línea [SA32].
- Logos de aliados en su sitio: Cursor, Reve, Stripe, v0, OpenAI, Gemini y SpaceXAI; clientes empresariales mostrados: BBVA, Walmart, PwC, Rappi y Grupo Gigante [SA32].
- Canales: WhatsApp, LinkedIn, Discord y newsletter [SA32]; su newsletter se llama The Build Log [SA02].
- Liderazgo público: el sitio nombra a "Ben" como cofundador [SA32]; en sus eventos aparecen como organizadores Ben Kim, Javier Rivero y Ricardo García [SA33][SA34][SA35]. Inferencia: Ben es Ben Kim (⚪ no confirmado).
- Historial: "OpenAI Codex: Mexico City" en Plaza Carso, con T1 como anfitrión y 137 asistentes, con demos en vivo y flujos de Codex [SA33][SA59]; "Zero to Agent" con Vercel y v0 (95 asistentes) [SA34]; "v0 Prompt to Production" (unos 200 asistentes) [SA35].

Inferencia: comunidad multiherramienta (OpenAI, Vercel, Cursor, SpaceXAI) que premia construir y lanzar productos reales rápido; conoce bien Codex porque ya organizó eventos con OpenAI.

## K02.6 · AI Builders México: misión y apuesta por CoDi

- Misión declarada en su newsletter del 31 de octubre: que cobrar no cueste un porcentaje de la venta. Subraya que CoDi cobra y paga al instante entre cuentas con 0% de comisión y que buscan herramientas con IA que acerquen esos pagos a más comercios, negocios y personas, hechas por builders mexicanos [SA03].
- Ruta de eventos: 7 de noviembre (este hackatón), 14 de noviembre (arranque presencial del Cursor Hackatón México en 7 ciudades) y 14 de noviembre–12 de diciembre (Hackatón México con CoDi y la API de Pey, organizado con SpaceXAI y Pey) [SA03].
- El 7 de noviembre sus mentores acompañan la construcción presencial [SA01][SA02].
- La nota de merca20 sobre el hackatón nacional resalta que el dinero llega directo a la cuenta del comercio [SA13].

**Recomendación:** usa su vocabulario, que es también el del reto: comisión 0%, dinero directo a la cuenta del comercio, builder mexicano, herramienta que un comercio puede usar hoy. Muestra que el proyecto puede seguir en el Hackatón México (continuidad real), sin pedir trato especial.

## K02.7 · pey: empresa, API y certificación

- **Empresa:** mipey.mx se presenta como certificada por Banxico, con la visión de ser el procesador de pagos digitales para los negocios informales de México [SA12]. ⚪ No verificado: tipo exacto de certificación, fundadores, financiamiento y tamaño.
- **API CoDi:** permite a negocios y desarrolladores aceptar cobros CoDi desde su propio software sin construir la conexión desde cero; autoservicio; gratuita por ahora; funciona con cualquier banco; menciona llaves de prueba y de producción; webhooks REST firmados con Standard Webhooks y secreto para verificar la firma; documentación en docs.pey.mx [SA11]. ⚪ K03 reporta que la referencia técnica solo documenta producción.
- **Código abierto:** la página del hackatón describe la API como gratuita y de código abierto [SA01]; ⚪ la página de la API no lo menciona.
- **Prensa:** merca20 informó que Pey, AI Builders México y SpaceXAI harían un hackatón de pagos digitales [SA13]; informabtl destacó que la API genera QR con importe y concepto, y que el 14 de diciembre cambian las transferencias en México [SA14].
- **Contexto regulatorio:** antes del 14 de diciembre de 2026 los bancos deben permitir recibir transferencias con el número de celular, según las circulares 9/2026 y 10/2026 de Banxico; la CLABE sigue funcionando [SA43].

Detalle técnico de endpoints y webhooks: K03.

## K02.8 · pey: por qué abrió su API y qué éxito busca

Evidencia:
- Gratuita, autoservicio y para cualquier banco: barrera mínima para integradores [SA11].
- Visión declarada: procesador de pagos para negocios informales [SA12].
- Apoya hackatones para que la comunidad construya sobre su API [SA01][SA03][SA13].

Inferencia (⚪, pey no lo declara así): abrir la API convierte a cada builder en un canal de distribución hacia comercios que pey no alcanzaría solo. Su éxito probable se mide en comercios activos cobrando con CoDi vía pey, volumen de cobros, casos de uso nuevos (voz, chat, QR impresos, cobro a domicilio) y retroalimentación sobre la API y su documentación.

**Recomendación:** en la demo, muestra el ciclo completo: crear cobro → QR o solicitud de pago → pago → webhook verificado → la IA actúa (registra la venta, avisa al comercio, concilia). Menciona métricas que le importan a pey: minutos para que un comercio reciba su primer cobro, pasos necesarios y comisión 0%. Si encuentras errores o huecos en la documentación, repórtalos con cortesía: es retroalimentación valiosa.

## K02.9 · Contexto: por qué CoDi importa (y por qué no ha despegado)

- Cobrar con tarjeta cuesta a los negocios hasta 1.91% (crédito) y 1.15% (débito); el promedio en México es 1.36% frente a cerca de 0.2% en otros países. CoDi transfiere al instante entre cuentas con QR o NFC, sin comisiones y a cualquier hora, pero requiere internet y app bancaria compatible [SA40].
- El 85.2% de las personas usa efectivo en compras menores a 500 pesos (dato de la CNBV citado por El Cronista) [SA41].
- En 2022, Banxico reportaba más de 14 millones de cuentas validadas en CoDi, pero solo un poco más de 1 millón con al menos un pago; se mencionaban como causas el lanzamiento en pandemia y la desconfianza [SA42].
- En 2026 las autoridades buscaban abaratar y facilitar los pagos digitales, incluida la adopción de CoDi [SA41].

**Recomendación:** el problema de fondo no es la tecnología sino la adopción: fricción, desconfianza y hábito del efectivo. Un proyecto que ataque eso (alta del comercio en minutos, confirmación de pago clara para quien cobra y quien paga, conciliación automática, explicaciones en español sencillo) toca el dolor real que AI Builders y pey quieren resolver.

## K02.10 · SpaceXAI (y su relación con Cursor)

- SpaceXAI es el nuevo nombre de xAI tras su fusión con SpaceX: la fusión se anunció en febrero de 2026 y el cambio de nombre se anunció en mayo y luego se hizo oficial [SA36].
- SpaceX anunció en junio de 2026 la compra de Cursor (Anysphere) por 60 mil millones de dólares en acciones [SA38] y la completó el 14 de agosto de 2026; Cursor menciona su trabajo con SpaceXAI para entrenar modelos y el lanzamiento de Grok 4.6 [SA37].
- En México: SpaceXAI coorganiza con AI Builders y Pey el Hackatón México nacional [SA03] y aparece entre los logos aliados de AI Builders [SA32]. Un hackatón de Cursor en Mérida (13–14 de noviembre) se registra en Luma con una dirección que incluye "spacexai" (inferencia de vínculo) [SA39].
- No aparece como organizador del hackatón del 7 de noviembre [SA01].

**Recomendación:** mañana es un evento de la comunidad Codex: construye y presenta con OpenAI y Codex. No hables mal de herramientas de la competencia; si preguntan, explica por qué OpenAI por sus méritos. Para el Hackatón México ⚪ revisa qué herramientas exige o permite.

## K02.11 · Gobierno CDMX: UTOPÍAS y SEDECO

- **UTOPÍAS** (Unidades de Transformación y Organización para la Inclusión y Armonía Social): programa insignia de la jefa de Gobierno Clara Brugada, con espacios de deporte, cultura y bienestar cerca de casa; el plan es construir 100 en la ciudad [SA44]. La sede del hackatón es una de ellas [SA15].
- **SEDECO** (Secretaría de Desarrollo Económico de la CDMX) es aliada del evento [SA01][SA61]. Entre sus temas están los mercados públicos: la ciudad tiene 339 [SA60], y en 2025 SEDECO impulsó digitalizar trámites de más de 75 mil locatarios con la plataforma SITRAMERP [SA61]; ese proceso de digitalización provocó protestas de locatarios [SA60].

Inferencia: al gobierno le interesan herramientas de bien público para comercios de barrio, mercados y economía local, que incluyan a personas mayores o con poca experiencia digital, y que no se sientan impuestas.

**Recomendación:** si el proyecto sirve a locatarios o comercios de barrio, hazlo voluntario, simple y sin trámites extra. Puedes proponer Coyoacán o un mercado público como piloto posible, sin afirmar alianzas que no existen.

## K02.12 · Lo que los conquista

Síntesis de este archivo; las fuentes van en cada punto:
- Un problema real de un comercio mexicano dicho en una frase (tiendita, puesto de mercado, fonda, servicio a domicilio), alineado con el reto de bien público [SA01].
- Cobro CoDi de punta a punta con pey, confirmado por webhook verificado [SA11].
- IA con un papel necesario y acotado: el código determinista maneja montos y estados, el modelo interpreta y explica, y la persona confirma (patrón de los ganadores de Build Week) [SA45].
- Uso visible de Codex y, si funciona, de una novedad de OpenAI [SA07][SA50].
- Narrativa de comisión 0% y dinero directo al comercio [SA03][SA13].
- Repo público reutilizable por la comunidad, coherente con los valores del programa de embajadores [SA27].

**Recomendación:** suma tres detalles que casi nadie cuida: diseño para personas no expertas (texto grande, voz, español coloquial), limitaciones declaradas con honestidad y un siguiente paso creíble (piloto o Hackatón México).

## K02.13 · Lo que los aleja

Síntesis de riesgos; las fuentes van en cada punto:
- Proyecto sin pey ni CoDi, o con cobro solo simulado sin decirlo, cuando el reto lo pide explícitamente [SA01].
- Envoltorio de chat genérico sin conexión con el cobro ni con el comercio.
- Un modelo que decide montos sin validación determinista ni confirmación humana [SA45].
- Datos, comercios o testimonios inventados presentados como reales.
- Llaves expuestas en el repo público: GitHub detecta llaves de OpenAI en repos públicos y OpenAI las desactiva, lo que además rompe la demo [SA54][SA53].
- Demo sin respaldo cuando falla el internet.
- Hablar mal de otras herramientas u organizadores, o presumir alianzas con gobierno, bancos o pey que no existen.
- Exponer datos personales (CLABE, teléfonos) de personas reales.

**Recomendación:** antes de entregar, revisa esta lista contra el repo y la demo; corrige cualquier punto en rojo antes de pulir lo visual.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA01 | DevDay Exchange Community Hackathon: Mexico City (página oficial en Luma) | https://luma.com/f755f0k6 | 2026-11-06 |
| SA02 | Newsletter The Build Log, AI Builders, 26 oct y 2 nov 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA04 | OpenAI DevDay Exchange 2026 | https://events.openai.com/devdayexchange2026/ | 2026-11-06 |
| SA05 | DevDay Exchange Community: Bangkok | https://luma.com/6m83xldb | 2026-11-06 |
| SA06 | DevDay Exchange Community: Paris | https://luma.com/6nccj7gu | 2026-11-06 |
| SA07 | DevDay Exchange Community Meetup & Hackathon: Bengaluru | https://luma.com/0bdmf0sw | 2026-11-06 |
| SA11 | pey: API CoDi | https://pey.mx/api-codi | 2026-11-06 |
| SA12 | mipey.mx | https://mipey.mx | 2026-11-06 (previo) |
| SA13 | merca20.com: nota sobre el hackatón de pagos digitales de Pey, AI Builders México y SpaceXAI | merca20.com (URL exacta no registrada) | 2026-11-06 (previo) |
| SA14 | informabtl.com: nota sobre la API CoDi de Pey y el cambio del 14 de diciembre | informabtl.com (URL exacta no registrada) | 2026-11-06 (previo) |
| SA15 | Chilango: Utopía Elena Poniatowska abre en Coyoacán | https://www.chilango.com/ciudad/utopia-elena-poniatowska-amor-abre-sus-puertas-en-coyoacan-estos-servicios-ofrecera/ | 2026-11-06 |
| SA27 | OpenAI Developers: Codex Ambassadors | https://developers.openai.com/community/codex-ambassadors | 2026-11-06 |
| SA28 | HackerNoon: OpenAI Codex Ambassador Program, what does an ambassador actually do | https://hackernoon.com/openai-codex-ambassador-program-what-does-an-ambassador-actually-do | 2026-11-06 |
| SA29 | InfoQ: OpenAI DevDay 2026 | https://infoq.com/news/2026/10/openai-devday-2026 | 2026-11-06 |
| SA30 | BGR: Everything OpenAI announced at DevDay 2026 | https://www.bgr.com/2272332/openai-devday-2026-announcements/ | 2026-11-06 |
| SA31 | The Neuron: OpenAI DevDay 2026, ChatGPT is becoming an AI operating system | https://www.theneuron.ai/news/openai-devday-2026-chatgpt-is-becoming-an-ai-operating-system/ | 2026-11-06 |
| SA32 | AI Builders México (sitio oficial) | https://aibuilders.mx/ | 2026-11-06 |
| SA33 | OpenAI Codex: Mexico City (AI Builders Mexico, T1) | https://luma.com/suipk589 | 2026-11-06 |
| SA34 | Zero to Agent: Mexico City | https://luma.com/wp947zvj | 2026-11-06 |
| SA35 | v0 Prompt to Production, Mexico City | https://luma.com/fdg8riz2 | 2026-11-06 |
| SA36 | Mezha: xAI is now SpaceXAI | https://mezha.ua/en/news/xai-now-spacexai-312996/ | 2026-11-06 |
| SA37 | Cursor: Joining SpaceX | https://cursor.com/hi/blog/joining-spacex | 2026-11-06 |
| SA38 | Built In: SpaceX plans to acquire AI coding startup Cursor for $60B | https://builtin.com/articles/spacex-acquires-cursor-60b-20260616 | 2026-11-06 |
| SA39 | vibecoding.app: Cursor Hackathon Mérida (nov 2026) | https://vibecoding.app/ai-events/cursor-hackathon-merida-2026-11 | 2026-11-06 |
| SA40 | El Imparcial: Negocios pueden evitar pagar hasta 1.91% por cobrar con tarjeta (CoDi) | https://www.elimparcial.com/dinero/2026/04/11/negocios-en-mexico-pueden-evitar-el-pago-de-hasta-191-por-cobrar-con-tarjeta-con-esta-solucion-del-banco-de-mexico-que-elimina-cargos-y-entrega-el-dinero-en-segundos/ | 2026-11-06 |
| SA41 | El Cronista: La guerra contra el efectivo, más pagos digitales en 2026 | https://www.cronista.com/mexico/finanzas-economia/la-guerra-en-contra-del-efectivo-autoridades-en-mexico-van-por-mas-pagos-digitales-en-2026 | 2026-11-06 |
| SA42 | DPL News: México, desestiman a CoDi población y comercios (2022) | https://dplnews.com/?p=173032 | 2026-11-06 |
| SA43 | ADN40: Nuevas reglas para transferencias bancarias; fecha límite 14 de diciembre | https://www.adn40.mx/mexico/2026-09-12/nuevas-reglas-para-hacer-transferencias-bancarias-en-mexico-la-fecha-limite-es-el-14-de-diciembre/ | 2026-11-06 |
| SA44 | ADN40: Construirán 100 Utopías en CDMX: qué son | https://www.adn40.mx/ciudad/2024-10-05/construiran-100-utopias-en-cdmx-que-son-y-en-donde-estaran/ | 2026-11-06 |
| SA45 | OpenAI Developers Blog: Build Week winners | https://developers.openai.com/blog/build-week-winners | 2026-11-06 |
| SA50 | Codex Community Mini-Hackathon, San Francisco #5 | https://luma.com/7025i1j5 | 2026-11-06 |
| SA53 | GitHub Blog: Keeping secrets out of public repositories (29 feb 2024) | https://github.blog/2024-02-29-keeping-secrets-out-of-public-repositories | 2026-11-06 |
| SA54 | GitHub Changelog: RubyGems, Adobe and OpenAI are now secret scanning integrators (8 jun 2021) | https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators | 2026-11-06 |
| SA59 | Get on Board: OpenAI Codex – Mexico City (8 abr 2026) | https://www.getonbrd.com/events/2026/openai-codex-mexico-city-valdivia-chile | 2026-11-06 |
| SA60 | Expansión Política: Las 14 acciones que emprenderá la CDMX para mejorar los mercados | https://politica.expansion.mx/cdmx/2025/02/12/las-14-acciones-que-emprendera-la-cdmx-para-mejorar-los-mercados | 2026-11-06 |
| SA61 | Crónica: Digitalizarán trámites para locatarios de mercados públicos en la CDMX | https://www.cronica.com.mx/metropoli/2025/01/11/digitalizaran-tramites-para-locatarios-de-mercados-publicos-en-la-cdmx/ | 2026-11-06 |

(previo) = dato verificado por el equipo antes de esta sesión y no reconsultado aquí.

<!-- ===== FIN: conocimiento/02-organizadores-y-que-buscan.md ===== -->

<!-- ===== INICIO: conocimiento/03-codi-y-api-pey.md ===== -->

---
id: K03
titulo: "CoDi y API de Pey"
resumen: "Qué es CoDi y cómo se usa la API CoDi de Pey (alta, llaves, endpoints, estados, webhooks, pagos reales de prueba, errores), con ejemplos probados en Node/Vercel y reglas para usarla desde un agente. Léelo completo antes de escribir código de cobro."
responde:
  - "¿Qué es CoDi y cómo paga un cliente con QR o con notificación?"
  - "¿Qué es Pey, cuánto cuesta su API CoDi y a dónde llega el dinero?"
  - "¿Cómo saco hoy una API key de Pey y cuánto tarda en activarse?"
  - "¿Cuál es la URL base, el header de autenticación y los campos para crear y consultar un cobro CoDi?"
  - "¿En qué formato llega el QR y cómo se mapean los estados de Pey a los de la app?"
  - "¿Cómo verifico la firma de los webhooks de Pey en una Vercel Function o en Codespaces?"
  - "¿Hay sandbox? ¿Cómo hago un pago real en la demo y cuál es el plan B?"
  - "¿Qué errores y límites debo manejar?"
  - "¿Cómo expongo la API de Pey como herramientas de un agente de IA sin riesgos?"
actualizado: 2026-11-07
confianza: media
fuentes: [SB01, SB02, SB03, SB04, SB05, SB06, SB07, SB08, SB09, SB10, SB11, SB12, SB13, SB14, SB15, SB16, SB17, SB18, SB19, SB20, SB21, SB22, SB23, SB24, SB25, SB26, SB27, SB28, SB29, SB30, SB31, SB32, SB33, SB34, SB35, SB36, SB37, SB38, SB39, SB40, SB41, SB42, SB43, SB44, SB45, SB46]
---

# K03 · CoDi y API de Pey

## TL;DR

- **CoDi** (Banxico) cobra con QR o con notificación al celular sobre SPEI, 24/7, sin comisión para quien paga ni para quien cobra; el cliente autoriza en la app de su banco [SB29][SB31].
- **API de Pey**: REST en `https://api.pey.mx`, el único entorno documentado (producción), con `Authorization: Bearer <API key>`; gratuita por ahora, self-service, y el dinero llega directo a la cuenta bancaria del comercio [SB01][SB10][SB38].
- **Alta**: portal.mipey.mx → Finanzas (cuenta `codi`) → Desarrollador → "Crear API Key". Tu CLABE tarda 5 días hábiles con Banxico; para mañana registra la cuenta de prueba publicada en la guía: se activa al instante, pero lo que le pagues NO se devuelve (usa $0.01 a $1) [SB07].
- **Flujo de demo**: `POST /codi/qr` (monto en pesos) con `generateImage: true` → muestras `qrImage` (PNG en base64) → confirmas con `GET /transaction/codi/qr/{id}` (`PAID`) o con el webhook `codi.qr.payment_received` [SB10][SB17].
- **Webhooks**: firmados con Standard Webhooks (HMAC-SHA256 sobre `id.timestamp.cuerpo`), uno por API key; regístralo como `<dominio de producción>/api/webhook-pey`, nunca con un preview [SB08][SB39][SB43].
- **Seguridad**: el repo es público, así que la llave y el secreto viven solo en variables de entorno del servidor; el agente propone, la persona confirma y el servidor impone `MAX_MONTO_MXN`.

## K03.1 · Qué es CoDi y cómo paga un cliente

CoDi® (Cobro Digital) es la plataforma de Banco de México para cobrar y pagar con transferencias desde el celular: corre sobre SPEI, opera 24/7, liquida de inmediato y no cobra comisión ni a quien paga ni a quien cobra [SB29][SB35]. El pagador autoriza cada operación, así que no hay contracargos [SB26].

**Canales.** QR (fijo en el negocio o generado por venta), NFC [SB26] y notificación al celular del pagador [SB30].

**Cómo paga el cliente con QR.** App de su banco → CoDi → pagar → escanea el QR o lo importa de la galería → escribe el monto si el QR no lo trae → autoriza con NIP, huella o token → ambos reciben confirmación [SB31]. El menú cambia por banco (en BBVA: "Pagar con CoDi") y permiten pagar BBVA, Santander, Banamex, Banorte, HSBC, Scotiabank, Banco Azteca e Inbursa, entre otros [SB33]. Nu, Mercado Pago y similares: ⚪ no verificado.

**Quién cobra.** Cualquiera con cuenta en un banco participante y app compatible, como la app CoDi Banxico [SB26][SB30]. Un software de terceros, como Pey, debe certificarse ante Banxico [SB27].

**Devoluciones.** Quien cobró puede devolver parcial o totalmente [SB28]; la API de Pey no tiene endpoint para eso (K03.4).

**Límites.** Cada banco fija su máximo; en 2019 Banxico pedía que no fuera menor a $8,000 MXN [SB32]. Límite vigente: ⚪ no verificado.

**Contexto 2026 (pitch).** Los bancos deben homologar sus transferencias móviles, CoDi incluido, a más tardar el 14 de diciembre de 2026; además existe la cuenta "nivel 2 Bis", sin RFC, para micro y pequeños comercios [SB36][SB38].

## K03.2 · Qué es Pey y su API CoDi

Pey (pey®) es una empresa de tecnología enfocada en integrar CoDi a negocios [SB02]; el pie de su documentación dice Koshi SA de CV [SB24]. Afirma que Banxico aprobó su integración con CoDi [SB03], requisito para terceros desarrolladores [SB27].

**API CoDi.** Self-service, con cualquier banco y gratuita «por el momento» [SB01]: sin cuota ni cobro por solicitud [SB06], por condiciones comerciales vigentes, no permanentes [SB38]. El dinero llega directo a la cuenta bancaria del comercio, sin cuenta en Pey [SB37][SB38]; Banxico prohíbe cuentas concentradoras [SB27].

**Qué hace** [SB06][SB10]: QR CoDi; push CoDi a un celular; registro de CLABEs de personas o empresas para cobrar a nombre de cada una (`bankAccountId`); links de pago (CoDi, tarjetas, Apple Pay y Google Pay); consulta de transacciones.

**Otros productos.** App pey (iOS y Android) que reúne los pagos CoDi de cualquier banco y comparte la vista de cobros sin dar credenciales [SB04]; soluciones para restaurantes y boletera; portal de negocios [SB02][SB05].

**Sin documentar:** la comisión por tarjeta en links de pago (⚪ no verificado) y la visión de procesador para negocios informales, que viene de los organizadores (⚪ no verificado en pey.mx).

**Dato extra.** Pey co-organiza el "Hackatón México" (14 nov a 12 dic 2026), con más de un millón de pesos en premios y créditos [SB37].

**Recomendación:** ángulo multi-comercio: registra la CLABE de cada puesto (`POST /bank-account`, `entity: "PERSON"`) y cobra con su `bankAccountId`: sin comisión y con dinero directo. Pey lo resume: «ahora falta facilitar la experiencia de quien recibe el dinero» [SB37].

## K03.3 · Alta y llaves (esta noche)

Todo pasa en `portal.mipey.mx` [SB07][SB08]:

1. **Perfil.** Qué datos pide (correo, RFC, INE…): ⚪ no verificado. Ten tu CLABE a la mano.
2. **Finanzas → cuenta de pago `codi`** (solo cuentas mexicanas). Tu CLABE tarda 5 días hábiles en registrarse ante Banxico: no estará lista mañana. Mientras, registra la **cuenta de prueba** que publica la guía (sección "Prueba en producción"): se activa de inmediato, pero lo que se le pague no se devuelve; usa montos como $0.01 MXN [SB07]. También hay registro por API: `POST /bank-account` [SB13].
3. **Desarrollador → "Crear API Key"**: nombre y cuenta vinculada (una `codi`; una `stripe` si quieres tarjetas) [SB07]. Si la llave se muestra una sola vez: ⚪ no verificado; cópiala de inmediato.
4. **Webhook**: engrane de la llave → URL → crear; guarda el secreto de firma (rotable). Un webhook por llave [SB08].
5. **Secretos** en Vercel y Codespaces: `PEY_API_KEY` y `PEY_WEBHOOK_SECRET`. Nunca en el repo.

**Entornos.** Pey solo documenta producción (`https://api.pey.mx`); el entorno de pruebas está "próximamente" [SB09][SB10]. La landing menciona llaves de prueba y de producción [SB01], pero la referencia técnica no (⚪ pregúntalo a Pey en el evento). Por eso el repo no usa `PEY_ENV`: la URL base es siempre la de producción, y lo que se muestra en pantalla es `MODO_PAGO` (`simulacion`, `prueba` o `comercio`; ver `.env.example`).

**Recomendación:** esta noche activa CoDi en la app bancaria con la que pagarás (algunos bancos validan con un depósito de un centavo y un SMS) [SB34], paga $0.01 de punta a punta con el `curl` de abajo y graba la pantalla. Con la cuenta de prueba, baja `MAX_MONTO_MXN` (p. ej. a 20).

```bash
# Prueba de humo: crea un QR de 1 centavo. La llave sale de tu variable de entorno, nunca del repo.
curl -sS https://api.pey.mx/codi/qr \
  -H "Authorization: Bearer $PEY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"amount":0.01,"concept":"Prueba hackaton","expiration":600,"numRef":"1","generateImage":false}'
# Esperado: HTTP 201 con {"id": "...", "qrString": "..."}. Convierte qrString en QR y págalo desde tu app.
```

## K03.4 · Endpoints, formato del QR y estados

Base `https://api.pey.mx`; headers `Authorization: Bearer <PEY_API_KEY>`, `Content-Type: application/json` y `Accept: application/json` [SB10][SB23]. Los esquemas completos están en el OpenAPI (`docs.pey.mx/openapi.json`, versión 2026-10-20), no en las páginas de referencia [SB10][SB11][SB12].

| Método y ruta | Uso | Éxito |
|---|---|---|
| `POST /codi/qr` | Crear QR | 201 |
| `POST /codi/pn` | Push a un celular | 200 |
| `GET /transaction/codi/qr/{id}` | Pagos de un QR (20/página) | 200 |
| `GET /transaction/{id}` | Una transacción | 200 |
| `GET /transaction/api-key` | Todo lo cobrado (80/página) | 200 |
| `POST /bank-account`, `GET /bank-account/{id}` | CLABEs | 200 |
| `POST /payment-link/create`, `/update`, `GET /payment-link/{id}` | Links de pago | 200 |

**Monto:** pesos como número con decimales (150.00, 0.01), no centavos [SB07][SB10].

**QR:** la respuesta trae `id` (IDC de Banxico), `qrString` y, con `generateImage: true`, `qrImage` (PNG base64; puede tardar o venir `null`). Muéstralo como `data:image/png;base64,…`; si es `null`, convierte `qrString` en QR con una librería [SB10][SB23]. Pey no regresa el vencimiento: calcúlalo con `expiration` [SB10].

**Estados:** un QR no es una transacción; sus pagos salen de `GET /transaction/codi/qr/{id}`, cada uno con `status` `PENDING` o `PAID` y los campos del bloque de abajo [SB10][SB14][SB15][SB21][SB22]. Una push se sigue con su `transactionId` en `GET /transaction/{id}` [SB10].

| Respuesta de Pey | Estado sugerido |
|---|---|
| `PAID` vinculado al cobro, con monto esperado y moneda MXN | `pagado`; validar del lado servidor |
| Lista vacía o solo `PENDING` | `pendiente` |
| 404 `NOT_FOUND` | `no_verificable` + aviso visible: según la doc, el QR no existe o es de **otra llave** [SB15]. Causa típica: un QR de respaldo creado con una llave distinta a la de Production |
| Pasó `expiraEn` sin `PAID` | `expirado` (lo calcula la app) |

**Cancelar o devolver:** no hay endpoint (⚪ no verificado si hay otra vía); usa `expiration` corta y devuelve desde la app bancaria del titular [SB10][SB28].

```jsonc
// POST /codi/qr: cuerpo (ejemplo propio con los campos del OpenAPI)
{
  "amount": 25.5,            // pesos MXN, obligatorio, >= 0; 0 = el cliente escribe el monto
  "concept": "2 tacos",      // lo ve el cliente en su app
  "expiration": 600,         // segundos; 0 = no vence (default); si se usa, mínimo 360
  "numRef": "1234",          // 1 a 7 dígitos; default "0"
  "generateImage": true,     // default false; agrega qrImage
  "bankAccountId": "01J...", // opcional: cuenta registrada y ACTIVE; sin él usa la cuenta codi de la llave
  "metadata": { "pedidoId": "A-17" } // hasta 50 claves; clave <= 40 y valor <= 500 caracteres; regresan como texto
}
// Respuesta 201
{ "id": "<IDC asignado por Banxico>", "qrString": "<texto a convertir en QR>", "qrImage": "<base64 PNG o null>" }

// GET /transaction/codi/qr/{id}: respuesta 200 (cada item es un objeto transacción)
{ "items": [ { "id": "<ULID>", "status": "PAID", "amount": 25.5, "currency": "MXN", "paymentMethod": "CODI",
               "amountBreakdown": { "base": 25.5, "tip": 0, "fee": 0 }, "dateCreated": 1794000000,
               "datePaid": 1794000060, "metadata": { "trackingKey": "...", "externalMetadata": { "pedidoId": "A-17" } } } ],
  "nextToken": null }

// POST /codi/pn: cuerpo (amount > 0 y <= 1,000,000; phoneNumber de 10 dígitos; expiration >= 360, default 360)
{ "amount": 25.5, "phoneNumber": "5500000000", "concept": "2 tacos", "expiration": 360, "numRef": "1234" }
// Respuesta 200
{ "transactionId": "<ULID para seguir el pago>", "codiId": "<folio CoDi de 20 dígitos>" }

// Errores 4xx/5xx (todas las rutas)
{ "error": { "message": "...", "type": "INVALID_AMOUNT", "requestId": "..." } }
```

## K03.5 · Webhooks

**Eventos** (payload plano con `type`; no hay eventos documentados de pago rechazado o vencido) [SB17][SB18][SB19][SB20]:
- `codi.qr.payment_received`: `amount`, `apiKeyId`, `bankAccountId` (si lo mandaste), `codiQrId` (el `id` del QR), `concept`, `datePaid` (Unix en segundos), `metadata`, `numRef`, `transactionId` y `type`.
- `codi.pn.payment_received`: igual, sin `codiQrId`.
- `bank.account.updated`: solo al pasar a `ACTIVE`.
- `payment_link.status_updated`: `paymentLinkId`, `status`, `clientReferenceId` y `transactions`.

**Firma.** Standard Webhooks [SB08][SB16]: headers `webhook-id`, `webhook-timestamp` y `webhook-signature` (`v1,<base64>`, quizá varias separadas por espacio) [SB06][SB39]. Se firma `id.timestamp.cuerpo` con HMAC-SHA256; la llave es el secreto sin `whsec_`, decodificado de base64 [SB39][SB40]. Compara en tiempo constante y rechaza timestamps viejos (la especificación no fija tolerancia; **Recomendación:** 5 minutos) [SB39]. Lee el cuerpo crudo con `await request.text()` [SB42].

**Respuesta.** Cualquier 2xx es entrega exitosa [SB39]; el ejemplo de Pey responde 200 [SB16]. Reintentos y timeout de Pey: ⚪ no verificado. Deduplica por `webhook-id`; depura en Desarrollador → engrane → "Webhook Logs" [SB16].

**URL pública.**
- Vercel: `https://<proyecto>.vercel.app/api/webhook-pey` [SB41], siempre con el dominio de producción: la protección estándar bloquea previews y URLs de deployment [SB43].
- Codespaces: PORTS → clic derecho → Port Visibility → Public (o `gh codespace ports visibility <puerto>:public`); URL `https://<codespace>-<puerto>.app.github.dev`. Un puerto privado exige token y Pey no entraría [SB44].
- Un webhook por llave: al cambiar de Codespaces a Vercel, edita la URL en el portal [SB08].

Código del handler: K03.7.

## K03.6 · Desarrollo vs producción: demo con pago real y plan B

**No hay sandbox:** Pey recomienda probar en producción, con bancos y webhooks reales, montos como $0.01 MXN [SB07][SB09]; no documenta simulador de pagos (⚪ no verificado).

**Guion de pago real (Recomendación):**
1. Esta noche: CoDi activo en tu app bancaria [SB33], un pago de $0.01 de punta a punta y video de la pantalla.
2. Demo: QR de $1 con `expiration: 600`, en grande; pagas desde tu celular; la UI pasa a "Pagado" por polling o webhook.
3. Con la cuenta de prueba ese dinero no regresa [SB07]; di en el pitch que en producción cae directo en la CLABE del comercio [SB38].
4. Prefiere QR: la push depende de que el celular del pagador esté ligado a CoDi [SB28][SB30] (⚪ no verificado en detalle).
5. UI: logos pey + CoDi de "Recursos de marca" [SB25].

**Plan B escalonado:**
- **B1, no llega el webhook:** polling a `GET /transaction/codi/qr/{id}` cada 2 a 5 s mientras el QR siga vigente (límite de peticiones: ⚪ no verificado) [SB10][SB15].
- **B2, Pey da 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`) o falla la red:** QR de respaldo creado esta noche con `expiration: 0` (no vence) y el video [SB10]; no subas ese QR al repo.
- **B3, todo falla:** modo SIMULACIÓN con la etiqueta visible que exige AGENTS.md, nunca presentado como pago real. El script firmado de K03.7 prueba tu webhook sin pagar.

**Recomendación:** mañana temprano pregunta a los mentores de Pey si hay llaves o entorno especial para el hackatón (⚪ no verificado).

## K03.7 · Ejemplos mínimos en Node.js 20+ (probados)

> Revisión 2026-11-07: los ejemplos históricos no son un checkout completo. Antes de producción, asociar el QR a un pedido del servidor y validar monto, moneda y destinatario; no basta encontrar cualquier PAID. La corrección de 404 a no_verificable es documental y no se ha ejecutado como aplicación. Ver [plan de integración](../docs/REVISION-PEY-2026-11-07.md).

Node 20+ ya trae `fetch`. Vercel crea una función por archivo dentro de `api/`; exportas `GET` o `POST`, que reciben un `Request` web. Para módulos ES usa `.mjs` o `"type": "module"` en el `package.json` más cercano [SB41]. No encontré un SDK oficial de Pey (⚪ no verificado). Pey sugiere los SDK de Standard Webhooks [SB16]; aquí se usa `node:crypto` para no depender de nada [SB40].

Las rutas siguen la estructura del repo (`app/` es la raíz en Vercel). Si el proyecto ya tiene helpers de respuesta y configuración, úsalos en lugar de los de aquí. La UI no necesita base de datos: hace polling a `/api/estado?id=…`, que consulta a Pey. El webhook sirve para bitácora o automatizaciones.

Evidencia: estos archivos pasaron 9 pruebas con `fetch` simulado en Node 22.23 (las 2 del extracto de abajo incluidas), con el vector de ejemplo de Svix para la firma y una llamada HTTP real del script de simulación al handler. En esa versión, `node --test app/tests/` (carpeta) falló con `MODULE_NOT_FOUND`; funcionaron `node --test "app/tests/*.test.js"` y `node --test` dentro de `app/` (lo que corre `npm test --prefix app`).

```js
// app/api/_lib/pey.js: cliente mínimo de la API CoDi de Pey (Node.js 20+, ESM, sin dependencias).
// Necesita "type": "module" en app/package.json (o archivos .mjs). Campos según openapi.json 2026-10-20 (K03.4).
const BASE = "https://api.pey.mx"; // único entorno documentado (producción) (K03.3)
const MAX_MONTO = Number(process.env.MAX_MONTO_MXN ?? 500); // tope del producto (AGENTS.md), no es límite de Pey

export class PeyError extends Error {
  constructor(status, cuerpo) {
    super(cuerpo?.error?.message ?? `Pey respondió HTTP ${status}`);
    this.status = status;
    this.tipo = cuerpo?.error?.type;           // p. ej. INVALID_AMOUNT, INVALID_STATE, SERVICE_UNAVAILABLE
    this.requestId = cuerpo?.error?.requestId; // guárdalo para pedir soporte a Pey
  }
}

async function pey(ruta, { method = "GET", body } = {}) {
  if (!process.env.PEY_API_KEY) throw new Error("Falta la variable PEY_API_KEY");
  const res = await fetch(`${BASE}${ruta}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.PEY_API_KEY}`,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20_000), // generateImage puede hacer lenta la respuesta
  });
  const texto = await res.text();
  let datos = null;
  try { datos = texto ? JSON.parse(texto) : null; } catch { datos = { crudo: texto }; }
  if (!res.ok) throw new PeyError(res.status, datos);
  return datos;
}

/** Crea un QR CoDi. Monto en PESOS (número con decimales), no en centavos.
 *  Devuelve { id (IDC de Banxico), qrString, qrImage (base64 PNG o null) }. */
export async function crearCobroQR({ monto, concepto, referencia = "0", vigenciaSeg = 600, metadata = {} }) {
  if (!(Number.isFinite(monto) && monto > 0 && monto <= MAX_MONTO)) throw new Error(`El monto debe ser mayor que 0 y hasta ${MAX_MONTO} pesos`);
  if (!/^[0-9]{1,7}$/.test(referencia)) throw new Error("La referencia debe tener de 1 a 7 dígitos");
  if (!(vigenciaSeg === 0 || vigenciaSeg >= 360)) throw new Error("La vigencia debe ser 0 (no vence) o de al menos 360 s");
  return pey("/codi/qr", {
    method: "POST",
    body: {
      amount: Math.round(monto * 100) / 100,
      concept: String(concepto).slice(0, 40), // ⚪ Pey no documenta largo máximo; 40 es decisión propia
      expiration: vigenciaSeg,
      numRef: referencia,
      generateImage: true, // pide la imagen PNG en base64 (qrImage)
      metadata,            // regresa como metadata.externalMetadata, con valores convertidos a texto
    },
  });
}

/** Pagos de un QR (20 por página). Un QR no es una transacción: se consulta con su IDC. */
export function consultarCobrosDeQR(idc, nextToken) {
  const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
  return pey(`/transaction/codi/qr/${encodeURIComponent(idc)}${qs}`);
}

/** Detalle de una transacción (ULID), p. ej. el transactionId de una notificación push. */
export const consultarTransaccion = (id) => pey(`/transaction/${encodeURIComponent(id)}`);

/** Todas las transacciones de tu llave: 80 por página, de la más reciente a la más antigua. */
export function listarTransacciones(nextToken) {
  const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
  return pey(`/transaction/api-key${qs}`);
}

/** Convierte cualquier error en una respuesta en español, sin detalles internos ni secretos. */
export function respuestaDeError(e) {
  if (e instanceof PeyError) {
    console.error("Pey", e.status, e.tipo, e.requestId); // nunca registres la llave ni cuerpos completos
    // ⚪ Pey no documenta el código exacto de llave inválida; INVALID_STATE aparece como "CoDi no habilitado".
    const noHabilitada = e.status === 401 || e.status === 403 || e.tipo === "INVALID_STATE";
    const mensaje = noHabilitada
      ? "Tu cuenta de Pey todavía no está habilitada para cobrar."
      : "Pey no pudo procesar la solicitud. Intenta de nuevo.";
    return Response.json({ error: mensaje }, { status: e.status >= 500 ? 502 : 400 });
  }
  return Response.json({ error: e.message }, { status: 400 });
}
```

```js
// app/api/cobros.js: POST {monto, concepto} -> 201 con el QR. Vercel Function (Node.js, firma Web estándar).
import { crearCobroQR, respuestaDeError } from "./_lib/pey.js";

const VIGENCIA_SEG = 600; // 10 minutos

export async function POST(request) {
  try {
    const { monto, concepto } = await request.json();
    const qr = await crearCobroQR({ monto: Number(monto), concepto: concepto ?? "Cobro", vigenciaSeg: VIGENCIA_SEG });
    const ahora = Date.now();
    return Response.json({
      id: qr.id, // IDC de Banxico: con él se consulta el estado
      qrImage: qr.qrImage ? `data:image/png;base64,${qr.qrImage}` : null, // puede venir null
      qrString: qr.qrString, // respaldo: conviértelo en QR si no hubo imagen
      creadoEn: new Date(ahora).toISOString(),
      expiraEn: new Date(ahora + VIGENCIA_SEG * 1000).toISOString(), // Pey no regresa el vencimiento: se calcula
    }, { status: 201 });
  } catch (e) {
    return respuestaDeError(e);
  }
}
```

```js
// app/api/estado.js: GET ?id=<IDC> -> {id, estado: "pendiente" | "pagado"}. Pey es la fuente de verdad (sin BD).
import { consultarCobrosDeQR, PeyError, respuestaDeError } from "./_lib/pey.js";

export async function GET(request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Falta el id del cobro" }, { status: 400 });
  try {
    const { items = [] } = await consultarCobrosDeQR(id);
    const pago = items.find((t) => t.status === "PAID"); // estados de Pey: PENDING | PAID
    return Response.json({ id, estado: pago ? "pagado" : "pendiente", transactionId: pago?.id ?? null });
  } catch (e) {
    // 404 no demuestra falta de pago: mostrar no_verificable y revisar QR/llave [SB15].
    if (e instanceof PeyError && e.status === 404) {
      return Response.json({ id, estado: "no_verificable", transactionId: null, aviso: "qr_no_encontrado_con_esta_llave" });
    }
    return respuestaDeError(e);
  }
}
// "expirado" lo decide el navegador comparando la hora actual con expiraEn: Pey no tiene ese estado.
```

```js
// app/api/webhook-pey.js: eventos de Pey firmados con Standard Webhooks (HMAC-SHA256).
import crypto from "node:crypto";

const TOLERANCIA_SEG = 300; // decisión propia: la especificación no fija un valor

export function verificarFirma({ secreto, id, timestamp, firmas, cuerpo }) {
  if (!secreto || !id || !timestamp || !firmas) return false;
  const ts = Number(timestamp);
  if (!Number.isInteger(ts) || Math.abs(Date.now() / 1000 - ts) > TOLERANCIA_SEG) return false;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64"); // secreto sin prefijo, decodificado
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${timestamp}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    if (version !== "v1" || !b64) return false;
    const recibida = Buffer.from(b64, "base64");
    return recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}

export async function POST(request) {
  const cuerpo = await request.text(); // cuerpo CRUDO: no lo parsees ni lo reformatees antes de verificar
  if (!cuerpo) return new Response("cuerpo vacío", { status: 400 });
  const ok = verificarFirma({
    secreto: process.env.PEY_WEBHOOK_SECRET,
    id: request.headers.get("webhook-id"),
    timestamp: request.headers.get("webhook-timestamp"), // ⚪ viene del estándar; Pey no lo muestra explícitamente
    firmas: request.headers.get("webhook-signature"),
    cuerpo,
  });
  if (!ok) return new Response("firma inválida", { status: 401 });

  let evento;
  try { evento = JSON.parse(cuerpo); } catch { return new Response("JSON inválido", { status: 400 }); }
  // Payload plano con "type". Registra solo identificadores, nunca el cuerpo completo ni datos personales.
  console.log("webhook", request.headers.get("webhook-id"), evento.type, evento.codiQrId ?? evento.transactionId ?? "");
  // Idempotente: aquí no se guarda nada (el estado se consulta en Pey); si algún día guardas, deduplica por webhook-id.
  return new Response("ok", { status: 200 }); // responde rápido: cualquier 2xx cuenta como entregado
}
```

```js
// scripts/simular-webhook.mjs: prueba TU endpoint con un evento falso firmado con TU secreto (solo desarrollo).
// Uso: PEY_WEBHOOK_SECRET=whsec_... node scripts/simular-webhook.mjs https://<tu-app>/api/webhook-pey <IDC>
import crypto from "node:crypto";

const [url, idc = "SIMULADO"] = process.argv.slice(2);
const secreto = process.env.PEY_WEBHOOK_SECRET;
if (!url || !secreto) throw new Error("Falta la URL o PEY_WEBHOOK_SECRET");

const ahora = Math.floor(Date.now() / 1000);
const cuerpo = JSON.stringify({
  type: "codi.qr.payment_received",
  amount: 1,
  codiQrId: idc,
  concept: "(SIMULACIÓN) demo",
  numRef: "1",
  datePaid: ahora,
  transactionId: `SIM${ahora}`,
  apiKeyId: "SIMULADO",
  metadata: { externalMetadata: { simulacion: "true" } },
});
const id = `msg_sim_${ahora}`;
const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
const firma = crypto.createHmac("sha256", llave).update(`${id}.${ahora}.${cuerpo}`).digest("base64");

const res = await fetch(url, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "webhook-id": id,
    "webhook-timestamp": String(ahora),
    "webhook-signature": `v1,${firma}`,
  },
  body: cuerpo,
});
console.log(res.status, await res.text());
```

```js
// app/tests/pey.test.js (extracto): fetch simulado + firma de webhooks. Corre con: npm test --prefix app
import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

process.env.PEY_API_KEY = "llave_de_prueba";
process.env.PEY_WEBHOOK_SECRET = `whsec_${crypto.randomBytes(32).toString("base64")}`;
const respuestas = [];
globalThis.fetch = async () => { const r = respuestas.shift(); return new Response(JSON.stringify(r.body), { status: r.status }); };

const estado = await import("../api/estado.js");
const webhook = await import("../api/webhook-pey.js");

function firmar(cuerpo, secreto = process.env.PEY_WEBHOOK_SECRET, ts = Math.floor(Date.now() / 1000)) {
  const id = `msg_${crypto.randomUUID()}`;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const firma = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest("base64");
  return { "webhook-id": id, "webhook-timestamp": String(ts), "webhook-signature": `v1,${firma}` };
}

test("estado: PAID → pagado; lista vacía → pendiente", async () => {
  respuestas.push({ status: 200, body: { items: [{ id: "01T", status: "PAID", amount: 1 }], nextToken: null } });
  assert.equal((await (await estado.GET(new Request("http://x/api/estado?id=a1b2c3d4e5"))).json()).estado, "pagado");
  respuestas.push({ status: 200, body: { items: [], nextToken: null } });
  assert.equal((await (await estado.GET(new Request("http://x/api/estado?id=a1b2c3d4e5"))).json()).estado, "pendiente");
});

test("webhook: válido 200, repetido 200, firma ajena 401, sin firma 401, vacío 400", async () => {
  const cuerpo = JSON.stringify({ type: "codi.qr.payment_received", codiQrId: "a1b2c3d4e5", amount: 1, transactionId: "01T" });
  const h = firmar(cuerpo);
  const enviar = (headers, body = cuerpo) => webhook.POST(new Request("http://x/api/webhook-pey", { method: "POST", headers, body }));
  assert.equal((await enviar(h)).status, 200);
  assert.equal((await enviar(h)).status, 200);
  assert.equal((await enviar(firmar(cuerpo, `whsec_${crypto.randomBytes(32).toString("base64")}`))).status, 401);
  assert.equal((await enviar({})).status, 401);
  assert.equal((await enviar(h, "")).status, 400);
});
```

## K03.8 · Errores comunes y límites

**Formato de error:** `{ "error": { "message", "type", "requestId" } }` [SB10]. Tipos:
- **400:** `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER` (o `INVALID_PARAMETERS` en transacciones), `INVALID_AMOUNT`, `INVALID_STATE` (p. ej. CoDi no habilitado), `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST`, `INVALID_CLABE`.
- **404:** `NOT_FOUND`, `BANK_ACCOUNT_NOT_FOUND`. **409** (links): `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE`. **500:** `INTERNAL_SERVER_ERROR`. **503:** `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`.
- Llave ausente o inválida: código ⚪ no verificado (un ejemplo da 400 "apiKeyId not included in request"; los links listan 403). **Recomendación:** trata 401, 403 e `INVALID_STATE` como "Tu cuenta de Pey todavía no está habilitada para cobrar."

**Límites documentados** [SB10][SB08]: QR `amount` >= 0 sin máximo publicado; push `amount` > 0 y <= 1,000,000; `phoneNumber` de 10 dígitos; `expiration` 0 o >= 360 s (push: >= 360, default 360); `numRef` de 1 a 7 dígitos; `metadata` hasta 50 claves (40/500 caracteres); páginas de 80, o 20 en QR; un webhook por llave; `bankAccountId` solo `ACTIVE`.

**No documentado (⚪ no verificado):** límite de peticiones, idempotencia, largo de `concept`, máximo por banco, qué ve el cliente con un QR vencido y reintentos de webhooks.

**Recomendaciones:**
- QR vencido: cuenta regresiva y QR nuevo.
- No reintentes a ciegas `POST /codi/qr` ni `/codi/pn` tras un timeout (la push llegaría dos veces); revisa antes `GET /transaction/api-key`. Deduplica webhooks por `webhook-id` [SB16] y pagos por `transactionId`.
- Ante 503, reintenta solo los GET, con espera creciente.
- Errores típicos: parsear antes de verificar la firma, webhook con URL de preview, puerto privado en Codespaces, `numRef` con letras, `expiration` de 60, montos en centavos.

## K03.9 · La API como herramienta de un agente de IA

En la Responses API cada herramienta lleva `type: "function"`, `name`, `description`, `parameters` (JSON Schema) y `strict` [SB45]. El modelo responde con items `function_call` (`call_id`, `name` y `arguments` como texto JSON) y tú devuelves un `function_call_output` con el mismo `call_id` [SB45]. Los ejemplos con `strict: true` listan todo en `required`, usan `additionalProperties: false` y modelan lo opcional con `["string", "null"]` [SB46]. Qué palabras clave se respetan en modo estricto: ⚪ no verificado; valida otra vez en el servidor. `crear_cobro` usa los mismos campos que K04.15 (`monto`, `concepto`); el flujo completo con OpenAI está en K04.6. La herramienta solo propone: el servidor crea el QR hasta que la persona confirma.

**Reglas de seguridad (Recomendación):**
1. **Confirmación humana:** `crear_cobro` no cobra; devuelve una propuesta. Solo el botón "Confirmar" de la UI llama `POST /api/cobros`, fuera del control del modelo.
2. **Tope en el servidor:** `MAX_MONTO_MXN`, diga lo que diga el modelo.
3. **Llaves fuera del navegador:** todas las llamadas a Pey salen del servidor; nunca uses prefijos públicos como `NEXT_PUBLIC_` o `VITE_` para `PEY_API_KEY`.
4. **Texto no confiable:** el concepto, la metadata y los mensajes de clientes son datos, no instrucciones; nunca deben disparar herramientas.
5. **Verdad de pago:** el agente solo dice "pagado" si `consultar_cobro` lo confirma o llegó un webhook con firma válida.
6. **Bitácora:** registra cada llamada con `requestId`, sin datos personales, y limita llamadas por sesión.

```json
[
  {
    "type": "function",
    "name": "crear_cobro",
    "description": "Prepara un cobro CoDi con QR en pesos mexicanos. NO cobra: devuelve una propuesta que la persona debe confirmar en pantalla.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "monto": { "type": "number", "description": "Monto en pesos MXN, mayor que 0 y menor o igual al máximo configurado." },
        "concepto": { "type": "string", "description": "Concepto corto que verá quien paga, p. ej. '2 tacos al pastor'." }
      },
      "required": ["monto", "concepto"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "consultar_cobro",
    "description": "Dice si un cobro con QR ya fue pagado. Usa el id que regresó la creación del cobro.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "id": { "type": "string", "description": "Identificador del QR asignado por Banxico (campo id del cobro)." }
      },
      "required": ["id"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "resumen_de_ventas",
    "description": "Resume los pagos recibidos (estado PAID) en un rango de fechas: total, número de pagos y ticket promedio.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "desde": { "type": "string", "description": "Fecha inicial YYYY-MM-DD, hora de Ciudad de México." },
        "hasta": { "type": "string", "description": "Fecha final YYYY-MM-DD, inclusive." },
        "metodo": { "type": ["string", "null"], "enum": ["CODI", "CARD", null], "description": "Filtra por método de pago; null = todos." }
      },
      "required": ["desde", "hasta", "metodo"],
      "additionalProperties": false
    }
  }
]
```

```js
// Fragmento para app/api/_lib/agente.js: ejecutor de herramientas (servidor; el modelo nunca ve PEY_API_KEY).
import { consultarCobrosDeQR, listarTransacciones, PeyError } from "./pey.js";

export async function resumenDeVentas({ desde, hasta, metodo = null }) {
  // CDMX usa UTC-6 todo el año desde 2022 (sin horario de verano).
  const ini = Date.parse(`${desde}T00:00:00-06:00`) / 1000;
  const fin = Date.parse(`${hasta}T23:59:59-06:00`) / 1000;
  if (!Number.isFinite(ini) || !Number.isFinite(fin) || ini > fin) throw new Error("Rango de fechas inválido");
  let total = 0, pagos = 0, nextToken = null, paginas = 0;
  do {
    const r = await listarTransacciones(nextToken ?? undefined);
    const items = r.items ?? [];
    for (const t of items) {
      const f = t.datePaid ?? t.dateCreated;
      if (t.status !== "PAID" || f < ini || f > fin) continue;
      if (metodo && t.paymentMethod !== metodo) continue;
      total += t.amount;
      pagos += 1;
    }
    if (items.length && items.at(-1).dateCreated < ini) break; // vienen de la más reciente a la más antigua
    nextToken = r.nextToken;
  } while (nextToken && ++paginas < 20); // tope de seguridad: 20 páginas
  const r2 = (n) => Math.round(n * 100) / 100;
  return { desde, hasta, metodo, pagos, total_mxn: r2(total), ticket_promedio_mxn: pagos ? r2(total / pagos) : 0 };
}

export async function ejecutarHerramienta(nombre, args) {
  switch (nombre) {
    case "crear_cobro":
      // NO cobra. La UI muestra la propuesta con un botón "Confirmar"; solo ese botón llama POST /api/cobros,
      // y el servidor vuelve a validar el monto contra MAX_MONTO_MXN.
      return { estado: "requiere_confirmacion_humana", propuesta: { monto: args.monto, concepto: args.concepto } };
    case "consultar_cobro":
      try {
        const { items = [] } = await consultarCobrosDeQR(args.id);
        const pago = items.find((t) => t.status === "PAID");
        return pago ? { estado: "pagado", monto: pago.amount, transactionId: pago.id } : { estado: "pendiente" };
      } catch (e) {
        if (e instanceof PeyError && e.status === 404) return { estado: "no_verificable", aviso: "qr_no_encontrado_con_esta_llave" };
        throw e;
      }
    case "resumen_de_ventas":
      return resumenDeVentas(args);
    default:
      return { error: `Herramienta desconocida: ${nombre}` };
  }
}
// Devuelve cada resultado al modelo como {type: "function_call_output", call_id, output: JSON.stringify(resultado)}.
```

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SB01 | pey®: API CoDi® (página de producto) | https://pey.mx/api-codi | 2026-11-06 |
| SB02 | pey®: página de inicio | https://pey.mx/ | 2026-11-06 |
| SB03 | pey®: CoDi® | https://pey.mx/codi | 2026-11-06 |
| SB04 | pey®: Personas y PyMEs (app) | https://pey.mx/personas-pymes | 2026-11-06 |
| SB05 | pey®: Accede a pey® (app y portal de negocios) | https://pey.mx/acceso | 2026-11-06 |
| SB06 | Documentación de pey: inicio | https://docs.pey.mx | 2026-11-06 |
| SB07 | Documentación de pey: Crear una API key | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/ | 2026-11-06 |
| SB08 | Documentación de pey: Configurar webhooks | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/ | 2026-11-06 |
| SB09 | Documentación de pey: CoDi API, introducción | https://docs.pey.mx/docs/api/codi-api | 2026-11-06 |
| SB10 | CoDi API: especificación OpenAPI (versión 2026-10-20) | https://docs.pey.mx/openapi.json | 2026-11-06 |
| SB11 | Documentación de pey: Create QR | https://docs.pey.mx/docs/api/create-qr | 2026-11-06 |
| SB12 | Documentación de pey: Create Push Notification | https://docs.pey.mx/docs/api/create-push-notification | 2026-11-06 |
| SB13 | Documentación de pey: Register Bank Account | https://docs.pey.mx/docs/api/register-bank-account | 2026-11-06 |
| SB14 | Documentación de pey: Get Transaction | https://docs.pey.mx/docs/api/get-transaction | 2026-11-06 |
| SB15 | Documentación de pey: Get CoDi QR Transactions | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 2026-11-06 |
| SB16 | Documentación de pey: Webhooks, introducción | https://docs.pey.mx/docs/webhooks/introduction | 2026-11-06 |
| SB17 | Documentación de pey: webhook CoDi QR, pago recibido | https://docs.pey.mx/docs/webhooks/codi/qr | 2026-11-06 |
| SB18 | Documentación de pey: webhook CoDi notificación push, pago recibido | https://docs.pey.mx/docs/webhooks/codi/pn | 2026-11-06 |
| SB19 | Documentación de pey: webhook cuenta bancaria actualizada | https://docs.pey.mx/docs/webhooks/bank-account/updated | 2026-11-06 |
| SB20 | Documentación de pey: webhook actualización de estado del link de pago | https://docs.pey.mx/docs/webhooks/payment-link/status-update | 2026-11-06 |
| SB21 | Documentación de pey: tipo Respuesta de metadata | https://docs.pey.mx/docs/types/metadata-response | 2026-11-06 |
| SB22 | Documentación de pey: tipo Desglose del monto | https://docs.pey.mx/docs/types/amount-breakdown | 2026-11-06 |
| SB23 | Documentación de pey: tutorial Mostrar un QR CoDi | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 2026-11-06 |
| SB24 | Documentación de pey: registro de cambios, Cuentas bancarias | https://docs.pey.mx/docs/changelog/bank-accounts | 2026-11-06 |
| SB25 | Documentación de pey: Recursos de marca | https://docs.pey.mx/brand-assets | 2026-11-06 |
| SB26 | Banco de México: CoDi, Cobro Digital | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html | 2026-11-06 |
| SB27 | Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (actualizada 2 may 2023) | https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf | 2026-11-06 |
| SB28 | CoDi (codi.org.mx): Preguntas frecuentes | https://www.codi.org.mx/secundarias/preguntas_frecuentes.html | 2026-11-06 |
| SB29 | CoDi (codi.org.mx): ¿Qué es CoDi®? | https://www.codi.org.mx/secundarias/que_es_codi.html | 2026-11-06 |
| SB30 | CoDi (codi.org.mx): CoDi® para cobrar | https://www.codi.org.mx/secundarias/cobrar.html | 2026-11-06 |
| SB31 | CoDi (codi.org.mx): CoDi® para pagar | https://www.codi.org.mx/secundarias/pagar.html | 2026-11-06 |
| SB32 | Xataka México: CoDi, la guía definitiva (2019) | https://www.xataka.com.mx/aplicaciones/codi-guia-definitiva-como-pagar-como-vender-que-no-solo-codigos-qr-que-bancos-participan-mexico | 2026-11-06 |
| SB33 | Expansión: cómo pagar con CoDi en BBVA, Santander y otros bancos (2026) | https://expansion.mx/finanzas-personales/2026/07/27/como-pagar-codi-bba-santander-bancos | 2026-11-06 |
| SB34 | Expansión: cobrar sin comisiones con CoDi (abril 2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SB35 | Publimetro: CoDi y DiMo mueven tu dinero desde tu celular (junio 2026) | https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/ | 2026-11-06 |
| SB36 | Bloomberg Línea: Banxico emite medidas para simplificar pagos digitales (junio 2026) | https://www.bloomberglinea.com/latinoamerica/mexico/banxico-emite-medidas-para-simplificar-pagos-digitales-y-ampliar-limite-en-cuentas-sin-registro-ante-el-sat/ | 2026-11-06 |
| SB37 | Merca2.0: Pey, AI Builders México y SpaceXAI realizarán hackatón de pagos digitales (noviembre 2026) | https://www.merca20.com/pey-ai-builders-mexico-y-spacexai-realizaran-hackaton-de-pagos-digitales-en-mexico/ | 2026-11-06 |
| SB38 | InformaBTL: el 14 de diciembre cambiarán las transferencias; Pey apuesta por pagos QR sin comisiones (noviembre 2026) | https://www.informabtl.com/pagos-qr-mexico-14-diciembre-2026-pey-codi/ | 2026-11-06 |
| SB39 | Standard Webhooks: especificación | https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md | 2026-11-06 |
| SB40 | Svix: Verifying Webhooks Manually | https://docs.svix.com/receiving/verifying-payloads/how-manual | 2026-11-06 |
| SB41 | Vercel: Using the Node.js Runtime with Vercel Functions | https://vercel.com/docs/functions/runtimes/node-js | 2026-11-06 |
| SB42 | Vercel KB: How do I get the raw body of a Serverless Function? | https://vercel.com/kb/guide/how-do-i-get-the-raw-body-of-a-serverless-function | 2026-11-06 |
| SB43 | Vercel: Deployment Protection | https://vercel.com/docs/deployment-protection | 2026-11-06 |
| SB44 | GitHub Docs: Forwarding ports in your codespace | https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace | 2026-11-06 |
| SB45 | OpenAI: Function calling | https://developers.openai.com/api/docs/guides/function-calling | 2026-11-06 |
| SB46 | OpenAI: Structured model outputs | https://developers.openai.com/api/docs/guides/structured-outputs | 2026-11-06 |

<!-- ===== FIN: conocimiento/03-codi-y-api-pey.md ===== -->

<!-- ===== INICIO: conocimiento/04-openai-api-nov-2026.md ===== -->

---
id: K04
titulo: "API de OpenAI vigente (6 nov 2026): DevDay 2026, modelos, Responses, Realtime, Agents, plugins y costos"
resumen: "Qué anunció el DevDay 2026, qué modelos y precios usar hoy y ejemplos mínimos (Node.js y Python) de salida estructurada, function calling y voz Realtime; léelo antes de escribir cualquier código contra la API de OpenAI."
responde:
  - "¿Qué se anunció en el DevDay 2026 y qué conviene presumir ante los jueces?"
  - "¿Qué modelo uso para texto, voz en español, visión e imágenes, y cuánto cuesta?"
  - "¿Cómo hago llamada básica, streaming, salidas estructuradas y function calling con la Responses API?"
  - "¿Cómo conecto voz en tiempo real desde el navegador con una llave efímera creada en el servidor?"
  - "¿Siguen vigentes Agents SDK, Agents API, AgentKit, Agent Builder y ChatKit?"
  - "¿Qué necesito para probar mi propia app (plugin MCP) dentro de ChatGPT con Plus y cuánto trabajo es?"
  - "¿Cómo funciona el prompt caching de 12 horas y cuánto cuesta?"
  - "¿Cómo creo la API key, cargo saldo y qué límites tiene una cuenta nueva?"
  - "¿Qué funciones dan efecto wow en 4 horas?"
actualizado: 2026-11-06
confianza: media
fuentes: [SC01, SC02, SC03, SC04, SC05, SC06, SC07, SC08, SC09, SC10, SC11, SC12, SC13, SC14, SC15, SC16, SC17, SC18, SC19, SC20, SC21, SC22, SC23, SC24, SC25, SC26, SC27, SC28, SC29, SC30, SC31, SC32, SC44, SC48, SC57, SC59, SC64]
---

# K04 · API de OpenAI vigente (noviembre 2026)

## TL;DR

- El DevDay 2026 fue el 29 sep 2026 en San Francisco: GPT-6.1 Sol, Agents API con *computer use*, velocidad Ultrafast, Decisions API, extensiones de plugins y Codex Cloud que sigue trabajando con la laptop cerrada [SC01, SC02, SC03].
- Texto: `gpt-6.1-sol` (US$2 / US$10 por 1M tokens) como default de hackatón; `gpt-6-astra` (US$10 / US$50) para máxima calidad; `gpt-6-luna` (US$0.10 / US$0.50) para clasificar barato [SC06, SC07].
- Voz: `gpt-realtime-2.1` por WebRTC con llave efímera de `POST /v1/realtime/client_secrets`. Imagen: `gpt-image-2.6-flare` / `-sunburst`, lanzados el 4 nov [SC10, SC30].
- Con GPT-6 Astra y GPT-6.1 Sol las herramientas sólo funcionan en la Responses API (la fuente no lo dice de Terra ni de Luna); salidas estructuradas con `text.format` o `responses.parse` [SC13, SC12].
- La API se paga aparte de ChatGPT Plus: compra al menos US$5 de crédito para entrar al tier Build (Sol: 5,000 RPM y 1M TPM) [SC26, SC44].
- No uses Agent Builder (se apaga el 30 nov 2026), Assistants API (ya apagada) ni `gpt-image-1` (ya apagado) [SC20, SC21].

## K04.1 · DevDay 2026: fecha y lanzamientos

- **Cuándo y dónde:** 29 sep 2026, San Francisco; keynote en vivo [SC03]. El DevDay Exchange de CDMX es el 10 nov a las 14:00 [SC04].
- **Modelos y API** [SC01, SC02]:
  - **GPT-6.1 Sol** (`gpt-6.1-sol`): según OpenAI, cerca de GPT-6 Astra en código y uso de computadora, a una quinta parte del precio.
  - **Ultrafast:** velocidad pagada; OpenAI reporta hasta 8× más rápido en Codex y 6× en la API, a 6× el precio.
  - **Agents API:** beta pública desde el 10 sep; en DevDay sumó *computer use*, multiagente, Tool Search y Context Compaction.
  - **Decisions API:** defines una pregunta con respuestas fijas y te devuelve una; corre sobre GPT-6 Luna. Salió como preview limitada; la comunidad reporta beta pública desde el 22 oct [SC01].
  - OpenAI reporta 45% menos tiempo al primer token y más de 30% de mejora en velocidad de tool calls.
- **Codex** [SC01, SC02]: Codex Cloud (tareas que siguen con la laptop cerrada, lanzables desde el celular; entornos reutilizables; de Plus en adelante), CLI nueva (voz, vista `/agents`, worktrees), Code Review en la app de escritorio y Codex Security Cloud (de Pro en adelante).
- **Plugins** [SC01]: extensiones (barra lateral, paneles, visores), *MCP events* que disparan automatizaciones y "Sign in with ChatGPT".
- **ChatGPT** [SC01, SC02]: *Dots* (agentes persistentes con computadora propia en la nube), ChatGPT Space/Pages y plan Pro 500.
- **Después del DevDay:** GPT-Image-2.6 Flare y Sunburst (4 nov) [SC30].

## K04.2 · Modelos de texto y visión recomendados hoy

| Uso | Modelo (ID de API) | Entrada / entrada en caché / salida (US$ por 1M tokens) | Esfuerzo de razonamiento |
|---|---|---|---|
| Default de hackatón (texto, razonamiento, herramientas) | `gpt-6.1-sol` | 2.00 / 0.10 / 10.00 | `low`…`max`, default `medium`; sin `none` [SC08] |
| Máxima calidad | `gpt-6-astra` | 10.00 / 1.00 / 50.00 | `low`…`max` |
| Intermedio barato | `gpt-6.1-terra` | 1.00 / 0.05 / 5.00 | `none`…`max` |
| Clasificar / alto volumen | `gpt-6-luna` | 0.10 / 0.01 / 0.50 | `none`…`max` |

Precios y esfuerzos: [SC06, SC07]. La página de modelos sugiere `gpt-6-astra` "si no estás seguro" [SC06]. Los cuatro tienen ventana de 1.05M tokens y hasta 128K de salida [SC06]. En Sol, un prompt de más de 272K tokens se cobra a 2× la entrada y 1.5× la salida [SC08]. Batch/Flex cuesta la mitad; *Fast* (antes "Priority", renombrado el 30 jul 2026) cuesta el doble [SC07].

- **Herramientas:** con `gpt-6-astra` y `gpt-6.1-sol` el function calling requiere la Responses API [SC13].
- **Visión:** no hay modelo de visión aparte; los modelos recientes aceptan texto e imagen [SC06]. Forma del mensaje (⚪ no verificado hoy; es la forma conocida de la Responses API):

```js
input: [{ role: "user", content: [
  { type: "input_text", text: "Extrae comercio y total de este ticket." },
  { type: "input_image", image_url: "https://ejemplo.com/ticket.jpg" } // o "data:image/jpeg;base64,..."
]}]
```

**Recomendación:** usa `gpt-6.1-sol` con `reasoning: { effort: "low" }` en la demo (menos latencia) y sube a `medium` sólo donde la calidad se note; en Vercel pon `OPENAI_MODEL=gpt-6.1-sol` (nombre de `.env.example`) para cambiar de modelo sin tocar código. Para clasificar intenciones, `gpt-6-luna`.

## K04.3 · Voz, imagen y transcripción: nombres y precios

**Voz en tiempo real** (US$ por 1M tokens: entrada / caché / salida) [SC07]:
- `gpt-realtime-2.1`: audio 32.00 / 0.40 / 64.00; texto 4.00 / 0.40 / 24.00; imagen de entrada 5.00.
- `gpt-realtime-2.1-mini`: audio 10.00 / 0.30 / 20.00; texto 0.60 / 0.06 / 2.40.
- La 2.1 mejora a `gpt-realtime-2` en silencio y ruido; razonamiento ajustable y contexto de 256K. Voces: alloy, ash, ballad, coral, cedar, echo, marin, sage, shimmer, verse [SC31]. La familia 2 llama herramientas en plena conversación [SC32].
- `gpt-live-1`: full-duplex (escucha y habla a la vez); US$0.05/min por la capa de voz, más el modelo de backend; en la API desde el 10 sep 2026 [SC11, SC07].
- **Español:** ninguna fuente lista los idiomas de `gpt-realtime-2.1` (⚪ no verificado); OpenAI ampliará idiomas de GPT-Live en los próximos meses [SC11]. `gpt-realtime-translate`: más de 70 idiomas de entrada y 13 de salida [SC32].

**Imagen** [SC29, SC30, SC07]: `gpt-image-2.6-flare` (rápido; unos 6 s en calidad baja) y `gpt-image-2.6-sunburst` (más detalle y ediciones consistentes). Por tokens: imagen de entrada 8.00 (caché 2.00), imagen de salida 30.00, texto de entrada 5.00. Sólo en `/v1/images/generations` y `/v1/images/edits`; al 5 nov la herramienta de imagen de Responses no los soportaba [SC30]. Novedades: GIF animado y SVG.

**Transcripción** [SC07]: `gpt-transcribe` US$0.0045/min; `gpt-realtime-whisper` y `gpt-live-transcribe` US$0.017/min; `gpt-realtime-translate` US$0.034/min.

**Retiros** [SC21]: `gpt-image-1` (apagado el 23 oct); `gpt-image-1.5` y `gpt-image-1-mini` (1 dic 2026); `gpt-realtime` y `gpt-realtime-mini` (20 ene 2027).

```js
const img = await client.images.generate({
  model: "gpt-image-2.6-flare",
  prompt: "Ícono plano de una alcancía con papel picado, colores mexicanos",
  size: "1024x1024",
  quality: "low",
});
const base64 = img.data[0].b64_json; // imagen en base64
```

⚪ No verificado hoy el nombre del método del SDK; los parámetros y `data[0].b64_json` sí [SC29].

## K04.4 · Responses API: llamada básica y streaming

- Llamas `client.responses.create(...)` y el texto final está en `output_text` [SC14]; ese campo es un atajo de los SDK (⚪ no verificado hoy; con `fetch` crudo ver K04.15).
- `instructions` define el comportamiento; `input` acepta texto o una lista de mensajes [SC13].
- Para continuar una conversación, reenvía la lista completa (como los ejemplos oficiales de JS y Python) o pasa `previous_response_id` (como los de Go, Java y Ruby) [SC13].
- Streaming: `stream: true` y recorres eventos. Los clave: `response.created`, `response.output_text.delta` (campo `delta`), `response.completed` y `error` [SC14].
- En GPT-6.x, si usas caché, no cambies `reasoning.effort` a mitad de conversación; se agrega un item `configuration_update` [SC09].

```js
// Node.js — npm install openai ; exporta OPENAI_API_KEY
import OpenAI from "openai";
const client = new OpenAI();

const r = await client.responses.create({
  model: "gpt-6.1-sol",
  reasoning: { effort: "low" },
  instructions: "Responde en español de México, en máximo dos frases.",
  input: "¿Qué ventaja tiene cobrar con un enlace en lugar de efectivo?",
});
console.log(r.output_text);

const stream = await client.responses.create({
  model: "gpt-6.1-sol",
  input: "Propón 3 nombres para una app de cobros entre amigos.",
  stream: true,
});
for await (const event of stream) {
  if (event.type === "response.output_text.delta") process.stdout.write(event.delta);
  else if (event.type === "error") console.error(event.message);
}
```

```python
# Python — pip install openai ; exporta OPENAI_API_KEY
from openai import OpenAI
client = OpenAI()

r = client.responses.create(
    model="gpt-6.1-sol",
    reasoning={"effort": "low"},
    instructions="Responde en español de México, en máximo dos frases.",
    input="¿Qué ventaja tiene cobrar con un enlace en lugar de efectivo?",
)
print(r.output_text)

stream = client.responses.create(
    model="gpt-6.1-sol",
    input="Propón 3 nombres para una app de cobros entre amigos.",
    stream=True,
)
for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
    elif event.type == "error":
        print(event.message)
```

## K04.5 · Salidas estructuradas (JSON Schema)

- Se piden con `text.format` = `{ type: "json_schema", name, schema, strict: true }` [SC12].
- Atajos del SDK: en JS, `zodTextFormat(esquema, "nombre")` (de `openai/helpers/zod`) con `client.responses.parse`; en Python, `text_format=ModeloPydantic`. El objeto ya validado llega en `output_parsed` [SC12].
- Los ejemplos oficiales ponen `additionalProperties: false` y todas las propiedades en `required` [SC12].
- Una negativa no sigue el esquema: llega como item `refusal`. Revisa también `status: "incomplete"` por `max_output_tokens` [SC12].
- La doc usa `gpt-6-astra` en sus ejemplos y lo recomienda para proyectos nuevos [SC12]; con `gpt-6.1-sol` la llamada es la misma.

Forma cruda, útil desde cualquier lenguaje o `curl`:

```json
{
  "model": "gpt-6.1-sol",
  "input": "Cóbrale a Lupita 350 de los tacos",
  "text": {
    "format": {
      "type": "json_schema",
      "name": "cobro",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "monto": { "type": "number" },
          "concepto": { "type": "string" }
        },
        "required": ["monto", "concepto"],
        "additionalProperties": false
      }
    }
  }
}
```

Ejemplo completo en Node.js y Python: K04.14.

## K04.6 · Function calling (herramientas)

1. Defines herramientas "planas": `type: "function"`, `name`, `description`, `parameters` (JSON Schema) y `strict: true` [SC13].
2. El modelo responde con items `function_call` que traen `call_id`, `name` y `arguments` (string JSON) [SC13].
3. Tu código valida y ejecuta; luego agregas `{ type: "function_call_output", call_id, output }` con el mismo `call_id` [SC13].
4. Segunda llamada con todo el `input` y las mismas `tools`; lees `output_text` [SC13].

- Puede haber cero, una o varias llamadas en una respuesta: recórrelas todas [SC13].
- En modelos de razonamiento debes devolver los items de razonamiento junto con las salidas; `input_list += response.output` (Python) o `toResponseInputItems` (JS) lo resuelven [SC13].
- Si tienes muchas herramientas: `tool_search` con funciones `defer_loading: true` dentro de un `namespace` (desde `gpt-5.4`) [SC13].
- Para no romper la caché, no quites herramientas entre turnos; usa `tool_choice: "none"` o `allowed_tools` [SC09].

**Recomendación:** nunca ejecutes un cobro sólo porque el modelo lo pidió. Valida monto y concepto en el servidor y muestra una confirmación visible ("¿Cobrar $120 por 2 cafés?") antes de llamar al proveedor de pagos.

Ejemplo completo con `crear_cobro`: K04.15.

## K04.7 · Realtime API (voz): llave efímera + WebRTC

Flujo con llave efímera [SC10]:
1. El navegador pide `GET /api/realtime-token` a tu servidor.
2. El servidor llama `POST https://api.openai.com/v1/realtime/client_secrets` con tu API key y el cuerpo `{ session: { type: "realtime", model: "gpt-realtime-2.1", audio: { output: { voice: "marin" } } } }`. Regresa `data.value` con `Cache-Control: no-store`.
3. El navegador crea `RTCPeerConnection`, agrega el micrófono (`getUserMedia`), abre el canal de datos `oai-events` y genera la oferta (`createOffer`, `setLocalDescription`).
4. El navegador manda el SDP a `POST https://api.openai.com/v1/realtime/calls` con `Authorization: Bearer <llave efímera>` y `Content-Type: application/sdp`, y aplica la respuesta con `setRemoteDescription`.

- Mandar `OpenAI-Safety-Identifier` desde el servidor (valor estable y anónimo); queda ligado a la llave efímera [SC10].
- Alternativa "unificada": el navegador manda el SDP a tu servidor y éste lo reenvía como `multipart/form-data` (`sdp` + `session`) a `/v1/realtime/calls` [SC10].
- El encabezado beta `OpenAI-Beta: realtime=v1` dejó de funcionar el 12 may 2026: descarta tutoriales viejos [SC21].
- El Agents SDK de JS (`RealtimeAgent` + `RealtimeSession`) arma este WebRTC por ti con la misma llave efímera [SC18].

**Recomendación:** protege `/api/realtime-token` (sólo tu dominio, límite por IP) porque cada llave gasta tu saldo. Código en K04.16.

## K04.8 · GPT-Live-1 (opcional, voz full-duplex)

- **Qué es:** modelo de voz que escucha y habla al mismo tiempo, con detección de turnos nativa, y que delega razonamiento y herramientas a un modelo de texto de backend. OpenAI reporta +30 puntos en Full Duplex Bench frente a `gpt-realtime-2.1` [SC11].
- **Precio:** US$0.05 por minuto por la capa de voz; el modelo de backend y las herramientas se cobran aparte [SC11, SC07].
- **Flujo** [SC10]: el navegador crea canal de datos y oferta, espera a juntar candidatos ICE y manda `{ sdp }` a tu `/api/session`. Tu servidor llama `client.live.create({ session, transport: { type: "webrtc", sdp } })`, que equivale a `POST /v1/live/sessions`. En la sesión: `model: "gpt-live-1"` y `delegation: { type: "responses", responses: { model, tools, tool_choice } }` (el ejemplo oficial delega a `gpt-5.6-terra` con `web_search`). Responde 201 con `session.id` y `transport.sdp`.
- **Reglas del canal:** no envíes `session.start`; espera `session.started`; para cerrar manda `session.close` y espera `session.closed` [SC10].
- **Idiomas:** no se menciona español; OpenAI promete ampliar idiomas "en los próximos meses" [SC11] (⚪ no verificado en español).

**Recomendación:** úsalo sólo si `gpt-realtime-2.1` ya funciona y te sobra una hora; prueba primero que entienda y hable español de México.

## K04.9 · Agents SDK (JS y Python) y Agents API

- **Agents SDK JS:** `npm install @openai/agents zod`; requiere Node.js 22 o superior (AGENTS.md pide Node 20+: si lo usas, fija Node 22 en el proyecto de Vercel; ⚪ no verifiqué dónde se cambia). Texto con `Agent` + `run`; voz con `RealtimeAgent` + `RealtimeSession` (de `@openai/agents/realtime`), que conecta micrófono y audio por WebRTC; también tiene *Sandbox Agents* [SC18].
- **Agents SDK Python:** `pip install openai-agents`; `Agent` + `Runner.run_sync`; usa la Responses API por defecto, integra herramientas MCP remotas y hace voz con `gpt-realtime-2.1` [SC19]. Desde abril de 2026 trae harness y sandbox (`openai-agents>=0.14.0`) [SC17].
- **Agents API** (beta pública desde el 10 sep 2026): sirve para "build and run cloud agents with the Codex harness, fully managed by OpenAI" [SC15]. Sin cargo extra: pagas tokens, herramientas y contenedores [SC15]. Se llama con `client.beta.agents.sessions.create({ agent: { model, instructions }, environment: { type: "openai_hosted" }, input, stream: true })` (`POST /v1/agents/sessions`, encabezado `OpenAI-Beta: agents=v1` que los SDK ponen solos). Pide una llave de aplicación con permisos `api.agents.read`, `api.agents.write` y `api.responses.write` [SC16].

```js
// npm install @openai/agents zod
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const crearCobro = tool({ // ⚪ no verificado hoy: firma de tool()
  name: "crear_cobro",
  description: "Crea un cobro en MXN",
  parameters: z.object({ monto: z.number(), concepto: z.string() }),
  execute: async ({ monto, concepto }) => ({ id: "cobro_demo_001", monto, concepto }),
});

const agente = new Agent({
  name: "Cobri",
  model: "gpt-6.1-sol",
  instructions: "Ayudas a cobrar. Responde en español de México.",
  tools: [crearCobro],
});
const resultado = await run(agente, "Cóbrale 80 pesos a Ana por el pan");
console.log(resultado.finalOutput);
```

```python
# pip install openai-agents
from agents import Agent, Runner, function_tool

@function_tool  # ⚪ no verificado hoy: nombre del decorador
def crear_cobro(monto: float, concepto: str) -> dict:
    """Crea un cobro en MXN."""
    return {"id": "cobro_demo_001", "monto": monto, "concepto": concepto}

agente = Agent(name="Cobri", model="gpt-6.1-sol",
               instructions="Ayudas a cobrar. Responde en español de México.",
               tools=[crear_cobro])
print(Runner.run_sync(agente, "Cóbrale 80 pesos a Ana por el pan").final_output)
```

## K04.10 · AgentKit, Agent Builder y ChatKit: estado al 6 nov 2026

- **Agent Builder:** OpenAI lo está deprecando; los usuarios actuales lo pueden usar durante una transición y se apaga el 30 nov 2026 [SC20]. Reemplazo sugerido: Agents SDK o ChatGPT Workspace Agents [SC21].
- **ChatKit** (UI de chat embebible): sigue disponible [SC20, SC21]. La guía de Agent Builder sugiere pasar el workflow a ChatKit o copiar su código y usar el Agents SDK [SC20].
- El mismo 30 nov se apagan la plataforma de Evals y los *reusable prompts* [SC21].
- **Assistants API:** se apagó el 26 ago 2026; los reemplazos son Responses API y Conversations API [SC21].
- **AgentKit** fue el paquete anunciado en el DevDay 2025 (Agent Builder, Connector Registry, ChatKit y herramientas de evaluación) [SC64]; ninguna página actual consultada lo usa como marca vigente (⚪ no verificado).

**Recomendación:** mañana no construyas nada en Agent Builder ni en Assistants. Usa la Responses API directo (más control y menos piezas) y, si necesitas varios agentes o voz con herramientas, el Agents SDK. ChatKit sólo si hoy ya probaste que te ahorra la UI.

## K04.11 · Plugins (antes "Apps SDK"): tu app dentro de ChatGPT con Plus

- **Nombres:** desde el 9 jul 2026 el App Directory es el Plugin Directory; los conectores son "apps" dentro de plugins [SC57]. La doc actual dice "Plugins" y "MCP Apps" (estándar de UI); "Apps SDK" sobrevive en nombres de repos de ejemplo [SC24].
- **Qué necesitas:** un servidor MCP con endpoint HTTPS público (normalmente `/mcp`, streamable HTTP) o un Secure MCP Tunnel; herramientas con nombre, descripción, esquema y anotaciones [SC22].
- **Paquetes:** `npm install @modelcontextprotocol/sdk @modelcontextprotocol/ext-apps zod`. UI opcional: un recurso `ui://...` ligado a la herramienta con `_meta: { ui: { resourceUri } }`. Para exponer local: `ngrok http 8787` [SC24].
- **Probar antes:** `npx @modelcontextprotocol/inspector@latest` [SC22].
- **Conectar:** chatgpt.com/plugins → "+" → "Add custom MCP server" → nombre y URL con `/mcp` → autenticación ("No authentication" para demo) → "I understand and want to continue" → "Create as a plugin" → instalar → pestaña "Work", chat nuevo, `@` y elegir el plugin. Tras cambios: "Refresh" [SC22, SC23].
- **Plan y modo desarrollador:** la doc oficial no los menciona. Un tercero (1 oct) dice Plus, Pro, Business, Enterprise y Edu (no Free), con el interruptor "Developer mode" en Settings → Security and login, sólo en web [SC25]. Otro afirma "Developer mode is no longer needed." [SC59] (⚪ no verificado). Las herramientas que no son de sólo lectura piden confirmación [SC25].

**Recomendación (esfuerzo):** sólo herramientas ≈ 45–60 min; con UI ≈ 2–3 h. Vale la pena sólo si "cobrar desde ChatGPT" es el centro del pitch.

## K04.12 · Prompt caching (30 min y 12 h)

- **Aplica a GPT-5.6 en adelante (incluye GPT-6.x):** la caché es implícita por defecto y el prefijo cacheable debe tener al menos 1,024 tokens visibles [SC09].
- **Duración:** `prompt_cache_options.ttl` = `"30m"` (default) o `"12h"`; la de 12 h sólo existe en la Responses API. También puedes marcar bloques con `prompt_cache_breakpoint`, usar modo `"explicit"` o precalentar con `prewarm: true` [SC09].
- **Costo:** escribir en caché de 30 min cuesta 1.25× la entrada; en caché de 12 h, 2.5×; leer cuesta 0.1× (0.05× en Sol y Terra). Ese precio de escritura reemplaza al normal, no se suma [SC09]. En Sol: escritura 12 h US$5.00/1M y lectura US$0.10/1M [SC07].
- **Modelos anteriores:** usan `prompt_cache_retention` (`"in_memory"` o `"24h"`) y no cobran escritura [SC09].
- **Medir:** `usage.input_tokens_details.cached_tokens` y `usage.input_tokens_details.cache_write_tokens` [SC09].
- **Buenas prácticas:** lo estático primero (instrucciones, base de conocimiento, definición de tools) y lo variable al final; agrega mensajes, no reescribas el historial; no quites tools [SC09].

```js
const r = await client.responses.create({
  model: "gpt-6.1-sol",
  prompt_cache_options: { ttl: "12h" }, // "30m" es el default
  input: [
    { role: "developer", content: [{ type: "input_text", text: BASE_MARKDOWN }] }, // estable, >= 1,024 tokens
    { role: "user", content: [{ type: "input_text", text: pregunta }] },          // variable, al final
  ],
});
console.log(r.usage.input_tokens_details); // cached_tokens, cache_write_tokens
```

⚪ No verificado hoy: si tu versión del SDK de Python no acepta el parámetro, pásalo con `extra_body={"prompt_cache_options": {"ttl": "12h"}}`.

**Recomendación:** si metes 20K tokens de la base Markdown como prefijo y habrá huecos de más de 30 min (ensayo → pitch), usa `"12h"`: escribir cuesta ≈ US$0.10 una vez y cada lectura ≈ US$0.002, contra ≈ US$0.04 sin caché.

## K04.13 · Cuenta de API: llave, saldo y límites de una cuenta nueva

- **Plus no incluye la API:** el uso con API key es por consumo y se cobra a tarifas de la API, aparte de la suscripción [SC48, SC44].
- **Pasos (guía de terceros):** platform.openai.com → Settings → "API Keys" → "Create new secret key" (se muestra una sola vez). Saldo en platform.openai.com/settings/organization/billing/overview → "Add credit"; el mínimo típico es US$5 y puede aparecer un cargo temporal de autorización [SC28].
- **Tiers (desde el 6 oct 2026):** Free (tope US$100/mes), Build (US$5 comprados → tope US$500/mes), Launch (US$100 → US$5,000), Grow (US$500 → US$200,000). Suben solos al alcanzar el monto comprado [SC26, SC27].
- **Límites en Build:** Astra, Sol y Terra 5,000 RPM y 1M TPM; Luna 5,000 RPM y 2M TPM [SC26].
- **Free y GPT-6:** según un tercero, las páginas de GPT-6 marcan Free como "Not supported" [SC27] (⚪ no verificado en fuente oficial).
- **Ver límites:** Settings › Organization › Limits. Encabezados `x-ratelimit-*` y `Retry-After`; los SDK oficiales reintentan 429 y 503 solos [SC26].
- **Créditos en eventos hermanos:** en Charlotte (3 oct 2026), la página ofrecía US$50 en créditos de API y US$100 en créditos de Codex a cada asistente elegible que hiciera check-in [SC05]; para CDMX (⚪ no verificado).

**Recomendación:** hoy mismo carga US$10–20, crea una llave por proyecto, fija un tope de gasto y prueba una llamada a `gpt-6.1-sol` y una sesión de voz. El repo es público: la llave vive sólo en variables de Vercel (tipo Secret) y en secretos de Codespaces o de Codex, nunca en archivos.

## K04.14 · Ejemplo (a): salida estructurada (Node.js y Python)

Convierte lenguaje natural en un cobro validado. Basado en el patrón oficial [SC12].

```js
// Node.js — npm install openai zod
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

const Cobro = z.object({
  monto: z.number(),
  moneda: z.enum(["MXN", "USD"]),
  concepto: z.string(),
  pagador: z.string(),
});

const response = await client.responses.parse({
  model: "gpt-6.1-sol",
  reasoning: { effort: "low" },
  input: [
    { role: "system", content: "Extrae el cobro que pide el usuario. Moneda MXN salvo que diga otra. Si falta un dato, usa cadena vacía." },
    { role: "user", content: "Cóbrale a Lupita 350 de los tacos de ayer." },
  ],
  text: { format: zodTextFormat(Cobro, "cobro") },
});

console.log(response.output_parsed);
// Esperado: { monto: 350, moneda: "MXN", concepto: "tacos de ayer", pagador: "Lupita" }
```

```python
# Python — pip install openai pydantic
from typing import Literal
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()

class Cobro(BaseModel):
    monto: float
    moneda: Literal["MXN", "USD"]
    concepto: str
    pagador: str

response = client.responses.parse(
    model="gpt-6.1-sol",
    reasoning={"effort": "low"},
    input=[
        {"role": "system", "content": "Extrae el cobro que pide el usuario. Moneda MXN salvo que diga otra. Si falta un dato, usa cadena vacía."},
        {"role": "user", "content": "Cóbrale a Lupita 350 de los tacos de ayer."},
    ],
    text_format=Cobro,
)
print(response.output_parsed)
```

Revisa negativas e incompletos antes de usar el resultado (K04.5).

## K04.15 · Ejemplo (b): function calling con `crear_cobro` (Node.js y Python)

Sigue el flujo oficial de dos llamadas [SC13]. `crearCobro` es simulada y sólo *prepara* el cobro: según AGENTS.md (§3) el cobro real ocurre hasta que la persona confirma en la interfaz; por eso la herramienta `crear_cobro` solo propone. La llamada a Pey va en el servidor (K03) y el tope sale de `MAX_MONTO_MXN` (aquí fijo en 10000 sólo como ejemplo).

```js
// Node.js — npm install openai
import OpenAI from "openai";
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";

const client = new OpenAI();

const tools = [{
  type: "function",
  name: "crear_cobro",
  description: "Crea una solicitud de cobro en pesos mexicanos (MXN).",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      monto: { type: "number", description: "Monto en MXN, mayor que 0." },
      concepto: { type: "string", description: "Concepto corto que verá quien paga." },
    },
    required: ["monto", "concepto"],
    additionalProperties: false,
  },
}];

async function crearCobro({ monto, concepto }) {
  if (!(monto > 0 && monto <= 10000)) return { error: "Monto fuera de rango" };
  return { id: "cobro_demo_001", estado: "pendiente", monto, concepto }; // simulado
}

const input = [{ role: "user", content: "Cóbrale 120 pesos a Memo por dos cafés." }];

let response = await client.responses.create({
  model: "gpt-6.1-sol", reasoning: { effort: "low" }, tools, input,
});
input.push(...toResponseInputItems(response.output)); // conserva razonamiento y llamadas

for (const item of response.output) {
  if (item.type !== "function_call" || item.name !== "crear_cobro") continue;
  const resultado = await crearCobro(JSON.parse(item.arguments));
  input.push({ type: "function_call_output", call_id: item.call_id, output: JSON.stringify(resultado) });
}

response = await client.responses.create({
  model: "gpt-6.1-sol",
  reasoning: { effort: "low" },
  instructions: "Confirma en español de México el cobro creado o explica el error.",
  tools,
  input,
});
console.log(response.output_text);
```

```python
# Python — pip install openai
import json
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "name": "crear_cobro",
    "description": "Crea una solicitud de cobro en pesos mexicanos (MXN).",
    "strict": True,
    "parameters": {
        "type": "object",
        "properties": {
            "monto": {"type": "number", "description": "Monto en MXN, mayor que 0."},
            "concepto": {"type": "string", "description": "Concepto corto que verá quien paga."},
        },
        "required": ["monto", "concepto"],
        "additionalProperties": False,
    },
}]

def crear_cobro(monto: float, concepto: str) -> dict:
    if not (0 < monto <= 10000):
        return {"error": "Monto fuera de rango"}
    return {"id": "cobro_demo_001", "estado": "pendiente", "monto": monto, "concepto": concepto}  # simulado

input_list = [{"role": "user", "content": "Cóbrale 120 pesos a Memo por dos cafés."}]

response = client.responses.create(
    model="gpt-6.1-sol", reasoning={"effort": "low"}, tools=tools, input=input_list
)
input_list += response.output  # conserva razonamiento y llamadas

for item in response.output:
    if item.type == "function_call" and item.name == "crear_cobro":
        resultado = crear_cobro(**json.loads(item.arguments))
        input_list.append({
            "type": "function_call_output",
            "call_id": item.call_id,
            "output": json.dumps(resultado, ensure_ascii=False),
        })

response = client.responses.create(
    model="gpt-6.1-sol",
    reasoning={"effort": "low"},
    instructions="Confirma en español de México el cobro creado o explica el error.",
    tools=tools,
    input=input_list,
)
print(response.output_text)
```

**Con `fetch` nativo (stack de AGENTS.md, sin SDK).** Endpoint `POST https://api.openai.com/v1/responses`. La segunda llamada usa `previous_response_id` y manda sólo las salidas de las herramientas, como los ejemplos oficiales de Go, Java y Ruby [SC13]. Notas ⚪ (no verificado hoy): en el JSON crudo no viene `output_text` (es atajo de los SDK) y el texto se arma con los items `message`; `previous_response_id` depende de que la respuesta quede guardada (default), así que no pongas `store: false` con este patrón.

```js
// app/api/_lib/agente.js — Node 20+, fetch nativo. Reusa `tools` y `crearCobro` del bloque de Node.js.
async function responses(cuerpo, signal) {
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
    signal,
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${await r.text()}`);
  return r.json();
}

const textoDe = (resp) => resp.output
  .filter((it) => it.type === "message")
  .flatMap((it) => it.content ?? [])
  .filter((c) => c.type === "output_text")
  .map((c) => c.text)
  .join("");

export async function atender(mensaje) {
  const model = process.env.OPENAI_MODEL || "gpt-6.1-sol";
  const signal = AbortSignal.timeout(15000);
  let resp = await responses({ model, reasoning: { effort: "low" }, tools, input: mensaje }, signal);

  const salidas = [];
  for (const item of resp.output) {
    if (item.type !== "function_call" || item.name !== "crear_cobro") continue;
    const resultado = await crearCobro(JSON.parse(item.arguments));
    salidas.push({ type: "function_call_output", call_id: item.call_id, output: JSON.stringify(resultado) });
  }
  if (salidas.length) {
    resp = await responses(
      { model, reasoning: { effort: "low" }, tools, previous_response_id: resp.id, input: salidas },
      signal,
    );
  }
  return { texto: textoDe(resp), respuestaId: resp.id };
}
```

## K04.16 · Ejemplo (c): voz Realtime en el navegador con llave efímera

Endpoints, cuerpo y pasos según la guía WebRTC [SC10]. El servidor va como Vercel Function en `app/api/realtime-token.js` (stack de AGENTS.md: Node.js ESM, `fetch` nativo) o, si prefieres, en Python (FastAPI); el navegador es el mismo. Los campos `instructions` y `tools` de la sesión y los eventos de herramientas siguen la forma conocida del API GA (⚪ no verificado hoy).

```js
// app/api/realtime-token.js — Vercel Function (Node.js, ESM). URL: /api/realtime-token
// ⚪ No verificado hoy: firma estilo Web (export GET -> Response). Si Vercel no la reconoce,
// usa: export default async function handler(req, res) { ... res.status(200).json(...) }
export async function GET() {
  const r = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Safety-Identifier": "demo-usuario-anonimo-1", // estable y anónimo
    },
    body: JSON.stringify({
      session: {
        type: "realtime",
        model: "gpt-realtime-2.1",
        instructions: "Eres Cobri. Habla siempre en español de México, breve y amable.",
        audio: { output: { voice: "marin" } },
        tools: [{
          type: "function",
          name: "crear_cobro",
          description: "Crea un cobro en MXN",
          parameters: {
            type: "object",
            properties: { monto: { type: "number" }, concepto: { type: "string" } },
            required: ["monto", "concepto"],
          },
        }],
      },
    }),
  });
  if (!r.ok) return Response.json({ error: await r.text() }, { status: 500 });
  const data = await r.json();
  return Response.json({ value: data.value }, { headers: { "Cache-Control": "no-store" } });
}
```

```python
# main.py — pip install fastapi uvicorn httpx ; uvicorn main:app
import os
import httpx
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/api/realtime-token")
async def realtime_token():
    async with httpx.AsyncClient(timeout=10) as http:
        r = await http.post(
            "https://api.openai.com/v1/realtime/client_secrets",
            headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
            json={"session": {
                "type": "realtime",
                "model": "gpt-realtime-2.1",
                "instructions": "Eres Cobri. Habla siempre en español de México, breve y amable.",
                "audio": {"output": {"voice": "marin"}},
            }},
        )
    r.raise_for_status()
    return JSONResponse({"value": r.json()["value"]}, headers={"Cache-Control": "no-store"})
```

```js
// app/js/voz.js — navegador (<script type="module">). Requiere HTTPS (o localhost) y permiso de micrófono.
// /api/crear-cobro: otra función tuya (app/api/crear-cobro.js) que valida y sólo PREPARA el cobro;
// el cobro real en Pey (K03) ocurre hasta que la persona confirma en pantalla (AGENTS.md §3).
export async function iniciarVoz() {
  const { value: llaveEfimera } = await (await fetch("/api/realtime-token")).json();

  const pc = new RTCPeerConnection();
  const audio = new Audio();
  audio.autoplay = true;
  pc.ontrack = (e) => { audio.srcObject = e.streams[0]; };

  const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
  pc.addTrack(mic.getTracks()[0]);

  const dc = pc.createDataChannel("oai-events");
  dc.addEventListener("message", async (e) => {
    const ev = JSON.parse(e.data);
    if (ev.type !== "response.done") return; // ⚪ eventos de herramientas: no verificado hoy
    for (const item of ev.response?.output ?? []) {
      if (item.type !== "function_call" || item.name !== "crear_cobro") continue;
      const resultado = await (await fetch("/api/crear-cobro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: item.arguments, // tu servidor valida monto y concepto
      })).json();
      dc.send(JSON.stringify({
        type: "conversation.item.create",
        item: { type: "function_call_output", call_id: item.call_id, output: JSON.stringify(resultado) },
      }));
      dc.send(JSON.stringify({ type: "response.create" }));
    }
  });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  const sdpResp = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    body: offer.sdp,
    headers: { Authorization: `Bearer ${llaveEfimera}`, "Content-Type": "application/sdp" },
  });
  await pc.setRemoteDescription({ type: "answer", sdp: await sdpResp.text() });
  return { pc, dc, mic };
}
```

**Recomendación:** prueba esto hoy en tu celular con la URL de Vercel (HTTPS). Si los eventos de herramienta no llegan como aquí, pasa a `RealtimeAgent` del Agents SDK (K04.9), que maneja las herramientas por ti.

## K04.17 · Qué funciones dan efecto wow en 4 horas

**Recomendación** (ordenadas por impacto entre riesgo):

1. **Cobro por voz en español** (`gpt-realtime-2.1` + herramienta `crear_cobro` + confirmación en pantalla). Impacto alto; 60–90 min si hoy dejas funcionando el token y el WebRTC (K04.16). Ten un campo de texto de respaldo por si falla el audio.
2. **Foto → cobro:** visión + salida estructurada (ticket o nota escrita a mano → `{monto, concepto}`) → tarjeta de cobro lista. 30–45 min y muy visual.
3. **Lenguaje natural → JSON validado** (K04.14) como base de todo: "cóbrale 350 a Lupita por los tacos". 20 min.
4. **Toque de "lo más nuevo":** comprobante ilustrado, sticker o GIF con `gpt-image-2.6-flare`, lanzado el 4 nov [SC30]. 20–30 min; sólo adorno.
5. **Plugin MCP dentro de ChatGPT** ("cobra sin salir de ChatGPT"): wow alto, pero 1–3 h y depende del modo desarrollador (K04.11). Sólo si sobra tiempo.
6. **Para el pitch:** nombra lo del DevDay 2026 que sí usaste (GPT-6.1 Sol, Realtime 2.1, GPT-Image-2.6 y Codex Cloud con tareas en paralelo) y muestra el costo por operación. Una extracción con Sol de 500 tokens de entrada y 100 de salida cuesta ≈ US$0.002 más los tokens de razonamiento (cuánto suman: ⚪ no verificado).

Evita en la demo: Agent Builder, Assistants API, `gpt-image-1` y el encabezado beta de Realtime [SC21]. GPT-Live-1, Agents API y Decisions API, sólo si lo básico ya funciona.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SC01 | DevDay 2026 announcements and developer resources (OpenAI Developer Community) | https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006 | 2026-11-06 |
| SC02 | OpenAI DevDay 2026 Recap: Everything Announced and What Developers Should Do (nocode.mba) | https://www.nocode.mba/articles/openai-devday-2026-recap | 2026-11-06 |
| SC03 | OpenAI DevDay 2026 applications are now open (OpenAI Developer Community) | https://community.openai.com/t/openai-devday-2026-applications-are-now-open/1384509 | 2026-11-06 |
| SC04 | OpenAI DevDay Exchange 2026 | https://events.openai.com/devdayexchange2026 | 2026-11-06 |
| SC05 | DevDay Exchange Community Hackathon: Charlotte | https://ushackathons.com/events/devday-exchange-community-hackathon-charlotte | 2026-11-06 |
| SC06 | Models (OpenAI API docs) | https://developers.openai.com/api/docs/models | 2026-11-06 |
| SC07 | Pricing (OpenAI API docs) | https://developers.openai.com/api/docs/pricing | 2026-11-06 |
| SC08 | GPT-6.1 Sol: Features, Benchmarks, Pricing, and Access (DataCamp) | https://www.datacamp.com/blog/gpt-6-1-sol | 2026-11-06 |
| SC09 | Prompt caching (OpenAI API docs) | https://developers.openai.com/api/docs/guides/prompt-caching | 2026-11-06 |
| SC10 | WebRTC (OpenAI API docs) | https://developers.openai.com/api/docs/guides/voice-webrtc | 2026-11-06 |
| SC11 | Build more natural voice experiences with GPT-Live-1 in the API (OpenAI) | https://openai.com/index/introducing-gpt-live-1-in-the-api/ | 2026-11-06 |
| SC12 | Structured model outputs (OpenAI API docs) | https://developers.openai.com/api/docs/guides/structured-outputs.md | 2026-11-06 |
| SC13 | Function calling (OpenAI API docs) | https://developers.openai.com/docs/guides/function-calling | 2026-11-06 |
| SC14 | Streaming responses (OpenAI API docs) | https://developers.openai.com/api/docs/guides/streaming-responses?api-mode=responses | 2026-11-06 |
| SC15 | Introducing the Agents API and hosted sandboxes (OpenAI Developer Community) | https://community.openai.com/t/introducing-the-agents-api-and-hosted-sandboxes/1396481 | 2026-11-06 |
| SC16 | Agents API quickstart (OpenAI API docs) | https://developers.openai.com/api/docs/guides/agents-api/quickstart | 2026-11-06 |
| SC17 | The next evolution of the Agents SDK (OpenAI) | https://openai.com/index/the-next-evolution-of-the-agents-sdk/ | 2026-11-06 |
| SC18 | OpenAI Agents SDK (JavaScript/TypeScript) README | https://cdn.jsdelivr.net/gh/openai/openai-agents-js@main/README.md | 2026-11-06 |
| SC19 | OpenAI Agents SDK (Python) docs | https://openai.github.io/openai-agents-python | 2026-11-06 |
| SC20 | Agent Builder (OpenAI API docs) | https://developers.openai.com/api/docs/guides/agent-builder | 2026-11-06 |
| SC21 | Deprecations (OpenAI API docs) | https://developers.openai.com/api/docs/deprecations | 2026-11-06 |
| SC22 | Connect and test your plugin (OpenAI) | https://developers.openai.com/plugins/deploy/connect-chatgpt | 2026-11-06 |
| SC23 | Plugins Quickstart (OpenAI) | https://developers.openai.com/plugins/quickstart | 2026-11-06 |
| SC24 | MCP server and UI quickstart (OpenAI) | https://developers.openai.com/apps-sdk/quickstart | 2026-11-06 |
| SC25 | ChatGPT Developer Mode: Where It Is and How to Turn It On (Carly) | https://www.usecarly.com/blog/chatgpt-developer-mode/ | 2026-11-06 |
| SC26 | Rate limits (OpenAI API docs) | https://developers.openai.com/api/docs/guides/rate-limits.md | 2026-11-06 |
| SC27 | OpenAI API Usage Tiers 2026: Free, Build, Launch & Grow (usagebox) | https://usagebox.com/articles/openai-api-usage-tiers-build-launch-grow-2026 | 2026-11-06 |
| SC28 | OpenAI API Quick Start 2026: account, API key and billing setup (DEV Community) | https://dev.to/abdul_qadir/openai-api-quick-start-2026-account-api-key-and-billing-setup-9b8 | 2026-11-06 |
| SC29 | Image prompting (OpenAI API docs) | https://developers.openai.com/api/docs/guides/image-prompting | 2026-11-06 |
| SC30 | GPT Image 2.6: Flare vs Sunburst, Pricing and API Guide (Digital Applied) | https://www.digitalapplied.com/blog/gpt-image-2-6-flare-sunburst-api-guide | 2026-11-06 |
| SC31 | GPT Realtime 2.1 overview (Microsoft Foundry) | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/realtime-2 | 2026-11-06 |
| SC32 | OpenAI rolls out GPT-Realtime-2, Translate and Whisper audio models (FoneArena) | https://www.fonearena.com/blog/482182/openai-gpt-realtime-2-translate-whisper-features.html/amp | 2026-11-06 |
| SC44 | Codex Pricing (OpenAI; redirige a learn.chatgpt.com/docs/pricing.md) | https://developers.openai.com/codex/pricing.md | 2026-11-06 |
| SC48 | Authentication (Codex docs; redirige a learn.chatgpt.com/docs/auth) | https://developers.openai.com/codex/auth | 2026-11-06 |
| SC57 | ChatGPT Connectors (2026): Which Apps Connect and What Each Plan Gets (Justin McKelvey) | https://justinmckelvey.com/blog/chatgpt-connectors | 2026-11-06 |
| SC59 | How to Connect GitHub to ChatGPT — via MCP (AnythingMCP) | https://anythingmcp.com/guides/connect-github-to-chatgpt | 2026-11-06 |
| SC64 | OpenAI DevDay 2026: Everything Announced and What It All Means (God of Prompt; el contenido describe el DevDay 2025) | https://godofprompt.ai/blog/openai-devday-2026/ | 2026-11-06 |

## Correcciones de la verificación independiente (2026-11-06)

- TL;DR, viñeta de herramientas. Decía: "Con GPT-6.x las herramientas sólo funcionan en la Responses API". Dice ahora: "Con GPT-6 Astra y GPT-6.1 Sol las herramientas sólo funcionan en la Responses API (la fuente no lo dice de Terra ni de Luna)". Fuente: SC13, que dice textualmente "GPT-6 Astra and GPT-6.1 Sol require the Responses API for tool calling" y no menciona a GPT-6.1 Terra ni a GPT-6 Luna (K04.2 ya lo decía bien).
- K04.13, créditos en eventos hermanos. Decía: "en Charlotte, cada asistente registrado recibió US$50 en créditos de API y US$100 en créditos de Codex". Dice ahora: "en Charlotte (3 oct 2026), la página ofrecía US$50 en créditos de API y US$100 en créditos de Codex a cada asistente elegible que hiciera check-in". Fuente: SC05 ("$100 in Codex credits and $50 in API credits for eligible checked-in attendees"); la página no confirma que se hayan entregado.

<!-- ===== FIN: conocimiento/04-openai-api-nov-2026.md ===== -->

<!-- ===== INICIO: conocimiento/05-codex-chatgpt-y-codespaces.md ===== -->

---
id: K05
titulo: "Trabajar 100% en la nube: Codex (web y CLI), ChatGPT + GitHub, Codespaces y Vercel"
resumen: "Cómo se usa hoy Codex en la nube (entorno, secretos, internet, AGENTS.md, tareas en paralelo, PRs y límites de Plus), Codex CLI en Codespaces, ChatGPT leyendo el repo, previews de Vercel y el flujo recomendado para el sábado; léelo antes de lanzar la primera tarea."
responde:
  - "¿Dónde está hoy Codex web y cómo conecto GitHub y creo el entorno?"
  - "¿Qué ve el agente de Codex: variables, secretos e internet, y en qué fase?"
  - "¿Cómo lee Codex AGENTS.md (anidados, precedencia, tamaño máximo)?"
  - "¿Cómo pregunto sin cambiar código, lanzo tareas en paralelo, pido varias versiones y creo el PR?"
  - "¿Cuánto puedo usar Codex con ChatGPT Plus?"
  - "¿Cómo instalo y autentico Codex CLI en GitHub Codespaces y uso codex exec?"
  - "¿Funciona la extensión de Codex para VS Code dentro de Codespaces?"
  - "¿Cómo hago que ChatGPT web lea mi repo de GitHub y cuándo conviene un MCP propio?"
  - "¿Cómo funcionan los previews de Vercel por PR y el puerto público de Codespaces para webhooks?"
  - "¿Cómo escribo buenas tareas para Codex y cuál es el flujo del sábado?"
actualizado: 2026-11-07
confianza: media
fuentes: [SC01, SC02, SC22, SC25, SC33, SC34, SC35, SC36, SC37, SC38, SC39, SC40, SC41, SC42, SC43, SC44, SC45, SC46, SC47, SC48, SC49, SC50, SC51, SC52, SC53, SC54, SC55, SC56, SC57, SC58, SC59, SC60, SC61, SC62, SC63, SC64, SC65]
---

# K05 · Codex, ChatGPT y Codespaces: flujo 100% en la nube

## TL;DR

- Codex en la nube vive dentro de ChatGPT: "Work in" › "Cloud" › "Select environment" › "Create environment"; el entorno debe estar publicado ("Environment published") antes de lanzar tareas [SC34, SC37].
- Con Plus, mensajes locales y tareas cloud comparten la bolsa de 5 horas (GPT-6.1 Sol: 15–160 mensajes); una tarea cloud gasta más; cada tarea corre en una VM de 2 vCPU y 8 GiB. Tablero: chatgpt.com/codex/settings/usage [SC44, SC34].
- En la experiencia nueva los secretos son "HTTP secrets": el programa ve un placeholder y el proxy pone el valor real sólo hacia dominios HTTPS permitidos; en Legacy, los secretos sólo existen durante el setup [SC34, SC35].
- AGENTS.md: uno por carpeta, de la raíz a la carpeta de trabajo; el más cercano prevalece; tope combinado de 32 KiB [SC43].
- Codespaces: `npm install -g @openai/codex` y `codex login --device-auth` (antes activa "Device code authorization" en Settings › Security de ChatGPT). La extensión de VS Code falla al iniciar sesión en Codespaces (issue #6403): usa la terminal [SC50, SC49, SC53].
- Vercel comenta en cada PR su URL de preview; los cambios de variables sólo aplican tras un redeploy [SC60, SC61].

## K05.1 · Qué es hoy "Codex web": experiencia nueva vs. Legacy

- **9 jul 2026:** la app de escritorio de Codex se fusionó con la de ChatGPT, con pestañas Chat, Work y Codex [SC47, SC63].
- **29 sep 2026 (DevDay):** relanzamiento de Codex Cloud: las tareas siguen con la laptop cerrada y se revisan desde web, celular o escritorio; cada tarea tiene su propio espacio de trabajo [SC33, SC02]. Está en Plus, Pro, Business, Enterprise, Edu y Healthcare [SC02]; no en Free ni Go [SC37].
- **Cómo entrar (experiencia nueva):** en ChatGPT web o escritorio, "Work in" › "Cloud" › "Select environment"; o Settings › Codex Cloud › Environments [SC34]. Un tutorial del 11 oct entra por el menú de tres puntos de la barra lateral › "Codex" [SC39]; otro del 30 sep arranca en chatgpt.com/codex [SC40].
- **Codex Cloud (Legacy):** entornos en chatgpt.com/codex/settings/environments; todavía da servicio a Code Review y a las integraciones con GitHub y Linear. OpenAI planea deprecarlo, sin fecha publicada [SC35, SC34].
- **Uso y límites:** chatgpt.com/codex/settings/usage [SC44].
- **Cambios en curso:** desde diciembre, Plus, Pro y Business comparten una sola bolsa entre ChatGPT y Codex; un grupo pequeño prueba la fusión de Chat y Work [SC46].
- Las etiquetas de este archivo van en inglés; si tu ChatGPT está en español pueden verse traducidas (⚪ no verificado).

**Recomendación:** hoy en la noche abre chatgpt.com/codex y anota qué interfaz ves (nueva o Legacy) y dónde se eligen entorno y rama. Si difiere de lo que dice `dia-del-evento/PROMPTS-CODEX.md`, corrígelo ahí antes de dormir.

## K05.2 · Conectar GitHub y crear el entorno

Experiencia nueva:
1. "Work in" › "Cloud" › "Select environment" › "Create environment" [SC34].
2. Elige los repos; si lo pide, conecta GitHub. Sólo github.com: ni GitLab ni GitHub Enterprise Server [SC37]. Según una guía de terceros, la GitHub App se llama "ChatGPT Codex Connector" [SC56].
3. "Get started": Codex revisa el repo, instala dependencias y herramientas y prueba el flujo; te pregunta lo que falte [SC34].
4. Revisa el reporte de setup, la configuración y los archivos; guarda y selecciona "Publish"; espera "Environment published" [SC34]. Con la etiqueta "Unpublished" no se pueden lanzar tareas [SC37].
5. "Start a new task" [SC34]. Para cambiar el entorno: menú "..." › "Edit" › "Republish" [SC38].

- **Privacidad:** "Privacy" › "Who can use" ("Only me" o tu workspace) [SC34].
- **Recursos en Plus:** 2 vCPU, 8 GiB de RAM y 8 GiB de disco por tarea [SC34].
- **Estado guardado:** archivos, cambios sin commit y herramientas de una tarea se recuperan hasta 7 días después del último turno; no sustituye a git [SC34].
- **Legacy** [SC35]: entornos en chatgpt.com/codex/settings/environments; instala dependencias solo si usas npm, yarn, pnpm, pip, pipenv o poetry; imagen base `universal`; "Set package versions" fija versiones de runtime.

**Recomendación:** crea y publica el entorno HOY, con el repo ya en GitHub, para que el sábado sólo lances tareas. Como `app/` estará vacío, díselo en el setup: "Node 22; las pruebas se correrán con `npm test --prefix app`".

## K05.3 · Install script, variables y secretos: qué ve el agente y cuándo

**Experiencia nueva** [SC34, SC38]:
- "Install script": comandos que instalan dependencias; Codex puede grabar el setup que ya probó.
- "Start skill": instrucciones para arrancar servicios y comprobar que están listos.
- "Environment variables": se pasan directo a los programas; la doc no detalla por fase (⚪ no verificado).
- "HTTP secrets" (o "network secret"): el programa ve un placeholder y el proxy pone el valor real sólo en peticiones HTTPS (puerto 443) a dominios permitidos, tanto en setup como en tareas. Guardar uno agrega su dominio a la lista permitida [SC34]. Campos "Key", "Value" y "Allowed domains"; el "Personal vault" está en Settings › Codex Cloud [SC38].

**Legacy** [SC35]:
- El setup script corre en otra sesión de Bash: un `export` no llega al agente (usa `~/.bashrc` o variables del entorno).
- El "maintenance script" corre al reanudar un contenedor en caché; la caché dura hasta 12 horas.
- Variables: viven en el setup y en la fase del agente. Secrets: sólo en el setup; se borran antes de la fase del agente.
- Cambiar scripts, variables o secretos invalida la caché; existe "Reset cache".

**Recomendación:** el repo es público: ninguna llave en archivos ni en AGENTS.md. Las pruebas usan `fetch` simulado (AGENTS.md), así que Codex no necesita llaves reales. Si una tarea de verdad debe llamar a OpenAI o a Pey, usa HTTP secrets con el dominio exacto (`api.openai.com`; el de Pey según K03).

## K05.4 · Internet del agente y dominios permitidos

**Experiencia nueva** [SC34]:
- "Enable all public internet access": acceso total; desactiva los controles finos.
- "Enable package manager domains": lista preestablecida (npm, PyPI, Rust, Go, Maven/Gradle, apt, GitHub y otros).
- "Additional allowed domains": hosts específicos; cada subdominio va aparte (el dominio raíz incluye `www`).
- La doc no dice los valores por defecto (⚪ no verificado). Tutoriales de terceros muestran otras etiquetas: "Allow Codex to access internet" y, en "Allow domains", "Package managers", "Custom domains only" o "All (unrestricted)" [SC37, SC38].
- La VPN (Tailscale) es independiente del internet público [SC34].

**Legacy** [SC36]: el agente no tiene internet por defecto (el setup sí); opciones "Off" y "On"; listas "None", "Common dependencies" y "All (unrestricted)"; se recomienda permitir sólo GET, HEAD y OPTIONS.

**Riesgos** [SC36]: prompt injection desde contenido web, fuga de código o secretos, dependencias maliciosas y problemas de licencia. El ejemplo oficial es un issue de GitHub con instrucciones ocultas que mandan el último commit a un servidor externo.

**Recomendación:** activa sólo package managers más los dominios exactos que la tarea necesite (por ejemplo, la documentación de OpenAI y la de Pey). Nunca "All". Como el repo es público, no le pidas a Codex leer issues ni PRs de desconocidos.

## K05.5 · AGENTS.md: cómo lo lee Codex

[SC43]
- Codex lee los AGENTS.md antes de trabajar y arma la cadena una vez por ejecución.
- **Global:** en `~/.codex` usa `AGENTS.override.md` o, si no existe, `AGENTS.md` (el primero que no esté vacío).
- **Proyecto:** recorre de la raíz (normalmente la raíz de git) hasta la carpeta actual. En cada carpeta busca `AGENTS.override.md`, luego `AGENTS.md`, luego los nombres de `project_doc_fallback_filenames`, y toma como máximo uno.
- **Precedencia:** se concatenan de la raíz hacia abajo; los más cercanos quedan al final y prevalecen. Los vacíos se ignoran.
- **Tamaño:** tope combinado de 32 KiB (`project_doc_max_bytes`); al llegar, deja de agregar archivos. Se arregla subiendo el límite o repartiendo instrucciones en carpetas.
- **Verificar (CLI):** `codex --ask-for-approval never "Summarize the current instructions."` desde la raíz.
- Si las mismas reglas aplican en tareas cloud: la página no lo dice (⚪ no verificado).

**Recomendación:** mantén el `AGENTS.md` raíz por debajo de 16 KB (lo revisa `scripts/verificar_conocimiento.py`) y que apunte a `conocimiento/INDICE.md` en lugar de copiar la base. Si `app/` necesita reglas propias, un `app/AGENTS.md` corto. En la primera tarea pide "resume las instrucciones que leíste" para confirmar que se cargó.

## K05.6 · Preguntar vs. codificar, tareas en paralelo y varias versiones

- **En paralelo:** varias tareas pueden partir del mismo entorno publicado, cada una con su propio estado; la doc no publica un tope [SC34] (⚪ no verificado).
- **Preguntar vs. codificar:** la doc de la experiencia nueva no describe botones "Ask" y "Code"; su maqueta muestra un cuadro "Do anything" y la etiqueta "Approve for me", sin explicarlos [SC33]. Que la interfaz anterior tenga "Ask" y "Code": ⚪ no verificado hoy.
- **Varias versiones:** en la CLI, `codex cloud exec --env ENV_ID --attempts 3 "…"` pide de 1 a 4 intentos (best-of-N); el subcomando se describe como experimental [SC41, SC40]. Según terceros, la web muestra los intentos lado a lado y no los califica: tú eliges [SC41]. Selector de versiones en la web: ⚪ no verificado.
- **Costo:** una tarea cloud puede gastar más de la bolsa que un mensaje local [SC44]; pedir varias versiones probablemente multiplica el gasto (⚪ no verificado).

**Recomendación:** para preguntar sin cambios, empieza el prompt con "Solo lee y responde; no modifiques archivos ni abras PR". En paralelo, sólo tareas que tocan archivos distintos (tabla de dueños en `dia-del-evento/PROMPTS-CODEX.md`). Una versión por tarea, salvo la de interfaz si te sobra límite.

## K05.7 · Revisar, dar seguimiento y crear el PR

- Al terminar una tarea revisas cambios y resultados de pruebas, pides ajustes en la misma tarea y haces commit o abres un PR desde ella [SC33]. El PR se puede crear sin bajar los cambios a tu máquina [SC42].
- **Botón del PR:** nombre exacto ⚪ no verificado. Alternativa de un tutorial: escribir en la tarea "create a pr" y abrir el enlace que devuelve [SC39].
- **Seguimiento:** la misma tarea conserva archivos, cambios sin commit y herramientas instaladas [SC34]. En una tarea nueva, vuelve a plantear el problema completo [SC39].
- **Qué revisar:** que los archivos cambiados correspondan a lo pedido y que las pruebas cubran el problema [SC39].
- **Merge:** es una acción aparte, en GitHub [SC39].
- **Desde la terminal:** `codex apply TASK_ID` aplica el diff de una tarea cloud con `git apply` y falla si hay conflictos [SC42].
- Si un seguimiento actualiza el mismo PR o abre otro: ⚪ no verificado.

**Recomendación:** en cada prompt pide el título del PR y la plantilla de descripción de AGENTS.md (Qué cambió · Cómo probarlo · Variables nuevas · Pendientes ⚪ · IDs). Fusiona con "Squash and merge" sólo después de probar el preview.

## K05.8 · Code Review de Codex en PRs

- **DevDay 2026:** Code Review suma resúmenes, diffs y preguntas en la interfaz de revisión, y las revisiones automáticas pueden correr en la nube [SC01]; en la app de escritorio permite revisar antes de comentar en PRs de GitHub [SC02].
- La revisión en GitHub todavía usa los entornos Legacy [SC35]. Sólo las revisiones hechas en GitHub cuentan como uso de Code Review; las locales cuentan contra tu límite general [SC44].
- Según un tercero, la auto-revisión revisa PRs nuevos en los repos donde está habilitada [SC55].
- Cómo se activa (pantalla, interruptor por repo) y si basta mencionar a Codex en un comentario del PR: ⚪ no verificado.

**Recomendación:** no dependas de esto el sábado; la revisión de 3 minutos de `dia-del-evento/PROMPTS-CODEX.md` (sección 4) más el preview bastan. Si quieres presumirlo, pruébalo hoy en un PR de prueba y anota los pasos reales.

## K05.9 · Límites de uso con ChatGPT Plus

[SC44]
- Plus incluye Codex en web (cloud), CLI, extensión del IDE, iOS y app de escritorio.
- **Mensajes locales por 5 horas** (estimaciones, no límites fijos): GPT-6 Astra 5–45; GPT-6.1 Sol 15–160; GPT-6.1 Terra 35–285; GPT-6 Sol 15–150; GPT-6 Luna 350–3,000.
- Las tareas cloud comparten esa bolsa y pueden gastar más; también puede haber límites semanales.
- **Al llegar al límite:** el turno en curso puede terminar; después compras créditos o usas una API key a tarifa de API.
- **Créditos en Plus:** GPT-6.1 Sol consume 50 créditos por 1M de tokens de entrada y 250 por 1M de salida.
- La ventana de 5 horas aplica a Plus desde el 25 ago 2026 [SC45]. Desde diciembre la bolsa se comparte con ChatGPT [SC46].
- **Tablero:** chatgpt.com/codex/settings/usage.

**Recomendación:** en Codex usa GPT-6.1 Sol (o Terra para tareas mecánicas) y deja Astra para una o dos tareas difíciles. Revisa el tablero antes de cada oleada; si va bajo, sigue el orden de `dia-del-evento/PROMPTS-CODEX.md` (primero las tareas 2 y 3). Ten la API key lista como respaldo (K05.10).

## K05.10 · Codex CLI en GitHub Codespaces: instalar y entrar

- **Devcontainer del repo:** `.devcontainer/devcontainer.json` usa la imagen de Node 22, instala `@openai/codex` y `vercel` al crear el Codespace y declara los secretos `OPENAI_API_KEY` y `PEY_API_KEY` (dato del archivo del repo; ⚪ no lo probé en un Codespace).
- **Instalar a mano:** `npm install -g @openai/codex` [SC50].
- **Login sin navegador local:** `codex login --device-auth` muestra un enlace (auth.openai.com/codex/device) y un código de un solo uso que dura unos 15 minutos [SC49]. Antes activa en ChatGPT › Settings › Security el interruptor "Device code authorization"; en workspaces administrados lo activa el admin [SC49]. El issue #6403 confirma ese requisito [SC53].
- **Alternativa:** API key con `CODEX_API_KEY` o `codex login --with-api-key`; se cobra a tu saldo de API, no a Plus [SC52, SC48].
- **Credenciales:** quedan en `~/.codex/auth.json` (texto plano) o en el llavero del sistema, según `cli_auth_credentials_store` [SC48]. Están fuera del repo: no las copies a él.
- **Probar:** `codex "list the files in the current directory"` [SC49].
- **Versión:** el devcontainer anota `@openai/codex` 0.167.0 en npm el 6 nov; una guía de terceros documenta la 0.166.0 [SC52].

```bash
npm install -g @openai/codex    # el devcontainer de este repo ya lo hace
codex --version
codex login --device-auth       # abre el enlace en otra pestaña y escribe el código
codex "Resume en 5 viñetas qué hay en conocimiento/INDICE.md"
```

## K05.11 · `codex exec` y tareas cloud desde la terminal

- `codex exec "tarea"` corre sin interacción: "By default, `codex exec` runs in a read-only sandbox." [SC51]
- **Para editar:** `--sandbox workspace-write`, o `--approve-for-me` (las aprobaciones pasan por revisión automática con ese sandbox). `--full-auto` ya no existe. `--sandbox danger-full-access` sólo en contenedores aislados [SC51].
- **Salida:** el progreso va a stderr y el mensaje final a stdout. `--json` da eventos JSONL (`thread.started`, `turn.completed`, `turn.failed`, `item.*`, `error`); `-o archivo` guarda el mensaje final; `--output-schema schema.json` obliga a cumplir un JSON Schema [SC51].
- **Retomar:** `codex exec resume --last "…"` [SC51].
- **API key sólo para esa ejecución:** `CODEX_API_KEY=… codex exec --json "…"`; no la pongas como variable de todo el job en workflows que corren código del repo [SC51].
- `--skip-git-repo-check` sólo si el entorno es seguro. En GitHub Actions se recomienda `openai/codex-action@v1` [SC51].
- **Cloud desde la CLI (experimental):** `codex cloud exec --env ENV_ID --attempts 2 "…"`, `codex cloud list --env ENV_ID --json`, `codex cloud diff TASK_ID` y `codex apply TASK_ID` [SC41, SC42].

```bash
# Revisión de solo lectura del código ya bajado en el Codespace
codex exec "Revisa app/api/ contra AGENTS.md y lista riesgos de seguridad" -o revision.md

# Arreglo con permiso de escritura dentro del workspace
codex exec --sandbox workspace-write "Haz que npm test --prefix app pase sin tocar app/js/contrato.js"
```

## K05.12 · Extensión de Codex para VS Code en Codespaces (issue #6403)

- **Título del issue:** "Unable to complete OAuth login for Codex extension when using github.dev / Codespaces" [SC53].
- **Síntoma:** tras iniciar sesión, el navegador redirige a `localhost:1455`, que el entorno remoto no alcanza. Con varios contenedores el puerto se remapea (por ejemplo, a 1456) y el callback falla. Hay reportes de que la versión 0.4.50 se queda cargando en Codespaces [SC53].
- **Salidas reportadas:** `codex login --device-auth` en la terminal y recargar el workspace (a unos les funcionó al recargar, a otros hasta reiniciar); habilitar antes el código de dispositivo; reenviar el puerto 1455; usar API key [SC53].
- En un issue parecido (#5673, Remote-SSH) un mantenedor remitió al login por código de dispositivo [SC54].
- **Estado actual (abierto o cerrado):** ⚪ no verificado: la página no lo mostró y la API de GitHub no estaba disponible desde esta sesión.

**Recomendación:** no dependas de la extensión. Usa la CLI en la terminal del Codespace; si quieres el panel, haz primero el device auth en la terminal y luego recarga la ventana.

## K05.13 · ChatGPT web + GitHub: plugin de GitHub

- **Nombres:** desde el 9 jul 2026 los conectores se llaman "apps" y viven dentro de plugins (Plugin Directory) [SC57]; por eso la ruta vieja Settings › Connectors ya no existe [SC25].
- **Conectar** (guía de terceros, 1 nov): Settings › Plugins › GitHub → iniciar sesión → instalar la GitHub App "ChatGPT Codex Connector" en tu cuenta u organización y elegir repos. Los repos tardan unos 5 minutos en aparecer, más en el índice de búsqueda de GitHub [SC56].
- **Qué hace:** busca y lee código, READMEs y docs de los repos permitidos con consultas a GitHub, sin copia sincronizada. No crea issues, ramas ni PRs: para eso está Codex [SC56, SC55].
- **Modos:** chat, deep research o agente/Work, según plan y cuenta [SC56].
- **Plan:** un tercero dice que el lector llegó primero a Plus, Pro y Team [SC55]; otro dice que OpenAI no publica la lista [SC56] (⚪ no verificado en fuente oficial).

**Recomendación:** pruébalo hoy con una pregunta que sólo se responda leyendo `conocimiento/INDICE.md`. Como depende del índice de búsqueda de GitHub, lo recién subido puede tardar: si ChatGPT no encuentra un archivo, pega su texto o adjunta el `TODO-EN-UNO.md` que menciona el índice.

## K05.14 · Servidores MCP propios y modo desarrollador en Plus

- **Agregar un servidor (doc oficial):** chatgpt.com/plugins → "+" → "Add custom MCP server" → nombre y URL con `/mcp` (o "Tunnel") → autenticación → "I understand and want to continue" → "Create as a plugin" → revisar herramientas → instalar → chat nuevo → `@` [SC22].
- **Requisito:** endpoint HTTPS público con streamable HTTP, o un Secure MCP Tunnel [SC22].
- **Modo desarrollador:** según un tercero (1 oct), Settings › Security and login › "Developer mode"; si en Plugins › "Add" aparece "Create MCP App", ya está activo; sólo en web; Plus, Pro, Business, Enterprise y Edu, no Free [SC25]. Otro tercero dice que ya no hace falta [SC59]. La doc oficial no lo menciona (⚪ no verificado).
- **Autenticación y escrituras:** OAuth, sin autenticación o mixta. Las herramientas que no estén marcadas como de sólo lectura piden confirmación; puedes aprobarlas para el resto de la conversación [SC25]. OpenAI lo describe como "powerful but dangerous" [SC25].

**Recomendación:** para que ChatGPT lea el repo no necesitas MCP: basta el plugin de GitHub (K05.13). Un MCP propio sólo si el producto se demuestra dentro de ChatGPT (K04.11).

## K05.15 · Servidor MCP remoto oficial de GitHub

- **URL:** `https://api.githubcopilot.com/mcp/` (variante insiders: `/mcp/insiders`) [SC58].
- **Autenticación:** OAuth (cada host debe configurar su GitHub App u OAuth App) o un PAT en el encabezado `Authorization: Bearer …` [SC58].
- **Herramientas por defecto:** context, repos, issues, pull_requests y users [SC58].
- **Hosts con guía de instalación:** VS Code, Copilot CLI, Claude, Codex, Cursor, Windsurf, Zed y otros; ChatGPT no aparece [SC58].
- **Con ChatGPT:** ChatGPT ofrece OAuth, sin autenticación o mixta, sin un campo documentado para un encabezado Bearer [SC25], así que la conexión directa queda ⚪ no verificada. Un intermediario (AnythingMCP) la hace guardando un PAT y exponiendo OAuth; apaga por defecto cuatro herramientas de escritura: merge, push, crear o actualizar archivo y borrar archivo [SC59].

**Recomendación:** mañana no lo uses en ChatGPT. Si necesitas que Codex CLI consulte issues o PRs, configúralo en Codex con un PAT fine-grained de sólo lectura (⚪ no verifiqué los pasos en Codex).

## K05.16 · Vercel + GitHub: previews por PR y variables

[SC60, SC61]
- Vercel despliega cada push por defecto, incluidas las ramas de PR. El último push de cada PR recibe una URL de preview única que Vercel publica como comentario en el PR.
- Push o merge a la rama de producción (normalmente `main`) actualiza los dominios de producción; revertir restaura al instante el deploy anterior.
- Los PRs desde forks piden autorización (protege variables). Para importar un repo personal debes ser Owner.
- **Variables por entorno:** Production, Preview (todas las ramas que no son de producción, o una rama específica que sobrescribe) y Development (`vercel env pull`). Tipos: Config o Secret; un Secret ya no se puede leer después de guardarlo.
- **Los cambios a variables sólo aplican a deploys nuevos:** haz Redeploy.
- Tope de 64 KB de variables por deploy. Variables de sistema útiles: `VERCEL_GIT_PULL_REQUEST_ID` y `VERCEL_GIT_COMMIT_REF`.
- **Funciones sin framework (verificado el 7-nov):** cada archivo de `api/` es una función; se escribe `export function GET(request) { return new Response(...) }` y el `package.json` necesita `"type": "module"` (o archivos `.mjs`) [SC65]. Vercel no convierte en función los **archivos** de `api/` que empiezan con `_` o `.` o terminan en `.d.ts`, y recomienda poner el código compartido **fuera** de `api/` e importarlo desde la función [SC64]. Por eso el código compartido de la app vive en `app/lib/`.
- ⚪ No verificado hoy: el ajuste "Root Directory = `app`"; que los previews pidan sesión de Vercel.

**Recomendación:** antes del primer PR carga en Production y Preview las variables de `.env.example` (`OPENAI_API_KEY`, `OPENAI_MODEL`, `PEY_API_KEY`, `PEY_WEBHOOK_SECRET`, `MAX_MONTO_MXN`, `MODO_PAGO`; la tabla por entorno está en `dia-del-evento/CHECKLIST.md`), con las llaves como Secret. Abre un preview en incógnito para ver si pide sesión; la demo, en la URL de producción.

## K05.17 · Codespaces: puerto público para webhooks

[SC62]
- Pestaña PORTS → "Add port" → número. El devcontainer de este repo ya reenvía el 3000.
- **Hacerlo público:** clic derecho en el puerto → "Port Visibility" → "Public". "Private to Organization" requiere GitHub Team o Enterprise Cloud.
- **URL:** `https://CODESPACENAME-PORT.app.github.dev`.
- **Por defecto es privado:** para entrar a un puerto privado se necesita el `GITHUB_TOKEN` (encabezado `X-Github-Token`); los públicos no piden autenticación. El token cambia al reiniciar el Codespace.
- **CLI:** `gh codespace ports visibility 3000:public` (acepta varios: `80:private 3000:public`).
- Cambiar un puerto público a HTTPS lo vuelve privado.
- **Riesgo:** "anyone who knows the URL and port number can view the running application".
- Si la visibilidad se reinicia al detener el Codespace: ⚪ no verificado.

**Recomendación:** úsalo sólo como plan B para webhooks de Pey (verifica la firma, K03) y regresa el puerto a privado al terminar. En la demo usa el dominio de producción de Vercel: si el Codespace se suspende, deja de recibir webhooks (⚪ no verificado).

## K05.18 · Cómo escribir tareas para Codex

**Recomendación** (práctica propia, apoyada en las fuentes citadas):
- **Tamaño:** una tarea = un resultado verificable, pocos archivos y dueños claros (tabla de `dia-del-evento/PROMPTS-CODEX.md`). Si el PR no se revisa en 3 minutos, pártela.
- **Contexto con rutas:** qué leer (`AGENTS.md`, `conocimiento/INDICE.md` y la sección exacta, como `K04.15`), qué crear o editar y qué no tocar.
- **Criterios de aceptación verificables:** comandos y resultados esperados (`npm test --prefix app` pasa; monto 0 responde 400).
- **Pruebas:** pide pruebas nuevas con `fetch` simulado y que el registro muestre su salida; Codex reporta resultados de pruebas al terminar [SC33]; revisa que cubran el problema [SC39].
- **Escribe como si fuera local:** describe la tarea igual que en tu máquina [SC37]; en una tarea nueva da otra vez el contexto completo [SC39].
- **Sin datos inventados:** si falta un dato, `TODO(⚪)` visible (AGENTS.md).
- **Entrega:** título del PR y plantilla de descripción.

```text
Objetivo: [una frase con el resultado visible]
Lee: AGENTS.md, conocimiento/INDICE.md y conocimiento/04-openai-api-nov-2026.md (K04.15).
Crea o edita SOLO: app/api/agente.js, app/api/_lib/agente.js, app/tests/agente.test.js
No toques: app/js/contrato.js, app/api/_lib/config.js, conocimiento/
Criterios de aceptación:
- [ ] POST /api/agente con {"mensaje":"cóbrale 20 a Ana por pan"} PROPONE {monto: 20, concepto: "pan"} sin cobrar
- [ ] Monto <= 0 o > MAX_MONTO_MXN responde 400 con mensaje en español
- [ ] npm test --prefix app pasa (fetch simulado; cero llamadas reales)
Entrega: PR "[T3] Agente con Responses API" con Qué cambió · Cómo probarlo · Variables nuevas · Pendientes ⚪ · IDs usados.
```

## K05.19 · Flujo recomendado para el sábado

**Recomendación** (alineado con `dia-del-evento/PROMPTS-CODEX.md`; los horarios finos van en el runbook del día):

- **Hoy en la noche:** API key con saldo (K04.13); entorno de Codex creado y publicado (K05.2); plugin de GitHub conectado en ChatGPT (K05.13); "Device code authorization" activado (K05.10); Vercel ligado al repo con variables cargadas (K05.16); un Codespace creado una vez.

1. **ChatGPT → PRD (T+0:00 a 0:20):** con el plugin de GitHub leyendo `conocimiento/`, pide un PRD de una página (problema, persona, demo de 3 pasos, fuera de alcance) con la plantilla de `plantillas/` y guárdalo como `docs/PRD.md`.
2. **PRD → tareas:** pide a ChatGPT llenar los marcadores de los prompts de `dia-del-evento/PROMPTS-CODEX.md` con el PRD.
3. **Codex:** Tarea 0 (sólo lectura) como prueba de humo; Tarea 1 sola (esqueleto, modo SIMULACIÓN y primer deploy); al fusionarla, tareas 2 a 5 en paralelo.
4. **PR → preview:** en cada PR, Vercel comenta la URL; prueba en el celular con los pasos del PR; si falla, seguimiento en la misma tarea (K05.7).
5. **Merge:** "Squash and merge"; espera el deploy de producción y prueba la demo completa.
6. **Oleada 3:** tareas 6 a 8 (pruebas de punta a punta, pulido y deck).
7. **Congelar:** la última hora sin funciones nuevas; ensaya en la URL de producción y graba un video de respaldo.

- **Plan B:** si Codex web falla o se acaba el límite, Codespace + Codex CLI (`codex exec --sandbox workspace-write`, K05.11) o API key [SC44, SC51].

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SC01 | DevDay 2026 announcements and developer resources (OpenAI Developer Community) | https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006 | 2026-11-06 |
| SC02 | OpenAI DevDay 2026 Recap: Everything Announced and What Developers Should Do (nocode.mba) | https://www.nocode.mba/articles/openai-devday-2026-recap | 2026-11-06 |
| SC22 | Connect and test your plugin (OpenAI) | https://developers.openai.com/plugins/deploy/connect-chatgpt | 2026-11-06 |
| SC25 | ChatGPT Developer Mode: Where It Is and How to Turn It On (Carly) | https://www.usecarly.com/blog/chatgpt-developer-mode/ | 2026-11-06 |
| SC33 | Codex Cloud (learn.chatgpt.com) | https://learn.chatgpt.com/docs/cloud | 2026-11-06 |
| SC34 | Cloud environments (learn.chatgpt.com) | https://learn.chatgpt.com/docs/environments/cloud-environments | 2026-11-06 |
| SC35 | Codex Cloud (Legacy) (learn.chatgpt.com) | https://learn.chatgpt.com/docs/environments/cloud-environment | 2026-11-06 |
| SC36 | Codex Cloud (Legacy): internet access (learn.chatgpt.com) | https://learn.chatgpt.com/docs/cloud/internet-access | 2026-11-06 |
| SC37 | How to use Codex Cloud (Flavio Copes) | https://flaviocopes.com/codex-cloud/ | 2026-11-06 |
| SC38 | How to Use Codex Cloud Reusable Environments (Developers Digest) | https://www.developersdigest.tech/blog/codex-cloud-reusable-environments | 2026-11-06 |
| SC39 | Codex Cloud Tutorial: Setup, GitHub & Your First PR (proflead) | https://proflead.dev/posts/codex-cloud-tutorial/ | 2026-11-06 |
| SC40 | Codex Cloud (2026): How It Works, Limits, Always-On Options (Agent37) | https://www.agent37.com/blog/codex-cloud | 2026-11-06 |
| SC41 | Codex Cloud Exec Best-of-N: Running Multiple Solution Attempts (Daniel Vaughan) | https://codex.danielvaughan.com/2026/04/01/codex-cloud-exec-best-of-n-attempts/ | 2026-11-06 |
| SC42 | Codex Cloud Task Application: From Slack Dispatch to Reviewed Diff Merge (Daniel Vaughan) | https://codex.danielvaughan.com/2026/04/08/codex-cloud-task-application/ | 2026-11-06 |
| SC43 | Custom instructions with AGENTS.md (learn.chatgpt.com) | https://learn.chatgpt.com/docs/agent-configuration/agents-md | 2026-11-06 |
| SC44 | Codex Pricing (OpenAI; redirige a learn.chatgpt.com/docs/pricing.md) | https://developers.openai.com/codex/pricing.md | 2026-11-06 |
| SC45 | OpenAI Codex Pricing 2026 (Morph) | https://www.morphllm.com/codex-pricing | 2026-11-06 |
| SC46 | ChatGPT Work Tab Merges Into Chat as Codex Shares Usage Limits (ShiftDelete) | https://shiftdelete.net/en/chatgpt-work | 2026-11-06 |
| SC47 | Codex Is Now in ChatGPT: What Changed (Headroom) | https://extraheadroom.com/codex-in-chatgpt | 2026-11-06 |
| SC48 | Authentication (Codex docs; redirige a learn.chatgpt.com/docs/auth) | https://developers.openai.com/codex/auth | 2026-11-06 |
| SC49 | Codex device code auth and ChatGPT security (Luca Berton) | https://lucaberton.com/blog/codex-device-code-auth-chatgpt-security-2026/ | 2026-11-06 |
| SC50 | openai/codex (README en GitHub) | https://github.com/openai/codex | 2026-11-06 |
| SC51 | Non-interactive mode (Codex docs; redirige a learn.chatgpt.com/docs/non-interactive-mode) | https://developers.openai.com/codex/noninteractive | 2026-11-06 |
| SC52 | Codex CLI Guide 2026: Setup, Sandbox, AGENTS.md & MCP (Blake Crosley) | https://blakecrosley.com/guides/codex | 2026-11-06 |
| SC53 | Issue #6403: OAuth login de la extensión de Codex en github.dev / Codespaces | https://github.com/openai/codex/issues/6403 | 2026-11-06 |
| SC54 | Issue #5673: cannot complete authentication with "sign in with chatgpt" | https://github.com/openai/codex/issues/5673 | 2026-11-06 |
| SC55 | ChatGPT + GitHub: What the Integration Can (and Can't) Do in 2026 (Carly) | https://www.usecarly.com/blog/chatgpt-github-integration/ | 2026-11-06 |
| SC56 | ChatGPT GitHub app: how to connect GitHub to ChatGPT (Upsy) | https://upsy.ai/guides/chatgpt/github | 2026-11-06 |
| SC57 | ChatGPT Connectors (2026): Which Apps Connect and What Each Plan Gets (Justin McKelvey) | https://justinmckelvey.com/blog/chatgpt-connectors | 2026-11-06 |
| SC58 | github/github-mcp-server (README) | https://github.com/github/github-mcp-server | 2026-11-06 |
| SC59 | How to Connect GitHub to ChatGPT — via MCP (AnythingMCP) | https://anythingmcp.com/guides/connect-github-to-chatgpt | 2026-11-06 |
| SC60 | Deploying GitHub Projects with Vercel | https://vercel.com/docs/git/vercel-for-github | 2026-11-06 |
| SC61 | Environment variables (Vercel) | https://vercel.com/docs/environment-variables.md | 2026-11-06 |
| SC62 | Forwarding ports in your codespace (GitHub Docs) | https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace?tool=webui | 2026-11-06 |
| SC63 | OpenAI Codex (AI agent) (Wikipedia) | https://en.wikipedia.org/wiki/OpenAI_Codex_(AI_agent) | 2026-11-06 |
| SC64 | Advanced Configuration: adding utility files to the /api directory (Vercel) | https://vercel.com/docs/functions/configuring-functions/advanced-configuration | 2026-11-07 |
| SC65 | Functions API Reference (Vercel) | https://vercel.com/docs/functions/functions-api-reference | 2026-11-07 |

<!-- ===== FIN: conocimiento/05-codex-chatgpt-y-codespaces.md ===== -->

<!-- ===== INICIO: conocimiento/06-contexto-pagos-y-comercios-mx.md ===== -->

---
id: K06
titulo: "Contexto: pagos, comercios y personas en México"
resumen: "Cifras verificadas (INEGI, Banxico, DOF, Condusef y prensa seria) sobre efectivo, informalidad, costo de cobrar con tarjeta, uso real de CoDi, lo que cambia el 14-dic-2026, fraude, brecha digital y Coyoacán; léelo al definir problema, 'por qué ahora', personas y datos del pitch."
responde:
  - "¿Qué tan dominante es el efectivo en México y hacia dónde va?"
  - "¿Qué tan grande es la informalidad y cuántos negocios son micro?"
  - "¿Cuánto le cuesta a un comercio pequeño cobrar con tarjeta frente a CoDi?"
  - "¿Cuánto se usa CoDi realmente y por qué no despegó?"
  - "¿Qué cambia exactamente el 14 de diciembre de 2026 y qué es la Ley de Economía Digital?"
  - "¿Qué fraudes frenan los pagos digitales y cómo diseñar confianza en un producto?"
  - "¿Qué barreras digitales tienen las personas mayores y qué canal conviene usar?"
  - "¿Qué hay en la Utopía Elena Poniatowska, Coyoacán y la CDMX que sirva al producto?"
  - "¿Qué personas, datos y oportunidades de IA + CoDi usar en el pitch?"
actualizado: 2026-11-07
confianza: media
fuentes: [SD01, SD02, SD03, SD04, SD05, SD06, SD07, SD08, SD09, SD10, SD11, SD12, SD13, SD14, SD15, SD16, SD17, SD18, SD19, SD20, SD21, SD22, SD23, SD24, SD25, SD26, SD27, SD28, SD29, SD30, SD31, SD32, SD33, SD34, SD35, SD36, SD37, SD38, SD39, SD40, SD41, SD42, SD43, SD44, SD45, SD46, SD47, SD48, SD49, SD50, SD51, SD52, SD53, SD54, SD55, SD56, SD57, SD58, SD59, SD60, SD61, SD62, SD63]
---

# K06 · Contexto: pagos, comercios y personas en México

## TL;DR
- **El efectivo manda en lo cotidiano:** ~85 % de los adultos usa sobre todo efectivo en compras de hasta $500 y solo 4.4 % usa transferencias o apps (2024) [SD10, SD18].
- **El mercado es informal y micro:** 54.3 % de las personas ocupadas (32.6 millones) es informal (sep-2026) [SD20]; 95.4 % de los negocios tiene de 0 a 10 personas (2023) [SD21].
- **Cobrar con tarjeta cuesta un porcentaje; CoDi no:** una miscelánea paga de 1.15 % a 3.95 % por cobro con débito, y con Clip 3.00–3.60 % (jul-2026) [SD24]; CoDi no cobra comisión y el dinero llega en segundos (2026) [SD31].
- **CoDi existe, pero casi no se usa:** 21.8 M cuentas validadas y solo 2.5 M han pagado alguna vez (sep-2025) [SD33]; 21.5 M operaciones en casi 7 años contra 833.5 M de SPEI en un solo mes (2026) [SD32, SD12].
- **Por qué ahora:** a más tardar el **14-dic-2026** todas las apps bancarias deben homologar sus transferencias (celular de 10 dígitos, resumen con nombre del beneficiario, comprobante con rastreo) y procesar los cobros CoDi con el mismo estándar [SD01, SD03, SD06]; además, el Congreso aprobó la Ley de Economía Digital (oct-2026) [SD10, SD11].
- **La confianza es el cuello de botella:** 2.48 M reclamaciones por posible fraude en un semestre (2025) [SD38] y 39 % no cree que su dinero esté seguro en el banco (2024) [SD18]. Gana el producto que confirma el pago real, entrega recibo y habla por WhatsApp o voz.

## K06.1 · Efectivo vs. pagos digitales en México
**Cuánto se usa el efectivo (ENIF 2024, INEGI-CNBV, publicada en marzo de 2025)**
- Compras de hasta $500: ~85 % de los adultos usa sobre todo efectivo (85.2 % según [SD10]; 85.3 % según [SD18]). Compras mayores a $500: 73.5 % [SD18].
- Transferencias o apps en compras de hasta $500: de 1.6 % (2021) a 4.4 % (2024) [SD10]. En compras mayores a $500 subieron 4.8 puntos frente a 2021 [SD16].
- 76.5 % de las personas de 18 a 70 años tiene algún producto financiero y 63.0 % una cuenta de ahorro formal; entre quienes tienen cuenta, el uso de app pasó de 54.3 % (2021) a 69.1 % (2024) [SD16].

**Por qué se prefiere el efectivo (Banxico, estudio de efectivo 2024, localidades de 50 mil habitantes o más)** [SD17]
- 91 % suele pagar sus gastos diarios en efectivo; solo 3 % usa pagos electrónicos o SPEI.
- Razones: es práctico y rápido (52 %), es el único medio que tienen (16 %), lo sienten más seguro (13 %).

**Tendencia**
- SPEI registró 833.5 millones de operaciones en septiembre de 2026, por ~21.6 billones de pesos (Banxico, citado por la prensa) [SD12].
- Una proyección de Banxico citada por la prensa indica que SPEI podría superar en volumen a los pagos con tarjeta a finales de 2026 [SD19].
- Meta de la política de inclusión financiera: pagos digitales en 50 % del gasto de consumo privado en 2030 [SD61].

**Recomendación (lectura para el pitch):** la gente ya se transfiere dinero entre personas; el "último metro" (pagar en el puesto, la fonda o al prestador de servicios) sigue en efectivo.

## K06.2 · Economía informal y micronegocios
**Informalidad laboral (ENOE, INEGI, septiembre de 2026; publicada el 22-oct-2026)** [SD20]
- Tasa de informalidad laboral (TIL1): **54.3 %** de la población ocupada, es decir, **32.6 millones** de personas.
- Ocupación en el sector informal (negocios de los hogares sin registro): 17.6 millones (29.4 %).
- Población ocupada: 60.0 millones; desocupación: 2.8 %.

**Micronegocios (Censos Económicos 2024, INEGI; dato 2023)**
- País: 7,093,631 establecimientos y 36.6 millones de personas ocupadas. Los micro (0 a 10 personas) son **95.4 %** de las unidades y 41.4 % del empleo del sector privado [SD21].
- Solo 1.44 millones de unidades usaron internet en su actividad (≈26 % si la base son 5.47 millones de unidades; cálculo propio, ⚪ INEGI no indica la base) [SD21].
- CDMX: 456,102 establecimientos; los micro son 93.4 % de las unidades y 26.1 % del empleo [SD22]. El comercio al por menor es 48.4 % de las unidades (205,511) [SD23]. Coyoacán concentra 5.3 % de las unidades de la ciudad (≈22,500, cálculo propio) [SD23].
- La Asociación de Bancos de México (ABM) ubica a los micronegocios en 95.5 % de las empresas y 41.5 % del empleo (2026) [SD37].

**Implicaciones**
- Para quien no está inscrito en el SAT, la nueva cuenta Nivel 2 Bis (sin RFC; ver K06.5) baja la barrera para recibir pagos digitales [SD09].
- El segmento coincide con la visión de Pey de procesar pagos de negocios informales (contexto del evento; ⚪ no verificado de forma externa).

**Recomendación:** frente a usuarios y jueces, hablar de "negocios de barrio" o "changarros" en lugar de "informales", porque "informal" puede sonar a ilegal.

## K06.3 · Costo de cobrar con tarjeta para un comercio pequeño
**Tasa de descuento** (lo que paga el comercio por cada venta; Banxico la publica por giro)
- Miscelánea con **débito**, julio de 2026: de **1.15 %** a **3.95 %** según el adquirente; Clip 3.00–3.60 %; varios agregadores 3.50 % [SD24, SD25]. ⚪ No verifiqué si incluyen IVA.
- Con **crédito** (tabla por giro; ⚪ periodo no indicado, archivo de 2025; confianza media): restaurantes 2.55–5.84 %; misceláneas 2.29–3.60 % [SD63].
- Ejemplo comercial: Clip anuncia 3.6 % + IVA por cobro, dinero disponible a partir de 24 horas y sin renta mensual (jul-2026) [SD26]. Cálculo propio: vender $1,000 diarios con tarjeta cuesta ≈$41.76 al día, ≈$1,250 en 30 días.

**Por qué es caro**
- Cuotas de intercambio ponderadas: 0.45 % en débito y 1.30 % en crédito, arriba de economías comparables (Unión Europea: 0.2 % y 0.3 %) (jun-2024 a jun-2025) [SD27].
- Banxico y la CNBV proponen topes a esas cuotas (2ª versión, 27-ago-2026): 1.30 % en crédito y $10.80 por operación en débito, con transición de 3 años; **en consulta, no vigente** [SD28, SD09].

**Señales del mercado**
- Tiendas 3B suspendió tarjetas en algunas sucursales al perder la cuota de intercambio cero y probó CoDi (sep-2026) [SD29].
- Quien traslada la comisión suele cobrar 3 % a 5 % extra; Profeco lo considera ilegal (2025) [SD30].
- Analistas advierten un "golpe de flujo de caja" para negocios de márgenes estrechos al migrar a digital (2026) [SD61].

**Alternativa:** CoDi no cobra comisión por operación, funciona 24/7 y el dinero llega en segundos (2026) [SD31]; el Gobierno lo reiteró al presentar la Ley de Economía Digital [SD15].

**Recomendación:** en el pitch, traducir porcentajes a pesos del día ("$40 diarios que se quedan en tu bolsa").

## K06.4 · CoDi: adopción real y por qué no despegó
CoDi (Cobro Digital) es la plataforma de Banxico, lanzada el 30-sep-2019, para cobrar con QR o NFC sobre SPEI y sin comisión; su meta era 18.1 M usuarios en 2020 [SD33, SD31, SD01].

**Números**
- Sep-2025: 21.79 M cuentas validadas (a la baja); solo **2.47 M** han pagado alguna vez y **1.08 M** han cobrado (Banxico) [SD33]: ≈11 % pagó y ≈5 % cobró (cálculo propio).
- Oct-2019 a jul-2026: 21.5 M operaciones acumuladas; 34.8 M apps habilitadas; DiMo sin datos actualizados (Banxico) [SD32]. Como SPEI hizo 833.5 M operaciones solo en sep-2026 [SD12], todo CoDi equivale a ≈2.6 % de un mes de SPEI (cálculo propio).
- ENIF 2024: 38.0 % conoce CoDi y 12.8 % de ellos lo ha usado (≈4.9 % de los adultos); DiMo: 18.5 % y 6.8 % (≈1.3 %) (cálculos propios) [SD16].

**Por qué no despegó**
- Incentivos: los bancos ganan con las comisiones de tarjeta y CoDi no cobra; la Presidenta dijo "la banca no quiere que se use" (2025) [SD33].
- Poca promoción del sector (2026) [SD32] y verificación de identidad engorrosa [SD36].
- Experiencia: en una prueba de lanzamiento solo 2 de 8 asociaciones de cuenta se validaron y las apps probadas no avisaban del pago (2019) [SD35].
- Uso concentrado en altos ingresos; Pix (Brasil) y SINPE Móvil (Costa Rica) ganaron con bajo costo de adopción, efectos de red, integración coordinada y difusión temprana (2025) [SD34]. Mercado Pago dejó su pago con QR en 2023 [SD14].
- Gobierno y ABM acordaron relanzar CoDi y DiMo; su fusión es un rumor no confirmado (abr-2026) [SD62].

**Recomendación:** no vender "CoDi", sino el beneficio: "cobra sin comisión y sabe al instante que ya te pagaron".

## K06.5 · Qué cambia el 14 de diciembre de 2026
**Qué es:** la **fecha límite** para que bancos y participantes del SPEI cumplan las Circulares 9/2026 y 10/2026 de Banxico (DOF, 17-jun-2026) y sus Guías de homologación de transferencias móviles [SD01, SD02, SD09]. La 9/2026 ya rige; el 14-dic es su plazo de cumplimiento (segundo transitorio) [SD01], no la entrada en vigor de una ley.

**Qué deberán tener todas las apps**
1. Máximo cuatro etapas: botón visible de "Transferencias"; captura (cuenta, destinatario, monto, concepto); resumen con nombre del beneficiario, importe y banco; resultado con comprobante, clave de rastreo y liga al CEP [SD04, SD05, SD06].
2. Celular de 10 dígitos como identificador: obligatorio en cuentas de nivel 2 a 4 si el titular lo pide, gratuito, con aviso en un día hábil; la CLABE sigue [SD03].
3. **CoDi:** procesar los mensajes de cobro conforme a las Guías y mantener apps que permitan atenderlos [SD01].
4. Sanciones a quien incumpla [SD06]; alcance: más de 80 M personas que transfieren [SD07].

**En paralelo**
- Circular 11/2026: cuenta Nivel 2 Bis de hasta 15,000 UDIs al mes (≈$130–132 mil; hasta 3,000 UDIs en efectivo), sin RFC y con apertura remota [SD09, SD08, SD37]. ⚪ Fecha de oferta en cada banco: no verificada.
- Ley de Economía Digital para Pagos Digitales y Electrónicos: el Ejecutivo firmó el decreto el 4-nov-2026 y su texto ya aparece en el SIDOF; entra en vigor al día siguiente de su publicación en el DOF (⚪ la copia consultada no muestra la fecha de publicación) [SD64]. Transitorios tercero y cuarto: 15 días hábiles para la determinación de sectores por SHCP y otros 15 tras publicarla para reglas sectoriales. No acredita una obligación general de QR en CDMX el 19-nov. Artículo 19-IV: disposiciones Banxico/CNBV sobre QR en terminales [SD64]. ⚪ Sectores y calendarios concretos: pendientes de verificar.

**Recomendación (por qué ahora):** ayudar al comercio a adoptar cobros digitales; distinguir el plazo bancario del 14-dic de las reglas sectoriales pendientes. El plazo normativo no demuestra implementación efectiva en todas las apps.

## K06.6 · Fraude y desconfianza
**Datos (Condusef y ENIF)**
- Ene–jun 2025: 2.48 M reclamaciones por posible fraude (+5.2 % anual): $10,714 millones reclamados y $2,556 millones devueltos (≈24 %, cálculo propio); el fraude digital supera 60 % de las quejas [SD38].
- Ene–sep 2025: 3.82 M reclamaciones (~14 mil diarias); las personas de 60 años o más suman 32 % de las quejas por posible fraude (⚪ año del dato no indicado) [SD39].
- CDMX 2025: 40,688 quejas, 31.6 % ligadas a fraude [SD40].
- ENIF 2024: 39 % no cree que su dinero esté seguro en bancos y 46.7 % dice que no resuelven sus quejas [SD18].

**Modalidades que golpean al comercio**
- Comprobante falso: imagen o PDF de una transferencia que nunca llegó o que se revierte; circulan plantillas. Se verifica con el CEP de Banxico (clave de rastreo) o revisando el saldo real (2026) [SD41].
- QR falso: la SSC-CDMX alertó por códigos en espacios públicos que llevan a sitios falsos (2025) [SD42].

**Protecciones recientes**
- MTU: límite de monto que fija el usuario, obligatorio desde el 1-oct-2025; arriba de él se pide autenticación extra [SD43].
- DiMo muestra el nombre del destinatario antes de autorizar [SD03]; las Guías exigen resumen con nombre del beneficiario y comprobante con rastreo [SD06].

**Recomendación (diseño de confianza)**
1. Nunca validar con captura: solo cuenta el pago confirmado por webhook o consulta de estado de Pey (según K03.4 y K03.5).
2. Recibo automático (WhatsApp o voz): monto, comercio, hora y clave de rastreo.
3. QR dinámico por venta, no un QR estático pegado.
4. Anunciar en voz alta: "Cobro de $85 para Frutas Lupita".
5. Botón "¿Ya me pagaron?" que consulte el estado real.

## K06.7 · Brecha digital: personas mayores, voz y WhatsApp
**Conectividad (ENDUTIH 2025, INEGI, publicada el 16-jun-2026)**
- 86.1 % de las personas de 6 años o más usa internet (104.9 M); urbano 88.9 % y rural 75.2 %; 84.6 % usa celular [SD44]. 97.3 % de los usuarios se conecta con smartphone [SD45].
- Por edad: 55–64 años, 78.8 %; 65–74 años, 57.8 %; 75 o más, 30.3 % [SD45].
- 17.0 M no usan internet; la razón principal es no saber usarlo (7.5 % de la población, más de la mitad de los no usuarios, cálculo propio) [SD45].
- Usos: comunicarse 93.0 %, operaciones bancarias 32.9 %, pagos 35.6 % (lectura de gráfica; confianza media) [SD45].

**Personas mayores**
- Solo 21 % de los hombres y 15 % de las mujeres de 60 años o más hacen pagos digitales; ~10 % usa apps bancarias y ~47 % opera en sucursal o cajero (ENIF 2024, citada por la prensa) [SD47].
- Suelen depender de familiares para operar [SD48] y son 32 % de las quejas por posible fraude [SD39].
- Pensión del Bienestar (65 años o más): $6,400 por bimestre en 2026, depositada en tarjeta del Banco del Bienestar [SD49].

**WhatsApp y voz**
- WhatsApp es la plataforma más usada: 95.3 % de los usuarios (reporte Digital 2024 citado por la prensa; ⚪ base exacta no verificada) [SD46].
- ⚪ No encontré un dato verificado sobre preferencia por notas de voz en México; conviene validarlo observando a usuarios en el evento.

**Recomendación:** canal WhatsApp + voz; una sola acción por pantalla; letra grande; confirmación hablada ("ya llegó tu dinero"); opción de mandar copia del recibo a un familiar.

## K06.8 · Contexto local: Coyoacán, Barrio de San Lucas y la Utopía
**Utopía Elena Poniatowska Amor**
- Av. Miguel Hidalgo 128, Barrio de San Lucas, Coyoacán [SD50]. Abrió en agosto de 2026 con 242 MDP de inversión en ~20,000 m² del predio "El Parián", abandonado más de 20 años [SD50, SD51, SD52]. San Lucas es un barrio originario [SD52].
- Servicios: comedor, lavandería, CADI, Casa de Día para personas mayores, consultorios gratuitos, centro comunitario para Parkinson, alberca semiolímpica, gimnasio, Museo Coyote, centro de transformación digital (150 computadoras e impresoras 3D), tortillería de maíz nativo y agencia de empleo [SD50, SD51].
- Alcance estimado: ~130 mil habitantes de al menos 17 colonias [SD50, SD52].

**Coyoacán**
- 22 mercados públicos (2025) [SD53].
- 14.7 % de sus habitantes tiene 65 años o más, la proporción más alta entre alcaldías (nota de 2024; ⚪ fuente primaria no indicada) [SD54].

**CDMX**
- 339 mercados públicos donde trabajan ~300 mil personas (2025) [SD55]; 1,367 tianguis (Sedeco, 2024) [SD56] con ~50 mil tianguistas [SD57].
- Mercomuna (vales de despensa canjeables en comercios de barrio): 335 mil familias en 2025 y más de 30 mil comercios registrados (dic-2025); meta de 700 mil familias en 2026 [SD58, SD59]. ⚪ Formato del vale y pago al comercio: no verificados.
- 2021: Sedeco y Mercado Pago anunciaron tarjeta y QR en 335 mercados y 51 tianguis, con meses sin comisión; ⚪ no encontré resultados [SD60].
- ⚪ No encontré un programa vigente de la CDMX para que comercios cobren con CoDi.

**Usuarios potenciales cerca:** personas mayores de la Casa de Día, jóvenes del centro digital (posibles "embajadores"), familias del comedor y la lavandería, y comercios de la zona (⚪ mercados cercanos no verificados).

## K06.9 · Personas (situaciones típicas; personas ficticias)
| Persona | Dolores | Trabajos por hacer | Momento de pago |
|---|---|---|---|
| **Tianguista de fruta** (vende 3 días a la semana en distintos tianguis) | Montos chicos ($20–$150, ilustrativo); terminal cara para su volumen (débito hasta 3.95 % [SD24]); "ya te transferí" con captura [SD41]; señal intermitente | Cobrar en segundos, saber que sí llegó, cuadrar la venta del día | Fila de cuatro clientes; uno pregunta "¿le transfiero?" y enseña su pantalla |
| **Fonda familiar** (menú del día, clientes oficinistas) | Clientes sin efectivo; con crédito un restaurante paga hasta 5.84 % (⚪ periodo) [SD63]; cuentas divididas; pedidos por WhatsApp | Cobrar mesas y pedidos para llevar, cerrar caja sin errores | Al terminar la comida, varios pagan por separado al mismo tiempo |
| **Prestadora de servicios a domicilio** (limpieza, uñas o costura) | Comprobante falso o reversa cuando ya se fue [SD41]; sin RFC; "luego te pago" | Mandar el cobro antes o al terminar, recordar pendientes, demostrar ingresos (cuenta Nivel 2 Bis [SD09]) | En la puerta, al terminar el servicio |
| **Cliente adulto mayor** (usuario de la Casa de Día) | Cobra su pensión en tarjeta [SD49]; casi no usa apps (~10 % de 60+ [SD47]); miedo al fraude (32 % de quejas [SD39]); depende de sus hijos | Pagar sin equivocarse, saber a quién y cuánto paga, tener un comprobante que entienda | En el puesto, sin lentes y con el vendedor apurado |

## K06.10 · Diez datos para el pitch
Confianza: alta en datos de INEGI, Banxico y DOF; media en cifras citadas por la prensa.
1. ~85 % de los adultos usa sobre todo efectivo en compras de hasta $500 — ENIF 2024 [SD10, SD18].
2. Solo 4.4 % usa transferencias o apps en esas compras (1.6 % en 2021) — ENIF 2024 [SD10].
3. 54.3 % de las personas ocupadas (32.6 millones) trabaja en la informalidad — ENOE, sep-2026 [SD20].
4. 95.4 % de los negocios del país son micro (0 a 10 personas) — Censos Económicos 2024, dato 2023 [SD21].
5. Una miscelánea paga hasta 3.95 % por cobro con débito; Clip, 3.00–3.60 % — Banxico, jul-2026 [SD24].
6. CoDi: 21.8 M cuentas validadas, pero solo 2.5 M han pagado alguna vez — Banxico, sep-2025 [SD33].
7. 21.5 M operaciones CoDi en casi 7 años contra 833.5 M operaciones SPEI en un solo mes — Banxico, jul-2026 y sep-2026 [SD32, SD12].
8. 2.48 M reclamaciones por posible fraude en un semestre; los bancos devolvieron ~24 % del monto — Condusef, ene–jun 2025 [SD38].
9. Solo 57.8 % de las personas de 65 a 74 años usa internet (30.3 % de 75 o más) — ENDUTIH 2025 [SD45].
10. 14-dic-2026: fecha límite para que todas las apps homologuen transferencias y procesen cobros CoDi — Banxico, Circular 9/2026 [SD01].

**Recomendación:** abrir con los datos 1, 6 y 10 (problema, paradoja y urgencia) y cerrar con el 5 traducido a pesos.

## K06.11 · Oportunidades donde IA + CoDi resuelven algo real
**Recomendación:** ordenadas por impacto y factibilidad en 4 horas. Lo técnico sale de K03 (Pey) y K04 (OpenAI); no lo verifiqué aparte.

| # | Idea | Dolor (dato) | Impacto | Factible en 4 h | Dependencias |
|---|---|---|---|---|---|
| 1 | **"Cóbrale" por voz o WhatsApp:** dictas "cóbrale 85 de jitomate"; la IA arma el cobro CoDi (QR dinámico) y avisa "ya llegó" con recibo | Comisión de tarjeta [SD24]; no saber usar apps [SD45] | Alto | Alta | QR + webhook de Pey (K03.4, K03.5); voz (K04) |
| 2 | **Detector de comprobante falso:** la IA lee monto y clave de rastreo de la captura y los compara con cobros confirmados | Comprobantes falsos [SD41]; fraude [SD38] | Alto | Alta (solo cobros propios) | Estado y `trackingKey` en Pey (K03.4) |
| 3 | **Recibo hablado + modo familiar:** audio y letra grande, con copia opcional a un familiar | Personas mayores [SD47, SD39] | Medio-alto | Alta | WhatsApp o web simple |
| 4 | **Corte de caja conversacional:** "¿cuánto vendí hoy?" + resumen diario | Sin registros; historial para crédito [SD09] | Medio | Alta | Datos locales |
| 5 | **Alta guiada:** la IA explica Nivel 2 Bis, alta del celular y primer cobro de prueba | Registro engorroso [SD35, SD36] | Medio | Media | ⚪ oferta de Nivel 2 Bis por banco |
| 6 | **Cobro a domicilio:** cobro al celular del cliente, QR o liga por WhatsApp + recordatorio | "Luego te pago" | Medio | Media | `POST /codi/pn`, vigencia y liga de pago (K03.4, K03.5); ⚪ requisitos del celular del cliente |

**Recomendación de MVP:** unir 1 + 2 + 3: dictar → QR → un juez paga con su app → "ya llegó" en voz → recibo. Pey no tiene sandbox (K03.6): si algo falla, plan B de K03.6 con "SIMULACIÓN" visible (AGENTS.md). Fuera de alcance: terminales, NFC, crédito y facturación.

## Fuentes
| ID | Título | URL | Consultado |
|---|---|---|---|
| SD01 | DOF · Circular 9/2026 de Banxico (modifica la 14/2017; homologación de transferencias móviles) | https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862 | 2026-11-06 |
| SD02 | SIDOF · Circular 10/2026 de Banxico (modifica la 3/2012), DOF 17-jun-2026 | https://sidof.segob.gob.mx/notas/5790863 | 2026-11-06 |
| SD03 | Expansión · La CLABE no desaparece: Banco de México cambiará las transferencias (6-sep-2026) | https://expansion.mx/finanzas-personales/2026/09/06/clabe-no-desaparece-banco-de-mexico-cambiara-transferencias | 2026-11-06 |
| SD04 | N+ · Banxico ordena cambios obligatorios en transferencias antes de que termine 2026 | https://www.nmas.com.mx/economia/banxico-cambia-las-reglas-estas-son-modificaciones-transferencias-antes-termine-el-2026/ | 2026-11-06 |
| SD05 | Grupo Animal · Transferencias bancarias sin CLABE: las nuevas reglas de Banxico | https://grupoanimal.mx/explicaciones/transferencias-bancarias-clabe-nuevas-reglas-banxico | 2026-11-06 |
| SD06 | Ruptura360 · Banxico le dice adiós a la CLABE obligatoria (10-sep-2026) | https://ruptura360.mx/periodismo-de-servicio/banxico-nuevas-reglas-transferencias-bancarias-2026/ | 2026-11-06 |
| SD07 | DPL News · Banxico publica guías para homologar experiencia de usuario en transferencias (18-jun-2026) | https://dplnews.com/banxico-publica-guias-para-homologar-experiencia-de-usuario-en-transferencias-electronicas/ | 2026-11-06 |
| SD08 | Bloomberg Línea · Banxico emite medidas para simplificar pagos digitales y ampliar límite en cuentas sin registro ante el SAT (jun-2026) | https://www.bloomberglinea.com/latinoamerica/mexico/banxico-emite-medidas-para-simplificar-pagos-digitales-y-ampliar-limite-en-cuentas-sin-registro-ante-el-sat/ | 2026-11-06 |
| SD09 | BBVA Research · México: regulación financiera, octubre 2026 | https://www.bbvaresearch.com/wp-content/uploads/2026/10/20261015_MexicoRegFinOct2026-1.pdf | 2026-11-06 |
| SD10 | Expansión · Diputados aprueban Ley de Economía Digital (6-oct-2026) | https://expansion.mx/economia/2026/10/06/diputados-aprueban-ley-de-economia-digital | 2026-11-06 |
| SD11 | Excélsior · Así será la transición de pagos con la ley de economía digital | https://www.excelsior.com.mx/nacional/sera-transicion-pagos-con-ley-economia-digital | 2026-11-06 |
| SD12 | Xataka México · El Senado aprueba una nueva ley de pagos digitales (21-oct-2026) | https://www.xataka.com.mx/legislacion-y-derechos/mexico-quiere-que-pagues-tarjeta-transferencias-qr-senado-aprueba-nueva-ley-pagos-digitales | 2026-11-06 |
| SD13 | Expansión · Ley de Economía Digital no será draconiana, dicen banqueros (28-oct-2026) | https://expansion.mx/economia/2026/10/28/ley-de-economia-digital-no-sera-draconiana-la-implementacion-de-pagos-digitales-sera-paulatina-dicen-banqueros | 2026-11-06 |
| SD14 | DPL News · FinTech México respalda Ley de Pagos Digitales, pero plantea reservas sobre el QR (21-sep-2026) | https://dplnews.com/?p=330888 | 2026-11-06 |
| SD15 | Por Esto · Gobierno plantea pagos con CoDi sin comisiones y cuentas de hasta 135 mil pesos (24-sep-2026) | https://www.poresto.com/mexico/2026/9/24/ley-de-economia-digital-gobierno-plantea-pagos-con-codi-sin-comisiones-y-cuentas-de-hasta-135-mil-pesos.html | 2026-11-06 |
| SD16 | INEGI-CNBV · Comunicado 49/25, ENIF 2024 (13-mar-2025) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enif/ENIF2024_CP.pdf | 2026-11-06 |
| SD17 | El Financiero · Víctor Piz, "Cash: el peso del efectivo en México" (30-may-2025) | https://www.elfinanciero.com.mx/opinion/victor-piz/2025/05/30/cash-el-peso-del-efectivo-en-mexico/ | 2026-11-06 |
| SD18 | Publimetro · 40 % de mexicanos cree que su dinero no está seguro en bancos (mar-2025) | https://www.publimetro.com.mx/noticias/2025/03/14/desconfianza-total-40-de-mexicanos-cree-que-su-dinero-no-esta-seguro-en-bancos/ | 2026-11-06 |
| SD19 | IDC Online · SPEI, cerca de superar a las tarjetas como medio de pago digital en 2026 (14-ago-2026) | https://idconline.mx/finanzas/2026/08/14/spei-cerca-de-superar-a-las-tarjetas-como-medio-de-pago-digital-en-mexico-durante-2026 | 2026-11-06 |
| SD20 | INEGI · Indicadores de ocupación y empleo, septiembre de 2026 (22-oct-2026) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/iooe/IOE2026_10.pdf | 2026-11-06 |
| SD21 | INEGI · Censos Económicos 2024, resultados definitivos (24-jul-2025) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/ce/CE2024_def.pdf | 2026-11-06 |
| SD22 | INEGI · Censos Económicos 2024, resultados definitivos Ciudad de México | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/ce/CE_2024_Def_CdMx.pdf | 2026-11-06 |
| SD23 | INEGI · Censos Económicos 2024, monografía Ciudad de México | https://www.inegi.org.mx/contenidos/programas/ce/2024/doc/mcdmx_ce24.pdf | 2026-11-06 |
| SD24 | Banxico · Tasas de descuento con tarjeta de débito, giro Miscelánea (julio 2026) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-debito-por-gir/%7BCE998D24-7B96-F2C4-AF17-C29673DC35D2%7D.pdf | 2026-11-06 |
| SD25 | Banxico · Tasas de descuento en tarjetas (información vigente a julio de 2026) | https://www.banxico.org.mx/servicios/tasas-descuento-tarjetas-banc.html | 2026-11-06 |
| SD26 | Tiendanube · Comisiones de Clip en 2026 (14-jul-2026; contenido comercial) | https://www.tiendanube.com/mx/blog/clip | 2026-11-06 |
| SD27 | Diario de Yucatán (El Universal) · Cuotas cobradas a pagos con tarjeta son las más altas (8-ene-2026) | https://www.yucatan.com.mx/mexico/2026/01/08/cuotas-cobradas-a-pagos-con-tarjeta-son-las-mas-altas.html | 2026-11-06 |
| SD28 | Expansión · Banxico y CNBV suavizan propuesta de cuotas por pagos con tarjeta (27-ago-2026) | https://expansion.mx/economia/2026/08/27/banxico-cnbv-suaviza-propuesta-cuotas-por-pagos-con-tarjeta | 2026-11-06 |
| SD29 | El Imparcial · ¿Por qué Tiendas 3B suspendió el pago con tarjetas? (11-sep-2026) | https://www.elimparcial.com/mexico/2026/09/11/por-que-tiendas-3b-suspendio-el-pago-con-tarjetas/ | 2026-11-06 |
| SD30 | Xataka México · Bancos aceptan bajar costos por pagos con tarjeta a tienditas, con una condición (25-nov-2025) | https://www.xataka.com.mx/banca-digital/bancos-aceptan-bajar-costos-pagos-tarjeta-a-tienditas-mexico-solo-condicion | 2026-11-06 |
| SD31 | Expansión · ¿Te cobran comisión al aceptar tarjeta? Banxico tiene una alternativa (9-abr-2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SD32 | Expansión · Ley de economía digital: pagos con CoDi y DiMo (18-sep-2026) | https://expansion.mx/economia/2026/09/18/sheinbaum-ley-economia-digital-pagos-codi-dimo | 2026-11-06 |
| SD33 | La Razón · Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025) | https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/ | 2026-11-06 |
| SD34 | NBER WP 34280 · Drivers of Digital Payment Adoption: Lessons from Brazil, Costa Rica, and Mexico (2025) | https://ideas.repec.org/p/nbr/nberwo/34280.html | 2026-11-06 |
| SD35 | Xataka México · Probamos CoDi: lo que nos encanta y lo que odiamos (1-oct-2019) | https://www.xataka.com.mx/banca-digital/probamos-codi-que-nos-encanta-que-odiamos-que-tiene-que-resolver-banxico-para-su-implementacion-mexico | 2026-11-06 |
| SD36 | Excélsior · José Yuste, "Cruzada bancaria: a digitalizar" (29-may-2026) | https://www.excelsior.com.mx/opinion/jose-yuste/cruzada-bancaria-digitalizar | 2026-11-06 |
| SD37 | ABM · Comunicado de prensa 14/2026 (26-ago-2026) | https://abm.org.mx/sala-de-prensa/img/fotogaleria/Comunicado_de_prensa_ABM_26082026.pdf | 2026-11-06 |
| SD38 | Vanguardia · Más de 2.4 millones de fraudes bancarios en México durante 2025 (3-nov-2025) | https://vanguardia.com.mx/noticias/mexico/crece-la-estafa-digital-mas-de-24-millones-de-fraudes-bancarios-en-mexico-durante-2025-MK17956794 | 2026-11-06 |
| SD39 | Xataka México · Fraudes bancarios encontraron su objetivo vulnerable: adultos mayores (19-abr-2026) | https://www.xataka.com.mx/banca-digital/fraudes-bancarios-mexico-encontraron-su-objetivo-vulnerable-adultos-mayores/amp | 2026-11-06 |
| SD40 | La Crónica · Asociados a fraudes, 30 % de los expedientes en Condusef (17-mar-2026) | https://www.cronica.com.mx/negocios/2026/03/17/asociados-a-fraudes-30-por-ciento-de-los-expedientes-en-condusef/ | 2026-11-06 |
| SD41 | Grupo Animal · ¿Recibiste una supuesta transferencia bancaria? Así verifícala (28-jul-2026) | https://grupoanimal.mx/explicaciones/transferencia-bancaria-falsa-comprobante | 2026-11-06 |
| SD42 | UnoTV · Policía Cibernética de CDMX alerta por fraudes con QR (23-may-2025) | https://www.unotv.com/estados/ciudad-de-mexico/policia-cibernetica-de-cdmx-alerta-por-fraudes-con-qr-protegete-asi/ | 2026-11-06 |
| SD43 | El Cronista · Qué ocurre si supera el límite del MTU en transferencias (1-oct-2025) | https://www.cronista.com/mexico/finanzas-economia/ya-no-hay-tiempo-que-ocurre-si-supera-el-limite-del-mtu-en-transferencias-bancarias-a-partir-de-este-1-de-octubre | 2026-11-06 |
| SD44 | INEGI · ENDUTIH 2025, comunicado de prensa (16-jun-2026) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25.pdf | 2026-11-06 |
| SD45 | INEGI · ENDUTIH 2025, presentación de resultados | https://www.inegi.org.mx/contenidos/programas/endutih/2025/doc/presentacion_endutih2025.pdf | 2026-11-06 |
| SD46 | Excélsior · Día de las Redes Sociales en México (29-jun-2025) | https://www.excelsior.com.mx/hacker/redes-sociales-en-mexico-2025/1724290 | 2026-11-06 |
| SD47 | Xataka México · México quiere despedirse del efectivo en carreteras y gasolineras (27-abr-2026) | https://www.xataka.com.mx/politica/mexico-quiere-despedirse-efectivo-carreteras-gasolineras-problema-que-millones-necesitan/amp | 2026-11-06 |
| SD48 | Xataka México · Solo 4 de cada 10 personas pagan con tarjeta o transferencia (28-nov-2025) | https://www.xataka.com.mx/banca-digital/solo-4-cada-10-personas-mexico-pagan-tarjeta-transferencia-motivo-claro-no-confian-instituciones | 2026-11-06 |
| SD49 | UnoTV · Pensión del Bienestar 2026: 6,400 pesos (19-ene-2026) | https://www.unotv.com/pensiones/pension-del-bienestar-2026-apellidos-que-reciben-6400-pesos-del-19-al-23-de-enero/ | 2026-11-06 |
| SD50 | Chilango · Utopía Elena Poniatowska abre en Coyoacán: servicios (ago-2026) | https://www.chilango.com/ciudad/utopia-elena-poniatowska-amor-abre-sus-puertas-en-coyoacan-estos-servicios-ofrecera/ | 2026-11-06 |
| SD51 | La Crónica · Abre en Coyoacán la Utopía Elena Poniatowska con inversión de 242 mdp (9-ago-2026) | https://www.cronica.com.mx/metropoli/2026/08/09/abre-en-coyoacan-la-utopia-elena-poniatowska-con-inversion-de-242-mdp/ | 2026-11-06 |
| SD52 | Diario de México · Utopía Elena Poniatowska Amor, inaugurada en Coyoacán (9-ago-2026) | https://www.diariodemexico.com/mi-ciudad/abandono-esperanza-es-utopia-elena-poniatowska-amor-inaugurada-por-clara-brugada-en-coyoacan | 2026-11-06 |
| SD53 | Alcaldía Coyoacán · Boletín 037, inversión en mercados (22-ene-2025) | https://coyoacan.cdmx.gob.mx/boletines/files/2024_2027/BOLET%C3%8DN%20037%20COYOAC%C3%81N%2C%20QUIEN%20M%C3%81S%20INVIERTE%20EN%20MEJORAMIENTO%20DE%20MERCADOS%20-%2022ENE25.pdf | 2026-11-06 |
| SD54 | Expansión Política · BJ, Coyoacán y Azcapotzalco concentran retos para población de 65+ (23-nov-2024) | https://politica.expansion.mx/cdmx/2024/11/23/bj-coyoacan-y-azcapotzalco-concentran-retos-para-poblacion-de-65-anos-y-mas | 2026-11-06 |
| SD55 | Expansión Política · Las 14 acciones de la CDMX para mejorar los mercados (12-feb-2025) | https://politica.expansion.mx/cdmx/2025/02/12/las-14-acciones-que-emprendera-la-cdmx-para-mejorar-los-mercados | 2026-11-06 |
| SD56 | Expansión Política · ¿Cuántos tianguis hay en la CDMX? (12-sep-2024) | https://politica.expansion.mx/cdmx/2024/09/12/cuantos-tianguis-hay-en-la-cdmx-y-que-alcaldias-tienen-mas | 2026-11-06 |
| SD57 | La Razón · Coparmex CDMX promueve la formalización de tianguistas (16-oct-2024) | https://www.razon.com.mx/negocios/coparmex-cdmx-promover-formalizacion-tianguistas-597731 | 2026-11-06 |
| SD58 | Chilango · Vales Mercomuna: CDMX entregará 700 mil apoyos en 2026 | https://www.chilango.com/noticias/vales-mercomuna-cdmx-entregara-700-mil-apoyos-2026/amp/ | 2026-11-06 |
| SD59 | Chilango · Mercomuna beneficia a 335 mil familias y más de 30 mil comercios (13-dic-2025) | https://www.chilango.com/noticias/educacion/mercomuna-beneficia-a-335-mil-familias-y-fortalece-mas-de-30-mil-comercios-en-la-cdmx/amp/ | 2026-11-06 |
| SD60 | Chilango · Aceptarán pago con tarjeta en mercados y tianguis (13-oct-2021) | https://www.chilango.com/noticias/pago-con-tarjeta-en-mercados-y-tianguis/ | 2026-11-06 |
| SD61 | El CEO · Ley de Economía Digital carga con obstáculos por conectividad y costos (10-sep-2026) | https://elceo.com/negocios/ley-de-economia-digital-carga-con-obstaculos-para-pagos-sin-efectivo-por-conectividad-y-costos/ | 2026-11-06 |
| SD62 | El CEO · CoDi y DiMo se fusionan: lo que se sabe (7-abr-2026) | https://elceo.com/economia/codi-y-dimo-se-fusionan-esto-es-lo-que-se-sabe-del-impulso-a-la-digitalizacion-de-pagos-en-mexico/ | 2026-11-06 |
| SD63 | Banxico · Tasas de descuento con tarjeta de crédito por giro (periodo no indicado; archivo de 2025) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-credito/%7BA896D818-3D13-4922-B54B-4B6D58E99479%7D.pdf | 2026-11-06 |
| SD64 | DOF · Ley de Economía Digital: texto y transitorios | https://sidof.segob.gob.mx/notas/docFuente/5803017 | 2026-11-07 |

<!-- ===== FIN: conocimiento/06-contexto-pagos-y-comercios-mx.md ===== -->

<!-- ===== INICIO: conocimiento/07-ideas-puntuadas.md ===== -->

---
id: K07
titulo: "Ideas puntuadas y top 3 con PRD"
resumen: "Banco de ideas calificadas contra los criterios del evento, top 3 con PRD listo para Codex y la recomendación final."
responde:
  - "¿Qué construyo para ganar?"
  - "¿Cuál es la idea recomendada y por qué?"
  - "¿Cuál es la demo de 3 pasos y la arquitectura de cada idea finalista?"
  - "¿Cómo adapto la idea si el reto oficial cambia?"
actualizado: 2026-11-06
confianza: media
fuentes: [SA01, SA03, SA29, SA42, SA45, SA50, SA54, SB07, SB08, SB10, SB13, SB15, SB17, SB18, SB21, SB23, SB26, SB30, SB31, SB33, SB34, SB37, SB38, SB39, SB43, SC06, SC07, SC08, SC10, SC12, SC13, SC20, SC21, SC22, SC24, SC25, SC26, SC44, SC59, SD06, SD10, SD24, SD31, SD33, SD35, SD38, SD39, SD40, SD41, SD45, SD47, SD50, SD55, SD58, SD63]
---

# K07 · Ideas puntuadas y top 3 con PRD

## TL;DR

- **Construye "¿Ya cayó?":** una caja de cobro CoDi para puestos de barrio que arma el cobro con IA y nunca acepta una captura como pago: si te enseñan un "ya te transferí", OpenAI lee la imagen y el sistema la busca en los pagos reales de pey (94/100, la mejor del banco).
- **Demo en 3 pasos (≤ 80 s):** "Cóbrale un dulce de tamarindo" → QR de $1 · la clienta enseña una captura → "Todavía no cae: no entregues" · paga de verdad desde su banco → "¡Ya cayó!", confirmado por pey y en voz alta (K07.6).
- **Top 3 con PRD:** ¿Ya cayó? (94), Cóbrale, caja por voz (90), y Mesa Dividida, un QR por comensal (78). Los tres usan el kit del día tal cual (Prompts 1–5 de `PROMPTS-CODEX.md`) más una tarea nueva con archivos propios: la Tarea 1 sale genérica y la idea se decide con el PRD, como pide el RUNBOOK.
- **Por qué gana:** "voz o chat → QR" lo harán muchos; esta idea conserva ese cobro y le suma la verdad del pago, que ataca la desconfianza que frenó a CoDi [SA42]. El modelo lee y propone, el código decide, pey confirma y la persona aprueba [SA45].
- **Si el reto cambia:** comunidad o solicitudes de pago → La Libreta o Mesa Dividida; "dentro de ChatGPT" → servidor MCP; flujos empresariales → corte de caja con conciliación (K07.6).
- **Esta noche:** cobro real de $0.01–$1 con pey de punta a punta, una llamada de visión con una captura ficticia y Codex y Vercel listos; lo pagado a la cuenta de prueba de pey no se devuelve [SB07].

## K07.1 · Rúbrica de puntuación

Los criterios oficiales no están publicados [SA01]. Esta rúbrica traduce los criterios probables de K08.3 a seis preguntas para **elegir idea la víspera**. Es inferencia: si mañana publican criterios, recalcula en 5 minutos (K07.6).

| # | Criterio | Peso | Pregunta | Equivale en K08.3 |
|---|---|---|---|---|
| R1 | Alineación con el reto | 20 % | ¿El cobro CoDi con pey es el centro, la IA de OpenAI es necesaria, es bien público y deja trabajo de Codex visible? | C1 + C3 |
| R2 | Impacto real y usuario concreto | 20 % | ¿Hay una persona de K06.9 con un dolor medible y un dato con fuente? | C1 |
| R3 | Wow de la demo en vivo | 15 % | ¿En 80 s o menos pasa algo que el jurado siente sin que se lo expliquen? | C2 + C5 |
| R4 | Factibilidad: una persona, ~4.5 h, Codex web | 25 % | ¿Cabe en el kit del día (`PROMPTS-CODEX.md`) y todo lo ⚪ tiene respaldo? | C2 |
| R5 | Originalidad | 10 % | ¿Casi nadie más la hará? | C4 |
| R6 | Voto comunitario y continuidad | 10 % | ¿Se entiende en una frase, se comparte y puede seguir en el Hackatón México? | K08.6 + C5 |

Por qué estos pesos: K08.3 pone la ejecución en 25 % y pide no sacrificarla nunca; los ganadores de Build Week fueron herramientas acotadas que funcionan [SA45]. En San Francisco el jurado calificó uso de Codex, valor práctico, claridad del pitch y ejecución [SA50]: aquí viven en R1, R2, R3 y R4.

**Escala** (2 y 4 quedan entre las descripciones vecinas):

| Criterio | 1 | 3 | 5 |
|---|---|---|---|
| R1 | Sin cobro CoDi real, o IA decorativa | pey y OpenAI aparecen, pero uno es accesorio o el usuario no es comercio ni comunidad | Cobro con pey en el flujo principal (crear → pagar → confirmar), IA necesaria para ese flujo y caso de un ejemplo oficial [SA01] |
| R2 | Usuario vago | Usuario claro, dolor sin dato | Persona de K06.9, dolor medible con fuente, beneficio en pesos o minutos, pensada para no expertos |
| R3 | Hay que imaginarla | Se entiende, pero es "una pantalla más" | Pasa algo frente al jurado: hablas y sale el QR, una captura queda en evidencia o la pantalla cambia con un pago real |
| R4 | Depende de algo ⚪ sin alternativa o de terceros (aprobaciones, días hábiles) | Necesita una pieza ⚪ o infraestructura extra, con plan B | Cabe en los Prompts 1–5 más una tarea con archivos propios, y lo ⚪ tiene respaldo |
| R5 | Lo harán decenas | Combinación conocida bien hecha | Ángulo propio en una frase: fiado, tandas, antifraude, personas mayores (K08.5) |
| R6 | Difícil de explicar y sin siguiente paso | Se entiende con explicación | Una frase y una imagen bastan, y hay ruta al Hackatón México (14 nov–12 dic, CoDi y API de Pey) [SA03] |

**Fórmula:** total = (R1 × 20 + R2 × 20 + R3 × 15 + R4 × 25 + R5 × 10 + R6 × 10) ÷ 5. Va de 20 a 100.

**Vetos (no entra al top 3 aunque sume):**
- **Veto 1:** sin cobro CoDi con pey en el flujo principal; el reto lo pide [SA01].
- **Veto 2:** el modelo decide montos o cobra sin confirmación humana (K03.9) [SA45].
- **Veto 3:** necesita datos personales reales en el repo público o en la demo (K08.9).
- **Veto 4:** la IA es accesoria (R1 ≤ 2): un formulario haría lo mismo (K02.13, K08.5). Si la idea sirve, entra como capa de otra.

**Tope:** si el camino crítico depende de algo ⚪ sin plan B, R4 vale 2 como máximo. **Desempate:** gana la de mayor R4; si siguen iguales, la de mayor R2.

**Comprobación:** con los pesos de K08.3 (C1–C5) y las mismas notas, el top 3 queda en el mismo orden: ¿Ya cayó? 92, Cóbrale 85 y Mesa Dividida 77 (cálculo propio).

## K07.2 · Banco de ideas puntuadas

Quince ideas en formatos distintos (voz, chat, visión, ChatGPT, comunidad), ordenadas por puntuación. La columna de pey usa solo endpoints de K03.4; la de OpenAI, solo modelos y funciones de K04. Las personas son arquetipos de K06.9.

| # | Idea | En una línea | Usuario (K06.9) | Qué hace OpenAI (K04) | Qué hace pey / CoDi (K03) | Momento wow | Riesgo principal | Pts |
|---|---|---|---|---|---|---|---|---|
| 1 | **¿Ya cayó?** | Caja CoDi que arma el cobro con IA y nunca acepta una captura: la IA lee el "ya te transferí" y el servidor lo busca en los pagos reales | Tianguista de fruta | `gpt-6.1-sol`: function calling `crear_cobro` + visión con `input_image` (forma ⚪) y salida estructurada `text.format` | `POST /codi/qr` → `GET /transaction/codi/qr/{id}`; búsqueda con `GET /transaction/api-key`; webhook | Captura → "Todavía no cae"; pago real → "¡Ya cayó!" | Solo verifica pagos hechos con pey: una transferencia SPEI a la CLABE no aparece | **94** |
| 2 | **Cóbrale** | Dictas el pedido, sale el QR con el total y la caja avisa en voz alta cuando pey confirma | Tianguista de fruta | `crear_cobro` con catálogo + voz a texto con `gpt-transcribe` (ruta del endpoint ⚪) | `POST /codi/qr` → estado; webhook `codi.qr.payment_received` | Dices "cóbrale un dulce de tamarindo", pagas y escuchas "ya llegó tu dinero" | Ruido de la sala; idea común | **90** |
| 3 | **Mesa Dividida** | La fonda dicta cómo se reparte la cuenta y cada comensal paga su parte con su QR | Fonda familiar | function calling `crear_reparto`; el código pone precios y divide | N × `POST /codi/qr` con `metadata` por comensal + estado de cada QR | Tablero de 3 QR que se pone verde persona por persona | Que otros paguen en vivo; tope más alto | **78** |
| 4 | Paga Tranquilo | Modo grande y hablado: dice a quién y cuánto pagas y da un recibo sencillo para un familiar | Cliente adulto mayor (como los de la Casa de Día de la sede [SD50]) | `gpt-6.1-sol` para lenguaje sencillo; voz del navegador | `POST /codi/qr` con concepto claro + estado | "Vas a pagar 1 peso a Frutas (ejemplo)" en voz alta | Veto 4: IA accesoria; entra como capa de los finalistas | 78 |
| 5 | La Libreta | Apuntas el fiado hablando y lo cobras sin pena con una notificación CoDi al celular | Fonda familiar (clientes frecuentes) o prestadora ("luego te pago") | function calling `anotar_fiado` y `crear_cobro` + redacción del recordatorio | `POST /codi/pn` → `GET /transaction/{id}`; webhook `codi.pn.payment_received` [SB18]; QR de respaldo | "Mándale su cobro a Ana" → vibra su celular | La notificación exige el celular del cliente ligado a CoDi (⚪); sin dato de fiado | 75 |
| 6 | Cooperacha | Vaquita de la posada, la escuela o el mercado: un QR por persona y lista de quién ya cooperó | Fuera de K06 (organizadora vecinal) | Salida estructurada del plan + recordatorios | N × `POST /codi/qr` con `numRef` por persona + webhooks | La lista se llena sola mientras pagan | IA poco necesaria; sin dato | 74 |
| 7 | Pizarrón a Caja | Foto del pizarrón de precios → catálogo editable → cobros por pedido | Fonda familiar | Visión + salida estructurada (catálogo) | `POST /codi/qr` + estado | Menú escrito a mano → caja lista en segundos | Letra a mano ilegible; más pantallas | 73 |
| 8 | Te Mando el Cobro | La IA redacta y manda la solicitud de pago antes o al terminar un servicio | Prestadora a domicilio | Redacción + extracción de monto y fecha | `POST /codi/pn` o link de pago (`POST /payment-link/create`, campos ⚪) | El celular del cliente recibe el cobro | Notificación ⚪; campos del link no documentados en K03 | 71 |
| 9 | Remisión a Cobro | El proveedor fotografía su nota de remisión y la tiendita recibe un cobro con folio para conciliar | Fuera de K06 (proveedor; "flujos empresariales") | Visión + salida estructurada | `POST /codi/qr` con `metadata` (folio) + webhook para conciliar | Nota de papel → cobro con folio | Persona fuera de K06; poco voto | 70 |
| 10 | Mercado Conectado | Cada locatario registra su CLABE y cobra con su propio QR, directo a su cuenta | Tianguista o locatario (K06.8) | Asistente de alta y dudas | `POST /bank-account` → `bankAccountId` en `POST /codi/qr`; webhook `bank.account.updated` | Un mercado entero sin comisión | `ACTIVE` tarda hasta 5 días hábiles [SB13]; CLABEs reales | 67 |
| 11 | Pedido por Chat | Chat tipo WhatsApp de una cooperativa: "quiero 2 kilos para el sábado" → pedido + QR | Fuera de K06 (cooperativa) | function calling para armar el pedido | `POST /codi/qr` con `metadata` (pedido) | Un mensaje informal se vuelve pedido pagado | Dos lados (cliente y comercio): más pantallas | 66 |
| 12 | Alta Guiada | Asistente que explica la cuenta Nivel 2 Bis y cómo activar CoDi, y hace tu primer cobro de $1 | Tianguista sin experiencia digital | `gpt-6.1-sol` + caché de 12 h con la guía (K04.12) | `POST /codi/qr` de $1 + webhook | Tu primer cobro CoDi en 5 minutos | Chatbot genérico; datos bancarios que cambian | 64 |
| 13 | Corte de Caja | "¿Cuánto vendí hoy?" contestado con los pagos reales | Fonda familiar | function calling `resumen_de_ventas` (K03.9) | `GET /transaction/api-key` | Total del día y comisión ahorrada en pesos | Poco wow: mejor como segundo acto | 63 |
| 14 | Tanda Transparente | Turnos, recordatorios y cobros CoDi de una tanda | Fuera de K06 (grupo de comerciantes) | Calendario + recordatorios | `POST /codi/pn` o QR por ronda | La ronda se paga en vivo | pey no documenta pagos salientes para entregar la tanda | 61 |
| 15 | Cobra desde ChatGPT | Plugin MCP: "cóbrale 120 a Memo" dentro de ChatGPT, con el QR en un widget | Fuera de K06 (comerciante que ya usa ChatGPT) | Plugin con servidor MCP en `/mcp` (K04.11) [SC22] | `POST /codi/qr` y estado como herramientas MCP | Cobrar sin salir de ChatGPT | Plus y modo desarrollador ⚪ [SC25][SC59]; 1–3 h | 60 |

### Desglose de la puntuación

| # | Idea | R1 ×20 | R2 ×20 | R3 ×15 | R4 ×25 | R5 ×10 | R6 ×10 | Total | Dato que sostiene R2 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ¿Ya cayó? | 5 | 4 | 5 | 5 | 4 | 5 | **94** | 2.48 M reclamaciones por posible fraude en un semestre [SD38]; comprobantes falsos [SD41] |
| 2 | Cóbrale | 5 | 4 | 5 | 5 | 3 | 4 | **90** | ~85 % paga en efectivo [SD10]; débito hasta 3.95 % [SD24]; sin dato de preferencia por voz (⚪, K06.7) |
| 3 | Mesa Dividida | 4 | 4 | 4 | 4 | 3 | 4 | **78** | Restaurantes con crédito: 2.55–5.84 % (⚪ periodo) [SD63] |
| 4 | Paga Tranquilo | 2 | 5 | 3 | 5 | 4 | 4 | 78 · veto 4 | 57.8 % de 65–74 años usa internet [SD45]; 15–21 % de 60+ paga digital [SD47] |
| 5 | La Libreta | 4 | 3 | 4 | 3 | 5 | 5 | 75 | Sin dato verificado sobre fiado (⚪) |
| 6 | Cooperacha | 3 | 3 | 4 | 4 | 4 | 5 | 74 | Sin dato |
| 7 | Pizarrón a Caja | 4 | 4 | 4 | 3 | 4 | 3 | 73 | Igual que Mesa Dividida [SD63] |
| 8 | Te Mando el Cobro | 4 | 4 | 4 | 3 | 3 | 3 | 71 | Comprobante falso o reversa a domicilio [SD41] |
| 9 | Remisión a Cobro | 4 | 3 | 4 | 4 | 3 | 2 | 70 | Sin dato (persona fuera de K06) |
| 10 | Mercado Conectado | 4 | 4 | 3 | 2 | 4 | 4 | 67 | 339 mercados y ~300 mil personas en la CDMX [SD55] |
| 11 | Pedido por Chat | 4 | 3 | 3 | 3 | 3 | 4 | 66 | Sin dato |
| 12 | Alta Guiada | 3 | 4 | 2 | 4 | 2 | 3 | 64 | 21.8 M cuentas CoDi validadas, 2.5 M han pagado [SD33] |
| 13 | Corte de Caja | 3 | 3 | 2 | 5 | 2 | 2 | 63 | Sin dato |
| 14 | Tanda Transparente | 3 | 3 | 3 | 2 | 5 | 4 | 61 | Sin dato |
| 15 | Cobra desde ChatGPT | 4 | 2 | 4 | 2 | 4 | 3 | 60 | Sin dato |

### Lectura del banco

- **Top 3: ¿Ya cayó?, Cóbrale y Mesa Dividida.** Los tres ponen el cobro CoDi en el centro, usan una persona de K06.9 con dato y caben en el kit del día.
- **¿Por qué ¿Ya cayó? arriba de Cóbrale si la caja por voz es lo obvio?** Comparten el núcleo; ¿Ya cayó? suma originalidad y voto (todo México conoce la captura falsa) y su paso estrella no depende de un micrófono en una sala ruidosa: la captura se sube como archivo. Cóbrale queda a 4 puntos y también puede ganar.
- **Paga Tranquilo** suma 78, pero cae en el veto 4: su letra grande y su aviso hablado entran a los tres finalistas como capa de accesibilidad.
- **La Libreta** es la más original junto con la Tanda (R5 = 5). No hay dato verificado de fiado en la base y su notificación depende de algo ⚪; con un dato con fuente sube a 79. Es la adaptación natural si el reto oficial pide "solicitudes de pago" o comercio comunitario (K07.6).
- **Corte de Caja** (R4 = 5) es el segundo acto más barato para cualquier finalista.

### Núcleo común de los tres finalistas

Es el kit del día sin cambios: Prompts 1, 2 y 5 de `PROMPTS-CODEX.md`, más los ajustes de cada finalista a los Prompts 2–5 y una tarea nueva.

1. **Cobro:** `POST /api/cobros` valida el monto (> 0 y ≤ `MAX_MONTO_MXN`) y llama a pey `POST /codi/qr` con el monto en pesos, `generateImage: true`, `expiration: 600`, `numRef` y `metadata`; si `qrImage` llega `null`, el servidor dibuja `qrString` [SB10][SB23].
2. **Estado:** la pantalla pregunta cada 2 s a `GET /api/estado?id=…`, que consulta `GET /transaction/codi/qr/{id}`: un item `PAID` → pagado; 404 → pendiente con aviso (QR de otra llave) [SB10][SB15]. Sin base de datos: la verdad del pago es pey (K03.7).
3. **Webhook:** `POST /api/webhook-pey` verifica la firma Standard Webhooks y registra `codi.qr.payment_received`; es bitácora y respaldo [SB17][SB39]. Va en el dominio de producción, no en un preview [SB43]; es uno por llave [SB08].
4. **Modos:** `MODO_PAGO` (`simulacion`, `prueba` o `comercio`) siempre visible en pantalla. Preview en SIMULACIÓN; Production en `prueba` con `MAX_MONTO_MXN=20` y cobros de $1, porque lo pagado a la cuenta de prueba no se devuelve [SB07] (AGENTS.md, K03.3).
5. **Sin variables nuevas:** los tres finalistas usan solo las de `.env.example`.

**Cómo no chocar con la Tarea 1 genérica:** la capa de cada idea va en una **Tarea 9** (plantilla R6) que solo crea archivos nuevos. La interfaz (Tarea 4) la carga con `import()` dinámico dentro de try/catch: mientras la Tarea 9 no se fusiona, su botón no aparece y nada se rompe. Así se puede elegir la idea con el PRD (11:00), como pide el RUNBOOK.

## K07.3 · Finalista 1: ¿Ya cayó?, la captura no es dinero (94)

### Problema
- **Persona (K06.9): tianguista de fruta.** Cobra montos chicos con una fila de cuatro clientes; uno pregunta "¿le transfiero?" y enseña su pantalla. Con la fila encima no revisa su banco, y una captura de "ya te transferí" puede ser falsa o revertirse [SD41].
- **Datos:** de enero a junio de 2025 hubo 2.48 millones de reclamaciones por posible fraude y el fraude digital superó 60 % de las quejas [SD38]; en la CDMX, 31.6 % de las 40,688 quejas de 2025 se ligaron a fraude [SD40]. La forma segura de verificar es el CEP de Banxico con la clave de rastreo o el saldo real, no la imagen [SD41]. Las personas de 60 años o más suman 32 % de las quejas por posible fraude (⚪ año del dato) [SD39]. La desconfianza es una de las causas que se citaban del poco uso de CoDi [SA42].
- **Por qué ahora:** a más tardar el 14 de diciembre de 2026 todas las apps bancarias deberán dar comprobante con clave de rastreo y liga al CEP (K06.5) [SD06]: las capturas serán todavía más comunes.

### Frase de valor
"La captura no es dinero: cobra con QR CoDi y deja que pey, no una foto, te diga si ya cayó."

### Demo exacta en 3 pasos (≤ 80 s)

| Paso | Qué dice José | Qué se ve en la pantalla (proyectada) | Qué pasa en el celular de la clienta |
|---|---|---|---|
| 1 · Cobrar | Toca el ejemplo o dice: "Cóbrale un dulce de tamarindo." | Propuesta de la IA: 1 × Dulce de tamarindo · **$1.00** → **Confirmar y generar QR** → QR CoDi grande, "Esperando pago…" y banner MODO PRUEBA. | Nada todavía. |
| 2 · La captura | "La clienta dice que ya me pagó y me enseña esto." Toca **Revisar una captura** y sube la imagen de ejemplo. | "Leí: $1.00 · 13:58 · clave de rastreo EJEMPLO123" → **"Todavía no cae. Pey no tiene ningún pago para este cobro: no entregues."** | La "clienta" solo enseña su captura; su banco no registra nada. |
| 3 · ¡Ya cayó! | "Ahora sí, págame con CoDi." | En segundos (consulta cada 2 s): **"¡Ya cayó! $1.00 · confirmado por pey"**, vibración y voz: "Ya cayó tu dinero: un peso". | Abre su app → CoDi (en BBVA, "Pagar con CoDi") → escanea → ve monto y concepto → autoriza; su banco confirma [SB31][SB33]. |

La captura de ejemplo es una imagen propia y ficticia ("Transferencia enviada", $1.00, 13:58, "Clave de rastreo EJEMPLO123", "Banco Ejemplo"), sin logos ni diseño de un banco real. Opcional (+15 s): subir la captura real del banco y ver "Coincide con el pago de $1.00 de las 14:05".

### Alcance del MVP
- **Sí:** pedido por texto o ejemplo → `crear_cobro` con catálogo de ejemplo → confirmación → QR CoDi con pey → estado cada 2 s → "¡Ya cayó!" con voz y vibración; botón "¿Ya cayó?" que consulta pey al instante; "Revisar una captura": foto o archivo → lectura con IA → veredicto con código → texto claro y clave de rastreo para el CEP; "Capturar a mano"; MODO PRUEBA y SIMULACIÓN visibles; tope `MAX_MONTO_MXN=20`.
- **Debería (solo si a las 13:00 ya hubo un cobro real):** voz para dictar (Tarea 9 de K07.4); "¿Cuánto vendí hoy?" con `resumen_de_ventas` (K03.9).
- **No:** verificar transferencias SPEI que no pasaron por pey (no hay API del CEP en la base, ⚪); guardar imágenes; decir "es falso"; devoluciones (pey no tiene endpoint [SB10]); cuentas de usuario; base de datos; varios comercios.

### Arquitectura

```
app/
├── index.html · css/estilos.css · js/app.js · js/textos.js            T4  pedido → confirmar → QR (+ "Revisar una captura") → pagado
├── js/revisar.js                                                      T6  foto → /api/revisar → veredicto (carga dinámica)
├── js/estado-pago.js · css/estado-pago.css                            T5  consulta cada 2 s → "¡Ya cayó!" + voz
├── js/contrato.js · js/api.js · js/vistas.js                          T1  congelados
├── api/agente.js · api/_lib/agente.js · api/_lib/catalogo.js          T3  crear_cobro + catálogo de ejemplo
├── api/revisar.js · api/_lib/extractor.js · api/_lib/coincidencias.js T6  lectura con IA + veredicto con código
├── api/cobros.js · api/estado.js · api/webhook-pey.js · api/_lib/pey.js  T2  pey (+ listarPagosRecientes)
├── api/salud.js · api/_lib/config.js · api/_lib/http.js               T1  congelados
└── tests/  base · pey · agente · estado-pago · revisar                 cada tarea la suya
```

| Ruta | Qué hace | OpenAI o pey | Tarea |
|---|---|---|---|
| `POST /api/agente` | Texto → `{respuesta, propuesta}` | Responses API, `gpt-6.1-sol`, `reasoning.effort: "low"`, `crear_cobro` con `strict: true` [SC08][SC13] | T3 |
| `POST /api/cobros` | Propuesta confirmada → cobro con QR | `POST /codi/qr` [SB10] | T2 |
| `GET /api/estado?id=` | ¿Ya cayó? | `GET /transaction/codi/qr/{id}` [SB15] | T2 |
| `POST /api/webhook-pey` | Registro firmado | `codi.qr.payment_received` [SB17][SB39] | T2 |
| `POST /api/revisar` | `{imagenBase64, mime, cobroId}` → `{leido, veredicto, pago}` | Lectura: Responses API con `input_image` (forma de K04.2, ⚪) y `text.format` estricto [SC06][SC12]; búsqueda: `GET /transaction/api-key`, 80 por página [SB10] | T6 |

**Lectura de la captura** (salida estructurada; lo que no se ve va `null`) [SC12]:

```json
{
  "type": "json_schema", "name": "captura", "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "es_comprobante": { "type": "boolean" },
      "monto": { "type": ["number", "null"] },
      "fecha": { "type": ["string", "null"], "description": "YYYY-MM-DD" },
      "hora": { "type": ["string", "null"], "description": "HH:MM, 24 h" },
      "clave_rastreo": { "type": ["string", "null"] },
      "legible": { "type": "boolean" }
    },
    "required": ["es_comprobante", "monto", "fecha", "hora", "clave_rastreo", "legible"],
    "additionalProperties": false
  }
}
```

**Veredicto (código, no modelo):**
1. **Con un cobro activo:** manda el estado de ese QR en pey. `PAID` → "¡Ya cayó!"; si no → "Todavía no cae", diga lo que diga la captura. Si el monto leído no coincide con el cobro, se muestra ("La captura dice $350; tu cobro es de $1").
2. **Sin cobro activo:** busca pagos `PAID` de las últimas 2 horas (máximo 3 páginas). Mismo monto (±$0.01) y hora a ±15 min → "Coincide"; mismo monto a otra hora → "Revísalo"; nada → "No encuentro este pago en tus cobros de pey; si te transfirieron a tu cuenta, revisa tu banco o el CEP con la clave de rastreo" [SD41]. Si la clave leída es igual a `metadata.trackingKey`, se dice (⚪ que ese campo sea la clave SPEI [SB21]).
3. **Ilegible:** "No pude leer la captura: escribe el monto o usa «¿Ya cayó?»".
4. Nunca se dice "falso" ni se acusa; hora de CDMX = UTC−6 todo el año (K03.9).

**Variables:** solo las del núcleo, con `MAX_MONTO_MXN=20`. **Costo:** un cobro con `gpt-6.1-sol` (≈ 1,500 tokens de entrada y 150 de salida) ronda US$0.005 más razonamiento ⚪ (cálculo propio con [SC07]); el costo de una revisión depende de los tokens de imagen, que K04 no da (⚪).

### Riesgos y plan B

| Riesgo | Señal | Plan B |
|---|---|---|
| pey no habilita la llave o el pago real falla | `PEY_NO_AUTORIZADO`, 503 o el QR no se paga | Video del cobro real de anoche; `MODO_PAGO=simulacion` con banner "SIMULACIÓN" (R5 de `PROMPTS-CODEX.md`), dicho en voz alta (K03.6) |
| La lectura falla (reflejo, foto borrosa, forma de `input_image` ⚪) | Campos vacíos o mal leídos | Subir archivo en vez de foto; monto editable; el veredicto con cobro activo no depende de la lectura |
| Tarea 9 no llega a las 13:00 | El botón "Revisar una captura" no aparece | El paso 2 se hace con el botón "¿Ya cayó?" (consulta pey, K06.6) y la captura queda como siguiente paso en el pitch |
| Le pagaron por SPEI normal, no con el QR | No aparece en pey | Texto honesto con la clave de rastreo para el CEP [SD41]; en el pitch, "por eso cobramos con QR CoDi" |
| La búsqueda tarda | Más de 5 s | Ventana de 2 h y máximo 3 páginas de 80 [SB10] |
| Datos personales en capturas | Nombres o cuentas visibles | No se guarda nada; la captura de la demo es ficticia |
| OpenAI sin saldo o caído | 503 `IA_SIN_SALDO` | "Capturar a mano" (Tarea 1) y monto escrito para la revisión |
| Se acaba el límite de Codex (Plus comparte una bolsa de 5 h y las tareas cloud gastan más [SC44]) | Tablero de uso bajo | Lanza primero 2, 3 y 9; la 4 y la 5 después; el pulido es lo primero que cae |

### Plan de tareas para Codex

| K07 | Se lanza como | Cuándo (RUNBOOK) | Toca SOLO | Qué agrega en ¿Ya cayó? |
|---|---|---|---|---|
| T1 | Prompt 1 tal cual ("Idea: ¿Ya cayó?…") | 10:35, sola | Esqueleto de `app/` | Nada específico |
| T2 | Prompt 2 + ajuste | 11:10, en paralelo | `app/api/_lib/pey.js`, `app/api/cobros.js`, `app/api/estado.js`, `app/api/webhook-pey.js`, `app/tests/pey.test.js` | `listarPagosRecientes()` |
| T3 | Prompt 3 + ajuste | 11:10 | `app/api/agente.js`, `app/api/_lib/agente.js`, `app/api/_lib/catalogo.js`, `app/tests/agente.test.js` | Catálogo de ejemplo; precios puestos por el servidor |
| T4 | Prompt 4 + ajuste | 11:10 | `app/index.html`, `app/css/estilos.css`, `app/js/app.js`, `app/js/textos.js` | Botón "Revisar una captura" con carga dinámica |
| T5 | Prompt 5 + ajuste | 11:10 | `app/js/estado-pago.js`, `app/css/estado-pago.css`, `app/tests/estado-pago.test.js` | "¡Ya cayó!", botón "¿Ya cayó?" y voz |
| T6 | **Tarea 9** (abajo) | 11:10 | `app/js/revisar.js`, `app/api/revisar.js`, `app/api/_lib/extractor.js`, `app/api/_lib/coincidencias.js`, `app/tests/revisar.test.js` | Captura → lectura → veredicto |
| Cierre | Prompts 6 y 7 | 13:00 | Ver `PROMPTS-CODEX.md` | README con "qué es real", pulido |

```text
AJUSTES DE ¿YA CAYÓ? (pega cada bloque al final del prompt indicado; prevalecen sobre lo anterior)

Prompt 2: además exporta listarPagosRecientes({desdeEpoch}) en app/api/_lib/pey.js con GET /transaction/api-key
(80 por página con nextToken, máximo 3 páginas, K03.4). Regresa solo PAID desde desdeEpoch como
[{id, monto, fechaPago, claveRastreo}] (claveRastreo = metadata.trackingKey o null; ⚪ que sea la clave SPEI).
En simulación, 2 pagos de ejemplo marcados "SIMULACIÓN". Pruebas con fetch simulado, incluida la paginación.

Prompt 3: en cada elemento de detalle agrega producto_id (string o null). Si existe en app/api/_lib/catalogo.js,
el servidor pone el precio del catálogo y recalcula el monto: el modelo nunca pone precios del catálogo.
"Un cuarto" = 0.25 kg; "medio" = 0.5 kg. Si el comerciante dice el monto ("cóbrale 85 de dos tacos"), detalle puede
ir vacío. Prueba extra: "cóbrale un dulce de tamarindo" → monto 1.

Prompt 4: en #vista-pedido y #vista-qr agrega el botón #btn-revisar "Revisar una captura". Al tocarlo, carga
./revisar.js con import() dinámico dentro de try/catch y llama abrirRevision({cobroActivo}). Si el módulo todavía
no existe (lo crea otra tarea en paralelo), oculta el botón y sigue. Marca y títulos: "¿Ya cayó?".

Prompt 5: la vista PAGADO dice "¡Ya cayó!" y anuncia "Ya cayó tu dinero: N pesos" con speechSynthesis
(lang "es-MX"; si el equipo no tiene voz en español, solo texto y vibración, ⚪). Crea dentro de #vista-qr un botón
"¿Ya cayó?" que consulta /api/estado de inmediato y anuncia "Todavía no cae" o "¡Ya cayó!".
```

```text
TAREA 9 · Revisar una captura: foto → lectura con IA → veredicto con pey
CONTEXTO: ¿Ya cayó? (K07.3). Es el paso 2 de la demo: una captura de "ya te transferí" no es dinero.
Si esta tarea falla, la demo sigue con el botón "¿Ya cayó?": no rompas nada fuera de tus archivos.
LEE: AGENTS.md; docs/PRD.md; K03.4 (estados y objeto transacción); K04.2 y K04.5 (input_image y salida
estructurada); K07.3 (esquema de lectura, reglas del veredicto y textos). No cambies app/js/contrato.js,
app/js/api.js ni app/api/_lib/config.js.
ALCANCE (solo archivos nuevos): app/js/revisar.js · app/api/revisar.js · app/api/_lib/extractor.js ·
app/api/_lib/coincidencias.js · app/tests/revisar.test.js
QUÉ HACER:
1. revisar.js exporta abrirRevision({cobroActivo}): crea su propia sección accesible (label, foco, aria-live)
   con <input type="file" accept="image/*" capture="environment">; reduce la imagen a 1280 px como JPEG 0.8 con
   canvas; la envía con fetch a POST /api/revisar {imagenBase64, mime, cobroId}; muestra lo leído (monto editable)
   y el veredicto con los textos de K07.3.
2. extractor.js: extraerCaptura({imagenBase64, mime}) con la Responses API, model = OPENAI_MODEL, reasoning
   "low", input_text + input_image (data URL), text.format con el esquema de K07.3. Negativa o "incomplete" →
   {legible: false}. Instrucción: "Lee la captura. Si un dato no se ve, null. No juzgues si es real."
3. coincidencias.js: reglas del veredicto de K07.3, sin IA. Con cobroId manda el estado del QR
   (consultarEstado); sin cobroId usa listarPagosRecientes. Importa app/api/_lib/pey.js con `import * as`:
   si listarPagosRecientes aún no existe (la Tarea 2 corre en paralelo), usa pagos de SIMULACIÓN etiquetados.
4. api/revisar.js: valida tipo y tamaño (413 si pasa de 1.5 MB), une extractor y coincidencias, responde
   {leido, veredicto, pago}. Sin OPENAI_API_KEY → 503 con "Escribe el monto a mano".
5. No guardes la imagen ni lo leído; logs solo con códigos y tiempos. Nunca digas "falso".
CRITERIOS DE ACEPTACIÓN:
1) `npm test --prefix app` pasa con fetch simulado: cobro activo PENDING → todavia_no_cae aunque la captura
   diga lo mismo; PAID → ya_cayo; sin cobro: mismo monto y hora cercana → coincide; hora lejana → dudoso;
   nada → no_encontrado; ilegible; centavos; zona horaria.
2) En SIMULACIÓN, la captura de ejemplo con un cobro activo da "Todavía no cae".
3) A 360 px el veredicto se lee sin desplazarse.
CÓMO PROBARLO: npm test --prefix app; en el preview, crear un cobro y subir la captura de ejemplo.
ENTREGA: PR "Tarea 9: revisar una captura" con el formato de AGENTS.md.
```

```text
MARCADORES PARA PROMPTS-CODEX
[IDEA ELEGIDA] ¿Ya cayó?: caja de cobro CoDi (pey) para puestos de barrio que arma el cobro con IA y nunca acepta una captura como pago: la IA la lee y el sistema la busca en los pagos reales.
[FRASE DE VALOR] La captura no es dinero: cobra con QR CoDi y deja que pey, no una foto, te diga si ya cayó.
[PERSONA] Tianguista de fruta: cobra montos chicos con fila de clientes; le enseñan capturas de "ya te transferí" y no tiene tiempo de revisar su banco.
[DEMO PASO 1] Tocar o decir "cóbrale un dulce de tamarindo" → propuesta de $1 → Confirmar → QR CoDi.
[DEMO PASO 2] "Revisar una captura" con la captura de ejemplo → la IA lee monto, hora y clave → "Todavía no cae: no entregues".
[DEMO PASO 3] La clienta paga el QR desde su banco → "¡Ya cayó!" confirmado por pey, en voz alta.
[FRASE DE DEMO] cóbrale un dulce de tamarindo
[MONTO DEMO] 1
[HERRAMIENTAS EXTRA] ninguna (la lectura de capturas es la Tarea 9, fuera del agente)
[CATÁLOGO DE EJEMPLO] dulce de tamarindo $1 · mango $15 · plátano $25/kg · fresa $60/kg (precios de ejemplo)
[ESTILO] alto contraste para sol de tianguis; verde solo para "¡Ya cayó!", ámbar para "Todavía no cae"; números enormes
```

### Guion de 30 segundos

> "En el tianguis alguien enseña su celular: 'ya te transferí'. Con la fila encima nadie revisa su banco, y a veces ese dinero nunca llega. ¿Ya cayó? cambia la regla. Digo 'cóbrale un dulce de tamarindo' y sale el QR CoDi de pey, sin comisión. Si me enseñan una captura, OpenAI la lee y el sistema la busca en los pagos reales: no está, no entrego. Cuando pagan de verdad, pey lo confirma en segundos: ya cayó."
>
> Cierre opcional (+5 s): "Lo construí hoy, solo, con [N] tareas de Codex."

### Por qué gana
- **R1 · 5:** es cobro para comercios de barrio, el primer ejemplo oficial [SA01], con QR de pey y confirmación real; OpenAI es necesaria dos veces (entender el pedido y leer la captura) y Codex queda visible en seis tareas y sus PRs.
- **R2 · 4:** el momento de pago de la tianguista de K06.9 es justo "alguien enseña su pantalla"; fraude medido por Condusef [SD38]. Límite honesto: solo verifica pagos hechos con pey.
- **R3 · 5:** el jurado ve una captura quedar en evidencia y luego un pago real que cae en segundos.
- **R4 · 5:** usa el kit tal cual más una tarea; si la lectura falla, el veredicto con cobro activo sigue, porque lo decide el estado de pey.
- **R5 · 4:** "la captura no es dinero" es un ángulo propio; K06.11 ya lo listaba, así que alguien más podría intentarlo.
- **R6 · 5:** "¿ya cayó?" se entiende sin explicar; sigue en el Hackatón México con CEP, clave de rastreo y varios comercios [SA03] (⚪ si allá se permite continuar un proyecto, K01.10).
- **A "¿qué hace la IA que un formulario no?":** lee cualquier captura en segundos y entiende cómo habla el comerciante; el código decide y la persona confirma (patrón de Build Week [SA45]).

## K07.4 · Finalista 2: Cóbrale, caja por voz con cobro CoDi (90)

### Problema
- **Persona (K06.9): tianguista de fruta** con las manos ocupadas y fila de clientes; cobra montos chicos y no quiere teclear ni hacer cuentas.
- **Datos:** ~85 % de los adultos paga sobre todo en efectivo las compras de hasta $500 y solo 4.4 % usa transferencias o apps [SD10]; a una miscelánea, cobrar con débito le cuesta de 1.15 % a 3.95 % por venta [SD24]; CoDi no cobra comisión y el dinero llega en segundos [SD31], pero de 21.8 millones de cuentas validadas solo 2.5 millones han pagado alguna vez [SD33]. En la prueba de 2019, las apps no avisaban del pago [SD35].

### Frase de valor
"Dices lo que te compraron, tu cliente escanea y en segundos escuchas que ya llegó tu dinero: sin comisión y sin teclear."

### Demo exacta en 3 pasos (≤ 60 s)

| Paso | Qué dice José | Qué se ve en la pantalla | Qué pasa en el celular del cliente |
|---|---|---|---|
| 1 · Dictar | Mantiene el botón del micrófono: "Cóbrale un dulce de tamarindo." | "Entendí: cóbrale un dulce de tamarindo" → 1 × Dulce de tamarindo · **$1.00** → **Confirmar y generar QR**. | Nada todavía. |
| 2 · Cobrar | "Mi cliente paga con la app de cualquier banco." | QR CoDi grande, "$1.00 · Dulce de tamarindo", "Esperando pago…". | Escanea con su app, ve monto y concepto y autoriza [SB31]. |
| 3 · Avisar | "No tengo que ver la pantalla: me avisa." | **PAGADO $1.00 · confirmado por pey**, vibración y voz: "Ya llegó tu dinero: un peso". | Su banco confirma el pago [SB31]. |

Respaldo del paso 1: chip "Ejemplo: cóbrale un dulce de tamarindo" o campo de texto. Para lucir el catálogo sin pagar, muestra solo la propuesta de "un mango y un dulce" ($16).

### Alcance del MVP
- **Sí:** mantener presionado para hablar (o escribir) → `crear_cobro` con precios del catálogo → confirmación → QR → estado → PAGADO con voz y vibración; "Capturar a mano"; MODO PRUEBA y SIMULACIÓN; `MAX_MONTO_MXN=20`; letra grande (capa de Paga Tranquilo).
- **Debería:** "Revisar una captura" (Tarea 9 de K07.3) como segundo acto; "¿Cuánto vendí hoy?" (K03.9).
- **No:** voz full-duplex (GPT-Live-1, español ⚪, K04.8), cuentas, base de datos, devoluciones, WhatsApp real.

### Arquitectura
Núcleo común (K07.2) más:

| Archivo en `app/` | Qué hace | OpenAI | Tarea |
|---|---|---|---|
| `js/voz.js` | Mantener presionado → `MediaRecorder` → `POST /api/transcribir` → texto al agente | — | T6 |
| `api/transcribir.js` | Audio de hasta 15 s → `{texto}` | `gpt-transcribe` a US$0.0045/min [SC07]; ruta y campos del endpoint ⚪ (no están en K04) | T6 |
| `api/agente.js` + `api/_lib/agente.js` + `api/_lib/catalogo.js` | Texto → propuesta con precios del catálogo | Responses API, `gpt-6.1-sol`, `crear_cobro` estricto [SC13] | T3 |
| `js/estado-pago.js` | PAGADO + "Ya llegó tu dinero" con `speechSynthesis` del navegador (no es OpenAI; voces es-MX por equipo ⚪) | — | T5 |

Alternativa de voz solo si anoche la probaste en español: Realtime `gpt-realtime-2.1` con llave efímera y WebRTC (K04.7, K04.16) [SC10]; el español de ese modelo no está verificado (⚪).

### Riesgos y plan B

| Riesgo | Señal | Plan B |
|---|---|---|
| La voz no entiende (ruido, permiso, idioma) | Transcripción vacía o errónea | "Entendí: …" siempre visible; chip de ejemplo y campo de texto |
| La ruta de transcripción no se confirma | Tarea 9 con `TODO(⚪)` | José la prueba anoche y la pega en el prompt; si no, voz fuera y chips |
| El aviso hablado no suena | No hay voz en español | Pantalla verde y vibración |
| pey o OpenAI fallan | Igual que K07.3 | Igual que K07.3 |
| Parecerse a otros proyectos | Varias "cajas por voz" en el evento | Pago real en vivo, aviso hablado y "Revisar una captura" como segundo acto |

### Plan de tareas para Codex

| K07 | Se lanza como | Toca SOLO | Qué agrega en Cóbrale |
|---|---|---|---|
| T1 | Prompt 1 tal cual | Esqueleto | Nada específico |
| T2 | Prompt 2 | Archivos de pey (núcleo) | Nada específico |
| T3 | Prompt 3 + ajuste de K07.3 (catálogo y `producto_id`) | Archivos del agente | Precios del catálogo puestos por el servidor |
| T4 | Prompt 4 + ajuste | `app/index.html`, `app/css/estilos.css`, `app/js/app.js`, `app/js/textos.js` | `#btn-voz` (≥ 72 px) y `#transcripcion`, ocultos hasta cargar `./voz.js` con `import()` dinámico; `onTexto` llena `#entrada-pedido` y envía |
| T5 | Prompt 5 + ajuste | Archivos de `estado-pago` | Voz "Ya llegó tu dinero: N pesos" con `speechSynthesis` (`es-MX`) y botón "Repetir aviso" creado dentro de `#vista-pagado` |
| T6 | **Tarea 9** (abajo) | `app/js/voz.js`, `app/api/transcribir.js`, `app/tests/voz.test.js` | Voz a texto |

```text
TAREA 9 · Voz: mantener presionado para hablar → texto para el agente
CONTEXTO: Cóbrale (K07.4). El paso 1 de la demo se dice en voz alta ("cóbrale un dulce de tamarindo").
Si esta tarea falla, la demo sigue con texto: no rompas nada fuera de tus archivos.
LEE: AGENTS.md; docs/PRD.md; K04.3 (modelos de transcripción). No cambies archivos congelados.
ALCANCE (solo archivos nuevos): app/js/voz.js · app/api/transcribir.js · app/tests/voz.test.js
QUÉ HACER:
1. voz.js exporta crearGrabadora({onTexto, onEstado, onError}) → {iniciar, detener, disponible}. Graba con
   MediaRecorder mientras #btn-voz está presionado (pointerdown/pointerup; con teclado, Espacio), máximo 15 s.
   Sin micrófono o sin MediaRecorder: disponible = false.
2. Al soltar, manda el audio crudo con fetch a POST /api/transcribir; avisa "Escuchando…" y "Transcribiendo…"
   con onEstado y entrega el texto con onTexto.
3. transcribir.js: valida tipo y tamaño (≤ 1 MB) y llama a la transcripción de OpenAI con el modelo
   "gpt-transcribe" (K04.3). La ruta y los campos del endpoint NO están en K04: usa los que José confirmó
   ([RUTA CONFIRMADA]) o la documentación oficial si tienes internet; si no, TODO(⚪) visible y dilo en el PR.
   Sin llave → 503 IA_NO_DISPONIBLE; más de 15 s → 504 IA_TIEMPO_AGOTADO.
4. Con ?voz=simulada en la URL, la grabadora entrega "cóbrale un dulce de tamarindo" sin red (ensayo sin micrófono).
5. Nunca guardes ni registres el audio ni el texto.
CRITERIOS DE ACEPTACIÓN: 1) `npm test --prefix app` pasa con fetch simulado (éxito, sin llave, audio grande,
tiempo agotado). 2) En el preview, desde un celular: mantener, decir la frase y soltar → el texto aparece.
3) Sin micrófono, el botón no aparece y el campo de texto sigue funcionando.
ENTREGA: PR "Tarea 9: voz (mantener para hablar)" con el formato de AGENTS.md.
```

```text
MARCADORES PARA PROMPTS-CODEX
[IDEA ELEGIDA] Cóbrale: caja por voz para puestos de tianguis que cobra con QR CoDi (pey) y avisa en voz alta cuando el pago ya está confirmado.
[FRASE DE VALOR] Dices lo que te compraron, tu cliente escanea y en segundos escuchas que ya llegó tu dinero: sin comisión y sin teclear.
[PERSONA] Tianguista de fruta: cobra montos chicos con las manos ocupadas y fila de clientes.
[DEMO PASO 1] Decir "cóbrale un dulce de tamarindo" → "Entendí: …" → propuesta de $1 → Confirmar.
[DEMO PASO 2] QR CoDi grande → el cliente escanea con la app de su banco y autoriza.
[DEMO PASO 3] PAGADO "confirmado por pey", vibración y voz "Ya llegó tu dinero: un peso".
[FRASE DE DEMO] cóbrale un dulce de tamarindo
[MONTO DEMO] 1
[HERRAMIENTAS EXTRA] ninguna (la voz es la Tarea 9)
[CATÁLOGO DE EJEMPLO] dulce de tamarindo $1 · mango $15 · plátano $25/kg · fresa $60/kg (precios de ejemplo)
[ESTILO] alto contraste para sol de tianguis; botón de micrófono enorme; verde solo para PAGADO
```

### Guion de 30 segundos

> "En el tianguis casi todo se paga en efectivo, y a una miscelánea la terminal le cobra hasta 3.95 % por venta. CoDi cobra 0 %, pero casi nadie lo usa. Con Cóbrale, con las manos ocupadas, digo 'cóbrale un dulce de tamarindo', mi cliente escanea y en segundos escucho 'ya llegó tu dinero'. OpenAI entiende el pedido, el código pone los precios y pey confirma el pago, no una captura."

### Por qué gana
- **R1 · 5:** primer ejemplo oficial [SA01]; pey en el centro; la voz hace necesaria a la IA.
- **R2 · 4:** dolor en pesos (hasta 3.95 % contra 0 %) [SD24][SD31]; falta un dato de preferencia por voz (⚪, K06.7).
- **R3 · 5:** hablas, pagas y la caja te avisa; resuelve lo que falló en 2019: nadie avisaba del pago [SD35].
- **R4 · 5:** kit tal cual más una tarea; la voz tiene respaldo de texto.
- **R5 · 3:** la idea es común; se diferencia por pago real y aviso hablado.
- **R6 · 4:** "le dices y cobra" se entiende en una frase; sigue en el Hackatón México [SA03].

## K07.5 · Finalista 3: Mesa Dividida, cada quien paga lo suyo (78)

### Problema
- **Persona (K06.9): fonda familiar** con clientes de oficina: "al terminar la comida, varios pagan por separado al mismo tiempo"; clientes sin efectivo y cuentas divididas.
- **Datos:** con crédito, un restaurante paga de 2.55 % a 5.84 % por cobro (⚪ periodo del dato) [SD63]; CoDi no cobra comisión y el dinero llega en segundos [SD31]; ~85 % paga en efectivo las compras de hasta $500 [SD10].

### Frase de valor
"Cada quien paga lo suyo con su propio QR CoDi: sin comisión, sin cuentas en la servilleta y con la mesa en verde cuando todos pagaron."

### Demo exacta en 3 pasos (≤ 80 s)

| Paso | Qué dice José | Qué se ve en la pantalla | Qué pasa en el celular del comensal |
|---|---|---|---|
| 1 · Repartir | "Mesa 3: dos comidas corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce." | Reparto hecho por el servidor: Ana $110.00 · Beto $110.00 · Carlos $1.00 · **Total $221.00** → **Confirmar y generar QR**. | — |
| 2 · Tres QR | "Cada quien escanea el suyo." | Tablero con tres tarjetas (nombre, monto, estado); al tocar la de Carlos, su QR se ve grande. | José, como Carlos, escanea y autoriza $1 [SB31]. |
| 3 · La mesa en verde | "Carlos pagó con CoDi y Ana en efectivo." | Carlos en verde "confirmado por pey"; José toca "Pagó en efectivo" en Ana (gris, "registrado por ti"); arriba: "Pagado $111.00 de $221.00 · falta Beto". | Su banco confirma el pago. |

**Tope:** las partes de $110 no caben en `MAX_MONTO_MXN=20`. Esta idea pide `MAX_MONTO_MXN=150` en Production; paga solo la tarjeta de $1, porque lo pagado a la cuenta de prueba no se devuelve [SB07].

### Alcance del MVP
- **Sí:** dictar o escribir el reparto → `crear_reparto` → partes calculadas por el servidor → confirmar → un cobro por comensal (máximo 6) → tablero con estado por persona → "Pagó en efectivo" → resumen; SIMULACIÓN y MODO PRUEBA visibles.
- **Debería:** voz (Tarea 9 de K07.4); propina opcional; "Mesa pagada" en voz alta.
- **No:** comandas, inventario, propinas obligatorias, cuentas de usuario, base de datos.

### Arquitectura
Núcleo común (K07.2) más:

| Archivo en `app/` | Qué hace | OpenAI o pey | Tarea |
|---|---|---|---|
| `api/agente.js` + `api/_lib/agente.js` | "Mesa 3: …" → propuesta de mesa | Responses API, `gpt-6.1-sol`, `crear_cobro` y `crear_reparto` estrictos [SC13] | T3 |
| `api/_lib/reparto.js` | Precio del catálogo × cantidad; cada consumo se divide entre quienes lo pagan; los centavos sobrantes al primero; la suma es exacta | — (código) | T3 |
| `api/cobros.js` (× N) | Un cobro por comensal | `POST /codi/qr` con `metadata` (mesa y comensal) [SB10] | T2 |
| `js/mesa.js` + `css/mesa.css` | Tablero, QR grande al tocar, "Pagó en efectivo", resumen; usa `crearSeguidor` de `estado-pago.js` | — | T6 |

```json
{
  "type": "function",
  "name": "crear_reparto",
  "description": "Propone cómo dividir la cuenta de una mesa. NO cobra: el servidor pone precios del catálogo, divide y suma; la persona confirma.",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {
      "mesa": { "type": "string" },
      "comensales": { "type": "array", "items": { "type": "string" } },
      "consumos": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "producto_id": { "type": "string" },
            "cantidad": { "type": "number" },
            "pagan": { "type": "array", "items": { "type": "string" }, "description": "Quiénes pagan este consumo en partes iguales" }
          },
          "required": ["producto_id", "cantidad", "pagan"],
          "additionalProperties": false
        }
      }
    },
    "required": ["mesa", "comensales", "consumos"],
    "additionalProperties": false
  }
}
```

Si crear tres QR con imagen tarda, la Tarea 2 puede usar `generateImage: false` y dibujar `qrString` con `qrcode` [SB10][SB23].

### Riesgos y plan B

| Riesgo | Señal | Plan B |
|---|---|---|
| Nadie más tiene CoDi activo | Un juez no puede pagar | José paga la parte de $1; las demás quedan pendientes o "en efectivo"; no pidas a los jueces pagar montos altos. La activación puede pedir depósito y SMS [SB34] |
| Tope alto con dinero real | Alguien paga una tarjeta de $110 | Paga solo la de $1; regresa `MAX_MONTO_MXN=20` después de la demo |
| Límite de peticiones de pey (⚪) | 429 | Una consulta cada 4 s por QR, con desfase |
| Reparto ambiguo | La suma no cuadra o falta un nombre | El servidor recalcula y pregunta; confirmación antes de cobrar |
| pey caído | 5xx | SIMULACIÓN etiquetada y video |

### Plan de tareas para Codex

| K07 | Se lanza como | Toca SOLO | Qué agrega en Mesa Dividida |
|---|---|---|---|
| T1 | Prompt 1 tal cual | Esqueleto | Nada específico |
| T2 | Prompt 2 | Archivos de pey (núcleo) | Nada específico |
| T3 | Prompt 3 + ajuste | Archivos del agente + `app/api/_lib/reparto.js` y `app/tests/reparto.test.js` (nuevos) | `crear_reparto`; catálogo: comida corrida $95, agua de litro $30, café de olla $15, dulce $1 (precios de ejemplo); propuesta `{tipo: "mesa", mesa, total, comensales: [{etiqueta, concepto, monto, detalle}]}`; prueba con la frase de demo → 110, 110 y 1 |
| T4 | Prompt 4 + ajuste | Archivos de interfaz | Vista de confirmación con la lista de partes; al confirmar, `import("./mesa.js")` dinámico → `mostrarMesa(propuesta)`; si falla, ofrece cobrar el total en un solo QR |
| T5 | Prompt 5 | Archivos de `estado-pago` | `crearSeguidor` exportado y estable (ya lo pide el Prompt 5) |
| T6 | **Tarea 9** (abajo) | `app/js/mesa.js`, `app/css/mesa.css`, `app/tests/mesa.test.js` | Tablero de la mesa |

```text
TAREA 9 · Tablero de la mesa: un cobro y un QR por comensal
CONTEXTO: Mesa Dividida (K07.5). Pasos 2 y 3 de la demo: cada quien paga su QR y la mesa se pone verde.
LEE: AGENTS.md; docs/PRD.md; app/js/api.js y app/js/estado-pago.js (NO los cambies).
ALCANCE (solo archivos nuevos): app/js/mesa.js · app/css/mesa.css · app/tests/mesa.test.js
QUÉ HACER:
1. mostrarMesa(propuesta, {alTerminar}): crea su propia sección; por comensal crea un cobro con api.crearCobro
   (en paralelo, máximo 6) y pinta una tarjeta: nombre, monto, estado y QR chico; al tocarla, QR grande.
2. Sigue cada cobro con crearSeguidor de estado-pago.js (importa con `import * as`; si aún no existe, consulta
   api.consultarEstado cada 4 s), con desfase entre tarjetas y sin dos consultas a la vez del mismo cobro.
3. Resumen: "Pagado $X de $Y · faltan N". Cuando todas estén pagadas, alTerminar().
4. Botón "Pagó en efectivo" por tarjeta: estado EFECTIVO ("registrado por ti"), distinto de PAGADO por pey.
5. "Simular pago" por tarjeta solo si cobro.entorno === 'simulacion'.
CRITERIOS DE ACEPTACIÓN: 1) `npm test --prefix app` pasa con un seguidor falso (pagar una tarjeta no cambia
las demás; efectivo no cuenta como pey; resumen correcto). 2) A 360 px una columna; a 1280 px tres por fila.
3) En SIMULACIÓN: confirmar la mesa → 3 QR → "Simular pago" en una → su tarjeta en verde.
ENTREGA: PR "Tarea 9: tablero de la mesa" con el formato de AGENTS.md.
```

```text
MARCADORES PARA PROMPTS-CODEX
[IDEA ELEGIDA] Mesa Dividida: la fonda dicta la cuenta y cómo se reparte; cada comensal paga su parte con su propio QR CoDi (pey).
[FRASE DE VALOR] Cada quien paga lo suyo con su propio QR CoDi: sin comisión, sin cuentas en la servilleta y con la mesa en verde cuando todos pagaron.
[PERSONA] Fonda familiar con clientes de oficina: al terminar la comida, varios pagan por separado al mismo tiempo.
[DEMO PASO 1] "Mesa 3: dos comidas corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce" → 110, 110 y 1 → Confirmar.
[DEMO PASO 2] Tablero con 3 QR; Carlos escanea el suyo y paga $1.
[DEMO PASO 3] Carlos en verde "confirmado por pey"; Ana "pagó en efectivo"; resumen "Pagado $111 de $221".
[FRASE DE DEMO] Mesa 3: dos comidas corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce
[MONTO DEMO] 1 (la parte de Carlos; MAX_MONTO_MXN=150 en esta idea)
[HERRAMIENTAS EXTRA] crear_reparto (K07.5)
[CATÁLOGO DE EJEMPLO] comida corrida $95 · agua de litro $30 · café de olla $15 · dulce $1 (precios de ejemplo)
[ESTILO] cálido de fonda con alto contraste; una tarjeta grande por persona; verde = pagado por pey, gris = efectivo
```

### Guion de 30 segundos

> "Dos de la tarde en una fonda: la mesa pide la cuenta y empieza el '¿cuánto es de cada quien?'. Con tarjeta, la fonda paga comisión en cada cobro. Con Mesa Dividida digo 'dos corridas y un agua de litro, parejo entre Ana y Beto; Carlos solo un dulce', y cada quien recibe su propio QR CoDi: paga desde su banco, sin comisión, directo a la cuenta de la fonda. OpenAI reparte, el código suma y pey confirma."

### Por qué gana
- **R1 · 4:** cobro CoDi múltiple con pey; la IA entiende el reparto dicho en español.
- **R2 · 4:** fonda de K06.9 con su momento de pago exacto; comisión con crédito en restaurantes (⚪ periodo) [SD63].
- **R3 · 4:** tablero que se pone verde persona por persona; un juez puede pagar la parte de $1.
- **R4 · 4:** kit más reparto determinista y varios seguidores; pide subir el tope.
- **R5 · 3:** dividir la cuenta ya existe; con CoDi y lenguaje natural, poco.
- **R6 · 4:** "¿cuánto es de cada quien?" es universal.

## K07.6 · Recomendación final

### La idea número 1 y por qué

**Recomendación:** construye **¿Ya cayó?** (K07.3).

1. **Mejor puntuación** (94) y primera también con los pesos de K08.3 (92) (K07.1).
2. **Es el reto completo:** cobro para comercios de barrio con CoDi y pey [SA01], dinero directo a la cuenta del comercio [SB38], comisión 0 % como pide AI Builders [SA03], y la experiencia de quien recibe el dinero, que pey dice que falta resolver [SB37].
3. **Ataca la causa, no el síntoma:** CoDi no despegó por fricción y desconfianza [SA42]; K06.6 pide justo esto: nunca validar con captura y un botón "¿ya me pagaron?" que consulte el estado real.
4. **Demo robusta:** la captura se sube como archivo (sin micrófono ni ruido) y el veredicto con cobro activo lo decide el estado de pey, no el modelo [SA45].
5. **Crece sin rehacer nada:** comparte núcleo con Cóbrale y Mesa Dividida; si sobra tiempo, la voz de Cóbrale (su Tarea 9) se suma como otra tarea con archivos propios.

### Su demo en 3 pasos
1. **Cobrar:** "Cóbrale un dulce de tamarindo" → $1 → Confirmar → QR CoDi.
2. **La captura:** "Revisar una captura" → la IA lee $1.00, 13:58 y la clave → "Todavía no cae: no entregues".
3. **¡Ya cayó!:** la clienta paga desde su banco → "¡Ya cayó! $1.00, confirmado por pey", en voz alta.

En el guion de K09.3, los pasos 1 y 2 de K09 se vuelven el paso 1 de aquí, y el paso 2 de K09 pasa a ser la captura.

### Si el reto o los criterios oficiales piden otra cosa

| Si piden… | Haz esto | Tiempo |
|---|---|---|
| 1 · Comercio comunitario o "solicitudes de pago" | Cambia a **La Libreta** (idea 5): fiado apuntado con IA y cobro con `POST /codi/pn` al celular del cliente, seguido con `GET /transaction/{id}` [SB10][SB18]; QR de respaldo si la notificación no llega (⚪, depende del banco del cliente [SB30]). Para varios pagadores, **Mesa Dividida** (K07.5) | 45–60 min sobre el núcleo |
| 2 · Lo más nuevo de OpenAI o una app "dentro de ChatGPT" | La caja sigue como demo principal; suma un servidor MCP en `/mcp` con `crear_cobro`, `consultar_cobro` y la revisión de capturas (K04.11, K05.14) [SC22][SC24]. Hazlo en una tarea sola porque agrega dependencias; Plus y modo desarrollador ⚪ [SC25][SC59]. Plugins y MCP Events fueron novedad del DevDay 2026 [SA29] | 45–60 min sin interfaz |
| 3 · Flujos empresariales o conciliación | Suma el corte de caja con `resumen_de_ventas` y `metadata` por pedido (K03.9), o Remisión a Cobro (idea 9) con visión | 30–60 min |

**Si publican criterios con pesos:** ponlos en R1–R6, recalcula el desglose de K07.2 y cambia de idea solo si otra le gana a ¿Ya cayó? por 5 puntos o más; menos que eso está dentro del error de la estimación. **Si pey no da llaves o no se puede cobrar:** misma idea en SIMULACIÓN etiquetada más el video del cobro real de esta noche (K03.6).

### Qué cortar primero si no alcanza el tiempo
1. Todo lo "Debería" (voz para dictar, resumen del día).
2. El aviso hablado: queda "¡Ya cayó!" en pantalla y la vibración.
3. La lectura con IA de la captura: el monto se escribe a mano y el veredicto contra pey sigue.
4. "Revisar una captura" completa: el paso 2 se hace con el botón "¿Ya cayó?" que consulta pey.
5. El agente: "Capturar a mano".

**Nunca cortes:** confirmar → QR real → estado de pey → "¡Ya cayó!"; las etiquetas MODO PRUEBA o SIMULACIÓN; el README que dice qué es real; el video de respaldo (K08.3, K08.13).

### Hitos del sábado (reloj del RUNBOOK: T = 10:30)

| Hora | Hito de ¿Ya cayó? | Si no se cumple |
|---|---|---|
| 10:35 | Prompt 1 lanzado tal cual | Sigue: no depende de la idea |
| 11:00 | `docs/PRD.md` copiado de K07.3 | Toma K07.3 tal cual |
| 11:10–11:20 | Prompts 2–5 con ajustes y Tarea 9 lanzados | Con límite bajo: 2, 3 y 9 primero |
| 13:00 | Cobro real de $1 en producción y "Todavía no cae" con la captura de ejemplo | Recortes 3 y 4; congela funciones nuevas (K08.4) |
| 14:45 | Congelar | Se congela igual |
| 15:15 | Videos: los 3 pasos y el cobro real | Graba con el celular |
| 15:30 | Entrega interna | Lo que falte, domingo antes de las 11:00 |

### Lo que José resuelve esta noche
1. **pey de punta a punta:** cuenta de prueba ligada a tu llave, cobro real de $0.01–$1 con el `curl` de K03.3 pagado desde tu app con CoDi activo (algunos bancos validan con depósito y SMS [SB34]) y la pantalla grabada. Revisa que `GET /transaction/api-key` regrese ese pago: es la base de la búsqueda. Lo pagado no se devuelve [SB07].
2. **OpenAI con visión:** llave con saldo (US$5 o más te pasa al tier Build [SC26]) y una llamada a `gpt-6.1-sol` con `input_image` y salida estructurada sobre tu captura ficticia (la forma de K04.2 es ⚪). Haz esa imagen hoy, sin marcas de bancos reales.
3. **Codex y Vercel listos:** entorno de Codex publicado y tablero de uso revisado (Plus comparte una bolsa de 5 horas y las tareas cloud gastan más [SC44]); Vercel con Root Directory `app`, Preview en SIMULACIÓN y el dominio de producción anotado para el webhook [SB43].

## K07.7 · Ideas descartadas y antipatrones

| Idea o patrón | Por qué no | Base |
|---|---|---|
| Chatbot de educación financiera o "asesor CoDi" sin cobro | El reto pide cobros CoDi con pey; un chat genérico sin cobro aleja a los organizadores (K02.13) | [SA01] |
| Agente que cobra solo | El modelo propone, la persona confirma y el servidor impone el tope (K03.9) | [SA45] |
| Terminal con un chat pegado | IA decorativa: C3 nivel 1 de K08.5 | K08.5 |
| Cripto o stablecoins "sobre CoDi" | Fuera del reto; aunque sea fortaleza de José (K10.1), distrae del cobro CoDi | [SA01] |
| Cobros a turistas con CoDi | Se cobra a cuentas de bancos participantes con app compatible [SB26][SB30]; el turista típico no la tiene (inferencia) | [SB30] |
| Tandas o pagos a terceros desde la app | pey solo documenta cobros, consultas, CLABEs y links (K03.4); no hay pagos salientes y se manejaría dinero ajeno | [SB10] |
| Prometer que se verifica cualquier transferencia SPEI | No hay API del CEP en la base (⚪); se promete lo que no se muestra | [SD41] |
| Registrar en vivo CLABEs reales de locatarios | `ACTIVE` tarda hasta 5 días hábiles y se exponen datos personales | [SB13] |
| WhatsApp Business real | Alta y aprobación fuera de la base (⚪); no cabe en 4.5 h; mejor un chat web con estilo conocido | — |
| Vales Mercomuna con CoDi | Formato del vale y pago al comercio no verificados (K06.8 ⚪) | [SD58] |
| Crédito o scoring con IA | Datos personales y regulación; no se demuestra en 80 s | — |
| Agent Builder, Assistants API o `gpt-image-1` | Se apagan o ya se apagaron | [SC20][SC21] |
| Plataforma de varios lados o marketplace | Demasiadas pantallas para 80 s | K08.11 |
| Depender de que los jueces tengan CoDi activo | La activación puede pedir depósito y SMS: la demo se atora | [SB34] |
| Montos reales altos con la cuenta de prueba | Lo pagado no se devuelve | [SB07] |

**Antipatrones de ejecución (restan aunque la idea sea buena):** demo sin respaldo; SIMULACIÓN sin etiqueta; datos o testimonios inventados; llaves en el repo, que OpenAI desactiva si se filtran [SA54]; Codex sin evidencia (tareas, PRs, bitácora; K08.12); pitch de más de 2–3 minutos [SA50]; voz o visión como único camino sin respaldo de texto.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA01 | DevDay Exchange Community Hackathon: Mexico City (página oficial en Luma; coincide con el boleto del participante) | https://luma.com/f755f0k6 | 2026-11-06 |
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA29 | InfoQ: OpenAI DevDay 2026 | https://infoq.com/news/2026/10/openai-devday-2026 | 2026-11-06 |
| SA42 | DPL News: México, desestiman a CoDi población y comercios (2022) | https://dplnews.com/?p=173032 | 2026-11-06 |
| SA45 | OpenAI Developers Blog: Build Week winners | https://developers.openai.com/blog/build-week-winners | 2026-11-06 |
| SA50 | Codex Community Mini-Hackathon, San Francisco #5 | https://luma.com/7025i1j5 | 2026-11-06 |
| SA54 | GitHub Changelog: RubyGems, Adobe and OpenAI are now secret scanning integrators (8 jun 2021) | https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators | 2026-11-06 |
| SB07 | Documentación de pey: Crear una API key | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/ | 2026-11-06 |
| SB08 | Documentación de pey: Configurar webhooks | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/ | 2026-11-06 |
| SB10 | CoDi API: especificación OpenAPI (versión 2026-10-20) | https://docs.pey.mx/openapi.json | 2026-11-06 |
| SB13 | Documentación de pey: Register Bank Account | https://docs.pey.mx/docs/api/register-bank-account | 2026-11-06 |
| SB15 | Documentación de pey: Get CoDi QR Transactions | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 2026-11-06 |
| SB17 | Documentación de pey: webhook CoDi QR, pago recibido | https://docs.pey.mx/docs/webhooks/codi/qr | 2026-11-06 |
| SB18 | Documentación de pey: webhook CoDi notificación push, pago recibido | https://docs.pey.mx/docs/webhooks/codi/pn | 2026-11-06 |
| SB21 | Documentación de pey: tipo Respuesta de metadata | https://docs.pey.mx/docs/types/metadata-response | 2026-11-06 |
| SB23 | Documentación de pey: tutorial Mostrar un QR CoDi | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 2026-11-06 |
| SB26 | Banco de México: CoDi, Cobro Digital | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html | 2026-11-06 |
| SB30 | CoDi (codi.org.mx): CoDi® para cobrar | https://www.codi.org.mx/secundarias/cobrar.html | 2026-11-06 |
| SB31 | CoDi (codi.org.mx): CoDi® para pagar | https://www.codi.org.mx/secundarias/pagar.html | 2026-11-06 |
| SB33 | Expansión: cómo pagar con CoDi en BBVA, Santander y otros bancos (2026) | https://expansion.mx/finanzas-personales/2026/07/27/como-pagar-codi-bba-santander-bancos | 2026-11-06 |
| SB34 | Expansión: cobrar sin comisiones con CoDi (abril 2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SB37 | Merca2.0: Pey, AI Builders México y SpaceXAI realizarán hackatón de pagos digitales (noviembre 2026) | https://www.merca20.com/pey-ai-builders-mexico-y-spacexai-realizaran-hackaton-de-pagos-digitales-en-mexico/ | 2026-11-06 |
| SB38 | InformaBTL: el 14 de diciembre cambiarán las transferencias; Pey apuesta por pagos QR sin comisiones (noviembre 2026) | https://www.informabtl.com/pagos-qr-mexico-14-diciembre-2026-pey-codi/ | 2026-11-06 |
| SB39 | Standard Webhooks: especificación | https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md | 2026-11-06 |
| SB43 | Vercel: Deployment Protection | https://vercel.com/docs/deployment-protection | 2026-11-06 |
| SC06 | Models (OpenAI API docs) | https://developers.openai.com/api/docs/models | 2026-11-06 |
| SC07 | Pricing (OpenAI API docs) | https://developers.openai.com/api/docs/pricing | 2026-11-06 |
| SC08 | GPT-6.1 Sol: Features, Benchmarks, Pricing, and Access (DataCamp) | https://www.datacamp.com/blog/gpt-6-1-sol | 2026-11-06 |
| SC10 | WebRTC (OpenAI API docs) | https://developers.openai.com/api/docs/guides/voice-webrtc | 2026-11-06 |
| SC12 | Structured model outputs (OpenAI API docs) | https://developers.openai.com/api/docs/guides/structured-outputs.md | 2026-11-06 |
| SC13 | Function calling (OpenAI API docs) | https://developers.openai.com/docs/guides/function-calling | 2026-11-06 |
| SC20 | Agent Builder (OpenAI API docs) | https://developers.openai.com/api/docs/guides/agent-builder | 2026-11-06 |
| SC21 | Deprecations (OpenAI API docs) | https://developers.openai.com/api/docs/deprecations | 2026-11-06 |
| SC22 | Connect and test your plugin (OpenAI) | https://developers.openai.com/plugins/deploy/connect-chatgpt | 2026-11-06 |
| SC24 | MCP server and UI quickstart (OpenAI) | https://developers.openai.com/apps-sdk/quickstart | 2026-11-06 |
| SC25 | ChatGPT Developer Mode: Where It Is and How to Turn It On (Carly) | https://www.usecarly.com/blog/chatgpt-developer-mode/ | 2026-11-06 |
| SC26 | Rate limits (OpenAI API docs) | https://developers.openai.com/api/docs/guides/rate-limits.md | 2026-11-06 |
| SC44 | Codex Pricing (OpenAI; redirige a learn.chatgpt.com/docs/pricing.md) | https://developers.openai.com/codex/pricing.md | 2026-11-06 |
| SC59 | How to Connect GitHub to ChatGPT — via MCP (AnythingMCP) | https://anythingmcp.com/guides/connect-github-to-chatgpt | 2026-11-06 |
| SD06 | Ruptura360 · Banxico le dice adiós a la CLABE obligatoria (10-sep-2026) | https://ruptura360.mx/periodismo-de-servicio/banxico-nuevas-reglas-transferencias-bancarias-2026/ | 2026-11-06 |
| SD10 | Expansión · Diputados aprueban Ley de Economía Digital (6-oct-2026) | https://expansion.mx/economia/2026/10/06/diputados-aprueban-ley-de-economia-digital | 2026-11-06 |
| SD24 | Banxico · Tasas de descuento con tarjeta de débito, giro Miscelánea (julio 2026) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-debito-por-gir/%7BCE998D24-7B96-F2C4-AF17-C29673DC35D2%7D.pdf | 2026-11-06 |
| SD31 | Expansión · ¿Te cobran comisión al aceptar tarjeta? Banxico tiene una alternativa (9-abr-2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SD33 | La Razón · Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025) | https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/ | 2026-11-06 |
| SD35 | Xataka México · Probamos CoDi: lo que nos encanta y lo que odiamos (1-oct-2019) | https://www.xataka.com.mx/banca-digital/probamos-codi-que-nos-encanta-que-odiamos-que-tiene-que-resolver-banxico-para-su-implementacion-mexico | 2026-11-06 |
| SD38 | Vanguardia · Más de 2.4 millones de fraudes bancarios en México durante 2025 (3-nov-2025) | https://vanguardia.com.mx/noticias/mexico/crece-la-estafa-digital-mas-de-24-millones-de-fraudes-bancarios-en-mexico-durante-2025-MK17956794 | 2026-11-06 |
| SD39 | Xataka México · Fraudes bancarios encontraron su objetivo vulnerable: adultos mayores (19-abr-2026) | https://www.xataka.com.mx/banca-digital/fraudes-bancarios-mexico-encontraron-su-objetivo-vulnerable-adultos-mayores/amp | 2026-11-06 |
| SD40 | La Crónica · Asociados a fraudes, 30 % de los expedientes en Condusef (17-mar-2026) | https://www.cronica.com.mx/negocios/2026/03/17/asociados-a-fraudes-30-por-ciento-de-los-expedientes-en-condusef/ | 2026-11-06 |
| SD41 | Grupo Animal · ¿Recibiste una supuesta transferencia bancaria? Así verifícala (28-jul-2026) | https://grupoanimal.mx/explicaciones/transferencia-bancaria-falsa-comprobante | 2026-11-06 |
| SD45 | INEGI · ENDUTIH 2025, presentación de resultados | https://www.inegi.org.mx/contenidos/programas/endutih/2025/doc/presentacion_endutih2025.pdf | 2026-11-06 |
| SD47 | Xataka México · México quiere despedirse del efectivo en carreteras y gasolineras (27-abr-2026) | https://www.xataka.com.mx/politica/mexico-quiere-despedirse-efectivo-carreteras-gasolineras-problema-que-millones-necesitan/amp | 2026-11-06 |
| SD50 | Chilango · Utopía Elena Poniatowska abre en Coyoacán: servicios (ago-2026) | https://www.chilango.com/ciudad/utopia-elena-poniatowska-amor-abre-sus-puertas-en-coyoacan-estos-servicios-ofrecera/ | 2026-11-06 |
| SD55 | Expansión Política · Las 14 acciones de la CDMX para mejorar los mercados (12-feb-2025) | https://politica.expansion.mx/cdmx/2025/02/12/las-14-acciones-que-emprendera-la-cdmx-para-mejorar-los-mercados | 2026-11-06 |
| SD58 | Chilango · Vales Mercomuna: CDMX entregará 700 mil apoyos en 2026 | https://www.chilango.com/noticias/vales-mercomuna-cdmx-entregara-700-mil-apoyos-2026/amp/ | 2026-11-06 |
| SD63 | Banxico · Tasas de descuento con tarjeta de crédito por giro (periodo no indicado; archivo de 2025) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-credito/%7BA896D818-3D13-4922-B54B-4B6D58E99479%7D.pdf | 2026-11-06 |

(previo) = dato verificado por el equipo antes de esta sesión y no reconsultado aquí. No se agregaron fuentes SE: el límite de búsquedas web de la sesión estaba agotado; todo lo nuevo sin fuente está marcado ⚪ o como cálculo propio.

<!-- ===== FIN: conocimiento/07-ideas-puntuadas.md ===== -->

<!-- ===== INICIO: conocimiento/08-criterios-y-jueces.md ===== -->

---
id: K08
titulo: "Criterios, jueces y cómo ganar: rúbrica, preguntas, errores y ganadores previos"
resumen: "Criterios probables con pesos (inferencia), rúbrica 1–5, preguntas de jueces, errores que restan, ganadores previos y cómo demostrar Codex; léelo al elegir la idea y antes del pitch."
responde:
  - "¿Cómo se evaluará el proyecto y qué pesa más?"
  - "¿Cómo me autoevalúo antes de entregar?"
  - "¿Cómo funciona el voto de la comunidad y cómo me preparo?"
  - "¿Qué preguntarán los jueces?"
  - "¿Qué errores restan puntos o descalifican?"
  - "¿Qué tipo de proyectos han ganado en hackatones de Codex y OpenAI, y por qué?"
  - "¿Cómo demuestro en el pitch que usé Codex?"
actualizado: 2026-11-06
confianza: media
fuentes: [SA01, SA03, SA05, SA06, SA07, SA08, SA09, SA10, SA11, SA28, SA29, SA40, SA45, SA46, SA47, SA48, SA49, SA50, SA51, SA52, SA53, SA54, SA58]
---

# K08 · Criterios, jueces y cómo ganar

## TL;DR

- Los criterios oficiales del 7 de noviembre no están publicados: habrá jurado y después un voto comunitario [SA01]. Los pesos de K08.3 son inferencia.
- En eventos hermanos se repiten cuatro ejes: utilidad o impacto, que funcione (ejecución técnica), uso interesante de Codex u OpenAI, y originalidad con un pitch claro [SA07][SA45][SA50].
- Lo que ha ganado: herramientas para un usuario concreto, con código determinista y un modelo acotado, la persona en control y buen detalle de UX [SA45].
- Restan o descalifican: demo que falla, datos inventados, no usar Codex u OpenAI, llaves expuestas y romper reglas de código previo (⚪ regla no publicada) [SA50][SA54].
- Demuestra Codex con evidencia verificable: AGENTS.md, tareas en paralelo, PRs enlazados y tiempos, resumidos en una diapositiva (K08.12).
- Entrega antes del domingo a las 13:00 un paquete que se defienda solo: demo con URL, video corto y README claro [SA01].

## K08.1 · Lo que sí sabemos de la evaluación (oficial)

- La página oficial menciona demos de proyectos y evaluación, sin detallar el formato [SA01].
- El jurado anuncia ganadores el lunes 9 por la mañana; después, un voto comunitario elige de 1 a 3 ganadores más [SA01].
- Criterios, asignación de boletos, elegibilidad y condiciones se confirmarán más adelante [SA01] (⚪).
- Entrega en el portal del evento hasta el domingo 8 a las 13:00 [SA01].
- Reto: herramientas de bien público con OpenAI y CoDi usando la API de pey [SA01].
- Premio: bolsa de 10 boletos al DevDay Exchange oficial; ⚪ no se sabe si existe un "primer lugar" [SA01].

Implicación (inferencia): como el anuncio llega dos días después, el jurado probablemente revisará lo entregado en el portal, y quizá también una demo en vivo el sábado (⚪). El paquete entregado tiene que convencer aunque no estés presente.

**Recomendación:** un juez debe poder entender y probar el proyecto en 2 minutos desde el README: problema en una frase, video o GIF, enlace a la demo, qué hace OpenAI, cómo se usó Codex, cómo se cobra con CoDi y pey, qué es simulación y qué es real, y limitaciones.

## K08.2 · Criterios publicados en eventos hermanos

| Evento | Criterios o formato publicado | Fuente |
|---|---|---|
| Bengaluru, DevDay Exchange Community (10 oct 2026) | Utilidad, ejecución técnica, originalidad y qué tan bien funciona; cada quien muestra qué construyó, qué problema resuelve y cómo usó herramientas de OpenAI | [SA07] |
| San Francisco, Codex Community Mini-Hackathon (26 may 2026) | Uso interesante de Codex, valor práctico, claridad del pitch, ejecución y viabilidad, preguntas y comunicación; 2 min de pitch, 2 de preguntas y 1 diapositiva; obligatorio usar ChatGPT y Codex | [SA50] |
| OpenAI Build Week (oficial, 2026) | Implementación técnica, diseño y UX, impacto potencial y calidad de la idea; proyecto ejecutable, repo y video de menos de 3 min | [SA45][SA46] |
| París (24–26 oct 2026) | Demo corta con preguntas y retroalimentación del jurado; Codex o API de OpenAI | [SA06] |
| Bangkok (3 oct 2026) | Votación del público; enlace desplegado y accesible para evaluar | [SA05] |
| JetBrains x Codex (abr 2026) | El jurado valoró visibilidad sobre lo que hacen los agentes, límites, corrección y seguridad por encima de la velocidad | [SA47] |
| Londres y Guadalajara | Se permitía proyecto nuevo o extender uno de código abierto existente | [SA10][SA08] |
| Nueva Delhi (1 nov 2026) | Construir algo real en un día; criterios no publicados | [SA09] |

## K08.3 · Criterios probables y pesos estimados (inferencia)

No es oficial: combina K08.2 con el reto del 7 de noviembre [SA01].

| # | Criterio | Peso estimado | Por qué |
|---|---|---|---|
| C1 | Impacto y utilidad para comercios (bien público, comisión 0%) | 25% | Es el reto oficial y la misión de AI Builders [SA01][SA03]; utilidad en Bengaluru [SA07] |
| C2 | Ejecución: funciona de punta a punta, con cobro CoDi real o de prueba | 25% | Ejecución y qué tan bien funciona [SA07][SA50] |
| C3 | Uso de OpenAI y Codex: necesario, interesante y visible | 20% | Criterio explícito en San Francisco y Bengaluru [SA50][SA07]; el anfitrión es Codex Ambassador [SA01] |
| C4 | Originalidad y calidad de la idea | 15% | [SA07][SA45] |
| C5 | Pitch, diseño y respuestas | 15% | [SA45][SA50] |

El voto comunitario es un carril aparte; ahí probablemente pesa lo fácil que es entender y compartir la demo (inferencia).

**Recomendación:** si falta tiempo, nunca sacrifiques C2 ni el cobro con pey; recorta funciones secundarias. Un proyecto pequeño que funciona le gana a uno grande que falla.

## K08.4 · Rúbrica 1–5: impacto (C1) y ejecución (C2)

| Nivel | C1 Impacto y utilidad | C2 Ejecución |
|---|---|---|
| 1 | Problema vago, sin usuario | Solo pantallas o diapositivas |
| 2 | Usuario genérico ("las pymes") | Piezas sueltas que no se conectan |
| 3 | Usuario claro, beneficio genérico | Funciona en local con datos simulados; lo simulado no está etiquetado |
| 4 | Usuario concreto y dolor medible | Demo desplegada; cobro de prueba de punta a punta |
| 5 | Usuario concreto (por ejemplo, un puesto de mercado), dolor medible (comisión, tiempo de cobro, conciliación, efectivo), beneficio con supuestos explícitos, pensado para personas no expertas y con siguiente paso real | URL pública que funciona en celular; crear cobro → QR o solicitud → pago → webhook con firma verificada → acción de la IA; errores manejados; SIMULACIÓN visible si aplica; video de respaldo; README reproducible; cero llaves en el repo |

**Recomendación:** si C2 sigue en 3 o menos a las 13:00 del sábado, congela funciones nuevas y dedica todo a cerrar el flujo de cobro.

## K08.5 · Rúbrica 1–5: OpenAI y Codex (C3), originalidad (C4) y pitch (C5)

| Nivel | C3 OpenAI y Codex | C4 Originalidad | C5 Pitch, diseño y respuestas |
|---|---|---|---|
| 1 | IA decorativa; Codex no aparece | Clon de una terminal de cobro | Demo sin historia y con jerga |
| 3 | Una llamada útil al modelo; Codex usado sin evidencia | Combinación conocida bien hecha | Historia clara, pero se pasa del tiempo |
| 5 | La IA es necesaria y está acotada (salida estructurada, montos validados por código, confirmación humana); evidencia de Codex: AGENTS.md, 3 o más tareas en paralelo, PRs fusionados con enlace y tiempos; una novedad de OpenAI solo si está probada | Ángulo propio explicable en una frase (canal: voz o chat; población: personas mayores; caso: fiado, tandas, cooperativas) | Problema → demo → impacto en 3 minutos o menos; una diapositiva de cómo se construyó; respuestas de 20 segundos; interfaz simple en español claro |

Los niveles 2 y 4 quedan entre las descripciones vecinas.

**Recomendación:** autoevalúate a las 12:00 y a las 15:00 del sábado; cualquier criterio por debajo de 3 se vuelve la prioridad.

## K08.6 · El voto de la comunidad

- Existe: tras el anuncio del jurado del lunes 9, la comunidad elige de 1 a 3 ganadores más [SA01]. ⚪ No se ha publicado quién vota, dónde ni hasta cuándo.
- Precedente: en Bangkok hubo exhibición de proyectos y votación del público, y se pidió que los enlaces siguieran accesibles para evaluar [SA05].
- En San Francisco la claridad del pitch y la comunicación fueron criterios explícitos [SA50].

**Recomendación:**
- Demo con URL estable que funcione en celular y no pida registro.
- Video de 60–90 segundos, subtitulado en español, que muestre el cobro funcionando.
- Una frase y una imagen para compartir (problema y resultado).
- Si las reglas lo permiten (⚪), compártelo en redes y en los canales de la comunidad, sin spam y sin ofrecer nada a cambio de votos.
- No dependas del voto: es un carril extra; el jurado sigue siendo lo principal.

## K08.7 · Preguntas típicas de jueces

Lista inferida de los criterios de K08.2 y de las lecciones de Build Week [SA50][SA45]; prepara respuestas de 20 segundos:

1. ¿Quién es el usuario exacto y cómo sabes que tiene este problema? (Si es un supuesto, dilo.)
2. ¿El cobro es real o simulado? (Di exactamente qué es real: cobro en producción con monto chico, cuenta de prueba o SIMULACIÓN etiquetada; ver K03.)
3. ¿Por qué CoDi y no tarjeta o transferencia? (Comisión 0%, dinero inmediato y directo a la cuenta [SA03][SA40].)
4. ¿Qué hace la IA que un formulario no podría hacer?
5. ¿Cómo evitas que el modelo invente montos o datos? (Validación en código y confirmación de la persona [SA45].)
6. ¿Qué hizo Codex y qué decidiste tú? (Números, PRs y decisiones.)
7. ¿Qué pasa si falla el webhook o el internet? (Estado pendiente, reintento, confirmación manual.)
8. ¿Dónde viven las llaves y los datos personales? (Solo en el servidor, como secretos; ver K08.9.)
9. ¿Cuánto cuesta operar por comercio al mes? (Estimación con supuestos.)
10. ¿Qué construiste hoy y qué existía antes? (Historial de commits y PRs con hora.)
11. ¿Qué sigue en dos semanas? (Piloto o Hackatón México [SA03].)

**Recomendación:** ensaya en voz alta la 2, la 5 y la 6: tocan dinero, confianza en la IA y autoría, los tres temas más sensibles de este reto.

## K08.8 · Errores que restan o descalifican

| Error | Por qué cuesta | Cómo evitarlo |
|---|---|---|
| Usar código previo si no se permite (⚪ regla no publicada; Londres y Guadalajara permitían extender código abierto [SA10][SA08]) | Posible descalificación | Escribir el código del proyecto el sábado; declarar en el README qué existía antes (base de conocimiento, plantillas) y qué se hizo ese día |
| Datos, comercios o testimonios inventados presentados como reales | Pierdes credibilidad | Etiquetar los datos de ejemplo; nada de cifras sin fuente |
| Demo que falla | Golpe directo a C2 | Video de respaldo, datos semilla, modo SIMULACIÓN etiquetado como plan B y dos ensayos completos |
| No usar Codex u OpenAI | En San Francisco era obligatorio usar ChatGPT y Codex [SA50] | Usar ambos y mostrarlo (K08.12) |
| Llaves expuestas | OpenAI desactiva llaves filtradas en repos públicos y la demo se rompe [SA54] | K08.9 |
| Salirse del reto (sin CoDi ni pey) | Baja C1 [SA01] | El cobro con pey va en el flujo principal |
| Pasarse del tiempo | En San Francisco: 2 min de pitch y 2 de preguntas [SA50] | Ensayar con cronómetro |
| Entregar tarde | Cierre: domingo 13:00 [SA01] | Entregar antes de las 12:00 |
| Cobros reales sin consentimiento o datos personales expuestos | Riesgo ético y legal | Confirmación explícita y monto máximo, como pide `AGENTS.md` |

## K08.9 · Llaves y secretos en un repo público

- Desde febrero de 2024, GitHub activa por defecto la protección de push contra secretos en repos públicos; se puede omitir, pero no conviene [SA53].
- GitHub revisa los commits públicos en busca de llaves de OpenAI y se las envía a OpenAI, que las desactiva y avisa al dueño en segundos [SA54].
- En la guía de entornos de Codex en la nube (versión legacy), los secretos solo están disponibles para el script de configuración y se eliminan antes de que trabaje el agente; las variables de entorno sí duran toda la tarea, y el internet del agente viene apagado por defecto [SA52]. ⚪ Revisa la guía vigente (K05).

**Recomendación:**
- `.env` ya está en `.gitignore`; deja `.env.example` solo con nombres de variables.
- Llaves de OpenAI y de pey, y el secreto del webhook, solo como secretos del hosting o de Codespaces; nunca en prompts, capturas, logs ni issues.
- Si una llave se filtra, revócala y crea otra de inmediato, antes de la demo.
- Para la demo pública usa montos mínimos y un monto máximo configurado; la página de pey menciona llaves de prueba [SA11], pero K03 reporta que solo hay producción (⚪): revisa K03 antes de decidir.
- Verifica la firma de cada webhook con el secreto [SA11].

## K08.10 · Qué ha ganado: OpenAI Build Week 2026 (oficial)

- Más de 8,000 proyectos de casi 47,000 builders en 186 países; ocho ganadores se reparten 100 mil dólares, y los primeros lugares reciben además pases a DevDay, tiempo con el equipo de Codex y un año de ChatGPT Pro [SA45].
- Primeros lugares por categoría [SA45]:
  - Second Voice: ayuda a conversar a personas con disartria; sugiere frases y la persona las confirma antes de que se digan.
  - veTriage: triage telefónico para una clínica veterinaria, ya en piloto; no toma decisiones médicas.
  - Echo Canvas: diseño de audio espacial en el navegador; geometría y audio son deterministas y el modelo trabaja con esquemas acotados.
  - Mechanica: museo 3D de máquinas antiguas; el guía con IA cita evidencia o se abstiene.
- Lecciones que destaca OpenAI: separar el código determinista del modelo, acotar al modelo con límites, dejar a la persona en control, cuidar los detalles de UX y partir de experiencia vivida [SA45].
- En Mechanica, Codex ayudó al equipo a construir simulación física, animación y 3D fuera de su especialidad [SA46].

**Recomendación:** aplica el patrón al reto: montos, QR, firmas y estados de pago van en código determinista; el modelo interpreta lenguaje natural, explica y redacta; el comerciante confirma antes de cobrar.

## K08.11 · Otros ganadores y patrones comunes

- JetBrains x Codex (abril de 2026): primer lugar para hyperreasoning, proyecto de una sola persona: un agente que decide qué rutas de razonamiento explorar antes de generar código. El jurado premió visibilidad, límites, corrección y seguridad más que velocidad [SA47].
- OpenAI Codex Hackathon (febrero de 2026): Yolodex, finalista que ganó 10 mil dólares, convierte video en datos de entrenamiento: extrae cuadros, agentes de Codex etiquetan objetos y en minutos sale un dataset para YOLO [SA48].
- Codex Community Hackathon Hanoi (junio de 2026): 150 builders elegidos entre 271 solicitudes; destacaron proyectos educativos, aunque no se publicaron ganadores [SA49].
- Un análisis de ganadores de hackatones de IA encontró rasgos comunes: problema entendible en una frase, demo que muestra comportamiento, IA necesaria, ejecución visible y usuario claro [SA58].
- Un manual de hackatón con Codex lo resume así: "Judges evaluate working demos, not production readiness." [SA51]

Patrón (inferencia): gana quien resuelve un problema concreto con evidencia de que funciona, no quien tiene más funciones. Y una sola persona sí puede ganar (hyperreasoning).

## K08.12 · Cómo demostrar el uso de Codex en el pitch

Evidencia que un juez puede verificar:

1. **AGENTS.md** en la raíz con stack, comandos de prueba, convenciones y una sección de "terminado cuando" [SA51]; Codex lo usa para encontrar los comandos de lint y de pruebas [SA52].
2. **Tareas en paralelo** en Codex web: de 3 a 5 tareas independientes (interfaz, integración con pey, webhook, prompts, pruebas) en carpetas distintas, con captura de la lista de tareas [SA10][SA51].
3. **PRs:** al terminar, Codex muestra su respuesta y el diff, y desde ahí puedes abrir un PR [SA52]; enlaza los PRs en el README con su hora.
4. **Revisión:** pide a Codex revisar los PRs (la revisión de código en PRs fue novedad del DevDay 2026 [SA29]); ⚪ verifica cómo se activa (K05).
5. **Bitácora de tiempos:** tabla hora → tarea → resultado (por ejemplo, 10:20 tarea lanzada, 10:45 PR fusionado).
6. **Una diapositiva** "Cómo lo construí con Codex": tareas, PRs, horas y el prompt clave.
7. **Honestidad:** qué falló con Codex y cómo lo corregiste; los embajadores valoran ese tipo de retroalimentación [SA28].

**Recomendación:** anota en `BITACORA.md` la hora y el objetivo de cada tarea al lanzarla; al final esa bitácora se convierte casi sola en la diapositiva y en la respuesta a "¿qué hizo Codex y qué decidiste tú?".

## K08.13 · Checklist de autoevaluación antes de entregar

- [ ] Demo con URL pública que funciona en celular, probada dos veces de punta a punta.
- [ ] Cobro con pey: crear → QR o solicitud → pago → webhook verificado → acción de la IA.
- [ ] Todo lo simulado dice SIMULACIÓN de forma visible (regla de `AGENTS.md`).
- [ ] Video de 60–90 segundos (y de menos de 3 minutos si piden uno más largo, como en Build Week [SA45]).
- [ ] README: problema, usuario, demo, papel de OpenAI, uso de Codex, cobro CoDi, limitaciones y qué existía antes.
- [ ] Cero llaves y cero datos personales en el repo; historial revisado.
- [ ] AGENTS.md, PRs enlazados y bitácora de tiempos.
- [ ] Pitch de 3 minutos o menos ensayado, con respuestas a K08.7.
- [ ] Rúbrica K08.4–K08.5 con todos los criterios en 4 o más.
- [ ] Entregado en el portal antes del domingo a las 12:00 (cierre a las 13:00) [SA01].
- [ ] Material listo para el voto comunitario (K08.6).

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA01 | DevDay Exchange Community Hackathon: Mexico City (página oficial en Luma) | https://luma.com/f755f0k6 | 2026-11-06 |
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA05 | DevDay Exchange Community: Bangkok | https://luma.com/6m83xldb | 2026-11-06 |
| SA06 | DevDay Exchange Community: Paris | https://luma.com/6nccj7gu | 2026-11-06 |
| SA07 | DevDay Exchange Community Meetup & Hackathon: Bengaluru | https://luma.com/0bdmf0sw | 2026-11-06 |
| SA08 | DevDay Exchange Community Guadalajara (REU) | https://reu.mx/eventos/devday-exchange-community | 2026-11-06 (previo) |
| SA09 | DevDay Exchange Community Hackathon: New Delhi | https://luma.com/6t5uk4lo | 2026-11-06 |
| SA10 | OpenAI Build Week Community Hackathon – London | https://luma.com/codex-hack-ldn | 2026-11-06 |
| SA11 | pey: API CoDi | https://pey.mx/api-codi | 2026-11-06 |
| SA28 | HackerNoon: OpenAI Codex Ambassador Program, what does an ambassador actually do | https://hackernoon.com/openai-codex-ambassador-program-what-does-an-ambassador-actually-do | 2026-11-06 |
| SA29 | InfoQ: OpenAI DevDay 2026 | https://infoq.com/news/2026/10/openai-devday-2026 | 2026-11-06 |
| SA40 | El Imparcial: Negocios pueden evitar pagar hasta 1.91% por cobrar con tarjeta (CoDi) | https://www.elimparcial.com/dinero/2026/04/11/negocios-en-mexico-pueden-evitar-el-pago-de-hasta-191-por-cobrar-con-tarjeta-con-esta-solucion-del-banco-de-mexico-que-elimina-cargos-y-entrega-el-dinero-en-segundos/ | 2026-11-06 |
| SA45 | OpenAI Developers Blog: Build Week winners | https://developers.openai.com/blog/build-week-winners | 2026-11-06 |
| SA46 | remio: OpenAI Build Week winners show what Codex can build beyond demos | https://www.remio.ai/post/openai-build-week-winners-show-what-codex-can-build-beyond-demos | 2026-11-06 |
| SA47 | JetBrains AI Blog: Building the future of IDEs inside the first JetBrains Codex hackathon | https://blog.jetbrains.com/ai/2026/04/building-the-future-of-ides-inside-the-first-jetbrains-codex-hackathon/ | 2026-11-06 |
| SA48 | Createwith: OpenAI hackathon winners create Yolodex | https://www.createwith.com/tool/chatgpt/updates/openai-hackathon-winners-create-yolodex | 2026-11-06 |
| SA49 | MOR Software: Codex Community Hackathon Hanoi 2026 | https://morsoftware.com/news/codex-community-hackathon-hanoi-2026 | 2026-11-06 |
| SA50 | Codex Community Mini-Hackathon, San Francisco #5 | https://luma.com/7025i1j5 | 2026-11-06 |
| SA51 | Daniel Vaughan: The Codex CLI Hackathon Playbook | https://codex.danielvaughan.com/2026/05/15/codex-cli-hackathon-sprint-playbook-rapid-prototyping-time-constrained-development/ | 2026-11-06 |
| SA52 | OpenAI: Codex Cloud environment (guía legacy) | https://learn.chatgpt.com/docs/environments/cloud-environment | 2026-11-06 |
| SA53 | GitHub Blog: Keeping secrets out of public repositories (29 feb 2024) | https://github.blog/2024-02-29-keeping-secrets-out-of-public-repositories | 2026-11-06 |
| SA54 | GitHub Changelog: RubyGems, Adobe and OpenAI are now secret scanning integrators (8 jun 2021) | https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators | 2026-11-06 |
| SA58 | DEV Community: What AI hackathon winners actually have in common | https://dev.to/jsb-securedme/what-ai-hackathon-winners-actually-have-in-common-1kla | 2026-11-06 |

(previo) = dato verificado por el equipo antes de esta sesión y no reconsultado aquí.

<!-- ===== FIN: conocimiento/08-criterios-y-jueces.md ===== -->

<!-- ===== INICIO: conocimiento/09-pitch-y-preguntas.md ===== -->

---
id: K09
titulo: "Pitch, demo y preguntas difíciles"
resumen: "Guion de 3 minutos, demo de 3 pasos, plan B y banco de 20 preguntas con respuesta modelo."
responde:
  - "¿Qué digo en el pitch y en qué orden?"
  - "¿Cómo respondo las preguntas difíciles de los jueces?"
actualizado: 2026-11-06
confianza: media
fuentes: []
---
# K09 · Pitch, demo y preguntas difíciles

## TL;DR
- **Orden del pitch (3 min):** persona y dato con fuente → frase de valor → demo de 3 pasos en producción con un **pago CoDi real de $1** → decisiones de construcción → bien público, siguiente paso y URL (K09.1).
- **Doble salida:** el jurado decide el lunes con lo entregado y no se sabe si habrá pitch en vivo el sábado (K01.11). Prepara el pitch en vivo **y** el video; el video corto sirve también para el voto comunitario (K09.9).
- **Demo a prueba de fallas:** dominio de producción, frase de demo preparada en un botón, monto de $1, video cargado en el minuto del pago y frases de rescate ya ensayadas (K09.3, K09.7).
- **Codex y OpenAI con evidencia, no con adjetivos:** PRs con hora, tareas en paralelo, `AGENTS.md` y el esquema de `crear_cobro` (el modelo propone; la persona confirma; el servidor valida) (K09.4).
- **De memoria:** "¿Qué hizo la IA y qué hiciste tú?", "¿Cómo protegen los datos?" y "¿Qué sigue?" (K09.6, preguntas 1–3).
- **Nada inventado:** las personas son arquetipos y se dicen como ejemplo (K06.9); cada dato lleva su fuente (K06.10); el modo prueba o la SIMULACIÓN se dicen en voz alta.

## K09.1 · Guion de 3 minutos (con marcadores)

Ritmo: unas 2.3 palabras por segundo; menos de 400 palabras en total, porque en la demo se habla poco. Llena los `[MARCADORES]` con `docs/PRD.md` y la bitácora, o con el prompt 6 de ChatGPT (`dia-del-evento/PROMPTS-CHATGPT.md`).

| Tiempo | Segmento | Diapositiva ([DECK](../plantillas/DECK.md)) | Criterio que ataca (K08.3) |
|---|---|---|---|
| 0:00–0:20 | Gancho: persona real + un dato | 1 → 2 | C1 impacto |
| 0:20–0:40 | Solución: frase de valor y ejemplo oficial del reto | 3 | C1, C4 |
| 0:40–2:00 | Demo de 3 pasos, en vivo (K09.3) | 4 (la app) | C2 ejecución, C3 OpenAI |
| 2:00–2:30 | Cómo lo construí: decisiones y evidencia | 5 | C3 Codex, C5 |
| 2:30–3:00 | Bien público, siguiente paso y cierre con URL/QR | 6 → 7 | C1, C5 |

**0:00–0:20 · Gancho** (unas 45 palabras)
> "Pensemos en [ARQUETIPO, dicho como ejemplo; p. ej. 'un puesto de fruta en un tianguis' de K06.9]. Cobra montos chicos y casi todo en efectivo: [DATO 1 CON FUENTE; p. ej. 'el 85 % de los adultos paga en efectivo sus compras de hasta 500 pesos, según la ENIF 2024' (K06.10, dato 1)]. Y si acepta tarjeta, [DATO 2; p. ej. 'paga hasta 3.95 % por cobro con débito, según Banxico' (K06.10, dato 5)]."

**0:20–0:40 · Solución** (unas 45 palabras)
> "[NOMBRE] es [FRASE DE VALOR]. Responde al reto de hoy, herramientas de bien público con OpenAI y CoDi, en su ejemplo de [EJEMPLO OFICIAL; p. ej. 'cobro para comercios de barrio' (K01.4)]: el comercio dice lo que vendió, la IA arma el cobro, aparece un QR de CoDi sin comisión y el pago se confirma solo."

**0:40–2:00 · Demo** (unas 60 palabras; el detalle está en K09.3)
> Paso 1: "Él no llena formularios: dice '[FRASE DE DEMO]'." · Paso 2: "La IA no cobra: propone. Yo confirmo y pey genera el QR CoDi." · Paso 3: "Pago un peso real desde la app de mi banco… y listo: confirmado por pey, no por una captura."

**2:00–2:30 · Cómo lo construí** (unas 60 palabras)
> "Lo construí hoy, solo, con Codex: [N] tareas, [M] en paralelo, cada una con criterios de aceptación y su preview desplegado; [P] PRs fusionados. Tomé tres decisiones: la IA solo propone, con una función acotada, `crear_cobro`, y la persona confirma; el pago lo confirma pey con un webhook firmado, no una captura; y todo estuvo en producción desde la primera hora."

**2:30–3:00 · Impacto y cierre** (unas 60 palabras)
> "Es bien público porque cobrar cuesta cero y, con la cuenta del comercio, el dinero le llega directo. Y es el momento: [POR QUÉ AHORA; p. ej. 'el 14 de diciembre todas las apps bancarias deben procesar cobros CoDi con el mismo estándar' (K06.10, dato 10)]. Siguiente paso: un piloto con [N] comercios de barrio y llevarlo al Hackatón México. Está en vivo: escaneen el QR. Gracias."

**Tarjeta de memoria** (5 palabras por segmento, en el celular): `Persona · efectivo · comisión` → `Dice · propone · QR · confirma` → `Frase · confirmo · pago · PAGADO` → `Codex · paralelo · PRs · decisiones` → `Cero comisión · 14 dic · piloto · QR`.

## K09.2 · Reglas del pitch

1. **Persona antes que tecnología.** En los primeros 40 segundos no hay jerga: ni "API", ni "LLM", ni "webhook".
2. **Un número a la vez y con su fuente dicha en voz alta** ("según Banxico…"). Si es estimación, di "estimo" y el supuesto.
3. **Di qué ejemplo oficial del reto resuelves** y por qué es bien público (K01.4). Es lo primero que el jurado va a cotejar.
4. **Demo en el dominio de producción**, nunca en local ni en un preview (los previews piden sesión de Vercel).
5. **Un pago real de $1 vale más que diez pantallas.** Si estás en modo prueba o en SIMULACIÓN, dilo antes de que pregunten.
6. **Decisiones, no herramientas.** En "Cómo lo construí" cuenta 2 o 3 decisiones y la evidencia; no enumeres productos.
7. **No leas.** Usa la tarjeta de memoria; mira al jurado al decir la frase de valor.
8. **Cronómetro visible.** Si a los 2:00 no terminó la demo, salta al cierre: el cierre con la URL no se sacrifica.
9. **Cierra con una petición concreta** (piloto, mentoría, acceso) y con la URL/QR en pantalla.
10. **Respuestas de 20 a 30 segundos:** respuesta directa → evidencia → silencio. Si no sabes: "No lo sé todavía; lo verificaría así: …".
11. **Nada de hablar mal** de otras herramientas, organizadores o bancos, ni presumir alianzas que no existen (K02.13).
12. **El formato del organizador manda:** si dan 2 minutos o una diapositiva (como en San Francisco, K08.2), usa la versión corta (K09.8).
13. **Ensaya dos veces con cronómetro** y graba una de las dos en el celular para escucharte.

## K09.3 · Demo de 3 pasos y cómo hacerla a prueba de fallas

**Los 3 pasos** (≤ 80 segundos; cambia los marcadores con los del PRD):

| Paso | Lo que haces | Lo que dices | Lo que ve el jurado | Si falla (K09.7) |
|---|---|---|---|---|
| 1 · Pide el cobro con sus palabras (0:40–1:05) | Tocas el botón de ejemplo "[FRASE DE DEMO]" (o la dices o escribes) | "No llena formularios: dice lo que vendió." | La propuesta de la IA: concepto, detalle y total; botón Confirmar | IA lenta → "Capturar a mano" |
| 2 · Confirma y aparece el QR (1:05–1:30) | Tocas "Confirmar y generar QR" | "La IA no cobra: propone. Yo confirmo, y pey genera el QR CoDi, sin comisión." | QR grande, monto y, si aplica, el banner MODO PRUEBA | Error de pey → video |
| 3 · El cliente paga y se confirma solo (1:30–2:00) | Escaneas con la app de tu banco y autorizas $1 | "Pago real de un peso desde mi banco… confirmado por pey, no por una captura." | La pantalla cambia a PAGADO con palomita y hora | > 20 s sin confirmar → video |

**El monto de la demo.** Pey no tiene sandbox; mañana la llave está ligada a la cuenta de prueba de pey y lo que se paga no se devuelve (K03.3, K03.6). Usa una frase de demo cuyo total sea **$1 o menos** (p. ej. "[un dulce de un peso]") y `MAX_MONTO_MXN=20`. Si quieres una orden más realista, súbele el monto sabiendo que ese dinero no regresa.

**Diseño a prueba de fallas (ya está en los prompts de Codex):**
- Un solo camino feliz, con botón de ejemplo para no teclear en vivo y `?presentar=1` para el proyector.
- La confirmación no depende del webhook: la pantalla pregunta a pey cada 2 segundos (K03.6, plan B1).
- "Capturar a mano" siempre disponible: si la IA falla, el cobro sigue.
- La pantalla nunca miente: PAGADO solo si pey lo confirma; banner de MODO PRUEBA o SIMULACIÓN cuando aplica.
- "Reiniciar demo" para volver al paso 1 en un toque, y `/api/salud` para revisar el modo antes de subir.

**10 minutos antes:** la lista "Pitch" de `dia-del-evento/CHECKLIST.md`. Lo crítico: app del banco abierta y con sesión, un cobro de prueba en los últimos 15 minutos, `/api/salud` con el modo correcto, el video local pausado justo en el momento del pago, No molestar en laptop y celular.

## K09.4 · Cómo contar el uso de Codex y de la API de OpenAI (con evidencia)

**Codex: muestra, no adjetives** (K08.12):
- `AGENTS.md` en la raíz: las reglas que Codex siguió (stack, pruebas, seguridad, definición de terminado).
- Captura de la lista de tareas corriendo **en paralelo** (se toma al lanzar la oleada 1; RUNBOOK, 11:10).
- Lista de PRs fusionados, con título y hora; cada uno con su preview de Vercel.
- `BITACORA.md`: hora → tarea → resultado. Es la fuente de los números del pitch: **nunca los redondees hacia arriba**.
- Honestidad: una cosa que falló con Codex y cómo la corregiste (por ejemplo, una tarea que se atoró y dividiste). Los embajadores valoran esa retroalimentación (K08.12).

**La API de OpenAI dentro del producto:**
- Responses API con function calling: el modelo traduce lenguaje natural a una llamada estructurada a `crear_cobro` (esquema de K03.9 y K04.15).
- La IA está acotada: el modelo solo **propone**; el servidor valida (monto > 0, tope `MAX_MONTO_MXN`, que el detalle sume) y el QR se crea en pey solo cuando la persona confirma. Es el patrón de los ganadores de Build Week: código determinista para el dinero, modelo para el lenguaje y la persona en control (K08.10).
- Las llaves solo viven en el servidor; al modelo solo le llega el texto del pedido (`store: false` si K04 lo confirma ⚪).
- Si probaste alguna novedad del DevDay 2026, menciónala solo si funciona en la demo (K02.4, K08.5).

**Frase para la diapositiva 5:** "Codex escribió el código en [P] PRs y [M] tareas en paralelo; yo escribí los contratos, revisé cada preview y decidí: la IA propone, la persona confirma y pey confirma el pago."

## K09.5 · Cierre: siguiente paso hacia el Hackatón México (el nacional)

- **Frase de cierre:** "Siguiente paso: un piloto con [N] comercios de barrio [zona ⚪] en las próximas dos semanas y llevar este mismo proyecto al Hackatón México, del 14 de noviembre al 12 de diciembre. Está en vivo: escaneen el QR."
- **Plan de 30 días** (para preguntas y para la diapositiva 6; son metas, no resultados):
  1. Semana 1: piloto con [N] comercios reales (con su consentimiento) y la cuenta del comercio activa en pey (la CLABE tarda 5 días hábiles, K03.3).
  2. Semana 2: medir tiempo por cobro, pagos confirmados y cobros capturados a mano contra por voz o texto.
  3. Semanas 3 y 4: la función que más pidan (p. ej. corte del día) y la entrega en el Hackatón México, el hackatón nacional de hackatonmexico.com (más de 1 millón de pesos en premios, créditos y recursos; CoDi y API de Pey; K01.10). ⚪ Confirma que allá se puede continuar un proyecto iniciado el 7 de noviembre.
- **Por qué ahora:** a más tardar el 14 de diciembre de 2026 todas las apps bancarias deben homologar sus transferencias y procesar los cobros CoDi con el mismo estándar (K06.5).
- **Petición concreta** (elige una): a pey, acceso temprano para el piloto con cuentas de comercio; a AI Builders, mentoría para el Hackatón México; a los anfitriones, contactos con locatarios o mercados.
- Si ganas boletos: el DevDay Exchange es el martes 10 a las 14:00 (K01.3); lleva la demo lista.

## K09.6 · Banco de 20 preguntas difíciles con respuesta modelo

Respuestas de 20 a 30 segundos. Cambia los `[MARCADORES]` por datos reales de la bitácora. Las tres primeras van de memoria.

**1. ¿Qué hizo la IA y qué hiciste tú?**
"Codex escribió casi todo el código en [P] PRs chicos, varios en paralelo; ChatGPT me ayudó con el PRD y los textos. Yo elegí el problema, escribí el contrato y los criterios de aceptación de cada tarea, probé cada PR en su preview y tomé las decisiones: la IA propone y la persona confirma; el pago lo confirma pey, no una captura; y todo desplegado desde la primera hora."
*Evidencia:* PRs con hora, `BITACORA.md`, `AGENTS.md`, captura de tareas en paralelo. *No digas:* "la IA lo hizo todo" ni "yo programé todo".

**2. ¿Cómo protegen los datos? ¿Dónde viven las llaves?**
"Las llaves de OpenAI y de pey viven solo en el servidor, como variables de entorno; el navegador nunca las ve y el repo público no tiene ninguna. No guardamos datos del cliente. Al modelo solo le llega el texto del pedido. Cada webhook de pey se verifica con su firma, su hora y su id, y los montos tienen un tope que impone el servidor."
*Evidencia:* `.env.example` (solo nombres), la prueba de que ninguna respuesta filtra llaves, el verificador sin "posible secreto". *No digas:* "es 100 % seguro".

**3. ¿Qué sigue?**
"Un piloto con [N] comercios de barrio en dos semanas para medir tiempo de cobro y pagos confirmados; [la función que más pidan]; y llevarlo al Hackatón México, del 14 de noviembre al 12 de diciembre. Además, el 14 de diciembre todas las apps bancarias deben procesar cobros CoDi con el mismo estándar: es el momento."
*Evidencia:* sección "Qué sigue" del README; K06.10, dato 10. *No digas:* alianzas que no existen.

**4. ¿Por qué esto es bien público?**
"Porque baja a cero el costo de cobrar para quien tiene menos margen: CoDi no cobra comisión ni a quien paga ni a quien cobra. La IA quita la barrera de aprender una app: el comercio dice lo que vendió. Y el código es abierto, para que un mercado o una cooperativa lo reutilice."
*Evidencia:* K03.1 (sin comisión), K06.10 (dato 5), licencia del repo ⚪ (elígela antes de entregar). *No digas:* "acaba con la informalidad".

**5. ¿Qué construiste hoy y qué existía antes?**
"Antes del evento solo preparé investigación en Markdown: la base de conocimiento, plantillas y las reglas para Codex. Todo el código del producto, en `app/`, se escribió hoy: lo ven en el historial de git y en los PRs con su hora."
*Evidencia:* historial de `app/`, sección "Qué existía antes" del README. *No digas:* nada que el historial contradiga. ⚪ Ajusta la respuesta a la regla que den los organizadores (K01.11).

**6. ¿Quién es el usuario exacto y cómo sabes que tiene este problema?**
"[PERSONA], por ejemplo un puesto que cobra montos de 20 a 150 pesos (caso ilustrativo, K06.9). Lo sustento con datos, no con entrevistas: [DATO K06.10]. Todavía no lo pruebo con comerciantes reales; es lo primero del piloto."
*Evidencia:* K06.9, K06.10. *No digas:* testimonios inventados ("doña X me dijo…").

**7. ¿El cobro es real o simulado?**
"Real: fue un pago CoDi de un peso, confirmado por pey. Hoy cae en la cuenta de prueba que publica pey, porque registrar mi CLABE ante Banxico tarda 5 días hábiles; con la cuenta del comercio funciona igual. Cuando algo es simulación, la pantalla dice SIMULACIÓN."
*Evidencia:* banner de la app, "Webhook Logs" del portal de pey, video. *No digas:* "es real" si estabas en SIMULACIÓN.

**8. ¿Por qué CoDi y no tarjeta o transferencia?**
"Con tarjeta, una miscelánea paga hasta 3.95 % por cobro con débito, según Banxico. CoDi no cobra comisión y el dinero llega en segundos. Frente a una transferencia, el cliente no teclea CLABE ni monto: escanea y autoriza, y el comercio recibe la confirmación automática."
*Evidencia:* K06.10 (dato 5), K03.1. *No digas:* que CoDi ya es masivo (no lo es; K06.10, dato 6).

**9. ¿Qué hace la IA que un formulario no podría?**
"Entiende cómo habla el comercio: '[FRASE DE DEMO]' se vuelve un cobro con concepto, detalle y monto, sin menús. Pero está acotada: solo propone con una función estructurada, el servidor valida y la persona confirma. Si la IA falla, el formulario manual sigue ahí: la IA acelera, no es requisito para cobrar."
*Evidencia:* esquema de `crear_cobro`, botón "Capturar a mano". *No digas:* "la IA decide".

**10. ¿Cómo evitas que el modelo invente montos?**
"Con tres candados: el modelo devuelve una propuesta estructurada, no texto libre; el servidor valida que el monto sea positivo, que no pase del tope y que el detalle sume; y la persona ve el total y confirma antes de que exista el QR. Además, las instrucciones le prohíben inventar precios: si falta uno, pregunta."
*Evidencia:* pruebas de `agente.test.js` (suma inválida, tope). *No digas:* "el modelo no se equivoca".

**11. ¿Cómo sabes que el pago es real y no una captura de pantalla?**
"La pantalla solo cambia a PAGADO cuando pey lo confirma: la app consulta el estado del QR y además recibe un webhook firmado con el estándar Standard Webhooks; verificamos la firma, la hora y que no venga repetido. El comercio ya no revisa capturas."
*Evidencia:* `webhook-pey.js` y sus pruebas; "Webhook Logs". *No digas:* que nunca puede fallar.

**12. ¿Qué pasa si falla el webhook o el internet?**
"El webhook no es indispensable: mientras el QR está vigente, la app pregunta a pey cada 2 segundos. Si se cae la red, muestra 'Reconectando…' y nunca marca pagado sin confirmación. CoDi sí necesita internet; sin red, el comercio cobra como siempre."
*Evidencia:* `estado-pago.js` y su prueba de 3 errores seguidos. *No digas:* "funciona sin internet".

**13. ¿Cuánto cuesta operarlo por comercio al mes?**
"Pey es gratis por ahora y CoDi no cobra comisión. El costo variable es la IA: una llamada corta por cobro. Hoy hice [N] llamadas y costaron [X] según el panel de uso de OpenAI; con [C] cobros al día serían unos [Y] al mes. Es una estimación con esos supuestos. Un cobro capturado a mano no cuesta IA."
*Evidencia:* panel de uso de OpenAI; precios en K04.2. *No digas:* cifras que no calculaste.

**14. ¿Cómo se sostiene si no cobra comisión?**
"Hoy el objetivo es bien público y adopción. Hay dos hipótesis para validar en el piloto: que el comercio pague por funciones extra, como el corte del día, o que una organización (un mercado, una cooperativa o una alcaldía) lo ofrezca como servicio. No lo afirmo: es lo que voy a probar."
*Evidencia:* "Qué sigue" del README. *No digas:* un modelo de negocio con números inventados.

**15. ¿Por qué lo usaría un comercio que hoy cobra en efectivo?**
"Porque el efectivo domina, pero no todos los clientes lo traen, y las terminales cobran comisión. Aquí no compra equipo, no paga comisión y cobra hablando. La barrera es la confianza; por eso el pago se confirma solo y hay comprobante."
*Evidencia:* K06.10 (datos 1 y 5), K06.6 (fraude y desconfianza). *No digas:* que la adopción está garantizada.

**16. ¿Qué pasa si el cliente no tiene CoDi activado o su banco no lo soporta?**
"Es la debilidad real de CoDi: 21.8 millones de cuentas validadas, pero solo 2.5 millones han pagado alguna vez, según Banxico. Por eso importa el 14 de diciembre, cuando todas las apps deberán procesar cobros CoDi con el mismo estándar. Mientras, el comercio sigue aceptando efectivo: sumamos, no reemplazamos."
*Evidencia:* K06.10 (datos 6 y 10). *No digas:* que todos los bancos ya lo soportan bien.

**17. ¿Escala? ¿Qué se rompe con 10,000 comercios?**
"El servidor no guarda estado y la verdad del pago vive en pey, así que crece horizontalmente. Lo primero que habría que construir: una cuenta y una llave de pey por comercio, límites de uso de IA por comercio y una base de datos para historial y conciliación. Hoy es un prototipo para un comercio."
*Evidencia:* arquitectura del README. *No digas:* "escala infinito".

**18. ¿Qué pasa si se cae OpenAI o pey?**
"Si cae OpenAI, el comercio captura monto y concepto a mano y el cobro sigue igual. Si cae pey, no hay cobro CoDi: la app lo dice claro y el comercio cobra en efectivo. Nunca presentamos una simulación como pago real."
*Evidencia:* mensajes de error de la app (IA no disponible, pey no disponible). *No digas:* que no puede fallar.

**19. ¿Y la regulación: Banxico, datos personales, lavado de dinero?**
"No custodiamos dinero: el pago va de banco a banco por CoDi y la integración la opera pey [lo que diga K02.7 ⚪]. No guardamos datos personales del cliente. Para un piloto con comercios reales falta un aviso de privacidad y revisar con pey las obligaciones de cada parte. No presumo certificaciones que no tengo."
*Evidencia:* sección de seguridad y privacidad del README; K02.7. *No digas:* "cumplimos con todo".

**20. ¿Qué fue lo más difícil? ¿Qué falló con Codex?**
"[LO MÁS DIFÍCIL REAL, de la bitácora; p. ej. 'confirmar el pago en tiempo real sin websockets' o 'una tarea de Codex que se atoró'.] Lo resolví [CÓMO]. Aprendí a darle a Codex tareas chicas, con archivos propios y criterios verificables."
*Evidencia:* el PR del arreglo y su línea en la bitácora. *No digas:* "nada falló".

## K09.7 · Plan B de la demo

| Falla | Señal | Qué dices (literal) | Qué haces | Tiempo máximo |
|---|---|---|---|---|
| Internet de la sala | La página no carga en 5 s | "Me cambio al hotspot; mientras, les cuento el problema." | Hotspot del celular y recargas | 30 s; si no carga, el video |
| La IA tarda o falla | "Pensando…" por más de 8 s, o el mensaje de IA no disponible | "La IA está tardando; el comercio también puede capturar a mano, y el cobro sigue igual." | "Capturar a mano": monto y concepto | 10 s |
| El pago no se confirma | Más de 20 s en "Esperando pago" | "Mientras CoDi confirma, les muestro la misma operación grabada hace una hora en producción." | Video local en el minuto del pago; si se confirma después, regresas y lo muestras | 20 s |
| pey no responde | Error de pey al generar el QR | "pey no responde en este momento; por eso grabé el flujo completo en producción." | Video | Inmediato |
| Falla el proyector | No hay imagen | "Se los muestro aquí." | Pantalla de la laptop o el celular hacia el jurado, o el video en el celular | 30 s |
| Se apaga la laptop | — | "La app es móvil primero." | Abres la URL en el celular; video y deck en PDF también están ahí | 30 s |
| Te quedas en blanco | — | La frase de valor | Tarjeta de memoria (K09.1) | — |
| Te recortan el tiempo | Aviso del moderador | — | Versión de 1 minuto (K09.8) | — |

**Regla de oro:** si cambias a video o a SIMULACIÓN, lo dices. Un respaldo honesto suma puntos; un pago simulado presentado como real te quita la credibilidad (K02.13).

## K09.8 · Versión de 1 minuto

Unas 140 palabras. Sirve para un pitch recortado, para la conversación de pasillo con un juez y como narración del video corto.

> **[0:00–0:10]** "Pensemos en [ARQUETIPO]: cobra casi todo en efectivo y, si acepta tarjeta, paga hasta 3.95 % de comisión (Banxico)."
> **[0:10–0:20]** "[NOMBRE] es [FRASE DE VALOR], con CoDi, sin comisión."
> **[0:20–0:45]** "Miren: digo '[FRASE DE DEMO]', la IA propone el cobro, confirmo, pey genera el QR CoDi… pago un peso desde mi banco… y se confirma solo."
> **[0:45–1:00]** "Lo construí hoy con Codex, en tareas paralelas, y con la API de OpenAI acotada: la IA propone y la persona decide. Siguiente paso: piloto con comercios de barrio y el Hackatón México. Está en vivo: [URL]."

**Versión de 30 segundos** (unas 70 palabras): problema en una frase con un dato → frase de valor → "la IA propone, tú confirmas, pey confirma el pago" → URL.

## K09.9 · Versión en video y material para la votación

El jurado anuncia ganadores el lunes 9 en la mañana y después hay un voto comunitario (K01.6). El video puede ser tu pitch si no hay presentación en vivo, y es lo que se comparte para el voto.

**Video de entrega** (≤ 3 min o lo que pida el portal ⚪; Build Week pedía menos de 3 minutos, K08.2):
- Mismo guion de K09.1, sin tiempos muertos: corta las esperas y deja la URL visible todo el video.
- Primeros 3 segundos: nombre, frase de valor y "pago CoDi real en el minuto [X]".
- El pago real en primer plano: graba la pantalla de la laptop con tu voz y, si puedes, la pantalla del celular al autorizar el pago. Si no da tiempo, narra el pago y deja que se vea PAGADO.
- Texto en pantalla en cada paso (muchos lo verán sin audio).
- Di el modo: "pago real de un peso a la cuenta de prueba de pey".
- Una toma buena basta. El domingo en la mañana puedes regrabar en silencio (RUNBOOK).

**Video corto** (60–90 s, para compartir; K08.6): gancho en 3 segundos; QR → pago → PAGADO; termina con la URL y un QR. Que se entienda sin audio. Subtítulos con el prompt 12 de ChatGPT.

**Respaldos:** el video del pago de $0.01 de la noche anterior (CHECKLIST) y el del sábado. Guarda copias locales en la laptop y en el celular.

**Publicación:** enlace no listado o "cualquiera con el enlace" ⚪; ábrelo en una ventana de incógnito antes de ponerlo en el README y en el portal.

**Material para el voto comunitario** (prompt 12 de ChatGPT):
- URL de la demo (estable, sin registro y funcionando en celular), QR a la demo y una imagen de portada (captura de la app con la frase de valor).
- Un texto para WhatsApp y otro para LinkedIn o X.
- Respuestas cortas a "¿Esto ya existe?", "¿Es seguro?" y "¿Cuánto cuesta?".
- Comparte sin spam y sin ofrecer nada a cambio de votos (K08.6). El jurado sigue siendo lo principal.
- Mientras dure el voto: no fusiones cambios, revisa el saldo de OpenAI y deja `MAX_MONTO_MXN` bajo.

<!-- ===== FIN: conocimiento/09-pitch-y-preguntas.md ===== -->

<!-- ===== INICIO: conocimiento/10-perfil-y-mitigaciones.md ===== -->

---
id: K10
titulo: "Perfil de José: fortalezas, riesgos y cómo cubrirlos"
resumen: "Cómo aprovechar la experiencia de José y cubrir los riesgos de ir solo, 100% en la nube y en un evento de Codex."
responde:
  - "¿En qué es fuerte José y cómo se aprovecha en el producto y el pitch?"
  - "¿Qué riesgos tiene y cómo se cubren?"
  - "¿Qué debe poder explicar José sin ayuda frente a los jueces?"
  - "¿Cómo deben trabajar Codex y ChatGPT con José?"
actualizado: 2026-11-06
confianza: media
fuentes: [SM01, SM02]
---
# K10 · Perfil de José: fortalezas, riesgos y cómo cubrirlos

## TL;DR
- Fortalezas: ritmo de hackatón reciente, conocimiento de pagos y fintech, velocidad con agentes de IA, método propio con verificación y evidencia. Él presenta el pitch.
- Riesgos: va solo; su flujo habitual es con Claude y este evento es de Codex; la API de Pey es nueva para él; todo depende del internet; "la IA hizo todo" exige que domine las decisiones.
- Regla del día: **Codex construye, ChatGPT redacta, José decide y presenta.** Todo con evidencia.

## K10.1 · Fortalezas y cómo usarlas
| Fortaleza | Evidencia | Cómo se aprovecha |
|---|---|---|
| Experiencia reciente en hackatones | Quedó entre los ganadores de GOYA HACK (CriptoUNAM, oct 2026); se inscribió al Chilangatón (25 oct) en esta misma Utopía; proyectos de InnovaFest [SM01] [SM02] | Conoce la sede y el formato: seguir el runbook sin improvisar |
| Pagos y fintech | Aprobó Foundations del Solana Engineering Track (nov 2026); GOYA HACK fue de CriptoUNAM [SM02] | Hablar con autoridad de CoDi, SPEI, comisiones y confianza |
| Velocidad con agentes de IA | 15 repos con actividad desde el 1 de octubre de 2026: webs, agentes, fine-tuning [SM01] | Repartir tareas en paralelo a Codex sin miedo |
| Método propio | Repo `claude-tec-playbook`: contratos, bitácora, verificación, anti-alucinación [SM01] | El mismo rigor con Codex: criterios de aceptación y evidencia en cada PR |
| Pitch | José presenta | Proteger en el runbook el tiempo de ensayo |

## K10.2 · Riesgos y cómo se cubren
| Riesgo | Mitigación concreta | Dónde |
|---|---|---|
| Va solo: nadie prueba ni revisa | Tareas de Codex en paralelo en carpetas separadas; pruebas automáticas; ChatGPT como juez simulado | `dia-del-evento/RUNBOOK.md`, `dia-del-evento/PROMPTS-CODEX.md` |
| Su flujo habitual es con Claude; el evento es de Codex | `AGENTS.md` listo; Codex web como constructor; Claude solo como revisor opcional | `AGENTS.md`, K05 |
| La API de Pey es nueva | Llave de desarrollo antes del evento; K03 con endpoints y ejemplos; modo **SIMULACIÓN** etiquetado como plan B | K03, `dia-del-evento/CHECKLIST.md` |
| La API de OpenAI se paga aparte de ChatGPT Plus | Crear la API key y cargar saldo antes del evento | K04, `dia-del-evento/CHECKLIST.md` |
| Todo en la nube depende del internet | Hotspot del celular; video de respaldo de la demo | `dia-del-evento/RUNBOOK.md` |
| "La IA hizo todo": preguntas de los jueces | Decisiones escritas en cada PR; José domina las 5 decisiones de K10.3 y un diagrama de arquitectura | K09 |
| Cansancio por preparar la víspera | Dormir; checklist corta en la mañana | `dia-del-evento/CHECKLIST.md` |

## K10.3 · Lo que José debe poder explicar sin ayuda
1. **Por qué CoDi con Pey:** cobro sin comisión y el dinero llega directo a la cuenta del comercio (K03).
2. **Dónde viven las llaves y cómo se confirma un pago:** en el servidor; el pago se confirma con el estado de Pey o su webhook, nunca con una captura de pantalla (K03).
3. **Qué hace el modelo de OpenAI y qué no:** entiende, propone y redacta; no cobra por su cuenta, siempre pide confirmación (K04).
4. **Cómo lo construyó:** Codex con tareas en paralelo, PRs con criterios de aceptación y previews en Vercel (K05).
5. **Qué sigue:** continuar en el Hackatón Nacional (14 nov–12 dic) y un piloto con comercios reales (K01, K02).

## K10.4 · Cómo deben trabajar Codex y ChatGPT con José
- Respuestas cortas, en español, con el "por qué" en una línea.
- Opciones numeradas con una recomendación clara.
- No pedirle a José lo que un agente puede hacer. Sí pedirle, y marcarlo como 🧑, solo lo que únicamente él puede hacer: cuentas, llaves, pagos reales, aprobar el merge a `main` y el pitch.
- Después de cada entrega, decirle en 3 líneas qué cambió y cómo probarlo desde el celular.

## Fuentes
| ID | Título | URL | Consultado |
|---|---|---|---|
| SM01 | Perfil público de GitHub de José (lista de repositorios) | https://github.com/jose2501106-IA | 2026-11-05 |
| SM02 | Correos personales de José (confirmaciones de eventos y resultados) | no público | 2026-11-05 |

<!-- ===== FIN: conocimiento/10-perfil-y-mitigaciones.md ===== -->

<!-- ===== INICIO: AGENTS.md ===== -->

# AGENTS.md

Instrucciones para Codex (web y CLI) y para cualquier agente que trabaje en este repo. Léelas completas antes de actuar.

## 1. Misión
Construir en unas 4.5 horas, dentro de `app/`, un prototipo **funcional y desplegado** para el *DevDay Exchange Community Hackathon: Mexico City* (sábado 7 de noviembre de 2026): una herramienta que use la **API de OpenAI** para acercar los **cobros CoDi sin comisión** (con la **API de Pey**) a comercios y personas. Tiene que verse y funcionar perfecto en una demo en vivo de 3 pasos.

José participa solo: él decide, aprueba y presenta. Tú construyes.

## 2. Cómo usar la base de conocimiento
1. Abre primero `conocimiento/INDICE.md`. Ahí está cada archivo y cada sección con su ID (por ejemplo `K03.4`).
2. Lee solo lo que tu tarea necesita:

| Si tu tarea toca… | Lee |
|---|---|
| Cobros CoDi, QR, webhooks de Pey | K03 |
| API de OpenAI (Responses, Realtime, Agents SDK, Apps SDK) | K04 |
| Codex web, Codespaces, Vercel, despliegue | K05 |
| Usuarios, datos y textos con contexto | K06 |
| La idea elegida, el PRD y el plan de tareas | `docs/PRD.md` (se crea el sábado) y K07 |
| Lo que califican los jueces | K08 |

3. En la descripción del PR, cita los IDs que usaste ("según K03.4…").
4. Lo marcado ⚪ no está verificado. Si necesitas un dato que no está (endpoint, campo, nombre de modelo, precio), **no lo inventes**: consulta la documentación oficial si tienes internet; si no, deja `TODO(⚪): …` visible en el código y dilo en el PR.

## 3. Reglas de producto
- Todo texto visible en **español de México**. Diseño **mobile-first**: 360 px sin desplazamiento horizontal, botones de al menos 44 px.
- **La demo manda**: primero el flujo de 3 pasos de `docs/PRD.md`, de punta a punta y desplegado; después todo lo demás.
- **Nada inventado**: sin testimonios ni cifras sin fuente. Si existe un modo de simulación de pago, la interfaz dice **"SIMULACIÓN"** de forma visible.
- **Dinero real con cuidado**: ningún cobro sin confirmación explícita de la persona; monto máximo configurable (`MAX_MONTO_MXN`). Pey solo tiene entorno de producción: en pruebas y demo se cobran montos de $0.01 a $1 (K03.3).
- Accesible: contraste AA, etiquetas en formularios, foco visible, todo usable con teclado.

## 4. Reglas de seguridad
- Las llaves viven solo en el servidor como variables de entorno (`.env.example` tiene los nombres). **Nunca** en el navegador, en el repo ni en los logs.
- Las llamadas a OpenAI y a Pey viven en funciones de servidor (`app/api/`). El navegador solo habla con `app/api/`.
- Verifica la firma de los webhooks (K03). Valida entradas: montos mayores que 0, con máximo, tipos correctos.

## 5. Stack por defecto (si `docs/PRD.md` no dice otra cosa)
- `app/` es la raíz del proyecto en Vercel.
- Frontend: HTML + CSS + JavaScript sin framework y sin paso de build (`app/index.html`, `app/css/`, `app/js/`).
- Backend: Vercel Functions en Node.js 20 o superior (ESM) en `app/api/*.js`, con `fetch` nativo; el SDK oficial `openai` solo si simplifica.
- Pruebas: archivos `*.test.js` en `app/tests/`, con `fetch` simulado (las pruebas no llaman servicios reales). Se corren con `npm test --prefix app` (`app/package.json` con `"test": "node --test"`) o con `cd app && node --test`. Ojo: en Node 22, `node --test app/tests/` falla.
- Datos persistentes solo si el PRD los necesita; antes de montar una base, intenta consultar el estado directo en Pey.

## 6. Forma de trabajar
- Tareas pequeñas y verificables: un PR por tarea, con título en español.
- No toques archivos fuera de tu tarea. Las tareas en paralelo trabajan en carpetas distintas (ver `dia-del-evento/PROMPTS-CODEX.md`).
- No modifiques `conocimiento/`, `dia-del-evento/`, `plantillas/` ni `fuentes/` salvo que la tarea lo pida.
- Antes de terminar: corre `npm test --prefix app` y revisa que el diff no tenga llaves.
- Descripción del PR: **Qué cambió · Cómo probarlo (pasos) · Variables de entorno nuevas · Pendientes ⚪ · IDs de conocimiento usados**.

## 7. Definición de terminado
Una tarea está terminada cuando cumple sus criterios de aceptación, las pruebas pasan, funciona en el preview de Vercel (si aplica) y el PR explica cómo probarla. "Creo que funciona" no es evidencia.

<!-- ===== FIN: AGENTS.md ===== -->
