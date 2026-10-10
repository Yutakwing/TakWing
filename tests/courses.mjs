import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {courseModules,courseFile,courseTitle,technologies} from '../courses-content.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const routes=['courses',courseFile];
assert.equal(courseModules.length,10);
assert.equal(technologies.length,9);
for(const locale of ['','zh-hant/','zh-hans/']) {
 for(const route of routes){
  const html=read(locale+route+'.html');assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
  assert(html.includes('IN DEVELOPMENT'));assert(!/<img\b|<iframe\b/.test(html));
  assert(html.includes(`https://yutakwing.github.io/TakWing/${locale}${route}.html`));
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));assert.equal(schemas[0]['@type'],'WebPage');assert(!schemas[0].offers);assert(!schemas[0].hasCourseInstance);
  for(const target of ['','zh-hant/','zh-hans/'])assert(html.includes(`hreflang="${target==='zh-hant/'?'zh-Hant':target==='zh-hans/'?'zh-Hans':'en'}" href="https://yutakwing.github.io/TakWing/${target}${route}.html"`));
  assert(read('sitemap.xml').includes(`/TakWing/${locale}${route}.html`));
  if(locale){assert(/正在準備中|正在准备中/.test(html));assert(html.includes(`../${route}.html`));assert(!html.includes('course-modules'));}
 }
 const index=JSON.parse(read(locale+'search-index.json'));for(const route of routes)assert(index.some(x=>x.href===`./${route}.html`));
 const entry=index.find(x=>x.href===`./${courseFile}.html`);for(const term of ['AI','course','computer vision','allied health','MediaPipe','OpenCV','OpenSim','clinical AI','movement analysis'])assert((entry.title+' '+entry.content).toLowerCase().includes(term.toLowerCase()));
 const home=read(locale+'index.html');assert.equal((home.match(/class="course-home-teaser"/g)||[]).length,1);assert(!home.includes('course-modules'));
 for(const f of ['research','teaching','collaborate'])assert(read(locale+f+'.html').includes('course-context-link'));
}
const detail=read(courseFile+'.html');for(const m of courseModules)assert(detail.includes(m.title));assert(detail.includes('A working prototype is not the same as a validated clinical tool.'));assert(detail.includes('33 body landmarks'));assert(detail.includes('patient data requires formal approval'));assert(detail.includes('Result credibility is bounded by input data quality.'));assert(!detail.includes('Nan-Ying'));
assert(!/enrol now|registration open|CPD approved|buy now|testimonials/i.test(detail));
const css=read('assets/css/courses.css');assert(css.includes('@media (max-width: 650px)'));assert(!read('about.html').includes('assets/css/courses.css'));
if(process.env.COURSES_BASELINE){
 const base=process.env.COURSES_BASELINE;
 const manifest=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'),'utf8'));
 for(const file of Object.keys(manifest).filter(x=>/^(posts|zh-hant\/posts|zh-hans\/posts)\/.+\.html$/.test(x))){const body=s=>s.split('<div class="post-content"')[1]?.split('</article>')[0];assert.equal(body(read(file)),body(fs.readFileSync(path.join(base,file),'utf8')),file+' article preserved');}
 for(const file of ['article-content.mjs','ai-recorder-article-content.mjs','feed.xml','zh-hant/feed.xml','zh-hans/feed.xml','script.js','assets/contact-form.js'])assert.equal(read(file),fs.readFileSync(path.join(base,file),'utf8'),file+' unrelated work preserved');
}
console.log('PASS: six course routes, ten modules, all search terms, status/schema, reciprocal hreflang, contextual links, originality safeguards and supplied baseline preservation.');
