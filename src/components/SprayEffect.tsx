'use client'

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

export interface SprayEffectHandle {
  burst(x: number, y: number, color: string, count?: number): void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  decay: number
  life: number
}

const SprayEffect = forwardRef<SprayEffectHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)
  const activeRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    })

    resizeObserver.observe(parent)
    canvas.width = parent.offsetWidth
    canvas.height = parent.offsetHeight

    return () => {
      resizeObserver.disconnect()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  function loop() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    let i = particles.length

    while (i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.04
      p.vx *= 0.97
      p.vy *= 0.97
      p.alpha -= p.decay
      p.life -= 1

      if (p.alpha <= 0 || p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      ctx.save()
      ctx.globalAlpha = Math.max(0, p.alpha)
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    if (particles.length > 0) {
      rafRef.current = requestAnimationFrame(loop)
    } else {
      activeRef.current = false
      rafRef.current = null
    }
  }

  useImperativeHandle(ref, () => ({
    burst(x: number, y: number, color: string, count = 20) {
      const particles = particlesRef.current

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.8 + Math.random() * 3.2
        const scatter = Math.random() * 6

        particles.push({
          x: x + (Math.random() - 0.5) * scatter,
          y: y + (Math.random() - 0.5) * scatter,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5,
          radius: 0.8 + Math.random() * 1.8,
          color,
          alpha: 0.35 + Math.random() * 0.55,
          decay: 0.012 + Math.random() * 0.022,
          life: 40 + Math.random() * 50,
        })
      }

      if (!activeRef.current) {
        activeRef.current = true
        rafRef.current = requestAnimationFrame(loop)
      }
    },
  }))

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 11,
      }}
      aria-hidden="true"
    />
  )
})

SprayEffect.displayName = 'SprayEffect'
export default SprayEffect
