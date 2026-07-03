---
id: dr:desarrollo-902
tipo: desarrollo
estado: aceptado
fecha: 2026-07-02
autor: gremio-lider-desarrollo
especialistas: [gremio-desarrollo-frontend]
firma_humana: "Sembrador · 2026-07-02 · f0f0f0f"
supersede: ""
superado_por: ""
refs: [dr:datos-903]
fuentes_sabio: [investigacion:desarrollo-moc]
plan: plan:producto-sembrado
gremio: true
---

# DR `dr:desarrollo-902` — Stack del gestor (SINTÉTICO — sembrado caso 2)

> ⚠️ DEFECTO PLANTADO: este DR está `aceptado`+firmado y su slice se dio por ejecutado, pero su
> Verificación está VACÍA (checkboxes sin marcar, sin una sola línea `— EVIDENCIA:`).
> `/gremio-converger --cierre` debe reportarlo missing/CRITICAL y BLOQUEAR el cierre. No arreglar.

## Contexto
US1/FR-901/FR-902 piden alta y listado de libros.

## Decisión
SPA mínima vanilla + almacenamiento local del navegador.

## Alternativas descartadas
| Alternativa | Por qué se consideró | Por qué se descartó |
|---|---|---|
| Framework completo | DX | desproporción para el sintético |

## Consecuencias
Sin backend; suficiente para el simulacro.

## Contrato de implementación
- **Módulos/componentes:** `app.js`, `index.html`.
- **Primer test (rojo→verde):** test de alta+lectura de un libro en verde.

## Verificación — la compuerta
- [ ] El primer test corre en verde
- [ ] `/gremio-analizar` sin CRITICAL/HIGH abiertos contra este DR
- [ ] Cobertura: FR-901/FR-902 con tarea y evidencia
- **Firma humana:** `Sembrador · 2026-07-02 · f0f0f0f`
