(() => {
  const root = document;
  const page = title => root.querySelector(`[data-title="${title}"]`);
  const mark = (title, cls) => { const el = page(title); if (el) el.classList.add('redesign-page', ...(cls || '').split(/\s+/).filter(Boolean)); return el; };
  const add = (el, html, cls) => { const n = document.createElement('div'); if (cls) n.className = cls; n.innerHTML = html; el.appendChild(n); return n; };
  const setText = (el, text) => { if (el) el.textContent = text; };

  const cover = mark('项目封面', 'cover-redesign');
  if (cover) { const content = cover.querySelector('.cover-content'); if (content && !content.querySelector('.cover-lock')) add(content, '绵阳科技城临港经济发展西区｜站前配建项目', 'cover-lock'); }

  const location = mark('项目所在地定位', 'location-redesign');
  if (location && !location.querySelector('.planning-land-description')) setText(location.querySelector('.section-head p:not(.eyebrow)'), '市域定位 → 周边关系 → 用地红线。右侧规划条件图同步核对用地边界与项目入口。');

  const terrain = mark('场地高程及坡度示意', 'terrain-redesign');
  if (terrain && !terrain.querySelector('.terrain-conclusion')) add(terrain, '<b>高程结论</b><br>场地整体高差平缓，南北向物流组织优先利用现状坡向；最终竖向与排水以测绘资料复核。', 'terrain-conclusion');

  const planning = mark('规划条件', 'planning-redesign');
  if (planning && !planning.querySelector('.condition-priority')) { const compare = planning.querySelector('.condition-compare'); add(planning, '<article><b>容积率</b><span>仓储1.0—3.0，配套1.5—2.5，按下限组织。</span></article><article><b>建筑密度</b><span>不低于50%，作为总图强度底线。</span></article><article><b>生活配套</b><span>用地7%，建筑面积按14.99%控制。</span></article><article><b>高度与绿地</b><span>高度≤35m，绿地率按5%控制。</span></article>', 'condition-priority'); if (compare) compare.before(planning.querySelector('.condition-priority')); }

  mark('区域三维城市背景', 'city-redesign');
  const city = page('区域三维城市背景'); if (city) city.querySelectorAll('.terrain-toggles button[data-tool]').forEach(b => b.hidden = true);

  const model = mark('SU三维交互模型', 'model-redesign');
  if (model && !model.querySelector('.model-conclusions')) add(model, '<span>铁路货运场站是区域物流背景</span><span>铁岗大道承担城市展示与主入口关系</span><span>建筑体量沿纵深组织仓储与立体物流</span>', 'model-conclusions');

  const concept = mark('概念分析', 'concept-redesign');
  if (concept) { const crop = concept.querySelector('.scheme2-concept-crop'); const img = crop?.querySelector('img'); if (crop && img && !crop.querySelector('.concept-detail')) { for (let i = 0; i < 2; i++) { const d = document.createElement('div'); d.className = 'concept-detail'; const c = img.cloneNode(true); c.style.objectPosition = i ? 'right center' : 'center center'; d.appendChild(c); crop.appendChild(d); } add(concept, '<span>场地与交通关系</span><span>体块与屋顶能源界面</span><span>仓储、办公与绿色物流</span>', 'concept-caption'); } }

  const plan = mark('体块生成与总平面', 'plan-redesign');
  if (plan && !plan.querySelector('.plan-legend')) add(plan, '<span>北向 ↑</span><span>城市主入口｜铁岗大道</span><span>货运入口｜南区物流环线</span><span>12m / 3%货车坡道</span>', 'plan-legend');

  ['鸟瞰效果一','鸟瞰效果二','方案二鸟瞰','方案二正面半鸟瞰'].forEach((title, i) => { const el = mark(title, 'effect-redesign'); if (!el || el.querySelector('.effect-tags')) return; const tags = title === '方案二鸟瞰' ? ['城市入口与仓储组团关系'] : title === '方案二正面半鸟瞰' ? ['城市界面','立面连续性','首层入口'] : title === '鸟瞰效果一' ? ['城市界面','办公与倒班宿舍','仓储组团'] : ['铁路场站','仓储组团','南侧立体交通']; add(el, tags.map(x => `<span>${x}</span>`).join(''), 'effect-tags'); });
  const night = mark('夜景鸟瞰二', 'night-redesign'); if (night && !night.querySelector('.night-callouts')) add(night, '<span>夜间运营</span><span>道路照明</span><span>建筑入口</span>', 'night-callouts');
  const story = mark('故事板二', 'story-redesign'); if (story && !story.querySelector('.storyboard-note')) add(story, '<span><b>01｜到达</b>城市入口与场站识别</span><span><b>02｜组织</b>货运、客运与人行分流</span><span><b>03｜作业</b>仓储、装卸与立体交通</span><span><b>04｜运营</b>能耗、物流与安全管理</span>', 'storyboard-note');

  const s2Concept = mark('方案二概念分析', 'concept-redesign'); if (s2Concept) setText(s2Concept.querySelector('.small-note'), '历史概念标注：图中性能数字仅用于设计推演，不作为本轮面积、投资或零碳核算依据。');
  const f = mark('功能分区分析', 'analysis-static-redesign'); if (f && !f.querySelector('.analysis-focus-note')) add(f, '<span>冷链冻库区：北区温控仓储与制冷能耗重点</span><span>综合仓储区：南北连续货运与仓储组团</span><span>办公配套区：沿城市界面形成展示与运营支撑</span>', 'analysis-focus-note');
  const t = mark('交通组织分析', 'traffic-static-redesign'); if (t && !t.querySelector('.traffic-note')) add(t, '<span>大环线：园区主通行与消防通行</span><span>货运流线：坡道接入2—4层库房</span><span>安保流线：金库、档案与安保独立受控</span><span>无人路径：AGV连续作业，客货分流</span>', 'traffic-note');
  const s2Model = mark('方案二SU三维交互模型', 'scheme2-model-redesign'); if (s2Model && !s2Model.querySelector('.model-conclusions')) add(s2Model, '<span>仓储体块以2层为主，部分双倍计容需单独核算</span><span>办公、安保与倒班宿舍沿城市界面布置</span><span>冻库与充换电设施形成能源和物流耦合节点</span><span>模型查询值与报规台账保持口径区分</span>', 'model-conclusions');

  const metrics = mark('综合经济技术指标', 'metrics-redesign'); if (metrics) metrics.querySelector('.kpi-strip')?.remove();
  const cost = mark('工程造价估算', 'cost-redesign'); if (cost && !cost.querySelector('.cost-decision-map')) add(cost, '<article><b>工程费用</b><span>建筑、道路、场地与构筑物</span></article><article><b>零碳专项</b><span>光伏、储能、充换电与平台</span></article><article><b>普通仓储</b><span>双倍计容与实际建筑面积区分</span></article><article><b>冻库</b><span>常规保温制冷与节能增量分列</span></article><article><b>配套功能</b><span>办公、安保与倒班宿舍分别计价</span></article>', 'cost-decision-map');
  if (cost) {
    const rateDetails = cost.querySelector('.combined-rate-details');
    const costToolbar = cost.querySelector('.cost-toolbar');
    if (rateDetails && costToolbar && !cost.classList.contains('investment-redesign') && !rateDetails.dataset.movedTop) {
      costToolbar.before(rateDetails);
      rateDetails.dataset.movedTop = 'true';
    }
  }
  const conclusion = mark('方案结论', 'conclusion-redesign'); if (conclusion) { const fourth = conclusion.querySelector('.conclusion-grid div:nth-child(4)'); if (fourth) { fourth.querySelector('b').textContent='下一步工作'; fourth.querySelector('p').textContent='规划沟通、交通专项、面积指标与工程费用同步复核。'; } }
  const back = mark('项目封底', 'back-cover-redesign');
  if (back) {
    back.classList.add('closing-redesign');
    back.innerHTML = '<div class="closing-inner"><div class="closing-copy"><p class="eyebrow">汇报结束 / 下一步</p><h2>从总图到实施<br><span>把每一项假设变成可核查的工程条件</span></h2><div class="closing-grid"><article><b>规划沟通</b><span>核对南北地块边界、出入口与城市界面。</span></article><article><b>专项复核</b><span>推进交通、消防、竖向、能源与安全运营专项。</span></article><article><b>指标与造价</b><span>锁定面积口径、单价区间与分期投资边界。</span></article><article><b>持续核算</b><span>以实测能源账单和逐时负荷形成零碳闭环。</span></article></div><p class="closing-credit">四川省建筑设计研究院有限公司 · 绵阳科技城临港经济发展西区站前配建项目</p></div></div>';
  }
  const s2Plan = mark('方案二总平面', 'effect-redesign');
  const s2Night = mark('方案二夜景', 'effect-redesign night-redesign'); if (s2Night && !s2Night.querySelector('.night-callouts')) add(s2Night, '<span>夜间运营</span><span>道路照明</span><span>建筑入口</span>', 'night-callouts');

  const policy = mark('零碳建设目标', 'policy-redesign'); if (policy) policy.querySelector('.status-banner')?.remove();
  const boundary = mark('零碳边界与生命周期', 'boundary-redesign'); if (boundary && !boundary.querySelector('.lifecycle-steps')) add(boundary, '<span>01｜边界与基线</span><span>02｜分区计量</span><span>03｜降耗与能源替代</span><span>04｜年度核查与复盘</span>', 'lifecycle-steps');
  mark('国内零碳案例', 'case-redesign');
  const studio = mark('设计院数字孪生案例', 'studio-redesign'); if (studio) studio.querySelectorAll('.studio-case-grid article').forEach((a,i)=>{ if (!a.querySelector('.ability-tags')) { const tags = [['冷链建模','车辆与库存','运营监测'],['数字孪生','设备运维','能源管理'],['冷机诊断','COP趋势','低碳反馈']][i] || []; add(a, tags.map(x=>`<span>${x}</span>`).join(''), 'ability-tags'); }});
  mark('本项目光伏与换电措施', 'measure-redesign');
  const measures = page('本项目光伏与换电措施');
  if (measures) {
    measures.querySelector('.measure-digital-merge')?.remove();
    const pvImages = measures.querySelector('.measure-card:first-child .measure-images');
    if (pvImages && !pvImages.querySelector('[data-pv-center]')) {
      const pv = document.createElement('img');
      pv.src = 'assets/pv-center.jpg';
      pv.alt = '设计院光伏中心落成实景';
      pv.dataset.pvCenter = 'true';
      pvImages.appendChild(pv);
    }
    const oldFrames = measures.querySelectorAll('.pv-center-zoom-frame,.swap-zoom-frame');
    oldFrames.forEach(frame=>{
      const parent = frame.parentElement;
      if (!parent) return;
      while (frame.firstChild) parent.insertBefore(frame.firstChild, frame);
      frame.remove();
    });
    const pvCenter = measures.querySelector('[data-pv-center]');
    if (pvCenter && typeof openZoom === 'function' && pvCenter.dataset.zoomBound !== 'true') {
      pvCenter.dataset.zoomBound = 'true';
      pvCenter.classList.add('zoomable-card');
      pvCenter.tabIndex = 0;
      pvCenter.setAttribute('role','button');
      pvCenter.setAttribute('aria-label','设计院光伏中心落成实景，点击放大查看');
      pvCenter.addEventListener('click',()=>openZoom(pvCenter));
      pvCenter.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openZoom(pvCenter)}});
    }
    const swapImages = measures.querySelector('.measure-card:nth-child(2) .measure-images');
    swapImages?.querySelectorAll('img').forEach(img=>{
      img.classList.remove('zoomable-card');
      img.removeAttribute('tabindex');
      img.removeAttribute('role');
      img.removeAttribute('aria-label');
      img.removeAttribute('data-zoom-bound');
    });
  }
  const strategy = mark('南北地块零碳策略', 'strategy-redesign'); if (strategy && !strategy.querySelector('.strategy-band')) add(strategy, '主线：先降耗 → 供绿电 → 持续核算；策略四项落地，核查两项闭环。', 'strategy-band');
  mark('零碳总图措施', 'carbon-plan-redesign');
  const hsIntro = mark('高安全等级仓储与资产保管中心引入', 'hs-intro-redesign'); if (hsIntro) hsIntro.querySelector('h2')?.replaceChildren(document.createTextNode('高安全等级仓储与资产保管中心')); 
  const hsPlan = mark('高安全等级仓储与资产保管中心总平面', 'hs-plan-redesign');
  const hsFlow = mark('高安全等级仓储与资产保管中心交通流线', 'hs-flow-redesign'); if (hsFlow && !hsFlow.querySelector('.hs-flow-legend')) add(hsFlow, '<span>普通人员流线｜接待、登记与办公</span><span>受控货物流线｜查验、清点与交接</span><span>安全管理流线｜门禁、监控与核心保管</span>', 'hs-flow-legend');
  const hsScene = mark('高安全等级仓储与资产保管中心运营场景意向', 'hs-scene-redesign'); if (hsScene && !hsScene.querySelector('.hs-scene-flow')) add(hsScene, '<span>到达</span><span>核验</span><span>交接</span><span>保管</span>', 'hs-scene-flow');
  document.body.classList.add('ready');
})();





