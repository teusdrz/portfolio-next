import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

export function initSplineScene() {
  const section = document.querySelector<HTMLElement>('[data-spline-section]')
  if (!section) return { destroy: () => { } }

  const spans = section.querySelectorAll<HTMLElement>('[data-shl]')
  const label = section.querySelector<HTMLElement>('[data-spline-label]')
  const desc = section.querySelector<HTMLElement>('[data-spline-desc]')
  const bg = section.querySelector<HTMLElement>('[data-spline-section-bg]')
  const overlay = section.querySelector<HTMLElement>('[data-spline-section-overlay]')

  const splits: InstanceType<typeof SplitText>[] = []
  spans.forEach((span) => {
    splits.push(new SplitText(span, { type: 'chars', charsClass: 'char' }))
  })
  const allChars = splits.flatMap((s) => s.chars)

  gsap.set(allChars, { y: '110%', opacity: 0, rotateX: -80, transformPerspective: 800, transformOrigin: '50% 100% -20px', willChange: 'transform, opacity' })
  gsap.set(label, { opacity: 0, y: 16 })
  gsap.set(desc, { opacity: 0, y: 24 })
  if (bg) gsap.set(bg, { scale: 1.1, opacity: 0 })
  if (overlay) gsap.set(overlay, { opacity: 0 })

  const enterTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      toggleActions: 'play none none none',
      once: true,
    },
  })

  enterTl
    .to(bg, { scale: 1, opacity: 1, duration: CONFIG.duration.xxl, ease: CONFIG.ease.cinematic }, 0)
    .to(overlay, { opacity: 1, duration: CONFIG.duration.lg, ease: CONFIG.ease.primary }, 0.2)
    .to(label, { opacity: 1, y: 0, duration: CONFIG.duration.sm, ease: CONFIG.ease.sharp }, 0.6)
    .to(
      allChars,
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: CONFIG.duration.xl,
        stagger: { each: 0.028, from: 'start' },
        ease: 'primary',
        onComplete: () => {
          gsap.set(allChars, { clearProps: 'willChange' })
        }
      },
      0.7
    )
    .to(desc, { opacity: 1, y: 0, duration: CONFIG.duration.md, ease: CONFIG.ease.primary }, '-=0.6')

  const parallaxST = ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.2,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress
      if (bg) gsap.set(bg, { yPercent: p * 15 })
    },
  })

  const headingLines = section.querySelectorAll<HTMLElement>('[data-shl]')

  const onMove = (e: MouseEvent) => {
    const rect = section.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    headingLines.forEach((line, i) => {
      const depth = (i + 1) * 0.3
      gsap.to(line, {
        x: cx * 12 * depth,
        y: cy * 6 * depth,
        duration: 1.0,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    })
  }

  const onLeave = () => {
    gsap.to(headingLines, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
  }

  section.addEventListener('mousemove', onMove)
  section.addEventListener('mouseleave', onLeave)

  return {
    destroy: () => {
      enterTl.kill()
      parallaxST.kill()
      splits.forEach((s) => s.revert())
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    },
  }
}
