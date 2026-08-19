# va3ndf.com

Personal site of Nick Ficara (VA3NDF) — writing, and builds.
Built with [Astro](https://astro.build), deployed as a static site to GitHub Pages.

## Running it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in ./dist
npm run preview  # serve ./dist locally
./pub.sh         # build + publish to GitHub Pages
```

## Content

Posts live in two content collections, each entry a directory with its images
alongside it:

```
src/content/
  blog/<slug>/page.md      + assets/
  builds/<slug>/page.md    + assets/
```

Frontmatter (`src/content/config.ts` is the source of truth):

```yaml
title: Morse Code Paddle v2      # required
description: One-line summary    # optional; shown in lists, RSS, and OG tags
date: 2024-04-30                 # optional, drives ordering
updatedDate: 2024-05-02          # optional
heroImage: "assets/hero.jpg"     # optional; used as thumbnail + OG image
tags: [Radio, CNC]               # optional; generates /tags/<tag>
draft: false                     # optional; drafts are excluded from builds
```

Images referenced relatively from the markdown body (`![](assets/foo.jpg)`) are
optimised by Astro at build time.

`description` values that just repeat the title (or say `test`) are treated as
empty and hidden — see `cleanDescription` in `src/lib/content.ts`.

## URLs

Entries are served from `/blog/<slug>/` and `/builds/<slug>/`. Astro derives the
slug `<slug>/page` from the `page.md` filename, so `src/lib/content.ts` strips
the trailing segment. The old `/blog/<slug>/page/` URLs still resolve — they
render a canonical link plus a meta refresh (`src/pages/blog/[slug]/page.astro`).

## Design

- System font stacks only: no webfont requests. Serif for prose, sans for UI,
  mono for metadata.
- Colour tokens live at the top of `src/styles/global.css`. Dark mode follows
  the OS by default and is overridden by `data-theme` on `<html>`.
- CSS is inlined at build time; the only JavaScript is Astro's view transitions,
  link prefetching, and the theme toggle.
