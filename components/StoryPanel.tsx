'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { StoryPanel as StoryPanelType } from '@/data/story-data'

interface StoryPanelProps {
  panel: StoryPanelType
  index: number
  isActive: boolean
}

export default function StoryPanel({ panel, index, isActive }: StoryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  
  // 生成随机渐变色（如果没有指定背景）
  const getRandomGradient = () => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
  }
  
  // 判断是否是标题页（AGAIN）
  const isTitlePage = panel.title === 'AGAIN' && !panel.content
  
  return (
    <div
      ref={panelRef}
      data-panel-index={index}
      className={`
        story-panel
        absolute top-0 left-0 w-full h-screen
        flex flex-col justify-center items-center
        px-8 pt-20 pb-12 md:px-12
        ${isActive ? 'active opacity-100 visible z-[2]' : 'opacity-0 invisible z-[1]'}
        transition-opacity duration-500
      `}
      style={{
        background: panel.backgroundImage ? 'transparent' : (panel.background || getRandomGradient()),
      }}
    >
      {/* 背景图片 */}
      {panel.backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={panel.backgroundImage}
              alt={panel.title || '背景图片'}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-[1]" />
        </>
      )}
      
      {/* 内容区域 */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* 标题 */}
        {panel.title && (
          <h1
            className={`
              panel-title font-bold mb-6 md:mb-8 leading-tight
              ${isTitlePage 
                ? 'text-[8rem] md:text-[12rem] lg:text-[16rem] text-black tracking-widest' 
                : 'text-4xl md:text-6xl lg:text-7xl tracking-wide text-white text-shadow'
              }
            `}
            style={isTitlePage ? { fontWeight: 900, letterSpacing: '0.2em' } : {}}
          >
            {panel.title}
          </h1>
        )}
        
        {/* 文字内容 */}
        {panel.content && (
          <div
            className="panel-text text-base md:text-xl lg:text-2xl leading-relaxed mb-8 md:mb-10
                       max-w-3xl mx-auto text-white text-shadow whitespace-pre-line"
          >
            {panel.content}
          </div>
        )}
        
        {/* 插图 */}
        {panel.image && (
          <div className="panel-image relative w-full max-w-2xl mx-auto aspect-video">
            <Image
              src={panel.image}
              alt={panel.title || '插图'}
              fill
              className="object-contain rounded-xl shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        )}
      </div>
    </div>
  )
}

