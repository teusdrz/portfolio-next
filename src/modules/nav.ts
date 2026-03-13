import { gsap, ScrollTrigger, ScrollSmoother } from '@/lib/gsap-setup'
import { CONFIG } from '@/lib/config'

let isTransitioning = false

function createTransition(targetId: string, _label: string, scrollToTop = false) {
  if (isTransitioning) return
  isTransitioning = true

  const smoother = ScrollSmoother.get()
  const target = scrollToTop ? null : document.querySelector<HTMLElement>(targetId)
  if (!scrollToTop && !target) { isTransitioning = false; return }

  const curtain = document.createElement('div')
  curtain.dataset.navCurtain = ''
  document.body.appendChild(curtain)

  gsap.set(curtain, { yPercent: 100 })

  const tl = gsap.timeline({
    onComplete: () => {
      curtain.remove()
      isTransitioning = false
    },
  })

  // Curtain slides up from bottom covering the screen
  tl.to(curtain, {
    yPercent: 0,
    duration: 0.7,
    ease: 'power4.inOut',
  })

  // Scroll while covered
  tl.add(() => {
    if (smoother) {
      if (scrollToTop) smoother.scrollTo(0, false)
      else if (target) smoother.scrollTo(target, false)
    }
  }, '+=0.05')

  // Curtain continues upward and exits
  tl.to(curtain, {
    yPercent: -100,
    duration: 0.7,
    ease: 'power4.inOut',
  }, '+=0.15')
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
      createTransition(href, '')
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
  const lightSections = document.querySelectorAll<HTMLElement>('[data-hero], [data-panel-reveal], [data-services], [data-process], [data-work-intro]')
  const lightTriggers: ScrollTrigger[] = []
  let lightCount = 0
  let lightOffDelay: ReturnType<typeof gsap.delayedCall> | null = null

  const clearLinkColors = () => {
    links.forEach(link => {
      gsap.set(link, { clearProps: 'color' })
      const span = link.querySelector('span')
      if (span) gsap.set(span, { clearProps: 'color' })
    })
  }

  const applyLight = () => {
    nav.classList.add('is-light')
    clearLinkColors()
    gsap.to('[data-nav-logo] svg', {
      color: 'var(--color-on-light-primary)',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const applyDark = () => {
    nav.classList.remove('is-light')
    clearLinkColors()
    gsap.to('[data-nav-logo] svg', {
      color: 'var(--color-text-primary)',
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

  // Apply is-light immediately if hero is visible on load
  const heroEl = document.querySelector<HTMLElement>('[data-hero]')
  if (heroEl) {
    const heroRect = heroEl.getBoundingClientRect()
    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
      nav.classList.add('is-light')
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
      onEnter: () => link.classList.add('is-active'),
      onLeave: () => link.classList.remove('is-active'),
      onEnterBack: () => link.classList.add('is-active'),
      onLeaveBack: () => link.classList.remove('is-active'),
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
      if (y > lastY + 12 && y > 100 && navVisible) {
        navVisible = false
        gsap.to(nav, { y: -100, duration: 0.35, ease: CONFIG.ease.sharp, overwrite: 'auto' })
      } else if (y < lastY - 8 && !navVisible) {
        navVisible = true
        gsap.to(nav, { y: 0, duration: 0.4, ease: CONFIG.ease.primary, overwrite: 'auto' })
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
