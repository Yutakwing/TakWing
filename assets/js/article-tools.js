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
  const copy = document.querySelector("[data-copy-link]");
  if (!copy || !navigator.clipboard?.writeText) return;
  copy.hidden = false;
  copy.addEventListener("click", async () => {
    const status = document.querySelector("[data-copy-status]");
    const url = document.querySelector('link[rel="canonical"]').href;
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = "Link copied.";
    } catch {
      status.textContent = "Copy the article address from your browser's address bar.";
    }
  });
})();
