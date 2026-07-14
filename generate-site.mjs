import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import { articleBodies } from "./article-content.mjs";
import { notes, notesUi } from "./notes-content.mjs";
import {
  aboutContent,
  cvContent,
  englishPagePlaceholders,
  homepageContent,
  profile,
  publicationsContent,
  researchContent,
  teachingContent,
  translatedPagePlaceholders,
} from "./portfolio-content.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const assetVersion = "20260710-desktop-language-fix";
const postsExport = JSON.parse(fs.readFileSync(path.join(root, "wordpress-posts.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "wordpress-site.json"), "utf8"));
const publications = JSON.parse(fs.readFileSync(path.join(root, "data", "publications.json"), "utf8"));
const draftPosts = [
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
const portfolioPostIds = new Set([310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 256, 226, 254, 227, 217, 215, 200, 189, 181, 175, 146, 137]);
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
  310: "hkdse-results-reflection.jpeg",
  309: "assessment-ai-constructive-alignment.svg",
  308: "student-quotients-ai-era.png",
  307: "ai-questioning-clinical-reasoning.png",
  306: "physio-chatgpt-literacy.png",
  305: "ai-assessment-review.png",
  304: "teaching-excellence-award.png",
  303: "ai-academic-acceleration.png",
  302: "productive-struggle-ai.png",
  301: "ai-policy-integrity.png",
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
    imageCredit: "AI-generated editorial illustration",
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
    imageCredit: "人工智能生成的編輯插圖",
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
    imageCredit: "人工智能生成的编辑插图",
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

const aiPostIds = new Set([309, 307, 306, 305, 303, 301, 300, 256, 226]);
const physioPostIds = new Set([217, 215, 200, 189, 181, 175, 146]);

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
    groupDescriptions: {
      physio: "涵盖物理治疗教育、临床推理、虚拟现实、学生支持及健康专业教学。",
      ai: "涵盖人工智能、学术工作流程、评估、政策及具教育目的的负责任应用。",
      reflection: "涵盖专业反思、学术里程碑、教学实践及更广泛的大学生活。",
    },
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

const postImage = (post, localeKey, isPost = false, className = "post-image") => {
  const isFullImagePost = isPost && post.ID === 310;
  const imageClass = isFullImagePost ? `${className} post-image--contain` : className;
  const inlineStyle = isFullImagePost
    ? "display:block;width:100%;height:auto;aspect-ratio:auto;object-fit:contain"
    : "display:block;width:100%;height:auto;aspect-ratio:3 / 2;object-fit:cover";
  return `<img class="${imageClass}" src="${imageSrc(post, localeKey, isPost)}" alt="${postImageAlts[localeKey][post.ID]}" width="1200" height="800" loading="${isPost ? "eager" : "lazy"}" decoding="async" style="${inlineStyle}" />`;
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
  const locale = locales[localeKey];
  const homeHref = pageHref(localeKey, null, localeKey, isPost);
  return [
    { key: "home", label: locale.nav.home, href: homeHref },
    { key: "about", label: locale.nav.about, href: staticPageHref("about", localeKey, localeKey, isPost) },
    { key: "research", label: locale.nav.research, href: staticPageHref("research", localeKey, localeKey, isPost) },
    { key: "teaching", label: locale.nav.teaching, href: staticPageHref("teaching", localeKey, localeKey, isPost) },
    { key: "writing", label: locale.nav.writing, href: staticPageHref("writing", localeKey, localeKey, isPost) },
    { key: "contact", label: locale.nav.contact, href: staticPageHref("contact", localeKey, localeKey, isPost) },
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
}) => {
  const locale = locales[localeKey];
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
${extraHead}
${structuredData ? `    ${structuredData}\n` : ""}  </head>
  <body data-search-index="${searchIndexPath}" data-site-prefix="${new URL(".", canonicalUrl).pathname}">
    <div class="navigation-progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="site-mark" href="${homeHref}"${pageType === "home" ? ' aria-current="page"' : ""}>
        <span>${locale.displayName}</span>
        <small>${profile.headline}</small>
      </a>
      <nav class="top-nav" aria-label="Main navigation">
        <ul>
          ${nav.map((item) => `<li><a href="${item.href}"${(item.key === pageType || (pageType === "home" && item.key === "home")) ? ' aria-current="page"' : ""}>${item.label}</a></li>`).join("")}
          <li><a href="${notesHref}"${pageType === "notes" ? ' aria-current="page"' : ""}>${locale.nav.notes}</a></li>
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
      <button class="icon-button menu-toggle" type="button" aria-label="${locale.menuOpen}" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div class="mobile-panel">
        <button class="icon-button close-menu" type="button" aria-label="${locale.menuClose}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
${languageSelector(localeKey, post, isPost, pageType)}
        ${nav.map((item) => `<a href="${item.href}"${(item.key === pageType || (pageType === "home" && item.key === "home")) ? ' aria-current="page"' : ""}>${item.label}</a>`).join("")}
        <a href="${notesHref}"${pageType === "notes" ? ' aria-current="page"' : ""}>${locale.nav.notes}</a>
      </div>
    </div>
    <div class="page academic-page">
      <main class="content">${body}</main>
      <footer class="site-footer">
        <nav aria-label="Footer links"><a href="mailto:${profile.institutionalEmail}">${locale.nav.contact}</a></nav>
        ${renderFooterProfiles()}
        <p>© 2026 ${locale.displayName}. ${locale.copyright}</p>
      </footer>
    </div>
    <div class="search-overlay" role="dialog" aria-modal="true" aria-label="${locale.search}">
      <div class="search-modal">
        <input type="search" placeholder="${locale.searchPlaceholder}" aria-label="${locale.searchPlaceholder}" />
        <div class="search-results"></div>
      </div>
    </div>
    <script src="${prefix}/script.js?v=${assetVersion}"></script>
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

const author = profile.name || posts[0]?.author?.name || "Tak Wing Yu";

const publicationStatusLabel = (status) =>
  ({
    published: "Published",
    preprint: "Preprint",
    "in-press": "In Press",
    accepted: "Accepted",
    "under-review": "Under Review",
    "verification-pending": "Details pending verification",
  })[status] || status;

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

const renderPublicationActions = (item) => {
  const links = [
    item.url ? `<a class="secondary-link inline-link" href="${item.url}" target="_blank" rel="noreferrer">DOI</a>` : "",
    item.repositoryUrl ? `<a class="secondary-link inline-link" href="${item.repositoryUrl}" target="_blank" rel="noreferrer">Open record</a>` : "",
  ].filter(Boolean);
  return `<div class="citation-actions">
    ${links.join("")}
    <button type="button" class="icon-button citation-copy" data-citation="${formatPublicationCitation(item).replace(/"/g, "&quot;")}" aria-label="Copy citation">⎘</button>
  </div>`;
};

const renderProfileLinks = (className = "profile-links") => {
  const entries = [
    ["ORCID", profile.sameAs.orcid],
    ["Google Scholar", profile.sameAs.googleScholar],
    ["LinkedIn", profile.sameAs.linkedIn],
    ["University staff profile", profile.sameAs.staffProfile],
    ["GitHub", profile.sameAs.github],
  ].filter(([, href]) => href);
  if (!entries.length) return "";
  return `<div class="${className}">${entries.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>`;
};

const renderEmailLinks = (className = "profile-links") => {
  const entries = [
    ["University email", profile.institutionalEmail],
    ["Personal email", profile.personalEmail],
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

  const pageEntries = [
    {
      title: locale.nav.home,
      href: locale.path ? `./${locale.path}/index.html` : "./index.html",
      description: locale.description,
      category: "Portfolio",
      content: localeKey === "en"
        ? searchText(profile.name, profile.headline, profile.secondaryHeadline, homepageContent.heroSummary, homepageContent.biography)
        : searchText(locale.description, locales[localeKey].heroEyebrow),
    },
    {
      title: locale.nav.about,
      href: locale.path ? `./${locale.path}/about.html` : "./about.html",
      description: localeKey === "en" ? englishPagePlaceholders.about.description : translatedPagePlaceholders[localeKey]?.bodyText || englishPagePlaceholders.about.description,
      category: "Portfolio",
      content: portfolioSearchContent(localeKey, "about"),
    },
    {
      title: locale.nav.research,
      href: locale.path ? `./${locale.path}/research.html` : "./research.html",
      description: localeKey === "en" ? englishPagePlaceholders.research.description : translatedPagePlaceholders[localeKey]?.bodyText || englishPagePlaceholders.research.description,
      category: "Portfolio",
      content: portfolioSearchContent(localeKey, "research"),
    },
    {
      title: locale.nav.teaching,
      href: locale.path ? `./${locale.path}/teaching.html` : "./teaching.html",
      description: localeKey === "en" ? englishPagePlaceholders.teaching.description : translatedPagePlaceholders[localeKey]?.bodyText || englishPagePlaceholders.teaching.description,
      category: "Portfolio",
      content: portfolioSearchContent(localeKey, "teaching"),
    },
    {
      title: locale.nav.writing,
      href: locale.path ? `./${locale.path}/writing.html` : "./writing.html",
      description: writingPageContent[localeKey].intro,
      category: "Writing",
      content: searchText(
        writingPageContent[localeKey].intro,
        homepageWritingGroups.flatMap((group) => [group.title[localeKey], writingPageContent[localeKey].groupDescriptions[group.key]]),
        posts.flatMap((post) => [titleFor(post, localeKey), summaryFor(post, localeKey), categoryFor(post, locale)])
      ),
    },
    {
      title: locale.nav.contact,
      href: locale.path ? `./${locale.path}/contact.html` : "./contact.html",
      description: localeKey === "en" ? englishPagePlaceholders.contact.description : translatedPagePlaceholders[localeKey]?.bodyText || englishPagePlaceholders.contact.description,
      category: "Portfolio",
      content: portfolioSearchContent(localeKey, "contact"),
    },
  ];

  return pageEntries
    .concat(posts.map((post) => ({
      title: titleFor(post, localeKey),
      href: locale.path ? `./${locale.path}/posts/${slugify(post)}.html` : `./posts/${slugify(post)}.html`,
      description: summaryFor(post, localeKey),
      date: post.date.slice(0, 10),
      category: categoryFor(post, locale),
      content: searchText(titleFor(post, localeKey), summaryFor(post, localeKey), articleBodies[localeKey]?.[post.ID] || post.content),
    })))
    .concat(notes.map((item) => ({
      title: item.content[localeKey].title,
      href: locale.path ? `./${locale.path}/notes.html#${item.id}` : `./notes.html#${item.id}`,
      description: stripHtml(item.content[localeKey].body).slice(0, 190),
      date: "",
      category: notesUi[localeKey].libraryEyebrow,
      content: searchText(item.content[localeKey].eyebrow, item.content[localeKey].title, item.content[localeKey].body),
    })));
};

const portfolioSearchContent = (localeKey, pageKey) => {
  if (localeKey !== "en") {
    return translatedPagePlaceholders[localeKey]?.bodyText || "";
  }

  if (pageKey === "about") {
    return searchText(
      aboutContent.biography,
      aboutContent.currentAppointment,
      aboutContent.education,
      aboutContent.registration,
      aboutContent.researchInterests,
      aboutContent.leadershipService,
      cvContent.sections.flatMap((section) => section.items)
    );
  }

  if (pageKey === "research") {
    return searchText(
      researchContent.intro,
      homepageContent.researchThemes.flatMap((item) => [item.title, item.summary]),
      homepageContent.currentProjects.flatMap((item) => [item.title, item.summary])
    );
  }

  if (pageKey === "teaching") {
    return searchText(
      teachingContent.intro,
      homepageContent.teachingAreas,
      homepageContent.educationalApproaches,
      homepageContent.curriculumWork,
      teachingContent.innovation
    );
  }

  if (pageKey === "contact") {
    return searchText(profile.name, profile.appointment, profile.school, profile.institution, profile.institutionalEmail, profile.personalEmail);
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
  const profileLinksMarkup = renderProfileLinks();
  const profileLinksSection = profileLinksMarkup ? `\n        ${profileLinksMarkup}` : "";
  const body = `<article class="home-layout portfolio-layout">
    <section id="hero" class="academic-hero portfolio-hero">
      <div class="hero-copy">
        <p class="eyebrow">${locale.heroEyebrow}</p>
        <h1>${locale.displayName}</h1>
        <h2 class="portfolio-headline">${profile.headline}</h2>
        <p class="portfolio-appointment">${profile.appointment}<br>${profile.school}<br>${profile.institution}</p>
        <p class="hero-lede">${homepageContent.heroSummary}</p>
        <div class="hero-actions">
          <a class="primary-link" href="${staticPageHref("about", localeKey, localeKey, false)}">${locale.nav.about}</a>
          <a class="secondary-link" href="${staticPageHref("research", localeKey, localeKey, false)}">${locale.nav.research}</a>
          <a class="secondary-link" href="${staticPageHref("teaching", localeKey, localeKey, false)}">${locale.nav.teaching}</a>
          <a class="secondary-link" href="${staticPageHref("writing", localeKey, localeKey, false)}">${locale.nav.writing}</a>
        </div>
      </div>
      <div class="hero-introduction" aria-label="${locale.profileLabel}">
        <img class="profile-image" src="${rootPrefixFor(localeKey, false)}/assets/profile-tak-wing-yu-portrait.jpg" alt="Portrait of Tak Wing Yu." width="900" height="1200" />
        <div class="introduction-copy">
          <h2>${profile.secondaryHeadline}</h2>
          ${homepageContent.biography.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <dl class="site-stats academic-highlights">
            ${homepageContent.highlights.map(([label, value]) => `<div><dt>${value}</dt><dd>${label}</dd></div>`).join("")}
          </dl>
        </div>
      </div>
    </section>

    <section id="about" class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Profile</p>
        <div>
          <h2>Brief academic profile</h2>
          <p>${homepageContent.biography[0]}</p>
        </div>
      </div>
      <div class="profile-summary-card">
        ${homepageContent.biography.slice(1).map((paragraph) => `<p>${paragraph}</p>`).join("")}
${profileLinksSection}
      </div>
    </section>

    <section id="award" class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Recognition</p>
        <div>
          <h2>Award and recognition</h2>
          <p>A focused acknowledgement of recent recognition in teaching and educational innovation.</p>
        </div>
      </div>
      <article class="award-card">
        <span>Award</span>
        <strong>${homepageContent.awardCard.title}</strong>
        <p>${homepageContent.awardCard.summary}</p>
      </article>
    </section>

    <section id="writing" class="section-block latest-layout">
      <div class="section-heading">
        <p class="eyebrow">Writing</p>
        <div>
          <h2>Latest writing</h2>
          <p>Reflective writing, public scholarship, and blog posts on teaching, learning, AI, VR, and academic work.</p>
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
      <div class="writing-category-panels" aria-label="Writing categories">
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
        <div><p class="eyebrow">Notes</p><h2>Browse the academic notes library</h2></div>
        <p>This section links to the public notes library rather than the blog archive, so working ideas and notebook entries stay clearly separate from published writing.</p>
      </div>
      <div class="archive-links">
        <a class="secondary-link" href="${notesHrefFor(localeKey, localeKey, false)}">Open notes library</a>
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

const buildTranslatedPlaceholderPage = (localeKey, pageName) => {
  const locale = locales[localeKey];
  const placeholder = translatedPagePlaceholders[localeKey];
  const englishMeta = englishPagePlaceholders[pageName];
  const body = `<article class="portfolio-subpage translated-placeholder-page">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.translatedPlaceholderLabel}</p>
        <div>
          <h1>${placeholder.bodyTitle}</h1>
          <p>${placeholder.bodyText}</p>
        </div>
      </div>
      <div class="profile-summary-card">
        <p><strong>${placeholder.titlePrefix}:</strong> ${englishMeta.title}</p>
        <div class="hero-actions">
          <a class="primary-link" href="${staticPageHref(pageName, "en", localeKey, true)}">${placeholder.action}</a>
          <a class="secondary-link" href="${pageHref(localeKey, null, localeKey, true)}">${placeholder.back}</a>
        </div>
      </div>
    </section>
  </article>`;
  return pageShell({
    localeKey,
    title: `${englishMeta.title} - ${locale.siteName}`,
    descriptionText: locale.description,
    body,
    pageType: pageName,
  });
};

const buildAboutPage = (localeKey) => {
  if (localeKey !== "en") return buildTranslatedPlaceholderPage(localeKey, "about");
  const body = `<article class="portfolio-subpage about-page">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">About</p>
        <div><h1>About</h1><p>${aboutContent.biography[0]}</p></div>
      </div>
      <div class="contact-section">
        <figure class="contact-figure">
          <img src="./assets/about-page-card.png" alt="Professional profile card of Tak Wing Yu with academic title and research interests." width="1733" height="941" loading="lazy" decoding="async" />
        </figure>
        <div class="profile-summary-card">
          ${aboutContent.biography.slice(1).map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Profile</p><h2>Current appointment</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(aboutContent.currentAppointment)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Background</p><h2>Education and registration</h2></div>
      <div class="scholar-list compact">
        <article class="publication-card"><span>Education</span>${renderList(aboutContent.education)}</article>
        <article class="publication-card"><span>Professional registration</span>${renderList(aboutContent.registration)}</article>
      </div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Research</p><h2>Research interests</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(aboutContent.researchInterests)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Service</p><h2>Selected academic leadership and service</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(aboutContent.leadershipService)}</article></div>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">CV highlights</p>
        <div><h2>Professional profile at a glance</h2><p>${cvContent.intro}</p></div>
      </div>
      <div class="scholar-list">
        ${cvContent.sections.map((section) => `<article class="publication-card"><span>${section.title}</span>${renderList(section.items)}</article>`).join("")}
      </div>
    </section>
    <section class="section-block">
      <article class="award-card"><span>Award</span><strong>${homepageContent.awardCard.title}</strong><p>${homepageContent.awardCard.summary}</p></article>
      <div class="hero-actions">
        <a class="secondary-link" href="${staticPageHref("research", "en", "en", true)}">Research</a>
        <a class="secondary-link" href="${staticPageHref("teaching", "en", "en", true)}">Teaching</a>
        <a class="secondary-link" href="${staticPageHref("contact", "en", "en", true)}">Contact</a>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `About | ${locales.en.siteName}`, descriptionText: englishPagePlaceholders.about.description, body, pageType: "about" });
};

const buildResearchPage = (localeKey) => {
  if (localeKey !== "en") return buildTranslatedPlaceholderPage(localeKey, "research");
  const profileLinksMarkup = renderProfileLinks();
  const publishedPublications = publications.filter((item) => item.section === "peer-reviewed");
  const preprints = publications.filter((item) => item.section === "preprint");
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Research</p>
        <div><h1>Research</h1><p>${researchContent.intro}</p></div>
      </div>
      <div class="focus-grid research-grid">${homepageContent.researchThemes.map((item) => `<article class="focus-card education"><strong>${item.title}</strong><small>${item.summary}</small></article>`).join("")}</div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Profiles</p><div><h2>Research profiles</h2><p>External research records linked from this site.</p></div></div>
      <div class="scholar-list compact"><article class="publication-card">${profileLinksMarkup || "<p>No external research profiles are currently listed.</p>"}</article></div>
    </section>
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Projects</p><div><h2>Current Projects</h2><p>Developing and current work is clearly labelled below.</p></div></div>
      <div class="scholar-list project-list">${homepageContent.currentProjects.map((item) => `<article class="project-card"><span>${item.label}</span><strong>${item.title}</strong><small>${item.summary}</small></article>`).join("")}</div>
    </section>
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Publications</p><div><h2>Publications and scholarly outputs</h2><p>${publicationsContent.notice}</p></div></div>
      <div class="scholar-list">
        ${publishedPublications.map((item) => `<article class="publication-card"><span>${publicationStatusLabel(item.status)}</span><strong>${item.title}</strong><p class="publication-citation">${formatPublicationCitation(item)}</p><small>${item.summary}</small>${renderPublicationActions(item)}</article>`).join("")}
      </div>
    </section>
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Preprints</p><div><h2>Preprints and open manuscripts</h2><p>Early-stage or openly posted outputs linked from the public research record.</p></div></div>
      <div class="scholar-list">
        ${preprints.map((item) => `<article class="publication-card"><span>${publicationStatusLabel(item.status)}</span><strong>${item.title}</strong><p class="publication-citation">${formatPublicationCitation(item)}</p><small>${item.summary}</small>${renderPublicationActions(item)}</article>`).join("")}
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `Research | ${locales.en.siteName}`, descriptionText: englishPagePlaceholders.research.description, body, pageType: "research" });
};

const buildPublicationsPage = (localeKey) => {
  const locale = locales[localeKey];
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.nav.publications}</p>
        <div><h1>${locale.nav.publications}</h1><p>Publication information has been folded into the Research page to keep the site simpler and easier to navigate.</p></div>
      </div>
      <div class="profile-summary-card">
        <p><a class="primary-link" href="${staticPageHref("research", localeKey, localeKey, false)}">View ${locale.nav.research}</a></p>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${locale.nav.publications} | ${locale.siteName}`, descriptionText: englishPagePlaceholders.publications.description, body, pageType: "publications" });
};

const buildTeachingPage = (localeKey) => {
  if (localeKey !== "en") return buildTranslatedPlaceholderPage(localeKey, "teaching");
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Teaching</p>
        <div><h1>Teaching</h1><p>${teachingContent.intro}</p></div>
      </div>
      <div class="teaching-overview-grid">
        <article class="teaching-spotlight-card">
          <span>Subject areas</span>
          <strong>Practice-oriented physiotherapy education</strong>
          <p>Teaching across physiology, anatomy, movement science, advanced health technology, acupuncture practice, and clinical reasoning.</p>
        </article>
        <article class="teaching-spotlight-card">
          <span>Educational approach</span>
          <strong>Active, constructive, and clinically grounded learning</strong>
          <p>Using active learning, case work, simulation, structured feedback, and technology-enhanced activities that support safe professional practice.</p>
        </article>
        <article class="teaching-spotlight-card">
          <span>Innovation</span>
          <strong>Purposeful use of immersive and digital tools</strong>
          <p>Integrating AI-supported learning, digital anatomy resources, and immersive virtual reality only where they serve a clear educational purpose.</p>
        </article>
      </div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Subject areas</p><h2>Subject areas</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(homepageContent.teachingAreas)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Approach</p><h2>Educational approaches</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(homepageContent.educationalApproaches)}</article></div>
    </section>
    <section class="section-block split-section">
      <div class="section-heading"><p class="eyebrow">Curriculum</p><h2>Curriculum and assessment work</h2></div>
      <div class="scholar-list compact"><article class="publication-card">${renderList(homepageContent.curriculumWork)}</article></div>
    </section>
    <section class="section-block">
      <article class="award-card"><span>Teaching innovation</span><strong>Virtual reality acupuncture learning application</strong><p>${teachingContent.innovation}</p></article>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `Teaching | ${locales.en.siteName}`, descriptionText: englishPagePlaceholders.teaching.description, body, pageType: "teaching" });
};

const buildCvPage = (localeKey) => {
  const locale = locales[localeKey];
  const body = `<article class="portfolio-subpage">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.nav.cv}</p>
        <div><h1>${locale.nav.cv}</h1><p>CV content has been merged into the About page to keep the site simpler.</p></div>
      </div>
      <div class="profile-summary-card">
        <p><a class="primary-link" href="${staticPageHref("about", localeKey, localeKey, false)}">View ${locale.nav.about}</a></p>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `${locale.nav.cv} | ${locale.siteName}`, descriptionText: englishPagePlaceholders.cv.description, body, pageType: "cv" });
};

const buildContactPage = (localeKey) => {
  if (localeKey !== "en") return buildTranslatedPlaceholderPage(localeKey, "contact");
  const profileLinksMarkup = renderProfileLinks("profile-links profile-links-pills");
  const profileLinksSection = profileLinksMarkup ? `
        <article class="publication-card contact-profile-card">
          <span>Academic profiles</span>
          <p>Follow external research and publication records.</p>
          ${profileLinksMarkup}
        </article>` : "";
  const body = `<article class="portfolio-subpage contact-page">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Contact</p>
        <div><h1>Contact</h1><p>University and personal contact details, with academic profile links where available.</p></div>
      </div>
      <div class="contact-section">
        <figure class="contact-figure">
          <img src="./assets/contact-page-vr-portrait.png" alt="Stylised portrait of Tak Wing Yu smiling while wearing a mixed-reality headset." width="1078" height="1438" loading="lazy" decoding="async" />
        </figure>
        <div class="contact-details-stack">
          <article class="publication-card">
            <span>Contact details</span>
            <p>${profile.name}<br>${profile.appointment}<br>${profile.school}<br>Saint Francis University<br>Hong Kong</p>
            ${renderEmailLinks()}
          </article>
${profileLinksSection}
        </div>
      </div>
    </section>
  </article>`;
  return pageShell({ localeKey, title: `Contact | ${locales.en.siteName}`, descriptionText: englishPagePlaceholders.contact.description, body, pageType: "contact" });
};

const buildWritingPage = (localeKey) => {
  const locale = locales[localeKey];
  const writingUi = writingPageContent[localeKey];
  const body = `<article class="portfolio-subpage writing-page">
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.nav.writing}</p>
        <div><h1>${writingUi.title}</h1><p>${writingUi.intro}</p></div>
      </div>
      <div class="writing-groups-page">
        ${homepageWritingGroups.map((group) => `
          <section id="${group.key}" class="writing-group-section">
            <div class="section-heading archive-heading">
              <div>
                <p class="eyebrow">${writingUi.categoryLabel}</p>
                <h2>${group.title[localeKey]}</h2>
              </div>
              <p>${writingUi.groupDescriptions[group.key]}</p>
            </div>
            <div class="archive-grid writing-archive-grid">
              ${groupedPosts[group.key].map((post) => archiveItem(post, localeKey)).join("")}
            </div>
          </section>
        `.trim()).join("")}
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

    <a class="notes-back" href="${pageHref(localeKey, null, localeKey, false)}#archive">← ${ui.back}</a>
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

const buildPost = (post, localeKey) => {
  const locale = locales[localeKey];
  const title = titleFor(post, localeKey);
  const articleBody = articleBodies[localeKey]?.[post.ID];
  if (!articleBody) throw new Error(`Missing ${localeKey} article body for post ${post.ID}`);
  const body = `<article class="post-article">
    <header class="post-header">
      <a class="back-link" href="${pageHref(localeKey, null, localeKey, true)}#archive">${locale.backArchive}</a>
      <p class="content-meta">${categoryFor(post, locale)} · <time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time></p>
      <h1>${title}</h1>
      <p class="post-standfirst">${summaryFor(post, localeKey, 220)}</p>
    </header>
    <figure class="post-figure">
      ${postImage(post, localeKey, true)}
    </figure>
    <div class="post-content" lang="${locale.lang}">${articleBody}</div>
    <nav class="post-nav" aria-label="Post navigation">
      <a href="${pageHref(localeKey, null, localeKey, true)}#archive">${locale.backArchive}</a>
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

for (const [localeKey, locale] of Object.entries(locales)) {
  const localeRoot = locale.path ? path.join(root, locale.path) : root;
  const postsDir = path.join(localeRoot, "posts");
  fs.writeFileSync(path.join(localeRoot, "index.html"), buildIndex(localeKey));
  fs.writeFileSync(path.join(localeRoot, "notes.html"), buildNotes(localeKey));
  fs.writeFileSync(path.join(localeRoot, "about.html"), buildAboutPage(localeKey));
  fs.writeFileSync(path.join(localeRoot, "research.html"), buildResearchPage(localeKey));
  fs.writeFileSync(path.join(localeRoot, "publications.html"), buildPublicationsPage(localeKey));
  fs.writeFileSync(path.join(localeRoot, "teaching.html"), buildTeachingPage(localeKey));
  fs.writeFileSync(path.join(localeRoot, "writing.html"), buildWritingPage(localeKey));
  fs.writeFileSync(path.join(localeRoot, "cv.html"), buildCvPage(localeKey));
  fs.writeFileSync(path.join(localeRoot, "contact.html"), buildContactPage(localeKey));

  for (const post of posts) {
    fs.writeFileSync(path.join(postsDir, `${slugify(post)}.html`), buildPost(post, localeKey));
  }

  const searchIndex = Object.keys(locales).flatMap((searchLocaleKey) => buildSearchEntries(searchLocaleKey));
  const localizedSearchIndex = localizePersonalName(JSON.stringify(searchIndex, null, 2), localeKey);
  fs.writeFileSync(path.join(localeRoot, "search-index.json"), `${localizedSearchIndex}\n`);
}

fs.writeFileSync(path.join(root, ".nojekyll"), "");
const sitemapEntries = [
  absoluteUrlFor("en", { pageType: "home" }),
  absoluteUrlFor("en", { pageName: "about", pageType: "about" }),
  absoluteUrlFor("en", { pageName: "research", pageType: "research" }),
  absoluteUrlFor("en", { pageName: "teaching", pageType: "teaching" }),
  absoluteUrlFor("en", { pageName: "writing", pageType: "writing" }),
  absoluteUrlFor("en", { pageName: "contact", pageType: "contact" }),
  absoluteUrlFor("en", { pageType: "notes" }),
  ...posts.map((post) => absoluteUrlFor("en", { post })),
  ...Object.keys(locales).filter((key) => key !== "en").flatMap((localeKey) => [
    absoluteUrlFor(localeKey, { pageType: "home" }),
    absoluteUrlFor(localeKey, { pageType: "notes" }),
    absoluteUrlFor(localeKey, { pageType: "about", pageName: "about" }),
    absoluteUrlFor(localeKey, { pageType: "research", pageName: "research" }),
    absoluteUrlFor(localeKey, { pageType: "teaching", pageName: "teaching" }),
    absoluteUrlFor(localeKey, { pageType: "writing", pageName: "writing" }),
    absoluteUrlFor(localeKey, { pageType: "contact", pageName: "contact" }),
    ...posts.map((post) => absoluteUrlFor(localeKey, { post })),
  ]),
];
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(sitemapEntries)].map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://yutakwing.github.io/TakWing/sitemap.xml\n");
console.log(`Generated ${posts.length} posts in ${Object.keys(locales).length} languages for ${locales.en.siteName}`);
