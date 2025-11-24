# 快速开始指南 🚀

## 环境要求

- Node.js >= 18.17.0
- npm / yarn / pnpm

## 安装步骤

### 1. 安装依赖

```bash
npm install
```

如果使用 yarn：
```bash
yarn install
```

如果使用 pnpm：
```bash
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

### 3. 查看效果

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

你将看到：
- 第一个故事面板（序章：觉醒）
- 顶部进度条（红色）
- 右上角页面指示器（1/5）
- 底部导航按钮
- 点击提示动画

## 常用命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 下一步

### 修改故事内容

编辑 `data/story-data.ts` 文件：

```typescript
export const storyData: StoryData = {
  panels: [
    {
      id: 1,
      title: '你的标题',
      content: '你的内容',
      backgroundImage: 'https://...',
    },
    // 添加更多面板
  ],
}
```

### 自定义样式

编辑 `tailwind.config.ts` 修改颜色和动画：

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### 调整动画

编辑 `hooks/useGSAPAnimation.ts` 修改动画参数：

```typescript
duration: 0.5,  // 改变动画时长
ease: 'power2.in',  // 改变缓动函数
```

## 操作指南

### 桌面端
- 点击屏幕 / 空格键 → 下一页
- ↓ / → 方向键 → 下一页
- ↑ / ← 方向键 → 上一页
- 鼠标滚轮 → 前进/后退

### 移动端
- 点击屏幕 → 下一页
- 向上滑动 → 下一页
- 向下滑动 → 上一页

## 常见问题

### 依赖安装失败？

1. 清除缓存：
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. 检查 Node.js 版本：
```bash
node -v  # 应该 >= 18.17.0
```

### 端口被占用？

修改端口号：
```bash
PORT=3001 npm run dev
```

### 图片不显示？

确认 `next.config.js` 配置了图片域名：
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

## 获取帮助

- 查看完整文档：[README.md](./README.md)
- Next.js 文档：https://nextjs.org/docs
- GSAP 文档：https://greensock.com/docs/

---

**开始创作你的故事吧！** ✨








