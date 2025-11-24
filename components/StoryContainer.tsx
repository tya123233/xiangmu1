'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { StoryPanel as StoryPanelType, Chapter } from '@/data/story-data'
import ScrollStoryPanel from './ScrollStoryPanel'
import ProgressBar from './ProgressBar'
import PageIndicator from './PageIndicator'
import TapHint from './TapHint'
import LoadingScreen from './LoadingScreen'
import ChapterMenu from './ChapterMenu'
import { useImagePreload } from '@/hooks/useImagePreload'

interface StoryContainerProps {
  panels: StoryPanelType[]
  chapters: Chapter[]
}

export default function StoryContainer({ panels, chapters }: StoryContainerProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 收集所有需要预加载的图片
  const allImageUrls = useMemo(() => {
    const urls: string[] = []
    panels.forEach(panel => {
      if (panel.backgroundImage) urls.push(panel.backgroundImage)
      if (panel.image) urls.push(panel.image)
      if (panel.parallaxImage) urls.push(panel.parallaxImage)
      if (panel.images) urls.push(...panel.images)
    })
    return urls
  }, [panels])
  
  // 预加载所有图片
  const { isLoaded, progress } = useImagePreload(allImageUrls)
  
  // 监听滚动位置，更新进度条和当前章节
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrollTop = containerRef.current.scrollTop
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight
      const progress = (scrollTop / scrollHeight) * 100
      
      setScrollProgress(progress)
      setShowHint(false)
      
      // 检测当前在哪个章节
      const sections = containerRef.current.querySelectorAll('[data-section-index]')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 200 && rect.bottom >= 200) {
          const index = parseInt(section.getAttribute('data-section-index') || '0')
          setCurrentChapter(index)
        }
      })
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // 跳转到指定章节
  const scrollToChapter = (panelIndex: number) => {
    const section = containerRef.current?.querySelector(`[data-section-index="${panelIndex}"]`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  if (!isLoaded) {
    return <LoadingScreen progress={progress} />
  }
  
  // 找到当前章节
  const getCurrentChapterIndex = () => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentChapter >= chapters[i].panelIndex) {
        return i
      }
    }
    return 0
  }
  
  const currentChapterInfo = chapters[getCurrentChapterIndex()]
  
  return (
    <>
      <ProgressBar progress={scrollProgress} />
      
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {panels.map((panel, index) => (
          <ScrollStoryPanel
            key={panel.id}
            panel={panel}
            index={index}
          />
        ))}
      </div>
      
      <PageIndicator
        currentPage={currentChapterInfo?.id || 1}
        totalPages={chapters.length}
      />
      
      {showHint && <TapHint />}
      
      <ChapterMenu
        chapters={chapters}
        currentPanelIndex={currentChapter}
        onChapterClick={scrollToChapter}
      />
    </>
  )
}

