"use client";

import { useState } from "react";

// 이야기 선물 시범 제작 상담 신청 — 앱 /api/gift-inquiry 로 보낸다.
// 시범 화면(*.vercel.app)에서는 ?app= 으로 정한 앱 주소(app-origin.js 와 같은 저장값)로 보낸다.
const PROD_APP = "https://app.onmoment.kr";

function apiUrl() {
  const fixed = process.env.NEXT_PUBLIC_GIFT_API_URL;
  if (fixed) return fixed;
  if (typeof window !== "undefined" && location.hostname.endsWith(".vercel.app")) {
    try {
      const o = new URLSearchParams(location.search).get("app") || sessionStorage.getItem("om:app-origin");
      if (o && /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o)) return `${o}/api/gift-inquiry`;
    } catch {}
  }
  return `${PROD_APP}/api/gift-inquiry`;
}

type Opt = { v: string; label: string };
const RECIPIENT: Opt[] = [
  { v: "father", label: "아버지" },
  { v: "mother", label: "어머니" },
  { v: "both", label: "두 분" },
  { v: "other", label: "그 밖의 분" },
];
const OCCASION: Opt[] = [
  { v: "70th", label: "칠순" },
  { v: "60th", label: "환갑" },
  { v: "80th", label: "팔순" },
  { v: "other", label: "다른 날" },
];
const FAMILY: Opt[] = [
  { v: "solo", label: "혼자" },
  { v: "2-3", label: "2~3명" },
  { v: "4-6", label: "4~6명" },
  { v: "7+", label: "7명 이상" },
];

function Choices({ name, legend, opts, value, onChange }: { name: string; legend: string; opts: Opt[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="gift-field">
      <legend>{legend}</legend>
      <div className="gift-choices" role="radiogroup">
        {opts.map((o) => (
          <label key={o.v} className={value === o.v ? "on" : ""}>
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(o.v)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function GiftInquiryForm() {
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [when, setWhen] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [missing, setMissing] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const need = !recipient
      ? "누구의 날인지 골라 주세요."
      : !occasion
        ? "어떤 날인지 골라 주세요."
        : !familySize
          ? "함께 쓰실 가족 수를 골라 주세요."
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
            ? "연락받을 메일을 적어 주세요."
            : !consent
              ? "안내를 위한 동의에 표시해 주세요."
              : "";
    if (need) {
      setMissing(need);
      return;
    }
    setMissing("");
    setStatus("sending");
    try {
      const res = await fetch(apiUrl(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recipient, occasion, familySize, when: when.trim(), email: email.trim(), note: note.trim(), consent, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="gift-done" role="status" data-gift-done>
        <span aria-hidden="true">✳︎</span>
        <p className="gift-done-title">신청을 받았어요.</p>
        <p>적어 주신 메일로 상담 안내를 보내 드릴게요.<br />그날을 함께 준비해요.</p>
      </div>
    );
  }

  return (
    <form className="gift-form" onSubmit={submit} noValidate data-gift-form>
      <Choices name="recipient" legend="누구의 날인가요" opts={RECIPIENT} value={recipient} onChange={setRecipient} />
      <Choices name="occasion" legend="어떤 날인가요" opts={OCCASION} value={occasion} onChange={setOccasion} />
      <label className="gift-field">
        <span className="gift-label">그날은 언제쯤인가요 <small>선택</small></span>
        <input type="text" value={when} maxLength={40} onChange={(e) => setWhen(e.target.value)} placeholder="예: 내년 3월 초" />
      </label>
      <Choices name="family" legend="함께 쓰실 가족은 몇 분인가요" opts={FAMILY} value={familySize} onChange={setFamilySize} />
      <label className="gift-field">
        <span className="gift-label">연락받을 메일</span>
        <input type="email" value={email} maxLength={320} autoComplete="email" inputMode="email" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
      </label>
      <label className="gift-field">
        <span className="gift-label">미리 들려주고 싶은 것 <small>선택</small></span>
        <textarea value={note} maxLength={500} rows={3} onChange={(e) => setNote(e.target.value)} placeholder="가족 이야기, 바라는 형태, 궁금한 점" />
      </label>
      <input className="gift-hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" />
      <label className="gift-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          상담 안내를 위해 메일과 적은 내용을 받는 데 동의해요. 신청일로부터 1년이 지나거나 요청하시면 지워요.{" "}
          <a href="/privacy/">개인정보 처리방침</a>
        </span>
      </label>
      {missing && <p className="gift-note" role="alert">{missing}</p>}
      {status === "error" && <p className="gift-note" role="alert">연결이 잠시 고르지 않았어요. 잠시 뒤 한 번 더 보내 주세요.</p>}
      <button type="submit" className="button primary gift-submit" disabled={status === "sending"}>
        {status === "sending" ? "보내는 중…" : "상담 신청하기"}
      </button>
      <p className="fine">상담과 신청에는 비용이 들지 않아요. 가격과 형태는 상담 뒤에 안내해요.</p>
    </form>
  );
}
