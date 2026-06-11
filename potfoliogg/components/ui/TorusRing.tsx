'use client'

import { useEffect, useRef } from 'react'

/**
 * TorusRing — a series of N ellipses rotated around a shared center,
 * creating a 3D torus / ring illusion. Slowly counter-rotates on mount.
 */
export default function TorusRing({
  size = 600,
  ellipseCount = 32,
  rx = 228,
  ry = 76,
  strokeColor = '#ff0033',
  strokeWidth = 0.75,
  className = '',
}: {
  size?: number
  ellipseCount?: number
  rx?: number
  ry?: number
  strokeColor?: string
  strokeWidth?: number
  className?: string
}) {
  const cx = size / 2
  const cy = size / 2
  const step = 180 / ellipseCount

  const ellipses = Array.from({ length: ellipseCount }, (_, i) => ({
    id: i,
    angle: i * step,
  }))

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <g>
        {ellipses.map(({ id, angle }) => (
          <ellipse
            key={id}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
          />
        ))}
      </g>
    </svg>
  )
}
