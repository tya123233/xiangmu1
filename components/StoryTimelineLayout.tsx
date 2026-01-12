'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ParallelAnimation from '@/components/ParallelAnimation'
import GestureTutorial from '@/components/GestureTutorial'
import HeroTitleEntrance from '@/components/HeroTitleEntrance'
import QuoteTypewriter from '@/components/QuoteTypewriter'
import DialogueTypewriter from '@/components/DialogueTypewriter'

// Figma 设计的原点坐标
const ORIGIN_X = 6971
const ORIGIN_Y = -2959

// 图片缩放因子 - 0.7 = 缩小到70%，可以看到更多内容
const IMAGE_SCALE = 0.65

// 将 Figma 绝对坐标转换为相对坐标
const toRelative = (x: number, y: number) => ({
  left: x - ORIGIN_X,
  top: y - ORIGIN_Y,
})

interface TimelineElement {
  id: string
  type: 'image' | 'mask' | 'background'
  x: number
  y: number
  width: number
  height: number
  name?: string
  src?: string
  color?: string
  opacity?: number
  zIndex?: number
  borderRadius?: number
  content?: string
}

// 章节数据
const chapters = [
  { id: 'start', title: 'Chapter 1', y: 0 },
  { id: 'office', title: 'Chapter 2', y: 2800 },
  { id: 'details', title: 'Chapter 3', y: 5800 },
  { id: 'interaction', title: 'Chapter 4', y: 9800 },
  { id: 'ending', title: 'Chapter 5', y: 14800 },
]

// 从 Figma 提取的所有元素数据
const timelineElements: TimelineElement[] = [
  // 背景容器 - 纯白背景
  {
    id: '1207:8',
    type: 'background',
    x: 6971,
    y: -2959,
    width: 1440,
    height: 24070,
    color: '#FFFFFF',
    zIndex: 0,
  },
  {
    id: '1187:124',
    type: 'background',
    x: 6971,
    y: -2959,
    width: 1440,
    height: 24070,
    color: '#FFFFFF',
    zIndex: 1,
  },

  // 图片元素（按 y 坐标排序）
  {
    id: '1187:391',
    type: 'image',
    name: '01',
    x: 7270,
    y: -2836,
    width: 859,
    height: 235,
    src: '/images/story/01.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:401',
    type: 'image',
    name: '02',
    x: 7420,
    y: -2495,
    width: 581,
    height: 440,
    src: '/images/story/02.png',
    zIndex: 10,
    borderRadius: 12,
  },
  // 移除了 MemoryTrigger (memory-trigger-1)
  {
    id: '1187:457',
    type: 'image',
    name: '03',
    x: 7527,
    y: -1971,
    width: 375,
    height: 448,
    src: '/images/story/03.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:461',
    type: 'image',
    name: '04',
    x: 7174,
    y: -1339,
    width: 452,
    height: 689,
    src: '/images/story/04.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:463',
    type: 'image',
    name: '05',
    x: 7714,
    y: -1339,
    width: 542,
    height: 410,
    src: '/images/story/05.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:468',
    type: 'image',
    name: '06',
    x: 7843,
    y: -888,
    width: 450,
    height: 566,
    src: '/images/story/06.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:466',
    type: 'image',
    name: '07',
    x: 7155,
    y: -598,
    width: 622,
    height: 572,
    src: '/images/story/07.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:512',
    type: 'image',
    name: '08',
    x: 7338,
    y: 320,
    width: 714,
    height: 666,
    src: '/images/story/08.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:514',
    type: 'image',
    name: '09',
    x: 7398,
    y: 1083,
    width: 851,
    height: 625,
    src: '/images/story/09.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:517',
    type: 'image',
    name: '10',
    x: 7446,
    y: 1783,
    width: 490,
    height: 628,
    src: '/images/story/10.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:519',
    type: 'image',
    name: '11',
    x: 7316,
    y: 2593,
    width: 833,
    height: 529,
    src: '/images/story/11.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1203:2',
    type: 'image',
    name: '12',
    x: 7334,
    y: 3304,
    width: 563,
    height: 424,
    src: '/images/story/12.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1034:14',
    type: 'image',
    name: '13',
    x: 7316,
    y: 4047,
    width: 834,
    height: 774,
    src: '/images/story/13.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1033:12',
    type: 'image',
    name: '14',
    x: 7096,
    y: 4971,
    width: 476,
    height: 535,
    src: '/images/story/14.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1206:4',
    type: 'image',
    name: '15',
    x: 7650,
    y: 4947,
    width: 695,
    height: 1072,
    src: '/images/story/15.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:51',
    type: 'image',
    name: '16',
    x: 7096,
    y: 6287,
    width: 967,
    height: 891,
    src: '/images/story/16.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:54',
    type: 'image',
    name: '17',
    x: 7096,
    y: 7497,
    width: 689,
    height: 1040,
    src: '/images/story/17.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:18',
    type: 'image',
    name: '18',
    x: 7886,
    y: 7497,
    width: 459,
    height: 653,
    src: '/images/story/18.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:19',
    type: 'image',
    name: '19',
    x: 7886,
    y: 8244,
    width: 459,
    height: 861,
    src: '/images/story/19.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:58',
    type: 'image',
    name: '20',
    x: 7077,
    y: 9289,
    width: 1227,
    height: 929,
    src: '/images/story/20.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:20',
    type: 'image',
    name: '21',
    x: 7106,
    y: 10367,
    width: 611,
    height: 808,
    src: '/images/story/21.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:117',
    type: 'image',
    name: '22',
    x: 7537,
    y: 10698,
    width: 793,
    height: 822,
    src: '/images/story/22.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:13',
    type: 'image',
    name: '23',
    x: 7595,
    y: 11634,
    width: 628,
    height: 860,
    src: '/images/story/23.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:119',
    type: 'image',
    name: '24',
    x: 7106,
    y: 12413,
    width: 691,
    height: 981,
    src: '/images/story/24.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:125',
    type: 'image',
    name: '25',
    x: 7595,
    y: 13254,
    width: 721,
    height: 997,
    src: '/images/story/25.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:127',
    type: 'image',
    name: '26',
    x: 7106,
    y: 14449,
    width: 657,
    height: 863,
    src: '/images/story/26.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:22',
    type: 'image',
    name: '27',
    x: 7595,
    y: 15510,
    width: 748,
    height: 700,
    src: '/images/story/27.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:26',
    type: 'image',
    name: '28',
    x: 7302,
    y: 16381,
    width: 778,
    height: 961,
    src: '/images/story/28.png',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: 'door-image',
    type: 'image',
    name: 'door',
    x: 7302,
    y: 17513,
    width: 800,
    height: 600,
    src: '/images/door.png',
    zIndex: 10,
    borderRadius: 12,
  },

  {
    id: '1187:472',
    type: 'mask',
    x: 7252,
    y: -1263,
    width: 228,
    height: 48,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:474',
    type: 'mask',
    x: 7663,
    y: -265,
    width: 515,
    height: 162,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:484',
    type: 'mask',
    x: 7311,
    y: 52,
    width: 760,
    height: 157,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:488',
    type: 'mask',
    x: 7847,
    y: 1237,
    width: 302,
    height: 104,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:486',
    type: 'mask',
    x: 6981,
    y: 1180,
    width: 569,
    height: 178,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:490',
    type: 'mask',
    x: 7877,
    y: 3997,
    width: 468,
    height: 185,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:492',
    type: 'mask',
    x: 7054,
    y: 5564,
    width: 679,
    height: 212,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1187:494',
    type: 'mask',
    x: 7785,
    y: 7094,
    width: 544,
    height: 228,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1207:56',
    type: 'mask',
    x: 7762,
    y: 7536,
    width: 301,
    height: 160,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1207:60',
    type: 'mask',
    x: 7072,
    y: 8675,
    width: 661,
    height: 385,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1207:72',
    type: 'mask',
    x: 7634,
    y: 10285,
    width: 504,
    height: 228,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1207:71',
    type: 'mask',
    x: 7162,
    y: 11366,
    width: 544,
    height: 246,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
    content: "",
  },
  {
    id: '1207:70',
    type: 'mask',
    x: 7173,
    y: 12185,
    width: 544,
    height: 228,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
  },
  {
    id: '1207:115',
    type: 'mask',
    x: 7669,
    y: 12928,
    width: 635,
    height: 260,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
  },
  {
    id: '1207:123',
    type: 'mask',
    x: 7064,
    y: 13865,
    width: 653,
    height: 287,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
  },
  {
    id: '1207:129',
    type: 'mask',
    x: 7690,
    y: 14929,
    width: 653,
    height: 287,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
  },
  {
    id: '1187:476',
    type: 'mask',
    x: 8068,
    y: -1301,
    width: 336,
    height: 125,
    color: '#FFFFFF',
    opacity: 1,
    zIndex: 20,
    borderRadius: 20,
  },
]

export default function StoryTimelineLayout() {
  const [clickedElements, setClickedElements] = useState<Set<string>>(new Set())
  const [activeChapter, setActiveChapter] = useState('start')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const chapter1Ref = useRef<HTMLDivElement>(null)
  const parallelRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const handleElementClick = (id: string) => {
    setClickedElements((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // 目前只有 Chapter 1，所以不需要根据滚动更新章节高亮
  // 当后续章节完成后，可以恢复滚动监听
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY
  //     const scale = window.innerWidth / 1440
  //     const currentY = scrollY / scale
  //     
  //     for (let i = chapters.length - 1; i >= 0; i--) {
  //       if (currentY >= chapters[i].y - 500) {
  //         setActiveChapter(chapters[i].id)
  //         break
  //       }
  //     }
  //   }
  //   
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  // 为占位图片生成确定性颜色（基于元素ID）
  const getPlaceholderColor = (id: string, index: number) => {
    const colors = [
      'from-blue-400 to-purple-500',
      'from-pink-400 to-rose-500',
      'from-green-400 to-teal-500',
      'from-yellow-400 to-orange-500',
      'from-indigo-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-teal-400 to-cyan-500',
      'from-orange-400 to-red-500',
      'from-cyan-400 to-blue-500',
      'from-red-400 to-pink-500',
    ]
    return colors[index % colors.length]
  }
  
  // 滚动到章节
  const scrollToChapter = (y: number) => {
    const scale = window.innerWidth / 1440
    window.scrollTo({
      top: y * scale + 800, // +800 跳过顶部的 Joiner 区域
      behavior: 'smooth'
    })
  }

  // 滚动到 Chapter 1 (Parallel 标题)
  const scrollToChapter1 = () => {
    setIsUnlocked(true)
    setTimeout(() => {
      // 滚动到 Parallel 标题区域
      parallelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  // 处理章节点击
  const handleChapterClick = (chapter: typeof chapters[0]) => {
    if (chapter.id === 'start') {
      scrollToChapter(chapter.y)
    } else {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  // 滚动锁定：未点击按钮时，禁止滚动超过分隔线
  useEffect(() => {
    if (isUnlocked) return

    const handleScrollLock = (e: WheelEvent) => {
      if (!dividerRef.current) return
      
      const dividerRect = dividerRef.current.getBoundingClientRect()
      // 当分隔线进入视口底部附近时，阻止向下滚动
      if (dividerRect.top < window.innerHeight - 100 && e.deltaY > 0) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', handleScrollLock, { passive: false })
    return () => window.removeEventListener('wheel', handleScrollLock)
  }, [isUnlocked])

  return (
    <div className="min-h-screen bg-white">
      {/* 章节导航菜单 */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      >
        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg space-y-8 border border-gray-100">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id}
              className="group relative cursor-pointer flex flex-col items-center gap-3"
              onClick={() => handleChapterClick(chapter)}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeChapter === chapter.id ? 'bg-black scale-125' : 'bg-gray-300 group-hover:bg-gray-500'
              }`} />
              <span className={`text-xs font-medium writing-vertical-lr transition-colors ${
                activeChapter === chapter.id ? 'text-black font-semibold' : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {chapter.title}
              </span>
              
              {activeChapter === chapter.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute -left-3 top-1 w-1.5 h-1.5 bg-black rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 提示 Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-32 top-1/2 -translate-y-1/2 z-[60] bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-xl text-sm font-medium tracking-wide"
          >
            Coming soon... We are working hard on it.
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页面顶部区域 - 纯白背景融为一体 */}
      <div className="relative z-10 max-w-[1440px] mx-auto pt-16 px-4 flex flex-col items-center">
        {/* 手势教学 - 作为开场 */}
        <GestureTutorial />

        {/* 分隔线与按钮 */}
        <div ref={dividerRef} className="relative w-full flex items-center justify-center py-12 mb-20">
          <div className="h-[1px] bg-gray-300 w-1/4 max-w-[200px]" />
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToChapter1}
            className="mx-8 w-14 h-14 rounded-full border-2 border-gray-500 bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:border-gray-700 transition-all group z-20 cursor-pointer"
          >
            <svg 
              className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
          
          <div className="h-[1px] bg-gray-300 w-1/4 max-w-[200px]" />
        </div>
      </div>

      {/* Chapter 1 及以下内容 - 点击按钮后才显示 */}
      <div 
        className={`transition-all duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col items-center">
          {/* Parallel 标题 - 序幕，点击按钮后出现 */}
          <div ref={parallelRef} className="mb-32 scroll-mt-32">
             <ParallelAnimation />
          </div>

          {/* Chapter 1 巨型入场 */}
          <div ref={chapter1Ref} className="w-full h-[180px] mt-16 relative z-0 scroll-mt-20">
            <HeroTitleEntrance title="Chapter 1" className="w-full h-full" />
          </div>

          {/* 柏拉图名言 - 打字机效果 */}
          <QuoteTypewriter />
        </div>

        {/* 间隔 - 适度留白 */}
        <div className="h-16 md:h-24" />

        {/* 新增：对话打字机 */}
        <DialogueTypewriter />

      {/* 时间线容器 - 沉浸式全屏，纯白背景 */}
      <div className="relative w-full">
        {/* 主画布 - 全屏铺开 */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            paddingBottom: `${(24070 / 1440) * 100}%`, // 保持宽高比，基于视口宽度
            backgroundColor: '#FFFFFF', // 纯白背景
          }}
        >
          {/* 绝对定位容器 */}
          <div className="absolute inset-0">
            {/* 渲染所有元素 */}
            {timelineElements.map((element, index) => {
              const pos = toRelative(element.x, element.y)
              const isClicked = clickedElements.has(element.id)

              // 背景元素 - 仅渲染非全屏背景的装饰性背景
              if (element.type === 'background') {
                // 跳过大背景，因为我们已经用 CSS 处理了
                if (element.width >= 1440) return null
                
                return (
                  <div
                    key={element.id}
                    className="absolute"
                    style={{
                      left: `${(pos.left / 1440) * 100}%`,
                      top: `${(pos.top / 24070) * 100}%`,
                      width: `${(element.width / 1440) * 100}%`,
                      height: `${(element.height / 24070) * 100}%`,
                      backgroundColor: element.color,
                      zIndex: element.zIndex,
                    }}
                  />
                )
              }

              // 删除了 MemoryTrigger 的渲染逻辑，因为已经在 DialogueTypewriter 中包含了

              // 粉色遮罩块 - 使用 TimelineDialog 组件
              if (element.type === 'mask') {
                return (
                  <TimelineDialog
                    key={element.id}
                    element={element}
                    pos={pos}
                    isClicked={isClicked}
                    onClick={() => handleElementClick(element.id)}
                  />
                )
              }

              // 图片元素 - 一开始就存在，无过场动画
              if (element.type === 'image') {
                // 计算缩放后的尺寸和居中偏移
                const scaledWidth = element.width * IMAGE_SCALE
                const scaledHeight = element.height * IMAGE_SCALE
                const offsetX = (element.width - scaledWidth) / 2 // 居中偏移
                const offsetY = (element.height - scaledHeight) / 2
                
                return (
                  <motion.div
                    key={element.id}
                    className="absolute" // 移除 cursor-pointer 和 group
                    style={{
                      left: `${((pos.left + offsetX) / 1440) * 100}%`,
                      top: `${((pos.top + offsetY) / 24070) * 100}%`,
                      width: `${(scaledWidth / 1440) * 100}%`,
                      height: `${(scaledHeight / 24070) * 100}%`,
                      zIndex: element.zIndex,
                      borderRadius: `${element.borderRadius}px`,
                      // overflow: 'hidden', // 可选：如果希望图片完全无拘无束
                    }}
                    // 移除交互动画
                  >
                    {/* 真实图片 */}
                    {element.src ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={element.src} 
                          alt={element.name || 'Story image'}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover" // 移除 hover:scale-110
                        />
                      </div>
                    ) : (
                      /* 占位图片 - 实际项目中替换为真实图片 */
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(element.id, index)} flex items-center justify-center text-white text-xl font-bold p-2 text-center tracking-widest`}
                      >
                        <span className="opacity-90">{element.name}</span>
                      </div>
                    )}
                  </motion.div>
                )
              }

              return null
            })}

            {/* 结尾：未完待续 (从约 21171px 开始，填满剩余约 2899px) */}
            <div 
              className="absolute w-full flex flex-col items-center justify-center z-40"
              style={{
                      top: `${(21171 / 24070) * 100}%`,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #000000 30%, #000000 100%)',
                    }}
            >
              <div className="text-white text-center px-4">
                <h3 className="text-2xl md:text-4xl font-serif mb-4 tracking-widest font-light">
                  To Be Continued
                </h3>
                <p className="text-sm md:text-base font-light opacity-70 tracking-wider">
                  We are working hard to continue the story...
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

// 独立的 TimelineDialog 组件，处理动画和打字机效果
function TimelineDialog({ 
  element, 
  pos, 
  isClicked, 
  onClick 
}: { 
  element: TimelineElement, 
  pos: { left: number, top: number }, 
  isClicked: boolean, 
  onClick: () => void 
}) {
  const [displayedContent, setDisplayedContent] = useState('')
  // 如果没有 content，使用默认占位符
  const content = element.content || ""
  const [isInView, setIsInView] = useState(false)

  // 打字机效果
  useEffect(() => {
    if (isInView && content) {
      setDisplayedContent('')
      // 延迟 800ms 等待对话框完全浮现 (配合动画时长 1.1s)
      const timeoutId = setTimeout(() => {
        let index = 0
        const intervalId = setInterval(() => {
          index++
          setDisplayedContent(content.slice(0, index))
          if (index >= content.length) {
            clearInterval(intervalId)
          }
        }, 80) // 慢速打字
        
        return () => clearInterval(intervalId)
      }, 800)

      return () => clearTimeout(timeoutId)
    }
  }, [isInView, content])

  return (
    <motion.div
      className="absolute cursor-pointer flex flex-col items-center justify-center p-4 shadow-xl border border-gray-100"
      style={{
        left: `${(pos.left / 1440) * 100}%`,
        top: `${(pos.top / 24070) * 100}%`,
        width: `${(element.width / 1440) * 100}%`,
        height: `${(element.height / 24070) * 100}%`,
        backgroundColor: element.color,
        zIndex: element.zIndex,
        borderRadius: `${element.borderRadius}px`,
      }}
      // 初始状态：透明、缩小、向下偏移
      initial={{ 
        opacity: 0, 
        scale: 0.6, 
        y: 100,
        rotate: -5 
      }}
      // 进入视口时的状态
      whileInView={{ 
        opacity: isClicked ? 0.95 : (element.opacity || 0.85), 
        scale: isClicked ? 1.05 : 1, 
        y: 0,
        rotate: 0
      }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => {
        setIsInView(false)
        setDisplayedContent('') // 离开视口重置文字
      }}
      // 视口检测配置
      viewport={{ 
        once: false, 
        margin: "-10% 0px -10% 0px", 
        amount: 0.3 
      }}
      // 动画配置：速度增加 30% (时长从 2.0s 减少到 1.5s，再快 25% 到 1.1s)
      transition={{
        duration: 1.1,
        ease: "easeOut", // 柔和的缓动
      }}
      // 悬停交互 - 移除悬浮感
      whileHover={{ 
        scale: 1,
        transition: { duration: 0.2 } 
      }}
      // 点击交互
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {content && (
        <p className="text-gray-800 font-medium text-sm md:text-base leading-relaxed text-center">
          {displayedContent}
        </p>
      )}
    </motion.div>
  )
}
