// Local-only checks; third-party requests are blocked and no student records are written.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let count=0;try{
for(const width of [390,1440])for(const theme of ['light','dark'])for(const locale of ['','zh-hant/','zh-hans/']){
 const page=await browser.newPage({viewport:{width,height:900}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(theme=>localStorage.setItem('portfolio-theme-v2',theme),theme);
 await page.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='review.test')return r.fulfill({body:''});const file=path.join(root,decodeURIComponent(u.pathname));if(!fs.existsSync(file))return r.fulfill({status:404,body:''});return r.fulfill({path:file});});
 for(const name of ['index','about','research','publications','media','contact']){
  errors=[];await page.goto('http://review.test/'+locale+name+'.html');await page.waitForTimeout(350);
  assert.equal(await page.locator('html').getAttribute('data-theme'),theme);assert(await page.locator('main .profile-connections').count()>0,name+' connections');
  for(const href of await page.locator('main .profile-connections a').evaluateAll(a=>a.map(e=>e.href)))assert(href.startsWith('https://'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,locale+name+' overflow');assert.deepEqual(errors,[]);
  if(name==='index')assert.equal(await page.locator('.pilot-hero .profile-connections a').count(),2);
  if(name==='research'){
   assert.equal(await page.locator('.case-study-evidence').count(),3);
   for(const a of await page.locator('.case-study-evidence a').evaluateAll(es=>es.map(a=>a.getAttribute('href')))){
    const parts=a.split('#'),file=path.join(root,locale,parts[0]);assert(fs.existsSync(file),a);
    if(parts[1])assert(fs.readFileSync(file,'utf8').includes('id="'+parts[1]+'"'),a);
   }
  }
  if(locale===''&&theme==='light'&&name==='research')await page.screenshot({path:'/private/tmp/profile-research-'+width+'.png',fullPage:true});
  count++;
 }
 await page.goto('http://review.test/'+locale+'research.html');const first=page.locator('.case-study-evidence a').first();await first.focus();assert(await first.evaluate(e=>e===document.activeElement));await first.press('Enter');assert(new URL(page.url()).hash==='#technology-learning');
 await page.close();
}
for(const locale of ['','zh-hant/','zh-hans/']){
 const text=fs.readFileSync(path.join(root,locale,'posts/after-the-debrief-using-ai-to-keep-simulation-learning-alive.html'),'utf8');assert(text.includes('https://orcid.org/0000-0002-9650-0370'));
}
assert(!fs.existsSync(path.join(root,'course-applied-ai-allied-health.html')),'public course remains withdrawn');
console.log('PASS',count,'page/viewport/theme checks; three case studies, profile destinations, keyboard links, article ORCID and local course preservation');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
