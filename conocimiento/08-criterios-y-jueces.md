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
