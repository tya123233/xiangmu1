export interface StoryPanel {
  id: number
  title: string
  content: string
  backgroundImage?: string
  image?: string
  images?: string[]
  background?: string
  parallaxImage?: string // 视差滚动图片
}

export interface Chapter {
  id: number
  title: string
  panelIndex: number
  icon?: string
}

export interface StoryData {
  panels: StoryPanel[]
  chapters: Chapter[]
}

export const storyData: StoryData = {
  panels: [
    {
      id: 0,
      title: 'AGAIN',
      content: '',
      background: '#ffffff',
    },
    {
      id: 1,
      title: '',
      content: '在无尽的黑暗中|我们曾迷失方向|但每一次跌倒|都是为了更好地站起',
      background: 'linear-gradient(180deg, #ffffff 0%, #888888 20%, #000000 40%, #000000 100%)',
    },
    {
      id: 2,
      title: '序章：觉醒',
      content: '在一个遥远的星球上，一位年轻的探险家睁开了眼睛。周围是陌生的蓝色森林，空气中弥漫着神秘的光芒...',
      background: '#ffffff',
      images: [
        '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        '/images/b20bd68ec7411c5475548305884a58da.png',
      ],
    },
    {
      id: 3,
      title: '第一章：探索',
      content: `他小心翼翼地走进森林深处。

奇异的生物在树枝间跳跃，发出悦耳的鸣叫声。

高耸的树木遮蔽了天空，但森林中却并不黑暗。

无数发光的植物如同星辰般点缀其间，为这片神秘的世界增添了梦幻的色彩。

空气中弥漫着甜美的花香，让人心旷神怡。

这个世界充满了未知的奇迹，每一步都是新的发现。

他感受到一种从未有过的兴奋和期待，仿佛整个宇宙都在等待着他去探索。

前方的道路虽然未知，但他的内心充满了勇气和希望。`,
      background: '#ffffff',
    },
    {
      id: 4,
      title: '',
      content: '',
      parallaxImage: '/images/office-clock.png',
      background: 'transparent',
    },
    {
      id: 5,
      title: '第二章：相遇',
      content: '突然，一个神秘的身影出现在眼前。她穿着发光的长袍，手中握着一颗闪烁的水晶。\n\n"欢迎来到艾瑟里亚，勇敢的旅人。"',
      background: '#ffffff',
    },
    {
      id: 6,
      title: '第三章：传说',
      content: '她讲述了这个星球的古老传说：千年前，一场灾难几乎摧毁了一切。只有传说中的"光之碎片"才能恢复平衡。',
      background: '#ffffff',
    },
    {
      id: 7,
      title: '尾声：新的开始',
      content: '"你愿意帮助我们找到这些碎片吗？" 她伸出手，眼中闪烁着希望的光芒。\n\n这只是冒险的开始...',
      background: '#ffffff',
    },
  ],
  chapters: [
    {
      id: 1,
      title: '觉醒',
      panelIndex: 2,
      icon: '🌅',
    },
    {
      id: 2,
      title: '探索',
      panelIndex: 3, // 第一章：探索
      icon: '🌲',
    },
    {
      id: 3,
      title: '相遇',
      panelIndex: 5, // 第二章：相遇
      icon: '✨',
    },
    {
      id: 4,
      title: '传说',
      panelIndex: 6, // 第三章：传说
      icon: '📜',
    },
  ],
}

