# GREMIO 2.0 — la plataforma de rigor de SABIO

> **GREMIO** = *Gobierno de Roles Especializados, Métodos, Implementación y Orquestación.*
> Ya no es una fábrica que construye el producto: es la **plataforma de rigor** que lo blinda.
> **SABIO sabe · el humano construye · GREMIO blinda · COUNCIL delibera.**

## La doctrina, en un párrafo

La evidencia de tres corridas reales lo demostró: **la calidad de lo que un usuario percibe sigue la
atención del humano**, y las compuertas de una fábrica verifican **contratos, no producto percibido** —
un ítem que nunca entró al contrato es invisible por diseño. Por eso en 2.0 **el producto lo construye
el humano, guiado**, y GREMIO se queda con lo que demostró hacer bien: contratos donde el criterio de
éxito es maquinal, construcción solo de **plataforma** (lo que un usuario final no percibe) y una
**verificación adversarial + un cierre honesto** que miran el producto y la intención, no solo el contrato.

## Qué hay en esta carpeta

| Pieza | Qué es |
|---|---|
| `Protocolo GREMIO.md` | El **doc rector v2.0**: los 3 servicios, el ciclo intención→contrato→construcción dual→verificar→cerrar, los 5 invariantes, el vocabulario de «cerrado» (§6) y los entregables estándar por dominio (§9). |
| `ROSTER.md` | El **catálogo de los 33 agentes** (25 activos + 8 congelados): auditor de intención, líderes de contrato, núcleo de verificación, críticos de diseño, cierre y reserva de plataforma. |
| `comandos/` | Fuente de los **5 comandos 2.0**: `/gremio-intencion` (puerta de entrada) · `/gremio-contrato` (un Líder → un DR → tu firma) · `/gremio-construir` (plataforma, con jurisdicción dura) · `/gremio-verificar` y `/gremio-cerrar` (las compuertas). |
| `compuertas/` | Un LEEME: en 2.0 **el comando ES la compuerta** (`/gremio-verificar` y `/gremio-cerrar`); no hay archivos aparte. |
| `plantillas/` | Las canónicas: `intencion.md` (el tablero del humano), `DR.md` (Decision Record), `agente.md`, `runbook.md` (operación). |
| `simulacros/` | **Histórico 1.x**: la suite de regresión de las compuertas retiradas (analizar/converger), conservada como registro del método. Los simulacros 2.0 están pendientes de diseño. |

## Los 3 servicios (el menú)

1. **Contratos a demanda** — `/gremio-contrato <dominio>`: un Líder (datos · seguridad ·
   infraestructura · arquitectura) escribe **un DR** y tú lo **firmas con disparo declarado**. Solo
   donde el criterio de éxito es maquinal. Diseño ya no tiene DR por defecto; el líder de desarrollo
   eres tú.
2. **Construcción de plataforma** — `/gremio-construir`: los Especialistas construyen **solo lo que un
   usuario final no percibe** (migraciones, CI/CD, esquema, auth plumbing, scaffolding, hardening),
   contra un DR firmado. Si el slice toca superficie percibida, **se niega** y te lo devuelve al carril
   guiado.
3. **Verificación adversarial + cierre honesto** — `/gremio-verificar` (read-only: 2º par que refuta,
   pentest, CI desde cero, E2E contra fuente de verdad, performance como gate, críticos de diseño) y
   `/gremio-cerrar` (4 condiciones: convergencia DR→evidencia · **tú recorres el bucle central contra
   `intencion.md`** · verde EN destino · release real con rollback ensayado). Sin las 4, la palabra
   «cerrado» está prohibida.

**La puerta de entrada de todo:** `/gremio-intencion <idea>` — interrogatorio de doble pasada,
auditoría de traducción y matriz de paridad → `intencion.md`, **tu tablero**, validado contra tus
palabras.

## Cómo se instala

Los **agentes** (33 archivos, en `agents/Gremio/<División>/` + `Gremio/_congelados/`) y los **comandos**
(`/gremio-*`, `/council`) viven en `entorno-claude/home-claude/` y se despliegan a tu `~/.claude` con
`Aplicar-Setup.ps1` (el mismo instalador del resto del entorno — ver [`INSTALAR.md`](../INSTALAR.md)).
Esta carpeta es la **fuente** del protocolo: si editas un comando aquí, re-cópialo a tu
`~/.claude/commands/`.

Cada proyecto donde GREMIO opere necesita su **Sala E** (`04-Recursos/05-Decisiones/`) — la crea GREMIO
al operar; las plantillas locales de `intencion.md` y `DR.md` se copian de `plantillas/`.

## Estado, con honestidad

Esta es la **versión 2.0, nacida de la evidencia empírica de 3 corridas reales** (una fallida-y-corregida,
un producto clasificado **fracaso** con veredicto firmado, y una tercera que cerró 7 slices en verde con
el bucle central del producto sin cerrar). La lección madre — *las compuertas verifican contratos, no
producto percibido* — es exactamente lo que ves aquí convertido en mecanismo: la intención auditada, la
jurisdicción dura, la verificación adversarial y el cierre de 4 condiciones. **La 2.0 aún no tiene una
corrida real en verde.** Las compuertas y tu firma existen para que eso no sea un acto de fe: exige la
evidencia, siempre.
