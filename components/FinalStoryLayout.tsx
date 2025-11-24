'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'

/**
 * FinalStoryLayout - 终极优化版故事布局
 * 
 * 核心特点：
 * - 照片分散布局（不捆在一起）
 * - 扩大可点击区域
 * - GSAP 动画对话框
 * - 响应式设计
 * - 优化的用户体验
 */

const storyPhotos = [
  {
    id: 'photo-1',
    image: '/images/office-clock.png',
    alt: '办公室时钟',
    dialog: { text: 'fn：那你们是怎么遇见的？', position: 'bottom-left' },
    containerClass: 'absolute left-[10%] top-[50px] w-[50vw] max-w-[600px]',
  },
  {
    id: 'photo-2',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '初次相遇',
    dialog: { text: 'rn：我们是同一天入职的。你知道那种...第一天上班的紧张感吗？', position: 'bottom-right' },
    containerClass: 'absolute right-[10%] top-[300px] w-[40vw] max-w-[500px]',
  },
  {
    id: 'photo-3',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '工作中的她',
    dialogs: [
      { text: 'fn：然后呢？', position: 'bottom-left' },
      { text: 'rn：然后...就是工作啊。她坐在斜对角，有时候我会看到她托着下巴思考的样子。', position: 'top-right' },
    ],
    containerClass: 'absolute left-[15%] top-[700px] w-[35vw] max-w-[450px]',
  },
  {
    id: 'photo-4',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '咖啡时光',
    dialog: { text: 'fn：听起来你注意到很多细节。', position: 'bottom-right' },
    containerClass: 'absolute right-[15%] top-[1100px] w-[38vw] max-w-[480px]',
  },
  {
    id: 'photo-5',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '快乐时光',
    dialog: { text: 'rn：有一次我们一起去吃冰激凌，她坚持要拍我舔冰激凌的样子，说我像只小猫。', position: 'bottom-left' },
    containerClass: 'absolute left-[12%] top-[1500px] w-[42vw] max-w-[520px]',
  },
  {
    id: 'photo-6',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '深情回忆',
    dialog: { text: 'fn：你们有没有...更进一步？', position: 'top-right' },
    containerClass: 'absolute right-[12%] top-[1950px] w-[40vw] max-w-[500px]',
  },
  {
    id: 'photo-7',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '沉思',
    dialog: { text: 'rn：（停顿）有一天下雨，我们共撑一把伞走回家。雨很大，伞很小，我们贴得很近...', position: 'bottom-left' },
    containerClass: 'absolute left-[18%] top-[2400px] w-[38vw] max-w-[480px]',
  },
  {
    id: 'photo-8',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '雨中共伞',
    dialog: { text: 'fn：看起来你们真的很喜欢彼此。', position: 'top-right' },
    containerClass: 'absolute right-[16%] top-[2850px] w-[36vw] max-w-[460px]',
  },
  {
    id: 'photo-9',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '温暖时光',
    dialog: { text: 'rn：（苦笑）其实...我们没有在一起。', position: 'bottom-left' },
    containerClass: 'absolute left-[14%] top-[3300px] w-[40vw] max-w-[500px]',
  },
  {
    id: 'photo-10',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '结局',
    dialogs: [
      { text: '她后来说，她把我当作最好的朋友。', position: 'top-left' },
      { text: 'fn：对不起...', position: 'bottom-right' },
      { text: 'rn：没关系。有些故事，不需要结局也很美好。', position: 'bottom-left' },
    ],
    containerClass: 'absolute right-[14%] top-[3750px] w-[42vw] max-w-[520px]',
  },
]

export default function FinalStoryLayout() {
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null)
  const [dialogIndex, setDialogIndex] = useState(0)

  // 处理照片点击
  const handlePhotoClick = (photoId: string) => {
    const photo = storyPhotos.find(p => p.id === photoId)
    if (!photo) return

    const dialogs = photo.dialogs || (photo.dialog ? [photo.dialog] : [])
    
    if (activePhotoId === photoId) {
      if (dialogIndex < dialogs.length - 1) {
        setDialogIndex(dialogIndex + 1)
      } else {
        setActivePhotoId(null)
        setDialogIndex(0)
      }
    } else {
      setActivePhotoId(photoId)
      setDialogIndex(0)
    }
  }

  // 键盘支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePhotoId) {
        setActivePhotoId(null)
        setDialogIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhotoId])

  // 获取当前对话框
  const activePhoto = storyPhotos.find(p => p.id === activePhotoId)
  const dialogs = activePhoto?.dialogs || (activePhoto?.dialog ? [activePhoto.dialog] : [])
  const currentDialog = dialogs[dialogIndex]

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* 顶部标题 */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
              📖 故事时间线
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              点击照片或周围区域，探索完整故事
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 md:px-6 md:py-3 bg-pink-500 hover:bg-pink-600 
                     text-white rounded-full shadow-lg font-medium transition-all text-sm md:text-base"
          >
            ← 返回
          </button>
        </div>
      </motion.header>

      {/* 主内容区 - 相对定位容器 */}
      <main className="relative pt-24 pb-12" style={{ minHeight: '4200px' }}>
        {storyPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isActive={activePhotoId === photo.id}
            onClick={() => handlePhotoClick(photo.id)}
            index={index}
          />
        ))}

        {/* 对话框层 */}
        <AnimatePresence mode="wait">
          {currentDialog && activePhoto && (
            <DialogBubble
              key={`${activePhotoId}-${dialogIndex}`}
              dialog={currentDialog}
              photoId={activePhotoId!}
              currentIndex={dialogIndex}
              totalCount={dialogs.length}
              onClose={() => {
                setActivePhotoId(null)
                setDialogIndex(0)
              }}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40
                 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl
                 border-2 border-pink-200"
      >
        <p className="text-xs md:text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="animate-pulse">💡</span>
          向下滚动 · 点击照片或周围区域 · 按 Esc 关闭
        </p>
      </motion.div>
    </div>
  )
}

// 照片卡片组件
interface PhotoCardProps {
  photo: typeof storyPhotos[0]
  isActive: boolean
  onClick: () => void
  index: number
}

function PhotoCard({ photo, isActive, onClick, index }: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${photo.containerClass} group`}
      style={{ zIndex: isActive ? 100 : 10 + index }}
    >
      {/* 扩大的可点击区域 */}
      <div
        onClick={onClick}
        className="relative cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`${photo.alt}，点击查看故事`}
      >
        {/* 悬浮边框效果 */}
        <div 
          className="absolute -inset-8 border-2 border-transparent 
                   group-hover:border-pink-300/50 group-hover:bg-pink-50/20
                   transition-all rounded-3xl"
        />

        {/* 照片容器 */}
        <motion.div
          className="relative bg-white p-[4px] rounded-xl shadow-lg overflow-hidden"
          style={{ aspectRatio: '4/3' }}
          whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
          animate={{
            scale: isActive ? 1.05 : 1,
            boxShadow: isActive 
              ? '0 0 0 4px rgba(236, 72, 153, 0.6)'
              : '0 8px 16px rgba(0,0,0,0.1)',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 90vw, 50vw"
              priority={index < 3}
            />
          </div>
        </motion.div>

        {/* 悬浮提示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="bg-pink-500/95 text-white px-5 py-3 rounded-xl 
                        text-sm font-semibold shadow-2xl backdrop-blur-sm">
            💬 点击查看故事
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// 对话框组件
interface DialogBubbleProps {
  dialog: { text: string; position: string }
  photoId: string
  currentIndex: number
  totalCount: number
  onClose: () => void
}

function DialogBubble({ dialog, photoId, currentIndex, totalCount, onClose }: DialogBubbleProps) {
  useEffect(() => {
    const el = document.getElementById(`dialog-${photoId}`)
    if (el) {
      gsap.fromTo(el,
        { scale: 0, opacity: 0, rotate: -5 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [photoId, currentIndex])

  // 计算位置类
  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-4',
    'bottom-right': 'top-full right-0 mt-4',
    'top-left': 'bottom-full left-0 mb-4',
    'top-right': 'bottom-full right-0 mb-4',
  }[dialog.position] || 'top-full left-0 mt-4'

  return (
    <motion.div
      id={`dialog-${photoId}`}
      initial={{ scale: 0, opacity: 0 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
      className={`absolute ${positionClasses} z-[200] max-w-md`}
      style={{
        // 定位到对应的照片
        ...getPhotoPosition(photoId),
      }}
    >
      <div className="relative bg-gradient-to-br from-pink-300 to-pink-400 
                    backdrop-blur-md rounded-2xl shadow-2xl p-5 
                    border-2 border-white/50 min-w-[280px] max-w-[420px]">
        <p className="text-sm md:text-base text-gray-900 leading-relaxed font-medium pr-8">
          {dialog.text}
        </p>

        {/* 进度指示器 */}
        {totalCount > 1 && (
          <div className="flex gap-2 mt-4 justify-center">
            {Array.from({ length: totalCount }).map((_, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-white w-8 shadow-lg' 
                    : 'bg-white/40 w-2.5'
                }`}
              />
            ))}
          </div>
        )}

        {/* 关闭按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute -top-3 -right-3 w-10 h-10 
                   bg-gradient-to-br from-pink-500 to-pink-600 
                   text-white rounded-full flex items-center justify-center 
                   shadow-lg hover:scale-110 transition-transform font-bold text-lg
                   border-2 border-white z-10"
          aria-label="关闭对话框"
        >
          ✕
        </button>
      </div>
    </motion.div>
  )
}

// 获取照片位置
function getPhotoPosition(photoId: string) {
  const photo = storyPhotos.find(p => p.id === photoId)
  if (!photo) return {}

  // 提取位置信息
  const match = photo.containerClass.match(/(left|right)-\[([^\]]+)\]\s+top-\[([^\]]+)\]/)
  if (!match) return {}

  const [, side, horizontal, top] = match
  return {
    [side]: horizontal,
    top,
  }
}

