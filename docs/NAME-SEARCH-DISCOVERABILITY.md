# Name-search discoverability

20 September 2026. Scoped search improvement, not another roadmap phase.

The canonical public name remains Tak Wing Yu. User-confirmed variants are Tommy, Tak Wing, Yu Tak Wing and YU Tak Wing. Home/About display the relationship naturally; public Person and article author metadata share https://yutakwing.github.io/TakWing/#person. Existing ORCID, Scholar and LinkedIn links are retained. Edit portfolio-content.mjs and regenerate with node generate-site.mjs; do not hand-edit generated articles. No keyword stuffing, hidden keyword lists or new professional claims.

English Home/About titles, descriptions and social previews include Tommy. English site search also recognises the variants. Chinese visible copy is preserved; structured identity stays consistent across languages. Approved translations can be added separately. Existing canonical URLs, hreflang, sitemap, feeds and verification file remain unchanged.

## Verification

Writing regression checks preserve 141 article bodies and three feeds while checking the enriched shared author. Analytics boundary suite passes. Generator output is reproducible. Home/About have no horizontal overflow at 390/1440px, and browser console checks found no errors.

## Search engine limitations and next steps

Publication supplies clearer identity signals; it does not guarantee indexing, placement or a knowledge panel. Tommy alone is broad; full-name searches with physiotherapy or Hong Kong provide more context. Review actual name-query impressions in Search Console once data exists. After deployment, request indexing of Home/About if needed, and allow crawling; avoid repeated sitemap resubmissions.

When updating your own university, ORCID, Scholar or LinkedIn profiles, use a consistent public name and link to this website where the service permits. No external profiles were edited. Do not add invented profile URLs or create doorway pages for spelling variants. Google's site-name feature does not support subdirectory-level sites such as /TakWing/; this change improves page-level titles and person identity without claiming site-name feature eligibility.

Official guidance:
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/appearance/site-names
