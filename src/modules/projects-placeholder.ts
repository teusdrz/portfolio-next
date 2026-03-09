import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-setup'

export function initProjectsPlaceholder() {
    const section = document.querySelector<HTMLElement>('[data-projects-placeholder]')
    if (!section) return { destroy: () => { } }

    const track = section.querySelector<HTMLElement>('[data-pp-track]')
    if (!track) return { destroy: () => { } }

    const phrases = Array.from(track.querySelectorAll<HTMLElement>('[data-pp-phrase]'))
    if (!phrases.length) return { destroy: () => { } }

    const splits: SplitText[] = []

    const splitInstances = phrases.map((phrase) => {
        const split = new SplitText(phrase, { type: 'chars' })
        splits.push(split)
        return split
    })

    splitInstances.forEach((split) => {
        gsap.set(split.chars, { opacity: 0, y: 40 })
    })

    const getDistance = () => track.scrollWidth - window.innerWidth
    const totalChars = splitInstances.reduce((sum, s) => sum + s.chars.length, 0)

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance() * 1.6}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    })

    let charIndex = 0

    splitInstances.forEach((split, phraseIdx) => {
        const phraseEl = phrases[phraseIdx]
        const phraseLeft = phraseEl.offsetLeft
        const trackWidth = track.scrollWidth
        const startPos = phraseLeft / trackWidth

        split.chars.forEach((char) => {
            const pos = startPos + (charIndex / totalChars) * (1 - startPos) * 0.15

            tl.to(char, {
                opacity: 1,
                y: 0,
                duration: 0.02,
                ease: 'power2.out',
            }, pos)

            charIndex++
        })
    })

    tl.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        duration: 1,
    }, 0)

    return {
        destroy: () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill()
            tl.kill()
            splits.forEach((s) => s.revert())
        },
    }
}
