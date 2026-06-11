'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Delhi time clock state
  const [delhiTime, setDelhiTime] = useState('')
  
  // Form status state
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Live Delhi Time ticking clock
  useEffect(() => {
    const updateDelhiTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      const formatter = new Intl.DateTimeFormat([], options)
      setDelhiTime(formatter.format(new Date()) + ' IST')
    }

    updateDelhiTime()
    const timer = setInterval(updateDelhiTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Parallax scrolling triggers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const smoothScroll = useSpring(scrollYProgress, { damping: 30, stiffness: 70, mass: 0.5 })

  // Horizontal parallax for typography lines
  const xL1 = useTransform(smoothScroll, [0, 1], [-120, 30])
  const xL2 = useTransform(smoothScroll, [0, 1], [80, -50])
  const xL3 = useTransform(smoothScroll, [0, 1], [-60, 60])

  // Vertical parallax offsets for columns (gives that floating depth layer feeling)
  const yForm = useTransform(smoothScroll, [0, 1], [90, -40])
  const yInfo = useTransform(smoothScroll, [0, 1], [40, -80])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setFormState('sending')
    
    // Simulate API request packets transmit
    setTimeout(() => {
      setFormState('success')
      // Reset form fields
      setFormData({ name: '', email: '', message: '' })
      
      // Reset state after 5 seconds
      setTimeout(() => setFormState('idle'), 5000)
    }, 2000)
  }

  const socialLinks = [
    { name: 'EMAIL', value: 'haze9707@gmail.com', href: 'mailto:haze9707@gmail.com' },
    { name: 'GITHUB', value: 'github.com/v3dqnt', href: 'https://github.com/v3dqnt' },
    { name: 'TWITTER', value: 'twitter.com/v3dqnt', href: 'https://twitter.com/v3dqnt' },
    { name: 'INSTAGRAM', value: 'instagram.com/vexcodez', href: 'https://instagram.com/vexcodez' }
  ]

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative bg-black overflow-hidden select-none border-t border-white/5 py-24 md:py-36 px-6 md:px-14 lg:px-20 z-10"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.012] pointer-events-none z-30" />

      {/* Background red glow bloom */}
      <div className="absolute bottom-0 right-[10%] w-[55%] h-[55%] bg-crimson-red/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* ── ISSUE HEADER BAR ── */}
      <div className="w-full flex justify-between items-center pb-6 border-b border-white/5 mb-16 md:mb-24 z-10 relative">
        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
          SEGMENT 04 // COLLABORATION
        </span>
        <div className="flex items-center space-x-4">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson-red animate-pulse" />
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.35em] text-crimson-red uppercase font-bold">
            GET IN TOUCH // VEDANT
          </span>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* ══ HEADING ══ */}
        <h2
          style={{ fontFamily: 'var(--font-sitrus)' }}
          className="text-[14vw] sm:text-[11vw] lg:text-[8.5vw] tracking-[-0.04em] leading-[0.78] text-white flex flex-col w-full overflow-visible mb-20 md:mb-28 uppercase"
        >
          <motion.span style={{ x: xL1 }} className="block cursor-default hover:-translate-x-1 transition-transform duration-300">LET&apos;S BUILD</motion.span>
          <motion.span style={{ x: xL2 }} className="block text-crimson-red pl-[4rem] sm:pl-[8rem] md:pl-[12rem] lg:pl-[16rem] -mt-[0.05em] cursor-default italic font-normal hover:translate-x-1 transition-transform duration-300">something</motion.span>
          <motion.span style={{ x: xL3 }} className="block -mt-[0.05em] cursor-default hover:-translate-x-1 transition-transform duration-300">beautiful.</motion.span>
        </h2>

        {/* ══ GRID LAYOUT ══ */}
        <div className="grid grid-cols-12 gap-y-16 lg:gap-y-0 lg:gap-16 items-start">
          
          {/* ── LEFT: FORM ── */}
          <motion.div
            style={{ y: yForm }}
            className="col-span-12 lg:col-span-7 flex flex-col gap-10 lg:border-r lg:border-white/5 lg:pr-16"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
              
              {/* Field 1: Name */}
              <div className="relative group">
                <span className="block font-mono text-[8px] tracking-[0.25em] text-zinc-500 uppercase mb-2">
                  [ 01 // YOUR NAME ]
                </span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-zinc-700 outline-none focus:border-crimson-red transition-colors duration-300 text-sm font-sans"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-crimson-red group-focus-within:w-full transition-all duration-500" />
              </div>

              {/* Field 2: Email */}
              <div className="relative group">
                <span className="block font-mono text-[8px] tracking-[0.25em] text-zinc-500 uppercase mb-2">
                  [ 02 // EMAIL ADDRESS ]
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-zinc-700 outline-none focus:border-crimson-red transition-colors duration-300 text-sm font-sans"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-crimson-red group-focus-within:w-full transition-all duration-500" />
              </div>

              {/* Field 3: Message */}
              <div className="relative group">
                <span className="block font-mono text-[8px] tracking-[0.25em] text-zinc-500 uppercase mb-2">
                  [ 03 // THE MISSION ]
                </span>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or idea..."
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-zinc-700 outline-none focus:border-crimson-red transition-colors duration-300 text-sm font-sans resize-none"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-crimson-red group-focus-within:w-full transition-all duration-500" />
              </div>

              {/* Submit Area */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4">
                <button
                  type="submit"
                  disabled={formState === 'sending' || formState === 'success'}
                  className="group relative overflow-hidden w-full md:w-auto px-10 py-4 border border-white/10 rounded-full font-mono text-[10px] tracking-[0.25em] uppercase font-bold text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,0,51,0.45)] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formState === 'idle' && (
                      <>
                        TRANSMIT SIGNAL <span className="text-crimson-red text-xs group-hover:text-black group-hover:translate-x-1 transition-all duration-300">→</span>
                      </>
                    )}
                    {formState === 'sending' && 'TRANSMITTING...'}
                    {formState === 'success' && 'SIGNAL RECEIVED ✓'}
                  </span>
                </button>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {formState === 'success' && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="font-mono text-[9px] tracking-wider text-crimson-red uppercase font-semibold"
                    >
                      [ Transmission secure. Thank you. ]
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </motion.div>

          {/* ── RIGHT: SOCIALS & CLOCK ── */}
          <motion.div
            style={{ y: yInfo }}
            className="col-span-12 lg:col-span-5 flex flex-col justify-between h-full gap-16 lg:pl-10"
          >
            {/* Clock & Info Grid */}
            <div className="grid grid-cols-2 gap-10">
              {/* Location */}
              <div>
                <span className="block font-mono text-[7px] tracking-[0.25em] text-crimson-red font-bold uppercase mb-1">
                  ORIGIN
                </span>
                <span className="block font-mono text-[10px] md:text-xs text-white uppercase tracking-wider">
                  New Delhi // India
                </span>
              </div>

              {/* Timezone Live Clock */}
              <div>
                <span className="block font-mono text-[7px] tracking-[0.25em] text-crimson-red font-bold uppercase mb-1">
                  LOCAL TIME // IST
                </span>
                <span className="block font-mono text-[10px] md:text-xs text-white tracking-widest font-semibold">
                  {delhiTime || '00:00:00 IST'}
                </span>
              </div>

              {/* Availability */}
              <div className="col-span-2 border-t border-white/5 pt-6 mt-2">
                <span className="block font-mono text-[7px] tracking-[0.25em] text-crimson-red font-bold uppercase mb-1">
                  STATUS
                </span>
                <span className="block font-mono text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Open for new opportunities &amp; design-heavy software collaborations.
                </span>
              </div>
            </div>

            {/* Social Links Spread */}
            <div className="flex flex-col gap-6 w-full pt-6 border-t border-white/5">
              <span className="block font-mono text-[8px] tracking-[0.3em] text-zinc-600 uppercase">
                DIRECT CHANNELS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-white/5 bg-zinc-950/20 backdrop-blur-sm p-4 rounded-[4px] transition-all duration-300 hover:border-crimson-red/20 hover:bg-zinc-950/60"
                  >
                    <span className="block font-mono text-[7px] tracking-[0.25em] text-zinc-500 uppercase mb-2 group-hover:text-crimson-red transition-colors duration-300">
                      {link.name}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-zinc-300 group-hover:text-white transition-colors duration-300">
                        {link.value}
                      </span>
                      <span className="text-[10px] text-zinc-700 group-hover:text-crimson-red group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* ── ISSUE FOOTER BAR ── */}
      <div className="w-full flex justify-between items-center pt-8 border-t border-white/5 mt-20 md:mt-32 z-10 relative">
        <span className="font-mono text-[7px] tracking-[0.3em] text-zinc-700 uppercase">
          V3DQNT // ALL RIGHTS RESERVED
        </span>
        <span className="font-mono text-[7px] tracking-[0.3em] text-zinc-700 uppercase">
          DESIGNED FROM SCRATCH
        </span>
      </div>

    </section>
  )
}
