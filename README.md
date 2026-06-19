# xiao12-top

Phase 1 rebuild of a content-focused frontsite inspired by the public structure
and visual rhythm of `https://erlich.fun/`.

This repo currently covers:

- `/`
- `/about`
- `/articles`
- `/articles/[slug]`
- `/projects`
- `/projects/[slug]`
- `/services`
- `/services/[slug]`

It intentionally does **not** cover:

- `/deepclaude-pricing`
- `/deepclaude-quota`
- `/nano-banana-image`
- `/4o-image`
- real stats backed by Supabase
- real migrated content

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- local MDX content
- Zod + gray-matter content validation
- `next-mdx-remote/rsc` for server-rendered MDX

## Local commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run dev` intentionally uses the webpack dev server instead of the default
Turbopack path because this project renders local MDX through
`next-mdx-remote/rsc`, and that combination is more stable in webpack during
phase 1.

Default dev URL:

```text
http://localhost:3000
```

## Content locations

```text
src/content/site.ts
src/content/about.mdx
src/content/articles/*.mdx
src/content/projects/*.mdx
src/content/services/*.mdx
```

## Key app structure

```text
src/app/
src/components/
src/lib/content/
public/images/
docs/superpowers/specs/
docs/superpowers/plans/
```

Responsibility split:

- `src/app/**`: routes and metadata
- `src/components/**`: UI only
- `src/content/**`: source content only
- `src/lib/content/**`: parsing, validation, sorting, and selectors

## Current notes

- Placeholder content is intentional and should be replaced later through
  `src/content/**`, not by rewriting page components.
- The target replication standard for phase 1 is layout and typography
  similarity, not content identity.
- The temporary bootstrap directory created during scaffolding was kept because
  local safeguards blocked automatic deletion without explicit confirmation.
