const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../assets/contact-form.js'),'utf8');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
for(const width of [390,1280]) for(const locale of ['', 'zh-hant/', 'zh-hans/']){
 const page=await browser.newPage({viewport:{width,height:844}});let calls=0;let mode='activation';
 await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({status:200,body:''}));
 await page.goto('http://127.0.0.1:4201/'+locale+'contact.html');
 assert.equal(await page.locator('[data-contact-form]').count(),1);
 await page.route('**/assets/contact-form.js*',r=>r.fulfill({contentType:'application/javascript',body:source.replace('https://formsubmit.co/ajax/yutakwing001@gmail.com', '/contact-test')}));
 await page.route('**/contact-test',async r=>{calls++;const data=r.request().postDataJSON();assert.equal(data.email,'visitor@example.org');assert(!('user_id'in data));await r.fulfill({status:mode==='failure'?503:200,contentType:'application/json',body:JSON.stringify({success:mode==='failure'?false:'true',message:mode==='activation'?'Please activate your form':'Form successfully submitted'})});});
 await page.goto('http://127.0.0.1:4201/'+locale+'contact.html?subject=Workshop#contact-form');
 assert.equal(await page.locator('[data-contact-form] [name=subject]').inputValue(),'Workshop');
 assert.equal(await page.locator('[data-contact-email]').getAttribute('href'),'mailto:yutakwing001@gmail.com?subject=Workshop');
 assert(await page.locator('[data-contact-email]').isVisible());
 await page.locator('[data-contact-form] [name=name]').fill('Test visitor');await page.locator('[data-contact-form] [name=email]').fill('visitor@example.org');await page.locator('[data-contact-form] [name=message]').fill('This is a local test message only.');
 await page.locator('[data-contact-form] button').click();await page.locator('[data-state=error]').waitFor();assert.equal(await page.locator('[data-contact-form] [name=message]').inputValue(),'This is a local test message only.');
 mode='failure';await page.locator('[data-contact-form] button').click();await page.locator('[data-state=error]').waitFor();assert.equal(await page.locator('[data-contact-form] [name=message]').inputValue(),'This is a local test message only.');
 mode='success';await page.locator('[data-contact-form] button').click();await page.locator('[data-state=success]').waitFor();assert.equal(calls,3);assert.equal(await page.locator('[data-contact-form] [name=message]').inputValue(),'');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
 await page.screenshot({path:'/private/tmp/contact-'+(locale.replace('/','')||'en')+'.png',fullPage:true});console.log('PASS',width,locale||'en','prefill, error retention, confirmed success, mobile layout; mocked delivery only');await page.close();
}
}finally{await browser.close();}})();
