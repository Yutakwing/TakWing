(() => {
  const cards = [...document.querySelectorAll(".academic-note")];
  const filterButtons = [...document.querySelectorAll(".notes-filter")];
  const applyFilter = (filter) => {
    filterButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });
    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  });

  const openNote = (noteId) => {
    const target = document.getElementById(noteId);
    if (!target) return;
    target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    history.replaceState(null, "", `#${noteId}`);
  };

  const normalizeChartLabel = (value) =>
    value
      .split("\n")[0]
      .replace(/\s+/g, " ")
      .trim();

  const bindMermaidInteractivity = () => {
    const chart = document.querySelector("#notes-graph");
    const chartDataElement = document.querySelector("#notes-chart-data");
    const svg = chart?.querySelector("svg");
    if (!chart || !chartDataElement || !svg) return false;

    const chartData = JSON.parse(chartDataElement.textContent);
    const metadataByLabel = new Map(chartData.map((item) => [item.label, item]));
    const nodeGroups = [...svg.querySelectorAll(".nodes .node")];
    const labelNodes = [...svg.querySelectorAll(".node-labels text")];
    if (!nodeGroups.length || !labelNodes.length || nodeGroups.length !== labelNodes.length) return false;

    const bindTarget = (target, meta) => {
      if (target.dataset.notesBound === "true") return;
      target.dataset.notesBound = "true";
      target.classList.add("chart-node-interactive");
      if (meta.type === "note") {
        target.setAttribute("role", "link");
        target.setAttribute("tabindex", "0");
        target.setAttribute("aria-label", `Open ${meta.label}`);
      } else {
        target.setAttribute("role", "button");
        target.setAttribute("tabindex", "0");
        target.setAttribute("aria-label", `Filter ${meta.label}`);
      }

      const activate = () => {
        if (meta.type === "note") {
          applyFilter(meta.filter || "all");
          openNote(meta.noteId);
          return;
        }
        applyFilter(meta.filter || "all");
        history.replaceState(null, "", "#notes-graph");
      };

      target.addEventListener("click", activate);
      target.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    };
    labelNodes.forEach((labelNode, index) => {
      const label = normalizeChartLabel(labelNode.textContent);
      if (!label) return;
      const meta = metadataByLabel.get(label);
      if (!meta) return;
      const nodeGroup = nodeGroups[index];
      bindTarget(nodeGroup, meta);
      bindTarget(labelNode, meta);
    });

    return svg.querySelectorAll(".chart-node-interactive").length > 0;
  };

  const mermaidApi = window.mermaid || globalThis.mermaid;
  if (mermaidApi) {
    mermaidApi.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "base",
      themeVariables: {
        background: "#111817",
        primaryColor: "#54d6c0",
        primaryTextColor: "#f4f7f1",
        lineColor: "#7ed9cc",
        tertiaryColor: "#16211f",
        fontFamily: "Outfit, Noto Sans TC, Noto Sans SC, system-ui, sans-serif",
      },
    });
  }

  let attempts = 0;
  const tryBind = () => {
    if (bindMermaidInteractivity() || attempts > 30) return;
    attempts += 1;
    window.setTimeout(tryBind, 250);
  };
  tryBind();
})();
