# Search indexing readiness — September 2026

Review date: 20 September 2026. Scope: indexing infrastructure only; no redesign, article edits, game/student/backend changes or new roadmap phase.

| Check | Result |
|---|---|
| Google verification file | PRESENT — `google8c2878bc25812304.html` |
| Published verification URL | https://yutakwing.github.io/TakWing/google8c2878bc25812304.html — HTTP 200, exact supplied bytes |
| Search Console ownership | Owner reports verification complete; no repeat verification needed |
| Project robots.txt | PASS syntax/reference and HTTP 200; subdirectory discovery limitation below |
| Sitemap | PASS XML, HTTPS, base path, uniqueness, local file existence and live availability |
| Sitemap URL count | 199, including 141 article routes (47 per locale) |
| Student/tracked/local/test URLs in sitemap | None |
| Important public pages | PASS — 10 portfolio routes per locale, including Privacy |
| Canonicals | PASS — 171 portfolio/article pages match the current production URL architecture |
| Indexability | PASS technical checks — no noindex on those 171 pages; all 199 sitemap URLs return HTTP 200 without X-Robots-Tag noindex |
| hreflang | PASS structural relationships, existing target files and reciprocal links across 171 pages; translation limitations remain |
| Structured data | PRESERVED — 4 Person and 141 BlogPosting JSON-LD blocks parse successfully |
| 404 | Existing noindex preserved |
| Student pages | Not added to sitemap; existing behaviour unchanged |
| Verification-file regeneration safety | PASS — generator leaves exact bytes unchanged |
| Search Console sitemap submission | NOT VERIFIED in dashboard — owner action if not already submitted |
| Actual Google indexing | Not established by these checks |

## Tests performed

- Parsed sitemap XML: no duplicate URLs, malformed paths, query strings, fragments, wrong origin/base, student-only routes or absent local files.
- Checked English/Traditional Chinese/Simplified Chinese Home, About, Research, Teaching, Writing, Skills Lab, Media, Resources, Collaborate and Privacy, plus all articles: 171 canonical/indexability/hreflang checks.
- Fetched all 199 sitemap URLs over HTTPS: all HTTP 200; no X-Robots-Tag noindex response.
- Compared live verification file, sitemap and project robots.txt byte for byte against repository files; verification also matches the supplied Downloads file.
- Served six local URLs beneath `/TakWing/`: verification file, sitemap, robots, homepage, Research and Writing all returned HTTP 200 with exact local bytes.
- Parsed existing JSON-LD; performed generation to confirm verification-file preservation. Generation produced no working-tree differences. No public runtime code changed, so no new browser interaction or layout regression was introduced.

## Known limitations and remaining work

1. Google reads robots.txt at the hostname root. `https://yutakwing.github.io/robots.txt` returned 404; the valid `/TakWing/robots.txt` is not Google's crawl-control location. A 404 does not impose crawl restrictions. Submit the sitemap directly in the verified URL-prefix property; no host-root/DNS change was made.
2. Chinese routes include translation-pending/English fallback content. Structurally valid hreflang is not proof of complete translation. Existing relationships were preserved; approved translation work remains separate.
3. The sitemap need not list every public URL. The existing Contact page is discoverable through site navigation but is not presently listed; this is not an indexing block. No valid URLs were rewritten and no sitemap entries changed merely for style or completeness.
4. These checks do not establish Google-selected canonicals, rich-result eligibility, actual indexing or ranking. Sitemap submission is a discovery hint, not an indexing guarantee.
5. No private Search Console dashboard submission, processing status or index counts were inspected. The owner has already completed verification; remaining action is to submit `sitemap.xml` if absent and inspect the five priority URLs in GOOGLE-SEARCH-CONSOLE.md.

## Files

Created `docs/GOOGLE-SEARCH-CONSOLE.md` and this report. Updated `docs/CODEX-HANDOFF.md`. Verification file, robots.txt, sitemap.xml, generated pages, article bodies and application code are unchanged.
