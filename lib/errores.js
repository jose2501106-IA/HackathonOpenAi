// Error con código y estado HTTP. El mensaje se muestra tal cual en la interfaz: español de México, sin datos sensibles.
export class ErrorApp extends Error {
  constructor(codigo, mensaje, status = 400) {
    super(mensaje);
    this.name = "ErrorApp";
    this.codigo = codigo;
    this.status = status;
  }
}
