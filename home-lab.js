document.querySelectorAll("[data-home-lab]").forEach((explorer) => {
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];
  const panels = [...explorer.querySelectorAll('[role="tabpanel"]')];

  const activate = (index, moveFocus = false) => {
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[tabIndex].hidden = !active;
    });
    if (moveFocus) tabs[index].focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));
    tab.addEventListener("keydown", (event) => {
      const nextKeys = ["ArrowRight", "ArrowDown"];
      const previousKeys = ["ArrowLeft", "ArrowUp"];
      if (![...nextKeys, ...previousKeys, "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") return activate(0, true);
      if (event.key === "End") return activate(tabs.length - 1, true);
      const offset = nextKeys.includes(event.key) ? 1 : -1;
      activate((index + offset + tabs.length) % tabs.length, true);
    });
  });
});
