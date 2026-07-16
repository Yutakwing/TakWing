const questions = [
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
let currentDomain = "";

questions.forEach((q, index) => {
  if (q[0] !== currentDomain) {
    currentDomain = q[0];
    container.insertAdjacentHTML("beforeend", `<h2 class="quiz-section-title"><span>Section</span>${currentDomain}</h2>`);
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
    aggregateSummary.textContent = "Complete the quiz to begin building the local results summary.";
    aggregateGroups.innerHTML = "";
    return;
  }
  aggregateSummary.textContent = `${saved.length} completed attempt${saved.length === 1 ? "" : "s"} saved in this browser.`;
  const roles = ["Student", "Lecturer", "Other"];
  aggregateGroups.innerHTML = roles.map((role) => {
    const entries = saved.filter((entry) => entry.role === role);
    if (!entries.length) return `<article class="aggregate-card"><strong>${role}</strong><span class="aggregate-score">No results yet</span><span class="aggregate-detail">0 attempts</span></article>`;
    const average = entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length;
    const percent = Math.round(average / questions.length * 100);
    return `<article class="aggregate-card"><strong>${role}</strong><span class="aggregate-score">${average.toFixed(1)} / ${questions.length}</span><span class="aggregate-detail">${percent}% average · ${entries.length} attempt${entries.length === 1 ? "" : "s"}</span></article>`;
  }).join("");
}

function updateProgress() {
  const answered = questions.filter((_, index) => form.querySelector(`input[name="q${index}"]:checked`)).length;
  progressBar.style.width = `${answered / questions.length * 100}%`;
  progressText.textContent = `${answered} of ${questions.length} answered`;
  quizProgress.setAttribute("aria-valuenow", String(answered));
}
form.addEventListener("change", updateProgress);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!roleField.value || !ageField.value) {
    warning.textContent = "Please select your role and age group before viewing your result.";
    document.querySelector(".quiz-profile").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const unanswered = questions.map((_, i) => i).filter((i) => !form.querySelector(`input[name="q${i}"]:checked`));
  if (unanswered.length) {
    warning.textContent = `Please answer all questions. ${unanswered.length} remaining.`;
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
    review.push(`<details><summary class="${correct ? "correct" : "incorrect"}">${correct ? "Correct" : "Review"}: Question ${i + 1}</summary><p><strong>Your answer:</strong> ${q[2][selected]}</p>${correct ? "" : `<p><strong>Best answer:</strong> ${q[2][q[3]]}</p>`}<p>${q[4]}</p></details>`);
  });
  const percent = Math.round(score / questions.length * 100);
  const level = score >= 13 ? "Strong foundation" : score >= 10 ? "Developing well" : score >= 7 ? "Building awareness" : "Start with the essentials";
  const resultSaved = saveResult({ role: roleField.value, ageGroup: ageField.value, score, total: questions.length, completedAt: new Date().toISOString() });
  const storageMessage = resultSaved
    ? `Your result has been added to the local summary for ${roleField.value.toLowerCase()} participants below.`
    : "Your result is shown below, but this browser did not allow it to be saved locally.";
  result.innerHTML = `<div class="result-summary"><div class="score-ring" style="--score:${percent * 3.6}deg"><span>${score}/${questions.length}</span></div><div><p class="eyebrow">Your result</p><h2>${level}</h2><p>You scored ${percent}%. ${storageMessage}</p></div></div><div class="domain-results">${Object.entries(domains).map(([name, value]) => `<div class="domain-result"><strong>${name}</strong><span>${value.score} of ${value.total} correct</span></div>`).join("")}</div><h3>Review your answers</h3><div class="review-list">${review.join("")}</div>`;
  result.hidden = false;
  renderAggregates();
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#quiz-reset").addEventListener("click", () => {
  form.reset(); warning.textContent = ""; result.hidden = true; result.innerHTML = ""; updateProgress(); window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#quiz-clear-results").addEventListener("click", () => {
  if (!window.confirm("Clear all quiz results stored in this browser?")) return;
  localStorage.removeItem(storageKey);
  renderAggregates();
});

renderAggregates();
