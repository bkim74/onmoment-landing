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
if POLICY['status'] != 'planned' or POLICY['event']['status'] != 'planned':
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
    return f'''<section class="launch-event section" id="book-event" aria-labelledby="event-title"><div class="wrap launch-event-layout">
  <div class="launch-event-copy"><p class="eyebrow">첫 참여자를 위한 책 선물 · 준비 중</p><h2 id="event-title">내 이야기를<br>책으로 만나는 시간.</h2><p>오늘 남긴 작은 장면이,<br>나와 소중한 사람에게 건네는 이야기가 되도록.</p><p class="launch-event-offer">참여자 <strong>{winners}분께 두 시선의 책 2권 한 세트</strong>를<br>추첨으로 선물하는 이벤트를 준비하고 있어요.</p><p class="launch-caption">참여 기간·제작 사양·배송 범위 확정 후 응모를 열어요.<br>지금은 이벤트 응모를 받기 전입니다.</p><a class="button primary" href="__APP__/start?src=book-event" data-app-link data-story-link>먼저 내 한 줄 남기기 ↗</a></div>
  <div class="launch-event-guide"><p class="launch-guide-label">이런 경험을 함께 나누려 해요</p><ol>
    <li><span aria-hidden="true">01</span><div><h3>서로 다른 3일, 한 장면씩</h3><p>연속으로 쓰지 않아도 괜찮아요.</p></div></li>
    <li><span aria-hidden="true">02</span><div><h3>한 번 돌아보고, 내 말 남기기</h3><p>AI와 함께해도, 스스로 돌아봐도 좋아요.</p></div></li>
    <li><span aria-hidden="true">03</span><div><h3>써 본 느낌, 솔직하게</h3><p>좋았던 점도, 어려웠던 점도 들려주세요.</p></div></li>
  </ol><details class="launch-details"><summary>예정된 참여 방식 자세히 보기</summary><div><p>위 세 가지를 경험하고 직접 응모한 분 중 {winners}분을 추첨할 예정이에요. 유료 결제나 친구 초대 없이도 같은 기회로 참여하도록 준비하고 있어요.</p><p>책 원고는 당첨 후, 간직하고 싶은 기록이 준비되었을 때 함께 엮어요. 인쇄 전 최종 내용은 내가 확인해요.</p><p>응모 기간, 당첨 안내일, 제작권 기한과 배송 조건은 정식 이벤트 안내에서 알려드릴게요. 지금의 기록이 참여 조건에 포함되는지도 그때 확인해 주세요.</p></div></details></div>
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
  <div class="launch-plan-notes" id="plan-details"><p><strong>지금은 결제 없이, 무료로 써요.</strong> 결제 · 예약금 · 카드 등록이 없고, 마음을 남겨도 구매 의무가 생기지 않아요.</p><p>90일 무료 체험이 끝나도 자동으로 결제되지 않아요. 유료 이용이 열리기 전에 앱에서 먼저 알려 드리고, 그때 직접 골라요. 기록하고 다시 읽는 일은 계속 무료예요.</p><p>1년 이용권은 12개월을 한 번에, 자동 갱신 없이 준비해요. AI 이용량과 책은 매달 나눠 드려요. 제공량 · 중도 해지 · 환불 기준은 열리기 전에 알려 드려요.</p><p>프리미엄의 디지털 책은 한 시선으로 엮는 PDF예요. 종이책은 따로 주문할 수 있게 준비해요.</p></div>
  <div class="launch-paper"><div><p class="eyebrow">곁에 두고, 소중한 사람에게 건네고</p><h3>당신을 알아보는 책,<br>나를 당신에게 전하는 책.</h3><p>같은 기록을 두 시선으로 엮은 이야기책 두 권.<br>구독 없이도 따로 주문할 수 있게 준비해요.</p></div><div class="launch-paper-price"><p>종이책 2권 · 한 세트</p><strong>{POLICY['paperBook']['price']:,}<span>원</span></strong><p class="launch-caption">주문 준비 중 · 사양과 배송은 주문 전에 먼저 알려 드려요.</p><a class="launch-detail-link" href="/keepsakes/">두 시선의 구성 예시 보기 ↗</a></div></div>
  <aside class="launch-beta" aria-labelledby="beta-title"><h3 id="beta-title">약속드린 90일 무료 체험은 그대로예요.</h3><p>내게 적용되는 기능과 종료일은 앱에서 확인할 수 있어요.{' 책 이벤트 응모 기간과 체험 기간은 별개예요.' if EVENT_ON else ''}</p></aside>
</section>'''


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


PRICING_QS = ('무료 체험이 끝나면', '1년 이용권은 얼마', '1년 이용이 끝나면', '1년치 AI', '디지털 책과 종이책')


def launch_faq(scope='home'):
    pairs = [
        ('지금은 무엇부터 시작할 수 있나요?', '앱에서 마음에 남은 장면을 쓰고, 가입하면 내 기록으로 저장돼요. 다시 읽고 내 말로 돌아보기, 카드와 대표 장 만들기, 함께에서 고른 글 나누기까지 지금 할 수 있어요. 이 페이지의 이야기와 책 이미지는 가상 예시이고, 종이책 주문은 준비하고 있어요.'),
        ('무료 체험이 끝나면 자동 결제되나요?', '아니요. 체험이 끝났다는 이유만으로 결제되지 않아요. 유료 이용이 열리면 요금과 제공 범위를 먼저 보여 드리고, 그때 직접 골라요. 내 90일 체험의 종료일은 앱에서 확인할 수 있어요.'),
        ('1년 이용권은 얼마이며, 언제 시작하나요?', f"기본 {PLAN_BY_KEY['basic']['annualPromotionPrice']:,}원, 프리미엄 {PLAN_BY_KEY['premium']['annualPromotionPrice']:,}원을 한 번에 결제하는 12개월 이용권으로 준비해요. 월로 나누면 각각 {PLAN_BY_KEY['basic']['annualPromotionPrice'] // 12:,}원, {PLAN_BY_KEY['premium']['annualPromotionPrice'] // 12:,}원이에요. 지금은 결제나 예약금을 받지 않아요. 유료 이용이 열린 뒤 원할 때 직접 결제한 날부터 12개월이에요."),
        ('1년 이용이 끝나면 어떻게 되나요?', '자동 갱신 없이 끝나요. 끝나기 전에 먼저 알려 드리고, 이어갈지는 그때 직접 골라요. 무료로 돌아가도 남긴 기록은 그대로 다시 읽을 수 있어요.'),
        ('1년치 AI와 책 제작권을 한 번에 받나요?', '1년 이용권이어도 AI 이용량과 책은 매달 나눠 드려요. 프리미엄 디지털 책은 월 1권이고, 종이책은 따로예요. 제공량 · 사용 기한 · 남은 양의 처리는 결제 전에 먼저 알려 드려요.'),
        ('책 선물 이벤트에는 지금 응모할 수 있나요?', '아직 응모 전이에요. 참여 기간과 제작·배송 조건이 확정되면 응모 방법을 안내해요. 지금은 먼저 기록을 남기며 온순간을 경험할 수 있어요.'),
        ('책을 받으려면 매일 쓰거나 결제해야 하나요?', '서로 다른 3일의 기록, 한 번의 돌아보기, 한 번의 솔직한 의견을 나누고 응모하는 방식을 준비하고 있어요. 연속 출석이나 유료 결제, 친구 초대를 조건으로 두지 않아요. 최종 조건은 응모 시작 전에 안내해요.'),
        ('디지털 책과 종이책은 어떻게 다른가요?', '프리미엄에 포함할 디지털 책은 한 시선의 PDF 1종이에요. 별도 종이책 상품은 ‘당신을 알아보는 책’과 ‘나를 당신에게 전하는 책’, 두 시선의 소책자 2권 한 세트, 49,000원으로 준비하고 있어요. 이 페이지의 천 표지 이미지는 방향을 보여주는 시안이에요.'),
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
