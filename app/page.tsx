import Link from "next/link";
import JourneyLanding from "@/components/JourneyLanding";
import "./home.css";
import "./journey.css";

// 첫 화면 아래 — 온순간이 기록을 대하는 방식(확정 표현 유지)과 깊이 읽기 입구
function Ways() {
  return (
    <section className="ways" id="ways">
      <p className="eyebrow">온순간이 기록을 대하는 방식</p>
      <ul>
        <li>온순간은 처음부터 나만의 공간으로 시작합니다.</li>
        <li>오늘의 마음을 있는 그대로 담습니다.</li>
        <li>오늘의 문장은 점수가 아니라 이야기로 남습니다.</li>
        <li>무엇을 남기고 누구에게 건넬지는 내가 정합니다.</li>
      </ul>
      <nav aria-label="더 읽기">
        <Link className="text" href="/story">온순간의 이야기 →</Link>
        <Link className="text" href="/journal">온순간 저널 →</Link>
        <Link className="text" href="/principles">기록을 대하는 방식 →</Link>
      </nav>
      <p className="quiet legal">
        <a href="/privacy">개인정보 처리방침</a>
        <a href="/terms">이용약관</a>
        <span>ⓒ {new Date().getFullYear()} 온순간</span>
      </p>
    </section>
  );
}

export default function Home() {
  return <JourneyLanding ways={<Ways />} />;
}
