const SESSION_TTL_SECONDS = 8 * 60 * 60;
// Cloudflare Workers Web Crypto currently supports at most 100,000 PBKDF2 rounds.
const PBKDF2_ITERATIONS = 100_000;
const PASSWORD_HASH_BYTES = 32;
const PRODUCTION_ORIGIN = "https://yutakwing.github.io";
const ALLOWED_METHODS = "GET, POST, OPTIONS";
const ALLOWED_HEADERS = "Content-Type, Authorization";

const encoder = new TextEncoder();

function bytesToBase64(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

function bytesToBase64Url(bytes) {
  return bytesToBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function bytesToHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

export async function hashPassword(password, saltBase64) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: base64ToBytes(saltBase64),
      iterations: PBKDF2_ITERATIONS,
    },
    key,
    PASSWORD_HASH_BYTES * 8,
  );
  return bytesToBase64(new Uint8Array(bits));
}

function constantTimeEqual(left, right) {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  let difference = leftBytes.length ^ rightBytes.length;
  const length = Math.max(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
  }
  return difference === 0;
}

export async function verifyPassword(password, saltBase64, storedHash) {
  const candidateHash = await hashPassword(password, saltBase64);
  return constantTimeEqual(candidateHash, storedHash);
}

function normaliseUsername(value) {
  return typeof value === "string" ? value.trim().toUpperCase() : "";
}

function isValidUsername(username) {
  return /^[A-Z0-9_-]{3,32}$/u.test(username);
}

function isDevelopmentOrigin(origin) {
  try {
    const url = new URL(origin);
    return url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  } catch {
    return false;
  }
}

export function isAllowedOrigin(origin, env) {
  const productionOrigin = env.ALLOWED_ORIGIN || PRODUCTION_ORIGIN;
  if (origin === productionOrigin) return true;
  return env.ENVIRONMENT === "development" && isDevelopmentOrigin(origin);
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": ALLOWED_METHODS,
    "Access-Control-Allow-Headers": ALLOWED_HEADERS,
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(origin),
    },
  });
}

function empty(status, origin) {
  return new Response(null, { status, headers: corsHeaders(origin) });
}

async function requestJson(request) {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) throw new Error("invalid-content-type");
  return request.json();
}

function bearerToken(request) {
  const header = request.headers.get("Authorization") || "";
  const match = /^Bearer\s+([A-Za-z0-9_-]{40,128})$/u.exec(header);
  return match?.[1] || null;
}

async function sessionIdForToken(token) {
  return bytesToHex(await sha256(token));
}

async function authenticatedUser(request, env) {
  const token = bearerToken(request);
  if (!token) return null;
  const sessionId = await sessionIdForToken(token);
  const now = new Date().toISOString();
  const user = await env.DB.prepare(`
    SELECT users.id, users.username, users.role
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.id = ?1
      AND sessions.expires_at > ?2
      AND users.active = 1
    LIMIT 1
  `).bind(sessionId, now).first();
  return user ? { ...user, sessionId } : null;
}

async function requireUser(request, env, origin) {
  const user = await authenticatedUser(request, env);
  return user || json({ error: "Authentication required." }, 401, origin);
}

async function deleteExpiredSessions(env) {
  await env.DB.prepare("DELETE FROM sessions WHERE expires_at <= ?1")
    .bind(new Date().toISOString())
    .run();
}

async function login(request, env, origin) {
  let body;
  try {
    body = await requestJson(request);
  } catch {
    return json({ error: "Invalid request." }, 400, origin);
  }

  const username = normaliseUsername(body?.username);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!isValidUsername(username) || password.length < 1 || password.length > 256) {
    return json({ error: "Invalid account or password." }, 401, origin);
  }

  const user = await env.DB.prepare(`
    SELECT id, username, password_hash, password_salt, role
    FROM users
    WHERE username = ?1 AND active = 1
    LIMIT 1
  `).bind(username).first();

  if (!user || !(await verifyPassword(password, user.password_salt, user.password_hash))) {
    return json({ error: "Invalid account or password." }, 401, origin);
  }

  await deleteExpiredSessions(env);
  const tokenBytes = new Uint8Array(32);
  crypto.getRandomValues(tokenBytes);
  const token = bytesToBase64Url(tokenBytes);
  const sessionId = await sessionIdForToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();
  await env.DB.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (?1, ?2, ?3)
  `).bind(sessionId, user.id, expiresAt).run();

  return json({
    success: true,
    session_token: token,
    expires_at: expiresAt,
    user: { username: user.username, role: user.role },
  }, 200, origin);
}

async function logout(request, env, origin) {
  const user = await requireUser(request, env, origin);
  if (user instanceof Response) return user;
  await env.DB.prepare("DELETE FROM sessions WHERE id = ?1").bind(user.sessionId).run();
  return empty(204, origin);
}

async function me(request, env, origin) {
  const user = await requireUser(request, env, origin);
  if (user instanceof Response) return user;
  return json({ username: user.username, role: user.role }, 200, origin);
}

async function games(request, env, origin) {
  const user = await requireUser(request, env, origin);
  if (user instanceof Response) return user;
  const result = await env.DB.prepare(`
    SELECT game_id, title, category, game_url
    FROM games
    WHERE active = 1
    ORDER BY id
  `).all();
  return json(result.results || [], 200, origin);
}

async function progress(request, env, origin) {
  const user = await requireUser(request, env, origin);
  if (user instanceof Response) return user;
  const result = await env.DB.prepare(`
    SELECT
      games.game_id,
      COALESCE(progress.completed, 0) AS completed,
      progress.best_score,
      COALESCE(progress.total_attempts, 0) AS total_attempts
    FROM games
    LEFT JOIN progress
      ON progress.game_id = games.game_id
      AND progress.user_id = ?1
    WHERE games.active = 1
    ORDER BY games.id
  `).bind(user.id).all();
  const gameProgress = (result.results || []).map(item => ({
    game_id: item.game_id,
    completed: Boolean(item.completed),
    best_score: item.best_score == null ? null : Number(item.best_score),
    total_attempts: Number(item.total_attempts || 0),
  }));
  return json({
    completed: gameProgress.filter(item => item.completed).length,
    total: gameProgress.length,
    games: gameProgress,
  }, 200, origin);
}

function validProgressPayload(body) {
  return body
    && typeof body.game_id === "string"
    && /^[a-z0-9-]{3,64}$/u.test(body.game_id)
    && typeof body.score === "number"
    && Number.isFinite(body.score)
    && body.score >= 0
    && body.score <= 100
    && typeof body.completed === "boolean"
    && Number.isInteger(body.attempts)
    && body.attempts >= 0
    && body.attempts <= 1000
    && Number.isInteger(body.duration_seconds)
    && body.duration_seconds >= 0
    && body.duration_seconds <= 14_400;
}

async function saveProgress(request, env, origin) {
  const user = await requireUser(request, env, origin);
  if (user instanceof Response) return user;

  let body;
  try {
    body = await requestJson(request);
  } catch {
    return json({ error: "Invalid request." }, 400, origin);
  }
  if (!validProgressPayload(body)) return json({ error: "Invalid progress result." }, 400, origin);

  const game = await env.DB.prepare(`
    SELECT game_id FROM games WHERE game_id = ?1 AND active = 1 LIMIT 1
  `).bind(body.game_id).first();
  if (!game) return json({ error: "Game is unavailable." }, 400, origin);

  const score = Math.round(body.score * 100) / 100;
  const completed = body.completed ? 1 : 0;
  const now = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO game_attempts
        (user_id, game_id, score, completed, attempts_in_game, duration_seconds, created_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    `).bind(user.id, body.game_id, score, completed, body.attempts, body.duration_seconds, now),
    env.DB.prepare(`
      INSERT INTO progress
        (user_id, game_id, completed, best_score, total_attempts, first_attempted_at, last_attempted_at, completed_at)
      VALUES (?1, ?2, ?3, ?4, 1, ?5, ?5, ?6)
      ON CONFLICT(user_id, game_id) DO UPDATE SET
        completed = MAX(progress.completed, excluded.completed),
        best_score = CASE
          WHEN progress.best_score IS NULL OR excluded.best_score > progress.best_score
          THEN excluded.best_score
          ELSE progress.best_score
        END,
        total_attempts = progress.total_attempts + 1,
        first_attempted_at = COALESCE(progress.first_attempted_at, excluded.first_attempted_at),
        last_attempted_at = excluded.last_attempted_at,
        completed_at = CASE
          WHEN progress.completed_at IS NULL AND excluded.completed = 1
          THEN excluded.completed_at
          ELSE progress.completed_at
        END
    `).bind(user.id, body.game_id, completed, score, now, completed ? now : null),
  ]);

  const updated = await env.DB.prepare(`
    SELECT game_id, completed, best_score, total_attempts
    FROM progress
    WHERE user_id = ?1 AND game_id = ?2
  `).bind(user.id, body.game_id).first();
  return json({
    success: true,
    progress: {
      game_id: updated.game_id,
      completed: Boolean(updated.completed),
      best_score: Number(updated.best_score),
      total_attempts: Number(updated.total_attempts),
    },
  }, 200, origin);
}

export async function handleRequest(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!isAllowedOrigin(origin, env)) {
    return new Response("Origin not allowed.", { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  if (request.method === "OPTIONS") return empty(204, origin);

  const { pathname } = new URL(request.url);
  try {
    if (request.method === "POST" && pathname === "/api/login") return login(request, env, origin);
    if (request.method === "POST" && pathname === "/api/logout") return logout(request, env, origin);
    if (request.method === "GET" && pathname === "/api/me") return me(request, env, origin);
    if (request.method === "GET" && pathname === "/api/games") return games(request, env, origin);
    if (request.method === "GET" && pathname === "/api/progress") return progress(request, env, origin);
    if (request.method === "POST" && pathname === "/api/progress") return saveProgress(request, env, origin);
    return json({ error: "Not found." }, 404, origin);
  } catch (error) {
    console.error("Skills API request failed", error instanceof Error ? error.message : "unknown error");
    return json({ error: "The request could not be completed." }, 500, origin);
  }
}

export default {
  fetch: handleRequest,
};
