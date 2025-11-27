"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"
import confetti from "canvas-confetti"

// 交互阶段状态
type InteractionPhase = "waiting" | "exploding" | "fading" | "redirecting"

export default function ShaderDemoPage() {
  const router = useRouter()
  const [speed] = useState(0.5)
  const [scale] = useState(0.5)
  const [activeEffect] = useState<"mesh" | "dots" | "combined">("mesh")
  
  // 交互状态
  const [phase, setPhase] = useState<InteractionPhase>("waiting")
  const [showOrb, setShowOrb] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)

  // 预加载目标路由
  useEffect(() => {
    router.prefetch("/story-timeline")
  }, [router])

  // 触发油墨爆炸效果
  const triggerExplosion = useCallback(() => {
    // 定义自定义墨迹形状 (SVG Path)
    const inkBlob1 = confetti.shapeFromPath({ path: 'M25 50C11.2 50 0 38.8 0 25C0 11.2 11.2 0 25 0C38.8 0 50 11.2 50 25C50 38.8 38.8 50 25 50Z' }); // 圆润基础形
    const inkBlob2 = confetti.shapeFromPath({ path: 'M42.6 15.6C44.4 13.6 43.6 9.8 41.4 8.2C38.2 5.8 33.8 2.4 29.4 1.2C23.6 -0.4 16.6 1.4 11.8 5.2C7.6 8.6 4.2 13.2 2.4 18.2C0.8 22.6 1.6 27.4 4.4 30.8C7.4 34.4 11.6 36.8 16 38.4C20.6 40 25.6 40.6 30.2 39.6C35.8 38.4 40.8 35.2 43.8 30.2C45.8 26.8 46.4 22.6 45.2 18.8C44.6 17.6 43.6 16.6 42.6 15.6Z' }); // 不规则飞溅形
    const inkBlob3 = confetti.shapeFromPath({ path: 'M35.2 5.8C32.6 3.2 28.8 2.2 25.4 2.8C19.8 3.8 15.2 8.4 12.4 13.2C9.8 17.8 8.6 23.2 9.2 28.4C9.6 32.8 11.8 36.8 15.2 39.6C19.4 43 25.2 44.4 30.4 43.2C35.4 42 39.8 38.6 42.4 34C44.2 30.8 44.8 27 44.2 23.4C43.6 19 41.4 15.2 38.2 12.2C37.2 11.2 36.2 10.2 35.2 9.2C35.2 8 35.2 6.8 35.2 5.8Z' }); // 拉长液滴形

    const duration = 1200
    const animationEnd = Date.now() + duration
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 30 * (timeLeft / duration)

      // 1. 核心大墨块 (主要视觉)
      confetti({
        particleCount: Math.floor(particleCount * 0.5),
        startVelocity: 35,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ffffff", "#f2f2f2", "#e6e6e6"],
        shapes: [inkBlob1, inkBlob2], // 使用不规则形状
        scalar: randomInRange(2, 4),   // 巨大的墨块
        drift: randomInRange(-0.2, 0.2),
        gravity: 0.6,
        disableForReducedMotion: true,
        zIndex: 9999,
        flat: true, // 关键：让粒子扁平化，不进行3D旋转，更像液体
      })

      // 2. 外围飞溅液滴 (细节)
      confetti({
        particleCount: Math.floor(particleCount),
        startVelocity: 55, // 速度更快
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ffffff"],
        shapes: [inkBlob3, "circle"], // 混合圆形和小液滴
        scalar: randomInRange(0.5, 1.5), // 细小的飞溅
        drift: randomInRange(-0.8, 0.8), // 强烈的随机漂移
        gravity: 0.8,
        disableForReducedMotion: true,
        zIndex: 9998,
        flat: true,
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  // 处理圆球点击
  const handleOrbClick = useCallback(() => {
    if (phase !== "waiting") return

    setPhase("exploding")
    setShowOrb(false)

    // 触发爆炸
    triggerExplosion()

    // 1.5秒后开始淡入白色遮罩
    setTimeout(() => {
      setPhase("fading")
      setShowOverlay(true)
    }, 1500)

    // 2.5秒后跳转
    setTimeout(() => {
      setPhase("redirecting")
      router.push("/story-timeline")
    }, 2500)
  }, [phase, triggerExplosion, router])

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* === 背景层 === */}
      {activeEffect === "mesh" && (
        <MeshGradient
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={speed}
          distortion={1}
          swirl={0.8}
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        />
      )}

      {activeEffect === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-black">
          <DotOrbit
            colors={["#333333", "#1a1a1a", "#555555", "#222222"]}
            colorBack="#000000"
            scale={scale}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
            speed={speed * 0.5}
            distortion={0.5}
            swirl={0.5}
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <DotOrbit
              colors={["#333333", "#1a1a1a", "#555555", "#222222"]}
              colorBack="transparent"
              scale={scale * 0.8}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </>
      )}

      {/* === 光效装饰层 === */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/5 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>

      {/* === 发光呼吸圆球 === */}
      <AnimatePresence>
        {showOrb && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleOrbClick}
              className="relative w-24 h-24 rounded-full cursor-pointer focus:outline-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.5,
                },
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 外发光层 */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  boxShadow: [
                    "0 0 40px 20px rgba(255,255,255,0.3), 0 0 80px 40px rgba(255,255,255,0.15)",
                    "0 0 60px 30px rgba(255,255,255,0.4), 0 0 100px 50px rgba(255,255,255,0.2)",
                    "0 0 40px 20px rgba(255,255,255,0.3), 0 0 80px 40px rgba(255,255,255,0.15)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* 中间渐变层 */}
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 100%)",
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* 核心高亮 */}
              <div
                className="absolute inset-4 rounded-full bg-white"
                style={{
                  boxShadow: "inset 0 0 20px rgba(255,255,255,1)",
                }}
              />

              {/* 提示文字 */}
              <motion.span
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm whitespace-nowrap font-light tracking-wider"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Click to Enter
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === 白色遮罩层 === */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute inset-0 bg-white z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* === 加载提示（重定向时） === */}
      <AnimatePresence>
        {phase === "redirecting" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-[110]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
