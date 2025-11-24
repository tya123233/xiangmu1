# 📸 交互式照片对话框使用指南

## 🎯 功能概述

这是一个完整的交互式照片对话框系统，实现了：

- ✅ 点击照片显示对应的对话框
- ✅ 每张照片独立的对话框内容和状态
- ✅ 多个对话框顺序显示
- ✅ 粉色柔和样式 + GSAP 弹性动画
- ✅ 智能位置计算（防止超出屏幕）
- ✅ 完整响应式设计
- ✅ 键盘操作支持
- ✅ 点击外部关闭对话框
- ✅ 无障碍支持

---

## 📦 组件架构

```
components/
├── DialogBubble.tsx          # 对话框气泡组件
├── ClickablePhoto.tsx        # 可点击照片组件
└── InteractivePhotoGrid.tsx  # 照片网格容器

hooks/
└── useClickOutside.ts        # 点击外部检测 Hook

data/
└── interactive-photos-data.ts # 照片数据
```

---

## 🚀 快速开始

### 1. 基础使用

```tsx
import InteractivePhotoGrid from '@/components/InteractivePhotoGrid'
import { interactivePhotosData } from '@/data/interactive-photos-data'

export default function MyPage() {
  return (
    <InteractivePhotoGrid
      photos={interactivePhotosData}
      containerHeight="100vh"
      background="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    />
  )
}
```

### 2. 自定义照片数据

```tsx
import { PhotoWithDialogs } from '@/components/ClickablePhoto'

const myPhotos: PhotoWithDialogs[] = [
  {
    id: 'my-photo-1',
    image: '/images/my-photo.jpg',
    alt: '我的照片',
    position: {
      top: '20%',
      left: '15%',
    },
    dialogs: [
      {
        id: 'dialog-1',
        text: '这是第一个对话框 💬',
        position: 'right', // 对话框在照片右侧
      },
      {
        id: 'dialog-2',
        text: '这是第二个对话框',
        position: 'bottom', // 对话框在照片下方
      },
    ],
  },
]
```

---

## 📐 数据结构说明

### PhotoWithDialogs

```typescript
interface PhotoWithDialogs {
  id: string                    // 唯一标识
  image: string                 // 图片路径
  alt: string                   // 图片描述
  position: {                   // 照片在页面中的位置
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  dialogs: Dialog[]             // 对话框数组
  className?: string            // 自定义样式类名
}
```

### Dialog

```typescript
interface Dialog {
  id: string                              // 唯一标识
  text: string                            // 对话框文本
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'  // 相对照片的位置
}
```

---

## 🎨 组件 API

### InteractivePhotoGrid

照片网格容器组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| photos | PhotoWithDialogs[] | 必填 | 照片数据数组 |
| containerHeight | string | '100vh' | 容器高度 |
| background | string | 渐变色 | 背景样式 |
| className | string | '' | 自定义类名 |

### ClickablePhoto

可点击照片组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| photo | PhotoWithDialogs | 必填 | 照片数据 |
| width | number | 300 | 照片宽度（px） |
| height | number | 300 | 照片高度（px） |

### DialogBubble

对话框气泡组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | string | 必填 | 对话框文本 |
| position | 'top' \| 'bottom' \| 'left' \| 'right' \| 'center' | 必填 | 相对位置 |
| isVisible | boolean | 必填 | 是否可见 |
| onClose | () => void | - | 关闭回调 |
| className | string | '' | 自定义类名 |

---

## 🎮 交互说明

### 鼠标操作

- **点击照片**：显示下一个对话框
- **点击对话框外部**：关闭当前对话框
- **悬浮照片**：显示提示文字

### 键盘操作

- **Enter / Space**：显示下一个对话框
- **Esc**：关闭当前对话框

### 移动端

- 对话框自动居中显示
- 显示遮罩层
- 提供关闭按钮（✕）

---

## 🎯 位置系统说明

### 照片位置（position）

相对于**容器**的绝对定位：

```tsx
position: {
  top: '20%',    // 距离顶部 20%
  left: '15%',   // 距离左侧 15%
}
```

### 对话框位置（dialog.position）

相对于**照片**的位置：

- `top`：照片上方
- `bottom`：照片下方
- `left`：照片左侧
- `right`：照片右侧
- `center`：照片中心（覆盖）

**智能调整**：如果对话框超出屏幕，会自动调整到合适位置。

---

## 💡 使用示例

### 示例 1：背景调研页面

```tsx
'use client'

import InteractivePhotoGrid from '@/components/InteractivePhotoGrid'

export default function ResearchPage() {
  const photos = [
    {
      id: 'research-1',
      image: '/images/interview.jpg',
      alt: '用户访谈',
      position: { top: '15%', left: '10%' },
      dialogs: [
        {
          id: 'd1',
          text: '我们采访了 50+ 用户 🎤',
          position: 'right',
        },
        {
          id: 'd2',
          text: '收集了宝贵的反馈意见',
          position: 'bottom',
        },
      ],
    },
    // ... 更多照片
  ]

  return (
    <div className="min-h-screen">
      <InteractivePhotoGrid
        photos={photos}
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      />
    </div>
  )
}
```

### 示例 2：团队故事页面

```tsx
const teamStory = [
  {
    id: 'team-1',
    image: '/images/team.jpg',
    alt: '团队合影',
    position: { top: '50%', left: '50%' },
    className: 'transform -translate-x-1/2 -translate-y-1/2', // 居中
    dialogs: [
      {
        id: 't1',
        text: '这是我们的创始团队 👥',
        position: 'center',
      },
    ],
  },
]
```

---

## 🎨 样式自定义

### 修改对话框颜色

```tsx
// 在 DialogBubble.tsx 中修改
bg-[#FFB3C6]/90  // 改为你想要的颜色
```

### 修改动画效果

```tsx
// 在 DialogBubble.tsx 的 GSAP 动画中修改
gsap.fromTo(bubbleRef.current, {
  scale: 0,
  opacity: 0,
}, {
  scale: 1,
  opacity: 1,
  duration: 0.4,        // 动画时长
  ease: 'back.out(1.7)', // 弹性效果强度
})
```

### 修改照片悬浮效果

```tsx
// 在 ClickablePhoto.tsx 中修改
hover:scale-105  // 悬浮时放大比例
hover:shadow-2xl // 悬浮时阴影
```

---

## 📱 响应式设计

### 桌面端（≥768px）

- 对话框显示在照片旁边
- 带箭头指示器
- 点击外部关闭

### 移动端（<768px）

- 对话框居中覆盖显示
- 全屏遮罩层
- 显示关闭按钮（✕）
- 照片自动垂直排列（可选）

---

## 🔧 性能优化

### 已实现的优化

1. **图片优化**：使用 Next.js Image 组件
2. **延迟动画**：GSAP 动画仅在需要时执行
3. **事件监听清理**：useEffect 正确清理
4. **边界检测优化**：使用 setTimeout 避免频繁计算

### 建议

- 图片使用 WebP 格式
- 预加载首屏照片
- 控制照片数量（建议 ≤ 10 张）

---

## 🎯 最佳实践

### 1. 对话框文本

- ✅ 简短有力（建议 ≤ 50 字）
- ✅ 使用 Emoji 增加趣味性
- ✅ 分段显示（多个对话框）
- ❌ 避免过长的文本

### 2. 照片布局

- ✅ 合理分散位置（避免重叠）
- ✅ 重要照片放在视觉焦点
- ✅ 考虑移动端显示
- ❌ 避免边缘过于拥挤

### 3. 对话框位置

- ✅ 优先使用 `right` 和 `bottom`（更自然）
- ✅ 根据照片位置选择合适方向
- ✅ 利用智能调整功能
- ❌ 避免使用 `center`（会遮挡照片）

---

## 🐛 常见问题

### Q1: 对话框被遮挡？

**A**: 检查 z-index 层级，确保对话框容器没有被其他元素覆盖。

### Q2: 点击外部不关闭？

**A**: 确保 `useClickOutside` 的 `enabled` 参数为 `true`。

### Q3: 移动端对话框位置不对？

**A**: 系统会自动调整为居中显示，这是正常行为。

### Q4: 动画卡顿？

**A**: 检查是否有过多照片（建议 ≤ 10 张），或减少动画复杂度。

---

## 🔗 相关文件

- 示例页面：`app/interactive-photos/page.tsx`
- 数据示例：`data/interactive-photos-data.ts`
- 组件源码：`components/ClickablePhoto.tsx`

---

## 📝 更新日志

### v1.0.0 (2025-11-01)

- ✅ 初始版本发布
- ✅ 完整功能实现
- ✅ 文档完善
- ✅ 浏览器测试通过

---

**Enjoy! 🎉**

