export const contactFormCopy = {
  en: {
    title: 'Leave me a message', intro: 'Tell me a little about your question or project. You can send your message here without opening an email app.',
    name: 'Your name', email: 'Your email', subject: 'Subject', message: 'Message', send: 'Send message',
    privacy: 'Messages are delivered via FormSubmit to yutakwing001@gmail.com. Your details will be used to respond to your enquiry. Please do not include patient details or confidential student information.',
    sending: 'Sending your message…', success: 'Thank you — your message has been submitted. I’ll reply using the email address you provided.',
    error: 'Your message could not be sent. Your text is still here; please try again.',
    unavailable: 'The message service is awaiting activation. Your text is still here; please try again later.',
    nojs: 'Please enable JavaScript to send a message using this form.',
  },
  'zh-hant': {
    title: '給我留言', intro: '歡迎告訴我你的問題或合作構想。你可以直接在這裏留言，毋須開啟電郵程式。',
    name: '你的姓名', email: '你的電郵', subject: '主旨', message: '留言內容', send: '傳送留言',
    privacy: '留言會經 FormSubmit 傳送至 yutakwing001@gmail.com。你的聯絡資料只會用於回覆查詢。請勿提供病人資料或學生的機密資料。',
    sending: '正在傳送留言……', success: '謝謝，你的留言已傳送。我會透過你提供的電郵回覆。',
    error: '留言未能傳送。內容已保留，請再試一次。', unavailable: '留言服務尚未連接，你的留言未有傳送。',
    nojs: '請啟用 JavaScript，以使用此表格傳送留言。',
  },
  'zh-hans': {
    title: '给我留言', intro: '欢迎告诉我你的问题或合作构想。你可以直接在这里留言，无须打开邮箱应用。',
    name: '你的姓名', email: '你的邮箱', subject: '主题', message: '留言内容', send: '发送留言',
    privacy: '留言会通过 FormSubmit 发送至 yutakwing001@gmail.com。你的联系方式只会用于回复咨询。请勿提供患者资料或学生的机密资料。',
    sending: '正在发送留言……', success: '谢谢，你的留言已发送。我会通过你提供的邮箱回复。',
    error: '留言未能发送。内容已保留，请再试一次。', unavailable: '留言服务尚未连接，你的留言尚未发送。',
    nojs: '请启用 JavaScript，以使用此表格发送留言。',
  },
};
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function renderContactForm(locale) {
 const c=contactFormCopy[locale];
 return `<section class="message-section" id="contact-form" aria-labelledby="message-title">
  <h2 id="message-title">${c.title}</h2>
  <form method="post" data-contact-form data-sending="${escape(c.sending)}" data-success="${escape(c.success)}" data-error="${escape(c.error)}" data-unavailable="${escape(c.unavailable)}">
   <div class="message-fields"><label>${c.name}<input name="name" autocomplete="name" maxlength="100" required></label>
   <label>${c.email}<input name="email" type="email" autocomplete="email" maxlength="254" required></label></div>
   <label>${c.subject}<input name="subject" maxlength="160" required></label>
   <label>${c.message}<textarea name="message" rows="7" minlength="10" maxlength="5000" required></textarea></label>
   <div class="message-trap" aria-hidden="true"><label>Leave this empty<input name="company_website" tabindex="-1" autocomplete="off"></label></div>
   <p class="message-privacy" id="message-privacy">${c.privacy}</p>
   <button type="submit" class="primary-link" disabled>${c.send}</button>
   <p data-contact-status role="status" aria-live="polite"></p>
   <noscript><p>${c.nojs}</p></noscript>
  </form></section>`;
}
