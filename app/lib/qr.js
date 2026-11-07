// Imágenes de QR como data URL PNG. pey puede regresar qrImage en null: entonces se genera desde qrString (K03.4).
import QRCode from "qrcode";

/** Texto → "data:image/png;base64,…" */
export async function imagenQr(texto) {
  // Margen por defecto (4 módulos) y corrección M: lo más seguro para que lo lea la app del banco.
  return QRCode.toDataURL(String(texto), { errorCorrectionLevel: "M", width: 480 });
}

/** qrImage de pey (base64 sin prefijo, o ya data URL) → data URL. null/vacío → null. */
export function normalizarQrImage(qrImageBase64) {
  if (!qrImageBase64) return null;
  const limpio = String(qrImageBase64).replace(/\s+/g, "");
  if (!limpio) return null;
  return limpio.startsWith("data:") ? limpio : `data:image/png;base64,${limpio}`;
}
