const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASELINE_URL||'http://127.0.0.1:8896/TakWing/';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true}),report=[];
try{for(const width of [390,768,1024,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.vitals={lcp:0,cls:0};new PerformanceObserver(l=>l.getEntries().forEach(e=>window.vitals.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.vitals.cls+=e.value})).observe({type:'layout-shift',buffered:true});});
 for(const target of ['index.html','about.html','research.html','teaching.html','skills-lab.html','writing.html','media.html','resources.html','collaborate.html','mobility.html']){
  await page.goto(base+target);await page.waitForTimeout(150);
  assert.equal(await page.locator('img:not([alt])').count(),0,target+' missing alt');
  assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('reveal-ready')),false);
  const vitals=await page.evaluate(()=>window.vitals);
  for(const theme of ['light','dark']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   const state=await page.evaluate(()=>{
    const colour=value=>value.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});
    const lum=value=>colour(value).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    const probe=document.createElement('span');probe.style.setProperty('transition','none','important');document.body.append(probe);
    const value=token=>{probe.style.color=`var(${token})`;return getComputedStyle(probe).color};
    const contrast=(a,b)=>{const x=lum(value(a)),y=lum(value(b));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
    const ratios=['--dark','--darkgray','--gray','--secondary'].map(t=>({token:t,page:contrast(t,'--light'),surface:contrast(t,'--surface')}));probe.remove();
    return {overflow:document.documentElement.scrollWidth>innerWidth+2,ratios};
   });assert.equal(state.overflow,false,target+theme);for(const ratio of state.ratios){assert(ratio.page>=4.5,target+theme+ratio.token);assert(ratio.surface>=4.5,target+theme+ratio.token);}
   report.push({width,target,theme,...state,...vitals});
  }
 }
 await page.goto(base);await page.locator('.search-button:visible').first().focus();await page.keyboard.press('Enter');
 const input=page.locator('.search-modal input');await input.fill('Movement Science');await page.locator('.search-results a').first().waitFor();
 await input.focus();await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('.search-results a').last().evaluate(e=>e===document.activeElement),true);
 await page.keyboard.press('Tab');assert.equal(await input.evaluate(e=>e===document.activeElement),true);
 assert.notEqual(await input.evaluate(e=>getComputedStyle(e).outlineStyle),'none');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.search-button:visible').first().evaluate(e=>e===document.activeElement),true);
 await page.screenshot({path:`/tmp/phase8-home-${width}.png`,fullPage:false});
 assert.deepEqual(errors,[]);await context.close();
}
const context=await browser.newContext();await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
await context.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}});Object.defineProperty(window,'IntersectionObserver',{value:undefined});});
const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base);await p.locator('.theme-toggle:visible').first().click();await p.locator('.search-button:visible').first().click();await p.locator('.search-modal input').fill('Skills');await p.locator('.search-results a').first().waitFor();assert.deepEqual(errors,[]);await context.close();
console.log('PASS 80 page/theme/viewport token-contrast and reduced-motion cases, alt presence, search keyboard/focus, blocked-storage controls. Local LCP/CLS samples saved; not field metrics.');
}finally{fs.writeFileSync('/tmp/takwing-phase8-accessibility.json',JSON.stringify(report,null,2));await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
