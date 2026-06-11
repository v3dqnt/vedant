'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function KeyboardNav() {
  const pathname = usePathname()

  const keys = [
    {
      path: '/',
      label: 'Home',
      // Tactile home / shelter icon SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      path: '/projects',
      label: 'Projects',
      // Tactile terminal / code icon SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      )
    }
  ]

  return (
    <div className="fixed right-6 md:right-10 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
      {/* ── VERTICAL SKEUOMORPHIC KEYBOARD MACROPAD PANEL ── */}
      <div className="flex flex-col items-center py-5 px-3.5 bg-[#0a0a0c] border border-white/5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.05)] backdrop-blur-md">
        
        {/* Panel brand tag at the top of the macropad */}
        <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-600 uppercase pb-3 mb-3 border-b border-white/5 w-full text-center block">
          MTRX
        </span>

        {/* Vertically stacked keys */}
        <div className="flex flex-col items-center space-y-3">
          {keys.map((key) => {
            const isActive = pathname === key.path

            return (
              <Link key={key.path} href={key.path} className="outline-none">
                {/* ── MECHANICAL SKEUOMORPHIC KEYCAP ── */}
                <motion.button
                  whileHover={{ y: 1 }}
                  whileTap={{ 
                    y: 4,
                    boxShadow: '0 1px 0px #030303, inset 0 2px 4px rgba(0,0,0,0.8)',
                    transition: { duration: 0.05 }
                  }}
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center relative cursor-pointer select-none transition-all duration-150 border-x border-t border-zinc-700/60
                    bg-gradient-to-b from-zinc-800 to-zinc-900
                    shadow-[0_5px_0px_#030303,0_10px_20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)]
                    hover:brightness-105 active:brightness-95
                  `}
                  title={key.label}
                >
                  {/* Glowing physical LED dot at the top center of the keycap */}
                  <span className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex h-1.5 w-1.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 transition-colors duration-300 ${
                      isActive ? 'bg-crimson-red' : 'bg-transparent'
                    }`} />
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 border border-black transition-colors duration-300 ${
                      isActive ? 'bg-crimson-red shadow-[0_0_8px_#ff0033]' : 'bg-zinc-700/80'
                    }`} />
                  </span>

                  {/* Icon centered on the key face */}
                  <div className={`mt-2 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-500'
                  }`}>
                    {key.icon}
                  </div>

                  {/* Subtle tactile character label on the bottom corner */}
                  <span className="absolute bottom-1 right-2 text-[7px] font-mono text-zinc-600 font-bold uppercase tracking-widest select-none">
                    {key.label[0]}
                  </span>
                </motion.button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
