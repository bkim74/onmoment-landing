window.ONMOMENT_RENDER = function (root, journeyKey, variantKey) {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x22/g, '&quot;').replace(/'/g, '&#39;');
  const br = (s) => esc(s).replace(/\n/g, '<br>');
  const data = window.ONMOMENT_JOURNEYS;
  const config = {liveInquiry:window.ONMOMENT_OFFLINE_REVIEW !== true,inquiryEndpoint:'https://app.onmoment.kr/api/gift-inquiry',openExternalInNewTab:false};
  const key = journeyKey || 'parents';
  const variant = String(variantKey||'a').toLowerCase() === 'b' ? 'b' : 'a';
  const d = data[key] || data.parents;
  const themes = {parents:['#284f43','#e5ece4','#eeebe3'],beginnings:['#8a4c32','#f4e6d5','#f3ebe1'],couple:['#794759','#efe4e5','#f0e8e5'],self:['#355c73','#e3e9ec','#e9ecea'],teen:['#8a4c32','#f4e6d5','#f3ebe1']};
  const extension = d.landing;
  const t = extension ? extension.colors : themes[d.key];
  ['--accent','--soft','--soft2'].forEach((v,i)=>root.style.setProperty(v,t[i]));
  const firstUrl = (j,o) => 'https://app.onmoment.kr/start?src=journey-'+j+'&next='+encodeURIComponent('/first?j='+j+'&o='+(o||'everyday'));
  const appUrls = {};
  ['parents','beginnings','couple','self','retire','together','remember'].forEach(k=>{appUrls[k]=firstUrl(k,'everyday');});
  appUrls.teen=firstUrl('beginnings','adolescence');
  const P = d.key === 'parents';
  const OCC = {seventy:'칠순',sixty:'환갑',eighty:'팔순'};
  let occId = 'everyday', bookPre = false;
  try{const q=new URLSearchParams(location.search);const o=q.get('o');occId=o==='campaign'?'seventy':(OCC[o]?o:'everyday');bookPre=q.get('book')==='1';}catch(_){}
  if(P)appUrls.parents=firstUrl('parents',occId);
  let appUrl = appUrls[d.key];
  const external = config.openExternalInNewTab ? ` target='_blank' rel='noopener noreferrer'` : '';
  const asset = (name) => '/gift-v6/' + name;
  const artGeometry = (index) => { if(d.key !== 'couple') return {size:300,pos:index*50,ratio:1}; const c=[[0,650],[650,784],[1434,738]][index];return {size:2172/c[1]*100,pos:c[0]/(2172-c[1])*100,ratio:c[1]/724}; };
  const sceneArt = (index,extra) => { const s=d.scenes[index]; const bg = s.img ? `aspect-ratio:1;background-image:url(${esc(s.img)});background-size:cover;background-position:center` : `aspect-ratio:${artGeometry(index).ratio};background-image:url(${esc(asset('story-'+d.key+'.webp'))});background-size:${artGeometry(index).size}% 100%;background-position:${artGeometry(index).pos}% 50%`; return `<div class='story-art ${extra || ''}' role='img' aria-label='${esc(s.note)}' style='${bg}'></div>`; };
  const artwork = (index,id) => { const s=d.scenes[index]; return `<article class='art-card' ${id?`id='${id}'`:''}>${sceneArt(index)}<div class='art-caption'><p class='card-title'>${esc(s.title)}</p><p class='card-line'>${esc(s.giftLine)}</p><div class='card-logo'>온순간</div></div></article>`; };
  const cta = (label,cls,place) => `<a class='btn ${cls || ''}' href='${appUrl}' data-app-cta='${place || 'body'}'${external}>${esc(label || d.cta)}</a>`;
  const track = (name,extra) => {
    if(typeof name!=='string')return;
    // Public categorical metadata only. Never add text, photos, email, or free-form form fields.
    const detail=Object.assign({event:name,journey:d.key,variant:variant,designVersion:'journey-v2'},extra||{});
    window.dispatchEvent(new CustomEvent('onmoment:landing',{detail:detail}));
  };
  let chosen = 0;
  let priceKind = extension ? 'kit' : d.key==='self' ? 'postcards' : 'frame';
  const kitUnits = window.ONMOMENT_PRICES.kitUnits;
  const priceCatalog = window.ONMOMENT_PRICES.catalog;
  const oneSentence = {teen:'별말 없이 집으로 걷던 날도,<br>우리 둘의 이야기가 돼요.',parents:'그분다운 모습에는,<br>우리만 아는 이야기가 있어요.',beginnings:'아이의 사진에,<br>그날의 우리 이야기를 더해요.',couple:'같은 날을 기억하는,<br>서로 다른 두 문장.',self:'그날의 내 모습에,<br>내가 고른 말을 더해요.'};
  const storyLede = {teen:'기억에 가까운 장면을 골라 보세요. 한 사람이 쓴 두 문장을 펼쳐볼 수 있어요.',parents:'사진은 그분의 모습을, 기록은 우리 사이의 장면을 담습니다. 그 장면에서 전하고 싶은 말을 내가 골라요.',beginnings:'아이를 바라보던 나, 내 손을 꼭 잡던 아이. 사진 한 장 너머의 이야기를 내 말로 남깁니다.',couple:'내가 기억하는 장면에서 시작합니다. 상대가 직접 남긴 말이 더해지면, 그날을 두 시선으로 간직해요.',self:'내가 남긴 장면을 다시 보고, 지금 곁에 두고 싶은 문장을 고릅니다. 그림에 담긴 뜻도 내가 정합니다.'};
  const finalTitles = {teen:'아이와 함께한 하루를,<br>한 장면부터 담아볼까요.',parents:'그분을 떠올리며,<br>한 장면부터 건네볼까요.',beginnings:'우리의 처음을,<br>한 장면부터 담아볼까요.',couple:'우리다운 그날을,<br>한 장면부터 남겨볼까요.',self:'오늘의 나에게,<br>한 장을 남겨볼까요.'};
  const remembering = d.key === 'remember';
  const kitImg = esc(d.kitImg || asset('kit-'+d.key+'.webp'));
  const kitAlt = (suffix) => extension ? esc(extension.kitAlt) : d.kitAlt ? esc(d.kitAlt) : esc(d.kitName)+suffix;
  function header(){return `<a class='skip' href='#main'>본문으로 건너뛰기</a><header class='head'><div class='wrap head-inner'><a class='wordmark' href='https://onmoment.kr/'${external} aria-label='온순간 홈'>온순간</a><nav class='nav' aria-label='페이지 안에서 이동'><a href='#story'>이야기 초상</a><a href='#how'>만드는 순서</a>${remembering ? "<a href='#after-memory'>두 시선으로 읽기</a>" : "<a href='#options'>선물 구성</a>"}${remembering ? '' : `<a class='nav-cta' href='#inquiry'>${d.key==='self'?'내 초상 미리 신청':'선물 미리 신청'}</a>`}</nav><span class='mobile-label'>${esc(d.label)}</span></div></header>`;}
  function rememberOpening(){
    return `<section class='hero'><div class='wrap hero-grid'><div class='hero-copy'><p class='eyebrow'>${esc(d.occasionLabel)}</p><h1>${br(d.headlineA)}</h1><p class='lede'>${esc(d.introA)}</p><div class='hero-actions'>${cta(d.cta,'','hero')}<a class='text-link' href='#story'>다른 가족의 기억 읽기</a></div><p class='hero-note'>혼자 간직해도 좋아요. 누구와 언제 펼칠지는 내가 정해요.</p></div><div class='preview-area'>${artwork(0)}<p class='visual-status'>${esc(extension.sample)}</p></div></div></section>`;
  }
  const pfTitle = () => (OCC[occId] || '부모님과') + ' 식탁에서 읽을, 우리 가족의 한 장.';
  const pfCopy = (mid) => `<p class='eyebrow'>${esc(d.occasionLabel)}</p><h1 data-pf-title>${esc(pfTitle())}</h1><p class='lede'>부모님 하면 떠오르는 장면 하나를 적어 보세요. 내 한 줄로 먼저 읽고, 원하면 가족의 말도 곁에 놓을 수 있어요.</p>${mid||''}<div class='hero-actions pf-actions'>${cta('무료로 한 장 만들기','pf-cta','hero')}<a class='text-link pf-link' href='#example'>완성 예시 읽기</a></div><p class='pf-jump'><a class='text-link pf-link' href='#product'>종이책 견본과 가격</a></p>`;
  function heroA(){if(remembering)return rememberOpening();return `<section class='hero'><div class='wrap hero-grid'><div class='hero-copy'>${P?pfCopy():`<p class='eyebrow'>${esc(d.occasionLabel)} · 나의 이야기 초상</p><h1>${br(d.headlineA)}</h1><p class='lede'>${esc(d.introA)}</p><div class='hero-actions'>${cta(d.cta,'','hero')}<a class='text-link' href='#options'>완성된 선물 보기</a></div><p class='hero-note'>글·사진으로 한 장면부터 시작해요.<br>초상과 실물 선물은 시범 제작 미리 신청으로 이어집니다.</p>`}</div><figure class='hero-image'><span class='hero-sample'>가상 이야기 · 상품 시안</span><img class='hero-product' src='${kitImg}' width='1200' height='1000' fetchpriority='high' alt='${kitAlt('의 초상과 실물 구성 콘셉트')}'><figcaption class='product-caption'><span class='mini-mark' aria-hidden='true'>온</span><div><small>${esc(d.eyebrow)}</small><p>${esc(d.scenes[0].giftLine)}</p></div></figcaption></figure></div></section>`;}
  function heroB(){return `<section class='hero hero-b'><div class='wrap hero-grid'><div class='hero-copy'>${P?pfCopy(`<div class='choice-list' role='group' aria-label='가상 예시 장면 고르기'>${d.scenes.map((s,i)=>`<button class='scene-choice' data-scene='${i}' aria-pressed='${i===0}'><span class='choice-icon' aria-hidden='true'>${i===0?'✓':'○'}</span><span><span class='choice-label'>${esc(s.label)}</span><span class='choice-sub'>그림과 문장으로 펼쳐보기</span></span></button>`).join('')}</div>`):`<p class='eyebrow'>${esc(d.label)} · 장면으로 먼저 만나보기</p><h1>${br(d.headlineB)}</h1><p class='lede'>${esc(d.introB)}</p><div class='choice-list' role='group' aria-label='가상 예시 장면 고르기'>${d.scenes.map((s,i)=>`<button class='scene-choice' data-scene='${i}' aria-pressed='${i===0}'><span class='choice-icon' aria-hidden='true'>${i===0?'✓':'○'}</span><span><span class='choice-label'>${esc(s.label)}</span><span class='choice-sub'>그림과 문장으로 펼쳐보기</span></span></button>`).join('')}</div><div class='hero-actions'>${cta(d.cta,'','hero')}${remembering ? "<a class='text-link' href='#story'>가족의 기억 읽기</a>" : "<a class='text-link' href='#options'>선물 구성 보기</a>"}</div><p class='hero-note'>아래는 가상 이야기 예시예요.<br>내 이야기는 온순간 앱에서 직접 남깁니다.</p>`}</div><div class='preview-area'><p class='preview-label'>한 장면이 이렇게 남아요</p><div id='hero-preview' aria-live='polite' aria-atomic='true'>${artwork(0)}</div><p class='visual-status'>${extension ? esc(extension.sample) : '가상 이야기 · 그림과 상품 콘셉트 예시'}</p></div></div></section><section class='scene-support'><div class='wrap'><div><p class='source-label'>그림의 바탕이 된 말</p><small>예시 원문 그대로</small></div><div id='hero-source' aria-live='polite'><p class='source-quote'>${esc(d.scenes[0].source)}</p><p class='source-by'>${esc(d.scenes[0].author)}</p></div></div></section>`;}
  function proof(){return `<div class='proofline'><div class='wrap'><p><span aria-hidden='true'>✓</span>사진 속 모습과 기록 속 장면</p><p><span aria-hidden='true'>✓</span>내가 확인하고 고른 한 장</p><p><span aria-hidden='true'>✓</span>${d.key==='self'?'나만의 공간에서 시작':'건넬 이야기는 내가 선택'}</p></div></div>`;}
  function sharedSource(s) {
    const by = (quote,name) => `<p class='source-quote'>${esc(quote)}</p><p class='source-by'>${esc(name)}</p>`;
    const second = s.otherSource ? `<div class='source-rule'></div>${by(s.otherSource,s.otherAuthor)}` : '';
    const lines = by(s.source,s.author) + second;
    return d.key === 'together' ? `<div class='member-lines'>${lines}</div>` : lines;
  }
  function story(){return `<section class='section story-section' id='story'><div class='wrap'><div class='section-top'><div><p class='eyebrow'>사진과 내 말이 만나는 한 장</p><h2>${extension ? br(extension.opening) : oneSentence[d.key]}</h2></div><p class='lede'>${extension ? esc(extension.storyLede) : storyLede[d.key]}</p></div><div class='story-grid'><div class='story-board'><div id='story-art'>${artwork(0)}</div><div class='scene-tabs' role='group' aria-label='이야기 초상 예시 보기'>${d.scenes.map((s,i)=>`<button class='scene-dot' data-scene='${i}' aria-label='${esc(s.label)}' aria-pressed='${i===0}'>${i+1}</button>`).join('')}</div><p class='visual-status'>${extension ? esc(extension.sample) : '가상 인물·이야기로 만든 초상 시안'}</p></div><div><p class='source-label'>${esc(d.storyLabel)} · 예시 원문</p><div id='story-source'>${extension ? sharedSource(d.scenes[0]) : `<p class='source-quote'>${esc(d.scenes[0].source)}</p><p class='source-by'>${esc(d.scenes[0].author)}</p>`}</div><div class='source-rule'></div><div class='meaning-list'><div class='meaning-row'><strong>사진의 모습</strong><p>초상에 함께 담을 사람의 사진을 각각 고릅니다.</p></div><div class='meaning-row'><strong>기록의 장면</strong><p>내가 남긴 말 속 행동과 장면이 그림의 재료가 됩니다.</p></div><div class='meaning-row'><strong>내가 고른 말</strong><p>그림과 문장을 확인하고, 간직할 한 장을 내가 정합니다.</p></div></div>${d.key==='couple'?`<div class='other-voice' id='other-voice'><small>상대가 직접 남긴 또 하나의 말 · 가상 예시</small><p>${esc(d.scenes[0].otherSource)}</p></div>`:''}</div></div></div></section>`;}
  function how(){const self=d.key==='self';return `<section class='section step-section' id='how'><div class='wrap'><div class='section-top'><div><p class='eyebrow'>한 장면에서 시작해요</p><h2>${self?'내 말을 남기고,<br>내가 고르는 한 장.':'떠오르는 장면 하나면,<br>이야기가 시작됩니다.'}</h2></div><p class='lede'>글로 적거나, 말로 남기거나.<br>사진 한 장을 함께 놓고 시작해도 좋아요.</p></div><div class='steps'><article class='step'><div class='step-head'><span class='step-number'>1</span><h3>한 장면을 남겨요</h3></div><p>${self?'오늘 기억에 남은 일과 내 모습을 담아요.':'함께한 날의 말이나 행동을 담아요.'} 내 말은 있는 그대로 남습니다.</p></article><article class='step'><div class='step-head'><span class='step-number'>2</span><h3>그림과 말을 골라요</h3></div><p>초상에 쓸 사진과 장면을 고르고, 만들어진 그림과 문장을 확인해요.</p><p class='step-note'>초상은 현재 시범 제작 미리 신청으로 진행해요.</p></article><article class='step'><div class='step-head'><span class='step-number'>3</span><h3>${remembering?'보고 싶을 때 펼쳐요':self?'내 곁에 두어요':'건네고, 간직해요'}</h3></div><p>${remembering?'혼자 간직하거나, 함께 보고 싶은 사람에게 내가 고른 장면만 보여줘요.':self?'내가 고른 한 장을 책상 위에, 내 기록에 남겨요. 다시 쓰고 싶은 날 이어갑니다.':'확인한 한 장을 선물로 건네요. 처음 남긴 내 말도 내 기록에 남습니다.'}</p></article></div><div class='keep-note'><p><strong>한 장면을 간직해도 완성.</strong> 더 남기고 싶은 이야기는 다음에 이어가요.</p><a class='text-link' href='${appUrl}' data-app-cta='flow'${external}>${self?'오늘의 장면 남기기':'내 장면으로 시작하기'}</a></div></div></section>`;}
  function pitch(){return `<section class='section pitch-section' id='portrait-pitch'><div class='wrap'><div class='section-top'><div><h2>이야기 초상은 이렇게 만들어져요</h2></div></div><div class='steps'><article class='step'><div class='step-head'><span class='step-number'>1</span><h3>${esc((JC.pitch&&JC.pitch.step1Head)||'사진에서 얼굴을 한 번 눌러요')}</h3></div><p>${esc((JC.pitch&&JC.pitch.step1Body)||'고른 사진의 그 부분만 씁니다. 사진이 없으면 한 줄로 장면을 그려요.')}</p></article><article class='step'><div class='step-head'><span class='step-number'>2</span><h3>살리고 싶은 대목을 골라요</h3></div><p>내 기록의 한 문장이 그림의 중심이 됩니다.</p></article><article class='step'><div class='step-head'><span class='step-number'>3</span><h3>그림 결을 골라요</h3></div><p>따뜻한 그림이 기본, 간직한 뒤 같은 장면을 판화로 한 장 더.</p></article></div><div class='pitch-two'><article class='pitch-col'><h3>${esc((JC.pitch&&JC.pitch.giveHead)||'건네는 말')}</h3><p>${esc((JC.pitch&&JC.pitch.giveBody)||'그림 옆 카드와 받는 분 화면에 놓여요.')}</p></article><article class='pitch-col'><h3>나에게 남기는 말</h3><p>그림에도 받는 분 화면에도 쓰이지 않아요.</p></article></div><p class='pitch-trust'>사진과 문장은 이 초상을 만드는 데만 쓰이고, 그림 AI의 학습에는 쓰이지 않아요.</p><div class='pitch-uses'><h3>이렇게 써요</h3><ul><li>생신 · 기념일 카드의 앞면</li><li>책상 위 액자</li><li>가족 단톡방에 한 장</li></ul></div></div></section>`;}
  function customKit() {
    return `<section class='section kit-section' id='gift'><div class='wrap'>
      <div class='kit-grid'><figure><img class='kit-photo' src='${asset('kit-'+d.key+'.webp')}' alt='${esc(extension.kitAlt)}' width='1448' height='1086' loading='lazy'><figcaption class='visual-status'>${esc(extension.sample)}</figcaption></figure>
      <div class='kit-copy'><p class='eyebrow'>${esc(d.kitName)}</p><h2>${br(d.kitTitle)}</h2><p class='lede'>${esc(d.kitDescription)}</p>
      <ul class='kit-list'>${d.kitItems.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><p class='price-note'>${esc(d.kitPriceNote)}</p>
      <div class='kit-cta'><a class='btn' href='#inquiry' data-inquiry-cta='kit'>${remembering?'원할 때 제작 문의하기':'이 구성으로 미리 신청하기'}</a></div></div></div>
      <div class='addon'><div><h3>${esc(d.addOnTitle)}</h3></div><div class='addon-items'>${d.addOnItems.map(item=>`<div class='addon-item'>${esc(item)}</div>`).join('')}</div></div>
      </div></section>`;
  }
  function kit(){if(extension)return customKit();const own=d.key==='self'||d.key==='teen';const p=priceCatalog[priceKind];const options=d.key==='self'?['digital','postcards','frame']:['digital','frame'];return `<section class='section kit-section' id='gift'><div class='wrap'><div class='kit-grid'><figure><img class='kit-photo' src='${kitImg}' alt='${kitAlt(' 실물 구성 목업')}' width='1200' height='1000' loading='lazy'><figcaption class='visual-status'>상품 콘셉트 목업 · 사진 속 추가 소품과 구성은 미리 신청 뒤 함께 정해요</figcaption></figure><div class='kit-copy'><p class='eyebrow'>${esc(d.kitName)}</p><h2>${br(d.kitTitle)}</h2><p class='lede'>${esc(d.kitDescription)}</p><ul class='kit-list' aria-label='선물 구성 제안'>${d.kitItems.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class='price-options' role='group' aria-label='기준 상품 선택'>${options.map(x=>`<button class='price-option' data-product='${x}' aria-pressed='${x===priceKind}'>${priceCatalog[x].label}</button>`).join('')}</div><div id='price-display' aria-live='polite'><p class='price'><small>${p.label} · 예시 가격</small>${p.price.toLocaleString('ko-KR')}원</p><p class='price-note'>${p.note}</p></div><div class='kit-cta'><a class='btn' href='#inquiry' data-inquiry-cta='kit'>${d.key==='self'?'내 초상 구성 미리 신청하기':'이 구성으로 미리 신청하기'}</a></div></div></div><div class='addon'><div><h3>${esc(d.addOnTitle)}</h3>${d.key==='teen'?'':`<p>${d.key==='self'?'어디에 두고 싶은지에 맞춰 골라요.':'함께 나누는 인원과 날에 맞춰 구성을 더해요. 30개부터 신청할 수 있어요.'}</p>`}</div><div class='addon-items'>${own?d.addOnItems.map(x=>`<div class='addon-item'>${esc(x)}</div>`).join(''):kitUnits[d.key].map(x=>`<div class='addon-item'><div><strong>${esc(x[0])}</strong><br><small>${esc(x[1])}</small><br><small>개당 ${x[2].toLocaleString('ko-KR')}원 · 예시 가격</small></div></div>`).join('')}</div></div></div></section>`;}
  const JC = (window.ONMOMENT_PRICES.journeyCopy||{})[d.key]||{};
  const optionDefs = {};
  Object.keys(window.ONMOMENT_PRICES.options).forEach(k=>{const b=window.ONMOMENT_PRICES.options[k];optionDefs[k]=Object.assign({},b,{label:(JC.optLabel&&JC.optLabel[k])||b.label,use:(JC.optUse&&JC.optUse[k])||b.use});});
  const bundle = window.ONMOMENT_PRICES.bundles[d.key] || window.ONMOMENT_PRICES.bundles.parents;
  const won = (n) => n.toLocaleString('ko-KR') + '원';
  const optState = {};
  bundle.recommended.concat(bundle.more).forEach(k=>{optState[k]={on:P?(bookPre&&k==='book'):bundle.recommended.indexOf(k)>=0,qty:optionDefs[k].min||0};});
  const optTotal = () => Object.keys(optState).reduce((sum,k)=>{const o=optionDefs[k],st=optState[k];return st.on?sum+(o.unit==='per'?o.price*st.qty:o.price):sum;},0);
  const optLine = () => { const parts=Object.keys(optState).filter(k=>optState[k].on).map(k=>optionDefs[k].unit==='per'?k+'×'+optState[k].qty:k); return parts.length?'[옵션] '+parts.join(', '):''; };
  const optCardHTML = (k) => { const o=optionDefs[k],st=optState[k],per=o.unit==='per';
    return `<li class='opt-card' data-opt='${k}'><div class='opt-main'><div class='opt-text'><h3 class='opt-label'>${esc(o.label)}</h3><p class='opt-use'><small>그날의 쓰임</small>${esc(o.use)}</p><p class='opt-price'>${per?won(o.price)+'/부 · '+o.min+'부부터':won(o.price)}<small> · 예시 가격</small></p></div><button type='button' class='opt-toggle' data-opt-toggle='${k}' aria-pressed='${st.on}'><span class='sr-only'>${esc(o.label)} </span><span aria-hidden='true' class='opt-check'>${st.on?'✓':'+'}</span> 담기</button></div>${per?`<div class='opt-qty' role='group' aria-label='${esc(o.label)} 부수'><span class='opt-qty-label'>부수</span><button type='button' class='opt-step' data-opt-step='${k}' data-dir='-1' aria-label='${esc(o.label)} ${o.step||10}부 줄이기'>−</button><span class='opt-qty-num' data-opt-qty='${k}'>${st.qty}부</span><button type='button' class='opt-step' data-opt-step='${k}' data-dir='1' aria-label='${esc(o.label)} ${o.step||10}부 늘리기'>+</button></div>`:''}${(window.ONMOMENT_PRICES.details||{})[k]?`<button type='button' class='opt-more' data-opt-detail='${k}' aria-haspopup='dialog'>자세히 보기<span class='sr-only'> · ${esc(o.label)}</span></button>`:''}</li>`; };
  // 선물 에디션 v2 — 단일 출처 = public/onmoment-gifts/v2/manifest.ko.json (prices.js 의 gifts 구간)
  const G=window.ONMOMENT_PRICES.gifts||null;
  const GJ=G&&G.journeys?G.journeys[d.key]:null;
  const shipText=(k)=>{const inc=((window.ONMOMENT_PRICES.details||{})[k]||{}).included||[];const hit=inc.join(' · ');return /배송/.test(hit)?'배송 포함':/우편/.test(hit)?'우편 발송 포함':'배송 조건은 미리 신청 때 안내드려요';};
  const REP_NOTE={retire:'상자의 재질과 마감은 제작 견적 뒤에 정해져요.',together:'그림은 다섯 권 주문 예시예요.',self:'발송 시점 · 받을 주소 · 반송 조건은 주문 직전에 한 번 더 확인해요.'};
  const repHTML=(gi)=>{
    if(!GJ)return '';
    const sc=GJ.gallery[gi||0],mb=sc.mobile;
    const o=GJ.optionId?optionDefs[GJ.optionId]:null;
    let price;
    if(!o||GJ.offerStatus==='proposal'){price='제안 상품 · 가격은 미리 신청 때 안내드려요';}
    else if(P){price='양장본 1권 · '+shipText(GJ.optionId)+' '+won(o.price)+' 예시';}
    else{const per=o.unit==='per';price=won(per?o.price*o.min:o.price)+(per?' ('+o.min+'부 기준)':'')+' · 예시 가격 · '+shipText(GJ.optionId);}
    const srcset=mb?" srcset='"+esc(mb.src)+" "+mb.width+"w, "+esc(sc.src)+" "+sc.width+"w' sizes='(max-width:760px) calc(100vw - 40px), 880px'":'';
    return "<div class='rep' id='rep'"+(P?" data-offer-key='book' data-offer-qty='1'":'')+"><figure class='rep-fig'><img class='rep-img' src='"+esc(sc.src)+"'"+srcset+" width='"+sc.width+"' height='"+sc.height+"' alt='"+esc(sc.alt)+"' loading='lazy' decoding='async'><figcaption class='rep-disc'>"+esc(G.disclosure)+"</figcaption></figure>"
      +"<div class='rep-body'><p class='rep-intro'>"+esc(GJ.intro)+"</p><h3 class='rep-name'><small>"+esc(GJ.sceneTitle)+"</small>"+esc(GJ.product)+"</h3>"
      +"<p class='rep-sample'><small>예시 문장</small>"+GJ.sampleLines.map(x=>"“"+esc(x)+"”").join('<br>')+"</p>"
      +"<p class='rep-price'>"+esc(price)+"</p>"+(REP_NOTE[d.key]?"<p class='rep-note'>"+esc(REP_NOTE[d.key])+"</p>":'')
      +(P?"<p class='rep-note'>최종 구성·가격·제작 일정은 안내를 받은 뒤 정해요.</p><div class='pf-order-row'><button type='button' class='btn' data-pf-order>제작 안내 미리 신청</button>":"")+"<button type='button' class='btn "+(P?'outline ':'')+"rep-open' data-rep-open aria-haspopup='dialog'>펼쳐 보기</button>"+(P?"</div>":"")+"</div></div>";
  };
  function pfExample(){
    const sc=GJ&&GJ.gallery[0],mb=sc&&sc.mobile,line=(GJ&&GJ.sampleLines[0])||d.scenes[0].giftLine;
    const img=sc?"<img class='pf-img' src='"+esc(sc.src)+"'"+(mb?" srcset='"+esc(mb.src)+" "+mb.width+"w, "+esc(sc.src)+" "+sc.width+"w' sizes='(max-width:760px) calc(100vw - 40px), 640px'":'')+" width='"+sc.width+"' height='"+sc.height+"' alt='"+esc(sc.alt)+"' loading='lazy' decoding='async'>":'';
    return `<section class='section pf-example' id='example'><div class='wrap'><div class='section-top'><div><p class='eyebrow'>무료 디지털 한 장</p><h2>완성 예시 읽기</h2></div><p class='lede'>내 한 줄로 만든 한 장은 휴대폰에서 바로 읽어요. 혼자 간직해도 완성이에요.</p></div><figure class='pf-card'>${img}<figcaption><p class='pf-badge'>가상 이야기로 만든 예시</p><p class='pf-line'>“${esc(line)}”</p></figcaption></figure><div class='pf-center'>${cta('무료로 한 장 만들기','pf-cta','example')}</div></div></section>`;
  }
  function pfNext(){
    const rows=[
      ['식사 전에 · 가족의 말도 모아요','원하면 링크 하나로 형제와 손주가 각자 기억을 남겨요. 내 한 줄만으로도 완성이에요.','운영 중','live',''],
      ['식탁에서 · 한 장을 함께 읽어요','휴대폰으로 직접 읽거나, 받는 분께 디지털 한 장을 건네요. 받는 링크에는 내가 고른 말만 보여요.','운영 중','live',''],
      ['식사 뒤에 · 부모님 곁에 한 권','우리 가족의 글이 담긴 펼침을 미리 본 뒤, 원하는 분만 양장본 안내를 신청해요.','미리 신청','pre',"<a class='text-link pf-link' href='#product'>종이책 견본과 가격 보기</a>"],
      ['필요한 가족만 · 행사 준비 더 보기','낭독 순서, 하객에게 건네는 장면, 답례 카드는 직접 열었을 때만 보여요. 고른 것마다 결과물과 합계를 알려 드려요.','미리 신청','pre',"<button type='button' class='btn outline pf-event-btn' data-event-open aria-expanded='false' aria-controls='options'>행사 준비 더 보기</button>"]
    ];
    return `<section class='section pf-next' id='next'><div class='wrap'><div class='section-top'><div><p class='eyebrow'>순서대로 소개해요</p><h2>한 장 다음에 할 수 있는 일</h2></div><p class='lede'>모두 원할 때 하나씩이에요. 한 장만으로도 완성이에요.</p></div><ol class='pf-rows'>${rows.map(r=>`<li class='pf-row'><div><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p>${r[4]}</div><span class='pf-status pf-${r[3]}'>${esc(r[2])}</span></li>`).join('')}</ol></div></section>`;
  }
  function pfProduct(){
    return `<section class='section pf-product' id='product'><div class='wrap'><div class='section-top'><div><p class='eyebrow'>종이책 견본과 가격</p><h2>부모님 곁에 한 권</h2></div><p class='lede'>견본을 보는 것과 신청은 달라요. 신청은 직접 누를 때만 접수돼요.</p></div>${repHTML(2)}</div></section>`;
  }
  function options(){
    const PAIN=window.ONMOMENT_PRICES.pain||{};
    const own = PAIN[d.key]||'진심은 쉽게, 준비는 링크 한 번으로.';
    return `<section class='section options-section' id='options'${P?' hidden':''}><div class='wrap'><div class='section-top'><div><p class='eyebrow'>${esc(JC.eyebrow||'패키지')}</p><h2>${remembering?'기억의 자리 고르기':d.key==='parents'?'행사 패키지 고르기':'패키지 고르기'}</h2></div><p class='lede'>${P?'행사를 준비하는 가족이 직접 열어 고르는 자리예요. 고른 것마다 결과물과 합계를 보여 드려요.':esc(own)}</p></div>${P?'':repHTML()}<p class='opt-free'>기본 무료: 한 줄 모으기 · 디지털 카드 · 초상 첫 장 · ${d.key==='parents'?'행사 뒤 ':''}디지털 책 · 준비하며 나에게 남는 한 장</p><ul class='opt-list' aria-label='${P?'행사에 어울리는 구성':'먼저 담아 둔 구성'}'>${bundle.recommended.map(optCardHTML).join('')}</ul><h3 class='opt-more-title'>${P?'그 밖의 구성':'더하고 싶다면'}</h3><ul class='opt-list' aria-label='더할 수 있는 구성'>${bundle.more.map(optCardHTML).join('')}</ul><p class='price-note'>모두 예시 가격이에요. 최종 구성과 가격은 미리 신청 뒤 안내해 드려요.</p><div class='opt-bar'><p class='opt-total' id='opt-total' role='status' aria-live='polite' aria-atomic='true'></p><a class='btn' href='#inquiry' id='opt-apply'>이 구성으로 미리 신청</a></div></div></section>`;
  }
  function after(){const s=d.scenes[0];return `<section class='section after-section'${remembering?" id='after-memory'":''}><div class='wrap after-grid'><div><p class='eyebrow'>${remembering?'가족이 남긴 두 시선':d.key==='self'?'그다음의 나에게':'선물을 만들며, 내게 남는 것'}</p><h2>${br(d.ritualTitle)}</h2><p class='lede'>${esc(d.ritualBody)}</p><a class='after-link' href='${appUrl}' data-app-cta='after'${external}>${d.key==='self'?'오늘의 한 장 시작하기':'내 말로 한 장 시작하기'}</a></div><div class='two-cards' id='two-cards'><article class='two-card'><small>${extension ? esc(extension.recipient) : d.recipientLabel ? esc(d.recipientLabel) : d.key==='self'?'오늘 내가 고른 문장':'그분께 건네고 싶은 문장'} · 예시</small><p>${esc(s.giftLine)}</p><p class='small'>${d.key==='self'?'곁에 두고 다시 읽는 한 장.':'건넬 말과 공개 범위를 내가 골라요.'}</p></article><article class='two-card'><small>${extension || d.mineLabel ? '나에게 남기는 말' : d.key==='self'?'다음에 해보고 싶은 일':'나에게 남겨둘 다음 장면'} · 예시</small><p>${esc(s.nextLine)}</p><p class='small'>내 원문과 함께 나만의 기록에.<br>더 적는 것은 내가 원할 때.</p></article></div></div></section>`;}
  function faq(){return `<section class='section'><div class='wrap faq-grid'><div><p class='eyebrow'>시작하기 전에</p><h2>궁금한 것을<br>먼저 살펴보세요.</h2></div><div>${d.faq.map((x,i)=>`<details class='faq-item' ${i===0?'open':''}><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</div></div></section>`;}
  function inquiry(){const self=d.key==='self';const occasions={parents:[['seventy','칠순'],['sixty','환갑'],['everyday','생신·가족의 날']],beginnings:[['first-birthday','첫돌'],['other','백일'],['everyday','첫해의 하루']],couple:[['anniversary','우리 기념일'],['everyday','평범한 날']],self:[['everyday','오늘의 나'],['birthday','나의 생일']],teen:[['adolescence','사춘기'],['everyday','평범한 오늘']]};const occList=(extension ? extension.occasions : occasions[d.key]).map(x=>x[0]);const occPairs=(extension ? extension.occasions : occasions[d.key]);const defOccasion=P?occId:d.key==='teen'?'adolescence':d.key==='self'?'everyday':(occList.filter(x=>x!=='everyday')[0]||occList[0]);const hasPer=bundle.recommended.concat(bundle.more).some(k=>optionDefs[k].unit==='per');return `<section class='section inquiry-section' id='inquiry'><div class='wrap inquiry-grid'><div class='inquiry-copy'><p class='eyebrow'>${self?'내 곁에 둘 한 장':'마음에 드는 선물로'}</p><h2>${remembering?'간직할 구성이 필요할 때,':self?'어디에 두고 싶은지,<br>함께 골라봐요.':'건네고 싶은 날에 맞춰,<br>함께 만들어요.'}</h2><p class='lede'>${remembering?'원하는 낱장이나 액자가 있으면 알려주세요. 날짜는 비워 두셔도 돼요.':self?'원하는 초상과 간직할 방식을 알려 주세요. 구성과 제작 조건을 안내해 드려요.':'어떤 날에, 누구에게 건넬지 알려주세요. 초상과 실물 구성, 제작 일정을 함께 살펴봐요.'}</p><p class='inquiry-sample-note'>시범 제작으로 한 분씩 진행해요. 최종 구성·가격·제작 일정은 미리 신청해 주신 뒤 안내해 드려요.</p></div><form id='inquiry-form' class='form-grid'><div class='inq-summary wide' id='opt-pick' aria-live='polite'></div>${d.key==='teen'?`<input type='hidden' name='occasion' value='adolescence'>`:`<label class='field wide'><span>${self?'어떤 나를 남길까요':'어떤 날인가요'}</span><select name='occasion'>${occPairs.map(x=>`<option value='${x[0]}'${x[0]===defOccasion?' selected':''}>${x[1]}</option>`).join('')}</select></label>`}<input type='hidden' name='interest' value='${self?'portrait':'kit'}'><label class='field wide'><span>안내받을 이메일</span><input type='email' name='email' autocomplete='email' placeholder='you@example.com' required maxlength='254'></label>${d.key==='teen'?'':`<label class='field'><span>${self?'원하는 제작 시기 (선택)':'행사 날짜 (선택)'}</span><input type='date' name='when'></label>`}${hasPer?`<label class='field'><span>하객 수 (선택)</span><input type='number' name='guests' inputmode='numeric' min='1' max='1000' step='1'></label>`:''}${self?'':`<label class='field'><span>함께 이야기를 쓸 분 (선택)</span><select name='familySize'><option value=''>선택해 주세요</option><option value='solo'>나 혼자</option><option value='2-3'>2~3명</option><option value='4-6'>4~6명</option><option value='7+'>7명 이상</option></select></label>`}<label class='field wide'><span>원하는 구성이나 궁금한 점 (선택)</span><textarea name='memo' maxlength='400' rows='3' placeholder='편하게 남겨 주세요.'></textarea></label><label class='honeypot' aria-hidden='true'>Website<input name='website' tabindex='-1' autocomplete='off'></label><label class='consent'><input type='checkbox' name='consent' required><span>미리 신청 안내를 위해 이메일과 적은 내용을 처리하는 데 동의해요. <a class='text-link' href='https://onmoment.kr/privacy/' target='_blank' rel='noopener noreferrer'>처리방침</a></span></label><div class='form-actions'><button class='btn' type='submit'>미리 신청하기</button><span class='caption'>결제는 확인 뒤 안내드려요. 접수 결과는 이 자리에서 알려 드려요.</span></div><div class='form-status' id='form-status' role='status' aria-live='polite'></div></form></div></section>`;}
  function finish(){return `<section class='final-section'><div class='wrap'><p class='eyebrow'>온순간, 가장 나답게.</p><h2>${extension ? br(extension.closing) : finalTitles[d.key]}</h2><p class='lede'>${d.key==='self'?'지금 남기고 싶은 말 하나에서 시작해요.':'떠오르는 말 하나, 함께한 사진 한 장에서 시작해요.'}</p>${cta(d.cta,'','final')}<p class='caption'>이야기는 나만의 공간으로 시작합니다.</p></div></section><footer class='footer'><div class='wrap'><div class='footer-main'><a class='wordmark' href='https://onmoment.kr/'${external}>온순간</a><div class='footer-links'><a href='https://onmoment.kr/privacy/'${external}>개인정보 처리방침</a><a href='https://onmoment.kr/terms/'${external}>이용약관</a><a href='https://onmoment.kr/gift/${d.key}/'${external}>이 여정 더 보기</a></div></div><div class='footer-bottom'><p>그림과 이야기는 가상 예시입니다.<br>실물은 상품 콘셉트이며, 최종 구성·가격·제작 일정은 미리 신청 뒤 안내해 드려요.</p><p>찬연한 너와 나의 이야기.<br>© ONMOMENT</p></div></div></footer><div class='mobile-sticky'><span>${d.key==='self'?'오늘의 나에게<br>한 장의 선물':P?'내 한 줄로<br>무료 한 장':'사진과 내 말로<br>이야기 한 장'}</span>${cta(d.key==='self'?'오늘 한 장면 남기기':P?'무료로 한 장 만들기':extension?d.cta:'내 이야기로 시작하기','','sticky')}</div>`;}
  root.innerHTML=header()+`<main id='main'>`+(variant==='a'?heroA():heroB())+(P?pfExample()+pfNext()+pfProduct():'')+options()+pitch()+proof()+story()+how()+after()+faq()+inquiry()+finish()+`</main>`;
  function setScene(index){
    const s=d.scenes[index];if(!s)return;chosen=index;
    const hero=document.getElementById('hero-preview');if(hero)hero.innerHTML=artwork(index);
    document.getElementById('story-art').innerHTML=artwork(index);
    const sourceHtml=`<p class='source-quote'>${esc(s.source)}</p><p class='source-by'>${esc(s.author)}</p>`;
    document.getElementById('story-source').innerHTML=extension ? sharedSource(s) : sourceHtml;
    const heroSource=document.getElementById('hero-source');if(heroSource)heroSource.innerHTML=sourceHtml;
    const ov=document.getElementById('other-voice');if(ov)ov.innerHTML=`<small>상대가 직접 남긴 또 하나의 말 · 가상 예시</small><p>${esc(s.otherSource)}</p>`;
    document.querySelectorAll('[data-scene]').forEach(el=>{const active=Number(el.dataset.scene)===index;el.setAttribute('aria-pressed',String(active));const icon=el.querySelector('.choice-icon');if(icon)icon.textContent=active?'✓':'○';});
    const cards=document.querySelectorAll('#two-cards .two-card>p:first-of-type');if(cards.length===2){cards[0].textContent=s.giftLine;cards[1].textContent=s.nextLine;}
    track('landing_scene_select',{sceneId:s.id});
  }
  document.querySelectorAll('[data-scene]').forEach(el=>el.addEventListener('click',()=>setScene(Number(el.dataset.scene))));
  document.querySelectorAll('[data-product]').forEach(el=>el.addEventListener('click',()=>{
    priceKind=el.dataset.product;const p=priceCatalog[priceKind];
    document.querySelectorAll('[data-product]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.product===priceKind)));
    document.getElementById('price-display').innerHTML=`<p class='price'><small>${p.label} · 예시 가격</small>${p.price.toLocaleString('ko-KR')}원</p><p class='price-note'>${p.note}</p>`;
    track('landing_package_select',{packageId:priceKind});
  }));
  document.querySelectorAll('[data-app-cta]').forEach(el=>el.addEventListener('click',()=>track('landing_app_cta',{placement:el.dataset.appCta,sceneId:d.scenes[chosen].id})));
  document.querySelectorAll('[data-inquiry-cta]').forEach(el=>el.addEventListener('click',()=>track('landing_inquiry_open',{packageId:priceKind})));
  const form=document.getElementById('inquiry-form');
  const renderPick = (total) => {
    const pick=document.getElementById('opt-pick');if(!pick)return;
    const ks=Object.keys(optState).filter(k=>optState[k].on);
    if(!ks.length){pick.innerHTML="<p class='inq-sum-title'>고른 구성</p><p class='inq-sum-empty'>아직 담은 구성이 없어요. 기본 무료 구성으로 시작해도 좋아요.</p>";return;}
    pick.innerHTML="<p class='inq-sum-title'>고른 구성 · 예시 가격</p><ul class='inq-sum-list'>"+ks.map(k=>{const o=optionDefs[k],st=optState[k],per=o.unit==='per';return "<li><span>"+esc(o.label)+(per?" · "+st.qty+"부":"")+"</span><span>"+won(per?o.price*st.qty:o.price)+"</span></li>";}).join('')+"</ul><p class='inq-sum-total'><span>예시 합계</span><strong>"+won(total)+"</strong></p>";
  };
  let guestsEdited=false;
  const syncGuests = () => {
    const g=form&&form.elements.guests;if(!g||guestsEdited)return;
    const q=Object.keys(optState).filter(k=>optState[k].on&&optionDefs[k].unit==='per').map(k=>optState[k].qty);
    g.value=q.length?String(Math.max.apply(null,q)):'';
  };
  const optRefresh = () => {
    const total=optTotal();document.getElementById('opt-total').innerHTML=`<small>예시 합계</small> <strong>${won(total)}</strong>`;
    document.querySelectorAll('[data-opt-toggle]').forEach(b=>{const on=optState[b.dataset.optToggle].on;b.setAttribute('aria-pressed',String(on));b.querySelector('.opt-check').textContent=on?'✓':'+';});
    document.querySelectorAll('[data-opt-qty]').forEach(el=>{el.textContent=optState[el.dataset.optQty].qty+'부';});
    renderPick(total);syncGuests();
  };
  document.querySelectorAll('[data-opt-toggle]').forEach(b=>b.addEventListener('click',()=>{const st=optState[b.dataset.optToggle];st.on=!st.on;optRefresh();track('landing_package_select',{packageId:b.dataset.optToggle});}));
  document.querySelectorAll('[data-opt-step]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.optStep,o=optionDefs[k],st=optState[k];st.qty=Math.min(1000,Math.max(o.min,st.qty+(o.step||10)*Number(b.dataset.dir)));optRefresh();}));
  if(form.elements.guests)form.elements.guests.addEventListener('input',()=>{guestsEdited=true;});
  const details=window.ONMOMENT_PRICES.details||{};
  const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const li=(a)=>(a||[]).map(x=>"<li>"+esc(x)+"</li>").join('');
  const sheet=document.createElement('div');sheet.className='sheet-wrap';sheet.hidden=true;
  sheet.innerHTML="<div class='sheet-back' data-sheet-close></div><div class='sheet' role='dialog' aria-modal='true' aria-labelledby='sheet-title' tabindex='-1'><div class='sheet-head'><div><h2 id='sheet-title' class='sheet-title'></h2><p class='sheet-price' id='sheet-price'></p></div><button type='button' class='sheet-x' data-sheet-close>닫기</button></div><div class='sheet-body' id='sheet-body'></div><div class='sheet-foot'><button type='button' class='btn sheet-toggle' id='sheet-toggle'></button></div></div>";
  root.appendChild(sheet);
  const sheetEl=sheet.querySelector('.sheet');let sheetKey=null,sheetFrom=null,sheetLock='';
  const sheetToggleLabel=()=>{const on=optState[sheetKey].on;const t=document.getElementById('sheet-toggle');t.textContent=on?'담겨 있어요 · 빼기':'이 구성에 담기';t.classList.toggle('is-on',on);};
  const openSheet=(k,from)=>{
    const o=optionDefs[k],x=details[k];if(!o||!x)return;sheetKey=k;sheetFrom=from;
    const per=o.unit==='per';
    document.getElementById('sheet-title').textContent=o.label;
    document.getElementById('sheet-price').textContent=(per?won(o.price)+'/부 · '+o.min+'부부터':won(o.price))+' · 예시 가격';
    let rl=x.roles||{};if(d.key==='self'&&(k==='book'||k==='frame')){rl={'나':Object.keys(rl).reduce((a,r)=>a.concat(rl[r]),[])};}
    const lead=(JC.detailLead&&JC.detailLead[k])||x.lead;
    const optImg=(kk)=>{if(!G)return null;const ov=(G.optionOverrides[d.key]||{})[kk],D=G.optionDefaults;if(ov){const m=Object.keys(D).map(y=>D[y]).find(y=>y.src===ov);if(m)return m;const g=GJ&&GJ.gallery.find(y=>y.src===ov);return g?{src:g.src,alt:g.alt,width:g.width,height:g.height}:null;}return D[kk]||null;};
    const SHEET_NOTE={parents_voice:'이용 시안 · 휴대폰은 구성 밖이에요',reading:'이용 시안 · 노트북은 구성 밖이에요',live:'이용 시안 · 화면은 구성 밖이에요',thanks_reading:'활용 예시',memory_qr:'그림 속 QR은 시안이에요'};
    if(!x.img){const gi=optImg(k);if(gi){x.img=gi.src;x.imgAlt=gi.alt;x.imgW=gi.width;x.imgH=gi.height;x.imgNote=G.disclosure+(SHEET_NOTE[k]?' · '+SHEET_NOTE[k]:'');}}
    const imgHTML=x.img?"<figure class='sheet-fig'><img src='"+esc(x.img)+"' alt='"+esc(x.imgAlt||o.label)+"'"+(x.imgW?" width='"+x.imgW+"' height='"+x.imgH+"'":'')+"><figcaption class='visual-status'>"+esc(x.imgNote||'가상 이야기로 만든 제작 시안')+"</figcaption></figure>":'';
    const roles=Object.keys(rl).map(r=>"<div class='sheet-role'><h4>"+esc(r)+"</h4><ol>"+li(rl[r])+"</ol></div>").join('');
    document.getElementById('sheet-body').innerHTML="<p class='sheet-lead'>"+esc(lead)+"</p>"+imgHTML+"<section class='sheet-sec'><h3>받는 것</h3><ul>"+li(x.gets)+"</ul></section><section class='sheet-sec'><h3>이렇게 진행돼요</h3>"+roles+"</section>"+(x.when?"<p class='sheet-when'><strong>언제</strong> "+esc(x.when)+"</p>":'')+"<section class='sheet-sec sheet-two'><div><h3>포함</h3><ul>"+li(x.included)+"</ul></div><div><h3>별도</h3><ul>"+li(x.extra)+"</ul></div></section>"+((x.faq||[]).length?"<section class='sheet-sec'><h3>자주 묻는 것</h3>"+x.faq.map(q=>"<details class='sheet-faq'><summary>"+esc(q[0])+"</summary><p>"+esc(q[1])+"</p></details>").join('')+"</section>":'');
    sheetToggleLabel();
    Array.prototype.forEach.call(root.children,c=>{if(c!==sheet)c.setAttribute('inert','');});
    sheetLock=document.body.style.overflow;document.body.style.overflow='hidden';
    sheet.hidden=false;document.getElementById('sheet-body').scrollTop=0;void sheet.offsetWidth;sheet.classList.add('open');
    sheet.querySelector('.sheet-x').focus({preventScroll:true});
    track('landing_package_select',{packageId:k});
  };
  const closeSheet=()=>{
    if(sheet.hidden)return;sheet.classList.remove('open');
    const done=()=>{sheet.hidden=true;};reduce()?done():setTimeout(done,260);
    Array.prototype.forEach.call(root.children,c=>c.removeAttribute('inert'));
    document.body.style.overflow=sheetLock;
    if(sheetFrom&&document.contains(sheetFrom))sheetFrom.focus({preventScroll:true});
  };
  sheet.addEventListener('click',e=>{if(e.target.closest('[data-sheet-close]'))closeSheet();});
  document.getElementById('sheet-toggle').addEventListener('click',()=>{const st=optState[sheetKey];st.on=!st.on;optRefresh();track('landing_package_select',{packageId:sheetKey});closeSheet();});
  document.addEventListener('keydown',e=>{
    if(sheet.hidden)return;
    if(e.key==='Escape'){e.preventDefault();closeSheet();return;}
    if(e.key==='Tab'){const f=Array.prototype.filter.call(sheetEl.querySelectorAll('button,summary,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'),n=>!n.disabled&&n.offsetParent!==null);if(!f.length)return;const first=f[0],last=f[f.length-1];if(!sheetEl.contains(document.activeElement)){e.preventDefault();first.focus();}else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
  document.querySelectorAll('[data-opt-detail]').forEach(b=>b.addEventListener('click',()=>openSheet(b.dataset.optDetail,b)));
  if(GJ&&document.querySelector('[data-rep-open]')){
    const gal=GJ.gallery;let gi=0,gFrom=null,gLock='',gx=null;
    const gv=document.createElement('div');gv.className='gv-wrap';gv.hidden=true;
    gv.innerHTML="<div class='gv-back' data-gv-close></div><div class='gv' role='dialog' aria-modal='true' aria-labelledby='gv-title' tabindex='-1'><div class='gv-head'><div><h2 id='gv-title' class='gv-title'></h2><p class='gv-label' id='gv-label'></p></div><button type='button' class='gv-x' data-gv-close>닫기</button></div><figure class='gv-fig'><img id='gv-img' alt=''><figcaption class='gv-disc'></figcaption></figure><div class='gv-ctl'><button type='button' class='gv-nav' data-gv-prev aria-label='이전 그림'>이전</button><p class='gv-count' id='gv-count' aria-live='polite'></p><button type='button' class='gv-nav' data-gv-next aria-label='다음 그림'>다음</button></div></div>";
    root.appendChild(gv);
    const gvEl=gv.querySelector('.gv'),gvImg=document.getElementById('gv-img');
    const gShow=(n)=>{gi=(n+gal.length)%gal.length;const g=gal[gi];gvImg.removeAttribute('width');gvImg.removeAttribute('height');gvImg.width=g.width;gvImg.height=g.height;gvImg.alt=g.alt;gvImg.src=g.src;
      document.getElementById('gv-label').textContent=g.label;document.getElementById('gv-count').textContent=(gi+1)+' / '+gal.length;
      const nx=gal[(gi+1)%gal.length];if(nx){const pre=new Image();pre.src=nx.src;} };
    const gOpen=(from)=>{gFrom=from;document.getElementById('gv-title').textContent=GJ.product;gv.querySelector('.gv-disc').textContent=G.disclosure;gShow(0);
      Array.prototype.forEach.call(root.children,c=>{if(c!==gv)c.setAttribute('inert','');});
      gLock=document.body.style.overflow;document.body.style.overflow='hidden';gv.hidden=false;void gv.offsetWidth;gv.classList.add('open');
      gv.querySelector('.gv-x').focus({preventScroll:true});track('landing_package_select',{packageId:'rep-'+d.key});};
    const gClose=()=>{if(gv.hidden)return;gv.classList.remove('open');gv.hidden=true;Array.prototype.forEach.call(root.children,c=>c.removeAttribute('inert'));document.body.style.overflow=gLock;if(gFrom&&document.contains(gFrom))gFrom.focus({preventScroll:true});};
    document.querySelectorAll('[data-rep-open]').forEach(b=>b.addEventListener('click',()=>gOpen(b)));
    gv.addEventListener('click',e=>{if(e.target.closest('[data-gv-close]'))gClose();else if(e.target.closest('[data-gv-prev]'))gShow(gi-1);else if(e.target.closest('[data-gv-next]'))gShow(gi+1);});
    gv.addEventListener('touchstart',e=>{gx=e.changedTouches[0].clientX;},{passive:true});
    gv.addEventListener('touchend',e=>{if(gx==null)return;const dx=e.changedTouches[0].clientX-gx;gx=null;if(Math.abs(dx)>45)gShow(gi+(dx<0?1:-1));},{passive:true});
    document.addEventListener('keydown',e=>{
      if(gv.hidden)return;
      if(e.key==='Escape'){e.preventDefault();gClose();return;}
      if(e.key==='ArrowRight'){e.preventDefault();gShow(gi+1);return;}
      if(e.key==='ArrowLeft'){e.preventDefault();gShow(gi-1);return;}
      if(e.key==='Tab'){const f=Array.prototype.filter.call(gvEl.querySelectorAll('button'),n=>!n.disabled);if(!f.length)return;const first=f[0],last=f[f.length-1];if(!gvEl.contains(document.activeElement)){e.preventDefault();first.focus();}else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    });
  }
  optRefresh();
  const openEvent=(focus)=>{const o=document.getElementById('options');if(!o||!o.hidden)return;o.hidden=false;document.querySelectorAll('[data-event-open]').forEach(b=>{b.setAttribute('aria-expanded','true');b.textContent='행사 준비 접기';});if(focus)o.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});};
  document.querySelectorAll('[data-event-open]').forEach(b=>b.addEventListener('click',()=>{const o=document.getElementById('options');if(!o)return;if(o.hidden){openEvent(true);track('landing_package_select',{packageId:'event-open'});}else{o.hidden=true;document.querySelectorAll('[data-event-open]').forEach(x=>{x.setAttribute('aria-expanded','false');x.textContent='행사 준비 더 보기';});}}));
  document.querySelectorAll('[data-pf-order]').forEach(b=>b.addEventListener('click',()=>{const st=optState.book;if(st)st.on=true;optRefresh();track('landing_inquiry_open',{packageId:'book'});const t=document.getElementById('inquiry');if(t)t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}));
  if(P&&location.hash==='#options')openEvent(false);
  document.getElementById('opt-apply').addEventListener('click',(e)=>{e.preventDefault();optRefresh();track('landing_inquiry_open',{packageId:'options'});const t=document.getElementById('inquiry');t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
  const startUrl = (occasion) => { const j=d.key==='teen'?'beginnings':d.key; const o=occasion&&occasion!=='other'?occasion:'everyday'; return 'https://app.onmoment.kr/start?src=journey-'+j+'&next='+encodeURIComponent('/prepare?j='+j+'&o='+o); };
  const showNext = (occasion) => {
    const panel=document.createElement('div');panel.className='next-steps';panel.id='next-steps';panel.tabIndex=-1;panel.setAttribute('role','region');panel.setAttribute('aria-labelledby','next-title');
    panel.innerHTML="<p class='next-ok' role='status'>미리 신청이 접수됐어요.</p><h3 id='next-title'>다음은 이렇게 진행돼요</h3><ol class='next-list'><li><strong>하루 안에 안내 메일을 드려요</strong><span>구성 · 일정 · 최종 가격을 보내 드려요.</span></li><li><strong>지금 바로 무료로 시작할 수 있어요</strong><span>기다리는 동안 가족의 한 줄을 모아 두세요.</span><a class='btn next-start' href='"+startUrl(occasion)+"' data-app-cta='next'"+external+">가족 한 줄 모으기 시작하기</a></li><li><strong>제작 확인 뒤 결제 안내를 드려요</strong><span>그전에는 결제되는 것이 없어요.</span></li><li><strong>행사 전에 받아 보세요</strong><span>날짜에 맞춰 준비해 드려요.</span></li></ol><p class='caption'>결제는 확인 뒤 안내드려요.</p>";
    form.replaceWith(panel);panel.focus({preventScroll:true});panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
  };
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();if(!form.reportValidity())return;
    const status=document.getElementById('form-status');
    if(!config.liveInquiry){status.textContent='검토용 화면이에요. 입력한 정보는 전송되지 않았어요.';return;}
    const fd=new FormData(form);
        const guestsN=fd.get('guests')?Math.max(1,Math.min(1000,parseInt(String(fd.get('guests')),10)||0)):0;
    const payload={email:String(fd.get('email')||'').trim(),journey:d.appJ||d.key,variant:variant,occasion:String(fd.get('occasion')||''),interest:String(fd.get('interest')||'portrait'),note:(optLine()+(guestsN?'\n하객 '+guestsN+'명':'')+(String(fd.get('memo')||'').trim()?'\n메모: '+String(fd.get('memo')).trim():'')).trim().slice(0,500),familySize:String(fd.get('familySize')||'')||undefined,consent:fd.get('consent')==='on',website:String(fd.get('website')||'')};
    if(fd.get('when'))payload.when=String(fd.get('when'));
    if(guestsN&&d.key!=='self'&&d.key!=='teen')payload.kitQty=guestsN<=30?'1-30':guestsN<=80?'31-80':guestsN<=150?'81-150':'151+';
    const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.textContent='보내는 중이에요';status.textContent='접수하고 있어요.';
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
    try{const res=await fetch(config.inquiryEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});if(!res.ok)throw new Error('unconfirmed_response');track('landing_inquiry_success',{packageId:priceKind});showNext(String(payload.occasion||''));return;}
    catch(_){status.textContent='접수 확인을 한 번 더 기다리고 있어요. 적어 주신 내용은 이 화면에 그대로 있어요. 잠시 뒤 한 번 더 눌러 주세요.';track('landing_inquiry_unconfirmed',{});}
    finally{clearTimeout(timer);submit.disabled=false;submit.textContent='미리 신청하기';}
  });
  document.querySelectorAll('a').forEach(a=>{const h=a.getAttribute('href');if(h&&h.startsWith('#'))a.addEventListener('click',e=>{const target=document.getElementById(h.slice(1));if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}});});
  track('landing_view',{});
};
