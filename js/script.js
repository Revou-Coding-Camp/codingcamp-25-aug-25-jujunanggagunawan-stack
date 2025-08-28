// js/script.js
document.addEventListener('DOMContentLoaded', function () {
  function $(sel, root) { return (root || document).querySelector(sel); }

  // ---------- HERO (greeting) ----------
  const greetForm = $('#greet-form');
  const inputName = $('#input-name');
  const greetSpan = $('#greet-name');

  // ---------- MASSAGE US ----------
  const msgForm = $('#msgform');
  const muName  = $('#mu-name');
  const muDate  = $('#mu-date');
  const muMsg   = $('#mu-msg');

  const preview = $('.msgus-preview');
  const pNow    = $('#mu-now');
  const pName   = $('#p-name');
  const pDate   = $('#p-date');
  const pGender = $('#p-gender');
  const pMsg    = $('#p-msg');

  if (preview) {
    preview.hidden = true;
    preview.style.display = 'none';
    preview.setAttribute('aria-hidden', 'true');
  }

  function tickNow(){
    if (!pNow) return;
    pNow.textContent = new Intl.DateTimeFormat('id-ID', {
      weekday:'short', day:'2-digit', month:'short', year:'numeric',
      hour:'2-digit', minute:'2-digit', second:'2-digit',
      timeZone:'Asia/Jakarta', timeZoneName:'short'
    }).format(new Date());
  }
  tickNow();
  setInterval(tickNow, 1000);

  function updatePreview(){
    if (pName)   pName.textContent   = (muName && muName.value.trim()) || '—';
    if (pDate)   pDate.textContent   = (muDate && muDate.value.trim()) || '—';
    const g = document.querySelector('input[name="gender"]:checked');
    if (pGender) pGender.textContent = g ? g.value : '—';
    if (pMsg)    pMsg.textContent    = (muMsg && muMsg.value.trim()) || '—';
  }

  if (msgForm) {
    msgForm.addEventListener('input',  updatePreview);
    msgForm.addEventListener('change', updatePreview);

    msgForm.addEventListener('submit', function (e) {
      e.preventDefault();
      updatePreview();
      if (preview) {
        preview.hidden = false;
        preview.style.removeProperty('display');
        preview.removeAttribute('aria-hidden');
      }
    });

    updatePreview();
  }

  if (inputName && greetSpan) {
    inputName.addEventListener('input', function () {
      greetSpan.textContent = this.value.trim() || 'Guest';
    });
  }

  if (greetForm) {
    greetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (inputName && inputName.value.trim()) || 'Guest';
      if (greetSpan) greetSpan.textContent = name;
      greetForm.style.display = 'none';
      const hero = greetForm.closest('.hero-copy');
      const helpP = hero ? $('p', hero) : null;
      if (helpP) helpP.style.display = 'none';
      if (muName) muName.value = name;
      updatePreview();
      history.replaceState(null, '', location.pathname);
    });
  }
});
