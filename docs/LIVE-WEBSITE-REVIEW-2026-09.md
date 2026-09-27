# Live website review — September 2026

Review begun 21 September; accessibility verification and release preparation resumed 27 September 2026.

## Findings and priorities

1. **Contact delivery still needs end-to-end confirmation.** The contact page provides a visible email fallback, but FormSubmit receipt in the destination inbox is not conclusively verified. A controlled test enquiry and inbox confirmation are the highest priority. No enquiry was sent during this review.
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

Release verification will be reported after GitHub Pages deployment.
