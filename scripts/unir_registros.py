#!/usr/bin/env python3
"""Une los registros parciales de fuentes (fuentes/registro-*.md) en fuentes/REGISTRO.md.

Uso: python3 scripts/unir_registros.py
- Toma cada fila de tabla que empiece con un ID de fuente (SA01, SB12, …).
- Si un ID se repite, conserva la primera fila y avisa.
- Agrega las fuentes propias del repo (SM…) que estén en los archivos de conocimiento.
"""
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FUENTES = RAIZ / "fuentes"
SALIDA = FUENTES / "REGISTRO.md"
RE_FILA = re.compile(r"^\|\s*(S[A-Z]\d{2,3})\s*\|(.*)\|\s*$")


def celdas(resto):
    return [c.strip() for c in resto.split("|")]


def main():
    filas, origen = {}, {}
    for p in sorted(FUENTES.glob("registro-*.md")):
        for linea in p.read_text(encoding="utf-8").splitlines():
            m = RE_FILA.match(linea)
            if not m:
                continue
            sid, c = m.group(1), celdas(m.group(2))
            titulo, url, consultado = (c + ["", "", ""])[:3]
            usado = c[3] if len(c) > 3 else ""
            if sid in filas:
                print(f"! {sid} repetido en {p.name} (se conserva el de {origen[sid]})")
                continue
            filas[sid] = (titulo, url, consultado, usado)
            origen[sid] = p.name
    # Fuentes propias declaradas en tablas de los archivos de conocimiento (por ejemplo SM01 en K10)
    for p in sorted((RAIZ / "conocimiento").glob("[0-9][0-9]-*.md")):
        kid = "K" + p.name[:2]
        for linea in p.read_text(encoding="utf-8").splitlines():
            m = RE_FILA.match(linea)
            if m and m.group(1) not in filas:
                c = celdas(m.group(2))
                titulo, url, consultado = (c + ["", "", ""])[:3]
                filas[m.group(1)] = (titulo, url, consultado, kid)
                origen[m.group(1)] = p.name

    def clave(sid):
        return (sid[1], int(re.sub(r"\D", "", sid)))

    lineas = [
        "# Registro de fuentes",
        "",
        "Toda afirmación factual de `conocimiento/` cita una de estas fuentes. Prefijos: SA evento y organizadores ·",
        "SB CoDi y Pey · SC OpenAI y Codex · SD contexto de pagos en México · SE ideas · SF día del evento ·",
        "SM perfil de José. \"Correo\" o \"no público\" = dato de los correos del participante, sin URL pública.",
        "",
        "Generado por `scripts/unir_registros.py`. Para agregar una fuente, ponla en la tabla `## Fuentes`",
        "del archivo que la usa y vuelve a correr el script.",
        "",
        "| ID | Título | URL | Consultado | Usado en |",
        "|---|---|---|---|---|",
    ]
    for sid in sorted(filas, key=clave):
        titulo, url, consultado, usado = filas[sid]
        lineas.append(f"| {sid} | {titulo} | {url} | {consultado} | {usado} |")
    SALIDA.write_text("\n".join(lineas) + "\n", encoding="utf-8")
    print(f"✓ {SALIDA.relative_to(RAIZ)}: {len(filas)} fuentes")


if __name__ == "__main__":
    main()
