// ¿Ya cayó? Resuelve el estado de un cobro a partir de su ticket firmado (docs/CONTRATO-API.md, GET /api/estado).
// pey es la fuente de verdad; el ticket dice qué monto esperar (docs/REVISION-PEY-2026-11-07.md).
// Nunca lanza por errores de pey: un 404 o una falla de red NO prueban que no pagaron → no_verificable.
import { aCentavos, aPesos } from "./http.js";
import { consultarPagosQr, PeyError } from "./pey.js";

const TOLERANCIA_CENTAVOS = 1;

function aIso(valor) {
  if (valor == null || valor === "") return null;
  const n = Number(valor);
  if (Number.isFinite(n)) {
    if (n <= 0) return null;
    return new Date(n > 1e12 ? n : n * 1000).toISOString(); // pey usa segundos Unix (K03.5)
  }
  const t = Date.parse(valor);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

export async function resolverEstado(ticketDatos, cfg, ahora = Date.now()) {
  const t = ticketDatos || {};
  const base = {
    id: t.id ?? null,
    estado: "pendiente",
    monto: aPesos(Number(t.montoCentavos) || 0),
    pagadoEn: null,
    transactionId: null,
    aviso: null,
    modoPago: t.modoPago ?? null,
  };

  // SIMULACIÓN: no se llama a pey. Pagado solo si /api/simular-pago firmó simPagadoEn en el ticket;
  // si no, vence igual que un cobro real para que la pantalla y el estado digan lo mismo.
  if (t.modoPago === "simulacion") {
    if (t.simPagadoEn) return { ...base, estado: "pagado", pagadoEn: aIso(t.simPagadoEn) };
    const vence = Date.parse(t.expiraEn);
    return Number.isFinite(vence) && ahora > vence ? { ...base, estado: "expirado" } : base;
  }

  // prueba / comercio: siempre se consulta a pey primero (un pago tardío gana al vencimiento).
  let items;
  try {
    items = await consultarPagosQr(t.id, cfg);
  } catch (e) {
    if (e instanceof PeyError && e.status === 404) {
      return { ...base, estado: "no_verificable", aviso: "qr_no_encontrado_con_esta_llave" };
    }
    // Red, 5xx y cualquier otra falla: el contrato solo define estos dos avisos.
    if (!(e instanceof PeyError)) console.error("estado_error", e?.name || "Error");
    return { ...base, estado: "no_verificable", aviso: "pey_no_responde" };
  }

  const pagados = items.filter((p) => p?.status === "PAID");
  const coincide = pagados.find(
    (p) =>
      (p.currency ?? "MXN") === "MXN" &&
      Math.abs(aCentavos(p.amount) - Number(t.montoCentavos)) <= TOLERANCIA_CENTAVOS,
  );
  if (coincide) {
    return { ...base, estado: "pagado", pagadoEn: aIso(coincide.datePaid), transactionId: coincide.id ?? null };
  }
  // Hay un pago, pero no por el monto del pedido: no se entrega, se avisa.
  if (pagados.length) return { ...base, aviso: "pago_con_monto_distinto" };

  const expira = Date.parse(t.expiraEn);
  if (Number.isFinite(expira) && ahora > expira) return { ...base, estado: "expirado" };
  return base;
}
