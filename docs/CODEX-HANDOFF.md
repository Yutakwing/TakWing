# Codex Website Handoff

## Last completed phase

Phase 6 — Mobility & Assistive Devices Foundation.

Phase 7 — AI Tutor Context Bridge Investigation is **partially completed, pending the real Zapier action test and return-path verification**. Do not advance to another phase.

## Completed

- Read the handoff, game map, Zapier results and scoring documents; inspected the existing tutor, adapters, progress client and Worker result integration.
- Verified official support for Generate Reply to Message with Conversation Key and contextual User Message. This is a supported workflow direction, not proof of automatic embedded context transfer.
- Inspected the existing chatbot directive without changing it; created an OFF draft test using the real action for the existing chatbot.
- Prepared the exact synthetic Elbow stationary-arm / attempt 2 / incorrect / stationary-arm-angle-error / hints 0 scenario and “I'm stuck.” question. Reached the action Test tab; no reply test run yet.
- Removed existing Shadow DOM reads, iframe mutations and undocumented vendor readiness-event handling from the site-owned wrapper. Preserved Zapier, manual copy/paste, tracked authentication gates and game scoring.
- Clarified that students should paste the current attempt with their question.
- Documented official mechanisms, distinctions, account draft, unresolved return transport and privacy requirements in the game map.

## Files changed

- `student/assets/zapier-skills-tutor.js`
- `docs/AI-TUTOR-GAME-MAP.md`
- `docs/CODEX-HANDOFF.md`

## Files created

- `tests/tutor-handoff.cjs`

## Tests performed

- `node --check student/assets/zapier-skills-tutor.js` passed.
- `tests/tutor-handoff.cjs` passed at 390px and 1440px: closed component stub, allowlisted context, attempt 2/hints 0, unchanged context score, panel mounting, Escape/focus, offline and logout.
- Tests use simulated local authentication and no third-party request, real student record or AI response. They do not establish end-to-end delivery or clinical correctness.
- Reviewed scoped diff, `git diff --check` and status before commit. No game rubric, Worker, SQL, authentication or generated-page changes.

## Known issues

- **LIVE TEST PENDING**: Mac locked; computer-use tool requires manual unlock. Draft action configured but Test step not run. No response has been observed.
- **AUTOMATIC BRIDGE NOT DEPLOYED**: website still uses manual copy/paste. Supported action exists, but trigger, secure return path and account entitlement remain unverified.
- Draft shows a Pro-feature notice. No upgrade or billing commitment made.
- Catch Hook's HTTP acknowledgement is not the chatbot reply. Never implement a fake synchronous response based on it.
- Removing iframe mutation means its internal title/referrer policy is vendor-owned; the wrapper labels only its own host/region. Real vendor accessibility was not re-certified.
- This partial Phase 7 work is local; no release push or Pages verification performed for it.

## Requires Tak Wing review

- Unlock the Mac to resume the prepared synthetic action test.
- Review the actual response when available; clinical accuracy cannot be claimed before lecturer review.
- Any new credentials/security grants or paid plan change needed by a chosen backend route require an explicit decision. None has been performed.

## Next phase

Phase 7 — AI Tutor Context Bridge Investigation (resume pending verification).

No Phase 8 brief is supplied. Do not build patient simulation or Mobility games.

## Important implementation notes

- Release checkout: `/Users/takwingyu/GPT Codex/blog-ii-release`; baseline `124c921`; branch name remains `phase-3/media-showcase`.
- Original checkout `/Users/takwingyu/GPT Codex/personal-blog` contains unrelated drafts. Apply only scoped Phase 7 changes; never publish the whole working tree.
- Zap draft: `https://zapier.com/editor/380568982/draft`; action `380568983`; test tab `/draft/380568983/sample`. Title remains “Have the Chatbot respond to anything”. OFF, unconfigured trigger and return action.
- Test Conversation Key: `phase7-elbow-poc-20260918-a`, a synthetic label. No identity, auth/session token, IP application field or pointer coordinates in the test message.
- Existing public embed ID `cmtrz8z1a001ugi3l4hffj3yi` differs from chatbot editor ID `cmtrz8xdi03jm0n7rcjtzaxxl`; do not interchange them.
- Do not reuse `ZAPIER_RESULTS_WEBHOOK_URL` for tutoring; completed results and tutor context are separate flows.
- Preserve all preceding phases, latest video `kfZ93HG7FNs`, multilingual routes, manual fallback and deterministic scores. No automatic context is claimed by UI.
