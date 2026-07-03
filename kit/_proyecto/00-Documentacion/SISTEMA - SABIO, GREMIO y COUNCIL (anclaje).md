<!-- sabio-generacion: 2 -->
# Sistema Agéntico Blackdestiny — SABIO + GREMIO + COUNCIL · anclaje de inicio

> **Léeme al iniciar sesión** para entender el sistema en 2 minutos, desde ESTE proyecto.
> *SABIO sabe; GREMIO construye con ese saber; COUNCIL delibera antes de firmar.*

---

## SABIO — el conocimiento (qué SÉ)
**S**istema de **A**rchivos, **B**óvedas e **Í**ndices **O**rganizados. Gestión de contexto nativa de Claude Code + wiki-bóveda estilo Karpathy, **sin RAG**.

- **Dos capas (arquitectura):** **Capa 1** = aislamiento + gestión de contexto por proyecto; **Capa 2** = la base de conocimiento (wiki LLM). *(No confundir «Capa 1/2» con «Salas».)*
- **Dos planos:** **Local** (este proyecto, su contexto exclusivo) · **Global** (tu Centro de Mando Sabio = referencia canónica transversal, **solo-lectura** vía el MCP `sabio-shared`, si está conectado). Este proyecto **jamás** lee la carpeta de otro proyecto — eso es el aislamiento (Capa 1).
- **Salas (tipos de conocimiento)**, federadas por el **índice de índices** (`04-Recursos/00-INDICE-DE-INDICES.md` — léelo antes de buscar o guardar conocimiento). Regla de oro: **un dato vive en UNA sala; las demás lo referencian por ID, nunca copian.**

| Sala | Qué guarda | Prefijo ID |
|---|---|---|
| **A · Investigación** | la bóveda-wiki local: notas atómicas + MOCs | `investigacion:` |
| **B · Catálogo** | fichas de activos/herramientas del proyecto | `activo:` |
| **C · Referencia** | normas externas — las transversales se resuelven en el **global** | `norma:` |
| **D · Aprendizaje** | lecciones operativas + el buzón de promoción (campos vivos: `estado:` y `aplicado:`) | `aprendizaje:` |
| **E · Gremio** | bitácora de decisiones (DR) — **LOCAL, no se federa** *(la crea GREMIO al operar)* | `dr:` |

- **El volante:** `/sabio-aprender` captura local → `/sabio-promover` tría (con escaneo de hostilidad) y deja un **paquete autocontenido** en el buzón `04-Recursos/04-Aprendizaje/promociones/` → el Centro de Mando lo materializa con OK humano. El estado de federación se **deriva** consultando el global, nunca se anota a mano.

---

## GREMIO — la construcción (qué CONSTRUYO con ese saber)
La **agencia de software de IA** del sistema, disponible en este proyecto si aplicaste el entorno del Kit (los 33 agentes y comandos viven a nivel usuario, `~/.claude/`; no se instala nada local). Una **fábrica de 3 niveles**: el **Factory Management** orquesta → **8 Líderes** deciden (escriben DRs) → **24 Especialistas** ejecutan. Colaboran por el **tablero** de DRs de la **Sala E local** (`04-Recursos/05-Decisiones/`), con compuertas empíricas y **tu firma** (anclada al commit SHA).

- **Arrancar:** `/gremio-iniciar [idea]` — triaje (¿merece la fábrica completa o vía simple?) → interrogatorio ≤10 preguntas → Plan con tu visto bueno → el producto nace en su propio repo.
- **Operar:** `/gremio-continuar` — lee el tablero, ejecuta UN lote y se detiene en tu siguiente compuerta. Compuertas: `/gremio-analizar` (consistencia; CRITICAL/HIGH bloquean) · `/gremio-converger` (código vs DR; `--cierre` exige el mapa DR→evidencia completo).
- **Reglas de oro:** sin firma no está hecho · un DR firmado no se edita, se supera · SABIO es el cerebro (no se duplica) · una corrida activa por proyecto · nunca «no puedo» sin probarlo (pre-flight real) · verde local no cierra un slice con destino cloud.

---

## COUNCIL — la deliberación (qué DECIDO con más ángulos)
`/council` lanza **5 personas** (Pragmático · Escéptico · Explorador · Experto riguroso · Forastero) + un **chairman** que sintetiza exhibiendo el disenso.

- **Cuándo:** decisión reversible/bajo impacto → `/disenar` (1 voz, barato) · decisión de peso o **auditoría de una decisión ya tomada** (p. ej. un DR de alto riesgo pre-firma) → `/council`.
- **Límite honesto:** es HOMOGÉNEO (el mismo Claude con roles; errores correlacionados) — aporta **ángulo**, no exactitud factual. Consenso rápido = punto ciego, no veredicto. Su veredicto se ofrece **persistente** (guardar en `00-Documentacion/` o anexar al DR auditado) solo con tu OK.

---

## Estado operativo — el `_CONTINUIDAD`
Una **iniciativa larga** (multi-sesión) lleva su diario `_CONTINUIDAD <iniciativa>.md`: dónde va · decisiones firmes · siguiente paso. **Se lee primero al retomar.** Nace manual (1 por iniciativa), se actualiza **en el mismo archivo** (no se apilan bloques), y un hook lo refresca tras cada compactación de contexto. No es conocimiento (Salas) ni preferencia (auto-memoria): es el «guardado de partida» del trabajo en curso.

---

## Fuentes de verdad
- **El espinazo local:** `04-Recursos/00-INDICE-DE-INDICES.md` (+ el `LEEME - Esquema` de cada Sala).
- **El plano global:** vía el MCP `sabio-shared` (read-only) — normas transversales, investigación compartida, lecciones promovidas.
- **La guía humana completa del sistema** (los 3 componentes): la documentación del repositorio del Kit (**Sistema-Agentico-Blackdestiny**: carpeta `docs/` y los README de cada componente).
- **Estado vivo del trabajo en curso:** el `_CONTINUIDAD <iniciativa>.md` de la iniciativa activa de este proyecto (si existe).
