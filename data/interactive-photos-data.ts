import { PhotoWithDialogs } from '@/components/ClickablePhoto'

/**
 * 交互式照片示例数据
 * 
 * 每张照片可以有多个对话框，点击照片依次显示
 * 
 * 位置说明：
 * - position: 照片在页面中的绝对定位
 * - dialogs[].position: 对话框相对照片的位置
 */
export const interactivePhotosData: PhotoWithDialogs[] = [
  {
    id: 'photo-1',
    image: '/images/office-clock.png',
    alt: '办公室时钟',
    position: {
      top: '15%',
      left: '10%',
    },
    dialogs: [
      {
        id: 'dialog-1-1',
        text: '这是办公室的时钟，它见证了无数个加班的夜晚 🕐',
        position: 'right',
      },
      {
        id: 'dialog-1-2',
        text: '每当它指向深夜十二点，我都在想：明天还要早起...',
        position: 'bottom',
      },
      {
        id: 'dialog-1-3',
        text: '但这些努力都是值得的！💪',
        position: 'right',
      },
    ],
  },
  {
    id: 'photo-2',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '团队合影',
    position: {
      top: '20%',
      right: '15%',
    },
    dialogs: [
      {
        id: 'dialog-2-1',
        text: '这是我们团队的第一次合影 📸',
        position: 'left',
      },
      {
        id: 'dialog-2-2',
        text: '那时候大家都很青涩，但充满激情！',
        position: 'bottom',
      },
    ],
  },
  {
    id: 'photo-3',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '项目启动会',
    position: {
      top: '55%',
      left: '20%',
    },
    dialogs: [
      {
        id: 'dialog-3-1',
        text: '项目启动会的那一天，我们定下了宏伟的目标 🎯',
        position: 'top',
      },
    ],
  },
  {
    id: 'photo-4',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '用户访谈',
    position: {
      bottom: '15%',
      right: '20%',
    },
    dialogs: [
      {
        id: 'dialog-4-1',
        text: '这是我们进行用户访谈的场景 🎤',
        position: 'top',
      },
      {
        id: 'dialog-4-2',
        text: '通过深入了解用户需求，我们找到了正确的方向。',
        position: 'left',
      },
      {
        id: 'dialog-4-3',
        text: '用户的反馈让我们的产品更加贴近实际需求 ✨',
        position: 'top',
      },
    ],
  },
  {
    id: 'photo-5',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '产品原型',
    position: {
      top: '50%',
      left: '50%',
    },
    className: 'transform -translate-x-1/2 -translate-y-1/2',
    dialogs: [
      {
        id: 'dialog-5-1',
        text: '这是我们的第一版产品原型 🎨',
        position: 'center',
      },
      {
        id: 'dialog-5-2',
        text: '虽然很简陋，但包含了我们所有的创意和心血。',
        position: 'center',
      },
    ],
  },
]

/**
 * 更多示例数据 - 用于背景调研页面
 */
export const researchPhotosData: PhotoWithDialogs[] = [
  {
    id: 'research-1',
    image: '/images/office-clock.png',
    alt: '时间管理研究',
    position: {
      top: '10%',
      left: '5%',
    },
    dialogs: [
      {
        id: 'research-1-1',
        text: '我们进行了为期三个月的时间管理研究 📊',
        position: 'right',
      },
      {
        id: 'research-1-2',
        text: '发现用户平均每天浪费 2.5 小时在无效任务上',
        position: 'bottom',
      },
    ],
  },
  {
    id: 'research-2',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '竞品分析',
    position: {
      top: '10%',
      right: '5%',
    },
    dialogs: [
      {
        id: 'research-2-1',
        text: '竞品分析帮助我们了解市场现状 🔍',
        position: 'left',
      },
      {
        id: 'research-2-2',
        text: '我们发现了三个主要的差异化机会点',
        position: 'bottom',
      },
      {
        id: 'research-2-3',
        text: '这些发现指导了我们后续的产品设计 💡',
        position: 'left',
      },
    ],
  },
  {
    id: 'research-3',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '用户画像',
    position: {
      bottom: '15%',
      left: '15%',
    },
    dialogs: [
      {
        id: 'research-3-1',
        text: '基于 50+ 用户访谈，我们建立了详细的用户画像 👥',
        position: 'top',
      },
    ],
  },
  {
    id: 'research-4',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '需求优先级',
    position: {
      bottom: '15%',
      right: '15%',
    },
    dialogs: [
      {
        id: 'research-4-1',
        text: '通过 Kano 模型，我们确定了需求优先级 📈',
        position: 'top',
      },
      {
        id: 'research-4-2',
        text: '基本型需求 → 期望型需求 → 兴奋型需求',
        position: 'left',
      },
    ],
  },
]

/**
 * 辅助函数：根据屏幕尺寸调整照片位置（响应式）
 */
export function getResponsivePhotoPosition(
  photo: PhotoWithDialogs,
  isMobile: boolean
): PhotoWithDialogs {
  if (!isMobile) return photo

  // 移动端：将所有照片调整为垂直排列
  const index = interactivePhotosData.findIndex((p) => p.id === photo.id)
  return {
    ...photo,
    position: {
      top: `${20 + index * 25}%`,
      left: '50%',
    },
    className: `${photo.className || ''} transform -translate-x-1/2`,
  }
}

