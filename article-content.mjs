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
    303: article(
      [
        "One of the most optimistic claims about artificial intelligence is that it will save academics time. It can draft, summarise, code, format, search, translate and reorganise information at a speed that would have seemed impossible only a few years ago.",
        "But there is a harder institutional question: when AI saves time, who gets that time back? In many academic settings, efficiency gains are absorbed as higher expectations rather than returned as protected time for deeper work.",
      ],
      [
        {
          heading: "The acceleration problem",
          paragraphs: [
            "Academic careers already run on visible productivity: publications, grants, student completions, service, teaching innovation, impact and collaboration. When a tool increases the speed of one part of this system, the system rarely responds by lowering workload. It usually raises the pace.",
            "AI will not be an exception. A researcher who uses AI to draft faster may soon find that faster drafting is simply assumed. A supervisor may expect quicker revisions. A research team may expect broader searches. A committee may expect more polished documents in less time.",
          ],
        },
        {
          heading: "The bottleneck becomes judgement",
          paragraphs: [
            "If AI absorbs more of the execution, the remaining work becomes harder, not easier. The real bottleneck becomes direction: which question is worth asking, which result matters, which design tests the real issue, and which argument is genuinely yours rather than merely fluent.",
            "These are not mechanical tasks. They require field knowledge, judgement, taste and accountability.",
          ],
        },
        {
          heading: "Experts gain leverage; novices may lose development",
          paragraphs: [
            "For an expert, AI can function like a cognitive exoskeleton. The expert already knows the field, the standards and the shape of good work. They can reject fluent nonsense and use AI to scale their thinking.",
            "For a novice, the same tool can become a trap. If AI produces research questions, theory summaries, supervision responses or committee answers that the learner cannot defend, the surface of academic work appears before the underlying development has happened. The danger is premature fluency.",
          ],
        },
        {
          heading: "The artefact was never the whole point",
          paragraphs: [
            "A thesis, article, assignment or proposal is an artefact. It matters, but it was always evidence of a process. The deeper purpose is the development of someone who can make decisions, justify them, revise them and stand behind them.",
            "This is why viva-style questioning, supervision conversations and proposal reviews remain important. They ask the researcher to explain why they framed the question this way, what they considered and rejected, and what they would now do differently.",
          ],
        },
        {
          heading: "Ask about decisions, not only prompts",
          paragraphs: [
            "Much of the conversation about AI use focuses on prompts. That is useful, but incomplete. The more important level is the decision tier.",
          ],
          points: [
            "Why did the student or researcher ask that question at that point?",
            "What did they do with the response?",
            "What did they verify or reject?",
            "What data did they expose, and can they account for where it went?",
            "Can they defend the final argument?",
          ],
        },
        {
          heading: "Two questions for responsible use",
          paragraphs: [
            "For research training, two questions are useful: is this use of AI building me as a researcher, and can I defend the decisions that shaped this work? If both are satisfied, AI use is more likely to support academic growth. If either fails, the decision deserves reconsideration, even if no formal rule has been broken.",
          ],
        },
      ]
    ),
    302: article(
      [
        "One of my rough notes began with a simple question: are students now learning inside a safer bubble than previous generations? The phrase is imperfect, but the concern is useful. Contemporary education rightly pays more attention to wellbeing, inclusion, accessibility and support. That is progress.",
        "The problem begins when support quietly becomes over-protection, and when every form of difficulty is treated as something to remove. Generative AI makes this question more urgent because it can remove struggle at the exact point where struggle may be doing developmental work.",
      ],
      [
        {
          heading: "Not all difficulty is good",
          paragraphs: [
            "Some educational difficulty is wasteful: confusing instructions, inaccessible materials, unclear assessment criteria and hostile classroom cultures do not build resilience. They create avoidable barriers.",
            "But some difficulty is productive. Students need to sit with uncertainty, test an idea, get it wrong, revise it and explain why a better answer is better. This matters in health professional education, where graduates must make decisions in messy, embodied and incomplete situations.",
          ],
        },
        {
          heading: "What AI changes",
          paragraphs: [
            "AI can now step into the exact moment where learning is supposed to happen. A student who is unsure how to begin can ask for a structure. A student who has not yet read deeply can ask for a summary. A student who cannot yet connect symptoms, anatomy and clinical reasoning can ask for a plausible plan.",
            "The answer may look competent, but competence in the output is not the same as competence in the learner.",
          ],
        },
        {
          heading: "A safer bubble is not the same as a better education",
          paragraphs: [
            "A good learning environment should be safe enough for students to take intellectual risks. Students should be able to ask basic questions, attempt difficult tasks, fail in low-stakes settings and receive feedback without humiliation. That kind of safety is not softness. It is the condition that allows challenge to work.",
            "The danger is a different kind of safety: a bubble where students are protected from difficulty, consequences and the need to defend their own reasoning.",
          ],
        },
        {
          heading: "Design AI around productive struggle",
          paragraphs: [
            "The answer is not to ban AI everywhere. It is to decide where struggle should remain visible.",
          ],
          points: [
            "Students first attempt a case, question or draft before consulting AI.",
            "AI outputs are used as critique material rather than model answers.",
            "Students explain what they accepted, rejected and changed.",
            "Some assessments require oral defence, practical demonstration or real-time reasoning.",
            "Reflection focuses less on the prompt and more on the decision behind it.",
          ],
        },
        {
          heading: "The role of the educator",
          paragraphs: [
            "The educator's role is not to make learning unnecessarily hard. It is to preserve the right kind of challenge. AI should help students stay engaged with difficult work, not quietly remove the need to do it.",
            "The goal is not a return to harsher education. It is a better distinction between barriers that should be removed and struggles that help students become capable.",
          ],
        },
      ]
    ),
    301: article(
      [
        "Universities are writing policies for generative artificial intelligence at speed. That work is necessary, but policy alone will not solve academic integrity. Students do not make decisions about AI use in a vacuum. They make them under deadline pressure, family expectations, peer norms and a constant stream of online advice claiming that everyone is using AI and that detection can be avoided.",
        "If our response focuses only on surveillance and punishment, we may miss the conditions that make misuse feel normal or necessary. A more useful response is to treat AI integrity as an educational problem: students need clear boundaries, but they also need practical help to resist pressure, verify information and use AI without outsourcing their learning.",
      ],
      [
        {
          heading: "Pressure changes behaviour",
          paragraphs: [
            "Many students are under strong performance pressure. Grades may be linked to scholarships, family expectations, professional entry or a sense of personal worth. In that environment, AI can look less like a learning tool and more like an escape route when deadlines, workload and anxiety converge.",
            "This does not excuse misconduct. It does, however, explain why simply saying &quot;do not use AI&quot; is unlikely to be enough. Students need to understand what responsible use looks like before a crisis point, and they need assessment designs that make the learning process visible rather than rewarding only a polished final product.",
          ],
        },
        {
          heading: "Peer norms matter",
          paragraphs: [
            "Students also watch one another. When classmates say that AI use is common, undetectable or harmless, unofficial peer norms can become more influential than official policy. A recent study on academic cheating with generative AI reported that peer influence was a major predictor of AI-related cheating behaviour.",
            "This is where educators need to speak more openly with students. If we avoid the topic, informal student communities will write the rules for us. Clear classroom discussion can help students distinguish legitimate support from work that misrepresents their own competence.",
          ],
        },
        {
          heading: "Misinformation makes the problem worse",
          paragraphs: [
            "The online environment adds another layer. Social media posts, forums and technology influencers often present AI misuse as clever strategy rather than academic risk. Some content exaggerates what AI can do, overstates the weakness of detection systems, or promotes methods for avoiding assessment safeguards.",
            "Students may then develop a false sense of security. The issue is not only that students can access AI tools; it is that they can also access persuasive misinformation about how those tools should be used.",
          ],
        },
        {
          heading: "Verification is now a core academic skill",
          paragraphs: [
            "The need for human verification is not limited to students. In 2026, South Africa's Department of Communications and Digital Technologies withdrew a draft national AI policy after concerns were raised about fictitious and unverified sources. The incident is a useful teaching case: AI-generated writing can appear authoritative while still containing references or claims that collapse under scrutiny.",
            "For higher education, the message is direct. AI can support drafting, summarising and idea generation, but responsibility remains with the human author. Every factual claim, citation and recommendation must be checked before it is used in academic or professional work.",
          ],
        },
        {
          heading: "From detection to education",
          paragraphs: [
            "Detection and disciplinary processes still have a place, especially when students intentionally misrepresent AI-generated work. But they should not be the whole strategy. Universities need a broader integrity response that combines policy, assessment design, student support and AI literacy.",
          ],
          points: [
            "Make AI permissions explicit for each assessment rather than relying on a generic course statement.",
            "Require students to document process, sources, prompts, verification steps and their own contribution where AI use is allowed.",
            "Use classroom examples of flawed AI outputs, including fabricated citations, to teach verification.",
            "Discuss peer pressure directly and name the risk of &quot;everyone is doing it&quot; thinking.",
            "Design some assessments around oral explanation, staged submissions, practical performance or reflective justification.",
          ],
        },
        {
          heading: "A more honest message to students",
          paragraphs: [
            "The most defensible message is not that AI is forbidden everywhere, nor that students should use it without limits. The message is that AI may be useful, but it does not remove the student's responsibility to learn, think, verify and be honest about their work.",
            "Academic integrity in the AI era will depend less on catching every misuse after the fact and more on creating learning cultures where students understand the boundaries before they cross them.",
          ],
        },
        {
          heading: "Sources checked for this draft",
          points: [
            "Academic Cheating with Generative AI: Exploring a Moral Extension of the Theory of Planned Behavior, 2025.",
            "South African Government News Agency: Minister announces withdrawal of draft AI policy, 2026.",
            "Original Obsidian note: Random idea about University policies against AI usage.",
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
    303: article(
      [
        "人工智能常被描述為可以為學者節省時間。它可以快速草擬、摘要、編碼、格式化、搜尋、翻譯和整理資料。",
        "但更困難的制度問題是：當人工智能節省了時間，誰真正取回了這些時間？在不少學術環境中，效率提升往往被吸收為更高的產出期望，而不是變成受保護的深度思考時間。",
      ],
      [
        {
          heading: "加速的問題",
          paragraphs: [
            "學術職涯本來已圍繞可見產出運作：論文、研究資助、學生完成、服務、教學創新、影響和協作。當工具令其中一部分工作變快，制度很少因此降低工作量，反而通常會提高節奏。",
            "人工智能不會例外。能更快草擬的研究者，可能很快會發現快速草擬變成基本假設。導師可能期待更快修改，團隊可能期待更廣泛搜尋，委員會可能期待更短時間內有更完整文件。",
          ],
        },
        {
          heading: "瓶頸變成判斷",
          paragraphs: [
            "如果人工智能承擔更多執行工作，剩下的工作不一定更容易，反而更困難。真正的瓶頸變成方向：哪個問題值得問、哪個結果重要、哪個設計能測試真正的問題、哪個論點是自己的而不只是流暢。",
            "這些不是機械任務，而是需要領域知識、判斷、品味和問責。",
          ],
        },
        {
          heading: "專家獲得槓桿，初學者可能失去發展",
          paragraphs: [
            "對專家而言，人工智能可以像認知外骨骼。專家已經知道領域、標準和好作品的形狀，因此能拒絕流暢但空洞的答案，並把人工智能用來放大思考。",
            "對初學者而言，同一工具可能成為陷阱。如果人工智能產生研究問題、理論摘要、導師會議回應或委員會答辯，而學習者不能為它們辯護，學術工作的表面會先於真正發展出現。危險是過早流暢。",
          ],
        },
        {
          heading: "成品從來不是全部目的",
          paragraphs: [
            "論文、文章、作業或計劃書都是成品。它們重要，但一直也是過程的證據。更深層的目的，是培養一個能作決定、解釋決定、修正決定並承擔決定的人。",
            "因此，口試式提問、導師討論和計劃書審查仍然重要。它們要求研究者解釋為何這樣界定問題、考慮並排除了甚麼，以及現在會如何修改。",
          ],
        },
        {
          heading: "問決定，不只問提示語",
          paragraphs: [
            "許多人工智能討論集中在提示語。這有用，但不完整。更重要的是決策層次。",
          ],
          points: [
            "為何在那一刻問這個問題？",
            "如何處理回應？",
            "核實或拒絕了甚麼？",
            "暴露了甚麼資料，又能否交代資料流向？",
            "能否為最終論點辯護？",
          ],
        },
        {
          heading: "兩個負責任使用的問題",
          paragraphs: [
            "對研究訓練而言，兩個問題很有用：這樣使用人工智能是否正在建立我作為研究者的能力？我能否為塑造這份工作的決定辯護？如果兩者都成立，人工智能較可能支援學術成長；如果其中一項失敗，即使沒有違反明文規則，也值得重新考慮。",
          ],
        },
      ]
    ),
    302: article(
      [
        "我的其中一則粗略筆記由一個簡單問題開始：今天的學生是否比以往更常在安全泡泡中學習？這個說法並不完美，但問題值得思考。當代教育更重視身心健康、共融、可及性和支援，這是進步。",
        "問題出現在支援悄悄變成過度保護，而每一種困難都被視為應該移除的東西。生成式人工智能令問題更迫切，因為它可以在有效掙扎正在發生的那一刻，把掙扎移走。",
      ],
      [
        {
          heading: "不是所有困難都有益",
          paragraphs: [
            "有些教育困難只是浪費：混亂指示、不可及教材、不清晰評估準則和敵意課堂文化不會建立韌性，只會製造可避免障礙。",
            "但有些困難是有效的。學生需要與不確定共處、測試想法、犯錯、修正，並解釋為何較好的答案更好。這對健康專業教育尤其重要，因為畢業生將在混亂、具身和不完整的情境中作決定。",
          ],
        },
        {
          heading: "人工智能改變了甚麼",
          paragraphs: [
            "人工智能現在可以進入學習本應發生的那一刻。不知如何開始的學生可以要求結構；未深入閱讀的學生可以要求摘要；尚未能連結症狀、解剖和臨床推理的學生可以要求一個看似合理的計劃。",
            "答案可以看起來很有能力，但輸出的能力不等於學習者的能力。",
          ],
        },
        {
          heading: "更安全的泡泡不等於更好的教育",
          paragraphs: [
            "好的學習環境應安全得足以讓學生冒知識上的風險。學生應能提出基本問題、嘗試困難任務、在低風險環境中失敗，並在不受羞辱的情況下接受回饋。這種安全不是軟弱，而是挑戰能發揮作用的條件。",
            "危險的是另一種安全：學生被保護到不用面對困難、後果和為自己推理辯護的需要。",
          ],
        },
        {
          heading: "圍繞有效掙扎設計人工智能",
          paragraphs: [
            "答案不是全面禁止人工智能，而是決定哪裏的掙扎應該保持可見。",
          ],
          points: [
            "學生先嘗試個案、問題或初稿，然後才諮詢人工智能。",
            "人工智能輸出用作批判材料，而不是標準答案。",
            "學生解釋自己接受、拒絕和修改了甚麼。",
            "部分評估要求口頭辯護、實作展示或即時推理。",
            "反思不只集中在提示語，而是集中在背後的決定。",
          ],
        },
        {
          heading: "教育者的角色",
          paragraphs: [
            "教育者的角色不是令學習不必要地困難，而是保留正確種類的挑戰。人工智能應幫助學生持續投入困難工作，而不是悄悄移除做這些工作的需要。",
            "目標不是回到更嚴苛的教育，而是更好地區分應被移除的障礙，以及能幫助學生成為有能力專業人的掙扎。",
          ],
        },
      ]
    ),
    301: article(
      [
        "大學正在快速制定生成式人工智能政策。這是必要的，但政策本身不足以解決學術誠信問題。學生使用人工智能的決定並不是在真空中作出；他們面對期限、家庭期望、同儕規範，以及大量聲稱「大家都在用」和「不會被發現」的網上資訊。",
        "如果我們只把回應集中在監察與處分，便可能忽略令濫用人工智能變得合理或必要的環境。更有效的做法，是把人工智能誠信視為教育問題：學生需要清晰界線，也需要實際能力去抵抗壓力、核實資訊，並在不外判學習的情況下使用人工智能。",
      ],
      [
        {
          heading: "壓力會改變行為",
          paragraphs: [
            "不少學生承受強烈的成績壓力。成績可能連繫到獎學金、家庭期望、專業入門，甚至自我價值。在這種情況下，人工智能很容易由學習工具變成逃避壓力的捷徑。",
            "這並不是為學術不誠實開脫，但能解釋為何單靠一句「不要使用人工智能」並不足夠。學生需要在危機出現前明白甚麼是負責任使用，而評估設計也應讓學習過程可見，而不只是獎勵一份漂亮的最終答案。",
          ],
        },
        {
          heading: "同儕規範很重要",
          paragraphs: [
            "學生也會觀察彼此。當同學說人工智能使用很普遍、不會被發現或沒有問題時，非正式的同儕規範可能比官方政策更有影響力。一項關於生成式人工智能與學術作弊的研究指出，同儕影響是人工智能相關作弊行為的重要預測因素。",
            "因此，教師需要更公開地與學生討論這個議題。如果我們迴避討論，學生社群便會自行制定規則。清晰的課堂討論可幫助學生區分合理支援與錯誤呈現自己能力的做法。",
          ],
        },
        {
          heading: "錯誤資訊令問題更複雜",
          paragraphs: [
            "網上環境加入了另一層風險。社交媒體、討論區和科技內容創作者有時會把人工智能濫用描述成聰明策略，而不是學術風險。有些內容誇大人工智能能力、低估偵測系統，或推廣避開評估保障的方法。",
            "學生因此可能形成錯誤安全感。問題不只是學生能夠使用人工智能工具，而是他們也能接觸到具說服力、但可能錯誤的人工智能使用建議。",
          ],
        },
        {
          heading: "核實已成為核心學術能力",
          paragraphs: [
            "人類核實不只適用於學生。2026 年，南非通訊與數碼科技部因草案中出現虛構及未經核實的來源，撤回一份國家人工智能政策草案。這是一個很有用的教學案例：人工智能生成文字可以看起來很權威，但其中的引用或事實可能經不起檢查。",
            "對高等教育而言，訊息很直接。人工智能可以支援草擬、摘要與構思，但責任仍在作者身上。所有事實陳述、引用與建議，在用於學術或專業工作前都必須核實。",
          ],
        },
        {
          heading: "從偵測走向教育",
          paragraphs: [
            "偵測與紀律程序仍然有其位置，特別是學生有意把人工智能生成內容冒充為自己工作時。然而，這不應是整個策略。大學需要結合政策、評估設計、學生支援與人工智能素養。",
          ],
          points: [
            "為每項評估清楚說明人工智能是否可用，而不是只依賴一般課程聲明。",
            "在允許使用人工智能時，要求學生記錄過程、來源、提示語、核實步驟及自己的貢獻。",
            "使用有缺陷的人工智能輸出，包括虛構引用，作為核實訓練。",
            "直接討論同儕壓力，以及「大家都在做」思維的風險。",
            "把部分評估設計成口頭解釋、分階段提交、實作表現或反思性辯護。",
          ],
        },
        {
          heading: "對學生更誠實的訊息",
          paragraphs: [
            "最合理的訊息不是人工智能在所有情況都被禁止，也不是學生可以無限制使用。更準確的說法是：人工智能可以有用，但它不能取代學生學習、思考、核實及誠實交代自己工作的責任。",
            "人工智能時代的學術誠信，不應只依賴事後偵測每一次濫用，而要建立一種讓學生在越界前已明白界線的學習文化。",
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
    303: article(
      [
        "人工智能常被描述为可以为学者节省时间。它可以快速草拟、摘要、编码、格式化、搜索、翻译和整理资料。",
        "但更困难的制度问题是：当人工智能节省了时间，谁真正取回了这些时间？在不少学术环境中，效率提升往往被吸收为更高的产出期望，而不是变成受保护的深度思考时间。",
      ],
      [
        {
          heading: "加速的问题",
          paragraphs: [
            "学术职业本来已围绕可见产出运作：论文、研究资助、学生完成、服务、教学创新、影响和协作。当工具令其中一部分工作变快，制度很少因此降低工作量，反而通常会提高节奏。",
            "人工智能不会例外。能更快草拟的研究者，可能很快会发现快速草拟变成基本假设。导师可能期待更快修改，团队可能期待更广泛搜索，委员会可能期待更短时间内有更完整文件。",
          ],
        },
        {
          heading: "瓶颈变成判断",
          paragraphs: [
            "如果人工智能承担更多执行工作，剩下的工作不一定更容易，反而更困难。真正的瓶颈变成方向：哪个问题值得问、哪个结果重要、哪个设计能测试真正的问题、哪个论点是自己的而不只是流畅。",
            "这些不是机械任务，而是需要领域知识、判断、品味和问责。",
          ],
        },
        {
          heading: "专家获得杠杆，初学者可能失去发展",
          paragraphs: [
            "对专家而言，人工智能可以像认知外骨骼。专家已经知道领域、标准和好作品的形状，因此能拒绝流畅但空洞的答案，并把人工智能用来放大思考。",
            "对初学者而言，同一工具可能成为陷阱。如果人工智能产生研究问题、理论摘要、导师会议回应或委员会答辩，而学习者不能为它们辩护，学术工作的表面会先于真正发展出现。危险是过早流畅。",
          ],
        },
        {
          heading: "成品从来不是全部目的",
          paragraphs: [
            "论文、文章、作业或计划书都是成品。它们重要，但一直也是过程的证据。更深层的目的，是培养一个能作决定、解释决定、修正决定并承担决定的人。",
            "因此，口试式提问、导师讨论和计划书审查仍然重要。它们要求研究者解释为何这样界定问题、考虑并排除了什么，以及现在会如何修改。",
          ],
        },
        {
          heading: "问决定，不只问提示词",
          paragraphs: [
            "许多人工智能讨论集中在提示词。这有用，但不完整。更重要的是决策层次。",
          ],
          points: [
            "为何在那一刻问这个问题？",
            "如何处理回应？",
            "核实或拒绝了什么？",
            "暴露了什么资料，又能否交代资料流向？",
            "能否为最终论点辩护？",
          ],
        },
        {
          heading: "两个负责任使用的问题",
          paragraphs: [
            "对研究训练而言，两个问题很有用：这样使用人工智能是否正在建立我作为研究者的能力？我能否为塑造这份工作的决定辩护？如果两者都成立，人工智能较可能支持学术成长；如果其中一项失败，即使没有违反明文规则，也值得重新考虑。",
          ],
        },
      ]
    ),
    302: article(
      [
        "我的其中一则粗略笔记由一个简单问题开始：今天的学生是否比以往更常在安全泡泡中学习？这个说法并不完美，但问题值得思考。当代教育更重视身心健康、包容、可及性和支持，这是进步。",
        "问题出现在支持悄悄变成过度保护，而每一种困难都被视为应该移除的东西。生成式人工智能令问题更迫切，因为它可以在有效挣扎正在发生的那一刻，把挣扎移走。",
      ],
      [
        {
          heading: "不是所有困难都有益",
          paragraphs: [
            "有些教育困难只是浪费：混乱指示、不可及教材、不清晰评估标准和敌意课堂文化不会建立韧性，只会制造可避免障碍。",
            "但有些困难是有效的。学生需要与不确定共处、测试想法、犯错、修正，并解释为何较好的答案更好。这对健康专业教育尤其重要，因为毕业生将在混乱、具身和不完整的情境中作决定。",
          ],
        },
        {
          heading: "人工智能改变了什么",
          paragraphs: [
            "人工智能现在可以进入学习本应发生的那一刻。不知如何开始的学生可以要求结构；未深入阅读的学生可以要求摘要；尚未能连接症状、解剖和临床推理的学生可以要求一个看似合理的计划。",
            "答案可以看起来很有能力，但输出的能力不等于学习者的能力。",
          ],
        },
        {
          heading: "更安全的泡泡不等于更好的教育",
          paragraphs: [
            "好的学习环境应安全得足以让学生冒知识上的风险。学生应能提出基本问题、尝试困难任务、在低风险环境中失败，并在不受羞辱的情况下接受反馈。这种安全不是软弱，而是挑战能发挥作用的条件。",
            "危险的是另一种安全：学生被保护到不用面对困难、后果和为自己推理辩护的需要。",
          ],
        },
        {
          heading: "围绕有效挣扎设计人工智能",
          paragraphs: [
            "答案不是全面禁止人工智能，而是决定哪里的挣扎应该保持可见。",
          ],
          points: [
            "学生先尝试个案、问题或初稿，然后才咨询人工智能。",
            "人工智能输出用作批判材料，而不是标准答案。",
            "学生解释自己接受、拒绝和修改了什么。",
            "部分评估要求口头辩护、实作展示或即时推理。",
            "反思不只集中在提示词，而是集中在背后的决定。",
          ],
        },
        {
          heading: "教育者的角色",
          paragraphs: [
            "教育者的角色不是令学习不必要地困难，而是保留正确种类的挑战。人工智能应帮助学生持续投入困难工作，而不是悄悄移除做这些工作的需要。",
            "目标不是回到更严苛的教育，而是更好地区分应被移除的障碍，以及能帮助学生成为有能力专业人的挣扎。",
          ],
        },
      ]
    ),
    301: article(
      [
        "大学正在快速制定生成式人工智能政策。这是必要的，但政策本身不足以解决学术诚信问题。学生使用人工智能的决定并不是在真空中作出；他们面对期限、家庭期望、同伴规范，以及大量声称“大家都在用”和“不会被发现”的网上信息。",
        "如果我们只把回应集中在监控与处分，便可能忽略令滥用人工智能变得合理或必要的环境。更有效的做法，是把人工智能诚信视为教育问题：学生需要清晰界线，也需要实际能力去抵抗压力、核实信息，并在不外包学习的情况下使用人工智能。",
      ],
      [
        {
          heading: "压力会改变行为",
          paragraphs: [
            "不少学生承受强烈的成绩压力。成绩可能联系到奖学金、家庭期望、专业入门，甚至自我价值。在这种情况下，人工智能很容易由学习工具变成逃避压力的捷径。",
            "这并不是为学术不诚实开脱，但能解释为何单靠一句“不要使用人工智能”并不足够。学生需要在危机出现前明白什么是负责任使用，而评估设计也应让学习过程可见，而不只是奖励一份漂亮的最终答案。",
          ],
        },
        {
          heading: "同伴规范很重要",
          paragraphs: [
            "学生也会观察彼此。当同学说人工智能使用很普遍、不会被发现或没有问题时，非正式的同伴规范可能比官方政策更有影响力。一项关于生成式人工智能与学术作弊的研究指出，同伴影响是人工智能相关作弊行为的重要预测因素。",
            "因此，教师需要更公开地与学生讨论这个议题。如果我们回避讨论，学生群体便会自行制定规则。清晰的课堂讨论可帮助学生区分合理支持与错误呈现自己能力的做法。",
          ],
        },
        {
          heading: "错误信息令问题更复杂",
          paragraphs: [
            "网上环境加入了另一层风险。社交媒体、论坛和科技内容创作者有时会把人工智能滥用描述成聪明策略，而不是学术风险。有些内容夸大人工智能能力、低估检测系统，或推广避开评估保障的方法。",
            "学生因此可能形成错误安全感。问题不只是学生能够使用人工智能工具，而是他们也能接触到具说服力、但可能错误的人工智能使用建议。",
          ],
        },
        {
          heading: "核实已成为核心学术能力",
          paragraphs: [
            "人类核实不只适用于学生。2026 年，南非通信与数字技术部因草案中出现虚构及未经核实的来源，撤回一份国家人工智能政策草案。这是一个很有用的教学案例：人工智能生成文字可以看起来很权威，但其中的引用或事实可能经不起检查。",
            "对高等教育而言，信息很直接。人工智能可以支持草拟、摘要与构思，但责任仍在作者身上。所有事实陈述、引用与建议，在用于学术或专业工作前都必须核实。",
          ],
        },
        {
          heading: "从检测走向教育",
          paragraphs: [
            "检测与纪律程序仍然有其位置，特别是学生有意把人工智能生成内容冒充为自己工作时。然而，这不应是整个策略。大学需要结合政策、评估设计、学生支持与人工智能素养。",
          ],
          points: [
            "为每项评估清楚说明人工智能是否可用，而不是只依赖一般课程声明。",
            "在允许使用人工智能时，要求学生记录过程、来源、提示语、核实步骤及自己的贡献。",
            "使用有缺陷的人工智能输出，包括虚构引用，作为核实训练。",
            "直接讨论同伴压力，以及“大家都在做”思维的风险。",
            "把部分评估设计成口头解释、分阶段提交、实作表现或反思性辩护。",
          ],
        },
        {
          heading: "对学生更诚实的信息",
          paragraphs: [
            "最合理的信息不是人工智能在所有情况都被禁止，也不是学生可以无限制使用。更准确的说法是：人工智能可以有用，但它不能取代学生学习、思考、核实及诚实交代自己工作的责任。",
            "人工智能时代的学术诚信，不应只依赖事后检测每一次滥用，而要建立一种让学生在越界前已明白界线的学习文化。",
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
