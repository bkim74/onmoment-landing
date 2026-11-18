"use client";

import { useEffect, useRef, useState } from "react";

// 비교 체험(cmp-2026-11-15) — 링크를 받은 사람만. 화면 A(지금의 홈 · 개인 기록) · 화면 B(이야기 선물)를 정해진 순서로 본다.
//   순서는 참여자마다 정하고(A→B 또는 B→A) 새로고침 · 재접속에도 그대로. 화면 이름은 A/B 로만(평가 방향을 암시하지 않는다).
//   서비스 이해는 자유응답 — 답 예시나 핵심 가치를 먼저 보여 주지 않는다. 한 번에 한 질문 · 건너뛰기 가능.
//   단계마다 앱에 저장(같은 단계는 고쳐 쓴다). 저장이 확인된 뒤에만 다음으로 간다.
const VERSION = "cmp-2026-11-15";
const KEY = "om:cmp:state";
const SEGMENTS = ["existing", "existing_event", "new", "mentor", "other"];
const SCREEN_URL: Record<"A" | "B", string> = { A: "/", B: "/gift/" }; // A = 지금의 홈(개인 기록) · B = 이야기 선물

type Answers = Record<string, string | string[] | null>;
type State = { participant: string; order: "AB" | "BA"; segment: string; step: string; answers: Answers; startedAt: number; saved: string[]; tried: boolean };

function appOrigin(): string {
  const prod = "https://app.onmoment.kr";
  if (typeof location === "undefined" || !(location.hostname.endsWith(".vercel.app") || location.hostname === "localhost")) return prod;
  try { const o = new URLSearchParams(location.search).get("app") || sessionStorage.getItem("om:app-origin"); if (o) sessionStorage.setItem("om:app-origin", o); if (o && (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) || /^http:\/\/localhost:\d+$/.test(o))) return o; } catch { /* 그대로 */ }
  return prod;
}
const newCode = () => { const a = new Uint8Array(16); crypto.getRandomValues(a); const c = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"; return Array.from(a, (x) => c[x % c.length]).join(""); };
const load = (): State | null => { try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as State) : null; } catch { return null; } };
const keep = (s: State) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* 저장 불가 — 이 화면 동안은 그대로 */ } };
const b64url = (s: string) => btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const OCC = [["yes", "있어요"], ["planned", "날짜는 미정이지만 계획 있어요"], ["no", "없어요"]];
const ROLES = [["pay", "비용 결정 · 결제"], ["coordinate", "참여 요청 · 준비 조율"], ["contribute", "글 · 사진 전달"], ["undecided", "아직 정해지지 않았어요"]];
const PREFER = [["A", "화면 A"], ["B", "화면 B"], ["both", "둘 다"], ["neither", "둘 다 아님"], ["cant_judge", "판단하기 어려워요"]];
const BARRIER = [["need", "필요성"], ["price", "가격"], ["recruit", "참여자 모으기"], ["writing", "글쓰기 수고"], ["quality", "결과물 품질"], ["deadline", "납기"], ["privacy", "공개 범위"], ["none", "특별히 없어요"], ["cant_judge", "판단하기 어려워요"], ["other", "기타"]];


// ── 작은 부품 — 화면 바깥에 두어(매번 새로 만들지 않아) 글을 칠 때 입력이 끊기지 않는다 ─────────────
function Q({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return <section className="cmp-q"><h1>{title}</h1>{hint && <p className="cmp-fine">{hint}</p>}{children}</section>;
}
function ChoiceRow({ value, opts, multi = false, onChange }: { value: string | string[] | null | undefined; opts: string[][]; multi?: boolean; onChange: (v: string | string[]) => void }) {
  return (
    <div className="cmp-choices">
      {opts.map(([v, label]) => {
        const on = multi ? ((value as string[] | null) ?? []).includes(v) : value === v;
        return <button key={v} type="button" data-v={v} aria-pressed={on} className={on ? "on" : ""} onClick={() => {
          if (!multi) return onChange(v);
          const cur = new Set((value as string[] | null) ?? []); if (cur.has(v)) cur.delete(v); else cur.add(v); onChange([...cur]);
        }}>{label}</button>;
      })}
    </div>
  );
}
function TextBox({ name, value, onChange, rows = 3, ph, line = false, max = 500 }: { name: string; value: string; onChange: (v: string) => void; rows?: number; ph?: string; line?: boolean; max?: number }) {
  return line
    ? <input data-q={name} maxLength={max} placeholder={ph ?? ""} value={value} onChange={(e) => onChange(e.target.value)} />
    : <textarea data-q={name} rows={rows} maxLength={max} placeholder={ph ?? ""} value={value} onChange={(e) => onChange(e.target.value)} />;
}
function NavRow({ onNext, label = "다음", skip = true, busy, failed }: { onNext: () => void; label?: string; skip?: boolean; busy: boolean; failed: boolean }) {
  return (
    <div className="cmp-nav">
      <button type="button" data-next className="cmp-primary" disabled={busy} onClick={onNext}>{busy ? "저장하는 중…" : label}</button>
      {skip && <button type="button" data-skip className="cmp-skip" disabled={busy} onClick={onNext}>건너뛰기</button>}
      {failed && <p role="alert" className="cmp-alert">저장하지 못했어요. 쓴 답은 그대로 있어요. 잠시 뒤 다시 눌러 주세요.</p>}
    </div>
  );
}
function ScreenView({ label, onSeen }: { label: "A" | "B"; onSeen: () => void }) {
  return (
    <section className="cmp-view" data-view={label}>
      <p className="cmp-eyebrow">화면 {label}</p>
      <p className="cmp-fine">화면 안에서 자유롭게 둘러보세요. 다 보셨으면 아래 버튼을 눌러 주세요.</p>
      <iframe title={`화면 ${label}`} src={SCREEN_URL[label]} className="cmp-frame" />
      <button type="button" data-seen className="cmp-primary" onClick={onSeen}>다 봤어요</button>
    </section>
  );
}

export default function CompareClient() {
  const [s, setS] = useState<State | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const viewStart = useRef<number>(0);
  const app = useRef("https://app.onmoment.kr");

  useEffect(() => {
    app.current = appOrigin();
    const q = new URLSearchParams(location.search);
    let st = load();
    if (!st) {
      const seg = q.get("s");
      st = { participant: newCode(), order: Math.random() < 0.5 ? "AB" : "BA", segment: seg && SEGMENTS.includes(seg) ? seg : "other", step: "intro", answers: {}, startedAt: Date.now(), saved: [], tried: false };
      keep(st);
    }
    // 써 보고 돌아온 사람 — 실제로 저장했는지 앱에 물어(예/아니오만) 작성 후 질문을 줄지 정한다
    if (q.get("resume") === "1" && st.tried && !st.saved.includes("end")) {
      const base = st;
      fetch(`${app.current}/api/feedback/compare/progress?p=${base.participant}`).then((r) => r.json()).then((j: { wrote?: boolean }) => {
        const next = { ...base, step: j.wrote && !base.saved.includes("wrote") ? "wrote" : "end" }; keep(next); setS(next);
      }).catch(() => { const next = { ...base, step: "end" }; keep(next); setS(next); });
      return;
    }
    setS(st);
  }, []);

  if (!s) return <main className="cmp"><p className="cmp-fine">불러오는 중…</p></main>;
  const first: "A" | "B" = s.order === "AB" ? "A" : "B";
  const second: "A" | "B" = s.order === "AB" ? "B" : "A";
  const A = s.answers;
  const put = (n: State) => { keep(n); setS(n); };
  const ans = (k: string) => (v: string | string[]) => put({ ...s, answers: { ...A, [k]: v } });
  const str = (k: string) => (A[k] as string) ?? "";
  const go = (step: string) => { if (step === "first_view" || step === "second_view") viewStart.current = Date.now(); put({ ...s, step }); window.scrollTo({ top: 0 }); };
  const busy = status === "saving", failed = status === "error";

  async function save(stage: string, answers: Answers, nextStep: string, ms?: number) {
    setStatus("saving");
    try {
      const r = await fetch(`${app.current}/api/feedback/compare`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: VERSION, participant: s!.participant, stage, order: s!.order, segment: s!.segment, ms, answers }) });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("idle");
      put({ ...s!, step: nextStep, saved: [...new Set([...s!.saved, stage])] }); window.scrollTo({ top: 0 });
    } catch { setStatus("error"); }
  }
  const occ = A.occasion as string | null;
  const hasOcc = occ === "yes" || occ === "planned";
  const startHref = `${app.current}/start?src=compare&next=${encodeURIComponent(`/prepare?cmp=${s.participant}&bk=${b64url(`${location.origin}/compare/`)}`)}`;
  const ms = (k: string) => { const v = Number(A[k]); return Number.isFinite(v) && v > 0 ? v : undefined; };
  const seen = (stage: "first" | "second") => () => { put({ ...s, step: `${stage}_understood`, answers: { ...A, [`${stage}_ms`]: String(Date.now() - viewStart.current) } }); window.scrollTo({ top: 0 }); };

  return (
    <main className="cmp" data-step={s.step} data-order={s.order}>
      <p className="cmp-brand"><span className="om-mark" aria-hidden="true"></span> 온순간 · 화면 비교</p>
      {s.step === "intro" && (
        <section className="cmp-q" data-intro>
          <h1>두 가지 첫 화면을 보고, 생각을 들려주세요.</h1>
          <p>좋았던 점과 불편했던 점 모두 도움이 됩니다. 응답은 서비스 개선과 사업 검증 자료에 요약해 사용합니다. 응답 여부와 내용은 이벤트 선정에 영향을 주지 않습니다. 실명이나 개인 기록의 구체적인 내용은 적지 않아도 됩니다.</p>
          <p className="cmp-fine">짧은 질문 몇 개와 화면 두 개를 차례로 봐요. 어떤 질문이든 건너뛸 수 있어요. 계정이 없어도 돼요.</p>
          <div className="cmp-nav"><button type="button" data-next className="cmp-primary" onClick={() => go("occasion")}>시작하기</button></div>
        </section>
      )}
      {s.step === "occasion" && (
        <Q title="앞으로 3개월 안에 직접 선물을 준비해야 하는 행사가 있나요?">
          <ChoiceRow value={A.occasion} opts={OCC} onChange={ans("occasion")} />
          <NavRow busy={busy} failed={failed} onNext={() => go(hasOcc ? "occasion_detail" : "current_way")} />
        </Q>
      )}
      {s.step === "occasion_detail" && (
        <Q title="어떤 행사인가요?" hint="행사 종류와 대략적인 시기만 적어 주세요. 이름은 적지 않아도 돼요.">
          <TextBox line name="occasion_kind" max={60} ph="예: 아버지 칠순, 팀장님 은퇴" value={str("occasion_kind")} onChange={ans("occasion_kind")} />
          {occ === "yes" && <TextBox line name="occasion_when" max={40} ph="대략적인 시기(예: 내년 3월)" value={str("occasion_when")} onChange={ans("occasion_when")} />}
          <NavRow busy={busy} failed={failed} onNext={() => go("roles")} />
        </Q>
      )}
      {s.step === "roles" && (
        <Q title="그 준비에서 본인이 맡을 일은 무엇인가요?" hint="여러 개 골라도 돼요.">
          <ChoiceRow value={A.roles} opts={ROLES} multi onChange={ans("roles")} />
          <NavRow busy={busy} failed={failed} onNext={() => go("current_way")} />
        </Q>
      )}
      {s.step === "current_way" && (
        <Q title="지금은 그 선물을 어떻게 준비하고 계신가요?" hint="짧게 적어 주세요. 아직 정하지 않았다고 적어도 돼요.">
          <TextBox name="current_way" max={300} value={str("current_way")} onChange={ans("current_way")} />
          <NavRow busy={busy} failed={failed} onNext={() => save("pre", { occasion: A.occasion, occasion_kind: A.occasion_kind, occasion_when: A.occasion_when, roles: A.roles, current_way: A.current_way }, "first_view")} />
        </Q>
      )}
      {s.step === "first_view" && <ScreenView label={first} onSeen={seen("first")} />}
      {s.step === "first_understood" && (
        <Q title={`화면 ${first}에서, 온순간은 무엇을 할 수 있는 서비스라고 이해하셨나요?`}>
          <TextBox name="first_understood" rows={4} value={str("first_understood")} onChange={ans("first_understood")} />
          <NavRow busy={busy} failed={failed} onNext={() => go("first_check")} />
        </Q>
      )}
      {s.step === "first_check" && (
        <Q title={`화면 ${first}를 보고, 더 확인해야겠다고 느낀 것이 있나요?`} hint="없거나 모르겠으면 그렇게 적어도 돼요.">
          <TextBox name="first_check" max={300} value={str("first_check")} onChange={ans("first_check")} />
          <NavRow busy={busy} failed={failed} onNext={() => save("first", { understood: A.first_understood, to_check: A.first_check }, "second_view", ms("first_ms"))} />
        </Q>
      )}
      {s.step === "second_view" && <ScreenView label={second} onSeen={seen("second")} />}
      {s.step === "second_understood" && (
        <Q title={`화면 ${second}에서, 온순간은 무엇을 할 수 있는 서비스라고 이해하셨나요?`}>
          <TextBox name="second_understood" rows={4} value={str("second_understood")} onChange={ans("second_understood")} />
          <NavRow busy={busy} failed={failed} onNext={() => go("second_check")} />
        </Q>
      )}
      {s.step === "second_check" && (
        <Q title={`화면 ${second}를 보고, 더 확인해야겠다고 느낀 것이 있나요?`} hint="없거나 모르겠으면 그렇게 적어도 돼요.">
          <TextBox name="second_check" max={300} value={str("second_check")} onChange={ans("second_check")} />
          <NavRow busy={busy} failed={failed} onNext={() => save("second", { understood: A.second_understood, to_check: A.second_check }, "prefer", ms("second_ms"))} />
        </Q>
      )}
      {s.step === "prefer" && (
        <Q title="본인의 상황에서 이용을 검토할 만한 소개는 어느 쪽인가요?">
          <ChoiceRow value={A.prefer} opts={PREFER} onChange={ans("prefer")} />
          <TextBox line name="prefer_why" max={200} ph="이유 한 줄(선택)" value={str("prefer_why")} onChange={ans("prefer_why")} />
          <NavRow busy={busy} failed={failed} onNext={() => save("prefer", { prefer: A.prefer, prefer_why: A.prefer_why }, "try")} />
        </Q>
      )}
      {s.step === "try" && (
        <section className="cmp-q" data-try>
          <h1>이 페이지를 이용해 본인의 선물 준비를 시작해보세요.</h1>
          <p className="cmp-fine">원하실 때만이에요. 써 본 뒤 화면 위쪽의 &lsquo;비교 체험으로 돌아가 마저 답하기&rsquo;를 누르면 이어서 답할 수 있어요.</p>
          <div className="cmp-nav">
            <a data-try-start className="cmp-primary" href={startHref} onClick={() => keep({ ...s, tried: true })}>써 보기</a>
            <button type="button" data-try-skip className="cmp-skip" onClick={() => go("end")}>써 보지 않고 마치기</button>
          </div>
        </section>
      )}
      {s.step === "wrote" && (
        <Q title="이번 작성 과정에서 도움이 된 점이나 불편했던 점은 무엇인가요?" hint="별다른 도움이 없었다면 그렇게 적어도 돼요.">
          <TextBox name="write_help" rows={4} max={400} value={str("write_help")} onChange={ans("write_help")} />
          <NavRow busy={busy} failed={failed} onNext={() => save("wrote", { write_help: A.write_help }, "end")} />
        </Q>
      )}
      {s.step === "end" && (
        <Q title="지금 이 방식으로 선물 준비를 이어가는 데 가장 걸리는 점은 무엇인가요?">
          <ChoiceRow value={A.barrier} opts={BARRIER} onChange={ans("barrier")} />
          {A.barrier === "other" && <TextBox line name="barrier_other" max={120} ph="짧게 적어 주세요" value={str("barrier_other")} onChange={ans("barrier_other")} />}
          <NavRow busy={busy} failed={failed} label="마치기" onNext={() => save("end", { barrier: A.barrier, barrier_other: A.barrier_other }, "done")} />
        </Q>
      )}
      {s.step === "done" && (
        <section className="cmp-q" data-done>
          <h1>들려주셔서 고마워요.</h1>
          <p>답은 잘 저장됐어요. 실제로 선물 준비를 시작하고 싶으시면 아래에서 이어 갈 수 있어요. 원하실 때만이에요.</p>
          <a className="cmp-skip" href={startHref}>선물 준비 시작하기 →</a>
        </section>
      )}
    </main>
  );
}
