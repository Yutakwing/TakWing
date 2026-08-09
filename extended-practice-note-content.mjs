const article = (intro, sections = []) => [
  ...intro.map((text) => `<p>${text}</p>`),
  ...sections.flatMap(({ heading, paragraphs = [], points = [] }) => [
    `<h2>${heading}</h2>`,
    ...paragraphs.map((text) => `<p>${text}</p>`),
    ...(points.length ? [`<ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>`] : []),
  ]),
].join("\n");

export const extendedPracticeNoteArticles = {
  en: {
    328: article(
      [
        "Academic conferences can be energising. For a few days, conversations move quickly, familiar assumptions are questioned and projects that usually live in separate institutions are placed beside one another. The challenge begins when the programme closes and ordinary work resumes.",
        "Attending the World Physiotherapy Congress 2025 in Tokyo prompted me to ask a practical question: if a conference does not change anything I do afterwards, what exactly have I brought home?",
      ],
      [
        {
          heading: "A conference is more than information",
          paragraphs: [
            "No one can absorb every presentation, poster and conversation. Trying to collect everything usually produces an impressive folder and very little change. I find it more useful to look for questions that unsettle my current thinking, approaches that clarify a problem, and conversations that reveal how another context has addressed it.",
            "The value is therefore not simply access to information. Most information can be found later. The distinctive value lies in comparison, dialogue and the chance to test an idea with people who understand the problem differently.",
          ],
        },
        {
          heading: "From notes to commitments",
          paragraphs: [
            "Conference notes often mix useful evidence with passing inspiration. Before treating every interesting idea as a new project, I need to ask where it fits. Does it address a problem my students or colleagues actually experience? What would need to change in the curriculum, assessment or learning environment? What evidence would show that the change helped?",
            "A useful post-conference habit is to convert selected notes into small commitments. One idea may become a paper to read carefully. Another may become a question for a colleague, a revision to a teaching activity or a pilot that is deliberately kept small enough to evaluate.",
          ],
        },
        {
          heading: "Conversation is part of scholarly work",
          paragraphs: [
            "Some of the most valuable conference moments do not happen at the lectern. A short conversation can expose a hidden assumption, identify a collaborator or show that a local challenge is shared elsewhere. These encounters are not separate from research; they help shape which questions are worth pursuing and how a study may be understood beyond its original setting.",
            "The same applies when presenting my own work. Questions from an audience test whether the educational problem, method and implications are clear. A presentation is not merely dissemination of a finished product. It is another stage of inquiry.",
          ],
        },
        {
          heading: "What should change on Monday?",
          points: [
            "Choose one question that deserves further reading rather than saving every slide.",
            "Identify one teaching or research assumption that now needs to be reconsidered.",
            "Contact one person whose work connects meaningfully with an existing problem.",
            "Translate one promising idea into a small, observable next step.",
            "Decide what not to pursue so that novelty does not become an expanding workload.",
          ],
        },
        {
          heading: "Bringing the conference home",
          paragraphs: [
            "A conference can broaden a professional network and renew enthusiasm, but its deeper value appears after the event. It becomes visible when a question is sharper, a lesson is redesigned, a collaboration continues or a research decision becomes more defensible.",
            "The photograph marks that I was there. The more important evidence is what changes when I return.",
          ],
        },
      ]
    ),
    327: article(
      [
        "A guest lecturer can bring a subject to life in a way that a prepared slide alone cannot. In a Movement Science session on sport analysis and baseball throwing, the value was not simply that another person delivered content. It was the opportunity to connect disciplinary knowledge with a particular practice, perspective and way of seeing movement.",
        "Yet inviting an expert is not, by itself, a teaching strategy. The session becomes educational when it is designed as part of the curriculum rather than treated as an interesting interruption to it.",
      ],
      [
        {
          heading: "Expertise becomes useful through connection",
          paragraphs: [
            "Guest lecturers may notice details that students and educators overlook because their knowledge has developed through a different professional route. They can show how concepts are used, where textbook simplifications become inadequate and which questions matter in authentic practice.",
            "For students, this can make a familiar topic newly visible. Throwing is not only a sequence of joint movements. It can be examined through timing, force transfer, coordination, technique, performance and injury risk. The guest perspective helps connect these elements without pretending that one session can cover the entire field.",
          ],
        },
        {
          heading: "The host lecturer still has a design role",
          paragraphs: [
            "A guest session should not outsource responsibility for learning. The host lecturer needs to clarify the intended outcomes, brief the guest on what students already know and explain how the contribution connects with the rest of the module.",
            "Students also benefit from preparation. A short case, observation task or question before the session gives them something to look for. Without that structure, an engaging talk may remain memorable but disconnected from later learning.",
          ],
        },
        {
          heading: "Make the encounter active",
          paragraphs: [
            "The richest guest sessions allow students to do more than listen. They might analyse a movement, compare two performances, predict how a change in technique affects another part of the kinetic chain, or explain what evidence they would need before making a recommendation.",
            "The guest can then respond to student reasoning rather than only deliver prepared material. This creates an exchange between expertise and emerging understanding, which is difficult to reproduce through a recorded lecture alone.",
          ],
        },
        {
          heading: "Designing a guest session into the curriculum",
          points: [
            "Define the learning need that the guest contribution should address.",
            "Share the students' prior learning and the language already used in the module.",
            "Give students a focused observation, analysis or questioning task.",
            "Protect time for dialogue rather than filling the session with presentation slides.",
            "Debrief afterwards and connect the ideas to assessment and future practice.",
            "Ask what students can now explain or analyse that they could not do before.",
          ],
        },
        {
          heading: "More than a special event",
          paragraphs: [
            "A guest lecturer adds most value when the contribution changes how students interpret the subject, not merely who is standing at the front of the room. The outside perspective can extend the curriculum, but integration turns that perspective into learning.",
            "The slide introduces the topic. The educational work lies in the questions, examples, practice and follow-up built around it.",
          ],
        },
      ]
    ),
    326: article(
      [
        "Group work is often described as an active-learning strategy, but placing students around a table does not automatically produce meaningful collaboration. Some groups divide the task efficiently without discussing the underlying ideas. Others talk at length while one person quietly carries the reasoning.",
        "When I move around a classroom during a group activity, I am not only checking whether students are busy. I am looking for signs of how they understand the problem, where their reasoning diverges and which voices have not yet entered the conversation.",
      ],
      [
        {
          heading: "The process contains evidence",
          paragraphs: [
            "A final group answer can conceal the route taken to reach it. Listening to the discussion reveals which concepts students connect, what evidence they prioritise and where a confident statement rests on a fragile assumption. These moments provide formative information before a formal assessment is submitted.",
            "The artefacts on the table also matter. Notes, diagrams, search choices, discarded options and revisions can show how a group is organising the problem. Digital devices may support this process, but the number of open screens is not evidence that collaborative learning has occurred.",
          ],
        },
        {
          heading: "Participation needs to be designed",
          paragraphs: [
            "Students bring different levels of confidence, language fluency and prior knowledge. An open instruction to discuss may therefore reproduce the same participation pattern each time. A small amount of structure can create fairer opportunities to contribute.",
            "Roles such as initial reasoner, evidence checker, alternative proposer and summariser can help, provided they are rotated and remain connected to the learning outcome. A brief individual commitment before discussion also makes it harder for one answer to replace everyone's thinking.",
          ],
        },
        {
          heading: "Questions are more useful than rescue",
          paragraphs: [
            "When a group is stuck, the quickest response is to explain the solution. That may restore momentum, but it can also remove the reasoning students need to practise. A more useful intervention is often a question: What information are you using? Which assumption would change your answer? How would you explain this to another group?",
            "The aim is not to leave students confused. It is to provide enough support for progress while keeping intellectual responsibility with the learners.",
          ],
        },
        {
          heading: "What I look for while circulating",
          points: [
            "Whether students can state the problem before proposing a solution.",
            "Which evidence is being used, ignored or misunderstood.",
            "Whether disagreement leads to explanation or simply to a vote.",
            "Whose reasoning is shaping the answer and who remains silent.",
            "Whether digital tools are supporting comparison and explanation or replacing them.",
            "Which misconception is common enough to address with the whole class.",
          ],
        },
        {
          heading: "Before assessment makes it official",
          paragraphs: [
            "Group work gives educators an early view of learning while ideas are still forming. It offers a chance to respond before a misconception appears in an examination or a practical assessment, when feedback arrives too late to shape the current task.",
            "The photograph does not show a finished answer. That is precisely its value: it captures learning as negotiation, revision and explanation rather than only as a final product.",
          ],
        },
      ]
    ),
  },
  "zh-hant": {
    328: article(
      [
        "學術會議可以令人重新充滿動力。在數天之內，對話快速展開，熟悉的假設受到挑戰，平日分散於不同院校的研究也被放在一起比較。真正的挑戰，是議程結束、日常工作重新開始之後。",
        "參加 2025 年在東京舉行的世界物理治療大會，令我思考一個實際問題：如果會議沒有改變我其後的任何做法，我究竟帶了甚麼回家？",
      ],
      [
        { heading: "會議不只是資訊", paragraphs: ["沒有人能吸收每一場報告、每一張海報及每一次對話。試圖收集所有內容，通常只會帶來一個內容豐富的資料夾，卻很少帶來改變。我更重視那些動搖現有想法的問題、能釐清困難的方法，以及展示另一種情境如何處理同一問題的對話。", "因此，會議的價值不只是取得資訊。大部分資料日後也可以找到。它的獨特價值在於比較、對話，以及與以不同方式理解問題的人檢驗想法。"] },
        { heading: "把筆記轉化成承諾", paragraphs: ["會議筆記往往混合有用證據與短暫靈感。在把每個有趣想法變成新項目前，我需要先問它應放在哪裏：它有否回應學生或同事真正面對的問題？課程、評估或學習環境需要作出甚麼改變？哪些證據能顯示改變有幫助？", "一個實用習慣，是把部分筆記轉化成小而清晰的承諾。一個想法可能成為需要仔細閱讀的論文；另一個可能成為向同事提出的問題、一次教學活動修訂，或一項小得足以評估的先導嘗試。"] },
        { heading: "對話也是學術工作", paragraphs: ["一些最有價值的會議時刻並不發生在講台上。短暫對話可以揭示隱藏假設、找出合作伙伴，或顯示本地困難也存在於其他地方。這些交流並非研究以外的附加活動，而會影響哪些問題值得探索，以及研究如何在原有情境以外被理解。", "分享自己的工作亦一樣。聽眾的提問會檢驗教育問題、研究方法及啟示是否清晰。匯報並不只是傳播完成品，而是探究過程的另一階段。"] },
        { heading: "星期一應該有甚麼不同？", points: ["選擇一個值得進一步閱讀的問題，而不是保存所有投影片。", "找出一項需要重新思考的教學或研究假設。", "聯絡一位工作與現有問題真正相關的人。", "把一個有潛力的想法轉化成細小而可觀察的下一步。", "決定哪些事情不應追求，避免新奇感不斷擴大工作量。"] },
        { heading: "把會議帶回日常工作", paragraphs: ["會議可以擴闊專業網絡及重燃熱情，但更深層的價值在活動後才出現。當問題變得更準確、課堂被重新設計、合作得以延續，或研究決定更能被辯護時，影響才真正可見。", "照片證明我曾經在場；更重要的證據，是我回來後有甚麼改變。"] },
      ]
    ),
    327: article(
      [
        "客席講者可以用一張預先準備的投影片無法做到的方式，使課題變得生動。在一節以運動分析及棒球投擲為題的運動科學課堂中，價值不只是由另一個人講授內容，而是把學科知識連結至特定實務、觀點及觀察動作的方法。",
        "然而，邀請專家本身並不是教學策略。只有當客席課堂被設計成課程的一部分，而不是一段有趣的插曲，它才真正成為教育。",
      ],
      [
        { heading: "專業知識需要透過連結才產生價值", paragraphs: ["客席講者的專業路徑不同，往往能注意到學生與教師忽略的細節。他們可以展示概念如何被使用、教科書的簡化在哪裏變得不足，以及真實實務中哪些問題最重要。", "對學生而言，熟悉課題可以因此變得不同。投擲不只是一連串關節動作，也可從時序、力量傳遞、協調、技術、表現及受傷風險分析。客席視角能連結這些元素，同時不假設一節課可以涵蓋整個領域。"] },
        { heading: "主課教師仍有設計責任", paragraphs: ["客席課堂不應把學習責任外判。主課教師需要釐清預期成果，讓講者知道學生已有甚麼基礎，並說明內容如何連結課程其他部分。", "學生亦需要準備。課前提供簡短個案、觀察任務或問題，能讓他們知道需要留意甚麼。缺乏這種結構時，精彩講座可能令人難忘，卻與後續學習脫節。"] },
        { heading: "讓交流變得主動", paragraphs: ["最豐富的客席課堂讓學生不只聆聽。他們可以分析一段動作、比較兩次表現、預測技術改變如何影響動力鏈其他部分，或說明在提出建議前需要哪些證據。", "客席講者便能回應學生的推理，而不只傳遞預先準備的內容。這種專業知識與初步理解之間的交流，難以單靠錄影講課重現。"] },
        { heading: "把客席課堂設計進課程", points: ["界定客席內容需要處理的學習問題。", "分享學生的先備學習及課程已使用的語言。", "給學生一項聚焦的觀察、分析或提問任務。", "保留對話時間，而不是以投影片填滿整節課。", "課後解說，並把概念連結評估及未來實務。", "詢問學生現在能解釋或分析哪些以前未能處理的內容。"] },
        { heading: "不只是一場特別活動", paragraphs: ["客席講者最大的價值，是改變學生理解課題的方法，而不只是改變站在課室前方的人。外來視角可以延伸課程，而整合才能把視角轉化成學習。", "投影片介紹課題；真正的教育工作存在於圍繞它設計的問題、例子、練習及跟進。"] },
      ]
    ),
    326: article(
      [
        "小組活動常被視為主動學習策略，但把學生安排在同一張桌旁，並不會自動產生有意義的協作。有些小組有效率地分配工作，卻沒有討論背後概念；另一些小組談了很久，推理工作仍由一個人默默承擔。",
        "當我在小組活動期間走動觀察，我不只檢查學生是否忙碌。我會留意他們如何理解問題、推理在哪裏出現分歧，以及哪些聲音尚未進入對話。",
      ],
      [
        { heading: "學習過程本身包含證據", paragraphs: ["一個最終小組答案可以隱藏形成答案的路徑。聆聽討論能揭示學生連結哪些概念、重視哪些證據，以及哪個看似自信的說法其實建基於脆弱假設。這些時刻在正式評估提交前，已提供形成性資訊。", "桌上的學習痕跡亦很重要。筆記、圖表、搜尋選擇、被放棄的方案及修訂，可以顯示小組如何整理問題。數碼裝置可以支援過程，但打開多個屏幕並不能證明協作學習已發生。"] },
        { heading: "參與需要被設計", paragraphs: ["學生的自信、語言流暢度及先備知識各有不同。只要求大家討論，可能每次都重複相同的參與模式。少量結構可以創造更公平的參與機會。", "初步推理者、證據核實者、替代方案提出者及總結者等角色可以提供幫助，但角色應輪換，並與學習成果連結。討論前先作簡短個人判斷，也可避免一個答案取代所有人的思考。"] },
        { heading: "提問往往比直接解救更有用", paragraphs: ["當小組遇到困難，最快的方法是直接解釋答案。這可以恢復進度，卻可能移除學生需要練習的推理。更有用的介入通常是一條問題：你們正在使用哪些資訊？哪個假設會改變答案？你們會如何向另一組解釋？", "目的不是讓學生一直困惑，而是在提供足夠支援的同時，把思考責任保留在學習者身上。"] },
        { heading: "我在課室走動時會觀察甚麼", points: ["學生能否在提出方案前先說清楚問題。", "哪些證據被使用、忽略或誤解。", "意見分歧會否帶來解釋，還是只以投票解決。", "誰的推理正在塑造答案，以及誰仍然沉默。", "數碼工具是在支援比較與解釋，還是在取代它們。", "哪個錯誤概念普遍得需要全班共同處理。"] },
        { heading: "在評估正式確認之前", paragraphs: ["小組活動讓教師在想法仍在形成時，提早看見學習。它提供回應機會，避免錯誤概念要到考試或實作評估才出現，屆時回饋已太遲，無法影響目前任務。", "照片沒有展示完成答案，這正是它的價值：它記錄的學習是協商、修訂及解釋，而不只是最終產品。"] },
      ]
    ),
  },
};

// Character pairs reviewed against OpenCC's Hong Kong Traditional to Simplified conversion.
const t2sPairs = "並并來来個个們们備备傳传傷伤價价內内兩两別别創创動动務务匯汇協协卻却參参問问啟启單单嘗尝圍围圖图報报場场夠够夾夹學学實实專专尋寻對对導导屆届層层師师帶带幫帮張张後后徑径從从復复慣惯應应戰战換换搖摇擇择擔担據据擲掷擴扩數数斷断於于時时暢畅暫暂書书會会東东條条棄弃業业構构樣样機机檢检決决沒没測测準准滿满潛潜為为無无熱热獨独現现環环產产當当療疗發发眾众確确碼码礎础種种筆笔節节簡简細细紹绍終终組组結结絡络給给經经網网練练總总繞绕續续義义習习聯联聲声聽听脫脱與与舉举蓋盖處处術术裏里裝装複复見见視视觀观訂订計计訊讯討讨記记設设評评詢询試试話话該该認认語语誤误說说誰谁課课調调談谈請请論论諾诺講讲證证識识議议護护讀读變变讓让豐丰責责資资跡迹較较輪轮轉转辯辩這这連连進进運运過过遞递遲迟選选還还釋释釐厘錄录錯错鏈链開开間间閱阅闊阔關关階阶際际險险隱隐難难靈灵響响項项預预領领題题顯显風风饋馈驗验麼么點点";
const t2sMap = new Map(Array.from({ length: t2sPairs.length / 2 }, (_, index) => [t2sPairs[index * 2], t2sPairs[index * 2 + 1]]));
const toSimplifiedChinese = (html) => [...html].map((character) => t2sMap.get(character) || character).join("");

extendedPracticeNoteArticles["zh-hans"] = Object.fromEntries(
  Object.entries(extendedPracticeNoteArticles["zh-hant"]).map(([id, html]) => [id, toSimplifiedChinese(html)]),
);
