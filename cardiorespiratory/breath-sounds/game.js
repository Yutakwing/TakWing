(() => {
  "use strict";

  const C = window.CardioGame;
  const params = new URLSearchParams(location.search);
  const testMode = params.get("test") === "1";
  const requestedCase = params.get("case");
  const soundDuration = testMode ? 1.2 : 6;
  const analytics = window.TakWingGameAnalytics?.create("cardio-breath-sounds");

  const SOUNDS = [
    {
      id: "vesicular",
      label: "Vesicular breath sounds",
      hint: "Compare inspiration with expiration. The normal peripheral pattern is soft, with inspiration longer and louder than expiration and no distinct pause.",
      explanation: "Soft, low-pitched airflow with a longer inspiratory phase and a shorter, quieter expiratory phase is characteristic of vesicular breathing.",
    },
    {
      id: "bronchial",
      label: "Bronchial breath sounds",
      hint: "Listen for a louder, higher-pitched, tubular quality and a brief pause between inspiration and expiration.",
      explanation: "Bronchial breathing has a harsher, more tubular quality, a brief pause, and an expiratory phase that is at least as prominent as inspiration.",
    },
    {
      id: "wheeze",
      label: "Wheeze",
      hint: "Listen for a continuous musical tone, especially during expiration.",
      explanation: "A wheeze is a continuous, musical, usually higher-pitched sound caused by airflow through narrowed airways and is often more evident on expiration.",
    },
    {
      id: "fine-crackles",
      label: "Fine crackles",
      hint: "Focus on late inspiration for brief, high-pitched, discontinuous pops.",
      explanation: "Fine crackles are brief, discontinuous, high-pitched sounds, commonly heard in late inspiration and often described as delicate popping.",
    },
    {
      id: "coarse-crackles",
      label: "Coarse crackles",
      hint: "Listen for lower-pitched, wetter, discontinuous sounds that occur across more of the respiratory cycle.",
      explanation: "Coarse crackles are louder, lower-pitched, discontinuous bubbling or popping sounds that may occur during inspiration and expiration.",
    },
  ];

  let activeContext = null;
  let playbackTimer = null;
  let playbackTimeout = null;
  let playbackStartedAt = 0;
  let order = [];
  let state = null;

  const visual = C.qs("[data-sound-visual]");
  const playButton = C.qs("[data-play]");
  const stopButton = C.qs("[data-stop]");
  const checkButton = C.qs("[data-check]");
  const hintButton = C.qs("[data-hint]");
  const choices = C.qsa("[data-answer]");

  function shuffle(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  }

  function currentSound() {
    return order[state.stage];
  }

  function makeNoiseBuffer(context, duration) {
    const length = Math.ceil(context.sampleRate * duration);
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    let previous = 0;
    for (let index = 0; index < length; index += 1) {
      const white = Math.random() * 2 - 1;
      previous = previous * .93 + white * .07;
      data[index] = previous * 3.2;
    }
    return buffer;
  }

  function envelope(gain, points, scale = 1) {
    const now = activeContext.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(.0001, now);
    for (const [time, value] of points) {
      gain.gain.linearRampToValueAtTime(Math.max(.0001, value * scale), now + time * soundDuration / 6);
    }
    gain.gain.linearRampToValueAtTime(.0001, now + soundDuration);
  }

  function breathNoise({ low = 120, high = 900, gain = .25, envelopePoints }) {
    const source = activeContext.createBufferSource();
    const highpass = activeContext.createBiquadFilter();
    const lowpass = activeContext.createBiquadFilter();
    const level = activeContext.createGain();
    source.buffer = makeNoiseBuffer(activeContext, soundDuration);
    highpass.type = "highpass";
    highpass.frequency.value = low;
    lowpass.type = "lowpass";
    lowpass.frequency.value = high;
    source.connect(highpass).connect(lowpass).connect(level).connect(activeContext.destination);
    envelope(level, envelopePoints, gain * Number(C.qs("[data-volume]").value) / 70);
    source.start();
    source.stop(activeContext.currentTime + soundDuration);
  }

  function addTone(frequency, start, end, amount = .065, vibrato = 5) {
    const oscillator = activeContext.createOscillator();
    const modulator = activeContext.createOscillator();
    const modulationGain = activeContext.createGain();
    const gain = activeContext.createGain();
    const scale = Number(C.qs("[data-volume]").value) / 70;
    const unit = soundDuration / 6;
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    modulator.frequency.value = vibrato;
    modulationGain.gain.value = frequency * .018;
    modulator.connect(modulationGain).connect(oscillator.frequency);
    oscillator.connect(gain).connect(activeContext.destination);
    gain.gain.setValueAtTime(.0001, activeContext.currentTime + start * unit);
    gain.gain.linearRampToValueAtTime(amount * scale, activeContext.currentTime + (start + .18) * unit);
    gain.gain.linearRampToValueAtTime(.0001, activeContext.currentTime + end * unit);
    oscillator.start(activeContext.currentTime + start * unit);
    modulator.start(activeContext.currentTime + start * unit);
    oscillator.stop(activeContext.currentTime + end * unit);
    modulator.stop(activeContext.currentTime + end * unit);
  }

  function addCrackle(time, frequency, amount, length) {
    const oscillator = activeContext.createOscillator();
    const gain = activeContext.createGain();
    const unit = soundDuration / 6;
    const start = activeContext.currentTime + time * unit;
    const scale = Number(C.qs("[data-volume]").value) / 70;
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain).connect(activeContext.destination);
    gain.gain.setValueAtTime(amount * scale, start);
    gain.gain.exponentialRampToValueAtTime(.0001, start + length * unit);
    oscillator.start(start);
    oscillator.stop(start + length * unit);
  }

  function synthesise(id) {
    const inhaleExhale = [[0,.001],[.35,.55],[1.65,.78],[2.25,.08],[2.6,.001],[3,.18],[3.55,.34],[4.55,.08],[5.1,.001]];
    if (id === "vesicular") {
      breathNoise({ low: 90, high: 750, gain: .27, envelopePoints: inhaleExhale });
      return;
    }
    if (id === "bronchial") {
      breathNoise({ low: 280, high: 1700, gain: .35, envelopePoints: [[0,.001],[.3,.58],[1.6,.82],[2.2,.08],[2.55,.001],[3.05,.001],[3.3,.72],[4.8,.88],[5.55,.05]] });
      return;
    }
    if (id === "wheeze") {
      breathNoise({ low: 130, high: 950, gain: .18, envelopePoints: inhaleExhale });
      addTone(410, 2.85, 5.45, .075, 5.2);
      addTone(565, 3.05, 5.25, .045, 6.3);
      return;
    }
    breathNoise({ low: 100, high: id === "fine-crackles" ? 900 : 650, gain: .19, envelopePoints: inhaleExhale });
    const times = id === "fine-crackles"
      ? [1.12,1.36,1.59,1.74,1.92,2.08]
      : [.55,.92,1.31,1.72,2.12,3.38,3.78,4.22];
    times.forEach((time, index) => {
      const fine = id === "fine-crackles";
      addCrackle(time, (fine ? 1180 : 340) + (index % 3) * (fine ? 180 : 70), fine ? .16 : .2, fine ? .025 : .075);
    });
  }

  function updatePlayback() {
    const elapsed = Math.min(soundDuration, (performance.now() - playbackStartedAt) / 1000);
    const total = Math.ceil(soundDuration);
    C.setText("[data-playback-time]", `0:${String(Math.floor(elapsed)).padStart(2,"0")} / 0:${String(total).padStart(2,"0")}`);
  }

  async function stopSound(message = "Playback stopped") {
    clearInterval(playbackTimer);
    clearTimeout(playbackTimeout);
    playbackTimer = null;
    playbackTimeout = null;
    if (activeContext) {
      const context = activeContext;
      activeContext = null;
      try { await context.close(); } catch {}
    }
    visual.classList.remove("is-playing");
    playButton.disabled = false;
    stopButton.disabled = true;
    C.setText("[data-listening-status]", message);
  }

  async function playSound() {
    await stopSound("Preparing sound");
    C.startClock(state, SOUNDS.length);
    analytics?.start();
    state.hasListened = true;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      C.setText("[data-feedback]", "This browser does not support the audio feature required for this activity.");
      return;
    }
    activeContext = new AudioContextClass();
    await activeContext.resume();
    synthesise(currentSound().id);
    playbackStartedAt = performance.now();
    playButton.disabled = true;
    stopButton.disabled = false;
    visual.classList.add("is-playing");
    C.setText("[data-listening-status]", "Playing representative sound");
    updatePlayback();
    playbackTimer = setInterval(updatePlayback, 100);
    playbackTimeout = setTimeout(() => {
      if (!activeContext) return;
      stopSound("Sound complete");
    }, soundDuration * 1000 + 80);
  }

  function selectChoice(button) {
    if (state.roundComplete) return;
    state.choice = button.dataset.answer;
    choices.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  }

  function showRound() {
    state.choice = null;
    state.hasListened = false;
    state.roundComplete = false;
    state.roundAttempts = 0;
    choices.forEach(button => {
      button.disabled = false;
      button.setAttribute("aria-pressed", "false");
    });
    checkButton.textContent = "Check answer";
    hintButton.disabled = false;
    C.setText("[data-instruction]", `Listen to sound ${state.stage + 1} and identify it.`);
    C.setText("[data-feedback]", "Play the sound at least once before checking your answer.");
    C.setText("[data-listening-status]", "Ready to listen");
    C.setText("[data-playback-time]", `0:00 / 0:${String(Math.ceil(soundDuration)).padStart(2,"0")}`);
    C.updateStatus(state, SOUNDS.length);
  }

  function completeGame() {
    C.stopClock(state);
    stopSound("Challenge complete");
    state.score = Math.max(0, Math.round(state.score));
    C.updateStatus(state, SOUNDS.length);
    C.qs("[data-completion]").hidden = false;
    C.setText("[data-stars]", C.stars(state.score));
    C.setText("[data-completion-message]", `You identified ${state.correct} of ${SOUNDS.length} sounds on the first attempt. Final score: ${state.score}% · Attempts: ${state.attempts}.`);
    const review = C.qs("[data-review]");
    review.replaceChildren();
    order.forEach(sound => {
      const item = document.createElement("p");
      const title = document.createElement("strong");
      title.textContent = sound.label;
      item.append(title, sound.explanation);
      review.append(item);
    });
    analytics?.complete();
    C.submit({ gameId: "cardio-breath-sounds" }, state, state.score);
  }

  function checkAnswer() {
    if (state.roundComplete) {
      state.stage += 1;
      if (state.stage >= SOUNDS.length) completeGame();
      else showRound();
      return;
    }
    if (!state.hasListened) {
      C.setText("[data-feedback]", "Play the sound before checking your answer.");
      return;
    }
    if (!state.choice) {
      C.setText("[data-feedback]", "Choose one breath-sound classification first.");
      return;
    }
    state.attempts += 1;
    state.roundAttempts += 1;
    const sound = currentSound();
    if (state.choice === sound.id) {
      if (state.roundAttempts === 1) state.correct += 1;
      const roundScore = Math.max(8, 20 - (state.roundAttempts - 1) * 4 - (state.hintedStages.has(state.stage) ? 2 : 0));
      state.score += roundScore;
      state.roundComplete = true;
      choices.forEach(button => { button.disabled = true; });
      hintButton.disabled = true;
      C.playCorrectChime();
      C.setText("[data-feedback]", `Correct. ${sound.explanation}`);
      checkButton.textContent = state.stage === SOUNDS.length - 1 ? "View results" : "Next sound";
    } else {
      C.playIncorrectTone();
      C.setText("[data-feedback]", "Not quite. Replay the sample and compare its timing, pitch and continuity before trying again.");
    }
    C.updateStatus(state, SOUNDS.length);
  }

  function showHint() {
    C.startClock(state, SOUNDS.length);
    analytics?.hint(state.stage + 1);
    state.hintedStages.add(state.stage);
    C.setText("[data-feedback]", currentSound().hint);
  }

  async function restart() {
    await stopSound("Ready to listen");
    C.stopClock(state || {});
    window.PhysioSkillsProgress?.resetCompletion();
    analytics?.restart();
    order = shuffle(SOUNDS);
    if (testMode && requestedCase) {
      const selectedIndex = order.findIndex(sound => sound.id === requestedCase);
      if (selectedIndex > 0) order.unshift(order.splice(selectedIndex, 1)[0]);
    }
    state = {
      stage: 0,
      score: 0,
      attempts: 0,
      correct: 0,
      startedAt: null,
      timer: null,
      choice: null,
      hasListened: false,
      roundComplete: false,
      roundAttempts: 0,
      hintedStages: new Set(),
    };
    C.qs("[data-completion]").hidden = true;
    showRound();
  }

  function buildWaveform() {
    const waveform = C.qs("[data-waveform]");
    for (let index = 0; index < 28; index += 1) {
      const bar = document.createElement("span");
      bar.style.setProperty("--bar-height", `${14 + (index * 17 % 44)}px`);
      bar.style.setProperty("--bar-delay", `${(index % 7) * -90}ms`);
      waveform.append(bar);
    }
  }

  C.initialiseTheme();
  buildWaveform();
  playButton.addEventListener("click", playSound);
  stopButton.addEventListener("click", () => stopSound());
  choices.forEach(button => button.addEventListener("click", () => selectChoice(button)));
  checkButton.addEventListener("click", checkAnswer);
  hintButton.addEventListener("click", showHint);
  C.qsa("[data-restart]").forEach(button => button.addEventListener("click", restart));
  addEventListener("pagehide", () => stopSound("Playback stopped"));
  restart();
})();
