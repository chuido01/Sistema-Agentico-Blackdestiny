<!-- ROSTER 2.0 — reescrito a mano en la reconversión GREMIO 2.0 (2026-07-06, blueprint firmado).
     Refleja los agentes de entorno-claude/home-claude/agents/Gremio/ (los que instala Aplicar-Setup.ps1). -->
# ROSTER GREMIO 2.0 — catálogo de capacidades (25 activos + 8 congelados)

> El menú de la plataforma de rigor: quién hace qué en los 3 servicios (contratos · construcción de
> plataforma · verificación + cierre). Estructura física: `~/.claude/agents/Gremio/<División>/`.
> **El producto lo construye el humano guiado; el líder de desarrollo es el humano.**

## Disposición 2.0 (resumen)

| Bloque | Agentes | Servicio |
|---|---|---|
| **Intención** | `gremio-auditor-intencion` | `/gremio-intencion` |
| **Líderes de contrato** (4) | arquitectura · datos · seguridad · infraestructura | `/gremio-contrato` |
| **Núcleo de verificación** (8) | lider-calidad (orquesta la estrategia) + calidad-tester · calidad-performance · seguridad-codigo-seguro · seguridad-ethical-hacker · seguridad-modelado-amenazas · seguridad-arquitectura-segura · seguridad-datos | `/gremio-verificar` |
| **Críticos de diseño** (3) | lider-diseno · diseno-ui · diseno-ux | `/gremio-verificar` (critican; jamás deciden dirección) |
| **Cierre** (3) | lider-cambio · cambio-release · cambio-soporte | `/gremio-cerrar` |
| **Construcción de plataforma — reserva** (6) | desarrollo-backend · desarrollo-frontend · datos-relacionales · infraestructura-devops · infraestructura-clouds · infraestructura-ops-paas-baas-faas | `/gremio-construir` (solo carril plataforma, bajo DR firmado) |
| **Congelados** (8) | ver al final | — |

## Intencion (1)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-auditor-intencion` | **Audita** — ex Factory Management (reconvertido 2026-07-06): interrogatorio de doble pasada → `intencion.md` (ítems `I-###` con carril), audita su propia traducción respuesta→ítem y mantiene la matriz de paridad; NO define lotes ni redacta Planes de fábrica. | opus |

## Arquitectura (1)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-arquitectura` | **Decide (contrato)** — estilo de despliegue + patrón interno + plataforma en un DR firmable con criterio maquinal; consume la Sala A de arquitectura. | opus |

## Datos (2)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-datos` | **Decide (contrato)** — motor, esquema, relaciones y modelado en un DR de datos. | opus |
| `gremio-datos-relacionales` | **Plataforma (reserva)** — esquema relacional, integridad, índices y migraciones reproducibles bajo DR firmado en `/gremio-construir`. | sonnet |

## Seguridad (6)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-seguridad` | **Decide (contrato)** — controles de seguridad + cumplimiento (normas `norma:` del perfil del proyecto) en un DR; vigila la política del proyecto (despliegue prohibido = CRITICAL). | opus |
| `gremio-seguridad-codigo-seguro` | **Verifica (núcleo)** — 2º par adversarial sobre código: OWASP, inyección, secretos; mandato de REFUTAR, hallazgos con severidad. | sonnet |
| `gremio-seguridad-ethical-hacker` | **Verifica (núcleo)** — pentest cuando el trabajo tocó authz/RLS/tenancy/sesiones: explota los controles (denegación probada con par positivo), no los confirma. | sonnet |
| `gremio-seguridad-modelado-amenazas` | **Verifica (núcleo)** — modelo de amenazas (STRIDE/árboles de ataque), superficie de ataque y riesgos priorizados sobre el trabajo ya hecho. | sonnet |
| `gremio-seguridad-arquitectura-segura` | **Verifica (núcleo)** — audita los controles por capa (defensa en profundidad, authN/Z, secretos, cifrado) contra el DR de seguridad. | sonnet |
| `gremio-seguridad-datos` | **Verifica (núcleo)** — protección del dato (cifrado at-rest/in-transit, minimización, retención, clasificación) contra la política del proyecto. | sonnet |

## Infraestructura (4)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-infraestructura` | **Decide (contrato)** — despliegue, CI/CD, entornos, empaquetado y operación en un DR de infra; firma informada (enumera los recursos externos que el DR crea). | opus |
| `gremio-infraestructura-devops` | **Plataforma (reserva) + verifica** — construye CI/CD/IaC bajo DR firmado; en `/gremio-verificar` prueba la **reproducibilidad desde cero** de migraciones/seeds (reset + arranque limpio). | sonnet |
| `gremio-infraestructura-clouds` | **Plataforma (reserva)** — infraestructura cloud/on-prem (redes, cómputo, almacenamiento) bajo DR firmado. | sonnet |
| `gremio-infraestructura-ops-paas-baas-faas` | **Plataforma (reserva)** — opera plataformas gestionadas (despliegue, escalado, monitoreo en runtime) bajo DR firmado. | sonnet |

## Calidad (3)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-calidad` | **Orquesta la estrategia de verificación** — en lotes grandes de `/gremio-verificar` DECIDE qué verificar, con qué profundidad y en qué orden; no prueba él mismo. | opus |
| `gremio-calidad-tester` | **Verifica (núcleo)** — E2E y funcional: todo assert de ausencia con control positivo pareado + confirmación en la fuente de verdad (la fila en la BD, no el exit code). | sonnet |
| `gremio-calidad-performance` | **Verifica (núcleo)** — baseline p50/p95/p99 contra el budget del contrato; un SLO sin medición es un hueco, no un pendiente. | sonnet |

## Diseno (3)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-diseno` | **Crítico de diseño (orquesta la crítica)** — ya NO produce DR de diseño por defecto: la dirección visual es del humano; organiza la crítica contra el design system que el humano eligió. | opus |
| `gremio-diseno-ui` | **Crítico de diseño** — audita la UI contra el design system del proyecto + WCAG AA (tokens, jerarquía, densidad, estados); critica, jamás decide dirección. | sonnet |
| `gremio-diseno-ux` | **Crítico de diseño** — audita flujos, usabilidad y experiencia contra la intención del humano; critica, jamás decide dirección. | sonnet |

## Cambio y Soporte (3)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-lider-cambio` | **Decide (cierre)** — estrategia de release/cambio/soporte cuando `/gremio-cerrar` la requiere. | opus |
| `gremio-cambio-release` | **Cierre** — ejecuta la condición 4 de `/gremio-cerrar`: tag versionado + changelog + **rollback ENSAYADO** contra entorno de prueba. | sonnet |
| `gremio-cambio-soporte` | **Cierre** — runbook de soporte post-producción (L1-L3, incidentes, escalamiento) si el producto queda operando. | sonnet |

## Desarrollo (2)
| Agente | Rol 2.0 | Model |
|---|---|---|
| `gremio-desarrollo-backend` | **Plataforma (reserva)** — plumbing de servidor que un usuario NO percibe (auth plumbing, adapters, scaffolding) bajo DR firmado; las features de producto son del humano guiado. | sonnet |
| `gremio-desarrollo-frontend` | **Plataforma (reserva)** — scaffolding/infra de cliente sin superficie percibida (tooling, build, wiring) bajo DR firmado; las pantallas son del humano guiado. | sonnet |

## _congelados (8) — y su porqué

> Congelados ≠ borrados: sus `.md` viven en `~/.claude/agents/Gremio/_congelados/` fuera del ruteo
> activo. Descongelar uno exige decisión firmada (y Regla de Tres: tres casos reales que lo pidan).

| Agente | Por qué se congela en 2.0 |
|---|---|
| `gremio-lider-desarrollo` | **El líder de desarrollo es el humano** (doctrina 2.0): el plan de implementación del producto sigue su atención, no un DR de fábrica. |
| `gremio-desarrollo-moviles` | Superficie 100 % percibida (carril producto = guiado) y sin caso móvil vigente. |
| `gremio-datos-no-relacionales` | Sin caso de uso vigente; se descongela por Regla de Tres si un DR de datos lo exige. |
| `gremio-datos-vectoriales` | Sin caso de uso vigente (IA/RAG no está en el carril plataforma de ningún producto activo). |
| `gremio-arquitectura-monolitos` | Los 4 especialistas de arquitectura aterrizaban el detalle constructivo de la decisión — en 2.0 esa construcción es del humano guiado; la decisión (el DR del Líder) basta. |
| `gremio-arquitectura-microservicios` | Ídem: el aterrizaje constructivo del estilo es del humano guiado. |
| `gremio-arquitectura-paas-baas-faas` | Ídem: el encaje serverless/gestionado se decide en el DR; el detalle es guiado. |
| `gremio-arquitectura-hexagonal-mvc` | Ídem: los patrones internos se deciden en el DR; su implementación es guiada. |
