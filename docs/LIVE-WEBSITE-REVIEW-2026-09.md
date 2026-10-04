# Live website review — September 2026

Review begun 21 September; accessibility verification and release preparation resumed 27 September 2026.

## Findings and priorities

1. **Contact delivery historically confirmed — status corrected 4 October.** The owner confirmed receipt of the earlier post-activation contact test in this conversation. This supersedes the previous unresolved status. No enquiry was sent during the September review or October follow-up.
2. **Keyboard bypass was missing — fixed.** The shared public shell now starts with a visible-on-focus “Skip to content” link and a focusable main destination. Styles are cache-versioned. The English label is explicitly marked `lang="en"` on Chinese pages; approved translations remain required.
3. **Chinese content remains mixed.** Existing translation-pending notices need approved copy. Do not equate the number of notices with wholly untranslated articles or fabricate translations.
4. **Search performance opportunity.** The English inline index is 284,043 uncompressed bytes and loads on normal public pages before a search is requested. A separate, tested lazy-loading change could reduce initial work; this review does not change search behaviour.
5. **Image optimisation opportunity.** The About illustration is approximately 637 KB and its banner approximately 496 KB; a Writing image is approximately 460 KB. Responsive variants may help. Large provenance PNG originals are not automatically evidence of large visitor downloads. No Core Web Vitals measurement or performance gain is claimed.

## Evidence

- The live sitemap audit on 21 September returned HTTP 200 for all 199 URLs, with no noindex response header detected. This establishes reachability, not search-engine indexing.
- Live layout checks covered Home, About, Research, Teaching, Skills Lab, Writing, Media, Resources, Collaborate and Contact at 390, 768, 1024 and 1440 pixels. No persistent horizontal overflow or completed broken images were found. Early transient Media/Contact width measurements resolved after load.
- Local structural audit: 218 HTML files and three search indexes, 47 posts per language; no structural errors.
- Writing, analytics and academic-profile regression suites pass: article bodies, URLs, feeds, canonical/hreflang metadata and protected integrations preserved.
- Two successive generations produce identical diffs.
- Browser keyboard test on 27 September: first Tab focuses the visible skip link; Enter focuses `main-content` and navigates to its fragment.

## Change scope

`generate-site.mjs`, `academic.css`, generated shared-shell HTML, and two existing test parsers updated to accept attributes on main. No authentication, student data, scoring, Worker/D1, analytics logic, article content or tutor changes.

## Limits and next actions

This is not a full accessibility certification or authenticated learner regression run. No production student writes, chatbot submissions or contact messages were made. YouTube playback and contact inbox delivery are not certified by HTTP checks. Search Console indexing/ranking and real-user performance require their respective dashboards. No new roadmap phase was started.

Release `8d80f65` was pushed to main on 27 September. GitHub Pages run 36286044472 completed successfully. Live Home, Writing, About, Traditional Chinese Home and Simplified Chinese Home returned HTTP 200 with the new skip link and focus target; the versioned stylesheet includes focus styling. Live browser Tab/Enter confirmed focus moves to main. Local mobile Writing at 390px had no overflow and passed the bypass check; IPCRF search returned Media. The working tree was clean after the release.
