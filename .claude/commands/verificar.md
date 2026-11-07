---
description: Verifica el repo antes de desplegar o entregar (pruebas, conocimiento, llaves, reglas de producto y checklist K08.13)
disable-model-invocation: true
allowed-tools:
  - Bash(npm test *)
  - Bash(node --test *)
  - Bash(python3 scripts/verificar_conocimiento.py)
  - Bash(git status *)
  - Bash(git diff *)
  - Bash(git grep *)
  - Bash(git ls-files *)
  - Bash(git log *)
---

# /verificar

En este comando **no cambies código**: verifica e informa. Lo que falle se propone como tarea para `/construir`.

1. **Pruebas:** si hay `package.json`, corre `npm test`; si no, `node --test`. Si no hay pruebas, es ✗.
2. **Base de conocimiento:** `python3 scripts/verificar_conocimiento.py` debe terminar con 0 errores.
3. **Llaves y datos personales:**
   - `git ls-files` no debe mostrar ningún `.env` salvo `.env.example`.
   - `git grep -nE "sk-[A-Za-z0-9_-]{20,}|whsec_[A-Za-z0-9+/=]{16,}|ghp_[A-Za-z0-9]{20,}"` no debe encontrar nada.
   - `git grep -n "process.env"`: ninguna coincidencia en archivos que se sirven al navegador.
   - `git grep -nE "[0-9]{18}"` (posibles CLABE) y revisa a mano cada coincidencia.
   - Nunca imprimas el valor de una variable de entorno.
4. **Reglas de producto (`AGENTS.md` §3 y §4):** textos en español de México; 360 px sin desplazamiento horizontal; botones de al menos 44 px; "SIMULACIÓN" visible cuando aplica; confirmación explícita antes de cobrar; monto máximo en el servidor; firma del webhook de pey verificada (K03.5); validación de montos. Cada regla: ✓ con evidencia (archivo:línea o prueba), ✗, o ⚪ si solo se puede comprobar en el celular.
5. **Checklist K08.13:** lee la sección en `conocimiento/08-criterios-y-jueces.md` y marca cada punto ✓, ✗ o ⚪ con evidencia.
6. **Git:** `git status --short` (nada pendiente de commit) y `git log --oneline -5`.

Responde con una tabla `Revisión | Resultado | Evidencia`, después **Bloqueantes** (lo que impide desplegar o entregar) y **Siguiente paso**. Al final agrega una línea al Historial de `BITACORA.md` con el resultado y haz commit solo de ese archivo.
