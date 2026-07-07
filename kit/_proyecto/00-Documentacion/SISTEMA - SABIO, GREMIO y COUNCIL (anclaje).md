<!-- sabio-generacion: 3 -->
# Sistema Agéntico Blackdestiny — SABIO + GREMIO + COUNCIL · anclaje de inicio

> **Léeme al iniciar sesión** para entender el sistema en 2 minutos, desde ESTE proyecto.
> *SABIO sabe; el humano construye; GREMIO blinda; COUNCIL delibera antes de firmar.*

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

## GREMIO — el rigor (qué BLINDA lo que construyo)
La **plataforma de rigor** del sistema, disponible en este proyecto si aplicaste el entorno del Kit (los agentes y comandos viven a nivel usuario, `~/.claude/`; no se instala nada local). Doctrina 2.0: **el producto lo construyes tú, guiado; GREMIO lo blinda** con 3 servicios — **contratos a demanda** (un Líder de dominio → un DR → tu firma con disparo), **construcción de plataforma** (solo lo que un usuario final no percibe, contra DR firmado) y **verificación adversarial + cierre honesto**. Todo colabora por el **tablero** de la **Sala E local** (`04-Recursos/05-Decisiones/`: `intencion.md` + DRs + veredictos), con **tu firma** (anclada al commit SHA).

- **Arrancar:** `/gremio-intencion [idea]` — interrogatorio de doble pasada (≤10 preguntas, tú respondes) → `intencion.md`, tu tablero (ítems `I-###` con carril producto|plataforma, auditoría de traducción, matriz de paridad) con tu visto bueno → producto nuevo en su propio repo.
- **Contratar y construir:** `/gremio-contrato <dominio>` (datos · seguridad · infraestructura · arquitectura; a demanda, nunca 10 DRs de una vez) · `/gremio-construir` (solo carril plataforma; si el slice toca superficie percibida, se niega y vuelve a tu carril guiado).
- **Verificar y cerrar:** `/gremio-verificar` (read-only adversarial: 2º par que refuta, pentest, CI desde cero, E2E contra fuente de verdad, performance, críticos de diseño) · `/gremio-cerrar` (4 condiciones: convergencia DR→evidencia · tú recorres el bucle central contra `intencion.md` · verde EN destino · release real con rollback ensayado — sin las 4, «cerrado» está prohibido).
- **Reglas de oro:** sin firma no está hecho · un DR firmado no se edita, se supera · la dirección visual es tuya (los críticos critican, no deciden) · SABIO es el cerebro (no se duplica) · nunca «no puedo» sin probarlo (pre-flight real) · verde local no cierra un slice con destino cloud.

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
