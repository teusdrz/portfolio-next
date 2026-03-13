export default function Nav() {
  return (
    <nav data-nav aria-label="Primary navigation">
      <a href="/" data-nav-logo data-magnetic aria-label="Matheus Vinicius — Home">
        <svg width="44" height="36" viewBox="0 0 44 36" fill="none" aria-hidden="true">
          <path d="M2 2 L11 18 L22 4 L33 18 L42 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
          <path d="M11 18 L22 34 L33 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
      </a>
      <ul data-nav-links role="list">
        <li><a href="#work" data-nav-link data-magnetic><span data-text="Work">Work</span></a></li>
        <li><a href="#about" data-nav-link data-magnetic><span data-text="About">About</span></a></li>
        <li><a href="#contact" data-nav-link data-magnetic><span data-text="Contact">Contact</span></a></li>
      </ul>
    </nav>
  )
}
