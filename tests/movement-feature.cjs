const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.MOVEMENT_BASE_URL||'http://127.0.0.1:8896/TakWing/';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let count=0;try{
for(const locale of ['', 'zh-hant/', 'zh-hans/'])for(const width of [390,768,1024,1440]){
 const context=await browser.newContext({viewport:{width,height:850}});
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
 await context.addInitScript(()=>{window.depthFrames=0;const original=window.requestAnimationFrame;window.requestAnimationFrame=cb=>original.call(window,t=>{if(cb.name==='updateDepth')window.depthFrames++;cb(t)})});
 const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+locale+'teaching.html',{waitUntil:'domcontentloaded'});
 await p.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
 const feature=p.locator('[data-movement]'),stage=p.locator('.movement-stage'),limb=p.locator('.movement-thigh').last(),button=p.locator('.movement-toggle');
 await stage.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('[data-movement]').dataset.running==='true');
 assert.equal(await p.locator('.movement-svg').getAttribute('aria-hidden'),'true');assert.equal(await p.locator('.movement-svg').getAttribute('focusable'),'false');
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 const a=await limb.evaluate(e=>getComputedStyle(e).transform);await p.waitForTimeout(200);const b=await limb.evaluate(e=>getComputedStyle(e).transform);assert.notEqual(a,b,'walk animates');
 await button.focus();await p.keyboard.press('Enter');assert.equal(await button.innerText(),'Resume motion');
 await p.waitForTimeout(80);const paused=await limb.evaluate(e=>getComputedStyle(e).transform);await p.waitForTimeout(120);assert.equal(await limb.evaluate(e=>getComputedStyle(e).transform),paused);assert.equal(await feature.getAttribute('data-running'),'false');
 await p.keyboard.press('Enter');assert.equal(await button.innerText(),'Pause motion');
 await p.emulateMedia({reducedMotion:'reduce'});await p.screenshot({path:'/tmp/movement-reduced-check.png'});await p.evaluate(()=>scrollBy(0,20));await p.waitForFunction(()=>document.querySelector('.movement-toggle').disabled);
 assert.equal(await limb.evaluate(e=>getComputedStyle(e).animationName),'none');assert.equal(await p.locator('.movement-depth').evaluate(e=>getComputedStyle(e).transform),'none');
 await p.evaluate(()=>scrollBy(0,20));await p.waitForTimeout(50);assert.equal(await feature.getAttribute('data-running'),'false');
 await p.emulateMedia({reducedMotion:'no-preference'});await p.screenshot({path:'/tmp/movement-motion-check.png'});await stage.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('[data-movement]').dataset.running==='true');
 await p.evaluate(()=>{const s=document.querySelector('.movement-stage').getBoundingClientRect();scrollBy(0,s.top+s.height/2-innerHeight/2)});await p.waitForTimeout(100);
 const offset=()=>p.locator('.movement-depth').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m42);
 const y=await offset();await p.evaluate(()=>scrollBy(0,40));await p.waitForTimeout(100);assert(Math.abs((await offset())-y-7.2)<.5,'parallax factor .18');assert(Math.abs(await offset())<=18);
 const frames=await p.evaluate(()=>window.depthFrames);await p.waitForTimeout(180);assert.equal(await p.evaluate(()=>window.depthFrames),frames,'no perpetual parallax frame loop');
 await p.evaluate(()=>scrollTo(0,document.body.scrollHeight));await p.waitForFunction(()=>document.querySelector('[data-movement]').dataset.running==='false');
 await stage.scrollIntoViewIfNeeded();if(!locale){await p.screenshot({path:`/tmp/movement-${width}.png`,fullPage:false});await p.evaluate(()=>document.documentElement.dataset.theme='dark');await p.screenshot({path:`/tmp/movement-${width}-dark.png`,fullPage:false});}
 if(locale)assert.match(await p.locator('.movement-translation').innerText(),/TRANSLATION REQUIRED/);
 assert.deepEqual(errors,[]);count++;await context.close();
}
const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:850}});const p=await context.newPage();await p.goto(base+'teaching.html',{waitUntil:'domcontentloaded'});assert(await p.locator('.movement-svg').isVisible());assert(await p.locator('.movement-toggle').isHidden());await context.close();
const reducedContext=await browser.newContext({reducedMotion:'reduce'});const reducedPage=await reducedContext.newPage();await reducedPage.goto(base+'teaching.html',{waitUntil:'domcontentloaded'});await reducedPage.locator('.movement-stage').scrollIntoViewIfNeeded();assert.equal(await reducedPage.locator('.movement-thigh').first().evaluate(e=>getComputedStyle(e).animationName),'none');assert(await reducedPage.locator('.movement-toggle').isDisabled());await reducedContext.close();
console.log(`PASS ${count} locale/viewport cases: animation, pause/resume, live reduced-motion changes, static no-JS fallback, .18 bounded parallax, idle/offscreen suspension and no overflow.`);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
