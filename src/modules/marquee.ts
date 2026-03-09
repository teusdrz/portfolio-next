import { gsap } from '@/lib/gsap-setup'

export function initMarquee() {
  const tracks = document.querySelectorAll<HTMLElement>('[data-marquee]')
  if (!tracks.length) return { destroy: () => {} }

  const tweens: gsap.core.Tween[] = []

  tracks.forEach((track) => {
    const clone = track.cloneNode(true) as HTMLElement
    track.parentElement!.appendChild(clone)

    const totalW = track.offsetWidth

    const tween = gsap.fromTo(
      [track, clone],
      { x: 0 },
      {
        x: -totalW,
        duration: 22,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: string) => parseFloat(x) % totalW)
        }
      }
    )
    tweens.push(tween)

    track.parentElement!.addEventListener('mouseenter', () => tween.timeScale(0.4))
    track.parentElement!.addEventListener('mouseleave', () => tween.timeScale(1))
  })

  return {
    destroy: () => tweens.forEach((t) => t.kill())
  }
}
