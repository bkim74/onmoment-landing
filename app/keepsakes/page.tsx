import type { Metadata } from "next";
import Script from "next/script";
import { keepsakesHtml } from "@/lib/landing/keepsakesHtml";
import "../keepsakes.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "두 권에서 시작하는 나만의 선물 | 온순간",
  description: "나에게 한 권, 소중한 당신에게 한 권. 두 권의 책에서 카드와 전자책까지 각자의 모습으로 골라보세요.",
};

export default function KeepsakesPage() {
  return (
    <div className="keepsakes-page">
      <main>
        <a className="home" href="/#gifts">← 온순간 랜딩으로</a>
        <p id="keepsakes-context" hidden />
        <section className="reality" aria-label="지금 앱에서 되는 일">
          <h2>실제로 지금 되는 일과, 준비 중인 일</h2>
          <ul>
            <li><b>지금 앱에서</b> 내 기록에서 고른 장면을 카드로 간직하고, 여러 장면을 대표 장으로 엮어 건네요. 모두 내 문장 그대로 담겨요. 확정한 대표 장은 링크로 건네고, 받는 분은 가입 없이 읽어요. 건넨 링크는 언제든 거둘 수 있어요. 책 한 권은 인쇄 창을 열어 PDF로 저장해요.</li>
            <li className="soon"><b className="soon">준비 중</b> 한 문장 고르기와 짧은 연결(AI 편집), 이야기로 풀기, 전권 편집, 한 권에 묶기, 전자책 파일, 종이책 주문, 함께 쓰기</li>
          </ul>
          <p>아래는 앞으로의 구성을 가상 기록으로 미리 고르는 화면이에요. 고른 내용은 저장되지 않아요.</p>
          <a href={`${APP}/?src=keepsakes`} data-app-link data-story-link target="_blank" rel="noopener noreferrer">앱에서 시작하기 ↗</a>
          <span> · 지금은 누구나 시작할 수 있는 시범 운영 중이에요.</span>
        </section>
        <div dangerouslySetInnerHTML={{ __html: keepsakesHtml(APP) }} />
      </main>
      <Script src="/landing/keepsakes.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}
