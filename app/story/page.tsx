import { Metadata } from 'next'
import StoryContainer from '@/components/StoryContainer'
import { storyData } from '@/data/story-data'

export const metadata: Metadata = {
  title: '交互式故事 | 交互式故事网站',
  description: '一个类似日本漫画/动漫风格的交互式数字叙事网站',
}

/**
 * 交互式故事页面
 * 全屏面板展示，支持多种交互方式
 */
export default function StoryPage() {
  return <StoryContainer panels={storyData.panels} chapters={storyData.chapters} />
}

