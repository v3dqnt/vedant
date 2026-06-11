'use client'

import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useState, useEffect, Suspense } from 'react'
import AbstractGeometry from './AbstractGeometry'

export default function SceneCanvas() {
  const [dpr, setDpr] = useState(1.5)
  const [hour, setHour] = useState(12) // Default to noon

  // Sync with actual local system time on mount and keep updated
  useEffect(() => {
    const updateTime = () => {
      setHour(new Date().getHours())
    }
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Dynamic palette theme mapped to local hour
  const getThemeByHour = (h: number) => {
    if (h >= 5 && h < 9) {
      // Morning (Sunrise) - Dodger Blue to School Bus Yellow
      return {
        bgGradient: 'linear-gradient(to bottom, #1e96fc 60%, #ffc600 100%)',
        lightColor1: '#ffc600', // Yellow sunrise light
        lightColor2: '#072ac8', // Deep blue reflection
        ambientIntensity: 0.6,
      }
    } else if (h >= 9 && h < 17) {
      // Day (Daylight) - Dodger Blue to Icy Blue
      return {
        bgGradient: 'linear-gradient(to bottom, #1e96fc 50%, #a2d6f9 100%)',
        lightColor1: '#072ac8', // Persian Blue daylight
        lightColor2: '#a2d6f9', // Icy Blue fill
        ambientIntensity: 0.7,
      }
    } else if (h >= 17 && h < 20) {
      // Sunset (Golden Hour) - Persian Blue to Dodger Blue to School Bus Yellow
      return {
        bgGradient: 'linear-gradient(to bottom, #072ac8 25%, #1e96fc 65%, #ffc600 100%)',
        lightColor1: '#ffc600', // School Bus Yellow sunset glow
        lightColor2: '#072ac8', // Deep blue shadow
        ambientIntensity: 0.4,
      }
    } else {
      // Night (Dusk) - Midnight Navy to Persian Blue to Dodger Blue
      return {
        bgGradient: 'linear-gradient(to bottom, #030822 40%, #072ac8 80%, #1e96fc 100%)',
        lightColor1: '#1e96fc', // Cool Dodger Blue starlight
        lightColor2: '#fcf300', // Glowing lemon warning light reflections
        ambientIntensity: 0.3,
      }
    }
  }

  const theme = getThemeByHour(hour)

  return (
    <div 
      className="fixed inset-0 z-[-1] transition-all duration-1000 ease-in-out"
      style={{ background: theme.bgGradient }}
    >
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true }} // alpha: true makes canvas transparent to show sky CSS gradients
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />
        
        <ambientLight intensity={theme.ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color={theme.lightColor1} />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color={theme.lightColor2} />
        
        {/* Wrap main 3D experience in Suspense for async model loading */}
        <Suspense fallback={null}>
          <AbstractGeometry />
        </Suspense>
      </Canvas>
    </div>
  )
}
