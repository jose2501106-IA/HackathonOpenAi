// "Ticket" de cobro: el pedido firmado por el servidor (HMAC-SHA256), sin base de datos.
// El navegador lo guarda y lo regresa en /api/estado y /api/revisar; así el servidor sabe qué monto esperar
// y nadie puede cambiarlo desde el navegador (lo pidió la revisión del 7-nov: validar monto contra el pedido).

import { createHmac, timingSafeEqual } from "node:crypto";
import { ErrorApp } from "./http.js";

const b64url = (buf) => Buffer.from(buf).toString("base64url");

export function firmarTicket(datos, secreto) {
  const cuerpo = b64url(JSON.stringify(datos));
  const firma = createHmac("sha256", secreto).update(cuerpo).digest("base64url");
  return `${cuerpo}.${firma}`;
}

export function leerTicket(ticket, secreto) {
  if (typeof ticket !== "string" || !ticket.includes(".")) {
    throw new ErrorApp("TICKET_INVALIDO", "No reconozco este cobro. Genera uno nuevo.", 400);
  }
  const [cuerpo, firma] = ticket.split(".");
  const esperada = createHmac("sha256", secreto).update(cuerpo).digest();
  let recibida;
  try {
    recibida = Buffer.from(firma, "base64url");
  } catch {
    recibida = Buffer.alloc(0);
  }
  if (recibida.length !== esperada.length || !timingSafeEqual(recibida, esperada)) {
    throw new ErrorApp("TICKET_INVALIDO", "No reconozco este cobro. Genera uno nuevo.", 400);
  }
  try {
    return JSON.parse(Buffer.from(cuerpo, "base64url").toString("utf8"));
  } catch {
    throw new ErrorApp("TICKET_INVALIDO", "No reconozco este cobro. Genera uno nuevo.", 400);
  }
}
