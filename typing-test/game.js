(() => {
  "use strict";

  const TEST_DURATION_MS = 60_000;
  const WORDS_PER_VIEW = 50;
  const words = [
    "the", "and", "with", "from", "have", "this", "that", "your", "will", "about", "after", "before", "between", "through", "because", "people", "different", "important", "system", "change",
    "again", "against", "almost", "always", "another", "around", "become", "begin", "better", "bring", "build", "care", "clear", "close", "common", "consider", "continue", "create", "decide", "develop",
    "during", "each", "early", "education", "enough", "every", "example", "experience", "explain", "follow", "future", "general", "group", "help", "however", "include", "information", "inside", "knowledge", "learn",
    "level", "little", "meaning", "method", "might", "moment", "more", "most", "need", "never", "often", "other", "part", "place", "possible", "practice", "process", "provide", "question", "reason",
    "remember", "research", "result", "right", "same", "school", "should", "show", "since", "small", "something", "still", "student", "study", "support", "take", "teach", "their", "there", "think",
    "together", "under", "understand", "use", "value", "very", "want", "well", "what", "when", "where", "which", "while", "without", "work", "world", "write", "ability", "access", "active",
    "adapt", "apply", "attention", "choice", "communicate", "compare", "complete", "confidence", "connect", "context", "critical", "design", "detail", "effective", "engage", "evidence", "feedback", "focus", "improve", "independent",
    "patient", "movement", "muscle", "joint", "exercise", "assessment", "treatment", "strength", "balance", "mobility", "function", "clinical", "therapy", "rehabilitation", "posture", "walking", "pain", "range", "motion", "health",
    "physiology", "anatomy", "physiotherapy", "reasoning", "diagnosis", "screening", "safety", "symptom", "history", "examination", "intervention", "recovery", "flexion", "extension", "rotation", "gait", "coordination", "endurance", "capacity", "tissue",
    "nerve", "spine", "shoulder", "elbow", "wrist", "hand", "pelvis", "hip", "knee", "ankle", "foot", "tendon", "ligament", "breathing", "circulation", "neurology", "cardiorespiratory", "biomechanics", "palpation", "observation",
    "simulation", "virtual", "reality", "artificial", "intelligence", "technology", "curriculum", "learning", "educator", "reflection", "professional", "judgement", "decision", "communication", "collaboration", "scenario", "debrief", "outcome", "objective", "competence",
    "consent", "privacy", "ethical", "inclusive", "accessible", "source", "evaluate", "measure", "progress", "readiness", "transfer", "authentic", "responsible", "uncertainty", "verify", "bias", "prompt", "resource", "strategy", "alignment"
  ];

  const translations = {
    en: {
      htmlLang: "en", title: "Typing Speed Test", intro: "How quickly and accurately can you type?", eyebrow: "AI and Digital Literacy",
      back: "← Back to resources", themeDark: "Dark mode", themeLight: "Light mode", tracked: "Tracked student mode",
      startKicker: "One focused minute", startTitle: "You will have 60 seconds.", startCopy: "Type the highlighted word and press Space to continue. The timer begins when you start the test.", start: "Start test",
      testHeading: "Active typing test", time: "Time", wpm: "WPM", accuracy: "Accuracy", typingLabel: "Type the highlighted word", inputHelp: "Press Space to submit each word.", wordArea: "Typing words",
      resultsKicker: "Assessment complete", resultsTitle: "Typing Test Complete", correctWords: "Correct words", incorrectWords: "Incorrect words", correctKeys: "Correct keystrokes", incorrectKeys: "Incorrect keystrokes", totalKeys: "Total keystrokes", performance: "Performance score",
      retry: "Try again", returnDashboard: "Return to Skills Lab", returnPortfolio: "Return to portfolio", methodTitle: "How results are calculated", methodCopy: "WPM uses correctly typed characters ÷ 5 ÷ elapsed minutes. Accuracy uses correct keystrokes ÷ total keystrokes.", seconds: "seconds remaining"
    },
    "zh-hant": {
      htmlLang: "zh-Hant", title: "打字速度測試", intro: "你能打得多快、多準確？", eyebrow: "人工智能與數碼素養",
      back: "← 返回資源", themeDark: "深色模式", themeLight: "淺色模式", tracked: "學生進度記錄模式",
      startKicker: "專注一分鐘", startTitle: "你有 60 秒。", startCopy: "輸入反白顯示的英文單字，然後按空格鍵繼續。測試開始後才會計時。", start: "開始測試",
      testHeading: "進行中的打字測試", time: "時間", wpm: "每分鐘字數", accuracy: "準確率", typingLabel: "輸入反白顯示的英文單字", inputHelp: "按空格鍵提交每個單字。", wordArea: "英文打字單字",
      resultsKicker: "評估完成", resultsTitle: "打字測試完成", correctWords: "正確單字", incorrectWords: "錯誤單字", correctKeys: "正確按鍵", incorrectKeys: "錯誤按鍵", totalKeys: "總按鍵數", performance: "表現分數",
      retry: "再試一次", returnDashboard: "返回技能實驗室", returnPortfolio: "返回作品集", methodTitle: "結果計算方法", methodCopy: "每分鐘字數以正確字元數 ÷ 5 ÷ 經過分鐘計算；準確率以正確按鍵數 ÷ 總按鍵數計算。", seconds: "秒剩餘"
    },
    "zh-hans": {
      htmlLang: "zh-Hans", title: "打字速度测试", intro: "你能打得多快、多准确？", eyebrow: "人工智能与数字素养",
      back: "← 返回资源", themeDark: "深色模式", themeLight: "浅色模式", tracked: "学生进度记录模式",
      startKicker: "专注一分钟", startTitle: "你有 60 秒。", startCopy: "输入高亮显示的英文单词，然后按空格键继续。测试开始后才会计时。", start: "开始测试",
      testHeading: "进行中的打字测试", time: "时间", wpm: "每分钟字数", accuracy: "准确率", typingLabel: "输入高亮显示的英文单词", inputHelp: "按空格键提交每个单词。", wordArea: "英文打字单词",
      resultsKicker: "评估完成", resultsTitle: "打字测试完成", correctWords: "正确单词", incorrectWords: "错误单词", correctKeys: "正确按键", incorrectKeys: "错误按键", totalKeys: "总按键数", performance: "表现分数",
      retry: "再试一次", returnDashboard: "返回技能实验室", returnPortfolio: "返回作品集", methodTitle: "结果计算方法", methodCopy: "每分钟字数以正确字符数 ÷ 5 ÷ 经过分钟计算；准确率以正确按键数 ÷ 总按键数计算。", seconds: "秒剩余"
    }
  };

  const $ = selector => document.querySelector(selector);
  const elements = {
    back: $("#back-link"), theme: $("#theme-toggle"), eyebrow: $("#eyebrow"), title: $("#page-title"), intro: $("#page-intro"), tracked: $("#tracked-title"),
    startPanel: $("#start-panel"), startKicker: $("#start-kicker"), startTitle: $("#start-title"), startCopy: $("#start-copy"), startButton: $("#start-button"),
    testPanel: $("#test-panel"), testHeading: $("#test-heading"), timeLabel: $("#time-label"), time: $("#time-value"), wpmLabel: $("#wpm-label"), wpm: $("#wpm-value"), accuracyLabel: $("#accuracy-label"), accuracy: $("#accuracy-value"), announcement: $("#timer-announcement"), wordArea: $("#word-area"), typingLabel: $("#typing-label"), input: $("#typing-input"), inputHelp: $("#input-help"),
    resultsPanel: $("#results-panel"), resultsKicker: $("#results-kicker"), resultsTitle: $("#results-title"), resultWpmLabel: $("#result-wpm-label"), resultWpm: $("#result-wpm"), resultAccuracyLabel: $("#result-accuracy-label"), resultAccuracy: $("#result-accuracy"), correctWordsLabel: $("#correct-words-label"), correctWords: $("#correct-words"), incorrectWordsLabel: $("#incorrect-words-label"), incorrectWords: $("#incorrect-words"), correctKeysLabel: $("#correct-keys-label"), correctKeys: $("#correct-keys"), incorrectKeysLabel: $("#incorrect-keys-label"), incorrectKeys: $("#incorrect-keys"), totalKeysLabel: $("#total-keys-label"), totalKeys: $("#total-keys"), performanceLabel: $("#performance-label"), performance: $("#performance-score"), retry: $("#try-again-button"), returnLink: $("#return-link"), methodTitle: $("#method-title"), methodCopy: $("#method-copy")
  };

  const params = new URLSearchParams(location.search);
  const locale = translations[params.get("lang")] ? params.get("lang") : "en";
  const copy = translations[locale];
  const tracked = params.get("tracked") === "1";
  let sequence = [];
  let submissions = new Map();
  let currentIndex = 0;
  let correctWords = 0;
  let incorrectWords = 0;
  let correctKeystrokes = 0;
  let incorrectKeystrokes = 0;
  let startedAt = null;
  let timerId = null;
  let finished = false;
  let analytics = null;

  function shuffledWords(count = 300) {
    const result = [];
    while (result.length < count) {
      const pool = [...words];
      for (let i = pool.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      for (const word of pool) {
        if (result.length >= count) break;
        if (result.at(-1) !== word) result.push(word);
      }
    }
    return result;
  }

  function elapsedMs() {
    return startedAt == null ? 0 : Math.min(TEST_DURATION_MS, performance.now() - startedAt);
  }

  function metrics() {
    const minutes = elapsedMs() / 60_000;
    const total = correctKeystrokes + incorrectKeystrokes;
    const wpm = minutes > 0 ? (correctKeystrokes / 5) / minutes : 0;
    const accuracy = total > 0 ? (correctKeystrokes / total) * 100 : 100;
    return { wpm, accuracy, total, performanceScore: wpm * (accuracy / 100) };
  }

  function setThemeButton() {
    elements.theme.textContent = document.documentElement.dataset.theme === "dark" ? copy.themeLight : copy.themeDark;
  }

  function localise() {
    document.documentElement.lang = copy.htmlLang;
    document.title = `${copy.title} | Tak Wing Yu`;
    const resourcePath = locale === "en" ? "../resources.html" : `../${locale}/resources.html`;
    elements.back.href = resourcePath;
    const map = {
      eyebrow: "eyebrow", title: "title", intro: "intro", tracked: "tracked", startKicker: "startKicker", startTitle: "startTitle", startCopy: "startCopy", startButton: "start", testHeading: "testHeading", timeLabel: "time", wpmLabel: "wpm", accuracyLabel: "accuracy", typingLabel: "typingLabel", inputHelp: "inputHelp", resultsKicker: "resultsKicker", resultsTitle: "resultsTitle", resultWpmLabel: "wpm", resultAccuracyLabel: "accuracy", correctWordsLabel: "correctWords", incorrectWordsLabel: "incorrectWords", correctKeysLabel: "correctKeys", incorrectKeysLabel: "incorrectKeys", totalKeysLabel: "totalKeys", performanceLabel: "performance", retry: "retry", methodTitle: "methodTitle", methodCopy: "methodCopy"
    };
    Object.entries(map).forEach(([element, key]) => { elements[element].textContent = copy[key]; });
    elements.back.textContent = copy.back;
    elements.wordArea.setAttribute("aria-label", copy.wordArea);
    elements.returnLink.textContent = tracked ? copy.returnDashboard : copy.returnPortfolio;
    elements.returnLink.href = tracked ? "../student/dashboard/" : resourcePath;
    document.querySelectorAll("[data-language]").forEach(link => {
      const lang = link.dataset.language;
      const next = new URL(location.href);
      if (lang === "en") next.searchParams.delete("lang"); else next.searchParams.set("lang", lang);
      link.href = next.href;
      if (lang === locale) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    setThemeButton();
  }

  function renderWord(word, index) {
    const span = document.createElement("span");
    span.className = "word";
    span.dataset.index = String(index);
    const submitted = submissions.get(index);
    if (submitted) {
      span.classList.add(submitted.correct ? "is-correct" : "is-incorrect");
      span.textContent = word;
    } else if (index === currentIndex) {
      span.classList.add("is-current");
      const typed = elements.input.value;
      [...word].forEach((letter, letterIndex) => {
        const character = document.createElement("span");
        character.className = "letter";
        if (letterIndex < typed.length) character.classList.add(typed[letterIndex] === letter ? "is-match" : "is-mismatch");
        character.textContent = letter;
        span.append(character);
      });
      if (typed.length > word.length) {
        const extra = document.createElement("span");
        extra.className = "letter is-mismatch";
        extra.textContent = typed.slice(word.length);
        span.append(extra);
      }
      span.setAttribute("aria-current", "true");
    } else {
      span.textContent = word;
    }
    return span;
  }

  function renderWords() {
    const viewStart = Math.floor(currentIndex / WORDS_PER_VIEW) * WORDS_PER_VIEW;
    const fragment = document.createDocumentFragment();
    sequence.slice(viewStart, viewStart + WORDS_PER_VIEW).forEach((word, offset) => fragment.append(renderWord(word, viewStart + offset), " "));
    elements.wordArea.replaceChildren(fragment);
    const current = elements.wordArea.querySelector(".is-current");
    current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function updateLiveStats() {
    const remaining = Math.max(0, Math.ceil((TEST_DURATION_MS - elapsedMs()) / 1000));
    const current = metrics();
    elements.time.textContent = String(remaining);
    elements.wpm.textContent = String(Math.round(current.wpm));
    elements.accuracy.textContent = `${Math.round(current.accuracy)}%`;
    if ([30, 10, 5].includes(remaining) && elements.announcement.dataset.last !== String(remaining)) {
      elements.announcement.dataset.last = String(remaining);
      elements.announcement.textContent = `${remaining} ${copy.seconds}`;
    }
  }

  function startTimer() {
    if (startedAt != null || finished) return;
    startedAt = performance.now();
    try { analytics?.start(); } catch {}
    timerId = window.setInterval(() => {
      updateLiveStats();
      if (elapsedMs() >= TEST_DURATION_MS) finishTest();
    }, 100);
  }

  function compareWord(typed, target) {
    let matching = 0;
    [...typed].forEach((character, index) => { if (character === target[index]) matching += 1; });
    return { correct: typed === target, matching, incorrect: typed.length - matching };
  }

  function submitWord() {
    const typed = elements.input.value.trim();
    if (!typed || finished) return;
    startTimer();
    const comparison = compareWord(typed, sequence[currentIndex]);
    submissions.set(currentIndex, { typed, correct: comparison.correct });
    correctKeystrokes += comparison.matching;
    incorrectKeystrokes += comparison.incorrect;
    if (comparison.correct) correctWords += 1; else incorrectWords += 1;
    currentIndex += 1;
    elements.input.value = "";
    renderWords();
    updateLiveStats();
  }

  function playCompletionChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.setValueAtTime(523.25, context.currentTime);
      oscillator.frequency.linearRampToValueAtTime(659.25, context.currentTime + 0.18);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.32);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.34);
      oscillator.addEventListener("ended", () => context.close());
    } catch {
      // Sound is optional; the assessment remains fully functional without it.
    }
  }

  function finishTest() {
    if (finished || startedAt == null || elapsedMs() < TEST_DURATION_MS) return;
    finished = true;
    window.clearInterval(timerId);
    timerId = null;
    elements.input.disabled = true;
    updateLiveStats();
    const result = metrics();
    const wpm = Math.round(result.wpm);
    const accuracy = Math.round(result.accuracy * 10) / 10;
    const performanceScore = Math.round(result.performanceScore * 10) / 10;
    elements.resultWpm.textContent = String(wpm);
    elements.resultAccuracy.textContent = `${accuracy}%`;
    elements.correctWords.textContent = String(correctWords);
    elements.incorrectWords.textContent = String(incorrectWords);
    elements.correctKeys.textContent = String(correctKeystrokes);
    elements.incorrectKeys.textContent = String(incorrectKeystrokes);
    elements.totalKeys.textContent = String(result.total);
    elements.performance.textContent = String(performanceScore);
    elements.testPanel.hidden = true;
    elements.resultsPanel.hidden = false;
    try { analytics?.complete(); } catch {}
    window.PhysioSkillsProgress?.submitCompletion({
      game_id: "typing-speed",
      score: performanceScore,
      completed: true,
      attempts: 1,
      duration_seconds: 60
    });
    playCompletionChime();
    elements.resultsTitle.focus?.();
  }

  function prepareAttempt({ beginImmediately = false } = {}) {
    window.clearInterval(timerId);
    timerId = null;
    finished = false;
    startedAt = null;
    sequence = shuffledWords();
    submissions = new Map();
    currentIndex = 0;
    correctWords = 0;
    incorrectWords = 0;
    correctKeystrokes = 0;
    incorrectKeystrokes = 0;
    elements.input.disabled = false;
    elements.input.value = "";
    elements.time.textContent = "60";
    elements.wpm.textContent = "0";
    elements.accuracy.textContent = "100%";
    elements.resultsPanel.hidden = true;
    elements.startPanel.hidden = true;
    elements.testPanel.hidden = false;
    elements.announcement.textContent = "";
    elements.announcement.dataset.last = "";
    try { analytics?.restart(); } catch {}
    window.PhysioSkillsProgress?.resetCompletion();
    renderWords();
    elements.input.focus();
    if (beginImmediately) startTimer();
  }

  elements.startButton.addEventListener("click", () => prepareAttempt({ beginImmediately: true }));
  elements.retry.addEventListener("click", () => prepareAttempt({ beginImmediately: false }));
  elements.input.addEventListener("input", () => { startTimer(); renderWords(); });
  elements.input.addEventListener("keydown", event => {
    if (event.key !== " ") return;
    event.preventDefault();
    submitWord();
  });
  elements.theme.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme-v2", next); } catch {}
    setThemeButton();
  });
  document.addEventListener("click", event => {
    if (!elements.testPanel.hidden && !finished && !event.target.closest("a, button")) elements.input.focus();
  });

  localise();
  analytics = window.TakWingGameAnalytics?.create("typing-speed") || null;
  sequence = shuffledWords();
  renderWords();
})();
