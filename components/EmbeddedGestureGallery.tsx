'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'

// 照片数据 - 4张回忆图片
const PHOTOS = [
  { id: 0, src: '/images/story/huiyi1.png', title: '回忆 1' },
  { id: 1, src: '/images/story/huiyi2.png', title: '回忆 2' },
  { id: 2, src: '/images/story/huiyi3.png', title: '回忆 3' },
  { id: 3, src: '/images/story/huiyi4.png', title: '回忆 4' },
]

// ===== 优化的手势配置 =====
const CONFIG = {
  // 速度阈值：每秒移动多少比例的屏幕宽度才算滑动
  VELOCITY_THRESHOLD: 0.8,
  // 滑动后的冷却时间（毫秒）
  COOLDOWN_MS: 700,
  // 方向锁定时间（毫秒）- 防止回摆误触发
  DIRECTION_LOCK_MS: 400,
  // 历史帧数量（用于计算平均速度）
  HISTORY_SIZE: 5,
  // 最小移动距离（低于此值不计入速度计算）
  MIN_MOVEMENT: 0.005,
}

interface PositionHistory {
  x: number
  time: number
}

export default function EmbeddedGestureGallery({ className = '' }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCollapseHint, setShowCollapseHint] = useState(false)
  
  // 音频 Ref
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const expandAudioRef = useRef<HTMLAudioElement | null>(null)

  // 初始化音频
  useEffect(() => {
    audioRef.current = new Audio('/sounds/slide.wav')
    audioRef.current.volume = 1.0
    
    expandAudioRef.current = new Audio('/sounds/expand.mp3')
    expandAudioRef.current.volume = 1.0
  }, [])
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // ===== 优化的手势状态 =====
  const positionHistoryRef = useRef<PositionHistory[]>([])
  const cooldownUntilRef = useRef<number>(0)
  const directionLockRef = useRef<{ direction: 'left' | 'right' | null; until: number }>({ direction: null, until: 0 })
  
  // 握拳状态追踪
  const fistDetectedRef = useRef<boolean>(false)
  const fistDetectedTimeRef = useRef<number>(0)
  const lastStateChangeTimeRef = useRef<number>(0)

  // 计算速度（基于历史位置）
  const calculateVelocity = useCallback((history: PositionHistory[]): number => {
    if (history.length < 2) return 0
    
    const first = history[0]
    const last = history[history.length - 1]
    const deltaTime = (last.time - first.time) / 1000 // 秒
    
    if (deltaTime < 0.01) return 0 // 时间太短，不计算
    
    const deltaX = last.x - first.x
    return deltaX / deltaTime // 每秒移动的比例
  }, [])

  // 执行滑动（拖拽感觉：手向左 = 相框向左 = 下一张）
  const doSwipe = useCallback((direction: 'left' | 'right') => {
    // 如果是展开状态，不允许滑动切换
    if (isExpanded) return

    const now = Date.now()
    
    // 检查冷却
    if (now < cooldownUntilRef.current) return
    
    // 检查方向锁定（防止回摆）
    if (directionLockRef.current.direction !== null && 
        now < directionLockRef.current.until &&
        directionLockRef.current.direction !== direction) {
      return
    }
    
    // 执行滑动
    cooldownUntilRef.current = now + CONFIG.COOLDOWN_MS
    directionLockRef.current = { direction, until: now + CONFIG.DIRECTION_LOCK_MS }
    
    // 播放滑动音效
    if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(e => console.log('Slide audio play failed:', e))
    }

    // 拖拽感觉：手向左滑 = 相框跟着向左 = 显示下一张（右边的）
    // 手向右滑 = 相框跟着向右 = 显示上一张（左边的）
    if (direction === 'left') {
      setCurrentIndex(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length)
    } else {
      setCurrentIndex(prev => (prev + 1) % PHOTOS.length)
    }
    
    // 清空历史
    positionHistoryRef.current = []
  }, [isExpanded])

  // 初始化 MediaPipe（使用最佳配置）
  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        )
        
        if (!mounted) return
        
        // 使用最佳配置的 HandLandmarker
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU', // 优先使用 GPU 提高性能
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.7, // 提高置信度
          minHandPresenceConfidence: 0.7,
          minTrackingConfidence: 0.7,
        })
        
        if (!mounted) return
        
        setHandLandmarker(landmarker)
      } catch (err) {
        console.error('MediaPipe init failed:', err)
        // GPU 失败则回退到 CPU
        try {
          const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
          )
          const landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
              delegate: 'CPU',
            },
            runningMode: 'VIDEO',
            numHands: 1,
            minHandDetectionConfidence: 0.6,
            minHandPresenceConfidence: 0.6,
            minTrackingConfidence: 0.6,
          })
          if (mounted) {
            setHandLandmarker(landmarker)
          }
        } catch (e2) {
          console.error('CPU fallback also failed:', e2)
        }
      }
    }

    init()
    return () => { mounted = false }
  }, [])

  // 启动摄像头（高分辨率）
  useEffect(() => {
    if (!handLandmarker) return

    let mounted = true
    const video = videoRef.current
    if (!video) return

    const startCamera = async () => {
      try {
        // 使用更高分辨率提高识别准确度
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 1280 }, 
            height: { ideal: 720 }, 
            facingMode: 'user',
            frameRate: { ideal: 30 }
          }
        })
        
        if (!mounted) {
          stream.getTracks().forEach(t => t.stop())
          return
        }
        
        video.srcObject = stream
        
        video.onloadeddata = () => {
          if (!mounted) return
          video.play()
          setIsReady(true)
        }
      } catch (err) {
        console.error('Camera error:', err)
      }
    }

    startCamera()

    return () => {
      mounted = false
      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(t => t.stop())
      }
    }
  }, [handLandmarker])

  // 手势检测循环（优化版）
  useEffect(() => {
    if (!isReady || !handLandmarker || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTimestamp = -1

    const detect = () => {
      if (!video || video.readyState < 2) {
        animationRef.current = requestAnimationFrame(detect)
        return
      }

      // 使用整数时间戳，并确保时间戳递增
      const now = Math.round(performance.now())
      if (now <= lastTimestamp) {
        animationRef.current = requestAnimationFrame(detect)
        return
      }
      lastTimestamp = now

      // 设置 canvas 尺寸
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }

      try {
        const results = handLandmarker.detectForVideo(video, now)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0]
          
          // 绘制手部骨架
          ctx.strokeStyle = '#00FF00'
          ctx.lineWidth = 3
          ctx.fillStyle = '#FF0000'
          
          const connections = [
            [0,1],[1,2],[2,3],[3,4],
            [0,5],[5,6],[6,7],[7,8],
            [0,9],[9,10],[10,11],[11,12],
            [0,13],[13,14],[14,15],[15,16],
            [0,17],[17,18],[18,19],[19,20],
            [5,9],[9,13],[13,17]
          ]
          
          for (const [a, b] of connections) {
            ctx.beginPath()
            ctx.moveTo(landmarks[a].x * canvas.width, landmarks[a].y * canvas.height)
            ctx.lineTo(landmarks[b].x * canvas.width, landmarks[b].y * canvas.height)
            ctx.stroke()
          }
          
          for (const lm of landmarks) {
            ctx.beginPath()
            ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 5, 0, Math.PI * 2)
            ctx.fill()
          }
          
          // 使用手腕位置 (landmark 0) 进行滑动检测 - 更稳定
          const wristX = landmarks[0].x
          
          // 判断手势状态 - 检测手指弯曲
          const fingerTips = [8, 12, 16, 20]
          const fingerPIPs = [6, 10, 14, 18] // 使用 PIP 关节更准确
          let openCount = 0
          
          // 检查四个手指是否伸展（指尖高于PIP关节）
          // 注意：Y轴向下增加，所以 y < pip.y 意味着指尖在上方（伸展）
          // 但这里要考虑手的朝向，更稳健的方法是计算指尖到手腕的距离
          
          // 简单方法：判断指尖是否卷曲
          // 计算指尖到掌心(0)的距离 vs PIP到掌心的距离
          const wrist = landmarks[0]
          
          for (let i = 0; i < fingerTips.length; i++) {
            const tip = landmarks[fingerTips[i]]
            const pip = landmarks[fingerPIPs[i]]
            
            // 计算距离平方
            const dTip = Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2)
            const dPip = Math.pow(pip.x - wrist.x, 2) + Math.pow(pip.y - wrist.y, 2)
            
            // 如果指尖距离显著大于PIP距离，认为是张开
            if (dTip > dPip * 1.2) {
              openCount++
            }
          }
          
          // 拇指单独判断
          const thumbTip = landmarks[4]
          const thumbIP = landmarks[3]
          const thumbMCP = landmarks[2]
           // 拇指比较难，简化为只看其他四指
           
          const isFist = openCount === 0
          const isOpen = openCount >= 3 // 允许稍微有点弯曲

          const currentTime = Date.now()

          // 状态机逻辑
          if (currentTime - lastStateChangeTimeRef.current > 1000) { // 状态切换冷却
             if (!isExpanded) {
                 // 当前是收起状态
                 // 1. 检测握拳 -> 准备
                 if (isFist) {
                     fistDetectedRef.current = true
                     fistDetectedTimeRef.current = currentTime
                 }
                 
                 // 2. 如果之前握拳了，现在张开了 -> 触发展开
                 if (isOpen && fistDetectedRef.current) {
                     // 检查握拳时间是否在最近2秒内，避免很久之前的握拳误触发
                     if (currentTime - fistDetectedTimeRef.current < 2000) {
                         setIsExpanded(true)
                         lastStateChangeTimeRef.current = currentTime
                         setShowCollapseHint(true)
                         
                         // 播放展开音效
                         if (expandAudioRef.current) {
                            expandAudioRef.current.currentTime = 0
                            expandAudioRef.current.play().catch(e => console.log('Expand audio play failed:', e))
                         }
                     }
                     fistDetectedRef.current = false // 重置
                 }
             } else {
                 // 当前是展开状态
                 // 1. 检测握拳 -> 触发收起
                 if (isFist) {
                     setIsExpanded(false)
                     lastStateChangeTimeRef.current = currentTime
                     setShowCollapseHint(false)
                 }
             }
          }

          // ===== 优化的滑动检测 (仅在非展开状态下) =====
          if (!isExpanded) {
            // 添加到历史
            const history = positionHistoryRef.current
            history.push({ x: wristX, time: currentTime })
            
            // 保持历史大小
            while (history.length > CONFIG.HISTORY_SIZE) {
                history.shift()
            }
            
            // 只有足够历史时才计算速度
            if (history.length >= 3) {
                const velocity = calculateVelocity(history)
                
                // 检查是否超过速度阈值
                if (Math.abs(velocity) > CONFIG.VELOCITY_THRESHOLD) {
                const direction = velocity < 0 ? 'left' : 'right'
                doSwipe(direction)
                }
            }
          } else {
              // 展开状态下清空滑动历史，防止切换回来时突然滑动
              positionHistoryRef.current = []
          }
          
        } else {
          positionHistoryRef.current = []
          directionLockRef.current = { direction: null, until: 0 }
          fistDetectedRef.current = false
        }
      } catch (e) {
        // 忽略检测错误
      }

      animationRef.current = requestAnimationFrame(detect)
    }

    detect()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isReady, handLandmarker, calculateVelocity, doSwipe, isExpanded])

  return (
    <div ref={containerRef} className={`relative py-32 ${className}`}>
      {/* 提示文字 */}
      <div className="text-center mb-16 relative z-10 px-4">
        <p className="text-gray-800 text-xl md:text-2xl font-semibold tracking-wide mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Wave your hand left or right to browse
        </p>
        <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-500 text-base md:text-lg italic" 
            style={{ fontFamily: 'Georgia, serif' }}
        >
            Try making a fist and then opening it for a surprise!
        </motion.p>
      </div>

      {/* 卡片容器 */}
      <div className="relative w-full h-[500px] flex items-center justify-center mb-4 perspective-1000">
        <AnimatePresence mode="popLayout">
          {PHOTOS.map((photo, index) => {
            // 计算堆叠模式下的偏移
            const offset = index - currentIndex
            let adjustedOffset = offset
            if (offset > PHOTOS.length / 2) adjustedOffset = offset - PHOTOS.length
            if (offset < -PHOTOS.length / 2) adjustedOffset = offset + PHOTOS.length
            
            const isActiveCard = adjustedOffset === 0
            
            // 展开模式下的位置计算
            // 4张卡片，居中排列
            // index 0: -1.5 * gap
            // index 1: -0.5 * gap
            // index 2: 0.5 * gap
            // index 3: 1.5 * gap
            const expandedX = (index - 1.5) * 260 // 260px 间距

            return (
              <motion.div
                key={photo.id}
                layout
                className="absolute w-64 h-[400px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                initial={false}
                animate={isExpanded ? {
                    // 展开状态
                    x: expandedX,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    zIndex: 10,
                    rotateY: 0,
                    rotateZ: index % 2 === 0 ? -2 : 2, // 微微倾斜增加自然感
                } : {
                    // 堆叠状态
                    x: Math.abs(adjustedOffset) > 2 ? 0 : adjustedOffset * 60,
                    y: Math.abs(adjustedOffset) > 2 ? 0 : Math.abs(adjustedOffset) * 10,
                    scale: isActiveCard ? 1 : Math.abs(adjustedOffset) > 2 ? 0 : 0.85 - Math.abs(adjustedOffset) * 0.05,
                    opacity: isActiveCard ? 1 : Math.abs(adjustedOffset) > 2 ? 0 : 0.5 - Math.abs(adjustedOffset) * 0.15,
                    zIndex: 10 - Math.abs(adjustedOffset),
                    rotateY: Math.abs(adjustedOffset) > 2 ? 0 : adjustedOffset * -5,
                    rotateZ: 0
                }}
                transition={{ 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 25,
                    mass: 0.8 
                }}
                onClick={() => {
                    if (!isExpanded) {
                        setCurrentIndex(index)
                        // 点击切换也播放音效
                        if (audioRef.current) {
                            audioRef.current.currentTime = 0
                            audioRef.current.play().catch(e => console.log('Slide audio play failed:', e))
                        }
                    }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-full h-full">
                  <img 
                      src={photo.src} 
                      alt={photo.title}
                      className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      
      {/* 展开后的关闭提示 */}
      <AnimatePresence>
        {isExpanded && showCollapseHint && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-40 left-0 right-0 text-center z-20 pointer-events-none"
            >
                <p className="text-gray-800 font-bold bg-white/90 backdrop-blur-md py-3 px-8 rounded-full inline-block shadow-lg border border-gray-100 text-lg">
                    Close your hand to collapse
                </p>
            </motion.div>
        )}
      </AnimatePresence>

      {/* 指示器 (仅在收起时显示) */}
      <motion.div 
        className="flex justify-center gap-1.5 mt-8"
        animate={{ opacity: isExpanded ? 0 : 1, y: isExpanded ? 20 : 0 }}
      >
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
                setCurrentIndex(index)
                if (audioRef.current) {
                    audioRef.current.currentTime = 0
                    audioRef.current.play().catch(e => console.log('Slide audio play failed:', e))
                }
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gray-800 w-4' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </motion.div>

      {/* 底部识别提示 */}
      <div className="mt-16 text-center px-4 relative z-10">
          <p className="text-gray-600 text-base md:text-lg font-medium tracking-wide flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Keep a distance between camera and hand for better recognition
          </p>
      </div>

      {/* 隐藏的摄像头（仅用于手势识别） */}
      <div className="hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
