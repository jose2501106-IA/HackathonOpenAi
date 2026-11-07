#!/usr/bin/env python3
"""Une toda la base de conocimiento en un solo archivo para ChatGPT u otro LLM.

Uso:    python3 scripts/construir_todo_en_uno.py
Salida: conocimiento/TODO-EN-UNO.md (se regenera completo; no lo edites a mano).

Orden: INDICE.md, docs/PROYECTO.md (definición del proyecto), K00… por número de archivo, la documentación
de pey (pey/README.md y pey/NN-*.md), la de CoDi (codi/README.md y codi/NN-*.md) y al final AGENTS.md.
"""
import datetime as dt
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CON = RAIZ / "conocimiento"
SALIDA = CON / "TODO-EN-UNO.md"


def titulo_de(texto, respaldo):
    m = re.search(r'^titulo:\s*"?(.*?)"?\s*$', texto, re.M)
    if m:
        return m.group(1)
    m = re.search(r"^#\s+(.+)$", texto, re.M)
    return m.group(1).strip() if m else respaldo


def main():
    def carpeta(nombre):
        return [RAIZ / nombre / "README.md"] + sorted((RAIZ / nombre).glob("[0-9][0-9]-*.md"))

    archivos = (
        [CON / "INDICE.md", RAIZ / "docs" / "PROYECTO.md"]
        + sorted(CON.glob("[0-9][0-9]-*.md"))
        + carpeta("pey")
        + carpeta("codi")
        + [RAIZ / "AGENTS.md"]
    )
    archivos = [p for p in archivos if p.is_file()]
    hoy = dt.date.today().isoformat()

    contenido = []
    indice = []
    for p in archivos:
        texto = p.read_text(encoding="utf-8").strip()
        rel = p.relative_to(RAIZ).as_posix()
        if p.parent != CON and p.parent != RAIZ:
            # Los enlaces relativos de pey/, codi/ y docs/ apuntan a su carpeta: se ajustan para que funcionen
            # desde conocimiento/, donde vive TODO-EN-UNO.md.
            carpeta_rel = p.parent.relative_to(RAIZ).as_posix()
            texto = re.sub(r"\]\((?!https?://|mailto:|#|\.\./|/)([^)\s]+)\)", rf"](../{carpeta_rel}/\1)", texto)
        indice.append(f"- `{rel}` — {titulo_de(texto, rel)}")
        contenido.append(f"\n\n<!-- ===== INICIO: {rel} ===== -->\n\n{texto}\n\n<!-- ===== FIN: {rel} ===== -->")

    cabecera = (
        "# Base de conocimiento completa — HackathonOpenAi\n\n"
        f"> Archivo generado por `scripts/construir_todo_en_uno.py` el {hoy}. No lo edites a mano: "
        "edita los archivos de `conocimiento/`, `pey/`, `codi/` o `docs/PROYECTO.md` y vuelve a correr el script.\n"
        "> Úsalo cuando un asistente (por ejemplo ChatGPT) necesite leer todo de una vez. "
        "Cada sección conserva su ID (K03.4, etc.) para citarla.\n\n"
        "## Contenido\n" + "\n".join(indice)
    )
    SALIDA.write_text(cabecera + "".join(contenido) + "\n", encoding="utf-8")
    kb = SALIDA.stat().st_size / 1024
    print(f"✓ {SALIDA.relative_to(RAIZ)}: {len(archivos)} archivos, {kb:.0f} KB")


if __name__ == "__main__":
    main()
