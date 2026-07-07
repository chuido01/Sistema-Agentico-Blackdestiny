> ⚠️ **HISTÓRICO GREMIO 1.x (nota de la reconversión 2.0, 2026-07-06).** Estos simulacros prueban las
> compuertas 1.x `/gremio-analizar` y `/gremio-converger`, hoy **retiradas** (quedan en el historial git
> de este repo) — la suite WF-6 ya no aplica al protocolo vigente. Se conservan sin reescribir como
> registro del método (sembrados permanentes de regresión). Los simulacros 2.0 (sembrados para
> `/gremio-verificar` y `/gremio-cerrar`) están **pendientes de diseño**. Referencia:
> Protocolo GREMIO v2.0 §11.

# Simulacros del protocolo (MP-059/M10) — los 3 casos sembrados permanentes

> **Qué es.** Una Sala E SINTÉTICA (`tablero-sembrado/`) con defectos plantados a propósito, uno por
> cada compuerta/invariante crítico. **Tras cada edición de una compuerta** se corre la suite (WF-6)
> para verificar que las compuertas SIGUEN cazando lo que deben cazar — un test de regresión del
> protocolo mismo. Los sembrados son PERMANENTES: no se "arreglan" (arreglarlos mataría el test).
> `gremio: true` · Creado 2026-07-02 (Ola 3 del MACRO PLAN).

## Los 3 casos sembrados (y qué compuerta debe cazarlos)

| # | Caso sembrado | Dónde | Qué debe cazarlo | Hallazgo esperado |
|---|---|---|---|---|
| 1 | **DR firmado SIN punto de disparo** (`dr:infra-901` no aparece en la columna Disparo del tablero — el patrón exacto que mató la corrida 02) | `tablero-sembrado/plan.md` + `dr-infra-901.md` | `/gremio-analizar` (INVARIANTE 1) | **HIGH**: "DR sin punto de disparo" |
| 2 | **DR `aceptado` SIN evidencia en su Verificación** (checkboxes vacíos, sin formato parseable `— EVIDENCIA:`) | `tablero-sembrado/dr-desarrollo-902.md` | `/gremio-converger --cierre` (INVARIANTE 3) | **missing/CRITICAL**: cierre bloqueado |
| 3 | **DR `aceptado` sin `firma_humana` + FR sin cobertura** (`FR-903` no tiene DR que lo cubra; `dr-datos-903` dice aceptado con firma vacía) | `tablero-sembrado/plan.md` + `dr-datos-903.md` | `/gremio-analizar` (ciclo de vida + cobertura) | **HIGH** (aceptado sin firma) + **CRITICAL/HIGH** (FR sin cobertura) |

## Cómo correr la suite (WF-6)

1. Aplica el prompt de la compuerta `/gremio-analizar` sobre `tablero-sembrado/` (READ-ONLY) → debe
   reportar los casos 1 y 3 con sus severidades.
2. Aplica `/gremio-converger` en **modo cierre** sobre `tablero-sembrado/` (sin escribir: es ensayo)
   → debe reportar el caso 2 como missing/CRITICAL y declarar el cierre BLOQUEADO.
3. **Veredicto de la suite:** PASA si los 3 sembrados fueron cazados con la severidad esperada;
   FALLA si alguno pasó inadvertido (= la edición de la compuerta rompió su detección → revertir/arreglar).

> Resultado de cada corrida: anotarlo donde corresponda (bitácora del trabajo que editó la compuerta).
> Los agentes que corran esto NO escriben en `tablero-sembrado/` (converger en ensayo reporta, no anexa).
