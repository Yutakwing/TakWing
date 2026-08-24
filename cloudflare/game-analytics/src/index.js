const PRODUCTION_ORIGIN = "https://yutakwing.github.io";
const LOCAL_ORIGIN = /^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?$/;
const VALID_ID = /^[A-Za-z0-9_-]{16,80}$/;
const VALID_EVENTS = new Set(["page_view", "play_started", "hint_used", "completed"]);
const VALID_EXPERIENCES = new Set([
  "reasoning-runner",
  "clinical-readiness-lab",
  "elbow-goniometry",
  "ankle-goniometry",
  "shoulder-goniometry",
  "shoulder-rotation-goniometry",
  "hip-goniometry",
  "ai-literacy-check"
]);

function isAllowedOrigin(origin) {
  return origin === PRODUCTION_ORIGIN || LOCAL_ORIGIN.test(origin || "");
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(origin ? corsHeaders(origin) : {})
    }
  });
}

async function recordEvent(request, env, origin) {
  if (!isAllowedOrigin(origin)) return json({ error: "Origin not allowed" }, 403, "");

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }

  const eventId = String(payload.eventId || "");
  const runId = String(payload.runId || "");
  const experienceId = String(payload.experienceId || "");
  const eventType = String(payload.eventType || "");
  const stage = payload.stage == null ? null : Number(payload.stage);
  const durationMs = payload.durationMs == null ? null : Math.round(Number(payload.durationMs));

  if (!VALID_ID.test(eventId) || !VALID_ID.test(runId) || !VALID_EXPERIENCES.has(experienceId) || !VALID_EVENTS.has(eventType)) {
    return json({ error: "Invalid event" }, 400, origin);
  }
  if (stage !== null && (!Number.isInteger(stage) || stage < 1 || stage > 3)) {
    return json({ error: "Invalid stage" }, 400, origin);
  }
  if (eventType === "completed" && (!Number.isInteger(durationMs) || durationMs < 1000 || durationMs > 3600000)) {
    return json({ error: "Invalid completion duration" }, 400, origin);
  }

  if (eventType === "hint_used") {
    const hintCount = await env.DB.prepare(
      "SELECT COUNT(*) AS count FROM game_events WHERE experience_id = ? AND run_id = ? AND event_type = 'hint_used'"
    ).bind(experienceId, runId).first();
    if (Number(hintCount?.count || 0) >= 10) return json({ recorded: false }, 200, origin);
  }

  await env.DB.prepare(
    "INSERT OR IGNORE INTO game_events (event_id, run_id, experience_id, event_type, stage, duration_ms) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(eventId, runId, experienceId, eventType, stage, eventType === "completed" ? durationMs : null).run();

  return json({ recorded: true }, 201, origin);
}

function normaliseStats(row) {
  return {
    views: Number(row?.views || 0),
    plays: Number(row?.plays || 0),
    hints: Number(row?.hints || 0),
    completions: Number(row?.completions || 0),
    averageCompletionMs: row?.average_completion_ms == null ? null : Math.round(Number(row.average_completion_ms))
  };
}

async function readStats(env, origin, experienceId) {
  const filter = experienceId ? "WHERE experience_id = ?" : "";
  let statement = env.DB.prepare(`
    SELECT
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS views,
      COUNT(DISTINCT CASE WHEN event_type = 'play_started' THEN run_id END) AS plays,
      SUM(CASE WHEN event_type = 'hint_used' THEN 1 ELSE 0 END) AS hints,
      COUNT(DISTINCT CASE WHEN event_type = 'completed' THEN run_id END) AS completions,
      AVG(CASE WHEN event_type = 'completed' THEN duration_ms END) AS average_completion_ms
    FROM game_events
    ${filter}
  `);
  if (experienceId) statement = statement.bind(experienceId);
  const row = await statement.first();

  if (experienceId) return json(normaliseStats(row), 200, origin);

  const breakdown = await env.DB.prepare(`
    SELECT
      experience_id,
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS views,
      COUNT(DISTINCT CASE WHEN event_type = 'play_started' THEN run_id END) AS plays,
      SUM(CASE WHEN event_type = 'hint_used' THEN 1 ELSE 0 END) AS hints,
      COUNT(DISTINCT CASE WHEN event_type = 'completed' THEN run_id END) AS completions,
      AVG(CASE WHEN event_type = 'completed' THEN duration_ms END) AS average_completion_ms
    FROM game_events
    GROUP BY experience_id
    ORDER BY experience_id
  `).all();

  return json({
    ...normaliseStats(row),
    byExperience: (breakdown.results || []).map((item) => ({
      experienceId: item.experience_id,
      ...normaliseStats(item)
    }))
  }, 200, origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return isAllowedOrigin(origin)
        ? new Response(null, { status: 204, headers: corsHeaders(origin) })
        : new Response(null, { status: 403 });
    }

    if (url.pathname === "/events" && request.method === "POST") {
      return recordEvent(request, env, origin);
    }

    if (url.pathname === "/stats" && request.method === "GET") {
      if (origin && !isAllowedOrigin(origin)) return json({ error: "Origin not allowed" }, 403, "");
      const experienceId = url.searchParams.get("experience") || "";
      if (experienceId && !VALID_EXPERIENCES.has(experienceId)) return json({ error: "Invalid experience" }, 400, origin);
      return readStats(env, origin, experienceId);
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true }, 200, origin && isAllowedOrigin(origin) ? origin : "");
    }

    return json({ error: "Not found" }, 404, origin && isAllowedOrigin(origin) ? origin : "");
  }
};
