const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const localeKey = ["zh-hant", "zh-hans"].includes(requestedLanguage) ? requestedLanguage : "en";

const copy = {
  en: {
    lang: "en", back: "← Back to resources", eyebrow: "Physiotherapy Skills Mini-Game",
    title: "Knee Goniometry Challenge", languageAria: "Language", progressAria: "Game progress",
    darkMode: "Dark mode", lightMode: "Light mode",
    intro: "Position the goniometer for knee flexion using reliable anatomical landmarks.",
    measurement: "Measurement", measurementTitle: "Knee flexion",
    stage: "Stage", score: "Score", attempts: "Attempts", time: "Time",
    flexionBoard: "Prone · hip neutral · knee initially extended",
    boardAria: "Side view of a patient positioned for interactive knee goniometry",
    axisLandmark: "Lateral femoral epicondyle", trunkLandmark: "Greater trochanter", kneeLandmark: "Lateral malleolus",
    check: "Check placement", hint: "Show hint", restart: "Restart", completion: "Challenge complete",
    wellDone: "Well done", stationaryArm: "Stationary arm", movingArm: "Moving arm",
    movementDemo: "Movement demonstration", kneeFlexion: "Knee flexion",
    replayMotion: "Replay movement",
    flexionDescription: "Watch the lower leg move from neutral to approximately 135° knee flexion while the hip remains neutral and the thigh stays on the plinth.",
    how: "How to play", howAxis: "Place the axis over the lateral femoral epicondyle.",
    howStationary: "Align the stationary arm with the lateral midline of the femur towards the greater trochanter.",
    howMoving: "Align the moving arm with the lateral midline of the fibula towards the lateral malleolus.",
    flexionClinical: "Practice note: position the patient prone with the hip in neutral rotation. Keep the thigh on the plinth and flex the knee without allowing hip flexion or rotation.",
    stage1: "Stage 1: Place the axis", stage2: "Stage 2: Align the stationary arm",
    stage3: "Stage 3: Align the moving arm", completeTitle: "Challenge complete",
    startFeedback: "Drag the blue centre onto the lateral femoral epicondyle.",
    axisCorrect: "Correct. Align the green arm along the lateral midline of the femur towards the greater trochanter.",
    axisFar: distance => `The axis is about ${distance} pixels from the lateral femoral epicondyle.`,
    stationaryCorrect: "Correct. Align the dark arm along the lateral midline of the fibula towards the lateral malleolus.",
    stationaryFar: error => `The stationary arm is about ${error}° away from the lateral femoral line.`,
    movingCorrect: "The goniometer is correctly aligned.",
    movingFar: error => `The moving arm is about ${error}° away from the lateral fibular line.`,
    result: (stars, score) => `${stars} Final score: ${score}`,
    checks: (attempts, duration) => `Completed in ${attempts} checks over ${duration}.`,
    axisHint: "Hint: place the centre over the lateral femoral epicondyle.",
    stationaryHint: "Hint: point the green arm towards the greater trochanter.",
    movingHint: "Hint: point the dark arm towards the lateral malleolus.",
    activityEyebrow: "Site activity", activityTitle: "Challenge participation",
    activityNote: "Anonymous totals across all visitors.", views: "Page views", plays: "Games played",
    hintsUsed: "Hints used", averageTime: "Average correct completion",
  },
  "zh-hant": {
    lang: "zh-Hant", back: "← 返回資源", eyebrow: "物理治療技能小遊戲",
    title: "膝關節量角器挑戰", languageAria: "語言", progressAria: "遊戲進度",
    darkMode: "深色模式", lightMode: "淺色模式",
    intro: "運用可靠的解剖標誌，放置量角器以量度膝關節屈曲。",
    measurement: "測量項目", measurementTitle: "膝關節屈曲",
    stage: "階段", score: "分數", attempts: "嘗試次數", time: "時間",
    flexionBoard: "俯臥位 · 髖關節中立 · 膝關節初始伸直",
    boardAria: "患者側面及互動式膝關節量角器",
    axisLandmark: "股骨外上髁", trunkLandmark: "股骨大轉子", kneeLandmark: "外踝",
    check: "檢查位置", hint: "顯示提示", restart: "重新開始", completion: "挑戰完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移動臂",
    movementDemo: "活動示範", kneeFlexion: "膝關節屈曲", replayMotion: "重播活動",
    flexionDescription: "觀看小腿由中立位移至約 135° 膝關節屈曲，同時保持髖關節中立及大腿貼在治療床上。",
    how: "玩法", howAxis: "把中心軸放在股骨外上髁。", howStationary: "把固定臂沿股骨外側中線指向股骨大轉子。",
    howMoving: "把移動臂沿腓骨外側中線指向外踝。",
    flexionClinical: "練習提示：患者採俯臥位，髖關節保持中立。屈曲膝關節時保持大腿貼在治療床上，避免髖關節屈曲或旋轉。",
    stage1: "階段 1：放置中心軸", stage2: "階段 2：對準固定臂", stage3: "階段 3：對準移動臂",
    completeTitle: "挑戰完成", startFeedback: "把藍色中心拖到股骨外上髁。",
    axisCorrect: "正確。把綠色固定臂沿股骨外側中線指向股骨大轉子。", axisFar: distance => `中心軸距離股骨外上髁約 ${distance} 像素。`,
    stationaryCorrect: "正確。把深色移動臂沿腓骨外側中線指向外踝。",
    stationaryFar: error => `固定臂與股骨外側中線相差約 ${error}°。`, movingCorrect: "量角器已正確對準。",
    movingFar: error => `移動臂與腓骨外側中線相差約 ${error}°。`,
    result: (stars, score) => `${stars} 最終分數：${score}`,
    checks: (attempts, duration) => `完成時共檢查 ${attempts} 次，用時 ${duration}。`,
    axisHint: "提示：把中心放在股骨外上髁。", stationaryHint: "提示：把綠色固定臂指向股骨大轉子。",
    movingHint: "提示：把深色移動臂指向外踝。",
    activityEyebrow: "網站活動", activityTitle: "挑戰參與情況", activityNote: "所有訪客的匿名總計。",
    views: "頁面瀏覽次數", plays: "遊玩次數", hintsUsed: "提示使用次數", averageTime: "平均正確完成時間",
  },
  "zh-hans": {
    lang: "zh-Hans", back: "← 返回资源", eyebrow: "物理治疗技能小游戏",
    title: "膝关节量角器挑战", languageAria: "语言", progressAria: "游戏进度",
    darkMode: "深色模式", lightMode: "浅色模式",
    intro: "运用可靠的解剖标志，放置量角器以测量膝关节屈曲。",
    measurement: "测量项目", measurementTitle: "膝关节屈曲",
    stage: "阶段", score: "分数", attempts: "尝试次数", time: "时间",
    flexionBoard: "俯卧位 · 髋关节中立 · 膝关节初始伸直",
    boardAria: "患者侧面及互动式膝关节量角器",
    axisLandmark: "股骨外上髁", trunkLandmark: "股骨大转子", kneeLandmark: "外踝",
    check: "检查位置", hint: "显示提示", restart: "重新开始", completion: "挑战完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移动臂",
    movementDemo: "活动示范", kneeFlexion: "膝关节屈曲", replayMotion: "重播活动",
    flexionDescription: "观看小腿由中立位移至约 135° 膝关节屈曲，同时保持髋关节中立及大腿贴在治疗床上。",
    how: "玩法", howAxis: "把中心轴放在股骨外上髁。", howStationary: "把固定臂沿股骨外侧中线指向股骨大转子。",
    howMoving: "把移动臂沿腓骨外侧中线指向外踝。",
    flexionClinical: "练习提示：患者采用俯卧位，髋关节保持中立。屈曲膝关节时保持大腿贴在治疗床上，避免髋关节屈曲或旋转。",
    stage1: "阶段 1：放置中心轴", stage2: "阶段 2：对准固定臂", stage3: "阶段 3：对准移动臂",
    completeTitle: "挑战完成", startFeedback: "把蓝色中心拖到股骨外上髁。",
    axisCorrect: "正确。把绿色固定臂沿股骨外侧中线指向股骨大转子。", axisFar: distance => `中心轴距离股骨外上髁约 ${distance} 像素。`,
    stationaryCorrect: "正确。把深色移动臂沿腓骨外侧中线指向外踝。",
    stationaryFar: error => `固定臂与股骨外侧中线相差约 ${error}°。`, movingCorrect: "量角器已正确对准。",
    movingFar: error => `移动臂与腓骨外侧中线相差约 ${error}°。`,
    result: (stars, score) => `${stars} 最终分数：${score}`,
    checks: (attempts, duration) => `完成时共检查 ${attempts} 次，用时 ${duration}。`,
    axisHint: "提示：把中心放在股骨外上髁。", stationaryHint: "提示：把绿色固定臂指向股骨大转子。",
    movingHint: "提示：把深色移动臂指向外踝。",
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

const movementSetups = {
  flexion: {
    patient: "knee-neutral.webp",
    axis: { x: 558, y: 357 }, trunk: { x: 405, y: 350 }, knee: { x: 782, y: 366 },
    stationaryAngle: 183, movingAngle: 2, targetAngle: 135,
    demoStartAngle: 2, demoEndAngle: -133,
    labelPaths: ["M548 344 L500 292", "M393 341 L315 298", "M792 355 L826 315"],
    labelPositions: [[355, 286], [176, 293], [700, 305]],
  },
};

const tolerance = { axisDistance: 34, angleError: 10 };
const analytics = window.TakWingGameAnalytics?.create("knee-goniometry");
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

function setup() { return movementSetups.flexion; }
function initialState() { return { stage: 1, x: 700, y: 145, stationaryAngle: 110, movingAngle: -30, score: 0, attempts: 0 }; }
function movementDescription() { return text.flexionDescription; }
function clinicalNote() { return text.flexionClinical; }

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
  byId("movement-choice-title").textContent = text.measurementTitle;
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
  byId("board-label").textContent = text.flexionBoard;
  byId("movement-description").textContent = movementDescription();
  byId("clinical-note").textContent = clinicalNote();
  angleLabel.textContent = text.kneeFlexion;
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
  const movingAngle = setup().demoStartAngle + (setup().demoEndAngle - setup().demoStartAngle) * clamped;
  demoLeg.setAttribute("transform", `rotate(${movingAngle - setup().movingAngle} ${setup().axis.x} ${setup().axis.y})`);
  if (syncGoniometer) {
    state.movingAngle = movingAngle;
    render();
  }
}

function updateMovementFrames() {
  demoBase.removeAttribute("hidden");
  demoLeg.removeAttribute("hidden");
  demoBase.setAttribute("href", "knee-demo-base.webp");
  setMovementProgress(0);
}

function cancelMovementDemo() {
  window.cancelAnimationFrame(motionFrame);
  motionFrame = null;
  setMovementProgress(0);
}
function playMovementDemo() {
  cancelMovementDemo(); setMovementDemoVisible(true);
  angleValue.textContent = "0°";
  updateMovementFrames();
  setMovementProgress(0, true);
  const target = setup().targetAngle;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setMovementProgress(1, true);
    angleValue.textContent = `${target}°`;
    return;
  }
  const duration = 2600;
  let startedAt = null;
  const animate = timestamp => {
    if (startedAt === null) startedAt = timestamp;
    const progress = Math.min(1, (timestamp - startedAt) / duration);
    const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
    setMovementProgress(eased, true);
    const displayedAngle = target * eased;
    angleValue.textContent = `${Math.round(displayedAngle)}°`;
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
    game_id: "knee-goniometry", score: Math.min(100, Math.round((state.score / 120) * 100)), completed: true,
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

svg.addEventListener("pointerdown", startTimer);
checkButton.addEventListener("click", () => { startTimer(); checkPlacement(); });
hintButton.addEventListener("click", () => { startTimer(); showHint(); });
restartButton.addEventListener("click", restart);
replayMotionButton.addEventListener("click", playMovementDemo);
themeToggle.addEventListener("click", toggleTheme);
localisePage();
resetTimer();
render();
window.setTimeout(loadSiteStats, 400);
