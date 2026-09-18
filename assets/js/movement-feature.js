(() => {
  const feature = document.querySelector('[data-movement]');
  if (!feature) return;
  const stage = feature.querySelector('.movement-stage');
  const depth = feature.querySelector('.movement-depth');
  const button = feature.querySelector('.movement-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, paused = false, frame = 0;
  const active = () => visible && !paused && !reduced.matches && !document.hidden;
  const updateDepth = () => {
    frame = 0;
    if (!active()) return;
    const rect = stage.getBoundingClientRect();
    const offset = Math.max(-18, Math.min(18, (innerHeight / 2 - rect.top - rect.height / 2) * .18));
    depth.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  };
  const requestUpdate = () => {
    // Recheck on interaction as well as preference-change events.
    if (reduced.matches) { sync(); return; }
    if (active() && !frame) frame = requestAnimationFrame(updateDepth);
  };
  const sync = () => {
    feature.dataset.running = String(active());
    button.disabled = reduced.matches;
    button.textContent = reduced.matches ? 'Reduced motion enabled' : paused ? 'Resume motion' : 'Pause motion';
    if (!active()) { cancelAnimationFrame(frame); frame = 0; depth.style.transform = 'none'; }
    else requestUpdate();
  };
  // No JavaScript / unsupported observer: retain the useful static SVG pose.
  if (!('IntersectionObserver' in window)) return;
  button.hidden = false;
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold: 0});
  observer.observe(stage);
  button.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  addEventListener('scroll', requestUpdate, {passive: true});
  addEventListener('resize', requestUpdate, {passive: true});
  sync();
})();
