// Profile destinations are supplied by portfolio-content.mjs; no tracking embeds.
const pick=(locale,en,hant,hans)=>locale==='zh-hant'?hant:locale==='zh-hans'?hans:en;
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function profileConnections(profile,locale,context='home') {
 const labels={
 linkedIn:pick(locale,'Connect on LinkedIn','在 LinkedIn 聯繫','在 LinkedIn 联系'),
 orcid:pick(locale,'Research identity on ORCID','ORCID 研究者檔案','ORCID 研究者档案'),
 googleScholar:pick(locale,'Publications on Google Scholar','Google Scholar 學術出版','Google Scholar 学术出版'),
 instagram:pick(locale,'Teaching updates on Instagram','Instagram 教學動態','Instagram 教学动态'),
 staffProfile:pick(locale,'University staff profile','大學教職員簡介','大学教职员简介')};
 const keys={home:['linkedIn','orcid'],about:['staffProfile','linkedIn','orcid','googleScholar','instagram'],research:['googleScholar','orcid'],publications:['googleScholar','orcid'],media:['instagram','linkedIn'],contact:['linkedIn','instagram'],article:['linkedIn','orcid']}[context];
 if(!keys)throw new Error('Unknown profile context');
 const title=pick(locale,'Connect and explore','聯繫與探索','联系与探索');
 return `<nav class="profile-connections" aria-label="${title}">${keys.filter(k=>profile.sameAs[k]).map(k=>`<a href="${esc(profile.sameAs[k])}">${labels[k]} <span aria-hidden="true">↗</span></a>`).join('')}</nav>`;
}
const cases={
 'vr-acupuncture':{
  href:'./teaching.html#technology-learning',
  link:['Explore the learning design','探索學習設計','探索学习设计'],
  artefact:['The teaching page explains the curriculum and learning design. The VR application itself is not offered as a public download here.','教學頁介紹課程與學習設計。本網站不提供此虛擬實境應用程式的公開下載。','教学页介绍课程与学习设计。本网站不提供此虚拟现实应用程序的公开下载。'],
  limits:['Implementation and learner use are evidence of delivery, not proof of improved clinical competence. Evaluation and curriculum refinement continue.','已實施及有學習者使用，屬於實施證據，並不能證明臨床能力有所提升。評估與課程改進仍在進行。','已实施及有学习者使用，属于实施证据，并不能证明临床能力有所提升。评估与课程改进仍在进行。']},
 'reasoning-chatbot':{
  href:'./posts/ai-should-be-a-thinking-partner-not-a-clinical-shortcut.html',
  link:['Read the reasoning-first approach','閱讀以推理為先的方法','阅读以推理为先的方法'],
  artefact:['The linked reflection explains the reasoning-first approach. It is not a report of a completed effectiveness study or access to the research pilot.','連結文章介紹以推理為先的方法，並非已完成的成效研究報告，也不是研究試行系統的入口。','链接文章介绍以推理为先的方法，并非已完成的成效研究报告，也不是研究试行系统的入口。'],
  limits:['The research pilot is in development. The public Skills Lab tutor is a separate service; its availability does not establish the pilot’s effectiveness.','研究試行仍在發展。公開技能實驗室的導師屬另一項服務；該服務可用並不代表研究試行已證實有效。','研究试行仍在发展。公开技能实验室的导师属于另一项服务；该服务可用并不代表研究试行已证实有效。']},
 'simulation-role-rotation':{
  href:'./posts/the-clinician-is-not-the-only-learner-what-role-rotation-adds-to-simulation.html',
  link:['Read about the role-rotation design','閱讀角色輪替設計','阅读角色轮替设计'],
  artefact:['The linked practice reflection introduces the Learner, Peer Patient, Observer and Peer Debriefer roles. Student records and unpublished research data are not shared.','連結的實務反思介紹學習者、同儕病人、觀察者及同儕反思引導者角色。不公開學生紀錄或未發表的研究資料。','链接的实践反思介绍学习者、同侪病人、观察者及同侪反思引导者角色。不公开学生记录或未发表的研究数据。'],
  limits:['Early student accounts describe perceived learning possibilities. Transfer to clinical practice and effects on competence have not been established.','早期學生回饋呈現的是感受到的學習可能性；能否遷移至臨床實務，以及對能力的影響，尚未確立。','早期学生反馈呈现的是感受到的学习可能性；能否迁移至临床实践，以及对能力的影响，尚未确立。']}
};
export function projectEvidence(project,locale){
 const c=cases[project.id];if(!c)return '';
 const t=a=>pick(locale,...a);
 return `<div class="case-study-evidence"><h3>${pick(locale,'Contribution and evidence','貢獻與證據','贡献与证据')}</h3><dl><div><dt>${pick(locale,'My role','我的角色','我的角色')}</dt><dd>${esc(project.role)}</dd></div><div><dt>${pick(locale,'Available material','可閱覽的資料','可阅读的资料')}</dt><dd>${t(c.artefact)} <a href="${c.href}">${t(c.link)}</a></dd></div><div><dt>${pick(locale,'What the evidence supports','證據的範圍','证据的范围')}</dt><dd>${t(c.limits)}</dd></div></dl></div>`;
}
