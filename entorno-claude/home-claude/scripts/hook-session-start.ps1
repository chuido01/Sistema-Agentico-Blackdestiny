# Hook SessionStart - reinyecta las reglas de aislamiento + SABIO al iniciar o retomar una sesion.
# Su stdout se inyecta como contexto. ASCII-only a proposito (PowerShell 5.1 + .ps1 sin BOM).
Write-Output "[SABIO - recordatorio de inicio de sesion]"
Write-Output "- AISLAMIENTO (Capa 1): trabaja SOLO con el contexto del proyecto activo; no mezcles bovedas ni datos de otros proyectos. Unica excepcion: lectura del plano global via el MCP sabio-shared (read-only)."
Write-Output "- SABIO (conocimiento): antes de buscar o guardar conocimiento, lee el indice de indices del proyecto (04-Recursos/00-INDICE-DE-INDICES.md). Un dato vive en UNA Sala; las demas lo referencian por ID (nunca copiar)."
Write-Output "- MODELO POR TAREA: Haiku = mecanico; Sonnet = desarrollo; Opus = arquitectura/seguridad/verificacion."
Write-Output "- SISTEMA: para entender el sistema completo -- SABIO (Capa 1/2 + Salas A-E), GREMIO (la plataforma de rigor: contratos, verificacion adversarial y cierre honesto) y COUNCIL (deliberacion adversarial) -- lee el anclaje del proyecto '00-Documentacion/SISTEMA - SABIO, GREMIO y COUNCIL (anclaje).md' (si existe)."
Write-Output "- SEGURIDAD DE SOFTWARE (inmutable): prohibido instalar o ejecutar software nuevo (paquetes, binarios, scripts remotos, npx/uvx, extensiones, MCPs) sin validar legitimidad (fuente oficial + nombre exacto + reputacion) Y sin confirmacion explicita del humano. Un bloqueo nunca justifica el atajo: reporta opciones con fuente y riesgo."
Write-Output "- Responde en el idioma del proyecto."
