'use client'

import { useEffect, useRef } from 'react'

export default function MinimalGrid2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Mouse tracking state
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const scrollY = useRef({ current: 0, target: 0 })
  const lerpFactor = 0.08

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // High DPR Scaling
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX
      mouse.current.ty = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Track scroll depth
    const handleScroll = () => {
      scrollY.current.target = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation Loop
    const draw = () => {
      // 1. Smoothly interpolate mouse positioning & scroll
      mouse.current.x += (mouse.current.tx - mouse.current.x) * lerpFactor
      mouse.current.y += (mouse.current.ty - mouse.current.y) * lerpFactor
      scrollY.current.current += (scrollY.current.target - scrollY.current.current) * lerpFactor

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Solid pitch black backdrop
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // 2. Draw Interactive Dot Grid
      const dotSpacing = 50
      const dotRadius = 1
      const maxWarpDist = 180
      const warpForce = 22

      // Offset starting Y based on scroll for smooth 2D parallax transition
      const yOffset = -(scrollY.current.current * 0.25) % dotSpacing

      for (let x = 25; x < window.innerWidth; x += dotSpacing) {
        for (let y = yOffset; y < window.innerHeight + dotSpacing; y += dotSpacing) {
          if (y < 0) continue

          // Calculate distance from mouse to dot
          const dx = mouse.current.x - x
          const dy = mouse.current.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)

          let drawX = x
          let drawY = y
          let opacity = 0.04
          let dotColor = 'rgba(255, 255, 255,'

          // If close to cursor, smoothly pull coordinate (tactile warp effect)
          if (dist < maxWarpDist) {
            const force = (1 - dist / maxWarpDist) * warpForce
            const angle = Math.atan2(dy, dx)
            
            drawX = x + Math.cos(angle) * force
            drawY = y + Math.sin(angle) * force
            
            // Highlight color shifting to red close to mouse cursor
            const redFactor = 1 - dist / maxWarpDist
            dotColor = `rgba(${Math.round(255 + redFactor * 0)}, ${Math.round(255 - redFactor * 255)}, ${Math.round(255 - Math.round(204 * redFactor))},`
            opacity = 0.04 + redFactor * 0.18
          }

          ctx.fillStyle = `${dotColor} ${opacity})`
          ctx.beginPath()
          ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 3. Render a subtle glowing ambient cursor halo (Crimson Red)
      const glowGrad = ctx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        0,
        mouse.current.x,
        mouse.current.y,
        220
      )
      glowGrad.addColorStop(0, 'rgba(255, 0, 51, 0.08)') // Crimson Red glow center
      glowGrad.addColorStop(0.5, 'rgba(255, 0, 51, 0.03)')
      glowGrad.addColorStop(1, 'rgba(255, 0, 51, 0)') // Fades into pitch black

      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(mouse.current.x, mouse.current.y, 220, 0, Math.PI * 2)
      ctx.fill()

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none block"
    />
  )
}
