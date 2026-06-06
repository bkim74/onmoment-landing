import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 · 온순간",
  description: "온순간 서비스 이용약관입니다.",
  robots: { index: false, follow: false },
};

const CONTACT = "hello@onmoment.kr";
const UPDATED = "2026년 6월";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">

      {/* Nav */}
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8">
        <Link href="/" className="eyebrow hover:opacity-80 transition-opacity">
          온순간 · Soul Oasis
        </Link>
        <span className="text-[11px] text-wood-natural/50">이용약관</span>
      </nav>

      <main className="mx-auto max-w-2xl px-6 pb-24">

        {/* Header */}
        <div className="pb-12 pt-6">
          <p className="eyebrow mb-4">법적 고지</p>
          <h1 className="text-[28px] font-semibold leading-snug tracking-tight text-coffee-deep sm:text-[34px]">
            이용약관
          </h1>
          <p className="mt-3 text-sm text-wood-natural/60">최종 수정: {UPDATED}</p>
        </div>

        <hr className="hairline" />

        {/* §1 서비스 정의 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§1&nbsp; 서비스 정의</p>
          <div className="rounded-2xl bg-curtain-soft/60 px-6 py-5">
            <p className="text-[15px] leading-loose text-coffee-deep/85">
              온순간은 하루의 문장을 남기고, 시간이 지나 다시 돌아보도록 돕는
              <strong className="font-medium"> 개인 기록 서비스</strong>입니다.
              <br />
              의료, 심리치료, 진단, 상담 서비스가 아닙니다.
            </p>
          </div>
        </section>

        <hr className="hairline" />

        {/* §2 사용자의 기록과 권리 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§2&nbsp; 사용자의 기록과 권리</p>
          <div className="space-y-3 text-[14px] leading-relaxed text-coffee-deep/80">
            <p>
              사용자가 온순간에 남긴 기록의 저작권과 소유권은 온전히 사용자에게 있습니다.
            </p>
            <p>
              온순간은 서비스 제공(기록 저장, 동기화, AI 비춤 처리, 이메일 전달)을 위해
              필요한 범위 내에서만 기록을 처리합니다.
              사용자의 허락 없이 기록을 공개하거나 제3자에게 판매하지 않습니다.
            </p>
            <p>
              사용자는 언제든 앱 내 프로필 탭에서 모든 기록을 JSON으로 내보내거나
              계정과 기록 전체를 삭제할 수 있습니다.
            </p>
          </div>
        </section>

        <hr className="hairline" />

        {/* §3 선물 링크 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§3&nbsp; 선물 링크</p>
          <div className="space-y-3 text-[14px] leading-relaxed text-coffee-deep/80">
            <p>사용자가 직접 선택한 카드만 선물 링크에 포함됩니다.</p>
            <p>링크를 받은 사람은 선택된 카드와 이에 기반한 AI 요약만 볼 수 있습니다.</p>
            <p>
              전체 기록, 나의 책, AI 비춤, 조각, 프로필은 선물 링크를 통해 공개되지 않습니다.
            </p>
            <p>
              공유한 선물은 언제든 거두어들일 수 있습니다.
              거두어들인 후에는 링크에 접근할 수 없습니다.
            </p>
          </div>
        </section>

        <hr className="hairline" />

        {/* §4 이용 제한 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§4&nbsp; 이용 제한</p>
          <p className="mb-4 text-[14px] text-coffee-deep/80">
            다음의 목적으로 서비스를 이용할 수 없습니다.
          </p>
          <ul className="space-y-2 text-[14px] leading-relaxed text-coffee-deep/80">
            {[
              "타인을 해치거나 괴롭히는 목적",
              "허위 정보 유포 또는 사기 목적",
              "불법적인 목적",
              "타인의 개인정보를 허락 없이 입력하거나 공유하는 행위",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-wood-natural/50 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] text-coffee-deep/70">
            온순간은 만 14세 이상이 이용할 수 있습니다.
          </p>
        </section>

        <hr className="hairline" />

        {/* §5 서비스 변경 / 중단 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§5&nbsp; 서비스 변경 · 중단</p>
          <div className="space-y-3 text-[14px] leading-relaxed text-coffee-deep/80">
            <p>
              서비스는 개선 과정에서 구조와 기능이 변경될 수 있습니다.
              중요한 변경은 가능한 방식으로 사전에 안내합니다.
            </p>
            <p>
              서비스 중단이 필요한 경우, 중단 전에 기록을 JSON으로 내보낼 수 있는
              기간을 제공하기 위해 노력합니다.
            </p>
          </div>
        </section>

        <hr className="hairline" />

        {/* §6 면책 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§6&nbsp; 면책</p>
          <div className="space-y-3 text-[14px] leading-relaxed text-coffee-deep/80">
            <p>
              온순간은 감정 기록과 회고를 돕는 서비스입니다.
              특정 치료 효과나 심리적 결과를 보장하지 않습니다.
            </p>
            <p>
              위기 상황, 자해 위험, 또는 긴급한 심리적 어려움이 있다면
              즉시 주변 사람이나 전문가 · 긴급기관의 도움을 받으시기 바랍니다.
            </p>
            <div className="mt-2 rounded-xl border border-wood-natural/15 px-4 py-3 text-[13px] text-wood-natural/70">
              <p>정신건강 위기상담 전화: <strong>1577-0199</strong> (24시간)</p>
              <p className="mt-0.5">자살예방상담전화: <strong>1393</strong></p>
            </div>
          </div>
        </section>

        <hr className="hairline" />

        {/* §7 문의 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§7&nbsp; 문의</p>
          <p className="text-[14px] text-coffee-deep/80">
            서비스 이용, 기록 삭제, 약관 관련 문의는 아래로 보내주세요.
          </p>
          <a
            href={`mailto:${CONTACT}`}
            className="mt-3 inline-block text-[14px] underline underline-offset-2 hover:text-wood-natural transition-colors"
          >
            {CONTACT}
          </a>
        </section>

        <hr className="hairline" />

        {/* Back */}
        <div className="pt-10">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.15em] text-wood-natural/50 hover:text-wood-natural transition-colors"
          >
            ← 온순간으로 돌아가기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-curtain-soft py-10">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">온순간 · Soul Oasis</p>
            <p className="text-[10px] text-wood-natural/30">
              ⓒ {new Date().getFullYear()} 온순간
            </p>
          </div>
          <div className="mt-4 flex gap-4 text-[11px] text-wood-natural/40">
            <Link href="/privacy" className="hover:text-wood-natural transition-colors">
              개인정보 처리방침
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-wood-natural transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
