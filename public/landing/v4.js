// 메인·일곱 여정의 체험 동작 — 시안 v4 app.js. 선택 방식은 주소에 남기지 않는다(?for= 는 운영 계약이 아니다).
(() => {
  'use strict';
  const payload = JSON.parse(document.getElementById('experience-data').textContent);
  const {modes} = payload;
  const baseJourney=payload.journey;
  let journey=baseJourney;
  let occasion=journey?.defaultOccasion;
  let mode = 'self';
  let lensIndex = 0;
  let episodeFormat = 'edited';
  let openBook = null;
  const byId = id => document.getElementById(id);
  const setText = (id, value) => {const el=byId(id); if(el) el.textContent=value;};
  function renderBook(){
    if(!openBook) return;
    const m=modes[mode], isA=openBook==='a';
    setText('book-owner',isA?m.ownerA:m.ownerB);
    setText('book-title',isA?m.coverA:m.coverB);
    setText('book-copy',isA?m.pageA:m.pageB);
    setText('book-credit',mode==='together'?'각자가 직접 남기고 공유한 별도의 가상 기록':isA?'가상 원문을 따라 엮은 읽기 예시':'기록에 근거한 AI 편집 초안 · 최종 내용은 사용자가 확인해요');
    document.querySelectorAll('[data-book]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.book===openBook)));
  }
  function renderJourney(){
    if(!journey)return;
    const v=journey.variants[lensIndex], source=v.source||journey.source, together=mode==='together', memorial=occasion==='memorial';
    setText('lens-text',journey.lenses[lensIndex][1]);
    setText('gift-title',v.title);
    setText('gift-text',episodeFormat==='original'?source:mode==='gift'?journey.giftReaders[lensIndex]:v.edited);
    setText('episode-credit',episodeFormat==='original'?'사용자가 남긴 원문 그대로 · 가상 예시':'기록에서 엮은 AI 편집 초안 · 가상 예시');
    document.querySelectorAll('[data-episode-format]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.episodeFormat===episodeFormat)));
    setText('reader-title',together?journey.together.titleB:v.title);
    setText('reader-text',mode==='together'?journey.sharedReader:episodeFormat==='original'?source:mode==='self'?v.reader:journey.giftReaders[lensIndex]);
    const headings={self:'나에게 건네고 싶은\n한 에피소드.',gift:memorial?'내가 기억하는 장면을,\n가족과 나눠요.':'내 눈에 남은 장면을,\n당신에게 건네요.',together:'내 이야기 곁에,\n당신의 이야기도.'};
    const descs={self:'이 장면을 나에게 선물하는 마음으로 다시 읽어요. 새 문장을 쓰기 전에, 기록에서 엮은 초안을 먼저 만나보세요.',gift:memorial?'내가 기억하고 남긴 시간을 가족에게 나눠요. 한 장면만 골라도, 그대로 읽고 간직할 이야기가 돼요.':'함께한 장면이나 나누고 싶은 내 하루를 골라 건네요. 받는 사람이 이대로 읽고 간직할 수 있는 에피소드로요.',together:'각자가 남긴 이야기 중 나누고 싶은 것만 골라요. 서로의 실제 기록을 읽으며 내가 보지 못했던 장면을 만나요.'};
    document.querySelector('[data-journey-gift-heading]').textContent=headings[mode];
    document.querySelector('[data-journey-gift-desc]').textContent=descs[mode];
    setText('gift-recipient',mode==='self'?'나에게 건네는 이야기':mode==='gift'?(memorial?'가족에게 나눌 에피소드':'당신에게 건넬 에피소드'):'내가 골라 건넬 에피소드');
    setText('edition-a-label',together?journey.together.authorA:'내가 간직하는 이야기');
    setText('edition-b-label',mode==='self'?'선물하는 눈으로 읽는 나의 책':mode==='gift'?(memorial?'가족에게 나누는 이야기':'당신에게 건네는 이야기'):journey.together.authorB);
    setText('edition-b-credit',mode==='together'?'상대가 직접 남기고 공유한 별도 가상 원문':episodeFormat==='original'?'고른 원문 그대로 · 가상 예시':'받는 이에게 건네는 편집 초안 · 가상 예시');
    const detailSummary=byId('book-detail').querySelector('summary');
    detailSummary.textContent=mode==='together'?'각자의 이야기를 나란히 펼쳐보기 ↗':'이 이야기가 책이 되면, 두 시선으로 펼쳐보기 ↗';
    document.querySelector('[data-gift-note]').textContent=mode==='together'?'각자가 직접 고르고 허락한 기록의 예시예요. 함께 쓰기는 준비 중이며, 혼자 남긴 이야기만으로도 간직하거나 선물할 수 있어요.': '덧말은 원할 때만. 나눌 범위와 최종 내용은 내가 확인해요.';
    document.querySelectorAll('[data-lens]').forEach(b=>{const n=Number(b.dataset.lens),a=n===lensIndex;b.textContent=journey.lenses[n][0];b.classList.toggle('active',a);b.setAttribute('aria-pressed',String(a));});
    setText('edition-a-title',journey.selfTitle);setText('edition-a-source',source);
    byId('together-context').hidden=!together;
    if(together){setText('together-question',journey.together.question);setText('together-note',journey.together.note);}
    if(journey.occasions){
      document.querySelectorAll('[data-source]').forEach(el=>el.textContent=journey.source);
      document.querySelectorAll('[data-source-title]').forEach(el=>el.textContent=journey.episode);
      setText('occasion-label',journey.label);setText('occasion-caption',journey.caption);setText('occasion-context',journey.context);setText('occasion-notice',journey.notice);
      setText('first-question',journey.question);
      setText('life-wish',journey.wish);setText('life-choice',journey.choice);setText('life-later',journey.later);
      document.querySelectorAll('[data-occasion]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.occasion===occasion)));
    }
  }
  // 고른 여정·방식·계기만 앱 링크에 싣는다(허용값). 이름·본문은 싣지 않는다.
  function syncStoryLinks(){
    document.querySelectorAll('a[data-story-link]').forEach(a=>{
      const u=new URL(a.href);
      if(baseJourney?.journey)u.searchParams.set('journey',baseJourney.journey);
      u.searchParams.set('way',mode);
      if(occasion&&baseJourney?.journey==='parents')u.searchParams.set('occasion',occasion);else u.searchParams.delete('occasion');
      a.href=u.toString();
    });
    document.querySelectorAll('a[href^="/keepsakes/"]').forEach(a=>{a.setAttribute('href','/keepsakes/?way='+(mode==='self'?'self':'gift'));});
  }
  function renderMode(){
    syncStoryLinks();
    const m=modes[mode], memorial=occasion==='memorial';
    document.querySelectorAll('[data-mode]').forEach(b=>{const active=b.dataset.mode===mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));if(journey){b.hidden=b.dataset.mode==='together'&&journey.allowTogether===false;b.textContent=b.dataset.mode==='gift'&&memorial?'가족에게 나누기':modes[b.dataset.mode].label;}});
    document.querySelectorAll('[data-mode-label]').forEach(el=>el.textContent=mode==='gift'&&memorial?'가족에게 나누기':m.label);
    document.querySelectorAll('[data-mode-cta]').forEach(el=>el.textContent=(mode==='gift'&&memorial?'기억하고 싶은 첫 한 쪽':m.cta)+' →');
    setText('mode-title',m.title);setText('mode-body',m.body);setText('mode-roles',m.roles);setText('mode-note',m.note);setText('mode-badge',m.badge);
    setText('cover-a-title',m.coverA);setText('cover-b-title',m.coverB);setText('cover-a-owner',m.ownerA);setText('cover-b-owner',m.ownerB);
    renderBook();renderJourney();
  }
  function selectOccasion(key){
    const selected=baseJourney.occasions.find(o=>o.key===key);
    if(!selected)return;
    occasion=key;journey={...baseJourney,...selected};lensIndex=0;
    const changed=journey.allowTogether===false&&mode==='together';
    if(changed)mode='self';
    renderMode();
  }
  document.querySelectorAll('[data-occasion]').forEach(b=>b.addEventListener('click',()=>selectOccasion(b.dataset.occasion)));
  document.querySelectorAll('[data-open-book]').forEach(a=>a.addEventListener('click',()=>{byId('book-detail').open=true;}));
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;renderMode();const menu=b.closest('details');if(menu)menu.open=false;if(mode==='together'&&byId('book-detail'))byId('book-detail').open=true;}));
  document.querySelectorAll('[data-lens]').forEach(b=>b.addEventListener('click',()=>{lensIndex=Number(b.dataset.lens);renderJourney();}));
  document.querySelectorAll('[data-episode-format]').forEach(b=>b.addEventListener('click',()=>{episodeFormat=b.dataset.episodeFormat;renderJourney();}));
  const prefersReduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>{openBook=b.dataset.book;byId('book-reader').hidden=false;renderBook();byId('book-reader').scrollIntoView({behavior:prefersReduced()?'instant':'smooth',block:'center'});}));
  byId('other-book')?.addEventListener('click',()=>{openBook=openBook==='a'?'b':'a';renderBook();});
  byId('close-book')?.addEventListener('click',()=>{const previous=openBook;openBook=null;byId('book-reader').hidden=true;document.querySelectorAll('[data-book]').forEach(b=>b.setAttribute('aria-expanded','false'));document.querySelector(`[data-book="${previous}"]`).focus();});
  if(occasion)selectOccasion(occasion);else renderMode();
})();
