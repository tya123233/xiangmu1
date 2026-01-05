'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'

// Tutorial steps - 5 common gestures
const TUTORIAL_STEPS = [
  {
    id: 'wave',
    gesture: 'open',
    title: 'Wave Hello',
    instruction: 'Open your palm and show it to the camera',
    successMessage: 'Excellent!',
  },
  {
    id: 'fist',
    gesture: 'closed',
    title: 'Make a Fist',
    instruction: 'Clench your hand into a fist',
    successMessage: 'Great!',
  },
  {
    id: 'swipe_left',
    gesture: 'swipe_left',
    title: 'Swipe Left',
    instruction: 'Move your open hand from right to left',
    successMessage: 'Perfect!',
  },
  {
    id: 'swipe_right',
    gesture: 'swipe_right',
    title: 'Swipe Right',
    instruction: 'Move your open hand from left to right',
    successMessage: 'Awesome!',
  },
  {
    id: 'magic',
    gesture: 'fist_to_open',
    title: 'Cast the Spell',
    instruction: 'Make a fist, then open your palm quickly',
    successMessage: 'Magic activated!',
  },
]

// Microphone Icon
const MicrophoneIcon = () => (
  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
)

// Camera Icon
const CameraIcon = () => (
  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

export default function GestureTutorial() {
  const [isStarted, setIsStarted] = useState(false)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [handState, setHandState] = useState<'open' | 'closed' | 'none'>('none')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const lastHandStateRef = useRef<string>('none')
  const lastWristXRef = useRef<number>(0.5)
  const swipeCooldownRef = useRef<number>(0)
  const isProcessingRef = useRef<boolean>(false)
  
  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/sounds/correct.wav')
    audioRef.current.volume = 0.5 // 设置合适的音量
  }, [])

  // Trigger confetti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#1dd1a1'],
    })
  }, [])

  // Complete step - simplified logic
  const handleStepComplete = useCallback((stepIndex: number, message: string) => {
    if (isProcessingRef.current) return
    if (completedSteps.has(stepIndex)) return
    
    isProcessingRef.current = true
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // 重置播放进度，确保连击时也能播放
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
    
    // Mark as completed
    setCompletedSteps(prev => new Set([...prev, stepIndex]))
    setSuccessMessage(message)
    setShowSuccess(true)
    triggerConfetti()
    
    // Schedule hide and advance
    setTimeout(() => {
      setShowSuccess(false)
      
      // Advance to next step after overlay hides
      setTimeout(() => {
        if (stepIndex < TUTORIAL_STEPS.length - 1) {
          setCurrentStep(stepIndex + 1)
        }
        isProcessingRef.current = false
      }, 300)
    }, 1200)
  }, [completedSteps, triggerConfetti])

  // Initialize MediaPipe
  useEffect(() => {
    if (!isStarted) return
    
    let mounted = true

    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        )
        
        if (!mounted) return
        
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.6,
          minHandPresenceConfidence: 0.6,
          minTrackingConfidence: 0.6,
        })
        
        if (!mounted) return
        setHandLandmarker(landmarker)
      } catch {
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
          })
          if (mounted) setHandLandmarker(landmarker)
        } catch {
          console.error('MediaPipe init failed')
        }
      }
    }

    init()
    return () => { mounted = false }
  }, [isStarted])

  // Start camera
  useEffect(() => {
    if (!handLandmarker) return

    let mounted = true
    const video = videoRef.current
    if (!video) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' }
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

  // Gesture detection
  useEffect(() => {
    if (!isReady || !handLandmarker || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = 0

    const detect = () => {
      if (!video || video.readyState < 2) {
        animationRef.current = requestAnimationFrame(detect)
        return
      }

      const now = performance.now()
      if (now - lastTime < 50) {
        animationRef.current = requestAnimationFrame(detect)
        return
      }
      lastTime = now

      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }

      try {
        const results = handLandmarker.detectForVideo(video, Math.round(now))
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0]
          
          // Draw skeleton
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
          
          // Detect hand state
          const fingerTips = [8, 12, 16, 20]
          const fingerPIPs = [6, 10, 14, 18]
          let openCount = 0
          
          for (let i = 0; i < fingerTips.length; i++) {
            if (landmarks[fingerTips[i]].y < landmarks[fingerPIPs[i]].y) {
              openCount++
            }
          }
          
          const currentHandState = openCount >= 3 ? 'open' : openCount <= 1 ? 'closed' : 'none'
          setHandState(currentHandState)
          
          // Swipe detection
          const wristX = landmarks[0].x
          const deltaX = wristX - lastWristXRef.current
          
          // Check gesture for current step
          const step = TUTORIAL_STEPS[currentStep]
          const nowMs = Date.now()
          
          if (!isProcessingRef.current && !completedSteps.has(currentStep)) {
            if (step.gesture === 'open' && currentHandState === 'open') {
              handleStepComplete(currentStep, step.successMessage)
            } else if (step.gesture === 'closed' && currentHandState === 'closed') {
              handleStepComplete(currentStep, step.successMessage)
            } else if (step.gesture === 'swipe_left' && currentHandState === 'open' && nowMs > swipeCooldownRef.current) {
              if (deltaX < -0.1) {
                swipeCooldownRef.current = nowMs + 800
                handleStepComplete(currentStep, step.successMessage)
              }
            } else if (step.gesture === 'swipe_right' && currentHandState === 'open' && nowMs > swipeCooldownRef.current) {
              if (deltaX > 0.1) {
                swipeCooldownRef.current = nowMs + 800
                handleStepComplete(currentStep, step.successMessage)
              }
            } else if (step.gesture === 'fist_to_open') {
              if (lastHandStateRef.current === 'closed' && currentHandState === 'open') {
                handleStepComplete(currentStep, step.successMessage)
              }
            }
          }
          
          lastHandStateRef.current = currentHandState
          lastWristXRef.current = wristX
        } else {
          setHandState('none')
          lastHandStateRef.current = 'none'
        }
      } catch {
        // Ignore errors
      }

      animationRef.current = requestAnimationFrame(detect)
    }

    detect()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isReady, handLandmarker, currentStep, completedSteps, handleStepComplete])

  const allCompleted = completedSteps.size === TUTORIAL_STEPS.length

  return (
    <div className="w-full flex flex-col items-center pt-16 pb-48 mb-40 bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6 text-center"
      >
        {allCompleted ? 'Congratulations! Tutorial Complete!' : 'Before You Begin'}
      </motion.h2>

      {/* Icons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-6 mb-6"
      >
        <div className="flex flex-col items-center">
          <MicrophoneIcon />
          <span className="text-sm text-gray-500 mt-1">Microphone</span>
        </div>
        <div className="flex flex-col items-center">
          <CameraIcon />
          <span className="text-sm text-gray-500 mt-1">Camera</span>
        </div>
      </motion.div>

      {/* Description text - larger */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl text-center mb-10 px-4"
      >
        <p className="text-gray-600 text-xl md:text-2xl font-medium leading-relaxed">
          To ensure a smooth experience with this story,
          <br />
          please authorize your microphone and adjust to a comfortable volume.
        </p>
        <p className="text-gray-600 text-xl md:text-2xl font-medium leading-relaxed mt-5">
          We have a quick tutorial to help you
          <br />
          use camera gestures for navigation.
        </p>
      </motion.div>

      {/* Start button */}
      {!isStarted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsStarted(true)}
          className="px-12 py-4 bg-gray-800 text-white text-xl font-semibold rounded-full hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl mb-10"
        >
          Start Tutorial
        </motion.button>
      )}

      {/* Tutorial content */}
      <AnimatePresence>
        {isStarted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center w-full"
          >
            {/* Progress - 5 steps */}
            <div className="flex gap-3 mb-10 flex-wrap justify-center">
              {TUTORIAL_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => !completedSteps.has(index) && setCurrentStep(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold transition-all ${
                    completedSteps.has(index)
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-gray-800 text-white scale-110'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {completedSteps.has(index) ? '✓' : index + 1}
                </button>
              ))}
            </div>

            {/* Current step */}
            <AnimatePresence mode="wait">
              {!allCompleted && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                    {TUTORIAL_STEPS[currentStep].title}
                  </h3>
                  <p className="text-gray-600 text-xl md:text-2xl font-medium">
                    {TUTORIAL_STEPS[currentStep].instruction}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Camera */}
            <div className="relative">
              <div className="relative w-80 h-60 md:w-[420px] md:h-[315px] rounded-2xl overflow-hidden border-4 border-gray-200 bg-black shadow-xl">
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
                
                {/* Loading */}
                {!isReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white text-center">
                      <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
                      <p className="font-medium text-lg">Starting camera...</p>
                    </div>
                  </div>
                )}
                
                {/* Hand state */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-base font-medium text-white bg-black/60 px-4 py-2 rounded-full">
                    {handState === 'open' ? 'Open Palm' : handState === 'closed' ? 'Closed Fist' : 'Show your hand'}
                  </span>
                  {isReady && (
                    <span className="text-base font-medium text-white bg-green-500/80 px-4 py-2 rounded-full">
                      Detecting
                    </span>
                  )}
                </div>
              </div>

              {/* Success overlay - auto-hide fixed */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-green-500/40 rounded-2xl"
                  >
                    <motion.div 
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-bold text-green-600 mb-2">✓</div>
                      <p className="text-2xl font-semibold text-green-700">{successMessage}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom hint */}
            <div className="mt-8 text-center text-gray-500 text-lg md:text-xl font-medium">
              <p>Ensure good lighting and face your palm towards the camera</p>
              {allCompleted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-green-600 text-xl font-semibold"
                >
                  You have mastered all gestures! Scroll down to explore the story
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
