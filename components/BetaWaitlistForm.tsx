"use client";

import { useState } from "react";

const DEFAULT_API_URL = "https://app.onmoment.kr/api/waitlist";

export default function BetaWaitlistForm() {
  const apiUrl = process.env.NEXT_PUBLIC_WAITLIST_API_URL || DEFAULT_API_URL;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="om-ko text-[15px] leading-relaxed text-coffee-deep/80">
        남겨주셨어요. 시작하는 날, 조용히 초대장을 보내드릴게요.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소"
        autoComplete="email"
        className="w-full max-w-sm rounded-full border border-wood-natural/25 bg-paper-cream px-6 py-3.5 text-center text-sm text-coffee-deep placeholder:text-wood-natural/40 focus:border-coffee-deep/40 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-coffee-deep px-8 py-3.5 text-sm font-medium text-paper-cream transition-colors duration-300 hover:bg-ink-quiet disabled:opacity-60"
      >
        {status === "submitting" ? "남기는 중…" : "함께 시작하기"}
      </button>
      {status === "error" && (
        <p className="text-[12px] text-wood-natural/60">
          연결이 잠시 고르지 않았어요. 잠시 후 다시 한번 남겨주세요.
        </p>
      )}
    </form>
  );
}
