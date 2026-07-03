---
id: dr:datos-903
tipo: datos
estado: aceptado
fecha: 2026-07-02
autor: gremio-lider-datos
especialistas: [gremio-datos-relacionales]
firma_humana: ""
supersede: ""
superado_por: ""
refs: []
fuentes_sabio: [investigacion:bases-de-datos-moc]
plan: plan:producto-sembrado
gremio: true
---

# DR `dr:datos-903` — Esquema de almacenamiento (SINTÉTICO — sembrado caso 3)

> ⚠️ DEFECTO PLANTADO (doble): (a) este DR dice `estado: aceptado` con `firma_humana` VACÍA —
> violación del ciclo de vida (aceptado sin firma = HIGH en `/gremio-analizar`); (b) además el Plan
> tiene el FR-903 (export CSV) SIN ningún DR que lo cubra (cobertura rota). No arreglar.

## Contexto
FR-901 exige persistir libros con título y autor.

## Decisión
Colección única `libros` en almacenamiento local, clave = ISBN o UUID.

## Alternativas descartadas
| Alternativa | Por qué se consideró | Por qué se descartó |
|---|---|---|
| BD relacional | robustez | sin backend en v1 sintética |

## Consecuencias
Sin queries complejas; suficiente para el simulacro.

## Contrato de implementación
- **Contratos/interfaces:** `{id, titulo, autor, creado}`.
- **Primer test (rojo→verde):** persistir y releer un libro.

## Verificación — la compuerta
- [x] El primer test corre en verde — EVIDENCIA: `test alta+lectura` → `1 passed (sintético)`
- **Firma humana:** `` ← VACÍA a propósito (sembrado)
