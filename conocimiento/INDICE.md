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
| **K00** | [Bases del concurso: qué pide el DevDay Exchange Community Hackathon CDMX y cómo se evalúa](00-bases-del-concurso.md) | Resumen único y verificado del reto, lo dicho en el arranque, la ley de pagos digitales, el calendario, la entrega, la evaluación, los premios, las reglas y los pendientes; léelo primero para arrancar un proyecto sin leer lo demás. | media | 14 |
| **K01** | [Ficha verificada del evento: DevDay Exchange Community Hackathon CDMX (7 nov 2026)](01-evento-verificado.md) | Fecha, horario, sede, agenda, reto, premios, cómo llegar, qué llevar y pendientes del hackatón; léelo la noche anterior y al llegar. | alta | 21 |
| **K02** | [Organizadores y qué buscan: OpenAI/Codex, AI Builders México, pey, SpaceXAI y Gobierno CDMX](02-organizadores-y-que-buscan.md) | Quién es cada organizador o aliado, qué quiere ver en los proyectos y qué los aleja; léelo para elegir la idea y armar el pitch. | media | 10 |
| **K03** | [CoDi y API de Pey](03-codi-y-api-pey.md) | Qué es CoDi y cómo se usa la API CoDi de Pey (alta, llaves, endpoints, estados, webhooks, pagos reales de prueba, errores), con ejemplos probados en Node/Vercel y reglas para usarla desde un agente. Léelo completo antes de escribir código de cobro. | media | 22 |
| **K08** | [Criterios, jueces y cómo ganar: rúbrica, preguntas, errores y ganadores previos](08-criterios-y-jueces.md) | Criterios probables con pesos (inferencia), rúbrica 1–5, preguntas de jueces, errores que restan, ganadores previos y cómo demostrar Codex; léelo al elegir la idea y antes del pitch. | media | 11 |

## Preguntas → archivo
| Pregunta | Abre |
|---|---|
| ¿Qué pide el reto y qué es obligatorio? | K00 |
| ¿Qué dijeron los organizadores en el arranque del 7 de noviembre? | K00 |
| ¿Qué es la Ley de Economía Digital para Pagos Digitales y Electrónicos y qué no se puede afirmar de ella? | K00 |
| ¿Cuándo se entrega, cuándo decide el jurado y cuándo es el voto de la comunidad? | K00 |
| ¿Qué se entrega y dónde? | K00 |
| ¿Qué criterios son oficiales y cuáles son inferidos? | K00 |
| ¿Qué premios hay? | K00 |
| ¿Qué puede descalificar o restar puntos? | K00 |
| ¿Qué falta confirmar con los organizadores? | K00 |
| ¿Cuándo, dónde y a qué hora es el hackatón? | K01 |
| ¿Por qué hay dos horarios distintos y a qué hora conviene llegar? | K01 |
| ¿Cuál es el reto oficial y qué tecnologías se esperan? | K01 |
| ¿Cuándo y dónde se entrega el proyecto y cuándo se anuncian ganadores? | K01 |
| ¿Qué premio hay y quién organiza? | K01 |
| ¿Cómo llego en transporte público a UTOPÍA Coyoacán? | K01 |
| ¿Qué falta confirmar con los organizadores al llegar? | K01 |
| ¿Qué dijeron los organizadores en el arranque? | K01 |
| ¿Quién organiza el hackatón y qué quiere cada actor? | K02 |
| ¿Qué es el programa de Embajadores de Codex y qué valora? | K02 |
| ¿Qué novedades de OpenAI (DevDay 2026) conviene mostrar? | K02 |
| ¿Quién es AI Builders México y cuál es su misión? | K02 |
| ¿Qué es pey, qué ofrece su API y qué éxito busca? | K02 |
| ¿Qué es SpaceXAI y por qué aparece en el ecosistema del evento? | K02 |
| ¿Qué papel tienen UTOPÍAS y SEDECO? | K02 |
| ¿Qué conquista a los organizadores y qué los aleja? | K02 |
| ¿Qué pidieron los organizadores en el arranque del 7 de noviembre? | K02 |
| ¿Qué es CoDi y cómo paga un cliente con QR o con notificación? | K03 |
| ¿Qué es Pey, cuánto cuesta su API CoDi y a dónde llega el dinero? | K03 |
| ¿Cómo saco hoy una API key de Pey y cuánto tarda en activarse? | K03 |
| ¿Cuál es la URL base, el header de autenticación y los campos para crear y consultar un cobro CoDi? | K03 |
| ¿En qué formato llega el QR y cómo se mapean los estados de Pey a los de la app? | K03 |
| ¿Cómo verifico la firma de los webhooks de Pey en una Vercel Function o en Codespaces? | K03 |
| ¿Hay sandbox? ¿Cómo hago un pago real en la demo y cuál es el plan B? | K03 |
| ¿Qué errores y límites debo manejar? | K03 |
| ¿Cómo expongo la API de Pey como herramientas de un agente de IA sin riesgos? | K03 |
| ¿Cómo se evaluará el proyecto y qué pesa más? | K08 |
| ¿Cómo me autoevalúo antes de entregar? | K08 |
| ¿Cómo funciona el voto de la comunidad y cómo me preparo? | K08 |
| ¿Qué preguntarán los jueces? | K08 |
| ¿Qué errores restan puntos o descalifican? | K08 |
| ¿Qué tipo de proyectos han ganado en hackatones de Codex y OpenAI, y por qué? | K08 |
| ¿Cómo demuestro en el pitch que usé Codex? | K08 |
| ¿Qué pidieron en el arranque y cómo cambia la evaluación? | K08 |

## Secciones de cada archivo

### K00 · Bases del concurso: qué pide el DevDay Exchange Community Hackathon CDMX y cómo se evalúa
Archivo: [`00-bases-del-concurso.md`](00-bases-del-concurso.md)

- `K00.1` Qué hay de nuevo al 7 de noviembre
- `K00.2` Reto oficial y requisitos
- `K00.3` Lo que dijeron en el arranque (7 de noviembre)
- `K00.4` La ley de pagos digitales, en lo esencial
- `K00.5` Calendario
- `K00.6` Qué entregar y cómo
- `K00.7` Cómo se evalúa: oficial, dicho e inferido
- `K00.8` Premios
- `K00.9` Reglas que descalifican o restan
- `K00.10` Pendientes ⚪
- `K00.11` Dónde está el detalle

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
- `K02.14` Lo que pidieron en el arranque (7 de noviembre)

### K03 · CoDi y API de Pey
Archivo: [`03-codi-y-api-pey.md`](03-codi-y-api-pey.md)

- `K03.1` Qué es CoDi y cómo paga un cliente
- `K03.2` Qué es Pey y su API CoDi
- `K03.3` Alta y llaves
- `K03.4` Endpoints, formato del QR y estados
- `K03.5` Webhooks
- `K03.6` Desarrollo vs producción: demo con pago real y plan B
- `K03.7` Ejemplos mínimos en Node.js 20+ (probados)
- `K03.8` Errores comunes y límites
- `K03.9` La API como herramienta de un agente de IA
- `K03.10` Documentación completa de pey (carpeta `pey/`)

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
