---
id: K03
titulo: "CoDi y API de Pey"
resumen: "Qué es CoDi y cómo se usa la API CoDi de Pey (alta, llaves, endpoints, estados, webhooks, pagos reales de prueba, errores), con ejemplos probados en Node/Vercel y reglas para usarla desde un agente. Léelo completo antes de escribir código de cobro."
responde:
  - "¿Qué es CoDi y cómo paga un cliente con QR o con notificación?"
  - "¿Qué es Pey, cuánto cuesta su API CoDi y a dónde llega el dinero?"
  - "¿Cómo saco hoy una API key de Pey, cuánto tarda en activarse y qué significa PEY_ENV?"
  - "¿Cuál es la URL base, el header de autenticación y los campos para crear y consultar un cobro CoDi?"
  - "¿En qué formato llega el QR y cómo se mapean los estados de Pey a los de la app?"
  - "¿Cómo verifico la firma de los webhooks de Pey en una Vercel Function o en Codespaces?"
  - "¿Hay sandbox? ¿Cómo hago un pago real en la demo y cuál es el plan B?"
  - "¿Qué errores y límites debo manejar?"
  - "¿Cómo expongo la API de Pey como herramientas de un agente de IA sin riesgos?"
actualizado: 2026-11-06
confianza: media
fuentes: [SB01, SB02, SB03, SB04, SB05, SB06, SB07, SB08, SB09, SB10, SB11, SB12, SB13, SB14, SB15, SB16, SB17, SB18, SB19, SB20, SB21, SB22, SB23, SB24, SB25, SB26, SB27, SB28, SB29, SB30, SB31, SB32, SB33, SB34, SB35, SB36, SB37, SB38, SB39, SB40, SB41, SB42, SB43, SB44, SB45, SB46]
---

# K03 · CoDi y API de Pey

## TL;DR

- **CoDi** (Banxico) cobra con QR o con notificación al celular sobre SPEI, 24/7, sin comisión para quien paga ni para quien cobra; el cliente autoriza en la app de su banco [SB29][SB31].
- **API de Pey**: REST en `https://api.pey.mx`, el único entorno documentado (producción), con `Authorization: Bearer <API key>`; gratuita por ahora, self-service, y el dinero llega directo a la cuenta bancaria del comercio [SB01][SB10][SB38].
- **Alta**: portal.mipey.mx → Finanzas (cuenta `codi`) → Desarrollador → "Crear API Key". Tu CLABE tarda 5 días hábiles con Banxico; para mañana registra la cuenta de prueba publicada en la guía: se activa al instante, pero lo que le pagues NO se devuelve (usa $0.01 a $1) [SB07].
- **Flujo de demo**: `POST /codi/qr` (monto en pesos) con `generateImage: true` → muestras `qrImage` (PNG en base64) → confirmas con `GET /transaction/codi/qr/{id}` (`PAID`) o con el webhook `codi.qr.payment_received` [SB10][SB17].
- **Webhooks**: firmados con Standard Webhooks (HMAC-SHA256 sobre `id.timestamp.cuerpo`), uno por API key; regístralo como `<dominio de producción>/api/webhook-pey`, nunca con un preview [SB08][SB39][SB43].
- **Seguridad**: el repo es público, así que la llave y el secreto viven solo en variables de entorno del servidor; el agente propone, la persona confirma y el servidor impone `MAX_MONTO_MXN`.

## K03.1 · Qué es CoDi y cómo paga un cliente

CoDi® (Cobro Digital) es la plataforma de Banco de México para cobrar y pagar con transferencias desde el celular: corre sobre SPEI, opera 24/7, liquida de inmediato y no cobra comisión ni a quien paga ni a quien cobra [SB29][SB35]. El pagador autoriza cada operación, así que no hay contracargos [SB26].

**Canales.** QR (fijo en el negocio o generado por venta), NFC [SB26] y notificación al celular del pagador [SB30].

**Cómo paga el cliente con QR.** App de su banco → CoDi → pagar → escanea el QR o lo importa de la galería → escribe el monto si el QR no lo trae → autoriza con NIP, huella o token → ambos reciben confirmación [SB31]. El menú cambia por banco (en BBVA: "Pagar con CoDi") y permiten pagar BBVA, Santander, Banamex, Banorte, HSBC, Scotiabank, Banco Azteca e Inbursa, entre otros [SB33]. Nu, Mercado Pago y similares: ⚪ no verificado.

**Quién cobra.** Cualquiera con cuenta en un banco participante y app compatible, como la app CoDi Banxico [SB26][SB30]. Un software de terceros, como Pey, debe certificarse ante Banxico [SB27].

**Devoluciones.** Quien cobró puede devolver parcial o totalmente [SB28]; la API de Pey no tiene endpoint para eso (K03.4).

**Límites.** Cada banco fija su máximo; en 2019 Banxico pedía que no fuera menor a $8,000 MXN [SB32]. Límite vigente: ⚪ no verificado.

**Contexto 2026 (pitch).** Los bancos deben homologar sus transferencias móviles, CoDi incluido, a más tardar el 14 de diciembre de 2026; además existe la cuenta "nivel 2 Bis", sin RFC, para micro y pequeños comercios [SB36][SB38].

## K03.2 · Qué es Pey y su API CoDi

Pey (pey®) es una empresa de tecnología enfocada en integrar CoDi a negocios [SB02]; el pie de su documentación dice Koshi SA de CV [SB24]. Afirma que Banxico aprobó su integración con CoDi [SB03], requisito para terceros desarrolladores [SB27].

**API CoDi.** Self-service, con cualquier banco y gratuita «por el momento» [SB01]: sin cuota ni cobro por solicitud [SB06], por condiciones comerciales vigentes, no permanentes [SB38]. El dinero llega directo a la cuenta bancaria del comercio, sin cuenta en Pey [SB37][SB38]; Banxico prohíbe cuentas concentradoras [SB27].

**Qué hace** [SB06][SB10]: QR CoDi; push CoDi a un celular; registro de CLABEs de personas o empresas para cobrar a nombre de cada una (`bankAccountId`); links de pago (CoDi, tarjetas, Apple Pay y Google Pay); consulta de transacciones.

**Otros productos.** App pey (iOS y Android) que reúne los pagos CoDi de cualquier banco y comparte la vista de cobros sin dar credenciales [SB04]; soluciones para restaurantes y boletera; portal de negocios [SB02][SB05].

**Sin documentar:** la comisión por tarjeta en links de pago (⚪ no verificado) y la visión de procesador para negocios informales, que viene de los organizadores (⚪ no verificado en pey.mx).

**Dato extra.** Pey co-organiza el "Hackatón México" (14 nov a 12 dic 2026), con más de un millón de pesos en premios y créditos [SB37].

**Recomendación:** ángulo multi-comercio: registra la CLABE de cada puesto (`POST /bank-account`, `entity: "PERSON"`) y cobra con su `bankAccountId`: sin comisión y con dinero directo. Pey lo resume: «ahora falta facilitar la experiencia de quien recibe el dinero» [SB37].

## K03.3 · Alta y llaves (esta noche)

Todo pasa en `portal.mipey.mx` [SB07][SB08]:

1. **Perfil.** Qué datos pide (correo, RFC, INE…): ⚪ no verificado. Ten tu CLABE a la mano.
2. **Finanzas → cuenta de pago `codi`** (solo cuentas mexicanas). Tu CLABE tarda 5 días hábiles en registrarse ante Banxico: no estará lista mañana. Mientras, registra la **cuenta de prueba** que publica la guía (sección "Prueba en producción"): se activa de inmediato, pero lo que se le pague no se devuelve; usa montos como $0.01 MXN [SB07]. También hay registro por API: `POST /bank-account` [SB13].
3. **Desarrollador → "Crear API Key"**: nombre y cuenta vinculada (una `codi`; una `stripe` si quieres tarjetas) [SB07]. Si la llave se muestra una sola vez: ⚪ no verificado; cópiala de inmediato.
4. **Webhook**: engrane de la llave → URL → crear; guarda el secreto de firma (rotable). Un webhook por llave [SB08].
5. **Secretos** en Vercel y Codespaces: `PEY_API_KEY` y `PEY_WEBHOOK_SECRET`. Nunca en el repo.

**Entornos y `PEY_ENV`.** Pey solo documenta producción (`https://api.pey.mx`); el entorno de pruebas está "próximamente" [SB09][SB10]. La landing menciona llaves de prueba y de producción [SB01], pero la referencia técnica no. Así que `PEY_ENV` no debe cambiar la URL base (⚪ no verificado; pregúntalo a Pey).

**Recomendación:** esta noche activa CoDi en la app bancaria con la que pagarás (algunos bancos validan con un depósito de un centavo y un SMS) [SB34], paga $0.01 de punta a punta con el `curl` de abajo y graba la pantalla. Con la cuenta de prueba, baja `MAX_MONTO_MXN` (p. ej. a 20).

```bash
# Prueba de humo: crea un QR de 1 centavo. La llave sale de tu variable de entorno, nunca del repo.
curl -sS https://api.pey.mx/codi/qr \
  -H "Authorization: Bearer $PEY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"amount":0.01,"concept":"Prueba hackaton","expiration":600,"numRef":"1","generateImage":false}'
# Esperado: HTTP 201 con {"id": "...", "qrString": "..."}. Convierte qrString en QR y págalo desde tu app.
```

## K03.4 · Endpoints, formato del QR y estados

Base `https://api.pey.mx`; headers `Authorization: Bearer <PEY_API_KEY>`, `Content-Type: application/json` y `Accept: application/json` [SB10][SB23]. Los esquemas completos están en el OpenAPI (`docs.pey.mx/openapi.json`, versión 2026-10-20), no en las páginas de referencia [SB10][SB11][SB12].

| Método y ruta | Uso | Éxito |
|---|---|---|
| `POST /codi/qr` | Crear QR | 201 |
| `POST /codi/pn` | Push a un celular | 200 |
| `GET /transaction/codi/qr/{id}` | Pagos de un QR (20/página) | 200 |
| `GET /transaction/{id}` | Una transacción | 200 |
| `GET /transaction/api-key` | Todo lo cobrado (80/página) | 200 |
| `POST /bank-account`, `GET /bank-account/{id}` | CLABEs | 200 |
| `POST /payment-link/create`, `/update`, `GET /payment-link/{id}` | Links de pago | 200 |

**Monto:** pesos como número con decimales (150.00, 0.01), no centavos [SB07][SB10].

**QR:** la respuesta trae `id` (IDC de Banxico), `qrString` y, con `generateImage: true`, `qrImage` (PNG base64; puede tardar o venir `null`). Muéstralo como `data:image/png;base64,…`; si es `null`, convierte `qrString` en QR con una librería [SB10][SB23]. Pey no regresa el vencimiento: calcúlalo con `expiration` [SB10].

**Estados:** un QR no es una transacción; sus pagos salen de `GET /transaction/codi/qr/{id}`, cada uno con `status` `PENDING` o `PAID` y los campos del bloque de abajo [SB10][SB14][SB15][SB21][SB22]. Una push se sigue con su `transactionId` en `GET /transaction/{id}` [SB10].

| Respuesta de Pey | Estado sugerido |
|---|---|
| Algún item `PAID` | `pagado` |
| Lista vacía o solo `PENDING` | `pendiente` |
| 404 `NOT_FOUND` | `pendiente` hasta vencer (⚪ no verificado) |
| Pasó `expiraEn` sin `PAID` | `expirado` (lo calcula la app) |

**Cancelar o devolver:** no hay endpoint (⚪ no verificado si hay otra vía); usa `expiration` corta y devuelve desde la app bancaria del titular [SB10][SB28].

```jsonc
// POST /codi/qr: cuerpo (ejemplo propio con los campos del OpenAPI)
{
  "amount": 25.5,            // pesos MXN, obligatorio, >= 0; 0 = el cliente escribe el monto
  "concept": "2 tacos",      // lo ve el cliente en su app
  "expiration": 600,         // segundos; 0 = no vence (default); si se usa, mínimo 360
  "numRef": "1234",          // 1 a 7 dígitos; default "0"
  "generateImage": true,     // default false; agrega qrImage
  "bankAccountId": "01J...", // opcional: cuenta registrada y ACTIVE; sin él usa la cuenta codi de la llave
  "metadata": { "pedidoId": "A-17" } // hasta 50 claves; clave <= 40 y valor <= 500 caracteres; regresan como texto
}
// Respuesta 201
{ "id": "<IDC asignado por Banxico>", "qrString": "<texto a convertir en QR>", "qrImage": "<base64 PNG o null>" }

// GET /transaction/codi/qr/{id}: respuesta 200 (cada item es un objeto transacción)
{ "items": [ { "id": "<ULID>", "status": "PAID", "amount": 25.5, "currency": "MXN", "paymentMethod": "CODI",
               "amountBreakdown": { "base": 25.5, "tip": 0, "fee": 0 }, "dateCreated": 1794000000,
               "datePaid": 1794000060, "metadata": { "trackingKey": "...", "externalMetadata": { "pedidoId": "A-17" } } } ],
  "nextToken": null }

// POST /codi/pn: cuerpo (amount > 0 y <= 1,000,000; phoneNumber de 10 dígitos; expiration >= 360, default 360)
{ "amount": 25.5, "phoneNumber": "5500000000", "concept": "2 tacos", "expiration": 360, "numRef": "1234" }
// Respuesta 200
{ "transactionId": "<ULID para seguir el pago>", "codiId": "<folio CoDi de 20 dígitos>" }

// Errores 4xx/5xx (todas las rutas)
{ "error": { "message": "...", "type": "INVALID_AMOUNT", "requestId": "..." } }
```

## K03.5 · Webhooks

**Eventos** (payload plano con `type`; no hay eventos documentados de pago rechazado o vencido) [SB17][SB18][SB19][SB20]:
- `codi.qr.payment_received`: `amount`, `apiKeyId`, `bankAccountId` (si lo mandaste), `codiQrId` (el `id` del QR), `concept`, `datePaid` (Unix en segundos), `metadata`, `numRef`, `transactionId` y `type`.
- `codi.pn.payment_received`: igual, sin `codiQrId`.
- `bank.account.updated`: solo al pasar a `ACTIVE`.
- `payment_link.status_updated`: `paymentLinkId`, `status`, `clientReferenceId` y `transactions`.

**Firma.** Standard Webhooks [SB08][SB16]: headers `webhook-id`, `webhook-timestamp` y `webhook-signature` (`v1,<base64>`, quizá varias separadas por espacio) [SB06][SB39]. Se firma `id.timestamp.cuerpo` con HMAC-SHA256; la llave es el secreto sin `whsec_`, decodificado de base64 [SB39][SB40]. Compara en tiempo constante y rechaza timestamps viejos (la especificación no fija tolerancia; **Recomendación:** 5 minutos) [SB39]. Lee el cuerpo crudo con `await request.text()` [SB42].

**Respuesta.** Cualquier 2xx es entrega exitosa [SB39]; el ejemplo de Pey responde 200 [SB16]. Reintentos y timeout de Pey: ⚪ no verificado. Deduplica por `webhook-id`; depura en Desarrollador → engrane → "Webhook Logs" [SB16].

**URL pública.**
- Vercel: `https://<proyecto>.vercel.app/api/webhook-pey` [SB41], siempre con el dominio de producción: la protección estándar bloquea previews y URLs de deployment [SB43].
- Codespaces: PORTS → clic derecho → Port Visibility → Public (o `gh codespace ports visibility <puerto>:public`); URL `https://<codespace>-<puerto>.app.github.dev`. Un puerto privado exige token y Pey no entraría [SB44].
- Un webhook por llave: al cambiar de Codespaces a Vercel, edita la URL en el portal [SB08].

Código del handler: K03.7.

## K03.6 · Desarrollo vs producción: demo con pago real y plan B

**No hay sandbox:** Pey recomienda probar en producción, con bancos y webhooks reales, montos como $0.01 MXN [SB07][SB09]; no documenta simulador de pagos (⚪ no verificado).

**Guion de pago real (Recomendación):**
1. Esta noche: CoDi activo en tu app bancaria [SB33], un pago de $0.01 de punta a punta y video de la pantalla.
2. Demo: QR de $1 con `expiration: 600`, en grande; pagas desde tu celular; la UI pasa a "Pagado" por polling o webhook.
3. Con la cuenta de prueba ese dinero no regresa [SB07]; di en el pitch que en producción cae directo en la CLABE del comercio [SB38].
4. Prefiere QR: la push depende de que el celular del pagador esté ligado a CoDi [SB28][SB30] (⚪ no verificado en detalle).
5. UI: logos pey + CoDi de "Recursos de marca" [SB25].

**Plan B escalonado:**
- **B1, no llega el webhook:** polling a `GET /transaction/codi/qr/{id}` cada 2 a 5 s mientras el QR siga vigente (límite de peticiones: ⚪ no verificado) [SB10][SB15].
- **B2, Pey da 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`) o falla la red:** QR de respaldo creado esta noche con `expiration: 0` (no vence) y el video [SB10]; no subas ese QR al repo.
- **B3, todo falla:** modo SIMULACIÓN con la etiqueta visible que exige AGENTS.md, nunca presentado como pago real. El script firmado de K03.7 prueba tu webhook sin pagar.

**Recomendación:** mañana temprano pregunta a los mentores de Pey si hay llaves o entorno especial para el hackatón (⚪ no verificado).

## K03.7 · Ejemplos mínimos en Node.js 20+ (probados)

Node 20+ ya trae `fetch`. Vercel crea una función por archivo dentro de `api/`; exportas `GET` o `POST`, que reciben un `Request` web. Para módulos ES usa `.mjs` o `"type": "module"` en el `package.json` más cercano [SB41]. No encontré un SDK oficial de Pey (⚪ no verificado). Pey sugiere los SDK de Standard Webhooks [SB16]; aquí se usa `node:crypto` para no depender de nada [SB40].

Las rutas siguen la estructura del repo (`app/` es la raíz en Vercel). Si el proyecto ya tiene helpers de respuesta y configuración, úsalos en lugar de los de aquí. La UI no necesita base de datos: hace polling a `/api/estado?id=…`, que consulta a Pey. El webhook sirve para bitácora o automatizaciones.

Evidencia: estos archivos pasaron 9 pruebas con `fetch` simulado en Node 22.23 (las 2 del extracto de abajo incluidas), con el vector de ejemplo de Svix para la firma y una llamada HTTP real del script de simulación al handler. En esa versión, `node --test app/tests/` (carpeta) falló con `MODULE_NOT_FOUND`; funcionaron `node --test "app/tests/*.test.js"` y `node --test` dentro de `app/` (lo que corre `npm test --prefix app`).

```js
// app/api/_lib/pey.js: cliente mínimo de la API CoDi de Pey (Node.js 20+, ESM, sin dependencias).
// Necesita "type": "module" en app/package.json (o archivos .mjs). Campos según openapi.json 2026-10-20 (K03.4).
const BASE = "https://api.pey.mx"; // único entorno documentado (producción); PEY_ENV no cambia la URL (K03.3)
const MAX_MONTO = Number(process.env.MAX_MONTO_MXN ?? 500); // tope del producto (AGENTS.md), no es límite de Pey

export class PeyError extends Error {
  constructor(status, cuerpo) {
    super(cuerpo?.error?.message ?? `Pey respondió HTTP ${status}`);
    this.status = status;
    this.tipo = cuerpo?.error?.type;           // p. ej. INVALID_AMOUNT, INVALID_STATE, SERVICE_UNAVAILABLE
    this.requestId = cuerpo?.error?.requestId; // guárdalo para pedir soporte a Pey
  }
}

async function pey(ruta, { method = "GET", body } = {}) {
  if (!process.env.PEY_API_KEY) throw new Error("Falta la variable PEY_API_KEY");
  const res = await fetch(`${BASE}${ruta}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.PEY_API_KEY}`,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20_000), // generateImage puede hacer lenta la respuesta
  });
  const texto = await res.text();
  let datos = null;
  try { datos = texto ? JSON.parse(texto) : null; } catch { datos = { crudo: texto }; }
  if (!res.ok) throw new PeyError(res.status, datos);
  return datos;
}

/** Crea un QR CoDi. Monto en PESOS (número con decimales), no en centavos.
 *  Devuelve { id (IDC de Banxico), qrString, qrImage (base64 PNG o null) }. */
export async function crearCobroQR({ monto, concepto, referencia = "0", vigenciaSeg = 600, metadata = {} }) {
  if (!(Number.isFinite(monto) && monto > 0 && monto <= MAX_MONTO)) throw new Error(`El monto debe ser mayor que 0 y hasta ${MAX_MONTO} pesos`);
  if (!/^[0-9]{1,7}$/.test(referencia)) throw new Error("La referencia debe tener de 1 a 7 dígitos");
  if (!(vigenciaSeg === 0 || vigenciaSeg >= 360)) throw new Error("La vigencia debe ser 0 (no vence) o de al menos 360 s");
  return pey("/codi/qr", {
    method: "POST",
    body: {
      amount: Math.round(monto * 100) / 100,
      concept: String(concepto).slice(0, 40), // ⚪ Pey no documenta largo máximo; 40 es decisión propia
      expiration: vigenciaSeg,
      numRef: referencia,
      generateImage: true, // pide la imagen PNG en base64 (qrImage)
      metadata,            // regresa como metadata.externalMetadata, con valores convertidos a texto
    },
  });
}

/** Pagos de un QR (20 por página). Un QR no es una transacción: se consulta con su IDC. */
export function consultarCobrosDeQR(idc, nextToken) {
  const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
  return pey(`/transaction/codi/qr/${encodeURIComponent(idc)}${qs}`);
}

/** Detalle de una transacción (ULID), p. ej. el transactionId de una notificación push. */
export const consultarTransaccion = (id) => pey(`/transaction/${encodeURIComponent(id)}`);

/** Todas las transacciones de tu llave: 80 por página, de la más reciente a la más antigua. */
export function listarTransacciones(nextToken) {
  const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
  return pey(`/transaction/api-key${qs}`);
}

/** Convierte cualquier error en una respuesta en español, sin detalles internos ni secretos. */
export function respuestaDeError(e) {
  if (e instanceof PeyError) {
    console.error("Pey", e.status, e.tipo, e.requestId); // nunca registres la llave ni cuerpos completos
    // ⚪ Pey no documenta el código exacto de llave inválida; INVALID_STATE aparece como "CoDi no habilitado".
    const noHabilitada = e.status === 401 || e.status === 403 || e.tipo === "INVALID_STATE";
    const mensaje = noHabilitada
      ? "Tu cuenta de Pey todavía no está habilitada para cobrar."
      : "Pey no pudo procesar la solicitud. Intenta de nuevo.";
    return Response.json({ error: mensaje }, { status: e.status >= 500 ? 502 : 400 });
  }
  return Response.json({ error: e.message }, { status: 400 });
}
```

```js
// app/api/cobros.js: POST {monto, concepto} -> 201 con el QR. Vercel Function (Node.js, firma Web estándar).
import { crearCobroQR, respuestaDeError } from "./_lib/pey.js";

const VIGENCIA_SEG = 600; // 10 minutos

export async function POST(request) {
  try {
    const { monto, concepto } = await request.json();
    const qr = await crearCobroQR({ monto: Number(monto), concepto: concepto ?? "Cobro", vigenciaSeg: VIGENCIA_SEG });
    const ahora = Date.now();
    return Response.json({
      id: qr.id, // IDC de Banxico: con él se consulta el estado
      qrImage: qr.qrImage ? `data:image/png;base64,${qr.qrImage}` : null, // puede venir null
      qrString: qr.qrString, // respaldo: conviértelo en QR si no hubo imagen
      creadoEn: new Date(ahora).toISOString(),
      expiraEn: new Date(ahora + VIGENCIA_SEG * 1000).toISOString(), // Pey no regresa el vencimiento: se calcula
    }, { status: 201 });
  } catch (e) {
    return respuestaDeError(e);
  }
}
```

```js
// app/api/estado.js: GET ?id=<IDC> -> {id, estado: "pendiente" | "pagado"}. Pey es la fuente de verdad (sin BD).
import { consultarCobrosDeQR, PeyError, respuestaDeError } from "./_lib/pey.js";

export async function GET(request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Falta el id del cobro" }, { status: 400 });
  try {
    const { items = [] } = await consultarCobrosDeQR(id);
    const pago = items.find((t) => t.status === "PAID"); // estados de Pey: PENDING | PAID
    return Response.json({ id, estado: pago ? "pagado" : "pendiente", transactionId: pago?.id ?? null });
  } catch (e) {
    // ⚪ No documentado si un QR sin pagos responde lista vacía o 404: tratamos 404 como "pendiente".
    if (e instanceof PeyError && e.status === 404) return Response.json({ id, estado: "pendiente", transactionId: null });
    return respuestaDeError(e);
  }
}
// "expirado" lo decide el navegador comparando la hora actual con expiraEn: Pey no tiene ese estado.
```

```js
// app/api/webhook-pey.js: eventos de Pey firmados con Standard Webhooks (HMAC-SHA256).
import crypto from "node:crypto";

const TOLERANCIA_SEG = 300; // decisión propia: la especificación no fija un valor

export function verificarFirma({ secreto, id, timestamp, firmas, cuerpo }) {
  if (!secreto || !id || !timestamp || !firmas) return false;
  const ts = Number(timestamp);
  if (!Number.isInteger(ts) || Math.abs(Date.now() / 1000 - ts) > TOLERANCIA_SEG) return false;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64"); // secreto sin prefijo, decodificado
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${timestamp}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    if (version !== "v1" || !b64) return false;
    const recibida = Buffer.from(b64, "base64");
    return recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}

export async function POST(request) {
  const cuerpo = await request.text(); // cuerpo CRUDO: no lo parsees ni lo reformatees antes de verificar
  if (!cuerpo) return new Response("cuerpo vacío", { status: 400 });
  const ok = verificarFirma({
    secreto: process.env.PEY_WEBHOOK_SECRET,
    id: request.headers.get("webhook-id"),
    timestamp: request.headers.get("webhook-timestamp"), // ⚪ viene del estándar; Pey no lo muestra explícitamente
    firmas: request.headers.get("webhook-signature"),
    cuerpo,
  });
  if (!ok) return new Response("firma inválida", { status: 401 });

  let evento;
  try { evento = JSON.parse(cuerpo); } catch { return new Response("JSON inválido", { status: 400 }); }
  // Payload plano con "type". Registra solo identificadores, nunca el cuerpo completo ni datos personales.
  console.log("webhook", request.headers.get("webhook-id"), evento.type, evento.codiQrId ?? evento.transactionId ?? "");
  // Idempotente: aquí no se guarda nada (el estado se consulta en Pey); si algún día guardas, deduplica por webhook-id.
  return new Response("ok", { status: 200 }); // responde rápido: cualquier 2xx cuenta como entregado
}
```

```js
// scripts/simular-webhook.mjs: prueba TU endpoint con un evento falso firmado con TU secreto (solo desarrollo).
// Uso: PEY_WEBHOOK_SECRET=whsec_... node scripts/simular-webhook.mjs https://<tu-app>/api/webhook-pey <IDC>
import crypto from "node:crypto";

const [url, idc = "SIMULADO"] = process.argv.slice(2);
const secreto = process.env.PEY_WEBHOOK_SECRET;
if (!url || !secreto) throw new Error("Falta la URL o PEY_WEBHOOK_SECRET");

const ahora = Math.floor(Date.now() / 1000);
const cuerpo = JSON.stringify({
  type: "codi.qr.payment_received",
  amount: 1,
  codiQrId: idc,
  concept: "(SIMULACIÓN) demo",
  numRef: "1",
  datePaid: ahora,
  transactionId: `SIM${ahora}`,
  apiKeyId: "SIMULADO",
  metadata: { externalMetadata: { simulacion: "true" } },
});
const id = `msg_sim_${ahora}`;
const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
const firma = crypto.createHmac("sha256", llave).update(`${id}.${ahora}.${cuerpo}`).digest("base64");

const res = await fetch(url, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "webhook-id": id,
    "webhook-timestamp": String(ahora),
    "webhook-signature": `v1,${firma}`,
  },
  body: cuerpo,
});
console.log(res.status, await res.text());
```

```js
// app/tests/pey.test.js (extracto): fetch simulado + firma de webhooks. Corre con: npm test --prefix app
import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

process.env.PEY_API_KEY = "llave_de_prueba";
process.env.PEY_WEBHOOK_SECRET = `whsec_${crypto.randomBytes(32).toString("base64")}`;
const respuestas = [];
globalThis.fetch = async () => { const r = respuestas.shift(); return new Response(JSON.stringify(r.body), { status: r.status }); };

const estado = await import("../api/estado.js");
const webhook = await import("../api/webhook-pey.js");

function firmar(cuerpo, secreto = process.env.PEY_WEBHOOK_SECRET, ts = Math.floor(Date.now() / 1000)) {
  const id = `msg_${crypto.randomUUID()}`;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const firma = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest("base64");
  return { "webhook-id": id, "webhook-timestamp": String(ts), "webhook-signature": `v1,${firma}` };
}

test("estado: PAID → pagado; lista vacía → pendiente", async () => {
  respuestas.push({ status: 200, body: { items: [{ id: "01T", status: "PAID", amount: 1 }], nextToken: null } });
  assert.equal((await (await estado.GET(new Request("http://x/api/estado?id=a1b2c3d4e5"))).json()).estado, "pagado");
  respuestas.push({ status: 200, body: { items: [], nextToken: null } });
  assert.equal((await (await estado.GET(new Request("http://x/api/estado?id=a1b2c3d4e5"))).json()).estado, "pendiente");
});

test("webhook: válido 200, repetido 200, firma ajena 401, sin firma 401, vacío 400", async () => {
  const cuerpo = JSON.stringify({ type: "codi.qr.payment_received", codiQrId: "a1b2c3d4e5", amount: 1, transactionId: "01T" });
  const h = firmar(cuerpo);
  const enviar = (headers, body = cuerpo) => webhook.POST(new Request("http://x/api/webhook-pey", { method: "POST", headers, body }));
  assert.equal((await enviar(h)).status, 200);
  assert.equal((await enviar(h)).status, 200);
  assert.equal((await enviar(firmar(cuerpo, `whsec_${crypto.randomBytes(32).toString("base64")}`))).status, 401);
  assert.equal((await enviar({})).status, 401);
  assert.equal((await enviar(h, "")).status, 400);
});
```

## K03.8 · Errores comunes y límites

**Formato de error:** `{ "error": { "message", "type", "requestId" } }` [SB10]. Tipos:
- **400:** `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER` (o `INVALID_PARAMETERS` en transacciones), `INVALID_AMOUNT`, `INVALID_STATE` (p. ej. CoDi no habilitado), `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST`, `INVALID_CLABE`.
- **404:** `NOT_FOUND`, `BANK_ACCOUNT_NOT_FOUND`. **409** (links): `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE`. **500:** `INTERNAL_SERVER_ERROR`. **503:** `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`.
- Llave ausente o inválida: código ⚪ no verificado (un ejemplo da 400 "apiKeyId not included in request"; los links listan 403). **Recomendación:** trata 401, 403 e `INVALID_STATE` como "Tu cuenta de Pey todavía no está habilitada para cobrar."

**Límites documentados** [SB10][SB08]: QR `amount` >= 0 sin máximo publicado; push `amount` > 0 y <= 1,000,000; `phoneNumber` de 10 dígitos; `expiration` 0 o >= 360 s (push: >= 360, default 360); `numRef` de 1 a 7 dígitos; `metadata` hasta 50 claves (40/500 caracteres); páginas de 80, o 20 en QR; un webhook por llave; `bankAccountId` solo `ACTIVE`.

**No documentado (⚪ no verificado):** límite de peticiones, idempotencia, largo de `concept`, máximo por banco, qué ve el cliente con un QR vencido y reintentos de webhooks.

**Recomendaciones:**
- QR vencido: cuenta regresiva y QR nuevo.
- No reintentes a ciegas `POST /codi/qr` ni `/codi/pn` tras un timeout (la push llegaría dos veces); revisa antes `GET /transaction/api-key`. Deduplica webhooks por `webhook-id` [SB16] y pagos por `transactionId`.
- Ante 503, reintenta solo los GET, con espera creciente.
- Errores típicos: parsear antes de verificar la firma, webhook con URL de preview, puerto privado en Codespaces, `numRef` con letras, `expiration` de 60, montos en centavos.

## K03.9 · La API como herramienta de un agente de IA

En la Responses API cada herramienta lleva `type: "function"`, `name`, `description`, `parameters` (JSON Schema) y `strict` [SB45]. El modelo responde con items `function_call` (`call_id`, `name` y `arguments` como texto JSON) y tú devuelves un `function_call_output` con el mismo `call_id` [SB45]. Los ejemplos con `strict: true` listan todo en `required`, usan `additionalProperties: false` y modelan lo opcional con `["string", "null"]` [SB46]. Qué palabras clave se respetan en modo estricto: ⚪ no verificado; valida otra vez en el servidor. `crear_cobro` usa los mismos campos que K04.15 (`monto`, `concepto`); el flujo completo con OpenAI está en K04.6. Si tu plan la llama `preparar_cobro`, es la misma herramienta: solo propone.

**Reglas de seguridad (Recomendación):**
1. **Confirmación humana:** `crear_cobro` no cobra; devuelve una propuesta. Solo el botón "Confirmar" de la UI llama `POST /api/cobros`, fuera del control del modelo.
2. **Tope en el servidor:** `MAX_MONTO_MXN`, diga lo que diga el modelo.
3. **Llaves fuera del navegador:** todas las llamadas a Pey salen del servidor; nunca uses prefijos públicos como `NEXT_PUBLIC_` o `VITE_` para `PEY_API_KEY`.
4. **Texto no confiable:** el concepto, la metadata y los mensajes de clientes son datos, no instrucciones; nunca deben disparar herramientas.
5. **Verdad de pago:** el agente solo dice "pagado" si `consultar_cobro` lo confirma o llegó un webhook con firma válida.
6. **Bitácora:** registra cada llamada con `requestId`, sin datos personales, y limita llamadas por sesión.

```json
[
  {
    "type": "function",
    "name": "crear_cobro",
    "description": "Prepara un cobro CoDi con QR en pesos mexicanos. NO cobra: devuelve una propuesta que la persona debe confirmar en pantalla.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "monto": { "type": "number", "description": "Monto en pesos MXN, mayor que 0 y menor o igual al máximo configurado." },
        "concepto": { "type": "string", "description": "Concepto corto que verá quien paga, p. ej. '2 tacos al pastor'." }
      },
      "required": ["monto", "concepto"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "consultar_cobro",
    "description": "Dice si un cobro con QR ya fue pagado. Usa el id que regresó la creación del cobro.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "id": { "type": "string", "description": "Identificador del QR asignado por Banxico (campo id del cobro)." }
      },
      "required": ["id"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "resumen_de_ventas",
    "description": "Resume los pagos recibidos (estado PAID) en un rango de fechas: total, número de pagos y ticket promedio.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "desde": { "type": "string", "description": "Fecha inicial YYYY-MM-DD, hora de Ciudad de México." },
        "hasta": { "type": "string", "description": "Fecha final YYYY-MM-DD, inclusive." },
        "metodo": { "type": ["string", "null"], "enum": ["CODI", "CARD", null], "description": "Filtra por método de pago; null = todos." }
      },
      "required": ["desde", "hasta", "metodo"],
      "additionalProperties": false
    }
  }
]
```

```js
// Fragmento para app/api/_lib/agente.js: ejecutor de herramientas (servidor; el modelo nunca ve PEY_API_KEY).
import { consultarCobrosDeQR, listarTransacciones, PeyError } from "./pey.js";

export async function resumenDeVentas({ desde, hasta, metodo = null }) {
  // CDMX usa UTC-6 todo el año desde 2022 (sin horario de verano).
  const ini = Date.parse(`${desde}T00:00:00-06:00`) / 1000;
  const fin = Date.parse(`${hasta}T23:59:59-06:00`) / 1000;
  if (!Number.isFinite(ini) || !Number.isFinite(fin) || ini > fin) throw new Error("Rango de fechas inválido");
  let total = 0, pagos = 0, nextToken = null, paginas = 0;
  do {
    const r = await listarTransacciones(nextToken ?? undefined);
    const items = r.items ?? [];
    for (const t of items) {
      const f = t.datePaid ?? t.dateCreated;
      if (t.status !== "PAID" || f < ini || f > fin) continue;
      if (metodo && t.paymentMethod !== metodo) continue;
      total += t.amount;
      pagos += 1;
    }
    if (items.length && items.at(-1).dateCreated < ini) break; // vienen de la más reciente a la más antigua
    nextToken = r.nextToken;
  } while (nextToken && ++paginas < 20); // tope de seguridad: 20 páginas
  const r2 = (n) => Math.round(n * 100) / 100;
  return { desde, hasta, metodo, pagos, total_mxn: r2(total), ticket_promedio_mxn: pagos ? r2(total / pagos) : 0 };
}

export async function ejecutarHerramienta(nombre, args) {
  switch (nombre) {
    case "crear_cobro":
      // NO cobra. La UI muestra la propuesta con un botón "Confirmar"; solo ese botón llama POST /api/cobros,
      // y el servidor vuelve a validar el monto contra MAX_MONTO_MXN.
      return { estado: "requiere_confirmacion_humana", propuesta: { monto: args.monto, concepto: args.concepto } };
    case "consultar_cobro":
      try {
        const { items = [] } = await consultarCobrosDeQR(args.id);
        const pago = items.find((t) => t.status === "PAID");
        return pago ? { estado: "pagado", monto: pago.amount, transactionId: pago.id } : { estado: "pendiente" };
      } catch (e) {
        if (e instanceof PeyError && e.status === 404) return { estado: "pendiente" };
        throw e;
      }
    case "resumen_de_ventas":
      return resumenDeVentas(args);
    default:
      return { error: `Herramienta desconocida: ${nombre}` };
  }
}
// Devuelve cada resultado al modelo como {type: "function_call_output", call_id, output: JSON.stringify(resultado)}.
```

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SB01 | pey®: API CoDi® (página de producto) | https://pey.mx/api-codi | 2026-11-06 |
| SB02 | pey®: página de inicio | https://pey.mx/ | 2026-11-06 |
| SB03 | pey®: CoDi® | https://pey.mx/codi | 2026-11-06 |
| SB04 | pey®: Personas y PyMEs (app) | https://pey.mx/personas-pymes | 2026-11-06 |
| SB05 | pey®: Accede a pey® (app y portal de negocios) | https://pey.mx/acceso | 2026-11-06 |
| SB06 | Documentación de pey: inicio | https://docs.pey.mx | 2026-11-06 |
| SB07 | Documentación de pey: Crear una API key | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/ | 2026-11-06 |
| SB08 | Documentación de pey: Configurar webhooks | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/ | 2026-11-06 |
| SB09 | Documentación de pey: CoDi API, introducción | https://docs.pey.mx/docs/api/codi-api | 2026-11-06 |
| SB10 | CoDi API: especificación OpenAPI (versión 2026-10-20) | https://docs.pey.mx/openapi.json | 2026-11-06 |
| SB11 | Documentación de pey: Create QR | https://docs.pey.mx/docs/api/create-qr | 2026-11-06 |
| SB12 | Documentación de pey: Create Push Notification | https://docs.pey.mx/docs/api/create-push-notification | 2026-11-06 |
| SB13 | Documentación de pey: Register Bank Account | https://docs.pey.mx/docs/api/register-bank-account | 2026-11-06 |
| SB14 | Documentación de pey: Get Transaction | https://docs.pey.mx/docs/api/get-transaction | 2026-11-06 |
| SB15 | Documentación de pey: Get CoDi QR Transactions | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 2026-11-06 |
| SB16 | Documentación de pey: Webhooks, introducción | https://docs.pey.mx/docs/webhooks/introduction | 2026-11-06 |
| SB17 | Documentación de pey: webhook CoDi QR, pago recibido | https://docs.pey.mx/docs/webhooks/codi/qr | 2026-11-06 |
| SB18 | Documentación de pey: webhook CoDi notificación push, pago recibido | https://docs.pey.mx/docs/webhooks/codi/pn | 2026-11-06 |
| SB19 | Documentación de pey: webhook cuenta bancaria actualizada | https://docs.pey.mx/docs/webhooks/bank-account/updated | 2026-11-06 |
| SB20 | Documentación de pey: webhook actualización de estado del link de pago | https://docs.pey.mx/docs/webhooks/payment-link/status-update | 2026-11-06 |
| SB21 | Documentación de pey: tipo Respuesta de metadata | https://docs.pey.mx/docs/types/metadata-response | 2026-11-06 |
| SB22 | Documentación de pey: tipo Desglose del monto | https://docs.pey.mx/docs/types/amount-breakdown | 2026-11-06 |
| SB23 | Documentación de pey: tutorial Mostrar un QR CoDi | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 2026-11-06 |
| SB24 | Documentación de pey: registro de cambios, Cuentas bancarias | https://docs.pey.mx/docs/changelog/bank-accounts | 2026-11-06 |
| SB25 | Documentación de pey: Recursos de marca | https://docs.pey.mx/brand-assets | 2026-11-06 |
| SB26 | Banco de México: CoDi, Cobro Digital | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html | 2026-11-06 |
| SB27 | Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (actualizada 2 may 2023) | https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf | 2026-11-06 |
| SB28 | CoDi (codi.org.mx): Preguntas frecuentes | https://www.codi.org.mx/secundarias/preguntas_frecuentes.html | 2026-11-06 |
| SB29 | CoDi (codi.org.mx): ¿Qué es CoDi®? | https://www.codi.org.mx/secundarias/que_es_codi.html | 2026-11-06 |
| SB30 | CoDi (codi.org.mx): CoDi® para cobrar | https://www.codi.org.mx/secundarias/cobrar.html | 2026-11-06 |
| SB31 | CoDi (codi.org.mx): CoDi® para pagar | https://www.codi.org.mx/secundarias/pagar.html | 2026-11-06 |
| SB32 | Xataka México: CoDi, la guía definitiva (2019) | https://www.xataka.com.mx/aplicaciones/codi-guia-definitiva-como-pagar-como-vender-que-no-solo-codigos-qr-que-bancos-participan-mexico | 2026-11-06 |
| SB33 | Expansión: cómo pagar con CoDi en BBVA, Santander y otros bancos (2026) | https://expansion.mx/finanzas-personales/2026/07/27/como-pagar-codi-bba-santander-bancos | 2026-11-06 |
| SB34 | Expansión: cobrar sin comisiones con CoDi (abril 2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SB35 | Publimetro: CoDi y DiMo mueven tu dinero desde tu celular (junio 2026) | https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/ | 2026-11-06 |
| SB36 | Bloomberg Línea: Banxico emite medidas para simplificar pagos digitales (junio 2026) | https://www.bloomberglinea.com/latinoamerica/mexico/banxico-emite-medidas-para-simplificar-pagos-digitales-y-ampliar-limite-en-cuentas-sin-registro-ante-el-sat/ | 2026-11-06 |
| SB37 | Merca2.0: Pey, AI Builders México y SpaceXAI realizarán hackatón de pagos digitales (noviembre 2026) | https://www.merca20.com/pey-ai-builders-mexico-y-spacexai-realizaran-hackaton-de-pagos-digitales-en-mexico/ | 2026-11-06 |
| SB38 | InformaBTL: el 14 de diciembre cambiarán las transferencias; Pey apuesta por pagos QR sin comisiones (noviembre 2026) | https://www.informabtl.com/pagos-qr-mexico-14-diciembre-2026-pey-codi/ | 2026-11-06 |
| SB39 | Standard Webhooks: especificación | https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md | 2026-11-06 |
| SB40 | Svix: Verifying Webhooks Manually | https://docs.svix.com/receiving/verifying-payloads/how-manual | 2026-11-06 |
| SB41 | Vercel: Using the Node.js Runtime with Vercel Functions | https://vercel.com/docs/functions/runtimes/node-js | 2026-11-06 |
| SB42 | Vercel KB: How do I get the raw body of a Serverless Function? | https://vercel.com/kb/guide/how-do-i-get-the-raw-body-of-a-serverless-function | 2026-11-06 |
| SB43 | Vercel: Deployment Protection | https://vercel.com/docs/deployment-protection | 2026-11-06 |
| SB44 | GitHub Docs: Forwarding ports in your codespace | https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace | 2026-11-06 |
| SB45 | OpenAI: Function calling | https://developers.openai.com/api/docs/guides/function-calling | 2026-11-06 |
| SB46 | OpenAI: Structured model outputs | https://developers.openai.com/api/docs/guides/structured-outputs | 2026-11-06 |
