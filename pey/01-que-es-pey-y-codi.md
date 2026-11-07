---
titulo: "Qué es pey y su API CoDi"
resumen: "Quién está detrás de pey, qué hace su API (CoDi con QR y push, cuentas bancarias, links de pago, transacciones), cuánto cuesta, a dónde llega el dinero y la contradicción sobre llaves de prueba."
actualizado: 2026-11-07
fuentes:
  - https://pey.mx/api-codi
  - https://docs.pey.mx/
  - https://docs.pey.mx/docs/api/codi-api
---

# 01 · Qué es pey y su API CoDi

## Quién es pey

- pey (se escribe en minúsculas, con ®) ofrece una API pública para cobrar en México con CoDi® y con tarjeta. La documentación vive en `docs.pey.mx`, en español (predeterminado) y en inglés (rutas con `/en/`).
- El pie de la documentación muestra el copyright 2026 de **Koshi SA de CV**.
- pey.mx enlaza otros productos que no son parte de la API: Restaurantes, Boletera y Personas/PyMEs (app). Aquí solo se documenta la API.
- La portada de la documentación muestra logotipos de empresas (CMR, Grupo Presidente, Office Depot, SEDECO del Gobierno de la CDMX y El Micky). ⚪ No hay detalle de qué usa cada una: no lo presentes como testimonio ni cifra.

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

## Qué hace la API

La especificación se llama **CoDi API**, versión `2026-10-20`. Según su descripción, sirve para:

| Capacidad | Endpoints | Archivo |
|---|---|---|
| Cobrar con un **QR CoDi** generado vía Banxico | `POST /codi/qr` | [04](04-api-codi-qr-y-push.md) |
| Pedir un pago con una **notificación push CoDi** al celular del cliente | `POST /codi/pn` | [04](04-api-codi-qr-y-push.md) |
| **Registrar CLABEs** para cobrar a nombre de cada cuenta | `POST /bank-account`, `GET /bank-account/{id}` | [05](05-api-cuentas-bancarias.md) |
| Crear y consultar **links de pago** (checkout alojado) | `POST /payment-link/create`, `POST /payment-link/update`, `GET /payment-link/{id}` | [06](06-api-ligas-de-pago.md) |
| Consultar **transacciones** | `GET /transaction/{id}`, `GET /transaction/api-key`, `GET /transaction/codi/qr/{id}`, `GET /transaction/bank-account/{id}` | [07](07-api-transacciones.md) |
| Recibir **webhooks** firmados | 4 eventos | [09](09-webhooks.md) |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · consultado 2026-11-07

## Dos formas de cobrar

Las dos usan **la misma API key** y **el mismo endpoint de webhooks**:

1. **CoDi®**: transferencias por la red CoDi® de Banxico, liquidadas en pesos (MXN). Puedes mostrar un QR o mandar la solicitud de pago al número de celular del cliente.
2. **Links de pago**: una página de cobro alojada por pey que acepta CoDi, tarjetas, Apple Pay y Google Pay; al terminar (o cancelar) regresa al cliente a las URL de tu sitio.

El flujo base que muestra la portada: creas el cobro (QR o push) → lo compartes con tu cliente → recibes un webhook cuando llega el pago.

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · consultado 2026-11-07

## Precio y destino del dinero

- **Precio de la API:** la documentación dice que hoy no hay cuota de alta, plan mensual ni cobro por solicitud. La página comercial lo matiza: gratis «por el momento» y «100% gratuita» en sus preguntas frecuentes. No hay tabla de precios publicada.
- **Destino del dinero:** vinculas la cuenta bancaria que ya tienes (de cualquier banco); no necesitas abrir cuenta ni monedero en pey. La tecnología no depende de una institución financiera.
- **Comisiones con tarjeta:** ⚪ no publicadas. Lo único documentado es que las transacciones traen `applicationFee` (comisión retenida por pey; puede ser `null`) y `amountBreakdown.fee` (comisión que paga quien paga) — ver [08](08-tipos-de-datos.md).

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [pey: API CoDi®](https://pey.mx/api-codi) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Lo que promete la página comercial

pey.mx/api-codi presenta la API para empresas y equipos de desarrollo con cinco atributos: funciona con cualquier banco; sin costo por ahora; autoservicio (creas tus llaves sin esperar a que pey te contacte); infraestructura en la nube; y webhooks REST firmados con Standard Webhooks.

Sus tres pasos: preparar el acceso (guía del portal y una API key), conectar tu sistema (implementar las peticiones) y configurar webhooks (registrar la URL y validar firmas con el secreto). Enlaza a dos guías: [Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/) y [Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/).

Contacto comercial para la API: [formulario con servicio "api-codi"](https://pey.mx/contacto?servicio=api-codi); la página también tiene un botón de WhatsApp (número no copiado aquí).

Fuente: [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

## Contradicción: ¿hay llaves de prueba?

| Fuente | Qué dice |
|---|---|
| Página comercial (pey.mx/api-codi) | En sus preguntas frecuentes afirma que la documentación distingue llaves de prueba (desarrollo) y llaves productivas; su paso 1 habla de crear una API key "para el ambiente de desarrollo". |
| Documentación técnica (docs.pey.mx) | Solo existe producción (`https://api.pey.mx`); el entorno de pruebas aparece como "Próximamente" y recomienda probar en producción con montos pequeños como $0.01 MXN. La guía para crear llaves no menciona llaves de prueba. |

**Cómo actuar:** trata toda llave como productiva y todo pago como real. ⚪ Pregunta a pey si hay llaves de prueba para el hackatón. Detalle en [02](02-primeros-pasos-cuenta-llaves-y-prueba.md).

Fuente: [pey: API CoDi®](https://pey.mx/api-codi) · [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · consultado 2026-11-07
