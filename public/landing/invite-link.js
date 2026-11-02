// 초대 링크(onmoment.kr/?code=…&src=…)로 온 사람의 앱 버튼이 초대 입구로 가게 한다.
// 코드가 없는 방문자에게는 아무것도 하지 않는다. 코드는 이 탭 안에만 두고 주소창에서 지운다.
(() => {
  const KEY = 'om:invite';
  const SRC = /^[a-z0-9][a-z0-9-]{0,31}$/; // 앱 parseSource 와 같은 형식
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  let invite = null;

  if (code && code.length <= 128) {
    const src = params.get('src');
    invite = { code, src: src && SRC.test(src) ? src : null };
    try {
      sessionStorage.setItem(KEY, JSON.stringify(invite));
      params.delete('code');
      params.delete('src');
      const rest = params.toString();
      history.replaceState(null, '', location.pathname + (rest ? `?${rest}` : '') + location.hash);
    } catch {}
  } else {
    try { invite = JSON.parse(sessionStorage.getItem(KEY)); } catch {}
  }
  if (!invite || !invite.code) return;

  const appOrigin = () => {
    const link = document.querySelector('a[data-app-link]');
    return link ? new URL(link.href).origin : 'https://app.onmoment.kr';
  };
  // 이야기 맥락(여정·방식·계기)은 코드와 함께 입구로 넘긴다. 값 검사는 앱이 다시 한다.
  const inviteHref = (origin, src, from) => {
    let href = `${origin}/invite?code=${encodeURIComponent(invite.code)}&src=${encodeURIComponent(invite.src || src || 'invite')}`;
    ['journey', 'way', 'occasion'].forEach((k) => {
      const v = from && from.searchParams.get(k);
      if (v) href += `&${k}=${encodeURIComponent(v)}`;
    });
    return href;
  };

  const apply = (a) => {
    const u = new URL(a.href);
    if (a.dataset.inviteBeta) {
      a.href = inviteHref(appOrigin(), null);
    } else if (a.dataset.inviteSrc) {
      a.href = inviteHref(u.origin, a.dataset.inviteSrc, u);
    } else if (u.origin === location.origin && /^\/beta\/?$/.test(u.pathname)) {
      // 이미 초대받은 사람에게는 참여 신청 대신 앱 입구를 연다.
      a.dataset.inviteBeta = '1';
      a.textContent = '베타 앱 열기 ↗';
      a.href = inviteHref(appOrigin(), null);
    } else if (a.hasAttribute('data-app-link') || (u.hostname === 'app.onmoment.kr' && /^\/(start|today)?\/?$/.test(u.pathname))) {
      const src = u.searchParams.get('src');
      a.dataset.inviteSrc = src && SRC.test(src) ? src : 'invite';
      a.href = inviteHref(u.origin, a.dataset.inviteSrc, u);
    }
  };

  document.querySelectorAll('[data-uninvited]').forEach((el) => { el.style.display = 'none'; });
  document.querySelectorAll('a[href]').forEach(apply);
  // 나중에 그려진 링크와 시범 화면의 앱 주소 교체까지 누르는 순간 다시 맞춘다.
  ['click', 'auxclick', 'contextmenu'].forEach((type) => {
    document.addEventListener(type, (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (a) apply(a);
    }, true);
  });
})();
