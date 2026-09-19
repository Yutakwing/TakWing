// Editorial discovery metadata only. Titles, bodies, dates and slugs remain in their existing sources.
export const collections = [
  {id: 'ai-learning-assessment', title: 'AI, Learning & Assessment', intro: 'How AI changes learning, assessment and the responsibility to think for ourselves.'},
  {id: 'clinical-reasoning', title: 'Clinical Reasoning & Practice Readiness', intro: 'Making reasoning visible and connecting classroom learning with the uncertainty of practice.'},
  {id: 'vr-simulation', title: 'VR, Simulation & Educational Technology', intro: 'Designing purposeful learning around immersion, simulation and the practical demands of technology.'},
  {id: 'educator-life', title: 'Life as an Educator', intro: 'Reflections on teaching, colleagues, academic life and continuing to learn.'},
];
const A = 'ai-learning-assessment', C = 'clinical-reasoning', V = 'vr-simulation', E = 'educator-life';
const entry = (collections, contentType, rationale, extra = {}) => ({collections, contentType, rationale, ...extra});
export const writingMetadata = {
  137: entry([E], 'ESSAY', 'Doctoral learning through supervision and challenged assumptions.'),
  146: entry([E], 'ESSAY', 'Personal reflection on attitude; the word game is not evidence.'),
  175: entry([V], 'ESSAY', 'An anatomy VR demonstration raises questions about educational evaluation.', {ideaProgression: [{postId: 323, text: 'A later reflection develops the distinction between a VR demonstration and a purposeful learning experience.'}]}),
  181: entry([V], 'ESSAY', 'Practical experience of equipment setup and support in VR teaching.'),
  189: entry([V], 'GUIDE', 'Headset preparation, institutional connectivity and participation considerations.'),
  200: entry([V], 'GUIDE', 'Experience-based headset comparison; historical context rather than a current buying recommendation.'),
  215: entry([E], 'GUIDE', 'Supporting a student in distress while separating care from academic decisions.'),
  217: entry([E], 'GUIDE', 'Inclusive teaching through adjustments, partnership and review.'),
  226: entry([A,E], 'ESSAY', 'Conference reflection on AI and educational purpose.'),
  227: entry([E], 'ESSAY', 'Admissions interviews, fairness and educator responsibility.'),
  254: entry([E], 'ESSAY', 'Graduation, family and academic milestones.'),
  256: entry([A,E], 'PROJECT UPDATE', 'An early personal experiment with an AI administrative teammate, not an effectiveness study.'),
  300: entry([A,C], 'ESSAY', 'Reasoning before AI assistance and accountability for clinical judgement.', {practiceLinks: [{page:'research', fragment:'reasoning-chatbot', title:'Clinical reasoning chatbot project', text:'The project explores a questioning layer around clinical reasoning, a practical connection to the thinking-partner approach discussed here.'}]}),
  301: entry([A], 'ESSAY', 'Learning pressures and peer norms alongside AI integrity policy.'),
  302: entry([A], 'ESSAY', 'Productive struggle and the risk of removing the work of learning.'),
  303: entry([A,E], 'ESSAY', 'Academic workload, acceleration and judgement with AI.'),
  304: entry([E], 'ESSAY', 'A teaching award prompts reflection on the purpose of innovation.'),
  305: entry([A], 'ESSAY', 'AI-generated examination questions still require expert evaluation.'),
  306: entry([A], 'ESSAY', 'Tool familiarity differs from verification, privacy and responsible AI literacy.', {practiceLinks: [{page:'ai-literacy-check', title:'AI Literacy Check', text:'Use the existing self-check to reflect on AI literacy beyond familiarity with a chat interface.'}]}),
  307: entry([A,C], 'ESSAY', 'Questions and scaffolded reasoning after the learner forms a judgement.'),
  308: entry([A], 'ESSAY', 'Human adaptability and ethics in an AI context; a conceptual reflection.'),
  309: entry([A,C], 'TEACHING DESIGN', 'An unused movement-science assignment exposes a mismatch between activity and assessment.', {ideaProgression:[{postId:334,text:'Read the later account of Movement Science assessment design, including presentation and live questioning.'}]}),
  310: entry([E], 'ESSAY', 'Outreach, educational choices and family uncertainty.'),
  311: entry([A], 'ESSAY', 'Curriculum-first AI design rather than tool-led adoption.'),
  312: entry([A], 'ESSAY', 'Lecturer AI literacy as professional judgement.', {practiceLinks:[{page:'ai-literacy-check',title:'AI Literacy Check',text:'The self-check offers a starting point for reflecting on the judgement involved in educational AI use.'}]}),
  313: entry([C,V], 'PROJECT UPDATE', 'A preliminary simulation role-rotation project; no proven outcomes claimed.', {practiceLinks:[{page:'research',fragment:'simulation-role-rotation',title:'Simulation role-rotation research',text:'Explore the existing project concerned with learning across clinician, patient, observer and debriefing roles.'}]}),
  314: entry([C,V], 'ESSAY', 'TRAIN is a reflective practice-readiness lens, not a validated instrument.', {practiceLinks:[{page:'research',fragment:'simulation-role-rotation',title:'Simulation and practice-readiness research',text:'The simulation role-rotation project provides a related setting for investigating how students learn through different perspectives.'}]}),
  315: entry([A,E], 'ESSAY', 'A proposed reflection on authenticity fatigue in academic AI use.'),
  316: entry([A], 'GUIDE', 'Decision questions about individual AI use and responsible educational governance.'),
  317: entry([A], 'ESSAY', 'Learning theory and the conditions for professional learning with AI.'),
  318: entry([A,E], 'ESSAY', 'A personal calendar experiment distinguishes AI capability from authority.'),
  319: entry([C,A], 'ESSAY', 'Explanation reveals reasoning hidden behind correct procedural performance.', {startHere:[C], ideaProgression:[{postId:331,text:'The later essay on the curse of knowledge examines why expert explanations can leave intermediate reasoning hidden.'}]}),
  320: entry([C,E], 'PRACTICE NOTE', 'Experiencing equipment as a participant informs communication and educator humility.'),
  321: entry([C,E], 'PRACTICE NOTE', 'Student, clinical educator and lecturer perspectives connect placement to curriculum.'),
  322: entry([V], 'PRACTICE NOTE', 'VRILO and sustainable VR curriculum integration beyond novelty.', {practiceLinks:[{page:'research',fragment:'vr-acupuncture',title:'VR education research',text:'Explore the VR research programme and its interest in purposeful, sustainable educational design.'}]}),
  323: entry([V], 'PRACTICE NOTE', 'Learning intentions, observer participation and debriefing distinguish VR learning from demonstration.', {startHere:[V],practiceLinks:[{page:'research',fragment:'physiology-vr',title:'VR in physiology teaching',text:'The teaching project provides a concrete connection to designing learning around a VR experience.'}]}),
  324: entry([V,C], 'PRACTICE NOTE', 'Simulation depends on preparation, attention and debriefing beyond the room.'),
  325: entry([C], 'PRACTICE NOTE', 'Quiz performance opens questions about explanation and understanding.'),
  326: entry([C], 'PRACTICE NOTE', 'Group work makes participation and reasoning observable before assessment.'),
  327: entry([E], 'PRACTICE NOTE', 'Guest lecturers connect experience to the curriculum.'),
  328: entry([E], 'ESSAY', 'Conference participation should inform subsequent teaching.'),
  329: entry([A], 'ESSAY', 'Assessment with and without AI and the two-lane policy model.'),
  330: entry([E], 'ESSAY', 'Teaching boredom, novelty and renewed attention to the learner.', {startHere:[E]}),
  331: entry([C], 'ESSAY', 'Expert blind spots, hidden reasoning and explanation in teaching.', {practiceLinks:[{page:'goniometry',title:'Goniometry Skills Lab',text:'The existing goniometry activities offer a practical setting for asking learners to explain alignment decisions and errors alongside technical practice.'}]}),
  332: entry([A], 'GUIDE', 'A practical student-first sequence for using AI without making thinking optional.', {startHere:[A],practiceLinks:[{page:'skills-lab',title:'Student Skills Lab',text:'Explore the existing practice activities as a setting for independent attempts, feedback and explanation. AI support should complement the learner’s own reasoning.'}]}),
  333: entry([A,E], 'ESSAY', 'Conference reflection on thinking with AI and curriculum design.'),
  334: entry([A,C], 'TEACHING DESIGN', 'A Movement Science assessment record combining preparation, presentation and live questions.', {practiceLinks:[{page:'teaching',title:'Teaching and assessment design',text:'This assessment record connects with the approaches to physiotherapy teaching described on the Teaching page.'}],officialSources:[{title:'University of Sydney: AI assessment policy — protecting integrity and empowering students',url:'https://www.sydney.edu.au/news-opinion/news/2024/11/27/university-of-sydney-ai-assessment-policy.html',provenance:'Existing reference in ai-assessment-content.mjs, article 329.'}]}),
};
export const contentTypes = ['ESSAY', 'PRACTICE NOTE', 'TEACHING DESIGN', 'PROJECT UPDATE', 'GUIDE'];
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const plainHeading = html => html.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&nbsp;|&#160;/g,' ').trim();

// Preserve author-supplied IDs. Reserve every existing body ID before assigning any new one.
export function articleContents(body, {shortNote = false, headingLang = "en"} = {}) {
  const reserved = new Set([...body.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
  const headings = [];
  const html = body.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (whole,attrs,inner) => {
    const title = plainHeading(inner);
    // Bibliography/related-reading blocks do not make a short article qualify for a TOC.
    if (!title || /^(references?|sources?|related (reading|research)|參考文獻|参考文献|相關研究|相关研究)$/i.test(title)) return whole;
    let id = attrs.match(/\bid=["']([^"']+)["']/)?.[1];
    if (!id) {
      const stem = 'section-' + (title.toLowerCase().normalize('NFKC').replace(/&[a-z#0-9]+;/gi,'-').replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'') || 'heading');
      id = stem; let suffix = 2; while(reserved.has(id)) id = `${stem}-${suffix++}`;
      reserved.add(id); attrs += ` id="${escapeHtml(id)}"`;
    }
    headings.push({id,title});
    return `<h2${attrs}>${inner}</h2>`;
  });
  const toc = !shortNote && headings.length >= 4 ? `<details class="article-toc" lang="en"><summary>In this article</summary><nav aria-label="In this article" lang="${escapeHtml(headingLang)}"><ol>${headings.map(h=>`<li><a href="#${escapeHtml(h.id)}">${escapeHtml(h.title)}</a></li>`).join('')}</ol></nav></details>` : '';
  return {html,toc,headings};
}
export function freshnessMarkup(metadata) {
  const validDate = date => /^\d{4}-\d{2}-\d{2}$/.test(date || '') && new Date(date).toISOString().slice(0,10) === date;
  const lines=[];
  for(const [key,label] of [['editorialUpdated','Updated'],['sourceReviewDate','Sources reviewed']]) {
    if (!metadata[key]) continue;
    if (!validDate(metadata[key])) throw new Error(`Invalid ${key}`);
    const display = new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(metadata[key]));
    lines.push(`${label} <time datetime="${metadata[key]}">${display}</time>`);
  }
  return lines.length ? `<p class="writing-freshness" lang="en">${lines.join(' · ')}</p>` : '';
}
export function validateWritingMetadata(posts) {
  const ids = new Set(posts.map(p=>p.ID));
  for(const post of posts) {
    const m=writingMetadata[post.ID];
    if (!m || !m.collections.length || !contentTypes.includes(m.contentType)) throw new Error(`Missing writing curation: ${post.ID}`);
    for(const id of m.collections) if (!collections.some(c=>c.id===id)) throw new Error(`Unknown collection ${id}`);
    for(const link of m.ideaProgression || []) {
      const target=posts.find(p=>p.ID===link.postId);
      if(!target || target.date <= post.date) throw new Error(`Progression must target a later article: ${post.ID}`);
    }
    freshnessMarkup(m);
  }
  for(const id of Object.keys(writingMetadata)) if(!ids.has(Number(id))) throw new Error(`Unpublished metadata ID: ${id}`);
  for(const c of collections) {
    const starts=posts.filter(p=>writingMetadata[p.ID].startHere?.includes(c.id));
    if(starts.length!==1 || !writingMetadata[starts[0].ID].collections.includes(c.id)) throw new Error(`Expected one start in ${c.id}`);
  }
}
