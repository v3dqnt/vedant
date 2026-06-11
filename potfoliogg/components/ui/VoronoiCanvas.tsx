'use client'

import { useEffect, useRef } from 'react'

interface VoronoiCanvasProps {
  className?: string
  numPoints?: number
  /** Line thickness in CSS pixels */
  lineWidthCss?: number
  seed?: number
}

export default function VoronoiCanvas({
  className = '',
  numPoints = 38,
  lineWidthCss = 3.5,
  seed = 42,
}: VoronoiCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendered = useRef(false)

  useEffect(() => {
    if (rendered.current) return

    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    // Actual CSS size of the container
    const rect = wrap.getBoundingClientRect()
    // Cap DPR at 2 — 3x adds too much computation for negligible gain
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const W = Math.max(Math.round(rect.width * dpr), 800)
    const H = Math.max(Math.round(rect.height * dpr), 400)
    const lineWidth = lineWidthCss * dpr   // scale boundary to device pixels

    canvas.width = W
    canvas.height = H

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    rendered.current = true

    // Defer computation so the browser can paint the page first
    requestAnimationFrame(() => {
      // ── Seeded LCG ──────────────────────────────────────────────────
      let s = (seed >>> 0) || 1
      const rand = () => {
        s = (Math.imul(s, 1664525) + 1013904223) >>> 0
        return s / 0x100000000
      }

      // ── Seed points with margin ──────────────────────────────────────
      const margin = Math.min(W, H) * 0.07
      const pts: [number, number][] = Array.from({ length: numPoints }, () => [
        margin + rand() * (W - 2 * margin),
        margin + rand() * (H - 2 * margin),
      ])

      // ── Spatial grid for O(1) nearest-neighbour lookup ───────────────
      // Cell size = expected Voronoi radius → checking 3×3 neighbourhood
      // always captures the 2 nearest points.
      const cellSize = Math.ceil(Math.sqrt((W * H) / numPoints))
      const gCols = Math.ceil(W / cellSize)
      const gRows = Math.ceil(H / cellSize)
      const grid: number[][] = Array.from({ length: gCols * gRows }, () => [])

      for (let i = 0; i < pts.length; i++) {
        const gx = Math.min(Math.floor(pts[i][0] / cellSize), gCols - 1)
        const gy = Math.min(Math.floor(pts[i][1] / cellSize), gRows - 1)
        grid[gy * gCols + gx].push(i)
      }

      // ── Per-pixel Voronoi ────────────────────────────────────────────
      const imageData = ctx.createImageData(W, H)
      const data = imageData.data

      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          const gx = Math.min(Math.floor(px / cellSize), gCols - 1)
          const gy = Math.min(Math.floor(py / cellSize), gRows - 1)

          let d1 = 1e9, d2 = 1e9

          // 3×3 grid neighbourhood
          for (let ny = Math.max(gy - 1, 0); ny <= Math.min(gy + 1, gRows - 1); ny++) {
            for (let nx = Math.max(gx - 1, 0); nx <= Math.min(gx + 1, gCols - 1); nx++) {
              const cell = grid[ny * gCols + nx]
              for (let k = 0; k < cell.length; k++) {
                const idx = cell[k]
                const dx = px - pts[idx][0]
                const dy = py - pts[idx][1]
                const d = Math.sqrt(dx * dx + dy * dy)
                if (d < d1) { d2 = d1; d1 = d }
                else if (d < d2) { d2 = d }
              }
            }
          }

          const gap = d2 - d1
          const off = (py * W + px) * 4

          if (gap < lineWidth) {
            // Quadratic falloff for crisp anti-aliased edge
            const t = gap / lineWidth            // 0 = boundary centre, 1 = edge
            const alpha = Math.round((1 - t * t) * 255)
            data[off]     = 255
            data[off + 1] = 255
            data[off + 2] = 255
            data[off + 3] = alpha
          }
          // else: alpha stays 0 (transparent — dark background shows through)
        }
      }

      ctx.putImageData(imageData, 0, 0)
    })
  }, [numPoints, lineWidthCss, seed])

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          // No 'pixelated' — let browser smooth-scale any remaining difference
          imageRendering: 'auto',
        }}
      />
    </div>
  )
}
