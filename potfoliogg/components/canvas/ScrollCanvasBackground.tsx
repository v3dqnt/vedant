'use client'

import { useEffect, useRef, useState } from 'react'

// Generate the 240 frame paths extracted from the uploaded CN Tower video
const DEFAULT_FRAMES = Array.from(
  { length: 240 },
  (_, i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`
)

interface ScrollCanvasBackgroundProps {
  imageUrls?: string[]
}

export default function ScrollCanvasBackground({ imageUrls = DEFAULT_FRAMES }: ScrollCanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  
  // Scrub and Lerp state
  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const lerpFactor = 0.06 // Cushioned scroll smoothing (lower is silkier)

  // 1. Image Preloading Pipeline
  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoading(false)
      return
    }

    setLoading(true)
    let loadedCount = 0
    const loadedImages: HTMLImageElement[] = []

    imageUrls.forEach((url, index) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        loadedCount++
        loadedImages[index] = img
        const pct = Math.round((loadedCount / imageUrls.length) * 100)
        setLoadProgress(pct)

        if (loadedCount === imageUrls.length) {
          setImages(loadedImages)
          // Minor delay to appreciate full load completion before fading out
          setTimeout(() => setLoading(false), 400)
        }
      }
      img.onerror = () => {
        console.error(`Failed to preload frame: ${url}`)
        loadedCount++
        if (loadedCount === imageUrls.length) {
          setImages(loadedImages)
          setTimeout(() => setLoading(false), 400)
        }
      }
    })
  }, [imageUrls])

  // 2. Window Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      
      const pct = window.scrollY / scrollHeight
      targetProgress.current = Math.min(Math.max(pct, 0), 1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3. Canvas Core Render & Lerp Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // High DPR scaling handler for crisp, non-blurry rendering
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

    // Render loop
    const tick = () => {
      // Calculate smooth current scroll point using linear interpolation
      const delta = targetProgress.current - currentProgress.current
      currentProgress.current += delta * lerpFactor

      // Clear previous frames
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background placeholder color
      ctx.fillStyle = '#02040a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the active frame in Cover mode
      if (images.length > 0) {
        const frameIndex = Math.min(
          Math.floor(currentProgress.current * images.length),
          images.length - 1
        )
        const activeImg = images[frameIndex]
        if (activeImg) {
          const imgWidth = activeImg.width
          const imgHeight = activeImg.height
          
          // Calculate scale to achieve standard background-size: cover
          const scale = Math.max(window.innerWidth / imgWidth, window.innerHeight / imgHeight)
          const w = imgWidth * scale
          const h = imgHeight * scale
          const x = (window.innerWidth - w) / 2
          const y = (window.innerHeight - h) / 2

          ctx.drawImage(activeImg, x, y, w, h)
        }
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [images])

  return (
    <>
      {/* Viewport Fixed Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-[-1] pointer-events-none block"
      />

      {/* Preloading Glassmorphic Overlay */}
      {loading && (
        <div className="fixed inset-0 w-full h-full z-[999] flex flex-col justify-center items-center bg-[#02040a]/95 backdrop-blur-xl transition-opacity duration-500">
          <div className="w-80 p-8 rounded-2xl bg-slate-900/60 border border-white/10 shadow-2xl backdrop-blur-md text-center">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-cyan-400 mb-6 uppercase">
              PRELOADING EXPERIENCE
            </h3>
            
            {/* Minimalist Progress track */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            
            {/* Counter */}
            <span className="text-xs font-mono text-zinc-400 tracking-wider">
              {loadProgress}% COMPLETE
            </span>
          </div>
        </div>
      )}
    </>
  )
}

