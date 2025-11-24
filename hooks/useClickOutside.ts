import { useEffect, RefObject } from 'react'

/**
 * useClickOutside Hook
 * 
 * 检测点击元素外部区域的自定义 Hook
 * 
 * @param ref - 要监听的元素引用
 * @param handler - 点击外部时的回调函数
 * @param enabled - 是否启用监听（默认 true）
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      
      // 如果点击的是元素内部，或者元素不存在，不执行回调
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    // 使用 capture 阶段监听，确保在其他事件处理器之前执行
    document.addEventListener('mousedown', listener, true)
    document.addEventListener('touchstart', listener, true)

    return () => {
      document.removeEventListener('mousedown', listener, true)
      document.removeEventListener('touchstart', listener, true)
    }
  }, [ref, handler, enabled])
}

