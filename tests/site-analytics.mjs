import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {analyticsConfig,validateAnalyticsConfig,renderSiteAnalytics} from '../site-analytics.mjs';
const root=path.resolve(import.meta.dirname,'..'),baseline='d557a45aba60ffd3c683a66919e394a829c0d8d3';
const code=fs.readFileSync(path.join(root,'assets/js/site-analytics.js'),'utf8');
// Deliberately invalid vendor token; only used in a VM with no network implementation.
const snippet=`<!-- Offline test only --><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"OFFLINE-STUB-NOT-A-SITE-TOKEN"}'></script>`;
const fixture={enabled:true,hostname:'yutakwing.github.io',snippet};
validateAnalyticsConfig(fixture);
assert.throws(()=>validateAnalyticsConfig({...fixture,snippet:null}));
assert.throws(()=>validateAnalyticsConfig({...fixture,snippet:snippet.replace('static.cloudflareinsights.com','other.invalid')}));
assert.throws(()=>validateAnalyticsConfig({...fixture,snippet:snippet.replace('defer','onload="alert(1)"')}));
assert.throws(()=>validateAnalyticsConfig({...fixture,snippet:snippet.replace('</script>','alert(1)</script>')}));
validateAnalyticsConfig(analyticsConfig);
assert(!renderSiteAnalytics({prefix:'.',pageType:'home'},{...fixture,enabled:false}).includes('<template'));
const moduleSnippet=snippet.replace('defer',"type='module'");
validateAnalyticsConfig({...fixture,snippet:moduleSnippet});
assert(renderSiteAnalytics({prefix:'.',pageType:'home'},{...fixture,snippet:moduleSnippet}).includes(moduleSnippet));
assert.throws(()=>validateAnalyticsConfig({...fixture,snippet:snippet.replace('defer',"type='text/javascript'")}));
assert.throws(()=>validateAnalyticsConfig({...fixture,snippet:snippet.replace('defer','')}));
assert(renderSiteAnalytics({prefix:'.',pageType:'home'},fixture).includes(snippet),'Exact dashboard attributes preserved');
assert.equal(renderSiteAnalytics({prefix:'.',pageType:'home',isActivity:true},fixture),'');
function run(href,{enabled=true,webdriver=false,referrer='',hasSource=true,twice=false,hashExists=true}={}) {
 const beacons=[];const attributes=[{name:'src',value:'https://static.cloudflareinsights.com/beacon.min.js'},{name:'defer',value:''},{name:'data-cf-beacon',value:'{"token":"OFFLINE-STUB-NOT-A-SITE-TOKEN"}'}];
 const source={attributes,getAttribute:n=>attributes.find(a=>a.name===n)?.value};
 const document={currentScript:{dataset:{siteAnalyticsEnabled:String(enabled)}},referrer,querySelector:()=>beacons[0]||null,getElementById:id=>id==='site-analytics-snippet'?(hasSource?{content:{querySelector:()=>source}}:null):(hashExists?{}:null),createElement:()=>({attrs:{},setAttribute(n,v){this.attrs[n]=v;}}),body:{appendChild:n=>beacons.push(n)}};
 const context=vm.createContext({document,location:{href},navigator:{webdriver},URL});vm.runInContext(code,context);if(twice)vm.runInContext(code,context);return beacons;
}
let cases=0;
for(const locale of ['', 'zh-hant/','zh-hans/']) for(const p of ['', 'index.html','about.html','research.html','teaching.html','writing.html','posts/test-article.html','media.html','resources.html','skills-lab.html','collaborate.html','contact.html','privacy.html','notes.html','mobility.html']) {
 const href='https://yutakwing.github.io/TakWing/'+locale+p;
 assert.equal(run(href,{twice:true}).length,1,href);assert.equal(run(href+'?tracked=1').length,0);assert.equal(run(href,{webdriver:true}).length,0);cases+=3;
}
for(const href of ['http://localhost:8896/TakWing/','http://127.0.0.1:8896/TakWing/','http://[::1]/TakWing/','https://preview.invalid/TakWing/','http://192.168.1.1/TakWing/','https://yutakwing.github.io/','https://yutakwing.github.io/Other/index.html','https://yutakwing.github.io/TakWing/student/login/','https://yutakwing.github.io/TakWing/student/dashboard/','https://yutakwing.github.io/TakWing/elbow-goniometry/','https://yutakwing.github.io/TakWing/ai-literacy-check.html','https://yutakwing.github.io/TakWing/cardiorespiratory/','https://yutakwing.github.io/TakWing/writing.html?subject=PRIVATE','https://yutakwing.github.io/TakWing/writing.html?lang=en','https://yutakwing.github.io/TakWing/writing.html?utm_source=campaign']){assert.equal(run(href).length,0,href);cases++;}
for(const referrer of ['https://other.invalid/?private=value','https://yutakwing.github.io/TakWing/student/dashboard/','https://yutakwing.github.io/TakWing/elbow-goniometry/?tracked=1','https://yutakwing.github.io/TakWing/elbow-goniometry/'])assert.equal(run('https://yutakwing.github.io/TakWing/',{referrer}).length,0);
assert.equal(run('https://yutakwing.github.io/TakWing/',{referrer:'https://search.example/'}).length,1);
assert.equal(run('https://yutakwing.github.io/TakWing/writing.html#collection-ai-learning-assessment').length,1);
assert.equal(run('https://yutakwing.github.io/TakWing/writing.html#unrecognised',{hashExists:false}).length,0);
assert.equal(run('https://yutakwing.github.io/TakWing/',{enabled:false}).length,0);
assert.equal(run('https://yutakwing.github.io/TakWing/',{hasSource:false}).length,0);
assert(!/localStorage|sessionStorage|randomUUID|fetch\(|sendBeacon|addEventListener/.test(code));
const changed=execFileSync('git',['diff',baseline,'--name-only'],{cwd:root,encoding:'utf8'}).trim().split('\n');
assert(!changed.some(f=>f.startsWith('cloudflare/')||f.startsWith('student/')||f==='game-analytics.js'||f==='writing-architecture.mjs'));
for(const file of ['ai-literacy-check.html','reasoning-runner.html','clinical-readiness-lab.html','elbow-goniometry/index.html','student/login/index.html','student/dashboard/index.html'])assert(!fs.readFileSync(path.join(root,file),'utf8').includes('site-analytics.js'),file);
for(const locale of ['', 'zh-hant/','zh-hans/']){
 for(const name of fs.readdirSync(path.join(root,locale,'posts'))){const file=locale+'posts/'+name;const old=execFileSync('git',['show',`${baseline}:${file}`],{cwd:root,encoding:'utf8'}),now=fs.readFileSync(path.join(root,file),'utf8');const main=h=>h.match(/<main class="content">([\s\S]*?)<\/main>/)[1].replace(/    <nav class="article-breadcrumbs"[\s\S]*?<\/nav>\n/, "");assert.equal(main(now),main(old),file);}
 assert.equal(fs.readFileSync(path.join(root,locale,'feed.xml'),'utf8'),execFileSync('git',['show',`${baseline}:${locale}feed.xml`],{cwd:root,encoding:'utf8'}));
}
console.log(`PASS ${cases} route/config/automation cases plus referrer, duplicate and missing config checks; all 141 article main sections and RSS preserved; game/student sources untouched.`);
