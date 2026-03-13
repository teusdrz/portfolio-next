export default function About() {
  return (
    <section id="about" data-about aria-label="About Matheus">
      {/* ── Intro ── */}
      <div data-about-intro>
        <div data-about-photo>
          <img src="/about-profile.png" alt="Matheus Souza" data-about-photo-img />
        </div>
        <h2 data-about-greeting>
          <span data-aw>HELLO!</span>
        </h2>
        <p data-about-name>
          <span data-aw>I&apos;M MATHEUS SOUZA</span>
        </p>
        <div data-about-label>
          <span data-aw>MY EXPERIENCE</span>
          <svg data-about-arrow aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L5.5 6L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 2L9.5 6L6 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p data-about-description>
          <span data-aw>A FULL STACK SOFTWARE ENGINEER WITH OVER 4 YEARS OF EXPERIENCE IN BUILDING HIGH-PERFORMANCE WEB AND MOBILE APPLICATIONS FOR INTERNATIONAL COMPANIES.</span>
        </p>
      </div>

      {/* ── Divider ── */}
      <hr data-about-divider />

      {/* ── Big headline ── */}
      <div data-about-headline>
        <h3 data-about-headline-text>
          <span data-aw>IT&apos;S NOT JUST A</span><br />
          <span data-aw>PROFESSION</span>
          <span data-about-dash data-aw>&ensp;—&ensp;</span>
          <span data-aw>IT&apos;S A WAY</span><br />
          <span data-aw>OF BUILDING.</span>
        </h3>
      </div>

      {/* ── Work + Philosophy ── */}
      <div data-about-philosophy>
        <p data-about-body>
          <span data-aw>MY WORK IS PART OF MY LIFESTYLE. AS A SOFTWARE ENGINEER, I AM CONSTANTLY OBSERVING THE WORLD: I NOTICE HOW PEOPLE INTERACT WITH TECHNOLOGY, INTERFACES, SYSTEMS.</span>
        </p>
        <div data-about-label>
          <span data-aw>MY PHILOSOPHY</span>
          <svg data-about-arrow aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L5.5 6L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 2L9.5 6L6 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p data-about-body>
          <span data-aw>I VALUE CLARITY, PERFORMANCE, AND FUNCTIONALITY — BOTH IN CODE AND IN LIFE. I AM CLOSE TO THE IDEA OF CONSCIOUS ENGINEERING: LEAVING ONLY WHAT MAKES SENSE AND WORKS FOR RESULTS. I LOVE CLEAN ARCHITECTURES WITH DEEP PURPOSE — AS WELL AS SIMPLE SOLUTIONS THAT BRING REAL IMPACT.</span>
        </p>
      </div>

      {/* ── Lifestyle ── */}
      <div data-about-lifestyle>
        <div data-about-lifestyle-photos>
          <div data-about-lifestyle-photo>
            <img src="/about-lifestyle-1.png" alt="Matheus Souza" />
          </div>
          <div data-about-lifestyle-photo>
            <img src="/about-lifestyle-2.png" alt="Matheus Souza" />
          </div>
        </div>
        <div data-about-lifestyle-right>
          <div data-about-label>
            <span data-aw>MY LIFESTYLE</span>
            <svg data-about-arrow aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L5.5 6L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 2L9.5 6L6 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p data-about-body>
            <span data-aw>I LOOK FOR AESTHETICS EVERYWHERE: IN THE LOGIC OF CODE, IN THE DETAILS OF ARCHITECTURE, IN THE COLORS OF CITY STREETS, AND EVEN IN THE SIMPLE THINGS OF EVERYDAY LIFE. IT&apos;S NOT JUST A HOBBY — IT&apos;S A WAY OF SEEING THE WORLD.</span>
          </p>
          <p data-about-body>
            <span data-aw>EVERY PROJECT FOR ME IS MORE THAN A TASK. IT&apos;S A STORY THAT I HELP TELL THROUGH CODE. I BELIEVE THAT A GOOD APPLICATION IS NOT JUST ABOUT FEATURES AND FRAMEWORKS, BUT ABOUT THE EXPERIENCE IT CREATES.</span>
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div data-about-cta>
        <a data-about-cta-link href="#contact">
          <span>LETS CONTACT</span>
          <svg data-about-cta-arrow aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
