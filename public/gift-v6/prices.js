/* 이야기 초상 가격 · 나눔 구성 단가의 단일 출처 — 숫자는 이 파일에서만 고친다(landing.js 는 읽기만 한다).
 *   catalog  = 기준 상품(디지털 · 액자 · 엽서 세트) 예시 가격과 안내 문구
 *   kitUnits = 여정별 행사 나눔 구성 [이름, 구성, 개당 가격] (v6 화면에서는 더 이상 그리지 않음)
 *   options  = 행사 패키지 옵션 목록(label · use=그날의 쓰임 · price · unit 'set' 한 벌 / 'per' 부당, 30부부터)
 *   bundles  = 여정별 [recommended 먼저 켜짐, more 그 밖 선택] — 출처 15_EVENT_LIVE_PACKAGES_v2.md
 */
window.ONMOMENT_PRICES = {
  catalog: {digital:{label:'디지털 초상',price:4900,note:'온순간이 그리는 초상 한 장의 예시 가격이에요. 마음에 들지 않으면 한 번 다시 그려 드려요. 따뜻한 그림과 판화 두 판 세트는 7,900원, 사람이 닮음을 확인하는 초상은 19,000원이에요.'},frame:{label:'액자 초상',price:39000,note:'원목 액자 8×10 · 초상 포함 · 배송 기준 예시 가격이에요.'},postcards:{label:'접이 카드 5장 · 봉투',price:9900,note:'앞면엔 초상, 안쪽엔 건네는 말을 담은 접이 카드 5장 기준 예시 가격이에요.'}},
  kitUnits: {"parents":[["이야기 카드 나눔","고급지 카드에 초상과 한 문장 · QR · 봉투",1200],["수건 나눔","호텔 40수 수건에 초상 상징 자수 · 이야기 카드 · 상자",8900],["마음 나눔","수건 · 드립백 2개 · 이야기 카드 · 선물 상자",12900]],"beginnings":[["이야기 카드 나눔","고급지 카드에 초상과 한 문장 · QR · 봉투",1200],["드립백 나눔","스페셜티 드립백 2개 · 이야기 카드 · 종이 상자",3900],["마음 나눔","수건 · 드립백 2개 · 이야기 카드 · 선물 상자",12900]],"couple":[["이야기 카드 나눔","고급지 카드에 초상과 한 문장 · QR · 봉투",1200],["드립백 나눔","스페셜티 드립백 2개 · 이야기 카드 · 종이 상자",3900],["마음 나눔","수건 · 드립백 2개 · 이야기 카드 · 선물 상자",12900]]},
  options: {
    reading:{label:'낭독 5분 세트',use:'가족 말로 짠 낭독 순서표와 사회자 대본을 인쇄해 드려요. 장비 없이 그 자리가 울림이 돼요.',price:19000,unit:'set'},
    wall:{label:'초상 포토월 패널 A1',use:'초상 둘레에 가족 한 줄이 놓여요. 사진 찍는 자리가 돼요.',price:59000,unit:'set'},
    favor:{label:'답례 이야기 카드',use:'초상 앞면에 하객마다 다른 가족 한 줄, 원하는 분께는 QR까지 담아요.',price:1200,unit:'per',min:30},
    favor_drip:{label:'답례 카드 + 드립백',use:'답례 이야기 카드에 스페셜티 드립백 1개를 더해요.',price:3900,unit:'per',min:30},
    book:{label:'그분께 드리는 책 양장',use:'모인 말 전부를 양장 책으로 담아요. 디지털 책은 기본으로 드려요.',price:49000,unit:'set'},
    frame:{label:'초상 액자 8×10',use:'잔치 뒤 집에 두고 보는 한 장이에요.',price:39000,unit:'set'},
    live:{label:'라이브 월',use:'화면이 있는 곳에서 큰 화면에 초상과 하객 한 줄이 떠올라요. 오늘의 선물 나눔(추첨)도 함께해요.',price:29000,unit:'set'},
    capsule:{label:'18살 타임캡슐',use:'하객이 남긴 첫해 한 줄을 봉인해 열여덟 살 생일에 우편으로 보내요.',price:29000,unit:'set'},
    mail_year:{label:'1년 뒤 나에게 우편 카드',use:'오늘의 내 말이 1년 뒤 종이 카드로 도착해요.',price:4900,unit:'set'},
    memory_qr:{label:'기억 방명록 QR 스탠드',use:'이름 대신 그분과의 한 장면을 남기면, 가족에게 기억 책으로 모여요.',price:19000,unit:'set'},
    parents_voice:{label:'부모님 목소리 한 장',use:'자녀가 보낸 질문 세 개에 부모님이 말로 답하면, 그 말 그대로 책의 첫 장이 돼요.',price:19000,unit:'set'},
    thanks_reading:{label:'감사의 여정 낭독',use:'그간의 수고에 대한 자녀 · 손주의 감사를 미리 모아, 그날 차례대로 읽는 순서표와 사회자 대본으로 드려요.',price:19000,unit:'set'},
    couple_reveal:{label:'서로 열기 카드',use:'두 사람이 각자 쓴 한 줄이 함께 열리는 두 면 카드예요. 디지털은 기본으로 드려요.',price:9900,unit:'set'},
    farewell_box:{label:'송별 상자',use:'동료마다 한 장씩 실물 카드와 함께한 시간 초상을 상자에 담아요. 회사 결제용 견적서도 드려요.',price:59000,unit:'set'},
    group_book:{label:'한 해 모임 책',use:'각자 한 쪽과 단체 초상을 한 권으로. 디지털 책은 기본, 인쇄본은 한 권씩.',price:19000,unit:'per',min:5,step:1},
    teen_desk:{label:'책상 위 접이 카드',use:'책상 위에 세워 두고 보는 접이 카드예요.',price:9900,unit:'set'}
  },
  bundles: {
    parents:{recommended:['parents_voice','thanks_reading','favor'],more:['wall','book','frame','live']},
    beginnings:{recommended:['capsule','favor'],more:['reading','book','frame','live']},
    teen:{recommended:['teen_desk'],more:['frame']},
    retire:{recommended:['farewell_box','book'],more:['live','reading','favor','frame']},
    together:{recommended:['group_book','favor'],more:['live','reading']},
    couple:{recommended:['couple_reveal','frame'],more:['book']},
    self:{recommended:['mail_year'],more:['book','frame']},
    remember:{recommended:['memory_qr','book'],more:['frame']}
  }
};
