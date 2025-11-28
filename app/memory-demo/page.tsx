'use client'

import MemoryTrigger from '@/components/MemoryTrigger'
import { useState } from 'react'

export default function MemoryDemoPage() {
  const [status, setStatus] = useState('Waiting for interaction...')

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 gap-12">
      <div className="text-white/50 text-sm tracking-widest uppercase">
        Memory Trigger Demo
      </div>

      {/* 限制宽度的容器，模拟卡片布局 */}
      <div className="w-full max-w-md">
        <MemoryTrigger 
          src="/images/rain.png"
          alt="Rain memory"
          href="/" 
          onClick={() => setStatus('Navigating to home...')}
        />
      </div>

      <div className="text-white/30 font-mono text-xs">
        Status: {status}
      </div>
    </div>
  )
}
