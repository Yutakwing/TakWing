import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readCaseContext } from '../mobility/case-context.mjs';
import { mobilityLab } from '../mobility-lab-content.mjs';
assert.deepEqual(readCaseContext(), {});
assert.deepEqual(readCaseContext(new URLSearchParams('case_id=demo-case&phase=practice&task_id=demo-task&tracked=1')), {case_id:'demo-case',phase:'practice',task_id:'demo-task'});
for (const key of ['case_id','phase','task_id']) {
 assert.deepEqual(readCaseContext(new URLSearchParams(`${key}=standalone`)), {[key]:'standalone'});
 for (const value of ['', '<script>', 'a b', 'x'.repeat(65)]) assert.deepEqual(readCaseContext(new URLSearchParams({[key]:value})), {});
 assert.deepEqual(readCaseContext(new URLSearchParams(`${key}=one&${key}=two`)), {});
}
assert(Object.isFrozen(readCaseContext()));
assert.equal(mobilityLab.activities.length,6);
assert(mobilityLab.activities.every(a=>a.status==='In development'&&!a.href&&!a.url));
const config=JSON.parse(fs.readFileSync(new URL('../mobility/clinical-config.json',import.meta.url)));
for(const record of [...Object.values(config.clinical_configuration),config.scoring]) {
 assert.equal(record.verification,'LECTURER VERIFICATION REQUIRED');
 assert(Object.entries(record).every(([k,v])=>k==='verification'||v===null));
}
const sql=fs.readFileSync(new URL('../cloudflare/seed-games.sql',import.meta.url),'utf8');
for(const a of mobilityLab.activities)assert(!sql.includes(`'${a.id}'`));
for(const locale of ['', 'zh-hant/', 'zh-hans/']){
 const page=fs.readFileSync(new URL('../'+locale+'mobility.html',import.meta.url),'utf8');
 assert.equal((page.match(/data-mobility-proposal=/g)||[]).length,6);
 for(const card of page.matchAll(/<article data-mobility-proposal=[\s\S]*?<\/article>/g)) {assert(card[0].includes('In development'));assert(!/<a\b|<button\b|tabindex=/.test(card[0]));}
 assert(!page.includes('progress-client.js'));assert(!page.includes('case-context.mjs'));assert(!page.includes('zapier-skills-tutor.js'));
 const entry=JSON.parse(fs.readFileSync(new URL('../'+locale+'search-index.json',import.meta.url))).find(e=>e.href==='./mobility.html');assert.equal(entry.category,'In development');
}
console.log('PASS optional/invalid/duplicate case context, null verification configuration, six inert cards, no game registration and development search metadata.');
