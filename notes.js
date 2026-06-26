(() => {
  const cards = [...document.querySelectorAll(".academic-note")];
  document.querySelectorAll(".notes-filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".notes-filter").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const filter = button.dataset.filter;
      cards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  const graph = document.querySelector("#notes-graph");
  const graphDataElement = document.querySelector("#notes-graph-data");
  if (!graph || !graphDataElement) return;

  const nodeData = JSON.parse(graphDataElement.textContent);
  const links = [
    ["osce", "amee"], ["osce", "student-engagement"], ["osce", "teaching-technology"],
    ["functional-anatomy", "movement-science"], ["amee", "student-engagement"], ["amee", "ai-foundations"],
    ["student-engagement", "teaching-technology"], ["teaching-technology", "generative-ai"],
    ["teaching-technology", "vr-design"], ["ai-foundations", "generative-ai"],
    ["ai-foundations", "research-integrity"], ["ai-foundations", "ai-physio"],
    ["generative-ai", "research-integrity"], ["generative-ai", "ai-physio"],
    ["ai-physio", "osce"], ["ai-physio", "student-engagement"],
    ["trexo", "functional-anatomy"], ["para-sport", "movement-science"],
  ];
  const colors = {
    education: "#b4533c",
    technology: "#0f766e",
    physiotherapy: "#3d7a52",
    research: "#5f4b8b",
  };
  const namespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(namespace, "svg");
  graph.append(svg);
  const width = graph.clientWidth || 900;
  const height = graph.clientHeight || 560;

  nodeData.forEach((node, index) => {
    const angle = Math.PI * 2 * index / nodeData.length;
    node.x = width / 2 + Math.cos(angle) * width * 0.32;
    node.y = height / 2 + Math.sin(angle) * height * 0.32;
    node.vx = 0;
    node.vy = 0;
  });

  const byId = Object.fromEntries(nodeData.map((node) => [node.id, node]));
  const edgeData = links.map(([a, b]) => ({ a: byId[a], b: byId[b] }));
  edgeData.forEach((edge) => {
    edge.element = document.createElementNS(namespace, "line");
    edge.element.setAttribute("class", "graph-link");
    svg.append(edge.element);
  });

  const draw = () => {
    edgeData.forEach((edge) => {
      edge.element.setAttribute("x1", edge.a.x);
      edge.element.setAttribute("y1", edge.a.y);
      edge.element.setAttribute("x2", edge.b.x);
      edge.element.setAttribute("y2", edge.b.y);
    });
    nodeData.forEach((node) => node.element.setAttribute("transform", `translate(${node.x} ${node.y})`));
  };

  nodeData.forEach((node) => {
    const group = document.createElementNS(namespace, "g");
    group.setAttribute("class", "graph-node");
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "link");
    group.setAttribute("aria-label", `${graph.dataset.openLabel} ${node.label}`);
    const circle = document.createElementNS(namespace, "circle");
    circle.setAttribute("r", "13");
    circle.setAttribute("fill", colors[node.group]);
    const text = document.createElementNS(namespace, "text");
    text.setAttribute("y", "30");
    text.textContent = node.label;
    group.append(circle, text);
    svg.append(group);
    node.element = group;

    const open = () => {
      const target = document.getElementById(node.id);
      target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      history.replaceState(null, "", `#${node.id}`);
    };
    group.addEventListener("click", open);
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    group.addEventListener("pointerdown", (event) => {
      dragging = true;
      group.setPointerCapture(event.pointerId);
      offsetX = event.clientX - node.x;
      offsetY = event.clientY - node.y;
    });
    group.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      node.x = event.clientX - offsetX;
      node.y = event.clientY - offsetY;
      node.vx = 0;
      node.vy = 0;
      draw();
    });
    group.addEventListener("pointerup", () => {
      dragging = false;
    });
  });

  let tick = 0;
  const step = () => {
    nodeData.forEach((a, index) => {
      for (let j = index + 1; j < nodeData.length; j += 1) {
        const b = nodeData[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distanceSquared = Math.max(dx * dx + dy * dy, 100);
        const force = 5200 / distanceSquared;
        a.vx += dx * force * 0.001;
        a.vy += dy * force * 0.001;
        b.vx -= dx * force * 0.001;
        b.vy -= dy * force * 0.001;
      }
    });
    edgeData.forEach((edge) => {
      const dx = edge.b.x - edge.a.x;
      const dy = edge.b.y - edge.a.y;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const force = (distance - 120) * 0.0007;
      edge.a.vx += dx * force;
      edge.a.vy += dy * force;
      edge.b.vx -= dx * force;
      edge.b.vy -= dy * force;
    });
    nodeData.forEach((node) => {
      node.vx += (width / 2 - node.x) * 0.0005;
      node.vy += (height / 2 - node.y) * 0.0005;
      node.vx *= 0.88;
      node.vy *= 0.88;
      node.x = Math.max(70, Math.min(width - 70, node.x + node.vx));
      node.y = Math.max(35, Math.min(height - 45, node.y + node.vy));
    });
    draw();
    if (tick++ < 500) requestAnimationFrame(step);
  };

  draw();
  step();
})();
