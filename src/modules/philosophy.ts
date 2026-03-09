import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

export function initPhilosophy() {
  const section = document.querySelector<HTMLElement>('[data-philosophy]')
  if (!section) return { destroy: () => {} }

  const words = section.querySelectorAll<HTMLElement>('[data-pw]')
  const flash = section.querySelector<HTMLElement>('[data-philosophy-flash]')

  if (flash) {
    gsap.set(flash, { opacity: 0, pointerEvents: 'none' })
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.timeline()
          .to(flash, { opacity: 1, duration: 0.14, ease: 'power4.out' })
          .to(flash, { opacity: 0, duration: 0.5, ease: 'power2.in' })
        section.classList.add('is-active')
      }
    })
  }

  gsap.set(words, { opacity: 0.08 })

  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress
      const total = words.length
      words.forEach((word, i) => {
        const wp = gsap.utils.clamp(0, 1, (p * (total + 4) - i) / 2)
        const opacity = gsap.utils.clamp(0.08, 1, wp)
        gsap.set(word, { opacity, y: gsap.utils.clamp(0, 14, 14 - wp * 14) })
        if (wp > 0.6) {
          word.classList.add('is-lit')
        } else {
          word.classList.remove('is-lit')
        }
      })
    }
  })

  return { destroy: () => {} }
}
