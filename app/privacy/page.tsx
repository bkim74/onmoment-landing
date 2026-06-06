import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침 · 온순간",
  description: "온순간의 기록은 기본 비공개입니다.",
  robots: { index: false, follow: false },
};

const CONTACT = "hello@onmoment.kr";
const UPDATED = "2026년 6월";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">

      {/* Nav */}
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8">
        <Link href="/" className="eyebrow hover:opacity-80 transition-opacity">
          온순간 · Soul Oasis
        </Link>
        <span className="text-[11px] text-wood-natural/50">개인정보 처리방침</span>
      </nav>

      <main className="mx-auto max-w-2xl px-6 pb-24">

        {/* Header */}
        <div className="pb-12 pt-6">
          <p className="eyebrow mb-4">온순간 · 개인정보</p>
          <h1 className="text-[28px] font-semibold leading-snug tracking-tight text-coffee-deep sm:text-[34px]">
            개인정보 처리방침
          </h1>
          <p className="mt-3 text-sm text-wood-natural/60">최종 수정: {UPDATED}</p>
          <div className="mt-6 rounded-2xl border border-wood-natural/15 px-6 py-5">
            <p className="text-[14px] leading-loose text-coffee-deep/80">
              이 앱을 만든 사람으로서 한 가지를 먼저 드리고 싶었습니다.
              <br />
              당신이 온순간에 쓰는 이야기는 당신의 것입니다.
              아래는 그 원칙을 법적으로 구체화한 것입니다.
            </p>
            <p className="mt-3 text-[12px] text-wood-natural/50">— 김범 · 온순간</p>
            <a
              href="/principles"
              className="mt-2 block text-[12px] underline underline-offset-2 text-wood-natural/60 hover:text-wood-natural transition-colors"
            >
              기록을 대하는 방식 →
            </a>
          </div>
        </div>

        <hr className="hairline" />

        {/* §1 핵심 약속 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§1&nbsp; 핵심 약속</p>
          <div className="rounded-2xl bg-curtain-soft/60 px-6 py-6 space-y-3">
            {[
              "기록의 소유권은 100% 사용자에게 있습니다.",
              "모든 기록은 기본 비공개입니다. 사용자가 직접 선택한 경우에만 일부 문장이 공유됩니다.",
              "광고 목적이나 제3자 판매 목적으로 기록을 사용하지 않습니다.",
              "AI 처리에 사용된 기록은 AI 학습 데이터로 재사용되지 않습니다.",
              "앱 내에서 언제든 계정과 기록을 즉시 삭제할 수 있습니다.",
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <span className="mt-[3px] text-wood-natural/50 shrink-0">—</span>
                <p className="text-[14px] leading-relaxed text-coffee-deep/85">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-wood-natural/50 leading-relaxed">
            문의와 삭제 요청:{" "}
            <a
              href={`mailto:${CONTACT}`}
              className="underline underline-offset-2 hover:text-wood-natural transition-colors"
            >
              {CONTACT}
            </a>
          </p>
        </section>

        <hr className="hairline" />

        {/* §2 저장하는 정보 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§2&nbsp; 저장하는 정보</p>
          <div className="space-y-6 text-[14px] leading-relaxed text-coffee-deep/80">
            <div>
              <p className="mb-1 font-medium text-coffee-deep">계정 정보</p>
              <p>로그인에 사용한 이메일 주소와 인증 토큰을 저장합니다. 비밀번호는 암호화되어 저장되며 운영자도 조회할 수 없습니다.</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">사용자가 남긴 기록</p>
              <p>
                하루의 문장, 조각(텍스트·음성 변환 텍스트), 감정 위치, AI 비춤 결과,
                주간 반영, 여정(Journey) 정보 등 서비스 이용 중 직접 입력하거나 선택한 내용을 서버에 저장합니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">사진</p>
              <p>
                사용자가 직접 첨부한 사진은 비공개 저장소에 암호화되어 저장됩니다.
                접근은 서명된 임시 URL을 통해서만 가능하며, URL은 일정 시간 후 만료됩니다.
                사진 원본은 본인 외에 열람되지 않습니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">이메일 알림</p>
              <p>
                아침 회귀 이메일(전날 남긴 문장이 다음 날 아침 도착하는 기능)을 발송하기 위해
                이메일 주소를 사용합니다. 마케팅 목적의 이메일은 발송하지 않습니다.
                이메일 수신 거부는 메일 하단 링크에서 즉시 처리됩니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">AI 비춤 처리</p>
              <p>
                입력하신 문장은 AI 비춤 기능을 위해 Google AI(Gemini API)를 통해 처리됩니다.
                처리 결과는 사용자의 계정에만 저장됩니다.
              </p>
              <p className="mt-2">
                온순간은 사용자 기록을 AI 학습 데이터로 활용하지 않는 것을 원칙으로 합니다.
                AI 파트너나 처리 방식이 달라질 경우, 사전에 알리겠습니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">기기 로컬 저장소</p>
              <p>
                초안, 임시 저장, 오프라인 보조 데이터는 기기의 localStorage와
                IndexedDB에 저장됩니다. 브라우저 데이터 삭제 시 함께 삭제됩니다.
              </p>
            </div>
          </div>
        </section>

        <hr className="hairline" />

        {/* §3 저장하지 않는 정보 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§3&nbsp; 저장하지 않는 정보</p>
          <ul className="space-y-2 text-[14px] leading-relaxed text-coffee-deep/80">
            {[
              "정확한 위치 정보 (GPS 좌표 등)",
              "광고 식별자 (IDFA, GAID 등)",
              "연락처 주소록",
              "마이크 녹음 원본 (음성은 텍스트 변환 후 원본 미저장)",
              "광고 타깃팅 또는 행동 추적 쿠키",
              "신용카드·결제 정보 (현재 유료 결제 기능 없음)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-wood-natural/50 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="hairline" />

        {/* §4 누가 볼 수 있나요 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§4&nbsp; 누가 볼 수 있나요?</p>
          <div className="space-y-5 text-[14px] leading-relaxed text-coffee-deep/80">
            <div>
              <p className="mb-1 font-medium text-coffee-deep">기본: 본인만</p>
              <p>모든 기록은 기본적으로 본인만 볼 수 있습니다. 다른 사용자에게 공개되지 않습니다.</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">선물 링크</p>
              <p>
                사용자가 직접 선택하여 공유한 카드만 링크를 받은 사람이 볼 수 있습니다.
                전체 기록, 나의 책, AI 비춤 내용, 프로필은 선물 링크에 포함되지 않습니다.
                공유한 선물은 언제든 거두어들일 수 있으며, 이후 링크는 차단됩니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">온순간 운영자</p>
              <p>
                서비스 운영, 보안, 오류 대응에 필요한 범위 내에서만 접근합니다.
                사용자의 기록 내용을 목적 외로 열람하지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <hr className="hairline" />

        {/* §5 제3자 처리자 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§5&nbsp; 제3자 처리자</p>
          <p className="mb-5 text-[14px] text-coffee-deep/80 leading-relaxed">
            서비스 운영을 위해 아래 제3자 서비스를 사용합니다.
            각 서비스는 해당 서비스의 개인정보 처리방침에 따라 데이터를 처리합니다.
          </p>
          <div className="space-y-4 text-[14px] leading-relaxed text-coffee-deep/80">
            {[
              {
                name: "Supabase (미국)",
                purpose: "데이터베이스 호스팅 및 인증. 저장된 데이터는 암호화됩니다.",
              },
              {
                name: "Google AI — Gemini API (미국)",
                purpose: "AI 비춤 처리. API를 통한 처리 결과는 Google의 AI 학습에 사용되지 않습니다.",
              },
              {
                name: "Resend (미국)",
                purpose: "아침 회귀 이메일 발송. 이메일 주소만 전달되며 기록 내용은 포함되지 않습니다.",
              },
              {
                name: "hCaptcha (미국)",
                purpose: "로그인·가입 시 봇 방지. 이메일 주소나 기록은 전달되지 않습니다.",
              },
            ].map(({ name, purpose }) => (
              <div key={name}>
                <p className="font-medium text-coffee-deep">{name}</p>
                <p>{purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="hairline" />

        {/* §6 삭제와 내보내기 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§6&nbsp; 삭제와 내보내기</p>
          <div className="space-y-4 text-[14px] leading-relaxed text-coffee-deep/80">
            <div>
              <p className="mb-1 font-medium text-coffee-deep">앱 내 직접 삭제</p>
              <p>
                앱 하단 프로필 탭 &gt; 계정 관리에서 언제든 계정과 모든 기록을 직접 삭제할 수 있습니다.
                삭제는 즉시 처리되며 복구되지 않습니다.
                사진 파일, 저장된 기록, 계정 정보 모두 함께 삭제됩니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">데이터 내보내기</p>
              <p>
                삭제 전 내 기록을 JSON 파일로 내보낼 수 있습니다.
                같은 위치(프로필 탭 &gt; 계정 관리)에서 다운로드할 수 있습니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">이메일 문의</p>
              <p>
                직접 삭제가 어려운 경우{" "}
                <a
                  href={`mailto:${CONTACT}`}
                  className="underline underline-offset-2 hover:text-wood-natural transition-colors"
                >
                  {CONTACT}
                </a>
                으로 요청하시면 처리해 드립니다.
              </p>
            </div>
          </div>
        </section>

        <hr className="hairline" />

        {/* §7 쿠키 / 로컬 저장소 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§7&nbsp; 쿠키 · 로컬 저장소</p>
          <div className="space-y-3 text-[14px] leading-relaxed text-coffee-deep/80">
            <p>
              로그인 세션 유지와 서비스 동작에 필요한 최소한의 저장소를 사용합니다.
            </p>
            <p>광고 타깃팅 목적의 쿠키나 트래커를 사용하지 않습니다.</p>
            <p>
              기기의 localStorage와 IndexedDB는 초안 보존, 임시 저장,
              오프라인 보조 용도로만 사용됩니다.
            </p>
          </div>
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
