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
