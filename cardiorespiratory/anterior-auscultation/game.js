// Lecturer-editable landmarks (SVG coordinates). Verify against the programme's taught protocol.
const ANTERIOR_AUSCULTATION_SITES = [
  { x: 405, y: 178, label: "Left upper zone", instruction: "Place the stethoscope over the patient's left upper anterior zone.", hint: "In this front view, the patient's left is on your right. Begin below the clavicle and away from the sternum.", correct: "Correct. Compare with the equivalent upper zone on the other side." },
  { x: 315, y: 178, label: "Right upper zone", instruction: "Compare at the matching right upper anterior zone.", hint: "Keep the chestpiece at the same horizontal level." },
  { x: 420, y: 286, label: "Left middle zone", instruction: "Move to the patient's left middle anterior zone.", hint: "Move inferiorly and slightly laterally." },
  { x: 300, y: 286, label: "Right middle zone", instruction: "Compare at the matching right middle anterior zone.", hint: "Compare side to side before moving down." },
  { x: 434, y: 400, label: "Left lower zone", instruction: "Place the stethoscope over the patient's left lower anterior zone.", hint: "Move inferiorly while remaining over an intercostal space." },
  { x: 286, y: 400, label: "Right lower zone", instruction: "Compare at the matching right lower anterior zone.", hint: "Match the level of the previous site." },
  { x: 500, y: 322, label: "Left axilla", instruction: "Move to the patient's left axillary site.", hint: "Move laterally beneath the axilla while keeping the chestpiece on the thorax." },
  { x: 220, y: 322, label: "Right axilla", instruction: "Finish at the matching right axillary site.", hint: "Complete the assessment at the equivalent level on the other side." }
];
CardioGame.initPlacementGame({gameId:"cardio-auscultation-anterior",view:"anterior",start:{x:620,y:480},tolerance:38,points:ANTERIOR_AUSCULTATION_SITES,completeTitle:"Anterior sequence complete",completionMetric:"Sites completed",startFeedback:"Start at the patient's left upper zone and compare equivalent positions side to side.",generalHint:"Use a systematic side-to-side sequence, then complete the matched axillary sites."});
