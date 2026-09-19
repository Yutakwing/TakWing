# Phase 10 — Writing Architecture & Reader Journey

19 September 2026. The phase improves discovery and reading within the existing static generator. It does not revise article arguments, create new articles or modify student/game/backend systems. Baseline: `a4b8f056c3a5a45983009c7f4fad8caed7daf28f`.

## 1. Files changed

`generate-site.mjs`; three `writing.html` files; 141 generated article pages (47 per language); six search JSON/inline files; `docs/WEBSITE-MAINTENANCE.md`, `docs/DESIGN-SYSTEM.md`, `docs/SITE-CONTENT-MAP.md`, `docs/CODEX-HANDOFF.md`. Existing article source modules, homepage, feeds, sitemap, shared browser scripts and game/backend files are unchanged.

## 2. Files created

`writing-architecture.mjs`, `assets/writing-architecture.css`, `tests/writing-architecture.mjs`, `tests/writing-reader-journey.cjs`, `docs/WRITING-ARCHITECTURE.md`, and this report.

## 3. Collection architecture

Four anchored sections on Writing use the existing generator, avoiding thin duplicate collection pages. Each has an introduction, Start here and an expandable chronological member list. The order is introduction, lead, collections, recent, Practice Notes, subject archive, complete chronological list and follow links. Expanded lists use no duplicate images. Existing underlying categories remain.

## 4. Article assignments

All 47 bodies were inspected. AI, Learning & Assessment has 22 members; Clinical Reasoning & Practice Readiness has 13; VR, Simulation & Educational Technology has 9; Life as an Educator has 19. Membership overlaps where content supports it, while articles retain one URL. The complete ID/title/membership/type/rationale inventory is in `WRITING-ARCHITECTURE.md` and its source metadata module.

## 5. Start here

AI: Enough About Catching AI (332). Clinical reasoning: Beyond the Right Answer (319). VR/simulation: A VR Demonstration Is Not Yet a Learning Experience (323). Educator life: When Teaching Becomes Boring (330). These introduce a learning sequence, explanation, purposeful immersion and reflective teaching respectively; none is labelled best.

## 6. Content types

29 ESSAY, 8 PRACTICE NOTE, 2 TEACHING DESIGN, 2 PROJECT UPDATE and 6 GUIDE. Labels identify form, not evidence quality or clinical endorsement. The unused teaching design and preliminary project status remain clear in original prose and curation rationale. Type labels appear near Writing/article metadata, not across unrelated pages.

## 7. Contents lists

Four meaningful H2 sections qualify; bibliography/source/related-reading headings are excluded. Practice Notes under four minutes omit the TOC. There are 29 English and 20 per Chinese locale (69 total). Native closed disclosures work without scripts and fit mobile. Author IDs are preserved, generated IDs are collision-safe and repeatable, and an 8rem anchor margin clears the header. Body wording remains identical after normalising new H2 IDs.

## 8. From writing to practice

Ten manual connections: 300→reasoning chatbot research; 306/312→AI Literacy Check; 313/314→simulation role-rotation research; 322→VR research; 323→physiology VR; 331→Goniometry; 332→Skills Lab; 334→Teaching. Localised route helpers and real destination fragments are used. No automatic tutor or new game capability is claimed.

## 9. Idea progression

Three selected older-to-later article links: 175→323, 309→334 and 319→331. Date ordering is validated. Existing related cards and previous/next navigation remain.

## 10. Evidence/source metadata

Optional real-date `sourceReviewDate` and `editorialUpdated` are implemented and tested. No live article was assigned a new date: this was an organisation pass, not a substantive source review. Existing datePublished/dateModified are preserved. A future verified editorialUpdated value also supplies schema dateModified.

## 11. Official sources

Movement Science gains a supplementary University of Sydney link already cited in repository article 329. Academic references are untouched. No SFU/HKU policy URL was invented. Those institution-specific source links still require verification; the block explicitly does not claim a fresh policy review.

## 12. RSS

Follow new writing exposes the locale feed and existing LinkedIn profile. All three 47-item feeds are byte-identical to the baseline. No email collection or newsletter service.

## 13. Search

Four collection anchor records per index; article content fields now include collection names and types alongside titles, summaries and bodies. Existing ranking/loading logic is unchanged. Search queries for the clinical collection, TEACHING DESIGN and Song work in browser tests. JSON and inline indexes remain generated together.

## 14. SEO

Existing BlogPosting properties, canonical/Open Graph values, article URLs, hreflang and 196-URL sitemap are preserved. Valid genre and keywords properties describe article type and collections. No duplicate route or invented schema field. Regression tests compare every original BlogPosting property and key social tags for all 141 pages.

## 15. Accessibility

Native disclosures, ordered TOC lists, meaningful link labels, explicit language attributes, underlines and visible focus. Keyboard Enter/Space/Tab navigation and search focus return pass. TOC works with JavaScript disabled. Existing accessibility suite passes 80 page/theme/viewport cases with text/accent token contrast ≥4.5:1, reduced motion and storage/observer fallback checks. This is browser/token testing, not formal WCAG or screen-reader certification.

## 16. Mobile, reading and performance

56 English page/theme/width cases cover Writing, a short Practice Note, a long reflection, long AI essay, Movement Science, Song and Enough at 390/768/1024/1440px. Another 56 locale layouts and 16 collection entry checks pass. No horizontal overflow, missing images or captured browser errors in the scoped suite. The existing Phase 2 article suite passes 12 additional cases. Screenshots of collections and article contents were inspected at desktop/mobile sizes.

The 780px article maximum is retained; tables can scroll within the body and long text/URLs wrap. New CSS is 3,716 bytes and loads only on Writing/articles. No new browser JS, image, animation, scroll handler or external dependency. Search index growth reflects curated text and four entries. No new field Core Web Vitals or performance benchmark claim is made.

## 17. Translations

TRANSLATION REQUIRED for new collection labels/introductions, type labels, TOC controls, relationship guidance and complete-archive/follow copy. New English blocks are marked as such; approved article translations and pending placeholders remain untouched. English curation does not imply translated academic content.

## 18. Deferred items

Lazy search loading, analytics, comments, newsletters, additional policy-source verification and new academic translations. No Phase 11. Existing Phase 7 automatic AI-context bridge remains incomplete and outside this phase; manual Zapier transfer remains. Clinical verification and Mobility development remain separate.

## 19. Diff and release checks

Only Writing generation, generated Writing/article/search output, focused styles/tests and documentation are in scope. The clean starting tree matched origin/main. Structural audit passes 215 HTML files and three search indexes; all 141 article bodies/URLs/schema and three feeds are preserved; helper edge cases pass. A second generation is byte-identical across tracked files. Generator/module syntax and `git diff --check` pass.

GitHub Pages is configured for main/root at `/TakWing/`. Publication verification follows the implementation commit; do not treat this pre-push report alone as proof of live propagation. The local preview is `http://127.0.0.1:8896/TakWing/writing.html` in the release checkout. The original `personal-blog` checkout remains divergent and has not been overwritten or regenerated.
