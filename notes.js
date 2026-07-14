(() => {
  const cards = [...document.querySelectorAll(".academic-note")];
  const filterButtons = [...document.querySelectorAll(".notes-filter")];
  const pathwayRoutes = [...document.querySelectorAll(".pathway-route")];

  const applyFilter = (filter) => {
    filterButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });
    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
    pathwayRoutes.forEach((route) => {
      route.classList.toggle("is-muted", filter !== "all" && !route.classList.contains(`pathway-${filter}`));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  const openNote = (noteId, filter = "all") => {
    const target = document.getElementById(noteId);
    if (!target) return;
    applyFilter(filter);
    target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${noteId}`);
  };

  document.querySelectorAll(".pathway-station").forEach((station) => {
    station.addEventListener("click", () => {
      openNote(station.dataset.noteId, station.dataset.filter);
    });
  });

  document.querySelectorAll(".pathway-route-label").forEach((routeLabel) => {
    routeLabel.addEventListener("click", () => {
      applyFilter(routeLabel.dataset.filter);
      document.querySelector(".notes-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const initialNote = window.location.hash.slice(1);
  if (initialNote && document.getElementById(initialNote)?.classList.contains("academic-note")) {
    openNote(initialNote);
  }
})();
