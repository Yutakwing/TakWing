-- Retire the activity without deleting historical student results.
UPDATE games SET active = 0 WHERE game_id = 'cardio-respiratory-rate';

INSERT INTO games (game_id, title, category, game_url, active)
VALUES
  ('elbow-goniometry', 'Elbow Goniometry Mini-OSPE', 'Goniometry', '/TakWing/elbow-goniometry/', 1),
  ('ankle-goniometry', 'Ankle Goniometry Mini-OSPE', 'Goniometry', '/TakWing/ankle-goniometry/', 1),
  ('shoulder-goniometry', 'Shoulder Goniometry Mini-OSPE', 'Goniometry', '/TakWing/shoulder-goniometry/', 1),
  ('shoulder-rotation-goniometry', 'Shoulder Rotation Goniometry Mini-OSPE', 'Goniometry', '/TakWing/shoulder-rotation-goniometry/', 1),
  ('hip-goniometry', 'Hip Goniometry Mini-OSPE', 'Goniometry', '/TakWing/hip-goniometry/', 1),
  ('knee-goniometry', 'Knee Goniometry Mini-OSPE', 'Goniometry', '/TakWing/knee-goniometry/', 1),
  ('cardio-auscultation-anterior', 'Anterior Lung Auscultation Challenge', 'Cardiorespiratory Skills', '/TakWing/cardiorespiratory/anterior-auscultation/index.html', 1),
  ('cardio-auscultation-posterior', 'Posterior Lung Auscultation Challenge', 'Cardiorespiratory Skills', '/TakWing/cardiorespiratory/posterior-auscultation/index.html', 1),
  ('cardio-chest-expansion', 'Chest Expansion Measurement Challenge', 'Cardiorespiratory Skills', '/TakWing/cardiorespiratory/chest-expansion/index.html', 1),
  ('cardio-chest-percussion', 'Chest Percussion Challenge', 'Cardiorespiratory Skills', '/TakWing/cardiorespiratory/chest-percussion/index.html', 1),
  ('cardio-breath-sounds', 'Breath Sound Identification Challenge', 'Cardiorespiratory Skills', '/TakWing/cardiorespiratory/breath-sounds/index.html', 1),
  ('typing-speed', 'Typing Speed Test', 'AI and Digital Literacy', '/TakWing/typing-test/', 1)
ON CONFLICT(game_id) DO UPDATE SET
  title = excluded.title,
  category = excluded.category,
  game_url = excluded.game_url,
  active = excluded.active;
