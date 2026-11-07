# Guion del pitch · ¿Ya cayó?

> 3 minutos, menos de 400 palabras. Demo en el **dominio de producción** con el modo visible en pantalla. Cronómetro a la vista: si a los 2:00 no terminó la demo, salta al cierre. Base: K09.1–K09.3 y `docs/PRD.md`.

| Tiempo | Segmento | Pantalla | Criterio (K08.3) |
|---|---|---|---|
| 0:00–0:20 | Gancho | Diapositivas 1–2 | C1 |
| 0:20–0:45 | Solución y por qué ahora | 3 | C1, C4 |
| 0:45–2:00 | Demo en vivo de 3 pasos | La app | C2, C3 |
| 2:00–2:30 | Cómo lo construí | 5 | C3, C5 |
| 2:30–3:00 | Bien público y cierre | 6–7 | C1, C5 |

## 0:00–0:20 · Gancho
> "Pensemos, como ejemplo, en una dulcería de barrio. Un cliente se lleva sus dulces, enseña el celular y dice: 'ya te transferí'. ¿Entrega o no entrega? Una captura se fabrica en segundos y circulan plantillas de comprobantes falsos. Y el fraude digital crece: según Condusef, 2.48 millones de reclamaciones por posible fraude en el primer semestre de 2025."

## 0:20–0:45 · Solución y por qué ahora
> "**¿Ya cayó?** es una caja de cobro CoDi que nunca acepta una captura como pago. La IA de OpenAI entiende lo que vendiste y lee la captura que te enseñan, pero quien decide es el dinero: pey nos dice si de verdad llegó. Sin comisión. Y es el momento: la Ley de Economía Digital, firmada el 4 de noviembre, reconoce los pagos con QR."

## 0:45–2:00 · Demo (3 pasos)
| Paso | Haces | Dices |
|---|---|---|
| 1 · Cobra con sus palabras | Tocas "Cóbrale un dulce de tamarindo" → "Confirmar y generar QR" | "No llena formularios: dice lo que vendió. La IA propone, yo confirmo, y pey genera el QR CoDi de un peso." |
| 2 · La captura no es dinero | "Revisar una captura" → "Usar captura de ejemplo" | "El cliente me enseña su captura. La IA la lee: un peso, 13:58, clave de rastreo. Pero pey dice que no ha llegado nada: **Todavía no cae, no entregues**. La IA lee; el código decide; y nunca acusamos a nadie." |
| 3 · ¡Ya cayó! | Pagas $1 desde la app de tu banco (en SIMULACIÓN: "Simular pago (demo)") | "Ahora sí pago un peso real… **¡Ya cayó!** Confirmado por pey, no por una captura." |

Si la pantalla dice **SIMULACIÓN**, dilo antes del paso 1: "Hoy la demo está en modo simulación; lo dice la pantalla. Con la llave de pey, el mismo flujo cobra de verdad."

## 2:00–2:30 · Cómo lo construí
> "Lo construí hoy con agentes de programación: primero escribí un contrato de API y las reglas; luego tres agentes trabajaron en paralelo —pagos, IA e interfaz— con 89 pruebas automáticas, y Codex revisó la documentación de pey y la ley. Tres decisiones: la IA solo lee y propone; nada se cobra sin confirmar; y el pago lo confirma pey, nunca una imagen."

## 2:30–3:00 · Bien público y cierre
> "Es bien público: cobrar con CoDi cuesta cero —con tarjeta, una miscelánea paga hasta 3.95 % por cobro, según Banxico— y protege a quien menos puede perder. El 14 de diciembre todas las apps bancarias deben procesar cobros CoDi con el mismo estándar. Siguiente paso: un piloto con comercios de barrio y llevarlo al Hackatón México. Está en vivo: escaneen el QR. Gracias."

**Tarjeta de memoria:** `Dulcería · "ya te transferí" · 2.48 M` → `Captura no es dinero · pey decide · ley 4-nov` → `Tamarindo · captura · ¡ya cayó!` → `Contrato · 3 agentes · 3 decisiones` → `Cero comisión · 14 dic · piloto · QR`.

## Versión de 1 minuto
> "Una captura de 'ya te transferí' no es dinero, pero en los puestos de barrio se acepta todos los días. **¿Ya cayó?** cobra con CoDi sin comisión: dices 'cóbrale un dulce de tamarindo', la IA de OpenAI arma el cobro y tú confirmas. Si te enseñan una captura, la IA la lee y pey dice si el dinero llegó: 'todavía no cae, no entregues'. Cuando el pago entra, '¡ya cayó!', confirmado por pey. La IA lee, el código decide y nadie es acusado. Llega con la Ley de Economía Digital recién firmada. Está en vivo: escaneen el QR."

## Preguntas probables (20–30 s cada una)
1. **¿Cómo sabes que la captura es falsa?** No lo afirmamos. Comparamos con el dinero que de verdad llegó según pey; si no llegó, "todavía no cae". Nunca decimos "falso".
2. **¿Qué hace la IA que un formulario no?** Entiende "cóbrale 85 de dos tacos" y lee capturas de cualquier banco. No decide pagos: el veredicto lo calcula el código con los datos de pey.
3. **¿Es real o simulado?** Lo dice la pantalla: SIMULACIÓN sin llaves; MODO PRUEBA con pey (dinero real de $1, que no se devuelve).
4. **¿Y si falla pey o el internet?** La app dice "no se puede verificar ahora" y nunca muestra "¡Ya cayó!" sin confirmación.
5. **¿Qué datos guardan?** Ninguno: no hay base de datos; la imagen se analiza y se descarta; las llaves viven solo en el servidor.
6. **¿Qué hizo la IA y qué hiciste tú?** Yo elegí el problema, escribí el contrato y las reglas (confirmación humana, nunca "falso", tope de monto), revisé y probé; los agentes escribieron el código. El historial de git tiene la hora de cada paso.
7. **¿Por qué CoDi y no tarjeta?** Cero comisión contra hasta 3.95 % con débito (Banxico, jul-2026) y el dinero llega en segundos.
8. **¿Cuánto cuesta operar?** pey es gratis por ahora y CoDi no cobra comisión; el costo de la IA lo mido en el panel de uso de OpenAI (⚪ no medido todavía).
9. **¿La ley obliga a cobrar con QR?** No afirmamos una fecha obligatoria: la ley ya está firmada y reconoce el QR; Hacienda define en semanas a qué sectores aplica. El plazo del 14 de diciembre es de Banxico para las apps bancarias.

Fuentes de los datos: Condusef vía Vanguardia [SD38]; comprobantes falsos [SD41]; comisiones con débito, Banxico jul-2026 [SD24]; Ley de Economía Digital [SD64]; plazo del 14-dic [K06.5]. Detalle en `fuentes/REGISTRO.md`.
