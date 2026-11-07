---
titulo: "Primeros pasos: perfil, cuenta de pago, API key y prueba en producción"
resumen: "Cómo darse de alta en portal.mipey.mx, qué cuentas de pago existen (codi y stripe), cómo crear la API key, cuánto tarda la CLABE y cómo probar sin sandbox."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key
  - https://docs.pey.mx/docs/api/codi-api
  - https://docs.pey.mx/
---

# 02 · Primeros pasos: cuenta, llaves y prueba

## El portal

Todo el alta pasa en **portal.mipey.mx**:

| Sección del portal | URL | Para qué |
|---|---|---|
| Inicio / perfil | https://portal.mipey.mx/ | Crear tu perfil |
| Finanzas | https://portal.mipey.mx/finance | Crear cuentas de pago |
| Desarrollador | https://portal.mipey.mx/developers | Crear API keys, configurar el webhook y ver sus registros |

⚪ La guía no dice qué datos pide el perfil (correo, RFC, identificación…).

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

## Paso 1 · Crea un perfil

Entra a portal.mipey.mx y crea tu perfil. Si ya tienes uno, sáltate este paso.

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

## Paso 2 · Agrega una cuenta de pago

En **Finanzas** creas una cuenta de pago. Hay dos tipos:

| Tipo | Qué recibe | Cómo se da de alta |
|---|---|---|
| `codi` | Pagos CoDi® | Capturas directamente los datos de tu cuenta bancaria existente. Solo cuentas bancarias mexicanas. |
| `stripe` | Tarjetas, Apple Pay y Google Pay | Agregas tus datos bancarios por medio de la integración con Stripe. |

- **Tiempo:** el registro de una cuenta bancaria ante Banxico tarda **5 días hábiles** (la referencia de tipos dice "hasta 5 días hábiles").
- **Alternativa por API:** puedes registrar y consultar cuentas con `POST /bank-account` y `GET /bank-account/{id}`, y mandar su `id` como `bankAccountId` al crear un QR o una push. Ver [05](05-api-cuentas-bancarias.md).

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [pey: tipo Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account) · consultado 2026-11-07

## Paso 3 · Crea una API key

1. Con la cuenta de pago lista, entra a **Desarrollador** (menú lateral del portal).
2. Da clic en **"Crear API Key"** y ponle un nombre.
3. Vincula una de tus cuentas de pago ya creadas.

Reglas: cada llave puede tener **una cuenta `codi` y una `stripe` al mismo tiempo**, y necesita **al menos una**. La cuenta `codi` vinculada es la que recibe los cobros CoDi cuando no mandas `bankAccountId`.

⚪ No documentado: si la llave se muestra una sola vez, si caduca, si hay permisos por llave o cuántas llaves puedes tener. Cópiala al crearla y guárdala como secreto del servidor.

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Prueba en producción y cuenta de prueba

- **No hay sandbox.** pey dice que tendrá un entorno de pruebas dedicado "pronto"; mientras, recomienda probar en producción con bancos, notificaciones CoDi y webhooks reales, usando montos pequeños como **$0.01 MXN**.
- **Cuenta de prueba:** la guía publica una cuenta bancaria de prueba (CLABE y titular) **dentro del paso "2. Agrega una cuenta de pago"**, en el texto destacado "Comienza a probar de inmediato". La sección "Prueba en producción" solo la menciona y enlaza de regreso a ese paso. Se activa **de inmediato**, así que puedes probar el mismo día mientras se activa tu CLABE. **Lo que se le pague no se devuelve.**
- Por privacidad, esta carpeta **no copia** la CLABE ni el nombre del titular: tómalos del [paso 2 oficial](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago).
- Orden completo del tutorial, con sus avisos: [14](14-tutoriales-paso-a-paso.md).

Fuente: [pey: Crear una API key, paso 2](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago) · [pey: Crear una API key, Prueba en producción](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#test-in-production) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · consultado 2026-11-07

## Entornos

| Entorno | API | Portal |
|---|---|---|
| Producción | `https://api.pey.mx` | `portal.mipey.mx` |
| Pruebas | Próximamente | Próximamente |

El esquema de seguridad del OpenAPI se llama `dev-PublicApiLambdaAuthorizer`, pero el único servidor declarado es producción; no deduzcas un entorno "dev" de ese nombre. Sobre las llaves de prueba que menciona la página comercial, ver la contradicción en [01](01-que-es-pey-y-codi.md).

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Lista para un agente (Recomendación)

1. La llave y el secreto del webhook van solo en variables de entorno del servidor (en este repo: `PEY_API_KEY` y `PEY_WEBHOOK_SECRET`). Nunca en el navegador, el repo ni los logs.
2. Prueba de humo con 1 centavo (ejemplo propio; espera HTTP 201 con `id` y `qrString`):

```bash
curl -sS https://api.pey.mx/codi/qr \
  -H "Authorization: Bearer $PEY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"amount":0.01,"concept":"Prueba de humo","expiration":600,"numRef":"42"}'
```

3. Convierte `qrString` en QR, págalo desde la app de tu banco y confirma con `GET /transaction/codi/qr/{id}` ([07](07-api-transacciones.md)) o con el webhook ([09](09-webhooks.md)).
4. Mientras uses la cuenta de prueba, pon un tope de monto bajo en tu servidor: ese dinero no regresa.

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07
