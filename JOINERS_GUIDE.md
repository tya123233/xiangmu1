# Joiners 拼贴展开动画 - 实现指南

## 📋 项目概述

这个项目实现了一个基于 **David Hockney "Joiners"** 拼贴风格的交互式界面，使用 **Framer Motion** 的 `layoutId` 和 `AnimatePresence` 实现流畅的共享元素过渡动画。

## 🎨 David Hockney "Joiners" 简介

David Hockney 的 "Joiners" 是一种将同一场景的多张照片拼贴在一起的艺术形式，创造出立体主义风格的视觉效果。每张照片从稍微不同的角度拍摄，拼贴后展现出时间和空间的多维度视角。

## 🚀 核心技术实现

### 1. **Framer Motion layoutId - 共享元素过渡**

`layoutId` 是 Framer Motion 最强大的功能之一，它可以自动在两个具有相同 `layoutId` 的元素之间创建平滑的过渡动画。

**工作原理：**
- 当一个元素被移除（或隐藏），而另一个具有相同 `layoutId` 的元素被添加时
- Framer Motion 会自动计算它们的位置、尺寸、圆角、透明度等属性的差异
- 并创建一个平滑的变形动画

**示例代码：**

```typescript
// 拼贴视图中的小面板
<motion.div
  layoutId="unique-panel-id" // 唯一标识符
  className="small-panel"
  onClick={() => setSelectedId("unique-panel-id")}
>
  <Image src={panelImage} />
</motion.div>

// 详情视图中的大容器（使用相同的 layoutId）
<motion.div
  layoutId="unique-panel-id" // 相同的标识符
  className="detail-view"
>
  <Image src={fullImage} />
</motion.div>
```

### 2. **AnimatePresence - 处理进入/退出动画**

`AnimatePresence` 允许组件在从 React 树中移除时播放退出动画。

**关键特性：**
- 监听子组件的挂载和卸载
- 延迟组件的移除，直到退出动画完成
- 支持 `exit` 动画属性

**示例代码：**

```typescript
<AnimatePresence>
  {selectedPanelId && (
    <JoinersDetailView
      scene={currentScene}
      selectedPanelId={selectedPanelId}
      onClose={handleClose}
    />
  )}
</AnimatePresence>
```

## 📁 项目结构

```
web22/
├── data/
│   └── joiners-data.ts          # 拼贴场景数据定义
├── components/
│   ├── JoinersGrid.tsx          # 拼贴网格视图（小面板）
│   ├── JoinersDetailView.tsx    # 详情视图（展开后）
│   └── JoinersContainer.tsx     # 主容器（状态管理）
├── app/
│   └── joiners/
│       └── page.tsx             # Joiners 页面
└── JOINERS_GUIDE.md             # 本文档
```

## 🎯 核心组件解析

### 1. **JoinersGrid.tsx** - 拼贴网格

**职责：**
- 渲染多个小图片面板
- 使用 CSS Grid 布局
- 为每个面板分配唯一的 `layoutId`

**关键代码：**

```typescript
<motion.div
  layoutId={panel.id}  // 🔑 关键：唯一标识符
  onClick={() => onPanelClick(panel.id)}
  style={{
    rotate: panel.rotation,  // 模拟拼贴效果
    x: panel.offsetX,
    y: panel.offsetY,
  }}
>
  <Image src={panel.imageUrl} />
</motion.div>
```

**设计亮点：**
- ✅ 每个面板有轻微的旋转和偏移，模拟手工拼贴感
- ✅ 使用 `whileHover` 和 `whileTap` 提供交互反馈
- ✅ CSS Grid 确保响应式布局

### 2. **JoinersDetailView.tsx** - 详情视图

**职责：**
- 显示完整的场景图片
- 使用与点击面板**相同的 `layoutId`** 触发过渡
- 提供关闭功能

**关键代码：**

```typescript
<motion.div
  layoutId={selectedPanelId}  // 🔑 与拼贴面板相同的 ID
  className="detail-view"
  onClick={(e) => e.stopPropagation()}
>
  <Image src={scene.fullImageUrl} />
</motion.div>
```

**动画配置：**
```typescript
// 背景遮罩动画
initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
animate={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
```

**设计亮点：**
- ✅ 完整图片展示，带有渐变遮罩
- ✅ 延迟显示文字内容，避免动画冲突
- ✅ 关闭按钮带有微动画

### 3. **JoinersContainer.tsx** - 主容器

**职责：**
- 管理当前选中的面板 ID
- 处理场景切换
- 处理键盘事件（ESC 关闭，方向键切换场景）
- 包裹 `AnimatePresence` 确保动画正常工作

**关键代码：**

```typescript
const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null)

// 点击面板
const handlePanelClick = (panelId: string) => {
  setSelectedPanelId(panelId)  // 触发详情视图渲染
}

// 关闭详情
const handleClose = () => {
  setSelectedPanelId(null)  // 触发退出动画
}

return (
  <>
    <JoinersGrid onPanelClick={handlePanelClick} />
    
    <AnimatePresence>
      {selectedPanelId && (
        <JoinersDetailView
          selectedPanelId={selectedPanelId}
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  </>
)
```

**设计亮点：**
- ✅ 统一的状态管理
- ✅ 键盘导航支持
- ✅ 场景切换导航

## 🎬 动画流程详解

### **展开动画（点击面板）**

1. **用户点击小面板**
   ```typescript
   onClick={() => onPanelClick(panel.id)}
   ```

2. **更新状态**
   ```typescript
   setSelectedPanelId(panel.id)
   ```

3. **React 重新渲染**
   - `JoinersDetailView` 组件被添加到 DOM
   - 该组件使用相同的 `layoutId={panel.id}`

4. **Framer Motion 自动计算**
   - 检测到两个元素共享相同的 `layoutId`
   - 计算起始位置（小面板）和结束位置（详情视图）
   - 自动插值：位置、尺寸、圆角、透明度等

5. **播放过渡动画**
   - 小面板平滑"变形"成详情视图
   - 视觉上看起来像同一个元素在展开

### **收起动画（关闭详情）**

1. **用户点击关闭**
   ```typescript
   onClick={handleClose}
   ```

2. **更新状态**
   ```typescript
   setSelectedPanelId(null)
   ```

3. **AnimatePresence 捕获退出**
   - 检测到 `JoinersDetailView` 即将被移除
   - 延迟卸载，等待 `exit` 动画完成

4. **播放退出动画**
   - 详情视图"收缩"回小面板的位置
   - 背景遮罩淡出

5. **完成后移除组件**

## 🔧 自定义和扩展

### 添加新场景

编辑 `data/joiners-data.ts`：

```typescript
{
  id: 'scene-5',
  title: '你的标题',
  description: '你的描述',
  fullImageUrl: '/images/your-full-image.jpg',
  gridColumns: 4,
  gridRows: 3,
  panels: [
    {
      id: 'panel-5-1',
      imageUrl: '/images/your-panel-image.jpg',
      gridColumn: '1 / 2',
      gridRow: '1 / 2',
      rotation: -2,
      offsetX: 2,
      offsetY: -1,
    },
    // 添加更多面板...
  ],
}
```

### 调整动画速度

在 `JoinersDetailView.tsx` 中：

```typescript
<motion.div
  layoutId={selectedPanelId}
  transition={{
    duration: 0.5,      // 动画时长（秒）
    ease: 'easeInOut',  // 缓动函数
  }}
>
```

### 自定义缓动函数选项

- `linear` - 线性
- `easeIn` / `easeOut` / `easeInOut` - 标准缓动
- `circIn` / `circOut` / `circInOut` - 圆形缓动
- `backIn` / `backOut` / `backInOut` - 回弹效果
- 自定义：`[0.43, 0.13, 0.23, 0.96]` (贝塞尔曲线)

### 添加更多交互

**示例：双击放大**

```typescript
<motion.div
  layoutId={panel.id}
  onDoubleClick={() => handleZoom(panel.id)}
  whileHover={{ scale: 1.05 }}
>
```

## 📱 响应式设计

所有组件都已优化移动端体验：

- ✅ 触摸友好的大按钮
- ✅ 响应式网格布局
- ✅ 适配不同屏幕尺寸的图片
- ✅ 移动端手势支持

## 🎨 样式定制

### 修改拼贴间距

```typescript
<div className="grid gap-4">  // 改为 gap-4
```

### 修改详情视图圆角

```typescript
<motion.div className="rounded-3xl">  // 改为 rounded-3xl
```

### 修改背景颜色

```typescript
// 在 JoinersContainer.tsx
<div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
```

## 🚀 性能优化

1. **图片懒加载**
   - 使用 Next.js `Image` 组件自动优化
   - 设置正确的 `priority` 和 `sizes` 属性

2. **动画性能**
   - Framer Motion 使用 GPU 加速的 `transform` 属性
   - 避免动画 `width`/`height`，优先使用 `scale`

3. **状态管理**
   - 只在需要时渲染详情视图
   - 使用 `AnimatePresence` 的 `mode="wait"` 避免重叠

## 📖 相关资源

- [Framer Motion 官方文档](https://www.framer.com/motion/)
- [layoutId 文档](https://www.framer.com/motion/layout-animations/#shared-layout-animations)
- [AnimatePresence 文档](https://www.framer.com/motion/animate-presence/)
- [David Hockney Joiners](https://www.hockney.com/works/photos)

## 🎉 使用方法

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问页面**
   ```
   http://localhost:3000/joiners
   ```

3. **体验交互**
   - 点击任意小面板查看完整场景
   - 使用方向键切换不同场景
   - 按 ESC 或点击背景关闭详情视图

## ✨ 效果演示

**展开动画：**
- 小面板 → 平滑变形 → 全屏详情
- 位置、尺寸、圆角同步过渡
- 背景遮罩淡入

**收起动画：**
- 全屏详情 → 平滑收缩 → 原小面板位置
- 反向播放所有属性变化
- 背景遮罩淡出

---

**享受拼贴艺术的魅力！** 🎨✨

