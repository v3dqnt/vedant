'use client'

import { motion } from 'framer-motion'
import TorusRing from '@/components/ui/TorusRing'

export default function Hero() {
  const nameLetters = Array.from('VEDANT')

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { y: '110%', rotate: 8, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05 + 0.2,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  const gridLineVariants = {
    hidden: { scaleX: 0, scaleY: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent select-none p-6 md:p-10 font-mono text-zinc-500">
      
      {/* ─── EDITORIAL BORDER GRIDS (Sebastian Martinez / Axel inspiration) ─── */}
      {/* Top Border */}
      <motion.div 
        variants={gridLineVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-6 right-6 top-6 h-[1px] bg-white/5 origin-left z-0"
      />
      {/* Bottom Border */}
      <motion.div 
        variants={gridLineVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-6 right-6 bottom-6 h-[1px] bg-white/5 origin-right z-0"
      />
      {/* Left Border */}
      <motion.div 
        variants={gridLineVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-6 top-6 bottom-6 w-[1px] bg-white/5 origin-top z-0"
      />
      {/* Right Border */}
      <motion.div 
        variants={gridLineVariants}
        initial="hidden"
        animate="visible"
        className="absolute right-6 top-6 bottom-6 w-[1px] bg-white/5 origin-bottom z-0"
      />


      {/* ─── ROW 2: OVERSIZED STATEMENT TYPOGRAPHY (Seb® inspiration) ─── */}
      <div className="flex-1 flex flex-col justify-center items-center my-8 z-10 w-full px-8 relative">

        {/* ── TORUS RING — behind text ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div
            className="w-[min(72vw,700px)] h-[min(72vw,700px)] opacity-[0.45]"
            style={{
              animation: 'torus-spin 32s linear infinite',
            }}
          >
            <TorusRing
              size={600}
              ellipseCount={34}
              rx={228}
              ry={78}
              strokeColor="#ff0033"
              strokeWidth={1.4}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* heading sits on top */}
        <div style={{ position: 'relative', zIndex: 1 }} className="w-full flex flex-col justify-center items-center mt-5">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col justify-center items-center"
          >
          <div className="py-6 w-full flex justify-center overflow-visible">
            <h1 
              style={{ fontFamily: "var(--font-sitrus)" }}
              className="text-[16vw] md:text-[15vw] leading-[1.1] tracking-tight flex flex-nowrap justify-center font-normal uppercase text-white overflow-visible"
            >
              {nameLetters.map((letter, i) => (
                <div key={i} className="inline-block px-1 md:px-2 overflow-visible">
                  <motion.span
                    custom={i}
                    variants={letterVariants}
                    whileHover={{ 
                      y: -15,
                      scale: 1.06,
                      color: 'var(--crimson-red)', // Glowing Crimson Red accent
                      textShadow: '0 0 35px rgba(255, 0, 51, 0.65)',
                      transition: { type: 'spring', stiffness: 500, damping: 10 }
                    }}
                    className="cursor-default origin-bottom inline-block transition-colors duration-150"
                  >
                    {letter}
                  </motion.span>
                </div>
              ))}
            </h1>
          </div>


          </motion.div>
        </div>
      </div>

      {/* ─── CENTERED SCROLL INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="w-full flex flex-col items-center gap-3 pb-10 z-10"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 group cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-mono text-[9px] tracking-[0.35em] text-zinc-300 uppercase group-hover:text-crimson-red transition-colors duration-300">
            scroll
          </span>
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            className="text-zinc-300 group-hover:text-crimson-red transition-colors duration-300"
          >
            <path d="M10 3v14M4 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </motion.div>

    </section>
  )
}


