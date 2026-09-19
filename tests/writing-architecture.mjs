// Source/integrity regression: run from any working directory. Baseline is the pre-Phase-10 release.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {collections,writingMetadata,articleContents,freshnessMarkup} from '../writing-architecture.mjs';
const root=path.resolve(import.meta.dirname,'..');
const baseline=process.env.WRITING_BASELINE || 'a4b8f056c3a5a45983009c7f4fad8caed7daf28f';
const original=f=>execFileSync('git',['show',`${baseline}:${f}`],{cwd:root,encoding:'utf8',maxBuffer:10e6});
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const postBody=html=>{
 const start=html.indexOf('<div class="post-content"'); assert(start>=0);
 const tags=/<\/?div\b[^>]*>/g;tags.lastIndex=start;let depth=0,m;
 while(m=tags.exec(html)){depth+=m[0].startsWith('</')?-1:1;if(depth===0)return html.slice(start,m.index+m[0].length);}
 throw new Error('Unclosed body');
};
const normalise=body=>body.replace(/(<h2\b[^>]*?) id="section-[^"]*"/g,'$1');
const schemas=html=>[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(x=>x['@type']==='BlogPosting');
let articles=0,tocs=0,connections=0;
for(const locale of ['','zh-hant/','zh-hans/']) {
 const files=fs.readdirSync(path.join(root,locale,'posts')).sort();
 const oldFiles=execFileSync('git',['ls-tree','--name-only',`${baseline}:${locale}posts`],{cwd:root,encoding:'utf8'}).trim().split('\n').sort();assert.deepEqual(files,oldFiles);
 const search=JSON.parse(read(locale+'search-index.json'));
 assert.equal(search.filter(e=>e.category==='Writing collection').length,4);
 assert.equal((read(locale+'feed.xml').match(/<item>/g)||[]).length,47);
 assert.equal(read(locale+'feed.xml'),original(locale+'feed.xml'),'Feed dates/content preserved');
 const writing=read(locale+'writing.html');
 for(const c of collections) assert(writing.includes(`id="collection-${c.id}"`));
 assert(writing.includes('Complete chronological archive · 47 articles'));
 if(locale) assert(writing.includes('TRANSLATION REQUIRED'));
 for(const name of files) {
  const file=locale+'posts/'+name,html=read(file),before=original(file);
  assert.equal(normalise(postBody(html)),normalise(postBody(before)),`Body preserved ${file}`);
  const oldSchema=schemas(before),newSchema=schemas(html);for(const key of Object.keys(oldSchema))assert.deepEqual(newSchema[key],oldSchema[key],`${file} ${key}`);
  for(const property of ['og:title','og:url','og:image','og:description']) {
   const re=new RegExp(`<meta property="${property}"[^>]+>`);assert.equal(html.match(re)?.[0],before.match(re)?.[0],property);
  }
  const entry=search.find(e=>e.href==='./posts/'+name);assert(entry);assert(entry.content.includes(newSchema.genre.toLowerCase())||entry.content.includes(newSchema.genre));
  assert(html.includes('class="article-collections"'));assert(html.includes('class="continue-exploring"'));assert(html.includes('class="post-sequence"'));assert(!html.includes('class="writing-freshness"'),'No fabricated freshness');
  const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,file);
  const toc=html.match(/<details class="article-toc"[\s\S]*?<\/details>/)?.[0];if(toc){tocs++;for(const m of toc.matchAll(/href="#([^"]+)"/g))assert(ids.includes(m[1]),file+' '+m[1]);}
  connections+=(html.match(/class="writing-connection"/g)||[]).length;articles++;
 }
}
// Phase 11 adds only the three public Privacy routes; Writing URLs remain unchanged.
assert.equal(read('sitemap.xml').replace(/^  <url><loc>https:\/\/yutakwing\.github\.io\/TakWing\/(?:zh-hant\/|zh-hans\/)?privacy\.html<\/loc><\/url>\n/gm, ''),original('sitemap.xml'));
// Test threshold, short notes, duplicate headings, pre-existing IDs and author text integrity.
const fixture='<div id="section-repeat"></div><h2>Repeat</h2><h2 id="kept">Fixed</h2><h2>Repeat</h2><h2>Fourth</h2><h2>References</h2>';
const result=articleContents(fixture);assert(result.toc);assert.deepEqual(result.headings.map(h=>h.id),['section-repeat-2','kept','section-repeat-3','section-fourth']);assert.equal(articleContents(fixture,{shortNote:true}).toc,'');assert.equal(articleContents('<h2>A</h2><h2>B</h2><h2>C</h2><h2>References</h2>').toc,'');assert.equal(articleContents(result.html).html,result.html);
assert.equal(freshnessMarkup({}),'');assert.match(freshnessMarkup({sourceReviewDate:'2026-09-17',editorialUpdated:'2026-09-18'}),/Sources reviewed/);assert.throws(()=>freshnessMarkup({sourceReviewDate:'2026-02-30'}));
assert.equal(Object.keys(writingMetadata).length,47);
console.log(`PASS: ${articles} preserved bodies/URLs/SEO records; ${tocs} TOCs; ${connections} curated components; three unchanged feeds; search, sitemap and TOC/freshness edge cases.`);
