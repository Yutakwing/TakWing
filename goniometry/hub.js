(() => {
  const copy = {
    en: {
      back: "Back to Resources",
      eyebrow: "Clinical skills practice",
      title: "Goniometry Skills Lab",
      intro: "Choose a joint to practise anatomical landmark identification, axis placement, and alignment of the stationary and moving arms.",
      activities: "interactive activities",
      format: "Self-directed mini-OSPE practice",
      selectLabel: "Select an activity",
      activitiesTitle: "Upper and lower limb measurement",
      upperLimb: "Upper limb",
      lowerLimb: "Lower limb",
      elbowTitle: "Elbow Goniometry",
      elbowText: "Practise the landmarks and alignment used to measure elbow extension.",
      ankleTitle: "Ankle Goniometry",
      ankleText: "Practise the landmarks and alignment used to measure ankle dorsiflexion.",
      shoulderTitle: "Shoulder Flexion and Extension",
      shoulderText: "Position the goniometer for standing shoulder flexion and extension.",
      rotationTitle: "Shoulder Internal and External Rotation",
      rotationText: "Practise goniometer placement for shoulder rotation in supine.",
      hipTitle: "Hip Flexion and Extension",
      hipText: "Practise goniometer placement and observe hip movement in supine and prone.",
      kneeTitle: "Knee Flexion",
      kneeText: "Practise the landmarks and alignment used to measure knee flexion.",
      start: "Start activity",
      noteTitle: "Formative practice",
      noteText: "These activities support practice and feedback. They do not replace supervised teaching, hands-on assessment, or local clinical guidance.",
      footer: "Physiotherapy education, AI, VR and simulation",
      titleMeta: "Goniometry Skills Lab | Tak Wing Yu",
      descriptionMeta: "Practise anatomical landmark identification and goniometer placement across six interactive physiotherapy activities.",
    },
    "zh-hant": {
      back: "返回資源",
      eyebrow: "臨床技能練習",
      title: "量角器技能實驗室",
      intro: "選擇一個關節，練習辨認解剖標誌、放置軸心，以及對準固定臂與移動臂。",
      activities: "項互動活動",
      format: "自主小型 OSPE 練習",
      selectLabel: "選擇活動",
      activitiesTitle: "上肢及下肢關節測量",
      upperLimb: "上肢",
      lowerLimb: "下肢",
      elbowTitle: "肘關節量角器測量",
      elbowText: "練習測量肘關節伸展所需的解剖標誌及對線。",
      ankleTitle: "踝關節量角器測量",
      ankleText: "練習測量踝關節背屈所需的解剖標誌及對線。",
      shoulderTitle: "肩關節屈曲及伸展",
      shoulderText: "練習站立位肩關節屈曲及伸展的量角器放置。",
      rotationTitle: "肩關節內旋及外旋",
      rotationText: "練習仰臥位肩關節旋轉的量角器放置。",
      hipTitle: "髖關節屈曲及伸展",
      hipText: "練習量角器放置，並觀察仰臥及俯臥位的髖關節活動。",
      kneeTitle: "膝關節屈曲",
      kneeText: "練習測量膝關節屈曲所需的解剖標誌及對線。",
      start: "開始活動",
      noteTitle: "形成性練習",
      noteText: "這些活動用於支援練習及回饋，不能取代受監督教學、實體評估或本地臨床指引。",
      footer: "物理治療教育、人工智能、虛擬實境及模擬",
      titleMeta: "量角器技能實驗室 | Tak Wing Yu",
      descriptionMeta: "透過六項互動物理治療活動，練習辨認解剖標誌及放置量角器。",
    },
    "zh-hans": {
      back: "返回资源",
      eyebrow: "临床技能练习",
      title: "量角器技能实验室",
      intro: "选择一个关节，练习辨认解剖标志、放置轴心，以及对准固定臂与移动臂。",
      activities: "项互动活动",
      format: "自主小型 OSPE 练习",
      selectLabel: "选择活动",
      activitiesTitle: "上肢及下肢关节测量",
      upperLimb: "上肢",
      lowerLimb: "下肢",
      elbowTitle: "肘关节量角器测量",
      elbowText: "练习测量肘关节伸展所需的解剖标志及对线。",
      ankleTitle: "踝关节量角器测量",
      ankleText: "练习测量踝关节背屈所需的解剖标志及对线。",
      shoulderTitle: "肩关节屈曲及伸展",
      shoulderText: "练习站立位肩关节屈曲及伸展的量角器放置。",
      rotationTitle: "肩关节内旋及外旋",
      rotationText: "练习仰卧位肩关节旋转的量角器放置。",
      hipTitle: "髋关节屈曲及伸展",
      hipText: "练习量角器放置，并观察仰卧及俯卧位的髋关节活动。",
      kneeTitle: "膝关节屈曲",
      kneeText: "练习测量膝关节屈曲所需的解剖标志及对线。",
      start: "开始活动",
      noteTitle: "形成性练习",
      noteText: "这些活动用于支持练习及反馈，不能取代受监督教学、实体评估或本地临床指引。",
      footer: "物理治疗教育、人工智能、虚拟现实及模拟",
      titleMeta: "量角器技能实验室 | Tak Wing Yu",
      descriptionMeta: "通过六项互动物理治疗活动，练习辨认解剖标志及放置量角器。",
    },
  };

  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get("lang");
  const language = copy[requestedLanguage] ? requestedLanguage : "en";

  function applyLanguage(nextLanguage) {
    const strings = copy[nextLanguage] || copy.en;
    document.documentElement.lang = nextLanguage === "en" ? "en" : nextLanguage === "zh-hant" ? "zh-Hant" : "zh-Hans";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = strings[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === nextLanguage));
    });
    document.title = strings.titleMeta;
    document.querySelector('meta[name="description"]')?.setAttribute("content", strings.descriptionMeta);
    document.getElementById("back-link").href = nextLanguage === "en" ? "../resources.html" : `../${nextLanguage}/resources.html`;
    document.querySelectorAll("[data-game-link]").forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.href);
      if (nextLanguage === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", nextLanguage);
      link.href = url.href;
    });
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.language;
      const url = new URL(window.location.href);
      if (nextLanguage === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", nextLanguage);
      window.history.replaceState({}, "", url);
      applyLanguage(nextLanguage);
    });
  });

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme-v2", next); } catch (_) {}
  });

  applyLanguage(language);
})();
