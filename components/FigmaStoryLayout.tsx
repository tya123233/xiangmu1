'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { 
  storyPhotos, 
  getDialogsByPhotoId,
  CONTAINER_SIZE,
  StoryDialog
} from '@/data/story-timeline-layout'
import { useClickOutside } from '@/hooks/useClickOutside'

/**
 * FigmaStoryLayout - 基于 Figma 精确设计的故事布局
 * 
 * 特点：
 * - 使用 Figma 原始像素位置
 * - 照片分散布局（不捆在一起）
 * - 扩大的可点击区域
 * - 精确的对话框位置
 * - 优化的用户体验
 */
export default function FigmaStoryLayout() {
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null)
  const [dialogIndex, setDialogIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // 计算缩放比例
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      const viewportWidth = window.innerWidth
      const scaleFactor = Math.min(viewportWidth / CONTAINER_SIZE.width, 1)
      setScale(scaleFactor)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // 处理照片点击
  const handlePhotoClick = useCallback((photoId: string) => {
    const dialogs = getDialogsByPhotoId(photoId)
    
    if (activePhotoId === photoId) {
      // 同一张照片：切换到下一个对话框
      if (dialogIndex < dialogs.length - 1) {
        setDialogIndex(dialogIndex + 1)
      } else {
        // 已是最后一个，关闭
        setActivePhotoId(null)
        setDialogIndex(0)
      }
    } else {
      // 新照片：显示第一个对话框
      setActivePhotoId(photoId)
      setDialogIndex(0)
    }
  }, [activePhotoId, dialogIndex])

  // 关闭对话框
  const handleClose = useCallback(() => {
    setActivePhotoId(null)
    setDialogIndex(0)
  }, [])

  // 键盘支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if ((e.key === 'Enter' || e.key === ' ') && activePhotoId) {
        e.preventDefault()
        handlePhotoClick(activePhotoId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, handlePhotoClick, activePhotoId])

  // 获取当前显示的对话框
  const currentDialog = activePhotoId 
    ? getDialogsByPhotoId(activePhotoId)[dialogIndex]
    : null

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 顶部标题栏 */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📖 故事时间线
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              点击照片或周围区域，探索完整故事
            </p>
          </div>
          <motion.button
            onClick={() => window.history.back()}
            className="px-4 py-2 md:px-6 md:py-3 bg-pink-500 hover:bg-pink-600 
                     text-white rounded-full shadow-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← 返回
          </motion.button>
        </div>
      </motion.div>

      {/* 主内容区域 */}
      <div className="pt-24 flex justify-center p-8">
        <div
          ref={containerRef}
          className="relative bg-white/30 backdrop-blur-sm rounded-lg shadow-2xl"
          style={{
            width: `${CONTAINER_SIZE.width * scale}px`,
            height: `${CONTAINER_SIZE.height * scale}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* 照片层 */}
          {storyPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* 可点击区域（扩大） */}
              <div
                className="absolute cursor-pointer group"
                style={{
                  left: `${photo.clickableArea?.left || photo.position.left}px`,
                  top: `${photo.clickableArea?.top || photo.position.top}px`,
                  width: `${photo.clickableArea?.width || photo.position.width}px`,
                  height: `${photo.clickableArea?.height || photo.position.height}px`,
                  zIndex: activePhotoId === photo.id ? 100 : photo.zIndex,
                }}
                onClick={() => handlePhotoClick(photo.id)}
                role="button"
                tabIndex={0}
                aria-label={`照片 ${index + 1}，点击查看故事`}
              >
                {/* 悬浮提示区域（调试用，可见） */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-300 transition-colors rounded-lg" />

                {/* 照片本体 */}
                <motion.div
                  className="absolute bg-white p-[3px] shadow-lg overflow-hidden"
                  style={{
                    left: `${photo.position.left - (photo.clickableArea?.left || photo.position.left)}px`,
                    top: `${photo.position.top - (photo.clickableArea?.top || photo.position.top)}px`,
                    width: `${photo.position.width}px`,
                    height: `${photo.position.height}px`,
                  }}
                  whileHover={{ scale: 1.03 }}
                  animate={{
                    scale: activePhotoId === photo.id ? 1.05 : 1,
                    boxShadow: activePhotoId === photo.id 
                      ? '0 0 0 4px rgba(236, 72, 153, 0.5)'
                      : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={photo.imageUrl}
                      alt={`照片 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="800px"
                    />
                  </div>
                </motion.div>

                {/* 悬浮提示 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-pink-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                    💬 点击查看故事
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* 对话框层 */}
          <AnimatePresence>
            {currentDialog && (
              <DialogBox
                dialog={currentDialog}
                onClose={handleClose}
                currentIndex={dialogIndex}
                totalCount={getDialogsByPhotoId(currentDialog.photoId).length}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 浮动提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40
                 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl"
      >
        <p className="text-sm font-medium text-gray-700">
          💡 点击照片或周围区域 | 按 <kbd className="px-2 py-1 bg-gray-200 rounded">Esc</kbd> 关闭
        </p>
      </motion.div>
    </div>
  )
}

/**
 * DialogBox - 对话框组件
 */
interface DialogBoxProps {
  dialog: StoryDialog
  onClose: () => void
  currentIndex: number
  totalCount: number
}

function DialogBox({ dialog, onClose, currentIndex, totalCount }: DialogBoxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // GSAP 动画
  useEffect(() => {
    if (dialogRef.current) {
      gsap.fromTo(
        dialogRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      )
    }
  }, [dialog.id])

  // 点击外部关闭
  useClickOutside(dialogRef, onClose)

  return (
    <motion.div
      ref={dialogRef}
      initial={{ scale: 0, opacity: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      className="absolute bg-pink-300/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 z-[200]"
      style={{
        left: `${dialog.position.left}px`,
        top: `${dialog.position.top}px`,
        width: `${dialog.position.width}px`,
        minHeight: `${dialog.position.height}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-sm md:text-base text-gray-800 leading-relaxed">
        {dialog.content}
      </p>

      {/* 进度指示器 */}
      {totalCount > 1 && (
        <div className="flex gap-1 mt-3 justify-center">
          {Array.from({ length: totalCount }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-pink-600 w-4' : 'bg-pink-400/50 w-2'
              }`}
            />
          ))}
        </div>
      )}

      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 text-white 
                 rounded-full flex items-center justify-center shadow-lg 
                 hover:bg-pink-600 transition-colors"
        aria-label="关闭对话框"
      >
        ✕
      </button>
    </motion.div>
  )
}

