import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

export function initAbout() {
  const section = document.querySelector<HTMLElement>('[data-about]')
  if (!section) return { destroy: () => { } }

  const triggers: ScrollTrigger[] = []
  const tweens: gsap.core.Tween[] = []
  const timelines: gsap.core.Timeline[] = []

  // ── Intro elements ──
  const photo = section.querySelector<HTMLElement>('[data-about-photo]')
  const introWords = section.querySelectorAll<HTMLElement>('[data-about-intro] [data-aw]')
  const introLabels = section.querySelectorAll<HTMLElement>('[data-about-intro] [data-about-label]')

  // Photo: start clipped (only top ~15% visible) and reveal on scroll
  if (photo) {
    gsap.set(photo, { clipPath: 'inset(0 0 85% 0)', opacity: 1, y: 0 })
  }
  if (introWords.length) gsap.set(introWords, { opacity: 0, y: 20 })
  if (introLabels.length) gsap.set(introLabels, { opacity: 0, y: 10 })

  // Scroll-driven photo reveal
  if (photo) {
    const photoTl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-about-intro]',
        start: 'top 85%',
        end: 'top 20%',
        scrub: 0.6,
      },
    })

    photoTl.to(photo, {
      clipPath: 'inset(0 0 0% 0)',
      ease: 'none',
      duration: 1,
    })

    timelines.push(photoTl)
    if (photoTl.scrollTrigger) triggers.push(photoTl.scrollTrigger)
  }

  // Text appears after photo starts revealing
  triggers.push(
    ScrollTrigger.create({
      trigger: '[data-about-intro]',
      start: 'top 50%',
      once: true,
      onEnter: () => {
        if (introWords.length) {
          tweens.push(
            gsap.to(introWords, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power2.out',
              delay: 0.15,
            })
          )
        }
        if (introLabels.length) {
          tweens.push(
            gsap.to(introLabels, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.5,
            })
          )
        }
      },
    })
  )

  // ── Headline ──
  const headlineWords = section.querySelectorAll<HTMLElement>('[data-about-headline] [data-aw]')
  if (headlineWords.length) {
    gsap.set(headlineWords, { opacity: 0, y: 30 })
    triggers.push(
      ScrollTrigger.create({
        trigger: '[data-about-headline]',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          tweens.push(
            gsap.to(headlineWords, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'power3.out',
            })
          )
        },
      })
    )
  }

  // ── Philosophy ──
  const philWords = section.querySelectorAll<HTMLElement>('[data-about-philosophy] [data-aw]')
  const philLabels = section.querySelectorAll<HTMLElement>('[data-about-philosophy] [data-about-label]')
  if (philWords.length) {
    gsap.set(philWords, { opacity: 0, y: 20 })
    if (philLabels.length) gsap.set(philLabels, { opacity: 0, y: 10 })
    triggers.push(
      ScrollTrigger.create({
        trigger: '[data-about-philosophy]',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          tweens.push(
            gsap.to(philWords, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power2.out',
            })
          )
          if (philLabels.length) {
            tweens.push(
              gsap.to(philLabels, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.3,
              })
            )
          }
        },
      })
    )
  }

  // ── Lifestyle ──
  const lifePhotos = section.querySelectorAll<HTMLElement>('[data-about-lifestyle-photo]')
  const lifeWords = section.querySelectorAll<HTMLElement>('[data-about-lifestyle-right] [data-aw]')
  const lifeLabels = section.querySelectorAll<HTMLElement>('[data-about-lifestyle] [data-about-label]')
  if (lifePhotos.length) {
    gsap.set(lifePhotos, { clipPath: 'inset(0 0 85% 0)', opacity: 1, y: 0 })

    lifePhotos.forEach((lp, i) => {
      const lpTl = gsap.timeline({
        scrollTrigger: {
          trigger: lp,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 0.6,
        },
      })

      lpTl.to(lp, {
        clipPath: 'inset(0 0 0% 0)',
        ease: 'none',
        duration: 1,
        delay: i * 0.1,
      })

      timelines.push(lpTl)
      if (lpTl.scrollTrigger) triggers.push(lpTl.scrollTrigger)
    })
  }
  if (lifeWords.length) gsap.set(lifeWords, { opacity: 0, y: 20 })
  if (lifeLabels.length) gsap.set(lifeLabels, { opacity: 0, y: 10 })

  triggers.push(
    ScrollTrigger.create({
      trigger: '[data-about-lifestyle]',
      start: 'top 50%',
      once: true,
      onEnter: () => {
        if (lifeLabels.length) {
          tweens.push(
            gsap.to(lifeLabels, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.2,
            })
          )
        }
        if (lifeWords.length) {
          tweens.push(
            gsap.to(lifeWords, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power2.out',
              delay: 0.4,
            })
          )
        }
      },
    })
  )

  // ── CTA ──
  const cta = section.querySelector<HTMLElement>('[data-about-cta-link]')
  if (cta) {
    const handleCtaClick = (e: Event) => {
      e.preventDefault()
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
    }
    cta.addEventListener('click', handleCtaClick)

    gsap.set(cta, { opacity: 0, y: 15 })
    triggers.push(
      ScrollTrigger.create({
        trigger: '[data-about-cta]',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          tweens.push(
            gsap.to(cta, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            })
          )
        },
      })
    )

    // store cleanup ref
    const ctaCleanup = () => cta.removeEventListener('click', handleCtaClick)

    return {
      destroy: () => {
        triggers.forEach((st) => st.kill())
        tweens.forEach((tw) => tw.kill())
        timelines.forEach((tl) => { tl.scrollTrigger?.kill(); tl.kill() })
        ctaCleanup()
      },
    }
  }

  return {
    destroy: () => {
      triggers.forEach((st) => st.kill())
      tweens.forEach((tw) => tw.kill())
      timelines.forEach((tl) => { tl.scrollTrigger?.kill(); tl.kill() })
    },
  }
}
