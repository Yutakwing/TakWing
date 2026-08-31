// Lecturer-editable level in the shared 720 x 580 SVG coordinate system.
const CHEST_EXPANSION_CONFIG = {
  gameId: "cardio-chest-expansion",
  measurementY: 350,
  yTolerance: 34,
  centreTolerance: 35,
};

function measurements() {
  const expirationCm = Number((84 + Math.random() * 10).toFixed(1));
  const inspirationCm = Number((expirationCm + 3 + Math.random() * 4).toFixed(1));
  return { expirationCm, inspirationCm };
}

(() => {
  const C = CardioGame;
  const svg = C.qs("[data-board]");
  const tape = C.qs("[data-tape]");
  const tapeHalfLength = 105;

  C.initialiseTheme();
  C.qs("[data-torso]").innerHTML = C.anteriorTorso();
  if (C.DEBUG_LANDMARKS) document.body.classList.add("debug-landmarks");

  const state = {
    stage: 0,
    score: 0,
    attempts: 0,
    startedAt: null,
    timer: null,
    tape: { x: 360, y: 270 },
    dragging: false,
    ...measurements(),
  };
  const tasks = [
    "Position the tape at the taught measurement level.",
    "Centre the rigid tape symmetrically across the chest.",
    "Record the end-expiration measurement.",
    "Record the maximal-inspiration measurement.",
    "Calculate chest expansion (inspiration - expiration).",
  ];

  function render() {
    tape.setAttribute("x1", state.tape.x - tapeHalfLength);
    tape.setAttribute("y1", state.tape.y);
    tape.setAttribute("x2", state.tape.x + tapeHalfLength);
    tape.setAttribute("y2", state.tape.y);
    tape.setAttribute(
      "aria-label",
      `Rigid measuring tape centred at ${Math.round(state.tape.x)}, ${Math.round(state.tape.y)}. Drag it or use the arrow keys to move the whole tape.`,
    );
    C.setText("[data-instruction]", tasks[state.stage] || "Complete");
    C.updateStatus(state, tasks.length);
    C.qs("[data-measurements]").hidden = state.stage < 2;
  }

  function moveTape(x, y) {
    state.tape.x = Math.max(210 + tapeHalfLength, Math.min(510 - tapeHalfLength, x));
    state.tape.y = Math.max(120, Math.min(500, y));
    render();
  }

  tape.addEventListener("pointerdown", event => {
    event.preventDefault();
    state.dragging = true;
    tape.setPointerCapture(event.pointerId);
    C.startClock(state, tasks.length);
  });
  tape.addEventListener("pointermove", event => {
    if (!state.dragging) return;
    const point = C.svgPoint(svg, event);
    moveTape(point.x, point.y);
  });
  const stopDragging = () => { state.dragging = false; };
  tape.addEventListener("pointerup", stopDragging);
  tape.addEventListener("pointercancel", stopDragging);
  tape.addEventListener("keydown", event => {
    const distance = event.shiftKey ? 10 : 4;
    const movement = {
      ArrowLeft: [-distance, 0],
      ArrowRight: [distance, 0],
      ArrowUp: [0, -distance],
      ArrowDown: [0, distance],
    }[event.key];
    if (!movement) return;
    event.preventDefault();
    C.startClock(state, tasks.length);
    moveTape(state.tape.x + movement[0], state.tape.y + movement[1]);
  });
  svg.addEventListener("click", event => {
    if (event.target.closest("[data-tape]")) return;
    const point = C.svgPoint(svg, event);
    C.startClock(state, tasks.length);
    moveTape(point.x, point.y);
  });
  C.qsa("[data-nudge]").forEach(button => button.addEventListener("click", () => {
    const [dx, dy] = button.dataset.nudge.split(",").map(Number);
    C.startClock(state, tasks.length);
    moveTape(state.tape.x + dx, state.tape.y + dy);
  }));

  function correct() {
    if (state.stage === 0) {
      return Math.abs(state.tape.y - CHEST_EXPANSION_CONFIG.measurementY) <= CHEST_EXPANSION_CONFIG.yTolerance;
    }
    if (state.stage === 1) {
      return Math.abs(state.tape.x - 360) <= CHEST_EXPANSION_CONFIG.centreTolerance;
    }
    if (state.stage === 2) {
      return Math.abs(Number(C.qs("[data-exp]").value) - state.expirationCm) <= 0.1;
    }
    if (state.stage === 3) {
      return Math.abs(Number(C.qs("[data-insp]").value) - state.inspirationCm) <= 0.1;
    }
    return Math.abs(Number(C.qs("[data-calc]").value) - (state.inspirationCm - state.expirationCm)) <= 0.11;
  }

  C.qs("[data-check]").addEventListener("click", () => {
    C.startClock(state, tasks.length);
    state.attempts += 1;
    if (correct()) {
      state.stage += 1;
      state.score = Math.max(60, 100 - (state.attempts - state.stage) * 6);
      C.playCorrectChime();
      C.setText(
        "[data-feedback]",
        state.stage === 2
          ? `Tape positioned. Simulated end-expiration reading: ${state.expirationCm.toFixed(1)} cm.`
          : state.stage === 3
            ? `Recorded. Simulated maximal-inspiration reading: ${state.inspirationCm.toFixed(1)} cm.`
            : "Correct. Continue to the next stage.",
      );
      if (state.stage === tasks.length) {
        C.stopClock(state);
        C.qs("[data-completion]").hidden = false;
        C.setText("[data-stars]", C.stars(state.score));
        C.setText(
          "[data-completion-message]",
          `Score: ${state.score} - Attempts: ${state.attempts} - Expansion: ${(state.inspirationCm - state.expirationCm).toFixed(1)} cm`,
        );
        C.submit(CHEST_EXPANSION_CONFIG, state, state.score);
      }
    } else {
      C.playIncorrectTone();
      C.setText(
        "[data-feedback]",
        state.stage < 2
          ? "Not quite. Move the whole tape and check its level and symmetry."
          : "Check the displayed simulated reading and your subtraction.",
      );
    }
    render();
  });

  C.qs("[data-hint]").addEventListener("click", () => {
    const hint = state.stage === 0
      ? `Move the whole rigid tape to the taught level at y=${CHEST_EXPANSION_CONFIG.measurementY}.`
      : state.stage === 1
        ? "Keep the tape centred across the chest; its two ends move together."
        : state.stage === 4
          ? "Subtract expiration from inspiration."
          : "Enter the simulated value shown after the preceding stage.";
    C.setText("[data-feedback]", hint);
  });

  function reset() {
    C.stopClock(state);
    Object.assign(state, {
      stage: 0,
      score: 0,
      attempts: 0,
      startedAt: null,
      timer: null,
      tape: { x: 360, y: 270 },
      dragging: false,
      ...measurements(),
    });
    C.qsa("input").forEach(input => { input.value = ""; });
    C.qs("[data-completion]").hidden = true;
    C.setText("[data-feedback]", "Begin by positioning the rigid tape.");
    window.PhysioSkillsProgress?.resetCompletion();
    render();
  }

  C.qsa("[data-restart]").forEach(button => button.addEventListener("click", reset));
  reset();
})();
