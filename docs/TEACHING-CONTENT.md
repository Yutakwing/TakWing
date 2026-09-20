# Teaching page content — 20 September 2026

Expanded the English Teaching page from a short overview into a roughly 1,365-word account of teaching practice. The purpose is to explain decisions and student tasks, rather than match the Research page word for word. Existing movement visual, learning pathway, subject areas and teaching activities are retained.

## Source and claim boundaries

- Philosophy, subjects, feedback methods, curriculum responsibilities: `portfolio-content.mjs` (`teachingContent`, `homepageContent`) and existing Teaching content.
- Movement Science assessment: `article-sources/Movement_Science_AI_Assessment_Redesign.md` and its published article. Preparation, presentation and live Q&A are described as implemented; unseen transfer remains a proposed next iteration.
- Simulation: `experience-content.mjs`, project `simulation-role-rotation`, and the linked role-rotation article. Analysis/manuscript development remains ongoing; no clinical competence or readiness effects are asserted.
- AI learning sequence: `article-sources/enough-about-catching-ai.md` and its published article. It is presented as learning-design guidance, not a measured outcome.
- Feedback/expert blind spots: `article-sources/can-you-hear-the-song.md` and its published article.
- VR acupuncture: existing portfolio/project description, explicitly in development with training, practice and assessment modes; no new clinical rules or efficacy claims.
- Faculty-level 2026 Teaching Excellence Award: existing homepage/portfolio and linked teaching reflection; no new award or credential added.

## Implementation

`teaching-practice.mjs` owns the extended English content. `generate-site.mjs` inserts context beside existing approach/curriculum lists, renders three teaching examples and a reflection section, and includes expanded English content in the Teaching search entry. Page-only `assets/css/teaching-practice.css` supplies compact section links, anchor clearance and a prose width limit. No global stylesheet, activity or publication body changes.

Traditional and Simplified Chinese pages retain existing text and link to the expanded English examples with `lang="en"` and TRANSLATION REQUIRED. Approved translations remain outstanding.

## Validation

Twelve page/viewport combinations across English, Traditional Chinese and Simplified Chinese at 390, 768, 1024 and 1440px; light/dark and reduced-motion checks, no horizontal overflow or JavaScript errors, linked example files and Research anchors resolved. English screenshots inspected. Writing integrity tests preserve 141 bodies/URLs/SEO records and three feeds. Generator syntax, diff checks and repeat-generation checks are required before release.
