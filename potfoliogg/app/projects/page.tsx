'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Projects from '@/components/ui/Projects'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-start relative select-none">
      {/* ── Subtle analog noise/grain overlay for visual texture ── */}
      <div className="absolute inset-0 bg-noise opacity-[0.012] pointer-events-none z-30" />

      {/* ── STUNNING MINIMAL FLOATING NAVIGATION BAR ── */}
      <nav className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-10 pb-4 flex justify-between items-center relative z-20">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-500 hover:text-crimson-red transition-colors duration-300 uppercase font-semibold group"
        >
          <span className="transform group-hover:-translate-x-1.5 transition-transform duration-300">←</span> 
          <span>BACK TO HOME</span>
        </Link>
        <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
          PROJECTS / ARCHIVE
        </div>
      </nav>

      {/* ── RENDER PROJECTS COMPONENT ── */}
      <div className="flex-grow">
        <Projects />
      </div>

      {/* ── FOOTER BAR ── */}
      <footer className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-12 pt-6 border-t border-white/5 flex justify-between items-center font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-zinc-600 uppercase relative z-20">
        <div>
          <span>SYSTEM // ONLINE</span>
        </div>
        <div>
          <span>© 2026 VEDANT</span>
        </div>
      </footer>
    </main>
  )
}
