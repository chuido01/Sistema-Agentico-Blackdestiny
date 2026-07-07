---
description: "GREMIO 2.0: un Líder → un DR → tu firma. Contractualiza UNA decisión de dominio (datos, seguridad, infraestructura, arquitectura) donde el criterio de éxito es maquinal. A demanda — nunca 10 DRs de una vez."
argument-hint: [dominio (datos|seguridad|infraestructura|arquitectura) + el alcance a decidir]
model: opus
gremio: true
---

# /gremio-contrato — contratos a demanda (un Líder, un DR, tu firma)

Contractualizas **una** decisión de dominio. Los contratos existen SOLO donde pagan: cuando el criterio de
éxito se puede escribir como test, consulta o política verificable. Lo que se juzga con los ojos del humano
(dirección visual, UX, completitud percibida) **no se contractualiza** — se construye guiado y se critica
en `/gremio-verificar`.

Pedido: **$ARGUMENTS**

## Dominios con Líder de contrato
`datos` · `seguridad` · `infraestructura` · `arquitectura`. **Diseño NO tiene DR por defecto** — la
dirección visual es del humano (los críticos de diseño actúan en `/gremio-verificar`, contra el design
system que el humano eligió). Desarrollo no tiene Líder: **el líder de desarrollo es el humano**.

## Pasos

### 1 · Contexto (en frío)
Lee `intencion.md` si existe (los ítems del dominio), el `CLAUDE.md` del proyecto (confidencialidad,
servicios prohibidos, hospedaje) y los DRs previos de la Sala E. Si no hay intención escrita, el alcance
de `$ARGUMENTS` basta — pero regístralo en el DR como «intención verbal».

### 2 · El Líder decide
Invoca al **Líder del dominio** (`gremio-lider-datos` | `gremio-lider-seguridad` |
`gremio-lider-infraestructura` | `gremio-lider-arquitectura`) con la intención + su SABIO. Él escribe el
DR `propuesto` en la Sala E con la plantilla de siempre: decisión, porqué, **Contrato** (rutas, primer
test, DoD con destino explícito), **Pre-flight** (dependencias externas a verificar con llamadas reales)
y qué Especialistas ejecutarían si el carril es plataforma. **El Líder decide; no implementa ni invoca agentes.**

### 3 · Consistencia inline (antes de la firma)
TÚ corres las detecciones sobre ESTE DR (read-only): **ambigüedad** (adjetivos sin criterio medible),
**subespecificación** (contrato sin test ejecutable), **conflicto** (contra otro DR, un principio, o una
norma `norma:` MUST — siempre CRITICAL), **política del proyecto** (un DR que despliega a un servicio que
el `CLAUDE.md` prohíbe es CRITICAL — las Reglas son contexto, no control: esta pasada las hace cumplir), y
**cobertura no-funcional del dominio** (hardening/observabilidad/credenciales/pipeline si le tocan).
CRITICAL/HIGH se resuelven antes de pedir firma.

### 4 · Firma con disparo declarado
Presenta el DR al humano para su **firma**, registrando su **disparo**: qué trabajo lo consume
(`/gremio-construir <slice>` o «construcción guiada de I-###»). **Un DR sin disparo cae al vacío** —
no se firma sin disparo.

### 5 · Vida del contrato
Cambios post-firma SOLO por **adenda firmada** o **DR de supersesión**. Jamás sustituir lo firmado por
conveniencia de tooling. `/gremio-cerrar` convergerá el código real contra este contrato.
