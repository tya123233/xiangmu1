'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface DialogBox {
  id: string
  content: string
  position: {
    left: number
    top: number
    width: number
    height: number
  }
}

interface Photo {
  id: string
  imageUrl: string
  position: {
    left: number
    top: number
    width: number
    height: number
  }
  zIndex: number
}

const photos: Photo[] = [
  // 顶部横向照片
  { 
    id: 'photo-1', 
    imageUrl: '/images/office/office-1.jpg',
    position: { left: 20.8, top: 0.8, width: 859, height: 235 },
    zIndex: 3,
  },
  // 第2张
  { 
    id: 'photo-2', 
    imageUrl: '/images/office/office-2.jpg',
    position: { left: 31.2, top: 2.9, width: 581, height: 440 },
    zIndex: 5,
  },
  // 第3张
  { 
    id: 'photo-3', 
    imageUrl: '/images/office/office-3.jpg',
    position: { left: 38.6, top: 6.1, width: 375, height: 448 },
    zIndex: 7,
  },
  // 第4张
  { 
    id: 'photo-4', 
    imageUrl: '/images/office/office-4.jpg',
    position: { left: 14.1, top: 10.1, width: 452, height: 689 },
    zIndex: 6,
  },
  // 第5张
  { 
    id: 'photo-5', 
    imageUrl: '/images/office/office-5.jpg',
    position: { left: 51.6, top: 10.1, width: 542, height: 410 },
    zIndex: 8,
  },
  // 第6张
  { 
    id: 'photo-6', 
    imageUrl: '/images/office/office-6.jpg',
    position: { left: 12.8, top: 14.7, width: 622, height: 572 },
    zIndex: 4,
  },
  // 第7张
  { 
    id: 'photo-7', 
    imageUrl: '/images/office/office-7.jpg',
    position: { left: 25.5, top: 20.4, width: 714, height: 666 },
    zIndex: 9,
  },
  // 第8张
  { 
    id: 'photo-8', 
    imageUrl: '/images/office/office-8.jpg',
    position: { left: 29.7, top: 25.1, width: 851, height: 625 },
    zIndex: 10,
  },
  // 第9张
  { 
    id: 'photo-9', 
    imageUrl: '/images/office/office-9.jpg',
    position: { left: 33.0, top: 29.4, width: 490, height: 628 },
    zIndex: 11,
  },
  // 第10张
  { 
    id: 'photo-10', 
    imageUrl: '/images/office/office-10.jpg',
    position: { left: 24.0, top: 34.5, width: 833, height: 529 },
    zIndex: 12,
  },
]

const dialogBoxes: DialogBox[] = [
  {
    id: 'dialog-1',
    content: 'fn：那你们是怎么遇见的？',
    position: { left: 5, top: 1.5, width: 320, height: 80 }
  },
  {
    id: 'dialog-2',
    content: 'rn：我们是同一天入职的。你知道那种...第一天上班的紧张感吗？',
    position: { left: 65, top: 4, width: 360, height: 100 }
  },
  {
    id: 'dialog-3',
    content: 'fn：然后呢？',
    position: { left: 8, top: 8.5, width: 280, height: 70 }
  },
  {
    id: 'dialog-4',
    content: 'rn：然后...就是工作啊。她坐在斜对角，有时候我会看到她托着下巴思考的样子。',
    position: { left: 55, top: 12, width: 400, height: 120 }
  },
  {
    id: 'dialog-5',
    content: 'fn：听起来你注意到很多细节。',
    position: { left: 10, top: 16, width: 340, height: 80 }
  },
  {
    id: 'dialog-6',
    content: 'rn：有一次我们一起去吃冰激凌，她坚持要拍我舔冰激凌的样子，说我像只小猫。',
    position: { left: 58, top: 19, width: 380, height: 110 }
  },
  {
    id: 'dialog-7',
    content: 'fn：你们有没有...更进一步？',
    position: { left: 12, top: 23, width: 300, height: 75 }
  },
  {
    id: 'dialog-8',
    content: 'rn：（停顿）有一天下雨，我们共撑一把伞走回家。雨很大，伞很小，我们贴得很近...',
    position: { left: 52, top: 27, width: 420, height: 130 }
  },
  {
    id: 'dialog-9',
    content: 'fn：看起来你们真的很喜欢彼此。',
    position: { left: 8, top: 32, width: 340, height: 80 }
  },
  {
    id: 'dialog-10',
    content: 'rn：（苦笑）其实...我们没有在一起。',
    position: { left: 55, top: 36, width: 380, height: 90 }
  },
]

export default function VerticalStoryLayout() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="relative w-full max-w-[600px] aspect-[1440/16079] bg-white/30 backdrop-blur-sm rounded-lg shadow-2xl">
        {/* 照片层 */}
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="absolute cursor-pointer overflow-hidden"
            style={{
              left: `${photo.position.left}%`,
              top: `${photo.position.top}%`,
              width: `${(photo.position.width / 1440) * 100}%`,
              height: `${(photo.position.height / 16079) * 100}%`,
              zIndex: photo.zIndex,
            }}
            onClick={() => {}}
            whileHover={{
              scale: 1.03,
              zIndex: 100,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 
            }}
          >
            {/* 照片主体 - 细白色边框 */}
            <div className="relative w-full h-full bg-white p-[3px] shadow-lg">
              <div className="relative w-full h-full overflow-hidden bg-gray-100">
                <Image
                  src={photo.imageUrl}
                  alt={`Photo ${photo.id}`}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* 对话框层 */}
        {dialogBoxes.map((dialog, index) => (
          <motion.div
            key={dialog.id}
            className="absolute bg-pink-300/80 backdrop-blur-sm rounded-lg shadow-md p-3"
            style={{
              left: `${dialog.position.left}%`,
              top: `${dialog.position.top}%`,
              width: `${(dialog.position.width / 1440) * 100}%`,
              minHeight: `${(dialog.position.height / 16079) * 100}%`,
              zIndex: 50,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.5 + index * 0.15 
            }}
          >
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
              {dialog.content}
            </p>
          </motion.div>
        ))}

        {/* 返回按钮 */}
        <motion.button
          onClick={() => window.history.back()}
          className="fixed top-8 left-8 z-50 px-6 py-3 bg-white hover:bg-gray-50 rounded-full shadow-lg font-medium text-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← 返回主页
        </motion.button>

        {/* 标题 */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-40 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            故事时间线
          </h1>
          <p className="text-sm text-gray-600">
            滚动查看完整故事
          </p>
        </div>
      </div>
    </div>
  )
}



