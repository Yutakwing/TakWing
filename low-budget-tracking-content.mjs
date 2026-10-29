// Owner-approved reflection. No implementation details or future applications disclosed.
export const trackingPostSlug='building-a-low-budget-ai-tracking-prototype-without-an-it-background';
export const trackingPostMeta={
 en:{title:'I Built an AI Tracking Prototype. I Have No IT Background.',summary:'A personal milestone with a basic setup: AI helped me bridge a technical skills gap and made an idea affordable enough to try. The next step stays under wraps.',alt:'Tak Wing Yu testing a movement-tracking prototype, with coloured body, hand and face overlays visible on his image.',caption:'An early experiment with my low-budget tracking prototype. An overlay is a demonstration, not evidence of measurement accuracy.'},
 'zh-hant':{title:'沒有 IT 背景，我也做出了人工智能追蹤原型',summary:'一個基本配置帶來的個人里程碑：人工智能協助我跨越技術技能的缺口，讓一個想法變得負擔得起，也值得親自嘗試。下一步，暫時保密。',alt:'庾德榮測試動作追蹤原型，畫面可見身體、手部及臉部的彩色追蹤標記。',caption:'我的低成本追蹤原型的一次早期嘗試。畫面疊圖只屬示範，並非量度準確性的證據。'},
 'zh-hans':{title:'没有 IT 背景，我也做出了人工智能追踪原型',summary:'一个基本配置带来的个人里程碑：人工智能协助我跨越技术技能的缺口，让一个想法变得负担得起，也值得亲自尝试。下一步，暂时保密。',alt:'庾德荣测试动作追踪原型，画面可见身体、手部及面部的彩色追踪标记。',caption:'我的低成本追踪原型的一次早期尝试。画面叠图只属演示，并非测量准确性的证据。'}
};
const second={
 en:['Tak Wing Yu holding up an open hand while coloured hand, arm and face tracking overlays appear on screen.','Another moment from testing: seeing an idea respond to my own movement.'],
 'zh-hant':['庾德榮舉起張開的手掌，畫面顯示手部、手臂及臉部的彩色追蹤標記。','測試中的另一刻：看着自己的想法，隨着自己的動作作出回應。'],
 'zh-hans':['庾德荣举起张开的手掌，画面显示手部、手臂及面部的彩色追踪标记。','测试中的另一刻：看着自己的想法，随着自己的动作作出回应。']
};
const photo=locale=>`<figure><img src="../../assets/post-images/low-budget-ai-tracking-hand-face.png" alt="${second[locale][0]}" width="926" height="948" loading="lazy" decoding="async" style="display:block;width:min(100%,760px);height:auto;margin-inline:auto;object-fit:contain" /><figcaption>${second[locale][1]}</figcaption></figure>`;
// Article source lives one directory below the locale root; English has one fewer prefix.
const image=locale=>locale==='en'?photo(locale).replace('../../assets/','../assets/'):photo(locale);
const angles={
 en:['Tak Wing Yu seated while the prototype overlays body landmarks, joint-angle estimates, and hand and face tracking.','Testing the prototype while seated, with body landmarks and joint-angle estimates displayed alongside hand and face tracking. These on-screen estimates still need validation.'],
 'zh-hant':['庾德榮坐着測試原型，畫面顯示身體標記、關節角度估算，以及手部和臉部追蹤。','坐着測試原型：畫面同時顯示身體標記、關節角度估算，以及手部和臉部追蹤。這些螢幕上的估算仍需驗證。'],
 'zh-hans':['庾德荣坐着测试原型，画面显示身体标记、关节角度估算，以及手部和面部追踪。','坐着测试原型：画面同时显示身体标记、关节角度估算，以及手部和面部追踪。这些屏幕上的估算仍需验证。']
};
const angleImage=locale=>`<figure><img src="${locale==='en'?'../':'../../'}assets/post-images/low-budget-ai-tracking-joint-angles.png" alt="${angles[locale][0]}" width="1264" height="792" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin-inline:auto;object-fit:contain" /><figcaption>${angles[locale][1]}</figcaption></figure>`;
export const trackingPostBodies={
 en:`<p>This week, I built a low-budget AI movement-tracking prototype.</p>
<p>I’m a physiotherapy educator. I have no IT background. Yet here I am, watching a system I helped create follow my movements on screen.</p>
<p>Movement tracking is nothing new. What feels new to me is who can now build a working prototype—and how little equipment or upfront spending it can take to get started.</p>
${image('en')}
<p>I’m proud of this. It took time, patience, repeated attempts and plenty of things that didn’t work. AI helped me bridge technical gaps that would previously have stopped me from trying.</p>
<p>The idea, the questions and the decisions were still mine. AI gave me a way to turn them into something I could test.</p>
<p>That is where I see its value as a facilitator. Someone with knowledge of a problem, but limited programming skills, can now take a meaningful first step towards building a solution.</p>
<p>A working demonstration still needs testing. Lines following a body on screen do not, by themselves, prove that the measurements are accurate or useful. Professional expertise remains valuable.</p>
${angleImage('en')}
<p>But the cost of exploring an idea is changing.</p>
<p>Previously, I might have needed to commission development before finding out whether an idea was worth pursuing. That meant committing both time and money. With this basic setup, my main investment has been time. If an experiment fails, I can learn from it and try again without the same upfront financial commitment.</p>
<p>Technology is becoming more accessible, more affordable and easier for people like me to build with.</p>
<p>I’m keeping the next step under wraps for now.</p>
<p>For the moment, I’m enjoying a thought that would once have felt rather unlikely:</p>
<blockquote><p>“I wonder whether I could build that.”</p></blockquote>
<p>And then actually trying.</p>`,
 'zh-hant':`<p>這個星期，我做出了一個低成本的人工智能動作追蹤原型。</p>
<p>我是一名物理治療教育工作者，沒有 IT 背景。但現在，我看着自己參與建立的系統，在螢幕上跟隨我的動作。</p>
<p>動作追蹤並不是新事物。對我而言，新鮮的是：現在有誰能夠做出一個可以運作的原型，以及起步所需的器材與前期支出，可以有多基本、多有限。</p>
${image('zh-hant')}
<p>我為這件事感到自豪。過程需要時間、耐性、反覆嘗試，也有很多不成功的時候。人工智能協助我跨越了那些以往足以令我卻步的技術缺口。</p>
<p>想法、問題與決定，仍然來自我自己。人工智能讓我有辦法把它們變成可以測試的東西。</p>
<p>這正是我所看見的促進作用。一個了解問題、但編程能力有限的人，現在也能為建立解決方案踏出有意義的第一步。</p>
<p>可以運作的示範，仍然需要測試。螢幕上跟着身體移動的線條，本身並不能證明量度準確或有用。專業知識仍然重要。</p>
${angleImage('zh-hant')}
<p>不過，探索一個想法的成本正在改變。</p>
<p>以前，我可能要先委託別人開發，才能知道一個想法是否值得繼續。那代表同時投入時間與金錢。使用這個基本配置，我主要投入的是時間。即使實驗失敗，我也可以從中學習、再次嘗試，而不用承擔同樣的前期財務投入。</p>
<p>科技正變得更容易接觸、更負擔得起，也更容易讓像我這樣的人親手建立東西。</p>
<p>至於下一步，我暫時保密。</p>
<p>此刻，我享受的是一個以前可能覺得不太現實的念頭：</p>
<blockquote><p>「不知道我能不能把它做出來？」</p></blockquote>
<p>然後，真的動手去試。</p>`,
 'zh-hans':`<p>这个星期，我做出了一个低成本的人工智能动作追踪原型。</p>
<p>我是一名物理治疗教育工作者，没有 IT 背景。但现在，我看着自己参与建立的系统，在屏幕上跟随我的动作。</p>
<p>动作追踪并不是新事物。对我而言，新鲜的是：现在有谁能够做出一个可以运行的原型，以及起步所需的器材与前期支出，可以有多基本、多有限。</p>
${image('zh-hans')}
<p>我为这件事感到自豪。过程需要时间、耐心、反复尝试，也有很多不成功的时候。人工智能协助我跨越了那些以往足以让我却步的技术缺口。</p>
<p>想法、问题与决定，仍然来自我自己。人工智能让我有办法把它们变成可以测试的东西。</p>
<p>这正是我所看见的促进作用。一个了解问题、但编程能力有限的人，现在也能为建立解决方案踏出有意义的第一步。</p>
<p>可以运行的演示，仍然需要测试。屏幕上跟着身体移动的线条，本身并不能证明测量准确或有用。专业知识仍然重要。</p>
${angleImage('zh-hans')}
<p>不过，探索一个想法的成本正在改变。</p>
<p>以前，我可能要先委托别人开发，才能知道一个想法是否值得继续。那代表同时投入时间与金钱。使用这个基本配置，我主要投入的是时间。即使实验失败，我也可以从中学习、再次尝试，而不用承担同样的前期财务投入。</p>
<p>科技正变得更容易接触、更负担得起，也更容易让像我这样的人亲手建立东西。</p>
<p>至于下一步，我暂时保密。</p>
<p>此刻，我享受的是一个以前可能觉得不太现实的念头：</p>
<blockquote><p>“不知道我能不能把它做出来？”</p></blockquote>
<p>然后，真的动手去试。</p>`
};
