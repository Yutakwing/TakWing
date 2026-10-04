import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const baseline='ac48d005d3dc5b736016c1c6700a879524a801e7';
const files=execFileSync('git',['diff',baseline,'--name-only'],{encoding:'utf8'}).trim().split('\n');
assert(!files.some(f=>/^(student|cloudflare|elbow-goniometry|ankle-goniometry|cardiorespiratory)\//.test(f)),'Existing student and game implementations preserved');
const translated=['can-you-hear-the-song-curse-of-knowledge-in-teaching','enough-about-catching-ai-a-practical-guide-to-using-it-for-learning','thinking-with-ai-not-just-about-ai','movement-science-assessment-redesign-for-generative-ai'];
for(const locale of ['','zh-hant/','zh-hans/']) {
 for(const name of ['index','about','teaching','research','media','cv','writing','resources','privacy','collaborate']){
  const h=fs.readFileSync(locale+name+'.html','utf8');assert(!h.includes('${portfolioUi'));assert(!h.includes('TRANSLATION REQUIRED'));assert(!h.includes('translation pending'));assert(!h.includes('1qY9iOUZitgWyMX93'));
 }
 const cv=fs.readFileSync(locale+'cv.html','utf8');assert(cv.includes('assets/tak-wing-yu-public-cv.pdf'));assert(!cv.includes('http-equiv="refresh"'));
 if(locale)for(const slug of translated){const html=fs.readFileSync(locale+'posts/'+slug+'.html','utf8');const body=html.split('<div class="post-content"')[1];assert((body.match(/[\u3400-\u9fff]/g)||[]).length>500,slug+' full translation');assert(!body.includes('translation pending'));}
 const research=fs.readFileSync(locale+'research.html','utf8');assert(research.includes('10.4102/hsag.v31i0.3286'));assert(research.includes('id="implementation-evidence"'));
}
const pub=JSON.parse(fs.readFileSync('data/public-cv.json','utf8'));const text=JSON.stringify(pub);assert(!/1qY9iOUZitg|2600856|78 sessions|52 roster|1,265|6,961/.test(text),'Application-specific and private evidence excluded from public CV');
console.log('PASS application evidence, private/public CV separation, eight complete Chinese article routes and protected student/game sources.');
