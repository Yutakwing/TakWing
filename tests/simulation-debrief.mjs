import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {debriefSlug,debriefMeta} from '../simulation-debrief-content.mjs';
const root=path.resolve(import.meta.dirname,'..');
const baseline=process.env.SIMULATION_BASELINE||'60b882fe3ab72c9b05198c59bef490bc8f08f7a8';
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const old=f=>execFileSync('git',['show',`${baseline}:${f}`],{cwd:root,encoding:'utf8',maxBuffer:10e6});
const body=html=>{const start=html.indexOf('<div class="post-content"');assert(start>=0);const re=/<\/?div\b[^>]*>/g;re.lastIndex=start;let depth=0,m;while(m=re.exec(html)){depth+=m[0].startsWith('</')?-1:1;if(depth===0)return html.slice(start,m.index+m[0].length);}throw Error('Unclosed article');};
let preserved=0;
for(const locale of ['','zh-hant/','zh-hans/']){
 const key=locale.slice(0,-1)||'en';const file=locale+'posts/'+debriefSlug+'.html';const html=read(file);
 assert(html.includes(debriefMeta[key].title));assert(html.includes('cardio-ii-simulation-15-october-2026.jpg'));assert(html.includes('width="1600" height="1200"'));assert(!html.includes('/Users/'));assert(!html.includes('obsidian://'));
 const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(x=>x['@type']==='BlogPosting');assert(schema);assert(schema.datePublished.startsWith('2026-10-15'));
 const oldFiles=execFileSync('git',['ls-tree','--name-only',`${baseline}:${locale}posts`],{cwd:root,encoding:'utf8'}).trim().split('\n');
 for(const name of oldFiles){assert.equal(body(read(locale+'posts/'+name)),body(old(locale+'posts/'+name)),name);preserved++;}
 const feed=read(locale+'feed.xml');assert(feed.includes(debriefSlug));const items=s=>s.match(/<item>[\s\S]*?<\/item>/g)||[];assert.deepEqual(items(feed).filter(x=>!x.includes(debriefSlug)),items(old(locale+'feed.xml')));
 for(const f of ['index.html','writing.html','search-index.json'])assert(read(locale+f).includes(debriefSlug),locale+f);
 assert(read('sitemap.xml').includes(file));
}
for(const f of ['assets/tak-wing-yu-public-cv.pdf','data/public-cv.json','tools/build-public-cv.py'])assert(!fs.existsSync(path.join(root,f)));
const protectedPaths=execFileSync('git',['diff','--name-only',baseline,'--','cloudflare','student'],{cwd:root,encoding:'utf8'});assert.equal(protectedPaths,'');
console.log(`PASS: three simulation articles; ${preserved} previous article bodies and all previous feed items preserved; discovery/schema/image registration and CV removal retained; student/backend files unchanged.`);
