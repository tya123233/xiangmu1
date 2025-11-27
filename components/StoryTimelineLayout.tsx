'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { figmaImportedLayout } from '@/data/joiners-layout'
import ParallelAnimation from '@/components/ParallelAnimation'

// Figma 设计的原点坐标
const ORIGIN_X = 6971
const ORIGIN_Y = -2959

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
  { id: 'start', title: '初遇', y: 0 },
  { id: 'office', title: '办公室', y: 2800 },
  { id: 'details', title: '细节', y: 5800 },
  { id: 'interaction', title: '互动', y: 9800 },
  { id: 'ending', title: '结局', y: 14800 },
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
    height: 23299,
    color: '#FFFFFF',
    zIndex: 0,
  },
  {
    id: '1187:124',
    type: 'background',
    x: 6971,
    y: -2959,
    width: 1440,
    height: 16079,
    color: '#FFFFFF',
    zIndex: 1,
  },

  // 图片元素（按 y 坐标排序）
  {
    id: '1187:391',
    type: 'image',
    name: '时钟墙面',
    x: 7270,
    y: -2836,
    width: 859,
    height: 235,
    // src: '', // 暂时移除图片
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:401',
    type: 'image',
    name: '工作场景1',
    x: 7420,
    y: -2495,
    width: 581,
    height: 440,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:457',
    type: 'image',
    name: '人物肖像1',
    x: 7527,
    y: -1971,
    width: 375,
    height: 448,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:461',
    type: 'image',
    name: '办公室场景',
    x: 7174,
    y: -1339,
    width: 452,
    height: 689,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:463',
    type: 'image',
    name: '腿部特写',
    x: 7714,
    y: -1339,
    width: 542,
    height: 410,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:468',
    type: 'image',
    name: '人物侧面',
    x: 7843,
    y: -888,
    width: 450,
    height: 566,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:466',
    type: 'image',
    name: '女性人物',
    x: 7155,
    y: -598,
    width: 622,
    height: 572,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:512',
    type: 'image',
    name: '男性肖像',
    x: 7338,
    y: 320,
    width: 714,
    height: 666,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:514',
    type: 'image',
    name: '办公场景2',
    x: 7398,
    y: 1083,
    width: 851,
    height: 625,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:517',
    type: 'image',
    name: '女性全身',
    x: 7446,
    y: 1783,
    width: 490,
    height: 628,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1187:519',
    type: 'image',
    name: '男性特写',
    x: 7316,
    y: 2593,
    width: 833,
    height: 529,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1203:2',
    type: 'image',
    name: '咖啡杯',
    x: 7334,
    y: 3304,
    width: 563,
    height: 424,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1034:14',
    type: 'image',
    name: '女性坐姿',
    x: 7316,
    y: 4047,
    width: 834,
    height: 774,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1033:12',
    type: 'image',
    name: '侧脸肖像',
    x: 7096,
    y: 4971,
    width: 476,
    height: 535,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1206:4',
    type: 'image',
    name: '人物场景',
    x: 7650,
    y: 4947,
    width: 695,
    height: 1072,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:51',
    type: 'image',
    name: '背影视角',
    x: 7096,
    y: 6287,
    width: 967,
    height: 891,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:54',
    type: 'image',
    name: '侧面肖像2',
    x: 7096,
    y: 7497,
    width: 689,
    height: 1040,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:18',
    type: 'image',
    name: '办公环境',
    x: 7886,
    y: 7497,
    width: 459,
    height: 653,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:19',
    type: 'image',
    name: '工作状态',
    x: 7886,
    y: 8244,
    width: 459,
    height: 861,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:58',
    type: 'image',
    name: '双人场景',
    x: 7077,
    y: 9289,
    width: 1227,
    height: 929,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:20',
    type: 'image',
    name: '场景图1',
    x: 7106,
    y: 10367,
    width: 611,
    height: 808,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:117',
    type: 'image',
    name: '人物交互',
    x: 7537,
    y: 10698,
    width: 793,
    height: 822,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:13',
    type: 'image',
    name: '办公讨论',
    x: 7595,
    y: 11634,
    width: 628,
    height: 860,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:119',
    type: 'image',
    name: '工作瞬间',
    x: 7106,
    y: 12413,
    width: 691,
    height: 981,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:125',
    type: 'image',
    name: '人物状态',
    x: 7595,
    y: 13254,
    width: 721,
    height: 997,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:127',
    type: 'image',
    name: '办公细节',
    x: 7106,
    y: 14449,
    width: 657,
    height: 863,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:22',
    type: 'image',
    name: '场景图2',
    x: 7595,
    y: 15510,
    width: 748,
    height: 700,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },
  {
    id: '1207:26',
    type: 'image',
    name: '背影女性',
    x: 7302,
    y: 16381,
    width: 778,
    height: 961,
    // src: '',
    zIndex: 10,
    borderRadius: 12,
  },

  // 粉色遮罩块（Rectangle 系列）
  {
    id: '1187:482',
    type: 'mask',
    x: 7024,
    y: -2908,
    width: 299,
    height: 145,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "那个时钟...我记得总是慢五分钟。",
  },
  {
    id: '1187:472',
    type: 'mask',
    x: 7252,
    y: -1263,
    width: 228,
    height: 48,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "又是忙碌的一天。",
  },
  {
    id: '1187:480',
    type: 'mask',
    x: 7335,
    y: -1491,
    width: 760,
    height: 61,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "这是我们第一次在这个办公室相遇，阳光正好洒在你的桌子上。",
  },
  {
    id: '1187:471',
    type: 'mask',
    x: 7641,
    y: -872,
    width: 298,
    height: 175,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "“能帮我看看这个吗？”你当时这么问道。",
  },
  {
    id: '1187:474',
    type: 'mask',
    x: 7663,
    y: -265,
    width: 515,
    height: 162,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "你的侧脸很专注，让我忍不住多看了几眼。",
  },
  {
    id: '1187:484',
    type: 'mask',
    x: 7311,
    y: 52,
    width: 760,
    height: 157,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "后来的故事，就像这杯咖啡一样，慢慢地散发出香气。",
  },
  {
    id: '1187:488',
    type: 'mask',
    x: 7847,
    y: 1237,
    width: 302,
    height: 104,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "我们开始有了更多的话题，不只是工作。",
  },
  {
    id: '1187:486',
    type: 'mask',
    x: 6981,
    y: 1180,
    width: 569,
    height: 178,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "午后的阳光总是那么温暖，像极了你的笑容。",
  },
  {
    id: '1187:490',
    type: 'mask',
    x: 7877,
    y: 3997,
    width: 468,
    height: 185,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "偶尔的眼神交汇，都让我心跳加速。",
  },
  {
    id: '1187:492',
    type: 'mask',
    x: 7054,
    y: 5564,
    width: 679,
    height: 212,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "这张照片，记录了我们最默契的瞬间。",
  },
  {
    id: '1187:494',
    type: 'mask',
    x: 7785,
    y: 7094,
    width: 544,
    height: 228,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "时间仿佛静止了。",
  },
  {
    id: '1207:56',
    type: 'mask',
    x: 7762,
    y: 7536,
    width: 301,
    height: 160,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "每一个细节都值得被珍藏。",
  },
  {
    id: '1207:60',
    type: 'mask',
    x: 7072,
    y: 8675,
    width: 661,
    height: 385,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "即使只是背影，我也能一眼认出你。",
  },
  {
    id: '1207:72',
    type: 'mask',
    x: 7634,
    y: 10285,
    width: 504,
    height: 228,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "这是一段测试长文本显示效果的段落，希望能看到文字慢慢出现的效果，感受那种沉浸式的阅读体验。",
  },
  {
    id: '1207:71',
    type: 'mask',
    x: 7162,
    y: 11366,
    width: 544,
    height: 246,
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
    content: "未完待续...",
  },
  {
    id: '1207:70',
    type: 'mask',
    x: 7173,
    y: 12185,
    width: 544,
    height: 228,
    color: '#FF9B9B',
    opacity: 0.85,
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
    color: '#FF9B9B',
    opacity: 0.85,
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
    color: '#FF9B9B',
    opacity: 0.85,
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
    color: '#FF9B9B',
    opacity: 0.85,
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
    color: '#FF9B9B',
    opacity: 0.85,
    zIndex: 20,
    borderRadius: 20,
  },
]

export default function StoryTimelineLayout() {
  const [clickedElements, setClickedElements] = useState<Set<string>>(new Set())
  const [selectedJoinerIndex, setSelectedJoinerIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<'prev' | 'next'>('next')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activeChapter, setActiveChapter] = useState('start')

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

  // 监听滚动以更新当前章节
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // 假设 1px 对应 timeline 的 1px (虽然有缩放，但比例是一致的)
      // 需要根据实际容器高度换算
      // 计算容器高度（用于参考，但实际章节判断使用 scale）
      // const containerHeight = 23299 / 1440 * window.innerWidth
      
      // 查找当前章节
      // 简单近似：假设页面高度 = 容器高度
      // 实际上因为是 padding-bottom hack，页面高度确实很大
      
      // 计算当前滚动的相对 Y 值 (相对于原始尺寸)
      // 容器宽度是 window.innerWidth
      // 原始宽度是 1440
      // 缩放比例 scale = window.innerWidth / 1440
      const scale = window.innerWidth / 1440
      const currentY = scrollY / scale
      
      // 找到最近的章节
      for (let i = chapters.length - 1; i >= 0; i--) {
        if (currentY >= chapters[i].y - 500) { // 提前一点触发
          setActiveChapter(chapters[i].id)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Joiner 图片导航逻辑 - 优化版，带防抖
  const handleJoinerNavigate = (dir: 'prev' | 'next') => {
    if (isTransitioning) return // 防止快速点击导致的动画卡顿
    
    setIsTransitioning(true)
    setDirection(dir)
    
    setSelectedJoinerIndex((prev) => {
      if (prev === null) return null
      const newIndex =
        dir === 'prev'
          ? (prev - 1 + figmaImportedLayout.length) % figmaImportedLayout.length
          : (prev + 1) % figmaImportedLayout.length
      return newIndex
    })

    // 动画完成后重置
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // 防止背景滚动 + 性能优化
  useEffect(() => {
    if (selectedJoinerIndex !== null) {
      document.body.style.overflow = 'hidden'
      // 禁用滚动链
      document.body.style.overscrollBehavior = 'none'
      // 添加硬件加速提示
      document.body.style.transform = 'translateZ(0)'
    } else {
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
      document.body.style.transform = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
      document.body.style.transform = ''
    }
  }, [selectedJoinerIndex])

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
              onClick={() => scrollToChapter(chapter.y)}
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

      {/* 页面顶部区域 - 纯白背景融为一体 */}
      <div className="relative z-10 max-w-[1440px] mx-auto pt-16 px-4">
        {/* 手绘动画作为标题 */}
        <ParallelAnimation />

      </div>

      {/* 时间线容器 - 沉浸式全屏，纯白背景 */}
      <div className="relative w-full">
        {/* 主画布 - 全屏铺开 */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            paddingBottom: `${(23299 / 1440) * 100}%`, // 保持宽高比，基于视口宽度
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
                      top: `${(pos.top / 23299) * 100}%`,
                      width: `${(element.width / 1440) * 100}%`,
                      height: `${(element.height / 23299) * 100}%`,
                      backgroundColor: element.color,
                      zIndex: element.zIndex,
                    }}
                  />
                )
              }

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
                return (
                  <motion.div
                    key={element.id}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${(pos.left / 1440) * 100}%`,
                      top: `${(pos.top / 23299) * 100}%`,
                      width: `${(element.width / 1440) * 100}%`,
                      height: `${(element.height / 23299) * 100}%`,
                      zIndex: element.zIndex,
                      borderRadius: `${element.borderRadius}px`,
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)', // 默认阴影
                    }}
                    // 移除初始入场动画
                    whileHover={{ 
                      scale: 1,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => handleElementClick(element.id)}
                  >
                    {/* 真实图片 */}
                    {element.src ? (
                      <img 
                        src={element.src} 
                        alt={element.name || 'Story image'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      /* 占位图片 - 实际项目中替换为真实图片 */
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(element.id, index)} flex items-center justify-center text-white text-xs p-2 text-center`}
                      >
                        <span className="opacity-70">{element.name}</span>
                      </div>
                    )}
                  </motion.div>
                )
              }

              return null
            })}
          </div>
        </div>

        {/* 右上角文字 */}
        <div className="absolute top-4 right-4 text-right pointer-events-none" style={{ zIndex: 100 }}>
          <p className="text-lg font-handwriting text-gray-700">原创者</p>
          <p className="text-sm text-gray-600">life&apos;s ...</p>
        </div>
      </div>

      {/* 精彩瞬间拼贴 - 无边框融入背景 (移到底部) */}
      <div className="relative z-10 max-w-[1440px] mx-auto py-16 px-4">
        <div className="mt-8">
          {/* Joiner 容器 - 使用 Figma 提取的精确尺寸比例 */}
          <div className="relative mx-auto" style={{ maxWidth: '1200px' }}>
            <div
              className="relative w-full"
              style={{
                aspectRatio: '3573/3360', // Figma 画布比例
              }}
            >
              {/* 照片面板 */}
              {figmaImportedLayout.map((layout, index) => (
                <motion.div
                  key={layout.panelId}
                  layoutId={layout.panelId}
                  className="absolute cursor-pointer overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
                  style={{
                    left: `${layout.left}%`,
                    top: `${layout.top}%`,
                    width: `${(layout.width / 3573) * 100}%`,
                    height: `${(layout.height / 3360) * 100}%`,
                    rotate: layout.rotation,
                    zIndex: layout.zIndex,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    type: 'spring',
                    stiffness: 120,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 100,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedJoinerIndex(index)}
                >
                  {/* 照片主体 - 白色边框 */}
                  <div className="relative w-full h-full bg-white p-[3px]">
                    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {/* 占位图片 - 根据索引生成不同颜色 */}
                      <div
                        className={`w-full h-full ${getPlaceholderColor(layout.panelId, index)} 
                                  flex items-center justify-center text-white text-xs font-medium`}
                      >
                        <span className="opacity-70">照片 {index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* 照片质感效果 */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.08]"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Joiner 图片查看器 */}
      <AnimatePresence>
        {selectedJoinerIndex !== null && (
          <JoinerImageViewer
            layouts={figmaImportedLayout}
            currentIndex={selectedJoinerIndex}
            direction={direction}
            onClose={() => setSelectedJoinerIndex(null)}
            onNavigate={handleJoinerNavigate}
            getPlaceholderColor={getPlaceholderColor}
          />
        )}
      </AnimatePresence>
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
      className="absolute cursor-pointer flex items-center justify-center p-4"
      style={{
        left: `${(pos.left / 1440) * 100}%`,
        top: `${(pos.top / 23299) * 100}%`,
        width: `${(element.width / 1440) * 100}%`,
        height: `${(element.height / 23299) * 100}%`,
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

// Joiner 图片查看器组件 (保持不变)
interface JoinerImageViewerProps {
  layouts: typeof figmaImportedLayout
  currentIndex: number
  direction: 'prev' | 'next'
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  getPlaceholderColor: (id: string, index: number) => string
}

function JoinerImageViewer({
  layouts,
  currentIndex,
  direction,
  onClose,
  onNavigate,
  getPlaceholderColor,
}: JoinerImageViewerProps) {
  const currentLayout = layouts[currentIndex]
  const xOffset = direction === 'next' ? 50 : -50

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        onNavigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 
                 bg-white/10 text-white rounded-full 
                 flex items-center justify-center text-2xl font-bold
                 z-10 backdrop-blur-sm"
        aria-label="关闭"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          rotate: 90,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        ✕
      </motion.button>

      {/* 左箭头 */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate('prev')
        }}
        className="absolute left-4 md:left-8 w-12 h-12 md:w-14 md:h-14
                 bg-white/10 text-white rounded-full 
                 flex items-center justify-center text-2xl font-bold
                 z-10 backdrop-blur-sm"
        aria-label="上一张"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        ←
      </motion.button>

      {/* 右箭头 */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate('next')
        }}
        className="absolute right-4 md:right-8 w-12 h-12 md:w-14 md:h-14
                 bg-white/10 text-white rounded-full 
                 flex items-center justify-center text-2xl font-bold
                 z-10 backdrop-blur-sm"
        aria-label="下一张"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        →
      </motion.button>

      {/* 图片容器 - 使用 AnimatePresence 实现丝滑切换 */}
      <AnimatePresence mode="wait" custom={currentIndex}>
        <motion.div
          key={currentLayout.panelId}
          layoutId={currentLayout.panelId}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh] max-w-5xl perspective-1000"
          style={{
            aspectRatio: `${currentLayout.width}/${currentLayout.height}`,
          }}
          initial={{ opacity: 0, scale: 0.8, x: xOffset, rotate: direction === 'next' ? 5 : -5 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0, 
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9, 
            x: -xOffset,
            rotate: direction === 'next' ? -5 : 5,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            }
          }}
        >
          {/* 照片主体 - 白色边框 */}
          <motion.div 
            className="relative w-full h-full bg-white p-2 md:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden ring-1 ring-white/20"
            initial={{ scale: 0.98 }}
            animate={{ 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
              }
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm">
              {/* 占位图片 */}
              <motion.div
                className={`w-full h-full ${getPlaceholderColor(currentLayout.panelId, currentIndex)} 
                          flex items-center justify-center text-white text-lg md:text-2xl font-medium`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    delay: 0.1,
                  }
                }}
              >
                <span className="opacity-70">照片 {currentIndex + 1}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* 照片质感效果 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 图片信息 - 丝滑切换 */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 
                    bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            className="text-white text-sm md:text-base font-medium"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              }
            }}
            exit={{ 
              y: -20, 
              opacity: 0,
              transition: {
                duration: 0.2,
              }
            }}
          >
            {currentIndex + 1} / {layouts.length}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
