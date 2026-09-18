const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.MOBILITY_BASE_URL||'http://127.0.0.1:8896/TakWing/';
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});let count=0;try{
for(const locale of ['', 'zh-hant/', 'zh-hans/'])for(const width of [390,768,1024,1440]){
 const c=await b.newContext({viewport:{width,height:850}});const errors=[];await c.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+locale+'skills-lab.html',{waitUntil:'domcontentloaded'});
 assert.equal(await p.locator('[data-skills-activity]').count(),15);
 await p.locator('#mobility a').focus();await p.keyboard.press('Enter');await p.waitForURL('**/mobility.html');
 assert.equal(await p.locator('[data-mobility-proposal]').count(),6);assert.equal(await p.locator('[data-mobility-proposal] a, [data-mobility-proposal] button').count(),0);
 assert.equal(await p.locator('.top-nav [aria-current="page"]').innerText(),'Skills Lab');
 if(locale)assert.match(await p.locator('.translation-note').innerText(),/TRANSLATION REQUIRED/);
 for(const theme of ['light','dark']){await p.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);}
 const nav=width<=1200?p.locator('.mobile-panel'):p.locator('.site-header');if(width<=1200)await p.locator('.menu-toggle').click();
 assert.equal(await nav.locator('.language-selector a').count(),3);
 for(const href of await nav.locator('.language-selector a').evaluateAll(xs=>xs.map(x=>x.href)))assert.equal((await c.request.get(href)).status(),200);
 if(width<=1200)await p.keyboard.press('Escape');
 if(!locale)await p.screenshot({path:`/tmp/mobility-${width}.png`,fullPage:true});
 await p.locator('main a').focus();await p.keyboard.press('Enter');await p.waitForURL('**/skills-lab.html');
 assert.deepEqual(errors,[]);count++;await c.close();
}
console.log(`PASS ${count} Mobility locale/viewport cases, light/dark overflow, keyboard overview/back links, six non-playable cards and locale routes.`);
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
