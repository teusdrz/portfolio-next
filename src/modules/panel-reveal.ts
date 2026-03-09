import { gsap } from '@/lib/gsap-setup'

export function initPanelReveal() {
    const section = document.querySelector<HTMLElement>('[data-panel-reveal]')
    if (!section) return { destroy: () => { } }

    const cols = gsap.utils.toArray<HTMLElement>('[data-panel-col]')
    if (!cols.length) return { destroy: () => { } }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            end: 'top -5%',
            scrub: 0.4,
        }
    })

    const mid = Math.floor(cols.length / 2)
    cols.forEach((col, i) => {
        const dist = Math.abs(i - mid)
        tl.to(col, {
            scaleY: 1,
            duration: 0.4,
            ease: 'power3.inOut',
        }, dist * 0.06)
    })

    tl.to(cols, {
        scaleX: 1.3,
        duration: 0.3,
        ease: 'power2.in',
    }, 0.35)

    return {
        destroy: () => {
            tl.scrollTrigger?.kill()
            tl.kill()
        }
    }
}
