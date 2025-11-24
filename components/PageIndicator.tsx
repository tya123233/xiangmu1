'use client'

interface PageIndicatorProps {
  currentPage: number
  totalPages: number
}

export default function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="fixed top-5 right-8 bg-black/50 text-white px-5 py-2.5 rounded-full 
                    text-sm font-semibold backdrop-blur-glass z-[900]">
      <span id="currentPage">{currentPage}</span>
      {' / '}
      <span id="totalPages">{totalPages}</span>
    </div>
  )
}



