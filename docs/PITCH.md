# Pitch · Tócale (3 minutos)

> Guion para el jurado y para pey. Lo presenta José. Antes de usar una frase marcada como "solo si…", revisa que se cumpla. Producto: [`docs/PRD.md`](PRD.md). Reglas para no exagerar: K00.4 (ley), K08.7 (preguntas), K08.8 (lo que resta puntos).

## Antes de presentar

- [ ] `https://<dominio>/api/salud` dice `modo: "real"` (si dice `"simulacion"`, usa las frases de SIMULACIÓN).
- [ ] Un cobro real de prueba ya salió bien hoy y está anotado en `BITACORA.md` (`transactionId` y hora).
- [ ] Dos celulares cargados: el de la Caja (Android con Chrome) y el del cliente, con la app de su banco y CoDi activo.
- [ ] Tarjeta NFC grabada con un pedido de prueba, o el QR listo si no hay tarjetas.
- [ ] Video de respaldo de 60–90 s en el celular, sin internet.
- [ ] Los productos del dictado de la demo existen en el menú de ejemplo.

## Guion

**0:00–0:20 · El problema**
> "Soy cliente de una taquería en la CDMX que vende mucho. Pasa esto: el cliente llega queriendo pagar con tarjeta, y el cajero solamente le puede vender en efectivo. Se pierden ventas. No pongo una cifra porque nadie la ha medido; lo cuento como cliente."

**0:20–0:40 · La idea**
> "Tócale: tocas una tarjeta NFC, escribes tu celular y pagas con CoDi desde la app de tu banco. El cajero ve 'pagado' sin terminal y sin revisar comprobantes. CoDi no le cobra comisión ni a quien paga ni a quien cobra, y todo pasa por la API de pey."

**0:40–2:00 · Demo en 3 pasos**
1. **El cajero dicta.** En la Caja: "cuatro de pastor con todo y una horchata". La IA de OpenAI lo convierte en productos del menú; los precios los pone el código. Toca "Crear cobro" y graba el pedido en la tarjeta (o muestra el QR).
   > "La IA entiende cómo pide la gente; el dinero nunca lo decide la IA."
2. **El cliente toca y paga.** Acerca su celular a la tarjeta, ve su pedido, escribe su número y le llega la solicitud de pago de CoDi en su banco. La autoriza.
   > "Su número solo se usa para mandarle la solicitud; no lo guardamos."
3. **Pagado.** Las dos pantallas cambian a "Pagado", porque pey lo confirma, no porque alguien enseñe una captura.
   > Solo si el cobro es real: "Esto fue un cobro real en producción, de un peso, con la cuenta de prueba de pey."

**2:00–2:35 · Qué gana pey**
> "Cada puesto que hoy solo acepta efectivo puede empezar a cobrar con CoDi por la API de pey con un celular y una tarjeta NFC, sin terminal. En el flujo usamos lo que pey ofrece: solicitud de pago al celular, QR CoDi de respaldo, consulta de transacciones y webhooks firmados. Y le dejamos retroalimentación concreta: nos hizo falta un aviso de solicitud rechazada o vencida, cancelar un cobro y un límite de peticiones publicado."

**2:35–3:00 · Ley y cierre**
> "La nueva ley de pagos digitales dice que los comercios 'podrán implementar' pagos digitales; la obligación será solo para los sectores que defina la SHCP. Tócale es adopción voluntaria: prepara a un negocio de puro efectivo desde hoy. Es bien público: cualquier puesto de efectivo de México, no solo esta taquería. Tócale: toca y paga."

## Qué es real y qué no

| Parte | Cómo decirlo |
|---|---|
| Cobro con pey | Real **solo** si hay llaves y la prueba quedó anotada; si no, "SIMULACIÓN" (la pantalla lo dice) |
| IA de OpenAI | Real si `/api/salud` dice `ia: true`; si no, "interpretación básica sin IA" |
| Taquería y menú | Ficticios: "Taquería El Ejemplo", precios de ejemplo |
| Tarjeta NFC | Real solo si se compró y se grabó; si no, "la misma liga va en QR" |
| Dinero de la demo | Va a la cuenta de prueba de pey y no se devuelve (K03.3) |

No digas que pey o Banxico patrocinan o avalan el proyecto ([`pey/12`](../pey/12-recursos-de-marca.md)), ni que aceptar pagos digitales ya es obligatorio (K00.4).

## Si algo falla

| Falla | Frase | Qué haces |
|---|---|---|
| La solicitud no llega al celular | "Eso depende del banco de quien paga; para eso está el respaldo." | "Mostrar QR CoDi" en la Caja y el cliente lo escanea con su banco |
| pey no responde | "La app no marca pagado sin confirmación de pey; por eso dice 'no se puede verificar'." | Mostrar el video de respaldo |
| La IA falla | "Sin IA, el cajero arma el pedido con botones; los precios siempre los pone el código." | Botones del menú |
| La tarjeta no lee | "La misma liga va en el QR." | Escanear el QR con la cámara |
| Sin internet | "Les muestro el mismo flujo grabado hoy." | Video de respaldo |
| Está en SIMULACIÓN | "Esto corre en SIMULACIÓN, como dice la pantalla; el cobro real está anotado en la bitácora." (solo si lo está) | Seguir la demo |

## Preguntas probables (respuestas de 20 segundos, K08.7)

- **¿Es real o simulado?** Decir exactamente qué se probó y cuándo, con el `transactionId` de `BITACORA.md`. Si no hubo cobro real: "Hoy está en SIMULACIÓN rotulada; el código llama a pey con las rutas documentadas".
- **¿Por qué CoDi y no tarjeta?** Sin comisión para nadie, sin terminal y el dinero llega directo a la cuenta ([`codi/01`](../codi/01-que-es-codi.md)).
- **¿Y si el cliente no tiene CoDi?** Necesita la app de su banco con CoDi y una cuenta validada ([`codi/04`](../codi/04-como-paga-y-cobra-una-persona.md)); qué bancos reciben la solicitud no está verificado (⚪), por eso hay QR de respaldo.
- **¿Cómo evitas que la IA invente montos?** La IA solo elige productos del menú; el servidor calcula el total, firma el pedido y pone un monto máximo.
- **¿Qué hizo la IA de código y qué decidiste tú?** José definió el problema, trajo la idea de las tarjetas NFC y la solicitud al celular, y decidió el alcance; Claude Code (con agentes en paralelo) escribió el código, las pruebas y la documentación. Todo está en los commits con hora y en `BITACORA.md`.
- **¿Dónde viven las llaves y los datos?** Las llaves solo en el servidor (Vercel); el celular del cliente no se guarda.
- **¿Qué pasa si falla el webhook?** El estado también se consulta directo a pey; el webhook verifica la firma y queda listo para guardar eventos.
- **¿Qué sigue?** Base de datos, tarjeta fija por mesa y probar con un negocio real.
