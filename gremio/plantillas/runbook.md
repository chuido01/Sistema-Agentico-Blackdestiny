<!-- ─────────── Huella GREMIO · RUNBOOK de operación (plantilla) ───────────
gremio: true · MP-060/M11 — destilada del RUNBOOK real de la corrida 02 (el mejor ejemplar de la casa;
original preservado en la bitácora interna, no publicada).
El dr:infra que exige un runbook usa ESTE formato. Vive junto al producto (p. ej. infra/RUNBOOK.md), en git. -->

# RUNBOOK de operación — <producto>

> Operación del despliegue de `dr:infra-<nnn>`. Cubre: **operar · monitorear · apagar · restaurar**.
> Alcance: <qué despliegue cubre y qué NO (p. ej. "v1 cloud-gestionado; sin self-hosted")>.

## 0. Datos reales de este despliegue (la tabla que evita adivinar a las 3 a.m.)
| Recurso | Valor |
|---|---|
| URL(s) pública(s) | <…> |
| Backend/API (proveedor · proyecto · ref · región) | <…> |
| Repo CI/CD | <…> |
| Migraciones aplicadas / seed | <…> |
| Functions/workers desplegados | <…> |
| Dashboards de operación | <…> |
| **Contacto operativo** (quién monitorea · quién notifica una brecha · canal de escalamiento) | <…> |

## 1. Operar — procedimientos de rutina
<!-- Lo que pasa en operación normal: reactivación tras pausa de free tier, rotación de credenciales
     (los 5 flujos del ciclo de vida: alta · cambio · recupero · revocación de sesiones · expiración de
     temporales — MP-068), altas/bajas de usuarios, keep-alive si aplica. Cada procedimiento: síntoma →
     pasos numerados → verificación (comando/URL con salida esperada). -->

## 2. Monitorear — señales y dueños
<!-- Observabilidad mínima de serie (MP-055/G-20): qué se mira (error-tracking, logs nativos, advisors),
     CADA señal con un DUEÑO asignado y umbral de acción. "Sin stack de observabilidad" solo vale firmado
     como adenda del dr:infra. -->
| Señal | Dónde | Umbral / acción | Dueño |
|---|---|---|---|

## 3. Apagar — pausa y desmantelamiento
<!-- Dos niveles: (a) PAUSA reversible (qué se apaga, qué persiste, cómo se reactiva — ver §1);
     (b) TEARDOWN definitivo: checklist BORRAR/CONSERVAR con verificación "sin rastro" por ítem
     (recursos cloud, repos, secrets/tokens EN SU ORIGEN, credenciales demo, contenedores/volúmenes).
     El teardown es parte del contrato desde el día uno, no un epílogo (lección de la corrida 02). -->

## 4. Restaurar — rollback y desastre
<!-- Rollback en DOS PLANOS INDEPENDIENTES (patrón del ejemplar):
     (a) SPA/estático: re-promover el build anterior (atómico, segundos) + verificación de URL;
     (b) Datos: JAMÁS reset en prod — compensación expand-contract (nueva migración que revierte),
     forward-only. Además: backups (qué existe, dónde, frecuencia) y el RESTORE ENSAYADO al menos
     una vez (un backup no probado es una hipótesis — M6). -->

## 5. Obligaciones legales del incidente (si aplica al dominio del producto)
<!-- P. ej. notificación de brecha (Ley 21.719 Art. 14 sexies para datos personales en Chile):
     plazo, a quién, contenido mínimo, y QUIÉN la ejecuta (del contacto operativo de §0). -->
