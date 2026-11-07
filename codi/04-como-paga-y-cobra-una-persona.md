# 04 · Cómo paga (y cómo cobra) una persona, paso a paso

> Redacción propia, consultada el 2026-11-07. Los menús cambian por banco: estos son los pasos genéricos del sitio oficial. Los ejemplos usan datos ficticios.

## Antes del primer pago: activar CoDi

- La persona necesita la app de su banco con CoDi y una cuenta de depósito validada.
- Para validar la cuenta se puede registrar la **CLABE** (18 dígitos), el número de **tarjeta de débito** (16 dígitos) o el **número celular** asociado a la cuenta.
- Si la app tiene CoDi pero no deja usarlo, hay que llamar al banco.
- ⚪ Cada banco valida a su manera. K03.1 cita una nota de prensa sobre bancos que validan con un depósito de un centavo y un SMS ([K03](../conocimiento/03-codi-y-api-pey.md)).

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · consultado 2026-11-07

## Pagar con QR

1. Abrir la app del banco → CoDi → **pagar**.
2. **Escanear** el QR o **importarlo** de la galería.
3. **Revisar** los datos del cobro. Si el QR no trae monto, escribir la cantidad.
4. **Autorizar** con NIP, huella o token.
5. La persona que paga y la que cobra reciben una **notificación** de confirmación.

*Ejemplo ficticio:* la tiendita "Abarrotes La Esquina" muestra un QR de $37.50 con el concepto "2 refrescos". La clienta lo escanea, ve el monto y el nombre del comercio, pone su huella y las dos pantallas muestran "Pago realizado".

Fuente: [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · consultado 2026-11-07

## Pagar por notificación (a distancia)

1. Dar el **número celular** a quien va a cobrar.
2. Tocar la **notificación** que llega; abre la app del banco.
3. Revisar los datos y **autorizar** con NIP, huella o token.
4. Las dos partes reciben la confirmación.

Banxico tiene un PDF con este caso: "Paga con CoDi® a distancia desde tu institución financiera". ⚪ No lo abrí.

Fuente: [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · [Banco de México: Paga con CoDi® a distancia (PDF)](https://www.banxico.org.mx/sistemas-de-pago/d/%7B650AD156-3CCC-C2CC-8278-B6F50804B691%7D.pdf) · consultado 2026-11-07

## Cobrar desde la app del banco

- **Por QR:** CoDi → **cobrar** → datos del cobro → generar QR. Sin monto, el QR se puede imprimir o compartir como imagen y usar varias veces.
- **Por notificación:** CoDi → cobrar → datos del cobro → **número celular** de quien paga. Esa persona recibe la notificación y autoriza.

Fuente: [codi.org.mx: CoDi® para cobrar](https://www.codi.org.mx/secundarias/cobrar.html) · [Banco de México: Cobra con CoDi® desde tu institución financiera (PDF)](https://www.banxico.org.mx/sistemas-de-pago/d/%7B81FB2D16-65D3-E5E0-A677-645B5432A7E0%7D.pdf) · consultado 2026-11-07

## Cobrar con la app CoDi® Banxico

1. Descargar la app.
2. Registrar la cuenta donde llegarán los pagos (CLABE, tarjeta de débito o celular) y esperar el aviso de validación.
3. Capturar los datos del cobro, con monto o con la opción **"sin monto"**.
4. Mostrar el QR o enviarlo al celular de quien paga.
5. Quien paga revisa y autoriza; las dos partes reciben la confirmación.

La app permite cobrar desde **uno o varios teléfonos** ligados a la misma cuenta, y solo el titular controla los ingresos.

Fuente: [codi.org.mx: CoDi® para cobrar](https://www.codi.org.mx/secundarias/cobrar.html) · [Banco de México: Cobra con la app CoDi® Banxico (PDF)](https://www.banxico.org.mx/sistemas-de-pago/d/%7B02A0AA3D-449C-CD59-7C4D-6D6131002AD3%7D.pdf) · consultado 2026-11-07

## Qué cambia cuando el cobro sale de un producto hecho con pey

- La persona hace exactamente los mismos pasos: escanea el QR que muestra tu app o toca la notificación que manda pey.
- Tu app **no ve** el NIP ni los datos bancarios de quien paga. Sabes que pagó cuando pey reporta `PAID` o llega el webhook firmado.
- **Recomendación de UX:** pon el monto y el concepto en grande junto al QR, un contador de vigencia y el texto "Paga desde la app de tu banco, en la opción CoDi". Detalle técnico en [pey/10](../pey/10-tutorial-mostrar-qr-codi.md).

Fuente: [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · [pey: documentación en Markdown](../pey/README.md) · consultado 2026-11-07
