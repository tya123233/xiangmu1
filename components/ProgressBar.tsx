'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-1 bg-white/20 backdrop-blur-glass z-[1000]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-orange-400 
                   shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* 发光效果 */}
        <motion.div
          className="h-full w-full relative"
          animate={{
            boxShadow: [
              '0 0 10px rgba(239,68,68,0.5)',
              '0 0 20px rgba(239,68,68,0.8)',
              '0 0 10px rgba(239,68,68,0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  )
}


