import { Metadata } from 'next'
import JoinersContainer from '@/components/JoinersContainer'

export const metadata: Metadata = {
  title: 'Joiners 拼贴画廊 | 交互式故事网站',
  description: '灵感来自 David Hockney 的 Joiners 系列，体验拼贴艺术的魅力',
}

/**
 * Joiners 拼贴画廊页面
 * 展示 David Hockney 风格的交互式拼贴画
 */
export default function JoinersPage() {
  return <JoinersContainer />
}

