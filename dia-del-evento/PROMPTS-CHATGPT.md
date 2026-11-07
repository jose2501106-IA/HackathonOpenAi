# Prompts para ChatGPT web — decidir, escribir y ensayar

> ChatGPT web con el repo conectado: redacta, puntúa y te entrena; **no** escribe el código del producto (eso es Codex: [`PROMPTS-CODEX.md`](PROMPTS-CODEX.md)).
> Cuándo usar cada prompt: [`RUNBOOK.md`](RUNBOOK.md). Pitch, preguntas y video: [K09](../conocimiento/09-pitch-y-preguntas.md).

## Resumen

| # | Prompt | Cuándo (RUNBOOK) | Salida |
|---|---|---|---|
| 0 | Instrucciones del chat | 9:15 (una vez) | ChatGPT confirma que leyó `AGENTS.md` |
| 1 | Transcribir el reto (foto → texto) | Kickoff, 10:00 | `docs/RETO-OFICIAL.md` |
| 2 | Elegir la idea con la rúbrica | T+0:00 | Idea, frase de valor, persona y 3 pasos de demo |
| 3 | PRD en 15 minutos | T+0:10 | `docs/PRD.md` |
| 4 | Repartir el PRD en tareas paralelas para Codex | T+0:35 | Prompts 2–5 de Codex con los marcadores llenos |
| 5 | Textos de la interfaz | T+0:50 | `export const TEXTOS = {…}` para la Tarea 7 |
| 6 | Guion del pitch (3 min) y de los videos | T+0:50 y E−0:30 | Guion, tarjeta de memoria y guiones de video |
| 7 | Banco de preguntas del proyecto | T+2:40 | 10 preguntas con respuesta y evidencia |
| 8 | Contenido de las 7 diapositivas | T+2:40 | Deck + 3 diapositivas de reserva |
| 9 | Juez exigente (simulación) | T+2:40 y domingo | Calificación C1–C5 y 3 mejoras |
| 10 | Versión de 1 minuto | E | Pitch de 1 min y de 30 s |
| 11 | Revisión del README y textos del portal | E−0:15 y domingo 11:15 | Cambios exactos y textos para el portal |
| 12 | Kit para el voto comunitario | Domingo en la tarde | Textos, imagen, subtítulos y respuestas |

## Cómo usarlos

1. **Un solo chat (o un Proyecto de ChatGPT) para todo el día**, para que el contexto se acumule. Empieza con el prompt 0.
2. **Repo conectado:** con el plugin de GitHub de ChatGPT (Settings › Plugins › GitHub, K05.13). Escribe las rutas tal como están en el repo (`docs/PRD.md`).
3. **Si no encuentra un archivo:** el plugin depende del índice de búsqueda de GitHub y lo recién subido puede tardar (K05.13). Como el repo es público, pásale la URL raw (`https://raw.githubusercontent.com/<usuario>/<repo>/main/<ruta>`) o pega el contenido. Para leer todo junto: `conocimiento/TODO-EN-UNO.md`. Archivos creados hoy (`docs/RETO-OFICIAL.md`, `docs/PRD.md`): pégalos directamente.
4. **Respaldo preparado desde anoche:** un Proyecto de ChatGPT con `conocimiento/TODO-EN-UNO.md` y las plantillas como archivos (ver CHECKLIST).
5. Reemplaza los `[MARCADORES]` antes de enviar. Lo que ChatGPT te dé como archivo, pégalo en GitHub web en la ruta indicada.
6. **Para ensayar, usa el modo de voz** si tu app lo tiene ⚪: practicas hablando, no leyendo.

---

## 0 · Instrucciones del chat (una vez)

```text
Vas a ser mi copiloto de producto y pitch en el DevDay Exchange Community Hackathon: Mexico City
(construcción el sábado 7 de noviembre de 2026; entrega final el domingo 8 antes de las 12:00; el jurado decide el lunes 9).
Participo solo. Codex construye el código; tú me ayudas a decidir, escribir y ensayar; yo decido y presento.

Fuente de verdad: el repositorio conectado <usuario>/<repo>, rama main. Empieza por AGENTS.md y conocimiento/INDICE.md.
Si necesitas todo junto, usa conocimiento/TODO-EN-UNO.md.

Reglas:
1. Español de México, directo, frases cortas. Sin relleno.
2. Antes de afirmar algo del evento, de pey, de OpenAI o de Codex, búscalo en el repo y cita el ID de sección (por ejemplo K03.2).
   Si no está, di "no está en el repo" y márcalo con ⚪.
3. Nada inventado: ni testimonios, ni cifras sin fuente, ni nombres de botones, ni alianzas con gobierno, bancos o pey.
   Las personas de ejemplo se presentan como ficticias (K06.9).
4. Si hay opciones, numéralas y recomienda una con su porqué en una línea.
5. Si te pido un archivo, entrégalo completo en un solo bloque de Markdown listo para pegar.
6. Marca con 🧑 lo que solo yo puedo hacer: cuentas, llaves, pagos reales, merges y el pitch.
7. Nunca me pidas llaves ni secretos.
Confirma en una línea que leíste AGENTS.md citando una de sus reglas de seguridad.
```

---

## 1 · Transcribir el reto (foto → texto)

**Entrada:** fotos de las diapositivas del kickoff + tus notas.

```text
Te adjunto fotos de las diapositivas del kickoff. Primero transcríbelas tal cual, sin resumir ni corregir.
Después arma el archivo docs/RETO-OFICIAL.md con estas secciones:
# Reto oficial
## Texto del reto (literal)
## Ejemplos oficiales
## Reglas (código o material previo, equipos, uso obligatorio de Codex u OpenAI)
## Criterios de evaluación y jurado
## Entrega (portal, qué se entrega, duración del video, fechas y horas)
## Demos o pitch en vivo (si hay, cuándo y cuánto duran)
## Lo que recomendaron (pey, Codex, mentores)
## Preguntas que siguen abiertas ⚪
Lo que no aparezca en las fotos ni en mis notas, márcalo "⚪ no se dijo".
Compara con K01.4 y K01.11 y señala qué cambió o qué se aclaró.
Mis notas: [PEGA TUS NOTAS]
```

---

## 2 · Elegir la idea con la rúbrica

```text
Lee: docs/RETO-OFICIAL.md; conocimiento/07-ideas-puntuadas.md (K07, ideas y top 3 con PRD); K08.3–K08.5 (rúbrica C1–C5 y pesos);
K02.12 y K02.13 (lo que conquista y lo que aleja a los organizadores); K06.9–K06.11 (personas, datos y oportunidades);
K10 (mi perfil).
Objetivo: elegir la idea con la que puedo ganar por jurado, que Codex construya en unas 4 horas con tareas en paralelo
y que se demuestre en 3 pasos.

1. Tabla con el top 3 de K07 (más 1 idea nueva como máximo, solo si el reto oficial lo pide). Columnas:
   C1 Impacto y bien público (25%) | C2 Ejecución factible en 4 h (25%) | C3 OpenAI y Codex necesarios y visibles (20%) |
   C4 Originalidad (15%) | C5 Pitch y demo (15%) | Total ponderado | Ejemplo oficial al que responde | Riesgo principal.
2. Recomienda UNA y di por qué en 3 líneas.
3. Para la recomendada: nombre (2–3 palabras); frase de valor ("Para [persona] que [problema], [producto] [beneficio] sin [dolor]");
   persona (arquetipo ficticio de K06.9); dato de apertura con su ID de K06.10; por qué es bien público en una frase;
   los 3 pasos de la demo (qué hago / qué ve el juez); qué hace la IA que un formulario no podría; 3 cosas que NO voy a construir.
4. Chequeo: ¿cumple el reto al pie de la letra (bien público + OpenAI + CoDi con pey)? ¿La IA nunca cobra sin confirmación?
   ¿Algo depende de un dato ⚪?
Máximo 35 líneas.
```

---

## 3 · PRD en 15 minutos

```text
Llena completa la plantilla plantillas/PRD.md para la idea elegida. Se guardará como docs/PRD.md. Tiempo: 15 minutos; máximo 2 páginas.
Lee: plantillas/PRD.md; docs/RETO-OFICIAL.md; K03 (pey: endpoints, estados, QR, cuenta de prueba con pagos de $0.01 a $1,
webhooks con Standard Webhooks); K04.2 y K04.6 (modelo y function calling); K08.3 (rúbrica); dia-del-evento/PROMPTS-CODEX.md
(mapa de archivos y dueños: el PRD tiene que caber ahí).
Reglas:
- La demo de 3 pasos manda; todo lo demás va a "Debería" o "No".
- Criterios de aceptación verificables (se pueden comprobar en el celular o con una prueba).
- Herramientas del agente con su esquema: crear_cobro (K03.9: solo propone; el QR se crea en pey cuando la persona confirma)
  y como máximo una extra. La IA nunca cobra sin confirmación.
- Todo dato con su ID de conocimiento o ⚪. Nada inventado.
Entrega el archivo completo en un solo bloque de Markdown.
```

---

## 4 · Repartir el PRD en tareas paralelas para Codex

```text
Lee docs/PRD.md y dia-del-evento/PROMPTS-CODEX.md.
1. Llena los marcadores de los prompts 2, 3, 4 y 5 de Codex con datos del PRD: [IDEA ELEGIDA], [PERSONA], [DEMO PASO 1],
   [DEMO PASO 2], [DEMO PASO 3], [FRASE DE DEMO], [MONTO DEMO], [HERRAMIENTAS EXTRA], [CATÁLOGO DE EJEMPLO], [ESTILO],
   [URL PRODUCCIÓN]. No cambies nada más de los prompts.
2. Entrega cada prompt completo en su propio bloque, listo para copiar.
3. Revisa el mapa de dueños: ¿alguna tarea necesita tocar un archivo de otra tarea o un archivo congelado? Si sí, propón el cambio mínimo.
4. Si el PRD tiene un "Debería" que valga la pena para la demo, escríbelo como prompt nuevo con la plantilla R6, con archivos propios.
5. Lista lo que debo hacer yo (🧑) mientras Codex trabaja, en orden.
```

---

## 5 · Textos de la interfaz

```text
Escribe todos los textos de la interfaz de [IDEA ELEGIDA] para [PERSONA], en español de México.
Elige el trato (tú o usted) según K06.7 y la persona, y dime por qué en una línea.
Lee: docs/PRD.md; AGENTS.md (reglas de producto); K06.7 (brecha digital); app/js/textos.js si ya existe (respeta sus claves).
Incluye: título y subtítulo; texto de ayuda del campo; 3 chips de ejemplo (uno es "[FRASE DE DEMO]") marcados como "Ejemplo";
botones (máximo 24 caracteres); confirmación ("¿Cobro $X por …?"); estados del pago (esperando, pagado, expirado, reconectando);
errores sin jerga y con qué hacer (IA no disponible, sin saldo, monto inválido, pey no autorizado); banners de SIMULACIÓN y
de MODO PRUEBA (Pey); etiquetas de accesibilidad; pie con créditos (DevDay Exchange Community Hackathon CDMX · CoDi vía pey ·
IA de OpenAI).
Reglas: no prometas nada que el producto no haga; ninguna cifra; nada en inglés.
Entrega un solo bloque `export const TEXTOS = { … }` con claves en español, listo para app/js/textos.js.
```

---

## 6 · Guion del pitch (3 min) y de los videos

```text
Escribe el guion del pitch de 3 minutos con la estructura de K09.1 y la demo de 3 pasos del PRD.
Lee: conocimiento/09-pitch-y-preguntas.md (K09.1 a K09.5 y K09.9); docs/PRD.md; BITACORA.md (decisiones y horas reales);
README.md si ya existe; K06.10 (datos con fuente); K02.12.
Formato: tabla Tiempo | Lo que digo (palabra por palabra) | Lo que hago en pantalla.
Ritmo: unas 2.3 palabras por segundo; máximo ~390 palabras en total (en la demo se habla poco).
Reglas:
- Abre con la persona (arquetipo, dicho como ejemplo) y UN dato con su fuente dicha en voz alta.
- La frase de valor va en la segunda frase.
- Di qué ejemplo oficial del reto resuelve y por qué es bien público.
- "Cómo lo construí": decisiones, no herramientas, con números reales de la bitácora (PRs, tareas en paralelo, horas).
- Cierra con el siguiente paso (piloto con comercios + Hackatón México) y la URL.
Agrega al final:
(a) tarjeta de memoria con 5 palabras clave por segmento;
(b) guion del video de entrega (≤ 3 min o lo que pida el portal ⚪): qué cambia frente al pitch en vivo (texto en pantalla,
    URL visible, sin tiempos muertos, el pago real en primer plano);
(c) guion del video corto de 60–90 s que se entienda sin audio (texto en pantalla en cada escena).
```

---

## 7 · Banco de preguntas del proyecto

```text
Lee: K09.6 (20 preguntas difíciles con respuesta modelo), K08.7, docs/PRD.md, README.md y BITACORA.md.
1. Escribe 10 preguntas difíciles ESPECÍFICAS de este proyecto que K09.6 no cubra. Busca los puntos débiles reales:
   qué está en prueba o SIMULACIÓN, qué no está probado con usuarios, supuestos de negocio, riesgos de la IA, dependencia de pey.
2. Para cada una: respuesta modelo de máximo 30 segundos (≤ 70 palabras); evidencia que puedo mostrar (PR, prueba, pantalla);
   y qué NO decir.
3. Ordénalas de más a menos probable. Marca con ⚪ las respuestas que dependen de un dato no verificado.
4. Adapta las respuestas 1 a 5 de K09.6 a los datos reales del proyecto (números de la bitácora).
```

---

## 8 · Contenido de las 7 diapositivas

```text
Con plantillas/DECK.md, escribe el contenido de las 7 diapositivas del pitch de [IDEA ELEGIDA].
Lee: plantillas/DECK.md; el guion final (prompt 6); docs/PRD.md; K06.10 (datos); BITACORA.md (números de construcción).
Por diapositiva: título (≤ 8 palabras); contenido (≤ 15 palabras o 3 viñetas cortas); visual sugerido (captura de la app,
diagrama o QR); notas del orador (lo que digo); segundos.
Reglas: un número por diapositiva, con su fuente en letra chica; la 5 ("Cómo lo construí") con evidencia real de Codex
(tareas en paralelo, PRs y horas); la 7 con URL y QR; nada inventado.
Agrega 3 diapositivas de reserva para preguntas: arquitectura, seguridad y costos.
Si puedes generar el archivo .pptx con estas diapositivas, hazlo ⚪.
```

---

## 9 · Juez exigente (simulación)

```text
Actúa como juez exigente de este hackatón. Perfil: [elige uno: ingeniera de pagos de pey / embajador de Codex /
persona de SEDECO interesada en comercios de barrio].
Lee docs/PRD.md, README.md y la rúbrica K08.3–K08.5.
Hazme UNA pregunta a la vez (máximo 6) y espera mi respuesta (te la daré por voz o por texto). Después de cada una:
- califícala del 1 al 5 con una línea de por qué;
- dame una versión mejor de máximo 30 segundos, sin inventar datos.
Empieza por lo que más le preocuparía a ese perfil. Al final: calificación estimada por criterio (C1–C5) y las 3 mejoras de
mayor impacto que puedo hacer en [MINUTOS RESTANTES] minutos sin poner en riesgo la demo.
```

---

## 10 · Versión de 1 minuto

```text
Convierte el guion de 3 minutos en una versión de 1 minuto (≤ 140 palabras) con la estructura de K09.8:
gancho (10 s) → solución (10 s) → demo en 1 paso o clip del video (25 s) → cierre con URL (15 s).
Tiene que servir para el pitch en vivo, para una conversación de pasillo y como narración del video corto.
Entrega también una versión de 30 segundos (≤ 70 palabras).
```

---

## 11 · Revisión del README y textos del portal

```text
Lee: README.md (raíz), app/README.md, docs/PRD.md, BITACORA.md, K08.13 (checklist de autoevaluación) y K02.13 (lo que aleja).
1. Revisa el README como un juez con 2 minutos: ¿se entiende el problema en una frase? ¿El video y la URL están arriba?
   ¿Dice qué es real, qué es prueba y qué es SIMULACIÓN? ¿Explica qué hace OpenAI y cómo se usó Codex, con evidencia?
   ¿Declara qué existía antes y qué se hizo en el evento? ¿Hay cifras sin fuente, datos personales o promesas que el producto
   no cumple? Dame una lista de cambios exactos (texto actual → texto nuevo).
2. Textos para el portal (ajústalos a los campos reales ⚪): nombre del proyecto; tagline (≤ 60 caracteres); descripción de
   50 palabras; descripción de 150 palabras; cómo usamos OpenAI; cómo usamos Codex; cómo usamos CoDi y pey;
   enlaces (demo, repo, video). Sin datos personales.
```

---

## 12 · Kit para el voto comunitario

```text
Prepara el kit para el voto comunitario de [IDEA ELEGIDA] (K08.6 y K09.9):
1. Texto para WhatsApp (≤ 280 caracteres) y para LinkedIn o X (≤ 600 caracteres), en español de México, con la URL de la demo
   y [URL DE VOTACIÓN ⚪]. Sin pedir nada a cambio de votos y sin exagerar.
2. Frase para la imagen de portada (≤ 8 palabras) y qué captura de la app usar.
3. Subtítulos del video corto en formato SRT, a partir del guion de 60–90 s.
4. Respuestas cortas a 3 comentarios probables: "¿Esto ya existe?", "¿Es seguro?", "¿Cuánto cuesta?".
```
