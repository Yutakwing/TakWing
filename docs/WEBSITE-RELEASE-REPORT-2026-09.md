# Website release report — September 2026

Consolidation date: 19 September 2026. Repository: `yutakwing/TakWing`. Production base: `https://yutakwing.github.io/TakWing/`.

**Phase 8 consolidation is complete and its implementation release is verified live. The eight-phase roadmap is not complete: Phase 7's supported action was tested, but the automatic website/backend context bridge remains unimplemented.** The current Phase 8 instruction supersedes the previous handoff's stop; no bridge, patient simulation or Mobility game was added here.

## 1. Major changes

Created WEBSITE-MAINTENANCE.md, DESIGN-SYSTEM.md and SITE-CONTENT-MAP.md from the actual implementation. Added repeatable four-width page, accessibility and tracked-layout QA. Fixed search keyboard focus containment and blocked-localStorage resilience. Batched reading-progress updates with requestAnimationFrame and guarded reveal initialisation when IntersectionObserver is unavailable. Preserved static HTML/CSS/vanilla JS, Pages paths, authentication, D1 and deterministic scoring.

## 2. Blogs

The current generator produces 47 articles in each of three language routes (215 HTML files total). Phase 2's Song/Curse of Knowledge and Enough About Catching AI use the existing finished source texts. Blog II's Thinking with AI and Movement Science articles remain present. Existing URLs, source text, references, category and related-content links are unchanged. The latter two images now use WebP while retaining original PNGs and intrinsic dimensions.

## 3. Media

The current supplied video is `kfZ93HG7FNs`, Technology in Learning and Teaching, labelled Short teaching showcase. The privacy-enhanced, lazy, non-autoplay embed retains its 16:9 container and a direct watch link. Existing Instagram links remain intact; unreleased future formats are not presented as completed recordings. Local layout tests do not certify YouTube availability, captions or playback from every network.

## 4. Skills Lab

The public landing page exposes 15 existing registered activities across Goniometry, Cardiorespiratory, Clinical Reasoning and AI / Digital Skills. Student Login is discoverable in navigation and the lab. Public mode and tracked mode remain distinct; tracked completion links wait for a successful save. Responsive navigation uses the existing mobile menu at widths up to 1200px. No authentication or clinical scoring rules changed.

## 5. Gait and parallax

Teaching retains the decorative SVG walking feature, descriptive copy and pause button. One backdrop uses bounded .18 parallax (±18px); it pauses offscreen, in hidden tabs and for reduced motion. The static no-JS pose remains useful. It is not a clinical gait assessment and claims no biomechanical precision.

## 6. Mobility architecture

`mobility.html` remains a foundation/development overview. Six proposed activities are explicitly In development and not playable. All unvalidated clinical values and rubrics remain null with LECTURER VERIFICATION REQUIRED. Optional local-only case tokens are not added to result/tutor payloads. No crutch game or patient case is implemented.

## 7. AI context bridge

Zapier is retained. Eleven enabled clinical games expose the tutor after authenticated tracked entry; it is deliberately absent from public Elbow. The supported Generate Reply to Message action returned a real context-specific answer to the exact synthetic Elbow scenario on 19 September. This is action-level evidence only. Trigger/secure return path/account entitlement remain unresolved; the draft is OFF, and students still copy/paste the local summary. No new AI message was sent during Phase 8. The real inline component loaded in local tracked Elbow. The preceding Phase 7 removal of Shadow DOM/undocumented-event access remains intact. AI output cannot change the technical score.

## 8. Accessibility and QA

Passed checks:

- Structural audit: 215 HTML files, three search indexes, 47/47/47 article parity, no broken internal file/cross-page-fragment links or missing alt attributes. Additional same-page scan checked 46 fragment references; no missing targets. No local CSS URL references were found.
- Whole-site browser run: **192 page/viewport cases** across 390, 768, 1024 and 1440px, including all three main language routes, 15 public activities, login, Goniometry and Cardiorespiratory hubs. No horizontal overflow, missing loaded images or console errors/uncaught page exceptions. Theme persistence, search URLs, language routes and unauthenticated gates passed.
- Public accessibility sampling: **80 page/theme/viewport cases**, primary/secondary/muted/accent text tokens on page/surface backgrounds all at least 4.5:1; reduced-motion visibility, alt presence, search Tab/Shift+Tab containment, visible focus and Escape restoration passed. Blocked storage and absent observer no longer disable public controls. This is token/component sampling, not comprehensive WCAG certification or a claim about every diagram, border and third-party control.
- Skills Lab: 24 locale/viewport/theme combinations plus entry/link/menu checks. Mobility: 12 locale/viewport cases, both-theme bounds, keyboard overview/back links and six inert cards.
- Movement: 12 locale/viewport cases, motion/pause, live reduced-motion changes, no-JS fallback, bounded parallax and idle/offscreen suspension.
- Blogs: 12 Phase 2 article/viewport cases covering sources/references, images, metadata, search, RSS, related links and pending translations. Media: 12 layout/theme cases with ratio, keyboard, privacy attributes and exact Instagram preservation.
- Backend: all **13 Worker/SQLite tests** passed, including account isolation, expiry/logout, bounded payloads, UUID deduplication, migration and optional forwarding failure. No production D1 writes.
- All **15 games completed and restarted in public desktop and authenticated mobile** (30 runs) against disposable local D1. Failed-save retry, frozen payload, double submission, expired-session re-login and dashboard/history checks passed. Twelve public/tracked language-switch cases passed.
- Authenticated layout checks: **60 game/viewport cases** plus login/dashboard at all four widths beneath `/TakWing/`, with expected tutor visibility and no overflow or uncaught errors.
- Tutor: closed-component stub checks at 390/1440px plus the real inline component mount on local tracked Elbow; no new chat message sent. Neither is a new clinical-response validation.

An initial high-concurrency local run reported intermittent image failures. Increasing the local HTTP server connection backlog to 128 resolved them; the final 192-case run passed. A historical shared-shell preservation assertion needed a narrow update for the two approved image-extension changes; it still compares article content. A contrast probe initially inherited colour transitions; disabling transitions on the probe produced stable ratios. These test-harness adjustments are not silently counted as production fixes.

Chrome viewport emulation is not physical-device, Safari, screen-reader or exhaustive keyboard operation certification. Game dragging/spatial tasks and vendor iframe internals still warrant human accessibility review.

## 9. Performance

| Delivered image | Original PNG bytes | WebP bytes | Reduction |
| --- | ---: | ---: | ---: |
| Thinking with AI conference | 1,852,966 | 108,444 | 94.1% |
| Movement Science presentation | 2,112,632 | 91,508 | 95.7% |

Combined image delivery saves 3,765,646 bytes (about 95%). Conversion used quality 85 and preserved image dimensions, framing and content. Originals were retained for provenance. Many other large PNGs are already unused source versions with WebP delivery; removing them would save repository storage rather than page transfer and was not necessary. One duplicate original pair (`assets/contact-page-card.png` / `assets/about-page-card.png`) was recorded, not deleted blindly.

Images reserve dimensions; the Media frame and movement stage reserve aspect ratios. Above-the-fold article images use eager/high priority and other cards use lazy loading. Movement JavaScript is Teaching-only, Media CSS is Media-only, article tools are article-only, and game scripts are activity-specific. Navigation CSS is intentionally shared. No global script was removed without proving its dependencies.

Uncompressed shared assets remain material: academic.css about 73 kB, styles.css 14 kB, script.js 12 kB, English inline search index 274 kB. JSON/inline search forms are a deliberate fallback pair; the normal inline path avoids fetching both. CSS cascade consolidation and on-demand search loading are future optimisation candidates, not introduced in this final phase.

Local, unthrottled Chrome samples on ten public pages at four widths (external requests blocked, 150ms post-load observation) recorded LCP 24–136ms and CLS at most 0.000652. These are short local smoke observations, **not production Core Web Vitals, a stable benchmark or a speed guarantee**; external fonts, embeds, caches and network conditions differ. The byte reduction is the directly measured optimisation. Reading-progress scroll work is now frame-batched; movement was already passive, bounded and suspended when idle/offscreen.

## 10. SEO

Eighteen targeted new/updated page metadata and social-image cases passed across all three language routes.

Generated titles/descriptions, stable canonicals, hreflang, Open Graph/social images, article links, search and RSS remain intact. The sitemap contains 196 URLs. Student login/dashboard intentionally use noindex/nofollow; they should not gain public article-style SEO exposure. The four recent blog additions remain in all three feeds/search indexes. Language alternates may still point to explicitly pending translation pages; this is a content limitation, not proof of translated articles.

## 11. Translations still needed

Approved Traditional/Simplified Chinese wording for the new Skills Lab catalogue, Media showcase, Movement feature and Mobility overview. The four recent English articles have pending translation content on Chinese routes. Student dashboard/results/tutor and some clinical hub/activity text also retain English. Do not fabricate translations or remove the notices merely for visual tidiness.

## 12. Lecturer verification still needed

All Mobility clinical parameters, applicability, sources, tolerances, completion criteria and rubrics. Existing game landmark/protocol verification in AI-TUTOR-GAME-MAP.md and formative scoring policies in GAME-SCORING.md remain applicable, including the clinical-reasoning rubrics and existing score floors. The returned AI hint still requires lecturer assessment; action success is not clinical validation. No study result, protocol or competency claim was invented.

## 13. Known limitations and release status

Phase 7 is incomplete at the full website-bridge level, so **the all-eight-phases completion statement is intentionally not asserted**. Existing manual handoff is an honest, working fallback. Public mode does not include the clinical tutor; authenticated tracked mode is required. No new credentials, plan upgrade, Worker deployment, production database write or Zap publication occurred.

Implementation commit `922d03b9e4565970dcade960726482f9c450a8cc` was pushed to `main`. GitHub Pages reported **built** at that revision, and both Pages and regeneration workflows completed successfully. All 16 checked deployed file bodies matched the tested checkout byte-for-byte (shared script, tutor wrapper, two WebPs and 12 generated pages). All **196 sitemap URLs returned HTTP 200**. Live Chrome checks at 390/1440px passed the homepage search focus loop and both optimised article image/overflow checks. No production login or result write was used. This report/handoff evidence is recorded in a subsequent documentation-only commit. Unrelated original-checkout drafts remain excluded.

Local sync note: shared script, documentation, tests and optimised assets were synchronised to the original checkout; only matching image references were replaced there. Six Blog II article pages are absent from that divergent checkout and remain in the release checkout/preview. Its unrelated article source set was not overwritten or regenerated.
