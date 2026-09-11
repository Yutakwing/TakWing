# AI Skills Tutor: game map

Updated 11 September 2026. The existing tutor is retained alongside the standard result system. Native game rubrics are documented in GAME-SCORING.md. AI requests never alter technical scores.

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

Reviewed official sources:

- [Share and embed a chatbot](https://help.zapier.com/hc/en-us/articles/21958023866381-Share-and-embed-a-chatbot)
- [URL parameters in directives and greetings](https://help.zapier.com/hc/en-us/articles/21961587870221-Use-URL-parameters-with-directives-and-greetings)
- [Official component loader](https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js)

The URL-parameter documentation applies to standalone chatbots. Inspection of the current popup component exposes attributes such as `chatbot-id`, `is-popup`, `style-override` and `tracked-params`. It does not expose a public send-message, set-context or popup-open method. Its internal `isOpen` is component state, not a supported host method. Its dataset-to-URL implementation does not establish a supported live directive update mechanism; it is deliberately not used to reload conversations or inject state. Tracked parameters describe conversion tracking, not a verified live tutoring channel.

**Ask AI Tutor opens a site-owned conversation panel but does not automatically submit context.** It loads the official inline embed using its public width, height and style-override attributes. The student chooses **Copy current attempt** in the panel and pastes the summary into the chat. The UI explicitly says that nothing was sent automatically. Each Check updates the local summary, not an existing Zapier conversation. This limitation is intentional, not a simulated connection.

No custom `postMessage` commands are sent. The helper observes the vendor's `zChatbotReady`, `zChatbotOpened` and `zChatbotClosed` notifications only when both `event.source` and `event.origin` match its own iframe. These are readiness/focus notifications, not an AI-response or context acknowledgement. No cross-origin document access is used in application code. Readiness does not prove that the model has received a summary.

The observed redirect origin for the supplied chatbot is `https://github-io-tutor-chat-bot.zapier.app`. Readiness messages may use that exact origin rather than the initial `interfaces.zapier.com` origin, so the helper accepts either for the same iframe source. If the chatbot's domain changes, verify the new origin before updating `CHAT_ORIGIN`; do not replace the allowlist with a wildcard.

Students can hide the embed using **Hide tutor popup** and return to gameplay. Slow/blocked scripts, missing component definition and offline states display the built-in-feedback fallback. No game action waits for the tutor.

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

The supplied prompt/directive is assumed to be configured in Zapier; it cannot be verified from the embed. The owner should explicitly tell the chatbot to wait for a pasted game summary, not claim to see the screen or to have received live state, and never re-score. Confirm allowed domains include the intended GitHub domain and any approved local preview host. Popup embedding also depends on the account's supported plan. No changes to the Zapier account were made.

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
