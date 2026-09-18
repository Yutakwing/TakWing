# Codex Website Handoff

## Last completed phase

Phase 5 — Movement / Gait Visual and Subtle Parallax

Completed on 18 September 2026. Visual phase only. Stop here; do not build Mobility games or a clinical gait assessment.

## Completed

- Read Phase 4 handoff and inspected the clean release baseline `a007f4c`, Teaching layout, shared page generator and existing scroll reveal.
- Placed **Movement, Gait & Clinical Observation** within the Teaching introduction, beside a compact walking illustration. Moved the existing Skills Lab entry link into this feature. The substantial homepage remains unchanged.
- Used the supplied supporting copy and themes: Gait Analysis, Assistive Mobility and Movement Science. These are editorial themes, not links or claims of available games.
- Added an inline SVG side-view walking silhouette with a smooth 1.8-second CSS loop, muted site colours and a restrained green ground line. No GIF, video, animation library, external visual asset or clinical phase labels.
- Marked the SVG decorative (`aria-hidden`, non-focusable) and included a visible purpose/limitation caption. This is an illustration, not a biomechanically precise model or clinical assessment.
- Added a keyboard-operable Pause motion / Resume motion control. Motion pauses offscreen and when the document is hidden. With no JavaScript or IntersectionObserver the illustration remains static.
- Reduced-motion CSS immediately disables all SVG animation and the parallax transform. The controller also handles preference changes, initial reduced motion, and rechecks preferences on scroll/resize.
- Added parallax at exactly one location: the decorative background grid behind the walker. Factor 0.18, clamped to ±18px. Passive scroll/resize listeners coalesce updates into one requestAnimationFrame; no continuous frame loop. Offscreen, paused, hidden and reduced-motion states stop work.
- Existing shared scroll reveal uses IntersectionObserver, one-time reveal classes and a reduced-motion guard. Left it unchanged; parallax is on a separate decorative layer, avoiding competing transforms or moving text.
- New content stays English with `lang="en"`; Chinese Teaching routes visibly state **TRANSLATION REQUIRED**. No translations invented.
- Synced the precise Teaching/generator hunks and new assets into the original local checkout without replacing its unrelated drafts.

## Files changed

- `generate-site.mjs` — import/render the feature inside Teaching, load its CSS and deferred script only on Teaching routes.
- `teaching.html`
- `zh-hant/teaching.html`
- `zh-hans/teaching.html`
- `docs/CODEX-HANDOFF.md`

## Files created

- `movement-feature.mjs` — feature text and decorative SVG renderer.
- `assets/css/movement-feature.css` — responsive feature layout, walking loop, static pose, reduced-motion and print fallbacks.
- `assets/js/movement-feature.js` — pause control, visibility handling and bounded event-driven parallax.
- `tests/movement-feature.cjs` — browser checks for motion, layout, accessibility and idle scheduling.

## Tests performed

- Generator/controller syntax checks and generation passed; 47 posts per locale retained.
- Structural audit passed: 212 HTML files, three search indexes and 47/47/47 post parity.
- Browser tests: 390, 768, 1024 and 1440px across English, Traditional Chinese and Simplified Chinese (12 cases).
- Verified an animated transform changes over time; keyboard pause freezes it; resume restarts it.
- Verified live reduced-motion changes disable animation/parallax, plus reduced motion on initial load and the no-JavaScript static fallback.
- Verified parallax changes by 7.2px for a 40px scroll (factor 0.18), stays within ±18px, schedules no continuous idle frames and stops offscreen.
- Checked no horizontal overflow, hidden decorative SVG, translation notices and absence of browser script errors.
- Inspected desktop/mobile screenshots in light and dark themes. Repeated tests against the original local checkout.
- Source payload approximately 8.4KB across renderer/CSS/JS, with the renderer inlined at build time. No new network dependencies. This is a scheduling/payload check, not a hardware benchmark.
- Reviewed diff and status; `git diff --check` passed. Homepage, search/RSS, navigation, Media, student/auth/scoring/clinical logic and shared reveal files unchanged.

Reproduce with `MOVEMENT_BASE_URL=http://127.0.0.1:8896/TakWing/ PLAYWRIGHT_MODULE=/path/to/playwright node tests/movement-feature.cjs`. The test renders a frame after browser media emulation and disables smooth scrolling for deterministic parallax measurement; product scroll behaviour is unchanged.

## Known issues

- **TRANSLATION REQUIRED** — new feature title, copy, themes, caption and controls need approved Chinese wording.
- The stylised walking loop intentionally does not model precise joint kinematics, individual gait phases, gait pathology or assistive-device technique.
- Chrome desktop emulation does not replace physical-device, Safari or full screen-reader testing. Earlier audit findings remain outside scope.

## Requires Tak Wing review

- Optional visual review of the Teaching-page placement and walking illustration.
- Approved Traditional/Simplified Chinese wording.

## Next phase

Phase 6 — Awaiting Tak Wing's brief

No exact Phase 6 title has been supplied. Do not begin another phase or build Mobility games.

## Important implementation notes

- Release checkout: `/Users/takwingyu/GPT Codex/blog-ii-release`, existing branch `phase-3/media-showcase`; baseline `a007f4c`.
- Original checkout: `/Users/takwingyu/GPT Codex/personal-blog`, older branch with unrelated drafts. Apply only scoped patches there; do not publish its entire working tree.
- Generator source remains authoritative. `renderMovementFeature` is used only by Teaching; scripts/styles resolve through existing relative `/TakWing/`-compatible prefixes.
- Movement CSS transforms target nested SVG groups; parallax transforms only `.movement-depth`. Do not put parallax on a reveal-transformed ancestor.
- Default CSS animation state is paused. The controller runs it only while the stage is visible, the document is visible, and both user pause and reduced motion are off.
- Native media-query events drive preference changes; scroll/resize also rechecks reduced motion. CSS is the immediate safety net regardless of JavaScript timing.
- Earlier phases remain intact: public Skills Lab and Student Login navigation, all 15 activity links, Mobility category marked In development, replacement Media video `kfZ93HG7FNs` and Instagram items.
- No new assessment, clinical logic, scoring, authentication, D1/Worker change or student-data write.
