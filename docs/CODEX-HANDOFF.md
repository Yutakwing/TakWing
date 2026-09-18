# Codex Website Handoff

## Last completed phase

Phase 3 — Media Page and Short YouTube Showcase

Completed on 17 September 2026; publication requested in the follow-up. Stop here; do not begin Skills Lab or navigation changes.

## Completed

- Follow-up on 18 September 2026: replaced the video with `kfZ93HG7FNs` at Tak Wing's request, verified its public oEmbed title, and synchronised the original local checkout.

- Read the existing handoff, inspected the generated Media architecture and checked Git status before editing. Worktree was clean at Phase 2 commit `0e5e04a`.
- Added the supplied video `kfZ93HG7FNs` as **Technology in Learning and Teaching**, labelled **Short teaching showcase**, using the user's description.
- YouTube oEmbed confirms source title **Learning and Teaching Workshop Sept 2026** and author **Tak Wing Yu**. The original title is included for context; no duration, lecture-length claim, caption availability or transcript was invented.
- Reordered Media: featured video → teaching/presentation media → existing professional Instagram moments → future formats.
- Removed outdated first-release/collection-unavailable wording from rendered Media pages and their search entries.
- Added a responsive 16:9 feature card capped at 720px, using existing theme/card tokens. No autoplay; lazy iframe loading; meaningful iframe title; fullscreen/picture-in-picture support; direct YouTube fallback link.
- Used `youtube-nocookie.com` with `referrerpolicy="strict-origin-when-cross-origin"`. This preserves the origin header YouTube requires for embeds without disclosing the full page path. Permissions exclude autoplay, camera, microphone and clipboard access. No third-party JavaScript library was added.
- Preserved all six Instagram items and their complete rendered section byte-for-byte in every locale.
- New English copy is marked `lang="en"` and visibly identified as translation pending on Chinese routes. Existing localised Instagram and future-format content is preserved.
- Updated only Media search entries and Media page metadata. Blog, RSS, homepage, student, game, navigation and Worker files remain unchanged.

## Files changed

- `generate-site.mjs` — Media page renderer and Media search entry only, plus showcase data import.
- `media.html`
- `zh-hant/media.html`
- `zh-hans/media.html`
- `search-index.json`, `search-index-inline.js`
- `zh-hant/search-index.json`, `zh-hant/search-index-inline.js`
- `zh-hans/search-index.json`, `zh-hans/search-index-inline.js`
- `docs/CODEX-HANDOFF.md`

## Files created

- `media-showcase.mjs` — supplied video and verified public title metadata.
- `assets/css/media-showcase.css` — Media-only styles, loaded only on Media routes.
- `tests/media-showcase.cjs` — scoped layout, keyboard, metadata and preservation checks.

## Tests performed

- Replacement follow-up: regenerated 47 posts per locale; structural audit passed; 12/12 Media browser checks passed against the original `personal-blog` checkout at port 8895. Verified all other existing local files by SHA-256 and preserved all non-Media search records.

- `node --check generate-site.mjs`; `node generate-site.mjs`: pass, 47 posts in each language preserved.
- `node .codex-review/site-audit.mjs`: pass, 209 HTML files, three search indexes, 47/47/47 article parity.
- `tests/media-showcase.cjs`: **12/12** cases pass (three locales × 1440/390 viewport widths × light/dark themes).
- Verified 16:9 frame ratio, 720px maximum width, no horizontal overflow, iframe title/loading/permissions/referrer attributes and correct video ID.
- Host-page keyboard checks: focus can leave the iframe for the direct YouTube link, then reach the featured-video anchor. Focus outlines remain visible. Test transport stubs third-party content so this does not certify every internal YouTube control.
- Confirmed six Instagram cards per locale and exact rendered Instagram-section preservation against Phase 2.
- Confirmed search includes the video title/short-showcase label; all non-Media search records are unchanged.
- Initial video real external-player smoke check (before the replacement): YouTube iframe loads with the correct source title/author; video reports `paused: true`, `currentTime: 0`. Inspected real-player screenshot and desktop-light/mobile-dark page screenshots. No playback was initiated and complete playback/caption quality was not assessed.
- `git diff --check`, final diff and Git status review: performed before the phase commit.

### Reproduction

Serve this checkout locally below `/TakWing/`, then use installed Chrome and Playwright:

```sh
MEDIA_BASE_URL=http://127.0.0.1:8893/TakWing/ \
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
node tests/media-showcase.cjs
```

The Instagram preservation check deliberately compares against Phase 2 commit `0e5e04a`. Update this reference only when an explicit future task approves changes to those items. Screenshots are written to `/tmp`, not committed.

## Known issues

- New showcase copy has no approved Chinese translation; English sections are explicitly identified. No translations were invented.
- YouTube controls, caption/transcript availability, regional access and future availability remain controlled by YouTube/the owner. The direct link offers a fallback if embedding is blocked.
- Privacy-enhanced embedding is not a promise of no third-party requests: the iframe can contact YouTube when loaded, before playback. No cookie-free/no-tracking claim is made.
- Earlier Phase 1 shared search-focus, storage resilience and broader accessibility findings remain deferred; no unrelated repairs were attempted.
- Obsolete Media preparation copy remains in historical content objects but is no longer rendered or indexed. Future Media work should use `media-showcase.mjs` and the current renderer; do not accidentally reintroduce that wording.
- Local Chrome checks are not a full screen-reader, Safari or physical-device certification.

## Requires Tak Wing review

- Optional approved Chinese wording for the new showcase sections.
- Optional captions/transcript information if available; no availability claim has been made.
- Publication authorised in the follow-up; deployment uses the existing GitHub Pages main branch.

## Next phase

Phase 4 — Awaiting Tak Wing's brief

No exact next-phase title has been supplied. Do not start Skills Lab/navigation work without the next explicit phase instructions.

## Important implementation notes

- Worktree: `/Users/takwingyu/GPT Codex/blog-ii-release`; branch: `phase-3/media-showcase`.
- Baseline: published Phase 2 commit `0e5e04a`. The original `/Users/takwingyu/GPT Codex/personal-blog` checkout has the Media source, styles, pages and Media search records synchronised; its older branch and unrelated drafts are preserved.
- Keep generator sources authoritative. The new CSS is injected only through Media's `extraHead`, so unrelated pages do not acquire a new stylesheet.
- Media canonical URLs remain `/TakWing/media.html`, `/TakWing/zh-hant/media.html` and `/TakWing/zh-hans/media.html`.
- Keep the video a short teaching showcase. Do not label it a full lecture or invent additional released media.
- Official embed guidance reviewed: https://support.google.com/youtube/answer/171780?hl=en — privacy-enhanced host, autoplay and required Referer behaviour. Do not replace the iframe referrer policy with `no-referrer`, which can cause YouTube error 153.
- The Phase 3 release contains only Media implementation, generated Media/search outputs, the test and this handoff. Publication was requested after local completion. Verify Pages build status and all three live Media routes after pushing; no D1 migration, Worker deployment or student-data action is involved.
