(() => {
  "use strict";
  const games = {
    "elbow-goniometry": ["Elbow Goniometry", "goniometry"],
    "ankle-goniometry": ["Ankle Goniometry", "goniometry"],
    "shoulder-goniometry": ["Shoulder Goniometry", "goniometry"],
    "shoulder-rotation-goniometry": ["Shoulder Rotation Goniometry", "goniometry"],
    "hip-goniometry": ["Hip Goniometry", "goniometry"],
    "knee-goniometry": ["Knee Goniometry", "goniometry"],
    "cardio-auscultation-anterior": ["Anterior Auscultation", "cardiorespiratory", "anterior-auscultation"],
    "cardio-auscultation-posterior": ["Posterior Auscultation", "cardiorespiratory", "posterior-auscultation"],
    "cardio-chest-expansion": ["Chest Expansion", "cardiorespiratory", "chest-expansion"],
    "cardio-chest-percussion": ["Chest Percussion", "cardiorespiratory", "chest-percussion"],
    "cardio-breath-sounds": ["Breath Sound Identification", "cardiorespiratory", "breath-sounds"],
    "typing-speed": ["Typing Speed", "digital-literacy", "typing-test", false],
  };
  const config = Object.fromEntries(Object.entries(games).map(([id, [title, category, route = id, enabled = true]]) => [id, Object.freeze({title, category, route, enabled})]));
  const stages = ["axis-placement", "stationary-arm", "moving-arm"];
  const angleDifference = (a,b) => Math.abs(((a-b+540)%360)-180);
  // These adapters describe errors, never accept/reject a placement or assign a score.
  function goniometry(before, target, after, complete) {
    const result = after.score > before.score ? "correct" : "incorrect";
    const stage = stages[before.stage-1];
    const magnitude = before.stage === 1
      ? Math.hypot(before.x-target.axis.x,before.y-target.axis.y)
      : angleDifference(before.stage === 2 ? before.stationaryAngle : before.movingAngle, before.stage === 2 ? target.stationaryAngle : target.movingAngle);
    return {stage, result, error_type: result === "correct" ? "none" : before.stage === 1 ? "axis-placement-error" : `${stage}-angle-error`, error_magnitude: magnitude, error_unit: before.stage === 1 ? "diagram-units" : "degrees", current_score:after.score, total_attempts:after.attempts, completion_state:complete};
  }
  function placement(stage, state, result, error, distance, complete) {
    return {stage:`comparison-${Math.floor(stage/2)+1}-${stage%2 ? "opposite-side" : "first-side"}`, result, error_type:error, error_magnitude:distance, error_unit:"diagram-units", current_score:state.score, total_attempts:state.attempts, completion_state:complete};
  }
  const adapters = {};
  for (const [id, game] of Object.entries(config)) if (game.enabled) adapters[id] = game.category === "goniometry" ? goniometry : id === "cardio-chest-expansion" || id === "cardio-breath-sounds" ? data => ({...data}) : placement;
  window.SKILLS_TUTOR_GAMES = Object.freeze(config);
  window.SkillsTutorAdapters = Object.freeze(adapters);
})();
