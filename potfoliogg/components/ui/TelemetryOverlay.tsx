'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Hotspot {
  id: string
  title: string
  altitude: number
  range: [number, number] // scroll percentage range [start, end]
  x: string // CSS position
  y: string // CSS position
  content: string
  specLabel: string
  specValue: string
}

export default function TelemetryOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<'base' | 'shaft' | 'pod' | 'spire'>('base')
  const [openHotspot, setOpenHotspot] = useState<string | null>(null)

  // 1. Listen to scroll progress to update overlays
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      
      const progress = window.scrollY / scrollHeight
      setScrollProgress(progress)

      // Section mapping by height/scroll percentage
      if (progress < 0.25) {
        setActiveSection('base')
      } else if (progress >= 0.25 && progress < 0.60) {
        setActiveSection('shaft')
      } else if (progress >= 0.60 && progress < 0.85) {
        setActiveSection('pod')
      } else {
        setActiveSection('spire')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Definining Hotspots at different altitudes of the CN Tower
  const hotspots: Hotspot[] = [
    {
      id: 'foundation',
      title: 'FOUNDATION RADAR SCAN',
      altitude: 15,
      range: [0.05, 0.22],
      x: '70%',
      y: '55%',
      content: 'The CN Tower concrete foundation extends 15 meters below ground. Designers anchored it with massive prestressed concrete piles, pouring 15,200 cubic meters of high-density slate-resistant concrete to withstand intense sub-zero temperatures.',
      specLabel: 'FOUNDATION WEIGHT',
      specValue: '15,200 m³'
    },
    {
      id: 'elevators',
      title: 'SPEED CABIN CLIMB ENGINE',
      altitude: 210,
      range: [0.28, 0.55],
      x: '62%',
      y: '40%',
      content: 'Six high-speed glass-fronted cabins scale the outer concrete columns. Moving at 22 km/h (15 mph), they reach the primary observation ring in just 58 seconds, utilizing pneumatic suspension for frictionless gliding.',
      specLabel: 'CABIN CLIMB TIME',
      specValue: '58 Seconds'
    },
    {
      id: 'glassfloor',
      title: '346m OBSERVER GLASS FLOOR',
      altitude: 346,
      range: [0.62, 0.82],
      x: '65%',
      y: '45%',
      content: 'Opened in 1994, this observation tier holds the world-famous reinforced glass floor panels. Engineered with multiple tempered sheets, each panel can support 38,000 kg (equivalent to 14 fully-grown hippos).',
      specLabel: 'STRUCTURAL LOAD',
      specValue: '38,000 kg/m²'
    },
    {
      id: 'spire_needle',
      title: 'SPIRE ASSEMBLY / CH-54 OLGA',
      altitude: 553,
      range: [0.86, 0.98],
      x: '55%',
      y: '30%',
      content: 'In 1975, the 102-meter steel antenna spire was assembled in 44 pieces by a twin-engine Sikorsky CH-54 skycrane named "Olga". The steel structure acts as a broadcast mast for over 30 television and radio stations.',
      specLabel: 'SPIRE MAST HEIGHT',
      specValue: '102 Meters'
    }
  ]

  // Filter currently visible hotspots based on scroll depth
  const visibleHotspots = hotspots.filter(h => scrollProgress >= h.range[0] && scrollProgress <= h.range[1])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 select-none">
      
      {/* 1. LEFT-HAND SCROLL-DEPTH ALTIMETER GAUGE */}
      <div className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-6 pointer-events-auto">
        <div className="flex flex-col items-center justify-between h-[300px] w-6 relative">
          
          {/* Vertical Altimeter track line */}
          <div className="absolute w-[2px] h-full bg-white/10 rounded-full left-1/2 transform -translate-x-1/2">
            {/* Glowing active scroll progress overlay */}
            <div 
              className="absolute w-full bg-cyan-400 rounded-full top-0 transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Section Indicator Ticks */}
          <div className="flex flex-col items-center justify-between h-full z-10 w-full">
            
            {/* BASE Tick */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                activeSection === 'base' ? 'bg-cyan-400 border-cyan-400 scale-125 shadow-[0_0_12px_#22d3ee]' : 'bg-slate-900 border-zinc-600'
              }`}
              title="Base Camp: 0m"
            />

            {/* SHAFT Tick */}
            <button 
              onClick={() => {
                const h = document.documentElement.scrollHeight - window.innerHeight
                window.scrollTo({ top: h * 0.4, behavior: 'smooth' })
              }}
              className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                activeSection === 'shaft' ? 'bg-cyan-400 border-cyan-400 scale-125 shadow-[0_0_12px_#22d3ee]' : 'bg-slate-900 border-zinc-600'
              }`}
              title="Shaft Transit: 150m"
            />

            {/* POD Tick */}
            <button 
              onClick={() => {
                const h = document.documentElement.scrollHeight - window.innerHeight
                window.scrollTo({ top: h * 0.72, behavior: 'smooth' })
              }}
              className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                activeSection === 'pod' ? 'bg-cyan-400 border-cyan-400 scale-125 shadow-[0_0_12px_#22d3ee]' : 'bg-slate-900 border-zinc-600'
              }`}
              title="Observation Pod: 346m"
            />

            {/* SPIRE Tick */}
            <button 
              onClick={() => {
                const h = document.documentElement.scrollHeight - window.innerHeight
                window.scrollTo({ top: h, behavior: 'smooth' })
              }}
              className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                activeSection === 'spire' ? 'bg-cyan-400 border-cyan-400 scale-125 shadow-[0_0_12px_#22d3ee]' : 'bg-slate-900 border-zinc-600'
              }`}
              title="Spire Summit: 553m"
            />
          </div>
        </div>

        {/* Section Labels beside ticks */}
        <div className="flex flex-col justify-between h-[300px] py-1 text-[9px] font-mono tracking-widest text-zinc-500">
          <span className={activeSection === 'base' ? 'text-cyan-400 font-bold' : ''}>01 / BASE_CAMP [0m]</span>
          <span className={activeSection === 'shaft' ? 'text-cyan-400 font-bold' : ''}>02 / SHAFT_CLIMB [150m]</span>
          <span className={activeSection === 'pod' ? 'text-cyan-400 font-bold' : ''}>03 / THE_POD [346m]</span>
          <span className={activeSection === 'spire' ? 'text-cyan-400 font-bold' : ''}>04 / THE_SPIRE [553m]</span>
        </div>
      </div>

      {/* 2. DYNAMIC FLOATING INTERACTIVE HOTSPOTS */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          {visibleHotspots.map((hotspot) => (
            <motion.div
              key={hotspot.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ left: hotspot.x, top: hotspot.y }}
            >
              {/* Outer pulsing beacon ring */}
              <div 
                onClick={() => setOpenHotspot(openHotspot === hotspot.id ? null : hotspot.id)}
                className="w-10 h-10 rounded-full border border-cyan-400/40 bg-slate-950/60 shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center justify-center relative hover:scale-110 hover:border-cyan-400 transition-all group"
              >
                {/* Glowing inner core */}
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] z-10" />

                {/* Micro hover indicator tooltips */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-950/90 border border-cyan-400/30 text-[9px] font-mono tracking-wider text-cyan-300 px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-20 pointer-events-none">
                  INTERACTIVE HOTSPOT
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. HOTSPOT DETAILS SIDE PANEL (GLASSMORPHISM CARD DRAWER) */}
      <AnimatePresence>
        {openHotspot && (
          (() => {
            const hs = hotspots.find(h => h.id === openHotspot)
            if (!hs) return null
            return (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-80 md:w-96 p-8 rounded-2xl bg-slate-950/80 border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl pointer-events-auto z-50"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setOpenHotspot(null)}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                >
                  ✕
                </button>

                {/* Hotspot Header */}
                <span className="text-[9px] font-mono tracking-[0.2em] text-cyan-400 uppercase">
                  ALTITUDE SPECS : {hs.altitude} METERS
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-2 mb-4">
                  {hs.title}
                </h3>
                
                {/* Hotspot description text */}
                <p className="text-xs md:text-sm leading-relaxed text-zinc-400 mb-6 font-medium">
                  {hs.content}
                </p>

                {/* Hotspot specs grid */}
                <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex flex-col">
                    <span className="text-zinc-500 text-[9px] tracking-wider uppercase">{hs.specLabel}</span>
                    <span className="text-cyan-400 font-bold mt-1 text-sm">{hs.specValue}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-zinc-500 text-[9px] tracking-wider uppercase">STRUCTURAL SCAN</span>
                    <span className="text-emerald-400 font-bold mt-1 text-sm">CALIBRATED</span>
                  </div>
                </div>
              </motion.div>
            )
          })()
        )}
      </AnimatePresence>
    </div>
  )
}
