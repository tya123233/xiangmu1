'use client'

import JoinersGallery from '@/components/JoinersGallery'
import Link from 'next/link'

export default function MemoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/story-timeline"
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← 返回故事
        </Link>
      </div>
      
      <JoinersGallery />
    </main>
  )
}

