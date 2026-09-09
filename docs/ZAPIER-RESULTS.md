# Optional Result Forwarding

D1 is authoritative. The Skills Tutor chatbot and result forwarding are separate.
No webhook is configured or created by this repository update.

1. Create a Zap and choose Webhooks by Zapier, Catch Hook.
2. Copy the generated hook URL; check that your account supports this trigger.
3. From `cloudflare/`, run `node_modules/.bin/wrangler secret put ZAPIER_RESULTS_WEBHOOK_URL`.
4. Paste the URL only into Wrangler's secret prompt, never a source file or browser.
5. Complete one authorised test attempt and verify the received record in the Zap.
6. Map fields into an approved Zapier Table, Google Sheet or other destination.
7. Enable the Zap and confirm one new attempt creates one downstream row.

The Worker accepts HTTPS `hooks.zapier.com/hooks/catch/` destinations only. It sends
a random persistent pseudonymous `user_ref`, attempt UUID, game ID, technical and
independence scores, attempt count, hints/AI counts, scaffold, duration, errors,
limited numeric metrics and completion timestamp. No username, email, password
or session token is forwarded. Pseudonymous records can still be personal data;
obtain the relevant consent/approval before external forwarding or research use.

Only new completed rows are forwarded, after the D1 transaction, using Worker
`waitUntil`. The request times out after five seconds; redirects are not followed.
Failure emits a generic warning and does not roll back D1 or change the student
save confirmation. There is no unbounded retry/outbox in this version, so external
copies may be missing after a failure; reconcile against D1, not the other way round.

Absent secret: forwarding is skipped. Remove it with
`node_modules/.bin/wrangler secret delete ZAPIER_RESULTS_WEBHOOK_URL` to disable.

Official setup reference:
[Trigger Zap workflows from webhooks](https://help.zapier.com/hc/en-us/articles/8496288690317-Trigger-Zap-workflows-from-webhooks).
