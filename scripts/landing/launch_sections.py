"""Home-page launch sections. Proposed benefits are not live entitlements.

The separate policy file is display-only. App billing and event eligibility remain
server-owned. Activating an event requires the app integration and published terms;
changing a status value alone must never advertise a live event.
"""
import html
import json
from pathlib import Path


def esc(value):
    return html.escape(str(value), quote=True)


POLICY = json.loads((Path(__file__).resolve().parents[2] / 'lib/landing/launch-policy.json').read_text(encoding='utf8'))
# 책 선물 이벤트는 범님 리뷰 전까지 운영에 싣지 않는다 — published 가 true 일 때만 섹션 · FAQ · 안내 링크를 만든다
EVENT_ON = POLICY.get('event', {}).get('published') is True
PLAN_BY_KEY = {plan['key']: plan for plan in POLICY['plans']}
if POLICY.get('commercialMode') != 'pre_registration_validation' or POLICY.get('paymentsEnabled') is not False:
    raise ValueError('This handoff only supports non-binding demand validation; live billing requires a separate reviewed release.')
# 책 이벤트는 앱 응모(운영 응모 · 1행 확인 11-13)와 날짜가 정해졌을 때만 'open' 으로 연다 — 요금 · 결제는 그대로 'planned'
EVENT_OPEN_OK = POLICY['event']['status'] == 'open' and all(POLICY['event'].get(k) for k in ('entry', 'record', 'draw'))
if POLICY['status'] != 'planned' or not (POLICY['event']['status'] == 'planned' or EVENT_OPEN_OK):
    raise ValueError('Live launch requires verified app entitlements, event entry and dated terms. See docs/claude-landing-handoff-20261111.md.')
if POLICY['annualPromotion']['status'] != 'planned':
    raise ValueError('Annual promotion launch requires verified eligibility, payments, grants and refund terms.')


def first_experience():
    return '''<section class="launch-experience section wrap" id="first-experience" aria-labelledby="experience-title">
  <div class="launch-intro"><p class="eyebrow">한 줄이 내게 돌아오는 시간</p><h2 id="experience-title">남긴 장면을 다시 읽으면,<br>다음 장면이 떠오르기도 해요.</h2><p>글을 잘 쓰는 것보다, 내 하루를 한 번 더 만나는 일.<br>이렇게 시작할 수 있어요.</p><p class="launch-caption">아래는 흐름을 설명하는 가상 기록·돌아보기 예시입니다.</p></div>
  <ol class="launch-example">
    <li><span class="launch-step">01 · 내가 남긴 장면</span><blockquote>엄마가 밥 먹었냐고 물었다.<br>먹었다고만 답하고 전화를 끊었다.</blockquote></li>
    <li><span class="launch-step">02 · 다시 바라보는 물음</span><p>짧게 끝난 통화를 다시 떠올리니,<br>지금 더 나누고 싶은 말이 있나요?</p></li>
    <li><span class="launch-step">03 · 내가 고른 작은 선택</span><p>다음 통화에는 엄마의 하루도 물어보고 싶다.</p><span class="launch-caption">무엇을 발견하고 선택할지는 내가 정해요.</span></li>
  </ol>
</section>'''


def event_section():
    if not EVENT_ON:
        return ''
    winners = esc(POLICY['event']['winnerCount'])
    # 두괄식(범님 11-13) — 무엇 · 누구 · 언제 · 어떻게를 먼저 한눈에, 본론은 그 아래에 충실히. 문구는 확정 공지문 그대로.
    return f'''<section class="launch-event section" id="book-event" aria-labelledby="event-title"><div class="wrap launch-event-layout">
  <div class="launch-event-copy"><p class="eyebrow">온순간 첫 책 선물 이벤트 · 11월 13일 ~ 26일</p><h2 id="event-title">내가 쓴 하루가,<br>나에게 돌아오는 선물.</h2><p>11월 13일부터 26일까지 온순간에 남긴 작은 장면들을 모아<br><strong>{winners}분께 맞춤 선물책</strong>을 만들어 드려요.</p><p class="launch-event-offer"><strong>나를 알아보고, 당신에게 건네는 책.</strong><br>두 시선을 양장본 한 권에 담아요.</p>
  <dl class="launch-event-facts">
    <div><dt>응모</dt><dd>11/13 ~ 19 · 온순간 ‘오늘’의 이벤트 카드</dd></div>
    <div><dt>조건</dt><dd>11/13 ~ 19 중 서로 다른 3일 이상 기록 + 제작 동의 + 편집본 확인 참여</dd></div>
    <div><dt>추첨</dt><dd>11/20 · {winners}명 · 앱과 이메일로 알려드려요</dd></div>
    <div><dt>확인</dt><dd>편집본 11/25 ~ 26 · 최종 승인 11/27</dd></div>
  </dl>
  <a class="button primary" href="__APP__/start?src=book-event" data-app-link data-story-link>오늘의 한 장면 남기기 ↗</a><p class="launch-caption">책에 실을 장면은 직접 고르고, 내가 승인한 원고만 인쇄합니다.</p></div>
  <div class="launch-event-guide"><p class="launch-guide-label">나에게 한 번, 당신에게 한 번</p><ol>
    <li><span aria-hidden="true">나</span><div><h3>그때의 나를 알아보는 이야기</h3><p>그날 내가 남긴 말과 사진, 다시 읽으며 알아차린 내 마음. 지나온 장면들을 펼쳐 놓고 그 안에 있던 나를 만나봅니다.</p></div></li>
    <li><span aria-hidden="true">너</span><div><h3>나를 당신에게 전하는 이야기</h3><p>“이 장면을 당신에게 보여주고 싶었어요.” 내가 살아낸 시간 중 한 사람에게 건네고 싶은 이야기를 고릅니다.</p></div></li>
  </ol><p class="launch-caption"><strong>두 이야기를 합쳐 48쪽 이상이면, 양장본 한 권에 두 부로 담아요.</strong> 48쪽에 못 미치면 두 이야기를 소책자 두 권으로 나누어 엮어요. 어느 쪽이든 내가 고른 장면이 온전히 담긴 책이에요. 쪽수는 편집본에서 함께 보고, 장면을 더해 채울 수도 있어요.</p>
  <details class="launch-details"><summary>참여 방법과 일정 자세히 보기</summary><div>
    <h3>시작은, 오늘의 한 장면이면 충분해요</h3>
    <p><strong>① 하루의 장면 남기기</strong> — 온순간 ‘오늘’에서 글 한 줄이나 사진 한 장을 남겨 주세요.</p>
    <p><strong>② 11월 19일까지 응모하기</strong> — ‘오늘’의 이벤트 카드에서 제작 안내와 동의 내용을 확인하고 응모해 주세요.</p>
    <p><strong>③ 서로 다른 날, 세 번 만나기</strong> — 11월 13~19일 중 서로 다른 3일 이상 기록하고, 제작에 동의하며 편집본 확인에 참여할 수 있는 분 가운데 {winners}분을 추첨합니다. 기록한 날은 한국 시각을 기준으로 계산해요. 선정된 뒤에도 26일까지 기록을 이어갈 수 있고, 책에 담을 장면은 그중에서 직접 고릅니다.</p>
    <h3>함께 책을 완성하는 시간</h3>
    <p>11/13~19 기록하고 응모해요 · 11/20 {winners}분을 추첨해 앱과 이메일로 알려드려요 · 11/21~24 남긴 장면으로 편집본을 만들어요 · 11/25~26 편집본을 읽고, 고치고, 마지막 장면을 더해요 · 11/27 최종 원고를 확인하고 승인해요. 승인한 원고로 인쇄를 진행하고, 실물 책의 제작·배송 일정은 선정된 분께 따로 안내드려요.</p>
    <h3>내 이야기의 마지막 결정은, 내가 합니다</h3>
    <p>AI가 책 제작에 허락한 2주의 기록을 읽고 구성을 제안하며 편집합니다. 원문 인용에는 날짜를 담고, AI가 엮은 글은 편집 제안으로 구분해요. 책에 실을 기록을 고르고, 문장을 빼거나 고치고, 순서를 바꿀 수 있어요. 본인이 최종 승인한 원고만 인쇄하며, 승인 후 내용이 달라지면 다시 확인받습니다. 이번 선물책은 AI 편집과 제작 지원을 거쳐 완성하는 시범 제작 도서이고, 분량은 남긴 기록에 따라 달라지고, 48쪽 이상이면 양장본 한 권, 그보다 짧으면 소책자 두 권으로 엮습니다.</p>
    <h3>내 기록은 내 곁에, 공개는 내 선택으로</h3>
    <p>앱에 남긴 원래 기록은 책 제작 때문에 삭제되지 않아요. 완성된 책 파일도 참여자께 드립니다. 동의 없이 공개하거나 홍보에 사용하지 않아요. 편집용 작업 사본과 배송 정보의 이용 범위·보관기간·삭제 시점은 제작 안내에서 알려드립니다.</p>
  </div></details></div>
</div></section>'''


def pricing_section():
    cards = []
    for plan in POLICY['plans']:
        free = plan['key'] == 'free'
        features = ''.join(f'<li>{esc(item)}</li>' for item in plan['features'])
        action = '<a class="button primary" href="__APP__/start?src=pricing-free" data-app-link data-story-link>무료로 시작하기 ↗</a>' if free else '<a class="launch-detail-link" href="#plan-details">예정된 제공 범위 보기 ↓</a>'
        annual = ''
        if not free:
            total = plan['annualPromotionPrice']
            months = POLICY['annualPromotion']['durationMonths']
            if not isinstance(total, int) or total <= 0 or months != 12 or total % months:
                raise ValueError('Expected a 12-month annual amount with an exact monthly equivalent.')
            annual = f'''<div class="launch-annual-preview"><span>1년 이용권 · 출시 예정</span><strong>연 {total:,}원</strong><p>월 {plan['price']:,}원이 월 {total // months:,}원으로<br>12개월 한 번 결제 · 자동 갱신 없이</p></div>'''
        cards.append(f'''<article class="launch-plan launch-plan-{esc(plan['key'])}"><p class="launch-plan-label">{esc(plan['name'])}</p><h3>{esc(plan['tagline'])}</h3><p class="launch-price">{'' if free else '<span>월 </span>'}{plan['price']:,}<span>원</span></p>{annual}<p class="launch-plan-description">{esc(plan['description'])}</p><ul>{features}</ul>{action}</article>''')
    return f'''<section class="launch-pricing section wrap" id="pricing" aria-labelledby="pricing-title">
  <div class="section-heading"><p class="eyebrow">정식 출시 예정 요금</p><h2 id="pricing-title">내게 맞는 만큼,<br>온순간과 함께해요.</h2><p>기록하고 다시 읽는 일은 늘 무료예요. <br>더 자주, 더 깊이 만나고 싶을 때 골라요.</p></div>
  <div class="launch-plans">{''.join(cards)}</div>
  <div class="launch-plan-notes" id="plan-details"><p><strong>지금은 결제 없이, 무료로 써요.</strong> 결제 · 예약금 · 카드 등록이 없고, 마음을 남겨도 구매 의무가 생기지 않아요.</p><p>유료 이용이 열려도 자동으로 결제되지 않아요. 열리기 전에 앱에서 먼저 알려 드리고, 그때 직접 골라요. 기록하고 다시 읽는 일은 계속 무료예요.</p><p>1년 이용권은 12개월을 한 번에, 자동 갱신 없이 준비해요. AI 이용량과 책은 매달 나눠 드려요. 제공량 · 중도 해지 · 환불 기준은 열리기 전에 알려 드려요.</p><p>프리미엄의 디지털 책은 한 시선으로 엮는 PDF예요. 종이책은 따로 주문할 수 있게 준비해요.</p></div>
  <div class="launch-paper"><div><p class="eyebrow">곁에 두고, 소중한 사람에게 건네고</p><h3>당신을 알아보는 책,<br>나를 당신에게 전하는 책.</h3><p>같은 기록을 두 시선으로 엮은 이야기.<br>두 이야기를 합쳐 48쪽 이상이면 양장본 한 권에 두 부로, 48쪽에 못 미치면 소책자 두 권으로 담아요.<br>구독 없이도 따로 주문할 수 있게 준비해요.</p></div><div class="launch-paper-price"><p>종이책 · 두 시선 한 세트</p><strong>{POLICY['paperBook']['price']:,}<span>원</span></strong><p class="launch-caption">48쪽 이상 양장본 한 권 · 그보다 짧으면 소책자 두 권 · 같은 값이에요. 주문 준비 중이고, 사양과 배송은 주문 전에 먼저 알려 드려요.</p><a class="launch-detail-link" href="/keepsakes/">두 시선의 구성 예시 보기 ↗</a></div></div>
  <aside class="launch-beta" aria-labelledby="beta-title"><h3 id="beta-title">지금은 결제 없이 모두 써요.</h3><p>유료가 열리기 전에 먼저 알려 드리고, 자동으로 결제되지 않아요.{' 책 이벤트도 결제 없이 응모해요.' if EVENT_ON else ''}</p></aside>
</section>'''



# 온순간 가치 동참 — 이용 요금을 '함께 이어 가는 일'의 결로. 금액·제공 범위는 launch-policy.json 그대로(출시 예정, 결제 없음).
VALUE_COST = (
    ('기록 · 다시 읽기', '내 글과 사진을 담고 펼치는 일이라, 모두가 온순간을 쉽게 누리도록', '늘 무료로 열어 둬요.'),
    ('AI 비춤 · 돌아보기', 'AI가 내 글을 읽고 다른 시선으로 답할 때마다, 읽고 쓰는 글자만큼 AI 토큰 비용이 들어요.', '자주, 깊이 만날수록 비용도 함께 커져요.'),
    ('이야기책 엮기', '한 달의 기록을 처음부터 끝까지 읽고 한 권으로 엮어요. 가장 많은 토큰이 드는 일이에요.', '그래서 프리미엄에 담았어요.'),
)
VALUE_MEANING = {
    'free': '온순간의 문은 누구에게나 열려 있어요.',
    'basic': '내가 AI와 만나는 시간을, 내가 함께 채워요.',
    'premium': '내 이야기책을 엮고, 다음 사람의 첫 기록까지 함께 지켜요.',
}
VALUE_ROWS = (
    ('글 · 사진 · 목소리 기록', ('✓', '✓', '✓')),
    ('다시 읽기 · 내 말로 돌아보기', ('✓', '✓', '✓')),
    ('내보내기 · 지우기', ('✓', '✓', '✓')),
    ('AI 비춤', ('맛보기', '넉넉히', '가장 넉넉히')),
    ('지난 기록까지 잇는 깊은 돌아보기', ('', '✓', '✓')),
    ('한 주 · 한 달 다시 만나기', ('', '✓', '✓')),
    ('디지털 이야기책(PDF)', ('', '', '월 1권')),
)


def value_section():
    plans = POLICY['plans']
    months = POLICY['annualPromotion']['durationMonths']
    cost = ''.join(f'<li><h3>{esc(t)}</h3><p>{esc(d)}</p><p class="value-cost-note">{esc(n)}</p></li>' for t, d, n in VALUE_COST)
    cards = []
    for plan in plans:
        free = plan['key'] == 'free'
        features = ''.join(f'<li>{esc(item)}</li>' for item in plan['features'])
        if free:
            price = '<p class="value-price"><strong>0</strong>원</p><p class="value-annual"><span>처음부터, 언제까지나</span></p>'
            action = '<a class="button primary" href="__APP__/start?src=value-free" data-app-link data-story-link>지금 한 줄 남기기 ↗</a>'
        else:
            total = plan['annualPromotionPrice']
            if not isinstance(total, int) or total <= 0 or months != 12 or total % months:
                raise ValueError('Expected a 12-month annual amount with an exact monthly equivalent.')
            price = (f'<p class="value-price"><span>월 </span><strong>{plan["price"]:,}</strong>원</p>'
                     f'<p class="value-annual">1년 동참이면 <strong>월 {total // months:,}원</strong><span>연 {total:,}원 · 한 번 결제 · 자동 갱신 없이</span></p>')
            action = '<p class="value-soon">출시 예정 · 지금은 결제 없이 무료로 써요</p>'
        cards.append(f'<article class="value-plan value-plan-{esc(plan["key"])}"><p class="value-plan-name">{esc(plan["name"])}</p>'
                     f'<p class="value-meaning">{esc(VALUE_MEANING[plan["key"]])}</p>{price}<ul>{features}</ul>{action}</article>')
    head_cells = ''.join(f'<th scope="col">{esc(p["name"])}</th>' for p in plans)
    dash = '<span class="value-dash" aria-label="없음">·</span>'
    body = ''.join('<tr><th scope="row">' + esc(label) + '</th>' + ''.join(f'<td>{esc(v) if v else dash}</td>' for v in vals) + '</tr>' for label, vals in VALUE_ROWS)
    paper = POLICY['paperBook']['price']
    return (
        '<section class="value-hero section wrap" aria-labelledby="value-title">'
        '<p class="eyebrow">온순간 가치 동참 · 출시 예정</p>'
        '<h1 id="value-title">오늘이 선물이 되는 시간을,<br>함께 이어 가요.</h1>'
        '<p>기록하고 다시 읽는 일은 누구에게나 늘 무료예요.<br>AI와 더 깊이 만나고 싶을 때 동참해 주세요.<br>그 마음이 온순간을 오늘도, 내일도 이어지게 해요.</p>'
        '<a class="value-jump" href="#value-levels">세 가지 동참 바로 보기 ↓</a>'
        '</section>'
        '<section class="value-cost section wrap" aria-labelledby="value-cost-title">'
        '<div class="section-heading"><p class="eyebrow">동참이 쓰이는 곳</p><h2 id="value-cost-title">AI가 함께하는 시간에는<br>실제 비용이 들어요.</h2>'
        '<p>동참해 주신 마음은 먼저 AI 토큰 비용에 쓰여요.<br>그래서 누구나 첫 한 줄을 편히 남길 수 있어요.</p></div>'
        f'<ol class="value-cost-list">{cost}</ol>'
        '</section>'
        '<section class="value-levels section wrap" id="value-levels" aria-labelledby="value-levels-title">'
        '<div class="section-heading"><p class="eyebrow">세 가지 동참</p><h2 id="value-levels-title">내게 맞는 만큼,<br>함께해요.</h2></div>'
        f'<div class="value-plans">{"".join(cards)}</div>'
        f'<div class="value-table-wrap"><table class="value-table"><caption>동참마다 함께 받는 것</caption><thead><tr><th scope="col">혜택</th>{head_cells}</tr></thead><tbody>{body}</tbody></table></div>'
        '<p class="launch-caption">AI 비춤의 넉넉함과 책을 엮는 범위는 정하는 중이에요. 열리기 전에 정확한 양을 먼저 알려 드려요.</p>'
        '<div class="value-intent"><p>동참할 마음이 있다면, 먼저 알려 주세요.</p><a class="button primary" href="__APP__/plan?src=value" data-app-link>동참 의향 남기기 ↗</a><p class="launch-caption">결제 없이 마음만 남겨요. 앱에 로그인하면 남길 수 있고, 언제든 거둘 수 있어요.</p></div>'
        '</section>'
        '<section class="value-promise section wrap" aria-labelledby="value-promise-title">'
        '<h2 id="value-promise-title">지금 드리는 약속</h2><ul>'
        '<li><strong>지금은 결제 없이 무료로 써요.</strong> 결제 · 예약금 · 카드 등록이 없어요.</li>'
        '<li><strong>유료가 열려도 자동으로 결제되지 않아요.</strong> 열리기 전에 먼저 알려 드리고, 동참은 그때 직접 골라요.</li>'
        '<li><strong>1년 동참은 12개월 한 번, 자동 갱신 없이.</strong> AI 이용량과 책은 매달 나눠 드려요.</li>'
        '<li><strong>무료로 돌아가도 내 기록은 그대로예요.</strong> 언제든 다시 읽고, 내보내고, 지울 수 있어요.</li>'
        '</ul></section>'
        '<section class="launch-paper section wrap"><div><p class="eyebrow">곁에 두고, 소중한 사람에게 건네고</p><h3>당신을 알아보는 책,<br>나를 당신에게 전하는 책.</h3>'
        '<p>같은 기록을 두 시선으로 엮은 이야기.<br>두 이야기를 합쳐 48쪽 이상이면 양장본 한 권에 두 부로, 48쪽에 못 미치면 소책자 두 권으로 담아요.<br>동참과 상관없이 따로 주문할 수 있게 준비해요.</p></div>'
        f'<div class="launch-paper-price"><p>종이책 · 두 시선 한 세트</p><strong>{paper:,}<span>원</span></strong>'
        '<p class="launch-caption">48쪽 이상 양장본 한 권 · 그보다 짧으면 소책자 두 권 · 같은 값이에요. 주문 준비 중이고, 사양과 배송은 주문 전에 먼저 알려 드려요.</p><a class="launch-detail-link" href="/keepsakes/">두 시선의 구성 예시 보기 ↗</a></div></section>'
    )

def pricing_teaser():
    """Home keeps one light strip; full plans live on /pricing/."""
    rows = []
    for plan in POLICY['plans']:
        if plan['key'] == 'free':
            rows.append(f'<li><span>{esc(plan["name"])}</span><strong>0원</strong><small>기록 · 다시 읽기 · 내보내기</small></li>')
        else:
            monthly = plan['annualPromotionPrice'] // POLICY['annualPromotion']['durationMonths']
            rows.append(f'<li><span>{esc(plan["name"])}</span><strong>월 {plan["price"]:,}원</strong><small>1년 이용권이면 월 {monthly:,}원</small></li>')
    return f'''<section class="launch-pricing-teaser section wrap" id="pricing" aria-labelledby="pricing-teaser-title">
  <div class="section-heading"><p class="eyebrow">이용 요금 · 출시 예정</p><h2 id="pricing-teaser-title">기록하고 다시 읽는 일은<br>늘 무료예요.</h2><p>더 자주, 더 깊이 만나고 싶을 때 고를 수 있게 준비하고 있어요. <br>지금은 결제 없이, 무료로 써요.</p></div>
  <ul class="launch-teaser-plans">{''.join(rows)}</ul>
  <a class="button secondary" href="/pricing/">요금과 제공 내용 자세히 보기 →</a>
</section>'''


PRICING_QS = ('유료가 열리면 자동으로', '1년 이용권은 얼마', '1년 이용이 끝나면', '1년치 AI', '디지털 책과 종이책')


def launch_faq(scope='home'):
    pairs = [
        ('지금은 무엇부터 시작할 수 있나요?', '앱에서 마음에 남은 장면을 쓰고, 가입하면 내 기록으로 저장돼요. 다시 읽고 내 말로 돌아보기, 카드와 대표 장 만들기, 함께에서 고른 글 나누기까지 지금 할 수 있어요. 이 페이지의 이야기와 책 이미지는 가상 예시이고, 종이책 주문은 준비하고 있어요.'),
        ('유료가 열리면 자동으로 결제되나요?', '아니요. 유료 이용이 열리면 요금과 제공 범위를 먼저 알려 드리고, 쓰고 싶은 분만 그때 직접 골라요.'),
        ('1년 이용권은 얼마이며, 언제 시작하나요?', f"기본 {PLAN_BY_KEY['basic']['annualPromotionPrice']:,}원, 프리미엄 {PLAN_BY_KEY['premium']['annualPromotionPrice']:,}원을 한 번에 결제하는 12개월 이용권으로 준비해요. 월로 나누면 각각 {PLAN_BY_KEY['basic']['annualPromotionPrice'] // 12:,}원, {PLAN_BY_KEY['premium']['annualPromotionPrice'] // 12:,}원이에요. 지금은 결제나 예약금을 받지 않아요. 유료 이용이 열린 뒤 원할 때 직접 결제한 날부터 12개월이에요."),
        ('1년 이용이 끝나면 어떻게 되나요?', '자동 갱신 없이 끝나요. 끝나기 전에 먼저 알려 드리고, 이어갈지는 그때 직접 골라요. 무료로 돌아가도 남긴 기록은 그대로 다시 읽을 수 있어요.'),
        ('1년치 AI와 책 제작권을 한 번에 받나요?', '1년 이용권이어도 AI 이용량과 책은 매달 나눠 드려요. 프리미엄 디지털 책은 월 1권이고, 종이책은 따로예요. 제공량 · 사용 기한 · 남은 양의 처리는 결제 전에 먼저 알려 드려요.'),
        ('책 선물 이벤트에는 어떻게 응모하나요?', '11월 13일부터 19일까지 온순간 ‘오늘’의 이벤트 카드에서 제작 안내와 동의 내용을 확인하고 응모해요. 11월 13~19일 중 서로 다른 3일 이상 기록하고, 제작에 동의하며 편집본 확인에 참여할 수 있는 분 가운데 세 분을 11월 20일에 추첨해요.'),
        ('책을 받으려면 매일 쓰거나 결제해야 하나요?', '서로 다른 3일이면 충분해요. 연속으로 쓰지 않아도 되고, 결제나 친구 초대는 응모 조건이 아니에요. 글 한 줄이나 사진 한 장도 하루의 장면이에요.'),
        ('디지털 책과 종이책은 어떻게 다른가요?', '프리미엄에 포함할 디지털 책은 한 시선의 PDF 1종이에요. 별도 종이책 상품은 ‘당신을 알아보는 책’과 ‘나를 당신에게 전하는 책’, 두 시선을 한 세트로 49,000원에 준비하고 있어요. 두 이야기를 합쳐 48쪽 이상이면 양장본 한 권에 두 부로, 48쪽에 못 미치면 소책자 두 권으로 엮어요. 이 페이지의 천 표지 이미지는 방향을 보여주는 시안이에요.'),
        ('온순간을 초대하면 내 기록도 공개되나요?', '아래 초대 버튼은 온순간의 공개 소개 주소만 건네요. 내 기록이나 개인 초대 코드는 함께 보내지 않아요. 개인 이야기를 건네는 일은 앱에서 별도로 선택해요.'),
    ]
    if not EVENT_ON:
        pairs = [(q, a) for q, a in pairs if '이벤트' not in q and '책을 받으려면' not in q]
    is_pricing = lambda q: any(q.startswith(p) for p in PRICING_QS)
    pairs = [(q, a) for q, a in pairs if is_pricing(q) == (scope == 'pricing')]
    rows = ''.join(f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q, a in pairs)
    eyebrow = '요금에 대해 자주 묻는 것' if scope == 'pricing' else '마음 편히 시작하도록'
    return f'<section class="section faq wrap launch-faq"><div><p class="eyebrow">{eyebrow}</p><h2>작은 궁금함에,<br>작은 답을.</h2></div><div>{rows}</div></section>'


def invite_section():
    return '''<aside class="launch-invite wrap" aria-labelledby="invite-title"><p class="eyebrow">이런 시간이 생각나는 분께</p><h2 id="invite-title">온순간을 건네주세요.</h2><p>잘 쓰거나 매일 쓰지 않아도 괜찮은 곳.<br>카카오톡 등 편한 곳에서 이 시간을 나눠주세요.</p><div class="launch-invite-actions"><button type="button" class="button secondary" data-launch-share hidden>초대 링크 공유하기 ↗</button><button type="button" class="button secondary" data-launch-copy>초대 링크 복사</button></div><p class="launch-caption">개인 기록 없이, 온순간 소개 링크만 전해요.</p><p class="launch-share-status" role="status" aria-live="polite" aria-atomic="true" data-launch-status></p><div class="launch-copy-fallback" data-launch-fallback hidden><label for="public-invite-url">이 주소를 복사해 보내주세요.</label><input id="public-invite-url" type="url" readonly value="https://onmoment.kr/?src=invite"></div></aside>'''
