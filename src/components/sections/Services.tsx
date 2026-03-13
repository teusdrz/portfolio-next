const cardBase: React.CSSProperties = {
  position: 'relative',
  background: '#ffffff',
  color: '#1a1a1a',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '0%',
  padding: '1.25rem',
  cursor: 'pointer',
  userSelect: 'none',
}

const cardExpanded: React.CSSProperties = {
  ...cardBase,
  flexGrow: 2.5,
}

const titleV: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotate(180deg)',
  writingMode: 'vertical-rl',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  opacity: 1,
}

const titleVHidden: React.CSSProperties = {
  ...titleV,
  opacity: 0,
}

const contentHidden: React.CSSProperties = {
  opacity: 0,
}

const titleHHidden: React.CSSProperties = {
  opacity: 0,
}

const services = [
  {
    num: '01',
    titleH: <>FRONT END<br />DEV.</>,
    titleVText: 'FRONT END DEV.',
    items: ['React / Next.js', 'TypeScript', 'GSAP / Animations', 'Tailwind CSS', 'Responsive Design', 'Performance Optimization'],
    desc: 'Crafting bold, purposeful interfaces that communicate clearly and leave a lasting impression across all digital touchpoints.',
  },
  {
    num: '02',
    titleH: <>UI/UX<br />DESIGN</>,
    titleVText: 'UI/UX DESIGN',
    items: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing', 'Motion Design'],
    desc: 'Designing intuitive experiences that balance aesthetics with usability, turning complex flows into seamless interactions.',
  },
  {
    num: '03',
    titleH: <>IA<br />ENGINEER</>,
    titleVText: 'IA ENGINEER',
    items: ['Machine Learning', 'LLMs', 'Python / TensorFlow', 'Data Analysis', 'NLP', 'AI Agents'],
    desc: 'Leveraging artificial intelligence to create intelligent solutions that automate and enhance digital products.',
  },
]

export default function Services() {
  return (
    <section data-services>
      <div data-services-header>
        <span data-services-label>SERVICES</span>
        <h2 data-services-heading>WHAT I DO</h2>
      </div>
      <div data-services-cards>
        {services.map((s, i) => (
          <article
            key={i}
            data-service-card
            data-card-index={i}
            style={i === 0 ? cardExpanded : cardBase}
          >
            <span data-service-num>{s.num}</span>
            <h3 data-service-title-h style={i !== 0 ? titleHHidden : undefined}>
              {s.titleH}
            </h3>
            <h3
              data-service-title-v
              aria-hidden="true"
              style={i === 0 ? titleVHidden : titleV}
            >
              {s.titleVText}
            </h3>
            <div data-service-content style={i !== 0 ? contentHidden : undefined}>
              <ul data-service-list>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p data-service-desc>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
