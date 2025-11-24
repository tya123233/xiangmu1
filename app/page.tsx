import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* 主标题 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            交互式数字叙事
          </h1>
          <p className="text-xl text-gray-600">
            探索现代 Web 技术驱动的视觉体验
          </p>
        </div>

        {/* 项目卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 交互式故事 */}
          <Link
            href="/story"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                交互式故事
              </h2>
              <p className="text-gray-600 mb-4">
                全屏面板展示，流畅的 GSAP 动画，支持多种交互方式。类似漫画的沉浸式阅读体验。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  GSAP 3.12.5
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                  Hammer.js
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full">
                  React 19
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </Link>

          {/* Joiners 拼贴 */}
          <Link
            href="/joiners"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Joiners 拼贴
              </h2>
              <p className="text-gray-600 mb-4">
                灵感来自 David Hockney，使用 Framer Motion layoutId 实现的共享元素过渡动画。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                  Framer Motion
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                  layoutId
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                  AnimatePresence
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </Link>

          {/* 故事时间线 */}
          <Link
            href="/story-timeline"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                故事时间线
              </h2>
              <p className="text-gray-600 mb-4">
                竖版滚动布局，照片与对话框交织，展现办公室故事片段。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full">
                  竖版布局
                </span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 text-sm rounded-full">
                  对话框
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                  Figma 导入
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* 技术栈 */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">核心技术栈</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 font-medium">
              Next.js 15.1.8
            </span>
            <span className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 font-medium">
              React 19.0.0
            </span>
            <span className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 font-medium">
              TypeScript 5.6.3
            </span>
            <span className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 font-medium">
              Tailwind CSS 3.4.17
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

