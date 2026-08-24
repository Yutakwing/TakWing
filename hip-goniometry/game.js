const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const localeKey = ["zh-hant", "zh-hans"].includes(requestedLanguage) ? requestedLanguage : "en";

const copy = {
  en: {
    lang: "en", back: "← Back to resources", eyebrow: "Physiotherapy Skills Mini-Game",
    title: "Hip Goniometry Challenge", languageAria: "Language", progressAria: "Game progress",
    darkMode: "Dark mode", lightMode: "Light mode",
    intro: "Position the goniometer for hip flexion or extension using reliable anatomical landmarks.",
    measurement: "Measurement", chooseMovement: "Choose the movement", movementAria: "Hip movement",
    flexion: "Flexion", extension: "Extension", stage: "Stage", score: "Score", attempts: "Attempts", time: "Time",
    flexionBoard: "Supine · knee flexed during movement · pelvis neutral",
    extensionBoard: "Prone · knee extended · pelvis stabilised",
    boardAria: "Side view of a patient positioned for interactive hip goniometry",
    axisLandmark: "Greater trochanter", trunkLandmark: "Lateral pelvic midline", kneeLandmark: "Lateral epicondyle",
    check: "Check placement", hint: "Show hint", restart: "Restart", completion: "Challenge complete",
    wellDone: "Well done", stationaryArm: "Stationary arm", movingArm: "Moving arm",
    movementDemo: "Movement demonstration", hipFlexion: "Hip flexion", hipExtension: "Hip extension",
    replayMotion: "Replay movement",
    flexionDescription: "Watch the hip move from neutral to approximately 120° flexion with the knee flexed and the pelvis stabilised.",
    extensionDescription: "Watch the hip move from neutral to approximately 20° extension with the knee extended and the pelvis stabilised.",
    how: "How to play", howAxis: "Place the axis over the greater trochanter.",
    howStationary: "Align the stationary arm with the lateral midline of the pelvis.",
    howMoving: "Align the moving arm with the lateral midline of the femur towards the lateral epicondyle.",
    flexionClinical: "Practice note: position the patient supine and flex the knee to reduce hamstring tension. Stabilise the pelvis and stop if posterior pelvic tilt or lumbar flattening substitutes for hip flexion.",
    extensionClinical: "Practice note: position the patient prone with the knee extended. Stabilise the pelvis and avoid anterior pelvic tilt or lumbar extension substituting for hip extension.",
    stage1: "Stage 1: Place the axis", stage2: "Stage 2: Align the stationary arm",
    stage3: "Stage 3: Align the moving arm", completeTitle: "Challenge complete",
    startFeedback: "Drag the blue centre onto the greater trochanter.",
    axisCorrect: "Correct. Align the green arm with the lateral midline of the pelvis.",
    axisFar: distance => `The axis is about ${distance} pixels from the greater trochanter.`,
    stationaryCorrect: "Correct. Align the dark arm with the lateral midline of the femur.",
    stationaryFar: error => `The stationary arm is about ${error}° away from the lateral pelvic line.`,
    movingCorrect: "The goniometer is correctly aligned.",
    movingFar: error => `The moving arm is about ${error}° away from the lateral femoral line.`,
    result: (stars, score) => `${stars} Final score: ${score}`,
    checks: (attempts, duration) => `Completed in ${attempts} checks over ${duration}.`,
    axisHint: "Hint: place the centre over the greater trochanter.",
    stationaryHint: "Hint: point the green arm along the lateral pelvic line.",
    movingHint: "Hint: point the dark arm towards the lateral epicondyle.",
    activityEyebrow: "Site activity", activityTitle: "Challenge participation",
    activityNote: "Anonymous totals across all visitors.", views: "Page views", plays: "Games played",
    hintsUsed: "Hints used", averageTime: "Average correct completion",
  },
  "zh-hant": {
    lang: "zh-Hant", back: "← 返回資源", eyebrow: "物理治療技能小遊戲",
    title: "髖關節量角器挑戰", languageAria: "語言", progressAria: "遊戲進度",
    darkMode: "深色模式", lightMode: "淺色模式",
    intro: "運用可靠的解剖標誌，放置量角器以量度髖關節屈曲或伸展。",
    measurement: "測量項目", chooseMovement: "選擇動作", movementAria: "髖關節動作",
    flexion: "屈曲", extension: "伸展", stage: "階段", score: "分數", attempts: "嘗試次數", time: "時間",
    flexionBoard: "仰臥位 · 動作時屈膝 · 骨盆保持中立", extensionBoard: "俯臥位 · 膝關節伸直 · 穩定骨盆",
    boardAria: "患者側面及互動式髖關節量角器",
    axisLandmark: "股骨大轉子", trunkLandmark: "骨盆外側中線", kneeLandmark: "股骨外上髁",
    check: "檢查位置", hint: "顯示提示", restart: "重新開始", completion: "挑戰完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移動臂",
    movementDemo: "活動示範", hipFlexion: "髖關節屈曲", hipExtension: "髖關節伸展", replayMotion: "重播活動",
    flexionDescription: "觀看髖關節由中立位移至約 120° 屈曲，同時屈膝並穩定骨盆。",
    extensionDescription: "觀看髖關節由中立位移至約 20° 伸展，同時伸直膝關節並穩定骨盆。",
    how: "玩法", howAxis: "把中心軸放在股骨大轉子。", howStationary: "把固定臂沿骨盆外側中線對準。",
    howMoving: "把移動臂沿股骨外側中線指向股骨外上髁。",
    flexionClinical: "練習提示：患者採仰臥位，屈曲膝關節以減少膕繩肌張力。穩定骨盆；若出現骨盆後傾或腰椎變平的代償，應停止動作。",
    extensionClinical: "練習提示：患者採俯臥位並伸直膝關節。穩定骨盆，避免以前傾骨盆或腰椎伸展代償髖關節伸展。",
    stage1: "階段 1：放置中心軸", stage2: "階段 2：對準固定臂", stage3: "階段 3：對準移動臂",
    completeTitle: "挑戰完成", startFeedback: "把藍色中心拖到股骨大轉子。",
    axisCorrect: "正確。把綠色固定臂沿骨盆外側中線對準。", axisFar: distance => `中心軸距離股骨大轉子約 ${distance} 像素。`,
    stationaryCorrect: "正確。把深色移動臂沿股骨外側中線對準。",
    stationaryFar: error => `固定臂與骨盆外側中線相差約 ${error}°。`, movingCorrect: "量角器已正確對準。",
    movingFar: error => `移動臂與股骨外側中線相差約 ${error}°。`,
    result: (stars, score) => `${stars} 最終分數：${score}`,
    checks: (attempts, duration) => `完成時共檢查 ${attempts} 次，用時 ${duration}。`,
    axisHint: "提示：把中心放在股骨大轉子。", stationaryHint: "提示：把綠色固定臂沿骨盆外側中線對準。",
    movingHint: "提示：把深色移動臂指向股骨外上髁。",
    activityEyebrow: "網站活動", activityTitle: "挑戰參與情況", activityNote: "所有訪客的匿名總計。",
    views: "頁面瀏覽次數", plays: "遊玩次數", hintsUsed: "提示使用次數", averageTime: "平均正確完成時間",
  },
  "zh-hans": {
    lang: "zh-Hans", back: "← 返回资源", eyebrow: "物理治疗技能小游戏",
    title: "髋关节量角器挑战", languageAria: "语言", progressAria: "游戏进度",
    darkMode: "深色模式", lightMode: "浅色模式",
    intro: "运用可靠的解剖标志，放置量角器以测量髋关节屈曲或伸展。",
    measurement: "测量项目", chooseMovement: "选择动作", movementAria: "髋关节动作",
    flexion: "屈曲", extension: "伸展", stage: "阶段", score: "分数", attempts: "尝试次数", time: "时间",
    flexionBoard: "仰卧位 · 动作时屈膝 · 骨盆保持中立", extensionBoard: "俯卧位 · 膝关节伸直 · 稳定骨盆",
    boardAria: "患者侧面及互动式髋关节量角器",
    axisLandmark: "股骨大转子", trunkLandmark: "骨盆外侧中线", kneeLandmark: "股骨外上髁",
    check: "检查位置", hint: "显示提示", restart: "重新开始", completion: "挑战完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移动臂",
    movementDemo: "活动示范", hipFlexion: "髋关节屈曲", hipExtension: "髋关节伸展", replayMotion: "重播活动",
    flexionDescription: "观看髋关节由中立位移至约 120° 屈曲，同时屈膝并稳定骨盆。",
    extensionDescription: "观看髋关节由中立位移至约 20° 伸展，同时伸直膝关节并稳定骨盆。",
    how: "玩法", howAxis: "把中心轴放在股骨大转子。", howStationary: "把固定臂沿骨盆外侧中线对准。",
    howMoving: "把移动臂沿股骨外侧中线指向股骨外上髁。",
    flexionClinical: "练习提示：患者采用仰卧位，屈曲膝关节以减少腘绳肌张力。稳定骨盆；若出现骨盆后倾或腰椎变平的代偿，应停止动作。",
    extensionClinical: "练习提示：患者采用俯卧位并伸直膝关节。稳定骨盆，避免以前倾骨盆或腰椎伸展代偿髋关节伸展。",
    stage1: "阶段 1：放置中心轴", stage2: "阶段 2：对准固定臂", stage3: "阶段 3：对准移动臂",
    completeTitle: "挑战完成", startFeedback: "把蓝色中心拖到股骨大转子。",
    axisCorrect: "正确。把绿色固定臂沿骨盆外侧中线对准。", axisFar: distance => `中心轴距离股骨大转子约 ${distance} 像素。`,
    stationaryCorrect: "正确。把深色移动臂沿股骨外侧中线对准。",
    stationaryFar: error => `固定臂与骨盆外侧中线相差约 ${error}°。`, movingCorrect: "量角器已正确对准。",
    movingFar: error => `移动臂与股骨外侧中线相差约 ${error}°。`,
    result: (stars, score) => `${stars} 最终分数：${score}`,
    checks: (attempts, duration) => `完成时共检查 ${attempts} 次，用时 ${duration}。`,
    axisHint: "提示：把中心放在股骨大转子。", stationaryHint: "提示：把绿色固定臂沿骨盆外侧中线对准。",
    movingHint: "提示：把深色移动臂指向股骨外上髁。",
    activityEyebrow: "网站活动", activityTitle: "挑战参与情况", activityNote: "所有访客的匿名总计。",
    views: "页面浏览次数", plays: "游玩次数", hintsUsed: "提示使用次数", averageTime: "平均正确完成时间",
  },
};

const text = copy[localeKey];
const byId = id => document.getElementById(id);
const svg = byId("game-board");
const patientImage = byId("patient-image");
const demoBase = byId("demo-base");
const demoLeg = byId("demo-leg");
const demoExtensionLeg = byId("demo-extension-leg");
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
const kneeHint = byId("elbow-hint");
const kneeMarker = byId("elbow-marker");
const movementDemo = byId("movement-demo");
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

const movementSetups = {
  flexion: {
    patient: "hip-flexion-neutral.jpg",
    frames: ["hip-flexion-frame-0.jpg", "hip-flexion-frame-1.jpg", "hip-flexion-frame-2.jpg", "hip-flexion-frame-3.jpg"],
    axis: { x: 415, y: 354 }, trunk: { x: 374, y: 352 }, knee: { x: 563, y: 375 },
    stationaryAngle: 182, movingAngle: 8, targetAngle: 120,
    labelPaths: ["M427 342 L478 286", "M360 346 L258 312", "M577 380 L630 414"],
    labelPositions: [[483, 281], [90, 307], [635, 421]],
  },
  extension: {
    patient: "hip-extension-neutral.jpg", frames: ["hip-extension-neutral.jpg", "hip-extension-demo.jpg"],
    axis: { x: 431, y: 329 }, trunk: { x: 310, y: 294 }, knee: { x: 593, y: 362 },
    stationaryAngle: 196, movingAngle: 11, targetAngle: 20,
    labelPaths: ["M443 317 L494 261", "M296 289 L220 266", "M607 367 L660 401"],
    labelPositions: [[499, 256], [88, 261], [665, 408]],
  },
};

const tolerance = { axisDistance: 34, angleError: 10 };
const analytics = window.TakWingGameAnalytics?.create("hip-goniometry");
let selectedMovement = "flexion";
let state = initialState();
let dragMode = null;
let dragOffset = { x: 0, y: 0 };
let timerStartedAt = null;
let elapsedMilliseconds = 0;
let timerInterval = null;
let hintTimeout = null;
let motionFrame = null;
let playRecorded = false;
let completionRecorded = false;

function setup() { return movementSetups[selectedMovement]; }
function initialState() { return { stage: 1, x: 700, y: 145, stationaryAngle: 110, movingAngle: -30, score: 0, attempts: 0 }; }
function movementDescription() { return selectedMovement === "flexion" ? text.flexionDescription : text.extensionDescription; }
function clinicalNote() { return selectedMovement === "flexion" ? text.flexionClinical : text.extensionClinical; }

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
  byId("flexion-mode").textContent = text.flexion;
  byId("extension-mode").textContent = text.extension;
  byId("stage-label").textContent = text.stage;
  byId("score-label").textContent = text.score;
  byId("attempt-label").textContent = text.attempts;
  byId("time-label").textContent = text.time;
  svg.setAttribute("aria-label", text.boardAria);
  byId("axis-label").textContent = text.axisLandmark;
  byId("trunk-label").textContent = text.trunkLandmark;
  byId("elbow-label").textContent = text.kneeLandmark;
  stationaryArmLabel.textContent = text.stationaryArm;
  movingArmLabel.textContent = text.movingArm;
  byId("demo-title").textContent = text.movementDemo;
  checkButton.textContent = text.check;
  hintButton.textContent = text.hint;
  restartButton.textContent = text.restart;
  byId("completion-eyebrow").textContent = text.completion;
  completionTitle.textContent = text.wellDone;
  replayMotionButton.textContent = text.replayMotion;
  byId("how-title").textContent = text.how;
  byId("how-axis").textContent = text.howAxis;
  byId("how-stationary").textContent = text.howStationary;
  byId("how-moving").textContent = text.howMoving;
  byId("activity-eyebrow").textContent = text.activityEyebrow;
  byId("activity-title").textContent = text.activityTitle;
  byId("activity-note").textContent = text.activityNote;
  byId("views-label").textContent = text.views;
  byId("plays-label").textContent = text.plays;
  byId("hints-used-label").textContent = text.hintsUsed;
  byId("average-time-label").textContent = text.averageTime;
  document.querySelectorAll("[data-language]").forEach(link => {
    if (link.dataset.language === localeKey) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  updateMovementCopy();
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
  point.x = event.clientX; point.y = event.clientY;
  const ctm = svg.getScreenCTM();
  return ctm ? point.matrixTransform(ctm.inverse()) : { x: 0, y: 0 };
}

function angleFromCentre(point) { return Math.atan2(point.y - state.y, point.x - state.x) * 180 / Math.PI; }
function angleDifference(a, b) { return Math.abs(((a - b + 180) % 360 + 360) % 360 - 180); }
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
  try { const stats = await analytics?.loadStats(); if (stats) renderSiteStats(stats); } catch {}
}

function currentElapsed() { return timerStartedAt === null ? elapsedMilliseconds : elapsedMilliseconds + performance.now() - timerStartedAt; }
function updateTimer() { timeValue.textContent = formatDuration(currentElapsed()); }
function startTimer() {
  if (timerStartedAt !== null || !completionPanel.hidden) return;
  if (!playRecorded) { playRecorded = true; try { analytics?.start(); } catch {} window.setTimeout(loadSiteStats, 400); }
  timerStartedAt = performance.now();
  updateTimer();
  timerInterval = window.setInterval(updateTimer, 250);
}
function stopTimer() {
  if (timerStartedAt !== null) { elapsedMilliseconds += performance.now() - timerStartedAt; timerStartedAt = null; }
  window.clearInterval(timerInterval); timerInterval = null; updateTimer();
}
function resetTimer() { window.clearInterval(timerInterval); timerInterval = null; timerStartedAt = null; elapsedMilliseconds = 0; updateTimer(); }

function positionArmLabel(label, angle, normalOffset) {
  const radians = angle * Math.PI / 180;
  const distance = 106;
  label.setAttribute("x", (Math.cos(radians) * distance - Math.sin(radians) * normalOffset).toFixed(1));
  label.setAttribute("y", (Math.sin(radians) * distance + Math.cos(radians) * normalOffset).toFixed(1));
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

function setPoint(id, point) { const node = byId(id); node.setAttribute("cx", point.x); node.setAttribute("cy", point.y); }
function setTextPosition(id, position) { const node = byId(id); node.setAttribute("x", position[0]); node.setAttribute("y", position[1]); }

function updateMovementVisuals() {
  const current = setup();
  patientImage.setAttribute("href", current.patient);
  updateMovementFrames();
  setPoint("axis-landmark", current.axis); setPoint("axis-hint", current.axis);
  setPoint("trunk-landmark", current.trunk); setPoint("trunk-hint", current.trunk);
  setPoint("elbow-landmark", current.knee); setPoint("elbow-hint", current.knee);
  byId("axis-label-line").setAttribute("d", current.labelPaths[0]);
  byId("trunk-label-line").setAttribute("d", current.labelPaths[1]);
  byId("elbow-label-line").setAttribute("d", current.labelPaths[2]);
  setTextPosition("axis-label", current.labelPositions[0]);
  setTextPosition("trunk-label", current.labelPositions[1]);
  setTextPosition("elbow-label", current.labelPositions[2]);
}

function updateMovementCopy() {
  byId("board-label").textContent = selectedMovement === "flexion" ? text.flexionBoard : text.extensionBoard;
  byId("movement-description").textContent = movementDescription();
  byId("clinical-note").textContent = clinicalNote();
  angleLabel.textContent = selectedMovement === "flexion" ? text.hipFlexion : text.hipExtension;
  instruction.textContent = text.stage1;
  feedback.textContent = text.startFeedback;
  updateMovementVisuals();
}

function beginDrag(event, mode) {
  event.preventDefault(); startTimer(); dragMode = mode;
  const point = svgPoint(event);
  if (mode === "axis") { dragOffset.x = point.x - state.x; dragOffset.y = point.y - state.y; goniometer.classList.add("dragging"); }
  try { svg.setPointerCapture(event.pointerId); } catch {}
}

axisHandle.addEventListener("pointerdown", event => beginDrag(event, "axis"));
stationaryHandle.addEventListener("pointerdown", event => beginDrag(event, "stationary"));
movingHandle.addEventListener("pointerdown", event => beginDrag(event, "moving"));
svg.addEventListener("pointermove", event => {
  if (!dragMode) return;
  const point = svgPoint(event);
  if (dragMode === "axis" && state.stage === 1) { state.x = point.x - dragOffset.x; state.y = point.y - dragOffset.y; }
  else if (dragMode === "stationary" && state.stage >= 2) state.stationaryAngle = angleFromCentre(point);
  else if (dragMode === "moving" && state.stage >= 3) state.movingAngle = angleFromCentre(point);
  render();
});
function endDrag(event) {
  dragMode = null; goniometer.classList.remove("dragging");
  if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
}
svg.addEventListener("pointerup", endDrag);
svg.addEventListener("pointercancel", endDrag);

function checkPlacement() {
  const correct = setup();
  state.attempts += 1;
  if (state.stage === 1) {
    const distance = Math.hypot(state.x - correct.axis.x, state.y - correct.axis.y);
    if (distance <= tolerance.axisDistance) {
      state.x = correct.axis.x; state.y = correct.axis.y;
      state.score += Math.max(20, Math.round(40 - distance * 0.6)); state.stage = 2;
      instruction.textContent = text.stage2; feedback.textContent = text.axisCorrect;
    } else feedback.textContent = text.axisFar(Math.round(distance));
  } else if (state.stage === 2) {
    const error = angleDifference(state.stationaryAngle, correct.stationaryAngle);
    if (error <= tolerance.angleError) {
      state.stationaryAngle = correct.stationaryAngle; state.score += Math.max(20, Math.round(40 - error * 2)); state.stage = 3;
      instruction.textContent = text.stage3; feedback.textContent = text.stationaryCorrect;
    } else feedback.textContent = text.stationaryFar(Math.round(error));
  } else {
    const error = angleDifference(state.movingAngle, correct.movingAngle);
    if (error <= tolerance.angleError) {
      state.movingAngle = correct.movingAngle; state.score += Math.max(20, Math.round(40 - error * 2)); checkButton.disabled = true;
      instruction.textContent = text.completeTitle; feedback.textContent = text.movingCorrect; showCompletion();
    } else feedback.textContent = text.movingFar(Math.round(error));
  }
  render();
}

function setMovementDemoVisible(visible) {
  movementDemo.toggleAttribute("hidden", !visible);
  angleReadout.toggleAttribute("hidden", !visible);
  kneeMarker.toggleAttribute("hidden", visible);
}

function setMovementProgress(progress, syncGoniometer = false) {
  const clamped = Math.min(1, Math.max(0, progress));
  if (selectedMovement === "flexion") {
    const movingAngle = setup().movingAngle - setup().targetAngle * clamped;
    const sourceThighAngle = -84;
    demoLeg.setAttribute("transform", `rotate(${movingAngle - sourceThighAngle} ${setup().axis.x} ${setup().axis.y})`);
    if (syncGoniometer) {
      state.movingAngle = movingAngle;
      render();
    }
    return;
  }

  const movingAngle = setup().movingAngle - setup().targetAngle * clamped;
  const sourceLegAngle = 2;
  demoExtensionLeg.setAttribute("transform", `rotate(${movingAngle - sourceLegAngle} ${setup().axis.x} ${setup().axis.y})`);
  if (syncGoniometer) {
    state.movingAngle = movingAngle;
    render();
  }
}

function updateMovementFrames() {
  const flexion = selectedMovement === "flexion";
  demoBase.removeAttribute("hidden");
  demoLeg.toggleAttribute("hidden", !flexion);
  demoExtensionLeg.toggleAttribute("hidden", flexion);
  demoBase.setAttribute("href", setup().patient);
  setMovementProgress(0);
}

function cancelMovementDemo() {
  window.cancelAnimationFrame(motionFrame);
  motionFrame = null;
  setMovementProgress(0);
}
function playMovementDemo() {
  cancelMovementDemo(); setMovementDemoVisible(true); angleValue.textContent = "0°";
  updateMovementFrames();
  setMovementProgress(0, true);
  const target = setup().targetAngle;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setMovementProgress(1, true);
    angleValue.textContent = `${target}°`;
    return;
  }
  const duration = selectedMovement === "flexion" ? 2600 : 1800;
  let startedAt = null;
  const animate = timestamp => {
    if (startedAt === null) startedAt = timestamp;
    const progress = Math.min(1, (timestamp - startedAt) / duration);
    const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
    setMovementProgress(eased, true);
    angleValue.textContent = `${Math.round(target * eased)}°`;
    if (progress < 1) motionFrame = window.requestAnimationFrame(animate); else motionFrame = null;
  };
  motionFrame = window.requestAnimationFrame(animate);
}

function showCompletion() {
  stopTimer();
  if (!completionRecorded) { completionRecorded = true; try { analytics?.complete(); } catch {} window.setTimeout(loadSiteStats, 400); }
  const stars = state.score >= 110 ? "★★★" : state.score >= 85 ? "★★☆" : "★☆☆";
  completionTitle.textContent = text.result(stars, state.score);
  completionMessage.textContent = text.checks(state.attempts, formatDuration(elapsedMilliseconds));
  completionPanel.hidden = false;
  window.PhysioSkillsProgress?.submitCompletion({
    game_id: "hip-goniometry", score: Math.min(100, Math.round((state.score / 120) * 100)), completed: true,
    attempts: state.attempts, duration_seconds: Math.max(0, Math.round(elapsedMilliseconds / 1000)),
  });
  window.TakWingMascot?.react("correct");
  window.setTimeout(playMovementDemo, 500);
}

function showHint() {
  try { analytics?.hint(state.stage); } catch {}
  window.setTimeout(loadSiteStats, 400);
  const rings = [axisHint, trunkHint, kneeHint];
  window.clearTimeout(hintTimeout); rings.forEach(ring => ring.classList.remove("visible"));
  let activeHint = axisHint;
  if (state.stage === 1) feedback.textContent = text.axisHint;
  else if (state.stage === 2) { activeHint = trunkHint; feedback.textContent = text.stationaryHint; }
  else { activeHint = kneeHint; feedback.textContent = text.movingHint; }
  activeHint.classList.add("visible");
  hintTimeout = window.setTimeout(() => activeHint.classList.remove("visible"), 2200);
}

function restart() {
  cancelMovementDemo(); window.clearTimeout(hintTimeout); resetTimer(); state = initialState(); dragMode = null;
  try { analytics?.restart(); } catch {}
  playRecorded = false; completionRecorded = false; window.PhysioSkillsProgress?.resetCompletion();
  checkButton.disabled = false; completionPanel.hidden = true;
  [axisHint, trunkHint, kneeHint].forEach(ring => ring.classList.remove("visible"));
  setMovementDemoVisible(false); updateMovementCopy(); render();
}

function selectMovement(mode) {
  if (mode === selectedMovement) return;
  selectedMovement = mode;
  modeButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
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
