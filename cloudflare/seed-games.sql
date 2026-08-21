INSERT INTO games (game_id, title, category, game_url, active)
VALUES
  ('elbow-goniometry', 'Elbow Goniometry Mini-OSPE', 'Goniometry', '/TakWing/elbow-goniometry/', 1),
  ('ankle-goniometry', 'Ankle Goniometry Mini-OSPE', 'Goniometry', '/TakWing/ankle-goniometry/', 1),
  ('shoulder-goniometry', 'Shoulder Goniometry Mini-OSPE', 'Goniometry', '/TakWing/shoulder-goniometry/', 1),
  ('shoulder-rotation-goniometry', 'Shoulder Rotation Goniometry Mini-OSPE', 'Goniometry', '/TakWing/shoulder-rotation-goniometry/', 1)
ON CONFLICT(game_id) DO UPDATE SET
  title = excluded.title,
  category = excluded.category,
  game_url = excluded.game_url,
  active = excluded.active;
