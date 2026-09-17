import fs from "fs";

const source = fs.readFileSync(new URL("./article-sources/enough-about-catching-ai.md", import.meta.url), "utf8");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const inlineMarkdown = (value) => escapeHtml(value)
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/\*(.+?)\*/g, "<em>$1</em>")
  .replace(/(https:\/\/[^\s<]+?)([.,;:]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');

const renderMarkdown = (markdown) => {
  const lines = markdown.replace(/^---\n[\s\S]*?\n---\n/, "").split(/\r?\n/);
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
    if (line.startsWith("# ") || line === "## Related notes") continue;
    if (line.startsWith("[[") || (line.startsWith("- [[") && line.endsWith("]]"))) continue;
    if (line.startsWith("## ")) { flush(); html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("### ")) { flush(); html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`); continue; }
    if (/^\d+\.\s/.test(line)) { flushParagraph(); flushQuote(); list.push(line.replace(/^\d+\.\s/, "")); continue; }
    if (line.startsWith("- ")) { flushParagraph(); flushQuote(); list.push(line.slice(2)); continue; }
    if (line.startsWith("> ")) { flushParagraph(); flushList(); quote.push(line.slice(2)); continue; }
    if (/^ {4}/.test(raw)) { flush(); html.push(`<blockquote><p>${inlineMarkdown(line)}</p></blockquote>`); continue; }
    flushList(); flushQuote(); paragraph.push(line);
  }
  flush();
  return html.join("\n");
};

const translationPending = (variant) => variant === "traditional"
  ? `<p><strong>中文翻譯正在準備中。</strong></p><p>本文主張，大學不應只問學生有否使用人工智能，而應追問人工智能在學習過程中扮演甚麼角色。學生先嘗試，然後利用人工智能取得提示、解釋或挑戰，再自行說明、核實，最後在沒有人工智能支援下完成新任務。核心原則是：讓人工智能減少不必要的障礙，但把重要思考留給學習者。</p><p><a href="../../posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html">閱讀完整英文版本</a></p>`
  : `<p><strong>中文翻译正在准备中。</strong></p><p>本文主张，大学不应只问学生有没有使用人工智能，而应追问人工智能在学习过程中扮演什么角色。学生先尝试，然后利用人工智能获得提示、解释或挑战，再自行说明、核实，最后在没有人工智能支持下完成新任务。核心原则是：让人工智能减少不必要的障碍，但把重要思考留给学习者。</p><p><a href="../../posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html">阅读完整英文版本</a></p>`;

export const aiLearningArticleBodies = {
  en: { 332: renderMarkdown(source) },
  "zh-hant": { 332: translationPending("traditional") },
  "zh-hans": { 332: translationPending("simplified") },
};
