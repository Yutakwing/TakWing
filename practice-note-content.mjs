const article = (intro, sections = []) => [
  ...intro.map((text) => `<p>${text}</p>`),
  ...sections.flatMap(({ heading, paragraphs = [], points = [], html = [] }) => [
    `<h2>${heading}</h2>`,
    ...paragraphs.map((text) => `<p>${text}</p>`),
    ...(points.length ? [`<ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>`] : []),
    ...html,
  ]),
].join("\n");

export const practiceNoteArticles = {
  en: {
    325: article(
      [
        "A content-mastery quiz can look deceptively simple: students answer a short set of questions, receive a score and move on. Yet the value of the activity is not confined to the number at the end. Used thoughtfully, these quizzes can make parts of the learning process visible to both students and educators.",
        "Presenting my work on end-of-lecture content-mastery quizzes prompted me to reflect on what these data can genuinely tell us, what they cannot establish, and why the conversation should extend beyond whether an answer was correct.",
      ],
      [
        {
          heading: "A quiz can provide a pause for retrieval",
          paragraphs: [
            "At the end of a lecture, students have encountered a large amount of new information. A short quiz asks them to retrieve and use some of that material rather than simply recognise that it looked familiar on a slide. It also creates a deliberate pause in which students can compare their perceived understanding with their actual response.",
            "That pause matters. A student who answers confidently but incorrectly may need to revisit a misconception. A student who is correct but uncertain may need reassurance and another opportunity to explain the idea. The same score can therefore conceal very different learning needs.",
          ],
        },
        {
          heading: "The pattern matters more than the isolated mark",
          paragraphs: [
            "For an educator, one response tells very little. Patterns across questions, concepts and teaching sessions are more informative. If many students choose the same distractor, the issue may lie in a common misconception, an ambiguous question or an explanation that needs to be redesigned.",
            "This makes the quiz a source of feedback for teaching as well as for learning. It can help identify where to slow down, which idea needs another representation and where students may require practice applying knowledge rather than recalling a definition.",
          ],
        },
        {
          heading: "What the score cannot prove",
          paragraphs: [
            "Quiz performance should be interpreted cautiously. A correlation between quiz results and later assessment performance does not, by itself, show that the quizzes caused the improvement. Prior knowledge, attendance, motivation, study habits and many other factors may contribute.",
            "A selected-response item also cannot demonstrate every form of competence. It does not show how a student communicates with a patient, adapts a physical examination, handles uncertainty or justifies a clinical decision. These quizzes are one window into learning, not a complete view of readiness for practice.",
          ],
        },
        {
          heading: "Beyond the right answer",
          paragraphs: [
            "The most useful follow-up is often a request for explanation: Why is this answer appropriate? Why are the alternatives less suitable? What would change the decision? These questions reveal the reasoning that a mark alone leaves hidden.",
            "This is why content-mastery quizzes work best as part of a wider assessment conversation. The score can locate a point of attention; explanation, application and feedback help us understand what the student has actually learnt.",
          ],
          points: [
            "Use the results to identify concepts that need clarification, not to label students.",
            "Discuss common distractors and the reasoning behind them.",
            "Ask students to explain selected answers in their own words.",
            "Connect quiz items to cases, practical tasks and later assessment.",
            "Review the quality of the questions as carefully as the students' scores.",
          ],
        },
        {
          heading: "Making learning visible without reducing it to data",
          paragraphs: [
            "Content-mastery quizzes can support interactivity, self-assessment and quality assurance when their purpose is clear. Their strength is not that they convert learning into a neat number. It is that they provide timely evidence around which students and educators can ask better questions.",
            "The task is to use that evidence without confusing measurement with mastery. A score is a starting point for interpretation, not the end of the educational conversation.",
          ],
          html: [
            '<p><a href="beyond-the-right-answer-why-we-should-ask-students-to-explain.html">Related reflection: Beyond the Right Answer: Why We Should Ask Students to Explain</a></p>',
          ],
        },
      ]
    ),
    324: article(
      [
        "A well-equipped simulation room is impressive. Beds, monitors, clinical equipment and a realistic environment can create an immediate sense of possibility. Yet the room itself does not produce learning. It is an educational resource whose value depends on what happens before, during and after the scenario.",
        "Standing in an empty simulation room reminded me that realism is only the beginning. The more important work is designing an experience that helps learners notice, decide, communicate, act and reflect.",
      ],
      [
        {
          heading: "Start with the capability, not the room",
          paragraphs: [
            "Simulation design should begin with the capability students need to develop. Is the priority clinical reasoning, communication, teamwork, escalation, technical skill or a combination of these? The answer shapes the scenario, the information provided, the roles assigned and the evidence of learning that educators should observe.",
            "Without this alignment, a realistic room can become a stage for activity rather than learning. Students may remain busy without understanding which decisions mattered or how their actions relate to professional practice.",
          ],
        },
        {
          heading: "Preparation shapes participation",
          paragraphs: [
            "Learners need enough orientation to engage with the educational problem rather than spend the entire session decoding the environment. This includes knowing the purpose, boundaries, available equipment, expected roles and how the fiction of the scenario should be treated.",
            "Psychological safety is equally important. Simulation may expose uncertainty in front of peers. Students need to know that the aim is learning, that mistakes will be examined respectfully and that speaking up is part of safe professional practice.",
          ],
        },
        {
          heading: "The educator is designing attention",
          paragraphs: [
            "A scenario cannot reproduce every detail of clinical care. Educators therefore make choices about what learners should notice and what information will become available. Patient cues, changes in observations, prompts from another professional and periods of silence can all direct attention.",
            "The challenge is to provide enough information for meaningful reasoning without scripting the correct response. Good facilitation protects the learning intention while allowing students to reveal how they interpret uncertainty.",
          ],
        },
        {
          heading: "Debriefing turns activity into learning",
          paragraphs: [
            "The scenario creates experience; the debrief helps learners interpret it. A useful debrief moves beyond listing what went well and what went wrong. It examines what participants noticed, how they formed a judgement, why communication succeeded or failed, and what they would do differently in another context.",
            "Observation roles also need a purpose. A student who is not directly managing the case can track communication, safety checks or decision points, then contribute evidence to the discussion. Participation should be designed, not assumed.",
          ],
        },
        {
          heading: "Before the first learner enters",
          points: [
            "Define the intended learning outcomes and observable evidence.",
            "Decide what learners need to know before the scenario begins.",
            "Clarify roles for participants and observers.",
            "Plan cues that support reasoning without giving away the answer.",
            "Create a psychologically safe briefing and debriefing structure.",
            "Check that equipment, staffing and time support the intended activity.",
            "Provide a route from reflection to another opportunity for practice.",
          ],
        },
        {
          heading: "The room becomes valuable through design",
          paragraphs: [
            "Simulation facilities can support powerful learning, but their educational value is not measured by how closely the room resembles a hospital ward. It is measured by whether students are helped to think, act, communicate and reflect in ways that prepare them for practice.",
            "The room is the beginning. Learning emerges from the alignment of purpose, participation, facilitation, feedback and another chance to improve.",
          ],
        },
      ]
    ),
    323: article(
      [
        "Watching someone put on a virtual reality headset immediately attracts attention. The learner moves, points and reacts to a world that others can only partly see. A demonstration can be engaging and memorable, but engagement alone does not make it a learning experience.",
        "The educational question begins after the headset is switched on: what should the learner notice, practise, explain or decide, and how will the experience help them do it better?",
      ],
      [
        {
          heading: "A demonstration shows a technology",
          paragraphs: [
            "A demonstration is useful for introducing the controls, showing the visual environment and reducing uncertainty about an unfamiliar device. It can help staff and students imagine possibilities that are difficult to communicate through a written description.",
            "However, simply entering a virtual environment may leave learners impressed without knowing what they were meant to learn. Novelty can dominate attention, particularly during a first encounter, while the intended concept remains peripheral.",
          ],
        },
        {
          heading: "A learning experience gives attention a purpose",
          paragraphs: [
            "Purposeful VR design begins with a specific educational difficulty. Perhaps students struggle to visualise a three-dimensional relationship, recognise a changing clinical situation or rehearse a sequence that is difficult to access safely in practice. VR is useful only when its affordances address that difficulty more appropriately than a simpler alternative.",
            "The task should tell learners what to attend to and what they will need to do with the experience. A prompt to compare structures, predict a change, justify an action or explain an error turns exploration into directed learning.",
          ],
        },
        {
          heading: "The headset is not the whole class",
          paragraphs: [
            "VR sessions often involve more learners than headsets. Those who are waiting should not become a passive audience. They can observe a mirrored display, record decision points, compare strategies, prepare feedback or take responsibility for a related clinical question.",
            "This also means that facilitation matters. An educator may need to manage the physical space, monitor comfort, help with controls and keep the educational conversation moving. Technical fluency supports the activity, but it should not displace the learning goal.",
          ],
        },
        {
          heading: "Reflection connects immersion to understanding",
          paragraphs: [
            "Immersion creates an experience, but learners still need to interpret it. A short debrief can ask what they noticed, which assumptions changed, where they felt uncertain and how the virtual task connects to a patient, procedure or decision outside the headset.",
            "Assessment does not need to be elaborate. It may involve explaining a spatial relationship, demonstrating a technique afterwards, comparing two options or applying the experience to a case. What matters is that the evidence matches the intended learning outcome.",
          ],
        },
        {
          heading: "From demonstration to learning design",
          points: [
            "Name the learning problem before selecting the virtual activity.",
            "Brief learners on the purpose, controls, safety and expected participation.",
            "Give observers an active role when headsets are shared.",
            "Use prompts that direct attention without removing productive uncertainty.",
            "Debrief the experience and connect it to clinical or professional practice.",
            "Collect evidence that reflects the intended learning, not only enjoyment or presence.",
          ],
        },
        {
          heading: "The question after the demonstration",
          paragraphs: [
            "A successful demonstration may persuade people that VR is interesting. A successful learning design should help students perceive, reason or perform differently because of the experience.",
            "The distinction is simple but important: the headset creates access to a virtual environment; educators and learners create the learning experience around it.",
          ],
        },
      ]
    ),
  },
  "zh-hant": {
    325: article(
      [
        "內容掌握小測看似簡單：學生回答數條問題、取得分數，然後繼續學習。然而，這項活動的價值並不只在最後的數字。若運用得宜，小測可以讓學生與教師看見部分原本隱藏的學習過程。",
        "在分享課堂結束時使用內容掌握小測的工作後，我再次反思這些數據真正能告訴我們甚麼、不能證明甚麼，以及為何討論不應停留在答案是否正確。",
      ],
      [
        { heading: "小測提供一次提取知識的停頓", paragraphs: ["一節課結束時，學生已接收大量新資訊。短小測要求他們提取及運用部分內容，而不只是覺得投影片上的資料似曾相識。它亦讓學生把自己以為已理解的程度，與實際作答表現作比較。", "同一個分數可能隱藏不同需要。自信但答錯的學生可能需要處理錯誤概念；答對但不肯定的學生，則可能需要確認及再作解釋。"] },
        { heading: "整體模式比單一分數更重要", paragraphs: ["對教師而言，一次作答能提供的資訊很有限。跨題目、概念及課堂出現的模式更有意義。若很多學生選擇同一個干擾選項，原因可能是共同誤解、題目含糊，或教學表達需要重新設計。", "因此，小測既是學生的回饋，也是教師的回饋。它可提示哪些概念需要放慢、換一種方式呈現，或由記憶定義轉向應用練習。"] },
        { heading: "分數不能證明的事情", paragraphs: ["小測表現必須審慎解讀。小測成績與日後評估表現相關，並不等於小測造成了進步。先備知識、出席、動機及溫習習慣等因素也可能參與其中。", "選擇題亦不能呈現所有能力。它不能證明學生如何與病人溝通、調整身體檢查、處理不確定性或為臨床決定辯護。小測只是觀察學習的一扇窗，而不是臨床準備度的全貌。"] },
        { heading: "超越正確答案", paragraphs: ["最有用的跟進往往是要求解釋：為何這個答案合適？其他選項為何較差？哪些新資訊會改變決定？這些問題能呈現分數本身看不見的推理。", "因此，內容掌握小測最適合作為更廣泛評估對話的一部分。分數可以指出需要關注之處；解釋、應用及回饋則協助我們了解學生實際學到甚麼。"], points: ["用結果找出需要澄清的概念，而不是為學生貼標籤。", "討論常見干擾選項及背後推理。", "請學生以自己的說話解釋部分答案。", "把題目連結至個案、實作任務及後續評估。", "像檢視學生成績一樣，審視題目本身的質素。"] },
        { heading: "使學習可見，但不把學習簡化成數據", paragraphs: ["當目的清晰時，內容掌握小測可以支援互動、自我評估及質素保證。它的強項並非把學習化成一個整齊數字，而是提供及時證據，讓學生與教師提出更好的問題。", "我們要運用證據，同時避免把量度誤當成掌握。分數是詮釋的起點，而不是教育對話的終點。"], html: ['<p><a href="beyond-the-right-answer-why-we-should-ask-students-to-explain.html">相關反思：超越正確答案：為何我們應請學生解釋思考過程</a></p>'] },
      ]
    ),
    324: article(
      ["設備完善的模擬教學室令人印象深刻。病床、監察儀器、臨床設備及逼真環境，能立即帶來許多教學可能。然而，房間本身不會產生學習；它只是教育資源，價值取決於情境開始前、進行中及結束後的設計。", "站在空置的模擬教學室內，我再次想到：逼真度只是起點。更重要的是設計一個協助學生觀察、決定、溝通、行動及反思的經驗。"],
      [
        { heading: "從能力開始，而不是從房間開始", paragraphs: ["模擬設計應先界定學生需要發展的能力：臨床推理、溝通、團隊合作、求助升級、技術操作，還是其中組合？答案會決定情境、提供的資訊、角色及需要觀察的學習證據。", "若欠缺配合，逼真的房間可能只成為活動舞台。學生可以非常忙碌，卻不明白哪些決定重要，以及行動如何連結專業實務。"] },
        { heading: "準備影響參與", paragraphs: ["學生需要足夠導引，才能集中處理教育問題，而非整節課只顧理解環境。這包括目的、界線、可用設備、預期角色，以及如何看待情境中的模擬設定。", "心理安全同樣重要。模擬可能在同儕面前暴露不確定性。學生需要知道目的是學習，錯誤會被尊重地檢視，而主動提出疑問是安全專業實務的一部分。"] },
        { heading: "教師其實在設計注意力", paragraphs: ["情境不可能複製臨床照護的每個細節，因此教師需要選擇學生應注意甚麼及何時提供資訊。病人提示、觀察數據轉變、其他專業人員的說話及沉默，都可引導注意。", "挑戰是在不透露正確答案的情況下，提供足夠資訊進行有意義的推理。良好引導既保護學習目的，也讓學生呈現自己如何理解不確定性。"] },
        { heading: "解說把活動轉化為學習", paragraphs: ["情境創造經驗；解說協助學生詮釋經驗。有效解說不只列出做得好與不好的地方，而會探討參與者注意到甚麼、如何形成判斷、溝通為何成功或失效，以及下次會如何調整。", "觀察者角色亦需要明確目的。沒有直接處理個案的學生，可以記錄溝通、安全檢查或決策點，再以證據參與討論。參與需要被設計，而不是被假設。"] },
        { heading: "第一位學生進場前", points: ["界定預期學習成果及可觀察證據。", "決定學生在情境開始前需要知道甚麼。", "釐清參與者與觀察者的角色。", "設計支援推理而不直接給答案的提示。", "建立具心理安全感的簡介及解說結構。", "確認設備、人手及時間能支援目標活動。", "讓反思連結至另一次練習機會。"] },
        { heading: "設計使房間產生價值", paragraphs: ["模擬設施能支援有力的學習，但教育價值並非取決於房間有多像醫院，而在於學生是否獲協助，以更接近實務的方式思考、行動、溝通及反思。", "房間只是開始。學習來自目的、參與、引導、回饋及再次改進機會之間的配合。"] },
      ]
    ),
    323: article(
      ["看見有人戴上虛擬實境頭戴裝置，往往會立即吸引注意。學習者移動、指向並回應一個旁人只能局部看見的世界。示範可以令人投入及留下印象，但投入本身並不等於學習經驗。", "教育問題在裝置啟動後才真正開始：學生應注意、練習、解釋或決定甚麼？這段經驗如何協助他們做得更好？"],
      [
        { heading: "示範展示的是技術", paragraphs: ["示範有助介紹控制方式、展示視覺環境，以及減少初次使用陌生設備的不安。它也讓師生看到文字描述難以傳達的可能性。", "然而，單純進入虛擬環境，可能只讓學生感到新奇，卻不知道應學甚麼。初次接觸時，新奇感尤其容易佔據注意力，使原定概念變成次要。"] },
        { heading: "學習經驗為注意力賦予目的", paragraphs: ["有目的的 VR 設計由具體教育困難開始。學生是否難以理解三維關係、辨認變化中的臨床情境，或安全地練習不易接觸的程序？只有當 VR 的特性比簡單替代方案更合適地處理問題，它才有價值。", "任務應告訴學生需要注意甚麼，以及如何運用這段經驗。比較結構、預測變化、為行動辯護或解釋錯誤，都能把自由探索轉化為導向清晰的學習。"] },
        { heading: "頭戴裝置不是整節課", paragraphs: ["VR 課堂往往是學生多、裝置少。等待的學生不應只是被動觀眾。他們可以觀看同步畫面、記錄決策點、比較策略、準備回饋，或處理相關臨床問題。", "這亦顯示引導的重要。教師可能同時要管理空間、監察舒適度、協助控制裝置及維持教育對話。技術熟練能支援活動，但不應取代學習目標。"] },
        { heading: "反思把沉浸連結至理解", paragraphs: ["沉浸感創造經驗，但學生仍需要詮釋。簡短解說可詢問他們注意到甚麼、哪些假設改變、哪裏感到不確定，以及虛擬任務如何連結至頭戴裝置以外的病人、程序或決定。", "評估不必複雜，可以是解釋空間關係、其後示範技巧、比較兩種選擇，或把經驗應用於個案。重點是證據要配合預期學習成果。"] },
        { heading: "由示範走向學習設計", points: ["選擇虛擬活動前，先界定學習問題。", "向學生簡介目的、控制、安全及參與方式。", "共享裝置時，為觀察者安排主動角色。", "以提示引導注意，同時保留有意義的不確定性。", "解說經驗，並連結至臨床或專業實務。", "收集反映預期學習的證據，而不只量度喜愛程度或臨場感。"] },
        { heading: "示範之後的問題", paragraphs: ["成功示範可以令人相信 VR 很有趣；成功的學習設計，則應讓學生因這段經驗而有不同的觀察、推理或表現。", "分別簡單但重要：頭戴裝置提供進入虛擬環境的途徑；教育工作者與學生在它周圍共同創造學習經驗。"] },
      ]
    ),
  },
};

practiceNoteArticles["zh-hans"] = Object.fromEntries(
  Object.entries(practiceNoteArticles["zh-hant"]).map(([id, html]) => [
    id,
    html
      .replaceAll("實境", "现实")
      .replaceAll("學習", "学习")
      .replaceAll("學生", "学生")
      .replaceAll("教師", "教师")
      .replaceAll("課堂", "课堂")
      .replaceAll("評估", "评估")
      .replaceAll("內容", "内容")
      .replaceAll("選擇", "选择")
      .replaceAll("資訊", "信息")
      .replaceAll("錯誤", "错误")
      .replaceAll("質素", "质量")
      .replaceAll("數據", "数据")
      .replaceAll("連結", "连接")
      .replaceAll("專業", "专业")
      .replaceAll("實務", "实践")
      .replaceAll("參與", "参与")
      .replaceAll("導引", "引导")
      .replaceAll("裝置", "设备")
      .replaceAll("環境", "环境")
      .replaceAll("開始", "开始")
      .replaceAll("設計", "设计")
      .replaceAll("經驗", "经验")
      .replaceAll("觀察", "观察")
      .replaceAll("溝通", "沟通")
      .replaceAll("反思", "反思")
      .replaceAll("臨床", "临床")
      .replaceAll("證據", "证据")
      .replaceAll("問題", "问题")
      .replaceAll("簡單", "简单")
      .replaceAll("應", "应")
      .replaceAll("為", "为")
      .replaceAll("與", "与")
      .replaceAll("從", "从")
      .replaceAll("這", "这")
      .replaceAll("個", "个")
      .replaceAll("點", "点")
      .replaceAll("體", "体")
      .replaceAll("見", "见")
      .replaceAll("讓", "让")
      .replaceAll("進", "进")
      .replaceAll("還", "还")
      .replaceAll("將", "将")
      .replaceAll("幫", "帮")
      .replaceAll("現", "现")
      .replaceAll("過", "过")
      .replaceAll("並", "并")
      .replaceAll("僅", "仅")
      .replaceAll("別", "别")
      .replaceAll("關", "关")
      .replaceAll("時", "时")
      .replaceAll("後", "后")
      .replaceAll("會", "会")
      .replaceAll("種", "种")
      .replaceAll("於", "于")
      .replaceAll("據", "据")
      .replaceAll("響", "响")
      .replaceAll("構", "构")
      .replaceAll("協", "协")
      .replaceAll("務", "务")
      .replaceAll("機", "机")
      .replaceAll("劃", "划")
      .replaceAll("問", "问")
      .replaceAll("產", "产")
      .replaceAll("學", "学")
      .replaceAll("據", "据")
      .replaceAll("較", "较")
      .replaceAll("說", "说")
      .replaceAll("處", "处")
      .replaceAll("麼", "么")
      .replaceAll("裏", "里")
      .replaceAll("體", "体")
      .replaceAll("習", "习")
      .replaceAll("實", "实")
      .replaceAll("數", "数")
      .replaceAll("變", "变")
      .replaceAll("創", "创")
      .replaceAll("價", "价")
      .replaceAll("決", "决")
      .replaceAll("釋", "释")
      .replaceAll("資", "资")
      .replaceAll("覺", "觉")
      .replaceAll("設", "设")
      .replaceAll("計", "计")
      .replaceAll("錯", "错")
      .replaceAll("誤", "误")
      .replaceAll("異", "异")
      .replaceAll("認", "认")
      .replaceAll("態", "态")
      .replaceAll("業", "业")
      .replaceAll("課", "课")
      .replaceAll("師", "师")
      .replaceAll("續", "续")
      .replaceAll("訊", "讯")
      .replaceAll("證", "证")
      .replaceAll("終", "终")
      .replaceAll("驗", "验")
      .replaceAll("參", "参")
      .replaceAll("獲", "获")
      .replaceAll("動", "动")
      .replaceAll("導", "导")
      .replaceAll("場", "场")
      .replaceAll("擬", "拟")
      .replaceAll("滿", "满")
      .replaceAll("醫", "医")
      .replaceAll("顯", "显")
      .replaceAll("選", "选")
      .replaceAll("項", "项")
      .replaceAll("觀", "观")
      .replaceAll("錄", "录")
      .replaceAll("轉", "转")
      .replaceAll("專", "专")
      .replaceAll("連", "连")
      .replaceAll("護", "护")
      .replaceAll("壓", "压")
      .replaceAll("慮", "虑")
      .replaceAll("單", "单")
      .replaceAll("強", "强")
      .replaceAll("當", "当")
      .replaceAll("興", "兴")
      .replaceAll("難", "难")
      .replaceAll("複", "复")
      .replaceAll("術", "术")
      .replaceAll("維", "维")
      .replaceAll("際", "际")
      .replaceAll("語", "语")
      .replaceAll("詞", "词")
      .replaceAll("愛", "爱")
      .replaceAll("間", "间")
      .replaceAll("聽", "听")
      .replaceAll("屬", "属")
      .replaceAll("誤", "误"),
  ]),
);

// Character pairs reviewed against OpenCC's Hong Kong Traditional to Simplified conversion.
const t2sPairs = "並并佔占來来係系個个們们備备傳传價价儀仪儕侪內内兩两別别則则創创動动務务協协卻却參参員员問问啟启單单圍围團团場场夠够學学實实審审專专對对導导師师帶带廣广強强後后徑径從从愛爱慣惯憶忆應应戰战換换擇择據据擬拟擾扰數数斷断於于時时會会條条業业構构標标樣样機机檢检決决沒没況况減减測测準准溝沟溫温為为獲获現现環环產产畫画當当發发監监眾众確确種种節节範范簡简籤签純纯級级細细紹绍終终組组結结給给經经維维線线練练績绩繼继續续義义習习臨临與与處处虛虚術术裏里裝装製制複复見见視视覺觉觀观觸触計计訊讯討讨記记設设許许訴诉評评詢询詮诠話话認认誤误說说課课調调請请論论證证識识護护讀读變变讓让貼贴資资賦赋質质較较轉转辯辩這这連连進进運运過过達达適适選选還还醫医釋释釐厘錄录錯错開开間间關关隊队際际隱隐雜杂難难響响項项須须預预頓顿頭头題题顧顾顯显饋馈驗验體体麼么點点齊齐";
const t2sMap = new Map(Array.from({ length: t2sPairs.length / 2 }, (_, index) => [t2sPairs[index * 2], t2sPairs[index * 2 + 1]]));
const toSimplifiedChinese = (html) => [...html].map((character) => t2sMap.get(character) || character).join("");

practiceNoteArticles["zh-hans"] = Object.fromEntries(
  Object.entries(practiceNoteArticles["zh-hant"]).map(([id, html]) => [id, toSimplifiedChinese(html)]),
);
