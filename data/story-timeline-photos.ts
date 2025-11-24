import { PhotoWithDialogs } from '@/components/ClickablePhoto'

/**
 * 故事时间线照片数据
 * 
 * 这是主要的故事展示页面，展示办公室恋情的完整故事
 */
export const storyTimelinePhotos: PhotoWithDialogs[] = [
  // 第1张 - 办公室时钟
  {
    id: 'story-photo-1',
    image: '/images/office-clock.png',
    alt: '办公室时钟',
    position: {
      top: '5%',
      left: '10%',
    },
    dialogs: [
      {
        id: 'dialog-1-1',
        text: 'fn：那你们是怎么遇见的？',
        position: 'bottom',
      },
      {
        id: 'dialog-1-2',
        text: 'rn：我们是同一天入职的。你知道那种...第一天上班的紧张感吗？',
        position: 'right',
      },
    ],
  },

  // 第2张 - 团队照片
  {
    id: 'story-photo-2',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '初次相遇',
    position: {
      top: '8%',
      right: '15%',
    },
    dialogs: [
      {
        id: 'dialog-2-1',
        text: 'fn：然后呢？',
        position: 'left',
      },
      {
        id: 'dialog-2-2',
        text: 'rn：然后...就是工作啊。她坐在斜对角，有时候我会看到她托着下巴思考的样子。',
        position: 'bottom',
      },
    ],
  },

  // 第3张 - 思考的女孩
  {
    id: 'story-photo-3',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '工作中的她',
    position: {
      top: '18%',
      left: '15%',
    },
    dialogs: [
      {
        id: 'dialog-3-1',
        text: 'fn：听起来你注意到很多细节。',
        position: 'right',
      },
      {
        id: 'dialog-3-2',
        text: 'rn：是啊...她托着下巴的样子特别可爱，像在思考世界的奥秘。',
        position: 'bottom',
      },
    ],
  },

  // 第4张 - 喝咖啡
  {
    id: 'story-photo-4',
    image: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    alt: '咖啡时光',
    position: {
      top: '28%',
      right: '20%',
    },
    dialogs: [
      {
        id: 'dialog-4-1',
        text: 'rn：有一次我们一起去吃冰激凌，她坚持要拍我舔冰激凌的样子，说我像只小猫。',
        position: 'left',
      },
      {
        id: 'dialog-4-2',
        text: 'fn：哈哈，听起来很甜蜜啊！',
        position: 'bottom',
      },
    ],
  },

  // 第5张 - 微笑的女孩
  {
    id: 'story-photo-5',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '快乐时光',
    position: {
      top: '40%',
      left: '25%',
    },
    dialogs: [
      {
        id: 'dialog-5-1',
        text: 'fn：你们有没有...更进一步？',
        position: 'right',
      },
    ],
  },

  // 第6张 - 重复使用照片，不同故事
  {
    id: 'story-photo-6',
    image: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    alt: '雨中共伞',
    position: {
      top: '52%',
      right: '18%',
    },
    dialogs: [
      {
        id: 'dialog-6-1',
        text: 'rn：（停顿）有一天下雨，我们共撑一把伞走回家。雨很大，伞很小，我们贴得很近...',
        position: 'left',
      },
      {
        id: 'dialog-6-2',
        text: '那一刻，我能听到她的心跳。',
        position: 'bottom',
      },
    ],
  },

  // 第7张 - 思考的表情
  {
    id: 'story-photo-7',
    image: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    alt: '深思',
    position: {
      top: '64%',
      left: '20%',
    },
    dialogs: [
      {
        id: 'dialog-7-1',
        text: 'fn：看起来你们真的很喜欢彼此。',
        position: 'right',
      },
    ],
  },

  // 第8张 - 最后
  {
    id: 'story-photo-8',
    image: '/images/b20bd68ec7411c5475548305884a58da.png',
    alt: '结局',
    position: {
      top: '76%',
      left: '50%',
    },
    className: 'transform -translate-x-1/2',
    dialogs: [
      {
        id: 'dialog-8-1',
        text: 'rn：（苦笑）其实...我们没有在一起。',
        position: 'bottom',
      },
      {
        id: 'dialog-8-2',
        text: '她后来说，她把我当作最好的朋友。',
        position: 'bottom',
      },
      {
        id: 'dialog-8-3',
        text: 'fn：对不起...',
        position: 'bottom',
      },
      {
        id: 'dialog-8-4',
        text: 'rn：没关系。有些故事，不需要结局也很美好。',
        position: 'bottom',
      },
    ],
  },
]

/**
 * 移动端优化的照片数据
 * 垂直排列，间距更大
 */
export const storyTimelinePhotosMobile: PhotoWithDialogs[] = storyTimelinePhotos.map((photo, index) => ({
  ...photo,
  position: {
    top: `${10 + index * 15}%`,
    left: '50%',
  },
  className: 'transform -translate-x-1/2',
}))

