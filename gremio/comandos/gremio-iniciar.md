---
description: "Puerta de entrada de GREMIO: arranca la fábrica con el interrogatorio ANTES del Plan (doble pasada). Invoca a gremio-factory-management con tu idea, te trae ≤10 preguntas, y SOLO con tus respuestas redacta el Plan en la Sala E. Reemplaza el «invoca a gremio-factory-management para construir [idea]»."
argument-hint: [tu idea de producto en una frase]
model: opus
gremio: true
---

# /gremio-iniciar — la puerta de entrada de GREMIO (interrogatorio → Plan)

Orquestas el **arranque** de la fábrica GREMIO. Tu trabajo es el **relevo de doble pasada** del interrogatorio: un subagente no puede pausar a preguntarle al humano, así que TÚ (sesión principal) haces de puente entre `gremio-factory-management` y el humano. **No redactas el Plan ni decides nada tú** — eso es de la fábrica.

La idea del humano: **$ARGUMENTS**

## Reglas de oro
- **No escribas el Plan tú.** Lo escribe `gremio-factory-management`. Tú solo orquestas el relevo.
- **No respondas las preguntas tú** ni infieras las respuestas leyendo el proyecto. Las responde el **humano**. Si el proyecto tiene **otro producto** (cliente, arquitectura, normativa), eso es **a confirmar con el humano**, nunca a heredar.
- **Eres el único que invoca agentes** en este arranque; nadie anida (sin Task-en-Task).

## Pasos

### 0 · Compuertas de entrada (ANTES de invocar a nadie)
- **Límite de WIP (MP-062/M13):** busca un `plan.md` VIVO sin cerrar en la Sala E del proyecto
  (`04-Recursos/05-Decisiones/`). Si existe, **pregunta al humano** antes de abrir otro tablero
  (dos corridas entrelazadas en una Sala E rompen la trazabilidad Plan↔DRs). Continuar la corrida
  viva es `/gremio-continuar`, no esta puerta.
- **Triaje de peso — «¿merece GREMIO?» (MP-094):** evalúa el pedido en 3 ejes — **tamaño** (¿slices
  múltiples y dominios cruzados?), **riesgo** (¿datos sensibles, usuarios reales, cumplimiento?),
  **horizonte** (¿vivirá y evolucionará, o es un tool puntual?). Recomienda honesto:
  - **Fábrica completa** solo si es grande/riesgoso/largo-plazo — la fábrica de 33 agentes es la
    **EXCEPCIÓN**, no el default (lección de la corrida 02: ~2.5M tokens para perder contra un single-file).
  - **Vía simple** (prompting guiado / builder / sesión directa) para lo acotado y de bajo riesgo.
  Presenta la recomendación con su porqué y **el humano decide**. Su decisión queda **registrada en la
  sección «Triaje de peso» del Plan** (si eligió fábrica) — o esta puerta TERMINA aquí (si eligió vía
  simple, dilo y no invoques la fábrica).

### 1 · Pasada 1 — traer el interrogatorio
Si `$ARGUMENTS` viene vacío, pide la idea en una frase y detente hasta tenerla.
Invoca a **`gremio-factory-management`** pasándole **solo la idea** (sin respuestas):
> «Idea: "$ARGUMENTS". Es la PRIMERA pasada: aún no hay respuestas del humano. Devuelve tus ≤10 preguntas de alto impacto y NO escribas el Plan.»

Recibirás una lista de **≤10 preguntas**. Si por error devolvió un Plan, **descártalo** y re-invócalo exigiendo solo las preguntas.

### 2 · Trasladar las preguntas al humano
Presenta las preguntas **numeradas, tal cual**, y **detente a esperar sus respuestas**. No las contestes tú. Si alguna es de opción acotada, puedes usar el selector de preguntas; si son abiertas, pide que las responda en un mensaje. «No sé / decide tú» en una pregunta puntual también es una respuesta válida — la pasas literal.

### 3 · Pasada 2 — redactar el Plan + archivar la traza del interrogatorio
Re-invoca a **`gremio-factory-management`** con la idea **+ las respuestas del humano, verbatim**:
> «Idea: "$ARGUMENTS". Respuestas del humano al interrogatorio: <pega aquí las respuestas>. Ahora SÍ redacta el Plan en la raíz de la Sala E (`plan:<proyecto>`), agnóstico de tecnología, con el índice de DRs acotado (decisión + Líder + FR/SC, nunca el cómo).»

La fábrica escribe el `plan.md` en `04-Recursos/05-Decisiones/`.

**Traza del interrogatorio (MP-042/F15 — A0 auditable por diseño):** en el MISMO paso, TÚ escribes
`04-Recursos/05-Decisiones/interrogatorio.md` con: la **idea original verbatim**, las **preguntas del
FM numeradas tal cual**, las **respuestas del humano verbatim** (incluidos los «no sé / decide tú»),
la **decisión del triaje de peso** (paso 0) y la fecha. Append-only: si el paso 4 fuerza re-pasadas,
se ANEXAN (no se reescribe). Sin esta traza, el Plan no puede demostrar que nació de las respuestas
del humano — el criterio A0 quedó parcial en la corrida 02 exactamente por esto.

### 4 · Visto bueno del Plan (compuerta humana)
Muestra al humano un **resumen** del Plan recién escrito (visión, historias `P#`, `FR/SC`, el índice de DRs) y pregúntale: **¿lo apruebas, ajustas o descartas?**
- **Ajustar:** recoge el cambio y vuelve al paso 3 (re-invoca FM con la corrección).
- **Aprobar:** el Plan queda en pie. Recién aquí continúa el ciclo normal de GREMIO.

### 5 · Repo aislado del producto desde S0 (MP-050/G-07)
Con el Plan aprobado y ANTES del primer slice: el producto nace en su **repo git propio y aislado**
desde el día uno — **dentro del estándar de la flota** (la ubicación la decide el dr:infra; lo
innegociable es: repo del producto ≠ repo del proyecto contenedor, historia trazable commit a commit
desde S0, y **jamás fuera de la estructura de la flota** — crear el producto fuera del estándar rompió
SABIO en la corrida 02, falla estructural #9). La historia git es un activo de due diligence: 107
commits trazables (A) vs 1 (B). Los datos confidenciales del proyecto contenedor NUNCA entran al repo
del producto.

### 6 · Handoff al ciclo
Con el Plan aprobado y el repo aislado creado, el arranque terminó. El ciclo sigue: **`/gremio-continuar`**
(lee el tablero, detecta la fase, ejecuta el siguiente lote con los invariantes) — o manualmente: la
fábrica lanza al **Líder** de cada dominio → cada Líder escribe su **DR** → **`/gremio-analizar`** →
**tu firma** → Especialistas → **`/gremio-converger`** → al final de TODO, **`/gremio-converger --cierre`**
+ retrospectiva. (Esta puerta cubre solo: triaje → idea → interrogatorio → Plan aprobado → repo S0.)

## Recordatorio
«Hecho» = test verde + scan ejecutado + tu firma. Esta puerta garantiza que **el Plan nace de tus respuestas, no de supuestos**. Si se salta el interrogatorio, el Plan es **falsa autoridad**.
