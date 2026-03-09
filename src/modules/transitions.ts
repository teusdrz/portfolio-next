import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

const triggers: ScrollTrigger[] = []
const timelines: gsap.core.Timeline[] = []

function depthExit(section: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'bottom bottom',
      end: '+=50%',
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  })

  tl.to(section, {
    scale: 0.92,
    opacity: 0,
    filter: 'blur(6px)',
    transformOrigin: 'center center',
    ease: 'none',
  })

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
  const process = document.querySelector<HTMLElement>('[data-process]')
  const work = document.querySelector<HTMLElement>('[data-work]')
  const contact = document.querySelector<HTMLElement>('[data-contact]')

  if (hero) depthExit(hero)

  if (about) parallaxLift(about)

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
