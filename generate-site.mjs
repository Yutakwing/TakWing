import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import { articleBodies } from "./article-content.mjs";
import { notes, notesUi } from "./notes-content.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const assetVersion = "20260710-desktop-language-fix";
const postsExport = JSON.parse(fs.readFileSync(path.join(root, "wordpress-posts.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "wordpress-site.json"), "utf8"));
const draftPosts = [
  {
    ID: 304,
    author: { name: "Yu Tak Wing" },
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
    author: { name: "Yu Tak Wing" },
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
    author: { name: "Yu Tak Wing" },
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
    author: { name: "Yu Tak Wing" },
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
    author: { name: "Yu Tak Wing" },
    date: "2026-06-26T00:00:00+00:00",
    modified: "2026-06-26T00:00:00+00:00",
    title: "AI Should Be a Thinking Partner, Not a Clinical Shortcut",
    slug: "ai-should-be-a-thinking-partner-not-a-clinical-shortcut",
    excerpt: "An argument for teaching physiotherapy students to reason first, consult AI second, and remain accountable for clinical judgement.",
    content: "",
    categories: { "Health Professional Education Blogs": { name: "Health Professional Education Blogs" } },
  },
];
const portfolioPostIds = new Set([304, 303, 302, 301, 300, 256, 226, 254, 227, 217, 215, 200, 189, 181, 175, 146, 137]);
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
    304: "Two Years in Hong Kong: Reflecting on Teaching, Innovation, and Receiving a Teaching Excellence Award",
    303: "When AI Makes Academia Faster, Who Gets the Time Back?",
    302: "Productive Struggle in the Age of AI",
    301: "AI Policy Is Not Enough: Students Also Need Help Resisting the Pressure to Misuse AI",
    300: "AI Should Be a Thinking Partner, Not a Clinical Shortcut",
  },
  "zh-hant": {
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
    304: "來港兩年：反思教學、創新與獲頒院級教學卓越獎",
    303: "當人工智能讓學術工作更快，誰取回了時間？",
    302: "人工智能時代的有效掙扎",
    301: "人工智能政策並不足夠：學生也需要學會抵抗濫用人工智能的壓力",
    300: "人工智能應是思考伙伴，而不是臨床捷徑",
  },
  "zh-hans": {
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
    304: "来港两年：反思教学、创新与获颁院级教学卓越奖",
    303: "当人工智能让学术工作更快，谁取回了时间？",
    302: "人工智能时代的有效挣扎",
    301: "人工智能政策并不足够：学生也需要学会抵抗滥用人工智能的压力",
    300: "人工智能应是思考伙伴，而不是临床捷径",
  },
};

const postSummaries = {
  en: {
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
    304: "A reflection on being nominated for a faculty teaching excellence award in 2025, receiving it in 2026, and what teaching, innovation and collaboration have meant during the first two years in Hong Kong.",
    303: "A reflection on academic acceleration, AI productivity, and why the new bottleneck is judgement rather than production.",
    302: "A reflection on whether students are learning inside too safe a bubble, and how AI can support or bypass productive struggle.",
    301: "A reflection on why academic integrity responses to generative AI should address pressure, peer norms, misinformation and verification, not only detection.",
    300: "An argument for teaching physiotherapy students to reason first, consult AI second, and remain accountable for clinical judgement.",
  },
  "zh-hant": {
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
    304: "回顧來港兩年的教學旅程，從 2025 年獲提名但未符合資格，到 2026 年再次獲提名並獲頒院級教學卓越獎。",
    303: "反思人工智能提高學術工作效率後，時間是否真的回到研究者手中，以及為何新的瓶頸是判斷而不是產出。",
    302: "反思學生是否在過於安全的學習泡泡中成長，以及人工智能如何支援或繞過有效掙扎。",
    301: "反思大學回應生成式人工智能與學術誠信時，為何不能只依賴偵測與處分，而要處理壓力、同儕規範、錯誤資訊與核實能力。",
    300: "主張物理治療學生應先自行推理，再諮詢人工智能，並繼續為臨床判斷負責。",
  },
  "zh-hans": {
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
    304: "回顾来港两年的教学旅程，从 2025 年获提名但未符合资格，到 2026 年再次获提名并获颁院级教学卓越奖。",
    303: "反思人工智能提高学术工作效率后，时间是否真的回到研究者手中，以及为何新的瓶颈是判断而不是产出。",
    302: "反思学生是否在过于安全的学习泡泡中成长，以及人工智能如何支持或绕过有效挣扎。",
    301: "反思大学回应生成式人工智能与学术诚信时，为何不能只依赖检测与处分，而要处理压力、同伴规范、错误信息与核实能力。",
    300: "主张物理治疗学生应先自行推理，再咨询人工智能，并继续为临床判断负责。",
  },
};

const postImages = {
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
    label: "English",
    shortLabel: "EN",
    path: "",
    dateLocale: "en",
    siteName: site.name || "Tak Wing's Page",
    description: site.description || "A physiotherapy academic portfolio.",
    siteTagline: "Physiotherapy Education, Teaching and Learning, and Innovation.",
    nav: { focus: "Focus", latest: "Latest", teaching: "Teaching", archive: "Archive", notes: "Notes", about: "About", contact: "Contact" },
    search: "Search",
    searchPlaceholder: "Search Tak Wing's portfolio",
    theme: "Toggle theme",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    heroEyebrow: "Physiotherapy education · educational technology · reflective practice",
    heroTitle: "Notes from the intersection of health professional education and emerging technology.",
    heroLede: `I am ${posts[0]?.author?.name || "Yu Tak Wing"}, a physiotherapy lecturer committed to advancing teaching and learning through meaningful, evidence-informed uses of educational technology. This portfolio is a public notebook for ideas about teaching, student support, AI, VR, academic work, and reflective practice.`,
    readLatest: "Read latest",
    browseArchive: "Browse archive",
    profileLabel: "Author profile",
    stats: ["posts", "education notes", "reflections"],
    focusEyebrow: "Focus areas",
    focusTitle: "Three routes through the archive",
    focusCards: [
      ["Education technology", "AI, VR, and learning design", "Writing about educational technology as something that should serve professional judgement, not replace it."],
      ["Teaching practice", "Assessment, support, and academic care", "Notes on student mental health, special educational needs, admissions, and the realities of teaching."],
      ["Reflective writing", "Academic life in motion", "Personal reflections on PhD work, transitions, professional identity, and everyday learning."],
    ],
    latestEyebrow: "Latest writing",
    latestTitle: "Current questions",
    continueReading: "Continue reading",
    academicEyebrow: "Academic writing",
    academicTitle: "Health professional education",
    academicDescription: "Posts about AI, VR, teaching, learning design, assessment, student support, and the hidden labour of academic work.",
    reflectionEyebrow: "Reflective writing",
    reflectionTitle: "Professional reflections and field notes",
    reflectionDescription: "Writing that keeps academic work grounded: professional transitions, PhD life, admissions, productivity, and technology in practice.",
    contactEyebrow: "Contact",
    contactTitle: "Professional and academic enquiries",
    contactDescription: "For conversations about physiotherapy education, teaching and learning, educational technology, or academic collaboration, please get in touch by email.",
    contactAction: "Email Tak Wing",
    archiveEyebrow: "Complete archive",
    archiveTitle: "All posts",
    archiveDescription: `${posts.length} selected posts presenting teaching, educational technology, student support, and academic practice.`,
    share: "Share:",
    copyLink: "Copy link",
    copied: "Copied",
    email: "Email",
    imageCredit: "AI-generated editorial illustration",
    copyright: "Physiotherapy academic portfolio.",
    backArchive: "Archive",
    categories: { health: "Health professional education", personal: "Professional reflection", post: "Post" },
  },
  "zh-hant": {
    lang: "zh-Hant",
    label: "繁體中文",
    shortLabel: "繁",
    path: "zh-hant",
    dateLocale: "zh-HK",
    siteName: "Tak Wing 的學術專頁",
    description: "聚焦物理治療教育、教育科技與反思實踐的學術作品集。",
    siteTagline: "物理治療教育、教與學及創新",
    nav: { focus: "主題", latest: "最新", teaching: "教學", archive: "文章", notes: "筆記", about: "關於", contact: "聯絡" },
    search: "搜尋",
    searchPlaceholder: "搜尋 Tak Wing 的學術作品",
    theme: "切換顯示主題",
    menuOpen: "開啟導覽選單",
    menuClose: "關閉導覽選單",
    heroEyebrow: "物理治療教育 · 教育科技 · 反思實踐",
    heroTitle: "探索健康專業教育與新興科技交匯之處。",
    heroLede: "我是 Tak Wing Yu，一名物理治療講師，致力透過具意義及以證據為本的教育科技推動教與學。這個作品集是我的公開札記，記錄我對教學、學生支援、人工智能、虛擬實境、學術工作與反思實踐的思考。",
    readLatest: "閱讀最新文章",
    browseArchive: "瀏覽文章",
    profileLabel: "作者簡介",
    stats: ["篇文章", "篇教育札記", "篇專業反思"],
    focusEyebrow: "重點領域",
    focusTitle: "從三個方向瀏覽作品集",
    focusCards: [
      ["教育科技", "人工智能、虛擬實境與學習設計", "探討教育科技如何支援而非取代專業判斷。"],
      ["教學實踐", "評估、支援與學術關懷", "關於學生心理健康、特殊教育需要、招生與教學現場的札記。"],
      ["反思寫作", "流動中的學術生活", "反思博士研究、專業轉變、學術身份與日常學習。"],
    ],
    latestEyebrow: "最新文章",
    latestTitle: "當前思考",
    continueReading: "繼續閱讀",
    academicEyebrow: "學術寫作",
    academicTitle: "健康專業教育",
    academicDescription: "關於人工智能、虛擬實境、教學、學習設計、評估、學生支援及學術工作的文章。",
    reflectionEyebrow: "反思寫作",
    reflectionTitle: "專業反思與實踐札記",
    reflectionDescription: "透過專業轉變、博士研究、招生、工作效能與科技實踐的反思，讓學術工作保持踏實。",
    contactEyebrow: "聯絡",
    contactTitle: "專業及學術交流",
    contactDescription: "如欲交流物理治療教育、教與學、教育科技或學術協作，歡迎透過電郵聯絡。",
    contactAction: "電郵聯絡 Tak Wing",
    archiveEyebrow: "完整作品集",
    archiveTitle: "所有文章",
    archiveDescription: `${posts.length} 篇精選文章，涵蓋教學、教育科技、學生支援與學術實踐。`,
    share: "分享：",
    copyLink: "複製連結",
    copied: "已複製",
    email: "電郵",
    imageCredit: "人工智能生成的編輯插圖",
    copyright: "物理治療學術作品集。",
    backArchive: "返回文章",
    categories: { health: "健康專業教育", personal: "專業反思", post: "文章" },
  },
  "zh-hans": {
    lang: "zh-Hans",
    label: "简体中文",
    shortLabel: "简",
    path: "zh-hans",
    dateLocale: "zh-CN",
    siteName: "Tak Wing 的学术专页",
    description: "聚焦物理治疗教育、教育科技与反思实践的学术作品集。",
    siteTagline: "物理治疗教育、教与学及创新",
    nav: { focus: "主题", latest: "最新", teaching: "教学", archive: "文章", notes: "笔记", about: "关于", contact: "联系" },
    search: "搜索",
    searchPlaceholder: "搜索 Tak Wing 的学术作品",
    theme: "切换显示主题",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    heroEyebrow: "物理治疗教育 · 教育科技 · 反思实践",
    heroTitle: "探索健康专业教育与新兴科技交汇之处。",
    heroLede: "我是 Tak Wing Yu，一名物理治疗讲师，致力通过有意义且以证据为本的教育科技推动教与学。这个作品集是我的公开笔记，记录我对教学、学生支持、人工智能、虚拟现实、学术工作与反思实践的思考。",
    readLatest: "阅读最新文章",
    browseArchive: "浏览文章",
    profileLabel: "作者简介",
    stats: ["篇文章", "篇教育札记", "篇专业反思"],
    focusEyebrow: "重点领域",
    focusTitle: "从三个方向浏览作品集",
    focusCards: [
      ["教育科技", "人工智能、虚拟现实与学习设计", "探讨教育科技如何支持而非取代专业判断。"],
      ["教学实践", "评估、支持与学术关怀", "关于学生心理健康、特殊教育需求、招生与教学实践的笔记。"],
      ["反思写作", "流动中的学术生活", "反思博士研究、专业转变、学术身份与日常学习。"],
    ],
    latestEyebrow: "最新文章",
    latestTitle: "当前思考",
    continueReading: "继续阅读",
    academicEyebrow: "学术写作",
    academicTitle: "健康专业教育",
    academicDescription: "关于人工智能、虚拟现实、教学、学习设计、评估、学生支持及学术工作的文章。",
    reflectionEyebrow: "反思写作",
    reflectionTitle: "专业反思与实践札记",
    reflectionDescription: "通过对专业转变、博士研究、招生、工作效能与科技实践的反思，让学术工作保持踏实。",
    contactEyebrow: "联系",
    contactTitle: "专业及学术交流",
    contactDescription: "如欲交流物理治疗教育、教与学、教育科技或学术合作，欢迎通过电子邮件联系。",
    contactAction: "发送邮件给 Tak Wing",
    archiveEyebrow: "完整作品集",
    archiveTitle: "所有文章",
    archiveDescription: `${posts.length} 篇精选文章，涵盖教学、教育科技、学生支持与学术实践。`,
    share: "分享：",
    copyLink: "复制链接",
    copied: "已复制",
    email: "电子邮件",
    imageCredit: "人工智能生成的编辑插图",
    copyright: "物理治疗学术作品集。",
    backArchive: "返回文章",
    categories: { health: "健康专业教育", personal: "专业反思", post: "文章" },
  },
};

const categories = (post) => Object.keys(post.categories || {});
const categoryCount = posts.reduce((acc, post) => {
  for (const category of categories(post)) acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});

const titleFor = (post, localeKey) =>
  postTitles[localeKey]?.[post.ID] || decodeEntities(post.title);

const summaryFor = (post, localeKey, length = 190) => {
  if (postSummaries[localeKey]?.[post.ID]) return postSummaries[localeKey][post.ID];
  const text = stripHtml(post?.excerpt || post?.content || "");
  return `${text.slice(0, length)}${text.length > length ? "..." : ""}`;
};

const categoryFor = (post, locale) =>
  categories(post).includes("Health Professional Education Blogs")
    ? locale.categories.health
    : categories(post).includes("Personal Blogs")
      ? locale.categories.personal
      : locale.categories.post;

const formatDate = (iso, locale) =>
  new Intl.DateTimeFormat(locale.dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

const rootPrefixFor = (localeKey, isPost) =>
  localeKey === "en" ? (isPost ? ".." : ".") : (isPost ? "../.." : "..");

const pageHref = (targetLocaleKey, post, currentLocaleKey, isPost) => {
  const prefix = rootPrefixFor(currentLocaleKey, isPost);
  const targetLocale = locales[targetLocaleKey];
  const target = post ? `posts/${slugify(post)}.html` : "index.html";
  return targetLocale.path ? `${prefix}/${targetLocale.path}/${target}` : `${prefix}/${target}`;
};

const notesHrefFor = (targetLocaleKey, currentLocaleKey, isPost = false) => {
  const prefix = rootPrefixFor(currentLocaleKey, isPost);
  const targetLocale = locales[targetLocaleKey];
  return targetLocale.path ? `${prefix}/${targetLocale.path}/notes.html` : `${prefix}/notes.html`;
};

const postHref = (post, localeKey, isPost = false) =>
  pageHref(localeKey, post, localeKey, isPost);

const imageSrc = (post, localeKey, isPost = false) =>
  `${rootPrefixFor(localeKey, isPost)}/assets/post-images/${postImages[post.ID]}`;

const postImage = (post, localeKey, isPost = false, className = "post-image") =>
  `<img class="${className}" src="${imageSrc(post, localeKey, isPost)}" alt="${postImageAlts[localeKey][post.ID]}" width="1200" height="800" loading="${isPost ? "eager" : "lazy"}" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:3 / 2;object-fit:cover" />`;

const languageSelector = (localeKey, post, isPost, pageType = "standard") => `
  <nav class="language-selector" aria-label="Language">
    ${Object.entries(locales).map(([key, locale]) =>
      `<a href="${pageType === "notes" ? notesHrefFor(key, localeKey, isPost) : pageHref(key, post, localeKey, isPost)}" lang="${locale.lang}" hreflang="${locale.lang}" aria-label="${locale.label}"${key === localeKey ? ' aria-current="page"' : ""}><span class="language-long">${locale.label}</span><span class="language-short" aria-hidden="true">${locale.shortLabel}</span></a>`
    ).join("")}
  </nav>`;

const pageShell = ({
  localeKey,
  title,
  descriptionText,
  body,
  post = null,
  pageType = "standard",
  extraHead = "",
  extraScripts = "",
}) => {
  const locale = locales[localeKey];
  const isPost = Boolean(post);
  const prefix = rootPrefixFor(localeKey, isPost);
  const homeHref = pageHref(localeKey, null, localeKey, isPost);
  const notesHref = notesHrefFor(localeKey, localeKey, isPost);
  const searchIndexPath = locale.path ? `${locale.path}/search-index.json` : "search-index.json";
  const alternateHref = (targetLocaleKey) =>
    pageType === "notes"
      ? notesHrefFor(targetLocaleKey, localeKey, isPost)
      : pageHref(targetLocaleKey, post, localeKey, isPost);
  const ogImageMeta = post
    ? `    <meta property="og:image" content="https://yutakwing.github.io/TakWing/assets/post-images/${postImages[post.ID]}" />\n`
    : "";
  return `<!DOCTYPE html>
<html lang="${locale.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${descriptionText.replace(/"/g, "&quot;")}" />
    <meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
    <meta property="og:description" content="${descriptionText.replace(/"/g, "&quot;")}" />
    <meta property="og:type" content="${post ? "article" : "website"}" />
${ogImageMeta}    <link rel="alternate" hreflang="en" href="${alternateHref("en")}" />
    <link rel="alternate" hreflang="zh-Hant" href="${alternateHref("zh-hant")}" />
    <link rel="alternate" hreflang="zh-Hans" href="${alternateHref("zh-hans")}" />
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
  </head>
  <body data-search-index="${searchIndexPath}">
    <div class="navigation-progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="site-mark" href="${homeHref}">
        <span>Tak Wing Yu</span>
        <small>${locale.siteTagline}</small>
      </a>
      <nav class="top-nav" aria-label="Main navigation">
        <ul>
          <li><a href="${homeHref}#latest">${locale.nav.latest}</a></li>
          <li><a href="${homeHref}#teaching">${locale.nav.teaching}</a></li>
          <li><a href="${homeHref}#archive">${locale.nav.archive}</a></li>
          <li><a href="${notesHref}"${pageType === "notes" ? ' aria-current="page"' : ""}>${locale.nav.notes}</a></li>
          <li><a href="${homeHref}#contact">${locale.nav.contact}</a></li>
        </ul>
      </nav>
      <div class="header-actions">
${languageSelector(localeKey, post, isPost, pageType)}
        <button class="search-button" type="button">
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
        <a href="${homeHref}#about">${locale.nav.about}</a>
        <a href="${homeHref}#latest">${locale.nav.latest}</a>
        <a href="${homeHref}#teaching">${locale.nav.teaching}</a>
        <a href="${homeHref}#archive">${locale.nav.archive}</a>
        <a href="${notesHref}"${pageType === "notes" ? ' aria-current="page"' : ""}>${locale.nav.notes}</a>
        <a href="${homeHref}#contact">${locale.nav.contact}</a>
      </div>
    </div>
    <div class="page academic-page">
      <main class="content">${body}</main>
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
`;
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

const latest = posts.slice(0, 3);
const health = posts.filter((post) => categories(post).includes("Health Professional Education Blogs"));
const personal = posts.filter((post) => categories(post).includes("Personal Blogs"));
const author = posts[0]?.author?.name || "Yu Tak Wing";

const buildIndex = (localeKey) => {
  const locale = locales[localeKey];
  const focusLinks = ["#teaching", "#teaching", "#personal-writing"];
  const body = `<article class="home-layout">
    <section id="about" class="academic-hero">
      <div class="hero-copy">
        <p class="eyebrow">${locale.heroEyebrow}</p>
        <h1>${locale.heroTitle}</h1>
        <div class="hero-introduction" aria-label="${locale.profileLabel}">
          <img class="profile-image" src="${rootPrefixFor(localeKey, false)}/assets/profile-tak-wing-yu-portrait.jpg" alt="${author}" width="900" height="1200" />
          <div class="introduction-copy">
            <h2>${author}</h2>
            <p class="hero-lede">${locale.heroLede}</p>
            <dl class="site-stats">
              <div><dt>${posts.length}</dt><dd>${locale.stats[0]}</dd></div>
              <div><dt>${categoryCount["Health Professional Education Blogs"] || 0}</dt><dd>${locale.stats[1]}</dd></div>
              <div><dt>${categoryCount["Personal Blogs"] || 0}</dt><dd>${locale.stats[2]}</dd></div>
            </dl>
            <div class="hero-actions">
              <a class="primary-link" href="#latest">${locale.readLatest}</a>
              <a class="secondary-link" href="#contact">${locale.nav.contact}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="focus" class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${locale.focusEyebrow}</p>
        <h2>${locale.focusTitle}</h2>
      </div>
      <div class="focus-grid">
        ${locale.focusCards.map((card, index) => `<a class="focus-card ${["education", "practice", "reflection"][index]}" href="${focusLinks[index]}">
          <span>${card[0]}</span><strong>${card[1]}</strong><small>${card[2]}</small>
        </a>`).join("")}
      </div>
    </section>

    <section id="latest" class="section-block latest-layout">
      <div class="section-heading">
        <p class="eyebrow">${locale.latestEyebrow}</p>
        <h2>${locale.latestTitle}</h2>
      </div>
      <div class="latest-feature">
        <article class="lead-article">
          <a class="lead-image-link" href="${postHref(posts[0], localeKey)}">${postImage(posts[0], localeKey, false, "lead-image")}</a>
          <div class="lead-copy">
            <span>${categoryFor(posts[0], locale)}</span>
            <h3><a href="${postHref(posts[0], localeKey)}">${titleFor(posts[0], localeKey)}</a></h3>
            <p>${summaryFor(posts[0], localeKey, 260)}</p>
            <a class="read-more" href="${postHref(posts[0], localeKey)}">${locale.continueReading}</a>
          </div>
        </article>
        <div class="latest-list">
          ${latest.slice(1, 3).map((post) => `<a href="${postHref(post, localeKey)}">${postImage(post, localeKey, false, "latest-image")}<span><time datetime="${post.date.slice(0, 10)}">${formatDate(post.date, locale)}</time><strong>${titleFor(post, localeKey)}</strong></span></a>`).join("")}
        </div>
      </div>
    </section>

    <section id="teaching" class="section-block split-section">
      <div class="section-heading">
        <p class="eyebrow">${locale.academicEyebrow}</p>
        <h2>${locale.academicTitle}</h2>
        <p>${locale.academicDescription}</p>
      </div>
      <div class="scholar-list">${health.slice(0, 6).map((post) => `
        <a href="${postHref(post, localeKey)}">
          <span>${formatDate(post.date, locale)}</span>
          <strong>${titleFor(post, localeKey)}</strong>
          <small>${summaryFor(post, localeKey, 145)}</small>
        </a>`).join("")}
      </div>
    </section>

    <section id="personal-writing" class="section-block split-section">
      <div class="section-heading">
        <p class="eyebrow">${locale.reflectionEyebrow}</p>
        <h2>${locale.reflectionTitle}</h2>
        <p>${locale.reflectionDescription}</p>
      </div>
      <div class="scholar-list compact">${personal.slice(0, 8).map((post) => `
        <a href="${postHref(post, localeKey)}">
          <span>${formatDate(post.date, locale)}</span>
          <strong>${titleFor(post, localeKey)}</strong>
        </a>`).join("")}
      </div>
    </section>

    <section id="contact" class="section-block contact-section">
      <div>
        <p class="eyebrow">${locale.contactEyebrow}</p>
        <h2>${locale.contactTitle}</h2>
        <p>${locale.contactDescription}</p>
      </div>
      <a class="contact-link" href="mailto:yutakwing001@gmail.com">
        <span>${locale.contactAction}</span>
        <strong>yutakwing001@gmail.com</strong>
      </a>
    </section>

    <section id="archive" class="section-block">
      <div class="section-heading archive-heading">
        <div><p class="eyebrow">${locale.archiveEyebrow}</p><h2>${locale.archiveTitle}</h2></div>
        <p>${locale.archiveDescription}</p>
      </div>
      <div class="archive-grid">${posts.map((post) => archiveItem(post, localeKey)).join("")}</div>
    </section>
  </article>
  <footer>
    <nav aria-label="Footer links"><a href="mailto:yutakwing001@gmail.com">${locale.nav.contact}</a></nav>
    <p>© 2026 ${author}. ${locale.copyright}</p>
  </footer>`;

  return pageShell({
    localeKey,
    title: locale.siteName,
    descriptionText: locale.description,
    body,
  });
};

const buildNotes = (localeKey) => {
  const locale = locales[localeKey];
  const ui = notesUi[localeKey];
  const prefix = rootPrefixFor(localeKey, false);
  const chartCategories = ["education", "technology", "physiotherapy", "research"];
  const chartLabel = (value) => String(value).replace(/,/g, " -");
  const chartLines = ["sankey-beta"];
  const chartNodeMeta = [
    {
      type: "root",
      label: chartLabel(ui.chartRoot),
      filter: "all",
    },
  ];
  chartCategories.forEach((category) => {
    const relatedNotes = notes.filter((item) => item.categories.split(" ").includes(category));
    const categoryLabel = chartLabel(ui.filters[category]);
    chartNodeMeta.push({
      type: "category",
      label: categoryLabel,
      filter: category,
    });
    chartLines.push(`${chartLabel(ui.chartRoot)},${categoryLabel},${relatedNotes.length}`);
    relatedNotes.forEach((item) => {
      chartNodeMeta.push({
        type: "note",
        label: chartLabel(item.content[localeKey].label),
        filter: category,
        noteId: item.id,
      });
      chartLines.push(`${categoryLabel},${chartLabel(item.content[localeKey].label)},1`);
    });
  });
  const mermaidChart = chartLines.join("\n");
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
      <div id="notes-graph" class="mermaid-chart" aria-label="${ui.graphLabel}">
        <pre class="mermaid">${mermaidChart}</pre>
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
  </article>
  <footer><p>© 2026 ${author}. ${locale.copyright}</p></footer>`;

  return pageShell({
    localeKey,
    title: `${ui.title} - ${locale.siteName}`,
    descriptionText: ui.description,
    body,
    pageType: "notes",
    extraHead: `    <link rel="stylesheet" href="${prefix}/notes.css?v=${assetVersion}" />`,
    extraScripts: `    <script id="notes-chart-data" type="application/json">${JSON.stringify(chartNodeMeta)}</script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
    <script src="${prefix}/notes.js?v=${assetVersion}"></script>`,
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
      <figcaption>${locale.imageCredit}</figcaption>
    </figure>
    <div class="post-content" lang="${locale.lang}">${articleBody}</div>
  </article>
  <footer>
    <nav class="post-nav" aria-label="Post navigation">
      <a href="${pageHref(localeKey, null, localeKey, true)}#archive">${locale.backArchive}</a>
    </nav>
    <p>© 2026 ${author}. ${locale.copyright}</p>
  </footer>`;

  return pageShell({
    localeKey,
    title: `${title} - ${locale.siteName}`,
    descriptionText: summaryFor(post, localeKey, 220),
    body,
    post,
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

  for (const post of posts) {
    fs.writeFileSync(path.join(postsDir, `${slugify(post)}.html`), buildPost(post, localeKey));
  }

  const searchIndex = posts.map((post) => ({
    title: titleFor(post, localeKey),
    href: locale.path ? `./${locale.path}/posts/${slugify(post)}.html` : `./posts/${slugify(post)}.html`,
    description: summaryFor(post, localeKey),
    date: post.date.slice(0, 10),
    category: categoryFor(post, locale),
  })).concat(notes.map((item) => ({
    title: item.content[localeKey].title,
    href: locale.path ? `./${locale.path}/notes.html#${item.id}` : `./notes.html#${item.id}`,
    description: stripHtml(item.content[localeKey].body).slice(0, 190),
    date: "",
    category: notesUi[localeKey].libraryEyebrow,
  })));
  fs.writeFileSync(path.join(localeRoot, "search-index.json"), `${JSON.stringify(searchIndex, null, 2)}\n`);
}

fs.writeFileSync(path.join(root, ".nojekyll"), "");
console.log(`Generated ${posts.length} posts in ${Object.keys(locales).length} languages for ${locales.en.siteName}`);
