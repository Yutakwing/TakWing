// Local authenticated layout QA; requires isolated Worker/D1 on 8787.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),base='http://127.0.0.1:8896/TakWing/';
const password=fs.readFileSync(root+'/cloudflare/test-credentials.txt','utf8').match(/^TEST001:\s*(\S+)/m)[1];
const games=[...fs.readFileSync(root+'/cloudflare/seed-games.sql','utf8').matchAll(/\('([^']+)', '[^']+', '[^']+', '\/TakWing\/([^']+)'/g)].map(m=>({id:m[1],path:m[2]}));
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let count=0;try{
for(const width of [390,768,1024,1440]){
 const context=await browser.newContext({viewport:{width,height:900}});await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({body:''}));
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'student/login/');await page.locator('input[name=username]').focus();assert.notEqual(await page.locator('input[name=username]').evaluate(e=>getComputedStyle(e).outlineStyle),'none');
 await page.evaluate(p=>PhysioSkillsAuth.login('TEST001',p),password);await page.goto(base+'student/dashboard/');await page.waitForFunction(()=>document.querySelectorAll('a[href*="tracked=1"]').length===15);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,'dashboard overflow');
 await page.screenshot({path:`/tmp/phase8-dashboard-${width}.png`,fullPage:false});
 for(const game of games){await page.goto(base+game.path+'?tracked=1');await page.waitForFunction(async()=>window.PhysioSkillsProgress&&await PhysioSkillsProgress.whenAuthenticated());
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,game.id);
 if(game.id.includes('goniometry')||game.id.startsWith('cardio-'))await page.locator('[data-tutor-ask]').waitFor();
 else assert.equal(await page.locator('[data-tutor-ask]').count(),0);count++;}
 assert.deepEqual(errors,[]);await context.close();
}console.log(`PASS ${count} authenticated game layouts and four login/dashboard layouts beneath /TakWing/, including expected tutor visibility.`);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
