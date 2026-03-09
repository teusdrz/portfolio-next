export default function Hero() {
  return (
    <section data-hero aria-label="Introduction">
      <h1 data-hero-bg-text aria-hidden="true">
        <span data-hero-line>Front</span>
        <span data-hero-line>Engineer</span>
      </h1>
      <div data-hero-canvas-wrap>
        <canvas data-spline-canvas />
      </div>
    </section>
  )
}
