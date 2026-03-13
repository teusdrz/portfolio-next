import { gsap } from '@/lib/gsap-setup'

export function initPanelClose() {
    const section = document.querySelector<HTMLElement>('[data-panel-close]')
    if (!section) return { destroy: () => { } }

    const cols = gsap.utils.toArray<HTMLElement>('[data-panel-close-col]')
    if (!cols.length) return { destroy: () => { } }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            end: 'top -5%',
            scrub: 0.4,
        }
    })

    /* fase 1 – colunas voltam à largura normal */
    tl.to(cols, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out',
    }, 0)

    /* fase 2 – colunas fecham de fora para dentro (inverso do reveal) */
    const mid = Math.floor(cols.length / 2)
    const maxDist = mid
    cols.forEach((col, i) => {
        const dist = Math.abs(i - mid)
        tl.to(col, {
            scaleY: 0,
            duration: 0.4,
            ease: 'power3.inOut',
        }, 0.25 + (maxDist - dist) * 0.06)
    })

    return {
        destroy: () => {
            tl.scrollTrigger?.kill()
            tl.kill()
        }
    }
}
