'use client'

interface NavigationControlsProps {
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
}

export default function NavigationControls({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationControlsProps) {
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-5 z-[900]">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrevious()
        }}
        disabled={!canGoPrevious}
        className="nav-btn w-12 h-12 rounded-full border-2 border-white/50 bg-white/10 
                   text-white flex items-center justify-center transition-all duration-300
                   backdrop-blur-glass hover:bg-white/20 hover:border-white/80 hover:scale-110
                   active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed 
                   disabled:pointer-events-none"
        aria-label="上一页"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        disabled={!canGoNext}
        className="nav-btn w-12 h-12 rounded-full border-2 border-white/50 bg-white/10 
                   text-white flex items-center justify-center transition-all duration-300
                   backdrop-blur-glass hover:bg-white/20 hover:border-white/80 hover:scale-110
                   active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed
                   disabled:pointer-events-none"
        aria-label="下一页"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}








