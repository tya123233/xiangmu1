import type { Metadata } from 'next'
import { Cedarville_Cursive } from 'next/font/google'
import './globals.css'

const cedarville = Cedarville_Cursive({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cedarville',
})

export const metadata: Metadata = {
  title: 'Web22',
  description: '交互式故事网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={cedarville.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
