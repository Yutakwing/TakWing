const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const base=process.env.SITE_URL || 'http://127.0.0.1:4201/';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});let count=0;
 try {for(const width of [390,1440]) for(const locale of ['', 'zh-hant/', 'zh-hans/']) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
  for(const file of ['index.html','about.html','research.html','teaching.html','media.html','contact.html','skills-lab.html']) {
   await page.goto(base+locale+file);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,locale+file+' overflow');
   assert.equal(await page.locator('main').count(),1);
   assert(!await page.locator('main').innerText().then(t=>t.includes('undefined')));
   await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);
   if(locale)assert.match(await page.locator('.skip-link').innerText(),/跳至主要/);
   await page.keyboard.press('Enter');assert.equal(await page.locator('main').evaluate(e=>e===document.activeElement),true);
   if(file==='about.html')assert(await page.locator('#academic-profiles a[href="./contact.html"]').isVisible());
   if(file==='media.html') {
    assert.equal(await page.locator('#talks .publication-card').count(),2);
    assert.equal(await page.locator('.talk-category-nav a').count(),1);
    assert.match(await page.locator('#talks').innerText(),/30 July 2026/);
    assert.equal(await page.locator('iframe').first().evaluate(e=>e.getBoundingClientRect().right<=innerWidth),true);
   }
   if(file==='contact.html'&&locale)assert(!await page.locator('.message-fallback').innerText().then(t=>t.includes('You can also')));
   if(file==='skills-lab.html')assert.equal(await page.locator('[data-skills-activity]').count(),15);
   if(width===390&&['about.html','media.html','skills-lab.html'].includes(file))await page.screenshot({path:'/private/tmp/application-'+(locale.replace('/','')||'en')+'-'+file+'.png',fullPage:true});
   count++;
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 console.log(`PASS ${count} application-page locale/layout cases, keyboard bypass, profile/contact links, preserved speaking records and responsive video; external services intercepted.`);
 }finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
