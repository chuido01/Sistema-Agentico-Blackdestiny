---
# ─────────── Huella GREMIO · Decision Record (DR) ───────────
# Plantilla canónica. Copia este archivo a la Sala E del proyecto: 04-Recursos/05-Decisiones/<id>.md
id: dr:<dominio>-<nnn>            # p. ej. dr:arquitectura-001 — único e INMUTABLE una vez aceptado
tipo: <arquitectura | datos | seguridad | infra | desarrollo | diseno | calidad | cambio>
estado: propuesto                 # propuesto → aceptado → superado  (nunca se borra; se supera)
fecha: <AAAA-MM-DD>
autor: gremio-lider-<dominio>     # el Líder PROPIETARIO de la decisión (función DECIDE)
especialistas: []                 # Especialistas seleccionados por el Líder para ejecutar/analizar (p. ej. [gremio-desarrollo-backend, gremio-calidad-tester]). Los lanza gremio-factory-management; NO el Líder.
firma_humana: ""                  # se llena SOLO al aceptar: "<nombre> · <AAAA-MM-DD>" — es la compuerta
supersede: ""                     # id del DR que ÉSTE reemplaza (si nace de una evolución/migración)
superado_por: ""                  # id del DR que reemplaza a éste (se llena cuando pasa a 'superado')
refs: []                          # [dr:datos-002, dr:seguridad-001] — cruces por ID = el TABLERO
fuentes_sabio: []                 # [investigacion:arquitectura-software-moc, norma:gdpr:art-32] — qué leyó del cerebro
plan: ""                          # id/ruta del Plan (Factory Management) que enlaza este DR (el spec.md-equivalente)
gremio: true                      # marca de huella GREMIO
---

# DR `<id>` — <título corto y conclusivo de la decisión>

> Propiedad de **`<autor>`** · Estado **`<estado>`** · Pertenece al tablero del proyecto (Plan `<plan>`).
> **Regla de oro:** un DR `aceptado`+firmado NO se edita. Si cambia, se crea un DR nuevo que lo **supera** (`supersede`/`superado_por`).

## Contexto
<!-- El problema o la fuerza que OBLIGA a decidir. Qué pide el Plan/Backlog del Factory Management (historia P#, FR-###, SC-###).
     Restricciones reales (equipo, plataforma, plazos, normas). Lo que SABIO ya dice al respecto (citado en fuentes_sabio).
     3–6 líneas; sin relleno. -->

## Decisión
<!-- La decisión en una sola frase accionable y sin ambigüedad: qué se elige (estilo/patrón/motor/control…) y su alcance. -->

## Alternativas descartadas
<!-- Estilo "Complexity Tracking" de spec-kit: cada alternativa más simple o distinta y por qué se rechazó.
     Si esta decisión AÑADE complejidad, su justificación va aquí (Regla de Tres / proporción). -->

| Alternativa | Por qué se consideró | Por qué se descartó |
|---|---|---|
| <alternativa A> | <atractivo> | <razón de descarte> |
| <alternativa B> | <atractivo> | <razón de descarte> |

## Consecuencias
<!-- Qué se gana y qué se sacrifica. Riesgos asumidos y deuda creada.
     **Disparadores de evolución:** señales concretas que, si ocurren, obligarán a SUPERAR este DR (p. ej. ">N usuarios", "se añade multi-tenant"). -->

## Contrato de implementación
<!-- Ejecutable, NO prosa. Es lo que el Especialista debe construir exactamente.
     Es el equivalente al tasks.md de spec-kit, embebido en el DR. -->
- **Estilo/patrón:** <…>
- **Módulos/componentes:** <…>
- **Rutas/archivos:** <…>
- **Stack/dependencias:** <…>
- **Contratos/interfaces:** <API, esquema, evento… si aplica>
- **Ejecución por Especialista:** <UNA línea por Especialista — quién hace qué; presente solo cuando participa más de uno. Debe cuadrar con el campo `especialistas:` del frontmatter. Es el plan que el Factory Management materializa (sin Task-en-Task).>
- **Primer test (rojo→verde):** <el primer test que debe pasar — la prueba del esqueleto andante (F3)>

### Pre-flight de ejecución (OBLIGATORIO si el Contrato depende de algo externo — MP-040.2/F24)
<!-- ANTES de ejecutar este DR, el ejecutor produce este inventario VERIFICADO (probado con una llamada
     real, jamás supuesto). "No puedo" sin haber probado = violación del protocolo. -->
| Dependencia externa (cloud/cuenta/API/CLI/MCP) | ¿Disponible? (probada con llamada real) | Qué falta / qué se pide al humano |
|---|---|---|
| <p. ej. cuenta Cloudflare + wrangler> | <✓ probada con `wrangler whoami` | ✗> | <credencial X / alta de cuenta Y — pedir explícito> |

### DoD de despliegue (OBLIGATORIO si este DR tiene destino cloud — MP-046/G-03)
<!-- "Verde local no cierra un slice con destino cloud." Ref investigacion:verde-local-no-cierra-slice-con-destino-cloud -->
- Verde EN EL ENTORNO DE DESTINO: deploy ejecutado + smoke real contra la URL viva + advisors del proveedor 0 ERROR.

## Verificación — la compuerta
<!-- Evidencia empírica REAL, no afirmaciones. Se completa al cerrar. Sin la firma humana el DR NO pasa a 'aceptado'.
     FORMATO PARSEABLE (MP-063/M14) — cada checkbox lleva su evidencia en la MISMA línea, con este formato exacto
     para que /gremio-converger en modo cierre lo lea mecánicamente:
       - [x] <criterio> — EVIDENCIA: <comando o ruta> → <salida real resumida en 1 línea>
     ANTI-AUTO-APROBACIÓN (MP-061/M12): la evidencia de un Especialista la RE-CORRE otro agente (Calidad u otro
     par) antes de marcar el checkbox — nunca el mismo que la produjo. -->
- [ ] El primer test corre en verde — EVIDENCIA: `<comando>` → `<salida real>` *(re-corrida por: <agente ≠ autor>)*
- [ ] `/gremio-analizar` sin hallazgos **CRITICAL/HIGH** abiertos contra este DR — EVIDENCIA: `<ruta del informe>`
- [ ] Cobertura: cada `FR-###`/`SC-###` del contrato tiene tarea y evidencia — EVIDENCIA: `<mapa>`
- [ ] Sin violación de norma `norma:` aplicable (si `tipo` lo exige, p. ej. seguridad) — EVIDENCIA: `<check>`
- [ ] (si destino cloud) DoD de despliegue cumplido: verde EN destino + smoke real + advisors 0 ERROR — EVIDENCIA: `<urls/salidas>`
- [ ] (si es el DR de release) **Gate de hallazgos (MP-051/G-08): 0 CRITICAL/HIGH/MEDIUM abiertos** — EVIDENCIA: `<presupuesto de hallazgos>`
- **Firma humana:** `<nombre> · <AAAA-MM-DD> · <commit SHA del estado firmado>` ← la compuerta (MP-066/M17: la firma
  ancla la VERSIÓN exacta que se firmó; sin SHA, "qué firmaste" no es reconstruible). Vacío = sigue en `propuesto`.

## Adendas de entorno (MP-047/G-04 — la válvula que preserva la inmutabilidad)
<!-- Un DR aceptado+firmado NO se reescribe. Si un SUPUESTO de contexto cambia (p. ej. una decisión tomada
     "para local" llega a producción), se re-valida AQUÍ como adenda fechada y firmada — apéndice, no edición:
     - ADENDA-01 · <AAAA-MM-DD> · <qué supuesto cambió> · <re-validación o ajuste> · firma: <nombre · fecha · SHA>
     Si el cambio invalida la DECISIÓN misma (no un supuesto), no es adenda: es un DR nuevo que supera a éste. -->

<!-- Al superar este DR en el futuro: cambia `estado` a `superado`, rellena `superado_por`, y NO toques nada más. La historia vive en la cadena de supersesión + git. -->
