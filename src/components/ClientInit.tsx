'use client'

import { useEffect } from 'react'

export default function ClientInit() {
  useEffect(() => {
    let cleanup: (() => void) | null = null

    const init = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap-setup')
      const { initLoader } = await import('@/modules/loader')
      const { initScroll } = await import('@/modules/smooth-scroll')
      const { initNav } = await import('@/modules/nav')
      const { initHero } = await import('@/modules/hero')
      const { initAbout } = await import('@/modules/about-redesign')
      const { initTransitions } = await import('@/modules/transitions')
      const { initPanelReveal } = await import('@/modules/panel-reveal')
      const { initServices } = await import('@/modules/services')
      const { initWorkIntro } = await import('@/modules/work-intro')
      const { initGraffiti } = await import('@/modules/graffiti')
      const { initPanelClose } = await import('@/modules/panel-close')
      const { initProjectsPlaceholder } = await import('@/modules/projects-placeholder')

      await initLoader()

      const modules: Array<{ destroy?: () => void }> = []

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        modules.push(
          initScroll(),
          initNav(),
          initHero(),
          initAbout(),
          initPanelReveal(),
          initServices(),
          initWorkIntro(),
          initTransitions(),
          initGraffiti(),
          initPanelClose(),
          initProjectsPlaceholder()
        )

        ScrollTrigger.refresh()

        return () => {
          modules.forEach((m) => m?.destroy?.())
          modules.length = 0
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        initNav()
      })

      cleanup = () => mm.revert()
    }

    init()

    return () => {
      cleanup?.()
    }
  }, [])

  return null
}
