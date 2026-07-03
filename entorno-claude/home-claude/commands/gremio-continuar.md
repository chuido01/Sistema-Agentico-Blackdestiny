---
description: "Continúa la corrida GREMIO viva: lee el tablero (Plan + DRs), detecta la fase, y ejecuta el SIGUIENTE lote respetando los 4 invariantes (cobertura del tablero, pre-flight, convergencia de cierre, anti-improvisación). La corrida 03 no depende de la pericia del operador: este comando ES el procedimiento."
argument-hint: [vacío (detecta solo) | S# o dr:<id> para forzar el foco]
model: opus
gremio: true
---

# /gremio-continuar — el motor de la corrida (tablero → fase → lote)

Ejecutas el **siguiente paso correcto** de la corrida GREMIO viva de ESTE proyecto. La verdad operativa:
**la sesión principal (tú) es el EJECUTOR; `gremio-factory-management` es el dueño del Plan.** Tú eres el
único que invoca agentes (sin Task-en-Task); los Líderes deciden, los Especialistas ejecutan, todos por
el tablero.

## 1 · Leer el tablero (SIEMPRE primero, en frío)
Lee `04-Recursos/05-Decisiones/`: el `plan.md` (índice de DRs con su columna **Disparo**), cada `dr:*`
(estado, firma, Contrato, Pre-flight, Verificación), y el `interrogatorio.md`. Reconstruye: qué slice
está en curso, qué DRs están `propuesto` sin firma, cuáles `aceptado` sin ejecutar, qué evidencia falta.

## 2 · Checklist de cobertura DR↔disparo (INVARIANTE 1 — antes de avanzar)
Todo DR del índice tiene **punto de disparo** (fila S#/hito)? Si alguno no lo tiene: **detente** y
resuélvelo con el FM/humano ANTES de ejecutar nada (un DR sin disparo cae al vacío — corrida 02).

## 3 · Detectar la fase y ejecutar el lote
| Si el tablero muestra… | El lote es… |
|---|---|
| Plan aprobado sin DRs (o dominios sin DR) | Lanzar los **Líderes** que faltan → cada uno escribe su DR `propuesto` |
| DRs `propuesto` completos | **`/gremio-analizar`** → presentar hallazgos → resolver CRITICAL/HIGH → pedir **firma humana** (con commit SHA) |
| DRs `aceptado` con Contrato sin ejecutar | **Pre-flight primero** (INVARIANTE 2, si hay dependencias externas: inventario VERIFICADO con llamadas reales; lo que falte se PIDE al humano explícito) → lanzar los **Especialistas** que el Líder planificó, en su orden |
| Slice implementado | **`/gremio-converger`** (modo slice) → cerrar el slice según su DoD (destino cloud = verde EN destino) → **telemetría** del slice a la bitácora de milestones del Plan |
| Todos los slices cerrados (incl. el **slice final de Integración y Endurecimiento** — sin él no hay cierre) | **`/gremio-converger --cierre`** (mapa DR→evidencia del tablero ENTERO; un DR sin evidencia = CRITICAL, cierre bloqueado) → **retrospectiva obligatoria** (≥1 `/sabio-aprender` o "sin lección" explícito) → veredicto con los Criterios delante + firma |

## 4 · Invariante 4 — anti-improvisación (rige TODO el ciclo)
Ante un bloqueo al ejecutar un DR firmado, las ÚNICAS salidas son: **(a)** ejecutar lo firmado, o
**(b)** reportar el bloqueo con el pre-flight en la mano y proponer **DR de supersesión** para la firma
del humano. **JAMÁS** sustituir la decisión firmada por conveniencia de tooling (el caso
Vercel-por-tener-MCP vs Cloudflare-firmado). Y jamás afirmar "no puedo" sin haberlo probado con una
llamada real.

## Reglas de oro
- Un lote por invocación: ejecuta el lote detectado, muestra la evidencia, y detente en la siguiente
  compuerta humana (firma, visto bueno, decisión).
- Nada se declara sin demostrar: la definición de "hecho" es la del CONTRATO del DR, nunca una señal proxy.
- Aislamiento Capa 1: solo este proyecto; plano global read-only vía sabio-shared.
