# Physiotherapy Skills Lab API

This Cloudflare Worker provides authentication and progress tracking for the test student area on the Tak Wing portfolio. It uses one D1 database named `physio-skills-test` with the binding `DB`.

The Worker stores pseudonymous usernames, PBKDF2 password hashes, unique salts, hashed session identifiers and game progress. It does not store student names or email addresses.

## Prerequisites

Use Node.js 22.13 or later for the `node:sqlite` test suite. Cloudflare recommends installing Wrangler locally in each project:

```bash
cd cloudflare
npm install
npx wrangler --version
```

Wrangler documentation: <https://developers.cloudflare.com/workers/wrangler/install-and-update/>

## 1. Log in to Cloudflare

```bash
npx wrangler login
```

## 2. D1 database

The remote database has been created as `physio-skills-test`. Its ID is already configured in `wrangler.jsonc`.

For a fresh account or replacement database, create it with:

```bash
npx wrangler d1 create physio-skills-test
```

Copy the returned database ID into `wrangler.jsonc` if creating a replacement.

Do not commit Cloudflare credentials or tokens.

## 3. Create the database schema (new empty databases only)

Existing installations: use the Standard Results migration instructions below.
For a new empty database only, from `cloudflare`, execute:

```bash
npx wrangler d1 execute physio-skills-test --remote --file=./schema.sql
```

Cloudflare D1 command reference: <https://developers.cloudflare.com/d1/get-started/>

## 4. Generate the five test accounts

```bash
npm run generate-users
```

The Worker uses Cloudflare's maximum supported PBKDF2 iteration count of 100,000 with SHA-256 and a unique random 16-byte salt. To rebuild hashes while retaining an existing private password list, run:

```bash
npm run generate-users -- --preserve-passwords
```

This creates two private, ignored files:

```text
test-credentials.txt
seed-users.private.sql
```

`test-credentials.txt` contains the temporary passwords. Keep it private. `seed-users.private.sql` contains only usernames, salts and PBKDF2 hashes for import into D1. Neither file should be committed.

Import the generated user records:

```bash
npx wrangler d1 execute physio-skills-test --remote --file=./seed-users.private.sql
```

## 5. Add the game records

```bash
npx wrangler d1 execute physio-skills-test --remote --file=./seed-games.sql
```

The current Skills Lab activities are active and grouped by category in the student dashboard:

```text
# Goniometry
/TakWing/elbow-goniometry/
/TakWing/ankle-goniometry/
/TakWing/shoulder-goniometry/
/TakWing/shoulder-rotation-goniometry/
/TakWing/hip-goniometry/
/TakWing/knee-goniometry/

# Cardiorespiratory Skills
/TakWing/cardiorespiratory/anterior-auscultation/index.html
/TakWing/cardiorespiratory/posterior-auscultation/index.html
/TakWing/cardiorespiratory/chest-expansion/index.html
/TakWing/cardiorespiratory/chest-percussion/index.html
/TakWing/cardiorespiratory/breath-sounds/index.html

# AI and Digital Literacy
/TakWing/typing-test/
/TakWing/ai-literacy-check.html

# Clinical Reasoning
/TakWing/reasoning-runner.html
/TakWing/clinical-readiness-lab.html
```

## 6. Test the Worker locally

Initialise a local D1 database:

```bash
npx wrangler d1 execute physio-skills-test --local --file=./schema.sql
npx wrangler d1 migrations apply physio-skills-test --local
npx wrangler d1 execute physio-skills-test --local --file=./seed-users.private.sql
npx wrangler d1 execute physio-skills-test --local --file=./seed-games.sql
```

Run the Worker in development mode:

```bash
npm run dev
```

Development mode permits browser origins using `http://localhost` or `http://127.0.0.1`, including explicit local ports. Production accepts only `https://yutakwing.github.io`.

## 7. Deploy the Worker

```bash
npx wrangler deploy
```

The deployed Worker URL is:

```text
https://physio-skills-api.takwing-yu.workers.dev
```

It is configured in:

```text
student/assets/auth.js
```

Keep the URL in this single configuration constant; do not duplicate it across scripts.

## 8. Verify production

Test these pages after GitHub Pages and the Worker are deployed:

```text
https://yutakwing.github.io/TakWing/student/login/
https://yutakwing.github.io/TakWing/student/dashboard/
https://yutakwing.github.io/TakWing/elbow-goniometry/?tracked=1
https://yutakwing.github.io/TakWing/ankle-goniometry/?tracked=1
https://yutakwing.github.io/TakWing/shoulder-goniometry/?tracked=1
https://yutakwing.github.io/TakWing/shoulder-rotation-goniometry/?tracked=1
https://yutakwing.github.io/TakWing/hip-goniometry/?tracked=1
https://yutakwing.github.io/TakWing/knee-goniometry/?tracked=1
https://yutakwing.github.io/TakWing/cardiorespiratory/anterior-auscultation/?tracked=1
https://yutakwing.github.io/TakWing/cardiorespiratory/posterior-auscultation/?tracked=1
https://yutakwing.github.io/TakWing/cardiorespiratory/chest-expansion/?tracked=1
https://yutakwing.github.io/TakWing/cardiorespiratory/chest-percussion/?tracked=1
https://yutakwing.github.io/TakWing/cardiorespiratory/breath-sounds/?tracked=1
https://yutakwing.github.io/TakWing/typing-test/?tracked=1
```

Confirm that invalid or expired sessions return HTTP 401, logout invalidates the session, progress remains isolated between accounts, and normal game URLs continue to work without login.

## Prototype session model

The Worker returns a cryptographically random opaque token. The browser stores it in `sessionStorage` and sends it in the `Authorization: Bearer` header. D1 stores only a SHA-256 hash of the token. Sessions expire after eight hours and are deleted on logout.

When the Worker is later served from a custom same-site domain, this prototype can move to a `Secure`, `HttpOnly`, `SameSite` cookie.

## Standard Results (September 2026)

The existing `/api/progress` accepts an additive standard payload. D1
`game_attempts` stores each run; `progress` stores the student's per-game summary.
An insert trigger updates the summary in the same transaction. A unique UUID
conflict does not run the trigger or increment totals. A UUID owned by another
student/game returns 409 without disclosing its owner.

Deploy in this order from `cloudflare/`:

```sh
node_modules/.bin/wrangler d1 migrations apply physio-skills-test --local
npm test
node_modules/.bin/wrangler d1 migrations apply physio-skills-test --remote
node_modules/.bin/wrangler d1 execute physio-skills-test --remote --file seed-games.sql
node_modules/.bin/wrangler deploy
```

Apply `schema.sql` before migrations only for a genuinely new empty database.
Do not rerun migration SQL directly: Wrangler records which files were applied.
Migration `0001_standard_results.sql` adds columns/indexes/triggers; it does not
drop data. Historical native `score`/`best_score` values are preserved, and the
dashboard explicitly labels their previous scale. Standard best scores use a
separate `best_technical_score`, avoiding incomparable legacy typing scores.
Existing total-attempt counts and completion timestamps are retained.

Official [D1 migration guidance](https://developers.cloudflare.com/d1/reference/migrations/)
and [Wrangler commands](https://developers.cloudflare.com/d1/wrangler-commands/).

Example `POST /api/progress` body (bearer authentication required):

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
  "highest_scaffold_level": "none",
  "duration_seconds": 154,
  "error_summary": ["axis-placement-error"],
  "metrics": {}
}
```

Unknown fields (including user IDs), malformed values, oversized bodies and
unregistered/inactive games are rejected. Metrics currently allow only finite
numeric `wpm`, `accuracy`, `native_score`, `native_maximum`. The total JSON body
limit is 16 KiB. The old payload is retained for cached pre-release clients; those
legacy writes cannot offer UUID idempotency and are not relabelled standard scores.

`GET /api/games/:game_id/attempts` returns the authenticated student's latest 20
attempts. No username, database user ID, password or session is in its response.
`GET /api/progress` adds standard best/latest and latest independence while
retaining old fields for compatibility. No leaderboard or lecturer dashboard.

Optional forwarding: set `ZAPIER_RESULTS_WEBHOOK_URL` using
`node_modules/.bin/wrangler secret put ZAPIER_RESULTS_WEBHOOK_URL`.
Never put the actual URL in source. If absent, nothing is forwarded. If it fails,
D1 remains authoritative and the student still sees a successful save.
See `docs/ZAPIER-RESULTS.md` and `docs/GAME-SCORING.md` in the repository root.

## Reproducible regression checks

`npm test` covers validation, real SQLite migration/trigger behaviour, concurrent
UUID retries, historical preservation, user isolation and optional webhook failure.
The browser scripts in `tests/` run against an isolated local Wrangler D1 database
and the repository served at `http://127.0.0.1:4201`. See the implementation report
for commands and limits. They use existing TEST001 credentials from the ignored
private file; they do not create or change production accounts.
