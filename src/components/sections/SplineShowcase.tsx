export default function SplineShowcase() {
  return (
    <section data-spline-showcase aria-label="3D Interactive">
      <div data-spline-showcase-bg aria-hidden="true"></div>
      <div data-spline-showcase-content>
        <canvas data-showcase-canvas></canvas>
      </div>
      <div data-spline-showcase-ui>
        <div data-spline-showcase-left>
          <span className="label" data-spline-tag>Interactive 3D</span>
          <p data-spline-desc>Drag. Rotate. Explore.</p>
        </div>
        <div data-spline-showcase-right>
          <span className="label">Built with Spline</span>
        </div>
      </div>
      <div data-spline-scroll-hint aria-hidden="true">
        <div data-spline-scroll-line></div>
      </div>
    </section>
  )
}
