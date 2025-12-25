'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400'],
  display: 'swap'
})

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

export default function QuoteTypewriter() {
  const text = "The prisoners see only the shadows of the objects, not the objects themselves."
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  // 用于驱动打字进度的虚拟对象
  const progressRef = useRef({ val: 0 })

  useGSAP(() => {
    // 延迟 2.5 秒开始 (Parallel 标题出现后)
    const tl = gsap.timeline({ delay: 2.5 })
    
    // 打字机效果
    tl.to(progressRef.current, {
      val: text.length,
      duration: 5, // 打字速度，稍微慢一点更有质感
      ease: "none",
      onUpdate: () => {
        if (textRef.current) {
          const count = Math.ceil(progressRef.current.val)
          textRef.current.innerText = text.substring(0, count)
        }
      }
    })
    
    // 结束后隐藏光标 (可选，或者让它一直闪)
    // tl.to(cursorRef.current, { opacity: 0, duration: 0.2 })

    // 光标一直闪烁
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut"
    })
    
  }, [])

  return (
    // z-index 低一点，防止遮挡
    <div className={`relative z-10 text-center mt-4 mb-2 h-8 ${josefin.className}`}>
      <p className="text-gray-800 text-sm md:text-lg font-light tracking-widest uppercase">
        <span ref={textRef}></span>
        <span ref={cursorRef} className="inline-block w-[1px] h-4 bg-gray-800 ml-1 align-middle opacity-100">|</span>
      </p>
    </div>
  )
}

