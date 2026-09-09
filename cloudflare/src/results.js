const boundedInteger = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
const score = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
const scaffolds = ['none', 'socratic', 'focused-hint', 'explicit-guidance'];
const fields = new Set(['attempt_uuid', 'game_id', 'technical_score', 'independence_score', 'completed', 'attempts_in_game', 'hints_used', 'ai_used', 'ai_requests', 'highest_scaffold_level', 'duration_seconds', 'error_summary', 'metrics']);

export function validResult(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !fields.has(key))) return false;
  return typeof body.attempt_uuid === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.attempt_uuid)
    && typeof body.game_id === 'string' && /^[a-z0-9-]{3,64}$/.test(body.game_id)
    && score(body.technical_score) && score(body.independence_score)
    && typeof body.completed === 'boolean'
    && boundedInteger(body.attempts_in_game, 1, 10000)
    && boundedInteger(body.hints_used, 0, 10000)
    && boundedInteger(body.ai_requests, 0, 10000)
    && body.ai_requests <= body.hints_used
    && typeof body.ai_used === 'boolean' && body.ai_used === (body.ai_requests > 0)
    && scaffolds.includes(body.highest_scaffold_level)
    && (body.ai_used || body.highest_scaffold_level === 'none')
    && boundedInteger(body.duration_seconds, 0, 86400)
    && Array.isArray(body.error_summary) && body.error_summary.length <= 32
    && body.error_summary.every(value => typeof value === 'string' && /^[a-z0-9-]{1,64}$/.test(value))
    && (body.metrics === undefined || (body.metrics != null && typeof body.metrics === 'object' && !Array.isArray(body.metrics)
    && Object.keys(body.metrics).length <= 8
    && Object.entries(body.metrics).every(([key, value]) => ['wpm', 'accuracy', 'native_score', 'native_maximum'].includes(key) && typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 10000)));
}

export async function storeResult(db, userId, body) {
  const existing = await db.prepare('SELECT user_id, game_id FROM game_attempts WHERE attempt_uuid = ?1').bind(body.attempt_uuid).first();
  if (existing && (existing.user_id !== userId || existing.game_id !== body.game_id)) return { conflict: true };
  const inserted = await db.prepare(`INSERT INTO game_attempts
    (attempt_uuid, user_id, game_id, technical_score, independence_score, completed,
     attempts_in_game, hints_used, ai_used, ai_requests, highest_scaffold_level,
     duration_seconds, error_summary, metrics, created_at)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15)
    ON CONFLICT(attempt_uuid) DO NOTHING`).bind(body.attempt_uuid, userId, body.game_id,
    body.technical_score, body.independence_score, Number(body.completed), body.attempts_in_game,
    body.hints_used, Number(body.ai_used), body.ai_requests, body.highest_scaffold_level,
    body.duration_seconds, JSON.stringify([...new Set(body.error_summary)]), JSON.stringify(body.metrics || {}), new Date().toISOString()).run();
  // Recheck ownership after the insert too: another request may have won a race.
  const owner = await db.prepare('SELECT id, user_id, game_id, created_at FROM game_attempts WHERE attempt_uuid = ?1').bind(body.attempt_uuid).first();
  if (owner.user_id !== userId || owner.game_id !== body.game_id) return { conflict: true };
  const progress = await db.prepare(`SELECT game_id, completed, best_technical_score AS best_score,
    latest_score, latest_independence_score, total_attempts FROM progress WHERE user_id = ?1 AND game_id = ?2`).bind(userId, body.game_id).first();
  const ordinal = await db.prepare('SELECT COUNT(*) AS n FROM game_attempts WHERE user_id = ?1 AND game_id = ?2 AND id <= ?3').bind(userId, body.game_id, owner.id).first();
  return { success: true, attempt_saved: true, attempt_number:ordinal.n, duplicate: inserted.meta.changes === 0, completed_at:owner.created_at, progress };
}

export async function forwardResult(env, userId, body, result) {
  if (!env.ZAPIER_RESULTS_WEBHOOK_URL || result.duplicate || !body.completed) return;
  try {
    const url = new URL(env.ZAPIER_RESULTS_WEBHOOK_URL);
    if (url.protocol !== 'https:' || url.hostname !== 'hooks.zapier.com' || !url.pathname.startsWith('/hooks/catch/')) throw new Error('invalid-hook');
    const user = await env.DB.prepare('SELECT result_ref FROM users WHERE id = ?1').bind(userId).first();
    const payload = { ...body, user_ref:user.result_ref, attempt_number:result.attempt_number, completed_at:result.completed_at };
    const response = await fetch(url.href, {method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload), signal:AbortSignal.timeout(5000), redirect:'error'});
    if (!response.ok) throw new Error('hook-failed');
  } catch {
    // No URL, credentials or student data in logs. D1 has already committed.
    console.warn('Optional results forwarding failed; D1 result remains saved.');
  }
}
