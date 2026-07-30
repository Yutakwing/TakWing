(() => {
  "use strict";
  const analytics = window.TakWingGameAnalytics?.create("clinical-readiness-lab");

  const content = window.CLINICAL_READINESS_CONTENT;
  if (!content) throw new Error("Clinical Readiness Lab content is unavailable.");

  const canvas = document.getElementById("readinessGame");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const ui = {
    start: document.getElementById("readinessStart"),
    dialogue: document.getElementById("readinessDialogue"),
    quiz: document.getElementById("readinessQuiz"),
    complete: document.getElementById("readinessComplete"),
    aiStatus: document.getElementById("aiStatus"),
    vrStatus: document.getElementById("vrStatus"),
    simulationStatus: document.getElementById("simulationStatus"),
    speakerIcon: document.getElementById("speakerIcon"),
    speakerRole: document.getElementById("speakerRole"),
    speakerName: document.getElementById("speakerName"),
    dialogueText: document.getElementById("dialogueText"),
    dialogueButtons: document.getElementById("dialogueButtons"),
    quizLabel: document.getElementById("quizLabel"),
    quizQuestion: document.getElementById("quizQuestion"),
    quizAnswers: document.getElementById("quizAnswers"),
    quizFeedback: document.getElementById("quizFeedback"),
    quizContinue: document.getElementById("quizContinue"),
    quizRetry: document.getElementById("quizRetry"),
    status: document.getElementById("readinessStatus"),
  };

  const C = {
    floor: "#102238",
    grid: "#35506d",
    wall: "#18314e",
    edge: "#4a7196",
    text: "#f5f7fb",
    muted: "#afbdd0",
    ai: "#63e6be",
    vr: "#a9b7ff",
    simulation: "#ffd166",
    gate: "#ff9f68",
    dark: "#07111f",
  };

  const stationContent = content.stations;
  const state = {
    running: false,
    modal: false,
    keys: new Set(),
    near: null,
    activeStation: null,
    done: { ai: false, vr: false, simulation: false },
    player: { x: 452, y: 535, w: 28, h: 34, speed: 190, dir: "up" },
  };

  const walls = [
    { x: 0, y: 0, w: W, h: 24 }, { x: 0, y: H - 24, w: W, h: 24 },
    { x: 0, y: 0, w: 24, h: H }, { x: W - 24, y: 0, w: 24, h: H },
    { x: 270, y: 105, w: 22, h: 235 }, { x: 668, y: 105, w: 22, h: 235 },
    { x: 24, y: 340, w: 268, h: 22 }, { x: 668, y: 340, w: 268, h: 22 },
    { x: 360, y: 24, w: 240, h: 22 }, { x: 360, y: 46, w: 22, h: 82 },
    { x: 578, y: 46, w: 22, h: 82 }, { x: 394, y: 398, w: 172, h: 26 },
  ];

  const furniture = [
    { x: 62, y: 82, w: 116, h: 38, label: content.furniture[0] },
    { x: 95, y: 242, w: 96, h: 42, label: content.furniture[1] },
    { x: 388, y: 88, w: 184, h: 28, label: content.furniture[2] },
    { x: 776, y: 82, w: 110, h: 38, label: content.furniture[3] },
    { x: 744, y: 242, w: 130, h: 44, label: content.furniture[4] },
    { x: 96, y: 427, w: 135, h: 50, label: content.furniture[5] },
    { x: 730, y: 427, w: 122, h: 50, label: content.furniture[6] },
  ];

  const stations = {
    ai: { id: "ai", ...stationContent.ai, x: 205, y: 186, r: 60, colour: C.ai },
    vr: { id: "vr", ...stationContent.vr, x: 755, y: 186, r: 60, colour: C.vr },
    simulation: { id: "simulation", ...stationContent.simulation, x: 480, y: 478, r: 62, colour: C.simulation },
    gate: { id: "gate", ...stationContent.gate, x: 480, y: 88, r: 58, colour: C.gate },
  };

  let last = 0;
  let animationFrame;

  function reset() {
    state.running = true;
    state.modal = false;
    state.keys.clear();
    state.near = null;
    state.activeStation = null;
    state.done = { ai: false, vr: false, simulation: false };
    Object.assign(state.player, { x: 452, y: 535, dir: "up" });
    closeAll();
    updateStatus();
    last = performance.now();
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(loop);
    canvas.focus();
  }

  function loop(timestamp) {
    if (!state.running) return;
    const delta = Math.min((timestamp - last) / 1000, 0.033);
    last = timestamp;
    if (!state.modal) update(delta);
    draw();
    animationFrame = requestAnimationFrame(loop);
  }

  function update(delta) {
    let x = 0;
    let y = 0;
    if (state.keys.has("KeyW") || state.keys.has("ArrowUp")) y -= 1;
    if (state.keys.has("KeyS") || state.keys.has("ArrowDown")) y += 1;
    if (state.keys.has("KeyA") || state.keys.has("ArrowLeft")) x -= 1;
    if (state.keys.has("KeyD") || state.keys.has("ArrowRight")) x += 1;
    if (x || y) {
      const length = Math.hypot(x, y);
      x /= length;
      y /= length;
      const nextX = state.player.x + x * state.player.speed * delta;
      const nextY = state.player.y + y * state.player.speed * delta;
      if (!blocked(nextX, state.player.y)) state.player.x = nextX;
      if (!blocked(state.player.x, nextY)) state.player.y = nextY;
      state.player.dir = Math.abs(x) > Math.abs(y) ? (x > 0 ? "right" : "left") : (y > 0 ? "down" : "up");
    }
    state.near = nearStation();
  }

  function blocked(x, y) {
    const player = { x, y, w: state.player.w, h: state.player.h };
    return [...walls, ...furniture].some((object) => player.x < object.x + object.w && player.x + player.w > object.x && player.y < object.y + object.h && player.y + player.h > object.y);
  }

  function nearStation() {
    const centreX = state.player.x + state.player.w / 2;
    const centreY = state.player.y + state.player.h / 2;
    return Object.values(stations).find((station) => Math.hypot(centreX - station.x, centreY - station.y) <= station.r) || null;
  }

  const allDone = () => state.done.ai && state.done.vr && state.done.simulation;

  function interact() {
    if (!state.running || state.modal || !state.near) return;
    const station = state.near;
    if (station.id === "gate") {
      if (allDone()) showComplete();
      else showSimple(station, content.gateLocked);
      return;
    }
    if (state.done[station.id]) {
      showSimple(station, `${content.alreadyCollected} ${station.reward}.`);
      return;
    }
    showDialogue(station);
  }

  function openStation(stationId) {
    if (!state.running || state.modal) return;
    const station = stations[stationId];
    if (!station) return;
    if (station.id === "gate") {
      if (allDone()) showComplete();
      else showSimple(station, content.gateLocked);
      return;
    }
    if (state.done[station.id]) showSimple(station, `${content.alreadyCollected} ${station.reward}.`);
    else showDialogue(station);
  }

  function fillSpeaker(station) {
    ui.speakerIcon.textContent = station.icon;
    ui.speakerIcon.style.color = station.colour;
    ui.speakerRole.textContent = station.role;
    ui.speakerName.textContent = station.name;
  }

  function makeButton(text, handler, parent, className = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    if (className) button.className = className;
    button.addEventListener("click", handler);
    parent.appendChild(button);
  }

  function showDialogue(station) {
    state.modal = true;
    state.activeStation = station;
    fillSpeaker(station);
    ui.dialogueText.textContent = station.intro;
    ui.dialogueButtons.replaceChildren();
    makeButton(content.begin, () => showQuiz(station), ui.dialogueButtons);
    makeButton(content.leave, closeDialogue, ui.dialogueButtons);
    ui.dialogue.classList.remove("hidden");
  }

  function showSimple(station, text) {
    state.modal = true;
    fillSpeaker(station);
    ui.dialogueText.textContent = text;
    ui.dialogueButtons.replaceChildren();
    makeButton(content.continueExploring, closeDialogue, ui.dialogueButtons);
    ui.dialogue.classList.remove("hidden");
  }

  function resetQuizAnswers(station) {
    ui.quizFeedback.textContent = "";
    ui.quizContinue.hidden = true;
    ui.quizRetry.hidden = true;
    ui.quizAnswers.replaceChildren();
    station.answers.forEach((answer, index) => makeButton(answer, (event) => answerQuestion(station, index, event.currentTarget), ui.quizAnswers));
  }

  function showQuiz(station) {
    state.activeStation = station;
    ui.dialogue.classList.add("hidden");
    ui.quiz.classList.remove("hidden");
    ui.quizLabel.textContent = `${station.name} ${content.stationChallenge}`;
    ui.quizQuestion.textContent = station.question;
    resetQuizAnswers(station);
  }

  function answerQuestion(station, selectedIndex, selectedButton) {
    const buttons = [...ui.quizAnswers.querySelectorAll("button")];
    buttons.forEach((button) => { button.disabled = true; });
    if (selectedIndex === station.correct) {
      selectedButton.classList.add("correct");
      ui.quizFeedback.textContent = `${content.correct} ${station.explanation} ${content.earned} ${station.reward}.`;
      state.done[station.id] = true;
      updateStatus();
      ui.quizContinue.hidden = false;
      ui.quizContinue.focus();
    } else {
      selectedButton.classList.add("wrong");
      buttons[station.correct].classList.add("correct");
      ui.quizFeedback.textContent = `${content.incorrect} ${station.explanation}`;
      ui.quizRetry.hidden = false;
      ui.quizRetry.focus();
    }
  }

  function closeDialogue() {
    ui.dialogue.classList.add("hidden");
    state.modal = false;
    state.activeStation = null;
    last = performance.now();
    canvas.focus();
  }

  function closeQuiz() {
    ui.quiz.classList.add("hidden");
    state.modal = false;
    state.activeStation = null;
    last = performance.now();
    canvas.focus();
  }

  function showComplete() {
    analytics?.complete();
    state.modal = true;
    ui.complete.classList.remove("hidden");
  }

  function closeAll() {
    [ui.start, ui.dialogue, ui.quiz, ui.complete].forEach((element) => element.classList.add("hidden"));
  }

  function updateStatus() {
    [[ui.aiStatus, state.done.ai], [ui.vrStatus, state.done.vr], [ui.simulationStatus, state.done.simulation]].forEach(([element, done]) => {
      element.textContent = done ? content.status.complete : content.status.incomplete;
      element.classList.toggle("done", done);
    });
    ui.status.textContent = `${content.tokensCollected}: ${Object.values(state.done).filter(Boolean).length}/3`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawFloor();
    drawZone(40, 48, 220, 280, C.ai, content.zones.ai);
    drawZone(700, 48, 220, 280, C.vr, content.zones.vr);
    drawZone(305, 362, 350, 232, C.simulation, content.zones.simulation);
    drawZone(385, 48, 190, 88, C.gate, content.zones.gate);
    drawWalls();
    drawFurniture();
    drawGate();
    drawNPC(stations.ai);
    drawNPC(stations.vr);
    drawNPC(stations.simulation);
    drawPlayer();
    drawHud();
    drawPrompt();
  }

  function drawFloor() {
    ctx.fillStyle = C.floor;
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = C.grid;
    for (let x = 24; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 24); ctx.lineTo(x, H - 24); ctx.stroke(); }
    for (let y = 24; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(24, y); ctx.lineTo(W - 24, y); ctx.stroke(); }
    ctx.restore();
  }

  function drawZone(x, y, width, height, colour, label) {
    ctx.save();
    ctx.fillStyle = `${colour}14`;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = `${colour}66`;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = colour;
    ctx.font = "800 13px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(label, x + width / 2, y + 22);
    ctx.restore();
  }

  function drawWalls() {
    walls.forEach((object) => { ctx.fillStyle = C.wall; ctx.fillRect(object.x, object.y, object.w, object.h); ctx.strokeStyle = C.edge; ctx.strokeRect(object.x, object.y, object.w, object.h); });
  }

  function drawFurniture() {
    furniture.forEach((object) => {
      ctx.fillStyle = "#24415f";
      ctx.fillRect(object.x, object.y, object.w, object.h);
      ctx.strokeStyle = "#54799d";
      ctx.strokeRect(object.x, object.y, object.w, object.h);
      ctx.fillStyle = C.muted;
      ctx.font = "700 11px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(object.label, object.x + object.w / 2, object.y + object.h / 2);
    });
  }

  function drawGate() {
    const open = allDone();
    ctx.fillStyle = open ? C.ai : "#8c5151";
    ctx.fillRect(430, 48, 100, 22);
    ctx.fillStyle = C.text;
    ctx.font = "800 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(open ? content.unlocked : content.locked, 480, 64);
  }

  function drawNPC(station) {
    const done = state.done[station.id];
    ctx.save();
    if (done) {
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = station.colour;
      ctx.beginPath();
      ctx.arc(station.x, station.y, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = station.colour;
    ctx.beginPath();
    ctx.arc(station.x, station.y - 12, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(station.x - 14, station.y + 4, 28, 34);
    ctx.fillStyle = C.dark;
    ctx.fillRect(station.x - 8, station.y - 16, 4, 4);
    ctx.fillRect(station.x + 4, station.y - 16, 4, 4);
    ctx.fillStyle = station.colour;
    ctx.font = "800 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(station.name, station.x, station.y + 58);
    if (done) { ctx.fillStyle = C.ai; ctx.font = "900 18px system-ui"; ctx.fillText("✓", station.x + 25, station.y - 25); }
    ctx.restore();
  }

  function drawPlayer() {
    const player = state.player;
    const centreX = player.x + player.w / 2;
    ctx.fillStyle = C.text;
    ctx.beginPath();
    ctx.arc(centreX, player.y + 10, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4cc9a6";
    ctx.fillRect(player.x + 5, player.y + 18, player.w - 10, 16);
    ctx.fillStyle = "#243b55";
    ctx.fillRect(player.x + 4, player.y + 31, 8, 8);
    ctx.fillRect(player.x + player.w - 12, player.y + 31, 8, 8);
    ctx.fillStyle = C.dark;
    if (player.dir === "up") ctx.fillRect(centreX - 7, player.y + 3, 14, 4);
    else if (player.dir === "down") { ctx.fillRect(centreX - 5, player.y + 9, 3, 3); ctx.fillRect(centreX + 2, player.y + 9, 3, 3); }
    else if (player.dir === "left") ctx.fillRect(centreX - 7, player.y + 8, 3, 3);
    else ctx.fillRect(centreX + 4, player.y + 8, 3, 3);
  }

  function drawHud() {
    ctx.fillStyle = "rgba(7,17,31,.88)";
    ctx.fillRect(32, H - 70, 390, 34);
    ctx.fillStyle = C.text;
    ctx.font = "700 13px system-ui";
    ctx.textAlign = "left";
    const collected = Object.values(state.done).filter(Boolean).length;
    ctx.fillText(`${content.tokensCollected}: ${collected}/3${allDone() ? ` — ${content.gateOpen}` : ""}`, 48, H - 48);
  }

  function drawPrompt() {
    if (!state.near || state.modal) return;
    const message = state.near.id === "gate" && !allDone() ? content.promptLocked : `${content.promptInteract} ${state.near.name}`;
    ctx.font = "700 14px system-ui";
    const width = ctx.measureText(message).width + 34;
    const x = W / 2 - width / 2;
    const y = 585;
    ctx.fillStyle = "rgba(7,17,31,.96)";
    ctx.fillRect(x, y, width, 34);
    ctx.strokeStyle = state.near.colour;
    ctx.strokeRect(x, y, width, 34);
    ctx.fillStyle = C.text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(message, W / 2, y + 17);
  }

  const movementKeys = ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  document.addEventListener("keydown", (event) => {
    if (movementKeys.includes(event.code)) { event.preventDefault(); state.keys.add(event.code); }
    if (event.code === "KeyE") { event.preventDefault(); interact(); }
    if (event.code === "Escape" && state.modal) { closeDialogue(); closeQuiz(); ui.complete.classList.add("hidden"); }
  });
  document.addEventListener("keyup", (event) => state.keys.delete(event.code));
  window.addEventListener("blur", () => state.keys.clear());
  document.addEventListener("visibilitychange", () => { if (document.hidden) state.keys.clear(); });

  document.querySelectorAll("[data-readiness-key]").forEach((button) => {
    const key = button.dataset.readinessKey;
    const activate = () => state.keys.add(key);
    const deactivate = () => state.keys.delete(key);
    button.addEventListener("pointerdown", activate);
    ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => button.addEventListener(eventName, deactivate));
  });
  document.querySelectorAll("[data-readiness-station]").forEach((button) => {
    button.addEventListener("click", () => openStation(button.dataset.readinessStation));
  });

  document.getElementById("readinessStartButton").addEventListener("click", () => {
    analytics?.start();
    reset();
  });
  document.getElementById("readinessRestartButton").addEventListener("click", () => {
    analytics?.restart();
    analytics?.start();
    reset();
  });
  document.getElementById("readinessInteractButton").addEventListener("click", interact);
  ui.quizContinue.addEventListener("click", closeQuiz);
  ui.quizRetry.addEventListener("click", () => resetQuizAnswers(state.activeStation));

  updateStatus();
  draw();
})();
