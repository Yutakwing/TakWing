# Standard scoring and result recording — implementation review

Reviewed and completed locally on 9 September 2026 in `yutakwing/TakWing`.
The initial review retained the existing work without publishing it. On 10 September
2026, following publication approval, migration `0001_standard_results.sql` and
the registered game catalogue were applied remotely, and the scoring Worker was
deployed. Existing attempt history was preserved. GitHub Pages publication follows
the backend deployment. No account credentials or optional webhook secrets were added.

## What the interrupted work had already done

The repository already contained authentication, twelve registered activities,
legacy `/api/progress`, `progress` and `game_attempts`, anonymous public analytics,
and a student dashboard. The interrupted uncommitted work added a standard-result
migration, validation/storage module, integrations for fifteen activities,
completion/retry UI, history, tutor counters and optional webhook forwarding.
Its old implementation report incorrectly still listed much of this as absent.

The existing Skills Tutor uses an authenticated, manually pasted game summary.
It is separate from the public portfolio mascot and the optional result webhook.
The respiratory-rate activity was deliberately retired in the existing Git
history; its catalogue entry is deactivated without deleting historical results.

## What this review finished or corrected

- Verified every existing activity and its native scoring/completion path.
- Enabled standard local completion cards for public games, with no student save.
- Preserved a frozen payload/UUID for network retries and session-expiry login.
- Added a 15-second request timeout so stalled saves reach the retry state.
- Recovered from an initial transient session-check failure on later save.
- Restored the authenticated return-to-dashboard link.
- Removed previous saved/public cards on restart; unsaved cards retain independent retries.
- Recorded typing error categories without typed text.
- Started runner/readiness duration when the activity starts, including runs with no later input.
- Counted actual enabled hint clicks consistently in assessment/practice modes.
- Fixed historical dashboard values being labelled with a misleading percentage.
- Returned `ai_used` in private history; made numeric metrics optional.
- Rejected unknown identity/other fields in the legacy payload too.
- Derived webhook attempt ordinal from the saved row's insertion order, avoiding
  a later concurrent attempt changing its number.
- Moved goniometry controls below all six SVG boards: their previous overlay
  intercepted arm drags on desktop/mobile.
- Added migration preservation, concurrent retries and webhook HTTP-failure tests.
- Added repeatable native browser completion/restart, retry/session and tutor tests.
- Rebuilt generated pages, checked asset references and updated these documents.

## Complete inventory and scoring

Every standard result has maximum 100. These are deterministic formative scores,
not validated clinical competency assessments. Full component formulae, completion
conditions, error categories and extension instructions: [GAME-SCORING.md](GAME-SCORING.md).

| Game ID | Title / category | Technical score and completion | Built-in hints / tutor | Rubric change |
| --- | --- | --- | --- | --- |
| elbow-goniometry | Elbow / Goniometry | Three placements; native 120 normalised to 100 | Yes / Yes | Preserve |
| ankle-goniometry | Ankle / Goniometry | Three placements; native 120 normalised to 100 | Yes / Yes | Preserve |
| shoulder-goniometry | Shoulder / Goniometry | Three placements; native 120 normalised to 100 | Yes / Yes | Preserve |
| shoulder-rotation-goniometry | Shoulder rotation / Goniometry | Three placements; native 120 normalised to 100 | Yes / Yes | Preserve |
| hip-goniometry | Hip / Goniometry | Three placements; native 120 normalised to 100 | Yes / Yes | Preserve |
| knee-goniometry | Knee flexion / Goniometry | Three placements; native 120 normalised to 100 | Yes / Yes | Preserve |
| cardio-auscultation-anterior | Anterior auscultation / Cardiorespiratory | All 8 sites; max(60,100−6×extra checks) | Yes / Yes | Preserve |
| cardio-auscultation-posterior | Posterior auscultation / Cardiorespiratory | All 6 sites; max(60,100−6×extra checks) | Yes / Yes | Preserve |
| cardio-chest-percussion | Chest percussion / Cardiorespiratory | All 6 sites; max(60,100−6×extra checks) | Yes / Yes | Preserve |
| cardio-chest-expansion | Chest expansion / Cardiorespiratory | All 5 stages; max(60,100−6×extra checks) | Yes / Yes | Preserve |
| cardio-breath-sounds | Breath sounds / Cardiorespiratory | All 5 classifications and View results; sum max(8,20−4×extra checks per round) | Yes / Yes | Remove hint deduction from standard technical score |
| typing-speed | Typing / AI and Digital Literacy | Native 60-second test; secondary accuracy score; WPM and native score remain metrics | No / No | Preserve native metrics |
| ai-literacy-check | AI literacy / AI and Digital Literacy | Submit all 15 answers; round(correct/15×100) | No / No | Preserve answer key |
| reasoning-runner | Reasoning Runner / Clinical Reasoning | Native run end; answered-question accuracy, 0 if none answered | No / No | New draft platform rubric |
| clinical-readiness-lab | Clinical Readiness Lab / Clinical Reasoning | Three badges and gate; round(300/max(3,answer checks)) | No / No | New draft platform rubric |

Goniometry preserves the per-stage native formulae: axis
`max(20,round(40−distance×0.6))`; each arm
`max(20,round(40−angularError×2))`. The game normalises the total by 120.
Rejected placements award no points; later accepted placements retain the
existing rubric. No new anatomical targets/tolerances were invented.

**LECTURER REVIEW REQUIRED:** the two new reasoning rubrics, the breath-sound
technical-score adjustment, and educational interpretation of the existing
cardiorespiratory score floors. Independence is a configurable formative policy,
not an asserted validated measure. Typing accuracy is not a clinical score.

## Database and API

Migration: `cloudflare/migrations/0001_standard_results.sql`.
It adds columns, indexes and triggers; no tables or historical values are dropped.
Existing `UNIQUE(user_id,game_id)` remains authoritative for summaries.

- `game_attempts`: unique nullable UUID for compatibility with old rows;
  technical/independence scores, hints, AI flag/count/scaffold, deduplicated JSON
  errors and bounded numeric JSON metrics. Existing duration, attempts and date
  columns are reused.
- `progress`: latest technical score, `best_technical_score`, best/latest
  independence, total hints and AI requests. Existing attempt totals and first,
  last and completion timestamps remain.
- `users.result_ref`: randomly generated stable pseudonym, including existing
  users and future inserts. It contains no username or direct database user ID.

Historical `score` and `best_score` are preserved on their native scales. Standard
best scores use `best_technical_score`; the standard POST response aliases that
column as `progress.best_score`. GET progress exposes both fields explicitly.
Unknown historical scores are never silently converted to percentages.

The authenticated existing `POST /api/progress` accepts this exact standard shape:

```json
{
  "attempt_uuid": "6fea9217-1234-4123-8123-123456789abc",
  "game_id": "elbow-goniometry",
  "technical_score": 88,
  "independence_score": 80,
  "completed": true,
  "attempts_in_game": 4,
  "hints_used": 2,
  "ai_used": true,
  "ai_requests": 2,
  "highest_scaffold_level": "focused-hint",
  "duration_seconds": 154,
  "error_summary": ["axis-placement-error", "stationary-arm-angle-error"],
  "metrics": {}
}
```

`metrics` is optional. The server permits at most eight finite numeric fields
from `wpm`, `accuracy`, `native_score`, `native_maximum`. Scores must be finite
0–100; attempts 1–10,000; hints/AI counts 0–10,000; duration 0–86,400 seconds.
AI flag/count/scaffold consistency is checked. Error summaries permit at most
32 bounded category codes; bodies are streamed with a 16 KiB limit. The active
`games` table, seeded by `seed-games.sql`, is the central game allowlist.

The session identifies the user. Missing/expired sessions receive 401. No browser
user ID is accepted. SQL uses bound prepared statements. Cached legacy clients
remain supported with their original score scale; legacy writes do not acquire
UUID deduplication retrospectively.

A new attempt INSERT fires an AFTER INSERT trigger in the same transaction:
latest scores are replaced, best scores use MAX, attempts increment once, and
hint/AI totals accumulate. First-attempt/completion timestamps are preserved;
completion is sticky. Failed inserts cannot update the summary. The unique UUID
conflict skips both insertion and trigger; duplicates return success with
`duplicate:true` and never forward again. Cross-user/game UUID collisions return
409 without disclosing their owner.

`GET /api/games/:game_id/attempts` returns only the session user's latest 20
attempts. `GET /api/progress` supports the student cards: completion, best/latest
scores, totals and expandable recent history. No leaderboard or lecturer
analytics dashboard was added.

## Shared client, independence and AI

`student/assets/progress-client.js` owns session gating, completion display,
UUID generation, hint/error/AI counters and retry state. Fetch remains central
in `student/assets/auth.js`. Every game supplies its deterministic native result
at completion and resets the client on replay. Public sessions display scores
locally and do not call the student result API; existing anonymous public
analytics are separate and preserved.

Technical Score is primary; Independence is secondary. Built-in hints and
AI Hints Used are shown separately. Independence uses the central array
`[100,90,80,70,60]` for 0,1,2,3,4+ total hint/help requests, capped at 60.
Hint counts never deduct from technical score. Games without hints/support
record independence 100.

The result is frozen before background save. A pending/saved attempt cannot
resubmit; a network retry uses the same UUID. A failed result remains in memory
until navigation; no sensitive result is put in localStorage. Session expiry
shows password reauthentication for the original account without discarding the
attempt. It does not silently save to another signed-in account.

`ai_requests` counts explicit tutor-opening help requests, not messages inside
the cross-origin chat. `hints_used` is built-in requests plus AI requests.
`highest_scaffold_level` records the highest reliably reported level; the existing
manual embed reports `none` because delivered guidance cannot be observed.
The shared `recordAIRequest(level)` supports a future reliable integration.
Post-completion tutor requests never rewrite the saved attempt. The tutor cannot
set targets, correctness, pass/fail or technical score. No transcript is stored.

## Optional Zapier forwarding and privacy

After D1 commits a NEW completed attempt, `ctx.waitUntil` may forward a copy.
`ZAPIER_RESULTS_WEBHOOK_URL` is the only new optional Worker secret; no real value
was fabricated or written. An absent secret skips forwarding. HTTPS Zapier catch
hooks only; five-second timeout, no redirects and no infinite retry. HTTP/network
failure logs a generic warning and cannot undo the saved result or change the
student's success message.

The payload uses random `user_ref`, UUID, game and educational metrics, insertion
ordinal and timestamp. No name, email, password, username, database user ID or
session/authentication token is forwarded. Error categories are deduplicated;
no pointer logs, raw coordinates, typed answers or transcripts are recorded.
The public tutor ID is an embed identifier, not a result webhook secret.

External setup remains in [ZAPIER-RESULTS.md](ZAPIER-RESULTS.md): create a Zap with
Catch Hook, copy its URL into `wrangler secret put ZAPIER_RESULTS_WEBHOOK_URL`,
complete one test result, map fields to an approved Zapier Table/Google Sheet
(or another approved destination), enable and verify it. No external Zap is
created from repository code. Delivery is best-effort; D1 remains authoritative.

## Verification and deployment status

Verified locally:

- 13 API/SQLite tests pass, including 64→85→91→78 (best 91, latest 78, total 4),
  hints/AI persistence, eight concurrent identical UUID requests, history limit,
  user isolation, expired authentication, malformed/oversized bodies and migration
  of populated legacy tables. Both invalid-hook and simulated HTTP 503 cases save.
- Actual Wrangler local D1 accepted the migration and registered games. Copies
  of the existing TEST accounts were imported locally; none were created remotely.
- All 15 games pass native completion AND restart in public desktop Chrome
  (1280×900) and tracked mobile Chrome (390×844): **30/30**. Tracked completions
  reach the actual local Worker/D1 once; public completions send no student result.
  Native pointer drags, placement clicks, hints, quiz checks and score displays run.
  No uncaught page exceptions or page-width overflow in that matrix.
- Retry/session browser checks pass: frozen payload, duplicate click, same-UUID
  retry, two hints→80 independence, AI requests/highest scaffold, reauthentication,
  and 15-card mobile dashboard with recent history.
- Real Zapier component loaded and manual summary handoff displayed; no chatbot
  message was sent. Gameplay continued after hiding the popup.
- Static generator succeeds: 43 posts in three languages. Structural audit passes
  across 197 HTML files and three search indexes; Git whitespace check passes.

Limits: game matrix uses default scenarios; it is not exhaustive testing of all
movement/language variants. Touch-enabled mobile viewport uses automated pointer
input, not physical-device certification. Safari is untested. External analytics
are stubbed during regressions; tutor smoke testing is separate. AI replies,
inner-chat behaviour and actual result-webhook delivery remain unverified.
No high-stakes or tamper-proof assessment claim is made.

Remote READ-ONLY verification on 9 September: Wrangler lists migration 0001 as
pending; `PRAGMA table_info(game_attempts)` returns only the legacy columns and
reports zero rows written. The standard system is **not deployed** to production.
This handoff contains the safe repository changes and exact deployment sequence.

From `cloudflare/`, after selecting the intended release of this feature branch:

```sh
# Keep the export private; .wrangler is ignored by Git.
mkdir -p .wrangler/backups
node_modules/.bin/wrangler d1 export physio-skills-test --remote --output .wrangler/backups/pre-standard-results.sql
node_modules/.bin/wrangler d1 migrations list physio-skills-test --remote
node_modules/.bin/wrangler d1 migrations apply physio-skills-test --remote
node_modules/.bin/wrangler d1 execute physio-skills-test --remote --file seed-games.sql
node_modules/.bin/wrangler deploy
# Optional, only when the owner has created the Catch Hook:
node_modules/.bin/wrangler secret put ZAPIER_RESULTS_WEBHOOK_URL
```

Publish the corresponding frontend through the repository's normal GitHub Pages
release after the migration and Worker deploy; verify tracked completion/history
on the live URL with authorised TEST accounts. Do not rerun schema creation on
production or apply the migration SQL manually twice. Wrangler tracks applied
files, as described in [Cloudflare's migration documentation](https://developers.cloudflare.com/d1/reference/migrations/).

For local reproduction: initialise a separate `--persist-to` path using schema,
migrations and the existing private test seed, run Wrangler at port 8787 with
`--var ENVIRONMENT:development`, and serve the repository at port 4201. Run:

```sh
npm test --prefix cloudflare
node .codex-review/site-audit.mjs
node tests/results-browser.cjs
node tests/results-retry.cjs
node tests/results-tutor.cjs
```

The browser scripts require Playwright and installed Chrome. Set
`PLAYWRIGHT_MODULE` to an existing bundled Playwright module if it is not locally
installed. They read the ignored TEST001 credential file without printing it and
are hard-coded to the local test hosts. JSON results/screenshots are written only
to the local temporary directory.

## Files and Git diff

The following lists include the interrupted work retained in this review, not
only edits made today. Private credentials, local D1 state and screenshots are
excluded. No changes were committed or pushed.

### Created files

- `cloudflare/migrations/0001_standard_results.sql`
- `cloudflare/src/results.js`
- `cloudflare/test/results.test.mjs`
- `docs/AI-TUTOR-GAME-MAP.md`
- `docs/GAME-SCORING.md`
- `docs/STANDARD-RESULTS-IMPLEMENTATION.md`
- `docs/ZAPIER-RESULTS.md`
- `student/assets/results.css`
- `student/assets/skills-tutor-context.js`
- `student/assets/skills-tutor.css`
- `student/assets/zapier-skills-tutor.js`
- `tests/results-browser.cjs`
- `tests/results-retry.cjs`
- `tests/results-tutor.cjs`

### Modified files

- `ai-literacy-check.html`
- `ai-literacy-check.js`
- `ankle-goniometry/game.js`
- `ankle-goniometry/index.html`
- `ankle-goniometry/style.css`
- `assets/js/takwing-mascot.js`
- `cardiorespiratory/anterior-auscultation/index.html`
- `cardiorespiratory/assets/common.js`
- `cardiorespiratory/breath-sounds/game.js`
- `cardiorespiratory/breath-sounds/index.html`
- `cardiorespiratory/chest-expansion/game.js`
- `cardiorespiratory/chest-expansion/index.html`
- `cardiorespiratory/chest-percussion/index.html`
- `cardiorespiratory/posterior-auscultation/index.html`
- `clinical-readiness-lab.html`
- `clinical-readiness-lab.js`
- `cloudflare/README.md`
- `cloudflare/package.json`
- `cloudflare/seed-games.sql`
- `cloudflare/src/index.js`
- `cloudflare/test/worker.test.mjs`
- `elbow-goniometry/game.js`
- `elbow-goniometry/index.html`
- `elbow-goniometry/style.css`
- `generate-site.mjs`
- `hip-goniometry/game.js`
- `hip-goniometry/index.html`
- `hip-goniometry/style.css`
- `knee-goniometry/game.js`
- `knee-goniometry/index.html`
- `knee-goniometry/style.css`
- `reasoning-runner.html`
- `reasoning-runner.js`
- `shoulder-goniometry/game.js`
- `shoulder-goniometry/index.html`
- `shoulder-goniometry/style.css`
- `shoulder-rotation-goniometry/game.js`
- `shoulder-rotation-goniometry/index.html`
- `shoulder-rotation-goniometry/style.css`
- `student/assets/auth.js`
- `student/assets/dashboard.js`
- `student/assets/progress-client.js`
- `student/dashboard/index.html`
- `student/login/index.html`
- `typing-test/game.js`
- `typing-test/index.html`
- `zh-hans/ai-literacy-check.html`
- `zh-hans/clinical-readiness-lab.html`
- `zh-hans/reasoning-runner.html`
- `zh-hant/ai-literacy-check.html`
- `zh-hant/clinical-readiness-lab.html`
- `zh-hant/reasoning-runner.html`

### Diff summary

52 files changed, 581 insertions(+), 128 deletions(-). This tracked-file summary excludes 14 new untracked files listed above.
