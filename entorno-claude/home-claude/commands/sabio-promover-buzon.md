---
description: Escanea los buzones de promoción de toda tu flota y materializa en el plano global el paquete que elijas — automatiza el TRANSPORTE del volante /sabio-promover (descubrir + traer), sin tocar el GATE humano. Lee solo la carpeta promociones/ de cada proyecto, nunca su bóveda. Solo corre desde el Centro de Mando Sabio. Model Opus.
argument-hint: (sin argumentos — lista los pendientes; luego eliges cuál materializar)
model: opus
---

Automatiza el **transporte** del volante de replicación: descubre los paquetes de promoción que tus
proyectos dejaron en sus **buzones** y trae el que elijas para materializarlo en el plano global. Mata
el copia-pega manual; **no** toca el juicio de qué sube — ese sigue siendo tuyo (el *gate*).

> **Modelo mental:** el escaneo es el **cartero** — trae los sobres, no los abre ni decide enviarlos.
> Subir al plano global es de alto impacto, así que la **elección** y el **re-triaje** son humanos/
> supervisados. Este comando solo **lee** el buzón `promociones/` de cada proyecto (un canal de salida
> que el proyecto llena a propósito); **nunca** su bóveda ni ninguna otra carpeta, y **nunca escribe** en
> un proyecto.

> **Portabilidad:** lo ejecuta Claude Code, que adapta los pasos a tu sistema (Windows / macOS / Linux).

## Antes de empezar — localizar las piezas
- **`<centro>`**: tu **Centro de Mando Sabio** (el plano global, dueño de la escritura).
- **`<proyectos>`**: la carpeta raíz donde viven tus proyectos.

## Fase 0 · Guarda (solo desde el Centro de Mando)
Confirma que corres desde el **Centro de Mando Sabio** (la única sede con escritura sobre el plano
global): debe existir su MCP `sabio-shared` y su `04-Recursos/` con las Salas globales. Si **no** estás
en el Centro, **detente**: *«/sabio-promover-buzon solo se ejecuta desde el Centro de Mando Sabio»*. No
intentes escribir el plano global desde un proyecto normal.

## Fase 1 · Escanear los buzones (solo lectura, inofensivo)
Recorre **solo** la carpeta-buzón de cada proyecto de tu flota:
```
<proyectos>/*/04-Recursos/04-Aprendizaje/promociones/*.md
```
Lee **únicamente** esos archivos. **Prohibido** abrir cualquier otra carpeta de cualquier proyecto
(bóveda Sala A, demás Salas, código, datos) — aislamiento. De cada paquete extrae: `origen` (proyecto),
`fecha`, los **candidatos** (con su Sala destino e **IDs propuestos**) y `estado`.

## Fase 2 · Cruzar contra el plano global (sin ledger extra)
Para cada paquete, comprueba si sus **IDs propuestos ya existen** en el plano global del Centro (el propio
global es el registro — una fuente por capa):
- `norma:` → `04-Recursos/03-Referencia/registros/` (o su `index.md`).
- `investigacion:` → la bóveda global (`index.md` y `wiki/`).
- `aprendizaje:` → `04-Recursos/04-Aprendizaje/registros/`.
- `activo:` → `04-Recursos/02-Catalogo/index.md`.

Clasifica cada paquete:
- **PENDIENTE de materializar** — ninguno de sus IDs está aún en el global.
- **YA EN EL GLOBAL** — todos sus IDs existen → solo falta **federar de vuelta** en el proyecto de origen.
- **PARCIAL / revisar** — algunos sí, otros no (materialización incompleta o IDs cambiados).

## Fase 3 · Listar y dejar que el humano elija (el GATE)
Muestra una lista **numerada** y clara, p. ej.:
```
Buzones de promoción — flota · escaneo <fecha>

PENDIENTES de materializar
  [1] <proyecto> · <paquete>
      <N> candidatos: <resumen por Sala> · depositado <fecha> · 0 de <N> IDs en el global
  ...

YA EN EL GLOBAL (solo falta cerrar en el origen)
  [k] <proyecto> · <paquete> → <ID> ya existe → marca "promovido" en <proyecto>

→ Elige un número para materializar, varios, o "nada".
```
**No materialices nada por tu cuenta.** Espera la elección del usuario. Si responde "nada", cierra sin escribir.

## Fase 4 · Materializar lo elegido (re-triaje, NO volcado)
Para cada paquete que el usuario elija, **delega en el agente `sabio-curator`** y sigue el **mismo flujo
que `/sabio-promover` en su rama "En el Centro de Mando"**: re-tría **uno por uno** (¿transversal de
plataforma, de una jurisdicción/sector, o propio del proyecto?), asigna la **etiqueta de ámbito** que
corresponda (`ambito: universal` · `jurisdiccion: <ISO-3166>` · `sector: <slug>`; ver el `LEEME - Esquema
Sala C.md` de la Sala C), materializa en la Sala global dueña con su **ID estable**, deposita fuentes
oficiales si las hay, actualiza el índice de esa Sala y su bitácora, y **verifica 0 enlaces rotos**.
Desconfía de los lotes grandes: lo de dominio/proyecto **no** sube. El paquete entra por su ruta en el
buzón (ya autorizada por este comando); **no** salgas a leer nada más del proyecto.

## Fase 5 · Federar de vuelta (sin escribir el origen)
El Centro **no escribe** en los proyectos. Al cerrar, **devuelve al usuario** los **IDs estables**
resultantes y qué registros del proyecto de origen debe avanzar a `estado: promovido` / `federado-global`
(lo aplica él, o un `/sabio-promover` desde ese proyecto). Indica también los paquetes que quedaron en
"YA EN EL GLOBAL" para que cierre su federación de vuelta pendiente.

## Reglas (no negociables)
- **Solo lectura del buzón:** leo **únicamente** `…/04-Aprendizaje/promociones/` de cada proyecto; jamás
  otra carpeta (bóveda, Salas, código). **Nunca escribo** en un proyecto.
- **El gate es humano:** el escaneo descubre y lista; **materializa solo lo que el usuario elige**. Nunca
  auto-promuevo.
- **Re-triaje, no volcado:** cada candidato se evalúa de nuevo con el criterio jurisdicción-agnóstico y se
  etiqueta por ámbito. Un volcado en bloque contamina el plano global.
- **Una fuente por capa:** el cruce contra el global evita doble materialización; no creo un ledger aparte.
- **Mostrar, no afirmar:** cuenta real de buzones/paquetes; tras materializar, enseña conteos y 0 enlaces
  rotos. Verificación parcial → estado **parcial**, no "hecho".
