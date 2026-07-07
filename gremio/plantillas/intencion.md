---
# ─────────── Huella GREMIO 2.0 · INTENCIÓN (el tablero del humano) ───────────
# Plantilla canónica. Copia a la raíz de la Sala E del proyecto: 04-Recursos/05-Decisiones/intencion.md
# La redacta gremio-auditor-intencion a partir del interrogatorio de doble pasada (/gremio-intencion);
# el DUEÑO es el humano: se valida contra SUS palabras, no contra lo que la fábrica entendió.
id: intencion:<proyecto-o-producto>
proyecto: <nombre>
fecha: <AAAA-MM-DD>
estado: viva                      # viva — se actualiza por append/adenda, nunca reescritura silenciosa
visto_bueno_humano: ""            # "<nombre> · <AAAA-MM-DD>" — sin esto la intención no gobierna nada
interrogatorio: interrogatorio.md # la traza append-only (idea + preguntas + respuestas verbatim)
gremio: true
---

# Intención — <producto>

> Dueño: **el humano**. Auditor: `gremio-auditor-intencion`. Este tablero es lo que `/gremio-cerrar`
> usa en su condición 2 (producto percibido): el humano recorre el bucle central **contra este archivo**,
> no contra los DRs. Regla: toda respuesta del humano tiene un ítem que la traduce o un descarte firmado
> — **nada se pierde en silencio**.

## La idea (verbatim del humano)
<!-- La frase original, sin traducir. -->

## Ítems de intención

<!-- Un ítem por capacidad/resultado que el humano quiere. Carril:
     producto   = lo percibe un usuario final → se construye GUIADO con el humano
     plataforma = criterio de éxito maquinal → elegible para /gremio-construir bajo DR firmado
     Criterio de cierre: medible, o explícitamente «percepción del humano» (solo él lo firma). -->

| ID | Qué quiere el humano (su lenguaje) | Carril | Criterio de cierre | Estado |
|---|---|---|---|---|
| I-001 | <…> | producto \| plataforma | <medible, o «percepción del humano»> | abierto |
| I-002 | <…> | | | |

## Auditoría de traducción (obligatoria — la firma de oficio del auditor)

<!-- Tabla respuesta-del-humano → ítem(es) que la recogen. Toda respuesta sin ítem = hallazgo abierto
     que BLOQUEA el visto bueno. Una respuesta-paraguas («todo lo mencionado y otros») no es traducible:
     se repregunta y se desglosa ítem a ítem ANTES de darla por cerrada. -->

| # | Respuesta del humano (resumen fiel) | Ítem(s) que la traducen | Estado |
|---|---|---|---|
| R1 | <…> | I-001 | traducida |
| R2 | <…> | — | **HALLAZGO: sin ítem** |

## Matriz de paridad (si hay app/versión de referencia)

<!-- Capacidad por capacidad de la referencia → construir | descartar. CADA descarte lleva firma del
     humano. /gremio-cerrar exige esta matriz CERRADA: ninguna capacidad «desaparecida». -->

Referencia: <app o versión>

| Capacidad de la referencia | Destino | Ítem / Firma del descarte |
|---|---|---|
| <…> | construir | I-00X |
| <…> | descartar | "<nombre> · <AAAA-MM-DD> · <porqué en una frase>" |

## Índice de contratos sugeridos

<!-- Solo la decisión pendiente y su porqué — jamás el cómo (eso sesga al Líder). -->

| Dominio | Decisión pendiente | Porqué | DR resultante |
|---|---|---|---|
| datos \| seguridad \| infraestructura \| arquitectura | <…> | <…> | dr:<dominio>-<nnn> |

## Triaje de servicios (qué piezas de GREMIO merece este pedido)

- [ ] `/gremio-contrato` — hay decisiones de dominio con criterio maquinal: <cuáles>
- [ ] `/gremio-construir` — hay carril plataforma: <qué ítems>
- [ ] `/gremio-verificar` — (casi siempre) tras cada tramo con riesgo
- [ ] `/gremio-cerrar` — habrá release/hito
- **Construcción de producto: SIEMPRE guiada con el humano** (doctrina 2.0 — no se tría).

## Adendas (append-only)

<!-- Ajustes de alcance posteriores al visto bueno: fecha + qué cambió + firma. Nunca se reescribe lo anterior. -->
