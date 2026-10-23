// Local preview only; external traffic and production student services are blocked.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),base=process.env.PROFILE_PREVIEW_URL||'http://127.0.0.1:8912/';assert(['127.0.0.1','localhost'].includes(new URL(base).hostname));
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});let cases=0;try{
for(const width of [390,1440])for(const theme of ['light','dark'])for(const locale of ['','zh-hant/','zh-hans/']){
 const p=await b.newPage({viewport:{width,height:900}});await p.addInitScript(t=>localStorage.setItem('portfolio-theme-v2',t),theme);await p.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));let errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const name of ['index','about','publications','media','resources','simulation-debrief-guide']){
  errors=[];await p.goto(base+locale+name+'.html');await p.waitForTimeout(400);
  assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('html').getAttribute('data-theme'),theme);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,locale+name);assert.deepEqual(errors,[]);
  assert.equal(await p.locator('a[href="./cv.html"],a[href="../cv.html"]').count(),0,'retired CV links');
  if(name==='index'){assert.equal(await p.locator('.pilot-project-card').count(),3);assert.equal(await p.locator('.flagship-work,.course-home-teaser').count(),0);}
  if(name==='about'){assert.equal(await p.locator('.background-timeline li').count(),4);assert(await p.locator('#professional-background').innerText().then(s=>s.includes('2027')));}
  if(name==='publications'){assert.equal(await p.locator('.publication-card').filter({has:p.locator('a[href*="preprints.jmir.org"]')}).count(),1);assert(await p.locator('a[href*="52925"]').count());}
  if(name==='media')assert.equal(await p.locator('#future-formats-title').count(),0);
  if(name==='resources')assert(await p.locator('a[href="./simulation-debrief-guide.html"]').count());
  if(name==='simulation-debrief-guide'){assert.equal(await p.locator('.debrief-prompts li').count(),3);assert.equal(await p.locator('main form,main textarea,main input').count(),0);}
  if(locale===''&&theme==='light'&&['index','about'].includes(name))await p.screenshot({path:'/private/tmp/academic-upgrade-'+name+'-'+width+'.png',fullPage:true});
  cases++;
 }
 if(theme==='light'){
  await p.goto(base+locale+'cv.html');await p.waitForURL('**/about.html#professional-background');
  await p.goto(base+locale+'student/privacy.html');assert.equal(await p.locator('link[rel=alternate][hreflang]').count(),4);assert(await p.locator('meta[name=description]').getAttribute('content'));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
 }
 await p.close();
}
for(const pre of ['','zh-hant/','zh-hans/']){const a=JSON.parse(fs.readFileSync(path.join(root,pre,'search-index.json')));assert(!a.some(e=>/\.\/cv\.html/.test(e.href)));assert(a.some(e=>e.href==='./simulation-debrief-guide.html'));assert(!fs.existsSync(path.join(root,pre,'course-applied-ai-allied-health.html')));}
assert(!fs.existsSync(path.join(root,'assets/tak-wing-yu-public-cv.pdf')));console.log('PASS',cases,'page/theme/locale cases; CV redirects, privacy metadata, publication grouping, worksheet and online course exclusion');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
