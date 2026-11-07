import crypto from "node:crypto";

// Compara dos textos sin filtrar por tiempo cuánto coinciden.
export function iguales(a, b) {
  const x = Buffer.from(String(a ?? ""));
  const y = Buffer.from(String(b ?? ""));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
