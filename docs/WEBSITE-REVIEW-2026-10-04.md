# Website review — 4 October 2026

## Conclusion

No blocking fault was found in the flows checked. The published site is functioning,
while several maintenance, translation and educational-content tasks remain.
This is not a certification of every device, clinical rubric or external service.

Reviewed published branch commit `8fbc8ae3192010ddb1e1f50602b7133a68b20245`.
The local personal-blog checkout is 28 commits behind that branch, with 235
modified/untracked paths. A separate exported snapshot of origin/main was used
for published-code checks. The local drafts were not merged, reset or published.

## Prioritised outstanding work

### 1. Reconcile the working copies before the next release — high priority

The old local checkout contains substantial edits overlapping newer published
work. Preserve those edits, compare them against the current main branch, and
integrate only changes still needed. Do not publish the entire old directory or
resolve the divergence by discarding work. Not every dirty file is new work:
some differences are already represented by later public commits.

### 2. Complete Chinese translations — medium priority

The published generator explicitly inserts TRANSLATION REQUIRED notices for
Writing collection/navigation copy, the Skills Lab guide and Mobility overview.
Contact fallback copy also has an outstanding Chinese translation note. The crawl
found translation-related notices on 112 URLs; this is a count of pages containing
notices, not a count of wholly untranslated articles. Translate the shared labels
and guides first, then audit individual articles. Retain canonical/hreflang links.

### 3. Lecturer review of scoring rubrics — medium priority

GAME-SCORING.md still marks the breath-sound technical-score adjustment and the
Reasoning Runner/Clinical Readiness Lab platform rubrics for lecturer review.
Review their educational interpretation and confirm acceptable rubric policies.
Passing software tests does not establish clinical or assessment validity.

### 4. Resolve the intended scope of Mobility — planned development

The Mobility & Assistive Devices Lab contains six intentionally inert development
cards. Clinical configuration, scoring, tolerances and completion rules remain
unverified/null. Its foundation tests pass precisely because these activities
cannot be played or registered as completed games yet. Decide whether to commission
this next phase and supply verified content before enabling it.

### 5. Correct stale handover documentation — maintenance

The current published CONTACT-FORM and September live-review documents claim
inbox receipt remains unverified. That conflicts with the owner's explicit inbox
confirmation in this conversation after the post-activation test. Record that
historical confirmation, while distinguishing it from a new October delivery test.
This discrepancy is documentation drift, not evidence that the form is broken.

### 6. Verify external setup if these features are wanted — optional

- Search Console: public verification files and sitemap reachability cannot prove
  sitemap processing, indexing, Google-selected canonicals or search ranking.
  Check those in the owner's Search Console account.
- Structured result forwarding: confirm whether a Zapier result webhook and its
  destination have actually been configured. The chatbot is a separate service;
  backend tests establish safe behaviour when optional forwarding fails, not
  successful delivery to an external spreadsheet.
- Talks archive: the verification queue still awaits evidence for personal roles,
  dates and presentation details for several candidate events. Keep uncertain
  entries out of the public speaking archive until confirmed.

### 7. Performance optimisation — optional, measure first

The English inline search index is 284,043 uncompressed bytes and is included in
the public page shell. Lazy-loading it on first search is a possible improvement.
Review responsive image sizes on image-heavy pages. Do not infer poor real-user
Core Web Vitals from file size alone; this audit did not measure field performance.

## Checks completed in this review

| Area | Evidence | Result |
|---|---|---|
| Publication | Latest GitHub Pages build for reviewed commit | Built |
| Public routes | 199 sitemap URLs fetched | No HTTP failures |
| Referenced assets | 132 same-origin JS/CSS/image/audio URLs checked | No HTTP failures |
| Public responsive UI | 10 pages × 4 widths × 2 themes | 80 cases passed |
| Accessibility basics | Theme token contrast, image alt presence, reduced motion, search focus/keyboard, blocked-storage behaviour | Passed tested checks |
| Keyboard bypass | First Tab focuses Skip to content; Enter focuses main-content | Passed live |
| Student access | Existing TEST001 login, session, games, progress, history and logout | Passed live; unauthenticated progress returns 401 |
| Authenticated layouts | 15 games × 4 widths, plus login/dashboard at each width | 60 game cases and four login/dashboard cases passed |
| Tutor availability UI | Expected tutor controls in supported clinical games | Passed visibility checks |
| Scoring backend | 13 tests from published snapshot: validation, isolation, expiry, best/latest, duplicates, concurrent retries, migration preservation, history and webhook failure | Passed |
| Mobility foundation | Six disabled cards, null configuration, safe optional context and no game registration | Passed |
| Contact UI | Live form present, Send enabled, no horizontal overflow at 390px | Passed; no email sent |

## Limits and provenance

No production game attempts, chatbot messages or contact emails were submitted
in this review. Test-account authentication sessions were used for read-only
access and layout checks. Public analytics may observe ordinary page loads.

Actual AI reply and inbox delivery were confirmed in earlier conversation tests;
this review does not claim to have repeated those external end-to-end checks.
All 30 native completion/restart runs passed in the September review; October's
checks covered current live layouts and backend tests, not a fresh completion of
every game. Real iOS/Safari, audio quality, all external links and private
Search Console/Zapier account settings were not comprehensively tested.

The local structural audit also passed 209 HTML files and three search indexes,
but those files include older/unpublished work and are not the published-site
count. Historical Git-dependent editorial tests were not counted as passing from
the exported snapshot because they require their original repository context.

No production code, configuration or database was changed by this review.
