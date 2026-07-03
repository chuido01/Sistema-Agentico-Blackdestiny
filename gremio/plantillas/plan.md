---
# ─────────── Huella GREMIO · Plan (Factory Management · el Plan/Backlog) ───────────
# El spec.md-equivalente. Dueño: gremio-factory-management. Vive en la raíz de la Sala E del proyecto.
id: plan:<proyecto>
proyecto: <nombre>
fecha: <AAAA-MM-DD>
estado: vivo                      # vivo — se actualiza con cada iteración (no se congela)
gremio: true
---

# Plan GREMIO — <proyecto>

> Dueño: **gremio-factory-management** (PM/PO). Es el índice del tablero: enlaza la familia de DRs. Define el **qué/porqué**; el **cómo** vive en los DRs de cada Líder.

## Visión (el qué y el porqué)
<Qué se construye y para quién. El problema que resuelve. NO el cómo.>

## Historias de usuario (priorizadas e independientemente testeables)
<!-- Cada historia es un slice vertical que entrega valor por sí solo (MVP-first / esqueleto andante). -->
### US1 — <título> (P1) 🎯 MVP
- **Valor / por qué P1:** <…>
- **Test independiente:** <cómo se verifica sola, sin las demás>

### US2 — <título> (P2)
- **Valor:** <…> · **Test independiente:** <…>

## Requisitos funcionales
- **FR-001:** El sistema DEBE <…>
- **FR-002:** <…>

## Criterios de éxito (medibles · tecnología-agnósticos)
- **SC-001:** <métrica medible — p. ej. "alta de cuenta en < 2 min">
- **SC-002:** <…>

## Supuestos y fuera-de-alcance
- **Supuesto:** <…> · **Fuera de alcance (v1):** <…>

## Triaje de peso (¿merece GREMIO?) — registro obligatorio (MP-094)
<!-- ANTES del interrogatorio, /gremio-iniciar evaluó tamaño/riesgo/horizonte y el humano decidió. Se registra aquí. -->
- **Evaluación:** <grande/riesgoso/largo-plazo → fábrica completa · acotado/bajo-riesgo → vía simple (prompting guiado / builder)>
- **Decisión del humano:** <fábrica completa | vía simple> · <fecha>
<!-- Si la decisión fue "vía simple", este Plan NO debería existir: la fábrica es la EXCEPCIÓN, no el default. -->

## Tablero — índice de DRs
<!-- La familia de decisiones que cuelgan de este Plan. Una fila por DR; su estado y propietario.
     INVARIANTE 1 (cobertura del tablero): la columna "Disparo" es OBLIGATORIA — todo DR firmado tiene
     su punto de disparo en el plan de ejecución (fila S# o hito propio para los transversales).
     Un DR sin disparo = hallazgo HIGH en /gremio-analizar. Nada "cae al vacío". -->
| DR | Decisión | Dueño (Líder) | Estado | Cubre | **Disparo (S#/hito)** |
|---|---|---|---|---|---|
| `dr:arquitectura-001` | <…> | gremio-lider-arquitectura | propuesto | FR-001, US1 | S0 |

## Esqueleto andante (primer slice)
<La cadena mínima Factory Management→Líder(es)→Especialista(s)→Calidad que se construye primero para validar el sistema end-to-end con prueba visual. **Se DESPLIEGA al entorno de destino, no solo se prueba** — "mostrar temprano" operacionalizado (ref `investigacion:verde-local-no-cierra-slice-con-destino-cloud`).>

## Slice final OBLIGATORIO — "Integración y Endurecimiento" (MP-045 / G-01)
<!-- El último kilómetro como slice propio, con DR propio y dueño. El Plan NO se cierra sin este slice
     ejecutado en verde. Ref `investigacion:ultimo-kilometro-producto-necesita-dueno-contrato`. -->
- **SF — Integración y Endurecimiento:** hardening remoto (cabeceras + advisors 0 ERROR) · pipeline verde
  demostrado (primer push verde en el runner real) · consolidación documental (README = producto vivo,
  pasada del doc-writer) · pulido de superficie (favicon, título, estados vacíos, consola 0 errores) ·
  manual de usuario por rol. Cubierto por: `dr:seguridad-*`, `dr:infra-*`, `dr:diseno-*` según aplique.

## Bitácora de milestones — telemetría por slice (MP-058 / M9)
<!-- Se llena AL CERRAR cada slice. Sin esta tabla, "¿GREMIO rinde más que una sesión directa?" no es respondible. -->
| Slice | Cerrado | Duración (sesiones/h aprox) | Tokens aprox | Agentes invocados | Notas |
|---|---|---|---|---|---|
| S0 | <fecha> | <…> | <…> | <n> | <…> |

## Cierre de la corrida — retrospectiva obligatoria (MP-065 / M16)
<!-- El Plan no se declara cerrado sin: (1) convergencia de CIERRE contra el tablero entero (mapa DR→evidencia
     7/7 o los que haya), (2) retrospectiva: ≥1 aprendizaje capturado en la Sala D local vía /sabio-aprender,
     o la declaración explícita "sin lección" con el porqué. La cultura es frágil; el protocolo no. -->
- **Convergencia de cierre:** <fecha + resultado del modo cierre>
- **Retrospectiva:** <aprendizaje:<id> capturado(s) | "sin lección porque <…>">

> **Límite de WIP (MP-062 / M13):** UNA corrida activa por proyecto. `/gremio-iniciar` chequea si existe un
> `plan.md` vivo sin cerrar y pregunta antes de abrir otro — dos tableros entrelazados romperían la trazabilidad.
