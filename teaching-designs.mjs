// Condensed from the existing Teaching examples and linked published records.
export const teachingDesigns = [
 {id:'movement-assessment', title:'Movement Science: prepare, present, explain and defend', fields:[
 ['Educational problem','A polished AI-assisted presentation can conceal gaps in the student’s understanding.'],
 ['Learning design','Retain the movement-analysis project and presentation, followed by live questioning.'],
 ['What students do','Prepare a biomechanical explanation, present their analysis and justify their reasoning in their own words.'],
 ['Role of technology','Contemporary tools, including AI, can support preparation; students remain responsible for the claims they make.'],
 ['Assessment / feedback','Live Q&A examines reasoning and ownership. An unseen transfer task remains a proposed next iteration, not an implemented or evaluated component.']],
 links:[['Assessment design record','./posts/movement-science-assessment-redesign-for-generative-ai.html'],['Related reasoning research','./research.html#reasoning-chatbot'],['Related movement-measurement practice','./goniometry/']]},
 {id:'simulation-learning', title:'Learning from more than the clinician’s role', fields:[
 ['Educational problem','Simulation discussions can overlook learning through patient, observer and peer-debriefer roles.'],
 ['Learning design','Explore structured rotation through Learner, Peer Patient, Observer and Peer Debriefer roles.'],
 ['What students do','Rehearse decisions, experience the encounter from another perspective, observe communication and participate in guided reflection.'],
 ['Role of technology','The simulation environment supports rehearsal; preparation, human interaction and educator oversight shape the learning.'],
 ['Assessment / feedback','Focused observation and debriefing support reflection. The study is undergoing analysis and manuscript development; effects on competence or readiness are not established.']],
 links:[['Role-rotation reflection','./posts/the-clinician-is-not-the-only-learner-what-role-rotation-adds-to-simulation.html'],['Ongoing simulation research','./research.html#simulation-role-rotation']]},
 {id:'technology-learning', title:'Choose the learning task before the tool', fields:[
 ['Educational problem','A fluent AI response or immersive demonstration is not evidence of understanding.'],
 ['Learning design','Student first → AI second → student explains → verify → try again independently.'],
 ['What students do','Make an initial attempt, question the support they receive and explain and check the response before an independent retry.'],
 ['Role of technology','AI is a scaffold. Related VR acupuncture work connects spatial practice with preparation and debriefing, and remains in development.'],
 ['Assessment / feedback','Learner explanations and independent performance reveal thinking. The AI Literacy Check provides a separate reflective self-check, not certification of clinical competence.']],
 links:[['AI learning guide','./posts/enough-about-catching-ai-a-practical-guide-to-using-it-for-learning.html'],['AI Literacy Check','./ai-literacy-check.html'],['VR project in development','./research.html#vr-acupuncture'],['Skills Lab','./skills-lab.html']]},
];
export const renderTeachingDesigns = () => `<section class="section-block" id="teaching-in-practice"><h2>Selected Teaching Designs</h2><p>These examples connect the educational problem, student task and feedback approach. They describe teaching designs and ongoing work, not measured learning gains. Linked activities are related opportunities to explore an idea, not evidence of a validated intervention.</p><div class="scholar-list">${teachingDesigns.map(d=>`<article class="publication-card" id="${d.id}"><h3>${d.title}</h3><dl>${d.fields.map(([label,text])=>`<dt><strong>${label}</strong></dt><dd>${text}</dd>`).join('')}</dl><nav aria-label="Related work: ${d.title}">${d.links.map(([label,href])=>`<a class="secondary-link" href="${href}">${label}</a>`).join(' · ')}</nav></article>`).join('')}</div></section>`;
