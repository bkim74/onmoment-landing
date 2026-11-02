// 시범 화면(*.vercel.app)에서만 ?app= 으로 앱 주소를 바꿔 본다. 운영 주소에서는 아무것도 하지 않는다.
(() => {
  if (!location.hostname.endsWith('.vercel.app')) return;
  let origin = new URLSearchParams(location.search).get('app');
  try {
    if (origin) sessionStorage.setItem('om:app-origin', origin);
    else origin = sessionStorage.getItem('om:app-origin');
  } catch {}
  if (!origin || !/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return;
  document.querySelectorAll('a[data-app-link]').forEach((a) => {
    const u = new URL(a.href);
    a.href = origin + u.pathname + u.search;
  });
})();
