'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export interface DialogBubbleProps {
  /** 对话框文本内容 */
  text: string
  /** 相对于照片的位置 */
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  /** 是否可见 */
  isVisible: boolean
  /** 关闭回调 */
  onClose?: () => void
  /** 自定义类名 */
  className?: string
}

/**
 * DialogBubble - 对话框气泡组件
 * 
 * 功能：
 * - 粉色柔和样式
 * - GSAP 弹性动画
 * - 智能位置计算（防止超出屏幕）
 * - 响应式设计
 */
export default function DialogBubble({
  text,
  position,
  isVisible,
  onClose,
  className = '',
}: DialogBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  // 检查对话框是否超出屏幕边界，自动调整位置
  useEffect(() => {
    if (!bubbleRef.current || !isVisible) return

    const checkBoundary = () => {
      const bubble = bubbleRef.current
      if (!bubble) return

      const rect = bubble.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const margin = 16 // 边距

      let newPosition = position

      // 检查水平边界
      if (position === 'right' && rect.right > viewportWidth - margin) {
        newPosition = 'left'
      } else if (position === 'left' && rect.left < margin) {
        newPosition = 'right'
      }

      // 检查垂直边界
      if (position === 'top' && rect.top < margin) {
        newPosition = 'bottom'
      } else if (position === 'bottom' && rect.bottom > viewportHeight - margin) {
        newPosition = 'top'
      }

      if (newPosition !== adjustedPosition) {
        setAdjustedPosition(newPosition)
      }
    }

    // 延迟检查，等待 DOM 渲染完成
    const timer = setTimeout(checkBoundary, 10)
    return () => clearTimeout(timer)
  }, [isVisible, position, adjustedPosition])

  // GSAP 弹出动画
  useEffect(() => {
    if (!bubbleRef.current) return

    if (isVisible) {
      // 弹出动画
      gsap.fromTo(
        bubbleRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }
      )
    } else {
      // 消失动画
      gsap.to(bubbleRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
    }
  }, [isVisible])

  // 根据位置计算定位样式
  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50'
    
    switch (adjustedPosition) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-4`
      case 'bottom':
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 mt-4`
      case 'left':
        return `${baseClasses} right-full top-1/2 -translate-y-1/2 mr-4`
      case 'right':
        return `${baseClasses} left-full top-1/2 -translate-y-1/2 ml-4`
      case 'center':
        return `${baseClasses} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`
      default:
        return baseClasses
    }
  }

  // 移动端优化：小屏幕时使用居中定位
  const responsiveClasses = 'max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:z-[100]'

  if (!isVisible) return null

  return (
    <>
      {/* 移动端遮罩层 */}
      <div 
        className="md:hidden fixed inset-0 bg-black/40 z-[90]"
        onClick={onClose}
      />
      
      {/* 对话框气泡 */}
      <div
        ref={bubbleRef}
        className={`
          ${getPositionClasses()}
          ${responsiveClasses}
          ${className}
          bg-[#FFB3C6]/90 backdrop-blur-sm
          text-gray-800 font-medium
          px-6 py-4 rounded-2xl
          shadow-xl shadow-pink-300/50
          max-w-xs md:max-w-sm
          pointer-events-auto
          relative
        `}
        style={{
          transformOrigin: 'center center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 文本内容 */}
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {text}
        </p>

        {/* 关闭按钮（移动端） */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute -top-2 -right-2 w-8 h-8 
                     bg-pink-500 text-white rounded-full 
                     flex items-center justify-center
                     shadow-lg hover:bg-pink-600 transition-colors"
            aria-label="关闭对话框"
          >
            ✕
          </button>
        )}

        {/* 箭头指示器（桌面端） */}
        <div
          className={`
            hidden md:block absolute w-0 h-0
            border-8 border-transparent
            ${
              adjustedPosition === 'top'
                ? 'top-full left-1/2 -translate-x-1/2 border-t-[#FFB3C6]/90'
                : adjustedPosition === 'bottom'
                ? 'bottom-full left-1/2 -translate-x-1/2 border-b-[#FFB3C6]/90'
                : adjustedPosition === 'left'
                ? 'left-full top-1/2 -translate-y-1/2 border-l-[#FFB3C6]/90'
                : adjustedPosition === 'right'
                ? 'right-full top-1/2 -translate-y-1/2 border-r-[#FFB3C6]/90'
                : 'hidden'
            }
          `}
        />
      </div>
    </>
  )
}

