import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

const STATES = {
  DEFAULT: 'default',
  VIEW: 'view',
  MAGNETIC: 'magnetic',
  EMAIL: 'email',
  HIDDEN: 'hidden'
}

export function initCursor() {
  const cursor = document.querySelector<HTMLElement>('[data-cursor]')
  const dot = document.querySelector<HTMLElement>('[data-cursor-dot]')
  const label = document.querySelector<HTMLElement>('[data-cursor-label]')

  if (!cursor || !dot) return { destroy: () => {} }

  gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })
  gsap.set(dot, { xPercent: -50, yPercent: -50 })
  if (label) gsap.set(label, { xPercent: -50, yPercent: -50, opacity: 0 })

  const qX = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' })
  const qY = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' })
  const qdX = gsap.quickTo(dot, 'x', { duration: 0.08 })
  const qdY = gsap.quickTo(dot, 'y', { duration: 0.08 })
  const qlX = label ? gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3' }) : null
  const qlY = label ? gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3' }) : null

  let state = STATES.HIDDEN
  let hasMoved = false

  const setState = (newState: string, labelText?: string) => {
    if (state === newState) return
    state = newState

    if (newState === STATES.HIDDEN) {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.3 })
      if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
      return
    }

    if (newState === STATES.DEFAULT) {
      gsap.to(cursor, { scale: 1, opacity: 1, width: 44, height: 44, backgroundColor: 'transparent', borderColor: 'oklch(94% 0.008 80 / 0.35)', duration: 0.35, ease: 'power3.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
      if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
    }

    if (newState === STATES.VIEW) {
      gsap.to(cursor, { scale: 2.4, opacity: 1, backgroundColor: 'oklch(94% 0.008 80)', borderColor: 'transparent', duration: 0.4, ease: 'power3.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
      if (label) {
        label.textContent = labelText || 'VIEW'
        gsap.to(label, { opacity: 1, duration: 0.3 })
      }
    }

    if (newState === STATES.EMAIL) {
      gsap.to(cursor, { scale: 3, opacity: 1, backgroundColor: 'var(--color-accent)', borderColor: 'transparent', duration: 0.4, ease: 'power3.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
      if (label) {
        label.textContent = '\u2709'
        gsap.to(label, { opacity: 1, duration: 0.3 })
      }
    }

    if (newState === STATES.MAGNETIC) {
      gsap.to(cursor, { scale: 2, opacity: 1, backgroundColor: 'transparent', borderColor: 'oklch(94% 0.008 80 / 0.6)', duration: 0.35, ease: 'power3.out' })
      gsap.to(dot, { scale: 1.5, duration: 0.3 })
      if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
    }
  }

  const onMove = ({ clientX, clientY }: MouseEvent) => {
    if (!hasMoved) {
      hasMoved = true
      setState(STATES.DEFAULT)
    }
    qX(clientX)
    qY(clientY)
    qdX(clientX)
    qdY(clientY)
    if (qlX) qlX(clientX)
    if (qlY) qlY(clientY)
  }

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((el) => {
    el.addEventListener('mouseenter', () => setState(STATES.VIEW, 'VIEW'))
    el.addEventListener('mouseleave', () => setState(STATES.DEFAULT))
  })

  document.querySelectorAll<HTMLElement>('[data-contact-email]').forEach((el) => {
    el.addEventListener('mouseenter', () => setState(STATES.EMAIL))
    el.addEventListener('mouseleave', () => setState(STATES.DEFAULT))
  })

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    let bounds: DOMRect | null = null
    let active = false

    const enter = () => {
      active = true
      bounds = el.getBoundingClientRect()
      setState(STATES.MAGNETIC)
    }

    const move = ({ clientX, clientY }: MouseEvent) => {
      if (!active || !bounds) return
      bounds = el.getBoundingClientRect()
      const cx = bounds.left + bounds.width / 2
      const cy = bounds.top + bounds.height / 2
      const dx = (clientX - cx) * 0.38
      const dy = (clientY - cy) * 0.38
      gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: 'power3.out' })
    }

    const leave = () => {
      active = false
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      setState(STATES.DEFAULT)
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
  })

  document.addEventListener('mouseleave', () => setState(STATES.HIDDEN))
  document.addEventListener('mouseenter', () => { if (hasMoved) setState(STATES.DEFAULT) })
  window.addEventListener('mousemove', onMove)

  const sectionStates = [
    { selector: '[data-about]', scale: 1.2 },
    { selector: '[data-process]', scale: 1.4 },
    { selector: '[data-work]', scale: 1 },
    { selector: '[data-contact]', scale: 1.2 }
  ]

  sectionStates.forEach(({ selector, scale }) => {
    const sectionEl = document.querySelector<HTMLElement>(selector)
    if (!sectionEl) return
    ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(cursor, { scale, duration: 0.4, ease: 'power3.out' })
      },
      onLeave: () => {
        gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'power3.out' })
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
      },
      onEnterBack: () => {
        gsap.to(cursor, { scale, duration: 0.4, ease: 'power3.out' })
      },
      onLeaveBack: () => {
        gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'power3.out' })
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
      }
    })
  })

  return {
    destroy: () => window.removeEventListener('mousemove', onMove)
  }
}
