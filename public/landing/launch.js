// Public invitation only. Never inherit query strings, private codes or record data.
(() => {
  'use strict';
  const PUBLIC_INVITE = 'https://onmoment.kr/?src=invite';
  const shareButton = document.querySelector('[data-launch-share]');
  const copyButton = document.querySelector('[data-launch-copy]');
  const status = document.querySelector('[data-launch-status]');
  const fallback = document.querySelector('[data-launch-fallback]');
  if (!copyButton || !status || !fallback) return;
  const say = text => { status.textContent = text; };
  const showManualCopy = () => {
    fallback.hidden = false;
    const field = fallback.querySelector('input');
    field.focus();
    field.select();
    say('주소를 길게 누르거나 복사해서, 원하는 곳에 보내주세요.');
  };
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PUBLIC_INVITE);
      fallback.hidden = true;
      say('초대 링크를 복사했어요. 카카오톡이나 편한 곳에 붙여넣어 주세요.');
    } catch { showManualCopy(); }
  });
  if (shareButton && typeof navigator.share === 'function') {
    shareButton.hidden = false;
    shareButton.addEventListener('click', async () => {
      try {
        await navigator.share({title: '온순간, 가장 나답게.', text: '마음에 남은 하루를 한 줄로 남기고, 나를 조금 더 알아가는 곳. 이런 시간이 생각나는 분께 온순간을 건네주세요.', url: PUBLIC_INVITE});
        say('실제 전송 여부는 공유한 앱에서 확인해 주세요.');
      } catch (error) {
        if (error?.name === 'AbortError') say('공유를 취소했어요. 원할 때 다시 건넬 수 있어요.');
        else showManualCopy();
      }
    });
  }
})();
