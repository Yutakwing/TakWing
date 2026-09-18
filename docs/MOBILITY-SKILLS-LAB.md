# Mobility & Assistive Devices Lab

Phase 6 foundation only. No Mobility game, clinical answer key or scoring rubric is implemented. Crutch Fitting must wait for a separate phase and verified content.

## Proposed games

All are **In development**, with non-interactive cards on `mobility.html` and its language routes. The central Skills Lab links to this development overview, not to a game.

| Proposed activity | Clinical configuration to verify |
| --- | --- |
| Crutch Fitting | Axillary clearance, crutch height, handgrip position |
| Crutch Walking Sequence | Gait pattern and applicable conditions |
| Stairs with Crutches | Stair sequence and applicable conditions |
| Walking Stick / Cane | Cane side and applicable conditions |
| Walking Frame | Frame sequence and applicable conditions |
| Mobility Safety | Safety rules and applicability |

Names and proposed IDs live in `mobility-lab-content.mjs`. IDs are reserved only in this local catalogue: none is registered in SQL or the student dashboard. Do not add play URLs or enable a card before the activity actually exists and is approved.

## Reuse found in existing code

| Concern | Existing implementation inspected | Future Mobility interface |
| --- | --- | --- |
| Game stage and attempt | `elbow-goniometry/game.js`, `cardiorespiratory/assets/common.js` | Keep explicit per-game stage, attempts and start time. Increment attempts on a Check/submit action, not pointer movement. Goniometry's three stages and Cardio's point arrays are domain-specific; do not copy their clinical targets or stage counts. |
| Scoring | Native completion branches; `docs/GAME-SCORING.md` | Game evaluator owns the lecturer-approved rubric. Existing progress client accepts a technical score on the platform's 0–100 scale; it does not validate clinical correctness. No Mobility weights, floors, thresholds or pass/fail claims defined. |
| Result and tracked mode | `student/assets/progress-client.js`, `student/assets/auth.js` | Reuse the existing completion/save/authentication path; do not duplicate fetch, UUID, retry or session logic. Public results remain local. Tracked mode remains `tracked=1` with the existing authenticated gate. |
| Hints | Progress client's delegated click listener | Use `#hint-button` or `[data-hint]` for enabled built-in hints. Do not manually count the same click again. Reuse existing independence/help policy; help does not reduce technical score. |
| Restart | Native games call `resetCompletion()` | Clear native state, timers and visual feedback; call existing reset once. It resets tutor context and preserves failed-save cards with frozen retry payloads. Do not erase or recompute pending attempts. |
| AI context | `student/assets/skills-tutor-context.js`, `student/assets/zapier-skills-tutor.js` | Add an adapter only after a real game's evaluated stages/errors exist. Tutor explains the game's result; it must not decide correctness or score. |
| Accessibility | Native buttons/live feedback in goniometry and Cardio | Reuse semantic controls and polite status feedback. Existing pointer games are not a complete accessibility template: new interactions need keyboard alternatives, visible focus, labelled controls, no colour-only feedback, reduced motion and mobile checks. |

A new generic engine would duplicate working infrastructure and prematurely assume that placement, sequencing and safety activities share a clinical evaluator. The documented interface below is the reuse boundary; no `assistive-device-engine.js` is needed now.

## Future game adapter contract

This is a design contract for a later implemented game, not an active integration on the foundation page.

1. Load existing auth and progress scripts in the same order as a working game. Reuse its tracked-session markup and await the existing session gate; do not invent another login flow.
2. Maintain native state locally: stage ID, attempt count, start time, learner action, evaluated feedback and completion flag. Clinical targets and evaluator inputs must come from reviewed configuration.
3. Call `PhysioSkillsProgress.startActivity()` when a start action begins the activity; retain the native elapsed-time convention. Run a deterministic, reviewed evaluator when the learner checks an answer.
4. Send evaluated feedback via `recordFeedback(gameId, feedback)`. A stable `error_type` reports an observed game error, not a diagnosis. Record once per check. Never send raw patient information or a whole native state object.
5. Only after the reviewed completion condition is met, call `submitCompletion({game_id, technical_score, attempts, duration_seconds})`. Optional metrics must be in the existing backend allowlist. Do not submit an unfinished/null rubric or fabricate a score merely to obtain a result card.
6. Let the progress client create the immutable standard payload, calculate independence, present results and perform tracked retries. Use its reset interface on replay. New game registration, next-activity sequencing and tutor enablement belong to the later implementation phase.

The current standard result includes `attempt_uuid`, `game_id`, `technical_score`, `independence_score`, `completed`, `attempts_in_game`, `hints_used`, `ai_used`, `ai_requests`, `highest_scaffold_level`, `duration_seconds`, `error_summary` and optional `metrics`. The Worker validates allowed fields; IDs/identities are not supplied by learner data. Existing metric keys are `wpm`, `accuracy`, `native_score`, `native_maximum`; do not repurpose them for clinical measurements or case strings.

## AI context fields

Current tutor context explicitly accepts `game_id`, `game_title`, `category`, `stage`, `attempt`, `result`, `error_type`, `error_magnitude`, `error_unit`, `hints_used`, `previous_errors`, `current_score`, `total_attempts`, `completion_state`. Only include magnitude/units if the game has a validated basis; diagram units must not be presented as physical measurements.

Titles/IDs come from authored configuration. Do not include names, identifiers, credentials, transcripts, raw coordinates or patient records. Reuse existing tracked authentication and manual Copy current attempt / paste workflow. Context is not automatically injected into the vendor chat. The foundation page does not load the Skills Tutor or create tutor requests.

The existing tutor's field allowlist does **not** include case fields. Do not claim they are currently forwarded. A later, separately tested case-aware adapter may map approved fictional case tokens to local context; it must not bypass the allowlist or automatically transmit them.

## Editable clinical configuration

Edit `mobility/clinical-config.json`. Each named clinical item currently has `value: null`, `units: null`, `applicability: null` and empty provenance fields, explicitly marked **LECTURER VERIFICATION REQUIRED**. Scoring rubric, completion criteria, tolerances and weights are also null and require verification. Null means unavailable, never zero or a permissive default.

For each future value the lecturer must supply the intended device/activity, applicable population/conditions, source/protocol and units if relevant, then record reviewer/date and an explicit verification decision. Clarify any exception rather than silently supplying a general rule. The configuration contains no clinical numbers or answer sequences.

Before a future activity becomes playable, its implementation must refuse to start if any required field or rubric is null, unverified or internally inconsistent. Add tests for that gate in the game phase. **Changing this JSON alone does not unlock anything**: no engine consumes it, and all six catalogue entries remain In development. This phase makes no claim that values have been verified.

## Optional future case integration

`mobility/case-context.mjs` provides only `readCaseContext(URLSearchParams)`:

```js
import { readCaseContext } from './case-context.mjs';
const caseContext = readCaseContext(new URLSearchParams(location.search));
// Missing optional fields produce {}. Standalone play must remain supported.
```

Optional `case_id`, `phase`, `task_id` are opaque author-assigned tokens, not clinical instructions, patient data or permission to alter a rubric. No field depends on another being present. The helper returns a frozen object with only present valid tokens; unknown keys, duplicates, blank values, unsafe characters and tokens over 64 characters are ignored. `phase` is a future case/workflow token, not a gait-phase label.

The helper has no network/storage/UI side effects and is **not loaded by the development overview**. It neither enables a game nor changes tracked mode. A later game may keep the returned context beside its native run state; standalone use calls it without parameters and receives `{}`.

Do not append these fields to `submitCompletion`, `metrics` or the current API. `cloudflare/src/results.js` rejects unknown top-level fields and non-allowlisted metrics; the present progress client constructs its own explicit result payload. Persisting case associations requires a separately authorised API/schema design and tests. Do not add a patient record, case runner, automatic progression or cross-page context propagation in this phase.

## Release boundaries

Public overview and search metadata only; no SQL registration, Worker deployment, authentication/scoring/tutor changes or saved attempts. All three language routes remain available; new English copy is marked **TRANSLATION REQUIRED** on Chinese pages. Next implementation requires a separate user phase and verified clinical content.
