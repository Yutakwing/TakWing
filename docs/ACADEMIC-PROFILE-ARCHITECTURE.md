# Academic profile and discoverability

Completed implementation: 21 September 2026. A scoped portfolio pass, not Phase 9 or Phase 12.

## Talks architecture and verification

The archive is `media.html#talks`, with corresponding locale fragments. It reuses Media rather than adding a thin route or another top-level navigation item. `academic-profile.mjs` is the central source for categories, speaking records, source evidence, metadata, resource proposals and the CV configuration. The generator adds the archive to Media and its site-search entry. Existing Instagram items and the supplied YouTube video are preserved.

Three records have repository evidence of delivery:

- VR curriculum integration / VRILO, EdUHK International Postgraduate Conference and Research Forum 2026: article 322 explicitly says “I presented”. Formal accepted title, host, conference dates (29 July–1 August 2026), oral format and approximate 15-minute allocation were confirmed by Tak Wing on 21 September. Individual presentation day and venue remain unconfirmed.
- Student/parent information session: article 310 describes representing SFU and addressing prospective students and parents. Exact date, organiser and formal event title are not established.
- 14th Pan Pacific Conference on Rehabilitation: the existing English Media/Instagram entry explicitly describes a presentation at the 8–9 November 2025 conference. Those are conference dates, not a claimed individual presentation date. Talk title/topic and venue remain unconfirmed.

Public titles are descriptive summaries; unknown fields are stated rather than guessed. Article and Instagram publication dates are never used as event dates. `unverifiedTalks` also holds the SAHK CPD activity of 20 August 2026, with personal delivery role unconfirmed. It holds content-mastery quizzes (delivery mentioned but event/category unknown), World Physiotherapy Congress 2025 (attendance does not establish a specific talk), and Thinking with AI (conference reflection does not establish delivery). These remain VERIFICATION REQUIRED and unpublished in the archive. Generic institutional claims of presenting do not establish specific event/session records.

Records support title, event, host, date/dateLabel, location, format, role, category, description, status, verification/source, optional image and labelled links. Links can point to slides, video or reflections; none are invented. An image object must contain an existing local src, source-grounded alt, width and height. Check rights and dimensions before enabling it. Never upgrade attendance, registration, wait-listing, organising or team membership to speaker status.

## Teaching portfolio and pathways

`teaching-designs.mjs` owns three concise designs, rendered by `teaching-practice.mjs`. Existing IDs remain stable. Each explains educational problem, learning design, student action, technology and assessment/feedback, followed by related links:

- Movement Science preparation/presentation/live Q&A → assessment article, related clinical-reasoning research and Goniometry practice. The practice link is a related exploration, not validation of the assessment.
- Simulation role rotation → role-rotation article and ongoing research. Outcomes remain unestablished.
- Student-first AI learning → AI guide, reflective AI Literacy Check, Skills Lab and in-development VR research.

Research projects reciprocally link to the relevant teaching design. Existing manually curated article-to-teaching/research/activity links remain; no keyword inference or article-body edits. Teaching philosophy, curriculum, reflection and movement visual remain.

## Academic identity and CV

Verified the official SFU profile on 20 September 2026:
https://www.sfu.edu.hk/en/about-the-institute/schools-and-departments/school-of-health-sciences/academic-staff/dr-yu-tak-wing/index.html

It identifies Tak Wing Yu as Senior Lecturer in Physiotherapy and links back to this site. Added it to profile.sameAs.staffProfile, shared Person metadata and existing profile-link rendering. About now exposes SFU, ORCID, Scholar and LinkedIn together. Existing identifiers and name aliases are retained; no new qualifications or publications were inferred.

CURRENT CV REQUIRED. No authoritative current downloadable CV was found among repository files. `academicCv.href` remains null; About explains that no downloadable CV is published and supplies live academic profiles instead. There is no dead download button or invented CV. To release: obtain the owner-approved current PDF, remove inappropriate private information, store under assets, set a relative href and reviewedOn, check the link/file/content/accessibility, regenerate and verify the served PDF. Existing cv.html remains unchanged in purpose.

## Resources

Resources prioritises four proposed educator formats: clinical-reasoning planner, responsible-AI task template, VR implementation checklist and Mini Skills OSPE station template. Every proposal has `href:null` and TAK WING APPROVAL REQUIRED. Public cards say In development / Approval required, with no invented downloadable materials. Related writing/practice links are context, not completed templates or clinical protocols.

The previous activity/reading catalogue is retained under a native disclosure, preserving anchors and links. Skills Lab is presented as the main learner-practice catalogue. No game changes.

## SEO and breadcrumbs

English title/description changes were reported before editing. The table below records exact before/after titles. Home/About name-focused titles are retained. Matching Open Graph descriptions follow the shared shell. Chinese metadata/body translations are not fabricated.

Articles now have visible Home → Writing → Article navigation and matching BreadcrumbList JSON-LD. Collections remain the existing separate membership links because articles can belong to multiple collections; no artificial primary collection or new collection URLs. Article bodies, BlogPosting metadata, dates, canonical, hreflang, sitemap, robots, three feeds and Google verification bytes are preserved.

## Contact audit

FormSubmit end-to-end delivery remains UNVERIFIED. Existing error handling preserves the form contents on failures and activation errors; only an accepted response resets the form. The direct-email fallback remains visible without JavaScript, and About/Contact retain university and personal email. No email test was sent. Provider acceptance is not proof of inbox delivery. See CONTACT-FORM.md for the separately authorised live-test requirement.

## Search-loading evaluation

Search currently loads a deferred `search-index-inline.js` on every generated public document, then normalises records in script.js. If the inline index is absent, script.js immediately fetches JSON. Deferred means after parsing, not on-demand. Pre-pass raw index sizes were 284,215 bytes English, 207,146 Traditional Chinese and 207,449 Simplified Chinese. These are uncompressed source bytes, not measured transfer sizes or timings.

Loading only on the first search opening could avoid the corresponding index transfer/parsing/normalisation on visits without search. Search visits would still incur it. A safe implementation must preserve one in-flight load, index fallback, nested/locale paths, queries typed while loading, error/retry UI, ranking, keyboard focus and file-preview expectations. No search-loader/runtime behaviour changed in this pass; parity for those loading changes has not been established. This is an evaluated future optimisation, not a claimed performance gain. Search content is updated for talks/resources and VRILO was checked through the current UI.

## Accessibility and validation

Existing colours, typography and surfaces are reused. Page-only academic-profile.css provides wrapping links, description-list spacing and explicit focus. Breadcrumb styles live in the existing Writing stylesheet with an updated cache version. No new runtime JavaScript or animations; native links/disclosures remain available without JavaScript and introduce no reduced-motion dependency.

Forty local combinations: five affected page types × four widths (390/768/1024/1440) × light/dark, one H1 and no overflow. Resource disclosure responds to Enter with a visible focus outline. Search returns Media and the related reflection for VRILO; Escape restores focus. Structural audit checks links/headings/assets, while academic-profile.mjs tests 141 breadcrumb/BlogPosting records, identity, exact canonical/hreflang and protected file preservation. Writing regression preserves article bodies and feeds; analytics boundary cases remain unchanged.

## Maintenance and review

Run `node generate-site.mjs`, `node tests/academic-profile.mjs`, `node tests/writing-architecture.mjs`, `node tests/site-analytics.mjs`, and `node .codex-review/site-audit.mjs`. Re-run generation and confirm reproducibility. The general audit excludes the exact Google verification endpoint, whose bytes are checked separately; never add a page shell to it. The analytics preservation test ignores only the new visible breadcrumb nav when comparing historical article main sections.

Review needed: formal talk titles/dates/venues; unpublished candidate records; complete educator materials and clinical verification where relevant; current CV; approved Chinese structural copy; separately authorised FormSubmit inbox test. Search engine indexing/rankings and third-party video/chatbot behaviour are not guaranteed. No student/auth/D1/scoring/tutor/analytics logic changes.

Official guidance: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb and https://developers.google.com/search/docs/appearance/title-link .

## Metadata before / after

| Page | Before | After |
|---|---|---|
| research | Research · Tak Wing Yu · Physiotherapy Educator and Researcher | AI, VR & Physiotherapy Education Research · Tak Wing Yu |
| teaching | Teaching · Tak Wing Yu · Physiotherapy Educator and Researcher | Physiotherapy Teaching & Assessment · Tak Wing Yu |
| media | Media · Tak Wing Yu · Physiotherapy Educator and Researcher | Talks, Presentations & Media · Tak Wing Yu |
| resources | Resources for educators · Tak Wing Yu · Physiotherapy Educator and Researcher | Educator Resources · Tak Wing Yu |
| collaborate | Let us build something useful · Tak Wing Yu · Physiotherapy Educator and Researcher | Research & Teaching Collaboration · Tak Wing Yu |

## Updated documentary context — 21 September 2026

This supersedes the initial three-record archive description above. Two public records now remain: IPCRF and Pan Pacific. IPCRF uses the supplied deck/programme evidence summary for 30 July 2026, EdUHK, B4-LP-03 and Speaker and Panel Chair; no personal speaking time or duration is shown. Outreach is moved to the source-only queue under the latest explicit instruction, despite supported outreach context. Its article is unchanged. SAHK’s programme time, venue and team preparation are recorded internally, not attributed as personal delivery. Quiz title is a possible duplicate of pan-pacific-2025, not a confirmed match; no public merge or duplicate created. Documentary summaries were supplied by Tak Wing; original emails/decks were not independently opened in this follow-up.
