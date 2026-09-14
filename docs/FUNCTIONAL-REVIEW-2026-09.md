# Functional review — completed 14 September 2026

The core site and Skills Lab flows passed the checks below. The review began on
11 September and resumed on 14 September. Unrelated article drafts were retained
locally and excluded from this review release.

## Repairs

- Language links now preserve `tracked=1` within learning activities. Previously,
  switching language could silently return a student to public practice.
- The AI Literacy activity's tracked-mode privacy notice now accurately explains
  that completion scores and practice statistics are saved to the student's
  account. Role, age group and individual answers are not sent to the progress
  database. Public-mode wording is retained; all three languages are covered.
- Updated the tutor browser test to use the new panel's visible close button.

## Verified

- 13 backend/SQLite tests: validation, session expiry, account isolation,
  best/latest scores, duplicate UUIDs, concurrent retries, migration preservation,
  bounded history and optional webhook failure. Rerun successfully 14 September.
- 30 native game completion/restart runs: all 15 games in public desktop and
  tracked mobile modes, against isolated local D1, passed during this review.
- Save retries retain their payload and UUID; repeated submission, hints, AI
  counters, session reauthentication, dashboard/history and mobile layout pass.
- Six contact-form cases: three languages at 390px and 1280px. Prefilled subjects,
  failed/activation responses, draft retention and successful clearing pass.
  Transport was simulated; no additional email was sent during this review.
- Twelve real language-switch navigation cases pass across standalone and
  generated activities in public/tracked mode. Six additional privacy/navigation
  cases across all three AI Literacy languages passed on 14 September.
- The actual Zapier inline component loads for an authenticated local test
  session and closing it restores gameplay. No new conversation was submitted.
- All 178 URLs in the published sitemap responded successfully during the review.
- Nine main published pages passed 390px overflow checks with no browser script
  errors: home, about, research, resources, collaborate, contact, student login,
  Traditional Chinese resources and Simplified Chinese resources.
- Live existing-test-account login, session, games, progress, history and logout
  passed; unauthenticated progress returned 401. No live game attempts were added.
- Local structural audit passes: 203 HTML pages, three search indexes and 45 posts
  per language. This includes unpublished article drafts, so those counts differ
  from the published sitemap. No regeneration or publication of those drafts was
  performed for this review.

## Scope and continuing limitations

Email receipt was previously confirmed by the owner after the real activation
and delivery test. The prior live ankle tutor test also received relevant
formative feedback without changing the score. Those end-to-end results were not
repeated here. The chatbot still requires the student to paste the current attempt
summary; opening it does not transfer the game state automatically.

This is functional Chrome desktop/mobile-viewport verification, not certification
of every device, Safari, all future AI answers or clinical validity of the rubrics.
Optional external Zapier result forwarding was tested for safe failure locally;
this review does not establish that a downstream Zap or spreadsheet is configured.
No production database changes, real student-result writes, new accounts or
credential changes were needed.
