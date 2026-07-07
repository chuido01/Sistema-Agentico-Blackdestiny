# Protocolo GREMIO v2.0 — la plataforma de rigor

> **Versión 2.0 · 2026-07-06.** Reescrito conforme al **blueprint de reconversión firmado por el
> propietario (2026-07-06)** tras la retrospectiva auditada de la corrida 03. Causa raíz de la
> reconversión: `investigacion:compuertas-verifican-el-contrato-no-el-producto-percibido` (plano
> global, Sala A). La identidad y la historia fundacional viven en la Carta Fundacional GREMIO
> (documento interno de la instalación original; no se publica). El protocolo 1.x completo queda en
> el **historial git de este repo**.
> Huella: todo artefacto GREMIO lleva `gremio: true`; convenciones `/gremio-*`, `gremio-<rol>`, `dr:<dominio>-<n>`, `I-###`.

## 1. Qué es GREMIO 2.0

GREMIO se reconvierte de **fábrica constructora** a **plataforma de rigor**. La premisa que cambió:
**el producto lo construye el humano, guiado** — la calidad de lo que un usuario percibe sigue la
atención del humano (evidencia empírica de las corridas, ver §10). GREMIO ya no compite con esa
construcción; la **blinda**. Lo que GREMIO aporta es lo que el desarrollo guiado gana tarde y a golpe de
incidente: **anticipar el rigor al día 1** — contratos verificables, verificación adversarial
independiente y un cierre que no se puede inflar.

**SABIO sabe; el humano construye; GREMIO blinda.**

## 2. Los 3 servicios

| Servicio | Comando | Qué hace |
|---|---|---|
| **1 · Contratos a demanda** | `/gremio-contrato <dominio>` | Un Líder (datos · seguridad · infraestructura · arquitectura) → **un DR** → **firma humana con disparo declarado**. Solo donde el criterio de éxito es maquinal (test, consulta, política verificable). **Diseño ya NO tiene DR por defecto** (la dirección visual es del humano); **el líder de desarrollo es el humano**. A demanda — nunca 10 DRs de una vez. |
| **2 · Construcción de plataforma** | `/gremio-construir` | Especialistas construyen **SOLO lo que un usuario final NO percibe** (migraciones, CI/CD, esquema, RLS, auth plumbing, scaffolding, hardening) contra un DR firmado. **Compuerta de jurisdicción dura:** superficie percibida → se niega y vuelve al carril guiado. Pre-flight con llamadas reales + anti-improvisación (adenda firmada). |
| **3 · Verificación adversarial + cierre honesto** | `/gremio-verificar` y `/gremio-cerrar` | **Verificar** (el corazón): read-only sobre trabajo YA hecho — guiado o construido —; 2º par que REFUTA, pentest si tocó authz/RLS, CI desde cero si tocó migraciones, E2E con control positivo pareado + confirmación en fuente de verdad, performance p50/p95/p99 como gate, críticos de diseño contra el design system del humano + WCAG; hallazgos con severidad, veredicto append-only en la Sala E. **Cerrar**: las 4 condiciones innegociables (§6). |

Puerta de entrada de todo: **`/gremio-intencion`** (§3, paso 1).

## 3. El ciclo (intención → contrato → construcción dual → verificar → cerrar)

1. **`/gremio-intencion [idea]`** — interrogatorio de **doble pasada** (el auditor devuelve ≤10 preguntas,
   el humano responde, recién entonces se traduce) → **`intencion.md`**: ítems `I-###` con **carril**
   (`producto` = lo percibe un usuario, se construye guiado | `plataforma` = criterio maquinal) y
   **criterio de cierre** por ítem. Incluye la **auditoría de traducción** respuesta→ítem (nada se pierde
   en silencio) y la **matriz de paridad** contra apps de referencia (cada descarte, firmado). Triaje de
   **servicios** (qué piezas de GREMIO merece el pedido) — ya no existe «fábrica completa vs vía simple».
   Traza en `interrogatorio.md`. Producto nuevo = **repo git propio y aislado** desde el día uno.
2. **`/gremio-contrato <dominio>`** — para cada decisión de dominio que lo amerite: el Líder escribe el DR
   (`propuesto`) con Contrato, Pre-flight y Especialistas; consistencia inline (ambigüedad,
   subespecificación, conflicto contra normas `norma:` MUST, **política del proyecto** — un DR que
   despliega a un servicio que el `CLAUDE.md` prohíbe es CRITICAL); **firma humana con disparo declarado**
   (un DR sin disparo no se firma).
3. **Construcción dual:**
   - Carril **producto** → **construcción guiada por el humano** (fases cortas; él usa la app en cada
     tanda). GREMIO no construye pantallas.
   - Carril **plataforma** → **`/gremio-construir`** contra el DR firmado: compuerta de jurisdicción
     (paso 0, innegociable; caso mixto se parte), pre-flight verificado con llamadas reales, lote de
     Especialistas, evidencia rojo→verde + fuente de verdad + verde EN destino si el DoD es cloud.
4. **`/gremio-verificar`** — después de cada tramo con riesgo, sobre lo guiado y lo construido por igual.
   Read-only estricto; los fixes son del constructor. Veredicto `veredicto-verificacion-<AAAAMMDD>.md`
   append-only en la Sala E.
5. **`/gremio-cerrar`** — antes de hablar de release: las 4 condiciones (§6) + retrospectiva obligatoria
   (≥1 `/sabio-aprender` o «sin lección» explícito con porqué).

**Evolución de un DR firmado:** nunca se edita — **adenda firmada** (cambio de supuesto de entorno) o
**DR de supersesión** (`supersede`/`superado_por`). Historia preservada (cadena + git).

## 4. Los 5 comandos

| Comando | Rol en 2.0 | Reemplaza a |
|---|---|---|
| `/gremio-intencion` | Puerta de entrada: idea → `intencion.md` auditado | `/gremio-iniciar` |
| `/gremio-contrato` | Un Líder → un DR → firma con disparo | (nuevo; antes lo hacía el fan-out del Plan) |
| `/gremio-construir` | Construcción de plataforma con jurisdicción dura | `/gremio-continuar` |
| `/gremio-verificar` | Verificación adversarial read-only (compuerta) | `/gremio-analizar` (lo absorbe) |
| `/gremio-cerrar` | Cierre honesto de 4 condiciones (compuerta final) | `/gremio-converger` |

**Fuente en este repo:** `gremio/comandos/` (los 5). **Runtime:** `~/.claude/commands/` — se despliegan
con el instalador del entorno (ver [`README.md`](README.md)); re-copiar tras editar la fuente. Las
**compuertas** de 2.0 son `/gremio-verificar` y `/gremio-cerrar` (ver `compuertas/LEEME.md`; ya no hay
archivos aparte — el comando ES la compuerta). Los 4 comandos 1.x quedan en el historial git de este repo.

## 5. Invariantes 2.0 (los cinco; sin ellos no hay GREMIO)

1. **Cobertura de intención con matriz de paridad.** Todo lo que el humano pidió (o dio por implícito y
   se desglosó en el interrogatorio) tiene un ítem `I-###` que lo traduce, o un descarte firmado. La
   auditoría de traducción es obligatoria; la matriz de paridad contra la app de referencia se cierra en
   `/gremio-cerrar`. *Lo que no entra a la intención es invisible para todo lo de aguas abajo — esta es
   la cura de la ceguera heredada de la corrida 03.*
2. **Jurisdicción.** GREMIO construye SOLO carril plataforma (lo que un usuario final no percibe). La
   superficie percibida es del humano guiado — la compuerta del paso 0 de `/gremio-construir` se niega y
   devuelve, sin excepción «es solo un formulario chico».
3. **Evidencia en fuente de verdad y en destino.** Un assert de ausencia exige control positivo pareado +
   confirmación en la fuente de verdad (la fila en la BD, no el exit code). Un DoD con destino cloud
   cierra verde EN el destino, jamás con la señal proxy del verde local. Migraciones se prueban
   **desde cero** (reset + arranque limpio), no contra el dev vivo.
4. **Producto percibido.** El verde de compuerta ⇏ producto usable: además de la convergencia
   DR→evidencia, **el humano recorre el bucle central de punta a punta contra `intencion.md`** — cero
   etiquetas demo, cero datos basura, matriz de paridad cerrada (condición 2 de `/gremio-cerrar`).
5. **Anti-improvisación.** Ante bloqueo, las únicas salidas son ejecutar lo firmado o proponer **adenda /
   DR de supersesión** para firma — jamás sustituir la decisión firmada por conveniencia de tooling.
   El pre-flight verifica dependencias externas **con llamadas reales** antes de escribir código; lo que
   falta se PIDE al humano, nunca se afirma imposibilidad sin probar.

## 6. El vocabulario de «cerrado» (tiene dueño)

La palabra **«cerrado»** la emite SOLO `/gremio-cerrar`, con las **4 condiciones** en verde y la firma
humana delante:

1. **Convergencia DR→evidencia de TODOS los DRs firmados** (append-only; un DR sin evidencia = CRITICAL,
   cierre bloqueado; brechas `missing`/`partial`/`contradicts`/`unrequested` reportadas, jamás borradas;
   docs espejo del producto vivo).
2. **Producto percibido:** el humano recorrió el bucle central contra `intencion.md` — cero etiquetas
   demo/placeholder, cero datos basura, matriz de paridad cerrada. Un ítem que no convence queda ESCRITO
   (brecha de producto), nunca en silencio.
3. **Verde EN destino** (smoke contra la URL real desplegada, si el DoD es cloud).
4. **Release real:** tag versionado + changelog + **rollback ENSAYADO** (ejecutado contra un entorno de
   prueba — un rollback descrito es una hipótesis) + runbook si el producto queda operando.

Cualquier condición incompleta → el estado es **«en construcción»** o **«parcial»**, dicho tal cual, con
los diferidos FIRMADOS (dueño + disparo). Estados intermedios: un slice construido queda **«pendiente de
verificar»**; un verificado limpio queda **«verificado»**, no cerrado. La **inflación de vocabulario fue
el patrón madre de las corridas 01–03**; este glosario la corta.

## 7. Artefactos del tablero (Sala E del proyecto)

| Artefacto | Dueño | Vive en |
|---|---|---|
| **`intencion.md`** (plantilla en [`plantillas/intencion.md`](plantillas/intencion.md)) | **el humano** (lo redacta y audita `gremio-auditor-intencion`) | raíz de la Sala E (`04-Recursos/05-Decisiones/`) |
| **`interrogatorio.md`** (traza append-only) | la sesión que corre `/gremio-intencion` | Sala E |
| **DR** ([`plantillas/DR.md`](plantillas/DR.md)) | el **Líder** que decide; firma humana con disparo | Sala E |
| **Contrato / Pre-flight / Adendas** | secciones del DR | dentro del DR |
| **Veredictos** (`veredicto-verificacion-*.md`, cierre) | `/gremio-verificar` y `/gremio-cerrar` (append-only) | Sala E |
| **RUNBOOK** ([`plantillas/runbook.md`](plantillas/runbook.md)) | división Cambio y Soporte | junto al producto, en git |

Regla de oro: un dato vive en un artefacto; los demás lo referencian por ID (`I-###`, `dr:<dominio>-<n>`).
**Nunca se copia.** El Plan de fábrica 1.x (`plan.md`) ya no existe: su lugar lo ocupa `intencion.md`
(el tablero del humano, en su lenguaje, validado contra lo que pidió).

## 8. Roster y orquestación (sin Task-en-Task)

- **La sesión principal es el único ejecutor**: invoca agentes, corre los comandos, hace de puente con el
  humano. Nadie anida; los agentes colaboran por el tablero (blackboard), arrancando en frío.
- **25 agentes activos** en `~/.claude/agents/Gremio/<División>/` (Arquitectura · Calidad · Cambio y
  Soporte · Datos · Desarrollo · Diseno · Infraestructura · Seguridad · Intencion) + **8 congelados** en
  `Gremio/_congelados/`. Catálogo completo con el rol 2.0 de cada uno: [`ROSTER.md`](ROSTER.md).
- Disposición: **1 auditor de intención** (`gremio-auditor-intencion`, ex Factory Management — audita la
  traducción, NO define lotes) · **4 Líderes de contrato** (arquitectura, datos, seguridad,
  infraestructura) · **núcleo de verificación** (7 verificadores + `gremio-lider-calidad` como
  orquestador de estrategia) · **3 críticos de diseño** (critican contra el design system del humano;
  jamás deciden dirección) · **3 de cierre** (Cambio y Soporte) · **6 de construcción de plataforma
  (reserva)**.
- Modelo por nivel de decisión: quien decide/audita = `opus`; quien ejecuta/verifica = `sonnet`.
- **Anti-auto-aprobación:** la evidencia que produce un constructor la re-corre OTRO agente (el
  verificador) — nunca el mismo que la produjo. Por eso `/gremio-verificar` es read-only y separado.

## 9. Consumo de SABIO (read-only · on-demand · solo plano global)

| Quién | Lee (plano global vía `sabio-shared`) |
|---|---|
| `gremio-auditor-intencion` | `investigacion:decision-equilibrio-principios-diseno` + Sala D relevante del proyecto |
| Líder de Arquitectura | `investigacion:arquitectura-software-moc` |
| Líder de Datos | `investigacion:bases-de-datos-moc` |
| Líder de Seguridad | Sala C `norma:` (perfil de aplicabilidad del proyecto) + `investigacion:seguridad-moc` |
| Líder de Infraestructura | `investigacion:infra-devops-moc` + `investigacion:matriz-arquitectura-plataforma` |
| Verificadores (Calidad/Seguridad) | `investigacion:calidad-pruebas-moc` · `investigacion:seguridad-moc` |
| Críticos de diseño | `investigacion:diseno-ux-ui-moc` + el design system del proyecto (Sala B `activo:biblioteca-patrones-visuales`) |
| Cierre (Cambio y Soporte) | `investigacion:cambio-soporte-moc` |

Nunca lee bóvedas/datos de **otros** proyectos (aislamiento Capa 1, sagrado). Alcance por producto
intra-proyecto: los «Hechos estables» de OTRO producto del mismo proyecto son contexto a confirmar en el
interrogatorio, no verdad a heredar. Escribe de vuelta: gotchas → Sala D local, promovibles por
`/sabio-promover`.

### Entregables estándar por dominio de contrato (heredados de 1.x §9 — siguen vigentes)

Lo que el DR de cada dominio DEBE contener de serie; nacieron del fracaso de la corrida 02 y **sobreviven
a la reconversión** porque son criterio maquinal (justo lo que un contrato contractualiza bien):

- **dr:seguridad** — hardening remoto versionado con verificación viva por curl · advisors del proveedor
  = 0 ERROR como gate · CORS con allowlist · pentest re-ejecutado contra el entorno cloud · ciclo de vida
  de credenciales (los 5 flujos: alta, cambio, recupero, revocación, expiración) · config de Auth de
  producción versionada o snapshot fechado · superficie de producción limpia (0 artefactos de test en el
  bundle) · edge functions con validación server-side y errores sin detalles internos · GRANT mínimo.
- **dr:infra** — pipeline con tests como gate (unit + integration, backend efímero) · **el primer push
  queda verde antes de cerrar el slice** · smoke de compatibilidad del toolchain (pin vs config) ·
  credencial de smoke dedicada (`SMOKE_*`) · observabilidad mínima con dueño en el RUNBOOK · runbook de
  operación (operar · monitorear · apagar · restaurar ensayado).
- **dr:datos** — seed demo COMPLETO (ejercita todas las features; una feature no demostrable con el seed
  es una feature no demostrada) · esquema con integridad referencial y migraciones **reproducibles desde
  cero**.
- **dr:arquitectura** — estilo de despliegue + patrón interno + plataforma con alternativas descartadas
  (Complexity Tracking) y encaje con la política de hospedaje del proyecto.

Los estándares 1.x de **calidad** (pasada verde archivada, matriz de navegadores, consistencia UI↔datos,
gate del reporte exportado) viven ahora en los mandatos de `/gremio-verificar`; los de **cambio**
(versionado 1.0.0 + CHANGELOG + tag) en la condición 4 de `/gremio-cerrar`; los de **diseño** (tokens
ricos, WCAG, biblioteca de patrones) son criterios de los **críticos** contra el design system que el
humano eligió — ya no un DR previo; el **DoD de frontend** (favicon, estados vacíos, consola 0 errores)
es checklist del carril guiado que `/gremio-verificar` audita.

## 10. Qué cambió respecto de 1.x y por qué (honesto)

**Lo que cada corrida demostró:**

- **Corrida 01 (demo):** FALLIDA-Y-CORREGIDA. El plan improvisó fuera del tablero. Demostró que
  la disciplina de artefactos necesita invariantes ejecutables, no solo convenciones. → Tunings al
  protocolo (invariantes, traza del interrogatorio).
- **Corrida 02 (producto real B):** el producto se clasificó **FRACASO** (veredicto firmado).
  Último kilómetro sin dueño, pipeline declarado ≠ demostrado, verde local como proxy,
  estética sin contrato. Demostró que **los contratos incompletos se curan con más contrato** — y esa cura
  funcionó: las decenas de mejoras que siguieron (contratos estándar §9, listón visual, slice final,
  triaje) se volvieron mecanismo.
- **Corrida 03 (producto real, fábrica YA reformada):** atravesó **7 cierres de slice firmados +
  ambas compuertas en verde sin un solo hallazgo sobre el estado del producto** — y el dueño levantó 10
  quejas concretas («producto básico, ni MVP»), 8 confirmadas contra código y BD en vivo. El bucle central
  del producto **nunca cerró**. Lo decisivo: esas MISMAS compuertas SÍ atraparon todo lo contractualizado
  (verde falso E2E, migraciones no reproducibles, un requisito caído, un hallazgo RLS del 2º par). **No
  estaban rotas: verificaban el Contrato, no el producto percibido** — un ítem que nunca entró al Contrato
  es invisible por diseño, y la ideación no auditaba su propia traducción intención→Plan. En paralelo, el
  contraste autorizado con un **producto hermano construido guiado por prompt** mostró que el guiado
  alcanzó un núcleo usable en producción pagando MÁS rigor — pero reactivamente, a golpe de incidente. El
  diferencial real de GREMIO no es construir: es **anticipar el rigor**.

**La conclusión (blueprint firmado 2026-07-06):** no se cura con «una cláusula más» — mientras la única
señal de hecho sea el Contrato verificado, siempre habrá un producto-percibido más grande que el Contrato.
Por eso: **la fábrica constructora se jubila** (el producto lo construye el humano guiado); GREMIO se
queda con lo que demostró hacer bien y lo apunta donde duele — contratos donde el criterio es maquinal,
construcción solo de plataforma, y una verificación adversarial + un cierre que miran **el producto y la
intención, no solo el contrato**.

**Qué se conserva de 1.x** (porque funcionó): los DR con Contrato/Pre-flight/firma humana · adendas
firmadas y supersesión (historia inmutable) · evidencia en destino · honestidad radical del estado ·
la doble pasada del interrogatorio · repo aislado del producto · toil humano mínimo (el humano solo hace
lo que solo él puede) · compuertas read-only append-only con severidad · retrospectiva al volante SABIO.

**Qué se jubila:** el Factory Management como orquestador-constructor (reconvertido en
`gremio-auditor-intencion`) · el Plan de fábrica (`plan.md` → `intencion.md`) · el fan-out de Líderes
por defecto (contratos a demanda) · el DR de diseño por defecto (dirección visual del humano; críticos en
verificación) · el Líder de Desarrollo (el líder de desarrollo es el humano) · 8 agentes congelados
(ver ROSTER).

## 11. Huella y convenciones

- Comandos `/gremio-*` (5) — fuente en `comandos/` de este repo, runtime en `~/.claude/commands/`;
  re-copiar tras editar la fuente.
- Agentes en `~/.claude/agents/Gremio/<División>/`; la identidad viene SOLO del campo `name:` (único
  global; el escaneo es recursivo). Congelados en `Gremio/_congelados/` (fuera del ruteo activo por
  convención de la casa: no se invocan sin descongelarlos con decisión firmada).
- IDs: `dr:<dominio>-<n>` · ítems de intención `I-###` · veredictos `veredicto-verificacion-<AAAAMMDD>`.
- Plantillas de artefacto en `plantillas/` (`intencion.md` · `DR.md` · `agente.md` · `runbook.md`);
  cada proyecto recibe su copia local en su Sala E — re-copiar tras editar la fuente.
- `simulacros/` es **histórico 1.x** (test de regresión de las compuertas analizar/converger, hoy
  retiradas); ver su LEEME. Los simulacros 2.0 (sembrados para verificar/cerrar) están pendientes de
  diseño.
- Todo artefacto lleva `gremio: true` en su cabecera.
