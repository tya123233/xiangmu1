'use client'

import { motion } from 'framer-motion'

export default function TapHint() {
  return (
    <motion.div 
      className="fixed bottom-32 left-1/2 -translate-x-1/2 text-white text-center 
                  z-[800] pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="flex flex-col items-center">
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          className="mb-2.5"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M12 5V19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <motion.p 
          className="text-base text-shadow"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          向下滚动继续阅读
        </motion.p>
      </div>
    </motion.div>
  )
}

