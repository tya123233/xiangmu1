'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Chapter {
  id: number
  title: string
  panelIndex: number
  icon?: string
}

interface ChapterMenuProps {
  chapters: Chapter[]
  currentPanelIndex: number
  onChapterClick: (panelIndex: number) => void
}

export default function ChapterMenu({
  chapters,
  currentPanelIndex,
  onChapterClick,
}: ChapterMenuProps) {
  const getCurrentChapter = () => {
    // 遍历章节，找到当前面板对应的章节
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentPanelIndex >= chapters[i].panelIndex) {
        return chapters[i]
      }
    }
    return null
  }

  const currentChapter = getCurrentChapter()
  
  // 调试信息
  console.log('当前面板索引:', currentPanelIndex, '当前章节:', currentChapter?.title)

  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[950]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    >
      {/* 始终显示的章节导航 */}
      <nav className="flex flex-col items-center gap-6">
        {chapters.map((chapter, index) => {
          const isActive = currentChapter?.id === chapter.id
          return (
            <motion.button
              key={chapter.id}
              onClick={(e) => {
                e.stopPropagation()
                onChapterClick(chapter.panelIndex)
              }}
              className="group relative flex flex-col items-center"
              aria-label={`第${chapter.id}章：${chapter.title}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 章节数字圆圈 */}
              <motion.div
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  font-bold text-xl shadow-lg
                `}
                animate={{
                  backgroundColor: isActive ? '#000000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#000000',
                  scale: isActive ? 1.25 : 1,
                  boxShadow: isActive 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  border: isActive ? 'none' : '2px solid #d1d5db',
                }}
              >
                {chapter.id}
              </motion.div>

              {/* 章节标题提示（悬停显示） */}
              <motion.div
                className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg
                          whitespace-nowrap text-sm font-medium pointer-events-none shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 20,
                  backgroundColor: isActive ? '#000000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#000000',
                }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  border: isActive ? 'none' : '1px solid #d1d5db',
                }}
              >
                {chapter.title}
                {/* 小三角箭头 */}
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
                  animate={{
                    borderLeftColor: isActive ? '#000000' : '#ffffff',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8"
                    style={{
                      borderLeftColor: isActive ? '#000000' : '#ffffff',
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* 连接线 */}
              {chapter.id < chapters.length && (
                <motion.div
                  className="w-1 h-8 mt-3 rounded-full"
                  animate={{
                    backgroundColor: isActive ? '#000000' : '#d1d5db',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          )
        })}
      </nav>
    </motion.div>
  )
}

