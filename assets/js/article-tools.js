(() => {
  "use strict";
  const article = document.querySelector(".post-content");
  const reading = document.querySelector("[data-reading-time]");
  if (article && reading) {
    const text = article.textContent.trim();
    const chinese = article.lang.startsWith("zh");
    const units = chinese ? text.replace(/\s+/g, "").length : text.split(/\s+/).filter(Boolean).length;
    reading.textContent = `${Math.max(1, Math.ceil(units / (chinese ? 500 : 220)))} ${reading.dataset.readingLabel}`;
  }
  const locale = document.documentElement.lang;
  const messages = locale.startsWith('zh') ? (locale.toLowerCase().includes('hant') ? ['連結已複製。','請從瀏覽器網址列複製文章網址。'] : ['链接已复制。','请从浏览器地址栏复制文章网址。']) : ['Link copied.', "Copy the article address from your browser's address bar."];
  const copy = document.querySelector("[data-copy-link]");
  if (!copy || !navigator.clipboard?.writeText) return;
  copy.hidden = false;
  copy.addEventListener("click", async () => {
    const status = document.querySelector("[data-copy-status]");
    const url = document.querySelector('link[rel="canonical"]').href;
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = messages[0];
    } catch {
      status.textContent = messages[1];
    }
  });
})();
