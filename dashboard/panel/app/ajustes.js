/* ============================================================================
   ajustes.js — Sección "Ajustes": editar los umbrales del semáforo con vista
   previa instantánea (el panel se recolorea al teclear) y guardado PERMANENTE
   en panel/app/umbrales.js mediante la File System Access API (Chrome/Edge).

   Capas (por diseño):
   · Vista previa  → muta UMBRALES en memoria + borrador en localStorage; recolorea ya.
   · Permanente    → botón "Guardar": reescribe umbrales.js (queda versionado en git).
   Carga después de vistas.js (usa $, render, showToast, ARQUETIPOS…) y antes de main.js.
   ============================================================================ */

/* Campos editables (coinciden con la maqueta aprobada). Los de backup no aplican
   a 'simple' (backupObligatorio:false) y se muestran deshabilitados. */
const UMB_CAMPOS = [
  {k:'backupAmbar', label:'Copia 🟡 (días)', soloBackup:true},
  {k:'backupRojo',  label:'Copia 🔴 (días)', soloBackup:true},
  {k:'claudeKB',    label:'CLAUDE.md (KB)'},
  {k:'huerfanas',   label:'Huérfanas'},
];
const UMB_ARQS = [
  {k:'control',     label:'Control',     color:'var(--purple)'},
  {k:'agentico',    label:'Agéntico',    color:'var(--cyan)'},
  {k:'tradicional', label:'Tradicional', color:'var(--teal)'},
  {k:'simple',      label:'Simple',      color:'var(--dim)'},
];
const UMB_DRAFT_KEY = 'fleet-umbrales-draft';
let _umbHandle = null;   // FileSystemFileHandle reutilizado en la sesión
let _umbDirty  = false;  // ¿hay cambios sin guardar al archivo?

const GEAR_SVG = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>';
const SAVE_SVG = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>';
const RESET_SVG = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';
const CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

/* ¿El navegador permite escribir archivos? (Chrome/Edge sí; Firefox no) */
function fsaDisponible(){ return ('showOpenFilePicker' in window) || ('showSaveFilePicker' in window); }

/* ---------- borrador en localStorage (sobrevive a una recarga accidental) ---------- */
function guardarBorrador(){ try{ localStorage.setItem(UMB_DRAFT_KEY, JSON.stringify(UMBRALES)); }catch(_){ } }
function limpiarBorrador(){ try{ localStorage.removeItem(UMB_DRAFT_KEY); }catch(_){ } }
/* Aplica el borrador (si lo hay) sobre los umbrales efectivos AL ARRANCAR, para que
   el primer render ya muestre los colores con tus cambios pendientes. */
(function aplicarBorradorInicial(){
  try{
    const d = localStorage.getItem(UMB_DRAFT_KEY); if(!d) return;
    const o = JSON.parse(d);
    for(const k in UMBRALES){ if(o[k]) Object.assign(UMBRALES[k], o[k]); }
    _umbDirty = true;
  }catch(_){ }
})();

/* ---------- render de la sección ---------- */
function renderAjustes(){
  const host = $('view-ajustes'); if(!host) return;
  const head = `<div class="aj-head">
      <div class="aj-title">${GEAR_SVG}Ajustes · umbrales de alerta</div>
      <div class="aj-status" id="aj-status"></div>
    </div>
    <p class="aj-sub">Cambia un número y el panel se recolorea al instante (vista previa).
       Pulsa <b>Guardar</b> para fijarlo en <code>umbrales.js</code> — permanente y versionado en git.</p>`;

  const hrow = `<div class="aj-row aj-hrow"><span class="aj-cell aj-arqh">Tipo de proyecto</span>`
    + UMB_CAMPOS.map(c=>`<span class="aj-cell aj-h">${esc(c.label)}</span>`).join('') + `</div>`;

  const rows = UMB_ARQS.map(a=>{
    const u = UMBRALES[a.k] || {};
    const cells = UMB_CAMPOS.map(c=>{
      const dis = c.soloBackup && u.backupObligatorio === false;
      const val = dis ? '' : (u[c.k]==null ? '' : u[c.k]);
      return `<span class="aj-cell"><input type="number" min="0" step="1"
        data-arq="${a.k}" data-campo="${c.k}" value="${val}"
        ${dis?'disabled placeholder="—"':''} aria-label="${esc(a.label)} · ${esc(c.label)}"></span>`;
    }).join('');
    return `<div class="aj-row"><span class="aj-cell aj-arq"><span class="aj-dot" style="background:${a.color}"></span>${esc(a.label)}</span>${cells}</div>`;
  }).join('');

  const foot = `<div class="aj-foot">
      <button class="btn pri" id="aj-save" type="button">${SAVE_SVG}Guardar en umbrales.js</button>
      <button class="btn gho" id="aj-reset" type="button">${RESET_SVG}Restablecer</button>
      <span class="aj-note">Los enlaces <code>[[rotos]]</code> del grafo siguen fijos: 🟡 1–30 · 🔴 &gt;30.</span>
    </div>`;

  host.innerHTML = `<div class="ajustes">${head}<div class="aj-grid">${hrow}${rows}</div>${foot}</div>`;
  $('aj-save').onclick  = guardarUmbrales;
  $('aj-reset').onclick = restablecerUmbrales;
  actualizarEstadoAj();
}

function actualizarEstadoAj(){
  const el = $('aj-status'); if(!el) return;
  if(!fsaDisponible()){
    el.innerHTML = `<span class="aj-pill warn"><span class="aj-pdot"></span>Abre el panel en Chrome o Edge para poder guardar</span>`;
    return;
  }
  el.innerHTML = _umbDirty
    ? `<span class="aj-pill dirty"><span class="aj-pdot"></span>Cambios sin guardar</span>`
    : `<span class="aj-pill ok">${CHECK_SVG}Guardado</span>`;
}

/* ---------- vista previa instantánea ---------- */
document.addEventListener('input', ev=>{
  const inp = ev.target.closest && ev.target.closest('#view-ajustes input[data-arq]');
  if(!inp) return;
  const arq = inp.dataset.arq, campo = inp.dataset.campo;
  const raw = inp.value.trim();
  let val = raw==='' ? null : Number(raw);
  if(val!=null && (isNaN(val) || val<0)) return;   // ignora entradas inválidas
  if(!UMBRALES[arq]) return;
  UMBRALES[arq][campo] = val;
  _umbDirty = true;
  guardarBorrador();
  render();              // recolorea la flota con los nuevos umbrales (sin tocar el form)
  actualizarEstadoAj();
});

/* ---------- restablecer a valores de fábrica ---------- */
function restablecerUmbrales(){
  for(const k in DEFAULT_UMBRALES){ UMBRALES[k] = Object.assign({}, DEFAULT_UMBRALES[k]); }
  _umbDirty = true;
  guardarBorrador();
  renderAjustes();       // repinta los inputs con los valores de fábrica
  render();              // recolorea la flota
  showToast('Valores de fábrica restaurados — pulsa Guardar para fijarlos');
}

/* ---------- guardado permanente (File System Access API) ---------- */
function serializarUmbrales(u){
  const order = ['control','agentico','tradicional','simple'];
  const body = order.filter(k=>u[k]).map(k=>`  ${k}: ${JSON.stringify(u[k])}`).join(',\n');
  return '/* umbrales.js — Umbrales de alerta por arquetipo. Editable desde el panel\n'
       + '   (sección Ajustes → botón Guardar). semaforo.js lo lee como window.FLEET_UMBRALES\n'
       + '   y lo fusiona sobre sus valores de fábrica. Generado por el panel; una sola fuente viva. */\n'
       + 'window.FLEET_UMBRALES = {\n' + body + '\n};\n';
}

async function asegurarPermiso(h){
  try{
    const opt = {mode:'readwrite'};
    if(h.queryPermission && (await h.queryPermission(opt)) === 'granted') return true;
    if(h.requestPermission && (await h.requestPermission(opt)) === 'granted') return true;
  }catch(_){ }
  return false;
}

async function obtenerHandle(){
  if(_umbHandle && await asegurarPermiso(_umbHandle)) return _umbHandle;
  const guardado = await idbGet('umbHandle');
  if(guardado && await asegurarPermiso(guardado)){ _umbHandle = guardado; return guardado; }
  // Pedir al usuario que elija el archivo umbrales.js (una vez).
  showToast('Elige el archivo umbrales.js en la carpeta panel\\app');
  const [h] = await window.showOpenFilePicker({
    multiple:false,
    types:[{description:'Config de umbrales (umbrales.js)', accept:{'text/javascript':['.js']}}],
  });
  if(!(await asegurarPermiso(h))) throw new Error('permiso de escritura denegado');
  _umbHandle = h;
  await idbSet('umbHandle', h);
  return h;
}

async function guardarUmbrales(){
  if(!fsaDisponible()){ showToast('Tu navegador no permite escribir archivos — usa Chrome o Edge'); return; }
  try{
    const contenido = serializarUmbrales(UMBRALES);
    const h = await obtenerHandle();
    const w = await h.createWritable();
    await w.write(contenido);
    await w.close();
    _umbDirty = false;
    limpiarBorrador();
    actualizarEstadoAj();
    showToast('✓ Umbrales guardados en umbrales.js');
  }catch(e){
    if(e && (e.name==='AbortError' || e.name==='NotAllowedError')) return;  // canceló el diálogo
    showToast('No se pudo guardar: ' + ((e && e.message) || e));
  }
}

/* ---------- IndexedDB mínimo (recuerda el archivo elegido entre sesiones) ---------- */
function idbDB(){
  return new Promise((res,rej)=>{
    const r = indexedDB.open('fleet-panel', 1);
    r.onupgradeneeded = ()=>{ r.result.createObjectStore('kv'); };
    r.onsuccess = ()=>res(r.result);
    r.onerror   = ()=>rej(r.error);
  });
}
async function idbGet(k){
  try{ const db=await idbDB(); return await new Promise((res,rej)=>{ const t=db.transaction('kv','readonly').objectStore('kv').get(k); t.onsuccess=()=>res(t.result); t.onerror=()=>rej(t.error); }); }
  catch(_){ return null; }
}
async function idbSet(k,v){
  try{ const db=await idbDB(); return await new Promise((res,rej)=>{ const t=db.transaction('kv','readwrite').objectStore('kv').put(v,k); t.onsuccess=()=>res(); t.onerror=()=>rej(t.error); }); }
  catch(_){ }
}
