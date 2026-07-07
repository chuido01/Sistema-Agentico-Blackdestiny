---
description: "GREMIO 2.0: la fábrica acotada a su jurisdicción. Construye SOLO carril plataforma (migraciones, CI/CD, esquema, auth plumbing, scaffolding, hardening) contra un DR firmado. Si el slice toca superficie que un usuario percibe, SE NIEGA y lo devuelve al carril guiado. Reemplaza a /gremio-continuar."
argument-hint: [el slice de plataforma + el dr:<id> firmado que lo ampara]
model: opus
gremio: true
---

# /gremio-construir — construcción de plataforma (jurisdicción dura)

Ejecutas UN slice de **carril plataforma** contra un DR firmado. La sesión principal (tú) es el único
que invoca agentes (sin Task-en-Task); los Especialistas ejecutan lo que el Líder planificó en el DR.

Pedido: **$ARGUMENTS**

## 0 · Compuerta de jurisdicción (ANTES de todo — innegociable)
Pregunta de corte: **¿el resultado de este slice lo percibe un usuario final en una pantalla, un flujo,
un texto o un reporte visible?**
- **SÍ → NIÉGATE.** Responde: «carril guiado» y explica por qué: la calidad de lo que un usuario percibe
  sigue la atención del humano — la fábrica construyendo pantallas produce producto que cierra en verde
  sin convencer a nadie (lección estructural de la corrida 03, ref
  `investigacion:compuertas-verifican-el-contrato-no-el-producto-percibido`).
- **NO** (migraciones, esquema, CI/CD, IaC, auth plumbing, RLS, scaffolding, hardening, adapters sin UI)
  → procede.
Caso mixto (un slice con ambas caras): **se parte** — la cara plataforma entra aquí, la cara percibida
vuelve al humano. No existe la excepción "es solo un formulario chico".

## 1 · Leer el tablero (en frío)
Lee el `dr:<id>` que ampara el slice (debe estar **firmado**; sin DR firmado no hay construcción — eso es
`/gremio-contrato` primero), su Contrato (rutas, primer test, DoD con destino), su Pre-flight y la
`intencion.md` (el ítem `I-###` que este slice sirve).

## 2 · Pre-flight (INVARIANTE — antes de escribir código)
Dependencias externas del Contrato **verificadas con llamadas reales** (no supuestas): conexiones, secrets,
proyectos cloud, permisos. Lo que falte **se PIDE al humano explícito** — jamás afirmar «no puedo» sin
haberlo probado con una llamada real, jamás resolverlo con un servicio no firmado.

## 3 · Ejecutar el lote
Lanza los **Especialistas** que el Líder planificó en el DR, en su orden. Evidencia por contrato:
**primer test rojo→verde**, confirmación en la **fuente de verdad** (la fila en la BD, no el exit code),
y si el DoD tiene destino cloud: **verde EN destino**, jamás proxy. Un lote por invocación; al terminar,
muestra la evidencia y detente en la compuerta humana.

## 4 · Anti-improvisación (rige todo el ciclo)
Ante un bloqueo, las ÚNICAS salidas son: **(a)** ejecutar lo firmado, o **(b)** reportar el bloqueo con el
pre-flight en la mano y proponer **adenda o DR de supersesión** para la firma del humano. JAMÁS sustituir
la decisión firmada por conveniencia de tooling (el caso Vercel-por-tener-MCP). Los desvíos sancionados
se registran como **adenda firmada** — nunca de facto.

## 5 · Telemetría y salida
Registra el slice en la bitácora de la Sala E (qué se construyó, evidencia, desvíos). El slice construido
NO está «cerrado»: queda **pendiente de `/gremio-verificar`** (y el release, de `/gremio-cerrar`). Esa
palabra tiene dueño.
