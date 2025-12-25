'use client'

import { useEffect, useState } from 'react'
import { Cedarville_Cursive } from 'next/font/google'
import { motion } from 'framer-motion'

const cedarville = Cedarville_Cursive({
  weight: '400',
  subsets: ['latin'],
})

export default function ParallelAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 短暂延迟后开始动画
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full flex justify-center items-center bg-white min-h-[85vh] py-32 mb-32">
      <motion.h1
        className={`${cedarville.className} text-8xl md:text-[10rem] lg:text-[12rem] text-gray-900 tracking-wide`}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0, 
          scale: 1 
        } : {}}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1], // 优雅的缓动曲线
        }}
      >
        Parallel
      </motion.h1>
    </div>
  )
}
