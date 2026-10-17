# 内容维护说明

2026-10-14：用户确认的第九版首页布局已应用到本地项目。网站使用 Vue 3、Vite 与 hash 路由，公开页面为英文。

## 页面与入口

- 品牌和导航 Home 均返回首页；导航依次为 Home、News、Research、Projects、Publications、People、Resources、About，无语言切换。旧 `/zh` 地址返回首页。
- 首页依次为欢迎与愿景图、News、并列的论文与项目、Research、People、Resources、About、原页脚与地球。
- Home 与 Research 愿景图共同使用用户提供的 `Cognitive Collaborative Intelligence Vision.png` 的原样副本，正式保存为 `src/assets/figures/csma-home-research-vision.png`，尺寸为 1774 × 887，与现有容器比例一致。原 SVG 文件仍保留在原路径，共享组件未指定图片时仍可使用原图。
- 两处新图均启用轻量动效：中央水平光环每隔约 12–22 秒随机选择转速、方向与轻微倾角，平滑变速和换向，目标转速相当于每圈约 24–40 秒；较细的第二段光弧同步绕行，外侧光环约 42 秒一周，各区域插图内有 18 个小光点轻微明暗变化，窄屏减少光点。底图保持静止，保留热点提示与方向链接。新的动效组件为 `ResearchVisionMotion.vue`，水平光环的平滑随机运动维护在 `src/utils/visionMotion.js`，通过 `ambientMotion` 单独启用；离开视口或隐藏标签页时暂停，系统减少动态效果时隐藏。原有方向流线、扫描效果和鼠标倾斜不在这两处启用。
- 桌面首屏标题的可见顶边、按钮底边与右图对齐；宽度小于 1180px 时上下排列。四个研究方向采用通栏 2 × 2 卡片，手机单列。
- 首页 Explore Research 使用原深蓝填充；View Publications 改用浅蓝填充，保留原字体、尺寸、边框与圆角。论文列表标题移除额外的 940px 限宽，用满所在内容列；所有论文标题均无手动断行，长标题在列宽不足时自然换行，完整显示。
- News 直接显示论文全名，点击标题进入关联论文；TOSEM 标签为 Journal。不提供 More 或会议地址；All news 保留。SemFaith 状态为 Accepted；News 底部说明和右侧 More 进入 `/news/archive`，按年份归档现有全部动态。所有新闻日期统一显示 YYYY-MM，不显示日；ICSE 2026 和 ASE 2025 标注 CCF A。
- 首页论文与项目的信息行右端放 More，标题也可点击；摘要下不排列 DOI / Code / 系统名链接。
- 每篇论文有 `/publications/:id` 独立介绍；列表和详情的链接统一由 `PublicationLinks.vue` 显示：Paper 直接指向 DOI，GitHub 指向核心或复现代码，Project 指向项目应用介绍。缺失 DOI 时仍显示 Paper 占位入口，悬停、键盘聚焦或点击提示 Coming soon，不填入虚假 DOI 或让空 href 导致页面刷新。标题仍可进入论文详情。
- Resources 依次展示 Research Applications、Research Insights、GitHub。应用保留 CMCS、TraceCoder、SemFaith、ChatREQ，名称与标题右侧 More 进入介绍；不显示类型标签或额外的 System overview / Paper / Code 行。Research Insights 首批为 REA 与 MASS 两篇英文介绍和洞见，复用应用卡片的双栏网格、字体、边框、圆角及填充色，窄屏单栏。首页资源区同时显示 Research Applications 与 Research Insights，两者标题使用完全相同的字体、25px 字号与字重；内页标题也使用相同 directory-heading 样式。每篇标题及右侧 More 进入 `/resources/insights/:id`。底部保留 GitHub 标题和 CSMA Research Group 仓库入口。
- Projects 的 Research Projects 去掉 Ongoing，各项目不再显示重复的类别。Current Directions 中 More 紧接简介下一行；Research 的 More 紧接关键词。各页主栏目名与首页分区标题统一全大写（NEWS、RESEARCH、PROJECTS、PUBLICATIONS、PEOPLE、RESOURCES、ABOUT）；About 页主标题仅为 ABOUT。导航、论文题目、项目名称、成员姓名和较长的子标题保留正常大小写。说明性小标题采用 Georgia 正体，不用斜体。Research 顶部 RESEARCH 与 PROJECTS 等主栏目共用字号、字重、行高和字间距，使用相同的无衬线正体与深蓝色；Research in practice. 和 Questions, methods, and applications. 已删除。
- Research 页顶的 RESEARCH 与主标题之间保留 20px 间距。桌面文字区以顶部标题和底部简介对齐右侧图片；小于 1244px 时改为上下布局，保持图片比例。浏览器支持时使用 text-box-trim 修整字形上下留白。
- Projects 的 Current Directions / Current Research Direction 表示当前研究方向；仅替换对外文案中的 Ongoing，旧锚点 `ongoing-directions` 和内部筛选状态保持兼容。
- News、People、Projects、Publications、Resources、About 页头去掉 From the Group、The Group、Ideas into Systems、Research Output、Explore and Reuse、重复 About 等装饰性标签，保留正式标题和简介。
- About 介绍按完整内容宽度自然换行，不加硬换行；页头与其它内容页共用左边界；Address 仅显示 Chongqing, China；Research Interests 各研究方向使用首字母大写形式，保留 AI 缩写；Research Vision 与 Contact + Join Us 上下排列，正文两端对齐，四个研究方向用等宽标签分列。
- People 使用统一的 Members 分组，不区分导师和学生，不显示人数；首页显示有照片成员的头像、姓名、Member 和一个主要研究方向。目前展示 Jiangping Huang、Hao Chen、Zhirui Huang、Yihang Wang、Jiateng Guo、Weidong Yuan；没有照片的成员暂时隐藏，原始资料保留。桌面网格随实际人数分配列宽，窄屏保留原有断点。
- People 顶部与底部均有 Alumni 入口，进入 `/people/alumni`，只读取 `peopleSections` 中既有 alumni 记录；不把当前成员视为离组成员，不补造姓名、年份或去向。
- 头像和姓名进入 `/people/:id` 独立介绍；本人提供的个人主页链接只在介绍页显示。
- 所有成员的邮箱链接仅显示 `Email`，具体地址保存在 `mailto:` 目标中，不作为页面正文、链接文字或提示文字展示。
- 首页 About 两个模块正文无超链接；标题右侧分别提供 Home 和 How to join，后者进入 About 的联系部分。
- 地球保留原旋转、访客标记和统计逻辑，背景为程序绘制的深蓝星空和圆形光点配柔和光晕。偶尔有细小流星在背景划过：首次可见约 6–12 秒后出现，后续每隔约 18–36 秒一颗，持续约 1.4–2.1 秒，地球会遮挡经过其背后的轨迹。隐藏页面或离开视口时暂停，减少动态效果时不显示流星。成立日期为已确认的 `2022-07-20`，不显示时分。
- 地球昼夜范围由当前 UTC 时刻计算太阳直射点，采用 [NOAA 近似太阳位置公式](https://gml.noaa.gov/grad/solcalc/solareqns.PDF)，包含季节和均时差；光照跟随地理位置，与观看角度及所选城市无关。夜面保留环境亮度，晨昏处平滑过渡；纹理未加载时也使用同一光照模型。减少动态效果时仍每分钟更新光照。
- 地球四角仍显示城市名、24 小时时间、日期和 UTC 偏移；上海已替换为香港。初始显示香港、悉尼、伦敦、纽约，随后从 20 座城市中每分钟轮换四座：香港、悉尼、伦敦、纽约、东京、迪拜、巴黎、洛杉矶、新加坡、孟买、柏林、芝加哥、首尔、曼谷、伊斯坦布尔、圣保罗、奥克兰、约翰内斯堡、开罗、墨西哥城。每一组按当前实际 UTC 偏移去重，并避免连续两组重复城市；时区由浏览器 Intl/IANA 处理，自动随夏令时调整，不需要时间 API。同一分钟内接口刷新不触发换城，返回页面时立即刷新到当前时间。
- Your local time 在四角时钟之间缓慢随机漂移，每段约 9–15 秒，每段平滑起停；移动范围按容器与标签尺寸计算。浮层只显示一行 `YOUR LOCAL TIME HH:MM`，不显示 UTC 偏移或其它时区说明；四角世界时钟的时区信息保留。浮层按文字内容收窄，背景不透明度为 24%，不模糊后面的地球；文字保留原有颜色，以轻微阴影提高可读性。离开视口或隐藏标签页时暂停，恢复时从当前位置继续；系统开启减少动态效果时保持静止。时间仍按每分钟更新，并在返回标签页后立即刷新。
- 地球区域可见且流星的亮部出现在屏幕内、未被球体或时钟遮挡时，显示流星图标与英文提示 `Lucky you! You spotted a shooting star.`。每颗流星最多触发一次，完整显示 3 秒，再用 2 秒缓慢淡出，总计 5 秒。提示不拦截点击、不抢焦点；页面隐藏、地球离开视口或切换减少动态效果时立即收起。这是画面可见性判断，不检测访客目光，不增加访问统计请求。

## 内容从哪里修改

| 内容 | 文件 | 维护要点 |
| --- | --- | --- |
| 新闻 | `src/data/news.js` | 时间倒序；同月先后使用 `order`；`publicationId` 关联论文。所有新闻日期统一使用 YYYY-MM。 |
| 人员资料 | `src/data/people.js` | 保存已确认资料；合作研究者和校友原始记录保留，不转为在组成员。 |
| 人员展示 | `src/data/peopleHierarchy.js` | 当前成员仅展示有照片的记录；同一筛选用于首页、Members 和个人页路由；详情保留完整研究方向，预览只显示主要方向；`alumniProfiles` 读取原始 alumni 分类；补资料时保留现有 ID。 |
| 论文 | `src/data/publications.js`、`src/utils/publicationDisplay.js` | 作者按确认顺序保留全名，统一以英文逗号和 and 连接；`rating` 在论文列表的会议名称下显示；`featured` 控制精选；`systemId` 指向论文框架，`applicationId` 指向项目应用；KGMAF 的应用为 ChatREQ。 |
| 在研项目 | `src/data/proposalProjects.js` | 保留周期、公开题名中的 `[MASK]` 与已确认简介。 |
| 系统 | `src/data/systems.js` | `researchSystems` 用于框架目录；`projectApplications` 用于 Resources；`systemProfiles` 提供全部详情路由。KGMAF 与 ChatREQ 分开命名，详情说明关系；可选动图维护在对应介绍中。 |
| 研究方向 | `src/data/researchAreas.js`、`researchPresentation.js` | 认知与协同智能、智能软件工程、智能机器人、应用场景；保留稳定 ID 和旧锚点兼容。 |
| Home / Research 主图与动效 | `src/assets/figures/csma-home-research-vision.png`、`src/views/Home.vue`、`src/views/Research.vue`、`src/components/ResearchVisionMotion.vue` | 用户提供图像的原样副本，通过 Vite 导入；保持 2:1 比例，SVG 叠层绘制缓慢光环与分区微光，原 SVG 保留。 |
| 架构图 | `src/assets/figures/`、`src/data/systems.js` | CMCS.pdf、SemFaith.pdf 为用户原件，已从 Downloads 移入；同名小写 framework PNG 用于网页。`ProjectFigure.vue` 统一显示，点击新图打开原 PDF。 |
| 洞见文章 | `src/data/researchInsights.js` | 两篇英文介绍、洞见和原始来源；首页展示前两篇，Resources 展示全部，详情路由按稳定 ID 生成。 |
| 附加资源 | `src/data/resources.js` | GitHub 入口来自 repositories 分组，其余历史记录保留；兼容导出 researchInsights。 |
| 导航和联系 | `src/data/site.js` | 导航顺序、组名、公开联系资料。 |
| 世界时钟与漂移 | `src/data/worldClocks.js`、`src/utils/globeClocks.js`、`src/components/GlobalVisitorsGlobe.vue` | 20 座城市池、每分钟四角轮换、当前 UTC 偏移去重，以及本地时间标签移动边界。 |
| 地球光照与流星 | `src/utils/globeSky.js`、`src/components/GlobalVisitorsGlobe.vue` | 近似太阳位置、晨昏亮度、流星轨迹；使用现有动画循环，未增加独立动画定时器。 |
| 流星幸运提示 | `src/components/MeteorNotice.vue`、`src/utils/globeSky.js` | 流星图标、可见性与遮挡判断，3 秒完整显示 + 2 秒淡出；组件卸载时清理关闭计时器。 |
| 成立日期 | `src/data/visitorStats.js` | `2022-07-20`，仅日期。 |
| 布局 | `src/content.css`、`src/proposal-layout.css` | 内容页、说明性小标题、归档入口、More 提示、About 与窄屏排版；`style.css` 中的基础配色、填充与形状保留。 |

News Archive 按年份整理全部现有动态，不虚构更早新闻；People Alumni 沿用原始已保存记录，目前包括 Ye W. G.（2023–2026），未更改其既有姓名形式与去向。

KGMAF 的 Paper 指向 ASE DOI，GitHub 使用 ChatREQ 仓库，Project 进入 `/projects/chatreq`。SemFaith 的 GitHub 使用 `https://github.com/CSMA-Research-Group/SemFaith`；网页地址不带 clone 用的 `.git` 后缀。

SemFaith 作者已确认，依次为 Jiangping Huang、Weidong Yuan、Junchen Xiao、Qixuan Gu。PRICAI 2026 下方保持 CCF C；ASE 2025 下方显示 CCF A。

架构图 PDF 原件与网页 PNG 分开保存，原 PDF 字节不变；PNG 使用 Poppler 等比例渲染，完整保留图中内容。新增的架构图在 Projects、论文详情和系统详情页使用，Resources 卡片的动图位置继续使用 `previewMedia`。

`previewMedia` 默认为 `null`。收到动图后，把素材放到 `public/` 或 `src/assets/`，填写对应系统的 `{ src, alt, width, height }`。GIF / 动态 WebP 会显示在介绍文字下面；未提供素材时不显示空白图片框。

## Research Insights 文章维护

在 `src/data/researchInsights.js` 的 `researchInsights.items` 中维护文章。每项包含稳定 `id`、英文标题 `title`、分类 `category`、笔记日期 `date`（YYYY-MM）、简介 `description`、卡片洞见 `insight`、介绍段落 `overview`、分析段落 `perspective`、证据范围 `evidenceNote` 和来源 `sources`。

文章标题与右侧 More 指向本站独立正文；`InsightDetail.vue` 分为 Overview、Perspective、Sources。Overview 每段的 `sources` 为从 1 开始的来源序号，紧邻事实说明链接到原文；Perspective 明确是阅读分析与研究建议，不将其写成已完成实验。资源卡片由 `ResearchInsights.vue` 统一渲染，复用 `SystemResources.vue` 的基础布局类；不虚构文章作者、运行结果或阅读量。

首批两篇在 2026-10 整理：REA 依据 `https://github.com/morluto/rea` 及官方 CLI / Evidence 文档，未执行该工具；MASS 依据 2026-10-08 提交的 arXiv:2610.12176 以及 Sakana AI 的官方研究文章。MASS 的研究基准效率提升与软件工程基准迁移不一致均按作者报告表述，不把两轮实验扩大为普遍或无限自我改进的结论。

## 人员资料与姓名

当前仅展示用户确认且已提供照片的六位成员，姓名按英文全名显示：

- Jiangping Huang：Artificial Intelligence、Intelligent Software Engineering、Embodied Intelligence；成员卡片的主要方向显示 Artificial Intelligence。
- Hao Chen：Intelligent Software Engineering，个人页保留程序修复相关研究兴趣。
- Zhirui Huang、Yihang Wang、Jiateng Guo：Intelligent Robotics、Embodied Intelligence；成员卡片的主要方向显示 Intelligent Robotics。
- Weidong Yuan：Artificial Intelligence、Large Language Models、Semantic Faithfulness Evaluation、Classical-to-Modern Chinese Restatement；研究介绍依据已关联的 SemFaith 论文，成员卡片的主要方向显示 Artificial Intelligence。

2026-10-15：新增 Hao Chen（名 Hao、姓 Chen），使用用户提供照片的原样副本 `public/people/hao-chen.jpg`，个人介绍入口为 `/people/hao-chen`。简介介绍其正在研究的显式修复历史增量价值、历史内容的作用与适用条件，不提拟投稿期刊，不把先导材料写成已确立结论，也不将阅读过的论文列为个人成果。

2026-10-16：新增 Yihang Wang，更新 Zhirui Huang，使用用户提供照片的原样副本 `public/people/yihang-wang.jpg`、`public/people/zhirui-huang.jpg`，补充邮箱链接。Yihang Wang 的介绍依据用户提供的摘要，概括有限物体搬运与资源工作流任务中的候选覆盖、必要澄清和执行授权问题；不扩展为真实机器人部署结果，不添加未经确认的论文题名、投稿期刊或发表状态。Zhirui Huang 的简介侧重任务理解、歧义澄清和可靠行动，不将上述论文结果归到其名下。两人的个人页分别为 `/people/yihang-wang` 和 `/people/zhirui-huang`。

2026-10-16：新增 Jiateng Guo 及其原样照片 `public/people/jiateng-guo.jpg`、邮箱链接和已确认研究方向；补充 Hao Chen 的邮箱。Jiangping Huang 改用根据本人原照处理的学者肖像 `public/people/jiangping-huang.png`，研究方向完整显示上述三项。五位成员的邮箱入口均只显示 Email。

2026-10-17：新增学生成员 Weidong Yuan，使用用户提供的 `Weidong_YUAN.jpg` 原样副本 `public/people/weidong-yuan.jpg`（1079 × 1108）及邮箱链接，个人页为 `/people/weidong-yuan`。个人页通过 `relatedPublicationIds` 关联已有 `semfaith-pricai-2026` 论文；简介概括其论文中的语义忠实性与声明级诊断工作，沿用已有论文元数据，不新增投稿或录用状态。未提供的学位、入学年份、单位和个人主页不作推断。

Shiyu Zhou、Juncheng Lu、Juntong Ou、Yujie Jiang 暂无照片，当前不出现在首页、Members 或个人页路由中，原始数据仍保留在 `src/data/people.js`；提供照片后可恢复。此前虚构人物及其生成头像继续留在网站外的历史归档中。

已确认资料维护在 `src/data/people.js`，展示规则在 `src/data/peopleHierarchy.js`。头像和姓名均进入独立个人介绍，个人主页仅在本人提供后填写；不推测邮箱、单位、学位或论文贡献。合作研究者和校友的原始记录保留，不加入当前名单。补充资料时保留各成员 ID。

## Jiangping Huang 肖像处理记录

使用内置 image_gen 工具，以用户提供的 `Jiangping_HUANG.jpg` 为编辑目标，约束保留人脸特征、眼镜、发型和原有神态，调整西装、衬衫、背景及光线。原始照片未修改。最终图保存为 `public/people/jiangping-huang.png`，1254 × 1254；经目视对照检查后接入网站。

- 原照 SHA-256：`8a791031fa77381e761f5c71f7fc3060eb324d65e1dc6783d6513b57b1b74751`。
- 生成图 SHA-256：`9dcb4eb946b84db03d1b2f788093b0c1992c3f47a9738f120644a376c5d7192c`。
- 工具模式：内置 image_gen，identity-preserve 编辑，非 CLI。

实际使用的完整提示词：

```text
Use case: identity-preserve. Asset type: professional academic profile portrait for a research-group website. Edit target: the supplied photograph of Jiangping Huang; this is the same person, not a new generated identity. Create a restrained, credible scholar portrait by changing only the clothing and background and gently balancing the lighting. Preserve the original face as closely as possible: the exact facial proportions, head shape, eye shape and spacing, eyebrows, nose, mouth, teeth, friendly natural smile, age, skin tone and texture, ears, short hairstyle, and rectangular dark glasses. Keep the same slight head angle, gaze and expression. Do not reshape, beautify, slim, age, or de-age the face; do not replace or redesign the glasses. Dress him in a well-fitted dark navy blazer over a light blue open-collar shirt, without a tie. Use a clean softly lit light gray studio background and natural, even portrait light without harsh glare on the glasses. Photorealistic upper-chest-and-head composition, square image, with the entire hairstyle and both shoulders comfortably inside the frame; the face should remain recognizable even at small website-avatar size. Preserve realistic body proportions. No academic regalia, lab coat, badges, university logos, books, invented awards, writing, watermark, props or additional people. Prioritize preserving the original face over making the image more formal.
```

## 本地运行和构建

在仓库根目录执行；首次安装依赖使用 `npm ci`。

```sh
VITE_VISITOR_API_BASE= npm run dev -- --host 127.0.0.1 --port 5195
```

本地审阅关闭访客 API，地球照常展示，统计提示暂不可用。生产环境文件、Worker 配置和访客服务实现保持原样。

```sh
npm test
npm run build
git diff --check
```

`dist/` 是本仓库跟踪的构建产物。源代码更新后运行默认生产构建，使 `dist/index.html` 与最新哈希资源一致。

## 待补真实资料

- 当前六位可见成员的照片和邮箱均已提供，研究简介依据用户材料整理；Hao Chen、Zhirui Huang、Yihang Wang、Jiateng Guo、Weidong Yuan 的外部主页地址仍待本人提供。暂时隐藏的成员仍待补照片；不生成占位人物。
- SemFaith DOI 与后续出版信息；正式作者和 GitHub 已确认，其 GitHub 和 ChatREQ GitHub 地址已按用户提供的信息加入。
- 各系统的演示动图。

资料缺失时保留待补状态，不重新加入虚构人物。提交、推送和部署由用户另行决定。

世界时钟回归检查在 `tests/globe-clocks.test.js`，覆盖城市轮换、实际偏移去重、南北半球夏令时边界、跨年日期、00 点显示和窄屏漂移边界。`tests/globe-sky.test.js` 覆盖季节、UTC、闰日、旋转时光照的地理一致性和流星轨迹。星点与流星仅作视觉装饰，不表示真实天象；昼夜光照为近似示意，不用于精密天文测量。
