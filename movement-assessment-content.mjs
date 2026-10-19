import fs from 'node:fs';
const base='./article-sources/Movement_Science_AI_Assessment_Redesign';
const english=fs.readFileSync(new URL(base+'.md',import.meta.url),'utf8');
const references=english.split('## References\n')[1].split('\nBibliographic note:')[0].trim();
const inline=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/https:\/\/[^\s<]+/g,url=>`<a href="${url}">${url}</a>`);
function render(source){
 const text=source.replace(/^---\n[\s\S]*?\n---\n/,'');
 return text.trim().split(/\n\s*\n/).filter(b=>!b.startsWith('# ')).map(b=>{
  if(b.startsWith('### '))return `<h3>${inline(b.slice(4))}</h3>`;
  if(b.startsWith('## '))return `<h2>${inline(b.slice(3))}</h2>`;
  if(b.startsWith('> '))return `<blockquote><p>${inline(b.slice(2))}</p></blockquote>`;
  if(b.startsWith('- '))return '<ul>'+b.split('\n').map(l=>`<li>${inline(l.slice(2))}</li>`).join('')+'</ul>';
  if(/^\d+\. /.test(b))return '<ol>'+b.split('\n').map(l=>`<li>${inline(l.replace(/^\d+\. /,''))}</li>`).join('')+'</ol>';
  return `<p>${inline(b.replaceAll('\n',' '))}</p>`;
 }).join('\n');
}
export const movementAssessmentBodies=Object.fromEntries(['en','zh-hant','zh-hans'].map(locale=>{
 const source=locale==='en'?english:fs.readFileSync(new URL(base+'.'+locale+'.md',import.meta.url),'utf8').replace('{{references}}',references);
 return [locale,render(source)];
}));
export const movementAssessmentMeta={
 en:{title:'Why I Allowed AI but Added a Randomised Group Viva in Movement Science',summary:'Why I allowed AI during preparation but added a structured randomised group viva to make shared understanding, individual accountability and biomechanical reasoning more visible.',alt:'Illustrative classroom scene showing a group presentation followed by oral questioning; no real participants are depicted.',caption:'Illustrative scene representing a group presentation and viva defence.'},
 'zh-hant':{title:'為何我容許使用人工智能，卻在動作科學加入隨機抽選的小組答辯',summary:'我容許在準備時使用人工智能，並加入結構化隨機小組答辯，讓共同理解、個人責任與生物力學推理更清晰可見。',alt:'以插圖呈現小組匯報後接受口頭提問的課堂情境，並非真實參與者。',caption:'代表小組匯報與口頭答辯的示意插圖。'},
 'zh-hans':{title:'为何我允许使用人工智能，却在动作科学加入随机抽选的小组答辩',summary:'我允许在准备时使用人工智能，并加入结构化随机小组答辩，让共同理解、个人责任与生物力学推理更清晰可见。',alt:'以插图呈现小组汇报后接受口头提问的课堂情境，并非真实参与者。',caption:'代表小组汇报与口头答辩的示意插图。'}
};
