// All HTTP requests are intercepted. No real beacon, RUM, game event or student request leaves this test.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),origin='https://yutakwing.github.io',base=origin+'/TakWing/';
const snippet=`<template id="site-analytics-snippet"><script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"OFFLINE-STUB-NOT-A-SITE-TOKEN"}'></script></template>`;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.xml':'application/xml'};
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let checked=0;try{
 for(const width of [390,768,1024,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  // Only for a fully intercepted simulation of an ordinary visitor. Production retains the webdriver guard.
  await context.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>false}));
  let requests=[],mode='active';
  await context.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.hostname==='static.cloudflareinsights.com'){requests.push(u.href);return route.fulfill({contentType:'text/javascript',body:'window.__offlineBeaconLoads=(window.__offlineBeaconLoads||0)+1;'});}
   if(u.hostname==='cloudflareinsights.com')throw Error('Unexpected RUM attempt in offline test');
   if(![new URL(base).hostname,'localhost','127.0.0.1','preview.invalid'].includes(u.hostname))return route.fulfill({contentType:'application/json',body:'{}'});
   let rel=u.pathname.replace(/^\/TakWing\//,'');if(!rel||rel.endsWith('/'))rel+='index.html';const file=path.resolve(root,rel);
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Missing fixture'});
   let body=fs.readFileSync(file);
   if(file.endsWith('.html')) {
    // Remove the real inert snippet before supplying an offline fixture; never execute production tokens in tests.
    body=body.toString().replace(/<template id="site-analytics-snippet">[\s\S]*?<\/template>/g,'').replace(/data-site-analytics-enabled="(?:true|false)"/g,`data-site-analytics-enabled="${mode==='active'}"`);
    if(mode==='active')body=body.replace(/(<script src="[^"\n]*\/assets\/js\/site-analytics.js[^>]*>)/,snippet+'$1');
   }
   return route.fulfill({contentType:types[path.extname(file)]||'application/octet-stream',body});
  });
  const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
  const targets=['','about.html','research.html','teaching.html','writing.html','posts/can-you-hear-the-song-curse-of-knowledge-in-teaching.html','posts/a-vr-demonstration-is-not-yet-a-learning-experience.html','media.html','resources.html','skills-lab.html','collaborate.html','privacy.html'];
  for(const target of targets){requests=[];errors=[];await page.goto(base+target);await page.waitForLoadState('load');assert.equal(await page.evaluate(()=>window.__offlineBeaconLoads),1,target);assert.equal(requests.length,1,target);assert.equal(new URL(requests[0]).hostname,'static.cloudflareinsights.com');assert.equal(await page.locator('script[src^="https://static.cloudflareinsights.com/"]').count(),1);
   const before=await page.locator('main').boundingBox();await page.addScriptTag({path:path.join(root,'assets/js/site-analytics.js')});assert.equal(requests.length,1,'No duplicate on repeated execution');assert.deepEqual(await page.locator('main').boundingBox(),before,'No loader layout movement');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,target);assert.deepEqual(errors,[],target);checked++;
  }
  // Exclusion with a prepared active fixture, plus missing-token production output.
  for(const target of ['student/login/','student/dashboard/','elbow-goniometry/?tracked=1','elbow-goniometry/','ai-literacy-check.html','writing.html?tracked=1','contact.html?subject=PRIVATE','writing.html?lang=en']){requests=[];await page.goto(base+target);assert.equal(requests.length,0,target);checked++;}
  for(const host of ['http://localhost:8896','http://127.0.0.1:8896','https://preview.invalid']){requests=[];await page.goto(host+'/TakWing/writing.html');assert.equal(requests.length,0,host);checked++;}
  mode='pending';requests=[];await page.goto(base+'writing.html');assert.equal(requests.length,0);assert.equal(await page.locator('#site-analytics-snippet').count(),0);checked++;
  await page.locator('.search-button:visible').first().click();await page.locator('.search-modal input').fill('Privacy');await page.locator('.search-results a[href*="privacy.html"]').waitFor();await page.keyboard.press('Escape');assert(await page.locator('.search-button:visible').first().evaluate(e=>e===document.activeElement));
  await page.locator('.theme-toggle:visible').first().click();const theme=await page.evaluate(()=>document.documentElement.dataset.theme);await page.reload();assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);
  for(const locale of ['en','zh-hant','zh-hans']){await page.goto(base+(locale==='en'?'':locale+'/')+'privacy.html');assert.equal(await page.locator('h1').innerText(),'Privacy and website analytics');assert.equal(await page.locator('.site-footer a[href*="privacy.html"]').count(),1);if(locale!=='en')assert.match(await page.locator('.translation-note').innerText(),/TRANSLATION REQUIRED/);for(const t of ['light','dark']){await page.evaluate(t=>document.documentElement.dataset.theme=t,t);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);}checked++;}
  if(width===390||width===1440){await page.goto(base+'privacy.html');await page.screenshot({path:`/tmp/phase11-privacy-${width}.png`});}
  await context.close();
 }
 console.log(`PASS ${checked} browser cases at four widths: intercepted official-origin stub once, exclusions, pending config, privacy/locales, no loader layout shift, search/theme/focus. No production traffic.`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
