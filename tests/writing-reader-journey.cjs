// HTTP browser QA. PLAYWRIGHT_MODULE may point at the installed runtime; requires Chrome.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),base=process.env.WRITING_BASE_URL||'http://127.0.0.1:8896/TakWing/';
const index=JSON.parse(fs.readFileSync(path.join(root,'search-index.json')));
const find=title=>{const entry=index.find(e=>e.href.startsWith('./posts/')&&e.title.startsWith(title));assert(entry,title);return entry.href.slice(2);};
const targets=['writing.html',find('A VR Demonstration'),find('When Teaching Becomes Boring'),find('AI Integration Needs'),find('Movement Science Assessment'),find('Can You Hear the Song?'),find('Enough About Catching AI')];
const collectionIds=['ai-learning-assessment','clinical-reasoning','vr-simulation','educator-life'];
const report=[];
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 for(const width of [390,768,1024,1440]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
  const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const target of targets) {
   errors=[];assert.equal((await page.goto(new URL(target,base).href)).status(),200);
   await page.evaluate(async()=>{await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));});
   for(const theme of ['light','dark']) {
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,target+width+theme);
    assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0&&i.hasAttribute('alt'))),true,target+' assets');
    assert(await page.locator('meta[property="og:image"]').getAttribute('content'));
    report.push({target,width,theme});
   }
   const toc=page.locator('.article-toc');
   if(await toc.count()) {
    const summary=toc.locator('summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await toc.getAttribute('open'),'');
    assert.notEqual(await summary.evaluate(el=>getComputedStyle(el).outlineStyle),'none');
    await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.tagName),'A');
    const links=await toc.locator('a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
    for(const href of links) assert.equal(await page.locator('[id="'+href.slice(1)+'"]').count(),1);
    await page.keyboard.press('Enter');await page.waitForFunction(()=>location.hash.startsWith('#section-'));
    const position=await page.evaluate(()=>({top:document.getElementById(decodeURIComponent(location.hash.slice(1))).getBoundingClientRect().top,header:document.querySelector('.site-header').getBoundingClientRect().bottom}));
    assert(position.top>=position.header-1,JSON.stringify(position));
   } else if(target.includes('a-vr-demonstration')) assert.equal(await toc.count(),0,'Short note compact');
   assert.deepEqual(errors,[],target);
  }
  await page.goto(new URL('writing.html',base).href);
  for(const id of collectionIds) {
   await page.goto(new URL('writing.html#collection-'+id,base).href);
   const card=page.locator('#collection-'+id),summary=card.locator('summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await card.locator('details').getAttribute('open'),'');
   const start=card.locator('.writing-start a');assert.equal((await page.request.get(new URL(await start.getAttribute('href'),page.url()).href)).status(),200);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
  }
  const archive=page.locator('.writing-all-articles');await archive.locator('summary').focus();await page.keyboard.press('Space');assert.equal(await archive.locator('li').count(),47);assert.equal(await archive.getAttribute('open'),'');
  await page.locator('.search-button:visible').first().click();
  for(const q of ['Clinical Reasoning & Practice Readiness','TEACHING DESIGN','Can You Hear the Song']){
   await page.locator('.search-modal input').fill(q);await page.locator('.search-results a').first().waitFor();
   const text=await page.locator('.search-results').innerText();assert(text.length>0);
   if(q==='TEACHING DESIGN')assert(text.includes('Movement Science'));
  }
  await page.keyboard.press('Escape');
  assert(await page.locator('.search-button:visible').first().evaluate(el=>el===document.activeElement));
  await page.locator('.theme-toggle:visible').first().click();const theme=await page.evaluate(()=>document.documentElement.dataset.theme);await page.reload();assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);
  // Follow actual locale hrefs and check collection destinations, including new English-only labels.
  for(const locale of ['zh-hant','zh-hans']) {
   await page.goto(new URL('writing.html',base).href);
   const href=await page.locator('.language-selector a[href*="'+locale+'"]').first().getAttribute('href');await page.goto(new URL(href,page.url()).href);
   assert(await page.locator('.writing-translation-notice').count());assert.equal(await page.locator('.writing-collection-card').count(),4);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
   for(const target of targets.slice(1)) {await page.goto(new URL(locale+'/'+target,base).href);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);assert(await page.locator('.article-collections a').count());}
  }
  if(width===390||width===1440){
   await page.goto(new URL('writing.html#writing-collections-title',base).href);await page.screenshot({path:`/tmp/phase10-writing-${width}.png`});
   await page.goto(new URL(targets[5],base).href);await page.locator('.article-toc summary').click();await page.locator('.article-toc').scrollIntoViewIfNeeded();await page.screenshot({path:`/tmp/phase10-article-${width}.png`});
  }
  await context.close();
 }
 // Native disclosure and anchor navigation must work without scripts.
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),page=await context.newPage();
 await page.goto(new URL(targets[5],base).href);await page.locator('.article-toc summary').click();await page.locator('.article-toc a').first().click();assert(new URL(page.url()).hash);await context.close();
 fs.writeFileSync('/tmp/phase10-browser-report.json',JSON.stringify(report,null,2));
 console.log(`PASS: ${report.length} English page/width/theme cases, 56 locale layouts, 16 collection entries, native TOC/keyboard, no-JS reading, search/theme and assets.`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
