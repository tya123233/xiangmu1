/**
 * 故事时间线布局数据
 * 
 * 基于 Figma 原始设计的精确像素位置
 * 容器尺寸：1440 x 16079
 */

export interface PhotoPosition {
  left: number      // 像素
  top: number       // 像素
  width: number     // 像素
  height: number    // 像素
}

export interface DialogPosition {
  left: number      // 像素
  top: number       // 像素
  width: number     // 像素
  height: number    // 像素
}

export interface StoryPhoto {
  id: string
  imageUrl: string
  position: PhotoPosition
  zIndex: number
  clickableArea?: {   // 可点击区域（扩大范围）
    left: number
    top: number
    width: number
    height: number
  }
}

export interface StoryDialog {
  id: string
  photoId: string      // 关联的照片 ID
  content: string
  position: DialogPosition
  order: number        // 显示顺序
}

// 容器尺寸
export const CONTAINER_SIZE = {
  width: 1440,
  height: 16079,
}

// 照片数据（保持 Figma 原始位置）
export const storyPhotos: StoryPhoto[] = [
  {
    id: 'photo-1',
    imageUrl: '/images/office-clock.png',
    position: { left: 300, top: 129, width: 859, height: 235 },
    zIndex: 3,
    clickableArea: { left: 200, top: 50, width: 1059, height: 350 },
  },
  {
    id: 'photo-2',
    imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    position: { left: 449, top: 466, width: 581, height: 440 },
    zIndex: 5,
    clickableArea: { left: 349, top: 366, width: 781, height: 640 },
  },
  {
    id: 'photo-3',
    imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    position: { left: 556, top: 981, width: 375, height: 448 },
    zIndex: 7,
    clickableArea: { left: 456, top: 881, width: 575, height: 648 },
  },
  {
    id: 'photo-4',
    imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    position: { left: 203, top: 1624, width: 452, height: 689 },
    zIndex: 6,
    clickableArea: { left: 103, top: 1524, width: 652, height: 889 },
  },
  {
    id: 'photo-5',
    imageUrl: '/images/b20bd68ec7411c5475548305884a58da.png',
    position: { left: 743, top: 1624, width: 542, height: 410 },
    zIndex: 8,
    clickableArea: { left: 643, top: 1524, width: 742, height: 610 },
  },
  {
    id: 'photo-6',
    imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    position: { left: 184, top: 2363, width: 622, height: 572 },
    zIndex: 4,
    clickableArea: { left: 84, top: 2263, width: 822, height: 772 },
  },
  {
    id: 'photo-7',
    imageUrl: '/images/6f0db6cc5fa9bd299c9cad75b17cb6b8.png',
    position: { left: 367, top: 3280, width: 714, height: 666 },
    zIndex: 9,
    clickableArea: { left: 267, top: 3180, width: 914, height: 866 },
  },
  {
    id: 'photo-8',
    imageUrl: '/images/9ca073776a0377dda9f97e54e38e11cc.png',
    position: { left: 428, top: 4035, width: 851, height: 625 },
    zIndex: 10,
    clickableArea: { left: 328, top: 3935, width: 1051, height: 825 },
  },
  {
    id: 'photo-9',
    imageUrl: '/images/b20bd68ec7411c5475548305884a58da.png',
    position: { left: 475, top: 4726, width: 490, height: 628 },
    zIndex: 11,
    clickableArea: { left: 375, top: 4626, width: 690, height: 828 },
  },
  {
    id: 'photo-10',
    imageUrl: '/images/19b4e0f7dd71d1f79ed51ba97566cfb8.png',
    position: { left: 346, top: 5548, width: 833, height: 529 },
    zIndex: 12,
    clickableArea: { left: 246, top: 5448, width: 1033, height: 729 },
  },
]

// 对话框数据（保持 Figma 原始位置）
export const storyDialogs: StoryDialog[] = [
  {
    id: 'dialog-1',
    photoId: 'photo-1',
    content: 'fn：那你们是怎么遇见的？',
    position: { left: 72, top: 241, width: 320, height: 80 },
    order: 1,
  },
  {
    id: 'dialog-2',
    photoId: 'photo-2',
    content: 'rn：我们是同一天入职的。你知道那种...第一天上班的紧张感吗？',
    position: { left: 936, top: 643, width: 360, height: 100 },
    order: 1,
  },
  {
    id: 'dialog-3',
    photoId: 'photo-3',
    content: 'fn：然后呢？',
    position: { left: 115, top: 1367, width: 280, height: 70 },
    order: 1,
  },
  {
    id: 'dialog-4',
    photoId: 'photo-3',
    content: 'rn：然后...就是工作啊。她坐在斜对角，有时候我会看到她托着下巴思考的样子。',
    position: { left: 792, top: 1931, width: 400, height: 120 },
    order: 2,
  },
  {
    id: 'dialog-5',
    photoId: 'photo-4',
    content: 'fn：听起来你注意到很多细节。',
    position: { left: 144, top: 2573, width: 340, height: 80 },
    order: 1,
  },
  {
    id: 'dialog-6',
    photoId: 'photo-6',
    content: 'rn：有一次我们一起去吃冰激凌，她坚持要拍我舔冰激凌的样子，说我像只小猫。',
    position: { left: 835, top: 3055, width: 380, height: 110 },
    order: 1,
  },
  {
    id: 'dialog-7',
    photoId: 'photo-7',
    content: 'fn：你们有没有...更进一步？',
    position: { left: 173, top: 3698, width: 300, height: 75 },
    order: 1,
  },
  {
    id: 'dialog-8',
    photoId: 'photo-8',
    content: 'rn：（停顿）有一天下雨，我们共撑一把伞走回家。雨很大，伞很小，我们贴得很近...',
    position: { left: 749, top: 4341, width: 420, height: 130 },
    order: 1,
  },
  {
    id: 'dialog-9',
    photoId: 'photo-9',
    content: 'fn：看起来你们真的很喜欢彼此。',
    position: { left: 115, top: 5145, width: 340, height: 80 },
    order: 1,
  },
  {
    id: 'dialog-10',
    photoId: 'photo-10',
    content: 'rn：（苦笑）其实...我们没有在一起。',
    position: { left: 792, top: 5789, width: 380, height: 90 },
    order: 1,
  },
]

/**
 * 根据照片 ID 获取关联的对话框
 */
export function getDialogsByPhotoId(photoId: string): StoryDialog[] {
  return storyDialogs
    .filter(dialog => dialog.photoId === photoId)
    .sort((a, b) => a.order - b.order)
}

