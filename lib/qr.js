import QRCode from "qrcode";

// SVG del QR para la liga del pedido o para el qrString de CoDi.
export function qrSvg(texto) {
  return QRCode.toString(texto, { type: "svg", margin: 1, errorCorrectionLevel: "M" });
}
