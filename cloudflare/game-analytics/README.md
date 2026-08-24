# TakWing game analytics

Privacy-minimised aggregate analytics for the portfolio's interactive learning activities.

The Worker records only anonymous game events:

- page viewed;
- play started;
- hint used and stage number;
- completion and duration.

The tracked activities are Reasoning Runner, the Clinical Readiness Lab, the Elbow, Ankle and Shoulder Goniometry Challenges, and the AI Literacy Check. Quiz answers, scores, age groups, roles, and other personal details are not sent to the Worker.

It does not persist names, email addresses, IP addresses, user-agent strings, or other visitor identifiers.

## Commands

```bash
npm run dev
npm run deploy
npm run whoami
```

Apply the production schema with Wrangler after creating and binding the D1 database.

## Viewing totals

Open the aggregate endpoint:

```text
https://takwing-game-analytics.takwing-yu.workers.dev/stats
```

Filter one activity with `?experience=`, for example:

```text
https://takwing-game-analytics.takwing-yu.workers.dev/stats?experience=elbow-goniometry
https://takwing-game-analytics.takwing-yu.workers.dev/stats?experience=shoulder-rotation-goniometry
https://takwing-game-analytics.takwing-yu.workers.dev/stats?experience=hip-goniometry
```
