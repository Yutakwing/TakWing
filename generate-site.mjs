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
  </head>
  <body>
    <div class="navigation-progress" aria-hidden="true"></div>
    <nav class="top-nav" aria-label="Main navigation">
      <ul>
        <li class="has-dropdown">
          <a href="${prefix}/index.html#explore">Browse</a>
          <ul class="dropdown-menu" aria-label="Browse sections">
            <li><a href="${prefix}/index.html#health-professional-education">Health Professional Education</a></li>
            <li><a href="${prefix}/index.html#personal-writing">Personal Blogs</a></li>
            <li><a href="${prefix}/index.html#archive">Archive</a></li>
          </ul>
        </li>
        <li><a href="${prefix}/index.html#about">About</a></li>
        <li><a href="${prefix}/index.html#featured">Featured</a></li>
        <li><a href="${prefix}/index.html#archive">Archive</a></li>
        <li><a href="${site.URL}">WordPress</a></li>
      </ul>
      <div class="top-nav-social" aria-label="Social links">
        <a href="https://gravatar.com/yutakwing" aria-label="Gravatar profile">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10h-8.6a1.4 1.4 0 0 0 0 2.8H19a7.2 7.2 0 1 1-2.1-5.1l2-2A10 10 0 0 0 12 2Z"/></svg>
        </a>
      </div>
    </nav>
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
        <a href="${prefix}/index.html#featured">Featured</a>
        <a href="${prefix}/index.html#archive">Archive</a>
        <a href="${site.URL}">WordPress</a>
      </div>
    </div>
    <div class="page">
      <aside class="sidebar">
        <h1><a href="${prefix}/index.html">/home/tak-wing</a></h1>
        <div class="sidebar-tools">
          <button class="search-button" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.8-4.8M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" /></svg>
            <span>Search</span>
          </button>
          <button class="icon-button theme-toggle desktop-theme" type="button" aria-label="Toggle theme"></button>
        </div>
        <p class="sidebar-note">${description}</p>
      </aside>
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

const latest = posts.slice(0, 3);
const health = posts.filter((post) => categories(post).includes("Health Professional Education Blogs"));
const personal = posts.filter((post) => categories(post).includes("Personal Blogs"));

const indexBody = `<header class="page-header">
  <h2>Home</h2>
</header>
<article>
  <section id="about" class="intro">
    <img class="profile-image" src="${profileImage}" alt="${author}" />
    <p class="tagline">${description}</p>
    <p>
      I am ${author}, a physiotherapy lecturer writing about health professional education,
      educational technology, AI, VR, academic life, and personal reflections across Hong Kong,
      South Africa, and beyond.
    </p>
    <p>
      This static version preserves the public archive from <a href="${site.URL}">my WordPress site</a>
      and makes it easier to browse, search, and publish through GitHub Pages.
    </p>
  </section>

  <section id="featured">
    <h2>Featured Writing</h2>
    <div class="featured-cards">
      ${postCard(posts[0], "post")}
      ${postCard(health[1] || health[0] || posts[1], "essay")}
      ${postCard(personal[0] || posts[2], "guide")}
    </div>
    <p>Start with these themes from the archive:</p>
    <ul>
      <li><a href="#health-professional-education">Health professional education</a>, including AI, VR, teaching, assessment, and student support.</li>
      <li><a href="#personal-writing">Personal writing</a> on travel, technology, PhD life, and everyday reflection.</li>
      <li><a href="#archive">The full post archive</a>, migrated from WordPress into static pages.</li>
    </ul>
  </section>

  <section id="health-professional-education">
    <h2>Health Professional Education</h2>
    <div class="project-grid topic-grid">
      <article>
        <span>${categoryCount["Health Professional Education Blogs"] || 0} posts</span>
        <h3>Teaching, Learning, AI, and VR</h3>
        <p>Posts about educational technology, health professional education, OpenClaw, VR, and student support.</p>
      </article>
      <article>
        <span>Latest</span>
        <h3>${decodeEntities(health[0]?.title || "Health Professional Education")}</h3>
        <p>${stripHtml(health[0]?.excerpt || "").slice(0, 180)}...</p>
      </article>
    </div>
    <div class="note-list">${health.slice(0, 6).map(archiveRow).join("")}</div>
  </section>

  <section id="personal-writing">
    <h2>Personal Writing</h2>
    <div class="project-grid topic-grid">
      <article>
        <span>${categoryCount["Personal Blogs"] || 0} posts</span>
        <h3>Life, Travel, and Technology</h3>
        <p>Personal essays and practical reflections from the original WordPress archive.</p>
      </article>
      <article>
        <span>Latest</span>
        <h3>${decodeEntities(personal[0]?.title || "Personal Blogs")}</h3>
        <p>${stripHtml(personal[0]?.excerpt || "").slice(0, 180)}...</p>
      </article>
    </div>
    <div class="note-list">${personal.slice(0, 6).map(archiveRow).join("")}</div>
  </section>

  <section id="archive">
    <h2>Full Archive</h2>
    <div class="note-list archive-list">${posts.map(archiveRow).join("")}</div>
  </section>

  <section id="explore">
    <h2>Explore</h2>
    <div class="entry-cards">
      <a class="entry-card learn" href="#health-professional-education"><strong>Education</strong><span>AI, VR, teaching, and student support</span></a>
      <a class="entry-card topic" href="#personal-writing"><strong>Personal</strong><span>Life, writing, travel, and technology</span></a>
      <a class="entry-card format" href="#archive"><strong>Archive</strong><span>All ${posts.length} migrated WordPress posts</span></a>
    </div>
  </section>

  <aside class="callout">
    <strong>Migration note</strong>
    <p>This site was generated from the public WordPress archive at <a href="${site.URL}">${site.URL}</a>. Original post links are preserved on every article page.</p>
  </aside>
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
      <p class="content-meta">${categories(post).join(" / ") || "Post"} · <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date)}</time></p>
      <h2>${title}</h2>
      <p class="post-source"><a href="${post.URL}">Original WordPress post</a></p>
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
