'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 确保插件注册
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FirstPersonWalkProps {
  className?: string
  style?: React.CSSProperties
}

export default function FirstPersonWalk({ className, style }: FirstPersonWalkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    const image = imageRef.current
    const mask = maskRef.current

    if (!container || !scene || !image || !mask) return

    // 清理旧的 ScrollTrigger
    ScrollTrigger.getAll().forEach(t => t.kill())

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // 增加阻尼感，模拟沉重感
        pin: scene, // 钉住场景
        pinSpacing: true,
        // markers: true, // 调试用
      }
    })

    // 初始状态
    gsap.set(image, { scale: 1, filter: 'blur(0px)' })
    gsap.set(mask, { 
      clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      opacity: 1
    })

    // Step 1: 沉重的一步
    tl.addLabel('step1')
    tl.to(image, {
      scale: 1.3,
      filter: 'blur(8px)', // 瞬间模糊
      duration: 0.15,
      ease: 'power2.in',
    })
    .to(image, {
      scale: 1.15, // 回弹位置
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)', // 弹性回弹
    })

    // Step 2: 第二步
    tl.addLabel('step2')
    tl.to(image, {
      scale: 1.5,
      filter: 'blur(10px)',
      duration: 0.15,
      ease: 'power2.in',
    }, '+=0.2') // 稍微停顿
    .to(image, {
      scale: 1.35,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
    })

    // Step 3: 最后一步 + 转场
    tl.addLabel('step3')
    tl.to(image, {
      scale: 2.0,
      filter: 'blur(12px)',
      duration: 0.2,
      ease: 'power2.in',
    }, '+=0.2')
    
    // 黑色蒙版转场
    tl.to(mask, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // 展开填满屏幕
      duration: 0.3,
      ease: 'power4.in',
    }, '<+=0.1') // 与最后一步稍微重叠

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`} 
      style={{ 
        height: '400vh', // 提供足够的滚动距离 (4倍视口高度)
        ...style 
      }}
    >
      <div 
        ref={sceneRef}
        className="w-full h-screen sticky top-0 overflow-hidden flex items-center justify-center bg-black"
      >
        {/* 模拟走廊地板视角的背景 */}
        <div 
          ref={imageRef}
          className="w-full h-full absolute inset-0 bg-cover bg-center transform-gpu will-change-transform"
          style={{
            backgroundImage: 'url("/images/story/corridor-floor.jpg")', // 这里需要一张图
            // 如果没有图，用 CSS 渐变模拟走廊
            background: `
              radial-gradient(circle at 50% 30%, #1a1a1a 0%, #000000 60%),
              repeating-linear-gradient(
                0deg,
                transparent 0,
                transparent 40px,
                rgba(255,255,255,0.05) 41px,
                rgba(255,255,255,0.05) 42px
              ),
              conic-gradient(from 0deg at 50% 50%, #000 0deg, #111 15deg, #000 30deg, #111 45deg, #000 60deg)
            `,
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* 简单的透视线模拟 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        </div>

        {/* 转场蒙版 */}
        <div 
          ref={maskRef}
          className="absolute inset-0 bg-black z-50 pointer-events-none"
          style={{ clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
        ></div>

        {/* 文字提示 (可选) */}
        <div className="absolute bottom-20 text-white/30 text-sm font-light tracking-widest animate-pulse">
          SCROLL TO WALK
        </div>
      </div>
    </div>
  )
}

