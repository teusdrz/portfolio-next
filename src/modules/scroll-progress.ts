import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

export function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]')
  if (!bar) return { destroy: () => {} }

  gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

  const st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      gsap.set(bar, { scaleX: self.progress })
    }
  })

  return {
    destroy: () => { st.kill() }
  }
}
