# 中文视觉设计记录

当前版本说明：2026-10-24 进一步改为大学实验室官网的图文结构，详见[中文学术主页布局与中英文对齐](chinese-academic-layout.md)。下文保留插画制作及此前视觉迭代的来源；当前首页样式在 `ChineseHome.vue`，共享内页样式在 `chinese-design.css`。

2026-10-23：根据“中文风格太简略了，要丰富点”的反馈，增强中文版的视觉细节和研究表达。页面数量与信息架构保持 29 对页面；共享事实、成员照片、论文状态和外部链接不变。

## 本次修改

- 中文愿景图：保留英文原图中的认知网络、软件界面、机器人、应用场景、中央认知球体与人机协作平台，将图中文字完整本地化。复用原有方向热点和轻量动效，遵循减少动态效果偏好；图下保留可重排的中文文字导航，提供大图入口。
- 首页：扩大插画面积，介绍采用已有研究愿景正文；增加三个主题入口。研究方向卡片使用四种克制的主题色和线条图标，展示来自已有方向记录的首个关键问题；论文卡片展示已有关键词。
- 成员：桌面四列、手机两列，提高头像和姓名的辨识度。
- 资源与洞见：增加栏目层次和重点摘录样式；内页保持相同正文和来源。
- 英文版：保留原有内容和图像。新的视觉规则限定于中文；未新增真实成果、资助、机构、成员或项目链接。

## 文件

- `src/components/ChineseResearchVision.vue`：中文插画、方向入口和大图入口。
- `src/components/ResearchThemeMark.vue`：原生 SVG 研究方向图标。
- `src/chinese-design.css`：中文专用视觉样式。
- `src/views/Home.vue`、`HeroSection.vue`、`ResearchAreaCard.vue`、`src/main.js`：接入新增呈现。
- `src/assets/figures/csma-research-vision-zh-v2.png`：最终中文插画，1774 × 887。
- `README.md`、双语和内容维护文档、`dist/`：同步更新。

## 图像制作与保留

使用 **内置 image_gen 工具**，模式为 `text-localization`，未使用 CLI。编辑目标是现有 `src/assets/figures/csma-home-research-vision.png`。生成结果以新文件名保存；英文原图和首版中文设计的恢复备份保留。

图示为研究愿景的概念插画，不表示真实实验室设施、设备或已完成部署。已目视核查中文标题、方向说明、图标标签、研究原则与主要画面构成。

完整生成提示词如下：

```text
Use case: text-localization.
Asset type: the Chinese research-vision hero illustration for an academic research group website.
Input image 1 is the EDIT TARGET. Produce a fully localized Simplified Chinese counterpart of this exact rich scientific illustration.
Preserve the wide 2:1 composition and all major imagery: luminous network brain and translucent head at upper left; layered software/code windows at upper right; detailed robotic arm at lower left; city and practical application scene at lower right; central cognitive globe with orbital rings and four connecting ribbons; human and robot collaborating at the lower central knowledge platform. Preserve the cool blue, teal and lavender palette, gentle gold in the applications area, soft landscape backdrop, depth, polished scientific 3D illustration, and restrained academic feel. Keep the central globe at the same relative location. This must remain a detailed illustrated research panorama, not a diagram of plain text cards.
Change the English text to sharp, beautifully typeset, correct Simplified Chinese. Rebalance spacing locally to keep Chinese comfortably legible; use clean modern Chinese sans serif typography with clear title hierarchy. Keep every supplied Chinese phrase exact. Do not leave English labels except CSMA.
Text replacement map:
Top small heading: "CSMA 研究愿景"
Main heading: "认知与协同智能"
Subtitle: "面向软件、机器人与实际智能系统"
Upper-left panel heading: "人工智能"
Description: "构建能够推理、规划与适应的认知基础"
Four icon labels: "推理", "规划", "记忆", "反思"
Upper-right panel heading: "智能软件工程"
Description: "研究能够理解需求并持续演化的软件系统"
Four icon labels: "需求", "代码", "调试", "修复"
Lower-left panel heading: "智能机器人"
Description: "探索机器人在实际环境中的感知、规划与行动"
Four icon labels: "感知", "规划", "控制", "具身"
Lower-right panel heading: "应用场景"
Description: "从研究原型走向实际智能系统"
Four icon labels: "原型", "验证", "实际应用", "系统"
Center globe text on three lines: "认知", "协同", "智能"
Orbital ring labels: top "推理", left "感知", right "行动", bottom "共同学习"
Bottom platform heading: "知识与人类反馈"
Bottom platform subtitle: "数据 · 经验 · 领域知识"
Five lower principle labels: "多智能体协同", "持续学习", "安全与对齐", "可扩展性", "实际应用价值"
Bottom footer: "以研究创造更好的未来"
Left edge small decorative wording: "人类", "人工智能", "机器人", "实际世界".
Right edge small decorative wording: "从想法", "走向", "更好的世界".
No additional facts, institutional logos, awards, badges, publication claims, branding, watermark or extra text. Preserve the source artwork; only localize and polish typography. Output a high-resolution landscape image.
```

## 复核

运行 `npm test`、`npm run build` 和 `git diff --check`。浏览器重点检查首页、研究方向、成员布局、研究洞见、中文插画热点，以及 390px 和 320px 手机宽度。中文资产只在中文页面使用，原始论文图和成员照片不重新生成。

## 阅读与交互细化

- 新增 `ImageViewer.vue`，用原生对话框提供大图、原尺寸滚动、适应屏幕和原图入口；支持 Esc、遮罩和关闭按钮，关闭后归还焦点并恢复页面滚动。图片不重新生成。
- 新增 `PublicationTitle.vue`，中文新闻、首页代表论文及完整论文列表先显示阅读题名，再显示英文正式题名；详情页保留正式题名作为主标题。官方元数据共用原记录。
- `Navbar.vue` 与 `i18n.css`：语言切换与菜单按钮至少 44px 高，窄屏重新分配品牌、语言与菜单的宽度；点击菜单外部可关闭。页内导航同样扩大点击范围。
- `InsightDetail.vue`：增加概述、研究思考和参考来源导航；长文内容限制阅读宽度。中文正文采用更舒适的行距和字号。
- `chinese-design.css`：提高图注、小字和成员角色的可读性，统一论文标题层次与行距；论文和项目栏目按实际内容高度排列，关于我们移除重复的内层边框。

页面结构仍为 29 对页面。英文版共用操作与长文阅读改善，中文视觉增强仍限定在中文页面。未新增资料占位或真实成果声明。

2026-10-24 复核结果：31 项自动检查通过，其中双语渲染覆盖 58 个页面；生产构建和 `git diff --check` 通过。浏览器检查了 1512px 桌面、1090px 导航和 390px／320px 手机布局，中英文切换保留文章锚点；验证了图片原尺寸滚动、Tab 双向循环、Esc／遮罩／关闭按钮、焦点归还、手机菜单关闭和研究方向展开。长论文标题已改为整块链接，避免换行间隙无法点击。此次检查未发现浏览器控制台错误或警告。未提交或推送。
