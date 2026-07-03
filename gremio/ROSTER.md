<!-- ARCHIVO DERIVADO - lo regenera .tools\Generar-Roster.ps1 tras cambiar cualquier agente. NO editar a mano. -->
# ROSTER GREMIO - catalogo de capacidades (33 agentes)

> El menu que el Lider consulta para SELECCIONAR Especialistas sin abrir 33 archivos (M15).
> Generado: 2026-07-03 00:12 desde los description: del runtime (~/.claude/agents).

## Arquitectura Gremio (5)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-arquitectura` | decide | opus | Líder de Arquitectura de GREMIO. DECIDE estilo de despliegue + patrón interno + plataforma de un producto y lo registra en un DR. Consume la Sala A de arquitectura. Su decisión la construye Desarrollo (vía referencia de DR); planifica los Especialistas que correspondan. No implementa ni invoca agentes. |
| `gremio-arquitectura-hexagonal-mvc` | implementa | sonnet | Especialista Hexagonal & MVC de la división Arquitectura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: aterriza los patrones internos hexagonal (ports & adapters) y MVC sobre el estilo de despliegue elegido. Lee SABIO de su dominio. No decide. |
| `gremio-arquitectura-microservicios` | implementa | sonnet | Especialista Microservicios de la división Arquitectura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: aterriza el detalle de una arquitectura de microservicios (descomposición, comunicación, datos por servicio, resiliencia). Lee SABIO de su dominio. No decide. |
| `gremio-arquitectura-monolitos` | implementa | sonnet | Especialista Monolítica & Modular de la división Arquitectura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: aterriza el detalle/scaffold de una arquitectura monolítica o monolito modular. Lee SABIO de su dominio. No decide. |
| `gremio-arquitectura-paas-baas-faas` | implementa | sonnet | Especialista PaaS & BaaS & FaaS de la división Arquitectura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: aterriza arquitecturas serverless/gestionadas (FaaS, BaaS, PaaS) y su encaje por plataforma. Lee SABIO de su dominio. No decide. |

## Calidad Gremio (3)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-calidad` | decide | opus | Líder de Calidad de GREMIO. DECIDE la estrategia de verificación de un producto (qué probar, cobertura, criterios de aceptación) y SELECCIONA + planifica qué Especialistas de Calidad (QA, automation, performance) la ejecutan. No invoca agentes ni prueba él mismo. |
| `gremio-calidad-performance` | verifica | sonnet | Especialista Performance Tester de la división Calidad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: define escenarios de carga, mide rendimiento y reporta contra los SLO. Lee SABIO de su dominio. No decide. |
| `gremio-calidad-tester` | verifica | sonnet | Especialista Manual & Automation Tester de la división Calidad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: escribe y CORRE pruebas funcionales/E2E (manuales y automatizadas) y pega la evidencia real. Lee SABIO de su dominio. No decide. |

## Cambio y Soporte Gremio (3)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-cambio` | decide | opus | Líder de Gestión del Cambio y Soporte de GREMIO. DECIDE la estrategia de release, gestión del cambio/formación y soporte de un producto y la registra en un DR. Selecciona + planifica qué Especialistas (release, change/training, soporte L1-L3) la operan. No implementa la feature ni invoca agentes. |
| `gremio-cambio-release` | opera | sonnet | Especialista Gestor de Release de la división Cambio y Soporte de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: gestiona el release (versionado, ventanas, rollback, notas de versión) ejecutando el plan del DR. Lee SABIO de su dominio. No decide. |
| `gremio-cambio-soporte` | opera | sonnet | Especialista Soporte Post Producción de la división Cambio y Soporte de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: da soporte post-producción (L1-L2-L3): runbook, manejo de incidentes y escalamiento. Lee SABIO de su dominio. No decide. |

## Datos Gremio (4)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-datos` | decide | opus | Líder de Base de Datos de GREMIO. DECIDE motor, esquema, relaciones y modelado de datos de un producto y lo registra en un DR de datos. Su decisión la construye Desarrollo (acceso a datos) o un Especialista de datos (ETL/pipelines). Planifica los Especialistas que correspondan. No implementa ni invoca agentes. |
| `gremio-datos-no-relacionales` | implementa | sonnet | Especialista No Relacionales de la división Base de Datos de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: modela almacenes NoSQL (documental/clave-valor/columnar/grafo) según el patrón de acceso. Lee SABIO de su dominio. No decide. |
| `gremio-datos-relacionales` | implementa | sonnet | Especialista Relacionales de la división Base de Datos de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: diseña/implementa el esquema relacional (normalización, índices, integridad referencial, migraciones). Lee SABIO de su dominio. No decide. |
| `gremio-datos-vectoriales` | implementa | sonnet | Especialista Vectoriales de la división Base de Datos de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: diseña almacenes vectoriales (embeddings, índices ANN, búsqueda semántica) para casos IA/RAG. Lee SABIO de su dominio. No decide. |

## Desarrollo Gremio (4)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-desarrollo` | decide | opus | Líder de Desarrollo de GREMIO. DECIDE el plan de implementación de un producto a partir de los DR de arquitectura/datos/diseño firmados, y SELECCIONA + planifica qué Especialistas de Desarrollo (backend/frontend/mobile) lo construyen. No invoca agentes ni implementa él mismo. |
| `gremio-desarrollo-backend` | implementa | sonnet | Especialista Backend de la división Desarrollo de GREMIO. EJECUTA la parte del Contrato (Ejecución por Especialista) que el Líder de Desarrollo le asignó, sobre un DR firmado: produce el código de servidor/dominio y la evidencia. No decide arquitectura. |
| `gremio-desarrollo-frontend` | implementa | sonnet | Especialista Frontend de la división Desarrollo de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: implementa la UI/cliente según los DR de diseño y arquitectura. Lee SABIO de su dominio. No decide. |
| `gremio-desarrollo-moviles` | implementa | sonnet | Especialista Móviles de la división Desarrollo de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: implementa la app móvil (nativa o híbrida) según los DR. Lee SABIO de su dominio. No decide. |

## Diseno Gremio (3)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-diseno` | decide | opus | Líder de Diseño y Experiencia de GREMIO (UX+UI unificado). DECIDE investigación, wireframes, prototipos, usabilidad y design system de un producto y lo registra en un DR de diseño. Su decisión la construye Desarrollo (frontend) vía referencia de DR. No implementa ni invoca agentes. |
| `gremio-diseno-ui` | implementa | sonnet | Especialista UI de la división Diseño de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: produce la UI visual (componentes, tokens, jerarquía) con accesibilidad (WCAG). Lee SABIO de su dominio. No decide. |
| `gremio-diseno-ux` | implementa | sonnet | Especialista UX de la división Diseño de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: produce investigación de usuario, flujos, wireframes y criterios de usabilidad. Lee SABIO de su dominio. No decide. |

## Factory Management Gremio (1)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-factory-management` | orquesta | opus | Gremio Factory Management — el orquestador de la fábrica agéntica. Invócalo para arrancar/coordinar la construcción de un producto: redacta y mantiene el Plan, prioriza, y es el ÚNICO que define los lotes del fan-out (Líderes y, tras la firma, los Especialistas que cada Líder planificó en su DR) — la sesión principal los materializa (verdad operativa §5). No decide dominios ni implementa. |

## Infraestructura Gremio (4)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-infraestructura` | decide | opus | Líder de Infraestructura y Operaciones de GREMIO (DevOps/Cloud). DECIDE despliegue, CI/CD, entornos, empaquetado y operación de un producto, lo registra en un DR de infra, y SELECCIONA + planifica qué Especialistas de Infra lo ejecutan. No invoca agentes ni implementa él mismo. |
| `gremio-infraestructura-clouds` | implementa | sonnet | Especialista Infra & Clouds de la división Infraestructura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: implementa la infraestructura cloud/on-prem (redes, cómputo, almacenamiento) según el DR de infra. Lee SABIO de su dominio. No decide. |
| `gremio-infraestructura-devops` | implementa | sonnet | Especialista DevOps de la división Infraestructura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: implementa CI/CD, IaC, empaquetado y automatización del pipeline; deja un smoke test verde. Lee SABIO de su dominio. No decide. |
| `gremio-infraestructura-ops-paas-baas-faas` | opera | sonnet | Especialista Ops PaaS & BaaS & FaaS de la división Infraestructura de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: opera plataformas gestionadas (PaaS/BaaS/FaaS): despliegue, escalado y monitoreo en runtime. Lee SABIO de su dominio. No decide. |

## Seguridad Gremio (6)
| Agente | Rol | Model | Capacidad (description) |
|---|---|---|---|
| `gremio-lider-seguridad` | decide | opus | Líder de Seguridad y cumplimiento de GREMIO. DECIDE los controles de seguridad + cumplimiento (GDPR/HIPAA/Ley Chile) de un producto, los registra en un DR, y SELECCIONA + planifica qué Especialistas de Seguridad los ejecutan. Lee la Sala C (normas). Sus Especialistas son PROPIOS de GREMIO (arquitecto-seguridad, código-seguro, modelador-amenazas, pentester); no reutiliza agentes externos. No invoca agentes ni implementa él mismo. |
| `gremio-seguridad-arquitectura-segura` | implementa | sonnet | Especialista Arquitectura Segura de la división Seguridad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: diseña los controles de seguridad por capa (defensa en profundidad, authN/Z, gestión de secretos, cifrado). Lee SABIO de su dominio. No decide. |
| `gremio-seguridad-codigo-seguro` | verifica | sonnet | Especialista Código Seguro de la división Seguridad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: revisa el código en busca de vulnerabilidades (OWASP: inyección, validación, manejo de secretos) y reporta hallazgos con severidad. Lee SABIO de su dominio. No decide. |
| `gremio-seguridad-datos` | implementa | sonnet | Especialista Seguridad en Datos de la división Seguridad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: diseña la protección de datos (cifrado at-rest/in-transit, minimización, retención, cumplimiento de protección de datos). Lee SABIO de su dominio. No decide. |
| `gremio-seguridad-ethical-hacker` | verifica | sonnet | Especialista Ethical Hacker de la división Seguridad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: ejecuta pruebas de intrusión éticas que exploten los controles para validarlos y reporta hallazgos reproducibles con severidad. Lee SABIO de su dominio. No decide. |
| `gremio-seguridad-modelado-amenazas` | verifica | sonnet | Especialista Modelado de Amenazas de la división Seguridad de GREMIO. EJECUTA la cláusula «Ejecución por Especialista» que su Líder le asignó sobre un DR firmado: produce el modelo de amenazas (STRIDE/árboles de ataque), la superficie de ataque y los riesgos priorizados. Lee SABIO de su dominio. No decide. |

