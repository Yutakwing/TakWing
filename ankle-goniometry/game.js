const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const localeKey = ["zh-hant", "zh-hans"].includes(requestedLanguage) ? requestedLanguage : "en";

const copy = {
  en: {
    lang: "en", back: "← Back to resources", eyebrow: "Physiotherapy Skills Mini-Game",
    title: "Ankle Goniometry Challenge", languageAria: "Language", progressAria: "Game progress",
    darkMode: "Dark mode", lightMode: "Light mode",
    intro: "Position the goniometer to measure ankle dorsiflexion using the lateral malleolus, fibular head, and fifth metatarsal.",
    stage: "Stage", score: "Score", attempts: "Attempts", time: "Time",
    board: "Supported long sitting · heel free",
    boardAria: "Side view of a supported human lower leg and foot with the heel free and an interactive ankle goniometer",
    fibularHead: "Fibular head", lateralMalleolus: "Lateral malleolus", fifthMetatarsal: "Fifth metatarsal",
    check: "Check placement", hint: "Show hint", restart: "Restart", completion: "Challenge complete",
    wellDone: "Well done", stationaryArm: "Stationary arm", movingArm: "Moving arm",
    movementDemo: "Movement demonstration", plantarflexion: "Plantarflexion", dorsiflexion: "Dorsiflexion",
    neutral: "Neutral", replayMotion: "Replay movement",
    movementDescription: "Watch the foot move around the ankle from slight plantarflexion through neutral to approximately 20° dorsiflexion.",
    how: "How to play",
    howAxis: "Place the axis over the lateral malleolus.",
    howStationary: "Align the stationary arm with the lateral midline of the fibula towards the fibular head.",
    howMoving: "Align the moving arm parallel to the lateral aspect of the fifth metatarsal.",
    clinicalNote: "Practice note: stabilise the lower leg and avoid substituting movement through the midfoot.",
    stage1: "Stage 1: Place the axis", stage2: "Stage 2: Align the stationary arm",
    stage3: "Stage 3: Align the moving arm", completeTitle: "Challenge complete",
    startFeedback: "Drag the blue centre onto the lateral malleolus.",
    axisCorrect: "Correct. Align the green arm with the fibula towards the fibular head.",
    axisFar: distance => `The axis is about ${distance} pixels from the lateral malleolus.`,
    stationaryCorrect: "Correct. Align the dark arm parallel to the fifth metatarsal.",
    stationaryFar: error => `The stationary arm is about ${error}° away from the fibular line.`,
    movingCorrect: "The goniometer is correctly aligned.",
    movingFar: error => `The moving arm is about ${error}° away from the fifth-metatarsal line.`,
    result: (stars, score) => `${stars} Final score: ${score}`,
    checks: (attempts, duration) => `Completed in ${attempts} checks over ${duration}.`,
    axisHint: "Hint: place the centre over the lateral malleolus.",
    stationaryHint: "Hint: point the green arm towards the fibular head.",
    movingHint: "Hint: align the dark arm parallel to the fifth metatarsal.",
    activityEyebrow: "Site activity", activityTitle: "Challenge participation",
    activityNote: "Anonymous totals across all visitors.", views: "Page views", plays: "Games played",
    hintsUsed: "Hints used", averageTime: "Average correct completion",
  },
  "zh-hant": {
    lang: "zh-Hant", back: "← 返回資源", eyebrow: "物理治療技能小遊戲",
    title: "踝關節量角器挑戰", languageAria: "語言", progressAria: "遊戲進度",
    darkMode: "深色模式", lightMode: "淺色模式",
    intro: "運用外踝、腓骨頭及第五蹠骨等解剖標誌，放置量角器以測量踝關節背屈。",
    stage: "階段", score: "分數", attempts: "嘗試次數", time: "時間",
    board: "支撐長坐姿 · 足跟懸空", boardAria: "支撐長坐姿下的人體小腿與足部側面，足跟懸空並配有互動式踝關節量角器",
    fibularHead: "腓骨頭", lateralMalleolus: "外踝", fifthMetatarsal: "第五蹠骨",
    check: "檢查位置", hint: "顯示提示", restart: "重新開始", completion: "挑戰完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移動臂",
    movementDemo: "活動示範", plantarflexion: "蹠屈", dorsiflexion: "背屈", neutral: "中立位",
    replayMotion: "重播活動",
    movementDescription: "觀看足部以踝關節為軸，由輕微蹠屈經過中立位移向約 20° 背屈。",
    how: "玩法", howAxis: "把中心軸放在外踝上。",
    howStationary: "把固定臂沿腓骨外側中線對準腓骨頭。",
    howMoving: "把移動臂平行對準第五蹠骨外側。",
    clinicalNote: "練習提示：穩定小腿，避免以中足活動代償。",
    stage1: "階段 1：放置中心軸", stage2: "階段 2：對準固定臂", stage3: "階段 3：對準移動臂",
    completeTitle: "挑戰完成", startFeedback: "把藍色中心拖到外踝上。",
    axisCorrect: "正確。把綠色固定臂沿腓骨對準腓骨頭。",
    axisFar: distance => `中心軸距離外踝約 ${distance} 像素。`,
    stationaryCorrect: "正確。把深色移動臂平行對準第五蹠骨。",
    stationaryFar: error => `固定臂與腓骨線相差約 ${error}°。`, movingCorrect: "量角器已正確對準。",
    movingFar: error => `移動臂與第五蹠骨線相差約 ${error}°。`,
    result: (stars, score) => `${stars} 最終分數：${score}`,
    checks: (attempts, duration) => `完成時共檢查 ${attempts} 次，用時 ${duration}。`,
    axisHint: "提示：把中心放在外踝上。", stationaryHint: "提示：把綠色固定臂指向腓骨頭。",
    movingHint: "提示：把深色移動臂平行對準第五蹠骨。",
    activityEyebrow: "網站活動", activityTitle: "挑戰參與情況", activityNote: "所有訪客的匿名總計。",
    views: "頁面瀏覽次數", plays: "遊玩次數", hintsUsed: "提示使用次數", averageTime: "平均正確完成時間",
  },
  "zh-hans": {
    lang: "zh-Hans", back: "← 返回资源", eyebrow: "物理治疗技能小游戏",
    title: "踝关节量角器挑战", languageAria: "语言", progressAria: "游戏进度",
    darkMode: "深色模式", lightMode: "浅色模式",
    intro: "运用外踝、腓骨头及第五跖骨等解剖标志，放置量角器以测量踝关节背屈。",
    stage: "阶段", score: "分数", attempts: "尝试次数", time: "时间",
    board: "支撑长坐姿 · 足跟悬空", boardAria: "支撑长坐姿下的人体小腿与足部侧面，足跟悬空并配有互动式踝关节量角器",
    fibularHead: "腓骨头", lateralMalleolus: "外踝", fifthMetatarsal: "第五跖骨",
    check: "检查位置", hint: "显示提示", restart: "重新开始", completion: "挑战完成",
    wellDone: "做得好", stationaryArm: "固定臂", movingArm: "移动臂",
    movementDemo: "活动示范", plantarflexion: "跖屈", dorsiflexion: "背屈", neutral: "中立位",
    replayMotion: "重播活动",
    movementDescription: "观看足部以踝关节为轴，由轻微跖屈经过中立位移向约 20° 背屈。",
    how: "玩法", howAxis: "把中心轴放在外踝上。",
    howStationary: "把固定臂沿腓骨外侧中线对准腓骨头。",
    howMoving: "把移动臂平行对准第五跖骨外侧。",
    clinicalNote: "练习提示：稳定小腿，避免以中足活动代偿。",
    stage1: "阶段 1：放置中心轴", stage2: "阶段 2：对准固定臂", stage3: "阶段 3：对准移动臂",
    completeTitle: "挑战完成", startFeedback: "把蓝色中心拖到外踝上。",
    axisCorrect: "正确。把绿色固定臂沿腓骨对准腓骨头。",
    axisFar: distance => `中心轴距离外踝约 ${distance} 像素。`,
    stationaryCorrect: "正确。把深色移动臂平行对准第五跖骨。",
    stationaryFar: error => `固定臂与腓骨线相差约 ${error}°。`, movingCorrect: "量角器已正确对准。",
    movingFar: error => `移动臂与第五跖骨线相差约 ${error}°。`,
    result: (stars, score) => `${stars} 最终分数：${score}`,
    checks: (attempts, duration) => `完成时共检查 ${attempts} 次，用时 ${duration}。`,
    axisHint: "提示：把中心放在外踝上。", stationaryHint: "提示：把绿色固定臂指向腓骨头。",
    movingHint: "提示：把深色移动臂平行对准第五跖骨。",
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
const fibularHint = byId("fibular-hint");
const metatarsalHint = byId("metatarsal-hint");
const footGroup = byId("foot-group");
const footCover = byId("foot-cover");
const movingFoot = byId("moving-foot");
const metatarsalMarker = byId("metatarsal-marker");
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
  byId("stage-label").textContent = text.stage;
  byId("score-label").textContent = text.score;
  byId("attempt-label").textContent = text.attempts;
  byId("time-label").textContent = text.time;
  byId("board-label").textContent = text.board;
  svg.setAttribute("aria-label", text.boardAria);
  byId("fibular-label").textContent = text.fibularHead;
  byId("malleolus-label").textContent = text.lateralMalleolus;
  byId("metatarsal-label").textContent = text.fifthMetatarsal;
  stationaryArmLabel.textContent = text.stationaryArm;
  movingArmLabel.textContent = text.movingArm;
  byId("demo-title").textContent = text.movementDemo;
  checkButton.textContent = text.check;
  hintButton.textContent = text.hint;
  restartButton.textContent = text.restart;
  byId("completion-eyebrow").textContent = text.completion;
  completionTitle.textContent = text.wellDone;
  byId("movement-description").textContent = text.movementDescription;
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

const correct = { axis: { x: 297, y: 483 }, stationaryAngle: -28, movingAngle: -134 };
const tolerance = { axisDistance: 32, angleError: 9 };
const analytics = window.TakWingGameAnalytics?.create("ankle-goniometry");
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
  return { stage: 1, x: 470, y: 190, stationaryAngle: 180, movingAngle: -135, score: 0, attempts: 0 };
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
  try {
    svg.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture is an enhancement; dragging still works without it.
  }
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
    } else {
      feedback.textContent = text.axisFar(Math.round(distance));
    }
  } else if (state.stage === 2) {
    const error = angleDifference(state.stationaryAngle, correct.stationaryAngle);
    if (error <= tolerance.angleError) {
      state.stationaryAngle = correct.stationaryAngle;
      state.score += Math.max(20, Math.round(40 - error * 2));
      state.stage = 3;
      instruction.textContent = text.stage3;
      feedback.textContent = text.stationaryCorrect;
    } else {
      feedback.textContent = text.stationaryFar(Math.round(error));
    }
  } else {
    const error = angleDifference(state.movingAngle, correct.movingAngle);
    if (error <= tolerance.angleError) {
      state.movingAngle = correct.movingAngle;
      state.score += Math.max(20, Math.round(40 - error * 2));
      checkButton.disabled = true;
      instruction.textContent = text.completeTitle;
      feedback.textContent = text.movingCorrect;
      showCompletion();
    } else {
      feedback.textContent = text.movingFar(Math.round(error));
    }
  }
  render();
}

function setMovementDemoVisible(visible) {
  angleReadout.toggleAttribute("hidden", !visible);
  footCover.toggleAttribute("hidden", !visible);
  movingFoot.toggleAttribute("hidden", !visible);
  metatarsalMarker.toggleAttribute("hidden", visible);
}

function setMovementProgress(progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  const footRotation = 34 * clamped;
  footGroup.setAttribute("transform", `rotate(${footRotation} ${correct.axis.x} ${correct.axis.y})`);
  state.movingAngle = correct.movingAngle + footRotation;
  const signedAngle = 14 - 34 * clamped;
  if (Math.abs(signedAngle) < 0.5) {
    angleLabel.textContent = text.neutral;
    angleValue.textContent = "0°";
  } else if (signedAngle > 0) {
    angleLabel.textContent = text.plantarflexion;
    angleValue.textContent = `${Math.round(signedAngle)}°`;
  } else {
    angleLabel.textContent = text.dorsiflexion;
    angleValue.textContent = `${Math.round(Math.abs(signedAngle))}°`;
  }
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
  const duration = 4200;
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
  completionPanel.hidden = false;
  window.PhysioSkillsProgress?.submitCompletion({
    game_id: "ankle-goniometry",
    score: Math.min(100, Math.round((state.score / 120) * 100)),
    completed: true,
    attempts: state.attempts,
    duration_seconds: Math.max(0, Math.round(elapsedMilliseconds / 1000)),
  });
  window.reactToAssistantEvent?.("success", { message: text.movingCorrect });
  setMovementDemoVisible(true);
  setMovementProgress(0);
  motionDelay = window.setTimeout(playMovementDemo, 500);
}

function showHint() {
  try { analytics?.hint(state.stage); } catch {}
  window.setTimeout(loadSiteStats, 400);
  const rings = [axisHint, fibularHint, metatarsalHint];
  window.clearTimeout(hintTimeout);
  rings.forEach(ring => ring.classList.remove("visible"));
  let activeHint = axisHint;
  if (state.stage === 1) {
    feedback.textContent = text.axisHint;
  } else if (state.stage === 2) {
    activeHint = fibularHint;
    feedback.textContent = text.stationaryHint;
  } else {
    activeHint = metatarsalHint;
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
  [axisHint, fibularHint, metatarsalHint].forEach(ring => ring.classList.remove("visible"));
  footGroup.setAttribute("transform", `rotate(0 ${correct.axis.x} ${correct.axis.y})`);
  setMovementDemoVisible(false);
  instruction.textContent = text.stage1;
  feedback.textContent = text.startFeedback;
  render();
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
