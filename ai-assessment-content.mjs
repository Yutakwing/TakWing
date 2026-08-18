const article = (intro, sections = []) => [
  ...intro.map((text) => `<p>${text}</p>`),
  ...sections.flatMap(({ heading, paragraphs = [], points = [], html = [], afterParagraphs = [] }) => [
    `<h2>${heading}</h2>`,
    ...paragraphs.map((text) => `<p>${text}</p>`),
    ...(points.length ? [`<ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>`] : []),
    ...html,
    ...afterParagraphs.map((text) => `<p>${text}</p>`),
  ]),
].join("\n");

export const aiAssessmentArticles = {
  en: {
    329: article(
      [
        "One of the questions I keep returning to in health professions education is:",
        "<strong>If students are going to use AI in their future practice, should we allow them to use it during assessment?</strong>",
        "The University of Sydney's approach caught my attention because, rather than treating AI as simply <em>allowed</em> or <em>prohibited</em>, it separates assessment into two different lanes.",
      ],
      [
        {
          heading: "Two lanes with different purposes",
          paragraphs: [
            "In the <strong>open lane</strong>, students can make appropriate use of contemporary tools, including generative AI. These assessments recognise that knowing how to work critically and responsibly with AI is increasingly becoming part of professional practice.",
            "The <strong>secure lane</strong>, however, serves a different purpose. Here, students demonstrate what they can do independently under supervised conditions. This can include written examinations, oral assessments, practical examinations, OSCE-type activities and observed clinical performance.",
            "I find this distinction particularly relevant to physiotherapy education.",
            "Perhaps we do not need every assessment to prove that a student can work without AI. But somewhere in the programme, we still need to be confident that the student standing in front of a patient can <strong>reason, communicate, examine and make decisions independently</strong>.",
          ],
        },
        {
          heading: "AI may have an important role before assurance",
          paragraphs: [
            "At the same time, there is growing evidence that AI may have an important role <em>before</em> that point.",
            "A 2026 randomised study involving 80 medical students compared conventional standardised-patient training with an approach combining standardised patients and AI virtual standardised patients. Students receiving the blended training demonstrated greater improvements in clinical reasoning, core competencies and OSCE performance in this study.",
            "What I find most interesting is that the study does not necessarily make the case for replacing human simulation with AI.",
            "It makes a case for <strong>blending them</strong>.",
          ],
        },
        {
          heading: "A possible educational pathway",
          paragraphs: [
            "AI virtual patients could provide students with repeated, accessible opportunities to practise clinical reasoning, make mistakes, explore alternative decisions and receive feedback. Human simulation and clinical encounters can then introduce the communication, unpredictability, emotional complexity and interpersonal judgement that are much harder to replicate.",
            "Finally, secure assessment can answer the most important question: <strong>Can the student actually do this when the AI is no longer there?</strong>",
          ],
          html: [
            '<p class="post-pull-quote"><strong>Learn with AI → practise with AI → practise with people → demonstrate independently → enter clinical practice.</strong></p>',
          ],
        },
        {
          heading: "Start with what the assessment must prove",
          paragraphs: [
            "For me, this changes the AI assessment conversation.",
            "Rather than asking whether AI should be permitted or banned, perhaps we should first ask <strong>what each assessment is supposed to prove</strong>.",
            "If the purpose is learning, experimentation, feedback and development, AI may have considerable value.",
            "If the purpose is to assure ourselves that a future healthcare professional can perform safely and independently, then there must still be moments when the student, not the AI, has to demonstrate that capability.",
            "The challenge now is deciding where those moments should sit within the curriculum.",
            "Perhaps that is where programme-level assessment design becomes much more important than trying to redesign every individual assignment in response to AI.",
          ],
        },
        {
          heading: "Related reading",
          points: [
            "University of Sydney. <a href='https://www.sydney.edu.au/news-opinion/news/2024/11/27/university-of-sydney-ai-assessment-policy.html'>AI assessment policy: protecting integrity and empowering students</a>.",
            "Shen, T., Zhang, R., Wang, H., Li, D., & Han, J. (2026). <a href='https://pubmed.ncbi.nlm.nih.gov/42200070/'>Virtual patients and standardized patients combined training is associated with improved clinical reasoning among medical students</a>. <em>Frontiers in Medicine, 13</em>, 1825465. <a href='https://doi.org/10.3389/fmed.2026.1825465'>https://doi.org/10.3389/fmed.2026.1825465</a>.",
          ],
        },
      ]
    ),
  },
  "zh-hant": {
    329: article(
      [
        "我在健康專業教育中反覆思考的一個問題是：",
        "<strong>如果學生將來在專業實務中會使用人工智能，我們是否應容許他們在評估中使用人工智能？</strong>",
        "悉尼大學的做法引起我的注意，因為它沒有把人工智能簡單分為「容許」或「禁止」，而是把評估分成兩條不同的軌道。",
      ],
      [
        {
          heading: "目的不同的雙軌評估",
          paragraphs: [
            "在<strong>開放軌道</strong>，學生可以適當運用當代工具，包括生成式人工智能。這類評估承認，能夠批判並負責任地與人工智能協作，正逐漸成為專業實務的一部分。",
            "<strong>安全軌道</strong>則有不同目的。學生須在受監督的情況下，獨立展示自己的能力。形式可以包括筆試、口試、實務考試、OSCE 類活動，以及受觀察的臨床表現。",
            "我認為這個區分與物理治療教育尤其相關。",
            "或許我們不需要每項評估都證明學生能在沒有人工智能的情況下工作，但課程中仍必須有一些時刻，讓我們確信站在病人面前的學生能夠<strong>獨立推理、溝通、檢查及作出決定</strong>。",
          ],
        },
        {
          heading: "人工智能可在能力保證前發揮作用",
          paragraphs: [
            "與此同時，愈來愈多證據顯示，人工智能在到達能力保證階段<em>之前</em>可以發揮重要作用。",
            "一項於 2026 年發表、涉及 80 名醫科生的隨機研究，比較傳統標準化病人訓練，與結合標準化病人及人工智能虛擬標準化病人的訓練。研究中，接受混合訓練的學生在臨床推理、核心能力及 OSCE 表現方面有較大進步。",
            "我認為最值得留意的，是這項研究並非主張以人工智能取代真人模擬，而是支持把兩者<strong>結合</strong>。",
          ],
        },
        {
          heading: "一條可能的教育路徑",
          paragraphs: [
            "人工智能虛擬病人可以提供重複而易於接觸的練習機會，讓學生練習臨床推理、犯錯、探索其他決定並獲得回饋。真人模擬及臨床接觸則能加入較難複製的溝通、不確定性、情緒複雜性及人際判斷。",
            "最後，安全評估可以回答最重要的問題：<strong>當人工智能不再在場時，學生真的能夠做到嗎？</strong>",
          ],
          html: ['<p class="post-pull-quote"><strong>與人工智能學習 → 與人工智能練習 → 與真人練習 → 獨立展示 → 進入臨床實務。</strong></p>'],
        },
        {
          heading: "先問評估需要證明甚麼",
          paragraphs: [
            "對我而言，這改變了人工智能評估的討論方式。與其先問應該容許還是禁止人工智能，我們或許應先問：<strong>每項評估究竟要證明甚麼？</strong>",
            "如果目的是學習、嘗試、回饋及發展，人工智能可能很有價值。如果目的是確認未來醫護專業人員能安全並獨立地工作，就必須保留一些由學生而非人工智能展示能力的時刻。",
            "現在的挑戰，是決定這些時刻應放在課程的哪個位置。這也許說明，課程層面的評估設計，比因應人工智能逐一重寫每份作業更為重要。",
          ],
        },
        {
          heading: "延伸閱讀",
          points: [
            "悉尼大學：<a href='https://www.sydney.edu.au/news-opinion/news/2024/11/27/university-of-sydney-ai-assessment-policy.html'>人工智能評估政策</a>。",
            "Shen 等（2026）：<a href='https://pubmed.ncbi.nlm.nih.gov/42200070/'>結合虛擬標準化病人與標準化病人訓練及醫科生臨床推理表現</a>。",
          ],
        },
      ]
    ),
  },
  "zh-hans": {
    329: article(
      [
        "我在健康专业教育中反复思考的一个问题是：",
        "<strong>如果学生将来在专业实践中会使用人工智能，我们是否应允许他们在评估中使用人工智能？</strong>",
        "悉尼大学的做法引起我的注意，因为它没有把人工智能简单分为“允许”或“禁止”，而是把评估分成两条不同的轨道。",
      ],
      [
        {
          heading: "目的不同的双轨评估",
          paragraphs: [
            "在<strong>开放轨道</strong>，学生可以适当运用当代工具，包括生成式人工智能。这类评估承认，能够批判并负责任地与人工智能协作，正逐渐成为专业实践的一部分。",
            "<strong>安全轨道</strong>则有不同目的。学生须在受监督的情况下，独立展示自己的能力。形式可以包括笔试、口试、实践考试、OSCE 类活动，以及受观察的临床表现。",
            "我认为这个区分与物理治疗教育尤其相关。",
            "或许我们不需要每项评估都证明学生能在没有人工智能的情况下工作，但课程中仍必须有一些时刻，让我们确信站在患者面前的学生能够<strong>独立推理、沟通、检查及作出决定</strong>。",
          ],
        },
        {
          heading: "人工智能可在能力保证前发挥作用",
          paragraphs: [
            "与此同时，越来越多证据显示，人工智能在到达能力保证阶段<em>之前</em>可以发挥重要作用。",
            "一项于 2026 年发表、涉及 80 名医学生的随机研究，比较传统标准化患者训练，与结合标准化患者及人工智能虚拟标准化患者的训练。研究中，接受混合训练的学生在临床推理、核心能力及 OSCE 表现方面有较大进步。",
            "我认为最值得留意的，是这项研究并非主张以人工智能取代真人模拟，而是支持把两者<strong>结合</strong>。",
          ],
        },
        {
          heading: "一条可能的教育路径",
          paragraphs: [
            "人工智能虚拟患者可以提供重复而易于接触的练习机会，让学生练习临床推理、犯错、探索其他决定并获得反馈。真人模拟及临床接触则能加入较难复制的沟通、不确定性、情绪复杂性及人际判断。",
            "最后，安全评估可以回答最重要的问题：<strong>当人工智能不再在场时，学生真的能够做到吗？</strong>",
          ],
          html: ['<p class="post-pull-quote"><strong>与人工智能学习 → 与人工智能练习 → 与真人练习 → 独立展示 → 进入临床实践。</strong></p>'],
        },
        {
          heading: "先问评估需要证明什么",
          paragraphs: [
            "对我而言，这改变了人工智能评估的讨论方式。与其先问应该允许还是禁止人工智能，我们或许应先问：<strong>每项评估究竟要证明什么？</strong>",
            "如果目的是学习、尝试、反馈及发展，人工智能可能很有价值。如果目的是确认未来医护专业人员能安全并独立地工作，就必须保留一些由学生而非人工智能展示能力的时刻。",
            "现在的挑战，是决定这些时刻应放在课程的哪个位置。这也许说明，课程层面的评估设计，比因应人工智能逐一重写每份作业更为重要。",
          ],
        },
        {
          heading: "延伸阅读",
          points: [
            "悉尼大学：<a href='https://www.sydney.edu.au/news-opinion/news/2024/11/27/university-of-sydney-ai-assessment-policy.html'>人工智能评估政策</a>。",
            "Shen 等（2026）：<a href='https://pubmed.ncbi.nlm.nih.gov/42200070/'>结合虚拟标准化患者与标准化患者训练及医学生临床推理表现</a>。",
          ],
        },
      ]
    ),
  },
};
