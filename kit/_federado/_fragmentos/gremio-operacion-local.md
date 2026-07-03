<!-- gremio:operacion-local -->

## GREMIO — operación local

> **GREMIO** es la fábrica agéntica de software del sistema (se gobierna desde tu Centro de Mando). *SABIO sabe; GREMIO construye con ese saber.* Este proyecto puede **invocarla localmente**.

**Global (ya disponible si aplicaste el entorno del Kit; no se instala aquí):** los agentes `gremio-*` (1 Factory Management + 8 Líderes + 24 Especialistas) en `~/.claude/agents/` y los comandos `/gremio-iniciar`, `/gremio-continuar`, `/gremio-analizar` y `/gremio-converger` en `~/.claude/commands/`. Disponibles en cualquier sesión.

**Local (de este proyecto) — los artefactos viven en la Sala E (`04-Recursos/05-Decisiones/`; la carpeta la crea GREMIO en su primera corrida):**
- **`plan.md`** — el **Plan** (`plan:<proyecto>`), dueño: Factory Management. Índice del tablero: visión, historias `P#`, `FR-###`, `SC-###` y la familia de DRs.
- **`dr:<dominio>-<n>.md`** — un **DR** por decisión (propiedad del Líder), enlazados por ID, en git, inmutables tras la firma.

**El ciclo:**
1. **`/gremio-iniciar [idea]`** — triaje (¿merece la fábrica o vía simple?) → interrogatorio (≤10 preguntas) → con tus respuestas, el Factory Management redacta el **`plan.md`** en la raíz de la Sala E (con tu visto bueno).
2. Los **Líderes** de dominio escriben su **DR** (`propuesto`) colgando del Plan y seleccionan sus Especialistas.
3. **`/gremio-analizar`** (read-only) → consistencia Plan↔DRs↔código; CRITICAL/HIGH bloquean.
4. **Tu firma** → el DR pasa a `aceptado` (sin firma, no se ejecuta).
5. El Factory Management materializa a los **Especialistas** → construyen con evidencia real.
6. **`/gremio-converger`** (append-only) → código-vs-DR; luego **tu firma** de cierre.

**Para operar lote a lote:** **`/gremio-continuar`** — lee el tablero (Plan + DRs), detecta la fase, ejecuta **UN** lote y se detiene en tu siguiente compuerta. Es el procedimiento oficial de la corrida.

**Lectura de conocimiento:** los agentes leen el plano global **read-only** vía el MCP **`sabio-shared`** (`sabio_get`/`sabio_search`). **Nunca** leen otros proyectos (aislamiento Capa 1). Si `sabio-shared` no está activo aquí, corren como prompts genéricos: acepta su *trust dialog* (`claude mcp list`).

**Diseño y protocolo (no duplicar):** canónico en el repositorio del Kit (**Sistema-Agentico-Blackdestiny**, carpeta `gremio/`); este proyecto no lo duplica.
