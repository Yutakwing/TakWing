const root = document.documentElement;
const themeStorageKey = "portfolio-theme-v2";
const progress = document.querySelector(".navigation-progress");
const searchOverlay = document.querySelector(".search-overlay");
const searchInput = document.querySelector(".search-modal input");
const searchResults = document.querySelector(".search-results");
const mobilePanel = document.querySelector(".mobile-panel");
const menuToggle = document.querySelector(".menu-toggle");

let searchIndex = window.SEARCH_INDEX || [];
let normalizedSearchIndex = [];
let searchIndexState = window.SEARCH_INDEX ? "ready" : "loading";

const searchMessages = {
  en: {
    loading: "Loading search...",
    unavailable: "Search is temporarily unavailable.",
    noResults: "No results",
    tryAgain: "Try a different keyword.",
  },
  "zh-Hant": {
    loading: "正在載入搜尋資料……",
    unavailable: "搜尋功能暫時無法使用。",
    noResults: "找不到結果",
    tryAgain: "請嘗試其他關鍵字。",
  },
  "zh-Hans": {
    loading: "正在加载搜索资料……",
    unavailable: "搜索功能暂时无法使用。",
    noResults: "找不到结果",
    tryAgain: "请尝试其他关键词。",
  },
};
const searchUi = searchMessages[document.documentElement.lang] || searchMessages.en;

const searchIndexUrl = new URL(
  document.body.dataset.searchIndex || "./search-index.json",
  window.location.href,
);
const searchBase = new URL(".", searchIndexUrl);

function shouldOpenInNewTab(href) {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:")) return false;
  if (href.startsWith("tel:")) return false;
  if (href.startsWith("javascript:")) return false;
  try {
    const url = new URL(href, window.location.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function applyLinkTargets(scope = document) {
  scope.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!shouldOpenInNewTab(href)) return;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

fetch(searchIndexUrl, { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Search index could not be loaded (${response.status})`);
    }
    return response.json();
  })
  .then((items) => {
    searchIndex = items;
    searchIndexState = "ready";
    normalizedSearchIndex = items.map((item) => ({
      item,
      titleText: normalizeSearchText(item.title),
      descriptionText: normalizeSearchText(item.description),
      haystack: normalizeSearchText(`${item.title} ${item.description} ${item.category || ""} ${item.content || ""}`),
    }));
    if (searchInput?.value?.trim()) {
      renderSearch(searchInput.value);
    }
  })
  .catch((error) => {
    console.error(error);
    searchIndex = [];
    normalizedSearchIndex = [];
    searchIndexState = "error";
    if (searchInput?.value?.trim()) {
      renderSearch(searchInput.value);
    }
  });

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
}

function toggleTheme() {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
}

function renderSearch(query) {
  const value = normalizeSearchText(query);
  if (!value) {
    searchResults.innerHTML = "";
    searchResults.classList.remove("active");
    return;
  }
  if (searchIndexState !== "ready") {
    const message = searchIndexState === "loading" ? searchUi.loading : searchUi.unavailable;
    searchResults.innerHTML = `<div class="search-empty"><strong>${message}</strong></div>`;
    searchResults.classList.add("active");
    return;
  }
  const tokens = value.split(" ").filter(Boolean);
  const source = normalizedSearchIndex.length
    ? normalizedSearchIndex
    : searchIndex.map((item) => ({
        item,
        titleText: normalizeSearchText(item.title),
        descriptionText: normalizeSearchText(item.description),
        haystack: normalizeSearchText(`${item.title} ${item.description} ${item.category || ""} ${item.content || ""}`),
      }));
  const matches = source
    .filter(({ haystack }) => tokens.every((token) => haystack.includes(token)))
    .map(({ item, titleText, descriptionText }) => ({
      item,
      rank: titleText === value
        ? 4
        : titleText.startsWith(value)
          ? 3
          : titleText.includes(value)
            ? 2
            : descriptionText.includes(value)
              ? 1
              : 0,
    }))
    .sort((a, b) => b.rank - a.rank)
    .map(({ item }) => item);

  searchResults.innerHTML = (matches.length ? matches : [{
    title: searchUi.noResults,
    description: searchUi.tryAgain,
    href: "",
    empty: true,
  }])
    .slice(0, 8)
    .map((item) => {
      if (item.empty) {
        return `<div class="search-empty"><strong>${item.title}</strong><br><small>${item.description}</small></div>`;
      }
      const url = new URL(item.href, searchBase);
      return `<a href="${url.href}"><strong>${item.title}</strong><br><small>${item.description}</small></a>`;
    })
    .join("");
  applyLinkTargets(searchResults);
  searchResults.classList.add("active");
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
}

const storedTheme = localStorage.getItem(themeStorageKey);
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(storedTheme || systemTheme);

document.querySelectorAll(".theme-toggle").forEach((button) => {
  button.addEventListener("click", toggleTheme);
});

document.querySelector(".search-button").addEventListener("click", () => {
  searchOverlay.classList.add("active");
  searchInput.focus();
});

searchOverlay.addEventListener("click", (event) => {
  if (event.target === searchOverlay) {
    searchOverlay.classList.remove("active");
    searchInput.value = "";
    renderSearch("");
  }
});

searchInput.addEventListener("input", (event) => renderSearch(event.target.value));

searchResults.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) {
    searchOverlay.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchOverlay.classList.remove("active");
    mobilePanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobilePanel.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelector(".close-menu").addEventListener("click", () => {
  mobilePanel.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".mobile-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('[data-share="copy"]').forEach((copyButton) => {
  copyButton.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const copyLabel = button.dataset.copyLabel || "Copy link";
    const copiedLabel = button.dataset.copiedLabel || "Copied";
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    } else {
      const temporaryInput = document.createElement("input");
      temporaryInput.value = window.location.href;
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      temporaryInput.remove();
    }
    button.textContent = copiedLabel;
    setTimeout(() => {
      button.textContent = copyLabel;
    }, 1200);
  });
});

document.querySelectorAll(".citation-copy").forEach((copyButton) => {
  copyButton.addEventListener("click", async () => {
    const value = copyButton.dataset.citation || "";
    if (!value) return;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      const temporaryInput = document.createElement("input");
      temporaryInput.value = value;
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      temporaryInput.remove();
    }
  });
});

applyLinkTargets();

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
