'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollPosition, useIsMobile } from '@/hooks/use-window-event'

const menuItems = [
  {
    name: 'IB Score Converter',
    icon: <Calculator className="w-5 h-5" />,
    href: '/ib-score-converter',
  },
]

export function Navbar() {
  const isScrolled = useScrollPosition()
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && !isCollapsed && !(event.target as Element).closest('nav')) {
        setIsCollapsed(true)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobile, isCollapsed])

  return (
    <motion.nav
      className={`fixed top-4 left-4 z-20 transition-all duration-300 ease-in-out ${
        isCollapsed
          ? 'w-16 h-16 rounded-full flex items-center justify-center overflow-hidden'
          : 'w-64 h-auto rounded-2xl'
      } ${isScrolled ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-gray-800'}`}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      initial={false}
      onClick={() => isMobile && toggleCollapse()} // Open the navbar on click for mobile
      onMouseEnter={() => !isMobile && setIsCollapsed(false)}
      onMouseLeave={() => !isMobile && setIsCollapsed(true)}
    >
      {/* Centered Logo - Only shown when collapsed */}
      {isCollapsed && (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="yahyaei.net logo"
            width={32}
            height={32}
            className="w-8 h-8 object-cover"
          />
        </div>
      )}

      {/* Expanded Menu Content */}
      {!isCollapsed && (
        <div className="flex flex-col w-full px-4 py-4">
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="yahyaei.net logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <motion.span
                className="text-blue-400 font-bold text-xl"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                yahyaei.net
              </motion.span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation()
                toggleCollapse()
              }}
              aria-label="Collapse menu"
            >
              <ChevronRight
                className={`h-6 w-6 transition-transform duration-200 ${
                  isCollapsed ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </Button>
          </div>
          <AnimatePresence>
            <motion.ul
              className="space-y-4 w-full mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={isMobile ? toggleCollapse : undefined}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      )}
    </motion.nav>
  )
}
