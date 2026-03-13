import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

const triggers: ScrollTrigger[] = []
const timelines: gsap.core.Timeline[] = []

function heroAboutConnection(hero: HTMLElement, about: HTMLElement) {
  const aboutWatermark = about.querySelector<HTMLElement>('[data-about-watermark]')

  if (!aboutWatermark) return

  const watermarkBridgeST = ScrollTrigger.create({
    trigger: about,
    start: 'top 90%',
    end: 'top 30%',
    scrub: 1.2,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress
      if (aboutWatermark) {
        gsap.set(aboutWatermark, {
          opacity: gsap.utils.clamp(0, 0.032, p * 0.032),
        })
      }
    },
  })

  triggers.push(watermarkBridgeST)
}

function cameraDepthTransition(exitSection: HTMLElement, enterSection: HTMLElement) {
  gsap.set(enterSection, {
    clipPath: 'inset(100% 0% 0% 0%)',
    y: 60,
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: exitSection,
      start: 'bottom 80%',
      end: 'bottom 15%',
      scrub: 1.4,
      invalidateOnRefresh: true,
    },
  })

  tl.to(
    exitSection,
    {
      scale: 0.88,
      opacity: 0.2,
      transformOrigin: 'center top',
      ease: 'none',
    },
    0,
  )

  tl.to(
    enterSection,
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      ease: 'none',
    },
    0,
  )

  timelines.push(tl)
  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
}

function clipReveal(section: HTMLElement) {
  gsap.set(section, {
    clipPath: 'inset(12% 8% 12% 8% round 1.5rem)',
    scale: 0.94,
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      end: 'top 20%',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.to(section, {
    clipPath: 'inset(0% 0% 0% 0% round 0rem)',
    scale: 1,
    ease: 'none',
  })

  timelines.push(tl)
  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
}

function horizontalWipe(section: HTMLElement) {
  gsap.set(section, {
    clipPath: 'inset(0 100% 0 0)',
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 25%',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.to(section, {
    clipPath: 'inset(0 0% 0 0)',
    ease: 'none',
  })

  timelines.push(tl)
  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
}

function parallaxLift(section: HTMLElement) {
  gsap.set(section, { y: 120, opacity: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 95%',
      end: 'top 40%',
      scrub: 1.4,
      invalidateOnRefresh: true,
    },
  })

  tl.to(section, { y: 0, opacity: 1, ease: 'none' })

  timelines.push(tl)
  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
}

function scaleReveal(section: HTMLElement) {
  gsap.set(section, {
    scale: 0.85,
    opacity: 0,
    transformOrigin: 'center bottom',
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      end: 'top 30%',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.to(section, { scale: 1, opacity: 1, ease: 'none' })

  timelines.push(tl)
  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
}

export function initTransitions() {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  const about = document.querySelector<HTMLElement>('[data-about]')
  const panelReveal = document.querySelector<HTMLElement>('[data-panel-reveal]')
  const process = document.querySelector<HTMLElement>('[data-process]')
  const work = document.querySelector<HTMLElement>('[data-work]')
  const contact = document.querySelector<HTMLElement>('[data-contact]')

  if (hero && about) {
    heroAboutConnection(hero, about)
  }

  if (process) horizontalWipe(process)

  if (work) clipReveal(work)

  if (contact) parallaxLift(contact)

  return {
    destroy: () => {
      triggers.forEach((st) => st.kill())
      timelines.forEach((tl) => tl.kill())
      triggers.length = 0
      timelines.length = 0
    },
  }
}
