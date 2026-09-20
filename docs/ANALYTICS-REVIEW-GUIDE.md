# Reviewing website engagement

**Start here: the genuine snippet is configured.** Consult ANALYTICS-BASELINE-2026-09.md for live verification and the activation date. The steps below describe a review routine after activation, not findings about current readership.

## Weekly quick check

Open Cloudflare → Web Analytics → the verified `yutakwing.github.io` site. Filter to `/TakWing/` and the last seven complete days. Compare the previous equivalent period. Note visits, page views, leading pages, external referrers and any obvious page-load/performance problem. If data is absent, check activation, browser blockers and date filters before assuming nobody visited. Visits are not a count of individually identified people.

Keep a short note of the period, filters, observed figures and relevant context (for example, a newly shared article). Do not add artificial traffic targets. Avoid conclusions from a small sample or a single unusually busy day.

## Monthly review

Compare equivalent full months and document days without collection. Review:

- Writing archive and article page views; compare recent pieces with older writing.
- Start-here article URLs: Enough About Catching AI; Beyond the Right Answer; A VR Demonstration Is Not Yet a Learning Experience; When Teaching Becomes Boring. Views show interest in those articles, not proof that readers used the Start here links.
- The four collections: use the membership inventory in WRITING-ARCHITECTURE.md to group article readership for your private editorial review. This is an article-based proxy; collection anchor clicks are not measured. Articles can belong to more than one collection, so group totals overlap and must not be added as unique visits.
- Research, Teaching, Skills Lab landing, Media and Collaborate discovery.
- External referrer hosts, broad countries, device/browser/operating-system categories when shown. Fine regional information is not guaranteed.
- Mobile versus desktop page-load time, LCP, INP and CLS. In Core Web Vitals, examine page filters, P75/distributions and sample sufficiency. Missing metrics may reflect browser support rather than good performance.

The standard dashboard does not establish whether Writing sent a particular reader into Skills Lab. Referer host is primarily useful for external discovery; same-site path journeys are not a promised report. Consult existing game totals separately for activity use; do not join visits to runs or student records.

## Quarterly content review

Identify evergreen articles still receiving views, pieces with little discovery, and whether existing internal links might help readers find useful work. Compare that evidence with the site's educational purpose before changing homepage emphasis. Page views do not show completion, understanding, educational benefit, research impact or citation impact. Research section anchors and media play events are not separately measured.

Keep these observations private. There are no public popularity rankings, visitor profiles or automated editorial decisions. Use real figures only, with the date range, filters and limitations retained.

## Reporting map

Apply the corresponding `zh-hant/` and `zh-hans/` prefix after `/TakWing/` when including translated routes. No URLs are rewritten for reporting.

| Group | Paths |
|---|---|
| Home | `/TakWing/`, `/TakWing/index.html` |
| Writing | `/TakWing/writing.html`, `/TakWing/posts/*` |
| Research | `/TakWing/research.html` |
| Teaching | `/TakWing/teaching.html` |
| Skills Lab entry | `/TakWing/skills-lab.html` |
| Media | `/TakWing/media.html` |
| Resources | `/TakWing/resources.html` |
| Collaboration | `/TakWing/collaborate.html`, `/TakWing/contact.html` |
| About | `/TakWing/about.html` |
| Other public content | `/TakWing/notes.html`, `/TakWing/mobility.html`, `/TakWing/privacy.html` |

## Interpreting gaps

All query-bearing pages, student/activity routes, local previews, detected automation and sensitive referrers are excluded from this integration. Therefore campaign-query URLs and contact subject links are deliberately undercounted. Browser blockers, network restrictions and available samples also affect totals. Do not infer individual behaviour or absolute anonymity from aggregate charts.

For metric definitions consult [Cloudflare's metrics guide](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/); for filters use its [dimensions reference](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/). Real dashboard availability must be confirmed after activation.
