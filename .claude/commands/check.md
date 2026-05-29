# /check

작업 중간 검증만 수행한다. commit, push, deploy는 하지 않는다.

## Steps

1. 현재 repo와 branch 확인
   - `pwd` → `/home/bioj1/workspace/onmoment-landing`인지 확인
   - `git branch --show-current`
   - `git status --short`
   - `git diff --name-only`

2. 변경 범위 분류
   - **copy/design** — app/page.tsx, app/globals.css
   - **legal pages** — app/privacy/, app/terms/
   - **assets** — public/, app/icon.svg, app/favicon.ico
   - **config** — next.config.ts, vercel.json, layout.tsx
   - **scripts** — scripts/gen-og.mjs, scripts/gen-icons.mjs

3. 공통 검증
   ```
   pnpm run check
   ```
   (`verify:assets` + `tsc --noEmit` + `build`)
   타입만: `pnpm run typecheck`

4. 범위별 추가 확인 여부 보고
   - **copy/design** → 모바일 Hero H1 줄바꿈 / CTA 링크 / 긍정문 확인 필요
   - **assets** → OG 이미지 재생성 필요 여부 (`pnpm run gen:og`)
   - **legal pages** → 법적 고지 문구 유지 여부 확인

## Rules

- commit 금지
- push 금지
- deploy 금지
- `scripts/fonts/` commit 금지
- Privacy/Terms 법적 부정문은 회귀로 처리하지 않음

## Report format

```
changed:   [변경 파일 목록]
check:     [통과/실패 + 실패 원인]
risk:      [OG 재생성 필요 / CTA 링크 변경 여부]
manual:    [시각 확인 필요 표면]
next:      [fix or /ship]
```
