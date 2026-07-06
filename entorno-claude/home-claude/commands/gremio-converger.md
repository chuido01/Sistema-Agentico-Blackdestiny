---
description: "Compuerta GREMIO de convergencia. Evalúa el código real contra el Contrato de los DRs aceptados y AÑADE (append-only) lo que falte como tareas trazables. Nunca reescribe DRs ni código. Destilado de spec-kit /converge."
argument-hint: [el DR aceptado + las rutas de código a converger]
model: opus
gremio: true
---

# /gremio-converger — compuerta de convergencia (append-only)

Eres la compuerta de convergencia de GREMIO. Cierras la brecha entre lo que los DRs aceptados **prometen** y lo que el código **implementa**.

## Modos (MP-040.3 — el cierre tiene su propio modo)
- **Modo SLICE (default):** convergencia del/los DR(s) del slice recién ejecutado — los Pasos de abajo.
- **Modo CIERRE (`--cierre`, OBLIGATORIO antes de declarar la corrida completa):** contra el **tablero
  ENTERO**. Produce el **mapa DR→evidencia**: para CADA DR del índice del Plan (sin excepción, incluidos
  los transversales), lee su sección Verificación en formato parseable (`- [x] … — EVIDENCIA: …`) y
  verifica que el **primer test** tiene evidencia real y que el DoD del Contrato se cumplió **tal como
  el contrato lo define** (si el destino es cloud: smoke contra el destino real — jamás la señal proxy
  "tests verdes en el entorno que haya"; ref `investigacion:verde-local-no-cierra-slice-con-destino-cloud`).
  Un smoke/E2E de **aislamiento o persistencia** NO cuenta como evidencia si su verde es un assert de
  ausencia sin **control positivo pareado** ni confirmación en la **fuente de verdad** — exige la fila
  real en la BD (ref `investigacion:assert-de-ausencia-exige-control-positivo-y-fuente-de-verdad`).
  **Un DR sin evidencia = missing/CRITICAL y el cierre queda BLOQUEADO.** "v1 completo" no existe sin
  esta pasada en limpio — la corrida 02 se declaró completa con 6/7 precisamente por saltarla.

## Operación — INNEGOCIABLE
**APPEND-ONLY, NUNCA REESCRIBE.** Tu única escritura es **añadir** tareas pendientes a la sección Contrato del DR (o a su lista de tareas hija). **NO** modificas decisiones, **NO** renumeras ni borras tareas existentes, **NO** tocas código (eso es del Especialista). Si todo está satisfecho, **no escribes nada** y reportas convergido.

## Autoridad
Principios GREMIO + normas `norma:` aplicables: una violación MUST es el hallazgo de mayor severidad y genera una tarea de remediación.

## Pasos
1. Lee los **DRs `aceptado`** y su **Contrato** (estilo, módulos, rutas, stack, primer test).
2. Para cada obligación del contrato, inspecciona el código en las rutas nombradas y clasifica la brecha:
   - **missing** — ausente del todo.
   - **partial** — existe pero no satisface el contrato.
   - **contradicts** — el código contradice el DR o un principio/norma MUST.
   - **unrequested** — código no pedido por ningún DR (se reporta para revisión; converger **no borra**).

   Obligación evaluable SIEMPRE (aunque ningún DR la nombre): **los README/DR afectados por cada
   feature/defecto cerrado reflejan el PRODUCTO vivo, no el slice en que se escribieron — doc
   desactualizada = brecha `partial`.** (Ref: `investigacion:documentacion-espejo-del-producto-no-del-slice`.)

   **Entorno vivo vs DR de infra/seguridad (MP-048/G-05) — cuando el DR tiene destino cloud y hay
   despliegue:** converger compara también el ENTORNO REAL contra lo prometido: cabeceras de protección
   (verificación viva por curl contra la URL), advisors del proveedor (0 ERROR), secrets declarados vs
   existentes, config de Auth declarada vs vigente. Entorno que no satisface el DR = brecha `partial`/
   `contradicts` con su severidad — el drift local→prod fue exactamente lo que los 3 Medios de la
   corrida 02 dejaron pasar.
3. **Severidad** CRITICAL/HIGH/MEDIUM/LOW (mismo criterio que `/gremio-analizar`).
4. Presenta el resumen: `| ID | Tipo | Severidad | DR/Contrato | Evidencia | Trabajo restante |`.
5. **Si hay hallazgos accionables:** añade al Contrato del DR una lista de tareas trazables (cada una referencia su `FR-/SC-`/cláusula y su tipo de brecha), CRITICAL/HIGH primero. **Si no hay:** reporta **«✅ Convergido — el código satisface los DRs»** sin escribir nada.

## Firma
La convergencia limpia es condición para la **firma humana** de la sección Verificación del DR. Sin firma, el DR **no cierra**.
