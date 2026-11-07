#!/usr/bin/env python3
"""Recorre la demo de 3 pasos de "¿Ya cayó?" en un navegador real y guarda capturas.

Uso:  python3 scripts/demo_e2e.py [URL_BASE] [CARPETA_CAPTURAS]
      (por defecto http://localhost:3000 y docs/capturas)

Requiere Playwright para Python y Google Chrome. Funciona en SIMULACIÓN (sin llaves):
pedido → propuesta → QR → revisar captura de ejemplo → "Todavía no cae" → simular pago → "¡Ya cayó!".
Revisa además: sin desplazamiento horizontal a 360 px, botones visibles de al menos 44 px,
la insignia de modo siempre visible, la palabra "falso" nunca aparece y no hay errores en consola.
"""
import os
import re
import sys

from playwright.sync_api import expect, sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
SALIDA = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), "..", "docs", "capturas")
os.makedirs(SALIDA, exist_ok=True)
# SOLO_VISTA=1 captura solo lo que se ve en pantalla (para diapositivas); ANCHO y ALTO cambian el tamaño.
SOLO_VISTA = os.environ.get("SOLO_VISTA") == "1"
ANCHO = int(os.environ.get("ANCHO", "360"))
ALTO = int(os.environ.get("ALTO", "780"))

problemas = []


def revisar_pantalla(pagina, nombre):
    ancho = pagina.evaluate("document.documentElement.scrollWidth")
    vista = pagina.evaluate("window.innerWidth")
    if ancho > vista:
        problemas.append(f"{nombre}: desplazamiento horizontal ({ancho}px > {vista}px)")
    chicos = pagina.evaluate(
        """() => [...document.querySelectorAll('button, a.boton, [role=button], input[type=submit]')]
              .filter(b => b.offsetParent !== null)
              .map(b => ({t: (b.innerText || b.getAttribute('aria-label') || '').trim().slice(0, 30),
                          h: Math.round(b.getBoundingClientRect().height)}))
              .filter(b => b.h > 0 && b.h < 44)"""
    )
    for b in chicos:
        problemas.append(f"{nombre}: botón de {b['h']}px < 44px: «{b['t']}»")
    texto = pagina.inner_text("body")
    if re.search(r"falso", texto, re.I):
        problemas.append(f"{nombre}: aparece la palabra 'falso'")


def capturar(pagina, nombre):
    revisar_pantalla(pagina, nombre)
    ruta = os.path.join(SALIDA, f"{nombre}.png")
    pagina.screenshot(path=ruta, full_page=not SOLO_VISTA)
    print(f"✓ {nombre} → {os.path.relpath(ruta)}")


with sync_playwright() as p:
    navegador = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    contexto = navegador.new_context(
        viewport={"width": ANCHO, "height": ALTO}, device_scale_factor=2, locale="es-MX", has_touch=True, is_mobile=True
    )
    pagina = contexto.new_page()
    errores_consola = []
    pagina.on("console", lambda m: errores_consola.append(m.text) if m.type == "error" else None)
    pagina.on("pageerror", lambda e: errores_consola.append(str(e)))

    pagina.goto(BASE, wait_until="networkidle")
    expect(pagina.get_by_text(re.compile(r"SIMULACI[ÓO]N|MODO PRUEBA|COMERCIO")).first).to_be_visible(timeout=10_000)
    capturar(pagina, "01-inicio")

    # Paso 1 · pedido con sus palabras → propuesta
    pagina.get_by_text("Cóbrale un dulce de tamarindo").first.click()
    confirmar = pagina.get_by_role("button", name=re.compile(r"Confirmar y generar QR", re.I))
    try:
        expect(confirmar).to_be_visible(timeout=4_000)
    except AssertionError:
        # El ejemplo solo llenó el campo: se envía el formulario.
        pagina.get_by_role("textbox").first.press("Enter")
        expect(confirmar).to_be_visible(timeout=8_000)
    expect(pagina.get_by_text(re.compile(r"\$\s?1\.00")).first).to_be_visible()
    capturar(pagina, "02-propuesta")

    confirmar.click()
    expect(pagina.locator("img[src^='data:image/png']").first).to_be_visible(timeout=10_000)
    capturar(pagina, "03-qr")

    # Paso 2 · la captura no es dinero
    pagina.get_by_role("button", name=re.compile(r"Revisar una captura", re.I)).first.click()
    pagina.get_by_role("button", name=re.compile(r"Usar captura de ejemplo", re.I)).first.click()
    expect(pagina.get_by_text(re.compile(r"Todav[ií]a no cae")).first).to_be_visible(timeout=15_000)
    pagina.wait_for_timeout(1_200)  # que terminen las animaciones antes de la captura
    capturar(pagina, "04-todavia-no-cae")

    # Paso 3 · se cierra la revisión y llega el pago (simulado) → ¡Ya cayó!
    dialogo = pagina.locator("dialog[open]")
    if dialogo.count():
        volver = dialogo.locator("#revision-btn-volver")
        if volver.count() and volver.is_visible():
            volver.click()
        else:
            pagina.keyboard.press("Escape")
        expect(pagina.locator("dialog[open]")).to_have_count(0, timeout=3_000)
    simular = pagina.get_by_role("button", name=re.compile(r"Simular pago", re.I)).first
    simular.click()
    expect(pagina.get_by_text(re.compile(r"¡Ya cay[óo]!")).first).to_be_visible(timeout=10_000)
    pagina.wait_for_timeout(800)
    capturar(pagina, "05-ya-cayo")

    # Vista de escritorio (proyector)
    escritorio = navegador.new_context(viewport={"width": 1280, "height": 800}, device_scale_factor=1, locale="es-MX")
    pe = escritorio.new_page()
    pe.goto(BASE, wait_until="networkidle")
    pe.screenshot(path=os.path.join(SALIDA, "06-escritorio.png"))
    print(f"✓ 06-escritorio → {os.path.relpath(os.path.join(SALIDA, '06-escritorio.png'))}")

    navegador.close()

if errores_consola:
    problemas.extend(f"consola: {e}" for e in errores_consola)

if problemas:
    print("\nPROBLEMAS:")
    for x in problemas:
        print(" -", x)
    sys.exit(1)
print("\nDemo completa sin problemas.")
