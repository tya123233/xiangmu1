# 部署指南

## 🚀 快速启动

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 准备图片

参考 `IMAGE_PREPARATION_GUIDE.md` 准备 28 张图片，放入：
```
public/images/timeline/
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问: `http://localhost:3000/story-timeline`

---

## 📦 生产构建

### 构建步骤

```bash
# 1. 构建项目
npm run build

# 2. 检查构建输出
npm run start

# 3. 访问
http://localhost:3000/story-timeline
```

### 构建优化

```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 压缩优化
  compress: true,
  // 生产环境优化
  swcMinify: true,
}
```

---

## ☁️ 部署到 Vercel

### 方法1: Git 部署 (推荐)

```bash
# 1. 初始化 Git (如果还没有)
git init
git add .
git commit -m "Add story timeline feature"

# 2. 推送到 GitHub
git remote add origin YOUR_REPO_URL
git push -u origin main

# 3. 在 Vercel 中导入项目
# 访问 vercel.com → Import Project → 选择仓库
```

### 方法2: Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

### Vercel 环境变量 (如需要)

```bash
# 添加环境变量
vercel env add NEXT_PUBLIC_API_URL
```

---

## 🐳 Docker 部署

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# 依赖安装阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./public:/app/public
```

### 构建和运行

```bash
# 构建镜像
docker build -t story-timeline .

# 运行容器
docker run -p 3000:3000 story-timeline

# 使用 docker-compose
docker-compose up -d
```

---

## 🌐 Nginx 配置

### 反向代理配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # 图片资源缓存
    location /images/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

---

## 📊 性能监控

### Vercel Analytics

```bash
# 安装
npm install @vercel/analytics

# 在 app/layout.tsx 中添加
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 🔒 安全配置

### next.config.js 安全头

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}
```

---

## 📈 性能优化

### 1. 图片优化

```tsx
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/images/timeline/photo.jpg"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  quality={85}
  priority // 首屏图片
/>
```

### 2. 代码分割

```tsx
// 动态导入
import dynamic from 'next/dynamic'

const StoryTimeline = dynamic(
  () => import('@/components/StoryTimelineLayout'),
  { loading: () => <p>Loading...</p> }
)
```

### 3. 缓存策略

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

---

## 🧪 测试和验证

### 性能测试

```bash
# Lighthouse CI
npm install -g @lhci/cli

lhci autorun --collect.url=http://localhost:3000/story-timeline
```

### 视觉回归测试

```bash
# Playwright
npm install -D @playwright/test

# 运行测试
npx playwright test
```

### 示例测试

```typescript
// tests/story-timeline.spec.ts
import { test, expect } from '@playwright/test'

test('story timeline loads correctly', async ({ page }) => {
  await page.goto('/story-timeline')
  
  // 检查标题
  await expect(page.locator('h1')).toContainText('故事时间线')
  
  // 检查图片加载
  const images = page.locator('img')
  await expect(images).toHaveCount(28)
  
  // 检查交互
  const mask = page.locator('[data-type="mask"]').first()
  await mask.click()
  await expect(mask).toHaveCSS('opacity', '0.95')
})
```

---

## 📱 移动端优化

### 响应式配置

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
}
```

### 移动端手势

```tsx
// 添加触摸事件支持
const handleTouchStart = (e: React.TouchEvent) => {
  // 处理触摸开始
}

const handleTouchMove = (e: React.TouchEvent) => {
  // 处理触摸移动
}
```

---

## 🔧 故障排查

### 常见问题

#### 问题1: 图片 404
```bash
# 检查路径
ls -la public/images/timeline/
# 确保文件存在且名称正确
```

#### 问题2: 样式不生效
```bash
# 清除缓存重新构建
rm -rf .next
npm run build
```

#### 问题3: 性能问题
```bash
# 分析 bundle 大小
npm run build
npm install -g @next/bundle-analyzer
```

---

## ✅ 部署检查清单

### 部署前
- [ ] 所有 28 张图片已准备好
- [ ] 本地测试通过
- [ ] 性能测试通过 (Lighthouse > 90)
- [ ] 移动端适配测试通过
- [ ] 无 console 错误
- [ ] 无 lint 错误

### 部署中
- [ ] 环境变量配置正确
- [ ] 构建成功无错误
- [ ] 静态资源正确部署

### 部署后
- [ ] 线上访问正常
- [ ] 图片加载正常
- [ ] 交互功能正常
- [ ] 性能指标达标
- [ ] SEO 元数据正确

---

## 📞 支持

遇到问题？

1. 查看 `FIGMA_TIMELINE_REPLICATION.md` 技术文档
2. 查看 `QUICK_REFERENCE.md` 快速参考
3. 查看 `IMAGE_PREPARATION_GUIDE.md` 图片指南
4. 检查浏览器控制台错误信息

---

**祝部署顺利！** 🎉



