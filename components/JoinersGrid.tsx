'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { JoinerScene } from '@/data/joiners-data'

interface JoinersGridProps {
  scene: JoinerScene
  onPanelClick: (panelId: string) => void
}

/**
 * Joiners 拼贴网格组件
 * 显示多个小图片面板组成的拼贴画
 */
export default function JoinersGrid({ scene, onPanelClick }: JoinersGridProps) {
  const { panels, gridColumns = 4, gridRows = 3 } = scene

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div
        className="relative w-full max-w-6xl"
        style={{
          aspectRatio: `${gridColumns} / ${gridRows}`,
        }}
      >
        {/* 使用 CSS Grid 布局 */}
        <div
          className="grid gap-2 w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          }}
        >
          {panels.map((panel) => (
            <motion.div
              key={panel.id}
              layoutId={panel.id}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              style={{
                gridColumn: panel.gridColumn,
                gridRow: panel.gridRow,
                rotate: panel.rotation || 0,
                x: panel.offsetX || 0,
                y: panel.offsetY || 0,
              }}
              onClick={() => onPanelClick(panel.id)}
              whileHover={{
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 使用 Next.js Image 组件 */}
              <Image
                src={panel.imageUrl}
                alt={`${scene.title} - Panel ${panel.id}`}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 25vw, 20vw"
                priority={false}
              />

              {/* 半透明遮罩，增强拼贴感 */}
              <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none" />

              {/* 边框效果 */}
              <div className="absolute inset-0 border-2 border-white/20 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* 场景标题 */}
        <motion.div
          className="absolute -bottom-16 left-0 right-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {scene.title}
          </h2>
          <p className="text-gray-600">{scene.description}</p>
        </motion.div>
      </div>
    </div>
  )
}

