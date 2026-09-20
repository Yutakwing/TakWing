# Phase 11 release report

20 September 2026. Baseline `d557a45`. Scope: public portfolio analytics preparation and transparency only.

## 1. Cloudflare Web Analytics status

**Software integration: COMPLETE. Cloudflare Web Analytics: CONFIGURED — live verification pending.**

## 2. Site/token status

The genuine user-supplied snippet was matched against Cloudflare Manage site for `yutakwing.github.io` on 20 September 2026. The exact module-script attributes are preserved. No account credential or example token was installed.

## 3. Files created

- `site-analytics.config.json`, `site-analytics.mjs`, `assets/js/site-analytics.js`.
- `privacy.html`, `zh-hant/privacy.html`, `zh-hans/privacy.html` (generated).
- `tests/site-analytics.mjs`, `tests/site-analytics-browser.cjs`.
- `docs/ANALYTICS-ARCHITECTURE.md`, `docs/ANALYTICS-REVIEW-GUIDE.md`, `docs/ANALYTICS-BASELINE-2026-09.md`, this report.

## 4. Files modified

Generator; regeneration workflow configuration trigger; generated public portfolio/article pages for footer/disabled loader; three JSON and three inline search indexes; sitemap; maintenance/design/content map/handoff; Writing integrity test (only allow the three new Privacy sitemap entries).

## 5. Public scope

Configured scope: Home, About, Research, Teaching, Writing/articles, Media, Resources, Skills Lab landing, Collaborate/Contact, Notes, Mobility overview and Privacy under the production `/TakWing/` base, including the three locales. The shared shell emits 192 loader/footer instances; legacy aliases among these fail the runtime allowlist and do not collect.

## 6. Exclusions

Student/login/dashboard; all activities and activity hubs; tracked and other query-bearing URLs; non-production/local/preview origins; detected automation; unknown paths/aliases; sensitive referrers. No script is emitted in generated activities or standalone student/game pages.

## 7. Student/tracked separation

Verified through source, 150 unit route/config/automation cases and intercepted browser tests. No reads from student storage, D1 identifiers, tokens, scores, hints, case context or tutor content. No cross-system identity or database joining. Public content remains public even if the person also has an unrelated student session.

## 8. Existing game analytics

PRESERVED, including helper, Worker, schema and existing event semantics. The inspection identified differing client/Worker coverage; no assumption that every activity records successfully. Its existing local/tracked behaviour was not changed. All test traffic to it was intercepted.

## 9. Privacy

Three generated Privacy routes and restrained public footer links, with English copy and TRANSLATION REQUIRED on Chinese routes. Configuration-driven status, public/student/game boundaries, external services and theme preference explanation. No banner, legal-compliance or absolute-anonymity claim.

## 10. CSP

No portfolio CSP configuration/meta or live homepage CSP/Report-Only header found. No CSP change or broadening. Future allowlisting guidance names only official script and non-proxied RUM origins.

## 11. Generator

One helper inserts an inert dashboard snippet only when enabled; one small deferred loader enforces runtime eligibility. The snippet attributes are preserved; unsupported/inline/foreign scripts fail validation. Configuration changes trigger regeneration. Privacy uses the current shell, search, canonical/hreflang and sitemap; no framework or second pipeline.

## 12. Network verification

Intercepted tests confirm one official-origin script request on simulated eligible production pages and none on excluded/pending/local cases. The fixture uses an explicitly invalid offline stub and never contacts Cloudflare. Real RUM and dashboard delivery await the activation deployment checks. No production student writes.

## 13. Performance

A roughly 2 KB deferred local helper, no UI insertion, storage, custom listeners or render-blocking vendor request. The disabled state emits no external snippet. Repeated execution does not alter main content bounds or duplicate a beacon in tests. Actual vendor payload/overhead and real-user metrics remain unmeasured until activation; no false LCP/INP/CLS claim.

## 14. Browser/mobile QA

108 fully intercepted cases at 390/768/1024/1440px cover eligible/excluded routes, pending state, Privacy in three locales, both themes, overflow, search, focus return and unchanged content bounds. Mobile/desktop Privacy screenshots inspected. 150 unit cases plus edge checks pass. Structural audit: 218 HTML files, three indexes, 47/47/47 posts. All 141 original article main sections, Writing metadata/relationships and three RSS feeds preserved. Sitemap changes only by three Privacy URLs (199 total). Syntax/diff checks and second-generation reproducibility pass. These are Chrome-emulated checks, not formal accessibility or physical-device certification.

## 15. Production deployment

Published with analytics disabled on 20 September 2026 (Hong Kong time). Implementation commit `5a63addbdce82dc1fc7a4e53a128b5ea8a6824eb` passed regeneration and GitHub Pages build/deployment ([run 35455342034](https://github.com/Yutakwing/TakWing/actions/runs/35455342034)). Thirteen live files match the committed release byte for byte, including Home, Writing, an article, Research, Skills Lab, all Privacy locales, the loader/configuration, student login/dashboard and Elbow Goniometry. Sixteen production browser cases at 390/1440px passed with the disabled public loader present and no Cloudflare requests. Other third-party/game/student API requests were intercepted to avoid production writes. Software publication does not activate analytics.

## 16. Dashboard verification

Manage site hostname and snippet verified; collection reception remains to be checked after deployment. Baseline intentionally contains no invented traffic values.

## 17. Tak Wing action

Cloudflare Dashboard → Web Analytics → Add site → hostname `yutakwing.github.io` → Manage site → copy JS snippet. Supply that exact snippet. After verification, enable configuration, regenerate/deploy and inspect live script/RUM and dashboard reception before marking ACTIVE. Do not supply an account API token.

## 18. Limitations/deferred work

Collections and Research sections are anchors, so no independent click/section traffic is measured. Start-here views do not establish the source of a click. No internal funnel, unique-person or research-impact claims. Query/referrer exclusions deliberately omit some traffic. New Privacy translations require approval. Custom events, analytics rankings and Phase 12 are not implemented. Phase 7's automatic AI context bridge remains a separate incomplete task.

## 19. Diff scope

Only the files listed above; no game logic, scoring, authentication, D1, tutor, Mobility configuration, article bodies or Phase 10 curation changes. The release checkout is authoritative; unrelated drafts in the original `personal-blog` checkout are untouched. Implementation commit: 215 files changed, 1,476 insertions and 245 deletions. A subsequent documentation-only commit records the verified deployment; no implementation changes were needed after the live checks.

## Activation follow-up — 20 September 2026

User authorised activation in Chrome and supplied the dashboard snippet. Added narrowly validated module-script support, enabled configuration, regenerated public pages and adjusted isolated tests to replace the real snippet with their offline module fixture. No student/game/scoring/backend changes. Deployment and network evidence will be recorded after verification.
