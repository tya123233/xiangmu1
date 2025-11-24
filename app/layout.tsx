import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web22',
  description: '空白页面',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  )
}

