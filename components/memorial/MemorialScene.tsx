'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

// Configuration
const PHOTO_COUNT = 12 // Reduced for better performance
const CYLINDER_RADIUS = 6
const PHOTO_WIDTH = 2.5
const PHOTO_HEIGHT = 3.5
const SCATTER_RADIUS = 15

// Placeholder images
const IMAGE_PATHS = Array.from({ length: 28 }, (_, i) => `/images/story/${String(i + 1).padStart(2, '0')}.png`)

interface MemorialSceneProps {
  inputRef: React.MutableRefObject<{ delta: number }>
  isScattered: boolean
}

// Simple Photo component using basic mesh instead of Image for stability
function Photo({ 
  textureUrl, 
  isScattered, 
  cylinderPos, 
  cylinderRot, 
  scatterPos, 
  scatterRot,
}: { 
  textureUrl: string
  isScattered: boolean
  cylinderPos: THREE.Vector3
  cylinderRot: THREE.Euler
  scatterPos: THREE.Vector3
  scatterRot: THREE.Euler
}) {
  const meshRef = useRef<THREE.Group>(null)
  const progress = useRef(0)
  const targetProgress = isScattered ? 1 : 0
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      textureUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        setTexture(tex)
      },
      undefined,
      () => {
        // On error, create a colored placeholder
        const canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 128
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 128, 128)
          gradient.addColorStop(0, '#667eea')
          gradient.addColorStop(1, '#764ba2')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, 128, 128)
        }
        const placeholderTex = new THREE.CanvasTexture(canvas)
        setTexture(placeholderTex)
      }
    )
  }, [textureUrl])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    
    // Smooth interpolation
    const speed = isScattered ? 4 : 2
    progress.current += (targetProgress - progress.current) * delta * speed
    const t = progress.current
    
    // Interpolate Position
    const currentPos = new THREE.Vector3().lerpVectors(cylinderPos, scatterPos, t)
    
    // Interpolate Rotation via quaternion
    const q1 = new THREE.Quaternion().setFromEuler(cylinderRot)
    const q2 = new THREE.Quaternion().setFromEuler(scatterRot)
    const currentQ = new THREE.Quaternion().slerpQuaternions(q1, q2, t)
    
    meshRef.current.position.copy(currentPos)
    meshRef.current.quaternion.copy(currentQ)
  })

  return (
    <group ref={meshRef}>
      {/* Photo */}
      <mesh>
        <planeGeometry args={[PHOTO_WIDTH, PHOTO_HEIGHT]} />
        <meshBasicMaterial 
          map={texture} 
          side={THREE.DoubleSide}
          transparent
          opacity={texture ? 1 : 0.5}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[PHOTO_WIDTH + 0.15, PHOTO_HEIGHT + 0.15, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.4} />
      </mesh>
    </group>
  )
}

function SceneContent({ inputRef, isScattered }: { inputRef: React.MutableRefObject<{ delta: number }>, isScattered: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(0)
  const rotation = useRef(0)
  
  const photos = useMemo(() => {
    return Array.from({ length: PHOTO_COUNT }).map((_, i) => {
      const theta = (i / PHOTO_COUNT) * Math.PI * 2
      const x = Math.sin(theta) * CYLINDER_RADIUS
      const z = Math.cos(theta) * CYLINDER_RADIUS
      const y = 0
      
      const cylinderPos = new THREE.Vector3(x, y, z)
      const cylinderRot = new THREE.Euler(0, theta, 0)
      
      // Seeded random for consistent scatter positions
      const seed = i * 12345
      const rand = (n: number) => ((Math.sin(seed * n) + 1) / 2)
      
      const sx = (rand(1) - 0.5) * SCATTER_RADIUS * 2
      const sy = (rand(2) - 0.5) * SCATTER_RADIUS * 1.2
      const sz = (rand(3) - 0.5) * SCATTER_RADIUS * 2
      const scatterPos = new THREE.Vector3(sx, sy, sz)
      
      const rx = rand(4) * Math.PI * 0.5
      const ry = rand(5) * Math.PI * 2
      const rz = rand(6) * Math.PI * 0.3
      const scatterRot = new THREE.Euler(rx, ry, rz)
      
      return {
        id: i,
        url: IMAGE_PATHS[i % IMAGE_PATHS.length],
        cylinderPos,
        cylinderRot,
        scatterPos,
        scatterRot
      }
    })
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    // Physics
    const input = inputRef.current.delta
    if (input !== 0) {
      velocity.current += input * 5
      inputRef.current.delta = 0
    }
    
    velocity.current *= 0.96 // Friction
    rotation.current += velocity.current
    
    groupRef.current.rotation.y = rotation.current
  })

  return (
    <group ref={groupRef}>
      {photos.map((photo) => (
        <Photo 
          key={photo.id}
          textureUrl={photo.url}
          isScattered={isScattered}
          cylinderPos={photo.cylinderPos}
          cylinderRot={photo.cylinderRot}
          scatterPos={photo.scatterPos}
          scatterRot={photo.scatterRot}
        />
      ))}
    </group>
  )
}

// Simple stars without bufferAttribute issues
function Stars() {
  const ref = useRef<THREE.Points>(null)
  
  const [positions] = useState(() => {
    const count = 200
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return pos
  })

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geom
  }, [positions])

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.2}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

// WebGL context restoration handler
function ContextHandler() {
  const { gl } = useThree()
  
  useEffect(() => {
    const canvas = gl.domElement
    
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.log('WebGL context lost, attempting to restore...')
    }
    
    const handleContextRestored = () => {
      console.log('WebGL context restored')
    }
    
    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl])
  
  return null
}

export default function MemorialScene({ inputRef, isScattered }: MemorialSceneProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading 3D Scene...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas 
        camera={{ position: [0, 2, 18], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          antialias: false, // Disable for performance
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={(state) => {
          state.gl.setClearColor('#000000')
        }}
      >
        <ContextHandler />
        
        <fog attach="fog" args={['#000000', 8, 40]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -5, -10]} intensity={0.4} />
        
        <SceneContent inputRef={inputRef} isScattered={isScattered} />
        
        <Environment preset="night" />
        <Stars />
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute top-8 left-8 text-white z-10 pointer-events-none">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Memorial
        </h1>
        <p className="text-sm opacity-70 max-w-xs leading-relaxed">
          ✋ Open Hand + Swipe to Rotate
          <br/>
          ✊→✋ Fist to Palm to Scatter/Gather
        </p>
      </div>
      
      {/* State indicator */}
      <div className="absolute bottom-8 left-8 text-white z-10 pointer-events-none">
        <p className="text-xs opacity-50">
          {isScattered ? '🌌 Scattered' : '🎠 Organized'}
        </p>
      </div>
    </div>
  )
}
