'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'

// 照片数据
const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  src: `/images/story/${String(i + 1).padStart(2, '0')}.png`,
  title: `Memory ${i + 1}`,
}))

export default function GestureCardGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  const [status, setStatus] = useState<string>('初始化中...')
  const [debugInfo, setDebugInfo] = useState<string>('')
  const [swipeIndicator, setSwipeIndicator] = useState<'left' | 'right' | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>(0)
  const videoReadyRef = useRef(false)
  
  // 滑动检测
  const startXRef = useRef<number | null>(null) // 手开始位置
  const currentXRef = useRef<number | null>(null) // 当前位置
  const isSwipingRef = useRef(false) // 是否正在滑动
  const swipeCooldownRef = useRef(false)
  const lastHandStateRef = useRef<'open' | 'closed' | 'unknown'>('unknown')
  const effectCooldownRef = useRef(false)
  
  // 配置 - 更低的阈值，更灵敏
  const SWIPE_THRESHOLD = 0.08 // 移动8%屏幕宽度就触发（更灵敏）
  const SWIPE_COOLDOWN = 500

  // 判断手是否张开（通过计算手指伸展程度）
  const isHandOpen = useCallback((landmarks: { x: number; y: number; z: number }[]) => {
    // 检查每个手指是否伸直
    // 手指尖索引: 拇指4, 食指8, 中指12, 无名指16, 小指20
    // 手指根部索引: 拇指2, 食指5, 中指9, 无名指13, 小指17
    
    const fingerTips = [8, 12, 16, 20] // 不检查拇指，因为角度不同
    const fingerBases = [5, 9, 13, 17]
    
    let extendedCount = 0
    for (let i = 0; i < fingerTips.length; i++) {
      const tip = landmarks[fingerTips[i]]
      const base = landmarks[fingerBases[i]]
      // 如果指尖比指根高（y值更小），则手指伸直
      if (tip.y < base.y) {
        extendedCount++
      }
    }
    
    return extendedCount >= 3 // 至少3个手指伸直 = 手张开
  }, [])

  // 判断手是否握拳
  const isHandClosed = useCallback((landmarks: { x: number; y: number; z: number }[]) => {
    const fingerTips = [8, 12, 16, 20]
    const fingerBases = [5, 9, 13, 17]
    
    let closedCount = 0
    for (let i = 0; i < fingerTips.length; i++) {
      const tip = landmarks[fingerTips[i]]
      const base = landmarks[fingerBases[i]]
      if (tip.y > base.y) {
        closedCount++
      }
    }
    
    return closedCount >= 3
  }, [])

  // 触发烟花特效
  const triggerConfetti = useCallback(() => {
    if (effectCooldownRef.current) return
    effectCooldownRef.current = true
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { x: 0.2 + Math.random() * 0.6, y: 0.4 + Math.random() * 0.3 },
          colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#1dd1a1'],
          ticks: 200,
          gravity: 0.6,
          scalar: 1.5,
        })
      }, i * 200)
    }
    
    setTimeout(() => { effectCooldownRef.current = false }, 1500)
  }, [])

  // 执行滑动
  const doSwipe = useCallback((direction: 'left' | 'right') => {
    if (swipeCooldownRef.current) return
    
    swipeCooldownRef.current = true
    setSwipeIndicator(direction)
    
    if (direction === 'right') {
      setCurrentIndex((prev) => (prev + 1) % PHOTOS.length)
      console.log('👉 下一张')
    } else {
      setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length)
      console.log('👈 上一张')
    }
    
    setTimeout(() => { 
      setSwipeIndicator(null)
    }, 300)
    
    setTimeout(() => { 
      swipeCooldownRef.current = false 
    }, SWIPE_COOLDOWN)
  }, [])

  // 绘制手部骨架
  const drawHand = useCallback((ctx: CanvasRenderingContext2D, landmarks: { x: number; y: number; z: number }[], width: number, height: number) => {
    // 连接线
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // 拇指
      [0, 5], [5, 6], [6, 7], [7, 8], // 食指
      [0, 9], [9, 10], [10, 11], [11, 12], // 中指
      [0, 13], [13, 14], [14, 15], [15, 16], // 无名指
      [0, 17], [17, 18], [18, 19], [19, 20], // 小指
      [5, 9], [9, 13], [13, 17] // 手掌
    ]
    
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 2
    
    for (const [start, end] of connections) {
      ctx.beginPath()
      ctx.moveTo(landmarks[start].x * width, landmarks[start].y * height)
      ctx.lineTo(landmarks[end].x * width, landmarks[end].y * height)
      ctx.stroke()
    }
    
    // 关键点
    ctx.fillStyle = '#ff0000'
    for (const point of landmarks) {
      ctx.beginPath()
      ctx.arc(point.x * width, point.y * height, 3, 0, 2 * Math.PI)
      ctx.fill()
    }
  }, [])

  // 手势预测循环
  const predictWebcam = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !handLandmarker || !videoReadyRef.current) {
      requestRef.current = requestAnimationFrame(predictWebcam)
      return
    }
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    if (!ctx || video.readyState < 2) {
      requestRef.current = requestAnimationFrame(predictWebcam)
      return
    }

    // 设置canvas尺寸
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    try {
      const results = handLandmarker.detectForVideo(video, performance.now())
      
      // 清除canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0]
        
        // 绘制手部
        drawHand(ctx, landmarks, canvas.width, canvas.height)
        
        // 使用手掌中心点（索引0是手腕，9是中指根部的中间）
        const palmX = landmarks[9].x
        
        // 检测手的状态
        const handOpen = isHandOpen(landmarks)
        const handClosed = isHandClosed(landmarks)
        
        let handState: 'open' | 'closed' | 'unknown' = 'unknown'
        if (handOpen) handState = 'open'
        else if (handClosed) handState = 'closed'
        
        // 检测握拳变张开 = 触发特效
        if (lastHandStateRef.current === 'closed' && handState === 'open') {
          console.log('🎉 握拳变张开，触发特效！')
          triggerConfetti()
        }
        lastHandStateRef.current = handState
        
        // 滑动检测逻辑
        currentXRef.current = palmX
        
        if (startXRef.current === null) {
          // 开始新的滑动追踪
          startXRef.current = palmX
          isSwipingRef.current = false
        } else {
          const deltaX = palmX - startXRef.current
          
          // 显示移动进度
          const progress = Math.abs(deltaX) / SWIPE_THRESHOLD
          setDebugInfo(`${handState === 'open' ? '✋' : handState === 'closed' ? '✊' : '🖐️'} ${Math.round(progress * 100)}%`)
          
          // 检查是否达到滑动阈值
          if (!isSwipingRef.current && Math.abs(deltaX) > SWIPE_THRESHOLD) {
            isSwipingRef.current = true
            
            if (deltaX > 0) {
              // 手向右移动（镜像后是向左）
              doSwipe('left')
            } else {
              // 手向左移动（镜像后是向右）
              doSwipe('right')
            }
            
            // 重置起点，允许连续滑动
            startXRef.current = palmX
          }
        }
        
        setStatus(`检测到手 ${handState === 'open' ? '(张开)' : handState === 'closed' ? '(握拳)' : ''}`)
      } else {
        // 没有检测到手
        setStatus('未检测到手')
        setDebugInfo('')
        startXRef.current = null
        isSwipingRef.current = false
        lastHandStateRef.current = 'unknown'
      }
    } catch (e) {
      console.error('Prediction error:', e)
    }

    requestRef.current = requestAnimationFrame(predictWebcam)
  }, [handLandmarker, drawHand, isHandOpen, isHandClosed, doSwipe, triggerConfetti])

  // 初始化 MediaPipe HandLandmarker
  useEffect(() => {
    const init = async () => {
      try {
        setStatus('加载AI模型...')
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        )
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'CPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        })
        setHandLandmarker(landmarker)
        setStatus('模型已加载，启动摄像头...')
      } catch (e) {
        console.error('Failed to init MediaPipe:', e)
        setStatus('模型加载失败')
      }
    }
    init()
  }, [])

  // 启动摄像头
  useEffect(() => {
    if (!handLandmarker) return
    
    const video = videoRef.current
    if (!video) return

    const startCamera = async () => {
      try {
        setStatus('请求摄像头权限...')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          }
        })
        video.srcObject = stream
        
        video.onloadedmetadata = () => {
          video.play().then(() => {
            videoReadyRef.current = true
            setStatus('准备就绪！')
            console.log('Video ready:', video.videoWidth, 'x', video.videoHeight)
            predictWebcam()
          })
        }
      } catch (e) {
        console.error('Camera error:', e)
        setStatus('摄像头访问被拒绝')
      }
    }
    
    startCamera()
    
    return () => {
      cancelAnimationFrame(requestRef.current)
      videoReadyRef.current = false
      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(t => t.stop())
      }
    }
  }, [handLandmarker, predictWebcam])

  // 键盘控制
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') doSwipe('left')
      if (e.key === 'ArrowRight') doSwipe('right')
      if (e.key === ' ') {
        e.preventDefault()
        triggerConfetti()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [doSwipe, triggerConfetti])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* 滑动指示器 */}
      <AnimatePresence>
        {swipeIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
          >
            <div className={`text-9xl ${swipeIndicator === 'left' ? 'text-blue-400' : 'text-green-400'}`}>
              {swipeIndicator === 'left' ? '👈' : '👉'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 标题 */}
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-light text-white mb-8 tracking-widest"
      >
        Memorial Gallery
      </motion.h1>

      {/* 卡片容器 */}
      <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {PHOTOS.map((photo, index) => {
            const offset = index - currentIndex
            const isActive = offset === 0
            
            let adjustedOffset = offset
            if (offset > PHOTOS.length / 2) adjustedOffset = offset - PHOTOS.length
            if (offset < -PHOTOS.length / 2) adjustedOffset = offset + PHOTOS.length
            
            if (Math.abs(adjustedOffset) > 2) return null

            return (
              <motion.div
                key={photo.id}
                className="absolute w-72 h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  x: adjustedOffset * 60,
                  y: Math.abs(adjustedOffset) * 10,
                  scale: isActive ? 1 : 0.85 - Math.abs(adjustedOffset) * 0.05,
                  opacity: isActive ? 1 : 0.6 - Math.abs(adjustedOffset) * 0.15,
                  zIndex: 10 - Math.abs(adjustedOffset),
                  rotateY: adjustedOffset * -5,
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={() => setCurrentIndex(index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-full h-full bg-white">
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">{photo.title}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* 指示器 */}
      <div className="flex gap-2 mt-8">
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* 手势提示 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-white/60 text-sm text-center"
      >
        <p>👋 左右移动手切换照片</p>
        <p>✊→✋ 握拳后张开触发烟花</p>
        <p className="text-xs mt-2 opacity-50">键盘: ← → 空格</p>
      </motion.div>

      {/* 摄像头预览（右下角）- 带手部骨架 */}
      <div className="fixed bottom-4 right-4 z-50 w-56 h-42 rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 bg-black">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover transform scale-x-[-1]"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute w-full h-full object-cover transform scale-x-[-1]"
        />
        {/* 状态显示 */}
        <div className="absolute top-1 left-1 right-1 flex justify-between items-start">
          <span className="text-[10px] text-white bg-black/70 px-2 py-1 rounded">
            {status}
          </span>
          {debugInfo && (
            <span className="text-[10px] text-green-400 bg-black/70 px-2 py-1 rounded font-mono">
              {debugInfo}
            </span>
          )}
        </div>
      </div>

      {/* 调试按钮 */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => doSwipe('left')}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm transition-colors"
        >
          ←
        </button>
        <button
          onClick={triggerConfetti}
          className="w-12 h-12 bg-pink-500/50 hover:bg-pink-500/70 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm transition-colors"
        >
          🎉
        </button>
        <button
          onClick={() => doSwipe('right')}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm transition-colors"
        >
          →
        </button>
      </div>
    </div>
  )
}
