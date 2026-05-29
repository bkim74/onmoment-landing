# Archive: onmoment.kr Landing v1 — 단일 섹션 구조

**archived:** 2026-05-29
**archived_by:** bkim74
**replaced_by:** One-page tabbed landing (6섹션, commit `ab1213b`)
**reason:** 온순간 세계관을 한 장에서 더 명확하게 전달하기 위한 IA 고도화

---

## 구 구조 (6섹션 단일 스크롤, anchor nav 없음)

```
Nav (brand + 앱 열기)
│
├── §1 Hero
│   H1: 오늘이 선물이 되도록, / 한 줄.
│   Sub: 하루 한 줄. 내일 다시 만나는 나.
│   Depth: 오늘이 나에게 돌아오는 곳
│   CTA: 오늘의 온순간 시작하기 → / 앱 설치 방법 보기
│
├── §2 선언 (Manifesto)
│   온순간은 오늘의 마음을 있는 그대로 담습니다
│   하루에 하나의 문장만 남겨도 충분합니다
│   시간이 지나 그 한 줄들은 / 조용히 하나의 이야기로 이어집니다
│
├── §3 흐름 (How it works — timeline 4개)
│   §1 남김: 오늘 마음이 오래 머문 장면을 한 문장으로 남깁니다 / 어떤 문장이어도 괜찮습니다
│   §2 비춤: 며칠의 한 줄 사이에서 다시 돌아온 말이 / 조용히 비춰집니다
│   §3 나의 책: 흩어진 한 줄들은 시간이 지나 / 조용히 하나의 이야기로 이어집니다
│   §4 선물: 나의 이야기는 언젠가 누군가에게 / 건넬 수 있는 선물이 됩니다
│
├── §4 약속 (Trust)
│   NO SCORE · NO DIAGNOSIS · NO STREAK · PRIVATE BY DEFAULT
│   오늘의 문장은 점수가 아니라 이야기로 남습니다
│   기록의 리듬은 내가 정합니다
│   처음부터 나만의 공간으로 시작합니다
│
├── §5 선물 (Life as Gift)
│   하루의 한 줄이 나의 장이 되고,
│   언젠가 누군가에게 건넬 수 있는
│   선물이 됩니다
│   [depth] 오늘이 선물이 되도록, 그렇게 살아가는 너와 나
│
└── §6 CTA
    오늘의 첫 줄을 남겨볼까요?
    — 한 문장이면 충분합니다.
    CTA: 오늘의 온순간 시작하기 → / 앱 설치 방법 보기
```

---

## 기술 구조

- Next.js static export (output: 'export')
- Tailwind v4, Noto Serif KR
- `STEPS` 배열 + map으로 timeline 렌더
- `LocalizedResponsiveLines` (HERO_TITLE / HERO_SUB lineContracts)
- anchor nav 없음
- sticky nav 없음

---

## 교체 이유

1. **세계관 전달 부족** — "나만의 공간 → 카드 → 책 → 선물"의 흐름이 시각적으로 보이지 않았음
2. **섹션 구분 불명확** — 단일 스크롤로 온순간의 깊이를 전달하기 어려움
3. **하루 카드 오브제 미노출** — 실제 카드 경험을 랜딩에서 체감할 수 없었음
4. **탐색 경로 없음** — 첫 방문자가 관심 있는 섹션으로 바로 이동할 수 없었음

---

## Wayback Machine

- 이전 WordPress 아카이브: https://web.archive.org/web/20260528224630/https://onmoment.kr/
- v1 Next.js 랜딩은 git log `aec847b` 이전 커밋으로 복원 가능
