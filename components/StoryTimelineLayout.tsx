'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { figmaImportedLayout } from '@/data/joiners-layout'

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
}

// 从 Figma 提取的所有元素数据
const timelineElements: TimelineElement[] = [
  // 背景容器
  {
    id: '1207:8',
    type: 'background',
    x: 6971,
    y: -2959,
    width: 1440,
    height: 23299,
    color: '#E8E8E8',
    zIndex: 0,
  },
  {
    id: '1187:124',
    type: 'background',
    x: 6971,
    y: -2959,
    width: 1440,
    height: 16079,
    color: '#E0E0E0',
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
    src: '/images/timeline/clock-wall.jpg',
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
    src: '/images/timeline/work-scene-1.jpg',
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
    src: '/images/timeline/portrait-1.jpg',
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
    src: '/images/timeline/office-scene.jpg',
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
    src: '/images/timeline/legs-closeup.jpg',
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
    src: '/images/timeline/side-portrait.jpg',
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
    src: '/images/timeline/female-portrait.jpg',
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
    src: '/images/timeline/male-portrait.jpg',
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
    src: '/images/timeline/office-scene-2.jpg',
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
    src: '/images/timeline/female-full.jpg',
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
    src: '/images/timeline/male-closeup.jpg',
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
    src: '/images/timeline/coffee-cup.jpg',
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
    src: '/images/timeline/female-sitting.jpg',
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
    src: '/images/timeline/side-face.jpg',
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
    src: '/images/timeline/character-scene.jpg',
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
    src: '/images/timeline/back-view.jpg',
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
    src: '/images/timeline/profile-2.jpg',
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
    src: '/images/timeline/office-env.jpg',
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
    src: '/images/timeline/working-state.jpg',
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
    src: '/images/timeline/two-people.jpg',
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
    src: '/images/timeline/scene-1.jpg',
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
    src: '/images/timeline/interaction.jpg',
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
    src: '/images/timeline/discussion.jpg',
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
    src: '/images/timeline/work-moment.jpg',
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
    src: '/images/timeline/character-state.jpg',
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
    src: '/images/timeline/office-detail.jpg',
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
    src: '/images/timeline/scene-2.jpg',
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
    src: '/images/timeline/female-back.jpg',
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

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">故事时间线</h1>
          <p className="text-gray-400">原创者：life&apos;s...</p>
        </div>

        {/* Joiner 拼贴效果区域 - 从 Figma 精确还原 */}
        <div className="mb-20 bg-gradient-to-br from-amber-50 via-rose-50 to-blue-50 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            📸 精彩瞬间拼贴
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Figma 精确布局 · 1:1 还原设计
          </p>

          {/* Joiner 容器 - 使用 Figma 提取的精确尺寸比例 */}
          <div className="relative mx-auto" style={{ maxWidth: '1200px' }}>
            <div
              className="relative w-full bg-white rounded-2xl shadow-xl overflow-hidden"
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
                      {/* 真实图片时替换为：
                      <Image
                        src={layout.imagePath ? `/images/${layout.imagePath}` : '/images/placeholder.jpg'}
                        alt={`照片 ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 400px, 600px"
                        priority={index < 4}
                      />
                      */}
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

                  {/* 边缘磨损效果 */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                      background: `radial-gradient(circle at ${(index * 37) % 100}% ${(index * 53) % 100}%, transparent 65%, rgba(0,0,0,0.4) 100%)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* 布局统计信息 */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                📐 精确还原 · {figmaImportedLayout.length} 张照片 · 画布比例 3573:3360
              </p>
            </div>
          </div>
        </div>

        {/* 时间线容器 - 精确复刻 Figma 设计 */}
        <div className="relative mx-auto" style={{ maxWidth: '1440px' }}>
          {/* 主画布 - 使用相对定位容器 */}
          <div
            className="relative overflow-hidden"
            style={{
              width: '100%',
              paddingBottom: `${(23299 / 1440) * 100}%`, // 保持宽高比
              backgroundColor: '#E8E8E8',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            {/* 绝对定位容器 */}
            <div className="absolute inset-0">
              {/* 渲染所有元素 */}
              {timelineElements.map((element, index) => {
                const pos = toRelative(element.x, element.y)
                const isClicked = clickedElements.has(element.id)

                // 背景元素
                if (element.type === 'background') {
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

                // 粉色遮罩块 - 像对话框一样丝滑弹出
                if (element.type === 'mask') {
                  return (
                    <motion.div
                      key={element.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${(pos.left / 1440) * 100}%`,
                        top: `${(pos.top / 23299) * 100}%`,
                        width: `${(element.width / 1440) * 100}%`,
                        height: `${(element.height / 23299) * 100}%`,
                        backgroundColor: element.color,
                        zIndex: element.zIndex,
                        borderRadius: `${element.borderRadius}px`,
                        // 移除内联的 opacity 和 transform，交给 motion 控制
                      }}
                      // 初始状态：透明、缩小、向下偏移
                      initial={{ 
                        opacity: 0, 
                        scale: 0.5, 
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
                      // 视口检测配置
                      viewport={{ 
                        once: false, // 每次进入视口都触发，增加互动感
                        margin: "-10% 0px -10% 0px", // 上下各留 10% 边距触发
                        amount: 0.3 // 元素露出 30% 时触发
                      }}
                      // 丝滑的弹簧动画配置
                      transition={{
                        type: "spring",
                        stiffness: 200, // 刚度，越大越强力
                        damping: 15,    // 阻尼，越小越弹
                        mass: 1,
                        delay: 0.1      // 轻微延迟
                      }}
                      // 悬停交互 - 移除悬浮感
                      whileHover={{ 
                        scale: 1,
                        transition: { duration: 0.2 } 
                      }}
                      // 点击交互
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleElementClick(element.id)}
                    />
                  )
                }

                // 图片元素 - 优雅浮现
                if (element.type === 'image') {
                  return (
                    <motion.div
                      key={element.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${(pos.left / 1440) * 100}%`,
                        top: `${(pos.top / 23299) * 100}%`,
                        width: `${(element.width / 1440) * 100}%`,
                        height: `${(element.height / 23299) * 100}%`,
                        zIndex: element.zIndex,
                        borderRadius: `${element.borderRadius}px`,
                        overflow: 'hidden',
                        // 移除内联 transform 和 boxShadow
                      }}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: isClicked ? 1.02 : 1,
                        y: 0,
                        boxShadow: isClicked 
                          ? '0 10px 30px rgba(0,0,0,0.4)' 
                          : '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      // 悬停交互 - 移除悬浮感
                      whileHover={{ 
                        scale: 1,
                        transition: { duration: 0.3 }
                      }}
                      onClick={() => handleElementClick(element.id)}
                    >
                      {/* 占位图片 - 实际项目中替换为真实图片 */}
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(element.id, index)} flex items-center justify-center text-white text-xs p-2 text-center`}
                      >
                        <span className="opacity-70">{element.name}</span>
                      </div>
                    </motion.div>
                  )
                }

                return null
              })}
            </div>
          </div>

          {/* 右上角文字 */}
          <div className="absolute top-4 right-4 text-right" style={{ zIndex: 100 }}>
            <p className="text-lg font-handwriting text-gray-700">原创者</p>
            <p className="text-sm text-gray-600">life&apos;s ...</p>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>总计 {timelineElements.filter((e) => e.type === 'image').length} 张图片</p>
          <p>已点击 {clickedElements.size} 个元素</p>
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

// Joiner 图片查看器组件
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
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
          className="relative w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh] max-w-5xl"
          style={{
            aspectRatio: `${currentLayout.width}/${currentLayout.height}`,
          }}
          initial={{ opacity: 0, scale: 0.9, x: xOffset }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            transition: {
              duration: 0.4,
              ease: [0.43, 0.13, 0.23, 0.96], // 自定义缓动曲线
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9, 
            x: -xOffset,
            transition: {
              duration: 0.3,
              ease: [0.43, 0.13, 0.23, 0.96],
            }
          }}
        >
          {/* 照片主体 - 白色边框 */}
          <motion.div 
            className="relative w-full h-full bg-white p-2 md:p-3 shadow-2xl"
            initial={{ scale: 0.95 }}
            animate={{ 
              scale: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              }
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
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
              {/* 真实图片时替换为：
              <Image
                src={currentLayout.imagePath ? `/images/${currentLayout.imagePath}` : '/images/placeholder.jpg'}
                alt={`照片 ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
              */}
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
