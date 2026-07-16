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
    312: article(
      [
        "In my previous reflection on curriculum design, I argued that we should not begin by asking where AI can be inserted. We should begin with the graduate: what competence students must demonstrate, what thinking must remain theirs and how assessment will make that learning visible.",
        "That creates another question. If lecturers decide where AI belongs in a curriculum, how it may be used in assessment and what responsible student use looks like, how AI literate do lecturers need to be? My answer is: sufficiently literate to make sound educational and professional decisions. They do not need to be programmers, data scientists or IT experts.",
      ],
      [
        { heading: "We cannot design responsibly around something we do not understand", paragraphs: ["Students are already using generative AI. Lecturers are being asked to write policies, redesign assessment, approve learning activities, evaluate AI-generated materials and advise students about acceptable use.", "Those decisions require enough understanding to judge what a system can do, where it may fail, whether it supports or bypasses an intended outcome and what students must still demonstrate independently."] },
        { heading: "AI literacy is not technical expertise", paragraphs: ["Lecturers do not need to build machine-learning models, understand advanced coding or become familiar with every AI product. They do need a working understanding of how generative AI produces responses, why it can fabricate information, how bias can enter the output and why fluent language is not evidence of accuracy.", "The goal is not technical mastery. It is informed judgement."] },
        { heading: "The literacy lecturers actually need", points: ["<strong>Foundational:</strong> capabilities, limitations, hallucinations, bias and verification.", "<strong>Pedagogical:</strong> connecting AI use to intended outcomes and protecting the cognitive work students must perform.", "<strong>Assessment:</strong> designing AI-free, AI-supported and AI-critical tasks that make reasoning visible.", "<strong>Ethical and professional:</strong> privacy, confidentiality, copyright, fairness, accessibility, transparency and accountability.", "<strong>Discipline-specific:</strong> recognising relevant uses and risks within physiotherapy practice and education.", "<strong>Reflective:</strong> continuing to test approved tools, examine evidence and learn with colleagues."] },
        { heading: "Not every lecturer needs the same level", paragraphs: ["An AI-aware lecturer can explain basic concepts and risks, communicate policy and guide responsible student use. An AI-enabled lecturer can design aligned activities, adapt assessment and evaluate generated resources. An AI curriculum leader can coordinate programme design, mentor colleagues and contribute to institutional strategy.", "The aim is not to make every lecturer a curriculum leader. It is to establish a safe baseline for everyone and develop deeper capability where particular roles require it."] },
        { heading: "Universities must develop people before platforms", paragraphs: ["Institutions sometimes move quickly to purchase tools while faculty development remains optional or is squeezed into already crowded workloads. An AI-ready university needs protected development time, approved platforms, clear policy, practical examples, assessment support and communities of practice.", "If lecturers remain responsible for curriculum quality and professional standards, they need genuine opportunities to develop the literacy those responsibilities require."] },
        { heading: "The missing step in curriculum design", paragraphs: ["My earlier sequence was: <strong>CILO → Human competence required → Permitted AI role → Learning activity → Evidence of student reasoning → Assessment and assurance.</strong>", "I would now add one step: <strong>Lecturer competence required.</strong> An AI-ready curriculum requires AI-ready educators. This does not mean becoming computer scientists. It means making defensible decisions about when, why and how AI should—or should not—be part of learning."] },
        { heading: "How AI literate are you?", paragraphs: ["I created a short 15-question knowledge check for students, lecturers and other health-professions learners. It covers verification, privacy, bias, professional responsibility and appropriate educational use.", "<a class='primary-link' href='../ai-literacy-check.html'>Take the AI Literacy Check</a>", "The quiz is a reflective learning activity, not a validated assessment. Results are stored only in your browser and displayed as local averages by participant role."] },
      ]
    ),
    311: article(
      [
        "Whenever a new technology enters education, the first question is often predictable: where can we use it? With artificial intelligence, that question now appears in almost every conversation about teaching, learning and assessment.",
        "I increasingly think it is the wrong starting point. The curriculum should not begin with AI. It should begin with the kind of graduate we are trying to develop, the competence they must demonstrate and the decisions for which they must remain accountable.",
      ],
      [
        {
          heading: "The tool-first trap",
          paragraphs: [
            "When we begin with the tool, curriculum design can become a search for places to insert it. A lecture gains an AI activity, an assignment gains a prompt-writing component, or a clinical case gains an AI-generated answer for students to critique.",
            "Some of these activities may be useful. But unless they connect directly to an intended learning outcome, they can create activity without creating alignment. The better sequence is to define the competence, identify the thinking that must remain human, decide the permitted AI role and specify what evidence will make student reasoning visible.",
          ],
        },
        {
          heading: "AI literacy is not chatbot familiarity",
          paragraphs: [
            "Students may already use ChatGPT or similar tools, but exposure is not the same as literacy. AI literacy includes knowing when a tool is appropriate, checking what it produces, recognising bias and privacy risk, explaining how it contributed and accepting responsibility for the final decision.",
            "This is especially important in physiotherapy. A plausible answer can still miss a red flag, ignore a contraindication, misrepresent evidence or fail to account for the person in front of us.",
          ],
        },
        {
          heading: "Three kinds of assessment",
          paragraphs: [
            "An AI-ready programme may need three deliberately different conditions: AI-free assessment to confirm independent foundational competence; AI-supported assessment to represent authentic practice while exposing the student's reasoning; and AI-critical assessment to test whether students can find omissions, challenge unsafe suggestions and verify evidence.",
            "These conditions should be designed across the programme rather than improvised assignment by assignment. Otherwise, students may encounter duplicated activities, unaddressed gaps and contradictory expectations.",
          ],
        },
        {
          heading: "A curriculum pathway, not a single AI lecture",
          paragraphs: [
            "Early in a programme, students might learn about limitations, hallucinations, source checking, disclosure and privacy. Later, they could use AI in evidence appraisal, patient communication and data interpretation. In the clinical years, they could evaluate AI-supported reasoning and identify missing safety information. Near graduation, the focus could move to governance, equity and professional accountability.",
            "This progression matters because responsible use depends on disciplinary knowledge. Students cannot reliably identify an AI error before they know enough physiotherapy to recognise it.",
          ],
        },
        {
          heading: "The educator becomes more important",
          paragraphs: [
            "AI can generate case variations, suggest rubric language and create examples for discussion. It cannot independently decide what is educationally valuable, clinically safe or appropriate for a particular cohort.",
            "The educator's role is therefore not disappearing. It is becoming more demanding: curriculum architect, designer of meaningful practice, facilitator of judgement and verifier of quality.",
          ],
        },
        {
          heading: "The evidence still calls for restraint",
          paragraphs: [
            "There are encouraging signals, but enthusiasm is ahead of evidence. A 2026 systematic review of randomised studies in undergraduate health-professions education found possible benefits for satisfaction, confidence and theoretical knowledge, but results were inconsistent and evidence certainty was low. No included studies assessed workplace behaviour or health outcomes.",
            "That does not mean waiting until every question is settled. It means treating each new AI activity as a curriculum intervention that requires a rationale, alignment, evaluation and willingness to change course.",
          ],
        },
        {
          heading: "A framework I want to explore",
          paragraphs: [
            "The sequence I am considering is: <strong>CILO → Human competence required → Permitted AI role → Learning activity → Evidence of student reasoning → Assessment and assurance.</strong>",
            "This places AI in the curriculum without placing it at the centre. The centre remains the graduate: what they can understand, do, explain and take responsibility for. Perhaps the most useful question is no longer, ‘Where can we use AI?’ It is, ‘What must remain visibly human, and how can AI support that without quietly replacing it?’",
          ],
        },
        {
          heading: "Sources informing this article",
          points: [
            "UNESCO AI competency frameworks for students and teachers (2024).",
            "Lai et al. (2026), <em>The Effectiveness of Artificial Intelligence in Undergraduate Health Professions Education</em>, <a href='https://doi.org/10.2196/88933'>doi:10.2196/88933</a>.",
            "Adjacent medical-education curriculum and competency frameworks: <a href='https://doi.org/10.1186/s12909-026-08620-1'>doi:10.1186/s12909-026-08620-1</a> and <a href='https://doi.org/10.2196/91116'>doi:10.2196/91116</a>.",
          ],
        },
      ]
    ),
    310: article(
      [
        "Ahead of the release of this year’s Hong Kong Diploma of Secondary Education results, I had the opportunity to represent Saint Francis University and the School of Health Sciences at an information session for students and parents considering their next step.",
        "Events like this can look straightforward from the outside. They are often framed as admissions outreach, programme information, or a chance to explain entry requirements. But standing in front of students who are waiting for results, I was reminded that these moments are also about uncertainty, identity, and what higher education means to families who are trying to imagine the future.",
      ],
      [
        {
          heading: "Different systems, familiar emotions",
          paragraphs: [
            "Growing up in South Africa, I remember the anticipation surrounding the release of the National Senior Certificate results. For many learners, those results shape access to university places, scholarships, and career pathways. The atmosphere surrounding the HKDSE feels different in structure, but very similar in emotion.",
            "Students and families invest years of work into a small number of decisive examinations. Long before results are released, conversations are already filled with predicted grades, possible offers, contingency plans, and questions about what happens next. The details of the system may differ, but the waiting feels universal.",
          ],
        },
        {
          heading: "What stands out in Hong Kong",
          paragraphs: [
            "One thing that stands out in Hong Kong is how concentrated the competition can be, especially for sought-after professional programmes such as physiotherapy, medicine, nursing, and pharmacy. In a compact higher education system, a small number of places can carry enormous symbolic and practical weight.",
            "At the same time, Hong Kong also offers significant forms of educational support through scholarships, merit awards, and other funding opportunities. This creates a landscape in which aspiration, competition, and opportunity sit very close together.",
          ],
        },
        {
          heading: "Speaking about physiotherapy",
          paragraphs: [
            "During the session, I introduced our Bachelor of Science (Honours) in Physiotherapy programme at Saint Francis University, including the structure of the curriculum, student expectations, and the professional pathways that may follow graduation.",
            "What matters to me in these conversations is not only explaining admission requirements. It is also helping prospective students understand what the profession actually asks of them. Physiotherapy is not simply a matter of earning the required score and entering a programme. It requires curiosity, empathy, communication, resilience, and a sustained commitment to helping other people function well in everyday life.",
          ],
        },
        {
          heading: "More than grades",
          paragraphs: [
            "I hope students leave these events knowing that results matter, but they do not tell the whole story. Examination performance opens some doors and closes others, but it does not fully determine what kind of learner or professional a person can become.",
            "University should deepen more than content knowledge. It should help students learn to think critically, communicate responsibly, work with uncertainty, and keep learning throughout professional life. Those qualities matter even more now, particularly as technologies such as artificial intelligence continue to reshape both higher education and healthcare.",
          ],
        },
        {
          heading: "Why outreach still matters",
          paragraphs: [
            "Speaking with prospective students and their families reminded me that outreach events are not only administrative exercises. They are opportunities to translate a profession into something human and meaningful. They also allow educators to hear what students are worried about, what they hope for, and what they imagine success to look like.",
            "Whether these students eventually join us at Saint Francis University or continue their journey elsewhere, I hope they approach the next stage with curiosity, steadiness, and confidence. Results matter, but they are the beginning of a story rather than its conclusion.",
          ],
        },
      ]
    ),
    309: article(
      [
        "I recently drafted an assignment that allowed students to use AI. The idea was that students would analyse sport-related movement and injury mechanisms using movement-science principles. AI would help them generate an initial explanation, improve the prompt, compare the outputs and critique the response.",
        "On paper, it looked like the kind of assessment higher education needs now. Students are already using AI. Pretending they are not is not honest, and banning AI everywhere misses a chance to teach critical and responsible use. But the assignment was not used, because AI was not what the assessment was supposed to assess.",
      ],
      [
        {
          heading: "The assessment was about movement science",
          paragraphs: [
            "The disciplinary purpose was to assess whether students could analyse normal human movement using anatomical and biomechanical principles, interpret movement variation and apply movement science to functional activity.",
            "That means students need to reason about movement phases, joints, planes, axes, muscle actions, ground reaction force, centre of mass, base of support, tissue loading and injury mechanisms. Once AI was added, the question became harder: are we assessing movement science, or are we assessing AI literacy?",
          ],
        },
        {
          heading: "The problem of constructive alignment",
          paragraphs: [
            "Assessment design forces us to ask what we are actually measuring. If the intended outcome is movement-science reasoning, then the assessment should make that reasoning visible.",
            "If marks are given for prompt quality, AI critique or comparison between AI outputs, then AI literacy becomes part of the assessed construct. That is not wrong, but it must be intentional. In this draft, AI use was either too important to ignore or not important enough to assess. That made the design unstable.",
          ],
        },
        {
          heading: "Assessment must change, but not accidentally",
          paragraphs: [
            "AI has made some traditional assessment assumptions fragile. Students can now generate fluent explanations, summaries and drafts very quickly. A polished final product no longer tells us enough about understanding.",
            "But assessment should not change simply by adding AI into an existing task. The deeper change is to clarify what the task values: disciplinary reasoning, professional judgement, evidence use, communication, AI literacy, reflection or accountability.",
          ],
        },
        {
          heading: "The fairness problem",
          paragraphs: [
            "Students do not arrive with equal AI experience. If assessment rewards AI skill before that skill is taught, it may assess prior exposure as much as learning.",
            "In health professional education, using a chatbot is not the same as using AI safely, critically or professionally. Better-looking work may not mean better clinical or biomechanical reasoning.",
          ],
        },
        {
          heading: "A better version of the idea",
          paragraphs: [
            "A better version might keep AI critique as a formative activity. Students could compare weak and improved AI outputs, identify missing movement-science reasoning and use AI as a teaching tool rather than an assessed construct.",
            "Another version would explicitly add AI literacy to the curriculum, teach it properly, define performance standards and assess it transparently. A third version would assess the reasoning trail: what students checked, rejected and revised, while marking disciplinary reasoning rather than prompt sophistication.",
          ],
        },
        {
          heading: "What I learned from not using it",
          paragraphs: [
            "Not executing the assignment was not a failure. It clarified the design problem. The better question is not whether AI should be allowed, but what the assessment is trying to make visible.",
            "If the goal is movement-science reasoning, AI must not obscure that reasoning. If the goal is AI literacy, then AI literacy must be taught and assessed as its own capability. Assessment in the AI era must change through alignment, not anxiety.",
          ],
        },
        {
          heading: "The unresolved question",
          paragraphs: [
            "We often say that we cannot assess students on AI use because we do not yet know how good or bad they are at using it. But what about staff?",
            "If staff design AI-permitted assessments, define acceptable use and judge responsible use, then staff AI literacy matters too. That is probably the next post.",
          ],
        },
      ]
    ),
    308: article(
      [
        "For a long time, education has been strongly associated with cognitive performance: knowledge, reasoning, memory, problem-solving and grades. These remain important, but in an AI-rich world cognitive ability alone is not enough.",
        "Students now have tools that can explain concepts, draft essays, summarise readings, generate code and produce plausible answers. As some cognitive tasks become easier to outsource, the human capacities around judgement, adaptability and decency become more visible.",
      ],
      [
        {
          heading: "IQ still matters, but it is not sufficient",
          paragraphs: [
            "Students need to reason, analyse and solve problems. Without understanding, they cannot judge whether an AI output is useful or unsafe. But a student may be intelligent and still struggle to adapt, collaborate, communicate across cultures or act ethically.",
          ],
        },
        {
          heading: "The quotients students may need",
          paragraphs: [
            "IQ concerns cognitive ability. EQ concerns emotion and relationships. AQ concerns adaptation to uncertainty. CQ concerns cultural awareness. Social quotient concerns communication and collaboration. Meaning or spiritual quotient concerns purpose and values. Decency quotient concerns integrity, humility and respect.",
          ],
        },
        {
          heading: "Why AI makes this more important",
          paragraphs: [
            "AI can produce competent-looking text, but it does not become accountable for the kind of person the student is becoming. A future professional still needs to decide what is appropriate, fair, respectful and safe.",
          ],
        },
        {
          heading: "Implications for teaching",
          paragraphs: [
            "Universities should assess more than final products. Students need learning experiences that practise adaptability, communication, cultural awareness, ethical reasoning and accountability.",
          ],
          points: [
            "Use simulation with uncertainty.",
            "Ask students to explain decisions, not only submit polished outputs.",
            "Build structured peer feedback into group work.",
            "Treat decency and professionalism as teachable expectations.",
          ],
        },
      ]
    ),
    307: article(
      [
        "When students use AI for clinical reasoning, the obvious move is to ask for the answer. That may be the wrong starting point.",
        "A better role for AI may be to ask questions after the learner has committed to an initial judgement. Used this way, AI does not replace reasoning; it pressures the reasoning to become clearer.",
      ],
      [
        {
          heading: "Why answers can arrive too early",
          paragraphs: [
            "Clinical reasoning develops through effort. Students need to notice relevant information, weigh alternatives, manage uncertainty and justify a plan. If AI supplies a polished answer too early, the learner may skip the difficult part.",
          ],
        },
        {
          heading: "AI as a questioning partner",
          paragraphs: [
            "After a physiotherapy student proposes an initial hypothesis, AI could ask what finding supports the hypothesis, what finding does not fit, what alternative remains possible, or what red flag would change the plan.",
          ],
        },
        {
          heading: "A teaching sequence",
          paragraphs: [
            "A practical sequence is: student reviews the case without AI, records an initial hypothesis, uses AI to generate probing questions only, revises or defends the reasoning, and then receives educator feedback.",
          ],
        },
        {
          heading: "The principle",
          paragraphs: [
            "Do not ask AI for the answer first. Ask students for their reasoning first. Then use AI to test that reasoning.",
          ],
        },
      ]
    ),
    306: article(
      [
        "Many students have already tried ChatGPT. That does not mean they are AI literate.",
        "This distinction matters in physiotherapy education. A student may find ChatGPT useful and easy to use while still being unsure how to verify evidence, protect patient information, recognise unsafe recommendations or decide when AI use weakens learning.",
      ],
      [
        {
          heading: "Exposure is not competence",
          paragraphs: [
            "Students may use AI to summarise notes, explain concepts, draft reflections or generate study questions. These uses can be helpful, but they can remain basic. Regular use can create confidence without professional judgement.",
          ],
        },
        {
          heading: "What physiotherapy students need",
          paragraphs: [
            "AI literacy should include verification, clinical caution, privacy awareness, learning awareness, disclosure and accountability.",
          ],
        },
        {
          heading: "Teaching AI literacy explicitly",
          paragraphs: [
            "Programmes should not assume students develop these abilities by using ChatGPT. Students can compare AI-generated patient explanations with evidence, identify unsafe assumptions, document what they accepted or rejected, and practise only with simulated cases.",
          ],
        },
        {
          heading: "The point",
          paragraphs: [
            "Using ChatGPT is easy. Using it responsibly in a clinical education context is harder. That is why AI literacy now needs to be part of physiotherapy education.",
          ],
        },
      ]
    ),
    305: article(
      [
        "Generative AI can now produce assessment questions in seconds. For educators, that is attractive because writing good multiple-choice questions takes time.",
        "But assessment is not only about producing questions. It is about making defensible decisions about learning. A polished AI-generated item is not automatically a valid item.",
      ],
      [
        {
          heading: "The problem with polished questions",
          paragraphs: [
            "A sophisticated-looking question can still contain factual errors, ambiguous wording, cueing, weak distractors or a mismatch with the learning outcome. It may reward recognition rather than reasoning.",
          ],
        },
        {
          heading: "What recent evidence suggests",
          paragraphs: [
            "A 2026 systematic review in the Postgraduate Medical Journal found that large language models can be useful drafting tools for medical multiple-choice questions, but current evidence does not support unsupervised use in summative assessment.",
          ],
        },
        {
          heading: "What expert review still needs to check",
          paragraphs: [
            "Educators still need to review alignment, clinical accuracy, distractor quality, cueing, difficulty, fairness and consequences for learners.",
          ],
        },
        {
          heading: "A better workflow",
          paragraphs: [
            "The educator should begin with the blueprint and learning outcome. AI can generate draft options, but the educator reviews, edits, checks and decides.",
          ],
        },
      ]
    ),
    304: article(
      [
        "When I moved to Hong Kong two years ago to join Saint Francis University as a Senior Lecturer in Physiotherapy, I hoped to make a meaningful contribution to student learning. Receiving a faculty-level Teaching Excellence Award after such a short period is an honour that I am deeply grateful for, and it has prompted me to reflect on the journey so far.",
        "The recognition also carries a story of timing. In 2025, I was nominated for the same award, but because I had not yet been at the university long enough, I did not meet the eligibility requirements. To be nominated again in 2026 and then to receive the award makes the moment especially meaningful.",
      ],
      [
        {
          heading: "Teaching as more than content delivery",
          paragraphs: [
            "For me, teaching has never been only about transmitting information. It is about creating learning experiences that build curiosity, confidence, critical thinking and professional growth. In physiotherapy education, every class is an opportunity to help students connect theory with clinical practice while developing the judgement they will need as future healthcare professionals.",
            "That means thinking carefully about how students participate, how they reason through uncertainty, and how they are challenged and supported at the same time.",
          ],
        },
        {
          heading: "Innovation with educational purpose",
          paragraphs: [
            "Over the past two years, I have been fortunate to work with supportive colleagues and highly motivated students. Together, we have explored virtual reality, artificial intelligence, interactive learning technologies and case-based clinical reasoning activities.",
            "I have never been interested in using technology simply because it is new. The more important question is whether it has a clear educational purpose and whether it genuinely improves the student learning experience.",
          ],
        },
        {
          heading: "Virtual reality, AI and scholarship",
          paragraphs: [
            "One particularly rewarding area has been the integration of immersive virtual reality into physiotherapy education. Through interdisciplinary collaboration, we developed learning activities that allow students to engage with complex clinical concepts in ways that are difficult to achieve through traditional teaching alone.",
            "Alongside teaching, I have also remained active in health professions education research. My work has focused on how technologies such as virtual reality and artificial intelligence can support learning, clinical reasoning, assessment and curriculum design. It has been energising to see scholarship and classroom practice inform one another so directly.",
          ],
        },
        {
          heading: "An individual award built on collective effort",
          paragraphs: [
            "Although the award carries an individual name, it reflects collective effort. I am sincerely grateful to colleagues who have collaborated on teaching innovations, students who have engaged so openly with new approaches to learning, and mentors who have encouraged my professional growth throughout this period.",
            "No meaningful teaching journey is built alone. Good teaching is strengthened by community, dialogue and the willingness to keep refining practice.",
          ],
        },
        {
          heading: "Looking ahead",
          paragraphs: [
            "Looking forward, I remain committed to improving my teaching, expanding evidence-informed educational practice, and contributing to the advancement of physiotherapy education in Hong Kong and beyond. Artificial intelligence, immersive learning, simulation and clinical reasoning education all continue to offer important possibilities.",
            "This award encourages me to keep returning to one question whenever I design a learning activity: how can we create experiences that genuinely help students become better healthcare professionals?",
            "To everyone who has been part of this journey over the past two years, thank you. I look forward to continuing to learn, teach, collaborate and innovate together.",
          ],
        },
      ]
    ),
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
          heading: "Initial setup",
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
            "A successful technical setup is only the beginning. Educators should plan how the activity supports a learning outcome, how students will receive instructions, and how they will reflect on the experience afterwards.",
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
          heading: "Setup experience",
          paragraphs: [
            "The first challenge was connectivity. I needed the correct Mini DisplayPort connection, and a suitable adapter was not readily available locally. Once the hardware was connected, I still had to install software, update drivers, prepare a safe physical area and configure the virtual environment.",
            "The process took approximately three and a half hours, including downloads. Tracking was sensitive to lighting, and several settings needed adjustment before the experience felt reliable.",
          ],
        },
        {
          heading: "Was it worthwhile?",
          paragraphs: [
            "Yes. Once configured, the system provided an impressive and engaging VR experience. However, the time and technical confidence required would be a significant barrier in a busy teaching environment.",
            "This experience helped me appreciate why standalone headsets became so influential. For educational deployment, ease of setup, repeatability and staff support can matter just as much as graphical performance.",
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
    312: article(
      [
        "在上一篇課程設計反思中，我提出不應先問人工智能可以放在哪裏，而應先思考畢業生必須展示甚麼能力、哪些思考必須由學生完成，以及評估如何呈現學習。",
        "這帶出另一個問題：如果教師要決定人工智能在課程和評估中的角色，他們需要具備多少人工智能素養？我的答案是：足以作出良好教學和專業判斷，但毋須成為程式設計員、數據科學家或資訊科技專家。",
      ],
      [
        { heading: "我們不能在不了解的情況下負責任地設計", paragraphs: ["學生已經使用生成式人工智能，而教師正被要求撰寫政策、重新設計評估、批准學習活動、審核人工智能生成材料，以及指導學生何謂可接受使用。", "這些決定需要教師理解系統可以做甚麼、可能在哪裏失誤、會支援還是繞過學習成果，以及學生仍須獨立展示甚麼。"] },
        { heading: "人工智能素養不等於技術專業", paragraphs: ["教師毋須建立機器學習模型、掌握進階編程或熟悉每一款人工智能產品。他們需要理解生成式人工智能如何產生回應、為何會捏造資訊、偏差如何進入輸出，以及流暢文字為何不代表準確。", "目標不是技術精通，而是有根據的判斷。"] },
        { heading: "教師真正需要的素養", points: ["<strong>基礎：</strong>能力、限制、幻覺、偏差與核實。", "<strong>教學：</strong>把人工智能使用連繫學習成果，保護學生必須完成的認知工作。", "<strong>評估：</strong>設計無人工智能、人工智能支援及人工智能批判評估。", "<strong>倫理與專業：</strong>私隱、保密、版權、公平、無障礙、透明度與問責。", "<strong>學科：</strong>辨認物理治療教育與實踐中的用途和風險。", "<strong>反思：</strong>持續試用獲批准工具、檢視證據並與同事共同學習。"] },
        { heading: "並非每位教師都需要同一水平", paragraphs: ["具人工智能意識的教師能解釋基本概念和風險；具人工智能應用能力的教師能設計活動、調整評估和審核生成資源；人工智能課程領導者則能協調課程、指導同事及參與院校策略。", "目標不是令每位教師都成為課程領導者，而是為所有人建立安全基線，並按角色發展更深入能力。"] },
        { heading: "大學必須先發展人才，再發展平台", paragraphs: ["院校有時很快購買工具，但教師發展仍屬自選活動，或被擠進已經繁忙的工作量。人工智能準備就緒的大學需要受保護的發展時間、獲批准平台、清晰政策、實例、評估支援和實踐社群。", "既然教師仍要為課程質素和專業標準負責，他們便需要真正機會發展相應素養。"] },
        { heading: "課程設計中缺少的一步", paragraphs: ["原有次序是：<strong>CILO → 所需人類能力 → 獲准的人工智能角色 → 學習活動 → 學生推理證據 → 評估與保證。</strong>", "現在我會加入：<strong>所需教師能力。</strong> 人工智能準備就緒的課程需要人工智能準備就緒的教師，但這並不等於成為電腦科學家，而是能為人工智能何時、為何及如何進入學習作出可辯護的決定。"] },
        { heading: "你的人工智能素養如何？", paragraphs: ["我建立了一個包含 15 條問題的簡短知識檢查，供學生、教師及其他健康專業學習者使用，內容涵蓋核實、私隱、偏差、專業責任與適當教育使用。", "<a class='primary-link' href='../../ai-literacy-check.html'>進行人工智能素養檢查</a>", "這是一項反思學習活動，不是經驗證的評估。結果只儲存在你的瀏覽器，並按參與者角色顯示本機平均分。"] },
      ]
    ),
    311: article(
      [
        "每當新科技進入教育，第一個問題往往是：我們可以在哪裏使用它？人工智能出現後，這個問題幾乎進入了所有教學、學習與評估討論。",
        "但我愈來愈認為，這不是最好的起點。課程不應從人工智能開始，而應從我們希望培養怎樣的畢業生、他們必須展示甚麼能力，以及必須為哪些決定負責開始。",
      ],
      [
        { heading: "以工具為先的陷阱", paragraphs: ["當我們從工具開始，課程設計容易變成尋找可加入人工智能的位置：在課堂加入活動、在作業加入提示設計，或要求學生批判人工智能生成的個案答案。", "這些活動可能有用，但若沒有直接連繫預期學習成果，就可能只有活動而沒有配合。更好的次序，是先界定能力、辨認必須由學生完成的思考、決定人工智能的角色，再指定能呈現學生推理的證據。"] },
        { heading: "人工智能素養不等於熟悉聊天機械人", paragraphs: ["學生可能已經使用 ChatGPT，但接觸不等於素養。人工智能素養包括判斷工具是否合適、核實輸出、識別偏差與私隱風險、交代工具如何參與，並為最終決定負責。", "這對物理治療尤其重要。看似合理的答案仍可能遺漏紅旗、忽視禁忌症、錯誤陳述證據，或沒有考慮眼前病人的需要。"] },
        { heading: "三種評估條件", paragraphs: ["人工智能準備就緒的課程可能需要三種有意識的安排：無人工智能評估，以確認獨立基礎能力；人工智能支援評估，以模擬真實專業工作並呈現學生推理；人工智能批判評估，以測試學生能否找出遺漏、挑戰不安全建議及核實證據。", "這些安排應在課程層面設計，而不是由每一份作業自行即興決定，否則學生可能遇到重複、缺口與互相矛盾的要求。"] },
        { heading: "需要的是課程路徑，不是一節人工智能講課", paragraphs: ["課程初期可處理限制、幻覺、來源核實、披露與私隱；其後逐步進入證據評估、病人溝通與數據解讀；臨床階段則評估人工智能支援推理及遺漏的安全資訊；畢業前再處理管治、公平與專業問責。", "這種進階很重要，因為負責任使用依賴學科知識。學生在具備足夠物理治療知識前，未必能可靠辨認人工智能的錯誤。"] },
        { heading: "教育工作者變得更重要", paragraphs: ["人工智能可以產生個案變化、建議評分準則措辭及建立討論例子，但不能自行判斷甚麼具教育價值、臨床上安全，或適合特定學生群體。", "因此，教育工作者的角色並沒有消失，反而要求更高：我們是課程架構師、學習經驗設計者、專業判斷促進者及質素核實者。"] },
        { heading: "證據仍然要求克制", paragraphs: ["目前有令人鼓舞的訊號，但熱情仍走在證據前面。2026 年一項本科健康專業教育隨機研究綜述發現，部分人工智能介入可能改善滿意度、信心與理論知識，但結果並不一致，證據確定性偏低，而且沒有研究評估工作場所行為或健康結果。", "這不代表必須等待所有問題解決，而是要把人工智能活動視為需要理據、配合、評估和修正的課程介入。"] },
        { heading: "我希望探索的框架", paragraphs: ["我正在考慮的次序是：<strong>CILO → 所需人類能力 → 獲准的人工智能角色 → 學習活動 → 學生推理證據 → 評估與保證。</strong>", "這讓人工智能進入課程，卻不把它放在中心。中心仍然是畢業生能理解、實踐、解釋及負責的事情。真正重要的問題可能不再是「哪裏可以使用人工智能？」，而是「哪些能力必須清楚保持為人類能力，而人工智能如何支援而不暗中取代它？」"] },
        { heading: "本文參考資料", points: ["UNESCO 學生及教師人工智能能力框架（2024）。", "Lai 等（2026），本科健康專業教育人工智能成效系統綜述與統合分析，<a href='https://doi.org/10.2196/88933'>doi:10.2196/88933</a>。", "相鄰醫學教育課程與能力框架：<a href='https://doi.org/10.1186/s12909-026-08620-1'>doi:10.1186/s12909-026-08620-1</a> 及 <a href='https://doi.org/10.2196/91116'>doi:10.2196/91116</a>。"] },
      ]
    ),
    310: article(
      [
        "在今年香港中學文憑試放榜前，我有機會代表聖方濟各大學及健康科學院，出席一場面向學生與家長的資訊講座，分享他們升學下一步可能面對的選擇。",
        "從外面看，這類活動似乎只是招生宣傳、課程介紹，或是講解入學要求的場合。但當你站在一群正在等待放榜的學生面前，你會更清楚地感受到，這些時刻同樣關乎不確定性、身份轉變，以及家庭如何想像未來。",
      ],
      [
        {
          heading: "不同制度，相似心情",
          paragraphs: [
            "我在南非成長，仍記得當年等待 National Senior Certificate 放榜時的氣氛。對很多學生而言，那份成績單決定了能否入讀大學、獲得獎學金，以及未來職業道路的方向。香港中學文憑試的制度與南非並不相同，但那份等待的情緒卻十分熟悉。",
            "學生與家長往往花上多年努力，最後集中在幾場關鍵考試上。放榜前，對話已經圍繞預計分數、可能的取錄結果、後備方案，以及接下來該怎樣走。制度細節可以不同，但那種等待的感受其實很普遍。",
          ],
        },
        {
          heading: "香港升學環境的特點",
          paragraphs: [
            "香港其中一個特別明顯的地方，是升學競爭的集中程度，尤其是在物理治療、醫學、護理及藥學等熱門專業。當高等教育體系相對緊密，而學額又有限時，每一個學位都同時帶有很大的象徵與實際意義。",
            "另一方面，香港也有不少獎學金、優異成績獎、人才獎學金及其他資助機會。這使升學環境同時充滿競爭、盼望與實際機會，三者往往非常接近。",
          ],
        },
        {
          heading: "談物理治療，不只是談收生",
          paragraphs: [
            "在講座中，我介紹了聖方濟各大學物理治療（榮譽）理學士課程，包括課程結構、學生在學習上的預期，以及畢業後可能發展的專業方向。",
            "對我而言，這類對話最重要的不只是解釋入學要求，而是幫助準學生理解這個專業真正要求的是甚麼。物理治療不是只靠達到分數門檻便足夠，它同樣需要好奇心、同理心、溝通能力、韌性，以及持續幫助他人改善生活功能的承擔。",
          ],
        },
        {
          heading: "成績很重要，但不只如此",
          paragraphs: [
            "我希望學生能從這些活動中帶走一個信息：考試成績固然重要，但它不能完整定義一個人的未來。成績可以打開某些門，也可能讓某些選項變得更困難，但它無法完全決定一個人最終會成為怎樣的學習者或專業人士。",
            "大學教育應該培養的不只是知識內容，更包括批判思考、負責任的溝通、在不確定中作出判斷，以及在專業生涯中持續學習的能力。這些能力在今天尤其重要，因為人工智能等新技術正快速改變高等教育與醫療實踐。",
          ],
        },
        {
          heading: "為何這類活動仍然重要",
          paragraphs: [
            "與準學生及家長交流，再次提醒我，外展活動不只是行政程序。它們也是把一個專業說得更具人味、更有意義的機會。同時，這些場合也讓教育工作者聽見學生真正擔心甚麼、期待甚麼，以及他們如何理解成功。",
            "無論這些學生最終是否入讀聖方濟各大學，我都希望他們能以好奇、穩定和信心走向下一階段。放榜很重要，但它更像是一個故事的開始，而不是結局。",
          ],
        },
      ]
    ),
    309: article(
      [
        "我最近草擬了一份允許學生使用人工智能的評估。原意是讓學生以運動科學原則分析運動相關動作和受傷機制，並使用人工智能產生初步解釋、改善提示、比較輸出和批判回應。",
        "表面上，這似乎正是高等教育現在需要的評估。學生已經在使用人工智能，假裝他們沒有使用並不誠實；全面禁止也會錯過教導批判和負責任使用的機會。但這份評估最後沒有實行，原因是人工智能並不是這份評估原本要評估的內容。",
      ],
      [
        {
          heading: "這份評估本來是關於運動科學",
          paragraphs: [
            "這份評估的學科目的，是評估學生能否運用解剖學和生物力學原則分析正常人體動作、解釋動作變化，並把運動科學應用於功能活動。",
            "學生需要處理動作階段、關節、平面、軸、肌肉活動、地面反作用力、重心、支撐面、組織負荷和受傷機制。當人工智能加入後，問題變得更複雜：我們是在評估運動科學，還是在評估人工智能素養？",
          ],
        },
        {
          heading: "建構性配合的問題",
          paragraphs: [
            "評估設計迫使我們問：我們實際上在量度甚麼？如果預期學習成果是運動科學推理，評估就應該讓這種推理清楚呈現。",
            "如果分數包括提示質素、人工智能批判或不同輸出的比較，人工智能素養就成為被評估的能力之一。這並非錯誤，但必須是有意識的決定。在這份草稿中，人工智能既太重要而不能忽略，又未被正式納入學習成果，令設計變得不穩定。",
          ],
        },
        {
          heading: "評估需要改變，但不能偶然改變",
          paragraphs: [
            "人工智能令傳統評估假設變得脆弱。學生可以很快產生流暢的解釋、摘要和草稿。漂亮的最終作品已不足以說明學生真正理解了甚麼。",
            "但評估不應只是把人工智能加進原有任務。更深層的改變，是清楚說明評估重視甚麼：學科推理、專業判斷、證據使用、溝通、人工智能素養、反思，還是問責。",
          ],
        },
        {
          heading: "公平性的問題",
          paragraphs: [
            "學生入學時的人工智能經驗並不相同。如果評估在未正式教導前就獎勵人工智能能力，它可能同時評估了學生過往的接觸機會。",
            "在健康專業教育中，使用聊天機械人並不等於能安全、批判和專業地使用人工智能。看起來更好的作品，不一定代表更好的臨床或生物力學推理。",
          ],
        },
        {
          heading: "一個較好的版本",
          paragraphs: [
            "較好的版本可能把人工智能批判保留為形成性活動。學生可以比較較弱和較好的人工智能輸出，指出缺失的運動科學推理，並把人工智能作為教學工具，而不是被評分的能力。",
            "另一個版本，是正式把人工智能素養加入課程，清楚教導、訂立標準，並透明地評估。也可以評估學生的推理歷程：他們核實、拒絕和修訂了甚麼，但評分重點仍放在學科推理，而不是提示技巧。",
          ],
        },
        {
          heading: "沒有實行它讓我學到甚麼",
          paragraphs: [
            "沒有實行這份評估並不是失敗。它令設計問題更清楚。更好的問題不是是否應該容許人工智能，而是評估想讓甚麼能力變得可見。",
            "如果目標是運動科學推理，人工智能不能遮蓋這種推理。如果目標是人工智能素養，就必須把它作為獨立能力來教導和評估。人工智能時代的評估必須因配合而改變，而不是因焦慮而改變。",
          ],
        },
        {
          heading: "尚未解決的問題",
          paragraphs: [
            "我們常說不能評估學生的人工智能使用，因為我們還不知道他們用得好不好。但教職員呢？",
            "如果教職員要設計允許使用人工智能的評估、界定可接受使用，並判斷何謂負責任使用，那麼教職員的人工智能素養同樣重要。這大概會是下一篇文章。",
          ],
        },
      ]
    ),
    308: article(
      [
        "教育長期重視認知表現：知識、推理、記憶、解難和成績。這些仍然重要，但在人工智能時代，單靠認知能力並不足夠。",
        "當學生可以使用工具解釋概念、草擬文章、摘要閱讀和產生答案時，判斷、適應和正直等人的能力會變得更重要。",
      ],
      [
        {
          heading: "IQ 重要，但不足夠",
          paragraphs: [
            "學生仍需要理解和推理，否則無法判斷人工智能輸出是否有用或安全。但聰明的學生仍可能不懂適應、協作、跨文化溝通或倫理行動。",
          ],
        },
        {
          heading: "學生可能需要的能力",
          paragraphs: [
            "IQ 關乎認知能力，EQ 關乎情緒和關係，AQ 關乎適應不確定性，CQ 關乎文化意識，社交能力關乎溝通協作，意義能力關乎目的和價值，DQ 關乎正直、謙遜和尊重。",
          ],
        },
        {
          heading: "教學啟示",
          paragraphs: [
            "大學不應只評估最終作品，也應設計能練習適應力、溝通、文化意識、倫理推理和問責的學習經驗。",
          ],
        },
      ]
    ),
    307: article(
      [
        "學生使用人工智能作臨床推理時，最直覺的做法是問答案。但這可能不是最好的起點。",
        "更好的角色可能是在學生先作出初步判斷後，由人工智能提出追問。這樣，人工智能不是取代推理，而是令推理更清晰。",
      ],
      [
        {
          heading: "答案可能來得太早",
          paragraphs: [
            "臨床推理需要努力。學生要留意資料、權衡可能性、處理不確定和解釋計劃。如果人工智能太早給出完整答案，學生可能跳過最重要的學習部分。",
          ],
        },
        {
          heading: "人工智能作為追問伙伴",
          paragraphs: [
            "學生提出初步假設後，人工智能可以問：哪個發現支持你的假設？哪個發現不吻合？仍有甚麼替代解釋？甚麼紅旗會改變你的計劃？",
          ],
        },
        {
          heading: "原則",
          paragraphs: [
            "不要一開始就向人工智能索取答案。先要求學生展示推理，再用人工智能測試推理。",
          ],
        },
      ]
    ),
    306: article(
      [
        "許多學生已經用過 ChatGPT，但這不代表他們具備人工智能素養。",
        "在物理治療教育中，學生可能覺得 ChatGPT 有用和容易使用，但仍未懂得核實證據、保護病人資料、辨認不安全建議，或判斷何時人工智能會削弱學習。",
      ],
      [
        {
          heading: "接觸不等於能力",
          paragraphs: [
            "學生可以用人工智能摘要筆記、解釋概念、草擬反思或產生溫習題。這些用途可以有幫助，但仍可能停留在基本層次。",
          ],
        },
        {
          heading: "學生需要學甚麼",
          paragraphs: [
            "人工智能素養應包括核實能力、臨床審慎、私隱意識、學習意識、披露和問責。",
          ],
        },
        {
          heading: "教學啟示",
          paragraphs: [
            "課程不應假設學生會自行學懂這些能力。教師可以要求學生比較人工智能病人解釋與證據、辨認不安全假設，並記錄接受、拒絕和核實了甚麼。",
          ],
        },
      ]
    ),
    305: article(
      [
        "生成式人工智能現在可以在數秒內產生評估題目。這對教師很有吸引力，因為撰寫高質素選擇題需要時間。",
        "但評估不只是產生題目，而是對學習作出可辯護的判斷。流暢的人工智能題目不等於有效的題目。",
      ],
      [
        {
          heading: "漂亮題目的問題",
          paragraphs: [
            "看似成熟的題目仍可能有事實錯誤、含糊語句、提示線索、弱干擾項，或與學習成果不吻合。",
          ],
        },
        {
          heading: "近期證據的提示",
          paragraphs: [
            "2026 年一篇系統綜述指出，大型語言模型可作醫學選擇題草擬工具，但現有證據不支持在總結性評估中無監督使用。",
          ],
        },
        {
          heading: "專家仍要審核",
          paragraphs: [
            "教師仍需要檢查學習成果配對、臨床準確性、干擾項質素、提示線索、難度、公平性和對學生的後果。",
          ],
        },
      ]
    ),
    304: article(
      [
        "兩年前，我來到香港，加入聖方濟各大學擔任物理治療高級講師。當時我希望能在學生學習上作出有意義的貢獻。短短兩年內獲頒院級教學卓越獎，對我而言是一份十分珍貴的肯定，也讓我有機會回顧這段旅程。",
        "這份肯定亦有其時間上的意義。2025 年，我曾獲提名同一獎項，但由於到校年資未達要求，當時未符合參選資格。到 2026 年再次獲提名，並最終獲獎，使這一刻更顯特別。",
      ],
      [
        {
          heading: "教學不只是傳遞內容",
          paragraphs: [
            "對我而言，教學從來不只是把知識講授出去，而是設計能培養好奇心、自信、批判思維與專業成長的學習經驗。在物理治療教育中，每一堂課都是幫助學生連結理論與臨床實踐、發展專業判斷的重要機會。",
            "這也意味著，我需要不斷思考學生如何參與、如何在不確定中推理，以及如何在挑戰與支持之間取得平衡。",
          ],
        },
        {
          heading: "以教育目的為本的創新",
          paragraphs: [
            "過去兩年，我有幸與支持我的同事及積極投入的學生一起工作。我們共同探索虛擬實境、人工智能、互動學習科技，以及以臨床案例為基礎的推理活動。",
            "我一直不認為科技應該因為「新」而被使用。更重要的問題是：它是否具有清晰的教育目的？它是否真正改善了學生的學習經驗？",
          ],
        },
        {
          heading: "虛擬實境、人工智能與教育研究",
          paragraphs: [
            "其中一項令我特別感到充實的工作，是把沉浸式虛擬實境整合到物理治療教育之中。透過跨學科合作，我們設計出一些學習活動，讓學生能以傳統教學較難達到的方式，理解複雜的臨床概念。",
            "除了教學之外，我亦持續參與健康專業教育研究。我目前的研究聚焦於虛擬實境與人工智能如何支援學習、臨床推理、評估及課程設計。能夠看見研究與課堂實踐彼此互相啟發，是一件十分令人振奮的事。",
          ],
        },
        {
          heading: "個人獎項背後的集體努力",
          paragraphs: [
            "雖然獎項以個人名義頒發，但它其實反映了很多人的共同努力。我衷心感謝與我一起推動教學創新的同事、願意投入新學習方式的學生，以及一路鼓勵我專業成長的前輩和導師。",
            "有意義的教學歷程從來不是單打獨鬥建立起來的。好的教學來自社群、對話，以及持續修正實踐的意願。",
          ],
        },
        {
          heading: "展望未來",
          paragraphs: [
            "展望未來，我仍會繼續致力提升教學、拓展以證據為本的教育實踐，並為香港及更廣泛地區的物理治療教育發展作出貢獻。人工智能、沉浸式學習、模擬教學與臨床推理教育，仍然有很多值得探索的可能。",
            "這項獎項提醒我，在設計每一個學習活動時，都應持續追問同一個問題：我們如何創造真正幫助學生成為更好醫護專業人員的學習經驗？",
            "對過去兩年一路同行的每一位，我都由衷感謝。期待未來繼續一起學習、教學、合作與創新。",
          ],
        },
      ]
    ),
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
            "目標不是回到更嚴苛的教育，而是更好地區分應被移除的障礙，以及能幫助學生成為有能力的專業人員的掙扎。",
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
            "目標並不是保護昨天的作業不受明天的科技影響，而是設計出讓科技強化，而不是悄悄取代，物理治療師培養過程的學習。",
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
    312: article(
      [
        "在上一篇课程设计反思中，我提出不应先问人工智能可以放在哪里，而应先思考毕业生必须展示什么能力、哪些思考必须由学生完成，以及评估如何呈现学习。",
        "这带出另一个问题：如果教师要决定人工智能在课程和评估中的角色，他们需要具备多少人工智能素养？我的答案是：足以作出良好教学和专业判断，但无须成为程序员、数据科学家或信息技术专家。",
      ],
      [
        { heading: "我们不能在不了解的情况下负责任地设计", paragraphs: ["学生已经使用生成式人工智能，而教师正被要求撰写政策、重新设计评估、批准学习活动、审核人工智能生成材料，以及指导学生何谓可接受使用。", "这些决定需要教师理解系统可以做什么、可能在哪里失误、会支持还是绕过学习成果，以及学生仍须独立展示什么。"] },
        { heading: "人工智能素养不等于技术专业", paragraphs: ["教师无须建立机器学习模型、掌握高级编程或熟悉每一款人工智能产品。他们需要理解生成式人工智能如何产生回应、为何会捏造信息、偏差如何进入输出，以及流畅文字为何不代表准确。", "目标不是技术精通，而是有根据的判断。"] },
        { heading: "教师真正需要的素养", points: ["<strong>基础：</strong>能力、限制、幻觉、偏差与核实。", "<strong>教学：</strong>把人工智能使用联系学习成果，保护学生必须完成的认知工作。", "<strong>评估：</strong>设计无人工智能、人工智能支持及人工智能批判评估。", "<strong>伦理与专业：</strong>隐私、保密、版权、公平、无障碍、透明度与问责。", "<strong>学科：</strong>辨认物理治疗教育与实践中的用途和风险。", "<strong>反思：</strong>持续试用获批准工具、检视证据并与同事共同学习。"] },
        { heading: "并非每位教师都需要同一水平", paragraphs: ["具人工智能意识的教师能解释基本概念和风险；具人工智能应用能力的教师能设计活动、调整评估和审核生成资源；人工智能课程领导者则能协调课程、指导同事及参与院校策略。", "目标不是让每位教师都成为课程领导者，而是为所有人建立安全基线，并按角色发展更深入能力。"] },
        { heading: "大学必须先发展人才，再发展平台", paragraphs: ["院校有时很快购买工具，但教师发展仍属自选活动，或被挤进已经繁忙的工作量。人工智能准备就绪的大学需要受保护的发展时间、获批准平台、清晰政策、实例、评估支持和实践社群。", "既然教师仍要为课程质量和专业标准负责，他们便需要真正机会发展相应素养。"] },
        { heading: "课程设计中缺少的一步", paragraphs: ["原有次序是：<strong>CILO → 所需人类能力 → 获准的人工智能角色 → 学习活动 → 学生推理证据 → 评估与保证。</strong>", "现在我会加入：<strong>所需教师能力。</strong> 人工智能准备就绪的课程需要人工智能准备就绪的教师，但这并不等于成为计算机科学家，而是能为人工智能何时、为何及如何进入学习作出可辩护的决定。"] },
        { heading: "你的人工智能素养如何？", paragraphs: ["我建立了一个包含 15 道问题的简短知识检查，供学生、教师及其他健康专业学习者使用，内容涵盖核实、隐私、偏差、专业责任与适当教育使用。", "<a class='primary-link' href='../../ai-literacy-check.html'>进行人工智能素养检查</a>", "这是一项反思学习活动，不是经过验证的评估。结果只存储在你的浏览器，并按参与者角色显示本地平均分。"] },
      ]
    ),
    311: article(
      [
        "每当新技术进入教育，第一个问题往往是：我们可以在哪里使用它？人工智能出现后，这个问题几乎进入了所有教学、学习与评估讨论。",
        "但我越来越认为，这不是最好的起点。课程不应从人工智能开始，而应从我们希望培养怎样的毕业生、他们必须展示什么能力，以及必须为哪些决定负责开始。",
      ],
      [
        { heading: "以工具为先的陷阱", paragraphs: ["当我们从工具开始，课程设计容易变成寻找可加入人工智能的位置：在课堂加入活动、在作业加入提示设计，或要求学生批判人工智能生成的个案答案。", "这些活动可能有用，但若没有直接联系预期学习成果，就可能只有活动而没有配合。更好的次序，是先界定能力、辨认必须由学生完成的思考、决定人工智能的角色，再指定能呈现学生推理的证据。"] },
        { heading: "人工智能素养不等于熟悉聊天机器人", paragraphs: ["学生可能已经使用 ChatGPT，但接触不等于素养。人工智能素养包括判断工具是否合适、核实输出、识别偏差与隐私风险、交代工具如何参与，并为最终决定负责。", "这对物理治疗尤其重要。看似合理的答案仍可能遗漏红旗、忽视禁忌症、错误陈述证据，或没有考虑眼前患者的需要。"] },
        { heading: "三种评估条件", paragraphs: ["人工智能准备就绪的课程可能需要三种有意识的安排：无人工智能评估，以确认独立基础能力；人工智能支持评估，以模拟真实专业工作并呈现学生推理；人工智能批判评估，以测试学生能否找出遗漏、挑战不安全建议及核实证据。", "这些安排应在课程层面设计，而不是由每一份作业自行即兴决定，否则学生可能遇到重复、缺口与互相矛盾的要求。"] },
        { heading: "需要的是课程路径，不是一节人工智能讲课", paragraphs: ["课程初期可处理限制、幻觉、来源核实、披露与隐私；其后逐步进入证据评估、患者沟通与数据解读；临床阶段则评估人工智能支持推理及遗漏的安全信息；毕业前再处理治理、公平与专业问责。", "这种进阶很重要，因为负责任使用依赖学科知识。学生在具备足够物理治疗知识前，未必能可靠辨认人工智能的错误。"] },
        { heading: "教育工作者变得更重要", paragraphs: ["人工智能可以产生个案变化、建议评分准则措辞及建立讨论例子，但不能自行判断什么具教育价值、临床上安全，或适合特定学生群体。", "因此，教育工作者的角色并没有消失，反而要求更高：我们是课程架构师、学习经验设计者、专业判断促进者及质量核实者。"] },
        { heading: "证据仍然要求克制", paragraphs: ["目前有令人鼓舞的信号，但热情仍走在证据前面。2026 年一项本科健康专业教育随机研究综述发现，部分人工智能干预可能改善满意度、信心与理论知识，但结果并不一致，证据确定性偏低，而且没有研究评估工作场所行为或健康结果。", "这不代表必须等待所有问题解决，而是要把人工智能活动视为需要理据、配合、评估和修正的课程干预。"] },
        { heading: "我希望探索的框架", paragraphs: ["我正在考虑的次序是：<strong>CILO → 所需人类能力 → 获准的人工智能角色 → 学习活动 → 学生推理证据 → 评估与保证。</strong>", "这让人工智能进入课程，却不把它放在中心。中心仍然是毕业生能理解、实践、解释及负责的事情。真正重要的问题可能不再是“哪里可以使用人工智能？”，而是“哪些能力必须清楚保持为人类能力，而人工智能如何支持而不暗中取代它？”"] },
        { heading: "本文参考资料", points: ["UNESCO 学生及教师人工智能能力框架（2024）。", "Lai 等（2026），本科健康专业教育人工智能成效系统综述与荟萃分析，<a href='https://doi.org/10.2196/88933'>doi:10.2196/88933</a>。", "相邻医学教育课程与能力框架：<a href='https://doi.org/10.1186/s12909-026-08620-1'>doi:10.1186/s12909-026-08620-1</a> 及 <a href='https://doi.org/10.2196/91116'>doi:10.2196/91116</a>。"] },
      ]
    ),
    310: article(
      [
        "在今年香港中学文凭试放榜前，我有机会代表圣方济各大学及健康科学院，出席一场面向学生与家长的资讯讲座，分享他们升学下一步可能面对的选择。",
        "从外面看，这类活动似乎只是招生宣传、课程介绍，或是讲解入学要求的场合。但当你站在一群正在等待放榜的学生面前，你会更清楚地感受到，这些时刻同样关乎不确定性、身份转变，以及家庭如何想象未来。",
      ],
      [
        {
          heading: "不同制度，相似心情",
          paragraphs: [
            "我在南非成长，仍记得当年等待 National Senior Certificate 放榜时的气氛。对很多学生而言，那份成绩单决定了能否入读大学、获得奖学金，以及未来职业道路的方向。香港中学文凭试的制度与南非并不相同，但那份等待的情绪却十分熟悉。",
            "学生与家长往往花上多年努力，最后集中在几场关键考试上。放榜前，对话已经围绕预计分数、可能的录取结果、后备方案，以及接下来该怎样走。制度细节可以不同，但那种等待的感受其实很普遍。",
          ],
        },
        {
          heading: "香港升学环境的特点",
          paragraphs: [
            "香港其中一个特别明显的地方，是升学竞争的集中程度，尤其是在物理治疗、医学、护理及药学等热门专业。当高等教育体系相对紧密，而学额又有限时，每一个学位都同时带有很大的象征与实际意义。",
            "另一方面，香港也有不少奖学金、优异成绩奖、人才奖学金及其他资助机会。这使升学环境同时充满竞争、盼望与实际机会，三者往往非常接近。",
          ],
        },
        {
          heading: "谈物理治疗，不只是谈收生",
          paragraphs: [
            "在讲座中，我介绍了圣方济各大学物理治疗（荣誉）理学士课程，包括课程结构、学生在学习上的预期，以及毕业后可能发展的专业方向。",
            "对我而言，这类对话最重要的不只是解释入学要求，而是帮助准学生理解这个专业真正要求的是什么。物理治疗不是只靠达到分数门槛便足够，它同样需要好奇心、同理心、沟通能力、韧性，以及持续帮助他人改善生活功能的承担。",
          ],
        },
        {
          heading: "成绩很重要，但不只如此",
          paragraphs: [
            "我希望学生能从这些活动中带走一个信息：考试成绩固然重要，但它不能完整定义一个人的未来。成绩可以打开某些门，也可能让某些选项变得更困难，但它无法完全决定一个人最终会成为怎样的学习者或专业人士。",
            "大学教育应该培养的不只是知识内容，更包括批判思考、负责任的沟通、在不确定中作出判断，以及在专业生涯中持续学习的能力。这些能力在今天尤其重要，因为人工智能等新技术正快速改变高等教育与医疗实践。",
          ],
        },
        {
          heading: "为何这类活动仍然重要",
          paragraphs: [
            "与准学生及家长交流，再次提醒我，外展活动不只是行政程序。它们也是把一个专业说得更具人味、更有意义的机会。同时，这些场合也让教育工作者听见学生真正担心什么、期待什么，以及他们如何理解成功。",
            "无论这些学生最终是否入读圣方济各大学，我都希望他们能以好奇、稳定和信心走向下一阶段。放榜很重要，但它更像是一个故事的开始，而不是结局。",
          ],
        },
      ]
    ),
    309: article(
      [
        "我最近草拟了一份允许学生使用人工智能的评估。原意是让学生以运动科学原则分析运动相关动作和受伤机制，并使用人工智能产生初步解释、改善提示、比较输出和批判回应。",
        "表面上，这似乎正是高等教育现在需要的评估。学生已经在使用人工智能，假装他们没有使用并不诚实；全面禁止也会错过教导批判和负责任使用的机会。但这份评估最后没有实行，原因是人工智能并不是这份评估原本要评估的内容。",
      ],
      [
        {
          heading: "这份评估本来是关于运动科学",
          paragraphs: [
            "这份评估的学科目的，是评估学生能否运用解剖学和生物力学原则分析正常人体动作、解释动作变化，并把运动科学应用于功能活动。",
            "学生需要处理动作阶段、关节、平面、轴、肌肉活动、地面反作用力、重心、支撑面、组织负荷和受伤机制。当人工智能加入后，问题变得更复杂：我们是在评估运动科学，还是在评估人工智能素养？",
          ],
        },
        {
          heading: "建构性配合的问题",
          paragraphs: [
            "评估设计迫使我们问：我们实际上在量度什么？如果预期学习成果是运动科学推理，评估就应该让这种推理清楚呈现。",
            "如果分数包括提示质量、人工智能批判或不同输出的比较，人工智能素养就成为被评估的能力之一。这并非错误，但必须是有意识的决定。在这份草稿中，人工智能既太重要而不能忽略，又未被正式纳入学习成果，令设计变得不稳定。",
          ],
        },
        {
          heading: "评估需要改变，但不能偶然改变",
          paragraphs: [
            "人工智能令传统评估假设变得脆弱。学生可以很快产生流畅的解释、摘要和草稿。漂亮的最终作品已不足以说明学生真正理解了什么。",
            "但评估不应只是把人工智能加进原有任务。更深层的改变，是清楚说明评估重视什么：学科推理、专业判断、证据使用、沟通、人工智能素养、反思，还是问责。",
          ],
        },
        {
          heading: "公平性的问题",
          paragraphs: [
            "学生入学时的人工智能经验并不相同。如果评估在未正式教导前就奖励人工智能能力，它可能同时评估了学生过往的接触机会。",
            "在健康专业教育中，使用聊天机器人并不等于能安全、批判和专业地使用人工智能。看起来更好的作品，不一定代表更好的临床或生物力学推理。",
          ],
        },
        {
          heading: "一个较好的版本",
          paragraphs: [
            "较好的版本可能把人工智能批判保留为形成性活动。学生可以比较较弱和较好的人工智能输出，指出缺失的运动科学推理，并把人工智能作为教学工具，而不是被评分的能力。",
            "另一个版本，是正式把人工智能素养加入课程，清楚教导、订立标准，并透明地评估。也可以评估学生的推理历程：他们核实、拒绝和修订了什么，但评分重点仍放在学科推理，而不是提示技巧。",
          ],
        },
        {
          heading: "没有实行它让我学到什么",
          paragraphs: [
            "没有实行这份评估并不是失败。它令设计问题更清楚。更好的问题不是是否应该容许人工智能，而是评估想让什么能力变得可见。",
            "如果目标是运动科学推理，人工智能不能遮盖这种推理。如果目标是人工智能素养，就必须把它作为独立能力来教导和评估。人工智能时代的评估必须因配合而改变，而不是因焦虑而改变。",
          ],
        },
        {
          heading: "尚未解决的问题",
          paragraphs: [
            "我们常说不能评估学生的人工智能使用，因为我们还不知道他们用得好不好。但教职员呢？",
            "如果教职员要设计允许使用人工智能的评估、界定可接受使用，并判断何谓负责任使用，那么教职员的人工智能素养同样重要。这大概会是下一篇文章。",
          ],
        },
      ]
    ),
    308: article(
      [
        "教育长期重视认知表现：知识、推理、记忆、解难和成绩。这些仍然重要，但在人工智能时代，单靠认知能力并不足够。",
        "当学生可以使用工具解释概念、草拟文章、摘要阅读和产生答案时，判断、适应和正直等人的能力会变得更重要。",
      ],
      [
        {
          heading: "IQ 重要，但不足够",
          paragraphs: [
            "学生仍需要理解和推理，否则无法判断人工智能输出是否有用或安全。但聪明的学生仍可能不懂适应、协作、跨文化沟通或伦理行动。",
          ],
        },
        {
          heading: "学生可能需要的能力",
          paragraphs: [
            "IQ 关乎认知能力，EQ 关乎情绪和关系，AQ 关乎适应不确定性，CQ 关乎文化意识，社交能力关乎沟通协作，意义能力关乎目的和价值，DQ 关乎正直、谦逊和尊重。",
          ],
        },
        {
          heading: "教学启示",
          paragraphs: [
            "大学不应只评估最终作品，也应设计能练习适应力、沟通、文化意识、伦理推理和问责的学习经验。",
          ],
        },
      ]
    ),
    307: article(
      [
        "学生使用人工智能作临床推理时，最直觉的做法是问答案。但这可能不是最好的起点。",
        "更好的角色可能是在学生先作出初步判断后，由人工智能提出追问。这样，人工智能不是取代推理，而是令推理更清晰。",
      ],
      [
        {
          heading: "答案可能来得太早",
          paragraphs: [
            "临床推理需要努力。学生要留意资料、权衡可能性、处理不确定和解释计划。如果人工智能太早给出完整答案，学生可能跳过最重要的学习部分。",
          ],
        },
        {
          heading: "人工智能作为追问伙伴",
          paragraphs: [
            "学生提出初步假设后，人工智能可以问：哪个发现支持你的假设？哪个发现不吻合？仍有什么替代解释？什么红旗会改变你的计划？",
          ],
        },
        {
          heading: "原则",
          paragraphs: [
            "不要一开始就向人工智能索取答案。先要求学生展示推理，再用人工智能测试推理。",
          ],
        },
      ]
    ),
    306: article(
      [
        "许多学生已经用过 ChatGPT，但这不代表他们具备人工智能素养。",
        "在物理治疗教育中，学生可能觉得 ChatGPT 有用和容易使用，但仍未懂得核实证据、保护病人资料、辨认不安全建议，或判断何时人工智能会削弱学习。",
      ],
      [
        {
          heading: "接触不等于能力",
          paragraphs: [
            "学生可以用人工智能摘要笔记、解释概念、草拟反思或产生复习题。这些用途可以有帮助，但仍可能停留在基本层次。",
          ],
        },
        {
          heading: "学生需要学什么",
          paragraphs: [
            "人工智能素养应包括核实能力、临床审慎、隐私意识、学习意识、披露和问责。",
          ],
        },
        {
          heading: "教学启示",
          paragraphs: [
            "课程不应假设学生会自行学懂这些能力。教师可以要求学生比较人工智能病人解释与证据、辨认不安全假设，并记录接受、拒绝和核实了什么。",
          ],
        },
      ]
    ),
    305: article(
      [
        "生成式人工智能现在可以在数秒内产生评估题目。这对教师很有吸引力，因为撰写高质量选择题需要时间。",
        "但评估不只是产生题目，而是对学习作出可辩护的判断。流畅的人工智能题目不等于有效的题目。",
      ],
      [
        {
          heading: "漂亮题目的问题",
          paragraphs: [
            "看似成熟的题目仍可能有事实错误、含糊语句、提示线索、弱干扰项，或与学习成果不吻合。",
          ],
        },
        {
          heading: "近期证据的提示",
          paragraphs: [
            "2026 年一篇系统综述指出，大型语言模型可作医学选择题草拟工具，但现有证据不支持在总结性评估中无监督使用。",
          ],
        },
        {
          heading: "专家仍要审核",
          paragraphs: [
            "教师仍需要检查学习成果配对、临床准确性、干扰项质量、提示线索、难度、公平性和对学生的后果。",
          ],
        },
      ]
    ),
    304: article(
      [
        "两年前，我来到香港，加入圣方济各大学担任物理治疗高级讲师。当时我希望能在学生学习上作出有意义的贡献。短短两年内获颁院级教学卓越奖，对我而言是一份非常珍贵的肯定，也让我有机会回顾这段旅程。",
        "这份肯定也有其时间上的意义。2025 年，我曾获提名同一奖项，但由于到校年资未达要求，当时未符合参选资格。到 2026 年再次获提名，并最终获奖，使这一刻更显特别。",
      ],
      [
        {
          heading: "教学不只是传递内容",
          paragraphs: [
            "对我而言，教学从来不只是把知识讲授出去，而是设计能培养好奇心、自信、批判思维与专业成长的学习经验。在物理治疗教育中，每一堂课都是帮助学生连接理论与临床实践、发展专业判断的重要机会。",
            "这也意味着，我需要不断思考学生如何参与、如何在不确定中推理，以及如何在挑战与支持之间取得平衡。",
          ],
        },
        {
          heading: "以教育目的为本的创新",
          paragraphs: [
            "过去两年，我有幸与支持我的同事及积极投入的学生一起工作。我们共同探索虚拟现实、人工智能、互动学习科技，以及以临床案例为基础的推理活动。",
            "我一直不认为科技应该因为“新”而被使用。更重要的问题是：它是否具有清晰的教育目的？它是否真正改善了学生的学习体验？",
          ],
        },
        {
          heading: "虚拟现实、人工智能与教育研究",
          paragraphs: [
            "其中一项令我特别感到充实的工作，是把沉浸式虚拟现实整合到物理治疗教育之中。通过跨学科合作，我们设计出一些学习活动，让学生能够以传统教学较难达到的方式，理解复杂的临床概念。",
            "除了教学之外，我也持续参与健康专业教育研究。我目前的研究聚焦于虚拟现实与人工智能如何支持学习、临床推理、评估及课程设计。能够看见研究与课堂实践彼此互相启发，是一件十分令人振奋的事。",
          ],
        },
        {
          heading: "个人奖项背后的集体努力",
          paragraphs: [
            "虽然奖项以个人名义颁发，但它其实反映了许多人的共同努力。我衷心感谢与我一起推动教学创新的同事、愿意投入新学习方式的学生，以及一路鼓励我专业成长的前辈和导师。",
            "有意义的教学历程从来不是单打独斗建立起来的。好的教学来自社群、对话，以及持续修正实践的意愿。",
          ],
        },
        {
          heading: "展望未来",
          paragraphs: [
            "展望未来，我仍会继续致力提升教学、拓展以证据为本的教育实践，并为香港及更广泛地区的物理治疗教育发展作出贡献。人工智能、沉浸式学习、模拟教学与临床推理教育，仍然有很多值得探索的可能。",
            "这项奖项提醒我，在设计每一个学习活动时，都应持续追问同一个问题：我们如何创造真正帮助学生成为更好医疗专业人员的学习体验？",
            "对过去两年一路同行的每一位，我都由衷感谢。期待未来继续一起学习、教学、合作与创新。",
          ],
        },
      ]
    ),
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
            "目标不是回到更严苛的教育，而是更好地区分应被移除的障碍，以及能帮助学生成为有能力的专业人员的挣扎。",
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
            "目标并不是保护昨天的作业不受明天的科技影响，而是设计出让科技强化，而不是悄悄取代，物理治疗师培养过程的学习。",
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
