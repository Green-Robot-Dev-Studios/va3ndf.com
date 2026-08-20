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
pinned: 1                        # optional; see "Pinning" below
tags: [Radio, CNC]               # optional; RSS categories only
draft: false                     # optional; drafts are excluded from builds
```

Images referenced relatively from the markdown body (`![](assets/foo.jpg)`) are
optimised by Astro at build time — see **Images** below.

## Descriptions

You never have to write a `description`. Two functions in `src/lib/content.ts`
decide what gets shown where:

- **`cleanDescription`** is what *lists* use. It returns the written
  description, or nothing if it's a placeholder (`test`) or just repeats the
  title. Rows without one simply show title and date, which keeps the archive
  terse.
- **`summary`** is what *metadata* uses — meta description, Open Graph, Twitter
  cards, and RSS. It falls back through: written description → first prose from
  the body (headings, lists, images, and HTML comments stripped) → a generated
  sentence like `Spinning Top — a build by Nick Ficara (VA3NDF), November 2022.`
  It is never empty.

So writing a `description` improves the listing rows; not writing one costs you
nothing anywhere else.

## Images

`src/lib/image-service.ts` wraps Astro's sharp service with two behaviours it
lacks, both of which matter here because the source photos come straight off a
phone at 3024x4032 and up:

- **A long-edge cap.** The stock service resizes by width only and ignores
  images with no requested width, so every `![](…)` in a post body shipped at
  full resolution. Body images are now capped at 1280px on the long edge (they
  render in a 608px column) and component images at 1600px. This took `dist/`
  from 50 MB to 22 MB and `/builds/lamp/` from 5.9 MB to 1.2 MB.
- **Real cover-cropping.** The stock `transform` ignores `height`, so asking for
  1200x630 returned a 1200-wide image at the original aspect ratio — meaning the
  `og:image:height` tag was wrong on every page. Passing both dimensions now
  crops properly, using sharp's attention strategy so the subject stays in frame.

Passing only a width still behaves exactly as before, so nothing crops by
accident.

## Pinning

The home page lists everything, newest first. `pinned` lifts an entry out of
that stream into a **Selected** block above it, so the good stuff isn't buried
by chronology:

```yaml
pinned: 1     # explicit rank — 1 shows first, 2 second, and so on
pinned: true  # pin without choosing a rank; sorts after any numbered entries
```

Rules worth knowing:

- A pinned entry appears in **Selected** and is removed from the **Archive**
  below it, so nothing is listed twice on the same page.
- Pinning affects the home page only. `/blog`, `/builds`, and the RSS feed stay
  strictly chronological, so a pinned post keeps its place in the timeline there.
- Pinned rows render larger — bigger thumbnail, bigger title, three lines of
  description instead of two.
- With nothing pinned, the home page is a plain reverse-chronological archive
  and neither section heading appears.

Ranks don't need to be contiguous; `1`, `5`, `10` works fine and leaves room to
insert something later.

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
