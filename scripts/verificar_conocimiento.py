#!/usr/bin/env python3
"""Verificación mecánica de la base de conocimiento y del repo.

Uso: python3 scripts/verificar_conocimiento.py
Sale con código 1 si hay errores. Revisa:
  1. Cada conocimiento/NN-*.md tiene frontmatter completo (id, titulo, resumen, responde,
     actualizado, confianza, fuentes) y su id coincide con el número del archivo (03 → K03).
  2. Tiene "## TL;DR" y secciones "## Knn.m · …" con el mismo prefijo.
  3. Cada fuente citada (SA01, SB12, …) existe en la tabla de Fuentes del archivo o en fuentes/REGISTRO.md.
  4. Los enlaces relativos de todos los .md apuntan a archivos que existen.
  5. Ningún archivo versionable contiene algo con forma de llave secreta.
"""
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CON = RAIZ / "conocimiento"
REGISTRO = RAIZ / "fuentes" / "REGISTRO.md"
CLAVES = ["id", "titulo", "resumen", "responde", "actualizado", "confianza", "fuentes"]
RE_FUENTE = re.compile(r"\b(S[A-Z]\d{2,3})\b")
RE_ENLACE = re.compile(r"\]\((?!https?://|mailto:|#)([^)\s#]+)(?:#[^)\s]*)?\)")
RE_SECRETOS = [
    re.compile(r"sk-(?:proj-|svcacct-)?[A-Za-z0-9_\-]{24,}"),
    re.compile(r"(?i)\b(?:api[_-]?key|secret|token)\b\s*[:=]\s*[\"']?[A-Za-z0-9_\-\.]{24,}"),
    re.compile(r"ghp_[A-Za-z0-9]{30,}"),
]
IGNORAR = {".git", "node_modules", ".vercel", "__pycache__"}

errores, avisos = [], []


def ids_de_tabla(texto):
    return set(re.findall(r"^\|\s*(S[A-Z]\d{2,3})\s*\|", texto, re.M))


def revisar_conocimiento(registro_ids):
    archivos = sorted(CON.glob("[0-9][0-9]-*.md"))
    total_secciones = total_sin_verificar = 0
    vistos = {}
    for p in archivos:
        rel = p.relative_to(RAIZ).as_posix()
        t = p.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---\n", t, re.S)
        if not m:
            errores.append(f"{rel}: sin frontmatter YAML al inicio")
            continue
        fm = m.group(1)
        for c in CLAVES:
            if not re.search(rf"^{c}:", fm, re.M):
                errores.append(f"{rel}: falta '{c}' en el frontmatter")
        mid = re.search(r"^id:\s*\"?(K\d\d)\"?", fm, re.M)
        esperado = f"K{p.name[:2]}"
        if not mid:
            errores.append(f"{rel}: id ausente o con formato distinto de Knn")
            continue
        kid = mid.group(1)
        if kid != esperado:
            errores.append(f"{rel}: id {kid} no coincide con el número del archivo ({esperado})")
        if kid in vistos:
            errores.append(f"{rel}: id {kid} repetido (también en {vistos[kid]})")
        vistos[kid] = rel
        cuerpo = t[m.end():]
        if "## TL;DR" not in cuerpo:
            errores.append(f"{rel}: falta la sección '## TL;DR'")
        secciones = re.findall(rf"^##\s+({kid}\.\d+)\b", cuerpo, re.M)
        otras = [s for s in re.findall(r"^##\s+(K\d\d\.\d+)\b", cuerpo, re.M) if not s.startswith(kid)]
        if not secciones:
            errores.append(f"{rel}: no hay secciones '## {kid}.n · …'")
        if otras:
            errores.append(f"{rel}: secciones con prefijo ajeno: {', '.join(otras)}")
        if len(set(secciones)) != len(secciones):
            errores.append(f"{rel}: IDs de sección repetidos")
        total_secciones += len(secciones)
        citadas = set(RE_FUENTE.findall(cuerpo)) | set(RE_FUENTE.findall(fm))
        locales = ids_de_tabla(cuerpo)
        faltan = sorted(s for s in citadas if s not in locales and s not in registro_ids)
        if faltan:
            errores.append(f"{rel}: fuentes citadas sin registrar: {', '.join(faltan)}")
        sin = cuerpo.count("⚪")
        total_sin_verificar += sin
        print(f"  {rel}: {len(secciones)} secciones · {len(citadas)} fuentes citadas · {sin} marcas ⚪")
    return len(archivos), total_secciones, total_sin_verificar


def revisar_enlaces():
    for p in RAIZ.rglob("*.md"):
        if IGNORAR & set(p.relative_to(RAIZ).parts):
            continue
        t = p.read_text(encoding="utf-8")
        t = re.sub(r"```.*?```", "", t, flags=re.S)  # ignora bloques de código
        for destino in RE_ENLACE.findall(t):
            if destino.startswith("<") or "[" in destino:
                continue
            objetivo = (p.parent / destino).resolve()
            if not objetivo.exists():
                rel = p.relative_to(RAIZ).as_posix()
                (avisos if destino.startswith("../docs/PRD.md") or destino == "docs/PRD.md" else errores).append(
                    f"{rel}: enlace roto → {destino}")


def revisar_ids_repetidos():
    """Un mismo ID de fuente con dos URL distintas (entre archivos de conocimiento y REGISTRO) es un error."""
    fila = re.compile(r"^\|\s*(S[A-Z]\d{2,3})\s*\|[^|]*\|\s*([^|]*?)\s*\|")
    urls = {}
    for p in sorted((RAIZ / "conocimiento").glob("[0-9][0-9]-*.md")) + [REGISTRO]:
        if not p.is_file():
            continue
        for linea in p.read_text(encoding="utf-8").splitlines():
            m = fila.match(linea)
            if m and m.group(2).startswith("http"):
                urls.setdefault(m.group(1), {}).setdefault(m.group(2), p.relative_to(RAIZ).as_posix())
    for sid, por_url in sorted(urls.items()):
        if len(por_url) > 1:
            donde = "; ".join(f"{archivo}: {url}" for url, archivo in por_url.items())
            errores.append(f"{sid} tiene más de una URL → {donde}")


def revisar_secretos():
    for p in RAIZ.rglob("*"):
        if not p.is_file() or IGNORAR & set(p.relative_to(RAIZ).parts):
            continue
        if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".pdf", ".zip", ".ico"}:
            continue
        try:
            t = p.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for rx in RE_SECRETOS:
            for m in rx.finditer(t):
                errores.append(f"{p.relative_to(RAIZ).as_posix()}: posible secreto → {m.group(0)[:12]}…")


def main():
    registro_ids = ids_de_tabla(REGISTRO.read_text(encoding="utf-8")) if REGISTRO.is_file() else set()
    if not registro_ids:
        avisos.append("fuentes/REGISTRO.md no existe o no tiene filas")
    print("Base de conocimiento:")
    n, secciones, sin = revisar_conocimiento(registro_ids)
    revisar_ids_repetidos()
    revisar_enlaces()
    revisar_secretos()
    agents = RAIZ / "AGENTS.md"
    if agents.is_file():
        kb = agents.stat().st_size / 1024
        print(f"\nAGENTS.md: {kb:.1f} KB")
        if kb > 16:
            avisos.append("AGENTS.md pesa más de 16 KB: conviene recortarlo para que Codex lo lea completo")
    print(f"\nResumen: {n} archivos · {secciones} secciones · {len(registro_ids)} fuentes en REGISTRO · {sin} marcas ⚪")
    for a in avisos:
        print("  ! aviso:", a)
    for e in errores:
        print("  ✗ error:", e)
    print("\n✓ Todo en orden" if not errores else f"\n✗ {len(errores)} errores")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
