'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import DialogBubble from './DialogBubble'
import { useClickOutside } from '@/hooks/useClickOutside'

/** 单个对话框的数据结构 */
export interface Dialog {
  id: string
  text: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

/** 带对话框的照片数据结构 */
export interface PhotoWithDialogs {
  id: string
  image: string
  alt: string
  /** 照片在页面中的位置（用于布局） */
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  /** 该照片关联的所有对话框 */
  dialogs: Dialog[]
  /** 自定义照片样式类名 */
  className?: string
}

interface ClickablePhotoProps {
  photo: PhotoWithDialogs
  /** 照片尺寸（可选） */
  width?: number
  height?: number
}

/**
 * ClickablePhoto - 可点击的照片组件
 * 
 * 功能：
 * - 点击照片显示对话框
 * - 支持多个对话框顺序显示
 * - 键盘操作支持（Enter/Space 下一个，Esc 关闭）
 * - 点击外部关闭对话框
 * - 每张照片独立状态管理
 */
export default function ClickablePhoto({
  photo,
  width = 300,
  height = 300,
}: ClickablePhotoProps) {
  // 当前显示的对话框索引（-1 表示未显示）
  const [currentDialogIndex, setCurrentDialogIndex] = useState(-1)
  const photoRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // 是否有对话框正在显示
  const isDialogVisible = currentDialogIndex >= 0 && currentDialogIndex < photo.dialogs.length

  // 点击照片 - 显示下一个对话框
  const handlePhotoClick = useCallback(() => {
    if (currentDialogIndex < photo.dialogs.length - 1) {
      // 显示下一个对话框
      setCurrentDialogIndex((prev) => prev + 1)
    } else {
      // 已经是最后一个，循环回到开始（关闭）
      setCurrentDialogIndex(-1)
    }
  }, [currentDialogIndex, photo.dialogs.length])

  // 关闭当前对话框
  const handleCloseDialog = useCallback(() => {
    setCurrentDialogIndex(-1)
  }, [])

  // 点击外部关闭对话框
  useClickOutside(photoRef, handleCloseDialog, isDialogVisible)

  // 键盘操作支持
  useEffect(() => {
    if (!isFocused) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          // Enter 或 Space - 显示下一个对话框
          e.preventDefault()
          handlePhotoClick()
          break
        case 'Escape':
          // Esc - 关闭当前对话框
          e.preventDefault()
          handleCloseDialog()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, handlePhotoClick, handleCloseDialog])

  // 当前要显示的对话框
  const currentDialog = isDialogVisible ? photo.dialogs[currentDialogIndex] : null

  return (
    <div
      ref={photoRef}
      className={`
        relative
        ${photo.className || ''}
      `}
      style={{
        position: 'absolute',
        ...photo.position,
      }}
    >
      {/* 照片本体 */}
      <div
        role="button"
        tabIndex={0}
        onClick={handlePhotoClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          relative overflow-hidden rounded-2xl
          cursor-pointer
          transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          focus:outline-none focus:ring-4 focus:ring-pink-400/50
          ${isDialogVisible ? 'ring-4 ring-pink-400/50 scale-105' : ''}
        `}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        aria-label={`${photo.alt}，点击查看对话框`}
      >
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes={`${width}px`}
        />

        {/* 悬浮提示：还有更多对话框 */}
        {!isDialogVisible && photo.dialogs.length > 0 && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-gray-800">
              点击查看 💬
            </div>
          </div>
        )}

        {/* 进度指示器：显示第几个对话框 */}
        {isDialogVisible && photo.dialogs.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {photo.dialogs.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${index === currentDialogIndex ? 'bg-pink-400 w-4' : 'bg-white/60'}
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* 对话框气泡 */}
      {currentDialog && (
        <DialogBubble
          text={currentDialog.text}
          position={currentDialog.position}
          isVisible={isDialogVisible}
          onClose={handleCloseDialog}
        />
      )}

      {/* 辅助功能：屏幕阅读器说明 */}
      <span className="sr-only">
        {isDialogVisible
          ? `第 ${currentDialogIndex + 1} 个对话框，共 ${photo.dialogs.length} 个`
          : `有 ${photo.dialogs.length} 个对话框可查看`}
      </span>
    </div>
  )
}

