'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { joinersScenes } from '@/data/joiners-data'
import JoinersGrid from './JoinersGrid'
import JoinersFreeGrid from './JoinersFreeGrid'
import JoinersDetailView from './JoinersDetailView'

/**
 * Joiners 主容器组件
 * 管理场景切换和详情视图的显示/隐藏
 * 使用 AnimatePresence 确保共享元素过渡正常工作
 */
export default function JoinersContainer() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null)
  const [isFreeLayout, setIsFreeLayout] = useState(true) // 默认使用 Figma 自由布局

  const currentScene = joinersScenes[currentSceneIndex]

  // 处理面板点击
  const handlePanelClick = (panelId: string) => {
    setSelectedPanelId(panelId)
  }

  // 关闭详情视图
  const handleClose = () => {
    setSelectedPanelId(null)
  }

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPanelId) {
        handleClose()
      } else if (!selectedPanelId) {
        if (e.key === 'ArrowRight') {
          setCurrentSceneIndex((prev) =>
            prev < joinersScenes.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === 'ArrowLeft') {
          setCurrentSceneIndex((prev) => (prev > 0 ? prev - 1 : prev))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPanelId])

  // 切换到下一个场景
  const nextScene = () => {
    if (currentSceneIndex < joinersScenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1)
    }
  }

  // 切换到上一个场景
  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* 主标题 */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          Joiners 拼贴画廊
        </h1>
        <p className="text-gray-600 text-lg">
          灵感来自 David Hockney • 点击任意面板查看详情
        </p>
      </div>

      {/* 拼贴网格 */}
      <div className="pt-32 pb-24">
        {isFreeLayout ? (
          <JoinersFreeGrid scene={currentScene} onPanelClick={handlePanelClick} />
        ) : (
          <JoinersGrid scene={currentScene} onPanelClick={handlePanelClick} />
        )}
      </div>

      {/* 场景导航 */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-6 z-20">
        {/* 上一个按钮 */}
        <button
          onClick={prevScene}
          disabled={currentSceneIndex === 0}
          className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← 上一个
        </button>

        {/* 场景指示器 */}
        <div className="flex gap-2">
          {joinersScenes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSceneIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSceneIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`切换到场景 ${index + 1}`}
            />
          ))}
        </div>

        {/* 下一个按钮 */}
        <button
          onClick={nextScene}
          disabled={currentSceneIndex === joinersScenes.length - 1}
          className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          下一个 →
        </button>
      </div>

      {/* 详情视图 - 使用 AnimatePresence 处理进入/退出动画 */}
      <AnimatePresence>
        {selectedPanelId && (
          <JoinersDetailView
            scene={currentScene}
            selectedPanelId={selectedPanelId}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* 使用说明和布局切换 */}
      <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-sm text-gray-600 max-w-xs z-10">
        <h3 className="font-semibold mb-2">操作说明</h3>
        <ul className="space-y-1 mb-4">
          <li>• 点击任意面板查看完整场景</li>
          <li>• 使用左右箭头键切换场景</li>
          <li>• 按 ESC 键关闭详情视图</li>
        </ul>
        
        {/* 布局切换按钮 */}
        <div className="pt-3 border-t border-gray-300">
          <button
            onClick={() => setIsFreeLayout(!isFreeLayout)}
            className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            {isFreeLayout ? '切换到网格布局' : '切换到 Figma 布局'}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {isFreeLayout ? '当前：Figma 精确布局' : '当前：网格布局'}
          </p>
        </div>
      </div>
    </div>
  )
}

