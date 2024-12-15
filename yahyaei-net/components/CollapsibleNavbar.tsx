'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, User, Settings, HelpCircle } from 'lucide-react'

export default function CollapsibleNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { name: 'Home', icon: <Home />, href: '/' },
    { name: 'Profile', icon: <User />, href: '/profile' },
    { name: 'Settings', icon: <Settings />, href: '/settings' },
    { name: 'Help', icon: <HelpCircle />, href: '/help' },
  ]

  return (
    <nav
      className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <ul className="p-4">
        {navItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link href={item.href} className="flex items-center">
              <span className="mr-4">{item.icon}</span>
              <span className={`${isCollapsed ? 'hidden' : 'block'} transition-opacity duration-300`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

