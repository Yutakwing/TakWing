# Codex Website Handoff

## Last completed phase

Phase 10 — Writing Architecture & Reader Journey.

19 September 2026. Writing implementation, local validation and publication are complete. No Phase 11 has been started. This does not retroactively complete the Phase 7 automatic AI-context bridge or assert completion of an unspecified Phase 9. Earlier Phase 8 evidence remains in WEBSITE-RELEASE-REPORT-2026-09.md.

## Completed

- Inspected the clean release baseline `a4b8f05`, existing generation and all 47 published article bodies.
- Added four reader-facing anchored collections, content types, one Start here per collection and a compact complete chronological archive.
- Reordered Writing discovery while preserving lead/recent images, Practice Notes, underlying subject archive and reading times.
- Generated semantic no-JavaScript TOCs for qualifying articles, retaining wording and existing IDs.
- Added ten curated practice connections, three later-article progressions and a repository-grounded Sydney official-source link for Movement Science.
- Supported optional evidence-review/editorial dates without assigning any invented date. Preserved original BlogPosting fields and added valid genre/keywords.
- Added collection/type search discovery and visible RSS/LinkedIn follow links; feeds, sitemap and article URLs remain unchanged.
- Documented curation, source boundaries, translation requirements, maintenance and release tests. No student/game/backend/tutor changes.

## Files changed

- `generate-site.mjs`.
- `writing.html`, `zh-hant/writing.html`, `zh-hans/writing.html`.
- All 47 generated pages in each of `posts/`, `zh-hant/posts/`, `zh-hans/posts/` — metadata, structural H2 IDs and reader components only; original bodies preserved.
- `search-index.json`, `search-index-inline.js` and both locale equivalents.
- `docs/WEBSITE-MAINTENANCE.md`, `docs/DESIGN-SYSTEM.md`, `docs/SITE-CONTENT-MAP.md`, `docs/CODEX-HANDOFF.md`.

## Files created

- `writing-architecture.mjs`.
- `assets/writing-architecture.css`.
- `tests/writing-architecture.mjs`.
- `tests/writing-reader-journey.cjs`.
- `docs/WRITING-ARCHITECTURE.md`.
- `docs/WRITING-RELEASE-REPORT-2026-09.md`.

## Tests performed

- 215 HTML files and three search indexes pass structural audit; 47/47/47 article parity.
- All 141 article bodies preserved after normalising new H2 IDs; unchanged URLs, original BlogPosting properties and key Open Graph tags; three byte-identical 47-item feeds and unchanged sitemap.
- 69 generated TOCs checked for unique IDs and valid targets. Threshold/short-note/collision/idempotence/date edge cases pass. Thirty-nine curated practice/progression blocks across locales.
- Browser: 56 English page/theme/width cases, 56 locale layouts, 16 collection entry points at 390/768/1024/1440px. No overflow/missing images/captured errors. Native TOC, keyboard focus, header offsets, no-JS reading, search, theme persistence and language links pass.
- Existing accessibility suite: 80 cases including ≥4.5:1 text/accent token contrast, reduced motion and storage/observer fallbacks. Existing Phase 2 article suite: 12 cases.
- Inspected desktop/mobile Writing and article screenshots. Added CSS 3,716 bytes; no new browser JS, image or scroll handler.
- Syntax, `git diff --check`, scoped diff/status and byte-identical second generation pass.
- Release `c4566f8` is live: GitHub Pages built; 22 served files match local bytes (three Writing pages, search JSON/inline indexes, feeds, three representative articles per locale and the stylesheet). Live collection/search/guide/TOC checks pass at 390/1440px. The implementation commit changed 161 files, with 3,157 insertions and 1,479 deletions.

Reproduce with Chrome and Playwright (`PLAYWRIGHT_MODULE` supports the installed runtime), and an HTTP preview serving this checkout under `/TakWing/` with adequate connection backlog. `WRITING_BASE_URL` defaults to port 8896. New integrity tests pin the pre-Phase-10 baseline; change that baseline only for approved future content changes. No live student data writes were performed.

## Known issues

- TRANSLATION REQUIRED for new Writing structural copy; existing translated bodies/placeholders unchanged.
- SFU/HKU policy source URLs require verification. No fresh policy review or visible update date was invented.
- Automated Chrome/keyboard/token checks do not constitute screen-reader, physical-device, Safari or WCAG certification.
- Lazy search remains deferred. Existing shared CSS/search size and original PNG provenance assets are unchanged.
- Phase 7 automatic context bridge remains incomplete: real Zapier action-level test succeeded, but no backend request/return bridge is configured. Manual handoff remains; public Elbow intentionally has no tutor, enabled tracked games require login.
- Existing Mobility clinical configuration and game rubrics retain LECTURER VERIFICATION REQUIRED; no new clinical rules.
- Publication of implementation `c4566f8` was verified. This subsequent documentation-only update records that evidence; no additional site behaviour changed.

## Requires Tak Wing review

- Collection curation and Start here choices; complete inventory/rationale in WRITING-ARCHITECTURE.md.
- Approve structural translations before replacing English-labelled guidance.
- Provide/verify institutional policy sources and substantive review dates where appropriate.
- Existing Phase 7 connection/credentials decision and Mobility lecturer verification remain separate tasks.

## Next phase

No next phase authorised. Do not begin Phase 11.

## Important implementation notes

- Canonical release checkout: `/Users/takwingyu/GPT Codex/blog-ii-release`, branch `phase-3/media-showcase`. Pre-phase HEAD and remote main were `a4b8f056c3a5a45983009c7f4fad8caed7daf28f`.
- Original `/Users/takwingyu/GPT Codex/personal-blog` retains unrelated drafts and divergent content; it was not synchronised or regenerated in Phase 10. Use release checkout/preview for this work.
- `writing-architecture.mjs` owns only ID-keyed discovery metadata; existing article sources own titles, slugs, bodies, images and dates. Generator validation requires curated published IDs and one valid start per collection.
- Existing subject categories/related-post logic remain. Four anchors create no new routes. Styles are Writing-only; homepage/game/auth/backend/tutor files are unchanged.
- Preserve generated heading IDs explicitly when renaming an H2 in a future substantive revision. Do not use generation time as source-review/editorial time.
- Pages remains main/root, base `/TakWing/`. Push explicitly to main and verify the served bytes after Pages builds. No Worker/D1 or Zapier deployment accompanies this phase.
- Previous Zap draft/action identifiers and context/result boundaries remain documented in AI-TUTOR-GAME-MAP.md. Never reuse completed-result forwarding for tutor context or send identity/auth/session fields.
