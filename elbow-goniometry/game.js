const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const localeKey = ["zh-hant", "zh-hans"].includes(requestedLanguage) ? requestedLanguage : "en";
const copy = {
  en: {
    lang: "en", back: "← Back to portfolio", eyebrow: "Physiotherapy Skills Mini-Game",
    title: "Elbow Goniometry Challenge", languageAria: "Language", progressAria: "Game progress", darkMode: "Dark mode", lightMode: "Light mode",
    intro: "Position the goniometer for elbow extension. Drag the centre, stationary arm, and moving arm directly with the mouse or touchscreen.",
    stage: "Stage", score: "Score", attempts: "Attempts", time: "Time", board: "Starting position: approximately 99° elbow flexion",
    boardAria: "Human arm in elbow flexion with an interactive goniometer", acromion: "Acromion",
    epicondyle: "Lateral epicondyle", styloid: "Radial styloid", check: "Check placement",
    hint: "Show hint", restart: "Restart", completion: "Challenge complete", wellDone: "Well done",
    stationaryArm: "Stationary arm", movingArm: "Moving arm", movementDemo: "Movement demonstration",
    elbowFlexion: "Elbow flexion", replayMotion: "Replay movement",
    movementDescription: "Watch the forearm and the goniometer's moving arm travel from approximately 99° flexion towards 0° full extension.",
    how: "How to play", howAxis: "Drag the blue central circle onto the lateral epicondyle.",
    howStationary: "Drag the green stationary-arm handle towards the acromion.",
    howMoving: "Drag the dark moving-arm handle towards the radial styloid.",
    stage1: "Stage 1: Place the axis", stage2: "Stage 2: Align the stationary arm",
    stage3: "Stage 3: Align the moving arm", completeTitle: "Challenge complete",
    startFeedback: "Drag the blue centre of the goniometer onto the lateral epicondyle.",
    axisCorrect: "Correct. Drag the green handle towards the acromion.",
    axisFar: (distance) => `The axis is about ${distance} pixels from the lateral epicondyle.`,
    stationaryCorrect: "Correct. Drag the dark handle towards the radial styloid.",
    stationaryFar: (error) => `The stationary arm is about ${error}° away from the humeral line.`,
    movingCorrect: "The goniometer is correctly aligned.",
    movingFar: (error) => `The moving arm is about ${error}° away from the forearm line.`,
    result: (stars, score) => `${stars} Final score: ${score}`,
    checks: (attempts, duration) => `Completed in ${attempts} checks over ${duration}.`,
    axisHint: "Hint: place the centre on the lateral epicondyle.",
    stationaryHint: "Hint: drag the green handle towards the acromion.",
    movingHint: "Hint: drag the dark handle towards the radial styloid.",
    activityEyebrow: "Site activity", activityTitle: "Challenge participation",
    activityNote: "Anonymous totals across all visitors.", views: "Page views", plays: "Games played", hintsUsed: "Hints used",
    averageTime: "Average correct completion",
  },
  "zh-hant": {
    lang: "zh-Hant", back: "← 返回作品集", eyebrow: "物理治療技能小遊戲",
    title: "肘關節量角器挑戰", languageAria: "語言", progressAria: "遊戲進度", darkMode: "深色模式", lightMode: "淺色模式",
    intro: "為肘關節伸展測量放置量角器。使用滑鼠或觸控操作，直接拖動中心軸、固定臂及移動臂。",
    stage: "階段", score: "分數", attempts: "嘗試次數", time: "時間", board: "起始姿勢：肘關節屈曲約 99°",
    boardAria: "肘關節屈曲的人體手臂及互動式量角器", acromion: "肩峰",
    epicondyle: "肱骨外上髁", styloid: "橈骨莖突", check: "檢查位置",
    hint: "顯示提示", restart: "重新開始", completion: "挑戰完成", wellDone: "做得好",
    stationaryArm: "固定臂", movingArm: "移動臂", movementDemo: "肘關節活動示範",
    elbowFlexion: "肘關節屈曲", replayMotion: "重播活動",
    movementDescription: "觀看前臂及量角器的移動臂由約 99° 屈曲移向 0° 完全伸展。",
    how: "玩法", howAxis: "把藍色中心圓拖到肱骨外上髁。",
    howStationary: "把綠色固定臂把手拖向肩峰。", howMoving: "把深色移動臂把手拖向橈骨莖突。",
    stage1: "階段 1：放置中心軸", stage2: "階段 2：對準固定臂",
    stage3: "階段 3：對準移動臂", completeTitle: "挑戰完成",
    startFeedback: "把量角器的藍色中心拖到肱骨外上髁。",
    axisCorrect: "正確。把綠色把手拖向肩峰。", axisFar: (distance) => `中心軸距離肱骨外上髁約 ${distance} 像素。`,
    stationaryCorrect: "正確。把深色把手拖向橈骨莖突。",
    stationaryFar: (error) => `固定臂與肱骨線相差約 ${error}°。`, movingCorrect: "量角器已正確對準。",
    movingFar: (error) => `移動臂與前臂線相差約 ${error}°。`, result: (stars, score) => `${stars} 最終分數：${score}`,
    checks: (attempts, duration) => `完成時共檢查 ${attempts} 次，用時 ${duration}。`, axisHint: "提示：把中心放在肱骨外上髁。",
    stationaryHint: "提示：把綠色把手拖向肩峰。", movingHint: "提示：把深色把手拖向橈骨莖突。",
    activityEyebrow: "網站活動", activityTitle: "挑戰參與情況",
    activityNote: "所有訪客的匿名總計。", views: "頁面瀏覽次數", plays: "遊玩次數", hintsUsed: "提示使用次數",
    averageTime: "平均正確完成時間",
  },
  "zh-hans": {
    lang: "zh-Hans", back: "← 返回作品集", eyebrow: "物理治疗技能小游戏",
    title: "肘关节量角器挑战", languageAria: "语言", progressAria: "游戏进度", darkMode: "深色模式", lightMode: "浅色模式",
    intro: "为肘关节伸展测量放置量角器。使用鼠标或触控操作，直接拖动中心轴、固定臂及移动臂。",
    stage: "阶段", score: "分数", attempts: "尝试次数", time: "时间", board: "起始姿势：肘关节屈曲约 99°",
    boardAria: "肘关节屈曲的人体手臂及互动式量角器", acromion: "肩峰",
    epicondyle: "肱骨外上髁", styloid: "桡骨茎突", check: "检查位置",
    hint: "显示提示", restart: "重新开始", completion: "挑战完成", wellDone: "做得好",
    stationaryArm: "固定臂", movingArm: "移动臂", movementDemo: "肘关节活动示范",
    elbowFlexion: "肘关节屈曲", replayMotion: "重播活动",
    movementDescription: "观看前臂及量角器的移动臂由约 99° 屈曲移向 0° 完全伸展。",
    how: "玩法", howAxis: "把蓝色中心圆拖到肱骨外上髁。",
    howStationary: "把绿色固定臂把手拖向肩峰。", howMoving: "把深色移动臂把手拖向桡骨茎突。",
    stage1: "阶段 1：放置中心轴", stage2: "阶段 2：对准固定臂",
    stage3: "阶段 3：对准移动臂", completeTitle: "挑战完成",
    startFeedback: "把量角器的蓝色中心拖到肱骨外上髁。",
    axisCorrect: "正确。把绿色把手拖向肩峰。", axisFar: (distance) => `中心轴距离肱骨外上髁约 ${distance} 像素。`,
    stationaryCorrect: "正确。把深色把手拖向桡骨茎突。",
    stationaryFar: (error) => `固定臂与肱骨线相差约 ${error}°。`, movingCorrect: "量角器已正确对准。",
    movingFar: (error) => `移动臂与前臂线相差约 ${error}°。`, result: (stars, score) => `${stars} 最终分数：${score}`,
    checks: (attempts, duration) => `完成时共检查 ${attempts} 次，用时 ${duration}。`, axisHint: "提示：把中心放在肱骨外上髁。",
    stationaryHint: "提示：把绿色把手拖向肩峰。", movingHint: "提示：把深色把手拖向桡骨茎突。",
    activityEyebrow: "网站活动", activityTitle: "挑战参与情况",
    activityNote: "所有访客的匿名总计。", views: "页面浏览次数", plays: "游玩次数", hintsUsed: "提示使用次数",
    averageTime: "平均正确完成时间",
  },
};
const text = copy[localeKey];

const svg = document.getElementById("game-board");
const goniometer = document.getElementById("goniometer");
const axisHandle = document.getElementById("axis-handle");
const stationaryArm = document.getElementById("stationary-arm");
const movingArm = document.getElementById("moving-arm");
const stationaryHandle = document.getElementById("stationary-handle");
const movingHandle = document.getElementById("moving-handle");
const axisHint = document.getElementById("axis-hint");
const acromionHint = document.getElementById("acromion-hint");
const styloidHint = document.getElementById("styloid-hint");
const stationaryArmLabel = document.getElementById("stationary-arm-label");
const movingArmLabel = document.getElementById("moving-arm-label");
const forearmCover = document.getElementById("forearm-cover");
const movingForearm = document.getElementById("moving-forearm");
const styloidMarker = document.getElementById("styloid-marker");
const angleReadout = document.getElementById("angle-readout");
const angleValue = document.getElementById("angle-value");

const stageValue = document.getElementById("stage-value");
const scoreValue = document.getElementById("score-value");
const attemptValue = document.getElementById("attempt-value");
const timeValue = document.getElementById("time-value");
const instruction = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const checkButton = document.getElementById("check-button");
const hintButton = document.getElementById("hint-button");
const restartButton = document.getElementById("restart-button");
const completionPanel = document.getElementById("completion-panel");
const completionTitle = document.getElementById("completion-title");
const completionMessage = document.getElementById("completion-message");
const replayMotionButton = document.getElementById("replay-motion");
const themeToggle = document.getElementById("theme-toggle");
const viewsValue = document.getElementById("views-value");
const playsValue = document.getElementById("plays-value");
const hintsUsedValue = document.getElementById("hints-used-value");
const averageTimeValue = document.getElementById("average-time-value");

function localisePage() {
  document.documentElement.lang = text.lang;
  document.title = `${text.title} | Tak Wing Yu`;
  document.getElementById("back-link").href = localeKey === "en" ? "../index.html" : `../${localeKey}/resources.html`;
  document.getElementById("back-link").textContent = text.back;
  document.getElementById("game-eyebrow").textContent = text.eyebrow;
  document.getElementById("game-title").textContent = text.title;
  document.getElementById("game-intro").textContent = text.intro;
  document.querySelector('meta[name="description"]').content = text.intro;
  document.getElementById("language-nav").setAttribute("aria-label", text.languageAria);
  document.getElementById("status-grid").setAttribute("aria-label", text.progressAria);
  document.getElementById("stage-label").textContent = text.stage;
  document.getElementById("score-label").textContent = text.score;
  document.getElementById("attempt-label").textContent = text.attempts;
  document.getElementById("time-label").textContent = text.time;
  document.getElementById("board-label").textContent = text.board;
  svg.setAttribute("aria-label", text.boardAria);
  document.getElementById("acromion-label").textContent = text.acromion;
  document.getElementById("epicondyle-label").textContent = text.epicondyle;
  document.getElementById("styloid-label").textContent = text.styloid;
  stationaryArmLabel.textContent = text.stationaryArm;
  movingArmLabel.textContent = text.movingArm;
  document.getElementById("demo-title").textContent = text.movementDemo;
  document.getElementById("angle-label").textContent = text.elbowFlexion;
  checkButton.textContent = text.check;
  hintButton.textContent = text.hint;
  restartButton.textContent = text.restart;
  document.getElementById("completion-eyebrow").textContent = text.completion;
  completionTitle.textContent = text.wellDone;
  document.getElementById("movement-description").textContent = text.movementDescription;
  replayMotionButton.textContent = text.replayMotion;
  document.getElementById("how-title").textContent = text.how;
  document.getElementById("how-axis").textContent = text.howAxis;
  document.getElementById("how-stationary").textContent = text.howStationary;
  document.getElementById("how-moving").textContent = text.howMoving;
  document.getElementById("activity-eyebrow").textContent = text.activityEyebrow;
  document.getElementById("activity-title").textContent = text.activityTitle;
  document.getElementById("activity-note").textContent = text.activityNote;
  document.getElementById("views-label").textContent = text.views;
  document.getElementById("plays-label").textContent = text.plays;
  document.getElementById("hints-used-label").textContent = text.hintsUsed;
  document.getElementById("average-time-label").textContent = text.averageTime;
  updateThemeButton();
  instruction.textContent = text.stage1;
  feedback.textContent = text.startFeedback;
  document.querySelectorAll("[data-language]").forEach((link) => {
    if (link.dataset.language === localeKey) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
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

const correct = {
  axis: { x: 431, y: 425 },
  stationaryAngle: -130,
  movingAngle: -59
};

const tolerance = { axisDistance: 32, angleError: 9 };

let state = initialState();
let dragMode = null;
let dragOffset = { x: 0, y: 0 };
let timerStartedAt = null;
let elapsedMilliseconds = 0;
let timerInterval = null;
let motionFrame = null;
let motionDelay = null;
let hintTimeout = null;
let playRecorded = false;
let completionRecorded = false;
const analytics = window.TakWingGameAnalytics?.create("elbow-goniometry");

const flexionStartAngle = 99;
const extensionMovingAngle = 40;

function initialState() {
  return {
    stage: 1,
    x: 700,
    y: 380,
    stationaryAngle: 180,
    movingAngle: 20,
    score: 0,
    attempts: 0
  };
}

function svgPoint(event) {
  const p = svg.createSVGPoint();
  p.x = event.clientX;
  p.y = event.clientY;
  const ctm = svg.getScreenCTM();
  return ctm ? p.matrixTransform(ctm.inverse()) : { x: 0, y: 0 };
}

function angleFromCentre(point) {
  return Math.atan2(point.y - state.y, point.x - state.x) * 180 / Math.PI;
}

function angleDifference(a, b) {
  return Math.abs(((a - b + 180) % 360 + 360) % 360 - 180);
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderSiteStats(stats) {
  viewsValue.textContent = Number(stats.views || 0).toLocaleString(text.lang);
  playsValue.textContent = Number(stats.plays || 0).toLocaleString(text.lang);
  hintsUsedValue.textContent = Number(stats.hints || 0).toLocaleString(text.lang);
  averageTimeValue.textContent = stats.averageCompletionMs == null
    ? "—"
    : formatDuration(Number(stats.averageCompletionMs));
}

async function loadSiteStats() {
  try {
    const stats = await analytics?.loadStats();
    if (stats) renderSiteStats(stats);
  } catch {
    // The game remains fully usable if the analytics service is unavailable.
  }
}

function updateTimer() {
  const currentElapsed = timerStartedAt === null
    ? elapsedMilliseconds
    : elapsedMilliseconds + performance.now() - timerStartedAt;
  timeValue.textContent = formatDuration(currentElapsed);
}

function startTimer() {
  if (timerStartedAt !== null || !completionPanel.hidden) return;
  if (!playRecorded) {
    playRecorded = true;
    analytics?.start();
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
  const distance = 112;
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
  const p = svgPoint(event);

  if (mode === "axis") {
    dragOffset.x = p.x - state.x;
    dragOffset.y = p.y - state.y;
    goniometer.classList.add("dragging");
  }

  svg.setPointerCapture(event.pointerId);
}

axisHandle.addEventListener("pointerdown", e => beginDrag(e, "axis"));
stationaryHandle.addEventListener("pointerdown", e => beginDrag(e, "stationary"));
movingHandle.addEventListener("pointerdown", e => beginDrag(e, "moving"));

svg.addEventListener("pointermove", event => {
  if (!dragMode) return;
  const p = svgPoint(event);

  if (dragMode === "axis" && state.stage === 1) {
    state.x = p.x - dragOffset.x;
    state.y = p.y - dragOffset.y;
  } else if (dragMode === "stationary" && state.stage >= 2) {
    state.stationaryAngle = angleFromCentre(p);
  } else if (dragMode === "moving" && state.stage >= 3) {
    state.movingAngle = angleFromCentre(p);
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

function playCorrectChime() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

  [659.25, 783.99, 987.77].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.08);
    osc.connect(gain);
    osc.start(now + i * 0.08);
    osc.stop(now + 0.45 + i * 0.08);
  });
  window.setTimeout(() => ctx.close(), 900);
}

function checkPlacement() {
  state.attempts += 1;

  if (state.stage === 1) {
    const d = Math.hypot(state.x - correct.axis.x, state.y - correct.axis.y);
    if (d <= tolerance.axisDistance) {
      state.x = correct.axis.x;
      state.y = correct.axis.y;
      state.score += Math.max(20, Math.round(40 - d * 0.6));
      state.stage = 2;
      instruction.textContent = text.stage2;
      feedback.textContent = text.axisCorrect;
      playCorrectChime();
    } else {
      feedback.textContent = text.axisFar(Math.round(d));
    }
  } else if (state.stage === 2) {
    const error = angleDifference(state.stationaryAngle, correct.stationaryAngle);
    if (error <= tolerance.angleError) {
      state.stationaryAngle = correct.stationaryAngle;
      state.score += Math.max(20, Math.round(40 - error * 2));
      state.stage = 3;
      instruction.textContent = text.stage3;
      feedback.textContent = text.stationaryCorrect;
      playCorrectChime();
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
      playCorrectChime();
      showCompletion();
    } else {
      feedback.textContent = text.movingFar(Math.round(error));
    }
  }

  render();
}

function setMovementDemoVisible(visible) {
  [forearmCover, movingForearm, angleReadout].forEach((element) => {
    element.toggleAttribute("hidden", !visible);
  });
  styloidMarker.toggleAttribute("hidden", visible);
}

function setMovementProgress(progress) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const rotation = (extensionMovingAngle - correct.movingAngle) * clampedProgress;
  const transform = `rotate(${rotation} ${correct.axis.x} ${correct.axis.y})`;
  movingForearm.setAttribute("transform", transform);
  state.movingAngle = correct.movingAngle + rotation;
  angleValue.textContent = `${Math.round(flexionStartAngle * (1 - clampedProgress))}°`;
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
  const animate = (timestamp) => {
    if (startedAt === null) startedAt = timestamp;
    const linearProgress = Math.min(1, (timestamp - startedAt) / duration);
    const easedProgress = 0.5 - Math.cos(linearProgress * Math.PI) / 2;
    setMovementProgress(easedProgress);
    if (linearProgress < 1) motionFrame = window.requestAnimationFrame(animate);
    else motionFrame = null;
  };
  motionFrame = window.requestAnimationFrame(animate);
}

function showCompletion() {
  stopTimer();
  if (!completionRecorded) {
    completionRecorded = true;
    analytics?.complete();
    window.setTimeout(loadSiteStats, 400);
  }
  const stars = state.score >= 110 ? "★★★" : state.score >= 85 ? "★★☆" : "★☆☆";
  completionTitle.textContent = text.result(stars, state.score);
  completionMessage.textContent = text.checks(state.attempts, formatDuration(elapsedMilliseconds));
  completionPanel.hidden = false;
  setMovementDemoVisible(true);
  setMovementProgress(0);
  motionDelay = window.setTimeout(playMovementDemo, 500);
}

function showHint() {
  analytics?.hint(state.stage);
  window.setTimeout(loadSiteStats, 400);
  const hintRings = [axisHint, acromionHint, styloidHint];
  window.clearTimeout(hintTimeout);
  hintRings.forEach((ring) => ring.classList.remove("visible"));

  let activeHint;
  if (state.stage === 1) {
    activeHint = axisHint;
    feedback.textContent = text.axisHint;
  } else if (state.stage === 2) {
    activeHint = acromionHint;
    feedback.textContent = text.stationaryHint;
  } else {
    activeHint = styloidHint;
    feedback.textContent = text.movingHint;
  }

  activeHint.classList.add("visible");
  hintTimeout = window.setTimeout(() => {
    activeHint.classList.remove("visible");
    hintTimeout = null;
  }, 2200);
}

function restart() {
  cancelMovementDemo();
  window.clearTimeout(hintTimeout);
  hintTimeout = null;
  resetTimer();
  state = initialState();
  dragMode = null;
  analytics?.restart();
  playRecorded = false;
  completionRecorded = false;
  checkButton.disabled = false;
  completionPanel.hidden = true;
  [axisHint, acromionHint, styloidHint].forEach((ring) => ring.classList.remove("visible"));
  setMovementDemoVisible(false);
  movingForearm.removeAttribute("transform");
  instruction.textContent = text.stage1;
  feedback.textContent = text.startFeedback;
  render();
}

svg.addEventListener("pointerdown", startTimer);
checkButton.addEventListener("click", () => {
  startTimer();
  checkPlacement();
});
hintButton.addEventListener("click", () => {
  startTimer();
  showHint();
});
restartButton.addEventListener("click", restart);
replayMotionButton.addEventListener("click", playMovementDemo);
themeToggle.addEventListener("click", toggleTheme);

localisePage();
resetTimer();
render();
window.setTimeout(loadSiteStats, 400);
