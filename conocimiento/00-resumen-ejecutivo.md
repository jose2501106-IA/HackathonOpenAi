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
