CREATE TABLE IF NOT EXISTS game_events (
  event_id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  experience_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'play_started', 'hint_used', 'completed')),
  stage INTEGER CHECK (stage IS NULL OR stage BETWEEN 1 AND 3),
  duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms BETWEEN 1000 AND 3600000),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS one_start_per_run
  ON game_events (experience_id, run_id, event_type)
  WHERE event_type = 'play_started';

CREATE UNIQUE INDEX IF NOT EXISTS one_completion_per_run
  ON game_events (experience_id, run_id, event_type)
  WHERE event_type = 'completed';

CREATE INDEX IF NOT EXISTS game_events_experience_type
  ON game_events (experience_id, event_type);
