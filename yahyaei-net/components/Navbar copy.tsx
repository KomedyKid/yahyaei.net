'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled && !isHovered ? 'h-12' : 'h-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className={`flex items-center justify-between h-full transition-all duration-300 ease-in-out ${
          isScrolled && !isHovered ? 'scale-90' : 'scale-100'
        }`}>
          <div className="flex items-center">
            <Link href="/" className="text-blue-400 font-bold text-xl">
              yahyaei.net
            </Link>
          </div>
          <div>
            <Link 
              href="/ib-score-converter" 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              IB Score Converter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

