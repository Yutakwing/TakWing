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
  DB.sqlite.exec(await readFile(join(root, 'migrations/0001_standard_results.sql'), 'utf8'));
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
  assert.deepEqual(games.payload.map(game => game.game_id), [
    "elbow-goniometry",
    "ankle-goniometry",
    "shoulder-goniometry",
    "shoulder-rotation-goniometry",
    "hip-goniometry",
    "knee-goniometry",
    "cardio-auscultation-anterior",
    "cardio-auscultation-posterior",
    "cardio-chest-expansion",
    "cardio-chest-percussion",
    "cardio-breath-sounds",
    "typing-speed",
    "ai-literacy-check",
    "reasoning-runner",
    "clinical-readiness-lab",
  ]);
  assert.equal(games.payload.filter(game => game.category === "Goniometry").length, 6);
  assert.equal(games.payload.filter(game => game.category === "Cardiorespiratory Skills").length, 5);

  const initial = await jsonResponse(env, "/api/progress", { token: tokenOne });
  assert.deepEqual({ completed: initial.payload.completed, total: initial.payload.total }, { completed: 0, total: 15 });

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
  assert.equal((await jsonResponse(env, "/api/progress", {
    method: "POST",
    token: tokenOne,
    body: { ...elbow, game_id: "typing-speed", score: 112.4, attempts: 1, duration_seconds: 60 },
  })).response.status, 200);

  const studentOne = await jsonResponse(env, "/api/progress", { token: tokenOne });
  assert.equal(studentOne.payload.completed, 7);
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
  const typingProgress = studentOne.payload.games.find(item => item.game_id === "typing-speed");
  assert.equal(typingProgress.best_score, 112.4);
  assert.equal(typingProgress.total_attempts, 1);

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
    body: { game_id: "unknown-game", score: 501, completed: true, attempts: -1, duration_seconds: 99 },
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

test('standard attempts are atomic, deduplicated, private and preserve historical scores', async () => {
  const {env,passwords}=await createEnvironment();
  const token=await login(env,'TEST001',passwords.get('TEST001'));
  const other=await login(env,'TEST002',passwords.get('TEST002'));
  const base={attempt_uuid:crypto.randomUUID(),game_id:'elbow-goniometry',technical_score:64,
    independence_score:100,completed:true,attempts_in_game:3,hints_used:0,ai_used:false,
    ai_requests:0,highest_scaffold_level:'none',duration_seconds:82,error_summary:[],metrics:{}};
  let last;
  for (const value of [64,85,91,78]) {
    last={...base,attempt_uuid:crypto.randomUUID(),technical_score:value};
    const r=await jsonResponse(env,'/api/progress',{method:'POST',token,body:last});
    assert.equal(r.response.status,200); assert.equal(r.payload.attempt_saved,true);
  }
  const repeated=await jsonResponse(env,'/api/progress',{method:'POST',token,body:last});
  assert.equal(repeated.payload.duplicate,true);
  assert.equal(repeated.payload.progress.total_attempts,4);
  assert.equal(repeated.payload.progress.best_score,91);
  assert.equal(repeated.payload.progress.latest_score,78);
  assert.equal(env.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM game_attempts').get().n,4);
  const collision=await jsonResponse(env,'/api/progress',{method:'POST',token:other,body:last});
  assert.equal(collision.response.status,409);
  const privateHistory=await jsonResponse(env,'/api/games/elbow-goniometry/attempts',{token:other});
  assert.deepEqual(privateHistory.payload.attempts,[]);
  const history=await jsonResponse(env,'/api/games/elbow-goniometry/attempts',{token});
  assert.equal(history.payload.attempts.length,4);
  assert.ok(history.payload.attempts.every(a=>!('user_id' in a)));
  const hinted={...base,attempt_uuid:crypto.randomUUID(),technical_score:78,independence_score:80,
    hints_used:2,ai_used:true,ai_requests:2,highest_scaffold_level:'explicit-guidance',error_summary:['axis-placement-error','axis-placement-error']};
  await jsonResponse(env,'/api/progress',{method:'POST',token,body:hinted});
  const saved=env.DB.sqlite.prepare('SELECT * FROM game_attempts WHERE attempt_uuid=?').get(hinted.attempt_uuid);
  assert.equal(saved.technical_score,78); assert.equal(saved.independence_score,80);
  assert.equal(saved.ai_requests,2); assert.equal(saved.error_summary,'["axis-placement-error"]');
  assert.equal((await jsonResponse(env,'/api/progress',{method:'POST',body:base})).response.status,401);
  assert.equal((await jsonResponse(env,'/api/progress',{method:'POST',token,body:{...base,game_id:'missing-game'}})).response.status,400);
  assert.equal((await jsonResponse(env,'/api/progress',{method:'POST',token,body:{...base,user_id:2}})).response.status,400);
  assert.equal((await jsonResponse(env,'/api/progress',{method:'POST',token,body:{...base,error_summary:['x'.repeat(17000)]}})).response.status,400);
  env.DB.sqlite.prepare('UPDATE sessions SET expires_at=?').run('2000-01-01');
  assert.equal((await jsonResponse(env,'/api/progress',{method:'POST',token,body:base})).response.status,401);
});

test('optional forwarding failure cannot roll back saved results or forward duplicates', async () => {
  const {env,passwords}=await createEnvironment();
  const token=await login(env,'TEST001',passwords.get('TEST001'));
  // Invalid configured URL exercises the guarded failure path without network access.
  env.ZAPIER_RESULTS_WEBHOOK_URL='https://example.invalid/not-a-hook';
  const body={attempt_uuid:crypto.randomUUID(),game_id:'elbow-goniometry',technical_score:88,
    independence_score:100,completed:true,attempts_in_game:3,hints_used:0,ai_used:false,
    ai_requests:0,highest_scaffold_level:'none',duration_seconds:12,error_summary:[],metrics:{}};
  const first=await jsonResponse(env,'/api/progress',{method:'POST',token,body});
  assert.equal(first.response.status,200); assert.equal(first.payload.attempt_saved,true);
  const again=await jsonResponse(env,'/api/progress',{method:'POST',token,body});
  assert.equal(again.payload.duplicate,true);
});

test('migration preserves existing rows and completion dates; failed inserts cannot update summary', async () => {
  const db = new D1Mock();
  db.sqlite.exec(await readFile(join(root,'schema.sql'),'utf8'));
  db.sqlite.exec(await readFile(join(root,'seed-games.sql'),'utf8'));
  db.sqlite.exec(`INSERT INTO users(username,password_hash,password_salt) VALUES('TEST001','fixture','fixture');
    INSERT INTO game_attempts(user_id,game_id,score,completed,attempts_in_game,created_at) VALUES(1,'typing-speed',150,1,1,'2026-01-01');
    INSERT INTO progress(user_id,game_id,best_score,completed,total_attempts,completed_at,first_attempted_at) VALUES(1,'typing-speed',150,1,1,'2026-01-01','2026-01-01');`);
  db.sqlite.exec(await readFile(join(root,'migrations/0001_standard_results.sql'),'utf8'));
  assert.equal(db.sqlite.prepare('SELECT score FROM game_attempts').get().score,150);
  assert.equal(db.sqlite.prepare('SELECT best_technical_score FROM progress').get().best_technical_score,null);
  db.sqlite.prepare(`INSERT INTO game_attempts(attempt_uuid,user_id,game_id,technical_score,independence_score,completed,created_at) VALUES(?,1,'typing-speed',90,100,1,'2026-02-01')`).run(crypto.randomUUID());
  const summary=db.sqlite.prepare('SELECT * FROM progress').get();
  assert.equal(summary.best_score,150);assert.equal(summary.best_technical_score,90);
  assert.equal(summary.completed_at,'2026-01-01');assert.equal(summary.total_attempts,2);
  assert.throws(()=>db.sqlite.prepare(`INSERT INTO game_attempts(attempt_uuid,user_id,game_id,technical_score) VALUES(?,1,'typing-speed',101)`).run(crypto.randomUUID()));
  assert.equal(db.sqlite.prepare('SELECT total_attempts FROM progress').get().total_attempts,2);
});

test('concurrent UUID retries increment once and history is bounded', async()=>{
 const {env,passwords}=await createEnvironment();const token=await login(env,'TEST001',passwords.get('TEST001'));
 const body={attempt_uuid:crypto.randomUUID(),game_id:'elbow-goniometry',technical_score:88,independence_score:70,completed:true,attempts_in_game:3,hints_used:3,ai_used:true,ai_requests:3,highest_scaffold_level:'explicit-guidance',duration_seconds:10,error_summary:[]};
 const responses=await Promise.all(Array.from({length:8},()=>jsonResponse(env,'/api/progress',{method:'POST',token,body})));
 assert.equal(responses.filter(r=>!r.payload.duplicate).length,1);
 const row=env.DB.sqlite.prepare('SELECT * FROM progress').get();assert.equal(row.total_attempts,1);assert.equal(row.total_hints_used,3);assert.equal(row.total_ai_requests,3);
 for(let i=0;i<21;i++)await jsonResponse(env,'/api/progress',{method:'POST',token,body:{...body,attempt_uuid:crypto.randomUUID()}});
 const history=await jsonResponse(env,'/api/games/elbow-goniometry/attempts',{token});assert.equal(history.payload.attempts.length,20);assert.equal(history.payload.attempts[0].ai_used,true);
});

test('Zapier receives only a pseudonymous result; HTTP failure and duplicates do not affect D1', async()=>{
 const {env,passwords}=await createEnvironment();const token=await login(env,'TEST001',passwords.get('TEST001'));
 const originalFetch=globalThis.fetch;const calls=[];
 env.ZAPIER_RESULTS_WEBHOOK_URL='https://hooks.zapier.com/hooks/catch/test/fixture/';
 globalThis.fetch=async(url,options)=>{calls.push(JSON.parse(options.body));assert.equal(new Headers(options.headers).has('Authorization'),false);return new Response('',{status:503});};
 try {
  const body={attempt_uuid:crypto.randomUUID(),game_id:'elbow-goniometry',technical_score:88,independence_score:100,completed:true,attempts_in_game:3,hints_used:0,ai_used:false,ai_requests:0,highest_scaffold_level:'none',duration_seconds:10,error_summary:[],metrics:{}};
  const first=await jsonResponse(env,'/api/progress',{method:'POST',token,body});assert.equal(first.payload.attempt_saved,true);
  await jsonResponse(env,'/api/progress',{method:'POST',token,body});assert.equal(calls.length,1);
  assert.match(calls[0].user_ref,/^[a-f0-9]{32}$/);assert.equal(calls[0].attempt_number,1);
  for(const forbidden of ['user_id','username','email','password','session_token','transcript'])assert.equal(forbidden in calls[0],false);
 } finally {globalThis.fetch=originalFetch;}
});
