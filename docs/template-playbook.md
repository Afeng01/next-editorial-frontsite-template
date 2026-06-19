# Paperframe Playbook

This file explains how to turn `paperframe` into a real website without mixing
template maintenance and personal-site work in the same repository.

## Recommended repo split

- `Afeng01/paperframe`
  This stays generic and reusable.
- `your-handle/your-site`
  This becomes the actual website with a domain, real copy, screenshots, and
  public proof.

Do not keep customizing the template repo as if it were your public site. Once
the direction is validated, create a separate real-site repository from the
template and let it diverge.

## First pass after using the template

Change these files first:

1. `src/lib/site-config.ts`
2. `src/content/site.ts`
3. `src/content/about.mdx`
4. `src/content/articles/*.mdx`
5. `src/content/projects/*.mdx`
6. `src/content/services/*.mdx`

That is enough to make the site feel like yours without rewriting the component
layer.

## What can stay unchanged at first

- route structure under `src/app/**`
- MDX loading and validation under `src/lib/content/**`
- component templates under `src/components/**`
- metadata route plumbing such as `sitemap.ts`, `robots.ts`, and generated icons

Keep those stable until real content exposes a real need to change them.

## Migration order for a real site repo

1. Replace `site-config.ts` with real name, URL, author, and social handles.
2. Rewrite `src/content/site.ts` so homepage framing, navigation, contact, and
   section labels match the real site.
3. Replace `about.mdx`.
4. Replace the highest-signal seeded content first:
   - 2-3 articles
   - 2-3 projects
   - 1-2 services
5. Replace preview and share images.
6. Only then decide whether new routes, tools, analytics, or a CMS are actually
   needed.

## GitHub presentation pass

For the template repo itself:

1. keep the GitHub About text generic
2. keep topics template-focused
3. upload `docs/assets/github-social-preview.png` in `Settings -> Social preview`

For the real site repo:

1. make the About text person-specific
2. replace the social preview with site-specific imagery
3. point the repository homepage to the deployed domain

## Anti-patterns

- treating seeded MDX as production content
- adding CMS, auth, or database-backed tools before the public story exists
- evolving the template repo and the real site in the same codebase
- rewriting components before swapping the highest-signal content files
