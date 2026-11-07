# app/ · ¿Ya cayó?

El producto: interfaz estática (sin framework ni build) y funciones de Vercel en Node.js. Qué hace y por qué: [`../README.md`](../README.md) y [`../docs/PRD.md`](../docs/PRD.md). Contrato de la API: [`../docs/CONTRATO-API.md`](../docs/CONTRATO-API.md).

## Correr en local (Node 22)
```bash
cd app
npm install
npm test          # todas las pruebas, con fetch simulado (no llaman a pey ni a OpenAI)
npm run local     # http://localhost:3000
```
Sin llaves, la app arranca en **SIMULACIÓN** y todo el flujo funciona: pedido → QR → revisar captura → "Simular pago (demo)" → "¡Ya cayó!".

Para probar con llaves, copia [`../.env.example`](../.env.example) a `app/.env` (git lo ignora) y llena los valores. Recorrido automático en navegador con capturas: `python3 ../scripts/demo_e2e.py http://localhost:3000`.

## Estructura
| Ruta | Qué es |
|---|---|
| `index.html`, `css/`, `js/`, `img/` | Interfaz móvil en español. `js/textos.js` tiene todos los textos visibles. |
| `api/*.js` | Una función de Vercel por archivo: `salud`, `agente`, `cobros`, `estado`, `simular-pago`, `revisar`, `webhook-pey`. |
| `lib/` | Código compartido: configuración, HTTP, tickets firmados, cliente de pey, QR, estado del cobro, cliente de OpenAI, catálogo, agente, lectura de capturas y veredicto. Vive fuera de `api/` como recomienda Vercel (K05.16). |
| `tests/` | Pruebas con `node:test`. `flujo-demo.test.js` recorre la demo completa en SIMULACIÓN. |
| `servidor-local.mjs` | Servidor local que imita a Vercel (`npm run local`). |

## Desplegar en Vercel
1. Importa el repo en Vercel con **Root Directory = `app`** y **Framework Preset = Other** (sin build).
2. Variables (Settings → Environment Variables), nombres en `.env.example`: `MODO_PAGO`, `MAX_MONTO_MXN`, `APP_SECRET` y, cuando las tengas, `OPENAI_API_KEY`, `OPENAI_MODEL`, `PEY_API_KEY`, `PEY_WEBHOOK_SECRET`. Después de cambiarlas, **Redeploy**.
3. Revisa `https://<tu-dominio>/api/salud`: dice el modo y si hay llaves (nunca las muestra).
4. Webhook de pey (opcional): regístralo en el portal de pey con la URL de **producción** `https://<tu-dominio>/api/webhook-pey`. La pantalla no depende de él: consulta a pey cada 2 segundos.
