---
description: "La compuerta final de GREMIO 2.0 — cuatro condiciones sin excepción: convergencia contra los DRs · bucle central recorrido POR EL HUMANO contra la intención · verde EN destino · release real (tag+changelog+rollback ensayado). Sin las cuatro, la palabra «cerrado» está prohibida. Reemplaza a /gremio-converger."
argument-hint: [el release o hito a cerrar]
model: opus
gremio: true
---

# /gremio-cerrar — el cierre honesto (cuatro condiciones, ninguna negociable)

Cierras un release o hito. La lección que este comando encarna: la corrida 03 cerró 7 slices firmados y
convergidos **con el bucle central del producto sin cerrar** — porque las compuertas verificaban el
Contrato, no el producto (ref `investigacion:compuertas-verifican-el-contrato-no-el-producto-percibido`).
Este comando verifica los dos.

Hito: **$ARGUMENTS**

## Condición 1 · Convergencia contra los contratos (append-only)
Mapa **DR→evidencia** de TODOS los DRs firmados del tablero, sin excepción:
- Cada obligación del Contrato inspeccionada en el código real; brechas clasificadas: **missing** ·
  **partial** · **contradicts** · **unrequested** (se reporta; converger no borra).
- El **primer test** con evidencia real (rojo→verde); un smoke de aislamiento/persistencia NO cuenta si su
  verde es un assert de ausencia sin **control positivo pareado** ni confirmación en la **fuente de verdad**.
- **Entorno vivo vs DR** cuando hay destino cloud: cabeceras verificadas vivas (curl contra la URL),
  advisors del proveedor (0 ERROR), secrets declarados vs existentes.
- Documentación **espejo del producto**, no del slice en que se escribió: doc desactualizada = `partial`.
- **Un DR sin evidencia = CRITICAL y el cierre queda BLOQUEADO.** Si hay brechas accionables: se AÑADEN
  como tareas trazables al Contrato (append-only — jamás reescribir decisiones ni renumerar).

## Condición 2 · Producto percibido (la que ninguna corrida tuvo)
**El humano recorre el bucle central de punta a punta contra `intencion.md`** — no contra el Plan ni los
DRs. TÚ preparas el checklist; el recorrido es de él, usándolo de verdad:
- Cada ítem `I-###` de carril producto: ¿existe y lo convence? (su criterio era «percepción del humano» —
  solo él lo firma).
- **Cero etiquetas demo/placeholder visibles** en la superficie (nombres de versión, títulos, datos).
- **Cero datos basura** de pruebas visibles en la superficie.
- **Matriz de paridad cerrada**: cada capacidad de la app de referencia está construida o descartada con
  firma — ninguna «desaparecida».
Un ítem que no convence NO bloquea con burocracia: se anota como brecha de producto y el humano decide si
entra al release o al backlog — pero queda ESCRITO, nunca en silencio.

## Condición 3 · Verde EN destino
Si el DoD tiene destino cloud: smoke contra el **destino real** (la URL desplegada), jamás la señal proxy
«tests verdes en el entorno que haya» (ref `investigacion:verde-local-no-cierra-slice-con-destino-cloud`).

## Condición 4 · Release real (dueños: división Cambio y Soporte)
`gremio-cambio-release` ejecuta: **tag versionado** + **changelog** + **rollback ENSAYADO** (ejecutado
contra un entorno de prueba — un rollback descrito es una hipótesis, no un plan) + runbook de soporte si
el producto queda operando (`gremio-cambio-soporte`).

## Veredicto y retrospectiva
- Las 4 condiciones en verde → **«CERRADO»**, con la evidencia de cada una delante y la **firma humana**.
- Cualquier condición incompleta → el estado es **«en construcción»** o **«parcial»**, dicho tal cual, con
  los diferidos FIRMADOS (dueño + disparo). La inflación de vocabulario fue el patrón madre de las
  corridas 01–03: este comando la corta.
- **Retrospectiva obligatoria:** ≥1 `/sabio-aprender` o un «sin lección» explícito. El cierre sin
  retrospectiva no cierra el volante.
