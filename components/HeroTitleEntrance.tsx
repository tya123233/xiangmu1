'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Josefin_Sans } from 'next/font/google'

// 配置字体
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'], // 加载细体、常规和粗体
  display: 'swap',
})

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

interface HeroTitleEntranceProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function HeroTitleEntrance({ 
  title = 'Chapter 1', 
  subtitle = 'Before Sunrise',
  className = '' 
}: HeroTitleEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return

    // The "Macro Crop" Entrance - 现在应用于整个内容组
    gsap.fromTo(
      contentRef.current,
      {
        scale: 15, // 依然保持巨大的初始缩放，文字和副标题都会变成抽象形状
        y: -50,
        opacity: 0,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 2.2, // 稍微延长一点时间，因为内容变多了
        ease: 'expo.out',
        delay: 1,
      }
    )
  }, { scope: containerRef })

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full flex items-center justify-center overflow-hidden ${className} ${josefin.className}`}
    >
      {/* 使用 wrap div 作为动画目标，让标题和副标题作为一个整体运动 */}
      <div 
        ref={contentRef}
        className="flex flex-col items-center justify-center will-change-transform text-center"
      >
        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black leading-none select-none ${josefin.className}`}>
          {title}
        </h1>
        <p className={`mt-2 text-xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] text-gray-800 uppercase select-none ${josefin.className}`}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}
