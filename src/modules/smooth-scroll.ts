import { ScrollTrigger, ScrollSmoother } from '@/lib/gsap-setup'

let smoother: ReturnType<typeof ScrollSmoother.create> | undefined

export function initScroll() {
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.8,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true
  })

  ScrollTrigger.config({ ignoreMobileResize: true })

  return {
    smoother,
    destroy: () => {
      smoother?.kill()
    }
  }
}
