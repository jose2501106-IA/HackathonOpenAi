---
description: Redacta docs/PRD.md a partir del problema que cuenta José, con criterios de aceptación y demo de 3 pasos
argument-hint: "<el problema en tus palabras: quién lo vive, qué pasa hoy, qué haría la app y dónde entra el cobro>"
disable-model-invocation: true
---

# /prd

El problema, en palabras de José:

> $ARGUMENTS

Si el texto de arriba está vacío, no escribas nada: pídele a José, en un solo mensaje, las respuestas a las 8 preguntas de la sección P12 de `docs/PROYECTO.md` y detente.

## Antes de escribir
1. Lee `docs/PROYECTO.md` completo (requisitos, flujos, restricciones, arquitectura P7 y riesgos).
2. Lee de K00 el TL;DR, K00.2, K00.4 y K00.9; de K08, la rúbrica y K08.13; de K03, el TL;DR, K03.3 y K03.5. Abre `pey/` o `codi/` solo si te falta un dato concreto.
3. No inventes nada: ni personas, ni cifras, ni testimonios, ni endpoints, ni nombres de modelos de OpenAI.

## Qué escribes: `docs/PRD.md` (español de México, máximo 2 páginas)
1. **Problema:** quién lo vive y el ejemplo real que dio José (sin datos personales).
2. **Usuario principal y contexto de uso** (celular, conexión, momento del día).
3. **Propuesta:** qué hace la app, en un párrafo, y la frase creativa.
4. **Papel de OpenAI:** qué hace el modelo, por qué un formulario no basta y qué entrega (esquema de salida). Nombre del modelo: `TODO(⚪)` hasta verificarlo en la documentación oficial.
5. **Cobro CoDi con pey:** quién le cobra a quién; flujo crear cobro → QR o solicitud → pago → webhook firmado → qué cambia en la app; confirmación explícita antes de cobrar; monto máximo en el servidor; montos de prueba de $0.01 a $1 que no se devuelven (K03.3).
6. **Ley de pagos digitales:** cómo la aprovecha como adopción voluntaria y preparación, sin afirmar obligaciones ni fechas (K00.4).
7. **Alcance del MVP** (lo mínimo para la demo) y **fuera de alcance**.
8. **Criterios de aceptación** numerados (CA1…CAn), cada uno verificable con la forma "Dado… cuando… entonces…". Incluye siempre: 360 px sin desplazamiento horizontal y botones de al menos 44 px; llaves solo en el servidor; "SIMULACIÓN" visible cuando aplique; firma del webhook verificada; montos mayores que 0 con máximo.
9. **Demo de 3 pasos:** lo que se ve en pantalla en 90 segundos o menos.
10. **Tareas** T1…Tn, pequeñas y en orden; cada una con los archivos que toca, los criterios que cumple y cómo se prueba. T1 es siempre el esqueleto desplegable en SIMULACIÓN con `GET /api/salud` (rutas de referencia en P7 de `docs/PROYECTO.md`).
11. **Riesgos y supuestos** (marca ⚪ lo no verificado).
12. **Preguntas abiertas.**

## Si falta información
Escribe `TODO(⚪): …` en la sección correspondiente y junta **todas** las preguntas en **un solo mensaje** al final: 7 como máximo, numeradas, cada una con una opción sugerida para que José pueda contestar "sí a todo".

## Al terminar
- No escribas código en este comando y no cambies `docs/PROYECTO.md` salvo que José lo pida.
- Agrega una línea al Historial de `BITACORA.md` ("PRD v1 en borrador") y actualiza "Siguientes pasos".
- Haz commit de `docs/PRD.md` y `BITACORA.md` con un mensaje en español que cite los IDs usados (por ejemplo, "según K00.2 y K03.5").
- Responde con un resumen de 5 líneas, las preguntas pendientes y el siguiente paso: que José conteste y luego `/construir T1`.
