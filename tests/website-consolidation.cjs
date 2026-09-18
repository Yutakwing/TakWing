// Phase 8 whole-site browser QA, extending the baseline across four viewports. Third-party services are blocked; no student data is written.
// Serve the repository at BASELINE_URL (default http://127.0.0.1:8878/TakWing/).
// PLAYWRIGHT_MODULE may point to an existing installation. Requires installed Chrome.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.env.BASELINE_URL || 'http://127.0.0.1:8878/TakWing/';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname), 'Local preview only');
const root = path.resolve(__dirname, '..');
const main = ['skills-lab', 'mobility', 'index', 'about', 'research', 'teaching', 'writing', 'media', 'resources', 'collaborate'];
const games = [...fs.readFileSync(path.join(root, 'cloudflare/seed-games.sql'), 'utf8').matchAll(/\('([^']+)', '[^']+', '[^']+', '\/TakWing\/([^']+)'/g)].map(m => ({id:m[1], path:m[2]}));
const report = {pages: [], checks: [], limitations: ['Third-party transport blocked', 'No authenticated live session or live result writes', 'Viewport emulation is not physical-device certification']};
(async () => {
 const browser = await chromium.launch({channel:'chrome', headless:true});
 try {
  for (const width of [390,768,1024,1440]) {
   const context = await browser.newContext({viewport:{width,height:900}});
   await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.fulfill({status:200, body:''}));
   const page = await context.newPage();
   let errors = [];
   page.on('pageerror', e => errors.push(e.message));
   page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
   for (const target of [...['','zh-hant/','zh-hans/'].flatMap(locale => main.map(p => locale+p+'.html')), 'goniometry/', 'cardiorespiratory/', 'student/login/', ...games.map(g => g.path)]) {
    errors=[];
    const response = await page.goto(new URL(target,base).href);
    await page.waitForLoadState('load');
    await page.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,20));}scrollTo(0,0); });
    await page.evaluate(async()=>{await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));});
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete),null,{timeout:15000});
    const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,missingImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')),h1:document.querySelector('h1')?.textContent,skip:!!document.querySelector('a[href^="#main"]')}));
    assert.equal(response.status(),200,target);assert.equal(state.overflow,false,target+' overflow');assert.deepEqual(state.missingImages,[],target+' images');assert.deepEqual(errors,[],target+' exceptions');
    report.pages.push({width,target,...state});
   }
   await page.goto(base);
   const theme=page.locator('.theme-toggle:visible').first();const before=await page.locator('html').getAttribute('data-theme');await theme.click();assert.notEqual(await page.locator('html').getAttribute('data-theme'),before);await page.reload();assert.notEqual(await page.locator('html').getAttribute('data-theme'),before);
   await page.locator('.search-button:visible').first().click();await page.locator('.search-modal input').fill('Movement Science');await page.locator('.search-results a').first().waitFor();
   const hrefs=await page.locator('.search-results a').evaluateAll(els=>els.map(a=>a.href));assert(hrefs.every(h=>new URL(h).pathname.startsWith('/TakWing/')));assert(hrefs.some(h=>h.includes('movement-science-assessment-redesign')));await page.keyboard.press('Escape');assert.equal(await page.locator('.search-overlay').evaluate(e=>e.classList.contains('active')),false);
   if(width===390){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.mobile-panel').evaluate(e=>e.inert),false);await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-panel').evaluate(e=>e.inert),true);}
   await page.goto(new URL('student/dashboard/',base).href);await page.waitForURL('**/student/login/');
   await page.goto(new URL('elbow-goniometry/?tracked=1',base).href);await page.waitForURL('**/student/login/');
   report.checks.push({width,themePersistence:true,search:true,mobileMenu:width===390,unauthenticatedGates:true});
   await context.close();
  }
  const context=await browser.newContext({reducedMotion:'reduce'});await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));const page=await context.newPage();await page.goto(base);assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('reveal-ready')),false);report.checks.push({reducedMotion:true});await context.close();
  console.log(JSON.stringify({pages:report.pages.length,checks:report.checks}));
 } finally {fs.writeFileSync(process.env.BASELINE_REPORT || '/tmp/takwing-phase8-browser.json',JSON.stringify(report,null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
