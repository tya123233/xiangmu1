/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React 严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
  },
  
  // 启用压缩
  compress: true,
  
  // Turbopack 配置 (Next.js 16+ 默认使用 Turbopack)
  turbopack: {},
}

module.exports = nextConfig

