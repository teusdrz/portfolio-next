'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div aria-hidden="true" />,
})

interface SplineEmbedProps {
  scene: string
  className?: string
}

export default function SplineEmbed({ scene, className }: SplineEmbedProps) {
  return (
    <Spline
      scene={scene}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
