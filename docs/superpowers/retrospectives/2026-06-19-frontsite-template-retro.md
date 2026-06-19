# Frontsite Template Retro

日期：2026-06-19

## 这套模板是什么

这是一个面向内容型个人站的 `Next.js + Tailwind + 本地 MDX` 前台模板壳层。

当前已经稳定覆盖：

- 首页
- About
- Articles 列表与详情
- Projects 列表与详情
- Services 列表与详情

当前刻意未覆盖：

- 工具页
- 实时统计后端
- CMS / 数据库
- 真实内容迁移

所以它现在更准确的定位不是“完整博客系统”，而是：

> 一个可公开发布的、偏 editorial/frontsite 气质的内容站模板基础版。

## 这个模板是怎么诞生的

起点不是“做一个通用模板”，而是“高保真复刻 `erlich.fun` 当前公开前台”。

真正起作用的路径有 4 步：

1. 先确认复刻范围不是单页 landing，而是内容站骨架。
2. 先确认目标站公开技术栈，再反推本地实现路线。
3. 先写 spec 和 plan，把页面、内容层、异常路径和验收标准锁死。
4. 再开始实现，并用真实 `build` / 本地路由抽查去纠正假设。

最终结果是：虽然一开始目标是“复刻一个站”，但产物已经足够抽象成一个可复用模板。

## 为什么这套模板值得固定下来

它有几个适合复用的特点：

- 结构完整：不是只有首页，而是完整的内容站路由体系。
- 内容层清晰：`src/content/**` 与页面组件分离。
- 模板边界清晰：列表页、详情页、首页区块拆分明确。
- 可替换性强：后续换真实内容不需要重写组件。
- 工程成本可控：没有过早接入 CMS、数据库或工具页。

这意味着它很适合做成：

- 公开 GitHub 模板仓库
- 你自己未来个人站/内容站的起手模板
- 给别人复用的 “editorial Next.js frontsite starter”

## 这仓库能不能发 GitHub

可以发，但更适合按“模板仓库”思路整理后再发，而不是把当前工作仓直接裸发。

### 现在就已经适合公开的部分

- 核心前台代码
- 内容 schema
- 本地 MDX 内容组织方式
- 页面模板拆分
- README 中的运行方式

### 发之前建议补的部分

1. 补 `LICENSE`
   - 推荐 `MIT`

2. 改仓库名
   - 例如：
   - `next-editorial-frontsite`
   - `next-mdx-frontsite-template`
   - `editorial-content-site-template`

3. 清理或重命名内部过程文档
   - 当前 `docs/superpowers/specs/` 和 `docs/superpowers/plans/` 很适合内部工作流
   - 如果对外发布，要么保留并说明“这是模板设计过程”
   - 要么移动到 `docs/internal/` 或单独摘掉

4. 补模板导向 README
   - 增加：
   - 模板预览图
   - 适用场景
   - 如何替换内容
   - 如何替换站点名、导航、联系方式
   - 明确“不包含工具页/动态后台”

5. 补公开截图
   - 首页
   - 文章详情
   - 项目列表
   - Services 列表

6. 设置 GitHub Template Repository
   - 这样别人可以直接 `Use this template`

### 不建议原样直接公开的地方

- 当前 README 还偏项目执行态，不够模板导向
- 还没有 license
- 还没有 preview 截图
- 还没有发布边界说明

## GitHub 上有没有相似模板

有，但“完全同气质”的不多。比较接近的是“Next.js + Tailwind + MDX 的内容站模板”，而不是你这次做出来的这种更偏 editorial/frontsite 的壳层。

### 相近参考

1. `timlrx/tailwind-nextjs-starter-blog`
   - 链接：<https://github.com/timlrx/tailwind-nextjs-starter-blog>
   - 特点：经典 `Next.js + Tailwind + MDX` 博客 starter，成熟、星标高、偏技术博客。

2. `Jeff-Russ/next-markdown-journal`
   - 链接：<https://github.com/Jeff-Russ/next-markdown-journal>
   - 特点：个人 journal / blog / portfolio 混合型模板，支持非博客页面，和你这次的“内容站骨架”更接近。

3. `netlify-templates/nextjs-blog-theme`
   - 链接：<https://github.com/netlify-templates/nextjs-blog-theme>
   - 特点：可配置博客 starter，带 MDX、主题和模板化入口，更偏通用博客产品。

4. `codebucks27/Nextjs-tailwindcss-blog-template`
   - 链接：<https://github.com/codebucks27/Nextjs-tailwindcss-blog-template>
   - 特点：SEO + 内容层较完整，更偏“公开发布博客模板”路线。

5. `Hitsujii/next-paper`
   - 链接：<https://github.com/topics/blog-template?l=typescript&o=asc&s=stars>
   - 说明：在 GitHub topic 页可见，定位是 “AstroPaper, but for Next.js”，也偏 MDX 内容站。

### 这套模板和它们的区别

目前这套模板的差异点主要在：

- 更强调首页区块节奏，而不是只强调文章系统
- 更像“个人 frontsite + 内容归档”，不是单纯 blog
- 默认视觉语言更偏 serif / editorial
- 故意保留工具页和数据页为空白，而不是一开始做成大而全

如果公开发布，差异化卖点可以直接写成：

> Editorial-style Next.js frontsite starter for personal sites, with MDX collections for articles, projects, and services.

## 这轮真正踩过的坑

### 1. 一开始没有先核目标站技术栈

这是本轮最关键的复盘点。

如果目标是复刻或高度贴近一个站，先看目标站公开技术栈，几乎是第一步。

这次后续已经沉淀成共享 ad-hoc note：

- 复刻前先核目标站的响应头、构建资源路径、CSS/JS 形态、`sitemap.xml`、`robots.txt`、公开路由和字体/框架痕迹

### 2. 误把“复刻首页”想成“复刻整站”

真正调研后才发现，目标不是 landing page，而是完整内容站。

修正方式：

- 用 `sitemap.xml` 判断最小模板范围
- 先做内容站壳层，不碰工具页

### 3. spec 不够细会把问题推迟到实现阶段

第一次 spec review 就暴露了几个缺口：

- 内容格式没定死
- 首页每个区块的取数规则不够明确
- 异常路径没写清
- 视觉验收基线太主观

经验是：

> 只要是模板型项目，spec 里必须把数据规则、异常行为和验收基线写死，不然后面每一步都会重新发明口径。

### 4. `next-mdx-remote/rsc` + Next 16 dev 默认 Turbopack 会踩兼容问题

现象：

- `build` 能过
- `dev` 下部分动态路由报 JSON parse 异常

修复方式：

- 把 `npm run dev` 切到 `next dev --webpack`

经验是：

> 当内容层依赖 `next-mdx-remote/rsc` 时，不要默认认为 Next 最新开发链路和生产链路表现一致，开发态也要单独验证。

### 5. YAML frontmatter 会自动把日期/年份变成 `Date` / `number`

现象：

- schema 期望 string
- 实际 build 阶段拿到的是 `Date` 或 `number`

修复方式：

- 在 schema 层做输入归一化，不放宽成 `any`

经验是：

> frontmatter schema 不只是在“校验”，还应该承担“归一化”职责。

## 可以固定成经验的方法论

### 方法 1：复刻站点四步法

1. 先核公开技术栈
2. 再核真实页面范围
3. 先写 spec / plan
4. 再进入实现和真实 build 验证

### 方法 2：内容站模板优先做壳层，不先做工具页

当一个站同时有内容页和工具页时：

- 第一阶段优先做内容站骨架
- 工具页和动态数据页单独二期处理

这样更容易得到一个可公开复用的模板，而不是一坨混在一起的业务仓。

### 方法 3：把“占位内容”也当正式输入对待

不要把 placeholder 写死在 JSX。

应该：

- 放在 `src/content/**`
- 走同一套 schema
- 走同一套 loader
- 走同一套路由

这样占位阶段结束时，模板就已经具备可替换性。

## 如果要把它真正发成模板仓库，建议的下一步

1. 补 `LICENSE`
2. 补模板导向 README
3. 补截图
4. 决定是否保留 `docs/superpowers/**`
5. 决定公开仓库名
6. 推到 GitHub 并开启 Template Repository

## 当前结论

结论很直接：

- 这套东西已经值得固定下来
- 可以发 GitHub
- 但最好按“公开模板仓”再整理一轮，而不是把当前执行态直接丢出去
- 它在 GitHub 上不是没有相似模板，但你这套的 editorial/frontsite 角度仍然有自己的位置
