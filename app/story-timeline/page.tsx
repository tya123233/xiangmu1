import { Metadata } from 'next'
import StoryTimelineLayout from '@/components/StoryTimelineLayout'

export const metadata: Metadata = {
  title: '故事时间线 | 交互式故事网站',
  description: '点击照片或周围区域，探索这段办公室里未完成的故事 - 精准复刻 Figma 设计',
}

export default function StoryTimelinePage() {
  return <StoryTimelineLayout />
}

