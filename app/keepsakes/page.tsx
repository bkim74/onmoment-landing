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
        <a className="home" href="/#books">← 온순간 랜딩으로</a>
        <section className="reality" aria-label="지금 앱에서 되는 일">
          <h2>실제로 지금 되는 일과, 준비 중인 일</h2>
          <ul>
            <li><b>지금 앱에서</b> 내 문장 그대로, 고른 기록으로 책 한 권을 엮어 인쇄 창에서 PDF로 저장해요. 나에게 남기는 책도, 받는 사람을 표지에 적은 건네는 책도 같은 방식이에요.</li>
            <li className="soon"><b className="soon">준비 중</b> 짧은 연결·이야기로 풀기(AI 편집), 카드, 두 판본 함께 만들기, 한 권에 묶기, 전자책 파일, 종이책 주문</li>
          </ul>
          <p>아래는 앞으로의 구성을 가상 기록으로 미리 고르는 화면이에요. 고른 내용은 저장되지 않아요.</p>
          <a href={`${APP}/start?src=keepsakes`} data-app-link target="_blank" rel="noopener noreferrer">앱에서 오늘의 한 줄부터 쓰기 ↗</a>
        </section>
        <div dangerouslySetInnerHTML={{ __html: keepsakesHtml(APP) }} />
      </main>
      <Script src="/landing/keepsakes.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}
