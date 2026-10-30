# 张子璇 · 个人设计作品集

React 19 + Vite 6 本地基础版，主版心最大 1700px，PC 优先并适配移动端。

## 当前版本：CHROME / EDITORIAL

使用用户提供的 `字母.png` 与 `人.png` 两张透明素材分别构建字标层和人物层，保留原图，不合成为扁平背景。首页采用黑白银灰、居中人物、后置液态金属字标、点阵轨道与两侧少量注释，增加留白。首屏采用鼠标驱动的分层视差，支持暂停及系统减少动态效果设置。

导航在滚入第二屏后成为固定悬浮栏，使用半透明背景、细描边、`backdrop-filter: blur(24px)` 与阴影实现磨砂玻璃质感；滚回首屏会恢复原始导航，当前章节同步高亮。

- `src/ChromeHero.jsx`：首页分层、轨道和指针视差。
- `src/chrome.css`：当前整站视觉、浮动导航与响应式样式。
- `src/refinements.css`：金属字原始比例、人物背后轮廓外发光、信息层级和时间线交互。
- `src/ProfileSection.jsx`：缩小的生活照、联系方式、项目数据及 Figma / PS / AI / C4D 软件图标。
- `src/JourneySection.jsx`：独立工作经历章节，六段经历左右交错，以居中竖线连接；悬停或键盘聚焦时，平行短线渐亮，卡片背景以较低亮度响应。
- `public/images/chrome-portfolio.png`：用户提供的金属字标。
- `public/images/chrome-person.png`：用户提供的人物透明素材。

新增 `src/editorial.css`：黄绿 / 亮蓝跳色、加粗无衬线标题、浅色个人介绍与黄绿数据区；人物未悬停时显示独立轮廓阴影层，悬停时阴影淡出并切换为紧贴轮廓的外发光。

后面的 IGNITE 和个人肖像拼贴说明为旧版本素材记录；这些旧版 CSS 和背景已不再用于当前首页。

首页金属字按 2268:972 原始比例显示。人物鼠标视差范围为水平 ±42px、垂直 ±22px，金属字反向移动；悬停人物时，人物始终保持压暗后的亮度，身后轮廓光晕以 1.2 秒缓缓显现，移出时渐隐。首页身份信息为 UI设计师、平面设计、产品助理。

当前视觉版本：**IGNITE**。依据用户提供的 MV 截图提取酒红、洋红舞台光、橙金边光、星芒和镜面材质。全站采用统一无衬线字体；主视觉为原创 AI 生成舞台，并未使用 MV 人物或截图作为网站背景。

当前首页首图已按用户的新要求替换为 **个人肖像拼贴横幅**：以用户提供的海报为底图、用户照片为五官参考，使用内置 Imagegen 完成换脸、文字移除与横向扩图。首页局部配色调整为钴蓝与柠檬黄，其他模块保留 IGNITE 色系。图片使用轻微缩放动画，可暂停，也遵循系统减少动态效果设置。此前的舞台素材作为旧版本保留，首页不再加载原舞台视频。

- 首图原始文件：`public/images/zixuan-editorial-hero.png`
- 首图网页文件：`public/images/zixuan-editorial-hero.webp`
- 编辑提示词记录：`public/images/zixuan-editorial-hero.prompt.md`
- 首页局部样式：`src/portrait-hero.css`

## 运行

```sh
pnpm install
pnpm dev
```

也可使用 `npm install` 和 `npm run dev`。终端会显示本地地址。

```sh
pnpm build
pnpm preview
```

生产构建生成 `dist/`，可用于静态托管。本版本未部署到互联网。

## 内容与素材

- `src/main.jsx`：个人信息、工作经历、精选项目和能力数据，及页面组件。
- `src/styles.css`：颜色、字号、布局、响应式与交互样式。
- `src/ignite.css`：IGNITE 版本的配色、排版、舞台装饰和响应式样式。
- `public/images/portrait.jpg`：从用户提供的简历中提取的头像。
- `public/images/project-*.svg`：为基础版制作的项目视觉示意，**不是原始项目设计稿**。品牌封面中的图形和字标同样是示意。
- `public/images/hero-sculpture.svg`：原创参数化线条雕塑，视频不可用时作为首屏海报。
- `public/media/hero-motion.webm`：本地无声循环视频，无第三方视频依赖。
- `public/images/ignite-stage.webp`：当前原创舞台背景，视频加载前与减少动态效果时使用。
- `public/media/ignite-motion.webm`：当前本地舞台视频，含缓慢镜头运动、光晕与上升火星。可暂停；系统偏好减少动态效果时默认不播放。
- `public/images/project-*-ignite.svg`：新版作品展示框；界面示意本身的业务配色保持不变。

### 替换作品长图

将作品原图放入 `public/images/`。在 `src/main.jsx` 顶部的 `projects` 数据中，为对应项目设置 `detailImage: '/images/your-project-long.jpg'`，即可覆盖默认示意长图。`image` 控制卡片封面。替换后将对应项目的 `isDemo` 设为 `false` 可去掉示意标记。

首版项目背景、职责、任职时间来自简历。薪资、年龄和性别未放入网站。联系方式按用户要求展示；公开发布前可按需调整。

## 已有交互

锚点导航、视频暂停、工作经历展开、项目分类筛选、可滚动详情弹窗、下一项目、Esc 关闭、点击遮罩关闭、关闭后焦点返回、邮箱复制、电话与邮件链接、回到顶部。遵循减少动态效果的系统设置。

`scripts/` 中的素材生成程序为本次开发辅助工具，含本机路径；网站运行和构建不依赖这些程序。重新生成时需先按本机环境修改路径。



## 设计能力卡片选择器

采用用户提供的 React Bits ReflectiveCard 源码，保留 WebGL 金属反射、柔光和鼠标倾斜。自定义能力内容，默认图标改用本地 SVG，无新增运行依赖。选择卡片、分类按钮、前后箭头或方向键均可切换；选中卡片居中，其余卡片缩小排列。支持减少动态效果，窄屏保留中心卡片与两侧预览。组件位于 src/ExpertiseCards.jsx 与 src/ReflectiveCard.jsx。


## GridScan 与蓝色视觉系统

首屏集成用户提供的 React Bits GridScan 源码（src/GridScan.jsx），使用蓝色扫描、透视网格、鼠标视差与点击波纹。保持在首页裁切内，支持原有暂停按钮和系统减少动态效果；摄像头与陀螺仪均关闭。src/blueprint.css 将亮蓝延伸到软件区、当前经历、作品筛选栏和选中能力卡片；src/DesignMark.jsx 提供本地 SVG 地球、星芒、箭头、笑脸。


最新首屏：GridScan 扫描色 #2bff22，网格线 #4d4757；移除人物背后阴影和投影，保留暗色人物及悬停轮廓光。人物视差缩至水平 ±18px、垂直 ±10px，网格 parallax 降至 0.2。


## 当前首屏背景：SoftAurora

以用户提供的 SoftAurora 替换 GridScan，颜色 #8cff22 / #0071ff，速度 0.6，鼠标影响 0.15。保留原有人物、金属字、无人物阴影和首页裁切边界；暂停按钮冻结极光动画，系统减少动态效果使用静态画面。GridScan 文件仅作为旧版源码保留，不再加载。


## 当前首屏背景：MagicRings

使用用户提供的 MagicRings 源码替换 SoftAurora，采用 #A855F7 / #6366F1 紫蓝脉冲光环，共六层，hoverScale 1.05、parallax 0.015。接入现有暂停控制，保留人物无阴影、轻微视差与首页裁切。修正原组件 WebGL 矩阵上传格式，以符合 WebGL 的 transpose=false 要求。


MagicRings 最新配色以用户明确指定值为准：内圈 #c1ff2f，外圈 #004fff，覆盖附件中的紫蓝示例。


MagicRings 外圈最新改为白色 #ffffff，内圈保留 #c1ff2f。


字标比例优化：以原始透明字标的连通区域生成九个 SVG 字形遮罩，复用原始金属图片显示各字母，分别水平错位以增加字距，保持字形比例。桌面字标宽度调整为 81% / 最大1480px，上移20px；人物高度由94%降至88%。遮罩生成脚本位于 tmp/letter-masks.py（临时工具），生成的 SVG 作为正式静态资源保留。


人物素材修复：首屏改用 public/images/chrome-person-refined.png，为内置 imagegen 的透明边缘与发丝细节修复版。原始 chrome-person.png 完整保留。生成提示词记录于 public/images/chrome-person-refined.prompt.md。图片为 AI 重建修复，并非逐像素无损放大。


最新人物处理：使用内置 imagegen 对 chrome-person-refined.png 做局部脸部光线与耳机材质优化，保存为 chrome-person-material.png，提示词同名 .prompt.md。取消全局 gamma 压暗，脸部由独立柔边遮罩局部降亮，耳机不受滤镜影响。悬停光晕恢复为 0.9 不透明度、12px 柔光和 1.025 缩放。


用户回退：首屏恢复原始 chrome-person.png 与原有 chrome-low-key 压暗方式，移除脸部局部遮罩，不再使用 AI 修复与材质版。光晕恢复为收紧前的 0.9 不透明度、12px 模糊及1.025缩放。


耳机单独替换：底层继续使用原始 chrome-person.png 与原压暗滤镜；叠加用户本次提供的 chrome-headphone-reference.png，通过 headphone-only-mask.svg 仅显示耳罩、连接件与头梁。耳机图层不使用压暗滤镜，脸部/发丝/衣服保持底层原图，悬停光晕参数不变。

