ALTER TABLE game_events RENAME TO game_events_v1;

DROP INDEX IF EXISTS one_start_per_run;
DROP INDEX IF EXISTS one_completion_per_run;
DROP INDEX IF EXISTS game_events_type;

CREATE TABLE game_events (
  event_id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  experience_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'play_started', 'hint_used', 'completed')),
  stage INTEGER CHECK (stage IS NULL OR stage BETWEEN 1 AND 3),
  duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms BETWEEN 1000 AND 3600000),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO game_events (event_id, run_id, experience_id, event_type, stage, duration_ms, created_at)
SELECT event_id, run_id, 'elbow-goniometry', event_type, stage, duration_ms, created_at
FROM game_events_v1;

DROP TABLE game_events_v1;

CREATE UNIQUE INDEX one_start_per_run
  ON game_events (experience_id, run_id, event_type)
  WHERE event_type = 'play_started';

CREATE UNIQUE INDEX one_completion_per_run
  ON game_events (experience_id, run_id, event_type)
  WHERE event_type = 'completed';

CREATE INDEX game_events_experience_type
  ON game_events (experience_id, event_type);
