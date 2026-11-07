# Deck de 7 diapositivas — qué va en cada una

> Acompaña el guion de 3 minutos de [K09.1](../conocimiento/09-pitch-y-preguntas.md). ChatGPT llena el contenido (prompt 8 de `dia-del-evento/PROMPTS-CHATGPT.md`); lo armas en tu editor de presentaciones o lo hace Codex en HTML (Prompt 8 de `dia-del-evento/PROMPTS-CODEX.md`). Exporta a PDF y guárdalo en la laptop y en el celular.

## Reglas de diseño
- Una idea por diapositiva; título de 8 palabras o menos; texto de 28 pt o más (los títulos, 40 pt o más).
- Alto contraste; fondo liso; capturas reales de la app, nunca maquetas que parezcan producto terminado.
- Un número por diapositiva, con su fuente en letra chica al pie (K06.10).
- Nada inventado: ni logos de aliados que no lo son, ni testimonios, ni métricas sin medir. Los logos de pey y CoDi, solo los oficiales de "Recursos de marca" (K03.6).
- La demo no va en diapositivas: la diapositiva 4 es solo la entrada a la app en vivo.

## Las 7 diapositivas

| # | Objetivo | Título sugerido | Contenido (máximo 3 elementos) | Visual | Lo que dices | Tiempo | Criterio (K08.3) |
|---|---|---|---|---|---|---|---|
| 1 | Portada | [NOMBRE] | Frase de valor · "DevDay Exchange Community Hackathon CDMX · 7 nov 2026" · tu nombre | Logo o captura limpia de la app | Nada: abre directo con el gancho | 0:00 | — |
| 2 | Problema con dato | "[Persona] cobra en efectivo y paga comisión" | Arquetipo (dicho como ejemplo) · un dato con fuente · el dolor en 5 palabras | Foto o ilustración genérica del giro (sin personas reales identificables) | Gancho de K09.1 | 0:00–0:20 | C1 |
| 3 | Solución | "Cobra hablando, sin comisión" | Frase de valor · ejemplo oficial del reto que resuelve · "IA propone → tú confirmas → pey confirma" | Diagrama de 3 íconos | Solución de K09.1 | 0:20–0:40 | C1, C4 |
| 4 | Demo | "Demo en vivo" | URL corta · "pago CoDi real de $1" o el modo que aplique | QR a la app | "Vamos a cobrar de verdad" → cambias a la app | 0:40–2:00 | C2, C3 |
| 5 | Cómo lo construí | "Hecho hoy con Codex y OpenAI" | [M] tareas en paralelo · [P] PRs con hora · 3 decisiones (la IA propone, pey confirma, siempre desplegado) | Captura de las tareas de Codex en paralelo + esquema de `crear_cobro` | "Cómo lo construí" de K09.1 y K09.4 | 2:00–2:30 | C3, C5 |
| 6 | Impacto y siguiente paso | "Bien público: cobrar cuesta cero" | Por qué es bien público · por qué ahora (14 dic, K06.5) · piloto + Hackatón México | Línea de tiempo: hoy → piloto → 12 dic | Impacto de K09.1 y K09.5 | 2:30–2:50 | C1 |
| 7 | Cierre | "Pruébalo ahora" | URL · QR grande · repo | QR a la demo | "Está en vivo: escaneen el QR. Gracias." | 2:50–3:00 | C5 |

## Diapositivas de reserva (después de la 7, solo para preguntas)
| # | Tema | Contenido |
|---|---|---|
| R1 | Arquitectura | El diagrama del README de entrega: navegador → `app/api` → OpenAI y pey; webhook y consulta de estado |
| R2 | Seguridad | Llaves solo en el servidor · confirmación humana · tope `MAX_MONTO_MXN` · Standard Webhooks |
| R3 | Costos | Pey gratis por ahora; CoDi sin comisión; costo de IA medido hoy en el panel de uso de OpenAI, con sus supuestos (K09.6, pregunta 13) |

## Antes de presentar
- [ ] Exportado a PDF (laptop y celular) y abierto en pantalla completa.
- [ ] La URL y el QR de las diapositivas 4 y 7 llevan al **dominio de producción**.
- [ ] Los números de la diapositiva 5 salen de `BITACORA.md`.
- [ ] Un ensayo completo con cronómetro, cambiando de la diapositiva 4 a la app y de regreso.
