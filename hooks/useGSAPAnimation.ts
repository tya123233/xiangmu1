'use client'

import { useCallback } from 'react'
import { gsap } from 'gsap'

interface AnimatePanelOptions {
  currentIndex: number
  nextIndex: number
  direction: 'up' | 'down'
  onComplete?: () => void
}

export function useGSAPAnimation() {
  const animatePanel = useCallback(({
    currentIndex,
    nextIndex,
    direction,
    onComplete,
  }: AnimatePanelOptions) => {
    const currentPanel = document.querySelector(`[data-panel-index="${currentIndex}"]`)
    const nextPanel = document.querySelector(`[data-panel-index="${nextIndex}"]`)
    
    if (!nextPanel) return
    
    // 创建动画时间线
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      },
    })
    
    // 淡出当前面板
    if (currentPanel && currentPanel !== nextPanel) {
      tl.to(currentPanel, {
        opacity: 0,
        y: direction === 'down' ? -50 : 50,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          currentPanel.classList.remove('active')
        },
      })
    }
    
    // 淡入新面板
    tl.fromTo(
      nextPanel,
      {
        opacity: 0,
        y: direction === 'down' ? 50 : -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        onStart: () => {
          nextPanel.classList.add('active')
        },
      },
      '-=0.3' // 与上一个动画重叠 0.3 秒
    )
    
    // 内容元素的交错动画
    const contentElements = nextPanel.querySelectorAll(
      '.panel-title, .panel-text, .panel-image'
    )
    
    if (contentElements.length > 0) {
      tl.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.4'
      )
    }
  }, [])
  
  return { animatePanel }
}








