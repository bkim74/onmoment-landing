(() => {
  'use strict';
  const examples = {
    joy: '혼자 운전해 바다까지 갔다.\n창문을 열고 한참 웃었다.',
    ordinary: '아침 커피가 유난히 맛있었다.\n조금 천천히 마셨다.',
    tired: '오늘은 조금 버거웠다.\n그래도 나를 위해 밥을 차렸다.'
  };
  const input = document.getElementById('moment-input');
  const count = document.getElementById('character-count');
  const quote = document.getElementById('paper-quote');
  const paper = document.getElementById('preview-paper');
  const error = document.getElementById('input-error');
  const status = document.getElementById('preview-status');
  let previewText = '';
  let lastFocused = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = (el) => el.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth',block:'center'});
  const date = new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  document.getElementById('paper-date').textContent = date;

  function updateInput() {
    count.textContent = `${input.value.length} / 180`;
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    document.querySelectorAll('[data-fill]').forEach(btn => btn.setAttribute('aria-pressed', String(examples[btn.dataset.fill] === input.value)));
    if (previewText && input.value !== previewText) status.textContent = '수정한 글은 ‘내 한 쪽 펼쳐보기’를 누르면 반영돼요.';
    else status.textContent = '';
  }
  function fillExample(key, navigate) {
    input.value = examples[key];
    updateInput();
    if (navigate) {
      document.getElementById('experience').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
      input.focus({preventScroll:true});
    }
  }
  input.addEventListener('input', updateInput);
  document.querySelectorAll('[data-fill]').forEach(btn => btn.addEventListener('click', () => fillExample(btn.dataset.fill, false)));
  document.querySelectorAll('[data-example]').forEach(btn => btn.addEventListener('click', () => fillExample(btn.dataset.example, true)));
  document.getElementById('page-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!input.value.trim()) {
      error.textContent = '떠오르는 한 줄을 적거나, 아래 예시를 골라보세요.';
      input.setAttribute('aria-invalid','true');
      input.focus();
      return;
    }
    previewText = input.value;
    quote.textContent = previewText;
    quote.classList.remove('empty');
    paper.classList.add('filled');
    document.getElementById('preview-actions').hidden = false;
    status.textContent = '적어주신 말 그대로, 나의 한 쪽을 펼쳤어요.';
    scrollTo(paper);
  });
  document.getElementById('edit-page').addEventListener('click', () => {scrollTo(input);input.focus({preventScroll:true});});

  async function copyText(target) {
    const text = input.value;
    if (!text.trim()) {target.textContent = '먼저 남기고 싶은 한 줄을 적어주세요.';return;}
    try {
      await navigator.clipboard.writeText(text);
      target.textContent = '한 줄을 복사했어요. 앱에 붙여 넣어 이어가세요.';
    } catch (_) {
      const currentDialog = target.closest('dialog');
      if (currentDialog?.open) currentDialog.close();
      status.textContent = '자동 복사가 어려워요. 선택된 글을 직접 복사해 주세요.';
      input.focus();input.select();
    }
  }
  document.getElementById('copy-page').addEventListener('click', () => copyText(status));
  const continueDialog = document.getElementById('continue-dialog');
  document.getElementById('copy-and-continue').addEventListener('click', () => copyText(document.getElementById('continue-copy-status')));
  function openDialog(dialog) {
    lastFocused = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  document.getElementById('continue-page').addEventListener('click', () => {document.getElementById('continue-copy-status').textContent='';openDialog(continueDialog);});
  const books = {
    self: {series:'MY OWN STORY',title:'소중한 나에게',heading:'나를 위해 남겨둔 하루',text:'오늘은 조금 버거웠다.\n그래도 나를 위해\n밥을 차렸다.',source:'가상 원문 기록을 그대로 배치한 예시',note:'나를 위한 책에는 기쁜 날도, 애쓴 날도 담을 수 있도록 준비하고 있어요. 무엇을 남길지는 내가 고릅니다.'},
    gift: {series:'A GIFT OF MY HEART',title:'소중한 당신에게',heading:'당신에게 전하고 싶은 장면',text:'엄마가 쥐여 준 귤 두 개를\n기차에서 먹었다.\n하나는 달고 하나는 시었다.\n둘 다 엄마 생각이 났다.',source:'설명을 위해 만든 가상 기록',note:'선물하는 책에는 내가 고른 이야기만 담는 방향으로 준비하고 있어요. 나의 기록 전체가 다른 사람에게 전달되는 방식이 아닙니다.'}
  };
  const bookDialog = document.getElementById('book-dialog');
  document.querySelectorAll('[data-book]').forEach(btn => btn.addEventListener('click', () => {
    const key=btn.dataset.book,book=books[key];
    document.getElementById('dialog-book-title').textContent=book.title;
    document.getElementById('dialog-book-series').textContent=book.series;
    document.getElementById('dialog-page-heading').textContent=book.heading;
    document.getElementById('dialog-book-text').textContent=book.text;
    document.getElementById('dialog-book-source').textContent=book.source;
    document.getElementById('dialog-book-note').textContent=book.note;
    bookDialog.querySelector('.dialog-cover').classList.toggle('gift',key==='gift');
    openDialog(bookDialog);
  }));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const r=dialog.getBoundingClientRect();
      if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {document.body.style.overflow='';lastFocused?.focus({preventScroll:true});});
  });
  updateInput();
})();
