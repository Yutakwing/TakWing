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

  function gameCard(game, item) {
    const article = document.createElement("article");
    article.className = "skills-game-card";

    const category = document.createElement("p");
    category.className = "skills-eyebrow";
    category.textContent = game.category;

    const title = document.createElement("h2");
    title.textContent = game.title;

    const details = document.createElement("dl");
    details.className = "skills-game-stats";
    const rows = [
      ["Status", item.completed ? "Completed" : "Not completed"],
      ["Best score", item.best_score == null ? "—" : `${Math.round(item.best_score)}%`],
      ["Attempts", String(item.total_attempts)],
    ];
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
    const gameUrl = new URL(game.game_url, location.origin);
    gameUrl.searchParams.set("tracked", "1");
    link.href = gameUrl.href;
    link.textContent = item.total_attempts > 0 ? "Try again" : "Start mini-OSPE";

    article.append(category, title, details, link);
    return article;
  }

  async function loadDashboard() {
    setStatus("Loading your Skills Lab…");
    try {
      const user = await auth.requireStudentSession();
      const [games, progress] = await Promise.all([auth.getGames(), auth.getProgress()]);
      welcome.textContent = `Welcome, ${user.username}`;
      progressSummary.textContent = `${progress.completed} / ${progress.total} mini-OSPEs completed`;
      progressBar.max = Math.max(1, progress.total);
      progressBar.value = progress.completed;
      gameGrid.replaceChildren(...games.map(game => gameCard(game, progressFor(game.game_id, progress))));
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
