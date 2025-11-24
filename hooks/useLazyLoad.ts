'use client'

import { useEffect, RefObject } from 'react'

export function useLazyLoad(imageRef: RefObject<HTMLImageElement>, src: string) {
  useEffect(() => {
    if (!imageRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '300px',
      }
    )
    
    if (imageRef.current) {
      observer.observe(imageRef.current)
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [imageRef, src])
}








