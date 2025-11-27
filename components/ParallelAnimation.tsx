'use client'

import { useEffect, useRef, useState } from 'react'

// 所有路径段配置（完全匹配原始 SVG）
const PATH_SEGMENTS = [
  // 入场直线（原始路径从右到左，用 reverse 实现从左到右动画）
  {
    id: 'entry-line',
    d: 'M68 42.5H0',
    delay: 0,
    duration: 0.8,
    reverse: true,  // 从路径终点(0)向起点(68)画，实现从左向右
  },
  // 上分支（从汇合点向右延伸到 P）
  {
    id: 'upper-branch',
    d: 'M343 13.5003C335 23.167 316.4 42.5003 306 42.5003H248.5C245.167 30.167 229.8 5.30032 195 4.50032C160.2 3.70032 124.167 4.16698 110.5 4.50032C99.1667 6.50042 74.7 16.9006 67.5 42.5003',
    delay: 0.8,
    duration: 1.8,
    reverse: true,  // 从路径终点(67.5)向起点(343)画
  },
  // 下分支
  {
    id: 'lower-branch',
    d: 'M67.5 42C75.1667 52.3333 94.6 73 111 73C127.4 73 177.167 73 200 73C210.667 72.6667 235.1 66 247.5 42',
    delay: 0.8,
    duration: 1.8,
    reverse: false,
  },
  // P 竖线
  {
    id: 'p-stem',
    d: 'M342.411 13.5819C341.363 17.7723 338.669 30.7424 335.479 43.582',
    delay: 2.6,
    duration: 0.5,
    reverse: false,
  },
  // P 环形
  {
    id: 'p-bowl',
    d: 'M335.479 43.582C332.579 55.2549 329.268 66.8199 326.411 71.5819C320.411 81.5819 320.411 -10.4181 342.411 1.58186C364.411 13.5819 383.547 42.582 335.479 43.582Z',
    delay: 3.0,
    duration: 0.6,
    reverse: false,
  },
  // arallel 文字
  {
    id: 'text',
    d: 'M398.411 41.082C387.911 44.4154 369.311 55.582 378.911 73.582C390.911 96.082 417.411 33.082 398.911 42.082C383.411 54.082 400.911 73.582 402.411 73.582C403.911 73.582 419.911 74.082 425.411 64.082C430.911 54.082 434.411 39.582 433.911 43.582C433.411 47.582 447.911 44.082 444.911 51.082C441.911 58.082 438.411 73.5817 444.911 71.5819C451.411 69.582 459.411 70.582 467.911 62.582C476.411 54.582 473.911 41.082 474.411 43.582C474.911 46.082 489.411 47.082 487.911 50.082C486.411 53.082 478.411 74.5817 485.911 71.5819C491.511 74.782 506.244 65.9154 512.911 61.082C516.411 53.082 525.411 37.882 533.411 41.082C543.411 45.082 523.411 92.582 513.911 62.582C504.411 32.582 551.911 44.082 535.911 61.082C519.911 78.082 553.911 71.582 560.911 64.082C567.911 56.582 594.911 25.582 582.411 25.582C569.911 25.582 557.411 74.5817 567.411 71.5819C577.411 68.582 600.911 62.582 604.411 47.082C607.911 31.582 619.411 12.082 599.411 38.082C583.411 58.882 592.744 69.0819 599.411 71.5819C615.078 65.2486 643.411 49.682 631.411 38.082C616.411 23.582 605.911 104.582 649.411 64.082C692.911 23.582 665.911 23.582 671.911 25.582C677.911 27.582 622.911 88.582 679.911 64.082',
    delay: 3.5,
    duration: 4.5,
    reverse: false,
  },
]

export default function ParallelAnimation() {
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const [pathLengths, setPathLengths] = useState<number[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 计算所有路径长度
    const lengths = pathRefs.current.map(ref => ref?.getTotalLength() || 100)
    setPathLengths(lengths)
    console.log('路径长度:', lengths)
    
    // 短暂延迟后开始动画
    const timer = setTimeout(() => setIsReady(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full flex justify-center items-center bg-white min-h-screen">
      {/* CSS 动画定义 */}
      <style>{`
        ${PATH_SEGMENTS.map((segment, index) => {
          const length = pathLengths[index] || 1000
          const { reverse } = segment
          const startOffset = reverse ? -length : length
          
          return `
            @keyframes draw-${segment.id} {
              from { stroke-dashoffset: ${startOffset}; }
              to { stroke-dashoffset: 0; }
            }
          `
        }).join('\n')}
      `}</style>
      
      <svg 
        viewBox="-10 -20 701 120" 
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="rough-ink" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="4" 
              seed="5"
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="1.8" 
              xChannelSelector="R" 
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.2" result="blurred"/>
            <feComponentTransfer in="blurred">
              <feFuncA type="linear" slope="1.5" intercept="0"/>
            </feComponentTransfer>
          </filter>
        </defs>

        {/* 所有路径 - 使用 inline style 确保初始隐藏 */}
        {PATH_SEGMENTS.map((segment, index) => {
          const length = pathLengths[index] || 1000
          const { delay, duration, reverse } = segment
          const startOffset = reverse ? -length : length
          
          return (
            <path
              key={segment.id}
              id={`path-${segment.id}`}
              ref={el => { pathRefs.current[index] = el }}
              d={segment.d}
              stroke="black"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#rough-ink)"
              style={{
                strokeDasharray: length,
                strokeDashoffset: startOffset,
                animation: isReady 
                  ? `draw-${segment.id} ${duration}s ease-in-out ${delay}s forwards`
                  : 'none',
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
