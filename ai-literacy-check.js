const englishQuestions = [
  ["Foundations", "What is the best description of generative AI?", ["A database that always retrieves verified facts", "A system that creates new content by predicting patterns from training data", "A search engine that only shows peer-reviewed evidence", "A calculator that cannot produce text"], 1, "Generative AI produces content from learned patterns. It does not simply retrieve verified facts."],
  ["Foundations", "An AI answer sounds confident and includes references. What should you assume?", ["It is accurate because it sounds professional", "It is accurate if the references have journal titles", "It still needs checking against trustworthy sources", "It is safe if another person received the same answer"], 2, "Fluent language and plausible references are not proof of accuracy."],
  ["Foundations", "What is an AI hallucination?", ["A system becoming conscious", "A convincing but false or unsupported output", "A temporary internet failure", "An image generated in a surreal style"], 1, "Hallucination is the common term for fabricated or unsupported AI output."],
  ["Evidence", "AI suggests a clinical approach you have not encountered. What should you do first?", ["Use it if it sounds low risk", "Ask AI to confirm it once more", "Check current guidelines and credible evidence", "Share it with a patient to see what they think"], 2, "Clinical claims should be checked against authoritative, current evidence."],
  ["Evidence", "What is the strongest sign that an AI response is reliable?", ["It is long and detailed", "It agrees with your first impression", "Its claims can be confirmed in suitable independent sources", "It uses technical terminology"], 2, "Reliability comes from verification, not style, length, or agreement with you."],
  ["Evidence", "AI gives a correct-looking clinical calculation. What is safest?", ["Accept it because computers are good at maths", "Recalculate and follow the relevant checking process", "Round it to make it easier", "Ask AI for a more confident answer"], 1, "High-stakes calculations need independent verification and normal safety checks."],
  ["Privacy", "Which information is appropriate to paste into a public AI tool?", ["A patient's full case notes", "A de-identified fictional case with no traceable details", "A photo showing a patient's face", "A discharge letter with rare identifying details retained"], 1, "Use fictional or properly de-identified material and follow institutional policy."],
  ["Privacy", "Why is removing only a patient's name sometimes insufficient?", ["AI needs names to work well", "Other details may still allow the person to be identified", "Names are never confidential", "Only images create privacy risk"], 1, "Combinations of dates, rare conditions, locations, and other details can re-identify someone."],
  ["Privacy", "Before using AI with workplace or placement information, you should check:", ["Whether friends use the same tool", "The tool's colour scheme", "Institutional policy, consent, and data-handling requirements", "Whether the response will be short"], 2, "Local policy and data governance determine what may be entered and how it may be used."],
  ["Bias and fairness", "Why might an AI system perform less well for some patient groups?", ["Its training data may under-represent them", "Those groups use less technology", "AI makes only random errors", "Professional users remove all bias"], 0, "Unrepresentative data can lead to unequal performance across populations."],
  ["Bias and fairness", "AI recommends different priorities for two similar cases. What should you examine?", ["Whether hidden assumptions or demographic bias influenced the output", "Which response is longer", "Whether the AI used emojis", "Whether both patients own smartphones"], 0, "Differences should prompt scrutiny for unsupported assumptions and unfair bias."],
  ["Bias and fairness", "What is the best way to reduce over-reliance on AI?", ["Use several AI tools and accept the majority answer", "Combine AI output with evidence, context, and human professional judgement", "Use AI only for short tasks", "Ask for a more confident answer"], 1, "AI should support—not replace—evidence-informed human judgement."],
  ["Responsible use", "You use AI to help draft an assignment or teaching resource. What should guide disclosure?", ["Whether anyone is likely to notice", "The relevant rules and an honest account of how AI contributed", "How many words AI generated", "Whether the work will be graded"], 1, "Transparent disclosure should follow the relevant academic or workplace rules."],
  ["Responsible use", "Who remains responsible for a clinical or educational decision supported by AI?", ["The AI company alone", "The person or professional making and approving the decision", "Nobody if the prompt is saved", "The internet provider"], 1, "Using AI does not transfer professional accountability to the tool."],
  ["Responsible use", "When should you avoid using AI?", ["Whenever a task is longer than one page", "When its use conflicts with policy, privacy, consent, safety, or the purpose of learning", "Whenever you are working in a group", "Only during examinations"], 1, "The decision should consider rules, privacy, consent, safety, and whether AI undermines the learning goal."]
];

const traditionalChineseQuestions = [
  ["基礎知識", "以下哪一項最能描述生成式人工智能？", ["一個只會檢索已核實事實的資料庫", "一個透過預測訓練資料中的模式來產生新內容的系統", "一個只顯示同行評審證據的搜尋引擎", "一個不能產生文字的計算器"], 1, "生成式人工智能根據學習所得的模式產生內容，而不是單純檢索已核實的事實。"],
  ["基礎知識", "人工智能的答案語氣肯定，而且附有參考資料。你應該怎樣理解？", ["語氣專業，所以答案準確", "參考資料有期刊名稱，所以答案準確", "仍須以可信來源核實", "若另一人得到相同答案，便可放心使用"], 2, "流暢的語言及看似可信的參考資料，並不能證明內容準確。"],
  ["基礎知識", "甚麼是人工智能幻覺？", ["系統產生意識", "看似可信但虛假或缺乏支持的輸出", "短暫的網絡故障", "以超現實風格生成的圖像"], 1, "人工智能幻覺通常指系統捏造或缺乏支持的輸出。"],
  ["證據", "人工智能建議了一個你從未接觸過的臨床方法。你首先應該怎樣做？", ["如果看來風險低便直接採用", "再請人工智能確認一次", "查閱最新指引及可信證據", "先與病人分享並詢問意見"], 2, "臨床主張應以權威而最新的證據核實。"],
  ["證據", "哪一項最能顯示人工智能回應可靠？", ["內容很長而且詳細", "與你的第一印象一致", "相關主張可由合適的獨立來源確認", "使用了專業術語"], 2, "可靠性來自核實，而不是文風、篇幅或與你意見一致。"],
  ["證據", "人工智能提供了一項看似正確的臨床計算。最安全的做法是甚麼？", ["電腦擅長數學，所以直接接受", "重新計算並遵循相關核對程序", "把數字四捨五入以方便使用", "請人工智能以更肯定的語氣回答"], 1, "高風險計算需要獨立核實及正常的安全檢查。"],
  ["私隱", "以下哪類資料適合輸入公開的人工智能工具？", ["病人的完整病歷", "不含可追溯資料的虛構匿名個案", "顯示病人面孔的照片", "保留罕見識別資料的出院信"], 1, "應使用虛構或妥善去除識別資料的內容，並遵守機構政策。"],
  ["私隱", "為何只刪除病人姓名有時仍不足夠？", ["人工智能需要姓名才能正常運作", "其他資料組合仍可能讓人辨識該病人", "姓名從來不是機密資料", "只有圖像才會帶來私隱風險"], 1, "日期、罕見病況、地點及其他資料的組合，可能讓人重新辨識個人身分。"],
  ["私隱", "使用人工智能處理工作或實習資料前，你應該查核甚麼？", ["朋友是否使用相同工具", "工具的配色", "機構政策、同意及資料處理要求", "回應會否很短"], 2, "本地政策及資料管治規定決定哪些資料可以輸入，以及應如何使用。"],
  ["偏見與公平", "為何人工智能系統對某些病人群組的表現可能較差？", ["訓練資料可能未充分代表這些群組", "這些群組較少使用科技", "人工智能只會隨機出錯", "專業使用者能消除所有偏見"], 0, "欠缺代表性的資料可能令系統在不同群體之間表現不一。"],
  ["偏見與公平", "人工智能為兩個相似個案建議不同優先次序。你應該檢視甚麼？", ["隱藏假設或人口特徵偏見有否影響輸出", "哪一個回應較長", "人工智能有否使用表情符號", "兩位病人是否擁有智能電話"], 0, "出現差異時，應檢視當中是否包含缺乏支持的假設或不公平偏見。"],
  ["偏見與公平", "減少過度依賴人工智能的最佳方法是甚麼？", ["使用多個人工智能工具並接受多數答案", "結合人工智能輸出、證據、情境及人類專業判斷", "只在短小任務中使用人工智能", "要求人工智能作出更肯定的回答"], 1, "人工智能應支援而非取代以證據為本的人類判斷。"],
  ["負責任使用", "你使用人工智能協助起草作業或教學資源。應根據甚麼原則作出披露？", ["別人會否察覺", "相關規則，以及如實交代人工智能如何參與", "人工智能產生了多少字", "作品是否會被評分"], 1, "透明披露應遵循相關學術或工作規定。"],
  ["負責任使用", "由人工智能支援的臨床或教育決定，最終由誰負責？", ["只有人工智能公司", "作出及批准該決定的人或專業人員", "只要保存提示詞便沒有人需要負責", "網絡供應商"], 1, "使用人工智能不會把專業責任轉移給工具。"],
  ["負責任使用", "甚麼情況下應避免使用人工智能？", ["任務超過一頁時", "當使用方式違反政策、私隱、同意、安全或學習目的時", "進行小組工作時", "只在考試期間"], 1, "決定時應考慮規則、私隱、同意、安全，以及人工智能會否削弱學習目標。"],
];

const simplifiedChineseQuestions = [
  ["基础知识", "以下哪一项最能描述生成式人工智能？", ["一个只会检索已核实事实的数据库", "一个通过预测训练资料中的模式来产生新内容的系统", "一个只显示同行评审证据的搜索引擎", "一个不能产生文字的计算器"], 1, "生成式人工智能根据学习所得的模式产生内容，而不是单纯检索已核实的事实。"],
  ["基础知识", "人工智能的答案语气肯定，而且附有参考资料。你应该怎样理解？", ["语气专业，所以答案准确", "参考资料有期刊名称，所以答案准确", "仍须以可信来源核实", "若另一人得到相同答案，便可放心使用"], 2, "流畅的语言及看似可信的参考资料，并不能证明内容准确。"],
  ["基础知识", "什么是人工智能幻觉？", ["系统产生意识", "看似可信但虚假或缺乏支持的输出", "短暂的网络故障", "以超现实风格生成的图像"], 1, "人工智能幻觉通常指系统捏造或缺乏支持的输出。"],
  ["证据", "人工智能建议了一个你从未接触过的临床方法。你首先应该怎样做？", ["如果看来风险低便直接采用", "再请人工智能确认一次", "查阅最新指南及可信证据", "先与病人分享并询问意见"], 2, "临床主张应以权威而最新的证据核实。"],
  ["证据", "哪一项最能显示人工智能回应可靠？", ["内容很长而且详细", "与你的第一印象一致", "相关主张可由合适的独立来源确认", "使用了专业术语"], 2, "可靠性来自核实，而不是文风、篇幅或与你意见一致。"],
  ["证据", "人工智能提供了一项看似正确的临床计算。最安全的做法是什么？", ["电脑擅长数学，所以直接接受", "重新计算并遵循相关核对程序", "把数字四舍五入以方便使用", "请人工智能以更肯定的语气回答"], 1, "高风险计算需要独立核实及正常的安全检查。"],
  ["隐私", "以下哪类资料适合输入公开的人工智能工具？", ["病人的完整病历", "不含可追溯资料的虚构匿名案例", "显示病人面孔的照片", "保留罕见识别资料的出院信"], 1, "应使用虚构或妥善去除识别资料的内容，并遵守机构政策。"],
  ["隐私", "为何只删除病人姓名有时仍不足够？", ["人工智能需要姓名才能正常运作", "其他资料组合仍可能让人识别该病人", "姓名从来不是机密资料", "只有图像才会带来隐私风险"], 1, "日期、罕见病况、地点及其他资料的组合，可能让人重新识别个人身份。"],
  ["隐私", "使用人工智能处理工作或实习资料前，你应该查核什么？", ["朋友是否使用相同工具", "工具的配色", "机构政策、同意及资料处理要求", "回应是否很短"], 2, "本地政策及资料治理规定决定哪些资料可以输入，以及应如何使用。"],
  ["偏见与公平", "为何人工智能系统对某些病人群组的表现可能较差？", ["训练资料可能未充分代表这些群组", "这些群组较少使用科技", "人工智能只会随机出错", "专业使用者能消除所有偏见"], 0, "缺乏代表性的资料可能令系统在不同群体之间表现不一。"],
  ["偏见与公平", "人工智能为两个相似案例建议不同优先次序。你应该检视什么？", ["隐藏假设或人口特征偏见是否影响输出", "哪一个回应较长", "人工智能是否使用表情符号", "两位病人是否拥有智能电话"], 0, "出现差异时，应检视当中是否包含缺乏支持的假设或不公平偏见。"],
  ["偏见与公平", "减少过度依赖人工智能的最佳方法是什么？", ["使用多个人工智能工具并接受多数答案", "结合人工智能输出、证据、情境及人类专业判断", "只在短小任务中使用人工智能", "要求人工智能作出更肯定的回答"], 1, "人工智能应支持而非取代以证据为本的人类判断。"],
  ["负责任使用", "你使用人工智能协助起草作业或教学资源。应根据什么原则作出披露？", ["别人是否察觉", "相关规则，以及如实交代人工智能如何参与", "人工智能产生了多少字", "作品是否会被评分"], 1, "透明披露应遵循相关学术或工作规定。"],
  ["负责任使用", "由人工智能支持的临床或教育决定，最终由谁负责？", ["只有人工智能公司", "作出及批准该决定的人或专业人员", "只要保存提示词便没有人需要负责", "网络供应商"], 1, "使用人工智能不会把专业责任转移给工具。"],
  ["负责任使用", "什么情况下应避免使用人工智能？", ["任务超过一页时", "当使用方式违反政策、隐私、同意、安全或学习目的时", "进行小组工作时", "只在考试期间"], 1, "决定时应考虑规则、隐私、同意、安全，以及人工智能是否削弱学习目标。"],
];

const language = document.documentElement.lang;
const questions = language === "zh-Hant" ? traditionalChineseQuestions : language === "zh-Hans" ? simplifiedChineseQuestions : englishQuestions;
const ui = {
  en: { section: "Section", answered: (n, total) => `${n} of ${total} answered`, profileWarning: "Please select your role and age group before viewing your result.", remaining: (n) => `Please answer all questions. ${n} remaining.`, correct: "Correct", review: "Review", question: "Question", yourAnswer: "Your answer", bestAnswer: "Best answer", result: "Your result", levels: ["Start with the essentials", "Building awareness", "Developing well", "Strong foundation"], score: (percent, message) => `You scored ${percent}%. ${message}`, localSaved: (role) => `Your result has been added to the local summary for ${role.toLowerCase()} participants below.`, notSaved: "Your result is shown below, but this browser did not allow it to be saved locally.", domainCorrect: (score, total) => `${score} of ${total} correct`, reviewAnswers: "Review your answers", noResults: "No results yet", attempts: (n) => `${n} attempt${n === 1 ? "" : "s"}`, average: (percent, n) => `${percent}% average · ${n} attempt${n === 1 ? "" : "s"}`, savedAttempts: (n) => `${n} completed attempt${n === 1 ? "" : "s"} saved in this browser.`, emptySummary: "Complete the quiz to begin building the local results summary.", clearConfirm: "Clear all quiz results stored in this browser?", roles: { Student: "Student", Lecturer: "Lecturer", Other: "Other" } },
  "zh-Hant": { section: "部分", answered: (n, total) => `已完成 ${n} / ${total} 題`, profileWarning: "請先選擇你的身分及年齡組別。", remaining: (n) => `請回答所有題目，尚餘 ${n} 題。`, correct: "正確", review: "檢視", question: "第", yourAnswer: "你的答案", bestAnswer: "最佳答案", result: "你的結果", levels: ["先掌握基礎", "正在建立意識", "發展良好", "基礎穩固"], score: (percent, message) => `你的得分是 ${percent}%。${message}`, localSaved: (role) => `你的結果已加入下方「${role === "Student" ? "學生" : role === "Lecturer" ? "教師" : "其他"}」參與者的本機摘要。`, notSaved: "結果已顯示，但此瀏覽器不允許在本機儲存。", domainCorrect: (score, total) => `${score} / ${total} 題正確`, reviewAnswers: "檢視你的答案", noResults: "尚未有結果", attempts: (n) => `${n} 次作答`, average: (percent, n) => `平均 ${percent}% · ${n} 次作答`, savedAttempts: (n) => `此瀏覽器已儲存 ${n} 次完成的作答。`, emptySummary: "完成檢查後，此處會開始顯示本機結果摘要。", clearConfirm: "確定清除此瀏覽器儲存的所有結果？", roles: { Student: "學生", Lecturer: "教師", Other: "其他" } },
  "zh-Hans": { section: "部分", answered: (n, total) => `已完成 ${n} / ${total} 题`, profileWarning: "请先选择你的身份及年龄组别。", remaining: (n) => `请回答所有题目，尚余 ${n} 题。`, correct: "正确", review: "检视", question: "第", yourAnswer: "你的答案", bestAnswer: "最佳答案", result: "你的结果", levels: ["先掌握基础", "正在建立意识", "发展良好", "基础稳固"], score: (percent, message) => `你的得分是 ${percent}%。${message}`, localSaved: (role) => `你的结果已加入下方“${role === "Student" ? "学生" : role === "Lecturer" ? "教师" : "其他"}”参与者的本地摘要。`, notSaved: "结果已显示，但此浏览器不允许在本地储存。", domainCorrect: (score, total) => `${score} / ${total} 题正确`, reviewAnswers: "检视你的答案", noResults: "尚未有结果", attempts: (n) => `${n} 次作答`, average: (percent, n) => `平均 ${percent}% · ${n} 次作答`, savedAttempts: (n) => `此浏览器已储存 ${n} 次完成的作答。`, emptySummary: "完成检查后，此处会开始显示本地结果摘要。", clearConfirm: "确定清除此浏览器储存的所有结果？", roles: { Student: "学生", Lecturer: "教师", Other: "其他" } },
}[language] || null;

const storageKey = "takwing-ai-literacy-results-v1";
const form = document.querySelector("#literacy-quiz");
const container = document.querySelector("#quiz-questions");
const progressBar = document.querySelector("#quiz-progress-bar");
const quizProgress = document.querySelector("#quiz-progress");
const progressText = document.querySelector("#quiz-progress-text");
const warning = document.querySelector("#quiz-warning");
const result = document.querySelector("#quiz-result");
const roleField = document.querySelector("#participant-role");
const ageField = document.querySelector("#participant-age");
const aggregateSummary = document.querySelector("#aggregate-summary");
const aggregateGroups = document.querySelector("#aggregate-groups");
const analytics = window.TakWingGameAnalytics?.create("ai-literacy-check");
let currentDomain = "";

questions.forEach((q, index) => {
  if (q[0] !== currentDomain) {
    currentDomain = q[0];
    container.insertAdjacentHTML("beforeend", `<h2 class="quiz-section-title"><span>${ui.section}</span>${currentDomain}</h2>`);
  }
  const fieldset = document.createElement("fieldset");
  fieldset.className = "question-card";
  fieldset.innerHTML = `<legend><span class="question-number">${index + 1}.</span>${q[1]}</legend>${q[2].map((answer, answerIndex) => `<label class="answer-option"><input type="radio" name="q${index}" value="${answerIndex}"><span>${answer}</span></label>`).join("")}`;
  container.append(fieldset);
});

function getSavedResults() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveResult(entry) {
  const saved = getSavedResults();
  saved.push(entry);
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
    return true;
  } catch {
    return false;
  }
}

function renderAggregates() {
  const saved = getSavedResults();
  if (!saved.length) {
    aggregateSummary.textContent = ui.emptySummary;
    aggregateGroups.innerHTML = "";
    return;
  }
  aggregateSummary.textContent = ui.savedAttempts(saved.length);
  const roles = ["Student", "Lecturer", "Other"];
  aggregateGroups.innerHTML = roles.map((role) => {
    const entries = saved.filter((entry) => entry.role === role);
    if (!entries.length) return `<article class="aggregate-card"><strong>${ui.roles[role]}</strong><span class="aggregate-score">${ui.noResults}</span><span class="aggregate-detail">${ui.attempts(0)}</span></article>`;
    const average = entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length;
    const percent = Math.round(average / questions.length * 100);
    return `<article class="aggregate-card"><strong>${ui.roles[role]}</strong><span class="aggregate-score">${average.toFixed(1)} / ${questions.length}</span><span class="aggregate-detail">${ui.average(percent, entries.length)}</span></article>`;
  }).join("");
}

function updateProgress() {
  const answered = questions.filter((_, index) => form.querySelector(`input[name="q${index}"]:checked`)).length;
  progressBar.style.width = `${answered / questions.length * 100}%`;
  progressText.textContent = ui.answered(answered, questions.length);
  quizProgress.setAttribute("aria-valuenow", String(answered));
}

function handleQuizInteraction() {
  updateProgress();
  try { analytics?.start(); } catch {}
}

form.addEventListener("input", handleQuizInteraction);
form.addEventListener("change", handleQuizInteraction);
form.addEventListener("click", (event) => {
  if (event.target.matches('input[type="radio"], select')) handleQuizInteraction();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!roleField.value || !ageField.value) {
    warning.textContent = ui.profileWarning;
    document.querySelector(".quiz-profile").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const unanswered = questions.map((_, i) => i).filter((i) => !form.querySelector(`input[name="q${i}"]:checked`));
  if (unanswered.length) {
    warning.textContent = ui.remaining(unanswered.length);
    form.querySelector(`input[name="q${unanswered[0]}"]`)?.closest(".question-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  warning.textContent = "";
  let score = 0;
  const domains = {};
  const review = [];
  questions.forEach((q, i) => {
    const selected = Number(form.querySelector(`input[name="q${i}"]:checked`).value);
    const correct = selected === q[3];
    if (correct) score++;
    domains[q[0]] ||= { score: 0, total: 0 };
    domains[q[0]].total++;
    if (correct) domains[q[0]].score++;
    const questionLabel = language === "en" ? `${ui.question} ${i + 1}` : `${ui.question} ${i + 1} 題`;
    review.push(`<details><summary class="${correct ? "correct" : "incorrect"}">${correct ? ui.correct : ui.review}: ${questionLabel}</summary><p><strong>${ui.yourAnswer}:</strong> ${q[2][selected]}</p>${correct ? "" : `<p><strong>${ui.bestAnswer}:</strong> ${q[2][q[3]]}</p>`}<p>${q[4]}</p></details>`);
  });
  const percent = Math.round(score / questions.length * 100);
  const level = score >= 13 ? ui.levels[3] : score >= 10 ? ui.levels[2] : score >= 7 ? ui.levels[1] : ui.levels[0];
  const resultSaved = saveResult({ role: roleField.value, ageGroup: ageField.value, score, total: questions.length, completedAt: new Date().toISOString() });
  const storageMessage = resultSaved
    ? ui.localSaved(roleField.value)
    : ui.notSaved;
  result.innerHTML = `<div class="result-summary"><div class="score-ring" style="--score:${percent * 3.6}deg"><span>${score}/${questions.length}</span></div><div><p class="eyebrow">${ui.result}</p><h2>${level}</h2><p>${ui.score(percent, storageMessage)}</p></div></div><div class="domain-results">${Object.entries(domains).map(([name, value]) => `<div class="domain-result"><strong>${name}</strong><span>${ui.domainCorrect(value.score, value.total)}</span></div>`).join("")}</div><h3>${ui.reviewAnswers}</h3><div class="review-list">${review.join("")}</div>`;
  result.hidden = false;
  try { analytics?.complete(); } catch {}
  window.reactToAssistantEvent?.("success");
  renderAggregates();
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#quiz-reset").addEventListener("click", () => {
  try { analytics?.restart(); } catch {}
  form.reset(); warning.textContent = ""; result.hidden = true; result.innerHTML = ""; updateProgress(); window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#quiz-clear-results").addEventListener("click", () => {
  if (!window.confirm(ui.clearConfirm)) return;
  localStorage.removeItem(storageKey);
  renderAggregates();
});

updateProgress();
renderAggregates();
