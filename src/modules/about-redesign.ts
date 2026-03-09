import { gsap, SplitText } from '@/lib/gsap-setup'

export function initAbout() {
  const text = document.querySelector<HTMLElement>('[data-about-text]')
  if (!text) return { destroy: () => { } }

  const split = new SplitText(text, { type: 'chars', charsClass: 'char' })

  gsap.set(split.chars, {
    opacity: 0,
    y: 40,
    rotateX: -90,
    transformOrigin: '50% 50% -20px',
  })

  gsap.to(split.chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.8,
    stagger: 0.02,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '[data-about]',
      start: 'top 70%',
      toggleActions: 'play none none none',
      once: true,
    },
  })

  const handleEnter = (e: Event) => {
    gsap.to(e.currentTarget, {
      color: 'var(--color-accent)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleLeave = (e: Event) => {
    gsap.to(e.currentTarget, {
      color: 'var(--color-text-tertiary)',
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.3,
    })
  }

  split.chars.forEach((char) => {
    char.addEventListener('mouseenter', handleEnter)
    char.addEventListener('mouseleave', handleLeave)
  })

  return {
    destroy: () => {
      split.chars.forEach((char) => {
        char.removeEventListener('mouseenter', handleEnter)
        char.removeEventListener('mouseleave', handleLeave)
      })
      split.revert()
    }
  }
}
