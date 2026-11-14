import data from "@/lib/landing/giftV5.json";

// 이야기 선물 랜딩(시안 v5) — 미리 그린 HTML + 화면 안 움직임(public/gift-v5/client.mjs).
//   시안의 #stage · #app 틀을 그대로 써야 v5 스타일(컨테이너 기준 반응형)이 맞는다.
export default function GiftV5({ page }: { page: string }) {
  const body = page === "hub" ? data.hub : (data.journeys as Record<string, string>)[page];
  return (
    <>
      <link rel="stylesheet" href="/gift-v5/styles.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/campaign.css" precedence="default" />
      <a className="skip" href="#content">본문으로 바로가기</a>
      <div id="stage">
        <div id="app" data-gift-root data-page={page} dangerouslySetInnerHTML={{ __html: data.header + body + data.footer }} />
      </div>
      <script type="module" src="/gift-v5/client.mjs" />
    </>
  );
}
