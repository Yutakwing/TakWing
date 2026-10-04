import fs from 'node:fs';
const dictionaries=Object.fromEntries(['zh-hant','zh-hans'].map(locale=>[locale,JSON.parse(fs.readFileSync(new URL(`./data/editorial-${locale}.json`,import.meta.url),'utf8'))]));
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&#x27;',"'").replaceAll('&nbsp;',' ');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function translateEditorial(html,locale){
 const dict=dictionaries[locale];if(!dict)return html;
 return html.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>)/gi).map(part=>{
  if(part.startsWith('<'))return part;
  const text=decode(part.trim());let translated=dict[text];
  const collection=text.match(/^All (\d+) articles in this collection$/);
  if(collection)translated=locale==='zh-hant'?`此文集共${collection[1]}篇文章`:`此文集共${collection[1]}篇文章`;
  const archive=text.match(/^Complete chronological archive · (\d+) articles$/);
  if(archive)translated=locale==='zh-hant'?`完整時間序文章目錄 · ${archive[1]}篇文章`:`完整时间序文章目录 · ${archive[1]}篇文章`;
  if(translated===undefined)return part;
  return part.replace(part.trim(),`<span lang="${locale==='zh-hant'?'zh-Hant':'zh-Hans'}">${escape(translated)}</span>`);
 }).join('');
}
