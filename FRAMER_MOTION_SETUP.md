# Framer Motion 滚动视差动画配置指南

## ✅ 已完成的工作

### 1. 安装 Framer Motion
```bash
npm install framer-motion
```

### 2. 创建的新组件

#### `ParallaxImage.tsx` - 视差滚动图片组件
- **功能**：当用户向下滚动时，图片会虚化并放大
- **动画效果**：
  - 📐 缩放 (scale): 1 → 1.5 → 2
  - 🌫️ 模糊 (blur): 0px → 5px → 20px
  - 👻 透明度 (opacity): 1 → 0.8 → 0.3 → 0
  - ⬆️ 向上移动 (y): 0 → -200px

### 3. 增强的组件（添加 Framer Motion 动画）

- ✅ `ScrollStoryPanel.tsx` - 面板淡入、缩放动画
- ✅ `ChapterMenu.tsx` - 章节菜单滑入、按钮交互动画
- ✅ `ProgressBar.tsx` - 进度条流畅过渡、发光效果
- ✅ `TapHint.tsx` - 提示动画、跳动箭头
- ✅ `LoadingScreen.tsx` - 加载动画、装饰效果

### 4. 更新的数据结构

在 `data/story-data.ts` 中：
- 添加了 `parallaxImage?: string` 字段
- 在第一章（序章：觉醒）后面插入了视差图片面板（id: 3）
- 更新了所有后续面板的 id 和章节的 panelIndex

## 🖼️ 如何添加你的办公室图片

### 步骤 1：保存图片
将你上传的办公室时钟图片保存到以下路径：

```
public/images/office-clock.png
```

**注意**：
- 文件名必须是 `office-clock.png`
- 路径必须是 `public/images/` 目录下
- 支持的格式：JPG, PNG, WebP
- ✅ **已保存**: office-clock.png (220 KB)

### 步骤 2：确认配置

图片已经在 `story-data.ts` 中配置好：

```typescript
{
  id: 3,
  title: '',
  content: '',
  parallaxImage: '/images/office-clock.png', // ✅ 已更新为 PNG
  background: 'transparent',
}
```

## 🎬 动画效果说明

### 视差滚动原理

使用 Framer Motion 的 `useScroll` 和 `useTransform` hooks：

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start'],
})

const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2])
const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 20])
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.3, 0])
```

### 滚动进度映射

| 滚动进度 | 缩放 | 模糊 (px) | 透明度 |
|---------|------|----------|--------|
| 0%      | 1.0  | 0        | 1.0    |
| 50%     | 1.5  | 5        | 0.8    |
| 70%     | 1.7  | 14       | 0.3    |
| 100%    | 2.0  | 20       | 0.0    |

## 🚀 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 📖 体验流程

1. **第0屏** - 纯白 "AGAIN" 标题页
2. **第1屏** - 黑白渐变 + 打字机效果
3. **第2屏** - 序章：觉醒 + 4张图片
4. **🆕 第3屏** - **办公室时钟图片 + 视差滚动动画** ⭐
5. **第4屏** - 第一章：探索
6. **第5屏** - 第二章：相遇
7. **第6屏** - 第三章：传说
8. **第7屏** - 尾声

## 🎨 自定义动画参数

如果你想调整动画效果，可以修改 `components/ParallaxImage.tsx`：

```typescript
// 调整缩放范围
const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 3])

// 调整模糊强度
const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 30])

// 调整透明度变化
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
```

## 🔧 常见问题

### Q: 图片不显示？
A: 确保图片文件路径正确：`public/images/office-clock.jpg`

### Q: 动画不流畅？
A: 检查浏览器性能，Framer Motion 使用硬件加速，但大图片可能影响性能。建议压缩图片。

### Q: 想要更快/更慢的动画？
A: 调整 `ParallaxImage.tsx` 中的滚动进度数组值。

## 📦 项目依赖

```json
{
  "framer-motion": "^11.x",
  "next": "^15.1.8",
  "react": "^19.0.0"
}
```

## 🎯 下一步

你可以：
- 🖼️ 添加更多视差图片面板
- 🎨 自定义动画曲线和时长
- 🌈 添加其他 Framer Motion 特效（如路径动画、手势交互等）
- 📱 优化移动端体验

---

**Created with ❤️ using Framer Motion & Next.js**

