import type { Metadata } from "next";
import Link from "next/link";
import BetaWaitlistForm from "../../components/BetaWaitlistForm";

export const metadata: Metadata = {
  title: "시작을 함께하는 자리 · 온순간",
  description:
    "이메일을 남겨주시면, 온순간이 문을 여는 날 함께 시작할 수 있도록 조용히 초대장을 보내드립니다.",
};

export default function BetaPage() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">
      {/* Nav */}
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8">
        <Link href="/" className="eyebrow hover:opacity-80 transition-opacity">
          온순간 · Soul Oasis
        </Link>
        <span className="text-[11px] text-wood-natural/50">베타</span>
      </nav>

      <main className="mx-auto max-w-2xl px-6 pb-24">
        <section className="py-24 text-center">
          <p className="eyebrow mb-8 text-center">현재 온순간은 소수 베타로 운영 중입니다</p>
          <h1 className="om-headline om-ko mx-auto mb-5 max-w-sm text-[24px] font-semibold leading-snug text-coffee-deep sm:text-[28px]">
            시작을 함께하는 자리
          </h1>
          <p className="om-ko mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-coffee-deep/70">
            이메일을 남겨주시면, 온순간이 문을 여는 날
            <br className="hidden sm:block" /> 함께 시작할 수 있도록 조용히 초대장을 보내드립니다.
          </p>

          <BetaWaitlistForm />

          <p className="mt-10 text-[11px] text-wood-natural/45">
            이메일은 시작 안내를 보내는 용도로만 사용합니다.{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 transition-colors hover:text-wood-natural/70"
            >
              개인정보 처리방침
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
