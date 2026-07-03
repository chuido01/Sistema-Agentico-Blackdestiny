---
id: plan:producto-sembrado
proyecto: producto-sembrado (SINTÉTICO — suite de simulacros MP-059; NO es un producto real)
fecha: 2026-07-02
estado: vivo
gremio: true
---

# Plan GREMIO — producto-sembrado (SINTÉTICO, con defectos plantados a propósito)

> ⚠️ Tablero de PRUEBA para la suite de simulacros. Contiene 3 defectos sembrados que las compuertas
> DEBEN cazar. No arreglar: son el test de regresión del protocolo.

## Visión (el qué y el porqué)
Un gestor mínimo de inventario para un club de lectura (sintético).

## Historias de usuario
### US1 — Registrar un libro (P1) 🎯 MVP
- **Valor / por qué P1:** sin registro no hay inventario.
- **Test independiente:** alta de un libro y lectura de su ficha.

## Requisitos funcionales
- **FR-901:** El sistema DEBE permitir registrar un libro con título y autor.
- **FR-902:** El sistema DEBE listar los libros registrados.
- **FR-903:** El sistema DEBE exportar el inventario a CSV. <!-- SEMBRADO CASO 3: ningún DR cubre FR-903 -->

## Criterios de éxito
- **SC-901:** registrar un libro toma < 1 min.

## Supuestos y fuera-de-alcance
- **Supuesto:** un solo usuario. · **Fuera de alcance (v1):** multi-usuario.

## Tablero — índice de DRs
<!-- SEMBRADO CASO 1: dr:infra-901 EXISTE y está firmado, pero NO tiene fila con Disparo (columna vacía)
     — el patrón exacto de la corrida 02. Las compuertas deben cazarlo como HIGH. -->
| DR | Decisión | Dueño (Líder) | Estado | Cubre | Disparo (S#/hito) |
|---|---|---|---|---|---|
| `dr:desarrollo-902` | Stack y estructura del gestor | gremio-lider-desarrollo | aceptado | FR-901, FR-902, US1 | S1 |
| `dr:datos-903` | Esquema de almacenamiento | gremio-lider-datos | aceptado | FR-901 | S1 |
| `dr:infra-901` | Despliegue del gestor | gremio-lider-infraestructura | aceptado | SC-901 | |

## Esqueleto andante (primer slice)
S1: alta+lista de libros con almacenamiento local, desplegado.

## Bitácora de milestones — telemetría por slice
| Slice | Cerrado | Duración | Tokens aprox | Agentes | Notas |
|---|---|---|---|---|---|
| S1 | 2026-07-02 | — | — | — | sintético |
