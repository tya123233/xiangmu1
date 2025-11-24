# 快速参考指南

## 🎯 核心数据速查

### 设计尺寸
```
容器: 1440px × 23299px
宽高比: 1:16.18
```

### 颜色值
```
背景1: #E8E8E8
背景2: #E0E0E0  
粉色遮罩: #FF9B9B (opacity: 0.85)
```

### 圆角
```
容器: 24px
图片: 12px
遮罩: 20px
```

### 层级 (z-index)
```
0  → 底层背景
1  → 次级背景
10 → 图片元素
20 → 粉色遮罩
100 → 文字标注
```

---

## 📐 坐标转换公式

### Figma → 代码

```javascript
// 原点坐标
ORIGIN_X = 6971
ORIGIN_Y = -2959

// 相对位置
relativeX = figmaX - ORIGIN_X
relativeY = figmaY - ORIGIN_Y

// 百分比位置 (用于响应式)
leftPercent = (relativeX / 1440) * 100
topPercent = (relativeY / 23299) * 100
widthPercent = (width / 1440) * 100
heightPercent = (height / 23299) * 100
```

### 示例计算

```
图片元素 (ID: 1187:391)
Figma: x=7270, y=-2836, w=859, h=235

相对位置:
x = 7270 - 6971 = 299
y = -2836 - (-2959) = 123

百分比:
left = (299 / 1440) * 100 = 20.76%
top = (123 / 23299) * 100 = 0.53%
width = (859 / 1440) * 100 = 59.65%
height = (235 / 23299) * 100 = 1.01%
```

---

## 🖼️ 元素类型对照

### 图片元素特征
- ID 格式: `1187:xxx`, `1203:xxx`, `1034:xxx`, `1206:xxx`, `1207:xxx`
- 名称包含: hash值、描述性名称、image 关键字
- z-index: 10
- 圆角: 12px

### 遮罩块特征
- ID 格式: `1187:4xx`, `1207:xx` (Rectangle 系列)
- 名称: `Rectangle 1-14`, `Rectangle 23-73`
- 颜色: #FF9B9B
- 透明度: 0.85
- z-index: 20
- 圆角: 20px

---

## 📊 图片分布热力图

```
Y坐标范围        图片数量
-3000 ~ -2000    3张
-2000 ~ -1000    3张
-1000 ~ 0        2张
0 ~ 1000         1张
1000 ~ 2000      2张
2000 ~ 3000      1张
3000 ~ 4000      1张
4000 ~ 5000      2张
5000 ~ 7000      1张
7000 ~ 9000      3张
9000 ~ 11000     2张
11000 ~ 13000    3张
13000 ~ 15000    2张
15000 ~ 17000    2张
```

**视觉重心**: 时间线顶部和中部区域图片密度较高

---

## 🎨 样式速查表

### Tailwind 类名
```css
/* 容器 */
min-h-screen bg-gray-900 py-12 px-4

/* 标题 */
text-4xl font-bold text-white mb-2

/* 图片 hover */
hover:scale-[1.02] hover:shadow-2xl

/* 遮罩 hover */
hover:scale-105

/* 过渡 */
transition-all duration-300
```

### 内联样式模式
```tsx
style={{
  left: `${(relativeX / 1440) * 100}%`,
  top: `${(relativeY / 23299) * 100}%`,
  width: `${(width / 1440) * 100}%`,
  height: `${(height / 23299) * 100}%`,
  borderRadius: `${radius}px`,
  zIndex: zIndex,
}}
```

---

## 🔢 关键数字

| 指标 | 数值 |
|---|---|
| 图片总数 | 28 |
| 遮罩总数 | 20 |
| 总高度 | 23,299px |
| 容器宽度 | 1,440px |
| 元素总数 | 50+ |
| 平均图片尺寸 | ~650×650px |
| 平均遮罩尺寸 | ~500×200px |
| 垂直跨度 | ~19,000px |
| 水平跨度 | ~1,433px |

---

## 🚀 性能优化检查清单

- [ ] 使用 Next.js Image 组件
- [ ] 启用图片懒加载
- [ ] 优化图片格式 (WebP)
- [ ] 压缩图片大小
- [ ] 使用 CSS Transform 做动画
- [ ] 合理设置 z-index
- [ ] 避免不必要的重渲染
- [ ] 使用 React.memo (如需要)

---

## 📱 响应式断点建议

```css
/* 移动设备 */
@media (max-width: 640px) {
  /* 缩小到 320px 宽度 */
}

/* 平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  /* 保持原有比例 */
}

/* 桌面 */
@media (min-width: 1025px) {
  /* 限制最大宽度 1440px */
  max-width: 1440px;
}

/* 4K */
@media (min-width: 2560px) {
  /* 可选: 放大 1.5x */
}
```

---

## 🎭 交互状态

### 默认状态
```
scale: 1
opacity: 0.85 (遮罩)
shadow: normal
```

### Hover 状态
```
图片: scale(1.02)
遮罩: scale(1.05)
shadow: enhanced
```

### Active/点击状态
```
图片: scale(1.02) + shadow变化
遮罩: opacity(0.95)
```

### 过渡时间
```
duration: 300ms
easing: ease
```

---

## 🔗 文件关系

```
app/story-timeline/page.tsx
    ↓ 导入
components/StoryTimelineLayout.tsx
    ↓ 引用 (未来)
public/images/timeline/*.jpg
```

---

## 💡 调试技巧

### 1. 查看元素边界
```tsx
// 添加边框查看布局
style={{ border: '1px solid red' }}
```

### 2. 显示坐标信息
```tsx
<div className="absolute top-0 left-0 text-xs bg-black text-white p-1">
  {element.id} | x:{pos.left} y:{pos.top}
</div>
```

### 3. 高亮点击元素
```tsx
border: isClicked ? '3px solid yellow' : 'none'
```

---

## 📋 待办事项

### 必须完成
- [ ] 替换占位图为真实图片 (28张)
- [ ] 测试所有断点的响应式效果
- [ ] 验证交互功能

### 可选优化
- [ ] 添加图片点击弹窗
- [ ] 实现滚动进度指示
- [ ] 添加加载骨架屏
- [ ] 实现视差滚动效果
- [ ] 添加故事内容关联

---

## 🎯 验收标准

✅ 所有图片位置与 Figma 一致  
✅ 所有遮罩位置与 Figma 一致  
✅ 颜色完全匹配  
✅ 圆角数值正确  
✅ 层级关系正确  
✅ 响应式缩放正常  
✅ 交互动画流畅  
✅ 无布局错位  
✅ 无性能问题  
✅ 代码无 lint 错误

---

**提示**: 这是一个快速参考文档，详细技术说明请查看 `FIGMA_TIMELINE_REPLICATION.md`



