// Run against the isolated local preview/Worker, never the production database.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const password=fs.readFileSync(require('node:path').join(__dirname,'../cloudflare/test-credentials.txt'),'utf8').match(/^TEST001:\s*(\S+)/m)[1];
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{const p=await b.newPage({viewport:{width:390,height:844}});await p.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({body:''}));await p.goto('http://127.0.0.1:4201/student/login/');await p.evaluate(password=>PhysioSkillsAuth.login('TEST001',password),password);
for(const tracked of [false,true])for(const path of ['elbow-goniometry/','ankle-goniometry/','typing-test/','ai-literacy-check.html','reasoning-runner.html','clinical-readiness-lab.html']){
 await p.goto('http://127.0.0.1:4201/'+path+(tracked?'?tracked=1':''));if(await p.locator('.menu-toggle').isVisible())await p.locator('.menu-toggle').click();await p.locator('a[hreflang="zh-Hant"]:visible').first().click();await p.waitForLoadState('domcontentloaded');assert.equal(new URL(p.url()).searchParams.get('tracked'),tracked?'1':null);assert.equal(await p.locator('html').getAttribute('lang'),'zh-Hant');if(tracked)assert(await p.evaluate(()=>PhysioSkillsProgress.whenAuthenticated()));console.log('PASS language switch',path,tracked?'tracked':'public');}
}finally{await b.close()}})();
