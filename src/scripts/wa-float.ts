// Floating WhatsApp greeting: shows once per browser session after a short delay.
const bubble = document.getElementById('waGreeting');
const close = document.getElementById('waGreetingClose');
const KEY = 'mirqat-wa-greeting-dismissed';

const dismissed = () => {
  try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
};
const remember = () => {
  try { sessionStorage.setItem(KEY, '1'); } catch { /* storage unavailable */ }
};

if (bubble && close && !dismissed()) {
  setTimeout(() => {
    // Don't cover the enrolment form if the visitor is already there.
    const enrol = document.getElementById('enrol');
    if (enrol) {
      const r = enrol.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) return;
    }
    bubble.hidden = false;
    requestAnimationFrame(() => bubble.classList.add('is-in'));
  }, 6000);

  const hide = () => {
    bubble.classList.remove('is-in');
    remember();
    setTimeout(() => { bubble.hidden = true; }, 250);
  };
  close.addEventListener('click', hide);
  bubble.querySelector('a')?.addEventListener('click', hide);
  document.querySelector('.wa-float__btn')?.addEventListener('click', remember);
}
