import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

async function loadSpline(canvas: HTMLCanvasElement) {
  try {
    const { Application } = await import('@splinetool/runtime')
    const splineApp = new Application(canvas)
    canvas.style.opacity = '0'
    await splineApp.load('https://prod.spline.design/Z2eciCXPcMVzZt65/scene.splinecode')
    gsap.to(canvas, { opacity: 1, duration: 1.4, ease: 'power2.out', delay: 0.2 })
    return splineApp
  } catch {
    return null
  }
}

export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return { destroy: () => { } }

  const canvas = hero.querySelector<HTMLCanvasElement>('[data-spline-canvas]')
  const bgText = hero.querySelector<HTMLElement>('[data-hero-bg-text]')
  const lines = hero.querySelectorAll<HTMLElement>('[data-hero-line]')
  const scrollIndicator = hero.querySelector<HTMLElement>('[data-hero-scroll-indicator]')
  const splineWrap = hero.querySelector<HTMLElement>('[data-hero-canvas-wrap]')

  const splits: InstanceType<typeof SplitText>[] = []
  lines.forEach((line) => {
    splits.push(new SplitText(line, { type: 'chars', charsClass: 'char' }))
  })

  const allChars = splits.flatMap((s) => s.chars)

  gsap.set(allChars, {
    y: '115%',
    opacity: 0,
    rotateX: -90,
    transformPerspective: 800,
    transformOrigin: '0% 50% -30px',
    willChange: 'transform, opacity',
  })
  gsap.set(scrollIndicator, { opacity: 0, y: 20 })
  if (splineWrap) gsap.set(splineWrap, { opacity: 0, scale: 0.95, willChange: 'transform, opacity' })

  const tl = gsap.timeline({
    delay: 0.15,
    onComplete: () => {
      gsap.set(allChars, { willChange: 'auto', clearProps: 'willChange' })
    }
  })

  tl.to(
    allChars,
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: CONFIG.duration.xl,
      stagger: { each: CONFIG.stagger.chars, from: 'start' },
      ease: 'primary',
    }
  )
    .to(splineWrap, { opacity: 1, scale: 1, duration: CONFIG.duration.lg, ease: CONFIG.ease.organic }, '-=0.6')
    .to(scrollIndicator, { opacity: 1, duration: CONFIG.duration.md, ease: CONFIG.ease.organic }, '-=0.3')

  const scrollLine = hero.querySelector<HTMLElement>('[data-scroll-line]')
  let scrollLineTween: gsap.core.Tween | null = null
  let scrollLineST: ScrollTrigger | null = null
  if (scrollLine) {
    scrollLineST = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => {
        if (!scrollLineTween) {
          scrollLineTween = gsap.fromTo(
            scrollLine,
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 1.5, repeat: -1, ease: 'power2.inOut', delay: 2.5 }
          )
        } else {
          scrollLineTween.play()
        }
      },
      onLeave: () => { scrollLineTween?.pause() },
      onEnterBack: () => { scrollLineTween?.play() },
      onLeaveBack: () => { scrollLineTween?.pause() },
    })
  }

  const parallaxST = ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: '80% top',
    scrub: 0.6,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress
      if (bgText) {
        gsap.set(bgText, { y: p * 40, opacity: Math.max(0, 0.12 - p * 0.2) })
      }
      if (splineWrap) {
        gsap.set(splineWrap, { y: p * -60, scale: 1 - p * 0.08, opacity: Math.max(0, 1 - p * 1.4) })
      }
    },
  })

  const onMouseMove = (e: MouseEvent) => {
    if (!splineWrap) return
    const x = (e.clientX / window.innerWidth - 0.5) * 22
    const y = (e.clientY / window.innerHeight - 0.5) * 16
    gsap.to(splineWrap, { x, y, duration: 1.2, ease: 'power2.out' })
  }
  window.addEventListener('mousemove', onMouseMove)

  let splineApp: Awaited<ReturnType<typeof loadSpline>> = null
  if (canvas) {
    loadSpline(canvas).then((app) => { splineApp = app })
  }

  return {
    destroy: () => {
      tl.kill()
      splits.forEach((s) => s.revert())
      parallaxST.kill()
      scrollLineTween?.kill()
      scrollLineST?.kill()
      window.removeEventListener('mousemove', onMouseMove)
      splineApp?.dispose()
      splineApp = null
    },
  }
}
