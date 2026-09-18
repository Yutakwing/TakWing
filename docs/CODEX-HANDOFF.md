# Codex Website Handoff

## Last completed phase

Phase 4 — Student Skills Lab Discoverability

Completed on 18 September 2026. Stop here. Do not build crutch games or begin another phase.

## Completed

- Read the Phase 3 handoff and inspected the clean release checkout at `ae38953`, the generator, Resources, existing category hubs, student dashboard, navigation CSS/JavaScript and `cloudflare/seed-games.sql`.
- No suitable central public landing page existed: Resources mixes educator resources with activities; the student dashboard requires authentication. Added a lightweight generated `skills-lab.html` in all three language routes while reusing the existing Goniometry and Cardiorespiratory hubs.
- Listed all 15 existing registered activities under Goniometry (6), Cardiorespiratory (5), Clinical Reasoning (2) and AI / Digital Skills (2). No new game or clinical content was created.
- Added Mobility & Assistive Devices as **In development**, with no activity links and an explicit statement that no activities are available yet.
- Added Skills Lab between Teaching and Writing in shared desktop/mobile navigation. Kept readable desktop labels using two header rows. Reused the existing mobile menu up to 1200px, resolving the previous gap between desktop navigation hiding and mobile controls appearing. Added a scrollable menu for short screens.
- Added Student Login to desktop/mobile navigation, footer and the landing page. Included an existing-dashboard link and distinguished public practice from recorded practice launched through the dashboard. No authentication or tracked-mode logic changed.
- Redirected the existing homepage interactive-resources CTA to Skills Lab rather than adding another homepage section. Added concise Skills Lab links on Teaching and Resources. Footer Skills Lab now leads to the public landing page.
- Preserved English, 繁體中文 and 简体中文 navigation. New English guide/navigation labels carry `lang="en"`; Chinese landing pages visibly state **TRANSLATION REQUIRED**. Existing translated activity routes and language parameters are reused. Cardiorespiratory's existing English hub is identified as such.
- Added landing pages to search indexes and sitemap with canonical/hreflang metadata through the existing shell.
- Synchronised navigation/source hunks into the original `personal-blog` checkout without overwriting its unrelated article sources, article bodies or existing search records.

## Files changed

- `generate-site.mjs` — catalogue import, shared navigation/CSS reference, landing renderer, homepage/Teaching/Resources links, search record, page generation and sitemap.
- 192 existing generated HTML files across the root, `posts/`, `zh-hant/`, `zh-hant/posts/`, `zh-hans/` and `zh-hans/posts/` — shared header/footer links and stylesheet reference. Only Home, Teaching and Resources have additional main-content link changes; other existing main content is byte-identical.
- `search-index.json`, `search-index-inline.js` and their `zh-hant/` and `zh-hans/` counterparts — added Skills Lab record.
- `sitemap.xml` — added three Skills Lab routes.
- `docs/CODEX-HANDOFF.md`.

## Files created

- `skills-lab-content.mjs` — public category/activity catalogue.
- `assets/css/skills-lab.css` — landing styles and shared public navigation layout; not loaded by standalone student or goniometry/cardiorespiratory shells.
- `skills-lab.html`, `zh-hant/skills-lab.html`, `zh-hans/skills-lab.html` — generated landing pages.
- `tests/skills-lab-discovery.cjs` — responsive, keyboard, path and preservation checks.

## Tests performed

- `node --check generate-site.mjs` and generation: passed, 47 posts in each locale retained.
- `node .codex-review/site-audit.mjs`: passed, 212 HTML files, three search indexes, article parity 47/47/47.
- `tests/skills-lab-discovery.cjs`: 24 landing cases (390, 768, 1024, 1440px × three languages × light/dark), plus Home, Teaching, Resources, Writing and Media overflow checks at each width.
- All 15 activity links, category hub links, login and dashboard routes return 200 below the preview base; public activity links do not add `tracked=1`.
- Verified active navigation, all three language choices, keyboard menu activation, initial focus, Tab wrap, Escape close/focus return and scrollable menu access.
- Followed Student Login using the keyboard and checked the username field; followed a language selector to the corresponding Skills Lab route. No credentials submitted or student attempts written.
- Verified future category has no activity link and is labelled In development; Chinese guides show TRANSLATION REQUIRED; search includes the landing page.
- Compared existing generated main content with baseline: unchanged outside Home, Teaching and Resources. No game/scoring/authentication/Worker JavaScript or SQL changed; RSS unchanged.
- Repeated browser checks against the synchronised original local checkout. Inspected 390px and 1440px screenshots.
- `git diff --check`, diff scope and Git status reviewed before commit.

Reproduction: serve the release checkout under `/TakWing/` on port 8896, then run `PLAYWRIGHT_MODULE=/path/to/playwright node tests/skills-lab-discovery.cjs`. Override `SKILLS_BASE_URL` for another preview. The tests block external transport and do not assess external authentication or write live results.

## Known issues

- **TRANSLATION REQUIRED** — new landing copy, category headings, Skills Lab/Student Login navigation labels and Teaching/Resources entry copy need approved Traditional and Simplified Chinese wording. Existing translated footer labels are reused; no translations invented.
- Cardiorespiratory hub and student login/dashboard retain their existing English interfaces.
- Public catalogue is deliberately separate from authenticated registration. Keep links aligned with existing files and `cloudflare/seed-games.sql` when activities are explicitly added or retired.
- Earlier audit findings outside navigation/discoverability remain deferred. Chrome tests are not a full screen-reader/Safari/physical-device certification.

## Requires Tak Wing review

- Approved Chinese wording for the new Skills Lab content.
- Optional review of category grouping and the two-row desktop header.

## Next phase

Phase 5 — Awaiting Tak Wing's brief

No exact Phase 5 title has been supplied. Do not begin another phase or create Mobility & Assistive Devices games.

## Important implementation notes

- Release worktree: `/Users/takwingyu/GPT Codex/blog-ii-release`; branch `phase-3/media-showcase` (retained to avoid unnecessary branch movement). Baseline `ae38953`.
- Original checkout: `/Users/takwingyu/GPT Codex/personal-blog`. It retains unrelated drafts and its older branch. Phase 4 was applied through source/navigation patches and a search-record insertion, not a full overwrite or publication from that checkout.
- Source of truth: `skills-lab-content.mjs` and `buildSkillsLabPage` in `generate-site.mjs`. Do not hand-edit generated pages.
- Routes use relative paths compatible with `/TakWing/`. Chinese static activities use corresponding locale pages; translated standalone goniometry/typing activities use existing `lang` parameters.
- Tracked practice still starts from the existing authenticated dashboard, which supplies `tracked=1`. No backend, auth, scoring, tutor, clinical or progress-saving behaviour changed.
- Shared public navigation causes many generated HTML changes; article bodies and game main content must remain unchanged. Standalone game/category shells retain their existing navigation.
- Phase 3 replacement video `kfZ93HG7FNs` and all Instagram items remain intact. No Media redesign in this phase.
