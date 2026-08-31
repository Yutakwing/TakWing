// Lecturer-editable SVG coordinates. Verify these illustrative targets before assessed use.
const POSTERIOR_AUSCULTATION_SITES=[
 {x:296,y:166,label:"Upper left",instruction:"Place the stethoscope at the upper posterior site on the patient's left.",hint:"Begin lateral to the vertebral column and above the scapular field."},
 {x:424,y:166,label:"Upper right",instruction:"Compare at the matching upper posterior site on the patient's right.",hint:"Keep the comparison horizontal."},
 {x:276,y:305,label:"Middle left",instruction:"Move to the middle posterior site on the patient's left.",hint:"Move below and lateral to the scapula."},
 {x:444,y:305,label:"Middle right",instruction:"Compare at the matching middle posterior site on the patient's right.",hint:"Match the previous level."},
 {x:284,y:418,label:"Lower left",instruction:"Place the stethoscope at the lower posterior site on the patient's left.",hint:"Move inferiorly but remain on the thorax."},
 {x:436,y:418,label:"Lower right",instruction:"Finish at the matching lower posterior site on the patient's right.",hint:"Complete the side-to-side comparison."}
];
const POSTERIOR_BONE_ZONES=[{x:360,y:190,r:28,message:"Avoid the vertebral column; move laterally onto soft tissue."},{x:360,y:300,r:28,message:"Avoid the vertebral column; move laterally onto soft tissue."},{x:360,y:410,r:28,message:"Avoid the vertebral column; move laterally onto soft tissue."},{x:305,y:230,r:48,message:"This is over the scapula. Move to a clearer intercostal site."},{x:415,y:230,r:48,message:"This is over the scapula. Move to a clearer intercostal site."}];
CardioGame.initPlacementGame({gameId:"cardio-auscultation-posterior",view:"posterior",start:{x:620,y:480},tolerance:38,points:POSTERIOR_AUSCULTATION_SITES,boneZones:POSTERIOR_BONE_ZONES,completeTitle:"Posterior sequence complete",completionMetric:"Sites completed",startFeedback:"Start high and compare corresponding sites from side to side."});
