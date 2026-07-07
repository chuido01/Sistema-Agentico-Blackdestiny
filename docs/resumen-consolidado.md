# Sistema Agéntico Blackdestiny — resumen consolidado

> El Sistema Agéntico Blackdestiny reúne **tres componentes**: **SABIO** (el conocimiento/memoria),
> **GREMIO** (la plataforma de rigor que blinda lo que construyes sobre ese saber) y **COUNCIL** (el
> consejo que somete las decisiones a debate). **SABIO sabe · el humano construye · GREMIO blinda ·
> COUNCIL delibera.** Este documento cubre SABIO a fondo (sección 1–11) y cierra con GREMIO (§12) y
> COUNCIL (§13); el detalle de GREMIO vive en [`../gremio/`](../gremio/).

## 1. Qué es SABIO (la idea en una frase)

SABIO es la **memoria a largo plazo para trabajar con una IA**: un sitio ordenado donde cada cosa
que investigas o decides queda guardada **una sola vez**, etiquetada, y se puede volver a encontrar —
sin que un proyecto se contamine con los datos de otro.

**SABIO** = **S**istema de **A**rchivos, **B**óvedas e **Í**ndices **O**rganizados.

---

## 2. El problema que resuelve (dos olvidos y un desorden)

- **Olvido dentro del chat.** En conversaciones largas la IA olvida lo de arriba: su "ventana" de
  atención se satura.
- **Olvido entre sesiones.** Cierras el chat y mañana no recuerda lo que decidieron.
- **Desorden / mezcla.** Antes todo vivía junto sin frontera, y los datos de un proyecto (su marca,
  su paleta) se filtraban en otro.

SABIO ataca los tres a la vez.

---

## 3. La gran decisión: SIN RAG

No se usa una base de datos vectorial (eso es "RAG"). A un volumen moderado (menos de ~2.000
páginas) basta una **wiki en texto que la IA lee directamente**. Es más simple, más barato y más
controlable. Es el patrón "LLM Wiki" de Andrej Karpathy.

---

## 4. Los dos cimientos: Capa 1 y Capa 2

Son la **arquitectura** (los cimientos del sistema):

- **Capa 1 — No perderse.** Dos cosas: el **aislamiento** (cada proyecto en su caja) y la **gestión
  de contexto** (que la IA no se sature en un chat largo).
- **Capa 2 — Recordar.** La **bóveda de conocimiento** que guarda lo aprendido entre sesiones.

> ⚠️ No confundir las **Capas** (la arquitectura) con las **Salas** (los tipos de conocimiento).

---

## 5. Los dos planos: global y local

- **Plano global — el Centro de Mando.** Lo que es igual para todos vive aquí **una sola vez** y es
  de **solo lectura**: la investigación transversal (Sala A, hoy **multi-dominio**), las normas (Sala C) y las lecciones transversales que se promueven (Sala D).
- **Plano local — cada proyecto.** Lo propio de cada proyecto, dentro de su caja: su investigación
  (Sala A), su catálogo (Sala B) y su captura de aprendizajes (Sala D). *(La Sala A y la D viven en los dos planos: locales en cada proyecto, y transversales/multi-dominio en el Centro.)*

**La única conexión va hacia arriba y es de solo lectura:** un proyecto puede *consultar* el plano
global (vía un puente llamado MCP `sabio-shared`), pero **jamás** lee la carpeta de otro proyecto.
Eso es el aislamiento.

---

## 6. Las 5 Salas: conocimiento + decisiones

Cada dato es de un tipo, y por eso vive en una Sala concreta (como estanterías):

| Sala | Qué guarda | Etiqueta (ID) |
|---|---|---|
| **A · Investigación** | Lo que estudias: notas cortas (una idea por nota) enlazadas entre sí. Es la bóveda. La del Centro es **multi-dominio** (un dominio nuevo = etiqueta + mapa, no una bóveda aparte). | `investigacion:<tema>` |
| **B · Catálogo** | Tus herramientas y activos: fichas de qué tienes, para qué sirve, qué cuesta. | `activo:<cosa>` |
| **C · Referencia** | Normas y estándares externos, en el plano global. **Segmentada por ámbito**: `universal` (NIST/ISO/PCI, para todos), `jurisdiccion:` (la ley de un país), `sector:` (un rubro). Sube lo que **necesita más de un proyecto**, no "lo internacional". | `norma:<marco>:<código>` |
| **D · Aprendizaje** | Lecciones de lo que pasó, para no repetir errores. | `aprendizaje:<id>` |
| **E · Decisiones (Gremio)** | El tablero de GREMIO: la **intención** (`intencion.md`) y los **Decision Records**. **Local por proyecto, jamás se federa** — al global solo sube un aprendizaje (D) destilado. La crea GREMIO al operar. | `dr:<dominio>-<n>` |

**Dos perfiles de la Sala D** — **una sola forma física, un flag de comportamiento.** Todos los proyectos
llevan la **misma** Sala D en disco (el superconjunto: `ESQUEMA.md` + un validador en **todos**). El perfil
es un **flag** en el `CLAUDE.md` (`Perfil Sala D: base | agentico`):
- **Base** — captura sencilla con `/sabio-aprender`; el validador está presente pero inerte.
- **Agéntico** — el flag activa el validador (integridad forzada) y la confianza numérica con umbral.

---

## 7. La regla de oro: un dato, un solo hogar

**Nada se copia.** Si dos sitios necesitan el mismo dato, uno lo **guarda** y el otro lo **señala
con su etiqueta (ID)**.

- Ejemplo: una norma vive una sola vez en la Sala C, con su etiqueta. Los proyectos no la copian: la
  señalan. Si la norma cambia, se actualiza en un solo sitio y todos ven el cambio.
- El **índice de índices** es el mapa que dice **qué etiqueta vive en qué Sala**. Es el espinazo del
  sistema: con él, cualquiera que encuentre una etiqueta sabe dónde resolverla.

Esto evita duplicados y "deriva" (que dos copias del mismo dato se desincronicen).

---

## 8. El Centro de Mando: el cuartel general

No es un proyecto más: es el sitio que **sirve a todos los proyectos** sin ser uno de ellos.

**Sus 4 trabajos:**
1. **Guardar el conocimiento común** (el plano global: la Sala A transversal multi-dominio + las Salas C y D transversales).
2. **Repartir SABIO a proyectos nuevos** (el Kit).
3. **Observar la salud de la flota** (un panel/dashboard).
4. **Mejorar la flota sola** (el volante: agentes y comandos).

**El dashboard de flota** lee datos de configuración (no el contenido de tu trabajo) y responde dos
preguntas: *¿está todo a salvo y sano?* y *¿qué atiendo primero?*. No mide a todos igual: distingue
**4 arquetipos** de proyecto (control, agéntico, tradicional, simple) y a cada uno lo cuida con su
propia vara. Usa un **semáforo** (verde / ámbar / rojo) y una lista de prioridades.

**El poder especial — sede de despliegue:** el Centro de Mando es el único que puede "salir" hacia
los proyectos, pero **solo en una dirección y para una cosa**: desplegar el Kit (crear o actualizar
estructura). Nunca lee ni mezcla el conocimiento de un proyecto con otro.

---

## 9. Los proyectos: iguales por fuera, aislados por dentro

- **Iguales por fuera:** todos nacen del Kit, así que comparten las mismas 5 carpetas. Entiendes uno,
  los entiendes todos.
- **Aislados por dentro:** cada proyecto trabaja solo con su contexto; ninguno lee a otro. Esa
  ausencia de conexiones *es* el aislamiento.
- **Lo único compartido:** el conocimiento común del Centro de Mando, de solo lectura.

---

## 10. El volante: cómo una buena idea llega a todos

Sin esto, los proyectos serían islas que repiten trabajo. El volante hace que lo bueno se contagie:

- **Agentes** — ayudantes especializados disponibles en todos los proyectos (revisor de código,
  escritor de commits, de documentación, curador de investigación, curador de SABIO, reflector de auto-mejora, de seguridad).
- **`/sabio-promover`** — sube una lección genérica al plano global (una sola copia) para que todos la usen.
- **`/sabio-promover-buzon`** — (solo en el Centro) descubre y materializa los paquetes que la flota dejó
  listos en su buzón: automatiza el *transporte* del volante, sin copia-pega. Tú eliges qué sube.
- **`/memory-lint`** — vigila que no haya conocimiento duplicado ni desactualizado. Por defecto solo
  reporta, no toca nada.
- **`/sabio-aprender`** — captura una lección en la Sala D local (la puerta de entrada). Su modo
  **`--reflexivo`** reflexiona sobre un trabajo cerrado con feedback externo e infiere la lección antes
  de guardarla (la captura inteligente). *(`/sabio-reflector` se conserva como alias deprecado.)*
- **`/sabio-converger`** — (solo en el Centro) converge la flota al molde canónico del Kit: detecta el
  *drift* generacional de cada proyecto y, con tu OK, re-proyecta lo atrasado sin tocar su contenido.
- **`/disenar`** — ante una duda de diseño, da una recomendación equilibrando simplicidad y estructura.

---

## 11. Glosario express (las confusiones aclaradas)

- **Capa 1 / Capa 2** = la **arquitectura** (aislamiento + no perderse / la bóveda que recuerda).
- **Sala A–D** = los **tipos de conocimiento** (Investigación, Catálogo, Referencia, Aprendizaje); la **Sala E** = las **decisiones de construcción** de GREMIO (local, nunca se federa).
- **Plano local** = el conocimiento de un proyecto, que no sale de su caja.
- **Plano global** = el conocimiento compartido por toda la plataforma, de solo lectura.
- **Federar** = guardar un dato una vez y que los demás lo señalen por su etiqueta, en vez de copiarlo.
- **raw vs wiki** = fuentes originales intocables vs. las notas que la IA escribe a partir de ellas.
- **MCP `sabio-shared`** = el puente de solo-lectura por el que un proyecto consulta el plano global.

---

## 12. GREMIO — la plataforma de rigor (blinda lo que construyes sobre SABIO)

Si SABIO es el conocimiento, **GREMIO 2.0** es el rigor. La doctrina: **el producto lo construyes tú,
guiado por la IA** — la calidad de lo que un usuario percibe sigue tu atención, no la de una fábrica.
GREMIO no compite con esa construcción; **la blinda** con 3 servicios:

- **Contratos a demanda** (`/gremio-contrato`) — un **Líder** de dominio (Datos, Seguridad,
  Infraestructura o Arquitectura) registra UNA decisión en un **Decision Record (DR)** citando el
  conocimiento de SABIO, y tú lo **firmas con disparo declarado**. Solo donde el criterio de éxito es
  maquinal (un test, una consulta, una política verificable) — lo que se juzga con los ojos no se
  contractualiza.
- **Construcción de plataforma** (`/gremio-construir`) — los Especialistas construyen **solo lo que un
  usuario final no percibe** (migraciones, CI/CD, esquema, hardening), contra un DR firmado. Si el
  encargo toca una pantalla o un flujo visible, **se niega** y te lo devuelve al carril guiado.
- **Verificación adversarial + cierre honesto** (`/gremio-verificar` y `/gremio-cerrar`) — el corazón:
  un 2º par que **refuta** en vez de confirmar, pentest, CI desde cero, E2E confirmado en la fuente de
  verdad, performance como gate y críticos de diseño; y un cierre de **4 condiciones** (evidencia de
  cada DR · **tú recorres el producto contra tu intención** · verde en el destino real · release con
  rollback ensayado). Sin las 4, la palabra «cerrado» está prohibida.

**La puerta de entrada:** `/gremio-intencion <idea>` — un interrogatorio de doble pasada convierte tu
idea en `intencion.md`, **tu tablero** (validado contra tus palabras, con auditoría de traducción y
matriz de paridad contra apps de referencia). El **tablero** (intención + DRs) vive en la **Sala E** de
cada proyecto (**local; nunca se federa** — al plano global solo sube un aprendizaje destilado, jamás el
DR). El protocolo completo, el roster (25 agentes activos + 8 congelados) y las plantillas están en
[`../gremio/`](../gremio/).

> **Honestidad:** la versión 2.0 nace de la **evidencia empírica de 3 corridas reales** — la tercera
> cerró todas sus compuertas en verde con el producto sin convencer a su dueño, y la lección (*las
> compuertas verifican contratos, no producto percibido*) es exactamente lo que esta versión convierte
> en mecanismo. La 2.0 aún no tiene una corrida real en verde: las compuertas y tu firma existen
> exactamente para que "hecho" no sea un acto de fe.

---

## 13. COUNCIL — el consejo deliberativo (`/council`)

**COUNCIL** somete una idea o una decisión a **debate estructurado**: 5 **personas** + un *chairman*
que la discuten, la atacan (red-team) y devuelven una síntesis. Sirve para **idear, auditar una
decisión o buscarle los puntos ciegos** antes de comprometerte — y es el modo de **auditoría
adversarial** que GREMIO puede invocar antes de firmar un DR de alto riesgo (arquitectura, seguridad).

> **Límite honesto:** el consejo es **homogéneo** —son instancias del mismo modelo hablando entre sí—,
> así que aporta **ángulo y cobertura de puntos ciegos, no exactitud factual**. Amplía la perspectiva;
> no reemplaza la verificación empírica ni una fuente de verdad.
