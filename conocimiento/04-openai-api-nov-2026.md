---
id: K04
titulo: "API de OpenAI vigente (6 nov 2026): DevDay 2026, modelos, Responses, Realtime, Agents, plugins y costos"
resumen: "Qué anunció el DevDay 2026, qué modelos y precios usar hoy y ejemplos mínimos (Node.js y Python) de salida estructurada, function calling y voz Realtime; léelo antes de escribir cualquier código contra la API de OpenAI."
responde:
  - "¿Qué se anunció en el DevDay 2026 y qué conviene presumir ante los jueces?"
  - "¿Qué modelo uso para texto, voz en español, visión e imágenes, y cuánto cuesta?"
  - "¿Cómo hago llamada básica, streaming, salidas estructuradas y function calling con la Responses API?"
  - "¿Cómo conecto voz en tiempo real desde el navegador con una llave efímera creada en el servidor?"
  - "¿Siguen vigentes Agents SDK, Agents API, AgentKit, Agent Builder y ChatKit?"
  - "¿Qué necesito para probar mi propia app (plugin MCP) dentro de ChatGPT con Plus y cuánto trabajo es?"
  - "¿Cómo funciona el prompt caching de 12 horas y cuánto cuesta?"
  - "¿Cómo creo la API key, cargo saldo y qué límites tiene una cuenta nueva?"
  - "¿Qué funciones dan efecto wow en 4 horas?"
actualizado: 2026-11-06
confianza: media
fuentes: [SC01, SC02, SC03, SC04, SC05, SC06, SC07, SC08, SC09, SC10, SC11, SC12, SC13, SC14, SC15, SC16, SC17, SC18, SC19, SC20, SC21, SC22, SC23, SC24, SC25, SC26, SC27, SC28, SC29, SC30, SC31, SC32, SC44, SC48, SC57, SC59, SC64]
---

# K04 · API de OpenAI vigente (noviembre 2026)

## TL;DR

- El DevDay 2026 fue el 29 sep 2026 en San Francisco: GPT-6.1 Sol, Agents API con *computer use*, velocidad Ultrafast, Decisions API, extensiones de plugins y Codex Cloud que sigue trabajando con la laptop cerrada [SC01, SC02, SC03].
- Texto: `gpt-6.1-sol` (US$2 / US$10 por 1M tokens) como default de hackatón; `gpt-6-astra` (US$10 / US$50) para máxima calidad; `gpt-6-luna` (US$0.10 / US$0.50) para clasificar barato [SC06, SC07].
- Voz: `gpt-realtime-2.1` por WebRTC con llave efímera de `POST /v1/realtime/client_secrets`. Imagen: `gpt-image-2.6-flare` / `-sunburst`, lanzados el 4 nov [SC10, SC30].
- Con GPT-6.x las herramientas sólo funcionan en la Responses API; salidas estructuradas con `text.format` o `responses.parse` [SC13, SC12].
- La API se paga aparte de ChatGPT Plus: compra al menos US$5 de crédito para entrar al tier Build (Sol: 5,000 RPM y 1M TPM) [SC26, SC44].
- No uses Agent Builder (se apaga el 30 nov 2026), Assistants API (ya apagada) ni `gpt-image-1` (ya apagado) [SC20, SC21].

## K04.1 · DevDay 2026: fecha y lanzamientos

- **Cuándo y dónde:** 29 sep 2026, San Francisco; keynote en vivo [SC03]. El DevDay Exchange de CDMX es el 10 nov a las 14:00 [SC04].
- **Modelos y API** [SC01, SC02]:
  - **GPT-6.1 Sol** (`gpt-6.1-sol`): según OpenAI, cerca de GPT-6 Astra en código y uso de computadora, a una quinta parte del precio.
  - **Ultrafast:** velocidad pagada; OpenAI reporta hasta 8× más rápido en Codex y 6× en la API, a 6× el precio.
  - **Agents API:** beta pública desde el 10 sep; en DevDay sumó *computer use*, multiagente, Tool Search y Context Compaction.
  - **Decisions API:** defines una pregunta con respuestas fijas y te devuelve una; corre sobre GPT-6 Luna. Salió como preview limitada; la comunidad reporta beta pública desde el 22 oct [SC01].
  - OpenAI reporta 45% menos tiempo al primer token y más de 30% de mejora en velocidad de tool calls.
- **Codex** [SC01, SC02]: Codex Cloud (tareas que siguen con la laptop cerrada, lanzables desde el celular; entornos reutilizables; de Plus en adelante), CLI nueva (voz, vista `/agents`, worktrees), Code Review en la app de escritorio y Codex Security Cloud (de Pro en adelante).
- **Plugins** [SC01]: extensiones (barra lateral, paneles, visores), *MCP events* que disparan automatizaciones y "Sign in with ChatGPT".
- **ChatGPT** [SC01, SC02]: *Dots* (agentes persistentes con computadora propia en la nube), ChatGPT Space/Pages y plan Pro 500.
- **Después del DevDay:** GPT-Image-2.6 Flare y Sunburst (4 nov) [SC30].

## K04.2 · Modelos de texto y visión recomendados hoy

| Uso | Modelo (ID de API) | Entrada / entrada en caché / salida (US$ por 1M tokens) | Esfuerzo de razonamiento |
|---|---|---|---|
| Default de hackatón (texto, razonamiento, herramientas) | `gpt-6.1-sol` | 2.00 / 0.10 / 10.00 | `low`…`max`, default `medium`; sin `none` [SC08] |
| Máxima calidad | `gpt-6-astra` | 10.00 / 1.00 / 50.00 | `low`…`max` |
| Intermedio barato | `gpt-6.1-terra` | 1.00 / 0.05 / 5.00 | `none`…`max` |
| Clasificar / alto volumen | `gpt-6-luna` | 0.10 / 0.01 / 0.50 | `none`…`max` |

Precios y esfuerzos: [SC06, SC07]. La página de modelos sugiere `gpt-6-astra` "si no estás seguro" [SC06]. Los cuatro tienen ventana de 1.05M tokens y hasta 128K de salida [SC06]. En Sol, un prompt de más de 272K tokens se cobra a 2× la entrada y 1.5× la salida [SC08]. Batch/Flex cuesta la mitad; *Fast* (antes "Priority", renombrado el 30 jul 2026) cuesta el doble [SC07].

- **Herramientas:** con `gpt-6-astra` y `gpt-6.1-sol` el function calling requiere la Responses API [SC13].
- **Visión:** no hay modelo de visión aparte; los modelos recientes aceptan texto e imagen [SC06]. Forma del mensaje (⚪ no verificado hoy; es la forma conocida de la Responses API):

```js
input: [{ role: "user", content: [
  { type: "input_text", text: "Extrae comercio y total de este ticket." },
  { type: "input_image", image_url: "https://ejemplo.com/ticket.jpg" } // o "data:image/jpeg;base64,..."
]}]
```

**Recomendación:** usa `gpt-6.1-sol` con `reasoning: { effort: "low" }` en la demo (menos latencia) y sube a `medium` sólo donde la calidad se note; en Vercel pon `OPENAI_MODEL=gpt-6.1-sol` (nombre de `.env.example`) para cambiar de modelo sin tocar código. Para clasificar intenciones, `gpt-6-luna`.

## K04.3 · Voz, imagen y transcripción: nombres y precios

**Voz en tiempo real** (US$ por 1M tokens: entrada / caché / salida) [SC07]:
- `gpt-realtime-2.1`: audio 32.00 / 0.40 / 64.00; texto 4.00 / 0.40 / 24.00; imagen de entrada 5.00.
- `gpt-realtime-2.1-mini`: audio 10.00 / 0.30 / 20.00; texto 0.60 / 0.06 / 2.40.
- La 2.1 mejora a `gpt-realtime-2` en silencio y ruido; razonamiento ajustable y contexto de 256K. Voces: alloy, ash, ballad, coral, cedar, echo, marin, sage, shimmer, verse [SC31]. La familia 2 llama herramientas en plena conversación [SC32].
- `gpt-live-1`: full-duplex (escucha y habla a la vez); US$0.05/min por la capa de voz, más el modelo de backend; en la API desde el 10 sep 2026 [SC11, SC07].
- **Español:** ninguna fuente lista los idiomas de `gpt-realtime-2.1` (⚪ no verificado); OpenAI ampliará idiomas de GPT-Live en los próximos meses [SC11]. `gpt-realtime-translate`: más de 70 idiomas de entrada y 13 de salida [SC32].

**Imagen** [SC29, SC30, SC07]: `gpt-image-2.6-flare` (rápido; unos 6 s en calidad baja) y `gpt-image-2.6-sunburst` (más detalle y ediciones consistentes). Por tokens: imagen de entrada 8.00 (caché 2.00), imagen de salida 30.00, texto de entrada 5.00. Sólo en `/v1/images/generations` y `/v1/images/edits`; al 5 nov la herramienta de imagen de Responses no los soportaba [SC30]. Novedades: GIF animado y SVG.

**Transcripción** [SC07]: `gpt-transcribe` US$0.0045/min; `gpt-realtime-whisper` y `gpt-live-transcribe` US$0.017/min; `gpt-realtime-translate` US$0.034/min.

**Retiros** [SC21]: `gpt-image-1` (apagado el 23 oct); `gpt-image-1.5` y `gpt-image-1-mini` (1 dic 2026); `gpt-realtime` y `gpt-realtime-mini` (20 ene 2027).

```js
const img = await client.images.generate({
  model: "gpt-image-2.6-flare",
  prompt: "Ícono plano de una alcancía con papel picado, colores mexicanos",
  size: "1024x1024",
  quality: "low",
});
const base64 = img.data[0].b64_json; // imagen en base64
```

⚪ No verificado hoy el nombre del método del SDK; los parámetros y `data[0].b64_json` sí [SC29].

## K04.4 · Responses API: llamada básica y streaming

- Llamas `client.responses.create(...)` y el texto final está en `output_text` [SC14]; ese campo es un atajo de los SDK (⚪ no verificado hoy; con `fetch` crudo ver K04.15).
- `instructions` define el comportamiento; `input` acepta texto o una lista de mensajes [SC13].
- Para continuar una conversación, reenvía la lista completa (como los ejemplos oficiales de JS y Python) o pasa `previous_response_id` (como los de Go, Java y Ruby) [SC13].
- Streaming: `stream: true` y recorres eventos. Los clave: `response.created`, `response.output_text.delta` (campo `delta`), `response.completed` y `error` [SC14].
- En GPT-6.x, si usas caché, no cambies `reasoning.effort` a mitad de conversación; se agrega un item `configuration_update` [SC09].

```js
// Node.js — npm install openai ; exporta OPENAI_API_KEY
import OpenAI from "openai";
const client = new OpenAI();

const r = await client.responses.create({
  model: "gpt-6.1-sol",
  reasoning: { effort: "low" },
  instructions: "Responde en español de México, en máximo dos frases.",
  input: "¿Qué ventaja tiene cobrar con un enlace en lugar de efectivo?",
});
console.log(r.output_text);

const stream = await client.responses.create({
  model: "gpt-6.1-sol",
  input: "Propón 3 nombres para una app de cobros entre amigos.",
  stream: true,
});
for await (const event of stream) {
  if (event.type === "response.output_text.delta") process.stdout.write(event.delta);
  else if (event.type === "error") console.error(event.message);
}
```

```python
# Python — pip install openai ; exporta OPENAI_API_KEY
from openai import OpenAI
client = OpenAI()

r = client.responses.create(
    model="gpt-6.1-sol",
    reasoning={"effort": "low"},
    instructions="Responde en español de México, en máximo dos frases.",
    input="¿Qué ventaja tiene cobrar con un enlace en lugar de efectivo?",
)
print(r.output_text)

stream = client.responses.create(
    model="gpt-6.1-sol",
    input="Propón 3 nombres para una app de cobros entre amigos.",
    stream=True,
)
for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
    elif event.type == "error":
        print(event.message)
```

## K04.5 · Salidas estructuradas (JSON Schema)

- Se piden con `text.format` = `{ type: "json_schema", name, schema, strict: true }` [SC12].
- Atajos del SDK: en JS, `zodTextFormat(esquema, "nombre")` (de `openai/helpers/zod`) con `client.responses.parse`; en Python, `text_format=ModeloPydantic`. El objeto ya validado llega en `output_parsed` [SC12].
- Los ejemplos oficiales ponen `additionalProperties: false` y todas las propiedades en `required` [SC12].
- Una negativa no sigue el esquema: llega como item `refusal`. Revisa también `status: "incomplete"` por `max_output_tokens` [SC12].
- La doc usa `gpt-6-astra` en sus ejemplos y lo recomienda para proyectos nuevos [SC12]; con `gpt-6.1-sol` la llamada es la misma.

Forma cruda, útil desde cualquier lenguaje o `curl`:

```json
{
  "model": "gpt-6.1-sol",
  "input": "Cóbrale a Lupita 350 de los tacos",
  "text": {
    "format": {
      "type": "json_schema",
      "name": "cobro",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "monto": { "type": "number" },
          "concepto": { "type": "string" }
        },
        "required": ["monto", "concepto"],
        "additionalProperties": false
      }
    }
  }
}
```

Ejemplo completo en Node.js y Python: K04.14.

## K04.6 · Function calling (herramientas)

1. Defines herramientas "planas": `type: "function"`, `name`, `description`, `parameters` (JSON Schema) y `strict: true` [SC13].
2. El modelo responde con items `function_call` que traen `call_id`, `name` y `arguments` (string JSON) [SC13].
3. Tu código valida y ejecuta; luego agregas `{ type: "function_call_output", call_id, output }` con el mismo `call_id` [SC13].
4. Segunda llamada con todo el `input` y las mismas `tools`; lees `output_text` [SC13].

- Puede haber cero, una o varias llamadas en una respuesta: recórrelas todas [SC13].
- En modelos de razonamiento debes devolver los items de razonamiento junto con las salidas; `input_list += response.output` (Python) o `toResponseInputItems` (JS) lo resuelven [SC13].
- Si tienes muchas herramientas: `tool_search` con funciones `defer_loading: true` dentro de un `namespace` (desde `gpt-5.4`) [SC13].
- Para no romper la caché, no quites herramientas entre turnos; usa `tool_choice: "none"` o `allowed_tools` [SC09].

**Recomendación:** nunca ejecutes un cobro sólo porque el modelo lo pidió. Valida monto y concepto en el servidor y muestra una confirmación visible ("¿Cobrar $120 por 2 cafés?") antes de llamar al proveedor de pagos.

Ejemplo completo con `crear_cobro`: K04.15.

## K04.7 · Realtime API (voz): llave efímera + WebRTC

Flujo con llave efímera [SC10]:
1. El navegador pide `GET /api/realtime-token` a tu servidor.
2. El servidor llama `POST https://api.openai.com/v1/realtime/client_secrets` con tu API key y el cuerpo `{ session: { type: "realtime", model: "gpt-realtime-2.1", audio: { output: { voice: "marin" } } } }`. Regresa `data.value` con `Cache-Control: no-store`.
3. El navegador crea `RTCPeerConnection`, agrega el micrófono (`getUserMedia`), abre el canal de datos `oai-events` y genera la oferta (`createOffer`, `setLocalDescription`).
4. El navegador manda el SDP a `POST https://api.openai.com/v1/realtime/calls` con `Authorization: Bearer <llave efímera>` y `Content-Type: application/sdp`, y aplica la respuesta con `setRemoteDescription`.

- Mandar `OpenAI-Safety-Identifier` desde el servidor (valor estable y anónimo); queda ligado a la llave efímera [SC10].
- Alternativa "unificada": el navegador manda el SDP a tu servidor y éste lo reenvía como `multipart/form-data` (`sdp` + `session`) a `/v1/realtime/calls` [SC10].
- El encabezado beta `OpenAI-Beta: realtime=v1` dejó de funcionar el 12 may 2026: descarta tutoriales viejos [SC21].
- El Agents SDK de JS (`RealtimeAgent` + `RealtimeSession`) arma este WebRTC por ti con la misma llave efímera [SC18].

**Recomendación:** protege `/api/realtime-token` (sólo tu dominio, límite por IP) porque cada llave gasta tu saldo. Código en K04.16.

## K04.8 · GPT-Live-1 (opcional, voz full-duplex)

- **Qué es:** modelo de voz que escucha y habla al mismo tiempo, con detección de turnos nativa, y que delega razonamiento y herramientas a un modelo de texto de backend. OpenAI reporta +30 puntos en Full Duplex Bench frente a `gpt-realtime-2.1` [SC11].
- **Precio:** US$0.05 por minuto por la capa de voz; el modelo de backend y las herramientas se cobran aparte [SC11, SC07].
- **Flujo** [SC10]: el navegador crea canal de datos y oferta, espera a juntar candidatos ICE y manda `{ sdp }` a tu `/api/session`. Tu servidor llama `client.live.create({ session, transport: { type: "webrtc", sdp } })`, que equivale a `POST /v1/live/sessions`. En la sesión: `model: "gpt-live-1"` y `delegation: { type: "responses", responses: { model, tools, tool_choice } }` (el ejemplo oficial delega a `gpt-5.6-terra` con `web_search`). Responde 201 con `session.id` y `transport.sdp`.
- **Reglas del canal:** no envíes `session.start`; espera `session.started`; para cerrar manda `session.close` y espera `session.closed` [SC10].
- **Idiomas:** no se menciona español; OpenAI promete ampliar idiomas "en los próximos meses" [SC11] (⚪ no verificado en español).

**Recomendación:** úsalo sólo si `gpt-realtime-2.1` ya funciona y te sobra una hora; prueba primero que entienda y hable español de México.

## K04.9 · Agents SDK (JS y Python) y Agents API

- **Agents SDK JS:** `npm install @openai/agents zod`; requiere Node.js 22 o superior (AGENTS.md pide Node 20+: si lo usas, fija Node 22 en el proyecto de Vercel; ⚪ no verifiqué dónde se cambia). Texto con `Agent` + `run`; voz con `RealtimeAgent` + `RealtimeSession` (de `@openai/agents/realtime`), que conecta micrófono y audio por WebRTC; también tiene *Sandbox Agents* [SC18].
- **Agents SDK Python:** `pip install openai-agents`; `Agent` + `Runner.run_sync`; usa la Responses API por defecto, integra herramientas MCP remotas y hace voz con `gpt-realtime-2.1` [SC19]. Desde abril de 2026 trae harness y sandbox (`openai-agents>=0.14.0`) [SC17].
- **Agents API** (beta pública desde el 10 sep 2026): sirve para "build and run cloud agents with the Codex harness, fully managed by OpenAI" [SC15]. Sin cargo extra: pagas tokens, herramientas y contenedores [SC15]. Se llama con `client.beta.agents.sessions.create({ agent: { model, instructions }, environment: { type: "openai_hosted" }, input, stream: true })` (`POST /v1/agents/sessions`, encabezado `OpenAI-Beta: agents=v1` que los SDK ponen solos). Pide una llave de aplicación con permisos `api.agents.read`, `api.agents.write` y `api.responses.write` [SC16].

```js
// npm install @openai/agents zod
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const crearCobro = tool({ // ⚪ no verificado hoy: firma de tool()
  name: "crear_cobro",
  description: "Crea un cobro en MXN",
  parameters: z.object({ monto: z.number(), concepto: z.string() }),
  execute: async ({ monto, concepto }) => ({ id: "cobro_demo_001", monto, concepto }),
});

const agente = new Agent({
  name: "Cobri",
  model: "gpt-6.1-sol",
  instructions: "Ayudas a cobrar. Responde en español de México.",
  tools: [crearCobro],
});
const resultado = await run(agente, "Cóbrale 80 pesos a Ana por el pan");
console.log(resultado.finalOutput);
```

```python
# pip install openai-agents
from agents import Agent, Runner, function_tool

@function_tool  # ⚪ no verificado hoy: nombre del decorador
def crear_cobro(monto: float, concepto: str) -> dict:
    """Crea un cobro en MXN."""
    return {"id": "cobro_demo_001", "monto": monto, "concepto": concepto}

agente = Agent(name="Cobri", model="gpt-6.1-sol",
               instructions="Ayudas a cobrar. Responde en español de México.",
               tools=[crear_cobro])
print(Runner.run_sync(agente, "Cóbrale 80 pesos a Ana por el pan").final_output)
```

## K04.10 · AgentKit, Agent Builder y ChatKit: estado al 6 nov 2026

- **Agent Builder:** OpenAI lo está deprecando; los usuarios actuales lo pueden usar durante una transición y se apaga el 30 nov 2026 [SC20]. Reemplazo sugerido: Agents SDK o ChatGPT Workspace Agents [SC21].
- **ChatKit** (UI de chat embebible): sigue disponible [SC20, SC21]. La guía de Agent Builder sugiere pasar el workflow a ChatKit o copiar su código y usar el Agents SDK [SC20].
- El mismo 30 nov se apagan la plataforma de Evals y los *reusable prompts* [SC21].
- **Assistants API:** se apagó el 26 ago 2026; los reemplazos son Responses API y Conversations API [SC21].
- **AgentKit** fue el paquete anunciado en el DevDay 2025 (Agent Builder, Connector Registry, ChatKit y herramientas de evaluación) [SC64]; ninguna página actual consultada lo usa como marca vigente (⚪ no verificado).

**Recomendación:** mañana no construyas nada en Agent Builder ni en Assistants. Usa la Responses API directo (más control y menos piezas) y, si necesitas varios agentes o voz con herramientas, el Agents SDK. ChatKit sólo si hoy ya probaste que te ahorra la UI.

## K04.11 · Plugins (antes "Apps SDK"): tu app dentro de ChatGPT con Plus

- **Nombres:** desde el 9 jul 2026 el App Directory es el Plugin Directory; los conectores son "apps" dentro de plugins [SC57]. La doc actual dice "Plugins" y "MCP Apps" (estándar de UI); "Apps SDK" sobrevive en nombres de repos de ejemplo [SC24].
- **Qué necesitas:** un servidor MCP con endpoint HTTPS público (normalmente `/mcp`, streamable HTTP) o un Secure MCP Tunnel; herramientas con nombre, descripción, esquema y anotaciones [SC22].
- **Paquetes:** `npm install @modelcontextprotocol/sdk @modelcontextprotocol/ext-apps zod`. UI opcional: un recurso `ui://...` ligado a la herramienta con `_meta: { ui: { resourceUri } }`. Para exponer local: `ngrok http 8787` [SC24].
- **Probar antes:** `npx @modelcontextprotocol/inspector@latest` [SC22].
- **Conectar:** chatgpt.com/plugins → "+" → "Add custom MCP server" → nombre y URL con `/mcp` → autenticación ("No authentication" para demo) → "I understand and want to continue" → "Create as a plugin" → instalar → pestaña "Work", chat nuevo, `@` y elegir el plugin. Tras cambios: "Refresh" [SC22, SC23].
- **Plan y modo desarrollador:** la doc oficial no los menciona. Un tercero (1 oct) dice Plus, Pro, Business, Enterprise y Edu (no Free), con el interruptor "Developer mode" en Settings → Security and login, sólo en web [SC25]. Otro afirma "Developer mode is no longer needed." [SC59] (⚪ no verificado). Las herramientas que no son de sólo lectura piden confirmación [SC25].

**Recomendación (esfuerzo):** sólo herramientas ≈ 45–60 min; con UI ≈ 2–3 h. Vale la pena sólo si "cobrar desde ChatGPT" es el centro del pitch.

## K04.12 · Prompt caching (30 min y 12 h)

- **Aplica a GPT-5.6 en adelante (incluye GPT-6.x):** la caché es implícita por defecto y el prefijo cacheable debe tener al menos 1,024 tokens visibles [SC09].
- **Duración:** `prompt_cache_options.ttl` = `"30m"` (default) o `"12h"`; la de 12 h sólo existe en la Responses API. También puedes marcar bloques con `prompt_cache_breakpoint`, usar modo `"explicit"` o precalentar con `prewarm: true` [SC09].
- **Costo:** escribir en caché de 30 min cuesta 1.25× la entrada; en caché de 12 h, 2.5×; leer cuesta 0.1× (0.05× en Sol y Terra). Ese precio de escritura reemplaza al normal, no se suma [SC09]. En Sol: escritura 12 h US$5.00/1M y lectura US$0.10/1M [SC07].
- **Modelos anteriores:** usan `prompt_cache_retention` (`"in_memory"` o `"24h"`) y no cobran escritura [SC09].
- **Medir:** `usage.input_tokens_details.cached_tokens` y `usage.input_tokens_details.cache_write_tokens` [SC09].
- **Buenas prácticas:** lo estático primero (instrucciones, base de conocimiento, definición de tools) y lo variable al final; agrega mensajes, no reescribas el historial; no quites tools [SC09].

```js
const r = await client.responses.create({
  model: "gpt-6.1-sol",
  prompt_cache_options: { ttl: "12h" }, // "30m" es el default
  input: [
    { role: "developer", content: [{ type: "input_text", text: BASE_MARKDOWN }] }, // estable, >= 1,024 tokens
    { role: "user", content: [{ type: "input_text", text: pregunta }] },          // variable, al final
  ],
});
console.log(r.usage.input_tokens_details); // cached_tokens, cache_write_tokens
```

⚪ No verificado hoy: si tu versión del SDK de Python no acepta el parámetro, pásalo con `extra_body={"prompt_cache_options": {"ttl": "12h"}}`.

**Recomendación:** si metes 20K tokens de la base Markdown como prefijo y habrá huecos de más de 30 min (ensayo → pitch), usa `"12h"`: escribir cuesta ≈ US$0.10 una vez y cada lectura ≈ US$0.002, contra ≈ US$0.04 sin caché.

## K04.13 · Cuenta de API: llave, saldo y límites de una cuenta nueva

- **Plus no incluye la API:** el uso con API key es por consumo y se cobra a tarifas de la API, aparte de la suscripción [SC48, SC44].
- **Pasos (guía de terceros):** platform.openai.com → Settings → "API Keys" → "Create new secret key" (se muestra una sola vez). Saldo en platform.openai.com/settings/organization/billing/overview → "Add credit"; el mínimo típico es US$5 y puede aparecer un cargo temporal de autorización [SC28].
- **Tiers (desde el 6 oct 2026):** Free (tope US$100/mes), Build (US$5 comprados → tope US$500/mes), Launch (US$100 → US$5,000), Grow (US$500 → US$200,000). Suben solos al alcanzar el monto comprado [SC26, SC27].
- **Límites en Build:** Astra, Sol y Terra 5,000 RPM y 1M TPM; Luna 5,000 RPM y 2M TPM [SC26].
- **Free y GPT-6:** según un tercero, las páginas de GPT-6 marcan Free como "Not supported" [SC27] (⚪ no verificado en fuente oficial).
- **Ver límites:** Settings › Organization › Limits. Encabezados `x-ratelimit-*` y `Retry-After`; los SDK oficiales reintentan 429 y 503 solos [SC26].
- **Créditos en eventos hermanos:** en Charlotte, cada asistente registrado recibió US$50 en créditos de API y US$100 en créditos de Codex [SC05]; para CDMX (⚪ no verificado).

**Recomendación:** hoy mismo carga US$10–20, crea una llave por proyecto, fija un tope de gasto y prueba una llamada a `gpt-6.1-sol` y una sesión de voz. El repo es público: la llave vive sólo en variables de Vercel (tipo Secret) y en secretos de Codespaces o de Codex, nunca en archivos.

## K04.14 · Ejemplo (a): salida estructurada (Node.js y Python)

Convierte lenguaje natural en un cobro validado. Basado en el patrón oficial [SC12].

```js
// Node.js — npm install openai zod
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

const Cobro = z.object({
  monto: z.number(),
  moneda: z.enum(["MXN", "USD"]),
  concepto: z.string(),
  pagador: z.string(),
});

const response = await client.responses.parse({
  model: "gpt-6.1-sol",
  reasoning: { effort: "low" },
  input: [
    { role: "system", content: "Extrae el cobro que pide el usuario. Moneda MXN salvo que diga otra. Si falta un dato, usa cadena vacía." },
    { role: "user", content: "Cóbrale a Lupita 350 de los tacos de ayer." },
  ],
  text: { format: zodTextFormat(Cobro, "cobro") },
});

console.log(response.output_parsed);
// Esperado: { monto: 350, moneda: "MXN", concepto: "tacos de ayer", pagador: "Lupita" }
```

```python
# Python — pip install openai pydantic
from typing import Literal
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()

class Cobro(BaseModel):
    monto: float
    moneda: Literal["MXN", "USD"]
    concepto: str
    pagador: str

response = client.responses.parse(
    model="gpt-6.1-sol",
    reasoning={"effort": "low"},
    input=[
        {"role": "system", "content": "Extrae el cobro que pide el usuario. Moneda MXN salvo que diga otra. Si falta un dato, usa cadena vacía."},
        {"role": "user", "content": "Cóbrale a Lupita 350 de los tacos de ayer."},
    ],
    text_format=Cobro,
)
print(response.output_parsed)
```

Revisa negativas e incompletos antes de usar el resultado (K04.5).

## K04.15 · Ejemplo (b): function calling con `crear_cobro` (Node.js y Python)

Sigue el flujo oficial de dos llamadas [SC13]. `crearCobro` es simulada y sólo *prepara* el cobro: según AGENTS.md (§3) el cobro real ocurre hasta que la persona confirma en la interfaz, por eso `dia-del-evento/PROMPTS-CODEX.md` llama a esta herramienta `preparar_cobro`. La llamada a Pey va en el servidor (K03) y el tope sale de `MAX_MONTO_MXN` (aquí fijo en 10000 sólo como ejemplo).

```js
// Node.js — npm install openai
import OpenAI from "openai";
import { toResponseInputItems } from "openai/lib/responses/ResponseInputItems";

const client = new OpenAI();

const tools = [{
  type: "function",
  name: "crear_cobro",
  description: "Crea una solicitud de cobro en pesos mexicanos (MXN).",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      monto: { type: "number", description: "Monto en MXN, mayor que 0." },
      concepto: { type: "string", description: "Concepto corto que verá quien paga." },
    },
    required: ["monto", "concepto"],
    additionalProperties: false,
  },
}];

async function crearCobro({ monto, concepto }) {
  if (!(monto > 0 && monto <= 10000)) return { error: "Monto fuera de rango" };
  return { id: "cobro_demo_001", estado: "pendiente", monto, concepto }; // simulado
}

const input = [{ role: "user", content: "Cóbrale 120 pesos a Memo por dos cafés." }];

let response = await client.responses.create({
  model: "gpt-6.1-sol", reasoning: { effort: "low" }, tools, input,
});
input.push(...toResponseInputItems(response.output)); // conserva razonamiento y llamadas

for (const item of response.output) {
  if (item.type !== "function_call" || item.name !== "crear_cobro") continue;
  const resultado = await crearCobro(JSON.parse(item.arguments));
  input.push({ type: "function_call_output", call_id: item.call_id, output: JSON.stringify(resultado) });
}

response = await client.responses.create({
  model: "gpt-6.1-sol",
  reasoning: { effort: "low" },
  instructions: "Confirma en español de México el cobro creado o explica el error.",
  tools,
  input,
});
console.log(response.output_text);
```

```python
# Python — pip install openai
import json
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "name": "crear_cobro",
    "description": "Crea una solicitud de cobro en pesos mexicanos (MXN).",
    "strict": True,
    "parameters": {
        "type": "object",
        "properties": {
            "monto": {"type": "number", "description": "Monto en MXN, mayor que 0."},
            "concepto": {"type": "string", "description": "Concepto corto que verá quien paga."},
        },
        "required": ["monto", "concepto"],
        "additionalProperties": False,
    },
}]

def crear_cobro(monto: float, concepto: str) -> dict:
    if not (0 < monto <= 10000):
        return {"error": "Monto fuera de rango"}
    return {"id": "cobro_demo_001", "estado": "pendiente", "monto": monto, "concepto": concepto}  # simulado

input_list = [{"role": "user", "content": "Cóbrale 120 pesos a Memo por dos cafés."}]

response = client.responses.create(
    model="gpt-6.1-sol", reasoning={"effort": "low"}, tools=tools, input=input_list
)
input_list += response.output  # conserva razonamiento y llamadas

for item in response.output:
    if item.type == "function_call" and item.name == "crear_cobro":
        resultado = crear_cobro(**json.loads(item.arguments))
        input_list.append({
            "type": "function_call_output",
            "call_id": item.call_id,
            "output": json.dumps(resultado, ensure_ascii=False),
        })

response = client.responses.create(
    model="gpt-6.1-sol",
    reasoning={"effort": "low"},
    instructions="Confirma en español de México el cobro creado o explica el error.",
    tools=tools,
    input=input_list,
)
print(response.output_text)
```

**Con `fetch` nativo (stack de AGENTS.md, sin SDK).** Endpoint `POST https://api.openai.com/v1/responses`. La segunda llamada usa `previous_response_id` y manda sólo las salidas de las herramientas, como los ejemplos oficiales de Go, Java y Ruby [SC13]. Notas ⚪ (no verificado hoy): en el JSON crudo no viene `output_text` (es atajo de los SDK) y el texto se arma con los items `message`; `previous_response_id` depende de que la respuesta quede guardada (default), así que no pongas `store: false` con este patrón.

```js
// app/api/_lib/agente.js — Node 20+, fetch nativo. Reusa `tools` y `crearCobro` del bloque de Node.js.
async function responses(cuerpo, signal) {
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
    signal,
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${await r.text()}`);
  return r.json();
}

const textoDe = (resp) => resp.output
  .filter((it) => it.type === "message")
  .flatMap((it) => it.content ?? [])
  .filter((c) => c.type === "output_text")
  .map((c) => c.text)
  .join("");

export async function atender(mensaje) {
  const model = process.env.OPENAI_MODEL || "gpt-6.1-sol";
  const signal = AbortSignal.timeout(15000);
  let resp = await responses({ model, reasoning: { effort: "low" }, tools, input: mensaje }, signal);

  const salidas = [];
  for (const item of resp.output) {
    if (item.type !== "function_call" || item.name !== "crear_cobro") continue;
    const resultado = await crearCobro(JSON.parse(item.arguments));
    salidas.push({ type: "function_call_output", call_id: item.call_id, output: JSON.stringify(resultado) });
  }
  if (salidas.length) {
    resp = await responses(
      { model, reasoning: { effort: "low" }, tools, previous_response_id: resp.id, input: salidas },
      signal,
    );
  }
  return { texto: textoDe(resp), respuestaId: resp.id };
}
```

## K04.16 · Ejemplo (c): voz Realtime en el navegador con llave efímera

Endpoints, cuerpo y pasos según la guía WebRTC [SC10]. El servidor va como Vercel Function en `app/api/realtime-token.js` (stack de AGENTS.md: Node.js ESM, `fetch` nativo) o, si prefieres, en Python (FastAPI); el navegador es el mismo. Los campos `instructions` y `tools` de la sesión y los eventos de herramientas siguen la forma conocida del API GA (⚪ no verificado hoy).

```js
// app/api/realtime-token.js — Vercel Function (Node.js, ESM). URL: /api/realtime-token
// ⚪ No verificado hoy: firma estilo Web (export GET -> Response). Si Vercel no la reconoce,
// usa: export default async function handler(req, res) { ... res.status(200).json(...) }
export async function GET() {
  const r = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Safety-Identifier": "demo-usuario-anonimo-1", // estable y anónimo
    },
    body: JSON.stringify({
      session: {
        type: "realtime",
        model: "gpt-realtime-2.1",
        instructions: "Eres Cobri. Habla siempre en español de México, breve y amable.",
        audio: { output: { voice: "marin" } },
        tools: [{
          type: "function",
          name: "crear_cobro",
          description: "Crea un cobro en MXN",
          parameters: {
            type: "object",
            properties: { monto: { type: "number" }, concepto: { type: "string" } },
            required: ["monto", "concepto"],
          },
        }],
      },
    }),
  });
  if (!r.ok) return Response.json({ error: await r.text() }, { status: 500 });
  const data = await r.json();
  return Response.json({ value: data.value }, { headers: { "Cache-Control": "no-store" } });
}
```

```python
# main.py — pip install fastapi uvicorn httpx ; uvicorn main:app
import os
import httpx
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/api/realtime-token")
async def realtime_token():
    async with httpx.AsyncClient(timeout=10) as http:
        r = await http.post(
            "https://api.openai.com/v1/realtime/client_secrets",
            headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
            json={"session": {
                "type": "realtime",
                "model": "gpt-realtime-2.1",
                "instructions": "Eres Cobri. Habla siempre en español de México, breve y amable.",
                "audio": {"output": {"voice": "marin"}},
            }},
        )
    r.raise_for_status()
    return JSONResponse({"value": r.json()["value"]}, headers={"Cache-Control": "no-store"})
```

```js
// app/js/voz.js — navegador (<script type="module">). Requiere HTTPS (o localhost) y permiso de micrófono.
// /api/crear-cobro: otra función tuya (app/api/crear-cobro.js) que valida y sólo PREPARA el cobro;
// el cobro real en Pey (K03) ocurre hasta que la persona confirma en pantalla (AGENTS.md §3).
export async function iniciarVoz() {
  const { value: llaveEfimera } = await (await fetch("/api/realtime-token")).json();

  const pc = new RTCPeerConnection();
  const audio = new Audio();
  audio.autoplay = true;
  pc.ontrack = (e) => { audio.srcObject = e.streams[0]; };

  const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
  pc.addTrack(mic.getTracks()[0]);

  const dc = pc.createDataChannel("oai-events");
  dc.addEventListener("message", async (e) => {
    const ev = JSON.parse(e.data);
    if (ev.type !== "response.done") return; // ⚪ eventos de herramientas: no verificado hoy
    for (const item of ev.response?.output ?? []) {
      if (item.type !== "function_call" || item.name !== "crear_cobro") continue;
      const resultado = await (await fetch("/api/crear-cobro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: item.arguments, // tu servidor valida monto y concepto
      })).json();
      dc.send(JSON.stringify({
        type: "conversation.item.create",
        item: { type: "function_call_output", call_id: item.call_id, output: JSON.stringify(resultado) },
      }));
      dc.send(JSON.stringify({ type: "response.create" }));
    }
  });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  const sdpResp = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    body: offer.sdp,
    headers: { Authorization: `Bearer ${llaveEfimera}`, "Content-Type": "application/sdp" },
  });
  await pc.setRemoteDescription({ type: "answer", sdp: await sdpResp.text() });
  return { pc, dc, mic };
}
```

**Recomendación:** prueba esto hoy en tu celular con la URL de Vercel (HTTPS). Si los eventos de herramienta no llegan como aquí, pasa a `RealtimeAgent` del Agents SDK (K04.9), que maneja las herramientas por ti.

## K04.17 · Qué funciones dan efecto wow en 4 horas

**Recomendación** (ordenadas por impacto entre riesgo):

1. **Cobro por voz en español** (`gpt-realtime-2.1` + herramienta `crear_cobro` + confirmación en pantalla). Impacto alto; 60–90 min si hoy dejas funcionando el token y el WebRTC (K04.16). Ten un campo de texto de respaldo por si falla el audio.
2. **Foto → cobro:** visión + salida estructurada (ticket o nota escrita a mano → `{monto, concepto}`) → tarjeta de cobro lista. 30–45 min y muy visual.
3. **Lenguaje natural → JSON validado** (K04.14) como base de todo: "cóbrale 350 a Lupita por los tacos". 20 min.
4. **Toque de "lo más nuevo":** comprobante ilustrado, sticker o GIF con `gpt-image-2.6-flare`, lanzado el 4 nov [SC30]. 20–30 min; sólo adorno.
5. **Plugin MCP dentro de ChatGPT** ("cobra sin salir de ChatGPT"): wow alto, pero 1–3 h y depende del modo desarrollador (K04.11). Sólo si sobra tiempo.
6. **Para el pitch:** nombra lo del DevDay 2026 que sí usaste (GPT-6.1 Sol, Realtime 2.1, GPT-Image-2.6 y Codex Cloud con tareas en paralelo) y muestra el costo por operación. Una extracción con Sol de 500 tokens de entrada y 100 de salida cuesta ≈ US$0.002 más los tokens de razonamiento (cuánto suman: ⚪ no verificado).

Evita en la demo: Agent Builder, Assistants API, `gpt-image-1` y el encabezado beta de Realtime [SC21]. GPT-Live-1, Agents API y Decisions API, sólo si lo básico ya funciona.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SC01 | DevDay 2026 announcements and developer resources (OpenAI Developer Community) | https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006 | 2026-11-06 |
| SC02 | OpenAI DevDay 2026 Recap: Everything Announced and What Developers Should Do (nocode.mba) | https://www.nocode.mba/articles/openai-devday-2026-recap | 2026-11-06 |
| SC03 | OpenAI DevDay 2026 applications are now open (OpenAI Developer Community) | https://community.openai.com/t/openai-devday-2026-applications-are-now-open/1384509 | 2026-11-06 |
| SC04 | OpenAI DevDay Exchange 2026 | https://events.openai.com/devdayexchange2026 | 2026-11-06 |
| SC05 | DevDay Exchange Community Hackathon: Charlotte | https://ushackathons.com/events/devday-exchange-community-hackathon-charlotte | 2026-11-06 |
| SC06 | Models (OpenAI API docs) | https://developers.openai.com/api/docs/models | 2026-11-06 |
| SC07 | Pricing (OpenAI API docs) | https://developers.openai.com/api/docs/pricing | 2026-11-06 |
| SC08 | GPT-6.1 Sol: Features, Benchmarks, Pricing, and Access (DataCamp) | https://www.datacamp.com/blog/gpt-6-1-sol | 2026-11-06 |
| SC09 | Prompt caching (OpenAI API docs) | https://developers.openai.com/api/docs/guides/prompt-caching | 2026-11-06 |
| SC10 | WebRTC (OpenAI API docs) | https://developers.openai.com/api/docs/guides/voice-webrtc | 2026-11-06 |
| SC11 | Build more natural voice experiences with GPT-Live-1 in the API (OpenAI) | https://openai.com/index/introducing-gpt-live-1-in-the-api/ | 2026-11-06 |
| SC12 | Structured model outputs (OpenAI API docs) | https://developers.openai.com/api/docs/guides/structured-outputs.md | 2026-11-06 |
| SC13 | Function calling (OpenAI API docs) | https://developers.openai.com/docs/guides/function-calling | 2026-11-06 |
| SC14 | Streaming responses (OpenAI API docs) | https://developers.openai.com/api/docs/guides/streaming-responses?api-mode=responses | 2026-11-06 |
| SC15 | Introducing the Agents API and hosted sandboxes (OpenAI Developer Community) | https://community.openai.com/t/introducing-the-agents-api-and-hosted-sandboxes/1396481 | 2026-11-06 |
| SC16 | Agents API quickstart (OpenAI API docs) | https://developers.openai.com/api/docs/guides/agents-api/quickstart | 2026-11-06 |
| SC17 | The next evolution of the Agents SDK (OpenAI) | https://openai.com/index/the-next-evolution-of-the-agents-sdk/ | 2026-11-06 |
| SC18 | OpenAI Agents SDK (JavaScript/TypeScript) README | https://cdn.jsdelivr.net/gh/openai/openai-agents-js@main/README.md | 2026-11-06 |
| SC19 | OpenAI Agents SDK (Python) docs | https://openai.github.io/openai-agents-python | 2026-11-06 |
| SC20 | Agent Builder (OpenAI API docs) | https://developers.openai.com/api/docs/guides/agent-builder | 2026-11-06 |
| SC21 | Deprecations (OpenAI API docs) | https://developers.openai.com/api/docs/deprecations | 2026-11-06 |
| SC22 | Connect and test your plugin (OpenAI) | https://developers.openai.com/plugins/deploy/connect-chatgpt | 2026-11-06 |
| SC23 | Plugins Quickstart (OpenAI) | https://developers.openai.com/plugins/quickstart | 2026-11-06 |
| SC24 | MCP server and UI quickstart (OpenAI) | https://developers.openai.com/apps-sdk/quickstart | 2026-11-06 |
| SC25 | ChatGPT Developer Mode: Where It Is and How to Turn It On (Carly) | https://www.usecarly.com/blog/chatgpt-developer-mode/ | 2026-11-06 |
| SC26 | Rate limits (OpenAI API docs) | https://developers.openai.com/api/docs/guides/rate-limits.md | 2026-11-06 |
| SC27 | OpenAI API Usage Tiers 2026: Free, Build, Launch & Grow (usagebox) | https://usagebox.com/articles/openai-api-usage-tiers-build-launch-grow-2026 | 2026-11-06 |
| SC28 | OpenAI API Quick Start 2026: account, API key and billing setup (DEV Community) | https://dev.to/abdul_qadir/openai-api-quick-start-2026-account-api-key-and-billing-setup-9b8 | 2026-11-06 |
| SC29 | Image prompting (OpenAI API docs) | https://developers.openai.com/api/docs/guides/image-prompting | 2026-11-06 |
| SC30 | GPT Image 2.6: Flare vs Sunburst, Pricing and API Guide (Digital Applied) | https://www.digitalapplied.com/blog/gpt-image-2-6-flare-sunburst-api-guide | 2026-11-06 |
| SC31 | GPT Realtime 2.1 overview (Microsoft Foundry) | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/realtime-2 | 2026-11-06 |
| SC32 | OpenAI rolls out GPT-Realtime-2, Translate and Whisper audio models (FoneArena) | https://www.fonearena.com/blog/482182/openai-gpt-realtime-2-translate-whisper-features.html/amp | 2026-11-06 |
| SC44 | Codex Pricing (OpenAI; redirige a learn.chatgpt.com/docs/pricing.md) | https://developers.openai.com/codex/pricing.md | 2026-11-06 |
| SC48 | Authentication (Codex docs; redirige a learn.chatgpt.com/docs/auth) | https://developers.openai.com/codex/auth | 2026-11-06 |
| SC57 | ChatGPT Connectors (2026): Which Apps Connect and What Each Plan Gets (Justin McKelvey) | https://justinmckelvey.com/blog/chatgpt-connectors | 2026-11-06 |
| SC59 | How to Connect GitHub to ChatGPT — via MCP (AnythingMCP) | https://anythingmcp.com/guides/connect-github-to-chatgpt | 2026-11-06 |
| SC64 | OpenAI DevDay 2026: Everything Announced and What It All Means (God of Prompt; el contenido describe el DevDay 2025) | https://godofprompt.ai/blog/openai-devday-2026/ | 2026-11-06 |
