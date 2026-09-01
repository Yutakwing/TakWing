const article = (intro, sections = []) => [
  ...intro.map((text) => `<p>${text}</p>`),
  ...sections.flatMap(({ heading, paragraphs = [], points = [], html = [] }) => [
    `<h2>${heading}</h2>`,
    ...paragraphs.map((text) => `<p>${text}</p>`),
    ...(points.length ? [`<ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>`] : []),
    ...html,
  ]),
].join("\n");

export const teachingBoredomArticles = {
  en: {
    330: article(
      [
        "There is an uncomfortable part of teaching that I do not think we discuss enough: sometimes, teaching becomes boring.",
        "Not because the subject is unimportant, the students are uninteresting or the educator has stopped caring. Sometimes, we have simply taught the same material enough times for challenge to become routine.",
        "That possibility has made me wonder whether novelty matters not only for students, but also for the educators expected to make each new cohort's first encounter feel alive.",
      ],
      [
        {
          heading: "The energy of teaching something new",
          paragraphs: [
            "When I taught in South Africa, much of my work centred on biomechanics and movement science. After moving to Hong Kong, I also had to teach human physiology, human anatomy and functional anatomy. The change in country, university and curriculum made me a learner again.",
            "I had to decide how to explain cardiac physiology to first-year students, how anatomy could become more than memorising structures and how functional anatomy could connect an image on a page with movement in a real person.",
            "There was uncertainty, and that uncertainty created curiosity. I could not rely entirely on an established explanation or familiar sequence. I had to notice what students needed, test an approach and learn from what happened.",
          ],
        },
        {
          heading: "Then competence becomes routine",
          paragraphs: [
            "The 2026–27 academic year will be my third year teaching these subjects. Three years is not especially long, yet the questions have already changed.",
            "The first time, I asked: <em>How should I teach this?</em> The second time, the question became: <em>How can I teach this better?</em> Now, I increasingly know what comes next. I know where students tend to struggle, which explanations work, which activities take longer than expected and many of the questions students are likely to ask.",
            "This is experience, and experience should improve teaching. Yet it also has a side effect: the unfamiliar becomes familiar, and the demanding becomes predictable.",
          ],
        },
        {
          heading: "Why I keep redesigning assessment",
          paragraphs: [
            "Perhaps this is one reason I find myself revisiting assessment. I have experimented with practical tasks, presentations, movement analysis, questioning and, increasingly, activities involving technology and artificial intelligence.",
            "These changes should never be made merely to entertain the educator. Assessment needs a pedagogical reason. But redesign also forces me to think again: What am I actually trying to assess? What should students be able to do? Does this task demonstrate understanding, or only reward a polished output? Could the intended learning be made visible more authentically?",
            "Those questions return a degree of uncertainty to the work. They interrupt automaticity and make the educator examine familiar assumptions again.",
          ],
        },
        {
          heading: "Burnout, boredom and professional stagnation",
          paragraphs: [
            "Academic life rightly pays attention to burnout: sustained overload, exhaustion and diminishing capacity. Occupational discussions sometimes use the term <em>boreout</em> for a different pattern associated with chronic monotony, insufficient stimulation and disengagement.",
            "The distinction is useful, although neither label should be applied casually. A bored week is not a diagnosis, and exhaustion and boredom can coexist. Still, the questions they prompt may differ.",
            "Overload may require fewer demands, recovery and better support. Professional stagnation may call for an appropriate new challenge, a different collaboration or a chance to learn again. Responding to every form of disengagement with more work would clearly be unsafe; responding to every form with less work may also miss what is happening.",
          ],
        },
        {
          heading: "The asymmetry of repetitive teaching",
          paragraphs: [
            "There is a fundamental asymmetry in university teaching. For me, it may be the third time I have taught a topic. For the students in front of me, it is their first.",
            "I have seen the slides and explained the concept before. They have not. I have watched earlier cohorts make predictable mistakes. This cohort has not made them yet.",
            "Students deserve an educator who treats their first encounter with care and energy. The challenge is therefore not to manufacture excitement, but to remain genuinely attentive when the pathway has become familiar to us.",
          ],
          html: [
            '<p class="post-pull-quote"><strong>How do we keep something intellectually alive for ourselves when it must remain new for someone else?</strong></p>',
          ],
        },
        {
          heading: "Innovation may support educator learning too",
          paragraphs: [
            "Educational innovation is usually justified through student learning: Does it improve understanding, support engagement or strengthen clinical reasoning? Those must remain the central questions.",
            "There may nevertheless be a second, less discussed benefit. Purposeful innovation can keep educators intellectually engaged with their own teaching. Trying a new approach requires us to observe, adapt, reflect, sometimes fail and try again. In other words, it makes us learners.",
            "That does not make novelty an educational outcome. A new technology or assessment is not valuable simply because it feels fresh. The learning intention, student experience, fairness and evidence still have to justify the change.",
          ],
        },
        {
          heading: "The course cannot carry the educator's need for novelty forever",
          paragraphs: [
            "There is a limit to repeatedly redesigning an established course. If an assessment is valid, manageable and supporting learning, changing it every year because I need stimulation would place my professional need above students' educational needs.",
            "Sometimes the answer is not to change the course. The educator may need to change: teach a different year group, contribute to another area of physiotherapy, develop a clinically oriented module, join a simulation project or work with a subject in which the answers are not yet automatic.",
            "Sustainable teaching may therefore require both stability and renewal: enough consistency for students and programmes to rely on, with enough challenge for educators to continue developing.",
          ],
        },
        {
          heading: "Becoming a novice again",
          paragraphs: [
            "Moving from South Africa to Hong Kong supplied novelty automatically: a new institution, new students, new expectations and subjects that required me to learn as much as I taught. Some of that novelty is naturally disappearing.",
            "Perhaps this is not a problem to fix, but a signal to notice. Expertise should make parts of our work easier. When everything becomes too predictable, however, it may be time to place ourselves thoughtfully somewhere that requires curiosity again.",
            "As another academic year begins, I am asking a different question. Not only, <em>How can I redesign this course again?</em> but also: <strong>What should I teach or learn next that makes me excited to think again?</strong>",
            "Maybe one way of remaining a good teacher is occasionally becoming a novice.",
          ],
        },
      ]
    ),
  },
  "zh-hant": {
    330: article(
      [
        "教學有一個令人不太自在、卻很少被討論的面向：有時候，教學會變得沉悶。",
        "這不一定是因為學科不重要、學生不有趣，或教師已不再投入。有時候，我們只是把同一內容教了很多遍，原本的挑戰逐漸變成例行工作。",
        "這令我思考：新鮮感是否不只對學生重要，也影響教師能否讓每一屆學生的第一次接觸保持活力？",
      ],
      [
        {
          heading: "教授新內容所帶來的動力",
          paragraphs: [
            "在南非任教時，我的教學主要圍繞生物力學及動作科學。來到香港後，我也需要教授人體生理學、人體解剖學及功能解剖學。國家、大學及課程的轉變，令我再次成為學習者。",
            "我需要思考如何向一年級學生解釋心臟生理學、如何令解剖學不只停留於背誦結構，以及如何把頁面上的圖像連結至真實人體動作。",
            "當中有不少不確定性，而不確定性帶來好奇。我不能完全依賴既定解釋或熟悉流程，只能觀察學生需要、嘗試方法，再從實際結果中學習。",
          ],
        },
        {
          heading: "當能力逐漸變成例行工作",
          paragraphs: [
            "2026–27 學年將是我教授這些科目的第三年。三年並不算很長，但我所提出的問題已經改變。",
            "第一年，我問：<em>我應該怎樣教授這些內容？</em> 第二年，問題變成：<em>我可以怎樣教得更好？</em> 現在，我愈來愈清楚下一步會發生甚麼。我知道學生通常在哪裏遇到困難、哪些解釋有效、哪些活動需要較多時間，也能預計不少學生會提出的問題。",
            "這就是經驗，而經驗理應改善教學。然而，它也有一個副作用：陌生逐漸變成熟悉，艱難逐漸變成可預測。",
          ],
        },
        {
          heading: "為何我不斷重新思考評估",
          paragraphs: [
            "這也許是我經常重新檢視評估的原因之一。我曾嘗試實務任務、簡報、動作分析、追問，以及愈來愈多涉及科技和人工智能的活動。",
            "改變評估絕不能只是為了令教師感到新鮮，它必須有教學理由。但重新設計也迫使我再次思考：我真正想評估甚麼？學生應能做到甚麼？這項任務是在呈現理解，還是只獎勵精美成果？有沒有更真實的方法讓預期學習變得可見？",
            "這些問題為工作帶回一些不確定性，打斷自動化的做法，也讓教師重新檢視熟悉的假設。",
          ],
        },
        {
          heading: "倦怠、沉悶與專業停滯",
          paragraphs: [
            "學術工作理應關注倦怠：長期過量工作、疲憊及能力下降。職業討論有時使用 <em>boreout</em> 一詞，描述與長期單調、刺激不足及抽離感相關的另一種情況。",
            "這個區分具有啟發性，但兩個標籤都不應被隨便套用。短暫感到沉悶並不是診斷，疲憊與沉悶也可以同時存在。它們所引發的問題卻可能不同。",
            "工作過量可能需要減少要求、休息及更好的支援；專業停滯則可能需要合適的新挑戰、不同的協作，或再次學習的機會。把所有抽離都以增加工作回應並不安全，但把所有情況都只以減少工作處理，也可能錯過真正原因。",
          ],
        },
        {
          heading: "重複教學中的不對稱",
          paragraphs: [
            "大學教學存在一個根本的不對稱。對我而言，這可能是第三次教授某個題目；對眼前的學生而言，卻是第一次。",
            "我以前看過這些投影片，也解釋過這個概念；他們沒有。我看過過往學生犯下相似錯誤；這一屆學生還未經歷。",
            "學生值得一位以關注及投入對待他們第一次接觸的教師。因此，挑戰不是刻意營造興奮，而是在我們已熟悉路線時，仍然保持真正的注意。",
          ],
          html: ['<p class="post-pull-quote"><strong>當一項內容對學生仍然是全新的，我們如何讓它對自己也保持思想上的活力？</strong></p>'],
        },
        {
          heading: "創新也可以支援教師學習",
          paragraphs: [
            "教育創新通常以學生學習作為理據：它是否改善理解、支援參與或加強臨床推理？這些必須繼續是核心問題。",
            "不過，也許還有一個較少被討論的好處。有目的的創新可以令教師持續投入自己的教學。嘗試新方法要求我們觀察、調整、反思，有時失敗，再重新嘗試。換句話說，它令我們再次成為學習者。",
            "這並不代表新鮮感本身就是教育成果。新科技或新評估不會只因為感覺新穎而有價值；學習意圖、學生體驗、公平及證據仍然必須支持改變。",
          ],
        },
        {
          heading: "課程不能永遠承擔教師對新鮮感的需要",
          paragraphs: [
            "不斷重新設計成熟課程始終有其界限。如果一項評估具效度、可管理並能支援學習，只因為我需要刺激而每年改變它，便是把我的專業需要置於學生的教育需要之上。",
            "答案有時不是改變課程，而是教師需要改變：教授另一個年級、參與不同的物理治療範疇、發展臨床導向課程、加入模擬項目，或接觸答案尚未變成自動反應的題目。",
            "可持續教學也許同時需要穩定與更新：有足夠一致性讓學生及課程可以依靠，也有足夠挑戰讓教師繼續成長。",
          ],
        },
        {
          heading: "再次成為新手",
          paragraphs: [
            "由南非移居香港自然帶來新鮮感：新的院校、學生、期望及科目，令我在教學同時也需要大量學習。現在，部分新鮮感正在自然消退。",
            "這或許不是一個需要修理的問題，而是一個值得留意的訊號。專業能力本應令部分工作變得容易；但當一切都變得過於可預測，也許我們應有意識地把自己放在需要再次好奇的位置。",
            "新學年開始之際，我不只問：<em>我可以怎樣再次重新設計這門課？</em> 我也問：<strong>我下一步應教授或學習甚麼，才會令自己再次期待思考？</strong>",
            "保持良好教學的方法之一，也許是偶爾再次成為新手。",
          ],
        },
      ]
    ),
  },
  "zh-hans": {
    330: article(
      [
        "教学有一个令人不太自在、却很少被讨论的面向：有时候，教学会变得沉闷。",
        "这不一定是因为学科不重要、学生不有趣，或教师已不再投入。有时候，我们只是把同一内容教了很多遍，原本的挑战逐渐变成例行工作。",
        "这令我思考：新鲜感是否不只对学生重要，也影响教师能否让每一届学生的第一次接触保持活力？",
      ],
      [
        {
          heading: "教授新内容所带来的动力",
          paragraphs: [
            "在南非任教时，我的教学主要围绕生物力学及动作科学。来到香港后，我也需要教授人体生理学、人体解剖学及功能解剖学。国家、大学及课程的转变，令我再次成为学习者。",
            "我需要思考如何向一年级学生解释心脏生理学、如何令解剖学不只停留于背诵结构，以及如何把页面上的图像连接至真实人体动作。",
            "当中有不少不确定性，而不确定性带来好奇。我不能完全依赖既定解释或熟悉流程，只能观察学生需要、尝试方法，再从实际结果中学习。",
          ],
        },
        {
          heading: "当能力逐渐变成例行工作",
          paragraphs: [
            "2026–27 学年将是我教授这些科目的第三年。三年并不算很长，但我所提出的问题已经改变。",
            "第一年，我问：<em>我应该怎样教授这些内容？</em> 第二年，问题变成：<em>我可以怎样教得更好？</em> 现在，我越来越清楚下一步会发生什么。我知道学生通常在哪里遇到困难、哪些解释有效、哪些活动需要较多时间，也能预计不少学生会提出的问题。",
            "这就是经验，而经验理应改善教学。然而，它也有一个副作用：陌生逐渐变成熟悉，艰难逐渐变成可预测。",
          ],
        },
        {
          heading: "为何我不断重新思考评估",
          paragraphs: [
            "这也许是我经常重新检视评估的原因之一。我曾尝试实践任务、演示、动作分析、追问，以及越来越多涉及科技和人工智能的活动。",
            "改变评估绝不能只是为了令教师感到新鲜，它必须有教学理由。但重新设计也迫使我再次思考：我真正想评估什么？学生应该能够做到什么？这项任务是在呈现理解，还是只奖励精美成果？有没有更真实的方法让预期学习变得可见？",
            "这些问题为工作带回一些不确定性，打断自动化的做法，也让教师重新检视熟悉的假设。",
          ],
        },
        {
          heading: "倦怠、沉闷与专业停滞",
          paragraphs: [
            "学术工作理应关注倦怠：长期过量工作、疲惫及能力下降。职业讨论有时使用 <em>boreout</em> 一词，描述与长期单调、刺激不足及抽离感相关的另一种情况。",
            "这个区分具有启发性，但两个标签都不应被随便套用。短暂感到沉闷并不是诊断，疲惫与沉闷也可以同时存在。它们所引发的问题却可能不同。",
            "工作过量可能需要减少要求、休息及更好的支持；专业停滞则可能需要合适的新挑战、不同的协作，或再次学习的机会。把所有抽离都以增加工作回应并不安全，但把所有情况都只以减少工作处理，也可能错过真正原因。",
          ],
        },
        {
          heading: "重复教学中的不对称",
          paragraphs: [
            "大学教学存在一个根本的不对称。对我而言，这可能是第三次教授某个题目；对眼前的学生而言，却是第一次。",
            "我以前看过这些幻灯片，也解释过这个概念；他们没有。我看过以往学生犯下相似错误；这一届学生还没有经历。",
            "学生值得一位以关注及投入对待他们第一次接触的教师。因此，挑战不是刻意营造兴奋，而是在我们已熟悉路线时，仍然保持真正的注意。",
          ],
          html: ['<p class="post-pull-quote"><strong>当一项内容对学生仍然是全新的，我们如何让它对自己也保持思想上的活力？</strong></p>'],
        },
        {
          heading: "创新也可以支持教师学习",
          paragraphs: [
            "教育创新通常以学生学习作为理据：它是否改善理解、支持参与或加强临床推理？这些必须继续是核心问题。",
            "不过，也许还有一个较少被讨论的好处。有目的的创新可以令教师持续投入自己的教学。尝试新方法要求我们观察、调整、反思，有时失败，再重新尝试。换句话说，它令我们再次成为学习者。",
            "这并不代表新鲜感本身就是教育成果。新科技或新评估不会只因为感觉新颖而有价值；学习意图、学生体验、公平及证据仍然必须支持改变。",
          ],
        },
        {
          heading: "课程不能永远承担教师对新鲜感的需要",
          paragraphs: [
            "不断重新设计成熟课程始终有其界限。如果一项评估具效度、可管理并能支持学习，只因为我需要刺激而每年改变它，便是把我的专业需要置于学生的教育需要之上。",
            "答案有时不是改变课程，而是教师需要改变：教授另一个年级、参与不同的物理治疗范畴、发展临床导向课程、加入模拟项目，或接触答案尚未变成自动反应的题目。",
            "可持续教学也许同时需要稳定与更新：有足够一致性让学生及课程可以依靠，也有足够挑战让教师继续成长。",
          ],
        },
        {
          heading: "再次成为新手",
          paragraphs: [
            "由南非移居香港自然带来新鲜感：新的院校、学生、期望及科目，令我在教学同时也需要大量学习。现在，部分新鲜感正在自然消退。",
            "这或许不是一个需要修理的问题，而是一个值得留意的信号。专业能力本应令部分工作变得容易；但当一切都变得过于可预测，也许我们应有意识地把自己放在需要再次好奇的位置。",
            "新学年开始之际，我不只问：<em>我可以怎样再次重新设计这门课？</em> 我也问：<strong>我下一步应教授或学习什么，才会令自己再次期待思考？</strong>",
            "保持良好教学的方法之一，也许是偶尔再次成为新手。",
          ],
        },
      ]
    ),
  },
};
