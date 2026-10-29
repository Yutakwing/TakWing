# Website design review — 29 October 2026

The portfolio has a strong foundation: substantial research and teaching material, clear distinctions between implemented work and prototypes, linked publications, accessible article content, and three language versions. Its main weakness was the amount of competing navigation and repeated introductory material.

## Changes

- Reduced the desktop navigation from nine links to six. The site name leads home; Media, Resources, Publications, and Contact remain directly available in the footer. The mobile menu retains the complete navigation.
- Added a persistent site name and home link to the mobile header.
- Shortened the homepage introduction, reduced primary actions to Research and Writing, and brought the portrait alongside the identity on phones.
- Replaced long homepage project dossiers with three concise summaries. Full descriptions, contributions, status, and evidence remain on Research.
- Reordered Writing around the latest article, recent articles, and thematic collections. Practice Notes and complete subject lists expand on request, with all 50 articles retained in the chronological archive.
- Standardised public-page spacing, reading widths, headings, borders, cards, and the restrained green palette. Removed entrance fades so content appears immediately.
- Applied the shared presentation to English, Traditional Chinese, and Simplified Chinese without changing article bodies or public URLs.

## Verification

- Static generation completed successfully.
- Inspected all 211 public portfolio pages for headings, duplicate IDs, canonical/language links, article-content preservation, image alt attributes, and internal link targets.
- Checked 10,734 internal link occurrences and 1,169 section-link occurrences; no missing targets.
- Checked referenced local images, scripts, and stylesheets; no missing assets.
- Compared 153 article-content blocks against the pre-change generated baseline; unchanged. The archive contains 50 dated posts per language, plus other article-style pages.
- Checked 38 browser views at 390px and 1280px across the main public templates and Chinese home/writing pages. No horizontal document overflow, missing page headings, or loaded broken images.
- Exercised mobile navigation, Escape dismissal, search results, keyboard archive expansion, and light/dark themes.
- Viewed the signed-out Student Login, Goniometry, and Cardiorespiratory entry pages on mobile; no horizontal overflow. Their application source and authentication were not changed.

## Scope limits

This was a presentation and public navigation review. It did not submit the contact form, sign into student accounts, record practice results, run camera-based activities, independently validate research claims, or exhaustively verify external destinations. Those workflows require their own functional or content review.
