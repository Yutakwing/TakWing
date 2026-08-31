// Lecturer-editable landmarks (SVG coordinates). Verify against the programme's taught protocol.
const ANTERIOR_AUSCULTATION_SITES = [
  { x: 315, y: 178, label: "Upper left", instruction: "Place the stethoscope at the upper anterior site on the patient's left.", hint: "Begin below the clavicle, away from the sternum.", correct: "Correct. Compare with the corresponding site on the other side." },
  { x: 405, y: 178, label: "Upper right", instruction: "Compare at the matching upper anterior site on the patient's right.", hint: "Keep the site at the same horizontal level." },
  { x: 300, y: 286, label: "Middle left", instruction: "Move to the middle anterior site on the patient's left.", hint: "Move inferiorly and slightly laterally." },
  { x: 420, y: 286, label: "Middle right", instruction: "Compare at the matching middle anterior site on the patient's right.", hint: "Compare side to side before moving down." },
  { x: 286, y: 400, label: "Lower left", instruction: "Place the stethoscope at the lower anterior site on the patient's left.", hint: "Move inferiorly while remaining over an intercostal space." },
  { x: 434, y: 400, label: "Lower right", instruction: "Finish at the matching lower anterior site on the patient's right.", hint: "Match the level of the previous site." }
];
CardioGame.initPlacementGame({gameId:"cardio-auscultation-anterior",view:"anterior",start:{x:620,y:480},tolerance:38,points:ANTERIOR_AUSCULTATION_SITES,completeTitle:"Anterior sequence complete",completionMetric:"Sites completed",startFeedback:"Start at the upper anterior chest and compare matching sites side to side.",generalHint:"Use a systematic side-to-side sequence."});
