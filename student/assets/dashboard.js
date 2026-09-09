(() => {
  "use strict";

  const auth = window.PhysioSkillsAuth;
  const welcome = document.querySelector("[data-student-welcome]");
  const progressSummary = document.querySelector("[data-progress-summary]");
  const progressBar = document.querySelector("[data-progress-bar]");
  const gameGrid = document.querySelector("[data-game-grid]");
  const status = document.querySelector("[data-dashboard-status]");
  const logoutButton = document.querySelector("[data-logout]");

  function setStatus(message, type = "") {
    status.textContent = message;
    status.dataset.type = type;
    status.hidden = !message;
  }

  function progressFor(gameId, progress) {
    return progress.games.find(item => item.game_id === gameId) || {
      completed: false,
      best_score: null,
      total_attempts: 0,
    };
  }

  function gameUrlFor(gamePath) {
    const value = String(gamePath || "");
    if (/^https?:\/\//u.test(value)) return new URL(value);
    const siteRelativePath = value.replace(/^\/TakWing\//u, "").replace(/^\/+/, "");
    return new URL(auth.siteUrl(siteRelativePath));
  }

  function gameCard(game, item) {
    const article = document.createElement("article");
    article.className = "skills-game-card";

    const category = document.createElement("p");
    category.className = "skills-eyebrow";
    category.textContent = game.category || "Skills activity";

    const title = document.createElement("h2");
    title.textContent = game.title;

    const details = document.createElement("dl");
    details.className = "skills-game-stats";
    const isTypingTest = game.game_id === "typing-speed";
    const rows = [
      ["Status", item.completed ? "Completed" : "Not completed"],
      [isTypingTest ? "Best performance score" : "Best score", item.best_score == null ? "—" : isTypingTest ? String(Math.round(item.best_score)) : `${Math.round(item.best_score)}%`],
      ["Attempts", String(item.total_attempts)],
    ];
    if (item.best_technical_score != null) rows[1] = [isTypingTest ? 'Best accuracy' : 'Best technical score', `${item.best_technical_score}%`];
    else rows[1] = [item.best_score == null ? 'Best score' : 'Historical score (previous scale)', item.best_score == null ? '—' : String(item.best_score)];
    rows.push([isTypingTest ? 'Latest accuracy' : 'Latest technical score', item.latest_score == null ? 'Not yet recorded' : `${item.latest_score}%`]);
    for (const [term, value] of rows) {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = term;
      dd.textContent = value;
      if (term === "Status" && item.completed) dd.className = "is-complete";
      details.append(dt, dd);
    }

    const link = document.createElement("a");
    link.className = "skills-button";
    const gameUrl = gameUrlFor(game.game_url);
    gameUrl.searchParams.set("tracked", "1");
    link.href = gameUrl.href;
    link.textContent = item.total_attempts > 0 ? "Try again" : isTypingTest ? "Start test" : "Start mini-OSPE";

    article.append(category, title, details, link);
    const history = document.createElement('details');
    const summary = document.createElement('summary'); summary.textContent='Recent attempts';
    const list=document.createElement('ol');
    history.append(summary,list); article.append(history);
    let loaded=false;
    history.addEventListener('toggle', async () => {
      if (!history.open || loaded) return;
      loaded=true; list.textContent='Loading...';
      try {
        const response=await auth.getAttempts(game.game_id); list.replaceChildren();
        for (const attempt of response.attempts) {
          const row=document.createElement('li');
          const score=attempt.technical_score == null ? `${attempt.legacy_score ?? '-'} (previous scale)` : `${attempt.technical_score}%`;
          row.textContent=`${new Date(attempt.created_at).toLocaleString()}: ${score}; ${attempt.duration_seconds ?? 0}s; hints ${attempt.hints_used}, AI requests ${attempt.ai_requests}`;
          list.append(row);
        }
        if (!response.attempts.length) list.textContent='No attempts yet.';
      } catch { loaded=false; list.textContent='History unavailable. Close and reopen to retry.'; }
    });
    return article;
  }

  function gameGroup(category, games, progress) {
    const section = document.createElement("section");
    section.className = "skills-game-group";

    const heading = document.createElement("header");
    heading.className = "skills-game-group-heading";
    const headingText = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "skills-eyebrow";
    eyebrow.textContent = "Skills category";
    const title = document.createElement("h2");
    title.textContent = category;
    const count = document.createElement("span");
    count.textContent = `${games.length} ${games.length === 1 ? "activity" : "activities"}`;
    headingText.append(eyebrow, title);
    heading.append(headingText, count);

    const grid = document.createElement("div");
    grid.className = "skills-game-grid";
    grid.append(...games.map(game => gameCard(game, progressFor(game.game_id, progress))));
    section.append(heading, grid);
    return section;
  }

  async function loadDashboard() {
    setStatus("Loading your Skills Lab…");
    try {
      const user = await auth.requireStudentSession();
      const [games, progress] = await Promise.all([auth.getGames(), auth.getProgress()]);
      welcome.textContent = `Welcome, ${user.username}`;
      progressSummary.textContent = `${progress.completed} / ${progress.total} activities completed`;
      progressBar.max = Math.max(1, progress.total);
      progressBar.value = progress.completed;
      const groupedGames = new Map();
      for (const game of games) {
        const category = game.category || "Other skills";
        if (!groupedGames.has(category)) groupedGames.set(category, []);
        groupedGames.get(category).push(game);
      }
      gameGrid.replaceChildren(...[...groupedGames].map(([category, categoryGames]) => gameGroup(category, categoryGames, progress)));
      setStatus("");
    } catch (error) {
      if (error?.status === 401) return;
      setStatus(error?.message || "The dashboard could not be loaded.", "error");
    }
  }

  logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;
    logoutButton.textContent = "Logging out…";
    await auth.logout();
    auth.redirectToLogin();
  });

  loadDashboard();
})();
