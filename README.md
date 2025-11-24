# 交互式数字叙事网站

现代化的交互式数字叙事平台，包含两个核心项目：
- **交互式故事** - 全屏面板展示，支持多种交互方式
- **Joiners 拼贴** ✨ - 灵感来自 David Hockney，使用 Framer Motion 实现共享元素过渡

![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-green)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-ff69b4)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问页面：
- 主页: http://localhost:3000
- 交互式故事: http://localhost:3000/story
- Joiners 拼贴: http://localhost:3000/joiners ✨

## 🛠️ 技术栈

- **Next.js 15.1.8** + **React 19.0.0** + **TypeScript 5.6.3**
- **GSAP 3.12.5** - 故事动画
- **Framer Motion 12.23.24** - Joiners 拼贴动画
- **Tailwind CSS 3.4.17** - 样式
- **Hammer.js 2.0.8** - 手势识别

## ✨ 核心特性

### 交互式故事
- 全屏面板展示、GSAP 动画、多种交互方式、进度指示、响应式设计

### Joiners 拼贴（NEW!）
- 拼贴画廊、layoutId 共享元素过渡、点击展开动画、多场景支持、键盘导航

## 📁 项目结构

```
web22/
├── app/
│   ├── page.tsx              # 首页
│   ├── story/page.tsx        # 交互式故事
│   └── joiners/page.tsx      # Joiners 拼贴 ✨
├── components/
│   ├── StoryContainer.tsx    # 故事主容器
│   ├── JoinersContainer.tsx  # Joiners 主容器 ✨
│   ├── JoinersGrid.tsx       # 拼贴网格 ✨
│   └── JoinersDetailView.tsx # 详情视图 ✨
├── data/
│   ├── story-data.ts         # 故事数据
│   └── joiners-data.ts       # Joiners 数据 ✨
└── hooks/
    └── useGSAPAnimation.ts   # 动画 Hooks
```

## 📖 文档

- [JOINERS_QUICKSTART.md](./JOINERS_QUICKSTART.md) - Joiners 快速开始
- [JOINERS_GUIDE.md](./JOINERS_GUIDE.md) - Joiners 完整指南

## 🚢 部署

```bash
npm run build
npm run start
```

推荐部署到 [Vercel](https://vercel.com)

## 📄 许可证

MIT License

---

**祝你创作愉快！** 🎉
