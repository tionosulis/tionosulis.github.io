---
title: "Reviving a Ghost: From Abandoned 11ty to Build Awesome"
description: The resurrection of a dead blog, navigating the Eleventy-to-Build Awesome transition, and the pursuit of a perfect Pagespeed score.
date: 2026-06-09
tags: [meta, eleventy, build-awesome]
pageHasCode: true
---

${toc}

## The Graveyard

This blog was born in early 2022. Two posts in, it died. Not dramatically — it just drifted into that silent purgatory of unused side projects. The domain kept resolving, the deploy workflow sat idle, and the repo gathered digital dust for over four years.

Every now and then I'd glance at it. *"Someday I'll revive it,"* I told myself. Someday never came — until now.

## The Spark

June 2026. I finally opened the repo. The stack was a time capsule of 2022 web development:

- **Eleventy v2** (CommonJS, `module.exports`)
- **Prism** for syntax highlighting
- **Workbox** for service worker
- A circular SVG logo, border-bottom post listings, and a single `index.css` with 342 lines of flat styles

It worked. But it felt *tired*.

I made a decision: complete rewrite. New stack, new design, new everything. I wanted this to be a showpiece, not a fossil.

## The Doubt

Before writing any code, I did what anyone should do before touching a legacy project: I researched the ecosystem.

That's when I hit a wall.

I learned that in **September 2024**, [Font Awesome had acquired Eleventy](https://blog.fontawesome.com/eleventy-joins-font-awesome/). Then in **March 2026 — just three months ago** — the project was [rebranded to **Build Awesome**](https://www.allaboutken.com/posts/20260305-digesting-eleventy-becomes-build-awesome/).

> "Eleventy — the static site generator that builds this site — is becoming Build Awesome, a full site-building platform under Font Awesome. Same open source core, same possum."
> <cite>Ken Hawkins, March 2026</cite>

My first reaction: *is my static site generator dying?*

I've seen this movie before. Beloved open-source tool gets acquired, gets rebranded, gets enveloped into a corporate platform, and the community slowly drifts away. Should I migrate to Astro? To Next.js? To plain Hugo?

## The Research

I spent the next few hours digging deeper instead of panicking.

- **Eleventy's GitHub** (github.com/11ty/eleventy): active. v3.1.6 stable, regular releases, issues triaged, PRs merged. Zach Leatherman is still the lead.
- **npm downloads**: steady — actually growing.
- **The Build Awesome announcement**: the open-source core stays open. Font Awesome is investing in the ecosystem — more resources, full-time maintainers.
- **Community sentiment**: cautiously optimistic. The "same possum" line from Ken's article captured the mood perfectly.

The acquisition and rebranding weren't signs of death. They were signs of **sustainability**. Open source needs funding to survive, and Font Awesome — a company built on open source — understands that better than most.

My conclusion: **Eleventy's core is healthy. The rebranding is an investment, not an abandonment.** I decided to proceed.

## The Revamp

This is where theory became practice. I had a checklist of modern features I wanted, and a hard constraint: **zero client-side JavaScript** by default.

### Stack

| Component | Choice |
|---|---|
| Static generator | Eleventy v3 (ESM) |
| Config | `eleventy.config.js` with `export default` |
| Syntax highlighting | Shiki (dual-theme: github-light/github-dark) |
| Image pipeline | `@11ty/eleventy-img` (AVIF + WebP) |
| CSS | Vanilla — Nesting, Custom Properties, inlined + minified |
| Fonts | IBM Plex Sans (local woff2, `font-display: swap`) |
| Service Worker | Vanilla JS (no Workbox) |
| Templates | Nunjucks |

### The Config

The heart of any Eleventy project is its config file. Here's the ESM version powering this site:

```javascript
import markdownIt from "markdown-it";
import shiki from "@shikijs/markdown-it";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { minify } from "html-minifier-terser";

export default async function (eleventyConfig) {
  // Shiki — dual-theme syntax highlighting
  let md = markdownIt({ html: true, linkify: true });
  md.use(await shiki({
    themes: { light: "github-light", dark: "github-dark" },
  }));
  eleventyConfig.setLibrary("md", md);

  // Responsive images — AVIF + WebP
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp"],
    defaultAttributes: { loading: "lazy", decoding: "async" },
  });

  // RSS feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    collection: { name: "posts", limit: 10 },
    metadata: {
      title: "Sulistiono",
      base: "https://tionosulis.github.io/",
      author: { name: "Sulistiono", email: "contact.sulistiono@gmail.com" },
    },
  });

  // HTML minification in production
  eleventyConfig.addTransform("htmlmin", async (content) => {
    if (this.page.outputPath?.endsWith(".html")) {
      return minify(content, { collapseWhitespace: true, removeComments: true });
    }
    return content;
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    dir: { input: "content", includes: "../_includes", output: "_site" },
  };
}
```

### Dark Mode Toggle

I wanted dark mode without the flicker. The trick is an inline `<script>` in `<head>` that reads `localStorage` before the first paint:

```javascript
var t = localStorage.getItem("theme");
if (!t) {
  t = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
document.documentElement.setAttribute("data-theme", t);
```

The CSS then builds on CSS custom properties scoped to `[data-theme="dark"]` and a `@media (prefers-color-scheme: dark)` fallback:

```css
:root {
  --bg: #fafafa;
  --text: #1a1a1a;
  --accent: #2563eb;
}

[data-theme="dark"] {
  --bg: #0a0a0b;
  --text: #e4e4e7;
  --accent: #60a5fa;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #0a0a0b;
    --text: #e4e4e7;
    --accent: #60a5fa;
  }
}
```

The toggle button itself is a small icon in the sidebar — minimal, functional, and the only piece of interactive JavaScript on the entire site.

### Design

I drew inspiration from [Shu Ding's website](https://shud.in): clean typography, generous whitespace, a quiet left sidebar on desktop with navigation links. On mobile, it collapses to a compact header bar.

The old circular SVG logo is gone. In its place: a simple **"S"** in a bordered box — the only ornament the site needs.

### Shiki Dual-Theme

Shiki is a different beast from Prism. Instead of adding CSS classes to tokens, it inlines the exact colors as `style` attributes, with the dark theme stored in `--shiki-dark-*` CSS custom properties. A few lines of CSS make it all work seamlessly:

```css
[data-theme="dark"] .shiki span {
  color: var(--shiki-dark) !important;
}
[data-theme="dark"] .shiki {
  background-color: var(--shiki-dark-bg) !important;
}
```

No Flash of Unstyled Code. No extra HTTP requests. Just clean, themed tokens.

### Everything Else

- **PWA**: a vanilla service worker that precaches fonts and core pages, with cache-first for assets and network-first for documents.
- **Dot leader**: post titles and dates separated by a flex-grow dots span, like a table of contents from a 1990s computer book.
- **Tag pages**: auto-generated via Eleventy pagination — click a tag on any post and you get a filtered listing.
- **Favicon**: the "S" monogram in SVG + PNG sizes, including a maskable icon for Android.

## The Result

After a weekend of work, I ran Google PageSpeed Insights.

<img src="/assets/img/pagespeed.svg" width="800" height="200" alt="Pagespeed 100 across all four categories">

**100/100** across all four metrics: Performance, Accessibility, Best Practices, SEO.

The site loads fast by construction — inlined CSS, preloaded fonts, no render-blocking resources, lazy-loaded images in next-gen formats. There's almost no JavaScript to parse — just the dark mode toggle, the service worker registration, and the copy-code button you see on this very post.

**Before & After, by the numbers:**

| Metric | Old | New |
|---|---|---|
| Eleventy version | v2 (CJS) | v3 (ESM) |
| Syntax highlighter | Prism (1 CSS file) | Shiki (inline, dual-theme) |
| Images | Passthrough copy | AVIF + WebP responsive |
| CSS | Single flat file | Nesting + Custom Properties |
| JS footprint | Workbox (50KB+) | Vanilla SW (~1KB) |
| Lighthouse score | Not tested | 100/100 |

## Conclusion

I was skeptical too. Open-source acquisitions have a terrible track record — Oracle/Sun, Adobe/Figma's attempted buyout, HashiCorp's license shift — and I don't blame anyone who reads "Font Awesome acquires Eleventy" and immediately starts shopping for alternatives. But after digging through GitHub activity, the announcement details, and community discussion, I found enough signals to bet on this horse: Zach still leading development, MIT license untouched, real investment in infrastructure instead of cost-cutting. Not blind faith. Just a calculated bet after doing my homework.

Three months later, the possum is still kicking. I'll keep watching. But for now, I'm building.

This blog is alive again. The code is clean. The pagespeed is perfect. And there's room for many more posts.

See you around.

---

*If you're curious about the technical details, the full source is [on GitHub](https://github.com/tionosulis/tionosulis.github.io). PRs welcome — but mostly, go build something.*
