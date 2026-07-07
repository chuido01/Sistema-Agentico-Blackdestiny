<!-- gremio:operacion-local | gen 2 -->

## GREMIO — operación local

> **GREMIO 2.0** es la **plataforma de rigor** del sistema (se gobierna desde tu Centro de Mando). *SABIO sabe; el humano construye; GREMIO blinda.* El producto lo construyes tú (guiado); GREMIO lo blinda desde este proyecto.

**Global (ya disponible si aplicaste el entorno del Kit; no se instala aquí):** los agentes `gremio-*` (1 auditor de intención + 4 Líderes de contrato + núcleo de verificación + críticos de diseño + cierre + reserva de plataforma; 25 activos + 8 congelados) en `~/.claude/agents/Gremio/` y los 5 comandos `/gremio-intencion`, `/gremio-contrato`, `/gremio-construir`, `/gremio-verificar` y `/gremio-cerrar` en `~/.claude/commands/`. Disponibles en cualquier sesión.

**Local (de este proyecto) — los artefactos viven en la Sala E (`04-Recursos/05-Decisiones/`; la carpeta la crea GREMIO en su primera corrida):**
- **`intencion.md`** — **tu tablero**: ítems `I-###` con carril (`producto` = lo percibe un usuario, lo construyes tú guiado | `plataforma` = criterio maquinal), auditoría de traducción y matriz de paridad. Dueño: **tú**; auditor: `gremio-auditor-intencion`.
- **`dr:<dominio>-<n>.md`** — un **DR** por decisión de dominio (datos · seguridad · infraestructura · arquitectura), propiedad del Líder, firmado por ti **con disparo declarado**, en git, inmutable tras la firma (adenda o supersesión, nunca edición).
- **`veredicto-verificacion-*.md`** — los veredictos append-only de `/gremio-verificar` y `/gremio-cerrar`.

**El ciclo:**
1. **`/gremio-intencion [idea]`** — interrogatorio de doble pasada (≤10 preguntas, TÚ respondes) → `intencion.md` con auditoría de traducción y matriz de paridad → tu visto bueno. Producto nuevo = repo propio y aislado.
2. **`/gremio-contrato <dominio>`** — a demanda, una decisión por vez: el Líder escribe el DR y tú lo firmas **con disparo**. Diseño no tiene DR por defecto (la dirección visual es tuya); el líder de desarrollo eres tú.
3. **Construcción dual:** el carril `producto` lo construyes **tú, guiado** (fases cortas; usas la app en cada tanda); el carril `plataforma` va por **`/gremio-construir`** (jurisdicción dura: si el slice toca superficie percibida, se niega y te lo devuelve).
4. **`/gremio-verificar`** — después de cada tramo con riesgo, sobre lo guiado y lo construido por igual: verificación adversarial read-only (2º par que refuta, pentest, CI desde cero, E2E contra fuente de verdad, performance, críticos de diseño). Los fixes son del constructor.
5. **`/gremio-cerrar`** — antes de hablar de release: 4 condiciones (convergencia DR→evidencia · **tú recorres el bucle central contra `intencion.md`** · verde EN destino · release real con rollback ensayado). Sin las 4, «cerrado» está prohibido.

**Lectura de conocimiento:** los agentes leen el plano global **read-only** vía el MCP **`sabio-shared`** (`sabio_get`/`sabio_search`). **Nunca** leen otros proyectos (aislamiento Capa 1). Si `sabio-shared` no está activo aquí, corren como prompts genéricos: acepta su *trust dialog* (`claude mcp list`).

**Diseño y protocolo (no duplicar):** canónico en el repositorio del Kit (**Sistema-Agentico-Blackdestiny**, carpeta `gremio/`); este proyecto no lo duplica.
<!-- /gremio:operacion-local -->
