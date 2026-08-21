import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import { articleBodies } from "./article-content.mjs";
import { notes, notesUi } from "./notes-content.mjs";
import { experienceContent } from "./experience-content.mjs";
import { reasoningRunnerContent } from "./reasoning-runner-content.mjs";
import { clinicalReadinessContent } from "./clinical-readiness-content.mjs";
import {
  aboutContent,
  cvContent,
  englishPagePlaceholders,
  homepageContent,
  profile,
  publicationsContent,
  publicationSummaryTranslations,
  researchContent,
  teachingContent,
} from "./portfolio-content.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const assetVersion = "20260809-practice-notes-v3";
const mascotAssetVersion = "20260812-mascot-v3";
const aiLiteracyAssetVersion = "20260730-quiz-fix-v14";
const reasoningRunnerAssetVersion = "20260730-analytics-v2";
const clinicalReadinessAssetVersion = "20260730-analytics-v2";
const postsExport = JSON.parse(fs.readFileSync(path.join(root, "wordpress-posts.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "wordpress-site.json"), "utf8"));
const publications = JSON.parse(fs.readFileSync(path.join(root, "data", "publications.json"), "utf8"));
const draftPosts = [
  {
    ID: 329,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-18T16:30:00+08:00",
    modified: "2026-08-18T16:30:00+08:00",
    title: "Should We Assess Students With AI — or Without It?",
    slug: "should-we-assess-students-with-ai-or-without-it",
    excerpt: "A two-lane approach reframes AI assessment around purpose: support learning with contemporary tools, then assure independent clinical capability where it matters.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 328,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-09T11:30:00+08:00",
    modified: "2026-08-09T11:30:00+08:00",
    title: "A Conference Should Change What Happens on Monday",
    slug: "a-conference-should-change-what-happens-on-monday",
    excerpt: "A reflection on turning conference conversations and notes into sharper questions, small commitments and observable changes in teaching and research.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 327,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-09T11:00:00+08:00",
    modified: "2026-08-09T11:00:00+08:00",
    title: "What a Guest Lecturer Adds That a Slide Cannot",
    slug: "what-a-guest-lecturer-adds-that-a-slide-cannot",
    excerpt: "Guest expertise becomes educational when it is connected to curriculum outcomes, active student participation and purposeful follow-up.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 326,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-09T10:30:00+08:00",
    modified: "2026-08-09T10:30:00+08:00",
    title: "What Group Work Makes Visible Before Assessment",
    slug: "what-group-work-makes-visible-before-assessment",
    excerpt: "Group activity can reveal developing reasoning, participation patterns and misconceptions before formal assessment makes them difficult to address.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 325,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-08T21:15:00+08:00",
    modified: "2026-08-08T21:15:00+08:00",
    title: "Beyond a Score: What Content-Mastery Quizzes Make Visible",
    slug: "beyond-a-score-what-content-mastery-quizzes-make-visible",
    excerpt: "Content-mastery quizzes can reveal useful patterns in learning and teaching, but a score is evidence to interpret rather than proof of clinical competence.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 324,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-08T20:45:00+08:00",
    modified: "2026-08-08T20:45:00+08:00",
    title: "A Simulation Room Is Only the Beginning",
    slug: "a-simulation-room-is-only-the-beginning",
    excerpt: "Realistic facilities create possibilities, but simulation becomes educational through purposeful outcomes, participation, facilitation and debriefing.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 323,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-08T20:15:00+08:00",
    modified: "2026-08-08T20:15:00+08:00",
    title: "A VR Demonstration Is Not Yet a Learning Experience",
    slug: "a-vr-demonstration-is-not-yet-a-learning-experience",
    excerpt: "A headset demonstration can attract attention, but purposeful learning requires a clear problem, active participation, reflection and aligned evidence.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 322,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-08T18:30:00+08:00",
    modified: "2026-08-08T18:30:00+08:00",
    title: "Why Universities Are Attracted to VR, and Why Novelty Is Not Enough",
    slug: "why-universities-are-attracted-to-vr-and-why-novelty-is-not-enough",
    excerpt: "Virtual reality attracts attention through immersion, visualisation and novelty, but meaningful adoption begins with a learning problem and a sustainable implementation plan.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 321,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-08T16:30:00+08:00",
    modified: "2026-08-08T16:30:00+08:00",
    title: "The Clinical Education Triangle: Students, Clinical Educators and Visiting Lecturers",
    slug: "clinical-education-triangle-students-clinical-educators-visiting-lecturers",
    excerpt: "A placement visit prompted me to reflect on how students, clinical educators and visiting lecturers can turn three partial perspectives into a useful feedback loop.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 320,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-08T15:30:00+08:00",
    modified: "2026-08-08T15:30:00+08:00",
    title: "Practising What We Teach: Staying Connected to Clinical Practice",
    slug: "practising-what-we-teach-staying-connected-to-clinical-practice",
    excerpt: "Experiencing a cervical traction setup from the other side of the treatment table reminded me why educators should remain curious, clinically connected and attentive to the learner and patient experience.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 319,
    author: { name: "Tak Wing Yu" },
    date: "2026-08-03T12:00:00+08:00",
    modified: "2026-08-03T12:00:00+08:00",
    title: "Beyond the Right Answer: Why We Should Ask Students to Explain",
    slug: "beyond-the-right-answer-why-we-should-ask-students-to-explain",
    excerpt: "Why a correct performance is not enough when the reasoning remains hidden—and how focused explanation can strengthen physiotherapy assessment.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 318,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-29T10:00:00+08:00",
    modified: "2026-07-29T10:00:00+08:00",
    title: "When AI Can Read but Cannot Act: Why a Limitation May Be a Safeguard",
    slug: "when-ai-can-read-but-cannot-act",
    excerpt: "A real calendar task prompted me to reconsider whether an AI assistant's refusal is a failure—or a useful boundary around permission, privacy and accountability.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 317,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-28T09:00:00+08:00",
    modified: "2026-07-28T09:00:00+08:00",
    title: "AI Integration Needs a Theory of Learning",
    slug: "ai-integration-needs-a-theory-of-learning",
    excerpt: "Six design principles for asking whether AI strengthens professional learning—or merely improves the artefact.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 316,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-28T08:00:00+08:00",
    modified: "2026-07-28T08:00:00+08:00",
    title: "Should I Use AI for This? From Personal Choice to Health CARE‑AI",
    slug: "should-i-use-ai-for-this-from-personal-choice-to-health-care-ai",
    excerpt: "A practical bridge from deciding whether to use AI for a task to making its use contextual, accountable, responsible and equitable in health professions education.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 315,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-19T14:00:00+08:00",
    modified: "2026-07-19T14:00:00+08:00",
    title: "The Next AI Problem Is AI Authenticity Fatigue",
    slug: "the-next-ai-problem-is-ai-authenticity-fatigue",
    excerpt: "What happens when genuine human writing is treated as AI-generated before anyone has read it closely?",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 314,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-19T13:00:00+08:00",
    modified: "2026-07-19T13:00:00+08:00",
    title: "From Classroom to Clinic: What Is Healthcare's Equivalent of TRAIN?",
    slug: "from-classroom-to-clinic-what-is-healthcares-equivalent-of-train",
    excerpt: "Competence matters, but readiness also depends on judgement, adaptation, entrustment and support.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 313,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-19T12:00:00+08:00",
    modified: "2026-07-19T12:00:00+08:00",
    title: "The Clinician Is Not the Only Learner: What Role Rotation Might Add to Simulation",
    slug: "the-clinician-is-not-the-only-learner-what-role-rotation-adds-to-simulation",
    excerpt: "A cautious reflection on how learner, peer patient, observer and peer debriefer roles may support different aspects of learning—and what further studies still need to confirm.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 312,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-16T01:00:00+00:00",
    modified: "2026-07-16T01:00:00+00:00",
    title: "Lecturers Need AI Literacy, Not a Computer Science Degree",
    slug: "lecturers-need-ai-literacy-not-a-computer-science-degree",
    excerpt: "Why lecturers need practical pedagogical, ethical and discipline-specific AI literacy to design curricula and assessment—without becoming programmers or IT experts.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 311,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-16T00:00:00+00:00",
    modified: "2026-07-16T00:00:00+00:00",
    title: "Do Not Start with AI: Start with the Curriculum",
    slug: "do-not-start-with-ai-start-with-the-curriculum",
    excerpt: "A curriculum-design reflection on why educators should define graduate competence, human judgement and assessment evidence before deciding where AI belongs.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 310,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-12T08:00:00+00:00",
    modified: "2026-07-12T08:00:00+00:00",
    title: "Waiting for Results: Reflections on Speaking to Hong Kong’s Future Physiotherapy Students",
    slug: "waiting-for-results-reflections-on-speaking-to-hong-kongs-future-physiotherapy-students",
    excerpt: "A reflection on speaking to students and families ahead of the HKDSE results, and what admissions season reveals about uncertainty, aspiration and physiotherapy education in Hong Kong.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 309,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-12T00:00:00+00:00",
    modified: "2026-07-12T00:00:00+00:00",
    title: "When Assessment Invites AI but Does Not Assess AI",
    slug: "when-assessment-invites-ai-but-does-not-assess-ai",
    excerpt: "A reflection on designing, questioning, and abandoning an AI-permitted assignment because AI use was not the intended learning outcome being assessed.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 308,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-11T03:00:00+00:00",
    modified: "2026-07-11T03:00:00+00:00",
    title: "Beyond IQ: What Quotients Do Students Need in the AI Era?",
    slug: "beyond-iq-what-quotients-do-students-need-in-the-ai-era",
    excerpt: "A reflection on why students need adaptability, emotional intelligence, cultural awareness, social judgement, meaning and decency alongside cognitive ability.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 307,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-11T02:00:00+00:00",
    modified: "2026-07-11T02:00:00+00:00",
    title: "Do Not Ask AI for the Answer First",
    slug: "do-not-ask-ai-for-the-answer-first",
    excerpt: "A practical argument for using AI to ask probing questions after learners commit to an initial clinical judgement.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 306,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-11T01:00:00+00:00",
    modified: "2026-07-11T01:00:00+00:00",
    title: "Using ChatGPT Is Not the Same as AI Literacy",
    slug: "using-chatgpt-is-not-the-same-as-ai-literacy",
    excerpt: "A physiotherapy education reflection on why student exposure to ChatGPT does not automatically become safe, critical and professional AI use.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 305,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-11T00:00:00+00:00",
    modified: "2026-07-11T00:00:00+00:00",
    title: "AI Can Draft Exam Questions, But It Cannot Validate Them",
    slug: "ai-can-draft-exam-questions-but-it-cannot-validate-them",
    excerpt: "A reflection on why AI-generated assessment items still need expert review, blueprinting and validity evidence.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 304,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-09T00:00:00+00:00",
    modified: "2026-07-09T00:00:00+00:00",
    title: "Two Years in Hong Kong: Reflecting on Teaching, Innovation, and Receiving a Teaching Excellence Award",
    slug: "two-years-in-hong-kong-reflecting-on-teaching-innovation-and-receiving-a-teaching-excellence-award",
    excerpt:
      "A reflection on being nominated for a faculty teaching excellence award in 2025, receiving it in 2026, and what teaching, innovation and collaboration have meant during the first two years in Hong Kong.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 303,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-07T02:00:00+00:00",
    modified: "2026-07-07T02:00:00+00:00",
    title: "When AI Makes Academia Faster, Who Gets the Time Back?",
    slug: "when-ai-makes-academia-faster-who-gets-the-time-back",
    excerpt: "A reflection on academic acceleration, AI productivity, and why the new bottleneck is judgement rather than production.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 302,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-07T01:00:00+00:00",
    modified: "2026-07-07T01:00:00+00:00",
    title: "Productive Struggle in the Age of AI",
    slug: "productive-struggle-in-the-age-of-ai",
    excerpt: "A reflection on whether students are learning inside too safe a bubble, and how AI can support or bypass productive struggle.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 301,
    author: { name: "Tak Wing Yu" },
    date: "2026-07-07T00:00:00+00:00",
    modified: "2026-07-07T00:00:00+00:00",
    title: "AI Policy Is Not Enough: Students Also Need Help Resisting the Pressure to Misuse AI",
    slug: "ai-policy-is-not-enough-students-need-help-resisting-pressure-to-misuse-ai",
    excerpt: "A reflection on why academic integrity responses to generative AI should address pressure, peer norms, misinformation and verification, not only detection.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
  {
    ID: 300,
    author: { name: "Tak Wing Yu" },
    date: "2026-06-26T00:00:00+00:00",
    modified: "2026-06-26T00:00:00+00:00",
    title: "AI Should Be a Thinking Partner, Not a Clinical Shortcut",
    slug: "ai-should-be-a-thinking-partner-not-a-clinical-shortcut",
    excerpt: "An argument for teaching physiotherapy students to reason first, consult AI second, and remain accountable for clinical judgement.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
];
const portfolioPostIds = new Set([329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 256, 226, 254, 227, 217, 215, 200, 189, 181, 175, 146, 137]);
const posts = [...postsExport.posts, ...draftPosts]
  .filter((post) => portfolioPostIds.has(post.ID))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const decodeEntities = (value = "") =>
  value
    .replace(/&#8211;/g, "-")
    .replace(/&#8220;/g, "\"")
    .replace(/&#8221;/g, "\"")
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const stripHtml = (value = "") =>
  decodeEntities(value.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const slugify = (post) => {
  const base = decodeURIComponent(post.slug || String(post.ID))
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return base && base.length > 2 ? base : `post-${post.ID}`;
};

const postTitles = {
  en: {
    329: "Should We Assess Students With AI — or Without It?",
    328: "A Conference Should Change What Happens on Monday",
    327: "What a Guest Lecturer Adds That a Slide Cannot",
    326: "What Group Work Makes Visible Before Assessment",
    325: "Beyond a Score: What Content-Mastery Quizzes Make Visible",
    324: "A Simulation Room Is Only the Beginning",
    323: "A VR Demonstration Is Not Yet a Learning Experience",
    322: "Why Universities Are Attracted to VR, and Why Novelty Is Not Enough",
    321: "The Clinical Education Triangle: Students, Clinical Educators and Visiting Lecturers",
    320: "Practising What We Teach: Staying Connected to Clinical Practice",
    319: "Beyond the Right Answer: Why We Should Ask Students to Explain",
    318: "When AI Can Read but Cannot Act: Why a Limitation May Be a Safeguard",
    317: "AI Integration Needs a Theory of Learning",
    316: "Should I Use AI for This? From Personal Choice to Health CARE‑AI",
    315: "The Next AI Problem Is AI Authenticity Fatigue",
    314: "From Classroom to Clinic: What Is Healthcare's Equivalent of TRAIN?",
    313: "The Clinician Is Not the Only Learner: What Role Rotation Might Add to Simulation",
    312: "Lecturers Need AI Literacy, Not a Computer Science Degree",
    311: "Do Not Start with AI: Start with the Curriculum",
    310: "Waiting for Results: Reflections on Speaking to Hong Kong’s Future Physiotherapy Students",
    256: "Beyond the Chatbot: Using OpenClaw to Reclaim My Academic Life",
    226: "Reflections on a Teaching and Learning Conference",
    254: "A Tale of Two Graduations: From South Africa to Hong Kong",
    227: "The Weight of Decision: My Experience as a University Admissions Interviewer",
    217: "Supporting Students with Special Educational Needs: A Guide for Lecturers",
    215: "Responding to Student Mental Health Crises During Examinations",
    200: "Navigating Virtual Reality: Comparing HTC VIVE, Meta Quest 2, Quest 3 and Quest Pro",
    189: "Embracing Wireless VR: A Guide to Setting Up a Meta VR Headset",
    181: "Setting Up VR: Reflections on the Experience",
    175: "Exploring 3D Organon in Virtual Reality",
    146: "What Do You Need to Succeed?",
    137: "The Road to a PhD",
    309: "When Assessment Invites AI but Does Not Assess AI",
    308: "Beyond IQ: What Quotients Do Students Need in the AI Era?",
    307: "Do Not Ask AI for the Answer First",
    306: "Using ChatGPT Is Not the Same as AI Literacy",
    305: "AI Can Draft Exam Questions, But It Cannot Validate Them",
    304: "Two Years in Hong Kong: Reflecting on Teaching, Innovation, and Receiving a Teaching Excellence Award",
    303: "When AI Makes Academia Faster, Who Gets the Time Back?",
    302: "Productive Struggle in the Age of AI",
    301: "AI Policy Is Not Enough: Students Also Need Help Resisting the Pressure to Misuse AI",
    300: "AI Should Be a Thinking Partner, Not a Clinical Shortcut",
  },
  "zh-hant": {
    329: "我們應該在有人工智能還是沒有人工智能的情況下評估學生？",
    328: "一場會議應該改變星期一會發生的事",
    327: "客席講者帶來投影片無法提供的價值",
    326: "小組活動在評估前讓我們看見甚麼",
    325: "超越分數：內容掌握小測讓我們看見甚麼",
    324: "模擬教學室只是開始",
    323: "VR 示範尚未成為學習經驗",
    322: "大學為何被虛擬實境吸引，而新奇感為何並不足夠",
    321: "臨床教育三角：學生、臨床導師與到訪導師",
    320: "實踐我們所教：與臨床實務保持連繫",
    319: "超越正確答案：為何我們應請學生解釋思考過程",
    318: "當人工智能能讀取卻不能行動：限制為何可能是一種保障",
    317: "人工智能融入教育，需要學習理論作為基礎",
    316: "我應否在這項工作使用人工智能？從個人選擇走向 Health CARE‑AI",
    315: "下一個人工智能問題：人工智能真實性疲勞",
    314: "從課堂到臨床：醫療專業的 TRAIN 對應概念是甚麼？",
    313: "不只臨床角色在學習：角色輪換可能為模擬教育帶來甚麼？",
    312: "教師需要人工智能素養，而不是電腦科學學位",
    311: "不要從人工智能開始：先從課程開始",
    310: "等待放榜：對香港未來物理治療學生的一次分享與反思",
    256: "超越聊天機械人：我如何運用 OpenClaw 重拾學術生活 - 「隱形課程」的負擔",
    226: "教與學會議反思",
    254: "兩場畢業典禮：從南非到香港",
    227: "決策的重量：擔任大學招生面試官的經驗",
    217: "支援有特殊教育需要的學生：教師指南",
    215: "考試期間處理學生心理健康危機：教師指引",
    200: "探索虛擬世界：HTC VIVE、Meta Quest 2、Quest 3 與 Quest Pro 比較",
    189: "迎接無線 VR 的未來：Meta VR 頭戴裝置設定指南",
    181: "VR 設定：我的看法",
    175: "以 3D Organon 探索虛擬實境",
    146: "成功需要甚麼？",
    137: "博士研究之路",
    309: "當評估邀請學生使用人工智能，卻不評估人工智能",
    308: "超越 IQ：人工智能時代學生還需要哪些能力？",
    307: "不要一開始就向人工智能索取答案",
    306: "使用 ChatGPT 不等於具備人工智能素養",
    305: "人工智能可以草擬試題，但不能驗證試題",
    304: "來港兩年：反思教學、創新與獲頒院級教學卓越獎",
    303: "當人工智能讓學術工作更快，誰取回了時間？",
    302: "人工智能時代的有效掙扎",
    301: "人工智能政策並不足夠：學生也需要學會抵抗濫用人工智能的壓力",
    300: "人工智能應是思考伙伴，而不是臨床捷徑",
  },
  "zh-hans": {
    329: "我们应该在有人工智能还是没有人工智能的情况下评估学生？",
    328: "一场会议应该改变星期一会发生的事",
    327: "客席讲者带来幻灯片无法提供的价值",
    326: "小组活动在评估前让我们看见什么",
    325: "超越分数：内容掌握小测让我们看见什么",
    324: "模拟教学室只是开始",
    323: "VR 示范尚未成为学习体验",
    322: "大学为何被虚拟现实吸引，而新奇感为何并不足够",
    321: "临床教育三角：学生、临床导师与到访导师",
    320: "实践我们所教：与临床实践保持联系",
    319: "超越正确答案：为何我们应请学生解释思考过程",
    318: "当人工智能能读取却不能行动：限制为何可能是一种保障",
    317: "人工智能融入教育，需要学习理论作为基础",
    316: "我是否应在这项工作使用人工智能？从个人选择走向 Health CARE‑AI",
    315: "下一个人工智能问题：人工智能真实性疲劳",
    314: "从课堂到临床：医疗专业的 TRAIN 对应概念是什么？",
    313: "不只临床角色在学习：角色轮换可能为模拟教育带来什么？",
    312: "教师需要人工智能素养，而不是计算机科学学位",
    311: "不要从人工智能开始：先从课程开始",
    310: "等待放榜：对香港未来物理治疗学生的一次分享与反思",
    256: "超越聊天机器人：我如何运用 OpenClaw 重拾学术生活 - “隐形课程”的负担",
    226: "教与学会议反思",
    254: "两场毕业典礼：从南非到香港",
    227: "决策的重量：担任大学招生面试官的经验",
    217: "支持有特殊教育需求的学生：教师指南",
    215: "考试期间应对学生心理健康危机：教师指南",
    200: "探索虚拟世界：HTC VIVE、Meta Quest 2、Quest 3 与 Quest Pro 比较",
    189: "迎接无线 VR 的未来：Meta VR 头戴设备设置指南",
    181: "VR 设置：我的看法",
    175: "以 3D Organon 探索虚拟现实",
    146: "成功需要什么？",
    137: "博士研究之路",
    309: "当评估邀请学生使用人工智能，却不评估人工智能",
    308: "超越 IQ：人工智能时代学生还需要哪些能力？",
    307: "不要一开始就向人工智能索取答案",
    306: "使用 ChatGPT 不等于具备人工智能素养",
    305: "人工智能可以草拟试题，但不能验证试题",
    304: "来港两年：反思教学、创新与获颁院级教学卓越奖",
    303: "当人工智能让学术工作更快，谁取回了时间？",
    302: "人工智能时代的有效挣扎",
    301: "人工智能政策并不足够：学生也需要学会抵抗滥用人工智能的压力",
    300: "人工智能应是思考伙伴，而不是临床捷径",
  },
};

const postSummaries = {
  en: {
    329: "A two-lane approach reframes AI assessment around purpose: support learning with contemporary tools, then assure independent clinical capability where it matters.",
    328: "A reflection on turning conference conversations and notes into sharper questions, small commitments and observable changes in teaching and research.",
    327: "Guest expertise becomes educational when it is connected to curriculum outcomes, active student participation and purposeful follow-up.",
    326: "Group activity can reveal developing reasoning, participation patterns and misconceptions before formal assessment makes them difficult to address.",
    325: "Content-mastery quizzes can reveal useful patterns in learning and teaching, but a score is evidence to interpret rather than proof of clinical competence.",
    324: "Realistic facilities create possibilities, but simulation becomes educational through purposeful outcomes, participation, facilitation and debriefing.",
    323: "A headset demonstration can attract attention, but purposeful learning requires a clear problem, active participation, reflection and aligned evidence.",
    322: "Virtual reality attracts attention through immersion, visualisation and novelty, but meaningful adoption begins with a learning problem and a sustainable implementation plan.",
    321: "A placement visit prompted me to reflect on how students, clinical educators and visiting lecturers can turn three partial perspectives into a useful feedback loop.",
    320: "Experiencing a cervical traction setup from the other side of the treatment table reminded me why educators should remain curious, clinically connected and attentive to the learner and patient experience.",
    319: "Why a correct performance is not enough when the reasoning remains hidden—and how focused explanation can strengthen physiotherapy assessment.",
    318: "A real calendar task prompted me to reconsider whether an AI assistant's refusal is a failure—or a useful boundary around permission, privacy and accountability.",
    317: "Six design principles for asking whether AI strengthens professional learning—or merely improves the artefact.",
    316: "A practical bridge from deciding whether to use AI for a task to making its use contextual, accountable, responsible and equitable in health professions education.",
    315: "What happens when genuine human writing is treated as AI-generated before anyone has read it closely?",
    314: "Competence matters, but readiness also depends on judgement, adaptation, entrustment and support.",
    313: "A cautious reflection on how learner, peer patient, observer and peer debriefer roles may support different aspects of learning—and what further studies still need to confirm.",
    312: "Why lecturers need practical pedagogical, ethical and discipline-specific AI literacy to design curricula and assessment—without becoming programmers or IT experts.",
    311: "A curriculum-design reflection on why educators should define graduate competence, human judgement and assessment evidence before deciding where AI belongs.",
    310: "A reflection on speaking with students and families ahead of the HKDSE results, and on what admissions season reveals about anxiety, aspiration and the meaning of physiotherapy education in Hong Kong.",
    256: "A controlled exploration of whether agentic AI can reduce administrative workload while preserving privacy, professional judgement and academic accountability.",
    226: "A reflection on moving the higher-education conversation about AI from novelty towards evidence, implementation and educational purpose.",
    254: "Reflections on graduation ceremonies in South Africa and Hong Kong, and the shared pride, sacrifice and hope that they represent.",
    227: "An examination of fairness, bias and responsibility in university admissions interviews.",
    217: "Practical principles for removing barriers and creating an inclusive learning environment for students with special educational needs.",
    215: "A practical guide to responding compassionately and safely to an acute student mental health crisis during an examination.",
    200: "An education-focused comparison of PC-based HTC VIVE systems, Meta Quest 2, Quest 3 and Quest Pro.",
    189: "A practical introduction to setting up a standalone Meta Quest headset safely and purposefully for teaching.",
    181: "Reflections on the time, equipment and technical support required to set up an HTC VIVE Cosmos system.",
    175: "Initial reflections on 3D Organon and the educational questions that should guide evaluation of virtual anatomy tools.",
    146: "A playful word exercise prompts a wider reflection on knowledge, hard work, attitude and the many influences on success.",
    137: "A short reflection on doctoral supervision and the process of turning enthusiasm into feasible, rigorous research.",
    309: "A reflection on designing, questioning, and abandoning an AI-permitted assignment because AI use was not the intended learning outcome being assessed.",
    308: "A reflection on why students need adaptability, emotional intelligence, cultural awareness, social judgement, meaning and decency alongside cognitive ability.",
    307: "A practical argument for using AI to ask probing questions after learners commit to an initial clinical judgement.",
    306: "A physiotherapy education reflection on why student exposure to ChatGPT does not automatically become safe, critical and professional AI use.",
    305: "A reflection on why AI-generated assessment items still need expert review, blueprinting and validity evidence.",
    304: "A reflection on being nominated for a faculty teaching excellence award in 2025, receiving it in 2026, and what teaching, innovation and collaboration have meant during the first two years in Hong Kong.",
    303: "A reflection on academic acceleration, AI productivity, and why the new bottleneck is judgement rather than production.",
    302: "A reflection on whether students are learning inside too safe a bubble, and how AI can support or bypass productive struggle.",
    301: "A reflection on why academic integrity responses to generative AI should address pressure, peer norms, misinformation and verification, not only detection.",
    300: "An argument for teaching physiotherapy students to reason first, consult AI second, and remain accountable for clinical judgement.",
  },
  "zh-hant": {
    329: "雙軌評估以目的重新理解人工智能：在學習階段運用當代工具，同時在關鍵時刻確認學生具備獨立臨床能力。",
    328: "反思如何把會議對話及筆記轉化成更準確的問題、細小承諾，以及教學與研究中可觀察的改變。",
    327: "當客席專業知識連結課程成果、學生主動參與及有目的的跟進，它才真正成為教育。",
    326: "小組活動能在正式評估前，呈現正在發展的推理、參與模式及錯誤概念。",
    325: "內容掌握小測能呈現教與學的有用模式，但分數只是需要詮釋的證據，而不是臨床能力的證明。",
    324: "逼真設施能創造可能，但模擬教學需要清晰成果、主動參與、適切引導及解說，才會成為學習。",
    323: "頭戴裝置示範能吸引注意，但有目的的學習仍需要清晰問題、主動參與、反思及配合成果的證據。",
    322: "虛擬實境以沉浸感、視覺化及新奇感吸引注意，但有意義的採用必須由學習問題及可持續的實施計劃開始。",
    321: "一次臨床實習探訪，令我反思學生、臨床導師與到訪導師如何把三個不完整的視角，連結成有用的回饋循環。",
    320: "從治療床的另一端親身體驗頸椎牽引裝置，提醒我教育工作者應保持好奇、緊貼臨床，並關注學習者與病人的體驗。",
    319: "當推理過程仍然隱藏時，正確表現為何仍不足夠，以及聚焦解釋如何加強物理治療評估。",
    318: "一次真實的日曆任務令我重新思考：人工智能拒絕行動究竟是失敗，還是守護權限、私隱與問責的有用界線？",
    317: "六項設計原則，協助我們判斷人工智能是在強化專業學習，還是只改善最終作品。",
    316: "把是否使用人工智能的個人判斷，連結至健康專業教育中的情境、問責、責任與公平。",
    315: "當真正由人撰寫的文字在被仔細閱讀之前，已被視為人工智能生成，會發生甚麼？",
    314: "能力固然重要，但臨床準備度也取決於判斷、適應、託付與支援。",
    313: "審慎反思臨床學習者、同儕病人、觀察者及同儕反思引導者等角色可能支援的不同學習面向，以及仍待研究確認的問題。",
    312: "教師需要實用的教學、倫理與學科人工智能素養來設計課程和評估，但毋須成為程式設計員或資訊科技專家。",
    311: "反思為何課程設計應先界定畢業生能力、人類判斷與評估證據，然後才決定人工智能應扮演的角色。",
    310: "在香港中學文憑試放榜前與學生及家長交流後，反思升學季節中的焦慮、盼望，以及物理治療教育的真正意義。",
    256: "探討自主式人工智能如何減輕大學教師的行政負擔，讓時間重新聚焦於教學、指導與研究。",
    226: "從教與學會議出發，反思人工智能發展對高等教育實踐的影響。",
    254: "回顧南非與香港的兩段畢業經歷，以及它們如何塑造學術與專業身份。",
    227: "反思大學招生面試中的責任、判斷，以及每項決定對申請人的意義。",
    217: "提供具包容性的教學原則，以支援有特殊教育需要的學生。",
    215: "為教師提供考試期間識別及應對學生心理健康危機的實務指引。",
    200: "比較三款 VR 平台的功能，並思考它們在教育環境中的應用。",
    189: "介紹無線 VR 的設定流程，以及其對教學與學習的潛在價值。",
    181: "以實際設備經驗反思 VR 技術的優勢、限制與教育應用。",
    175: "記錄使用 3D Organon 探索解剖學與沉浸式學習的初步經驗。",
    146: "從個人與專業成長角度，思考支持成功所需的習慣與心態。",
    137: "反思博士研究歷程中的挑戰、督導關係與持續學習。",
    309: "反思一份允許學生使用人工智能的評估設計，為何因人工智能並非原定學習成果而沒有實行。",
    308: "反思學生除了認知能力外，為何還需要適應力、情緒智慧、文化意識、社交判斷、意義感和正直。",
    307: "主張在學生先作出初步臨床判斷後，才使用人工智能提出追問。",
    306: "反思物理治療學生接觸 ChatGPT，並不等於能安全、批判和專業地使用人工智能。",
    305: "反思人工智能生成評估題目仍然需要專家審核、藍圖和效度證據。",
    304: "回顧來港兩年的教學旅程，從 2025 年獲提名但未符合資格，到 2026 年再次獲提名並獲頒院級教學卓越獎。",
    303: "反思人工智能提高學術工作效率後，時間是否真的回到研究者手中，以及為何新的瓶頸是判斷而不是產出。",
    302: "反思學生是否在過於安全的學習泡泡中成長，以及人工智能如何支援或繞過有效掙扎。",
    301: "反思大學回應生成式人工智能與學術誠信時，為何不能只依賴偵測與處分，而要處理壓力、同儕規範、錯誤資訊與核實能力。",
    300: "主張物理治療學生應先自行推理，再諮詢人工智能，並繼續為臨床判斷負責。",
  },
  "zh-hans": {
    329: "双轨评估以目的重新理解人工智能：在学习阶段运用当代工具，同时在关键时刻确认学生具备独立临床能力。",
    328: "反思如何把会议对话及笔记转化成更准确的问题、小型承诺，以及教学与研究中可观察的改变。",
    327: "当客席专业知识连接课程成果、学生主动参与及有目的的跟进，它才真正成为教育。",
    326: "小组活动能在正式评估前，呈现正在发展的推理、参与模式及错误概念。",
    325: "内容掌握小测能呈现教与学的有用模式，但分数只是需要解释的证据，而不是临床能力的证明。",
    324: "逼真设施能创造可能，但模拟教学需要清晰成果、主动参与、适切引导及复盘，才会成为学习。",
    323: "头戴设备示范能吸引注意，但有目的的学习仍需要清晰问题、主动参与、反思及与成果一致的证据。",
    322: "虚拟现实以沉浸感、可视化及新奇感吸引注意，但有意义的采用必须从学习问题及可持续的实施计划开始。",
    321: "一次临床实习探访，令我反思学生、临床导师与到访导师如何把三个不完整的视角，连接成有用的反馈循环。",
    320: "从治疗床的另一端亲身体验颈椎牵引装置，提醒我教育工作者应保持好奇、紧贴临床，并关注学习者与患者的体验。",
    319: "当推理过程仍然隐藏时，正确表现为何仍不足够，以及聚焦解释如何加强物理治疗评估。",
    318: "一次真实的日历任务令我重新思考：人工智能拒绝行动究竟是失败，还是守护权限、隐私与问责的有用界线？",
    317: "六项设计原则，帮助我们判断人工智能是在强化专业学习，还是只改善最终作品。",
    316: "把是否使用人工智能的个人判断，连接至健康专业教育中的情境、问责、责任与公平。",
    315: "当真正由人撰写的文字在被仔细阅读之前，已被视为人工智能生成，会发生什么？",
    314: "能力固然重要，但临床准备度也取决于判断、适应、委托与支持。",
    313: "审慎反思临床学习者、同伴患者、观察者及同伴复盘引导者等角色可能支持的不同学习面向，以及仍待研究确认的问题。",
    312: "教师需要实用的教学、伦理与学科人工智能素养来设计课程和评估，但无须成为程序员或信息技术专家。",
    311: "反思为何课程设计应先界定毕业生能力、人类判断与评估证据，然后才决定人工智能应扮演的角色。",
    310: "在香港中学文凭试放榜前与学生及家长交流后，反思升学季节中的焦虑、盼望，以及物理治疗教育的真正意义。",
    256: "探讨自主式人工智能如何减轻大学教师的行政负担，让时间重新聚焦于教学、指导与研究。",
    226: "从教与学会议出发，反思人工智能发展对高等教育实践的影响。",
    254: "回顾南非与香港的两段毕业经历，以及它们如何塑造学术与专业身份。",
    227: "反思大学招生面试中的责任、判断，以及每项决定对申请人的意义。",
    217: "提供包容性的教学原则，以支持有特殊教育需求的学生。",
    215: "为教师提供在考试期间识别并应对学生心理健康危机的实用指南。",
    200: "比较三款 VR 平台的功能，并思考它们在教育环境中的应用。",
    189: "介绍无线 VR 的设置流程，以及其对教学与学习的潜在价值。",
    181: "以实际设备经验反思 VR 技术的优势、限制与教育应用。",
    175: "记录使用 3D Organon 探索解剖学与沉浸式学习的初步经验。",
    146: "从个人与专业成长角度，思考支持成功所需的习惯与心态。",
    137: "反思博士研究历程中的挑战、指导关系与持续学习。",
    309: "反思一份允许学生使用人工智能的评估设计，为何因人工智能并非原定学习成果而没有实行。",
    308: "反思学生除了认知能力外，为何还需要适应力、情绪智慧、文化意识、社交判断、意义感和正直。",
    307: "主张在学生先作出初步临床判断后，才使用人工智能提出追问。",
    306: "反思物理治疗学生接触 ChatGPT，并不等于能安全、批判和专业地使用人工智能。",
    305: "反思人工智能生成评估题目仍然需要专家审核、蓝图和效度证据。",
    304: "回顾来港两年的教学旅程，从 2025 年获提名但未符合资格，到 2026 年再次获提名并获颁院级教学卓越奖。",
    303: "反思人工智能提高学术工作效率后，时间是否真的回到研究者手中，以及为何新的瓶颈是判断而不是产出。",
    302: "反思学生是否在过于安全的学习泡泡中成长，以及人工智能如何支持或绕过有效挣扎。",
    301: "反思大学回应生成式人工智能与学术诚信时，为何不能只依赖检测与处分，而要处理压力、同伴规范、错误信息与核实能力。",
    300: "主张物理治疗学生应先自行推理，再咨询人工智能，并继续为临床判断负责。",
  },
};

const postImages = {
  329: "ai-assessment-two-lane.webp",
  328: "conference-to-monday-practice.webp",
  327: "guest-lecturer-curriculum.webp",
  326: "group-work-visible-thinking.webp",
  325: "content-mastery-quizzes-visible.webp",
  324: "simulation-room-beginning.webp",
  323: "vr-demonstration-learning-experience.webp",
  322: "vr-novelty-curriculum-integration.webp",
  321: "clinical-education-triangle-reconstruction.webp",
  320: "practising-what-we-teach-traction.webp",
  319: "beyond-right-answer-explanation.webp",
  318: "ai-calendar-boundaries.webp",
  317: "ai-integration-learning-theory.webp",
  316: "should-i-use-ai-health-care-ai.webp",
  315: "ai-authenticity-fatigue.webp",
  314: "classroom-to-clinic-train-readiness.webp",
  313: "role-rotation-simulation-v2.webp",
  312: "lecturer-ai-literacy.webp",
  311: "ai-curriculum-design.webp",
  310: "hkdse-results-reflection.jpeg",
  309: "assessment-ai-constructive-alignment.svg",
  308: "student-quotients-ai-era.webp",
  307: "ai-questioning-clinical-reasoning.webp",
  306: "physio-chatgpt-literacy.webp",
  305: "ai-assessment-review.webp",
  304: "teaching-excellence-award.webp",
  303: "ai-academic-acceleration.webp",
  302: "productive-struggle-ai.webp",
  301: "ai-policy-integrity.webp",
  300: "ai-thinking-partner.webp",
  256: "academic-ai-agent.webp",
  226: "teaching-learning-conference.webp",
  254: "two-graduations.webp",
  227: "admissions-interview.webp",
  217: "inclusive-student-support.webp",
  215: "student-mental-health-support.webp",
  200: "vr-platform-comparison.webp",
  189: "wireless-vr-setup.webp",
  181: "vr-setup-reflection.webp",
  175: "virtual-anatomy.webp",
  146: "student-success.webp",
  137: "phd-journey.webp",
};

const usedPostImages = new Map();
const usedPostImageHashes = new Map();
for (const post of posts) {
  const image = postImages[post.ID];
  if (!image) {
    throw new Error(`Post ${post.ID} does not have a feature image.`);
  }
  if (usedPostImages.has(image)) {
    throw new Error(`Posts ${usedPostImages.get(image)} and ${post.ID} reuse feature image "${image}".`);
  }
  const imagePath = path.join(root, "assets", "post-images", image);
  const imageHash = createHash("sha256").update(fs.readFileSync(imagePath)).digest("hex");
  if (usedPostImageHashes.has(imageHash)) {
    throw new Error(`Posts ${usedPostImageHashes.get(imageHash)} and ${post.ID} use identical feature-image files.`);
  }
  usedPostImages.set(image, post.ID);
  usedPostImageHashes.set(imageHash, post.ID);
}

const postImageAlts = {
  en: {
    329: "A student raises a hand during a classroom presentation on shoulder mobility in health professions education.",
    328: "Tak Wing Yu stands at the welcome display for the World Physiotherapy Congress 2025 in Tokyo.",
    327: "A cropped lecture slide introduces a Movement Science guest session on sport analysis and baseball throwing.",
    326: "Students' hands, tablets and learning materials arranged around a table during a group activity, with faces excluded from the frame.",
    325: "Tak Wing Yu presents work on end-of-lecture content-mastery quizzes in physiotherapy education.",
    324: "An empty clinical simulation teaching room with hospital beds, patient simulators and space for group debriefing.",
    323: "Tak Wing Yu demonstrates a virtual reality activity beside a mirrored display and several headsets in a teaching room.",
    322: "Tak Wing Yu presents the seven-step VRILO design pathway and a session on moving virtual reality from novelty to curriculum integration at IPCRF 2026.",
    321: "An illustrative reconstruction of physiotherapy students speaking with a clinical educator and visiting lecturer in a generic placement setting.",
    320: "Tak Wing Yu experiences a cervical traction setup while the equipment is adjusted in a physiotherapy teaching room.",
    319: "A physiotherapy student measures elbow extension while an educator uses follow-up questions to make the learner's anatomical and clinical reasoning visible.",
    318: "An educator compares two AI-assisted calendar pathways: one completes verified updates while the other pauses at a permission boundary.",
    317: "A health professions educator and students build knowledge through dialogue, reflection, authentic context and connected professional perspectives.",
    316: "A health professions educator and students make an accountable AI-supported decision while considering context, shared responsibility and equity.",
    315: "A writer preserving a distinctive personal draft while many uniform polished pages flow through an academic workspace.",
    314: "Physiotherapy learners moving from classroom and simulation towards supervised clinical participation and increasing autonomy.",
    313: "Physiotherapy students rotating between clinician, peer patient, observer and peer debriefer roles in a psychologically safe simulation laboratory.",
    312: "A diverse group of health professions lecturers developing practical AI literacy together in a faculty workshop.",
    311: "Educators collaboratively designing a human-centred health professions curriculum with AI as one supporting component.",
    310: "A photo collage showing Tak Wing Yu at a Hong Kong student information session, including speaking on stage and programme materials for prospective applicants.",
    309: "An editorial illustration of constructive alignment, AI use and assessment design in higher education.",
    308: "An editorial illustration of student development quotients surrounding learning in the AI era.",
    307: "An editorial illustration of AI asking clinical reasoning questions before providing answers.",
    306: "An editorial illustration of physiotherapy students learning critical AI literacy with ChatGPT.",
    305: "An editorial illustration of an educator reviewing AI-generated assessment questions for validity.",
    304: "A stylised cartoon Chinese male academic educator holding a teaching excellence award in a university teaching and innovation setting.",
    256: "An academic at a desk using a carefully structured AI-assisted workflow.",
    226: "Educators discussing artificial intelligence and teaching practice at a conference.",
    254: "Graduates connected across university settings in South Africa and Hong Kong.",
    227: "A university admissions interviewer in a thoughtful conversation with an applicant.",
    217: "An inclusive health-sciences classroom offering varied ways to participate and learn.",
    215: "A lecturer discreetly supporting a distressed student during an examination.",
    200: "Virtual reality headsets presented alongside a spatial anatomy learning environment.",
    189: "A wireless VR headset prepared within a safe health-sciences teaching space.",
    181: "An educator testing a virtual reality system in a simulation classroom.",
    175: "A learner exploring virtual anatomy with a headset and anatomical teaching models.",
    146: "Physiotherapy students collaborating around a patient case and learning resources.",
    137: "A researcher following a long path of books and manuscript pages towards a study.",
    303: "A researcher directing fast AI-assisted academic workflows while protecting reflective judgement.",
    302: "A student stepping beyond a protective learning bubble while using AI as support rather than a shortcut.",
    301: "A lecturer reviewing an AI-assisted university policy draft while students discuss academic integrity and responsible use.",
    300: "A physiotherapy educator and student using AI as a secondary thinking aid during clinical reasoning.",
  },
  "zh-hant": {
    329: "健康專業教育課堂上，一名學生在肩關節活動度簡報期間舉手提問。",
    328: "庾德榮站在東京 2025 世界物理治療大會的歡迎展板前。",
    327: "經裁切的課堂投影片，介紹一節以運動分析及棒球投擲為題的運動科學客席課堂。",
    326: "小組活動期間，學生的雙手、平板電腦及學習材料放在桌上，畫面沒有包含任何臉孔。",
    325: "庾德榮分享物理治療教育中課堂結束內容掌握小測的工作。",
    324: "空置臨床模擬教學室，設有病床、病人模擬器及小組解說空間。",
    323: "庾德榮在教學室內，於同步顯示屏及多部頭戴裝置旁示範虛擬實境活動。",
    322: "庾德榮於 IPCRF 2026 介紹七步 VRILO 設計路徑，以及如何把虛擬實境由新奇體驗推進至課程整合。",
    321: "重構插圖：物理治療學生在通用臨床實習環境中，與臨床導師及到訪導師交流。",
    320: "庾德榮在物理治療教學室內體驗頸椎牽引裝置，設備正在接受調校。",
    319: "物理治療學生量度肘關節伸展角度，教師以追問使學生的解剖及臨床推理過程變得可見。",
    318: "教育工作者比較兩種人工智能輔助日曆工作流程：一種完成經核實的更新，另一種在權限界線前暫停。",
    317: "健康專業教師與學生透過對話、反思、真實情境及相互連結的專業視角共同建構知識。",
    316: "健康專業教師與學生在考慮情境、共同責任及公平的同時，作出可問責的人工智能輔助決定。",
    315: "一位寫作者在大量格式一致的精修文章之中，保留具個人特色的初稿。",
    314: "物理治療學生由課堂和模擬學習，逐步走向受督導的臨床參與及更高自主性。",
    313: "物理治療學生在具心理安全感的模擬實驗室中，輪流擔任臨床學習者、同儕病人、觀察者及同儕反思引導者。",
    312: "一群多元健康專業教師在工作坊中共同發展實用人工智能素養。",
    311: "教育工作者共同設計以人為本的健康專業課程，人工智能只是其中一個支援部分。",
    310: "Tak Wing Yu 於香港學生資訊講座中的照片拼貼，包括台上分享及課程資訊畫面。",
    309: "關於建構性配合、人工智能使用與高等教育評估設計的編輯插圖。",
    308: "人工智能時代學生發展能力框架的編輯插圖。",
    307: "人工智能在提供答案前先提出臨床推理問題的編輯插圖。",
    306: "物理治療學生學習批判性人工智能素養的編輯插圖。",
    305: "教師審核人工智能生成評估題目效度的編輯插圖。",
    304: "一位卡通風格的華人男性大學教師在教學與創新場景中手持教學卓越獎。",
    256: "大學教師在書桌前運用經審慎規劃的人工智能輔助工作流程。",
    226: "教育工作者在會議上討論人工智能與教學實踐。",
    254: "南非與香港兩個大學場景中的畢業生彼此連繫。",
    227: "大學招生面試官與申請人進行審慎而平等的對話。",
    217: "提供多元參與及學習方式的共融健康科學課堂。",
    215: "教師在考試期間私下支援情緒受困的學生。",
    200: "虛擬實境頭戴裝置與空間解剖學學習環境。",
    189: "在安全的健康科學教學空間內完成設定的無線 VR 頭戴裝置。",
    181: "教育工作者在模擬課室測試虛擬實境系統。",
    175: "學習者使用頭戴裝置及解剖教學模型探索虛擬解剖學。",
    146: "物理治療學生圍繞病人個案及學習資源協作。",
    137: "研究者沿着由書籍與論文稿件組成的漫長道路前行。",
    303: "研究者引導快速的人工智能輔助學術工作流程，同時保留反思與判斷空間。",
    302: "學生走出受保護的學習泡泡，把人工智能作為支援而不是捷徑。",
    301: "教師審閱人工智能輔助撰寫的大學政策草稿，學生在旁討論學術誠信與負責任使用。",
    300: "物理治療教師與學生在臨床推理中把人工智能作為輔助思考工具。",
  },
  "zh-hans": {
    329: "健康专业教育课堂上，一名学生在肩关节活动度演示期间举手提问。",
    328: "庾德荣站在东京 2025 世界物理治疗大会的欢迎展板前。",
    327: "经裁切的课堂幻灯片，介绍一节以运动分析及棒球投掷为题的运动科学客席课堂。",
    326: "小组活动期间，学生的双手、平板电脑及学习材料放在桌上，画面没有包含任何面孔。",
    325: "庾德荣分享物理治疗教育中课后内容掌握小测的工作。",
    324: "空置临床模拟教学室，设有病床、患者模拟器及小组复盘空间。",
    323: "庾德荣在教学室内，于同步显示屏及多部头戴设备旁示范虚拟现实活动。",
    322: "庾德荣于 IPCRF 2026 介绍七步 VRILO 设计路径，以及如何把虚拟现实从新奇体验推进至课程整合。",
    321: "重构插图：物理治疗学生在通用临床实习环境中，与临床导师及到访导师交流。",
    320: "庾德荣在物理治疗教学室内体验颈椎牵引装置，设备正在接受调校。",
    319: "物理治疗学生测量肘关节伸展角度，教师以追问使学生的解剖及临床推理过程变得可见。",
    318: "教育工作者比较两种人工智能辅助日历工作流程：一种完成经核实的更新，另一种在权限界线前暂停。",
    317: "健康专业教师与学生通过对话、反思、真实情境及相互连接的专业视角共同建构知识。",
    316: "健康专业教师与学生在考虑情境、共同责任及公平的同时，作出可问责的人工智能辅助决定。",
    315: "一位写作者在大量格式一致的精修文章之中，保留具个人特色的初稿。",
    314: "物理治疗学生由课堂和模拟学习，逐步走向受指导的临床参与及更高自主性。",
    313: "物理治疗学生在具心理安全感的模拟实验室中，轮流担任临床学习者、同伴患者、观察者及同伴复盘引导者。",
    312: "一群多元健康专业教师在工作坊中共同发展实用人工智能素养。",
    311: "教育工作者共同设计以人为本的健康专业课程，人工智能只是其中一个支持部分。",
    310: "Tak Wing Yu 于香港学生资讯讲座中的照片拼贴，包括台上分享及课程资讯画面。",
    309: "关于建构性配合、人工智能使用与高等教育评估设计的编辑插图。",
    308: "人工智能时代学生发展能力框架的编辑插图。",
    307: "人工智能在提供答案前先提出临床推理问题的编辑插图。",
    306: "物理治疗学生学习批判性人工智能素养的编辑插图。",
    305: "教师审核人工智能生成评估题目效度的编辑插图。",
    304: "一位卡通风格的华人男性大学教师在教学与创新场景中手持教学卓越奖。",
    256: "大学教师在书桌前运用经过审慎规划的人工智能辅助工作流程。",
    226: "教育工作者在会议上讨论人工智能与教学实践。",
    254: "南非与香港两个大学场景中的毕业生彼此连接。",
    227: "大学招生面试官与申请人进行审慎而平等的对话。",
    217: "提供多元参与及学习方式的包容性健康科学课堂。",
    215: "教师在考试期间私下支持情绪受困的学生。",
    200: "虚拟现实头戴设备与空间解剖学学习环境。",
    189: "在安全的健康科学教学空间内完成设置的无线 VR 头戴设备。",
    181: "教育工作者在模拟教室测试虚拟现实系统。",
    175: "学习者使用头戴设备及解剖教学模型探索虚拟解剖学。",
    146: "物理治疗学生围绕患者个案及学习资源协作。",
    137: "研究者沿着由书籍与论文稿件组成的漫长道路前行。",
    303: "研究者引导快速的人工智能辅助学术工作流程，同时保留反思与判断空间。",
    302: "学生走出受保护的学习泡泡，把人工智能作为支持而不是捷径。",
    301: "教师审阅人工智能辅助撰写的大学政策草稿，学生在旁讨论学术诚信与负责任使用。",
    300: "物理治疗教师与学生在临床推理中把人工智能作为辅助思考工具。",
  },
};

const postImageCaptions = {
  en: {
    328: "At the World Physiotherapy Congress 2025 in Tokyo. The lasting value of a conference is what changes after returning home.",
    327: "The opening slide from a guest session on sport analysis and baseball throwing. The photograph is cropped to exclude identifiable participants.",
    326: "A real classroom activity, cropped to focus on learning materials and protect student privacy.",
    325: "Presenting work on end-of-lecture content-mastery quizzes in physiotherapy education.",
    324: "An empty simulation room before learners enter: the facility creates possibilities, while the learning still needs to be designed.",
    323: "Demonstrating a VR activity in a teaching room. The headset provides access; the learning experience requires design around it.",
    322: "Presenting the seven-step VRILO design pathway at the EdUHK International Postgraduate Conference and Research Forum 2026.",
    321: "Illustrative reconstruction based on a clinical education visit. All people and identifying details are synthetic or altered to protect privacy.",
    320: "Experiencing a cervical traction setup from the other side of the treatment table.",
  },
  "zh-hant": {
    328: "攝於東京 2025 世界物理治療大會。會議的持久價值，在於回到日常工作後所帶來的改變。",
    327: "運動分析及棒球投擲客席課堂的開場投影片。照片已裁切，以免出現可識別參與者。",
    326: "真實課堂活動照片，經裁切後聚焦學習材料並保障學生私隱。",
    325: "分享物理治療教育中課堂結束內容掌握小測的工作。",
    324: "學生進場前的空置模擬教學室：設施帶來可能，學習仍需要被設計。",
    323: "在教學室示範 VR 活動：頭戴裝置提供進入環境的途徑，學習經驗仍需要周全設計。",
    322: "於香港教育大學 2026 國際研究生會議暨研究論壇介紹七步 VRILO 設計路徑。",
    321: "根據一次臨床教育探訪重構的示意影像。所有人物及可識別資料均為合成或經過修改，以保障私隱。",
    320: "從治療床的另一端，親身體驗頸椎牽引裝置。",
  },
  "zh-hans": {
    328: "摄于东京 2025 世界物理治疗大会。会议的持久价值，在于回到日常工作后所带来的改变。",
    327: "运动分析及棒球投掷客席课堂的开场幻灯片。照片已裁切，以免出现可识别参与者。",
    326: "真实课堂活动照片，经裁切后聚焦学习材料并保护学生隐私。",
    325: "分享物理治疗教育中课后内容掌握小测的工作。",
    324: "学生进场前的空置模拟教学室：设施带来可能，学习仍需要被设计。",
    323: "在教学室示范 VR 活动：头戴设备提供进入环境的途径，学习体验仍需要周全设计。",
    322: "于香港教育大学 2026 国际研究生会议暨研究论坛介绍七步 VRILO 设计路径。",
    321: "根据一次临床教育探访重构的示意影像。所有人物及可识别资料均为合成或经过修改，以保护隐私。",
    320: "从治疗床的另一端，亲身体验颈椎牵引装置。",
  },
};

const locales = {
  en: {
    lang: "en",
    displayName: "Tak Wing Yu",
    label: "English",
    shortLabel: "EN",
    path: "",
    dateLocale: "en-GB",
    siteName: `${profile.name} | ${profile.headline}`,
    description:
      "Academic portfolio and public notebook of Tak Wing Yu, a physiotherapy educator and researcher working in artificial intelligence, virtual reality, clinical reasoning, educational technology, and health professions education.",
    ogDescription:
      "Research, teaching, publications, and reflective writing on physiotherapy, artificial intelligence, virtual reality, clinical reasoning, and health professions education.",
    siteTagline: "Physiotherapy Education, Teaching and Learning, and Innovation.",
    nav: {
      home: "Home",
      about: "About",
      research: "Research",
      publications: "Publications",
      teaching: "Teaching",
      writing: "Writing",
      cv: "CV",
      contact: "Contact",
      notes: "Notes",
    },
    search: "Search",
    searchPlaceholder: "Search Tak Wing Yu's portfolio",
    theme: "Toggle theme",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    heroEyebrow: "Physiotherapy education · teaching and learning · innovation",
    profileLabel: "Author profile",
    continueReading: "Continue reading",
    copyright: "Academic portfolio and public notebook.",
    backArchive: "Back to writing",
    categories: { physio: "Physio", ai: "AI", reflection: "Reflection", post: "Writing" },
    contactAction: "Email Tak Wing Yu",
    writingArchiveLabel: "Browse all writing",
    translatedPlaceholderLabel: "Chinese translation pending review",
  },
  "zh-hant": {
    lang: "zh-Hant",
    displayName: "庾德榮",
    label: "繁體中文",
    shortLabel: "繁",
    path: "zh-hant",
    dateLocale: "zh-HK",
    siteName: "庾德榮的學術專頁",
    description: "聚焦物理治療教育、教育科技與反思實踐的學術作品集。",
    ogDescription: "研究、教學、出版及有關物理治療教育與新興科技的反思寫作。",
    siteTagline: "物理治療教育、教與學及創新",
    nav: {
      home: "主頁",
      about: "關於",
      research: "研究",
      publications: "出版",
      teaching: "教學",
      writing: "寫作",
      cv: "履歷",
      contact: "聯絡",
      notes: "筆記",
    },
    search: "搜尋",
    searchPlaceholder: "搜尋庾德榮的學術作品",
    theme: "切換顯示主題",
    menuOpen: "開啟導覽選單",
    menuClose: "關閉導覽選單",
    heroEyebrow: "物理治療教育 · 教育科技 · 反思實踐",
    profileLabel: "作者簡介",
    continueReading: "繼續閱讀",
    copyright: "物理治療學術作品集。",
    backArchive: "返回寫作",
    categories: { physio: "物理治療", ai: "人工智能", reflection: "反思", post: "寫作" },
    contactAction: "電郵聯絡庾德榮",
    writingArchiveLabel: "瀏覽所有文章",
    translatedPlaceholderLabel: "中文頁面待審閱",
  },
  "zh-hans": {
    lang: "zh-Hans",
    displayName: "庾德荣",
    label: "简体中文",
    shortLabel: "简",
    path: "zh-hans",
    dateLocale: "zh-CN",
    siteName: "庾德荣的学术专页",
    description: "聚焦物理治疗教育、教育科技与反思实践的学术作品集。",
    ogDescription: "研究、教学、出版及有关物理治疗教育与新兴科技的反思写作。",
    siteTagline: "物理治疗教育、教与学及创新",
    nav: {
      home: "主页",
      about: "关于",
      research: "研究",
      publications: "出版",
      teaching: "教学",
      writing: "写作",
      cv: "履历",
      contact: "联系",
      notes: "笔记",
    },
    search: "搜索",
    searchPlaceholder: "搜索庾德荣的学术作品",
    theme: "切换显示主题",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    heroEyebrow: "物理治疗教育 · 教育科技 · 反思实践",
    profileLabel: "作者简介",
    continueReading: "继续阅读",
    copyright: "物理治疗学术作品集。",
    backArchive: "返回写作",
    categories: { physio: "物理治疗", ai: "人工智能", reflection: "反思", post: "写作" },
    contactAction: "发送邮件给庾德荣",
    writingArchiveLabel: "浏览所有文章",
    translatedPlaceholderLabel: "中文页面待审阅",
  },
};

const categories = (post) => Object.keys(post.categories || {});

const localizePersonalName = (value, localeKey) => {
  if (localeKey === "en") return String(value);
  return String(value)
    .replaceAll("Tak Wing Yu", locales[localeKey].displayName)
    .replaceAll("Tak Wing", locales[localeKey].displayName);
};
const categoryCount = posts.reduce((acc, post) => {
  for (const category of categories(post)) acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});

const aiPostIds = new Set([329, 318, 317, 316, 315, 312, 311, 309, 307, 306, 305, 303, 301, 300, 256, 226]);
const physioPostIds = new Set([327, 326, 325, 324, 323, 322, 321, 320, 319, 314, 313, 217, 215, 200, 189, 181, 175, 146]);
const practiceNotePostIds = new Set([327, 326, 325, 324, 323, 322, 321, 320]);

const postGroupKey = (post) => {
  if (aiPostIds.has(post.ID)) return "ai";
  if (physioPostIds.has(post.ID)) return "physio";
  return "reflection";
};

const titleFor = (post, localeKey) =>
  postTitles[localeKey]?.[post.ID] || decodeEntities(post.title);

const summaryFor = (post, localeKey, length = 190) => {
  if (postSummaries[localeKey]?.[post.ID]) return postSummaries[localeKey][post.ID];
  const text = stripHtml(post?.excerpt || post?.content || "");
  return `${text.slice(0, length)}${text.length > length ? "..." : ""}`;
};

const categoryFor = (post, locale) => locale.categories[postGroupKey(post)] || locale.categories.post;

const groupedPosts = {
  physio: posts.filter((post) => postGroupKey(post) === "physio"),
  ai: posts.filter((post) => postGroupKey(post) === "ai"),
  reflection: posts.filter((post) => postGroupKey(post) === "reflection"),
};

const homepageWritingGroups = [
  {
    key: "physio",
    title: { en: "Physio", "zh-hant": "物理治療", "zh-hans": "物理治疗" },
    description: {
      en: "Clinical teaching, student support, and physiotherapy education.",
      "zh-hant": "聚焦臨床教學、學生支援，以及物理治療教育。",
      "zh-hans": "聚焦临床教学、学生支持，以及物理治疗教育。",
    },
  },
  {
    key: "ai",
    title: { en: "AI", "zh-hant": "人工智能", "zh-hans": "人工智能" },
    description: {
      en: "Artificial intelligence, academic practice, and responsible educational use.",
      "zh-hant": "聚焦人工智能、學術實踐，以及具教育目的的負責任應用。",
      "zh-hans": "聚焦人工智能、学术实践，以及具教育目的的负责任应用。",
    },
  },
  {
    key: "reflection",
    title: { en: "Reflection", "zh-hant": "反思", "zh-hans": "反思" },
    description: {
      en: "Professional reflection, academic milestones, and wider teaching practice.",
      "zh-hant": "聚焦專業反思、學術里程碑，以及更廣泛的教學實踐。",
      "zh-hans": "聚焦专业反思、学术里程碑，以及更广泛的教学实践。",
    },
  },
];

const writingPageContent = {
  en: {
    title: "Writing",
    intro: "A grouped archive of blog posts and reflective essays on physiotherapy education, artificial intelligence, and academic practice.",
    categoryLabel: "Category",
    allLabel: "View all writing",
    latestEyebrow: "Latest writing",
    latestTitle: "New ideas and reflections",
    latestIntro: "The newest work, followed by recent essays from across the public notebook.",
    recentLabel: "Recent writing",
    readArticle: "Read article",
    practiceLabel: "Practice Note",
    practiceEyebrow: "From practice",
    practiceTitle: "Practice Notes",
    practiceIntro: "Short, photograph-led reflections on clinical education, teaching encounters, and what I am learning from practice.",
    archiveEyebrow: "Complete collection",
    archiveTitle: "Browse by subject",
    archiveIntro: "Every article appears once below, organised by its main subject.",
    articlesLabel: "articles",
    minuteRead: "min read",
    groupDescriptions: {
      physio: "Posts on physiotherapy education, clinical reasoning, virtual reality, student support, and health professions teaching.",
      ai: "Posts on artificial intelligence, academic workflows, assessment, policy, and responsible educational use.",
      reflection: "Posts on professional reflection, academic milestones, teaching practice, and wider university life.",
    },
  },
  "zh-hant": {
    title: "寫作",
    intro: "按主題整理的文章與反思，涵蓋物理治療教育、人工智能，以及學術實踐。",
    categoryLabel: "分類",
    allLabel: "瀏覽所有文章",
    latestEyebrow: "最新文章",
    latestTitle: "最新想法與反思",
    latestIntro: "先閱讀最新文章，再探索公開筆記本中近期的文章。",
    recentLabel: "近期文章",
    readArticle: "閱讀文章",
    practiceLabel: "實踐筆記",
    practiceEyebrow: "來自實踐",
    practiceTitle: "實踐筆記",
    practiceIntro: "以照片帶出臨床教育、教學經歷，以及我從實踐中所學的簡短反思。",
    archiveEyebrow: "完整文章庫",
    archiveTitle: "按主題瀏覽",
    archiveIntro: "以下每篇文章只會出現一次，並按主要主題整理。",
    articlesLabel: "篇文章",
    minuteRead: "分鐘閱讀",
    groupDescriptions: {
      physio: "涵蓋物理治療教育、臨床推理、虛擬實境、學生支援及健康專業教學。",
      ai: "涵蓋人工智能、學術工作流程、評估、政策及具教育目的的負責任應用。",
      reflection: "涵蓋專業反思、學術里程碑、教學實踐及更廣泛的大學生活。",
    },
  },
  "zh-hans": {
    title: "写作",
    intro: "按主题整理的文章与反思，涵盖物理治疗教育、人工智能，以及学术实践。",
    categoryLabel: "分类",
    allLabel: "浏览所有文章",
    latestEyebrow: "最新文章",
    latestTitle: "最新想法与反思",
    latestIntro: "先阅读最新文章，再探索公开笔记本中近期的文章。",
    recentLabel: "近期文章",
    readArticle: "阅读文章",
    practiceLabel: "实践笔记",
    practiceEyebrow: "来自实践",
    practiceTitle: "实践笔记",
    practiceIntro: "以照片带出临床教育、教学经历，以及我从实践中所学的简短反思。",
    archiveEyebrow: "完整文章库",
    archiveTitle: "按主题浏览",
    archiveIntro: "以下每篇文章只会出现一次，并按主要主题整理。",
    articlesLabel: "篇文章",
    minuteRead: "分钟阅读",
    groupDescriptions: {
      physio: "涵盖物理治疗教育、临床推理、虚拟现实、学生支持及健康专业教学。",
      ai: "涵盖人工智能、学术工作流程、评估、政策及具教育目的的负责任应用。",
      reflection: "涵盖专业反思、学术里程碑、教学实践及更广泛的大学生活。",
    },
  },
};

const academicPageContent = {
  en: {
    profile: {
      headline: profile.headline,
      secondaryHeadline: profile.secondaryHeadline,
      appointment: profile.appointment,
      school: profile.school,
      institution: profile.institution,
      portraitAlt: "Portrait of Tak Wing Yu.",
    },
    home: {
      heroSummary: homepageContent.heroSummary,
      biography: homepageContent.biography,
      highlights: homepageContent.highlights,
      profileEyebrow: "Profile",
      profileTitle: "Brief academic profile",
      recognitionEyebrow: "Recognition",
      recognitionTitle: "Award and recognition",
      recognitionIntro: "A focused acknowledgement of recent recognition in teaching and educational innovation.",
      awardLabel: "Award",
      award: homepageContent.awardCard,
      writingEyebrow: "Writing",
      writingTitle: "Latest writing",
      writingIntro: "Reflective writing, public scholarship, and blog posts on teaching, learning, AI, VR, and academic work.",
      writingCategoriesLabel: "Writing categories",
      notesEyebrow: "Notes",
      notesTitle: "Browse the academic notes library",
      notesIntro: "This section links to the public notes library rather than the blog archive, so working ideas and notebook entries stay clearly separate from published writing.",
      notesAction: "Open notes library",
    },
    about: {
      description: englishPagePlaceholders.about.description,
      biography: aboutContent.biography,
      imageAlt: "Professional profile card of Tak Wing Yu with academic title and research interests.",
      labels: {
        title: "About", profile: "Profile", appointment: "Current appointment", background: "Background",
        educationRegistration: "Education and registration", education: "Education", registration: "Professional registration",
        research: "Research", interests: "Research interests", service: "Service", leadership: "Selected academic leadership and service",
        cvEyebrow: "CV highlights", cvTitle: "Professional profile at a glance", award: "Award",
      },
      currentAppointment: aboutContent.currentAppointment,
      secondaryAppointment: ["Research Fellow", "Community and Health Sciences", "University of the Western Cape"],
      education: aboutContent.education,
      registration: aboutContent.registration,
      researchInterests: aboutContent.researchInterests,
      leadershipService: aboutContent.leadershipService,
      cvIntro: cvContent.intro,
      cvSections: cvContent.sections,
    },
    research: {
      description: englishPagePlaceholders.research.description,
      intro: researchContent.intro,
      themes: homepageContent.researchThemes,
      projects: homepageContent.currentProjects,
      labels: {
        title: "Research", profilesEyebrow: "Profiles", profilesTitle: "Research profiles",
        profilesIntro: "External research records linked from this site.", noProfiles: "No external research profiles are currently listed.",
        projectsEyebrow: "Projects", projectsTitle: "Current projects", projectsIntro: "Developing and current work is clearly labelled below.",
        publicationsEyebrow: "Publications", publicationsTitle: "Publications and scholarly outputs",
        preprintsEyebrow: "Preprints", preprintsTitle: "Preprints and open manuscripts",
        preprintsIntro: "Early-stage or openly posted outputs linked from the public research record.",
      },
      publicationsNotice: publicationsContent.notice,
    },
    teaching: {
      description: englishPagePlaceholders.teaching.description,
      intro: teachingContent.intro,
      spotlights: [
        ["Subject areas", "Practice-oriented physiotherapy education", "Teaching across physiology, anatomy, movement science, advanced health technology, acupuncture practice, and clinical reasoning."],
        ["Educational approach", "Active, constructive, and clinically grounded learning", "Using active learning, case work, simulation, structured feedback, and technology-enhanced activities that support safe professional practice."],
        ["Innovation", "Purposeful use of immersive and digital tools", "Integrating AI-supported learning, digital anatomy resources, and immersive virtual reality only where they serve a clear educational purpose."],
      ],
      areas: homepageContent.teachingAreas,
      approaches: homepageContent.educationalApproaches,
      curriculum: homepageContent.curriculumWork,
      innovation: teachingContent.innovation,
      labels: {
        title: "Teaching", areasEyebrow: "Subject areas", areasTitle: "Subject areas", approachEyebrow: "Approach",
        approachTitle: "Educational approaches", curriculumEyebrow: "Curriculum", curriculumTitle: "Curriculum and assessment work",
        innovation: "Teaching innovation", innovationTitle: "Virtual reality acupuncture learning application",
      },
    },
    contact: {
      description: englishPagePlaceholders.contact.description,
      title: "Contact",
      intro: "University and personal contact details, with academic profile links where available.",
      imageAlt: "Stylised portrait of Tak Wing Yu smiling while wearing a mixed-reality headset.",
      details: "Contact details", profiles: "Academic profiles", profilesIntro: "Follow external research and publication records.",
      universityEmail: "University email", personalEmail: "Personal email",
    },
    redirects: {
      publications: "Publication information has been folded into the Research page to keep the site simpler and easier to navigate.",
      publicationsAction: "View Research",
      cv: "CV content has been merged into the About page to keep the site simpler.",
      cvAction: "View About",
    },
  },
  "zh-hant": {
    profile: {
      headline: "物理治療教育工作者與研究人員",
      secondaryHeadline: "人工智能、虛擬實境、臨床推理與健康專業教育",
      appointment: "物理治療高級講師",
      school: "健康科學院",
      institution: "聖方濟各大學，香港",
      portraitAlt: "庾德榮的專業肖像。",
    },
    home: {
      heroSummary: "研究及設計人工智能、虛擬實境、臨床推理與教育科技在健康專業教育中的有意義應用。",
      biography: [
        "我是香港聖方濟各大學的物理治療教育工作者與研究人員。我的工作聚焦健康專業教育，尤其重視人工智能、虛擬實境、教育科技、評估及臨床推理活動的具明確目的設計與實施。",
        "我的研究與教學建基於一項簡單原則：科技應回應真實的教育需要，而不應只因新穎而引入。我特別關注課程配合、學習設計、無障礙使用、實施方式、學生參與，以及學習成果如何轉移至專業實踐。",
        "這個網站結合我的學術作品集與公開筆記本，記錄我對教學、學習、研究、學術工作及新興科技的反思。",
      ],
      highlights: [["教學卓越獎", "2026"], ["完成物理治療博士學位", "2026"], ["現任職位", "物理治療高級講師"], ["專業註冊", "香港註冊物理治療師"]],
      profileEyebrow: "簡介", profileTitle: "學術簡介", recognitionEyebrow: "肯定", recognitionTitle: "獎項與肯定",
      recognitionIntro: "近期在教學與教育創新方面獲得的肯定。", awardLabel: "獎項",
      award: { title: "教學卓越獎，2026", summary: "表揚以學生為本的教學、教育創新、課程發展，以及在物理治療教育中有目的地運用科技。" },
      writingEyebrow: "寫作", writingTitle: "最新文章", writingIntro: "關於教學、學習、人工智能、虛擬實境及學術工作的反思文章與公共學術寫作。",
      writingCategoriesLabel: "文章分類", notesEyebrow: "筆記", notesTitle: "瀏覽學術筆記庫",
      notesIntro: "此處連結至公開筆記庫，而不是網誌文章存檔，讓發展中的想法與正式文章保持清楚區分。", notesAction: "開啟筆記庫",
    },
    about: {
      description: "庾德榮的專業背景、現任職務與學術簡介。",
      biography: ["庾德榮是物理治療教育工作者與研究人員，工作聚焦健康專業教育、教育科技、臨床推理及課程設計。", "他的工作連結物理治療、教學創新與應用學術研究，特別關注人工智能、虛擬實境、評估、無障礙使用，以及具意義學習經驗的設計。"],
      imageAlt: "展示庾德榮學術職銜與研究興趣的專業簡介卡。",
      labels: { title: "關於", profile: "簡介", appointment: "現任職務", background: "背景", educationRegistration: "學歷與專業註冊", education: "學歷", registration: "專業註冊", research: "研究", interests: "研究興趣", service: "服務", leadership: "精選學術領導與服務", cvEyebrow: "履歷重點", cvTitle: "專業概況", award: "獎項" },
      currentAppointment: ["物理治療高級講師", "健康科學院", "聖方濟各大學，香港"],
      secondaryAppointment: ["研究員", "社區與健康科學學院", "西開普大學"],
      education: ["物理治療學士", "物理治療碩士", "物理治療博士，2026 年完成"], registration: ["香港註冊物理治療師", "南非醫療專業委員會（HPCSA）註冊物理治療師", "英國健康與照護專業委員會（HCPC）註冊物理治療師"],
      researchInterests: ["健康專業教育中的人工智能", "虛擬實境與沉浸式學習", "臨床推理與評估", "學習設計與課程配合", "教育科技的實施與無障礙使用", "動作、復康與運動科技"],
      leadershipService: ["物理治療教育的課程與評估設計", "運用虛擬實境及人工智能輔助學習的教學創新", "內部審核、個案設計及實務評估發展", "教與學相關的員工發展及教育交流"],
      cvIntro: "以下概述目前的學術職務、教學、研究及專業背景。",
      cvSections: [
        { title: "現任職務", items: ["物理治療高級講師", "健康科學院", "聖方濟各大學，香港"] },
        { title: "專業概況", items: ["物理治療教育工作者與研究人員", "研究人工智能、虛擬實境、臨床推理、教育科技及健康專業教育", "透過公開筆記本反思教學、學習、研究及新興科技"] },
        { title: "學歷與註冊", items: ["2026 年完成物理治療博士學位", "香港註冊物理治療師"] },
        { title: "教學與課程工作", items: ["建構性配合與學習設計", "個案為本及主動學習", "虛擬實境與人工智能輔助教學創新", "OSPE 與實務評估設計", "內部審核、評分準則及個案發展"] },
        { title: "研究主題", items: ["健康專業教育中的人工智能", "虛擬實境與沉浸式學習", "臨床推理與評估", "物理治療教育與共融學習設計", "動作、復康與運動科技"] },
        { title: "獎項與肯定", items: ["教學卓越獎，2026"] },
      ],
    },
    research: {
      description: "庾德榮在物理治療與健康專業教育方面的研究主題、現行項目及學術成果。",
      intro: "我的研究位於物理治療、健康專業教育、學習設計與新興科技的交匯點，探討教育創新如何配合課程、持續實施、得到適切評估，並轉化為具意義的學生與專業學習。",
      themes: [
        { title: "健康專業教育中的人工智能", summary: "研究如何負責任地運用人工智能支援學習、教學、評估、回饋、臨床推理與課程設計，並特別關注物理治療教育。" },
        { title: "虛擬實境與沉浸式學習", summary: "設計、實施及評估健康專業教育中的虛擬實境，包括課程配合、學習者準備、無障礙使用、技術支援、真實感、認知負荷與評估。" },
        { title: "臨床推理與評估", summary: "發展及評估能呈現臨床推理、支援回饋，並為安全物理治療實踐作準備的學習活動與評估方法。" },
        { title: "健康專業模擬教育", summary: "研究模擬設計、角色輪換、同儕病人、觀察、解說、心理安全與反思，以及不同模擬角色可能如何支援不同的學習面向與臨床準備。" },
        { title: "物理治療教育與學習設計", summary: "關注以學生為本的教學、建構性配合、主動學習、評估設計、教育科技、模擬及共融學習環境。" },
        { title: "動作、復康與運動科技", summary: "發展涉及生物力學、動作分析、反應訓練、復康、運動表現及科技輔助評估的研究。" },
      ],
      projects: [
        { label: "試點研究", title: "物理治療教育中的人工智能輔助臨床推理", summary: "評估人工智能聊天機械人支援物理治療學生安全篩查及臨床推理的可行性、接受程度與教育價值。" },
        { label: "現行項目", title: "健康專業教育的虛擬實境設計原則", summary: "以設計為本的研究，探討虛擬實境如何配合課程成果、獲得院校支援、以無障礙方式實施，並得到具意義的評估。" },
        { label: "現行項目", title: "虛擬實境輔助針灸學習", summary: "發展具訓練、練習及評估模式的虛擬學習應用程式，並將其整合至物理治療課程。" },
        { label: "現行項目", title: "健康專業模擬教育", summary: "探討臨床學習者、同儕病人、觀察者與同儕反思引導者等角色，可能如何支援本科物理治療模擬中的不同學習面向；角色輪換對臨床能力與準備度的影響仍需進一步研究。" },
        { label: "發展中研究", title: "科技增強的動作與運動研究", summary: "發展涉及反應訓練、動作分析、生物力學、復康及運動專項表現的研究。" },
      ],
      labels: { title: "研究", profilesEyebrow: "學術平台", profilesTitle: "研究平台", profilesIntro: "連結至本站以外的研究及出版紀錄。", noProfiles: "目前未有列出外部研究平台。", projectsEyebrow: "項目", projectsTitle: "現行研究項目", projectsIntro: "以下清楚標示現行及發展中的工作。", publicationsEyebrow: "出版", publicationsTitle: "出版與學術成果", preprintsEyebrow: "預印本", preprintsTitle: "預印本與公開手稿", preprintsIntro: "連結至公開研究紀錄中的早期或公開發布成果。" },
      publicationsNotice: "以下精選出版資料來自公開 ORCID 紀錄，並附有 ORCID 與 Google Scholar 外部連結。正式論文題目及引文保留原文。",
    },
    teaching: {
      description: "庾德榮在物理治療教育方面的教學理念、課程工作與教育創新。",
      intro: "我的教學以學生為本、重視實踐，並以建構性配合為基礎。我致力建立共融而具投入感的學習環境，深化概念理解、發展臨床推理，並為安全及具反思能力的物理治療實踐作準備。",
      spotlights: [["教學範疇", "實踐導向的物理治療教育", "涵蓋生理學、解剖學、動作科學、進階健康科技、針灸實務及臨床推理。"], ["教育方法", "主動、建構及臨床為本的學習", "運用主動學習、個案研習、模擬、結構化回饋及科技增強活動，支援安全專業實踐。"], ["創新", "有目的地運用沉浸式與數碼工具", "只在具明確教育目的時，整合人工智能輔助學習、數碼解剖資源與沉浸式虛擬實境。"]],
      areas: ["人體生理學", "功能解剖學", "動作科學與肌動學", "進階健康科技", "物理治療師針灸實務", "物理治療評估與臨床推理"],
      approaches: ["主動及個案為本學習", "虛擬實境與沉浸式學習", "人工智能輔助學習與回饋", "數碼解剖與三維資源", "模擬與實務評估", "內容掌握測驗", "結構化評分準則與評估設計", "學生反思與口頭答辯"],
      curriculum: ["課程統籌", "持續性與總結性評估", "OSPE 與實務評估設計", "內部審核", "評分準則與個案發展", "課程配合", "教與學員工發展"],
      innovation: "目前一項教學創新是發展並整合具訓練、練習及評估模式的虛擬實境針灸學習應用程式。",
      labels: { title: "教學", areasEyebrow: "教學範疇", areasTitle: "教學範疇", approachEyebrow: "方法", approachTitle: "教育方法", curriculumEyebrow: "課程", curriculumTitle: "課程與評估工作", innovation: "教學創新", innovationTitle: "虛擬實境針灸學習應用程式" },
    },
    contact: { description: "庾德榮的大學及個人聯絡資料與學術平台連結。", title: "聯絡", intro: "大學及個人聯絡資料，以及可用的學術平台連結。", imageAlt: "庾德榮戴着混合實境頭戴裝置並微笑的風格化肖像。", details: "聯絡資料", profiles: "學術平台", profilesIntro: "瀏覽外部研究及出版紀錄。", universityEmail: "大學電郵", personalEmail: "個人電郵" },
    redirects: { publications: "出版資料已整合至研究頁面，讓網站更簡潔易用。", publicationsAction: "瀏覽研究", cv: "履歷內容已整合至關於頁面，讓網站更簡潔。", cvAction: "瀏覽關於" },
  },
  "zh-hans": {
    profile: { headline: "物理治疗教育工作者与研究人员", secondaryHeadline: "人工智能、虚拟现实、临床推理与健康专业教育", appointment: "物理治疗高级讲师", school: "健康科学学院", institution: "圣方济各大学，香港", portraitAlt: "庾德荣的专业肖像。" },
    home: {
      heroSummary: "研究及设计人工智能、虚拟现实、临床推理与教育科技在健康专业教育中的有意义应用。",
      biography: ["我是香港圣方济各大学的物理治疗教育工作者与研究人员。我的工作聚焦健康专业教育，尤其重视人工智能、虚拟现实、教育科技、评估及临床推理活动的有明确目的的设计与实施。", "我的研究与教学基于一项简单原则：科技应回应真实的教育需要，而不应只因新颖而引入。我特别关注课程衔接、学习设计、无障碍使用、实施方式、学生参与，以及学习成果如何迁移至专业实践。", "这个网站结合我的学术作品集与公开笔记本，记录我对教学、学习、研究、学术工作及新兴科技的反思。"],
      highlights: [["教学卓越奖", "2026"], ["完成物理治疗博士学位", "2026"], ["现任职位", "物理治疗高级讲师"], ["专业注册", "香港注册物理治疗师"]],
      profileEyebrow: "简介", profileTitle: "学术简介", recognitionEyebrow: "肯定", recognitionTitle: "奖项与肯定", recognitionIntro: "近期在教学与教育创新方面获得的肯定。", awardLabel: "奖项",
      award: { title: "教学卓越奖，2026", summary: "表彰以学生为本的教学、教育创新、课程发展，以及在物理治疗教育中有目的地运用科技。" },
      writingEyebrow: "写作", writingTitle: "最新文章", writingIntro: "关于教学、学习、人工智能、虚拟现实及学术工作的反思文章与公共学术写作。", writingCategoriesLabel: "文章分类",
      notesEyebrow: "笔记", notesTitle: "浏览学术笔记库", notesIntro: "此处链接至公开笔记库，而不是博客文章存档，让发展中的想法与正式文章保持清楚区分。", notesAction: "打开笔记库",
    },
    about: {
      description: "庾德荣的专业背景、现任职务与学术简介。",
      biography: ["庾德荣是物理治疗教育工作者与研究人员，工作聚焦健康专业教育、教育科技、临床推理及课程设计。", "他的工作连接物理治疗、教学创新与应用学术研究，特别关注人工智能、虚拟现实、评估、无障碍使用，以及有意义学习体验的设计。"],
      imageAlt: "展示庾德荣学术职衔与研究兴趣的专业简介卡。",
      labels: { title: "关于", profile: "简介", appointment: "现任职务", background: "背景", educationRegistration: "学历与专业注册", education: "学历", registration: "专业注册", research: "研究", interests: "研究兴趣", service: "服务", leadership: "精选学术领导与服务", cvEyebrow: "履历重点", cvTitle: "专业概况", award: "奖项" },
      currentAppointment: ["物理治疗高级讲师", "健康科学学院", "圣方济各大学，香港"], secondaryAppointment: ["研究员", "社区与健康科学学院", "西开普大学"], education: ["物理治疗学士", "物理治疗硕士", "物理治疗博士，2026 年完成"], registration: ["香港注册物理治疗师", "南非医疗专业委员会（HPCSA）注册物理治疗师", "英国健康与照护专业委员会（HCPC）注册物理治疗师"],
      researchInterests: ["健康专业教育中的人工智能", "虚拟现实与沉浸式学习", "临床推理与评估", "学习设计与课程衔接", "教育科技的实施与无障碍使用", "动作、康复与运动科技"],
      leadershipService: ["物理治疗教育的课程与评估设计", "运用虚拟现实及人工智能辅助学习的教学创新", "内部审核、案例设计及实践评估发展", "教与学相关的教师发展及教育交流"],
      cvIntro: "以下概述目前的学术职务、教学、研究及专业背景。",
      cvSections: [{ title: "现任职务", items: ["物理治疗高级讲师", "健康科学学院", "圣方济各大学，香港"] }, { title: "专业概况", items: ["物理治疗教育工作者与研究人员", "研究人工智能、虚拟现实、临床推理、教育科技及健康专业教育", "通过公开笔记本反思教学、学习、研究及新兴科技"] }, { title: "学历与注册", items: ["2026 年完成物理治疗博士学位", "香港注册物理治疗师"] }, { title: "教学与课程工作", items: ["建构性衔接与学习设计", "案例为本及主动学习", "虚拟现实与人工智能辅助教学创新", "OSPE 与实践评估设计", "内部审核、评分标准及案例发展"] }, { title: "研究主题", items: ["健康专业教育中的人工智能", "虚拟现实与沉浸式学习", "临床推理与评估", "物理治疗教育与包容性学习设计", "动作、康复与运动科技"] }, { title: "奖项与肯定", items: ["教学卓越奖，2026"] }],
    },
    research: {
      description: "庾德荣在物理治疗与健康专业教育方面的研究主题、当前项目及学术成果。",
      intro: "我的研究位于物理治疗、健康专业教育、学习设计与新兴科技的交汇点，探讨教育创新如何衔接课程、持续实施、得到适切评估，并转化为有意义的学生与专业学习。",
      themes: [{ title: "健康专业教育中的人工智能", summary: "研究如何负责任地运用人工智能支持学习、教学、评估、反馈、临床推理与课程设计，并特别关注物理治疗教育。" }, { title: "虚拟现实与沉浸式学习", summary: "设计、实施及评估健康专业教育中的虚拟现实，包括课程衔接、学习者准备、无障碍使用、技术支持、真实性、认知负荷与评估。" }, { title: "临床推理与评估", summary: "发展及评估能呈现临床推理、支持反馈，并为安全物理治疗实践作准备的学习活动与评估方法。" }, { title: "健康专业模拟教育", summary: "研究模拟设计、角色轮换、同伴患者、观察、复盘、心理安全与反思，以及不同模拟角色可能如何支持不同的学习面向与临床准备。" }, { title: "物理治疗教育与学习设计", summary: "关注以学生为本的教学、建构性衔接、主动学习、评估设计、教育科技、模拟及包容性学习环境。" }, { title: "动作、康复与运动科技", summary: "发展涉及生物力学、动作分析、反应训练、康复、运动表现及科技辅助评估的研究。" }],
      projects: [{ label: "试点研究", title: "物理治疗教育中的人工智能辅助临床推理", summary: "评估人工智能聊天机器人支持物理治疗学生安全筛查及临床推理的可行性、接受程度与教育价值。" }, { label: "当前项目", title: "健康专业教育的虚拟现实设计原则", summary: "以设计为本的研究，探讨虚拟现实如何衔接课程成果、获得院校支持、以无障碍方式实施，并得到有意义的评估。" }, { label: "当前项目", title: "虚拟现实辅助针灸学习", summary: "发展具训练、练习及评估模式的虚拟学习应用程序，并将其整合至物理治疗课程。" }, { label: "当前项目", title: "健康专业模拟教育", summary: "探讨临床学习者、同伴患者、观察者与同伴复盘引导者等角色，可能如何支持本科物理治疗模拟中的不同学习面向；角色轮换对临床能力与准备度的影响仍需进一步研究。" }, { label: "发展中研究", title: "科技增强的动作与运动研究", summary: "发展涉及反应训练、动作分析、生物力学、康复及运动专项表现的研究。" }],
      labels: { title: "研究", profilesEyebrow: "学术平台", profilesTitle: "研究平台", profilesIntro: "链接至本站以外的研究及出版记录。", noProfiles: "目前未列出外部研究平台。", projectsEyebrow: "项目", projectsTitle: "当前研究项目", projectsIntro: "以下清楚标示当前及发展中的工作。", publicationsEyebrow: "出版", publicationsTitle: "出版与学术成果", preprintsEyebrow: "预印本", preprintsTitle: "预印本与公开手稿", preprintsIntro: "链接至公开研究记录中的早期或公开发布成果。" },
      publicationsNotice: "以下精选出版资料来自公开 ORCID 记录，并附有 ORCID 与 Google Scholar 外部链接。正式论文题目及引文保留原文。",
    },
    teaching: {
      description: "庾德荣在物理治疗教育方面的教学理念、课程工作与教育创新。", intro: "我的教学以学生为本、重视实践，并以建构性衔接为基础。我致力建立包容而有参与感的学习环境，深化概念理解、发展临床推理，并为安全及具反思能力的物理治疗实践作准备。",
      spotlights: [["教学领域", "实践导向的物理治疗教育", "涵盖生理学、解剖学、动作科学、高级健康科技、针灸实践及临床推理。"], ["教育方法", "主动、建构及临床为本的学习", "运用主动学习、案例研习、模拟、结构化反馈及科技增强活动，支持安全专业实践。"], ["创新", "有目的地运用沉浸式与数字工具", "只在具有明确教育目的时，整合人工智能辅助学习、数字解剖资源与沉浸式虚拟现实。"]],
      areas: ["人体生理学", "功能解剖学", "动作科学与运动学", "高级健康科技", "物理治疗师针灸实践", "物理治疗评估与临床推理"], approaches: ["主动及案例为本学习", "虚拟现实与沉浸式学习", "人工智能辅助学习与反馈", "数字解剖与三维资源", "模拟与实践评估", "内容掌握测验", "结构化评分标准与评估设计", "学生反思与口头答辩"], curriculum: ["课程统筹", "持续性与总结性评估", "OSPE 与实践评估设计", "内部审核", "评分标准与案例发展", "课程衔接", "教与学教师发展"], innovation: "目前一项教学创新是发展并整合具训练、练习及评估模式的虚拟现实针灸学习应用程序。",
      labels: { title: "教学", areasEyebrow: "教学领域", areasTitle: "教学领域", approachEyebrow: "方法", approachTitle: "教育方法", curriculumEyebrow: "课程", curriculumTitle: "课程与评估工作", innovation: "教学创新", innovationTitle: "虚拟现实针灸学习应用程序" },
    },
    contact: { description: "庾德荣的大学及个人联系资料与学术平台链接。", title: "联系", intro: "大学及个人联系资料，以及可用的学术平台链接。", imageAlt: "庾德荣戴着混合现实头戴设备并微笑的风格化肖像。", details: "联系资料", profiles: "学术平台", profilesIntro: "浏览外部研究及出版记录。", universityEmail: "大学邮箱", personalEmail: "个人邮箱" },
    redirects: { publications: "出版资料已整合至研究页面，让网站更简洁易用。", publicationsAction: "浏览研究", cv: "履历内容已整合至关于页面，让网站更简洁。", cvAction: "浏览关于" },
  },
};

const latest = posts.slice(0, 3);

const formatDate = (iso, locale) =>
  new Intl.DateTimeFormat(locale.dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

const rootPrefixFor = (localeKey, isPost) =>
  localeKey === "en" ? (isPost ? ".." : ".") : (isPost ? "../.." : "..");

const localeRelativePath = (targetLocaleKey, relativePath) =>
  locales[targetLocaleKey].path ? `${locales[targetLocaleKey].path}/${relativePath}` : relativePath;

const pageHref = (targetLocaleKey, post, currentLocaleKey, isPost) => {
  const prefix = rootPrefixFor(currentLocaleKey, isPost);
  const target = post ? `posts/${slugify(post)}.html` : "index.html";
  return `${prefix}/${localeRelativePath(targetLocaleKey, target)}`;
};

const notesHrefFor = (targetLocaleKey, currentLocaleKey, isPost = false) => {
  const prefix = rootPrefixFor(currentLocaleKey, isPost);
  return `${prefix}/${localeRelativePath(targetLocaleKey, "notes.html")}`;
};

const staticPageHref = (pageName, targetLocaleKey, currentLocaleKey, isPost = false) => {
  const prefix = rootPrefixFor(currentLocaleKey, isPost);
  return `${prefix}/${localeRelativePath(targetLocaleKey, `${pageName}.html`)}`;
};

const postHref = (post, localeKey, isPost = false) =>
  pageHref(localeKey, post, localeKey, isPost);

const imageSrc = (post, localeKey, isPost = false) =>
  `${rootPrefixFor(localeKey, isPost)}/assets/post-images/${postImages[post.ID]}`;

const postImage = (post, localeKey, isPost = false, className = "post-image", loading = null) => {
  const isFullImagePost = isPost && (post.ID === 310 || post.ID === 320 || post.ID === 322);
  const isPortraitArticleImage = isPost && post.ID === 320;
  const imageClass = isFullImagePost ? `${className} post-image--contain` : className;
  const loadingMode = loading || (isPost ? "eager" : "lazy");
  const inlineStyle = isPortraitArticleImage
    ? "display:block;width:min(100%,760px);height:auto;margin-inline:auto;aspect-ratio:auto;object-fit:contain"
    : isFullImagePost
    ? "display:block;width:100%;height:auto;aspect-ratio:auto;object-fit:contain"
    : "display:block;width:100%;height:auto;aspect-ratio:3 / 2;object-fit:cover";
  const width = post.ID === 320 ? 900 : 1200;
  const height = post.ID === 320 ? 1199 : post.ID === 322 ? 1200 : 800;
  return `<img class="${imageClass}" src="${imageSrc(post, localeKey, isPost)}" alt="${postImageAlts[localeKey][post.ID]}" width="${width}" height="${height}" loading="${loadingMode}"${loadingMode === "eager" ? ' fetchpriority="high"' : ""} decoding="async" style="${inlineStyle}" />`;
};

const siteBase = "https://yutakwing.github.io/TakWing/";

const absoluteUrlFor = (localeKey, { post = null, pageType = "home", pageName = null } = {}) => {
  const relative = post
    ? localeRelativePath(localeKey, `posts/${slugify(post)}.html`)
    : pageType === "notes"
      ? localeRelativePath(localeKey, "notes.html")
      : pageName
        ? localeRelativePath(localeKey, `${pageName}.html`)
        : localeRelativePath(localeKey, "index.html");
  return new URL(relative === "index.html" ? "" : relative, siteBase).toString();
};

const socialPreviewAbsoluteUrl = new URL("assets/social-preview.jpg", siteBase).toString();

const linkOrNull = (value) => (value ? value : null);

const sameAsLinks = Object.values(profile.sameAs).filter(Boolean);

const navItems = (localeKey, isPost = false) => {
  const content = experienceContent[localeKey];
  const locale = locales[localeKey];
  const homeHref = pageHref(localeKey, null, localeKey, isPost);
  return [
    { key: "home", label: content.nav.home, href: homeHref },
    { key: "about", label: content.nav.about, href: staticPageHref("about", localeKey, localeKey, isPost) },
    { key: "research", label: content.nav.research || locale.nav.research, href: staticPageHref("research", localeKey, localeKey, isPost) },
    { key: "teaching", label: content.nav.teaching || locale.nav.teaching, href: staticPageHref("teaching", localeKey, localeKey, isPost) },
    { key: "writing", label: content.nav.writing, href: staticPageHref("writing", localeKey, localeKey, isPost) },
    { key: "media", label: content.nav.media, href: staticPageHref("media", localeKey, localeKey, isPost) },
    { key: "resources", label: content.nav.resources, href: staticPageHref("resources", localeKey, localeKey, isPost) },
    { key: "collaborate", label: content.nav.collaborate, href: staticPageHref("collaborate", localeKey, localeKey, isPost) },
  ];
};

const languageSelector = (localeKey, post, isPost, pageType = "standard") => `
  <nav class="language-selector" aria-label="Language">
    ${Object.entries(locales).map(([key, locale]) =>
      `<a href="${post ? pageHref(key, post, localeKey, isPost) : pageType === "notes" ? notesHrefFor(key, localeKey, isPost) : pageType === "home" ? pageHref(key, null, localeKey, isPost) : staticPageHref(pageType, key, localeKey, isPost)}" lang="${locale.lang}" hreflang="${locale.lang}" aria-label="${locale.label}"${key === localeKey ? ' aria-current="page"' : ""}><span class="language-long">${locale.label}</span><span class="language-short" aria-hidden="true">${locale.shortLabel}</span></a>`
    ).join("")}
  </nav>`;

const pageShell = ({
  localeKey,
  title,
  descriptionText,
  body,
  post = null,
  pageType = "home",
  pageName = null,
  extraHead = "",
  extraScripts = "",
  structuredData = "",
  activeNavKey = pageType,
}) => {
  const locale = locales[localeKey];
  const footerPurpose = localeKey === "en"
    ? "A public academic laboratory for physiotherapy education, AI, VR, and simulation."
    : localeKey === "zh-hant"
      ? "探索物理治療教育、人工智能、虛擬實境與模擬教學的公開學術實驗室。"
      : "探索物理治疗教育、人工智能、虚拟现实与模拟教学的公开学术实验室。";
  const skillsLabLabel = localeKey === "en"
    ? "Student Skills Lab"
    : localeKey === "zh-hant"
      ? "學生技能實驗室"
      : "学生技能实验室";
  const isPost = pageType === "writing" && Boolean(post);
  const prefix = localeKey === "en" ? (isPost ? ".." : ".") : (isPost ? "../.." : "..");
  const homeHref = isPost
    ? pageHref(localeKey, null, localeKey, true)
    : localeKey === "en"
      ? "./index.html"
      : "../" + localeRelativePath(localeKey, "index.html");
  const notesHref = isPost
    ? notesHrefFor(localeKey, localeKey, true)
    : localeKey === "en"
      ? "./notes.html"
      : "../" + localeRelativePath(localeKey, "notes.html");
  const searchIndexPath = isPost ? "../search-index.json" : "./search-index.json";
  const searchInlinePath = isPost ? "../search-index-inline.js" : "./search-index-inline.js";
  const alternateHref = (targetLocaleKey) =>
    post
      ? absoluteUrlFor(targetLocaleKey, { post })
      : pageType === "notes"
        ? absoluteUrlFor(targetLocaleKey, { pageType: "notes" })
        : pageType === "home"
          ? absoluteUrlFor(targetLocaleKey, { pageType: "home" })
          : absoluteUrlFor(targetLocaleKey, { pageType, pageName: pageType });
  const xDefaultHref = post
    ? absoluteUrlFor("en", { post })
    : pageType === "notes"
      ? absoluteUrlFor("en", { pageType: "notes" })
      : pageType === "home"
        ? siteBase
        : absoluteUrlFor("en", { pageType, pageName: pageType });
  const canonicalUrl = post
    ? absoluteUrlFor(localeKey, { post })
    : pageType === "notes"
      ? absoluteUrlFor(localeKey, { pageType: "notes" })
      : pageType === "home"
        ? absoluteUrlFor(localeKey, { pageType: "home" })
        : absoluteUrlFor(localeKey, { pageType, pageName: pageType });
  const ogImage = post
    ? new URL(`assets/post-images/${postImages[post.ID]}`, siteBase).toString()
    : socialPreviewAbsoluteUrl;
  const nav = navItems(localeKey, isPost);
  const html = `<!DOCTYPE html>
<html lang="${locale.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${descriptionText.replace(/"/g, "&quot;")}" />
    <meta property="og:title" content="${(pageType === "home" ? locale.siteName : title).replace(/"/g, "&quot;")}" />
    <meta property="og:description" content="${(post ? descriptionText : locale.ogDescription || descriptionText).replace(/"/g, "&quot;")}" />
    <meta property="og:type" content="${post ? "article" : "website"}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${(pageType === "home" ? locale.siteName : title).replace(/"/g, "&quot;")}" />
    <meta name="twitter:description" content="${(post ? descriptionText : locale.ogDescription || descriptionText).replace(/"/g, "&quot;")}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${alternateHref("en")}" />
    <link rel="alternate" hreflang="zh-Hant" href="${alternateHref("zh-hant")}" />
    <link rel="alternate" hreflang="zh-Hans" href="${alternateHref("zh-hans")}" />
    <link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />
    <link rel="icon" href="${prefix}/favicon.ico?v=${assetVersion}" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="${prefix}/assets/favicon-32x32.png?v=${assetVersion}" />
    <link rel="icon" type="image/png" sizes="16x16" href="${prefix}/assets/favicon-16x16.png?v=${assetVersion}" />
    <link rel="apple-touch-icon" sizes="180x180" href="${prefix}/assets/apple-touch-icon.png?v=${assetVersion}" />
    <link rel="manifest" href="${prefix}/site.webmanifest?v=${assetVersion}" />
    <meta name="theme-color" content="#080c0c" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${prefix}/styles.css?v=${assetVersion}" />
    <link rel="stylesheet" href="${prefix}/academic.css?v=${assetVersion}" />
    <link rel="stylesheet" href="${prefix}/assets/css/takwing-mascot.css?v=${mascotAssetVersion}" />
${extraHead}
${structuredData ? `    ${structuredData}\n` : ""}  </head>
  <body data-search-index="${searchIndexPath}" data-site-prefix="${new URL(".", canonicalUrl).pathname}">
    <div class="navigation-progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="site-mark" href="${homeHref}"${pageType === "home" ? ' aria-current="page"' : ""}>
        <span>${locale.displayName}</span>
        <small>AI · VR · Clinical Reasoning</small>
      </a>
      <nav class="top-nav" aria-label="Main navigation">
        <ul>
          ${nav.map((item) => `<li><a href="${item.href}"${item.key === activeNavKey ? ' aria-current="page"' : ""}>${item.label}</a></li>`).join("")}
        </ul>
      </nav>
      <div class="header-actions">
${languageSelector(localeKey, post, isPost, pageType)}
        <button class="search-button" type="button" aria-label="${locale.search}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.8-4.8M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" /></svg>
          <span>${locale.search}</span>
        </button>
        <button class="icon-button theme-toggle desktop-theme" type="button" aria-label="${locale.theme}"></button>
      </div>
    </header>
    <div class="mobile-nav">
      <button class="icon-button theme-toggle" type="button" aria-label="${locale.theme}"></button>
      <button class="icon-button mobile-search-button search-button" type="button" aria-label="${locale.search}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.8-4.8M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" /></svg>
      </button>
      <button class="icon-button menu-toggle" type="button" aria-label="${locale.menuOpen}" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div class="mobile-panel" aria-hidden="true" inert>
        <button class="icon-button close-menu" type="button" aria-label="${locale.menuClose}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
${languageSelector(localeKey, post, isPost, pageType)}
        ${nav.map((item) => `<a href="${item.href}"${item.key === activeNavKey ? ' aria-current="page"' : ""}>${item.label}</a>`).join("")}
      </div>
    </div>
    <div class="page academic-page">
      <main class="content">${body}</main>
      <footer class="site-footer">
        <nav aria-label="Footer links"><a href="${staticPageHref("collaborate", localeKey, localeKey, isPost)}">${experienceContent[localeKey].nav.collaborate}</a><a href="${prefix}/student/login/">${skillsLabLabel}</a></nav>
        ${renderFooterProfiles()}
        <p class="footer-purpose">${footerPurpose}</p>
        <p>© <span data-current-year>2026</span> ${locale.displayName}. ${locale.copyright}</p>
      </footer>
    </div>
    <div class="search-overlay" role="dialog" aria-modal="true" aria-label="${locale.search}">
      <div class="search-modal">
        <input type="search" placeholder="${locale.searchPlaceholder}" aria-label="${locale.searchPlaceholder}" />
        <div class="search-results"></div>
      </div>
    </div>
    <script src="${searchInlinePath}?v=${assetVersion}" defer></script>
    <script src="${prefix}/script.js?v=${assetVersion}" defer></script>
    <script src="${prefix}/assets/js/takwing-mascot.js?v=${mascotAssetVersion}" defer></script>
${extraScripts}
  </body>
</html>
`.replace(/[ \t]+\n/g, "\n");
  return localizePersonalName(html, localeKey);
};

const archiveItem = (post, localeKey) => {
  const locale = locales[localeKey];
  return `<a class="archive-item" href="${postHref(post, localeKey)}">
    ${postImage(post, localeKey, false, "archive-image")}
    <div class="archive-copy">
      <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time>
      <strong>${titleFor(post, localeKey)}</strong>
      <span class="archive-category">${categoryFor(post, locale)}</span>
    </div>
  </a>`;
};

const readingMinutes = (post, localeKey) => {
  const text = stripHtml(articleBodies[localeKey]?.[post.ID] || post.content || "").trim();
  const units = localeKey === "en" ? text.split(/\s+/).filter(Boolean).length : text.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(units / (localeKey === "en" ? 220 : 500)));
};

const writingMeta = (post, localeKey) => {
  const locale = locales[localeKey];
  const ui = writingPageContent[localeKey];
  const format = practiceNotePostIds.has(post.ID) ? `<span>${ui.practiceLabel}</span>` : "";
  return `<span class="writing-meta"><time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time>${format}<span>${categoryFor(post, locale)}</span><span>${readingMinutes(post, localeKey)} ${ui.minuteRead}</span></span>`;
};

const writingLeadItem = (post, localeKey) => {
  const ui = writingPageContent[localeKey];
  return `<article class="writing-lead-article">
    <a class="writing-lead-image" href="${postHref(post, localeKey)}">${postImage(post, localeKey, false, "writing-feature-image", "eager")}</a>
    <div>${writingMeta(post, localeKey)}<h2><a href="${postHref(post, localeKey)}">${titleFor(post, localeKey)}</a></h2><p>${summaryFor(post, localeKey, 240)}</p><a class="secondary-link" href="${postHref(post, localeKey)}">${ui.readArticle}</a></div>
  </article>`;
};

const writingRecentItem = (post, localeKey) => `<a class="writing-recent-item" href="${postHref(post, localeKey)}">
  ${postImage(post, localeKey, false, "writing-recent-image")}
  <span>${writingMeta(post, localeKey)}<strong>${titleFor(post, localeKey)}</strong></span>
</a>`;

const writingArchiveItem = (post, localeKey) => `<a class="writing-archive-item" href="${postHref(post, localeKey)}">
  ${postImage(post, localeKey, false, "writing-archive-image")}
  <span>${writingMeta(post, localeKey)}<strong>${titleFor(post, localeKey)}</strong></span>
</a>`;

const writingPracticeItem = (post, localeKey) => {
  const ui = writingPageContent[localeKey];
  return `<article class="practice-note-card">
    <a class="practice-note-image" href="${postHref(post, localeKey)}">${postImage(post, localeKey, false, "writing-feature-image")}</a>
    <div>${writingMeta(post, localeKey)}<h3><a href="${postHref(post, localeKey)}">${titleFor(post, localeKey)}</a></h3><p>${summaryFor(post, localeKey, 220)}</p><a class="secondary-link" href="${postHref(post, localeKey)}">${ui.readArticle}</a></div>
  </article>`;
};

const author = profile.name || posts[0]?.author?.name || "Tak Wing Yu";

const publicationStatusLabel = (status, localeKey = "en") => {
  const labels = {
    en: {
      published: "Published", preprint: "Preprint", "in-press": "In Press", accepted: "Accepted",
      "under-review": "Under Review", "verification-pending": "Details pending verification",
    },
    "zh-hant": {
      published: "已出版", preprint: "預印本", "in-press": "付印中", accepted: "已接納",
      "under-review": "審閱中", "verification-pending": "書目資料待核實",
    },
    "zh-hans": {
      published: "已出版", preprint: "预印本", "in-press": "付印中", accepted: "已接收",
      "under-review": "审阅中", "verification-pending": "书目资料待核实",
    },
  };
  return labels[localeKey]?.[status] || labels.en[status] || status;
};

const renderList = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const trimTrailingStop = (value = "") => value.replace(/\.+$/, "").trim();

const formatPublicationCitation = (item) => {
  const year = item.year ? `(${item.year})` : "";
  const issue = item.issue ? `(${item.issue})` : "";
  const volumeAndIssue = item.volume ? `${item.volume}${issue}` : "";
  const location = [volumeAndIssue, item.pages].filter(Boolean).join(": ");
  const journalPart = [trimTrailingStop(item.journal), location].filter(Boolean).join(", ");
  return [trimTrailingStop(item.authors), year, trimTrailingStop(item.title), journalPart, item.doi ? `https://doi.org/${item.doi}` : ""]
    .filter(Boolean)
    .join(". ")
    .replace(/\. https:\/\//, ". https://");
};

const renderPublicationActions = (item, localeKey = "en") => {
  const actionLabels = {
    en: { record: "Open record", copy: "Copy citation", copied: "Citation copied" },
    "zh-hant": { record: "開啟紀錄", copy: "複製引文", copied: "已複製引文" },
    "zh-hans": { record: "打开记录", copy: "复制引文", copied: "已复制引文" },
  }[localeKey] || { record: "Open record", copy: "Copy citation", copied: "Citation copied" };
  const links = [
    item.url ? `<a class="secondary-link inline-link" href="${item.url}" target="_blank" rel="noopener noreferrer">DOI</a>` : "",
    item.repositoryUrl ? `<a class="secondary-link inline-link" href="${item.repositoryUrl}" target="_blank" rel="noopener noreferrer">${actionLabels.record}</a>` : "",
  ].filter(Boolean);
  return `<div class="citation-actions">
    ${links.join("")}
    <button type="button" class="icon-button citation-copy" data-citation="${formatPublicationCitation(item).replace(/"/g, "&quot;")}" data-copy-label="${actionLabels.copy}" data-copied-label="${actionLabels.copied}" aria-label="${actionLabels.copy}" aria-live="polite">⎘</button>
  </div>`;
};

const publicationSummaryFor = (item, localeKey) => {
  if (localeKey === "en") return item.summary;
  const index = publications.indexOf(item);
  return publicationSummaryTranslations[localeKey]?.[index] || item.summary;
};

const renderProfileLinks = (className = "profile-links") => {
  const entries = [
    ["ORCID", profile.sameAs.orcid],
    ["Google Scholar", profile.sameAs.googleScholar],
    ["LinkedIn", profile.sameAs.linkedIn],
    ["Instagram", profile.sameAs.instagram],
    ["University staff profile", profile.sameAs.staffProfile],
    ["GitHub", profile.sameAs.github],
  ].filter(([, href]) => href);
  if (!entries.length) return "";
  return `<div class="${className}">${entries.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>`;
};

const renderEmailLinks = (localeKey = "en", className = "profile-links") => {
  const contact = academicPageContent[localeKey].contact;
  const entries = [
    [contact.universityEmail, profile.institutionalEmail],
    [contact.personalEmail, profile.personalEmail],
  ].filter(([, email]) => email);
  return `<div class="${className}">${entries.map(([label, email]) => `<a href="mailto:${email}">${label}: ${email}</a>`).join("")}</div>`;
};

const renderFooterProfiles = () => renderProfileLinks("footer-profile-links");

const searchText = (...parts) =>
  parts
    .flat()
    .filter(Boolean)
    .map((value) => stripHtml(String(value)))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

const buildSearchEntries = (localeKey) => {
  const locale = locales[localeKey];
  const content = experienceContent[localeKey];
  const runner = reasoningRunnerContent[localeKey];
  const readiness = clinicalReadinessContent[localeKey];
  const elbowGame = content.resources.items.find((item) => item[2] === "elbow-goniometry");
  const ankleGame = content.resources.items.find((item) => item[2] === "ankle-goniometry");
  const shoulderGame = content.resources.items.find((item) => item[2] === "shoulder-goniometry");
  const shoulderRotationGame = content.resources.items.find((item) => item[2] === "shoulder-rotation-goniometry");
  const academic = academicPageContent[localeKey];
  const projectText = content.projectsData.flatMap((item) => [item.title, item.strapline, item.problem, item.design, item.learning, item.role, item.status, item.next]);
  const publicationText = publications.flatMap((item) => [item.authors, item.year, item.title, item.journal, item.summary]);

  const pageEntries = [
    {
      title: content.nav.home,
      href: "./index.html",
      description: content.home.identity,
      category: "Public academic laboratory",
      content: searchText(locale.displayName, content.home.role, content.home.disciplines, content.home.title, content.home.identity, content.home.lede, content.home.credibility.flat(), content.home.now.flat(), content.home.experiences.flat(), content.home.impact.flat(), content.home.collaborationThemes),
    },
    {
      title: content.nav.about,
      href: "./about.html",
      description: content.story.intro,
      category: "About",
      content: searchText(content.story.intro, content.story.chapters.flat(), content.story.philosophy, content.story.principles.flat(), academic.about.currentAppointment, academic.about.secondaryAppointment, academic.about.education, academic.about.registration),
    },
    {
      title: content.nav.research,
      href: "./research.html",
      description: content.projects.intro,
      category: "Research",
      content: searchText(content.projects.knownFor, projectText, publicationText),
    },
    {
      title: content.nav.teaching,
      href: "./teaching.html",
      description: academic.teaching.intro,
      category: "Teaching",
      content: searchText(academic.teaching.intro, academic.teaching.spotlights.flat(), academic.teaching.areas, academic.teaching.approaches, academic.teaching.curriculum, academic.teaching.innovation),
    },
    {
      title: content.nav.writing,
      href: "./writing.html",
      description: writingPageContent[localeKey].intro,
      category: "Writing",
      content: searchText(
        writingPageContent[localeKey].intro,
        homepageWritingGroups.flatMap((group) => [group.title[localeKey], writingPageContent[localeKey].groupDescriptions[group.key]]),
        posts.flatMap((post) => [titleFor(post, localeKey), summaryFor(post, localeKey), categoryFor(post, locale)])
      ),
    },
    {
      title: content.nav.resources,
      href: "./resources.html",
      description: content.resources.intro,
      category: "Resources",
      content: searchText(content.resources.items.flat(), content.resources.developingItems.flat(), content.resources.prompt),
    },
    {
      title: content.nav.media,
      href: "./media.html",
      description: content.media.intro,
      category: "Media",
      content: searchText(content.media.title, content.media.intro, content.media.formats.flat(), content.media.principles.flat(), content.media.firstItems, content.media.note, content.media.instagramTitle, content.media.instagramIntro, content.media.instagramItems.flat()),
    },
    {
      title: content.nav.collaborate,
      href: "./collaborate.html",
      description: content.collaborate.intro,
      category: "Collaborate",
      content: searchText(content.collaborate.interests, content.collaborate.invitation, profile.institutionalEmail, profile.personalEmail, "ORCID Google Scholar LinkedIn Instagram yutakwing002"),
    },
    {
      title: aiLiteracyPageContent[localeKey].title,
      href: "./ai-literacy-check.html",
      description: aiLiteracyPageContent[localeKey].description,
      category: aiLiteracyPageContent[localeKey].eyebrow,
      content: searchText(aiLiteracyPageContent[localeKey].heading, aiLiteracyPageContent[localeKey].lede, aiLiteracyPageContent[localeKey].notice, "AI literacy health professions verification hallucinations evidence privacy confidentiality bias fairness responsible use professional accountability learning assessment"),
    },
    {
      title: `${runner.title}: ${runner.subtitle}`,
      href: "./reasoning-runner.html",
      description: runner.description,
      category: runner.eyebrow,
      content: searchText(runner.title, runner.subtitle, runner.description, runner.startText, runner.whyText, runner.legend.flat(), runner.questions.flatMap((item) => [item.question, item.answers, item.explanation]), runner.hazards, "clinical reasoning AI hallucinations evidence red flags verification game"),
    },
    {
      title: `${readiness.title}: ${readiness.subtitle}`,
      href: "./clinical-readiness-lab.html",
      description: readiness.description,
      category: readiness.eyebrow,
      content: searchText(readiness.title, readiness.subtitle, readiness.description, readiness.intro, readiness.whyText, readiness.info.flat(), Object.values(readiness.stations).flatMap((item) => [item.name, item.role, item.intro, item.question, item.answers, item.explanation, item.reward]), "clinical readiness AI virtual reality VR simulation critical thinking practice readiness game"),
    },
    {
      title: elbowGame[0],
      href: localeKey === "en" ? "./elbow-goniometry/index.html" : `../elbow-goniometry/index.html?lang=${localeKey}`,
      description: elbowGame[1],
      category: content.resources.available,
      content: searchText(elbowGame, "elbow goniometry range of motion anatomical landmarks physiotherapy skills game"),
    },
    {
      title: ankleGame[0],
      href: localeKey === "en" ? "./ankle-goniometry/index.html" : `../ankle-goniometry/index.html?lang=${localeKey}`,
      description: ankleGame[1],
      category: content.resources.available,
      content: searchText(ankleGame, "ankle goniometry dorsiflexion plantarflexion range of motion lateral malleolus fibular head fifth metatarsal physiotherapy skills game"),
    },
    {
      title: shoulderGame[0],
      href: localeKey === "en" ? "./shoulder-goniometry/index.html" : `../shoulder-goniometry/index.html?lang=${localeKey}`,
      description: shoulderGame[1],
      category: content.resources.available,
      content: searchText(shoulderGame, "shoulder goniometry flexion extension standing active range of motion lateral humeral head mid-axillary line lateral epicondyle physiotherapy skills game"),
    },
    {
      title: shoulderRotationGame[0],
      href: localeKey === "en" ? "./shoulder-rotation-goniometry/index.html" : `../shoulder-rotation-goniometry/index.html?lang=${localeKey}`,
      description: shoulderRotationGame[1],
      category: content.resources.available,
      content: searchText(shoulderRotationGame, "shoulder goniometry internal rotation external rotation supine range of motion olecranon perpendicular floor ulna ulnar styloid physiotherapy skills game"),
    },
  ];

  return pageEntries
    .concat(posts.map((post) => ({
      title: titleFor(post, localeKey),
      href: `./posts/${slugify(post)}.html`,
      description: summaryFor(post, localeKey),
      date: post.date.slice(0, 10),
      category: categoryFor(post, locale),
      content: searchText(titleFor(post, localeKey), summaryFor(post, localeKey), articleBodies[localeKey]?.[post.ID] || post.content),
    })))
    .concat(notes.map((item) => ({
      title: item.content[localeKey].title,
      href: `./notes.html#${item.id}`,
      description: stripHtml(item.content[localeKey].body).slice(0, 190),
      date: "",
      category: notesUi[localeKey].libraryEyebrow,
      content: searchText(item.content[localeKey].eyebrow, item.content[localeKey].title, item.content[localeKey].body),
    })));
};

const portfolioSearchContent = (localeKey, pageKey) => {
  const locale = locales[localeKey];
  const academic = academicPageContent[localeKey];

  if (pageKey === "about") {
    return searchText(
      academic.about.biography,
      academic.about.currentAppointment,
      academic.about.secondaryAppointment,
      academic.about.education,
      academic.about.registration,
      academic.about.researchInterests,
      academic.about.leadershipService,
      academic.about.cvSections.flatMap((section) => section.items)
    );
  }

  if (pageKey === "research") {
    return searchText(
      academic.research.intro,
      academic.research.themes.flatMap((item) => [item.title, item.summary]),
      academic.research.projects.flatMap((item) => [item.title, item.summary])
    );
  }

  if (pageKey === "teaching") {
    return searchText(
      academic.teaching.intro,
      academic.teaching.areas,
      academic.teaching.approaches,
      academic.teaching.curriculum,
      academic.teaching.innovation
    );
  }

  if (pageKey === "contact") {
    return searchText(locale.displayName, academic.profile.appointment, academic.profile.school, academic.profile.institution, profile.institutionalEmail, profile.personalEmail);
  }

  return "";
};

const personStructuredData = `<script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteBase,
  jobTitle: profile.appointment,
  worksFor: {
    "@type": "CollegeOrUniversity",
    name: "Saint Francis University",
  },
  knowsAbout: [
    "Physiotherapy education",
    "Health professions education",
    "Artificial intelligence in education",
    "Virtual reality",
    "Clinical reasoning",
    "Educational technology",
    "Learning design",
    "Movement science",
  ],
  sameAs: sameAsLinks,
}, null, 2)}
</script>`;

const buildIndex = (localeKey) => {
  const locale = locales[localeKey];
  const academic = academicPageContent[localeKey];
  const home = academic.home;
  const profileLinksMarkup = renderProfileLinks();
  const profileLinksSection = profileLinksMarkup ? `\n        ${profileLinksMarkup}` : "";
  const body = `<article class="home-layout portfolio-layout">
    <section id="hero" class="academic-hero portfolio-hero">
      <div class="hero-copy">
        <p class="eyebrow">${locale.heroEyebrow}</p>
        <h1>${locale.displayName}</h1>
        <h2 class="portfolio-headline">${academic.profile.headline}</h2>
        <p class="portfolio-appointment">${academic.profile.appointment}<br>${academic.profile.school}<br>${academic.profile.institution}</p>
        <p class="hero-lede">${home.heroSummary}</p>
        <div class="hero-actions">
          <a class="primary-link" href="${staticPageHref("about", localeKey, localeKey, false)}">${locale.nav.about}</a>
          <a class="secondary-link" href="${staticPageHref("research", localeKey, localeKey, false)}">${locale.nav.research}</a>
          <a class="secondary-link" href="${staticPageHref("teaching", localeKey, localeKey, false)}">${locale.nav.teaching}</a>
          <a class="secondary-link" href="${staticPageHref("writing", localeKey, localeKey, false)}">${locale.nav.writing}</a>
        </div>
      </div>
      <div class="hero-introduction" aria-label="${locale.profileLabel}">
        <img class="profile-image" src="${rootPrefixFor(localeKey, false)}/assets/profile-tak-wing-yu-portrait.jpg" alt="${academic.profile.portraitAlt}" width="900" height="1200" />
        <div class="introduction-copy">
          <h2>${academic.profile.secondaryHeadline}</h2>
          ${home.biography.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <dl class="site-stats academic-highlights">
            ${home.highlights.map(([label, value]) => `<div><dt>${value}</dt><dd>${label}</dd></div>`).join("")}
          </dl>
        </div>
      </div>
    </section>

    <section id="about" class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${home.profileEyebrow}</p>
        <div>
          <h2>${home.profileTitle}</h2>
          <p>${home.biography[0]}</p>
        </div>
      </div>
      <div class="profile-summary-card">
        ${home.biography.slice(1).map((paragraph) => `<p>${paragraph}</p>`).join("")}
${profileLinksSection}
      </div>
    </section>

    <section id="award" class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${home.recognitionEyebrow}</p>
        <div>
          <h2>${home.recognitionTitle}</h2>
          <p>${home.recognitionIntro}</p>
        </div>
      </div>
      <article class="award-card">
        <span>${home.awardLabel}</span>
        <strong>${home.award.title}</strong>
        <p>${home.award.summary}</p>
      </article>
    </section>

    <section id="writing" class="section-block latest-layout">
      <div class="section-heading">
        <p class="eyebrow">${home.writingEyebrow}</p>
        <div>
          <h2>${home.writingTitle}</h2>
          <p>${home.writingIntro}</p>
        </div>
      </div>
      <div class="latest-feature">
        <article class="lead-article">
          <a class="lead-image-link" href="${postHref(posts[0], localeKey)}">${postImage(posts[0], localeKey, false, "lead-image")}</a>
          <div class="lead-copy">
            <span>${categoryFor(posts[0], locale)}</span>
            <h3><a href="${postHref(posts[0], localeKey)}">${titleFor(posts[0], localeKey)}</a></h3>
            <p>${summaryFor(posts[0], localeKey, 240)}</p>
            <a class="read-more" href="${postHref(posts[0], localeKey)}">${locale.continueReading}</a>
          </div>
        </article>
        <div class="latest-list">
          ${latest.slice(1, 3).map((post) => `<a href="${postHref(post, localeKey)}">${postImage(post, localeKey, false, "latest-image")}<span><time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time><strong>${titleFor(post, localeKey)}</strong></span></a>`).join("")}
        </div>
      </div>
      <div class="writing-category-panels" aria-label="${home.writingCategoriesLabel}">
        ${homepageWritingGroups.map((group) => `
          <section class="writing-category-panel" aria-labelledby="writing-category-${group.key}">
            <div class="writing-category-header">
              <span>${locale.categories[group.key]}</span>
              <h3 id="writing-category-${group.key}"><a href="${staticPageHref("writing", localeKey, localeKey, false)}#${group.key}">${group.title[localeKey]}</a></h3>
              <p>${group.description[localeKey]}</p>
            </div>
            <div class="writing-category-list">
              ${groupedPosts[group.key].slice(0, 2).map((post) => `<a class="writing-category-item" href="${postHref(post, localeKey)}"><time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time><strong>${titleFor(post, localeKey)}</strong></a>`).join("")}
              <a class="writing-category-item writing-category-link" href="${staticPageHref("writing", localeKey, localeKey, false)}#${group.key}"><strong>${locale.writingArchiveLabel}</strong></a>
            </div>
          </section>
        `.trim()).join("")}
      </div>
    </section>

    <section id="archive" class="section-block">
      <div class="section-heading archive-heading">
        <div><p class="eyebrow">${home.notesEyebrow}</p><h2>${home.notesTitle}</h2></div>
        <p>${home.notesIntro}</p>
      </div>
      <div class="archive-links">
        <a class="secondary-link" href="${notesHrefFor(localeKey, localeKey, false)}">${home.notesAction}</a>
      </div>
    </section>

  </article>`;

  return pageShell({
    localeKey,
    title: locale.siteName,
    descriptionText: locale.description,
    body,
    pageType: "home",
    structuredData: localeKey === "en" ? personStructuredData : "",
  });
};

const buildAboutPage = (localeKey) => {
  const locale = locales[localeKey];
  const academic = academicPageContent[localeKey];
  const content = academic.about;
  const labels = content.labels;
  const body = `<article class="portfolio-subpage about-page">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${labels.title}</p>
        <div><h1>${labels.title}</h1><p>${content.biography[0]}</p></div>
      </div>
      <div class="contact-section">
        <figure class="contact-figure">
          <img src="${rootPrefixFor(localeKey, false)}/assets/about-page-card.webp" alt="${content.imageAlt}" width="1733" height="941" loading="lazy" decoding="async" />
        </figure>
        <div class="profile-summary-card">
          ${content.biography.slice(1).map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.profile}</p><h2>${labels.appointment}</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(content.currentAppointment)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.background}</p><h2>${labels.educationRegistration}</h2></div>
      <div class="scholar-list compact">
        <article class="publication-card"><span>${labels.education}</span>${renderList(content.education)}</article>
        <article class="publication-card"><span>${labels.registration}</span>${renderList(content.registration)}</article>
      </div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.research}</p><h2>${labels.interests}</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(content.researchInterests)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.service}</p><h2>${labels.leadership}</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(content.leadershipService)}</article></div>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${labels.cvEyebrow}</p>
        <div><h2>${labels.cvTitle}</h2><p>${content.cvIntro}</p></div>
      </div>
      <div class="scholar-list">
        ${content.cvSections.map((section) => `<article class="publication-card"><span>${section.title}</span>${renderList(section.items)}</article>`).join("")}
      </div>
    </section>
    <section class="section-block">
      <article class="award-card"><span>${labels.award}</span><strong>${academic.home.award.title}</strong><p>${academic.home.award.summary}</p></article>
      <div class="hero-actions">
        <a class="secondary-link" href="${staticPageHref("research", localeKey, localeKey, false)}">${locale.nav.research}</a>
        <a class="secondary-link" href="${staticPageHref("teaching", localeKey, localeKey, false)}">${locale.nav.teaching}</a>
        <a class="secondary-link" href="${staticPageHref("contact", localeKey, localeKey, false)}">${locale.nav.contact}</a>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${labels.title} | ${locale.siteName}`, descriptionText: content.description, body, pageType: "about" });
};

const buildResearchPage = (localeKey) => {
  const locale = locales[localeKey];
  const content = academicPageContent[localeKey].research;
  const labels = content.labels;
  const profileLinksMarkup = renderProfileLinks();
  const publishedPublications = publications.filter((item) => item.section === "peer-reviewed");
  const preprints = publications.filter((item) => item.section === "preprint");
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${labels.title}</p>
        <div><h1>${labels.title}</h1><p>${content.intro}</p></div>
      </div>
      <div class="focus-grid research-grid">${content.themes.map((item) => `<article class="focus-card education"><strong>${item.title}</strong><small>${item.summary}</small></article>`).join("")}</div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.profilesEyebrow}</p><div><h2>${labels.profilesTitle}</h2><p>${labels.profilesIntro}</p></div></div>
      <div class="scholar-list compact"><article class="publication-card">${profileLinksMarkup || `<p>${labels.noProfiles}</p>`}</article></div>
    </section>
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">${labels.projectsEyebrow}</p><div><h2>${labels.projectsTitle}</h2><p>${labels.projectsIntro}</p></div></div>
      <div class="scholar-list project-list">${content.projects.map((item) => `<article class="project-card"><span>${item.label}</span><strong>${item.title}</strong><small>${item.summary}</small></article>`).join("")}</div>
    </section>
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">${labels.publicationsEyebrow}</p><div><h2>${labels.publicationsTitle}</h2><p>${content.publicationsNotice}</p></div></div>
      <div class="scholar-list">
        ${publishedPublications.map((item) => `<article class="publication-card"><span>${publicationStatusLabel(item.status, localeKey)}</span><strong>${item.title}</strong><p class="publication-citation">${formatPublicationCitation(item)}</p><small>${item.summary}</small>${renderPublicationActions(item, localeKey)}</article>`).join("")}
      </div>
    </section>
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">${labels.preprintsEyebrow}</p><div><h2>${labels.preprintsTitle}</h2><p>${labels.preprintsIntro}</p></div></div>
      <div class="scholar-list">
        ${preprints.map((item) => `<article class="publication-card"><span>${publicationStatusLabel(item.status, localeKey)}</span><strong>${item.title}</strong><p class="publication-citation">${formatPublicationCitation(item)}</p><small>${item.summary}</small>${renderPublicationActions(item, localeKey)}</article>`).join("")}
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${labels.title} | ${locale.siteName}`, descriptionText: content.description, body, pageType: "research" });
};

const buildPublicationsPage = (localeKey) => {
  const locale = locales[localeKey];
  const redirect = academicPageContent[localeKey].redirects;
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.nav.publications}</p>
        <div><h1>${locale.nav.publications}</h1><p>${redirect.publications}</p></div>
      </div>
      <div class="profile-summary-card">
        <p><a class="primary-link" href="${staticPageHref("research", localeKey, localeKey, false)}">${redirect.publicationsAction}</a></p>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${locale.nav.publications} | ${locale.siteName}`, descriptionText: englishPagePlaceholders.publications.description, body, pageType: "publications" });
};

const buildTeachingPage = (localeKey) => {
  const locale = locales[localeKey];
  const content = academicPageContent[localeKey].teaching;
  const labels = content.labels;
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${labels.title}</p>
        <div><h1>${labels.title}</h1><p>${content.intro}</p></div>
      </div>
      <div class="teaching-overview-grid">
        ${content.spotlights.map(([label, title, summary]) => `<article class="teaching-spotlight-card"><span>${label}</span><strong>${title}</strong><p>${summary}</p></article>`).join("")}
      </div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.areasEyebrow}</p><h2>${labels.areasTitle}</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(content.areas)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.approachEyebrow}</p><h2>${labels.approachTitle}</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(content.approaches)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">${labels.curriculumEyebrow}</p><h2>${labels.curriculumTitle}</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(content.curriculum)}</article></div>
    </section>
    <section class="section-block">
      ${localeKey === "en" ? `<article class="award-card"><span>Interactive learning tool</span><strong>AI Literacy Check for Health Professions</strong><p>A simple 15-question knowledge check on verification, privacy, bias, learning, and responsible AI use.</p><p><a class="primary-link" href="./ai-literacy-check.html">Take the AI literacy check</a></p></article>` : ""}
    </section>
    <section class="section-block">
      <article class="award-card"><span>${labels.innovation}</span><strong>${labels.innovationTitle}</strong><p>${content.innovation}</p></article>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${labels.title} | ${locale.siteName}`, descriptionText: content.description, body, pageType: "teaching" });
};

const buildCvPage = (localeKey) => {
  const locale = locales[localeKey];
  const redirect = academicPageContent[localeKey].redirects;
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.nav.cv}</p>
        <div><h1>${locale.nav.cv}</h1><p>${redirect.cv}</p></div>
      </div>
      <div class="profile-summary-card">
        <p><a class="primary-link" href="${staticPageHref("about", localeKey, localeKey, false)}">${redirect.cvAction}</a></p>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${locale.nav.cv} | ${locale.siteName}`, descriptionText: englishPagePlaceholders.cv.description, body, pageType: "cv" });
};

const buildContactPage = (localeKey) => {
  const locale = locales[localeKey];
  const academic = academicPageContent[localeKey];
  const content = academic.contact;
  const profileLinksMarkup = renderProfileLinks("profile-links profile-links-pills");
  const profileLinksSection = profileLinksMarkup ? `
        <article class="publication-card contact-profile-card">
          <span>${content.profiles}</span>
          <p>${content.profilesIntro}</p>
          ${profileLinksMarkup}
        </article>` : "";
  const body = `<article class="portfolio-subpage contact-page">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${content.title}</p>
        <div><h1>${content.title}</h1><p>${content.intro}</p></div>
      </div>
      <div class="contact-section">
        <figure class="contact-figure">
          <img src="${rootPrefixFor(localeKey, false)}/assets/contact-page-vr-portrait.webp" alt="${content.imageAlt}" width="1078" height="1438" loading="lazy" decoding="async" />
        </figure>
        <div class="contact-details-stack">
          <article class="publication-card">
            <span>${content.details}</span>
            <p>${locale.displayName}<br>${academic.profile.appointment}<br>${academic.profile.school}<br>${academic.profile.institution}</p>
            ${renderEmailLinks(localeKey)}
          </article>
${profileLinksSection}
        </div>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${content.title} | ${locale.siteName}`, descriptionText: content.description, body, pageType: "contact" });
};

const buildWritingPage = (localeKey) => {
  const locale = locales[localeKey];
  const writingUi = writingPageContent[localeKey];
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);
  const practicePosts = posts.filter((post) => practiceNotePostIds.has(post.ID));
  const recentIds = new Set(posts.slice(0, 4).map((post) => post.ID));
  const body = `<article class="portfolio-subpage writing-page">
    <section class="pilot-page-hero"><p class="eyebrow">${locale.nav.writing}</p><h1>${writingUi.title}</h1><p>${writingUi.intro}</p></section>
    <section class="section-block writing-latest-section">
      <div class="section-heading"><p class="eyebrow">${writingUi.latestEyebrow}</p><div><h2>${writingUi.latestTitle}</h2><p>${writingUi.latestIntro}</p></div></div>
      <div class="writing-latest-layout">
        ${writingLeadItem(featuredPost, localeKey)}
        <aside class="writing-recent-list" aria-label="${writingUi.recentLabel}"><p class="eyebrow">${writingUi.recentLabel}</p>${recentPosts.map((post) => writingRecentItem(post, localeKey)).join("")}</aside>
      </div>
    </section>
    <section class="section-block writing-practice-section">
      <div class="section-heading"><p class="eyebrow">${writingUi.practiceEyebrow}</p><div><h2>${writingUi.practiceTitle}</h2><p>${writingUi.practiceIntro}</p></div></div>
      <div class="practice-notes-grid">${practicePosts.map((post) => writingPracticeItem(post, localeKey)).join("")}</div>
    </section>
    <section class="section-block writing-collection">
      <div class="section-heading"><p class="eyebrow">${writingUi.archiveEyebrow}</p><div><h2>${writingUi.archiveTitle}</h2><p>${writingUi.archiveIntro}</p></div></div>
      <nav class="writing-category-index" aria-label="${writingUi.archiveTitle}">${homepageWritingGroups.map((group, index) => `<a href="#${group.key}"><span>0${index + 1}</span><strong>${group.title[localeKey]}</strong><small>${groupedPosts[group.key].length} ${writingUi.articlesLabel}</small><p>${writingUi.groupDescriptions[group.key]}</p></a>`).join("")}</nav>
      <div class="writing-archive-sections">
        ${homepageWritingGroups.map((group) => {
          const archivePosts = groupedPosts[group.key].filter((post) => !recentIds.has(post.ID) && !practiceNotePostIds.has(post.ID));
          return `<section id="${group.key}" class="writing-group-section">
            <div class="writing-group-heading-row"><div><p class="eyebrow">${writingUi.categoryLabel}</p><h2>${group.title[localeKey]}</h2></div><p>${writingUi.groupDescriptions[group.key]}</p></div>
            <div class="writing-compact-grid">${archivePosts.map((post) => writingArchiveItem(post, localeKey)).join("")}</div>
          </section>`;
        }).join("")}
      </div>
    </section>
  </article>`;

  return pageShell({
    localeKey,
    title: `${locale.nav.writing} | ${locale.siteName}`,
    descriptionText: englishPagePlaceholders.writing.description,
    body,
    pageType: "writing",
    pageName: "writing",
  });
};

const researchProjectHref = (project, localeKey, isPost = false) =>
  `${staticPageHref("research", localeKey, localeKey, isPost)}#${project.id}`;

const projectImage = (project, localeKey, className = "pilot-project-image") =>
  `<figure class="${className}"><img src="${rootPrefixFor(localeKey, false)}/assets/post-images/${project.image}" alt="${project.imageAlt}" width="1200" height="800" loading="lazy" decoding="async" /><figcaption>${project.imageNote}</figcaption></figure>`;

const relatedPostIdsByProject = {
  "vr-acupuncture": [175, 181],
  "ai-literacy": [312, 306],
  "reasoning-chatbot": [300, 307],
  "physiology-vr": [175, 200],
  "simulation-role-rotation": [313, 314],
};

const researchRelatedUi = {
  en: { eyebrow: "Connected thinking", title: "Related writing", action: "Read article" },
  "zh-hant": { eyebrow: "延伸思考", title: "相關文章", action: "閱讀文章" },
  "zh-hans": { eyebrow: "延伸思考", title: "相关文章", action: "阅读文章" },
};

const projectRelatedWriting = (project, localeKey) => {
  const ui = researchRelatedUi[localeKey];
  const related = (relatedPostIdsByProject[project.id] || []).map((id) => posts.find((post) => post.ID === id)).filter(Boolean);
  if (!related.length) return "";
  return `<section class="project-related-writing" aria-labelledby="related-${project.id}"><div><p class="eyebrow">${ui.eyebrow}</p><h3 id="related-${project.id}">${ui.title}</h3></div><div>${related.map((post) => `<a href="${postHref(post, localeKey)}">${postImage(post, localeKey, false, "project-related-image")}<span><time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locales[localeKey])}</time><strong>${titleFor(post, localeKey)}</strong><small>${ui.action}</small></span></a>`).join("")}</div></section>`;
};

const homeLabContent = {
  en: {
    eyebrow: "Explore the lab",
    title: "Choose a question to follow",
    intro: "Select a thread to see the educational question behind the technology.",
    questionLabel: "Current question",
    topics: [
      ["AI", "How can AI make reasoning visible without becoming a shortcut?", "I examine prompts, verification, disclosure, and the evidence students must still produce themselves.", "research", "ai-literacy", "Explore AI work"],
      ["Virtual reality", "When does immersion genuinely improve learning?", "I look beyond novelty to curriculum fit, learner preparation, accessibility, feedback, and assessment.", "research", "vr-acupuncture", "Explore VR work"],
      ["Clinical reasoning", "How can students show the thinking behind a safe decision?", "I design cases and conversational tools that reveal judgement, uncertainty, safety screening, and professional accountability.", "research", "reasoning-chatbot", "Explore reasoning work"],
      ["Learning design", "What should technology change, and what must remain human?", "I use constructive alignment to decide where technology adds value and where dialogue, practice, and teacher judgement matter most.", "teaching", "", "Explore my teaching"],
    ],
  },
  "zh-hant": {
    eyebrow: "探索學術實驗室",
    title: "選擇一個你想追蹤的問題",
    intro: "選擇一項主題，了解科技背後真正要處理的教育問題。",
    questionLabel: "目前的問題",
    topics: [
      ["人工智能", "人工智能如何讓推理過程變得可見，而不會成為捷徑？", "我關注提示設計、核實、披露，以及學生仍須親自提供的學習證據。", "research", "ai-literacy", "探索人工智能研究"],
      ["虛擬實境", "沉浸式學習在甚麼情況下才能真正改善學習？", "我不只考慮新鮮感，亦會檢視課程配合、學習者準備、無障礙使用、回饋與評估。", "research", "vr-acupuncture", "探索虛擬實境研究"],
      ["臨床推理", "學生如何展示安全決定背後的思考？", "我設計個案與對話工具，讓判斷、不確定性、安全篩查及專業問責變得可見。", "research", "reasoning-chatbot", "探索臨床推理研究"],
      ["學習設計", "科技應該改變甚麼，又有哪些部分必須保留人本元素？", "我運用建構性配合，判斷科技在哪裏能增值，以及對話、實踐與教師判斷在哪裏最為重要。", "teaching", "", "探索我的教學"],
    ],
  },
  "zh-hans": {
    eyebrow: "探索学术实验室",
    title: "选择一个你想追踪的问题",
    intro: "选择一项主题，了解科技背后真正要处理的教育问题。",
    questionLabel: "目前的问题",
    topics: [
      ["人工智能", "人工智能如何让推理过程变得可见，而不会成为捷径？", "我关注提示设计、核实、披露，以及学生仍须亲自提供的学习证据。", "research", "ai-literacy", "探索人工智能研究"],
      ["虚拟现实", "沉浸式学习在什么情况下才能真正改善学习？", "我不只考虑新鲜感，也会检视课程配合、学习者准备、无障碍使用、反馈与评估。", "research", "vr-acupuncture", "探索虚拟现实研究"],
      ["临床推理", "学生如何展示安全决定背后的思考？", "我设计案例与对话工具，让判断、不确定性、安全筛查及专业问责变得可见。", "research", "reasoning-chatbot", "探索临床推理研究"],
      ["学习设计", "科技应该改变什么，又有哪些部分必须保留以人为本的元素？", "我运用建构性配合，判断科技在哪里能增值，以及对话、实践与教师判断在哪里最为重要。", "teaching", "", "探索我的教学"],
    ],
  },
};

const renderHomeLab = (localeKey) => {
  const lab = homeLabContent[localeKey];
  const topicClasses = ["ai", "vr", "reasoning", "design"];
  const topicHref = (page, anchor) => `${staticPageHref(page, localeKey, localeKey, false)}${anchor ? `#${anchor}` : ""}`;
  return `<section class="section-block home-lab-explorer" data-home-lab>
    <div class="section-heading"><p class="eyebrow">${lab.eyebrow}</p><div><h2>${lab.title}</h2><p>${lab.intro}</p></div></div>
    <div class="home-lab-shell">
      <div class="home-lab-tabs" role="tablist" aria-label="${lab.title}">${lab.topics.map(([label], index) => `<button class="home-lab-tab topic-${topicClasses[index]}" id="home-lab-tab-${index}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="home-lab-panel-${index}" tabindex="${index === 0 ? 0 : -1}"><span>0${index + 1}</span>${label}</button>`).join("")}</div>
      <div class="home-lab-panels">${lab.topics.map(([label, question, copy, page, anchor, action], index) => `<article class="home-lab-panel topic-${topicClasses[index]}" id="home-lab-panel-${index}" role="tabpanel" aria-labelledby="home-lab-tab-${index}"${index === 0 ? "" : " hidden"}><span class="home-lab-number" aria-hidden="true">0${index + 1}</span><div><p class="eyebrow">${lab.questionLabel} · ${label}</p><h3>${question}</h3><p>${copy}</p><a class="secondary-link" href="${topicHref(page, anchor)}">${action}</a></div></article>`).join("")}</div>
    </div>
  </section>`;
};

const buildMergedIndex = (localeKey) => {
  const locale = locales[localeKey];
  const content = experienceContent[localeKey];
  const home = content.home;
  const projects = content.projectsData.filter((project) => ["vr-acupuncture", "ai-literacy", "reasoning-chatbot", "simulation-role-rotation"].includes(project.id));
  const pageAnchorHref = (page, anchor = "") => `${staticPageHref(page, localeKey, localeKey, false)}${anchor ? `#${anchor}` : ""}`;
  const impactHref = ([, , page, reference]) => {
    if (page === "writing") {
      const post = posts.find((item) => slugify(item) === reference);
      return post ? postHref(post, localeKey) : staticPageHref("writing", localeKey, localeKey, false);
    }
    return pageAnchorHref(page, reference);
  };
  const body = `<article class="pilot-home">
    <section class="pilot-hero" data-reveal>
      <div class="pilot-hero-copy">
        <p class="eyebrow">${home.eyebrow}</p>
        <h1 class="pilot-name">${home.name}</h1>
        <p class="pilot-role">${home.role}</p>
        <p class="pilot-disciplines">${home.disciplines}</p>
        <h2 class="pilot-title">${home.title}</h2>
        <p class="pilot-identity">${home.identity}</p>
        <p class="pilot-lede">${home.lede}</p>
        <div class="hero-actions hero-actions-primary">
          <a class="primary-link" href="${pageAnchorHref("resources", "interactive-tools")}">${home.actions[0]}</a>
          <a class="secondary-link" href="#featured-work">${home.actions[1]}</a>
        </div>
        <div class="hero-text-links">
          <a href="${staticPageHref("about", localeKey, localeKey, false)}">${home.actions[2]}</a>
          <a href="${staticPageHref("collaborate", localeKey, localeKey, false)}">${home.actions[3]}</a>
        </div>
      </div>
      <figure class="pilot-hero-portrait">
        <img src="${rootPrefixFor(localeKey, false)}/assets/profile-tak-wing-yu-portrait.jpg" alt="${academicPageContent[localeKey].profile.portraitAlt}" width="900" height="1200" fetchpriority="high" decoding="async" />
        <figcaption><strong>${locale.displayName}</strong><span>${academicPageContent[localeKey].profile.appointment}</span></figcaption>
      </figure>
    </section>

    <section class="home-credibility" aria-label="${home.credibilityEyebrow}" data-reveal>
      <p class="eyebrow">${home.credibilityEyebrow}</p>
      <div>${home.credibility.map(([value, title, detail]) => `<article><strong>${value}</strong><span>${title}</span><small>${detail}</small></article>`).join("")}</div>
    </section>

    <section class="section-block pilot-now" data-reveal>
      <div class="section-heading"><p class="eyebrow">${home.nowEyebrow}</p><div><h2>${home.nowTitle}</h2><p>${home.nowIntro}</p></div></div>
      <div class="pilot-now-grid">${home.now.map(([label, title, text, status, page, anchor]) => `<article><header><span>${label}</span><small>${status}</small></header><h3>${title}</h3><p>${text}</p><a href="${pageAnchorHref(page, anchor)}" aria-label="${title}">${content.nav[page] || status} →</a></article>`).join("")}</div>
    </section>

    ${renderHomeLab(localeKey)}

    <section id="featured-work" class="section-block home-featured-work" data-reveal>
      <div class="section-heading"><p class="eyebrow">${home.projectsEyebrow}</p><div><h2>${home.projectsTitle}</h2><p>${home.projectsIntro}</p></div></div>
      <div class="pilot-project-grid">${projects.map((project) => `<article class="pilot-project-card"><a class="project-card-image" href="${researchProjectHref(project, localeKey)}"><span>${project.number}</span><img src="${rootPrefixFor(localeKey, false)}/assets/post-images/${project.image}" alt="${project.imageAlt}" width="1200" height="800" loading="lazy" decoding="async" /></a><div><h3>${project.title}</h3><dl><div><dt>${home.projectLabels.problem}</dt><dd>${project.problem}</dd></div><div><dt>${home.projectLabels.approach}</dt><dd>${project.design}</dd></div><div><dt>${home.projectLabels.role}</dt><dd>${project.role}</dd></div><div><dt>${home.projectLabels.status}</dt><dd>${project.status}</dd></div></dl><a class="secondary-link" href="${researchProjectHref(project, localeKey)}">${home.projectLabels.action}</a></div></article>`).join("")}</div>
    </section>

    <section class="section-block home-experience" data-reveal>
      <div class="section-heading"><p class="eyebrow">${home.experienceEyebrow}</p><div><h2>${home.experienceTitle}</h2><p>${home.experienceIntro}</p></div></div>
      <div class="experience-card-grid">${home.experiences.map(([title, description, href, action, meta], index) => `<article class="experience-card experience-card-${index + 1}"><span>${meta}</span><div><h3>${title}</h3><p>${description}</p><a class="secondary-link" href="${pageAnchorHref(href.replace(/\.html$/, ""))}">${action}</a></div></article>`).join("")}</div>
    </section>

    <section class="section-block home-impact" data-reveal>
      <div class="section-heading"><p class="eyebrow">${home.impactEyebrow}</p><div><h2>${home.impactTitle}</h2><p>${home.impactIntro}</p></div></div>
      <div class="impact-list">${home.impact.map((item, index) => `<a href="${impactHref(item)}"><span>0${index + 1}</span><strong>${item[0]}</strong><p>${item[1]}</p><b aria-hidden="true">↗</b></a>`).join("")}</div>
    </section>

    <section class="section-block home-writing" data-reveal>
      <div class="section-heading"><p class="eyebrow">${home.writingEyebrow}</p><div><h2>${home.writingTitle}</h2><p>${home.writingIntro}</p></div></div>
      <div class="home-writing-grid">${posts.slice(0, 3).map((post) => `<article><a class="home-writing-image" href="${postHref(post, localeKey)}">${postImage(post, localeKey, false, "latest-image")}</a><div>${writingMeta(post, localeKey)}<h3><a href="${postHref(post, localeKey)}">${titleFor(post, localeKey)}</a></h3><p>${summaryFor(post, localeKey, 180)}</p><a class="secondary-link" href="${postHref(post, localeKey)}">${home.writingAction}</a></div></article>`).join("")}</div>
      <p class="section-action"><a class="secondary-link" href="${staticPageHref("writing", localeKey, localeKey, false)}">${home.writingAll}</a></p>
    </section>

    <section class="home-collaboration" data-reveal>
      <div><p class="eyebrow">${home.collaborateEyebrow}</p><h2>${home.collaborateTitle}</h2><p>${home.collaborateIntro}</p><ul>${home.collaborationThemes.map((item) => `<li>${item}</li>`).join("")}</ul></div>
      <aside>${home.collaborationActions.map((label) => `<a href="mailto:${profile.institutionalEmail}?subject=${encodeURIComponent(label)}"><span>${label}</span><b aria-hidden="true">→</b></a>`).join("")}<a class="collaboration-page-link" href="${staticPageHref("collaborate", localeKey, localeKey, false)}">${content.nav.collaborate}</a></aside>
    </section>
  </article>`;
  return pageShell({
    localeKey,
    title: locale.siteName,
    descriptionText: localeKey === "en" ? "Tak Wing Yu is a physiotherapy educator and researcher exploring artificial intelligence, virtual reality, and simulation in health professions education." : home.identity,
    body,
    pageType: "home",
    structuredData: localeKey === "en" ? personStructuredData : "",
    extraHead: `    <link rel="stylesheet" href="${rootPrefixFor(localeKey, false)}/home-lab.css?v=20260728-home-lab-v1" />`,
    extraScripts: `    <script src="${rootPrefixFor(localeKey, false)}/home-lab.js?v=20260728-home-lab-v1"></script>`,
  });
};

const buildMergedAboutPage = (localeKey) => {
  const locale = locales[localeKey];
  const content = experienceContent[localeKey];
  const story = content.story;
  const academic = academicPageContent[localeKey];
  const about = academic.about;
  const identityBanner = localeKey === "en" ? `<figure class="about-identity-banner">
      <img src="${rootPrefixFor(localeKey, false)}/assets/tak-wing-academic-banner.jpg" alt="Tak Wing Yu, Senior Lecturer, with a Hong Kong skyline and visual references to artificial intelligence, virtual reality, simulation, and clinical reasoning." width="2508" height="627" loading="eager" fetchpriority="high" decoding="async" />
    </figure>` : "";
  const body = `<article class="portfolio-subpage pilot-story-page">
    <section class="pilot-page-hero"><p class="eyebrow">${story.eyebrow}</p><h1>${story.title}</h1><p>${story.intro}</p></section>${identityBanner ? `
    ${identityBanner}` : ""}
    <section class="story-timeline">${story.chapters.map(([title, text], index) => `<article><span>0${index + 1}</span><div><h2>${title}</h2><p>${text}</p></div></article>`).join("")}</section>
    <section class="pilot-philosophy"><p class="eyebrow">${story.philosophyTitle}</p><blockquote>${story.philosophy}</blockquote></section>
    <section class="section-block"><div class="pilot-principles">${story.principles.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
    <section class="section-block merged-about-profile">
      <figure><img src="${rootPrefixFor(localeKey, false)}/assets/about-tak-wing-yu-illustration.webp" alt="${localeKey === "en" ? "Chibi-style portrait of Tak Wing Yu smiling and waving in a grey blazer." : localeKey === "zh-hant" ? "庾德榮穿着灰色西裝外套、微笑揮手的 Q 版肖像。" : "庾德荣穿着灰色西装外套、微笑挥手的 Q 版肖像。"}" width="1024" height="1024" loading="lazy" decoding="async" /></figure>
      <div>
        <p class="eyebrow">${about.labels.profile}</p>
        <h2>${about.labels.appointment}</h2>
        <div class="appointment-columns"><article>${renderList(about.currentAppointment)}</article><article>${renderList(about.secondaryAppointment)}</article></div>
        <div class="about-credentials"><article><span>${about.labels.education}</span>${renderList(about.education)}</article><article><span>${about.labels.registration}</span>${renderList(about.registration)}</article></div>
        <article class="award-card"><span>${about.labels.award}</span><strong>${academic.home.award.title}</strong><p>${academic.home.award.summary}</p></article>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${content.nav.about} | ${locale.siteName}`, descriptionText: story.intro, body, pageType: "about" });
};

const buildMergedResearchPage = (localeKey) => {
  const locale = locales[localeKey];
  const experience = experienceContent[localeKey];
  const content = experience.projects;
  const labels = academicPageContent[localeKey].research.labels;
  const publishedPublications = publications.filter((item) => item.section === "peer-reviewed");
  const preprints = publications.filter((item) => item.section === "preprint");
  const body = `<article class="portfolio-subpage pilot-projects-page">
    <section class="pilot-page-hero"><p class="eyebrow">${experience.nav.research}</p><h1>${experience.nav.research}</h1><p>${academicPageContent[localeKey].research.intro}</p></section>
    <nav class="project-index" aria-label="${content.title}">${experience.projectsData.map((project) => `<a href="#${project.id}"><span>${project.number}</span>${project.title}</a>`).join("")}</nav>
    <div class="project-case-studies">${experience.projectsData.map((project) => `<section id="${project.id}" class="project-case-study">
      <header><span>${project.number}</span><div><p class="eyebrow">${content.eyebrow}</p><h2>${project.title}</h2><p>${project.strapline}</p></div></header>
      ${projectImage(project, localeKey)}
      <div class="project-evidence-grid">
        <article><span>${content.labels.problem}</span><p>${project.problem}</p></article>
        <article><span>${content.labels.design}</span><p>${project.design}</p></article>
        <article><span>${content.labels.learning}</span><p>${project.learning}</p></article>
        <article><span>${content.labels.status}</span><p>${project.status}</p></article>
      </div>
      <aside><span>${content.labels.next}</span><strong>${project.next}</strong></aside>
      ${projectRelatedWriting(project, localeKey)}
    </section>`).join("")}</div>
    <section id="publications" class="section-block research-publications">
      <div class="section-heading"><p class="eyebrow">${labels.publicationsEyebrow}</p><div><h2>${labels.publicationsTitle}</h2><p>${academicPageContent[localeKey].research.publicationsNotice}</p></div></div>
      <div class="scholar-list">${publishedPublications.map((item) => `<article class="publication-card"><span>${publicationStatusLabel(item.status, localeKey)}</span><strong>${item.title}</strong><p class="publication-citation">${formatPublicationCitation(item)}</p><small>${publicationSummaryFor(item, localeKey)}</small>${renderPublicationActions(item, localeKey)}</article>`).join("")}</div>
    </section>
    <section class="section-block research-publications">
      <div class="section-heading"><p class="eyebrow">${labels.preprintsEyebrow}</p><div><h2>${labels.preprintsTitle}</h2><p>${labels.preprintsIntro}</p></div></div>
      <div class="scholar-list">${preprints.map((item) => `<article class="publication-card"><span>${publicationStatusLabel(item.status, localeKey)}</span><strong>${item.title}</strong><p class="publication-citation">${formatPublicationCitation(item)}</p><small>${publicationSummaryFor(item, localeKey)}</small>${renderPublicationActions(item, localeKey)}</article>`).join("")}</div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${experience.nav.research} | ${locale.siteName}`, descriptionText: content.intro, body, pageType: "research" });
};

const buildMergedResourcesPage = (localeKey) => {
  const locale = locales[localeKey];
  const pilot = experienceContent[localeKey];
  const resources = pilot.resources;
  const groupUi = {
    en: {
      goniometryTitle: "Goniometry",
      goniometryIntro: "Interactive mini-OSPE activities for practising landmark identification and goniometer placement across different joints.",
      otherTitle: "Other interactive resources",
      otherIntro: "Games, knowledge checks, notes, and writing that support wider teaching and clinical-reasoning practice.",
    },
    "zh-hant": {
      goniometryTitle: "關節量角測量",
      goniometryIntro: "透過不同關節的互動小型 OSPE 活動，練習辨認解剖標誌及放置量角器。",
      otherTitle: "其他互動資源",
      otherIntro: "支援教學及臨床推理練習的遊戲、知識檢查、筆記與文章。",
    },
    "zh-hans": {
      goniometryTitle: "关节量角测量",
      goniometryIntro: "通过不同关节的互动小型 OSPE 活动，练习辨认解剖标志及放置量角器。",
      otherTitle: "其他互动资源",
      otherIntro: "支持教学及临床推理练习的游戏、知识检查、笔记与文章。",
    },
  }[localeKey];
  const prefix = rootPrefixFor(localeKey, false);
  const resourceHref = (href) => {
    if (href === "notes.html") return notesHrefFor(localeKey, localeKey, false);
    if (href === "writing.html") return staticPageHref("writing", localeKey, localeKey, false);
    if (href === "ai-literacy-check.html") return staticPageHref("ai-literacy-check", localeKey, localeKey, false);
    if (href === "reasoning-runner.html") return staticPageHref("reasoning-runner", localeKey, localeKey, false);
    if (href === "clinical-readiness-lab.html") return staticPageHref("clinical-readiness-lab", localeKey, localeKey, false);
    if (href === "elbow-goniometry") return localeKey === "en" ? `${prefix}/elbow-goniometry/index.html` : `${prefix}/elbow-goniometry/index.html?lang=${localeKey}`;
    if (href === "ankle-goniometry") return localeKey === "en" ? `${prefix}/ankle-goniometry/index.html` : `${prefix}/ankle-goniometry/index.html?lang=${localeKey}`;
    if (href === "shoulder-goniometry") return localeKey === "en" ? `${prefix}/shoulder-goniometry/index.html` : `${prefix}/shoulder-goniometry/index.html?lang=${localeKey}`;
    if (href === "shoulder-rotation-goniometry") return localeKey === "en" ? `${prefix}/shoulder-rotation-goniometry/index.html` : `${prefix}/shoulder-rotation-goniometry/index.html?lang=${localeKey}`;
    return `${prefix}/${href}`;
  };
  const goniometryItems = resources.items.filter(([, , href]) => String(href).includes("goniometry"));
  const otherItems = resources.items.filter(([, , href]) => !String(href).includes("goniometry"));
  const resourceCards = (items) => items.map(([title, text, href, action]) => `<article><span>${resources.available}</span><h3>${title}</h3><p>${text}</p><a class="secondary-link" href="${resourceHref(href)}">${action}</a></article>`).join("");
  const body = `<article class="portfolio-subpage pilot-resources-page">
    <section class="pilot-page-hero"><p class="eyebrow">${resources.eyebrow}</p><h1>${resources.title}</h1><p>${resources.intro}</p></section>
    <section id="goniometry" class="section-block"><div class="section-heading"><div><p class="eyebrow">${resources.available}</p><h2>${groupUi.goniometryTitle}</h2></div><p>${groupUi.goniometryIntro}</p></div><div class="resource-grid">${resourceCards(goniometryItems)}</div></section>
    <section id="interactive-tools" class="section-block"><div class="section-heading"><div><p class="eyebrow">${resources.available}</p><h2>${groupUi.otherTitle}</h2></div><p>${groupUi.otherIntro}</p></div><div class="resource-grid">${resourceCards(otherItems)}</div></section>
    <section class="section-block"><div class="section-heading"><p class="eyebrow">${resources.developing}</p><h2>${resources.developing}</h2></div><div class="resource-grid muted">${resources.developingItems.map(([title, text]) => `<article><span>${resources.developing}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
    <section class="design-prompt"><p class="eyebrow">${resources.promptTitle}</p><blockquote>${resources.prompt}</blockquote></section>
  </article>`;
  return pageShell({ localeKey, title: `${resources.title} | ${locale.siteName}`, descriptionText: resources.intro, body, pageType: "resources" });
};

const buildMediaPage = (localeKey) => {
  const locale = locales[localeKey];
  const media = experienceContent[localeKey].media;
  const formatSymbols = ["▶", "▤", "◉", "▦"];
  const body = `<article class="portfolio-subpage pilot-media-page">
    <section class="pilot-page-hero media-page-hero">
      <div><p class="eyebrow">${media.eyebrow}</p><h1>${media.title}</h1><p>${media.intro}</p></div>
      <aside class="media-status"><span aria-hidden="true"></span>${media.status}</aside>
    </section>
    <section class="section-block media-formats">
      <div class="section-heading"><p class="eyebrow">${media.formatsEyebrow}</p><div><h2>${media.formatsTitle}</h2><p>${media.formatsIntro}</p></div></div>
      <div class="media-format-grid">${media.formats.map(([title, text, status], index) => `<article class="media-format-card"><header><span class="media-format-number">0${index + 1}</span><span class="media-format-symbol" aria-hidden="true">${formatSymbols[index]}</span></header><div><p class="media-format-status">${status}</p><h3>${title}</h3><p>${text}</p></div></article>`).join("")}</div>
    </section>
    <section class="section-block media-principles">
      <div class="section-heading"><p class="eyebrow">${media.principlesEyebrow}</p><div><h2>${media.principlesTitle}</h2><p>${media.principlesIntro}</p></div></div>
      <div class="media-principle-grid">${media.principles.map(([title, text], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
    </section>
    <section class="media-first-collection">
      <div><p class="eyebrow">${media.firstEyebrow}</p><h2>${media.firstTitle}</h2><ol>${media.firstItems.map((item) => `<li>${item}</li>`).join("")}</ol></div>
      <aside><span aria-hidden="true">●</span><p>${media.note}</p></aside>
    </section>
    <section class="section-block media-instagram-section">
      <div class="section-heading"><p class="eyebrow">${media.instagramEyebrow}</p><div><h2>${media.instagramTitle}</h2><p>${media.instagramIntro}</p></div></div>
      <div class="media-instagram-grid">
        ${media.instagramItems.map(([title, text, label, date, href]) => `<article class="media-instagram-card"><span>${label}</span><h3>${title}</h3><p>${text}</p><footer><time>${date}</time><a href="${href}" target="_blank" rel="noopener noreferrer">${media.instagramAction}<span aria-hidden="true"> ↗</span></a></footer></article>`).join("")}
      </div>
      <a class="secondary-link media-instagram-profile" href="https://www.instagram.com/yutakwing002/" target="_blank" rel="noopener noreferrer">${media.instagramProfileAction}<span aria-hidden="true"> ↗</span></a>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${media.title} | ${locale.siteName}`, descriptionText: media.intro, body, pageType: "media" });
};

const buildMergedCollaboratePage = (localeKey) => {
  const locale = locales[localeKey];
  const pilot = experienceContent[localeKey];
  const content = pilot.collaborate;
  const academic = academicPageContent[localeKey];
  const body = `<article class="portfolio-subpage pilot-collaborate-page">
    <section class="pilot-page-hero"><p class="eyebrow">${content.eyebrow}</p><h1>${content.title}</h1><p>${content.intro}</p></section>
    <section class="collaborate-layout">
      <figure><img src="${rootPrefixFor(localeKey, false)}/assets/contact-page-vr-portrait.webp" alt="${academic.contact.imageAlt}" width="1078" height="1438" /></figure>
      <div class="collaborate-copy"><h2>${content.interestsTitle}</h2>${renderList(content.interests)}<article><span>${content.details}</span><p><strong>${locale.displayName}</strong><br>${academic.profile.appointment}<br>${academic.profile.school}<br>${academic.profile.institution}</p>${renderEmailLinks(localeKey)}</article></div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${content.title} | ${locale.siteName}`, descriptionText: content.intro, body, pageType: "collaborate" });
};

const buildMergedRedirectPage = (localeKey, title, message, destination, action) => {
  const locale = locales[localeKey];
  const body = `<article class="portfolio-subpage"><section class="pilot-page-hero"><h1>${title}</h1><p>${message}</p><a class="primary-link" href="${staticPageHref(destination, localeKey, localeKey, false)}">${action}</a></section></article>`;
  return pageShell({ localeKey, title: `${title} | ${locale.siteName}`, descriptionText: message, body, pageType: destination });
};

const buildNotes = (localeKey) => {
  const locale = locales[localeKey];
  const ui = notesUi[localeKey];
  const prefix = rootPrefixFor(localeKey, false);
  const pathwayCategories = ["education", "technology", "physiotherapy", "research"];
  const pathwayColours = {
    education: "#e5963b",
    technology: "#9e77d2",
    physiotherapy: "#45a970",
    research: "#4e9fbd",
  };
  const stationMarker = (categories) => {
    const colours = categories.map((category) => pathwayColours[category]).filter(Boolean);
    if (colours.length < 2) return colours[0] || pathwayColours.education;
    const segment = 100 / colours.length;
    return `conic-gradient(${colours.map((colour, index) => `${colour} ${index * segment}% ${(index + 1) * segment}%`).join(", ")})`;
  };
  const pathwayMap = pathwayCategories.map((category) => {
    const routeNotes = notes.filter((item) => item.group === category);
    return `<section class="pathway-route pathway-${category}" aria-labelledby="pathway-${category}">
      <button type="button" class="pathway-route-label" id="pathway-${category}" data-filter="${category}">
        <span>${ui.filters[category]}</span><small>${routeNotes.length}</small>
      </button>
      <div class="pathway-track">
        <span class="pathway-line" aria-hidden="true"></span>
        <div class="pathway-stations" style="--station-count:${routeNotes.length}">
          ${routeNotes.map((item) => {
            const content = item.content[localeKey];
            const categories = item.categories.split(" ");
            const interchange = categories.length > 1 ? " is-interchange" : "";
            return `<button type="button" class="pathway-station${interchange}" data-note-id="${item.id}" data-filter="${category}" style="--station-marker:${stationMarker(categories)}" aria-label="${ui.openLabel}: ${content.title}">
              <span class="station-dot" aria-hidden="true"></span>
              <span class="station-copy"><strong>${content.label}</strong><small>${content.eyebrow}</small></span>
            </button>`;
          }).join("")}
        </div>
      </div>
    </section>`;
  }).join("");
  const filterButtons = Object.entries(ui.filters)
    .map(([key, label]) => `<button type="button" class="notes-filter${key === "all" ? " is-active" : ""}" data-filter="${key}">${label}</button>`)
    .join("");
  const noteCards = notes
    .map((item) => {
      const content = item.content[localeKey];
      return `<details class="academic-note" id="${item.id}" data-category="${item.categories}">
        <summary><span>${content.eyebrow}</span><strong>${content.title}</strong></summary>
        <div class="note-body">${content.body}</div>
      </details>`;
    })
    .join("");
  const body = `<article class="notes-page">
    <section class="notes-hero">
      <div>
        <p class="eyebrow">${ui.heroEyebrow}</p>
        <h1>${ui.heroTitle}</h1>
        <p>${ui.heroDescription}</p>
      </div>
      <aside class="privacy-note">${ui.privacy}</aside>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${ui.graphEyebrow}</p>
        <div><h2>${ui.graphTitle}</h2><p>${ui.graphDescription}</p></div>
      </div>
      <div id="notes-graph" class="pathway-map" aria-label="${ui.graphLabel}">
        <div class="pathway-legend"><span><i class="legend-station"></i>${ui.openLabel}</span><span><i class="legend-station is-interchange"></i>${localeKey === "en" ? "Connected themes" : localeKey === "zh-hant" ? "連接多個主題" : "连接多个主题"}</span></div>
        ${pathwayMap}
      </div>
    </section>

    <section class="notes-library">
      <div class="notes-library-intro">
        <p class="eyebrow">${ui.libraryEyebrow}</p>
        <h2>${ui.libraryTitle}</h2>
        <div class="notes-toolbar" role="group" aria-label="${ui.filterLabel}">${filterButtons}</div>
      </div>
      <div class="notes-list">${noteCards}</div>
    </section>

    <a class="notes-back" href="${staticPageHref("resources", localeKey, localeKey, false)}">← ${ui.back}</a>
  </article>`;

  return pageShell({
    localeKey,
    title: `${ui.title} | ${locale.siteName}`,
    descriptionText: ui.description,
    body,
    pageType: "notes",
    extraHead: `    <link rel="stylesheet" href="${prefix}/notes.css?v=${assetVersion}" />`,
    extraScripts: `    <script src="${prefix}/notes.js?v=${assetVersion}"></script>`,
  });
};

const aiLiteracyPageContent = {
  en: {
    title: "AI Literacy Check",
    description: "A 15-question reflective knowledge check on verification, privacy, bias, and responsible AI use for health professions education.",
    eyebrow: "Interactive learning tool",
    heading: "How AI literate are you?",
    lede: "A short knowledge check for health professional students, lecturers, and other learners. Test how well you can use AI critically, safely, and responsibly.",
    meta: ["15 questions", "About 6 minutes", "Instant feedback", "Personal results stay on this device"],
    noticeTitle: "This is a learning activity, not a validated assessment.",
    notice: "It is a simplified knowledge check inspired by common AI literacy themes. Your role, age band, answers, and score remain in this browser so that local group averages can be displayed below. Only anonymous page views, starts, and completions are counted centrally.",
    before: "Before you begin",
    about: "About you",
    role: "Which best describes your role?",
    age: "Age group",
    select: "Select one",
    roles: [["Student", "Student"], ["Lecturer", "Lecturer"], ["Other", "Other"]],
    ages: [["Under 18", "Under 18"], ["18–24", "18–24"], ["25–34", "25–34"], ["35–44", "35–44"], ["45–54", "45–54"], ["55–64", "55–64"], ["65+", "65+"], ["Prefer not to say", "Prefer not to say"]],
    privacy: "Choose ‘Prefer not to say’ if you do not wish to provide your age group. These details remain on this device.",
    progress: "Your progress",
    result: "See my result",
    reset: "Start again",
    savedEyebrow: "Results saved on this device",
    groupResults: "Group results",
    groupSummary: "Complete the quiz to begin building the local results summary.",
    clear: "Clear local results",
    aggregatePrivacy: "These aggregates include attempts completed in this browser only. They are not shared across devices and are not suitable for research or formal comparison.",
    disclaimer: "Designed for reflection and discussion in health professions education. It does not measure clinical competence and should not be used for grading, selection, staff appraisal, or research without validation and appropriate ethical review.",
  },
  "zh-hant": {
    title: "人工智能素養檢查",
    description: "為健康專業教育而設的 15 題反思活動，涵蓋核實、私隱、偏見及負責任使用人工智能。",
    eyebrow: "互動學習工具",
    heading: "你的人工智能素養如何？",
    lede: "這項簡短的知識檢查適合健康專業學生、教師及其他學習者，幫助你檢視自己能否以批判、安全和負責任的方式使用人工智能。",
    meta: ["15 題", "約 6 分鐘", "即時回饋", "個人結果只儲存在此裝置"],
    noticeTitle: "這是一項學習活動，並非經驗證的評估工具。",
    notice: "內容參考常見的人工智能素養主題並加以簡化。你的身分、年齡組別、答案及分數只會儲存在此瀏覽器，以便顯示本機的分組平均結果；網站只會集中統計匿名頁面瀏覽、開始及完成次數。",
    before: "開始之前",
    about: "關於你",
    role: "以下哪一項最能描述你的身分？",
    age: "年齡組別",
    select: "請選擇",
    roles: [["Student", "學生"], ["Lecturer", "教師"], ["Other", "其他"]],
    ages: [["Under 18", "18 歲以下"], ["18–24", "18–24 歲"], ["25–34", "25–34 歲"], ["35–44", "35–44 歲"], ["45–54", "45–54 歲"], ["55–64", "55–64 歲"], ["65+", "65 歲或以上"], ["Prefer not to say", "不願透露"]],
    privacy: "若你不想提供年齡組別，請選擇「不願透露」。這些資料只會保留在此裝置。",
    progress: "作答進度",
    result: "查看結果",
    reset: "重新開始",
    savedEyebrow: "儲存在此裝置的結果",
    groupResults: "分組結果",
    groupSummary: "完成檢查後，此處會開始顯示本機結果摘要。",
    clear: "清除本機結果",
    aggregatePrivacy: "這些摘要只包括在此瀏覽器完成的作答，不會在不同裝置之間共享，也不適合作研究或正式比較。",
    disclaimer: "本工具旨在促進健康專業教育中的反思與討論。它不會量度臨床能力，也不應在未經驗證及適當倫理審查的情況下用於評分、甄選、員工評核或研究。",
  },
  "zh-hans": {
    title: "人工智能素养检查",
    description: "为健康专业教育而设的 15 题反思活动，涵盖核实、隐私、偏见及负责任使用人工智能。",
    eyebrow: "互动学习工具",
    heading: "你的人工智能素养如何？",
    lede: "这项简短的知识检查适合健康专业学生、教师及其他学习者，帮助你检视自己能否以批判、安全和负责任的方式使用人工智能。",
    meta: ["15 题", "约 6 分钟", "即时反馈", "个人结果只储存在此设备"],
    noticeTitle: "这是一项学习活动，并非经过验证的评估工具。",
    notice: "内容参考常见的人工智能素养主题并加以简化。你的身份、年龄组别、答案及分数只会储存在此浏览器，以便显示本地的分组平均结果；网站只会集中统计匿名页面浏览、开始及完成次数。",
    before: "开始之前",
    about: "关于你",
    role: "以下哪一项最能描述你的身份？",
    age: "年龄组别",
    select: "请选择",
    roles: [["Student", "学生"], ["Lecturer", "教师"], ["Other", "其他"]],
    ages: [["Under 18", "18 岁以下"], ["18–24", "18–24 岁"], ["25–34", "25–34 岁"], ["35–44", "35–44 岁"], ["45–54", "45–54 岁"], ["55–64", "55–64 岁"], ["65+", "65 岁或以上"], ["Prefer not to say", "不愿透露"]],
    privacy: "若你不想提供年龄组别，请选择“不愿透露”。这些资料只会保留在此设备。",
    progress: "作答进度",
    result: "查看结果",
    reset: "重新开始",
    savedEyebrow: "储存在此设备的结果",
    groupResults: "分组结果",
    groupSummary: "完成检查后，此处会开始显示本地结果摘要。",
    clear: "清除本地结果",
    aggregatePrivacy: "这些摘要只包括在此浏览器完成的作答，不会在不同设备之间共享，也不适合作研究或正式比较。",
    disclaimer: "本工具旨在促进健康专业教育中的反思与讨论。它不会衡量临床能力，也不应在未经验证及适当伦理审查的情况下用于评分、甄选、员工评核或研究。",
  },
};

const selectOptions = (items) => items.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");

const buildAiLiteracyPage = (localeKey) => {
  const ui = aiLiteracyPageContent[localeKey];
  const prefix = localeKey === "en" ? "." : "..";
  const body = `<div class="quiz-page">
    <section class="quiz-hero"><p class="eyebrow">${ui.eyebrow}</p><h1>${ui.heading}</h1><p>${ui.lede}</p><div class="quiz-meta">${ui.meta.map((item) => `<span>${item}</span>`).join("")}</div></section>
    <aside class="quiz-intro"><strong>${ui.noticeTitle}</strong> ${ui.notice}</aside>
    <form id="literacy-quiz" novalidate>
      <section class="quiz-profile" aria-labelledby="profile-title"><p class="eyebrow">${ui.before}</p><h2 id="profile-title">${ui.about}</h2><div class="profile-grid"><label><span>${ui.role}</span><select id="participant-role" required><option value="">${ui.select}</option>${selectOptions(ui.roles)}</select></label><label><span>${ui.age}</span><select id="participant-age" required><option value="">${ui.select}</option>${selectOptions(ui.ages)}</select></label></div><p class="privacy-note profile-privacy">${ui.privacy}</p></section>
      <div class="quiz-progress-wrap"><div class="quiz-progress-label"><strong>${ui.progress}</strong><span id="quiz-progress-text"></span></div><div class="quiz-progress" id="quiz-progress" role="progressbar" aria-label="${ui.progress}" aria-valuemin="0" aria-valuemax="15" aria-valuenow="0"><span id="quiz-progress-bar"></span></div></div><div id="quiz-questions"></div><p id="quiz-warning" class="quiz-warning" role="alert"></p><div class="quiz-actions"><button class="quiz-button" type="submit">${ui.result}</button><button class="quiz-button secondary" id="quiz-reset" type="button">${ui.reset}</button></div>
    </form>
    <section id="quiz-result" class="quiz-result" aria-live="polite" hidden></section>
    <section class="aggregate-results" aria-labelledby="aggregate-title"><p class="eyebrow">${ui.savedEyebrow}</p><h2 id="aggregate-title">${ui.groupResults}</h2><p id="aggregate-summary">${ui.groupSummary}</p><div id="aggregate-groups" class="aggregate-grid"></div><div class="quiz-actions"><button class="quiz-button danger" id="quiz-clear-results" type="button">${ui.clear}</button></div><p class="privacy-note">${ui.aggregatePrivacy}</p></section>
    <p class="quiz-disclaimer">${ui.disclaimer}</p>
  </div>`;

  return pageShell({
    localeKey,
    title: `${ui.title} | ${locales[localeKey].siteName}`,
    descriptionText: ui.description,
    body,
    pageType: "ai-literacy-check",
    activeNavKey: "resources",
    extraHead: `    <link rel="stylesheet" href="${prefix}/ai-literacy-check.css?v=${aiLiteracyAssetVersion}" />`,
    extraScripts: `    <script src="${prefix}/game-analytics.js?v=20260730-analytics-v2"></script>\n    <script src="${prefix}/ai-literacy-check.js?v=${aiLiteracyAssetVersion}"></script>`,
  });
};

const buildReasoningRunnerPage = (localeKey) => {
  const locale = locales[localeKey];
  const game = reasoningRunnerContent[localeKey];
  const prefix = rootPrefixFor(localeKey, false);
  const runnerData = JSON.stringify(game)
    .replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
  const legendClasses = ["evidence", "hazard", "checkpoint"];
  const body = `<article class="portfolio-subpage runner-game">
    <div class="game-shell">
      <header class="game-header">
        <div><p class="eyebrow">${game.eyebrow}</p><h1>${game.title}</h1><p class="subtitle">${game.subtitle}</p></div>
        <div class="score-panel" aria-live="polite">
          <div><span class="score-label">${game.score}</span><strong id="score">0</strong></div>
          <div><span class="score-label">${game.evidence}</span><strong id="evidence">0</strong></div>
          <div><span class="score-label">${game.best}</span><strong id="bestScore">0</strong></div>
        </div>
      </header>
      <p id="gameStatus" class="visually-hidden" aria-live="polite"></p>
      <section class="game-card" aria-label="${game.title}">
        <canvas id="gameCanvas" width="960" height="420" tabindex="0" role="img" aria-label="${game.canvasLabel}">${game.canvasLabel}</canvas>
        <div id="startOverlay" class="overlay">
          <div class="overlay-card"><div class="runner-mark" aria-hidden="true">CR</div><h2>${game.startTitle}</h2><p>${game.startText}</p>
            <div class="instructions-grid">${game.controls.map(([key, label]) => `<div><span class="key">${key}</span><span>${label}</span></div>`).join("")}</div>
            <button id="startButton" class="primary-button" type="button">${game.start}</button>
          </div>
        </div>
        <div id="gameOverOverlay" class="overlay hidden">
          <div class="overlay-card"><p class="eyebrow">${game.simulationComplete}</p><h2 id="gameOverTitle">${game.interrupted}</h2><p id="finalMessage"></p><div class="final-score"><span>${game.finalScore}</span><strong id="finalScore">0</strong></div><button id="restartButton" class="primary-button" type="button">${game.restart}</button></div>
        </div>
        <div id="questionOverlay" class="overlay hidden">
          <div class="overlay-card question-card"><p class="eyebrow">${game.checkpoint}</p><h2 id="questionText"></h2><div id="answerButtons" class="answer-list"></div><p id="feedbackText" class="feedback" aria-live="polite"></p><button id="continueButton" class="primary-button" type="button" hidden>${game.continue}</button></div>
        </div>
      </section>
      <section class="runner-controls" aria-label="${game.title}"><button id="jumpButton" type="button">${game.jump}</button><button id="duckButton" type="button">${game.duck}</button><button id="pauseButton" type="button" aria-pressed="false">${game.pause}</button></section>
      <section class="legend">${game.legend.map(([symbol, title, text], index) => `<article><span class="legend-symbol ${legendClasses[index]}-symbol" aria-hidden="true">${symbol}</span><div><strong>${title}</strong><p>${text}</p></div></article>`).join("")}</section>
      <div class="runner-support-grid"><section class="about-game"><h2>${game.whyTitle}</h2><p>${game.whyText}</p></section><aside class="runner-disclaimer"><h2>${game.privacyTitle}</h2><p>${game.privacyText}</p></aside></div>
      <a class="runner-back" href="${staticPageHref("resources", localeKey, localeKey, false)}">← ${game.back}</a>
    </div>
  </article>`;

  return pageShell({
    localeKey,
    title: `${game.title}: ${game.subtitle} | ${locale.siteName}`,
    descriptionText: game.description,
    body,
    pageType: "reasoning-runner",
    activeNavKey: "resources",
    extraHead: `    <link rel="stylesheet" href="${prefix}/reasoning-runner.css?v=${reasoningRunnerAssetVersion}" />`,
    extraScripts: `    <script>window.REASONING_RUNNER_CONTENT=${runnerData};</script>\n    <script src="${prefix}/game-analytics.js?v=20260730-analytics-v2"></script>\n    <script src="${prefix}/reasoning-runner.js?v=${reasoningRunnerAssetVersion}"></script>`,
  });
};

const buildClinicalReadinessPage = (localeKey) => {
  const locale = locales[localeKey];
  const lab = clinicalReadinessContent[localeKey];
  const prefix = rootPrefixFor(localeKey, false);
  const labData = JSON.stringify(lab)
    .replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
  const body = `<article class="portfolio-subpage readiness-lab">
    <div class="lab-shell">
      <header class="lab-header">
        <div><p class="eyebrow">${lab.eyebrow}</p><h1>${lab.title}</h1><p class="subtitle">${lab.subtitle}</p><p class="lab-intro">${lab.intro}</p></div>
        <div class="lab-status-panel" aria-live="polite">
          <div><span>${lab.status.ai}</span><strong id="aiStatus">${lab.status.incomplete}</strong></div>
          <div><span>${lab.status.vr}</span><strong id="vrStatus">${lab.status.incomplete}</strong></div>
          <div><span>${lab.status.simulation}</span><strong id="simulationStatus">${lab.status.incomplete}</strong></div>
        </div>
      </header>
      <p id="readinessStatus" class="visually-hidden" aria-live="polite"></p>
      <section class="lab-game-wrap" aria-label="${lab.title}">
        <canvas id="readinessGame" width="960" height="640" tabindex="0" role="img" aria-label="${lab.canvasLabel}">${lab.canvasLabel}</canvas>
        <div id="readinessStart" class="lab-overlay"><div class="lab-card"><p class="eyebrow">${lab.startEyebrow}</p><h2>${lab.startTitle}</h2><p>${lab.startText}</p><div class="lab-keys">${lab.controls.map(([key, action]) => `<div><strong>${key}</strong><span>${action}</span></div>`).join("")}</div><button id="readinessStartButton" class="lab-primary" type="button">${lab.enter}</button></div></div>
        <div id="readinessDialogue" class="lab-overlay hidden"><div class="lab-card left"><div class="lab-speaker"><div id="speakerIcon" class="lab-speaker-icon">AI</div><div><p id="speakerRole" class="eyebrow"></p><h2 id="speakerName"></h2></div></div><p id="dialogueText"></p><div id="dialogueButtons" class="lab-buttons"></div></div></div>
        <div id="readinessQuiz" class="lab-overlay hidden"><div class="lab-card left"><p id="quizLabel" class="eyebrow"></p><h2 id="quizQuestion"></h2><div id="quizAnswers" class="lab-buttons"></div><p id="quizFeedback" class="lab-feedback" aria-live="polite"></p><button id="quizContinue" class="lab-primary" type="button" hidden>${lab.continue}</button><button id="quizRetry" class="lab-primary" type="button" hidden>${lab.tryAgain}</button></div></div>
        <div id="readinessComplete" class="lab-overlay hidden"><div class="lab-card"><p class="eyebrow">${lab.completeEyebrow}</p><h2>${lab.completeTitle}</h2><ul class="lab-completion-list">${lab.profile.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join("")}</ul><blockquote>${lab.completionQuote}</blockquote><button id="readinessRestartButton" class="lab-primary" type="button">${lab.exploreAgain}</button></div></div>
      </section>
      <section class="lab-station-shortcuts" aria-label="${lab.accessTitle}"><strong>${lab.accessTitle}</strong><div>${lab.access.map(([id, label]) => `<button type="button" data-readiness-station="${id}">${label}</button>`).join("")}</div></section>
      <section class="lab-mobile-controls" aria-label="${lab.controls[0][1]}"><button type="button" data-readiness-key="ArrowUp" aria-label="${lab.controls[0][1]} up">▲</button><div><button type="button" data-readiness-key="ArrowLeft" aria-label="${lab.controls[0][1]} left">◀</button><button id="readinessInteractButton" type="button">${lab.interact}</button><button type="button" data-readiness-key="ArrowRight" aria-label="${lab.controls[0][1]} right">▶</button></div><button type="button" data-readiness-key="ArrowDown" aria-label="${lab.controls[0][1]} down">▼</button></section>
      <section class="lab-stations">${lab.info.map(([symbol, title, text]) => `<article><span aria-hidden="true">${symbol}</span><h2>${title}</h2><p>${text}</p></article>`).join("")}</section>
      <div class="lab-support"><section class="lab-about"><h2>${lab.whyTitle}</h2><p>${lab.whyText}</p></section><aside class="lab-notice"><h2>${lab.noticeTitle}</h2><p>${lab.noticeText}</p></aside></div>
      <a class="lab-back" href="${staticPageHref("resources", localeKey, localeKey, false)}">← ${lab.back}</a>
    </div>
  </article>`;

  return pageShell({
    localeKey,
    title: `${lab.title}: ${lab.subtitle} | ${locale.siteName}`,
    descriptionText: lab.description,
    body,
    pageType: "clinical-readiness-lab",
    activeNavKey: "resources",
    extraHead: `    <link rel="stylesheet" href="${prefix}/clinical-readiness-lab.css?v=${clinicalReadinessAssetVersion}" />`,
    extraScripts: `    <script>window.CLINICAL_READINESS_CONTENT=${labData};</script>\n    <script src="${prefix}/game-analytics.js?v=20260730-analytics-v2"></script>\n    <script src="${prefix}/clinical-readiness-lab.js?v=${clinicalReadinessAssetVersion}"></script>`,
  });
};

const buildPost = (post, localeKey) => {
  const locale = locales[localeKey];
  const title = titleFor(post, localeKey);
  const articleBody = articleBodies[localeKey]?.[post.ID];
  const imageCaption = postImageCaptions[localeKey]?.[post.ID];
  const formatLabel = practiceNotePostIds.has(post.ID) ? `${writingPageContent[localeKey].practiceLabel} · ` : "";
  if (!articleBody) throw new Error(`Missing ${localeKey} article body for post ${post.ID}`);
  const renderedArticleBody = articleBody.replaceAll("{{assetRoot}}", rootPrefixFor(localeKey, true));
  const body = `<article class="post-article">
    <header class="post-header">
      <a class="back-link" href="${staticPageHref("writing", localeKey, localeKey, true)}">${locale.backArchive}</a>
      <p class="content-meta">${formatLabel}${categoryFor(post, locale)} · <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time></p>
      <h1>${title}</h1>
      <p class="post-standfirst">${summaryFor(post, localeKey, 220)}</p>
    </header>
    <figure class="post-figure">
      ${postImage(post, localeKey, true)}
      ${imageCaption ? `<figcaption>${imageCaption}</figcaption>` : ""}
    </figure>
    <div class="post-content" lang="${locale.lang}">${renderedArticleBody}</div>
    <nav class="post-nav" aria-label="Post navigation">
      <a href="${staticPageHref("writing", localeKey, localeKey, true)}">${locale.backArchive}</a>
    </nav>
  </article>`;

  return pageShell({
    localeKey,
    title: `${title} | ${locale.siteName}`,
    descriptionText: summaryFor(post, localeKey, 220),
    body,
    post,
    pageType: "writing",
  });
};

for (const locale of Object.values(locales)) {
  const localeRoot = locale.path ? path.join(root, locale.path) : root;
  const postsDir = path.join(localeRoot, "posts");
  if (locale.path) fs.rmSync(localeRoot, { recursive: true, force: true });
  else fs.rmSync(postsDir, { recursive: true, force: true });
  fs.mkdirSync(postsDir, { recursive: true });
}

const addExternalLinkTargets = (html) => html.replace(/<a\b[^>]*>/gi, (tag) => {
  const externalHref = tag.match(/\bhref=(["'])(https?:\/\/[^"']+)\1/i);
  if (!externalHref || /\btarget\s*=/i.test(tag)) return tag;
  const normalisedTag = tag.replace(externalHref[0], `href="${externalHref[2]}"`);
  return normalisedTag.replace(/>$/, ' target="_blank" rel="noopener noreferrer">');
});

const writeHtml = (filePath, html) => {
  fs.writeFileSync(filePath, addExternalLinkTargets(html));
};

for (const [localeKey, locale] of Object.entries(locales)) {
  const localeRoot = locale.path ? path.join(root, locale.path) : root;
  const postsDir = path.join(localeRoot, "posts");
  const content = experienceContent[localeKey];
  writeHtml(path.join(localeRoot, "index.html"), buildMergedIndex(localeKey));
  writeHtml(path.join(localeRoot, "notes.html"), buildNotes(localeKey));
  writeHtml(path.join(localeRoot, "about.html"), buildMergedAboutPage(localeKey));
  writeHtml(path.join(localeRoot, "research.html"), buildMergedResearchPage(localeKey));
  writeHtml(path.join(localeRoot, "teaching.html"), buildTeachingPage(localeKey));
  writeHtml(path.join(localeRoot, "media.html"), buildMediaPage(localeKey));
  writeHtml(path.join(localeRoot, "resources.html"), buildMergedResourcesPage(localeKey));
  writeHtml(path.join(localeRoot, "collaborate.html"), buildMergedCollaboratePage(localeKey));
  writeHtml(path.join(localeRoot, "writing.html"), buildWritingPage(localeKey));
  writeHtml(path.join(localeRoot, "ai-literacy-check.html"), buildAiLiteracyPage(localeKey));
  writeHtml(path.join(localeRoot, "reasoning-runner.html"), buildReasoningRunnerPage(localeKey));
  writeHtml(path.join(localeRoot, "clinical-readiness-lab.html"), buildClinicalReadinessPage(localeKey));
  writeHtml(path.join(localeRoot, "projects.html"), buildMergedRedirectPage(localeKey, content.projects.title, content.projects.intro, "research", content.nav.research));
  writeHtml(path.join(localeRoot, "ideas.html"), buildMergedRedirectPage(localeKey, content.ideas.title, content.ideas.intro, "resources", content.nav.resources));
  writeHtml(path.join(localeRoot, "publications.html"), buildMergedRedirectPage(localeKey, locale.nav.publications, content.projects.intro, "research", content.nav.research));
  writeHtml(path.join(localeRoot, "cv.html"), buildMergedRedirectPage(localeKey, locale.nav.cv, content.story.intro, "about", content.nav.about));
  writeHtml(path.join(localeRoot, "contact.html"), buildMergedRedirectPage(localeKey, locale.nav.contact, content.collaborate.intro, "collaborate", content.nav.collaborate));

  for (const post of posts) {
    writeHtml(path.join(postsDir, `${slugify(post)}.html`), buildPost(post, localeKey));
  }

  const searchIndex = buildSearchEntries(localeKey);
  const localizedSearchIndex = localizePersonalName(JSON.stringify(searchIndex, null, 2), localeKey);
  fs.writeFileSync(path.join(localeRoot, "search-index.json"), `${localizedSearchIndex}\n`);
  const inlineSearchIndex = localizePersonalName(JSON.stringify(searchIndex), localeKey)
    .replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
  fs.writeFileSync(path.join(localeRoot, "search-index-inline.js"), `window.SEARCH_INDEX=${inlineSearchIndex};\n`);
}

fs.writeFileSync(path.join(root, ".nojekyll"), "");
const sitemapEntries = [
  absoluteUrlFor("en", { pageType: "home" }),
  absoluteUrlFor("en", { pageName: "about", pageType: "about" }),
  absoluteUrlFor("en", { pageName: "research", pageType: "research" }),
  absoluteUrlFor("en", { pageName: "teaching", pageType: "teaching" }),
  absoluteUrlFor("en", { pageName: "media", pageType: "media" }),
  absoluteUrlFor("en", { pageName: "resources", pageType: "resources" }),
  absoluteUrlFor("en", { pageName: "collaborate", pageType: "collaborate" }),
  absoluteUrlFor("en", { pageName: "writing", pageType: "writing" }),
  absoluteUrlFor("en", { pageType: "notes" }),
  absoluteUrlFor("en", { pageType: "ai-literacy-check", pageName: "ai-literacy-check" }),
  absoluteUrlFor("en", { pageType: "reasoning-runner", pageName: "reasoning-runner" }),
  absoluteUrlFor("en", { pageType: "clinical-readiness-lab", pageName: "clinical-readiness-lab" }),
  new URL("elbow-goniometry/", siteBase).toString(),
  new URL("ankle-goniometry/", siteBase).toString(),
  new URL("shoulder-goniometry/", siteBase).toString(),
  new URL("shoulder-rotation-goniometry/", siteBase).toString(),
  ...posts.map((post) => absoluteUrlFor("en", { post })),
  ...Object.keys(locales).filter((key) => key !== "en").flatMap((localeKey) => [
    absoluteUrlFor(localeKey, { pageType: "home" }),
    absoluteUrlFor(localeKey, { pageType: "notes" }),
    absoluteUrlFor(localeKey, { pageType: "about", pageName: "about" }),
    absoluteUrlFor(localeKey, { pageType: "research", pageName: "research" }),
    absoluteUrlFor(localeKey, { pageType: "teaching", pageName: "teaching" }),
    absoluteUrlFor(localeKey, { pageType: "media", pageName: "media" }),
    absoluteUrlFor(localeKey, { pageType: "resources", pageName: "resources" }),
    absoluteUrlFor(localeKey, { pageType: "collaborate", pageName: "collaborate" }),
    absoluteUrlFor(localeKey, { pageType: "writing", pageName: "writing" }),
    absoluteUrlFor(localeKey, { pageType: "ai-literacy-check", pageName: "ai-literacy-check" }),
    absoluteUrlFor(localeKey, { pageType: "reasoning-runner", pageName: "reasoning-runner" }),
    absoluteUrlFor(localeKey, { pageType: "clinical-readiness-lab", pageName: "clinical-readiness-lab" }),
    ...posts.map((post) => absoluteUrlFor(localeKey, { post })),
  ]),
];
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(sitemapEntries)].map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://yutakwing.github.io/TakWing/sitemap.xml\n");
console.log(`Generated merged local site with ${posts.length} posts in ${Object.keys(locales).length} languages`);
