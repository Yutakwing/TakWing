(() => {
  "use strict";
  const auth = window.PhysioSkillsAuth;
  const tracked = new URLSearchParams(location.search).get("tracked") === "1";
  const banner = document.querySelector("[data-tracked-session]");
  const message = document.querySelector("[data-tracked-message]");
  const dashboardLink = document.querySelector("[data-skills-dashboard-link]");
  const root = new URL('./', document.currentScript.src);
  const independencePolicy = Object.freeze([100, 90, 80, 70, 60]);
  const independence = hints => independencePolicy[Math.min(4, hints)];
  const fresh = () => ({ started: null, hints: 0, ai: 0, scaffold: 'none', errors: new Set(), result: null, pending: false, saved: false });
  let run = fresh();
  let sessionUser = null;
  const sessionReady = tracked ? auth.requireStudentSession().then(user => {
    sessionUser = user;
    if (dashboardLink) dashboardLink.hidden = false;
    if (banner) banner.hidden = false;
    if (message) message.textContent = 'Completed attempts will be saved to your Skills Lab.';
    return user;
  }).catch(() => null) : Promise.resolve(null);
  if (dashboardLink) dashboardLink.href = auth.siteUrl('student/dashboard/');
  function start() { if (!run.result && run.started === null) run.started = performance.now(); }
  document.addEventListener('pointerdown', event => { if (event.target.closest('main')) start(); }, {capture:true});
  document.addEventListener('keydown', event => { if (event.target.closest('main') && event.key !== 'Tab') start(); }, {capture:true});
  document.addEventListener('click', event => {
    const hint = event.target.closest('#hint-button,[data-hint]');
    if (hint && !hint.disabled && !run.result) { start(); run.hints += 1; }
  }, {capture:true});
  function recordFeedback(id, data) {
    if (!run.result && data.result === 'incorrect' && /^[a-z0-9-]{1,64}$/.test(data.error_type || '')) run.errors.add(data.error_type);
    window.PhysioSkillsTutor?.record(id, data);
  }
  function recordAIRequest(level = 'none') {
    if (run.result) return;
    start(); run.ai += 1;
    const levels = ['none','socratic','focused-hint','explicit-guidance'];
    if (levels.includes(level) && levels.indexOf(level) > levels.indexOf(run.scaffold)) run.scaffold = level;
  }
  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    const hex = [...bytes].map(v => v.toString(16).padStart(2,'0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
  // Learning order follows the registered catalogue; keep future additions here too.
  const skillSequence = [["elbow-goniometry", "Elbow Goniometry Mini-OSPE", "elbow-goniometry/"], ["ankle-goniometry", "Ankle Goniometry Mini-OSPE", "ankle-goniometry/"], ["shoulder-goniometry", "Shoulder Goniometry Mini-OSPE", "shoulder-goniometry/"], ["shoulder-rotation-goniometry", "Shoulder Rotation Goniometry Mini-OSPE", "shoulder-rotation-goniometry/"], ["hip-goniometry", "Hip Goniometry Mini-OSPE", "hip-goniometry/"], ["knee-goniometry", "Knee Goniometry Mini-OSPE", "knee-goniometry/"], ["cardio-auscultation-anterior", "Anterior Lung Auscultation Challenge", "cardiorespiratory/anterior-auscultation/index.html"], ["cardio-auscultation-posterior", "Posterior Lung Auscultation Challenge", "cardiorespiratory/posterior-auscultation/index.html"], ["cardio-chest-expansion", "Chest Expansion Measurement Challenge", "cardiorespiratory/chest-expansion/index.html"], ["cardio-chest-percussion", "Chest Percussion Challenge", "cardiorespiratory/chest-percussion/index.html"], ["cardio-breath-sounds", "Breath Sound Identification Challenge", "cardiorespiratory/breath-sounds/index.html"], ["typing-speed", "Typing Speed Test", "typing-test/"], ["ai-literacy-check", "AI Literacy Check", "ai-literacy-check.html"], ["reasoning-runner", "Reasoning Runner", "reasoning-runner.html"], ["clinical-readiness-lab", "Clinical Readiness Lab", "clinical-readiness-lab.html"]];
  function nextSkillLink(gameId) {
    const index = skillSequence.findIndex(([id]) => id === gameId);
    if (index < 0) return null;
    const next = skillSequence[index + 1];
    const language = new URLSearchParams(location.search).get('lang') || document.documentElement.lang.toLowerCase();
    const locale = ['zh-hant','zh-hans'].includes(language) ? language : 'en';
    const labels = {en:['Continue to next skill','Return to Skills Dashboard','Explore more resources'], 'zh-hant':['繼續下一項技能','返回技能儀表板','探索更多資源'], 'zh-hans':['继续下一项技能','返回技能仪表板','探索更多资源']}[locale];
    let path = next ? next[2] : tracked ? 'student/dashboard/' : (locale === 'en' ? '' : locale + '/') + 'resources.html';
    if (next && locale !== 'en' && ['ai-literacy-check','reasoning-runner','clinical-readiness-lab'].includes(next[0])) path = locale + '/' + path;
    const url = new URL(auth.siteUrl(path),location.href);
    if (next && tracked) url.searchParams.set('tracked','1');
    if (next && locale !== 'en') url.searchParams.set('lang',locale);
    const link = document.createElement('a'); link.className='skills-next'; link.lang=locale;
    link.href=url.href; link.textContent=next ? labels[0] + ' → ' + next[1].replace(' Mini-OSPE','') : labels[tracked ? 1 : 2];
    link.hidden=tracked; // Do not offer to leave before this result is safely stored.
    return link;
  }
  function completionCard(attempt) {
    const panel = document.createElement('section'); panel.className = 'skills-result'; panel.lang = 'en';
    panel.setAttribute('aria-label','Practice result');
    const heading = document.createElement('h2');
    heading.textContent = attempt.result.game_id === 'typing-speed' ? `Typing accuracy: ${attempt.result.technical_score} / 100` : `Technical Score: ${attempt.result.technical_score} / 100`;
    const info = document.createElement('p');
    info.textContent = `Attempts: ${attempt.result.attempts_in_game} · Built-in hints: ${attempt.hints} · AI Hints Used: ${attempt.ai} · Independence: ${attempt.result.independence_score} / 100 · Time: ${attempt.result.duration_seconds}s`;
    const note = document.createElement('p'); note.textContent = 'Scores are intended for formative practice and do not represent formal clinical competency assessment.';
    const status = document.createElement('p'); status.setAttribute('role','status');
    const retry = document.createElement('button'); retry.type='button'; retry.textContent='Retry save'; retry.hidden=true;
    retry.addEventListener('click', () => save(attempt));
    panel.append(heading, info, note, status, retry);
    const login = document.createElement('form'); login.hidden=true;
    const label=document.createElement('label'); label.textContent='Session expired. Enter your password to save without replaying: ';
    const password=document.createElement('input'); password.type='password'; password.autocomplete='current-password'; password.required=true;
    const submit=document.createElement('button'); submit.type='submit'; submit.textContent='Log in and save';
    label.append(password); login.append(label,submit); panel.append(login);
    login.addEventListener('submit',async event=>{
      event.preventDefault(); submit.disabled=true;
      try {
        const original=sessionUser || await sessionReady;
        if (!original) throw new Error('Session unavailable');
        await auth.login(original.username,password.value); password.value=''; login.hidden=true;
        await save(attempt);
      } catch { password.value=''; status.textContent='Login failed. Please check your password and try again.'; }
      finally { submit.disabled=false; }
    });
    (document.querySelector('main') || document.body).append(panel);
    const next = nextSkillLink(attempt.result.game_id);
    if (next) panel.append(next);
    Object.assign(attempt, {panel,status,retry,login,next});
  }
  async function save(attempt) {
    if (attempt.pending || attempt.saved) return;
    attempt.pending=true; attempt.retry.hidden=true; attempt.status.textContent='Saving progress...';
    try {
      const original=sessionUser || await sessionReady;
      const current=await auth.getCurrentUser(false);
      if (!sessionUser) sessionUser = original || current;
      if (current.username !== sessionUser.username) throw new auth.ApiError('Session changed.',401);
      const response = await auth.saveGameProgress(attempt.result);
      if (!response.success || !response.attempt_saved) throw new Error('Result not confirmed.');
      attempt.saved=true;
      if (attempt.next) attempt.next.hidden=false;
      attempt.status.textContent=`Progress saved. Best: ${response.progress.best_score} / 100.`;
      return response;
    } catch (error) {
      attempt.status.textContent='Your score could not be saved. Please retry.';
      if (error.status === 401) attempt.login.hidden=false;
      attempt.retry.hidden=false;
    } finally { attempt.pending=false; }
  }
  async function submitCompletion(native) {
    if (run.result || run.finishing) return null;
    const attempt = run; attempt.finishing=true;
    // Finish synchronous game feedback first, then freeze this attempt for retries.
    await Promise.resolve();
    const hints = attempt.hints + attempt.ai;
    attempt.result = Object.freeze({
      attempt_uuid: uuid(), game_id:native.game_id,
      technical_score: Math.max(0, Math.min(100, Math.round((native.technical_score ?? native.score) * 100) / 100)),
      independence_score:independence(hints), completed:true,
      attempts_in_game:Math.max(1,native.attempts), hints_used:hints,
      ai_used:attempt.ai>0, ai_requests:attempt.ai, highest_scaffold_level:attempt.scaffold,
      duration_seconds:Math.max(0,Math.round(native.duration_seconds ?? (attempt.started === null ? 0 : (performance.now()-attempt.started)/1000))),
      error_summary:Object.freeze([...attempt.errors].slice(0,32)), metrics:Object.freeze({...native.metrics}),
    });
    completionCard(attempt);
    if (tracked) return save(attempt);
    attempt.status.textContent='Public practice — result shown on this page only.';
    return attempt.result;
  }
  function resetCompletion() {
    // Unsaved cards keep their own immutable payload and retry button across replays.
    if (run.panel && (!tracked || run.saved)) run.panel.remove();
    run=fresh(); window.PhysioSkillsTutor?.resetSkillsTutorContext();
  }
  {
    const css=document.createElement('link'); css.rel='stylesheet'; css.href=new URL('results.css?v=20260911-next',root).href; document.head.append(css);
    if (tracked && banner) banner.hidden=false;
    if (tracked && message) message.textContent='Checking your student session...';
  }
  window.PhysioSkillsProgress=Object.freeze({isTracked:tracked, whenAuthenticated:()=>sessionReady.then(Boolean),
    startActivity:start, resetCompletion, submitCompletion, recordFeedback, recordAIRequest, independencePolicy});
})();
