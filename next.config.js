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
  
  // 自定义 webpack 配置（如果需要）
  webpack: (config) => {
    // 支持导入 GSAP 等库
    return config;
  },
}

module.exports = nextConfig

