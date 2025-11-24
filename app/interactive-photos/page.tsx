'use client'

import Link from 'next/link'
import InteractivePhotoGrid from '@/components/InteractivePhotoGrid'
import { interactivePhotosData } from '@/data/interactive-photos-data'

/**
 * 交互式照片示例页面
 * 
 * 展示如何使用 InteractivePhotoGrid 组件
 */
export default function InteractivePhotosPage() {
  return (
    <main className="min-h-screen">
      {/* 页面标题 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            📸 交互式照片故事
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            点击照片查看背后的故事
          </p>
        </div>
      </div>

      {/* 交互式照片网格 */}
      <div className="pt-24">
        <InteractivePhotoGrid
          photos={interactivePhotosData}
          containerHeight="calc(100vh - 6rem)"
          background="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
        />
      </div>

      {/* 返回首页按钮 */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50
                 bg-white/90 backdrop-blur-sm
                 px-6 py-3 rounded-full
                 shadow-lg hover:shadow-xl
                 transition-all duration-300
                 hover:scale-105
                 text-gray-800 font-medium
                 flex items-center gap-2"
      >
        <span>←</span>
        <span>返回首页</span>
      </Link>
    </main>
  )
}

