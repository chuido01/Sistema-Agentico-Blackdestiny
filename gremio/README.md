# GREMIO — la fábrica agéntica de SABIO

> **GREMIO** = *Gobierno de Roles Especializados, Métodos, Implementación y Orquestación.*
> La agencia de software de IA que construye **sobre** el conocimiento de SABIO.
> **SABIO sabe; GREMIO construye con ese saber.**

## Qué hay en esta carpeta

| Pieza | Qué es |
|---|---|
| `Protocolo GREMIO.md` | El **doc rector**: ciclo de vida de una corrida, artículos del tablero (Plan + DRs), compuertas, orquestación, contratos estándar por dominio (§9) y la compuerta de auditoría de producto terminado (§10). |
| `ROSTER.md` | El **catálogo de los 33 agentes** (1 Factory Management + 8 Líderes + 24 Especialistas), derivado de sus frontmatter. |
| `comandos/` | Fuente de **`/gremio-iniciar`** (la puerta de entrada: triaje «¿merece GREMIO?» → interrogatorio → Plan) y **`/gremio-continuar`** (el motor: tablero → fase → siguiente lote). |
| `compuertas/` | Fuente de **`/gremio-analizar`** (consistencia read-only con severidad) y **`/gremio-converger`** (código-vs-DR, append-only; con modo `--cierre`). |
| `plantillas/` | Las canónicas: `DR.md` (Decision Record), `plan.md` (el Plan del FM), `agente.md`, `runbook.md` (operación). |
| `simulacros/` | Suite de regresión de las compuertas: un tablero sintético con defectos sembrados que las compuertas DEBEN cazar (se corre tras editar cualquier compuerta). |

## Cómo se instala

Los **agentes** (33, en subcarpetas `<División> Gremio/`) y los **comandos** (`/gremio-*`, `/council`)
viven en `entorno-claude/home-claude/` y se despliegan a tu `~/.claude` con `Aplicar-Setup.ps1`
(el mismo instalador del resto del entorno — ver [`INSTALAR.md`](../INSTALAR.md)). Esta carpeta es la
**fuente** del protocolo: si editas un comando o compuerta aquí, re-cópialo a tu `~/.claude/commands/`.

Cada proyecto donde GREMIO opere necesita su **Sala E** (`04-Recursos/05-Decisiones/`) con las
plantillas locales de `DR.md` y `plan.md` — copia las de `plantillas/` (en la instalación privada
original esto lo automatiza el Kit).

## Cómo se usa (el ciclo corto)

1. **`/gremio-iniciar <idea>`** — triaje de peso («¿merece la fábrica o basta la vía simple?»),
   interrogatorio de ≤10 preguntas (tú respondes), y el Factory Management redacta el **Plan** en tu Sala E.
2. Los **Líderes** redactan sus **DR** (decisiones por dominio, citando el conocimiento SABIO); tú los **firmas**.
3. **`/gremio-continuar`** — detecta la fase del tablero y ejecuta el siguiente lote (los Especialistas
   construyen lo firmado; nada más).
4. Compuertas: **`/gremio-analizar`** (consistencia) antes de firmar; **`/gremio-converger`** (código vs
   contrato, entorno vivo incluido) antes de cerrar; `--cierre` exige el mapa DR→evidencia completo.
5. El cierre exige el **slice final de Integración y Endurecimiento**, la retrospectiva (≥1 aprendizaje
   a la Sala D o «sin lección» explícito) y tu **firma** — nada se declara hecho sin evidencia real.

## Estado, con honestidad

Este protocolo es la **versión reformada tras dos corridas adversas** (una fallida-y-corregida y un
producto real clasificado **fracaso**, con veredicto firmado). Las lecciones de esos fracasos son
exactamente los mecanismos que ves aquí: los 4 invariantes, el slice final obligatorio, los contratos
§9 (hardening, credenciales, pipeline, listón visual), la compuerta §10 y los simulacros. **La versión
reformada aún no tiene una corrida real en verde.** Las compuertas y la firma humana existen para que
eso no sea un acto de fe: exige la evidencia, siempre.
