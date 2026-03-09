const steps = [
  {
    num: '01',
    title: ['Concept &', 'Direction'],
    desc: 'Starting with the emotion: how should this feel? Working backward from the desired experience to define the motion vocabulary, palette, and interaction model.',
    items: ['Creative brief & mood definition', 'Motion vocabulary & easing palette', 'Color system in OKLCH', 'Typography hierarchy & rhythm'],
  },
  {
    num: '02',
    title: ['Motion', 'Prototyping'],
    desc: 'Every transition, reveal, and interaction is prototyped in isolation. The prototype is the specification — if it doesn\u0027t feel right at 60fps, the design changes.',
    items: ['GSAP timeline sketches', 'Scroll architecture mapping', 'Easing curve validation', 'Interaction state matrix'],
  },
  {
    num: '03',
    title: ['Engineering &', 'Integration'],
    desc: 'Production-grade implementation with modular architecture. ScrollTrigger sequences, WebGL scenes, physics-based interactions, and accessibility.',
    items: ['Modular GSAP architecture', 'WebGL + Three.js integration', 'Performance audit (CWV)', 'Accessibility & reduced-motion'],
  },
  {
    num: '04',
    title: ['Launch &', 'Iterate'],
    desc: 'Ship with confidence, then measure, learn, and refine. Post-launch optimization ensures the experience stays sharp on every device.',
    items: ['Staged deployment & QA', 'Lighthouse & WebPageTest audit', 'Post-launch refinement sprint', 'Long-term performance monitoring'],
  },
]

export default function Process() {
  return (
    <section data-process aria-label="Process">
      <div data-process-clip>
        <div data-process-grain aria-hidden="true" />
        <div data-process-accent-bar-left aria-hidden="true" />
        <div data-process-accent-bar-right aria-hidden="true" />
        <div data-process-counter aria-live="polite">
          <span data-process-counter-current>01</span>
          <span className="label"> / 04</span>
        </div>
        <div data-process-progress aria-hidden="true">
          <div data-process-progress-fill />
        </div>
        <div data-process-sticky>
          <div data-process-nav aria-hidden="true">
            <div data-process-nav-track>
              <div data-process-nav-fill />
            </div>
            {steps.map((_, i) => (
              <span key={i} data-process-dot />
            ))}
          </div>
          {steps.map((step) => (
            <div key={step.num} data-process-slide>
              <div data-slide-num-bg aria-hidden="true">{step.num}</div>
              <div data-slide-content>
                <div data-slide-header>
                  <span data-slide-label className="label">{step.num} — 04</span>
                  <div data-slide-accent-line aria-hidden="true" />
                </div>
                <h3 data-slide-title>
                  {step.title[0]}<br />{step.title[1]}
                </h3>
                <p data-slide-desc>{step.desc}</p>
                <ul data-slide-list role="list">
                  {step.items.map((item) => (
                    <li key={item} data-slide-item>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
