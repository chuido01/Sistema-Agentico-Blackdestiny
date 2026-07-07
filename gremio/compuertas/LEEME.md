# Compuertas GREMIO 2.0 — verificar y cerrar

> `gremio: true` · Reconversión 2.0 (2026-07-06, blueprint firmado).

Las compuertas de GREMIO 2.0 son **`/gremio-verificar`** (verificación adversarial read-only, absorbe a
`/gremio-analizar`) y **`/gremio-cerrar`** (cierre honesto de 4 condiciones, reemplaza a
`/gremio-converger`).

**Aquí no hay archivos aparte: el comando ES la compuerta.** La fuente única vive en
[`../comandos/gremio-verificar.md`](../comandos/gremio-verificar.md) y
[`../comandos/gremio-cerrar.md`](../comandos/gremio-cerrar.md) (regla de oro: un dato vive en un
artefacto — duplicarlos aquí crearía un espejo manual que driftea). Runtime en `~/.claude/commands/`;
re-copiar tras editar la fuente.

Las compuertas 1.x (`gremio-analizar.md`, `gremio-converger.md`) quedan en el **historial git de este
repo**. El porqué de la reconversión: `investigacion:compuertas-verifican-el-contrato-no-el-producto-percibido`
(plano global, Sala A) — las compuertas 1.x verificaban el Contrato, no el producto percibido; las 2.0
verifican los dos (`/gremio-cerrar` condición 2: el humano recorre el bucle central contra `intencion.md`).
