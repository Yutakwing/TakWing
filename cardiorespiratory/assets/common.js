(() => {
  "use strict";
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const params = new URLSearchParams(location.search);
  const GAME_MODE = params.get("mode") === "assessment" ? "assessment" : "practice";
  const DEBUG_LANDMARKS = params.get("debug") === "1";
  if (params.get("tracked") === "1") document.documentElement.classList.add("tracked-mode");

  function initialiseTheme() {
    let stored = null;
    try { stored = localStorage.getItem("portfolio-theme-v2"); } catch {}
    const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = stored || system;
    const button = qs("[data-theme-toggle]");
    if (!button) return;
    const update = () => { button.textContent = document.documentElement.dataset.theme === "dark" ? "Light mode" : "Dark mode"; };
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("portfolio-theme-v2", next); } catch {}
      update();
    });
    update();
  }

  function playCorrectChime() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass(); const now = ctx.currentTime; const gain = ctx.createGain();
      gain.connect(ctx.destination); gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.16, now + .02); gain.gain.exponentialRampToValueAtTime(.0001, now + .55);
      [659.25,783.99,987.77].forEach((frequency,index)=>{const oscillator=ctx.createOscillator();oscillator.type="sine";oscillator.frequency.setValueAtTime(frequency,now+index*.08);oscillator.connect(gain);oscillator.start(now+index*.08);oscillator.stop(now+.45+index*.08);});
      setTimeout(()=>ctx.close(),900);
    } catch {}
  }

  function playIncorrectTone() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass(); const now = ctx.currentTime; const gain = ctx.createGain();
      gain.connect(ctx.destination); gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.1, now + .015); gain.gain.exponentialRampToValueAtTime(.0001, now + .34);
      [311.13, 246.94].forEach((frequency,index)=>{const oscillator=ctx.createOscillator();oscillator.type="sine";oscillator.frequency.setValueAtTime(frequency,now+index*.11);oscillator.connect(gain);oscillator.start(now+index*.11);oscillator.stop(now+.22+index*.11);});
      setTimeout(()=>ctx.close(),650);
    } catch {}
  }

  function stars(score) { return score >= 90 ? "★★★" : score >= 75 ? "★★☆" : "★☆☆"; }
  function elapsedSeconds(startedAt) { return startedAt ? Math.max(0, Math.round((Date.now()-startedAt)/1000)) : 0; }
  function svgPoint(svg,event){const point=svg.createSVGPoint();point.x=event.clientX;point.y=event.clientY;return point.matrixTransform(svg.getScreenCTM().inverse());}
  function setText(selector,value){const el=qs(selector);if(el)el.textContent=value;}
  function updateStatus(state,total){setText("[data-stage]",`${Math.min(state.stage+1,total)} / ${total}`);setText("[data-score]",String(state.score));setText("[data-attempts]",String(state.attempts));setText("[data-time]",`${String(Math.floor(elapsedSeconds(state.startedAt)/60)).padStart(2,"0")}:${String(elapsedSeconds(state.startedAt)%60).padStart(2,"0")}`);const progress=qs("[data-progress]");if(progress)progress.style.width=`${Math.min(100,(state.stage/total)*100)}%`;}
  function startClock(state,total){if(!state.startedAt)state.startedAt=Date.now();if(!state.timer)state.timer=setInterval(()=>updateStatus(state,total),1000);}
  function stopClock(state){clearInterval(state.timer);state.timer=null;}
  function submit(config,state,score){window.PhysioSkillsProgress?.submitCompletion({game_id:config.gameId,score,completed:true,attempts:state.attempts,duration_seconds:elapsedSeconds(state.startedAt)});}

  function anteriorTorso(){return `<path class="torso" d="M329 40 L329 76 C305 80 282 91 258 108 C241 112 222 118 204 129 C180 144 166 166 166 190 C166 215 180 239 202 263 L219 285 L232 501 C235 530 262 548 301 553 L419 553 C458 548 485 530 488 501 L501 285 L518 263 C540 239 554 215 554 190 C554 166 540 144 516 129 C498 118 479 112 462 108 C438 91 415 80 391 76 L391 40 C374 31 346 31 329 40 Z"/><path class="body-detail" d="M329 76 Q342 96 360 99 Q378 96 391 76 M258 109 Q300 112 333 136 M462 109 Q420 112 387 136 M333 136 Q349 148 360 148 Q371 148 387 136 M360 148 L360 407 M248 175 Q294 151 342 174 M378 174 Q426 151 472 175 M244 217 Q299 240 354 217 M366 217 Q421 240 476 217 M348 454 Q360 463 372 454"/><path class="subtle-landmark" d="M252 268 Q306 289 354 278 M366 278 Q414 289 468 268 M244 333 Q304 351 354 342 M366 342 Q416 351 476 333 M240 400 Q302 414 354 408 M366 408 Q418 414 480 400"/>`;}
  function posteriorTorso(){return `<path class="torso" d="M329 40 L329 75 C308 80 287 90 265 106 C242 111 219 119 201 132 C178 149 166 171 166 194 C166 220 180 242 202 264 L219 286 L232 501 C235 530 262 548 301 553 L419 553 C458 548 485 530 488 501 L501 286 L518 264 C540 242 554 220 554 194 C554 171 542 149 519 132 C501 119 478 111 455 106 C433 90 412 80 391 75 L391 40 C374 31 346 31 329 40 Z"/><path class="body-detail" d="M329 75 Q360 106 391 75 M265 106 Q315 116 360 148 Q405 116 455 106 M360 102 L360 507 M281 151 C268 210 286 265 337 286 C329 232 321 181 281 151 M439 151 C452 210 434 265 383 286 C391 232 399 181 439 151 M270 303 Q315 322 344 304 M450 303 Q405 322 376 304 M284 470 Q320 452 350 468 M436 470 Q400 452 370 468"/><path class="subtle-landmark" d="M244 338 Q302 355 348 346 M372 346 Q418 355 476 338 M240 405 Q302 419 349 412 M371 412 Q418 419 480 405"/>`;}
  function marker(kind="stethoscope"){return kind==="percussion"?`<g class="marker percussion-marker" data-marker tabindex="0" role="button" aria-label="Percussion marker"><circle class="marker-disc" r="31"/><path d="M-19 2 Q0-21 19 2 M-15 10 Q0-5 15 10" fill="none" stroke="#9d6817" stroke-width="5" stroke-linecap="round"/></g>`:`<g class="marker" data-marker tabindex="0" role="button" aria-label="Stethoscope chest piece"><circle class="marker-disc" r="31"/><circle class="marker-centre" r="17"/><path d="M0-30 C0-65 45-65 45-102" fill="none" stroke="#1d6b87" stroke-width="8" stroke-linecap="round"/></g>`;}
  function boardMarkup(view){return `${view==="posterior"?posteriorTorso():anteriorTorso()}<g data-completed-sites></g><g data-debug-targets></g>${marker(view==="percussion"?"percussion":"stethoscope")}`;}

  function initPlacementGame(config){
    initialiseTheme(); const svg=qs("[data-game-board]"); svg.innerHTML=boardMarkup(config.view); const markerEl=qs("[data-marker]",svg); const debugLayer=qs("[data-debug-targets]",svg); const completedLayer=qs("[data-completed-sites]",svg); const basePoints=config.points; let points=[...basePoints]; const state={stage:0,score:0,attempts:0,startedAt:null,timer:null,x:config.start.x,y:config.start.y,dragging:false}; const total=basePoints.length; const tolerance=()=>GAME_MODE==="assessment"?config.tolerance*0.82:config.tolerance;
    function render(){const point=points[state.stage];const instruction=config.pairedSequence?state.stage%2===0?point?.pairInstruction||point?.instruction:config.pairFollowInstruction||"Compare at the equivalent site on the opposite side.":point?.instruction;markerEl.setAttribute("transform",`translate(${state.x} ${state.y})`);updateStatus(state,total);setText("[data-instruction]",instruction||config.completeTitle);}
    function showDebug(){debugLayer.replaceChildren();if(!DEBUG_LANDMARKS)return;for(const point of config.points){const circle=document.createElementNS("http://www.w3.org/2000/svg","circle");circle.setAttribute("cx",point.x);circle.setAttribute("cy",point.y);circle.setAttribute("r",tolerance());circle.setAttribute("class","debug-target");const label=document.createElementNS(circle.namespaceURI,"text");label.setAttribute("x",point.x+12);label.setAttribute("y",point.y-12);label.setAttribute("class","debug-label");label.textContent=`${point.label} (${point.x},${point.y})`;debugLayer.append(circle,label);}svg.addEventListener("pointermove",e=>{if(DEBUG_LANDMARKS){const p=svgPoint(svg,e);svg.dataset.pointer=`${Math.round(p.x)},${Math.round(p.y)}`;}});}
    function moveTo(x,y){state.x=Math.max(35,Math.min(685,x));state.y=Math.max(45,Math.min(535,y));render();}
    markerEl.addEventListener("pointerdown",event=>{event.preventDefault();startClock(state,total);state.dragging=true;markerEl.setPointerCapture(event.pointerId);});markerEl.addEventListener("pointermove",event=>{if(!state.dragging)return;const p=svgPoint(svg,event);moveTo(p.x,p.y);});const end=event=>{state.dragging=false;if(markerEl.hasPointerCapture(event.pointerId))markerEl.releasePointerCapture(event.pointerId);};markerEl.addEventListener("pointerup",end);markerEl.addEventListener("pointercancel",end);svg.addEventListener("click",event=>{if(event.target.closest("[data-marker]"))return;const p=svgPoint(svg,event);startClock(state,total);moveTo(p.x,p.y);});markerEl.addEventListener("keydown",event=>{const delta=event.shiftKey?10:4;const directions={ArrowLeft:[-delta,0],ArrowRight:[delta,0],ArrowUp:[0,-delta],ArrowDown:[0,delta]};if(!directions[event.key])return;event.preventDefault();startClock(state,total);moveTo(state.x+directions[event.key][0],state.y+directions[event.key][1]);});qsa("[data-nudge]").forEach(button=>button.addEventListener("click",()=>{const [dx,dy]=button.dataset.nudge.split(",").map(Number);startClock(state,total);moveTo(state.x+dx,state.y+dy);}));
    function boneFeedback(){if(!config.boneZones)return null;for(const zone of config.boneZones){if(Math.hypot(state.x-zone.x,state.y-zone.y)<=zone.r)return zone.message;}return null;}
    function complete(){stopClock(state);const accuracy=Math.max(60,Math.round(100-(state.attempts-total)*6));state.score=accuracy;updateStatus(state,total);const panel=qs("[data-completion]");panel.hidden=false;setText("[data-stars]",stars(accuracy));setText("[data-completion-title]",config.completeTitle);setText("[data-completion-message]",`${config.completionMetric}: ${total} / ${total} · Accuracy: ${accuracy}% · Attempts: ${state.attempts}`);submit(config,state,accuracy);}
    qs("[data-check]").addEventListener("click",()=>{if(state.stage>=total)return;startClock(state,total);state.attempts+=1;const bone=boneFeedback();if(bone){playIncorrectTone();setText("[data-feedback]",bone);updateStatus(state,total);return;}const isPairStart=config.pairedSequence&&state.stage%2===0&&state.stage+1<total;const candidateIndexes=isPairStart?[state.stage,state.stage+1]:[state.stage];let matchedIndex=candidateIndexes[0];let point=points[matchedIndex];let distance=Math.hypot(state.x-point.x,state.y-point.y);for(const index of candidateIndexes.slice(1)){const candidate=points[index];const candidateDistance=Math.hypot(state.x-candidate.x,state.y-candidate.y);if(candidateDistance<distance){matchedIndex=index;point=candidate;distance=candidateDistance;}}if(distance<=tolerance()){if(isPairStart&&matchedIndex!==state.stage){[points[state.stage],points[matchedIndex]]=[points[matchedIndex],points[state.stage]];point=points[state.stage];}const completedStage=state.stage;state.score+=Math.max(10,Math.round(100/total-(distance/tolerance())*4));const dot=document.createElementNS("http://www.w3.org/2000/svg","circle");dot.setAttribute("cx",point.x);dot.setAttribute("cy",point.y);dot.setAttribute("r",9);dot.setAttribute("class","completed-site");completedLayer.append(dot);state.stage+=1;playCorrectChime();const feedback=config.pairedSequence?completedStage%2===0?"Correct. Now compare the equivalent site on the opposite side.":"Correct. This side-to-side pair is complete.":point.correct||"Correct. Continue to the matching site on the other side.";setText("[data-feedback]",feedback);if(state.stage>=total)complete();else render();}else{playIncorrectTone();const horizontal=state.x<point.x?"right":"left";const vertical=state.y<point.y?"lower":"higher";setText("[data-feedback]",GAME_MODE==="practice"?`Not quite. Move ${horizontal} and ${vertical}, then check again.`:"Placement not accepted. Try again.");}updateStatus(state,total);});
    qs("[data-hint]").addEventListener("click",()=>{if(GAME_MODE==="assessment")return;const point=points[state.stage];const hint=config.pairedSequence?state.stage%2===0?point?.pairHint||point?.hint:config.pairFollowHint||"Match the level of the previous site on the opposite side.":point?.hint;setText("[data-feedback]",hint||config.generalHint);});
    function restart(){stopClock(state);points=[...basePoints];Object.assign(state,{stage:0,score:0,attempts:0,startedAt:null,timer:null,x:config.start.x,y:config.start.y});completedLayer.replaceChildren();qs("[data-completion]").hidden=true;setText("[data-feedback]",config.startFeedback);window.PhysioSkillsProgress?.resetCompletion();render();}
    qsa("[data-restart]").forEach(button=>button.addEventListener("click",restart));showDebug();setText("[data-feedback]",config.startFeedback);render();
  }
  window.CardioGame=Object.freeze({DEBUG_LANDMARKS,GAME_MODE,anteriorTorso,elapsedSeconds,initialiseTheme,playCorrectChime,playIncorrectTone,posteriorTorso,qs,qsa,setText,stars,stopClock,submit,svgPoint,updateStatus,startClock,initPlacementGame});
})();
