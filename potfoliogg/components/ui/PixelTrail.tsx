'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  color: string
  alpha: number
  decay: number
  vx: number
  vy: number
}

export default function PixelTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current
      mouse.x = e.clientX
      mouse.y = e.clientY
      
      // Initialize last mouse position if not active yet
      if (!mouse.active) {
        mouse.lastX = mouse.x
        mouse.lastY = mouse.y
        mouse.active = true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const createParticlesBetween = (x1: number, y1: number, x2: number, y2: number) => {
      const distance = Math.hypot(x2 - x1, y2 - y1)
      // Interpolate particles along the mouse movement path to prevent gaps on rapid movements
      const steps = Math.min(Math.floor(distance / 5), 12) // Max 12 particles per frame step

      for (let i = 0; i <= steps; i++) {
        const t = steps === 0 ? 1 : i / steps
        const px = x1 + (x2 - x1) * t
        const py = y1 + (y2 - y1) * t

        // Slight drift velocity
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 0.4
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed + 0.12 // slight downward drift (digital gravity)

        // Alternate colors: mostly Crimson Red (#ff0033) with a few white highlights
        const color = Math.random() > 0.85 ? '255, 255, 255' : '255, 0, 51'
        const size = Math.random() > 0.6 ? 4 : 6 // crisp integer sizes for pure pixel grid look

        particles.push({
          x: px,
          y: py,
          size,
          color,
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015, // decay lifespan
          vx,
          vy,
        })
      }
    }

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      // If active, generate particles between the last frame's position and the current one
      if (mouse.active) {
        const dx = mouse.x - mouse.lastX
        const dy = mouse.y - mouse.lastY
        if (Math.hypot(dx, dy) > 2) {
          createParticlesBetween(mouse.lastX, mouse.lastY, mouse.x, mouse.y)
        }
        mouse.lastX = mouse.x
        mouse.lastY = mouse.y
      }

      // Update & Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Draw perfect retro pixel block (square)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        // Snap to integer coordinates for sharp pixelated edges
        ctx.fillRect(Math.floor(p.x - p.size / 2), Math.floor(p.y - p.size / 2), p.size, p.size)
      }

      animationId = requestAnimationFrame(updateAndDraw)
    }

    updateAndDraw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
