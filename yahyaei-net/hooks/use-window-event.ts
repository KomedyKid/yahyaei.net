import { useEffect, useState } from 'react'

type WindowEvent = 'scroll' | 'resize'

export function useWindowEvent(event: WindowEvent, callback: () => void) {
  useEffect(() => {
    window.addEventListener(event, callback)
    callback() // Call once to set initial state

    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

export function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState(false)

  useWindowEvent('scroll', () => {
    setIsScrolled(window.scrollY > 10)
  })

  return isScrolled
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useWindowEvent('resize', () => {
    setIsMobile(window.innerWidth <= 768)
  })

  return isMobile
}

