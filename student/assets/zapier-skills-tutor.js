(() => {
  "use strict";
  if (window.PhysioSkillsTutor) return;
  const SKILLS_TUTOR_DEBUG = false;
  const CHATBOT_ID = "cmtrz8z1a001ugi3l4hffj3yi";
  const SCRIPT_URL = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
  const TAG = "zapier-interfaces-chatbot-embed";
  const scriptRoot = new URL("./", document.currentScript.src);
  const tracked = new URLSearchParams(location.search).get("tracked") === "1";
  const entry = Object.entries(window.SKILLS_TUTOR_GAMES || {}).find(([,g]) => location.pathname.split("/").includes(g.route));
  if (!tracked || !entry?.[1].enabled) return;
  const [gameId, game] = entry;
  let authorised = false, drawer, chatSlot, panel, status, summary, ask, dismiss, embed, loading, busy = false, disposed = false, lastAsk = 0, initStarted = false;
  let hints = 0, attempt = 0, lastStage = "", previousErrors = [], context;
  const debug = data => { if (SKILLS_TUTOR_DEBUG && ["localhost","127.0.0.1"].includes(location.hostname)) console.debug("Skills Tutor", data); };
  const number = value => Number.isFinite(value) ? Math.max(0, Math.round(value*100)/100) : 0;
  const code = value => typeof value === "string" && /^[a-z0-9-]{1,70}$/.test(value) ? value : "unspecified";
  function formatTutorContext(value = context) {
    return ["Current clinical skills activity: " + game.title,
      "Game ID: " + gameId, "Stage: " + value.stage, "Attempt at this stage: " + value.attempt,
      "Game result: " + value.result, "Error detected by game: " + value.error_type,
      "Error magnitude: " + value.error_magnitude + " " + value.error_unit,
      "Hints used: " + value.hints_used, "Game score (native scale): " + value.current_score,
      "Completed: " + value.completion_state, "Total attempts: " + value.total_attempts,
      "Previous errors: " + value.previous_errors.join(", "),
      "Use this game-evaluated result for formative feedback; do not re-score or claim to see my screen."].join("\n");
  }
  function render() {
    if (!panel) return;
    summary.value = formatTutorContext();
    ask.textContent = context.completion_state ? "Ask AI Tutor for summary" : "Ask AI Tutor about this attempt";
    if (!busy) status.textContent = context.result === "not-checked" ? "Check a step to prepare feedback for the AI Tutor." : "Attempt summary ready. Open the tutor, then copy and paste this attempt for a relevant hint.";
  }
  function updateSkillsTutorContext(data = {}) {
    // Explicit allowlist: never retain arbitrary fields, user data or raw coordinates.
    if (data.stage !== lastStage) { attempt = 0; lastStage = data.stage; }
    attempt += 1;
    const error = code(data.error_type || "none");
    if (data.result === "incorrect") previousErrors = [...previousErrors, error].slice(-12);
    context = {game_id:gameId, game_title:game.title, category:game.category,
      stage:data.completion_state ? "complete" : code(data.stage), attempt,
      result:["correct","incorrect","incomplete"].includes(data.result) ? data.result : "not-checked",
      error_type:error, error_magnitude:number(data.error_magnitude), error_unit:code(data.error_unit || "not-applicable"),
      hints_used:hints, previous_errors:[...previousErrors], current_score:number(data.current_score),
      total_attempts:number(data.total_attempts), completion_state:data.completion_state === true};
    render(); debug({game_id:gameId,stage:context.stage,attempt,result:context.result,error_type:error});
  }
  function resetSkillsTutorContext() {
    hints=0; attempt=0; lastStage=""; previousErrors=[];
    context={game_id:gameId,game_title:game.title,category:game.category,stage:"not-started",attempt:0,result:"not-checked",error_type:"none",error_magnitude:0,error_unit:"not-applicable",hints_used:0,previous_errors:[],current_score:0,total_attempts:0,completion_state:false};
    render();
  }
  function unavailable() {
    embed?.remove(); embed = null;
    if (drawer) drawer.hidden=true;
    if (status) status.textContent = "AI Tutor is temporarily unavailable. Continue using the built-in game feedback. You can still copy the attempt summary.";
  }
  function loadOnce() {
    if (customElements.get(TAG)) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise((resolve,reject) => {
      let script = [...document.scripts].find(s=>s.src===SCRIPT_URL);
      const timeout=setTimeout(()=>reject(new Error("Component timed out")),15000);
      customElements.whenDefined(TAG).then(()=>{clearTimeout(timeout);resolve();});
      if (!script) {
        script=document.createElement("script"); script.src=SCRIPT_URL; script.type="module"; script.async=true; script.referrerPolicy="no-referrer";
        script.addEventListener("error",()=>{clearTimeout(timeout);reject(new Error("Component blocked"));},{once:true});
        document.body.append(script);
      }
    });
    return loading;
  }
  async function openSkillsTutor() {
    if (!authorised || busy || Date.now() - lastAsk < 1000) return;
    lastAsk = Date.now();
    busy=true; ask.disabled=true;
    try {
      // Validate again before exposing third-party UI after an expired/revoked session.
      const user=await window.PhysioSkillsAuth.getCurrentUser(false);
      if (!user) throw new Error("Session unavailable");
      // A help request is observable; cross-origin conversation/scaffold delivery is not.
      window.PhysioSkillsProgress?.recordAIRequest('none');
      hints+=1; context.hints_used=hints; summary.value=formatTutorContext();
      status.textContent="Loading AI Tutor. Your summary has not been sent.";
      await loadOnce();
      debug({game_id:gameId,state:"component-loaded"});
      if (!authorised) return;
      embed ||= document.querySelector(`${TAG}[chatbot-id="${CHATBOT_ID}"]`);
      if (!embed) {
        embed=document.createElement(TAG); embed.setAttribute("chatbot-id",CHATBOT_ID); embed.setAttribute("height","100%"); embed.setAttribute("width","100%"); embed.setAttribute("style-override","display:block;width:100%;height:100%;border:0;background:transparent");
        chatSlot.append(embed);
      }
      embed.hidden=false; drawer.hidden=false; dismiss.focus();
      status.textContent="Tutor opened. Copy your current attempt and paste it into the chat so the tutor can help with this step.";
      // The vendor owns its internals; label only our host and conversation region.
      embed.setAttribute("aria-label","AI Skills Tutor chat");
      debug({game_id:gameId,state:"inline-embed-mounted"});
    } catch { unavailable(); }
    finally { busy=false; if (ask) ask.disabled=false; }
  }
  function setSkillsTutorState(state) { if (state === "unavailable") unavailable(); }
  function hidePopup() { if(drawer)drawer.hidden=true;ask?.focus(); }
  function teardown() { disposed=true; authorised=false; embed?.remove(); panel?.remove(); drawer?.remove(); document.body.classList.remove("skills-tutor-active"); resetSkillsTutorContext(); }
  async function initSkillsTutor() {
    if (panel || initStarted) return;
    initStarted = true;
    authorised=await window.PhysioSkillsProgress?.whenAuthenticated();
    if (!authorised || disposed) { authorised=false; return; }
    const css=document.createElement("link"); css.rel="stylesheet";css.href=new URL("skills-tutor.css?v=20260911-panel",scriptRoot).href;document.head.append(css);
    document.body.classList.add("skills-tutor-active");
    panel=document.createElement("section");panel.className="skills-tutor";panel.lang="en";panel.setAttribute("aria-label","AI Skills Tutor");
    // Static markup only; all context is written through textContent/value.
    panel.innerHTML='<h2>Ask Tak Wing <small>AI Skills Tutor</small></h2><p data-tutor-game></p><p data-tutor-status role="status" aria-live="polite"></p><p>Zapier is a third-party service. Do not enter names, student numbers or patient details.</p><div class="skills-tutor-actions"><button type="button" data-tutor-ask>Ask AI Tutor</button><button type="button" data-tutor-copy>Copy current attempt</button><button type="button" data-tutor-hide>Hide tutor</button></div><details><summary>Attempt summary to paste into the tutor</summary><textarea readonly aria-label="Attempt summary" rows="9"></textarea></details>';
    panel.querySelector('[data-tutor-game]').textContent="Practising: " + game.title;
    (document.querySelector("main") || document.body).append(panel);
    status=panel.querySelector('[data-tutor-status]'); summary=panel.querySelector('textarea'); ask=panel.querySelector('[data-tutor-ask]');
    ask.addEventListener("click",openSkillsTutor);
    panel.querySelector('[data-tutor-copy]').addEventListener("click",async()=>{try{await navigator.clipboard.writeText(formatTutorContext());status.textContent="Summary copied. Paste it into the tutor chat; nothing has been sent automatically.";}catch{panel.querySelector('details').open=true;summary.focus();summary.select();status.textContent="Select and copy the summary below.";}});
    panel.querySelector('[data-tutor-hide]').addEventListener("click",hidePopup);
    drawer=document.createElement("aside");drawer.className="skills-tutor-drawer";drawer.hidden=true;drawer.lang="en";drawer.setAttribute("aria-label","AI Skills Tutor conversation");
    drawer.innerHTML='<header class="skills-tutor-drawer-header"><div><span>YOUR PRACTICE COMPANION</span><h2>Ask Tak Wing</h2></div><button type="button" data-chat-close aria-label="Close AI Tutor">×</button></header><div class="skills-tutor-handoff"><p>The tutor cannot see your game automatically. Copy your current attempt, then paste it below with your question.</p><button type="button" data-chat-copy>Copy current attempt</button><span role="status" data-chat-copy-status></span></div><div class="skills-tutor-chat-slot"></div>';
    chatSlot=drawer.querySelector('.skills-tutor-chat-slot');dismiss=drawer.querySelector('[data-chat-close]');dismiss.addEventListener("click",hidePopup);
    drawer.querySelector('[data-chat-copy]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(formatTutorContext());drawer.querySelector('[data-chat-copy-status]').textContent='Copied — paste into the message box below.';}catch{hidePopup();panel.querySelector('details').open=true;summary.focus();summary.select();status.textContent='Select and copy your attempt summary, then reopen the tutor.';}});
    document.body.append(drawer);
    document.addEventListener('click',event=>{if(event.target.closest('#hint-button,[data-hint]') && !event.target.closest('button')?.disabled){hints+=1;context.hints_used=hints;render();}});
    render();
  }
  addEventListener("offline",unavailable);
  addEventListener("keydown",event=>{if(event.key==="Escape"&&drawer&&!drawer.hidden)hidePopup();});
  addEventListener("physio-skills-session-cleared",teardown);
  addEventListener("focus",async()=>{if(!authorised)return;try{if(!await window.PhysioSkillsAuth.getCurrentUser(false))teardown();}catch{teardown();}});
  resetSkillsTutorContext();
  window.PhysioSkillsTutor=Object.freeze({initSkillsTutor,updateSkillsTutorContext,openSkillsTutor,setSkillsTutorState,resetSkillsTutorContext,formatTutorContext,record: (id,data)=>{if(id===gameId)updateSkillsTutorContext(data);},getContext:()=>JSON.parse(JSON.stringify(context))});
  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>{initSkillsTutor().catch(unavailable);},{once:true}); else initSkillsTutor().catch(unavailable);
})();
