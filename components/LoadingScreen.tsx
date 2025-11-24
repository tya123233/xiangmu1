'use client'

import { motion } from 'framer-motion'

interface LoadingScreenProps {
  progress?: number
}

export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-purple-600 to-purple-900 
                  flex flex-col justify-center items-center z-[9999] text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mb-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p 
        className="text-lg font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        加载故事中...
      </motion.p>
      
      {/* 进度条 */}
      {progress > 0 && (
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mt-6">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      )}
      
      {/* 百分比 */}
      {progress > 0 && (
        <motion.div
          className="text-white/80 text-sm mt-3 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
      
      {/* 装饰性动画元素 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  )
}


