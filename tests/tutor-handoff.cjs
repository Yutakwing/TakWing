// Local wrapper regression only: no account, D1, vendor request or AI reply.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'student/assets/zapier-skills-tutor.js'),'utf8');
assert.doesNotMatch(source,/shadowRoot|postMessage|zChatbotReady|zChatbotOpened|zChatbotClosed/);
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  for(const width of [390,1440]) {
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/*',route=>{
    const url=new URL(route.request().url());
    assert.equal(url.hostname,'127.0.0.1','No third-party requests in this test');
    if(url.pathname.endsWith('.js'))return route.fulfill({contentType:'text/javascript',body:source});
    if(url.pathname.endsWith('.css'))return route.fulfill({contentType:'text/css',body:fs.readFileSync(path.join(root,'student/assets/skills-tutor.css'),'utf8')});
    return route.fulfill({contentType:'text/html',body:`<main></main><script>
     window.SKILLS_TUTOR_GAMES={'elbow-goniometry':{route:'elbow-goniometry',enabled:true,title:'Elbow',category:'goniometry'}};
     window.PhysioSkillsAuth={getCurrentUser:async()=>true};
     window.PhysioSkillsProgress={whenAuthenticated:async()=>true,recordAIRequest:()=>{}};
     customElements.define('zapier-interfaces-chatbot-embed',class extends HTMLElement{constructor(){super();this.attachShadow({mode:'closed'});}});
     </script><script src='/student/assets/zapier-skills-tutor.js'></script>`});
   });
   await page.goto('http://127.0.0.1/elbow-goniometry/?tracked=1');
   await page.locator('[data-tutor-ask]').waitFor();
   const context=await page.evaluate(()=>{
    const input={stage:'stationary-arm',result:'incorrect',error_type:'stationary-arm-angle-error',current_score:40,name:'OMIT',email:'OMIT',auth_token:'OMIT',pointer_x:123};
    PhysioSkillsTutor.updateSkillsTutorContext(input);PhysioSkillsTutor.updateSkillsTutorContext(input);
    return PhysioSkillsTutor.getContext();
   });
   assert.equal(context.attempt,2);assert.equal(context.hints_used,0);
   for(const key of ['name','email','auth_token','pointer_x'])assert.ok(!(key in context));
   await page.locator('[data-tutor-ask]').click();
   await page.locator('.skills-tutor-drawer').waitFor({state:'visible'});
   assert.match(await page.locator('.skills-tutor-handoff').innerText(),/paste it below with your question/);
   assert.equal(await page.evaluate(()=>PhysioSkillsTutor.getContext().current_score),40);
   assert.equal(await page.locator('zapier-interfaces-chatbot-embed').count(),1);
   await page.keyboard.press('Escape');
   assert.equal(await page.locator('[data-tutor-ask]').evaluate(e=>e===document.activeElement),true);
   assert.equal(await page.locator('.skills-tutor-drawer').isVisible(),false);
   await page.evaluate(()=>dispatchEvent(new Event('offline')));
   assert.match(await page.locator('[data-tutor-status]').innerText(),/temporarily unavailable/);
   await page.evaluate(()=>dispatchEvent(new Event('physio-skills-session-cleared')));
   assert.equal(await page.locator('.skills-tutor').count(),0);
   assert.deepEqual(errors,[]);await page.close();
  }
  console.log('PASS: manual wrapper, closed component, context allowlist, score preservation, Escape, offline and logout at 390/1440px. No live AI test.');
 }finally{await browser.close();}
})();
