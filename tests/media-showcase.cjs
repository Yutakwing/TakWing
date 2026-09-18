const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');const {execFileSync}=require('node:child_process');
const base=process.env.MEDIA_BASE_URL||'http://127.0.0.1:8893/TakWing/';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let count=0;try{
for(const locale of ['','zh-hant/','zh-hans/']){
 const before=execFileSync('git',['show','0e5e04a:'+locale+'media.html'],{encoding:'utf8'});
 const now=fs.readFileSync(locale+'media.html','utf8');
 const block=s=>s.match(/<section class="section-block media-instagram-section">[\s\S]*?<\/section>/)[0];assert.equal(block(now),block(before),'Instagram must remain unchanged');
 const index=JSON.parse(fs.readFileSync(locale+'search-index.json','utf8'));const media=index.find(i=>i.href==='./media.html');assert(media.content.includes('Technology in Learning and Teaching'));assert(media.content.includes('Short teaching showcase'));assert(!media.content.includes('Preparing the first release'));
 for(const width of [1440,390])for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:1000}});await context.addInitScript(theme=>localStorage.setItem('portfolio-theme-v2',theme),theme);
  // Isolate host layout/keyboard checks from network-dependent player behaviour.
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
  const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));assert.equal((await page.goto(base+locale+'media.html')).status(),200);
  assert.equal(await page.locator('html').getAttribute('data-theme'),theme);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
  const frame=page.locator('.media-player iframe');assert.equal(await frame.count(),1);assert.match(await frame.getAttribute('src'),/^https:\/\/www.youtube-nocookie.com\/embed\/kfZ93HG7FNs\?/);assert.equal(new URL(await frame.getAttribute('src')).searchParams.get('autoplay'),'0');assert.equal(await frame.getAttribute('loading'),'lazy');assert.equal(await frame.getAttribute('referrerpolicy'),'strict-origin-when-cross-origin');assert(!(await frame.getAttribute('allow')).includes('autoplay'));assert.match(await frame.getAttribute('title'),/Short teaching showcase/);
  const box=await frame.boundingBox();assert(Math.abs(box.width/box.height-16/9)<.01);assert(box.width<=720);assert.equal(await page.locator('.media-instagram-card').count(),6);
  const order=await page.locator('.pilot-media-page > section').evaluateAll(x=>x.map(e=>e.className));assert(order[1].includes('media-featured')&&order[2].includes('media-teaching')&&order[3].includes('media-instagram')&&order[4].includes('media-formats'));
  const watch=page.getByRole('link',{name:'Watch on YouTube'});await frame.focus();await page.keyboard.press('Tab');assert(await watch.evaluate(e=>e===document.activeElement),'Keyboard exits frame to fallback link');assert.equal(await watch.getAttribute('rel'),'noopener noreferrer');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'#featured-video');
  assert.deepEqual(errors,[]);if(!locale)await page.screenshot({path:'/tmp/media-'+width+'-'+theme+'.png',fullPage:true});count++;await context.close();
 }
}
console.log('PASS',count,'Media layout/theme cases; keyboard, ratio, privacy attributes, exact Instagram preservation and search metadata.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
