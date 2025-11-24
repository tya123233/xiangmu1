# 图片准备指南

## 📁 目录结构

创建以下文件夹结构来存放图片：

```
public/
└── images/
    └── timeline/
        ├── clock-wall.jpg           (ID: 1187:391)
        ├── work-scene-1.jpg         (ID: 1187:401)
        ├── portrait-1.jpg           (ID: 1187:457)
        ├── office-scene.jpg         (ID: 1187:461)
        ├── legs-closeup.jpg         (ID: 1187:463)
        ├── side-portrait.jpg        (ID: 1187:468)
        ├── female-portrait.jpg      (ID: 1187:466)
        ├── male-portrait.jpg        (ID: 1187:512)
        ├── office-scene-2.jpg       (ID: 1187:514)
        ├── female-full.jpg          (ID: 1187:517)
        ├── male-closeup.jpg         (ID: 1187:519)
        ├── coffee-cup.jpg           (ID: 1203:2)
        ├── female-sitting.jpg       (ID: 1034:14)
        ├── side-face.jpg            (ID: 1033:12)
        ├── character-scene.jpg      (ID: 1206:4)
        ├── back-view.jpg            (ID: 1207:51)
        ├── profile-2.jpg            (ID: 1207:54)
        ├── office-env.jpg           (ID: 1207:18)
        ├── working-state.jpg        (ID: 1207:19)
        ├── two-people.jpg           (ID: 1207:58)
        ├── scene-1.jpg              (ID: 1207:20)
        ├── interaction.jpg          (ID: 1207:117)
        ├── discussion.jpg           (ID: 1207:13)
        ├── work-moment.jpg          (ID: 1207:119)
        ├── character-state.jpg      (ID: 1207:125)
        ├── office-detail.jpg        (ID: 1207:127)
        ├── scene-2.jpg              (ID: 1207:22)
        └── female-back.jpg          (ID: 1207:26)
```

---

## 📸 从 Figma 导出图片

### 方法1: 单个导出

1. 在 Figma 中选中图片图层
2. 右键 → Export...
3. 设置格式为 JPG (或 WebP 以获得更好压缩)
4. 设置质量为 80-90%
5. 按对应尺寸导出

### 方法2: 批量导出

1. 选中所有图片图层
2. 在右侧面板点击 Export
3. 添加导出设置: 1x JPG 80%
4. 点击 "Export 28 layers"
5. 重命名文件为上述命名

### 方法3: 使用 Figma API

```bash
# 安装 figma-export
npm install -g @figma-export/cli

# 导出配置
figma-export --fileId=YOUR_FILE_ID --token=YOUR_TOKEN
```

---

## 🎨 图片规格要求

### 每张图片的精确尺寸

| 文件名 | 宽度 | 高度 | 纵横比 | Figma ID |
|--------|------|------|--------|----------|
| clock-wall.jpg | 859px | 235px | 3.66:1 | 1187:391 |
| work-scene-1.jpg | 581px | 440px | 1.32:1 | 1187:401 |
| portrait-1.jpg | 375px | 448px | 0.84:1 | 1187:457 |
| office-scene.jpg | 452px | 689px | 0.66:1 | 1187:461 |
| legs-closeup.jpg | 542px | 410px | 1.32:1 | 1187:463 |
| side-portrait.jpg | 450px | 566px | 0.80:1 | 1187:468 |
| female-portrait.jpg | 622px | 572px | 1.09:1 | 1187:466 |
| male-portrait.jpg | 714px | 666px | 1.07:1 | 1187:512 |
| office-scene-2.jpg | 851px | 625px | 1.36:1 | 1187:514 |
| female-full.jpg | 490px | 628px | 0.78:1 | 1187:517 |
| male-closeup.jpg | 833px | 529px | 1.57:1 | 1187:519 |
| coffee-cup.jpg | 563px | 424px | 1.33:1 | 1203:2 |
| female-sitting.jpg | 834px | 774px | 1.08:1 | 1034:14 |
| side-face.jpg | 476px | 535px | 0.89:1 | 1033:12 |
| character-scene.jpg | 695px | 1072px | 0.65:1 | 1206:4 |
| back-view.jpg | 967px | 891px | 1.09:1 | 1207:51 |
| profile-2.jpg | 689px | 1040px | 0.66:1 | 1207:54 |
| office-env.jpg | 459px | 653px | 0.70:1 | 1207:18 |
| working-state.jpg | 459px | 861px | 0.53:1 | 1207:19 |
| two-people.jpg | 1227px | 929px | 1.32:1 | 1207:58 |
| scene-1.jpg | 611px | 808px | 0.76:1 | 1207:20 |
| interaction.jpg | 793px | 822px | 0.96:1 | 1207:117 |
| discussion.jpg | 628px | 860px | 0.73:1 | 1207:13 |
| work-moment.jpg | 691px | 981px | 0.70:1 | 1207:119 |
| character-state.jpg | 721px | 997px | 0.72:1 | 1207:125 |
| office-detail.jpg | 657px | 863px | 0.76:1 | 1207:127 |
| scene-2.jpg | 748px | 700px | 1.07:1 | 1207:22 |
| female-back.jpg | 778px | 961px | 0.81:1 | 1207:26 |

---

## 🔧 图片优化

### 推荐规格

```yaml
格式: WebP (首选) 或 JPG
质量: 80-85% 
最大文件大小: 200KB/张
总大小: < 5MB (28张)
```

### 优化工具

#### 1. 使用 squoosh.app (在线)
```
1. 访问 https://squoosh.app
2. 拖入图片
3. 选择 WebP 格式
4. 调整质量到 80%
5. 下载优化后的图片
```

#### 2. 使用 sharp (Node.js)
```javascript
const sharp = require('sharp');

sharp('input.jpg')
  .resize(859, 235)
  .webp({ quality: 80 })
  .toFile('clock-wall.webp');
```

#### 3. 使用 ImageOptim (Mac)
```
1. 拖入所有图片到 ImageOptim
2. 自动优化
3. 保存
```

#### 4. 批量处理脚本
```bash
# 使用 imagemagick
for file in *.jpg; do
  convert "$file" -quality 85 -strip "optimized/$file"
done
```

---

## 📝 命名规范检查清单

- [ ] 文件名全部小写
- [ ] 使用连字符 (-) 而非下划线
- [ ] 文件名与代码中的 src 路径一致
- [ ] 扩展名正确 (.jpg 或 .webp)
- [ ] 没有特殊字符或空格

---

## 🔄 更新代码中的图片路径

### 如果使用 WebP 格式

在 `StoryTimelineLayout.tsx` 中全局替换：

```typescript
// 将所有 .jpg 替换为 .webp
src: '/images/timeline/clock-wall.webp',
```

### 如果图片路径不同

修改 `timelineElements` 数组中的 `src` 字段。

---

## 🚀 加载策略

### 优先级加载

```typescript
// 首屏图片设置高优先级
<Image
  src={element.src!}
  alt={element.name || ''}
  fill
  priority={element.y < 2000}  // 首屏图片优先加载
  className="object-cover"
/>
```

### 懒加载

```typescript
// 非首屏图片懒加载
<Image
  src={element.src!}
  alt={element.name || ''}
  fill
  loading={element.y < 2000 ? 'eager' : 'lazy'}
  className="object-cover"
/>
```

---

## 🎯 图片映射表

### Figma ID → 文件名对照

```javascript
const imageMapping = {
  '1187:391': 'clock-wall',
  '1187:401': 'work-scene-1',
  '1187:457': 'portrait-1',
  '1187:461': 'office-scene',
  '1187:463': 'legs-closeup',
  '1187:468': 'side-portrait',
  '1187:466': 'female-portrait',
  '1187:512': 'male-portrait',
  '1187:514': 'office-scene-2',
  '1187:517': 'female-full',
  '1187:519': 'male-closeup',
  '1203:2': 'coffee-cup',
  '1034:14': 'female-sitting',
  '1033:12': 'side-face',
  '1206:4': 'character-scene',
  '1207:51': 'back-view',
  '1207:54': 'profile-2',
  '1207:18': 'office-env',
  '1207:19': 'working-state',
  '1207:58': 'two-people',
  '1207:20': 'scene-1',
  '1207:117': 'interaction',
  '1207:13': 'discussion',
  '1207:119': 'work-moment',
  '1207:125': 'character-state',
  '1207:127': 'office-detail',
  '1207:22': 'scene-2',
  '1207:26': 'female-back',
}
```

---

## ✅ 验证检查清单

### 准备阶段
- [ ] 已创建 `public/images/timeline/` 文件夹
- [ ] 从 Figma 导出了全部 28 张图片
- [ ] 图片已按照精确尺寸导出
- [ ] 图片文件名符合命名规范

### 优化阶段
- [ ] 所有图片已压缩优化
- [ ] 总文件大小 < 5MB
- [ ] 图片格式为 WebP 或 JPG
- [ ] 图片质量可接受 (80-85%)

### 集成阶段
- [ ] 图片已放入正确目录
- [ ] 代码中的路径已更新
- [ ] 测试所有图片能正常加载
- [ ] 检查移动端显示效果

---

## 🐛 常见问题

### Q1: 图片不显示？
```
检查：
1. 路径是否正确 (/images/timeline/xxx.jpg)
2. 文件名大小写是否匹配
3. 文件扩展名是否正确
4. public 文件夹结构是否正确
```

### Q2: 图片模糊？
```
解决：
1. 确保导出尺寸与设计稿一致
2. 使用 2x 或 3x 导出以支持高清屏
3. 检查 Next.js Image quality 设置
```

### Q3: 加载缓慢？
```
优化：
1. 压缩图片到 50-200KB/张
2. 使用 WebP 格式
3. 启用懒加载
4. 使用 CDN (可选)
```

### Q4: 图片变形？
```
检查：
1. 导出时保持原始纵横比
2. CSS 中使用 object-fit: cover
3. 容器宽高比是否正确
```

---

## 📊 性能目标

| 指标 | 目标值 |
|------|--------|
| 单张图片大小 | < 200KB |
| 总图片大小 | < 5MB |
| 首屏加载时间 | < 3s |
| LCP (最大内容绘制) | < 2.5s |
| 图片格式 | WebP 优先 |

---

## 💡 专业提示

1. **使用占位符**: 开发时可以使用 `placeholder="blur"` 提升体验
2. **响应式图片**: 考虑为移动端提供更小尺寸的图片
3. **CDN加速**: 生产环境建议使用 Vercel/Cloudinary 等 CDN
4. **监控性能**: 使用 Lighthouse 定期检查性能指标

---

**下一步**: 准备好所有图片后，更新 `StoryTimelineLayout.tsx` 中的占位代码为真实 Image 组件。



