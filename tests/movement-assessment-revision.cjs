const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),slug='movement-science-assessment-redesign-for-generative-ai';
const forbidden=/Saint Francis|\bSFU\b|School of Health Sciences|30%|University of Sydney|University of Hong Kong|聖方濟各|圣方济各|悉尼大學|悉尼大学|香港大學|香港大学|live Q&amp;A|live Q&A/i;
const dois=['10.1080/02602938.2024.2335321','10.1207/s15516709cog1803_3','10.1080/02602938.2024.2386662','10.14742/ajet.9434','10.1080/00405849909543834','10.26907/esd.17.2.04','10.3946/kjme.2024.310','10.37074/jalt.2025.8.2.15','10.25115/ejrep.v9i23.1428'];
for(const locale of ['','zh-hant/','zh-hans/']){
 const text=fs.readFileSync(path.join(root,locale,'posts',slug+'.html'),'utf8');const scoped=text.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,'');assert(!forbidden.test(scoped),locale+' article privacy');assert(!text.includes('{{references}}'));
 for(const doi of dois)assert(text.includes('https://doi.org/'+doi),doi);
 assert(text.includes('movement-science-presentation-qa.webp'));assert(text.includes('2026-10-19'));assert(text.includes('Tak Wing Yu'));
 const index=JSON.parse(fs.readFileSync(path.join(root,locale,'search-index.json'),'utf8'));const entry=index.find(e=>e.href.endsWith('/'+slug+'.html'));assert(entry);assert(!forbidden.test(JSON.stringify(entry)));
 assert(fs.readFileSync(path.join(root,locale,'feed.xml'),'utf8').includes(locale?'隨機':'Randomised')||locale==='zh-hans/');
}
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});let cases=0;try{
for(const width of [390,1440])for(const theme of ['light','dark'])for(const locale of ['','zh-hant/','zh-hans/']){
 const p=await browser.newPage({viewport:{width,height:900}});await p.addInitScript(t=>localStorage.setItem('portfolio-theme-v2',t),theme);let errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='review.test')return r.fulfill({body:''});const file=path.join(root,decodeURIComponent(u.pathname));return fs.existsSync(file)?r.fulfill({path:file}):r.fulfill({status:404,body:''});});
 await p.goto('http://review.test/'+locale+'posts/'+slug+'.html');await p.waitForTimeout(400);
 assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('html').getAttribute('data-theme'),theme);assert.equal(await p.locator('link[rel=canonical]').getAttribute('href'),'https://yutakwing.github.io/TakWing/'+locale+'posts/'+slug+'.html');
 const body=p.locator('.post-content');assert((await body.locator('h2').count())>=7);assert.equal(await body.locator('h3').count(),5);assert.equal(await body.locator('a[href^="https://doi.org/"]').count(),9);
 const img=p.locator('img[src*="movement-science-presentation-qa"]').first();assert(await img.evaluate(async i=>{await i.decode();return i.naturalWidth>0}));assert(/Illustrative|插圖|插图/.test(await img.getAttribute('alt')));
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);assert.deepEqual(errors,[]);
 await p.locator('.article-toc summary').click();const toc=p.locator('a[href^="#section-"]').first();assert(await toc.count());await toc.click();assert(new URL(p.url()).hash.startsWith('#section-'));
 const schema=await p.locator('script[type="application/ld+json"]').allTextContents();assert(schema.some(s=>s.includes('BlogPosting')&&s.includes('2026-10-19')));
 if(locale===''&&theme==='light')await p.screenshot({path:'/private/tmp/movement-revision-'+width+'.png'});
 cases++;await p.close();
}
console.log('PASS',cases,'article locale/viewport/theme cases; privacy, nine references, canonical, image, metadata, TOC and overflow');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
