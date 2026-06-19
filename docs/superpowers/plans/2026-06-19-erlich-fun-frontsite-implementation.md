# Erlich.fun Frontsite Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build phase 1 of the `erlich.fun` frontsite replica in `/Users/cherry_xiao/Developer/xiao12-top` using Next.js, Tailwind, MDX, and local placeholder content for home, about, articles, projects, services, and their detail templates.

**Architecture:** Initialize a new Next.js App Router project, keep all frontsite content local to the repo, validate frontmatter with a schema-backed content loader, and render the site through shared layout components plus three distinct detail templates. The first phase intentionally excludes dynamic tools, Supabase-backed metrics, and any real source content migration.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, MDX, Zod, gray-matter, `next-mdx-remote/rsc`, Geist fonts, Noto Serif SC, git

---

## File Structure

Planned file map before implementation:

- Create: `/Users/cherry_xiao/Developer/xiao12-top/package.json`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/tsconfig.json`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/next.config.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/postcss.config.mjs`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/eslint.config.mjs`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/.gitignore`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/layout.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/globals.css`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/about/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/articles/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/articles/[slug]/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/projects/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/projects/[slug]/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/services/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/services/[slug]/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/layout/SiteHeader.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/layout/MobileMenu.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/layout/SiteFooter.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/HeroSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/FeaturedArticle.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/RecentStreamList.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/StatsSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/ProjectGrid.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/ServiceGrid.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/QuoteSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/ContactSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/list/CollectionPageHeader.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/list/CollectionCardGrid.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/list/StreamList.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/detail/ArticleDetailTemplate.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/detail/ProjectDetailTemplate.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/detail/ServiceDetailTemplate.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/SectionHeading.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/CardImage.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/ListMeta.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/RichContentRenderer.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/site.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/about.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/articles/*.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/projects/*.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/services/*.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/schemas.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/mdx.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/loaders.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/selectors.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/utils/format.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/public/images/placeholder-cover.svg`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/public/images/placeholder-project.svg`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/public/images/placeholder-service.svg`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/README.md`

Design rules locked by this structure:

- `src/app/**` only orchestrates routes and metadata.
- `src/components/**` only renders UI.
- `src/content/**` only stores source data and MDX.
- `src/lib/content/**` owns parsing, validation, sorting, and selector logic.
- No page should parse MDX or frontmatter directly.

## Chunk 1: Project Bootstrap

### Task 1: Initialize the repository and Next.js app

**Files:**
- Create: `/Users/cherry_xiao/Developer/xiao12-top/.git/`
- Create: `/tmp/xiao12-top-bootstrap/`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/package.json`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/layout.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/globals.css`

- [ ] **Step 1: Initialize git in the empty directory**

Run: `git init`
Expected: a new `.git/` directory in `/Users/cherry_xiao/Developer/xiao12-top`

- [ ] **Step 2: Scaffold a temporary Next.js App Router app outside the repo**

Run: `npm create next-app@latest /tmp/xiao12-top-bootstrap -- --ts --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*"`
Expected: a clean bootstrap app is created without touching the existing `docs/` tree

- [ ] **Step 3: Copy the scaffolded app shell into the current repo without overwriting `docs/`**

Run:

```bash
rsync -a /tmp/xiao12-top-bootstrap/ /Users/cherry_xiao/Developer/xiao12-top/ \
  --exclude docs \
  --exclude .git
```

Expected: app scaffold files land in the repo while `docs/superpowers/**` stays intact

- [ ] **Step 4: Start the default dev server once**

Run: `npm run dev`
Expected: local server starts successfully on a default Next.js port

- [ ] **Step 5: Stop the server and verify the scaffolded app builds**

Run: `npm run build`
Expected: successful production build of the scaffolded starter

- [ ] **Step 6: Commit the clean scaffold**

```bash
git add .
git commit -m "chore: scaffold next frontsite"
```

- [ ] **Step 7: Remove the temporary bootstrap directory**

Run: `rm -rf /tmp/xiao12-top-bootstrap`
Expected: temporary scaffold files are cleaned up after the repo copy succeeds

### Task 2: Add project dependencies and baseline scripts for phase 1

**Files:**
- Modify: `/Users/cherry_xiao/Developer/xiao12-top/package.json`
- Modify: `/Users/cherry_xiao/Developer/xiao12-top/next.config.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/mdx.ts`

- [ ] **Step 1: Install content-layer dependencies**

Run: `npm install gray-matter zod next-mdx-remote`
Expected: packages added to `dependencies`

- [ ] **Step 2: Add explicit verification scripts**

Update `package.json` to include:
- `lint`
- `build`
- `dev`
- `typecheck` using `tsc --noEmit`

- [ ] **Step 3: Configure Next.js for local MDX-driven content**

Update `next.config.ts` and `src/lib/content/mdx.ts` to use a single, explicit runtime path based on `next-mdx-remote/rsc`.

- [ ] **Step 4: Verify lint, typecheck, and build on the baseline**

Run:
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Expected: all three commands pass before any site-specific implementation starts

- [ ] **Step 5: Commit the tooling baseline**

```bash
git add package.json package-lock.json next.config.ts
git commit -m "chore: add content tooling baseline"
```

## Chunk 2: Content System and Seed Data

### Task 3: Implement schema-validated content loading

**Files:**
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/schemas.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/loaders.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/content/selectors.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/lib/utils/format.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/RichContentRenderer.tsx`

- [ ] **Step 1: Write the schemas for site, article, project, and service content**

Implement Zod schemas that encode the spec rules:
- shared required fields: `title`, `slug`, `summary`
- article required fields: `date`, `category`
- project required fields: `date`, `category`
- service required fields: `category`
- optional `coverImage` with fallback support

- [ ] **Step 2: Add loader utilities for MDX collections**

Implement helpers that:
- read files from `src/content/**`
- parse frontmatter with `gray-matter`
- validate with Zod
- return normalized typed objects
- preserve the raw MDX body string for `next-mdx-remote/rsc`

- [ ] **Step 3: Add selector utilities for homepage and list ordering**

Implement deterministic selectors for:
- featured article
- recent articles
- ordered projects
- ordered services

- [ ] **Step 4: Add explicit failure behavior**

Make validation failures throw during build or server render startup. Do not silently skip malformed files.

- [ ] **Step 5: Verify content utilities compile cleanly**

Run:
- `npm run typecheck`

Expected: all content types and selectors compile without `any` leaks or schema drift

- [ ] **Step 6: Commit the content layer**

```bash
git add src/lib/content src/lib/utils src/components/shared/RichContentRenderer.tsx
git commit -m "feat: add schema-validated content loaders"
```

### Task 4: Create placeholder site data and MDX seed content

**Files:**
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/site.ts`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/about.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/articles/article-*.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/projects/project-*.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/content/services/service-*.mdx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/public/images/placeholder-cover.svg`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/public/images/placeholder-project.svg`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/public/images/placeholder-service.svg`

- [ ] **Step 1: Add `site.ts` placeholder data**

Include:
- site title and subtitle
- navigation links
- footer links
- hero meta trio
- 4 static stats
- quote block
- contact block

- [ ] **Step 2: Add `about.mdx` placeholder content**

Write enough copy to exercise:
- headings
- paragraphs
- list content
- link content

- [ ] **Step 3: Add article seed files**

Create at least 6 articles, including:
- 1 with `featured=true`
- 5 recent stream candidates

- [ ] **Step 4: Add project seed files**

Create at least 6 project entries with a mix of explicit `order` and fallback `date` behavior.

- [ ] **Step 5: Add service seed files**

Create at least 3 service entries with at least one using `order` and one relying on `slug` fallback.

- [ ] **Step 6: Add local placeholder image assets**

Create simple SVG placeholder assets referenced by content files when real images do not exist yet.

- [ ] **Step 7: Verify the seed data loads**

Run: `npm run build`
Expected: the build succeeds using only placeholder content and images

- [ ] **Step 8: Commit the seed content**

```bash
git add src/content public/images
git commit -m "feat: add placeholder frontsite content"
```

## Chunk 3: Shared UI and Route Templates

### Task 5: Build the global visual system and layout shell

**Files:**
- Modify: `/Users/cherry_xiao/Developer/xiao12-top/src/app/layout.tsx`
- Modify: `/Users/cherry_xiao/Developer/xiao12-top/src/app/globals.css`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/layout/SiteHeader.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/layout/MobileMenu.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/layout/SiteFooter.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/SectionHeading.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/CardImage.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/shared/ListMeta.tsx`

- [ ] **Step 1: Configure serif, sans, and mono fonts in `layout.tsx`**

Use:
- `Geist Sans`
- `Geist Mono`
- `Noto Serif SC`

- [ ] **Step 2: Replace starter global CSS with the replica baseline**

Implement the site-wide tokens and base classes for:
- white/light sections
- dark sections
- border rhythm
- serif-heavy headings
- mono metadata styles

- [ ] **Step 3: Build the fixed header and mobile menu shell**

Match the target behavior closely:
- fixed top nav
- desktop links
- mobile overlay menu

Read all nav/footer labels and links from `src/content/site.ts`; do not hardcode them in component files.

- [ ] **Step 4: Build shared visual primitives**

Create:
- `SectionHeading`
- `CardImage`
- `ListMeta`

so later page components do not duplicate low-level markup.

- [ ] **Step 5: Verify the shell visually**

Run: `npm run dev`
Expected: the site shell loads with the new fonts, header, and baseline styles without route errors

- [ ] **Step 6: Commit the shell**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/layout src/components/shared
git commit -m "feat: add frontsite layout shell"
```

### Task 6: Build homepage sections and collection pages

**Files:**
- Modify: `/Users/cherry_xiao/Developer/xiao12-top/src/app/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/about/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/articles/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/projects/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/services/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/HeroSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/FeaturedArticle.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/RecentStreamList.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/StatsSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/ProjectGrid.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/ServiceGrid.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/QuoteSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/home/ContactSection.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/list/CollectionPageHeader.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/list/CollectionCardGrid.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/list/StreamList.tsx`

- [ ] **Step 1: Build homepage section components**

Each component should consume typed data from selectors or `site.ts`, not raw file reads.

- [ ] **Step 2: Compose the homepage in `src/app/page.tsx`**

Render the sections in the spec order:
- Hero
- Featured
- Recent Stream
- By the Numbers
- Projects
- Services
- Quote
- Contact

- [ ] **Step 3: Build `/about` from `about.mdx`**

Render the about content through the shared rich content renderer path, not an ad hoc MDX render path.

- [ ] **Step 4: Build `/articles`, `/projects`, and `/services`**

Each page should:
- use the spec ordering rules
- reuse collection list primitives
- render a distinct page heading and summary

- [ ] **Step 5: Verify collection routes**

Run:
- `npm run dev`

Visit:
- `/`
- `/about`
- `/articles`
- `/projects`
- `/services`

Expected: all pages load with placeholder content and consistent visual hierarchy

- [ ] **Step 6: Commit homepage and collection pages**

```bash
git add src/app/page.tsx src/app/about src/app/articles src/app/projects src/app/services src/components/home src/components/list
git commit -m "feat: add homepage and collection routes"
```

### Task 7: Build the three detail templates and route handlers

**Files:**
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/articles/[slug]/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/projects/[slug]/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/app/services/[slug]/page.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/detail/ArticleDetailTemplate.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/detail/ProjectDetailTemplate.tsx`
- Create: `/Users/cherry_xiao/Developer/xiao12-top/src/components/detail/ServiceDetailTemplate.tsx`

- [ ] **Step 1: Reuse the existing shared rich content renderer**

Use the `RichContentRenderer` introduced in Chunk 2 for all detail templates. Do not create a second MDX render path.

- [ ] **Step 2: Build the article detail template**

Include:
- title
- date
- summary
- cover image with fallback
- prose body

- [ ] **Step 3: Build the project detail template**

Include:
- project metadata
- summary
- cover image with fallback
- prose body

- [ ] **Step 4: Build the service detail template**

Include:
- service metadata
- summary
- CTA block when present
- prose body

- [ ] **Step 5: Implement `notFound()` behavior for missing slugs**

All three dynamic routes must return Next.js 404s for missing content.

- [ ] **Step 6: Implement `generateStaticParams()` for all three dynamic route groups**

Precompute slugs from local validated content for:
- `/articles/[slug]`
- `/projects/[slug]`
- `/services/[slug]`

Expected: build-time coverage exists for all placeholder detail routes

- [ ] **Step 7: Implement metadata generation**

Each route should generate at least:
- `title`
- `description`

from validated content.

- [ ] **Step 8: Verify all dynamic routes**

Run: `npm run build`
Expected: dynamic routes pre-render or resolve correctly with no missing-content crashes

- [ ] **Step 9: Commit the detail pages**

```bash
git add src/app/articles/[slug] src/app/projects/[slug] src/app/services/[slug] src/components/detail src/components/shared/RichContentRenderer.tsx
git commit -m "feat: add frontsite detail templates"
```

## Chunk 4: Final QA, Docs, and Acceptance

### Task 8: Add README and explicit local run instructions

**Files:**
- Create: `/Users/cherry_xiao/Developer/xiao12-top/README.md`

- [ ] **Step 1: Write a thin project README**

Document:
- what this repo is
- current phase scope
- commands to run locally
- content source locations
- out-of-scope tool pages

- [ ] **Step 2: Verify README instructions against the actual project**

Run:
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`

Expected: README commands match the real project scripts

- [ ] **Step 3: Commit the README**

```bash
git add README.md
git commit -m "docs: add frontsite README"
```

### Task 9: Execute acceptance QA against the spec baseline

**Files:**
- Modify: `/Users/cherry_xiao/Developer/xiao12-top/docs/superpowers/plans/2026-06-19-erlich-fun-frontsite-implementation.md`

- [ ] **Step 1: Run the full verification suite**

Run:
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Expected: all commands pass cleanly

- [ ] **Step 2: Run manual route QA**

Open and verify:
- `/`
- `/about`
- `/articles`
- `/articles/[valid-slug]`
- `/projects`
- `/projects/[valid-slug]`
- `/services`
- `/services/[valid-slug]`

Expected:
- no broken routes
- no empty shells
- visible section order matches the spec
- mobile menu works

- [ ] **Step 3: Run manual negative-path QA**

Open and verify:
- `/articles/does-not-exist`
- `/projects/does-not-exist`
- `/services/does-not-exist`

Expected: all three return a proper Next.js not-found page

- [ ] **Step 4: Run visual QA against the public reference baseline**

Compare the implemented site against:
- `https://erlich.fun/`
- `https://erlich.fun/articles`
- `https://erlich.fun/projects`
- `https://erlich.fun/services`
- `https://erlich.fun/articles/proma-tutorial-v2`

Verify on desktop and mobile:
- light/dark section rhythm is present
- serif/sans/mono hierarchy is visible
- card proportions and list density feel aligned
- detail-page reading width and whitespace are close to the reference
- top nav and mobile overlay behavior feel structurally aligned

Expected: the implemented frontsite matches the reference at the layout and typography level, without requiring identical content

- [ ] **Step 5: Record completion in the plan file**

Check completed boxes or add a short completion note at the bottom after implementation finishes.

- [ ] **Step 6: Create the final implementation commit**

```bash
git add .
git commit -m "feat: build erlich-fun frontsite phase 1"
```

## Completion Note

Implemented on 2026-06-19 in `/Users/cherry_xiao/Developer/xiao12-top` on branch `codex/erlich-frontsite-phase1`.

Verification completed:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- local route checks on `/`, `/articles`, `/articles/[slug]`, `/projects/[slug]`
- negative-path checks returning `404` on missing article, project, and service slugs

Known limitation:

- The temporary scaffold directory at `/tmp/xiao12-top-bootstrap` was not deleted automatically because local safety hooks block destructive cleanup without explicit confirmation.
- Manual visual QA was performed at the HTML/route level in this pass; a screenshot-based design QA pass can still improve confidence on spacing and typography details.
