const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const localeKey = ["zh-hant", "zh-hans"].includes(requestedLanguage) ? requestedLanguage : "en";

const copy = {
  en: {
    lang: "en", back: "← Back to resources", eyebrow: "Physiotherapy Skills Mini-Game",
    title: "Shoulder Rotation Goniometry Challenge", languageAria: "Language", progressAria: "Game progress",
    darkMode: "Dark mode", lightMode: "Light mode",
    intro: "Position the goniometer in a lateral view for supine shoulder internal or external rotation using reliable anatomical landmarks.",
    measurement: "Measurement", chooseMovement: "Choose the movement", movementAria: "Shoulder rotation",
    external: "External rotation", internal: "Internal rotation", stage: "Stage", score: "Score", attempts: "Attempts", time: "Time",
    board: "Lateral view · supine · shoulder 90° abducted · elbow 90° flexed",
    boardAria: "Lateral view of a patient lying supine with the shoulder abducted and an interactive shoulder rotation goniometer",
    axisLandmark: "Olecranon process", trunkLandmark: "Perpendicular to floor", elbowLandmark: "Ulnar styloid",
    check: "Check placement", hint: "Show hint", restart: "Restart", completion: "Challenge complete",
    wellDone: "Well done", stationaryArm: "Stationary arm", movingArm: "Moving arm",
    movementDemo: "Movement demonstration", shoulderExternal: "External rotation", shoulderInternal: "Internal rotation",
    replayMotion: "Replay movement",
    externalDescription: "Watch the forearm move towards the head side of the plinth through approximately 90° of external rotation while the scapula remains stabilised.",
    internalDescription: "Watch the forearm move towards the foot side of the plinth through approximately 70° of internal rotation while the scapula remains stabilised.",
    how: "How to play", howAxis: "Place the axis over the olecranon process.",
    howStationary: "Align the stationary arm perpendicular to the floor.",
    howMoving: "Align the moving arm with the ulna towards the ulnar styloid.",
    clinicalNote: "Practice note: maintain 90° shoulder abduction and 90° elbow flexion, support the humerus and stabilise the scapula. Stop if the position is inappropriate or painful, and never force the range.",
    stage1: "Stage 1: Place the axis", stage2: "Stage 2: Align the stationary arm",
    stage3: "Stage 3: Align the moving arm", completeTitle: "Challenge complete",
    startFeedback: "Drag the blue centre onto the olecranon process.",
    axisCorrect: "Correct. Align the green arm perpendicular to the floor.",
    axisFar: distance => `The axis is about ${distance} pixels from the olecranon process.`,
    stationaryCorrect: "Correct. Align the dark arm with the ulna towards the ulnar styloid.",
    stationaryFar: error => `The stationary arm is about ${error}° away from vertical.`,
    movingCorrect: "The goniometer is correctly aligned.",
    movingFar: error => `The moving arm is about ${error}° away from the ulnar line.`,
    result: (stars, score) => `${stars} Final score: ${score}`,
    checks: (attempts, duration) => `Completed in ${attempts} checks over ${duration}.`,
    axisHint: "Hint: place the centre over the olecranon process.",
    stationaryHint: "Hint: point the green arm vertically towards the ceiling.",
    movingHint: "Hint: point the dark arm along the ulna towards the ulnar styloid.",
    activityEyebrow: "Site activity", activityTitle: "Challenge participation",
    activityNote: "Anonymous totals across all visitors.", views: "Page views", plays: "Games played",
    hintsUsed: "Hints used", averageTime: "Average correct completion",
  },
  "zh-hant": {
    lang: "zh-Hant", back: "← 返回資源", eyebrow: "物理治療技能小遊戲",
    title: "肩關節旋轉量角器挑戰", languageAria: "語言", progressAria: "遊戲進度",
    darkMode: "深色模式", lightMode: "淺色模式",
    intro: "從側面觀察仰臥位，運用可靠的解剖標誌放置量角器，以測量肩關節內旋或外旋。",
    measurement: "測量項目", chooseMovement: "選擇動作", movementAria: "肩關節旋轉",
    external: "外旋", internal: "內旋", stage: "階段", score: "分數", attempts: "嘗試次數", time: "時間",
    board: "側面觀 · 仰臥位 · 肩外展 90° · 肘屈曲 90°",
    boardAria: "從側面觀察仰臥患者，肩關節外展並配有互動式肩關節旋轉量角器",
    axisLandmark: "尺骨鷹嘴", trunkLandmark: "垂直地面", elbowLandmark: "尺骨莖突",
    check: "檢查位置", hint: "顯示提示", restart: "重新開始", completion: "挑戰完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移動臂",
    movementDemo: "活動示範", shoulderExternal: "肩關節外旋", shoulderInternal: "肩關節內旋",
    replayMotion: "重播活動",
    externalDescription: "觀看前臂向治療床頭側移動至約 90° 肩關節外旋，同時穩定肩胛骨。",
    internalDescription: "觀看前臂向治療床腳側移動至約 70° 肩關節內旋，同時穩定肩胛骨。",
    how: "玩法", howAxis: "把中心軸放在尺骨鷹嘴。", howStationary: "把固定臂垂直地面。",
    howMoving: "把移動臂沿尺骨指向尺骨莖突。",
    clinicalNote: "練習提示：保持肩外展 90° 及肘屈曲 90°，支撐肱骨並穩定肩胛骨。如姿勢不合適或引起疼痛，應立即停止，切勿強行增加活動幅度。",
    stage1: "階段 1：放置中心軸", stage2: "階段 2：對準固定臂", stage3: "階段 3：對準移動臂",
    completeTitle: "挑戰完成", startFeedback: "把藍色中心拖到尺骨鷹嘴。",
    axisCorrect: "正確。把綠色固定臂垂直地面。", axisFar: distance => `中心軸距離尺骨鷹嘴約 ${distance} 像素。`,
    stationaryCorrect: "正確。把深色移動臂沿尺骨指向尺骨莖突。",
    stationaryFar: error => `固定臂與垂直方向相差約 ${error}°。`, movingCorrect: "量角器已正確對準。",
    movingFar: error => `移動臂與尺骨中線相差約 ${error}°。`,
    result: (stars, score) => `${stars} 最終分數：${score}`,
    checks: (attempts, duration) => `完成時共檢查 ${attempts} 次，用時 ${duration}。`,
    axisHint: "提示：把中心放在尺骨鷹嘴。", stationaryHint: "提示：把綠色固定臂垂直指向天花板。",
    movingHint: "提示：把深色移動臂沿尺骨指向尺骨莖突。",
    activityEyebrow: "網站活動", activityTitle: "挑戰參與情況", activityNote: "所有訪客的匿名總計。",
    views: "頁面瀏覽次數", plays: "遊玩次數", hintsUsed: "提示使用次數", averageTime: "平均正確完成時間",
  },
  "zh-hans": {
    lang: "zh-Hans", back: "← 返回资源", eyebrow: "物理治疗技能小游戏",
    title: "肩关节旋转量角器挑战", languageAria: "语言", progressAria: "游戏进度",
    darkMode: "深色模式", lightMode: "浅色模式",
    intro: "从侧面观察仰卧位，运用可靠的解剖标志放置量角器，以测量肩关节内旋或外旋。",
    measurement: "测量项目", chooseMovement: "选择动作", movementAria: "肩关节旋转",
    external: "外旋", internal: "内旋", stage: "阶段", score: "分数", attempts: "尝试次数", time: "时间",
    board: "侧面观 · 仰卧位 · 肩外展 90° · 肘屈曲 90°",
    boardAria: "从侧面观察仰卧患者，肩关节外展并配有互动式肩关节旋转量角器",
    axisLandmark: "尺骨鹰嘴", trunkLandmark: "垂直地面", elbowLandmark: "尺骨茎突",
    check: "检查位置", hint: "显示提示", restart: "重新开始", completion: "挑战完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移动臂",
    movementDemo: "活动示范", shoulderExternal: "肩关节外旋", shoulderInternal: "肩关节内旋",
    replayMotion: "重播活动",
    externalDescription: "观看前臂向治疗床头侧移动至约 90° 肩关节外旋，同时稳定肩胛骨。",
    internalDescription: "观看前臂向治疗床脚侧移动至约 70° 肩关节内旋，同时稳定肩胛骨。",
    how: "玩法", howAxis: "把中心轴放在尺骨鹰嘴。", howStationary: "把固定臂垂直地面。",
    howMoving: "把移动臂沿尺骨指向尺骨茎突。",
    clinicalNote: "练习提示：保持肩外展 90° 及肘屈曲 90°，支撑肱骨并稳定肩胛骨。如姿势不合适或引起疼痛，应立即停止，切勿强行增加活动幅度。",
    stage1: "阶段 1：放置中心轴", stage2: "阶段 2：对准固定臂", stage3: "阶段 3：对准移动臂",
    completeTitle: "挑战完成", startFeedback: "把蓝色中心拖到尺骨鹰嘴。",
    axisCorrect: "正确。把绿色固定臂垂直地面。", axisFar: distance => `中心轴距离尺骨鹰嘴约 ${distance} 像素。`,
    stationaryCorrect: "正确。把深色移动臂沿尺骨指向尺骨茎突。",
    stationaryFar: error => `固定臂与垂直方向相差约 ${error}°。`, movingCorrect: "量角器已正确对准。",
    movingFar: error => `移动臂与尺骨中线相差约 ${error}°。`,
    result: (stars, score) => `${stars} 最终分数：${score}`,
    checks: (attempts, duration) => `完成时共检查 ${attempts} 次，用时 ${duration}。`,
    axisHint: "提示：把中心放在尺骨鹰嘴。", stationaryHint: "提示：把绿色固定臂垂直指向天花板。",
    movingHint: "提示：把深色移动臂沿尺骨指向尺骨茎突。",
    activityEyebrow: "网站活动", activityTitle: "挑战参与情况", activityNote: "所有访客的匿名总计。",
    views: "页面浏览次数", plays: "游玩次数", hintsUsed: "提示使用次数", averageTime: "平均正确完成时间",
  },
};

const text = copy[localeKey];
const byId = id => document.getElementById(id);
const svg = byId("game-board");
const goniometer = byId("goniometer");
const axisHandle = byId("axis-handle");
const stationaryArm = byId("stationary-arm");
const movingArm = byId("moving-arm");
const stationaryHandle = byId("stationary-handle");
const movingHandle = byId("moving-handle");
const stationaryArmLabel = byId("stationary-arm-label");
const movingArmLabel = byId("moving-arm-label");
const axisHint = byId("axis-hint");
const trunkHint = byId("trunk-hint");
const elbowHint = byId("elbow-hint");
const elbowMarker = byId("elbow-marker");
const movementDemo = byId("movement-demo");
const demoArm = byId("demo-arm");
const angleReadout = byId("angle-readout");
const angleLabel = byId("angle-label");
const angleValue = byId("angle-value");
const stageValue = byId("stage-value");
const scoreValue = byId("score-value");
const attemptValue = byId("attempt-value");
const timeValue = byId("time-value");
const instruction = byId("instruction");
const feedback = byId("feedback");
const checkButton = byId("check-button");
const hintButton = byId("hint-button");
const restartButton = byId("restart-button");
const completionPanel = byId("completion-panel");
const completionTitle = byId("completion-title");
const completionMessage = byId("completion-message");
const replayMotionButton = byId("replay-motion");
const themeToggle = byId("theme-toggle");
const modeButtons = [...document.querySelectorAll("[data-mode]")];

const correct = { axis: { x: 368, y: 456 }, stationaryAngle: -90, movingAngle: -92 };
const tolerance = { axisDistance: 32, angleError: 9 };
const analytics = window.TakWingGameAnalytics?.create("shoulder-rotation-goniometry");
let selectedMovement = "external";
let state = initialState();
let dragMode = null;
let dragOffset = { x: 0, y: 0 };
let timerStartedAt = null;
let elapsedMilliseconds = 0;
let timerInterval = null;
let hintTimeout = null;
let motionFrame = null;
let motionDelay = null;
let playRecorded = false;
let completionRecorded = false;

function initialState() {
  return { stage: 1, x: 180, y: 165, stationaryAngle: 180, movingAngle: 20, score: 0, attempts: 0 };
}

function movementDescription() {
  return selectedMovement === "external" ? text.externalDescription : text.internalDescription;
}

function localisePage() {
  document.documentElement.lang = text.lang;
  document.title = `${text.title} | Tak Wing Yu`;
  byId("back-link").href = localeKey === "en" ? "../resources.html" : `../${localeKey}/resources.html`;
  byId("back-link").textContent = text.back;
  byId("game-eyebrow").textContent = text.eyebrow;
  byId("game-title").textContent = text.title;
  byId("game-intro").textContent = text.intro;
  document.querySelector('meta[name="description"]').content = text.intro;
  byId("language-nav").setAttribute("aria-label", text.languageAria);
  byId("status-grid").setAttribute("aria-label", text.progressAria);
  byId("movement-choice-eyebrow").textContent = text.measurement;
  byId("movement-choice-title").textContent = text.chooseMovement;
  document.querySelector(".segmented-control").setAttribute("aria-label", text.movementAria);
  byId("external-mode").textContent = text.external;
  byId("internal-mode").textContent = text.internal;
  byId("stage-label").textContent = text.stage;
  byId("score-label").textContent = text.score;
  byId("attempt-label").textContent = text.attempts;
  byId("time-label").textContent = text.time;
  byId("board-label").textContent = text.board;
  svg.setAttribute("aria-label", text.boardAria);
  byId("axis-label").textContent = text.axisLandmark;
  byId("trunk-label").textContent = text.trunkLandmark;
  byId("elbow-label").textContent = text.elbowLandmark;
  stationaryArmLabel.textContent = text.stationaryArm;
  movingArmLabel.textContent = text.movingArm;
  byId("demo-title").textContent = text.movementDemo;
  checkButton.textContent = text.check;
  hintButton.textContent = text.hint;
  restartButton.textContent = text.restart;
  byId("completion-eyebrow").textContent = text.completion;
  completionTitle.textContent = text.wellDone;
  byId("movement-description").textContent = movementDescription();
  replayMotionButton.textContent = text.replayMotion;
  byId("how-title").textContent = text.how;
  byId("how-axis").textContent = text.howAxis;
  byId("how-stationary").textContent = text.howStationary;
  byId("how-moving").textContent = text.howMoving;
  byId("clinical-note").textContent = text.clinicalNote;
  byId("activity-eyebrow").textContent = text.activityEyebrow;
  byId("activity-title").textContent = text.activityTitle;
  byId("activity-note").textContent = text.activityNote;
  byId("views-label").textContent = text.views;
  byId("plays-label").textContent = text.plays;
  byId("hints-used-label").textContent = text.hintsUsed;
  byId("average-time-label").textContent = text.averageTime;
  instruction.textContent = text.stage1;
  feedback.textContent = text.startFeedback;
  document.querySelectorAll("[data-language]").forEach(link => {
    if (link.dataset.language === localeKey) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  updateThemeButton();
}

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.textContent = isDark ? text.lightMode : text.darkMode;
  themeToggle.setAttribute("aria-label", isDark ? text.lightMode : text.darkMode);
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem("portfolio-theme-v2", nextTheme); } catch {}
  updateThemeButton();
}

function svgPoint(event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const ctm = svg.getScreenCTM();
  return ctm ? point.matrixTransform(ctm.inverse()) : { x: 0, y: 0 };
}

function angleFromCentre(point) {
  return Math.atan2(point.y - state.y, point.x - state.x) * 180 / Math.PI;
}

function angleDifference(a, b) {
  return Math.abs(((a - b + 180) % 360 + 360) % 360 - 180);
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function renderSiteStats(stats) {
  byId("views-value").textContent = Number(stats.views || 0).toLocaleString(text.lang);
  byId("plays-value").textContent = Number(stats.plays || 0).toLocaleString(text.lang);
  byId("hints-used-value").textContent = Number(stats.hints || 0).toLocaleString(text.lang);
  byId("average-time-value").textContent = stats.averageCompletionMs == null ? "—" : formatDuration(Number(stats.averageCompletionMs));
}

async function loadSiteStats() {
  try {
    const stats = await analytics?.loadStats();
    if (stats) renderSiteStats(stats);
  } catch {
    // Analytics must never interrupt the learning activity.
  }
}

function currentElapsed() {
  return timerStartedAt === null ? elapsedMilliseconds : elapsedMilliseconds + performance.now() - timerStartedAt;
}

function updateTimer() {
  timeValue.textContent = formatDuration(currentElapsed());
}

function startTimer() {
  if (timerStartedAt !== null || !completionPanel.hidden) return;
  if (!playRecorded) {
    playRecorded = true;
    try { analytics?.start(); } catch {}
    window.setTimeout(loadSiteStats, 400);
  }
  timerStartedAt = performance.now();
  updateTimer();
  timerInterval = window.setInterval(updateTimer, 250);
}

function stopTimer() {
  if (timerStartedAt !== null) {
    elapsedMilliseconds += performance.now() - timerStartedAt;
    timerStartedAt = null;
  }
  window.clearInterval(timerInterval);
  timerInterval = null;
  updateTimer();
}

function resetTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerStartedAt = null;
  elapsedMilliseconds = 0;
  updateTimer();
}

function positionArmLabel(label, angle, normalOffset) {
  const radians = angle * Math.PI / 180;
  const distance = 106;
  const x = Math.cos(radians) * distance - Math.sin(radians) * normalOffset;
  const y = Math.sin(radians) * distance + Math.cos(radians) * normalOffset;
  label.setAttribute("x", x.toFixed(1));
  label.setAttribute("y", y.toFixed(1));
  label.setAttribute("text-anchor", "middle");
}

function render() {
  goniometer.setAttribute("transform", `translate(${state.x} ${state.y})`);
  stationaryArm.setAttribute("transform", `rotate(${state.stationaryAngle})`);
  movingArm.setAttribute("transform", `rotate(${state.movingAngle})`);
  positionArmLabel(stationaryArmLabel, state.stationaryAngle, -22);
  positionArmLabel(movingArmLabel, state.movingAngle, 22);
  stageValue.textContent = `${state.stage} / 3`;
  scoreValue.textContent = state.score;
  attemptValue.textContent = state.attempts;
}

function beginDrag(event, mode) {
  event.preventDefault();
  startTimer();
  dragMode = mode;
  const point = svgPoint(event);
  if (mode === "axis") {
    dragOffset.x = point.x - state.x;
    dragOffset.y = point.y - state.y;
    goniometer.classList.add("dragging");
  }
  try { svg.setPointerCapture(event.pointerId); } catch {}
}

axisHandle.addEventListener("pointerdown", event => beginDrag(event, "axis"));
stationaryHandle.addEventListener("pointerdown", event => beginDrag(event, "stationary"));
movingHandle.addEventListener("pointerdown", event => beginDrag(event, "moving"));

svg.addEventListener("pointermove", event => {
  if (!dragMode) return;
  const point = svgPoint(event);
  if (dragMode === "axis" && state.stage === 1) {
    state.x = point.x - dragOffset.x;
    state.y = point.y - dragOffset.y;
  } else if (dragMode === "stationary" && state.stage >= 2) {
    state.stationaryAngle = angleFromCentre(point);
  } else if (dragMode === "moving" && state.stage >= 3) {
    state.movingAngle = angleFromCentre(point);
  }
  render();
});

function endDrag(event) {
  dragMode = null;
  goniometer.classList.remove("dragging");
  if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
}

svg.addEventListener("pointerup", endDrag);
svg.addEventListener("pointercancel", endDrag);

function checkPlacement() {
  state.attempts += 1;
  if (state.stage === 1) {
    const distance = Math.hypot(state.x - correct.axis.x, state.y - correct.axis.y);
    if (distance <= tolerance.axisDistance) {
      state.x = correct.axis.x;
      state.y = correct.axis.y;
      state.score += Math.max(20, Math.round(40 - distance * 0.6));
      state.stage = 2;
      instruction.textContent = text.stage2;
      feedback.textContent = text.axisCorrect;
    } else feedback.textContent = text.axisFar(Math.round(distance));
  } else if (state.stage === 2) {
    const error = angleDifference(state.stationaryAngle, correct.stationaryAngle);
    if (error <= tolerance.angleError) {
      state.stationaryAngle = correct.stationaryAngle;
      state.score += Math.max(20, Math.round(40 - error * 2));
      state.stage = 3;
      instruction.textContent = text.stage3;
      feedback.textContent = text.stationaryCorrect;
    } else feedback.textContent = text.stationaryFar(Math.round(error));
  } else {
    const error = angleDifference(state.movingAngle, correct.movingAngle);
    if (error <= tolerance.angleError) {
      state.movingAngle = correct.movingAngle;
      state.score += Math.max(20, Math.round(40 - error * 2));
      checkButton.disabled = true;
      instruction.textContent = text.completeTitle;
      feedback.textContent = text.movingCorrect;
      showCompletion();
    } else feedback.textContent = text.movingFar(Math.round(error));
  }
  render();
}

function setMovementDemoVisible(visible) {
  movementDemo.toggleAttribute("hidden", !visible);
  angleReadout.toggleAttribute("hidden", !visible);
  elbowMarker.toggleAttribute("hidden", visible);
}

function setMovementProgress(progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  const targetRotation = selectedMovement === "external" ? -90 : 70;
  const rotation = targetRotation * clamped;
  demoArm.setAttribute("transform", `rotate(${rotation} ${correct.axis.x} ${correct.axis.y})`);
  state.movingAngle = correct.movingAngle + rotation;
  angleLabel.textContent = selectedMovement === "external" ? text.shoulderExternal : text.shoulderInternal;
  angleValue.textContent = `${Math.round(Math.abs(rotation))}°`;
  render();
}

function cancelMovementDemo() {
  window.cancelAnimationFrame(motionFrame);
  window.clearTimeout(motionDelay);
  motionFrame = null;
  motionDelay = null;
}

function playMovementDemo() {
  cancelMovementDemo();
  setMovementDemoVisible(true);
  setMovementProgress(0);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setMovementProgress(1);
    return;
  }
  const duration = 3200;
  let startedAt = null;
  const animate = timestamp => {
    if (startedAt === null) startedAt = timestamp;
    const linear = Math.min(1, (timestamp - startedAt) / duration);
    const eased = 0.5 - Math.cos(linear * Math.PI) / 2;
    setMovementProgress(eased);
    if (linear < 1) motionFrame = window.requestAnimationFrame(animate);
    else motionFrame = null;
  };
  motionFrame = window.requestAnimationFrame(animate);
}

function showCompletion() {
  stopTimer();
  if (!completionRecorded) {
    completionRecorded = true;
    try { analytics?.complete(); } catch {}
    window.setTimeout(loadSiteStats, 400);
  }
  const stars = state.score >= 110 ? "★★★" : state.score >= 85 ? "★★☆" : "★☆☆";
  completionTitle.textContent = text.result(stars, state.score);
  completionMessage.textContent = text.checks(state.attempts, formatDuration(elapsedMilliseconds));
  byId("movement-description").textContent = movementDescription();
  completionPanel.hidden = false;
  window.PhysioSkillsProgress?.submitCompletion({
    game_id: "shoulder-rotation-goniometry",
    score: Math.min(100, Math.round((state.score / 120) * 100)), completed: true,
    attempts: state.attempts, duration_seconds: Math.max(0, Math.round(elapsedMilliseconds / 1000)),
  });
  window.TakWingMascot?.react("correct");
  setMovementDemoVisible(true);
  setMovementProgress(0);
  motionDelay = window.setTimeout(playMovementDemo, 500);
}

function showHint() {
  try { analytics?.hint(state.stage); } catch {}
  window.setTimeout(loadSiteStats, 400);
  const rings = [axisHint, trunkHint, elbowHint];
  window.clearTimeout(hintTimeout);
  rings.forEach(ring => ring.classList.remove("visible"));
  let activeHint = axisHint;
  if (state.stage === 1) feedback.textContent = text.axisHint;
  else if (state.stage === 2) {
    activeHint = trunkHint;
    feedback.textContent = text.stationaryHint;
  } else {
    activeHint = elbowHint;
    feedback.textContent = text.movingHint;
  }
  activeHint.classList.add("visible");
  hintTimeout = window.setTimeout(() => activeHint.classList.remove("visible"), 2200);
}

function restart() {
  cancelMovementDemo();
  window.clearTimeout(hintTimeout);
  resetTimer();
  state = initialState();
  dragMode = null;
  try { analytics?.restart(); } catch {}
  playRecorded = false;
  completionRecorded = false;
  window.PhysioSkillsProgress?.resetCompletion();
  checkButton.disabled = false;
  completionPanel.hidden = true;
  [axisHint, trunkHint, elbowHint].forEach(ring => ring.classList.remove("visible"));
  demoArm.setAttribute("transform", `rotate(0 ${correct.axis.x} ${correct.axis.y})`);
  setMovementDemoVisible(false);
  instruction.textContent = text.stage1;
  feedback.textContent = text.startFeedback;
  render();
}

function selectMovement(mode) {
  if (mode === selectedMovement) return;
  selectedMovement = mode;
  modeButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
  byId("movement-description").textContent = movementDescription();
  restart();
}

svg.addEventListener("pointerdown", startTimer);
checkButton.addEventListener("click", () => { startTimer(); checkPlacement(); });
hintButton.addEventListener("click", () => { startTimer(); showHint(); });
restartButton.addEventListener("click", restart);
replayMotionButton.addEventListener("click", playMovementDemo);
themeToggle.addEventListener("click", toggleTheme);
modeButtons.forEach(button => button.addEventListener("click", () => selectMovement(button.dataset.mode)));

localisePage();
resetTimer();
render();
window.setTimeout(loadSiteStats, 400);
