# Google Search Console

Reviewed 20 September 2026. The owner reports that verification is already complete. Do not repeat verification or configure a domain/DNS property.

## Property and verification

- URL-prefix property: `https://yutakwing.github.io/TakWing/`
- Method: Google's supplied HTML verification file.
- File: `google8c2878bc25812304.html`
- Published URL: https://yutakwing.github.io/TakWing/google8c2878bc25812304.html
- Sitemap: https://yutakwing.github.io/TakWing/sitemap.xml

The verification file is published at the repository root. Live and local HTTP responses match the supplied bytes exactly. Keep it published after verification. The generator preserves unknown root files; a regeneration check confirmed that this file remains unchanged. Do not wrap it in a page template or insert analytics.

## Remaining owner action

In Google Search Console, select the existing URL-prefix property above. Go to **Indexing → Sitemaps**, submit **`sitemap.xml`** (the complete resulting URL must be the sitemap URL above), then check its processing status. If that exact sitemap has already been submitted, inspect the existing entry rather than submitting duplicates. Dashboard submission/status was not inspected in this review, so it is not claimed complete.

Verification is already complete according to the owner. For future recovery only: add that exact URL-prefix property, choose HTML file verification, confirm the file loads, and click Verify. Do not attempt ownership of `github.io` or change DNS.

## Initial URL Inspection

Inspect these public URLs and, if appropriate after a successful live test, request indexing:

- https://yutakwing.github.io/TakWing/
- https://yutakwing.github.io/TakWing/research.html
- https://yutakwing.github.io/TakWing/teaching.html
- https://yutakwing.github.io/TakWing/writing.html
- https://yutakwing.github.io/TakWing/skills-lab.html

Avoid repeatedly requesting the same URL. A successful submission or technically indexable page does not guarantee crawling, indexing, ranking or a particular completion date. Use Search Console's Page indexing and URL Inspection reports to distinguish discovered, crawled and indexed URLs. Do not interpret site search or Cloudflare views as Google indexing evidence.

## robots.txt and the GitHub Pages subdirectory

The project file https://yutakwing.github.io/TakWing/robots.txt returns HTTP 200 and contains the correct sitemap reference:

```
User-agent: *
Allow: /
Sitemap: https://yutakwing.github.io/TakWing/sitemap.xml
```

However, Google fetches robots.txt only at the host root, `https://yutakwing.github.io/robots.txt`, not from a project subdirectory. The host-root URL returned HTTP 404 during this review. Google treats a 404 robots response as no crawl restrictions; this does not block the public site. Direct sitemap submission in the verified property is therefore important. No DNS or separate user-site repository changes are necessary for this task, and the valid project file was left unchanged.

## Ongoing maintenance

Regenerate after source changes, verify sitemap entries use HTTPS and `/TakWing/`, and retain public canonical/hreflang relationships. Keep student-only and tracked URLs out of the sitemap. Public activity URLs already in the sitemap remain public; their presence is not an authenticated-learning data exposure.

Existing Chinese routes include approved content as well as clearly labelled English fallback/translation-pending material. A valid hreflang graph does not prove linguistic equivalence. Complete approved translations through a separate content task; do not invent translations or indexing outcomes.

## Official references

- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: robots.txt location and HTTP response handling](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)

See `SEARCH-INDEXING-READINESS-2026-09.md` for tested scope and results.
