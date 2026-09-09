// Run with local static site :4201 and Wrangler :8787 backed by an isolated DB.
// PLAYWRIGHT_MODULE may point to a bundled installation. No production requests.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs'); const assert=require('node:assert/strict');
const root=require('node:path').resolve(__dirname,'..');
const base='http://127.0.0.1:4201';
const credentials=fs.readFileSync(root+'/cloudflare/test-credentials.txt','utf8');
const password=credentials.match(/^TEST001:\s*(\S+)/m)[1];
const games=[...fs.readFileSync(root+'/cloudflare/seed-games.sql','utf8').matchAll(/\('([^']+)', '[^']+', '[^']+', '\/TakWing\/([^']+)'/g)].map(m=>({id:m[1],path:m[2]}));
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'}); const results=[];
 try {
 for(const tracked of [false,true]) {
  const context=await browser.newContext({viewport:tracked?{width:390,height:844}:{width:1280,height:900},hasTouch:tracked});
  await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.fulfill({status:200,contentType:'application/javascript',body:''}));
  const page=await context.newPage();page.setDefaultTimeout(7000);
  if(tracked){await page.goto(base+'/student/login/');await page.evaluate(async({password})=>window.PhysioSkillsAuth.login('TEST001',password),{password});}
  for(const game of games.filter(g=>!process.env.GAME_FILTER || process.env.GAME_FILTER.split(',').includes(g.id))) {
   const errors=[]; const listener=e=>errors.push(e.message);page.on('pageerror',listener);
   const submissions=[];const requestListener=r=>{if(r.url().endsWith('/api/progress')&&r.method()==='POST')submissions.push(r.postDataJSON());};page.on('request',requestListener);
   try {
    await page.goto(`${base}/${game.path}?${tracked?'tracked=1&':''}test=1`);
    await page.waitForFunction(()=>!!window.PhysioSkillsProgress);
    if(tracked)await page.waitForFunction(async()=>await window.PhysioSkillsProgress.whenAuthenticated());
    if(game.id.includes('goniometry')) {
     await page.locator('#check-button').click(); await page.locator('#hint-button').click();
     const target=await page.evaluate(()=>typeof setup==='function'?setup():correct);
     const svg=page.locator('svg').filter({has:page.locator('#axis-handle')});
     async function drag(handle,x,y){await page.locator(handle).scrollIntoViewIfNeeded();const dest=await svg.evaluate((s,{x,y})=>{const p=new DOMPoint(x,y).matrixTransform(s.getScreenCTM());return {x:p.x,y:p.y};},{x,y});const b=await page.locator(handle).boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(dest.x,dest.y,{steps:8});await page.mouse.up();}
     await drag('#axis-handle',target.axis.x,target.axis.y);await page.locator('#check-button').click();
     for(const [handle,angle]of [['#stationary-handle',target.stationaryAngle],['#moving-handle',target.movingAngle]]){await drag(handle,target.axis.x+200*Math.cos(angle*Math.PI/180),target.axis.y+200*Math.sin(angle*Math.PI/180));await page.locator('#check-button').click();}
    } else if(['cardio-auscultation-anterior','cardio-auscultation-posterior','cardio-chest-percussion'].includes(game.id)) {
     await page.locator('[data-check]').click();await page.locator('[data-hint]').click();
     const source=fs.readFileSync(root+'/'+game.path.replace(/index.html$/,'')+'game.js','utf8');
     const points=[...source.matchAll(/\{\s*x:\s*(\d+),\s*y:\s*(\d+),\s*label:/g)].map(m=>({x:+m[1],y:+m[2]}));
     for(const p of points){const svg=page.locator('[data-game-board]');await svg.scrollIntoViewIfNeeded();const q=await svg.evaluate((s,p)=>{const q=new DOMPoint(p.x,p.y).matrixTransform(s.getScreenCTM());return {x:q.x,y:q.y}},p);await page.mouse.click(q.x,q.y);await page.locator('[data-check]').click();}
    } else if(game.id==='cardio-chest-expansion') {
     await page.locator('[data-check]').click();await page.locator('[data-hint]').click();
     const svg=page.locator('[data-board]');await svg.scrollIntoViewIfNeeded();const q=await svg.evaluate(s=>{const p=new DOMPoint(360,350).matrixTransform(s.getScreenCTM());return {x:p.x,y:p.y}});await page.mouse.click(q.x,q.y);
     await page.locator('[data-check]').click();await page.locator('[data-check]').click();
     const exp=+(await page.locator('[data-feedback]').innerText()).match(/([\d.]+) cm/)[1];await page.locator('[data-exp]').fill(String(exp));await page.locator('[data-check]').click();
     const insp=+(await page.locator('[data-feedback]').innerText()).match(/([\d.]+) cm/)[1];await page.locator('[data-insp]').fill(String(insp));await page.locator('[data-check]').click();await page.locator('[data-calc]').fill((insp-exp).toFixed(1));await page.locator('[data-check]').click();
    } else if(game.id==='cardio-breath-sounds') {
     for(let round=0;round<5;round++){
      await page.locator('[data-play]').click();await page.locator('[data-hint]').click();
      for(const choice of await page.locator('[data-answer]').all()) {await choice.click();await page.locator('[data-check]').click();if(await choice.isDisabled())break;}
      await page.locator('[data-check]').click();
     }
    } else if(game.id==='typing-speed') {
     await page.clock.install();await page.locator('#start-button').click();await page.locator('#typing-input').fill('wrongword');await page.locator('#typing-input').press('Space');await page.clock.fastForward(61000);
    } else if(game.id==='ai-literacy-check') {
     for(const select of await page.locator('form select').all())await select.selectOption({index:1});
     for(const radio of await page.locator('input[type=radio][value="0"]').all())await radio.check();await page.locator('#literacy-quiz button[type=submit]').click();
    } else if(game.id==='clinical-readiness-lab') {
     await page.locator('#readinessStartButton').click();
     for(const id of ['ai','vr','simulation']){await page.locator(`[data-readiness-station=${id}]`).click();await page.locator('#dialogueButtons button').first().click();const correct=await page.evaluate(id=>CLINICAL_READINESS_CONTENT.stations[id].correct,id);await page.locator('#quizAnswers button').nth((correct+1)%3).click();await page.locator('#quizRetry').click();await page.locator('#quizAnswers button').nth(correct).click();await page.locator('#quizContinue').click();}
     await page.locator('[data-readiness-station=gate]').click();
    } else if(game.id==='reasoning-runner') {
     await page.locator('#startButton').click();
     // Play the first question if reached before a collision; native run end is completion.
     await Promise.race([page.locator('#questionOverlay:not(.hidden)').waitFor(),page.locator('#gameOverOverlay:not(.hidden)').waitFor()]);
     if(await page.locator('#questionOverlay').isVisible()){await page.locator('#answerButtons button').first().click();await page.locator('#continueButton').click();}
    }
    await page.locator('.skills-result').waitFor({timeout:15000});
    if(tracked){await page.getByRole('status').filter({hasText:'Progress saved.'}).waitFor();assert.equal(submissions.length,1);assert.equal(submissions[0].game_id,game.id);assert(submissions[0].technical_score>=0&&submissions[0].technical_score<=100);assert(!('user_id'in submissions[0]));}
    else assert.equal(submissions.length,0);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);assert.equal(overflow,false,'mobile overflow');assert.deepEqual(errors,[]);
    const restart=game.id.includes('goniometry')?'#restart-button':game.id.startsWith('cardio-')?'[data-restart]':({'typing-speed':'#try-again-button','ai-literacy-check':'#quiz-reset','reasoning-runner':'#restartButton','clinical-readiness-lab':'#readinessRestartButton'}[game.id]);
    await page.locator(restart).first().click();
    await page.waitForFunction(()=>!document.querySelector('.skills-result'));
    results.push({game:game.id,mode:tracked?'tracked mobile':'public desktop',status:'PASS',score:submissions[0]?.technical_score});
    console.log('PASS',game.id,tracked?'tracked mobile':'public desktop');
   }catch(error){results.push({game:game.id,mode:tracked?'tracked mobile':'public desktop',status:'FAIL',error:error.message,console:errors, state:await page.evaluate(()=>typeof state==='object'?JSON.stringify(state):document.querySelector('[data-feedback]')?.textContent)});console.log('FAIL',game.id,error.message.split('\n')[0]);await page.screenshot({path:'/private/tmp/takwing-failure.png',fullPage:true});}
   page.off('pageerror',listener);page.off('request',requestListener);
  }
  await context.close();
 }
 }finally{await browser.close();fs.writeFileSync('/private/tmp/takwing-browser-results.json',JSON.stringify(results,null,2));}
 assert(results.every(r=>r.status==='PASS'),'Browser regressions failed; inspect /private/tmp/takwing-browser-results.json');
})();
