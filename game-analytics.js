(() => {
  "use strict";

  const endpoint = "https://takwing-game-analytics.takwing-yu.workers.dev";

  function createId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }

  function create(experienceId) {
    let runId = createId();
    let startedAt = null;
    let started = false;
    let completed = false;

    async function record(eventType, details = {}) {
      try {
        await fetch(`${endpoint}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "omit",
          keepalive: true,
          body: JSON.stringify({
            eventId: createId(),
            runId,
            experienceId,
            eventType,
            ...details
          })
        });
      } catch {
        // Analytics must never interrupt the learning activity.
      }
    }

    function start() {
      if (started) return;
      started = true;
      startedAt = performance.now();
      record("play_started");
    }

    function hint(stage) {
      start();
      record("hint_used", { stage });
    }

    function complete() {
      if (completed) return;
      start();
      completed = true;
      record("completed", {
        durationMs: Math.max(1000, Math.round(performance.now() - startedAt))
      });
    }

    function restart() {
      runId = createId();
      startedAt = null;
      started = false;
      completed = false;
    }

    async function loadStats() {
      try {
        const response = await fetch(`${endpoint}/stats?experience=${encodeURIComponent(experienceId)}`, {
          credentials: "omit"
        });
        return response.ok ? response.json() : null;
      } catch {
        return null;
      }
    }

    record("page_view");
    return { start, hint, complete, restart, loadStats };
  }

  window.TakWingGameAnalytics = { create };
})();
