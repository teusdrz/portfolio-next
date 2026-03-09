import { gsap } from '@/lib/gsap-setup'
import * as THREE from 'three'

type ParticleSystem = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  particles: THREE.Points
  geometry: THREE.BufferGeometry
  material: THREE.ShaderMaterial
  animationId: number
  clock: THREE.Clock
  raf: { id: number }
}

function buildParticleSystem(canvas: HTMLCanvasElement): ParticleSystem {
  const W = window.innerWidth
  const H = window.innerHeight

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(W, H)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 4

  const COUNT = 1200
  const positions = new Float32Array(COUNT * 3)
  const randoms = new Float32Array(COUNT)
  const sizes = new Float32Array(COUNT)

  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2.5 + Math.random() * 2.5

    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi) - 1.5

    randoms[i] = Math.random()
    sizes[i] = 0.5 + Math.random() * 1.5
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform float uPixelRatio;
      attribute float aRandom;
      attribute float aSize;
      varying float vAlpha;
      varying float vRandom;

      void main() {
        vRandom = aRandom;

        vec3 pos = position;
        float drift = sin(uTime * 0.4 + aRandom * 6.2831) * 0.06;
        pos.y += drift;
        pos.x += cos(uTime * 0.3 + aRandom * 6.2831) * 0.04;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float dist = length(pos.xy) / 5.0;
        vAlpha = smoothstep(1.0, 0.0, dist) * uProgress;

        gl_PointSize = aSize * uPixelRatio * (3.5 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying float vRandom;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float circle = 1.0 - smoothstep(0.35, 0.5, d);

        float greenTint = 0.55 + vRandom * 0.45;
        vec3 col = mix(
          vec3(0.85, 0.9, 0.88),
          vec3(0.4, greenTint, 0.35),
          vRandom * 0.6
        );

        gl_FragColor = vec4(col, circle * vAlpha * 0.55);
      }
    `,
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  const clock = new THREE.Clock()
  const raf = { id: 0 }

  const tick = () => {
    raf.id = requestAnimationFrame(tick)
    const elapsed = clock.getElapsedTime()
    material.uniforms.uTime.value = elapsed
    particles.rotation.y = elapsed * 0.04
    particles.rotation.x = Math.sin(elapsed * 0.025) * 0.15
    renderer.render(scene, camera)
  }

  tick()

  return { scene, camera, renderer, particles, geometry, material, animationId: raf.id, clock, raf }
}

function getPathLength(path: SVGPathElement): number {
  return path.getTotalLength()
}

const STATUS_LABELS = [
  'initializing',
  'loading assets',
  'building scene',
  'almost ready',
  'launching',
]

export function initLoader(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.querySelector<HTMLElement>('[data-loader]')
    if (!overlay) {
      resolve()
      return
    }

    const panelTop = overlay.querySelector<HTMLElement>('[data-loader-panel="top"]')
    const panelBottom = overlay.querySelector<HTMLElement>('[data-loader-panel="bottom"]')
    const canvas = overlay.querySelector<HTMLCanvasElement>('[data-loader-canvas]')
    const logoEl = overlay.querySelector<HTMLElement>('[data-loader-logo]')
    const counterEl = overlay.querySelector<HTMLElement>('[data-loader-counter]')
    const counterWrap = overlay.querySelector<HTMLElement>('[data-loader-counter-wrap]')
    const barEl = overlay.querySelector<HTMLElement>('[data-loader-bar]')
    const barGlow = overlay.querySelector<HTMLElement>('[data-loader-bar-glow]')
    const barTrack = overlay.querySelector<HTMLElement>('[data-loader-bar-track]')
    const statusWrap = overlay.querySelector<HTMLElement>('[data-loader-status]')
    const statusText = overlay.querySelector<HTMLElement>('[data-loader-status-text]')
    const cornerTL = overlay.querySelector<HTMLElement>('[data-loader-corner="tl"]')
    const cornerBR = overlay.querySelector<HTMLElement>('[data-loader-corner="br"]')

    const pathM = overlay.querySelector<SVGPathElement>('[data-logo-path="m"]')
    const pathV = overlay.querySelector<SVGPathElement>('[data-logo-path="v"]')

    let ps: ParticleSystem | null = null
    const particleProgressProxy = { value: 0 }

    if (canvas) {
      ps = buildParticleSystem(canvas)
    }

    if (pathM && pathV) {
      const lenM = getPathLength(pathM)
      const lenV = getPathLength(pathV)
      pathM.style.setProperty('--path-length', String(lenM))
      pathM.style.strokeDasharray = String(lenM)
      pathM.style.strokeDashoffset = String(lenM)
      pathV.style.setProperty('--path-length', String(lenV))
      pathV.style.strokeDasharray = String(lenV)
      pathV.style.strokeDashoffset = String(lenV)
    }

    const counterObj = { val: 0 }
    let statusIndex = 0

    const tl = gsap.timeline({
      onComplete: () => {
        if (ps) {
          cancelAnimationFrame(ps.raf.id)
          ps.geometry.dispose()
          ps.material.dispose()
          ps.renderer.dispose()
          ps.renderer.forceContextLoss()
          ps = null
        }
        gsap.set(overlay, { display: 'none' })
        resolve()
      },
    })

    tl
      .set(overlay, { autoAlpha: 1 })

      .to(canvas, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .to(particleProgressProxy, {
        value: 1,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate() {
          if (ps) ps.material.uniforms.uProgress.value = particleProgressProxy.value
        },
      }, 0.1)

      .to([cornerTL, cornerBR], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      }, 0.2)

      .to(logoEl, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, 0.35)

      .to(pathM, {
        strokeDashoffset: 0,
        duration: 0.75,
        ease: 'power2.inOut',
      }, 0.45)

      .to(pathV, {
        strokeDashoffset: 0,
        duration: 0.55,
        ease: 'power2.inOut',
      }, 0.9)

      .to(barTrack, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.8)

      .to(counterWrap, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.85)

      .to(statusWrap, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.95)

      .to(counterObj, {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate() {
          const v = Math.round(counterObj.val)
          if (counterEl) {
            counterEl.textContent = String(v).padStart(2, '0')
          }

          if (barEl) {
            gsap.set(barEl, { scaleX: v / 100 })
          }

          if (barGlow) {
            gsap.set(barGlow, {
              opacity: v > 2 && v < 98 ? 0.9 : 0,
              right: `${100 - v}%`,
            })
          }

          const newIndex = Math.floor((v / 100) * (STATUS_LABELS.length - 1))
          if (newIndex !== statusIndex && statusText) {
            statusIndex = newIndex
            gsap.fromTo(
              statusText,
              { opacity: 0, y: 4 },
              { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', overwrite: true }
            )
            statusText.textContent = STATUS_LABELS[statusIndex]
          }
        },
      }, 1.0)

      .to(logoEl, {
        scale: 1.08,
        duration: 0.35,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      }, 2.7)

      .to([statusWrap, barTrack, counterWrap], {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: 'power3.in',
        stagger: 0.05,
      }, 2.85)

      .to(logoEl, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power3.in',
      }, 3.0)

      .to([cornerTL, cornerBR], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 3.0)

      .to(canvas, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      }, 3.1)

      .to(panelTop, {
        yPercent: -100,
        duration: 1.0,
        ease: 'expo.inOut',
      }, 3.25)

      .to(panelBottom, {
        yPercent: 100,
        duration: 1.0,
        ease: 'expo.inOut',
      }, 3.25)
  })
}
