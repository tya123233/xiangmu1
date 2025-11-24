'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
}

export default function ParallaxImage({ src, alt }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 监听滚动进度
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'], // 从元素进入视口到离开视口
  })

  // 将滚动进度转换为动画值
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]) // 放大效果
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 20]) // 模糊效果
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.3, 0]) // 虚化效果
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]) // 向上移动

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* 固定背景层 */}
      <motion.div
        className="sticky top-0 w-full h-screen"
        style={{
          scale,
          y,
        }}
      >
        {/* 图片容器 */}
        <motion.div
          className="relative w-full h-full"
          style={{
            opacity,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
            loading="eager"
          />
          
          {/* 动态模糊遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            style={{
              backdropFilter: useTransform(blur, (value) => `blur(${value}px)`),
            }}
          />
        </motion.div>
      </motion.div>

      {/* 提示文字 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-white text-center z-10 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.5, 0]),
        }}
      >
        <p className="text-xl md:text-2xl font-light tracking-wider">
          继续向下滚动
        </p>
        <motion.div
          className="mt-4 w-8 h-8 mx-auto border-2 border-white rounded-full"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}


