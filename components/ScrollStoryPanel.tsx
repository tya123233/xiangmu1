'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { StoryPanel as StoryPanelType } from '@/data/story-data'
import TypewriterText from './TypewriterText'
import ParallaxImage from './ParallaxImage'

interface ScrollStoryPanelProps {
  panel: StoryPanelType
  index: number
}

export default function ScrollStoryPanel({ panel, index }: ScrollStoryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  // 监听元素是否进入视口
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (panelRef.current) {
      observer.observe(panelRef.current)
    }

    return () => {
      if (panelRef.current) {
        observer.unobserve(panelRef.current)
      }
    }
  }, [])
  
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
  
  // 判断是否是打字机页面（黑色背景页面）
  const isTypewriterPage = !panel.title && panel.content?.includes('|') && panel.background?.includes('gradient')
  
  // 判断是否是白色背景页面（普通章节）
  const isWhiteBackground = panel.background === '#ffffff' && !isTitlePage && !isTypewriterPage
  
  // 判断是否有内容（决定高度）
  const hasContent = panel.content && panel.content.trim().length > 0
  const minHeight = isTitlePage ? '100vh' : hasContent ? '100vh' : '100vh'
  
  // 分割打字机文本
  const typewriterLines = isTypewriterPage && panel.content ? panel.content.split('|') : []
  
  // 如果是视差图片面板，单独渲染
  if (panel.parallaxImage) {
    return (
      <div data-section-index={index}>
        <ParallaxImage 
          src={panel.parallaxImage} 
          alt={panel.title || '视差图片'} 
        />
      </div>
    )
  }
  
  return (
    <section
      ref={panelRef}
      data-section-index={index}
      className="relative w-full flex flex-col justify-center items-center px-8 py-20 md:px-12"
      style={{
        minHeight,
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
              loading="eager"
              sizes="100vw"
            />
          </div>
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-[1]" />
        </>
      )}
      
      {/* 内容区域 */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* 标题 */}
        {panel.title && (
          <h1
            className={`
              panel-title font-bold mb-6 md:mb-8 leading-tight text-center
              ${isTitlePage 
                ? 'text-[8rem] md:text-[12rem] lg:text-[16rem] text-black tracking-widest' 
                : isWhiteBackground
                  ? 'text-4xl md:text-6xl lg:text-7xl tracking-wide text-black'
                  : 'text-4xl md:text-6xl lg:text-7xl tracking-wide text-white text-shadow'
              }
            `}
            style={isTitlePage ? { fontWeight: 900, letterSpacing: '0.2em' } : {}}
          >
            {panel.title}
          </h1>
        )}
        
        {/* 打字机效果页面（左右布局） */}
        {isTypewriterPage && typewriterLines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-4 md:px-12">
            {/* 左边文字 */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              {typewriterLines.slice(0, 2).map((line, idx) => (
                <div
                  key={idx}
                  className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed"
                >
                  {isVisible ? (
                    <TypewriterText 
                      text={line.trim()} 
                      speed={100} 
                      delay={idx * 2000}
                    />
                  ) : (
                    <span className="opacity-0">{line.trim()}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* 右边文字 */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              {typewriterLines.slice(2, 4).map((line, idx) => (
                <div
                  key={idx}
                  className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed"
                >
                  {isVisible ? (
                    <TypewriterText 
                      text={line.trim()} 
                      speed={100} 
                      delay={(idx + 2) * 2000}
                    />
                  ) : (
                    <span className="opacity-0">{line.trim()}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 普通文字内容（居中） */
          panel.content && !isTypewriterPage && (
            <div
              className={`
                panel-text text-base md:text-xl lg:text-2xl leading-loose mb-8 md:mb-10
                max-w-4xl mx-auto whitespace-pre-line text-center
                ${isWhiteBackground ? 'text-gray-800' : 'text-white text-shadow'}
                py-8 md:py-12
              `}
            >
              {panel.content}
            </div>
          )
        )}
        
        {/* 单个插图 */}
        {panel.image && (
          <div className="panel-image relative w-full max-w-2xl mx-auto aspect-video">
            <Image
              src={panel.image}
              alt={panel.title || '插图'}
              fill
              className="object-contain rounded-xl shadow-2xl"
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        )}
        
        {/* 多个插图（从上到下排列） */}
        {panel.images && panel.images.length > 0 && (
          <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12 space-y-8 px-4">
            {panel.images.map((imageSrc, idx) => (
              <div
                key={idx}
                className="relative w-full overflow-hidden rounded-lg shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <Image
                  src={imageSrc}
                  alt={`${panel.title || '插图'} ${idx + 1}`}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 章节分隔线（除了标题页和打字机页面） */}
      {!isTitlePage && !isTypewriterPage && (
        <div 
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full
            ${isWhiteBackground ? 'bg-gray-300' : 'bg-white/30'}
          `}
        />
      )}
    </section>
  )
}


