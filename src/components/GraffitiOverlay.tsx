'use client'

import { useRef } from 'react'
import GraffitiLayer from './GraffitiLayer'
import SprayEffect, { SprayEffectHandle } from './SprayEffect'

export default function GraffitiOverlay() {
  const sprayRef = useRef<SprayEffectHandle>(null)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
      data-graffiti-container
    >
      <GraffitiLayer />
      <SprayEffect ref={sprayRef} />
    </div>
  )
}
