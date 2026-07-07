# Entorno de Claude Code para el Sistema Agéntico Blackdestiny (`home-claude/`)

> Versiona la capa **`~/.claude/`** (la configuración de Claude Code a nivel **usuario**, transversal a
> todos tus proyectos): preferencias, agentes, comandos y hooks. Aplícala en cualquier máquina para
> tener el mismo entorno de trabajo con IA.

## Qué contiene (`home-claude/`)
- `CLAUDE.md` — preferencias transversales (plantilla: ajústala a tu idioma y tu forma de trabajar).
- `settings.json` — permisos y **hooks** de sesión (sin secretos; las rutas usan el marcador `<TU_CARPETA_HOME>`).
- `agents/` — 40 agentes nivel-usuario: 7 transversales (`commit-writer`, `code-reviewer`, `doc-writer`, `research-curator`, `sabio-curator`, `sabio-reflector`, `security-engineer`) + los 33 de GREMIO 2.0 en `Gremio/<División>/` (25 activos + 8 en `Gremio/_congelados/`; ver [`../gremio/ROSTER.md`](../gremio/ROSTER.md)).
- `commands/` — slash commands: `/sabio-aprender` (con su modo `--reflexivo`), `/sabio-promover`, `/sabio-promover-buzon`, `/sabio-converger`, `/memory-lint`, `/disenar`, `/sabio-welcome` (+ alias deprecado `/sabio-reflector`), `/council`, y los 5 de GREMIO 2.0: `/gremio-intencion`, `/gremio-contrato`, `/gremio-construir`, `/gremio-verificar`, `/gremio-cerrar`.
- `scripts/` — hooks: `hook-session-start.ps1` y `continuity-flush.json` (flush de continuidad que se inyecta al reanudar tras una compactación, vía `SessionStart` con matcher `compact`).

## Aplicar el entorno en una máquina nueva
- **Windows:**
  ```powershell
  & .\Aplicar-Setup.ps1
  ```
  Copia `CLAUDE.md` + `agents/` + `commands/` + `scripts/` a `~/.claude/` (respaldando lo que pise).
  `settings.json` **no** se pisa: se genera `~/.claude/settings.from-sabio.json` con las rutas ya
  adaptadas a tu usuario, para que lo **revises y fusiones**.
- **macOS / Linux:** pide a Claude Code que haga lo mismo siguiendo `INSTALAR.md` (copiar las mismas
  carpetas a `~/.claude/` y adaptar los hooks). No hace falta PowerShell.

## Mantener tu copia al día (tras editar agentes/hooks/comandos en `~/.claude/`)
- **Windows:** `& .\Sincronizar-Setup.ps1` captura `~/.claude/{curados}` de vuelta a `home-claude/`. Luego commitea.

## Notas
- **Sin secretos.** Aquí no entran credenciales (`~/.claude/.credentials.json`), `settings.local.json`,
  caches ni sesiones.
- **Hooks multiplataforma.** El hook de inicio es PowerShell (`.ps1`); el flush de continuidad es un
  JSON estático leído con `cat` (bash). En macOS/Linux, Claude puede traducir el `.ps1` a su equivalente
  o puedes omitirlo: son una ayuda (recordatorio de reglas al iniciar y flush de continuidad tras
  compactar), no un requisito.
- **Idempotente y no destructivo:** `Aplicar` siempre respalda antes de pisar (`~/.claude/backups/`).
