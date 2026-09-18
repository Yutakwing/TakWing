// Public catalogue only. Tracked activity registration remains in cloudflare/seed-games.sql.
export const skillsLabGroups = [
  { id: "goniometry", title: "Goniometry", intro: "Practise anatomical landmarks and goniometer placement.", hub: "goniometry/index.html", activities: [
    ["Elbow Goniometry", "elbow-goniometry/index.html"],
    ["Ankle Goniometry", "ankle-goniometry/index.html"],
    ["Shoulder Flexion and Extension", "shoulder-goniometry/index.html"],
    ["Shoulder Internal and External Rotation", "shoulder-rotation-goniometry/index.html"],
    ["Hip Flexion and Extension", "hip-goniometry/index.html"],
    ["Knee Flexion", "knee-goniometry/index.html"],
  ]},
  { id: "cardiorespiratory", title: "Cardiorespiratory", intro: "Explore the existing assessment skills activities.", hub: "cardiorespiratory/index.html", activities: [
    ["Anterior Lung Auscultation", "cardiorespiratory/anterior-auscultation/index.html"],
    ["Posterior Lung Auscultation", "cardiorespiratory/posterior-auscultation/index.html"],
    ["Chest Expansion", "cardiorespiratory/chest-expansion/index.html"],
    ["Chest Percussion", "cardiorespiratory/chest-percussion/index.html"],
    ["Breath Sound Identification", "cardiorespiratory/breath-sounds/index.html"],
  ]},
  { id: "clinical-reasoning", title: "Clinical Reasoning", intro: "Explore evidence, explanation and decisions through interactive activities.", activities: [
    ["Reasoning Runner", "reasoning-runner.html"],
    ["Clinical Readiness Lab", "clinical-readiness-lab.html"],
  ]},
  { id: "ai-digital-skills", title: "AI / Digital Skills", intro: "Practise responsible AI use and keyboard fluency.", activities: [
    ["AI Literacy Check", "ai-literacy-check.html"],
    ["Typing Speed Test", "typing-test/index.html"],
  ]},
];
export const skillsLabDescription = "Explore existing physiotherapy, clinical reasoning, AI and digital skills activities, or log in to track your student practice.";
