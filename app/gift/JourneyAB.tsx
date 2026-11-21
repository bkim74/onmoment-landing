"use client";

import { useEffect, useState } from "react";
import type { JourneyAB as J, Scene, Variant } from "@/lib/landing/journeyAB";
import s from "./journeyAB.module.css";

// 여정 A/B 랜딩 한 장. A = 완성된 순간 먼저(결과물 → 만드는 길 → 두 장 → 상담) · B = 내 장면 먼저(가상 장면 고르기 → 두 장 → 결과물 → 상담).
//   랜딩에서는 개인 문장을 받지 않는다 — 내 이야기는 앱에서 한 번만 쓴다(00_PLAN §7). 상담 신청만 app 의 /api/gift-inquiry 로.
const PROD_APP = "https://app.onmoment.kr";
function appOrigin(): string {
  if (typeof location === "undefined" || !location.hostname.endsWith(".vercel.app")) return PROD_APP;
  let o: string | null = null;
  try {
    o = new URLSearchParams(location.search).get("app") || sessionStorage.getItem("om:app-origin");
    if (o) sessionStorage.setItem("om:app-origin", o);
  } catch { /* 저장 불가 */ }
  return o && /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : PROD_APP;
}
const startHref = (app: string, j: string, o: string) => {
  const q = new URLSearchParams({ j });
  if (o && o !== "other") q.set("o", o);
  return `${app}/start?src=journey-${j}&next=${encodeURIComponent(`/prepare?${q.toString()}`)}`;
};

export default function JourneyAB({ journey: j, variant }: { journey: J; variant: Variant }) {
  const [app, setApp] = useState(PROD_APP);
  const [moment, setMoment] = useState(j.moments[0].id);
  const [scene, setScene] = useState<number | null>(variant === "a" ? 0 : null);
  useEffect(() => setApp(appOrigin()), []);
  const start = startHref(app, j.key, moment);

  const portrait = (
    <figure className={s.portrait}>
      <img src={j.portrait.src} alt={j.portrait.alt} width={1536} height={1024} />
      <figcaption>가상 예시</figcaption>
    </figure>
  );

  return (
    <main className={s.page} data-journey-ab={j.key} data-variant={variant}>
      <header className={s.top}>
        <a href="/" className={s.brand}>온순간</a>
        <span className={s.tag}>{j.label}</span>
      </header>

      {variant === "a" ? (
        <>
          <section className={s.hero}>
            <p className={s.eyebrow}>{j.tag}</p>
            <h1 className={s.title}>{j.a.headline[0]}<br />{j.a.headline[1]}</h1>
            <p className={s.lead}>{j.a.lead}</p>
            {portrait}
            <Outcomes j={j} />
            <Actions start={start} />
          </section>
          <Steps />
          <section className={s.block}>
            <h2 className={s.h2}>이런 장면이, 두 장으로 남아요</h2>
            <TwoCards j={j} scene={j.b.scenes[0]} />
          </section>
        </>
      ) : (
        <>
          <section className={s.hero}>
            <p className={s.eyebrow}>{j.tag}</p>
            <h1 className={s.title}>{j.b.question}</h1>
            <p className={s.guide}>가족이 남긴 장면 예시예요. 하나를 골라 보세요.</p>
            <div className={s.scenes} role="radiogroup" aria-label="장면 예시">
              {j.b.scenes.map((sc, i) => (
                <button key={i} type="button" role="radio" aria-checked={scene === i} className={s.scene} data-on={scene === i || undefined} onClick={() => setScene(i)}>
                  <span className={s.who}>{sc.who}</span>
                  <span className={s.words}>{sc.text}</span>
                </button>
              ))}
            </div>
            {scene !== null && (
              <div className={s.reveal} aria-live="polite">
                <p className={s.guide}>이 장면이 이렇게 남아요.</p>
                <TwoCards j={j} scene={j.b.scenes[scene]} />
              </div>
            )}
            <Actions start={start} primary="내 이야기로 시작하기" />
          </section>
          <section className={s.block}>
            <h2 className={s.h2}>모인 장면으로 만드는 것</h2>
            {portrait}
            <Outcomes j={j} />
          </section>
          <Steps />
        </>
      )}

      <Inquiry j={j} variant={variant} app={app} moment={moment} setMoment={setMoment} />

      <footer className={s.foot}>
        <p>이야기 초상과 나눔 키트는 상담으로 함께 정하는 시범 제작이에요. 그림과 장면은 가상 예시예요.</p>
        <p><a href="/privacy/">개인정보 처리방침</a> · <a href="/terms/">이용약관</a> · <a href={`/gift/${j.key}/`}>이 여정 더 보기</a></p>
      </footer>
    </main>
  );
}

function Outcomes({ j }: { j: J }) {
  return (
    <ul className={s.outcomes}>
      {j.outcomes.map((o) => (
        <li key={o.name}><strong>{o.name}</strong><span>{o.desc}</span></li>
      ))}
      <li className={s.mine}><span>{j.mine}</span></li>
    </ul>
  );
}

function Actions({ start, primary = "한 장면으로 시작하기" }: { start: string; primary?: string }) {
  return (
    <div className={s.actions}>
      <a className={s.ink} href={start}>{primary}</a>
      <a className={s.quiet} href="#inquiry">초상 · 키트 상담 받기</a>
    </div>
  );
}

function Steps() {
  const steps = [
    ["장면을 남겨요", "글이나 말로, 한 장면이면 충분해요. 있는 그대로 담습니다."],
    ["내 말에서 골라요", "그림에 담을 것과 건넬 한 문장을 내가 정합니다."],
    ["간직하거나 건네요", "건넨 장면과 나에게 남은 장면, 두 장이 함께 이야기로 남습니다."],
  ];
  return (
    <section className={s.block}>
      <h2 className={s.h2}>이렇게 만들어져요</h2>
      <ol className={s.steps}>
        {steps.map(([t, d], i) => (
          <li key={t}><span className={s.num}>{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>
        ))}
      </ol>
    </section>
  );
}

function TwoCards({ j, scene }: { j: J; scene: Scene }) {
  return (
    <div className={s.cards} data-one={!j.cards.gone || undefined}>
      {j.cards.gone && (
        <div className={s.card}>
          <p className={s.cardLabel}>{j.cards.gone}</p>
          <p className={s.words}>{scene.send}</p>
        </div>
      )}
      <div className={s.card}>
        <p className={s.cardLabel}>{j.cards.kept}</p>
        <p className={s.words}>{scene.text}</p>
        <p className={s.meta}>{scene.who} · 가상 예시</p>
      </div>
    </div>
  );
}

type State = "idle" | "sending" | "done" | "error";
const INTEREST: [string, string][] = [["portrait", "이야기 초상"], ["book", "책"], ["card", "카드"], ["kit", "나눔 키트"], ["unsure", "함께 정하고 싶어요"]];
const FAMILY: [string, string][] = [["solo", "혼자"], ["2-3", "2~3명"], ["4-6", "4~6명"], ["7+", "7명 이상"]];
const KIT_QTY: [string, string][] = [["none", "필요 없어요"], ["1-30", "30개까지"], ["31-80", "31~80개"], ["81-150", "81~150개"], ["151+", "151개 이상"]];

function Inquiry({ j, variant, app, moment, setMoment }: { j: J; variant: Variant; app: string; moment: string; setMoment: (m: string) => void }) {
  const [state, setState] = useState<State>("idle");
  const [interest, setInterest] = useState("portrait");
  const [family, setFamily] = useState(j.group ? "4-6" : "solo");
  const [kitQty, setKitQty] = useState(j.kit ? "31-80" : "none");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch(`${app}/api/gift-inquiry`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: f.get("email"), journey: j.key, variant, occasion: moment, when: f.get("when"),
          interest, familySize: j.group ? family : undefined, kitQty: j.kit ? kitQty : undefined,
          note: f.get("note"), consent: f.get("consent") === "on", website: f.get("website"),
        }),
      });
      setState(r.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <section id="inquiry" className={s.block}>
        <h2 className={s.h2}>신청을 받았어요</h2>
        <p className={s.guide}>적어 주신 이메일로 구성과 일정을 안내해 드릴게요.</p>
      </section>
    );
  }
  return (
    <section id="inquiry" className={s.block}>
      <h2 className={s.h2}>초상 · 키트 상담 받기</h2>
      <p className={s.guide}>어떤 날인지 알려 주시면, 이메일로 구성과 일정을 안내해 드려요.</p>
      <form className={s.form} onSubmit={submit}>
        <label className={s.field}>
          <span>어떤 날인가요</span>
          <select value={moment} onChange={(e) => setMoment(e.target.value)}>
            {j.moments.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </label>
        <label className={s.field}>
          <span>언제쯤인가요</span>
          <input name="when" maxLength={40} placeholder="예: 3월 둘째 주" />
        </label>
        <Chips label="관심 있는 것" options={INTEREST} value={interest} set={setInterest} />
        {j.group && <Chips label="함께 쓰는 사람" options={FAMILY} value={family} set={setFamily} />}
        {j.kit && <Chips label="답례 수량" options={KIT_QTY} value={kitQty} set={setKitQty} />}
        <label className={s.field}>
          <span>이메일</span>
          <input name="email" type="email" required maxLength={320} autoComplete="email" inputMode="email" />
        </label>
        <label className={s.field}>
          <span>남길 말 (선택)</span>
          <textarea name="note" maxLength={500} rows={3} />
        </label>
        <input className={s.hp} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label className={s.consent}>
          <input type="checkbox" name="consent" required />
          <span>상담 연락을 위해 이메일과 적은 내용을 저장하는 데 동의해요. <a href="/privacy/">처리방침</a></span>
        </label>
        <button className={s.ink} type="submit" disabled={state === "sending"}>{state === "sending" ? "보내는 중" : "상담 신청하기"}</button>
        {state === "error" && <p className={s.err} role="alert">잠시 연결이 어려워요. 조금 뒤 다시 보내 주세요.</p>}
      </form>
    </section>
  );
}

function Chips({ label, options, value, set }: { label: string; options: [string, string][]; value: string; set: (v: string) => void }) {
  return (
    <fieldset className={s.chips}>
      <legend>{label}</legend>
      <div>
        {options.map(([v, t]) => (
          <button key={v} type="button" aria-pressed={value === v} data-on={value === v || undefined} onClick={() => set(v)}>{t}</button>
        ))}
      </div>
    </fieldset>
  );
}
