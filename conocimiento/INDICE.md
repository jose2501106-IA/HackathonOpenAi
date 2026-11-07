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
| **K06** | [Contexto: pagos, comercios y personas en México](06-contexto-pagos-y-comercios-mx.md) | Cifras verificadas (INEGI, Banxico, DOF, Condusef y prensa seria) sobre efectivo, informalidad, costo de cobrar con tarjeta, uso real de CoDi, lo que cambia el 14-dic-2026, fraude, brecha digital y Coyoacán; léelo al definir problema, 'por qué ahora', personas y datos del pitch. | media | 17 |
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
