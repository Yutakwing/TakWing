// Blog-only regression checks: existing article sources, discovery and browser presentation.
// Requires installed Chrome and Playwright (or PLAYWRIGHT_MODULE).
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname,'..');
const base = process.env.BLOG_BASE_URL || 'http://127.0.0.1:8890/TakWing/';
const posts = [
 {slug:'can-you-hear-the-song-curse-of-knowledge-in-teaching',title:'Can You Hear the Song? The Curse of Knowledge in Teaching',image:'can-you-hear-the-song-curse-of-knowledge.webp',category:'Physio',references:['Camerer','Hinds','Nathan','Newton'],doiCount:3},
 {slug:'enough-about-catching-ai-a-practical-guide-to-using-it-for-learning',title:'Enough About Catching AI: A Practical Guide to Using It for Learning',image:'enough-about-catching-ai-learning.webp',category:'AI',references:['Bastani','Chi','Kapur','Kasneci','Kestin','Roediger'],doiCount:6}
];
for(const locale of ['','zh-hant/','zh-hans/']) {
 const index=JSON.parse(fs.readFileSync(path.join(root,locale,'search-index.json'),'utf8'));
 const feed=fs.readFileSync(path.join(root,locale,'feed.xml'),'utf8');
 assert.equal((feed.match(/<item>/g)||[]).length,47);
 for(const post of posts){
  assert.equal(index.filter(i=>i.href.endsWith('/'+post.slug+'.html')).length,1,'search uniqueness');
  for(const file of ['index.html','writing.html','feed.xml']) assert(fs.readFileSync(path.join(root,locale,file),'utf8').includes(post.slug),locale+file);
  assert.equal((feed.match(new RegExp('<link>[^<]*'+post.slug+'\\.html</link>','g'))||[]).length,1,'RSS uniqueness');
 }
}
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let checked=0;try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:1000}});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.fulfill({body:''}));
  const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const locale of ['','zh-hant/','zh-hans/'])for(const post of posts){
   errors=[];const url=new URL(locale+'posts/'+post.slug+'.html',base).href;const response=await page.goto(url);assert.equal(response.status(),200,url);
   await page.locator('.post-content').waitFor();await page.evaluate(async()=>{await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));});await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,url);
   const image=page.locator('img[src*="'+post.image+'"]');assert.equal(await image.count(),1);assert.equal(await image.evaluate(i=>i.naturalWidth),1600);assert.equal(await image.getAttribute('width'),'1600');assert.equal(await image.getAttribute('height'),'901');
   const canonical='https://yutakwing.github.io/TakWing/'+locale+'posts/'+post.slug+'.html';assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical);assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),canonical);assert((await page.locator('meta[property="og:image"]').getAttribute('content')).endsWith('/'+post.image));
   assert(await page.locator('.continue-exploring a').count()>0);
   if(!locale){assert.equal(await page.locator('h1').textContent(),post.title);const content=await page.locator('.post-content').innerText();for(const ref of post.references)assert(content.includes(ref));assert.equal(await page.locator('.post-content a[href^="https://doi.org/"]').count(),post.doiCount);assert(!content.includes('[['));}
   else{assert.match(await page.locator('.post-content').innerText(),/正在準備中|正在准备中/);assert.equal(await page.locator('.post-content a').first().getAttribute('href'),'../../posts/'+post.slug+'.html');}
   assert.deepEqual(errors,[]);checked++;
  }
  await page.goto(new URL('writing.html',base).href);for(const post of posts)assert(await page.locator('a[href*="'+post.slug+'"]').count()>0);
  await page.locator('.search-button:visible').first().click();for(const post of posts){await page.locator('.search-modal input').fill(post.title);await page.locator('.search-results a[href*="'+post.slug+'"]').waitFor();}await page.keyboard.press('Escape');await context.close();
 }
 console.log(`PASS: ${checked} article/viewport cases; references, images, canonical/Open Graph metadata, related content, pending translations, archive, search, RSS and homepage inclusion.`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
