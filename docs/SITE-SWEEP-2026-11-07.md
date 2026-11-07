# Public site sweep — 7 November 2026

Scope: the TakWing GitHub repository and its GitHub Pages site, including English, Traditional Chinese, Simplified Chinese, and public student activity entry points.

## Repairs

- Replaced a DOI link that returned HTTP 404 with the journal's direct article record. The published DOI remains in the citation; it is no longer used as the button destination for that paper.
- Localised the university staff profile label on the Chinese pages and added Chinese recovery links to the shared 404 page.
- Updated outdated authoring notes and browser test expectations. The generation workflow now runs the structural audit before publishing and rebuilds when publication data changes.

## Verification

- All 243 deployed HTML routes returned HTTP 200 when requested directly. This count includes the 404 template, three legacy CV redirects, and the search-engine verification endpoint.
- The generated-site audit passed on 242 HTML documents and three search indexes. All 53 posts are present in each language. The separate link scan checked 16,978 internal references after the repairs and found no missing targets or fragment IDs.
- 478 local Chrome renders passed at 390px and 1280px with no horizontal page overflow, missing local responses, or uncaught page errors. Legacy redirects and the verification endpoint were excluded from rendering checks.
- Writing and Skills Lab browser tests passed, including keyboard navigation, search, locale switching, reading tools, themes, and public activity links. Contact form tests passed in all three languages at desktop and mobile widths using mocked delivery. All 13 local Worker tests passed.
- Tested 231 distinct external link destinations before the fix. 48 returned a 2xx response, one returned a confirmed 404, and 182 returned access restrictions. Access restrictions were not treated as dead links; some affected destinations were separately confirmed through their publishers.

Production student sign-in, real message delivery, camera permissions, and recorded student attempts were not exercised. This was a technical and interface-language sweep, not a line-by-line editorial or clinical review of all articles.
