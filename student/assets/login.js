(() => {
  "use strict";

  const auth = window.PhysioSkillsAuth;
  const form = document.querySelector("[data-login-form]");
  const username = form.elements.username;
  const password = form.elements.password;
  const showPassword = form.elements.showPassword;
  const submit = form.querySelector("button[type='submit']");
  const error = document.querySelector("[data-login-error]");

  function setError(message = "") {
    error.textContent = message;
    error.hidden = !message;
  }

  showPassword.addEventListener("change", () => {
    password.type = showPassword.checked ? "text" : "password";
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    setError();
    submit.disabled = true;
    submit.textContent = "Logging in…";
    try {
      await auth.login(username.value, password.value);
      password.value = "";
      auth.redirectToDashboard();
    } catch (reason) {
      setError(reason?.message || "Invalid account or password.");
      password.focus();
    } finally {
      submit.disabled = false;
      submit.textContent = "Log in";
    }
  });

  if (auth.getToken() && auth.isConfigured()) {
    auth.getCurrentUser(false).then(() => auth.redirectToDashboard()).catch(() => auth.clearSession());
  }
})();
