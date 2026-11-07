# Punto de venta de Tacos El Gran Abanico · NFC en la mesa y cobro CoDi®

Proyecto de José para el **DevDay Exchange Community Hackathon: Mexico City** (7 de noviembre de 2026, CDMX). El reto: herramientas de **bien público** con **OpenAI** y **CoDi**, cobrando con la **API de pey** (K00).

**La idea:** cada mesa tiene una etiqueta NFC con una URL fija. El cliente la toca, ve su cuenta (productos, descuentos, IVA y total), escribe su celular y oprime **Pagar**: le llega una solicitud de pago CoDi a la app de su banco. Cuando pey confirma el pago, el punto de venta descuenta los ingredientes, registra lo vendido y muestra **"¡Pago aprobado!"**. Sin terminal, sin efectivo y sin comisión.

## Estado (honesto)
Construido el 7 de noviembre de 2026. Las pruebas automáticas pasan y el flujo completo funciona en **SIMULACIÓN**. Hasta que `BITACORA.md` lo registre con evidencia, **no está desplegado ni probado con un cobro real de pey**. El menú, los precios y las existencias son **de ejemplo**.

## Pantallas
- **Caja** (`/`): el taquero ve las 5 mesas, captura productos por mesa (con promociones y descuento a la orden), consulta el inventario de ingredientes y el reporte del día, y copia la URL NFC de cada mesa.
- **Mesa** (`/mesa?m=<id>&t=<token>`, la URL de la etiqueta NFC): cuenta, celular, "Pagar", espera de autorización y resultado.

Detalle: [PRD](docs/PRD.md) · [contrato de la API](docs/CONTRATO-API.md) · [entrega y despliegue](docs/ENTREGA.md).

## Cómo funciona
- **Cobro:** `POST /codi/pn` de pey con el total recalculado en el servidor. El pago se confirma solo con pey: webhook `codi.pn.payment_received` con firma Standard Webhooks verificada, o `GET /transaction/{id}` con `status: PAID` y el mismo monto ([`pey/`](pey/README.md)).
- **Inventario:** al confirmar, una función de Postgres marca la orden pagada, descuenta ingredientes según las recetas y guarda al cliente, todo en una transacción e idempotente (un webhook repetido no descuenta dos veces). Si pey rechaza o el cobro vence, no se descuenta nada.
- **Base de datos:** Supabase (`supabase/migrations/`), con RLS activo y sin políticas: solo el servidor entra con su llave secreta. Sin Supabase, un almacén en memoria para probar en local.
- **IA (OpenAI):** análisis de ventas e inventario con la Responses API y salida estructurada; listo para activarse con `OPENAI_API_KEY`. La IA solo sugiere: no toca cobros ni inventario.
- **Stack:** HTML, CSS y JS sin build (`public/`); Vercel Functions en Node.js 22 (`api/`, `lib/`).

## Correrlo
```bash
npm install
npm run dev      # http://localhost:3000 · sin llaves corre en SIMULACIÓN (mesas con token sim1…sim5)
npm test         # node:test con fetch simulado + migraciones SQL reales en PGlite
```
Variables: [`.env.example`](.env.example). Los valores van como secretos en Vercel o Codespaces, nunca en el repo ni en el chat.

## Dinero, datos y seguridad
- **MODO PRUEBA por defecto:** con llave de pey se cobran **$0.10 reales** en lugar del total (`MONTO_PRUEBA_MXN`), y la pantalla lo dice. `COBRO_PRUEBA=0` cobra el total con tope `MONTO_MAXIMO_MXN`. pey solo tiene producción y no devuelve pagos (K03.3).
- **Celular:** se usa para la solicitud CoDi; si el cliente marca "Recordar", se guarda en su teléfono y en la tabla `clientes` (visitas y gasto). Nunca en logs.
- **Caja:** con cobros reales exige `CAJA_PIN`.
- **Ley de pagos digitales:** el proyecto es adopción voluntaria; la ley no obliga hoy a los comercios a aceptar pagos digitales (K00.4).
- **Marca:** pey® y CoDi® son marcas de sus dueños; este proyecto no está patrocinado ni avalado por pey ni por Banxico.

## Cómo se construyó
- **José:** definió el producto (NFC por mesa, solicitud de pago al celular, inventario por ingredientes, Supabase) y presenta.
- **Claude Code** con un agente en paralelo para las pantallas: código, pruebas y documentación el 7 de noviembre; avance y evidencia en [`BITACORA.md`](BITACORA.md).
- **Antes:** la base de conocimiento del concurso, pey y CoDi (5 y 6 de noviembre). Dos ideas previas se construyeron y retiraron el 7 de noviembre; su código sigue en el historial de git («¿Ya cayó?» `8f45d3d`, «Tócale» `b592bee`).

## Base de conocimiento (sigue en el repo)

| Ruta | Qué es |
|---|---|
| [`docs/PROYECTO.md`](docs/PROYECTO.md) | Objetivo del hackatón y definición sistémica del proyecto (P1–P12). |
| [`docs/GUIA-CODESPACES.md`](docs/GUIA-CODESPACES.md) | Claude Code en Codespaces: secretos, inicio de sesión, despliegue y prompts. |
| [`.claude/commands/`](.claude/commands/) | Prompts por fase: arrancar, PRD, construir, verificar, desplegar y entregar. |
| [`conocimiento/00-bases-del-concurso.md`](conocimiento/00-bases-del-concurso.md) | K00: requisitos, calendario, entrega, criterios, premios y pendientes. |
| [`conocimiento/01-evento-verificado.md`](conocimiento/01-evento-verificado.md) | K01: el evento verificado. |
| [`conocimiento/02-organizadores-y-que-buscan.md`](conocimiento/02-organizadores-y-que-buscan.md) | K02: organizadores, aliados y qué buscan (incluido pey). |
| [`conocimiento/03-codi-y-api-pey.md`](conocimiento/03-codi-y-api-pey.md) | K03: CoDi y la API de pey en síntesis. |
| [`conocimiento/08-criterios-y-jueces.md`](conocimiento/08-criterios-y-jueces.md) | K08: cómo se evalúa y qué resta puntos. |
| [`pey/`](pey/README.md) | Documentación de pey en Markdown: guías, API, webhooks, errores y marca. |
| [`codi/`](codi/README.md) | Documentación de CoDi (Banxico): qué es, cómo funciona, reglas, cifras y marca. |
| [`docs/REVISION-PEY-2026-11-07.md`](docs/REVISION-PEY-2026-11-07.md) | Revisión de pey y decisiones del 7-nov (PR #1, Codex). |
| [`conocimiento/INDICE.md`](conocimiento/INDICE.md) | Qué archivo responde cada pregunta; todo junto en `TODO-EN-UNO.md`. |
| [`fuentes/REGISTRO.md`](fuentes/REGISTRO.md) | De dónde sale cada dato, con fecha de consulta. |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Reglas para agentes. |

## Mantenimiento de la base

```bash
python3 scripts/unir_registros.py           # junta las fuentes en fuentes/REGISTRO.md
python3 scripts/construir_indice.py         # regenera conocimiento/INDICE.md
python3 scripts/construir_todo_en_uno.py    # regenera conocimiento/TODO-EN-UNO.md
python3 scripts/verificar_conocimiento.py   # revisa formato, fuentes, enlaces, IDs repetidos y secretos
```
