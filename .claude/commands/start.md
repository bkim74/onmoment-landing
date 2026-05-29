# /start

계속 세션 오프너. 어제 landing 작업을 이어받거나, copy/asset 수정 세션에 사용한다.

## Steps

1. handoff 파일 확인 (최우선)
   `.claude/session-handoff.md`가 있으면 **먼저 읽는다**.
   - `generated` 타임스탬프 확인 → 24시간 이상 지났으면 "오래된 handoff" 경고
   - `branch`가 현재 branch와 다르면 경고
   - `remaining` 항목을 다음 작업 후보로 우선 사용
   - handoff가 없으면 이 단계를 건너뛴다

2. 현재 상태 확인
   ```
   git branch --show-current
   git log --oneline -3
   git status --short
   ```
   handoff git state와 현재 상태가 크게 다르면 경고.

3. 다음 작업 결정
   - handoff `Next Session — Start Here` 항목 우선 사용
   - handoff 없으면: landing app/page.tsx 변경 사항 기반으로 제안
   - 블로커가 있으면 먼저 알린다

4. 보호 자산 확인
   ```
   pnpm run verify:assets
   ```
   실패하면 즉시 알리고, /ship 전 수정 필요 안내.

5. 모델 제안
   - landing은 대부분 copy/design 작업 → **Sonnet** (기본값)
   - i18n/구조 설계, 새 페이지 계획 → **Opus** (`/model claude-opus-4-7`)

## Report format

```
repo:     /home/bioj1/workspace/onmoment-landing
branch:   [branch]
handoff:  [있음 — N분 전 / 없음 / 오래됨 경고]
status:   [미커밋 변경 or 없음]

next:     [다음 작업 — handoff 또는 현재 변경 기반]
blocker:  [블로커 / 없으면 생략]

assets:   [통과 / 실패 항목]
model:    [Sonnet 유지 / Opus 전환 권장]
```

## Rules

- CORE.md 읽지 않는다
- pnpm build 실행하지 않는다 (그건 /check)
- handoff가 있어도 git 상태와 교차 검증
- handoff 파일을 자동으로 삭제하지 않는다
