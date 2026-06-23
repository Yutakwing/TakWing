import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL(".", import.meta.url));
const postsExport = JSON.parse(fs.readFileSync(path.join(root, "wordpress-posts.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "wordpress-site.json"), "utf8"));
const posts = postsExport.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
const postsDir = path.join(root, "posts");
fs.mkdirSync(postsDir, { recursive: true });

const decodeEntities = (value = "") =>
  value
    .replace(/&#8211;/g, "-")
    .replace(/&#8220;/g, "\"")
    .replace(/&#8221;/g, "\"")
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const stripHtml = (value = "") =>
  decodeEntities(value.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const slugify = (post) => {
  const base = decodeURIComponent(post.slug || String(post.ID))
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return base && base.length > 2 ? base : `post-${post.ID}`;
};

const formatDate = (iso) =>
  new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));

const categories = (post) => Object.keys(post.categories || {});
const categoryCount = posts.reduce((acc, post) => {
  for (const category of categories(post)) acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});

const postHref = (post, fromRoot = true) => `${fromRoot ? "./" : "../"}posts/${slugify(post)}.html`;
const siteName = site.name || "Tak Wing's Page";
const description = site.description || "A personal blog and public writing archive.";
const author = posts[0]?.author?.name || "Yu Tak Wing";
const profileImage = site.logo?.url || site.icon?.img || posts[0]?.author?.avatar_URL || "./profile.svg";

const pageShell = ({ title, descriptionText = description, body, fromRoot = true }) => {
  const prefix = fromRoot ? "." : "..";
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${descriptionText.replace(/"/g, "&quot;")}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${prefix}/styles.css" />
    <link rel="stylesheet" href="${prefix}/academic.css" />
  </head>
  <body>
    <div class="navigation-progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="site-mark" href="${prefix}/index.html">
        <span>Tak Wing Yu</span>
        <small>Academic notes on education, technology, and practice</small>
      </a>
      <nav class="top-nav" aria-label="Main navigation">
        <ul>
          <li><a href="${prefix}/index.html#focus">Focus</a></li>
          <li><a href="${prefix}/index.html#latest">Latest</a></li>
          <li><a href="${prefix}/index.html#teaching">Teaching</a></li>
          <li><a href="${prefix}/index.html#archive">Archive</a></li>
          <li><a href="${site.URL}">WordPress</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="search-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.8-4.8M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" /></svg>
          <span>Search</span>
        </button>
        <button class="icon-button theme-toggle desktop-theme" type="button" aria-label="Toggle theme"></button>
      </div>
    </header>
    <div class="mobile-nav">
      <button class="icon-button theme-toggle" type="button" aria-label="Toggle theme"></button>
      <button class="icon-button menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div class="mobile-panel">
        <button class="icon-button close-menu" type="button" aria-label="Close navigation">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <a href="${prefix}/index.html#about">About</a>
        <a href="${prefix}/index.html#focus">Focus</a>
        <a href="${prefix}/index.html#latest">Latest</a>
        <a href="${prefix}/index.html#teaching">Teaching</a>
        <a href="${prefix}/index.html#archive">Archive</a>
        <a href="${site.URL}">WordPress</a>
      </div>
    </div>
    <div class="page academic-page">
      <main class="content">
        ${body}
      </main>
    </div>
    <div class="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      <div class="search-modal">
        <input type="search" placeholder="Search Tak Wing's archive" aria-label="Search Tak Wing's archive" />
        <div class="search-results"></div>
      </div>
    </div>
    <script src="${prefix}/script.js"></script>
  </body>
</html>
`;
};

const postCard = (post, variant = "") => {
  const category = categories(post)[0] || "Post";
  return `<a class="featured-card ${variant}" href="${postHref(post)}">
    <span>${category}</span>
    <strong>${decodeEntities(post.title)}</strong>
    <small>${stripHtml(post.excerpt).slice(0, 150)}${stripHtml(post.excerpt).length > 150 ? "..." : ""}</small>
  </a>`;
};

const archiveRow = (post) => `<a href="${postHref(post)}">
  <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date)}</time>
  <span>${decodeEntities(post.title)}</span>
</a>`;

const archiveItem = (post) => {
  const category = categories(post)[0] || "Post";
  return `<a class="archive-item" href="${postHref(post)}">
    <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date)}</time>
    <strong>${decodeEntities(post.title)}</strong>
    <span>${category}</span>
  </a>`;
};

const textSnippet = (post, length = 190) => {
  const text = stripHtml(post?.excerpt || post?.content || "");
  return `${text.slice(0, length)}${text.length > length ? "..." : ""}`;
};

const latest = posts.slice(0, 3);
const health = posts.filter((post) => categories(post).includes("Health Professional Education Blogs"));
const personal = posts.filter((post) => categories(post).includes("Personal Blogs"));

const indexBody = `<article class="home-layout">
  <section id="about" class="academic-hero">
    <div class="hero-copy">
      <p class="eyebrow">Physiotherapy education · educational technology · reflective practice</p>
      <h1>Notes from the intersection of health professional education and emerging technology.</h1>
      <p class="hero-lede">
        I am ${author}, a physiotherapy lecturer using this site as a public notebook for ideas about teaching,
        student support, AI, VR, academic work, and the everyday practice of becoming a better educator.
      </p>
      <div class="hero-actions">
        <a class="primary-link" href="#latest">Read latest</a>
        <a class="secondary-link" href="#archive">Browse archive</a>
      </div>
    </div>
    <aside class="profile-panel" aria-label="Author profile">
      <img class="profile-image" src="${profileImage}" alt="${author}" />
      <h2>${siteName}</h2>
      <p>${description}</p>
      <dl class="site-stats">
        <div><dt>${posts.length}</dt><dd>posts</dd></div>
        <div><dt>${categoryCount["Health Professional Education Blogs"] || 0}</dt><dd>education notes</dd></div>
        <div><dt>${categoryCount["Personal Blogs"] || 0}</dt><dd>reflections</dd></div>
      </dl>
    </aside>
  </section>

  <section id="focus" class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Focus areas</p>
      <h2>Three routes through the archive</h2>
    </div>
    <div class="focus-grid">
      <a class="focus-card education" href="#teaching">
        <span>Education technology</span>
        <strong>AI, VR, and learning design</strong>
        <small>Writing about educational technology as something that should serve professional judgment, not replace it.</small>
      </a>
      <a class="focus-card practice" href="#teaching">
        <span>Teaching practice</span>
        <strong>Assessment, support, and academic care</strong>
        <small>Notes on student mental health, special educational needs, admissions, and the realities of teaching.</small>
      </a>
      <a class="focus-card reflection" href="#personal-writing">
        <span>Reflective writing</span>
        <strong>Academic life in motion</strong>
        <small>Personal reflections on PhD work, transitions, travel, language, and everyday learning.</small>
      </a>
    </div>
  </section>

  <section id="latest" class="section-block latest-layout">
    <div class="section-heading">
      <p class="eyebrow">Latest writing</p>
      <h2>Current questions</h2>
    </div>
    <div class="latest-feature">
      <article class="lead-article">
        <span>${categories(posts[0])[0] || "Latest"}</span>
        <h3><a href="${postHref(posts[0])}">${decodeEntities(posts[0].title)}</a></h3>
        <p>${textSnippet(posts[0], 260)}</p>
        <a class="read-more" href="${postHref(posts[0])}">Continue reading</a>
      </article>
      <div class="latest-list">
        ${latest.slice(1, 3).map((post) => `<a href="${postHref(post)}"><time datetime="${post.date.slice(0, 10)}">${formatDate(post.date)}</time><strong>${decodeEntities(post.title)}</strong></a>`).join("")}
      </div>
    </div>
  </section>

  <section id="teaching" class="section-block split-section">
    <div class="section-heading">
      <p class="eyebrow">Academic writing</p>
      <h2>Health professional education</h2>
      <p>Posts about AI, VR, teaching, learning design, assessment, student support, and the hidden labour of academic work.</p>
    </div>
    <div class="scholar-list">${health.slice(0, 6).map((post) => `
      <a href="${postHref(post)}">
        <span>${formatDate(post.date)}</span>
        <strong>${decodeEntities(post.title)}</strong>
        <small>${textSnippet(post, 145)}</small>
      </a>`).join("")}
    </div>
  </section>

  <section id="personal-writing" class="section-block split-section">
    <div class="section-heading">
      <p class="eyebrow">Reflective writing</p>
      <h2>Personal essays and field notes</h2>
      <p>Writing that keeps the academic work grounded: travel, transitions, PhD life, language, productivity, and technology in daily practice.</p>
    </div>
    <div class="scholar-list compact">${personal.slice(0, 8).map((post) => `
      <a href="${postHref(post)}">
        <span>${formatDate(post.date)}</span>
        <strong>${decodeEntities(post.title)}</strong>
      </a>`).join("")}
    </div>
  </section>

  <section id="archive" class="section-block">
    <div class="section-heading archive-heading">
      <div>
        <p class="eyebrow">Complete archive</p>
        <h2>All posts</h2>
      </div>
      <p>${posts.length} posts migrated from <a href="${site.URL}">WordPress</a>, with original source links preserved on each article.</p>
    </div>
    <div class="archive-grid">${posts.map(archiveItem).join("")}</div>
  </section>
</article>
<footer>
  <div class="share-links">
    <span>Share:</span>
    <button type="button" class="share-button" data-share="copy">Copy link</button>
    <a class="share-button" href="mailto:?subject=${encodeURIComponent(siteName)}">Email</a>
  </div>
  <nav aria-label="Footer links">
    <a href="${site.URL}">Original WordPress</a>
    <a href="https://gravatar.com/yutakwing">Gravatar</a>
  </nav>
  <p>© 2026 ${author}. Static archive generated from public WordPress content.</p>
</footer>`;

fs.writeFileSync(
  path.join(root, "index.html"),
  pageShell({ title: siteName, descriptionText: description, body: indexBody })
);

for (const post of posts) {
  const title = decodeEntities(post.title);
  const body = `<article class="post-article">
    <header class="post-header">
      <a class="back-link" href="../index.html#archive">Archive</a>
      <p class="content-meta">${categories(post).join(" / ") || "Post"} · <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date)}</time></p>
      <h1>${title}</h1>
      <p class="post-standfirst">${textSnippet(post, 220)}</p>
      <p class="post-source">Migrated from <a href="${post.URL}">the original WordPress post</a>.</p>
    </header>
    <div class="post-content">${post.content}</div>
  </article>
  <footer>
    <nav class="post-nav" aria-label="Post navigation">
      <a href="../index.html#archive">Archive</a>
      <a href="${post.URL}">Original WordPress</a>
    </nav>
    <p>© 2026 ${author}. Migrated from WordPress.</p>
  </footer>`;

  fs.writeFileSync(
    path.join(postsDir, `${slugify(post)}.html`),
    pageShell({ title: `${title} - ${siteName}`, descriptionText: stripHtml(post.excerpt), body, fromRoot: false })
  );
}

const searchIndex = posts.map((post) => ({
  title: decodeEntities(post.title),
  href: `./posts/${slugify(post)}.html`,
  description: stripHtml(post.excerpt),
  date: post.date.slice(0, 10),
  category: categories(post).join(", "),
}));

fs.writeFileSync(path.join(root, "search-index.json"), `${JSON.stringify(searchIndex, null, 2)}\n`);

fs.writeFileSync(path.join(root, ".nojekyll"), "");
console.log(`Generated ${posts.length} posts for ${siteName}`);
