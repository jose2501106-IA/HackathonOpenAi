# PRD · ¿Ya cayó? — la captura no es dinero

Fecha: 7-nov-2026. Base: K07.3 (PRD completo), K00, `docs/REVISION-PEY-2026-11-07.md` y lo dicho en el kickoff: **solución creativa, de la mano de la nueva ley de pagos digitales, una aplicación de un servicio que integre la API de pey con CoDi**.

## Problema
Un puesto de barrio cobra montos chicos con fila. El cliente dice "ya te transferí" y enseña una captura; el comerciante no puede revisar su banco y entrega. Las capturas se falsifican o se revierten: hubo 2.48 millones de reclamaciones por posible fraude en un semestre (Condusef, K06.6 [SD38]). Además, cobrar con tarjeta cuesta hasta 3.95 % (K06.3 [SD24]) y CoDi cobra 0 %, pero casi nadie lo usa (K06.4).

**Por qué ahora:** la Ley de Economía Digital (decreto firmado el 4-nov-2026) impulsa el cobro con QR y transferencias, y Banxico obliga a homologar transferencias y cobros CoDi antes del 14-dic-2026 (K06.5). Más cobros digitales = más capturas en el mostrador.

## Frase de valor
"La captura no es dinero: cobra con QR CoDi sin comisión y deja que pey, no una foto, te diga si ya cayó."

## Usuario
Comerciante de barrio o de mercado (tianguis, fondita, dulcería) que cobra desde su celular. Servicio: **caja de cobro CoDi con verificación del pago**.

## Demo de 3 pasos (≤ 80 s)
1. **Cobrar:** "Cóbrale un dulce de tamarindo" → la IA propone $1.00 → **Confirmar y generar QR** → QR CoDi grande + modo de pago visible.
2. **La captura:** "Revisar una captura" → captura de ejemplo (ficticia) → la IA lee monto, hora y clave → **"Todavía no cae: no entregues."**
3. **¡Ya cayó!:** la clienta paga con la app de su banco → en segundos **"¡Ya cayó! $1.00, confirmado por pey"** en pantalla, con vibración y voz.

## Alcance
- **Sí:** pedido por texto, dictado (Web Speech, si el navegador lo permite) o ejemplo → propuesta de la IA → confirmación → QR CoDi (pey) → estado cada 2 s → "¡Ya cayó!" con voz; botón "¿Ya cayó?"; "Revisar una captura" con lectura de IA y veredicto decidido por código; monto manual si la IA no está; modos SIMULACIÓN / MODO PRUEBA siempre visibles; tope `MAX_MONTO_MXN=20`.
- **Debería:** "¿Cuánto vendí hoy?" con pagos recientes de pey.
- **No:** cuentas de usuario, base de datos, varios comercios, devoluciones, guardar imágenes, decir "es falso".

## Arquitectura
HTML/CSS/JS sin build + Vercel Functions. Contrato exacto: `docs/CONTRATO-API.md`. Pedido firmado (ticket HMAC) en vez de base de datos: el servidor valida que el pago coincida con el monto del pedido.

## Criterios de aceptación de la demo
- [ ] Sin ninguna llave, los 3 pasos funcionan en **SIMULACIÓN** con la etiqueta visible.
- [ ] Con `PEY_API_KEY` (cuenta de prueba), un QR real de $0.01–$1 se paga desde un banco y la app dice "¡Ya cayó!" en menos de 10 s.
- [ ] La captura de ejemplo con cobro pendiente da "Todavía no cae", aunque diga el mismo monto.
- [ ] Ninguna llave en el navegador, el repo ni los logs; webhook con firma verificada.
- [ ] `npm test --prefix app` pasa.
