import fs from "fs";

const source = fs.readFileSync(new URL("./article-sources/can-you-hear-the-song.md", import.meta.url), "utf8");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const inlineMarkdown = (value) => escapeHtml(value)
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/\*(.+?)\*/g, "<em>$1</em>")
  .replace(/(https:\/\/[^\s<]+?)([.,;:]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');

const renderMarkdown = (markdown) => {
  const withoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
  const lines = withoutFrontmatter.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];
  let quote = [];
  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote><p>${inlineMarkdown(quote.join(" "))}</p></blockquote>`);
    quote = [];
  };
  const flush = () => { flushParagraph(); flushList(); flushQuote(); };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "---") { flush(); continue; }
    if (line.startsWith("# ")) continue;
    if (line.startsWith("## ")) { flush(); html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("### ")) { flush(); html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`); continue; }
    if (line.startsWith("- ")) { flushParagraph(); flushQuote(); list.push(line.slice(2)); continue; }
    if (line.startsWith("> ")) { flushParagraph(); flushList(); quote.push(line.slice(2)); continue; }
    flushList(); flushQuote(); paragraph.push(line);
  }
  flush();
  return html.join("\n");
};

const translationPending = (variant) => variant === "traditional"
  ? `<p><strong>中文翻譯正在準備中。</strong></p><p>這篇文章反思「知識詛咒」及專家盲點：教師心中已經聽到完整旋律，學生接收到的卻可能只是一連串敲擊聲。文章以物理治療技能教學為例，探討如何把專家已壓縮的思考步驟重新拆開，並運用模擬、學生解釋及漸進式人工智能提示，使學習者的心智模型變得可見。</p><p><a href="../../posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html">閱讀完整英文版本</a></p>`
  : `<p><strong>中文翻译正在准备中。</strong></p><p>这篇文章反思“知识诅咒”及专家盲点：教师心中已经听到完整旋律，学生接收到的却可能只是一连串敲击声。文章以物理治疗技能教学为例，探讨如何把专家已压缩的思考步骤重新拆开，并运用模拟、学生解释及渐进式人工智能提示，使学习者的心智模型变得可见。</p><p><a href="../../posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html">阅读完整英文版本</a></p>`;

export const songArticleBodies = {
  en: { 331: renderMarkdown(source) },
  "zh-hant": { 331: translationPending("traditional") },
  "zh-hans": { 331: translationPending("simplified") },
};
