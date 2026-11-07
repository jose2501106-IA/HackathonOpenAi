#!/usr/bin/env python3
"""Graba un video de respaldo de la demo de 3 pasos de "¿Ya cayó?" con subtítulos en español.

Uso:  python3 scripts/video_demo.py [URL_BASE] [SALIDA.mp4]
      (por defecto http://localhost:3000 y docs/video/demo-ya-cayo.mp4)

Requiere Playwright para Python, Google Chrome, ffmpeg y la fuente Inter. Pensado para SIMULACIÓN:
el video lo dice en pantalla todo el tiempo. Composición 1920×1080: el celular a la izquierda y el
subtítulo de cada paso a la derecha.
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time

from playwright.sync_api import expect, sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
SALIDA = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), "..", "docs", "video", "demo-ya-cayo.mp4")
FUENTE_FUERTE = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"
FUENTE_NORMAL = "/usr/share/fonts/opentype/inter/Inter-Regular.otf"

tmp = tempfile.mkdtemp(prefix="video-yacayo-")
marcas = {}

with sync_playwright() as p:
    navegador = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    contexto = navegador.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=2,
        locale="es-MX",
        has_touch=True,
        is_mobile=True,
        record_video_dir=tmp,
        record_video_size={"width": 390, "height": 844},  # el video no se escala hacia arriba: mismo tamaño que la vista
    )
    pagina = contexto.new_page()
    inicio = time.monotonic()

    def marca(clave):
        marcas[clave] = round(time.monotonic() - inicio, 2)

    pagina.goto(BASE, wait_until="networkidle")
    pagina.wait_for_timeout(3000)

    # Paso 1 · cobra con tus palabras
    marca("paso1")
    pagina.get_by_text("Cóbrale un dulce de tamarindo").first.click()
    confirmar = pagina.get_by_role("button", name=re.compile(r"Confirmar y generar QR", re.I))
    try:
        expect(confirmar).to_be_visible(timeout=4_000)
    except AssertionError:
        pagina.get_by_role("textbox").first.press("Enter")
        expect(confirmar).to_be_visible(timeout=8_000)
    pagina.wait_for_timeout(3000)
    confirmar.click()
    expect(pagina.locator("img[src^='data:image/png']").first).to_be_visible(timeout=10_000)
    pagina.wait_for_timeout(3500)

    # Paso 2 · la captura no es dinero
    marca("paso2")
    pagina.get_by_role("button", name=re.compile(r"Revisar una captura", re.I)).first.click()
    pagina.wait_for_timeout(1500)
    pagina.get_by_role("button", name=re.compile(r"Usar captura de ejemplo", re.I)).first.click()
    expect(pagina.get_by_text(re.compile(r"Todav[ií]a no cae")).first).to_be_visible(timeout=15_000)
    pagina.wait_for_timeout(5000)

    # Paso 3 · ¡Ya cayó!
    marca("paso3")
    dialogo = pagina.locator("dialog[open]")
    if dialogo.count():
        volver = dialogo.locator("#revision-btn-volver")
        if volver.count() and volver.is_visible():
            volver.click()
        else:
            pagina.keyboard.press("Escape")
    pagina.wait_for_timeout(1500)
    pagina.get_by_role("button", name=re.compile(r"Simular pago", re.I)).first.click()
    expect(pagina.get_by_text(re.compile(r"¡Ya cay[óo]!")).first).to_be_visible(timeout=10_000)
    pagina.wait_for_timeout(5000)
    marca("fin")

    video_crudo = pagina.video.path()
    contexto.close()  # cierra y termina de escribir el video
    navegador.close()

TEXTOS = [
    ("intro", 0, marcas["paso1"], "¿Ya cayó?", "La captura no es dinero.\nCaja de cobro CoDi con la IA de OpenAI\ny los pagos de pey."),
    ("p1", marcas["paso1"], marcas["paso2"], "1 · Cobra con tus palabras", "«Cóbrale un dulce de tamarindo»:\nla IA propone $1.00, tú confirmas\ny pey genera el QR CoDi."),
    ("p2", marcas["paso2"], marcas["paso3"], "2 · La captura no es dinero", "La IA lee la captura: $1.00, 13:58.\npey no tiene ese pago:\n«Todavía no cae: no entregues»."),
    ("p3", marcas["paso3"], marcas["fin"] + 5, "3 · ¡Ya cayó!", "El pago llega y lo confirma pey,\nno una captura."),
]


def archivo_texto(nombre, texto):
    ruta = os.path.join(tmp, f"{nombre}.txt")
    with open(ruta, "w", encoding="utf-8") as f:
        f.write(texto)
    return ruta


filtros = ["[0:v]scale=-2:960:flags=lanczos,setsar=1[tel]", "[1:v][tel]overlay=x=200:y=60:shortest=1[v0]"]
anterior = "v0"
pasos = []
for i, (clave, a, b, titulo, sub) in enumerate(TEXTOS):
    pasos.append(
        f"drawtext=fontfile={FUENTE_FUERTE}:textfile={archivo_texto(clave + '-t', titulo)}:expansion=none:"
        f"fontcolor=0xfbf9f4:fontsize={96 if clave == 'intro' else 64}:x=780:y=300:enable='between(t,{a},{b})'"
    )
    pasos.append(
        f"drawtext=fontfile={FUENTE_NORMAL}:textfile={archivo_texto(clave + '-s', sub)}:expansion=none:"
        f"fontcolor=0xcbd5e1:fontsize=40:line_spacing=18:x=780:y=440:enable='between(t,{a},{b})'"
    )
pasos.append(
    f"drawtext=fontfile={FUENTE_NORMAL}:textfile={archivo_texto('marca', '¿Ya cayó? · DevDay Exchange Community Hackathon · CDMX')}:"
    "expansion=none:fontcolor=0xcbd5e1:fontsize=28:x=780:y=96"
)
pasos.append(
    f"drawtext=fontfile={FUENTE_FUERTE}:textfile={archivo_texto('modo', 'SIMULACIÓN · en este video no se movió dinero real')}:"
    "expansion=none:fontcolor=0xfcd34d:fontsize=32:x=780:y=940"
)
filtros.append(f"[{anterior}]" + ",".join(pasos) + "[v]")

os.makedirs(os.path.dirname(os.path.abspath(SALIDA)), exist_ok=True)
subprocess.run(
    [
        "ffmpeg", "-y", "-loglevel", "error",
        "-i", video_crudo,
        "-f", "lavfi", "-i", "color=c=0x0f172a:s=1920x1080:r=30",
        "-filter_complex", ";".join(filtros),
        "-map", "[v]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", SALIDA,
    ],
    check=True,
)
shutil.rmtree(tmp, ignore_errors=True)
print(f"✓ Video: {os.path.relpath(SALIDA)} · marcas {marcas}")
