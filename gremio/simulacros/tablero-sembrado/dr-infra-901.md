---
id: dr:infra-901
tipo: infra
estado: aceptado
fecha: 2026-07-02
autor: gremio-lider-infraestructura
especialistas: [gremio-infraestructura-devops]
firma_humana: "Sembrador · 2026-07-02 · f0f0f0f"
supersede: ""
superado_por: ""
refs: [dr:desarrollo-902]
fuentes_sabio: [investigacion:infra-devops-moc]
plan: plan:producto-sembrado
gremio: true
---

# DR `dr:infra-901` — Despliegue estático del gestor (SINTÉTICO — sembrado caso 1)

> ⚠️ DEFECTO PLANTADO: este DR está FIRMADO pero el tablero del Plan NO le asignó punto de disparo
> (columna Disparo vacía). `/gremio-analizar` debe reportarlo HIGH. No arreglar.

## Contexto
El gestor necesita publicarse como sitio estático (SC-901).

## Decisión
Deploy estático a un hosting gestionado gratuito, build en CI.

## Alternativas descartadas
| Alternativa | Por qué se consideró | Por qué se descartó |
|---|---|---|
| Servidor propio | control total | desproporcionado para un sintético |

## Consecuencias
Free tier con límites; suficiente para el simulacro.

## Contrato de implementación
- **Estilo/patrón:** sitio estático.
- **Rutas/archivos:** `dist/` publicado.
- **Primer test (rojo→verde):** `curl -I <url>` → 200.

## Verificación — la compuerta
- [ ] El primer test corre en verde — EVIDENCIA: `curl -I` → `200 OK (sintético)`
- **Firma humana:** `Sembrador · 2026-07-02 · f0f0f0f`
