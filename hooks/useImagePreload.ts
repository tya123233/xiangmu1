'use client'

import { useEffect, useState } from 'react'

interface UseImagePreloadResult {
  isLoaded: boolean
  progress: number
}

/**
 * 预加载所有图片的 Hook
 * @param imageUrls 需要预加载的图片 URL 数组
 * @returns 加载状态和进度
 */
export function useImagePreload(imageUrls: string[]): UseImagePreloadResult {
  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoaded(true)
      return
    }

    let mounted = true
    let loaded = 0

    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.onload = () => {
          if (mounted) {
            loaded++
            setLoadedCount(loaded)
            if (loaded === imageUrls.length) {
              setIsLoaded(true)
            }
          }
          resolve()
        }
        img.onerror = () => {
          if (mounted) {
            loaded++
            setLoadedCount(loaded)
            if (loaded === imageUrls.length) {
              setIsLoaded(true)
            }
          }
          resolve() // 即使加载失败也继续
        }
        img.src = url
      })
    }

    // 并行预加载所有图片
    Promise.all(imageUrls.map(preloadImage)).catch(() => {
      // 处理任何未捕获的错误
      if (mounted) {
        setIsLoaded(true)
      }
    })

    return () => {
      mounted = false
    }
  }, [imageUrls])

  const progress = imageUrls.length > 0 ? (loadedCount / imageUrls.length) * 100 : 100

  return { isLoaded, progress }
}






