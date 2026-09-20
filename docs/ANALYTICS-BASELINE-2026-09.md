# Analytics baseline — September 2026

Prepared 20 September 2026.

**ACTIVATION PENDING — CLOUDFLARE WEB ANALYTICS SNIPPET REQUIRED**

| Item | Status |
|---|---|
| Software integration | COMPLETE |
| Analytics activation date | PENDING |
| Cloudflare site/property | PENDING verification; intended hostname `yutakwing.github.io` |
| Site snippet/token | Not supplied; configuration contains null |
| Beacon status | PENDING — production disabled |
| Existing game analytics | PRESERVED |
| Student/tracked Web Analytics separation | VERIFIED in source, unit and intercepted-browser tests |
| Real RUM delivery | Not tested — no genuine token |
| Dashboard verification | Not performed |
| Initial data | Awaiting collection |

## Public surfaces monitored

None through Cloudflare Web Analytics while disabled. After verified activation: Home, About, Research, Teaching, Writing/articles, Media, Resources, Collaborate/Contact, Skills Lab landing, Notes, Mobility overview and Privacy, including the three language routes.

## Excluded surfaces

Student login/dashboard and all student routes; public/tracked activities and hubs; query-bearing URLs (including tracked=1); local/preview/test hosts; detected browser automation; unknown paths and legacy aliases; sensitive/referrer state as described in ANALYTICS-ARCHITECTURE.md.

## Validation evidence

150 route/config/automation unit cases plus referrer, duplicate, missing-config and parser checks. All 141 article main sections and three RSS feeds preserved. 108 fully intercepted browser cases at 390/768/1024/1440px cover eligible script insertion once, exclusions, disabled configuration, Privacy languages, search/theme/focus and unchanged main bounds on repeated loader execution. No genuine site token or production analytics/student requests were used. Real vendor network behaviour and performance overhead remain unmeasured.

Disabled integration published and verified on 20 September 2026 (Hong Kong time), commit `5a63add`: 13 live file matches and 16 production browser/width cases passed. This is a software deployment date, not an analytics activation date.

## First real review

After supplying the genuine dashboard snippet, record the activation date, verified property, successful live beacon/RUM requests and the first observed dashboard data. Then start the weekly review guide. Leave all visits, page views, referral and performance numbers absent until actual observations exist.
