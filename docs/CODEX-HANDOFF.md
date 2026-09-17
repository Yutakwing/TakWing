# Codex Website Handoff

## Last completed phase

Phase 2 — Publish the Two Missing Articles

17 September 2026. This user-specified phase supersedes the provisional Phase 2 recommendation in the historical Phase 1 audit. **Stop after this blog release; do not begin Media changes.**

## Completed

- Read the Phase 1 handoff/audit and inspected the actual generator, article modules, archive, search/RSS, image and metadata conventions before editing.
- Confirmed that both complete English sources already existed as unpublished work in the original repository checkout. Searches of the published baseline's article modules, WordPress archive and generated posts found no duplicate article under another title.
- Imported the existing sources, render modules and matching WebP images without modifying their bytes. No replacement article, research claim, translation or image was invented; no external image was downloaded.
- Published-source registration retains ID 331, `can-you-hear-the-song-curse-of-knowledge-in-teaching`, and ID 332, `enough-about-catching-ai-a-practical-guide-to-using-it-for-learning`, with existing dates and author metadata.
- Retained all requested references: Camerer/Loewenstein/Weber, Hinds, Nathan/Petrosino, Newton; Bastani, Chi, Kapur/Bielaczyc, Kasneci, Kestin and Roediger/Karpicke.
- Added Song to the existing Physio category and Catching AI to AI. The site uses category/topic sets rather than independent tag archive pages. Existing source tags/topics remain preserved.
- Regenerated Writing, search, RSS, Open Graph/canonical metadata, related/chronological content, homepage latest writing and sitemap. Both new feature images display uncropped on article pages with correct 1600 × 901 dimensions and descriptive alt text.
- Preserved published Blog II IDs 333/334, every prior article URL and existing article body. Existing article diffs are limited to generated related-content/chronological links.
- Preserved existing Chinese titles/summaries and explicit full-translation-pending bodies linking to English. Did not generate full translations.
- Corrected stale authoring-guide map names and documented the actual source-based renderer workflow.
- No Media, student, scoring, authentication, tutor, Cloudflare/D1, game or shared UI implementation changes.

## Files changed

- `generate-site.mjs`
- `article-content.mjs`
- `AUTHORING.md`
- `docs/CODEX-HANDOFF.md`
- `index.html`, `writing.html`, `feed.xml`, `search-index.json`, `search-index-inline.js`, `sitemap.xml`
- `zh-hant/index.html`, `zh-hant/writing.html`, `zh-hant/feed.xml`, `zh-hant/search-index.json`, `zh-hant/search-index-inline.js`
- `zh-hans/index.html`, `zh-hans/writing.html`, `zh-hans/feed.xml`, `zh-hans/search-index.json`, `zh-hans/search-index-inline.js`
- 111 existing generated article files across `posts/`, `zh-hant/posts/` and `zh-hans/posts/`: related-content and chronological navigation only. Exact paths are in the Phase 2 commit diff; original article bodies were compared against HEAD and verified unchanged.

## Files created

- `article-sources/can-you-hear-the-song.md`
- `article-sources/enough-about-catching-ai.md`
- `song-article-content.mjs`
- `ai-learning-article-content.mjs`
- `assets/post-images/can-you-hear-the-song-curse-of-knowledge.webp`
- `assets/post-images/enough-about-catching-ai-learning.webp`
- `posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html`
- `posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html`
- `zh-hant/posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html`
- `zh-hant/posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html`
- `zh-hans/posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html`
- `zh-hans/posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html`
- `tests/phase2-blog-publication.cjs`

## Tests performed

- Syntax check and `node generate-site.mjs`: pass; **47 posts per language**.
- `node .codex-review/site-audit.mjs`: pass; **209 HTML files, three search indexes, 47/47/47 post parity**; no broken internal links or asset paths.
- Byte comparisons: both Markdown sources, render modules and images exactly match the existing original-checkout drafts.
- Scope comparison: pre-existing article bodies unchanged; no Media/student/Worker/game source changes.
- `tests/phase2-blog-publication.cjs`: **12/12 article/viewport cases** (two articles × three routes × 1440/390 widths). Checked page responses, images and dimensions, overflow, page exceptions, titles, canonical/Open Graph URLs/images, reference names, three/six DOI links, related links and pending-translation return links.
- Writing and homepage inclusion in each language, unique search entries, unique RSS items and **47 RSS items per locale** checked. Desktop/mobile English search finds both titles.
- `git diff --check`, exact-file staging, diff and Git status review performed before release.
- Deployment verification is performed after pushing: inspect Pages build commit/status, both exact public article URLs, Writing/search/feed/homepage and served image hashes. Do not infer that an older cached deployment matches a later local change; refresh these checks in future sessions.

### Reproduction

Start a local server exposing this checkout under `/TakWing/`. Install/use an existing Playwright module and Google Chrome; no framework change is required.

```sh
BLOG_BASE_URL=http://127.0.0.1:8890/TakWing/ \
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
node tests/phase2-blog-publication.cjs
```

The browser portion can also use the exact public Pages base URL for post-release read-only verification. Other origins are blocked during its browser checks; no tutor, email or student-result submission is exercised.

## Known issues

- Full Chinese article translations remain pending; existing Chinese summaries are not presented as complete translations.
- The original checkout remains on an older branch with its own draft/generated changes and contact-form notes. Do not publish from it without deliberate reconciliation.
- Source Markdown retains draft-status provenance. Generator inclusion controls publication; changing frontmatter alone does not unpublish an article.
- The two imported render modules use their existing lightweight Markdown parsers, not a general Markdown engine. New Markdown constructs require deliberate renderer support.
- The articles' illustrative AI-scaffolding examples are not claims that the current site automatically transmits live game context; the actual Skills Tutor remains a manual copy/paste integration.
- Phase 1 accessibility, storage, language and performance findings remain deferred. No new live student/database tests or scientific-reference appraisal were undertaken in this publishing phase.

## Requires Tak Wing review

- Approve/provide complete Chinese translations in a future content task if desired.
- Supply the next phase's detailed Media brief. This phase does not author or redesign Media content.
- No `CONTENT REQUIRED` or `FEATURED IMAGE REQUIRED` blocker applies: both finished English sources and suitable existing images were found.

## Next phase

Phase 3 — Media

Working label inferred from the instruction not to begin Media changes; the detailed phase title/scope has not yet been supplied. Await the next explicit brief and do not start now.

## Important implementation notes

- Working directory: `/Users/takwingyu/GPT Codex/blog-ii-release`; branch: `publish/phase-2-missing-articles`. Based on Phase 1 commit `29f769b` and published baseline `12cb93c`.
- Original source checkout `/Users/takwingyu/GPT Codex/personal-blog` is left untouched. Its 124 pre-existing modified tracked files and untracked draft copies are not automatically cleaned up after this scoped import.
- Article sources: Markdown → imported module → `article-content.mjs` → `generate-site.mjs` → committed HTML/discovery files. Preserve stable slugs, relative `/TakWing/` paths and existing dates.
- Expected public URLs:
  - https://yutakwing.github.io/TakWing/posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html
  - https://yutakwing.github.io/TakWing/posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html
- Publishing this branch also carries the previously committed Phase 1 audit and baseline test, which contain no production UI changes.
- The Phase 1 audit remains a dated historical baseline; its earlier counts and suggested phase ordering are not the current Phase 2 brief.
- Keep the release scoped to these articles and required generated discovery changes. No database migration or Worker deployment is involved.
