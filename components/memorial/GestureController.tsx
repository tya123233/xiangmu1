'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision'

interface GestureControllerProps {
  onRotate: (deltaX: number) => void
  onScatterToggle: () => void
}

export default function GestureController({ onRotate, onScatterToggle }: GestureControllerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | null>(null)
  const [webcamRunning, setWebcamRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestRef = useRef<number>(0)
  
  // State for logic
  const lastGestureRef = useRef<string>('None')
  const lastXRef = useRef<number | null>(null)
  const scatterCooldownRef = useRef<boolean>(false)

  const predictWebcam = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !gestureRecognizer) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Ensure video is ready
    if (video.readyState < 2) {
      requestRef.current = requestAnimationFrame(predictWebcam)
      return
    }

    // Ensure canvas matches video size
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }
    
    try {
      const nowInMs = Date.now()
      const results = gestureRecognizer.recognizeForVideo(video, nowInMs)

      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw landmarks manually (simple circles) to avoid DrawingUtils issues
      if (results.landmarks && results.landmarks.length > 0) {
        for (const landmarks of results.landmarks) {
          // Draw connections
          ctx.strokeStyle = '#00FF00'
          ctx.lineWidth = 2
          for (const landmark of landmarks) {
            ctx.beginPath()
            ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 3, 0, 2 * Math.PI)
            ctx.fillStyle = '#FF0000'
            ctx.fill()
          }
        }

        // Logic
        const landmarks = results.landmarks[0]
        const gestures = results.gestures?.[0]
        
        if (gestures && gestures.length > 0) {
          const currentGesture = gestures[0].categoryName
          
          // --- Interaction B: Scatter Trigger (Fist -> Open) with cooldown ---
          if (lastGestureRef.current === 'Closed_Fist' && currentGesture === 'Open_Palm' && !scatterCooldownRef.current) {
            console.log('Scatter Triggered!')
            onScatterToggle()
            scatterCooldownRef.current = true
            setTimeout(() => { scatterCooldownRef.current = false }, 1000) // 1s cooldown
          }
          
          lastGestureRef.current = currentGesture
          
          // --- Interaction A: Rotation (Horizontal Movement) ---
          if (currentGesture === 'Open_Palm') {
            const wrist = landmarks[0]
            
            if (lastXRef.current !== null) {
              const delta = wrist.x - lastXRef.current
              
              // Filter noise
              if (Math.abs(delta) > 0.003) {
                onRotate(-delta) // Invert for natural feel
              }
            }
            lastXRef.current = wrist.x
          } else {
            lastXRef.current = null
          }
        } else {
          lastGestureRef.current = 'None'
          lastXRef.current = null
        }
      } else {
        lastGestureRef.current = 'None'
        lastXRef.current = null
      }
      
      ctx.restore()
    } catch (e) {
      console.error('Prediction error:', e)
    }

    requestRef.current = requestAnimationFrame(predictWebcam)
  }, [gestureRecognizer, onRotate, onScatterToggle])

  // Initialize Gesture Recognizer with CPU delegate to avoid WebGL conflicts
  useEffect(() => {
    const createGestureRecognizer = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        )
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
            delegate: 'CPU', // Changed from GPU to CPU to avoid WebGL context conflicts
          },
          runningMode: 'VIDEO',
          numHands: 1
        })
        setGestureRecognizer(recognizer)
        setError(null)
      } catch (e) {
        console.error('Failed to create gesture recognizer:', e)
        setError('Failed to load gesture model')
      }
    }
    createGestureRecognizer()
  }, [])

  // Start Webcam
  useEffect(() => {
    if (!gestureRecognizer) return

    const currentVideoRef = videoRef.current

    const enableCam = async () => {
      if (!currentVideoRef) return

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' } // Reduced resolution for better performance
        })
        currentVideoRef.srcObject = stream
        
        currentVideoRef.onloadeddata = () => {
          setWebcamRunning(true)
          predictWebcam()
        }
      } catch (err) {
        console.error('Error accessing webcam:', err)
        setError('Camera access denied')
      }
    }

    enableCam()

    return () => {
      cancelAnimationFrame(requestRef.current)
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [gestureRecognizer, predictWebcam])

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 z-50 w-48 h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-red-500/50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <p className="text-red-400 text-xs text-center px-2">{error}</p>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-48 h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/50 backdrop-blur-sm">
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
      <div className="absolute top-2 left-2 text-[10px] text-white bg-black/50 px-2 py-1 rounded">
        {webcamRunning ? '✋ Gesture Active' : 'Loading...'}
      </div>
      <div className="absolute bottom-2 left-2 text-[8px] text-white/60">
        {lastGestureRef.current !== 'None' ? lastGestureRef.current : ''}
      </div>
    </div>
  )
}
