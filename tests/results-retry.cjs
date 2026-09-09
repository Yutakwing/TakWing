const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const password=fs.readFileSync(require('node:path').join(__dirname,'../cloudflare/test-credentials.txt'),'utf8').match(/^TEST001:\s*(\S+)/m)[1];
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
const context=await browser.newContext({viewport:{width:390,height:844}});
await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({status:200,body:''}));
const page=await context.newPage();await page.goto('http://127.0.0.1:4201/student/login/');await page.evaluate(p=>PhysioSkillsAuth.login('TEST001',p),password);
await page.goto('http://127.0.0.1:4201/elbow-goniometry/?tracked=1');await page.waitForFunction(async()=>await PhysioSkillsProgress.whenAuthenticated());
const payloads=[];let fail=true;await page.route('**/api/progress',r=>{if(r.request().method()!=='POST')return r.continue();payloads.push(r.request().postDataJSON());return fail?r.fulfill({status:503,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'http://127.0.0.1:4201'},body:'{}'}):r.continue();});
// Exercise the shared client directly; native completion is covered separately.
await page.locator('#hint-button').click();await page.locator('#hint-button').click();
await page.evaluate(()=>{PhysioSkillsProgress.recordAIRequest('socratic');PhysioSkillsProgress.recordAIRequest('explicit-guidance');PhysioSkillsProgress.recordAIRequest('focused-hint');PhysioSkillsProgress.recordFeedback('elbow-goniometry',{result:'incorrect',error_type:'axis-placement-error'});return PhysioSkillsProgress.submitCompletion({game_id:'elbow-goniometry',score:88,attempts:4});});
await page.getByRole('button',{name:'Retry save',exact:true}).waitFor();assert.equal(payloads.length,1);assert.equal(payloads[0].technical_score,88);assert.equal(payloads[0].hints_used,5);assert.equal(payloads[0].independence_score,60);assert.equal(payloads[0].ai_requests,3);assert.equal(payloads[0].highest_scaffold_level,'explicit-guidance');
await page.evaluate(()=>PhysioSkillsProgress.submitCompletion({game_id:'elbow-goniometry',score:1,attempts:1}));assert.equal(payloads.length,1);
fail=false;await page.getByRole('button',{name:'Retry save',exact:true}).dblclick();await page.getByRole('status').filter({hasText:'Progress saved.'}).waitFor();assert.equal(payloads.length,2);assert.deepEqual(payloads[0],payloads[1]);
const savedUUID=payloads[0].attempt_uuid;
const duplicate=await page.evaluate(async body=>PhysioSkillsAuth.saveGameProgress(body),payloads[0]);assert.equal(duplicate.duplicate,true);
await page.locator('#restart-button').click();
await page.locator('#hint-button').click();await page.locator('#hint-button').click();
await page.evaluate(()=>PhysioSkillsAuth.logout());
await page.evaluate(()=>PhysioSkillsProgress.submitCompletion({game_id:'elbow-goniometry',score:78,attempts:3}));
await page.locator('.skills-result form').waitFor();await page.locator('.skills-result input[type=password]').fill(password);await page.getByRole('button',{name:'Log in and save'}).click();await page.getByRole('status').filter({hasText:'Progress saved.'}).waitFor();assert.notEqual(payloads.at(-1).attempt_uuid,savedUUID);assert.equal(payloads.at(-1).hints_used,2);assert.equal(payloads.at(-1).independence_score,80);assert.equal(payloads.at(-1).technical_score,78);
await page.goto('http://127.0.0.1:4201/student/dashboard/');await page.locator('.skills-game-card').first().waitFor();assert.equal(await page.locator('.skills-game-card').count(),15);await page.locator('.skills-game-card').first().locator('summary').click();await page.locator('.skills-game-card').first().locator('li').first().waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
await page.screenshot({path:'/private/tmp/takwing-results-dashboard.png',fullPage:true});
console.log('PASS: hints, AI scaffold, frozen result, network retry, double submit, UUID duplicate, expired session re-login, mobile dashboard/history');
}finally{await browser.close();}})();
