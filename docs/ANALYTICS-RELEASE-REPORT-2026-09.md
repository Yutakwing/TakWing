# Phase 11 release report

20 September 2026. Baseline `d557a45`. Scope: public portfolio analytics preparation and transparency only.

## 1. Cloudflare Web Analytics status

**Software integration: COMPLETE. Cloudflare Web Analytics: PENDING TOKEN.** Production collection remains disabled.

## 2. Site/token status

**ACTIVATION PENDING — CLOUDFLARE WEB ANALYTICS SNIPPET REQUIRED.** Repository and approved local project configuration searches found no genuine snippet. Intended hostname: `yutakwing.github.io`; dashboard property/ownership not verified. No example, invented or other-site token was installed.

## 3. Files created

- `site-analytics.config.json`, `site-analytics.mjs`, `assets/js/site-analytics.js`.
- `privacy.html`, `zh-hant/privacy.html`, `zh-hans/privacy.html` (generated).
- `tests/site-analytics.mjs`, `tests/site-analytics-browser.cjs`.
- `docs/ANALYTICS-ARCHITECTURE.md`, `docs/ANALYTICS-REVIEW-GUIDE.md`, `docs/ANALYTICS-BASELINE-2026-09.md`, this report.

## 4. Files modified

Generator; regeneration workflow configuration trigger; generated public portfolio/article pages for footer/disabled loader; three JSON and three inline search indexes; sitemap; maintenance/design/content map/handoff; Writing integrity test (only allow the three new Privacy sitemap entries).

## 5. Public scope

No Cloudflare pages are monitored yet. Prepared scope: Home, About, Research, Teaching, Writing/articles, Media, Resources, Skills Lab landing, Collaborate/Contact, Notes, Mobility overview and Privacy under the production `/TakWing/` base, including the three locales. The shared shell emits 192 disabled loader/footer instances; legacy aliases among these fail the runtime allowlist and do not collect.

## 6. Exclusions

Student/login/dashboard; all activities and activity hubs; tracked and other query-bearing URLs; non-production/local/preview origins; detected automation; unknown paths/aliases; sensitive referrers. No script is emitted in generated activities or standalone student/game pages.

## 7. Student/tracked separation

Verified through source, 150 unit route/config/automation cases and intercepted browser tests. No reads from student storage, D1 identifiers, tokens, scores, hints, case context or tutor content. No cross-system identity or database joining. Public content remains public even if the person also has an unrelated student session.

## 8. Existing game analytics

PRESERVED, including helper, Worker, schema and existing event semantics. The inspection identified differing client/Worker coverage; no assumption that every activity records successfully. Its existing local/tracked behaviour was not changed. All test traffic to it was intercepted.

## 9. Privacy

Three generated Privacy routes and restrained public footer links, with English copy and TRANSLATION REQUIRED on Chinese routes. Accurate pending status, public/student/game boundaries, external services and theme preference explanation. No banner, legal-compliance or absolute-anonymity claim.

## 10. CSP

No portfolio CSP configuration/meta or live homepage CSP/Report-Only header found. No CSP change or broadening. Future allowlisting guidance names only official script and non-proxied RUM origins.

## 11. Generator

One helper inserts an inert dashboard snippet only when enabled; one small deferred loader enforces runtime eligibility. The snippet attributes are preserved; unsupported/inline/foreign scripts fail validation. Configuration changes trigger regeneration. Privacy uses the current shell, search, canonical/hreflang and sitemap; no framework or second pipeline.

## 12. Network verification

Intercepted tests confirm one official-origin script request on simulated eligible production pages and none on excluded/pending/local cases. The fixture uses an explicitly invalid offline stub and never contacts Cloudflare. Real RUM and dashboard delivery are unverified pending the genuine snippet. No production student writes.

## 13. Performance

A roughly 2 KB deferred local helper, no UI insertion, storage, custom listeners or render-blocking vendor request. The disabled state emits no external snippet. Repeated execution does not alter main content bounds or duplicate a beacon in tests. Actual vendor payload/overhead and real-user metrics remain unmeasured until activation; no false LCP/INP/CLS claim.

## 14. Browser/mobile QA

108 fully intercepted cases at 390/768/1024/1440px cover eligible/excluded routes, pending state, Privacy in three locales, both themes, overflow, search, focus return and unchanged content bounds. Mobile/desktop Privacy screenshots inspected. 150 unit cases plus edge checks pass. Structural audit: 218 HTML files, three indexes, 47/47/47 posts. All 141 original article main sections, Writing metadata/relationships and three RSS feeds preserved. Sitemap changes only by three Privacy URLs (199 total). Syntax/diff checks and second-generation reproducibility pass. These are Chrome-emulated checks, not formal accessibility or physical-device certification.

## 15. Production deployment

Prepared for a scoped GitHub Pages release with analytics disabled. Deployment evidence is recorded after the push; software publication must not be described as analytics activation.

## 16. Dashboard verification

Not performed. No genuine site snippet/account property or collected data has been verified. Baseline intentionally contains no traffic values.

## 17. Tak Wing action

Cloudflare Dashboard → Web Analytics → Add site → hostname `yutakwing.github.io` → Manage site → copy JS snippet. Supply that exact snippet. After verification, enable configuration, regenerate/deploy and inspect live script/RUM and dashboard reception before marking ACTIVE. Do not supply an account API token.

## 18. Limitations/deferred work

Collections and Research sections are anchors, so no independent click/section traffic is measured. Start-here views do not establish the source of a click. No internal funnel, unique-person or research-impact claims. Query/referrer exclusions deliberately omit some traffic. New Privacy translations require approval. Custom events, analytics rankings and Phase 12 are not implemented. Phase 7's automatic AI context bridge remains a separate incomplete task.

## 19. Diff scope

Only the files listed above; no game logic, scoring, authentication, D1, tutor, Mobility configuration, article bodies or Phase 10 curation changes. The release checkout is authoritative; unrelated drafts in the original `personal-blog` checkout are untouched. Final staged totals and publication evidence are recorded below after verification.
