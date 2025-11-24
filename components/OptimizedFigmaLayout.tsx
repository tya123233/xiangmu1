'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'

/**
 * OptimizedFigmaLayout - 优化的 Figma 布局
 * 
 * 改进：
 * - 使用视口百分比而非固定像素
 * - 响应式缩放和布局
 * - 扩大的可点击区域
 * - 精确的对话框位置
 * - 优化滚动体验
 */

// 照片数据（百分比位置）
const photos = [
  {
    id: 'photo-1',
    image: '/images/office-clock.png',
    alt: '办公室时钟',
    style: { left: '20%', top: '5vh', width: '60vw', height: '15vh' },
    clickArea: { left: '10%', top: '2vh', width: '80vw', height: '20vh' },
    zIndex: 3,
    dialogId: 'dialog-1',
  },
  {
    id: 'photo-2',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '初次相遇',
    style: { left: '55%', top: '18vh', width: '30vw', height: '25vh' },
    clickArea: { left: '50%', top: '15vh', width: '40vw', height: '32vh' },
    zIndex: 5,
    dialogId: 'dialog-2',
  },
  {
    id: 'photo-3',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '工作中的她',
    style: { left: '15%', top: '35vh', width: '25vw', height: '28vh' },
    clickArea: { left: '10%', top: '32vh', width: '35vw', height: '35vh' },
    zIndex: 7,
    dialogId: 'dialog-3',
  },
  {
    id: 'photo-4',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '咖啡时光',
    style: { left: '60%', top: '55vh', width: '28vw', height: '35vh' },
    clickArea: { left: '55%', top: '52vh', width: '38vw', height: '42vh' },
    zIndex: 6,
    dialogId: 'dialog-4',
  },
  {
    id: 'photo-5',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '快乐时光',
    style: { left: '10%', top: '80vh', width: '32vw', height: '30vh' },
    clickArea: { left: '5%', top: '77vh', width: '42vw', height: '37vh' },
    zIndex: 8,
    dialogId: 'dialog-5',
  },
  {
    id: 'photo-6',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '深情回忆',
    style: { left: '58%', top: '100vh', width: '30vw', height: '28vh' },
    clickArea: { left: '53%', top: '97vh', width: '40vw', height: '35vh' },
    zIndex: 9,
    dialogId: 'dialog-6',
  },
  {
    id: 'photo-7',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '沉思',
    style: { left: '15%', top: '125vh', width: '28vw', height: '32vh' },
    clickArea: { left: '10%', top: '122vh', width: '38vw', height: '39vh' },
    zIndex: 10,
    dialogId: 'dialog-7',
  },
  {
    id: 'photo-8',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '雨中共伞',
    style: { left: '60%', top: '148vh', width: '28vw', height: '30vh' },
    clickArea: { left: '55%', top: '145vh', width: '38vw', height: '37vh' },
    zIndex: 11,
    dialogId: 'dialog-8',
  },
  {
    id: 'photo-9',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '温暖时光',
    style: { left: '12%', top: '170vh', width: '30vw', height: '28vh' },
    clickArea: { left: '7%', top: '167vh', width: '40vw', height: '35vh' },
    zIndex: 12,
    dialogId: 'dialog-9',
  },
  {
    id: 'photo-10',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '结局',
    style: { left: '55%', top: '192vh', width: '32vw', height: '30vh' },
    clickArea: { left: '50%', top: '189vh', width: '42vw', height: '37vh' },
    zIndex: 13,
    dialogId: 'dialog-10',
  },
]

// 对话框数据
const dialogs: Record<string, { text: string; position: any; order: number }[]> = {
  'dialog-1': [
    { text: 'fn：那你们是怎么遇见的？', position: { left: '5%', top: '12vh' }, order: 1 },
  ],
  'dialog-2': [
    { text: 'rn：我们是同一天入职的。你知道那种...第一天上班的紧张感吗？', position: { left: '65%', top: '28vh' }, order: 1 },
  ],
  'dialog-3': [
    { text: 'fn：然后呢？', position: { left: '8%', top: '48vh' }, order: 1 },
    { text: 'rn：然后...就是工作啊。她坐在斜对角，有时候我会看到她托着下巴思考的样子。', position: { left: '55%', top: '52vh' }, order: 2 },
  ],
  'dialog-4': [
    { text: 'fn：听起来你注意到很多细节。', position: { left: '10%', top: '72vh' }, order: 1 },
  ],
  'dialog-5': [
    { text: 'rn：有一次我们一起去吃冰激凌，她坚持要拍我舔冰激凌的样子，说我像只小猫。', position: { left: '58%', top: '92vh' }, order: 1 },
  ],
  'dialog-6': [
    { text: 'fn：你们有没有...更进一步？', position: { left: '12%', top: '115vh' }, order: 1 },
  ],
  'dialog-7': [
    { text: 'rn：（停顿）有一天下雨，我们共撑一把伞走回家。雨很大，伞很小，我们贴得很近...', position: { left: '52%', top: '138vh' }, order: 1 },
  ],
  'dialog-8': [
    { text: 'fn：看起来你们真的很喜欢彼此。', position: { left: '8%', top: '162vh' }, order: 1 },
  ],
  'dialog-9': [
    { text: 'rn：（苦笑）其实...我们没有在一起。', position: { left: '55%', top: '182vh' }, order: 1 },
  ],
  'dialog-10': [
    { text: '她后来说，她把我当作最好的朋友。', position: { left: '12%', top: '205vh' }, order: 1 },
    { text: 'fn：对不起...', position: { left: '60%', top: '210vh' }, order: 2 },
    { text: 'rn：没关系。有些故事，不需要结局也很美好。', position: { left: '30%', top: '218vh' }, order: 3 },
  ],
}

export default function OptimizedFigmaLayout() {
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null)
  const [dialogIndex, setDialogIndex] = useState(0)

  // 处理照片点击
  const handlePhotoClick = useCallback((photoId: string, dialogId: string) => {
    const photoDialogs = dialogs[dialogId] || []
    
    if (activePhotoId === photoId) {
      if (dialogIndex < photoDialogs.length - 1) {
        setDialogIndex(dialogIndex + 1)
      } else {
        setActivePhotoId(null)
        setDialogIndex(0)
      }
    } else {
      setActivePhotoId(photoId)
      setDialogIndex(0)
    }
  }, [activePhotoId, dialogIndex])

  // 键盘支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhotoId(null)
        setDialogIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentDialogs = activePhotoId 
    ? dialogs[photos.find(p => p.id === activePhotoId)?.dialogId || ''] || []
    : []
  const currentDialog = currentDialogs[dialogIndex]

  return (
    <div className="relative w-full min-h-[230vh] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* 顶部标题 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📖 故事时间线
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              点击照片或周围区域，探索这段故事
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white 
                     rounded-full shadow-lg font-medium transition-all"
          >
            ← 返回
          </button>
        </div>
      </motion.div>

      {/* 主内容 */}
      <div className="relative pt-24 pb-12">
        {/* 照片层 */}
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            {/* 扩大的可点击区域 */}
            <div
              className="fixed cursor-pointer group"
              style={{
                ...photo.clickArea,
                zIndex: activePhotoId === photo.id ? 100 : photo.zIndex,
              }}
              onClick={() => handlePhotoClick(photo.id, photo.dialogId)}
            >
              {/* 悬浮提示边框 */}
              <div className="absolute inset-0 border-2 border-transparent 
                            group-hover:border-pink-300/50 transition-all rounded-2xl" />

              {/* 照片本体 */}
              <motion.div
                className="absolute bg-white p-[3px] shadow-xl rounded-lg overflow-hidden pointer-events-none"
                style={photo.style}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                animate={{
                  scale: activePhotoId === photo.id ? 1.05 : 1,
                  boxShadow: activePhotoId === photo.id 
                    ? '0 0 0 4px rgba(236, 72, 153, 0.6)'
                    : '0 8px 16px rgba(0,0,0,0.1)',
                }}
              >
                <div className="relative w-full h-full pointer-events-none">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 90vw, 40vw"
                    priority={index < 3}
                  />
                </div>
              </motion.div>

              {/* 悬浮文字提示 */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              >
                <div className="bg-pink-500/95 text-white px-5 py-3 rounded-xl 
                              text-sm font-semibold shadow-2xl backdrop-blur-sm">
                  💬 点击查看故事
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* 对话框 */}
        <AnimatePresence>
          {currentDialog && (
            <DialogComponent
              dialog={currentDialog}
              currentIndex={dialogIndex}
              totalCount={currentDialogs.length}
              onClose={() => {
                setActivePhotoId(null)
                setDialogIndex(0)
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40
                 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl
                 border-2 border-pink-200"
      >
        <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="animate-pulse">💡</span>
          向下滚动 · 点击照片或周围区域 · 按 Esc 关闭
        </p>
      </motion.div>
    </div>
  )
}

// 对话框组件
function DialogComponent({ dialog, currentIndex, totalCount, onClose }: any) {
  useEffect(() => {
    const el = document.getElementById('current-dialog')
    if (el) {
      gsap.fromTo(el,
        { scale: 0, opacity: 0, rotate: -5 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [dialog])

  return (
    <motion.div
      id="current-dialog"
      initial={{ scale: 0, opacity: 0 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
      className="fixed bg-gradient-to-br from-pink-300 to-pink-400 
               backdrop-blur-md rounded-2xl shadow-2xl p-5 z-[200] 
               border-2 border-white/50"
      style={{
        ...dialog.position,
        maxWidth: '420px',
        minWidth: '280px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-sm md:text-base text-gray-900 leading-relaxed font-medium">
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
        onClick={onClose}
        className="absolute -top-3 -right-3 w-10 h-10 
                 bg-gradient-to-br from-pink-500 to-pink-600 
                 text-white rounded-full flex items-center justify-center 
                 shadow-lg hover:scale-110 transition-transform font-bold text-lg
                 border-2 border-white"
      >
        ✕
      </button>
    </motion.div>
  )
}

