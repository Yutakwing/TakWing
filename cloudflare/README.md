# Physiotherapy Skills Lab API

This Cloudflare Worker provides authentication and progress tracking for the test student area on the Tak Wing portfolio. It uses one D1 database named `physio-skills-test` with the binding `DB`.

The Worker stores pseudonymous usernames, PBKDF2 password hashes, unique salts, hashed session identifiers and game progress. It does not store student names or email addresses.

## Prerequisites

Use a supported current Node.js release. Cloudflare recommends installing Wrangler locally in each project:

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

## 3. Create the database schema

From the `cloudflare` directory, execute the schema against the remote database:

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

The current mini-OSPE games are active:

```text
/TakWing/elbow-goniometry/
/TakWing/ankle-goniometry/
/TakWing/shoulder-goniometry/
/TakWing/shoulder-rotation-goniometry/
/TakWing/hip-goniometry/
/TakWing/knee-goniometry/
/TakWing/typing-test/
```

## 6. Test the Worker locally

Initialise a local D1 database:

```bash
npx wrangler d1 execute physio-skills-test --local --file=./schema.sql
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
https://yutakwing.github.io/TakWing/typing-test/?tracked=1
```

Confirm that invalid or expired sessions return HTTP 401, logout invalidates the session, progress remains isolated between accounts, and normal game URLs continue to work without login.

## Prototype session model

The Worker returns a cryptographically random opaque token. The browser stores it in `sessionStorage` and sends it in the `Authorization: Bearer` header. D1 stores only a SHA-256 hash of the token. Sessions expire after eight hours and are deleted on logout.

When the Worker is later served from a custom same-site domain, this prototype can move to a `Secure`, `HttpOnly`, `SameSite` cookie.
