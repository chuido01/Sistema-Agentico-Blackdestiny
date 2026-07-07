---
description: "Puerta de entrada de GREMIO 2.0: interrogatorio de doble pasada → documento de INTENCIÓN (tu tablero, validado contra lo que pediste — no un Plan de fábrica). Incluye auditoría de traducción y matriz de paridad si hay app de referencia. Reemplaza a /gremio-iniciar."
argument-hint: [tu idea o el alcance a intencionar en una frase]
model: opus
gremio: true
---

# /gremio-intencion — la puerta de entrada (idea → intención auditada)

Orquestas el **arranque** de GREMIO 2.0. Tu trabajo es el **relevo de doble pasada**: un subagente no puede
pausar a preguntarle al humano, así que TÚ (sesión principal) haces de puente entre `gremio-auditor-intencion`
y el humano. **El producto es del humano; GREMIO existe para blindarlo, no para construirlo.**

La idea del humano: **$ARGUMENTS**

## Reglas de oro
- **No respondas las preguntas tú** ni infieras las respuestas leyendo el proyecto. Las responde el **humano**.
  Si el proyecto tiene otro producto (cliente, arquitectura, normativa), eso es **a confirmar**, nunca a heredar.
- **Eres el único que invoca agentes** en este arranque; nadie anida (sin Task-en-Task).
- La salida NO es un Plan de fábrica: es `intencion.md` — el tablero del humano, en su lenguaje, con carril
  por ítem. La fábrica no decide qué se construye; registra y audita lo que el humano quiere.

## Pasos

### 0 · Compuertas de entrada (ANTES de invocar a nadie)
- **Límite de WIP:** busca una `intencion.md` VIVA sin cerrar en la Sala E (`04-Recursos/05-Decisiones/`).
  Si existe, pregunta al humano antes de abrir otro tablero.
- **Triaje de servicios — «¿qué piezas de GREMIO merece esto?»:** ya no existe "fábrica completa vs vía
  simple". Evalúa qué servicios aplican: **contratos** (`/gremio-contrato`, si hay decisiones de dominio con
  criterio maquinal), **construcción de plataforma** (`/gremio-construir`, si hay carril plataforma),
  **verificación** (`/gremio-verificar`, casi siempre) y **cierre** (`/gremio-cerrar`, si habrá release).
  La construcción de producto es SIEMPRE guiada con el humano — eso no se tría, es doctrina (lección de la
  corrida 03: la calidad de producto sigue la atención del humano). Presenta la recomendación y **el humano decide**.

### 1 · Pasada 1 — traer el interrogatorio
Si `$ARGUMENTS` viene vacío, pide la idea en una frase y detente hasta tenerla.
Invoca a **`gremio-auditor-intencion`** pasándole **solo la idea** (sin respuestas):
> «Idea: "$ARGUMENTS". Es la PRIMERA pasada: aún no hay respuestas del humano. Devuelve tus ≤10 preguntas
> de alto impacto (incluida SIEMPRE una sobre dirección visual/experiencia si el alcance tiene UI, y una
> sobre apps o versiones de referencia) y NO escribas la intención.»

### 2 · Trasladar las preguntas al humano
Preséntalas **numeradas, tal cual**, y detente a esperar sus respuestas. «No sé / decide tú» es una
respuesta válida — se pasa literal. **Una respuesta-paraguas («todo lo mencionado y otros») NO se acepta
como cerrada:** repregunta para desglosarla ítem a ítem antes de la pasada 2 (así se perdieron seguimiento,
ponderaciones y L1/L2 en la corrida 03).

### 3 · Pasada 2 — redactar la intención + auditar la traducción
Re-invoca a **`gremio-auditor-intencion`** con la idea + las respuestas verbatim. Redacta
`04-Recursos/05-Decisiones/intencion.md` con:
- **Ítems `I-###`**, cada uno con: qué quiere el humano (su lenguaje), **carril** (`producto` = lo percibe
  un usuario, se construye guiado | `plataforma` = criterio maquinal, elegible para `/gremio-construir`),
  y **criterio de cierre** (medible, o explícitamente «percepción del humano»).
- **Auditoría de traducción (obligatoria):** tabla respuesta-del-humano → ítem(es) que la recogen. Toda
  respuesta sin ítem que la traduzca = hallazgo que se resuelve ANTES del visto bueno. Nada se pierde en silencio.
- **Matriz de paridad (si hay app/versión de referencia):** capacidad por capacidad de la referencia →
  `construir` | `descartar`. Cada descarte lleva **firma del humano**. La matriz es parte del tablero y
  `/gremio-cerrar` la exige cerrada.

TÚ escribes además `interrogatorio.md` (traza append-only): idea verbatim, preguntas tal cual, respuestas
verbatim (incluidos los «decide tú»), triaje de servicios y fecha.

### 4 · Visto bueno del humano
Muestra el tablero completo (ítems, carriles, matriz de paridad, auditoría de traducción) y pregunta:
**¿lo apruebas, ajustas o descartas?** Ajustar = volver al paso 3.

### 5 · Repo aislado (si nace producto nuevo)
Producto nuevo = repo git propio y aislado desde el día uno, dentro del estándar de la flota; los datos
confidenciales del proyecto contenedor NUNCA entran al repo del producto.

### 6 · Handoff
- Ítems carril **producto** → **construcción guiada** con el humano (fases cortas, él usa la app en cada tanda).
- Ítems carril **plataforma** → `/gremio-contrato` (si falta la decisión) y `/gremio-construir`.
- Después de cada tramo con riesgo → `/gremio-verificar`. Antes de hablar de release → `/gremio-cerrar`.

## Recordatorio
La intención es del humano y se audita contra sus palabras — no contra lo que la fábrica entendió. Si el
interrogatorio se salta o la traducción no se audita, todo lo de aguas abajo hereda la fuga.
