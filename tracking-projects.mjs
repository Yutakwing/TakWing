// Project descriptions only: these are native Mac prototypes, not hosted camera tools.
const shared = [
  {id:'ai-ospe-tracking',number:'06',image:'sit-to-stand-tracking.svg'},
  {id:'badminton-body-tracking',number:'07',image:'badminton-body-tracking.svg'},
];
const copy = {
 en:[
  {
   title:'AI Tracking for OSPE & Student Training',
   strapline:'Making sit-to-stand facilitation visible for practice, reflection and lecturer review.',
   imageAlt:'Schematic of a seated standardised patient in blue and a student physiotherapist in orange, with body landmarks. Not an assessment result.',
   imageNote:'Illustrative tracking schematic — not participant data or a validated assessment result.',
   problem:'Students need specific feedback on how they position themselves and facilitate sit-to-stand with a standardised patient. A camera view can miss hands, confuse participants or hide important clinical context.',
   design:'Physio Facilitation Lab is a native Mac prototype using existing Apple Vision body and hand tracking. It supports live camera observations and a two-video review workflow, projected joint measurements, visibility prompts and a draft written report. Lecturers identify the patient and student and confirm rubric marks; optional local language-model wording supplements the evidence report.',
   learning:'Observe student positioning, trunk and arm movement, and visible hand location; explain handling choices, review uncertainty and use lecturer feedback to plan another attempt.',
   role:'Physiotherapy educator directing the prototype concept, sit-to-stand scenario, rubric design and feedback requirements.',
   status:'Prototype in development. Live feedback logic and basic video processing have been checked, but live camera availability and two-person tracking require further testing. Educational effectiveness and agreement with examiner scores have not been established. Not available to launch or download from this website.',
   next:'Can independently annotated recordings establish reliable patient/student identities and hand observations, followed by agreement with lecturers on assessable rubric items? Final clinical marks remain lecturer-confirmed; contact pressure, assistance force and safety are not inferred from landmarks.',
   short:'Sit-to-stand facilitation with a standardised patient: explore student/patient tracking, visible hand placement, movement observations and lecturer-confirmed rubric feedback.',
  },
  {
   title:'Badminton Basic Body Analysis',
   strapline:'Using visible movement evidence to review badminton technique, one task at a time.',
   imageAlt:'Schematic of a badminton player lunging, with body landmarks and a racket. Not a measured player or an injury prediction.',
   imageNote:'Illustrative movement schematic — not a measurement or injury-risk classification.',
   problem:'Players and educators need a practical way to replay movement and inspect body positioning without treating a skeleton overlay as proof of accurate biomechanics or injury risk.',
   design:'Badminton Motion Lab is a native Mac prototype using existing Apple Vision models. Live webcam tracking displays body and hand landmarks and projected joint angles. Recorded-video analysis exports a skeleton overlay and joint-measurement CSV. Initial work focuses on clearly visible movements and manually confirmed lunge frames.',
   learning:'Review net-shot approach, lunge and recovery when visible; compare labelled left/right attempts, recognise missing landmarks and discuss projected movement with a coach or physiotherapist.',
   role:'Project designer defining badminton movement-review tasks, measurement limits and the prototype testing approach.',
   status:'Working tracking prototype; fast badminton accuracy has not been validated. The first sample clip validated tracking only because it did not show a suitable full-body lunge. Smash-specific analysis and multi-camera fusion remain future work. Not available to launch or download from this website.',
   next:'How closely do projected measurements agree with manually checked recordings under realistic speed, lighting and camera views? The prototype does not diagnose injury, predict individual injury risk, measure joint loading or track the shuttlecock.',
   short:'Live and recorded-video body tracking, skeleton overlays and projected joint measurements for basic badminton movement review. Accuracy testing is ongoing; no injury prediction.',
  },
 ],
 'zh-hant':[
  {
   title:'人工智能追蹤：OSPE 與學生訓練',strapline:'讓坐到站協助技巧可供觀察、練習、反思與教師審視。',
   imageAlt:'示意圖：藍色的坐姿標準化病人與橙色的物理治療學生，標示身體關鍵點。並非評估結果。',imageNote:'追蹤示意圖，並非參與者資料或經驗證的評估結果。',
   problem:'學生需要具體回饋，了解如何站位及協助標準化病人由坐到站。鏡頭可能看不到雙手、混淆參與者，或缺少重要臨床背景。',
   design:'Physio Facilitation Lab 是使用現有 Apple Vision 身體與手部追蹤功能的 Mac 原型，設有即時鏡頭觀察、雙影片審視、投影關節量度、可見度提示及書面報告草稿。教師指定病人與學生並確認評分；可選用本機語言模型協助整理文字。',
   learning:'觀察學生站位、軀幹與手臂動作及可見手部位置；解釋協助選擇、檢視不確定性，並按教師回饋計劃下一次練習。',
   role:'物理治療教育工作者，負責原型概念、坐到站情境、評分準則及回饋需求。',
   status:'原型發展中。即時回饋邏輯及基本影片處理已作檢查，但鏡頭可用性與雙人追蹤仍需測試。教學成效及與考官評分的一致性尚未確立。本網站尚未提供啟動或下載。',
   next:'能否以獨立標註的影片確認病人／學生身分與手部觀察的可靠度，再比較可觀察項目與教師評分的一致性？臨床分數由教師確認；關鍵點不能推斷接觸壓力、協助力量或安全性。',
   short:'以標準化病人的坐到站協助為起點，探索學生／病人追蹤、可見手部位置、動作觀察及教師確認的評分回饋。',
  },
  {
   title:'羽毛球基本身體動作分析',strapline:'逐項檢視可見動作證據，支援羽毛球技術回顧。',
   imageAlt:'示意圖：持球拍的羽毛球運動員作跨步，標示身體關鍵點。並非實測或受傷預測。',imageNote:'動作示意圖，並非量度結果或受傷風險分類。',
   problem:'球員與教師需要實用方法重播及檢視身體位置，但骨架疊圖不代表生物力學量度準確，也不能證明受傷風險。',
   design:'Badminton Motion Lab 是使用現有 Apple Vision 模型的 Mac 原型。即時鏡頭顯示身體與手部關鍵點及投影關節角度；錄影片段分析可匯出骨架疊圖及關節量度 CSV。初期聚焦清楚可見的動作及人工確認的跨步畫面。',
   learning:'在畫面清晰時檢視網前球的接近、跨步與回位，比較有標記的左右側練習、辨認缺失關鍵點，並與教練或物理治療師討論投影動作。',
   role:'項目設計者，制定羽毛球動作審視任務、量度限制及原型測試方法。',
   status:'已有追蹤原型，但快速羽毛球動作的準確度尚未驗證。首段樣本未有適合的全身跨步，只用於檢查追蹤。扣殺專項分析與多鏡頭融合仍屬未來工作。本網站尚未提供啟動或下載。',
   next:'在實際速度、光線與鏡頭角度下，投影量度與人工核對影片的一致程度如何？原型不診斷受傷、不預測個人受傷風險，也不量度關節負荷或追蹤羽毛球。',
   short:'以即時及錄影身體追蹤、骨架疊圖及投影關節量度，支援羽毛球基本動作回顧。準確度測試進行中，不提供受傷預測。',
  },
 ],
};
// Explicitly maintain the Simplified Chinese copy without adding a conversion dependency.
copy['zh-hans'] = [
 {...copy['zh-hant'][0],title:'人工智能追踪：OSPE 与学生训练',strapline:'让坐到站协助技巧可供观察、练习、反思与教师审视。',imageAlt:'示意图：蓝色的坐姿标准化患者与橙色的物理治疗学生，标示身体关键点。并非评估结果。',imageNote:'追踪示意图，并非参与者资料或经验证的评估结果。',problem:'学生需要具体反馈，了解如何站位及协助标准化患者由坐到站。镜头可能看不到双手、混淆参与者，或缺少重要临床背景。',design:'Physio Facilitation Lab 是使用现有 Apple Vision 身体与手部追踪功能的 Mac 原型，设有实时镜头观察、双视频审视、投影关节测量、可见度提示及书面报告草稿。教师指定患者与学生并确认评分；可选用本地语言模型协助整理文字。',learning:'观察学生站位、躯干与手臂动作及可见手部位置；解释协助选择、检视不确定性，并按教师反馈计划下一次练习。',role:'物理治疗教育工作者，负责原型概念、坐到站情境、评分准则及反馈需求。',status:'原型开发中。实时反馈逻辑及基本视频处理已作检查，但镜头可用性与双人追踪仍需测试。教学成效及与考官评分的一致性尚未确立。本网站尚未提供启动或下载。',next:'能否以独立标注的视频确认患者／学生身份与手部观察的可靠度，再比较可观察项目与教师评分的一致性？临床分数由教师确认；关键点不能推断接触压力、协助力量或安全性。',short:'以标准化患者的坐到站协助为起点，探索学生／患者追踪、可见手部位置、动作观察及教师确认的评分反馈。'},
 {...copy['zh-hant'][1],title:'羽毛球基本身体动作分析',strapline:'逐项检视可见动作证据，支持羽毛球技术回顾。',imageAlt:'示意图：持球拍的羽毛球运动员作跨步，标示身体关键点。并非实测或受伤预测。',imageNote:'动作示意图，并非测量结果或受伤风险分类。',problem:'球员与教师需要实用方法重播及检视身体位置，但骨架叠图不代表生物力学测量准确，也不能证明受伤风险。',design:'Badminton Motion Lab 是使用现有 Apple Vision 模型的 Mac 原型。实时镜头显示身体与手部关键点及投影关节角度；录像片段分析可导出骨架叠图及关节测量 CSV。初期聚焦清楚可见的动作及人工确认的跨步画面。',learning:'在画面清晰时检视网前球的接近、跨步与回位，比较有标记的左右侧练习、辨认缺失关键点，并与教练或物理治疗师讨论投影动作。',role:'项目设计者，制定羽毛球动作审视任务、测量限制及原型测试方法。',status:'已有追踪原型，但快速羽毛球动作的准确度尚未验证。首段样本未有适合的全身跨步，只用于检查追踪。扣杀专项分析与多镜头融合仍属未来工作。本网站尚未提供启动或下载。',next:'在实际速度、光线与镜头角度下，投影测量与人工核对视频的一致程度如何？原型不诊断受伤、不预测个人受伤风险，也不测量关节负荷或追踪羽毛球。',short:'以实时及录像身体追踪、骨架叠图及投影关节测量，支持羽毛球基本动作回顾。准确度测试进行中，不提供受伤预测。'},
];
export const trackingProjects=Object.fromEntries(Object.entries(copy).map(([locale,items])=>[locale,items.map((p,i)=>({...shared[i],...p}))]));
export const trackingUi={
 en:{title:'AI Movement Tracking',status:'PROTOTYPES · IN DEVELOPMENT',intro:'Two native Mac projects exploring movement observation and feedback. Public access is coming later; these descriptions do not launch a camera, accept videos or save student results.',action:'Read project details'},
 'zh-hant':{title:'人工智能動作追蹤',status:'原型 · 發展中',intro:'兩個 Mac 原型項目，探索動作觀察與回饋。公開使用將於日後提供；以下介紹不會啟動鏡頭、接收影片或儲存學生成績。',action:'閱讀項目詳情'},
 'zh-hans':{title:'人工智能动作追踪',status:'原型 · 开发中',intro:'两个 Mac 原型项目，探索动作观察与反馈。公开使用将于日后提供；以下介绍不会启动镜头、接收视频或保存学生成绩。',action:'阅读项目详情'},
};
