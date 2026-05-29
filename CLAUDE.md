# onmoment-landing — CLAUDE.md

공개 브랜드 랜딩 (onmoment.kr). Next.js static export.

## Commands

- `/check` — 중간 검증 (commit 없음)
- `/ship`  — 마감 (verify:assets + tsc + build + commit + push)
- `pnpm run typecheck` — 빠른 tsc 확인
- `pnpm run check` — 전체 검증 (verify:assets + tsc + build)

## Domain Rule

- `onmoment.kr` = 이 repo (브랜드 랜딩)
- `app.onmoment.kr` = 별도 repo (PWA 앱) — 코드 공유 없음

## Protected Assets

`/ship` 전 반드시: `pnpm run check`

- `app/favicon.ico` · `app/icon.svg` — create-next-app 기본 ICO 덮어쓰기 금지
- CTA: 반드시 `https://app.onmoment.kr/today`, `https://app.onmoment.kr/install` (`href="#"` 금지)
- `scripts/fonts/` · `.env*` 커밋 금지
- 프리뷰 URL (`onmoment-feature.vercel.app`, `localhost`) landing copy 잔존 금지
- Privacy/Terms 법적 고지 부정문 유지 (예외)
- Landing 확정 표현 원복 금지: "있는 그대로 담습니다" · "이야기로 남습니다" · "내가 정합니다" · "나만의 공간으로 시작합니다"

## Always Ignore

`tests/` `playwright*` `sentry*` `analytics*`

Do NOT: add new pages without approval · change domain/DNS · modify app.onmoment.kr code · add i18n library · add locale switcher.
