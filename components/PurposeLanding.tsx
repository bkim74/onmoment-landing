"use client";

/**
 * 첫 화면 — "살아가는 이야기를, 소중한 당신에게." (founder 승인 디자인 2026-10-30, 02_DESIGN 기준)
 *
 * 경계
 *   - 시작 버튼은 앱의 /start 로 간다. 넘기는 것은 허용 목록 enum(목적·계기·버튼 위치)뿐이다.
 *     이름·본문·날짜는 이 페이지에서 받지도 넘기지도 않는다.
 *   - 예시는 모두 가상 기록이다. 실제 사용자의 변화나 후기로 읽히지 않게 표시한다.
 *   - 지금 앱이 하는 일(기록·한 쪽·직접 고른 책)과 준비 중인 일(AI 편집 초안 시범·인쇄)을 섞지 않는다.
 */

import { useState } from "react";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

type Intent = "gift" | "self";
type Purpose = "occasion" | "thanks" | "together" | "myself";
type Src = "hero" | "occasion" | "example" | "closing" | "story";
type Person = "friend" | "self" | "partner" | "parent" | "child" | "trip";

function startHref(intent: Intent, src: Src, occasion?: Purpose | null) {
  const q = new URLSearchParams({ intent });
  if (occasion) q.set("occasion", occasion);
  q.set("src", src);
  return `${APP}/start?${q.toString()}`;
}

const PURPOSES: Record<Purpose, { label: string; context: string; title: string; desc: string; cta: string; person: Person }> = {
  occasion: { label: "특별한 날에", context: "생일 · 기념일 · 졸업 · 퇴직", title: "이번에는,\n우리의 시간이 담긴 선물.", desc: "함께 웃었던 날과 잊지 못한 기억을 골라, 그 사람에게 건넬 편지나 작은 책으로.", cta: "그 사람의 선물 준비하기", person: "friend" },
  thanks: { label: "고마움을 전할 때", context: "감사 · 응원 · 미처 못한 말", title: "그때는 못 했던 말,\n지금 전해도 좋으니까.", desc: "막연한 고마움 대신, 마음에 남은 장면과 지금의 말을 담은 편지로.", cta: "그때의 마음 남기기", person: "partner" },
  together: { label: "함께한 시간을", context: "여행 · 육아 · 프로젝트 · 모임", title: "함께한 시간이,\n사진첩 밖에서도 이어지도록.", desc: "흩어진 메모와 기억을 엮어, 함께 간직할 이야기로 남겨보세요.", cta: "우리의 시간 엮어보기", person: "trip" },
  myself: { label: "새로 시작하는 나에게", context: "퇴직 · 이직 · 독립 · 새로운 도전", title: "다음 장으로 가기 전,\n여기까지 온 나에게.", desc: "지나온 수고와 변화를 돌아보며, 지금의 내가 간직할 한 편으로.", cta: "나의 시간 돌아보기", person: "self" },
};

type Case = {
  to: string; title: string; label1: string; note1: string; label2: string; note2: string;
  chapter: string; copy: string; end: string; mirror: string;
  current: string; wish: string; choice: string; after: string;
};

// 모두 가상 기록·편집 예시다(자녀 예시 포함 — 실제 가족 기록은 공개 승인 전까지 쓰지 않는다).
const CASES: Record<Person, Case> = {
  friend: { to: "친구에게", title: "내 곁에\n있어준 날들", label1: "어느 비 오는 날", note1: "역 앞에서 우산을 들고 기다려줬다.", label2: "함께 걸었던 저녁", note2: "별말 없이 걸었는데, 돌아오는 길엔 마음이 가벼웠다.", chapter: "네가 기다리던 자리", copy: "비 오는 날에는 역 앞에 네가 있었고, 마음이 무거운 저녁에는 함께 걷는 네가 있었다.", end: "그때의 기록을 다시 읽으니, 함께 있었던 시간이 남아 있다.", mirror: "“나는 대단한 위로보다,\n곁에 있어주는 마음을\n오래 기억하는구나.”", current: "고마운 마음은 있는데,\n먼저 연락하는 일은 자꾸 미뤘다.", wish: "이번에는 내가 친구의 이야기를\n들으며 함께 걷는 저녁.", choice: "이번 주, 시간 괜찮은지 물어보기.", after: "“산책 대신 잠깐 통화했다.\n그동안 어떻게 지냈는지 들었다.”" },
  self: { to: "나에게", title: "애쓴 날도,\n쉬어간 날도", label1: "일이 잘 안 풀린 날", note1: "마무리 못한 일이 자꾸 떠오른다. 그래도 오늘 할 말은 했다.", label2: "잠깐 쉬었던 오후", note2: "공원 벤치에 앉아 있었다. 아무것도 안 해도 좋은 시간이 있었다.", chapter: "나에게 남겨둔 자리", copy: "할 말을 꺼낸 날과, 아무것도 하지 않고 쉬었던 날. 둘 다 나의 하루에 남아 있다.", end: "잘 해낸 일만 골라 남기지 않아도 된다. 잠깐 쉬었던 오후도 이 이야기에 함께 두고 싶다.", mirror: "“나는 해낸 일로만\n하루를 세고 있었네.\n쉬었던 시간도 좋았는데.”", current: "하루 끝이면\n못한 일부터 떠올린다.", wish: "내가 애쓴 일도 알아주며,\n편안하게 마치는 저녁.", choice: "오늘 나에게 고마운 일 하나 적어보기.", after: "“잘 모르겠어서 그냥 쉬었다.\n오늘은 그걸로 두고 싶다.”" },
  partner: { to: "배우자에게", title: "우리 함께\n웃던 저녁", label1: "늦게 돌아온 날", note1: "말없이 데워둔 저녁을 먹었다. 고맙다는 말은 못 했다.", label2: "주말 아침", note2: "같이 걷다 별것 아닌 얘기에 한참 웃었다.", chapter: "특별하지 않아서 좋았던", copy: "늦은 저녁의 따뜻한 밥과, 주말 아침 함께 웃었던 산책. 우리에게는 그런 날들이 있었다.", end: "그날은 지나갔지만, 오늘 다시 꺼내 전하고 싶다. 그 저녁이 고마웠다고.", mirror: "“나는 특별한 날보다\n편하게 함께한 시간을\n그리워하고 있었네.”", current: "같이 있어도,\n각자 할 일을 하느라 바쁘다.", wish: "서두르지 않고 밥을 먹으며\n서로의 하루를 듣는 저녁.", choice: "오늘 저녁 함께 먹을 수 있을지 물어보기.", after: "“오늘은 시간이 안 맞았다.\n주말 아침에 같이 먹기로 했다.”" },
  parent: { to: "부모님께", title: "같이 밥 먹는\n평범한 날", label1: "집에 다녀온 날", note1: "돌아갈 때 반찬을 또 챙겨주셨다. 무겁다면서 다 들고 왔다.", label2: "저녁 전화", note2: "밥 먹었냐고 물으셨다. 먹었다고만 답했다.", chapter: "밥 먹었냐는 말", copy: "집에 다녀오면 손에는 반찬이 들려 있었고, 저녁 전화에는 밥 먹었냐는 말이 있었다.", end: "그때는 짧게 대답했던 말들을 오늘은 조금 더 오래 읽어본다.", mirror: "“늘 듣던 말이라\n짧게 답했는데,\n나는 그 말을 기억하네.”", current: "부모님 안부에\n용건만 짧게 답하곤 했다.", wish: "함께 밥을 먹으며\n부모님의 요즘 이야기를 듣는 날.", choice: "다음 통화에서 오늘 하루를 여쭤보기.", after: "“오늘 다녀오신 곳 이야기를 들었다.\n다음에는 함께 가보고 싶어졌다.”" },
  child: { to: "자녀에게", title: "혼자서도\n해낸 날들", label1: "자전거를 배우던 날", note1: "잡아주던 손을 놓은 줄도 모르고, 끝까지 혼자 달려갔다.", label2: "늦은 밤 숙제", note2: "모르겠다며 울다가, 결국 스스로 풀었다고 웃었다.", chapter: "손을 놓은 날", copy: "손을 놓은 줄도 모르고 달려간 날과, 울다가 웃으며 숙제를 끝낸 밤. 너는 그렇게 한 걸음씩 자라고 있었다.", end: "그날 다 하지 못한 말을, 오늘 여기에 남겨 둔다.", mirror: "“나는 걱정만 하는 줄 알았는데,\n믿어주고 싶은 마음도\n남겨두었구나.”", current: "걱정이 앞서서,\n조언부터 하곤 한다.", wish: "아이의 이야기를 끝까지 듣고,\n함께 웃는 저녁.", choice: "다음 전화에서는 오늘 어땠는지 먼저 물어보기.", after: "“오늘은 그냥 들었다.\n내가 몰랐던 하루를 조금 알게 됐다.”" },
  trip: { to: "함께한 우리에게", title: "함께 머문\n그 오후", label1: "비가 오던 여행길", note1: "비를 피해 작은 카페에 들어갔다. 한참 이야기했다.", label2: "돌아온 저녁", note2: "여행에서 그 카페가 가장 생각났다.", chapter: "계획에 없던 시간", copy: "비를 피해 들어간 작은 카페에서 우리는 한참 이야기했다. 돌아온 뒤에도 그 시간이 생각났다.", end: "함께 머물렀던 그 오후를 이 이야기에 남겨둔다.", mirror: "“나는 많이 둘러보는 것만큼,\n함께 이야기할 시간도\n소중히 여기고 있었네.”", current: "여행 계획은 빼곡했지만,\n느긋하게 머물 시간은 적었다.", wish: "서두르지 않고 앉아\n서로의 이야기를 듣는 오후.", choice: "다음 만남에는 일정을 하나 비워두기.", after: "“멀리 가지 않고\n동네 카페에서 오래 이야기했다.”" },
};

type GiftWay = "alone" | "oneline" | "together";
// 모두 가상 기록·편집 예시 — 실제 가족 기록은 쓰지 않는다
const GIFT_WAYS: { key: GiftWay; label: string; notes: { who: string; text: string }[]; page: string; status: string }[] = [
  { key: "alone", label: "혼자 완성한 선물", notes: [{ who: "내가 남긴 기억", text: "비 오는 날, 역 앞에서 우산을 들고 기다려 줬다." }],
    page: "“역 앞에서 우산을 들고 기다려 줬다.” 그날 적어 둔 한 줄이다. 그 한 줄을, 이제 당신에게 건넨다.", status: "상대가 아무것도 쓰지 않아도 완성되는 선물 · 편집은 시범" },
  { key: "oneline", label: "한 문장이 더해진 선물", notes: [{ who: "내가 남긴 기억", text: "비 오는 날, 역 앞에서 우산을 들고 기다려 줬다." }, { who: "받은 사람이 더한 한 줄", text: "그날은 비가 그칠 때까지 같이 서 있고 싶었어." }],
    page: "같은 비 오는 날을, 한 사람은 기다려 준 날로, 다른 한 사람은 같이 서 있고 싶었던 날로 남겼다. 두 문장은 쓴 사람의 이름으로 나란히 둔다.", status: "받은 사람이 원할 때만 한 줄 · 준비 중" },
  { key: "together", label: "함께 엮은 책", notes: [{ who: "한 사람의 기록 · 바닷가의 오후", text: "말이 없길래, 무슨 걱정이 있나 싶었다." }, { who: "다른 사람의 기록 · 같은 오후", text: "오늘은 말없이 바다를 보며 쉬고 싶었다." }],
    page: "같은 오후의 침묵이 한 사람에게는 걱정으로, 다른 사람에게는 쉼으로 남았다. 그 사이를 어떻게 이어 읽을지는 두 사람이 정한다.", status: "두 사람이 함께 쓰기로 고른 글만 엮어요 · 준비 중" },
];

const PEOPLE: { key: Person; label: string }[] = [
  { key: "friend", label: "친구에게" },
  { key: "self", label: "나에게" },
  { key: "partner", label: "배우자에게" },
  { key: "parent", label: "부모님께" },
  { key: "child", label: "자녀에게" },
];

/** 줄바꿈(\n)을 <br>로 */
function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return <>{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <br />}</span>)}</>;
}

export default function PurposeLanding({ ways }: { ways: React.ReactNode }) {
  const [person, setPerson] = useState<Person>("friend");
  const [purpose, setPurpose] = useState<Purpose>("occasion");
  const [giftWay, setGiftWay] = useState<GiftWay>("alone");
  const g = GIFT_WAYS.find((w) => w.key === giftWay)!;
  // 사용 계기를 직접 고른 뒤에만 그 계기를 앱으로 넘긴다(기본 선택값은 목적 선택이 아니다)
  const [purposeChosen, setPurposeChosen] = useState(false);
  const [view, setView] = useState<"home" | "example">("home");
  const c = CASES[person];
  const p = PURPOSES[purpose];
  const purposeCase = CASES[p.person];
  const heroGift = startHref("gift", "hero", purposeChosen && purpose !== "myself" ? purpose : null);
  const heroSelf = startHref("self", "hero");
  const purposeStart = purpose === "myself" ? startHref("self", "occasion", "myself") : startHref("gift", "occasion", purpose);

  const choosePurpose = (key: Purpose) => {
    setPurpose(key);
    setPurposeChosen(true);
    setPerson(PURPOSES[key].person);
  };
  const openExample = () => { setView("example"); window.scrollTo({ top: 0 }); };

  return (
    <div id="om-purpose">
      <div className="surface">
        <header>
          <button type="button" className="logo" onClick={() => setView("home")}>온순간<small>ONMOMENT</small></button>
          <button type="button" className="text" onClick={openExample}>이야기 펼쳐보기 ↗</button>
        </header>

        <main>
          <section hidden={view !== "home"}>
            <div className="hero">
              <div className="lead">
                <p className="eyebrow">내 글과 기억으로 만드는 편지와 작은 책</p>
                <h1>살아가는 이야기를,<br /><em>소중한 당신에게.</em></h1>
                <p className="intro">함께한 기억도, 미처 못한 말도.<br />온순간이 기록을 고르고 엮는 일을 도와<br /><strong>간직하고 건넬 한 편의 이야기</strong>로 만듭니다.</p>
                <p className="use-moments">생일과 기념일에 · 미처 못한 감사에 · 함께한 시간에 · 새로운 시작에</p>
                <div className="actions">
                  <a className="primary" href={heroGift}>소중한 사람에게 건네기 <span>↗</span></a>
                  <a className="secondary" href={heroSelf}>나를 위해 남기기 <span>↗</span></a>
                </div>
                <p className="quiet">새 글 한 편으로도 시작할 수 있어요.<br />무엇을 남기고 건넬지는 내가 정합니다.</p>
              </div>

              <div className="evidence">
                <p className="example-heading">누구에게 건네는 이야기일까요? 예시로 펼쳐 보세요</p>
                <div className="people" role="group" aria-label="이야기 예시 고르기">
                  {PEOPLE.map((x) => (
                    <button key={x.key} type="button" aria-pressed={person === x.key} onClick={() => setPerson(x.key)}>{x.label}</button>
                  ))}
                </div>
                <div className="notes">
                  <article><small>{c.label1}</small><p>{c.note1}</p></article>
                  <article><small>{c.label2}</small><p>{c.note2}</p></article>
                </div>
                <p className="bridge">{person === "self" ? "따로 남긴 두 순간이, 나에게 건네는 이야기로" : "따로 남긴 두 순간이, 한 사람에게 건네는 이야기로"}</p>
                <button type="button" className="spread" onClick={openExample} aria-label="선택한 이야기 예시 펼쳐보기">
                  <span className="leftpage"><small>{c.to}</small><strong><Lines text={c.title} /></strong><small>함께한 순간을 엮어</small></span>
                  <span className="rightpage"><small>{c.chapter}</small><span>{c.copy}</span><small className="page">01</small></span>
                </button>
                <button type="button" className="text booklink" onClick={openExample}>이 이야기를 펼쳐 읽어보기 →</button>
                <p className="source">경험을 설명하기 위한 가상 기록·편집 예시</p>
              </div>
            </div>

            {/* 한 사람이 시작해도 완성되는 책 · 원하는 만큼 함께(ADR-65 개정 1). 세 예시는 단계가 아니라 고를 수 있는 경험 — 모두 가상 */}
            <section className="together" aria-labelledby="together-h">
              <p className="eyebrow">소중한 사람에게 건네는 책</p>
              <h2 id="together-h">함께한 기억을,<br />소중한 사람에게 한 권의 책으로.</h2>
              <p className="intro">남겨 둔 기록이 있어도, 기억나는 장면 하나부터 시작해도 좋아요.<br />혼자 준비해 건네고, 원하면 서로의 이야기를 더해요.</p>
              <div className="people" role="group" aria-label="건네는 방식 예시 고르기">
                {GIFT_WAYS.map((w) => (
                  <button key={w.key} type="button" aria-pressed={giftWay === w.key} onClick={() => setGiftWay(w.key)}>{w.label}</button>
                ))}
              </div>
              <div className="twoviews">
                {g.notes.map((n) => <article key={n.who}><small>{n.who}</small><p>{n.text}</p></article>)}
              </div>
              <div className="woven"><small>엮인 한 쪽</small><p>{g.page}</p></div>
              <p className="status">{g.status}</p>
              <p className="source">경험을 설명하기 위한 가상 기록·편집 예시예요. 지금은 기억과 사진을 남길 수 있고, 엮는 편집은 시범, 함께 엮기는 준비하고 있어요.</p>
            </section>

            <section className="purpose-section">
              <p className="eyebrow">지금 떠오르는 마음이 있나요?</p>
              <div className="purpose-tabs" role="group" aria-label="시작하는 마음">
                {(Object.keys(PURPOSES) as Purpose[]).map((k) => (
                  <button key={k} type="button" aria-pressed={purpose === k} onClick={() => choosePurpose(k)}>{PURPOSES[k].label}</button>
                ))}
              </div>
              <div className="purpose-preview" aria-live="polite">
                <div>
                  <p className="eyebrow">{p.context}</p>
                  <h2><Lines text={p.title} /></h2>
                  <p className="intro">{p.desc}</p>
                  <a className="primary" href={purposeStart}>{p.cta} →</a>
                </div>
                <article className="purpose-paper">
                  <small>{purposeCase.to}</small>
                  <h3>{purposeCase.title.replace("\n", " ")}</h3>
                  <p>{purposeCase.copy}</p>
                  <button type="button" className="text" onClick={() => { setPerson(p.person); openExample(); }}>이 이야기 펼쳐보기 →</button>
                  <small>가상 기록과 편집 예시</small>
                </article>
              </div>
            </section>

            <section className="easy">
              <div>
                <p className="eyebrow">마음은 내가. 엮는 수고는 온순간과.</p>
                <h2>빈 페이지 앞에서<br />오래 고민하지 않도록.</h2>
                <p className="intro">구성과 제목을 처음부터 정하지 않아도 돼요.<br />남긴 글은 바로 책의 한 쪽으로 펼쳐 보고, 바꾸고 싶은 곳을 고칩니다.</p>
                <button type="button" className="text" onClick={openExample}>기록이 어떻게 엮이는지 보기 →</button>
              </div>
              <div className="easy-steps">
                <article><span>01</span><div><h3>내가 할 일 — 이야기 가져오기</h3><p>새 편지를 쓰거나, 남겨둔 기록을 골라요.<br />기록이 없다면 지금 떠오른 기억부터.</p></div></article>
                <article><span>02</span><div><h3>온순간이 도울 일 — 한 편으로 엮기</h3><p>고른 기록을 책의 쪽으로 바로 놓아 보여드려요.<br />기록에서 이야기를 찾아 장면·순서·제목을 엮는 편집 초안은 시범으로 만들고 있어요. 원문과 편집 글은 나눠서 보여드려요.</p></div></article>
                <article><span>03</span><div><h3>내가 정할 일 — 확인하고 간직하기</h3><p>원문을 확인하고, 내 뜻에 맞게 고쳐요.<br />혼자 간직할지, 누구에게 건넬지도 내가 정합니다.</p></div></article>
              </div>
            </section>

            <section className="forms">
              <p className="eyebrow">마음에 맞는 모습으로</p>
              <h2>편지로 건네고.<br />작은 책으로 곁에 두고.</h2>
              <div className="formrow">
                <article><span className="formmark">한 통의 편지</span><p>오늘 새로 쓴 긴 글도<br />그대로 한 편이 됩니다.</p></article>
                <article><span className="formmark">디지털 책</span><p>고른 이야기들을 엮어<br />파일로 간직하고 건네요.</p></article>
                <article><span className="formmark">종이책</span><p>오래 곁에 두고 싶은 이야기를<br />책장에 꽂아두는 모습.</p></article>
              </div>
              <p className="source">지금은 앱에서 기록을 책의 쪽으로 보고 파일로 간직할 수 있어요. 종이책 인쇄와 가격은 준비 중입니다.</p>
            </section>

            <section className="discovery">
              <div className="discovery-copy">
                <p className="eyebrow">이야기를 엮다 보면</p>
                <h2>전할 말을 고르다가,<br />내 마음도 알게 됩니다.</h2>
                <p className="intro">무엇을 오래 기억하고 있었는지.<br />어떤 순간에 마음이 움직였는지.<br />흩어져 있던 기록을 함께 읽으며 돌아봅니다.</p>
              </div>
              <article className="mirror">
                <small>두 순간을 함께 읽고, 내가 덧붙인 말 · 가상 예시</small>
                <p><Lines text={c.mirror} /></p>
                <span>온순간은 장면을 비추고, 의미는 내가 찾습니다.</span>
              </article>
            </section>

            <section className="deeper">
              <p className="eyebrow">그 마음으로, 조금 살아보기</p>
              <h2>간직하고 싶은 마음이,<br />살아보고 싶은 장면으로.</h2>
              <p className="intro">이야기에서 발견한 마음을 오늘의 작은 선택으로.<br />원할 때, 내가 해볼 수 있는 만큼만 이어갑니다.</p>
              <div className="moments">
                <article><small>지금의 나</small><p><Lines text={c.current} /></p></article>
                <article><small>바라는 한 장면</small><p><Lines text={c.wish} /></p></article>
                <article><small>내가 고른 작은 일</small><p><Lines text={c.choice} /></p></article>
              </div>
              <div className="after">
                <span>다녀온 뒤, 다시 남긴 한 순간</span>
                <p><Lines text={c.after} /></p>
                <small>계획과 달라도, 그때의 마음이 다음 이야기가 됩니다.</small>
              </div>
              <p className="source">선택한 예시에 이어지는 가상 사용 장면입니다. 실제 사용자의 변화나 후기가 아닙니다.</p>
            </section>

            <section className="self">
              <div>
                <p className="eyebrow">나에게 남기는 이야기도</p>
                <h2>애쓴 하루를 알아주고,<br />새로 해보고 싶은 일을 품고.</h2>
              </div>
              <div>
                <p>선물할 사람이 떠오르지 않아도 괜찮아요.<br />쉬고 싶은 마음, 새로운 도전,<br />잊고 싶지 않은 여행의 한 장면.<br />내 이야기로 시작할 수 있습니다.</p>
                <a className="text" href={startHref("self", "closing")}>지금의 나에게 한마디 남기기 →</a>
              </div>
            </section>

            <section className="closing">
              <p className="eyebrow">한 편의 이야기에서, 내가 살아갈 시간으로</p>
              <h2>나를 알아가고,<br />내 뜻으로 살아보고,<br />소중한 사람에게 건네는 곳.</h2>
              <p className="closing-copy">온순간은 그 시작을 함께합니다.</p>
              <div className="actions">
                <a className="primary" href={startHref("gift", "closing")}>소중한 사람에게 건네기 ↗</a>
                <a className="secondary" href={startHref("self", "closing")}>나를 위해 남기기 ↗</a>
              </div>
              <p className="quiet">한마디도, 긴 편지도. 내 속도로, 내 뜻대로.</p>
            </section>

            {ways}

            <aside className="explore" aria-label="온순간의 이야기">
              <p className="eyebrow">온순간을 조금 더 알고 싶다면</p>
              <p className="explore-copy">남기고, 발견하고, 고르고, 살아보고, 건네기까지.<br />한 문장이 내 이야기가 되는 길을 천천히 펼쳐 두었어요.</p>
              <a className="text" href="/story/">온순간의 이야기 읽기 →</a>
            </aside>
          </section>

          <section className="workspace" hidden={view !== "example"}>
            <button type="button" className="text" onClick={() => setView("home")}>← 첫 화면</button>
            <p className="eyebrow">{c.to} 건네는 이야기</p>
            <h2>{c.title.replace("\n", " ")}</h2>
            <article className="reading">
              <small>{c.chapter}</small>
              <p>{c.copy + (c.end ? "\n\n" + c.end : "")}</p>
              <footer>{c.to}</footer>
            </article>
            <details className="source-check">
              <summary>이 이야기의 바탕이 된 기록 보기</summary>
              <p>{c.note1}</p>
              <p>{c.note2}</p>
              <small>기록을 그대로 옮길 수도, 흐름을 엮을 수도 있습니다. 연결한 문장과 제목은 내가 확인하고 고칩니다.</small>
            </details>
            <p className="quiet">가상 기록 두 개로 구성한 편집 예시입니다. 이렇게 엮는 편집 초안은 시범으로 만들고 있어요.</p>
            <div className="actions">
              <a className="primary" href={startHref("gift", "example")}>내 마음으로 시작하기 ↗</a>
              <a className="secondary" href={startHref("self", "example")}>나에게 남기기</a>
            </div>
          </section>
        </main>

        <footer className="bottom">내 마음에서 시작해, 우리의 이야기로.<span>온순간</span></footer>
      </div>
    </div>
  );
}
