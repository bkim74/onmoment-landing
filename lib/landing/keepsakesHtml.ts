// 결과 선택 화면 마크업 — 시안 9e919ca 를 옮겼다. 동작은 public/landing/keepsakes.js. 가상 기록만 쓰고 저장·전송하지 않는다.
const TEMPLATE = `<div id="onmoment-choices">
  <style>
    #onmoment-choices{--om-paper:light-dark(#fbf8f1,#252720);--om-sheet:light-dark(#fffdf9,#30332a);--om-ink:light-dark(#283c32,#eef0e7);--om-quiet:light-dark(#5e695f,#bbc5b6);--om-line:light-dark(#d9ddd0,#596151);--om-soft:light-dark(#edf0e5,#383e30);--om-active:light-dark(#344f3c,#c5d8b5);--om-onactive:light-dark(#fffdf5,#233122);--om-cover:light-dark(#d5dfbd,#536044);--om-rose:light-dark(#ecdbd0,#665047);--om-shadow:light-dark(#2434271c,#00000035);font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif;color:var(--om-ink);background:var(--om-paper);border-radius:16px;overflow-wrap:anywhere;line-height:1.65}
    #onmoment-choices *{box-sizing:border-box;word-break:keep-all}
    #onmoment-choices [hidden]{display:none!important}
    #onmoment-choices button,#onmoment-choices select,#onmoment-choices input{font:inherit;color:inherit}
    #onmoment-choices button{min-height:44px;border:1px solid var(--om-line);border-radius:10px;background:var(--om-sheet);padding:10px 14px;text-align:left}
    #onmoment-choices button:focus-visible,#onmoment-choices summary:focus-visible,#onmoment-choices select:focus-visible{outline:3px solid var(--om-active);outline-offset:3px}
    #onmoment-choices button[aria-pressed="true"]{background:var(--om-active);color:var(--om-onactive);border-color:var(--om-active)}
    #onmoment-choices button:disabled{opacity:.55}
    #onmoment-choices .om-primary{background:var(--om-active);color:var(--om-onactive);border-color:var(--om-active);text-align:center}
    #onmoment-choices .om-plain{border:0;background:transparent;padding-left:0;color:var(--om-quiet);text-decoration:underline;text-underline-offset:4px}
    #onmoment-choices .om-chrome{padding:18px 110px 18px 26px;border-bottom:1px solid var(--om-line);display:flex;gap:14px;align-items:center;flex-wrap:wrap}
    #onmoment-choices .om-logo{font-family:Georgia,"Noto Serif KR",serif;letter-spacing:.15em;font-size:22px}
    #onmoment-choices .om-status{font-size:12px;color:var(--om-quiet)}
    #onmoment-choices .om-intro{padding:34px 26px 30px;text-align:center}
    #onmoment-choices h2,#onmoment-choices h3,#onmoment-choices p{margin:0 0 12px}
    #onmoment-choices h2{font-family:Georgia,"Noto Serif KR",serif;font-size:34px;line-height:1.4;font-weight:500;letter-spacing:-.04em}
    #onmoment-choices h3{font-size:19px;font-weight:500}
    #onmoment-choices .om-kicker{font-size:12px;letter-spacing:.09em;color:var(--om-quiet);margin-bottom:12px}
    #onmoment-choices .om-sub{color:var(--om-quiet);font-size:15px}
    #onmoment-choices .om-still-life{display:flex;justify-content:center;align-items:end;gap:22px;margin:28px auto;max-width:560px}
    #onmoment-choices .om-object{width:170px;min-height:195px;padding:28px 17px 20px;background:var(--om-cover);border-radius:3px 11px 11px 3px;box-shadow:inset 6px 0 0 var(--om-shadow),9px 10px 18px var(--om-shadow);font-family:Georgia,"Noto Serif KR",serif;text-align:left;display:flex;flex-direction:column;justify-content:space-between;font-size:19px}
    #onmoment-choices .om-object small{display:block;font-size:12px;font-family:inherit}
    #onmoment-choices .om-object.om-cardobject{width:190px;min-height:130px;background:var(--om-sheet);border-radius:3px;box-shadow:0 8px 22px var(--om-shadow);font-size:16px;transform:rotate(-3deg)}
    #onmoment-choices .om-object.om-device{width:130px;min-height:175px;background:var(--om-soft);border:6px solid var(--om-ink);border-radius:15px;box-shadow:none;font-size:16px;padding:18px 12px}
    #onmoment-choices .om-footnote{font-size:12px;color:var(--om-quiet);margin-top:16px}
    #onmoment-choices .om-editor{padding:22px 26px 30px}
    #onmoment-choices .om-editor-header{display:flex;align-items:start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}
    #onmoment-choices .om-editor-header h2{font-size:27px}
    #onmoment-choices .om-recipient-bar{padding:16px;background:var(--om-soft);margin-bottom:22px;border-radius:12px}
    #onmoment-choices .om-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
    #onmoment-choices .om-row button{flex:1;min-width:105px;text-align:center}
    #onmoment-choices .om-edition-row{margin-top:12px;margin-bottom:18px}
    #onmoment-choices .om-edition-row button{flex:0 1 auto}
    #onmoment-choices .om-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:start}
    #onmoment-choices fieldset{border:0;padding:0;margin:0 0 20px;min-width:0}
    #onmoment-choices legend{font-size:15px;font-weight:500;margin-bottom:8px;padding:0}
    #onmoment-choices .om-help{font-size:12px;color:var(--om-quiet);margin:8px 0 0}
    #onmoment-choices .om-choices{display:grid;gap:8px}
    #onmoment-choices .om-choices button strong{font-weight:500;display:block}
    #onmoment-choices .om-choices button span{display:block;font-size:12px;margin-top:3px}
    #onmoment-choices .om-preview-area{padding:20px;background:var(--om-soft);border-radius:12px;min-width:0}
    #onmoment-choices .om-preview-top{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:14px;font-size:12px}
    #onmoment-choices .om-tag{padding:3px 8px;background:var(--om-sheet);border-radius:20px;font-size:12px}
    #onmoment-choices .om-paper{padding:26px 24px;background:var(--om-sheet);min-height:265px;box-shadow:0 8px 20px var(--om-shadow);border-radius:3px;position:relative}
    #onmoment-choices .om-paper[data-shape="book"]{border-left:7px solid var(--om-cover);border-radius:2px 9px 9px 2px}
    #onmoment-choices .om-paper[data-medium="print"]{box-shadow:4px 4px 0 var(--om-line),8px 8px 0 var(--om-sheet),12px 12px 24px var(--om-shadow)}
    #onmoment-choices .om-paper h3{font-family:Georgia,"Noto Serif KR",serif;font-size:24px;font-weight:500;line-height:1.5;margin-bottom:24px}
    #onmoment-choices .om-paper .om-source{font-family:Georgia,"Noto Serif KR",serif;font-size:17px;white-space:pre-wrap;margin-bottom:18px}
    #onmoment-choices .om-paper .om-added{font-size:15px;white-space:pre-wrap}
    #onmoment-choices .om-paper footer{border-top:1px solid var(--om-line);padding-top:12px;margin-top:22px;font-size:12px;color:var(--om-quiet)}
    #onmoment-choices .om-photo{height:72px;border:1px dashed var(--om-line);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:var(--om-quiet);font-size:12px;background:var(--om-soft)}
    #onmoment-choices .om-caption{font-size:12px;color:var(--om-quiet);padding-top:16px;min-height:35px}
    #onmoment-choices details{border-top:1px solid var(--om-line);padding:14px 0}
    #onmoment-choices summary{min-height:44px;display:list-item;font-size:15px;align-content:center}
    #onmoment-choices .om-controls{display:grid;gap:14px;padding:12px 0}
    #onmoment-choices .om-controls label{display:grid;gap:5px;font-size:13px}
    #onmoment-choices select{width:100%;min-height:44px;border:1px solid var(--om-line);border-radius:8px;background:var(--om-sheet);padding:8px;font-size:16px}
    #onmoment-choices .om-check{display:flex!important;align-items:start;gap:10px!important;padding:8px 0;min-height:44px}
    #onmoment-choices input[type="checkbox"]{width:19px;height:19px;flex-shrink:0;accent-color:var(--om-active);margin-top:4px}
    #onmoment-choices .om-source-note{font-size:12px;color:var(--om-quiet)}
    #onmoment-choices .om-full{width:100%;margin-top:12px}
    #onmoment-choices .om-confirm{padding:18px;margin-top:18px;border:1px solid var(--om-line);border-radius:10px;background:var(--om-sheet)}
    #onmoment-choices .om-confirm ul,#onmoment-choices .om-contents{padding-left:20px;margin:8px 0;font-size:14px}
    #onmoment-choices .om-report{font-size:13px;color:var(--om-quiet);padding-top:14px}
    #onmoment-choices .om-still-life{gap:30px;align-items:center}
    #onmoment-choices button.om-cover-button{width:190px;min-height:250px;padding:25px 20px 20px;background:var(--om-cover);border:0;border-radius:3px 10px 10px 3px;box-shadow:inset 7px 0 0 var(--om-shadow),8px 10px 18px var(--om-shadow);display:flex;flex-direction:column;justify-content:space-between;text-align:left;font-family:Georgia,"Noto Serif KR",serif;transition:transform .2s}
    #onmoment-choices button.om-cover-button:hover{transform:translateY(-5px)}
    #onmoment-choices button.om-cover-gift{background:var(--om-rose);transform:rotate(3deg);margin-top:28px}
    #onmoment-choices button.om-cover-gift:hover{transform:rotate(3deg) translateY(-5px)}
    #onmoment-choices .om-cover-button small{font-size:11px;letter-spacing:.04em}
    #onmoment-choices .om-cover-title{font-size:27px;line-height:1.5}
    #onmoment-choices .om-cover-desc{font-size:13px;line-height:1.7}
    #onmoment-choices .om-discovery{margin:18px 0 24px}
    #onmoment-choices .om-presets{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
    #onmoment-choices .om-presets button{padding:13px 10px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
    #onmoment-choices .om-presets strong{font-size:14px;font-weight:500}
    #onmoment-choices .om-presets small{font-size:12px}
    #onmoment-choices .om-mini{height:47px;display:flex;gap:5px;align-items:center;justify-content:center}
    #onmoment-choices .om-mini i{display:block;width:27px;height:39px;background:var(--om-cover);border-left:3px solid var(--om-quiet);border-radius:1px 4px 4px 1px;box-shadow:3px 3px 0 var(--om-shadow)}
    #onmoment-choices .om-mini i.rose{background:var(--om-rose)}
    #onmoment-choices .om-mini i.card-shape{width:46px;height:30px;border:1px solid var(--om-line);background:var(--om-sheet);border-radius:2px}
    #onmoment-choices .om-mini i.digital-shape{width:30px;height:43px;border:3px solid var(--om-quiet);background:var(--om-sheet);border-radius:5px}
    #onmoment-choices .om-discovery-note{padding:14px 0 0;text-align:center;color:var(--om-quiet);font-size:13px}
    #onmoment-choices .om-source-note{white-space:pre-wrap}
    @media(max-width:650px){#onmoment-choices .om-chrome{padding-right:18px}}
    @media(max-width:650px){#onmoment-choices .om-presets{grid-template-columns:repeat(2,minmax(0,1fr))}#onmoment-choices .om-presets button:first-child{grid-column:1/-1}#onmoment-choices .om-still-life{gap:18px}#onmoment-choices button.om-cover-button{width:145px;min-height:215px;padding:22px 14px 17px}#onmoment-choices .om-cover-title{font-size:23px}#onmoment-choices .om-cover-desc{font-size:12px}#onmoment-choices .om-cover-button small{font-size:9px}}
    @media(prefers-reduced-motion:reduce){#onmoment-choices button.om-cover-button{transition:none}}
    @media(max-width:650px){#onmoment-choices .om-columns{grid-template-columns:1fr}#onmoment-choices .om-editor{padding:18px}#onmoment-choices .om-intro{padding:26px 18px}#onmoment-choices h2{font-size:28px}#onmoment-choices .om-still-life{gap:12px}#onmoment-choices .om-object{width:135px;min-height:170px;padding:20px 14px;font-size:17px}#onmoment-choices .om-object.om-cardobject{width:145px;min-height:120px;font-size:15px}#onmoment-choices .om-object.om-device{display:none}#onmoment-choices .om-preview-area{padding:16px}#onmoment-choices .om-paper{padding:24px 18px}#onmoment-choices .om-chrome{padding-left:18px}#onmoment-choices .om-row button{min-width:85px;padding:9px}}
  </style>
  <header class="om-chrome"><span class="om-logo">온순간</span><span class="om-status">결과 선택 화면 · 가상 기록으로 보는 디자인 시안</span></header>
  <section id="om-intro" class="om-intro">
    <p class="om-kicker">두 권의 책 · 시범 준비 중</p>
    <h2>한 권은 나에게.<br>한 권은, 소중한 당신에게.</h2>
    <p class="om-sub">살아온 날들을 다시 펼쳐보는 책.<br>그중 건네고 싶은 마음을 골라 담는 책.</p>
    <div class="om-still-life" aria-label="두 권에서 시작하는 결과 선택">
      <button type="button" class="om-cover-button cursor-interaction" data-open-edition="self" aria-label="나를 위한 책을 펼쳐 다양한 결과 살펴보기"><small>MY OWN STORY</small><span class="om-cover-title">소중한<br>나에게</span><span class="om-cover-desc">좋은 날도, 애쓴 날도<br>모두 나의 이야기</span><small>온순간 · 펼쳐보기 ↗</small></button>
      <button type="button" class="om-cover-button om-cover-gift cursor-interaction" data-open-edition="gift" aria-label="소중한 당신을 위한 책을 펼쳐 다양한 결과 살펴보기"><small>A GIFT OF MY HEART</small><span class="om-cover-title">소중한<br>당신에게</span><span class="om-cover-desc">당신에게 전하고 싶은<br>내 마음의 장면들</span><small>온순간 · 펼쳐보기 ↗</small></button>
    </div>
    <p class="om-sub">나에게 남고, 당신에게 닿는 이야기.<br>선물의 대상이 나여도, 서로 다른 시선으로 두 권을 엮어요.</p>
    <button type="button" id="om-enter" class="om-primary cursor-interaction">두 권 펼쳐보고, 내 모습으로 고르기 →</button>
    <p class="om-footnote">표지를 눌러도 다양한 결과를 살펴볼 수 있어요.<br>표지와 내용은 가상 시안이며, 자동 제작·주문·전송은 제공하지 않습니다.</p>
  </section>
  <section id="om-editor" class="om-editor" hidden>
    <div class="om-editor-header"><div><button type="button" id="om-back" class="om-plain cursor-interaction">← 두 권의 책</button><h2>하나의 삶, 두 개의 시선.</h2><p class="om-sub">내가 바라보는 이야기와 선물로 만나게 될 이야기.<br>받는 사람이 나여도, 서로 다른 두 권이 될 수 있어요.</p></div></div>
    <fieldset class="om-recipient-bar"><legend>이번 선물은 누구에게 건넬까요?</legend><div class="om-row" data-key="recipient"><button type="button" data-value="other" aria-pressed="true" class="cursor-interaction">소중한 사람에게</button><button type="button" data-value="self" aria-pressed="false" class="cursor-interaction">나 자신에게</button></div><p class="om-help" id="om-recipient-help">내가 간직할 한 권과 당신에게 건넬 한 권을 각각 엮어요.</p><p id="om-result-relationship" class="om-discovery-note" aria-live="polite">내가 간직할 책 + 당신에게 건넬 책</p></fieldset>
    <section class="om-discovery" aria-label="결과를 담는 모습"><div class="om-presets" data-key="preset">
      <button type="button" data-value="books" aria-pressed="true" class="cursor-interaction"><span class="om-mini" aria-hidden="true"><i></i><i class="rose" data-second-mark></i></span><strong id="om-books-preset-label">나와 당신의 두 권</strong><small>쌓인 날들을 이어 읽기</small></button>
      <button type="button" data-value="cards" aria-pressed="false" class="cursor-interaction"><span class="om-mini" aria-hidden="true"><i class="card-shape"></i><i class="card-shape" data-second-mark></i></span><strong id="om-cards-preset-label">카드로 가볍게</strong><small>한 장면을 담아 간직하고 건네기</small></button>
      <button type="button" data-value="ebook" aria-pressed="false" class="cursor-interaction"><span class="om-mini" aria-hidden="true"><i class="digital-shape"></i><i class="digital-shape" data-second-mark></i></span><strong>전자책으로만</strong><small>화면에서 오래 꺼내 보기</small></button>
    </div><p class="om-discovery-note">책이나 카드로, 디지털이나 종이로. 각자의 이야기에 맞게 담아보세요.</p></section>
    <div class="om-row om-edition-row" id="om-editions" data-key="edition"><button type="button" data-value="self" aria-pressed="true" class="cursor-interaction">내가 간직할 판본</button><button type="button" data-value="gift" aria-pressed="false" class="cursor-interaction">당신에게 건넬 판본</button></div>
    <details id="om-binding-options" hidden><summary class="cursor-interaction">두 관점을 한 권으로 모으고 싶다면</summary><div class="om-row" data-key="binding"><button type="button" data-value="separate" aria-pressed="true" class="cursor-interaction">두 권으로 각각</button><button type="button" data-value="combined" aria-pressed="false" class="cursor-interaction">한 권에 두 부분으로</button></div><p class="om-help">두 시선의 내용은 따로 유지하고, 한 권의 1부와 2부로 모아요.</p></details>
    <details id="om-scope-options"><summary class="cursor-interaction">이번에는 한 판본만 꺼내두고 싶다면</summary><div class="om-row" data-key="scope"><button type="button" data-value="both" aria-pressed="true" class="cursor-interaction">두 판본 모두</button><button type="button" data-value="self" aria-pressed="false" class="cursor-interaction">내가 간직할 판본만</button><button type="button" data-value="gift" aria-pressed="false" class="cursor-interaction">선물할 판본만</button></div><p class="om-help">이번에 꺼내둘 것만 골라요. 다른 판본의 기록과 편집은 그대로 유지됩니다.</p></details>
    <div class="om-columns">
      <div>
        <fieldset><legend>어떤 크기의 이야기로 담을까요?</legend><div class="om-row" data-key="format"><button type="button" data-value="card" aria-pressed="true" class="cursor-interaction">한 장의 카드</button><button type="button" data-value="book" aria-pressed="false" class="cursor-interaction">한 권의 책</button></div><p class="om-help" id="om-format-help">한 문장이나 한 장면을 꺼내 보기 좋게.</p></fieldset>
        <fieldset><legend>어떤 형태로 간직할까요?</legend><div class="om-row" data-key="medium"><button type="button" data-value="digital" aria-pressed="true" class="cursor-interaction" id="om-digital-label">이미지로</button><button type="button" data-value="print" aria-pressed="false" class="cursor-interaction">종이로</button><button type="button" data-value="both" aria-pressed="false" class="cursor-interaction">둘 다</button></div><p class="om-help" id="om-medium-help">화면에서 꺼내 보는 카드 구상입니다.</p></fieldset>
        <fieldset><legend>내 말에 얼마나 손을 보탤까요?</legend><div class="om-choices" data-key="mode">
          <button type="button" data-value="original" aria-pressed="true" class="cursor-interaction"><strong>내 문장만 그대로</strong><em class="om-state">지금 앱에서 가능</em><span>쓴 말은 바꾸지 않고, 순서와 여백으로 엮어요.</span></button>
          <button type="button" data-value="connect" aria-pressed="false" class="cursor-interaction"><strong>제목과 짧은 연결을 더해</strong><em class="om-state">앱 준비 중</em><span>원문 사이에, 기록에 근거한 짧은 문장을 보태요.</span></button>
          <button type="button" data-value="story" aria-pressed="false" class="cursor-interaction"><strong>이야기로 풀어</strong><em class="om-state">앱 준비 중</em><span>고른 기록의 맥락을 연결해 읽을 만한 초안을 제안해요.</span></button>
        </div></fieldset>
        <details id="om-options"><summary class="cursor-interaction">조금 더 내 취향으로</summary><div class="om-controls">
          <label>이번에 담고 싶은 것<select id="om-purpose"><option value="keep">그때의 기록을 간직하기</option><option value="discover">나를 새롭게 바라보기</option><option value="celebrate">지나온 나를 축하하기</option><option value="heart">마음을 전하기</option><option value="milestone">삶의 한 시기를 기념하기</option></select></label>
          <label>이야기를 엮는 방식<select id="om-structure"><option value="recommend">기록에 맞춰 제안받기</option><option value="time">날짜를 따라 · 연대기</option><option value="theme">닮은 장면끼리 · 주제 모음</option><option value="facts">사실과 선택을 또렷하게 · 팩트노트</option><option value="essay">장면의 의미를 따라 · 수필</option><option value="letter">마음을 건네는 편지처럼</option><option value="photo">사진을 중심으로</option><option value="mix">이야기에 맞춰 섞어서</option><option value="two" disabled>두 사람의 시선 — 공동 허용 자료가 있을 때</option></select></label>
          <label>설명은 어느 정도로<select id="om-detail"><option value="brief">짧고 여백 있게</option><option value="context">맥락을 함께</option><option value="deep">장면의 연결을 자세히</option></select></label>
          <label>보태는 문장의 분위기<select id="om-tone"><option value="plain">담백하게</option><option value="warm">다정하게</option><option value="light">가볍고 유쾌하게</option><option value="calm">차분하게</option></select></label>
          <p class="om-help" id="om-mode-help">내 문장만 선택하면 새 설명이나 분위기 변환을 보태지 않아요.</p>
          <label>분량<select id="om-length"><option value="fit">재료에 맞게</option><option value="short">짧게 추려서</option><option value="enough">충분히 담아서</option></select></label>
          <p class="om-help">분량을 채우려고 없던 장면을 만들지 않아요. 제본 분량은 제작 준비 뒤 안내해요.</p>
          <label class="om-check"><input id="om-date" type="checkbox" checked><span>기록일을 함께 표시</span></label>
          <label class="om-check"><input id="om-life" type="checkbox"><span>현실·바람·선택을 담을 자리 보기<br><span class="om-source-note">책의 필수 목차가 아니에요. 남긴 내용이 있을 때만 담아요.</span></span></label>
        </div></details>
        <details id="om-material"><summary class="cursor-interaction">이 판본에 담을 기록 고르기</summary><p class="om-help">이 체험에서는 가상 기록을 미리 골라두었어요. 실제 선물책에는 본인이 선택한 기록만 들어갑니다.</p><div id="om-sources"></div><p class="om-help">이번 작품에서 빼도 원기록은 남아요.</p></details>
      </div>
      <div class="om-preview-area">
        <div class="om-preview-top"><span id="om-edition-label">나를 위한 카드</span><span class="om-tag">가상 예시</span></div>
        <div class="om-paper" id="om-paper" data-shape="card" data-medium="digital"><div id="om-photo" class="om-photo" hidden>직접 고른 사진이 놓일 자리</div><div class="om-kicker" id="om-paper-kicker">고른 기록</div><h3 id="om-title" hidden></h3><div id="om-prose"></div><footer id="om-paper-footer">예시 기록일 · 10월 12일 / 10월 13일</footer></div>
        <p class="om-caption" id="om-preview-caption">내 문장만 · 디지털 카드 · 새 서술 없음</p>
        <div id="om-toc-wrap" hidden><p class="om-kicker">이런 흐름의 책을 제안해요</p><ol id="om-toc" class="om-contents"></ol><p class="om-help">구성 예시예요. 자료가 적으면 한 쪽이나 짧은 책으로 남길 수 있어요.</p></div>
        <div id="om-life-panel" hidden><details><summary class="cursor-interaction">남긴 말과 살아본 일 구분하기</summary><p class="om-help">현실: 함께 앉아 있던 시간<br>바람: 이 예시에는 아직 없음<br>선택: 이 예시에는 아직 없음<br>살아본 기록: 미확인</p><p class="om-help">바람이나 선택을 자동으로 채우지 않아요. 선택했다고 실천한 것으로 쓰지 않아요.</p></details></div>
        <details id="om-trace"><summary class="cursor-interaction">원문과 보탠 문장 살펴보기</summary><p class="om-source-note" id="om-trace-content"></p></details>
        <button type="button" id="om-confirm-btn" class="om-primary om-full cursor-interaction">내가 고른 구성 확인</button>
        <div class="om-confirm" id="om-confirm" hidden><h3>이렇게 간직하고 싶어요</h3><ul id="om-summary"></ul><p class="om-help">이 선택은 화면 안에서만 유지돼요. 저장·제작·공유 신청은 되지 않습니다.</p></div>
        <p class="om-footnote">선택 체험용 시안입니다. 실제 AI를 호출하지 않으며, 준비된 가상 문장이 바뀝니다. 자동 책 제작·전자책 파일 생성·인쇄 주문·전송은 이 화면에서 제공하지 않습니다.</p>
      </div>
    </div>
    <div class="om-report" id="om-live" role="status" aria-live="polite"></div>
  </section>
  
</div>
`;
export const keepsakesHtml = (appOrigin: string) => TEMPLATE.split("__APP__").join(appOrigin);
