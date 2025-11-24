/**
 * Joiners 精确布局配置
 * 从 Figma 设计导入的精确布局数据
 * 提取自 Figma Desktop - Page 1
 */

export interface PanelLayout {
  panelId: string
  // 位置（百分比）
  left: number
  top: number
  // 尺寸（像素）
  width: number
  height: number
  // 旋转角度
  rotation: number
  // 层级
  zIndex: number
  // 图片路径（可选）
  imagePath?: string
}

/**
 * 从 Figma 提取的精确布局
 * 
 * Figma 画布坐标范围：
 * - X: -5836 到 -2263 (右边界 = -3125 + 862)，总宽 = 3573px
 * - Y: -2646 到 714 (下边界 = -508 + 1222)，总高 = 3360px
 * 
 * 所有坐标已转换为相对于画布左上角的百分比位置
 * 所有照片均为正向（rotation: 0）
 */
export const figmaImportedLayout: PanelLayout[] = [
  // 0_2 1 - x=-3742, y=-2646
  { 
    panelId: 'panel-1-1', 
    left: 58.6,  // (-3742 - (-5836)) / 3573 * 100
    top: 0,      // (-2646 - (-2646)) / 3360 * 100
    width: 670, 
    height: 1033, 
    rotation: 0, 
    zIndex: 11,
    imagePath: '0_2.jpg'
  },
  
  // 0_2 3 - x=-4714, y=-2130 (横版大图)
  { 
    panelId: 'panel-1-2', 
    left: 31.4,  // (-4714 - (-5836)) / 3573 * 100
    top: 15.4,   // (-2130 - (-2646)) / 3360 * 100
    width: 1010, 
    height: 632, 
    rotation: 0, 
    zIndex: 3,
    imagePath: '0_2.jpg'
  },
  
  // 0_2 4 - x=-3707, y=-1613
  { 
    panelId: 'panel-1-3', 
    left: 59.6,  // (-3707 - (-5836)) / 3573 * 100
    top: 30.7,   // (-1613 - (-2646)) / 3360 * 100
    width: 695, 
    height: 1006, 
    rotation: 0, 
    zIndex: 10,
    imagePath: '0_2.jpg'
  },
  
  // 0_2 6 - x=-4629, y=-1535
  { 
    panelId: 'panel-1-4', 
    left: 33.8,  // (-4629 - (-5836)) / 3573 * 100
    top: 33.1,   // (-1535 - (-2646)) / 3360 * 100
    width: 471, 
    height: 1099, 
    rotation: 0, 
    zIndex: 5,
    imagePath: '0_2.jpg'
  },
  
  // u7985661774...wide_full_body 2 - x=-5836, y=-1491
  { 
    panelId: 'panel-1-5', 
    left: 0,     // (-5836 - (-5836)) / 3573 * 100
    top: 34.4,   // (-1491 - (-2646)) / 3360 * 100
    width: 756, 
    height: 1275, 
    rotation: 0, 
    zIndex: 12,
    imagePath: 'u7985661774_anime_style_wide_full_body_shot_rainy_day_scene_y_4ffbfaac-d8b1-4a31-a288-9650554a654f_1.png'
  },
  
  // u7985661774...wide_full_body 3 - x=-5080, y=-1958
  { 
    panelId: 'panel-1-6', 
    left: 21.2,  // (-5080 - (-5836)) / 3573 * 100
    top: 20.5,   // (-1958 - (-2646)) / 3360 * 100
    width: 564, 
    height: 1284, 
    rotation: 0, 
    zIndex: 8,
    imagePath: 'u7985661774_anime_style_wide_full_body_shot_rainy_day_scene_y_4ffbfaac-d8b1-4a31-a288-9650554a654f_1.png'
  },
  
  // u7985661774...wide-angle 2 - x=-4394, y=-1550
  { 
    panelId: 'panel-1-7', 
    left: 40.4,  // (-4394 - (-5836)) / 3573 * 100
    top: 32.6,   // (-1550 - (-2646)) / 3360 * 100
    width: 792, 
    height: 1042, 
    rotation: 0, 
    zIndex: 6,
    imagePath: 'u7985661774_anime_style_wide-angle_long_shot_low_angle_woman__c814024c-adaa-4896-9efa-f8452b32f6e4_3.png'
  },
  
  // u7985661774...wide-angle 3 - x=-3125, y=-2188
  { 
    panelId: 'panel-1-8', 
    left: 75.9,  // (-3125 - (-5836)) / 3573 * 100
    top: 13.6,   // (-2188 - (-2646)) / 3360 * 100
    width: 862, 
    height: 1056, 
    rotation: 0, 
    zIndex: 15,
    imagePath: 'u7985661774_anime_style_wide-angle_long_shot_low_angle_woman__c814024c-adaa-4896-9efa-f8452b32f6e4_3.png'
  },
  
  // Gemini_Generated 2 - x=-5392, y=-674
  { 
    panelId: 'panel-1-9', 
    left: 12.4,  // (-5392 - (-5836)) / 3573 * 100
    top: 58.7,   // (-674 - (-2646)) / 3360 * 100
    width: 802, 
    height: 1176, 
    rotation: 0, 
    zIndex: 9,
    imagePath: 'Gemini_Generated_Image_bxc0wzbxc0wzbxc0.png'
  },
  
  // Gemini_Generated 1 - x=-4622, y=-508
  { 
    panelId: 'panel-1-10', 
    left: 34.0,  // (-4622 - (-5836)) / 3573 * 100
    top: 63.6,   // (-508 - (-2646)) / 3360 * 100
    width: 770, 
    height: 1222, 
    rotation: 0, 
    zIndex: 7,
    imagePath: 'Gemini_Generated_Image_bxc0wzbxc0wzbxc0.png'
  },
]

/**
 * 竖版布局 - 从 Figma 提取
 * 容器：x=6971 y=-2959 width=1440 height=16079
 */
export const verticalLayout: PanelLayout[] = [
  // 顶部横向照片 - cebb6137... - x=7270 y=-2836
  { 
    panelId: 'panel-1-1', 
    left: 20.8,  // (7270-6971)/1440*100
    top: 0.8,    // (-2836-(-2959))/16079*100
    width: 859, 
    height: 235, 
    rotation: 0, 
    zIndex: 3,
    imagePath: '0_2.jpg'
  },
  // 第2张 - 1717a5999... - x=7420 y=-2495
  { 
    panelId: 'panel-1-2', 
    left: 31.2,  // (7420-6971)/1440*100
    top: 2.9,    // (-2495-(-2959))/16079*100
    width: 581, 
    height: 440, 
    rotation: 0, 
    zIndex: 5,
    imagePath: '0_2.jpg'
  },
  // 第3张 - 516f3a3917... - x=7527 y=-1971
  { 
    panelId: 'panel-1-3', 
    left: 38.6,  // (7527-6971)/1440*100
    top: 6.1,    // (-1971-(-2959))/16079*100
    width: 375, 
    height: 448, 
    rotation: 0, 
    zIndex: 7,
    imagePath: '0_2.jpg'
  },
  // 第4张 - 6a452f2edb... - x=7174 y=-1339
  { 
    panelId: 'panel-1-4', 
    left: 14.1,  // (7174-6971)/1440*100
    top: 10.1,   // (-1339-(-2959))/16079*100
    width: 452, 
    height: 689, 
    rotation: 0, 
    zIndex: 6,
    imagePath: '0_2.jpg'
  },
  // 第5张 - 717f628f09... - x=7714 y=-1339
  { 
    panelId: 'panel-1-5', 
    left: 51.6,  // (7714-6971)/1440*100
    top: 10.1,   // (-1339-(-2959))/16079*100
    width: 542, 
    height: 410, 
    rotation: 0, 
    zIndex: 8,
    imagePath: '0_2.jpg'
  },
  // 第6张 - 96ec2d89fc... - x=7155 y=-598
  { 
    panelId: 'panel-1-6', 
    left: 12.8,  // (7155-6971)/1440*100
    top: 14.7,   // (-598-(-2959))/16079*100
    width: 622, 
    height: 572, 
    rotation: 0, 
    zIndex: 4,
    imagePath: '0_2.jpg'
  },
  // 第7张 - u1919795498... - x=7338 y=320
  { 
    panelId: 'panel-1-7', 
    left: 25.5,  // (7338-6971)/1440*100
    top: 20.4,   // (320-(-2959))/16079*100
    width: 714, 
    height: 666, 
    rotation: 0, 
    zIndex: 9,
    imagePath: 'u7985661774_anime_style_wide_full_body_shot_rainy_day_scene_y_4ffbfaac-d8b1-4a31-a288-9650554a654f_1.png'
  },
  // 第8张 - 3769637f3b... - x=7398 y=1083
  { 
    panelId: 'panel-1-8', 
    left: 29.7,  // (7398-6971)/1440*100
    top: 25.1,   // (1083-(-2959))/16079*100
    width: 851, 
    height: 625, 
    rotation: 0, 
    zIndex: 10,
    imagePath: 'u7985661774_anime_style_wide-angle_long_shot_low_angle_woman__c814024c-adaa-4896-9efa-f8452b32f6e4_3.png'
  },
  // 第9张 - image 8 - x=7446 y=1783
  { 
    panelId: 'panel-1-9', 
    left: 33.0,  // (7446-6971)/1440*100
    top: 29.4,   // (1783-(-2959))/16079*100
    width: 490, 
    height: 628, 
    rotation: 0, 
    zIndex: 11,
    imagePath: 'Gemini_Generated_Image_bxc0wzbxc0wzbxc0.png'
  },
  // 第10张 - u1919795498... - x=7316 y=2593
  { 
    panelId: 'panel-1-10', 
    left: 24.0,  // (7316-6971)/1440*100
    top: 34.5,   // (2593-(-2959))/16079*100
    width: 833, 
    height: 529, 
    rotation: 0, 
    zIndex: 12,
    imagePath: 'u7985661774_anime_style_wide_full_body_shot_rainy_day_scene_y_4ffbfaac-d8b1-4a31-a288-9650554a654f_1.png'
  },
]

/**
 * 场景1的布局（使用 Figma 横版导入的数据）
 */
export const scene1Layout: PanelLayout[] = figmaImportedLayout.slice(0, 10)

/**
 * 场景2的布局（9张照片，3x3）
 */
export const scene2Layout: PanelLayout[] = [
  { panelId: 'panel-2-1', left: 15, top: 12, width: 150, height: 190, rotation: -9, zIndex: 5 },
  { panelId: 'panel-2-2', left: 35, top: 8, width: 145, height: 185, rotation: 4, zIndex: 8 },
  { panelId: 'panel-2-3', left: 55, top: 15, width: 140, height: 180, rotation: -6, zIndex: 6 },
  { panelId: 'panel-2-4', left: 12, top: 38, width: 155, height: 195, rotation: 7, zIndex: 3 },
  { panelId: 'panel-2-5', left: 35, top: 42, width: 160, height: 200, rotation: -3, zIndex: 12 },
  { panelId: 'panel-2-6', left: 58, top: 45, width: 145, height: 185, rotation: 8, zIndex: 9 },
  { panelId: 'panel-2-7', left: 18, top: 68, width: 140, height: 180, rotation: -5, zIndex: 7 },
  { panelId: 'panel-2-8', left: 40, top: 72, width: 150, height: 190, rotation: 6, zIndex: 10 },
  { panelId: 'panel-2-9', left: 62, top: 70, width: 135, height: 175, rotation: -8, zIndex: 4 },
]

/**
 * 场景3的布局（6张照片，2x3）
 */
export const scene3Layout: PanelLayout[] = [
  { panelId: 'panel-3-1', left: 20, top: 15, width: 155, height: 195, rotation: 6, zIndex: 5 },
  { panelId: 'panel-3-2', left: 42, top: 12, width: 150, height: 190, rotation: -4, zIndex: 8 },
  { panelId: 'panel-3-3', left: 64, top: 18, width: 145, height: 185, rotation: 7, zIndex: 6 },
  { panelId: 'panel-3-4', left: 18, top: 52, width: 140, height: 180, rotation: -7, zIndex: 9 },
  { panelId: 'panel-3-5', left: 42, top: 55, width: 160, height: 200, rotation: 3, zIndex: 12 },
  { panelId: 'panel-3-6', left: 66, top: 58, width: 145, height: 185, rotation: -5, zIndex: 7 },
]

/**
 * 场景4的布局（8张照片，2x4）
 */
export const scene4Layout: PanelLayout[] = [
  { panelId: 'panel-4-1', left: 15, top: 18, width: 145, height: 185, rotation: -6, zIndex: 5 },
  { panelId: 'panel-4-2', left: 32, top: 15, width: 150, height: 190, rotation: 4, zIndex: 8 },
  { panelId: 'panel-4-3', left: 49, top: 20, width: 140, height: 180, rotation: -8, zIndex: 6 },
  { panelId: 'panel-4-4', left: 66, top: 16, width: 155, height: 195, rotation: 5, zIndex: 10 },
  { panelId: 'panel-4-5', left: 12, top: 55, width: 150, height: 190, rotation: 7, zIndex: 7 },
  { panelId: 'panel-4-6', left: 32, top: 58, width: 145, height: 185, rotation: -4, zIndex: 9 },
  { panelId: 'panel-4-7', left: 52, top: 60, width: 155, height: 195, rotation: 6, zIndex: 11 },
  { panelId: 'panel-4-8', left: 70, top: 56, width: 140, height: 180, rotation: -7, zIndex: 4 },
]

/**
 * 获取场景的布局配置
 */
export function getSceneLayout(sceneId: string): PanelLayout[] {
  switch (sceneId) {
    case 'scene-1':
      return scene1Layout
    case 'scene-2':
      return scene2Layout
    case 'scene-3':
      return scene3Layout
    case 'scene-4':
      return scene4Layout
    default:
      return scene1Layout
  }
}

