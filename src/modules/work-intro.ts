import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-setup'

export function initWorkIntro() {
    const section = document.querySelector<HTMLElement>('[data-work-intro]')
    if (!section) return { destroy: () => { } }

    const heading = section.querySelector<HTMLElement>('[data-work-intro-heading]')
    if (!heading) return { destroy: () => { } }

    const lines = gsap.utils.toArray<HTMLElement>('[data-work-intro-line]')
    const splits: InstanceType<typeof SplitText>[] = []
    const allWords: HTMLElement[] = []

    lines.forEach((line) => {
        const split = new SplitText(line, { type: 'words', wordsClass: 'work-intro-word' })
        splits.push(split)
        allWords.push(...split.words)
    })

    allWords.forEach((word) => {
        Object.assign(word.style, {
            display: 'inline-block',
            willChange: 'transform, opacity',
            position: 'relative',
            cursor: 'default',
            transition: 'color 0.3s ease',
        })

        const bg = document.createElement('span')
        Object.assign(bg.style, {
            position: 'absolute',
            inset: '-4px -6px',
            backgroundColor: '#39FF14',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            zIndex: '-1',
            borderRadius: '2px',
        })
        word.appendChild(bg)

        word.addEventListener('mouseenter', () => {
            bg.style.transform = 'scaleX(1)'
        })
        word.addEventListener('mouseleave', () => {
            bg.style.transform = 'scaleX(0)'
        })
    })

    const offsets = [
        { y: 120, x: -80, rotation: -18 },
        { y: -100, x: 60, rotation: 14 },
        { y: 150, x: -50, rotation: -10 },
        { y: -120, x: 90, rotation: 20 },
        { y: 100, x: -100, rotation: -15 },
        { y: -140, x: 70, rotation: 18 },
        { y: 110, x: -60, rotation: -12 },
    ]

    allWords.forEach((word, i) => {
        const o = offsets[i % offsets.length]
        gsap.set(word, {
            y: o.y,
            x: o.x,
            rotation: o.rotation,
            opacity: 0,
        })
    })

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: '20% top',
            scrub: 1,
            pin: false,
        },
    })

    tl.to(allWords, {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.06,
        ease: 'power3.out',
    })

    return {
        destroy: () => {
            ScrollTrigger.getAll()
                .filter((st) => st.trigger === section)
                .forEach((st) => st.kill())
            splits.forEach((s) => s.revert())
        },
    }
}
