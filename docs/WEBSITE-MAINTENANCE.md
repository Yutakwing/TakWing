# Website maintenance

Verified against the Phase 8 checkout, 19 September 2026. This is the operational guide; older audits describe historical baselines.

## Architecture and sources

The portfolio is committed static HTML, CSS and vanilla JavaScript. `generate-site.mjs` combines the imported WordPress JSON archive, `data/publications.json`, portfolio/experience/scholarship modules and specialised article/activity modules. It generates core pages, 47 articles per language, search indexes, RSS and sitemap. There is no framework build or root package installation. Run `node generate-site.mjs` from the repository. Node 20 is used by the regeneration workflow; backend tests require Node 22.13+ for `node:sqlite`.

Do not hand-edit generated HTML as the source of a durable change. Standalone joint games, Cardiorespiratory activities, typing and student pages have their own sources. Shared public behaviour is in `script.js`; student clients are in `student/assets/`. See SITE-CONTENT-MAP.md for routes and DESIGN-SYSTEM.md for styles.

## Pages deployment and base path

Production is `https://yutakwing.github.io/TakWing/`. Keep `/TakWing/` in absolute public URLs, canonicals, sitemap, SQL game URLs and preview tests. The generator's `siteBase`, relative root helpers and student script-derived `SITE_ROOT` resolve this boundary. Do not introduce origin-root `/assets/` or `/student/` links which discard it. Local previews must use HTTP, not `file://` (YouTube and API origin/referrer rules differ).

Generated output is committed. `.github/workflows/regenerate-site.yml` regenerates selected root module/CSS/WordPress changes on `main` or manual dispatch, then commits changed output. Its trigger paths do not cover every dependency: explicitly regenerate after publication-data or article-source changes. GitHub Pages serves the committed branch; confirm its current source/settings before a release. A push or an Actions success alone is not proof of Pages propagation: wait for the Pages build and verify the exact URLs/assets.

Cloudflare deployment is separate. A Pages release never deploys a Worker, migrates D1 or changes Zapier.

## Navigation and languages

Public navigation comes from the generator's `navItems` and shell. It includes Home, About, Research, Teaching, Skills Lab, Writing, Media, Resources and Collaborate, plus Student Login, search, theme and language controls. `assets/css/skills-lab.css` deliberately loads on public generated pages because it also owns the wider navigation's responsive override. Student/game shells remain separate.

English is at the root; Traditional and Simplified Chinese portfolio routes are under `zh-hant/` and `zh-hans/`. Preserve canonical/hreflang and language links. Some games use `?lang=zh-hant` / `?lang=zh-hans`; others have localised HTML. Route existence does not establish a complete translation. New English-only blocks remain marked `lang="en"` with TRANSLATION REQUIRED or an explicit pending-translation article. Never manufacture translations. Tracked language switches must preserve `tracked=1`.

## Adding a blog and featured image

1. Confirm the complete approved source exists and check for duplicate title/slug. Keep original source Markdown as provenance where applicable; Markdown copies are not a universal import pipeline.
2. Follow current `draftPosts`, `portfolioPostIds`, topic sets, `postTitles` and `postSummaries` in `generate-site.mjs`; use a unique ID and stable slug. Do not rename existing published URLs.
3. Add the complete body to `article-content.mjs` or its appropriate imported module. Existing specialist modules include Song, AI learning and Blog II. Metadata and factual claims must come from approved source material.
4. Add a unique featured image in `assets/post-images/`, its `postImages` entry, source-grounded alt text and correct dimensions in the image helper. The generator rejects reused image paths/content. Prefer WebP for photographic delivery, keep original provenance assets, and inspect the conversion visually. Do not stretch/crop a supplied image unintentionally.
5. Add approved language bodies or explicit pending-translation placeholders with an English link. Do not represent fallback English as translated content.
6. Regenerate and inspect the article, Writing archive, homepage latest section, category/related links, all three search indexes/feeds, canonical and Open Graph image. Validate image dimensions and loading priority. Run structural and blog browser checks.

The Song and Enough About Catching AI articles are IDs 331/332. Thinking with AI and Movement Science are 333/334. The latter now use WebP delivery; the original PNGs remain available.

## Adding Media

Edit `media-showcase.mjs` for the supplied video and `experience-content.mjs` / `buildMediaPage` for editorial content. The current video is `kfZ93HG7FNs`, labelled Short teaching showcase. Preserve existing professional Instagram links. Media-only CSS caps the card at 720px and reserves 16:9. Use meaningful titles, no autoplay, lazy loading, a direct watch link and the established privacy-enhanced YouTube host. Test over HTTP in both themes and at all four widths. Do not infer captions, duration or a full lecture from an unknown video.

## Adding a Skills Lab activity

The central category source is `skills-lab-content.mjs`. Only expose existing playable routes. Mobility's overview is generated from `mobility-lab-content.mjs`; its six proposed activities remain In development, with no playable links.

For a separately authorised new playable activity: follow an existing game shell, preserve keyboard/focus and reduced-motion support, register the ID/path in `cloudflare/seed-games.sql`, and keep shared next-activity ordering aligned. Load authentication/progress before the activity. Call `startActivity`, `recordFeedback`, native completion and `resetCompletion` at the appropriate game events; use the existing bounded result contract and one UUID per completed attempt. Document the rubric and lecturer review in GAME-SCORING.md. Test public play, authenticated save, failed-save retry, logout and restart against isolated local D1. Do not seed production merely to test it.

Clinical configuration is not an implementation. `mobility/clinical-config.json` has null values and LECTURER VERIFICATION REQUIRED. `mobility/case-context.mjs` parses optional opaque `case_id`, `phase`, `task_id` locally; current result/tutor schemas do not accept them.

## Student, tracked mode and Cloudflare/D1

Login and dashboard are `/student/login/` and `/student/dashboard/`. `?tracked=1` requires a valid API session; public mode plays without saving student progress. Tokens remain in session storage, with the existing authenticated Worker request boundary. Dashboard/next links preserve tracked state. The completed result payload is frozen for retry; leaving the page loses unsaved in-memory state.

`cloudflare/src/` handles authentication, result validation, isolation and D1 persistence. It never independently replays the browser's deterministic clinical calculations; scores are formative and not tamper-proof competency measures. Never put secrets or private account seeds in Pages. Production CORS, schema migrations and Worker deployment require their own verification. Optional `ZAPIER_RESULTS_WEBHOOK_URL` forwards completed pseudonymous records after D1 saves and is unrelated to tutor context. Public game analytics is another separate integration; public mode does not mean zero telemetry.

## AI Tutor boundaries

The configured clinical tutor appears only on enabled tracked games after authentication. Public Elbow has no tutor panel by design. Ask AI Tutor lazily mounts Zapier's official inline component; Copy current attempt still requires a manual paste with the question. The wrapper does not access Shadow DOM or undocumented messages and cannot observe individual vendor replies. AI help requests do not alter the technical score.

Phase 7 verified a real Generate Reply to Message action using synthetic Elbow context. It did not implement the backend request/return path. The draft is OFF. Do not claim automatic context transfer, repurpose the results webhook, expose credentials or send identity/auth/session data. See AI-TUTOR-GAME-MAP.md for exact evidence and remaining steps.

## Deployment checklist

- Read CODEX-HANDOFF.md; inspect branch, status, diff and unrelated work before editing.
- Use the clean release checkout, not the original checkout's unrelated drafts. Stage explicit paths.
- Run generation only for source changes that require it; inspect all generated differences and ensure a second run is reproducible.
- Run `node .codex-review/site-audit.mjs`, JS syntax checks, relevant browser suites and backend tests where appropriate. Use an HTTP preview under `/TakWing/` and isolated local D1 for writes.
- Check 390/768/1024/1440px, themes, keyboard, reduced motion, language links, image loading, SEO/search/RSS and no new clinical claims.
- Update handoff/release report with passed checks and honest limitations; run `git diff --check`, `git diff`, `git status`; make a scoped commit.
- For an authorised release, push the intended commit to `main`, verify regeneration/Pages completion, compare served files and exact routes, then confirm clean release status and remote revision. Never call local-only work published.
