(() => {
  'use strict';
  // FormSubmit delivers to the owner's confirmed inbox; activation is required once.
  // A public submission endpoint is not an API key. Never put a secret here.
  const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/yutakwing001@gmail.com';
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', event => event.preventDefault());
  const status = form.querySelector('[data-contact-status]');
  const button = form.querySelector('button[type=submit]');
  const subject = new URLSearchParams(location.search).get('subject');
  if (subject) form.elements.subject.value = subject.slice(0, 160);
  const show = (text, state = '') => { status.textContent = text; status.dataset.state = state; };
  if (!CONTACT_ENDPOINT) { show(form.dataset.unavailable, 'error'); return; }
  button.disabled = false;
  let pending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form));
    if (fields.company_website) return;
    const payload = {
      name: fields.name.trim(), email: fields.email.trim(), subject: fields.subject.trim(), message: fields.message.trim(),
      _replyto: fields.email.trim(), _subject: `TakWing website: ${fields.subject.trim()}`,
      _url: 'https://yutakwing.github.io/TakWing/contact.html', _template: 'table', _honey: fields.company_website,
    };
    pending = true; button.disabled = true;
    show(form.dataset.sending);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(payload), credentials: 'omit', signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || ![true, 'true'].includes(result.success)) throw new Error('Not confirmed');
      if (/activat|confirm.*email/i.test(result.message || '')) { show(form.dataset.unavailable, 'error'); return; }
      form.reset(); show(form.dataset.success, 'success');
    } catch { show(form.dataset.error, 'error'); }
    finally { pending = false; button.disabled = false; }
  });
})();
