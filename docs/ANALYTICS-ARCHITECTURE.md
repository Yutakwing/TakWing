# Analytics architecture

Phase 11 — 20 September 2026.

**Software integration: COMPLETE. Cloudflare Web Analytics: CONFIGURED; live verification pending.**

Genuine user-supplied snippet matched against the Cloudflare Manage site screen on 20 September 2026.

## 1. Purpose

Understand aggregate readership and real-user performance of the public academic portfolio. This is not individual student monitoring, research-impact measurement or educational-effectiveness evidence. No traffic values have been collected or invented for this phase.

## 2. Cloudflare Web Analytics role

The site is on GitHub Pages, so use the manual dashboard snippet, not Cloudflare Pages automatic injection. `site-analytics.config.json` contains `enabled: true`, the verified hostname and the exact dashboard module snippet. `site-analytics.mjs` validates configuration, creates an inert snippet template and adds the deferred local loader through the generator. `assets/js/site-analytics.js` checks eligibility before creating the official external script. No proxy or self-hosted copy of the beacon.

## 3. Existing game analytics role

`game-analytics.js` sends page_view, play_started, hint_used and completed events to its existing separate Worker. It uses temporary event/run IDs, experience ID, optional stage and completion duration. `cloudflare/game-analytics/` stores those bounded fields in its own D1 schema. It does not intentionally persist names, emails, IPs, user-agent strings, scores or demographics. Ordinary service requests still involve network metadata.

The inspected Worker allowlist covers nine experience IDs, while additional clients also call the helper. Do not assume every activity is accepted or that a successful page load proves a recorded event. Existing activity coverage, local-development behaviour and tracked-mode event calls are preserved, not redesigned here.

## 4. System separation

Public Web Analytics does not call either Worker or D1, read student storage, share run IDs, create visitor IDs or join datasets. Authenticated progress remains a third, separate system. Do not combine Web Analytics totals with game runs to infer unique people or follow an individual through learning activities.

## 5. Included public pages

Configured scope: `/TakWing/`, index, About, Research, Teaching, Writing, posts, Media, Resources, Collaborate, Contact, Skills Lab landing, Mobility overview, Notes and Privacy. The same public routes under `zh-hant/` and `zh-hans/` use the same snippet. The host root `/` is outside this project's deployment base and is not instrumented. Legacy alias pages receive the public footer/loader from the shared shell but are not on the runtime path allowlist, avoiding duplicate discovery-page counts.

## 6. Excluded pages

All standalone activity/hub routes, generated AI Literacy/Reasoning Runner/Clinical Readiness activities, student pages, unknown routes, 404, legacy aliases, other GitHub projects, previews and non-HTTPS/non-production origins. The generator omits the loader from generated activities, and the runtime path allowlist provides a second boundary.

## 7. Tracked/student exclusions

Every URL with a query string is excluded, including `tracked=1`, repeated or encoded variants, `lang`, contact `subject`, case parameters and campaigns. No query stripping, rewriting, custom titles or event enrichment is performed. The loader also skips a referring URL with query/hash state or a same-origin referrer outside the public allowlist (including student/activity routes). This avoids intentionally forwarding learner context through the vendor's referrer field. Unknown initial fragments are skipped; known document anchors remain page-level views.

Excluding Web Analytics does not disable existing authenticated progress or legacy game statistics. No login-state test is performed on public pages, since that would require consulting student state; a signed-in person reading ordinary public content is still visiting a public page.

## 8. Local development and tests

Only `https://yutakwing.github.io` beneath `/TakWing/` is allowed. Localhost, loopback, IPv6, LAN and arbitrary preview hosts cannot activate it. `navigator.webdriver` provides an additional automated-test exclusion; it is not a universal bot detector. Browser tests intercept every request and use an explicitly invalid, non-network stub, never a genuine site token. Existing game telemetry must also be intercepted when testing games, because its historical local behaviour is unchanged.

## 9. Data minimisation

No new cookies, storage identifiers, fingerprinting, custom events or student/application fields. Cloudflare's own documented per-page in-memory load identifier is not a site-created persistent visitor ID. Public form values are not read by this loader. Do not place confidential material in public page URLs, titles or assets. The remote beacon is vendor-managed code; activation must include network inspection of its actual payload. Conservative query/referrer exclusions reduce coverage and should be recorded when interpreting totals.

## 10. Activation and disabling

1. Cloudflare Dashboard → Web Analytics → Add site → hostname `yutakwing.github.io` → Manage site → copy JS snippet. For GitHub Pages use the non-proxied/manual setup.
2. Supply the exact snippet for this site. It is not a Cloudflare account API token. Do not use documentation example tokens or a token from another property.
3. Paste the complete snippet as the JSON `snippet` string in `site-analytics.config.json`; retain its dashboard attributes. The validator accepts one external non-blocking script from the official beacon path, optional integrity/crossorigin, `type="module"` (non-blocking without defer), and dashboard data attributes. A changed official snippet format may require a reviewed validator update, never guessing or weakening it.
4. Confirm the hostname/property in the dashboard, set `enabled: true`, regenerate, test with outbound analytics intercepted, and deploy. Recheck the generated Privacy wording.
5. Verify real production requests and dashboard reception before changing the baseline status to ACTIVE. Record the actual activation date and property, not the preparation date.

To disable: set `enabled: false`, regenerate and deploy. No external snippet is emitted while disabled, even if the configuration retains it. The workflow watches configuration changes. A site token embedded in a public snippet is public configuration; account API credentials must never be committed.

## 11. Beacon verification

In an ordinary browser on an eligible live page, inspect Network for one request to `https://static.cloudflareinsights.com/beacon.min.js` (preserving any dashboard version query). For this non-proxied site, inspect the documented `https://cloudflareinsights.com/cdn-cgi/rum` destination. Some performance reports occur when the document first becomes hidden. Inspect payloads without exporting credentials or private browsing state. Check home, Writing, an article, Research and Skills Lab; check no beacon on login/dashboard, a tracked activity, local preview and query-bearing public pages.

The current tests verify only the intercepted official-origin script insertion and exclusion logic. Real RUM and dashboard reception are checked separately after deployment; see the baseline.

## 12. Available metrics

Cloudflare documents visits, page views, page-load time and Core Web Vitals. A visit is based on an external or absent referrer, not a persistent unique-person count. Browser support, blockers, sampling and eligibility exclusions affect totals. Do not translate visits into identified people or guaranteed readership.

## 13. Filters and reporting groups

Use Host `yutakwing.github.io` plus Path beneath `/TakWing/`, then compare equivalent time windows. Include locale prefixes deliberately. See ANALYTICS-REVIEW-GUIDE.md for page groups. Dashboard dimensions include country, device type, browser, operating system and external referrer host where available. Do not promise finer regional data or complete internal referral paths; verify the actual dashboard capability first.

## 14. Performance metrics

Review page-load time and LCP (main content load), INP (interaction responsiveness), CLS (visual stability), with page and mobile/desktop filters. Compare distributions/P75 and sample availability rather than isolated values. Unsupported browsers, low samples and vendor collection timing can leave gaps. This phase adds measurement preparation, not performance redesign.

## 15. Privacy and CSP

Three generated Privacy pages explain the configured status, public analytics scope, game/student separation, theme preferences, FormSubmit and third-party embeds/fonts/tutor. New privacy copy remains English with TRANSLATION REQUIRED on Chinese routes. There is no generic cookie banner, legal-compliance claim or absolute-anonymity claim.

No portfolio CSP meta tag or repository CSP configuration was found; the production homepage returned neither CSP nor Report-Only CSP headers during review. No CSP was weakened or added. If one is introduced later, permit only the documented script origin and non-proxied RUM connection origin alongside existing required sources. Never use a wildcard script policy.

## 16. Known limits

Writing's four collections and Research projects are fragments of shared pages. Standard page views do not establish which collection disclosure or project section was used. Start-here article views do not prove a click from Start here. Same-host referral flows and article-completion/reading-time claims are not established by this integration. No unique visitors, student journeys, collection rankings, internal funnels or cross-system attribution are created. Query-bearing visits and referrers are deliberately omitted. Real-beacon overhead has not been benchmarked. See the baseline for observed activation and dashboard evidence.

## 17. Future custom events

A separately authorised phase could consider additional aggregate engagement measurement, with documented vendor support and a fresh privacy review. No click, scroll, hover, reading-completion, outbound, mouse or custom event API is implemented here. No Phase 12 work.

## Official documentation consulted

- [Manual setup](https://developers.cloudflare.com/web-analytics/get-started/)
- [Data origin and collection](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/)
- [Metrics](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/)
- [Dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)
- [Core Web Vitals](https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/)
- [RUM fields and privacy](https://developers.cloudflare.com/speed/observatory/rum-beacon/)

Reviewed for this implementation on 19–20 September 2026. Dashboard hostname and genuine snippet were verified in the user’s signed-in Chrome session on 20 September 2026.
