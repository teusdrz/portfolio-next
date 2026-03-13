import { gsap } from '@/lib/gsap-setup'
import * as THREE from 'three'

function buildTextTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256

  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const fontSize = 52
  ctx.font = `600 ${fontSize}px 'Bricolage Grotesque', system-ui, sans-serif`
  ctx.fillStyle = '#111111'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  const label = 'MATHEUS VINICIUS'
  const repeatCount = 3
  const segmentWidth = canvas.width / repeatCount

  for (let i = 0; i < repeatCount; i++) {
    const x = segmentWidth * i + segmentWidth / 2
    const y = canvas.height / 2
    ctx.fillText(label, x, y, segmentWidth - 32)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.repeat.set(1, 1)
  texture.needsUpdate = true

  return texture
}

export function initLoader(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.querySelector<HTMLElement>('[data-loader]')
    if (!overlay) {
      resolve()
      return
    }

    const panelTop = overlay.querySelector<HTMLElement>('[data-loader-panel="top"]')
    const panelBottom = overlay.querySelector<HTMLElement>('[data-loader-panel="bottom"]')
    const canvasEl = overlay.querySelector<HTMLCanvasElement>('[data-loader-canvas]')
    const barTrack = overlay.querySelector<HTMLElement>('[data-loader-bar-track]')
    const barEl = overlay.querySelector<HTMLElement>('[data-loader-bar]')
    const labelEl = overlay.querySelector<HTMLElement>('[data-loader-label]')

    if (!canvasEl) {
      resolve()
      return
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.PerspectiveCamera(
      45,
      canvasEl.clientWidth / canvasEl.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight)

    const geometry = new THREE.CylinderGeometry(0.7, 0.7, 1.3, 64, 1, true)

    const textTexture = buildTextTexture()

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0,
      transmission: 0.6,
      transparent: true,
      side: THREE.DoubleSide,
      map: textTexture,
    })

    const cylinder = new THREE.Mesh(geometry, material)
    scene.add(cylinder)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4)
    rimLight.position.set(-4, 2, -3)
    scene.add(rimLight)

    let isDragging = false
    let prevX = 0
    let prevY = 0
    let velX = 0
    let velY = 0
    let rafId = 0
    const isMobile = window.matchMedia('(pointer: coarse)').matches

    function onPointerDown(e: PointerEvent): void {
      if (isMobile) return
      isDragging = true
      prevX = e.clientX
      prevY = e.clientY
      velX = 0
      velY = 0
      canvasEl!.setPointerCapture(e.pointerId)
    }

    function onPointerMove(e: PointerEvent): void {
      if (!isDragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      velX = dx
      velY = dy
      cylinder.rotation.y += dx * 0.01
      cylinder.rotation.x += dy * 0.01
      prevX = e.clientX
      prevY = e.clientY
    }

    function onPointerUp(): void {
      isDragging = false
    }

    if (!isMobile) {
      canvasEl.addEventListener('pointerdown', onPointerDown)
      canvasEl.addEventListener('pointermove', onPointerMove)
      canvasEl.addEventListener('pointerup', onPointerUp)
      canvasEl.addEventListener('pointercancel', onPointerUp)
    }

    function animate(): void {
      rafId = requestAnimationFrame(animate)
      if (!isDragging) {
        // auto-rotate + momentum decay
        velX *= 0.92
        velY *= 0.92
        cylinder.rotation.y += 0.008 + velX * 0.003
        cylinder.rotation.x += velY * 0.003
      }
      renderer.render(scene, camera)
    }

    animate()

    function onResize(): void {
      if (!canvasEl) return
      const w = canvasEl.clientWidth
      const h = canvasEl.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)

    function cleanup(): void {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      if (!isMobile) {
        canvasEl!.removeEventListener('pointerdown', onPointerDown)
        canvasEl!.removeEventListener('pointermove', onPointerMove)
        canvasEl!.removeEventListener('pointerup', onPointerUp)
        canvasEl!.removeEventListener('pointercancel', onPointerUp)
      }
      geometry.dispose()
      material.dispose()
      textTexture.dispose()
      renderer.dispose()
    }

    const tl = gsap.timeline({
      onComplete: () => {
        cleanup()
        gsap.set(overlay, { display: 'none' })
        resolve()
      },
    })

    tl
      .set(overlay, { autoAlpha: 1 })

      .fromTo(
        canvasEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0
      )

      .to(
        labelEl,
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.4
      )

      .to(
        barTrack,
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.5
      )

      .fromTo(
        barEl,
        { scaleX: 0 },
        { scaleX: 1, duration: 5.8, ease: 'none' },
        0.8
      )

      .to(
        [canvasEl, barTrack, labelEl],
        { opacity: 0, duration: 0.3, ease: 'power2.in' },
        6.6
      )

      .to(
        panelTop,
        { yPercent: -100, duration: 0.9, ease: 'expo.inOut' },
        6.9
      )

      .to(
        panelBottom,
        { yPercent: 100, duration: 0.9, ease: 'expo.inOut' },
        6.9
      )
  })
}
