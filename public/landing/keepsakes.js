(()=>{
      const root=document.getElementById('onmoment-choices');
      const q=s=>root.querySelector(s);
      const source=[
        {id:'a',text:'오늘 저녁, 딸과 귤을 나눠 먹었다.',date:'10월 12일'},
        {id:'b',text:'말이 없어도 함께 앉아 있는 시간이 좋았다.',date:'10월 13일'},
        {id:'c',text:'일에 쫓겨 마음이 복잡했다.',date:'10월 14일',private:true}
      ];
      const initial=()=>({format:'book',medium:'digital',mode:'original',purpose:'keep',structure:'recommend',detail:'brief',tone:'plain',length:'fit',date:true,life:false,ids:['a','b']});
      const state={recipient:'other',edition:'self',binding:'separate',combinedMedium:'digital',scope:'both',preset:'books',self:initial(),gift:{...initial(),mode:'connect',purpose:'heart',ids:['a','b']}};
      const modeNames={original:'내 문장만',connect:'제목과 짧은 연결',story:'이야기로 풀기'};
      const purposeNames={keep:'그때의 기록을 간직하기',discover:'나를 새롭게 바라보기',celebrate:'지나온 나를 축하하기',heart:'마음을 전하기',milestone:'삶의 한 시기를 기념하기'};
      const get=()=>state[state.edition];
      const chosen=e=>source.filter(x=>e.ids.includes(x.id));
      const effectiveMedium=e=>state.binding==='combined'?state.combinedMedium:e.medium;
      const mediumName=e=>effectiveMedium(e)==='digital'?(e.format==='book'?'전자책':'디지털 카드'):effectiveMedium(e)==='print'?'종이로':'디지털과 종이 둘 다';
      function renderSources(){
        const e=get();q('#om-sources').replaceChildren();
        source.forEach(s=>{
          if(state.edition==='gift'&&s.private)return;
          const label=document.createElement('label');label.className='om-check';
          const input=document.createElement('input');input.type='checkbox';input.checked=e.ids.includes(s.id);input.dataset.source=s.id;
          const span=document.createElement('span');span.textContent=s.text+(s.private?' (내 책에서만)':'');label.append(input,span);q('#om-sources').append(label);
        });
      }
      function addP(text,cls){const p=document.createElement('p');p.className=cls;p.textContent=text;q('#om-prose').append(p);}
      function render(){
        const e=get();const records=chosen(e);const selfGift=state.recipient==='self';const medium=effectiveMedium(e);
        root.querySelectorAll('[data-key]').forEach(group=>{const key=group.dataset.key;const v=key==='medium'?medium:['recipient','edition','preset','binding','scope'].includes(key)?state[key]:e[key];group.querySelectorAll('button[data-value]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===v)));});
        q('#om-editions').hidden=false;
        q('#om-recipient-help').textContent=selfGift?'기록하고 바라보는 나, 선물로 받아 읽는 나. 같은 사람이어도 두 시선은 각각의 이야기가 됩니다.':'내가 간직할 것과 당신에게 건넬 것을 각각 엮어요. 수록할 기록과 편집은 따로 고를 수 있어요.';
        const artifact=e=>e.format==='book'?'책':'카드';
        q('#om-result-relationship').textContent=state.binding==='combined'?'한 권 안에 두 시선 · 1부 기록하는 나 / 2부 선물로 읽는 나':selfGift?'기록하는 나의 '+artifact(state.self)+' + 선물로 읽는 나의 '+artifact(state.gift):'내가 간직할 '+artifact(state.self)+' + 당신에게 건넬 '+artifact(state.gift);
        q('#om-books-preset-label').textContent=selfGift?'두 시선으로 엮는 책':'나와 당신의 두 권';
        q('#om-cards-preset-label').textContent=selfGift?'두 시선의 카드':'카드로 간직하고 건네기';
        root.querySelectorAll('[data-second-mark]').forEach(el=>el.hidden=false);
        q('#om-editions [data-value="self"]').textContent=selfGift?'기록하고 바라보는 나':'내가 간직할 판본';
        q('#om-editions [data-value="gift"]').textContent=selfGift?'선물로 받아 읽는 나':'당신에게 건넬 판본';
        q('#om-binding-options').hidden=!selfGift||state.self.format!=='book'||state.gift.format!=='book';
        q('#om-scope-options').hidden=state.binding==='combined';
        q('[data-key="scope"] [data-value="self"]').textContent=selfGift?'기록하는 나의 판본만':'내가 간직할 판본만';
        q('[data-key="scope"] [data-value="gift"]').textContent=selfGift?'선물로 읽는 나의 판본만':'선물할 판본만';
        q('#om-edition-label').textContent=(selfGift?(state.edition==='self'?'기록하는 나의 ':'선물로 읽는 나의 '):(state.edition==='self'?'나를 위한 ':'당신을 위한 '))+(e.format==='card'?'카드':'책');
        q('#om-digital-label').textContent=e.format==='card'?'이미지로':'전자책으로';
        q('#om-format-help').textContent=e.format==='card'?'한 문장이나 한 장면을 꺼내 보기 좋게.':'여러 날의 장면을 이어, 한 시기를 다시 읽기 좋게.';
        q('#om-medium-help').textContent=(state.binding==='combined'?'한 권 전체에 적용돼요. ':'')+(medium==='digital'?(e.format==='book'?'전자책만으로도 완성할 수 있는 구상입니다. 종이책 선택은 필요하지 않아요.':'화면에서 꺼내 보는 카드 구상입니다.'):'인쇄·배송은 준비 중입니다. 지금은 원하는 모습만 살펴봐요.');
        ['purpose','structure','detail','tone','length'].forEach(k=>q('#om-'+k).value=e[k]);
        q('#om-date').checked=e.date;q('#om-life').checked=e.life;
        q('#om-detail').disabled=e.mode==='original';q('#om-tone').disabled=e.mode==='original';
        q('#om-mode-help').textContent=e.mode==='original'?'내 문장만 선택하면 새 설명이나 분위기 변환을 보태지 않아요.':'분위기와 설명량은 따로 고를 수 있어요. 실제 기록에 없는 일을 보태지는 않아요.';
        q('#om-paper').dataset.shape=e.format;q('#om-paper').dataset.medium=medium;
        q('#om-photo').hidden=e.structure!=='photo';q('#om-life-panel').hidden=!e.life;
        q('#om-title').hidden=e.mode==='original'||!records.length;
        const titles={keep:'나의 말로 남은 날들',discover:'내가 다시 읽는 장면',celebrate:'간직하고 싶은 작은 날',heart:selfGift?'나에게 선물하고 싶은 장면':'당신과 나눠 읽고 싶은 장면',milestone:'이 시절의 한 페이지'};
        q('#om-title').textContent=records.length===1&&records[0].id==='c'?'마음이 복잡했던 날':titles[e.purpose];
        q('#om-paper-kicker').textContent=e.mode==='original'?'고른 기록':'편집 초안 예시 · 내 뜻과 맞는지 확인해요';
        q('#om-prose').replaceChildren();
        const shown=e.length==='short'?records.slice(0,1):records;
        const hasA=shown.some(s=>s.id==='a'),hasB=shown.some(s=>s.id==='b'),hasC=shown.some(s=>s.id==='c');
        if(!records.length){q('#om-title').hidden=true;addP(state.edition==='gift'?(selfGift?'오늘의 나에게 건네고 싶은 기록을 골라주세요.':'당신에게 건네고 싶은 기록을 골라주세요.'):'남기고 싶은 기록을 골라주세요.','om-added');}
        else if(e.mode!=='story')shown.forEach(s=>addP(s.text,'om-source'));
        let added='';
        if(e.mode==='connect'&&records.length){added=hasA&&hasB?'귤을 나눈 저녁과, 함께 앉아 있어 좋았던 시간.':hasC?'복잡했던 마음도 이 기록에 남아 있다.':'그날 남긴 한 문장을 여기 모았다.';if(e.tone==='warm')added+=' 이 장면을 천천히 다시 펼쳐 본다.';if(e.tone==='light')added+=' 한 문장만큼 가볍게, 한 장을 남긴다.';if(e.tone==='calm')added+=' 잠시 그 문장 곁에 머문다.';if(e.detail!=='brief'&&hasA&&hasB)added+=' 두 기록은 다른 날의 장면이다.';if(e.detail==='deep'&&hasA&&hasB)added+=' 같은 저녁으로 합치지 않고, 각각의 날짜와 함께 두었다.';addP(added,'om-added');}
        if(e.mode==='story'&&records.length){
          let parts=[];if(hasA)parts.push('딸과 귤을 나누어 먹은 저녁을 적었다.');if(hasB)parts.push((hasA?'다른 기록에는 ':'')+'말이 없어도 함께 앉아 있는 시간이 좋았다고 남겼다.');if(hasC)parts.push('일에 쫓겨 마음이 복잡하다고 쓴 날도 있었다.');
          if(e.detail!=='brief'&&hasA&&hasB)parts.push('한 기록에는 귤을 나눈 일이, 다른 기록에는 함께 있던 시간에 대한 마음이 담겨 있다.');
          if(e.detail==='deep'&&hasA&&hasB)parts.push('두 날을 같은 사건으로 합치지 않고 나란히 펼친다. 무엇을 나누었는지와 어떤 시간이 좋았는지를 함께 읽을 수 있다.');
          if(e.tone==='warm')parts.push('나는 이 문장들을 다정히 다시 읽어 보고 싶다.');if(e.tone==='light')parts.push('거창한 제목 대신, 작은 장면부터 펼쳐 본다.');if(e.tone==='calm')parts.push('그날의 말 뒤에 여백을 둔다.');
          if(e.purpose==='heart')parts.push(selfGift?'이 장면을 오늘의 나에게 선물하고 싶다.':'이 장면을 당신과 함께 읽고 싶다.');if(e.purpose==='discover')parts.push('나는 어떤 시간을 좋았다고 남겼을까.');if(e.purpose==='celebrate')parts.push('이런 날을 남겨 둔 나를 오늘 축하하고 싶다.');if(e.purpose==='milestone')parts.push('이 시절의 한 장면으로 이 기록을 남긴다.');
          added=parts.join('\n\n');addP(added,'om-added');
        }
        q('#om-paper-footer').textContent=e.date?'예시 기록일 · '+shown.map(s=>s.date).join(' / '):'온순간 · 가상 기록';q('#om-paper-footer').hidden=!records.length;
        q('#om-preview-caption').textContent=modeNames[e.mode]+' · '+mediumName(e)+(e.mode==='original'?' · 새 서술 없음':' · 보탠 말은 받아들이거나 고칠 수 있어요')+(e.length==='short'&&records.length>1?' · 첫 기록만 추린 분량 예시':'');
        q('#om-toc-wrap').hidden=e.format!=='book';q('#om-toc').replaceChildren();
        let items=e.structure==='time'?shown.map(s=>s.date+'의 기록'):e.structure==='letter'?['건네고 싶은 장면','함께 읽고 싶은 말']:e.structure==='photo'?['사진과 그날의 말','사진 밖에 남은 기록']:e.structure==='theme'?['함께한 시간','그날의 내 마음']:e.structure==='facts'?['기록에 있는 일','내가 직접 남긴 마음']:e.structure==='essay'?['남겨 둔 장면','다시 읽는 시간']:e.structure==='mix'?['장면 한 쪽','기록을 잇는 글','여백']:e.purpose==='discover'?['내가 남긴 장면','다시 보이는 나']:['고른 기록','다시 펼칠 자리'];
        if(e.mode==='original')items=shown.map((s,i)=>(e.structure==='theme'?(s.private?'내 마음 · ':'함께한 시간 · '):'')+(e.date?s.date+'의 원문':'원문 '+(i+1)));
        if(!records.length)items=['수록할 기록을 고르면 구성 예시가 보여요'];
        items.forEach(t=>{const li=document.createElement('li');li.textContent=t;q('#om-toc').append(li)});
        q('#om-trace-content').textContent='선택한 가상 원문: '+records.map(s=>s.text).join(' / ')+'\n'+(e.mode==='original'?'본문은 원문 그대로입니다. 배열·서식만 달라집니다.':'제목과 '+(e.mode==='connect'?'마지막 연결 문장':'편집 서술 전체')+'은 이 시안을 위해 만든 초안입니다. 지금의 의도나 해석은 사용자가 확인해야 하며 과거 사실의 증거가 아닙니다.');
        renderSources();q('#om-confirm').hidden=true;
        q('#om-live').textContent=q('#om-edition-label').textContent+' · '+modeNames[e.mode]+' · '+mediumName(e)+' 구성으로 미리보기를 바꿨어요.';
      }
      function openChoice(edition){if(edition)state.edition=edition;render();q('#om-intro').hidden=true;q('#om-editor').hidden=false;q('#om-back').focus();}
      q('#om-enter').addEventListener('click',()=>openChoice());
      root.querySelectorAll('[data-open-edition]').forEach(button=>button.addEventListener('click',()=>openChoice(button.dataset.openEdition)));
      q('#om-back').addEventListener('click',()=>{q('#om-editor').hidden=true;q('#om-intro').hidden=false;q('#om-enter').focus();});
      root.addEventListener('click',ev=>{
        const b=ev.target.closest('button[data-value]');if(!b||!root.contains(b))return;const key=b.parentElement.dataset.key;if(!key)return;
        if(key==='preset'){
          const preset=b.dataset.value;state.preset=preset;
          const active=['self','gift'];
          if(preset==='books')active.forEach(k=>state[k].format='book');
          if(preset==='cards'){active.forEach(k=>state[k].format='card');state.binding='separate';}
          if(preset==='ebook'){active.forEach(k=>{state[k].format='book';state[k].medium='digital';});state.combinedMedium='digital';}
        }
        else if(key==='recipient'){state.preset='custom';state.recipient=b.dataset.value;if(state.recipient==='other')state.binding='separate';}
        else if(key==='binding'){state.binding=b.dataset.value;state.preset='custom';if(state.binding==='combined')state.scope='both';}
        else if(key==='scope')state.scope=b.dataset.value;
        else if(key==='edition')state.edition=b.dataset.value;
        else if(key==='medium'&&state.binding==='combined'){state.combinedMedium=b.dataset.value;state.preset='custom';}
        else {get()[key]=b.dataset.value;if(['format','medium'].includes(key))state.preset='custom';if(key==='format'&&b.dataset.value==='card')state.binding='separate';}
        render();
      });
      root.addEventListener('change',ev=>{const el=ev.target;if(el.dataset.source){const sourceId=el.dataset.source;const e=get();if(el.checked)e.ids.push(sourceId);else e.ids=e.ids.filter(id=>id!==sourceId);render();q('[data-source="'+sourceId+'"]').focus();return;}const key=el.id.replace('om-','');if(['purpose','structure','detail','tone','length'].includes(key))get()[key]=el.value;else if(['date','life'].includes(key))get()[key]=el.checked;else return;render();});
      q('#om-confirm-btn').addEventListener('click',()=>{const ul=q('#om-summary');ul.replaceChildren();q('#om-confirm h3').textContent=state.binding==='combined'?'한 권 안에, 두 개의 시선':state.scope==='both'?'두 시선을 각각 간직해요':'이번에 꺼내 둘 한 판본';(state.scope==='both'?['self','gift']:[state.scope]).forEach((k,i)=>{const e=state[k];const li=document.createElement('li');const role=state.recipient==='self'?(k==='self'?'기록하고 바라보는 나':'선물로 받아 읽는 나'):(k==='self'?'내가 간직할 것':'당신에게 건넬 것');li.textContent=(state.binding==='combined'?(i+1)+'부 · ':'')+role+': '+(e.format==='card'?'카드':'책')+' / '+mediumName(e)+' / '+modeNames[e.mode]+' / '+purposeNames[e.purpose]+' / 고른 기록 '+e.ids.length+'개'+(e.length==='short'&&e.ids.length>1?' 중 첫 기록만 추린 예시':'')+(e.ids.length?'':' — 먼저 기록을 골라주세요');ul.append(li);});q('#om-confirm').hidden=false;q('#om-live').textContent='선택한 구성 요약을 열었어요. 앱 저장이나 제작 신청은 되지 않았어요.';});
      render();
      const routeFocus=new URLSearchParams(window.location.search).get('focus');
      if(routeFocus==='self'||routeFocus==='gift')openChoice(routeFocus);
    })();
