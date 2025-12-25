'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

// 确保插件注册
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

interface MemoryTriggerProps {
  src: string
  alt?: string
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export default function MemoryTrigger({
  src,
  alt = 'Memory',
  href,
  onClick,
  className = '',
  style,
}: MemoryTriggerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  
  // 存储 Ken Burns 动画的 tween 引用
  const kenBurnsTween = useRef<gsap.core.Tween | null>(null)
  const router = useRouter()

  const { contextSafe } = useGSAP({ scope: containerRef })

  // 鼠标移入：唤醒记忆 (仅保留流动效果，无需变色)
  const handleMouseEnter = contextSafe(() => {
    const image = imageRef.current
    if (!image) return

    // Ken Burns Effect (缓慢流动)
    if (kenBurnsTween.current) kenBurnsTween.current.kill()
    
    kenBurnsTween.current = gsap.to(image, {
      scale: 1.15,
      xPercent: -2, 
      yPercent: -2,
      duration: 8,
      ease: 'none',
    })
  })

  // 鼠标移出：记忆尘封 (复位)
  const handleMouseLeave = contextSafe(() => {
    const image = imageRef.current
    if (!image) return

    // 停止流动并复位
    if (kenBurnsTween.current) kenBurnsTween.current.kill()
    
    gsap.to(image, {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      duration: 1.5,
      ease: 'power2.out',
    })
  })

  // 点击处理
  const handleClick = () => {
    if (onClick) onClick()
    
    if (href) {
      router.push(href)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl cursor-pointer group ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* 图片层 */}
      <div className="relative w-full h-full overflow-hidden bg-transparent">
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          // 移除 filter grayscale，保持原色
          className="object-contain transform-gpu will-change-transform transition-none"
        />
      </div>

      {/* 移除暗角遮罩，保持图片纯净 */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" /> */}
    </div>
  )
}
