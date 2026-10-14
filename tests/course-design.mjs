import assert from 'node:assert/strict';
import fs from 'node:fs';
import {canvasQuestions,assessmentParts,rubricDimensions} from '../course-design.mjs';
import {courseModules} from '../courses-content.mjs';
assert.equal(courseModules.length,10);assert.equal(canvasQuestions.length,10);assert.equal(rubricDimensions.length,5);assert.equal(assessmentParts.reduce((s,x)=>s+x[1],0),100);
const page=fs.readFileSync(new URL('../course-applied-ai-allied-health.html',import.meta.url),'utf8');
for(const id of ['course-scope','modalities','canvas','build-decision','assessment','capstone-rubric','data-quality-lab','preparation','extension','sandbox'])assert(page.includes(`id="${id}"`),id);
for(let i=1;i<=10;i++)assert(page.includes(`id="canvas-${i}"`));
assert.equal((page.match(/class="course-canvas-link"/g)||[]).length,10);
for(const phrase of ['Version 0.1 — Course development draft','PROPOSED ASSESSMENT MODEL','OPTIONAL / ADVANCED','PLANNED','A smoother signal is not automatically a more accurate signal.','Working code ≠ valid measurement ≠ useful clinical tool.'])assert(page.includes(phrase));
if(process.env.COURSES_BASELINE){
const previous=JSON.parse(fs.readFileSync(process.env.COURSES_BASELINE+'/manifest.json','utf8'));
for(const f of Object.keys(previous).filter(x=>x.startsWith('student/')||x.startsWith('cloudflare/'))){assert.deepEqual(fs.readFileSync(new URL('../'+f,import.meta.url)),fs.readFileSync(process.env.COURSES_BASELINE+'/'+f));}
}
console.log('PASS: 10 core modules, 10 Canvas questions and module links, 100% draft assessment, five rubric dimensions, planned labels.');

if(process.env.COURSES_BASELINE) console.log('PASS: backend/student files match the supplied baseline.');
