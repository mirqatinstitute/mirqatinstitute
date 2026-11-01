// WhatsApp enquiry form: tap-to-choose chips, a live preview of the message,
// then opens WhatsApp with everything pre-filled.
import { WA, waLink } from '../data/whatsapp';

const form = document.getElementById('enrolForm') as HTMLFormElement | null;

if (form) {
  const statusEl = document.getElementById('formStatus')!;
  const preview = document.getElementById('waPreview')!;
  const tzInput = document.getElementById('timezone') as HTMLInputElement;
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const courseChips = document.getElementById('courseChips')!;

  try {
    tzInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    /* time zone not available */
  }

  const read = () => {
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    return {
      name: d.name?.trim() || undefined,
      course: d.course || undefined,
      student: d.student || undefined,
      time: d.time || undefined,
      timezone: d.timezone || undefined,
    };
  };

  // Render WhatsApp-style formatting (*bold*) safely in the preview bubble.
  const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const render = () => {
    const html = escape(WA.enrol(read()))
      .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    preview.innerHTML = html;
  };

  const setStatus = (msg: string, isError = false) => {
    statusEl.textContent = msg;
    statusEl.classList.toggle('is-error', isError);
  };

  form.addEventListener('input', () => {
    render();
    if (nameInput.value.trim().length > 1) nameInput.closest('.field')?.classList.remove('is-invalid');
    if (form.querySelector('input[name="course"]:checked')) courseChips.classList.remove('is-invalid');
    if (statusEl.classList.contains('is-error')) setStatus('');
  });

  // "Choose this plan" / course buttons pre-select the matching course chip.
  document.querySelectorAll<HTMLElement>('[data-course]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const radio = form.querySelector<HTMLInputElement>(`input[name="course"][value="${CSS.escape(btn.dataset.course ?? '')}"]`);
      if (radio) {
        radio.checked = true;
        courseChips.classList.remove('is-invalid');
        render();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = read();
    const nameOk = (data.name ?? '').length > 1;
    const courseOk = Boolean(data.course);
    nameInput.closest('.field')?.classList.toggle('is-invalid', !nameOk);
    nameInput.setAttribute('aria-invalid', String(!nameOk));
    courseChips.classList.toggle('is-invalid', !courseOk);

    if (!nameOk || !courseOk) {
      setStatus(!nameOk ? 'Please add your name.' : 'Please choose a course (or “Not sure”).', true);
      (!nameOk ? nameInput : courseChips.querySelector<HTMLInputElement>('input'))?.focus();
      return;
    }

    const url = waLink(WA.enrol(data));
    // window.open with "noopener" always returns null, so detach the opener manually.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    setStatus('✅ WhatsApp is opening with your message — just tap send.');
  });

  render();
}
