#!/usr/bin/env bash
# verify-assets.sh — onmoment-landing 보호 자산 회귀 검사
# Usage: bash scripts/verify-assets.sh

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAGE="$ROOT/app/page.tsx"
ERRORS=0

check() {
  local label="$1" result="$2"
  if [ "$result" = "ok" ]; then
    echo "  ✓ $label"
  else
    echo "  ✗ $label — $result"
    ERRORS=$((ERRORS + 1))
  fi
}

echo "=== onmoment-landing asset regression check ==="

# ── 1. favicon.ico (must be custom PNG, not Next.js ICO) ───────────────────
ICO="$ROOT/app/favicon.ico"
if [ -f "$ICO" ]; then
  FMT=$(node -e "require('sharp')('$ICO').metadata().then(m=>process.stdout.write(m.format)).catch(()=>process.stdout.write('unsupported'))" 2>/dev/null)
  [ "$FMT" = "png" ] && check "app/favicon.ico (custom PNG)" "ok" || check "app/favicon.ico" "Next.js 기본 ICO — gen-icons.mjs 실행 후 교체 필요"
else
  check "app/favicon.ico" "파일 없음"
fi

# ── 2. icon.svg (must exist) ────────────────────────────────────────────────
[ -f "$ROOT/app/icon.svg" ] && check "app/icon.svg" "ok" || check "app/icon.svg" "없음"

# ── 3. CTA links use app.onmoment.kr (no preview/localhost) ────────────────
if [ -f "$PAGE" ]; then
  if grep -qE "onmoment-feature\.vercel\.app|onmoment\.vercel\.app|localhost" "$PAGE" 2>/dev/null; then
    check "CTA links (no preview URL)" "프리뷰/로컬 URL 잔존"
  else
    check "CTA links (no preview URL)" "ok"
  fi

  if grep -qE 'href="#"' "$PAGE" 2>/dev/null; then
    check "No href='#'" "빈 링크 잔존"
  else
    check "No href='#'" "ok"
  fi
fi

# ── 4. Landing copy — 부정문 잔존 여부 (Privacy/Terms 제외) ────────────────
if [ -f "$PAGE" ]; then
  if grep -qE "평가하지|요구하지|매기지" "$PAGE" 2>/dev/null; then
    check "Landing copy 부정문 없음" "page.tsx에 부정문 잔존 — 긍정문으로 교체 필요"
  else
    check "Landing copy 부정문 없음" "ok"
  fi
fi

echo ""
if [ "$ERRORS" -eq 0 ]; then
  echo "모두 통과 ✓"
else
  echo "$ERRORS 건 회귀 감지 — CLAUDE.md > Protected Assets 참고"
  exit 1
fi
