(() => {
  "use strict";

  const PRODUCTION_API_BASE = "https://physio-skills-api.takwing-yu.workers.dev";
  const LOCAL_API_BASE = "http://127.0.0.1:8787";
  const localPreview = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const API_BASE = window.PHYSIO_SKILLS_API_BASE
    || (localPreview ? LOCAL_API_BASE : PRODUCTION_API_BASE);
  const TOKEN_KEY = "physio-skills-session";
  const scriptUrl = document.currentScript?.src || location.href;
  const SITE_ROOT = new URL("../../", scriptUrl);

  class ApiError extends Error {
    constructor(message, status = 0) {
      super(message);
      this.name = "ApiError";
      this.status = status;
    }
  }

  function siteUrl(path = "") {
    return new URL(String(path).replace(/^\//u, ""), SITE_ROOT).href;
  }

  function getToken() {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || "";
    } catch {
      return "";
    }
  }

  function setToken(token) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {
      throw new ApiError("Session storage is unavailable in this browser.");
    }
  }

  function clearSession() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      // A blocked storage API is equivalent to having no session.
    }
  }

  function isConfigured() {
    return /^https:\/\/[^/]+\.workers\.dev$/u.test(API_BASE)
      || /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/u.test(API_BASE);
  }

  function configurationError() {
    return new ApiError("The Skills Lab API has not been configured yet.");
  }

  function redirectToLogin() {
    location.replace(siteUrl("student/login/"));
  }

  function redirectToDashboard() {
    location.assign(siteUrl("student/dashboard/"));
  }

  async function apiRequest(path, options = {}, redirectOnUnauthorized = true) {
    if (!isConfigured()) throw configurationError();
    const headers = new Headers(options.headers || {});
    headers.set("Accept", "application/json");
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    let response;
    try {
      response = await fetch(`${API_BASE}${path}`, { ...options, headers, mode: "cors" });
    } catch {
      throw new ApiError("The Skills Lab service could not be reached. Please try again.");
    }

    if (response.status === 401) {
      clearSession();
      if (redirectOnUnauthorized) redirectToLogin();
    }
    if (response.status === 204) return null;

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new ApiError(payload.error || "The request could not be completed.", response.status);
    return payload;
  }

  async function login(username, password) {
    const result = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }, false);
    if (!result?.session_token) throw new ApiError("The login response was incomplete.");
    setToken(result.session_token);
    return result.user;
  }

  async function logout() {
    try {
      if (getToken() && isConfigured()) await apiRequest("/api/logout", { method: "POST" }, false);
    } finally {
      clearSession();
    }
  }

  function getCurrentUser(redirectOnUnauthorized = true) {
    return apiRequest("/api/me", { method: "GET" }, redirectOnUnauthorized);
  }

  function getGames() {
    return apiRequest("/api/games", { method: "GET" });
  }

  function getProgress() {
    return apiRequest("/api/progress", { method: "GET" });
  }

  function saveGameProgress(result) {
    return apiRequest("/api/progress", {
      method: "POST",
      body: JSON.stringify(result),
    });
  }

  async function requireStudentSession() {
    if (!getToken()) {
      redirectToLogin();
      throw new ApiError("Authentication required.", 401);
    }
    return getCurrentUser(true);
  }

  window.PhysioSkillsAuth = Object.freeze({
    API_BASE,
    ApiError,
    clearSession,
    getCurrentUser,
    getGames,
    getProgress,
    getToken,
    isConfigured,
    login,
    logout,
    redirectToDashboard,
    redirectToLogin,
    requireStudentSession,
    saveGameProgress,
    siteUrl,
  });
})();
