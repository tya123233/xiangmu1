'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { JoinerScene } from '@/data/joiners-data'

interface JoinersDetailViewProps {
  scene: JoinerScene
  selectedPanelId: string
  onClose: () => void
}

/**
 * Joiners 详情视图组件
 * 使用与被点击面板相同的 layoutId 实现共享元素过渡
 */
export default function JoinersDetailView({
  scene,
  selectedPanelId,
  onClose,
}: JoinersDetailViewProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* 主内容容器 - 使用与点击面板相同的 layoutId */}
      <motion.div
        layoutId={selectedPanelId}
        className="relative w-full max-w-5xl aspect-[4/3] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 完整图片 */}
        <Image
          src={scene.fullImageUrl}
          alt={scene.title}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* 内容区域 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {scene.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
            {scene.description}
          </p>
          <p className="text-sm text-gray-300 mt-4 drop-shadow-md">
            灵感来自 David Hockney 的 "Joiners" 系列 • {scene.panels.length} 个面板
          </p>
        </motion.div>

        {/* 关闭按钮 */}
        <motion.button
          className="absolute top-4 right-4 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="关闭"
        >
          {/* X 关闭图标 */}
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        {/* 装饰性边框 */}
        <div className="absolute inset-0 border-4 border-white/10 rounded-2xl pointer-events-none" />
      </motion.div>

      {/* 点击提示 */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-white/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        点击任意位置或按 ESC 键关闭
      </motion.div>
    </motion.div>
  )
}

