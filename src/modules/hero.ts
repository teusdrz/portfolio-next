import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return { destroy: () => { } }

  const bgText = hero.querySelector<HTMLElement>('[data-hero-bg-text]')
  const manifesto = hero.querySelector<HTMLElement>('[data-hero-manifesto]')
  const bgLines = bgText?.querySelectorAll<HTMLElement>('[data-hero-line]') ?? []
  const manifestoLines = manifesto?.querySelectorAll<HTMLElement>('[data-hero-line]') ?? []
  const scrollIndicator = hero.querySelector<HTMLElement>('[data-hero-scroll-indicator]')
  const heroName = hero.querySelector<HTMLElement>('[data-hero-name]')
  const heroFocus = hero.querySelector<HTMLElement>('[data-hero-focus]')
  const heroMeta = hero.querySelector<HTMLElement>('[data-hero-meta]')

  const splits: InstanceType<typeof SplitText>[] = []
  bgLines.forEach((line) => {
    splits.push(new SplitText(line, { type: 'chars', charsClass: 'char' }))
  })

  const manifestoSplits: InstanceType<typeof SplitText>[] = []
  manifestoLines.forEach((line) => {
    manifestoSplits.push(new SplitText(line, { type: 'chars', charsClass: 'char' }))
  })

  const allChars = splits.flatMap((s) => s.chars as HTMLElement[])
  const manifestoChars = manifestoSplits.flatMap((s) => s.chars as HTMLElement[])

  gsap.set(allChars, {
    y: '115%',
    opacity: 0,
    rotateX: -90,
    transformPerspective: 1400,
    transformOrigin: '0% 50% -30px',
    willChange: 'transform, opacity',
  })
  gsap.set(manifestoChars, {
    y: '115%',
    opacity: 0,
    rotateX: -90,
    transformPerspective: 1400,
    transformOrigin: '100% 50% -30px',
    willChange: 'transform, opacity',
  })
  gsap.set(scrollIndicator, { opacity: 0, y: 20 })
  gsap.set(heroName, { opacity: 0, y: 10 })
  gsap.set(heroFocus, { opacity: 0, y: 10 })
  gsap.set(heroMeta, { opacity: 0, y: 8 })

  const tl = gsap.timeline({
    delay: 0.15,
    onComplete: () => {
      gsap.set(allChars, { willChange: 'auto', clearProps: 'willChange' })
    },
  })

  tl.to(allChars, {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    duration: CONFIG.duration.xl,
    stagger: { each: CONFIG.stagger.chars, from: 'random' },
    ease: 'primary',
  })
    .to(manifestoChars, {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: CONFIG.duration.xl,
      stagger: { each: CONFIG.stagger.chars, from: 'random' },
      ease: 'primary',
    }, '-=1.0')
    .to(heroFocus, { opacity: 1, y: 0, duration: CONFIG.duration.md, ease: CONFIG.ease.organic }, '-=0.9')
    .to(heroName, { opacity: 1, y: 0, duration: CONFIG.duration.md, ease: CONFIG.ease.organic }, '-=0.8')
    .to(heroMeta, { opacity: 1, y: 0, duration: CONFIG.duration.md, ease: CONFIG.ease.organic }, '-=0.5')
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

  const setIndicatorOpacity = gsap.quickSetter(scrollIndicator, 'opacity')

  const parallaxST = ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: '40% top',
    scrub: 0.3,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress
      if (scrollIndicator) setIndicatorOpacity(Math.max(0, 1 - p * 4))
    },
  })

  const onMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14
    const y = (e.clientY / window.innerHeight - 0.5) * 10
    if (bgText) gsap.to(bgText, { x, y, duration: 1.4, ease: 'power2.out' })
    if (manifesto) gsap.to(manifesto, { x: -x * 0.6, y: -y * 0.4, duration: 1.6, ease: 'power2.out' })
    if (heroName) gsap.to(heroName, { x: -x * 0.3, y: -y * 0.3, duration: 1.2, ease: 'power2.out' })
  }
  window.addEventListener('mousemove', onMouseMove)

  return {
    destroy: () => {
      tl.kill()
      splits.forEach((s) => s.revert())
      manifestoSplits.forEach((s) => s.revert())
      parallaxST.kill()
      scrollLineTween?.kill()
      scrollLineST?.kill()
      window.removeEventListener('mousemove', onMouseMove)
    },
  }
}
