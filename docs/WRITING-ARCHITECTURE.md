# Writing Architecture

Phase 10 — 19 September 2026. This document records editorial organisation, not a fresh review of every article's evidence or policy claims.

## 1. Purpose

Writing is a connected body of reflections, evidence-informed essays, practical guidance and teaching records. The reader journey is introduction → lead article → four collections → recent writing → Practice Notes → subject archive → complete chronological list → follow links. Existing bodies, images, reading times and published URLs remain intact.

## 2. Existing categories

Physio, AI and Reflection remain the underlying categories, including articleSection, subject archive and related-post logic. Collections are a separate, many-to-many editorial layer. They do not silently recategorise historical posts.

## 3. Reader-facing collections

Use anchored sections on `writing.html`, rather than four thin duplicate pages:

- `#collection-ai-learning-assessment`
- `#collection-clinical-reasoning`
- `#collection-vr-simulation`
- `#collection-educator-life`

Each has an introduction, one Start here link and a native disclosure containing every member in reverse publication order. Expanded lists are text-only. The existing main archive does not repeat the featured/recent/Practice Note cards. A separate collapsed complete chronological list includes all 47 posts for exhaustive browsing. Multiple collection memberships do not create multiple article pages.

## 4. Content types

ESSAY means reflective or argumentative writing, not necessarily a systematic evidence review. PRACTICE NOTE preserves the existing eight-post series. TEACHING DESIGN identifies a design record, including the explicitly unused assignment. PROJECT UPDATE identifies a preliminary project or experiment, not proven effectiveness. GUIDE identifies practical guidance, including historically situated technology guidance. Types do not certify clinical accuracy or current product advice.

All 47 published English bodies were inspected for their educational focus, limitations and narrative form. Assignments and their rationale are recorded in `writing-architecture.mjs`; the inventory below is a documentation snapshot. Do not assign solely from a title.

## 5. Start-here logic

Exactly one member per collection carries its collection ID in `startHere`:

- AI: ID 332, Enough About Catching AI — a concrete student-first learning sequence.
- Clinical reasoning: ID 319, Beyond the Right Answer — explanation exposes reasoning hidden behind correct performance.
- VR/simulation: ID 323, A VR Demonstration Is Not Yet a Learning Experience — learning purpose, observer participation and debriefing before novelty.
- Educator life: ID 330, When Teaching Becomes Boring — a reflective entry into sustained teaching and renewed attention to learners.

These are entry points, not rankings. Generation validates one start per collection, membership, published IDs, types and later-article progression dates.

## 6. Table of contents

`articleContents()` operates on existing H2 headings. Four meaningful H2 sections are required. Reference, source and related-reading/research headings do not contribute to the threshold or appear in the TOC. Practice Notes under four minutes omit the TOC even when they have four headings. Longer Practice Notes can qualify. Pending-translation placeholders do not qualify.

Author-supplied IDs are preserved. New IDs use `section-` plus a Unicode-aware heading slug; numeric suffixes resolve collisions after reserving all existing body IDs. Once a published heading needs editorial renaming, retain its generated ID explicitly in source to preserve incoming fragments. Existing text is not rewritten. A native, initially closed `<details>` works at all widths and without JavaScript; links are an ordered list within a labelled nav. There is no sticky sidebar, active-section script or scroll listener. A Writing-only 8rem scroll margin clears the existing sticky header. Heading links use the article's language even when the disclosure label remains English.

## 7. From writing to practice

Optional `practiceLinks` are manually curated objects containing `page`, optional `fragment`, `title` and `text`. The generator resolves public localised pages using existing helpers; the Goniometry directory uses its supported language query. No automatic keyword linking and no tracked-mode links from public writing.

Current connections: 300→reasoning chatbot research; 306/312→AI Literacy Check; 313/314→simulation role-rotation research; 322→VR research; 323→physiology VR; 331→Goniometry; 332→Skills Lab; 334→Teaching. Copy describes a connection or a setting for practice, not a new capability, automatic AI context transfer or a validated research result.

## 8. Where this idea went next

Optional `ideaProgression` uses `postId` and explanatory `text`. Three connections are configured: 175→323, 309→334 and 319→331. They point to later writing on the related educational question; they do not claim a causal research lineage. Existing related posts and chronological navigation remain.

## 9. Evidence freshness

Optional `sourceReviewDate` and `editorialUpdated` accept real ISO calendar dates (`YYYY-MM-DD`). Both are deliberately unset for every current article: collection curation and regeneration are not substantive editorial or source reviews. Do not derive them from filesystem time, commit date or today's date. Record the sources checked and review evidence before setting a source review date.

`editorialUpdated`, if substantiated, supplies the visible Updated line and BlogPosting dateModified. Otherwise existing post.modified/post.date remain untouched and no visible update date is inferred. Publication dates never change. The helper is tested with synthetic dates only; those fixtures are not article claims.

## 10. Official sources

Optional `officialSources` contains `title`, `url` and an internal `provenance` note. Movement Science (334) has one supplementary official link: the University of Sydney policy announcement already referenced in `ai-assessment-content.mjs` (329). This is repository-grounded provenance, not a claim that the current policy was freshly checked. Existing academic references are unchanged.

No verified SFU or HKU policy URLs were present in the inspected article sources. Those links remain for author/source verification; no guessed institutional URL or invented policy is added. The block is outside the article body and TOC threshold.

## 11. RSS discovery

Writing ends with Follow new writing → locale RSS and the existing LinkedIn profile. Article follow/share controls remain. All three 47-item feeds are byte-identical to the Phase 8 baseline. No subscription collection, newsletter or analytics provider is added.

## 12. Adding new writing

Continue the existing generator/body/image workflow first. Add one entry keyed by the published ID in `writing-architecture.mjs`, with inspected collections, contentType and rationale. Do not duplicate titles, slugs, dates or bodies in that module. Add optional curated connections only when the target exists. Revisit the start-here choice deliberately, rather than automatically promoting the latest post.

Run generation, structural audit and Writing tests, inspect all three language outputs, then run generation again and compare changes. The second run must be identical. A new article legitimately changes parity/feed assertions: update those assertions with reviewed evidence rather than weakening body/URL preservation checks.

## 13. Multilingual handling

The three Writing pages retain existing translated archive copy and article titles. New collection introductions, type labels, TOC control wording and relationship guidance remain English, marked with `lang="en"` and a visible TRANSLATION REQUIRED notice. Approved article bodies and pending-translation placeholders are unchanged. Do not silently translate academic claims. Search includes English collection/type terms in each locale. Collection links stay within the selected locale.

## 14. Maintenance rules

Source of truth: existing generator/content modules for articles; `writing-architecture.mjs` only for editorial discovery. Styles: `assets/writing-architecture.css`, loaded only on Writing and article pages. No new browser script. Preserve the `/TakWing/` base through existing relative-path helpers.

Search adds four anchor entries and collection/type text to existing article records; ranking and loading are unchanged. BlogPosting adds valid genre and keywords; existing metadata is preserved. No collection routes, sitemap entries or duplicate SEO pages are created. Lazy search remains deferred to a separate measured change. Games, student systems, authentication, Cloudflare/D1 and Zapier are outside this phase.

## Inspected membership inventory

The following snapshot is generated from the editorial metadata and current article titles. Collection abbreviations: A = AI, Learning & Assessment; C = Clinical Reasoning & Practice Readiness; V = VR, Simulation & Educational Technology; E = Life as an Educator.

- AI, Learning & Assessment: 22 articles.
- Clinical Reasoning & Practice Readiness: 13 articles.
- VR, Simulation & Educational Technology: 9 articles.
- Life as an Educator: 19 articles.

| ID | Article | Collections | Type | Content basis |
|---|---|---|---|---|
| 137 | The road of PhD | E | ESSAY | Doctoral learning through supervision and challenged assumptions. |
| 146 | What you need to succeed? | E | ESSAY | Personal reflection on attitude; the word game is not evidence. |
| 175 | A little VR with 3D Organon | V | ESSAY | An anatomy VR demonstration raises questions about educational evaluation. |
| 181 | VR setup &#8211; what do I think? | V | ESSAY | Practical experience of equipment setup and support in VR teaching. |
| 189 | Embracing the Future of Wireless VR: A Simple Guide to Setting Up Your Meta VR Headset | V | GUIDE | Headset preparation, institutional connectivity and participation considerations. |
| 200 | Navigating the Virtual World: A Comparison of HTC VR, Meta Quest 2, and Meta Quest 3 Pro | V | GUIDE | Experience-based headset comparison; historical context rather than a current buying recommendation. |
| 215 | Dealing with Student Mental Health Crises During Examinations: Guidelines for Lecturers | E | GUIDE | Supporting a student in distress while separating care from academic decisions. |
| 217 | Supporting Students with Special Educational Needs: A Guide for Lecturers | E | GUIDE | Inclusive teaching through adjustments, partnership and review. |
| 226 | Conference of Teaching and Learning | A, E | ESSAY | Conference reflection on AI and educational purpose. |
| 227 | The Weight of Decision: My Experience as a University Admissions Interviewer | E | ESSAY | Admissions interviews, fairness and educator responsibility. |
| 254 | A Tale of Two Graduations: From South Africa to Hong Kong | E | ESSAY | Graduation, family and academic milestones. |
| 256 | Beyond the Chatbot: Why I’m Using OpenClaw to Reclaim my Academic Life &#8211; The Burden of the &#8220;Invisible Curriculum&#8221; | A, E | PROJECT UPDATE | An early personal experiment with an AI administrative teammate, not an effectiveness study. |
| 300 | AI Should Be a Thinking Partner, Not a Clinical Shortcut | A, C | ESSAY | Reasoning before AI assistance and accountability for clinical judgement. |
| 301 | AI Policy Is Not Enough: Students Also Need Help Resisting the Pressure to Misuse AI | A | ESSAY | Learning pressures and peer norms alongside AI integrity policy. |
| 302 | Productive Struggle in the Age of AI | A | ESSAY | Productive struggle and the risk of removing the work of learning. |
| 303 | When AI Makes Academia Faster, Who Gets the Time Back? | A, E | ESSAY | Academic workload, acceleration and judgement with AI. |
| 304 | Two Years in Hong Kong: Reflecting on Teaching, Innovation, and Receiving a Teaching Excellence Award | E | ESSAY | A teaching award prompts reflection on the purpose of innovation. |
| 305 | AI Can Draft Exam Questions, But It Cannot Validate Them | A | ESSAY | AI-generated examination questions still require expert evaluation. |
| 306 | Using ChatGPT Is Not the Same as AI Literacy | A | ESSAY | Tool familiarity differs from verification, privacy and responsible AI literacy. |
| 307 | Do Not Ask AI for the Answer First | A, C | ESSAY | Questions and scaffolded reasoning after the learner forms a judgement. |
| 308 | Beyond IQ: What Quotients Do Students Need in the AI Era? | A | ESSAY | Human adaptability and ethics in an AI context; a conceptual reflection. |
| 309 | When Assessment Invites AI but Does Not Assess AI | A, C | TEACHING DESIGN | An unused movement-science assignment exposes a mismatch between activity and assessment. |
| 310 | Waiting for Results: Reflections on Speaking to Hong Kong’s Future Physiotherapy Students | E | ESSAY | Outreach, educational choices and family uncertainty. |
| 311 | Do Not Start with AI: Start with the Curriculum | A | ESSAY | Curriculum-first AI design rather than tool-led adoption. |
| 312 | Lecturers Need AI Literacy, Not a Computer Science Degree | A | ESSAY | Lecturer AI literacy as professional judgement. |
| 313 | The Clinician Is Not the Only Learner: What Role Rotation Might Add to Simulation | C, V | PROJECT UPDATE | A preliminary simulation role-rotation project; no proven outcomes claimed. |
| 314 | From Classroom to Clinic: What Is Healthcare's Equivalent of TRAIN? | C, V | ESSAY | TRAIN is a reflective practice-readiness lens, not a validated instrument. |
| 315 | The Next AI Problem Is AI Authenticity Fatigue | A, E | ESSAY | A proposed reflection on authenticity fatigue in academic AI use. |
| 316 | Should I Use AI for This? From Personal Choice to Health CARE‑AI | A | GUIDE | Decision questions about individual AI use and responsible educational governance. |
| 317 | AI Integration Needs a Theory of Learning | A | ESSAY | Learning theory and the conditions for professional learning with AI. |
| 318 | When AI Can Read but Cannot Act: Why a Limitation May Be a Safeguard | A, E | ESSAY | A personal calendar experiment distinguishes AI capability from authority. |
| 319 | Beyond the Right Answer: Why We Should Ask Students to Explain | C, A | ESSAY | Explanation reveals reasoning hidden behind correct procedural performance. |
| 320 | Practising What We Teach: Staying Connected to Clinical Practice | C, E | PRACTICE NOTE | Experiencing equipment as a participant informs communication and educator humility. |
| 321 | The Clinical Education Triangle: Students, Clinical Educators and Visiting Lecturers | C, E | PRACTICE NOTE | Student, clinical educator and lecturer perspectives connect placement to curriculum. |
| 322 | Why Universities Are Attracted to VR, and Why Novelty Is Not Enough | V | PRACTICE NOTE | VRILO and sustainable VR curriculum integration beyond novelty. |
| 323 | A VR Demonstration Is Not Yet a Learning Experience | V | PRACTICE NOTE | Learning intentions, observer participation and debriefing distinguish VR learning from demonstration. |
| 324 | A Simulation Room Is Only the Beginning | V, C | PRACTICE NOTE | Simulation depends on preparation, attention and debriefing beyond the room. |
| 325 | Beyond a Score: What Content-Mastery Quizzes Make Visible | C | PRACTICE NOTE | Quiz performance opens questions about explanation and understanding. |
| 326 | What Group Work Makes Visible Before Assessment | C | PRACTICE NOTE | Group work makes participation and reasoning observable before assessment. |
| 327 | What a Guest Lecturer Adds That a Slide Cannot | E | PRACTICE NOTE | Guest lecturers connect experience to the curriculum. |
| 328 | A Conference Should Change What Happens on Monday | E | ESSAY | Conference participation should inform subsequent teaching. |
| 329 | Should We Assess Students With AI — or Without It? | A | ESSAY | Assessment with and without AI and the two-lane policy model. |
| 330 | When Teaching Becomes Boring: Do Educators Need Novelty Too? | E | ESSAY | Teaching boredom, novelty and renewed attention to the learner. |
| 331 | Can You Hear the Song? The Curse of Knowledge in Teaching | C | ESSAY | Expert blind spots, hidden reasoning and explanation in teaching. |
| 332 | Enough About Catching AI: A Practical Guide to Using It for Learning | A | GUIDE | A practical student-first sequence for using AI without making thinking optional. |
| 333 | Thinking with AI, Not Just About AI | A, E | ESSAY | Conference reflection on thinking with AI and curriculum design. |
| 334 | Movement Science Assessment Redesign for Generative AI | A, C | TEACHING DESIGN | A Movement Science assessment record combining preparation, presentation and live questions. |
