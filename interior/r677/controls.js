'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const catalog = window.R677;
  const stones = new Map(catalog.stones.map(s => [s.id,s]));
  const roles = {island:'Остров',counter:'Столешница',wall:'Стеновая панель'};
  const views = {front:'Фасад',angle:'Под углом',island:'Остров',detail:'Мойка'};
  const initial = {island:'r677',counter:'r677',wall:'r677',linked:true,paint:'porcelain',metal:'brass'};
  const storage = 'levoni.r677.finishes.v1';
  let state = {...initial};
  try {
    const saved = JSON.parse(localStorage.getItem(storage)) || {};
    for (const role of Object.keys(roles)) if (stones.has(saved[role])) state[role]=saved[role];
    for (const role of ['paint','metal']) if(catalog[role].some(s=>s.id===saved[role])) state[role]=saved[role];
    state.linked=typeof saved.linked==='boolean' ? saved.linked : true;
    const incoming=catalog.stones.find(s=>s.swatch===new URLSearchParams(location.search).get('decor'));
    if(incoming) { state.counter=incoming.id; if(state.linked)state.island=state.wall=incoming.id; }
  } catch {}
  let view='front', mode='live', target='island', painting=0, transition=0;
  let live, livePromise, glUnavailable=false;
  const scripts=new Map(), rasterCache=new Map(), texCache=new Map();
  window.R677views={};
  function loadScript(src) {
    if(!scripts.has(src)) scripts.set(src,new Promise((resolve,reject)=>{
      const script=document.createElement('script'); script.src=src;script.onload=resolve;
      script.onerror=()=>{scripts.delete(src);reject(new Error('Не удалось загрузить '+src));};
      document.head.append(script);
    }));
    return scripts.get(src);
  }
  function decoded(src) {
    const image=new Image(); image.src=src;
    return image.decode().then(()=>image);
  }
  async function pixels(src,limit) {
    const image=await decoded(src);
    const scale=Math.min(1,limit/image.width);
    const canvas=document.createElement('canvas');
    canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);
    const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0,canvas.width,canvas.height);
    return c.getImageData(0,0,canvas.width,canvas.height);
  }
  async function raster(key) {
    if(!rasterCache.has(key)) rasterCache.set(key,(async()=>{
      await loadScript('./views/'+key+'.js');
      const r=window.R677views[key];
      const [photo,uv,neutral]=await Promise.all([pixels(r.jpeg,2000),pixels(r.uv,2000),pixels(r.neutral,2000)]);
      return {photo,uv,neutral,src:r.jpeg};
    })().catch(e=>{rasterCache.delete(key);throw e;}));
    return rasterCache.get(key);
  }
  function texture(id) {
    if(!texCache.has(id))texCache.set(id,pixels(stones.get(id).image,1800));
    return texCache.get(id);
  }
  function rgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));}
  function sampleIndex(image,u,v,span) {
    const x=u/span[0],y=-v/span[1];
    return (Math.floor((y-Math.floor(y))*image.height)*image.width+Math.floor((x-Math.floor(x))*image.width))*4;
  }
  async function photograph() {
    const pass=++painting, current=view, s={...state};
    const shot=await raster(current);
    if(pass!==painting||view!==current||mode!=='photo')return;
    const poster=$('poster'),canvas=$('photographic');
    poster.src=shot.src;poster.dataset.view=current;
    const changed=Object.keys(initial).filter(key=>key!=='linked'&&s[key]!==initial[key]);
    if(!changed.length){canvas.hidden=true;return;}
    const slots=['','island','counter','wall','paint','metal'];
    const altered=slots.map(key=>changed.includes(key));
    const maps=await Promise.all(slots.slice(1,4).map(key=>texture(s[key])));
    const neutralRGB=[205,203,196];
    const spans=slots.slice(1,4).map(key=>stones.get(s[key]).span);
    const ref=[rgb(catalog.paint[0].hex),rgb(catalog.metal[0].hex)];
    const other=['paint','metal'].map(key=>rgb(catalog[key].find(o=>o.id===s[key]).hex));
    if(pass!==painting||view!==current||mode!=='photo')return;
    const image=new ImageData(new Uint8ClampedArray(shot.photo.data),shot.photo.width,shot.photo.height);
    const out=image.data, uv=shot.uv.data, clean=shot.neutral.data;
    // Native camera-space UVs keep veins on the actual slab, including its cutout.
    // Apply the reflectance change to the lit pixel so the Cycles shadow and highlights survive.
    for(let i=0;i<out.length;i+=4) {
      const bits=uv[i+2],role=bits>>4;
      if(!altered[role])continue;
      let a,b,ai=0,bi=0,influence;
      if(role<4) {
        const u=((uv[i]*4+((bits>>2)&3))/1023)*6-1;
        const v=((uv[i+1]*4+(bits&3))/1023)*4-1;
        a=neutralRGB;b=maps[role-1].data;bi=sampleIndex(maps[role-1],u,v,spans[role-1]);influence=.94;
      } else {
        a=ref[role-4];b=other[role-4];
        influence=role===4?.90:.84*Math.min(1,(278-Math.max(out[i],out[i+1],out[i+2]))/72);
      }
      for(let k=0;k<3;k++) out[i+k]=(role<4?clean[i+k]:out[i+k])*Math.pow((b[bi+k]+9)/(a[ai+k]+9),influence);
    }
    canvas.width=image.width;canvas.height=image.height;
    canvas.getContext('2d').putImageData(image,0,0);
    canvas.dataset.view=current;canvas.dataset.island=s.island;canvas.hidden=false;
  }
  function notice(text){$('message').textContent=text;$('message').hidden=!text;}
  function nativeRefresh(){
    return photograph().catch(()=>{notice('Не удалось загрузить ракурс. Выберите его ещё раз.');});
  }
  function save() {
    try {localStorage.setItem(storage,JSON.stringify(state));}catch{}
    refreshLabels();
    if(mode==='photo')nativeRefresh();
    if(live)live.finishes({...state}).catch(unavailable);
  }
  function button(label,identity,value,parent) {
    const button=document.createElement('button');button.type='button';
    button.setAttribute('aria-label',label);button.title=label;button.dataset[identity]=value;
    parent.append(button);return button;
  }
  for(const [key,label] of Object.entries(views)){
    const b=button(label,'view',key,$('views'));b.className='view';
    const img=new Image();img.alt='';img.src='./views/'+key+'.webp';
    const text=document.createElement('span');text.textContent=label;b.append(img,text);
    b.onclick=()=>{view=key;refreshLabels();if(live)live.setView(key);if(mode==='photo')nativeRefresh();};
  }
  function palette(open,restoreFocus=false) {
    $('overview').hidden=open;$('palette').hidden=!open;
    if(open) {
      $('palette-title').textContent=roles[target];
      refreshLabels();
      $('back').focus({preventScroll:true});
      if(matchMedia('(max-width:760px)').matches)document.querySelector('.finishes').scrollTop=0;
    }else if(restoreFocus) document.querySelector('[data-surface="'+target+'"]').focus({preventScroll:true});
  }
  for(const [key,label] of Object.entries(roles)) {
    const b=button(label,'surface',key,$('surfaces'));b.className='surface';
    const img=new Image();img.alt='';
    const wrap=document.createElement('span'),heading=document.createElement('strong'),name=document.createElement('small');
    heading.textContent=label;wrap.append(heading,name);
    const chevron=document.createElement('span');chevron.className='chevron';chevron.textContent='›';chevron.setAttribute('aria-hidden','true');
    b.append(img,wrap,chevron);
    b.onclick=()=>{target=key;palette(true);};
  }
  for(const item of catalog.stones) {
    const label=item.brand+' '+item.code+' · '+item.name;
    const b=button(label,'decor',item.id,$('choices'));b.className='sample';
    const img=new Image();img.alt='';img.src='../swatches/'+item.chip;
    const name=document.createElement('span'),code=document.createElement('small');
    name.textContent=item.name;code.textContent=item.brand+' '+item.code;b.append(img,name,code);
    b.onclick=()=>{if(state.linked)for(const role of Object.keys(roles)) state[role]=item.id;else state[target]=item.id;save();};
  }
  for(const role of ['paint','metal']) for(const swatch of catalog[role]) {
    const b=button(swatch.name,role,swatch.id,$(role));
    b.style.setProperty('--chip',swatch.hex);
    if(['porcelain','linen','steel'].includes(swatch.id))b.style.setProperty('--check','#354333');
    b.onclick=()=>{state[role]=swatch.id;save();};
  }
  function refreshLabels(){
    for(const b of $('views').children)b.setAttribute('aria-pressed',String(view===b.dataset.view));
    for(const b of $('surfaces').children){
      const key=b.dataset.surface,item=stones.get(state[key]);
      b.querySelector('small').textContent=item.name;
      b.querySelector('img').src='../swatches/'+item.chip;
      b.setAttribute('aria-label',roles[key]+' · '+item.name+'. Выбрать камень');
    }
    $('linked').checked=state.linked;
    for(const b of $('choices').children)b.setAttribute('aria-pressed',String(state[target]===b.dataset.decor));
    for(const role of ['paint','metal']){
      $(role+'-name').textContent=catalog[role].find(s=>s.id===state[role]).name;
      for(const b of $(role).children)b.setAttribute('aria-pressed',String(state[role]===b.dataset[role]));
    }
    $('mode-live').setAttribute('aria-pressed',String(mode==='live'));
    $('mode-photo').setAttribute('aria-pressed',String(mode==='photo'));
  }
  $('linked').onchange=()=>{state.linked=$('linked').checked;if(state.linked)for(const key of Object.keys(roles))state[key]=state[target];save();};
  $('restore').onclick=()=>{state={...initial};save();};
  $('back').onclick=()=>palette(false,true);
  function unavailable() {
    if(glUnavailable)return;
    glUnavailable=true;delete document.documentElement.dataset.webgl;
    $('mode-live').disabled=true;
    notice('WebGL недоступен. Материалы можно менять на четырёх рендерах.');
    setMode('photo');
  }
  async function setMode(next){
    const token=++transition;
    mode=next;
    document.documentElement.dataset.mode=next;
    $('live').hidden=true;$('zoom').hidden=true;$('progress').hidden=next!=='live'||Boolean(live);
    $('photographic').hidden=true;
    refreshLabels();
    if(next==='photo'){await nativeRefresh();return;}
    try{
      if(!livePromise)livePromise=Promise.all([loadScript('./model.js'),loadScript('./live.js')]).then(()=>window.createR677Viewer($('live'),window.R677model,catalog,unavailable));
      live=await livePromise;
      await live.finishes({...state});
      if(token!==transition||mode!=='live')return;
      live.setView(view);
      $('live').hidden=false;$('progress').hidden=true;$('zoom').hidden=false;live.resize();
      document.documentElement.dataset.webgl='ready';
    }catch(error){console.warn('R677 WebGL',error);unavailable();}
  }
  $('mode-live').onclick=()=>setMode('live');
  $('mode-photo').onclick=()=>setMode('photo');
  $('closer').onclick=()=>live?.zoom(.82);
  $('further').onclick=()=>live?.zoom(1.2);
  $('reset-view').onclick=()=>live?.setView(view);
  const studio=document.querySelector('.studio');
  function expanded(){return Boolean(document.fullscreenElement)||studio.classList.contains('expanded');}
  function fullLabel(){const label=expanded()?'Свернуть':'Во весь экран';$('expand').title=label;$('expand').setAttribute('aria-label',label);}
  $('expand').onclick=async()=>{
    if(document.fullscreenElement)await document.exitFullscreen();
    else if(studio.classList.contains('expanded'))studio.classList.remove('expanded');
    else {try{await studio.requestFullscreen();}catch{studio.classList.add('expanded');}}
    fullLabel();
  };
  document.addEventListener('fullscreenchange',fullLabel);
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    if(expanded()){if(document.fullscreenElement)document.exitFullscreen();studio.classList.remove('expanded');fullLabel();}
    else if(!$('palette').hidden)palette(false,true);
    else if(parent!==window)parent.postMessage('levoni:close-interior',location.origin==='null'?'*':location.origin);
  });
  save();
  setMode('live');
})();
