// Enrolment form: validates, then opens WhatsApp with the enquiry pre-filled
// (or posts to FORM_ENDPOINT if one is configured).
import { SITE, whatsappLink } from '../data/site';

// Optional: e.g. https://formspree.io/f/xxxxxxx — when set, the form posts here instead of opening WhatsApp.
const FORM_ENDPOINT = '';

const form = document.getElementById('enrolForm') as HTMLFormElement | null;

if (form) {
  const statusEl = document.getElementById('formStatus')!;
  const tzInput = document.getElementById('timezone') as HTMLInputElement;
  const tzLabel = document.getElementById('tzLabel')!;
  const courseSelect = document.getElementById('course') as HTMLSelectElement;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    tzInput.value = tz;
    tzLabel.textContent = tz.replace(/_/g, ' ');
  } catch {
    tzLabel.textContent = 'not detected';
  }

  // "Choose this plan" buttons pre-select the matching course.
  document.querySelectorAll<HTMLElement>('[data-course]').forEach((btn) => {
    btn.addEventListener('click', () => {
      courseSelect.value = btn.dataset.course ?? '';
      courseSelect.closest('.field')?.classList.remove('is-invalid');
    });
  });

  const setStatus = (msg: string, isError = false) => {
    statusEl.textContent = msg;
    statusEl.classList.toggle('is-error', isError);
  };

  const checks: [string, (v: string) => boolean][] = [
    ['name', (v) => v.trim().length > 1],
    ['phone', (v) => v.replace(/\D/g, '').length >= 7],
    ['email', (v) => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
    ['course', (v) => v !== ''],
  ];

  const validate = () => {
    let firstInvalid: HTMLElement | null = null;
    for (const [id, ok] of checks) {
      const input = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
      const valid = ok(input.value);
      input.closest('.field')?.classList.toggle('is-invalid', !valid);
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid && !firstInvalid) firstInvalid = input;
    }
    return firstInvalid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = validate();
    if (invalid) {
      setStatus('Please add your name, a WhatsApp number and a course.', true);
      invalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (FORM_ENDPOINT) {
      const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
      button.disabled = true;
      setStatus('Sending…');
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        tzInput.value = data.timezone || '';
        setStatus("JazakAllahu khayran! We'll contact you on WhatsApp soon.");
      } catch {
        setStatus(`Something went wrong. Please message us on WhatsApp or email ${SITE.email}.`, true);
      } finally {
        button.disabled = false;
      }
      return;
    }

    const message = [
      "Assalamu alaikum! I'd like to enrol at Mirqat Institute.",
      '',
      `Name: ${data.name}`,
      `WhatsApp: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      `Course: ${data.course}`,
      `Student: ${data.student}`,
      `Class length: ${data.length}`,
      data.timezone ? `Time zone: ${data.timezone}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const url = whatsappLink(message);
    // window.open with "noopener" always returns null, so detach the opener manually.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    setStatus('WhatsApp should open with your details — just press send.');
  });
}
