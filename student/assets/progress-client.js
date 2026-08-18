(() => {
  "use strict";

  const auth = window.PhysioSkillsAuth;
  const tracked = new URLSearchParams(location.search).get("tracked") === "1";
  const banner = document.querySelector("[data-tracked-session]");
  const bannerMessage = document.querySelector("[data-tracked-message]");
  const dashboardLink = document.querySelector("[data-skills-dashboard-link]");
  let completionSubmitted = false;

  if (dashboardLink) dashboardLink.href = auth.siteUrl("student/dashboard/");

  const sessionReady = tracked
    ? auth.requireStudentSession().then(user => {
        if (banner) banner.hidden = false;
        if (bannerMessage) bannerMessage.textContent = `Progress will be recorded for ${user.username}.`;
        if (dashboardLink) dashboardLink.hidden = false;
        return user;
      }).catch(error => {
        if (banner) banner.hidden = false;
        if (bannerMessage) bannerMessage.textContent = error?.message || "Log in to record your progress.";
        throw error;
      })
    : Promise.resolve(null);

  async function submitCompletion(result) {
    if (!tracked || completionSubmitted) return null;
    completionSubmitted = true;
    try {
      await sessionReady;
      const response = await auth.saveGameProgress(result);
      if (banner) banner.hidden = false;
      if (bannerMessage) bannerMessage.textContent = "Your result has been saved.";
      if (dashboardLink) dashboardLink.hidden = false;
      return response;
    } catch (error) {
      completionSubmitted = false;
      if (banner) banner.hidden = false;
      if (bannerMessage) bannerMessage.textContent = error?.message || "Your result could not be saved.";
      return null;
    }
  }

  function resetCompletion() {
    completionSubmitted = false;
    if (tracked && bannerMessage) bannerMessage.textContent = "This new attempt will be recorded when completed.";
  }

  if (tracked && banner) {
    banner.hidden = false;
    if (bannerMessage) bannerMessage.textContent = "Checking your student session…";
  }

  window.PhysioSkillsProgress = Object.freeze({
    isTracked: tracked,
    resetCompletion,
    submitCompletion,
  });
})();
