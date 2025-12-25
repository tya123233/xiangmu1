'use client'

import dynamic from 'next/dynamic'

const GestureCardGallery = dynamic(
  () => import('@/components/memorial/GestureCardGallery'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading Gallery...</p>
      </div>
    )
  }
)

export default function MemorialGalleryPage() {
  return <GestureCardGallery />
}
