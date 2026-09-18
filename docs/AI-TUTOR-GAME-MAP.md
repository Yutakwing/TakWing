# AI Skills Tutor: game map

Updated 18 September 2026. The existing tutor is retained alongside the standard result system. Native game rubrics are documented in GAME-SCORING.md. AI requests never alter technical scores.

## Zapier Skills Tutor

- Chatbot ID: `cmtrz8z1a001ugi3l4hffj3yi`
- Embed: official `zapier-interfaces-chatbot-embed` in inline mode, hosted in a responsive site-owned panel.
- Loader and UI: `student/assets/zapier-skills-tutor.js`.
- Config and adapters: `student/assets/skills-tutor-context.js`.
- Layout: `student/assets/skills-tutor.css`.
- Tutor context is kept in memory. The result client stores only deduplicated error categories and aggregate hint/AI usage in D1, never the tutor summary or transcript.

The helper requires `?tracked=1`, an enabled route in `SKILLS_TUTOR_GAMES`, and the existing progress client's successful `/api/me` response. `whenAuthenticated()` exposes only a boolean; it never passes the user object to the tutor. Public pages return before tutor initialisation. The vendor script loads only after the authenticated student requests the tutor, once per document. Repeated clicks are debounced. Sessions are checked again on request and window focus; logout/401 clears the UI. A failed session check never loads the vendor.

The general portfolio mascot exits early on student paths and tracked pages. The student dashboard itself has no general mascot or Skills Tutor popup.

## Context bridge: manual paste, not live injection

**The live site still uses manual paste. A supported Zap workflow action exists, but the complete game-to-response bridge has not been verified or deployed.**

Ask AI Tutor mounts the official inline embed in the site-owned panel. Copy current attempt copies the latest allowlisted summary; the student pastes it with their question. Checking a step updates local context only. Nothing is automatically submitted. Loading the component does not prove that the model received context.

The wrapper no longer reads Shadow DOM, modifies the vendor iframe or observes undocumented readiness messages. It labels its own host/region and controls close/Escape itself. The vendor owns the internal iframe's title and policies. Script failure/offline preserves built-in feedback. No game action waits for AI.

## Phase 7 investigation — 18 September 2026

| Official mechanism | Verified scope | Decision |
| --- | --- | --- |
| [Generate Reply to Message](https://help.zapier.com/hc/en-us/articles/31471114927501-Connect-your-chatbot-to-messaging-apps-through-Zap-workflows) | A Zap action accepts Chatbot, Conversation Key and User Message; contextual instructions can accompany the question. A separate action returns the reply to the originating channel. The real action is present for the existing bot in the account. | Supported candidate for a backend workflow; not a live embed injection API. |
| [Omnichannel chatbot](https://help.zapier.com/hc/en-us/articles/32884563609357-How-to-build-an-omnichannel-chatbot) | A chatbot can serve multiple channels through workflows. | Supports the workflow direction; does not establish a website response transport. |
| [Share and embed](https://help.zapier.com/hc/en-us/articles/21958023866381-Share-and-embed-a-chatbot) | Inline script/iframe embedding; tracked parameters concern conversion attribution. | Retain supported embed. No documented live set-context/send-message host method found. |
| [URL parameters](https://help.zapier.com/hc/en-us/articles/21961587870221-Use-URL-parameters-with-directives-and-greetings) | Authored directive/greeting parameters for standalone chatbots. | Not evidence of continuous embedded context transfer; no game state placed in URLs. |
| [Catch Hook](https://help.zapier.com/hc/en-us/articles/8496288690317-Trigger-Zap-workflows-from-webhooks) | Workflow trigger; its immediate HTTP response cannot be customised into the model reply. | A 200 acknowledgement must never be displayed as an AI response. Needs a separate verified return channel. |
| [Zapier SDK](https://docs.zapier.com/sdk/quickstart) and [reference](https://docs.zapier.com/sdk/reference) | Documented authenticated action execution route; requires credentials and actual discovered action schema. | Not provisioned/tested. No guessed action parameters or credentials added. |

### Account proof of concept: prepared, response test pending

An unpublished, OFF draft was created using the existing chatbot's Integrations → Build from Scratch flow: [Have the Chatbot respond to anything](https://zapier.com/editor/380568982/draft). Its Generate Reply to Message action is configured with **Github - IO Tutor Chat Bot**. The existing bot directive was read and left unchanged; it already tells the tutor to use game-evaluated feedback, provide progressive scaffolding and avoid re-scoring or claiming to see the screen.

Conversation Key: `phase7-elbow-poc-20260918-a` (synthetic test label, not a student/session/auth identifier).

User Message contains the following synthetic context and question, with instructions to use the evaluated result and provide a concise attempt-2 hint:

```json
{"game_id":"elbow-goniometry","stage":"stationary-arm","attempt":2,"result":"incorrect","error_type":"stationary-arm-angle-error","hints_used":0}
```

Student question: **I'm stuck.**

The editor reached the action Test tab. **Test step has not been run and no reply has been observed.** The Mac locked before the pending test could run. The draft has no configured trigger or return action and shows a Pro-feature notice; workflow entitlement must be checked before activation. No plan was upgraded, credential created or workflow published. Do not call this an end-to-end PoC success.

### What would enable automatic transfer

1. Run the prepared action test; verify the actual reply addresses the stationary-arm error at attempt 2 and record the observed output. Clinical accuracy still requires lecturer review.
2. Verify account entitlement and choose a supported backend route: authenticated SDK action execution with discovered schema, or Catch Hook → chatbot action → authenticated reply callback/polling. Verify the entire return path before adding game UI.
3. Keep secrets server-side. Use an unrelated, random conversation correlation key; never a name, email, student number, D1 ID, auth/session token, IP application field or pointer coordinates. Do not reuse the completed-result webhook (its pseudonymous record is a different data flow).
4. For Elbow only, submit an explicit allowlist of structured game context plus the question, with bounded input, rate limits, timeout and manual fallback. Render replies as text. Snapshot hints before recording this request if the test requires `hints_used: 0`.
5. Verify real context-specific output, isolation, failures and unchanged deterministic score. AI output must have no score-write pathway. Do not expand to other games until that single-game bridge is verified.

There is no tutor request/reply endpoint in the current Worker. This phase does not fabricate one, repurpose D1 results, or treat action availability as proof of delivery to the browser.

## Context and adapters

Fields: `game_id`, `game_title`, `category`, `stage`, `attempt` (checks at the current stage), `result`, `error_type`, `error_magnitude`, `error_unit`, `hints_used`, `previous_errors` (last 12), `current_score` (native game scale), `total_attempts`, `completion_state`.

Only explicit fields are retained. Identifiers/titles come from configuration, not student input. No names, emails, student numbers, tokens, user IDs, raw coordinates or whole state objects enter the summary. Numeric error magnitudes include units; screen distances are diagram units, not clinical millimetres. Reset clears counters and error history. Built-in hint clicks and accepted AI requests increment the tutor-only hint counter.

All enabled IDs have an adapter entry at `SkillsTutorAdapters[game_id]`. Goniometry entries share a small measurement adapter; each game supplies its own target and pre/post evaluation state. The adapter detects the game's awarded score, rather than re-evaluating tolerance. Paired Cardio adapters receive the result of the existing Check branch. Chest expansion and breath sounds supply their own explicit evaluated results. No pointer-move handler updates tutor context.

| Game | ID | Tutor | Stages | Error types | Zapier context | Lecturer verification |
| --- | --- | --- | --- | --- | --- | --- |
| Elbow | elbow-goniometry | Enabled | Axis, stationary arm, moving arm, complete | axis-placement-error; stationary-arm-angle-error; moving-arm-angle-error | Manual paste | Confirm lateral epicondyle, acromion and radial styloid references |
| Ankle | ankle-goniometry | Enabled | Axis, stationary arm, moving arm, complete | Same goniometry taxonomy | Manual paste | Confirm lateral malleolus, fibular head and fifth metatarsal references |
| Shoulder | shoulder-goniometry | Enabled | Axis, stationary arm, moving arm, complete | Same goniometry taxonomy | Manual paste | Confirm standing flexion/extension and local reference protocol |
| Shoulder rotation | shoulder-rotation-goniometry | Enabled | Axis, stationary arm, moving arm, complete | Same goniometry taxonomy | Manual paste | Confirm supine position and local rotation protocol |
| Hip | hip-goniometry | Enabled | Axis, stationary arm, moving arm, complete | Same goniometry taxonomy | Manual paste | Confirm flexion/extension positions and pelvic stabilisation |
| Knee | knee-goniometry | Enabled | Axis, stationary arm, moving arm, complete | Same goniometry taxonomy | Manual paste | Flexion only; confirm femoral epicondyle alignment |
| Anterior auscultation | cardio-auscultation-anterior | Enabled | Four pairs, first/opposite side, complete | wrong-comparison-sequence; wrong-level; too-medial; too-lateral | Manual paste | Confirm paired zones and tolerances |
| Posterior auscultation | cardio-auscultation-posterior | Enabled | Paired sites, first/opposite side, complete | wrong-comparison-sequence; wrong-level; too-medial; too-lateral | Manual paste | Confirm taught posterior sequence |
| Chest expansion | cardio-chest-expansion | Enabled | Tape level; centre; expiration; inspiration; subtraction; complete | tape-too-high; tape-too-low; asymmetrical-placement; incorrect-expiration-reading; incorrect-inspiration-reading; incorrect-calculation | Manual paste | Confirm taught level and measurement units |
| Chest percussion | cardio-chest-percussion | Enabled | Three pairs, first/opposite side, complete | over-scapula; over-spine; wrong-comparison-sequence; wrong-level; too-medial; too-lateral | Manual paste | Confirm bone exclusion zones |
| Breath sounds | cardio-breath-sounds | Enabled | Five sound classifications, complete | listen-first; classification-not-selected; incorrect-sound-classification | Manual paste | Synthesised representative sounds, not recordings for diagnosis |
| Typing Speed | typing-speed | Disabled | Timed typing | Not applicable | None | No clinical tutoring need; preserve existing tracked score |

Directional anatomical labels such as proximal/distal are not inferred from screen axes: positions differ between activities. Axis placement errors remain landmark-alignment errors until a lecturer verifies directional mapping. Tape tilt/asymmetrical endpoint errors are not invented: the current tape is a single rigid horizontal line. Only its centre can be misaligned. Posterior bone errors are not claimed where the existing game has no bone rejection branch.

Other public educational activities found: Reasoning Runner, AI Literacy Check and Clinical Readiness Lab. They now have registered IDs and standard result tracking, but no embedded tutor. Public play remains available. The retired Respiratory Rate/Breathing Pattern activity remains removed and inactive; it has not been recreated.

## Privacy and lecturer setup

The public chatbot ID is not a secret. No API key, credentials, authentication headers, IP field or identity is passed by this integration. Context is not put into URLs, referrers or vendor attributes. The helper never inserts model output into the page. However, loading any third-party service exposes ordinary network metadata such as the browser's IP address to that service; this is not anonymity. The remote script is trusted third-party code executing on the page. Institutional approval and Zapier retention/privacy settings should be reviewed before student use.

The existing directive was inspected in the authenticated editor during Phase 7; the embed alone does not expose its configuration. The owner should explicitly tell the chatbot to wait for a pasted game summary, not claim to see the screen or to have received live state, and never re-score. Confirm allowed domains include the intended GitHub domain and any approved local preview host. Popup embedding also depends on the account's supported plan. A disabled draft test workflow was created as described above; the existing chatbot and live integration were not changed.

## Verification

Current scoring verification is recorded in STANDARD-RESULTS-IMPLEMENTATION.md.
All 15 activities pass native completion and restart in desktop public and mobile
tracked Chrome, backed by isolated local D1 and copies of existing TEST accounts.
The real vendor component loads from the local tracked game and displays the
manual-handoff instructions. No chat message was submitted. Inner conversation
opening, AI replies and response quality remain unverified. Cross-origin messages
and delivered scaffold levels are not counted; AI requests mean explicit help
requests. Safari has not been separately tested. The new tutor panel is English.

## Appearance update — 11 September 2026

The former vendor popup is replaced by an inline embed within a rounded, fixed
panel capped at 420px wide and 720px high, with viewport and safe-area bounds.
The site owns its title, close button, copy action and explicit manual-context
instruction. There is no white popup surround or second floating launcher.
Hide/reopen preserves the mounted conversation; Escape returns focus to Ask.
Zapier still owns the chat's internal branding, typography and colour settings.
Inline embeds do not require the vendor's popup-only readiness messages.

Verified the real inline conversation input at 390px and 1280px, panel bounds,
close/reopen without duplicate embeds, and Escape. Login was simulated locally;
no student data or chat message was sent in these layout checks. An earlier live
logged-in ankle test received relevant formative feedback and left the game score
unchanged. This update does not add automatic context transfer.

## Phase 7 local regression verification

`tests/tutor-handoff.cjs` passed at 390px and 1440px using a local component stub with closed Shadow DOM and simulated authentication. It checks the context allowlist, exact attempt-2 state before opening, unchanged context score, mounting, Escape focus return, offline fallback and logout removal. No external requests, real student records or AI replies are used by this test. It does not certify vendor internals, clinical feedback or end-to-end delivery.
