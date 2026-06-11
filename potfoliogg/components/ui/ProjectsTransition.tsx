'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function ProjectsTransition() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const s = useSpring(scrollYProgress, { damping: 30, stiffness: 80, mass: 0.5 })

  // "PROJECTS" text drifts up as you scroll in
  const yText    = useTransform(s, [0, 0.5, 1], [80, 0, -40])
  const opText   = useTransform(s, [0, 0.3, 0.8, 1], [0, 1, 1, 0])

  // Label fades with slight horizontal drift
  const xLabel   = useTransform(s, [0, 0.5, 1], [-30, 0, 10])
  const opLabel  = useTransform(s, [0, 0.35, 0.75, 1], [0, 1, 1, 0])

  // Background horizontal rule lines stretch in
  const scaleX   = useTransform(s, [0, 0.4], [0, 1])

  return (
    <section
      ref={ref}
      className="py-40 px-6 bg-black flex flex-col items-center justify-center border-t border-white/5 relative select-none overflow-hidden"
    >
      {/* Decorative stretch lines */}
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="absolute top-0 left-0 right-0 h-px bg-white/5"
      />
      <motion.div
        style={{ scaleX, originX: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/5"
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Label */}
        <motion.span
          style={{ x: xLabel, opacity: opLabel }}
          className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-8 block"
        >
          [ NEXT SEGMENT ]
        </motion.span>

        {/* PROJECTS link */}
        <motion.div style={{ y: yText, opacity: opText }}>
          <Link href="/projects" className="group flex items-center justify-center gap-6">
            <h2
              style={{ fontFamily: 'var(--font-sitrus)' }}
              className="text-[11vw] sm:text-[8vw] lg:text-[6vw] tracking-tight leading-none text-white group-hover:text-crimson-red transition-colors duration-500 uppercase"
            >
              Projects
            </h2>
            <span className="inline-block text-[5vw] sm:text-[3vw] lg:text-[2.5vw] font-sans font-light text-white/40 group-hover:text-crimson-red group-hover:translate-x-4 transition-all duration-500">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
