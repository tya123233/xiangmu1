'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { figmaImportedLayout } from '@/data/joiners-layout'

export default function JoinersGallery() {
  const [selectedJoinerIndex, setSelectedJoinerIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNavigate = useCallback((dir: 'prev' | 'next') => {
    if (isTransitioning || selectedJoinerIndex === null) return
    
    setIsTransitioning(true)
    
    const newIndex =
      dir === 'prev'
        ? (selectedJoinerIndex - 1 + figmaImportedLayout.length) % figmaImportedLayout.length
        : (selectedJoinerIndex + 1) % figmaImportedLayout.length
    
    setSelectedJoinerIndex(newIndex)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, selectedJoinerIndex])

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedJoinerIndex === null) return
      
      if (e.key === 'Escape') {
        setSelectedJoinerIndex(null)
      } else if (e.key === 'ArrowLeft') {
        handleNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedJoinerIndex, handleNavigate])

  // 确定性颜色生成
  const getPlaceholderColor = (index: number) => {
    const colors = [
      'from-blue-400 to-purple-500', 'from-pink-400 to-rose-500',
      'from-green-400 to-teal-500', 'from-yellow-400 to-orange-500',
      'from-indigo-400 to-blue-500', 'from-purple-400 to-pink-500',
      'from-teal-400 to-cyan-500', 'from-orange-400 to-red-500',
      'from-cyan-400 to-blue-500', 'from-red-400 to-pink-500',
    ]
    return colors[index % colors.length]
  }

  const currentLayout = selectedJoinerIndex !== null ? figmaImportedLayout[selectedJoinerIndex] : null

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* 拼贴画廊容器 */}
      <div className="relative w-full max-w-[1200px] aspect-[3573/3360]">
        {figmaImportedLayout.map((layout, index) => (
          <motion.div
            key={layout.panelId}
            layoutId={layout.panelId} // 关键：共享布局 ID
            className="absolute cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl bg-white p-[3px] rounded-sm z-10"
            style={{
              left: `${layout.left}%`,
              top: `${layout.top}%`,
              width: `${(layout.width / 3573) * 100}%`,
              height: `${(layout.height / 3360) * 100}%`,
              rotate: layout.rotation,
              zIndex: layout.zIndex, // 保持原始层级
            }}
            onClick={() => setSelectedJoinerIndex(index)}
            whileHover={{ scale: 1.05, zIndex: 100, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            {/* 图片内容 */}
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(index)} flex items-center justify-center`}>
                <span className="text-white font-medium opacity-80">照片 {index + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 全屏详情视图 (Overlay) */}
      <AnimatePresence>
        {selectedJoinerIndex !== null && currentLayout && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
            {/* 背景遮罩 - 独立淡入淡出 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJoinerIndex(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md pointer-events-auto"
            />

            {/* 大图容器 - 使用 layoutId 实现无缝飞跃 */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-8">
              <motion.div
                layoutId={currentLayout.panelId} // 关键：与列表项 ID 一致
                className="relative bg-white p-2 shadow-2xl overflow-hidden pointer-events-auto"
                style={{
                  aspectRatio: `${currentLayout.width} / ${currentLayout.height}`,
                  maxHeight: '85vh',
                  maxWidth: '90vw',
                  width: 'auto', // 让它自适应
                }}
                // 移除 rotate，让它在放大时摆正，或者保持 rotate 取决于设计。通常摆正更好看。
                // 这里我们不加 rotate，Framer Motion 会自动插值从有角度到无角度。
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8 // 轻盈一点
                }}
              >
                {/* 大图内容 */}
                <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(selectedJoinerIndex)} flex items-center justify-center`}>
                  <span className="text-white text-2xl font-bold opacity-90">照片 {selectedJoinerIndex + 1}</span>
                </div>

                {/* 关闭按钮 (在卡片内或外均可，这里放卡片右上角) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedJoinerIndex(null); }}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full text-white flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </motion.div>

              {/* 左右导航箭头 (固定在屏幕两侧，不参与 layoutId 动画) */}
              <div className="absolute inset-x-0 flex justify-between px-8 pointer-events-none">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto backdrop-blur-sm"
                  onClick={(e) => { e.stopPropagation(); handleNavigate('prev'); }}
                >
                  ←
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto backdrop-blur-sm"
                  onClick={(e) => { e.stopPropagation(); handleNavigate('next'); }}
                >
                  →
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

