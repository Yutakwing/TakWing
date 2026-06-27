const article = (intro, sections = []) => [
  ...intro.map((text) => `<p>${text}</p>`),
  ...sections.flatMap(({ heading, paragraphs = [], points = [] }) => [
    `<h2>${heading}</h2>`,
    ...paragraphs.map((text) => `<p>${text}</p>`),
    ...(points.length ? [`<ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>`] : []),
  ]),
].join("\n");

export const articleBodies = {
  en: {
    256: article(
      [
        "As a university lecturer, I want to devote most of my time to teaching, mentoring and research. In practice, a substantial part of the academic day is consumed by administrative work: sorting email, preparing meetings, answering repeated questions and coordinating routine processes.",
        "This administrative load is not merely inconvenient. It fragments attention and reduces the time available for thoughtful teaching and meaningful contact with students. The important question is therefore not whether artificial intelligence can produce more text, but whether it can reduce low-value work without weakening professional judgement, privacy or accountability.",
      ],
      [
        {
          heading: "Beyond the chatbot",
          paragraphs: [
            "OpenClaw interests me because it is presented as an agentic system rather than a conventional chatbot. Instead of responding to a single prompt, an agent can potentially plan and complete a sequence of actions. In an academic setting, that might include organising information, preparing a briefing or monitoring a routine workflow.",
            "The attraction is clear, but so are the risks. Any use involving student information, assessment records, email or institutional systems must be carefully governed. Automation should support educators, not make opaque decisions on their behalf.",
          ],
          points: [
            "Triage routine email while leaving sensitive messages for human review.",
            "Prepare meeting briefs from approved documents and previous minutes.",
            "Answer frequently asked course-administration questions from verified information.",
            "Support reminders and workflow tracking without accessing confidential student data unnecessarily.",
          ],
        },
        {
          heading: "My active-teammate experiment",
          paragraphs: [
            "I plan to test these possibilities in a controlled environment using dummy information. I will begin with email triage, meeting preparation and low-risk course-administration tasks. The purpose is not to automate academic care, but to discover whether carefully bounded tools can return time to teaching and scholarship.",
            "The test will be worthwhile only if it is transparent, secure and easy to audit. The educator must remain responsible for every consequential decision. Used in that way, an AI agent may become a useful assistant; used carelessly, it could simply create a new layer of digital administration.",
          ],
        },
      ]
    ),
    226: article(
      [
        "At a recent teaching and learning conference, artificial intelligence dominated the programme. Many presentations explained what generative AI is and demonstrated the latest tools. Those introductions were useful, but I left feeling that higher education now needs a more demanding conversation.",
        "AI is already part of students’ and educators’ daily lives. The central questions are therefore about implementation and consequence: When does AI strengthen learning? When does it weaken independent thought? How should assessment change? What evidence should guide adoption?",
      ],
      [
        {
          heading: "Moving from novelty to educational purpose",
          paragraphs: [
            "A tool should not be adopted simply because it is impressive. We need to begin with the learning outcome, the needs of the students and the professional standards of the discipline. Only then should we ask whether AI offers an appropriate method.",
            "For health professional education, this distinction is especially important. Students must develop clinical reasoning, communication, ethical judgement and accountability. AI may help them practise or receive feedback, but it cannot carry professional responsibility for them.",
          ],
        },
        {
          heading: "Questions for the next conference",
          points: [
            "How can assessment distinguish supported learning from uncritical dependence on AI?",
            "What forms of AI literacy do students and staff need?",
            "How do we protect privacy, equity and academic integrity?",
            "Which uses improve learning according to evidence rather than enthusiasm?",
          ],
          paragraphs: [
            "The most valuable discussion is no longer whether AI will enter education. It is how educators can shape its use with care, evidence and a clear sense of purpose.",
          ],
        },
      ]
    ),
    254: article(
      [
        "Graduation ceremonies have a distinctive ability to make time pause. Sitting in a university hall in Hong Kong and watching students cross the stage, I found myself remembering graduations that I had attended years earlier in South Africa.",
        "In South Africa, graduation often carried profound significance for an entire family. I remember parents arriving directly from work, sometimes still wearing the uniforms of cleaners, gardeners or drivers. They came to witness a son or daughter achieve something that might once have seemed beyond reach.",
      ],
      [
        {
          heading: "Different settings, shared pride",
          paragraphs: [
            "Many of those students were the first in their families, and sometimes the first in their communities, to earn a university degree. The celebrations were expressive and deeply moving. Every step across the stage represented years of sacrifice, perseverance and hope.",
            "The atmosphere in Hong Kong can feel quieter. University education is familiar to many families, and some students come from several generations of graduates. Yet the emotion beneath the ceremony is recognisable: joy, relief and pride in seeing a young person complete an important journey.",
          ],
        },
        {
          heading: "What a graduation represents",
          paragraphs: [
            "Graduation is more than an academic ritual. It is a moment when personal effort, family support and social opportunity become visible together. Behind every graduate stands someone who encouraged, supported or made sacrifices for a better future.",
            "For educators, the ceremony is also a reminder that teaching reaches beyond modules and assessments. Our work becomes part of the stories that students and families will carry with them.",
          ],
        },
      ]
    ),
    227: article(
      [
        "The release of Hong Kong Diploma of Secondary Education results marks an important turning point for many young people. As a university lecturer involved in admissions interviews, I was asked to help assess applicants’ suitability for a programme.",
        "The responsibility felt heavier than I had expected. An interview is brief, yet the judgement that follows can influence a student’s next opportunity. That imbalance of time and consequence demands humility.",
      ],
      [
        {
          heading: "Judgement with care",
          paragraphs: [
            "Applicants arrive with different educational opportunities, communication styles and levels of confidence. A polished answer does not always indicate the greatest potential, just as nervousness does not indicate a lack of ability. Interviewers must look beyond performance while still applying fair and consistent criteria.",
            "Structured questions, shared scoring guidance and independent review can reduce individual bias, but no process is entirely neutral. We must remain alert to how our assumptions about language, personality or experience affect our interpretation.",
          ],
        },
        {
          heading: "A responsibility, not a power",
          paragraphs: [
            "Admissions decisions should not feel like the exercise of personal power. They are an entrusted responsibility carried out on behalf of the university, the profession and the applicants themselves.",
            "The experience reminded me to approach every interview with preparation, curiosity and respect. Even when an applicant is not offered a place, they deserve a process that is transparent, consistent and humane.",
          ],
        },
      ]
    ),
    217: article(
      [
        "Inclusive education begins with the recognition that students bring different strengths, experiences and support needs to the classroom. Special educational needs may relate to mobility, sensory access, communication, attention, processing or specific learning differences such as dyslexia.",
        "The lecturer’s role is not to lower academic standards. It is to remove avoidable barriers so that students have a fair opportunity to demonstrate the required learning outcomes.",
      ],
      [
        {
          heading: "Practical approaches",
          points: [
            "Work with the student and the university’s disability or inclusion service to understand agreed adjustments.",
            "Provide materials in accessible formats and share key information in advance where possible.",
            "Use clear structure, plain instructions and more than one way of presenting important concepts.",
            "Offer appropriate flexibility in participation and assessment while preserving the intended learning outcomes.",
            "Check that digital resources, images, videos and learning platforms are accessible.",
          ],
        },
        {
          heading: "Partnership and review",
          paragraphs: [
            "Students are often the best source of information about what enables them to learn. Regular, respectful communication helps lecturers identify what is working and what needs to change. Adjustments should be reviewed rather than treated as a one-off administrative task.",
            "Collaboration is equally important. Lecturers should work with colleagues, learning-support staff and relevant specialists instead of attempting to solve every issue alone. Professional development in inclusive teaching can improve practice for the whole class, not only for students with documented needs.",
          ],
        },
        {
          heading: "An inclusive learning culture",
          paragraphs: [
            "A genuinely inclusive environment allows students to ask for support without embarrassment. When accessibility is built into course design from the beginning, fewer students need to request individual exceptions and everyone benefits from clearer teaching.",
          ],
        },
      ]
    ),
    215: article(
      [
        "Examinations can intensify anxiety and, on rare occasions, a student may experience an acute mental health crisis. Lecturers must respond with compassion while protecting the safety, privacy and fairness of everyone involved.",
        "A crisis should not be treated as misconduct simply because it disrupts an assessment. At the same time, academic decisions should not be made under pressure during an emergency. Immediate care and later assessment decisions are separate matters.",
      ],
      [
        {
          heading: "Recognising distress",
          points: [
            "Visible panic, severe agitation or an abrupt emotional change.",
            "Difficulty communicating coherently or following simple instructions.",
            "Statements suggesting hopelessness, self-harm or immediate danger.",
            "Behaviour that creates a safety concern for the student or others.",
          ],
        },
        {
          heading: "Immediate response",
          points: [
            "Remain calm, speak clearly and avoid crowding the student.",
            "Follow the institution’s emergency and safeguarding procedures.",
            "Contact the designated health, counselling, security or emergency service.",
            "Protect the other students’ assessment conditions, moving them only if necessary.",
            "Do not promise a mark, pass or particular academic outcome.",
          ],
        },
        {
          heading: "After the incident",
          paragraphs: [
            "Document the facts promptly and confidentially, including the actions taken and the people contacted. Refer the academic consequences to the appropriate assessment or mitigating-circumstances process rather than deciding them alone.",
            "Follow up through the proper student-support channels and review whether staff training, room arrangements or examination procedures could be improved. A well-prepared response protects both student wellbeing and academic integrity.",
          ],
        },
      ]
    ),
    200: article(
      [
        "Virtual reality headsets vary considerably in price, computing requirements, tracking and ease of use. This comparison reflects my experience of three different positions in the market: PC-based HTC VIVE systems, the standalone Meta Quest 2, and Meta’s newer premium devices, including the Quest 3 and Quest Pro.",
        "Product names and specifications change quickly, so this article is best read as an educational comparison rather than current purchasing advice.",
      ],
      [
        {
          heading: "HTC VIVE: high capability, greater complexity",
          paragraphs: [
            "PC-based VIVE systems can provide strong visual quality, accurate tracking and flexible room-scale experiences. They are well suited to specialist development, simulation and research where computing power and precise tracking matter.",
            "The trade-off is complexity. Depending on the model, users may need a capable computer, cables, adapters, tracking equipment and more time to prepare the physical environment.",
          ],
        },
        {
          heading: "Meta Quest 2: accessible standalone VR",
          paragraphs: [
            "The Quest 2 made VR more approachable by combining wireless operation, inside-out tracking and a broad application library in one headset. It is relatively simple to deploy for demonstrations or small-group learning because it does not require a dedicated computer.",
            "Its lower cost and ease of use are attractive in education, although comfort, account management, device hygiene and institutional data governance still need careful planning.",
          ],
        },
        {
          heading: "Quest 3 and Quest Pro: mixed reality and advanced use",
          paragraphs: [
            "The Quest 3 and Quest Pro occupy different positions, but both demonstrate the move towards improved passthrough and mixed-reality experiences. These features may be valuable when learners need to interact with both digital content and their physical surroundings.",
            "For educators, the best headset is not necessarily the newest one. The decision should follow the learning objective, available applications, technical support, budget and requirements for privacy and infection control.",
          ],
        },
        {
          heading: "Choosing for education",
          paragraphs: [
            "A high-end system may be justified for research or complex simulation, while a standalone headset may be more practical for routine teaching. Pilot testing with students and staff is essential before investing at scale.",
          ],
        },
      ]
    ),
    189: article(
      [
        "Standalone Meta Quest headsets have made virtual reality considerably easier to set up than earlier PC-based systems. Their wireless design and inside-out tracking reduce the need for external sensors, extensive cabling and a dedicated gaming computer.",
        "The exact screens and account requirements vary by model and software version, but the general preparation process is consistent.",
      ],
      [
        {
          heading: "Before you begin",
          points: [
            "Charge the headset and controllers fully.",
            "Prepare a clear, well-lit area with enough space to move safely.",
            "Install the current Meta Horizon mobile application if the headset requires it.",
            "Confirm that the wireless network and institutional account arrangements are appropriate.",
          ],
        },
        {
          heading: "Initial set-up",
          points: [
            "Switch on the headset and follow the on-screen instructions.",
            "Pair the controllers and connect to Wi-Fi.",
            "Install any required system updates before a teaching session.",
            "Define the safety boundary and test it from the learner’s position.",
            "Install and open the intended application in advance.",
          ],
        },
        {
          heading: "Preparing for teaching",
          paragraphs: [
            "A successful technical set-up is only the beginning. Educators should plan how the activity supports a learning outcome, how students will receive instructions, and how they will reflect on the experience afterwards.",
            "For shared devices, establish procedures for cleaning, charging, account access and checking for motion discomfort. Always provide an alternative activity for a student who cannot or does not wish to use a headset.",
            "Wireless VR can reduce technical barriers, but thoughtful facilitation remains more important than the device itself.",
          ],
        },
      ]
    ),
    181: article(
      [
        "In 2020, I paired an Alienware M15 R2 laptop with an HTC VIVE Cosmos headset. At the time, the combination represented a capable route into PC-based virtual reality, but setting it up required considerably more preparation than a modern standalone headset.",
      ],
      [
        {
          heading: "The equipment",
          points: [
            "Intel Core i7-9750H processor.",
            "16 GB of RAM and a 256 GB solid-state drive.",
            "NVIDIA RTX 2070 graphics.",
            "HTC VIVE Cosmos headset and controllers.",
          ],
        },
        {
          heading: "Set-up experience",
          paragraphs: [
            "The first challenge was connectivity. I needed the correct Mini DisplayPort connection, and a suitable adapter was not readily available locally. Once the hardware was connected, I still had to install software, update drivers, prepare a safe physical area and configure the virtual environment.",
            "The process took approximately three and a half hours, including downloads. Tracking was sensitive to lighting, and several settings needed adjustment before the experience felt reliable.",
          ],
        },
        {
          heading: "Was it worthwhile?",
          paragraphs: [
            "Yes. Once configured, the system provided an impressive and engaging VR experience. However, the time and technical confidence required would be a significant barrier in a busy teaching environment.",
            "This experience helped me appreciate why standalone headsets became so influential. For educational deployment, ease of set-up, repeatability and staff support can matter just as much as graphical performance.",
          ],
        },
      ]
    ),
    175: article(
      [
        "At the AMEE 2023 conference in Glasgow, I had an opportunity to try 3D Organon in virtual reality. The application presents an interactive three-dimensional anatomy model that learners can inspect from different angles and at different scales.",
        "I had previously used Sharecare’s VR anatomy application, so the demonstration immediately raised useful questions about the similarities between the platforms and how each might support anatomy learning.",
      ],
      [
        {
          heading: "Questions for evaluation",
          points: [
            "How accurately and clearly are anatomical structures represented?",
            "How easily can a learner isolate, label and compare structures?",
            "Does the interaction promote spatial understanding rather than passive viewing?",
            "How comfortable and accessible is the experience for sustained learning?",
            "Does the educational value justify the cost and technical support required?",
          ],
          paragraphs: [
            "I hope to test the application more systematically. A useful comparison should move beyond visual impact and examine usability, learning design and the quality of the student experience.",
          ],
        },
      ]
    ),
    146: article(
      [
        "People often describe knowledge and hard work as the foundations of success. Both matter, but a familiar word game offers a playful reminder about a third quality: attitude.",
        "If the letters of the alphabet are assigned numbers from 1 to 26, the letters in KNOWLEDGE add up to 96 and those in HARD WORK to 98. ATTITUDE adds up to 100. This is not evidence or a formula for success, but it is a memorable illustration.",
      ],
      [
        {
          heading: "The value behind the word game",
          paragraphs: [
            "Knowledge provides understanding, and hard work turns intention into progress. Attitude influences how we respond when plans fail, feedback is difficult or improvement takes longer than expected.",
            "A constructive attitude does not mean ignoring problems or remaining positive at all costs. It means approaching challenges with curiosity, responsibility and a willingness to learn.",
            "Success depends on many factors, including opportunity, support and circumstance. Within what we can influence, however, the way we engage with learning and setbacks remains important.",
          ],
        },
      ]
    ),
    137: article(
      [
        "I had not written for some time, partly because doctoral work has a habit of filling every available space. Writing this short reflection was therefore a way of returning to the habit while still doing something connected to my academic development.",
        "A PhD begins with a personal idea, but it does not remain a solitary dream. Supervisors question assumptions, narrow ambitious plans and ask for evidence. That process can feel uncomfortable, yet it is part of learning to turn enthusiasm into rigorous research.",
      ],
      [
        {
          heading: "Learning through challenge",
          paragraphs: [
            "Good supervision does not simply approve every idea. It helps the researcher distinguish an interesting possibility from a feasible, ethical and defensible study.",
            "The road to a PhD is therefore less about pursuing a dream without resistance and more about allowing the dream to be tested, refined and strengthened.",
          ],
        },
      ]
    ),
    300: article(
      [
        "Generative AI can now draft patient explanations, suggest possible differential diagnoses, create clinical cases and provide almost immediate feedback. For physiotherapy educators, the tempting question is whether AI can take over more of the teaching workload.",
        "I think there is a better question: how can we use AI while ensuring that students still learn to observe, reason, communicate and take responsibility?",
        "Physiotherapy is not simply the production of a correct written answer. Students must notice how a person moves, select and adapt an examination, interpret incomplete information, communicate through uncertainty and respond safely to the patient in front of them. An AI system may generate a convincing recommendation without participating in any of these embodied and relational processes.",
      ],
      [
        {
          heading: "Promise and caution",
          paragraphs: [
            "My Obsidian notes point to a consistent position: AI use in education should be augmentative rather than substitutive. AI may reduce cognitive and rhetorical workload, widen the questions a student considers and support formative feedback. However, the first AI response should be treated as material for review, not as a finished answer.",
            "Recent work in clinical AI also invites caution. Early studies and preprints suggest that AI-supported systems may help clinicians consider alternatives and generate more personalised rehabilitation material, but they may also omit important context, encourage automation bias and produce patient information that still requires professional correction. Direct evidence within physiotherapy education remains limited.",
          ],
        },
        {
          heading: "A reason-first model",
          paragraphs: [
            "This suggests that AI should be introduced as a thinking partner rather than a clinical shortcut. One practical model is simple enough to use in a classroom, simulation session or written case analysis.",
          ],
          points: [
            "<strong>Reason:</strong> the student assesses the case and records an initial judgement before using AI.",
            "<strong>Consult:</strong> the student asks AI for alternatives, questions, counterarguments or feedback.",
            "<strong>Challenge:</strong> the student checks the response against evidence, patient context, professional standards and safety.",
            "<strong>Decide:</strong> the student explains what was accepted, rejected or changed.",
            "<strong>Reflect:</strong> the student identifies what they learned and where uncertainty remains.",
          ],
        },
        {
          heading: "What this changes in teaching",
          paragraphs: [
            "This structure makes the student's thinking visible. It changes AI literacy from knowing how to write a prompt into a professional capability involving verification, privacy, bias awareness, disclosure and accountable judgement.",
            "It also separates learning from performance. AI can help a student produce a better-looking answer quickly, but that does not prove that learning has occurred. In clinical education, the developmental struggle matters because students are becoming practitioners who must eventually act without outsourcing responsibility.",
          ],
          points: [
            "Use deliberately imperfect AI-generated assessment or treatment plans and ask students to identify unsafe assumptions.",
            "Ask students to complete a clinical-reasoning map before consulting AI, then compare what changed and why.",
            "Use AI-generated patient education as material for critique, rewriting and person-centred communication.",
            "Allow AI to vary simulated patient histories while keeping educator-controlled learning outcomes and safety boundaries.",
            "Require students to disclose the tool used, the purpose, the verification process and their own contribution.",
          ],
        },
        {
          heading: "Assessment must still protect clinical capability",
          paragraphs: [
            "Assessment should continue to value what AI cannot demonstrate on a student's behalf: observation, hands-on competence, communication, adaptability and defensible clinical reasoning. A student who can paste a plausible AI answer has not necessarily shown that they can examine a patient, respond to distress, recognise a red flag or justify a treatment decision.",
            "The aim is not to protect yesterday's assignments from tomorrow's technology. It is to design learning in which technology strengthens, rather than quietly replaces, the development of a physiotherapist.",
          ],
        },
        {
          heading: "Sources informing this article",
          points: [
            "Obsidian note: <em>AI in Physiotherapy Education - Weekly Digest</em>.",
            "Obsidian note: <em>Generative AI in Teaching and Learning - PolyU Conference</em>.",
            "Obsidian note: <em>Artificial Intelligence - Foundations and Educational Use</em>.",
            "Obsidian note: <em>Research Integrity in the Generative AI Era</em>.",
            "Obsidian note: <em>Should I Use AI for This?</em>, adapted from Olivier and Rowe's decision guide for doctoral researchers.",
          ],
        },
      ]
    ),
  },
  "zh-hant": {
    256: article(
      [
        "作為大學講師，我希望把大部分時間投放在教學、指導學生和研究。然而，學術工作的日常往往被行政事務佔據，包括整理電郵、準備會議、回覆重複查詢，以及協調例行流程。",
        "這種行政負擔不只帶來不便，也會切割注意力，減少教師與學生深入交流和改善教學的時間。因此，關鍵問題並不是人工智能能否生成更多文字，而是它能否在不削弱專業判斷、私隱和問責的前提下，減少低價值的重複工作。",
      ],
      [
        {
          heading: "超越聊天機械人",
          paragraphs: [
            "OpenClaw 引起我的興趣，是因為它被設計為能夠規劃和完成多步工作的代理式系統，而不只是回應單一提示。在學術環境中，它或可協助整理資料、準備簡報和監察例行流程。",
            "潛力明顯，風險也同樣明顯。凡涉及學生資料、評核紀錄、電郵或院校系統的應用，都必須受到嚴格管治。自動化應支援教育工作者，而不是代替他們作出不透明的決定。",
          ],
          points: [
            "整理一般電郵，並把敏感訊息留給教師親自處理。",
            "根據獲准使用的文件和會議紀錄準備會議摘要。",
            "利用經核實的資料回覆常見課程行政問題。",
            "在避免不必要存取機密資料的前提下，協助提醒和追蹤工作流程。",
          ],
        },
        {
          heading: "我的「主動隊友」實驗",
          paragraphs: [
            "我計劃先在使用模擬資料的受控環境中測試電郵分類、會議準備和低風險的課程行政工作。目的不是把學術關懷自動化，而是了解有清晰界線的工具能否把時間還給教學和研究。",
            "只有當系統透明、安全並可供審核時，這項實驗才有價值。教育工作者必須繼續為所有重要決定負責。謹慎使用時，人工智能代理可以成為實用助手；使用不當時，它只會製造另一層數碼行政工作。",
          ],
        },
      ]
    ),
    226: article(
      [
        "在最近一次教與學會議中，人工智能幾乎主導了整個議程。很多講者介紹生成式人工智能和最新工具。這些內容有其價值，但我認為高等教育現在需要展開更深入的討論。",
        "人工智能已經進入師生的日常生活。核心問題不再是它會否出現在教育中，而是應如何實施：它在甚麼情況下能促進學習？何時會削弱獨立思考？評核應如何改變？院校應依據甚麼證據採用新工具？",
      ],
      [
        {
          heading: "由新奇走向教育目的",
          paragraphs: [
            "我們不應只因工具令人驚艷便採用它。首先要確定學習成果、學生需要和專業標準，然後才判斷人工智能是否合適。",
            "在健康專業教育中，學生必須發展臨床推理、溝通、倫理判斷和問責能力。人工智能可以支援練習和回饋，卻不能替學生承擔專業責任。",
          ],
        },
        {
          heading: "下一階段應討論的問題",
          points: [
            "評核如何區分有助學習的支援與未經思考的依賴？",
            "師生需要具備哪些人工智能素養？",
            "如何保障私隱、公平和學術誠信？",
            "哪些應用確實有證據顯示能改善學習？",
          ],
        },
      ]
    ),
    254: article(
      [
        "畢業典禮有一種獨特力量，能讓時間彷彿暫停。最近，我坐在香港一所大學的禮堂，看着學生踏上台領取學位證書，不禁想起多年前在南非參與的畢業典禮。",
        "在南非，畢業對很多家庭有非常深遠的意義。我曾看見父母完成清潔、園藝或駕駛工作後，仍穿着制服趕到校園，只為見證子女完成一段曾經遙不可及的旅程。",
      ],
      [
        {
          heading: "不同環境，共同的自豪",
          paragraphs: [
            "不少畢業生是家中甚至社區內第一位大學生。每一步走過台前，都呈現了多年犧牲、堅持和希望。",
            "香港的氣氛可能較含蓄，大學教育對很多家庭也較熟悉。然而，典禮背後的情感同樣清晰：喜悅、安慰，以及看見年輕人完成重要歷程的自豪。",
          ],
        },
        {
          heading: "畢業的意義",
          paragraphs: [
            "畢業不只是學術儀式，也是個人努力、家庭支持和社會機會同時被看見的時刻。每位畢業生背後，都有人曾經鼓勵、支持或作出犧牲。",
            "對教育工作者而言，典禮亦提醒我們，教學的影響超越課程和評核，並會成為學生和家庭故事的一部分。",
          ],
        },
      ]
    ),
    227: article(
      [
        "香港中學文憑考試放榜，是很多年輕人的重要轉捩點。作為參與大學招生面試的講師，我需要與同事評估申請人是否適合入讀課程。",
        "這份責任比我預期中沉重。面試時間很短，但隨後的判斷可能影響學生下一個機會。時間與後果之間的不平衡，要求面試官保持謙遜。",
      ],
      [
        {
          heading: "審慎判斷",
          paragraphs: [
            "申請人的教育機會、溝通方式和自信程度各有不同。表達流暢不一定代表最有潛質，緊張也不代表能力不足。面試官既要超越表面表現，也要一致地運用公平準則。",
            "結構化問題、共同評分指引和獨立覆核有助減少偏見，但任何程序都不是完全中立。我們必須留意自己對語言、性格和經驗的假設。",
          ],
        },
        {
          heading: "這是責任，不是權力",
          paragraphs: [
            "招生決定不應被視為個人權力，而是大學、專業和申請人共同託付的責任。每位申請人都應獲得透明、一致和具人性的評核過程。",
          ],
        },
      ]
    ),
    217: article(
      [
        "共融教育建基於一個基本認知：每位學生都有不同的優勢、經驗和支援需要。特殊教育需要可能涉及肢體活動、感官接收、溝通、專注、資料處理或讀寫障礙等學習差異。",
        "講師的角色不是降低學術標準，而是移除可以避免的障礙，讓學生有公平機會展示課程所要求的學習成果。",
      ],
      [
        {
          heading: "實務做法",
          points: [
            "與學生及院校的殘疾或共融支援服務合作，了解已獲批准的調適安排。",
            "提供無障礙格式的教材，並盡可能預先發放重要資料。",
            "採用清晰結構、明確指示和多種方式解釋重要概念。",
            "在維持學習成果的前提下，為參與和評核提供合適彈性。",
            "檢查數碼資源、圖片、影片和學習平台是否具無障礙設計。",
          ],
        },
        {
          heading: "合作與檢討",
          paragraphs: [
            "學生通常最了解甚麼支援方式能幫助自己學習。持續而尊重的溝通，有助教師了解哪些安排有效、哪些需要調整。",
            "講師亦應與同事、學習支援人員和相關專家合作。把無障礙原則由課程設計初期納入考慮，不但支援有特殊教育需要的學生，也能令全班受惠。",
          ],
        },
      ]
    ),
    215: article(
      [
        "考試可能令焦慮加劇，個別學生亦可能出現急性心理健康危機。講師需要以同理心應對，同時保障所有人的安全、私隱和評核公平。",
        "危機不應只因干擾考試便被視為失當行為；同樣地，教師也不應在緊急情況下受壓作出學術決定。即時照顧與後續評核安排是兩件不同的事情。",
      ],
      [
        {
          heading: "辨識危機訊號",
          points: [
            "明顯恐慌、強烈不安或情緒突然轉變。",
            "無法連貫溝通或跟從簡單指示。",
            "提及絕望、自我傷害或即時危險。",
            "行為對本人或他人構成安全風險。",
          ],
        },
        {
          heading: "即時應對",
          points: [
            "保持冷靜，清晰說話，避免多人包圍學生。",
            "依照院校的緊急事故和保障程序行事。",
            "聯絡指定的醫療、輔導、保安或緊急服務。",
            "保障其他學生的考試環境，只在有需要時安排轉移。",
            "不要承諾分數、合格或任何特定學術結果。",
          ],
        },
        {
          heading: "事後跟進",
          paragraphs: [
            "應盡快以保密方式記錄事實和已採取的行動，並把學術後果交由正式的評核或特殊情況程序處理。",
            "院校亦應透過合適的學生支援渠道跟進，並檢討員工培訓、場地安排和考試程序。充分準備的應對方式能同時保障學生福祉和學術誠信。",
          ],
        },
      ]
    ),
    200: article(
      [
        "虛擬實境頭戴裝置在價格、運算要求、追蹤方式和易用程度方面差異很大。本文比較三種市場定位：連接電腦的 HTC VIVE 系統、獨立運作的 Meta Quest 2，以及較新的 Quest 3 和 Quest Pro。",
        "產品名稱和規格更新迅速，因此本文應被視為教育應用的反思，而不是現時的購買建議。",
      ],
      [
        {
          heading: "HTC VIVE：功能強，設定較複雜",
          paragraphs: [
            "連接電腦的 VIVE 系統可提供良好畫質、準確追蹤和靈活的房間尺度體驗，適合對運算能力和追蹤精準度要求較高的研究或模擬。",
            "代價是較複雜的設定。視乎型號，使用者可能需要高效能電腦、連接線、轉接器和追蹤設備。",
          ],
        },
        {
          heading: "Meta Quest 2：較易使用的獨立式 VR",
          paragraphs: [
            "Quest 2 把無線操作、由內向外追蹤和應用程式整合於一部裝置，令 VR 更容易用於示範和小組學習。",
            "教育工作者仍須考慮舒適度、帳戶管理、裝置清潔和院校資料管治。",
          ],
        },
        {
          heading: "Quest 3 與 Quest Pro：混合實境應用",
          paragraphs: [
            "兩款裝置的定位不同，但都展示了更佳的影像透視和混合實境功能。當學習者需要同時接觸數碼內容和實體環境時，這些功能可能具有價值。",
            "最適合教學的裝置不一定是最新型號。選擇應由學習目標、應用程式、技術支援、預算、私隱和感染控制要求決定。",
          ],
        },
      ]
    ),
    189: article(
      [
        "獨立式 Meta Quest 頭戴裝置的設定，比早期連接電腦的系統簡單得多。無線設計和由內向外追蹤減少了外置感應器、大量接線和專用電腦的需要。",
        "不同型號和軟件版本的畫面與帳戶要求會有所不同，但基本準備流程相近。",
      ],
      [
        {
          heading: "開始前的準備",
          points: [
            "為頭戴裝置和控制器充滿電。",
            "準備光線充足、沒有障礙物並有足夠活動空間的場地。",
            "如型號需要，安裝最新的 Meta Horizon 流動應用程式。",
            "確認無線網絡和院校帳戶安排合適。",
          ],
        },
        {
          heading: "初始設定",
          points: [
            "開啟裝置並依照畫面指示操作。",
            "配對控制器並連接 Wi-Fi。",
            "在教學前完成系統更新。",
            "設定安全邊界，並從學生使用位置進行測試。",
            "預先安裝和開啟所需應用程式。",
          ],
        },
        {
          heading: "教學安排",
          paragraphs: [
            "完成技術設定只是第一步。教師仍須說明活動如何配合學習成果、學生如何獲得指示，以及活動後如何反思。",
            "共用裝置需要有清潔、充電和帳戶使用程序，也要留意暈動不適。對不能或不願使用頭戴裝置的學生，應提供替代學習活動。",
          ],
        },
      ]
    ),
    181: article(
      [
        "2020 年，我把 Alienware M15 R2 手提電腦與 HTC VIVE Cosmos 頭戴裝置配合使用。當時這是一套具相當能力的電腦式 VR 組合，但設定所需的準備，遠多於現代獨立式裝置。",
      ],
      [
        {
          heading: "設備與設定",
          points: [
            "Intel Core i7-9750H 處理器、16 GB RAM 和 256 GB 固態硬碟。",
            "NVIDIA RTX 2070 顯示卡。",
            "HTC VIVE Cosmos 頭戴裝置和控制器。",
          ],
          paragraphs: [
            "第一個困難是連接方式。我需要合適的 Mini DisplayPort 轉接器，而當時在本地不容易找到。硬件接妥後，仍要安裝軟件、更新驅動程式、準備安全空間和設定虛擬環境。",
            "連同下載，整個過程約需三個半小時。追蹤效果容易受光線影響，也需要多次調整設定。",
          ],
        },
        {
          heading: "值得嗎？",
          paragraphs: [
            "完成設定後，體驗確實投入而且令人印象深刻。不過，所需時間和技術信心會成為繁忙教學環境中的明顯障礙。",
            "這次經驗令我明白，教育應用除了重視圖像效能，也必須考慮設定是否簡單、能否穩定重複，以及是否有足夠技術支援。",
          ],
        },
      ]
    ),
    175: article(
      [
        "在格拉斯哥舉行的 AMEE 2023 會議上，我有機會試用 3D Organon 的虛擬實境版本。這個應用程式提供互動式三維解剖模型，讓學習者從不同角度和比例觀察人體結構。",
        "我過往曾使用 Sharecare 的 VR 解剖應用程式，因此這次示範令我開始思考兩個平台的異同，以及它們如何支援解剖學習。",
      ],
      [
        {
          heading: "評估時應考慮的問題",
          points: [
            "解剖結構是否準確而清晰？",
            "學習者能否容易地分離、標示和比較結構？",
            "互動是否促進空間理解，而不只是被動觀看？",
            "長時間使用時是否舒適和具無障礙設計？",
            "教育價值是否足以支持所需成本和技術支援？",
          ],
          paragraphs: ["我希望進一步有系統地測試應用程式，並從可用性、學習設計和學生經驗，而不只是視覺效果，作出比較。"],
        },
      ]
    ),
    146: article(
      [
        "人們經常把知識和努力視為成功的基礎。兩者都很重要，而一個常見的文字遊戲則提醒我們第三項素質：態度。",
        "如果把英文字母 A 至 Z 分別設為 1 至 26，KNOWLEDGE 的總和是 96，HARD WORK 是 98，而 ATTITUDE 則是 100。這並不是科學證據或成功公式，只是一個容易記住的比喻。",
      ],
      [
        {
          heading: "文字遊戲背後的價值",
          paragraphs: [
            "知識帶來理解，努力把意圖轉化為進步。態度則影響我們如何面對失敗、困難的回饋和緩慢的改善。",
            "建設性的態度不是忽略問題或強迫自己永遠正面，而是以好奇、責任感和學習意願面對挑戰。",
            "成功亦受機會、支援和環境影響。在我們能夠控制的範圍內，如何投入學習和回應挫折仍然十分重要。",
          ],
        },
      ]
    ),
    137: article(
      [
        "我有一段時間沒有寫作，部分原因是博士研究總能填滿所有空間。寫下這篇短文，是讓自己重新建立寫作習慣，同時反思學術發展的一種方式。",
        "博士研究可能源於個人構想，卻不會一直是孤立的夢想。導師會質疑假設、收窄過於宏大的計劃，並要求證據。這個過程有時令人不自在，卻是把熱誠轉化為嚴謹研究的重要學習。",
      ],
      [
        {
          heading: "在挑戰中學習",
          paragraphs: [
            "良好的指導並不是贊成每一個構想，而是協助研究者分辨有趣的可能性，與可行、合乎倫理和經得起論證的研究。",
            "博士之路因此不是毫無阻力地追尋夢想，而是讓夢想經過檢驗、修正和加強。",
          ],
        },
      ]
    ),
    300: article(
      [
        "生成式人工智能現在能夠撰寫病人解釋、提出可能的鑑別診斷、建立臨床個案，並提供近乎即時的回饋。對物理治療教育工作者而言，一個很容易出現的問題是：人工智能可以接手多少教學工作？",
        "我認為更重要的問題是：我們如何運用人工智能，同時確保學生仍然學會觀察、推理、溝通和承擔責任？",
        "物理治療並不只是產生一個正確的書面答案。學生需要觀察一個人的動作，選擇並調整檢查方法，詮釋不完整的資料，在不確定中溝通，並安全地回應眼前的病人。人工智能系統或可產生具說服力的建議，但它並沒有參與這些具身體性和關係性的臨床過程。",
      ],
      [
        {
          heading: "潛力與審慎",
          paragraphs: [
            "我的 Obsidian 筆記呈現一個一致立場：教育中的人工智能應是增強式，而不是替代式。人工智能可以減少部分認知和文字組織負擔，擴闊學生思考的問題，並支援形成性回饋。然而，人工智能的第一個回應應被視為待檢視的材料，而不是完成答案。",
            "近期臨床人工智能研究亦提醒我們需要審慎。早期研究和預印本顯示，人工智能輔助系統或有助臨床人員考慮其他可能性，並產生更個人化的復康材料，但亦可能遺漏重要脈絡、造成自動化偏誤，或產生仍須由專業人員修正的病人教育資訊。物理治療教育中的直接證據仍然有限。",
          ],
        },
        {
          heading: "先推理的模式",
          paragraphs: [
            "因此，人工智能應被引入為思考伙伴，而不是臨床捷徑。一個實用模式可簡單地應用於課堂、模擬教學或書面個案分析。",
          ],
          points: [
            "<strong>推理：</strong>學生先評估個案並記錄初步判斷，然後才使用人工智能。",
            "<strong>諮詢：</strong>學生請人工智能提出其他可能性、問題、反方觀點或回饋。",
            "<strong>質疑：</strong>學生根據證據、病人脈絡、專業標準和安全要求檢視回應。",
            "<strong>決定：</strong>學生說明哪些內容被接受、拒絕或修改。",
            "<strong>反思：</strong>學生指出自己學到甚麼，以及哪些地方仍然存在不確定性。",
          ],
        },
        {
          heading: "對教學的改變",
          paragraphs: [
            "這種結構能使學生的思考變得可見。它亦把人工智能素養由懂得寫提示語，轉化為一種專業能力，當中包括核實、私隱、偏見意識、披露和可問責的判斷。",
            "它亦區分了學習與表現。人工智能可以幫助學生快速產生一個看似更好的答案，但這並不證明學習已經發生。在臨床教育中，發展過程中的努力本身是重要的，因為學生正在成為日後不能外判責任的專業人員。",
          ],
          points: [
            "使用刻意設計為不完整的人工智能生成評估或治療計劃，要求學生辨識不安全假設。",
            "要求學生先完成臨床推理圖，再諮詢人工智能，然後比較改變了甚麼及原因。",
            "把人工智能生成的病人教育材料用作批判、改寫和以人為本溝通的練習。",
            "容許人工智能改變模擬病人的病史，同時由教師控制學習成果和安全界線。",
            "要求學生披露所用工具、目的、核實過程及自己的貢獻。",
          ],
        },
        {
          heading: "評估仍須保障臨床能力",
          paragraphs: [
            "評估仍應重視人工智能不能代學生展示的能力：觀察、實務操作、溝通、適應能力和可辯護的臨床推理。學生能貼上一段合理的人工智能答案，並不代表他能檢查病人、回應困擾、識別紅旗或解釋治療決定。",
            "目標並不是保護昨天的作業不受明天的科技影響，而是設計出能讓科技強化，而不是悄悄取代，物理治療師發展的學習。",
          ],
        },
        {
          heading: "本文參考的筆記",
          points: [
            "Obsidian 筆記：<em>AI in Physiotherapy Education - Weekly Digest</em>。",
            "Obsidian 筆記：<em>Generative AI in Teaching and Learning - PolyU Conference</em>。",
            "Obsidian 筆記：<em>Artificial Intelligence - Foundations and Educational Use</em>。",
            "Obsidian 筆記：<em>Research Integrity in the Generative AI Era</em>。",
            "Obsidian 筆記：<em>Should I Use AI for This?</em>，改寫自 Olivier 與 Rowe 為博士研究者設計的決策指南。",
          ],
        },
      ]
    ),
  },
  "zh-hans": {
    256: article(
      [
        "作为大学讲师，我希望把大部分时间投入教学、指导学生和研究。然而，学术工作的日常往往被行政事务占据，包括整理邮件、准备会议、回复重复咨询，以及协调例行流程。",
        "这种行政负担不仅带来不便，也会分散注意力，减少教师与学生深入交流和改善教学的时间。因此，关键问题并不是人工智能能否生成更多文字，而是它能否在不削弱专业判断、隐私和问责的前提下，减少低价值的重复工作。",
      ],
      [
        {
          heading: "超越聊天机器人",
          paragraphs: [
            "OpenClaw 引起我的兴趣，是因为它被设计为能够规划和完成多步骤工作的智能代理，而不只是回应单一提示。在学术环境中，它或许可以协助整理资料、准备简报和监测例行流程。",
            "潜力很明显，风险也同样明显。凡是涉及学生资料、考核记录、邮件或院校系统的应用，都必须受到严格治理。自动化应该支持教育工作者，而不是代替他们作出不透明的决定。",
          ],
          points: [
            "整理一般邮件，并把敏感信息留给教师亲自处理。",
            "根据获准使用的文件和会议记录准备会议摘要。",
            "利用经核实的资料回复常见课程行政问题。",
            "在避免不必要地访问机密资料的前提下，协助提醒和追踪工作流程。",
          ],
        },
        {
          heading: "我的“主动队友”实验",
          paragraphs: [
            "我计划先在使用模拟资料的受控环境中测试邮件分类、会议准备和低风险的课程行政工作。目的不是把学术关怀自动化，而是了解边界清晰的工具能否把时间还给教学和研究。",
            "只有当系统透明、安全并且可以审计时，这项实验才有价值。教育工作者必须继续为所有重要决定负责。谨慎使用时，人工智能代理可以成为实用助手；使用不当时，它只会制造另一层数字行政工作。",
          ],
        },
      ]
    ),
    226: article(
      [
        "在最近一次教与学会议中，人工智能几乎主导了整个议程。很多讲者介绍生成式人工智能和最新工具。这些内容有其价值，但我认为高等教育现在需要开展更深入的讨论。",
        "人工智能已经进入师生的日常生活。核心问题不再是它会不会出现在教育中，而是应该如何实施：它在什么情况下能促进学习？什么时候会削弱独立思考？考核应该如何改变？院校应该依据什么证据采用新工具？",
      ],
      [
        {
          heading: "从新奇走向教育目的",
          paragraphs: [
            "我们不应只因为工具令人惊艳就采用它。首先要确定学习成果、学生需求和专业标准，然后再判断人工智能是否合适。",
            "在健康专业教育中，学生必须发展临床推理、沟通、伦理判断和问责能力。人工智能可以支持练习和反馈，却不能替学生承担专业责任。",
          ],
        },
        {
          heading: "下一阶段应该讨论的问题",
          points: [
            "考核如何区分有助学习的支持与未经思考的依赖？",
            "师生需要具备哪些人工智能素养？",
            "如何保障隐私、公平和学术诚信？",
            "哪些应用确实有证据显示能够改善学习？",
          ],
        },
      ]
    ),
    254: article(
      [
        "毕业典礼有一种独特力量，能让时间仿佛暂停。最近，我坐在香港一所大学的礼堂，看着学生走上台领取学位证书，不禁想起多年前在南非参加的毕业典礼。",
        "在南非，毕业对很多家庭有非常深远的意义。我曾看见父母完成清洁、园艺或驾驶工作后，仍穿着制服赶到校园，只为见证子女完成一段曾经遥不可及的旅程。",
      ],
      [
        {
          heading: "不同环境，共同的自豪",
          paragraphs: [
            "不少毕业生是家中甚至社区内第一位大学生。每一步走过台前，都呈现了多年的牺牲、坚持和希望。",
            "香港的气氛可能较为含蓄，大学教育对很多家庭也更加熟悉。然而，典礼背后的情感同样清晰：喜悦、宽慰，以及看见年轻人完成重要历程的自豪。",
          ],
        },
        {
          heading: "毕业的意义",
          paragraphs: [
            "毕业不只是学术仪式，也是个人努力、家庭支持和社会机会同时被看见的时刻。每位毕业生背后，都有人曾经鼓励、支持或作出牺牲。",
            "对教育工作者而言，典礼也提醒我们，教学的影响超越课程和考核，并会成为学生和家庭故事的一部分。",
          ],
        },
      ]
    ),
    227: article(
      [
        "香港中学文凭考试放榜，是很多年轻人的重要转折点。作为参与大学招生面试的讲师，我需要与同事评估申请人是否适合入读课程。",
        "这份责任比我预期中沉重。面试时间很短，但随后的判断可能影响学生的下一个机会。时间与后果之间的不平衡，要求面试官保持谦逊。",
      ],
      [
        {
          heading: "审慎判断",
          paragraphs: [
            "申请人的教育机会、沟通方式和自信程度各不相同。表达流畅不一定代表最有潜力，紧张也不代表能力不足。面试官既要超越表面表现，也要一致地运用公平标准。",
            "结构化问题、共同评分指引和独立复核有助减少偏见，但任何程序都不是完全中立的。我们必须留意自己对语言、性格和经验的假设。",
          ],
        },
        {
          heading: "这是责任，不是权力",
          paragraphs: [
            "招生决定不应被视为个人权力，而是大学、专业和申请人共同托付的责任。每位申请人都应该获得透明、一致和人性化的评估过程。",
          ],
        },
      ]
    ),
    217: article(
      [
        "融合教育建立在一个基本认识之上：每位学生都有不同的优势、经验和支持需求。特殊教育需求可能涉及肢体活动、感官接收、沟通、专注、信息处理或阅读障碍等学习差异。",
        "讲师的角色不是降低学术标准，而是消除可以避免的障碍，让学生有公平机会展示课程所要求的学习成果。",
      ],
      [
        {
          heading: "实践方法",
          points: [
            "与学生及院校的残障或融合支持服务合作，了解已经批准的合理调整。",
            "提供无障碍格式的教材，并尽可能提前发布重要资料。",
            "采用清晰结构、明确指示和多种方式解释重要概念。",
            "在维持学习成果的前提下，为参与和考核提供适当的灵活性。",
            "检查数字资源、图片、视频和学习平台是否符合无障碍要求。",
          ],
        },
        {
          heading: "合作与评估",
          paragraphs: [
            "学生通常最了解什么支持方式能够帮助自己学习。持续而尊重的沟通，有助于教师了解哪些安排有效、哪些需要调整。",
            "讲师也应与同事、学习支持人员和相关专家合作。把无障碍原则从课程设计初期纳入考虑，不仅支持有特殊教育需求的学生，也能让全班受益。",
          ],
        },
      ]
    ),
    215: article(
      [
        "考试可能加剧焦虑，个别学生也可能出现急性心理健康危机。讲师需要以同理心应对，同时保障所有人的安全、隐私和考核公平。",
        "危机不应只因为干扰考试就被视为不当行为；同样，教师也不应在紧急情况下受压作出学术决定。即时照顾与后续考核安排是两件不同的事情。",
      ],
      [
        {
          heading: "识别危机信号",
          points: [
            "明显恐慌、强烈不安或情绪突然变化。",
            "无法连贯沟通或遵从简单指示。",
            "提及绝望、自我伤害或即时危险。",
            "行为对本人或他人构成安全风险。",
          ],
        },
        {
          heading: "即时应对",
          points: [
            "保持冷静，清晰说话，避免多人围住学生。",
            "按照院校的紧急事件和安全保障程序处理。",
            "联系指定的医疗、心理咨询、保安或紧急服务。",
            "保障其他学生的考试环境，只在必要时安排转移。",
            "不要承诺分数、及格或任何特定学术结果。",
          ],
        },
        {
          heading: "事后跟进",
          paragraphs: [
            "应尽快以保密方式记录事实和已经采取的行动，并把学术后果交由正式的考核或特殊情况程序处理。",
            "院校也应通过适当的学生支持渠道跟进，并评估员工培训、场地安排和考试程序。准备充分的应对方式能够同时保障学生福祉和学术诚信。",
          ],
        },
      ]
    ),
    200: article(
      [
        "虚拟现实头戴设备在价格、计算要求、追踪方式和易用程度方面差异很大。本文比较三种市场定位：连接电脑的 HTC VIVE 系统、独立运行的 Meta Quest 2，以及较新的 Quest 3 和 Quest Pro。",
        "产品名称和规格更新迅速，因此本文应被视为对教育应用的反思，而不是当前的购买建议。",
      ],
      [
        {
          heading: "HTC VIVE：功能强，设置较复杂",
          paragraphs: [
            "连接电脑的 VIVE 系统可以提供良好画质、准确追踪和灵活的房间尺度体验，适合对计算能力和追踪精度要求较高的研究或模拟。",
            "代价是较复杂的设置。根据型号不同，使用者可能需要高性能电脑、连接线、转接器和追踪设备。",
          ],
        },
        {
          heading: "Meta Quest 2：更易使用的独立式 VR",
          paragraphs: [
            "Quest 2 把无线操作、由内向外追踪和应用程序集成在一台设备中，使 VR 更容易用于演示和小组学习。",
            "教育工作者仍须考虑舒适度、账户管理、设备清洁和院校数据治理。",
          ],
        },
        {
          heading: "Quest 3 与 Quest Pro：混合现实应用",
          paragraphs: [
            "两款设备的定位不同，但都展示了更好的影像透视和混合现实功能。当学习者需要同时接触数字内容和实体环境时，这些功能可能具有价值。",
            "最适合教学的设备不一定是最新型号。选择应该由学习目标、应用程序、技术支持、预算、隐私和感染控制要求决定。",
          ],
        },
      ]
    ),
    189: article(
      [
        "独立式 Meta Quest 头戴设备的设置，比早期连接电脑的系统简单得多。无线设计和由内向外追踪减少了外置传感器、大量接线和专用电脑的需要。",
        "不同型号和软件版本的界面与账户要求会有所不同，但基本准备流程相近。",
      ],
      [
        {
          heading: "开始前的准备",
          points: [
            "为头戴设备和控制器充满电。",
            "准备光线充足、没有障碍物并且有足够活动空间的场地。",
            "如设备需要，安装最新的 Meta Horizon 移动应用程序。",
            "确认无线网络和院校账户安排合适。",
          ],
        },
        {
          heading: "初始设置",
          points: [
            "开启设备并按照屏幕指示操作。",
            "配对控制器并连接 Wi-Fi。",
            "在教学前完成系统更新。",
            "设置安全边界，并从学生使用位置进行测试。",
            "提前安装和打开所需应用程序。",
          ],
        },
        {
          heading: "教学安排",
          paragraphs: [
            "完成技术设置只是第一步。教师仍须说明活动如何配合学习成果、学生如何获得指示，以及活动后如何反思。",
            "共享设备需要有清洁、充电和账户使用程序，也要留意晕动不适。对于不能或不愿使用头戴设备的学生，应提供替代学习活动。",
          ],
        },
      ]
    ),
    181: article(
      [
        "2020 年，我把 Alienware M15 R2 笔记本电脑与 HTC VIVE Cosmos 头戴设备配合使用。当时这是一套性能不错的电脑式 VR 组合，但设置所需的准备，远多于现代独立式设备。",
      ],
      [
        {
          heading: "设备与设置",
          points: [
            "Intel Core i7-9750H 处理器、16 GB 内存和 256 GB 固态硬盘。",
            "NVIDIA RTX 2070 显卡。",
            "HTC VIVE Cosmos 头戴设备和控制器。",
          ],
          paragraphs: [
            "第一个困难是连接方式。我需要合适的 Mini DisplayPort 转接器，而当时在本地不容易找到。硬件连接后，仍要安装软件、更新驱动程序、准备安全空间和设置虚拟环境。",
            "连同下载，整个过程大约需要三个半小时。追踪效果容易受光线影响，也需要多次调整设置。",
          ],
        },
        {
          heading: "值得吗？",
          paragraphs: [
            "完成设置后，体验确实投入并且令人印象深刻。不过，所需时间和技术信心会成为繁忙教学环境中的明显障碍。",
            "这次经历让我明白，教育应用除了重视图像性能，也必须考虑设置是否简单、能否稳定重复，以及是否有足够技术支持。",
          ],
        },
      ]
    ),
    175: article(
      [
        "在格拉斯哥举行的 AMEE 2023 会议上，我有机会试用 3D Organon 的虚拟现实版本。这个应用程序提供交互式三维解剖模型，让学习者从不同角度和比例观察人体结构。",
        "我过去曾使用 Sharecare 的 VR 解剖应用程序，因此这次演示让我开始思考两个平台的异同，以及它们如何支持解剖学习。",
      ],
      [
        {
          heading: "评估时应考虑的问题",
          points: [
            "解剖结构是否准确而清晰？",
            "学习者能否方便地分离、标注和比较结构？",
            "交互是否促进空间理解，而不只是被动观看？",
            "长时间使用时是否舒适并符合无障碍要求？",
            "教育价值是否足以支持所需成本和技术支持？",
          ],
          paragraphs: ["我希望进一步系统地测试应用程序，并从可用性、学习设计和学生体验，而不只是视觉效果，作出比较。"],
        },
      ]
    ),
    146: article(
      [
        "人们经常把知识和努力视为成功的基础。两者都很重要，而一个常见的文字游戏则提醒我们第三项素质：态度。",
        "如果把英文字母 A 至 Z 分别设为 1 至 26，KNOWLEDGE 的总和是 96，HARD WORK 是 98，而 ATTITUDE 则是 100。这并不是科学证据或成功公式，只是一个容易记住的比喻。",
      ],
      [
        {
          heading: "文字游戏背后的价值",
          paragraphs: [
            "知识带来理解，努力把意图转化为进步。态度则影响我们如何面对失败、困难的反馈和缓慢的改善。",
            "建设性的态度不是忽略问题或强迫自己永远积极，而是以好奇、责任感和学习意愿面对挑战。",
            "成功也受机会、支持和环境影响。在我们能够控制的范围内，如何投入学习和回应挫折仍然十分重要。",
          ],
        },
      ]
    ),
    137: article(
      [
        "我有一段时间没有写作，部分原因是博士研究总能填满所有空间。写下这篇短文，是让自己重新建立写作习惯，同时反思学术发展的一种方式。",
        "博士研究可能源于个人构想，却不会一直是孤立的梦想。导师会质疑假设、缩小过于宏大的计划，并要求证据。这个过程有时令人不适，却是把热情转化为严谨研究的重要学习。",
      ],
      [
        {
          heading: "在挑战中学习",
          paragraphs: [
            "良好的指导并不是赞成每一个构想，而是帮助研究者分辨有趣的可能性，与可行、符合伦理并且经得起论证的研究。",
            "博士之路因此不是毫无阻力地追寻梦想，而是让梦想经过检验、修正和加强。",
          ],
        },
      ]
    ),
    300: article(
      [
        "生成式人工智能现在能够撰写患者解释、提出可能的鉴别诊断、建立临床案例，并提供近乎即时的反馈。对物理治疗教育工作者而言，一个很容易出现的问题是：人工智能可以接手多少教学工作？",
        "我认为更重要的问题是：我们如何运用人工智能，同时确保学生仍然学会观察、推理、沟通和承担责任？",
        "物理治疗并不只是产生一个正确的书面答案。学生需要观察一个人的动作，选择并调整检查方法，解释不完整的信息，在不确定中沟通，并安全地回应眼前的患者。人工智能系统或许可以产生有说服力的建议，但它并没有参与这些具身体性和关系性的临床过程。",
      ],
      [
        {
          heading: "潜力与审慎",
          paragraphs: [
            "我的 Obsidian 笔记呈现一个一致立场：教育中的人工智能应是增强式，而不是替代式。人工智能可以减少部分认知和文字组织负担，扩大学生思考的问题，并支持形成性反馈。然而，人工智能的第一个回应应被视为待检查的材料，而不是完成答案。",
            "近期临床人工智能研究也提醒我们需要审慎。早期研究和预印本显示，人工智能辅助系统或有助临床人员考虑其他可能性，并产生更个性化的康复材料，但也可能遗漏重要语境、造成自动化偏误，或产生仍须由专业人员修正的患者教育信息。物理治疗教育中的直接证据仍然有限。",
          ],
        },
        {
          heading: "先推理的模式",
          paragraphs: [
            "因此，人工智能应被引入为思考伙伴，而不是临床捷径。一个实用模式可简单地应用于课堂、模拟教学或书面案例分析。",
          ],
          points: [
            "<strong>推理：</strong>学生先评估案例并记录初步判断，然后才使用人工智能。",
            "<strong>咨询：</strong>学生请人工智能提出其他可能性、问题、反方观点或反馈。",
            "<strong>质疑：</strong>学生根据证据、患者语境、专业标准和安全要求检查回应。",
            "<strong>决定：</strong>学生说明哪些内容被接受、拒绝或修改。",
            "<strong>反思：</strong>学生指出自己学到什么，以及哪些地方仍然存在不确定性。",
          ],
        },
        {
          heading: "对教学的改变",
          paragraphs: [
            "这种结构能使学生的思考变得可见。它也把人工智能素养由懂得写提示语，转化为一种专业能力，当中包括核实、隐私、偏见意识、披露和可问责的判断。",
            "它也区分了学习与表现。人工智能可以帮助学生快速产生一个看似更好的答案，但这并不证明学习已经发生。在临床教育中，发展过程中的努力本身是重要的，因为学生正在成为日后不能外包责任的专业人员。",
          ],
          points: [
            "使用刻意设计为不完整的人工智能生成评估或治疗计划，要求学生识别不安全假设。",
            "要求学生先完成临床推理图，再咨询人工智能，然后比较改变了什么及原因。",
            "把人工智能生成的患者教育材料用作批判、改写和以人为本沟通的练习。",
            "允许人工智能改变模拟患者的病史，同时由教师控制学习成果和安全边界。",
            "要求学生披露所用工具、目的、核实过程及自己的贡献。",
          ],
        },
        {
          heading: "评估仍须保障临床能力",
          paragraphs: [
            "评估仍应重视人工智能不能代学生展示的能力：观察、实践操作、沟通、适应能力和可辩护的临床推理。学生能贴上一段合理的人工智能答案，并不代表他能检查患者、回应困扰、识别红旗或解释治疗决定。",
            "目标并不是保护昨天的作业不受明天的科技影响，而是设计出能让科技强化，而不是悄悄取代，物理治疗师发展的学习。",
          ],
        },
        {
          heading: "本文参考的笔记",
          points: [
            "Obsidian 笔记：<em>AI in Physiotherapy Education - Weekly Digest</em>。",
            "Obsidian 笔记：<em>Generative AI in Teaching and Learning - PolyU Conference</em>。",
            "Obsidian 笔记：<em>Artificial Intelligence - Foundations and Educational Use</em>。",
            "Obsidian 笔记：<em>Research Integrity in the Generative AI Era</em>。",
            "Obsidian 笔记：<em>Should I Use AI for This?</em>，改写自 Olivier 与 Rowe 为博士研究者设计的决策指南。",
          ],
        },
      ]
    ),
  },
};
