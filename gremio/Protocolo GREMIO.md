# Protocolo GREMIO — cómo opera la agencia

> Documento rector de **F2**. Define el ciclo de vida de una decisión, quién posee qué artefacto, las compuertas, la orquestación y el consumo de SABIO. Operativo y autocontenido; el *porqué* y la identidad están en la **Carta Fundacional GREMIO** (`00-Documentacion/Fundacion Gremio/Carta Fundacional GREMIO.md`, congelada).
> Huella: todo artefacto GREMIO lleva `gremio: true`; convenciones `/gremio-*`, `gremio-<rol>`, `dr:<dominio>-<n>`, `plan:<proyecto>`.

## 1. Qué gobierna
Convierte una idea en software profesional mediante una **disciplina de artefactos vivos + compuertas empíricas + firma humana**, no mediante personalidades. **SABIO sabe; GREMIO construye con ese saber.**

## 2. Los artículos del tablero
| Artefacto | Dueño | Equivalente spec-kit | Vive en |
|---|---|---|---|
| **Plan** ([`plantillas/plan.md`](plantillas/plan.md)) | Factory Management (PM/PO) | `spec.md` | raíz de la Sala E del proyecto (como `plan.md`) |
| **DR** ([`plantillas/DR.md`](plantillas/DR.md)) | el **Líder** que decide (DECIDE) | `plan.md` (＋ ciclo de vida) | Sala E `04-Recursos/05-Decisiones/` |
| **Contrato** (sección del DR) | el Líder lo define · el **Especialista** lo ejecuta | `tasks.md` | dentro del DR |

Regla: un dato vive en un artefacto; los demás lo referencian por ID. El Plan enlaza la familia de DRs; los DR se cruzan por `refs`. **Nunca se copia.**

## 3. Ciclo de vida de una decisión
0. **Triaje de peso (`/gremio-iniciar` paso 0 — MP-094):** ANTES de arrancar la fábrica se evalúa si el
   pedido la **merece** (tamaño/riesgo/horizonte). La fábrica completa es la **excepción** (grande/
   riesgoso/largo-plazo); lo acotado va por vía simple. El humano decide; su decisión queda registrada
   en el Plan. También aquí: **límite de WIP** — una corrida activa por proyecto (MP-062).
1. **Idea** → el Factory Management la recibe. **No fija nada todavía** (ni visión, ni `FR/SC`, ni arquitectura).
2. **Interrogatorio (compuerta previa al Plan · doble pasada)** → el FM devuelve **≤10 preguntas de alto impacto** y se **detiene sin escribir el Plan**. Un subagente no puede pausar a preguntar: devuelve las preguntas, la sesión que lo invoca se las traslada al humano y lo **re-invoca con las respuestas**. **Recién con las respuestas** redacta el Plan (historias `P#`, `FR-###`, `SC-###`) en términos **agnósticos de tecnología**. El Plan **nunca** fija arquitectura/stack/cliente/normativa —eso es del Líder en su DR, o es pregunta de este paso. (Destilado de `/clarify`.) **La traza queda como artefacto** (MP-042): `/gremio-iniciar` escribe `interrogatorio.md` en la Sala E (idea + preguntas + respuestas verbatim + triaje de peso) — A0 auditable por diseño. El Plan lleva además el **índice de DRs con columna Disparo** (INVARIANTE 1: todo DR firmado tiene punto de disparo; sin disparo = HIGH en `/gremio-analizar`) y el **slice final obligatorio "Integración y Endurecimiento"** (MP-045: el último kilómetro con DR y dueño propios).
3. **Propuesta** → el **Líder** del dominio crea un **DR** en `estado: propuesto`, citando lo que leyó de SABIO (`fuentes_sabio`), **seleccionando sus Especialistas** (`especialistas:` + «Ejecución por Especialista») y con el **Contrato** completo.
4. **Compuerta `/gremio-analizar`** → consistencia cruzada read-only (Plan ↔ DRs ↔ código). CRITICAL/HIGH bloquean.
5. **Firma** → el humano firma (`firma_humana`). **Solo entonces** el DR pasa a `aceptado`. Sin firma, sigue `propuesto`.
6. **Implementación** → el **Factory Management** lanza a los **Especialistas** que el Líder planificó en el DR; cada uno ejecuta su cláusula del **Contrato** (esqueleto andante: el primer test en verde primero — y el esqueleto **se despliega al destino**, no solo se prueba). **INVARIANTE 2 — Pre-flight:** si el Contrato depende de algo externo (cloud/cuentas/APIs/CLIs/MCPs), ANTES de ejecutar se produce el **inventario verificado** de la sección Pre-flight del DR (probado con llamadas reales; lo que falta se PIDE al humano — jamás se afirma imposibilidad sin probar). **INVARIANTE 4 — Anti-improvisación:** ante bloqueo, las únicas salidas son ejecutar lo firmado o proponer **DR de supersesión** — nunca sustituir la decisión firmada por conveniencia de tooling.
7. **Compuerta `/gremio-converger`** (modo slice) → evalúa código-vs-DR, **append-only**; lo que falta se añade como tareas trazables. Un slice con destino cloud cierra **verde en el destino** (MP-046), jamás con la señal proxy del verde local.
8. **Evolución** → cuando el proyecto muta, **NO se edita** el DR aceptado: nace un **DR nuevo que lo supera** (`supersede`/`superado_por`). Historia preservada (cadena de supersesión + git). Si lo que cambia es un **supuesto de contexto** (p. ej. local→prod) y no la decisión, va como **Adenda de entorno** fechada y firmada en el propio DR (MP-047).
9. **CIERRE de la corrida (INVARIANTE 3 — sin esto no existe "completo"):** `/gremio-converger --cierre` contra el **tablero entero** (mapa DR→evidencia de CADA DR; uno sin evidencia = CRITICAL, cierre bloqueado) → **retrospectiva obligatoria** (MP-065: ≥1 aprendizaje a la Sala D local o "sin lección" explícito con porqué) → **telemetría** consolidada en la bitácora de milestones (MP-058) → veredicto con los Criterios delante + firma humana.

## 4. Compuertas (empíricas, con firma)
- **`/gremio-analizar`** — coherencia y cobertura (incl. tablero con Disparo + filas no-funcionales), read-only, severidad. No escribe. (de `/analyze`.)
- **`/gremio-converger`** — código-vs-contrato, append-only, nunca reescribe. **Dos modos:** slice (default) y **cierre** (`--cierre`, mapa DR→evidencia del tablero entero — obligatorio antes de declarar la corrida completa). Compara también **docs↔producto vivo** y **entorno vivo↔DR de infra/seguridad**. (de `/converge`.)
- **Council adversarial (OPCIONAL — MP-044/G-05):** antes de firmar un **DR de alto riesgo** (arquitectura, seguridad, o lo que el humano juzgue), correr **`/council`** en modo auditoría adversarial sobre la decisión («atácala: por qué fallaría, qué omitió, qué la mejoraría»). Cubre lo que `/gremio-analizar` no mira: la **calidad** de la decisión, no su consistencia. Es el uso de mayor rendimiento medido en el PoC.
- **Anti-auto-aprobación (MP-061/M12):** la evidencia que produce un Especialista la **re-corre otro agente** (Calidad u otro par) antes de marcarse en la Verificación del DR — nunca el mismo que la produjo. «Tu salida la verifica otro» vive en el prompt de todo Especialista.
- **Gate de release (MP-051/G-08):** el DR de release exige **0 hallazgos CRITICAL/HIGH/MEDIUM abiertos** (presupuesto de hallazgos). Los 3 Medios de la corrida 02 habrían bloqueado su cierre.
- **La firma humana** es la compuerta final e innegociable: «hecho» = test en verde + scan ejecutado + tu firma, **anclada al commit SHA** del estado firmado (MP-066). Un DR pulido sin verificación es **falsa autoridad**.

## 5. Orquestación — la fábrica de 3 niveles (sin Task-en-Task)
> **La verdad operativa (MP-041, formalizada tras las 2 corridas):** en runtime, la **SESIÓN PRINCIPAL
> es el EJECUTOR** (invoca agentes, corre compuertas, hace de puente con el humano) y
> **`gremio-factory-management` es el DUEÑO del Plan** (lo redacta, prioriza y mantiene). El motor de la
> ejecución es **`/gremio-continuar`**: lee el tablero, detecta la fase y ejecuta el siguiente lote con
> los 4 invariantes integrados (cobertura DR↔disparo · pre-flight · convergencia de cierre ·
> anti-improvisación) — la corrida no depende de la pericia del operador. **Modelo por nivel de decisión
> (MP-043):** FM + 8 Líderes = `model: opus` (deciden); 24 Especialistas = `model: sonnet` (ejecutan).
- **`gremio-factory-management` es el ÚNICO que define los lotes del fan-out** (qué agente, con qué encargo, en qué orden); la **sesión principal los materializa** (verdad operativa de arriba). **Nadie anida**: ni los Líderes ni los Especialistas invocan a otros.
- **Nivel fábrica:** del Plan, el Factory Management lanza al **Líder** de cada dominio que la idea requiere.
- **Nivel división:** cada **Líder DECIDE** su dominio y **planifica** (no ejecuta) en su DR qué **Especialistas** participan (`especialistas:` + «Ejecución por Especialista»). Tras la **firma**, el Factory Management lee ese DR y **lanza a los Especialistas** seleccionados, en el orden indicado.
- Los agentes **no chatean entre sí**: colaboran por el **tablero** de DRs (*blackboard*), arrancando **en frío** (solo ven su prompt + lo que leen del disco: Plan, DRs, SABIO).
- La «**micro-orquestación del dominio**» es el **plan que el Líder escribe en el DR**; el Factory Management la **materializa**.

## 6. Consumo de SABIO (read-only · on-demand · solo plano global)
| Líder | Lee (Sala A · MOC del dominio) |
|---|---|
| Arquitectura | `investigacion:arquitectura-software-moc` (8 arq · matriz · Premium · migración) |
| Base de Datos | `investigacion:bases-de-datos-moc` (familias · modelado · ACID/CAP · escalado · DBaaS) |
| Seguridad | Sala C `norma:` (GDPR/HIPAA/CIS/NIST/ASVS · base Chile) + Sala A `investigacion:seguridad-moc` |
| Desarrollo | `investigacion:desarrollo-moc` (roles · SDLC · metodologías · stacks · código elegante) |
| Diseño y Experiencia | `investigacion:diseno-ux-ui-moc` (UX/UI/IxD · tokens · color · accesibilidad) |
| Calidad y Pruebas | `investigacion:calidad-pruebas-moc` (tipos/niveles · estrategia · automatización · performance) |
| Infraestructura | `investigacion:infra-devops-moc` (cloud · IaC · contenedores · observabilidad · FinOps) + cruza `investigacion:matriz-arquitectura-plataforma` |
| Gestión del Cambio y Soporte | `investigacion:cambio-soporte-moc` (release · ITIL · soporte L0-L4 · SLA/OLA) |
| Todos | `investigacion:decision-equilibrio-principios-diseno` + aprendizajes Sala D relevantes |

> **8/8 dominios poblados y cableados (2026-06-29):** los 33 agentes citan IDs SABIO concretos de su dominio (134 únicos, 0 rotos). El detalle por agente vive en cada `.md` de `~/.claude/agents/<División> Gremio/`.

Nunca lee bóvedas/datos de **otros** proyectos (aislamiento Capa 1). Escribe de vuelta: gotchas → Sala D local (auto-aprendizaje), promovible por `/sabio-promover`.

## 7. Aislamiento (Capa 1 · sagrado)
Cada agente corre **local** en el proyecto; lee el plano global **solo-lectura** vía `sabio-shared`; **nunca** mezcla contexto entre proyectos. El Plan y los DR nacen y mueren locales.
> **Alcance por producto (intra-proyecto):** un proyecto puede tener **varios productos**. Los "Hechos estables" del `CLAUDE.md` y las notas Sala A de **otro** producto —su cliente, arquitectura, normativa— son **contexto a confirmar en el Interrogatorio, no verdad a heredar**. No mezclar **productos** dentro del mismo proyecto es tan obligatorio como no mezclar **proyectos**.

## 8. Huella y convenciones
- Comandos `/gremio-*` · agentes en `~/.claude/agents/<División> Gremio/` con nombres `gremio-factory-management` · `gremio-lider-<dominio>` · `gremio-<dominio>-<especialista>` (escaneo **recursivo** verificado; la identidad viene **solo** del campo `name:`, que debe ser **único global** — colisión = descarte silencioso) · DR `dr:<dominio>-<n>` · Plan `plan:<proyecto>`.
- Los **comandos no se namespacean** por subcarpeta: el prefijo `/gremio-*` los distingue.
- Las **compuertas** `/gremio-analizar` y `/gremio-converger` están **instaladas como comandos** en `~/.claude/commands/` (runtime), con **fuente** en `gremio/compuertas/` de este repo; **re-copiar tras editar la fuente**. Siguen siendo *plantillas de prompt, no software* (F1): el comando ES la plantilla invocable.
- La **puerta de entrada** `/gremio-iniciar [idea]` es el arranque oficial de la fábrica (reemplaza el «invoca a `gremio-factory-management` para construir [idea]»): triaje de peso + WIP → **relevo de doble pasada** del Interrogatorio (sesión principal hace de puente humano↔FM) + **traza a `interrogatorio.md`** → **compuerta de visto bueno del Plan** → repo aislado S0. El **motor de continuación** es `/gremio-continuar` (tablero → fase → lote, con los invariantes). **Fuente** de ambos en `gremio/comandos/`; copia runtime en `~/.claude/commands/`; **re-copiar tras editar la fuente**.
- El **catálogo del roster** (`gremio/ROSTER.md`) es la tabla generada de los `description:` de los 33 agentes — el menú que el Líder consulta para seleccionar Especialistas sin abrir 24 archivos. **Derivado, no fuente:** se regenera desde el frontmatter de los agentes tras cambiar cualquiera.
- Las **plantillas de artefacto** `DR.md`/`plan.md`/`agente.md`/`runbook.md` tienen su **fuente única** en `gremio/plantillas/` de este repo; cada proyecto recibe su copia local de `DR.md`/`plan.md` en su Sala E (`05-Decisiones/_plantillas/`) — **re-copiar tras editar la fuente**.
- Todo artefacto lleva `gremio: true` en su cabecera.

## 9. Contratos estándar por dominio (las normas nacidas del fracaso de la corrida 02)

> Lo que el DR de cada dominio DEBE contener de serie — el Líder los incorpora al redactar; `/gremio-analizar`
> (filas no-funcionales) y `/gremio-converger` (entorno vivo) los verifican. El porqué vive en el veredicto
> firmado de la corrida 02 (bitácora interna, no publicada) y en la investigación de la Sala A (cluster del fracaso).

**dr:seguridad — entregables estándar:**
- **Hardening remoto (MP-067):** cabeceras de protección **versionadas** (`_headers`/CSP/HSTS/X-Frame·frame-ancestors/nosniff/Permissions-Policy) con **verificación viva por curl** contra la URL real · **advisors del proveedor = 0 ERROR** como gate del release · **CORS con allowlist** de origins en prod (no `*`) · **pentest re-ejecutado contra el entorno cloud** como entry criterion del release (la RLS es portable; el gateway y las keys no).
- **Ciclo de vida de credenciales (MP-068):** checklist de los **5 flujos** — alta · cambio de contraseña · recupero · revocación de sesiones · expiración de temporales. **Sin los 5, no hay v1 multi-usuario.** Ningún supuesto "local" sobrevive al deploy sin Adenda de entorno (MP-047).
- **Config de Auth de producción versionada o declarada (MP-053/G-15):** HIBP/leaked-password, largo mínimo, confirmaciones — si el dashboard no es versionable, **snapshot documentado en el repo con fecha**.
- **Superficie de producción limpia (G-13):** ningún artefacto de test en el bundle final (hooks `window.__*`, credenciales demo, flags) — verificable con grep sobre `dist/`.
- **Estándar de edge functions (MP-052/G-14):** validación **server-side** de fortaleza de contraseñas · errores 500 **sin detalles internos** (`e.message` prohibido en la respuesta) · CORS allowlist.
- **GRANT mínimo en helpers SQL (MP-054/G-16):** nada concedido a `anon` que sea de `authenticated`, aunque devuelva NULL.

**dr:infra — entregables estándar (MP-069):**
- **Pipeline con tests como gate:** el CI corre mínimo **unit + integration** (backend efímero en el runner o service container) antes de cualquier deploy — nunca "build + lint" a secas.
- **"El primer push queda verde antes de cerrar el slice"** (G-17): conectar el CI/CD y demostrar UNA corrida end-to-end verde ES parte del entregable. Un pipeline declarado y nunca verde no es un pipeline (ref `investigacion:pipeline-declarado-no-es-pipeline-hasta-el-primer-verde-real`).
- **Smoke de compatibilidad del toolchain** (G-19): la versión pineada del CLI parsea el config del repo (el drift pin↔config rompió el único run de la corrida 02).
- **Credencial de smoke dedicada obligatoria** (G-22): usuario no-admin en org de prueba + secrets `SMOKE_*` — el smoke post-deploy con login real siempre corre.
- **Observabilidad mínima de serie (MP-055/G-20):** error-tracking gratuito o, como piso, alerta sobre logs nativos **con dueño asignado en el RUNBOOK**. "Sin stack" solo vale firmado como adenda.
- **Runbook de operación** según la plantilla (`plantillas/runbook.md` — MP-060): operar · monitorear · apagar (incl. teardown como contrato) · restaurar (restore ensayado).

**dr:calidad — entregables estándar:**
- **Una pasada VERDE de la suite completa, demostrada y archivada** antes del release (G-24): el reporte de ejecución es evidencia en el repo, no una inferencia.
- **Matriz de navegadores adaptada al runner (MP-057/G-23):** si un navegador no corre en el entorno (spawn UNKNOWN), la matriz lo **sustituye o lo corre en CI Linux** — nunca "deseable que jamás corre".

**dr:cambio — entregables estándar (MP-056/G-21):**
- **Versionado y releases del producto:** v1 nace **`1.0.0`** con **CHANGELOG** y **tag** (rollback direccionable por tag, no solo por dashboard); los `0.0.x-sN` internos por slice **no llegan** al repo del producto.

**dr:diseno — entregables estándar (MP-070/071/072 — decisión del propietario 2026-07-02):**
- **Listón visual FIRMADO ANTES de construir (MP-070/G-29):** doble ancla — (1) el **piso de casa** (permanente): los 7 pilares del dominio `dashboards` de la Sala A global + estándar **bento/KPI** + **densidad mínima por dominio** (MP-072: un producto de tableros exige **≥6 visualizaciones con datos reales** — el nivel del benchmark de referencia del propietario; B entregó 1 y perdió); y (2) el **benchmark concreto de ESTA corrida** (screenshots/mockup aprobados) **firmado por el humano en el DR (nombre · fecha · SHA) antes del primer slice**. El especialista UI entrega **screenshots comparados contra piso+benchmark en CADA slice**. La estética que no es contrato queda a criterio de nadie (ref `investigacion:liston-visual-se-firma-antes-de-construir`).
- **Design tokens ricos de serie (MP-071/G-30):** theming claro/oscuro, acentos semánticos, sistema de notificaciones (toasts/píldoras), densidad de KPIs — como base del design system del DR, **manteniendo el estándar WCAG** que la fábrica ya domina.
- **Biblioteca de patrones como punto de partida (MP-073/G-32):** el DR de diseño consulta `activo:biblioteca-patrones-visuales` (Sala B) — ningún producto parte de cero estético.

**dr:datos — entregable estándar (MP-075/G-26):**
- **Seed demo COMPLETO:** los datos de demostración ejercitan **TODAS** las features del producto (una feature no demostrable con el seed es una feature no demostrada; la tendencia de B era invalidable con 1 evaluación).

**dr:calidad — entregables estándar adicionales (MP-074/076):**
- **Test de consistencia transversal UI↔datos (G-25):** los denominadores/cifras que muestra la UI salen del **catálogo completo**, no del row-set parcial de las vistas (el heatmap de B mostraba "0/0" en categorías sin evaluar).
- **Gate de calidad del reporte exportado (G-27):** revisión visual del PDF/Excel generado contra una **muestra aprobada** — aspect ratio de charts FIJO, tipografías, márgenes.

**dr:desarrollo — DoD del frontend (MP-077/G-28):**
- **Checklist de pulido de superficie como criterio de CIERRE:** favicon · título/meta · estados vacíos con copy · **consola con 0 errores**. (A cerró con 0; B con 1 — y se nota.)

**Normas documentales de fábrica (MP-087/G-33/G-34 — rigen TODO producto):**
- **Los README describen el PRODUCTO; los DRs describen el PROCESO.** El README raíz del producto refleja el **estado final vivo** (URL real, stack, cómo correr TODO) — jamás la narrativa del slice en que se escribió (ref `investigacion:documentacion-espejo-del-producto-no-del-slice`).
- **Consolidación documental al cierre con dueño único:** el slice final (MP-045) incluye la pasada del **doc-writer** que reescribe los README al estado real y elimina la narrativa por slice.
- **Defectos con ciclo de vida sincronizado:** cerrar un `DEF-xxx` actualiza README/DR afectados **en la misma entrega** (un DEF "abierto" en el README con su test de cierre al lado = drift). Los gotchas resueltos van a la Sala D (`/sabio-aprender`) y se promueven si son transversales.
- **Enforcement:** `/gremio-converger` evalúa docs↔producto-vivo SIEMPRE (doc desactualizada = brecha `partial`).

## 10. Compuerta "Auditoría de Producto Terminado" (MP-078/G-02 — pre-v1)
Antes de declarar **v1** de cualquier producto: el mini-protocolo de **4 pilares** (código · utilidad
y visual · seguridad remota · profesionalismo/operación) se ejecuta con evidencia empírica —
como **WF-2** (un agente por pilar + verificación adversarial) o a mano — usando la plantilla canónica
`00-Documentacion/Auditorias/_plantilla.md` del CDM. **El humano firma el veredicto**
(Promover / Parcial / Volver al taller). Cadencia además **trimestral** sobre los productos vivos (M25).
