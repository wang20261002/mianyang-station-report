(() => {
  const rows=window.ZERO_CARBON_INPUT.rows,metrics=window.PROJECT_METRICS;
  const f=(n,d=2)=>n.toLocaleString('zh-CN',{minimumFractionDigits:d,maximumFractionDigits:d});
  const sum=(rs,key='gfa')=>rs.reduce((s,r)=>s+r[key],0);
  const groups=[
    {name:'普通综合仓储',ids:['07-2','07-3','07-4'],rate:2200,range:'1,900–2,600',note:'常规土建、机电消防；不含货架与自动化设备'},
    {name:'保税仓库',ids:['12-南'],rate:2200,range:'1,900–2,600',note:'常规仓储建安；不含海关监管专用设备'},
    {name:'冻库建筑及保温',ids:['10','12-北'],rate:3000,range:'2,600–3,600',note:'约−18℃冻库；含建筑、保温地坪、冷库门及常规机电消防；制冷系统另列'},
    {name:'办公及安保宿舍',ids:['11','04','05','03'],rate:3000,range:'2,600–3,500',note:'一般装修、常规机电消防'},
    {name:'配套倒班宿舍',ids:['06'],rate:3000,range:'2,600–3,500',note:'报规报建按倒班宿舍；二次改造酒店，方案阶段建安暂估'},
    {name:'汽配汽修汽检（含汽车美容）',ids:['07-1'],rate:2000,functionalRate:3200,range:'功能口径2,600–3,500',note:'仓储口径不含二次改造；功能口径含一般装修及常规机电消防，不含举升、检测和维修等经营设备'},
    {name:'档案馆',ids:['02'],rate:2000,functionalRate:3600,range:'功能口径2,800–3,800',note:'仓储口径不含二次改造；功能口径含常规土建机电消防，不含密集架、专用恒温恒湿和数字化系统'},
    {name:'地面金库',ids:['01'],rate:2000,functionalRate:4500,range:'功能口径3,500–5,000',note:'仓储口径不含二次改造；功能口径含主体及一般防护暂估，不含库门、安防及金融专业设备'}
  ];
  groups.forEach(g=>{g.rows=rows.filter(r=>g.ids.includes(r.id));g.area=sum(g.rows);g.far=sum(g.rows,'far')});
  const cold=groups[2],totalArea=sum(rows),totalFar=sum(rows,'far');
  window.renderProjectMetrics();
  const items=[...groups.map(g=>({...g,kind:'building'})),
    {name:'冻库制冷系统',area:cold.area,rate:1400,range:'1,200–1,900',note:'机组、末端、管道及控制；不含货架，实际库容待核',kind:'equipment'},
    {name:'道路及硬化场地',area:80000,rate:450,range:'350–550',note:'南北暂列80,000㎡，非量取；含面层基层和常规场内排水',kind:'outdoor'},
    {name:'绿化及景观',area:metrics.newGreen,rate:300,range:'200–450',note:'新增建设用地按5%控制；不含海关已建绿地',kind:'outdoor'},
    {name:'坡道及交通构筑物',area:11200,rate:2500,range:'2,000–3,200',note:'暂列11,200㎡结构投影，不含于建筑面积；待专项核量',kind:'outdoor'}
  ];
  const presets=[
    {id:'warehouse',name:'统一仓储口径',uplift:650,rates:items.map(x=>x.rate+(x.kind==='building'?650:0))},
    {id:'functional',name:'按功能分别计价',uplift:400,rates:items.map(x=>(x.functionalRate||x.rate)+(x.kind==='building'?400:0))}
  ];
  let selected=0,modified=false;const rates=[...presets[0].rates];
  const section=document.querySelector('[data-title="工程造价估算"]'),head=section.querySelector('.section-head');
  section.replaceChildren(head);section.classList.add('investment-redesign');
  head.querySelector('h2').textContent='南北地块工程费用与项目总投资';
  head.querySelector('p:not(.eyebrow)').textContent='建筑面积保持不变｜仓储单价＋650元/㎡、功能单价＋400元/㎡｜总投资不含土地费用';
  const container=document.createElement('div');container.className='engineering-content';
  container.innerHTML=`
    <div class="cost-toolbar"><span>本轮预算调整价｜含税建安暂估、非询价｜拖动可调整</span><button type="button" id="resetCost">恢复本口径默认值</button></div>
    <div class="cost-presets" role="group" aria-label="工程费用默认值">${presets.map((p,i)=>'<button type="button" aria-pressed="'+(i===0)+'">'+p.name+'</button>').join('')}</div>
    <p class="cost-preset-status" aria-live="polite"></p>
    <div class="cost-extras"><label>零碳专项预算 <input id="carbonInvestment" type="number" min="0" step="0.01" value="0" aria-label="南北地块零碳专项投资万元"> 万元</label><label>其他补充工程专项 <input id="equipmentInvestment" type="number" min="0" step="10" value="0" aria-label="补充专项投资万元"> 万元</label></div>
    <div class="cost-layout"><div class="cost-controls" id="costControls"></div><div class="cost-total"><span>工程费用（含零碳建设工程）</span><strong id="costTotal"></strong><small>亿元</small><p class="cost-detail"></p>
      <div class="project-total-card"><span>项目总投资 · 不含土地费用</span><strong id="projectTotal" aria-live="polite"></strong><small>亿元</small><table class="investment-summary"><thead><tr><th>费用组成</th><th>万元</th></tr></thead><tbody id="investmentSummary"></tbody></table><p class="investment-formula">其他费6%；统一预备费5%；建设期利息2,000万元。可在“项目总投资”页签调整。</p></div>
      <details class="cost-breakdown"><summary>查看工程费用分项图表</summary><div class="cost-bars" id="costBars"></div></details></div></div>
    <details class="combined-rate-details"><summary>查看工程量、两套默认单价及计算明细</summary><table class="estimate-table"><thead><tr><th>子项</th><th>工程量㎡</th><th>仓储默认价元/㎡</th><th>功能默认价元/㎡</th><th>当前价元/㎡</th><th>分项费用万元</th><th>原估算参考区间（未含本次调整）元/㎡</th><th>计价范围/假设</th></tr></thead><tbody>${items.map((x,i)=>'<tr><td>'+x.name+'</td><td>'+f(x.area)+'</td><td>'+presets[0].rates[i]+'</td><td>'+presets[1].rates[i]+'</td><td></td><td></td><td>'+x.range+'</td><td>'+x.note+'</td></tr>').join('')}</tbody></table><p class="rate-scope-live"></p></details>
    <div class="cost-more"><button type="button" class="cost-open-rates">工程量与单价明细 →</button><button type="button" class="cost-open-bars">工程费用分项图表 →</button></div><p class="cost-scope-note"></p>`;
  section.append(...container.children);
  const investment=document.createElement('div');investment.className='investment-details estimate-panel';investment.hidden=true;
  investment.innerHTML=`<div class="investment-assumptions"><label>建设其他费率 <input id="otherFeeRate" type="number" min="0" max="100" step="0.1" value="6"> %</label><label>统一预备费率 <input id="contingencyRate" type="number" min="0" max="100" step="0.1" value="5"> %</label><label>建设期利息 <input id="constructionInterest" type="number" min="0" step="10" value="2000"> 万元</label><button type="button" id="resetInvestmentAssumptions">恢复6%／5%／2,000万元</button></div>
  <p>费率及利息为本轮投资试算假设，不是核定收费标准；本表不含土地费用及运营流动资金。</p>
  <div class="investment-comparison-wrap"><table class="estimate-table investment-comparison"><thead><tr><th>费用组成</th><th>计算依据</th><th id="warehouseColumn">统一仓储口径 · 默认</th><th id="functionalColumn">按功能分别计价 · 默认</th></tr></thead><tbody id="investmentComparison"></tbody></table></div>
  <p class="investment-reclassification"></p><p>工程量×当前单价＝分项工程费；工程费＋建设其他费＋统一预备费＋建设期利息＝项目总投资。金额单位：万元；合计按未取整值计算。</p>`;
  section.appendChild(investment);
  const $=s=>section.querySelector(s),num=(id,cap=Infinity)=>Math.min(cap,Math.max(0,Number($('#'+id).value)||0));
  const summaryRows=v=>[['工程费用（含零碳工程）',v.engineering],['建设其他费',v.otherFees],['统一预备费',v.contingency],['建设期利息',v.interest],['项目总投资（不含土地）',v.projectTotal]].map(([label,value],i)=>'<tr'+(i===4?' class="total"':'')+'><td>'+label+'</td><td>'+f(value/10000)+'</td></tr>').join('');
  function calculate(rs){
    const values=items.map((x,i)=>({name:x.name,value:x.area*rs[i],kind:x.kind}));
    const base=sum(values,'value'),building=sum(values.filter(x=>x.kind==='building'),'value');
    const carbon=num('carbonInvestment')*10000,extra=num('equipmentInvestment')*10000;
    const netCarbon=carbon/1.1,carbonReserveMoved=carbon-netCarbon;
    const engineering=base+netCarbon+extra,otherRate=num('otherFeeRate',100)/100,reserveRate=num('contingencyRate',100)/100;
    const otherFees=engineering*otherRate,contingency=(engineering+otherFees)*reserveRate,interest=num('constructionInterest')*10000;
    return {values,base,building,carbon,netCarbon,carbonReserveMoved,extra,engineering,otherFees,contingency,interest,otherRate,reserveRate,projectTotal:engineering+otherFees+contingency+interest};
  }
  function update(){
    const v=calculate(rates),pair=presets.map((p,i)=>calculate(i===selected?rates:p.rates));
    $('.cost-presets').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
    $('.cost-preset-status').textContent=presets[selected].name+(modified?'（已手动调整）':'（默认单价）')+'｜新建 '+f(totalArea)+'㎡，含配套增量5,751.61㎡｜建筑单价＋'+presets[selected].uplift+'元/㎡；设备、室外及零碳专项不重复加价。';
    section.querySelectorAll('.cold-cost-reference').forEach(el=>el.textContent='当前口径冻库建筑及保温 '+f(rates[2],0)+'元/㎡、制冷系统 '+f(rates[8],0)+'元/㎡已列入工程费用');
    $('.combined-rate-details').querySelectorAll('tbody tr').forEach((tr,i)=>{tr.cells[4].textContent=f(rates[i],0);tr.cells[5].textContent=f(items[i].area*rates[i]/10000)});
    $('.rate-scope-live').textContent='冻库建筑及保温 '+f(rates[2],0)+'＋制冷系统 '+f(rates[8],0)+'＝'+f(rates[2]+rates[8],0)+'元/㎡。分项费用＝工程量×当前单价÷10000。建筑均按实际建筑面积计价，不按双倍计容面积计价；已建海关主体不重复计费。原参考区间仅供对照，本轮默认价包含已确定预算调整，最终须以专项设计及造价成果核定。';
    $('#costTotal').textContent=(v.engineering/1e8).toFixed(2);$('#projectTotal').textContent=(v.projectTotal/1e8).toFixed(2);
    $('.cost-detail').textContent='建筑 '+f(v.building/10000)+'万元；分项工程小计 '+f(v.base/10000)+'万元；零碳工程费 '+f(v.netCarbon/10000)+'万元；其他专项 '+f(v.extra/10000)+'万元。';
    $('#investmentSummary').innerHTML=summaryRows(v);
    $('.investment-formula').textContent='其他费 '+f(v.otherRate*100)+'%；统一预备费 '+f(v.reserveRate*100)+'%；建设期利息 '+f(v.interest/10000)+'万元。参数可在“项目总投资”页签调整。';
    const bars=[...v.values,{name:'零碳专项工程费',value:v.netCarbon}];if(v.extra)bars.push({name:'补充专项',value:v.extra});
    $('#costBars').innerHTML=bars.sort((a,b)=>b.value-a.value).map(x=>'<div class="bar"><span>'+x.name+'</span><i style="width:'+(v.engineering?x.value/v.engineering*100:0)+'%"></i><b>'+f(x.value/10000)+'万</b></div>').join('');
    const labels=[['工程费用（含零碳工程）','建筑及室外等分项＋零碳工程费＋补充专项','engineering'],['建设其他费','工程费用×'+f(v.otherRate*100)+'%（不含土地相关费用）','otherFees'],['统一预备费','（工程费用＋建设其他费）×'+f(v.reserveRate*100)+'%','contingency'],['建设期利息','本轮暂列，可调整','interest'],['项目总投资（不含土地）','上述四项合计','projectTotal']];
    $('#investmentComparison').innerHTML=labels.map(([label,basis,key],i)=>'<tr'+(i===4?' class="total"':'')+'><td>'+label+'</td><td>'+basis+'</td>'+pair.map(x=>'<td>'+f(x[key]/10000)+'</td>').join('')+'</tr>').join('');
    $('#warehouseColumn').textContent=presets[0].name+' · '+(selected===0&&modified?'当前调整值':'默认单价');$('#functionalColumn').textContent=presets[1].name+' · '+(selected===1&&modified?'当前调整值':'默认单价');
    $('.investment-reclassification').textContent='零碳园区建设费用已计入总投资：当前零碳专项预算 '+f(v.carbon/10000)+'万元，其中建设工程 '+f(v.netCarbon/10000)+'万元已计入上表工程费用。原专项预备费 '+f(v.carbonReserveMoved/10000)+'万元不再单独叠加，预备费统一按（工程费＋建设其他费）×'+f(v.reserveRate*100)+'%计取，已覆盖零碳建设工程。这里只统一预备费口径，没有扣除零碳建设工程。';
    const defaultDifference=presets[1].rates.reduce((s,r,i)=>s+items[i].area*(r-presets[0].rates[i]),0);
    window.COMBINED_ESTIMATE={preset:presets[selected].id,modified,defaultDifference,items,rates:[...rates],...v,total:v.engineering,totalArea,totalFar,wholeArea:metrics.overall.gfa,wholeFar:metrics.overall.far,existingArea:4606,coldArea:cold.area,coldFar:cold.far};
    window.PROJECT_INVESTMENT={...v,preset:presets[selected].id,modified,comparisons:pair,landExcluded:true};
  }
  function applyPreset(i){selected=i;modified=false;rates.splice(0,rates.length,...presets[i].rates);$('#costControls').querySelectorAll('.cost-row').forEach((row,j)=>{row.querySelector('input').value=rates[j];row.querySelector('output').textContent=f(rates[j],0)+' 元/㎡'});update()}
  items.forEach((x,i)=>{const row=document.createElement('div');row.className='cost-row';row.innerHTML='<label>'+x.name+'<small>'+f(x.area)+'㎡</small></label><input type="range" min="0" max="'+Math.max(presets[0].rates[i],presets[1].rates[i])*2+'" step="50" value="'+rates[i]+'" aria-label="'+x.name+'单方造价"><output>'+f(rates[i],0)+' 元/㎡</output>';row.querySelector('input').addEventListener('input',e=>{modified=true;rates[i]=Number(e.target.value);row.querySelector('output').textContent=f(rates[i],0)+' 元/㎡';update()});$('#costControls').appendChild(row)});
  $('.cost-presets').querySelectorAll('button').forEach((b,i)=>b.onclick=()=>applyPreset(i));
  $('.cost-extras').addEventListener('input',update);$('.investment-assumptions').addEventListener('input',update);
  function resetAssumptions(){ $('#otherFeeRate').value='6';$('#contingencyRate').value='5';$('#constructionInterest').value='2000';update() }
  $('#resetInvestmentAssumptions').onclick=resetAssumptions;
  $('#resetCost').onclick=()=>{$('#equipmentInvestment').value='0';$('#carbonInvestment').value=((window.CARBON_ESTIMATE?.total)||0).toFixed(2);resetAssumptions();applyPreset(selected)};
  section.addEventListener('keydown',e=>{if(e.target.matches('input'))e.stopPropagation()});
  window.updateProjectInvestment=update;update();
})();
