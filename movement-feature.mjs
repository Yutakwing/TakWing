// Editorial illustration, not a biomechanical model or clinical assessment.
export const renderMovementFeature = (localeKey, skillsHref) => {
  const leg = (side) => `<g class="movement-thigh movement-${side}"><path d="M0 0 L0 64"/><g transform="translate(0 64)"><g class="movement-calf"><path d="M0 0 L0 62"/><path class="movement-foot" d="M0 62 L17 66"/></g></g></g>`;
  const arm = (side) => `<g class="movement-arm movement-${side}"><path d="M0 0 L0 48"/><g transform="translate(0 48)"><path d="M0 0 L12 86" transform="scale(1 .5)"/></g></g>`;
  return `<section class="movement-feature" lang="en" aria-labelledby="movement-title" data-movement>
    <div class="movement-copy"><p class="eyebrow">Learning to observe</p><h2 id="movement-title">Movement, Gait &amp; Clinical Observation</h2><p>Exploring how physiotherapy students learn to observe, interpret and teach human movement.</p><ul class="movement-themes" aria-label="Themes"><li>Gait Analysis</li><li>Assistive Mobility</li><li>Movement Science</li></ul><a class="secondary-link" href="${skillsHref}">Explore the Skills Lab</a>${localeKey !== "en" ? '<p class="movement-translation">TRANSLATION REQUIRED — this feature is currently in English.</p>' : ''}</div>
    <figure class="movement-figure"><div class="movement-stage">
      <div class="movement-depth" aria-hidden="true"><span></span><span></span><span></span></div>
      <svg viewBox="0 0 420 340" aria-hidden="true" focusable="false" class="movement-svg">
        <path class="movement-ground" d="M45 304H375"/>
        <ellipse class="movement-shadow" cx="213" cy="305" rx="66" ry="5"/>
        <g transform="translate(210 174)"><g class="movement-person">
          <g class="movement-limb movement-far">${leg('back')}</g>
          <g transform="translate(0 -79)" class="movement-limb movement-far">${arm('front')}</g>
          <path class="movement-body" d="M-11 -88 Q1 -94 12 -85 L15 -37 L9 4 Q-1 13 -13 3 L-8 -39 Z"/>
          <path class="movement-head" d="M-5 -92 L-5 -103 Q-21 -110 -16 -128 Q-12 -144 3 -142 Q17 -141 18 -128 L24 -119 L17 -117 Q18 -104 7 -103 L8 -91 Z"/>
          <g class="movement-limb movement-near">${leg('front')}</g>
          <g transform="translate(0 -79)" class="movement-limb movement-near">${arm('back')}</g>
        </g></g>
      </svg>
    </div><figcaption>Illustrative movement loop for a teaching theme; not a biomechanically precise model or a clinical assessment.</figcaption><button class="movement-toggle" type="button" hidden>Pause motion</button></figure>
  </section>`;
};
