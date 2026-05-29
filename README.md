# onmoment-landing

**onmoment.kr** 공식 브랜드 랜딩 — Next.js static export

---

## 도메인 역할

| 도메인 | 역할 |
|---|---|
| `onmoment.kr` | 공개 브랜드 랜딩 / SEO / 공유 ← 이 repo |
| `app.onmoment.kr` | PWA 앱 / 로그인 / 리추얼 (별도 repo: onmoment-recovery) |

두 도메인은 코드베이스를 **공유하지 않습니다**. landing 변경이 PWA 앱 배포에 영향을 주지 않습니다.

---

## 1차 완료 상태 (2026-05-29)

| 항목 | 상태 |
|---|---|
| 브랜드 랜딩 (Hero / Manifesto / How / Trust / Gift / CTA) | ✅ 완료 |
| OG 이미지 1200×630 (Noto Serif KR 한글 렌더링) | ✅ 완료 |
| favicon.ico / icon-192.png / icon-512.png / apple-touch-icon.png | ✅ 완료 |
| Privacy 정적 페이지 (`/privacy`) | ✅ 완료 |
| Terms 정적 페이지 (`/terms`) | ✅ 완료 |
| www.onmoment.kr → onmoment.kr 301 redirect (Vercel API) | ✅ 완료 |
| app.onmoment.kr PWA 앱 분리 유지 | ✅ 확인 |
| WordPress(cafe24) 공개 서페이스 종료 | ✅ 확인 |

---

## 기술 스택

- Next.js 16 · React 19 · TypeScript · Tailwind CSS v4
- `output: 'export'` — 완전 정적 (API route 없음 / Auth 없음 / DB 없음 / cron 없음)
- Vercel project: `onmoment` (bkim74s-projects)
- GitHub: `bkim74/onmoment-landing`

---

## 개발

```bash
pnpm dev          # :3000 로컬 개발
pnpm build        # 정적 export → out/
pnpm gen:og       # OG 이미지 재생성 (Noto Serif KR 필요 — scripts/README 참고)
pnpm gen:icons    # favicon / icon set 재생성
pnpm gen:all      # icons + OG 순서대로 실행
```

### OG 이미지 재생성 시 필요한 폰트

`scripts/fonts/NotoSerifKR-Regular.ttf`를 로컬에 직접 배치하거나 fontconfig에 등록:

```bash
# Google Fonts에서 다운로드
curl -sL "https://fonts.gstatic.com/s/notoserifkr/v31/3JnoSDn90Gmq2mr3blnHaTZXbOtLJDvui3JOncjmeM52.ttf" \
  -o scripts/fonts/NotoSerifKR-Regular.ttf
# fontconfig 등록 (1회)
cp scripts/fonts/NotoSerifKR-Regular.ttf ~/.local/share/fonts/
fc-cache -f
```

`scripts/fonts/` 는 `.gitignore` 처리 (14MB TTF 미커밋).

---

## 디자인 토큰 (Anti-Dopamine)

```css
--paper-cream:   #F5EDE0   /* 배경 */
--coffee-deep:   #3D2817   /* 제목 / 주요 텍스트 */
--wood-natural:  #8B6F47   /* 보조 텍스트 / eyebrow */
--curtain-soft:  #F0E5D0   /* hairline / 카드 배경 */
--sunlight-warm: #E8C99A   /* 강조 (절제) */
--ink-quiet:     #2C2418   /* hover / deep */
```

CTA → `app.onmoment.kr/today` · `app.onmoment.kr/install`

---

## 남은 법무 검토 (글로벌 베타 이전 필요)

- [ ] 개인정보 보호법 (한국) — 처리방침 법정 고지 형식 요건
- [ ] GDPR — EU 이용자 대상 개인정보 이전 조항
- [ ] Google Gemini API 이용 약관 명시
- [ ] 계정 삭제 UI 구현 후 Privacy §5 업데이트
- [ ] 만 14세 미만 실질 차단 방법 검토

---

## 다음 후보 작업

1. **OG 실제 공유 테스트** — 카카오톡 / X(트위터) / 링크드인 카드 렌더링 확인
2. **Phase A dogfooding** — app.onmoment.kr 30일 창업 리추얼 (SYNC.md 참고)
3. **Grand Altar 30d PLAN_FIRST** — D+7 이후 (2026-06-01~)
4. **www redirect 최종 확인** — 브라우저에서 www.onmoment.kr → onmoment.kr 301 확인
5. **Privacy/Terms 법무 검토** — 글로벌 베타 전
