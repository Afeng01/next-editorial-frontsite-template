# Erlich.fun Frontsite Replica Design

## Objective

在 `/Users/cherry_xiao/Developer/xiao12-top` 从零启动一个新站，第一阶段只复刻 `https://erlich.fun/` 的前台内容站体验，不接入工具页、统计数据后端或真实内容源。目标是尽量贴近原站当前公开可见的结构、版式、字体层级、深浅区块节奏和页面模板，同时让内容以后可以替换成 Cherry 自己的真实内容。

## Confirmed Scope

第一阶段包含这些页面和模板：

- `/`
- `/about`
- `/articles`
- `/articles/[slug]`
- `/projects`
- `/projects/[slug]`
- `/services`
- `/services/[slug]`

内容先使用本地占位数据，不直接复刻原站文案与历史内容。

## Out of Scope

第一阶段明确不做：

- `/deepclaude-pricing`
- `/deepclaude-quota`
- `/nano-banana-image`
- `/4o-image`
- 首页 `By the numbers` 的真实统计计算
- `Generated from Supabase` 对应的数据来源和自动刷新
- Supabase、CMS、数据库或后台管理
- 原站所有真实文章、项目、服务文案与图片的搬运

## Research Snapshot

基于 2026-06-19 的公开页面调研，当前目标站具备这些技术和结构特征：

- 公开响应头显示 `Next.js`
- 页面使用明显的 Tailwind 原子类
- 字体角色接近 `Noto Serif SC`、`Geist Sans`、`Geist Mono`
- 首页为内容型个人站，不是单纯 landing page
- `sitemap.xml` 暴露了内容体系：
  - 23 个 article 详情页
  - 13 个 project 详情页
  - 4 个 service 详情页
- `robots.txt` 暴露了 `/api` 和 `/tools` 等非第一阶段范围的后端/工具面

这意味着第一阶段最合理的实现不是“做一个像它的首页”，而是“做它的前台内容站骨架和模板系统”。

## Technical Direction

第一阶段采用：

- `Next.js` App Router
- `Tailwind CSS`
- 本地内容文件驱动的内容层
- `MDX` 作为唯一内容正文格式
- schema 校验过的 frontmatter

选择理由：

1. 与目标站公开暴露的技术栈更贴近，降低复刻偏差。
2. 后续如果补工具页、统计页或动态数据层，扩展阻力更小。
3. 这次是整站前台模板复刻，不是一次性静态视觉稿。

### Content Technology Decision

正文方案在 spec 阶段直接定死为 `MDX`，不再保留“等价方案”开放项。原因：

- 需要同时满足 frontmatter、metadata、富文本详情页和本地占位内容管理
- 第一阶段不需要更重的 CMS 或数据库
- 计划阶段必须明确内容解析链路，否则测试、schema 和模板任务都无法稳定拆分

## Information Architecture

### Home

首页保留与目标站相近的节奏和区块顺序：

1. 固定顶部导航
2. Hero
3. Featured
4. Recent Stream
5. By the Numbers
6. Projects
7. Services
8. Quote
9. Contact

首页各区块的数据规则如下：

- `Hero`
  - 来源：`content/site.ts`
  - 内容：站点标题、副标题、顶部三项元信息
- `Featured`
  - 来源：article 内容集合
  - 规则：取 `featured=true` 的第一篇；若多篇命中，按 `date` 倒序取最新；若无命中，则取最新文章
  - 最小 seed：1 篇 featured article
- `Recent Stream`
  - 来源：article 内容集合
  - 规则：按 `date` 倒序取最近 5 篇
  - 最小 seed：5 篇 article
- `By the Numbers`
  - 来源：`content/site.ts`
  - 规则：使用静态占位数字，不做实时计算
  - 最小 seed：4 个统计项
- `Projects`
  - 来源：project 内容集合
  - 规则：优先按 `order` 升序；未提供 `order` 时按 `date` 倒序；首页最多展示 6 个
  - 最小 seed：6 个 project
- `Services`
  - 来源：service 内容集合
  - 规则：优先按 `order` 升序；未提供 `order` 时按 `slug` 升序；首页最多展示 4 个
  - 最小 seed：3 个 service
- `Quote`
  - 来源：`content/site.ts`
  - 内容：1 条占位引言和署名
- `Contact`
  - 来源：`content/site.ts`
  - 内容：联系方式、CTA 与补充说明

空状态规则：

- 第一阶段 seed 内容由项目内占位内容保证，首页不需要为完全空集合设计复杂空状态
- 如果集合数量少于首页目标数量，则展示现有条目，不额外补假卡片

### Secondary Routes

- `/about`：独立关于页
- `/articles`：文章列表页
- `/projects`：项目列表页
- `/services`：服务列表页

各列表页的排序规则：

- `/articles`
  - 按 `date` 倒序
- `/projects`
  - 先按 `order` 升序，再按 `date` 倒序
- `/services`
  - 先按 `order` 升序，再按 `slug` 升序

### Detail Templates

- 文章详情页模板
- 项目详情页模板
- 服务详情页模板

详情页模板共享壳层，但不混成一套万能模板，避免后续内容语义变脏。

## File and Responsibility Map

建议的最小项目结构如下：

```text
/Users/cherry_xiao/Developer/xiao12-top/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── articles/page.tsx
│   ├── articles/[slug]/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── services/page.tsx
│   └── services/[slug]/page.tsx
├── components/
│   ├── layout/
│   ├── home/
│   ├── list/
│   ├── detail/
│   └── shared/
├── content/
│   ├── site.ts
│   ├── about.mdx
│   ├── articles/
│   ├── projects/
│   └── services/
├── lib/
│   ├── content/
│   └── utils/
├── public/
│   └── images/
└── docs/
    └── superpowers/
        ├── specs/
        └── plans/
```

### Page Responsibilities

- `app/layout.tsx`
  - 全站字体变量、全局容器、统一导航和页脚挂载
- `app/page.tsx`
  - 首页区块编排
- `app/*/page.tsx`
  - 各列表页的数据读取与模板编排
- `app/*/[slug]/page.tsx`
  - 各详情页的数据读取、metadata 生成和富文本渲染

### Content Responsibilities

- `content/site.ts`
  - 品牌名、导航、联系方式、首页 quote、首页统计占位值
- `content/about.mdx`
  - About 页面正文占位
- `content/articles/*.mdx`
  - 文章详情内容
- `content/projects/*.mdx`
  - 项目详情内容
- `content/services/*.mdx`
  - 服务详情内容

### Component Responsibilities

- `components/layout/`
  - `SiteHeader`
  - `MobileMenu`
  - `SiteFooter`
- `components/home/`
  - `HeroSection`
  - `FeaturedArticle`
  - `RecentStreamList`
  - `StatsSection`
  - `ProjectGrid`
  - `ServiceGrid`
  - `QuoteSection`
  - `ContactSection`
- `components/list/`
  - 列表页标题区、卡片网格、列表条目
- `components/detail/`
  - `ArticleDetailTemplate`
  - `ProjectDetailTemplate`
  - `ServiceDetailTemplate`
- `components/shared/`
  - `SectionHeading`
  - `CardImage`
  - `ListMeta`
  - `RichContentRenderer`

## Content Model

共享必填字段：

- `title`
- `slug`
- `summary`

共享可选字段：

- `coverImage`

### Article Fields

必填：

- `date`
- `category`

可选：

- `featured`
- `tags`
- `quote`

### Project Fields

必填：

- `date`
- `category`

可选：

- `order`
- `status`
- `role`
- `year`

### Service Fields

必填：

- `category`

可选：

- `order`
- `ctaLabel`
- `ctaHref`
- `date`

### Site Content Fields

`content/site.ts` 至少包含：

- `siteTitle`
- `siteSubtitle`
- `navigation`
- `footerLinks`
- `heroMeta`
- `stats`
- `quote`
- `contact`

## Content Seed Minimum

第一阶段必须提供这些占位内容，避免模板无法验收：

- `about.mdx`: 1 份
- `articles`: 至少 6 篇，其中至少 1 篇 `featured=true`
- `projects`: 至少 6 个
- `services`: 至少 3 个

## Replica Strategy

### Parts to Match Closely

- 页面区块顺序
- 导航结构和移动菜单体验
- 浅色与深色区块切换节奏
- serif / sans / mono 三类文字角色
- 大标题、元信息、正文层级
- 卡片比例、分割线、列表密度
- 详情页阅读区的宽度和留白风格
- hover 反馈的克制程度

### Parts Intentionally Left Replaceable

- 站点品牌名
- 导航文案
- 联系方式
- 所有正文内容
- 图片资源
- quote 文案
- 首页统计数字
- 后续数据接入方式

## Error and Edge-Case Rules

### Invalid Route

- 任意 `/articles/[slug]`、`/projects/[slug]`、`/services/[slug]` 找不到内容时，返回 `notFound()`

### Invalid Frontmatter

- frontmatter 通过 schema 校验
- 必填字段缺失时直接在构建阶段失败，不在运行时静默吞掉

### Missing Image

- `coverImage` 缺失时使用项目内默认占位图
- 图片资源存在但加载失败，交由浏览器默认失败行为处理，第一阶段不做额外重试逻辑

### Too Few Seed Items

- 首页或列表页条目不足时，仅展示现有条目
- 不生成“Coming soon”假条目

### Empty About Content

- 第一阶段通过占位 seed 保证 `about.mdx` 存在，不单独设计空 about 页

## Visual System

### Typography

- serif：`Noto Serif SC`
- sans：`Geist Sans`
- mono：`Geist Mono`

排版目标：

- 大标题采用 serif，强调出版物感
- 元信息采用 mono，制造“档案 / 目录 / issue”气质
- 正文以可读性为先，不过度装饰

### Color and Tone

- 主底色：白
- 深色区块：接近 `gray-950`
- 边框和分割线：浅灰
- hover：轻微颜色变化、线条变化、轻微 scale

### Motion

只复刻目标站已经明显可见的轻量互动：

- 移动菜单开合
- 图片轻微 hover 放大
- 列表条目 hover padding / color 变化
- 导航 hover 下划线/边框反馈

不额外添加更强的 motion 语言，避免偏离原站。

## Non-Functional Requirements

- 桌面和移动端均可用
- 页面模板可通过本地占位内容独立渲染
- 列表页与详情页链接关系完整
- 详情页 metadata 能按内容生成基础 title/description
- 不把占位文案写死在组件内部

## Risks and Controls

### Risk 1: 栈不匹配导致返工

控制：

- 第一阶段直接采用接近目标站的 `Next.js` 路线
- 在真正写代码前先确认目标站公开技术痕迹

### Risk 2: 误把“复刻首页”当成“复刻整站”

控制：

- 以 `sitemap.xml` 为依据确定最小整站模板范围
- 先做内容站骨架，不碰工具页

### Risk 3: 占位内容污染组件结构

控制：

- 内容全部从 `content/` 驱动
- 组件只负责编排和表现，不内嵌长文案

### Risk 4: 空目录没有工程边界

控制：

- 先写 spec，再写 implementation plan，再开始初始化项目
- 实现阶段补最小入口文档，避免后续接手成本过高

## Verification Standard

### Reference Baseline

视觉与结构验收以这些公开页面为基线：

- Homepage: `https://erlich.fun/`
- Articles list: `https://erlich.fun/articles`
- Projects list: `https://erlich.fun/projects`
- Services list: `https://erlich.fun/services`
- Article detail sample: `https://erlich.fun/articles/proma-tutorial-v2`

验收时只对比这些可见特征：

- 区块顺序
- 导航结构
- 明暗切换节奏
- 标题/元信息/正文层级
- 卡片比例和列表密度
- 详情页阅读宽度与留白
- 移动端菜单交互

不把原站文案、真实图片和真实统计数字作为复刻验收条件。

第一阶段完成时应满足：

1. 本地开发服务器可启动
2. 以下页面都可访问：
   - `/`
   - `/about`
   - `/articles`
   - `/articles/[slug]`
   - `/projects`
   - `/projects/[slug]`
   - `/services`
   - `/services/[slug]`
3. 首页区块顺序、密度和深浅节奏接近目标站
4. 列表页和详情页模板完整
5. 移动端导航可用
6. 占位内容来自本地内容文件
7. 工具页和真实统计数据仍保持未实现状态，不混入第一阶段
