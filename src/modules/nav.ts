import { gsap, ScrollTrigger, ScrollSmoother, SplitText } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

let isTransitioning = false

const NAV_LABELS: Record<string, string> = {
  '#work': 'Work',
  '#about': 'About',
  '#contact': 'Contact',
}

const NAV_INDICES: Record<string, string> = {
  '#hero': '00',
  '#work': '01',
  '#about': '02',
  '#contact': '03',
}

function createTransition(targetId: string, label: string, scrollToTop = false) {
  if (isTransitioning) return
  isTransitioning = true

  const smoother = ScrollSmoother.get()
  const target = scrollToTop ? null : document.querySelector<HTMLElement>(targetId)
  if (!scrollToTop && !target) { isTransitioning = false; return }

  const overlay = document.createElement('div')
  overlay.dataset.navTransition = ''
  document.body.appendChild(overlay)

  const STRIP_COUNT = 6
  const strips: HTMLElement[] = []
  for (let i = 0; i < STRIP_COUNT; i++) {
    const strip = document.createElement('div')
    strip.dataset.navTransitionStrip = ''
    strip.style.transformOrigin = i % 2 === 0 ? 'center top' : 'center bottom'
    overlay.appendChild(strip)
    strips.push(strip)
  }

  const accentBar = document.createElement('div')
  accentBar.dataset.navTransitionAccent = ''
  overlay.appendChild(accentBar)

  const labelWrap = document.createElement('div')
  labelWrap.dataset.navTransitionLabel = ''
  document.body.appendChild(labelWrap)

  const counter = document.createElement('span')
  counter.dataset.navTransitionCounter = ''
  counter.textContent = NAV_INDICES[targetId] || '00'
  labelWrap.appendChild(counter)

  const rule = document.createElement('span')
  rule.dataset.navTransitionRule = ''
  labelWrap.appendChild(rule)

  const textEl = document.createElement('span')
  textEl.dataset.navTransitionText = ''
  textEl.textContent = label
  labelWrap.appendChild(textEl)

  const labelSplit = new SplitText(textEl, { type: 'chars', charsClass: 'char' })

  gsap.set(strips, { scaleY: 0 })
  gsap.set(accentBar, { scaleX: 0, transformOrigin: '0% 50%' })
  gsap.set(counter, { opacity: 0, y: 24, filter: 'blur(6px)' })
  gsap.set(rule, { scaleX: 0, transformOrigin: '0% 50%' })
  gsap.set(labelSplit.chars, {
    y: 140,
    rotateX: -90,
    scale: 0.85,
    opacity: 0,
    transformPerspective: 1200,
    transformOrigin: '50% 100%',
  })

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set('[data-nav]', { y: 0 })
      labelSplit.revert()
      overlay.remove()
      labelWrap.remove()
      isTransitioning = false
    },
  })

  tl
    .to(strips, {
      scaleY: 1,
      duration: 0.6,
      stagger: { each: 0.045, from: 'edges' },
      ease: 'expo.inOut',
    })
    .to(accentBar, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.25')
    .to(counter, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power3.out',
    }, '-=0.35')
    .to(rule, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.out',
    }, '-=0.3')
    .to(labelSplit.chars, {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.025,
      ease: 'power3.out',
    }, '-=0.35')
    .add(() => {
      if (smoother) {
        if (scrollToTop) smoother.scrollTo(0, false)
        else if (target) smoother.scrollTo(target, false)
      }
    }, '+=0.18')
    .to(counter, {
      opacity: 0,
      y: -16,
      filter: 'blur(6px)',
      duration: 0.25,
      ease: 'power2.in',
    }, '+=0.22')
    .to(rule, {
      scaleX: 0,
      transformOrigin: '100% 50%',
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.2')
    .to(labelSplit.chars, {
      y: -100,
      rotateX: 50,
      scale: 0.9,
      opacity: 0,
      duration: 0.35,
      stagger: { each: 0.02, from: 'end' },
      ease: 'power3.in',
    }, '-=0.25')
    .to(accentBar, {
      scaleX: 0,
      transformOrigin: '100% 50%',
      duration: 0.4,
      ease: 'power3.in',
    }, '-=0.2')
    .to(strips, {
      scaleY: 0,
      duration: 0.6,
      stagger: { each: 0.045, from: 'center' },
      ease: 'expo.inOut',
    }, '-=0.2')
}

export function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]')
  if (!nav) return { destroy: () => { } }

  const logo = nav.querySelector<HTMLElement>('[data-nav-logo]')
  const links = nav.querySelectorAll<HTMLElement>('[data-nav-link]')
  const status = nav.querySelector<HTMLElement>('[data-nav-status]')
  const linksEl = nav.querySelector<HTMLElement>('[data-nav-links]')
  const navRight = nav.querySelector<HTMLElement>('[data-nav-right]')
  const currentEl = document.querySelector<HTMLElement>('[data-nav-current]')

  const initialEls = [logo, ...Array.from(links), navRight].filter(Boolean) as HTMLElement[]
  gsap.set(initialEls, { opacity: 0, y: -16 })

  const introTl = gsap.timeline({ delay: 0.2 })
  introTl
    .to(logo, { opacity: 1, y: 0, duration: CONFIG.duration.sm, ease: CONFIG.ease.sharp })
    .to(links, { opacity: 1, y: 0, duration: CONFIG.duration.sm, stagger: 0.06, ease: CONFIG.ease.sharp }, '-=0.2')
    .to(navRight, { opacity: 1, y: 0, duration: CONFIG.duration.sm, ease: CONFIG.ease.sharp }, '-=0.3')

  if (linksEl) {
    const indicator = document.createElement('div')
    indicator.dataset.navIndicator = ''
    linksEl.appendChild(indicator)

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        const rect = link.getBoundingClientRect()
        const parentRect = linksEl.getBoundingClientRect()
        gsap.to(indicator, {
          left: rect.left - parentRect.left,
          width: rect.width,
          duration: 0.4,
          ease: 'power3.out'
        })
      })
    })

    linksEl.addEventListener('mouseleave', () => {
      gsap.to(indicator, { width: 0, duration: 0.3, ease: 'power2.in' })
    })
  }

  const clickListeners: Array<{ el: HTMLElement; fn: (e: Event) => void }> = []

  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (!href || !href.startsWith('#')) return
    const fn = (e: Event) => {
      e.preventDefault()
      createTransition(href, NAV_LABELS[href] || href.replace('#', ''))
    }
    link.addEventListener('click', fn)
    clickListeners.push({ el: link, fn })
  })

  if (logo) {
    const logoFn = (e: Event) => {
      e.preventDefault()
      createTransition('#hero', 'Home', true)
    }
    logo.addEventListener('click', logoFn)
    clickListeners.push({ el: logo, fn: logoFn })
  }

  /* ── Light-section theme toggle ── */
  const lightSections = document.querySelectorAll<HTMLElement>('[data-panel-reveal], [data-services], [data-process], [data-work-intro]')
  const lightTriggers: ScrollTrigger[] = []
  let lightCount = 0
  let lightOffDelay: ReturnType<typeof gsap.delayedCall> | null = null

  const applyLight = () => {
    nav.classList.add('is-light')
    gsap.to('[data-nav-logo] svg', {
      color: 'var(--color-on-light-primary)',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to('[data-nav-link]', {
      color: 'var(--color-on-light-secondary)',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const applyDark = () => {
    nav.classList.remove('is-light')
    gsap.to('[data-nav-logo] svg', {
      color: 'var(--color-text-primary)',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to('[data-nav-link]', {
      color: 'var(--color-text-secondary)',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const setLight = () => {
    lightCount++
    if (lightOffDelay) { lightOffDelay.kill(); lightOffDelay = null }
    if (lightCount === 1) applyLight()
  }

  const unsetLight = () => {
    lightCount = Math.max(0, lightCount - 1)
    if (lightCount === 0) {
      lightOffDelay = gsap.delayedCall(0.08, () => {
        if (lightCount === 0) applyDark()
        lightOffDelay = null
      })
    }
  }

  lightSections.forEach((section) => {
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top-=50 top+=88',
      end: 'bottom+=50 top+=88',
      onEnter: setLight,
      onLeave: unsetLight,
      onEnterBack: setLight,
      onLeaveBack: unsetLight,
    })
    lightTriggers.push(trigger)
  })

  const sections = ['#about', '#work', '#contact']
  const linkMap: Record<string, HTMLElement> = {}
  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (href) linkMap[href] = link
  })

  sections.forEach((id) => {
    const el = document.querySelector<HTMLElement>(id)
    const link = linkMap[id]
    if (!el || !link) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => gsap.to(link, { color: 'var(--color-text-primary)', duration: 0.3 }),
      onLeave: () => gsap.to(link, { color: 'var(--color-text-secondary)', duration: 0.3 }),
      onEnterBack: () => gsap.to(link, { color: 'var(--color-text-primary)', duration: 0.3 }),
      onLeaveBack: () => gsap.to(link, { color: 'var(--color-text-secondary)', duration: 0.3 })
    })
  })

  if (currentEl) {
    const sectionSelectors = [
      { sel: '[data-hero]', num: '01' },
      { sel: '[data-about]', num: '02' },
      { sel: '[data-process]', num: '03' },
      { sel: '[data-work]', num: '04' }
    ]

    sectionSelectors.forEach(({ sel, num }) => {
      const el = document.querySelector<HTMLElement>(sel)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => { currentEl.textContent = num },
        onEnterBack: () => { currentEl.textContent = num }
      })
    })
  }

  let lastY = 0
  let navVisible = true

  const st = ScrollTrigger.create({
    start: 0,
    onUpdate: (self) => {
      const y = self.scroll()
      if (isTransitioning) { lastY = y; navVisible = true; return }
      if (y > 80) {
        nav.classList.add('is-scrolled')
      } else {
        nav.classList.remove('is-scrolled')
      }
      if (y > lastY + 30 && y > 200 && navVisible) {
        navVisible = false
        gsap.to(nav, { y: -88, duration: 0.45, ease: CONFIG.ease.sharp, overwrite: 'auto' })
      } else if (y < lastY - 20 && !navVisible) {
        navVisible = true
        gsap.to(nav, { y: 0, duration: 0.45, ease: CONFIG.ease.primary, overwrite: 'auto' })
      }
      lastY = y
    }
  })

  return {
    destroy: () => {
      introTl.kill()
      st.kill()
      lightTriggers.forEach((t) => t.kill())
      clickListeners.forEach(({ el, fn }) => el.removeEventListener('click', fn))
    }
  }
}
