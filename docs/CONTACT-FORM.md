# On-page contact form

9 September 2026: local implementation with FormSubmit email delivery configured.
Inbox activation is still pending; the form is included in the approved 10 September release.

The previous contact page was an alias to Collaborate, whose enquiry buttons
used `mailto:` URLs. `generate-site.mjs` now generates a dedicated contact page
in English, Traditional Chinese and Simplified Chinese. Homepage/collaboration
and speaking-topic enquiries link to the form, with the subject prefilled.

Source files:
- `contact-form-content.mjs`: translated form fields/status messages.
- `assets/contact-form.css`: responsive accessible form styling.
- `assets/contact-form.js`: validation, background POST and delivery states.
- `generate-site.mjs`: durable page generation and contact-link changes.

Delivery destination: `yutakwing001@gmail.com`, explicitly selected by the owner.
The public AJAX endpoint is `https://formsubmit.co/ajax/yutakwing001@gmail.com`.
It is a form submission address, not a secret API credential.

The client submits bounded name, email, subject and message fields, a Reply-To
address, a fixed canonical form URL, and the provider's empty `_honey` field.
FormSubmit supplies the email delivery and service-side filtering. No CAPTCHA
protection was explicitly disabled. Provider boolean/string success values are
handled; failures preserve the draft. Activation responses do not claim delivery.
The form displays the delivery provider and recipient to visitors.

Status on 9 September 2026: the service's normal browser setup flow displayed
"Check Your Email" and confirmed it sent an activation link to the specified
Gmail address. The owner must click "Activate Form" in that inbox. The connected
mail connector does not provide access to that receiving mailbox. Earlier AJAX
tests were blocked by the service's security check; actual inbox delivery is not
yet verified. After activation, repeat a browser submission and confirm receipt.
No result should be presented as delivered until the service confirms acceptance.

The owner subsequently reported that the activation link did not work. The reported error was
"Confirmation token not found"; activation must not be treated as successful.
An expired link and a provider security challenge need different remedies. Do not
request or publish the private activation URL in repository files or reports.

Contact buttons in the public mascot now open the same on-page form instead of
collecting a draft and launching a mailto URL. No message is stored in localStorage.
Only the owner's clearly labelled setup request was submitted externally; no
visitor information or student data was sent. The form is included in the approved site release; email delivery remains unverified.
Existing scoring-system work, production Worker and D1 are unchanged by this task.

Tests: `tests/contact-form.cjs` with Playwright and Chrome, site served locally at
port 4201. The test simulates backend success/failure; this verifies the interface
only, not actual email delivery. It checks all three locale pages at 390px and 1280px, topic
prefill, draft retention on failure, activation handling and reset only
after explicit success. Generator and structural site audit also pass.

Provider references:
- [FormSubmit setup](https://formsubmit.co/)
- [AJAX submissions](https://formsubmit.co/ajax-documentation)
- [Activation, spam checks and retention](https://formsubmit.co/help)

FormSubmit documents 30-day submission retention.

Published on 10 September 2026 in release `7dd9a66`. All three live contact pages
passed mobile form/overflow and script-error checks. No live message was sent;
email activation and delivery verification remain pending at the owner's request.

## 20 September 2026 — enquiry fallback

Added a prominent direct email link inside the form section, visible without JavaScript and alongside any delivery error. With JavaScript, the email subject follows the selected collaboration topic or edited subject. Visitors can copy the displayed address and preserved message if their email application does not open. No draft is persisted or sent automatically.

Six isolated browser cases passed across all three locales at 390/1280px: subject prefill and fallback, activation failure, provider failure, accepted-submission UI and no horizontal overflow. These tests use mocked provider responses and do not prove inbox delivery. New fallback guidance is English with `lang="en"`; TRANSLATION REQUIRED for approved Chinese copy.

End-to-end FormSubmit delivery remains UNVERIFIED. A labelled live test and receipt/activation check in `yutakwing001@gmail.com` are still required. The connected Gmail tool account is not the receiving mailbox. Do not treat API acceptance as proof of receipt, or publish private activation URLs. The user has been asked for permission to send a test; no test has been sent in this follow-up yet.
