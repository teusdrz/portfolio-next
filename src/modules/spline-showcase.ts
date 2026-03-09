import { gsap, ScrollTrigger } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

export function initSplineShowcase() {
  const section = document.querySelector<HTMLElement>('[data-spline-showcase]')
  const canvas = document.querySelector<HTMLCanvasElement>('[data-showcase-canvas]')
  if (!section || !canvas) return { destroy: () => {} }

  const tag = section.querySelector<HTMLElement>('[data-spline-tag]')
  const desc = section.querySelector<HTMLElement>('[data-spline-desc]')
  const ui = section.querySelector<HTMLElement>('[data-spline-showcase-ui]')

  gsap.set([tag, desc].filter(Boolean) as HTMLElement[], { y: 30, opacity: 0 })
  gsap.set(canvas, { opacity: 0 })

  let splineApp: { load: (url: string) => Promise<void> } | null = null

  async function load() {
    try {
      const { Application } = await import('@splinetool/runtime')
      splineApp = new Application(canvas!)
      await splineApp.load('https://prod.spline.design/8OJ-IHnnocksSG4a/scene.splinecode')
      gsap.to(canvas, { opacity: 1, duration: 1.6, ease: 'power2.out' })
    } catch {
      gsap.set(canvas, { display: 'none' })
    }
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      load()
      gsap.to([tag, desc].filter(Boolean) as HTMLElement[], {
        y: 0,
        opacity: 1,
        duration: CONFIG.duration.md,
        stagger: 0.12,
        ease: CONFIG.ease.sharp,
        delay: 0.3
      })
    }
  })

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(canvas, {
        scale: 1 + self.progress * 0.08,
        opacity: 1 - self.progress * 0.7
      })
      if (ui) gsap.set(ui, { opacity: 1 - self.progress * 3, y: self.progress * -40 })
    }
  })

  const onMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 12
    gsap.to(canvas, { x, y, duration: 1.4, ease: 'power2.out' })
  }
  window.addEventListener('mousemove', onMove)

  const scrollLine = section.querySelector<HTMLElement>('[data-spline-scroll-line]')
  if (scrollLine) {
    gsap.fromTo(
      scrollLine,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.5, repeat: -1, ease: 'power2.inOut', delay: 2 }
    )
  }

  return {
    destroy: () => {
      window.removeEventListener('mousemove', onMove)
      splineApp = null
    }
  }
}
