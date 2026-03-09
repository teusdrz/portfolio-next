import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

interface SlideData {
  el: HTMLElement
  numBg: HTMLElement | null
  label: HTMLElement | null
  line: HTMLElement | null
  desc: HTMLElement | null
  items: HTMLElement[]
  split: InstanceType<typeof SplitText> | null
}

export function initProcess() {
  const section = document.querySelector<HTMLElement>('[data-process]')
  if (!section) return { destroy: () => { } }

  const clip = section.querySelector<HTMLElement>('[data-process-clip]')
  const barLeft = section.querySelector<HTMLElement>('[data-process-accent-bar-left]')
  const barRight = section.querySelector<HTMLElement>('[data-process-accent-bar-right]')
  const slides = gsap.utils.toArray<HTMLElement>('[data-process-slide]')
  const navFill = section.querySelector<HTMLElement>('[data-process-nav-fill]')
  const dots = gsap.utils.toArray<HTMLElement>('[data-process-dot]')
  const counterEl = section.querySelector<HTMLElement>('[data-process-counter-current]')
  const progressFill = section.querySelector<HTMLElement>('[data-process-progress-fill]')

  if (slides.length < 2 || !clip) return { destroy: () => { } }

  const numSlides = slides.length
  const scrollPerTransition = window.innerHeight * 1.2

  const clipTrigger = ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    end: 'top 5%',
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress
      const eased = gsap.parseEase('power3.inOut')(p)
      const inset = gsap.utils.interpolate(42, 0, eased)
      const radius = gsap.utils.interpolate(20, 0, eased)
      clip.style.clipPath = `inset(${inset}% round ${radius}px)`
    }
  })

  const barTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 40%',
      toggleActions: 'play none none none',
      once: true
    }
  })

  barTl.to([barLeft, barRight], {
    opacity: 0.4,
    scaleY: 1,
    duration: CONFIG.duration.xxl,
    ease: CONFIG.ease.primary
  })

  const slideData: SlideData[] = slides.map((slide) => {
    const title = slide.querySelector<HTMLElement>('[data-slide-title]')
    let split: InstanceType<typeof SplitText> | null = null
    if (title) {
      split = new SplitText(title, { type: 'chars', charsClass: 'char' })
    }
    return {
      el: slide,
      numBg: slide.querySelector('[data-slide-num-bg]'),
      label: slide.querySelector('[data-slide-label]'),
      line: slide.querySelector('[data-slide-accent-line]'),
      desc: slide.querySelector('[data-slide-desc]'),
      items: gsap.utils.toArray(slide.querySelectorAll('[data-slide-item]')),
      split,
    }
  })

  slideData.forEach((data, i) => {
    gsap.set(data.el, { autoAlpha: i === 0 ? 1 : 0 })
    if (data.split) {
      gsap.set(data.split.chars, {
        y: '120%',
        opacity: 0,
        rotateX: -90,
        transformPerspective: 800,
        transformOrigin: '50% 100%',
      })
    }
    if (data.label) gsap.set(data.label, { opacity: 0, x: -20 })
    if (data.line) gsap.set(data.line, { scaleX: 0 })
    if (data.desc) gsap.set(data.desc, { opacity: 0, y: 30 })
    if (data.items.length) gsap.set(data.items, { opacity: 0, x: -16 })
    if (data.numBg) gsap.set(data.numBg, { opacity: 0, scale: 0.85 })
  })

  if (dots[0]) dots[0].classList.add('is-active')

  const s0 = slideData[0]
  const enterTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      toggleActions: 'play none none none',
      once: true,
    },
  })

  enterTl
    .to(s0.numBg, { opacity: 1, scale: 1, duration: CONFIG.duration.xl, ease: CONFIG.ease.cinematic }, 0)
    .to(s0.label, { opacity: 1, x: 0, duration: CONFIG.duration.sm, ease: CONFIG.ease.sharp }, 0)
    .to(s0.line, { scaleX: 1, duration: CONFIG.duration.md, ease: CONFIG.ease.primary }, 0.1)
    .to(s0.split?.chars || [], {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: CONFIG.duration.xl,
      stagger: { each: 0.03, from: 'start' },
      ease: 'primary',
    }, 0.1)
    .to(s0.desc, { opacity: 1, y: 0, duration: CONFIG.duration.md, ease: CONFIG.ease.primary }, 0.4)
    .to(s0.items, { opacity: 1, x: 0, stagger: 0.06, duration: CONFIG.duration.sm, ease: CONFIG.ease.primary }, 0.5)

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 0.5,
      start: 'top top',
      end: () => `+=${(numSlides - 1) * scrollPerTransition}`,
      anticipatePin: 1,
      snap: {
        snapTo: 1 / (numSlides - 1),
        duration: { min: 0.25, max: 0.6 },
        ease: 'power2.inOut',
      },
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (navFill) gsap.set(navFill, { height: `${self.progress * 100}%` })
        const activeIndex = Math.round(self.progress * (numSlides - 1))
        dots.forEach((dot, i) => {
          if (i <= activeIndex) {
            dot.classList.add('is-active')
          } else {
            dot.classList.remove('is-active')
          }
        })
        if (counterEl) {
          const current = self.progress === 0
            ? 1
            : Math.min(Math.ceil(self.progress * numSlides), numSlides)
          counterEl.textContent = String(current).padStart(2, '0')
        }
      },
    },
  })

  if (progressFill) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${(numSlides - 1) * scrollPerTransition}`,
      scrub: 0.3,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(progressFill, { width: `${self.progress * 100}%` })
      }
    })
  }

  for (let i = 0; i < numSlides - 1; i++) {
    const curr = slideData[i]
    const next = slideData[i + 1]
    const tl = gsap.timeline()

    tl.to(curr.split?.chars || [], {
      y: '-120%',
      opacity: 0,
      rotateX: 90,
      stagger: { each: 0.012, from: 'end' },
      duration: 0.45,
      ease: 'power3.in',
    }, 0)
    tl.to(curr.label, { opacity: 0, x: -16, duration: 0.2, ease: 'power2.in' }, 0)
    tl.to(curr.line, { scaleX: 0, duration: 0.25, ease: 'power2.in' }, 0)
    tl.to(curr.desc, { opacity: 0, y: -24, duration: 0.3, ease: 'power2.in' }, 0.05)
    tl.to(curr.items, { opacity: 0, x: -16, stagger: 0.02, duration: 0.25, ease: 'power2.in' }, 0.05)
    tl.to(curr.numBg, { opacity: 0, scale: 1.12, duration: 0.35, ease: 'power2.in' }, 0)
    tl.set(curr.el, { autoAlpha: 0 })

    tl.set(next.el, { autoAlpha: 1 })
    tl.to(next.numBg, { opacity: 1, scale: 1, duration: 0.5, ease: CONFIG.ease.cinematic }, 0.45)
    tl.to(next.label, { opacity: 1, x: 0, duration: 0.3, ease: CONFIG.ease.sharp }, 0.5)
    tl.to(next.line, { scaleX: 1, duration: 0.35, ease: CONFIG.ease.primary }, 0.5)
    tl.to(next.split?.chars || [], {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      stagger: { each: 0.025, from: 'start' },
      duration: 0.55,
      ease: 'primary',
    }, 0.5)
    tl.to(next.desc, { opacity: 1, y: 0, duration: 0.4, ease: CONFIG.ease.primary }, 0.7)
    tl.to(next.items, { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, ease: CONFIG.ease.primary }, 0.75)

    master.add(tl)
  }

  return {
    destroy: () => {
      clipTrigger.kill()
      barTl.scrollTrigger?.kill()
      barTl.kill()
      enterTl.scrollTrigger?.kill()
      enterTl.kill()
      master.scrollTrigger?.kill()
      master.kill()
      slideData.forEach((d) => d.split?.revert())
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section && st !== clipTrigger) st.kill()
      })
    },
  }
}
