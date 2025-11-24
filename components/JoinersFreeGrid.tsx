'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { JoinerScene } from '@/data/joiners-data'
import { getSceneLayout } from '@/data/joiners-layout'

interface JoinersFreeGridProps {
  scene: JoinerScene
  onPanelClick: (panelId: string) => void
}

export default function JoinersFreeGrid({ scene, onPanelClick }: JoinersFreeGridProps) {
  const { panels } = scene
  
  // 获取场景的精确布局配置
  const sceneLayout = getSceneLayout(scene.id)

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8">
      <div className="relative w-full max-w-[1200px] aspect-[3573/3360]">
        {panels.map((panel, index) => {
          const layout = sceneLayout.find(l => l.panelId === panel.id)
          
          if (!layout) {
            console.warn(`No layout found for panel ${panel.id}`)
            return null
          }
          
          return (
            <motion.div
              key={panel.id}
              layoutId={panel.id}
              className="absolute cursor-pointer overflow-hidden shadow-2xl hover:shadow-3xl"
              style={{
                left: `${layout.left}%`,
                top: `${layout.top}%`,
                width: `${(layout.width / 3573) * 100}%`,  // 转换为容器百分比
                height: `${(layout.height / 3360) * 100}%`, // 转换为容器百分比
                rotate: layout.rotation,
                zIndex: layout.zIndex,
              }}
              onClick={() => onPanelClick(panel.id)}
              whileHover={{
                scale: 1.05,
                zIndex: 100,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
            >
              {/* 照片主体 - 白色边框 */}
              <div className="relative w-full h-full bg-white p-[3px]">
                <div className="relative w-full h-full overflow-hidden bg-gray-100">
                  <Image
                    src={panel.imageUrl}
                    alt={`${scene.title} - Panel ${panel.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 900px"
                    priority={index < 4}
                  />
                </div>
              </div>
              
              {/* 照片质感效果 */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.08]" 
                style={{ 
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.08) 100%)'
                }} 
              />
              
              {/* 边缘磨损效果 */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  background: `radial-gradient(circle at ${(index * 37) % 100}% ${(index * 53) % 100}%, transparent 65%, rgba(0,0,0,0.4) 100%)`
                }}
              />
            </motion.div>
          )
        })}
        
        {/* 场景标题 */}
        <div className="absolute -bottom-16 left-0 right-0 text-center">
          <h2 className="text-3xl font-light text-gray-700 tracking-wide">
            {scene.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2 italic">
            {scene.description}
          </p>
        </div>
      </div>
    </div>
  )
}

