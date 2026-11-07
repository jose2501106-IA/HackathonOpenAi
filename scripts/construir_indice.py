#!/usr/bin/env python3
"""Genera conocimiento/INDICE.md a partir del frontmatter y las secciones de cada archivo.

Uso: python3 scripts/construir_indice.py
El índice es el "router" de la base de conocimiento: un agente lo lee primero y abre solo
el archivo o la sección (K03.4, etc.) que necesita. No lo edites a mano.
"""
import datetime as dt
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CON = RAIZ / "conocimiento"
SALIDA = CON / "INDICE.md"


def campo(fm, nombre):
    m = re.search(rf'^{nombre}:\s*"?(.*?)"?\s*$', fm, re.M)
    return m.group(1).strip() if m else ""


def lista(fm, nombre):
    m = re.search(rf"^{nombre}:\s*\n((?:\s+-\s+.*\n?)+)", fm, re.M)
    if not m:
        return []
    return [re.sub(r'^\s+-\s+"?(.*?)"?\s*$', r"\1", l) for l in m.group(1).splitlines() if l.strip()]


def main():
    filas, detalle, preguntas = [], [], []
    for p in sorted(CON.glob("[0-9][0-9]-*.md")):
        t = p.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---\n", t, re.S)
        if not m:
            continue
        fm, cuerpo = m.group(1), t[m.end():]
        kid, titulo = campo(fm, "id"), campo(fm, "titulo")
        resumen, confianza = campo(fm, "resumen"), campo(fm, "confianza")
        secciones = re.findall(r"^##\s+(K\d\d\.\d+)\s*[·\-—:]?\s*(.+)$", cuerpo, re.M)
        sin = cuerpo.count("⚪")
        filas.append(f"| **{kid}** | [{titulo}]({p.name}) | {resumen} | {confianza} | {sin} |")
        detalle.append(f"\n### {kid} · {titulo}\nArchivo: [`{p.name}`]({p.name})\n")
        detalle += [f"- `{sid}` {nombre.strip()}" for sid, nombre in secciones]
        preguntas += [f"| {q} | {kid} |" for q in lista(fm, "responde")]

    hoy = dt.date.today().isoformat()
    texto = f"""# Índice de la base de conocimiento

> Generado por `scripts/construir_indice.py` el {hoy}. No lo edites a mano.

## Cómo usar este índice (agentes y personas)
1. Busca tu pregunta en **Preguntas → archivo** o el tema en **Archivos**.
2. Abre solo el archivo o la sección que necesitas. Cada sección tiene un ID (`K03.4`) para citarla.
3. ⚪ = dato no verificado: confírmalo antes de usarlo en código o en el pitch.
4. ¿Necesitas todo de una vez (por ejemplo, en ChatGPT)? Abre [`TODO-EN-UNO.md`](TODO-EN-UNO.md).
5. De dónde sale cada dato: [`../fuentes/REGISTRO.md`](../fuentes/REGISTRO.md).

## Archivos
| ID | Archivo | Qué cubre | Confianza | Marcas ⚪ |
|---|---|---|---|---|
""" + "\n".join(filas) + """

## Preguntas → archivo
| Pregunta | Abre |
|---|---|
""" + "\n".join(preguntas) + """

## Secciones de cada archivo
""" + "\n".join(detalle) + "\n"
    SALIDA.write_text(texto, encoding="utf-8")
    print(f"✓ {SALIDA.relative_to(RAIZ)}: {len(filas)} archivos, {len(preguntas)} preguntas")


if __name__ == "__main__":
    main()
