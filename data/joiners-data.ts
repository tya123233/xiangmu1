/**
 * David Hockney "Joiners" 拼贴数据
 * 每个场景包含多个小图片面板，这些面板共同组成一个拼贴画
 */

export interface JoinerPanel {
  id: string
  imageUrl: string
  // 在拼贴网格中的位置和尺寸
  gridColumn: string // e.g., "1 / 3" (从第1列到第3列)
  gridRow: string // e.g., "1 / 2" (从第1行到第2行)
  // 随机旋转角度，模拟 Hockney 的拼贴风格
  rotation?: number
  // 随机偏移，增加自然感
  offsetX?: number
  offsetY?: number
}

export interface JoinerScene {
  id: string
  title: string
  description: string
  // 详情视图中的完整图片
  fullImageUrl: string
  // 拼贴面板数组
  panels: JoinerPanel[]
  // 网格配置
  gridColumns?: number // 默认 4
  gridRows?: number // 默认 3
}

/**
 * Joiners 拼贴场景数据
 */
export const joinersScenes: JoinerScene[] = [
  {
    id: 'scene-1',
    title: '办公室一角',
    description: '一个现代化办公空间的多视角拼贴',
    fullImageUrl: '/images/office-clock.png',
    gridColumns: 4,
    gridRows: 3,
    panels: [
      {
        id: 'panel-1-1',
        imageUrl: '/images/office-clock.png',
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
        rotation: -2,
        offsetX: 2,
        offsetY: -1,
      },
      {
        id: 'panel-1-2',
        imageUrl: '/images/office-clock.png',
        gridColumn: '2 / 3',
        gridRow: '1 / 2',
        rotation: 1,
        offsetX: -1,
        offsetY: 2,
      },
      {
        id: 'panel-1-3',
        imageUrl: '/images/office-clock.png',
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        rotation: -1,
        offsetX: 1,
        offsetY: -2,
      },
      {
        id: 'panel-1-4',
        imageUrl: '/images/office-clock.png',
        gridColumn: '4 / 5',
        gridRow: '1 / 2',
        rotation: 2,
        offsetX: -2,
        offsetY: 1,
      },
      {
        id: 'panel-1-5',
        imageUrl: '/images/office-clock.png',
        gridColumn: '1 / 2',
        gridRow: '2 / 3',
        rotation: 1,
        offsetX: -1,
        offsetY: 1,
      },
      {
        id: 'panel-1-6',
        imageUrl: '/images/office-clock.png',
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        rotation: -2,
        offsetX: 2,
        offsetY: -1,
      },
      {
        id: 'panel-1-7',
        imageUrl: '/images/office-clock.png',
        gridColumn: '3 / 4',
        gridRow: '2 / 3',
        rotation: 1,
        offsetX: -2,
        offsetY: 2,
      },
      {
        id: 'panel-1-8',
        imageUrl: '/images/office-clock.png',
        gridColumn: '4 / 5',
        gridRow: '2 / 3',
        rotation: -1,
        offsetX: 1,
        offsetY: -1,
      },
      {
        id: 'panel-1-9',
        imageUrl: '/images/office-clock.png',
        gridColumn: '1 / 2',
        gridRow: '3 / 4',
        rotation: 2,
        offsetX: -1,
        offsetY: 2,
      },
      {
        id: 'panel-1-10',
        imageUrl: '/images/office-clock.png',
        gridColumn: '2 / 3',
        gridRow: '3 / 4',
        rotation: -1,
        offsetX: 1,
        offsetY: -2,
      },
      {
        id: 'panel-1-11',
        imageUrl: '/images/office-clock.png',
        gridColumn: '3 / 4',
        gridRow: '3 / 4',
        rotation: 1,
        offsetX: -2,
        offsetY: 1,
      },
      {
        id: 'panel-1-12',
        imageUrl: '/images/office-clock.png',
        gridColumn: '4 / 5',
        gridRow: '3 / 4',
        rotation: -2,
        offsetX: 2,
        offsetY: -1,
      },
    ],
  },
  {
    id: 'scene-2',
    title: '彩色抽象',
    description: '充满活力的色彩组合',
    fullImageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    gridColumns: 3,
    gridRows: 3,
    panels: [
      {
        id: 'panel-2-1',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
        rotation: -3,
        offsetX: 3,
        offsetY: -2,
      },
      {
        id: 'panel-2-2',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '2 / 3',
        gridRow: '1 / 2',
        rotation: 2,
        offsetX: -2,
        offsetY: 3,
      },
      {
        id: 'panel-2-3',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        rotation: -1,
        offsetX: 2,
        offsetY: -3,
      },
      {
        id: 'panel-2-4',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '1 / 2',
        gridRow: '2 / 3',
        rotation: 2,
        offsetX: -3,
        offsetY: 2,
      },
      {
        id: 'panel-2-5',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        rotation: -2,
        offsetX: 2,
        offsetY: -2,
      },
      {
        id: 'panel-2-6',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '3 / 4',
        gridRow: '2 / 3',
        rotation: 3,
        offsetX: -2,
        offsetY: 2,
      },
      {
        id: 'panel-2-7',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '1 / 2',
        gridRow: '3 / 4',
        rotation: -2,
        offsetX: 2,
        offsetY: 3,
      },
      {
        id: 'panel-2-8',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '2 / 3',
        gridRow: '3 / 4',
        rotation: 1,
        offsetX: -2,
        offsetY: -2,
      },
      {
        id: 'panel-2-9',
        imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
        gridColumn: '3 / 4',
        gridRow: '3 / 4',
        rotation: -3,
        offsetX: 3,
        offsetY: -2,
      },
    ],
  },
  {
    id: 'scene-3',
    title: '蓝色调',
    description: '宁静的蓝色世界',
    fullImageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    gridColumns: 3,
    gridRows: 2,
    panels: [
      {
        id: 'panel-3-1',
        imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
        rotation: 2,
        offsetX: -2,
        offsetY: 2,
      },
      {
        id: 'panel-3-2',
        imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        gridColumn: '2 / 3',
        gridRow: '1 / 2',
        rotation: -1,
        offsetX: 1,
        offsetY: -2,
      },
      {
        id: 'panel-3-3',
        imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        rotation: 2,
        offsetX: -1,
        offsetY: 2,
      },
      {
        id: 'panel-3-4',
        imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        gridColumn: '1 / 2',
        gridRow: '2 / 3',
        rotation: -2,
        offsetX: 2,
        offsetY: -1,
      },
      {
        id: 'panel-3-5',
        imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        rotation: 1,
        offsetX: -2,
        offsetY: 1,
      },
      {
        id: 'panel-3-6',
        imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
        gridColumn: '3 / 4',
        gridRow: '2 / 3',
        rotation: -1,
        offsetX: 1,
        offsetY: -2,
      },
    ],
  },
  {
    id: 'scene-4',
    title: '粉色梦境',
    description: '温柔的粉色调拼贴',
    fullImageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    gridColumns: 4,
    gridRows: 2,
    panels: [
      {
        id: 'panel-4-1',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
        rotation: -2,
        offsetX: 2,
        offsetY: -2,
      },
      {
        id: 'panel-4-2',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '2 / 3',
        gridRow: '1 / 2',
        rotation: 1,
        offsetX: -1,
        offsetY: 2,
      },
      {
        id: 'panel-4-3',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        rotation: -1,
        offsetX: 1,
        offsetY: -1,
      },
      {
        id: 'panel-4-4',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '4 / 5',
        gridRow: '1 / 2',
        rotation: 2,
        offsetX: -2,
        offsetY: 1,
      },
      {
        id: 'panel-4-5',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '1 / 2',
        gridRow: '2 / 3',
        rotation: 1,
        offsetX: -2,
        offsetY: 2,
      },
      {
        id: 'panel-4-6',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        rotation: -2,
        offsetX: 2,
        offsetY: -1,
      },
      {
        id: 'panel-4-7',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '3 / 4',
        gridRow: '2 / 3',
        rotation: 1,
        offsetX: -1,
        offsetY: 1,
      },
      {
        id: 'panel-4-8',
        imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
        gridColumn: '4 / 5',
        gridRow: '2 / 3',
        rotation: -1,
        offsetX: 1,
        offsetY: -2,
      },
    ],
  },
]

