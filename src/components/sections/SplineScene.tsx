import SplineEmbed from '@/components/SplineEmbed'

export default function SplineScene() {
  return (
    <section data-spline-section aria-label="Interactive 3D">
      <div data-spline-section-bg>
        <SplineEmbed scene="https://prod.spline.design/aXHZql1Yvq98CRIC/scene.splinecode" />
      </div>
      <div data-spline-section-overlay aria-hidden="true" />
      <div data-spline-section-content>
        <span className="label" data-spline-label>Interactive 3D</span>
        <h2 data-spline-heading>
          <span data-shl>Craft that</span>
          <span data-shl>exists in</span>
          <span data-shl data-shl-accent>three dimensions.</span>
        </h2>
        <p data-spline-desc>
          Beyond flat screens — interactive 3D experiences built with Spline, Three.js, and WebGL.
          Every surface, every shadow, every material is a design decision.
        </p>
      </div>
    </section>
  )
}
