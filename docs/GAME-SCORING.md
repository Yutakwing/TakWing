# Game Scoring and Inventory

All scores are deterministic formative practice scores, not validated clinical
competency measurements. The browser calculates the score; the authenticated API
validates and stores it. Browser calculations are not tamper-proof.

## Common Policy

The result client records 0-100 `technical_score`. Hints and AI requests never
deduct from that score. Secondary independence uses `[100,90,80,70,60]` for
0,1,2,3,4+ help requests. Change `independencePolicy` in
`student/assets/progress-client.js` to revise this policy. This policy itself
is formative and has no asserted educational validation.

`hints_used` is built-in hint clicks plus AI help requests before completion.
`ai_requests` is the subset of explicit tutor-opening requests, not a count of
messages or responses inside the cross-origin chat. Thus built-in hints can be
derived as `hints_used - ai_requests`. A blocked tutor still counts as a request,
not proof of delivered guidance. The highest scaffold remains `none` unless a
reliable integration explicitly calls `recordAIRequest(level)`. No transcript is
read or stored. Asking for a post-completion summary does not rewrite the result.

AI Hints Used on the result card means observable AI help requests, not confirmed
delivered hints or message counts. Built-in hints are displayed separately.

Each run stores a deduplicated set of game-evaluated errors (maximum 32), duration
from native activity timers, and attempts from the native game. The quiz starts on its first activity interaction; the runner and readiness lab
start when the student presses Start.
Goniometry and cardio timers retain their current first-action behaviour.
Reset removes the previous saved/public result card and starts a new attempt; failed saves remain in memory with independent retry
buttons. Refresh/navigation discards an unsaved in-memory result, so retry before
leaving. A saved attempt cannot be submitted twice with the same UUID.

## Goniometry

Each game below has three stages: axis, stationary arm, moving arm. On accepted
placement the existing rubric awards `max(20, round(40 - distance * 0.6))`
for the axis, and `max(20, round(40 - angularError * 2))` for each arm.
The native maximum is 120. The stored score is `round(native / 120 * 100)`.
Errors do not award points; successful completion requires all three stages.
Existing acceptance tolerances and landmarks are unchanged.

| Game ID | Game | Maximum | Hints | AI Tutor | Scoring change |
| --- | --- | --- | --- | --- | --- |
| elbow-goniometry | Elbow | 100 | Yes | Yes | Existing normalisation retained |
| ankle-goniometry | Ankle | 100 | Yes | Yes | Existing normalisation retained |
| shoulder-goniometry | Shoulder flexion/extension | 100 | Yes | Yes | Existing normalisation retained |
| shoulder-rotation-goniometry | Shoulder rotation | 100 | Yes | Yes | Existing normalisation retained |
| hip-goniometry | Hip flexion/extension | 100 | Yes | Yes | Existing normalisation retained |
| knee-goniometry | Knee flexion only | 100 | Yes | Yes | Existing normalisation retained |

Native 120-point displays remain part of the public games; every completion
also displays the standard technical score. Common errors are axis-placement-error,
stationary-arm-angle-error and moving-arm-angle-error. Distances/coordinates are
not sent to D1.

## Cardiorespiratory

| Game ID | Completion | Maximum | Existing deterministic rubric | Hints / tutor |
| --- | --- | --- | --- | --- |
| cardio-auscultation-anterior | All 8 paired sites accepted | 100 | max(60, 100 - 6 * (attempts - 8)) | Both |
| cardio-auscultation-posterior | All 6 paired sites accepted | 100 | max(60, 100 - 6 * (attempts - 6)) | Both |
| cardio-chest-percussion | All 6 paired sites accepted | 100 | max(60, 100 - 6 * (attempts - 6)) | Both |
| cardio-chest-expansion | All 5 placement/readings/calculation stages accepted | 100 | max(60, 100 - 6 * (attempts - 5)) | Both |
| cardio-breath-sounds | Identify all 5 sounds and view results | 100 | Sum max(8, 20 - 4 * (roundAttempts - 1)) | Both |

Both sides are accepted at the start of each paired level; the second must be
the matching opposite site. Existing bone-zone checks remain authoritative.
Errors cover wrong-comparison-sequence, wrong-level, too-medial, too-lateral,
over-scapula, over-spine, tape alignment, readings, calculation and sound
classification. No removed respiratory-rate game has been recreated.

Breath sounds previously subtracted two marks per hinted round. Its public score
is preserved; a separate accumulator omits that hint deduction for standard
technical results. LECTURER REVIEW REQUIRED for this explicit rubric adjustment
and for interpreting the existing minimum-score floors (60 and 8).

## AI and Digital Literacy

| Game ID | Completion | Score / maximum | Hints / tutor | Review |
| --- | --- | --- | --- | --- |
| typing-speed | Native 60-second test ends | Accuracy / 100 as secondary platform metric; WPM and native performance retained in metrics | Neither | Accuracy is not clinical competence |
| ai-literacy-check | All 15 answers submitted | round(correct / 15 * 100), maximum 100 | Neither | Existing answer-key rubric retained |

Typing retains `wpm`, `accuracy`, `native_score`; no new arbitrary WPM-to-clinical
score conversion is introduced. Quiz roles and age groups are not in the API
payload. Public local summaries are unchanged. Reset is required to save a new
quiz attempt; repeated submission does not create extra result rows.

## Clinical Reasoning Experiences

LECTURER REVIEW REQUIRED: these are explicitly draft new platform rubrics.
Original public gameplay and arcade displays are unchanged; no pass/fail claim.

| Game ID | Completion | Draft technical rubric / maximum | Hints / tutor |
| --- | --- | --- | --- |
| reasoning-runner | Run ends | round(100 * correct questions / answered questions), or 0 if no question answered; maximum 100 | Neither |
| clinical-readiness-lab | Three station badges acquired and completion gate opened | round(300 / max(3, answer attempts)); maximum 100 | Neither |

Runner completion means a run ended, not mastery or success at every obstacle.
The platform score describes only answered-question accuracy, not survival time.
Readiness scores describe retries across three station checks. Reading station
dialogue is core instruction, not a hint penalty. Incorrect answers are recorded
as categories, never answer text or a transcript.

## Adding a Game

Register its ID/path/category in `cloudflare/seed-games.sql`, load auth and progress
scripts before the game, call `submitCompletion` at native completion and
`resetCompletion` on replay. Pass a 0-100 score (or explicit `technical_score`),
attempts, optional native duration and only allowlisted numeric metrics. Call
`recordFeedback(id, {result:'incorrect',error_type:'your-error-code'})` for errors.
Do not send user identity. Add a rubric here and test public/tracked completion.
Call `startActivity()` when a game starts automatically after its Start button.
Tutor support is independent: add its context adapter only when appropriate.

Typing errors use `incorrect-typed-word`; typed text is never sent.
