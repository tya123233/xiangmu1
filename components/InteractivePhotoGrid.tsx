'use client'

import { useEffect } from 'react'
import ClickablePhoto, { PhotoWithDialogs } from './ClickablePhoto'
import { gsap } from 'gsap'

interface InteractivePhotoGridProps {
  /** 照片数据数组 */
  photos: PhotoWithDialogs[]
  /** 容器高度（默认 100vh） */
  containerHeight?: string
  /** 背景颜色或渐变 */
  background?: string
  /** 自定义容器类名 */
  className?: string
}

/**
 * InteractivePhotoGrid - 交互式照片网格容器
 * 
 * 功能：
 * - 自由位置布局（基于 absolute 定位）
 * - 照片入场动画
 * - 响应式设计
 * - 支持多张独立照片
 */
export default function InteractivePhotoGrid({
  photos,
  containerHeight = '100vh',
  background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  className = '',
}: InteractivePhotoGridProps) {
  // 照片入场动画
  useEffect(() => {
    const photoElements = document.querySelectorAll('.clickable-photo')
    
    gsap.fromTo(
      photoElements,
      {
        opacity: 0,
        scale: 0.8,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <div
      className={`
        relative w-full overflow-hidden
        ${className}
      `}
      style={{
        height: containerHeight,
        background,
      }}
    >
      {/* 照片容器 */}
      <div className="relative w-full h-full">
        {photos.map((photo) => (
          <div key={photo.id} className="clickable-photo">
            <ClickablePhoto
              photo={photo}
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>

      {/* 使用说明（可选） */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <p className="text-sm text-gray-700 font-medium">
            💡 点击照片查看对话框 | 按 <kbd className="px-2 py-1 bg-gray-200 rounded">Esc</kbd> 关闭
          </p>
        </div>
      </div>
    </div>
  )
}

