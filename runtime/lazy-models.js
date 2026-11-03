// Models are offline, but expensive to parse. Load once on first visit.
(() => {
  const jobs=new Map();
  function load(src){if(!jobs.has(src))jobs.set(src,new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>{jobs.delete(src);s.remove();reject(Error(src))};document.body.appendChild(s)}));return jobs.get(src)}
  window.whenSlideVisible=(id,callback)=>{const mount=document.getElementById(id);if(!mount)return;const slide=mount.closest('.slide');let done=false;const check=()=>{if(!done&&slide.classList.contains('active')){done=true;observer.disconnect();callback()}};const observer=new MutationObserver(check);observer.observe(slide,{attributes:true,attributeFilter:['class']});check()};
  const groups=[
    {ids:['cityCanvas','terrainCanvas'],files:['runtime/vendor/three.min.js','assets/city-dxf-lines.js','assets/dxf-redlines.js','assets/osm-city.js','assets/aws-terrain.js','assets/terrain-data.js','assets/original-site-model.js','runtime/terrain3d.js']},
    {ids:['modelCanvas','layout3dCanvas'],files:['runtime/vendor/three.min.js','assets/su-complete-offline.js','runtime/model3d.js']},
    {ids:['scheme2ModelCanvas'],files:['runtime/vendor/three.min.js','assets/scheme2-offline.js','runtime/scheme2-model.js']}
  ];
  groups.forEach(group=>{let pending;const run=()=>{if(!pending)pending=(async()=>{for(const file of group.files)await load(file)})().catch(error=>{pending=null;group.ids.forEach(id=>{const m=document.getElementById(id);if(!m||m.querySelector('.model-load-retry'))return;const b=document.createElement('button');b.className='model-load-retry';b.textContent='模型加载未完成，点击重试';b.onclick=()=>{b.remove();run()};m.appendChild(b)});console.error('模型加载失败',error)});};group.ids.forEach(id=>window.whenSlideVisible(id,run))});
})();
