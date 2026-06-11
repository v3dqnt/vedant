'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const s = useSpring(scrollYProgress, { damping: 28, stiffness: 70, mass: 0.5 })

  // Heading parallax
  const xL1 = useTransform(s, [0, 1], [-80,  20])
  const xL2 = useTransform(s, [0, 1], [ 80, -20])
  const xL3 = useTransform(s, [0, 1], [-60,  30])
  const xL4 = useTransform(s, [0, 1], [ 60, -30])

  // Left column rises
  const yLeft  = useTransform(s, [0, 0.4, 0.9, 1], [70, 0, 0, -30])
  const opLeft = useTransform(s, [0, 0.22, 0.78, 1], [0, 1, 1, 0])

  // Center figure — slower parallax for depth
  const yFig  = useTransform(s, [0, 1], [100, -100])
  const opFig = useTransform(s, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  // Right column — slight delay vs left
  const yRight  = useTransform(s, [0, 0.45, 0.9, 1], [90, 0, 0, -30])
  const opRight = useTransform(s, [0, 0.28, 0.78, 1], [0, 1, 1, 0])

  // Footer row
  const yFooter  = useTransform(s, [0, 0.5, 0.9, 1], [40, 0, 0, -20])
  const opFooter = useTransform(s, [0, 0.4, 0.9, 1], [0, 1, 1, 0])

  // Masthead drift
  const xMast = useTransform(s, [0, 0.5, 1], [-20, 0, 8])

  // VS—01 watermark float
  const yWM = useTransform(s, [0, 1], [50, -80])

  const opSec = useTransform(s, [0, 0.08, 0.92, 1], [0, 1, 1, 0])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#000] overflow-hidden select-none border-b border-white/5"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.012] pointer-events-none z-30" />

      <motion.div
        style={{ opacity: opSec }}
        className="max-w-[1700px] mx-auto w-full px-6 md:px-14 lg:px-20 py-28 md:py-36 relative z-10"
      >

        {/* ══ HEADING ══ */}
        <h2
          style={{ fontFamily: 'var(--font-sitrus)' }}
          className="text-[16vw] sm:text-[13vw] lg:text-[9.5vw] tracking-[-0.04em] leading-[0.74] text-white flex flex-col w-full overflow-visible mb-20 md:mb-28"
        >
          <motion.span style={{ x: xL1 }} className="block cursor-default hover:-translate-x-1 transition-transform duration-300 will-change-transform">The</motion.span>
          <motion.span style={{ x: xL2 }} className="block text-crimson-red pl-[4rem] sm:pl-[8rem] md:pl-[12rem] lg:pl-[16rem] -mt-[0.08em] cursor-default italic font-normal hover:translate-x-1 transition-transform duration-300 will-change-transform">intersection</motion.span>
          <motion.span style={{ x: xL3 }} className="block -mt-[0.06em] cursor-default hover:-translate-x-1 transition-transform duration-300 will-change-transform">of logic</motion.span>
          <motion.span style={{ x: xL4 }} className="block text-zinc-400 pl-[5rem] sm:pl-[10rem] md:pl-[15rem] lg:pl-[20rem] -mt-[0.06em] cursor-default hover:translate-x-1 transition-transform duration-300 will-change-transform">
            &amp; <span className="text-crimson-red italic">beauty.</span>
          </motion.span>
        </h2>



        {/* ══ 3-COLUMN EDITORIAL SPREAD ══ */}
        {/* Left text | Center figure | Right text */}
        <div className="grid grid-cols-12 gap-0 min-h-[85vh]">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            style={{ y: yLeft, opacity: opLeft }}
            className="col-span-12 lg:col-span-4 pr-0 lg:pr-10 border-r border-white/5 flex flex-col gap-10 pb-8"
          >
            {/* ORIGIN */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] text-crimson-red font-bold uppercase mb-2">01 — ORIGIN</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-sitrus)' }}>
                India.<br/>Age 17.
              </h3>
              <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans tracking-wide">
                Born in India, raised on code and curiosity. Vedant occupies a rare position at the intersection of rigorous scientific study and premium software engineering — building digital experiences that feel as deliberate as they look.
              </p>
            </div>

            {/* ACADEMIC */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] text-crimson-red font-bold uppercase mb-2">02 — ACADEMIC</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-sitrus)' }}>
                Physics.<br/>Chemistry.<br/>Maths.
              </h3>
              <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans tracking-wide">
                Currently pursuing PCM as academic majors. The same systematic thinking that resolves a mechanics problem informs how he architects a full-stack application from first principles — analytical precision built into every decision.
              </p>
            </div>

            {/* ENGINEERING */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] text-crimson-red font-bold uppercase mb-2">03 — ENGINEERING</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-sitrus)' }}>
                Full Stack.
              </h3>
              <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans tracking-wide">
                React, Next.js, Supabase, TypeScript, Python. A complete toolkit for disciplined architecture that scales — from expressive server-rendered interfaces to secure real-time backends.
              </p>
            </div>
          </motion.div>

          {/* ── CENTER: FIGURE ── */}
          <motion.div
            style={{ y: yFig, opacity: opFig }}
            className="hidden lg:flex col-span-4 relative flex-col items-center justify-end px-6"
          >
            {/* Red glow bloom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-crimson-red/10 blur-[80px] rounded-full pointer-events-none" />
            {/* Figure */}
            <div className="relative w-full" style={{ height: '90vh' }}>
              <Image
                src="/meow-red.svg"
                alt="Vedant"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
            {/* Caption */}
            <div className="flex items-center gap-3 py-4">
              <div className="h-px w-8 bg-crimson-red/40" />
              <span className="font-mono text-[7px] tracking-[0.45em] text-zinc-600 uppercase">VEDANT // 2025</span>
              <div className="h-px w-8 bg-crimson-red/40" />
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            style={{ y: yRight, opacity: opRight }}
            className="col-span-12 lg:col-span-4 pl-0 lg:pl-10 border-l border-white/5 flex flex-col gap-10 pb-8"
          >
            {/* AI */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] text-crimson-red font-bold uppercase mb-2">04 — AI PROFICIENCY</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-sitrus)' }}>
                Models.<br/>Agents.<br/>Systems.
              </h3>
              <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans tracking-wide">
                Fluent with large-language-model agents, vector embeddings, and RAG pipelines. Builds intelligent systems that are legible, maintainable, and genuinely useful — not just technically impressive.
              </p>
            </div>

            {/* RECOGNITION */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] text-crimson-red font-bold uppercase mb-2">05 — RECOGNITION</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-sitrus)' }}>
                Champion.
              </h3>
              <div className="flex flex-col gap-4">
                <div className="border-l-2 border-crimson-red pl-4">
                  <p className="text-[11px] font-mono tracking-widest text-white uppercase font-bold mb-1">Masters Union Hackathon</p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[8px] tracking-[0.25em] text-crimson-red uppercase font-bold bg-crimson-red/10 px-2 py-0.5">
                      ₹25,000
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.25em] text-crimson-red uppercase font-bold bg-crimson-red/10 px-2 py-0.5">
                      Best Design / UI
                    </span>
                  </div>
                  <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans">
                    Awarded ₹25,000 and recognised for Best Design &amp; UI — the intersection of craft and engineering under pressure.
                  </p>
                </div>
                <div className="border-l-2 border-crimson-red pl-4">
                  <p className="text-[11px] font-mono tracking-widest text-white uppercase font-bold mb-1">COFAS 2024 — CMS Lucknow</p>
                  <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans">
                    Winner. Global Computer Festival. Recognised for translating complexity into clarity.
                  </p>
                </div>
              </div>
            </div>

            {/* PHILOSOPHY */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] text-crimson-red font-bold uppercase mb-2">06 — PHILOSOPHY</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-sitrus)' }}>
                Logic &amp;<br/>Beauty.
              </h3>
              <p className="text-base sm:text-[17px] leading-[1.85] text-zinc-400 font-sans tracking-wide">
                Great software should not merely function — it should feel inevitable. Every interaction deliberate. Every animation purposeful. The practice is ongoing. The standard is high.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ══ FOOTER ROW ══ */}
        <motion.div
          style={{ y: yFooter, opacity: opFooter }}
          className="mt-10 pt-8 border-t border-white/5 flex items-end justify-between"
        >
          <motion.div style={{ y: yWM }}>
            <div
              style={{ fontFamily: 'var(--font-general)' }}
              className="text-[18vw] lg:text-[10vw] font-black text-white/[0.035] leading-none tracking-tighter select-none"
            >
              VS—01
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  )
}
