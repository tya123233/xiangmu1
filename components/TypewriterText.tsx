'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export default function TypewriterText({ 
  text, 
  speed = 80, 
  delay = 500,
  className = '' 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // 延迟后开始打字
    const startDelay = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startDelay)
  }, [delay])

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex])
      setCurrentIndex((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, isTyping])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-6 md:h-8 bg-white ml-1 animate-pulse" />
      )}
    </span>
  )
}








