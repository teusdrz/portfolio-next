import { gsap } from '@/lib/gsap-setup'

export function initServices() {
  const section = document.querySelector<HTMLElement>('[data-services]')
  if (!section) return { destroy: () => { } }

  /* Skip card expand/collapse on mobile */
  if (window.innerWidth <= 430) return { destroy: () => { } }

  const label = section.querySelector<HTMLElement>('[data-services-label]')
  const heading = section.querySelector<HTMLElement>('[data-services-heading]')
  const cardsWrap = section.querySelector<HTMLElement>('[data-services-cards]')
  const cards = section.querySelectorAll<HTMLElement>('[data-service-card]')

  if (!label || !heading || !cardsWrap || !cards.length) return { destroy: () => { } }

  let activeIndex = 0
  let isAnimating = false

  cards.forEach((c, i) => {
    const titleH = c.querySelector<HTMLElement>('[data-service-title-h]')
    const titleV = c.querySelector<HTMLElement>('[data-service-title-v]')
    const content = c.querySelector<HTMLElement>('[data-service-content]')

    if (titleV) {
      gsap.set(titleV, { clearProps: 'transform' })
      gsap.set(titleV, { xPercent: -50, yPercent: -50, rotation: 180 })
    }

    if (i === 0) {
      gsap.set(c, { flexGrow: 2.5 })
      gsap.set(titleH, { opacity: 1, y: 0 })
      if (titleV) gsap.set(titleV, { opacity: 0 })
      if (content) gsap.set(content, { opacity: 1, y: 0 })
    } else {
      gsap.set(c, { flexGrow: 1 })
      gsap.set(titleH, { opacity: 0, y: -20 })
      if (titleV) gsap.set(titleV, { opacity: 1, x: 0 })
      if (content) gsap.set(content, { opacity: 0, y: 30 })
    }
  })

  gsap.set(label, { yPercent: 120 })
  gsap.set(heading, { yPercent: 150 })
  gsap.set(cardsWrap, { yPercent: 100 })

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=80%',
      pin: true,
      scrub: 0.4,
    }
  })

  scrollTl
    .to(label, { yPercent: 0, duration: 0.3, ease: 'none' })
    .to(heading, { yPercent: 0, duration: 0.4, ease: 'none' }, 0.05)
    .to(cardsWrap, { yPercent: 0, duration: 0.5, ease: 'none' }, 0.3)

  function switchCard(newIdx: number) {
    if (newIdx === activeIndex || isAnimating) return
    isAnimating = true

    const oldCard = cards[activeIndex]
    const newCard = cards[newIdx]

    const oldTitleH = oldCard.querySelector('[data-service-title-h]')
    const oldTitleV = oldCard.querySelector('[data-service-title-v]')
    const oldContent = oldCard.querySelector('[data-service-content]')

    const newTitleH = newCard.querySelector('[data-service-title-h]')
    const newTitleV = newCard.querySelector('[data-service-title-v]')
    const newContent = newCard.querySelector('[data-service-content]')

    const tl = gsap.timeline({
      onComplete: () => {
        activeIndex = newIdx
        isAnimating = false
      }
    })

    tl.to(oldContent, {
      opacity: 0, y: 25, duration: 0.3, ease: 'power2.in'
    })

    tl.to(oldTitleH, {
      opacity: 0, y: -15, duration: 0.25, ease: 'power2.in'
    }, '<0.05')

    tl.to(newTitleV, {
      opacity: 0, x: -40, duration: 0.3, ease: 'power2.in'
    }, '<')

    tl.to(oldCard, {
      flexGrow: 1, duration: 0.6, ease: 'power3.inOut'
    }, 0.2)

    tl.to(newCard, {
      flexGrow: 2.5, duration: 0.6, ease: 'power3.inOut'
    }, 0.2)

    tl.set(oldTitleV, { opacity: 0, x: 40 }, 0.45)
    tl.to(oldTitleV, {
      opacity: 1, x: 0, duration: 0.4, ease: 'power2.out'
    }, 0.5)

    tl.set(newTitleH, { opacity: 0, y: -20 }, 0.5)
    tl.to(newTitleH, {
      opacity: 1, y: 0, duration: 0.35, ease: 'power2.out'
    }, 0.55)

    tl.set(newContent, { opacity: 0, y: 30 }, 0.55)
    tl.to(newContent, {
      opacity: 1, y: 0, duration: 0.4, ease: 'power2.out'
    }, 0.6)
  }

  function handleClick(e: Event) {
    const target = e.currentTarget as HTMLElement
    const idx = Number(target.dataset.cardIndex)
    switchCard(idx)
  }

  cards.forEach(c => c.addEventListener('click', handleClick))

  return {
    destroy: () => {
      scrollTl.scrollTrigger?.kill()
      scrollTl.kill()
      cards.forEach(c => c.removeEventListener('click', handleClick))
    }
  }
}
