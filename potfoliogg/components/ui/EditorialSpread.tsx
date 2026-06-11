'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'

export default function EditorialSpread() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const smooth = useSpring(scrollYProgress, { damping: 32, stiffness: 80, mass: 0.5 })

  const figureY = useTransform(smooth, [0, 1], [60, -60])
  const leftY   = useTransform(smooth, [0, 1], [90, -30])
  const rightY  = useTransform(smooth, [0, 1], [30, -90])

  return (
    <section
      ref={ref}
      id="editorial"
      className="relative w-full bg-[#000000] overflow-hidden select-none border-t border-white/5"
    >
      {/* Grain texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.012] pointer-events-none z-20" />

      {/* ── ISSUE HEADER BAR ── */}
      <div className="w-full flex justify-between items-center px-6 md:px-16 lg:px-24 py-6 border-b border-white/5 z-10 relative">
        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
          PORTRAIT // EDITORIAL FEATURE
        </span>
        <div className="flex items-center space-x-4">
          <span className="w-1 h-1 rounded-full bg-crimson-red animate-pulse" />
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.35em] text-crimson-red uppercase font-bold">
            VEDANT SINGH // 2025
          </span>
        </div>
      </div>

      {/* ── MAIN EDITORIAL GRID ── */}
      <div className="relative w-full min-h-screen grid grid-cols-12 gap-0 items-stretch">

        {/* ═══ LEFT COLUMN ═══ */}
        <motion.div
          style={{ y: leftY }}
          className="col-span-12 md:col-span-4 flex flex-col justify-between px-6 md:px-12 lg:px-16 py-14 relative z-10 border-r border-white/5"
        >
          {/* Large Issue Number */}
          <div>
            <div
              style={{ fontFamily: 'var(--font-general)' }}
              className="text-[18vw] md:text-[10vw] font-black leading-none text-white tracking-tighter"
            >
              17
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-[2px] bg-crimson-red" />
              <span className="font-mono text-[8px] tracking-[0.3em] text-crimson-red uppercase font-bold">
                YEARS OLD
              </span>
            </div>

            {/* Main Headline */}
            <h2
              style={{ fontFamily: 'var(--font-sitrus)' }}
              className="text-[7vw] md:text-[3.5vw] leading-[0.88] tracking-tight text-white mt-8 italic"
            >
              BUILDER
              <br />
              <span className="text-crimson-red">OF THE</span>
              <br />
              NEW WAVE.
            </h2>

            {/* Story Paragraph */}
            <p className="text-[10px] md:text-[11px] text-zinc-400 leading-relaxed tracking-wide mt-6 max-w-[26ch] uppercase font-sans font-semibold">
              Full stack engineer from India. At 17, he architects premium digital
              experiences where rigid logic meets expressive design intuition.
            </p>
          </div>

          {/* Academic Block */}
          <div className="mt-12 border-t border-white/5 pt-8">
            <h4 className="font-mono text-[8px] tracking-[0.3em] text-zinc-600 uppercase mb-5">
              ACADEMIC FOCUS
            </h4>
            {[
              { label: 'PHYSICS', sub: 'Mechanics, Optics & Waves' },
              { label: 'CHEMISTRY', sub: 'Organic & Analytical Chem' },
              { label: 'MATHEMATICS', sub: 'Calculus, Algebra & Matrices' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-4 group cursor-default">
                <span className="font-mono text-[8px] text-zinc-700 mt-0.5 group-hover:text-crimson-red transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <span className="block text-white font-bold text-xs tracking-wider uppercase group-hover:text-crimson-red transition-colors duration-200">
                    {item.label}
                  </span>
                  <span className="block font-mono text-[8px] text-zinc-600 uppercase tracking-wider mt-0.5">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ CENTER FIGURE ═══ */}
        <motion.div
          style={{ y: figureY }}
          className="col-span-12 md:col-span-4 relative flex items-end justify-center overflow-visible z-10 border-r border-white/5"
        >
          {/* Red glow bloom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[55%] bg-crimson-red/15 blur-[80px] rounded-full pointer-events-none" />

          {/* Horizontal rule across figure */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 pointer-events-none" />

          {/* The SVG figure — duotone red effect:
              1. Grayscale the original portrait
              2. Red overlay via mix-blend-mode multiply
              → crisp red silhouette on black bg */}
          <div
            className="relative w-full flex items-end justify-center"
            style={{ height: '90vh' }}
          >
            {/* Grayscale portrait layer */}
            <Image
              src="/meow.svg"
              alt="Vedant Singh"
              fill
              className="object-contain object-bottom"
              style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.9)' }}
              priority
            />
            {/* Crimson red multiply overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: '#ff0033',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Overlay caption below figure */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-crimson-red" />
              <span className="font-mono text-[7px] tracking-[0.4em] text-zinc-500 uppercase">
                VEDANT SINGH // INDIA // 2025
              </span>
              <div className="h-px w-8 bg-crimson-red" />
            </div>
          </div>
        </motion.div>

        {/* ═══ RIGHT COLUMN ═══ */}
        <motion.div
          style={{ y: rightY }}
          className="col-span-12 md:col-span-4 flex flex-col justify-between px-6 md:px-10 lg:px-14 py-14 relative z-10"
        >
          {/* Achievement Teasers (VIBE magazine right column style) */}
          <div className="space-y-8">

            {/* Stat: Hackathon */}
            <div className="border-b border-white/5 pb-7 group cursor-default">
              <div className="flex items-baseline gap-4 mb-2">
                <span
                  style={{ fontFamily: 'var(--font-general)' }}
                  className="text-[9vw] md:text-[4.5vw] font-black text-crimson-red leading-none"
                >
                  01
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <h3 className="font-mono text-[9px] tracking-[0.25em] text-white uppercase font-bold mb-1.5 group-hover:text-crimson-red transition-colors">
                MASTERS UNION HACKATHON
              </h3>
              <p className="text-[9px] text-zinc-500 font-sans uppercase tracking-wider leading-relaxed max-w-[28ch]">
                Secured 1st Place overall against competing teams in a high-stakes engineering challenge.
              </p>
            </div>

            {/* Stat: COFAS */}
            <div className="border-b border-white/5 pb-7 group cursor-default">
              <div className="flex items-baseline gap-4 mb-2">
                <span
                  style={{ fontFamily: 'var(--font-general)' }}
                  className="text-[9vw] md:text-[4.5vw] font-black text-crimson-red leading-none"
                >
                  02
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <h3 className="font-mono text-[9px] tracking-[0.25em] text-white uppercase font-bold mb-1.5 group-hover:text-crimson-red transition-colors">
                COFAS 2024 // CMS LUCKNOW
              </h3>
              <p className="text-[9px] text-zinc-500 font-sans uppercase tracking-wider leading-relaxed max-w-[28ch]">
                Won at the Global Computer Festival held by CMS Lucknow — competing nationally.
              </p>
            </div>

            {/* AI Proficiency */}
            <div className="border-b border-white/5 pb-7 group cursor-default">
              <div className="flex items-baseline gap-4 mb-2">
                <span
                  style={{ fontFamily: 'var(--font-general)' }}
                  className="text-[9vw] md:text-[4.5vw] font-black text-white/30 leading-none group-hover:text-crimson-red/50 transition-colors"
                >
                  AI
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <h3 className="font-mono text-[9px] tracking-[0.25em] text-white uppercase font-bold mb-1.5 group-hover:text-crimson-red transition-colors">
                AI & MACHINE INTELLIGENCE
              </h3>
              <p className="text-[9px] text-zinc-500 font-sans uppercase tracking-wider leading-relaxed max-w-[28ch]">
                LLMs, vector embeddings, RAG pipelines, and AI API orchestration for intelligent full-stack systems.
              </p>
            </div>
          </div>

          {/* Bottom caption / magazine credits block */}
          <div className="mt-auto border-t border-white/5 pt-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block font-mono text-[7px] tracking-[0.25em] text-crimson-red font-bold uppercase mb-1">
                  ORIGIN
                </span>
                <span className="block font-mono text-[8px] tracking-[0.15em] text-zinc-500 uppercase">
                  INDIA // NEW DELHI
                </span>
              </div>
              <div>
                <span className="block font-mono text-[7px] tracking-[0.25em] text-crimson-red font-bold uppercase mb-1">
                  DISCIPLINE
                </span>
                <span className="block font-mono text-[8px] tracking-[0.15em] text-zinc-500 uppercase">
                  FULL STACK // PCM
                </span>
              </div>
              <div className="col-span-2 border-t border-white/5 pt-3 mt-1">
                <span className="block font-mono text-[7px] tracking-[0.25em] text-crimson-red font-bold uppercase mb-1">
                  STATUS
                </span>
                <span className="block font-mono text-[8px] tracking-[0.15em] text-zinc-500 uppercase">
                  BUILDING // LEARNING // COMPETING
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── ISSUE FOOTER BAR ── */}
      <div className="w-full flex justify-between items-center px-6 md:px-16 lg:px-24 py-5 border-t border-white/5 z-10 relative">
        <span className="font-mono text-[7px] tracking-[0.3em] text-zinc-700 uppercase">
          SYSTEMS: ONLINE // ALL ACTIVE
        </span>
        <span className="font-mono text-[7px] tracking-[0.3em] text-zinc-700 uppercase">
          FULL STACK DEVELOPER
        </span>
      </div>
    </section>
  )
}
