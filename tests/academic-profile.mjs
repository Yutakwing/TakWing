import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {talks,unverifiedTalks,academicCv,educatorResources,portfolioMetadata} from '../academic-profile.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const previous=f=>execFileSync('git',['show',`3c74632:${f}`],{cwd:root,encoding:'utf8',maxBuffer:5e6});
const schemas=h=>[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
assert.equal(talks.length,3);assert(talks.every(t=>t.source&&t.verification.startsWith('DELIVERY VERIFIED')));
assert(unverifiedTalks.every(t=>t.verification.startsWith('VERIFICATION REQUIRED')));
assert.equal(academicCv.href,null);assert(educatorResources.every(r=>r.href===null));
for(const file of ['robots.txt','sitemap.xml','feed.xml','zh-hant/feed.xml','zh-hans/feed.xml','google8c2878bc25812304.html','script.js','assets/contact-form.js','site-analytics.config.json','site-analytics.mjs','assets/js/site-analytics.js'])assert.equal(read(file),previous(file),file);
let count=0;
for(const locale of ['','zh-hant/','zh-hans/']){
 const media=read(locale+'media.html');assert.equal((media.match(/class="publication-card"/g)||[]).length,3);
 const instagram=s=>[...s.matchAll(/href="(https:\/\/www.instagram.com\/[^\"]+)"/g)].map(m=>m[1]);
 for(const href of instagram(previous(locale+'media.html')))assert(instagram(media).includes(href));
 for(const file of ['index.html','about.html','research.html','teaching.html','media.html','resources.html','collaborate.html','contact.html','writing.html',...fs.readdirSync(path.join(root,locale,'posts')).map(f=>'posts/'+f)]){
  const h=read(locale+file),old=previous(locale+file);
  assert.deepEqual(h.match(/<link rel="(?:canonical|alternate)"[^>]*>/g),old.match(/<link rel="(?:canonical|alternate)"[^>]*>/g),file);
  assert(!/<meta[^>]+name="robots"[^>]+noindex/.test(h),file);
  if(file.startsWith('posts/')){
   const bc=schemas(h).find(s=>s['@type']==='BreadcrumbList');assert(bc);assert.deepEqual(bc.itemListElement.map(x=>x.position),[1,2,3]);
   assert.equal(bc.itemListElement[2].item,'https://yutakwing.github.io/TakWing/'+locale+file);
   assert.equal(bc.itemListElement[1].item,'https://yutakwing.github.io/TakWing/'+locale+'writing.html');
   assert(h.includes('aria-current="page"'));assert.deepEqual(schemas(h).find(s=>s['@type']==='BlogPosting'),schemas(old).find(s=>s['@type']==='BlogPosting'));count++;
  }
 }
 assert(read(locale+'about.html').includes('Saint Francis University profile'));
}
for(const [page,[title,description]] of Object.entries(portfolioMetadata)){const html=read(page+'.html');assert(html.includes('<title>'+title+'</title>'));assert(html.includes(description));}
console.log(`PASS ${count} matching breadcrumb schemas; canonical/hreflang/indexability, feeds, verification, article schema, Instagram and protected integrations preserved.`);
