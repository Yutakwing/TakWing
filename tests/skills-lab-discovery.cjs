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
   const labName=locale==='zh-hant/'?'技能實驗室':locale==='zh-hans/'?'技能实验室':'Skills Lab';
   const loginName=locale==='zh-hant/'?'學生登入':locale==='zh-hans/'?'学生登录':'Student Login';
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
     assert.match(await page.locator('#mobility').innerText(),locale === 'zh-hant/' ? /開發中/ : locale === 'zh-hans/' ? /开发中/ : /In development/i);
     if(locale) { assert.equal(await page.locator('.translation-note').count(),0); assert.match(await page.locator('h1').innerText(), /技能實驗室|技能实验室/); }
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1),false,`${locale} ${width} overflow`);
     if(width<=1200){
      const toggle=page.locator('.menu-toggle');await toggle.focus();await page.keyboard.press('Enter');
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      assert(await page.locator('.close-menu').evaluate(e=>e===document.activeElement));
      const menu=page.locator('.mobile-panel');
      const skill=menu.getByRole('link',{name:labName,exact:true});assert.equal(await skill.getAttribute('aria-current'),'page');
      assert.equal(await menu.locator('.language-selector a').count(),3);
      const login=menu.getByRole('link',{name:loginName,exact:true});await login.focus();
      assert(await login.evaluate(e=>e===document.activeElement));
      await page.keyboard.press('Tab');assert(await page.locator('.close-menu').evaluate(e=>e===document.activeElement));
      await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert(await toggle.evaluate(e=>e===document.activeElement));
     }else{
      assert(await page.locator('.top-nav').isVisible());
      assert.equal(await page.locator('.top-nav a').count(),9);
      assert(await page.locator('.header-actions .student-login-link').isVisible());
      assert.equal(await page.locator('.top-nav [aria-current="page"]').innerText(),labName);
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
   await page.setViewportSize({width:390,height:768});
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
  console.log(`PASS ${cases} Skills Lab locale/viewport/theme cases, entry pages at four widths, 15 activity paths, keyboard menu and student entry.`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
