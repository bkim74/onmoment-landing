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
            annual = f'''<div class="launch-annual-preview"><span>출시 예정 · 베타 첫 1년 혜택</span><strong>연 {total:,}원</strong><p>12개월 일시결제 예정<br>월 환산 {total // months:,}원</p></div>'''
        cards.append(f'''<article class="launch-plan launch-plan-{esc(plan['key'])}"><p class="launch-plan-label">{esc(plan['name'])}</p><h3>{esc(plan['tagline'])}</h3><p class="launch-price">{'' if free else '<span>월 </span>'}{plan['price']:,}<span>원</span></p>{annual}<p class="launch-plan-description">{esc(plan['description'])}</p><ul>{features}</ul>{action}</article>''')
    return f'''<section class="launch-pricing section wrap" id="pricing" aria-labelledby="pricing-title">
  <div class="section-heading"><p class="eyebrow">정식 출시 예정 요금</p><h2 id="pricing-title">내게 맞는 만큼,<br>온순간과 함께해요.</h2><p>기록은 무료로 시작하고,<br>AI와 더 자주 돌아보고 싶을 때 선택하세요.</p></div>
  <div class="launch-plans">{''.join(cards)}</div>
  <div class="launch-plan-notes" id="plan-details"><p><strong>90일 동안 만나보고, 이어갈지는 내 뜻으로.</strong> 체험 종료만으로 유료로 전환되지 않아요. 무료로 계속 이용할 수 있고, 유료 서비스가 준비된 뒤 원할 때 직접 선택해요.</p><p>베타 참여자의 첫 연간 혜택은 체험과 별도 12개월, 자동갱신 없는 1년 이용권으로 준비해요. 체험 종료와 판매 개시 이후 직접 결제한 날부터 시작하며, AI 이용량과 책 제작권은 매달 제공할 예정이에요.</p><p><strong>지금은 예정 가격을 안내하는 단계예요.</strong> 결제나 예약금을 받지 않으며 구매 의무가 없어요. 혜택 대상·신청 기간·AI 제공량·중도해지와 환불 기준은 판매 시작 전에 안내해요. 판매 준비가 늦어져도 구매할 수 없었던 기간 때문에 혜택 신청 기회를 잃지 않도록 준비해요.</p><p>프리미엄의 디지털 책은 한 시선으로 엮는 PDF 1종이에요. 종이책 제작·배송은 별도 상품으로 준비해요.</p></div>
  <div class="launch-paper"><div><p class="eyebrow">곁에 두고, 소중한 사람에게 건네고</p><h3>당신을 알아보는 책,<br>나를 당신에게 전하는 책.</h3><p>같은 기록을 두 시선으로 엮는 이야기책 두 권.<br>유료 구독 없이도 주문할 수 있도록 준비하고 있어요.</p></div><div class="launch-paper-price"><p>종이책 2권 · 한 세트</p><strong>{POLICY['paperBook']['price']:,}<span>원</span></strong><p class="launch-caption">주문 준비 중 · 최종 사양과 배송 조건은 주문 전에 안내해요.</p><a class="launch-detail-link" href="/keepsakes/">두 시선의 구성 예시 보기 ↗</a></div></div>
  <aside class="launch-beta" aria-labelledby="beta-title"><h3 id="beta-title">초대로 시작한 90일 체험은 그대로.</h3><p>기존에 안내받은 90일 무료 혜택은 유지해요. 내게 적용되는 기능과 종료일은 초대 안내와 앱에서 확인해 주세요.{' 책 이벤트 응모 기간과 체험 기간은 별개예요.' if EVENT_ON else ''}</p></aside>
</section>'''


def launch_faq():
    pairs = [
        ('지금은 무엇부터 시작할 수 있나요?', '앱에서 마음에 남은 장면을 쓰고, 가입하거나 로그인해 저장할 수 있어요. 이 페이지의 이야기·카드·책은 가상 예시이며, 실제 사용할 수 있는 기능은 앱의 안내를 따라주세요. 자동 책 제작과 종이책 주문, 함께 쓰기는 준비하고 있어요.'),
        ('무료 체험이 끝나면 자동 결제되나요?', '유료 이용은 가격과 제공 범위를 확인한 뒤 직접 선택하는 방식으로 준비해요. 무료 체험이 끝났다는 이유만으로 결제하지 않아요. 기존 90일 혜택의 적용 범위와 종료일은 초대 안내와 앱에서 확인해 주세요.'),
        ('연간 혜택은 얼마이며, 언제 시작하나요?', f"베타 참여자의 첫 연간 결제는 기본 {PLAN_BY_KEY['basic']['annualPromotionPrice']:,}원, 프리미엄 {PLAN_BY_KEY['premium']['annualPromotionPrice']:,}원을 한 번에 결제하는 방식으로 준비해요. 월 환산액은 각각 {PLAN_BY_KEY['basic']['annualPromotionPrice'] // 12:,}원, {PLAN_BY_KEY['premium']['annualPromotionPrice'] // 12:,}원이에요. 지금은 결제나 예약금을 받지 않아요. 90일 체험 종료와 판매 개시 이후, 원할 때 직접 결제한 날부터 별도 12개월을 이용해요. 적용 대상과 신청 기간은 판매 시작 전에 안내해요."),
        ('1년 이용이 끝나면 어떻게 되나요?', '이번 혜택은 자동갱신 없는 1년 이용권으로 준비해요. 이용 기간이 끝나기 전에 안내하고, 이어갈 때의 요금은 다시 확인한 뒤 직접 선택해요. 무료 이용을 선택해도 기존 기록을 다시 읽을 수 있도록 유지해요.'),
        ('1년치 AI와 책 제작권을 한 번에 받나요?', '연간 결제여도 AI 이용량과 책 제작권은 매달 제공해요. 프리미엄 디지털 책은 월 1권이며 종이책은 별도예요. 제공량과 사용 기한, 남은 제공량의 처리 방식은 결제 전에 안내해요.'),
        ('책 선물 이벤트에는 지금 응모할 수 있나요?', '아직 응모 전이에요. 참여 기간과 제작·배송 조건이 확정되면 응모 방법을 안내해요. 지금은 먼저 기록을 남기며 온순간을 경험할 수 있어요.'),
        ('책을 받으려면 매일 쓰거나 결제해야 하나요?', '서로 다른 3일의 기록, 한 번의 돌아보기, 한 번의 솔직한 의견을 나누고 응모하는 방식을 준비하고 있어요. 연속 출석이나 유료 결제, 친구 초대를 조건으로 두지 않아요. 최종 조건은 응모 시작 전에 안내해요.'),
        ('디지털 책과 종이책은 어떻게 다른가요?', '프리미엄에 포함할 디지털 책은 한 시선의 PDF 1종이에요. 별도 종이책 상품은 ‘당신을 알아보는 책’과 ‘나를 당신에게 전하는 책’, 두 시선의 소책자 2권 한 세트, 49,000원으로 준비하고 있어요. 이 페이지의 천 표지 이미지는 방향을 보여주는 시안이에요.'),
        ('온순간을 초대하면 내 기록도 공개되나요?', '아래 초대 버튼은 온순간의 공개 소개 주소만 건네요. 내 기록이나 개인 초대 코드는 함께 보내지 않아요. 개인 이야기를 건네는 일은 앱에서 별도로 선택해요.'),
    ]
    if not EVENT_ON:
        pairs = [(q, a) for q, a in pairs if '이벤트' not in q and '책을 받으려면' not in q]
    rows = ''.join(f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q, a in pairs)
    return f'<section class="section faq wrap launch-faq"><div><p class="eyebrow">마음 편히 시작하도록</p><h2>작은 궁금함에,<br>작은 답을.</h2></div><div>{rows}</div></section>'


def invite_section():
    return '''<aside class="launch-invite wrap" aria-labelledby="invite-title"><p class="eyebrow">이런 시간이 생각나는 분께</p><h2 id="invite-title">온순간을 건네주세요.</h2><p>잘 쓰거나 매일 쓰지 않아도 괜찮은 곳.<br>카카오톡 등 편한 곳에서 이 시간을 나눠주세요.</p><div class="launch-invite-actions"><button type="button" class="button secondary" data-launch-share hidden>초대 링크 공유하기 ↗</button><button type="button" class="button secondary" data-launch-copy>초대 링크 복사</button></div><p class="launch-caption">개인 기록 없이, 온순간 소개 링크만 전해요.</p><p class="launch-share-status" role="status" aria-live="polite" aria-atomic="true" data-launch-status></p><div class="launch-copy-fallback" data-launch-fallback hidden><label for="public-invite-url">이 주소를 복사해 보내주세요.</label><input id="public-invite-url" type="url" readonly value="https://onmoment.kr/?src=invite"></div></aside>'''
