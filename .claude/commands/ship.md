# /ship

작업을 배포 가능한 단위로 마감한다.

## Steps

1. 현재 repo와 branch 확인
   - `pwd` → `/home/bioj1/workspace/onmoment-landing`인지 확인
   - `git branch --show-current`
   - `git status --short`
   - `git diff --name-only`

2. 변경 범위 분류
   - **copy/design** / **legal pages** / **assets** / **config** / **scripts**

3. 공통 검증 (필수 — 생략 금지)
   ```
   pnpm run check
   ```

4. Landing smoke
   ```
   https://onmoment.kr/            (200)
   https://onmoment.kr/privacy     (200)
   https://onmoment.kr/terms       (200)
   https://onmoment.kr/og-image.png (200)
   ```
   CTA 링크가 `https://app.onmoment.kr/today`, `https://app.onmoment.kr/install`로 연결되는지 확인

5. commit
   - 타입: `fix:` / `design:` / `docs:` / `chore:`
   - 60자 이내
   - 제외: `scripts/fonts/`, `.env*`, `pnpm-lock.yaml`(단독 변경)
   - `git add [specific paths]` — `-A` 사용 금지
   - `git commit -m "..."`

6. push → Vercel 자동 배포
   ```
   git push origin main
   ```
   - `vercel ls onmoment` 로 Ready 확인

## Rules

- `pnpm run check` 없이 ship 금지
- landing repo ≠ app repo — 혼동 금지
- `scripts/fonts/`, `.env*` commit 금지
- `href="#"`, preview URL 잔존 commit 금지
- Privacy/Terms 법적 고지 문구 제거 금지
- app.onmoment.kr DNS 변경 금지

## Report format

```
shipped:  [commit hash + message]
files:    [N files → branch]
smoke:    [확인한 URL + 결과]
deploy:   [Vercel Ready / 진행중]
manual:   [시각 확인 필요]
```
