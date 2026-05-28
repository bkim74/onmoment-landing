import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침 · 온순간",
  description: "온순간의 기록은 기본 비공개입니다.",
  robots: { index: false, follow: false },
};

const CONTACT = "hello@onmoment.kr";
const UPDATED = "2026년 5월";

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
          <p className="eyebrow mb-4">법적 고지</p>
          <h1 className="text-[28px] font-semibold leading-snug tracking-tight text-coffee-deep sm:text-[34px]">
            개인정보 처리방침
          </h1>
          <p className="mt-3 text-sm text-wood-natural/60">최종 수정: {UPDATED}</p>
        </div>

        <hr className="hairline" />

        {/* §1 요약 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§1&nbsp; 요약</p>
          <div className="rounded-2xl bg-curtain-soft/60 px-6 py-5">
            <p className="text-[15px] leading-loose text-coffee-deep/85">
              온순간의 기록은 <strong className="font-medium">기본 비공개</strong>입니다.
              <br />
              사용자가 선택한 경우에만 일부 문장이 선물 카드로 공유됩니다.
              <br />
              사용자의 기록을 광고 목적이나 제3자 판매 목적으로 사용하지 않습니다.
              <br />
              문의와 삭제 요청은{" "}
              <a
                href={`mailto:${CONTACT}`}
                className="underline underline-offset-2 hover:text-wood-natural transition-colors"
              >
                {CONTACT}
              </a>
              으로 받습니다.
            </p>
          </div>
        </section>

        <hr className="hairline" />

        {/* §2 무엇을 저장하나요 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§2&nbsp; 무엇을 저장하나요?</p>
          <div className="space-y-5 text-[14px] leading-relaxed text-coffee-deep/80">
            <div>
              <p className="mb-1 font-medium text-coffee-deep">계정 정보</p>
              <p>로그인에 사용한 이메일 주소와 인증 토큰을 저장합니다.</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">사용자가 남긴 기록</p>
              <p>
                하루의 문장, 감정 위치, 비춤, 주간 반영, 선택한 비춤 반응 등
                서비스 이용 중 직접 입력하거나 선택한 내용을 서버에 저장합니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">AI 비춤 처리</p>
              <p>
                입력하신 문장은 AI 비춤 기능을 위해 Google AI(Gemini)를 통해 처리됩니다.
                처리 결과는 사용자의 계정에만 저장되며, 광고나 제3자 판매 목적으로
                사용되지 않습니다.
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

        {/* §3 무엇을 저장하지 않나요 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§3&nbsp; 무엇을 저장하지 않나요?</p>
          <ul className="space-y-2 text-[14px] leading-relaxed text-coffee-deep/80">
            {[
              "정확한 위치 정보 (GPS 좌표 등)",
              "광고 식별자 (IDFA, GAID 등)",
              "연락처 주소록",
              "마이크 녹음 원본 (음성은 텍스트 변환 후 원본 미저장)",
              "광고 타깃팅 또는 행동 추적 쿠키",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-wood-natural/50">—</span>
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
              <p>모든 기록은 기본적으로 본인만 볼 수 있습니다.</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">선물 링크</p>
              <p>
                사용자가 직접 선택하여 공유한 카드만 링크를 받은 사람이 볼 수 있습니다.
                전체 기록, 나의 책, 비춤 내용, 프로필은 선물 링크에 포함되지 않습니다.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-coffee-deep">온순간 운영자</p>
              <p>
                서비스 운영, 보안, 오류 대응에 필요한 범위 내에서만 접근합니다.
                사용자의 기록을 목적 외로 열람하지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <hr className="hairline" />

        {/* §5 삭제와 문의 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§5&nbsp; 삭제와 문의</p>
          <div className="space-y-4 text-[14px] leading-relaxed text-coffee-deep/80">
            <p>
              계정 및 기록을 앱 내에서 직접 삭제하는 기능을 준비 중입니다.
              현재는{" "}
              <a
                href={`mailto:${CONTACT}`}
                className="underline underline-offset-2 hover:text-wood-natural transition-colors"
              >
                {CONTACT}
              </a>
              으로 요청하시면 삭제를 처리해 드립니다.
            </p>
            <p>기타 개인정보 관련 문의도 같은 이메일로 받습니다.</p>
          </div>
        </section>

        <hr className="hairline" />

        {/* §6 쿠키 / 로컬 저장소 */}
        <section className="py-10">
          <p className="eyebrow mb-5">§6&nbsp; 쿠키 · 로컬 저장소</p>
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
