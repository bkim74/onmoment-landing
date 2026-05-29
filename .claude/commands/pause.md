# /pause

세션을 안전하게 중단하기 위한 handoff를 생성한다.
토큰 부족 · 모델 전환 · 컴퓨터 종료 · 세션 끊김 직전에 사용한다.

commit, push, deploy는 하지 않는다.

## Steps

1. 현재 상태 수집
   ```
   pwd
   git branch --show-current
   git status --short
   git diff --stat
   git diff --name-only
   git log --oneline -3
   ```
   `git status --short`는 untracked(??) 파일을 포함하므로 반드시 실행한다.
   `git diff --stat`만으로는 untracked 파일을 놓친다.

2. 위험 파일 확인 (untracked/modified 중 아래 항목 있으면 경고)
   - `.env*`
   - `.claude/settings.local.json`
   - `scripts/fonts/`
   - `*.ttf`, `*.otf`, `*.woff`, `*.woff2` (로컬 폰트 파일)
   - `*.key`, `*.pem`, `*.p12`, `*.cer` (인증서/키)
   - 10MB 이상 파일
   - secrets 포함 가능성 있는 파일명

3. 현재 작업 컨텍스트를 묻는다 (자동 추론이 어려운 항목)
   - 지금 하고 있던 작업 목표
   - 완료된 것
   - 미완료된 것 (절반 작업, 미테스트, 미커밋 포함)
   - 다음 세션에서 바로 할 첫 번째 명령

4. handoff 파일 생성
   저장 위치: `.claude/session-handoff.md`

   ```md
   # Session Handoff

   generated: [ISO timestamp]
   repo: /home/bioj1/workspace/onmoment-landing
   branch: [branch]
   model: [현재 모델]

   ## Current Goal
   [이번 세션의 작업 목표]

   ## Git State
   branch: [branch]
   status:
   [git status --short 출력]

   diff summary:
   [git diff --stat 출력]

   recent commits:
   [git log --oneline -3]

   ## Completed This Session
   - [완료 항목]

   ## Remaining / In Progress
   - [미완료 항목]
   - [절반 작업]

   ## Next Session — Start Here
   command: [/start 또는 /plan 또는 구체적인 첫 명령]
   task: [다음 세션에서 첫 번째로 할 일]

   ## Do Not Touch
   - [이번 세션에서 건드리지 말라고 정한 파일/기능]

   ## Last Validation
   pnpm run check: [통과/실패/미실행]
   pnpm run typecheck: [통과/실패/미실행]
   pnpm build: [통과/실패/미실행]
   last commit: [hash + message or "uncommitted changes"]
   uncommitted changes: [있음/없음]

   ## Warnings
   [위험 파일 또는 불완전 상태 경고]
   ```

5. 완료 보고

## Rules

- commit 금지
- push 금지
- deploy 금지
- 깨진 상태를 숨기지 않는다 — 있는 그대로 기록
- untracked 위험 파일은 반드시 Warnings에 표시
- `.env*`, secrets, `scripts/fonts/` 커밋 절대 금지

## Report format

```
handoff written: .claude/session-handoff.md
current goal:    [이번 세션 목표]
changed files:   [N개]
completed:       [완료 항목]
remaining:       [미완료 항목]
last validation: [pnpm run check 결과]
next command:    [다음 세션 첫 명령]
do not touch:    [보호 파일/기능]
warnings:        [있으면 표시]
```
