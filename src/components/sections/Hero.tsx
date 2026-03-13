export default function Hero() {
  return (
    <section data-hero aria-label="Introduction">
      <h1 data-hero-bg-text aria-hidden="true">
        <span data-hero-line>Software</span>
        <span data-hero-line>Engineer</span>
        <span data-hero-name>Matheus Vinicius</span>
      </h1>

      <h2 data-hero-manifesto aria-hidden="true">
        <span data-hero-focus>I Have Focus In Result</span>
        <span data-hero-line>I Love Creating</span>
        <span data-hero-line>Ideas And Bringing</span>
        <span data-hero-line>Them To Life</span>
      </h2>

      <div data-hero-meta>
        <span data-hero-role>Front-End Engineer</span>
        <span data-hero-sep aria-hidden="true">—</span>
        <span data-hero-location>São Paulo, BR</span>
      </div>
    </section>
  )
}
