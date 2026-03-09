import { gsap } from '@/lib/gsap-setup'

interface GraffitiGroup {
  sel: string
  delay: number
  color: string
  glowId: string
}

interface SprayParticle {
  el: HTMLElement
  tween: gsap.core.Tween
}

const GROUPS: GraffitiGroup[] = [
  { sel: '[data-graffiti="chest"]',     delay: 0,   color: '#ffffff', glowId: 'glow-white' },
  { sel: '[data-graffiti="arm-left"]',  delay: 1.5, color: '#ff2d55', glowId: 'glow-red'   },
  { sel: '[data-graffiti="arm-right"]', delay: 2.2, color: '#ffffff', glowId: 'glow-white' },
  { sel: '[data-graffiti="leg-left"]',  delay: 3.0, color: '#00ff88', glowId: 'glow-green' },
  { sel: '[data-graffiti="leg-right"]', delay: 3.6, color: '#ffffff', glowId: 'glow-white' },
  { sel: '[data-graffiti="face"]',      delay: 4.2, color: '#ff2d55', glowId: 'glow-red'   },
]

function getPathOriginRelative(
  path: SVGPathElement,
  container: HTMLElement
): { x: number; y: number } {
  try {
    const pt = path.getPointAtLength(0)
    const svgEl = path.ownerSVGElement
    if (!svgEl) return { x: 0, y: 0 }
    const svgRect = svgEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const viewBox = svgEl.viewBox.baseVal
    const scaleX = svgRect.width / viewBox.width
    const scaleY = svgRect.height / viewBox.height
    return {
      x: (svgRect.left - containerRect.left) + pt.x * scaleX,
      y: (svgRect.top - containerRect.top) + pt.y * scaleY,
    }
  } catch {
    return { x: 0, y: 0 }
  }
}

function createSprayParticles(
  color: string,
  originX: number,
  originY: number,
  count: number,
  container: HTMLElement
): SprayParticle[] {
  const particles: SprayParticle[] = []

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    el.className = 'spray-particle'

    const size = 1 + Math.random() * 2.5
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 22
    const startX = originX + Math.cos(angle) * (Math.random() * 8)
    const startY = originY + Math.sin(angle) * (Math.random() * 8)
    const endX = originX + Math.cos(angle) * radius
    const endY = originY + Math.sin(angle) * radius
    const opacity = 0.25 + Math.random() * 0.55
    const duration = 0.4 + Math.random() * 0.7

    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}px;
      top: ${startY}px;
      background: ${color};
      opacity: ${opacity};
      position: absolute;
    `

    container.appendChild(el)

    const tween = gsap.to(el, {
      x: endX - startX,
      y: endY - startY,
      opacity: 0,
      duration,
      ease: 'power2.out',
      delay: Math.random() * 0.15,
      onComplete: () => {
        el.remove()
      },
    })

    particles.push({ el, tween })
  }

  return particles
}

function animateGraffitiGroup(
  overlay: SVGElement,
  container: HTMLElement,
  group: GraffitiGroup,
  allTweens: gsap.core.Tween[]
): void {
  const groupEl = overlay.querySelector<SVGGElement>(group.sel)
  if (!groupEl) return

  const paths = Array.from(groupEl.querySelectorAll<SVGPathElement>('path'))
  if (paths.length === 0) return

  const lengths: number[] = paths.map((p) => {
    try {
      return p.getTotalLength()
    } catch {
      return 100
    }
  })

  gsap.set(paths, (i: number) => ({
    strokeDasharray: lengths[i],
    strokeDashoffset: lengths[i],
    opacity: 1,
  }))

  const totalDuration = paths.length < 3 ? 0.6 : paths.length < 8 ? 1.4 : 2.2

  const origin = getPathOriginRelative(paths[0], container)
  createSprayParticles(group.color, origin.x, origin.y, 14, container)

  let cumulativeDelay = 0

  paths.forEach((path, i) => {
    const segmentDuration =
      (lengths[i] / lengths.reduce((a, b) => a + b, 0)) * totalDuration * 1.6
    const clampedDuration = Math.max(0.08, segmentDuration)

    const drawTween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: clampedDuration,
      ease: 'none',
      delay: cumulativeDelay,
    })

    const shakeTween = gsap.to(path, {
      x: '+=0.8',
      y: '+=0.4',
      repeat: Math.floor(clampedDuration / 0.04),
      yoyo: true,
      duration: 0.04,
      ease: 'none',
      delay: cumulativeDelay,
      onComplete: () => {
        gsap.set(path, { x: 0, y: 0 })
      },
    })

    allTweens.push(drawTween, shakeTween)

    if (i < paths.length - 2 && i % 3 === 0) {
      const midOrigin = getPathOriginRelative(path, container)
      gsap.delayedCall(cumulativeDelay + clampedDuration * 0.5, () => {
        createSprayParticles(group.color, midOrigin.x, midOrigin.y, 5, container)
      })
    }

    cumulativeDelay += clampedDuration * 0.7
  })

  gsap.delayedCall(cumulativeDelay + 0.1, () => {
    groupEl.setAttribute('data-graffiti-done', '')
  })
}

export function initGraffiti(): { destroy: () => void } {
  const overlay = document.querySelector<SVGElement>('#graffiti-overlay')
  if (!overlay) return { destroy: () => {} }

  const container = overlay.closest<HTMLElement>('[data-hero-canvas-wrap]')
  if (!container) return { destroy: () => {} }

  const allPaths = Array.from(overlay.querySelectorAll<SVGPathElement>('path'))
  gsap.set(allPaths, (i: number) => {
    try {
      const len = allPaths[i].getTotalLength()
      return {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 1,
      }
    } catch {
      return { strokeDasharray: 100, strokeDashoffset: 100, opacity: 1 }
    }
  })

  const allTweens: gsap.core.Tween[] = []
  const delayedCalls: gsap.core.Tween[] = []

  const INITIAL_DELAY_MS = 3000

  const timer = setTimeout(() => {
    GROUPS.forEach((group) => {
      const dc = gsap.delayedCall(group.delay, () => {
        animateGraffitiGroup(overlay, container, group, allTweens)
      })
      delayedCalls.push(dc as unknown as gsap.core.Tween)
    })
  }, INITIAL_DELAY_MS)

  return {
    destroy: () => {
      clearTimeout(timer)
      allTweens.forEach((t) => t.kill())
      delayedCalls.forEach((dc) => (dc as unknown as gsap.core.Timeline).kill())
      container.querySelectorAll('.spray-particle').forEach((el) => el.remove())
      allPaths.forEach((p) => {
        p.removeAttribute('style')
        p.closest('[data-graffiti]')?.removeAttribute('data-graffiti-done')
      })
    },
  }
}
