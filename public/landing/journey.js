(() => {
  'use strict';
  const j=JSON.parse(document.getElementById('journey-data').textContent);
  const $=id=>document.getElementById(id);
  const input=$('journey-input'), wish=$('wish-input'), custom=$('custom-step');
  const paper=$('journey-paper'), status=$('journey-status'), dialog=$('journey-app-dialog');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const moveTo=(el,block='center')=>el.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block});
  let shown=0, rendered=false, selectedStep='', usingCustom=false, previousFocus;
  let pendingSample=null, wishExampleArmed=false, chosenReturn='';
  const exactSample=()=>j.samples.find(s=>s.text===input.value);
  const currentChoice=()=>usingCustom?custom.value:selectedStep;
  $('journey-date').textContent=new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  function setStory(i){
    shown=i;pendingSample=null;$('sample-replace').hidden=true;const s=j.samples[i];
    for(const [id,key] of [['story-reality','text'],['story-receive','receive'],['story-wish','wish'],['story-choice','choice']])$(id).textContent=s[key];
    document.querySelectorAll('[data-story]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.story)===i)));
    updateReturn();
  }
  document.querySelectorAll('[data-story]').forEach(b=>b.addEventListener('click',()=>setStory(Number(b.dataset.story))));
  function renderPaper(){
    if(rendered){$('journey-quote').textContent=input.value;$('journey-quote').classList.remove('empty');}
    $('wish-on-paper').hidden=!wish.value.trim();$('wish-on-paper-text').textContent=wish.value;
    const step=currentChoice();$('step-on-paper').hidden=!step.trim();$('step-on-paper-text').textContent=step;
    $('choice-wish-anchor').hidden=!wish.value.trim();$('choice-wish-text').textContent=wish.value;
    $('choice-question').textContent=wish.value.trim()?'이 장면을 향해, 지금 할 수 있는 가장 작은 한 가지는 무엇인가요?':'지금의 나에게 필요한 작은 한 가지가 있나요?';
    updateReturn();
  }
  function updateReturn(){
    const own=currentChoice().trim();
    $('return-choice').textContent=own?currentChoice():j.samples[shown].choice;
    $('return-source').textContent=own?'방금 내가 고른 말이에요. 아직 해본 일과는 구분해 두어요.':'위 가상 기록의 선택 예시예요.';
    if(chosenReturn)renderReturn(chosenReturn);
  }
  function renderReturn(key){
    chosenReturn=key;
    const own=currentChoice().trim();
    const s=own?exactSample():j.samples[shown];
    const question=s&&(!own||currentChoice()===s.choice)?s.returnQuestion:'해보니 어땠나요? 떠오르는 실제 장면을 한 줄로 남길 수 있어요.';
    const responses={tried:question,different:'실제로는 어떻게 해봤나요? 계획과 달랐던 장면도 내 이야기로 남길 수 있어요.',notyet:'아직이어도 괜찮아요. 지금의 나에게 여전히 가까운 선택인지, 그대로 둘지 다시 골라도 좋아요.'};
    $('return-response').hidden=false;$('return-response-text').textContent=responses[key];
    document.querySelectorAll('[data-return]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.return===key)));
  }
  document.querySelectorAll('[data-return]').forEach(b=>b.addEventListener('click',()=>renderReturn(b.dataset.return)));
  function updateStepButtons(){
    document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(!usingCustom&&selectedStep===b.dataset.step)));
    $('custom-step-button').setAttribute('aria-pressed',String(usingCustom));
    $('custom-step-button').setAttribute('aria-expanded',String(usingCustom));
    $('custom-step-wrap').hidden=!usingCustom;
  }
  function renderChoices(){
    const s=exactSample();const options=s?[s.choice,'오늘은 쉬기']:j.steps;
    const group=$('step-choices');group.replaceChildren();
    options.forEach(value=>{const b=document.createElement('button');b.type='button';b.className='step-choice';b.dataset.step=value;b.textContent=value;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{
      selectedStep=!usingCustom&&selectedStep===value?'':value;usingCustom=false;updateStepButtons();renderPaper();
      $('step-status').textContent=selectedStep?'내가 고른 말이 한 쪽에 놓였어요. 내 말로 바꿔도 좋아요.':'한 걸음은 비워두었어요.';
    });group.append(b);});updateStepButtons();
  }
  function updateInput(){
    $('journey-count').textContent=`${input.value.length} / 180`;$('journey-error').textContent='';input.removeAttribute('aria-invalid');
    const s=exactSample();$('wish-example').hidden=!s;if(s)$('wish-example-text').textContent=s.wish;
    $('receive-note').textContent=s?s.receive:'내가 적은 장면과 마음을 그대로 펼쳤어요. 원할 때 다음 줄을 더해보세요.';
    renderChoices();renderPaper();if(rendered)status.textContent='내가 고친 말도 한 쪽에 그대로 반영돼요.';
  }
  input.addEventListener('input',updateInput);
  wish.addEventListener('input',()=>{wishExampleArmed=false;$('use-wish-example').textContent='이 장면으로 써보기';$('wish-example-status').textContent='';renderPaper();});
  custom.addEventListener('input',renderPaper);
  function fillSample(i){
    const s=j.samples[i];input.value=s.text;wish.value='';custom.value='';selectedStep='';usingCustom=false;rendered=false;wishExampleArmed=false;
    $('journey-actions').hidden=true;$('journey-next').hidden=true;$('journey-reflection').hidden=true;$('choice-part').hidden=true;
    $('open-choice').setAttribute('aria-expanded','false');$('choose-more').setAttribute('aria-expanded','false');
    for(const id of ['choose-more','choose-rest'])$(id).setAttribute('aria-pressed','false');
    $('journey-finish').hidden=true;$('sample-replace').hidden=true;$('journey-quote').textContent='오늘의 나를, 이곳에 남겨 보세요.';$('journey-quote').classList.add('empty');
    paper.classList.remove('filled');status.textContent='';chosenReturn='';$('return-response').hidden=true;
    document.querySelectorAll('[data-return]').forEach(b=>b.setAttribute('aria-pressed','false'));
    $('wish-example-status').textContent='';$('use-wish-example').textContent='이 장면으로 써보기';$('step-status').textContent='';
    pendingSample=null;updateInput();moveTo(input);input.focus({preventScroll:true});
  }
  $('try-story').addEventListener('click',()=>{
    if(input.value.trim()||wish.value.trim()||currentChoice().trim()){
      pendingSample=shown;$('sample-replace').hidden=false;moveTo($('sample-replace'));$('replace-sample').focus({preventScroll:true});
    }else fillSample(shown);
  });
  $('replace-sample').addEventListener('click',()=>{if(pendingSample!==null)fillSample(pendingSample);});
  $('keep-my-writing').addEventListener('click',()=>{pendingSample=null;$('sample-replace').hidden=true;moveTo(input);input.focus({preventScroll:true});});
  $('journey-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(!input.value.trim()){$('journey-error').textContent='지금의 말 한 줄을 적거나, 위의 예시로 체험해 보세요.';input.setAttribute('aria-invalid','true');input.focus();return;}
    rendered=true;renderPaper();paper.classList.add('filled');$('journey-actions').hidden=false;$('journey-next').hidden=false;
    status.textContent='적어주신 말 그대로 펼쳤어요. 이 한 줄에 머물러도 괜찮아요.';moveTo($('journey-next'));
  });
  $('journey-edit').addEventListener('click',()=>{moveTo(input);input.focus({preventScroll:true});});
  function choosePath(more){
    $('journey-reflection').hidden=!more;$('journey-finish').hidden=more;
    $('choose-rest').setAttribute('aria-pressed',String(!more));$('choose-more').setAttribute('aria-pressed',String(more));$('choose-more').setAttribute('aria-expanded',String(more));
    moveTo(more?$('journey-reflection'):$('journey-finish'),'center');if(more)wish.focus({preventScroll:true});
  }
  $('choose-rest').addEventListener('click',()=>choosePath(false));$('choose-more').addEventListener('click',()=>choosePath(true));$('finish-reflection').addEventListener('click',()=>choosePath(false));
  $('use-wish-example').addEventListener('click',()=>{
    const s=exactSample();if(!s)return;
    if(wish.value.trim()&&wish.value!==s.wish&&!wishExampleArmed){wishExampleArmed=true;$('use-wish-example').textContent='적어둔 바람을 예시로 바꾸기';$('wish-example-status').textContent='적어둔 바람이 있어요. 한 번 더 누르면 예시로 바뀝니다.';return;}
    wish.value=s.wish;wishExampleArmed=false;$('use-wish-example').textContent='이 장면으로 써보기';$('wish-example-status').textContent='예시를 놓았어요. 내 마음에 맞게 바꿔도 좋아요.';renderPaper();wish.focus();
  });
  $('open-choice').addEventListener('click',()=>{$('choice-part').hidden=false;$('open-choice').setAttribute('aria-expanded','true');renderPaper();moveTo($('choice-part'));});
  $('custom-step-button').addEventListener('click',()=>{
    if(!usingCustom){if(selectedStep)custom.value=selectedStep;usingCustom=true;selectedStep='';}else usingCustom=false;
    updateStepButtons();renderPaper();$('step-status').textContent=usingCustom?'내 말로 바꿔보세요.':'한 걸음은 비워두었어요.';if(usingCustom)custom.focus();
  });
  $('view-whole-page').addEventListener('click',()=>{renderPaper();moveTo(paper);status.textContent='현실·바람·선택, 내가 남긴 만큼만 담았어요.';});
  function allText(){
    const parts=[`온순간 · ${j.label}`,$('journey-date').textContent,'','현실 · 내가 남긴 장면',input.value];
    if(wish.value.trim())parts.push('','바람 · 내가 만나고 싶은 장면',wish.value);
    if(currentChoice().trim())parts.push('','선택 · 오늘 내가 고른 한 가지 (아직 해본 일은 아니에요)',currentChoice());
    return parts.join('\n');
  }
  const manual=document.createElement('div');manual.id='manual-copy';manual.hidden=true;
  const label=document.createElement('label');label.htmlFor='manual-copy-text';label.textContent='직접 복사할 한 쪽';
  const text=document.createElement('textarea');text.id='manual-copy-text';text.readOnly=true;text.rows=6;manual.append(label,text);dialog.insertBefore(manual,$('dialog-copy-status'));
  function openDialog(){previousFocus=document.activeElement;$('dialog-copy-status').textContent='';manual.hidden=true;dialog.showModal();document.body.style.overflow='hidden';}
  function fallback(target){text.value=allText();manual.hidden=false;target.textContent='아래 글을 직접 선택해 복사해 주세요.';text.focus();text.select();}
  async function copy(target){
    if(!input.value.trim()){target.textContent='먼저 지금의 말 한 줄을 적어주세요. 앱에서 바로 시작해도 좋아요.';return;}
    try{await navigator.clipboard.writeText(allText());target.textContent='내가 남긴 현실·바람·선택을 복사했어요. 앱의 오늘 기록에 붙여 넣어 주세요.';}
    catch(_){if(!dialog.open)openDialog();fallback($('dialog-copy-status'));}
  }
  $('journey-copy').addEventListener('click',()=>copy(status));$('dialog-copy-page').addEventListener('click',()=>copy($('dialog-copy-status')));
  $('journey-continue').addEventListener('click',openDialog);$('app-bridge-open').addEventListener('click',openDialog);
  $('close-app-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus({preventScroll:true});});
  dialog.addEventListener('click',ev=>{if(ev.target!==dialog)return;const r=dialog.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)dialog.close();});
  updateInput();
})();
