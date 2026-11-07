# Tócale · toca la tarjeta y paga con CoDi®

Proyecto de José para el **DevDay Exchange Community Hackathon: Mexico City** (sábado 7 de noviembre de 2026, UTOPÍA Elena Poniatowska Amor, CDMX). El reto: herramientas de **bien público** con **OpenAI** y **CoDi**, cobrando con la **API de pey** (K00).

**El problema** (José, cliente de una taquería de la CDMX): "El cliente llega queriendo pagar con tarjeta, y el cajero de la taquería solamente les puede vender en efectivo. Se pierden ventas."

**La idea:** tocas una tarjeta NFC (o escaneas un QR), escribes tu celular y pagas con CoDi desde la app de tu banco. El cajero ve "pagado" sin terminal y sin revisar comprobantes. Sirve para cualquier puesto que hoy solo acepta efectivo. "Tócale" es nombre provisional.

## Estado (honesto)

Prototipo en construcción el 7 de noviembre de 2026. Hasta que `BITACORA.md` lo registre con evidencia, **no está desplegado ni probado con un cobro real de pey**. El negocio ("Taquería El Ejemplo"), el menú y los precios son de ejemplo. Sin llaves, la app corre en **SIMULACIÓN** y lo dice en pantalla.

## Cómo se usa

1. **Caja** (`/`, en el celular del cajero): arma el pedido con botones o dictándolo; la IA de OpenAI lo convierte en productos del menú y el código pone los precios. "Crear cobro" da una liga firmada: se graba en una tarjeta NFC (Chrome en Android) o se muestra como QR.
2. **Cliente** (`/p?o=…`, en su celular): toca la tarjeta o escanea el QR, ve su pedido, escribe su número y recibe una solicitud de pago CoDi de pey en la app de su banco. La autoriza.
3. **Pagado:** las dos pantallas cambian a "Pagado" solo cuando pey lo confirma. Si la solicitud no llega, la Caja muestra un QR CoDi de respaldo.

Detalle: [PRD](docs/PRD.md) · [contrato de la API](docs/CONTRATO-API.md) · [pitch](docs/PITCH.md) · [entrega](docs/ENTREGA.md).

## Cómo funciona

- **Pantallas:** HTML, CSS y JavaScript sin framework ni build, en `public/`.
- **Servidor:** Vercel Functions en Node.js 22 (`api/`); código compartido en `lib/`. Llama a OpenAI y a pey; el navegador solo habla con nuestra API.
- **IA:** OpenAI Responses API con salida estructurada (`text.format` tipo `json_schema`); modelo por defecto `gpt-6-luna`, configurable con `OPENAI_MODEL`. Sin llave, una interpretación básica sin IA.
- **Cobro:** `POST /codi/pn` (solicitud al celular) y `POST /codi/qr` (respaldo); confirmación con `GET /transaction/{id}`, `GET /transaction/codi/qr/{id}` y `GET /transaction/api-key`; webhook con firma Standard Webhooks verificada ([`pey/`](pey/README.md)).
- **Sin base de datos:** el pedido viaja firmado (HMAC) dentro de la liga, válida 3 horas; la verdad del pago vive en pey.

## Correrlo en tu computadora o en Codespaces

```bash
npm install
npm run dev      # http://localhost:3000 (Caja) — sin llaves corre en SIMULACIÓN
npm test         # pruebas con node:test y fetch simulado; no llaman a servicios reales
```

Variables de entorno (nombres en [`.env.example`](.env.example); los valores van como secretos en Vercel o Codespaces, nunca en el repo ni en el chat):

| Variable | Para qué |
|---|---|
| `PEY_API_KEY` | Cobrar con pey; sin ella, SIMULACIÓN |
| `PEY_WEBHOOK_SECRET` | Verificar los webhooks de pey |
| `OPENAI_API_KEY` | La IA; sin ella, interpretación básica |
| `OPENAI_MODEL` | Opcional; por defecto `gpt-6-luna` |
| `MONTO_MAXIMO_MXN` | Tope de cada cobro en el servidor; por defecto `1` |
| `CAJA_PIN` | Recomendado al desplegar: que nadie más cree cobros con tu URL |
| `FIRMA_SECRETO` | Opcional; si falta, la llave para firmar ligas se deriva de `PEY_API_KEY` |

Despliegue en Vercel, alta en pey, webhook y prueba real: [docs/ENTREGA.md](docs/ENTREGA.md).

## Dinero, datos y seguridad

- **Dinero real con cuidado:** pey solo tiene producción. El servidor nunca cobra más de `MONTO_MAXIMO_MXN` (1 peso por defecto); si el pedido vale más, se cobra el tope y las pantallas dicen "Cobro de prueba". Ningún cobro sin confirmación de la persona (K03.3).
- **Celular del cliente:** solo se usa para mandar la solicitud de pago; no se guarda ni se escribe en logs. "Recordar mi número" es opcional y vive solo en el teléfono del cliente.
- **Llaves:** solo en el servidor como variables de entorno.
- **Ley de pagos digitales:** Tócale es adopción voluntaria; la ley no obliga hoy a los comercios a aceptar pagos digitales (K00.4).
- **Marca:** pey® y CoDi® son marcas de sus dueños; este proyecto no está patrocinado ni avalado por pey ni por Banxico.

## Cómo se construyó

- **José:** definió el problema, trajo la idea de las tarjetas NFC y la solicitud de pago al celular, decidió el alcance y presenta.
- **Claude Code** (con agentes en paralelo: servidor, pantallas y documentación): escribió el código, las pruebas y la documentación el sábado 7 de noviembre; el avance y la evidencia están en [`BITACORA.md`](BITACORA.md) y en los commits con hora.
- **Qué existía antes del sábado:** la base de conocimiento del concurso, de pey y de CoDi (desde el 5 y 6 de noviembre). Una primera idea, «¿Ya cayó?», se construyó y se retiró el 7 de noviembre; su código sigue en el historial de git (commit `8f45d3d`).

## Base de conocimiento (sigue en el repo)

| Ruta | Qué es |
|---|---|
| [`docs/PROYECTO.md`](docs/PROYECTO.md) | Objetivo del hackatón y definición sistémica del proyecto (P1–P12, con las 8 preguntas respondidas). |
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
