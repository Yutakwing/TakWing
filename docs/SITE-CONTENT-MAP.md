# Site content map

Actual routes inspected 19 September 2026. All paths below are relative to `https://yutakwing.github.io/TakWing/`. A leading origin-root slash would lose the Pages base path.

| Surface | Route | Source / status |
| --- | --- | --- |
| Home | `index.html` (also directory root) | Generator and portfolio modules |
| About | `about.html` | Generator / profile content |
| Research | `research.html` | Scholarship/portfolio content and publication data |
| Teaching | `teaching.html` | Teaching content; movement visual integrated here |
| Skills Lab | `skills-lab.html` | `skills-lab-content.mjs`; public discovery |
| Writing | `writing.html` | Generated archive, topics and 47 articles |
| Media | `media.html` | `media-showcase.mjs`, experience content; supplied short video and professional Instagram links |
| Resources | `resources.html` | Resource and Skills Lab entry points |
| Collaborate | `collaborate.html` | Collaboration areas and contact entry |
| Contact | `contact.html` | Contact form; separate transport contract |
| Student Login | `student/login/` | Standalone authentication UI |
| Student Dashboard | `student/dashboard/` | Requires valid session; progress/history and tracked activities |
| Goniometry | `goniometry/` | Six-joint public hub |
| Cardiorespiratory | `cardiorespiratory/` | Five-activity public hub |
| Mobility & Assistive Devices | `mobility.html` | **In development**, six inert activity cards; not a playable lab |
| Search | Header/menu overlay | `search-index.json` and deferred `search-index-inline.js`; no separate search-page route |
| RSS | `feed.xml` | Generated, 47 items per language |
| Sitemap | `sitemap.xml` | Generated public route catalogue |

## Registered playable activities

The authoritative ID/path catalogue is `cloudflare/seed-games.sql`. Each path also supports `?tracked=1` with authentication. Public mode does not save student progress. Historical retired respiratory-rate results are retained, but that game is not active.

| Category | Activity ID | Route |
| --- | --- | --- |
| Goniometry | `elbow-goniometry` | `elbow-goniometry/` |
| Goniometry | `ankle-goniometry` | `ankle-goniometry/` |
| Goniometry | `shoulder-goniometry` | `shoulder-goniometry/` |
| Goniometry | `shoulder-rotation-goniometry` | `shoulder-rotation-goniometry/` |
| Goniometry | `hip-goniometry` | `hip-goniometry/` |
| Goniometry | `knee-goniometry` | `knee-goniometry/` |
| Cardiorespiratory Skills | `cardio-auscultation-anterior` | `cardiorespiratory/anterior-auscultation/index.html` |
| Cardiorespiratory Skills | `cardio-auscultation-posterior` | `cardiorespiratory/posterior-auscultation/index.html` |
| Cardiorespiratory Skills | `cardio-chest-expansion` | `cardiorespiratory/chest-expansion/index.html` |
| Cardiorespiratory Skills | `cardio-chest-percussion` | `cardiorespiratory/chest-percussion/index.html` |
| Cardiorespiratory Skills | `cardio-breath-sounds` | `cardiorespiratory/breath-sounds/index.html` |
| AI and Digital Literacy | `typing-speed` | `typing-test/` |
| AI and Digital Literacy | `ai-literacy-check` | `ai-literacy-check.html` |
| Clinical Reasoning | `reasoning-runner` | `reasoning-runner.html` |
| Clinical Reasoning | `clinical-readiness-lab` | `clinical-readiness-lab.html` |

## Language structure and development content

Generated public pages/articles exist in English, `zh-hant/` and `zh-hans/`. Language navigation preserves parallel URLs. Goniometry and Cardiorespiratory game localisation uses existing query-driven dictionaries where implemented; hubs/student/tutor screens do not all have complete Chinese coverage. AI Literacy, Reasoning Runner and Clinical Readiness have generated locale pages. Inspect the actual route before claiming translated content.

Skills Lab, Media showcase, movement copy and Mobility additions retain English with explicit TRANSLATION REQUIRED notices on Chinese routes. New article translations may be pending with a link to complete English. No translations were invented in Phase 8.

Mobility lists Crutch Fitting, Crutch Walking Sequence, Stairs with Crutches, Walking Stick / Cane, Walking Frame and Mobility Safety. All remain In development. `mobility/clinical-config.json` and `mobility/case-context.mjs` are foundation resources, not playable routes.

## Other root HTML routes

These existing pages remain reachable even where they are not top-level navigation items:

- `404.html`
- `cv.html`
- `ideas.html`
- `notes.html`
- `projects.html`
- `publications.html`

## Blog additions and stable URLs

- `posts/thinking-with-ai-not-just-about-ai.html` — Blog II, complete English source, supplied conference image.
- `posts/movement-science-assessment-redesign-for-generative-ai.html` — Blog II, complete English source, supplied classroom image.
- `posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html` — Phase 2, existing finished source published.
- `posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html` — Phase 2, existing finished source published.

All four are present in the relevant generated archive/search/feed systems; Chinese route presence must not be described as finished translation. Existing article slugs are preserved.

## Complete English article route inventory

- `posts/a-conference-should-change-what-happens-on-monday.html`
- `posts/a-little-vr-with-3d-organon.html`
- `posts/a-simulation-room-is-only-the-beginning.html`
- `posts/a-tale-of-two-graduations-from-south-africa-to-hong-kong.html`
- `posts/a-vr-demonstration-is-not-yet-a-learning-experience.html`
- `posts/ai-can-draft-exam-questions-but-it-cannot-validate-them.html`
- `posts/ai-integration-needs-a-theory-of-learning.html`
- `posts/ai-policy-is-not-enough-students-need-help-resisting-pressure-to-misuse-ai.html`
- `posts/ai-should-be-a-thinking-partner-not-a-clinical-shortcut.html`
- `posts/beyond-a-score-what-content-mastery-quizzes-make-visible.html`
- `posts/beyond-iq-what-quotients-do-students-need-in-the-ai-era.html`
- `posts/beyond-the-chatbot-why-im-using-openclaw-to-reclaim-my-academic-life-the-burden-of-the-invisible-curriculum.html`
- `posts/beyond-the-right-answer-why-we-should-ask-students-to-explain.html`
- `posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html`
- `posts/clinical-education-triangle-students-clinical-educators-visiting-lecturers.html`
- `posts/conference-of-teaching-and-learning.html`
- `posts/dealing-with-student-mental-health-crises-during-examinations-guidelines-for-lecturers.html`
- `posts/do-not-ask-ai-for-the-answer-first.html`
- `posts/do-not-start-with-ai-start-with-the-curriculum.html`
- `posts/embracing-the-future-of-wireless-vr-a-simple-guide-to-setting-up-your-meta-vr-headset.html`
- `posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html`
- `posts/from-classroom-to-clinic-what-is-healthcares-equivalent-of-train.html`
- `posts/lecturers-need-ai-literacy-not-a-computer-science-degree.html`
- `posts/movement-science-assessment-redesign-for-generative-ai.html`
- `posts/navigating-the-virtual-world-a-comparison-of-htc-vr-meta-quest-2-and-meta-quest-3-pro.html`
- `posts/practising-what-we-teach-staying-connected-to-clinical-practice.html`
- `posts/productive-struggle-in-the-age-of-ai.html`
- `posts/should-i-use-ai-for-this-from-personal-choice-to-health-care-ai.html`
- `posts/should-we-assess-students-with-ai-or-without-it.html`
- `posts/supporting-students-with-special-educational-needs-a-guide-for-lecturers.html`
- `posts/the-clinician-is-not-the-only-learner-what-role-rotation-adds-to-simulation.html`
- `posts/the-next-ai-problem-is-ai-authenticity-fatigue.html`
- `posts/the-road-of-phd.html`
- `posts/the-weight-of-decision-my-experience-as-a-university-admissions-interviewer.html`
- `posts/thinking-with-ai-not-just-about-ai.html`
- `posts/two-years-in-hong-kong-reflecting-on-teaching-innovation-and-receiving-a-teaching-excellence-award.html`
- `posts/using-chatgpt-is-not-the-same-as-ai-literacy.html`
- `posts/vr-setup-what-do-i-think.html`
- `posts/waiting-for-results-reflections-on-speaking-to-hong-kongs-future-physiotherapy-students.html`
- `posts/what-a-guest-lecturer-adds-that-a-slide-cannot.html`
- `posts/what-group-work-makes-visible-before-assessment.html`
- `posts/what-you-need-to-succeed.html`
- `posts/when-ai-can-read-but-cannot-act.html`
- `posts/when-ai-makes-academia-faster-who-gets-the-time-back.html`
- `posts/when-assessment-invites-ai-but-does-not-assess-ai.html`
- `posts/when-teaching-becomes-boring-do-educators-need-novelty-too.html`
- `posts/why-universities-are-attracted-to-vr-and-why-novelty-is-not-enough.html`

## Writing collection entry points (Phase 10)

No new page routes. These fragments exist on `writing.html`, `zh-hant/writing.html` and `zh-hans/writing.html`, under the existing `/TakWing/` deployment base:

| Fragment | Collection | Start article ID |
|---|---|---|
| `#collection-ai-learning-assessment` | AI, Learning & Assessment | 332 |
| `#collection-clinical-reasoning` | Clinical Reasoning & Practice Readiness | 319 |
| `#collection-vr-simulation` | VR, Simulation & Educational Technology | 323 |
| `#collection-educator-life` | Life as an Educator | 330 |

All 47 article URLs remain unchanged. The sitemap still has 196 URLs; fragments are indexed in site search, not added as duplicate sitemap pages. New structural translations remain TRANSLATION REQUIRED. See `WRITING-ARCHITECTURE.md` for membership and manually configured links to existing research/teaching/Skills Lab destinations.
