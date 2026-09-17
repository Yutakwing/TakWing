# Codex Website Handoff

## Last completed phase

Phase 1 — Website Audit and Baseline

Completed 17 September 2026. **STOP: do not start Phase 2 without its explicit brief.**

## Completed

- Inspected the required portfolio pages, shared CSS/JS, assets, article generation, Media, locale routes, search/RSS, student clients, games, Worker/D1 and the four specified implementation documents.
- Established published baseline `12cb93c5d4547d39d88e43965d857e2c664e7712` and checked remote `main`/Pages state.
- Protected unrelated drafts by working in the previously clean release worktree on branch `audit/phase-1-baseline-20260917`.
- Created the architectural audit, risk/debt inventory and proposed Phases 2–7 sequence.
- Added a repeatable read-only local browser baseline test.
- No confirmed broken internal links or invalid asset paths required repair. No visual redesign, scoring/authentication changes, database operations or production deployment were made in this phase.

## Files changed

No pre-existing tracked files were modified. The three newly created files below comprise the complete Phase 1 change.

## Files created

- `docs/CODEX-HANDOFF.md`
- `docs/WEBSITE-AUDIT-2026-09.md`
- `tests/website-baseline.cjs`

## Tests performed

- `npm test --prefix cloudflare`: **13/13 pass**. Includes session expiry, isolation, bounded results, historical migration preservation, atomic saves, duplicate/concurrent UUID handling and optional webhook failure.
- `node --check generate-site.mjs`: pass.
- `node generate-site.mjs`: **45 posts × three languages**, reproducible with no generated diff.
- `node .codex-review/site-audit.mjs`: **203 HTML files / three search indexes / 45–45–45 articles**, no structural errors.
- Supplemental same-page anchor and CSS URL scan: no missing targets.
- RSS XML: **45 items per locale**. Sitemap XML: **184 URLs**.
- Read-only live sitemap scan: **184/184 HTTP 200**. GitHub Pages status `built`, source `main:/`.
- New browser baseline: **84/84 page/viewport checks passed** in installed Chrome at 1440 and 390 pixels. Includes eight main pages × three languages, Goniometry/Cardiorespiratory hubs, student login, and 15 public activities. No page-width overflow, broken loaded images or uncaught page exceptions in this matrix.
- Theme persistence, English search and result paths, mobile menu/Escape/inert state, unauthenticated dashboard/tracked-game redirects and reduced-motion reveal behaviour passed.
- Targeted exploratory checks reproduced the search-modal focus escape, blocked-storage script failure and English-only Cardiorespiratory hub language behaviour; deferred findings are in the audit.
- Live unauthenticated `/api/me` via curl returned **401** and the expected allowed-origin CORS header. Python requests initially received **403**; no authenticated-service success is inferred from this test.
- `git diff --check`, final diff review and Git status review performed for this phase.

### Reproducing the browser baseline

Use Node and an existing Playwright installation with installed Google Chrome. Set `PLAYWRIGHT_MODULE` when Playwright is not locally installed. Host the checkout below a real `/TakWing/` URL, not only at the server root. For this run, `/tmp/takwing-phase1-preview/TakWing` was a symlink to this worktree, served at `http://127.0.0.1:8890/TakWing/`.

```sh
BASELINE_URL=http://127.0.0.1:8890/TakWing/ \
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
node tests/website-baseline.cjs
```

The test rejects non-local hosts, blocks third-party requests and writes its report to `/tmp/takwing-phase1-browser.json` (override with `BASELINE_REPORT`). It writes no production data. A local Python server with a 128-connection accept queue was used after the default small queue caused intermittent image-load failures during burst requests; those initial harness failures were not mistaken for broken production assets. The final complete matrix passed.

## Known issues

- The original `personal-blog` checkout is behind published `main` and contains unrelated modified/untracked drafts. It is not safe to regenerate and release that checkout without deliberate reconciliation.
- Search modal does not contain keyboard focus; portfolio shell lacks a skip-to-main link.
- Blocked localStorage aborts the shared script's setup; unsupported IntersectionObserver has no explicit fallback.
- Goniometry manipulation needs a dedicated keyboard-accessibility review. No WCAG, contrast or screen-reader certification is claimed.
- Mixed localisation models: generated locale directories, query-language games, English student/result/tutor UI, and an English Cardiorespiratory hub advertising Chinese alternates. Blog II Chinese translations remain explicitly pending.
- Authoring documentation has stale map names/counts. Older deployment notes coexist with newer status updates; read dates and the current implementation.
- Large source assets, served Blog II PNGs, eager search-index loading, font families and accumulated CSS warrant later measured optimisation.
- Existing scores are formative/client-calculated, not tamper-proof clinical competence measurements. Lecturer-review flags remain.
- Live authenticated login, native full game completion/restart, live save/retry/history and AI replies were **not freshly rerun** in Phase 1. Backend tests, source inspection, read-only public checks and unauthenticated browser gating establish this phase's baseline. Earlier evidence is in `docs/FUNCTIONAL-REVIEW-2026-09.md`.
- Zapier downstream delivery/configuration, real email delivery, real student data, Safari and physical devices were not tested.

## Requires Tak Wing review

- Approve or replace the proposed names/scopes for Phases 2–7; they were not supplied as implementation briefs.
- Decide how to reconcile the unpublished Song/Enough About Catching AI drafts with the current published branch before a later release.
- Review language coverage, accessibility priorities, clinical rubric flags and third-party service arrangements in their appropriate phases.
- No approval is needed to regard Phase 1 as complete; the above items are future decisions, not unfinished Phase 1 implementation.

## Next phase

Phase 2 — Navigation, Accessibility and Shared UI Foundations

This is the exact **recommended** next-phase name from the audit. Await Tak Wing's phase-specific instructions. **Do not start it now.**

## Important implementation notes

- Current audit worktree: `/Users/takwingyu/GPT Codex/blog-ii-release`; branch `audit/phase-1-baseline-20260917`. The name reflects the previous release; this branch now contains Phase 1 documentation/tests.
- Original worktree: `/Users/takwingyu/GPT Codex/personal-blog`, branch `feature/academic-positioning-refinement`, based on `9439ace`, with 124 pre-existing modified tracked files and untracked drafts. These remain untouched.
- Production baseline includes Blog II IDs 333/334. The original checkout's IDs 331/332 are unpublished. Both happen to count 45 articles per locale: compare IDs/slugs, not just counts.
- Preserve `/TakWing/`, existing slugs, locale paths, search and feeds. Modify generator/content sources for generated pages, not only their output.
- Game registration lives in `cloudflare/seed-games.sql`; next-skill order is duplicated in `student/assets/progress-client.js`. Preserve `tracked=1`, locale and save-before-continue behaviour.
- Auth/session transport belongs to `student/assets/auth.js`; D1 remains authoritative for saved results. Never apply production schema creation or repeat migrations casually.
- Skills Tutor uses manual copy/paste context, not live injection. Public mascot and optional result forwarding are separate systems.
- The Phase 1 commit is local only. No push or deployment is part of this phase. Locate it by commit subject `Document Phase 1 website audit and safe baseline`.
