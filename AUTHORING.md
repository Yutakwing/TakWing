# Portfolio publishing guide

The website is generated static HTML. Run `node generate-site.mjs` from the repository root, then `node .codex-review/site-audit.mjs`. GitHub Pages serves the generated files directly from `/TakWing/`; no new framework or service is required.

## Add an article

1. Add a unique ID and metadata to `draftPosts` in `generate-site.mjs`: author, title, slug, ISO date with time zone, modified date, excerpt and existing category. Include the ID in `portfolioPostIds`.
2. Add the article body for each language in `article-content.mjs`, following the existing imported-module pattern for longer articles. Keep `{{assetRoot}}` for inline image paths. Generation deliberately fails when a language body is absent; supply approved translations before release.
3. Add translated titles and summaries to `translatedTitles` and `translatedSummaries` (search for the preceding post ID in the generator). Add the image filename, descriptive alt text and any caption in the existing `postImages`, `postImageAlts` and `postImageCaptions` maps. Use a web-optimised image in `assets/post-images/` and respect the existing unique-feature-image check.
4. Check `postGroupKey` to assign the appropriate existing topic group. Do not edit generated HTML directly.
5. Regenerate and inspect the new post in English, Traditional Chinese and Simplified Chinese. Check links, images, mobile layout and metadata before publishing.

The date-sorted `posts` list drives Writing, the homepage's newest three posts, chronological navigation and RSS. The current newest articles are Teaching Becomes Boring, AI Assessment, and Conference to Monday. No separate homepage list needs editing. Related articles use the existing topic group and exclude the current article. Start-here routes and speaking topics are maintained in `scholarship-content.mjs`.

Reading time is estimated at 220 English words per minute using article content only. Chinese uses approximately 500 non-whitespace characters per minute. Generation provides a no-JavaScript estimate; `assets/js/article-tools.js` updates it from rendered article text.

## Add narration

Create `assets/audio/` when the first recording is available. Add a genuine MP3 and configure the post ID and language in `postAudio` in `scholarship-content.mjs`, for example:

```js
export const postAudio = {
  330: { en: "assets/audio/when-teaching-becomes-boring-en.mp3" },
};
```

Regenerate. An unconfigured post has no audio section. A configured missing file stops generation. The native audio player uses `preload="none"` and never autoplays. Each translation needs its own narration configuration; an English recording is not silently used for Chinese articles.

## Feeds and profiles

Feeds are generated at `feed.xml`, `zh-hant/feed.xml` and `zh-hans/feed.xml`, each containing the same 43 current posts in its own language. The feed count grows automatically. Feed discovery is included in page metadata. LinkedIn and Google Scholar use the existing verified URLs in `portfolio-content.mjs`. GitHub is omitted from Follow my work because `profile.sameAs.github` is empty; add an approved profile URL there to enable it.

## Editorial items awaiting input

- Approved Chinese translations for the new Start here explanatory copy, speaking topics, sharing/discovery headings and Follow my work text. Existing Chinese article text is preserved. English additions have `lang="en"` and translation comments.
- Optional MP3 narrations and an approved GitHub profile URL.
- Verified screenshots of specific research projects and resources. Existing teaching photographs are captioned as teaching context; generic illustrations are retained where no project-specific replacement can be verified.

## September update scope

Source changes: `generate-site.mjs` and `experience-content.mjs`; new shared files: `scholarship-content.mjs`, `assets/js/article-tools.js`, `assets/css/scholarship.css`, and this guide. Generated changes include home/about/research/resources/collaborate pages, shared metadata on other generated pages, all 129 articles, three feeds, search indexes and sitemap where affected. The earlier Cardio changes remain pending in the same worktree and are not part of this editorial redesign. Publication requires committing the reviewed output and deploying the existing GitHub Pages repository; local generation does not publish it.
