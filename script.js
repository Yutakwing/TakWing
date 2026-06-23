const root = document.documentElement;
const progress = document.querySelector(".navigation-progress");
const searchOverlay = document.querySelector(".search-overlay");
const searchInput = document.querySelector(".search-modal input");
const searchResults = document.querySelector(".search-results");
const mobilePanel = document.querySelector(".mobile-panel");
const menuToggle = document.querySelector(".menu-toggle");

let searchIndex = window.SEARCH_INDEX || [
  {
    title: "Home",
    href: "./index.html#about",
    description: "Tak Wing's migrated WordPress archive.",
  },
];

const searchBase = document.currentScript?.src
  ? new URL(".", document.currentScript.src)
  : new URL("./", window.location.href);

fetch(new URL("search-index.json", searchBase))
  .then((response) => (response.ok ? response.json() : searchIndex))
  .then((items) => {
    searchIndex = items;
  })
  .catch(() => {});

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("blog-theme", theme);
}

function toggleTheme() {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
}

function renderSearch(query) {
  const value = query.trim().toLowerCase();
  const matches = searchIndex.filter((item) =>
    `${item.title} ${item.description} ${item.category || ""}`.toLowerCase().includes(value)
  );

  searchResults.innerHTML = matches
    .slice(0, 8)
    .map((item) => `<a href="${item.href}"><strong>${item.title}</strong><br><small>${item.description}</small></a>`)
    .join("");
  searchResults.classList.toggle("active", value.length > 0);
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
}

setTheme(localStorage.getItem("blog-theme") || "light");

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
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy link";
    }, 1200);
  });
});

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
