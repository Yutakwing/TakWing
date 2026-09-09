-- Apply once to the existing Skills Lab database. Historical native scores are
-- deliberately not re-labelled as 0-100 technical scores.
ALTER TABLE users ADD COLUMN result_ref TEXT;
UPDATE users SET result_ref = lower(hex(randomblob(16))) WHERE result_ref IS NULL;
CREATE UNIQUE INDEX idx_user_result_ref ON users(result_ref);
CREATE TRIGGER assign_result_ref AFTER INSERT ON users WHEN NEW.result_ref IS NULL
BEGIN
  UPDATE users SET result_ref = lower(hex(randomblob(16))) WHERE id = NEW.id;
END;
ALTER TABLE game_attempts ADD COLUMN attempt_uuid TEXT;
ALTER TABLE game_attempts ADD COLUMN technical_score REAL CHECK (technical_score BETWEEN 0 AND 100);
ALTER TABLE game_attempts ADD COLUMN independence_score REAL CHECK (independence_score BETWEEN 0 AND 100);
ALTER TABLE game_attempts ADD COLUMN hints_used INTEGER NOT NULL DEFAULT 0;
ALTER TABLE game_attempts ADD COLUMN ai_used INTEGER NOT NULL DEFAULT 0;
ALTER TABLE game_attempts ADD COLUMN ai_requests INTEGER NOT NULL DEFAULT 0;
ALTER TABLE game_attempts ADD COLUMN highest_scaffold_level TEXT NOT NULL DEFAULT 'none';
ALTER TABLE game_attempts ADD COLUMN error_summary TEXT NOT NULL DEFAULT '[]';
ALTER TABLE game_attempts ADD COLUMN metrics TEXT NOT NULL DEFAULT '{}';
CREATE UNIQUE INDEX idx_attempt_uuid ON game_attempts(attempt_uuid);
ALTER TABLE progress ADD COLUMN latest_score REAL;
ALTER TABLE progress ADD COLUMN best_technical_score REAL;
ALTER TABLE progress ADD COLUMN best_independence_score REAL;
ALTER TABLE progress ADD COLUMN latest_independence_score REAL;
ALTER TABLE progress ADD COLUMN total_hints_used INTEGER NOT NULL DEFAULT 0;
ALTER TABLE progress ADD COLUMN total_ai_requests INTEGER NOT NULL DEFAULT 0;

-- The trigger runs only on a successful new insert, never an ignored UUID.
-- It shares the insert transaction, including under concurrent retries.
CREATE TRIGGER standard_result_progress AFTER INSERT ON game_attempts
WHEN NEW.attempt_uuid IS NOT NULL
BEGIN
  INSERT INTO progress (user_id, game_id, completed, best_technical_score,
    latest_score, best_independence_score, latest_independence_score,
    total_attempts, total_hints_used, total_ai_requests,
    first_attempted_at, last_attempted_at, completed_at)
  VALUES (NEW.user_id, NEW.game_id, NEW.completed, NEW.technical_score,
    NEW.technical_score, NEW.independence_score, NEW.independence_score,
    1, NEW.hints_used, NEW.ai_requests, NEW.created_at, NEW.created_at,
    CASE WHEN NEW.completed = 1 THEN NEW.created_at ELSE NULL END)
  ON CONFLICT(user_id, game_id) DO UPDATE SET
    completed = MAX(progress.completed, excluded.completed),
    best_technical_score = MAX(COALESCE(progress.best_technical_score, 0), excluded.best_technical_score),
    latest_score = excluded.latest_score,
    best_independence_score = MAX(COALESCE(progress.best_independence_score, 0), excluded.best_independence_score),
    latest_independence_score = excluded.latest_independence_score,
    total_attempts = progress.total_attempts + 1,
    total_hints_used = progress.total_hints_used + excluded.total_hints_used,
    total_ai_requests = progress.total_ai_requests + excluded.total_ai_requests,
    first_attempted_at = COALESCE(progress.first_attempted_at, excluded.first_attempted_at),
    last_attempted_at = excluded.last_attempted_at,
    completed_at = COALESCE(progress.completed_at, excluded.completed_at);
END;
