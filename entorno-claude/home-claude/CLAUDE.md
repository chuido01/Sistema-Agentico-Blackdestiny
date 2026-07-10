# Preferencias transversales — <TU NOMBRE / TU PLATAFORMA>

> Instrucciones **de usuario** (siempre cargadas, en cualquier proyecto). Solo lo **transversal**: lo
> específico de un proyecto vive en el `CLAUDE.md` de ESE proyecto.
> **Esto es una PLANTILLA** — ajústala a tu idioma y tu forma de trabajar.

## Comunicación
- **Responde siempre en tu idioma** (estos ejemplos están en español). Identificadores de código, rutas y nombres de archivo pueden quedar en inglés cuando es la convención.

## Modelo por tarea (coste/calidad)
- **Haiku** = mecánico (mover/renombrar, commits, scans). **Sonnet** = desarrollo (código, docs, integración). **Opus** = arquitectura/seguridad/verificación/síntesis.

## Aislamiento entre proyectos (por defecto)
- Cada proyecto trabaja **solo con su propio contexto**; no asumas datos (paletas, marcas, stacks) de otros proyectos ni mezcles sus bóvedas.
- **Única excepción:** lectura del **plano global** vía el MCP `sabio-shared` (compartido por diseño) — nunca de otro proyecto.

## Sistema de conocimiento = SABIO
- **Sin RAG:** gestión de contexto nativa de Claude Code + una bóveda-wiki estilo Karpathy, con el conocimiento **federado en 5 Salas** (A·Investigación · B·Catálogo · C·Referencia · D·Aprendizaje · E·Decisiones/Gremio — **local, nunca se federa**; la crea GREMIO al operar) unidas por el *índice de índices*.
- **2 planos:** conocimiento **local** por proyecto + un **plano global** (Centro de Mando Sabio) que guarda la referencia canónica transversal (`norma:…`) e investigación compartida, accesible **solo-lectura** vía `sabio-shared`.

## Captura de aprendizajes (Sala D)
- Al cerrar un trabajo no trivial, si apareció un *gotcha*, un error ya resuelto o un mejor camino, **ofrece capturarlo** (captura local en la Sala D del proyecto activo): **`/sabio-aprender`** para captura rápida, o **`/sabio-aprender --reflexivo`** cuando haya **feedback externo** que valga analizar (test, ejecución, tu reacción) — infiere la causa antes de guardar (absorbió al antiguo `/sabio-reflector`). No guardes sin tu OK, no interrumpas por nimiedades, ni conviertas la Sala D en bitácora. La salida es `/sabio-promover`.

## Decisiones de diseño — comando `/disenar`
- Ante una **duda de diseño** (¿abstraer o duplicar?, ¿añadir capas o mantener simple?), invoca **`/disenar`**: secuencia KISS/YAGNI → DRY/SOLID/DDD → Clean Arch, **Regla de Tres** como dial y **legibilidad** como desempate.

## Seguridad de software (inmutable — más aún si tu máquina maneja dinero real o datos en producción)
- **Prohibido instalar o ejecutar software sin validación de legitimidad previa + tu confirmación explícita.** Aplica a TODO lo ejecutable: binarios e instaladores, scripts remotos (`curl | sh`, `iex`, `.ps1`/`.bat` descargados), paquetes nuevos (pip/npm/winget/etc.) que el proyecto no use ya — **incluida la ejecución efímera sin instalar** (`npx`, `uvx`, `pipx run`, `pnpm dlx`) —, extensiones, imágenes de contenedor y MCP servers. **Subir de versión un paquete existente por decisión del agente también cuenta** (un release secuestrado es el vector típico de cadena de suministro); reinstalar desde lockfile con versiones ya fijadas (`npm ci`, pins existentes) no.
- **Validación mínima antes de siquiera proponerlo:** (1) fuente oficial verificada — sitio del fabricante o repositorio oficial del autor real; (2) nombre exacto del paquete (descartar typosquatting); (3) señales de legitimidad — mantenimiento activo, reputación, firmas/checksums cuando existan. Si la legitimidad no es demostrable, NO se propone.
- **Un impedimento nunca justifica el atajo:** ante un bloqueo, el agente se detiene y reporta las opciones con su fuente y su riesgo — jamás "resolver rápido" descargando o ejecutando algo por su cuenta. Tu confirmación es requisito SIEMPRE, aunque la herramienta parezca inocua y aunque sea lo único que desbloquea la tarea.
- *(Origen: incidente real — un agente descargó y ejecutó software no legítimo con malware para destrabar una tarea, sin consultar; lo frenó el antimalware local. Esta regla existe para que eso no pueda repetirse.)*
- *(Refuerzo mecánico: la lista `ask` de `settings.json` hace que instaladores y descarga-y-ejecuta te pidan confirmación. Es fricción, no un muro — la barrera de fondo es esta regla.)*

## (Opcional) Tu contrato de trabajo
> Añade aquí cómo quieres que se construya y documente. Ejemplos de reglas útiles:
- **Proporción ante todo.** Lo más pequeño que resuelve el problema; no sobre-construyas.
- **Confirmar la forma antes de construir.** Para algo no trivial, propón la forma y valida con **una muestra** antes de replicar.
- **Mostrar, no afirmar.** No digas "listo/hecho" sin enseñar la prueba real.
- **Honestidad sin adornos.** Si algo falló, falta o se saltó, dilo. Verifica antes de dar números o estados.
