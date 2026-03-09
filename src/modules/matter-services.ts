import Matter from 'matter-js'
import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

const { Engine, Bodies, Body, World, Events, Mouse, MouseConstraint } = Matter

export function initMatterServices() {
  const container = document.querySelector<HTMLElement>('[data-matter-container]')
  if (!container) return { destroy: () => {} }

  const W = container.offsetWidth
  const H = container.offsetHeight

  const engine = Engine.create({
    gravity: { x: 0, y: 1.8, scale: 0.001 }
  })

  const letters = container.querySelectorAll<HTMLElement>('[data-matter-letter]')
  const bodies: Matter.Body[] = []
  const domEls: HTMLElement[] = []

  letters.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const x = rect.left - containerRect.left + rect.width / 2
    const startY = -80 - i * 50

    const body = Bodies.rectangle(x, startY, rect.width + 8, rect.height + 8, {
      restitution: 0.45,
      friction: 0.3,
      frictionAir: 0.02,
      angle: (Math.random() - 0.5) * 0.4,
      mass: 1 + Math.random() * 0.5,
      label: 'letter_' + i
    })

    bodies.push(body)
    domEls.push(el)
    World.add(engine.world, body)
  })

  const ground = Bodies.rectangle(W / 2, H + 25, W * 2, 50, { isStatic: true, label: 'ground' })
  const wallL = Bodies.rectangle(-25, H / 2, 50, H * 2, { isStatic: true, label: 'wallL' })
  const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 2, { isStatic: true, label: 'wallR' })
  World.add(engine.world, [ground, wallL, wallR])

  let running = false
  let rafId: number | null = null

  const tick = () => {
    Engine.update(engine, 1000 / 60)
    bodies.forEach((body, i) => {
      const el = domEls[i]
      if (!el) return
      el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`
      el.style.opacity = '1'
    })
    if (running) rafId = requestAnimationFrame(tick)
  }

  ScrollTrigger.create({
    trigger: container,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      running = true
      bodies.forEach((body) => {
        Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.003,
          y: 0
        })
      })
      tick()

      gsap.delayedCall(4, () => {
        running = false
        if (rafId !== null) cancelAnimationFrame(rafId)
      })
    }
  })

  const mouse = Mouse.create(container)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
  })
  World.add(engine.world, mouseConstraint)

  return {
    destroy: () => {
      running = false
      if (rafId !== null) cancelAnimationFrame(rafId)
      Engine.clear(engine)
      World.clear(engine.world, false)
    }
  }
}
