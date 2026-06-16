import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "기록을 대하는 방식 · 온순간",
  description: "온순간이 사용자의 기록을 바라보는 방식에 대한 데이터 철학입니다.",
  robots: { index: true, follow: true },
};

const CONTACT = "hello@onmoment.kr";

const PRINCIPLES = [
  {
    num: "하나",
    title: "기록은 데이터가 아니라 삶의 흔적입니다",
    body: "온순간에 쓰는 문장은 분석 대상이 아니라 당신이 살아낸 시간의 흔적입니다. 기록의 소유권은 100% 당신에게 있으며, 온순간은 서비스 제공에 필요한 범위 외에 이 기록을 사용하지 않습니다.",
    impl: "광고 타깃팅 없음 · 제3자 판매 없음 · AI 비춤 결과는 본인 계정에만 저장",
  },
  {
    num: "둘",
    title: "기록의 주인은 쓴 사람입니다",
    body: "모든 기록은 기본적으로 비공개입니다. 사용자가 직접 선택해야만 일부 문장이 공유됩니다. 언제든 기록을 내보내거나, 필요할 때 계정을 정리할 수 있습니다.",
    impl: "기본 비공개 · 공유는 직접 선택 · 선물 링크 언제든 거두기 가능",
  },
  {
    num: "셋",
    title: "AI는 증인이지 판사가 아닙니다",
    body: "AI 비춤은 당신의 기록을 판단하거나 결론 내리지 않습니다. 그저 다시 볼 수 있게 돌려줄 뿐입니다. 온순간은 사용자 기록을 AI 학습 데이터로 활용하지 않는 것을 원칙으로 합니다. AI 파트너나 처리 방식이 달라질 경우, 사전에 알리겠습니다.",
    impl: "AI 학습 데이터 미활용 원칙 · 변경 시 사전 공지 약속",
  },
  {
    num: "넷",
    title: "수익은 기록의 가치에서, 기록 자체에서가 아닙니다",
    body: "온순간은 광고 수익과 사용자 기록 판매를 선택하지 않습니다. 수익은 서비스 자체의 가치, 곧 구독과 기관 파트너십에서 만들어갑니다.",
    impl: "광고 없음 · 데이터 판매 없음 · 구독 및 기관 협력 기반 수익",
  },
  {
    num: "다섯",
    title: "기록과 계정 정보는 분리해 다룹니다",
    body: "온순간은 운영 과정에서 기록 내용과 계정 신원을 필요 이상으로 함께 다루지 않는 것을 원칙으로 합니다. 관리 화면에서 사용자 식별자는 최소화하며, 기록 원문이 이메일 주소와 함께 노출되는 구조를 만들지 않습니다. 앞으로 기록 테이블과 계정 정보를 구조적으로 분리하는 방향(가명화)으로 단계적으로 발전시킵니다.",
    impl: "관리 접근 최소화 · 식별자 마스킹 적용 · 기록/신원 구조 분리 단계적 진행",
  },
  {
    num: "여섯",
    title: "기록 원문은 암호화해 보관합니다",
    body: "기록 원문은 저장소와 백업에서 그대로 읽히지 않도록 암호화해 보관합니다. AI 비춤과 아침 회귀, 선물 표시를 위해 서버가 필요한 범위에서 기록을 처리할 수 있지만, 일반 관리자 화면에서 사용자의 기록 원문이 노출되지 않도록 설계했습니다. AI 비춤이 허용된 기록의 텍스트는 AI 제공자(Gemini)에 전송될 수 있습니다. 또한 시스템 최고권한이나 복구·장애 대응을 위한 제한된 운영 경로까지 포함하면, 기록 접근 가능성을 완전히 배제하는 구조는 아닙니다.",
    impl: "기록 원문 암호화 저장 · 일반 관리자 화면에 원문 미노출 · 서비스 제공·복구 경로에서 서버 접근 가능",
  },
] as const;

export default function PrinciplesPage() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">

      {/* Nav */}
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8">
        <Link href="/" className="eyebrow hover:opacity-80 transition-opacity">
          온순간 · Soul Oasis
        </Link>
        <span className="text-[11px] text-wood-natural/50">기록을 대하는 방식</span>
      </nav>

      <main className="mx-auto max-w-2xl px-6 pb-24">

        {/* Header */}
        <div className="pb-12 pt-6">
          <p className="eyebrow mb-4">온순간 · 데이터 철학</p>
          <h1 className="text-[28px] font-semibold leading-snug tracking-tight text-coffee-deep sm:text-[34px]">
            기록을 대하는 방식
          </h1>
          <p className="mt-6 text-[15px] leading-loose text-coffee-deep/80">
            이 앱을 만들면서 가장 먼저 정한 것이 있습니다.
            <br />
            이 공간에 무언가를 쓰는 사람이 판단받지 않아야 한다는 것.
            <br className="hidden sm:block" />
            그것이 기록을 다루는 온순간의 방식을 결정합니다.
          </p>
          <p className="mt-4 text-[13px] text-wood-natural/55">— 김범 · 온순간</p>
        </div>

        <hr className="hairline" />

        {/* 4 Principles */}
        <div className="space-y-0">
          {PRINCIPLES.map(({ num, title, body, impl }) => (
            <section key={num} className="py-10">
              <p className="eyebrow mb-3 text-wood-natural/50">{num}</p>
              <h2 className="mb-4 text-[18px] font-semibold leading-snug text-coffee-deep sm:text-[20px]">
                {title}
              </h2>
              <p className="mb-4 text-[14px] leading-loose text-coffee-deep/80">
                {body}
              </p>
              <p className="text-[12px] text-wood-natural/50">
                {impl}
              </p>
              <hr className="hairline mt-10" />
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="py-10">
          <p className="eyebrow mb-5">이 방식에 대해 묻고 싶다면</p>
          <p className="mb-3 text-[14px] leading-relaxed text-coffee-deep/80">
            온순간은 작은 팀입니다. 이 철학에 대해 궁금한 것이 있으면 직접 연락하세요.
          </p>
          <a
            href={`mailto:${CONTACT}`}
            className="text-[14px] underline underline-offset-2 hover:text-wood-natural transition-colors"
          >
            {CONTACT}
          </a>
        </section>

        <hr className="hairline" />

        {/* Legal links */}
        <div className="pt-10 space-y-3">
          <p className="text-[12px] text-wood-natural/50">
            법적 세부 내용은 아래에서 확인할 수 있습니다.
          </p>
          <div className="flex gap-4 text-[12px]">
            <Link
              href="/privacy"
              className="underline underline-offset-2 text-wood-natural/60 hover:text-wood-natural transition-colors"
            >
              개인정보 처리방침
            </Link>
            <span className="text-wood-natural/30">·</span>
            <Link
              href="/terms"
              className="underline underline-offset-2 text-wood-natural/60 hover:text-wood-natural transition-colors"
            >
              이용약관
            </Link>
          </div>
          <Link
            href="/"
            className="mt-6 block text-[11px] uppercase tracking-[0.15em] text-wood-natural/50 hover:text-wood-natural transition-colors"
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
            <Link href="/principles" className="hover:text-wood-natural transition-colors">
              기록을 대하는 방식
            </Link>
            <span>·</span>
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
