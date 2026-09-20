# Analytics baseline — September 2026

Prepared 20 September 2026.

**CLOUDFLARE WEB ANALYTICS ACTIVE — VERIFIED 20 SEPTEMBER 2026**

| Item | Status |
|---|---|
| Software integration | COMPLETE |
| Analytics activation date | 20 September 2026 (Hong Kong time) |
| Cloudflare site/property | `yutakwing.github.io`, verified in Cloudflare Manage site |
| Site snippet/token | User supplied; exact dashboard module snippet matched |
| Beacon status | ACTIVE — script HTTP 200, RUM POST HTTP 204 |
| Existing game analytics | PRESERVED |
| Student/tracked Web Analytics separation | VERIFIED in source, unit and intercepted-browser tests |
| Real RUM delivery | Verified in Chrome DevTools at the documented non-proxied endpoint |
| Dashboard verification | Initial reception confirmed in the user’s Chrome session |
| Initial data | Dashboard initially showed 1 visit and 1 page view; verification traffic, not an organic readership baseline |

## Public surfaces monitored

Active eligible scope: Home, About, Research, Teaching, Writing/articles, Media, Resources, Collaborate/Contact, Skills Lab landing, Notes, Mobility overview and Privacy, including the three language routes.

## Excluded surfaces

Student login/dashboard and all student routes; public/tracked activities and hubs; query-bearing URLs (including tracked=1); local/preview/test hosts; detected browser automation; unknown paths and legacy aliases; sensitive/referrer state as described in ANALYTICS-ARCHITECTURE.md.

## Validation evidence

150 route/config/automation unit cases plus referrer, duplicate, missing-config and parser checks. All 141 article main sections and three RSS feeds preserved. 108 fully intercepted browser cases at 390/768/1024/1440px cover eligible script insertion once, exclusions, disabled configuration, Privacy languages, search/theme/focus and unchanged main bounds on repeated loader execution. No genuine site token or production analytics/student requests were used. Real vendor network behaviour and performance overhead remain unmeasured.

Disabled integration published and verified on 20 September 2026 (Hong Kong time), commit `5a63add`: 13 live file matches and 16 production browser/width cases passed. This is a software deployment date, not an analytics activation date.

## Activation evidence

Activation commit `3da9d1b111a7273b226198e7730f74a1e1958bdd`; successful Pages run 35486172322 and regeneration run 35486172579. Ten live files matched the local release. User Chrome confirmed one module beacon on Home, Writing, an article, Research and Skills Lab. DevTools showed `https://static.cloudflareinsights.com/beacon.min.js` HTTP 200 and `https://cloudflareinsights.com/cdn-cgi/rum` POST HTTP 204. The observed payload contained public URL, page-load ID, browser/version and performance fields; no application/student fields. Login and a tracked public URL contained no live beacon; live tracked Elbow HTML contained no loader. No authenticated student-data writes.

Cloudflare initially showed 1 visit and 1 page view and an insufficient-data notice. These values include verification activity and are not evidence of readership or educational impact. Wait for genuine traffic before a meaningful baseline; do not interpret an isolated page-load timing as a performance benchmark.

## First real review

Follow the weekly review guide as organic data accumulates. Record date ranges and distinguish verification traffic from real readership. The initial sample is too small for content or performance conclusions.
