import { readFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";
import worker, { hashPassword } from "../src/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://yutakwing.github.io";

class D1StatementMock {
  constructor(database, sql, parameters = []) {
    this.database = database;
    this.sql = sql;
    this.parameters = parameters;
  }

  bind(...parameters) {
    return new D1StatementMock(this.database, this.sql, parameters);
  }

  async first() {
    return this.database.sqlite.prepare(this.sql).get(...this.parameters) || null;
  }

  async all() {
    return { success: true, results: this.database.sqlite.prepare(this.sql).all(...this.parameters) };
  }

  async run() {
    const result = this.database.sqlite.prepare(this.sql).run(...this.parameters);
    return { success: true, meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
  }
}

class D1Mock {
  constructor() {
    this.sqlite = new DatabaseSync(":memory:");
  }

  prepare(sql) {
    return new D1StatementMock(this, sql);
  }

  async batch(statements) {
    this.sqlite.exec("BEGIN");
    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
      this.sqlite.exec("COMMIT");
      return results;
    } catch (error) {
      this.sqlite.exec("ROLLBACK");
      throw error;
    }
  }
}

function base64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

async function createEnvironment() {
  const DB = new D1Mock();
  DB.sqlite.exec(await readFile(join(root, "schema.sql"), "utf8"));
  DB.sqlite.exec(await readFile(join(root, "seed-games.sql"), "utf8"));
  const passwords = new Map();
  for (const username of ["TEST001", "TEST002"]) {
    const password = randomBytes(24).toString("base64url");
    passwords.set(username, password);
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    const saltBase64 = base64(salt);
    const hash = await hashPassword(password, saltBase64);
    DB.sqlite.prepare(`
      INSERT INTO users (username, password_hash, password_salt, role, active)
      VALUES (?, ?, ?, 'student', 1)
    `).run(username, hash, saltBase64);
  }
  return { env: { DB, ENVIRONMENT: "production", ALLOWED_ORIGIN: origin }, passwords };
}

function apiRequest(path, { method = "GET", token = "", body, requestOrigin = origin } = {}) {
  const headers = { Origin: requestOrigin };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  return new Request(`https://physio-skills-api.test${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function jsonResponse(env, path, options) {
  const response = await worker.fetch(apiRequest(path, options), env);
  const payload = response.status === 204 ? null : await response.json();
  return { response, payload };
}

async function login(env, username, password) {
  const { response, payload } = await jsonResponse(env, "/api/login", {
    method: "POST",
    body: { username, password },
  });
  assert.equal(response.status, 200);
  assert.match(payload.session_token, /^[A-Za-z0-9_-]{40,}$/u);
  return payload.session_token;
}

test("CORS allows the portfolio origin and rejects unrelated origins", async () => {
  const { env } = await createEnvironment();
  const allowed = await worker.fetch(apiRequest("/api/me"), env);
  assert.equal(allowed.status, 401);
  assert.equal(allowed.headers.get("Access-Control-Allow-Origin"), origin);

  const blocked = await worker.fetch(apiRequest("/api/me", { requestOrigin: "https://example.com" }), env);
  assert.equal(blocked.status, 403);
  assert.equal(blocked.headers.get("Access-Control-Allow-Origin"), null);

  env.ENVIRONMENT = "development";
  const local = await worker.fetch(apiRequest("/api/me", { requestOrigin: "http://127.0.0.1:4201" }), env);
  assert.equal(local.status, 401);
  assert.equal(local.headers.get("Access-Control-Allow-Origin"), "http://127.0.0.1:4201");
});

test("invalid credentials use one generic error", async () => {
  const { env } = await createEnvironment();
  for (const body of [
    { username: "TEST001", password: "wrong" },
    { username: "UNKNOWN", password: "wrong" },
  ]) {
    const { response, payload } = await jsonResponse(env, "/api/login", { method: "POST", body });
    assert.equal(response.status, 401);
    assert.equal(payload.error, "Invalid account or password.");
  }
});

test("progress, best scores and attempts remain isolated between accounts", async () => {
  const { env, passwords } = await createEnvironment();
  const tokenOne = await login(env, "test001", passwords.get("TEST001"));
  const tokenTwo = await login(env, "TEST002", passwords.get("TEST002"));

  const games = await jsonResponse(env, "/api/games", { token: tokenOne });
  assert.equal(games.response.status, 200);
  assert.deepEqual(games.payload.map(game => game.game_id), ["elbow-goniometry", "ankle-goniometry", "shoulder-goniometry", "shoulder-rotation-goniometry", "hip-goniometry", "knee-goniometry"]);

  const initial = await jsonResponse(env, "/api/progress", { token: tokenOne });
  assert.deepEqual({ completed: initial.payload.completed, total: initial.payload.total }, { completed: 0, total: 6 });

  const elbow = {
    game_id: "elbow-goniometry",
    score: 94,
    completed: true,
    attempts: 3,
    duration_seconds: 82,
  };
  assert.equal((await jsonResponse(env, "/api/progress", { method: "POST", token: tokenOne, body: elbow })).response.status, 200);
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, score: 81, attempts: 5 },
  })).response.status, 200);
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, game_id: "ankle-goniometry", score: 88 },
  })).response.status, 200);
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, game_id: "shoulder-goniometry", score: 91 },
  })).response.status, 200);
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, game_id: "shoulder-rotation-goniometry", score: 89 },
  })).response.status, 200);
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, game_id: "hip-goniometry", score: 92 },
  })).response.status, 200);
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, game_id: "knee-goniometry", score: 90 },
  })).response.status, 200);

  const studentOne = await jsonResponse(env, "/api/progress", { token: tokenOne });
  assert.equal(studentOne.payload.completed, 6);
  const elbowProgress = studentOne.payload.games.find(item => item.game_id === "elbow-goniometry");
  assert.equal(elbowProgress.best_score, 94);
  assert.equal(elbowProgress.total_attempts, 2);
  const shoulderProgress = studentOne.payload.games.find(item => item.game_id === "shoulder-goniometry");
  assert.equal(shoulderProgress.best_score, 91);
  assert.equal(shoulderProgress.total_attempts, 1);
  const shoulderRotationProgress = studentOne.payload.games.find(item => item.game_id === "shoulder-rotation-goniometry");
  assert.equal(shoulderRotationProgress.best_score, 89);
  assert.equal(shoulderRotationProgress.total_attempts, 1);
  const hipProgress = studentOne.payload.games.find(item => item.game_id === "hip-goniometry");
  assert.equal(hipProgress.best_score, 92);
  assert.equal(hipProgress.total_attempts, 1);
  const kneeProgress = studentOne.payload.games.find(item => item.game_id === "knee-goniometry");
  assert.equal(kneeProgress.best_score, 90);
  assert.equal(kneeProgress.total_attempts, 1);

  const studentTwo = await jsonResponse(env, "/api/progress", { token: tokenTwo });
  assert.equal(studentTwo.payload.completed, 0);
  assert.ok(studentTwo.payload.games.every(item => item.total_attempts === 0));
});

test("invalid progress is rejected and logout invalidates the session", async () => {
  const { env, passwords } = await createEnvironment();
  const token = await login(env, "TEST001", passwords.get("TEST001"));
  const invalid = await jsonResponse(env, "/api/progress", {
    method: "POST",
    token,
    body: { game_id: "unknown-game", score: 101, completed: true, attempts: -1, duration_seconds: 99 },
  });
  assert.equal(invalid.response.status, 400);

  const logout = await jsonResponse(env, "/api/logout", { method: "POST", token });
  assert.equal(logout.response.status, 204);
  const me = await jsonResponse(env, "/api/me", { token });
  assert.equal(me.response.status, 401);
});

test("expired sessions are rejected", async () => {
  const { env, passwords } = await createEnvironment();
  const token = await login(env, "TEST001", passwords.get("TEST001"));
  env.DB.sqlite.prepare("UPDATE sessions SET expires_at = ?").run("2000-01-01T00:00:00.000Z");
  const me = await jsonResponse(env, "/api/me", { token });
  assert.equal(me.response.status, 401);
});
