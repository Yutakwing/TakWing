(() => {
  "use strict";

  const script = document.currentScript;
  const scriptUrl = script?.src ? new URL(script.src) : new URL("assets/js/takwing-mascot.js", document.baseURI);
  const siteRoot = new URL("../../", scriptUrl);
  const imageRoot = new URL("../images/takwing-bot/", scriptUrl);
  const states = new Set(["idle", "blink", "smile", "wink", "thinking", "confused", "wave", "fallback"]);
  const commonStates = ["idle", "blink", "smile", "thinking"];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const timers = new Set();
  let blinkTimer = null;
  let reactionToken = 0;
  let currentState = "idle";
  let hasInteracted = false;
  let hasSaidGoodbye = false;
  let isOpen = false;

  const requestedLocale = new URLSearchParams(location.search).get("lang");
  const locale = requestedLocale === "zh-hant" || document.documentElement.lang === "zh-Hant"
    ? "zh-hant"
    : requestedLocale === "zh-hans" || document.documentElement.lang === "zh-Hans"
      ? "zh-hans"
      : "en";

  const copy = {
    en: {
      title: "Hello from Tak Wing",
      open: "Open Tak Wing’s welcome message",
      close: "Close Tak Wing’s welcome message",
      greeting: "Hi! 👋 Thanks for visiting. If you would like to know more or have a conversation, send me your details below.",
      home: "Welcome! 👋 I’d be pleased to hear what brought you to my work.",
      research: "Looking for research on AI, VR or simulation?",
      games: "Want to try a challenge?",
      clarification: "Hmm, could you tell me a little more? Try AI, VR, teaching, writing, games or contact.",
      goodbye: "See you around! 👋",
      success: "Nice work! Your placement was accurate.",
      notFound: "Hmm… I can’t find that page either. Let me help you get back.",
      firstName: "Name",
      surname: "Surname",
      email: "Email",
      message: "Message",
      send: "Prepare email",
      contact: "Contact me",
      emailNote: "This opens your email application. Your details are not stored on this website.",
      emailSubject: "Website enquiry",
    },
    "zh-hant": {
      title: "德榮向你問好",
      open: "開啟德榮的歡迎訊息",
      close: "關閉德榮的歡迎訊息",
      greeting: "你好！👋 感謝瀏覽我的網站。如想進一步了解我的工作或與我交流，歡迎在下方留下資料。",
      home: "歡迎！👋 我很樂意了解你為何來到我的網站。",
      research: "正在尋找人工智能、虛擬實境或模擬教學研究？",
      games: "想試一個挑戰嗎？",
      clarification: "可以再說多一點嗎？你可嘗試輸入人工智能、虛擬實境、教學、文章、遊戲或聯絡。",
      goodbye: "下次見！👋",
      success: "做得好！你的定位很準確。",
      notFound: "我也找不到這個頁面。讓我協助你返回網站。",
      firstName: "名字",
      surname: "姓氏",
      email: "電郵",
      message: "訊息",
      send: "準備電郵",
      contact: "聯絡我",
      emailNote: "此操作會開啟你的電郵應用程式。網站不會儲存你的資料。",
      emailSubject: "網站查詢",
    },
    "zh-hans": {
      title: "德荣向你问好",
      open: "开启德荣的欢迎信息",
      close: "关闭德荣的欢迎信息",
      greeting: "你好！👋 感谢浏览我的网站。如想进一步了解我的工作或与我交流，欢迎在下方留下资料。",
      home: "欢迎！👋 我很乐意了解你为何来到我的网站。",
      research: "正在寻找人工智能、虚拟现实或模拟教学研究？",
      games: "想试一个挑战吗？",
      clarification: "可以再说多一点吗？你可尝试输入人工智能、虚拟现实、教学、文章、游戏或联系。",
      goodbye: "下次见！👋",
      success: "做得好！你的定位很准确。",
      notFound: "我也找不到这个页面。让我协助你返回网站。",
      firstName: "名字",
      surname: "姓氏",
      email: "电邮",
      message: "信息",
      send: "准备电邮",
      contact: "联系我",
      emailNote: "此操作会开启你的电邮应用程序。网站不会储存你的资料。",
      emailSubject: "网站查询",
    },
  }[locale];

  const localePrefix = locale === "en" ? "" : `${locale}/`;
  const href = (page) => new URL(`${localePrefix}${page}`, siteRoot).href;
  const contactHref = href("collaborate.html");

  const wrapper = document.createElement("aside");
  wrapper.className = "takwing-assistant";
  wrapper.dataset.pageKind = /goniometry|runner|readiness|literacy/.test(location.pathname) ? "game" : "site";
  wrapper.innerHTML = `
    <section class="takwing-assistant-panel" id="takwing-assistant-panel" aria-labelledby="takwing-assistant-title" hidden>
      <div class="takwing-assistant-heading">
        <strong id="takwing-assistant-title">${copy.title}</strong>
        <button class="takwing-assistant-close" type="button" aria-label="${copy.close}">×</button>
      </div>
      <p class="takwing-assistant-message" aria-live="polite">${copy.greeting}<span class="takwing-thinking-dots" hidden aria-hidden="true"><i></i><i></i><i></i></span></p>
      <form class="takwing-assistant-form">
        <div class="takwing-assistant-name-row">
          <label><span>${copy.firstName}</span><input name="firstName" autocomplete="given-name" required></label>
          <label><span>${copy.surname}</span><input name="surname" autocomplete="family-name" required></label>
        </div>
        <label><span>${copy.email}</span><input name="email" type="email" autocomplete="email" required></label>
        <label><span>${copy.message}</span><textarea name="message" rows="3" required></textarea></label>
        <p class="takwing-assistant-note">${copy.emailNote}</p>
        <div class="takwing-assistant-actions">
          <button type="submit">${copy.send}</button>
          <a href="${contactHref}">${copy.contact}</a>
        </div>
      </form>
    </section>
    <button class="takwing-assistant-toggle" type="button" aria-label="${copy.open}" aria-expanded="false" aria-controls="takwing-assistant-panel">
      <img class="takwing-mascot-image" src="${new URL("idle.webp", imageRoot).href}" alt="" width="512" height="512">
    </button>`;
  document.body.appendChild(wrapper);

  const panel = wrapper.querySelector(".takwing-assistant-panel");
  const toggle = wrapper.querySelector(".takwing-assistant-toggle");
  const close = wrapper.querySelector(".takwing-assistant-close");
  const image = wrapper.querySelector(".takwing-mascot-image");
  const message = wrapper.querySelector(".takwing-assistant-message");
  const dots = wrapper.querySelector(".takwing-thinking-dots");
  const form = wrapper.querySelector(".takwing-assistant-form");
  const firstField = form.elements.firstName;

  function later(callback, delay) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      callback();
    }, delay);
    timers.add(id);
    return id;
  }

  function clearReactionTimers() {
    timers.forEach(window.clearTimeout);
    timers.clear();
  }

  function setMessage(value) {
    message.firstChild.nodeValue = value;
  }

  function scheduleBlink() {
    window.clearTimeout(blinkTimer);
    if (document.hidden || currentState !== "idle") return;
    blinkTimer = window.setTimeout(() => {
      if (currentState !== "idle") return scheduleBlink();
      setState("blink");
      later(() => setState("idle"), 120 + Math.floor(Math.random() * 61));
    }, 4000 + Math.floor(Math.random() * 4001));
  }

  function setState(nextState) {
    const safeState = states.has(nextState) ? nextState : "fallback";
    currentState = safeState;
    dots.hidden = safeState !== "thinking";
    image.classList.add("is-changing");
    const nextSource = new URL(`${safeState}.webp`, imageRoot).href;
    later(() => {
      image.src = nextSource;
      image.dataset.state = safeState;
      image.classList.remove("is-changing");
      if (safeState === "idle") scheduleBlink();
      else window.clearTimeout(blinkTimer);
    }, reducedMotion.matches ? 0 : 75);
    return safeState;
  }

  function sequence(steps) {
    reactionToken += 1;
    const token = reactionToken;
    clearReactionTimers();
    let elapsed = 0;
    steps.forEach(([state, duration], index) => {
      later(() => {
        if (token !== reactionToken) return;
        setState(state);
      }, elapsed);
      elapsed += reducedMotion.matches ? Math.min(duration, 120) : duration;
      if (index === steps.length - 1 && state !== "idle") {
        later(() => token === reactionToken && setState("idle"), elapsed);
      }
    });
  }

  function react(reaction) {
    switch (reaction) {
      case "greeting":
      case "opened": sequence([["wave", 1200], ["smile", 900], ["idle", 0]]); break;
      case "thinking":
      case "waiting": clearReactionTimers(); setState("thinking"); break;
      case "happy":
      case "response": sequence([["smile", 1000], ["idle", 0]]); break;
      case "correct":
      case "success": sequence(Math.random() < 0.45 ? [["smile", 850], ["wink", 650], ["idle", 0]] : [["smile", 1100], ["idle", 0]]); break;
      case "wink": sequence([["wink", 750], ["idle", 0]]); break;
      case "clarification": sequence([["confused", 1500], ["idle", 0]]); break;
      case "goodbye": sequence([["wave", 1000], ["idle", 0]]); break;
      default: setState("idle");
    }
  }

  function reset() {
    reactionToken += 1;
    clearReactionTimers();
    setState("idle");
  }

  function openAssistant() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    isOpen = true;
    hasInteracted = true;
    const isMissingPage = document.body.dataset.mascotContext === "404";
    setMessage(isMissingPage ? copy.notFound : copy.greeting);
    react(isMissingPage ? "clarification" : "greeting");
    firstField.focus({ preventScroll: true });
  }

  function closeAssistant() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    isOpen = false;
    toggle.focus();
    if (hasInteracted && !hasSaidGoodbye) {
      hasSaidGoodbye = true;
      react("goodbye");
    } else reset();
  }

  toggle.addEventListener("click", () => isOpen ? closeAssistant() : openAssistant());
  close.addEventListener("click", closeAssistant);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) closeAssistant();
  });
  document.addEventListener("visibilitychange", scheduleBlink);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    hasInteracted = true;
    const details = new FormData(form);
    const body = [
      `${copy.firstName}: ${details.get("firstName")}`,
      `${copy.surname}: ${details.get("surname")}`,
      `${copy.email}: ${details.get("email")}`,
      "",
      `${copy.message}:`,
      details.get("message"),
    ].join("\n");
    react("happy");
    window.location.href = `mailto:yutakwing001@gmail.com?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(body)}`;
  });

  image.addEventListener("error", () => {
    const fallback = new URL("fallback.webp", imageRoot).href;
    if (image.src !== fallback) image.src = fallback;
    else image.hidden = true;
  });

  commonStates.forEach((state) => {
    const preloaded = new Image();
    preloaded.src = new URL(`${state}.webp`, imageRoot).href;
  });

  window.TakWingMascot = Object.freeze({ setState, react, reset, getState: () => currentState });
  window.reactToAssistantEvent = (eventType, detail = {}) => {
    switch (eventType) {
      case "opened": openAssistant(); break;
      case "waiting": react("thinking"); break;
      case "response": react("happy"); break;
      case "success":
        if (detail.message) setMessage(detail.message);
        else if (/elbow-goniometry/.test(location.pathname)) setMessage(copy.success);
        react("correct");
        if (!isOpen) {
          panel.hidden = false;
          toggle.setAttribute("aria-expanded", "true");
          isOpen = true;
          later(() => {
            panel.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
            isOpen = false;
          }, reducedMotion.matches ? 1800 : 3200);
        }
        break;
      case "clarification": setMessage(detail.message || copy.clarification); react("clarification"); break;
      case "closed": closeAssistant(); break;
      default: reset();
    }
  };
  window.addEventListener("takwing:assistant-event", (event) => window.reactToAssistantEvent(event.detail?.type, event.detail || {}));
  scheduleBlink();
})();
