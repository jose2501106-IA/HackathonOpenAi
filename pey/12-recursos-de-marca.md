---
titulo: "Recursos de marca de pey y CoDi"
resumen: "Todo lo que publica la página oficial de recursos de marca: cinco archivos con nombre, formato y URL de descarga, la versión en inglés y la única regla publicada. También lo que no publica (colores, tipografía, área de respeto, tamaño mínimo, usos prohibidos) y una guía propia para el hackatón."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/brand-assets
  - https://docs.pey.mx/en/brand-assets
  - https://pey.mx/api-codi
---

# 12 · Recursos de marca

## La página

- **URL:** https://docs.pey.mx/brand-assets, con el título "Recursos de marca" y enlace en el menú superior de la documentación. Versión en inglés: https://docs.pey.mx/en/brand-assets ("Brand assets").
- **Para qué es:** ofrece los logotipos oficiales de pey y de CoDi para usarlos en tu integración: checkout, app o documentación.
- **Única indicación de uso:** descarga los archivos **en lugar de recrearlos**.
- Pie de la página: "Copyright © 2026 Koshi SA de CV".

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · consultado 2026-11-07

## Archivos oficiales (5)

| Nombre en la página | Archivo | Formato | Descarga oficial |
|---|---|---|---|
| Logotipo pey - azul | `pey_blue.svg` | SVG | https://docs.pey.mx/img/design/pey_blue.svg |
| Logotipo pey - blanco | `pey-logo-blanco.svg` | SVG | https://docs.pey.mx/img/design/pey-logo-blanco.svg |
| pey + CoDi - fondo claro | `pey_codi_light.svg` | SVG | https://docs.pey.mx/img/design/pey_codi_light.svg |
| pey + CoDi - fondo oscuro | `pey_codi_dark.svg` | SVG | https://docs.pey.mx/img/design/pey_codi_dark.svg |
| Animación de pago CoDi | `loading_codi.gif` | GIF | https://docs.pey.mx/img/design/loading_codi.gif |

- Solo los dos logos combinados dicen para qué fondo son (claro u oscuro). Para el logo de pey solo, la página dice el color (azul o blanco), no el fondo.
- La vista previa de la animación en la página usa `loading_codi_preview.gif` (https://docs.pey.mx/img/design/loading_codi_preview.gif); el botón de descarga apunta a `loading_codi.gif`.
- No hay PNG, PDF ni ZIP: solo cuatro SVG y un GIF.
- Esta carpeta **no guarda copias** de los archivos: enlaza los oficiales.
- ⚪ No pude leer el interior de los SVG (colores exactos y proporciones): el lector web dio error al abrirlos el 2026-11-07 y el proxy de este entorno bloquea `curl` a docs.pey.mx.

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · consultado 2026-11-07

## Versión en inglés

Tiene los mismos cinco recursos: "pey logo - blue", "pey logo - white", "pey + CoDi - light background", "pey + CoDi - dark background" y "CoDi payment animation". Sus botones de descarga apuntan a `/en/img/design/<mismo archivo>` (por ejemplo, https://docs.pey.mx/en/img/design/pey_blue.svg). ⚪ No verifiqué que las rutas con `/en/` descarguen: usa las de la página en español. Tampoco publica reglas, colores ni tipografía.

Fuente: [pey: Brand assets (inglés)](https://docs.pey.mx/en/brand-assets) · consultado 2026-11-07

## Lo que la página no publica (⚪)

Revisado en español y en inglés el 2026-11-07:

- **Colores:** no hay paleta (ni hex, RGB, CMYK o Pantone). Solo aparecen las palabras "azul" y "blanco" en los nombres.
- **Tipografía:** no se menciona.
- **Área de respeto y tamaño mínimo:** no se mencionan.
- **Usos permitidos y prohibidos:** no hay lista (deformar, recolorear, rotar, efectos, fondos con poco contraste).
- **Aviso legal o licencia:** no hay aviso de marcas, licencia ni reglas para poner el logo junto a otra marca.
- **Marca CoDi® de Banxico:** la página no da reglas propias de CoDi; ⚪ no consulté si Banxico publica un manual de uso.
- pey.mx usa además `https://pey.mx/pey.svg` y `https://pey.mx/pey-white.svg` en su sitio. No aparecen en la página de recursos (⚪ no están confirmados como recursos para terceros).

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · [pey: Brand assets (inglés)](https://docs.pey.mx/en/brand-assets) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

## Guía propia para el producto (Recomendación, no es regla de pey)

**Permitido según la página:** usar estos cinco archivos oficiales en el checkout, la app o la documentación, descargados y sin recrearlos.

**Recomendaciones:**
1. En la pantalla de cobro con fondo claro usa `pey_codi_light.svg`; con fondo oscuro, `pey_codi_dark.svg`. Si solo va pey: el azul sobre fondo claro y el blanco sobre fondo oscuro.
2. Usa los SVG tal cual: sin deformar, recolorear, recortar, rotar ni agregar sombras, y escálalos de forma proporcional.
3. Mientras esperas la confirmación del pago, `loading_codi.gif` encaja con su nombre ("Animación de pago CoDi"). Acompáñalo de texto ("Esperando tu pago…") y ofrece una alternativa sin movimiento para quien tiene activado `prefers-reduced-motion`.
4. Pon texto alternativo en español, por ejemplo `alt="pey y CoDi"`.
5. No inventes un "azul pey" en hex para botones: no está publicado (⚪). Usa tu propia paleta con contraste AA.
6. No des a entender que pey o Banxico patrocinan o avalan el proyecto. En textos formales escribe "pey®" y "CoDi®", como lo hace pey en su sitio.

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07
