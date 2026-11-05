const deck=document.getElementById('deck');
const omitted=new Set(['卫星图与底图','初步功能布局生成','分区功能与指标','高安全等级仓储与资产保管中心功能分区']);
[...document.querySelectorAll('.slide')].forEach(s=>{if(omitted.has(s.dataset.title))s.remove()});
const pageOrder=['项目封面','项目所在地定位','区域三维城市背景','场地高程及坡度示意','规划条件','SU三维交互模型','概念分析','体块生成与总平面','鸟瞰效果一','鸟瞰效果二','夜景鸟瞰二','故事板二','方案二概念分析','方案二SU三维交互模型','方案二总平面','功能分区分析','交通组织分析','方案二鸟瞰','方案二正面半鸟瞰','方案二夜景','高安全等级仓储与资产保管中心引入','高安全等级仓储与资产保管中心总平面','高安全等级仓储与资产保管中心交通流线','高安全等级仓储与资产保管中心运营场景意向','综合经济技术指标','零碳建设目标','零碳边界与生命周期','国内零碳案例','设计院数字孪生案例','本项目光伏与换电措施','南北地块零碳策略','零碳总图措施','工程造价估算','方案结论','项目封底'];
pageOrder.forEach(title=>{const s=[...deck.querySelectorAll('.slide')].find(x=>x.dataset.title===title);if(s)deck.appendChild(s)});
const chapterLabels={'体块生成与总平面':'第三部分 / 方案展示','高安全等级仓储与资产保管中心引入':'专项深化 / 高安全运营','高安全等级仓储与资产保管中心总平面':'专项深化 / 高安全运营','高安全等级仓储与资产保管中心功能分区':'专项深化 / 高安全运营','高安全等级仓储与资产保管中心交通流线':'专项深化 / 高安全运营','高安全等级仓储与资产保管中心运营场景意向':'专项深化 / 高安全运营','综合经济技术指标':'第四部分 / 指标与投资','工程造价估算':'第四部分 / 指标与投资','方案结论':'汇报结论 / 下一步'};
Object.entries(chapterLabels).forEach(([title,label])=>{const s=[...deck.querySelectorAll('.slide')].find(x=>x.dataset.title===title),e=s?.querySelector('.eyebrow');if(e)e.textContent=label});
const slides=[...document.querySelectorAll('.slide')];let index=0;const counter=document.getElementById('counter'),bar=document.getElementById('progressBar');function show(i){index=Math.max(0,Math.min(slides.length-1,i));slides.forEach((s,n)=>s.classList.toggle('active',n===index));counter.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');bar.style.width=((index+1)/slides.length*100)+'%';document.title=slides[index].dataset.title+'｜绵阳科技城临港经济发展西区场站配套基础设施建设项目';}document.getElementById('next').onclick=()=>show(index+1);document.getElementById('prev').onclick=()=>show(index-1);document.addEventListener('keydown',e=>{if(e.target.closest('input,select,textarea,[contenteditable="true"]'))return;if(zoomOverlay&&!zoomOverlay.hidden)return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(index+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(index-1)}});show(Number(new URLSearchParams(location.search).get('page')||1)-1);
document.querySelectorAll('p,span,b,h2,h3,button').forEach(el=>{if(el.textContent.includes('配套酒店'))el.textContent=el.textContent.replaceAll('配套酒店','配套倒班宿舍');if(el.textContent.includes('20枪'))el.textContent=el.textContent.replaceAll('20枪','50枪').replaceAll('1座换电','2座换电');});
const cost=document.querySelector('[data-title="工程造价估算"]');if(cost){cost.querySelector('#resetCost')?.remove();cost.querySelector('.section-head p:not(.eyebrow)')?.replaceChildren(document.createTextNode('只计算工程造价投资；两套按钮仅切换建筑计价口径。'));const note=cost.querySelector('.small-note');if(note)note.textContent='南北两区共用面积与零碳专项，两套按钮仅切换建筑计价口径；冻库常规保温制冷与零碳节能增量分列。'+note.textContent;}
const plan=document.querySelector('[data-title="体块生成与总平面"]');if(plan){plan.querySelectorAll('.i07,.l07a,.l07b').forEach(el=>el.remove());const c=plan.querySelector('.callout');if(c)c.textContent='北区用地红线按总平面图复核；图示军供站为已建现状建筑，不计入本轮北区建设用地及新增指标。';}
const rule=document.querySelector('[data-title="规划条件"]');if(rule)rule.querySelectorAll('span,strong,p').forEach(el=>{el.textContent=el.textContent.replaceAll('当前控制在15%以内','按14.99%控制').replaceAll('生活配套建筑面积不超过总建筑面积15%','生活配套建筑面积不超过总建筑面积15%（本轮按14.99%控制）');});
const analysisCopy={function:{cold:'冷链冻库区：承担温控仓储和冷链周转，制冷系统与北区能耗计量联动。',warehouse:'综合仓储区：承载普通仓储及二次改造功能，布置连续货运环线和无人设备通道。',security:'安保存储区：集中布置安保、金库及档案功能，减少与重卡流线交叉。',office:'形象办公配套区：沿城市界面承载办公、倒班宿舍和企业展示，形成园区入口形象。',charge:'客货充电区：南区集中布置客货充电设施，服务园区车辆并预留换电接口。',storage:'储能点位：结合光伏和充换电负荷进行削峰填谷，接入能碳管理平台。',yard:'集装箱堆场：承担集装箱临时堆放、待装、待卸和短倒组织。'},traffic:{loop:'园区内部大环线：组织园区主通行和消防通行，减少不同功能流线交叉。',freight:'园区2层货运流线：通过坡道和楼内货运路径保证货车到库，衔接AGV与公路运输。',security:'安保区流线：服务金库、档案和安保功能，保持相对独立和可控。',agv:'专用无人设备作业通道：为AGV和无人叉车提供连续作业路径，减少人工车辆干扰。',charge:'客／货充电区：按客货车辆分区组织充电和待机，避免充电排队占用主环线。',storage:'储能点位：靠近光伏、充电和主要负荷节点，便于能源调度。'}};
document.querySelectorAll('.analysis-interactive').forEach(box=>{const kind=box.dataset.analysis,readout=box.querySelector('.analysis-readout');const select=key=>{box.dataset.selected=key;box.querySelectorAll('.analysis-hit').forEach(x=>x.classList.toggle('active',x.dataset.key===key));if(readout)readout.textContent=analysisCopy[kind]?.[key]||'';};box.querySelectorAll('.analysis-hit,.analysis-region').forEach(hit=>{hit.addEventListener('click',()=>select(hit.dataset.key));hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(hit.dataset.key)}})});});
const agvOverlay=document.querySelector('.traffic-region[data-key="agv"]');if(agvOverlay)agvOverlay.setAttribute('d','M370 180 L520 145 L780 300 L900 520 L820 700 L560 760 L430 560 Z M1080 1170 L1320 980 L1660 1040 L1720 1280 L1450 1430 L1180 1340 Z M1660 920 L1980 700 L2330 780 L2410 1030 L2150 1210 L1840 1160 Z M2320 610 L2660 470 L2860 560 L2900 760 L2660 870 L2420 820 Z');
const trafficSvg=document.querySelector('[data-analysis="traffic"] .analysis-overlay');if(trafficSvg){[['charge',[[575,310,110,70],[1400,850,100,180],[1920,680,120,210],[2540,380,120,190]]],['storage',[[900,260,120,70],[2790,120,130,80]]]].forEach(([key,rects])=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','analysis-region');g.dataset.key=key;rects.forEach(([x,y,w,h])=>{const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width',w);r.setAttribute('height',h);g.appendChild(r)});trafficSvg.insertBefore(g,trafficSvg.querySelector('.analysis-legend'));g.addEventListener('click',()=>{trafficSvg.closest('.analysis-interactive').dataset.selected=key;trafficSvg.closest('.analysis-interactive').querySelector('.analysis-readout').textContent=analysisCopy.traffic[key]})});}
document.querySelectorAll('[data-title="功能分区分析"],[data-title="交通组织分析"]').forEach(section=>{section.querySelector('.analysis-overlay')?.remove();section.querySelector('.analysis-readout')?.remove();section.querySelector('.analysis-interactive')?.classList.add('analysis-static');const p=section.querySelector('.section-head p:not(.eyebrow)');if(p)p.textContent=section.dataset.title==='功能分区分析'?'方案二功能分区与场地色块表达。':'方案二园区内部大环线、2层货运流线与专用无人设备作业通道表达。';});
const locationTitles=['01｜绵阳市域','02｜项目周边','03｜项目红线'];
const locationHints=['点击图面进入项目周边','点击图面叠加项目红线','卫星图与底图合图定位基准'];
let locationStep=0;function showLocationStep(step){const box=document.getElementById('locationSequence');if(!box)return;locationStep=Math.max(0,Math.min(2,step));box.className='location-sequence image-frame step-'+locationStep;box.querySelectorAll(':scope>img').forEach((img,i)=>img.classList.toggle('active',i===locationStep));document.querySelectorAll('[data-location-step]').forEach((b,i)=>b.classList.toggle('active',i===locationStep));document.getElementById('locationStepTitle').textContent=locationTitles[locationStep];document.getElementById('locationStepHint').textContent=locationHints[locationStep]}
document.querySelector('.sequence-hit')?.addEventListener('click',()=>showLocationStep((locationStep+1)%3));document.querySelectorAll('[data-location-step]').forEach(b=>b.addEventListener('click',()=>showLocationStep(Number(b.dataset.locationStep))));showLocationStep(Number(new URLSearchParams(location.search).get('loc')||0));
const locationSequence=document.getElementById('locationSequence');
if(locationSequence&&!locationSequence.parentElement.classList.contains('location-analysis-layout')){
  const layout=document.createElement('div');layout.className='location-analysis-layout';
  locationSequence.parentNode.insertBefore(layout,locationSequence);layout.appendChild(locationSequence);
  const condition=document.createElement('aside');condition.className='planning-boundary-panel image-frame';
  condition.innerHTML='<img src="assets/planning-boundary-screen.webp" alt="绵自然资规设（2024）181号地块规划条件用地范围图"><div><b>规划条件用地范围</b><span>绵自然资规设（2024）181号｜A/B/C/D地块</span></div>';
  layout.appendChild(condition);
}
const masterplan=document.querySelector('[data-title="体块生成与总平面"] .plan-wrap img');if(masterplan){masterplan.src='assets/masterplan-entrances-v65-screen.webp';masterplan.alt='彩色总平面、园区出入口及10/11号配套设施'}
locationSequence?.querySelector('.sequence-site')?.remove();
const locationIntro=document.querySelector('[data-title="项目所在地定位"] .section-head p:not(.eyebrow)');
if(locationIntro){locationIntro.classList.add('planning-land-description');locationIntro.innerHTML='规划用地性质：铁路用地兼容一类物流仓储用地及相关配套的行政办公用地。<br>本轮净建设用地（B地块扣减30亩）：'+window.PROJECT_LAND.total.toFixed(2)+'平方米<br>其中，A地块：68902.59平方米　B地块：'+window.PROJECT_LAND.B.toFixed(2)+'平方米<br>C地块：3508.02平方米　D地块：14.30平方米';}
document.querySelector('#modelCanvas .model-toggles')?.remove();
const conclusionCards=document.querySelectorAll('[data-title="方案结论"] .conclusion-grid p');
if(conclusionCards[0])conclusionCards[0].textContent='铁岗大道是唯一城市道路界面，也是园区主要形象展示面，园区主入口均开在此路，但铁岗大道属于快速路，后期开口需与规划与交管部门沟通，可能需要做交评论证；';
if(conclusionCards[1])conclusionCards[1].textContent='北侧ACD地块按方案二总图布置03保税仓库、08冻库及04一期海关监管中心；南侧B地块布置07综合仓储、05办公与倒班宿舍、06汽配汽检汽修，并配置10充换电站与11光伏储能。';
const zoneText={privacy:'01金库、02档案库及05办公与倒班宿舍按方案二总图布置，避开主货运流线并保持受控运营。',bonded:'03保税仓库与04一期海关监管中心相邻，便于统一监管、装卸组织和一体化运营。',city:'05办公与倒班宿舍、06汽配汽检汽修沿城市界面布置，形成展示与运营服务界面。',logistics:'07综合仓储、08冻库由09汽车坡道衔接，10充换电站与11光伏储能形成物流与能源协同节点。'};document.querySelectorAll('.layout-notes button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.layout-notes button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('zoneText').textContent=zoneText[b.dataset.zone];window.SU_MOUNTS?.layout?.highlight(b.dataset.zone)});
// B地块投资估算由 revision.js 按最新面积表计算。

// 零碳章节卡片：点击后在受限视口内完整放大，点击遮罩或按 Esc 关闭。
const zoomSelectors=[
  '[data-title="零碳边界与生命周期"] .carbon-boundary-visuals figure img',
  '[data-title="设计院数字孪生案例"] .studio-case-grid article img',
  '[data-title="本项目光伏与换电措施"] .measure-card:first-child .measure-pv-images img',
  '[data-title="南北地块零碳策略"] .carbon-evaluation article',

];
const zoomOverlay=document.createElement('div');
zoomOverlay.className='card-zoom-overlay';
zoomOverlay.hidden=true;
zoomOverlay.innerHTML='<div class="card-zoom-dialog" role="dialog" aria-modal="true" aria-label="放大查看"><button class="card-zoom-close" type="button" aria-label="关闭放大查看">×</button><div class="card-zoom-content"></div><div class="card-zoom-hint">点击空白处或按 Esc 关闭</div></div>';
document.body.appendChild(zoomOverlay);
const zoomContent=zoomOverlay.querySelector('.card-zoom-content');
let zoomSource=null;
const closeZoom=()=>{zoomSource?.blur();zoomSource=null;zoomOverlay.classList.remove('is-open');setTimeout(()=>{zoomOverlay.hidden=true;zoomContent.replaceChildren()},180)};
const openZoom=card=>{zoomSource=card;const clone=card.cloneNode(true);const sourceRect=card.getBoundingClientRect();const isImage=card instanceof HTMLImageElement;const naturalWidth=isImage&&card.naturalWidth?card.naturalWidth:0;const naturalHeight=isImage&&card.naturalHeight?card.naturalHeight:0;const baseWidth=Math.max(naturalWidth,card.scrollWidth,Math.round(sourceRect.width));const baseHeight=Math.max(naturalHeight,card.scrollHeight,Math.round(sourceRect.height));clone.style.width=baseWidth+'px';if(isImage&&naturalHeight)clone.style.height=naturalHeight+'px';clone.style.maxWidth='none';clone.style.setProperty('--zoom-scale','1');zoomContent.replaceChildren(clone);zoomOverlay.hidden=false;requestAnimationFrame(()=>{const available=zoomContent.getBoundingClientRect();const safeWidth=Math.max(160,available.width-32);const safeHeight=Math.max(120,available.height-32);const scale=Math.min(safeWidth/baseWidth,safeHeight/baseHeight);clone.style.setProperty('--zoom-scale',String(Math.max(.35,scale)));zoomContent.scrollLeft=0;zoomContent.scrollTop=0;zoomOverlay.classList.add('is-open')});zoomOverlay.querySelector('.card-zoom-close').focus()};
document.querySelectorAll(zoomSelectors.join(',')).forEach(card=>{
  card.classList.add('zoomable-card');card.tabIndex=0;card.setAttribute('role','button');
  const label=card.querySelector('figcaption,h3')?.textContent?.trim();if(label)card.setAttribute('aria-label',label+'，点击放大查看');
  card.addEventListener('click',()=>openZoom(card));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openZoom(card)}});
});
zoomOverlay.querySelector('.card-zoom-close').addEventListener('click',closeZoom);
zoomOverlay.addEventListener('click',e=>{if(e.target===zoomOverlay)closeZoom()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!zoomOverlay.hidden)closeZoom()});






