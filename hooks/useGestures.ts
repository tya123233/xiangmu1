'use client'

import { useEffect, RefObject } from 'react'

interface GestureCallbacks {
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useGestures(
  elementRef: RefObject<HTMLElement>,
  callbacks: GestureCallbacks
) {
  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof window === 'undefined') return
    
    // 动态导入 Hammer.js（仅在客户端）
    const initHammer = async () => {
      try {
        const Hammer = (await import('hammerjs')).default
        
        const hammer = new Hammer(element)
        
        // 启用垂直和水平滑动
        hammer.get('swipe').set({
          direction: Hammer.DIRECTION_ALL,
        })
        
        // 注册事件监听器
        if (callbacks.onSwipeUp) {
          hammer.on('swipeup', callbacks.onSwipeUp)
        }
        if (callbacks.onSwipeDown) {
          hammer.on('swipedown', callbacks.onSwipeDown)
        }
        if (callbacks.onSwipeLeft) {
          hammer.on('swipeleft', callbacks.onSwipeLeft)
        }
        if (callbacks.onSwipeRight) {
          hammer.on('swiperight', callbacks.onSwipeRight)
        }
        
        // 清理函数
        return () => {
          hammer.destroy()
        }
      } catch (error) {
        console.warn('手势库加载失败:', error)
      }
    }
    
    let cleanup: (() => void) | undefined
    initHammer().then((fn) => {
      cleanup = fn
    })
    
    return () => {
      if (cleanup) cleanup()
    }
  }, [elementRef, callbacks])
}








