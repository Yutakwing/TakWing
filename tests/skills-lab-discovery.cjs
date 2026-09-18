const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const base = process.env.SKILLS_BASE_URL || 'http://127.0.0.1:8896/TakWing/';
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 let cases = 0;
 try {
  for (const locale of ['', 'zh-hant/', 'zh-hans/']) {
   const context = await browser.newContext();
   await context.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.fulfill({body:''}));
   const page = await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   for (const width of [390,768,1024,1440]) {
    await page.setViewportSize({width,height:850});
    for (const theme of ['light','dark']) {
     await page.goto(base + locale + 'skills-lab.html');
     await page.evaluate(theme=>{localStorage.setItem('portfolio-theme-v2',theme);document.documentElement.dataset.theme=theme},theme);
     assert.equal(await page.locator('[data-skills-activity]').count(),15);
     assert.equal(await page.locator('#mobility a').count(),1);assert.match(await page.locator('#mobility a').getAttribute('href'),/mobility\.html$/);assert.equal(await page.locator('#mobility [data-skills-activity]').count(),0);
     assert.match(await page.locator('#mobility').innerText(),/In development/i);
     if(locale) assert.match(await page.locator('.translation-note').innerText(),/TRANSLATION REQUIRED/);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1),false,`${locale} ${width} overflow`);
     if(width<=1200){
      const toggle=page.locator('.menu-toggle');await toggle.focus();await page.keyboard.press('Enter');
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      assert(await page.locator('.close-menu').evaluate(e=>e===document.activeElement));
      const menu=page.locator('.mobile-panel');
      const skill=menu.getByRole('link',{name:'Skills Lab',exact:true});assert.equal(await skill.getAttribute('aria-current'),'page');
      assert.equal(await menu.locator('.language-selector a').count(),3);
      const login=menu.getByRole('link',{name:'Student Login',exact:true});await login.focus();
      assert(await login.evaluate(e=>e===document.activeElement));
      await page.keyboard.press('Tab');assert(await page.locator('.close-menu').evaluate(e=>e===document.activeElement));
      await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert(await toggle.evaluate(e=>e===document.activeElement));
     }else{
      assert(await page.locator('.top-nav').isVisible());
      assert.equal(await page.locator('.top-nav a').count(),9);
      assert(await page.locator('.header-actions .student-login-link').isVisible());
      assert.equal(await page.locator('.top-nav [aria-current="page"]').innerText(),'Skills Lab');
     }
     for(const href of await page.locator('[data-skills-activity], .skills-access a, .skills-category > a').evaluateAll(a=>a.map(x=>x.href))){
      assert(new URL(href).pathname.startsWith(new URL(base).pathname));
      assert.equal((await context.request.get(href)).status(),200,href);
      assert(!new URL(href).searchParams.has('tracked'));
     }
     if(!locale && theme==='light')await page.screenshot({path:`/tmp/skills-lab-${width}.png`,fullPage:true});
     cases++;
    }
    for (const name of ['index','teaching','resources','writing','media']) {
     await page.goto(base+locale+name+'.html');
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1),false,`${locale}${name} ${width} overflow`);
     if(['index','teaching','resources'].includes(name))assert(await page.locator('main a[href$="skills-lab.html"]').count()>0);
    }
   }
   // Follow the student entry point with the keyboard; do not submit credentials.
   await page.setViewportSize({width:1024,height:768});
   await page.goto(base+locale+'skills-lab.html');
   await page.locator('.menu-toggle').click();
   await page.locator('.mobile-panel .student-login-link').focus();
   await page.keyboard.press('Enter');
   await page.waitForURL('**/student/login/');
   assert(await page.locator('input[name="username"]').isVisible());
   await page.goto(base+locale+'skills-lab.html');
   await page.locator('.menu-toggle').click();
   await page.locator('.mobile-panel .language-selector a[hreflang="zh-Hant"]').click();
   await page.waitForURL('**/zh-hant/skills-lab.html');
   const index=JSON.parse(fs.readFileSync(locale+'search-index.json','utf8'));assert(index.some(x=>x.href==='./skills-lab.html'));
   assert.deepEqual(errors,[]);await context.close();
  }
  // Shared-shell generation must not change existing game or article main content.
  for(const file of execFileSync('git',['diff','--name-only'],{encoding:'utf8'}).trim().split('\n').filter(f=>f.endsWith('.html')&&!/(^|\/)(index|resources|teaching|skills-lab)\.html$/.test(f))){
   const old=execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'}), now=fs.readFileSync(file,'utf8');
   // Phase 8 approved lossless-layout delivery-format changes only.
   const body=s=>s.match(/<main class="content">([\s\S]*?)<\/main>/)?.[1]?.replace(/(thinking-with-ai-conference|movement-science-presentation-qa)\.(png|webp)/g,'$1.IMAGE');assert.equal(body(now),body(old),file+' main content');
  }
  console.log(`PASS ${cases} Skills Lab locale/viewport/theme cases, entry pages at four widths, 15 activity paths, keyboard menu and unchanged existing main content.`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
