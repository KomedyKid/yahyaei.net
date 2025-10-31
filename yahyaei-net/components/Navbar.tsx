'use client'

import { useEffect, useMemo, useState, type SVGProps } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Calculator,
  FolderGit2,
  Github,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { useScrollPosition, useIsMobile } from '@/hooks/use-window-event'

const LinkedInMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M100.3 448H7.4V148.9h92.9zm-46.4-338A53.7 53.7 0 010 56.3 53.7 53.7 0 0153.9 0 53.7 53.7 0 01107.8 56.3a53.7 53.7 0 01-54 53.7zM447.9 448h-92.7V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.8 37.7-55.8 76.7V448h-92.7V148.9h88.9v40.8h1.3c12.4-23.5 42.6-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3z"
    />
  </svg>
)

const primaryLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'Projects',
    href: '/projects',
    icon: <FolderGit2 className="h-4 w-4" />,
  },
  {
    name: 'IB Score Converter',
    href: '/ib-score-converter',
    icon: <Calculator className="h-4 w-4" />,
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/KomedyKid',
    icon: <Github className="h-4 w-4" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/salimyahyaei/',
    icon: <LinkedInMark className="h-4 w-4" />,
  },
]

export function Navbar() {
  const isScrolled = useScrollPosition()
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMobile, isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navClasses = useMemo(
    () =>
      `mx-auto flex w-[min(100%-2rem,1080px)] items-center justify-between rounded-full border border-white/10 px-5 py-3 transition-all duration-500 ${
        isScrolled
          ? 'bg-gray-900/85 backdrop-blur-xl shadow-lg shadow-blue-900/20'
          : 'bg-gray-900/60 backdrop-blur-sm shadow-md shadow-blue-900/10'
      }`,
    [isScrolled],
  )

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-30 flex justify-center">
      <nav className="pointer-events-auto relative w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className={navClasses}
          layout
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
        >
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent px-3 py-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-500/10">
              <Image
                src="/logo.png"
                alt="yahyaei.net logo"
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-[0.35em] text-blue-300">
                yahyaei
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Sparkles className="h-3 w-3 text-blue-400" />
                building the future
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-150 hover:bg-white/10 hover:text-white"
              >
                {link.icon && (
                  <span className="text-blue-300 transition-transform duration-200 group-hover:-translate-y-0.5">
                    {link.icon}
                  </span>
                )}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-150 hover:border-blue-400/50 hover:text-white"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-colors duration-150 hover:border-blue-400/60 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-4 w-[min(100%-2rem,520px)] overflow-hidden rounded-3xl border border-white/10 bg-gray-950/95 px-6 py-6 shadow-2xl shadow-blue-900/40 backdrop-blur-xl md:hidden"
            >
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="space-y-3"
              >
                {primaryLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-base font-medium text-gray-100 transition-colors hover:border-blue-400/50 hover:bg-white/[0.08]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        {link.icon && (
                          <span className="text-blue-300">{link.icon}</span>
                        )}
                        {link.name}
                      </span>
                      <span className="text-xs uppercase tracking-wide text-blue-300/90">
                        open
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>

              <div className="mt-6 space-y-3 border-t border-white/5 pt-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Stay in touch
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-200 transition-colors hover:border-blue-400/50 hover:bg-white/[0.08]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
                        {link.icon}
                      </span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
