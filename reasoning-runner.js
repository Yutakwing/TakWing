(() => {
  "use strict";

  const content = window.REASONING_RUNNER_CONTENT;
  if (!content) throw new Error("Reasoning Runner content is unavailable.");
  const analytics = window.TakWingGameAnalytics?.create("reasoning-runner");

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const scoreElement = document.getElementById("score");
  const evidenceElement = document.getElementById("evidence");
  const bestScoreElement = document.getElementById("bestScore");
  const startOverlay = document.getElementById("startOverlay");
  const gameOverOverlay = document.getElementById("gameOverOverlay");
  const questionOverlay = document.getElementById("questionOverlay");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");
  const continueButton = document.getElementById("continueButton");
  const jumpButton = document.getElementById("jumpButton");
  const duckButton = document.getElementById("duckButton");
  const pauseButton = document.getElementById("pauseButton");
  const questionText = document.getElementById("questionText");
  const answerButtons = document.getElementById("answerButtons");
  const feedbackText = document.getElementById("feedbackText");
  const finalScoreElement = document.getElementById("finalScore");
  const finalMessage = document.getElementById("finalMessage");
  const gameOverTitle = document.getElementById("gameOverTitle");
  const gameStatus = document.getElementById("gameStatus");

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const GROUND_Y = 340;

  const questions = content.questions;
  const hallucinationLabels = content.hazards;

  let state = createInitialState();
  let animationFrame = null;
  let lastTime = 0;
  let storedBest = 0;
  try {
    storedBest = Number(window.localStorage?.getItem("reasoningRunnerBest") || 0);
  } catch (error) {
    storedBest = 0;
  }

  bestScoreElement.textContent = storedBest;

  function createInitialState() {
    return {
      running: false,
      paused: false,
      askingQuestion: false,
      gameOver: false,
      elapsed: 0,
      score: 0,
      evidence: 0,
      speed: 360,
      spawnTimer: 1.5,
      tokenTimer: 1.4,
      nextQuestionScore: 100,
      lastQuestionIndex: -1,
      backgroundOffset: 0,
      player: {
        x: 115,
        y: GROUND_Y - 64,
        width: 46,
        height: 64,
        velocityY: 0,
        jumping: false,
        ducking: false,
      },
      obstacles: [],
      tokens: [],
      particles: [],
    };
  }

  function resetGame() {
    state = createInitialState();
    scoreElement.textContent = "0";
    evidenceElement.textContent = "0";
    feedbackText.textContent = "";
    continueButton.hidden = true;
    gameOverOverlay.classList.add("hidden");
    questionOverlay.classList.add("hidden");
    startOverlay.classList.add("hidden");
    startGame();
  }

  function startGame() {
    analytics?.start();
    state.running = true;
    state.gameOver = false;
    pauseButton.textContent = content.pause;
    pauseButton.setAttribute("aria-pressed", "false");
    gameStatus.textContent = content.statusStarted;
    lastTime = performance.now();
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(gameLoop);
  }

  function gameLoop(timestamp) {
    if (!state.running) return;

    const delta = Math.min((timestamp - lastTime) / 1000, 0.034);
    lastTime = timestamp;

    if (!state.paused && !state.askingQuestion && !state.gameOver) {
      update(delta);
    }

    draw();
    animationFrame = requestAnimationFrame(gameLoop);
  }

  function update(delta) {
    state.elapsed += delta;
    state.score += delta * 32;
    state.speed = Math.min(690, 360 + state.elapsed * 7);
    state.backgroundOffset = (state.backgroundOffset + state.speed * delta * 0.12) % 80;

    updatePlayer(delta);
    updateSpawning(delta);
    updateObstacles(delta);
    updateTokens(delta);
    updateParticles(delta);
    checkQuestionTrigger();

    scoreElement.textContent = Math.floor(state.score);
  }

  function updatePlayer(delta) {
    const player = state.player;
    player.velocityY += 1750 * delta;
    player.y += player.velocityY * delta;

    const currentHeight = player.ducking ? 39 : 64;
    player.height = currentHeight;

    const floorY = GROUND_Y - currentHeight;
    if (player.y >= floorY) {
      player.y = floorY;
      player.velocityY = 0;
      player.jumping = false;
    }
  }

  function updateSpawning(delta) {
    state.spawnTimer -= delta;
    state.tokenTimer -= delta;

    if (state.spawnTimer <= 0) {
      spawnObstacle();
      const difficulty = Math.max(0.78, 1.42 - state.elapsed * 0.012);
      state.spawnTimer = difficulty + Math.random() * 0.7;
    }

    if (state.tokenTimer <= 0) {
      spawnEvidenceToken();
      state.tokenTimer = 2.3 + Math.random() * 2.4;
    }
  }

  function spawnObstacle() {
    const isFloating = Math.random() < 0.3 && state.elapsed > 8;
    const width = 60 + Math.random() * 42;
    const height = isFloating ? 48 : 45 + Math.random() * 48;

    state.obstacles.push({
      x: WIDTH + 40,
      y: isFloating ? GROUND_Y - 112 : GROUND_Y - height,
      width,
      height,
      floating: isFloating,
      label:
        hallucinationLabels[
          Math.floor(Math.random() * hallucinationLabels.length)
        ],
    });
  }

  function spawnEvidenceToken() {
    const heights = [GROUND_Y - 52, GROUND_Y - 112, GROUND_Y - 170];
    state.tokens.push({
      x: WIDTH + 30,
      y: heights[Math.floor(Math.random() * heights.length)],
      size: 28,
      rotation: 0,
    });
  }

  function updateObstacles(delta) {
    for (const obstacle of state.obstacles) {
      obstacle.x -= state.speed * delta;

      if (rectanglesOverlap(state.player, obstacle)) {
        endGame();
        return;
      }
    }

    state.obstacles = state.obstacles.filter(
      (obstacle) => obstacle.x + obstacle.width > -30
    );
  }

  function updateTokens(delta) {
    for (const token of state.tokens) {
      token.x -= state.speed * delta;
      token.rotation += delta * 4;

      const tokenRect = {
        x: token.x - token.size / 2,
        y: token.y - token.size / 2,
        width: token.size,
        height: token.size,
      };

      if (rectanglesOverlap(state.player, tokenRect)) {
        token.collected = true;
        state.evidence += 1;
        state.score += 60;
        evidenceElement.textContent = state.evidence;
        gameStatus.textContent = content.statusEvidence;
        createParticles(token.x, token.y);
      }
    }

    state.tokens = state.tokens.filter(
      (token) => !token.collected && token.x + token.size > -20
    );
  }

  function createParticles(x, y) {
    for (let i = 0; i < 9; i += 1) {
      state.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 130,
        vy: (Math.random() - 0.5) * 130,
        life: 0.55 + Math.random() * 0.4,
      });
    }
  }

  function updateParticles(delta) {
    for (const particle of state.particles) {
      particle.life -= delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
    }
    state.particles = state.particles.filter((particle) => particle.life > 0);
  }

  function rectanglesOverlap(a, b) {
    const marginX = 7;
    const marginY = 5;

    return (
      a.x + marginX < b.x + b.width &&
      a.x + a.width - marginX > b.x &&
      a.y + marginY < b.y + b.height &&
      a.y + a.height - marginY > b.y
    );
  }

  function jump() {
    if (
      !state.running ||
      state.paused ||
      state.askingQuestion ||
      state.gameOver
    ) {
      return;
    }

    if (!state.player.jumping) {
      state.player.velocityY = -690;
      state.player.jumping = true;
      state.player.ducking = false;
    }
  }

  function setDuck(active) {
    if (
      !state.running ||
      state.paused ||
      state.askingQuestion ||
      state.gameOver
    ) {
      return;
    }

    if (!state.player.jumping) {
      state.player.ducking = active;
      state.player.y = GROUND_Y - (active ? 39 : 64);
    }
  }

  function togglePause() {
    if (!state.running || state.askingQuestion || state.gameOver) return;
    state.paused = !state.paused;
    pauseButton.textContent = state.paused ? content.resume : content.pause;
    pauseButton.setAttribute("aria-pressed", String(state.paused));
    gameStatus.textContent = state.paused ? content.paused : content.statusStarted;
  }

  function checkQuestionTrigger() {
    if (state.score >= state.nextQuestionScore && !state.askingQuestion) {
      showQuestion();
      state.nextQuestionScore += 400;
    }
  }

  function showQuestion() {
    state.askingQuestion = true;
    feedbackText.textContent = "";
    continueButton.hidden = true;
    answerButtons.replaceChildren();

    let questionIndex;
    do {
      questionIndex = Math.floor(Math.random() * questions.length);
    } while (
      questions.length > 1 &&
      questionIndex === state.lastQuestionIndex
    );

    state.lastQuestionIndex = questionIndex;
    const question = questions[questionIndex];
    questionText.textContent = question.question;
    gameStatus.textContent = content.statusQuestion;

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = answer;
      button.addEventListener("click", () =>
        handleAnswer(question, index, button)
      );
      answerButtons.appendChild(button);
    });

    questionOverlay.classList.remove("hidden");
  }

  function handleAnswer(question, selectedIndex, selectedButton) {
    const buttons = [...answerButtons.querySelectorAll("button")];
    buttons.forEach((button) => {
      button.disabled = true;
    });

    if (selectedIndex === question.correct) {
      selectedButton.classList.add("correct");
      state.score += 150;
      feedbackText.textContent = `${content.correctPrefix} ${question.explanation}`;
    } else {
      selectedButton.classList.add("incorrect");
      buttons[question.correct].classList.add("correct");
      state.score = Math.max(0, state.score - 75);
      feedbackText.textContent = `${content.incorrectPrefix} ${question.explanation}`;
    }

    scoreElement.textContent = Math.floor(state.score);
    continueButton.hidden = false;
    continueButton.focus();
  }

  function continueFromQuestion() {
    questionOverlay.classList.add("hidden");
    state.askingQuestion = false;
    lastTime = performance.now();
    canvas.focus();
  }

  function endGame() {
    analytics?.complete();
    window.reactToAssistantEvent?.("success");
    state.gameOver = true;
    state.running = false;
    cancelAnimationFrame(animationFrame);

    const finalScore = Math.floor(state.score);
    finalScoreElement.textContent = finalScore;

    if (finalScore > storedBest) {
      storedBest = finalScore;
      try {
        window.localStorage.setItem("reasoningRunnerBest", String(storedBest));
      } catch (error) {
        // Local storage may be blocked; the game still works without it.
      }
      bestScoreElement.textContent = storedBest;
      gameOverTitle.textContent = content.newRecord;
    } else {
      gameOverTitle.textContent = content.interrupted;
    }

    if (finalScore >= 1500) {
      finalMessage.textContent = content.finalMessages.high;
    } else if (finalScore >= 750) {
      finalMessage.textContent = content.finalMessages.medium;
    } else {
      finalMessage.textContent = content.finalMessages.low;
    }

    gameStatus.textContent = content.statusEnded;
    gameOverOverlay.classList.remove("hidden");
    restartButton.focus();
  }

  function draw() {
    drawBackground();
    drawGround();
    drawTokens();
    drawObstacles();
    drawPlayer();
    drawParticles();

    if (state.paused) {
      ctx.fillStyle = "rgba(4, 10, 18, 0.64)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#f5f8ff";
      ctx.font = "700 34px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(content.paused, WIDTH / 2, HEIGHT / 2);
    }
  }

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, "#0b1728");
    gradient.addColorStop(1, "#102741");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = "#63e6be";
    ctx.lineWidth = 1;

    for (let x = -80; x < WIDTH + 80; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x - state.backgroundOffset, 70);
      ctx.lineTo(x - state.backgroundOffset, GROUND_Y);
      ctx.stroke();
    }

    for (let y = 100; y < GROUND_Y; y += 55) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }

    ctx.restore();

    drawLabSilhouette();
  }

  function drawLabSilhouette() {
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "#b8c7dc";

    ctx.fillRect(70, 180, 110, 160);
    ctx.fillRect(210, 225, 150, 115);
    ctx.fillRect(720, 205, 170, 135);

    ctx.beginPath();
    ctx.arc(560, 210, 48, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawGround() {
    ctx.fillStyle = "#08131f";
    ctx.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y);

    ctx.strokeStyle = "#63e6be";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(WIDTH, GROUND_Y);
    ctx.stroke();

    ctx.save();
    ctx.globalAlpha = 0.24;
    ctx.strokeStyle = "#a9b8cf";
    ctx.lineWidth = 2;

    for (let x = -60; x < WIDTH + 60; x += 65) {
      ctx.beginPath();
      ctx.moveTo(x - (state.backgroundOffset * 2), GROUND_Y + 34);
      ctx.lineTo(x + 36 - (state.backgroundOffset * 2), GROUND_Y + 34);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawPlayer() {
    const p = state.player;
    const bodyHeight = p.height;

    ctx.save();

    ctx.fillStyle = "#63e6be";
    roundRect(ctx, p.x, p.y, p.width, bodyHeight, 12);
    ctx.fill();

    ctx.fillStyle = "#08131f";
    ctx.fillRect(p.x + 8, p.y + 11, p.width - 16, 18);

    ctx.fillStyle = "#f5f8ff";
    ctx.beginPath();
    ctx.arc(p.x + 17, p.y + 20, 3, 0, Math.PI * 2);
    ctx.arc(p.x + 30, p.y + 20, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#08131f";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    if (!p.ducking) {
      ctx.beginPath();
      ctx.moveTo(p.x + 14, p.y + bodyHeight);
      ctx.lineTo(p.x + 10, p.y + bodyHeight + 14);
      ctx.moveTo(p.x + 32, p.y + bodyHeight);
      ctx.lineTo(p.x + 38, p.y + bodyHeight + 14);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawObstacles() {
    for (const obstacle of state.obstacles) {
      ctx.save();

      ctx.fillStyle = "#ff7b7b";
      roundRect(
        ctx,
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height,
        10
      );
      ctx.fill();

      ctx.fillStyle = "#2b0e14";
      ctx.font = "800 12px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const words = obstacle.label.split(" ");
      if (words.length > 2) {
        const midpoint = Math.ceil(words.length / 2);
        ctx.fillText(
          words.slice(0, midpoint).join(" "),
          obstacle.x + obstacle.width / 2,
          obstacle.y + obstacle.height / 2 - 8
        );
        ctx.fillText(
          words.slice(midpoint).join(" "),
          obstacle.x + obstacle.width / 2,
          obstacle.y + obstacle.height / 2 + 9
        );
      } else {
        ctx.fillText(
          obstacle.label,
          obstacle.x + obstacle.width / 2,
          obstacle.y + obstacle.height / 2
        );
      }

      ctx.restore();
    }
  }

  function drawTokens() {
    for (const token of state.tokens) {
      ctx.save();
      ctx.translate(token.x, token.y);
      ctx.rotate(token.rotation);

      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.arc(0, 0, token.size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#fff1bd";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#4d3700";
      ctx.font = "900 16px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("E", 0, 1);

      ctx.restore();
    }
  }

  function drawParticles() {
    ctx.save();
    ctx.fillStyle = "#ffd166";

    for (const particle of state.particles) {
      ctx.globalAlpha = Math.max(0, particle.life);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function roundRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault();
      jump();
    }

    if (event.code === "ArrowDown") {
      event.preventDefault();
      setDuck(true);
    }

    if (event.code === "KeyP") {
      togglePause();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowDown") {
      setDuck(false);
    }
  });

  jumpButton.addEventListener("pointerdown", jump);
  duckButton.addEventListener("pointerdown", () => setDuck(true));
  duckButton.addEventListener("pointerup", () => setDuck(false));
  duckButton.addEventListener("pointercancel", () => setDuck(false));
  duckButton.addEventListener("pointerleave", () => setDuck(false));

  canvas.addEventListener("pointerdown", jump);
  pauseButton.addEventListener("click", togglePause);
  continueButton.addEventListener("click", continueFromQuestion);

  startButton.addEventListener("click", () => {
    startOverlay.classList.add("hidden");
    resetGame();
    canvas.focus();
  });

  restartButton.addEventListener("click", () => {
    analytics?.restart();
    resetGame();
    canvas.focus();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.running && !state.paused && !state.askingQuestion) {
      togglePause();
    }
  });

  draw();
})();
