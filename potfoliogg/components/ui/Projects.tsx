'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import VoronoiCanvas from '@/components/ui/VoronoiCanvas'

export default function Projects() {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Section refs for parallax mapping
  const verityRef = useRef<HTMLDivElement>(null)
  const noaiRef = useRef<HTMLDivElement>(null)

  const word = 'PROJECTS'
  const letters = Array.from(word)

  // Spring options for individual letter animations (makes the ripple liquid)
  const letterSpringConfig = { damping: 22, stiffness: 180, mass: 0.4 }

  // Track scroll progression for each section
  const { scrollYProgress: verityScroll } = useScroll({
    target: verityRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: noaiScroll } = useScroll({
    target: noaiRef,
    offset: ["start end", "end start"]
  })

  // Smooth springs for buttery parallax motion
  // Verity Parallax Springs (Asymmetric opposite motion)
  const verityBgY = useSpring(useTransform(verityScroll, [0, 1], [-160, 160]), { stiffness: 45, damping: 24 })
  const verityLeftY = useSpring(useTransform(verityScroll, [0, 1], [80, -80]), { stiffness: 55, damping: 20 })
  const verityRightY = useSpring(useTransform(verityScroll, [0, 1], [-90, 90]), { stiffness: 55, damping: 20 })

  // Noai Parallax Springs (Movie Poster scroll depth)
  const noaiBgY = useSpring(useTransform(noaiScroll, [0, 1], [-180, 180]), { stiffness: 45, damping: 24 })
  const noaiTextY = useSpring(useTransform(noaiScroll, [0, 1], [70, -70]), { stiffness: 55, damping: 20 })

  return (
    <div ref={containerRef} className="relative w-full bg-[#000000]">
      {/* ── Subtle analog noise/grain overlay for visual texture ── */}
      <div className="absolute inset-0 bg-noise opacity-[0.012] pointer-events-none z-30" />

      {/* ── SECTION 1: HIGH-IMPACT WAVY COMMANDING TITLE PAGE ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 overflow-hidden select-none border-b border-white/5">
        <div 
          className="relative flex items-center justify-center w-full h-64 select-none overflow-visible"
          onMouseLeave={() => setHoveredLetter(null)}
        >
          <div className="flex items-center space-x-[2px] sm:space-x-1 md:space-x-2 lg:space-x-3 overflow-visible h-full">
            {letters.map((letter, i) => {
              // Calculate default wave-scale based on distance from center (i = 3.5)
              const center = (letters.length - 1) / 2
              const distanceFromCenter = Math.abs(i - center)
              
              // Base formula for the commanding lens wave shape
              let targetScaleY = 1.0 + 3.6 * Math.exp(-Math.pow(distanceFromCenter, 2) / 3.8)
              let targetScaleX = 1.25 - 0.52 * Math.exp(-Math.pow(distanceFromCenter, 2) / 3.8)

              // Interactive hover modification: wave shifts to focus under mouse
              if (hoveredLetter !== null) {
                const distanceFromHover = Math.abs(i - hoveredLetter)
                targetScaleY = 1.0 + 4.2 * Math.exp(-Math.pow(distanceFromHover, 2) / 1.8)
                targetScaleX = 1.3 - 0.6 * Math.exp(-Math.pow(distanceFromHover, 2) / 1.8)
              }

              // Create smooth animated values using springs
              const scaleY = useSpring(targetScaleY, letterSpringConfig)
              const scaleX = useSpring(targetScaleX, letterSpringConfig)

              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredLetter(i)}
                  style={{ 
                    scaleY, 
                    scaleX,
                    transformOrigin: 'center center',
                    fontFamily: 'var(--font-sitrus)'
                  }}
                  className="leading-none text-white tracking-tighter uppercase flex items-center justify-center overflow-visible select-none text-[9vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5vw] transition-colors duration-200 hover:text-crimson-red cursor-pointer font-normal"
                >
                  {letter}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROJECT 01 - VERITY (Asymmetric Brutalist Parallax Layout) ── */}
      <section ref={verityRef} className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-16 lg:px-24 overflow-hidden select-none border-b border-white/5 bg-[#000000] group">
        
        {/* PARALLAX OUTLINE TEXT WATERMARKS */}
        <motion.div 
          style={{ y: verityBgY, WebkitTextStroke: '1px rgba(255, 0, 51, 0.1)', color: 'transparent', fontFamily: 'var(--font-general)' }}
          className="absolute left-[5vw] top-[5vh] text-[16vw] font-black uppercase pointer-events-none select-none tracking-[0.2em] leading-none z-0 opacity-40"
        >
          VERITY
        </motion.div>

        <motion.div 
          style={{ y: verityBgY, WebkitTextStroke: '2.5px rgba(255, 0, 51, 0.7)', color: 'transparent', fontFamily: 'var(--font-general)' }}
          className="absolute -right-[4vw] -top-[5vh] text-[50vw] font-black pointer-events-none select-none leading-none z-0 opacity-80"
        >
          01
        </motion.div>

        {/* Section Header */}
        <div className="w-full flex justify-between items-center font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-500 uppercase z-10 border-b border-white/5 pb-6">
          <div className="flex items-center space-x-3">
            <span>PROJECT: VERITY</span>
            <span className="w-1 h-1 rounded-full bg-crimson-red" />
            <span className="text-crimson-red font-bold">VOL. 03 // MARKETING AUTOMATION</span>
          </div>
          <span>SPEC 01 / 02</span>
        </div>

        {/* Asymmetrical Split Flex Layout */}
        <div className="my-auto z-10 flex flex-col lg:flex-row justify-between items-stretch py-16 gap-12 w-full max-w-7xl mx-auto">
          
          {/* Left Column - Staggered Left Parallax */}
          <motion.div 
            style={{ y: verityLeftY }} 
            className="w-full lg:w-[46%] flex flex-col justify-center items-start"
          >
            <h3 
              style={{ fontFamily: 'var(--font-general)' }}
              className="text-[9vw] sm:text-[7vw] lg:text-[5vw] font-black leading-[0.88] tracking-tighter text-white uppercase mb-8"
            >
              <span className="block hover:text-crimson-red transition-colors duration-300">VERITY</span>
            </h3>
            
            <p className="text-sm sm:text-base md:text-md text-zinc-400 font-sans tracking-[0.05em] leading-relaxed max-w-md font-bold uppercase text-left border-l border-white/5 pl-6 py-2">
              An AI-powered marketing assistant engineered specifically for youth brands. Driving hyper-targeted audience engagement, graphic type experiments, and real-time cultural energy.
            </p>
          </motion.div>

          {/* Right Column - Staggered Right Parallax (Opposing direction) */}
          <motion.div 
            style={{ y: verityRightY }} 
            className="w-full lg:w-[46%] flex flex-col justify-center items-start lg:items-end lg:text-right mt-8 lg:mt-0"
          >
            <h3 
              style={{ WebkitTextStroke: '1.5px #ffffff', color: 'transparent', fontFamily: 'var(--font-general)' }}
              className="text-[9vw] sm:text-[7vw] lg:text-[5vw] font-black leading-[0.88] tracking-tighter uppercase mb-8 transition-all hover:text-white duration-300"
            >
              <span className="block">GROW</span>
              <span className="block">LOUDER.</span>
            </h3>

            {/* Brutalist Tech Spec Panel */}
            <div className="grid grid-cols-2 gap-4 max-w-sm w-full font-mono text-[9px] tracking-wider uppercase text-zinc-500 border border-white/5 p-6 bg-zinc-950/40 backdrop-blur-md text-left z-10">
              <div>
                <span className="block text-zinc-600">SYS CORE</span>
                <span className="block text-white font-bold mt-0.5">VERITY-AI // V.03</span>
              </div>
              <div>
                <span className="block text-zinc-600">TARGETING</span>
                <span className="block text-crimson-red font-bold mt-0.5">GEN-Z // YOUTH</span>
              </div>
              <div className="col-span-2 border-t border-white/5 pt-2 mt-2">
                <span className="block text-zinc-600">ACCELERATION STATE</span>
                <span className="block text-white font-bold mt-0.5">MAX CAPACITY // AUTOMATED</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section Footer */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end z-10 border-t border-white/5 pt-8 gap-6">
          <div className="flex flex-wrap gap-2.5">
            {['Next.js', 'OpenAI API', 'Analytics', 'Tailwind'].map((tag, i) => (
              <span 
                key={i}
                className="text-[9px] md:text-[10px] font-mono tracking-wider font-semibold px-4 py-1.5 bg-zinc-950 text-zinc-400 border border-zinc-800 rounded-[2px] uppercase hover:border-crimson-red/20 hover:text-crimson-red transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.a 
            href="#"
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-white hover:text-crimson-red font-bold uppercase inline-flex items-center space-x-3 pb-1 border-b border-transparent hover:border-crimson-red transition-all"
          >
            <span>LAUNCH PLATFORM</span>
            <span className="text-sm font-sans">→</span>
          </motion.a>
        </div>
      </section>

      {/* ── SECTION 3: PROJECT 02 - NOAI (Voronoi Cell Design) ── */}
      <section ref={noaiRef} className="relative w-full bg-[#000] overflow-hidden select-none border-b border-white/5">

        {/* ── VORONOI CELL GRAPHIC ── */}
        <motion.div style={{ y: noaiBgY, height: '68vh' }} className="w-full pointer-events-none">
          <VoronoiCanvas numPoints={38} lineWidthCss={3.5} seed={42} className="w-full h-full" />
        </motion.div>

        {/* ── SPACE ── */}
        <div className="h-10 md:h-16" />

        {/* ── TEXT CONTENT ── full-width, no card */}
        <motion.div style={{ y: noaiTextY }} className="px-6 md:px-16 lg:px-24 pb-20 z-10 relative">

          {/* Label row */}
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/5">
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.35em] text-zinc-500 uppercase">
              <span>Project: NOAI</span>
              <span className="w-1 h-1 rounded-full bg-crimson-red" />
              <span className="text-crimson-red font-bold">100% Human Certified</span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 uppercase">02 / 02</span>
          </div>

          {/* Giant project name */}
          <h3
            style={{ fontFamily: 'var(--font-general)' }}
            className="text-[22vw] sm:text-[18vw] lg:text-[14vw] font-black leading-[0.82] tracking-tighter text-white uppercase mb-10"
          >
            NOAI
          </h3>

          {/* Three-column metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8 border-t border-white/5">
            <div>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                A progressive social platform that restricts AI-generated content using secure semantic NLP classifiers. Authentic human creativity, enforced.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 content-start">
              {['Decentralized', 'Node.js', 'NLP Classifier', 'Tailwind'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[8px] tracking-widest px-3 py-1.5 bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase hover:text-white hover:border-zinc-600 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="md:text-right flex md:flex-col md:items-end justify-between md:justify-start gap-4">
              <motion.a
                href="#"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="font-mono text-[9px] tracking-[0.25em] text-white hover:text-crimson-red font-bold uppercase inline-flex items-center gap-2 transition-colors"
              >
                <span>Launch Platform</span>
                <span className="text-sm font-sans">→</span>
              </motion.a>
              <div className="text-left md:text-right mt-auto">
                <span className="block font-mono text-[8px] tracking-[0.2em] text-crimson-red uppercase">Creative Engine // Vedant</span>
                <span className="block font-mono text-[7px] tracking-[0.15em] text-zinc-600 uppercase mt-1">Human Content Certified</span>
              </div>
            </div>
          </div>

        </motion.div>
      </section>


    </div>
  )
}
