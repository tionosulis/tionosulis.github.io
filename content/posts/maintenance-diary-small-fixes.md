---
title: "Small Fixes, Big Impact: A Blog Maintenance Diary"
description: "A log of incremental improvements — SEO title warnings, W3C compliance, overflow-wrap, and image filenames — that quietly raised the quality bar for this static blog."
date: 2026-07-10
draft: false
tags:
  - meta
  - css
  - eleventy
---

Not every improvement ships as a feature. Some arrive as a three-line CSS change, a config tweak, or a W3C validator error that you finally decide to fix.

This is a log of those changes. Small, independent, and cumulative.

${toc}

## SEO: Title Length Warning

The problem was simple: I kept writing `title` frontmatter values that exceeded 60 characters, which meant `<title>` tags got truncated in SERPs. Remembering to check manually every time was unrealistic.

The fix was a `eleventy.before` hook that scans every post, measures title length, and warns if it exceeds 60 characters without a `seoTitle` fallback:

```js
eleventyConfig.on("eleventy.before", async ({ dir }) => {
  const files = await glob(`${dir.input}/posts/**/*.md`);
  for (const file of files) {
    const { data } = matter(readFileSync(file, "utf8"));
    const title = data.title || "";
    if (title.length > 60 && !data.seoTitle) {
      console.warn(`⚠️  [SEO] "${file}" – title ${title.length} chars, seoTitle missing`);
    }
  }
});
```

The `seoTitle` field maps to `<title>` while the full `title` powers the H1 and Open Graph tags — no truncation, no duplication. Nineteen posts got `seoTitle` values in one pass.

Three lines of code. No runtime cost. Every future post gets the guardrail automatically.

## W3C Compliance: The Long Tail

The Nu HTML Checker flagged a handful of issues — none critical on their own, but collectively worth fixing:

- **`<div>` inside `<pre>`**: The copy-button wrapper used a `<div class="code-wrapper">` inside `<pre>`, which is invalid. A build-time transform replaced it with `<span>` — same layout, valid DOM.
- **Missing `aria-label` on footnotes**: The `<section class="footnotes">` had no programmatic label. Added `aria-label="Footnotes"` via transform.
- **Missing `sizes` on eleventy-img**: The image transform plugin processed `<img>` tags but omitted `sizes`, triggering a W3C warning. Added `sizes="100vw"` to the plugin defaults.
- **Unescaped `&` in meta tags**: Content with `&` (e.g., open graph descriptions) needed the Nunjucks `| e` filter plus `decodeEntities: true` in the HTML minifier.

Each fix was a single-line change or a tiny transform. Together they moved this site from "passes most checks" to "zero errors" on the W3C validator.

## Overflow-Wrap: Cleaning Up Word Breaks

Inline `<code>` elements used `word-break: break-all`, which broke *every* word at any character boundary — even short tokens like `const` would split as `co` / `nst` at line edges. The fix was two changes:

1. `code:not(pre code)` → `word-break: break-all` → `overflow-wrap: anywhere`. The browser only breaks when the word genuinely overflows the container.
2. `article p, article li` → added `overflow-wrap: break-word` as a safety net for unexpected long strings in body text.

I skipped `hyphens: auto` — hyphenation in a monospace font adds visual noise (each hyphen eats a full character width) without meaningful benefit for this layout.

## Image Filenames: From Hash to Descriptive

The `eleventy-img` transform plugin defaulted to content-hash filenames like `VxtZ9MAMEF-1200.webp`. For SEO (Google Images uses filenames as a ranking signal) and developer clarity, descriptive names are better.

The fix was a `filenameFormat` callback in the plugin config:

```js
filenameFormat: (id, src, width, format) => {
  const srcName = path.parse(src).name;
  return `${srcName}-${width}.${format}`;
};
```

Every source SVG already had a unique, hyphenated name — so `dark-mode-done-right.svg` produces `dark-mode-done-right-1200.webp` instead of `RSPk_qVZAx-1200.webp`. No naming conflicts, no breaking changes to OG images (those use separate PNGs).

## The Pattern

None of these changes is a blog post on its own. But they share a pattern worth noticing:

- **Low effort, high leverage** — each fix was 1–5 lines of code or config.
- **Tooling over discipline** — a build-time hook is more reliable than remembering to check a checklist.
- **Cumulative quality** — no single fix transformed the site, but the sum of them raised the baseline.

The next maintenance pass will find different issues. That is the point.
